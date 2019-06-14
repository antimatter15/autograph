import React from 'react'
import _dryRender from './dryrender'


// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'


const AutographContext = React.createContext(null)
let lastHandleValue, lastHandlePointer;


class AutographModel {
    constructor(config){
        if(typeof config.client === 'string'){
            config.client = new AutographBasicClient(config.client)
        }

        this.mounted = false;
        this.currentlyDryRendering = false;
        this.queries = {}
        this.mountedFiber = null;
        this.config = config;
    }
    mount(){
        if(this.mounted) throw new Error('Autograph Root can only be mounted once. Either create a different root, or unmount this root first. ');
        this.mounted = true;
    }
    unmount(){
        if(!this.mounted) throw new Error('Can not unmount— root has already been unmounted.')
        this.mounted = false;
    }
    getQuery(config){
        if(typeof config === 'string') config = { id: config };
        if(!(config.id in this.queries))
            this.queries[config.id] = new AutographQuery(this, config);
        // if(!shallowEqual(this.queries[config.id].config, config))
        //     console.warn('Different loading group configurations share the same ID');
        return this.queries[config.id]
    }
    dryRender(){
        // prepare dry render
        for(let query of Object.values(this.queries)){
            query.lastDeps = query.deps;
            query.deps = {}
        }
        // execute the dry render
        this.currentlyDryRendering = true;
        console.groupCollapsed('Dry Render')
        _dryRender(_elementFromFiber(this.mountedFiber), this.mountedFiber)    
        console.groupEnd('Dry Render')
        this.currentlyDryRendering = false;

        // fetch what needs to be fetched
        for(let query of Object.values(this.queries)){
            if(!shallowCompare(query.deps, query.lastDeps)){
                query.refetch()
            }else{
                console.log('no need to update query')
            }
        }
    }
}


class AutographBasicClient {
    constructor(url){
        this.url = url;
        // this.schemaPromise = null;
        // this.schemaError = null;
        // this.schemaData = null;
    }

    fetchSchema(){
        return this.fetchQuery(SUCCINCT_INTROSPECTION_QUERY)
            .then(data => data.__schema)
    }

    fetchQuery(query){
        return fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: query})
        })
        .then(resp => resp.json())
        .then(d => d.data)
    }
}





class AutographQuery {
    constructor(root, config){
        this.root = root;
        this.config = config;
        this.callbacks = []

        this.dataPromise = null;
        this.dataError = null;
        this.data = null;

        // these are the fields that we need to fetch
        this.deps = {}
        this.lastDeps = {};
    }
    
    subscribe(callback){
        this.callbacks.push(callback)
    }
    
    unsubscribe(callback){
        this.callbacks = this.callbacks.filter(k => k !== callback)
    }

    notify(){
        for(let cb of this.callbacks) cb();
    }

    get client(){
        let config = { ...this.root.config, ...this.config };
        if(!config.client){
            throw new Error('No client defined either on query config or root config')
        }
        return config.client;
    }

    refetch(){
        let gql = accessLogToGraphQL(this.deps);
        console.groupCollapsed('GraphQL Query')
        console.log(gql)
        console.groupEnd('GraphQL Query')
        this.dataPromise = this.client.fetchQuery(gql)
            .then(data => {
                this.data = data;
                this.dataPromise = null;
                this.notify()
            })
            .catch(err => {
                this.dataError = err;
                this.dataPromise = null;
                this.notify()
            })
    }

    createHandle(handleOptions = {}){
        if(handleOptions === true){
            handleOptions = { suspense: true, boundary: true }
        }

        // get the graphql query root
        let queryRoot = { kind: '__NOSCHEMA' }
        if(this.client.schemaData){
            let schema = this.client.schemaData;
            queryRoot = schema.types.find(k => k.name === schema.queryType.name)
        }

        if(this.root.currentlyDryRendering){
            return this._createAccessor(this.deps, queryRoot, { isDry: true, handleOptions })
        }else{
            if(!this.client.schemaData && !this.client.schemaPromise && !this.client.schemaError){
                this.client.schemaPromise = new Promise(resolve => {
                    this.client.fetchSchema()
                        .then(data => { 
                            console.groupCollapsed('TypeScript Schema')
                            console.log(convertGQLSchemaToTypescript(data))
                            console.groupEnd('TypeScript Schema')

                            this.client.schemaData = data; 
                            this.client.schemaPromise = null;
                            this.notify()
                            resolve()
                        })
                        .catch(err => { 
                            this.client.schemaError = err; 
                            this.client.schemaPromise = null;
                            this.notify()
                            resolve() 
                        })
                })
            }

            // TODO: always load schema with suspense
            // because otherwise our loading indicators
            // can't generally be used in conjunction with later updates
            // handleOptions.suspense && 
            if(this.client.schemaPromise){
                throw this.client.schemaPromise;
            }
            if(handleOptions.error && this.client.schemaError){
                throw this.client.schemaError;
            }
            if(handleOptions.error && this.dataError){
                throw this.dataError;
            }
            return this._createAccessor(this.data, queryRoot, { isDry: false, handleOptions })
        }
    }


    _createAccessor(path, type, state){
        // this allows directives to work

        let obj = this.__createAccessor(path, type, state);
        if(state.isDry){
            lastHandleValue = obj;
            lastHandlePointer = path;
        }else{
            lastHandleValue = null;
            lastHandlePointer = null;
        }
        return obj;
    }
    __createAccessor(path, type, state){
        let schema = this.client.schemaData;
        let { isDry, handleOptions } = state;

        const subpath = obj => {
            if(isDry){
                let key = JSON.stringify(obj)
                return path[key] || (path[key] = {})
            }else{
                if(path){
                    if(obj.type === 'AS'){
                        let n = {};
                        for(let key in path){
                            if(key.startsWith('__AS_' + obj.name)){
                                n[key.slice(key.indexOf('___') + 3)] = path[key]
                            }
                        }
                        return n;
                    }else if(obj.type === 'PROP'){
                        return path[obj.name]
                    }else if(obj.type === 'METHOD'){
                        return path[obj.name + '___' + hashArguments(obj.args)]
                    }
                }
                
                return undefined;
            }
        }


        // if(handleOptions.cacheOnly) return null;
        if(!isDry && path === undefined && !(type.kind === '__NOSCHEMA' || schema.queryType.name === type.name)){
            let triggerFetch = !this.dataPromise;
            if(triggerFetch){
                this.root.dryRender();
                if(!this.dataPromise) throw new Error('Some sort of rendering or query generation problem!');
            }

            if(handleOptions.suspense){
                throw this.dataPromise;
            }else{
                if(triggerFetch){
                    throw nextFrame();
                }
                return null;
            }
        }
        

        if(type.kind === 'INTERFACE' || type.kind === 'OBJECT' || type.kind === '__NOSCHEMA'){
            let handle = {}

            if(schema){
                let sub = schema.types.find(k => k.name == type.name)
                if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
                
                for(let field of sub.fields){
                    if(field.args.length === 0){
                        Object.defineProperty(handle, field.name, {
                            get: () => {
                                let next = subpath({ type: 'PROP', name: field.name });
                                return this._createAccessor(next, field.type, state)
                            }
                        })
                    }else{
                        handle[field.name] = (args) => {
                            let next = subpath({ type: 'METHOD', name: field.name, args: args || {} })
                            return this._createAccessor(next, field.type, state)
                        }
                    }
                }

                if(sub.kind === 'INTERFACE'){
                    for(let type of schema.types){
                        if(type.kind != 'OBJECT') continue;
                        if(!type.interfaces.some(k => k.name == sub.name)) continue;

                        Object.defineProperty(handle, 'as' + type.name, {
                            get: () => {
                                let next = subpath({ type: 'AS', name: type.name })
                                return this._createAccessor(next, type, state)
                            }
                        })
                    }
                }
            }

            Object.defineProperty(handle, '__typename', { 
                enumerable: false, 
                get: () => {
                    if(isDry){
                        subpath({ type: 'PROP', name: '__typename' }).__get = true;    
                    }
                    return type.name
                }
            })

            if(type.kind === '__NOSCHEMA' || schema.queryType.name === type.name){
                // allow functions to distinguish between the dry run and the real execution
                // for instance to specifically gate side effects
                Object.defineProperty(handle, '_dry', { 
                    enumerable: false, 
                    value: isDry 
                })

                Object.defineProperty(handle, '_loading', { 
                    enumerable: false, 
                    value: isDry ? 
                        // if we are in a dry run and we haven't loaded our schema, 
                        // we set loading to true so we don't hit some sort of 
                        // error because we don't know which fields to create
                        (!!(this.client.schemaPromise)) : 
                        // we are either loading the schema or the data for this query
                        (!!(this.client.schemaPromise || this.dataPromise))
                })

                // we may have to deal with either schema or data errors
                Object.defineProperty(handle, '_error', { 
                    enumerable: false, 
                    value: isDry ? null : (this.client.schemaError || this.dataError )
                })
            }else if(!isDry && !path){
                return null
            }

            

            return Object.freeze(handle);
        }

        if(type.kind === 'NON_NULL') return this._createAccessor(path, type.ofType, state);

        if(!isDry){
            // if there is data then we return it
            // if(path !== undefined){
                if(type.kind === 'LIST'){
                    return path.map(data => this._createAccessor(data, type.ofType, state))
                }
                return path;
            // }

        }else{
            if(type.kind === 'LIST') return makeFixedArray(this._createAccessor(path, type.ofType, state));
            if(type.kind === 'UNION'){
                let sub = schema.types.find(k => k.name == type.name)
                if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
                return this._createAccessor(path, sub.possibleTypes[0], state)
            }

            path.__get = true;
            if(type.name == 'ID') return 'Autograph ID';
            if(type.name == 'String') return 'Autograph String';
            if(type.name == 'Int') return 42;
            if(type.name == 'Float') return 17.76;
            if(type.name == 'Boolean') return true;
            
            if(type.kind == 'ENUM'){
                let sub = schema.types.find(k => k.name == type.name)
                if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
                return sub.enumValues[0].name
            }
            if(type.kind == 'SCALAR') return { __gqlScalarName: type.name }
            throw new Error(`Unable to handle ${type.kind} named "${type.name}"`)
        }
    }

}


function accessLogToGraphQL(log) {
    // options = Object.assign({}, DefaultGraphQLGeneratorOptions, options)

    const encodeValue = (obj) =>
        (typeof obj === 'object') ? 
            (Array.isArray(obj) ? 
                ('[' + obj.map(encodeValue).join(', ') + ']'):
                ('{' + encodeKV(obj) + '}') ) : 
            JSON.stringify(obj)
    
    const encodeKV = (obj) => Object.keys(obj)
        .map(key => key + ': ' + encodeValue(obj[key]))
        .join(', ')

    const indent = (x) => x.split('\n').map(k => '  ' + k).join('\n')

    const convertRecursive = (log, prefix = '') => {
        let gql = ''
        if(log.__directive) gql += log.__directive;

        if(log.__get) return gql;

        gql += '{\n'
        for(let key of Object.keys(log)) {
            if(key === '__directive') continue;
            let info = JSON.parse(key)
            if(info.type == 'METHOD'){
                gql += indent(prefix + info.name + '___' + hashArguments(info.args) + ': ' + info.name + 
                        (Object.keys(info.args).length > 0 ? ('(' + encodeKV(info.args) + ')') : '') + ' ' + convertRecursive(log[key]))  + '\n'
            }else if(info.type == 'PROP'){
                gql += indent((prefix ? (prefix + info.name + ': ') : '') + info.name + ' ' + convertRecursive(log[key])) + '\n'
            }else if(info.type == 'AS'){
                gql += indent('... on ' + info.name + ' ' + convertRecursive(log[key], '__AS_' + info.name + '___')) + '\n'
            }else if(info.type == 'FEAT'){
                // ignore these
            }else throw new Error(`Encountered unexpected navigation type "${info.type}"`)
        }

        if(Object.keys(log).length == 0){
            gql += indent((prefix ? (prefix + '__typename: ') : '') + '__typename') + '\n'
        }

        gql += '}'
        return gql;
    }

    // if(options.operationType == 'query'){
    return convertRecursive(log, '')
    // }else if(options.operationType == 'mutation'){
    //     return 'mutation ' + convertRecursive(log, '')
    // }else{
    //     throw new Error(`Unsupported operation type "${options.operationType}"`)
    // }
}

export function convertGQLSchemaToTypescript(schema) {
    const INDENT = '    ' // 4 spaces
    let ts = ''

    if(schema.queryType.name != 'Query'){
        ts += 'type Query = ' + schema.queryType.name + '\n\n' 
    }

    if(schema.mutationType && schema.mutationType.name != 'Mutation'){
        ts += 'type Mutation = ' + schema.mutationType.name + '\n\n' 
    }

    ts += 'type GQLType = {\n'
    ts += INDENT + "/** The name of the object type */\n"
    ts += INDENT + '__typename: string\n'
    ts += '}\n\n'

    const BUILTIN_TYPES = [
        "__Directive", "__DirectiveLocation", "__EnumValue", "__Field", 
        "__InputValue", "__Schema", "__Type", "__TypeKind",
    ]

    const SCALAR_MAP = {
        'Int': 'number',
        'Float': 'number',
        'ID': 'string'
    }

    for(let type of schema.types){
        if(BUILTIN_TYPES.indexOf(type.name) != -1) continue;
        if(type.kind == 'OBJECT'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";
            ts += 'export type ' + type.name + ' = GQLType & {\n'
            
            for(let field of type.fields){
                if(field.description) 
                    ts += INDENT + "/** " + field.description + " */\n"
                if(field.args.length > 0){
                    ts += INDENT + field.name + (IsGQLTypeNullable(field.type) ? '?' : '') + '(args: { ' + 
                        field.args.map(arg => arg.name + (IsGQLTypeNullable(arg.type) ? '?: ' : ': ') + GQLType2TS(arg.type)).join(', ') + 
                        ' }): ' + GQLType2TS(field.type) + '\n'
                }else{
                    ts += INDENT + field.name +  (IsGQLTypeNullable(field.type) ? '?: ' : ': ') + GQLType2TS(field.type) + '\n'
                }
            }

            if(type.name == schema.queryType.name){
                ts += '\n'
                ts += INDENT + "/** Check this to determine whether the query is loading */\n"
                ts += INDENT + '_loading?: boolean\n'
                ts += INDENT + "/** Check this to display error messages */\n"
                ts += INDENT + '_error?: any\n'
                ts += INDENT + "/** This field is defined when Autograph is executing a dry run */\n"
                ts += INDENT + '_dry?: boolean\n'
            }
            ts += '}\n\n'

        }else if(type.kind == 'INTERFACE'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";

            ts += 'export interface ' + type.name + ' extends GQLType {\n'
            
            for(let field of type.fields){
                if(field.description) 
                    ts += INDENT + "/** " + field.description + " */\n"
                ts += INDENT + field.name +  (IsGQLTypeNullable(field.type) ? '?: ' : ': ') + GQLType2TS(field.type) + '\n'
            }

            // This way, for instance if we have Droid, Human implementing Character
            // and a query hero() which returns type Character, we can then call
            // hero.asDroid.primaryFunction and compile that into an inline fragment
            for(let obj of schema.types){
                if(obj.kind != 'OBJECT') continue;
                if(!obj.interfaces.some(interf => interf.name == type.name)) continue;
                ts += INDENT + "/** Use `as" + obj.name + "` to access fields on the underlying concrete type. */\n"
                ts += INDENT + 'as' + obj.name + ': ' + obj.name + '\n'
            }
            ts += '}\n\n'
        }else if(type.kind == 'SCALAR'){
            if(type.name == 'String' || type.name == 'Boolean') continue;
            if(type.description) 
                ts += "/** " + type.description + " */\n";
            if(type.name in SCALAR_MAP){
                ts += 'export type ' + type.name + ' = ' + SCALAR_MAP[type.name] + '\n\n'
            }else{
                ts += 'export type ' + type.name + ' = any\n\n'
            }
        }else if(type.kind == 'UNION'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";
            ts += 'export type ' + type.name + ' = ' + type.possibleTypes.map(type => GQLType2TS(type)).join(' | ') + '\n\n'
        }else if(type.kind == 'ENUM'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";
            // TODO: determine whether this is the right way to think about enums
            ts += 'export type ' + type.name + ' = ' + type.enumValues.map(val => JSON.stringify(val.name)).join(' | ') + '\n\n'
        }else if(type.kind == 'INPUT_OBJECT'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";

            ts += 'export type ' + type.name + ' = {\n'
            for(let field of type.inputFields){
                if(field.description) 
                    ts += INDENT + "/** " + field.description + " */\n"
                ts += INDENT + field.name +  (IsGQLTypeNullable(field.type) ? '?: ' : ': ') + GQLType2TS(field.type) + '\n'
            }
            ts += '}\n\n'
        }else{
            throw new Error(`Unable to handle type "${type.kind}" named "${type.name}"`)
        }
    }
    return ts
}

function GQLType2TS(type) {
    if(type.kind == 'LIST')
        return GQLType2TS(type.ofType ) + '[]';
    if(type.kind == 'NON_NULL') return GQLType2TS(type.ofType );
    if(type.name == 'String') return 'string';
    if(type.name == 'Boolean') return 'boolean';
    if(type.kind == 'SCALAR') return type.name;
    if(type.kind == 'UNION') return type.name;
    if(type.kind == 'OBJECT') return type.name;
    if(type.kind == 'INPUT_OBJECT') return type.name;
    if(type.kind == 'ENUM') return type.name;
    if(type.kind == 'INTERFACE') return type.name;
    throw new Error(`Unable to handle type "${type.kind}" named "${type.name}"`)
}



function IsGQLTypeNullable(type) {
    return type.kind != 'NON_NULL'
}

// For arrays, we bypass the result of filter so that it always returns the same
// list. This is so that we can observe which parts of the list get used in the
// map or forEach that may follow a filter.
function makeFixedArray(obj) {
    return new FixedPointArray(obj)
}

class FixedPointArray extends Array {
    filter(){
        Array.prototype.filter.apply(this, arguments)
        return this
    }
    splice(){
        Array.prototype.splice.apply(this, arguments)
        return this
    }
    slice(){
        Array.prototype.slice.apply(this, arguments)
        return this
    }
    reverse(){
        Array.prototype.reverse.apply(this, arguments)
        return this
    }
    sort(){
        Array.prototype.sort.apply(this, arguments)
        return this
    }
}


function invar(invariant, message){
    if(!invariant) throw new Error(message)
}

// graphql query directive helper
export function D(directive_string, value){
    if(lastHandlePointer){
        if(value === lastHandleValue){
            // do something with lastHandlePointer
            lastHandlePointer.__directive = directive_string;
        }else{
            console.warn('The Autograph directive helper D("@directive", value) ' + 
                'must be applied directly to an Autograph value without any intervening ' + 
                'logic or variables. \n Good: D("@client", query.field.stuff) \n '+
                'Bad: let x = query.field.stuff; D("@client", x)')
        }
    }
    return value;
}

// Provider
export function createRoot(config){
    let root = new AutographModel(config)
    class AutographRootComponent extends React.Component {
        componentDidMount(){ root.mount() }
        componentWillUnmount(){ root.unmount() }
        render(){
            if(!root.currentlyDryRendering){
                root.mountedFiber = this._reactInternalFiber;
            }
            return <React.Suspense fallback={<div />}>
                <AutographContext.Provider value={root}>
                    {this.props.children}
                </AutographContext.Provider>
            </React.Suspense>
        }
    }
    AutographRootComponent._root = root;
    return AutographRootComponent;
}

// Hook
export function useQuery(config = 'default', handleOptions){
    let root = React.useContext(AutographContext);
    let query = root.getQuery(config);
    let [ version, setVersion ] = React.useState(0)
    React.useEffect(() => {
        let update = () => setVersion(k => k + 1)
        query.subscribe(update)
        return () => query.unsubscribe(update)
    }, [])
    return query.createHandle(handleOptions)
}

// Render Prop
export class Query extends React.Component {
    constructor(){
        super()
        this.state = { version: 0 }
        this.update = () => this.setState(s => ({ version: s.version + 1 }))
    }
    componentDidMount(){
        let query = this.context.getQuery(this.props.config);
        query.subscribe(this.update)
    }
    componentWillUnmount(){
        let query = this.context.getQuery(this.props.config);
        query.unsubscribe(this.update)
    }
    render(){
        let query = this.context.getQuery(this.props.config);
        return this.props.children(query.createHandle(this.props.handleOptions))
    }
}
Query.contextType = AutographContext;

// HOC
export function withQuery(config = 'default', handleOptions){
    return function(BaseComponent){
        function WithQuery(props){
            return <Query config={config} handleOptions={handleOptions}>
                {query => <BaseComponent {...props} query={query} />}
            </Query>
        }
        return WithQuery
    }
}



// utils

function shallowCompare(a, b){
    return JSON.stringify(a) === JSON.stringify(b)
}


function nextFrame(){
    return new Promise(resolve => { 
        // setTimeout(resolve, 0)
        resolve()
        // requestAnimationFrame(resolve) 
    })
}


function hashArguments(args) {
    // This is a simple implementation of Dan Bernstein's djb2 non-cryptographic hash algorithm
    // which should suffice to keep adjacent gql queries with different arguments from colliding
    let json = JSON.stringify(args || {})
    for(var i = 0, hash = 5381; i < json.length; i++)
        hash = (((hash << 5) + hash) + json.charCodeAt(i)) | 0;
    return Math.abs(hash).toString(36);
}

function _elementFromFiber(fiber){
    if(!fiber) debugger;

    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}


let SUCCINCT_INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      subscriptionType { name }
      types { ...FullType }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args { ...InputValue }
      type { ...TypeRef }
    }
    inputFields { ...InputValue }
    interfaces { ...TypeRef }
    enumValues(includeDeprecated: true) {
      name
      description
    }
    possibleTypes { ...TypeRef }
  }

  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType { kind, name, ofType { kind, name, ofType { kind, name } } }
  }
`


// let MINIMAL_INTROSPECTION_QUERY = `
//   query IntrospectionQuery {
//     __schema {
//       queryType { name }
//       mutationType { name }
//       subscriptionType { name }
//       types { ...FullType }
//     }
//   }

//   fragment FullType on __Type {
//     kind
//     name
//     fields(includeDeprecated: true) {
//       name
//       args { ...InputValue }
//       type { ...TypeRef }
//     }
//     inputFields { ...InputValue }
//     interfaces { ...TypeRef }
//     enumValues(includeDeprecated: true) {
//       name
//       description
//     }
//     possibleTypes { ...TypeRef }
//   }

//   fragment InputValue on __InputValue {
//     name
//     type { ...TypeRef }
//   }

//   fragment TypeRef on __Type {
//     kind
//     name
//     ofType { kind, name, ofType { kind, name, ofType { kind, name } } }
//   }
// `


