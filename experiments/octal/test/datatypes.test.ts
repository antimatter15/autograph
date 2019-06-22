import { convertGQLSchemaToTypescript } from "../src/typescript";
import { makeAccessLogger } from "../src/logger";
import { getQueryRoot } from "../src/schema";
import { accessLogToGraphQL } from "../src/generator";
import { makeRetriever } from "../src/retriever";
import { parseGraphQL, runGraphQL } from "./util";

describe('Different data types', () => {
    test('GQL String', async () => {
        let schema = await parseGraphQL(`
            type Query {
                echo(message: String): String
            }
        `)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
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
    })

    test('GQL Boolean', async () => {
        let gqlSchema = `
            type Query {
                wasSuspendedFromSchool: Boolean
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    wasSuspendedFromSchool?: boolean
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.wasSuspendedFromSchool).toEqual(true)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  wasSuspendedFromSchool 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                wasSuspendedFromSchool() {
                    return false
                },
            },
        })
        expect(data.data).toEqual({ wasSuspendedFromSchool: false })

        let ret = makeRetriever(data.data)
        expect(ret.wasSuspendedFromSchool).toEqual(false)
    })

    test('Custom Scalars', async () => {
        let gqlSchema = `
            scalar Zombocoin

            type Query {
                myNewICO: Zombocoin
            }
        `

        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    myNewICO?: Zombocoin
}

export type Zombocoin = any

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.myNewICO).toEqual({ __gqlScalarName: 'Zombocoin' })

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  myNewICO 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                myNewICO() {
                    return {
                        test: 123,
                    }
                },
            },
        })
        expect(data.data).toEqual({ myNewICO: { test: 123 } })

        let ret = makeRetriever(data.data)
        expect(ret.myNewICO).toEqual({ test: 123 })
    })

    test('GQL Int', async () => {
        let gqlSchema = `
            type Query {
                numberOfFriends: Int
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    numberOfFriends?: Int
}

/** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.numberOfFriends).toBe(42)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  numberOfFriends 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                numberOfFriends() {
                    return 150
                },
            },
        })
        expect(data.data).toEqual({ numberOfFriends: 150 })

        let ret = makeRetriever(data.data)
        expect(ret.numberOfFriends).toEqual(150)
    })

    test('GQL Types', async () => {
        let gqlSchema = `
            type Query {
                GetReview: Review!
            }

            type Review {
                author: String
                wasPositive: Boolean
                body: String
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    GetReview: Review
}

export type Review = GQLType & {
    author?: string
    wasPositive?: boolean
    body?: string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.GetReview.__typename).toBe('Review')
        expect(tracker.GetReview.author).toBe('Autograph {author}')

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  GetReview {
    __typename 
    author 
  }
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                GetReview() {
                    return {
                        author: 'Rodger Qbert',
                        wasPositive: true,
                        body: 'this was a good thing',
                    }
                },
            },
        })
        expect(data.data).toEqual({
            GetReview: { __typename: 'Review', author: 'Rodger Qbert' },
        })

        let ret = makeRetriever(data.data)
        expect(ret.GetReview.__typename).toEqual('Review')
        expect(ret.GetReview.author).toEqual('Rodger Qbert')
    })

    test('GQL Float', async () => {
        let gqlSchema = `
            type Query {
                radiansInADegree: Float
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    radiansInADegree?: Float
}

/** The \`Float\` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.radiansInADegree).toBe(17.76)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  radiansInADegree 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                radiansInADegree() {
                    return 13.217
                },
            },
        })
        expect(data.data).toEqual({ radiansInADegree: 13.217 })

        let ret = makeRetriever(data.data)
        expect(ret.radiansInADegree).toEqual(13.217)
    })

    test('GQL ID', async () => {
        let gqlSchema = `
            type Query {
                myUniqueIdentifier: ID
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    myUniqueIdentifier?: ID
}

/** The \`ID\` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as \`\\"4\\"\`) or integer (such as \`4\`) input value will be accepted as an ID. */
export type ID = string

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(
            tracker.myUniqueIdentifier.startsWith('Autograph ID')
        ).toBeTruthy()

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  myUniqueIdentifier 
}"
`)

        let data = await runGraphQL(gqlSchema, query)
        expect((data.data as any).myUniqueIdentifier.length).toBe(
            '5e8ac981-0b2f-4937-9b6e-2c5e777d8de9'.length
        )

        let ret = makeRetriever(data.data)
        expect(ret.myUniqueIdentifier.length).toEqual(
            '5e8ac981-0b2f-4937-9b6e-2c5e777d8de9'.length
        )
    })

    test('GQL Arrays', async () => {
        let gqlSchema = `
            type Query {
                allMyFriends: [String]
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    allMyFriends?: string[]
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.allMyFriends.length).toBe(1)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  allMyFriends 
}"
`)

        let data = await runGraphQL(gqlSchema, query)
        expect(data.data).toEqual({
            allMyFriends: ['Hello World', 'Hello World'],
        })

        let ret = makeRetriever(data.data)
        expect(ret.allMyFriends).toEqual(['Hello World', 'Hello World'])
    })

    test('GQL Unions', async () => {
        let gqlSchema = `
            type Query {
                allMyFrienemies: [Frienemies]
            }
            
            # what if we made a workers union for people who have to deal with me
            union Frienemies = Friend | Enemy

            union Builtins = Enemy 

            type Friend {
                friendliness: Int
            }
            type Enemy {
                hatred: Int
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    allMyFrienemies?: Frienemies[]
}

/** what if we made a workers union for people who have to deal with me */
export type Frienemies = Friend | Enemy

export type Friend = GQLType & {
    friendliness?: Int
}

/** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

export type Enemy = GQLType & {
    hatred?: Int
}

export type Builtins = Enemy

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.allMyFrienemies.length).toBe(1)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  allMyFrienemies {
    __typename
  }
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                allMyFrienemies() {
                    return [{ __typename: 'Enemy' }, { __typename: 'Friend' }]
                },
            },
            Frienemies: { __resolveType() {} },
            Builtins: { __resolveType() {} },
        })
        expect(data.data).toEqual({
            allMyFrienemies: [
                { __typename: 'Enemy' },
                { __typename: 'Friend' },
            ],
        })

        let ret = makeRetriever(data.data)
        expect(ret.allMyFrienemies).toEqual([
            { __typename: 'Enemy' },
            { __typename: 'Friend' },
        ])
    })

    test('Input Type Basic', async () => {
        let gqlSchema = `
            type Query {
                hello(input: ReviewInput!): String
            }
            
            input ReviewInput {
                commentary: String
            }
        `
        let schema = await parseGraphQL(gqlSchema)
        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    hello?(args: { input: ReviewInput }): string
}

export type ReviewInput = {
    commentary?: string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.hello({ input: { commentary: 'merp' } })).toBe(
            'Autograph {hello}'
        )

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  hello___y4wueg: hello(input: {commentary: \\"merp\\"}) 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                hello(parent: any, args: any) {
                    return args.input.commentary
                },
            },
        })
        expect(data.data).toEqual({ hello___y4wueg: 'merp' })

        let ret = makeRetriever(data.data)
        expect(ret.hello({ input: { commentary: 'merp' } })).toEqual('merp')
    })

    test('Input Type', async () => {
        let gqlSchema = `
            type Query {
                hello: String
            }
            type Mutation {
                UpdateReview(input: ReviewInput!): String
            }

            # I reviewed this input
            input ReviewInput {
                stars: Int!
                # my commentary on comment stuff
                commentary: String
            }

            input SomethingElse {
                stripes: Int
            }
        `

        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    hello?: string
}

export type Mutation = GQLType & {
    UpdateReview?(args: { input: ReviewInput }): string
}

/** I reviewed this input */
export type ReviewInput = {
    stars: Int
    /** my commentary on comment stuff */
    commentary?: string
}

/** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

export type SomethingElse = {
    stripes?: Int
}

"
`)
    })

    test('Enums', async () => {
        let gqlSchema = `
            type Query {
                favoriteMovie: Episode!
            }

            # these are the only three movies
            enum Episode {
                NEWHOPE
                EMPIRE
                JEDI
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    favoriteMovie: Episode
}

/** these are the only three movies */
export type Episode = \\"NEWHOPE\\" | \\"EMPIRE\\" | \\"JEDI\\"

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.favoriteMovie).toBe('NEWHOPE')

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  favoriteMovie 
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                favoriteMovie() {
                    return 'JEDI'
                },
            },
        })
        expect(data.data).toEqual({ favoriteMovie: 'JEDI' })

        let ret = makeRetriever(data.data)
        expect(ret.favoriteMovie).toEqual('JEDI')
    })

    test('Interfaces', async () => {
        let gqlSchema = `
            type Query {
                hero: Character

            }

            # to be or not to be
            interface Character {
                id: ID!
                name: String!
                friends: [Character]

                # where this character appears in
                appearsIn: [Episode]!
            }

            interface Winterface {
                name: String
            }

            type Human implements Character {
                id: ID!
                name: String!
                friends: [Character]
                appearsIn: [Episode]!
                totalCredits: Int
            }

            type Droid implements Character {
                id: ID!
                name: String!
                friends: [Character]
                appearsIn: [Episode]!
                primaryFunction: String
            }

            enum Episode {
                NEWHOPE
                EMPIRE
                JEDI
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(convertGQLSchemaToTypescript(schema)).toMatchInlineSnapshot(`
"type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    hero?: Character
}

/** to be or not to be */
export interface Character extends GQLType {
    id: ID
    name: string
    friends?: Character[]
    /** where this character appears in */
    appearsIn: Episode[]
    /** Use \`asHuman\` to access fields on the underlying concrete type. */
    asHuman: Human
    /** Use \`asDroid\` to access fields on the underlying concrete type. */
    asDroid: Droid
}

/** The \`ID\` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as \`\\"4\\"\`) or integer (such as \`4\`) input value will be accepted as an ID. */
export type ID = string

export type Episode = \\"NEWHOPE\\" | \\"EMPIRE\\" | \\"JEDI\\"

export interface Winterface extends GQLType {
    name?: string
}

export type Human = GQLType & {
    id: ID
    name: string
    friends?: Character[]
    appearsIn: Episode[]
    totalCredits?: Int
}

/** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

export type Droid = GQLType & {
    id: ID
    name: string
    friends?: Character[]
    appearsIn: Episode[]
    primaryFunction?: string
}

"
`)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.hero.primaryFunction).toBeUndefined()
        expect(tracker.hero.name).toBe('Autograph {name}')
        expect(tracker.hero.asDroid.primaryFunction).toBe(
            'Autograph {primaryFunction}'
        )
        expect(tracker.hero.asHuman.primaryFunction).toBeUndefined()
        // expect(tracker.hero.asHuman.totalCredits).toBe(42)
        // expect(tracker.hero.asHuman.friends.length).toBe(1)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchInlineSnapshot(`
"{
  hero {
    name 
    ... on Droid {
      __AS_Droid___primaryFunction: primaryFunction 
    }
    ... on Human {
      __AS_Human_____typename: __typename
    }
  }
}"
`)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                hero: () => ({
                    name: 'Merpsican',
                    primaryFunction: 'Robot',
                    __typename: 'Droid',
                }),
            },
            Character: {
                __resolveType() {
                    return 'Droid'
                },
            },
            Winterface: {
                __resolveType() {
                    return 'Droid'
                },
            },
        })

        expect(data.data).toEqual({
            hero: { __AS_Droid___primaryFunction: 'Robot', name: 'Merpsican' },
        })

        let ret = makeRetriever(data.data)
        expect(ret.hero.primaryFunction).toBeUndefined()
        expect(ret.hero.asDroid.primaryFunction).toEqual('Robot')

        expect(ret.hero.name).toBe('Merpsican')
        expect(ret.hero.id).toBeUndefined()
    })
})