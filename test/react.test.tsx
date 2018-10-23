import * as renderer from 'react-test-renderer'
import { Autograph, withAutograph } from '../src/react'
import React = require('react')
import { runGraphQL } from './util'

describe('React API', () => {
    test('Simple Query', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): [String]!
        }
    `
        type EchoQuery = {
            echo(args: { messages: string[] }): string[]
        }

        let pResolve: Function,
            doneLoading = new Promise((resolve, reject) => (pResolve = resolve))

        let callCount = 0
        const gqlClient = (query: string) => {
            if (++callCount == 2) {
                setTimeout(pResolve, 0)
            }

            return runGraphQL(gqlSchema, query, {
                Query: {
                    echo(parent: any, args: any) {
                        return args.messages
                    },
                },
            })
        }
        const component = renderer.create(
            <Autograph url={gqlClient}>
                {(query: EchoQuery) => (
                    <ul>
                        {query
                            .echo({ messages: ['whats up', 'mah maan'] })
                            .map(k => (
                                <li key={k}>{k}</li>
                            ))}
                    </ul>
                )}
            </Autograph>
        )

        expect(component.toJSON()).toMatchInlineSnapshot(`
<div>
  Loading...
</div>
`)
        await doneLoading
        expect(component.toJSON()).toMatchInlineSnapshot(`
<ul>
  <li>
    whats up
  </li>
  <li>
    mah maan
  </li>
</ul>
`)
    })


    

    test('Higher order component', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): [String]!
        }
    `
        type EchoQuery = {
            echo(args: { messages: string[] }): string[]
        }

        let pResolve: Function,
            doneLoading = new Promise((resolve, reject) => (pResolve = resolve))

        let callCount = 0
        const gqlClient = (query: string) => {
            if (++callCount == 2) {
                setTimeout(pResolve, 0)
            }

            return runGraphQL(gqlSchema, query, {
                Query: {
                    echo(parent: any, args: any) {
                        return args.messages
                    },
                },
            })
        }

        function Demo({ Query }: { Query: EchoQuery }) {
            return (
                <ul>
                    {Query.echo({ messages: ['whats up', 'mah maan'] }).map(
                        k => (
                            <li key={k}>{k}</li>
                        )
                    )}
                </ul>
            )
        }

        const AutographedDemo = withAutograph(gqlClient)(Demo)
        const component = renderer.create(<AutographedDemo />)

        expect(component.toJSON()).toMatchInlineSnapshot(`
<div>
  Loading...
</div>
`)
        await doneLoading
        expect(component.toJSON()).toMatchInlineSnapshot(`
<ul>
  <li>
    whats up
  </li>
  <li>
    mah maan
  </li>
</ul>
`)
    })

    test('Schema Error Handling', async () => {
        let gqlSchema = `
        type Query {
            echo(messages: [String]!): [String]!
        }
    `
        type EchoQuery = {
            echo(args: { messages: string[] }): string[]
        }

        const gqlClient = (query: string) => {
            return new Promise((resolve, reject) => {
                reject(new Error('Welp'))
            })
        }
        const component = renderer.create(
            <Autograph url={gqlClient}>
                {(query: EchoQuery) => (
                    <ul>
                        {query
                            .echo({ messages: ['whats up', 'mah maan'] })
                            .map(k => (
                                <li key={k}>{k}</li>
                            ))}
                    </ul>
                )}
            </Autograph>
        )

        await new Promise(resolve => setTimeout(resolve, 0))

        expect(component.toJSON()).toMatchInlineSnapshot(`
<div>
  Schema Error: 
  [{}]
</div>
`)
    })
})
