
let minimalIntrospectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      types { ...FullType }
    }
  }

  fragment FullType on __Type {
    kind
    name
    fields(includeDeprecated: true) {
      name
      args { ...InputValue }
      type { ...TypeRef }
    }
    enumValues(includeDeprecated: true) {
      name
    }
  }

  fragment InputValue on __InputValue {
    name
    type { ...TypeRef }
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType { kind, name, ofType { kind, name, ofType { kind, name } } }
  }
`
