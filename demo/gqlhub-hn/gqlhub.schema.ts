export type Query = GraphQLHubAPI

export type Mutation = GraphQLHubMutationAPI

type GQLType = {
    /** The name of the object type */
    __typename: string
}

/** APIs exposed as GraphQL */
export type GraphQLHubAPI = GQLType & {
    /** About GraphQLHub */
    graphQLHub?: string
    hn?: HackerNewsAPI
    hn2?: HackerNewsAPIV2
    reddit?: RedditAPI
    keyValue?: KeyValueAPI
    github?: GithubAPI
    twitter?: TwitterAPI
    giphy?: GiphyAPI

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** The Hacker News V0 API */
export type HackerNewsAPI = GQLType & {
    item?(args: { id: Int }): HackerNewsItem
    user?(args: { id: string }): HackerNewsUser
    /** Up to 500 of the top stories */
    topStories?(args: { limit?: Int; offset?: Int }): HackerNewsItem[]
    /** Up to 500 of the newest stories */
    newStories?(args: { limit?: Int; offset?: Int }): HackerNewsItem[]
    /** Up to 200 of the Show HN stories */
    showStories?(args: { limit?: Int; offset?: Int }): HackerNewsItem[]
    /** Up to 200 of the Ask HN stories */
    askStories?(args: { limit?: Int; offset?: Int }): HackerNewsItem[]
    /** Up to 200 of the Job stores */
    jobStories?(args: { limit?: Int; offset?: Int }): HackerNewsItem[]
    /** Return list of stories */
    stories?(args: { limit?: Int; offset?: Int; storyType: string }): HackerNewsItem[]
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

/** Stories, comments, jobs, Ask HNs and even polls are just items. They're identified by their ids, which are unique integers */
export type HackerNewsItem = GQLType & {
    /** The item's unique id. */
    id: string
    /** if the item is deleted */
    deleted?: boolean
    /** The type of item. One of "job", "story", "comment", "poll", or "pollopt". */
    type: ItemType
    /** The item's author. */
    by: HackerNewsUser
    /** Creation date of the item, in Unix Time. */
    time: Int
    /** Creation date of the item, in ISO8601 */
    timeISO: string
    /** The comment, story or poll text. HTML. */
    text?: string
    /** if the item is dead */
    dead?: boolean
    /** The URL of the story. */
    url?: string
    /** The story's score, or the votes for a pollopt. */
    score?: Int
    /** The title of the story, poll or job. */
    title?: string
    /** The item's comments, in ranked display order. */
    kids?(args: { limit?: Int; offset?: Int }): HackerNewsItem[]
    /** The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll. */
    parent?: HackerNewsItem
    /** A list of related pollopts, in display order. */
    parts?: HackerNewsItem[]
    /** In the case of stories or polls, the total comment count. */
    descendants?: Int
}

/** The type of item */
export type ItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt'

/** Users are identified by case-sensitive ids. Only users that have public activity (comments or story submissions) on the site are available through the API. */
export type HackerNewsUser = GQLType & {
    /** The user's unique username. Case-sensitive. Required. */
    id: string
    /** Delay in minutes between a comment's creation and its visibility to other users. */
    delay: Int
    /** Creation date of the user, in Unix Time. */
    created: Int
    /** Creation date of the user, in ISO8601 */
    createdISO: string
    /** The user's optional self-description. HTML. */
    about?: string
    /** List of the user's stories, polls and comments. */
    submitted?(args: { limit?: Int; offset?: Int }): HackerNewsItem[]
}

/** The Hacker News V2 API; this is Relay-compatible (uses Nodes and Connections) */
export type HackerNewsAPIV2 = GQLType & {
    /** Fetches an object given its ID */
    node?(args: { id: ID }): Node
    /** To ensure Node IDs are globally unique, GraphQLHub coerces IDs returned by the HN API. Use this field to get nodes via normal HN IDs */
    nodeFromHnId(args: { id: string; isUserId: boolean }): Node
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** An object with an ID */
export interface Node extends GQLType {
    /** The id of the object. */
    id: ID
    /** Use `asHackerNewsV2Story` to access fields on the underlying concrete type. */
    asHackerNewsV2Story: HackerNewsV2Story
    /** Use `asHackerNewsV2User` to access fields on the underlying concrete type. */
    asHackerNewsV2User: HackerNewsV2User
    /** Use `asHackerNewsV2Comment` to access fields on the underlying concrete type. */
    asHackerNewsV2Comment: HackerNewsV2Comment
    /** Use `asHackerNewsV2Job` to access fields on the underlying concrete type. */
    asHackerNewsV2Job: HackerNewsV2Job
    /** Use `asHackerNewsV2Poll` to access fields on the underlying concrete type. */
    asHackerNewsV2Poll: HackerNewsV2Poll
    /** Use `asHackerNewsV2PollPart` to access fields on the underlying concrete type. */
    asHackerNewsV2PollPart: HackerNewsV2PollPart
}

export type HackerNewsV2Story = GQLType & {
    /** The ID of an object */
    id: ID
    /** The item's unique id. */
    hnId: string
    /** The item's author. */
    by: HackerNewsV2User
    /** In the case of stories or polls, the total comment count. */
    descendants?: Int
    /** The story's score, or the votes for a pollopt. */
    score?: Int
    /** Creation date of the item, in Unix Time. */
    time: Int
    /** Creation date of the item, in ISO8601 */
    timeISO: string
    /** The title of the story, poll or job. */
    title?: string
    /** The URL of the story. */
    url?: string
    /** The comment, story or poll text. HTML. */
    text?: string
    /** The item's comments, in ranked display order. */
    kids?(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): HackerNewsV2CommentConnection
    /** if the item is deleted */
    deleted?: boolean
    /** if the item is dead */
    dead?: boolean
}

export type HackerNewsV2User = GQLType & {
    /** The ID of an object */
    id: ID
    /** The item's unique id. */
    hnId: string
    /** Delay in minutes between a comment's creation and its visibility to other users. */
    delay?: Int
    /** Creation date of the user, in Unix Time. */
    created?: Int
    /** Creation date of the user, in ISO8601 */
    createdISO?: string
    /** The user's optional self-description. HTML. */
    about?: string
    /** List of the user's stories, polls and comments. */
    submitted?(args: { after?: string; first?: Int; before?: string; last?: Int }): NodeConnection
}

/** A connection to a list of items. */
export type NodeConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Information to aid in pagination. */
    edges?: NodeEdge[]
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
export type NodeEdge = GQLType & {
    /** The item at the end of the edge */
    node?: Node
    /** A cursor for use in pagination */
    cursor: string
}

/** A connection to a list of items. */
export type HackerNewsV2CommentConnection = GQLType & {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Information to aid in pagination. */
    edges?: HackerNewsV2CommentEdge[]
}

/** An edge in a connection. */
export type HackerNewsV2CommentEdge = GQLType & {
    /** The item at the end of the edge */
    node?: HackerNewsV2Comment
    /** A cursor for use in pagination */
    cursor: string
}

export type HackerNewsV2Comment = GQLType & {
    /** The ID of an object */
    id: ID
    /** The item's unique id. */
    hnId: string
    /** The item's author. */
    by: HackerNewsV2User
    /** The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll. */
    parent?: Node
    /** The comment, story or poll text. HTML. */
    text?: string
    /** Creation date of the item, in Unix Time. */
    time: Int
    /** Creation date of the item, in ISO8601 */
    timeISO: string
    /** The item's comments, in ranked display order. */
    kids?(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): HackerNewsV2CommentConnection
    /** if the item is deleted */
    deleted?: boolean
    /** if the item is dead */
    dead?: boolean
}

export type HackerNewsV2Job = GQLType & {
    /** The ID of an object */
    id: ID
    /** The item's unique id. */
    hnId: string
    /** The item's author. */
    by: HackerNewsV2User
    /** The story's score, or the votes for a pollopt. */
    score?: Int
    /** The comment, story or poll text. HTML. */
    text?: string
    /** Creation date of the item, in Unix Time. */
    time: Int
    /** Creation date of the item, in ISO8601 */
    timeISO: string
    /** The title of the story, poll or job. */
    title?: string
    /** The URL of the story. */
    url?: string
    /** if the item is deleted */
    deleted?: boolean
    /** if the item is dead */
    dead?: boolean
}

export type HackerNewsV2Poll = GQLType & {
    /** The ID of an object */
    id: ID
    /** The item's unique id. */
    hnId: string
    /** The item's author. */
    by: HackerNewsV2User
    /** In the case of stories or polls, the total comment count. */
    descendants?: Int
    /** The story's score, or the votes for a pollopt. */
    score?: Int
    /** Creation date of the item, in Unix Time. */
    time: Int
    /** Creation date of the item, in ISO8601 */
    timeISO: string
    /** The title of the story, poll or job. */
    title?: string
    /** The comment, story or poll text. HTML. */
    text?: string
    /** The item's comments, in ranked display order. */
    kids?(args: {
        after?: string
        first?: Int
        before?: string
        last?: Int
    }): HackerNewsV2CommentConnection
    /** if the item is deleted */
    deleted?: boolean
    /** if the item is dead */
    dead?: boolean
    /** A list of related pollopts, in display order. */
    parts?: HackerNewsV2PollPart[]
}

export type HackerNewsV2PollPart = GQLType & {
    /** The ID of an object */
    id: ID
    /** The item's unique id. */
    hnId: string
    /** The item's author. */
    by: HackerNewsV2User
    /** The story's score, or the votes for a pollopt. */
    score?: Int
    /** Creation date of the item, in Unix Time. */
    time: Int
    /** Creation date of the item, in ISO8601 */
    timeISO: string
    /** The comment, story or poll text. HTML. */
    text?: string
    /** The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll. */
    parent?: Node
    /** if the item is deleted */
    deleted?: boolean
}

/** The Reddit API */
export type RedditAPI = GQLType & {
    subreddit?(args: { name: string }): RedditSubreddit
    user?(args: { username: string }): RedditUser
}

/** Information about and listings in a subreddit */
export type RedditSubreddit = GQLType & {
    /** Name of the subreddit */
    name: string
    /** The Reddit API fullname of the subreddit */
    fullnameId: string
    /** Title of the subreddit */
    title: string
    /** Description of the subreddit */
    publicDescription: string
    /** Accounts active right now on the subreddit */
    accountsActive: Int
    /** Number of subscribers to the subreddit */
    subscribers: Int
    /** Creation date of the subreddit, in Unix Time (UTC) */
    created: Float
    /** Creation date of the subreddit, in ISO8601 */
    createdISO: string
    /** Hot/"Front Page" listings of the subreddit */
    hotListings(args: { after?: string; before?: string; count?: Int; limit?: Int }): RedditLink[]
    /** Newest listings of the subreddit */
    newListings(args: { after?: string; before?: string; count?: Int; limit?: Int }): RedditLink[]
    /** Rising listings of the subreddit */
    risingListings(args: {
        after?: string
        before?: string
        count?: Int
        limit?: Int
    }): RedditLink[]
    /** Controversial listings of the subreddit */
    controversialListings(args: {
        after?: string
        before?: string
        count?: Int
        limit?: Int
        timeInterval?: TimeInterval
    }): RedditLink[]
    /** Top listings of the subreddit */
    topListings(args: {
        after?: string
        before?: string
        count?: Int
        limit?: Int
        timeInterval?: TimeInterval
    }): RedditLink[]
}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

/** A link posted to a subreddit */
export type RedditLink = GQLType & {
    /** Title of the link */
    title: string
    /** The Reddit API fullname of the link */
    fullnameId: string
    /** Score of the link */
    score: Int
    /** Number of comments */
    numComments: Int
    /** URL of the link */
    url: string
    /** Author of the link */
    author: RedditUser
    /** Comments on the link */
    comments(args: { depth?: Int; limit?: Int }): RedditComment[]
}

/** Information about a Reddit user */
export type RedditUser = GQLType & {
    /** The Reddit API fullname of the user */
    fullnameId: string
    /** The user's unique username. */
    username: string
    /** Creation date of the user, in Unix Time (UTC) */
    created: Float
    /** Creation date of the user, in ISO8601 */
    createdISO: string
    /** Karma by links of the user */
    linkKarma: Int
    /** Karma by comments of the user */
    commentKarma: Int
}

/** A comment on a link */
export type RedditComment = GQLType & {
    /** Author of the comment */
    author: RedditUser
    /** Body of the comment */
    body: string
    /** Replies to the comment */
    replies(args: { depth?: Int; limit?: Int }): RedditComment[]
}

/** Time interval by which listings are queried */
export type TimeInterval = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'

/** An in-memory key-value store */
export type KeyValueAPI = GQLType & {
    getValue?(args: { id: string }): KeyValueItem
}

/** Item for a key-value pair */
export type KeyValueItem = GQLType & {
    /** The item's unique id. */
    id: string
    /** The item's value. */
    value?: string
}

/** The Github API */
export type GithubAPI = GQLType & {
    user?(args: { username: string }): GithubUser
    repo?(args: { name: string; ownerUsername: string }): GithubRepo
}

export type GithubUser = GQLType & {
    login?: string
    id?: Int
    company?: string
    avatar_url?: string
    repos?: GithubRepo[]
}

export type GithubRepo = GQLType & {
    id?: Int
    name?: string
    commits?(args: { limit?: Int }): GithubCommit[]
    issues?(args: { limit?: Int }): GithubIssue[]
    branches?(args: { limit?: Int }): GithubBranch[]
    owner?: GithubUser
}

export type GithubCommit = GQLType & {
    sha?: string
    author?: UserOrCommitAuthor
    message?: string
    date?: string
    status?: GithubStatus[]
    tree?: GithubTree
}

export type UserOrCommitAuthor = GithubCommitAuthor | GithubUser

/** Commit author that is not associated with a Github acount */
export type GithubCommitAuthor = GQLType & {
    email?: string
    name?: string
}

/** Status of a commit */
export type GithubStatus = GQLType & {
    state?: string
    description?: string
    target_url?: string
    context?: string
    updated_at?: string
}

export type GithubTree = GQLType & {
    entries?: GithubTreeEntry[]
}

export type GithubTreeEntry = GQLType & {
    path?: string
    last_commit?: GithubCommit
}

export type GithubIssue = GQLType & {
    id?: Int
    state?: string
    title?: string
    body?: string
    user?: GithubUser
    assignee?: GithubUser
    closed_by?: GithubUser
    labels?: GithubIssueLabelType[]
    commentCount?: Int
    comments?: GithubIssueCommentType[]
}

export type GithubIssueLabelType = GQLType & {
    url?: string
    name?: string
    color?: string
}

export type GithubIssueCommentType = GQLType & {
    id?: Int
    body?: string
    user?: GithubUser
}

export type GithubBranch = GQLType & {
    name?: string
    lastCommit?: GithubCommit
}

/** The Twitter API */
export type TwitterAPI = GQLType & {
    user?(args: { identifier: UserIdentifier; identity: UserIdentity }): TwitterUser
    tweet?(args: { id: string }): Tweet
    /** Returns a collection of relevant Tweets matching a specified query. */
    search?(args: { q: string; count?: Int; result_type?: SearchReponse }): Tweet[]
}

/** Either user unique ID, or screen name */
export type UserIdentifier = 'id' | 'name'

/** Parse user provided identity */
export type UserIdentity = any

/** Twitter user */
export type TwitterUser = GQLType & {
    created_at?: string
    description?: string
    id?: ID
    screen_name?: string
    name?: string
    profile_image_url?: string
    url?: string
    tweets_count?: Int
    followers_count?: Int
    /** Get a list of tweets for current user */
    tweets?(args: { limit?: Int }): Tweet[]
}

/** A tweet object */
export type Tweet = GQLType & {
    id?: ID
    created_at?: string
    text?: string
    retweet_count?: Int
    user?: TwitterUser
    /** Get a list of retweets */
    retweets?(args: { limit?: Int }): Retweet[]
}

/** Retweet of a tweet */
export type Retweet = GQLType & {
    id?: ID
    created_at?: string
    in_reply_to_tweet_id?: string
    in_reply_to_user_id?: Int
    in_reply_to_screen_name?: string
    retweeted_status?: Tweet
    user?: TwitterUser
}

/** Type of search response. */
export type SearchReponse = 'mixed' | 'recent' | 'popular'

export type GiphyAPI = GQLType & {
    gif?(args: { id: string }): GiphyGIFData
    search?(args: {
        query: string
        limit?: Int
        offset?: Int
        rating?: GiphyRatingType
    }): GiphyGIFData[]
    random?(args: { tag?: string; rating?: GiphyRatingType }): GiphyGIFData
}

export type GiphyGIFData = GQLType & {
    /** The item's unique id. */
    id: string
    url: string
    images: GiphyGIFImages
}

export type GiphyGIFImages = GQLType & {
    fixed_height?: GiphyGIFImageDataFixedHeight
    fixed_height_still?: GiphyGIFImageDataFixedHeightStill
    fixed_height_downsampled?: GiphyGIFImageDataFixedHeightDownsample
    fixed_width?: GiphyGIFImageDataFixedWidth
    fixed_width_still?: GiphyGIFImageDataFixedWidthStill
    fixed_width_downsampled?: GiphyGIFImageDataFixedWidthDownsample
    fixed_height_small?: GiphyGIFImageDataFixedHeightSmall
    fixed_height_small_still?: GiphyGIFImageDataFixedHeightSmallStill
    fixed_width_small?: GiphyGIFImageDataFixedWidthSmall
    fixed_width_small_still?: GiphyGIFImageDataFixedWidthSmallStill
    downsized?: GiphyGIFImageDataDownsized
    downsized_still?: GiphyGIFImageDataDownsizedStill
    downsized_large?: GiphyGIFImageDataDownsizedLarge
    original?: GiphyGIFImageDataOriginal
    original_still?: GiphyGIFImageDataOriginalStill
    looping?: GiphyGIFImageDataLooping
}

export type GiphyGIFImageDataFixedHeight = GQLType & {
    url: string
    width: string
    height: string
    size: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
}

export type GiphyGIFImageDataFixedHeightStill = GQLType & {
    url: string
    width: string
    height: string
}

export type GiphyGIFImageDataFixedHeightDownsample = GQLType & {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
}

export type GiphyGIFImageDataFixedWidth = GQLType & {
    url: string
    width: string
    height: string
    size: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
}

export type GiphyGIFImageDataFixedWidthStill = GQLType & {
    url: string
    width: string
    height: string
}

export type GiphyGIFImageDataFixedWidthDownsample = GQLType & {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
}

export type GiphyGIFImageDataFixedHeightSmall = GQLType & {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
}

export type GiphyGIFImageDataFixedHeightSmallStill = GQLType & {
    url: string
    width: string
    height: string
}

export type GiphyGIFImageDataFixedWidthSmall = GQLType & {
    url: string
    width: string
    height: string
    size: string
    webp: string
    webp_size: string
}

export type GiphyGIFImageDataFixedWidthSmallStill = GQLType & {
    url: string
    width: string
    height: string
}

export type GiphyGIFImageDataDownsized = GQLType & {
    url: string
    width: string
    height: string
    small: string
}

export type GiphyGIFImageDataDownsizedStill = GQLType & {
    url: string
    width: string
    height: string
}

export type GiphyGIFImageDataDownsizedLarge = GQLType & {
    url: string
    width: string
    height: string
    size: string
}

export type GiphyGIFImageDataOriginal = GQLType & {
    url: string
    width: string
    height: string
    size: string
    mp4: string
    mp4_size: string
    webp: string
    webp_size: string
    frames: string
}

export type GiphyGIFImageDataOriginalStill = GQLType & {
    url: string
    width: string
    height: string
}

export type GiphyGIFImageDataLooping = GQLType & {
    mp4: string
}

/** The rating of a GIF */
export type GiphyRatingType = 'y' | 'g' | 'pg' | 'pg13' | 'r'

/** APIs exposed as GraphQL mutations */
export type GraphQLHubMutationAPI = GQLType & {
    keyValue_setValue?(args: { input: SetValueForKeyInput }): SetValueForKeyPayload
}

export type SetValueForKeyInput = {
    id: string
    value: string
    clientMutationId: string
}

export type SetValueForKeyPayload = GQLType & {
    item?: KeyValueItem
    clientMutationId: string
}
