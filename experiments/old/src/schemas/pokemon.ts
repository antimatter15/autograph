export const url = "https://graphql-pokemon.now.sh/graphql"

/** Query any Pokémon by number or name */
export type GQLQuery = {
    query?: GQLQuery

    pokemons(args: { first: number }): Pokemon[] | null

    pokemon(args: { id?: string, name?: string }): Pokemon | null

}

/** Represents a Pokémon */
export type Pokemon = {
    /** The ID of an object */
    id: string

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

    fleeRate?: number

    /** The maximum CP of this Pokémon */
    maxCP?: number

    /** The evolutions of this Pokémon */
    evolutions?: Pokemon[]

    /** The evolution requirements of this Pokémon */
    evolutionRequirements?: PokemonEvolutionRequirement

    /** The maximum HP of this Pokémon */
    maxHP?: number

    image?: string

}

/** Represents a Pokémon's dimensions */
export type PokemonDimension = {
    /** The minimum value of this dimension */
    minimum?: string

    /** The maximum value of this dimension */
    maximum?: string

}

/** Represents a Pokémon's attack types */
export type PokemonAttack = {
    /** The fast attacks of this Pokémon */
    fast?: Attack[]

    /** The special attacks of this Pokémon */
    special?: Attack[]

}

/** Represents a Pokémon's attack types */
export type Attack = {
    /** The name of this Pokémon attack */
    name?: string

    /** The type of this Pokémon attack */
    type?: string

    /** The damage of this Pokémon attack */
    damage?: number

}

/** Represents a Pokémon's requirement to evolve */
export type PokemonEvolutionRequirement = {
    /** The amount of candy to evolve */
    amount?: number

    /** The name of the candy to evolve */
    name?: string

}