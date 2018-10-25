export type GQLSchema = {
    queryType: { name: string }
    mutationType: { name: string }
    types: GQLTypeDef[]
}

export type GQLTypeDef = {
    kind: string
    name: string
    description?: string
    fields: GQLField[]
    inputFields: GQLInputValue[]
    interfaces: GQLType[]
    enumValues: GQLEnumValues[]
    possibleTypes: GQLType[]
}

export type GQLEnumValues = {
    name: string
    description?: string
}

export type GQLField = {
    name: string
    description?: string
    args: GQLInputValue[]
    type: GQLType
}

export type GQLInputValue = {
    name: string
    description?: string
    type: GQLType
}

export type GQLType = {
    kind: string
    name: string
    ofType?: GQLType
}


type GQLClient = (query: string) => Promise<{ data?: any, errors?: any[] }>

export type AutographConfig = string | GQLClient

export type QueryType = any
export type GenericObject = { [key: string]: any }


export type GQLOperationTypes = 'query' | 'mutation'


export async function runGQL(url: string | AutographConfig, query: string): Promise<{ data?: any, errors?: any[] }> {
    if(typeof url == 'string'){
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: query})
        })
        .then(resp => resp.json())
    }else{
        return await url(query)
    }
}

export function getQueryRoot(schema: GQLSchema, operationType: GQLOperationTypes = 'query'){
    let name: string;
    if(operationType == 'query'){
        name = schema.queryType.name
    }else if(operationType == 'mutation'){
        if(!schema.mutationType) throw new Error('Schema does not define a mutation type');
        name = schema.mutationType.name
    }else throw new Error(`Unsupported operation type "${operationType}" expected "mutation" or "query".`)
    let query = schema.types.find(k => k.name == name)
    if(!query) throw new Error(`Unable to find root ${operationType} type "${name}" in schema`);
    return query
}


export const introspectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
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
