import { parse } from 'graphql'
import { graphql, buildASTSchema, buildSchema, introspectionQuery } from 'graphql'

import fs from 'fs'
import path from 'path'

let doc = buildASTSchema(parse(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8')), {
    commentDescriptions: true
})


// graphql(doc, introspectionQuery).then(data => {
//     console.log(data.data.__schema)
// })

console.log(doc)