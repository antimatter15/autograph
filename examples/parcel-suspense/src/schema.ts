type GQLType = {
    /** This field is defined when Autograph is executing a dry run */
    __dryRun?: boolean
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    rates?(args: { currency: string }): ExchangeRate[]

    /** Check this to determine whether the query is loading */
    __loading?: boolean
    /** Check this to display error messages */
    __error?: any
}

export type ExchangeRate = GQLType & {
    currency?: string
    rate?: string
    name?: string
}
