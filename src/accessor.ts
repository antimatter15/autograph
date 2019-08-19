import { AccessLog, GQLSchema, GQLTypeRef, AutographSentinels, AccessorComponent, CompactGQLTypeRef, CompactGQLSchema } from './graphql'
import makeFixedArray from './util/fixarray'
import { hashArguments } from './util/util'

// type HandleOptions = {
//     error?: boolean
//     boundary?: boolean
//     cacheOnly?: boolean
// }

type AccessorState = {
    accessLog: AccessLog
    data: { [key: string]: any } | undefined
    typeRef: CompactGQLTypeRef
    path: Array<string | number>
}

type AccessorConfig = {
    schema: CompactGQLSchema
    isDry: boolean

    accessHook?: (state: AccessorState, config: AccessorConfig) => void
    accessHandleHook?: (handle: any, state: AccessorState, config: AccessorConfig) => void
    returnValueHook?: (handle: any, state: AccessorState, config: AccessorConfig) => void
    // handleOptions: HandleOptions
    // version: number
}

export function createAccessor(state: AccessorState, config: AccessorConfig): any {
    let value = createAccessorCore(state, config)
    if (config.returnValueHook) {
        config.returnValueHook(value, state, config)
    }
    return value
}

function createAccessorCore(state: AccessorState, config: AccessorConfig): any {
    const { accessLog, data, typeRef, path } = state
    const { schema, isDry } = config

    if (config.accessHook) {
        config.accessHook(state, config)
    }

    if(typeRef[0] === '!'){
        // NON_NULL
        // if a type is required, just recurse down to the underlying type
        let ofType = typeRef.slice(1)
        return createAccessor(
            {
                path: path,
                typeRef: ofType,
                data: data,
                accessLog: accessLog,
            },
            config
        )
    }else if(typeRef[0] === '*'){
        let ofType = typeRef.slice(1)
        if (data !== undefined) {
            return data.map((k: any, i: number) =>
                createAccessor(
                    {
                        data: k,
                        accessLog: accessLog,
                        typeRef: ofType,
                        path: [...path, i],
                    },
                    config
                )
            )
        } else {
            return makeFixedArray([
                createAccessor(
                    {
                        data: undefined,
                        accessLog: accessLog,
                        typeRef: ofType,
                        path: [...path, 0],
                    },
                    config
                ),
            ])
        }
    }

    let type = schema[typeRef]
    if (!type) throw new Error(`Unable to find type "${typeRef}" in compact schema.`);

    const subpath = (args: {
        component: AccessorComponent
        typeRef: AccessorState['typeRef']
        data: AccessorState['data']
        path: AccessorState['path']
    }) => {
        let k = JSON.stringify(args.component)
        let subLog = (accessLog[k] = (accessLog[k] as AccessLog) || {})
        return createAccessor(
            {
                accessLog: subLog,
                typeRef: args.typeRef,
                data: args.data,
                path: args.path,
            },
            config
        )
    }

    if(Array.isArray(type)){
        // Enum
        accessLog.__get = true
        if (data !== undefined) {
            return data
        } else {
            return type[0]
        }
    }else if(typeof type === 'string' && type[0] === '#'){
        // Scalar
        let scalarName = type.slice(1)
        accessLog.__get = true
        if (data !== undefined) {
            return data
        } else if (scalarName === 'Boolean') {
            return true
        } else if (scalarName in AutographSentinels) {
            return AutographSentinels[scalarName]
        } else {
            return { _gqlCustomScalar: scalarName }
        }
    }else if(typeof type === 'object'){
        // Union | Interface | Object
        let handle = {}

        // let type = schema.types.find((k) => k.name === typeRef.name)
        // if (!type) throw new Error(`Unable to find type "${typeRef.name}" in schema.`)
        
        for(let fieldName in type){
            let fieldType = type[fieldName]
            if(fieldName[0] === '~'){
                // inline fragments for unions | interfaces
                let subRef = fieldName.slice(1)
                Object.defineProperty(handle, 'as' + subRef, {
                    get: () => {
                        // Right now the
                        let subData = undefined
                        if (typeof data === 'object' && data) {
                            subData = {}
                            for (let key in data) {
                                if (key.startsWith('__AS_' + subRef)) {
                                    subData[key.slice(key.indexOf('___') + 3)] = data[key]
                                }
                            }
                        }
                        return subpath({
                            component: {
                                type: 'AS',
                                name: subRef,
                                prefix: '__AS_' + subRef + '___'
                            },
                            typeRef: fieldType as string,
                            data: subData,
                            path: [...path, 'as' + subRef],
                        })
                    },
                })
            }

            // skip fields which do not have valid names
            if(!/^[_A-Za-z][_0-9A-Za-z]*$/.test(fieldName)) continue;

            if(typeof fieldType === 'string'){
                // no arguments for this field
                const getProp = () => {
                    let key = fieldName
                    return subpath({
                        component: {
                            type: 'PROP',
                            name: fieldName,
                        },
                        typeRef: fieldType as string,
                        data:
                            typeof data === 'object' && data && key in data
                                ? data[key]
                                : undefined,
                        path: [...path, fieldName],
                    })
                }

                // if this is a field which has no arguments
                // stick in the value if it is available
                // otherwise fill itwith getters
                if (!isDry && data && data[fieldName]) {
                    handle[fieldName] = getProp()
                } else {
                    Object.defineProperty(handle, fieldName, {
                        get: () => getProp(),
                    })
                }
            }else{
                // if this is a field which takes arguments
                // compile it into a method

                const getMethod = (args: { [key: string]: any } = {}) => {
                    let key = fieldName + '___' + hashArguments(args)
                    return subpath({
                        component: {
                            type: 'METHOD',
                            object: typeRef,
                            name: fieldName,
                            args: args || {},
                            key: key,
                        },
                        typeRef: fieldType[':'],
                        data:
                            typeof data === 'object' && data && key in data
                                ? data[key]
                                : undefined,
                        path: [...path, fieldName + '(' + JSON.stringify(args) + ')'],
                    })
                }

                handle[fieldName] = withPrettyArgs(getMethod, 
                    Object.keys(fieldType)
                    .filter((k) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(k)))
            }
        }


        // Every accessor object includes a __typename field
        Object.defineProperty(handle, '__typename', {
            enumerable: false,
            get: () => {
                accessLog[
                    JSON.stringify({
                        type: 'PROP',
                        name: '__typename',
                    } as AccessorComponent)
                ] = {
                    __get: true,
                }

                if (data && data.__typename) {
                    return data.__typename
                } else if (type['@']) {
                    return type['@']
                } else {
                    return Object.keys(type).find(k => k[0] === '~')!.slice(1)
                }
            },
        })

        if (config.accessHandleHook) {
            return config.accessHandleHook(handle, state, config)
        } else {
            return Object.freeze(handle)
        }
    }

}

const SHOW_ARGUMENTS_DEV = true
const __DEV__ = true // TODO: process.env.NODE_ENV?

function withPrettyArgs(
    __fn: (args: { [key: string]: any }) => any,
    args: Array<string>
): typeof __fn {
    if (SHOW_ARGUMENTS_DEV && __DEV__) {
        try {
            let argStr = `{${args
                // ensure that the names are within graphql spec to guard against code injection
                // security issues
                // note that there are valid graphql names which are not valid
                // javascript names, so we wrap this in a try catch
                .filter((k) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(k))
                .join(', ')}}`
            return eval(`(function(${argStr}={}){ return __fn(arguments[0])} )`)
        } catch (err) {}
    }
    return __fn
}
