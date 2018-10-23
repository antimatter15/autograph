import { parse } from 'graphql'
import { graphql, buildASTSchema } from 'graphql'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import 'isomorphic-fetch'

import * as React from 'react'

let succinctIntrospectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
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

type GQLSchema = {
    queryType: { name: string }
    mutationType: { name: string }
    types: GQLTypeDef[]
}

type GQLTypeDef = {
    kind: string
    name: string
    description?: string
    fields: GQLField[]
    inputFields: GQLInputValue[]
    interfaces: GQLType[]
    enumValues: GQLEnumValues[]
    possibleTypes: GQLType[]
}

type GQLEnumValues = {
    name: string
    description?: string
}

type GQLField = {
    name: string
    description?: string
    args: GQLInputValue[]
    type: GQLType
}

type GQLInputValue = {
    name: string
    description?: string
    type: GQLType
}

type GQLType = {
    kind: string
    name: string
    ofType?: GQLType
}

export async function parseGraphQL(schemaSource: string): Promise<GQLSchema> {
    let doc = buildASTSchema(parse(schemaSource), {
        commentDescriptions: true
    })
    let data = await graphql(doc, succinctIntrospectionQuery) as any;
    return data.data.__schema;

    // return (await runGraphQL(schemaSource, succinctIntrospectionQuery) as any).__schema
}

export async function runGraphQL(schemaSource: string, query: string, resolvers = {}): Promise<{ errors?: any[], data?: any }> {

    const schema = makeExecutableSchema({ 
        typeDefs: schemaSource,
        // resolverValidationOptions: {
        //     requireResolversForResolveType: false
        //   },

        resolvers: resolvers,
        inheritResolversFromInterfaces: true,
        // typeResolvers: typeResolvers

    });

    // addResolveFunctionsToSchema({ 
    //     schema, 
    //     resolvers,
    //     inheritResolversFromInterfaces: true
    // })

    addMockFunctionsToSchema({ schema, preserveResolvers: true });
    return await graphql(schema, query) as any

    // if(result.errors) throw result.errors[0];

    // return result.data
}



type GQLClient = (query: string) => Promise<{ data?: any, errors?: any[] }>
type QueryType = GenericObject

async function runGQL(url: string | GQLClient, query: string): Promise<{ data?: any, errors?: any[] }> {
    if(typeof url == 'string'){
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: query})
        })
        .then(resp => resp.json())
    }else{
        return await url(query)
    }
}

// This function fetches the schema from the given graphql endpoint,
// passes a synthetic access logger do a single dry run with the render
// function, generates the corresponding graphql query, executes the
// query and returns the results as plain JSON. 

// This function is useful for server side rendering (SSR) applications
// which may require a pure JSON-serializable response. 

export async function getDataFromTree<QueryType, Result>(
    url: string | GQLClient, 
    operationType: OperationTypes, 
    render: ((query: QueryType) => Result)
): Promise<GenericObject> {
    let schema: GQLSchema = (await runGQL(url, succinctIntrospectionQuery)).data.__schema
    let accessLog = {}
    traverseTree(render(makeAccessLogger(schema, getQueryRoot(schema, operationType), accessLog) as QueryType))
    let gql = accessLogToGraphQL(accessLog, { operationType: operationType })
    return (await runGQL(url, gql)).data
}

export function CreateMutation<MutationType>(url: string | GQLClient) {
    return async function Mutation<Result>(render: ((mutation: MutationType) => Result)): Promise<Result> {
        return render(makeRetriever(await getDataFromTree(url, 'mutation', render)))
    }
}

export function CreateQuery<QueryType>(url: string | GQLClient) {
    return async function Query<Result>(render: ((query: QueryType) => Result)): Promise<Result> {
        return render(makeRetriever(await getDataFromTree(url, 'query', render)))
    }
}

export function withAutograph(url: string){
    return function(Component: React.ComponentType<{ Query: QueryType }>){
        return function(props: GenericObject){
            return <Autograph url={url}>{
                Query => <Component {...props} Query={Query} />
            }</Autograph>
        }
    }
}

export class Autograph extends React.Component<{
    url: string
    children: (Query: QueryType) => JSX.Element
    suspense?: boolean
    loading?: JSX.Element
}> {
    cache : { [key: string]: { result: any, promise: Promise<any>} } = {}

    // synchronously resolve a GQL query if it exists in the cache
    // otherwise initiate a fetch and return null. If the 'suspense'
    // prop is `true` instead of returning null, it throws a promise
    // that resolves when the fetching is completed

    syncGQL(query: string){
        let key = JSON.stringify([this.props.url, query])
        if(this.cache[key]){
            if(this.props.suspense) throw this.cache[key].promise;
            return this.cache[key].result;
        }
        const update = (result: any) => {
            this.cache[key].result = result
            if(!this.props.suspense) this.setState({})
        }
        this.cache[key] = {
            promise: runGQL(this.props.url, query)
                .then(result => update(result), err => update({ errors: [err] })),
            result: null
        }
        if(this.props.suspense) throw this.cache[key].promise;
        return null;
    }
    render(){
        let { children: renderFn, loading = <div>Loading...</div> } = this.props;
        let schemaRequest, dataRequest;
        if(!(schemaRequest = this.syncGQL(succinctIntrospectionQuery))) return loading;
        if(schemaRequest.errors) return <div>Schema Error: {JSON.stringify(schemaRequest.errors)}</div>
        let schema: GQLSchema = schemaRequest.data.__schema;
        let accessLog = {}
        traverseTree(renderFn(makeAccessLogger(schema, getQueryRoot(schema), accessLog)))
        let gql = accessLogToGraphQL(accessLog)
        if(!(dataRequest = this.syncGQL(gql))) return loading;
        if(dataRequest.errors) return <div>Data Error: {JSON.stringify(dataRequest.errors)}</div>
        return renderFn(makeRetriever(dataRequest.data))
    }
}


function traverseTree(element: any): void {
    if(Array.isArray(element)){ // render all children
        for(let el of element) traverseTree(el);
        return
    }
    if(!React.isValidElement(element)){
        if(typeof element == 'object'){
            for(let key in element){
                traverseTree(element[key])
            }
        }
        return
    }
    if((element.props as GenericObject).children)
        traverseTree((element.props as GenericObject).children);
    if(typeof element.type === 'function'){
        if(element.type.prototype.render){
            // stateful react components
            let clone = React.cloneElement(element)
            let el = new (clone.type as any)(clone.props)
            el.render()
        }else{
            // stateless functional react components
            traverseTree((element.type as (props: GenericObject) => JSX.Element)(element.props))    
        }
    }
}

function IsGQLTypeNullable(type: GQLType): boolean {
    return type.kind != 'NON_NULL'
}

function GQLType2TS(type: GQLType): string {
    if(type.kind == 'LIST')
        return GQLType2TS(type.ofType as GQLType) + '[]';
    if(type.kind == 'NON_NULL') return GQLType2TS(type.ofType as GQLType);
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


export function schemaToTypescript(schema: GQLSchema): string {
    const INDENT = '    ' // 4 spaces
    let ts = ''

    if(schema.queryType.name != 'Query'){
        ts += 'type Query = ' + schema.queryType.name + '\n\n' 
    }

    if(schema.mutationType && schema.mutationType.name != 'Mutation'){
        ts += 'type Mutation = ' + schema.mutationType.name + '\n\n' 
    }

    ts += 'type GQLType = {\n'
    ts += INDENT + "/** This field is defined when Autograph is executing a dry run */\n"
    ts += INDENT + '__dryRun?: boolean\n'
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

type OperationTypes = 'query' | 'mutation'

export function getQueryRoot(schema: GQLSchema, operationType: OperationTypes = 'query'){
    let name: string;
    if(operationType == 'query'){
        name = schema.queryType.name
    }else if(operationType == 'mutation'){
        if(!schema.mutationType) throw new Error('Schema does not define a mutation type');
        name = schema.mutationType.name
    }else throw new Error(`Unsupported operation type "${operationType}" expected "mutation" or "query".`)
    let query = schema.types.find(k => k.name == name)
    if(!query) throw new Error(`Unable to find root ${operationType} type "${name}" in schema`);
    return query
}

// this is useful for the skipIf(query.__dryRun, blah)({ x, y })
export function skipIf(cond: any, func: Function) {
    return cond ? (() => {}) : func
}

function hashArguments(args: any): string {
    // This is a simple implementation of Dan Bernstein's djb2 non-cryptographic hash algorithm
    // which should suffice to keep adjacent gql queries with different arguments from colliding
    let json = JSON.stringify(args || {})
    for(var i = 0, hash = 5381; i < json.length; i++)
        hash = (((hash << 5) + hash) + json.charCodeAt(i)) | 0;
    return Math.abs(hash).toString(36);
}

type AccessLog = { [key: string]: AccessLog } | 1
type GenericObject = { [key: string]: any }

export function makeAccessLogger(schema: GQLSchema, obj: GQLTypeDef, log: AccessLog){
    let logger: GenericObject = { }
    
    // allow functions to distinguish between the dry run and the real execution
    // for instance to specifically gate side effects
    Object.defineProperty(logger, '__dryRun', {
        enumerable: false,
        value: true
    })

    Object.defineProperty(logger, '__typename', {
        enumerable: false,
        get: () => {
            log[JSON.stringify({
                type: 'NAV',
                name: '__typename',
                hasArgs: false,
                args: {}
            })] = 1
            return obj.name
        }
    })

    const navigate = (field: GQLField, type: GQLType, args: GenericObject): any => {
        if(type.kind == 'NON_NULL') return navigate(field, type.ofType as GQLType, args);
        if(type.kind == 'LIST') return [ navigate(field, type.ofType as GQLType, args) ];
        if(type.kind == 'UNION'){
            let sub = schema.types.find(k => k.name == type.name)
            if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return navigate(field, (sub as GQLTypeDef).possibleTypes[0], args)
        }

        let key = JSON.stringify({
            type: 'NAV',
            name: field.name,
            hasArgs: field.args.length > 0,
            args: args
        })

        if(type.kind == 'INTERFACE' || type.kind == 'OBJECT'){
            let sub = schema.types.find(k => k.name == type.name)
            if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return makeAccessLogger(schema, sub, log[key] || (log[key] = { }));
        }

        log[key] = 1
        
        if(type.name == 'ID') return 'Autograph ID ' + Math.random().toString(36).slice(3);
        if(type.name == 'String') return 'Autograph {' + field.name + '}';
        if(type.name == 'Int') return 42;
        if(type.name == 'Float') return 17.76;
        if(type.name == 'Boolean') return true;
        
        if(type.kind == 'ENUM'){
            let sub = schema.types.find(k => k.name == type.name)
            if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return sub.enumValues[0].name
        }

        if(type.kind == 'SCALAR') return { __gqlScalarName: type.name }

        throw new Error(`Unable to handle ${type.kind} named "${type.name}" in field "${field.name}"`)

    }

    if(obj.kind === 'OBJECT' || obj.kind == 'INTERFACE'){
        for(let field of obj.fields){
            if(field.args.length === 0){
                Object.defineProperty(logger, field.name, {
                    get: () => navigate(field, field.type, {})
                })
            }else{
                logger[field.name] = (args: GenericObject) => navigate(field, field.type, args || {})
            }
        }
        if(obj.kind === 'INTERFACE'){
            for(let type of schema.types){
                if(type.kind != 'OBJECT') continue;
                if(!type.interfaces.some(k => k.name == obj.name)) continue;

                Object.defineProperty(logger, 'as' + type.name, {
                    get: () => {
                        let key = JSON.stringify({ type: 'AS', name: type.name })
                        return makeAccessLogger(schema, type, log[key] || (log[key] = {}))
                    }
                })
            }
        }
    }else{
        throw new Error(`Access logger can only be created on OBJECT and INTERFACE types, not ${obj.kind}`)
    }
    
    return logger
}

type GraphQLGeneratorOptions = {
    operationType?: 'query' | 'mutation' | 'subscription'
}

const DefaultGraphQLGeneratorOptions: GraphQLGeneratorOptions = {
    operationType: 'query'
}

export function accessLogToGraphQL(log: AccessLog, options: GraphQLGeneratorOptions = DefaultGraphQLGeneratorOptions): string {
    options = Object.assign({}, DefaultGraphQLGeneratorOptions, options)

    const encodeValue = (obj: any): string =>
        (typeof obj === 'object') ? 
            (Array.isArray(obj) ? 
                ('[' + obj.map(encodeValue).join(', ') + ']'):
                ('{' + encodeKV(obj) + '}') ) : 
            JSON.stringify(obj)
    
    const encodeKV = (obj: GenericObject): string => Object.keys(obj)
        .map(key => key + ': ' + encodeValue(obj[key]))
        .join(', ')

    const indent = (x: string) => x.split('\n').map(k => '  ' + k).join('\n')

    const convertRecursive = (log: AccessLog, prefix = ''): string => {
        if(log === 1) return '';

        let gql = ''
        gql += '{\n'
        for(let key of Object.keys(log)) {
            let info = JSON.parse(key)
            if(info.type == 'NAV'){
                if(info.hasArgs){
                    gql += indent(prefix + info.name + '___' + hashArguments(info.args) + ': ' + info.name + 
                        (Object.keys(info.args).length > 0 ? ('(' + encodeKV(info.args) + ')') : '') + ' ' + convertRecursive(log[key]))  + '\n'
                }else{
                    gql += indent((prefix ? (prefix + info.name + ': ') : '') + info.name + ' ' + convertRecursive(log[key])) + '\n'
                }
            }else if(info.type == 'AS'){
                gql += indent('... on ' + info.name + ' ' + convertRecursive(log[key], '__AS_' + info.name + '___')) + '\n'
            }else throw new Error(`Encountered unexpected navigation type "${info.type}"`)
        }

        if(Object.keys(log).length == 0){
            gql += indent((prefix ? (prefix + '__typename: ') : '') + '__typename') + '\n'
        }

        gql += '}'
        return gql;
    }

    if(options.operationType == 'query'){
        return convertRecursive(log, '')
    }else if(options.operationType == 'mutation'){
        return 'mutation ' + convertRecursive(log, '')
    }else{
        throw new Error(`Unsupported operation type "${options.operationType}"`)
    }
}



export function makeRetriever(data: any): any {
    if(!data) return data;
    if(typeof data != 'object') return data;
    if(Array.isArray(data)) return data.map(k => makeRetriever(k));

    let retriever : GenericObject = {}

    for(let key in data){
        if(key.startsWith('__AS_')){
            let name = 'as' + key.slice(5, key.indexOf('___'))
            if(!retriever[name]) retriever[name] = {}
            Object.assign(retriever[name], makeRetriever({ 
                [key.slice(key.indexOf('___') + 3)]: data[key] 
            }))
        }else if(key.indexOf('___') > 0){
            let name = key.split('___')[0]
            retriever[name] = (args: GenericObject) => makeRetriever(data[name + '___' + hashArguments(args)])
        }else{
            retriever[key] = makeRetriever(data[key])
        }
    }
    return retriever
}


