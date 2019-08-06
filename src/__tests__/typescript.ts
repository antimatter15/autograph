import convertGQLSchemaToTypescript from '../typescript'
import { buildASTSchema, parse, graphql } from 'graphql'
import { SUCCINCT_INTROSPECTION_QUERY } from '../graphql'
import gql from 'graphql-tag'

export async function parseGraphQL(ast: any): Promise<any> {
    let doc = buildASTSchema(ast, {
        commentDescriptions: true,
    })
    let data = (await graphql(doc, SUCCINCT_INTROSPECTION_QUERY)) as any
    if(data.errors) throw data.errors[0];
    return data.data.__schema
}

test('GQL String', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    echo(message: String): String
                }
            `)
        )
    ).toMatchInlineSnapshot(`
        "type GQLType = {
            /** The name of the object type */
            __typename: string
        }

        export type Query = GQLType & {
            echo(args: { message?: string }): string | undefined

            /** Check this to determine whether the query is loading */
            _loading?: boolean
            /** Check this to display error messages */
            _error?: any
            /** This field is defined when Autograph is executing a dry run */
            _dry?: boolean
        }

        "
    `)
})

test('Custom Scalar', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                scalar Zombocoin

                type Query {
                    myNewICO: Zombocoin
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    myNewICO?: Zombocoin

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                export type Zombocoin = any

                                "
                `)
})

test('GQL Int', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    numberOfFriends: Int
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    numberOfFriends?: Int

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                /** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
                                export type Int = number

                                "
                `)
})

test('GQL Types', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    GetReview: Review!
                }

                # this is for book reviews
                type Review {
                    author: String # who wrote the thing
                    wasPositive: Boolean # was it good or was it whack
                    body: String
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    GetReview: Review

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                export type Review = GQLType & {
                                    author?: string
                                    wasPositive?: boolean
                                    body?: string
                                }

                                "
                `)
})

test('GQL Float', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    radiansInADegree: Float
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    radiansInADegree?: Float

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                /** The \`Float\` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
                                export type Float = number

                                "
                `)
})
test('GQL ID', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    myUniqueIdentifier: ID
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    myUniqueIdentifier?: ID

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                /** The \`ID\` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as \`\\"4\\"\`) or integer (such as \`4\`) input value will be accepted as an ID. */
                                export type ID = string

                                "
                `)
})

test('GQL Array', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    allMyFriends: [String]
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    allMyFriends?: string[]

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                "
                `)
})

test('GQL Union', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    allMyFrienemies: [Frienemies]
                }

                # what if we made a workers union for people who have to deal with me
                union Frienemies = Friend | Enemy

                """
                O Captain! my Captain! our fearful trip is done,
                The ship has weather’d every rack, the prize we sought is won,
                The port is near, the bells I hear, the people all exulting,
                While follow eyes the steady keel, the vessel grim and daring;
                """
                union Builtins = Enemy

                type Friend {
                    friendliness: Int
                }
                type Enemy {
                    hatred: Int
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    allMyFrienemies?: Frienemies[]

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                export type Frienemies = Friend | Enemy

                                export type Friend = GQLType & {
                                    friendliness?: Int
                                }

                                /** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
                                export type Int = number

                                export type Enemy = GQLType & {
                                    hatred?: Int
                                }

                                /** O Captain! my Captain! our fearful trip is done,
                                The ship has weather’d every rack, the prize we sought is won,
                                The port is near, the bells I hear, the people all exulting,
                                While follow eyes the steady keel, the vessel grim and daring; */
                                export type Builtins = Enemy

                                "
                `)
})

test('GQL Boolean', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    wasSuspendedFromSchool: Boolean
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    wasSuspendedFromSchool?: boolean

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                "
                `)
})

test('GQL Enums', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    favoriteMovie: Episode!
                }

                # these are the only three movies
                enum Episode {
                    NEWHOPE
                    EMPIRE
                    JEDI
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    favoriteMovie: Episode

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                export type Episode = \\"NEWHOPE\\" | \\"EMPIRE\\" | \\"JEDI\\"

                                "
                `)
})

test('GQL Interfaces', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
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

                """
                Human–computer interaction researches the design and use of
                computer technology, focused on the interfaces between people
                and computers. Researchers in the field of HCI both observe
                the ways in which humans interact with computers and design
                technologies that let humans interact with computers in novel
                ways.
                """
                interface Winterface {
                    """
                    A rose by any other name would smell as sweet
                    """
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
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    hero?: Character

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                export interface Character extends GQLType {
                                    id: ID
                                    name: string
                                    friends?: Character[]
                                    appearsIn: Episode[]
                                    /** Use \`asHuman\` to access fields on the underlying concrete type. */
                                    asHuman: Human
                                    /** Use \`asDroid\` to access fields on the underlying concrete type. */
                                    asDroid: Droid
                                }

                                /** The \`ID\` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as \`\\"4\\"\`) or integer (such as \`4\`) input value will be accepted as an ID. */
                                export type ID = string

                                export type Episode = \\"NEWHOPE\\" | \\"EMPIRE\\" | \\"JEDI\\"

                                /** Human–computer interaction researches the design and use of
                                computer technology, focused on the interfaces between people
                                and computers. Researchers in the field of HCI both observe
                                the ways in which humans interact with computers and design
                                technologies that let humans interact with computers in novel
                                ways. */
                                export interface Winterface extends GQLType {
                                    /** A rose by any other name would smell as sweet */
                                    name?: string
                                }

                                export type Human = GQLType & {
                                    id: ID
                                    name: string
                                    friends?: Character[]
                                    appearsIn: Episode[]
                                    totalCredits?: Int
                                }

                                /** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
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
})

test('GQL Input Type', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    hello(input: ReviewInput!): String

                    rumor(input: OtherInput): String
                }

                """
                This is a review of the inputs and stuff
                """
                input ReviewInput {
                    id: ID!

                    """
                    commentary can sometimes be very important
                    """
                    commentary: String
                }

                input OtherInput {
                    murmurs: String
                }
            `)
        )
    ).toMatchInlineSnapshot(`
        "type GQLType = {
            /** The name of the object type */
            __typename: string
        }

        export type Query = GQLType & {
            hello(args: { input: ReviewInput }): string | undefined
            rumor(args: { input?: OtherInput }): string | undefined

            /** Check this to determine whether the query is loading */
            _loading?: boolean
            /** Check this to display error messages */
            _error?: any
            /** This field is defined when Autograph is executing a dry run */
            _dry?: boolean
        }

        /** This is a review of the inputs and stuff */
        export type ReviewInput = {
            id: ID
            /** commentary can sometimes be very important */
            commentary?: string
        }

        /** The \`ID\` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as \`\\"4\\"\`) or integer (such as \`4\`) input value will be accepted as an ID. */
        export type ID = string

        export type OtherInput = {
            murmurs?: string
        }

        "
    `)
})

test('Basic query', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    hello_world_message: String
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    hello_world_message?: string

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                "
                `)
})

test('Query with arguments', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    allFilms(
                        after: String
                        first: Int
                        before: String
                        last: Int
                    ): String

                    allCharacters(
                        after: String
                        first: Int
                        before: String
                        last: Int
                    ): String!
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                "type GQLType = {
                    /** The name of the object type */
                    __typename: string
                }

                export type Query = GQLType & {
                    allFilms(args: { after?: string, first?: Int, before?: string, last?: Int }): string | undefined
                    allCharacters(args: { after?: string, first?: Int, before?: string, last?: Int }): string

                    /** Check this to determine whether the query is loading */
                    _loading?: boolean
                    /** Check this to display error messages */
                    _error?: any
                    /** This field is defined when Autograph is executing a dry run */
                    _dry?: boolean
                }

                /** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
                export type Int = number

                "
        `)
})

test('Basic mutation', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                type Query {
                    hello_world_message: String
                }
                type Mutation {
                    # Four score and seven years ago...
                    changeName(name: String): String
                }
            `)
        )
    ).toMatchInlineSnapshot(`
        "type GQLType = {
            /** The name of the object type */
            __typename: string
        }

        export type Query = GQLType & {
            hello_world_message?: string

            /** Check this to determine whether the query is loading */
            _loading?: boolean
            /** Check this to display error messages */
            _error?: any
            /** This field is defined when Autograph is executing a dry run */
            _dry?: boolean
        }

        export type Mutation = GQLType & {
            changeName(args: { name?: string }): string | undefined
        }

        "
    `)
})

test('GQL Descriptions', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                """
                A simple GraphQL schema which is well described.
                """
                type Query {
                    """
                    Translates a string from a given language into a different language.
                    """
                    translate(
                        "The original language that \`text\` is provided in."
                        fromLanguage: Language

                        "The translated language to be returned."
                        toLanguage: Language

                        "The text to be translated."
                        text: String
                    ): String
                }

                """
                The set of languages supported by \`translate\`.
                """
                enum Language {
                    "English"
                    EN

                    "French"
                    FR

                    "Chinese"
                    CH
                }
            `)
        )
    ).toMatchInlineSnapshot(`
        "type GQLType = {
            /** The name of the object type */
            __typename: string
        }

        /** A simple GraphQL schema which is well described. */
        export type Query = GQLType & {
            /** Translates a string from a given language into a different language. */
            translate(args: { fromLanguage?: Language, toLanguage?: Language, text?: string }): string | undefined

            /** Check this to determine whether the query is loading */
            _loading?: boolean
            /** Check this to display error messages */
            _error?: any
            /** This field is defined when Autograph is executing a dry run */
            _dry?: boolean
        }

        /** The set of languages supported by \`translate\`. */
        export type Language = \\"EN\\" | \\"FR\\" | \\"CH\\"

        "
    `)
})

test('Custom query type', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                schema {
                    query: CustomQueryAPI
                }
                type CustomQueryAPI {
                    hello_world_message: String
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "export type Query = CustomQueryAPI

                                type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type CustomQueryAPI = GQLType & {
                                    hello_world_message?: string

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                "
                `)
})

test('Custom mutation type', async () => {
    expect(
        convertGQLSchemaToTypescript(
            await parseGraphQL(gql`
                schema {
                    mutation: CustomMutationAPI
                    query: Query
                }
                type Query {
                    hello_world_message: String
                }
                type CustomMutationAPI {
                    changeName(name: String): String!
                }
            `)
        )
    ).toMatchInlineSnapshot(`
                                "export type Mutation = CustomMutationAPI

                                type GQLType = {
                                    /** The name of the object type */
                                    __typename: string
                                }

                                export type Query = GQLType & {
                                    hello_world_message?: string

                                    /** Check this to determine whether the query is loading */
                                    _loading?: boolean
                                    /** Check this to display error messages */
                                    _error?: any
                                    /** This field is defined when Autograph is executing a dry run */
                                    _dry?: boolean
                                }

                                export type CustomMutationAPI = GQLType & {
                                    changeName(args: { name?: string }): string
                                }

                                "
                `)
})

test('Exception for unhandled type', () => {
    expect(() =>
        convertGQLSchemaToTypescript({
            queryType: { name: 'Query' },
            types: [
                {
                    kind: 'Wumbo',
                    name: 'Derp',
                },
            ],
        })
    ).toThrowErrorMatchingInlineSnapshot(
        `"Unable to handle type \\"Wumbo\\" named \\"Derp\\""`
    )
})

test('Exception for unhandled subtype', () => {
    expect(() =>
        convertGQLSchemaToTypescript({
            queryType: { name: 'Query' },
            types: [
                {
                    kind: 'UNION',
                    name: 'Derp',
                    possibleTypes: [
                        {
                            kind: 'Wumbo',
                            name: 'Flerp',
                        },
                    ],
                },
            ],
        })
    ).toThrowErrorMatchingInlineSnapshot(
        `"Unable to handle type \\"Wumbo\\" named \\"Flerp\\""`
    )
})
