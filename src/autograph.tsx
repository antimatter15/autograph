import React from 'react'
import ReactDOM from 'react-dom'
import { introspectionQuery } from 'graphql'


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
                gqlFetch(url, introspectionQuery)
                    .then(result => {
                        console.log(generateTypescript(result.data.__schema))
                        this.setState({ schema: result.data.__schema, lastURL: url, loadingSchema: false })
                    })    
            }
            return <div>Loading schema...</div>
        }


        let schema = this.state.schema;
        let query = schema.types.find(k => k.name == 'Query')
        let log = {}
        pseudoRender(this.props.render(makeTracker(schema.types, query, log)))


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
        
        return this.props.render(makeRetriever(this.state.schema.types, this.state.data))
    }
}



function pseudoRender(element){
    // dont bother if its not an object
    if(typeof element != 'object') return;
    if(Array.isArray(element)){
        // render all children
        for(let el of element) pseudoRender(el);
        return
    }
    if(element.props.children){
        pseudoRender(element.props.children)
    }
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
    let tracker = {
        __typename: obj.name
    }

    const subtrack = (field, type, args) => {
        let key = field.args.length == 0 ? field.name : 
            (field.name + '::' + JSON.stringify(args));

        if(type.kind == 'NON_NULL')
            return subtrack(field, type.ofType, args);

        if(type.kind == 'LIST')
            return [ subtrack(field, type.ofType, args) ];

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
    s += '  __typename\n'
    for(let key in graph){
        let parts = key.split('::')
        if(parts.length == 1){
            s += indent(key + ' ' + generateGraphQL(graph[key])) + '\n'
        }else{
            let slug = '_' + key.replace(/[^\w]+/g, '_')
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


function makeRetriever(types, data){
    let retriever = {}
    let obj = types.find(k => k.name == data.__typename);
    if(!obj) return data;

    for(let field of obj.fields){
        if(field.args.length > 0){
            retriever[field.name] = (args) => {
                let key = field.name + '::' + JSON.stringify(args);
                let slug = '_' + key.replace(/[^\w]+/g, '_')
                return makeRetriever(types, data[slug])
            }
        }else if(field.name in data){
            retriever[field.name] = makeRetriever(types, data[field.name])
        }
    }
    return retriever
}


function generateTypescript(schema){
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