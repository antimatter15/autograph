/** Query any Pokémon by number or name */
export type Query = {
    query: Query | null

    pokemons(args: { first: number }): Pokemon[] | null

    pokemon(args: { id?: string, name?: string }): Pokemon | null

}

/** Represents a Pokémon */
export type Pokemon = {
    /** The ID of an object */
    id: string

    /** The identifier of this Pokémon */
    number: string | null

    /** The name of this Pokémon */
    name: string | null

    /** The minimum and maximum weight of this Pokémon */
    weight: PokemonDimension | null

    /** The minimum and maximum weight of this Pokémon */
    height: PokemonDimension | null

    /** The classification of this Pokémon */
    classification: string | null

    /** The type(s) of this Pokémon */
    types: string[] | null

    /** The type(s) of Pokémons that this Pokémon is resistant to */
    resistant: string[] | null

    /** The attacks of this Pokémon */
    attacks: PokemonAttack | null

    /** The type(s) of Pokémons that this Pokémon weak to */
    weaknesses: string[] | null

    fleeRate: number | null

    /** The maximum CP of this Pokémon */
    maxCP: number | null

    /** The evolutions of this Pokémon */
    evolutions: Pokemon[] | null

    /** The evolution requirements of this Pokémon */
    evolutionRequirements: PokemonEvolutionRequirement | null

    /** The maximum HP of this Pokémon */
    maxHP: number | null

    image: string | null

}

/** Represents a Pokémon's dimensions */
export type PokemonDimension = {
    /** The minimum value of this dimension */
    minimum: string | null

    /** The maximum value of this dimension */
    maximum: string | null

}

/** Represents a Pokémon's attack types */
export type PokemonAttack = {
    /** The fast attacks of this Pokémon */
    fast: Attack[] | null

    /** The special attacks of this Pokémon */
    special: Attack[] | null

}

/** Represents a Pokémon's attack types */
export type Attack = {
    /** The name of this Pokémon attack */
    name: string | null

    /** The type of this Pokémon attack */
    type: string | null

    /** The damage of this Pokémon attack */
    damage: number | null

}

/** Represents a Pokémon's requirement to evolve */
export type PokemonEvolutionRequirement = {
    /** The amount of candy to evolve */
    amount: number | null

    /** The name of the candy to evolve */
    name: string | null

}