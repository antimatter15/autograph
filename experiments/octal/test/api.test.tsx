import * as EthereumGQL from './schemas/ethereum'
import * as ReactDOMServer from 'react-dom/server'
import { CreateQuery, CreateMutation } from '../src/core';
import { skipIf } from '../src/util';
import * as React from 'react'
import { parseGraphQL, runGraphQL } from "./util";

describe('High level query interface', () => {
    test('Remote Ethereum -> String', async () => {
        let DoQuery = CreateQuery<EthereumGQL.Query>(
            'https://ethql-alpha.infura.io/graphql'
        )

        expect(
            await DoQuery(Query => {
                let block = Query.block({ number: 5450945 })
                if (!block) return 'Block not found'
                return `Block ${block.number} was mined by ${
                    block.miner.address
                }`
            })
        ).toMatchInlineSnapshot(
            `"Block 5450945 was mined by 0x829BD824B016326A401d083B33D092293333A830"`
        )
    })

    test('Local -> String', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): String!
        }
    `
        type EchoQuery = {
            echo(args: { messages: string[] }): string
        }
        const gqlClient = (query: string) =>
            runGraphQL(gqlSchema, query, {
                Query: {
                    echo(parent: any, args: any) {
                        return args.messages[0]
                    },
                },
            })

        let DoQuery = CreateQuery<EchoQuery>(gqlClient)

        expect(
            await DoQuery(Query => Query.echo({ messages: ['blah', 'yolo'] }))
        ).toMatchInlineSnapshot(`"blah"`)
    })

    test('Local Dry Run', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): String!
        }
    `

        type GQLType = {
            /** This field is defined when Autograph is executing a dry run */
            __dryRun?: boolean
            /** The name of the object type */
            __typename: string
        }

        type EchoQuery = GQLType & {
            echo(args: { messages: string[] }): string
        }

        const gqlClient = (query: string) =>
            runGraphQL(gqlSchema, query, {
                Query: {
                    echo(parent: any, args: any) {
                        return args.messages[0]
                    },
                },
            })

        let DoQuery = CreateQuery<EchoQuery>(gqlClient)

        let mockFn = jest.fn(e => e)
        let callCounter = jest.fn()

        await DoQuery(Query => {
            callCounter()
            skipIf(Query.__dryRun, mockFn)({
                stuff: Query.echo({ messages: ['blah', 'yolo'] }),
            })
        })

        expect(callCounter.mock.calls.length).toBe(2)
        expect(mockFn.mock.calls.length).toBe(1)
    })

    test('Local -> Object', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): String!
        }
    `
        type EchoQuery = {
            echo(args: { messages: string[] }): string
        }
        const gqlClient = (query: string) =>
            runGraphQL(gqlSchema, query, {
                Query: {
                    echo(parent: any, args: any) {
                        return args.messages[0]
                    },
                },
            })

        let DoQuery = CreateQuery<EchoQuery>(gqlClient)

        expect(
            await DoQuery(Query => ({
                thing: Query.echo({ messages: ['blah', 'yolo'] }),
            }))
        ).toEqual({
            thing: 'blah',
        })
    })

    test('Local -> React Stateless Functional Component', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): [String]!
        }
    `
        type EchoQuery = {
            echo(args: { messages: string[] }): string[]
        }
        const gqlClient = (query: string) =>
            runGraphQL(gqlSchema, query, {
                Query: {
                    echo(parent: any, args: any) {
                        return args.messages
                    },
                },
            })

        let DoQuery = CreateQuery<EchoQuery>(gqlClient)

        function Thingy({ Query }: { Query: EchoQuery }) {
            return (
                <div>
                    {Query.echo({ messages: ['blah', 'yolo'] }).map(k => (
                        <li key={k}>{k}</li>
                    ))}
                </div>
            )
        }

        expect(
            ReactDOMServer.renderToStaticMarkup(
                await DoQuery(Query => <Thingy Query={Query} />)
            )
        ).toMatchInlineSnapshot(`"<div><li>blah</li><li>yolo</li></div>"`)
    })

    test('Local -> React Class Component', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): [String]!
        }
    `
        type EchoQuery = {
            echo(args: { messages: string[] }): string[]
        }
        const gqlClient = (query: string) =>
            runGraphQL(gqlSchema, query, {
                Query: {
                    echo(parent: any, args: any) {
                        return args.messages
                    },
                },
            })

        let DoQuery = CreateQuery<EchoQuery>(gqlClient)

        class Thingy extends React.Component<{ Query: EchoQuery }> {
            render() {
                let { Query } = this.props
                return (
                    <div>
                        {Query.echo({ messages: ['blah', 'yolo'] }).map(k => (
                            <li key={k}>{k}</li>
                        ))}
                    </div>
                )
            }
        }

        expect(
            ReactDOMServer.renderToStaticMarkup(
                await DoQuery(Query => <Thingy Query={Query} />)
            )
        ).toMatchInlineSnapshot(`"<div><li>blah</li><li>yolo</li></div>"`)
    })

    test('Local Mutation -> String', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): String!
        }

        type Mutation {
            updateBio(bio: String!): String!
        }
    `
        type BasicMutation = {
            updateBio(args: { bio: string }): string
        }
        const gqlClient = (query: string) =>
            runGraphQL(gqlSchema, query, {
                Mutation: {
                    updateBio(parent: any, args: any) {
                        return 'whats updawg?'
                    },
                },
            })

        let DoMutation = CreateMutation<BasicMutation>(gqlClient)

        expect(
            await DoMutation(Mutation =>
                Mutation.updateBio({ bio: 'smells like updawg' })
            )
        ).toMatchInlineSnapshot(`"whats updawg?"`)
    })
})