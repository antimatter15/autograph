export const url = "https://www.graphqlhub.com/graphql"

/** APIs exposed as GraphQL */
export type GraphQLHubAPI = {
    /** About GraphQLHub */
    graphQLHub?: string

    hn?: HackerNewsAPI

    hn2?: HackerNewsAPIV2

    reddit?: RedditAPI

    keyValue?: KeyValueAPI

    github?: GithubAPI

    twitter?: TwitterAPI

    giphy?: GiphyAPI

}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
/** The Hacker News V0 API */
export type HackerNewsAPI = {
    item(args: { id: number }): HackerNewsItem | null

    user(args: { id: string }): HackerNewsUser | null

    /** Up to 500 of the top stories */
    topStories(args: { limit?: number, offset?: number }): HackerNewsItem[] | null

    /** Up to 500 of the newest stories */
    newStories(args: { limit?: number, offset?: number }): HackerNewsItem[] | null

    /** Up to 200 of the Show HN stories */
    showStories(args: { limit?: number, offset?: number }): HackerNewsItem[] | null

    /** Up to 200 of the Ask HN stories */
    askStories(args: { limit?: number, offset?: number }): HackerNewsItem[] | null

    /** Up to 200 of the Job stores */
    jobStories(args: { limit?: number, offset?: number }): HackerNewsItem[] | null

    /** Return list of stories */
    stories(args: { limit?: number, offset?: number, storyType: string }): HackerNewsItem[] | null

}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
/** Stories, comments, jobs, Ask HNs and even polls are just items. They're identified by their ids, which are unique integers */
export type HackerNewsItem = {
    /** The item's unique id. */
    id: string

    /** if the item is deleted */
    deleted?: boolean

    /** The type of item. One of "job", "story", "comment", "poll", or "pollopt". */
    type: ItemType

    /** The item's author. */
    by: HackerNewsUser

    /** Creation date of the item, in Unix Time. */
    time: number

    /** Creation date of the item, in ISO8601 */
    timeISO: string

    /** The comment, story or poll text. HTML. */
    text?: string

    /** if the item is dead */
    dead?: boolean

    /** The URL of the story. */
    url?: string

    /** The story's score, or the votes for a pollopt. */
    score?: number

    /** The title of the story, poll or job. */
    title?: string

    /** The item's comments, in ranked display order. */
    kids(args: { limit?: number, offset?: number }): HackerNewsItem[] | null

    /** The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll. */
    parent?: HackerNewsItem

    /** A list of related pollopts, in display order. */
    parts?: HackerNewsItem[]

    /** In the case of stories or polls, the total comment count. */
    descendants?: number

}

/** The `Boolean` scalar type represents `true` or `false`. */
/** The type of item */
export type ItemType = "job" | "story" | "comment" | "poll" | "pollopt"

/** Users are identified by case-sensitive ids. Only users that have public activity (comments or story submissions) on the site are available through the API. */
export type HackerNewsUser = {
    /** The user's unique username. Case-sensitive. Required. */
    id: string

    /** Delay in minutes between a comment's creation and its visibility to other users. */
    delay: number

    /** Creation date of the user, in Unix Time. */
    created: number

    /** Creation date of the user, in ISO8601 */
    createdISO: string

    /** The user's optional self-description. HTML. */
    about?: string

    /** List of the user's stories, polls and comments. */
    submitted(args: { limit?: number, offset?: number }): HackerNewsItem[] | null

}

/** The Hacker News V2 API; this is Relay-compatible (uses Nodes and Connections) */
export type HackerNewsAPIV2 = {
    /** Fetches an object given its ID */
    node(args: { id: string }): Node | null

    /** To ensure Node IDs are globally unique, GraphQLHub coerces IDs returned by the HN API. Use this field to get nodes via normal HN IDs */
    nodeFromHnId(args: { id: string, isUserId: boolean }): Node

}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
/** An object with an ID */
export type Node = {
    /** The id of the object. */
    id: string

}

export type HackerNewsV2Story = {
    /** The ID of an object */
    id: string

    /** The item's unique id. */
    hnId: string

    /** The item's author. */
    by: HackerNewsV2User

    /** In the case of stories or polls, the total comment count. */
    descendants?: number

    /** The story's score, or the votes for a pollopt. */
    score?: number

    /** Creation date of the item, in Unix Time. */
    time: number

    /** Creation date of the item, in ISO8601 */
    timeISO: string

    /** The title of the story, poll or job. */
    title?: string

    /** The URL of the story. */
    url?: string

    /** The comment, story or poll text. HTML. */
    text?: string

    /** The item's comments, in ranked display order. */
    kids(args: { after?: string, first?: number, before?: string, last?: number }): HackerNewsV2CommentConnection | null

    /** if the item is deleted */
    deleted?: boolean

    /** if the item is dead */
    dead?: boolean

}

export type HackerNewsV2User = {
    /** The ID of an object */
    id: string

    /** The item's unique id. */
    hnId: string

    /** Delay in minutes between a comment's creation and its visibility to other users. */
    delay?: number

    /** Creation date of the user, in Unix Time. */
    created?: number

    /** Creation date of the user, in ISO8601 */
    createdISO?: string

    /** The user's optional self-description. HTML. */
    about?: string

    /** List of the user's stories, polls and comments. */
    submitted(args: { after?: string, first?: number, before?: string, last?: number }): NodeConnection | null

}

/** A connection to a list of items. */
export type NodeConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** Information to aid in pagination. */
    edges?: NodeEdge[]

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
export type NodeEdge = {
    /** The item at the end of the edge */
    node?: Node

    /** A cursor for use in pagination */
    cursor: string

}

/** A connection to a list of items. */
export type HackerNewsV2CommentConnection = {
    /** Information to aid in pagination. */
    pageInfo: PageInfo

    /** Information to aid in pagination. */
    edges?: HackerNewsV2CommentEdge[]

}

/** An edge in a connection. */
export type HackerNewsV2CommentEdge = {
    /** The item at the end of the edge */
    node?: HackerNewsV2Comment

    /** A cursor for use in pagination */
    cursor: string

}

export type HackerNewsV2Comment = {
    /** The ID of an object */
    id: string

    /** The item's unique id. */
    hnId: string

    /** The item's author. */
    by: HackerNewsV2User

    /** The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll. */
    parent?: Node

    /** The comment, story or poll text. HTML. */
    text?: string

    /** Creation date of the item, in Unix Time. */
    time: number

    /** Creation date of the item, in ISO8601 */
    timeISO: string

    /** The item's comments, in ranked display order. */
    kids(args: { after?: string, first?: number, before?: string, last?: number }): HackerNewsV2CommentConnection | null

    /** if the item is deleted */
    deleted?: boolean

    /** if the item is dead */
    dead?: boolean

}

export type HackerNewsV2Job = {
    /** The ID of an object */
    id: string

    /** The item's unique id. */
    hnId: string

    /** The item's author. */
    by: HackerNewsV2User

    /** The story's score, or the votes for a pollopt. */
    score?: number

    /** The comment, story or poll text. HTML. */
    text?: string

    /** Creation date of the item, in Unix Time. */
    time: number

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

export type HackerNewsV2Poll = {
    /** The ID of an object */
    id: string

    /** The item's unique id. */
    hnId: string

    /** The item's author. */
    by: HackerNewsV2User

    /** In the case of stories or polls, the total comment count. */
    descendants?: number

    /** The story's score, or the votes for a pollopt. */
    score?: number

    /** Creation date of the item, in Unix Time. */
    time: number

    /** Creation date of the item, in ISO8601 */
    timeISO: string

    /** The title of the story, poll or job. */
    title?: string

    /** The comment, story or poll text. HTML. */
    text?: string

    /** The item's comments, in ranked display order. */
    kids(args: { after?: string, first?: number, before?: string, last?: number }): HackerNewsV2CommentConnection | null

    /** if the item is deleted */
    deleted?: boolean

    /** if the item is dead */
    dead?: boolean

    /** A list of related pollopts, in display order. */
    parts?: HackerNewsV2PollPart[]

}

export type HackerNewsV2PollPart = {
    /** The ID of an object */
    id: string

    /** The item's unique id. */
    hnId: string

    /** The item's author. */
    by: HackerNewsV2User

    /** The story's score, or the votes for a pollopt. */
    score?: number

    /** Creation date of the item, in Unix Time. */
    time: number

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
export type RedditAPI = {
    subreddit(args: { name: string }): RedditSubreddit | null

    user(args: { username: string }): RedditUser | null

}

/** Information about and listings in a subreddit */
export type RedditSubreddit = {
    /** Name of the subreddit */
    name: string

    /** The Reddit API fullname of the subreddit */
    fullnameId: string

    /** Title of the subreddit */
    title: string

    /** Description of the subreddit */
    publicDescription: string

    /** Accounts active right now on the subreddit */
    accountsActive: number

    /** Number of subscribers to the subreddit */
    subscribers: number

    /** Creation date of the subreddit, in Unix Time (UTC) */
    created: number

    /** Creation date of the subreddit, in ISO8601 */
    createdISO: string

    /** Hot/"Front Page" listings of the subreddit */
    hotListings(args: { after?: string, before?: string, count?: number, limit?: number }): RedditLink[]

    /** Newest listings of the subreddit */
    newListings(args: { after?: string, before?: string, count?: number, limit?: number }): RedditLink[]

    /** Rising listings of the subreddit */
    risingListings(args: { after?: string, before?: string, count?: number, limit?: number }): RedditLink[]

    /** Controversial listings of the subreddit */
    controversialListings(args: { after?: string, before?: string, count?: number, limit?: number, timeInterval?: TimeInterval }): RedditLink[]

    /** Top listings of the subreddit */
    topListings(args: { after?: string, before?: string, count?: number, limit?: number, timeInterval?: TimeInterval }): RedditLink[]

}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).  */
/** A link posted to a subreddit */
export type RedditLink = {
    /** Title of the link */
    title: string

    /** The Reddit API fullname of the link */
    fullnameId: string

    /** Score of the link */
    score: number

    /** Number of comments */
    numComments: number

    /** URL of the link */
    url: string

    /** Author of the link */
    author: RedditUser

    /** Comments on the link */
    comments(args: { depth?: number, limit?: number }): RedditComment[]

}

/** Information about a Reddit user */
export type RedditUser = {
    /** The Reddit API fullname of the user */
    fullnameId: string

    /** The user's unique username. */
    username: string

    /** Creation date of the user, in Unix Time (UTC) */
    created: number

    /** Creation date of the user, in ISO8601 */
    createdISO: string

    /** Karma by links of the user */
    linkKarma: number

    /** Karma by comments of the user */
    commentKarma: number

}

/** A comment on a link */
export type RedditComment = {
    /** Author of the comment */
    author: RedditUser

    /** Body of the comment */
    body: string

    /** Replies to the comment */
    replies(args: { depth?: number, limit?: number }): RedditComment[]

}

/** Time interval by which listings are queried */
export type TimeInterval = "hour" | "day" | "week" | "month" | "year" | "all"

/** An in-memory key-value store */
export type KeyValueAPI = {
    getValue(args: { id: string }): KeyValueItem | null

}

/** Item for a key-value pair */
export type KeyValueItem = {
    /** The item's unique id. */
    id: string

    /** The item's value. */
    value?: string

}

/** The Github API */
export type GithubAPI = {
    user(args: { username: string }): GithubUser | null

    repo(args: { name: string, ownerUsername: string }): GithubRepo | null

}

export type GithubUser = {
    login?: string

    id?: number

    company?: string

    avatar_url?: string

    repos?: GithubRepo[]

}

export type GithubRepo = {
    id?: number

    name?: string

    commits(args: { limit?: number }): GithubCommit[] | null

    issues(args: { limit?: number }): GithubIssue[] | null

    branches(args: { limit?: number }): GithubBranch[] | null

    owner?: GithubUser

}

export type GithubCommit = {
    sha?: string

    author?: UserOrCommitAuthor

    message?: string

    date?: string

    status?: GithubStatus[]

    tree?: GithubTree

}

export type UserOrCommitAuthor = GithubCommitAuthor | GithubUser

/** Commit author that is not associated with a Github acount */
export type GithubCommitAuthor = {
    email?: string

    name?: string

}

/** Status of a commit */
export type GithubStatus = {
    state?: string

    description?: string

    target_url?: string

    context?: string

    updated_at?: string

}

export type GithubTree = {
    entries?: GithubTreeEntry[]

}

export type GithubTreeEntry = {
    path?: string

    last_commit?: GithubCommit

}

export type GithubIssue = {
    id?: number

    state?: string

    title?: string

    body?: string

    user?: GithubUser

    assignee?: GithubUser

    closed_by?: GithubUser

    labels?: GithubIssueLabelType[]

    commentCount?: number

    comments?: GithubIssueCommentType[]

}

export type GithubIssueLabelType = {
    url?: string

    name?: string

    color?: string

}

export type GithubIssueCommentType = {
    id?: number

    body?: string

    user?: GithubUser

}

export type GithubBranch = {
    name?: string

    lastCommit?: GithubCommit

}

/** The Twitter API */
export type TwitterAPI = {
    user(args: { identifier: UserIdentifier, identity: any }): TwitterUser | null

    tweet(args: { id: string }): Tweet | null

    /** Returns a collection of relevant Tweets matching a specified query. */
    search(args: { q: string, count?: number, result_type?: SearchReponse }): Tweet[] | null

}

/** Either user unique ID, or screen name */
export type UserIdentifier = "id" | "name"

/** Parse user provided identity */
/** Twitter user */
export type TwitterUser = {
    created_at?: string

    description?: string

    id?: string

    screen_name?: string

    name?: string

    profile_image_url?: string

    url?: string

    tweets_count?: number

    followers_count?: number

    /** Get a list of tweets for current user */
    tweets(args: { limit?: number }): Tweet[] | null

}

/** A tweet object */
export type Tweet = {
    id?: string

    created_at?: string

    text?: string

    retweet_count?: number

    user?: TwitterUser

    /** Get a list of retweets */
    retweets(args: { limit?: number }): Retweet[] | null

}

/** Retweet of a tweet */
export type Retweet = {
    id?: string

    created_at?: string

    in_reply_to_tweet_id?: string

    in_reply_to_user_id?: number

    in_reply_to_screen_name?: string

    retweeted_status?: Tweet

    user?: TwitterUser

}

/** Type of search response. */
export type SearchReponse = "mixed" | "recent" | "popular"

export type GiphyAPI = {
    gif(args: { id: string }): GiphyGIFData | null

    search(args: { query: string, limit?: number, offset?: number, rating?: GiphyRatingType }): GiphyGIFData[] | null

    random(args: { tag?: string, rating?: GiphyRatingType }): GiphyGIFData | null

}

export type GiphyGIFData = {
    /** The item's unique id. */
    id: string

    url: string

    images: GiphyGIFImages

}

export type GiphyGIFImages = {
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

export type GiphyGIFImageDataFixedHeight = {
    url: string

    width: string

    height: string

    size: string

    mp4: string

    mp4_size: string

    webp: string

    webp_size: string

}

export type GiphyGIFImageDataFixedHeightStill = {
    url: string

    width: string

    height: string

}

export type GiphyGIFImageDataFixedHeightDownsample = {
    url: string

    width: string

    height: string

    size: string

    webp: string

    webp_size: string

}

export type GiphyGIFImageDataFixedWidth = {
    url: string

    width: string

    height: string

    size: string

    mp4: string

    mp4_size: string

    webp: string

    webp_size: string

}

export type GiphyGIFImageDataFixedWidthStill = {
    url: string

    width: string

    height: string

}

export type GiphyGIFImageDataFixedWidthDownsample = {
    url: string

    width: string

    height: string

    size: string

    webp: string

    webp_size: string

}

export type GiphyGIFImageDataFixedHeightSmall = {
    url: string

    width: string

    height: string

    size: string

    webp: string

    webp_size: string

}

export type GiphyGIFImageDataFixedHeightSmallStill = {
    url: string

    width: string

    height: string

}

export type GiphyGIFImageDataFixedWidthSmall = {
    url: string

    width: string

    height: string

    size: string

    webp: string

    webp_size: string

}

export type GiphyGIFImageDataFixedWidthSmallStill = {
    url: string

    width: string

    height: string

}

export type GiphyGIFImageDataDownsized = {
    url: string

    width: string

    height: string

    small: string

}

export type GiphyGIFImageDataDownsizedStill = {
    url: string

    width: string

    height: string

}

export type GiphyGIFImageDataDownsizedLarge = {
    url: string

    width: string

    height: string

    size: string

}

export type GiphyGIFImageDataOriginal = {
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

export type GiphyGIFImageDataOriginalStill = {
    url: string

    width: string

    height: string

}

export type GiphyGIFImageDataLooping = {
    mp4: string

}

/** The rating of a GIF */
export type GiphyRatingType = "y" | "g" | "pg" | "pg13" | "r"

/** APIs exposed as GraphQL mutations */
export type GraphQLHubMutationAPI = {
    keyValue_setValue(args: { input: SetValueForKeyInput }): SetValueForKeyPayload | null

}

export type SetValueForKeyInput = {
    id: string

    value: string

    clientMutationId: string

}

export type SetValueForKeyPayload = {
    item?: KeyValueItem

    clientMutationId: string

}

