export const url = "https://spotify-graphql-server.herokuapp.com/graphql"

export type Query = {
    hi(args: { message?: string }): string | null

    queryArtists(args: { byName?: string }): Artist[] | null

}

export type Artist = {
    name: string

    id?: string

    image?: string

    albums(args: { limit?: number }): Album[] | null

}

export type Album = {
    name?: string

    id?: string

    image?: string

    tracks?: Track[]

}

export type Track = {
    name: string

    artists?: Artist[]

    preview_url?: string

    id?: string

}