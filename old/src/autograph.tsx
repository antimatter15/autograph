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

// type GQLQuery = { [key: string]: any }
type GQLQuery = any

interface GQLSchema {
    queryType: { name: string }
    types: Array<GQLSchemaRootType>
}

interface GQLSchemaRootType  {
    kind: string
    name: string
    description?: string
    fields: Array<GQLSchemaField>
    possibleTypes: Array<GQLSchemaType>
    enumValues: Array<{name: string}>
    inputFields: Array<GQLSchemaInput>
}

interface GQLSchemaField {
    name: string
    description?: string
    args: Array<GQLSchemaInput>
    type: GQLSchemaType
}

interface GQLSchemaInput {
    name: string
    description: string
    type: GQLSchemaType
}

interface GQLSchemaType {
    kind: string
    name: string
    enumValues: Array<any>
    ofType: GQLSchemaType
}

export async function autographData(url: string, render: (Query: GQLQuery) => JSX.Element) {
    let schema: GQLSchema = (await gqlFetchMemo(url, succinctIntrospectionQuery)).data.__schema;
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, getQueryRoot(schema), accessLog)))
    return (await gqlFetchMemo(url, generateGraphQL(accessLog))).data
}


export function AutographSuspense({ url, children: render } : {
    url: string, 
    children: (Query: GQLQuery) => JSX.Element
}){
    let schema: GQLSchema = gqlFetchSuspense(url, succinctIntrospectionQuery).data.__schema;
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, getQueryRoot(schema), accessLog)))
    let data = gqlFetchSuspense(url, generateGraphQL(accessLog)).data
    return render(makeRetriever(data))
}


export function withAutograph(url: string){
    return function(Component: React.ComponentType<{ Query: GQLQuery }>){
        return function(props: GenericObject){
            return <Autograph url={url}>{
                Query => <Component {...props} Query={Query} />
            }</Autograph>
        }
    }
}

export default class Autograph extends React.Component<{
    url: string,
    children: (Query: GQLQuery) => JSX.Element,
}> {
    render(){
        let { url, children: renderFn } = this.props;
        let schemaRequest, dataRequest;
        if(!( schemaRequest = superfetch(url, succinctIntrospectionQuery, schema => {
            if(schema.data && schema.data.__schema) console.log(generateTypescript(schema.data.__schema, url))
            this.setState({})
        }) )) 
            return <div>loading schema...</div>;
        if(schemaRequest.errors) return <div>Schema Error: {JSON.stringify(schemaRequest.errors)}</div>
        let schema: GQLSchema = schemaRequest.data.__schema;
        let accessLog = {}
        pseudoRender(renderFn(makeTracker(schema.types, getQueryRoot(schema), accessLog)))
        if(!( dataRequest = superfetch(url, generateGraphQL(accessLog), data => this.setState({}))))
            return <div>loading data...</div>;
        if(dataRequest.errors) return <div>Data Error: {JSON.stringify(dataRequest.errors)}</div>
        return renderFn(makeRetriever(dataRequest.data))
    }
}


function getQueryRoot(schema: GQLSchema){
    let query = schema.types.find(k => k.name == schema.queryType.name)
    if(!query) throw new Error(`Unable to find root query type "${schema.queryType.name}" in schema`);
    return query
}


export function pseudoRender(element: JSX.Element){
    if(Array.isArray(element)){ // render all children
        for(let el of element) pseudoRender(el);
        return
    }
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
    const subtrack = (field: GQLSchemaField, type: GQLSchemaType, args: GenericObject): any => {
        let key = encodeField(field, args);
        if(type.kind == 'NON_NULL') return subtrack(field, type.ofType, args);
        if(type.kind == 'LIST') return [ subtrack(field, type.ofType, args) ];
        if(type.kind == 'OBJECT'){
            let sub = types.find(k => k.name == type.name)
            if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return makeTracker(types, sub, query[key] || (query[key] = { }));
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


let superfetchCache = {}
function superfetch(url: string, query: string, callback: (data: any) => void): any {
    let key = url + query;
    let entry = superfetchCache[key]
    if(entry) return superfetchCache[key].data;
    superfetchCache[key] = {
        promise: gqlFetch(url, query)
            .catch(err => callback(superfetchCache[key].data = { errors: [err] }) )
            .then(data => callback(superfetchCache[key].data = data) ),
        data: null
    }
    return null
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
    const BUILTIN_SCALAR_MAP = {
        'String': 'string',
        'Int': 'number',
        'Float': 'number',
        'Boolean': 'boolean',
        'ID': 'string'
    }

    if(schema.queryType.name !== 'Query'){
        ts += 'export type Query = ' + schema.queryType.name + '\n\n';
    }

    const printTypeCore = (type: GQLSchemaType): string => {
        let suffix = ''
        while(type.kind == 'LIST'){
            type = type.ofType
            suffix += '[]'
        }
        if(type.kind == 'NON_NULL'){
            type = type.ofType
        }
        if(type.kind == 'SCALAR'){
            if(BUILTIN_SCALAR_MAP[type.name]){
                return BUILTIN_SCALAR_MAP[type.name] + suffix;
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


    const printType = (type: GQLSchemaType): string => {
        let prefix = '?: '
        if(type.kind == 'NON_NULL'){
            type = type.ofType
            prefix = ': '
        }
        return prefix + printTypeCore(type)
    }

    const printFunctionType = (type: GQLSchemaType): string => {
        let suffix = ' | null'
        if(type.kind == 'NON_NULL'){
            type = type.ofType
            suffix = ''
        }
        return ': ' + printTypeCore(type) + suffix
    }

    const BUILTIN_TYPES = ["__Directive", "__DirectiveLocation", "__EnumValue", "__Field", "__InputValue", "__Schema", "__Type", "__TypeKind"]
    
    for(let type of schema.types){
        if(BUILTIN_TYPES.indexOf(type.name) != -1) continue;
        
        if(type.description && !(type.kind === 'SCALAR' && type.name in BUILTIN_SCALAR_MAP)) 
            ts += "/** " + type.description + " */\n";

        if(type.kind === 'SCALAR'){
            if(!BUILTIN_SCALAR_MAP[type.name]){
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