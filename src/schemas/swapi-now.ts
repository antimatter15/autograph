export const url = "https://swapi-graphql-dvnngqcxrs.now.sh/"

export type Root = {
    allFilms(args: { after?: string, first?: number, before?: string, last?: number }): FilmsConnection | null

    film(args: { id?: string, filmID?: string }): Film | null

    allPeople(args: { after?: string, first?: number, before?: string, last?: number }): PeopleConnection | null

    person(args: { id?: string, personID?: string }): Person | null

    allPlanets(args: { after?: string, first?: number, before?: string, last?: number }): PlanetsConnection | null

    planet(args: { id?: string, planetID?: string }): Planet | null

    allSpecies(args: { after?: string, first?: number, before?: string, last?: number }): SpeciesConnection | null

    species(args: { id?: string, speciesID?: string }): Species | null

    allStarships(args: { after?: string, first?: number, before?: string, last?: number }): StarshipsConnection | null

    starship(args: { id?: string, starshipID?: string }): Starship | null

    allVehicles(args: { after?: string, first?: number, before?: string, last?: number }): VehiclesConnection | null

    vehicle(args: { id?: string, vehicleID?: string }): Vehicle | null

    /** Fetches an object given its ID */
    node(args: { id: string }): Node | null

}

/** A connection to a list of items. */
export type FilmsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: FilmsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]

}

/** Information about pagination in a connection. */
export type PageInfo = {
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
export type FilmsEdge = {
    /** The item at the end of the edge */
    node?: Film

    /** A cursor for use in pagination */
    cursor: string

}

/** A single film. */
export type Film = {
    /** The title of this film. */
    title?: string

    /** The episode number of this film. */
    episodeID?: number

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The name of the director of this film. */
    director?: string

    /** The name(s) of the producer(s) of this film. */
    producers?: string[]

    /** The ISO 8601 date format of film release at original creator country. */
    releaseDate?: string

    speciesConnection(args: { after?: string, first?: number, before?: string, last?: number }): FilmSpeciesConnection | null

    starshipConnection(args: { after?: string, first?: number, before?: string, last?: number }): FilmStarshipsConnection | null

    vehicleConnection(args: { after?: string, first?: number, before?: string, last?: number }): FilmVehiclesConnection | null

    characterConnection(args: { after?: string, first?: number, before?: string, last?: number }): FilmCharactersConnection | null

    planetConnection(args: { after?: string, first?: number, before?: string, last?: number }): FilmPlanetsConnection | null

    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string

    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string

    /** The ID of an object */
    id: string

}

/** An object with an ID */
export type Node = {
    /** The id of the object. */
    id: string

}

/** A connection to a list of items. */
export type FilmSpeciesConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: FilmSpeciesEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    species?: Species[]

}

/** An edge in a connection. */
export type FilmSpeciesEdge = {
    /** The item at the end of the edge */
    node?: Species

    /** A cursor for use in pagination */
    cursor: string

}

/** A type of person or character within the Star Wars Universe. */
export type Species = {
    /** The name of this species. */
    name?: string

    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string

    /** The designation of this species, such as "sentient". */
    designation?: string

    /** The average height of this species in centimeters. */
    averageHeight?: number

    /** The average lifespan of this species in years, null if unknown. */
    averageLifespan?: number

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

    personConnection(args: { after?: string, first?: number, before?: string, last?: number }): SpeciesPeopleConnection | null

    filmConnection(args: { after?: string, first?: number, before?: string, last?: number }): SpeciesFilmsConnection | null

    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string

    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string

    /** The ID of an object */
    id: string

}

/** A large mass, planet or planetoid in the Star Wars Universe, at the time of
0 ABY. */
export type Planet = {
    /** The name of this planet. */
    name?: string

    /** The diameter of this planet in kilometers. */
    diameter?: number

    /** The number of standard hours it takes for this planet to complete a single
rotation on its axis. */
    rotationPeriod?: number

    /** The number of standard days it takes for this planet to complete a single orbit
of its local star. */
    orbitalPeriod?: number

    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard
G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string

    /** The average population of sentient beings inhabiting this planet. */
    population?: number

    /** The climates of this planet. */
    climates?: string[]

    /** The terrains of this planet. */
    terrains?: string[]

    /** The percentage of the planet surface that is naturally occuring water or bodies
of water. */
    surfaceWater?: number

    residentConnection(args: { after?: string, first?: number, before?: string, last?: number }): PlanetResidentsConnection | null

    filmConnection(args: { after?: string, first?: number, before?: string, last?: number }): PlanetFilmsConnection | null

    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string

    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string

    /** The ID of an object */
    id: string

}

/** A connection to a list of items. */
export type PlanetResidentsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: PlanetResidentsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    residents?: Person[]

}

/** An edge in a connection. */
export type PlanetResidentsEdge = {
    /** The item at the end of the edge */
    node?: Person

    /** A cursor for use in pagination */
    cursor: string

}

/** An individual person or character within the Star Wars universe. */
export type Person = {
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
    height?: number

    /** The mass of the person in kilograms. */
    mass?: number

    /** The skin color of this person. */
    skinColor?: string

    /** A planet that this person was born on or inhabits. */
    homeworld?: Planet

    filmConnection(args: { after?: string, first?: number, before?: string, last?: number }): PersonFilmsConnection | null

    /** The species that this person belongs to, or null if unknown. */
    species?: Species

    starshipConnection(args: { after?: string, first?: number, before?: string, last?: number }): PersonStarshipsConnection | null

    vehicleConnection(args: { after?: string, first?: number, before?: string, last?: number }): PersonVehiclesConnection | null

    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string

    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string

    /** The ID of an object */
    id: string

}

/** A connection to a list of items. */
export type PersonFilmsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: PersonFilmsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]

}

/** An edge in a connection. */
export type PersonFilmsEdge = {
    /** The item at the end of the edge */
    node?: Film

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type PersonStarshipsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: PersonStarshipsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    starships?: Starship[]

}

/** An edge in a connection. */
export type PersonStarshipsEdge = {
    /** The item at the end of the edge */
    node?: Starship

    /** A cursor for use in pagination */
    cursor: string

}

/** A single transport craft that has hyperdrive capability. */
export type Starship = {
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
    costInCredits?: number

    /** The length of this starship in meters. */
    length?: number

    /** The number of personnel needed to run or pilot this starship. */
    crew?: string

    /** The number of non-essential people this starship can transport. */
    passengers?: string

    /** The maximum speed of this starship in atmosphere. null if this starship is
incapable of atmosphering flight. */
    maxAtmospheringSpeed?: number

    /** The class of this starships hyperdrive. */
    hyperdriveRating?: number

    /** The Maximum number of Megalights this starship can travel in a standard hour.
A "Megalight" is a standard unit of distance and has never been defined before
within the Star Wars universe. This figure is only really useful for measuring
the difference in speed of starships. We can assume it is similar to AU, the
distance between our Sun (Sol) and Earth. */
    MGLT?: number

    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: number

    /** The maximum length of time that this starship can provide consumables for its
entire crew without having to resupply. */
    consumables?: string

    pilotConnection(args: { after?: string, first?: number, before?: string, last?: number }): StarshipPilotsConnection | null

    filmConnection(args: { after?: string, first?: number, before?: string, last?: number }): StarshipFilmsConnection | null

    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string

    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string

    /** The ID of an object */
    id: string

}

/** A connection to a list of items. */
export type StarshipPilotsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: StarshipPilotsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    pilots?: Person[]

}

/** An edge in a connection. */
export type StarshipPilotsEdge = {
    /** The item at the end of the edge */
    node?: Person

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type StarshipFilmsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: StarshipFilmsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]

}

/** An edge in a connection. */
export type StarshipFilmsEdge = {
    /** The item at the end of the edge */
    node?: Film

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type PersonVehiclesConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: PersonVehiclesEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    vehicles?: Vehicle[]

}

/** An edge in a connection. */
export type PersonVehiclesEdge = {
    /** The item at the end of the edge */
    node?: Vehicle

    /** A cursor for use in pagination */
    cursor: string

}

/** A single transport craft that does not have hyperdrive capability */
export type Vehicle = {
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
    costInCredits?: number

    /** The length of this vehicle in meters. */
    length?: number

    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: string

    /** The number of non-essential people this vehicle can transport. */
    passengers?: string

    /** The maximum speed of this vehicle in atmosphere. */
    maxAtmospheringSpeed?: number

    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: number

    /** The maximum length of time that this vehicle can provide consumables for its
entire crew without having to resupply. */
    consumables?: string

    pilotConnection(args: { after?: string, first?: number, before?: string, last?: number }): VehiclePilotsConnection | null

    filmConnection(args: { after?: string, first?: number, before?: string, last?: number }): VehicleFilmsConnection | null

    /** The ISO 8601 date format of the time that this resource was created. */
    created?: string

    /** The ISO 8601 date format of the time that this resource was edited. */
    edited?: string

    /** The ID of an object */
    id: string

}

/** A connection to a list of items. */
export type VehiclePilotsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: VehiclePilotsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    pilots?: Person[]

}

/** An edge in a connection. */
export type VehiclePilotsEdge = {
    /** The item at the end of the edge */
    node?: Person

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type VehicleFilmsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: VehicleFilmsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]

}

/** An edge in a connection. */
export type VehicleFilmsEdge = {
    /** The item at the end of the edge */
    node?: Film

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type PlanetFilmsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: PlanetFilmsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]

}

/** An edge in a connection. */
export type PlanetFilmsEdge = {
    /** The item at the end of the edge */
    node?: Film

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type SpeciesPeopleConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: SpeciesPeopleEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    people?: Person[]

}

/** An edge in a connection. */
export type SpeciesPeopleEdge = {
    /** The item at the end of the edge */
    node?: Person

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type SpeciesFilmsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: SpeciesFilmsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    films?: Film[]

}

/** An edge in a connection. */
export type SpeciesFilmsEdge = {
    /** The item at the end of the edge */
    node?: Film

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type FilmStarshipsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: FilmStarshipsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    starships?: Starship[]

}

/** An edge in a connection. */
export type FilmStarshipsEdge = {
    /** The item at the end of the edge */
    node?: Starship

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type FilmVehiclesConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: FilmVehiclesEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    vehicles?: Vehicle[]

}

/** An edge in a connection. */
export type FilmVehiclesEdge = {
    /** The item at the end of the edge */
    node?: Vehicle

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type FilmCharactersConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: FilmCharactersEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    characters?: Person[]

}

/** An edge in a connection. */
export type FilmCharactersEdge = {
    /** The item at the end of the edge */
    node?: Person

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type FilmPlanetsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: FilmPlanetsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    planets?: Planet[]

}

/** An edge in a connection. */
export type FilmPlanetsEdge = {
    /** The item at the end of the edge */
    node?: Planet

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type PeopleConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: PeopleEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    people?: Person[]

}

/** An edge in a connection. */
export type PeopleEdge = {
    /** The item at the end of the edge */
    node?: Person

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type PlanetsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: PlanetsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    planets?: Planet[]

}

/** An edge in a connection. */
export type PlanetsEdge = {
    /** The item at the end of the edge */
    node?: Planet

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type SpeciesConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: SpeciesEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    species?: Species[]

}

/** An edge in a connection. */
export type SpeciesEdge = {
    /** The item at the end of the edge */
    node?: Species

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type StarshipsConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: StarshipsEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    starships?: Starship[]

}

/** An edge in a connection. */
export type StarshipsEdge = {
    /** The item at the end of the edge */
    node?: Starship

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type VehiclesConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** A list of edges. */
    edges?: VehiclesEdge[]

    /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
    totalCount?: number

    /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
    vehicles?: Vehicle[]

}

/** An edge in a connection. */
export type VehiclesEdge = {
    /** The item at the end of the edge */
    node?: Vehicle

    /** A cursor for use in pagination */
    cursor: string

}

