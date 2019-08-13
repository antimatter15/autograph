// adapted from https://github.com/kadira-samples/react-graphql-todos
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql'

import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())

// We pass GraphQL information as JSON. So, we need a JSON parser
app.use(bodyParser.json())
// Some how adding a route does not work here.
// We need to add a middleware to process GraphQL queries
app.use((req, res, next) => {
    if (req.url === '/graphql' && req.method === 'POST') {
        // Executing the GraphQL query
        const { query, variables } = req.body
        graphql(TodosSchema, query, null, variables).then((result) => {
            res.send(result)
        })
    } else {
        next()
    }
})

app.listen(port)

//
// Schema definitions below
//

// In memory data store
const TodoStore = ['Learn some GraphQL', 'Build a sample app']

// Root level queries
const TodosQuery = new GraphQLObjectType({
    name: 'TodosQuery',
    fields: () => ({
        items: {
            type: new GraphQLList(GraphQLString),
            description: 'List of todo items',
            resolve() {
                // close and send
                return TodoStore.concat([])
            },
        },
    }),
})

// Mutations
const TodosMutations = new GraphQLObjectType({
    name: 'TodosMutations',
    fields: () => ({
        addItem: {
            type: GraphQLString,
            description: 'Add a new todo item',
            args: {
                item: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
            resolve(parent, { item }) {
                if (TodoStore.length >= 10) {
                    // Remove the third time by keeping the first two
                    TodoStore.splice(2, 1)
                }

                TodoStore.push(item)
                return item
            },
        },
    }),
})

// Schema
const TodosSchema = new GraphQLSchema({
    query: TodosQuery,
    mutation: TodosMutations,
})
