export const url = "https://api.graphloc.com/graphql"

/** GeoLocation API provided by GraphLoc.com */
export type Query = {
    /** Receives an 'ip' as argument and returns an object with location data */
    getLocation(args: { ip: string }): locdata | null

}

/** Object including all location data available for a given IP address */
export type locdata = {
    city?: city

    continent?: continent

    country?: country

    location?: location

    postal?: postal

    registered_country?: registered_country

    subdivisions?: subdivisions

}

/** Object including city data */
export type city = {
    geoname_id?: string

    names?: cityNames

}

/** City names in different languages */
export type cityNames = {
    de?: string

    en?: string

    es?: string

    fr?: string

    ja?: string

    ru?: string

}

/** Object including continent data */
export type continent = {
    code?: string

    geoname_id?: string

    names?: continentNames

}

/** Continent names in different languages */
export type continentNames = {
    de?: string

    en?: string

    es?: string

    fr?: string

    ja?: string

    ru?: string

}

/** Object including country data */
export type country = {
    iso_code?: string

    geoname_id?: string

    names?: countryNames

}

/** Country names in different languages */
export type countryNames = {
    de?: string

    en?: string

    es?: string

    fr?: string

    ja?: string

    ru?: string

}

/** Object including location data */
export type location = {
    latitude?: string

    longitude?: string

    metro_code?: string

    time_zone?: string

    accuracy_radius?: string

    names?: locationNames

}

/** Location names in different languages */
export type locationNames = {
    de?: string

    en?: string

    es?: string

    fr?: string

    ja?: string

    ru?: string

}

/** Postal code number */
export type postal = {
    code?: string

}

/** Country where the ip address has been registered */
export type registered_country = {
    geoname_id?: string

    iso_code?: string

    names?: registered_countryNames

}

/** Registered country names in different languages */
export type registered_countryNames = {
    de?: string

    en?: string

    es?: string

    fr?: string

    ja?: string

    ru?: string

}

/** Object including subdivision data */
export type subdivisions = {
    geoname_id?: string

    iso_code?: string

    names?: subdivisionsNames

}

/** Subdivision names in different languages */
export type subdivisionsNames = {
    de?: string

    en?: string

    es?: string

    fr?: string

    ja?: string

    ru?: string

}