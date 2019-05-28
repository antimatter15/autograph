export const url = "https://spotify-graphql-server.herokuapp.com/graphql"

type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    hi?(args: { message?: string }): string
    queryArtists?(args: { byName?: string }): Artist[]
}

export type Artist = GQLType & {
    name: string
    id?: ID
    image?: string
    albums?(args: { limit?: Int }): Album[]
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

export type Album = GQLType & {
    name?: string
    id?: ID
    image?: string
    tracks?: Track[]
}

export type Track = GQLType & {
    name: string
    artists?: Artist[]
    preview_url?: string
    id?: ID
}