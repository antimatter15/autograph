type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    /** Visit the specified page */
    page(args: { url?: string, source?: string }): Document | undefined

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** 
    The Document Type represent any web page loaded and
    serves as an entry point into the page content
     */
export type Document = GQLType & {
    /** The html representation of the subnodes for the selected DOM */
    content(args: { selector?: string }): string | undefined
    /** The html representation of the selected DOM */
    html(args: { selector?: string }): string | undefined
    /** The text for the selected DOM */
    text(args: { selector?: string }): string | undefined
    /** The tag for the selected DOM */
    tag(args: { selector?: string }): string | undefined
    /** The DOM attr of the Node */
    attr(args: { selector?: string, name: string }): string | undefined
    /** Returns True if the DOM matches the selector */
    is(args: { selector: string }): boolean | undefined
    /** Find elements using selector traversing down from self */
    query(args: { selector: string }): Element[] | undefined
    /** The list of children elements from self */
    children(args: { selector?: string }): Element[] | undefined
    /** The list of parent elements from self */
    parents(args: { selector?: string }): Element[] | undefined
    /** The parent element from self */
    parent?: Element
    /** The siblings elements from self */
    siblings(args: { selector?: string }): Element[] | undefined
    /** The immediately following sibling from self */
    next(args: { selector?: string }): Element | undefined
    /** The list of following siblings from self */
    nextAll(args: { selector?: string }): Element[] | undefined
    /** The immediately preceding sibling from self */
    prev(args: { selector?: string }): Element | undefined
    /** The list of preceding siblings from self */
    prevAll(args: { selector?: string }): Element[] | undefined
    /** The title of the document */
    title?: string
}

/** A Node represents a DOM Node */
export interface Node extends GQLType {
    /** The html representation of the subnodes for the selected DOM */
    content?: string
    /** The html representation of the selected DOM */
    html?: string
    /** The text for the selected DOM */
    text?: string
    /** The tag for the selected DOM */
    tag?: string
    /** The DOM attr of the Node */
    attr?: string
    /** Returns True if the DOM matches the selector */
    is?: boolean
    /** Find elements using selector traversing down from self */
    query?: Element[]
    /** The list of children elements from self */
    children?: Element[]
    /** The list of parent elements from self */
    parents?: Element[]
    /** The parent element from self */
    parent?: Element
    /** The siblings elements from self */
    siblings?: Element[]
    /** The immediately following sibling from self */
    next?: Element
    /** The list of following siblings from self */
    nextAll?: Element[]
    /** The immediately preceding sibling from self */
    prev?: Element
    /** The list of preceding siblings from self */
    prevAll?: Element[]
    /** Use `asDocument` to access fields on the underlying concrete type. */
    asDocument: Document
    /** Use `asElement` to access fields on the underlying concrete type. */
    asElement: Element
}

/** 
    A Element Type represents an object in a Document
     */
export type Element = GQLType & {
    /** The html representation of the subnodes for the selected DOM */
    content(args: { selector?: string }): string | undefined
    /** The html representation of the selected DOM */
    html(args: { selector?: string }): string | undefined
    /** The text for the selected DOM */
    text(args: { selector?: string }): string | undefined
    /** The tag for the selected DOM */
    tag(args: { selector?: string }): string | undefined
    /** The DOM attr of the Node */
    attr(args: { selector?: string, name: string }): string | undefined
    /** Returns True if the DOM matches the selector */
    is(args: { selector: string }): boolean | undefined
    /** Find elements using selector traversing down from self */
    query(args: { selector: string }): Element[] | undefined
    /** The list of children elements from self */
    children(args: { selector?: string }): Element[] | undefined
    /** The list of parent elements from self */
    parents(args: { selector?: string }): Element[] | undefined
    /** The parent element from self */
    parent?: Element
    /** The siblings elements from self */
    siblings(args: { selector?: string }): Element[] | undefined
    /** The immediately following sibling from self */
    next(args: { selector?: string }): Element | undefined
    /** The list of following siblings from self */
    nextAll(args: { selector?: string }): Element[] | undefined
    /** The immediately preceding sibling from self */
    prev(args: { selector?: string }): Element | undefined
    /** The list of preceding siblings from self */
    prevAll(args: { selector?: string }): Element[] | undefined
    /** Visit will visit the href of the link and return the corresponding document */
    visit?: Document
}