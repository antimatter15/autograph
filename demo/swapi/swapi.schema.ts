export type Query = Root

type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type Root = GQLType & {
    allFilms(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): FilmsConnection | undefined
    film(args: { id?: ID; filmID?: ID }): Film | undefined
    allPeople(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): PeopleConnection | undefined
    person(args: { id?: ID; personID?: ID }): Person | undefined
    allPlanets(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): PlanetsConnection | undefined
    planet(args: { id?: ID; planetID?: ID }): Planet | undefined
    allSpecies(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): SpeciesConnection | undefined
    species(args: { id?: ID; speciesID?: ID }): Species | undefined
    allStarships(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): StarshipsConnection | undefined
    starship(args: { id?: ID; starshipID?: ID }): Starship | undefined
    allVehicles(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): VehiclesConnection | undefined
    vehicle(args: { id?: ID; vehicleID?: ID }): Vehicle | undefined
    /** Fetches an object given its ID */
    node(args: { id: ID }): Node | undefined

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

/** A connection to a list of items. */
export type FilmsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: FilmsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]
}

/** Information about pagination in a connection. */
export type PageInfo = GQLType & {
    /** When paginating forwards, are there more items? */
    hasNextPage: boolean
    /** When paginating backwards, are there more items? */
    hasPreviousPage: boolean
    /** When paginating backwards, the cursor to continue. */
    startCursor?: string
    /** When paginating forwards, the cursor to continue. */
    endCursor?: string
}

/** An edge in a connection. */
export type FilmsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Film
    /** A cursor for use in pagination */
    cursor: string
}

/** A single film. */
export type Film = GQLType & {
    /** The title of this film. */
    title?: string
    /** The episode number of this film. */
    episodeID?: Int
    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string
    /** The name of the director of this film. */
    director?: string
    /** The name(s) of the producer(s) of this film. */
    producers?: string[]
    /** The ISO 8601 date format of film release at original creator country. */
    releaseDate?: string
    speciesConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): FilmSpeciesConnection | undefined
    starshipConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): FilmStarshipsConnection | undefined
    vehicleConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): FilmVehiclesConnection | undefined
    characterConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): FilmCharactersConnection | undefined
    planetConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): FilmPlanetsConnection | undefined
    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string
    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string
    /** The ID of an object */
    id: ID
}

/** An object with an ID */
export interface Node extends GQLType {
    /** The id of the object. */
    id: ID
    /** Use `asFilm` to access fields on the underlying concrete type. */
    asFilm: Film
    /** Use `asSpecies` to access fields on the underlying concrete type. */
    asSpecies: Species
    /** Use `asPlanet` to access fields on the underlying concrete type. */
    asPlanet: Planet
    /** Use `asPerson` to access fields on the underlying concrete type. */
    asPerson: Person
    /** Use `asStarship` to access fields on the underlying concrete type. */
    asStarship: Starship
    /** Use `asVehicle` to access fields on the underlying concrete type. */
    asVehicle: Vehicle
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** A connection to a list of items. */
export type FilmSpeciesConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: FilmSpeciesEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    species?: Species[]
}

/** An edge in a connection. */
export type FilmSpeciesEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Species
    /** A cursor for use in pagination */
    cursor: string
}

/** A type of person or character within the Star Wars Universe. */
export type Species = GQLType & {
    /** The name of this species. */
    name?: string
    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string
    /** The designation of this species, such as "sentient". */
    designation?: string
    /** The average height of this species in centimeters. */
    averageHeight?: Float
    /** The average lifespan of this species in years, null if unknown. */
    averageLifespan?: Int
    /** Common eye colors for this species, null if this species does not typically
have eyes. */
    eyeColors?: string[]
    /** Common hair colors for this species, null if this species does not typically
have hair. */
    hairColors?: string[]
    /** Common skin colors for this species, null if this species does not typically
have skin. */
    skinColors?: string[]
    /** The language commonly spoken by this species. */
    language?: string
    /** A planet that this species originates from. */
    homeworld?: Planet
    personConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): SpeciesPeopleConnection | undefined
    filmConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): SpeciesFilmsConnection | undefined
    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string
    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string
    /** The ID of an object */
    id: ID
}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

/** A large mass, planet or planetoid in the Star Wars Universe, at the time of
0 ABY. */
export type Planet = GQLType & {
    /** The name of this planet. */
    name?: string
    /** The diameter of this planet in kilometers. */
    diameter?: Int
    /** The number of standard hours it takes for this planet to complete a single
rotation on its axis. */
    rotationPeriod?: Int
    /** The number of standard days it takes for this planet to complete a single orbit
of its local star. */
    orbitalPeriod?: Int
    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard
G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string
    /** The average population of sentient beings inhabiting this planet. */
    population?: Float
    /** The climates of this planet. */
    climates?: string[]
    /** The terrains of this planet. */
    terrains?: string[]
    /** The percentage of the planet surface that is naturally occuring water or bodies
of water. */
    surfaceWater?: Float
    residentConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): PlanetResidentsConnection | undefined
    filmConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): PlanetFilmsConnection | undefined
    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string
    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string
    /** The ID of an object */
    id: ID
}

/** A connection to a list of items. */
export type PlanetResidentsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PlanetResidentsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    residents?: Person[]
}

/** An edge in a connection. */
export type PlanetResidentsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Person
    /** A cursor for use in pagination */
    cursor: string
}

/** An individual person or character within the Star Wars universe. */
export type Person = GQLType & {
    /** The name of this person. */
    name?: string
    /** The birth year of the person, using the in-universe standard of BBY or ABY -
Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is
a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string
    /** The eye color of this person. Will be "unknown" if not known or "n/a" if the
person does not have an eye. */
    eyeColor?: string
    /** The gender of this person. Either "Male", "Female" or "unknown",
"n/a" if the person does not have a gender. */
    gender?: string
    /** The hair color of this person. Will be "unknown" if not known or "n/a" if the
person does not have hair. */
    hairColor?: string
    /** The height of the person in centimeters. */
    height?: Int
    /** The mass of the person in kilograms. */
    mass?: Float
    /** The skin color of this person. */
    skinColor?: string
    /** A planet that this person was born on or inhabits. */
    homeworld?: Planet
    filmConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): PersonFilmsConnection | undefined
    /** The species that this person belongs to, or null if unknown. */
    species?: Species
    starshipConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): PersonStarshipsConnection | undefined
    vehicleConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): PersonVehiclesConnection | undefined
    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string
    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string
    /** The ID of an object */
    id: ID
}

/** A connection to a list of items. */
export type PersonFilmsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PersonFilmsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]
}

/** An edge in a connection. */
export type PersonFilmsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Film
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type PersonStarshipsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PersonStarshipsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    starships?: Starship[]
}

/** An edge in a connection. */
export type PersonStarshipsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Starship
    /** A cursor for use in pagination */
    cursor: string
}

/** A single transport craft that has hyperdrive capability. */
export type Starship = GQLType & {
    /** The name of this starship. The common name, such as "Death Star". */
    name?: string
    /** The model or official name of this starship. Such as "T-65 X-wing" or "DS-1
Orbital Battle Station". */
    model?: string
    /** The class of this starship, such as "Starfighter" or "Deep Space Mobile
Battlestation" */
    starshipClass?: string
    /** The manufacturers of this starship. */
    manufacturers?: string[]
    /** The cost of this starship new, in galactic credits. */
    costInCredits?: Float
    /** The length of this starship in meters. */
    length?: Float
    /** The number of personnel needed to run or pilot this starship. */
    crew?: string
    /** The number of non-essential people this starship can transport. */
    passengers?: string
    /** The maximum speed of this starship in atmosphere. null if this starship is
incapable of atmosphering flight. */
    maxAtmospheringSpeed?: Int
    /** The class of this starships hyperdrive. */
    hyperdriveRating?: Float
    /** The Maximum number of Megalights this starship can travel in a standard hour.
A "Megalight" is a standard unit of distance and has never been defined before
within the Star Wars universe. This figure is only really useful for measuring
the difference in speed of starships. We can assume it is similar to AU, the
distance between our Sun (Sol) and Earth. */
    MGLT?: Int
    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: Float
    /** The maximum length of time that this starship can provide consumables for its
entire crew without having to resupply. */
    consumables?: string
    pilotConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): StarshipPilotsConnection | undefined
    filmConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): StarshipFilmsConnection | undefined
    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string
    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string
    /** The ID of an object */
    id: ID
}

/** A connection to a list of items. */
export type StarshipPilotsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: StarshipPilotsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    pilots?: Person[]
}

/** An edge in a connection. */
export type StarshipPilotsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Person
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type StarshipFilmsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: StarshipFilmsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]
}

/** An edge in a connection. */
export type StarshipFilmsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Film
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type PersonVehiclesConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PersonVehiclesEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    vehicles?: Vehicle[]
}

/** An edge in a connection. */
export type PersonVehiclesEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Vehicle
    /** A cursor for use in pagination */
    cursor: string
}

/** A single transport craft that does not have hyperdrive capability */
export type Vehicle = GQLType & {
    /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder
bike". */
    name?: string
    /** The model or official name of this vehicle. Such as "All-Terrain Attack
Transport". */
    model?: string
    /** The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
    vehicleClass?: string
    /** The manufacturers of this vehicle. */
    manufacturers?: string[]
    /** The cost of this vehicle new, in Galactic Credits. */
    costInCredits?: Float
    /** The length of this vehicle in meters. */
    length?: Float
    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: string
    /** The number of non-essential people this vehicle can transport. */
    passengers?: string
    /** The maximum speed of this vehicle in atmosphere. */
    maxAtmospheringSpeed?: Int
    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: Float
    /** The maximum length of time that this vehicle can provide consumables for its
entire crew without having to resupply. */
    consumables?: string
    pilotConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): VehiclePilotsConnection | undefined
    filmConnection(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): VehicleFilmsConnection | undefined
    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string
    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string
    /** The ID of an object */
    id: ID
}

/** A connection to a list of items. */
export type VehiclePilotsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: VehiclePilotsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    pilots?: Person[]
}

/** An edge in a connection. */
export type VehiclePilotsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Person
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type VehicleFilmsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: VehicleFilmsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]
}

/** An edge in a connection. */
export type VehicleFilmsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Film
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type PlanetFilmsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PlanetFilmsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]
}

/** An edge in a connection. */
export type PlanetFilmsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Film
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type SpeciesPeopleConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: SpeciesPeopleEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    people?: Person[]
}

/** An edge in a connection. */
export type SpeciesPeopleEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Person
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type SpeciesFilmsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: SpeciesFilmsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]
}

/** An edge in a connection. */
export type SpeciesFilmsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Film
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type FilmStarshipsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: FilmStarshipsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    starships?: Starship[]
}

/** An edge in a connection. */
export type FilmStarshipsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Starship
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type FilmVehiclesConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: FilmVehiclesEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    vehicles?: Vehicle[]
}

/** An edge in a connection. */
export type FilmVehiclesEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Vehicle
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type FilmCharactersConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: FilmCharactersEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    characters?: Person[]
}

/** An edge in a connection. */
export type FilmCharactersEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Person
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type FilmPlanetsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: FilmPlanetsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    planets?: Planet[]
}

/** An edge in a connection. */
export type FilmPlanetsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Planet
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type PeopleConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PeopleEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    people?: Person[]
}

/** An edge in a connection. */
export type PeopleEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Person
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type PlanetsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PlanetsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    planets?: Planet[]
}

/** An edge in a connection. */
export type PlanetsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Planet
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type SpeciesConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: SpeciesEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    species?: Species[]
}

/** An edge in a connection. */
export type SpeciesEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Species
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type StarshipsConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: StarshipsEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    starships?: Starship[]
}

/** An edge in a connection. */
export type StarshipsEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Starship
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type VehiclesConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: VehiclesEdge[]
    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: Int
    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    vehicles?: Vehicle[]
}

/** An edge in a connection. */
export type VehiclesEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Vehicle
    /** A cursor for use in pagination */
    cursor: string
}
