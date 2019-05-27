import fetch from 'isomorphic-fetch'
import { introspectionQuery } from './schema.ts'
import { convertGQLSchemaToTypescript } from './typescript.ts'

let url = process.argv[2]

if(!url){
    console.log('Please run this command with the URL to a GraphQL endpoint.')
    process.exit()
}

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: introspectionQuery})
})
.then(resp => resp.json())
.then(schemaRequest => {
    let schema = schemaRequest.data.__schema;

    console.log(convertGQLSchemaToTypescript(schema))
})