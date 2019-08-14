import { hashArguments } from './util/util'

// TODO: instead of encoding the value inline, store it to be sent as a variable.
const encodeValue = (obj: any): string =>
    typeof obj === 'object'
        ? Array.isArray(obj)
            ? '[' + obj.map(encodeValue).join(', ') + ']'
            : '{' + encodeKV(obj) + '}'
        : JSON.stringify(obj)

const encodeKV = (obj: {[key: string]: any}): string =>
    Object.keys(obj)
        .map((key) => key + ': ' + encodeValue(obj[key]))
        .join(', ')

const indent = (x: string): string =>
    x
        .split('\n')
        .map((k) => '  ' + k)
        .join('\n')

export type AccessLog = {
    __directive?: string
    __get?: boolean
}


const convertRecursive = (log: AccessLog, prefix = '') => {
    let gql = ''
    if (log.__directive) gql += log.__directive

    if (log.__get) return gql

    gql += '{\n'
    for (let key of Object.keys(log)) {
        if (key === '__directive') continue
        let info = JSON.parse(key)
        if (info.type === 'METHOD') {
            gql +=
                indent(
                    prefix +
                        info.name +
                        '___' +
                        hashArguments(info.args) +
                        ': ' +
                        info.name +
                        (Object.keys(info.args).length > 0 ? '(' + encodeKV(info.args) + ')' : '') +
                        ' ' +
                        convertRecursive(log[key])
                ) + '\n'
        } else if (info.type === 'PROP') {
            gql +=
                indent(
                    (prefix ? prefix + info.name + ': ' : '') +
                        info.name +
                        ' ' +
                        convertRecursive(log[key])
                ) + '\n'
        } else if (info.type === 'AS') {
            gql +=
                indent(
                    '... on ' +
                        info.name +
                        ' ' +
                        convertRecursive(log[key], '__AS_' + info.name + '___')
                ) + '\n'
        } else if (info.type === 'FEAT') {
            // ignore these
        } else throw new Error(`Encountered unexpected navigation type "${info.type}"`)
    }

    if (Object.keys(log).length === 0) {
        gql += indent((prefix ? prefix + '__typename: ' : '') + '__typename') + '\n'
    }

    gql += '}'
    return gql
}

export default function accessLogToGraphQL(log: AccessLog): string {
    return convertRecursive(log, '')
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

type GQLTypeKind = string;

export type GQLType = {
    kind: GQLTypeKind
    name?: string
    description?: string
    fields: Array<GQLField>
    inputFields: Array<GQLInputValue>
    interfaces: Array<GQLTypeRef>
    enumValues: Array<{
        name: string
        description: string
    }>
    possibleTypes: Array<GQLTypeRef>
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
        interfaces {
            ...TypeRef
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
