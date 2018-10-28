import { GenericObject, GQLSchema, introspectionQuery, getQueryRoot, runGQL, AutographConfig } from "./schema";
import { AccessLog, makeAccessLogger, inspectAccessLog } from "./logger";
import * as React from "react";
import { traverseTree } from "./traverse";
import { accessLogToGraphQL } from "./generator";
import { makeRetriever } from "./retriever";

type StackEntry = {
    component: React.ComponentType,
    props: GenericObject,
    accessLog: AccessLog
}

let queryCallStack: Array<StackEntry> = []
let gqlCache = {}

function syncGQL(config: AutographConfig, query: string){
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

export function useQuery(config: AutographConfig, component: React.ComponentType, props: GenericObject): any {
    let schemaRequest = syncGQL(config, introspectionQuery)
    if(schemaRequest.errors) throw schemaRequest.errors;
    let schema: GQLSchema = schemaRequest.data.__schema;
    let inceptionScope = queryCallStack.find(entry => 
        entry.component === component && entry.props === props)
    if(inceptionScope)
        return makeAccessLogger(schema, getQueryRoot(schema), inceptionScope.accessLog);
    let accessLog: AccessLog = {}
    let stackEntry = {
        component: component,
        props: props,
        accessLog: accessLog
    }
    queryCallStack.push(stackEntry)
    try {
        // TODO: make this work for class components as well
        traverseTree((component as Function)(props))
    } catch (err) {
        console.warn(err)
    }
    if(queryCallStack.pop() !== stackEntry)
        throw new Error('Unexpected stack manipulation');
    
    let gql = accessLogToGraphQL(accessLog), 
        info = inspectAccessLog(accessLog)
    let dataRequest = syncGQL(config, gql)
    if(dataRequest.errors) {
        if(info.hasError) return { __error: dataRequest.errors }
        throw dataRequest.errors
    }
    console.log(gql)
    return makeRetriever(dataRequest.data)
}
