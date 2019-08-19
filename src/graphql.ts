export const AutographSentinels = {
    ID: 'Autograph ID',
    String: 'Autograph String',
    Float: 3481093128397,
    Int: 123719283783,
}

export const BUILTIN_TYPES = [
    '__Directive',
    '__DirectiveLocation',
    '__EnumValue',
    '__Field',
    '__InputValue',
    '__Schema',
    '__Type',
    '__TypeKind',
]
export type AccessorComponent =
    | {
          type: 'AS'
          name: string
          prefix: string
      }
    | {
          type: 'PROP'
          name: string
      }
    | {
          type: 'METHOD'
          name: string
          object: string
          args: any
          key: string
      }
    | {
          type: 'FEAT'
      }

export type AccessLog = {
    __directive?: string
    __get?: boolean
    [key: string]: AccessLog | string | boolean | undefined
}

const MAX_INLINE_GQL_ARG_LENGTH = 50

const containsSentinel = (obj: any): boolean => {
    if (typeof obj === 'object' && obj) {
        return Array.isArray(obj)
            ? obj.some((k) => containsSentinel(k))
            : Object.values(obj).some((val) => containsSentinel(val))
    }
    return Object.values(AutographSentinels).includes(obj)
}

const indent = (x: string): string =>
    x
        .split('\n')
        .map((k) => '  ' + k)
        .join('\n')

// const getFieldArgsType = (
//     schema: GQLSchema | null,
//     object: string,
//     field: string
// ): GQLInputValue[] | undefined => {
//     let objType = schema && schema.types.find((k) => k.name === object && k.kind === 'OBJECT')
//     let fieldObj = objType && objType.fields && objType.fields.find((k) => k.name === field)
//     return fieldObj ? fieldObj.args : undefined
// }


type VariableInfo = {
    value: any
    type: CompactGQLTypeRef
}

const convertRecursive = (
    log: AccessLog,
    schema: CompactGQLSchema,
    variables: { [key: string]: VariableInfo },
    prefix = ''
) => {
    let gql = ''
    if (log.__directive) gql += log.__directive
    if (log.__get) return gql

    const encodeValue = (type: CompactGQLTypeRef, value: any): string => {
        let inline = encodeValueInline(schema, type, value)
        if (inline !== null && inline.length < MAX_INLINE_GQL_ARG_LENGTH) {
            return inline
        } else {
            // TODO: encode custom scalar types here
            let id = 'i' + Object.keys(variables).length
            variables[id] = {
                value: value,
                type: type,
            }
            return '$' + id
        }
    }

    gql += '{\n'
    for (let key of Object.keys(log)) {
        if (key === '__directive') continue
        let info: AccessorComponent = JSON.parse(key)
        if (info.type === 'METHOD') {
            if (!containsSentinel(info.args)) {
                // schema[info.object][info.name]
                // let argsType = getFieldArgsType(schema, info.object, info.name)
                let argsType = schema[info.object][info.name]
                let body = ''
                if (Object.keys(info.args).length > 0) {
                    let args = info.args
                    body =
                        '(' +
                        Object.keys(args)
                            // only send over the values which match the GraphQL spec for names
                            // https://graphql.github.io/graphql-spec/June2018/#sec-Names
                            .filter((key) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(key))
                            // map through the keys and encode all the constitutent values
                            .map((key) => {
                                let inputType = argsType[key]
                                // let input = argsType && argsType.find((k) => k.name === key)
                                // let inputType = input && input.type
                                if (!inputType) throw new Error('Input type not found!')
                                return key + ': ' + encodeValue(inputType, args[key])
                            })
                            // finally join them all together
                            .join(', ') +
                        ')'
                }
                gql +=
                    indent(
                        prefix +
                            info.key +
                            ': ' +
                            info.name +
                            body +
                            ' ' +
                            convertRecursive(log[key] as AccessLog, schema, variables)
                    ) + '\n'
            }
        } else if (info.type === 'PROP') {
            gql +=
                indent(
                    (prefix ? prefix + info.name + ': ' : '') +
                        info.name +
                        ' ' +
                        convertRecursive(log[key] as AccessLog, schema, variables)
                ) + '\n'
        } else if (info.type === 'AS') {
            gql +=
                indent(
                    '... on ' +
                        info.name +
                        ' ' +
                        convertRecursive(
                            log[key] as AccessLog,
                            schema,
                            variables,
                            info.prefix
                        )
                ) + '\n'
        } else if (info.type === 'FEAT') {
            // ignore these
        } else throw new Error(`Encountered unexpected navigation type "${(info as any).type}"`)
    }

    if (Object.keys(log).length === 0) {
        gql += indent((prefix ? prefix + '__typename: ' : '') + '__typename') + '\n'
    }

    gql += '}'
    return gql
}

const encodeValueInline = (
    schema: CompactGQLSchema | null,
    typeRef: CompactGQLTypeRef,
    value: any
): string | null => {
    if(!schema) return null;
    if(typeRef[0] === '!'){
        // NON_NULL
        let ofType = typeRef.slice(1)
        return encodeValueInline(schema, ofType, value)
    }else if(typeRef[0] === '*'){
        // LISTS
        let ofType = typeRef.slice(1)
        let inlineValues = value.map((k: any) => encodeValueInline(schema, ofType, k))
        // if we fail at encoding any constituent members inline, we fail here
        if (inlineValues.some((k: any) => k === null)) return null
        return '[' + inlineValues.join(', ') + ']'
    }else{
        // SCALAR | ENUM | INPUT_OBJECT
        let type = schema[typeRef]
        if(typeof type === 'string' && type[0] === '#'){
            // SCALAR
            let scalarName = type.slice(1)
            if(['String', 'Int', 'Float', 'Boolean', 'ID'].includes(scalarName)){
                return JSON.stringify(value)
            }else{
                // custom scalars can not be encoded inline
                return null
            }
        }else if(Array.isArray(type)){
            // ENUM
            if (!/^[_A-Za-z][_0-9A-Za-z]*$/.test(value) || ['true', 'false', 'null'].includes(value)) {
                throw new Error(
                    'GQL Enum values must be alphanumeric starting with a letter and must not be "true", "false", or "null"'
                )
            }
            return value
        }else if(typeof type === 'object'){
            // INPUT_OBJECT
            let inlineValues = Object.keys(value)
                // only send over the values which match the GraphQL spec for names
                // https://graphql.github.io/graphql-spec/June2018/#sec-Names
                .filter((key) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(key))
                // map through the keys and encode all the constitutent values
                .map((key) => {
                    // let fieldType = inputType!.inputFields!.find((k) => k.name === key)
                    let fieldType = type[key]
                    if (!fieldType) return null
                    return key + ': ' + encodeValueInline(schema, fieldType, value[key])
                })
            // if we fail at encoding any constituent members inline, we fail here
            if (inlineValues.some((k) => k === null)) return null
            return '{' + inlineValues.join(', ') + '}'
        }else{
            return null
        }
    }
}

function GQLTypeToString(typeRef: CompactGQLTypeRef): string {
    if(typeRef[0] === '!'){
        let ofType = typeRef.slice(1)
        return GQLTypeToString(ofType) + '!'
    }else if(typeRef[0] === '*'){
        let ofType = typeRef.slice(1)
        return '[' + GQLTypeToString(ofType) + ']'
    }else{
        return typeRef
    }
}

export type GQLQuery = {
    query: string
    variables: { [key: string]: any }
}

export default function accessLogToGraphQL(log: AccessLog, schema: CompactGQLSchema): GQLQuery {
    let varinfo: { [key: string]: VariableInfo } = {}
    if(!schema) throw new Error('Compact GraphQL schema must be provided');
    
    let gql = convertRecursive(log, schema, varinfo, '')
    if (Object.keys(varinfo).length > 0) {
        gql =
            'query(' +
            Object.entries(varinfo)
                .map(([key, val]) => '$' + key + ': ' + GQLTypeToString(val.type))
                .join(', ') +
            ')' +
            gql
    }
    let variables = {}
    Object.entries(varinfo).forEach(([key, val]) => {
        variables[key] = val.value
    })
    return {
        query: gql,
        variables: variables,
    }
}

// this line is for syntax highlighting and prettier formatting
const gql = (x: any): string => x[0]

type GQLTypeSummary = {
    name: string
}

export type GQLSchema = {
    queryType: GQLTypeSummary
    mutationType?: GQLTypeSummary
    subscriptionType?: GQLTypeSummary
    types: Array<GQLType>
}

export type GQLTypeKind = 'SCALAR' | 'OBJECT' | 'INTERFACE' | 'UNION' | 'ENUM' | 'INPUT_OBJECT' | 'LIST' | 'NON_NULL'

// type GQLTypeKind = string

export type GQLType = {
    kind: GQLTypeKind
    name?: string
    description?: string
    fields?: Array<GQLField>
    inputFields?: Array<GQLInputValue>
    enumValues?: Array<{
        name: string
        description: string
    }>
    possibleTypes?: Array<GQLTypeRef>
}

type GQLField = {
    name: string
    description: string
    deprecationReason: string
    args: Array<GQLInputValue>
    type: GQLTypeRef
}

type GQLInputValue = {
    name: string
    description: string
    type: GQLTypeRef
}

export type GQLTypeRef = {
    kind: GQLTypeKind
    name?: string
    ofType?: GQLTypeRef
}

export const SUCCINCT_INTROSPECTION_QUERY = gql`
    query IntrospectionQuery {
        __schema {
            queryType {
                name
            }
            mutationType {
                name
            }
            subscriptionType {
                name
            }
            types {
                ...FullType
            }
        }
    }

    fragment FullType on __Type {
        kind
        name
        description
        fields(includeDeprecated: true) {
            name
            description
            deprecationReason
            args {
                ...InputValue
            }
            type {
                ...TypeRef
            }
        }
        inputFields {
            ...InputValue
        }
        enumValues(includeDeprecated: true) {
            name
            description
        }
        possibleTypes {
            ...TypeRef
        }
    }

    fragment InputValue on __InputValue {
        name
        description
        type {
            ...TypeRef
        }
    }

    fragment TypeRef on __Type {
        kind
        name
        ofType {
            kind
            name
            ofType {
                kind
                name
                ofType {
                    kind
                    name
                }
            }
        }
    }
`

export type CompactGQLSchema = {
    // [name: string]: string // ENUM | SCALAR
    // // OBJECT
    // [name: string]: {
    //     // field with args
    //     [name: string]: {
    //         [arg: string]: string // arg type
    //         _: string // return type
    //     }
    //     // field with no args
    //     [name: string]: string
    //     [~Name]: string // inline fragments
    // }

    [id: string]: CompactGQLType
}

// Scalars: #ScalarName
type CompactGQLScalarType = string
// Enums: [EnumValue]
type CompactGQLEnumType = Array<string>

// Interface, Object, Input Object, Union
type CompactGQLComplexType = {
    [field: string]: {
        [arg: string]: CompactGQLTypeRef
    } | CompactGQLTypeRef
}
export type CompactGQLType = CompactGQLScalarType | CompactGQLEnumType | CompactGQLComplexType

// ! - Non null
// * - List
// [Type ID] - Scalar, Input object, Enum, Object, Interface, Union
export type CompactGQLTypeRef = string


function compressGQLTypeRef(type: GQLTypeRef, indices: {[key: string]: string}): CompactGQLTypeRef {
    if (type.kind === 'NON_NULL') {
        return '!' + compressGQLTypeRef(type.ofType!, indices)
    } else if (type.kind === 'LIST') {
        return '*' + compressGQLTypeRef(type.ofType!, indices)
    } else if (
        type.kind === 'SCALAR' || 
        type.kind === 'INPUT_OBJECT' || 
        type.kind === 'ENUM' || 
        type.kind === 'OBJECT'  || 
        type.kind === 'INTERFACE' ||
        type.kind === 'UNION') {
        return indices[type.name!]
    } else {
        throw new Error('Unsupported type ' + type.name + ' (kind: ' + type.kind + ')')
    }
}

function compressGQLType(type: GQLType, indices: {[key: string]: string}): CompactGQLType {
    if(type.kind === 'INPUT_OBJECT'){
        let compact = {}
        for(let field of type.inputFields || []){
            compact[field.name] = compressGQLTypeRef(field.type, indices)
        }
        return compact
    }else if(type.kind === 'INTERFACE' || type.kind === 'UNION' || type.kind === 'OBJECT'){
        let compact = {}
        for(let field of type.fields || []){
            // INTERFACE and OBJECT
            if(field.args.length > 0){
                let args = {}
                for(let arg of field.args){
                    args[arg.name] = compressGQLTypeRef(arg.type, indices)
                }
                args[':'] = compressGQLTypeRef(field.type, indices)
                compact[field.name] = args
            }else{
                compact[field.name] = compressGQLTypeRef(field.type, indices)
            }
        }
        if(type.possibleTypes){
            // UNION and INTERFACE
            for(let inline of type.possibleTypes){
                compact['~' + inline.name] = indices[inline.name!]
            }
        }
        // We need to be able to support __typename
        if(type.kind === 'OBJECT'){
            compact['@'] = type.name
        }
        return compact
    }else if(type.kind === 'ENUM'){
        // we only need one of the enum values in order to properly 
        // generate fake data, so we don't need the rest of the values
        return type.enumValues!.map(k => k.name).slice(0, 1)
    }else if(type.kind === 'SCALAR'){
        return '#' + type.name
    }else{
        throw new Error('Unsupported type ' + type.name + ' (kind: ' + type.kind + ')')
    }
}

export function compressGQLSchema(schema: GQLSchema): CompactGQLSchema {
    let compact = {}
    let indices = {}
    for(let i = 0; i < schema.types.length; i++){
        let type = schema.types[i];
        indices[type.name!] = i.toString(36)
    }
    for(let type of schema.types){
        if(BUILTIN_TYPES.includes(type.name!)) continue;
        // We don't allow using the GraphQL introspection API 
        // through Autograph so we don't include them in the 
        // compressed schema representation. We might want to 
        // change this in the future. 
        compact[indices[type.name!]] = compressGQLType(type, indices)
    }

    compact['&query'] = indices[schema.queryType.name];
    if(schema.mutationType) 
        compact['&mutation'] = indices[schema.mutationType.name];
    if(schema.subscriptionType)
        compact['&subscription'] = indices[schema.subscriptionType.name];
    return compact;
}

;(global as any).compressGQLSchema = compressGQLSchema

