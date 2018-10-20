import React from 'react'
import ReactDOM from 'react-dom'
// import { introspectionQuery } from 'graphql'


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



export async function autographData({ url, render } : {
    url: string, 
    render: (Query) => JSX.Element
}) {
    let schema = (await gqlFetchMemo(url, succinctIntrospectionQuery)).data.__schema;
    let query = schema.types.find(k => k.name == schema.queryType.name)
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, query, accessLog)))
    return (await gqlFetchMemo(url, generateGraphQL(accessLog))).data
}

export function AutographSuspense({ url, render } : {
    url: string, 
    render: (Query) => JSX.Element
}){
    let schema = gqlFetchSuspense(url, succinctIntrospectionQuery).data.__schema;
    let query = schema.types.find(k => k.name == schema.queryType.name)
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, query, accessLog)))
    let data = gqlFetchSuspense(url, generateGraphQL(accessLog)).data
    return render(makeRetriever(data))
}

export class Autograph2 extends React.Component<{
    url: string, 
    render: (Query) => JSX.Element,
    loading?: JSX.Element
}> {
    render(){
        let { url, render, loading } = this.props;
        let data;
        try {
            let schema = gqlFetchSuspense(url, succinctIntrospectionQuery).data.__schema;
            console.log(schema)
            // console.log(generateTypescript(schema, url))
            let query = schema.types.find(k => k.name == schema.queryType.name)
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
        render: (Query) => JSX.Element
    }, {
        schema
        lastURL
        lastGraphQL
        loadingSchema
        loadingData
        data
    }> {

    state = {
        loadingSchema: false,
        loadingData: false,
        schema: null,
        data: null,
        lastURL: null,
        lastGraphQL: null
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
                        // console.log(generateTypescript(result.data.__schema, url))
                        this.setState({ schema: result.data.__schema, lastURL: url, loadingSchema: false })
                    })    
            }
            return <div>Loading schema...</div>
        }

        let schema = this.state.schema;
        let query = schema.types.find(k => k.name == schema.queryType.name)
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
                    .then(result => this.setState({ data: result.data, lastGraphQL: graphQL, loadingData: false }))
            }
            
            return <div>Loading data...</div>
        }
        return this.props.render(makeRetriever(this.state.data))
    }
}


export function pseudoRender(element){
    if(Array.isArray(element)){ // render all children
        for(let el of element) pseudoRender(el);
        return
    }
    // console.log(element, React.isValidElement(element))
    if(!React.isValidElement(element)) return;
    
    if(element.props.children)
        pseudoRender(element.props.children);
    if(typeof element.type === 'function'){
        if(element.type.prototype.render){
            // stateful react components
            let clone = React.cloneElement(element)
            let el = new (clone.type as any)(clone.props)
            el.render()
        }else{
            // stateless functional react components
            pseudoRender(element.type(element.props))    
        }
    }
}



export function makeTracker(types, obj, query){
    let tracker = { __typename: obj.name }
    const subtrack = (field, type, args) => {
        let key = encodeField(field, args);
        if(type.kind == 'NON_NULL') return subtrack(field, type.ofType, args);
        if(type.kind == 'LIST') return [ subtrack(field, type.ofType, args) ];
        if(type.kind == 'OBJECT') return makeTracker(types, 
            types.find(k => k.name == type.name), 
            query[key] || (query[key] = { }));
        query[key] = 1
        if(type.kind == 'ENUM') return type.enumValues[0];
        if(type.name == 'Int' || type.name == 'Float') return 42;
        if(type.name == 'String') return '{' + field.name + '}';
        if(type.name == 'ID') return Math.random().toString(36).slice(3);
        console.log('unknown', type)
        return null
    }
    for(let field of obj.fields){
        if(field.args.length === 0){
            Object.defineProperty(tracker, field.name, {
                get: () => subtrack(field, field.type, {})
            })
        }else{
            tracker[field.name] = (args) => subtrack(field, field.type, args || {})
        }
    }
    return tracker
}

export function encodeField(field: { name: string, args: Array<any> }, args: null | any): string {
    return JSON.stringify([ field.name, field.args.length == 0 ? null : (args || {}) ])
}

export function decodeField(key): [string, null | any] {
    return JSON.parse(key)
}

export function encodeArguments(name: string, args: any): string {
    return name + 'ZZZ' + JSON.stringify(args || {})
        .replace(/[^\w]+|Z/g, '')
}

export function decodeArguments(slug: string): [ string, boolean ] {
    let parts = slug.split('ZZZ')
    return [ parts[0], parts.length > 1 ]
}

export function generateGraphQL(graph){
    if(graph === 1) return '';
    let s = '{\n'
    const indent = x => x.split('\n').map(k => '  ' + k).join('\n')
    for(let key in graph){
        let [ name, args ] = decodeField(key);
        if(args === null){
            s += indent(name + ' ' + generateGraphQL(graph[key])) + '\n'
        }else{
            let argpart = Object.keys(args).length > 0 ? ('(' + 
                Object.entries(args)
                    .map(([key, value]) => key + ': ' + JSON.stringify(value))
                    .join(', ')
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



function gqlFetch(url, query){
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
function gqlFetchMemo(url, query){
    let key = url + query;
    if(cachePromises[key]) return cachePromises[key];
    return cachePromises[key] = gqlFetch(url, query)
}


let cacheData = {}
function gqlFetchSuspense(url, query){
    let key = url + query;
    if(cacheData[key]) return cacheData[key];
    throw gqlFetchMemo(url, query)
        .then(data => cacheData[key] = data)
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


export function generateTypescript(schema, url = null){
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

    const printTypeCore = type => {
        let suffix = ''
        if(type.kind == 'LIST'){
            type = type.ofType
            suffix = '[]'
        }
        if(type.kind == 'NON_NULL'){
            type = type.ofType
        }
        if(type.kind == 'SCALAR'){
            return (SCALAR_MAP[type.name] || 'any') + suffix;
        }else if(type.kind == 'OBJECT' || type.kind == 'ENUM' || 
            type.kind == 'INTERFACE' || type.kind == 'UNION' || 
            type.kind == 'INPUT_OBJECT'){
            return type.name + suffix
        }else{
            debugger
            console.warn(type)
        }
    }


    const printType = type => {
        let prefix = '?: '
        let suffix = ''
        if(type.kind == 'NON_NULL'){
            type = type.ofType
            prefix = ': '
        }

        return prefix + printTypeCore(type)
    }

    const printFunctionType = type => {
        let suffix = ' | null'
        if(type.kind == 'NON_NULL'){
            type = type.ofType
            suffix = ''
        }

        return ': ' + printTypeCore(type) + suffix
    }
    
    for(let type of schema.types){
        if(type.name[0] == '_') continue;
        
        if(type.description) 
            ts += "/** " + type.description + " */\n";

        if(type.kind === 'SCALAR'){

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