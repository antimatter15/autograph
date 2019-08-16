export const AutographSentinels = {
    ID: 'Autograph ID',
    String: 'Autograph String',
    Float: 3481093128397,
    Int: 123719283783,
}

export type AccessorComponent =
    | {
          type: 'AS'
          name: string
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

const getFieldArgsType = (
    schema: GQLSchema | null,
    object: string,
    field: string
): GQLInputValue[] | undefined => {
    let objType = schema && schema.types.find((k) => k.name === object && k.kind === 'OBJECT')
    let fieldObj = objType && objType.fields && objType.fields.find((k) => k.name === field)
    return fieldObj ? fieldObj.args : undefined
}

type VariableInfo = {
    value: any
    type: GQLTypeRef
}

const convertRecursive = (
    log: AccessLog,
    schema: GQLSchema | null,
    variables: { [key: string]: VariableInfo },
    prefix = ''
) => {
    let gql = ''
    if (log.__directive) gql += log.__directive
    if (log.__get) return gql

    const encodeValueInline = (type: GQLTypeRef, value: any): string | null => {
        if (type.kind === 'NON_NULL') {
            return encodeValueInline(type.ofType!, value)
        } else if (value === null || value === undefined) {
            return 'null'
        } else if (
            type.kind === 'SCALAR' &&
            ['String', 'Int', 'Float', 'Boolean', 'ID'].includes(type.name!)
        ) {
            return JSON.stringify(value)
        } else if (type.kind === 'ENUM' && typeof value === 'string') {
            if (
                !/^[_A-Za-z][_0-9A-Za-z]*$/.test(value) ||
                ['true', 'false', 'null'].includes(value)
            ) {
                throw new Error(
                    'GQL Enum values must be alphanumeric starting with a letter and must not be "true", "false", or "null"'
                )
            }
            return value
        } else if (type.kind === 'LIST' && Array.isArray(value)) {
            let inlineValues = value.map((k) => encodeValueInline(type.ofType!, k))
            // if we fail at encoding any constituent members inline, we fail here
            if (inlineValues.some((k) => k === null)) return null
            return '[' + inlineValues.join(', ') + ']'
        } else if (type.kind === 'INPUT_OBJECT' && typeof value === 'object' && value) {
            let inputType =
                schema &&
                schema.types.find((k) => k.name === type.name && k.kind === 'INPUT_OBJECT')
            let inlineValues = Object.keys(value)
                // only send over the values which match the GraphQL spec for names
                // https://graphql.github.io/graphql-spec/June2018/#sec-Names
                .filter((key) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(key))
                // map through the keys and encode all the constitutent values
                .map((key) => {
                    let fieldType = inputType!.inputFields!.find((k) => k.name === key)
                    if (!fieldType) return null
                    return key + ': ' + encodeValueInline(fieldType.type, value[key])
                })
            // if we fail at encoding any constituent members inline, we fail here
            if (inlineValues.some((k) => k === null)) return null
            return '{' + inlineValues.join(', ') + '}'
        } else {
            return null // unable to encode inline
        }
    }

    const encodeValue = (type: GQLTypeRef, value: any): string => {
        let inline = encodeValueInline(type, value)
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
                let argsType = getFieldArgsType(schema, info.object, info.name)
                let body = ''
                if (Object.keys(info.args).length > 0) {
                    let obj = info.args
                    body =
                        '(' +
                        Object.keys(obj)
                            // only send over the values which match the GraphQL spec for names
                            // https://graphql.github.io/graphql-spec/June2018/#sec-Names
                            .filter((key) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(key))
                            // map through the keys and encode all the constitutent values
                            .map((key) => {
                                let input = argsType && argsType.find((k) => k.name === key)
                                let inputType = input && input.type
                                if (!inputType) throw new Error('Input type not found!')
                                return key + ': ' + encodeValue(inputType, obj[key])
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
                            '__AS_' + info.name + '___'
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

function GQLTypeToString(type: GQLTypeRef): string {
    if (type.kind === 'NON_NULL') {
        return GQLTypeToString(type.ofType!) + '!'
    } else if (type.kind === 'LIST') {
        return '[' + GQLTypeToString(type.ofType!) + ']'
    } else if (type.kind === 'SCALAR' || type.kind === 'INPUT_OBJECT' || type.kind === 'ENUM') {
        return type.name!
    } else {
        throw new Error('Unsupported type ' + type.name)
    }
}

export type GQLQuery = {
    query: string
    variables: { [key: string]: any }
}

export default function accessLogToGraphQL(log: AccessLog, schema: GQLSchema | null): GQLQuery {
    let varinfo: { [key: string]: VariableInfo } = {}
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

// type GQLTypeKind = 'SCALAR' | 'OBJECT' | 'INTERFACE' | 'UNION' | 'ENUM' | 'INPUT_OBJECT' | 'LIST' | 'NON_NULL'

type GQLTypeKind = string

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

// let MINIMAL_INTROSPECTION_QUERY = `
//   query IntrospectionQuery {
//     __schema {
//       queryType { name }
//       mutationType { name }
//       subscriptionType { name }
//       types { ...FullType }
//     }
//   }

//   fragment FullType on __Type {
//     kind
//     name
//     fields(includeDeprecated: true) {
//       name
//       args { ...InputValue }
//       type { ...TypeRef }
//     }
//     inputFields { ...InputValue }
//     interfaces { ...TypeRef }
//     enumValues(includeDeprecated: true) {
//       name
//       description
//     }
//     possibleTypes { ...TypeRef }
//   }

//   fragment InputValue on __InputValue {
//     name
//     type { ...TypeRef }
//   }

//   fragment TypeRef on __Type {
//     kind
//     name
//     ofType { kind, name, ofType { kind, name, ofType { kind, name } } }
//   }
// `
