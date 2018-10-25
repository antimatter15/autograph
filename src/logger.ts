import { GQLSchema, GQLTypeDef, GQLField, GQLType, GenericObject } from "./schema";

export type AccessLog = { [key: string]: AccessLog } | 1

export function makeAccessLogger(schema: GQLSchema, obj: GQLTypeDef, log: AccessLog){
    let logger: GenericObject = { }
    
    // allow functions to distinguish between the dry run and the real execution
    // for instance to specifically gate side effects
    Object.defineProperty(logger, '__dryRun', {
        enumerable: false,
        value: true
    })

    const definePseudofield = (key: string, obj: GenericObject, value: any) => 
        Object.defineProperty(logger, key, {
            enumerable: false,
            get: () => {
                log[JSON.stringify(obj)] = 1
                return value
            }
        })

    definePseudofield('__typename', { type: 'NAV', name: '__typename', hasArgs: false, args: {} }, obj.name)
    
    // we only define __loading and __error on the query type
    if(schema.queryType.name == obj.name){
        definePseudofield('__loading', { type: 'FEAT', name: '__loading' }, false)
        definePseudofield('__error', { type: 'FEAT', name: '__error' }, null)
    }

    // For arrays, we bypass the result of filter so that it always returns the same
    // list. This is so that we can observe which parts of the list get used in the
    // map or forEach that may follow a filter.
    const makeArray = (obj: any) => {
        let array = [ obj ]
        const addPassthrough = (name: string) => {
            let orig = array[name]
            array[name] = function(){
                orig.apply(array, arguments)
                return array
            }
        }
        addPassthrough('filter')
        addPassthrough('slice')
        addPassthrough('splice')
        addPassthrough('reverse')
        addPassthrough('sort')
        return array
    }

    const navigate = (field: GQLField, type: GQLType, args: GenericObject): any => {
        if(type.kind == 'NON_NULL') return navigate(field, type.ofType as GQLType, args);
        if(type.kind == 'LIST') return makeArray(navigate(field, type.ofType as GQLType, args) );
        if(type.kind == 'UNION'){
            let sub = schema.types.find(k => k.name == type.name)
            if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return navigate(field, (sub as GQLTypeDef).possibleTypes[0], args)
        }

        let key = JSON.stringify({
            type: 'NAV',
            name: field.name,
            hasArgs: field.args.length > 0,
            args: args
        })

        if(type.kind == 'INTERFACE' || type.kind == 'OBJECT'){
            let sub = schema.types.find(k => k.name == type.name)
            if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return makeAccessLogger(schema, sub, log[key] || (log[key] = { }));
        }

        log[key] = 1
        
        if(type.name == 'ID') return 'Autograph ID ' + Math.random().toString(36).slice(3);
        if(type.name == 'String') return 'Autograph {' + field.name + '}';
        if(type.name == 'Int') return 42;
        if(type.name == 'Float') return 17.76;
        if(type.name == 'Boolean') return true;
        
        if(type.kind == 'ENUM'){
            let sub = schema.types.find(k => k.name == type.name)
            if(!sub) throw new Error(`Unable to find type "${type.name}" in schema.`);
            return sub.enumValues[0].name
        }

        if(type.kind == 'SCALAR') return { __gqlScalarName: type.name }

        throw new Error(`Unable to handle ${type.kind} named "${type.name}" in field "${field.name}"`)

    }

    if(obj.kind === 'OBJECT' || obj.kind == 'INTERFACE'){
        for(let field of obj.fields){
            if(field.args.length === 0){
                Object.defineProperty(logger, field.name, {
                    get: () => navigate(field, field.type, {})
                })
            }else{
                logger[field.name] = (args: GenericObject) => navigate(field, field.type, args || {})
            }
        }
        if(obj.kind === 'INTERFACE'){
            for(let type of schema.types){
                if(type.kind != 'OBJECT') continue;
                if(!type.interfaces.some(k => k.name == obj.name)) continue;

                Object.defineProperty(logger, 'as' + type.name, {
                    get: () => {
                        let key = JSON.stringify({ type: 'AS', name: type.name })
                        return makeAccessLogger(schema, type, log[key] || (log[key] = {}))
                    }
                })
            }
        }
    }else{
        throw new Error(`Access logger can only be created on OBJECT and INTERFACE types, not ${obj.kind}`)
    }
    
    return logger
}

export function inspectAccessLog(accessLog: GenericObject) {
    let keys = Object.keys(accessLog).map(k => JSON.parse(k))
    
    return {
        hasLoading: keys.some(k => k.type == 'FEAT' && k.name == '__loading'),
        hasError: keys.some(k => k.type == 'FEAT' && k.name == '__error'),
    }
}
