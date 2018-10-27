import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as GQL from './schemas/ethereum'
import { Autograph, makeRetriever } from '../../../src/index'
import { runGQL, introspectionQuery, GQLSchema, getQueryRoot } from '../../../src/schema';
import { makeAccessLogger } from '../../../src/logger';
import { traverseTree } from '../../../src/traverse';
import { accessLogToGraphQL } from '../../../src/generator';
const Suspense = (React as any).Suspense;


let queryCallStack = []
// let autographInstance = new Autograph({
//     config: GQL.url,
//     suspense: true,
//     children: () => null
// })

let gqlCache = {}

let config = GQL.url;

function syncGQL(query){
    let key = JSON.stringify([config, query])
    if(gqlCache[key]){
        if(!gqlCache[key].result) throw gqlCache[key].promise;
        return gqlCache[key].result;
    }
    const update = (result: any) => {
        gqlCache[key].result = result
    }
    gqlCache[key] = {
        promise: runGQL(config, query)
            .then(result => update(result), err => update({ errors: [err] })),
        result: null
    }
    throw gqlCache[key].promise;
}

function makeQuery(fn, props): any {
    let schemaRequest = syncGQL(introspectionQuery)
    if(schemaRequest.errors) throw schemaRequest.errors;
    let schema: GQLSchema = schemaRequest.data.__schema;
    let isInner = queryCallStack.find(([f, p]) => f === fn && p === props)
    if(isInner){
        let accessLog = isInner[2]
        return makeAccessLogger(schema, getQueryRoot(schema), accessLog)
    }
    let accessLog = {}
    queryCallStack.push([ fn, props, accessLog ])
    try {
        traverseTree(fn(props))
    } catch (err) {
        console.warn(err)
    }
    let gql = accessLogToGraphQL(accessLog)
    let dataRequest = syncGQL(gql)
    if(dataRequest.errors) throw dataRequest.errors;
    return makeRetriever(dataRequest.data)
}
    
function App(props){
    let query: GQL.Query = makeQuery(App, props)
    

    let block = query.block({ number: 5450945 })

    console.log(block.hash)
    return <fieldset>
        <legend>Block {block.hash}</legend>
        <table><tbody>
            <tr><td><b>Miner</b></td><td>{block.miner.address}</td></tr>
            <tr><td><b>Number</b></td><td>{block.number}</td></tr>
            
        </tbody></table>
        {block.transactions({ filter: { withInput: false }}).map(tx => <fieldset key={tx.hash}>
            <legend>{tx.index}: {tx.hash}</legend>
            <table><tbody>
                <tr><td><b>From</b></td><td>{tx.from.address}</td></tr>
                <tr><td><b>To</b></td><td>{tx.to.address}</td></tr>

            </tbody></table>
        </fieldset>)}
    </fieldset>
}


ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
        <App />
    </Suspense>, document.getElementById('root'))