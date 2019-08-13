export type Query = TodosQuery

export type Mutation = TodosMutations

type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type TodosQuery = GQLType & {
    /** List of todo items */
    items?: string[]

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

export type TodosMutations = GQLType & {
    /** Add a new todo item */
    addItem(args: { item: string }): string | undefined
}
