import * as React from 'react'

import { GQLClient, QueryType, runGQL, introspectionQuery, GQLSchema, getQueryRoot, GenericObject } from "./schema";
import { makeAccessLogger } from "./logger";
import { accessLogToGraphQL } from "./generator";
import { makeRetriever } from "./retriever";
import { traverseTree } from './traverse';

export class Autograph extends React.Component<{
    url: string | GQLClient
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
        if(!(schemaRequest = this.syncGQL(introspectionQuery))) return loading;
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


export function withAutograph(url: string | GQLClient){
    return function(Component: React.ComponentType<{ Query: QueryType }>){
        return function(props: GenericObject){
            return <Autograph url={url}>{
                Query => <Component {...props} Query={Query} />
            }</Autograph>
        }
    }
}
