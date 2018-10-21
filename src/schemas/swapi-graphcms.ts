export const url = "https://api.graphcms.com/simple/v1/swapi"

export type AddToFilmPlanetsPayload = {
    filmsFilm?: Film

    planetsPlanet?: Planet

}

export type AddToFilmSpeciesPayload = {
    filmsFilm?: Film

    speciesSpecies?: Species

}

export type AddToFilmStarshipsPayload = {
    filmsFilm?: Film

    starshipsStarship?: Starship

}

export type AddToFilmVehiclesPayload = {
    filmsFilm?: Film

    vehiclesVehicle?: Vehicle

}

export type AddToPeopleFilmPayload = {
    charactersPerson?: Person

    filmsFilm?: Film

}

export type AddToPeoplePlanetPayload = {
    residentsPerson?: Person

    homeworldPlanet?: Planet

}

export type AddToPeopleSpeciesPayload = {
    peoplePerson?: Person

    speciesSpecies?: Species

}

export type AddToPeopleStarshipsPayload = {
    pilotsPerson?: Person

    starshipsStarship?: Starship

}

export type AddToPeopleVehiclesPayload = {
    pilotsPerson?: Person

    vehiclesVehicle?: Vehicle

}

export type AssetPreviousValues = {
    createdAt: DateTime

    /** Original File Name */
    fileName: string

    /** The File Handle */
    handle: string

    /** The height of the file in case it is an image */
    height?: number

    id: string

    /** The Mime Type */
    mimeType?: string

    /** The Size Of The File */
    size: number

    updatedAt: DateTime

    /** The Url Of The Asset */
    url: string

    /** The width of the file in case it is an image */
    width?: number

}

export type AssetSubscriptionFilter = {
    /** Logical AND on all given filters. */
    AND?: AssetSubscriptionFilter[]

    /** Logical OR on all given filters. */
    OR?: AssetSubscriptionFilter[]

    /** The subscription event gets dispatched when it's listed in mutation_in */
    mutation_in?: _ModelMutationType[]

    /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
    updatedFields_contains?: string

    /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
    updatedFields_contains_every?: string[]

    /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
    updatedFields_contains_some?: string[]

    node?: AssetSubscriptionFilterNode

}

export type AssetSubscriptionFilterNode = {
    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    fileName?: string

    /** All values that are not equal to given value. */
    fileName_not?: string

    /** All values that are contained in given list. */
    fileName_in?: string[]

    /** All values that are not contained in given list. */
    fileName_not_in?: string[]

    /** All values less than the given value. */
    fileName_lt?: string

    /** All values less than or equal the given value. */
    fileName_lte?: string

    /** All values greater than the given value. */
    fileName_gt?: string

    /** All values greater than or equal the given value. */
    fileName_gte?: string

    /** All values containing the given string. */
    fileName_contains?: string

    /** All values not containing the given string. */
    fileName_not_contains?: string

    /** All values starting with the given string. */
    fileName_starts_with?: string

    /** All values not starting with the given string. */
    fileName_not_starts_with?: string

    /** All values ending with the given string. */
    fileName_ends_with?: string

    /** All values not ending with the given string. */
    fileName_not_ends_with?: string

    handle?: string

    /** All values that are not equal to given value. */
    handle_not?: string

    /** All values that are contained in given list. */
    handle_in?: string[]

    /** All values that are not contained in given list. */
    handle_not_in?: string[]

    /** All values less than the given value. */
    handle_lt?: string

    /** All values less than or equal the given value. */
    handle_lte?: string

    /** All values greater than the given value. */
    handle_gt?: string

    /** All values greater than or equal the given value. */
    handle_gte?: string

    /** All values containing the given string. */
    handle_contains?: string

    /** All values not containing the given string. */
    handle_not_contains?: string

    /** All values starting with the given string. */
    handle_starts_with?: string

    /** All values not starting with the given string. */
    handle_not_starts_with?: string

    /** All values ending with the given string. */
    handle_ends_with?: string

    /** All values not ending with the given string. */
    handle_not_ends_with?: string

    height?: number

    /** All values that are not equal to given value. */
    height_not?: number

    /** All values that are contained in given list. */
    height_in?: number[]

    /** All values that are not contained in given list. */
    height_not_in?: number[]

    /** All values less than the given value. */
    height_lt?: number

    /** All values less than or equal the given value. */
    height_lte?: number

    /** All values greater than the given value. */
    height_gt?: number

    /** All values greater than or equal the given value. */
    height_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    mimeType?: string

    /** All values that are not equal to given value. */
    mimeType_not?: string

    /** All values that are contained in given list. */
    mimeType_in?: string[]

    /** All values that are not contained in given list. */
    mimeType_not_in?: string[]

    /** All values less than the given value. */
    mimeType_lt?: string

    /** All values less than or equal the given value. */
    mimeType_lte?: string

    /** All values greater than the given value. */
    mimeType_gt?: string

    /** All values greater than or equal the given value. */
    mimeType_gte?: string

    /** All values containing the given string. */
    mimeType_contains?: string

    /** All values not containing the given string. */
    mimeType_not_contains?: string

    /** All values starting with the given string. */
    mimeType_starts_with?: string

    /** All values not starting with the given string. */
    mimeType_not_starts_with?: string

    /** All values ending with the given string. */
    mimeType_ends_with?: string

    /** All values not ending with the given string. */
    mimeType_not_ends_with?: string

    size?: number

    /** All values that are not equal to given value. */
    size_not?: number

    /** All values that are contained in given list. */
    size_in?: number[]

    /** All values that are not contained in given list. */
    size_not_in?: number[]

    /** All values less than the given value. */
    size_lt?: number

    /** All values less than or equal the given value. */
    size_lte?: number

    /** All values greater than the given value. */
    size_gt?: number

    /** All values greater than or equal the given value. */
    size_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    url?: string

    /** All values that are not equal to given value. */
    url_not?: string

    /** All values that are contained in given list. */
    url_in?: string[]

    /** All values that are not contained in given list. */
    url_not_in?: string[]

    /** All values less than the given value. */
    url_lt?: string

    /** All values less than or equal the given value. */
    url_lte?: string

    /** All values greater than the given value. */
    url_gt?: string

    /** All values greater than or equal the given value. */
    url_gte?: string

    /** All values containing the given string. */
    url_contains?: string

    /** All values not containing the given string. */
    url_not_contains?: string

    /** All values starting with the given string. */
    url_starts_with?: string

    /** All values not starting with the given string. */
    url_not_starts_with?: string

    /** All values ending with the given string. */
    url_ends_with?: string

    /** All values not ending with the given string. */
    url_not_ends_with?: string

    width?: number

    /** All values that are not equal to given value. */
    width_not?: number

    /** All values that are contained in given list. */
    width_in?: number[]

    /** All values that are not contained in given list. */
    width_not_in?: number[]

    /** All values less than the given value. */
    width_lt?: number

    /** All values less than or equal the given value. */
    width_lte?: number

    /** All values greater than the given value. */
    width_gt?: number

    /** All values greater than or equal the given value. */
    width_gte?: number

}

export type AssetSubscriptionPayload = {
    mutation: _ModelMutationType

    node?: Asset

    updatedFields?: string[]

    previousValues?: AssetPreviousValues

}

export type CreateAsset = {
    /** Original File Name */
    fileName: string

    /** The File Handle */
    handle: string

    /** The height of the file in case it is an image */
    height?: number

    /** The Mime Type */
    mimeType?: string

    /** The Size Of The File */
    size: number

    /** The Url Of The Asset */
    url: string

    /** The width of the file in case it is an image */
    width?: number

}

export type CreateFilm = {
    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title: string

    charactersIds?: string[]

    characters?: FilmcharactersPerson[]

    planetsIds?: string[]

    planets?: FilmplanetsPlanet[]

    speciesIds?: string[]

    species?: FilmspeciesSpecies[]

    starshipsIds?: string[]

    starships?: FilmstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: FilmvehiclesVehicle[]

}

export type CreatePerson = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    homeworldId?: string

    homeworld?: PersonhomeworldPlanet

    filmsIds?: string[]

    films?: PersonfilmsFilm[]

    speciesIds?: string[]

    species?: PersonspeciesSpecies[]

    starshipsIds?: string[]

    starships?: PersonstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: PersonvehiclesVehicle[]

}

export type CreatePlanet = {
    /** The climate of this planet. */
    climate?: string[]

    /** The diameter of this planet in kilometers. */
    diameter?: number

    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The name of the planet */
    name: string

    /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
    orbitalPeriod?: number

    /** The average population of sentient beings inhabiting this planet. */
    population?: number

    /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
    rotationPeriod?: number

    /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
    surfaceWater?: number

    /** The terrain of this planet. */
    terrain?: string[]

    filmsIds?: string[]

    films?: PlanetfilmsFilm[]

    residentsIds?: string[]

    residents?: PlanetresidentsPerson[]

}

export type CreateSpecies = {
    /** The average height of this species in centimeters. */
    averageHeight?: number

    /** The average lifespan of this species in years. */
    averageLifespan?: number

    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string

    /** The designation of this species, such as "sentient". */
    designation?: string

    /** The eye colors for this species, "UNKNOWN" if not known, null if this species does not typically have eyes. */
    eyeColor?: SPECIES_EYE_COLOR[]

    /** The hair colors for this species, "UNKNOWN" if not known, null if this species does not typically have hairs. */
    hairColor?: SPECIES_HAIR_COLOR[]

    /** indicates if the record is published */
    isPublished?: boolean

    /** The language commonly spoken by this species. */
    language?: string

    /** The name of this species. */
    name: string

    /** The skin colors for this species, "UNKNOWN" if not known, null if this species does not typically have a skin. */
    skinColor?: SPECIES_SKIN_COLOR[]

    filmsIds?: string[]

    films?: SpeciesfilmsFilm[]

    peopleIds?: string[]

    people?: SpeciespeoplePerson[]

}

export type CreateStarship = {
    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: number

    /** The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation" */
    class?: string

    /** The maximum length of time that this starship can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /**  The cost of this starship new, in galactic credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this starship. */
    crew?: number

    /** The class of this starships hyperdrive. */
    hyperdriveRating?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The length of this starship in meters. */
    length?: number

    /** The manufacturer of this starship. */
    manufacturer?: string[]

    /**  The maximum speed of this starship in the atmosphere. null if this starship is incapable of atmospheric flight. */
    maxAtmospheringSpeed?: number

    /** The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. */
    mglt?: number

    /** The name of this starship. The common name, such as "Death Star". */
    name: string

    /**  The number of non-essential people this starship can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: StarshipfilmsFilm[]

    pilotsIds?: string[]

    pilots?: StarshippilotsPerson[]

}

export type CreateVehicle = {
    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: number

    /**  The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
    class?: string

    /** The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /** The cost of this vehicle new, in Galactic Credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /**  The length of this vehicle in meters. */
    length?: number

    /** The manufacturer of this vehicle. */
    manufacturer?: string[]

    /** The maximum speed of this vehicle in the atmosphere. */
    maxAtmospheringSpeed?: number

    /** The model or official name of this vehicle. Such as "All-Terrain Attack Transport". */
    model?: string

    /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike". */
    name: string

    /** The number of non-essential people this vehicle can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: VehiclefilmsFilm[]

    pilotsIds?: string[]

    pilots?: VehiclepilotsPerson[]

}

export type FilmPreviousValues = {
    createdAt: DateTime

    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title: string

    updatedAt: DateTime

}

export type FilmSubscriptionFilter = {
    /** Logical AND on all given filters. */
    AND?: FilmSubscriptionFilter[]

    /** Logical OR on all given filters. */
    OR?: FilmSubscriptionFilter[]

    /** The subscription event gets dispatched when it's listed in mutation_in */
    mutation_in?: _ModelMutationType[]

    /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
    updatedFields_contains?: string

    /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
    updatedFields_contains_every?: string[]

    /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
    updatedFields_contains_some?: string[]

    node?: FilmSubscriptionFilterNode

}

export type FilmSubscriptionFilterNode = {
    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    director?: string

    /** All values that are not equal to given value. */
    director_not?: string

    /** All values that are contained in given list. */
    director_in?: string[]

    /** All values that are not contained in given list. */
    director_not_in?: string[]

    /** All values less than the given value. */
    director_lt?: string

    /** All values less than or equal the given value. */
    director_lte?: string

    /** All values greater than the given value. */
    director_gt?: string

    /** All values greater than or equal the given value. */
    director_gte?: string

    /** All values containing the given string. */
    director_contains?: string

    /** All values not containing the given string. */
    director_not_contains?: string

    /** All values starting with the given string. */
    director_starts_with?: string

    /** All values not starting with the given string. */
    director_not_starts_with?: string

    /** All values ending with the given string. */
    director_ends_with?: string

    /** All values not ending with the given string. */
    director_not_ends_with?: string

    episodeId?: number

    /** All values that are not equal to given value. */
    episodeId_not?: number

    /** All values that are contained in given list. */
    episodeId_in?: number[]

    /** All values that are not contained in given list. */
    episodeId_not_in?: number[]

    /** All values less than the given value. */
    episodeId_lt?: number

    /** All values less than or equal the given value. */
    episodeId_lte?: number

    /** All values greater than the given value. */
    episodeId_gt?: number

    /** All values greater than or equal the given value. */
    episodeId_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    openingCrawl?: string

    /** All values that are not equal to given value. */
    openingCrawl_not?: string

    /** All values that are contained in given list. */
    openingCrawl_in?: string[]

    /** All values that are not contained in given list. */
    openingCrawl_not_in?: string[]

    /** All values less than the given value. */
    openingCrawl_lt?: string

    /** All values less than or equal the given value. */
    openingCrawl_lte?: string

    /** All values greater than the given value. */
    openingCrawl_gt?: string

    /** All values greater than or equal the given value. */
    openingCrawl_gte?: string

    /** All values containing the given string. */
    openingCrawl_contains?: string

    /** All values not containing the given string. */
    openingCrawl_not_contains?: string

    /** All values starting with the given string. */
    openingCrawl_starts_with?: string

    /** All values not starting with the given string. */
    openingCrawl_not_starts_with?: string

    /** All values ending with the given string. */
    openingCrawl_ends_with?: string

    /** All values not ending with the given string. */
    openingCrawl_not_ends_with?: string

    releaseDate?: DateTime

    /** All values that are not equal to given value. */
    releaseDate_not?: DateTime

    /** All values that are contained in given list. */
    releaseDate_in?: DateTime[]

    /** All values that are not contained in given list. */
    releaseDate_not_in?: DateTime[]

    /** All values less than the given value. */
    releaseDate_lt?: DateTime

    /** All values less than or equal the given value. */
    releaseDate_lte?: DateTime

    /** All values greater than the given value. */
    releaseDate_gt?: DateTime

    /** All values greater than or equal the given value. */
    releaseDate_gte?: DateTime

    title?: string

    /** All values that are not equal to given value. */
    title_not?: string

    /** All values that are contained in given list. */
    title_in?: string[]

    /** All values that are not contained in given list. */
    title_not_in?: string[]

    /** All values less than the given value. */
    title_lt?: string

    /** All values less than or equal the given value. */
    title_lte?: string

    /** All values greater than the given value. */
    title_gt?: string

    /** All values greater than or equal the given value. */
    title_gte?: string

    /** All values containing the given string. */
    title_contains?: string

    /** All values not containing the given string. */
    title_not_contains?: string

    /** All values starting with the given string. */
    title_starts_with?: string

    /** All values not starting with the given string. */
    title_not_starts_with?: string

    /** All values ending with the given string. */
    title_ends_with?: string

    /** All values not ending with the given string. */
    title_not_ends_with?: string

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    characters_every?: PersonFilter

    characters_some?: PersonFilter

    characters_none?: PersonFilter

    planets_every?: PlanetFilter

    planets_some?: PlanetFilter

    planets_none?: PlanetFilter

    species_every?: SpeciesFilter

    species_some?: SpeciesFilter

    species_none?: SpeciesFilter

    starships_every?: StarshipFilter

    starships_some?: StarshipFilter

    starships_none?: StarshipFilter

    vehicles_every?: VehicleFilter

    vehicles_some?: VehicleFilter

    vehicles_none?: VehicleFilter

}

export type FilmSubscriptionPayload = {
    mutation: _ModelMutationType

    node?: Film

    updatedFields?: string[]

    previousValues?: FilmPreviousValues

}

export type FilmcharactersPerson = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    homeworldId?: string

    homeworld?: PersonhomeworldPlanet

    filmsIds?: string[]

    films?: PersonfilmsFilm[]

    speciesIds?: string[]

    species?: PersonspeciesSpecies[]

    starshipsIds?: string[]

    starships?: PersonstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: PersonvehiclesVehicle[]

}

export type FilmplanetsPlanet = {
    /** The climate of this planet. */
    climate?: string[]

    /** The diameter of this planet in kilometers. */
    diameter?: number

    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The name of the planet */
    name: string

    /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
    orbitalPeriod?: number

    /** The average population of sentient beings inhabiting this planet. */
    population?: number

    /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
    rotationPeriod?: number

    /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
    surfaceWater?: number

    /** The terrain of this planet. */
    terrain?: string[]

    filmsIds?: string[]

    films?: PlanetfilmsFilm[]

    residentsIds?: string[]

    residents?: PlanetresidentsPerson[]

}

export type FilmspeciesSpecies = {
    /** The average height of this species in centimeters. */
    averageHeight?: number

    /** The average lifespan of this species in years. */
    averageLifespan?: number

    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string

    /** The designation of this species, such as "sentient". */
    designation?: string

    /** The eye colors for this species, "UNKNOWN" if not known, null if this species does not typically have eyes. */
    eyeColor?: SPECIES_EYE_COLOR[]

    /** The hair colors for this species, "UNKNOWN" if not known, null if this species does not typically have hairs. */
    hairColor?: SPECIES_HAIR_COLOR[]

    /** indicates if the record is published */
    isPublished?: boolean

    /** The language commonly spoken by this species. */
    language?: string

    /** The name of this species. */
    name: string

    /** The skin colors for this species, "UNKNOWN" if not known, null if this species does not typically have a skin. */
    skinColor?: SPECIES_SKIN_COLOR[]

    filmsIds?: string[]

    films?: SpeciesfilmsFilm[]

    peopleIds?: string[]

    people?: SpeciespeoplePerson[]

}

export type FilmstarshipsStarship = {
    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: number

    /** The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation" */
    class?: string

    /** The maximum length of time that this starship can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /**  The cost of this starship new, in galactic credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this starship. */
    crew?: number

    /** The class of this starships hyperdrive. */
    hyperdriveRating?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The length of this starship in meters. */
    length?: number

    /** The manufacturer of this starship. */
    manufacturer?: string[]

    /**  The maximum speed of this starship in the atmosphere. null if this starship is incapable of atmospheric flight. */
    maxAtmospheringSpeed?: number

    /** The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. */
    mglt?: number

    /** The name of this starship. The common name, such as "Death Star". */
    name: string

    /**  The number of non-essential people this starship can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: StarshipfilmsFilm[]

    pilotsIds?: string[]

    pilots?: StarshippilotsPerson[]

}

export type FilmvehiclesVehicle = {
    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: number

    /**  The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
    class?: string

    /** The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /** The cost of this vehicle new, in Galactic Credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /**  The length of this vehicle in meters. */
    length?: number

    /** The manufacturer of this vehicle. */
    manufacturer?: string[]

    /** The maximum speed of this vehicle in the atmosphere. */
    maxAtmospheringSpeed?: number

    /** The model or official name of this vehicle. Such as "All-Terrain Attack Transport". */
    model?: string

    /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike". */
    name: string

    /** The number of non-essential people this vehicle can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: VehiclefilmsFilm[]

    pilotsIds?: string[]

    pilots?: VehiclepilotsPerson[]

}

export type InvokeFunctionInput = {
    name: string

    input: string

    clientMutationId?: string

}

export type InvokeFunctionPayload = {
    result: string

    clientMutationId?: string

}

export type Mutation = {
    createAsset(args: { fileName: string, handle: string, height?: number, mimeType?: string, size: number, url: string, width?: number }): Asset | null

    createFilm(args: { director?: string, episodeId: number, isPublished?: boolean, openingCrawl?: string, producers?: string[], releaseDate?: DateTime, title: string, charactersIds?: string[], characters?: FilmcharactersPerson[], planetsIds?: string[], planets?: FilmplanetsPlanet[], speciesIds?: string[], species?: FilmspeciesSpecies[], starshipsIds?: string[], starships?: FilmstarshipsStarship[], vehiclesIds?: string[], vehicles?: FilmvehiclesVehicle[] }): Film | null

    createPerson(args: { birthYear?: string, eyeColor?: PERSON_EYE_COLOR[], gender?: PERSON_GENDER, hairColor?: PERSON_HAIR_COLOR[], height?: number, isPublished?: boolean, mass?: number, name: string, skinColor?: PERSON_SKIN_COLOR[], homeworldId?: string, homeworld?: PersonhomeworldPlanet, filmsIds?: string[], films?: PersonfilmsFilm[], speciesIds?: string[], species?: PersonspeciesSpecies[], starshipsIds?: string[], starships?: PersonstarshipsStarship[], vehiclesIds?: string[], vehicles?: PersonvehiclesVehicle[] }): Person | null

    createPlanet(args: { climate?: string[], diameter?: number, gravity?: string, isPublished?: boolean, name: string, orbitalPeriod?: number, population?: number, rotationPeriod?: number, surfaceWater?: number, terrain?: string[], filmsIds?: string[], films?: PlanetfilmsFilm[], residentsIds?: string[], residents?: PlanetresidentsPerson[] }): Planet | null

    createSpecies(args: { averageHeight?: number, averageLifespan?: number, classification?: string, designation?: string, eyeColor?: SPECIES_EYE_COLOR[], hairColor?: SPECIES_HAIR_COLOR[], isPublished?: boolean, language?: string, name: string, skinColor?: SPECIES_SKIN_COLOR[], filmsIds?: string[], films?: SpeciesfilmsFilm[], peopleIds?: string[], people?: SpeciespeoplePerson[] }): Species | null

    createStarship(args: { cargoCapacity?: number, class?: string, consumables?: string, costInCredits?: number, crew?: number, hyperdriveRating?: number, isPublished?: boolean, length?: number, manufacturer?: string[], maxAtmospheringSpeed?: number, mglt?: number, name: string, passengers?: number, filmsIds?: string[], films?: StarshipfilmsFilm[], pilotsIds?: string[], pilots?: StarshippilotsPerson[] }): Starship | null

    createVehicle(args: { cargoCapacity?: number, class?: string, consumables?: string, costInCredits?: number, crew?: number, isPublished?: boolean, length?: number, manufacturer?: string[], maxAtmospheringSpeed?: number, model?: string, name: string, passengers?: number, filmsIds?: string[], films?: VehiclefilmsFilm[], pilotsIds?: string[], pilots?: VehiclepilotsPerson[] }): Vehicle | null

    updateAsset(args: { fileName?: string, handle?: string, height?: number, id: string, mimeType?: string, size?: number, url?: string, width?: number }): Asset | null

    updateFilm(args: { director?: string, episodeId?: number, id: string, isPublished?: boolean, openingCrawl?: string, producers?: string[], releaseDate?: DateTime, title?: string, charactersIds?: string[], characters?: FilmcharactersPerson[], planetsIds?: string[], planets?: FilmplanetsPlanet[], speciesIds?: string[], species?: FilmspeciesSpecies[], starshipsIds?: string[], starships?: FilmstarshipsStarship[], vehiclesIds?: string[], vehicles?: FilmvehiclesVehicle[] }): Film | null

    updatePerson(args: { birthYear?: string, eyeColor?: PERSON_EYE_COLOR[], gender?: PERSON_GENDER, hairColor?: PERSON_HAIR_COLOR[], height?: number, id: string, isPublished?: boolean, mass?: number, name?: string, skinColor?: PERSON_SKIN_COLOR[], homeworldId?: string, homeworld?: PersonhomeworldPlanet, filmsIds?: string[], films?: PersonfilmsFilm[], speciesIds?: string[], species?: PersonspeciesSpecies[], starshipsIds?: string[], starships?: PersonstarshipsStarship[], vehiclesIds?: string[], vehicles?: PersonvehiclesVehicle[] }): Person | null

    updatePlanet(args: { climate?: string[], diameter?: number, gravity?: string, id: string, isPublished?: boolean, name?: string, orbitalPeriod?: number, population?: number, rotationPeriod?: number, surfaceWater?: number, terrain?: string[], filmsIds?: string[], films?: PlanetfilmsFilm[], residentsIds?: string[], residents?: PlanetresidentsPerson[] }): Planet | null

    updateSpecies(args: { averageHeight?: number, averageLifespan?: number, classification?: string, designation?: string, eyeColor?: SPECIES_EYE_COLOR[], hairColor?: SPECIES_HAIR_COLOR[], id: string, isPublished?: boolean, language?: string, name?: string, skinColor?: SPECIES_SKIN_COLOR[], filmsIds?: string[], films?: SpeciesfilmsFilm[], peopleIds?: string[], people?: SpeciespeoplePerson[] }): Species | null

    updateStarship(args: { cargoCapacity?: number, class?: string, consumables?: string, costInCredits?: number, crew?: number, hyperdriveRating?: number, id: string, isPublished?: boolean, length?: number, manufacturer?: string[], maxAtmospheringSpeed?: number, mglt?: number, name?: string, passengers?: number, filmsIds?: string[], films?: StarshipfilmsFilm[], pilotsIds?: string[], pilots?: StarshippilotsPerson[] }): Starship | null

    updateVehicle(args: { cargoCapacity?: number, class?: string, consumables?: string, costInCredits?: number, crew?: number, id: string, isPublished?: boolean, length?: number, manufacturer?: string[], maxAtmospheringSpeed?: number, model?: string, name?: string, passengers?: number, filmsIds?: string[], films?: VehiclefilmsFilm[], pilotsIds?: string[], pilots?: VehiclepilotsPerson[] }): Vehicle | null

    updateOrCreateAsset(args: { update: UpdateAsset, create: CreateAsset }): Asset | null

    updateOrCreateFilm(args: { update: UpdateFilm, create: CreateFilm }): Film | null

    updateOrCreatePerson(args: { update: UpdatePerson, create: CreatePerson }): Person | null

    updateOrCreatePlanet(args: { update: UpdatePlanet, create: CreatePlanet }): Planet | null

    updateOrCreateSpecies(args: { update: UpdateSpecies, create: CreateSpecies }): Species | null

    updateOrCreateStarship(args: { update: UpdateStarship, create: CreateStarship }): Starship | null

    updateOrCreateVehicle(args: { update: UpdateVehicle, create: CreateVehicle }): Vehicle | null

    deleteAsset(args: { id: string }): Asset | null

    deleteFilm(args: { id: string }): Film | null

    deletePerson(args: { id: string }): Person | null

    deletePlanet(args: { id: string }): Planet | null

    deleteSpecies(args: { id: string }): Species | null

    deleteStarship(args: { id: string }): Starship | null

    deleteVehicle(args: { id: string }): Vehicle | null

    addToFilmPlanets(args: { planetsPlanetId: string, filmsFilmId: string }): AddToFilmPlanetsPayload | null

    addToFilmSpecies(args: { speciesSpeciesId: string, filmsFilmId: string }): AddToFilmSpeciesPayload | null

    addToFilmStarships(args: { starshipsStarshipId: string, filmsFilmId: string }): AddToFilmStarshipsPayload | null

    addToFilmVehicles(args: { vehiclesVehicleId: string, filmsFilmId: string }): AddToFilmVehiclesPayload | null

    addToPeopleFilm(args: { filmsFilmId: string, charactersPersonId: string }): AddToPeopleFilmPayload | null

    addToPeoplePlanet(args: { homeworldPlanetId: string, residentsPersonId: string }): AddToPeoplePlanetPayload | null

    addToPeopleSpecies(args: { speciesSpeciesId: string, peoplePersonId: string }): AddToPeopleSpeciesPayload | null

    addToPeopleStarships(args: { starshipsStarshipId: string, pilotsPersonId: string }): AddToPeopleStarshipsPayload | null

    addToPeopleVehicles(args: { vehiclesVehicleId: string, pilotsPersonId: string }): AddToPeopleVehiclesPayload | null

    removeFromFilmPlanets(args: { planetsPlanetId: string, filmsFilmId: string }): RemoveFromFilmPlanetsPayload | null

    removeFromFilmSpecies(args: { speciesSpeciesId: string, filmsFilmId: string }): RemoveFromFilmSpeciesPayload | null

    removeFromFilmStarships(args: { starshipsStarshipId: string, filmsFilmId: string }): RemoveFromFilmStarshipsPayload | null

    removeFromFilmVehicles(args: { vehiclesVehicleId: string, filmsFilmId: string }): RemoveFromFilmVehiclesPayload | null

    removeFromPeopleFilm(args: { filmsFilmId: string, charactersPersonId: string }): RemoveFromPeopleFilmPayload | null

    removeFromPeoplePlanet(args: { homeworldPlanetId: string, residentsPersonId: string }): RemoveFromPeoplePlanetPayload | null

    removeFromPeopleSpecies(args: { speciesSpeciesId: string, peoplePersonId: string }): RemoveFromPeopleSpeciesPayload | null

    removeFromPeopleStarships(args: { starshipsStarshipId: string, pilotsPersonId: string }): RemoveFromPeopleStarshipsPayload | null

    removeFromPeopleVehicles(args: { vehiclesVehicleId: string, pilotsPersonId: string }): RemoveFromPeopleVehiclesPayload | null

    invokeFunction(args: { input: InvokeFunctionInput }): InvokeFunctionPayload | null

}

export type PersonPreviousValues = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    createdAt: DateTime

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    updatedAt: DateTime

}

export type PersonSubscriptionFilter = {
    /** Logical AND on all given filters. */
    AND?: PersonSubscriptionFilter[]

    /** Logical OR on all given filters. */
    OR?: PersonSubscriptionFilter[]

    /** The subscription event gets dispatched when it's listed in mutation_in */
    mutation_in?: _ModelMutationType[]

    /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
    updatedFields_contains?: string

    /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
    updatedFields_contains_every?: string[]

    /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
    updatedFields_contains_some?: string[]

    node?: PersonSubscriptionFilterNode

}

export type PersonSubscriptionFilterNode = {
    birthYear?: string

    /** All values that are not equal to given value. */
    birthYear_not?: string

    /** All values that are contained in given list. */
    birthYear_in?: string[]

    /** All values that are not contained in given list. */
    birthYear_not_in?: string[]

    /** All values less than the given value. */
    birthYear_lt?: string

    /** All values less than or equal the given value. */
    birthYear_lte?: string

    /** All values greater than the given value. */
    birthYear_gt?: string

    /** All values greater than or equal the given value. */
    birthYear_gte?: string

    /** All values containing the given string. */
    birthYear_contains?: string

    /** All values not containing the given string. */
    birthYear_not_contains?: string

    /** All values starting with the given string. */
    birthYear_starts_with?: string

    /** All values not starting with the given string. */
    birthYear_not_starts_with?: string

    /** All values ending with the given string. */
    birthYear_ends_with?: string

    /** All values not ending with the given string. */
    birthYear_not_ends_with?: string

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    gender?: PERSON_GENDER

    /** All values that are not equal to given value. */
    gender_not?: PERSON_GENDER

    /** All values that are contained in given list. */
    gender_in?: PERSON_GENDER[]

    /** All values that are not contained in given list. */
    gender_not_in?: PERSON_GENDER[]

    height?: number

    /** All values that are not equal to given value. */
    height_not?: number

    /** All values that are contained in given list. */
    height_in?: number[]

    /** All values that are not contained in given list. */
    height_not_in?: number[]

    /** All values less than the given value. */
    height_lt?: number

    /** All values less than or equal the given value. */
    height_lte?: number

    /** All values greater than the given value. */
    height_gt?: number

    /** All values greater than or equal the given value. */
    height_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    mass?: number

    /** All values that are not equal to given value. */
    mass_not?: number

    /** All values that are contained in given list. */
    mass_in?: number[]

    /** All values that are not contained in given list. */
    mass_not_in?: number[]

    /** All values less than the given value. */
    mass_lt?: number

    /** All values less than or equal the given value. */
    mass_lte?: number

    /** All values greater than the given value. */
    mass_gt?: number

    /** All values greater than or equal the given value. */
    mass_gte?: number

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    homeworld?: PlanetFilter

    species_every?: SpeciesFilter

    species_some?: SpeciesFilter

    species_none?: SpeciesFilter

    starships_every?: StarshipFilter

    starships_some?: StarshipFilter

    starships_none?: StarshipFilter

    vehicles_every?: VehicleFilter

    vehicles_some?: VehicleFilter

    vehicles_none?: VehicleFilter

}

export type PersonSubscriptionPayload = {
    mutation: _ModelMutationType

    node?: Person

    updatedFields?: string[]

    previousValues?: PersonPreviousValues

}

export type PersonfilmsFilm = {
    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title: string

    charactersIds?: string[]

    characters?: FilmcharactersPerson[]

    planetsIds?: string[]

    planets?: FilmplanetsPlanet[]

    speciesIds?: string[]

    species?: FilmspeciesSpecies[]

    starshipsIds?: string[]

    starships?: FilmstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: FilmvehiclesVehicle[]

}

export type PersonhomeworldPlanet = {
    /** The climate of this planet. */
    climate?: string[]

    /** The diameter of this planet in kilometers. */
    diameter?: number

    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The name of the planet */
    name: string

    /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
    orbitalPeriod?: number

    /** The average population of sentient beings inhabiting this planet. */
    population?: number

    /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
    rotationPeriod?: number

    /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
    surfaceWater?: number

    /** The terrain of this planet. */
    terrain?: string[]

    filmsIds?: string[]

    films?: PlanetfilmsFilm[]

    residentsIds?: string[]

    residents?: PlanetresidentsPerson[]

}

export type PersonspeciesSpecies = {
    /** The average height of this species in centimeters. */
    averageHeight?: number

    /** The average lifespan of this species in years. */
    averageLifespan?: number

    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string

    /** The designation of this species, such as "sentient". */
    designation?: string

    /** The eye colors for this species, "UNKNOWN" if not known, null if this species does not typically have eyes. */
    eyeColor?: SPECIES_EYE_COLOR[]

    /** The hair colors for this species, "UNKNOWN" if not known, null if this species does not typically have hairs. */
    hairColor?: SPECIES_HAIR_COLOR[]

    /** indicates if the record is published */
    isPublished?: boolean

    /** The language commonly spoken by this species. */
    language?: string

    /** The name of this species. */
    name: string

    /** The skin colors for this species, "UNKNOWN" if not known, null if this species does not typically have a skin. */
    skinColor?: SPECIES_SKIN_COLOR[]

    filmsIds?: string[]

    films?: SpeciesfilmsFilm[]

    peopleIds?: string[]

    people?: SpeciespeoplePerson[]

}

export type PersonstarshipsStarship = {
    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: number

    /** The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation" */
    class?: string

    /** The maximum length of time that this starship can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /**  The cost of this starship new, in galactic credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this starship. */
    crew?: number

    /** The class of this starships hyperdrive. */
    hyperdriveRating?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The length of this starship in meters. */
    length?: number

    /** The manufacturer of this starship. */
    manufacturer?: string[]

    /**  The maximum speed of this starship in the atmosphere. null if this starship is incapable of atmospheric flight. */
    maxAtmospheringSpeed?: number

    /** The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. */
    mglt?: number

    /** The name of this starship. The common name, such as "Death Star". */
    name: string

    /**  The number of non-essential people this starship can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: StarshipfilmsFilm[]

    pilotsIds?: string[]

    pilots?: StarshippilotsPerson[]

}

export type PersonvehiclesVehicle = {
    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: number

    /**  The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
    class?: string

    /** The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /** The cost of this vehicle new, in Galactic Credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /**  The length of this vehicle in meters. */
    length?: number

    /** The manufacturer of this vehicle. */
    manufacturer?: string[]

    /** The maximum speed of this vehicle in the atmosphere. */
    maxAtmospheringSpeed?: number

    /** The model or official name of this vehicle. Such as "All-Terrain Attack Transport". */
    model?: string

    /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike". */
    name: string

    /** The number of non-essential people this vehicle can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: VehiclefilmsFilm[]

    pilotsIds?: string[]

    pilots?: VehiclepilotsPerson[]

}

export type PlanetPreviousValues = {
    /** The climate of this planet. */
    climate?: string[]

    createdAt: DateTime

    /** The diameter of this planet in kilometers. */
    diameter?: number

    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The name of the planet */
    name: string

    /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
    orbitalPeriod?: number

    /** The average population of sentient beings inhabiting this planet. */
    population?: number

    /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
    rotationPeriod?: number

    /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
    surfaceWater?: number

    /** The terrain of this planet. */
    terrain?: string[]

    updatedAt: DateTime

}

export type PlanetSubscriptionFilter = {
    /** Logical AND on all given filters. */
    AND?: PlanetSubscriptionFilter[]

    /** Logical OR on all given filters. */
    OR?: PlanetSubscriptionFilter[]

    /** The subscription event gets dispatched when it's listed in mutation_in */
    mutation_in?: _ModelMutationType[]

    /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
    updatedFields_contains?: string

    /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
    updatedFields_contains_every?: string[]

    /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
    updatedFields_contains_some?: string[]

    node?: PlanetSubscriptionFilterNode

}

export type PlanetSubscriptionFilterNode = {
    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    diameter?: number

    /** All values that are not equal to given value. */
    diameter_not?: number

    /** All values that are contained in given list. */
    diameter_in?: number[]

    /** All values that are not contained in given list. */
    diameter_not_in?: number[]

    /** All values less than the given value. */
    diameter_lt?: number

    /** All values less than or equal the given value. */
    diameter_lte?: number

    /** All values greater than the given value. */
    diameter_gt?: number

    /** All values greater than or equal the given value. */
    diameter_gte?: number

    gravity?: string

    /** All values that are not equal to given value. */
    gravity_not?: string

    /** All values that are contained in given list. */
    gravity_in?: string[]

    /** All values that are not contained in given list. */
    gravity_not_in?: string[]

    /** All values less than the given value. */
    gravity_lt?: string

    /** All values less than or equal the given value. */
    gravity_lte?: string

    /** All values greater than the given value. */
    gravity_gt?: string

    /** All values greater than or equal the given value. */
    gravity_gte?: string

    /** All values containing the given string. */
    gravity_contains?: string

    /** All values not containing the given string. */
    gravity_not_contains?: string

    /** All values starting with the given string. */
    gravity_starts_with?: string

    /** All values not starting with the given string. */
    gravity_not_starts_with?: string

    /** All values ending with the given string. */
    gravity_ends_with?: string

    /** All values not ending with the given string. */
    gravity_not_ends_with?: string

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    orbitalPeriod?: number

    /** All values that are not equal to given value. */
    orbitalPeriod_not?: number

    /** All values that are contained in given list. */
    orbitalPeriod_in?: number[]

    /** All values that are not contained in given list. */
    orbitalPeriod_not_in?: number[]

    /** All values less than the given value. */
    orbitalPeriod_lt?: number

    /** All values less than or equal the given value. */
    orbitalPeriod_lte?: number

    /** All values greater than the given value. */
    orbitalPeriod_gt?: number

    /** All values greater than or equal the given value. */
    orbitalPeriod_gte?: number

    population?: number

    /** All values that are not equal to given value. */
    population_not?: number

    /** All values that are contained in given list. */
    population_in?: number[]

    /** All values that are not contained in given list. */
    population_not_in?: number[]

    /** All values less than the given value. */
    population_lt?: number

    /** All values less than or equal the given value. */
    population_lte?: number

    /** All values greater than the given value. */
    population_gt?: number

    /** All values greater than or equal the given value. */
    population_gte?: number

    rotationPeriod?: number

    /** All values that are not equal to given value. */
    rotationPeriod_not?: number

    /** All values that are contained in given list. */
    rotationPeriod_in?: number[]

    /** All values that are not contained in given list. */
    rotationPeriod_not_in?: number[]

    /** All values less than the given value. */
    rotationPeriod_lt?: number

    /** All values less than or equal the given value. */
    rotationPeriod_lte?: number

    /** All values greater than the given value. */
    rotationPeriod_gt?: number

    /** All values greater than or equal the given value. */
    rotationPeriod_gte?: number

    surfaceWater?: number

    /** All values that are not equal to given value. */
    surfaceWater_not?: number

    /** All values that are contained in given list. */
    surfaceWater_in?: number[]

    /** All values that are not contained in given list. */
    surfaceWater_not_in?: number[]

    /** All values less than the given value. */
    surfaceWater_lt?: number

    /** All values less than or equal the given value. */
    surfaceWater_lte?: number

    /** All values greater than the given value. */
    surfaceWater_gt?: number

    /** All values greater than or equal the given value. */
    surfaceWater_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    residents_every?: PersonFilter

    residents_some?: PersonFilter

    residents_none?: PersonFilter

}

export type PlanetSubscriptionPayload = {
    mutation: _ModelMutationType

    node?: Planet

    updatedFields?: string[]

    previousValues?: PlanetPreviousValues

}

export type PlanetfilmsFilm = {
    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title: string

    charactersIds?: string[]

    characters?: FilmcharactersPerson[]

    planetsIds?: string[]

    planets?: FilmplanetsPlanet[]

    speciesIds?: string[]

    species?: FilmspeciesSpecies[]

    starshipsIds?: string[]

    starships?: FilmstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: FilmvehiclesVehicle[]

}

export type PlanetresidentsPerson = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    filmsIds?: string[]

    films?: PersonfilmsFilm[]

    speciesIds?: string[]

    species?: PersonspeciesSpecies[]

    starshipsIds?: string[]

    starships?: PersonstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: PersonvehiclesVehicle[]

}

export type RemoveFromFilmPlanetsPayload = {
    filmsFilm?: Film

    planetsPlanet?: Planet

}

export type RemoveFromFilmSpeciesPayload = {
    filmsFilm?: Film

    speciesSpecies?: Species

}

export type RemoveFromFilmStarshipsPayload = {
    filmsFilm?: Film

    starshipsStarship?: Starship

}

export type RemoveFromFilmVehiclesPayload = {
    filmsFilm?: Film

    vehiclesVehicle?: Vehicle

}

export type RemoveFromPeopleFilmPayload = {
    charactersPerson?: Person

    filmsFilm?: Film

}

export type RemoveFromPeoplePlanetPayload = {
    residentsPerson?: Person

    homeworldPlanet?: Planet

}

export type RemoveFromPeopleSpeciesPayload = {
    peoplePerson?: Person

    speciesSpecies?: Species

}

export type RemoveFromPeopleStarshipsPayload = {
    pilotsPerson?: Person

    starshipsStarship?: Starship

}

export type RemoveFromPeopleVehiclesPayload = {
    pilotsPerson?: Person

    vehiclesVehicle?: Vehicle

}

export type SpeciesPreviousValues = {
    /** The average height of this species in centimeters. */
    averageHeight?: number

    /** The average lifespan of this species in years. */
    averageLifespan?: number

    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string

    createdAt: DateTime

    /** The designation of this species, such as "sentient". */
    designation?: string

    /** The eye colors for this species, "UNKNOWN" if not known, null if this species does not typically have eyes. */
    eyeColor?: SPECIES_EYE_COLOR[]

    /** The hair colors for this species, "UNKNOWN" if not known, null if this species does not typically have hairs. */
    hairColor?: SPECIES_HAIR_COLOR[]

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The language commonly spoken by this species. */
    language?: string

    /** The name of this species. */
    name: string

    /** The skin colors for this species, "UNKNOWN" if not known, null if this species does not typically have a skin. */
    skinColor?: SPECIES_SKIN_COLOR[]

    updatedAt: DateTime

}

export type SpeciesSubscriptionFilter = {
    /** Logical AND on all given filters. */
    AND?: SpeciesSubscriptionFilter[]

    /** Logical OR on all given filters. */
    OR?: SpeciesSubscriptionFilter[]

    /** The subscription event gets dispatched when it's listed in mutation_in */
    mutation_in?: _ModelMutationType[]

    /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
    updatedFields_contains?: string

    /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
    updatedFields_contains_every?: string[]

    /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
    updatedFields_contains_some?: string[]

    node?: SpeciesSubscriptionFilterNode

}

export type SpeciesSubscriptionFilterNode = {
    averageHeight?: number

    /** All values that are not equal to given value. */
    averageHeight_not?: number

    /** All values that are contained in given list. */
    averageHeight_in?: number[]

    /** All values that are not contained in given list. */
    averageHeight_not_in?: number[]

    /** All values less than the given value. */
    averageHeight_lt?: number

    /** All values less than or equal the given value. */
    averageHeight_lte?: number

    /** All values greater than the given value. */
    averageHeight_gt?: number

    /** All values greater than or equal the given value. */
    averageHeight_gte?: number

    averageLifespan?: number

    /** All values that are not equal to given value. */
    averageLifespan_not?: number

    /** All values that are contained in given list. */
    averageLifespan_in?: number[]

    /** All values that are not contained in given list. */
    averageLifespan_not_in?: number[]

    /** All values less than the given value. */
    averageLifespan_lt?: number

    /** All values less than or equal the given value. */
    averageLifespan_lte?: number

    /** All values greater than the given value. */
    averageLifespan_gt?: number

    /** All values greater than or equal the given value. */
    averageLifespan_gte?: number

    classification?: string

    /** All values that are not equal to given value. */
    classification_not?: string

    /** All values that are contained in given list. */
    classification_in?: string[]

    /** All values that are not contained in given list. */
    classification_not_in?: string[]

    /** All values less than the given value. */
    classification_lt?: string

    /** All values less than or equal the given value. */
    classification_lte?: string

    /** All values greater than the given value. */
    classification_gt?: string

    /** All values greater than or equal the given value. */
    classification_gte?: string

    /** All values containing the given string. */
    classification_contains?: string

    /** All values not containing the given string. */
    classification_not_contains?: string

    /** All values starting with the given string. */
    classification_starts_with?: string

    /** All values not starting with the given string. */
    classification_not_starts_with?: string

    /** All values ending with the given string. */
    classification_ends_with?: string

    /** All values not ending with the given string. */
    classification_not_ends_with?: string

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    designation?: string

    /** All values that are not equal to given value. */
    designation_not?: string

    /** All values that are contained in given list. */
    designation_in?: string[]

    /** All values that are not contained in given list. */
    designation_not_in?: string[]

    /** All values less than the given value. */
    designation_lt?: string

    /** All values less than or equal the given value. */
    designation_lte?: string

    /** All values greater than the given value. */
    designation_gt?: string

    /** All values greater than or equal the given value. */
    designation_gte?: string

    /** All values containing the given string. */
    designation_contains?: string

    /** All values not containing the given string. */
    designation_not_contains?: string

    /** All values starting with the given string. */
    designation_starts_with?: string

    /** All values not starting with the given string. */
    designation_not_starts_with?: string

    /** All values ending with the given string. */
    designation_ends_with?: string

    /** All values not ending with the given string. */
    designation_not_ends_with?: string

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    language?: string

    /** All values that are not equal to given value. */
    language_not?: string

    /** All values that are contained in given list. */
    language_in?: string[]

    /** All values that are not contained in given list. */
    language_not_in?: string[]

    /** All values less than the given value. */
    language_lt?: string

    /** All values less than or equal the given value. */
    language_lte?: string

    /** All values greater than the given value. */
    language_gt?: string

    /** All values greater than or equal the given value. */
    language_gte?: string

    /** All values containing the given string. */
    language_contains?: string

    /** All values not containing the given string. */
    language_not_contains?: string

    /** All values starting with the given string. */
    language_starts_with?: string

    /** All values not starting with the given string. */
    language_not_starts_with?: string

    /** All values ending with the given string. */
    language_ends_with?: string

    /** All values not ending with the given string. */
    language_not_ends_with?: string

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    people_every?: PersonFilter

    people_some?: PersonFilter

    people_none?: PersonFilter

}

export type SpeciesSubscriptionPayload = {
    mutation: _ModelMutationType

    node?: Species

    updatedFields?: string[]

    previousValues?: SpeciesPreviousValues

}

export type SpeciesfilmsFilm = {
    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title: string

    charactersIds?: string[]

    characters?: FilmcharactersPerson[]

    planetsIds?: string[]

    planets?: FilmplanetsPlanet[]

    speciesIds?: string[]

    species?: FilmspeciesSpecies[]

    starshipsIds?: string[]

    starships?: FilmstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: FilmvehiclesVehicle[]

}

export type SpeciespeoplePerson = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    homeworldId?: string

    homeworld?: PersonhomeworldPlanet

    filmsIds?: string[]

    films?: PersonfilmsFilm[]

    speciesIds?: string[]

    species?: PersonspeciesSpecies[]

    starshipsIds?: string[]

    starships?: PersonstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: PersonvehiclesVehicle[]

}

export type StarshipPreviousValues = {
    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: number

    /** The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation" */
    class?: string

    /** The maximum length of time that this starship can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /**  The cost of this starship new, in galactic credits. */
    costInCredits?: number

    createdAt: DateTime

    /** The number of personnel needed to run or pilot this starship. */
    crew?: number

    /** The class of this starships hyperdrive. */
    hyperdriveRating?: number

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The length of this starship in meters. */
    length?: number

    /** The manufacturer of this starship. */
    manufacturer?: string[]

    /**  The maximum speed of this starship in the atmosphere. null if this starship is incapable of atmospheric flight. */
    maxAtmospheringSpeed?: number

    /** The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. */
    mglt?: number

    /** The name of this starship. The common name, such as "Death Star". */
    name: string

    /**  The number of non-essential people this starship can transport. */
    passengers?: number

    updatedAt: DateTime

}

export type StarshipSubscriptionFilter = {
    /** Logical AND on all given filters. */
    AND?: StarshipSubscriptionFilter[]

    /** Logical OR on all given filters. */
    OR?: StarshipSubscriptionFilter[]

    /** The subscription event gets dispatched when it's listed in mutation_in */
    mutation_in?: _ModelMutationType[]

    /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
    updatedFields_contains?: string

    /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
    updatedFields_contains_every?: string[]

    /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
    updatedFields_contains_some?: string[]

    node?: StarshipSubscriptionFilterNode

}

export type StarshipSubscriptionFilterNode = {
    cargoCapacity?: number

    /** All values that are not equal to given value. */
    cargoCapacity_not?: number

    /** All values that are contained in given list. */
    cargoCapacity_in?: number[]

    /** All values that are not contained in given list. */
    cargoCapacity_not_in?: number[]

    /** All values less than the given value. */
    cargoCapacity_lt?: number

    /** All values less than or equal the given value. */
    cargoCapacity_lte?: number

    /** All values greater than the given value. */
    cargoCapacity_gt?: number

    /** All values greater than or equal the given value. */
    cargoCapacity_gte?: number

    class?: string

    /** All values that are not equal to given value. */
    class_not?: string

    /** All values that are contained in given list. */
    class_in?: string[]

    /** All values that are not contained in given list. */
    class_not_in?: string[]

    /** All values less than the given value. */
    class_lt?: string

    /** All values less than or equal the given value. */
    class_lte?: string

    /** All values greater than the given value. */
    class_gt?: string

    /** All values greater than or equal the given value. */
    class_gte?: string

    /** All values containing the given string. */
    class_contains?: string

    /** All values not containing the given string. */
    class_not_contains?: string

    /** All values starting with the given string. */
    class_starts_with?: string

    /** All values not starting with the given string. */
    class_not_starts_with?: string

    /** All values ending with the given string. */
    class_ends_with?: string

    /** All values not ending with the given string. */
    class_not_ends_with?: string

    consumables?: string

    /** All values that are not equal to given value. */
    consumables_not?: string

    /** All values that are contained in given list. */
    consumables_in?: string[]

    /** All values that are not contained in given list. */
    consumables_not_in?: string[]

    /** All values less than the given value. */
    consumables_lt?: string

    /** All values less than or equal the given value. */
    consumables_lte?: string

    /** All values greater than the given value. */
    consumables_gt?: string

    /** All values greater than or equal the given value. */
    consumables_gte?: string

    /** All values containing the given string. */
    consumables_contains?: string

    /** All values not containing the given string. */
    consumables_not_contains?: string

    /** All values starting with the given string. */
    consumables_starts_with?: string

    /** All values not starting with the given string. */
    consumables_not_starts_with?: string

    /** All values ending with the given string. */
    consumables_ends_with?: string

    /** All values not ending with the given string. */
    consumables_not_ends_with?: string

    costInCredits?: number

    /** All values that are not equal to given value. */
    costInCredits_not?: number

    /** All values that are contained in given list. */
    costInCredits_in?: number[]

    /** All values that are not contained in given list. */
    costInCredits_not_in?: number[]

    /** All values less than the given value. */
    costInCredits_lt?: number

    /** All values less than or equal the given value. */
    costInCredits_lte?: number

    /** All values greater than the given value. */
    costInCredits_gt?: number

    /** All values greater than or equal the given value. */
    costInCredits_gte?: number

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    crew?: number

    /** All values that are not equal to given value. */
    crew_not?: number

    /** All values that are contained in given list. */
    crew_in?: number[]

    /** All values that are not contained in given list. */
    crew_not_in?: number[]

    /** All values less than the given value. */
    crew_lt?: number

    /** All values less than or equal the given value. */
    crew_lte?: number

    /** All values greater than the given value. */
    crew_gt?: number

    /** All values greater than or equal the given value. */
    crew_gte?: number

    hyperdriveRating?: number

    /** All values that are not equal to given value. */
    hyperdriveRating_not?: number

    /** All values that are contained in given list. */
    hyperdriveRating_in?: number[]

    /** All values that are not contained in given list. */
    hyperdriveRating_not_in?: number[]

    /** All values less than the given value. */
    hyperdriveRating_lt?: number

    /** All values less than or equal the given value. */
    hyperdriveRating_lte?: number

    /** All values greater than the given value. */
    hyperdriveRating_gt?: number

    /** All values greater than or equal the given value. */
    hyperdriveRating_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    length?: number

    /** All values that are not equal to given value. */
    length_not?: number

    /** All values that are contained in given list. */
    length_in?: number[]

    /** All values that are not contained in given list. */
    length_not_in?: number[]

    /** All values less than the given value. */
    length_lt?: number

    /** All values less than or equal the given value. */
    length_lte?: number

    /** All values greater than the given value. */
    length_gt?: number

    /** All values greater than or equal the given value. */
    length_gte?: number

    maxAtmospheringSpeed?: number

    /** All values that are not equal to given value. */
    maxAtmospheringSpeed_not?: number

    /** All values that are contained in given list. */
    maxAtmospheringSpeed_in?: number[]

    /** All values that are not contained in given list. */
    maxAtmospheringSpeed_not_in?: number[]

    /** All values less than the given value. */
    maxAtmospheringSpeed_lt?: number

    /** All values less than or equal the given value. */
    maxAtmospheringSpeed_lte?: number

    /** All values greater than the given value. */
    maxAtmospheringSpeed_gt?: number

    /** All values greater than or equal the given value. */
    maxAtmospheringSpeed_gte?: number

    mglt?: number

    /** All values that are not equal to given value. */
    mglt_not?: number

    /** All values that are contained in given list. */
    mglt_in?: number[]

    /** All values that are not contained in given list. */
    mglt_not_in?: number[]

    /** All values less than the given value. */
    mglt_lt?: number

    /** All values less than or equal the given value. */
    mglt_lte?: number

    /** All values greater than the given value. */
    mglt_gt?: number

    /** All values greater than or equal the given value. */
    mglt_gte?: number

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    passengers?: number

    /** All values that are not equal to given value. */
    passengers_not?: number

    /** All values that are contained in given list. */
    passengers_in?: number[]

    /** All values that are not contained in given list. */
    passengers_not_in?: number[]

    /** All values less than the given value. */
    passengers_lt?: number

    /** All values less than or equal the given value. */
    passengers_lte?: number

    /** All values greater than the given value. */
    passengers_gt?: number

    /** All values greater than or equal the given value. */
    passengers_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    pilots_every?: PersonFilter

    pilots_some?: PersonFilter

    pilots_none?: PersonFilter

}

export type StarshipSubscriptionPayload = {
    mutation: _ModelMutationType

    node?: Starship

    updatedFields?: string[]

    previousValues?: StarshipPreviousValues

}

export type StarshipfilmsFilm = {
    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title: string

    charactersIds?: string[]

    characters?: FilmcharactersPerson[]

    planetsIds?: string[]

    planets?: FilmplanetsPlanet[]

    speciesIds?: string[]

    species?: FilmspeciesSpecies[]

    starshipsIds?: string[]

    starships?: FilmstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: FilmvehiclesVehicle[]

}

export type StarshippilotsPerson = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    homeworldId?: string

    homeworld?: PersonhomeworldPlanet

    filmsIds?: string[]

    films?: PersonfilmsFilm[]

    speciesIds?: string[]

    species?: PersonspeciesSpecies[]

    starshipsIds?: string[]

    starships?: PersonstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: PersonvehiclesVehicle[]

}

export type Subscription = {
    Asset(args: { filter?: AssetSubscriptionFilter }): AssetSubscriptionPayload | null

    Film(args: { filter?: FilmSubscriptionFilter }): FilmSubscriptionPayload | null

    Person(args: { filter?: PersonSubscriptionFilter }): PersonSubscriptionPayload | null

    Planet(args: { filter?: PlanetSubscriptionFilter }): PlanetSubscriptionPayload | null

    Species(args: { filter?: SpeciesSubscriptionFilter }): SpeciesSubscriptionPayload | null

    Starship(args: { filter?: StarshipSubscriptionFilter }): StarshipSubscriptionPayload | null

    Vehicle(args: { filter?: VehicleSubscriptionFilter }): VehicleSubscriptionPayload | null

}

export type UpdateAsset = {
    /** Original File Name */
    fileName?: string

    /** The File Handle */
    handle?: string

    /** The height of the file in case it is an image */
    height?: number

    id: string

    /** The Mime Type */
    mimeType?: string

    /** The Size Of The File */
    size?: number

    /** The Url Of The Asset */
    url?: string

    /** The width of the file in case it is an image */
    width?: number

}

export type UpdateFilm = {
    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId?: number

    id: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title?: string

    charactersIds?: string[]

    characters?: FilmcharactersPerson[]

    planetsIds?: string[]

    planets?: FilmplanetsPlanet[]

    speciesIds?: string[]

    species?: FilmspeciesSpecies[]

    starshipsIds?: string[]

    starships?: FilmstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: FilmvehiclesVehicle[]

}

export type UpdatePerson = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    id: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name?: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    homeworldId?: string

    homeworld?: PersonhomeworldPlanet

    filmsIds?: string[]

    films?: PersonfilmsFilm[]

    speciesIds?: string[]

    species?: PersonspeciesSpecies[]

    starshipsIds?: string[]

    starships?: PersonstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: PersonvehiclesVehicle[]

}

export type UpdatePlanet = {
    /** The climate of this planet. */
    climate?: string[]

    /** The diameter of this planet in kilometers. */
    diameter?: number

    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string

    id: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The name of the planet */
    name?: string

    /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
    orbitalPeriod?: number

    /** The average population of sentient beings inhabiting this planet. */
    population?: number

    /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
    rotationPeriod?: number

    /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
    surfaceWater?: number

    /** The terrain of this planet. */
    terrain?: string[]

    filmsIds?: string[]

    films?: PlanetfilmsFilm[]

    residentsIds?: string[]

    residents?: PlanetresidentsPerson[]

}

export type UpdateSpecies = {
    /** The average height of this species in centimeters. */
    averageHeight?: number

    /** The average lifespan of this species in years. */
    averageLifespan?: number

    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string

    /** The designation of this species, such as "sentient". */
    designation?: string

    /** The eye colors for this species, "UNKNOWN" if not known, null if this species does not typically have eyes. */
    eyeColor?: SPECIES_EYE_COLOR[]

    /** The hair colors for this species, "UNKNOWN" if not known, null if this species does not typically have hairs. */
    hairColor?: SPECIES_HAIR_COLOR[]

    id: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The language commonly spoken by this species. */
    language?: string

    /** The name of this species. */
    name?: string

    /** The skin colors for this species, "UNKNOWN" if not known, null if this species does not typically have a skin. */
    skinColor?: SPECIES_SKIN_COLOR[]

    filmsIds?: string[]

    films?: SpeciesfilmsFilm[]

    peopleIds?: string[]

    people?: SpeciespeoplePerson[]

}

export type UpdateStarship = {
    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: number

    /** The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation" */
    class?: string

    /** The maximum length of time that this starship can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /**  The cost of this starship new, in galactic credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this starship. */
    crew?: number

    /** The class of this starships hyperdrive. */
    hyperdriveRating?: number

    id: string

    /** indicates if the record is published */
    isPublished?: boolean

    /** The length of this starship in meters. */
    length?: number

    /** The manufacturer of this starship. */
    manufacturer?: string[]

    /**  The maximum speed of this starship in the atmosphere. null if this starship is incapable of atmospheric flight. */
    maxAtmospheringSpeed?: number

    /** The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. */
    mglt?: number

    /** The name of this starship. The common name, such as "Death Star". */
    name?: string

    /**  The number of non-essential people this starship can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: StarshipfilmsFilm[]

    pilotsIds?: string[]

    pilots?: StarshippilotsPerson[]

}

export type UpdateVehicle = {
    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: number

    /**  The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
    class?: string

    /** The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /** The cost of this vehicle new, in Galactic Credits. */
    costInCredits?: number

    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: number

    id: string

    /** indicates if the record is published */
    isPublished?: boolean

    /**  The length of this vehicle in meters. */
    length?: number

    /** The manufacturer of this vehicle. */
    manufacturer?: string[]

    /** The maximum speed of this vehicle in the atmosphere. */
    maxAtmospheringSpeed?: number

    /** The model or official name of this vehicle. Such as "All-Terrain Attack Transport". */
    model?: string

    /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike". */
    name?: string

    /** The number of non-essential people this vehicle can transport. */
    passengers?: number

    filmsIds?: string[]

    films?: VehiclefilmsFilm[]

    pilotsIds?: string[]

    pilots?: VehiclepilotsPerson[]

}

export type VehiclePreviousValues = {
    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: number

    /**  The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
    class?: string

    /** The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /** The cost of this vehicle new, in Galactic Credits. */
    costInCredits?: number

    createdAt: DateTime

    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: number

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /**  The length of this vehicle in meters. */
    length?: number

    /** The manufacturer of this vehicle. */
    manufacturer?: string[]

    /** The maximum speed of this vehicle in the atmosphere. */
    maxAtmospheringSpeed?: number

    /** The model or official name of this vehicle. Such as "All-Terrain Attack Transport". */
    model?: string

    /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike". */
    name: string

    /** The number of non-essential people this vehicle can transport. */
    passengers?: number

    updatedAt: DateTime

}

export type VehicleSubscriptionFilter = {
    /** Logical AND on all given filters. */
    AND?: VehicleSubscriptionFilter[]

    /** Logical OR on all given filters. */
    OR?: VehicleSubscriptionFilter[]

    /** The subscription event gets dispatched when it's listed in mutation_in */
    mutation_in?: _ModelMutationType[]

    /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
    updatedFields_contains?: string

    /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
    updatedFields_contains_every?: string[]

    /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
    updatedFields_contains_some?: string[]

    node?: VehicleSubscriptionFilterNode

}

export type VehicleSubscriptionFilterNode = {
    cargoCapacity?: number

    /** All values that are not equal to given value. */
    cargoCapacity_not?: number

    /** All values that are contained in given list. */
    cargoCapacity_in?: number[]

    /** All values that are not contained in given list. */
    cargoCapacity_not_in?: number[]

    /** All values less than the given value. */
    cargoCapacity_lt?: number

    /** All values less than or equal the given value. */
    cargoCapacity_lte?: number

    /** All values greater than the given value. */
    cargoCapacity_gt?: number

    /** All values greater than or equal the given value. */
    cargoCapacity_gte?: number

    class?: string

    /** All values that are not equal to given value. */
    class_not?: string

    /** All values that are contained in given list. */
    class_in?: string[]

    /** All values that are not contained in given list. */
    class_not_in?: string[]

    /** All values less than the given value. */
    class_lt?: string

    /** All values less than or equal the given value. */
    class_lte?: string

    /** All values greater than the given value. */
    class_gt?: string

    /** All values greater than or equal the given value. */
    class_gte?: string

    /** All values containing the given string. */
    class_contains?: string

    /** All values not containing the given string. */
    class_not_contains?: string

    /** All values starting with the given string. */
    class_starts_with?: string

    /** All values not starting with the given string. */
    class_not_starts_with?: string

    /** All values ending with the given string. */
    class_ends_with?: string

    /** All values not ending with the given string. */
    class_not_ends_with?: string

    consumables?: string

    /** All values that are not equal to given value. */
    consumables_not?: string

    /** All values that are contained in given list. */
    consumables_in?: string[]

    /** All values that are not contained in given list. */
    consumables_not_in?: string[]

    /** All values less than the given value. */
    consumables_lt?: string

    /** All values less than or equal the given value. */
    consumables_lte?: string

    /** All values greater than the given value. */
    consumables_gt?: string

    /** All values greater than or equal the given value. */
    consumables_gte?: string

    /** All values containing the given string. */
    consumables_contains?: string

    /** All values not containing the given string. */
    consumables_not_contains?: string

    /** All values starting with the given string. */
    consumables_starts_with?: string

    /** All values not starting with the given string. */
    consumables_not_starts_with?: string

    /** All values ending with the given string. */
    consumables_ends_with?: string

    /** All values not ending with the given string. */
    consumables_not_ends_with?: string

    costInCredits?: number

    /** All values that are not equal to given value. */
    costInCredits_not?: number

    /** All values that are contained in given list. */
    costInCredits_in?: number[]

    /** All values that are not contained in given list. */
    costInCredits_not_in?: number[]

    /** All values less than the given value. */
    costInCredits_lt?: number

    /** All values less than or equal the given value. */
    costInCredits_lte?: number

    /** All values greater than the given value. */
    costInCredits_gt?: number

    /** All values greater than or equal the given value. */
    costInCredits_gte?: number

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    crew?: number

    /** All values that are not equal to given value. */
    crew_not?: number

    /** All values that are contained in given list. */
    crew_in?: number[]

    /** All values that are not contained in given list. */
    crew_not_in?: number[]

    /** All values less than the given value. */
    crew_lt?: number

    /** All values less than or equal the given value. */
    crew_lte?: number

    /** All values greater than the given value. */
    crew_gt?: number

    /** All values greater than or equal the given value. */
    crew_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    length?: number

    /** All values that are not equal to given value. */
    length_not?: number

    /** All values that are contained in given list. */
    length_in?: number[]

    /** All values that are not contained in given list. */
    length_not_in?: number[]

    /** All values less than the given value. */
    length_lt?: number

    /** All values less than or equal the given value. */
    length_lte?: number

    /** All values greater than the given value. */
    length_gt?: number

    /** All values greater than or equal the given value. */
    length_gte?: number

    maxAtmospheringSpeed?: number

    /** All values that are not equal to given value. */
    maxAtmospheringSpeed_not?: number

    /** All values that are contained in given list. */
    maxAtmospheringSpeed_in?: number[]

    /** All values that are not contained in given list. */
    maxAtmospheringSpeed_not_in?: number[]

    /** All values less than the given value. */
    maxAtmospheringSpeed_lt?: number

    /** All values less than or equal the given value. */
    maxAtmospheringSpeed_lte?: number

    /** All values greater than the given value. */
    maxAtmospheringSpeed_gt?: number

    /** All values greater than or equal the given value. */
    maxAtmospheringSpeed_gte?: number

    model?: string

    /** All values that are not equal to given value. */
    model_not?: string

    /** All values that are contained in given list. */
    model_in?: string[]

    /** All values that are not contained in given list. */
    model_not_in?: string[]

    /** All values less than the given value. */
    model_lt?: string

    /** All values less than or equal the given value. */
    model_lte?: string

    /** All values greater than the given value. */
    model_gt?: string

    /** All values greater than or equal the given value. */
    model_gte?: string

    /** All values containing the given string. */
    model_contains?: string

    /** All values not containing the given string. */
    model_not_contains?: string

    /** All values starting with the given string. */
    model_starts_with?: string

    /** All values not starting with the given string. */
    model_not_starts_with?: string

    /** All values ending with the given string. */
    model_ends_with?: string

    /** All values not ending with the given string. */
    model_not_ends_with?: string

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    passengers?: number

    /** All values that are not equal to given value. */
    passengers_not?: number

    /** All values that are contained in given list. */
    passengers_in?: number[]

    /** All values that are not contained in given list. */
    passengers_not_in?: number[]

    /** All values less than the given value. */
    passengers_lt?: number

    /** All values less than or equal the given value. */
    passengers_lte?: number

    /** All values greater than the given value. */
    passengers_gt?: number

    /** All values greater than or equal the given value. */
    passengers_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    pilots_every?: PersonFilter

    pilots_some?: PersonFilter

    pilots_none?: PersonFilter

}

export type VehicleSubscriptionPayload = {
    mutation: _ModelMutationType

    node?: Vehicle

    updatedFields?: string[]

    previousValues?: VehiclePreviousValues

}

export type VehiclefilmsFilm = {
    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    /** The title of this film */
    title: string

    charactersIds?: string[]

    characters?: FilmcharactersPerson[]

    planetsIds?: string[]

    planets?: FilmplanetsPlanet[]

    speciesIds?: string[]

    species?: FilmspeciesSpecies[]

    starshipsIds?: string[]

    starships?: FilmstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: FilmvehiclesVehicle[]

}

export type VehiclepilotsPerson = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    /** indicates if the record is published */
    isPublished?: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    homeworldId?: string

    homeworld?: PersonhomeworldPlanet

    filmsIds?: string[]

    films?: PersonfilmsFilm[]

    speciesIds?: string[]

    species?: PersonspeciesSpecies[]

    starshipsIds?: string[]

    starships?: PersonstarshipsStarship[]

    vehiclesIds?: string[]

    vehicles?: PersonvehiclesVehicle[]

}

export type _ModelMutationType = "CREATED" | "UPDATED" | "DELETED"

/** System model for Assets */
export type Asset = {
    createdAt: DateTime

    /** Original File Name */
    fileName: string

    /** The File Handle */
    handle: string

    /** The height of the file in case it is an image */
    height?: number

    id: string

    /** The Mime Type */
    mimeType?: string

    /** The Size Of The File */
    size: number

    updatedAt: DateTime

    /** The Url Of The Asset */
    url: string

    /** The width of the file in case it is an image */
    width?: number

}

export type AssetFilter = {
    /** Logical AND on all given filters. */
    AND?: AssetFilter[]

    /** Logical OR on all given filters. */
    OR?: AssetFilter[]

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    fileName?: string

    /** All values that are not equal to given value. */
    fileName_not?: string

    /** All values that are contained in given list. */
    fileName_in?: string[]

    /** All values that are not contained in given list. */
    fileName_not_in?: string[]

    /** All values less than the given value. */
    fileName_lt?: string

    /** All values less than or equal the given value. */
    fileName_lte?: string

    /** All values greater than the given value. */
    fileName_gt?: string

    /** All values greater than or equal the given value. */
    fileName_gte?: string

    /** All values containing the given string. */
    fileName_contains?: string

    /** All values not containing the given string. */
    fileName_not_contains?: string

    /** All values starting with the given string. */
    fileName_starts_with?: string

    /** All values not starting with the given string. */
    fileName_not_starts_with?: string

    /** All values ending with the given string. */
    fileName_ends_with?: string

    /** All values not ending with the given string. */
    fileName_not_ends_with?: string

    handle?: string

    /** All values that are not equal to given value. */
    handle_not?: string

    /** All values that are contained in given list. */
    handle_in?: string[]

    /** All values that are not contained in given list. */
    handle_not_in?: string[]

    /** All values less than the given value. */
    handle_lt?: string

    /** All values less than or equal the given value. */
    handle_lte?: string

    /** All values greater than the given value. */
    handle_gt?: string

    /** All values greater than or equal the given value. */
    handle_gte?: string

    /** All values containing the given string. */
    handle_contains?: string

    /** All values not containing the given string. */
    handle_not_contains?: string

    /** All values starting with the given string. */
    handle_starts_with?: string

    /** All values not starting with the given string. */
    handle_not_starts_with?: string

    /** All values ending with the given string. */
    handle_ends_with?: string

    /** All values not ending with the given string. */
    handle_not_ends_with?: string

    height?: number

    /** All values that are not equal to given value. */
    height_not?: number

    /** All values that are contained in given list. */
    height_in?: number[]

    /** All values that are not contained in given list. */
    height_not_in?: number[]

    /** All values less than the given value. */
    height_lt?: number

    /** All values less than or equal the given value. */
    height_lte?: number

    /** All values greater than the given value. */
    height_gt?: number

    /** All values greater than or equal the given value. */
    height_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    mimeType?: string

    /** All values that are not equal to given value. */
    mimeType_not?: string

    /** All values that are contained in given list. */
    mimeType_in?: string[]

    /** All values that are not contained in given list. */
    mimeType_not_in?: string[]

    /** All values less than the given value. */
    mimeType_lt?: string

    /** All values less than or equal the given value. */
    mimeType_lte?: string

    /** All values greater than the given value. */
    mimeType_gt?: string

    /** All values greater than or equal the given value. */
    mimeType_gte?: string

    /** All values containing the given string. */
    mimeType_contains?: string

    /** All values not containing the given string. */
    mimeType_not_contains?: string

    /** All values starting with the given string. */
    mimeType_starts_with?: string

    /** All values not starting with the given string. */
    mimeType_not_starts_with?: string

    /** All values ending with the given string. */
    mimeType_ends_with?: string

    /** All values not ending with the given string. */
    mimeType_not_ends_with?: string

    size?: number

    /** All values that are not equal to given value. */
    size_not?: number

    /** All values that are contained in given list. */
    size_in?: number[]

    /** All values that are not contained in given list. */
    size_not_in?: number[]

    /** All values less than the given value. */
    size_lt?: number

    /** All values less than or equal the given value. */
    size_lte?: number

    /** All values greater than the given value. */
    size_gt?: number

    /** All values greater than or equal the given value. */
    size_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    url?: string

    /** All values that are not equal to given value. */
    url_not?: string

    /** All values that are contained in given list. */
    url_in?: string[]

    /** All values that are not contained in given list. */
    url_not_in?: string[]

    /** All values less than the given value. */
    url_lt?: string

    /** All values less than or equal the given value. */
    url_lte?: string

    /** All values greater than the given value. */
    url_gt?: string

    /** All values greater than or equal the given value. */
    url_gte?: string

    /** All values containing the given string. */
    url_contains?: string

    /** All values not containing the given string. */
    url_not_contains?: string

    /** All values starting with the given string. */
    url_starts_with?: string

    /** All values not starting with the given string. */
    url_not_starts_with?: string

    /** All values ending with the given string. */
    url_ends_with?: string

    /** All values not ending with the given string. */
    url_not_ends_with?: string

    width?: number

    /** All values that are not equal to given value. */
    width_not?: number

    /** All values that are contained in given list. */
    width_in?: number[]

    /** All values that are not contained in given list. */
    width_not_in?: number[]

    /** All values less than the given value. */
    width_lt?: number

    /** All values less than or equal the given value. */
    width_lte?: number

    /** All values greater than the given value. */
    width_gt?: number

    /** All values greater than or equal the given value. */
    width_gte?: number

}

export type AssetOrderBy = "createdAt_ASC" | "createdAt_DESC" | "fileName_ASC" | "fileName_DESC" | "handle_ASC" | "handle_DESC" | "height_ASC" | "height_DESC" | "id_ASC" | "id_DESC" | "mimeType_ASC" | "mimeType_DESC" | "size_ASC" | "size_DESC" | "updatedAt_ASC" | "updatedAt_DESC" | "url_ASC" | "url_DESC" | "width_ASC" | "width_DESC"

export type DateTime = any

/** A Film is a single film. */
export type Film = {
    characters(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Person[] | null

    createdAt: DateTime

    /** The name of the director of this film. */
    director?: string

    /** The episode number of this film. */
    episodeId: number

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The opening paragraphs at the beginning of this film. */
    openingCrawl?: string

    planets(args: { filter?: PlanetFilter, orderBy?: PlanetOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Planet[] | null

    /** The names of the producers of this film. */
    producers?: string[]

    /**  The ISO 8601 date format of film release at original creator country. */
    releaseDate?: DateTime

    species(args: { filter?: SpeciesFilter, orderBy?: SpeciesOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Species[] | null

    starships(args: { filter?: StarshipFilter, orderBy?: StarshipOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Starship[] | null

    /** The title of this film */
    title: string

    updatedAt: DateTime

    vehicles(args: { filter?: VehicleFilter, orderBy?: VehicleOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Vehicle[] | null

    /** Meta information about the query. */
    _charactersMeta(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _planetsMeta(args: { filter?: PlanetFilter, orderBy?: PlanetOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _speciesMeta(args: { filter?: SpeciesFilter, orderBy?: SpeciesOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _starshipsMeta(args: { filter?: StarshipFilter, orderBy?: StarshipOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _vehiclesMeta(args: { filter?: VehicleFilter, orderBy?: VehicleOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

}

export type FilmFilter = {
    /** Logical AND on all given filters. */
    AND?: FilmFilter[]

    /** Logical OR on all given filters. */
    OR?: FilmFilter[]

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    director?: string

    /** All values that are not equal to given value. */
    director_not?: string

    /** All values that are contained in given list. */
    director_in?: string[]

    /** All values that are not contained in given list. */
    director_not_in?: string[]

    /** All values less than the given value. */
    director_lt?: string

    /** All values less than or equal the given value. */
    director_lte?: string

    /** All values greater than the given value. */
    director_gt?: string

    /** All values greater than or equal the given value. */
    director_gte?: string

    /** All values containing the given string. */
    director_contains?: string

    /** All values not containing the given string. */
    director_not_contains?: string

    /** All values starting with the given string. */
    director_starts_with?: string

    /** All values not starting with the given string. */
    director_not_starts_with?: string

    /** All values ending with the given string. */
    director_ends_with?: string

    /** All values not ending with the given string. */
    director_not_ends_with?: string

    episodeId?: number

    /** All values that are not equal to given value. */
    episodeId_not?: number

    /** All values that are contained in given list. */
    episodeId_in?: number[]

    /** All values that are not contained in given list. */
    episodeId_not_in?: number[]

    /** All values less than the given value. */
    episodeId_lt?: number

    /** All values less than or equal the given value. */
    episodeId_lte?: number

    /** All values greater than the given value. */
    episodeId_gt?: number

    /** All values greater than or equal the given value. */
    episodeId_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    openingCrawl?: string

    /** All values that are not equal to given value. */
    openingCrawl_not?: string

    /** All values that are contained in given list. */
    openingCrawl_in?: string[]

    /** All values that are not contained in given list. */
    openingCrawl_not_in?: string[]

    /** All values less than the given value. */
    openingCrawl_lt?: string

    /** All values less than or equal the given value. */
    openingCrawl_lte?: string

    /** All values greater than the given value. */
    openingCrawl_gt?: string

    /** All values greater than or equal the given value. */
    openingCrawl_gte?: string

    /** All values containing the given string. */
    openingCrawl_contains?: string

    /** All values not containing the given string. */
    openingCrawl_not_contains?: string

    /** All values starting with the given string. */
    openingCrawl_starts_with?: string

    /** All values not starting with the given string. */
    openingCrawl_not_starts_with?: string

    /** All values ending with the given string. */
    openingCrawl_ends_with?: string

    /** All values not ending with the given string. */
    openingCrawl_not_ends_with?: string

    releaseDate?: DateTime

    /** All values that are not equal to given value. */
    releaseDate_not?: DateTime

    /** All values that are contained in given list. */
    releaseDate_in?: DateTime[]

    /** All values that are not contained in given list. */
    releaseDate_not_in?: DateTime[]

    /** All values less than the given value. */
    releaseDate_lt?: DateTime

    /** All values less than or equal the given value. */
    releaseDate_lte?: DateTime

    /** All values greater than the given value. */
    releaseDate_gt?: DateTime

    /** All values greater than or equal the given value. */
    releaseDate_gte?: DateTime

    title?: string

    /** All values that are not equal to given value. */
    title_not?: string

    /** All values that are contained in given list. */
    title_in?: string[]

    /** All values that are not contained in given list. */
    title_not_in?: string[]

    /** All values less than the given value. */
    title_lt?: string

    /** All values less than or equal the given value. */
    title_lte?: string

    /** All values greater than the given value. */
    title_gt?: string

    /** All values greater than or equal the given value. */
    title_gte?: string

    /** All values containing the given string. */
    title_contains?: string

    /** All values not containing the given string. */
    title_not_contains?: string

    /** All values starting with the given string. */
    title_starts_with?: string

    /** All values not starting with the given string. */
    title_not_starts_with?: string

    /** All values ending with the given string. */
    title_ends_with?: string

    /** All values not ending with the given string. */
    title_not_ends_with?: string

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    characters_every?: PersonFilter

    characters_some?: PersonFilter

    characters_none?: PersonFilter

    planets_every?: PlanetFilter

    planets_some?: PlanetFilter

    planets_none?: PlanetFilter

    species_every?: SpeciesFilter

    species_some?: SpeciesFilter

    species_none?: SpeciesFilter

    starships_every?: StarshipFilter

    starships_some?: StarshipFilter

    starships_none?: StarshipFilter

    vehicles_every?: VehicleFilter

    vehicles_some?: VehicleFilter

    vehicles_none?: VehicleFilter

}

export type FilmOrderBy = "createdAt_ASC" | "createdAt_DESC" | "director_ASC" | "director_DESC" | "episodeId_ASC" | "episodeId_DESC" | "id_ASC" | "id_DESC" | "isPublished_ASC" | "isPublished_DESC" | "openingCrawl_ASC" | "openingCrawl_DESC" | "releaseDate_ASC" | "releaseDate_DESC" | "title_ASC" | "title_DESC" | "updatedAt_ASC" | "updatedAt_DESC"

/** An object with an ID */
export type Node = {
    /** The id of the object. */
    id: string

}

/** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
export type PERSON_EYE_COLOR = "UNKNOWN" | "BLUE" | "YELLOW" | "RED" | "BROWN" | "BLUEGREY" | "BLACK" | "ORANGE" | "HAZEL" | "PINK" | "GOLD" | "GREEN" | "WHITE" | "DARK"

/**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
export type PERSON_GENDER = "UNKNOWN" | "MALE" | "FEMALE" | "HERMAPHRODITE"

/** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
export type PERSON_HAIR_COLOR = "AUBURN" | "BLACK" | "BLONDE" | "BROWN" | "GREY" | "UNKNOWN" | "WHITE"

/** The skin color of this person. */
export type PERSON_SKIN_COLOR = "UNKNOWN" | "FAIR" | "GOLD" | "WHITE" | "LIGHT" | "GREEN" | "GREENTAN" | "PALE" | "METAL" | "DARK" | "BROWNMOTTLE" | "BROWN" | "GREY" | "MOTTLEDGREEN" | "ORANGE" | "BLUE" | "RED" | "YELLOW" | "TAN" | "SILVER"

/** A Person is an individual person or character within the Star Wars universe */
export type Person = {
    /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
    birthYear?: string

    createdAt: DateTime

    /** The eye color of this person. Will be "UNKNOWN" if not known or null if the person does not have an eye. */
    eyeColor?: PERSON_EYE_COLOR[]

    films(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Film[] | null

    /**  The gender of this person. Will be "UNKNOWN" if not known or null if the person does not have a gender. */
    gender?: PERSON_GENDER

    /** The hair color of this person. Will be "UNKNOWN" if not known or null if the person does not have hair. */
    hairColor?: PERSON_HAIR_COLOR[]

    /** The height of the person in centimeters. */
    height?: number

    homeworld(args: { filter?: PlanetFilter }): Planet | null

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The mass of the person in kilograms. */
    mass?: number

    /** The name of this person. */
    name: string

    /** The skin color of this person. */
    skinColor?: PERSON_SKIN_COLOR[]

    species(args: { filter?: SpeciesFilter, orderBy?: SpeciesOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Species[] | null

    starships(args: { filter?: StarshipFilter, orderBy?: StarshipOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Starship[] | null

    updatedAt: DateTime

    vehicles(args: { filter?: VehicleFilter, orderBy?: VehicleOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Vehicle[] | null

    /** Meta information about the query. */
    _filmsMeta(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _speciesMeta(args: { filter?: SpeciesFilter, orderBy?: SpeciesOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _starshipsMeta(args: { filter?: StarshipFilter, orderBy?: StarshipOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _vehiclesMeta(args: { filter?: VehicleFilter, orderBy?: VehicleOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

}

export type PersonFilter = {
    /** Logical AND on all given filters. */
    AND?: PersonFilter[]

    /** Logical OR on all given filters. */
    OR?: PersonFilter[]

    birthYear?: string

    /** All values that are not equal to given value. */
    birthYear_not?: string

    /** All values that are contained in given list. */
    birthYear_in?: string[]

    /** All values that are not contained in given list. */
    birthYear_not_in?: string[]

    /** All values less than the given value. */
    birthYear_lt?: string

    /** All values less than or equal the given value. */
    birthYear_lte?: string

    /** All values greater than the given value. */
    birthYear_gt?: string

    /** All values greater than or equal the given value. */
    birthYear_gte?: string

    /** All values containing the given string. */
    birthYear_contains?: string

    /** All values not containing the given string. */
    birthYear_not_contains?: string

    /** All values starting with the given string. */
    birthYear_starts_with?: string

    /** All values not starting with the given string. */
    birthYear_not_starts_with?: string

    /** All values ending with the given string. */
    birthYear_ends_with?: string

    /** All values not ending with the given string. */
    birthYear_not_ends_with?: string

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    gender?: PERSON_GENDER

    /** All values that are not equal to given value. */
    gender_not?: PERSON_GENDER

    /** All values that are contained in given list. */
    gender_in?: PERSON_GENDER[]

    /** All values that are not contained in given list. */
    gender_not_in?: PERSON_GENDER[]

    height?: number

    /** All values that are not equal to given value. */
    height_not?: number

    /** All values that are contained in given list. */
    height_in?: number[]

    /** All values that are not contained in given list. */
    height_not_in?: number[]

    /** All values less than the given value. */
    height_lt?: number

    /** All values less than or equal the given value. */
    height_lte?: number

    /** All values greater than the given value. */
    height_gt?: number

    /** All values greater than or equal the given value. */
    height_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    mass?: number

    /** All values that are not equal to given value. */
    mass_not?: number

    /** All values that are contained in given list. */
    mass_in?: number[]

    /** All values that are not contained in given list. */
    mass_not_in?: number[]

    /** All values less than the given value. */
    mass_lt?: number

    /** All values less than or equal the given value. */
    mass_lte?: number

    /** All values greater than the given value. */
    mass_gt?: number

    /** All values greater than or equal the given value. */
    mass_gte?: number

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    homeworld?: PlanetFilter

    species_every?: SpeciesFilter

    species_some?: SpeciesFilter

    species_none?: SpeciesFilter

    starships_every?: StarshipFilter

    starships_some?: StarshipFilter

    starships_none?: StarshipFilter

    vehicles_every?: VehicleFilter

    vehicles_some?: VehicleFilter

    vehicles_none?: VehicleFilter

}

export type PersonOrderBy = "birthYear_ASC" | "birthYear_DESC" | "createdAt_ASC" | "createdAt_DESC" | "gender_ASC" | "gender_DESC" | "height_ASC" | "height_DESC" | "id_ASC" | "id_DESC" | "isPublished_ASC" | "isPublished_DESC" | "mass_ASC" | "mass_DESC" | "name_ASC" | "name_DESC" | "updatedAt_ASC" | "updatedAt_DESC"

/** A Planet is a large mass, planet or planetoid in the Star Wars Universe, at the time of 0 ABY. */
export type Planet = {
    /** The climate of this planet. */
    climate?: string[]

    createdAt: DateTime

    /** The diameter of this planet in kilometers. */
    diameter?: number

    films(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Film[] | null

    /** A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
    gravity?: string

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The name of the planet */
    name: string

    /** The number of standard days it takes for this planet to complete a single orbit of its local star. */
    orbitalPeriod?: number

    /** The average population of sentient beings inhabiting this planet. */
    population?: number

    residents(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Person[] | null

    /** The number of standard hours it takes for this planet to complete a single rotation on its axis. */
    rotationPeriod?: number

    /** The percentage of the planet surface that is naturally occurring water or bodies of water. */
    surfaceWater?: number

    /** The terrain of this planet. */
    terrain?: string[]

    updatedAt: DateTime

    /** Meta information about the query. */
    _filmsMeta(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _residentsMeta(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

}

export type PlanetFilter = {
    /** Logical AND on all given filters. */
    AND?: PlanetFilter[]

    /** Logical OR on all given filters. */
    OR?: PlanetFilter[]

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    diameter?: number

    /** All values that are not equal to given value. */
    diameter_not?: number

    /** All values that are contained in given list. */
    diameter_in?: number[]

    /** All values that are not contained in given list. */
    diameter_not_in?: number[]

    /** All values less than the given value. */
    diameter_lt?: number

    /** All values less than or equal the given value. */
    diameter_lte?: number

    /** All values greater than the given value. */
    diameter_gt?: number

    /** All values greater than or equal the given value. */
    diameter_gte?: number

    gravity?: string

    /** All values that are not equal to given value. */
    gravity_not?: string

    /** All values that are contained in given list. */
    gravity_in?: string[]

    /** All values that are not contained in given list. */
    gravity_not_in?: string[]

    /** All values less than the given value. */
    gravity_lt?: string

    /** All values less than or equal the given value. */
    gravity_lte?: string

    /** All values greater than the given value. */
    gravity_gt?: string

    /** All values greater than or equal the given value. */
    gravity_gte?: string

    /** All values containing the given string. */
    gravity_contains?: string

    /** All values not containing the given string. */
    gravity_not_contains?: string

    /** All values starting with the given string. */
    gravity_starts_with?: string

    /** All values not starting with the given string. */
    gravity_not_starts_with?: string

    /** All values ending with the given string. */
    gravity_ends_with?: string

    /** All values not ending with the given string. */
    gravity_not_ends_with?: string

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    orbitalPeriod?: number

    /** All values that are not equal to given value. */
    orbitalPeriod_not?: number

    /** All values that are contained in given list. */
    orbitalPeriod_in?: number[]

    /** All values that are not contained in given list. */
    orbitalPeriod_not_in?: number[]

    /** All values less than the given value. */
    orbitalPeriod_lt?: number

    /** All values less than or equal the given value. */
    orbitalPeriod_lte?: number

    /** All values greater than the given value. */
    orbitalPeriod_gt?: number

    /** All values greater than or equal the given value. */
    orbitalPeriod_gte?: number

    population?: number

    /** All values that are not equal to given value. */
    population_not?: number

    /** All values that are contained in given list. */
    population_in?: number[]

    /** All values that are not contained in given list. */
    population_not_in?: number[]

    /** All values less than the given value. */
    population_lt?: number

    /** All values less than or equal the given value. */
    population_lte?: number

    /** All values greater than the given value. */
    population_gt?: number

    /** All values greater than or equal the given value. */
    population_gte?: number

    rotationPeriod?: number

    /** All values that are not equal to given value. */
    rotationPeriod_not?: number

    /** All values that are contained in given list. */
    rotationPeriod_in?: number[]

    /** All values that are not contained in given list. */
    rotationPeriod_not_in?: number[]

    /** All values less than the given value. */
    rotationPeriod_lt?: number

    /** All values less than or equal the given value. */
    rotationPeriod_lte?: number

    /** All values greater than the given value. */
    rotationPeriod_gt?: number

    /** All values greater than or equal the given value. */
    rotationPeriod_gte?: number

    surfaceWater?: number

    /** All values that are not equal to given value. */
    surfaceWater_not?: number

    /** All values that are contained in given list. */
    surfaceWater_in?: number[]

    /** All values that are not contained in given list. */
    surfaceWater_not_in?: number[]

    /** All values less than the given value. */
    surfaceWater_lt?: number

    /** All values less than or equal the given value. */
    surfaceWater_lte?: number

    /** All values greater than the given value. */
    surfaceWater_gt?: number

    /** All values greater than or equal the given value. */
    surfaceWater_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    residents_every?: PersonFilter

    residents_some?: PersonFilter

    residents_none?: PersonFilter

}

export type PlanetOrderBy = "createdAt_ASC" | "createdAt_DESC" | "diameter_ASC" | "diameter_DESC" | "gravity_ASC" | "gravity_DESC" | "id_ASC" | "id_DESC" | "isPublished_ASC" | "isPublished_DESC" | "name_ASC" | "name_DESC" | "orbitalPeriod_ASC" | "orbitalPeriod_DESC" | "population_ASC" | "population_DESC" | "rotationPeriod_ASC" | "rotationPeriod_DESC" | "surfaceWater_ASC" | "surfaceWater_DESC" | "updatedAt_ASC" | "updatedAt_DESC"

export type Query = {
    allAssets(args: { filter?: AssetFilter, orderBy?: AssetOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Asset[]

    allFilms(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Film[]

    allPersons(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Person[]

    allPlanets(args: { filter?: PlanetFilter, orderBy?: PlanetOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Planet[]

    allSpecies(args: { filter?: SpeciesFilter, orderBy?: SpeciesOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Species[]

    allStarships(args: { filter?: StarshipFilter, orderBy?: StarshipOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Starship[]

    allVehicles(args: { filter?: VehicleFilter, orderBy?: VehicleOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Vehicle[]

    _allAssetsMeta(args: { filter?: AssetFilter, orderBy?: AssetOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    _allFilmsMeta(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    _allPersonsMeta(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    _allPlanetsMeta(args: { filter?: PlanetFilter, orderBy?: PlanetOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    _allSpeciesMeta(args: { filter?: SpeciesFilter, orderBy?: SpeciesOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    _allStarshipsMeta(args: { filter?: StarshipFilter, orderBy?: StarshipOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    _allVehiclesMeta(args: { filter?: VehicleFilter, orderBy?: VehicleOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    Asset(args: { id?: string }): Asset | null

    Film(args: { id?: string, title?: string }): Film | null

    Person(args: { id?: string, name?: string }): Person | null

    Planet(args: { id?: string, name?: string }): Planet | null

    Species(args: { id?: string, name?: string }): Species | null

    Starship(args: { id?: string, name?: string }): Starship | null

    Vehicle(args: { id?: string, name?: string }): Vehicle | null

    /** Fetches an object given its ID */
    node(args: { id: string }): Node | null

}

/** The eye colors for this species, "UNKNOWN" if not known, null if this species does not typically have eyes. */
export type SPECIES_EYE_COLOR = "AMBER" | "BLACK" | "BLUE" | "BROWN" | "GOLD" | "GREEN" | "GREY" | "HAZEL" | "INDIGO" | "ORANGE" | "PINK" | "RED" | "SILVER" | "UNKNOWN" | "YELLOW" | "GOLDEN"

/** The hair colors for this species, "UNKNOWN" if not known, null if this species does not typically have hairs. */
export type SPECIES_HAIR_COLOR = "UNKNOWN" | "BROWN" | "WHITE" | "RED" | "BLACK" | "BLONDE"

/** The skin colors for this species, "UNKNOWN" if not known, null if this species does not typically have a skin. */
export type SPECIES_SKIN_COLOR = "BLUE" | "BROWN" | "CAUCASIAN" | "DARK" | "GREEN" | "GREY" | "MAGENTA" | "ORANGE" | "PALE" | "PALEPINK" | "PEACH" | "PINK" | "PURPLE" | "RED" | "TAN" | "UNKNOWN" | "WHITE" | "YELLOW" | "BLACK" | "ASIAN" | "HISPANIC"

/** A Species is a type of person or character within the Star Wars Universe. */
export type Species = {
    /** The average height of this species in centimeters. */
    averageHeight?: number

    /** The average lifespan of this species in years. */
    averageLifespan?: number

    /** The classification of this species, such as "mammal" or "reptile". */
    classification?: string

    createdAt: DateTime

    /** The designation of this species, such as "sentient". */
    designation?: string

    /** The eye colors for this species, "UNKNOWN" if not known, null if this species does not typically have eyes. */
    eyeColor?: SPECIES_EYE_COLOR[]

    films(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Film[] | null

    /** The hair colors for this species, "UNKNOWN" if not known, null if this species does not typically have hairs. */
    hairColor?: SPECIES_HAIR_COLOR[]

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The language commonly spoken by this species. */
    language?: string

    /** The name of this species. */
    name: string

    people(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Person[] | null

    /** The skin colors for this species, "UNKNOWN" if not known, null if this species does not typically have a skin. */
    skinColor?: SPECIES_SKIN_COLOR[]

    updatedAt: DateTime

    /** Meta information about the query. */
    _filmsMeta(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _peopleMeta(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

}

export type SpeciesFilter = {
    /** Logical AND on all given filters. */
    AND?: SpeciesFilter[]

    /** Logical OR on all given filters. */
    OR?: SpeciesFilter[]

    averageHeight?: number

    /** All values that are not equal to given value. */
    averageHeight_not?: number

    /** All values that are contained in given list. */
    averageHeight_in?: number[]

    /** All values that are not contained in given list. */
    averageHeight_not_in?: number[]

    /** All values less than the given value. */
    averageHeight_lt?: number

    /** All values less than or equal the given value. */
    averageHeight_lte?: number

    /** All values greater than the given value. */
    averageHeight_gt?: number

    /** All values greater than or equal the given value. */
    averageHeight_gte?: number

    averageLifespan?: number

    /** All values that are not equal to given value. */
    averageLifespan_not?: number

    /** All values that are contained in given list. */
    averageLifespan_in?: number[]

    /** All values that are not contained in given list. */
    averageLifespan_not_in?: number[]

    /** All values less than the given value. */
    averageLifespan_lt?: number

    /** All values less than or equal the given value. */
    averageLifespan_lte?: number

    /** All values greater than the given value. */
    averageLifespan_gt?: number

    /** All values greater than or equal the given value. */
    averageLifespan_gte?: number

    classification?: string

    /** All values that are not equal to given value. */
    classification_not?: string

    /** All values that are contained in given list. */
    classification_in?: string[]

    /** All values that are not contained in given list. */
    classification_not_in?: string[]

    /** All values less than the given value. */
    classification_lt?: string

    /** All values less than or equal the given value. */
    classification_lte?: string

    /** All values greater than the given value. */
    classification_gt?: string

    /** All values greater than or equal the given value. */
    classification_gte?: string

    /** All values containing the given string. */
    classification_contains?: string

    /** All values not containing the given string. */
    classification_not_contains?: string

    /** All values starting with the given string. */
    classification_starts_with?: string

    /** All values not starting with the given string. */
    classification_not_starts_with?: string

    /** All values ending with the given string. */
    classification_ends_with?: string

    /** All values not ending with the given string. */
    classification_not_ends_with?: string

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    designation?: string

    /** All values that are not equal to given value. */
    designation_not?: string

    /** All values that are contained in given list. */
    designation_in?: string[]

    /** All values that are not contained in given list. */
    designation_not_in?: string[]

    /** All values less than the given value. */
    designation_lt?: string

    /** All values less than or equal the given value. */
    designation_lte?: string

    /** All values greater than the given value. */
    designation_gt?: string

    /** All values greater than or equal the given value. */
    designation_gte?: string

    /** All values containing the given string. */
    designation_contains?: string

    /** All values not containing the given string. */
    designation_not_contains?: string

    /** All values starting with the given string. */
    designation_starts_with?: string

    /** All values not starting with the given string. */
    designation_not_starts_with?: string

    /** All values ending with the given string. */
    designation_ends_with?: string

    /** All values not ending with the given string. */
    designation_not_ends_with?: string

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    language?: string

    /** All values that are not equal to given value. */
    language_not?: string

    /** All values that are contained in given list. */
    language_in?: string[]

    /** All values that are not contained in given list. */
    language_not_in?: string[]

    /** All values less than the given value. */
    language_lt?: string

    /** All values less than or equal the given value. */
    language_lte?: string

    /** All values greater than the given value. */
    language_gt?: string

    /** All values greater than or equal the given value. */
    language_gte?: string

    /** All values containing the given string. */
    language_contains?: string

    /** All values not containing the given string. */
    language_not_contains?: string

    /** All values starting with the given string. */
    language_starts_with?: string

    /** All values not starting with the given string. */
    language_not_starts_with?: string

    /** All values ending with the given string. */
    language_ends_with?: string

    /** All values not ending with the given string. */
    language_not_ends_with?: string

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    people_every?: PersonFilter

    people_some?: PersonFilter

    people_none?: PersonFilter

}

export type SpeciesOrderBy = "averageHeight_ASC" | "averageHeight_DESC" | "averageLifespan_ASC" | "averageLifespan_DESC" | "classification_ASC" | "classification_DESC" | "createdAt_ASC" | "createdAt_DESC" | "designation_ASC" | "designation_DESC" | "id_ASC" | "id_DESC" | "isPublished_ASC" | "isPublished_DESC" | "language_ASC" | "language_DESC" | "name_ASC" | "name_DESC" | "updatedAt_ASC" | "updatedAt_DESC"

/** A Starship is a single transport craft that has hyperdrive capability. */
export type Starship = {
    /** The maximum number of kilograms that this starship can transport. */
    cargoCapacity?: number

    /** The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation" */
    class?: string

    /** The maximum length of time that this starship can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /**  The cost of this starship new, in galactic credits. */
    costInCredits?: number

    createdAt: DateTime

    /** The number of personnel needed to run or pilot this starship. */
    crew?: number

    films(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Film[] | null

    /** The class of this starships hyperdrive. */
    hyperdriveRating?: number

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /** The length of this starship in meters. */
    length?: number

    /** The manufacturer of this starship. */
    manufacturer?: string[]

    /**  The maximum speed of this starship in the atmosphere. null if this starship is incapable of atmospheric flight. */
    maxAtmospheringSpeed?: number

    /** The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. */
    mglt?: number

    /** The name of this starship. The common name, such as "Death Star". */
    name: string

    /**  The number of non-essential people this starship can transport. */
    passengers?: number

    pilots(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Person[] | null

    updatedAt: DateTime

    /** Meta information about the query. */
    _filmsMeta(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _pilotsMeta(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

}

export type StarshipFilter = {
    /** Logical AND on all given filters. */
    AND?: StarshipFilter[]

    /** Logical OR on all given filters. */
    OR?: StarshipFilter[]

    cargoCapacity?: number

    /** All values that are not equal to given value. */
    cargoCapacity_not?: number

    /** All values that are contained in given list. */
    cargoCapacity_in?: number[]

    /** All values that are not contained in given list. */
    cargoCapacity_not_in?: number[]

    /** All values less than the given value. */
    cargoCapacity_lt?: number

    /** All values less than or equal the given value. */
    cargoCapacity_lte?: number

    /** All values greater than the given value. */
    cargoCapacity_gt?: number

    /** All values greater than or equal the given value. */
    cargoCapacity_gte?: number

    class?: string

    /** All values that are not equal to given value. */
    class_not?: string

    /** All values that are contained in given list. */
    class_in?: string[]

    /** All values that are not contained in given list. */
    class_not_in?: string[]

    /** All values less than the given value. */
    class_lt?: string

    /** All values less than or equal the given value. */
    class_lte?: string

    /** All values greater than the given value. */
    class_gt?: string

    /** All values greater than or equal the given value. */
    class_gte?: string

    /** All values containing the given string. */
    class_contains?: string

    /** All values not containing the given string. */
    class_not_contains?: string

    /** All values starting with the given string. */
    class_starts_with?: string

    /** All values not starting with the given string. */
    class_not_starts_with?: string

    /** All values ending with the given string. */
    class_ends_with?: string

    /** All values not ending with the given string. */
    class_not_ends_with?: string

    consumables?: string

    /** All values that are not equal to given value. */
    consumables_not?: string

    /** All values that are contained in given list. */
    consumables_in?: string[]

    /** All values that are not contained in given list. */
    consumables_not_in?: string[]

    /** All values less than the given value. */
    consumables_lt?: string

    /** All values less than or equal the given value. */
    consumables_lte?: string

    /** All values greater than the given value. */
    consumables_gt?: string

    /** All values greater than or equal the given value. */
    consumables_gte?: string

    /** All values containing the given string. */
    consumables_contains?: string

    /** All values not containing the given string. */
    consumables_not_contains?: string

    /** All values starting with the given string. */
    consumables_starts_with?: string

    /** All values not starting with the given string. */
    consumables_not_starts_with?: string

    /** All values ending with the given string. */
    consumables_ends_with?: string

    /** All values not ending with the given string. */
    consumables_not_ends_with?: string

    costInCredits?: number

    /** All values that are not equal to given value. */
    costInCredits_not?: number

    /** All values that are contained in given list. */
    costInCredits_in?: number[]

    /** All values that are not contained in given list. */
    costInCredits_not_in?: number[]

    /** All values less than the given value. */
    costInCredits_lt?: number

    /** All values less than or equal the given value. */
    costInCredits_lte?: number

    /** All values greater than the given value. */
    costInCredits_gt?: number

    /** All values greater than or equal the given value. */
    costInCredits_gte?: number

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    crew?: number

    /** All values that are not equal to given value. */
    crew_not?: number

    /** All values that are contained in given list. */
    crew_in?: number[]

    /** All values that are not contained in given list. */
    crew_not_in?: number[]

    /** All values less than the given value. */
    crew_lt?: number

    /** All values less than or equal the given value. */
    crew_lte?: number

    /** All values greater than the given value. */
    crew_gt?: number

    /** All values greater than or equal the given value. */
    crew_gte?: number

    hyperdriveRating?: number

    /** All values that are not equal to given value. */
    hyperdriveRating_not?: number

    /** All values that are contained in given list. */
    hyperdriveRating_in?: number[]

    /** All values that are not contained in given list. */
    hyperdriveRating_not_in?: number[]

    /** All values less than the given value. */
    hyperdriveRating_lt?: number

    /** All values less than or equal the given value. */
    hyperdriveRating_lte?: number

    /** All values greater than the given value. */
    hyperdriveRating_gt?: number

    /** All values greater than or equal the given value. */
    hyperdriveRating_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    length?: number

    /** All values that are not equal to given value. */
    length_not?: number

    /** All values that are contained in given list. */
    length_in?: number[]

    /** All values that are not contained in given list. */
    length_not_in?: number[]

    /** All values less than the given value. */
    length_lt?: number

    /** All values less than or equal the given value. */
    length_lte?: number

    /** All values greater than the given value. */
    length_gt?: number

    /** All values greater than or equal the given value. */
    length_gte?: number

    maxAtmospheringSpeed?: number

    /** All values that are not equal to given value. */
    maxAtmospheringSpeed_not?: number

    /** All values that are contained in given list. */
    maxAtmospheringSpeed_in?: number[]

    /** All values that are not contained in given list. */
    maxAtmospheringSpeed_not_in?: number[]

    /** All values less than the given value. */
    maxAtmospheringSpeed_lt?: number

    /** All values less than or equal the given value. */
    maxAtmospheringSpeed_lte?: number

    /** All values greater than the given value. */
    maxAtmospheringSpeed_gt?: number

    /** All values greater than or equal the given value. */
    maxAtmospheringSpeed_gte?: number

    mglt?: number

    /** All values that are not equal to given value. */
    mglt_not?: number

    /** All values that are contained in given list. */
    mglt_in?: number[]

    /** All values that are not contained in given list. */
    mglt_not_in?: number[]

    /** All values less than the given value. */
    mglt_lt?: number

    /** All values less than or equal the given value. */
    mglt_lte?: number

    /** All values greater than the given value. */
    mglt_gt?: number

    /** All values greater than or equal the given value. */
    mglt_gte?: number

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    passengers?: number

    /** All values that are not equal to given value. */
    passengers_not?: number

    /** All values that are contained in given list. */
    passengers_in?: number[]

    /** All values that are not contained in given list. */
    passengers_not_in?: number[]

    /** All values less than the given value. */
    passengers_lt?: number

    /** All values less than or equal the given value. */
    passengers_lte?: number

    /** All values greater than the given value. */
    passengers_gt?: number

    /** All values greater than or equal the given value. */
    passengers_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    pilots_every?: PersonFilter

    pilots_some?: PersonFilter

    pilots_none?: PersonFilter

}

export type StarshipOrderBy = "cargoCapacity_ASC" | "cargoCapacity_DESC" | "class_ASC" | "class_DESC" | "consumables_ASC" | "consumables_DESC" | "costInCredits_ASC" | "costInCredits_DESC" | "createdAt_ASC" | "createdAt_DESC" | "crew_ASC" | "crew_DESC" | "hyperdriveRating_ASC" | "hyperdriveRating_DESC" | "id_ASC" | "id_DESC" | "isPublished_ASC" | "isPublished_DESC" | "length_ASC" | "length_DESC" | "maxAtmospheringSpeed_ASC" | "maxAtmospheringSpeed_DESC" | "mglt_ASC" | "mglt_DESC" | "name_ASC" | "name_DESC" | "passengers_ASC" | "passengers_DESC" | "updatedAt_ASC" | "updatedAt_DESC"

/** A Vehicle is a single transport craft that does not have hyperdrive capability. */
export type Vehicle = {
    /** The maximum number of kilograms that this vehicle can transport. */
    cargoCapacity?: number

    /**  The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
    class?: string

    /** The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply. */
    consumables?: string

    /** The cost of this vehicle new, in Galactic Credits. */
    costInCredits?: number

    createdAt: DateTime

    /** The number of personnel needed to run or pilot this vehicle. */
    crew?: number

    films(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Film[] | null

    id: string

    /** indicates if the record is published */
    isPublished: boolean

    /**  The length of this vehicle in meters. */
    length?: number

    /** The manufacturer of this vehicle. */
    manufacturer?: string[]

    /** The maximum speed of this vehicle in the atmosphere. */
    maxAtmospheringSpeed?: number

    /** The model or official name of this vehicle. Such as "All-Terrain Attack Transport". */
    model?: string

    /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike". */
    name: string

    /** The number of non-essential people this vehicle can transport. */
    passengers?: number

    pilots(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): Person[] | null

    updatedAt: DateTime

    /** Meta information about the query. */
    _filmsMeta(args: { filter?: FilmFilter, orderBy?: FilmOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

    /** Meta information about the query. */
    _pilotsMeta(args: { filter?: PersonFilter, orderBy?: PersonOrderBy, skip?: number, after?: string, before?: string, first?: number, last?: number }): _QueryMeta

}

export type VehicleFilter = {
    /** Logical AND on all given filters. */
    AND?: VehicleFilter[]

    /** Logical OR on all given filters. */
    OR?: VehicleFilter[]

    cargoCapacity?: number

    /** All values that are not equal to given value. */
    cargoCapacity_not?: number

    /** All values that are contained in given list. */
    cargoCapacity_in?: number[]

    /** All values that are not contained in given list. */
    cargoCapacity_not_in?: number[]

    /** All values less than the given value. */
    cargoCapacity_lt?: number

    /** All values less than or equal the given value. */
    cargoCapacity_lte?: number

    /** All values greater than the given value. */
    cargoCapacity_gt?: number

    /** All values greater than or equal the given value. */
    cargoCapacity_gte?: number

    class?: string

    /** All values that are not equal to given value. */
    class_not?: string

    /** All values that are contained in given list. */
    class_in?: string[]

    /** All values that are not contained in given list. */
    class_not_in?: string[]

    /** All values less than the given value. */
    class_lt?: string

    /** All values less than or equal the given value. */
    class_lte?: string

    /** All values greater than the given value. */
    class_gt?: string

    /** All values greater than or equal the given value. */
    class_gte?: string

    /** All values containing the given string. */
    class_contains?: string

    /** All values not containing the given string. */
    class_not_contains?: string

    /** All values starting with the given string. */
    class_starts_with?: string

    /** All values not starting with the given string. */
    class_not_starts_with?: string

    /** All values ending with the given string. */
    class_ends_with?: string

    /** All values not ending with the given string. */
    class_not_ends_with?: string

    consumables?: string

    /** All values that are not equal to given value. */
    consumables_not?: string

    /** All values that are contained in given list. */
    consumables_in?: string[]

    /** All values that are not contained in given list. */
    consumables_not_in?: string[]

    /** All values less than the given value. */
    consumables_lt?: string

    /** All values less than or equal the given value. */
    consumables_lte?: string

    /** All values greater than the given value. */
    consumables_gt?: string

    /** All values greater than or equal the given value. */
    consumables_gte?: string

    /** All values containing the given string. */
    consumables_contains?: string

    /** All values not containing the given string. */
    consumables_not_contains?: string

    /** All values starting with the given string. */
    consumables_starts_with?: string

    /** All values not starting with the given string. */
    consumables_not_starts_with?: string

    /** All values ending with the given string. */
    consumables_ends_with?: string

    /** All values not ending with the given string. */
    consumables_not_ends_with?: string

    costInCredits?: number

    /** All values that are not equal to given value. */
    costInCredits_not?: number

    /** All values that are contained in given list. */
    costInCredits_in?: number[]

    /** All values that are not contained in given list. */
    costInCredits_not_in?: number[]

    /** All values less than the given value. */
    costInCredits_lt?: number

    /** All values less than or equal the given value. */
    costInCredits_lte?: number

    /** All values greater than the given value. */
    costInCredits_gt?: number

    /** All values greater than or equal the given value. */
    costInCredits_gte?: number

    createdAt?: DateTime

    /** All values that are not equal to given value. */
    createdAt_not?: DateTime

    /** All values that are contained in given list. */
    createdAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    createdAt_not_in?: DateTime[]

    /** All values less than the given value. */
    createdAt_lt?: DateTime

    /** All values less than or equal the given value. */
    createdAt_lte?: DateTime

    /** All values greater than the given value. */
    createdAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    createdAt_gte?: DateTime

    crew?: number

    /** All values that are not equal to given value. */
    crew_not?: number

    /** All values that are contained in given list. */
    crew_in?: number[]

    /** All values that are not contained in given list. */
    crew_not_in?: number[]

    /** All values less than the given value. */
    crew_lt?: number

    /** All values less than or equal the given value. */
    crew_lte?: number

    /** All values greater than the given value. */
    crew_gt?: number

    /** All values greater than or equal the given value. */
    crew_gte?: number

    id?: string

    /** All values that are not equal to given value. */
    id_not?: string

    /** All values that are contained in given list. */
    id_in?: string[]

    /** All values that are not contained in given list. */
    id_not_in?: string[]

    /** All values less than the given value. */
    id_lt?: string

    /** All values less than or equal the given value. */
    id_lte?: string

    /** All values greater than the given value. */
    id_gt?: string

    /** All values greater than or equal the given value. */
    id_gte?: string

    /** All values containing the given string. */
    id_contains?: string

    /** All values not containing the given string. */
    id_not_contains?: string

    /** All values starting with the given string. */
    id_starts_with?: string

    /** All values not starting with the given string. */
    id_not_starts_with?: string

    /** All values ending with the given string. */
    id_ends_with?: string

    /** All values not ending with the given string. */
    id_not_ends_with?: string

    isPublished?: boolean

    /** All values that are not equal to given value. */
    isPublished_not?: boolean

    length?: number

    /** All values that are not equal to given value. */
    length_not?: number

    /** All values that are contained in given list. */
    length_in?: number[]

    /** All values that are not contained in given list. */
    length_not_in?: number[]

    /** All values less than the given value. */
    length_lt?: number

    /** All values less than or equal the given value. */
    length_lte?: number

    /** All values greater than the given value. */
    length_gt?: number

    /** All values greater than or equal the given value. */
    length_gte?: number

    maxAtmospheringSpeed?: number

    /** All values that are not equal to given value. */
    maxAtmospheringSpeed_not?: number

    /** All values that are contained in given list. */
    maxAtmospheringSpeed_in?: number[]

    /** All values that are not contained in given list. */
    maxAtmospheringSpeed_not_in?: number[]

    /** All values less than the given value. */
    maxAtmospheringSpeed_lt?: number

    /** All values less than or equal the given value. */
    maxAtmospheringSpeed_lte?: number

    /** All values greater than the given value. */
    maxAtmospheringSpeed_gt?: number

    /** All values greater than or equal the given value. */
    maxAtmospheringSpeed_gte?: number

    model?: string

    /** All values that are not equal to given value. */
    model_not?: string

    /** All values that are contained in given list. */
    model_in?: string[]

    /** All values that are not contained in given list. */
    model_not_in?: string[]

    /** All values less than the given value. */
    model_lt?: string

    /** All values less than or equal the given value. */
    model_lte?: string

    /** All values greater than the given value. */
    model_gt?: string

    /** All values greater than or equal the given value. */
    model_gte?: string

    /** All values containing the given string. */
    model_contains?: string

    /** All values not containing the given string. */
    model_not_contains?: string

    /** All values starting with the given string. */
    model_starts_with?: string

    /** All values not starting with the given string. */
    model_not_starts_with?: string

    /** All values ending with the given string. */
    model_ends_with?: string

    /** All values not ending with the given string. */
    model_not_ends_with?: string

    name?: string

    /** All values that are not equal to given value. */
    name_not?: string

    /** All values that are contained in given list. */
    name_in?: string[]

    /** All values that are not contained in given list. */
    name_not_in?: string[]

    /** All values less than the given value. */
    name_lt?: string

    /** All values less than or equal the given value. */
    name_lte?: string

    /** All values greater than the given value. */
    name_gt?: string

    /** All values greater than or equal the given value. */
    name_gte?: string

    /** All values containing the given string. */
    name_contains?: string

    /** All values not containing the given string. */
    name_not_contains?: string

    /** All values starting with the given string. */
    name_starts_with?: string

    /** All values not starting with the given string. */
    name_not_starts_with?: string

    /** All values ending with the given string. */
    name_ends_with?: string

    /** All values not ending with the given string. */
    name_not_ends_with?: string

    passengers?: number

    /** All values that are not equal to given value. */
    passengers_not?: number

    /** All values that are contained in given list. */
    passengers_in?: number[]

    /** All values that are not contained in given list. */
    passengers_not_in?: number[]

    /** All values less than the given value. */
    passengers_lt?: number

    /** All values less than or equal the given value. */
    passengers_lte?: number

    /** All values greater than the given value. */
    passengers_gt?: number

    /** All values greater than or equal the given value. */
    passengers_gte?: number

    updatedAt?: DateTime

    /** All values that are not equal to given value. */
    updatedAt_not?: DateTime

    /** All values that are contained in given list. */
    updatedAt_in?: DateTime[]

    /** All values that are not contained in given list. */
    updatedAt_not_in?: DateTime[]

    /** All values less than the given value. */
    updatedAt_lt?: DateTime

    /** All values less than or equal the given value. */
    updatedAt_lte?: DateTime

    /** All values greater than the given value. */
    updatedAt_gt?: DateTime

    /** All values greater than or equal the given value. */
    updatedAt_gte?: DateTime

    films_every?: FilmFilter

    films_some?: FilmFilter

    films_none?: FilmFilter

    pilots_every?: PersonFilter

    pilots_some?: PersonFilter

    pilots_none?: PersonFilter

}

export type VehicleOrderBy = "cargoCapacity_ASC" | "cargoCapacity_DESC" | "class_ASC" | "class_DESC" | "consumables_ASC" | "consumables_DESC" | "costInCredits_ASC" | "costInCredits_DESC" | "createdAt_ASC" | "createdAt_DESC" | "crew_ASC" | "crew_DESC" | "id_ASC" | "id_DESC" | "isPublished_ASC" | "isPublished_DESC" | "length_ASC" | "length_DESC" | "maxAtmospheringSpeed_ASC" | "maxAtmospheringSpeed_DESC" | "model_ASC" | "model_DESC" | "name_ASC" | "name_DESC" | "passengers_ASC" | "passengers_DESC" | "updatedAt_ASC" | "updatedAt_DESC"

/** Meta information about the query. */
export type _QueryMeta = {
    count: number

}

