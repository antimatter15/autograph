type GQLType = {
    /** The name of the object type */
    __typename: string
}

export type Query = GQLType & {
    /** Testing endpoint to validate the API with */
    echo(args?: { text?: string }): string
    /** Find a group */
    group(args: { fullPath: ID }): Group | undefined
    /** Metadata about GitLab */
    metadata?: Metadata
    /** Find a namespace */
    namespace(args: { fullPath: ID }): Namespace | undefined
    /** Find a project */
    project(args: { fullPath: ID }): Project | undefined

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

export type Project = GQLType & {
    archived?: boolean
    avatarUrl?: string
    containerRegistryEnabled?: boolean
    createdAt?: Time
    description?: string
    /** The GitLab Flavored Markdown rendering of `description` */
    descriptionHtml?: string
    forksCount: Int
    fullPath: ID
    group?: Group
    httpUrlToRepo?: string
    id: ID
    importStatus?: string
    issue(args?: {
        iid?: string
        iids?: string[]
        state?: IssuableState
        labelName?: string[]
        createdBefore?: Time
        createdAfter?: Time
        updatedBefore?: Time
        updatedAfter?: Time
        closedBefore?: Time
        closedAfter?: Time
        search?: string
        sort?: Sort
    }): Issue | undefined
    issues(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        iid?: string
        iids?: string[]
        state?: IssuableState
        labelName?: string[]
        createdBefore?: Time
        createdAfter?: Time
        updatedBefore?: Time
        updatedAfter?: Time
        closedBefore?: Time
        closedAfter?: Time
        search?: string
        sort?: Sort
    }): IssueConnection | undefined
    issuesEnabled?: boolean
    jobsEnabled?: boolean
    lastActivityAt?: Time
    lfsEnabled?: boolean
    mergeRequest(args?: { iid?: string; iids?: string[] }): MergeRequest | undefined
    mergeRequests(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        iid?: string
        iids?: string[]
    }): MergeRequestConnection | undefined
    mergeRequestsEnabled?: boolean
    mergeRequestsFfOnlyEnabled?: boolean
    name: string
    nameWithNamespace: string
    namespace?: Namespace
    onlyAllowMergeIfAllDiscussionsAreResolved?: boolean
    onlyAllowMergeIfPipelineSucceeds?: boolean
    openIssuesCount?: Int
    path: string
    pipelines(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        status?: PipelineStatusEnum
        ref?: string
        sha?: string
    }): PipelineConnection | undefined
    printingMergeRequestLinkEnabled?: boolean
    publicJobs?: boolean
    repository?: Repository
    requestAccessEnabled?: boolean
    sharedRunnersEnabled?: boolean
    snippetsEnabled?: boolean
    sshUrlToRepo?: string
    starCount: Int
    statistics?: ProjectStatistics
    tagList?: string
    /** Permissions for the current user on the resource */
    userPermissions: ProjectPermissions
    visibility?: string
    webUrl?: string
    wikiEnabled?: boolean
}

export type ProjectPermissions = GQLType & {
    /** Whether or not a user can perform `admin_project` on this resource */
    adminProject: boolean
    /** Whether or not a user can perform `admin_remote_mirror` on this resource */
    adminRemoteMirror: boolean
    /** Whether or not a user can perform `admin_wiki` on this resource */
    adminWiki: boolean
    /** Whether or not a user can perform `archive_project` on this resource */
    archiveProject: boolean
    /** Whether or not a user can perform `change_namespace` on this resource */
    changeNamespace: boolean
    /** Whether or not a user can perform `change_visibility_level` on this resource */
    changeVisibilityLevel: boolean
    /** Whether or not a user can perform `create_deployment` on this resource */
    createDeployment: boolean
    /** Whether or not a user can perform `create_design` on this resource */
    createDesign: boolean
    /** Whether or not a user can perform `create_issue` on this resource */
    createIssue: boolean
    /** Whether or not a user can perform `create_label` on this resource */
    createLabel: boolean
    /** Whether or not a user can perform `create_merge_request_from` on this resource */
    createMergeRequestFrom: boolean
    /** Whether or not a user can perform `create_merge_request_in` on this resource */
    createMergeRequestIn: boolean
    /** Whether or not a user can perform `create_pages` on this resource */
    createPages: boolean
    /** Whether or not a user can perform `create_pipeline` on this resource */
    createPipeline: boolean
    /** Whether or not a user can perform `create_pipeline_schedule` on this resource */
    createPipelineSchedule: boolean
    /** Whether or not a user can perform `create_project_snippet` on this resource */
    createProjectSnippet: boolean
    /** Whether or not a user can perform `create_wiki` on this resource */
    createWiki: boolean
    /** Whether or not a user can perform `destroy_design` on this resource */
    destroyDesign: boolean
    /** Whether or not a user can perform `destroy_pages` on this resource */
    destroyPages: boolean
    /** Whether or not a user can perform `destroy_wiki` on this resource */
    destroyWiki: boolean
    /** Whether or not a user can perform `download_code` on this resource */
    downloadCode: boolean
    /** Whether or not a user can perform `download_wiki_code` on this resource */
    downloadWikiCode: boolean
    /** Whether or not a user can perform `fork_project` on this resource */
    forkProject: boolean
    /** Whether or not a user can perform `push_code` on this resource */
    pushCode: boolean
    /** Whether or not a user can perform `push_to_delete_protected_branch` on this resource */
    pushToDeleteProtectedBranch: boolean
    /** Whether or not a user can perform `read_commit_status` on this resource */
    readCommitStatus: boolean
    /** Whether or not a user can perform `read_cycle_analytics` on this resource */
    readCycleAnalytics: boolean
    /** Whether or not a user can perform `read_design` on this resource */
    readDesign: boolean
    /** Whether or not a user can perform `read_pages_content` on this resource */
    readPagesContent: boolean
    /** Whether or not a user can perform `read_project` on this resource */
    readProject: boolean
    /** Whether or not a user can perform `read_project_member` on this resource */
    readProjectMember: boolean
    /** Whether or not a user can perform `read_wiki` on this resource */
    readWiki: boolean
    /** Whether or not a user can perform `remove_fork_project` on this resource */
    removeForkProject: boolean
    /** Whether or not a user can perform `remove_pages` on this resource */
    removePages: boolean
    /** Whether or not a user can perform `remove_project` on this resource */
    removeProject: boolean
    /** Whether or not a user can perform `rename_project` on this resource */
    renameProject: boolean
    /** Whether or not a user can perform `request_access` on this resource */
    requestAccess: boolean
    /** Whether or not a user can perform `update_pages` on this resource */
    updatePages: boolean
    /** Whether or not a user can perform `update_wiki` on this resource */
    updateWiki: boolean
    /** Whether or not a user can perform `upload_file` on this resource */
    uploadFile: boolean
}

/** Represents a unique identifier that is Base64 obfuscated. It is often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"VXNlci0xMA=="`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

/** Time represented in ISO 8601 */
export type Time = any

export type Namespace = GQLType & {
    description?: string
    /** The GitLab Flavored Markdown rendering of `description` */
    descriptionHtml?: string
    fullName: string
    fullPath: ID
    id: ID
    lfsEnabled?: boolean
    name: string
    path: string
    projects(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        includeSubgroups?: boolean
    }): ProjectConnection
    requestAccessEnabled?: boolean
    visibility?: string
}

/** The connection type for Project. */
export type ProjectConnection = GQLType & {
    /** A list of edges. */
    edges?: ProjectEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type ProjectEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Project
}

/** Information about pagination in a connection. */
export type PageInfo = GQLType & {
    /** When paginating forwards, the cursor to continue. */
    endCursor?: string
    /** When paginating forwards, are there more items? */
    hasNextPage: boolean
    /** When paginating backwards, are there more items? */
    hasPreviousPage: boolean
    /** When paginating backwards, the cursor to continue. */
    startCursor?: string
}

export type Group = GQLType & {
    avatarUrl?: string
    description?: string
    /** The GitLab Flavored Markdown rendering of `description` */
    descriptionHtml?: string
    epic(args?: { iid?: ID; iids?: ID[] }): Epic | undefined
    epics(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        iid?: ID
        iids?: ID[]
    }): EpicConnection | undefined
    epicsEnabled?: boolean
    fullName: string
    fullPath: ID
    id: ID
    lfsEnabled?: boolean
    name: string
    parent?: Group
    path: string
    projects(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        includeSubgroups?: boolean
    }): ProjectConnection
    requestAccessEnabled?: boolean
    /** Permissions for the current user on the resource */
    userPermissions: GroupPermissions
    visibility?: string
    webUrl: string
}

export type GroupPermissions = GQLType & {
    /** Whether or not a user can perform `read_group` on this resource */
    readGroup: boolean
}

export type Epic = GQLType & {
    author: User
    children(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        iid?: ID
        iids?: ID[]
    }): EpicConnection | undefined
    closedAt?: Time
    createdAt?: Time
    description?: string
    /** All discussions on this noteable */
    discussions(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): DiscussionConnection
    dueDate?: Time
    dueDateFixed?: Time
    dueDateFromMilestones?: Time
    dueDateIsFixed?: boolean
    group: Group
    hasChildren: boolean
    hasIssues: boolean
    id: ID
    iid: ID
    issues(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): EpicIssueConnection | undefined
    /** All notes on this noteable */
    notes(args?: { first?: Int; after?: string; last?: Int; before?: string }): NoteConnection
    parent?: Epic
    reference(args?: { full?: boolean }): string
    relationPath?: string
    startDate?: Time
    startDateFixed?: Time
    startDateFromMilestones?: Time
    startDateIsFixed?: boolean
    state: EpicState
    title?: string
    updatedAt?: Time
    /** Permissions for the current user on the resource */
    userPermissions: EpicPermissions
    webPath: string
    webUrl: string
}

export interface Noteable extends GQLType {
    /** All discussions on this noteable */
    discussions: DiscussionConnection
    /** All notes on this noteable */
    notes: NoteConnection
    /** Use `asEpic` to access fields on the underlying concrete type. */
    asEpic: Epic
    /** Use `asEpicIssue` to access fields on the underlying concrete type. */
    asEpicIssue: EpicIssue
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asDesign` to access fields on the underlying concrete type. */
    asDesign: Design
    /** Use `asMergeRequest` to access fields on the underlying concrete type. */
    asMergeRequest: MergeRequest
}

/** The connection type for Note. */
export type NoteConnection = GQLType & {
    /** A list of edges. */
    edges?: NoteEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type NoteEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Note
}

export type Note = GQLType & {
    /** The user who wrote this note */
    author: User
    /** The content note itself */
    body: string
    /** The GitLab Flavored Markdown rendering of `note` */
    bodyHtml?: string
    createdAt: Time
    /** The discussion this note is a part of */
    discussion?: Discussion
    id: ID
    /** The position of this note on a diff */
    position?: DiffPosition
    /** The project this note is associated to */
    project?: Project
    resolvable: boolean
    /** The time the discussion was resolved */
    resolvedAt?: Time
    /** The user that resolved the discussion */
    resolvedBy?: User
    /** Whether or not this note was created by the system or by a user */
    system: boolean
    updatedAt: Time
    /** Permissions for the current user on the resource */
    userPermissions: NotePermissions
}

export type NotePermissions = GQLType & {
    /** Whether or not a user can perform `admin_note` on this resource */
    adminNote: boolean
    /** Whether or not a user can perform `award_emoji` on this resource */
    awardEmoji: boolean
    /** Whether or not a user can perform `create_note` on this resource */
    createNote: boolean
    /** Whether or not a user can perform `read_note` on this resource */
    readNote: boolean
    /** Whether or not a user can perform `resolve_note` on this resource */
    resolveNote: boolean
}

export type User = GQLType & {
    avatarUrl: string
    name: string
    username: string
    webUrl: string
}

export type Discussion = GQLType & {
    createdAt: Time
    id: ID
    /** All notes in the discussion */
    notes(args?: { first?: Int; after?: string; last?: Int; before?: string }): NoteConnection
    /** The ID used to reply to this discussion */
    replyId: ID
}

export type DiffPosition = GQLType & {
    diffRefs: DiffRefs
    /** The path of the file that was changed */
    filePath: string
    /** The total height of the image */
    height?: Int
    /** The line on head sha that was changed */
    newLine?: Int
    /** The path of the file on the head sha. */
    newPath?: string
    /** The line on start sha that was changed */
    oldLine?: Int
    /** The path of the file on the start sha. */
    oldPath?: string
    positionType: DiffPositionType
    /** The total width of the image */
    width?: Int
    /** The X postion on which the comment was made */
    x?: Int
    /** The Y position on which the comment was made */
    y?: Int
}

export type DiffRefs = GQLType & {
    /** The merge base of the branch the comment was made on */
    baseSha: string
    /** The sha of the head at the time the comment was made */
    headSha: string
    /** The sha of the branch being compared against */
    startSha: string
}

/** Type of file the position refers to */
export type DiffPositionType = 'text' | 'image'

/** The connection type for Discussion. */
export type DiscussionConnection = GQLType & {
    /** A list of edges. */
    edges?: DiscussionEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type DiscussionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Discussion
}

/** Check permissions for the current user on an epic */
export type EpicPermissions = GQLType & {
    /** Whether or not a user can perform `admin_epic` on this resource */
    adminEpic: boolean
    /** Whether or not a user can perform `award_emoji` on this resource */
    awardEmoji: boolean
    /** Whether or not a user can perform `create_epic` on this resource */
    createEpic: boolean
    /** Whether or not a user can perform `create_note` on this resource */
    createNote: boolean
    /** Whether or not a user can perform `destroy_epic` on this resource */
    destroyEpic: boolean
    /** Whether or not a user can perform `read_epic` on this resource */
    readEpic: boolean
    /** Whether or not a user can perform `read_epic_iid` on this resource */
    readEpicIid: boolean
    /** Whether or not a user can perform `update_epic` on this resource */
    updateEpic: boolean
}

/** State of a GitLab epic */
export type EpicState = 'opened' | 'closed'

/** The connection type for Epic. */
export type EpicConnection = GQLType & {
    /** A list of edges. */
    edges?: EpicEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type EpicEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Epic
}

/** The connection type for EpicIssue. */
export type EpicIssueConnection = GQLType & {
    /** A list of edges. */
    edges?: EpicIssueEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type EpicIssueEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: EpicIssue
}

export type EpicIssue = GQLType & {
    assignees(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): UserConnection | undefined
    author: User
    closedAt?: Time
    confidential: boolean
    createdAt: Time
    description?: string
    /** The GitLab Flavored Markdown rendering of `description` */
    descriptionHtml?: string
    designs?: DesignCollection
    discussionLocked: boolean
    /** All discussions on this noteable */
    discussions(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): DiscussionConnection
    downvotes: Int
    dueDate?: Time
    epicIssueId: ID
    iid: ID
    labels(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): LabelConnection | undefined
    milestone?: Milestone
    /** All notes on this noteable */
    notes(args?: { first?: Int; after?: string; last?: Int; before?: string }): NoteConnection
    reference(args?: { full?: boolean }): string
    relationPath?: string
    relativePosition?: Int
    state: IssueState
    taskCompletionStatus: TaskCompletionStatus
    title: string
    /** The GitLab Flavored Markdown rendering of `title` */
    titleHtml?: string
    updatedAt: Time
    upvotes: Int
    userNotesCount: Int
    /** Permissions for the current user on the resource */
    userPermissions: IssuePermissions
    webPath: string
    webUrl: string
    weight?: Int
}

/** Check permissions for the current user on a issue */
export type IssuePermissions = GQLType & {
    /** Whether or not a user can perform `admin_issue` on this resource */
    adminIssue: boolean
    /** Whether or not a user can perform `create_design` on this resource */
    createDesign: boolean
    /** Whether or not a user can perform `create_note` on this resource */
    createNote: boolean
    /** Whether or not a user can perform `destroy_design` on this resource */
    destroyDesign: boolean
    /** Whether or not a user can perform `read_design` on this resource */
    readDesign: boolean
    /** Whether or not a user can perform `read_issue` on this resource */
    readIssue: boolean
    /** Whether or not a user can perform `reopen_issue` on this resource */
    reopenIssue: boolean
    /** Whether or not a user can perform `update_issue` on this resource */
    updateIssue: boolean
}

/** State of a GitLab issue */
export type IssueState = 'opened' | 'closed' | 'locked'

/** The connection type for User. */
export type UserConnection = GQLType & {
    /** A list of edges. */
    edges?: UserEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type UserEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: User
}

/** The connection type for Label. */
export type LabelConnection = GQLType & {
    /** A list of edges. */
    edges?: LabelEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type LabelEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Label
}

export type Label = GQLType & {
    color: string
    description?: string
    /** The GitLab Flavored Markdown rendering of `description` */
    descriptionHtml?: string
    textColor: string
    title: string
}

export type Milestone = GQLType & {
    createdAt: Time
    description?: string
    dueDate?: Time
    startDate?: Time
    state: string
    title: string
    updatedAt: Time
}

/** Completion status of tasks */
export type TaskCompletionStatus = GQLType & {
    completedCount: Int
    count: Int
}

export type DesignCollection = GQLType & {
    /** All visible designs for this collection */
    designs(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        atVersion?: ID
    }): DesignConnection
    issue: Issue
    project: Project
    /** All versions related to all designs ordered newest first */
    versions(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): DesignVersionConnection
}

export type Issue = GQLType & {
    assignees(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): UserConnection | undefined
    author: User
    closedAt?: Time
    confidential: boolean
    createdAt: Time
    description?: string
    /** The GitLab Flavored Markdown rendering of `description` */
    descriptionHtml?: string
    designs?: DesignCollection
    discussionLocked: boolean
    /** All discussions on this noteable */
    discussions(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): DiscussionConnection
    downvotes: Int
    dueDate?: Time
    iid: ID
    labels(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): LabelConnection | undefined
    milestone?: Milestone
    /** All notes on this noteable */
    notes(args?: { first?: Int; after?: string; last?: Int; before?: string }): NoteConnection
    reference(args?: { full?: boolean }): string
    relativePosition?: Int
    state: IssueState
    taskCompletionStatus: TaskCompletionStatus
    title: string
    /** The GitLab Flavored Markdown rendering of `title` */
    titleHtml?: string
    updatedAt: Time
    upvotes: Int
    userNotesCount: Int
    /** Permissions for the current user on the resource */
    userPermissions: IssuePermissions
    webPath: string
    webUrl: string
    weight?: Int
}

/** The connection type for Design. */
export type DesignConnection = GQLType & {
    /** A list of edges. */
    edges?: DesignEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type DesignEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Design
}

export type Design = GQLType & {
    diffRefs: DiffRefs
    /** All discussions on this noteable */
    discussions(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): DiscussionConnection
    filename: string
    fullPath: string
    id: ID
    image: string
    issue: Issue
    /** All notes on this noteable */
    notes(args?: { first?: Int; after?: string; last?: Int; before?: string }): NoteConnection
    project: Project
    /** All versions related to this design ordered newest first */
    versions(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): DesignVersionConnection
}

/** The connection type for DesignVersion. */
export type DesignVersionConnection = GQLType & {
    /** A list of edges. */
    edges?: DesignVersionEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type DesignVersionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: DesignVersion
}

export type DesignVersion = GQLType & {
    /** All designs that were changed in this version */
    designs(args?: { first?: Int; after?: string; last?: Int; before?: string }): DesignConnection
    id: ID
    sha: ID
}

export type ProjectStatistics = GQLType & {
    buildArtifactsSize: Int
    commitCount: Int
    lfsObjectsSize: Int
    packagesSize: Int
    repositorySize: Int
    storageSize: Int
    wikiSize?: Int
}

export type Repository = GQLType & {
    empty: boolean
    exists: boolean
    rootRef?: string
    tree(args?: { path?: string; ref?: string; recursive?: boolean }): Tree | undefined
}

export type Tree = GQLType & {
    blobs(args?: { first?: Int; after?: string; last?: Int; before?: string }): BlobConnection
    lastCommit?: Commit
    submodules(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): SubmoduleConnection
    trees(args?: { first?: Int; after?: string; last?: Int; before?: string }): TreeEntryConnection
}

export type Commit = GQLType & {
    author?: User
    authoredDate?: Time
    description?: string
    id: ID
    /** Latest pipeline for this commit */
    latestPipeline?: Pipeline
    message?: string
    sha: string
    title?: string
    webUrl: string
}

export type Pipeline = GQLType & {
    beforeSha?: string
    committedAt?: Time
    /** Coverage percentage */
    coverage?: Float
    createdAt: Time
    detailedStatus: DetailedStatus
    /** Duration of the pipeline in seconds */
    duration?: Int
    finishedAt?: Time
    id: ID
    iid: string
    sha: string
    startedAt?: Time
    status: PipelineStatusEnum
    updatedAt: Time
    /** Permissions for the current user on the resource */
    userPermissions: PipelinePermissions
}

export type PipelinePermissions = GQLType & {
    /** Whether or not a user can perform `admin_pipeline` on this resource */
    adminPipeline: boolean
    /** Whether or not a user can perform `destroy_pipeline` on this resource */
    destroyPipeline: boolean
    /** Whether or not a user can perform `update_pipeline` on this resource */
    updatePipeline: boolean
}

export type PipelineStatusEnum =
    | 'CREATED'
    | 'PREPARING'
    | 'PENDING'
    | 'RUNNING'
    | 'FAILED'
    | 'SUCCESS'
    | 'CANCELED'
    | 'SKIPPED'
    | 'MANUAL'
    | 'SCHEDULED'

export type DetailedStatus = GQLType & {
    detailsPath: string
    favicon: string
    group: string
    hasDetails: boolean
    icon: string
    label: string
    text: string
    tooltip: string
}

/** Represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

/** The connection type for TreeEntry. */
export type TreeEntryConnection = GQLType & {
    /** A list of edges. */
    edges?: TreeEntryEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type TreeEntryEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: TreeEntry
}

/** Represents a directory */
export type TreeEntry = GQLType & {
    flatPath: string
    id: ID
    name: string
    path: string
    type: EntryType
    webUrl?: string
}

export interface Entry extends GQLType {
    flatPath: string
    id: ID
    name: string
    path: string
    type: EntryType
    /** Use `asTreeEntry` to access fields on the underlying concrete type. */
    asTreeEntry: TreeEntry
    /** Use `asSubmodule` to access fields on the underlying concrete type. */
    asSubmodule: Submodule
    /** Use `asBlob` to access fields on the underlying concrete type. */
    asBlob: Blob
}

/** Type of a tree entry */
export type EntryType = 'tree' | 'blob' | 'commit'

/** The connection type for Submodule. */
export type SubmoduleConnection = GQLType & {
    /** A list of edges. */
    edges?: SubmoduleEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type SubmoduleEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Submodule
}

export type Submodule = GQLType & {
    flatPath: string
    id: ID
    name: string
    path: string
    treeUrl?: string
    type: EntryType
    webUrl?: string
}

/** The connection type for Blob. */
export type BlobConnection = GQLType & {
    /** A list of edges. */
    edges?: BlobEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type BlobEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Blob
}

export type Blob = GQLType & {
    flatPath: string
    id: ID
    lfsOid?: string
    name: string
    path: string
    type: EntryType
    webUrl?: string
}

/** The connection type for MergeRequest. */
export type MergeRequestConnection = GQLType & {
    /** A list of edges. */
    edges?: MergeRequestEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type MergeRequestEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: MergeRequest
}

export type MergeRequest = GQLType & {
    allowCollaboration?: boolean
    createdAt: Time
    defaultMergeCommitMessage?: string
    description?: string
    /** The GitLab Flavored Markdown rendering of `description` */
    descriptionHtml?: string
    diffHeadSha?: string
    diffRefs?: DiffRefs
    /** All discussions on this noteable */
    discussions(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
    }): DiscussionConnection
    downvotes: Int
    forceRemoveSourceBranch?: boolean
    headPipeline?: Pipeline
    id: ID
    iid: string
    inProgressMergeCommitSha?: string
    /** @deprecated Renamed to defaultMergeCommitMessage */
    mergeCommitMessage?: string
    mergeCommitSha?: string
    mergeError?: string
    mergeOngoing: boolean
    mergeStatus?: string
    mergeWhenPipelineSucceeds?: boolean
    mergeableDiscussionsState?: boolean
    /** All notes on this noteable */
    notes(args?: { first?: Int; after?: string; last?: Int; before?: string }): NoteConnection
    pipelines(args?: {
        first?: Int
        after?: string
        last?: Int
        before?: string
        status?: PipelineStatusEnum
        ref?: string
        sha?: string
    }): PipelineConnection
    project: Project
    projectId: Int
    rebaseCommitSha?: string
    rebaseInProgress: boolean
    shouldBeRebased: boolean
    shouldRemoveSourceBranch?: boolean
    sourceBranch: string
    sourceBranchExists: boolean
    sourceProject?: Project
    sourceProjectId?: Int
    state: MergeRequestState
    subscribed: boolean
    targetBranch: string
    targetProject: Project
    targetProjectId: Int
    taskCompletionStatus: TaskCompletionStatus
    title: string
    /** The GitLab Flavored Markdown rendering of `title` */
    titleHtml?: string
    updatedAt: Time
    upvotes: Int
    userNotesCount?: Int
    /** Permissions for the current user on the resource */
    userPermissions: MergeRequestPermissions
    webUrl?: string
    workInProgress: boolean
}

/** Check permissions for the current user on a merge request */
export type MergeRequestPermissions = GQLType & {
    /** Whether or not a user can perform `admin_merge_request` on this resource */
    adminMergeRequest: boolean
    /** Whether or not a user can perform `cherry_pick_on_current_merge_request` on this resource */
    cherryPickOnCurrentMergeRequest: boolean
    /** Whether or not a user can perform `create_note` on this resource */
    createNote: boolean
    /** Whether or not a user can perform `push_to_source_branch` on this resource */
    pushToSourceBranch: boolean
    /** Whether or not a user can perform `read_merge_request` on this resource */
    readMergeRequest: boolean
    /** Whether or not a user can perform `remove_source_branch` on this resource */
    removeSourceBranch: boolean
    /** Whether or not a user can perform `revert_on_current_merge_request` on this resource */
    revertOnCurrentMergeRequest: boolean
    /** Whether or not a user can perform `update_merge_request` on this resource */
    updateMergeRequest: boolean
}

/** State of a GitLab merge request */
export type MergeRequestState = 'opened' | 'closed' | 'locked' | 'merged'

/** The connection type for Pipeline. */
export type PipelineConnection = GQLType & {
    /** A list of edges. */
    edges?: PipelineEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type PipelineEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Pipeline
}

/** The connection type for Issue. */
export type IssueConnection = GQLType & {
    /** A list of edges. */
    edges?: IssueEdge[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
}

/** An edge in a connection. */
export type IssueEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Issue
}

/** State of a GitLab issue or merge request */
export type IssuableState = 'opened' | 'closed' | 'locked'

export type Sort = 'updated_desc' | 'updated_asc' | 'created_desc' | 'created_asc'

export type Metadata = GQLType & {
    revision: string
    version: string
}

export type Mutation = GQLType & {
    addAwardEmoji(args: { input: AddAwardEmojiInput }): AddAwardEmojiPayload | undefined
    createDiffNote(args: { input: CreateDiffNoteInput }): CreateDiffNotePayload | undefined
    createImageDiffNote(args: {
        input: CreateImageDiffNoteInput
    }): CreateImageDiffNotePayload | undefined
    createNote(args: { input: CreateNoteInput }): CreateNotePayload | undefined
    designManagementUpload(args: {
        input: DesignManagementUploadInput
    }): DesignManagementUploadPayload | undefined
    destroyNote(args: { input: DestroyNoteInput }): DestroyNotePayload | undefined
    mergeRequestSetWip(args: {
        input: MergeRequestSetWipInput
    }): MergeRequestSetWipPayload | undefined
    removeAwardEmoji(args: { input: RemoveAwardEmojiInput }): RemoveAwardEmojiPayload | undefined
    toggleAwardEmoji(args: { input: ToggleAwardEmojiInput }): ToggleAwardEmojiPayload | undefined
    updateNote(args: { input: UpdateNoteInput }): UpdateNotePayload | undefined
}

/** Autogenerated return type of AddAwardEmoji */
export type AddAwardEmojiPayload = GQLType & {
    /** The award emoji after mutation */
    awardEmoji?: AwardEmoji
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
}

export type AwardEmoji = GQLType & {
    /** The emoji description */
    description: string
    /** The emoji as an icon */
    emoji: string
    /** The emoji name */
    name: string
    /** The emoji in unicode */
    unicode: string
    /** The unicode version for this emoji */
    unicodeVersion: string
    /** The user who awarded the emoji */
    user: User
}

/** Autogenerated input type of AddAwardEmoji */
export type AddAwardEmojiInput = {
    /** The global id of the awardable resource */
    awardableId: ID
    /** The emoji name */
    name: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of RemoveAwardEmoji */
export type RemoveAwardEmojiPayload = GQLType & {
    /** The award emoji after mutation */
    awardEmoji?: AwardEmoji
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
}

/** Autogenerated input type of RemoveAwardEmoji */
export type RemoveAwardEmojiInput = {
    /** The global id of the awardable resource */
    awardableId: ID
    /** The emoji name */
    name: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ToggleAwardEmoji */
export type ToggleAwardEmojiPayload = GQLType & {
    /** The award emoji after mutation */
    awardEmoji?: AwardEmoji
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
    /** True when the emoji was awarded, false when it was removed */
    toggledOn: boolean
}

/** Autogenerated input type of ToggleAwardEmoji */
export type ToggleAwardEmojiInput = {
    /** The global id of the awardable resource */
    awardableId: ID
    /** The emoji name */
    name: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of MergeRequestSetWip */
export type MergeRequestSetWipPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
    /** The merge request after mutation */
    mergeRequest?: MergeRequest
}

/** Autogenerated input type of MergeRequestSetWip */
export type MergeRequestSetWipInput = {
    /** The project the merge request to mutate is in */
    projectPath: ID
    /** The iid of the merge request to mutate */
    iid: string
    /** Whether or not to set the merge request as a WIP.
     */
    wip: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreateNote */
export type CreateNotePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
    /** The note after mutation */
    note?: Note
}

/** Autogenerated input type of CreateNote */
export type CreateNoteInput = {
    /** The global id of the resource to add a note to */
    noteableId: ID
    /** The content note itself */
    body: string
    /** The global id of the discussion this note is in reply to */
    discussionId?: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreateDiffNote */
export type CreateDiffNotePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
    /** The note after mutation */
    note?: Note
}

/** Autogenerated input type of CreateDiffNote */
export type CreateDiffNoteInput = {
    /** The global id of the resource to add a note to */
    noteableId: ID
    /** The content note itself */
    body: string
    /** The position of this note on a diff */
    position: DiffPositionInput
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

export type DiffPositionInput = {
    /** The sha of the head at the time the comment was made */
    headSha: string
    /** The merge base of the branch the comment was made on */
    baseSha?: string
    /** The sha of the branch being compared against */
    startSha: string
    /** The paths of the file that was changed. Both of the properties of this input are optional, but at least one of them is required */
    paths: DiffPathsInput
    /** The line on start sha that was changed */
    oldLine?: Int
    /** The line on head sha that was changed */
    newLine: Int
}

export type DiffPathsInput = {
    /** The path of the file on the start sha */
    oldPath?: string
    /** The path of the file on the head sha */
    newPath?: string
}

/** Autogenerated return type of CreateImageDiffNote */
export type CreateImageDiffNotePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
    /** The note after mutation */
    note?: Note
}

/** Autogenerated input type of CreateImageDiffNote */
export type CreateImageDiffNoteInput = {
    /** The global id of the resource to add a note to */
    noteableId: ID
    /** The content note itself */
    body: string
    /** The position of this note on a diff */
    position: DiffImagePositionInput
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

export type DiffImagePositionInput = {
    /** The sha of the head at the time the comment was made */
    headSha: string
    /** The merge base of the branch the comment was made on */
    baseSha?: string
    /** The sha of the branch being compared against */
    startSha: string
    /** The paths of the file that was changed. Both of the properties of this input are optional, but at least one of them is required */
    paths: DiffPathsInput
    /** The X postion on which the comment was made */
    x: Int
    /** The Y position on which the comment was made */
    y: Int
    /** The total width of the image */
    width: Int
    /** The total height of the image */
    height: Int
}

/** Autogenerated return type of UpdateNote */
export type UpdateNotePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
    /** The note after mutation */
    note?: Note
}

/** Autogenerated input type of UpdateNote */
export type UpdateNoteInput = {
    /** The global id of the note to update */
    id: ID
    /** The content note itself */
    body: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DestroyNote */
export type DestroyNotePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Reasons why the mutation failed. */
    errors: string[]
    /** The note after mutation */
    note?: Note
}

/** Autogenerated input type of DestroyNote */
export type DestroyNoteInput = {
    /** The global id of the note to destroy */
    id: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DesignManagementUpload */
export type DesignManagementUploadPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The designs that were updated by the mutation */
    designs: Design[]
    /** Reasons why the mutation failed. */
    errors: string[]
}

/** Autogenerated input type of DesignManagementUpload */
export type DesignManagementUploadInput = {
    /** The project where the issue is to upload designs for */
    projectPath: ID
    /** The iid of the issue to modify designs for */
    iid: ID
    /** The files to upload */
    files: Upload[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

export type Upload = any
