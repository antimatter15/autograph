import { graphqlToTypescript } from "../src/typescript";
import { makeAccessLogger } from "../src/logger";
import { getQueryRoot } from "../src/schema";
import { accessLogToGraphQL } from "../src/generator";
import { makeRetriever } from "../src/retriever";
import { CreateMutation } from "../src/core";
import { parseGraphQL, runGraphQL } from "./util";

describe('basic queries', () => {
    test('Custom query type', async () => {
        let schema = await parseGraphQL(`
            schema {
                query: CustomQueryAPI
            }
            type CustomQueryAPI {
                hello_world_message: String
            }
        `)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type Query = CustomQueryAPI

type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type CustomQueryAPI = GQLType & {
    hello_world_message?: string
}

"
`)
    })

    test('Basic method query with required arguments', async () => {
        let schema = await parseGraphQL(`
            type Query {
                echo(message: String!): String!
            }
        `)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    echo(args: { message: string }): string
}

"
`)
    })

    test('Basic method query with array arguments', async () => {
        let gqlSchema = `
            type Query {
                echo(messages: [String]!): String!
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    echo(args: { messages: string[] }): string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.echo({ messages: ['what', 'stuff'] })).toBe(
            'Autograph {echo}'
        )

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  echo___6f2s9n: echo(messages: [\\"what\\", \\"stuff\\"]) 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                echo(parent: any, args: { messages: string[] }) {
                    return args.messages[1]
                },
            },
        })
        expect(data.data).toEqual({ echo___6f2s9n: 'stuff' })

        let ret = makeRetriever(data.data)
        expect(ret.echo()).toBeUndefined()
        expect(ret.echo({ messages: ['what', 'stuff'] })).toEqual('stuff')
    })

    test('Basic method query with object arguments', async () => {
        let gqlSchema = `
            scalar JSON

            type Query {
                echo(data: JSON): JSON
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    echo?(args: { data?: JSON }): JSON
}

export type JSON = any

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.echo({ data: ['what', 'stuff'] })).toEqual({
            __gqlScalarName: 'JSON',
        })
        expect(tracker.echo({ data: { sup: 42 } })).toEqual({
            __gqlScalarName: 'JSON',
        })

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  echo___9gls4d: echo(data: [\\"what\\", \\"stuff\\"]) 
  echo___g2ffpz: echo(data: {sup: 42}) 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                echo(parent: any, args: { data: any }) {
                    return args.data
                },
            },
        })
        expect(data.data).toEqual({
            echo___9gls4d: ['what', 'stuff'],
            echo___g2ffpz: { sup: 42 },
        })

        let ret = makeRetriever(data.data)
        expect(ret.echo()).toBeUndefined()
        expect(ret.echo({ data: ['what', 'stuff'] })).toEqual(['what', 'stuff'])

        expect(ret.echo({ data: { sup: 42 } })).toEqual({ sup: 42 })
    })

    test('Basic method query', async () => {
        let gqlSchema = `
            type Query {
                echo(message: String): String
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    echo?(args: { message?: string }): string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.echo({ message: 'blah' })).toBe('Autograph {echo}')
        expect(tracker.echo()).toBe('Autograph {echo}')

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  echo___71kyez: echo(message: \\"blah\\") 
  echo___3horh: echo 
}"
`)

        let data = await runGraphQL(gqlSchema, query)
        expect(data.data).toEqual({
            echo___3horh: 'Hello World',
            echo___71kyez: 'Hello World',
        })

        let ret = makeRetriever(data.data)
        expect(ret.echo()).toEqual('Hello World')
        expect(ret.echo({ message: 'blah' })).toEqual('Hello World')
        expect(ret.echo({ message: 'blarp' })).toBeUndefined()
    })

    test('Basic constant string query', async () => {
        let gqlSchema = `
            type Query {
                hello_world_message: String
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    hello_world_message?: string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.hello_world_message).toBe(
            'Autograph {hello_world_message}'
        )
        expect(tracker.not_defined_thing).toBeUndefined()

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  hello_world_message 
}"
`)
        let data = await runGraphQL(gqlSchema, query)
        expect(data.data).toEqual({
            hello_world_message: 'Hello World',
        })
    })
})

describe('Comments', () => {
    test('Old style GQL comments on fields', async () => {
        let schema = await parseGraphQL(`
            type Query {
                # This is a hello world message
                hello_world_message: String
            }
        `)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    /** This is a hello world message */
    hello_world_message?: string
}

"
`)
    })

    test('New style GQL comments on fields', async () => {
        let schema = await parseGraphQL(`
            type Query {
                """This is a hello world message"""
                hello_world_message: String
            }
        `)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    /** This is a hello world message */
    hello_world_message?: string
}

"
`)
    })

    test('Old style GQL comments on types', async () => {
        let schema = await parseGraphQL(`
            # This is a hello world message
            type Query {
                hello_world_message: String
            }
        `)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

/** This is a hello world message */
export type Query = GQLType & {
    hello_world_message?: string
}

"
`)
    })

    test('New style GQL comments on types', async () => {
        let schema = await parseGraphQL(`
            """This is a hello world message"""
            type Query {
                hello_world_message: String
            }
        `)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

/** This is a hello world message */
export type Query = GQLType & {
    hello_world_message?: string
}

"
`)
    })
})

describe('Mutations', () => {
    test('Custom mutation type', async () => {
        let schema = await parseGraphQL(`
            schema {
                mutation: CustomMutationAPI
                query: CustomQueryAPI
            }
            type CustomMutationAPI {
                merp(blah: String): String
            }
            type CustomQueryAPI {
                hello_world_message: String
            }
        `)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type Query = CustomQueryAPI

type Mutation = CustomMutationAPI

type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type CustomQueryAPI = GQLType & {
    hello_world_message?: string
}

export type CustomMutationAPI = GQLType & {
    merp?(args: { blah?: string }): string
}

"
`)
    })

    test('Input & Output Type', async () => {
        let gqlSchema = `
            type Query {
                GetReview: Review
            }

            type Mutation {
                UpdateReview(input: ReviewInput!): Review
            }

            type Review {
                commentary: String
                author: String
            }
            
            input ReviewInput {
                commentary: String
                author: String
            }
        `

        let schema = await parseGraphQL(gqlSchema)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    GetReview?: Review
}

export type Review = GQLType & {
    commentary?: string
    author?: string
}

export type Mutation = GQLType & {
    UpdateReview?(args: { input: ReviewInput }): Review
}

export type ReviewInput = {
    commentary?: string
    author?: string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(
            schema,
            getQueryRoot(schema, 'mutation'),
            log
        )
        expect(
            tracker.UpdateReview({
                input: { commentary: 'nimby yimby', author: 'hank george' },
            }).author
        ).toEqual('Autograph {author}')

        let query = accessLogToGraphQL(log, { operationType: 'mutation' })
        expect(query).toMatchInlineSnapshot(`
"mutation {
  UpdateReview___w0n16f: UpdateReview(input: {commentary: \\"nimby yimby\\", author: \\"hank george\\"}) {
    author 
  }
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Mutation: {
                UpdateReview(parent: any, args: { input: any }) {
                    return args.input
                },
            },
        })
        expect(data.data).toEqual({
            UpdateReview___w0n16f: { author: 'hank george' },
        })

        let ret = makeRetriever(data.data)
        expect(ret.UpdateReview({})).toBeUndefined()
        expect(
            ret.UpdateReview({
                input: { commentary: 'nimby yimby', author: 'hank george' },
            }).author
        ).toEqual('hank george')
        expect(
            ret.UpdateReview({
                input: { commentary: 'nimby yimby', author: 'hank george' },
            }).commentary
        ).toBeUndefined()
    })

    test('Basic mutations', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): String!
        }

        type Mutation {
            updateBio(bio: String!): String!
        }
    `
        let schema = await parseGraphQL(gqlSchema)

        expect(graphqlToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    echo(args: { messages: string[] }): string
}

export type Mutation = GQLType & {
    updateBio(args: { bio: string }): string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(
            schema,
            getQueryRoot(schema, 'mutation'),
            log
        )
        expect(tracker.updateBio({ bio: 'what is the meaning of life' })).toBe(
            'Autograph {updateBio}'
        )

        let query = accessLogToGraphQL(log, {
            operationType: 'mutation',
        })
        expect(query).toMatchInlineSnapshot(`
"mutation {
  updateBio___im9gla: updateBio(bio: \\"what is the meaning of life\\") 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Mutation: {
                updateBio(parent: any, args: { bio: string }) {
                    return args.bio + ' and stuff'
                },
            },
        })
        expect(data.data).toEqual({
            updateBio___im9gla: 'what is the meaning of life and stuff',
        })

        let ret = makeRetriever(data.data)
        expect(ret.updateBio()).toBeUndefined()
        expect(ret.updateBio({ bio: 'what is the meaning of life' })).toEqual(
            'what is the meaning of life and stuff'
        )
    })

    test('Throw error when attempting to run mutation without defined mutations', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): String!
        }
    `

        const gqlClient = (query: string) => runGraphQL(gqlSchema, query, {})

        const DoMutation = CreateMutation(gqlClient)
        await expect(
            DoMutation(Mutation => console.log(Mutation))
        ).rejects.toThrow()
    })
})