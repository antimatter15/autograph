export const url = "https://countries.trevorblades.com/"

export type Query = {
    continents?: Continent[]

    continent(args: { code?: string }): Continent | null

    countries?: Country[]

    country(args: { code?: string }): Country | null

    languages?: Language[]

    language(args: { code?: string }): Language | null

}

export type Continent = {
    code?: string

    name?: string

}

export type Country = {
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

export type Language = {
    code?: string

    name?: string

    native?: string

    rtl?: number

}