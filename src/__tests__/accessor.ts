import { buildASTSchema, graphql } from 'graphql'
import accessLogToGraphQL, { SUCCINCT_INTROSPECTION_QUERY, GQLSchema, GQLType } from '../graphql'
import gql from 'graphql-tag'
import { createAccessor } from '../accessor';

export async function parseGraphQL(ast: any): Promise<GQLSchema> {
    let doc = buildASTSchema(ast, {
        commentDescriptions: true,
    })
    let data = (await graphql(doc, SUCCINCT_INTROSPECTION_QUERY)) as any
    if (data.errors) throw data.errors[0]
    return data.data.__schema
}

test('Basic Accessor (dry)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            echo(message: String): String
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {},
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: true,
        }
    )

    query.echo({ message: 'wumbo' })

    expect(log).toMatchInlineSnapshot(`
                Object {
                  "{\\"type\\":\\"METHOD\\",\\"name\\":\\"echo\\",\\"args\\":{\\"message\\":\\"wumbo\\"},\\"key\\":\\"echo___n9s5aq\\"}": Object {
                    "__get": true,
                  },
                }
        `)

    expect(accessLogToGraphQL(log)).toMatchInlineSnapshot(`
                        "{
                          echo___n9s5aq: echo(message: \\"wumbo\\") 
                        }"
            `)
})

test('Interfaces (dry)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteHero: Character
        }
        interface Character {
            name: String
        }
        type Human implements Character {
            name: String
            age: Int
        }
        type Alien implements Character {
            name: String
            moopleDoops: Float
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {},
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: true,
        }
    )

    let human = query.favoriteHero.asHuman
    human.age
    human.name

    expect(log).toMatchInlineSnapshot(`
                                Object {
                                  "{\\"type\\":\\"PROP\\",\\"name\\":\\"favoriteHero\\"}": Object {
                                    "{\\"type\\":\\"AS\\",\\"name\\":\\"Human\\"}": Object {
                                      "{\\"type\\":\\"PROP\\",\\"name\\":\\"age\\"}": Object {
                                        "__get": true,
                                      },
                                      "{\\"type\\":\\"PROP\\",\\"name\\":\\"name\\"}": Object {
                                        "__get": true,
                                      },
                                    },
                                  },
                                }
                `)

    expect(accessLogToGraphQL(log)).toMatchInlineSnapshot(`
                        "{
                          favoriteHero {
                            ... on Human {
                              __AS_Human___age: age 
                              __AS_Human___name: name 
                            }
                          }
                        }"
            `)
})

test('Unions (dry)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteHero: Character
        }
        union Character = Human | Alien
        type Human {
            name: String
            age: Int
        }
        type Alien {
            name: String
            moopleDoops: Float
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {},
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: true,
        }
    )

    let human = query.favoriteHero.asHuman
    human.age
    human.name

    expect(log).toMatchInlineSnapshot(`
                                Object {
                                  "{\\"type\\":\\"PROP\\",\\"name\\":\\"favoriteHero\\"}": Object {
                                    "{\\"type\\":\\"AS\\",\\"name\\":\\"Human\\"}": Object {
                                      "{\\"type\\":\\"PROP\\",\\"name\\":\\"age\\"}": Object {
                                        "__get": true,
                                      },
                                      "{\\"type\\":\\"PROP\\",\\"name\\":\\"name\\"}": Object {
                                        "__get": true,
                                      },
                                    },
                                  },
                                }
                `)

    expect(accessLogToGraphQL(log)).toMatchInlineSnapshot(`
                        "{
                          favoriteHero {
                            ... on Human {
                              __AS_Human___age: age 
                              __AS_Human___name: name 
                            }
                          }
                        }"
            `)
})

test('Unions (wet)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteHero: Character
        }
        union Character = Human | Alien
        type Human {
            name: String
            age: Int
        }
        type Alien {
            name: String
            moopleDoops: Float
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {
                favoriteHero: {
                    __AS_Human___age: 42,
                    __AS_Human___name: 'blarg',
                },
            },
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: false,
        }
    )

    let human = query.favoriteHero.asHuman
    expect(human.age).toEqual(42)
    expect(human.name).toEqual('blarg')
})

test('__typename (dry)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteHero: Character
            favoriteHuman: Human
        }
        union Character = Human | Alien
        type Human {
            name: String
            age: Int
        }
        type Alien {
            name: String
            moopleDoops: Float
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {},
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: true,
        }
    )

    let human = query.favoriteHero
    expect(human.__typename).toEqual('Human')

    expect(query.favoriteHuman.__typename).toEqual('Human')

    expect(log).toMatchInlineSnapshot(`
        Object {
          "{\\"type\\":\\"PROP\\",\\"name\\":\\"favoriteHero\\"}": Object {
            "{\\"type\\":\\"PROP\\",\\"name\\":\\"__typename\\"}": Object {
              "__get": true,
            },
          },
          "{\\"type\\":\\"PROP\\",\\"name\\":\\"favoriteHuman\\"}": Object {
            "{\\"type\\":\\"PROP\\",\\"name\\":\\"__typename\\"}": Object {
              "__get": true,
            },
          },
        }
    `)

    expect(accessLogToGraphQL(log)).toMatchInlineSnapshot(`
        "{
          favoriteHero {
            __typename 
          }
          favoriteHuman {
            __typename 
          }
        }"
    `)
})

test('__typename (wet)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteHero: Character
        }
        union Character = Human | Alien
        type Human {
            name: String
            age: Int
        }
        type Alien {
            name: String
            moopleDoops: Float
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {
                favoriteHero: {
                    __typename: 'Human',
                },
            },
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: false,
        }
    )

    let human = query.favoriteHero
    expect(human.__typename).toEqual('Human')
})

test('Lists (dry)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteColors: [Color!]
        }
        type Color {
            name: String
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {},
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: true,
        }
    )

    query.favoriteColors.map((k: any) => k.name)

    expect(log).toMatchInlineSnapshot(`
                                Object {
                                  "{\\"type\\":\\"PROP\\",\\"name\\":\\"favoriteColors\\"}": Object {
                                    "{\\"type\\":\\"PROP\\",\\"name\\":\\"name\\"}": Object {
                                      "__get": true,
                                    },
                                  },
                                }
                `)

    expect(accessLogToGraphQL(log)).toMatchInlineSnapshot(`
                        "{
                          favoriteColors {
                            name 
                          }
                        }"
            `)
})

test('Enums (dry)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteColors: [Color!]
        }
        enum Color {
            BLUE
            GREEN
            PURPLE
            RED
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {},
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: true,
        }
    )

    expect(query.favoriteColors[0]).toEqual('BLUE')

    expect(log).toMatchInlineSnapshot(`
                                Object {
                                  "{\\"type\\":\\"PROP\\",\\"name\\":\\"favoriteColors\\"}": Object {
                                    "__get": true,
                                  },
                                }
                `)

    expect(accessLogToGraphQL(log)).toMatchInlineSnapshot(`
                        "{
                          favoriteColors 
                        }"
            `)
})

test('Enums (wet)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteColors: [Color!]
        }
        enum Color {
            BLUE
            GREEN
            PURPLE
            RED
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {
                favoriteColors: ['BLUE', 'GREEN', 'RED'],
            },
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: false,
        }
    )

    expect(query.favoriteColors).toEqual(['BLUE', 'GREEN', 'RED'])
})

test('Lists (wet)', async () => {
    let log = {}
    let schema = await parseGraphQL(gql`
        type Query {
            favoriteColors: [Color!]
        }
        type Color {
            name: String
        }
    `)
    let queryType = schema.types.find((k: GQLType) => k.name === schema.queryType.name)
    let query = createAccessor(
        {
            accessLog: log,
            data: {
                favoriteColors: [
                    {
                        name: 'blurple',
                    },
                    {
                        name: 'gween',
                    },
                ],
            },
            typeRef: queryType!,
            path: [],
        },
        {
            schema: schema,
            isDry: false,
        }
    )

    expect(query.favoriteColors.map((k: any) => k.name)).toEqual(['blurple', 'gween'])
})
