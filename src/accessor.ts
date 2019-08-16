import { AccessLog, GQLSchema, GQLTypeRef, AutographSentinels } from "./graphql";
import makeFixedArray from "./util/fixarray";
import { hashArguments } from "./util/util";

// type HandleOptions = {
//     error?: boolean
//     boundary?: boolean
//     cacheOnly?: boolean
// }

type AccessorState = {
    accessLog: AccessLog,
    data: { [key: string]: any } | undefined,
    typeRef: GQLTypeRef,
    path: Array<string|number>
}

type AccessorConfig = {
    schema: GQLSchema,
    isDry: boolean

    accessHook?: (state: AccessorState, config: AccessorConfig) => void
    accessHandleHook?: (handle: any, state: AccessorState, config: AccessorConfig) => void
    returnValueHook?: (handle: any, state: AccessorState, config: AccessorConfig) => void
    // handleOptions: HandleOptions
    // version: number
}

export function createAccessor(state: AccessorState, config: AccessorConfig): any {
    let value = createAccessorCore(state, config)
    if(config.returnValueHook){
        config.returnValueHook(value, state, config)
    }
    return value;
}

function createAccessorCore(state: AccessorState, config: AccessorConfig): any {
    const { accessLog, data, typeRef, path } = state;
    const { schema, isDry } = config;
    
    if(config.accessHook){
        config.accessHook(state, config)
    }

    if(typeRef.kind === 'NON_NULL'){
        // if a type is required, just recurse down to the underlying type
        return createAccessor({
            path: path,
            typeRef: typeRef.ofType!,
            data: data,
            accessLog: accessLog
        }, config)
    }else if(typeRef.kind === 'LIST'){
        if(data !== undefined){
            return data.map((k: any, i: number) =>
                createAccessor({
                    data: k,
                    accessLog: accessLog,
                    typeRef: typeRef.ofType!, 
                    path: [...path, i]
                }, config))
        }else{
            return makeFixedArray([createAccessor({
                data: undefined,
                accessLog: accessLog,
                typeRef: typeRef.ofType!, 
                path: [...path, 0]
            }, config)])
        }
    }else if(typeRef.kind === 'ENUM'){
        accessLog.__get = true;
        if(data !== undefined){
            return data
        }else{
            let type = schema.types.find((k) => k.name === typeRef.name)
            if (!type) throw new Error(`Unable to find type "${typeRef.name}" in schema.`)

            return type.enumValues![0].name
        }
    }else if(typeRef.kind === 'SCALAR'){
        accessLog.__get = true;
        if(data !== undefined){
            return data
        }else if(typeRef.name === 'Boolean'){
            return true
        }else if(typeRef.name! in AutographSentinels){
            return AutographSentinels[typeRef.name!]
        }else{
            return { _gqlCustomScalar: typeRef.name }
        }
    }else if(typeRef.kind === 'UNION' || typeRef.kind === 'INTERFACE' || typeRef.kind === 'OBJECT'){
        let handle = {}

        let type = schema.types.find((k) => k.name === typeRef.name)
        if (!type) throw new Error(`Unable to find type "${typeRef.name}" in schema.`)

        if(typeRef.kind === 'INTERFACE' || typeRef.kind === 'OBJECT'){
            for(let field of type.fields!){
                if(field.args.length === 0){
                    const getProp = () => {
                        let k = JSON.stringify({
                            type: 'PROP',
                            name: field.name,
                        })
                        let subLog = (accessLog[k] = (accessLog[k] as AccessLog || {}))
                        let key = field.name;
                        return createAccessor({
                            accessLog: subLog,
                            typeRef: field.type,
                            data: (typeof data === 'object' && data && key in data) ? data[key] : undefined,
                            path: [...path, field.name]
                        }, config)
                    }

                    // if this is a field which has no arguments
                    // stick in the value if it is available
                    // otherwise fill itwith getters
                    if(!isDry && data && data[field.name]){
                        handle[field.name] = getProp()
                    }else{
                        Object.defineProperty(handle, field.name, {
                            get: () => getProp()
                        })
                    }
                }else{
                    // if this is a field which takes arguments
                    // compile it into a method

                    const getMethod = (args: { [key: string]: any } = {}) => {
                        let key = field.name + '___' + hashArguments(args);

                        let k = JSON.stringify({
                            type: 'METHOD',
                            name: field.name,
                            args: args || {},
                            key: key
                        })
                        let subLog = (accessLog[k] = (accessLog[k] as AccessLog || {}))
                        return createAccessor({
                            accessLog: subLog,
                            typeRef: field.type,
                            data: (typeof data === 'object' && data && key in data) ? data[key] : undefined,
                            path: [...path, field.name + '(' + JSON.stringify(args) + ')']
                        }, config)
                    }

                    handle[field.name] = withPrettyArgs(getMethod, field.args.map((k) => k.name))
                }
            }
        }

        let validInlineFragments: Array<GQLTypeRef> = [];
        if(typeRef.kind === 'INTERFACE'){
            // if type.kind === 'INTERFACE' then we need to add potential
            // inline fragments for each of the types which implement this
            // interface
            
            validInlineFragments = schema.types.filter(k => 
                k.kind === 'OBJECT' &&
                k.interfaces!.some(k => k.name === typeRef.name))
        }else if(typeRef.kind === 'UNION'){
            // if type.kind === 'UNION' we need to add potential
            // inline fragments for each of the possibleTypes
            validInlineFragments = type.possibleTypes!;
        }

        for(let subref of validInlineFragments){
            Object.defineProperty(handle, 'as' + subref.name, {
                get: () => {
                    // Right now the 
                    let subData = undefined;
                    if(typeof data === 'object' && data){
                        subData = {}
                        for (let key in data) {
                            if (key.startsWith('__AS_' + subref.name)) {
                                subData[key.slice(key.indexOf('___') + 3)] = data[key]
                            }
                        }
                    }
                    
                    let k = JSON.stringify({
                        type: 'AS',
                        name: subref.name,
                    })
                    let subLog = (accessLog[k] = (accessLog[k] as AccessLog || {}))
                    return createAccessor({
                        accessLog: subLog,
                        typeRef: subref,
                        data: subData,
                        path: [...path, subref.name!]
                    }, config)
                }
            })
        }


        // Every accessor object includes a __typename field
        Object.defineProperty(handle, '__typename', {
            enumerable: false,
            get: () => {
                accessLog[JSON.stringify({
                    type: 'PROP',
                    name: '__typename',
                })] = {
                    __get: true
                }
                if(data && data.__typename){
                    return data.__typename
                }else if(typeRef.kind === 'OBJECT'){
                    return typeRef.name
                }else{
                    return validInlineFragments[0].name
                }
            }
        })

        if(config.accessHandleHook){
            return config.accessHandleHook(handle, state, config)
        }else{
            return Object.freeze(handle)
        }
    }else{
        throw new Error(`Unable to handle ${typeRef.kind} named "${typeRef.name}"`)
    }
}

const SHOW_ARGUMENTS_DEV = true
const __DEV__ = true // TODO: process.env.NODE_ENV?


function withPrettyArgs(__fn: (args: {[key: string]: any}) => any, args: Array<string>): typeof __fn {
    if (SHOW_ARGUMENTS_DEV && __DEV__) {
        try {
            let argStr = `{${args
                // ensure that the names are within graphql spec to guard against code injection
                // security issues
                // note that there are valid graphql names which are not valid 
                // javascript names, so we wrap this in a try catch
                .filter((k) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(k))
                .join(', ')}}`
            return eval(
                `(function(${argStr}={}){ return __fn(arguments[0])} )`
            )        
        } catch (err) { }
    }
    return __fn
}