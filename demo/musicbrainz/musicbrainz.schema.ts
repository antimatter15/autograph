type GQLType = {
    /** The name of the object type */
    __typename: string
}

/** The query root, from which multiple types of MusicBrainz
requests can be made. */
export type Query = GQLType & {
    /** Perform a lookup of a MusicBrainz entity by its MBID. */
    lookup?: LookupQuery
    /** Browse all MusicBrainz entities directly linked to another entity. */
    browse?: BrowseQuery
    /** Search for MusicBrainz entities using Lucene query syntax. */
    search?: SearchQuery
    /** Fetches an object given its ID */
    node(args: { id: ID }): Node | undefined
    /** A query for data on [Last.fm](https://www.last.fm/) that is not connected
to any particular MusicBrainz entity. This field is provided by the
Last.fm extension. */
    lastFM?: LastFMQuery
    spotify: SpotifyQuery

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** A lookup of an individual MusicBrainz entity by its MBID. */
export type LookupQuery = GQLType & {
    /** Look up a specific area by its MBID. */
    area(args: { mbid: MBID }): Area | undefined
    /** Look up a specific artist by its MBID. */
    artist(args: { mbid: MBID }): Artist | undefined
    /** Look up a specific collection by its MBID. */
    collection(args: { mbid: MBID }): Collection | undefined
    /** Look up a specific physical disc by its disc ID. */
    disc(args: { discID: DiscID }): Disc | undefined
    /** Look up a specific event by its MBID. */
    event(args: { mbid: MBID }): Event | undefined
    /** Look up a specific instrument by its MBID. */
    instrument(args: { mbid: MBID }): Instrument | undefined
    /** Look up a specific label by its MBID. */
    label(args: { mbid: MBID }): Label | undefined
    /** Look up a specific place by its MBID. */
    place(args: { mbid: MBID }): Place | undefined
    /** Look up a specific recording by its MBID. */
    recording(args: { mbid: MBID }): Recording | undefined
    /** Look up a specific release by its MBID. */
    release(args: { mbid: MBID }): Release | undefined
    /** Look up a specific release group by its MBID. */
    releaseGroup(args: { mbid: MBID }): ReleaseGroup | undefined
    /** Look up a specific series by its MBID. */
    series(args: { mbid: MBID }): Series | undefined
    /** Look up a specific URL by its MBID. */
    url(args: { mbid?: MBID; resource?: URLString }): URL | undefined
    /** Look up a specific work by its MBID. */
    work(args: { mbid: MBID }): Work | undefined
}

/** The MBID scalar represents MusicBrainz identifiers, which are
36-character UUIDs. */
export type MBID = any

/** [Areas](https://musicbrainz.org/doc/Area) are geographic regions
or settlements (countries, cities, or the like). */
export type Area = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front). */
    sortName?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** [ISO 3166 codes](https://en.wikipedia.org/wiki/ISO_3166) are
the codes assigned by ISO to countries and subdivisions. */
    isoCodes(args: { standard?: string }): string[] | undefined
    /** The type of area (country, city, etc. – see the [possible
values](https://musicbrainz.org/doc/Area)). */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** A list of artists linked to this entity. */
    artists(args: { after?: string; first?: Int }): ArtistConnection | undefined
    /** A list of events linked to this entity. */
    events(args: { after?: string; first?: Int }): EventConnection | undefined
    /** A list of labels linked to this entity. */
    labels(args: { after?: string; first?: Int }): LabelConnection | undefined
    /** A list of places linked to this entity. */
    places(args: { after?: string; first?: Int }): PlaceConnection | undefined
    /** A list of releases linked to this entity. */
    releases(args: {
        type?: ReleaseGroupType[]
        status?: ReleaseStatus[]
        after?: string
        first?: Int
    }): ReleaseConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** Chart data available for this area on [Last.fm](https://www.last.fm/), if
the area represents a country with an [ISO 3166 code](https://en.wikipedia.org/wiki/ISO_3166).
This field is provided by the Last.fm extension. */
    lastFM?: LastFMCountry
}

/** An object with an ID */
export interface Node extends GQLType {
    /** The id of the object. */
    id: ID
    /** Use `asArea` to access fields on the underlying concrete type. */
    asArea: Area
    /** Use `asArtist` to access fields on the underlying concrete type. */
    asArtist: Artist
    /** Use `asRecording` to access fields on the underlying concrete type. */
    asRecording: Recording
    /** Use `asRelease` to access fields on the underlying concrete type. */
    asRelease: Release
    /** Use `asDisc` to access fields on the underlying concrete type. */
    asDisc: Disc
    /** Use `asLabel` to access fields on the underlying concrete type. */
    asLabel: Label
    /** Use `asCollection` to access fields on the underlying concrete type. */
    asCollection: Collection
    /** Use `asEvent` to access fields on the underlying concrete type. */
    asEvent: Event
    /** Use `asInstrument` to access fields on the underlying concrete type. */
    asInstrument: Instrument
    /** Use `asPlace` to access fields on the underlying concrete type. */
    asPlace: Place
    /** Use `asReleaseGroup` to access fields on the underlying concrete type. */
    asReleaseGroup: ReleaseGroup
    /** Use `asSeries` to access fields on the underlying concrete type. */
    asSeries: Series
    /** Use `asWork` to access fields on the underlying concrete type. */
    asWork: Work
    /** Use `asURL` to access fields on the underlying concrete type. */
    asURL: URL
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** An entity in the MusicBrainz schema. */
export interface Entity extends GQLType {
    /** The MBID of the entity. */
    mbid: MBID
    /** Use `asArea` to access fields on the underlying concrete type. */
    asArea: Area
    /** Use `asArtist` to access fields on the underlying concrete type. */
    asArtist: Artist
    /** Use `asRecording` to access fields on the underlying concrete type. */
    asRecording: Recording
    /** Use `asRelease` to access fields on the underlying concrete type. */
    asRelease: Release
    /** Use `asTrack` to access fields on the underlying concrete type. */
    asTrack: Track
    /** Use `asLabel` to access fields on the underlying concrete type. */
    asLabel: Label
    /** Use `asCollection` to access fields on the underlying concrete type. */
    asCollection: Collection
    /** Use `asEvent` to access fields on the underlying concrete type. */
    asEvent: Event
    /** Use `asInstrument` to access fields on the underlying concrete type. */
    asInstrument: Instrument
    /** Use `asPlace` to access fields on the underlying concrete type. */
    asPlace: Place
    /** Use `asReleaseGroup` to access fields on the underlying concrete type. */
    asReleaseGroup: ReleaseGroup
    /** Use `asSeries` to access fields on the underlying concrete type. */
    asSeries: Series
    /** Use `asWork` to access fields on the underlying concrete type. */
    asWork: Work
    /** Use `asURL` to access fields on the underlying concrete type. */
    asURL: URL
}

/** [Aliases](https://musicbrainz.org/doc/Aliases) are variant names
that are mostly used as search help: if a search matches an entity’s alias, the
entity will be given as a result – even if the actual name wouldn’t be. */
export type Alias = GQLType & {
    /** The aliased name of the entity. */
    name?: string
    /** The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front). */
    sortName?: string
    /** The locale (language and/or country) in which the alias is
used. */
    locale?: Locale
    /** Whether this is the main alias for the entity in the
specified locale (this could mean the most recent or the most common). */
    primary?: boolean
    /** The type or purpose of the alias – whether it is a variant,
search hint, etc. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
}

/** Language code, optionally with country and encoding. */
export type Locale = any

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

/** A connection to a list of items. */
export type ArtistConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: ArtistEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Artist[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
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
export type ArtistEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Artist
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** An [artist](https://musicbrainz.org/doc/Artist) is generally a
musician, group of musicians, or other music professional (like a producer or
engineer). Occasionally, it can also be a non-musical person (like a
photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character. */
export type Artist = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front). */
    sortName?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** The country with which an artist is primarily identified. It
is often, but not always, its birth/formation country. */
    country?: string
    /** The area with which an artist is primarily identified. It
is often, but not always, its birth/formation country. */
    area?: Area
    /** The area in which an artist began their career (or where
they were born, if the artist is a person). */
    beginArea?: Area
    /** The area in which an artist ended their career (or where
they died, if the artist is a person). */
    endArea?: Area
    /** The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity. */
    lifeSpan?: LifeSpan
    /** Whether a person or character identifies as male, female, or
neither. Groups do not have genders. */
    gender?: string
    /** The MBID associated with the value of the `gender`
field. */
    genderID?: MBID
    /** Whether an artist is a person, a group, or something else. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** List of [Interested Parties Information](https://musicbrainz.org/doc/IPI)
(IPI) codes for the artist. */
    ipis?: IPI[]
    /** List of [International Standard Name Identifier](https://musicbrainz.org/doc/ISNI)
(ISNI) codes for the artist. */
    isnis?: ISNI[]
    /** A list of recordings linked to this entity. */
    recordings(args: { after?: string; first?: Int }): RecordingConnection | undefined
    /** A list of releases linked to this entity. */
    releases(args: {
        type?: ReleaseGroupType[]
        status?: ReleaseStatus[]
        after?: string
        first?: Int
    }): ReleaseConnection | undefined
    /** A list of release groups linked to this entity. */
    releaseGroups(args: {
        type?: ReleaseGroupType[]
        after?: string
        first?: Int
    }): ReleaseGroupConnection | undefined
    /** A list of works linked to this entity. */
    works(args: { after?: string; first?: Int }): WorkConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** The rating users have given to this entity. */
    rating?: Rating
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** Images of the artist from [fanart.tv](https://fanart.tv/).
This field is provided by the fanart.tv extension. */
    fanArt?: FanArtArtist
    /** Artist images found at MediaWiki URLs in the artist’s URL relationships.
Defaults to URL relationships with the type “image”.
This field is provided by the MediaWiki extension. */
    mediaWikiImages(args: { type?: string }): MediaWikiImage[]
    /** Data about the artist from [TheAudioDB](http://www.theaudiodb.com/), a good
source of biographical information and images.
This field is provided by TheAudioDB extension. */
    theAudioDB?: TheAudioDBArtist
    /** Information about the artist on Discogs. */
    discogs?: DiscogsArtist
    /** Data about the artist from [Last.fm](https://www.last.fm/), a good source
for measuring popularity via listener and play counts. This field is
provided by the Last.fm extension. */
    lastFM?: LastFMArtist
    /** The artist’s entry on Spotify. */
    spotify?: SpotifyArtist
}

/** Fields indicating the begin and end date of an entity’s
lifetime, including whether it has ended (even if the date is unknown). */
export type LifeSpan = GQLType & {
    /** The start date of the entity’s life span. */
    begin?: Date
    /** The end date of the entity’s life span. */
    end?: Date
    /** Whether or not the entity’s life span has ended. */
    ended?: boolean
}

/** Year, month (optional), and day (optional) in YYYY-MM-DD format. */
export type Date = any

/** An [Interested Parties Information](https://musicbrainz.org/doc/IPI)
(IPI) code is an identifying number assigned by the CISAC database for musical
rights management. */
export type IPI = any

/** The [International Standard Name Identifier](https://musicbrainz.org/doc/ISNI)
(ISNI) is an ISO standard for uniquely identifying the public identities of
contributors to media content. */
export type ISNI = any

/** A connection to a list of items. */
export type RecordingConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: RecordingEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Recording[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type RecordingEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Recording
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** A [recording](https://musicbrainz.org/doc/Recording) is an
entity in MusicBrainz which can be linked to tracks on releases. Each track must
always be associated with a single recording, but a recording can be linked to
any number of tracks.

A recording represents distinct audio that has been used to produce at least one
released track through copying or mastering. A recording itself is never
produced solely through copying or mastering.

Generally, the audio represented by a recording corresponds to the audio at a
stage in the production process before any final mastering but after any editing
or mixing. */
export type Recording = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official title of the entity. */
    title?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** The main credited artist(s). */
    /** @deprecated The `artistCredit` field has been renamed to
`artistCredits`, since it is a list of credits and is referred to in the
plural form throughout the MusicBrainz documentation. This field is deprecated
and will be removed in a major release in the future. Use the equivalent
`artistCredits` field. */
    artistCredit?: ArtistCredit[]
    /** The main credited artist(s). */
    artistCredits?: ArtistCredit[]
    /** A list of [International Standard Recording Codes](https://musicbrainz.org/doc/ISRC)
(ISRCs) for this recording. */
    isrcs?: ISRC[]
    /** An approximation to the length of the recording, calculated
from the lengths of the tracks using it. */
    length?: Duration
    /** Whether this is a video recording. */
    video?: boolean
    /** A list of artists linked to this entity. */
    artists(args: { after?: string; first?: Int }): ArtistConnection | undefined
    /** A list of releases linked to this entity. */
    releases(args: {
        type?: ReleaseGroupType[]
        status?: ReleaseStatus[]
        after?: string
        first?: Int
    }): ReleaseConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** The rating users have given to this entity. */
    rating?: Rating
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** Data about the recording from [TheAudioDB](http://www.theaudiodb.com/).
This field is provided by TheAudioDB extension. */
    theAudioDB?: TheAudioDBTrack
    /** Data about the recording from [Last.fm](https://www.last.fm/), a good
source for measuring popularity via listener and play counts. This field
is provided by the Last.fm extension. */
    lastFM?: LastFMTrack
    /** The recording’s entry on Spotify. */
    spotify(args: { strategy?: SpotifyMatchStrategy[] }): SpotifyTrack | undefined
}

/** [Artist credits](https://musicbrainz.org/doc/Artist_Credits)
indicate who is the main credited artist (or artists) for releases, release
groups, tracks, and recordings, and how they are credited. They consist of
artists, with (optionally) their names as credited in the specific release,
track, etc., and join phrases between them. */
export type ArtistCredit = GQLType & {
    /** The entity representing the artist referenced in the
credits. */
    artist?: Artist
    /** The name of the artist as credited in the specific release,
track, etc. */
    name?: string
    /** Join phrases might include words and/or punctuation to
separate artist names as they appear on the release, track, etc. */
    joinPhrase?: string
}

/** The [International Standard Recording Code](https://musicbrainz.org/doc/ISRC)
(ISRC) is an identification system for audio and music video recordings. It is
standarized by the [IFPI](http://www.ifpi.org/) in ISO 3901:2001 and used by
IFPI members to assign a unique identifier to every distinct sound recording
they release. An ISRC identifies a particular [sound recording](https://musicbrainz.org/doc/Recording),
not the song itself. Therefore, different recordings, edits, remixes and
remasters of the same song will each be assigned their own ISRC. However, note
that same recording should carry the same ISRC in all countries/territories.
Songs are identified by analogous [International Standard Musical Work Codes](https://musicbrainz.org/doc/ISWC)
(ISWCs). */
export type ISRC = any

/** A length of time, in milliseconds. */
export type Duration = any

/** A type used to describe release groups, e.g. album, single, EP,
etc. */
export type ReleaseGroupType =
    | 'ALBUM'
    | 'SINGLE'
    | 'EP'
    | 'OTHER'
    | 'BROADCAST'
    | 'COMPILATION'
    | 'SOUNDTRACK'
    | 'SPOKENWORD'
    | 'INTERVIEW'
    | 'AUDIOBOOK'
    | 'LIVE'
    | 'REMIX'
    | 'DJMIX'
    | 'MIXTAPE'
    | 'DEMO'
    | 'NAT'

/** A type used to describe the status of releases, e.g. official,
bootleg, etc. */
export type ReleaseStatus = 'OFFICIAL' | 'PROMOTION' | 'BOOTLEG' | 'PSEUDORELEASE'

/** A connection to a list of items. */
export type ReleaseConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: ReleaseEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Release[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type ReleaseEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Release
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** A [release](https://musicbrainz.org/doc/Release) represents the
unique release (i.e. issuing) of a product on a specific date with specific
release information such as the country, label, barcode, packaging, etc. If you
walk into a store and purchase an album or single, they’re each represented in
MusicBrainz as one release. */
export type Release = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official title of the entity. */
    title?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** The main credited artist(s). */
    /** @deprecated The `artistCredit` field has been renamed to
`artistCredits`, since it is a list of credits and is referred to in the
plural form throughout the MusicBrainz documentation. This field is deprecated
and will be removed in a major release in the future. Use the equivalent
`artistCredits` field. */
    artistCredit?: ArtistCredit[]
    /** The main credited artist(s). */
    artistCredits?: ArtistCredit[]
    /** The release events for this release. */
    releaseEvents?: ReleaseEvent[]
    /** The [release date](https://musicbrainz.org/doc/Release/Date)
is the date in which a release was made available through some sort of
distribution mechanism. */
    date?: Date
    /** The country in which the release was issued. */
    country?: string
    /** The [Amazon Standard Identification Number](https://musicbrainz.org/doc/ASIN)
of the release. */
    asin?: ASIN
    /** The [barcode](https://en.wikipedia.org/wiki/Barcode), if the
release has one. The most common types found on releases are 12-digit
[UPCs](https://en.wikipedia.org/wiki/Universal_Product_Code) and 13-digit
[EANs](https://en.wikipedia.org/wiki/International_Article_Number). */
    barcode?: string
    /** The status describes how “official” a release is. */
    status?: ReleaseStatus
    /** The MBID associated with the value of the `status`
field. */
    statusID?: MBID
    /** The physical packaging that accompanies the release. See
the [list of packaging](https://musicbrainz.org/doc/Release/Packaging) for more
information. */
    packaging?: string
    /** The MBID associated with the value of the `packaging`
field. */
    packagingID?: MBID
    /** Data quality indicates how good the data for a release is.
It is not a mark of how good or bad the music itself is – for that, use
[ratings](https://musicbrainz.org/doc/Rating_System). */
    quality?: string
    /** The media on which the release was distributed. */
    media?: Medium[]
    /** A list of artists linked to this entity. */
    artists(args: { after?: string; first?: Int }): ArtistConnection | undefined
    /** A list of labels linked to this entity. */
    labels(args: { after?: string; first?: Int }): LabelConnection | undefined
    /** A list of recordings linked to this entity. */
    recordings(args: { after?: string; first?: Int }): RecordingConnection | undefined
    /** A list of release groups linked to this entity. */
    releaseGroups(args: {
        type?: ReleaseGroupType[]
        after?: string
        first?: Int
    }): ReleaseGroupConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** An object containing a list and summary of the cover art images that are
present for this release from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive).
This field is provided by the Cover Art Archive extension. */
    coverArtArchive?: CoverArtArchiveRelease
    /** Information about the release on Discogs. */
    discogs?: DiscogsRelease
    /** Data about the release from [Last.fm](https://www.last.fm/), a good source
for measuring popularity via listener and play counts. This field is
provided by the Last.fm extension. */
    lastFM?: LastFMAlbum
    /** The release’s entry on Spotify. */
    spotify(args: { strategy?: SpotifyMatchStrategy[] }): SpotifyAlbum | undefined
}

/** The date on which a release was issued in a country/region with
a particular label, catalog number, barcode, and format. */
export type ReleaseEvent = GQLType & {
    area?: Area
    date?: Date
}

/** An [Amazon Standard Identification Number](https://musicbrainz.org/doc/ASIN)
(ASIN) is a 10-character alphanumeric unique identifier assigned by Amazon.com
and its partners for product identification within the Amazon organization. */
export type ASIN = any

/** A medium is the actual physical medium the audio content is
stored upon. This means that each CD in a multi-disc release will be entered as
separate mediums within the release, and that both sides of a vinyl record or
cassette will exist on one medium. Mediums have a format (e.g. CD, DVD, vinyl,
cassette) and can optionally also have a title. */
export type Medium = GQLType & {
    /** The title of this particular medium. */
    title?: string
    /** The [format](https://musicbrainz.org/doc/Release/Format) of
the medium (e.g. CD, DVD, vinyl, cassette). */
    format?: string
    /** The MBID associated with the value of the `format`
field. */
    formatID?: MBID
    /** The order of this medium in the release (for example, in a
multi-disc release). */
    position?: Int
    /** The number of audio tracks on this medium. */
    trackCount?: Int
    /** A list of physical discs and their disc IDs for this medium. */
    discs?: Disc[]
    /** The list of tracks on the given media. */
    tracks?: Track[]
}

/** Information about the physical CD and releases associated with a
particular [disc ID](https://musicbrainz.org/doc/Disc_ID). */
export type Disc = GQLType & {
    /** The ID of an object */
    id: ID
    /** The [disc ID](https://musicbrainz.org/doc/Disc_ID) of this disc. */
    discID: DiscID
    /** The number of offsets (tracks) on the disc. */
    offsetCount: Int
    /** The sector offset of each track on the disc. */
    offsets?: Int[]
    /** The sector offset of the lead-out (the end of the disc). */
    sectors: Int
    /** The list of releases linked to this disc ID. */
    releases(args: { after?: string; first?: Int }): ReleaseConnection | undefined
}

/** [Disc ID](https://musicbrainz.org/doc/Disc_ID) is the code
number which MusicBrainz uses to link a physical CD to a [release](https://musicbrainz.org/doc/Release)
listing.

A release may have any number of disc IDs, and a disc ID may be linked to
multiple releases. This is because disc ID calculation involves a hash of the
frame offsets of the CD tracks.

Different pressing of a CD often have slightly different frame offsets, and
hence different disc IDs.

Conversely, two different CDs may happen to have exactly the same set of frame
offsets and hence the same disc ID. */
export type DiscID = any

/** A track is the way a recording is represented on a particular
  release (or, more exactly, on a particular medium). Every track has a title
  (see the guidelines for titles) and is credited to one or more artists. */
export type Track = GQLType & {
    /** The MBID of the entity. */
    mbid: MBID
    /** The official title of the entity. */
    title?: string
    /** The track’s position on the overall release (including all
tracks from all discs). */
    position?: Int
    /** The track number, which may include information about the
disc or side it appears on, e.g. “A1” or “B3”. */
    number?: string
    /** The length of the track. */
    length?: Duration
    /** The recording that appears on the track. */
    recording?: Recording
}

/** A connection to a list of items. */
export type LabelConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: LabelEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Label[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type LabelEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Label
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** [Labels](https://musicbrainz.org/doc/Label) represent mostly
(but not only) imprints. To a lesser extent, a label entity may be created to
represent a record company. */
export type Label = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** The string to use for the purpose of ordering by name (for
example, by moving articles like ‘the’ to the end or a person’s last name to
the front). */
    sortName?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** The country of origin for the label. */
    country?: string
    /** The area in which the label is based. */
    area?: Area
    /** The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity. */
    lifeSpan?: LifeSpan
    /** The [“LC” code](https://musicbrainz.org/doc/Label/Label_Code)
of the label. */
    labelCode?: Int
    /** List of [Interested Parties Information](https://musicbrainz.org/doc/IPI)
codes for the label. */
    ipis?: IPI[]
    /** A type describing the main activity of the label, e.g.
imprint, production, distributor, rights society, etc. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** A list of releases linked to this entity. */
    releases(args: {
        type?: ReleaseGroupType[]
        status?: ReleaseStatus[]
        after?: string
        first?: Int
    }): ReleaseConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** The rating users have given to this entity. */
    rating?: Rating
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** Images of the label from [fanart.tv](https://fanart.tv/).
This field is provided by the fanart.tv extension. */
    fanArt?: FanArtLabel
    /** Label images found at MediaWiki URLs in the label’s URL relationships.
Defaults to URL relationships with the type “logo”.
This field is provided by the MediaWiki extension. */
    mediaWikiImages(args: { type?: string }): MediaWikiImage[]
    /** Information about the label on Discogs. */
    discogs?: DiscogsLabel
}

/** Lists of entity relationships for each entity type. */
export type Relationships = GQLType & {
    /** A list of relationships between these two entity types. */
    areas(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    artists(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    events(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    instruments(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    labels(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    places(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    recordings(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    releases(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    releaseGroups(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    series(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    urls(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
    /** A list of relationships between these two entity types. */
    works(args: {
        direction?: string
        type?: string
        typeID?: MBID
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): RelationshipConnection | undefined
}

/** A connection to a list of items. */
export type RelationshipConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: RelationshipEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Relationship[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type RelationshipEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Relationship
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** [Relationships](https://musicbrainz.org/doc/Relationships) are a
way to represent all the different ways in which entities are connected to each
other and to URLs outside MusicBrainz. */
export type Relationship = GQLType & {
    /** The target entity. */
    target: Entity
    /** The direction of the relationship. */
    direction: string
    /** The type of entity on the receiving end of the relationship. */
    targetType: string
    /** How the source entity was actually credited, if different
from its main (performance) name. */
    sourceCredit?: string
    /** How the target entity was actually credited, if different
from its main (performance) name. */
    targetCredit?: string
    /** The date on which the relationship became applicable. */
    begin?: Date
    /** The date on which the relationship became no longer applicable. */
    end?: Date
    /** Whether the relationship still applies. */
    ended?: boolean
    /** Attributes which modify the relationship. There is a [list
of all attributes](https://musicbrainz.org/relationship-attributes), but the
attributes which are available, and how they should be used, depends on the
relationship type. */
    attributes?: string[]
    /** The type of relationship. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
}

/** A connection to a list of items. */
export type CollectionConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: CollectionEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Collection[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type CollectionEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Collection
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** [Collections](https://musicbrainz.org/doc/Collections) are
lists of entities that users can create. */
export type Collection = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** The username of the editor who created the collection. */
    editor: string
    /** The type of entity listed in the collection. */
    entityType: string
    /** The type of collection. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** The list of areas found in this collection. */
    areas(args: { after?: string; first?: Int }): AreaConnection | undefined
    /** The list of artists found in this collection. */
    artists(args: { after?: string; first?: Int }): ArtistConnection | undefined
    /** The list of events found in this collection. */
    events(args: { after?: string; first?: Int }): EventConnection | undefined
    /** The list of instruments found in this collection. */
    instruments(args: { after?: string; first?: Int }): InstrumentConnection | undefined
    /** The list of labels found in this collection. */
    labels(args: { after?: string; first?: Int }): LabelConnection | undefined
    /** The list of places found in this collection. */
    places(args: { after?: string; first?: Int }): PlaceConnection | undefined
    /** The list of recordings found in this collection. */
    recordings(args: { after?: string; first?: Int }): RecordingConnection | undefined
    /** The list of releases found in this collection. */
    releases(args: {
        type?: ReleaseGroupType[]
        status?: ReleaseStatus[]
        after?: string
        first?: Int
    }): ReleaseConnection | undefined
    /** The list of release groups found in this collection. */
    releaseGroups(args: {
        type?: ReleaseGroupType[]
        after?: string
        first?: Int
    }): ReleaseGroupConnection | undefined
    /** The list of series found in this collection. */
    series(args: { after?: string; first?: Int }): SeriesConnection | undefined
    /** The list of works found in this collection. */
    works(args: { after?: string; first?: Int }): WorkConnection | undefined
}

/** A connection to a list of items. */
export type AreaConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: AreaEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Area[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type AreaEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Area
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** A connection to a list of items. */
export type EventConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: EventEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Event[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type EventEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Event
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** An [event](https://musicbrainz.org/doc/Event) refers to an
organised event which people can attend, and is relevant to MusicBrainz.
Generally this means live performances, like concerts and festivals. */
export type Event = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity. */
    lifeSpan?: LifeSpan
    /** The start time of the event. */
    time?: Time
    /** Whether or not the event took place. */
    cancelled?: boolean
    /** A list of songs performed, optionally including links to
artists and works. See the [setlist documentation](https://musicbrainz.org/doc/Event/Setlist)
for syntax and examples. */
    setlist?: string
    /** What kind of event the event is, e.g. concert, festival, etc. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** The rating users have given to this entity. */
    rating?: Rating
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
}

/** A time of day, in 24-hour hh:mm notation. */
export type Time = any

/** [Ratings](https://musicbrainz.org/doc/Rating_System) allow users
to rate MusicBrainz entities. User may assign a value between 1 and 5; these
values are then aggregated by the server to compute an average community rating
for the entity. */
export type Rating = GQLType & {
    /** The number of votes that have contributed to the rating. */
    voteCount: Int
    /** The average rating value based on the aggregated votes. */
    value?: Float
}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

/** A connection to a list of items. */
export type TagConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: TagEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Tag[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type TagEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Tag
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** [Tags](https://musicbrainz.org/tags) are a way to mark entities
with extra information – for example, the genres that apply to an artist,
release, or recording. */
export type Tag = GQLType & {
    /** The tag label. */
    name: string
    /** How many times this tag has been applied to the entity. */
    count?: Int
}

/** A connection to a list of items. */
export type InstrumentConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: InstrumentEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Instrument[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type InstrumentEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Instrument
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** [Instruments](https://musicbrainz.org/doc/Instrument) are
devices created or adapted to make musical sounds. Instruments are primarily
used in relationships between two other entities. */
export type Instrument = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** A brief description of the main characteristics of the
instrument. */
    description?: string
    /** The type categorises the instrument by the way the sound is
created, similar to the [Hornbostel-Sachs](https://en.wikipedia.org/wiki/Hornbostel%E2%80%93Sachs)
classification. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** Instrument images found at MediaWiki URLs in the instrument’s URL
relationships. Defaults to URL relationships with the type “image”.
This field is provided by the MediaWiki extension. */
    mediaWikiImages(args: { type?: string }): MediaWikiImage[]
}

/** An object describing various properties of an image stored on a MediaWiki
server. The information comes the [MediaWiki imageinfo API](https://www.mediawiki.org/wiki/API:Imageinfo). */
export type MediaWikiImage = GQLType & {
    /** The URL of the actual image file. */
    url: URLString
    /** The URL of the wiki page describing the image. */
    descriptionURL?: URLString
    /** The user who uploaded the file. */
    user?: string
    /** The size of the file in bytes. */
    size?: Int
    /** The pixel width of the image. */
    width?: Int
    /** The pixel height of the image. */
    height?: Int
    /** The canonical title of the file. */
    canonicalTitle?: string
    /** The image title, brief description, or file name. */
    objectName?: string
    /** A description of the image, potentially containing HTML. */
    descriptionHTML?: string
    /** The original date of creation of the image. May be a description rather than
a parseable timestamp, and may contain HTML. */
    originalDateTimeHTML?: string
    /** A list of the categories of the image. */
    categories: string[]
    /** The name of the image author, potentially containing HTML. */
    artistHTML?: string
    /** The source of the image, potentially containing HTML. */
    creditHTML?: string
    /** A short human-readable license name. */
    licenseShortName?: string
    /** A web address where the license is described. */
    licenseURL?: URLString
    /** The full list of values in the `extmetadata` field. */
    metadata: MediaWikiImageMetadata[]
}

/** A web address. */
export type URLString = any

/** An entry in the `extmetadata` field of a MediaWiki image file. */
export type MediaWikiImageMetadata = GQLType & {
    /** The name of the metadata field. */
    name: string
    /** The value of the metadata field. All values will be converted to strings. */
    value?: string
    /** The source of the value. */
    source?: string
}

/** A connection to a list of items. */
export type PlaceConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: PlaceEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Place[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type PlaceEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Place
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** A [place](https://musicbrainz.org/doc/Place) is a venue, studio,
or other place where music is performed, recorded, engineered, etc. */
export type Place = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** The address describes the location of the place using the
standard addressing format for the country it is located in. */
    address?: string
    /** The area entity representing the area, such as the city, in
which the place is located. */
    area?: Area
    /** The geographic coordinates of the place. */
    coordinates?: Coordinates
    /** The begin and end dates of the entity’s existence. Its exact
meaning depends on the type of entity. */
    lifeSpan?: LifeSpan
    /** The type categorises the place based on its primary
function. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** A list of events linked to this entity. */
    events(args: { after?: string; first?: Int }): EventConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** Place images found at MediaWiki URLs in the place’s URL relationships.
Defaults to URL relationships with the type “image”.
This field is provided by the MediaWiki extension. */
    mediaWikiImages(args: { type?: string }): MediaWikiImage[]
}

/** Geographic coordinates described with latitude and longitude. */
export type Coordinates = GQLType & {
    /** The north–south position of a point on the Earth’s surface. */
    latitude?: Degrees
    /** The east–west position of a point on the Earth’s surface. */
    longitude?: Degrees
}

/** Decimal degrees, used for latitude and longitude. */
export type Degrees = any

/** A connection to a list of items. */
export type ReleaseGroupConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: ReleaseGroupEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: ReleaseGroup[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type ReleaseGroupEdge = GQLType & {
    /** The item at the end of the edge */
    node?: ReleaseGroup
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** A [release group](https://musicbrainz.org/doc/Release_Group) is
used to group several different releases into a single logical entity. Every
release belongs to one, and only one release group.

Both release groups and releases are “albums” in a general sense, but with an
important difference: a release is something you can buy as media such as a CD
or a vinyl record, while a release group embraces the overall concept of an
album – it doesn’t matter how many CDs or editions/versions it had. */
export type ReleaseGroup = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official title of the entity. */
    title?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** The main credited artist(s). */
    /** @deprecated The `artistCredit` field has been renamed to
`artistCredits`, since it is a list of credits and is referred to in the
plural form throughout the MusicBrainz documentation. This field is deprecated
and will be removed in a major release in the future. Use the equivalent
`artistCredits` field. */
    artistCredit?: ArtistCredit[]
    /** The main credited artist(s). */
    artistCredits?: ArtistCredit[]
    /** The date of the earliest release in the group. */
    firstReleaseDate?: Date
    /** The [type](https://musicbrainz.org/doc/Release_Group/Type)
of a release group describes what kind of releases the release group represents,
e.g. album, single, soundtrack, compilation, etc. A release group can have a
“main” type and an unspecified number of additional types. */
    primaryType?: ReleaseGroupType
    /** The MBID associated with the value of the `primaryType`
field. */
    primaryTypeID?: MBID
    /** Additional [types](https://musicbrainz.org/doc/Release_Group/Type)
that apply to this release group. */
    secondaryTypes?: ReleaseGroupType[]
    /** The MBIDs associated with the values of the `secondaryTypes`
field. */
    secondaryTypeIDs?: MBID[]
    /** A list of artists linked to this entity. */
    artists(args: { after?: string; first?: Int }): ArtistConnection | undefined
    /** A list of releases linked to this entity. */
    releases(args: {
        type?: ReleaseGroupType[]
        status?: ReleaseStatus[]
        after?: string
        first?: Int
    }): ReleaseConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** The rating users have given to this entity. */
    rating?: Rating
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
    /** The cover art for a release in the release group, obtained from the
[Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive). A
release in the release group will be chosen as representative of the release
group.
This field is provided by the Cover Art Archive extension. */
    coverArtArchive?: CoverArtArchiveRelease
    /** Images of the release group from [fanart.tv](https://fanart.tv/).
This field is provided by the fanart.tv extension. */
    fanArt?: FanArtAlbum
    /** Data about the release group from [TheAudioDB](http://www.theaudiodb.com/),
a good source of descriptive information, reviews, and images.
This field is provided by TheAudioDB extension. */
    theAudioDB?: TheAudioDBAlbum
    /** Information about the release group on Discogs. */
    discogs?: DiscogsMaster
}

/** An object containing a list of the cover art images for a release obtained
from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive),
as well as a summary of what artwork is available. */
export type CoverArtArchiveRelease = GQLType & {
    /** The URL of an image depicting the album cover or “main front” of the release,
i.e. the front of the packaging of the audio recording (or in the case of a
digital release, the image associated with it in a digital media store).

In the MusicBrainz schema, this field is a Boolean value indicating the
presence of a front image, whereas here the value is the URL for the image
itself if one exists. You can check for null if you just want to determine
the presence of an image. */
    front(args: { size?: CoverArtArchiveImageSize }): URLString | undefined
    /** The URL of an image depicting the “main back” of the release, i.e. the back
of the packaging of the audio recording.

In the MusicBrainz schema, this field is a Boolean value indicating the
presence of a back image, whereas here the value is the URL for the image
itself. You can check for null if you just want to determine the presence of
an image. */
    back(args: { size?: CoverArtArchiveImageSize }): URLString | undefined
    /** A list of images depicting the different sides and surfaces of a release’s
media and packaging. */
    images: CoverArtArchiveImage[]
    /** Whether there is artwork present for this release. */
    artwork: boolean
    /** The number of artwork images present for this release. */
    count: Int
    /** The particular release shown in the returned cover art. */
    release?: Release
}

/** The image sizes that may be requested at the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive). */
export type CoverArtArchiveImageSize = 'SMALL' | 'LARGE' | 'FULL'

/** An individual piece of album artwork from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive). */
export type CoverArtArchiveImage = GQLType & {
    /** The Internet Archive’s internal file ID for the image. */
    fileID: string
    /** The URL at which the image can be found. */
    image: URLString
    /** A set of thumbnails for the image. */
    thumbnails: CoverArtArchiveImageThumbnails
    /** Whether this image depicts the “main front” of the release. */
    front: boolean
    /** Whether this image depicts the “main back” of the release. */
    back: boolean
    /** A list of [image types](https://musicbrainz.org/doc/Cover_Art/Types)
describing what part(s) of the release the image includes. */
    types: string[]
    /** The MusicBrainz edit ID. */
    edit?: Int
    /** Whether the image was approved by the MusicBrainz edit system. */
    approved?: boolean
    /** A free-text comment left for the image. */
    comment?: string
}

/** URLs for thumbnails of different sizes for a particular piece of cover art. */
export type CoverArtArchiveImageThumbnails = GQLType & {
    /** The URL of a small version of the cover art, where the maximum dimension is
250px. */
    small?: URLString
    /** The URL of a large version of the cover art, where the maximum dimension is
500px. */
    large?: URLString
}

/** An object containing lists of the different types of release group images from
[fanart.tv](https://fanart.tv/). */
export type FanArtAlbum = GQLType & {
    /** A list of 1000x1000 JPG images of the cover artwork of the release group. */
    albumCovers?: FanArtImage[]
    /** A list of 1000x1000 PNG images of the physical disc media for the release
group, with transparent backgrounds. */
    discImages?: FanArtDiscImage[]
}

/** A single image from [fanart.tv](https://fanart.tv/). */
export type FanArtImage = GQLType & {
    /** The ID of the image on fanart.tv. */
    imageID?: ID
    /** The URL of the image. */
    url(args: { size?: FanArtImageSize }): URLString | undefined
    /** The number of likes the image has received by fanart.tv users. */
    likeCount?: Int
}

/** The image sizes that may be requested at [fanart.tv](https://fanart.tv/). */
export type FanArtImageSize = 'FULL' | 'PREVIEW'

/** A disc image from [fanart.tv](https://fanart.tv/). */
export type FanArtDiscImage = GQLType & {
    /** The ID of the image on fanart.tv. */
    imageID?: ID
    /** The URL of the image. */
    url(args: { size?: FanArtImageSize }): URLString | undefined
    /** The number of likes the image has received by fanart.tv users. */
    likeCount?: Int
    /** The disc number. */
    discNumber?: Int
    /** The width and height of the (square) disc image. */
    size?: Int
}

/** An album on [TheAudioDB](http://www.theaudiodb.com/) corresponding with a
MusicBrainz Release Group. */
export type TheAudioDBAlbum = GQLType & {
    /** TheAudioDB ID of the album. */
    albumID?: ID
    /** TheAudioDB ID of the artist who released the album. */
    artistID?: ID
    /** A description of the album, often available in several languages. */
    description(args: { lang?: string }): string | undefined
    /** A review of the album. */
    review?: string
    /** The worldwide sales figure. */
    salesCount?: Float
    /** The album’s rating as determined by user votes, out of 10. */
    score?: Float
    /** The number of users who voted to determine the album’s score. */
    scoreVotes?: Float
    /** An image of the physical disc media for the album. */
    discImage(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** An image of the spine of the album packaging. */
    spineImage(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** An image of the front of the album packaging. */
    frontImage(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** An image of the back of the album packaging. */
    backImage(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** The primary musical genre of the album (e.g. “Alternative Rock”). */
    genre?: string
    /** The primary musical mood of the album (e.g. “Sad”). */
    mood?: string
    /** The primary musical style of the album (e.g. “Rock/Pop”). */
    style?: string
    /** A rough description of the primary musical speed of the album (e.g. “Medium”). */
    speed?: string
    /** The primary musical theme of the album (e.g. “In Love”). */
    theme?: string
}

/** The image sizes that may be requested at [TheAudioDB](http://www.theaudiodb.com/). */
export type TheAudioDBImageSize = 'FULL' | 'PREVIEW'

/** Master releases group different versions of the same release (for example,
releases in different formats, issued in different countries, re-releases,
etc.). The equivalent of a MusicBrainz release group. */
export type DiscogsMaster = GQLType & {
    /** The ID of the master on Discogs. */
    masterID: ID
    /** The title of the master. */
    title: string
    /** The URL of the master on Discogs. */
    url: URLString
    /** The artists credited on the master. */
    artistCredits: DiscogsArtistCredit[]
    /** The primary musical genres of the master (e.g. “Electronic”). */
    genres: string[]
    /** The primary musical styles of the master (e.g. “Techno”, “Minimal”). */
    styles: string[]
    /** The number of listings the master currently has on the marketplace. */
    forSaleCount?: Int
    /** The lowest price for the master currently found on the marketplace. */
    lowestPrice(args: { currency?: string }): Float | undefined
    /** The year the master was released (most likely its “main” release). */
    year?: Int
    /** The main release from the master. */
    mainRelease?: DiscogsRelease
    /** Images of the master. */
    images: DiscogsImage[]
    /** Music videos from the master. */
    videos: DiscogsVideo[]
    /** A description of the quality and completeness of this master’s data in the
Discogs database. */
    dataQuality?: string
}

/** A credited artist on a release, track, etc. */
export type DiscogsArtistCredit = GQLType & {
    /** The official or common name of the credited artist. */
    name?: string
    /** The artist name as credited on this particular work (the Artist Name
Variation, or ANV, in Discogs terms). */
    nameVariation?: string
    /** Join phrases might include words and/or punctuation to separate artist
names as they appear on the release, track, etc. */
    joinPhrase?: string
    /** A list of roles the artist had on the work in question. */
    roles: string[]
    /** A list of tracks or track ranges (e.g. “A1 to A4”) on which the artist is
credited. */
    tracks: string[]
    /** The artist’s entry on Discogs. */
    artist?: DiscogsArtist
}

/** An artist on Discogs. */
export type DiscogsArtist = GQLType & {
    /** The ID of the artist on Discogs. */
    artistID: ID
    /** The name of the artist on Discogs. */
    name: string
    /** Commonly found variations of the artist’s name. */
    nameVariations: string[]
    /** The artist’s real name, if the artist is a person who uses a stage name. */
    realName?: string
    /** A list of Discogs artists that represent the same artist under a different
alias. */
    aliases: DiscogsArtist[]
    /** The URL of the artist’s page on Discogs. */
    url: URLString
    /** Links to the artist’s official pages on different web properties. */
    urls: URLString[]
    /** A biography or description of the artist. */
    profile?: string
    /** A list of images picturing the artist. */
    images: DiscogsImage[]
    /** A list of members, if the artist is a group. */
    members: DiscogsArtistMember[]
    /** A description of the quality and completeness of this artist’s data in the
Discogs database. */
    dataQuality?: string
}

/** A single image from Discogs. */
export type DiscogsImage = GQLType & {
    /** The URL of the image file. */
    url: URLString
    /** The image type, primary or secondary. */
    type: DiscogsImageType
    /** The image width in pixels. */
    width: Int
    /** The image height in pixels. */
    height: Int
    /** The URL for a 150x150 thumbnail of the image. */
    thumbnail?: URLString
}

/** The type of image. */
export type DiscogsImageType = 'PRIMARY' | 'SECONDARY'

/** A single artist who is a member of a group on Discogs. */
export type DiscogsArtistMember = GQLType & {
    /** Whether or not the member is still active in the group. */
    active?: boolean
    /** The name of the member. */
    name: string
    /** The member’s artist information on Discogs. */
    artist?: DiscogsArtist
}

/** A release on Discogs. */
export type DiscogsRelease = GQLType & {
    /** The ID of the release on Discogs. */
    releaseID: ID
    /** The title of the release. */
    title: string
    /** The URL of the release on Discogs. */
    url: URLString
    /** The artists credited on the release. */
    artistCredits: DiscogsArtistCredit[]
    /** An additional list of artists who contributed to the release, but are not
named in the release’s artists. */
    extraArtistCredits: DiscogsArtistCredit[]
    /** The primary musical genres of the release (e.g. “Electronic”). */
    genres: string[]
    /** The primary musical styles of the release (e.g. “Techno”, “Minimal”). */
    styles: string[]
    /** The number of listings the release currently has on the marketplace. */
    forSaleCount?: Int
    /** The lowest price for the release currently found on the marketplace. */
    lowestPrice(args: { currency?: string }): Float | undefined
    /** The year the release was issued. */
    year?: Int
    /** Notes about the release. */
    notes?: string
    /** The country in which the release was issued. */
    country?: string
    /** The master release on Discogs. */
    master?: DiscogsMaster
    /** The primary thumbnail image for the release. */
    thumbnail?: URLString
    /** Images of the release. */
    images: DiscogsImage[]
    /** Music videos from the release. */
    videos: DiscogsVideo[]
    /** Information about the Discogs community’s contributions to the release’s
data. */
    community?: DiscogsCommunity
    /** A description of the quality and completeness of this release’s data in
the Discogs database. */
    dataQuality?: string
}

/** A single video linked from Discogs. */
export type DiscogsVideo = GQLType & {
    /** The URL of the video. */
    url: URLString
    /** The title of the video. */
    title?: string
    /** The video description. */
    description?: string
    /** The duration of the video in milliseconds. */
    duration?: Duration
    /** Whether the video is embeddable. */
    embed?: boolean
}

/** Community statistics regarding an item on Discogs. */
export type DiscogsCommunity = GQLType & {
    /** The acceptance status. */
    status?: string
    /** Information about how Discogs users have rated the item. */
    rating?: DiscogsRating
    /** The number of Discogs users who have the item in their collection. */
    haveCount?: Int
    /** The number of Discogs users who want the item. */
    wantCount?: Int
    /** The Discogs users who have contributed to the item’s data. */
    contributors: DiscogsUser[]
    /** The Discogs user who submitted the item. */
    submitter?: DiscogsUser
}

/** An aggregated rating on Discogs. */
export type DiscogsRating = GQLType & {
    /** The number of users who have contributed to the rating. */
    voteCount: Int
    /** The average rating as determined by users. */
    value?: Float
}

/** A user on Discogs. */
export type DiscogsUser = GQLType & {
    /** The user’s username on Discogs. */
    username: string
}

/** A connection to a list of items. */
export type SeriesConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: SeriesEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Series[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type SeriesEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Series
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** A [series](https://musicbrainz.org/doc/Series) is a sequence of
separate release groups, releases, recordings, works or events with a common
theme. */
export type Series = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official name of the entity. */
    name?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** The type primarily describes what type of entity the series
contains. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
}

/** A connection to a list of items. */
export type WorkConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: WorkEdge[]
    /** A list of nodes in the connection (without going through the
`edges` field). */
    nodes?: Work[]
    /** A count of the total number of items in this connection,
ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type WorkEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Work
    /** A cursor for use in pagination */
    cursor: string
    /** The relevancy score (0–100) assigned by the search engine, if
these results were found through a search. */
    score?: Int
}

/** A [work](https://musicbrainz.org/doc/Work) is a distinct
intellectual or artistic creation, which can be expressed in the form of one or
more audio recordings. */
export type Work = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The official title of the entity. */
    title?: string
    /** A comment used to help distinguish identically named entitites. */
    disambiguation?: string
    /** [Aliases](https://musicbrainz.org/doc/Aliases) are used to store
alternate names or misspellings. */
    aliases?: Alias[]
    /** A list of [ISWCs](https://musicbrainz.org/doc/ISWC) assigned
to the work by copyright collecting agencies. */
    iswcs?: string[]
    /** The language in which the work was originally written. */
    language?: string
    /** The type of work. */
    type?: string
    /** The MBID associated with the value of the `type`
field. */
    typeID?: MBID
    /** A list of artists linked to this entity. */
    artists(args: { after?: string; first?: Int }): ArtistConnection | undefined
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
    /** A list of collections containing this entity. */
    collections(args: { after?: string; first?: Int }): CollectionConnection | undefined
    /** The rating users have given to this entity. */
    rating?: Rating
    /** A list of tags linked to this entity. */
    tags(args: { after?: string; first?: Int }): TagConnection | undefined
}

/** An object containing lists of the different types of label images from
[fanart.tv](https://fanart.tv/). */
export type FanArtLabel = GQLType & {
    /** A list of 400x270 PNG images containing the label’s logo. There will
usually be a black version, a color version, and a white version, all with
transparent backgrounds. */
    logos?: FanArtLabelImage[]
}

/** A music label image from [fanart.tv](https://fanart.tv/). */
export type FanArtLabelImage = GQLType & {
    /** The ID of the image on fanart.tv. */
    imageID?: ID
    /** The URL of the image. */
    url(args: { size?: FanArtImageSize }): URLString | undefined
    /** The number of likes the image has received by fanart.tv users. */
    likeCount?: Int
    /** The type of color content in the image (usually “white” or “colour”). */
    color?: string
}

/** A label on Discogs. */
export type DiscogsLabel = GQLType & {
    /** The ID of the label on Discogs. */
    labelID: ID
    /** The name of the label. */
    name: string
    /** The URL of the label on Discogs. */
    url: URLString
    /** A description of the history of the label. */
    profile?: string
    /** Information on how to contact a representative of the label. */
    contactInfo?: string
    /** The parent label, if this label is a subsidiary. */
    parentLabel?: DiscogsLabel
    /** A list of labels that are subsidiaries of this label. */
    subLabels: DiscogsLabel[]
    /** A list of images associated with the label. */
    images: DiscogsImage[]
    /** A description of the quality and completeness of this label’s data in the
Discogs database. */
    dataQuality?: string
}

/** An album on [Last.fm](https://www.last.fm/) corresponding with a MusicBrainz
Release. */
export type LastFMAlbum = GQLType & {
    /** The MBID of the corresponding MusicBrainz release. */
    mbid?: MBID
    /** The title of the album according to [Last.fm](https://www.last.fm/). */
    title?: string
    /** The URL for the album on [Last.fm](https://www.last.fm/). */
    url: URLString
    /** An image of the cover artwork of the release. */
    image(args: { size?: LastFMImageSize }): URLString | undefined
    /** The number of listeners recorded for the album. */
    listenerCount?: Float
    /** The number of plays recorded for the album. */
    playCount?: Float
    /** Historical information written about the album, often available in several
languages. */
    description(args: { lang?: string }): LastFMWikiContent | undefined
    /** The artist who released the album. This returns the Last.fm artist info,
not the MusicBrainz artist. */
    artist?: LastFMArtist
    /** A list of tags applied to the artist by users, ordered by popularity. */
    topTags(args: { first?: Int; after?: string }): LastFMTagConnection | undefined
}

/** The image sizes that may be requested at [Last.fm](https://www.last.fm/). */
export type LastFMImageSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRALARGE' | 'MEGA'

/** Biographical or background information written about an entity on
[Last.fm](https://www.last.fm/). */
export type LastFMWikiContent = GQLType & {
    /** A summary of the wiki content, which may contain HTML. */
    summaryHTML?: string
    /** The full wiki content, which may contain HTML. */
    contentHTML?: string
    /** The date the content was published. The data is reformatted from the
Last.fm API’s original format into the Date scalar format. */
    publishDate?: Date
    /** The time the content was published. The data is reformatted from the
Last.fm API’s original format into the Time scalar format. The API offers
no indication as to which time zone the time is in. */
    publishTime?: Time
    /** The URL at which the content was published. */
    url?: URLString
}

/** An artist on [Last.fm](https://www.last.fm/). */
export type LastFMArtist = GQLType & {
    /** The MBID of the corresponding MusicBrainz artist. */
    mbid?: MBID
    /** The name of the artist according to [Last.fm](https://www.last.fm/). */
    name?: string
    /** The URL for the artist on [Last.fm](https://www.last.fm/). */
    url: URLString
    /** An image of the artist. */
    image(args: { size?: LastFMImageSize }): URLString | undefined
    /** The number of listeners recorded for the artist. */
    listenerCount?: Float
    /** The number of plays recorded for the artist. */
    playCount?: Float
    /** A list of similar artists. */
    similarArtists(args: { first?: Int; after?: string }): LastFMArtistConnection | undefined
    /** A list of the artist’s most popular albums. */
    topAlbums(args: { first?: Int; after?: string }): LastFMAlbumConnection | undefined
    /** A list of tags applied to the artist by users, ordered by popularity. */
    topTags(args: { first?: Int; after?: string }): LastFMTagConnection | undefined
    /** A list of the artist’s most popular tracks. */
    topTracks(args: { first?: Int; after?: string }): LastFMTrackConnection | undefined
    /** A biography of the artist, often available in several languages. */
    biography(args: { lang?: string }): LastFMWikiContent | undefined
}

/** A connection to a list of items. */
export type LastFMArtistConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: LastFMArtistEdge[]
    /** A list of nodes in the connection (without going through the `edges` field). */
    nodes?: LastFMArtist[]
    /** A count of the total number of items in this connection, ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type LastFMArtistEdge = GQLType & {
    /** The item at the end of the edge. */
    node?: LastFMArtist
    /** A cursor for use in pagination. */
    cursor: string
    /** The artist similarity score (0–1) as determined by [Last.fm](https://www.last.fm/),
if this connection is with another artist. */
    matchScore?: Float
}

/** A connection to a list of items. */
export type LastFMAlbumConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: LastFMAlbumEdge[]
    /** A list of nodes in the connection (without going through the `edges` field). */
    nodes?: LastFMAlbum[]
    /** A count of the total number of items in this connection, ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type LastFMAlbumEdge = GQLType & {
    /** The item at the end of the edge. */
    node?: LastFMAlbum
    /** A cursor for use in pagination. */
    cursor: string
}

/** A connection to a list of items. */
export type LastFMTagConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: LastFMTagEdge[]
    /** A list of nodes in the connection (without going through the `edges` field). */
    nodes?: LastFMTag[]
    /** A count of the total number of items in this connection, ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type LastFMTagEdge = GQLType & {
    /** The item at the end of the edge. */
    node?: LastFMTag
    /** A cursor for use in pagination. */
    cursor: string
    /** The number of times the tag has been applied to the item in question. */
    tagCount?: Int
}

/** A tag added by users to an entity on [Last.fm](https://www.last.fm/). */
export type LastFMTag = GQLType & {
    /** The tag name. */
    name: string
    /** The URL for the tag on [Last.fm](https://www.last.fm/). */
    url: URLString
}

/** A connection to a list of items. */
export type LastFMTrackConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges?: LastFMTrackEdge[]
    /** A list of nodes in the connection (without going through the `edges` field). */
    nodes?: LastFMTrack[]
    /** A count of the total number of items in this connection, ignoring pagination. */
    totalCount?: Int
}

/** An edge in a connection. */
export type LastFMTrackEdge = GQLType & {
    /** The item at the end of the edge. */
    node?: LastFMTrack
    /** A cursor for use in pagination. */
    cursor: string
    /** The track similarity score (0–1) as determined by [Last.fm](https://www.last.fm/),
if this connection is with another track. */
    matchScore?: Float
}

/** A track on [Last.fm](https://www.last.fm/) corresponding with a MusicBrainz
Recording. */
export type LastFMTrack = GQLType & {
    /** The MBID of the corresponding MusicBrainz recording. */
    mbid?: MBID
    /** The title of the track according to [Last.fm](https://www.last.fm/). */
    title?: string
    /** The URL for the track on [Last.fm](https://www.last.fm/). */
    url: URLString
    /** The length of the track. */
    duration?: Duration
    /** The number of listeners recorded for the track. */
    listenerCount?: Float
    /** The number of plays recorded for the track. */
    playCount?: Float
    /** Historical information written about the track, often available in several
languages. */
    description(args: { lang?: string }): LastFMWikiContent | undefined
    /** The artist who released the track. This returns the Last.fm artist info,
not the MusicBrainz artist. */
    artist?: LastFMArtist
    /** The album on which the track appears. This returns the Last.fm album info,
not the MusicBrainz release. */
    album?: LastFMAlbum
    /** A list of similar tracks. */
    similarTracks(args: { first?: Int; after?: string }): LastFMTrackConnection | undefined
    /** A list of tags applied to the track by users, ordered by popularity. */
    topTags(args: { first?: Int; after?: string }): LastFMTagConnection | undefined
}

/** Strategies for matching MusicBrainz entities to Spotify entities. */
export type SpotifyMatchStrategy = 'URL' | 'EXTERNALID'

/** An album from Spotify. */
export type SpotifyAlbum = GQLType & {
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
for the album. */
    albumID: ID
    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
for the album. */
    uri: string
    /** A link to the Web API endpoint providing full details of the album. */
    href: URLString
    /** The name of the album. In case of an album takedown, the value may be empty. */
    title?: string
    /** The type of the album, e.g. “Album”, “Single”, “Compilation”. */
    albumType: ReleaseGroupType
    /** The artists of the album. */
    artists: SpotifyArtist[]
    /** The markets in which the album is available: [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
country codes.

Note that an album is considered available in a market when at least 1 of its tracks is available in that market. */
    availableMarkets: string[]
    /** The copyright statements of the album. */
    copyrights: SpotifyCopyright[]
    /** Known external IDs for the album. */
    externalIDs: SpotifyExternalID[]
    /** Known external URLs for this album. */
    externalURLs: SpotifyExternalURL[]
    /** A list of the genres used to classify the album. For example: “Prog Rock”,
“Post-Grunge”. (If not yet classified, the array is empty.) */
    genres: string[]
    /** The cover art for the album in various sizes, widest first. */
    images: SpotifyImage[]
    /** The label for the album. */
    label?: string
    /** The popularity of the album. The value will be between 0 and 100, with 100
being the most popular. The popularity is calculated from the popularity of
the album’s individual tracks. */
    popularity: Int
    /** The date the album was first released, for example “1981-12-15”. Depending
on the precision, the month or day might be missing. */
    releaseDate?: Date
}

/** An artist from Spotify. */
export type SpotifyArtist = GQLType & {
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
for the artist. */
    artistID: ID
    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
for the artist. */
    uri: string
    /** A link to the Web API endpoint providing full details of the artist. */
    href: URLString
    /** The name of the artist. */
    name: string
    /** Known external URLs for this artist. */
    externalURLs: SpotifyExternalURL[]
    /** A list of the genres the artist is associated with. For example:
“Prog Rock”, “Post-Grunge”. (If not yet classified, the array is empty.) */
    genres: string[]
    /** The popularity of the artist. The value will be between 0 and 100, with 100
being the most popular. The artist’s popularity is calculated from the
popularity of all the artist’s tracks. */
    popularity: Int
    /** Images of the artist in various sizes, widest first. */
    images: SpotifyImage[]
    /** Spotify catalog information about an artist’s top tracks by country. */
    topTracks(args: { market: string }): SpotifyTrack[]
    /** Spotify catalog information about artists similar to a given artist.
Similarity is based on analysis of the Spotify community’s listening
history. */
    relatedArtists: SpotifyArtist[]
}

/** A URL for linking to an entity with some third party. */
export type SpotifyExternalURL = GQLType & {
    /** The type of the URL, for example “spotify”. */
    type: string
    /** An external, public URL to the object. */
    url: URLString
}

/** A single image from Spotify. */
export type SpotifyImage = GQLType & {
    /** The source URL of the image. */
    url: URLString
    /** The image width in pixels, if known. */
    width?: Int
    /** The image height in pixels, if known. */
    height?: Int
}

/** A track from Spotify. */
export type SpotifyTrack = GQLType & {
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
for the track. */
    trackID: ID
    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
for the track. */
    uri: string
    /** A link to the Web API endpoint providing full details of the track. */
    href: URLString
    /** The name of the track. */
    title: string
    /** The audio features of the track. */
    audioFeatures?: SpotifyAudioFeatures
    /** The album on which the track appears. */
    album?: SpotifyAlbum
    /** The artists who performed the track. */
    artists: SpotifyArtist[]
    /** A list of the countries in which the track can be played, identified by
their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
code. */
    availableMarkets: string[]
    /** The disc number (usually `1` unless the album consists of more than one
disc). */
    discNumber: Int
    /** The track length in milliseconds. */
    duration: Duration
    /** Whether or not the track has explicit lyrics, if known. */
    explicit?: boolean
    /** Known external IDs for the track. */
    externalIDs: SpotifyExternalID[]
    /** Known external URLs for the track. */
    externalURLs: SpotifyExternalURL[]
    /** The popularity of the track. The value will be between 0 and 100, with 100
being the most popular.

The popularity is calculated by algorithm and is based, in the most part, on
the total number of plays the track has had and how recent those plays are.
Generally speaking, songs that are being played a lot now will have a higher
popularity than songs that were played a lot in the past.

Duplicate tracks (e.g. the same track from a single and an album) are rated
independently.

Artist and album popularity is derived mathematically from track popularity.

Note that the popularity value may lag actual popularity by a few days: the
value is not updated in real time. */
    popularity: Int
    /** A link to a 30 second preview (MP3 format) of the track, if available. */
    previewURL?: URLString
    /** The number of the track. If an album has several discs, the track number is
the number on the specified disc. */
    trackNumber: Int
    /** A MusicBrainz recording that corresponds to the track. */
    musicBrainz(args: { strategy?: SpotifyMatchStrategy[] }): Recording | undefined
}

/** The audio features of a track from Spotify. */
export type SpotifyAudioFeatures = GQLType & {
    /** A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0
represents high confidence the track is acoustic. */
    acousticness: Float
    /** Danceability describes how suitable a track is for dancing based on a
combination of musical elements including tempo, rhythm stability, beat
strength, and overall regularity. A value of 0.0 is least danceable and 1.0
is most danceable. */
    danceability: Float
    /** The duration of the track in milliseconds. */
    duration: Duration
    /** Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of
intensity and activity. Typically, energetic tracks feel fast, loud, and
noisy. For example, death metal has high energy, while a Bach prelude scores
low on the scale. Perceptual features contributing to this attribute include
dynamic range, perceived loudness, timbre, onset rate, and general entropy. */
    energy: Float
    /** Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are
treated as instrumental in this context. Rap or spoken word tracks are
clearly “vocal”. The closer the instrumentalness value is to 1.0, the
greater likelihood the track contains no vocal content. Values above 0.5 are
intended to represent instrumental tracks, but confidence is higher as the
value approaches 1.0. */
    instrumentalness: Float
    /** The key the track is in. Integers map to pitches using standard [Pitch Class
notation](https://en.wikipedia.org/wiki/Pitch_class), e.g. 0 = C, 1 = C♯/D♭,
2 = D, and so on. See the `keyName` field if you’d prefer the note as a
string. */
    key: Int
    /** The `key` translated from an integer to a name like “C”. (Only one name
will be returned, so enharmonic notes like like C♯/D♭ will just return
“C♯”.) */
    keyName: string
    /** Detects the presence of an audience in the recording. Higher liveness values
represent an increased probability that the track was performed live. A
value above 0.8 provides strong likelihood that the track is live. */
    liveness: Float
    /** The overall loudness of a track in decibels (dB). Loudness values are
averaged across the entire track and are useful for comparing relative
loudness of tracks. Loudness is the quality of a sound that is the primary
psychological correlate of physical strength (amplitude). Values typical
range between -60 and 0 db. */
    loudness: Float
    /** Mode indicates the modality (major or minor) of a track, the type of scale
from which its melodic content is derived. Major is represented by 1 and
minor is 0. */
    mode: SpotifyTrackMode
    /** Speechiness detects the presence of spoken words in a track. The more
exclusively speech-like the recording (e.g. talk show, audio book, poetry),
the closer to 1.0 the attribute value. Values above 0.66 describe tracks
that are probably made entirely of spoken words. Values between 0.33 and
0.66 describe tracks that may contain both music and speech, either in
sections or layered, including such cases as rap music. Values below 0.33
most likely represent music and other non-speech-like tracks. */
    speechiness: Float
    /** The overall estimated tempo of a track in beats per minute (BPM). In musical
terminology, tempo is the speed or pace of a given piece and derives
directly from the average beat duration. */
    tempo: Float
    /** An estimated overall time signature of a track. The time signature (meter)
is a notational convention to specify how many beats are in each bar (or
measure). */
    timeSignature: Float
    /** A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a
track. Tracks with high valence sound more positive (e.g. happy, cheerful,
euphoric), while tracks with low valence sound more negative (e.g. sad,
depressed, angry). */
    valence: Float
}

/** The potential values for modality (major or minor) of a track. */
export type SpotifyTrackMode = 'MAJOR' | 'MINOR'

/** A value for identifying an entity with some third party. */
export type SpotifyExternalID = GQLType & {
    /** The identifier type, for example “isrc”, “ean”, “upc”. */
    type: string
    /** The identifier value. */
    id: string
}

/** A copyright statement for an album from Spotify. */
export type SpotifyCopyright = GQLType & {
    /** The copyright text. */
    text: string
    /** Whether the copyright is for the work itself or the sound recording
(performance). */
    type: SpotifyCopyrightType
}

/** The type of copyright. */
export type SpotifyCopyrightType = 'COPYRIGHT' | 'PERFORMANCE'

/** A track on [TheAudioDB](http://www.theaudiodb.com/) corresponding with a
MusicBrainz Recording. */
export type TheAudioDBTrack = GQLType & {
    /** TheAudioDB ID of the track. */
    trackID?: ID
    /** TheAudioDB ID of the album on which the track appears. */
    albumID?: ID
    /** TheAudioDB ID of the artist who released the track. */
    artistID?: ID
    /** A description of the track. */
    description(args: { lang?: string }): string | undefined
    /** A thumbnail image for the track. */
    thumbnail(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** The track’s rating as determined by user votes, out of 10. */
    score?: Float
    /** The number of users who voted to determine the album’s score. */
    scoreVotes?: Float
    /** The track number of the song on the album. */
    trackNumber?: Int
    /** The official music video for the track. */
    musicVideo?: TheAudioDBMusicVideo
    /** The primary musical genre of the track (e.g. “Alternative Rock”). */
    genre?: string
    /** The primary musical mood of the track (e.g. “Sad”). */
    mood?: string
    /** The primary musical style of the track (e.g. “Rock/Pop”). */
    style?: string
    /** The primary musical theme of the track (e.g. “In Love”). */
    theme?: string
}

/** Details of a music video associated with a track on [TheAudioDB](http://www.theaudiodb.com/). */
export type TheAudioDBMusicVideo = GQLType & {
    /** The URL where the music video can be found. */
    url?: URLString
    /** The video production company of the music video. */
    companyName?: string
    /** The director of the music video. */
    directorName?: string
    /** A list of still images from the music video. */
    screenshots(args: { size?: TheAudioDBImageSize }): URLString[]
    /** The number of views the video has received at the given URL. This will rarely
be up to date, so use cautiously. */
    viewCount?: Float
    /** The number of likes the video has received at the given URL. This will rarely
be up to date, so use cautiously. */
    likeCount?: Float
    /** The number of dislikes the video has received at the given URL. This will
rarely be up to date, so use cautiously. */
    dislikeCount?: Float
    /** The number of comments the video has received at the given URL. This will
rarely be up to date, so use cautiously. */
    commentCount?: Float
}

/** An object containing lists of the different types of artist images from
[fanart.tv](https://fanart.tv/). */
export type FanArtArtist = GQLType & {
    /** A list of 1920x1080 JPG images picturing the artist, suitable for use as
backgrounds. */
    backgrounds?: FanArtImage[]
    /** A list of 1000x185 JPG images containing the artist and their logo or name. */
    banners?: FanArtImage[]
    /** A list of 400x155 PNG images containing the artist’s logo or name, with
transparent backgrounds. */
    logos?: FanArtImage[]
    /** A list of 800x310 PNG images containing the artist’s logo or name, with
transparent backgrounds. */
    logosHD?: FanArtImage[]
    /** A list of 1000x1000 JPG thumbnail images picturing the artist (usually
containing every member of a band). */
    thumbnails?: FanArtImage[]
}

/** An artist on [TheAudioDB](http://www.theaudiodb.com/). */
export type TheAudioDBArtist = GQLType & {
    /** TheAudioDB ID of the artist. */
    artistID?: ID
    /** A biography of the artist, often available in several languages. */
    biography(args: { lang?: string }): string | undefined
    /** The number of members in the musical group, if applicable. */
    memberCount?: Int
    /** A 1000x185 JPG banner image containing the artist and their logo or name. */
    banner(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** A list of 1280x720 or 1920x1080 JPG images depicting the artist. */
    fanArt(args: { size?: TheAudioDBImageSize }): URLString[]
    /** A 400x155 PNG image containing the artist’s logo or name, with a transparent
background. */
    logo(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** A 1000x1000 JPG thumbnail image picturing the artist (usually containing
every member of a band). */
    thumbnail(args: { size?: TheAudioDBImageSize }): URLString | undefined
    /** The primary musical genre of the artist (e.g. “Alternative Rock”). */
    genre?: string
    /** The primary musical mood of the artist (e.g. “Sad”). */
    mood?: string
    /** The primary musical style of the artist (e.g. “Rock/Pop”). */
    style?: string
}

/** A country with chart data available on [Last.fm](https://www.last.fm/). */
export type LastFMCountry = GQLType & {
    /** The top artists in this country, ordered by popularity. */
    topArtists(args: { first?: Int; after?: string }): LastFMArtistConnection | undefined
    /** The top tracks in this country, ordered by popularity. */
    topTracks(args: { first?: Int; after?: string }): LastFMTrackConnection | undefined
}

/** A [URL](https://musicbrainz.org/doc/URL) pointing to a resource
external to MusicBrainz, i.e. an official homepage, a site where music can be
acquired, an entry in another database, etc. */
export type URL = GQLType & {
    /** The ID of an object */
    id: ID
    /** The MBID of the entity. */
    mbid: MBID
    /** The actual URL string. */
    resource: URLString
    /** Relationships between this entity and other entitites. */
    relationships?: Relationships
}

/** A query for all MusicBrainz entities directly linked to another
entity. */
export type BrowseQuery = GQLType & {
    /** Browse area entities linked to the given arguments. */
    areas(args: { collection?: MBID; after?: string; first?: Int }): AreaConnection | undefined
    /** Browse artist entities linked to the given arguments. */
    artists(args: {
        area?: MBID
        collection?: MBID
        recording?: MBID
        release?: MBID
        releaseGroup?: MBID
        work?: MBID
        after?: string
        first?: Int
    }): ArtistConnection | undefined
    /** Browse collection entities linked to the given arguments. */
    collections(args: {
        area?: MBID
        artist?: MBID
        editor?: string
        event?: MBID
        label?: MBID
        place?: MBID
        recording?: MBID
        release?: MBID
        releaseGroup?: MBID
        work?: MBID
        after?: string
        first?: Int
    }): CollectionConnection | undefined
    /** Browse event entities linked to the given arguments. */
    events(args: {
        area?: MBID
        artist?: MBID
        collection?: MBID
        place?: MBID
        after?: string
        first?: Int
    }): EventConnection | undefined
    /** Browse label entities linked to the given arguments. */
    labels(args: {
        area?: MBID
        collection?: MBID
        release?: MBID
        after?: string
        first?: Int
    }): LabelConnection | undefined
    /** Browse place entities linked to the given arguments. */
    places(args: {
        area?: MBID
        collection?: MBID
        after?: string
        first?: Int
    }): PlaceConnection | undefined
    /** Browse recording entities linked to the given arguments. */
    recordings(args: {
        artist?: MBID
        collection?: MBID
        isrc?: ISRC
        release?: MBID
        after?: string
        first?: Int
    }): RecordingConnection | undefined
    /** Browse release entities linked to the given arguments. */
    releases(args: {
        area?: MBID
        artist?: MBID
        collection?: MBID
        discID?: DiscID
        label?: MBID
        recording?: MBID
        releaseGroup?: MBID
        track?: MBID
        trackArtist?: MBID
        type?: ReleaseGroupType[]
        status?: ReleaseStatus[]
        after?: string
        first?: Int
    }): ReleaseConnection | undefined
    /** Browse release group entities linked to the given arguments. */
    releaseGroups(args: {
        artist?: MBID
        collection?: MBID
        release?: MBID
        type?: ReleaseGroupType[]
        after?: string
        first?: Int
    }): ReleaseGroupConnection | undefined
    /** Browse work entities linked to the given arguments. */
    works(args: {
        artist?: MBID
        collection?: MBID
        iswc?: ISWC
        after?: string
        first?: Int
    }): WorkConnection | undefined
}

/** The [International Standard Musical Work Code](https://musicbrainz.org/doc/ISWC)
(ISWC) is an ISO standard similar to ISBNs for identifying musical works /
compositions. */
export type ISWC = any

/** A search for MusicBrainz entities using Lucene query syntax. */
export type SearchQuery = GQLType & {
    /** Search for area entities matching the given query. */
    areas(args: { query: string; after?: string; first?: Int }): AreaConnection | undefined
    /** Search for artist entities matching the given query. */
    artists(args: { query: string; after?: string; first?: Int }): ArtistConnection | undefined
    /** Search for event entities matching the given query. */
    events(args: { query: string; after?: string; first?: Int }): EventConnection | undefined
    /** Search for instrument entities matching the given query. */
    instruments(args: {
        query: string
        after?: string
        first?: Int
    }): InstrumentConnection | undefined
    /** Search for label entities matching the given query. */
    labels(args: { query: string; after?: string; first?: Int }): LabelConnection | undefined
    /** Search for place entities matching the given query. */
    places(args: { query: string; after?: string; first?: Int }): PlaceConnection | undefined
    /** Search for recording entities matching the given query. */
    recordings(args: {
        query: string
        after?: string
        first?: Int
    }): RecordingConnection | undefined
    /** Search for release entities matching the given query. */
    releases(args: { query: string; after?: string; first?: Int }): ReleaseConnection | undefined
    /** Search for release group entities matching the given query. */
    releaseGroups(args: {
        query: string
        after?: string
        first?: Int
    }): ReleaseGroupConnection | undefined
    /** Search for series entities matching the given query. */
    series(args: { query: string; after?: string; first?: Int }): SeriesConnection | undefined
    /** Search for work entities matching the given query. */
    works(args: { query: string; after?: string; first?: Int }): WorkConnection | undefined
}

/** The different types of [Last.fm](https://www.last.fm/) queries that can be
made that are not connected to any particular MusicBrainz entity. */
export type LastFMQuery = GQLType & {
    /** A query for chart data. */
    chart: LastFMChartQuery
}

/** A query for chart data on [Last.fm](https://www.last.fm/). */
export type LastFMChartQuery = GQLType & {
    /** The most popular artists, ordered by popularity. If a country code is
given, retrieve the most popular artists in that country. */
    topArtists(args: {
        country?: string
        first?: Int
        after?: string
    }): LastFMArtistConnection | undefined
    /** The most popular tags, ordered by popularity. */
    topTags(args: { first?: Int; after?: string }): LastFMTagConnection | undefined
    /** The most popular tracks, ordered by popularity. If a country code is
given, retrieve the most popular tracks in that country. */
    topTracks(args: {
        country?: string
        first?: Int
        after?: string
    }): LastFMTrackConnection | undefined
}

export type SpotifyQuery = GQLType & {
    /** Track recommendations based on seed entities and various parameters. */
    recommendations(args: {
        seedArtists?: ID[]
        seedGenres?: ID[]
        seedTracks?: ID[]
        limit?: Int
    }): SpotifyRecommendations
}

export type SpotifyRecommendations = GQLType & {
    tracks: SpotifyTrack[]
}

/** A connection to a list of Discogs releases. */
export type DiscogsReleaseConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges: DiscogsReleaseEdge[]
    /** A list of nodes in the connection (without going through the `edges` field). */
    nodes: DiscogsRelease[]
    /** A count of the total number of items in this connection, ignoring pagination. */
    totalCount?: Int
}

/** An edge in a Discogs release connection. */
export type DiscogsReleaseEdge = GQLType & {
    /** The release at the end of the edge. */
    node: DiscogsRelease
}
