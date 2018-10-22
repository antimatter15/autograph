import { parse } from 'graphql'
import { graphql, buildASTSchema } from 'graphql'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { addResolveFunctionsToSchema } from 'graphql-tools';


let succinctIntrospectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      types { ...FullType }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args { ...InputValue }
      type { ...TypeRef }
    }
    inputFields { ...InputValue }
    interfaces { ...TypeRef }
    enumValues(includeDeprecated: true) {
      name
      description
    }
    possibleTypes { ...TypeRef }
  }

  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType { kind, name, ofType { kind, name, ofType { kind, name } } }
  }
`

type GQLSchema = {
    queryType: { name: string }
    types: GQLTypeDef[]
}

type GQLTypeDef = {
    kind: string
    name: string
    description?: string
    fields: GQLField[]
    inputFields: GQLInputValue[]
    interfaces: GQLType[]
    enumValues: GQLEnumValues[]
    possibleTypes: GQLType[]
}

type GQLEnumValues = {
    name: string
    description?: string
}

type GQLField = {
    name: string
    description?: string
    args: GQLInputValue[]
    type: GQLType
}

type GQLInputValue = {
    name: string
    description?: string
    type: GQLType
}

type GQLType = {
    kind: string
    name: string
    ofType?: GQLType
}

export async function parseGraphQL(schemaSource: string): Promise<GQLSchema> {
    let doc = buildASTSchema(parse(schemaSource), {
        commentDescriptions: true
    })
    let data = await graphql(doc, succinctIntrospectionQuery) as any;
    return data.data.__schema;

    // return (await runGraphQL(schemaSource, succinctIntrospectionQuery) as any).__schema
}

export async function runGraphQL(schemaSource: string, query: string, resolvers = {}) {

    const schema = makeExecutableSchema({ 
        typeDefs: schemaSource,
        // resolverValidationOptions: {
        //     requireResolversForResolveType: false
        //   },

        resolvers: resolvers,
        inheritResolversFromInterfaces: true,
        // typeResolvers: typeResolvers

    });

    // addResolveFunctionsToSchema({ 
    //     schema, 
    //     resolvers,
    //     inheritResolversFromInterfaces: true
    // })

    addMockFunctionsToSchema({ schema, preserveResolvers: true });

    return (await graphql(schema, query)).data
}





function IsGQLTypeNullable(type: GQLType): boolean {
    return type.kind != 'NON_NULL'
}

function GQLType2TS(type: GQLType): string {
    if(type.kind == 'LIST')
        return GQLType2TS(type.ofType as GQLType) + '[]';
    if(type.kind == 'NON_NULL') return GQLType2TS(type.ofType as GQLType);
    if(type.name == 'String') return 'string';
    if(type.name == 'Boolean') return 'boolean';
    if(type.kind == 'SCALAR') return type.name;
    if(type.kind == 'UNION') return type.name;
    if(type.kind == 'OBJECT') return type.name;
    if(type.kind == 'INPUT_OBJECT') return type.name;
    if(type.kind == 'ENUM') return type.name;
    if(type.kind == 'INTERFACE') return type.name;
    throw new Error(`Unable to handle type "${type.kind}" named "${type.name}"`)
}


export function schemaToTypescript(schema: GQLSchema): string {
    let ts = ''

    if(schema.queryType.name != 'Query'){
        ts += 'type Query = ' + schema.queryType.name + '\n\n' 
    }

    const BUILTIN_TYPES = [
        "__Directive", "__DirectiveLocation", "__EnumValue", "__Field", 
        "__InputValue", "__Schema", "__Type", "__TypeKind",
    ]

    const SCALAR_MAP = {
        'Int': 'number',
        'Float': 'number',
        'ID': 'string'
    }
    for(let type of schema.types){
        if(BUILTIN_TYPES.indexOf(type.name) != -1) continue;
        

        if(type.kind == 'OBJECT'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";


            ts += 'export type ' + type.name + ' = {\n'
            for(let field of type.fields){
                if(field.description) 
                    ts += "    /** " + field.description + " */\n"
                if(field.args.length > 0){
                    ts += '    ' + field.name + (IsGQLTypeNullable(field.type) ? '?' : '') + '(args: { ' + 
                        field.args.map(arg => arg.name + (IsGQLTypeNullable(arg.type) ? '?: ' : ': ') + GQLType2TS(arg.type)).join(', ') + 
                        ' }): ' + GQLType2TS(field.type) + '\n'
                }else{
                    ts += '    ' + field.name +  (IsGQLTypeNullable(field.type) ? '?: ' : ': ') + GQLType2TS(field.type) + '\n'
                }
            }
            ts += '}\n\n'

            // This way, for instance if we have Droid, Human implementing Character
            // and a query hero() which returns type Character, we can then call
            // hero.asDroid.primaryFunction and compile that into an inline fragment

            for(let interf of type.interfaces){
                ts += 'interface ' + interf.name + ' {\n'
                ts += '    as' + type.name + ': ' + type.name + '\n'
                ts += '}\n\n'
            }

        }else if(type.kind == 'SCALAR'){
            if(type.name == 'String' || type.name == 'Boolean') continue;
            if(type.description) 
                ts += "/** " + type.description + " */\n";
            if(type.name in SCALAR_MAP){
                ts += 'export type ' + type.name + ' = ' + SCALAR_MAP[type.name] + '\n\n'
            }else{
                ts += 'export type ' + type.name + ' = any\n\n'
            }
        }else if(type.kind == 'UNION'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";
            ts += 'export type ' + type.name + ' = ' + type.possibleTypes.map(type => GQLType2TS(type)).join(' | ') + '\n\n'
        }else if(type.kind == 'ENUM'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";
            // TODO: determine whether this is the right way to think about enums
            ts += 'export type ' + type.name + ' = ' + type.enumValues.map(val => JSON.stringify(val.name)).join(' | ') + '\n\n'
        }else if(type.kind == 'INPUT_OBJECT'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";

            ts += 'export type ' + type.name + ' = {\n'
            for(let field of type.inputFields){
                if(field.description) 
                    ts += "    /** " + field.description + " */\n"
                ts += '    ' + field.name +  (IsGQLTypeNullable(field.type) ? '?: ' : ': ') + GQLType2TS(field.type) + '\n'
            }
            ts += '}\n\n'
        }else if(type.kind == 'INTERFACE'){
            if(type.description) 
                ts += "/** " + type.description + " */\n";

            ts += 'export interface ' + type.name + ' {\n'
            for(let field of type.fields){
                if(field.description) 
                    ts += "    /** " + field.description + " */\n"
                ts += '    ' + field.name +  (IsGQLTypeNullable(field.type) ? '?: ' : ': ') + GQLType2TS(field.type) + '\n'
            }
            ts += '}\n\n'
        }else{
            throw new Error(`Unable to handle type "${type.kind}" named "${type.name}"`)
        }
    }
    return ts
}

export function getQueryRoot(schema: GQLSchema){
    let query = schema.types.find(k => k.name == schema.queryType.name)
    if(!query) throw new Error(`Unable to find root query type "${schema.queryType.name}" in schema`);
    return query
}


function hashArguments(args: any): string {
    return JSON.stringify(args || {}).replace(/[^\w]+/g, '')
}

type AccessLog = { [key: string]: AccessLog } | 1
type GenericObject = { [key: string]: any }

export function makeAccessLogger(schema: GQLSchema, obj: GQLTypeDef, log: AccessLog){
    let logger: GenericObject = { __typename: obj.name }
    

    const navigate = (field: GQLField, type: GQLType, args: GenericObject): any => {
        if(type.kind == 'NON_NULL') return navigate(field, type.ofType as GQLType, args);
        if(type.kind == 'LIST') return [ navigate(field, type.ofType as GQLType, args) ];
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


export function accessLogToGraphQL(log: AccessLog, prefix = ''): string {
    if(log === 1) return '';

    let gql = ''
    gql += '{\n'


    const encodeValue = (obj: any): string =>
        (typeof obj === 'object') ? 
            (Array.isArray(obj) ? 
                ('[' + obj.map(encodeValue).join(', ') + ']'):
                ('{' + encodeKV(obj) + '}') ) : 
            JSON.stringify(obj)
    
    const encodeKV = (obj: GenericObject): string => Object.keys(obj)
        .map(key => key + ': ' + encodeValue(obj[key]))
        .join(', ')

    const indent = (x: string) => x.split('\n').map(k => '  ' + k).join('\n')

    for(let key of Object.keys(log)) {
        let info = JSON.parse(key)
        if(info.type == 'NAV'){
            if(info.hasArgs){
                gql += indent(prefix + info.name + '___' + hashArguments(info.args) + ': ' + info.name + 
                    (Object.keys(info.args).length > 0 ? ('(' + encodeKV(info.args) + ')') : '') + ' ' + accessLogToGraphQL(log[key]))  + '\n'
            }else{
                gql += indent((prefix ? (prefix + info.name + ': ') : '') + info.name + ' ' + accessLogToGraphQL(log[key])) + '\n'
            }
        }else if(info.type == 'AS'){
            gql += indent('... on ' + info.name + ' ' + accessLogToGraphQL(log[key], '__AS_' + info.name + '___')) + '\n'
        }else throw new Error(`Encountered unexpected navigation type "${info.type}"`)
    }

    if(Object.keys(log).length == 0){
        gql += indent((prefix ? (prefix + '__typename: ') : '') + '__typename') + '\n'
    }

    gql += '}'
    return gql;
}



export function makeRetriever(data: any): any {
    if(!data) return data;
    if(typeof data != 'object') return data;
    if(Array.isArray(data)) return data.map(k => makeRetriever(k));

    let retriever : GenericObject = {}

    for(let key in data){
        if(key.startsWith('__AS_')){
            let name = 'as' + key.slice(5, key.indexOf('___'))
            if(!retriever[name]) retriever[name] = {}
            Object.assign(retriever[name], makeRetriever({ 
                [key.slice(key.indexOf('___') + 3)]: data[key] 
            }))
        }else if(key.indexOf('___') > 0){
            let name = key.split('___')[0]
            retriever[name] = (args: GenericObject) => makeRetriever(data[name + '___' + hashArguments(args)])
        }else{
            retriever[key] = makeRetriever(data[key])
        }
    }
    return retriever
}


