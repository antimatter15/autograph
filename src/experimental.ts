import { GenericObject, GQLSchema, introspectionQuery, getQueryRoot, runGQL, AutographConfig } from "./schema";
import { AccessLog, makeAccessLogger, inspectAccessLog } from "./logger";
import * as React from "react";
import { traverseTree } from "./traverse";
import { accessLogToGraphQL } from "./generator";
import { makeRetriever } from "./retriever";
import { shallowCompare } from './util'

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

import { GQLTypeDef } from "./schema";
import { hashArguments } from "./util";

// function makeSmartRetriever(data: any, schema: GQLSchema, obj: GQLTypeDef, callback: () => void): any {
//     if(!data) return data;
//     if(typeof data != 'object') return data;
//     if(Array.isArray(data)) return data.map(k => makeSmartRetriever(k, schema, obj, callback));

//     let retriever : GenericObject = {}

//     const getFieldType = (key: string): GQLTypeDef => null as any

//     for(let key in data){
//         if(key.startsWith('__AS_')){
//             // inline fragments for interfaces
//             let name = 'as' + key.slice(5, key.indexOf('___'))
//             if(!retriever[name]) retriever[name] = {}
//             Object.assign(retriever[name], makeSmartRetriever({ 
//                 [key.slice(key.indexOf('___') + 3)]: data[key] 
//             }))
//         }else if(key.indexOf('___') > 0){
//             // function calls & fields with arguments
//             let name = key.split('___')[0]
//             retriever[name] = (args: GenericObject) => 
//                 makeSmartRetriever(data[name + '___' + hashArguments(args)], schema, getFieldType(name), callback)
//         }else{
//             // fields with no arguments
//             retriever[key] = makeSmartRetriever(data[key], schema, getFieldType(key), callback)
//         }
//     }
//     return retriever
// }

import {  GQLField, GQLType } from "./schema";

export function makeSmartRetriever(data: any, schema: GQLSchema, obj: GQLTypeDef | undefined, callback: () => void): any {
    let retriever = {}
    // const navigate = (field: GQLField, type: GQLType, args: GenericObject): any => {
    //     if(type.kind == 'NON_NULL') return navigate(field, type.ofType as GQLType, args);
    // //     if(type.kind == 'LIST') return makeArray(navigate(field, type.ofType as GQLType, args) );
    // //     if(type.kind == 'UNION'){
    // //         let sub = schema.types.find(k => k.name == type.name)
    // //         if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
    // //         return navigate(field, (sub as GQLTypeDef).possibleTypes[0], args)
    // //     }

    // //     if(type.kind == 'INTERFACE' || type.kind == 'OBJECT'){
    // //         let sub = schema.types.find(k => k.name == type.name)
    // //         if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
    // //         return makeAccessLogger(schema, sub, log[key] || (log[key] = { }));
    // //     }


        
    // //     if(type.name == 'ID') return 'Autograph ID ' + Math.random().toString(36).slice(3);
    // //     if(type.name == 'String') return 'Autograph {' + field.name + '}';
    // //     if(type.name == 'Int') return 42;
    // //     if(type.name == 'Float') return 17.76;
    // //     if(type.name == 'Boolean') return true;
        
    // //     if(type.kind == 'ENUM'){
    // //         let sub = schema.types.find(k => k.name == type.name)
    // //         if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
    // //         return sub.enumValues[0].name
    // //     }

    // //     if(type.kind == 'SCALAR') return { __gqlScalarName: type.name }

    // //     throw new Error(`Unable to handle ${type.kind} named "${type.name}" in field "${field.name}"`)

    // }

    // console.log('smar tretriever', data, schema, obj)
    if(!obj) return data;

    if(obj.kind === 'OBJECT' || obj.kind == 'INTERFACE'){
        for(let field of obj.fields){
            let type = schema.types.find(k => k.name == field.type.name);
            if(field.args.length === 0){
                if(field.name in data){
                    retriever[field.name] = makeSmartRetriever(data[field.name], schema, type, callback)
                }else{
                    Object.defineProperty(retriever, field.name, {
                        get: () => callback()
                    })
                }
            }else{
                retriever[field.name] = (args: GenericObject) => {
                    let key = field.name + '___' + hashArguments(args)
                    if(key in data){
                        return makeSmartRetriever(data[key], schema, type, callback)
                    }else{
                        return callback()
                    }
                }
            }
        }
        // if(obj.kind === 'INTERFACE'){
        //     for(let type of schema.types){
        //         if(type.kind != 'OBJECT') continue;
        //         if(!type.interfaces.some(k => k.name == obj.name)) continue;

        //         Object.defineProperty(retriever, 'as' + type.name, {
        //             get: () => {
        //                 let key = JSON.stringify({ type: 'AS', name: type.name })
        //                 return makeSmartRetriever(data, schema, type)
        //             }
        //         })
        //     }
        // }
    }else{
        throw new Error(`Access retriever can only be created on OBJECT and INTERFACE types, not ${obj.kind}`)
    }
    
    // console.log('result', retriever)
    return retriever
}



export function unsafeUseQuery(config: AutographConfig): any {
    let internals = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    let { current, currentDispatcher } = internals.ReactCurrentOwner;

    let Component = current.elementType;
    let props = current.pendingProps;

    let schemaRequest = syncGQL(config, introspectionQuery)
    if(schemaRequest.errors) throw schemaRequest.errors;
    let schema: GQLSchema = schemaRequest.data.__schema;
    let inceptionScope = queryCallStack.find(entry => 
        entry.component === Component && shallowCompare(entry.props, props))
    let queryRoot = getQueryRoot(schema)
    if(inceptionScope)
        return makeAccessLogger(schema, queryRoot, inceptionScope.accessLog);
    let accessLog: AccessLog = {}
    let stackEntry = {
        component: Component,
        props: props,
        accessLog: accessLog
    }
    queryCallStack.push(stackEntry)
    try {
        // TODO: make this work for class components as well
        traverseTree(React.createElement(Component, props))
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
    return makeSmartRetriever(dataRequest.data, schema, queryRoot, () => {
        throw new Promise((resolve, reject) => {
            console.log('hey look thingy')
        })
    })
    // return makeRetriever(dataRequest.data)
}
