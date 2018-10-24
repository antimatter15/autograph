import * as React from 'react'

import { GQLEndpoint, QueryType, runGQL, introspectionQuery, GQLSchema, getQueryRoot, GenericObject } from "./schema";
import { makeAccessLogger, inspectAccessLog } from "./logger";
import { accessLogToGraphQL } from "./generator";
import { makeRetriever } from "./retriever";
import { traverseTree } from './traverse';
// import { globalURL } from './core';


type AutographProps = {
    url?: GQLEndpoint
    children: (Query: QueryType) => JSX.Element
    suspense?: boolean
}

const AutographContext = React.createContext<any>(null);

export function AutographProvider({ url, children }: { url: GQLEndpoint, children: JSX.Element }) {
    return <AutographContext.Provider value={url}>{children}</AutographContext.Provider>
}

const gqlCache : { [key: string]: { result: any, promise: Promise<any>} } = {}

export class Autograph extends React.Component<AutographProps> {    
    static contextType = AutographContext;

    // synchronously resolve a GQL query if it exists in the cache
    // otherwise initiate a fetch and return null. If the 'suspense'
    // prop is `true` instead of returning null, it throws a promise
    // that resolves when the fetching is completed
    syncGQL(query: string){
        let url = this.props.url || this.context;

        if(!url) 
            throw new Error(`A GraphQL endpoint must be specified either as a prop (url), with a context provider (using AutographProvider), or with global configuration.`);

        let key = JSON.stringify([url, query])
        if(gqlCache[key]){
            if(this.props.suspense && !gqlCache[key].result) throw gqlCache[key].promise;
            return gqlCache[key].result;
        }
        const update = (result: any) => {
            gqlCache[key].result = result
            if(!this.props.suspense) this.setState({})
        }
        gqlCache[key] = {
            promise: runGQL(url, query)
                .then(result => update(result), err => update({ errors: [err] })),
            result: null
        }
        if(this.props.suspense) throw gqlCache[key].promise;
        return null;
    }
    render(){
        let { children: renderFn } = this.props;
        let schemaRequest, dataRequest;
        if(!(schemaRequest = this.syncGQL(introspectionQuery))) return <div>Loading...</div>;
        if(schemaRequest.errors) return <div>Schema Error: {JSON.stringify(schemaRequest.errors)}</div>
        let schema: GQLSchema = schemaRequest.data.__schema;
        let accessLog = {}
        traverseTree(renderFn(makeAccessLogger(schema, getQueryRoot(schema), accessLog)))
        let gql = accessLogToGraphQL(accessLog), info = inspectAccessLog(accessLog)
        if(!(dataRequest = this.syncGQL(gql))) 
            return info.hasLoading ? renderFn({ __loading: true }) : 
                <div>Loading...</div>;
        if(info.hasLoading && this.props.suspense)
            console.warn('Query.__loading can not be used in conjunction with React Suspense. Display loading information by configuring a Suspense fallback.');
        if(dataRequest.errors) 
            return info.hasError ? renderFn({ __error: dataRequest.errors }) : 
                <div>Data Error: {JSON.stringify(dataRequest.errors)}</div>
        return renderFn(makeRetriever(dataRequest.data))
    }
}

export function withAutograph(url: GQLEndpoint){
    return function(Component: React.ComponentType<{ Query: QueryType }>){
        return function(props: GenericObject){
            return <Autograph url={url}>{
                Query => <Component {...props} Query={Query} />
            }</Autograph>
        }
    }
}
