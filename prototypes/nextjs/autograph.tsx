import React from 'react'
import ReactDOM from 'react-dom'
import { introspectionQuery } from 'graphql'


export async function autographData({ url, render } : {
    url: string, 
    render: (Query) => JSX.Element
}) {
    let schema = (await gqlFetchMemo(url, introspectionQuery)).data.__schema;
    let query = schema.types.find(k => k.name == 'Query')
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, query, accessLog)))
    return (await gqlFetchMemo(url, generateGraphQL(accessLog))).data
}

export function AutographSuspense({ url, render } : {
    url: string, 
    render: (Query) => JSX.Element
}){
    let schema = gqlFetchSuspense(url, introspectionQuery).data.__schema;
    let query = schema.types.find(k => k.name == 'Query')
    let accessLog = {}
    pseudoRender(render(makeTracker(schema.types, query, accessLog)))
    let data = gqlFetchSuspense(url, generateGraphQL(accessLog)).data
    return render(makeRetriever(data))
}

export default class Autograph extends React.Component<{
    url: string, 
    render: (Query) => JSX.Element,
    loading: JSX.Element
}> {
    render(){
        let { url, render, loading } = this.props;
        try {
            let schema = gqlFetchSuspense(url, introspectionQuery).data.__schema;
            let query = schema.types.find(k => k.name == 'Query')
            let accessLog = {}
            pseudoRender(render(makeTracker(schema.types, query, accessLog)))
            let data = gqlFetchSuspense(url, generateGraphQL(accessLog)).data
            return render(makeRetriever(data))
        } catch (err) {
            if(err instanceof Promise){
                err.then(e => this.setState({ }))
                return loading || <div>Loading...</div>
            }else throw err;
        }
    }
}


function pseudoRender(element){
    if(typeof element != 'object') return;
    if(Array.isArray(element)){ // render all children
        for(let el of element) pseudoRender(el);
        return
    }
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


function makeTracker(types, obj, query){
    let tracker = { __typename: obj.name }
    const subtrack = (field, type, args) => {
        let key = field.args.length == 0 ? field.name : 
            (field.name + '::' + JSON.stringify(args));
        if(type.kind == 'NON_NULL') return subtrack(field, type.ofType, args);
        if(type.kind == 'LIST') return [ subtrack(field, type.ofType, args) ];
        if(type.kind == 'OBJECT')
            return makeTracker(types, 
                types.find(k => k.name == type.name), 
                query[key] = { });
        query[key] = 1
        if(type.name == 'Int' || type.name == 'Float') return 42;
        if(type.name == 'String') return 'Hi';
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
            tracker[field.name] = (args) => subtrack(field, field.type, args)
        }
    }
    return tracker
}



function generateGraphQL(graph){
    if(graph === 1) return '';
    let s = '{\n'
    const indent = x => x.split('\n').map(k => '  ' + k).join('\n')
    for(let key in graph){
        let parts = key.split('::')
        if(parts.length == 1){
            s += indent(key + ' ' + generateGraphQL(graph[key])) + '\n'
        }else{
            let slug = parts[0] + 'ZZZ' + parts[1].replace(/[^\w]+/g, '_');
            s += indent(slug + ': ' + parts[0] + '(' + 
                Object.entries(JSON.parse(parts[1]))
                    .map(([key, value]) => key + ': ' + JSON.stringify(value))
                    .join(', ')
            + ') ' + generateGraphQL(graph[key])) + '\n'
        }
    }
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
    if(typeof data != 'object' || !data) return data;
    if(Array.isArray(data)) return data.map(k => makeRetriever(k));

    let retriever : {[key: string]: any} = {}
    for(let key in data){
        let parts = key.split('ZZZ')
        retriever[parts[0]] = (parts.length === 1) ? 
            makeRetriever(data[key])
            : (args: {[key: string]: any}) => {
                let slug = parts[0] + 'ZZZ' + JSON.stringify(args)
                .replace(/[^\w]+/g, '_');
                return data[slug]
            }
    }
    return retriever
}


export function generateTypescript(schema){
    let ts = ''
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
        if(type.kind == 'SCALAR'){
            return SCALAR_MAP[type.name] + suffix;
        }else if(type.kind == 'OBJECT'){
            return type.name + suffix
        }else{
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
        if(type.kind === 'OBJECT' && type.name[0] != '_'){
            ts += "/** " + type.description + " */\n"
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
            
        }
    }
    return ts
}