type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    node?(args: { id: ID }): Node
    parchment?(args: { id?: ID }): Parchment
    parchments?(args: { first?: Int, after?: string }): ParchmentConnection
    book?(args: { id?: ID }): Book
    books?(args: { first?: Int, after?: string, properties_list?: string[], order?: BookFilter_order, title?: string, author?: string }): BookConnection
    review?(args: { id?: ID }): Review
    reviews?(args: { first?: Int, after?: string, order?: ReviewFilter_order, book?: string, book_list?: string[] }): ReviewConnection

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** The `ID` scalar type represents a unique identifier, often used to
refetch an object or as key for a cache. The ID type appears in a JSON
response as a String; however, it is not intended to be human-readable.
When expected as an input type, any string (such as `"4"`) or integer
(such as `4`) input value will be accepted as an ID. */
export type ID = string

/** A node, according to the Relay specification. */
export interface Node extends GQLType {
    /** The id of this node. */
    id: ID
    /** Use `asParchment` to access fields on the underlying concrete type. */
    asParchment: Parchment
    /** Use `asBook` to access fields on the underlying concrete type. */
    asBook: Book
    /** Use `asReview` to access fields on the underlying concrete type. */
    asReview: Review
}

export type Parchment = GQLType & {
    id: ID
    /** The title of the book */
    title: string
    /** A description of the item */
    description: string
}

/** The `Int` scalar type represents non-fractional signed whole numeric
values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

/** Connection for Parchment. */
export type ParchmentConnection = GQLType & {
    edges?: ParchmentEdge[]
    pageInfo: ParchmentPageInfo
    totalCount: Int
}

/** Edge of Parchment. */
export type ParchmentEdge = GQLType & {
    node?: Parchment
    cursor: string
}

/** Information about the current page. */
export type ParchmentPageInfo = GQLType & {
    endCursor?: string
    hasNextPage: boolean
}

/** A book. */
export type Book = GQLType & {
    id: ID
    /** The ISBN of the book */
    isbn?: string
    /** The title of the book */
    title: string
    /** A description of the item */
    description: string
    /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably */
    author: string
    /** The date on which the CreativeWork was created or the item was added to a DataFeed */
    publicationDate: string
    /** The book's reviews */
    reviews?(args: { first?: Int, after?: string, properties_list?: string[], order?: BookFilter_order, title?: string, author?: string }): ReviewConnection
}

export type BookFilter_order = {
    id?: string
    title?: string
    author?: string
    isbn?: string
    publicationDate?: string
}

/** Connection for Review. */
export type ReviewConnection = GQLType & {
    edges?: ReviewEdge[]
    pageInfo: ReviewPageInfo
    totalCount: Int
}

/** Edge of Review. */
export type ReviewEdge = GQLType & {
    node?: Review
    cursor: string
}

/** A review of an item - for example, of a restaurant, movie, or store. */
export type Review = GQLType & {
    id: ID
    /** The actual body of the review */
    body?: string
    /** A rating */
    rating: Int
    /** DEPRECATED (use rating now): A letter to rate the book */
    letter?: string
    /** Author the author of the review */
    author?: string
    /** Author the author of the review */
    publicationDate?: string
    /** The item that is being reviewed/rated */
    book?: Book
}

/** Information about the current page. */
export type ReviewPageInfo = GQLType & {
    endCursor?: string
    hasNextPage: boolean
}

/** Connection for Book. */
export type BookConnection = GQLType & {
    edges?: BookEdge[]
    pageInfo: BookPageInfo
    totalCount: Int
}

/** Edge of Book. */
export type BookEdge = GQLType & {
    node?: Book
    cursor: string
}

/** Information about the current page. */
export type BookPageInfo = GQLType & {
    endCursor?: string
    hasNextPage: boolean
}

export type ReviewFilter_order = {
    id?: string
    publicationDate?: string
}

export type Mutation = GQLType & {
    /** Deletes a Parchment. */
    deleteParchment?(args: { input: deleteParchmentInput }): deleteParchmentPayload
    /** Updates a Parchment. */
    updateParchment?(args: { input: updateParchmentInput }): updateParchmentPayload
    /** Creates a Parchment. */
    createParchment?(args: { input: createParchmentInput }): createParchmentPayload
    /** Deletes a Book. */
    deleteBook?(args: { input: deleteBookInput }): deleteBookPayload
    /** Updates a Book. */
    updateBook?(args: { input: updateBookInput }): updateBookPayload
    /** Creates a Book. */
    createBook?(args: { input: createBookInput }): createBookPayload
    /** Deletes a Review. */
    deleteReview?(args: { input: deleteReviewInput }): deleteReviewPayload
    /** Updates a Review. */
    updateReview?(args: { input: updateReviewInput }): updateReviewPayload
    /** Creates a Review. */
    createReview?(args: { input: createReviewInput }): createReviewPayload
}

export type deleteParchmentInput = {
    id: ID
    clientMutationId?: string
}

export type deleteParchmentPayload = GQLType & {
    parchment?: Parchment
    clientMutationId?: string
}

export type updateParchmentInput = {
    id: ID
    /** The title of the book */
    title?: string
    /** A description of the item */
    description?: string
    clientMutationId?: string
}

export type updateParchmentPayload = GQLType & {
    parchment?: Parchment
    clientMutationId?: string
}

export type createParchmentInput = {
    /** The title of the book */
    title: string
    /** A description of the item */
    description: string
    clientMutationId?: string
}

export type createParchmentPayload = GQLType & {
    parchment?: Parchment
    clientMutationId?: string
}

/** A book. */
export type deleteBookInput = {
    id: ID
    clientMutationId?: string
}

/** A book. */
export type deleteBookPayload = GQLType & {
    book?: Book
    clientMutationId?: string
}

/** A book. */
export type updateBookInput = {
    id: ID
    /** The ISBN of the book */
    isbn?: string
    /** The title of the book */
    title?: string
    /** A description of the item */
    description?: string
    /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably */
    author?: string
    /** The date on which the CreativeWork was created or the item was added to a DataFeed */
    publicationDate?: string
    /** The book's reviews */
    reviews?: string[]
    clientMutationId?: string
}

/** A book. */
export type updateBookPayload = GQLType & {
    book?: Book
    clientMutationId?: string
}

/** A book. */
export type createBookInput = {
    /** The ISBN of the book */
    isbn?: string
    /** The title of the book */
    title: string
    /** A description of the item */
    description: string
    /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably */
    author: string
    /** The date on which the CreativeWork was created or the item was added to a DataFeed */
    publicationDate: string
    /** The book's reviews */
    reviews?: string[]
    clientMutationId?: string
}

/** A book. */
export type createBookPayload = GQLType & {
    book?: Book
    clientMutationId?: string
}

/** A review of an item - for example, of a restaurant, movie, or store. */
export type deleteReviewInput = {
    id: ID
    clientMutationId?: string
}

/** A review of an item - for example, of a restaurant, movie, or store. */
export type deleteReviewPayload = GQLType & {
    review?: Review
    clientMutationId?: string
}

/** A review of an item - for example, of a restaurant, movie, or store. */
export type updateReviewInput = {
    id: ID
    /** The actual body of the review */
    body?: string
    /** A rating */
    rating?: Int
    /** DEPRECATED (use rating now): A letter to rate the book */
    letter?: string
    /** Author the author of the review */
    author?: string
    /** Author the author of the review */
    publicationDate?: string
    /** The item that is being reviewed/rated */
    book?: string
    clientMutationId?: string
}

/** A review of an item - for example, of a restaurant, movie, or store. */
export type updateReviewPayload = GQLType & {
    review?: Review
    clientMutationId?: string
}

/** A review of an item - for example, of a restaurant, movie, or store. */
export type createReviewInput = {
    /** The actual body of the review */
    body?: string
    /** A rating */
    rating: Int
    /** DEPRECATED (use rating now): A letter to rate the book */
    letter?: string
    /** Author the author of the review */
    author?: string
    /** Author the author of the review */
    publicationDate?: string
    /** The item that is being reviewed/rated */
    book?: string
    clientMutationId?: string
}

/** A review of an item - for example, of a restaurant, movie, or store. */
export type createReviewPayload = GQLType & {
    review?: Review
    clientMutationId?: string
}

/** The `Float` scalar type represents signed double-precision fractional
values as specified by
[IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

