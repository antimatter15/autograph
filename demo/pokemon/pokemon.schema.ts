type GQLType = {
    /** The name of the object type */
    __typename: string
}

/** Query any Pokémon by number or name */
export type Query = GQLType & {
    query?: Query
    pokemons?(args: { first: Int }): Pokemon[]
    pokemon?(args: { id?: string, name?: string }): Pokemon

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

/** Represents a Pokémon */
export type Pokemon = GQLType & {
    /** The ID of an object */
    id: ID
    /** The identifier of this Pokémon */
    number?: string
    /** The name of this Pokémon */
    name?: string
    /** The minimum and maximum weight of this Pokémon */
    weight?: PokemonDimension
    /** The minimum and maximum weight of this Pokémon */
    height?: PokemonDimension
    /** The classification of this Pokémon */
    classification?: string
    /** The type(s) of this Pokémon */
    types?: string[]
    /** The type(s) of Pokémons that this Pokémon is resistant to */
    resistant?: string[]
    /** The attacks of this Pokémon */
    attacks?: PokemonAttack
    /** The type(s) of Pokémons that this Pokémon weak to */
    weaknesses?: string[]
    fleeRate?: Float
    /** The maximum CP of this Pokémon */
    maxCP?: Int
    /** The evolutions of this Pokémon */
    evolutions?: Pokemon[]
    /** The evolution requirements of this Pokémon */
    evolutionRequirements?: PokemonEvolutionRequirement
    /** The maximum HP of this Pokémon */
    maxHP?: Int
    image?: string
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** Represents a Pokémon's dimensions */
export type PokemonDimension = GQLType & {
    /** The minimum value of this dimension */
    minimum?: string
    /** The maximum value of this dimension */
    maximum?: string
}

/** Represents a Pokémon's attack types */
export type PokemonAttack = GQLType & {
    /** The fast attacks of this Pokémon */
    fast?: Attack[]
    /** The special attacks of this Pokémon */
    special?: Attack[]
}

/** Represents a Pokémon's attack types */
export type Attack = GQLType & {
    /** The name of this Pokémon attack */
    name?: string
    /** The type of this Pokémon attack */
    type?: string
    /** The damage of this Pokémon attack */
    damage?: Int
}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

/** Represents a Pokémon's requirement to evolve */
export type PokemonEvolutionRequirement = GQLType & {
    /** The amount of candy to evolve */
    amount?: Int
    /** The name of the candy to evolve */
    name?: string
}