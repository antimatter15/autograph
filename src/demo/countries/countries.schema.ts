type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    continents?: Continent[]
    continent(args: { code?: string }): Continent | undefined
    countries?: Country[]
    country(args: { code?: string }): Country | undefined
    languages?: Language[]
    language(args: { code?: string }): Language | undefined

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

export type Continent = GQLType & {
    code?: string
    name?: string
    countries?: Country[]
}

export type Country = GQLType & {
    code?: string
    name?: string
    native?: string
    phone?: string
    continent?: Continent
    currency?: string
    languages?: Language[]
    emoji?: string
    emojiU?: string
}

export type Language = GQLType & {
    code?: string
    name?: string
    native?: string
    rtl?: Int
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

export type CacheControlScope = "PUBLIC" | "PRIVATE"

/** The `Upload` scalar type represents a file upload. */
export type Upload = any