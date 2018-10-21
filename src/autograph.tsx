import * as React from "react";

let succinctIntrospectionQuery = `
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

type GenericObject = { [key: string]: any }

interface GQLSchema {
    queryType: { name: string }
    types: Array<GQLSchemaRootType>
}

interface GQLSchemaRootType  {
    kind: string
    name: string
    description?: string
    fields: Array<GQLSchemaField>
    possibleTypes: Array<GQLTypeRef>
    enumValues: Array<{name: string}>
    inputFields: Array<GQLInputValue>
}

interface GQLSchemaField {
    name: string
    description?: string
    args: Array<GQLInputValue>
    type: GQLTypeRef
}

interface GQLInputValue {
    name: string
    description: string
    type: GQLTypeRef
}

interface GQLTypeRef {
    kind: string
    name: string
    enumValues: Array<any>
    ofType: GQLTypeRef
}

export async function autographData({ url, render } : {
    url: string, 
    render: (Query: GenericObject) => JSX.Element
}) {
    let schema: GQLSchema = (await gqlFetchMemo(url, succinctIntrospectionQuery)).data.__schema;
    let query = schema.types.find(k => k.name == schema.queryType.name)
    if(!query) throw new Error(`Unable to find root query type "${schema.queryType.name}" in schema`);
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, query, accessLog)))
    return (await gqlFetchMemo(url, generateGraphQL(accessLog))).data
}

export function AutographSuspense({ url, render } : {
    url: string, 
    render: (Query: GenericObject) => JSX.Element
}){
    let schema: GQLSchema = gqlFetchSuspense(url, succinctIntrospectionQuery).data.__schema;
    let query = schema.types.find(k => k.name == schema.queryType.name)
    if(!query) throw new Error(`Unable to find root query type "${schema.queryType.name}" in schema`);
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, query, accessLog)))
    let data = gqlFetchSuspense(url, generateGraphQL(accessLog)).data
    return render(makeRetriever(data))
}


export function AutographHOC(url: string){
    return function(Component: React.ComponentType<{ Query: GenericObject }>){
        return function(props: GenericObject){
            return <Autograph url={url} render={Query => 
                <Component {...props} Query={Query} />}/>    
        }
    }
}


// This is kinda janky for a number of reasons. TODO: fix this.
export class Autograph2 extends React.Component<{
    url: string, 
    render: (Query: GenericObject) => JSX.Element,
    loading?: JSX.Element
}> {
    render(){
        let { url, render, loading } = this.props;
        let data;
        try {
            let schema: GQLSchema = gqlFetchSuspense(url, succinctIntrospectionQuery).data.__schema;
            console.log(schema)
            // console.log(generateTypescript(schema, url))
            let query = schema.types.find(k => k.name == schema.queryType.name)
            if(!query) throw new Error(`Unable to find root query type "${schema.queryType.name}" in schema`);
            let accessLog = {}
            pseudoRender(render(makeTracker(schema.types, query, accessLog)))
            data = gqlFetchSuspense(url, generateGraphQL(accessLog)).data
        } catch (err) {
            if(err instanceof Promise){
                err.then(e => this.setState({ }))
                return loading || <div>Loading...</div>
            }else throw err;
        }
        return render(makeRetriever(data))
    }
}



export default class Autograph extends React.Component<{
        url: string, 
        render: (Query: GenericObject) => JSX.Element
    }, {
        schema?: GQLSchema 
        lastURL?: string
        lastGraphQL?: string
        loadingSchema?: boolean
        loadingData?: boolean
        data?: any
        errors: Array<any> | null
    }> {

    state = {
        errors: null,
        loadingSchema: false,
        loadingData: false,
        schema: undefined,
        data: undefined,
        lastURL: undefined,
        lastGraphQL: undefined
    }

    render(){
        // if url changes, refetch schema
        // do pseudo-rendering pass
        // generate graphql
        // if graphql changes, re-run query
        // then render with concrete data

        let url = this.props.url;

        if(this.state.lastURL !== url){
            if(!this.state.loadingSchema){
                this.state.loadingSchema = true;
                gqlFetch(url, succinctIntrospectionQuery)
                    .then(result => {
                        // console.log(result.data.__schema)
                        console.log(generateTypescript(result.data.__schema, url))
                        this.setState({ schema: result.data.__schema, lastURL: url, loadingSchema: false })
                    })    
            }
            return <div>Loading schema...</div>
        }

        let schema: GQLSchema = this.state.schema;
        let query = schema.types.find(k => k.name == schema.queryType.name)
        if(!query) throw new Error(`Unable to find root query type "${schema.queryType.name}" in schema`);
        let log = {}
        let tracker = makeTracker(schema.types, query, log)
        // console.log(tracker)
        pseudoRender(this.props.render(tracker))
        // console.log(log)


        let graphQL = generateGraphQL(log)
        if(this.state.lastGraphQL !== graphQL){
            if(!this.state.loadingData){
                this.state.loadingData = true;
                console.log(graphQL)
                gqlFetch(url, graphQL)
                    .then(result => {
                        if(result.errors){
                            this.setState({ errors: result.errors, lastGraphQL: graphQL, loadingData: false })    
                        }else{
                            this.setState({ errors: null, data: result.data, lastGraphQL: graphQL, loadingData: false })    
                        }
                    })
            }
            
            return <div>Loading data...</div>
        }
        if(this.state.errors){
            return <pre>{this.state.errors.map(error => <div>
                <div><b>{error.message}</b></div>
                <div>{JSON.stringify(error.locations)}</div>
                <div>{error.stack}</div>
            </div>)}</pre>
        }
        return this.props.render(makeRetriever(this.state.data))
    }
}


export function pseudoRender(element: JSX.Element){
    if(Array.isArray(element)){ // render all children
        for(let el of element) pseudoRender(el);
        return
    }
    // console.log(element, React.isValidElement(element))
    if(!React.isValidElement(element)) return;
    
    if((element.props as GenericObject).children)
        pseudoRender((element.props as GenericObject).children);
    if(typeof element.type === 'function'){
        if(element.type.prototype.render){
            // stateful react components
            let clone = React.cloneElement(element)
            let el = new (clone.type as any)(clone.props)
            el.render()
        }else{
            // stateless functional react components
            pseudoRender((element.type as (props: GenericObject) => JSX.Element)(element.props))    
        }
    }
}



export function makeTracker(types: Array<GQLSchemaRootType>, obj: GQLSchemaRootType, query: GenericObject){
    let tracker = { __typename: obj.name }
    const subtrack = (field: GQLSchemaField, type: GQLTypeRef, args: GenericObject): any => {
        let key = encodeField(field, args);
        if(type.kind == 'NON_NULL') return subtrack(field, type.ofType, args);
        if(type.kind == 'LIST') return [ subtrack(field, type.ofType, args) ];
        if(type.kind == 'OBJECT'){
            let subobj = types.find(k => k.name == type.name)
            if(!subobj) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return makeTracker(types, subobj, query[key] || (query[key] = { }));
        }
        query[key] = 1
        if(type.kind == 'ENUM') return type.enumValues[0];
        if(type.name == 'Int' || type.name == 'Float') return 42;
        if(type.name == 'String') return '{' + field.name + '}';
        if(type.name == 'ID') return Math.random().toString(36).slice(3);
        return null
    }
    for(let field of obj.fields){
        if(field.args.length === 0){
            Object.defineProperty(tracker, field.name, {
                get: () => subtrack(field, field.type, {})
            })
        }else{
            tracker[field.name] = (args: GenericObject) => subtrack(field, field.type, args || {})
        }
    }
    return tracker
}

export function encodeField(field: { name: string, args: Array<any> }, args: null | any): string {
    return JSON.stringify([ field.name, field.args.length == 0 ? null : (args || {}) ])
}

export function decodeField(key: string): [string, null | any] {
    return JSON.parse(key)
}

export function encodeArguments(name: string, args: any): string {
    return name + '___' + JSON.stringify(args || {})
        .replace(/[^\w]+/g, '')
}

export function decodeArguments(slug: string): [ string, boolean ] {
    let parts = slug.split('___')
    return [ parts[0], parts.length > 1 ]
}

type AccessLog = { [key: string]: AccessLog } | 1

export function generateGraphQL(graph: AccessLog){
    if(graph === 1) return '';
    let s = '{\n'
    const indent = (x: string) => x.split('\n').map(k => '  ' + k).join('\n')
    
    const encodeValue = (obj: any): string =>
        (typeof obj === 'object') ? 
            (Array.isArray(obj) ? 
                ('[' + obj.map(encodeValue).join(', ') + ']'):
                ('{' + encodeKV(obj) + '}') ) : 
            JSON.stringify(obj)
    
    const encodeKV = (obj: GenericObject): string => Object.keys(obj)
        .map(key => key + ': ' + encodeValue(obj[key]))
        .join(', ')

    for(let key in graph){
        let [ name, args ] = decodeField(key);
        if(args === null){
            s += indent(name + ' ' + generateGraphQL(graph[key])) + '\n'
        }else{
            let argpart = Object.keys(args).length > 0 ? ('(' + 
                encodeKV(args)
            + ') ') : ' '
            s += indent(encodeArguments(name, args) + ': ' + name + 
                argpart + generateGraphQL(graph[key])) + '\n'
        }
    }
    // this way we dont wind up with an empty block syntax error
    if(Object.keys(graph).length == 0) s += '  __typename\n'; 
    s += '}'
    return s
}



function gqlFetch(url: string, query: string){
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: query})
    })
    .then(resp => resp.json())
}

let cachePromises = {}
function gqlFetchMemo(url: string, query: string){
    let key = url + query;
    if(cachePromises[key]) return cachePromises[key];
    return cachePromises[key] = gqlFetch(url, query)
}


let cacheData = {}
function gqlFetchSuspense(url: string, query: string){
    let key = url + query;
    if(cacheData[key]) return cacheData[key];
    throw gqlFetchMemo(url, query)
        .then((data: any) => cacheData[key] = data)
}


export function makeRetriever(data: any): any {
    if((typeof data != 'object') || !data) return data;
    if(Array.isArray(data)) return data.map(k => makeRetriever(k));

    let retriever : {[key: string]: any} = {}
    for(let key in data){
        let [ name, hasArgs ] = decodeArguments(key)
        retriever[name] = (!hasArgs) ? 
            makeRetriever(data[key])
            : (args: {[key: string]: any}) => {
                return makeRetriever(data[encodeArguments(name, args)])
            }
    }
    return retriever
}


export function generateTypescript(schema: GQLSchema, url: string | null = null){
    let ts = ''
    if(url){
        ts += 'export const url = ' + JSON.stringify(url) + '\n\n'
    }
    const SCALAR_MAP = {
        'String': 'string',
        'Int': 'number',
        'Float': 'number',
        'Boolean': 'boolean',
        'ID': 'string'
    }

    const printTypeCore = (type: GQLTypeRef): string => {
        let suffix = ''
        while(type.kind == 'LIST'){
            type = type.ofType
            suffix += '[]'
        }
        if(type.kind == 'NON_NULL'){
            type = type.ofType
        }
        if(type.kind == 'SCALAR'){
            if(SCALAR_MAP[type.name]){
                return (SCALAR_MAP[type.name] || 'any') + suffix;
            }else{
                return type.name + suffix;
            }
        }else if(type.kind == 'OBJECT' || type.kind == 'ENUM' || 
            type.kind == 'INTERFACE' || type.kind == 'UNION' || 
            type.kind == 'INPUT_OBJECT'){
            return type.name + suffix
        }
        throw new Error(`Unable to handle type "${type.kind}" named "${type.name}"`)
    }


    const printType = (type: GQLTypeRef): string => {
        let prefix = '?: '
        if(type.kind == 'NON_NULL'){
            type = type.ofType
            prefix = ': '
        }
        return prefix + printTypeCore(type)
    }

    const printFunctionType = (type: GQLTypeRef): string => {
        let suffix = ' | null'
        if(type.kind == 'NON_NULL'){
            type = type.ofType
            suffix = ''
        }
        return ': ' + printTypeCore(type) + suffix
    }
    
    for(let type of schema.types){
        if(type.name[0] == '_') continue;
        
        if(type.description && !(type.kind === 'SCALAR' && type.name in SCALAR_MAP)) 
            ts += "/** " + type.description + " */\n";

        if(type.kind === 'SCALAR'){
            if(!SCALAR_MAP[type.name]){
                ts += 'export type ' + type.name + ' = any\n\n'
            }
        }else if(type.kind === 'UNION'){
            ts += 'export type ' + type.name + ' = ' + 
                type.possibleTypes.map(k => printTypeCore(k)).join(' | ') + '\n\n'
        }else if(type.kind === 'ENUM'){
            ts += 'export type ' + type.name + ' = ' + 
                type.enumValues.map(k => JSON.stringify(k.name)).join(' | ') + '\n\n'
        }else if(type.kind === 'OBJECT' || type.kind === 'INTERFACE'){
            ts += 'export type ' + type.name + ' = {\n'
            for(let field of type.fields){
                if(field.description) 
                    ts += "    /** " + field.description + " */\n"

                if(field.args.length > 0){
                    ts += '    ' + field.name + '(args: { ' + 
                        field.args
                            .map(arg => arg.name + printType(arg.type))
                            .join(', ') 
                        + ' })' + printFunctionType(field.type) + '\n'
                }else{
                    ts += '    ' + field.name + printType(field.type) + '\n'
                }
                ts += '\n'
            }
            ts += '}\n\n'
            
        }else if(type.kind === 'INPUT_OBJECT'){
            ts += 'export type ' + type.name + ' = {\n'
            for(let field of type.inputFields){
                if(field.description) 
                    ts += "    /** " + field.description + " */\n"
                ts += '    ' + field.name + printType(field.type) + '\n'
                ts += '\n'
            }
            ts += '}\n\n'
        }else{
            console.warn('Unknown Type', type)
        }
    }
    return ts
}