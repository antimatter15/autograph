import { schemaToTypescript, parseGraphQL, runGraphQL } from './schema2typescript'
import {  makeAccessLogger, getQueryRoot, getMutationRoot, accessLogToGraphQL, makeRetriever } from './schema2typescript'
// import { encodeField, decodeField, encodeArguments, decodeArguments } from './schema2typescript'


expect.extend({
  toMatchToken(received, reference) {
    const splitByTokens = (s: string) => (' ' + s + ' ').split(/\s+/g)
    let tokens1 = splitByTokens(received),
        tokens2 = splitByTokens(reference);

    for(let i = 0; i < Math.max(tokens1.length, tokens2.length); i++){
        let testTok = tokens1[i],
            refTok = tokens2[i];

        if(testTok !== refTok){
            return {
                message: () =>
                  `Expected "${refTok}" instead of "${testTok}" at index ${i}.\n\nExpected:\n${reference}\n\nFound:\n${received}\n`,
                pass: false,
            };
        }
    }

    return {
        message: () => ``,
        pass: true,
    };
  },
});


declare global {
  namespace jest {
    // tslint:disable-next-line:interface-name
    interface Matchers<R> {
      toMatchToken(reference: string): R
    }
  }
}


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

    expect(schemaToTypescript(schema)).toMatchToken(`
        export type Query = {
            hero?: Character
        }

        /** to be or not to be */
        export interface Character {
            id: ID
            name: string
            friends?: Character[]
            /** where this character appears in */
            appearsIn: Episode[]
        }

        /** The \`ID\` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as \`"4"\`) or integer (such as \`4\`) input value will be accepted as an ID. */
        export type ID = string

        export type Episode = "NEWHOPE" | "EMPIRE" | "JEDI"

        export interface Winterface {
            name?: string
        }

        export type Human = {
            id: ID
            name: string
            friends?: Character[]
            appearsIn: Episode[]
            totalCredits?: Int
        }

        interface Character {
            asHuman: Human
        }

        /** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
        export type Int = number

        export type Droid = {
            id: ID
            name: string
            friends?: Character[]
            appearsIn: Episode[]
            primaryFunction?: string
        }

        interface Character {
            asDroid: Droid
        }
    `)

    let log = {}
    let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
    expect(tracker.hero.primaryFunction).toBeUndefined()
    expect(tracker.hero.name).toBe('Autograph {name}')
    expect(tracker.hero.asDroid.primaryFunction).toBe('Autograph {primaryFunction}')
    expect(tracker.hero.asHuman.primaryFunction).toBeUndefined()
    // expect(tracker.hero.asHuman.totalCredits).toBe(42)
    // expect(tracker.hero.asHuman.friends.length).toBe(1)

    
    
    let query = accessLogToGraphQL(log)
    expect(query).toMatchToken(`
        {
          hero {
            name
            ... on Droid {
              __AS_Droid___primaryFunction: primaryFunction
            }
            ... on Human {
              __AS_Human_____typename: __typename
            }
          }
        }
    `)

    let data = await runGraphQL(gqlSchema, query, {
        Query: {
            hero: () => ({
                name: 'Merpsican',
                primaryFunction: 'Robot',
                __typename: 'Droid'
            })
        },
        Character: {
            __resolveType(){
                return 'Droid'
            }
        },
        Winterface: {
            __resolveType(){
                return 'Droid'
            }
        }
    })



    expect(data).toEqual( {"hero": {"__AS_Droid___primaryFunction": "Robot", "name": "Merpsican"}})


    let ret = makeRetriever(data)
    expect(ret.hero.primaryFunction).toBeUndefined()
    expect(ret.hero.asDroid.primaryFunction).toEqual('Robot')

    expect(ret.hero.name).toBe("Merpsican")
    expect(ret.hero.id).toBeUndefined()
    
})



describe('Different data types', () => {
    test('GQL String', async () => {
        let schema = await parseGraphQL(`
            type Query {
                echo(message: String): String
            }
        `)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                echo?(args: { message?: string }): string
            }
        `)
    })

    test('GQL Boolean', async () => {
        let gqlSchema = `
            type Query {
                wasSuspendedFromSchool: Boolean
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                wasSuspendedFromSchool?: boolean
            }
        `)


        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.wasSuspendedFromSchool).toEqual(true)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              wasSuspendedFromSchool
            }
        `)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                wasSuspendedFromSchool(){
                    return false
                }
            }
        })
        expect(data).toEqual({"wasSuspendedFromSchool": false})


        let ret = makeRetriever(data)
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

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                myNewICO?: Zombocoin
            }

            export type Zombocoin = any
        `)


        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.myNewICO).toEqual({"__gqlScalarName": "Zombocoin"})

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              myNewICO
            }
        `)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                myNewICO(){
                    return {
                        "test": 123
                    }
                }
            }
        })
        expect(data).toEqual({"myNewICO": {"test": 123}})


        let ret = makeRetriever(data)
        expect(ret.myNewICO).toEqual({"test": 123})
    })

    test('GQL Int', async () => {
        let gqlSchema = `
            type Query {
                numberOfFriends: Int
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                numberOfFriends?: Int
            }

            /** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
            export type Int = number
        `)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.numberOfFriends).toBe(42)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              numberOfFriends
            }
        `)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                numberOfFriends(){
                    return 150
                }
            }
        })
        expect(data).toEqual({"numberOfFriends": 150})


        let ret = makeRetriever(data)
        expect(ret.numberOfFriends).toEqual(150)
    })


    test('GQL Float', async () => {
        let gqlSchema = `
            type Query {
                radiansInADegree: Float
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                radiansInADegree?: Float
            }

            /** The \`Float\` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
            export type Float = number
        `)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.radiansInADegree).toBe(17.76)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              radiansInADegree
            }
        `)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                radiansInADegree(){
                    return 13.217
                }
            }
        })
        expect(data).toEqual({"radiansInADegree": 13.217})


        let ret = makeRetriever(data)
        expect(ret.radiansInADegree).toEqual(13.217)
    })



    test('GQL ID', async () => {
        let gqlSchema = `
            type Query {
                myUniqueIdentifier: ID
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                myUniqueIdentifier?: ID
            }

            /** The \`ID\` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as \`"4"\`) or integer (such as \`4\`) input value will be accepted as an ID. */
            export type ID = string
        `)


        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.myUniqueIdentifier.startsWith('Autograph ID')).toBeTruthy()

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              myUniqueIdentifier
            }
        `)

        let data = await runGraphQL(gqlSchema, query)
        expect((data as any).myUniqueIdentifier.length).toBe("5e8ac981-0b2f-4937-9b6e-2c5e777d8de9".length)


        let ret = makeRetriever(data)
        expect(ret.myUniqueIdentifier.length).toEqual("5e8ac981-0b2f-4937-9b6e-2c5e777d8de9".length)
    })

    test('GQL Arrays', async () => {
        let gqlSchema = `
            type Query {
                allMyFriends: [String]
            }
        `
        let schema = await parseGraphQL(gqlSchema)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                allMyFriends?: string[]
            }
        `)


        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.allMyFriends.length).toBe(1)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              allMyFriends
            }
        `)

        let data = await runGraphQL(gqlSchema, query)
        expect(data).toEqual({"allMyFriends": ["Hello World", "Hello World"]})


        let ret = makeRetriever(data)
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

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                allMyFrienemies?: Frienemies[]
            }
            
            /** what if we made a workers union for people who have to deal with me */
            export type Frienemies = Friend | Enemy

            export type Friend = {
                friendliness?: Int
            }

            /** The \`Int\` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
            export type Int = number

            export type Enemy = {
                hatred?: Int
            }

            export type Builtins = Enemy
        `)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.allMyFrienemies.length).toBe(1)

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              allMyFrienemies {
                  __typename
              }
            }
        `)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                allMyFrienemies(){
                    return [{ __typename: 'Enemy' }, { __typename: 'Friend' }]
                }
            },
            Frienemies: { __resolveType() {} },
            Builtins: { __resolveType() {} }
        })
        expect(data).toEqual({"allMyFrienemies": [{__typename: 'Enemy'}, {__typename: 'Friend'}]})


        let ret = makeRetriever(data)
        expect(ret.allMyFrienemies).toEqual([{"__typename": "Enemy"}, {"__typename": "Friend"}])
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
        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                hello?(args: { input: ReviewInput }): string
            }

            export type ReviewInput = {
                commentary?: string
            }
        `)

        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.hello({ input: { commentary: 'merp' } })).toBe('Autograph {hello}')

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              hello___inputcommentarymerp: hello(input: {commentary: "merp"})
            }
        `)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                hello(parent: any, args: any){
                    return args.input.commentary
                }
            },
        })
        expect(data).toEqual({"hello___inputcommentarymerp": "merp"})


        let ret = makeRetriever(data)
        expect(ret.hello({ input: { commentary: 'merp' } })).toEqual("merp")
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

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                hello?: string
            }

            export type Mutation = {
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

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                favoriteMovie: Episode
            }

            /** these are the only three movies */
            export type Episode = "NEWHOPE" | "EMPIRE" | "JEDI"
        `)


        let log = {}
        let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
        expect(tracker.favoriteMovie).toBe('NEWHOPE')

        let query = accessLogToGraphQL(log)
        expect(query).toMatchToken(`
            {
              favoriteMovie
            }
        `)

        let data = await runGraphQL(gqlSchema, query, {
            Query: {
                favoriteMovie(){
                    return "JEDI"
                }
            },
        })
        expect(data).toEqual({"favoriteMovie": "JEDI"})


        let ret = makeRetriever(data)
        expect(ret.favoriteMovie).toEqual("JEDI")
    })



})

test('Custom query type', async () => {
    let schema = await parseGraphQL(`
        schema {
            query: CustomQueryAPI
        }
        type CustomQueryAPI {
            hello_world_message: String
        }
    `)

    expect(schemaToTypescript(schema)).toMatchToken(`
        type Query = CustomQueryAPI

        export type CustomQueryAPI = {
            hello_world_message?: string
        }
    `)
})



test('Basic method query', async () => {
    let gqlSchema = `
        type Query {
            echo(message: String): String
        }
    `
    let schema = await parseGraphQL(gqlSchema)

    expect(schemaToTypescript(schema)).toMatchToken(`
        export type Query = {
            echo?(args: { message?: string }): string
        }
    `)


    let log = {}
    let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
    expect(tracker.echo({ message: 'blah' })).toBe('Autograph {echo}')
    expect(tracker.echo()).toBe('Autograph {echo}')

    let query = accessLogToGraphQL(log)
    expect(query).toMatchToken(`
        {
          echo___messageblah: echo(message: "blah")
          echo___: echo
        }
    `)

    let data = await runGraphQL(gqlSchema, query)
    expect(data).toEqual({
        "echo___": "Hello World", 
        "echo___messageblah": "Hello World"
    })


    let ret = makeRetriever(data)
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

    expect(schemaToTypescript(schema)).toMatchToken(`
        export type Query = {
            hello_world_message?: string
        }
    `)



    let log = {}
    let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
    expect(tracker.hello_world_message).toBe('Autograph {hello_world_message}')
    expect(tracker.not_defined_thing).toBeUndefined()

    let query = accessLogToGraphQL(log)
    expect(query).toMatchToken(`
        {
          hello_world_message
        }
    `)
    expect(await runGraphQL(gqlSchema, query)).toEqual({ hello_world_message: 'Hello World' })
})

describe('Comments', () => {

    test('Old style GQL comments on fields', async () => {
        let schema = await parseGraphQL(`
            type Query {
                # This is a hello world message
                hello_world_message: String
            }
        `)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                /** This is a hello world message */
                hello_world_message?: string
            }
        `)
    })




    test('New style GQL comments on fields', async () => {
        let schema = await parseGraphQL(`
            type Query {
                """This is a hello world message"""
                hello_world_message: String
            }
        `)

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                /** This is a hello world message */
                hello_world_message?: string
            }
        `)
    })

    test('Old style GQL comments on types', async () => {
        let schema = await parseGraphQL(`
            # This is a hello world message
            type Query {
                hello_world_message: String
            }
        `)

        expect(schemaToTypescript(schema)).toMatchToken(`
            /** This is a hello world message */
            export type Query = {
                hello_world_message?: string
            }
        `)
    })


    test('New style GQL comments on types', async () => {
        let schema = await parseGraphQL(`
            """This is a hello world message"""
            type Query {
                hello_world_message: String
            }
        `)

        expect(schemaToTypescript(schema)).toMatchToken(`
            /** This is a hello world message */
            export type Query = {
                hello_world_message?: string
            }
        `)
    })

})




test('Basic method query with required arguments', async () => {
    let schema = await parseGraphQL(`
        type Query {
            echo(message: String!): String!
        }
    `)

    expect(schemaToTypescript(schema)).toMatchToken(`
        export type Query = {
            echo(args: { message: string }): string
        }
    `)
})



test('Basic method query with array arguments', async () => {
    let gqlSchema = `
        type Query {
            echo(messages: [String]!): String!
        }
    `
    let schema = await parseGraphQL(gqlSchema)

    expect(schemaToTypescript(schema)).toMatchToken(`
        export type Query = {
            echo(args: { messages: string[] }): string
        }
    `)

    let log = {}
    let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
    expect(tracker.echo({ messages: ['what', 'stuff'] })).toBe('Autograph {echo}')

    let query = accessLogToGraphQL(log)
    expect(query).toMatchToken(`
        {
          echo___messageswhatstuff: echo(messages: ["what", "stuff"])
        }
    `)


    let data = await runGraphQL(gqlSchema, query, {
        Query: {
            echo(parent: any, args: { messages: string[] }){
                return args.messages[1]
            }
        }
    })
    expect(data).toEqual({
        "echo___messageswhatstuff": "stuff", 
    })


    let ret = makeRetriever(data)
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

    expect(schemaToTypescript(schema)).toMatchToken(`
        export type Query = {
            echo?(args: { data?: JSON }): JSON
        }

        export type JSON = any
    `)

    let log = {}
    let tracker = makeAccessLogger(schema, getQueryRoot(schema), log)
    expect(tracker.echo({ data: ['what', 'stuff'] })).toEqual({"__gqlScalarName": "JSON"})
    expect(tracker.echo({ data: {sup: 42} })).toEqual({"__gqlScalarName": "JSON"})

    let query = accessLogToGraphQL(log)
    expect(query).toMatchToken(`
        {
          echo___datawhatstuff: echo(data: ["what", "stuff"])
          echo___datasup42: echo(data: {sup: 42})
        }
    `)


    let data = await runGraphQL(gqlSchema, query, {
        Query: {
            echo(parent: any, args: { data: any }){
                return args.data
            }
        }
    })
    expect(data).toEqual({"echo___datasup42": {"sup": 42}, "echo___datawhatstuff": ["what", "stuff"]})


    let ret = makeRetriever(data)
    expect(ret.echo()).toBeUndefined()
    expect(ret.echo({ data: ['what', 'stuff'] })).toEqual(['what', 'stuff'])

    expect(ret.echo({ data: {"sup": 42} })).toEqual({"sup": 42})
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

        expect(schemaToTypescript(schema)).toMatchToken(`
            type Query = CustomQueryAPI
            type Mutation = CustomMutationAPI

            export type CustomQueryAPI = {
                hello_world_message?: string
            }

            export type CustomMutationAPI = {
                merp?(args: { blah?: string }): string
            }
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

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                GetReview?: Review
            }

            export type Review = {
                commentary?: string
                author?: string
            }

            export type Mutation = {
                UpdateReview?(args: { input: ReviewInput }): Review
            }

            export type ReviewInput = {
                commentary?: string
                author?: string
            }
        `)

        let log = {}
        let tracker = makeAccessLogger(schema, getMutationRoot(schema), log)
        expect(tracker.UpdateReview({ input: { commentary: 'nimby yimby', author: 'hank george' } }).author)
            .toEqual("Autograph {author}")

        let query = accessLogToGraphQL(log, { operationType: 'mutation' })
        expect(query).toMatchToken(`
            mutation {
              UpdateReview___inputcommentarynimbyyimbyauthorhankgeorge: UpdateReview(input: {commentary: "nimby yimby", author: "hank george"}) {
                author
              }
            }
        `)


        let data = await runGraphQL(gqlSchema, query, {
            Mutation: {
                UpdateReview(parent: any, args: { input: any }){
                    return args.input
                }
            }
        })
        expect(data).toEqual({"UpdateReview___inputcommentarynimbyyimbyauthorhankgeorge": {"author": "hank george"}})


        let ret = makeRetriever(data)
        expect(ret.UpdateReview({ })).toBeUndefined()
        expect(ret.UpdateReview({ input: { commentary: 'nimby yimby', author: 'hank george' } }).author).toEqual('hank george')
        expect(ret.UpdateReview({ input: { commentary: 'nimby yimby', author: 'hank george' } }).commentary).toBeUndefined()
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

        expect(schemaToTypescript(schema)).toMatchToken(`
            export type Query = {
                echo(args: { messages: string[] }): string
            }

            export type Mutation = {
                updateBio(args: { bio: string }): string
            }
        `)

        let log = {}
        let tracker = makeAccessLogger(schema, getMutationRoot(schema), log)
        expect(tracker.updateBio({ bio: 'what is the meaning of life' })).toBe('Autograph {updateBio}')

        let query = accessLogToGraphQL(log, {
            operationType: 'mutation'
        })
        expect(query).toMatchToken(`
            mutation {
              updateBio___biowhatisthemeaningoflife: updateBio(bio: "what is the meaning of life")
            }
        `)


        let data = await runGraphQL(gqlSchema, query, {
            Mutation: {
                updateBio(parent: any, args: { bio: string }){
                    return args.bio + ' and stuff'
                }
            }
        })
        expect(data).toEqual({"updateBio___biowhatisthemeaningoflife": "what is the meaning of life and stuff"})


        let ret = makeRetriever(data)
        expect(ret.updateBio()).toBeUndefined()
        expect(ret.updateBio({ bio: 'what is the meaning of life' })).toEqual("what is the meaning of life and stuff")
    })



})

// async function main(){
    
// }

// // schema -> tracker -> graphql
// // schema -> typescript

// main()


