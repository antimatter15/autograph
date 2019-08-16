type GQLType = {
    /** The name of the object type */
    __typename: string
}

/** The query root of GitHub's GraphQL interface. */
export type Query = GQLType & {
    /** Look up a code of conduct by its key */
    codeOfConduct(args: { key: string }): CodeOfConduct | undefined
    /** Look up a code of conduct by its key */
    codesOfConduct?: CodeOfConduct[]
    /** Look up an open source license by its key */
    license(args: { key: string }): License | undefined
    /** Return a list of known open source licenses */
    licenses: License[]
    /** Get alphabetically sorted list of Marketplace categories */
    marketplaceCategories(args?: {
        includeCategories?: string[]
        excludeEmpty?: boolean
        excludeSubcategories?: boolean
    }): MarketplaceCategory[]
    /** Look up a Marketplace category by its slug. */
    marketplaceCategory(args: {
        slug: string
        useTopicAliases?: boolean
    }): MarketplaceCategory | undefined
    /** Look up a single Marketplace listing */
    marketplaceListing(args: { slug: string }): MarketplaceListing | undefined
    /** Look up Marketplace listings */
    marketplaceListings(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        categorySlug?: string
        useTopicAliases?: boolean
        viewerCanAdmin?: boolean
        adminId?: ID
        organizationId?: ID
        allStates?: boolean
        slugs?: string[]
        primaryCategoryOnly?: boolean
        withFreeTrialsOnly?: boolean
    }): MarketplaceListingConnection
    /** Return information about the GitHub instance */
    meta: GitHubMetadata
    /** Fetches an object given its ID. */
    node(args: { id: ID }): Node | undefined
    /** Lookup nodes by a list of IDs. */
    nodes(args: { ids: ID[] }): Node[]
    /** Lookup a organization by login. */
    organization(args: { login: string }): Organization | undefined
    /** The client's rate limit information. */
    rateLimit(args?: { dryRun?: boolean }): RateLimit | undefined
    /** Hack to workaround https://github.com/facebook/relay/issues/112 re-exposing the root query object */
    relay: Query
    /** Lookup a given repository by the owner and repository name. */
    repository(args: { owner: string; name: string }): Repository | undefined
    /** Lookup a repository owner (ie. either a User or an Organization) by login. */
    repositoryOwner(args: { login: string }): RepositoryOwner | undefined
    /** Lookup resource by a URL. */
    resource(args: { url: URI }): UniformResourceLocatable | undefined
    /** Perform a search across resources. */
    search(args: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        query: string
        type: SearchType
    }): SearchResultItemConnection
    /** GitHub Security Advisories */
    securityAdvisories(args?: {
        orderBy?: SecurityAdvisoryOrder
        identifier?: SecurityAdvisoryIdentifierFilter
        publishedSince?: DateTime
        updatedSince?: DateTime
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): SecurityAdvisoryConnection
    /** Fetch a Security Advisory by its GHSA ID */
    securityAdvisory(args: { ghsaId: string }): SecurityAdvisory | undefined
    /** Software Vulnerabilities documented by GitHub Security Advisories */
    securityVulnerabilities(args?: {
        orderBy?: SecurityVulnerabilityOrder
        ecosystem?: SecurityAdvisoryEcosystem
        package?: string
        severities?: SecurityAdvisorySeverity[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): SecurityVulnerabilityConnection
    /** Look up a single Sponsors Listing */
    sponsorsListing(args: { slug: string }): SponsorsListing | undefined
    /** Look up a topic by name. */
    topic(args: { name: string }): Topic | undefined
    /** Lookup a user by login. */
    user(args: { login: string }): User | undefined
    /** The currently authenticated user. */
    viewer: User

    /** Check this to determine whether the query is loading */
    _loading?: boolean
    /** Check this to display error messages */
    _error?: any
    /** This field is defined when Autograph is executing a dry run */
    _dry?: boolean
}

/** An object with an ID. */
export interface Node extends GQLType {
    /** ID of the object. */
    id: ID
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asRegistryPackage` to access fields on the underlying concrete type. */
    asRegistryPackage: RegistryPackage
    /** Use `asRepository` to access fields on the underlying concrete type. */
    asRepository: Repository
    /** Use `asProject` to access fields on the underlying concrete type. */
    asProject: Project
    /** Use `asProjectColumn` to access fields on the underlying concrete type. */
    asProjectColumn: ProjectColumn
    /** Use `asProjectCard` to access fields on the underlying concrete type. */
    asProjectCard: ProjectCard
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asUserContentEdit` to access fields on the underlying concrete type. */
    asUserContentEdit: UserContentEdit
    /** Use `asLabel` to access fields on the underlying concrete type. */
    asLabel: Label
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asApp` to access fields on the underlying concrete type. */
    asApp: App
    /** Use `asMarketplaceListing` to access fields on the underlying concrete type. */
    asMarketplaceListing: MarketplaceListing
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
    /** Use `asUserStatus` to access fields on the underlying concrete type. */
    asUserStatus: UserStatus
    /** Use `asGist` to access fields on the underlying concrete type. */
    asGist: Gist
    /** Use `asLicense` to access fields on the underlying concrete type. */
    asLicense: License
    /** Use `asRepositoryTopic` to access fields on the underlying concrete type. */
    asRepositoryTopic: RepositoryTopic
    /** Use `asTopic` to access fields on the underlying concrete type. */
    asTopic: Topic
    /** Use `asRelease` to access fields on the underlying concrete type. */
    asRelease: Release
    /** Use `asRef` to access fields on the underlying concrete type. */
    asRef: Ref
    /** Use `asBlob` to access fields on the underlying concrete type. */
    asBlob: Blob
    /** Use `asCommit` to access fields on the underlying concrete type. */
    asCommit: Commit
    /** Use `asTree` to access fields on the underlying concrete type. */
    asTree: Tree
    /** Use `asCommitComment` to access fields on the underlying concrete type. */
    asCommitComment: CommitComment
    /** Use `asReaction` to access fields on the underlying concrete type. */
    asReaction: Reaction
    /** Use `asStatus` to access fields on the underlying concrete type. */
    asStatus: Status
    /** Use `asStatusContext` to access fields on the underlying concrete type. */
    asStatusContext: StatusContext
    /** Use `asBot` to access fields on the underlying concrete type. */
    asBot: Bot
    /** Use `asDeployment` to access fields on the underlying concrete type. */
    asDeployment: Deployment
    /** Use `asDeploymentStatus` to access fields on the underlying concrete type. */
    asDeploymentStatus: DeploymentStatus
    /** Use `asReleaseAsset` to access fields on the underlying concrete type. */
    asReleaseAsset: ReleaseAsset
    /** Use `asRegistryPackageVersion` to access fields on the underlying concrete type. */
    asRegistryPackageVersion: RegistryPackageVersion
    /** Use `asRegistryPackageDependency` to access fields on the underlying concrete type. */
    asRegistryPackageDependency: RegistryPackageDependency
    /** Use `asRegistryPackageFile` to access fields on the underlying concrete type. */
    asRegistryPackageFile: RegistryPackageFile
    /** Use `asMarketplaceCategory` to access fields on the underlying concrete type. */
    asMarketplaceCategory: MarketplaceCategory
    /** Use `asGistComment` to access fields on the underlying concrete type. */
    asGistComment: GistComment
    /** Use `asLanguage` to access fields on the underlying concrete type. */
    asLanguage: Language
    /** Use `asIssueComment` to access fields on the underlying concrete type. */
    asIssueComment: IssueComment
    /** Use `asMembersCanDeleteReposClearAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposClearAuditEntry: MembersCanDeleteReposClearAuditEntry
    /** Use `asOrganizationInvitation` to access fields on the underlying concrete type. */
    asOrganizationInvitation: OrganizationInvitation
    /** Use `asTeam` to access fields on the underlying concrete type. */
    asTeam: Team
    /** Use `asExternalIdentity` to access fields on the underlying concrete type. */
    asExternalIdentity: ExternalIdentity
    /** Use `asPublicKey` to access fields on the underlying concrete type. */
    asPublicKey: PublicKey
    /** Use `asMembersCanDeleteReposDisableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposDisableAuditEntry: MembersCanDeleteReposDisableAuditEntry
    /** Use `asMembersCanDeleteReposEnableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposEnableAuditEntry: MembersCanDeleteReposEnableAuditEntry
    /** Use `asOauthApplicationCreateAuditEntry` to access fields on the underlying concrete type. */
    asOauthApplicationCreateAuditEntry: OauthApplicationCreateAuditEntry
    /** Use `asOrgAddBillingManagerAuditEntry` to access fields on the underlying concrete type. */
    asOrgAddBillingManagerAuditEntry: OrgAddBillingManagerAuditEntry
    /** Use `asOrgAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgAddMemberAuditEntry: OrgAddMemberAuditEntry
    /** Use `asOrgBlockUserAuditEntry` to access fields on the underlying concrete type. */
    asOrgBlockUserAuditEntry: OrgBlockUserAuditEntry
    /** Use `asOrgConfigDisableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asOrgConfigDisableCollaboratorsOnlyAuditEntry: OrgConfigDisableCollaboratorsOnlyAuditEntry
    /** Use `asOrgConfigEnableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asOrgConfigEnableCollaboratorsOnlyAuditEntry: OrgConfigEnableCollaboratorsOnlyAuditEntry
    /** Use `asOrgDisableOauthAppRestrictionsAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableOauthAppRestrictionsAuditEntry: OrgDisableOauthAppRestrictionsAuditEntry
    /** Use `asOrgDisableSamlAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableSamlAuditEntry: OrgDisableSamlAuditEntry
    /** Use `asOrgDisableTwoFactorRequirementAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableTwoFactorRequirementAuditEntry: OrgDisableTwoFactorRequirementAuditEntry
    /** Use `asOrgEnableOauthAppRestrictionsAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableOauthAppRestrictionsAuditEntry: OrgEnableOauthAppRestrictionsAuditEntry
    /** Use `asOrgEnableSamlAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableSamlAuditEntry: OrgEnableSamlAuditEntry
    /** Use `asOrgEnableTwoFactorRequirementAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableTwoFactorRequirementAuditEntry: OrgEnableTwoFactorRequirementAuditEntry
    /** Use `asOrgInviteMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgInviteMemberAuditEntry: OrgInviteMemberAuditEntry
    /** Use `asOrgInviteToBusinessAuditEntry` to access fields on the underlying concrete type. */
    asOrgInviteToBusinessAuditEntry: OrgInviteToBusinessAuditEntry
    /** Use `asOrgOauthAppAccessApprovedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessApprovedAuditEntry: OrgOauthAppAccessApprovedAuditEntry
    /** Use `asOrgOauthAppAccessDeniedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessDeniedAuditEntry: OrgOauthAppAccessDeniedAuditEntry
    /** Use `asOrgOauthAppAccessRequestedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessRequestedAuditEntry: OrgOauthAppAccessRequestedAuditEntry
    /** Use `asOrgRemoveBillingManagerAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveBillingManagerAuditEntry: OrgRemoveBillingManagerAuditEntry
    /** Use `asOrgRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveMemberAuditEntry: OrgRemoveMemberAuditEntry
    /** Use `asOrgRemoveOutsideCollaboratorAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveOutsideCollaboratorAuditEntry: OrgRemoveOutsideCollaboratorAuditEntry
    /** Use `asOrgRestoreMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgRestoreMemberAuditEntry: OrgRestoreMemberAuditEntry
    /** Use `asOrgUnblockUserAuditEntry` to access fields on the underlying concrete type. */
    asOrgUnblockUserAuditEntry: OrgUnblockUserAuditEntry
    /** Use `asOrgUpdateDefaultRepositoryPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateDefaultRepositoryPermissionAuditEntry: OrgUpdateDefaultRepositoryPermissionAuditEntry
    /** Use `asOrgUpdateMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberAuditEntry: OrgUpdateMemberAuditEntry
    /** Use `asOrgUpdateMemberRepositoryCreationPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberRepositoryCreationPermissionAuditEntry: OrgUpdateMemberRepositoryCreationPermissionAuditEntry
    /** Use `asOrgUpdateMemberRepositoryInvitationPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberRepositoryInvitationPermissionAuditEntry: OrgUpdateMemberRepositoryInvitationPermissionAuditEntry
    /** Use `asPrivateRepositoryForkingDisableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingDisableAuditEntry: PrivateRepositoryForkingDisableAuditEntry
    /** Use `asPrivateRepositoryForkingEnableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingEnableAuditEntry: PrivateRepositoryForkingEnableAuditEntry
    /** Use `asRepoAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoAccessAuditEntry: RepoAccessAuditEntry
    /** Use `asRepoAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddMemberAuditEntry: RepoAddMemberAuditEntry
    /** Use `asRepoAddTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddTopicAuditEntry: RepoAddTopicAuditEntry
    /** Use `asRepoArchivedAuditEntry` to access fields on the underlying concrete type. */
    asRepoArchivedAuditEntry: RepoArchivedAuditEntry
    /** Use `asRepoChangeMergeSettingAuditEntry` to access fields on the underlying concrete type. */
    asRepoChangeMergeSettingAuditEntry: RepoChangeMergeSettingAuditEntry
    /** Use `asRepoConfigDisableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableAnonymousGitAccessAuditEntry: RepoConfigDisableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigDisableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableCollaboratorsOnlyAuditEntry: RepoConfigDisableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigDisableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableContributorsOnlyAuditEntry: RepoConfigDisableContributorsOnlyAuditEntry
    /** Use `asRepoConfigDisableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableSockpuppetDisallowedAuditEntry: RepoConfigDisableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigEnableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableAnonymousGitAccessAuditEntry: RepoConfigEnableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigEnableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableCollaboratorsOnlyAuditEntry: RepoConfigEnableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigEnableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableContributorsOnlyAuditEntry: RepoConfigEnableContributorsOnlyAuditEntry
    /** Use `asRepoConfigEnableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableSockpuppetDisallowedAuditEntry: RepoConfigEnableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigLockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigLockAnonymousGitAccessAuditEntry: RepoConfigLockAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigUnlockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigUnlockAnonymousGitAccessAuditEntry: RepoConfigUnlockAnonymousGitAccessAuditEntry
    /** Use `asRepoCreateAuditEntry` to access fields on the underlying concrete type. */
    asRepoCreateAuditEntry: RepoCreateAuditEntry
    /** Use `asRepoDestroyAuditEntry` to access fields on the underlying concrete type. */
    asRepoDestroyAuditEntry: RepoDestroyAuditEntry
    /** Use `asRepoRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveMemberAuditEntry: RepoRemoveMemberAuditEntry
    /** Use `asRepoRemoveTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveTopicAuditEntry: RepoRemoveTopicAuditEntry
    /** Use `asRepositoryVisibilityChangeDisableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeDisableAuditEntry: RepositoryVisibilityChangeDisableAuditEntry
    /** Use `asRepositoryVisibilityChangeEnableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeEnableAuditEntry: RepositoryVisibilityChangeEnableAuditEntry
    /** Use `asTeamAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddMemberAuditEntry: TeamAddMemberAuditEntry
    /** Use `asTeamAddRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddRepositoryAuditEntry: TeamAddRepositoryAuditEntry
    /** Use `asTeamChangeParentTeamAuditEntry` to access fields on the underlying concrete type. */
    asTeamChangeParentTeamAuditEntry: TeamChangeParentTeamAuditEntry
    /** Use `asTeamRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveMemberAuditEntry: TeamRemoveMemberAuditEntry
    /** Use `asTeamRemoveRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveRepositoryAuditEntry: TeamRemoveRepositoryAuditEntry
    /** Use `asOrganizationIdentityProvider` to access fields on the underlying concrete type. */
    asOrganizationIdentityProvider: OrganizationIdentityProvider
    /** Use `asRepositoryInvitation` to access fields on the underlying concrete type. */
    asRepositoryInvitation: RepositoryInvitation
    /** Use `asMannequin` to access fields on the underlying concrete type. */
    asMannequin: Mannequin
    /** Use `asMilestone` to access fields on the underlying concrete type. */
    asMilestone: Milestone
    /** Use `asPullRequestReviewComment` to access fields on the underlying concrete type. */
    asPullRequestReviewComment: PullRequestReviewComment
    /** Use `asPullRequestReview` to access fields on the underlying concrete type. */
    asPullRequestReview: PullRequestReview
    /** Use `asPullRequestReviewThread` to access fields on the underlying concrete type. */
    asPullRequestReviewThread: PullRequestReviewThread
    /** Use `asPullRequestCommit` to access fields on the underlying concrete type. */
    asPullRequestCommit: PullRequestCommit
    /** Use `asReviewRequest` to access fields on the underlying concrete type. */
    asReviewRequest: ReviewRequest
    /** Use `asCommitCommentThread` to access fields on the underlying concrete type. */
    asCommitCommentThread: CommitCommentThread
    /** Use `asClosedEvent` to access fields on the underlying concrete type. */
    asClosedEvent: ClosedEvent
    /** Use `asReopenedEvent` to access fields on the underlying concrete type. */
    asReopenedEvent: ReopenedEvent
    /** Use `asSubscribedEvent` to access fields on the underlying concrete type. */
    asSubscribedEvent: SubscribedEvent
    /** Use `asUnsubscribedEvent` to access fields on the underlying concrete type. */
    asUnsubscribedEvent: UnsubscribedEvent
    /** Use `asMergedEvent` to access fields on the underlying concrete type. */
    asMergedEvent: MergedEvent
    /** Use `asReferencedEvent` to access fields on the underlying concrete type. */
    asReferencedEvent: ReferencedEvent
    /** Use `asCrossReferencedEvent` to access fields on the underlying concrete type. */
    asCrossReferencedEvent: CrossReferencedEvent
    /** Use `asAssignedEvent` to access fields on the underlying concrete type. */
    asAssignedEvent: AssignedEvent
    /** Use `asUnassignedEvent` to access fields on the underlying concrete type. */
    asUnassignedEvent: UnassignedEvent
    /** Use `asLabeledEvent` to access fields on the underlying concrete type. */
    asLabeledEvent: LabeledEvent
    /** Use `asUnlabeledEvent` to access fields on the underlying concrete type. */
    asUnlabeledEvent: UnlabeledEvent
    /** Use `asMilestonedEvent` to access fields on the underlying concrete type. */
    asMilestonedEvent: MilestonedEvent
    /** Use `asDemilestonedEvent` to access fields on the underlying concrete type. */
    asDemilestonedEvent: DemilestonedEvent
    /** Use `asRenamedTitleEvent` to access fields on the underlying concrete type. */
    asRenamedTitleEvent: RenamedTitleEvent
    /** Use `asLockedEvent` to access fields on the underlying concrete type. */
    asLockedEvent: LockedEvent
    /** Use `asUnlockedEvent` to access fields on the underlying concrete type. */
    asUnlockedEvent: UnlockedEvent
    /** Use `asDeployedEvent` to access fields on the underlying concrete type. */
    asDeployedEvent: DeployedEvent
    /** Use `asDeploymentEnvironmentChangedEvent` to access fields on the underlying concrete type. */
    asDeploymentEnvironmentChangedEvent: DeploymentEnvironmentChangedEvent
    /** Use `asHeadRefDeletedEvent` to access fields on the underlying concrete type. */
    asHeadRefDeletedEvent: HeadRefDeletedEvent
    /** Use `asHeadRefRestoredEvent` to access fields on the underlying concrete type. */
    asHeadRefRestoredEvent: HeadRefRestoredEvent
    /** Use `asHeadRefForcePushedEvent` to access fields on the underlying concrete type. */
    asHeadRefForcePushedEvent: HeadRefForcePushedEvent
    /** Use `asBaseRefForcePushedEvent` to access fields on the underlying concrete type. */
    asBaseRefForcePushedEvent: BaseRefForcePushedEvent
    /** Use `asReviewRequestedEvent` to access fields on the underlying concrete type. */
    asReviewRequestedEvent: ReviewRequestedEvent
    /** Use `asReviewRequestRemovedEvent` to access fields on the underlying concrete type. */
    asReviewRequestRemovedEvent: ReviewRequestRemovedEvent
    /** Use `asReviewDismissedEvent` to access fields on the underlying concrete type. */
    asReviewDismissedEvent: ReviewDismissedEvent
    /** Use `asUserBlockedEvent` to access fields on the underlying concrete type. */
    asUserBlockedEvent: UserBlockedEvent
    /** Use `asPullRequestCommitCommentThread` to access fields on the underlying concrete type. */
    asPullRequestCommitCommentThread: PullRequestCommitCommentThread
    /** Use `asBaseRefChangedEvent` to access fields on the underlying concrete type. */
    asBaseRefChangedEvent: BaseRefChangedEvent
    /** Use `asReadyForReviewEvent` to access fields on the underlying concrete type. */
    asReadyForReviewEvent: ReadyForReviewEvent
    /** Use `asAddedToProjectEvent` to access fields on the underlying concrete type. */
    asAddedToProjectEvent: AddedToProjectEvent
    /** Use `asCommentDeletedEvent` to access fields on the underlying concrete type. */
    asCommentDeletedEvent: CommentDeletedEvent
    /** Use `asConvertedNoteToIssueEvent` to access fields on the underlying concrete type. */
    asConvertedNoteToIssueEvent: ConvertedNoteToIssueEvent
    /** Use `asMarkedAsDuplicateEvent` to access fields on the underlying concrete type. */
    asMarkedAsDuplicateEvent: MarkedAsDuplicateEvent
    /** Use `asMentionedEvent` to access fields on the underlying concrete type. */
    asMentionedEvent: MentionedEvent
    /** Use `asMovedColumnsInProjectEvent` to access fields on the underlying concrete type. */
    asMovedColumnsInProjectEvent: MovedColumnsInProjectEvent
    /** Use `asPinnedEvent` to access fields on the underlying concrete type. */
    asPinnedEvent: PinnedEvent
    /** Use `asRemovedFromProjectEvent` to access fields on the underlying concrete type. */
    asRemovedFromProjectEvent: RemovedFromProjectEvent
    /** Use `asTransferredEvent` to access fields on the underlying concrete type. */
    asTransferredEvent: TransferredEvent
    /** Use `asUnpinnedEvent` to access fields on the underlying concrete type. */
    asUnpinnedEvent: UnpinnedEvent
    /** Use `asDeployKey` to access fields on the underlying concrete type. */
    asDeployKey: DeployKey
    /** Use `asBranchProtectionRule` to access fields on the underlying concrete type. */
    asBranchProtectionRule: BranchProtectionRule
    /** Use `asReviewDismissalAllowance` to access fields on the underlying concrete type. */
    asReviewDismissalAllowance: ReviewDismissalAllowance
    /** Use `asPushAllowance` to access fields on the underlying concrete type. */
    asPushAllowance: PushAllowance
    /** Use `asCodeOfConduct` to access fields on the underlying concrete type. */
    asCodeOfConduct: CodeOfConduct
    /** Use `asSecurityAdvisory` to access fields on the underlying concrete type. */
    asSecurityAdvisory: SecurityAdvisory
    /** Use `asRegistryPackageTag` to access fields on the underlying concrete type. */
    asRegistryPackageTag: RegistryPackageTag
    /** Use `asSponsorship` to access fields on the underlying concrete type. */
    asSponsorship: Sponsorship
    /** Use `asSavedReply` to access fields on the underlying concrete type. */
    asSavedReply: SavedReply
    /** Use `asSponsorsListing` to access fields on the underlying concrete type. */
    asSponsorsListing: SponsorsListing
    /** Use `asTag` to access fields on the underlying concrete type. */
    asTag: Tag
}

/** Represents a unique identifier that is Base64 obfuscated. It is often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"VXNlci0xMA=="`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** Represents a type that can be retrieved by a URL. */
export interface UniformResourceLocatable extends GQLType {
    /** The HTML path to this resource. */
    resourcePath: URI
    /** The URL to this resource. */
    url: URI
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asRepository` to access fields on the underlying concrete type. */
    asRepository: Repository
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
    /** Use `asGist` to access fields on the underlying concrete type. */
    asGist: Gist
    /** Use `asRepositoryTopic` to access fields on the underlying concrete type. */
    asRepositoryTopic: RepositoryTopic
    /** Use `asRelease` to access fields on the underlying concrete type. */
    asRelease: Release
    /** Use `asCommit` to access fields on the underlying concrete type. */
    asCommit: Commit
    /** Use `asBot` to access fields on the underlying concrete type. */
    asBot: Bot
    /** Use `asMannequin` to access fields on the underlying concrete type. */
    asMannequin: Mannequin
    /** Use `asMilestone` to access fields on the underlying concrete type. */
    asMilestone: Milestone
    /** Use `asPullRequestCommit` to access fields on the underlying concrete type. */
    asPullRequestCommit: PullRequestCommit
    /** Use `asClosedEvent` to access fields on the underlying concrete type. */
    asClosedEvent: ClosedEvent
    /** Use `asMergedEvent` to access fields on the underlying concrete type. */
    asMergedEvent: MergedEvent
    /** Use `asCrossReferencedEvent` to access fields on the underlying concrete type. */
    asCrossReferencedEvent: CrossReferencedEvent
    /** Use `asReviewDismissedEvent` to access fields on the underlying concrete type. */
    asReviewDismissedEvent: ReviewDismissedEvent
    /** Use `asReadyForReviewEvent` to access fields on the underlying concrete type. */
    asReadyForReviewEvent: ReadyForReviewEvent
}

/** An RFC 3986, RFC 3987, and RFC 6570 (level 4) compliant URI string. */
export type URI = any

/** A user is an individual's account on GitHub that owns repositories and can make new content. */
export type User = GQLType & {
    /** Determine if this repository owner has any items that can be pinned to their profile. */
    anyPinnableItems(args?: { type?: PinnableItemType }): boolean
    /** A URL pointing to the user's public avatar. */
    avatarUrl(args?: { size?: Int }): URI
    /** The user's public profile bio. */
    bio?: string
    /** The user's public profile bio as HTML. */
    bioHTML: HTML
    /** A list of commit comments made by this user. */
    commitComments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): CommitCommentConnection
    /** The user's public profile company. */
    company?: string
    /** The user's public profile company as HTML. */
    companyHTML: HTML
    /** The collection of contributions this user has made to different repositories. */
    contributionsCollection(args?: {
        organizationID?: ID
        from?: DateTime
        to?: DateTime
    }): ContributionsCollection
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The user's publicly visible profile email. */
    email: string
    /** A list of users the given user is followed by. */
    followers(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): FollowerConnection
    /** A list of users the given user is following. */
    following(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): FollowingConnection
    /** Find gist by repo name. */
    gist(args: { name: string }): Gist | undefined
    /** A list of gist comments made by this user. */
    gistComments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): GistCommentConnection
    /** A list of the Gists the user has created. */
    gists(args?: {
        privacy?: GistPrivacy
        orderBy?: GistOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): GistConnection
    id: ID
    /** Whether or not this user is a participant in the GitHub Security Bug Bounty. */
    isBountyHunter: boolean
    /** Whether or not this user is a participant in the GitHub Campus Experts Program. */
    isCampusExpert: boolean
    /** Whether or not this user is a GitHub Developer Program member. */
    isDeveloperProgramMember: boolean
    /** Whether or not this user is a GitHub employee. */
    isEmployee: boolean
    /** Whether or not the user has marked themselves as for hire. */
    isHireable: boolean
    /** Whether or not this user is a site administrator. */
    isSiteAdmin: boolean
    /** Whether or not this user is the viewing user. */
    isViewer: boolean
    /** A list of issue comments made by this user. */
    issueComments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueCommentConnection
    /** A list of issues associated with this user. */
    issues(args?: {
        orderBy?: IssueOrder
        labels?: string[]
        states?: IssueState[]
        filterBy?: IssueFilters
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueConnection
    /** Showcases a selection of repositories and gists that the profile owner has either curated or that have been selected automatically based on popularity. */
    itemShowcase: ProfileItemShowcase
    /** The user's public profile location. */
    location?: string
    /** The username used to login. */
    login: string
    /** The user's public profile name. */
    name?: string
    /** Find an organization by its login that the user belongs to. */
    organization(args: { login: string }): Organization | undefined
    /** A list of organizations the user belongs to. */
    organizations(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): OrganizationConnection
    /** A list of repositories and gists this profile owner can pin to their profile. */
    pinnableItems(args?: {
        types?: PinnableItemType[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PinnableItemConnection
    /** A list of repositories and gists this profile owner has pinned to their profile */
    pinnedItems(args?: {
        types?: PinnableItemType[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PinnableItemConnection
    /** Returns how many more items this profile owner can pin to their profile. */
    pinnedItemsRemaining: Int
    /** A list of repositories this user has pinned to their profile */
    /** @deprecated pinnedRepositories will be removed Use ProfileOwner.pinnedItems instead. Removal on 2019-10-01 UTC. */
    pinnedRepositories(args?: {
        privacy?: RepositoryPrivacy
        orderBy?: RepositoryOrder
        affiliations?: RepositoryAffiliation[]
        ownerAffiliations?: RepositoryAffiliation[]
        isLocked?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RepositoryConnection
    /** Find project by number. */
    project(args: { number: Int }): Project | undefined
    /** A list of projects under the owner. */
    projects(args?: {
        orderBy?: ProjectOrder
        search?: string
        states?: ProjectState[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ProjectConnection
    /** The HTTP path listing user's projects */
    projectsResourcePath: URI
    /** The HTTP URL listing user's projects */
    projectsUrl: URI
    /** A list of public keys associated with this user. */
    publicKeys(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PublicKeyConnection
    /** A list of pull requests associated with this user. */
    pullRequests(args?: {
        states?: PullRequestState[]
        labels?: string[]
        headRefName?: string
        baseRefName?: string
        orderBy?: IssueOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestConnection
    /** A list of registry packages under the owner. */
    registryPackages(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        name?: string
        names?: string[]
        repositoryId?: ID
        packageType?: RegistryPackageType
        registryPackageType?: string
        publicOnly?: boolean
    }): RegistryPackageConnection
    /** A list of registry packages for a particular search query. */
    registryPackagesForQuery(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        query?: string
        packageType?: RegistryPackageType
    }): RegistryPackageConnection
    /** A list of repositories that the user owns. */
    repositories(args?: {
        privacy?: RepositoryPrivacy
        orderBy?: RepositoryOrder
        affiliations?: RepositoryAffiliation[]
        ownerAffiliations?: RepositoryAffiliation[]
        isLocked?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
        isFork?: boolean
    }): RepositoryConnection
    /** A list of repositories that the user recently contributed to. */
    repositoriesContributedTo(args?: {
        privacy?: RepositoryPrivacy
        orderBy?: RepositoryOrder
        isLocked?: boolean
        includeUserRepositories?: boolean
        contributionTypes?: RepositoryContributionType[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RepositoryConnection
    /** Find Repository. */
    repository(args: { name: string }): Repository | undefined
    /** The HTTP path for this user */
    resourcePath: URI
    /** Replies this user has saved */
    savedReplies(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: SavedReplyOrder
    }): SavedReplyConnection | undefined
    /** This object's sponsorships as the maintainer. */
    sponsorshipsAsMaintainer(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        includePrivate?: boolean
        orderBy?: SponsorshipOrder
    }): SponsorshipConnection
    /** This object's sponsorships as the sponsor. */
    sponsorshipsAsSponsor(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: SponsorshipOrder
    }): SponsorshipConnection
    /** Repositories the user has starred. */
    starredRepositories(args?: {
        ownedByViewer?: boolean
        orderBy?: StarOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): StarredRepositoryConnection
    /** The user's description of what they're currently doing. */
    status?: UserStatus
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this user */
    url: URI
    /** Can the viewer pin repositories and gists to the profile? */
    viewerCanChangePinnedItems: boolean
    /** Can the current viewer create new projects on this owner. */
    viewerCanCreateProjects: boolean
    /** Whether or not the viewer is able to follow the user. */
    viewerCanFollow: boolean
    /** Whether or not this user is followed by the viewer. */
    viewerIsFollowing: boolean
    /** A list of repositories the given user is watching. */
    watching(args?: {
        privacy?: RepositoryPrivacy
        orderBy?: RepositoryOrder
        affiliations?: RepositoryAffiliation[]
        ownerAffiliations?: RepositoryAffiliation[]
        isLocked?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RepositoryConnection
    /** A URL pointing to the user's public website/blog. */
    websiteUrl?: URI
}

/** Represents an object which can take actions on GitHub. Typically a User or Bot. */
export interface Actor extends GQLType {
    /** A URL pointing to the actor's public avatar. */
    avatarUrl: URI
    /** The username of the actor. */
    login: string
    /** The HTTP path for this actor. */
    resourcePath: URI
    /** The HTTP URL for this actor. */
    url: URI
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
    /** Use `asBot` to access fields on the underlying concrete type. */
    asBot: Bot
    /** Use `asMannequin` to access fields on the underlying concrete type. */
    asMannequin: Mannequin
}

/** Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

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

/** An ISO-8601 encoded UTC date string. */
export type DateTime = any

/** Represents an owner of a registry package. */
export interface RegistryPackageOwner extends GQLType {
    id: ID
    /** A list of registry packages under the owner. */
    registryPackages: RegistryPackageConnection
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asRepository` to access fields on the underlying concrete type. */
    asRepository: Repository
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
}

/** The connection type for RegistryPackage. */
export type RegistryPackageConnection = GQLType & {
    /** A list of edges. */
    edges?: RegistryPackageEdge[]
    /** A list of nodes. */
    nodes?: RegistryPackage[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type RegistryPackageEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: RegistryPackage
}

/** A registry package contains the content for an uploaded package. */
export type RegistryPackage = GQLType & {
    /** The package type color */
    color: string
    id: ID
    /** Find the latest version for the package. */
    latestVersion?: RegistryPackageVersion
    /** Identifies the title of the package. */
    name: string
    /** Identifies the title of the package, with the owner prefixed. */
    nameWithOwner: string
    /** Find the package file identified by the guid. */
    packageFileByGuid(args: { guid: string }): RegistryPackageFile | undefined
    /** Find the package file identified by the sha256. */
    packageFileBySha256(args: { sha256: string }): RegistryPackageFile | undefined
    /** Identifies the type of the package. */
    packageType: RegistryPackageType
    /** List the prerelease versions for this package. */
    preReleaseVersions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RegistryPackageVersionConnection | undefined
    /** The type of the package. */
    registryPackageType?: string
    /** repository that the release is associated with */
    repository?: Repository
    /** Statistics about package activity. */
    statistics?: RegistryPackageStatistics
    /** list of tags for this package */
    tags(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RegistryPackageTagConnection
    /** List the topics for this package. */
    topics(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): TopicConnection | undefined
    /** Find package version by version string. */
    version(args: { version: string }): RegistryPackageVersion | undefined
    /** Find package version by version string. */
    versionByPlatform(args: {
        version: string
        platform: string
    }): RegistryPackageVersion | undefined
    /** Find package version by manifest SHA256. */
    versionBySha256(args: { sha256: string }): RegistryPackageVersion | undefined
    /** list of versions for this package */
    versions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RegistryPackageVersionConnection
    /** List package versions with a specific metadatum. */
    versionsByMetadatum(args: {
        metadatum: RegistryPackageMetadatum
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RegistryPackageVersionConnection | undefined
}

/** The possible types of a registry package. */
export type RegistryPackageType =
    | 'NPM'
    | 'RUBYGEMS'
    | 'MAVEN'
    | 'DOCKER'
    | 'DEBIAN'
    | 'NUGET'
    | 'PYTHON'

/** A repository contains the content for a project. */
export type Repository = GQLType & {
    /** A list of users that can be assigned to issues in this repository. */
    assignableUsers(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserConnection
    /** A list of branch protection rules for this repository. */
    branchProtectionRules(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): BranchProtectionRuleConnection
    /** Returns the code of conduct for this repository */
    codeOfConduct?: CodeOfConduct
    /** A list of collaborators associated with the repository. */
    collaborators(args?: {
        affiliation?: CollaboratorAffiliation
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RepositoryCollaboratorConnection | undefined
    /** A list of commit comments associated with the repository. */
    commitComments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): CommitCommentConnection
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The Ref associated with the repository's default branch. */
    defaultBranchRef?: Ref
    /** A list of deploy keys that are on this repository. */
    deployKeys(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): DeployKeyConnection
    /** Deployments associated with the repository */
    deployments(args?: {
        environments?: string[]
        orderBy?: DeploymentOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): DeploymentConnection
    /** The description of the repository. */
    description?: string
    /** The description of the repository rendered to HTML. */
    descriptionHTML: HTML
    /** The number of kilobytes this repository occupies on disk. */
    diskUsage?: Int
    /** Returns how many forks there are of this repository in the whole network. */
    forkCount: Int
    /** A list of direct forked repositories. */
    forks(args?: {
        privacy?: RepositoryPrivacy
        orderBy?: RepositoryOrder
        affiliations?: RepositoryAffiliation[]
        ownerAffiliations?: RepositoryAffiliation[]
        isLocked?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RepositoryConnection
    /** Indicates if the repository has issues feature enabled. */
    hasIssuesEnabled: boolean
    /** Indicates if the repository has wiki feature enabled. */
    hasWikiEnabled: boolean
    /** The repository's URL. */
    homepageUrl?: URI
    id: ID
    /** Indicates if the repository is unmaintained. */
    isArchived: boolean
    /** Returns whether or not this repository disabled. */
    isDisabled: boolean
    /** Identifies if the repository is a fork. */
    isFork: boolean
    /** Indicates if the repository has been locked or not. */
    isLocked: boolean
    /** Identifies if the repository is a mirror. */
    isMirror: boolean
    /** Identifies if the repository is private. */
    isPrivate: boolean
    /** Identifies if the repository is a template that can be used to generate new repositories. */
    isTemplate: boolean
    /** Returns a single issue from the current repository by number. */
    issue(args: { number: Int }): Issue | undefined
    /** Returns a single issue-like object from the current repository by number. */
    issueOrPullRequest(args: { number: Int }): IssueOrPullRequest | undefined
    /** A list of issues that have been opened in the repository. */
    issues(args?: {
        orderBy?: IssueOrder
        labels?: string[]
        states?: IssueState[]
        filterBy?: IssueFilters
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueConnection
    /** Returns a single label by name */
    label(args: { name: string }): Label | undefined
    /** A list of labels associated with the repository. */
    labels(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        query?: string
    }): LabelConnection | undefined
    /** A list containing a breakdown of the language composition of the repository. */
    languages(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: LanguageOrder
    }): LanguageConnection | undefined
    /** The license associated with the repository */
    licenseInfo?: License
    /** The reason the repository has been locked. */
    lockReason?: RepositoryLockReason
    /** A list of Users that can be mentioned in the context of the repository. */
    mentionableUsers(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserConnection
    /** Whether or not PRs are merged with a merge commit on this repository. */
    mergeCommitAllowed: boolean
    /** Returns a single milestone from the current repository by number. */
    milestone(args: { number: Int }): Milestone | undefined
    /** A list of milestones associated with the repository. */
    milestones(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        states?: MilestoneState[]
        orderBy?: MilestoneOrder
    }): MilestoneConnection | undefined
    /** The repository's original mirror URL. */
    mirrorUrl?: URI
    /** The name of the repository. */
    name: string
    /** The repository's name with owner. */
    nameWithOwner: string
    /** A Git object in the repository */
    object(args?: { oid?: GitObjectID; expression?: string }): GitObject | undefined
    /** The image used to represent this repository in Open Graph data. */
    openGraphImageUrl: URI
    /** The User owner of the repository. */
    owner: RepositoryOwner
    /** The repository parent, if this is a fork. */
    parent?: Repository
    /** The primary language of the repository's code. */
    primaryLanguage?: Language
    /** Find project by number. */
    project(args: { number: Int }): Project | undefined
    /** A list of projects under the owner. */
    projects(args?: {
        orderBy?: ProjectOrder
        search?: string
        states?: ProjectState[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ProjectConnection
    /** The HTTP path listing the repository's projects */
    projectsResourcePath: URI
    /** The HTTP URL listing the repository's projects */
    projectsUrl: URI
    /** Returns a single pull request from the current repository by number. */
    pullRequest(args: { number: Int }): PullRequest | undefined
    /** A list of pull requests that have been opened in the repository. */
    pullRequests(args?: {
        states?: PullRequestState[]
        labels?: string[]
        headRefName?: string
        baseRefName?: string
        orderBy?: IssueOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestConnection
    /** Identifies when the repository was last pushed to. */
    pushedAt?: DateTime
    /** Whether or not rebase-merging is enabled on this repository. */
    rebaseMergeAllowed: boolean
    /** Fetch a given ref from the repository */
    ref(args: { qualifiedName: string }): Ref | undefined
    /** Fetch a list of refs from the repository */
    refs(args: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        refPrefix: string
        direction?: OrderDirection
        orderBy?: RefOrder
    }): RefConnection | undefined
    /** A list of registry packages under the owner. */
    registryPackages(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        name?: string
        names?: string[]
        repositoryId?: ID
        packageType?: RegistryPackageType
        registryPackageType?: string
        publicOnly?: boolean
    }): RegistryPackageConnection
    /** Lookup a single release given various criteria. */
    release(args: { tagName: string }): Release | undefined
    /** List of releases which are dependent on this repository. */
    releases(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: ReleaseOrder
    }): ReleaseConnection
    /** A list of applied repository-topic associations for this repository. */
    repositoryTopics(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RepositoryTopicConnection
    /** The HTTP path for this repository */
    resourcePath: URI
    /** A description of the repository, rendered to HTML without any links in it. */
    shortDescriptionHTML(args?: { limit?: Int }): HTML
    /** Whether or not squash-merging is enabled on this repository. */
    squashMergeAllowed: boolean
    /** The SSH URL to clone this repository */
    sshUrl: GitSSHRemote
    /** A list of users who have starred this starrable. */
    stargazers(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: StarOrder
    }): StargazerConnection
    /** The repository from which this repository was generated, if any. */
    templateRepository?: Repository
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this repository */
    url: URI
    /** Whether this repository has a custom image to use with Open Graph as opposed to being represented by the owner's avatar. */
    usesCustomOpenGraphImage: boolean
    /** Indicates whether the viewer has admin permissions on this repository. */
    viewerCanAdminister: boolean
    /** Can the current viewer create new projects on this owner. */
    viewerCanCreateProjects: boolean
    /** Check if the viewer is able to change their subscription status for the repository. */
    viewerCanSubscribe: boolean
    /** Indicates whether the viewer can update the topics of this repository. */
    viewerCanUpdateTopics: boolean
    /** Returns a boolean indicating whether the viewing user has starred this starrable. */
    viewerHasStarred: boolean
    /** The users permission level on the repository. Will return null if authenticated as an GitHub App. */
    viewerPermission?: RepositoryPermission
    /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
    viewerSubscription?: SubscriptionState
    /** A list of users watching the repository. */
    watchers(args?: { after?: string; before?: string; first?: Int; last?: Int }): UserConnection
}

/** Represents an owner of a Project. */
export interface ProjectOwner extends GQLType {
    id: ID
    /** Find project by number. */
    project?: Project
    /** A list of projects under the owner. */
    projects: ProjectConnection
    /** The HTTP path listing owners projects */
    projectsResourcePath: URI
    /** The HTTP URL listing owners projects */
    projectsUrl: URI
    /** Can the current viewer create new projects on this owner. */
    viewerCanCreateProjects: boolean
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asRepository` to access fields on the underlying concrete type. */
    asRepository: Repository
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
}

/** Projects manage issues, pull requests and notes within a project owner. */
export type Project = GQLType & {
    /** The project's description body. */
    body?: string
    /** The projects description body rendered to HTML. */
    bodyHTML: HTML
    /** `true` if the object is closed (definition of closed may depend on type) */
    closed: boolean
    /** Identifies the date and time when the object was closed. */
    closedAt?: DateTime
    /** List of columns in the project */
    columns(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ProjectColumnConnection
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The actor who originally created the project. */
    creator?: Actor
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** The project's name. */
    name: string
    /** The project's number. */
    number: Int
    /** The project's owner. Currently limited to repositories, organizations, and users. */
    owner: ProjectOwner
    /** List of pending cards in this project */
    pendingCards(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        archivedStates?: ProjectCardArchivedState[]
    }): ProjectCardConnection
    /** The HTTP path for this project */
    resourcePath: URI
    /** Whether the project is open or closed. */
    state: ProjectState
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this project */
    url: URI
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
}

/** An object that can be closed */
export interface Closable extends GQLType {
    /** `true` if the object is closed (definition of closed may depend on type) */
    closed: boolean
    /** Identifies the date and time when the object was closed. */
    closedAt?: DateTime
    /** Use `asProject` to access fields on the underlying concrete type. */
    asProject: Project
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asMilestone` to access fields on the underlying concrete type. */
    asMilestone: Milestone
}

/** Entities that can be updated. */
export interface Updatable extends GQLType {
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Use `asProject` to access fields on the underlying concrete type. */
    asProject: Project
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asCommitComment` to access fields on the underlying concrete type. */
    asCommitComment: CommitComment
    /** Use `asGistComment` to access fields on the underlying concrete type. */
    asGistComment: GistComment
    /** Use `asIssueComment` to access fields on the underlying concrete type. */
    asIssueComment: IssueComment
    /** Use `asPullRequestReviewComment` to access fields on the underlying concrete type. */
    asPullRequestReviewComment: PullRequestReviewComment
    /** Use `asPullRequestReview` to access fields on the underlying concrete type. */
    asPullRequestReview: PullRequestReview
}

/** State of the project; either 'open' or 'closed' */
export type ProjectState = 'OPEN' | 'CLOSED'

/** A string containing HTML code. */
export type HTML = any

/** The connection type for ProjectColumn. */
export type ProjectColumnConnection = GQLType & {
    /** A list of edges. */
    edges?: ProjectColumnEdge[]
    /** A list of nodes. */
    nodes?: ProjectColumn[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ProjectColumnEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: ProjectColumn
}

/** A column inside a project. */
export type ProjectColumn = GQLType & {
    /** List of cards in the column */
    cards(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        archivedStates?: ProjectCardArchivedState[]
    }): ProjectCardConnection
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** The project column's name. */
    name: string
    /** The project that contains this column. */
    project: Project
    /** The semantic purpose of the column */
    purpose?: ProjectColumnPurpose
    /** The HTTP path for this project column */
    resourcePath: URI
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this project column */
    url: URI
}

/** The semantic purpose of the column - todo, in progress, or done. */
export type ProjectColumnPurpose = 'TODO' | 'IN_PROGRESS' | 'DONE'

/** The connection type for ProjectCard. */
export type ProjectCardConnection = GQLType & {
    /** A list of edges. */
    edges?: ProjectCardEdge[]
    /** A list of nodes. */
    nodes?: ProjectCard[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ProjectCardEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: ProjectCard
}

/** A card in a project. */
export type ProjectCard = GQLType & {
    /** The project column this card is associated under. A card may only belong to one
project column at a time. The column field will be null if the card is created
in a pending state and has yet to be associated with a column. Once cards are
associated with a column, they will not become pending in the future.
 */
    column?: ProjectColumn
    /** The card content item */
    content?: ProjectCardItem
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The actor who created this card */
    creator?: Actor
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** Whether the card is archived */
    isArchived: boolean
    /** The card note */
    note?: string
    /** The project that contains this card. */
    project: Project
    /** The HTTP path for this card */
    resourcePath: URI
    /** The state of ProjectCard */
    state?: ProjectCardState
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this card */
    url: URI
}

/** Various content states of a ProjectCard */
export type ProjectCardState = 'CONTENT_ONLY' | 'NOTE_ONLY' | 'REDACTED'

/** Types that can be inside Project Cards. */
export type ProjectCardItem = Issue | PullRequest

/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
export type Issue = GQLType & {
    /** Reason that the conversation was locked. */
    activeLockReason?: LockReason
    /** A list of Users assigned to this object. */
    assignees(args?: { after?: string; before?: string; first?: Int; last?: Int }): UserConnection
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the subject of the comment. */
    authorAssociation: CommentAuthorAssociation
    /** Identifies the body of the issue. */
    body: string
    /** Identifies the body of the issue rendered to HTML. */
    bodyHTML: HTML
    /** Identifies the body of the issue rendered to text. */
    bodyText: string
    /** `true` if the object is closed (definition of closed may depend on type) */
    closed: boolean
    /** Identifies the date and time when the object was closed. */
    closedAt?: DateTime
    /** A list of comments associated with the Issue. */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueCommentConnection
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The actor who edited the comment. */
    editor?: Actor
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** A list of labels associated with the object. */
    labels(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): LabelConnection | undefined
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** `true` if the object is locked */
    locked: boolean
    /** Identifies the milestone associated with the issue. */
    milestone?: Milestone
    /** Identifies the issue number. */
    number: Int
    /** A list of Users that are participating in the Issue conversation. */
    participants(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserConnection
    /** List of project cards associated with this issue. */
    projectCards(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        archivedStates?: ProjectCardArchivedState[]
    }): ProjectCardConnection
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** A list of reactions grouped by content left on the subject. */
    reactionGroups?: ReactionGroup[]
    /** A list of Reactions left on the Issue. */
    reactions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        content?: ReactionContent
        orderBy?: ReactionOrder
    }): ReactionConnection
    /** The repository associated with this node. */
    repository: Repository
    /** The HTTP path for this issue */
    resourcePath: URI
    /** Identifies the state of the issue. */
    state: IssueState
    /** A list of events, comments, commits, etc. associated with the issue. */
    /** @deprecated `timeline` will be removed Use Issue.timelineItems instead. Removal on 2019-10-01 UTC. */
    timeline(args?: {
        since?: DateTime
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueTimelineConnection
    /** A list of events, comments, commits, etc. associated with the issue. */
    timelineItems(args?: {
        since?: DateTime
        skip?: Int
        itemTypes?: IssueTimelineItemsItemType[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueTimelineItemsConnection
    /** Identifies the issue title. */
    title: string
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this issue */
    url: URI
    /** A list of edits to this content. */
    userContentEdits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserContentEditConnection | undefined
    /** Can user react to this subject */
    viewerCanReact: boolean
    /** Check if the viewer is able to change their subscription status for the repository. */
    viewerCanSubscribe: boolean
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
    /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
    viewerSubscription?: SubscriptionState
}

/** An object that can have users assigned to it. */
export interface Assignable extends GQLType {
    /** A list of Users assigned to this object. */
    assignees: UserConnection
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
}

/** The connection type for User. */
export type UserConnection = GQLType & {
    /** A list of edges. */
    edges?: UserEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a user. */
export type UserEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: User
}

/** Represents a comment. */
export interface Comment extends GQLType {
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the subject of the comment. */
    authorAssociation: CommentAuthorAssociation
    /** The body as Markdown. */
    body: string
    /** The body rendered to HTML. */
    bodyHTML: HTML
    /** The body rendered to text. */
    bodyText: string
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** The actor who edited the comment. */
    editor?: Actor
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** A list of edits to this content. */
    userContentEdits?: UserContentEditConnection
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asCommitComment` to access fields on the underlying concrete type. */
    asCommitComment: CommitComment
    /** Use `asGistComment` to access fields on the underlying concrete type. */
    asGistComment: GistComment
    /** Use `asIssueComment` to access fields on the underlying concrete type. */
    asIssueComment: IssueComment
    /** Use `asPullRequestReviewComment` to access fields on the underlying concrete type. */
    asPullRequestReviewComment: PullRequestReviewComment
    /** Use `asPullRequestReview` to access fields on the underlying concrete type. */
    asPullRequestReview: PullRequestReview
}

/** A list of edits to content. */
export type UserContentEditConnection = GQLType & {
    /** A list of edges. */
    edges?: UserContentEditEdge[]
    /** A list of nodes. */
    nodes?: UserContentEdit[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type UserContentEditEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: UserContentEdit
}

/** An edit on user content */
export type UserContentEdit = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the date and time when the object was deleted. */
    deletedAt?: DateTime
    /** The actor who deleted this content */
    deletedBy?: Actor
    /** A summary of the changes for this edit */
    diff?: string
    /** When this content was edited */
    editedAt: DateTime
    /** The actor who edited this content */
    editor?: Actor
    id: ID
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
}

/** A comment author association with repository. */
export type CommentAuthorAssociation =
    | 'MEMBER'
    | 'OWNER'
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'NONE'

/** Comments that can be updated. */
export interface UpdatableComment extends GQLType {
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asCommitComment` to access fields on the underlying concrete type. */
    asCommitComment: CommitComment
    /** Use `asGistComment` to access fields on the underlying concrete type. */
    asGistComment: GistComment
    /** Use `asIssueComment` to access fields on the underlying concrete type. */
    asIssueComment: IssueComment
    /** Use `asPullRequestReviewComment` to access fields on the underlying concrete type. */
    asPullRequestReviewComment: PullRequestReviewComment
    /** Use `asPullRequestReview` to access fields on the underlying concrete type. */
    asPullRequestReview: PullRequestReview
}

/** The possible errors that will prevent a user from updating a comment. */
export type CommentCannotUpdateReason =
    | 'ARCHIVED'
    | 'INSUFFICIENT_ACCESS'
    | 'LOCKED'
    | 'LOGIN_REQUIRED'
    | 'MAINTENANCE'
    | 'VERIFIED_EMAIL_REQUIRED'
    | 'DENIED'

/** An object that can have labels assigned to it. */
export interface Labelable extends GQLType {
    /** A list of labels associated with the object. */
    labels?: LabelConnection
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
}

/** The connection type for Label. */
export type LabelConnection = GQLType & {
    /** A list of edges. */
    edges?: LabelEdge[]
    /** A list of nodes. */
    nodes?: Label[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type LabelEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Label
}

/** A label for categorizing Issues or Milestones with a given Repository. */
export type Label = GQLType & {
    /** Identifies the label color. */
    color: string
    /** Identifies the date and time when the label was created. */
    createdAt?: DateTime
    /** A brief description of this label. */
    description?: string
    id: ID
    /** Indicates whether or not this is a default label. */
    isDefault: boolean
    /** A list of issues associated with this label. */
    issues(args?: {
        orderBy?: IssueOrder
        labels?: string[]
        states?: IssueState[]
        filterBy?: IssueFilters
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueConnection
    /** Identifies the label name. */
    name: string
    /** A list of pull requests associated with this label. */
    pullRequests(args?: {
        states?: PullRequestState[]
        labels?: string[]
        headRefName?: string
        baseRefName?: string
        orderBy?: IssueOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestConnection
    /** The repository associated with this label. */
    repository: Repository
    /** The HTTP path for this label. */
    resourcePath: URI
    /** Identifies the date and time when the label was last updated. */
    updatedAt?: DateTime
    /** The HTTP URL for this label. */
    url: URI
}

/** The connection type for Issue. */
export type IssueConnection = GQLType & {
    /** A list of edges. */
    edges?: IssueEdge[]
    /** A list of nodes. */
    nodes?: Issue[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type IssueEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Issue
}

/** Ways in which lists of issues can be ordered upon return. */
export type IssueOrder = {
    /** The field in which to order issues by. */
    field: IssueOrderField
    /** The direction in which to order issues by the specified field. */
    direction: OrderDirection
}

/** Properties by which issue connections can be ordered. */
export type IssueOrderField = 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS'

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export type OrderDirection = 'ASC' | 'DESC'

/** The possible states of an issue. */
export type IssueState = 'OPEN' | 'CLOSED'

/** Ways in which to filter lists of issues. */
export type IssueFilters = {
    /** List issues assigned to given name. Pass in `null` for issues with no assigned user, and `*` for issues assigned to any user. */
    assignee?: string
    /** List issues created by given name. */
    createdBy?: string
    /** List issues where the list of label names exist on the issue. */
    labels?: string[]
    /** List issues where the given name is mentioned in the issue. */
    mentioned?: string
    /** List issues by given milestone argument. If an string representation of an integer is passed, it should refer to a milestone by its number field. Pass in `null` for issues with no milestone, and `*` for issues that are assigned to any milestone. */
    milestone?: string
    /** List issues that have been updated at or after the given date. */
    since?: DateTime
    /** List issues filtered by the list of states given. */
    states?: IssueState[]
    /** List issues subscribed to by viewer. */
    viewerSubscribed?: boolean
}

/** The connection type for PullRequest. */
export type PullRequestConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestEdge[]
    /** A list of nodes. */
    nodes?: PullRequest[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PullRequestEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequest
}

/** A repository pull request. */
export type PullRequest = GQLType & {
    /** Reason that the conversation was locked. */
    activeLockReason?: LockReason
    /** The number of additions in this pull request. */
    additions: Int
    /** A list of Users assigned to this object. */
    assignees(args?: { after?: string; before?: string; first?: Int; last?: Int }): UserConnection
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the subject of the comment. */
    authorAssociation: CommentAuthorAssociation
    /** Identifies the base Ref associated with the pull request. */
    baseRef?: Ref
    /** Identifies the name of the base Ref associated with the pull request, even if the ref has been deleted. */
    baseRefName: string
    /** Identifies the oid of the base ref associated with the pull request, even if the ref has been deleted. */
    baseRefOid: GitObjectID
    /** The repository associated with this pull request's base Ref. */
    baseRepository?: Repository
    /** The body as Markdown. */
    body: string
    /** The body rendered to HTML. */
    bodyHTML: HTML
    /** The body rendered to text. */
    bodyText: string
    /** The number of changed files in this pull request. */
    changedFiles: Int
    /** `true` if the pull request is closed */
    closed: boolean
    /** Identifies the date and time when the object was closed. */
    closedAt?: DateTime
    /** A list of comments associated with the pull request. */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueCommentConnection
    /** A list of commits present in this pull request's head branch not present in the base branch. */
    commits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestCommitConnection
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The number of deletions in this pull request. */
    deletions: Int
    /** The actor who edited this pull request's body. */
    editor?: Actor
    /** Lists the files changed within this pull request. */
    files(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestChangedFileConnection | undefined
    /** Identifies the head Ref associated with the pull request. */
    headRef?: Ref
    /** Identifies the name of the head Ref associated with the pull request, even if the ref has been deleted. */
    headRefName: string
    /** Identifies the oid of the head ref associated with the pull request, even if the ref has been deleted. */
    headRefOid: GitObjectID
    /** The repository associated with this pull request's head Ref. */
    headRepository?: Repository
    /** The owner of the repository associated with this pull request's head Ref. */
    headRepositoryOwner?: RepositoryOwner
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** The head and base repositories are different. */
    isCrossRepository: boolean
    /** A list of labels associated with the object. */
    labels(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): LabelConnection | undefined
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** `true` if the pull request is locked */
    locked: boolean
    /** Indicates whether maintainers can modify the pull request. */
    maintainerCanModify: boolean
    /** The commit that was created when this pull request was merged. */
    mergeCommit?: Commit
    /** Whether or not the pull request can be merged based on the existence of merge conflicts. */
    mergeable: MergeableState
    /** Whether or not the pull request was merged. */
    merged: boolean
    /** The date and time that the pull request was merged. */
    mergedAt?: DateTime
    /** The actor who merged the pull request. */
    mergedBy?: Actor
    /** Identifies the milestone associated with the pull request. */
    milestone?: Milestone
    /** Identifies the pull request number. */
    number: Int
    /** A list of Users that are participating in the Pull Request conversation. */
    participants(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserConnection
    /** The permalink to the pull request. */
    permalink: URI
    /** The commit that GitHub automatically generated to test if this pull request could be merged. This field will not return a value if the pull request is merged, or if the test merge commit is still being generated. See the `mergeable` field for more details on the mergeability of the pull request. */
    potentialMergeCommit?: Commit
    /** List of project cards associated with this pull request. */
    projectCards(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        archivedStates?: ProjectCardArchivedState[]
    }): ProjectCardConnection
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** A list of reactions grouped by content left on the subject. */
    reactionGroups?: ReactionGroup[]
    /** A list of Reactions left on the Issue. */
    reactions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        content?: ReactionContent
        orderBy?: ReactionOrder
    }): ReactionConnection
    /** The repository associated with this node. */
    repository: Repository
    /** The HTTP path for this pull request. */
    resourcePath: URI
    /** The HTTP path for reverting this pull request. */
    revertResourcePath: URI
    /** The HTTP URL for reverting this pull request. */
    revertUrl: URI
    /** A list of review requests associated with the pull request. */
    reviewRequests(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ReviewRequestConnection | undefined
    /** The list of all review threads for this pull request. */
    reviewThreads(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestReviewThreadConnection
    /** A list of reviews associated with the pull request. */
    reviews(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        states?: PullRequestReviewState[]
        author?: string
    }): PullRequestReviewConnection | undefined
    /** Identifies the state of the pull request. */
    state: PullRequestState
    /** A list of reviewer suggestions based on commit history and past review comments. */
    suggestedReviewers: SuggestedReviewer[]
    /** A list of events, comments, commits, etc. associated with the pull request. */
    /** @deprecated `timeline` will be removed Use PullRequest.timelineItems instead. Removal on 2019-10-01 UTC. */
    timeline(args?: {
        since?: DateTime
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestTimelineConnection
    /** A list of events, comments, commits, etc. associated with the pull request. */
    timelineItems(args?: {
        since?: DateTime
        skip?: Int
        itemTypes?: PullRequestTimelineItemsItemType[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestTimelineItemsConnection
    /** Identifies the pull request title. */
    title: string
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this pull request. */
    url: URI
    /** A list of edits to this content. */
    userContentEdits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserContentEditConnection | undefined
    /** Whether or not the viewer can apply suggestion. */
    viewerCanApplySuggestion: boolean
    /** Can user react to this subject */
    viewerCanReact: boolean
    /** Check if the viewer is able to change their subscription status for the repository. */
    viewerCanSubscribe: boolean
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
    /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
    viewerSubscription?: SubscriptionState
}

/** An object that can be locked. */
export interface Lockable extends GQLType {
    /** Reason that the conversation was locked. */
    activeLockReason?: LockReason
    /** `true` if the object is locked */
    locked: boolean
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
}

/** The possible reasons that an issue or pull request was locked. */
export type LockReason = 'OFF_TOPIC' | 'TOO_HEATED' | 'RESOLVED' | 'SPAM'

/** A GitHub App. */
export type App = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The description of the app. */
    description?: string
    id: ID
    /** The hex color code, without the leading '#', for the logo background. */
    logoBackgroundColor: string
    /** A URL pointing to the app's logo. */
    logoUrl(args?: { size?: Int }): URI
    /** The name of the app. */
    name: string
    /** A slug based on the name of the app for use in URLs. */
    slug: string
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The URL to the app's homepage. */
    url: URI
}

/** A listing in the GitHub integration marketplace. */
export type MarketplaceListing = GQLType & {
    /** The GitHub App this listing represents. */
    app?: App
    /** URL to the listing owner's company site. */
    companyUrl?: URI
    /** The HTTP path for configuring access to the listing's integration or OAuth app */
    configurationResourcePath: URI
    /** The HTTP URL for configuring access to the listing's integration or OAuth app */
    configurationUrl: URI
    /** URL to the listing's documentation. */
    documentationUrl?: URI
    /** The listing's detailed description. */
    extendedDescription?: string
    /** The listing's detailed description rendered to HTML. */
    extendedDescriptionHTML: HTML
    /** The listing's introductory description. */
    fullDescription: string
    /** The listing's introductory description rendered to HTML. */
    fullDescriptionHTML: HTML
    /** Whether this listing has been submitted for review from GitHub for approval to be displayed in the Marketplace. */
    /** @deprecated `hasApprovalBeenRequested` will be removed. Use `isVerificationPendingFromDraft` instead. Removal on 2019-10-01 UTC. */
    hasApprovalBeenRequested: boolean
    /** Does this listing have any plans with a free trial? */
    hasPublishedFreeTrialPlans: boolean
    /** Does this listing have a terms of service link? */
    hasTermsOfService: boolean
    /** A technical description of how this app works with GitHub. */
    howItWorks?: string
    /** The listing's technical description rendered to HTML. */
    howItWorksHTML: HTML
    id: ID
    /** URL to install the product to the viewer's account or organization. */
    installationUrl?: URI
    /** Whether this listing's app has been installed for the current viewer */
    installedForViewer: boolean
    /** Whether this listing has been approved for display in the Marketplace. */
    /** @deprecated `isApproved` will be removed. Use `isPublic` instead. Removal on 2019-10-01 UTC. */
    isApproved: boolean
    /** Whether this listing has been removed from the Marketplace. */
    isArchived: boolean
    /** Whether this listing has been removed from the Marketplace. */
    /** @deprecated `isDelisted` will be removed. Use `isArchived` instead. Removal on 2019-10-01 UTC. */
    isDelisted: boolean
    /** Whether this listing is still an editable draft that has not been submitted for review and is not publicly visible in the Marketplace. */
    isDraft: boolean
    /** Whether the product this listing represents is available as part of a paid plan. */
    isPaid: boolean
    /** Whether this listing has been approved for display in the Marketplace. */
    isPublic: boolean
    /** Whether this listing has been rejected by GitHub for display in the Marketplace. */
    isRejected: boolean
    /** Whether this listing has been approved for unverified display in the Marketplace. */
    isUnverified: boolean
    /** Whether this draft listing has been submitted for review for approval to be unverified in the Marketplace. */
    isUnverifiedPending: boolean
    /** Whether this draft listing has been submitted for review from GitHub for approval to be verified in the Marketplace. */
    isVerificationPendingFromDraft: boolean
    /** Whether this unverified listing has been submitted for review from GitHub for approval to be verified in the Marketplace. */
    isVerificationPendingFromUnverified: boolean
    /** Whether this listing has been approved for verified display in the Marketplace. */
    isVerified: boolean
    /** The hex color code, without the leading '#', for the logo background. */
    logoBackgroundColor: string
    /** URL for the listing's logo image. */
    logoUrl(args?: { size?: Int }): URI | undefined
    /** The listing's full name. */
    name: string
    /** The listing's very short description without a trailing period or ampersands. */
    normalizedShortDescription: string
    /** URL to the listing's detailed pricing. */
    pricingUrl?: URI
    /** The category that best describes the listing. */
    primaryCategory: MarketplaceCategory
    /** URL to the listing's privacy policy, may return an empty string for listings that do not require a privacy policy URL. */
    privacyPolicyUrl: URI
    /** The HTTP path for the Marketplace listing. */
    resourcePath: URI
    /** The URLs for the listing's screenshots. */
    screenshotUrls: string[]
    /** An alternate category that describes the listing. */
    secondaryCategory?: MarketplaceCategory
    /** The listing's very short description. */
    shortDescription: string
    /** The short name of the listing used in its URL. */
    slug: string
    /** URL to the listing's status page. */
    statusUrl?: URI
    /** An email address for support for this listing's app. */
    supportEmail?: string
    /** Either a URL or an email address for support for this listing's app, may return an empty string for listings that do not require a support URL. */
    supportUrl: URI
    /** URL to the listing's terms of service. */
    termsOfServiceUrl?: URI
    /** The HTTP URL for the Marketplace listing. */
    url: URI
    /** Can the current viewer add plans for this Marketplace listing. */
    viewerCanAddPlans: boolean
    /** Can the current viewer approve this Marketplace listing. */
    viewerCanApprove: boolean
    /** Can the current viewer delist this Marketplace listing. */
    viewerCanDelist: boolean
    /** Can the current viewer edit this Marketplace listing. */
    viewerCanEdit: boolean
    /** Can the current viewer edit the primary and secondary category of this
Marketplace listing.
 */
    viewerCanEditCategories: boolean
    /** Can the current viewer edit the plans for this Marketplace listing. */
    viewerCanEditPlans: boolean
    /** Can the current viewer return this Marketplace listing to draft state
so it becomes editable again.
 */
    viewerCanRedraft: boolean
    /** Can the current viewer reject this Marketplace listing by returning it to
an editable draft state or rejecting it entirely.
 */
    viewerCanReject: boolean
    /** Can the current viewer request this listing be reviewed for display in
the Marketplace as verified.
 */
    viewerCanRequestApproval: boolean
    /** Indicates whether the current user has an active subscription to this Marketplace listing.
     */
    viewerHasPurchased: boolean
    /** Indicates if the current user has purchased a subscription to this Marketplace listing
for all of the organizations the user owns.
 */
    viewerHasPurchasedForAllOrganizations: boolean
    /** Does the current viewer role allow them to administer this Marketplace listing.
     */
    viewerIsListingAdmin: boolean
}

/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
export type Organization = GQLType & {
    /** Determine if this repository owner has any items that can be pinned to their profile. */
    anyPinnableItems(args?: { type?: PinnableItemType }): boolean
    /** Audit log entries of the organization */
    auditLog(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        query?: string
        orderBy?: AuditLogOrder
    }): OrganizationAuditEntryConnection
    /** A URL pointing to the organization's public avatar. */
    avatarUrl(args?: { size?: Int }): URI
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The organization's public profile description. */
    description?: string
    /** The organization's public email. */
    email?: string
    id: ID
    /** Whether the organization has verified its profile email and website. */
    isVerified: boolean
    /** Showcases a selection of repositories and gists that the profile owner has either curated or that have been selected automatically based on popularity. */
    itemShowcase: ProfileItemShowcase
    /** The organization's public profile location. */
    location?: string
    /** The organization's login name. */
    login: string
    /** Get the status messages members of this entity have set that are either public or visible only to the organization. */
    memberStatuses(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: UserStatusOrder
    }): UserStatusConnection
    /** A list of users who are members of this organization. */
    membersWithRole(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): OrganizationMemberConnection
    /** The organization's public profile name. */
    name?: string
    /** The HTTP path creating a new team */
    newTeamResourcePath: URI
    /** The HTTP URL creating a new team */
    newTeamUrl: URI
    /** The billing email for the organization. */
    organizationBillingEmail?: string
    /** A list of users who have been invited to join this organization. */
    pendingMembers(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserConnection
    /** A list of repositories and gists this profile owner can pin to their profile. */
    pinnableItems(args?: {
        types?: PinnableItemType[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PinnableItemConnection
    /** A list of repositories and gists this profile owner has pinned to their profile */
    pinnedItems(args?: {
        types?: PinnableItemType[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PinnableItemConnection
    /** Returns how many more items this profile owner can pin to their profile. */
    pinnedItemsRemaining: Int
    /** A list of repositories this user has pinned to their profile */
    /** @deprecated pinnedRepositories will be removed Use ProfileOwner.pinnedItems instead. Removal on 2019-10-01 UTC. */
    pinnedRepositories(args?: {
        privacy?: RepositoryPrivacy
        orderBy?: RepositoryOrder
        affiliations?: RepositoryAffiliation[]
        ownerAffiliations?: RepositoryAffiliation[]
        isLocked?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RepositoryConnection
    /** Find project by number. */
    project(args: { number: Int }): Project | undefined
    /** A list of projects under the owner. */
    projects(args?: {
        orderBy?: ProjectOrder
        search?: string
        states?: ProjectState[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ProjectConnection
    /** The HTTP path listing organization's projects */
    projectsResourcePath: URI
    /** The HTTP URL listing organization's projects */
    projectsUrl: URI
    /** A list of registry packages under the owner. */
    registryPackages(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        name?: string
        names?: string[]
        repositoryId?: ID
        packageType?: RegistryPackageType
        registryPackageType?: string
        publicOnly?: boolean
    }): RegistryPackageConnection
    /** A list of registry packages for a particular search query. */
    registryPackagesForQuery(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        query?: string
        packageType?: RegistryPackageType
    }): RegistryPackageConnection
    /** A list of repositories that the user owns. */
    repositories(args?: {
        privacy?: RepositoryPrivacy
        orderBy?: RepositoryOrder
        affiliations?: RepositoryAffiliation[]
        ownerAffiliations?: RepositoryAffiliation[]
        isLocked?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
        isFork?: boolean
    }): RepositoryConnection
    /** Find Repository. */
    repository(args: { name: string }): Repository | undefined
    /** When true the organization requires all members, billing managers, and outside collaborators to enable two-factor authentication. */
    requiresTwoFactorAuthentication?: boolean
    /** The HTTP path for this organization. */
    resourcePath: URI
    /** The Organization's SAML identity providers */
    samlIdentityProvider?: OrganizationIdentityProvider
    /** Find an organization's team by its slug. */
    team(args: { slug: string }): Team | undefined
    /** A list of teams in this organization. */
    teams(args?: {
        privacy?: TeamPrivacy
        role?: TeamRole
        query?: string
        userLogins?: string[]
        orderBy?: TeamOrder
        ldapMapped?: boolean
        rootTeamsOnly?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): TeamConnection
    /** The HTTP path listing organization's teams */
    teamsResourcePath: URI
    /** The HTTP URL listing organization's teams */
    teamsUrl: URI
    /** The HTTP URL for this organization. */
    url: URI
    /** Organization is adminable by the viewer. */
    viewerCanAdminister: boolean
    /** Can the viewer pin repositories and gists to the profile? */
    viewerCanChangePinnedItems: boolean
    /** Can the current viewer create new projects on this owner. */
    viewerCanCreateProjects: boolean
    /** Viewer can create repositories on this organization */
    viewerCanCreateRepositories: boolean
    /** Viewer can create teams on this organization. */
    viewerCanCreateTeams: boolean
    /** Viewer is an active member of this organization. */
    viewerIsAMember: boolean
    /** The organization's public profile URL. */
    websiteUrl?: URI
}

/** Represents an interface to search packages on an object. */
export interface RegistryPackageSearch extends GQLType {
    id: ID
    /** A list of registry packages for a particular search query. */
    registryPackagesForQuery: RegistryPackageConnection
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
}

/** Represents an owner of a Repository. */
export interface RepositoryOwner extends GQLType {
    /** A URL pointing to the owner's public avatar. */
    avatarUrl: URI
    id: ID
    /** The username used to login. */
    login: string
    /** A list of repositories this user has pinned to their profile */
    /** @deprecated pinnedRepositories will be removed Use ProfileOwner.pinnedItems instead. Removal on 2019-10-01 UTC. */
    pinnedRepositories: RepositoryConnection
    /** A list of repositories that the user owns. */
    repositories: RepositoryConnection
    /** Find Repository. */
    repository?: Repository
    /** The HTTP URL for the owner. */
    resourcePath: URI
    /** The HTTP URL for the owner. */
    url: URI
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
}

/** A list of repositories owned by the subject. */
export type RepositoryConnection = GQLType & {
    /** A list of edges. */
    edges?: RepositoryEdge[]
    /** A list of nodes. */
    nodes?: Repository[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
    /** The total size in kilobytes of all repositories in the connection. */
    totalDiskUsage: Int
}

/** An edge in a connection. */
export type RepositoryEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Repository
}

/** The privacy of a repository */
export type RepositoryPrivacy = 'PUBLIC' | 'PRIVATE'

/** Ordering options for repository connections */
export type RepositoryOrder = {
    /** The field to order repositories by. */
    field: RepositoryOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which repository connections can be ordered. */
export type RepositoryOrderField = 'CREATED_AT' | 'UPDATED_AT' | 'PUSHED_AT' | 'NAME' | 'STARGAZERS'

/** The affiliation of a user to a repository */
export type RepositoryAffiliation = 'OWNER' | 'COLLABORATOR' | 'ORGANIZATION_MEMBER'

/** Represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

/** Entities that have members who can set status messages. */
export interface MemberStatusable extends GQLType {
    /** Get the status messages members of this entity have set that are either public or visible only to the organization. */
    memberStatuses: UserStatusConnection
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
    /** Use `asTeam` to access fields on the underlying concrete type. */
    asTeam: Team
}

/** The connection type for UserStatus. */
export type UserStatusConnection = GQLType & {
    /** A list of edges. */
    edges?: UserStatusEdge[]
    /** A list of nodes. */
    nodes?: UserStatus[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type UserStatusEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: UserStatus
}

/** The user's description of what they're currently doing. */
export type UserStatus = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** An emoji summarizing the user's status. */
    emoji?: string
    /** The status emoji as HTML. */
    emojiHTML?: HTML
    /** If set, the status will not be shown after this date. */
    expiresAt?: DateTime
    /** ID of the object. */
    id: ID
    /** Whether this status indicates the user is not fully available on GitHub. */
    indicatesLimitedAvailability: boolean
    /** A brief message describing what the user is doing. */
    message?: string
    /** The organization whose members can see this status. If null, this status is publicly visible. */
    organization?: Organization
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The user who has this status. */
    user: User
}

/** Ordering options for user status connections. */
export type UserStatusOrder = {
    /** The field to order user statuses by. */
    field: UserStatusOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which user status connections can be ordered. */
export type UserStatusOrderField = 'UPDATED_AT'

/** Represents any entity on GitHub that has a profile page. */
export interface ProfileOwner extends GQLType {
    /** Determine if this repository owner has any items that can be pinned to their profile. */
    anyPinnableItems: boolean
    /** The public profile email. */
    email?: string
    id: ID
    /** Showcases a selection of repositories and gists that the profile owner has either curated or that have been selected automatically based on popularity. */
    itemShowcase: ProfileItemShowcase
    /** The public profile location. */
    location?: string
    /** The username used to login. */
    login: string
    /** The public profile name. */
    name?: string
    /** A list of repositories and gists this profile owner can pin to their profile. */
    pinnableItems: PinnableItemConnection
    /** A list of repositories and gists this profile owner has pinned to their profile */
    pinnedItems: PinnableItemConnection
    /** Returns how many more items this profile owner can pin to their profile. */
    pinnedItemsRemaining: Int
    /** Can the viewer pin repositories and gists to the profile? */
    viewerCanChangePinnedItems: boolean
    /** The public profile website URL. */
    websiteUrl?: URI
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
    /** Use `asOrganization` to access fields on the underlying concrete type. */
    asOrganization: Organization
}

/** A curatable list of repositories relating to a repository owner, which defaults to showing the most popular repositories they own. */
export type ProfileItemShowcase = GQLType & {
    /** Whether or not the owner has pinned any repositories or gists. */
    hasPinnedItems: boolean
    /** The repositories and gists in the showcase. If the profile owner has any pinned items, those will be returned. Otherwise, the profile owner's popular repositories will be returned. */
    items(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PinnableItemConnection
}

/** The connection type for PinnableItem. */
export type PinnableItemConnection = GQLType & {
    /** A list of edges. */
    edges?: PinnableItemEdge[]
    /** A list of nodes. */
    nodes?: PinnableItem[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PinnableItemEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PinnableItem
}

/** Types that can be pinned to a profile page. */
export type PinnableItem = Gist | Repository

/** A Gist. */
export type Gist = GQLType & {
    /** A list of comments associated with the gist */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): GistCommentConnection
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The gist description. */
    description?: string
    /** The files in this gist. */
    files(args?: { limit?: Int; oid?: GitObjectID }): GistFile[] | undefined
    /** A list of forks associated with the gist */
    forks(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: GistOrder
    }): GistConnection
    id: ID
    /** Identifies if the gist is a fork. */
    isFork: boolean
    /** Whether the gist is public or not. */
    isPublic: boolean
    /** The gist name. */
    name: string
    /** The gist owner. */
    owner?: RepositoryOwner
    /** Identifies when the gist was last pushed to. */
    pushedAt?: DateTime
    /** The HTML path to this resource. */
    resourcePath: URI
    /** A list of users who have starred this starrable. */
    stargazers(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: StarOrder
    }): StargazerConnection
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this Gist. */
    url: URI
    /** Returns a boolean indicating whether the viewing user has starred this starrable. */
    viewerHasStarred: boolean
}

/** Things that can be starred. */
export interface Starrable extends GQLType {
    id: ID
    /** A list of users who have starred this starrable. */
    stargazers: StargazerConnection
    /** Returns a boolean indicating whether the viewing user has starred this starrable. */
    viewerHasStarred: boolean
    /** Use `asRepository` to access fields on the underlying concrete type. */
    asRepository: Repository
    /** Use `asGist` to access fields on the underlying concrete type. */
    asGist: Gist
    /** Use `asTopic` to access fields on the underlying concrete type. */
    asTopic: Topic
}

/** The connection type for User. */
export type StargazerConnection = GQLType & {
    /** A list of edges. */
    edges?: StargazerEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a user that's starred a repository. */
export type StargazerEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    node: User
    /** Identifies when the item was starred. */
    starredAt: DateTime
}

/** Ways in which star connections can be ordered. */
export type StarOrder = {
    /** The field in which to order nodes by. */
    field: StarOrderField
    /** The direction in which to order nodes. */
    direction: OrderDirection
}

/** Properties by which star connections can be ordered. */
export type StarOrderField = 'STARRED_AT'

/** A subset of repository info. */
export interface RepositoryInfo extends GQLType {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The description of the repository. */
    description?: string
    /** The description of the repository rendered to HTML. */
    descriptionHTML: HTML
    /** Returns how many forks there are of this repository in the whole network. */
    forkCount: Int
    /** Indicates if the repository has issues feature enabled. */
    hasIssuesEnabled: boolean
    /** Indicates if the repository has wiki feature enabled. */
    hasWikiEnabled: boolean
    /** The repository's URL. */
    homepageUrl?: URI
    /** Indicates if the repository is unmaintained. */
    isArchived: boolean
    /** Identifies if the repository is a fork. */
    isFork: boolean
    /** Indicates if the repository has been locked or not. */
    isLocked: boolean
    /** Identifies if the repository is a mirror. */
    isMirror: boolean
    /** Identifies if the repository is private. */
    isPrivate: boolean
    /** Identifies if the repository is a template that can be used to generate new repositories. */
    isTemplate: boolean
    /** The license associated with the repository */
    licenseInfo?: License
    /** The reason the repository has been locked. */
    lockReason?: RepositoryLockReason
    /** The repository's original mirror URL. */
    mirrorUrl?: URI
    /** The name of the repository. */
    name: string
    /** The repository's name with owner. */
    nameWithOwner: string
    /** The image used to represent this repository in Open Graph data. */
    openGraphImageUrl: URI
    /** The User owner of the repository. */
    owner: RepositoryOwner
    /** Identifies when the repository was last pushed to. */
    pushedAt?: DateTime
    /** The HTTP path for this repository */
    resourcePath: URI
    /** A description of the repository, rendered to HTML without any links in it. */
    shortDescriptionHTML: HTML
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this repository */
    url: URI
    /** Whether this repository has a custom image to use with Open Graph as opposed to being represented by the owner's avatar. */
    usesCustomOpenGraphImage: boolean
    /** Use `asRepository` to access fields on the underlying concrete type. */
    asRepository: Repository
}

/** The repository's visibility level. */
export type RepositoryVisibility = 'PRIVATE' | 'PUBLIC' | 'INTERNAL'

/** The possible reasons a given repository could be in a locked state. */
export type RepositoryLockReason = 'MOVING' | 'BILLING' | 'RENAME' | 'MIGRATING'

/** A repository's open source license */
export type License = GQLType & {
    /** The full text of the license */
    body: string
    /** The conditions set by the license */
    conditions: LicenseRule[]
    /** A human-readable description of the license */
    description?: string
    /** Whether the license should be featured */
    featured: boolean
    /** Whether the license should be displayed in license pickers */
    hidden: boolean
    id: ID
    /** Instructions on how to implement the license */
    implementation?: string
    /** The lowercased SPDX ID of the license */
    key: string
    /** The limitations set by the license */
    limitations: LicenseRule[]
    /** The license full name specified by <https://spdx.org/licenses> */
    name: string
    /** Customary short name if applicable (e.g, GPLv3) */
    nickname?: string
    /** The permissions set by the license */
    permissions: LicenseRule[]
    /** Whether the license is a pseudo-license placeholder (e.g., other, no-license) */
    pseudoLicense: boolean
    /** Short identifier specified by <https://spdx.org/licenses> */
    spdxId?: string
    /** URL to the license on <https://choosealicense.com> */
    url?: URI
}

/** Describes a License's conditions, permissions, and limitations */
export type LicenseRule = GQLType & {
    /** A description of the rule */
    description: string
    /** The machine-readable rule key */
    key: string
    /** The human-readable rule label */
    label: string
}

/** The connection type for RepositoryTopic. */
export type RepositoryTopicConnection = GQLType & {
    /** A list of edges. */
    edges?: RepositoryTopicEdge[]
    /** A list of nodes. */
    nodes?: RepositoryTopic[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type RepositoryTopicEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: RepositoryTopic
}

/** A repository-topic connects a repository to a topic. */
export type RepositoryTopic = GQLType & {
    id: ID
    /** The HTTP path for this repository-topic. */
    resourcePath: URI
    /** The topic. */
    topic: Topic
    /** The HTTP URL for this repository-topic. */
    url: URI
}

/** A topic aggregates entities that are related to a subject. */
export type Topic = GQLType & {
    id: ID
    /** The topic's name. */
    name: string
    /** A list of related topics, including aliases of this topic, sorted with the most relevant
first. Returns up to 10 Topics.
 */
    relatedTopics(args?: { first?: Int }): Topic[]
    /** A list of users who have starred this starrable. */
    stargazers(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: StarOrder
    }): StargazerConnection
    /** Returns a boolean indicating whether the viewing user has starred this starrable. */
    viewerHasStarred: boolean
}

/** A release contains the content for a release. */
export type Release = GQLType & {
    /** The author of the release */
    author?: User
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the description of the release. */
    description?: string
    id: ID
    /** Whether or not the release is a draft */
    isDraft: boolean
    /** Whether or not the release is a prerelease */
    isPrerelease: boolean
    /** Identifies the title of the release. */
    name?: string
    /** Identifies the date and time when the release was created. */
    publishedAt?: DateTime
    /** List of releases assets which are dependent on this release. */
    releaseAssets(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        name?: string
    }): ReleaseAssetConnection
    /** The HTTP path for this issue */
    resourcePath: URI
    /** The Git tag the release points to */
    tag?: Ref
    /** The name of the release's Git tag */
    tagName: string
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this issue */
    url: URI
}

/** Represents a Git reference. */
export type Ref = GQLType & {
    /** A list of pull requests with this ref as the head ref. */
    associatedPullRequests(args?: {
        states?: PullRequestState[]
        labels?: string[]
        headRefName?: string
        baseRefName?: string
        orderBy?: IssueOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestConnection
    id: ID
    /** The ref name. */
    name: string
    /** The ref's prefix, such as `refs/heads/` or `refs/tags/`. */
    prefix: string
    /** The repository the ref belongs to. */
    repository: Repository
    /** The object the ref points to. */
    target: GitObject
}

/** Represents a Git object. */
export interface GitObject extends GQLType {
    /** An abbreviated version of the Git object ID */
    abbreviatedOid: string
    /** The HTTP path for this Git object */
    commitResourcePath: URI
    /** The HTTP URL for this Git object */
    commitUrl: URI
    id: ID
    /** The Git object ID */
    oid: GitObjectID
    /** The Repository the Git object belongs to */
    repository: Repository
    /** Use `asBlob` to access fields on the underlying concrete type. */
    asBlob: Blob
    /** Use `asCommit` to access fields on the underlying concrete type. */
    asCommit: Commit
    /** Use `asTree` to access fields on the underlying concrete type. */
    asTree: Tree
    /** Use `asTag` to access fields on the underlying concrete type. */
    asTag: Tag
}

/** A Git object ID. */
export type GitObjectID = any

/** Represents a object that belongs to a repository. */
export interface RepositoryNode extends GQLType {
    /** The repository associated with this node. */
    repository: Repository
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asCommitComment` to access fields on the underlying concrete type. */
    asCommitComment: CommitComment
    /** Use `asIssueComment` to access fields on the underlying concrete type. */
    asIssueComment: IssueComment
    /** Use `asPullRequestReviewComment` to access fields on the underlying concrete type. */
    asPullRequestReviewComment: PullRequestReviewComment
    /** Use `asPullRequestReview` to access fields on the underlying concrete type. */
    asPullRequestReview: PullRequestReview
    /** Use `asCommitCommentThread` to access fields on the underlying concrete type. */
    asCommitCommentThread: CommitCommentThread
    /** Use `asPullRequestCommitCommentThread` to access fields on the underlying concrete type. */
    asPullRequestCommitCommentThread: PullRequestCommitCommentThread
}

/** Represents a Git blob. */
export type Blob = GQLType & {
    /** An abbreviated version of the Git object ID */
    abbreviatedOid: string
    /** Byte size of Blob object */
    byteSize: Int
    /** The HTTP path for this Git object */
    commitResourcePath: URI
    /** The HTTP URL for this Git object */
    commitUrl: URI
    id: ID
    /** Indicates whether the Blob is binary or text */
    isBinary: boolean
    /** Indicates whether the contents is truncated */
    isTruncated: boolean
    /** The Git object ID */
    oid: GitObjectID
    /** The Repository the Git object belongs to */
    repository: Repository
    /** UTF8 text data or null if the Blob is binary */
    text?: string
}

/** Represents a Git commit. */
export type Commit = GQLType & {
    /** An abbreviated version of the Git object ID */
    abbreviatedOid: string
    /** The number of additions in this commit. */
    additions: Int
    /** The pull requests associated with a commit */
    associatedPullRequests(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: PullRequestOrder
    }): PullRequestConnection | undefined
    /** Authorship details of the commit. */
    author?: GitActor
    /** Check if the committer and the author match. */
    authoredByCommitter: boolean
    /** The datetime when this commit was authored. */
    authoredDate: DateTime
    /** Fetches `git blame` information. */
    blame(args: { path: string }): Blame
    /** The number of changed files in this commit. */
    changedFiles: Int
    /** Comments made on the commit. */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): CommitCommentConnection
    /** The HTTP path for this Git object */
    commitResourcePath: URI
    /** The HTTP URL for this Git object */
    commitUrl: URI
    /** The datetime when this commit was committed. */
    committedDate: DateTime
    /** Check if commited via GitHub web UI. */
    committedViaWeb: boolean
    /** Committership details of the commit. */
    committer?: GitActor
    /** The number of deletions in this commit. */
    deletions: Int
    /** The deployments associated with a commit. */
    deployments(args?: {
        environments?: string[]
        orderBy?: DeploymentOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): DeploymentConnection | undefined
    /** The linear commit history starting from (and including) this commit, in the same order as `git log`. */
    history(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        path?: string
        author?: CommitAuthor
        since?: GitTimestamp
        until?: GitTimestamp
    }): CommitHistoryConnection
    id: ID
    /** The Git commit message */
    message: string
    /** The Git commit message body */
    messageBody: string
    /** The commit message body rendered to HTML. */
    messageBodyHTML: HTML
    /** The Git commit message headline */
    messageHeadline: string
    /** The commit message headline rendered to HTML. */
    messageHeadlineHTML: HTML
    /** The Git object ID */
    oid: GitObjectID
    /** The parents of a commit. */
    parents(args?: { after?: string; before?: string; first?: Int; last?: Int }): CommitConnection
    /** The datetime when this commit was pushed. */
    pushedDate?: DateTime
    /** The Repository this commit belongs to */
    repository: Repository
    /** The HTTP path for this commit */
    resourcePath: URI
    /** Commit signing information, if present. */
    signature?: GitSignature
    /** Status information for this commit */
    status?: Status
    /** Returns a URL to download a tarball archive for a repository.
Note: For private repositories, these links are temporary and expire after five minutes. */
    tarballUrl: URI
    /** Commit's root Tree */
    tree: Tree
    /** The HTTP path for the tree of this commit */
    treeResourcePath: URI
    /** The HTTP URL for the tree of this commit */
    treeUrl: URI
    /** The HTTP URL for this commit */
    url: URI
    /** Check if the viewer is able to change their subscription status for the repository. */
    viewerCanSubscribe: boolean
    /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
    viewerSubscription?: SubscriptionState
    /** Returns a URL to download a zipball archive for a repository.
Note: For private repositories, these links are temporary and expire after five minutes. */
    zipballUrl: URI
}

/** Entities that can be subscribed to for web and email notifications. */
export interface Subscribable extends GQLType {
    id: ID
    /** Check if the viewer is able to change their subscription status for the repository. */
    viewerCanSubscribe: boolean
    /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
    viewerSubscription?: SubscriptionState
    /** Use `asRepository` to access fields on the underlying concrete type. */
    asRepository: Repository
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asCommit` to access fields on the underlying concrete type. */
    asCommit: Commit
    /** Use `asTeam` to access fields on the underlying concrete type. */
    asTeam: Team
}

/** The possible states of a subscription. */
export type SubscriptionState = 'UNSUBSCRIBED' | 'SUBSCRIBED' | 'IGNORED'

/** Represents a Git tree. */
export type Tree = GQLType & {
    /** An abbreviated version of the Git object ID */
    abbreviatedOid: string
    /** The HTTP path for this Git object */
    commitResourcePath: URI
    /** The HTTP URL for this Git object */
    commitUrl: URI
    /** A list of tree entries. */
    entries?: TreeEntry[]
    id: ID
    /** The Git object ID */
    oid: GitObjectID
    /** The Repository the Git object belongs to */
    repository: Repository
}

/** Represents a Git tree entry. */
export type TreeEntry = GQLType & {
    /** Entry file mode. */
    mode: Int
    /** Entry file name. */
    name: string
    /** Entry file object. */
    object?: GitObject
    /** Entry file Git object ID. */
    oid: GitObjectID
    /** The Repository the tree entry belongs to */
    repository: Repository
    /** Entry file type. */
    type: string
}

/** Represents an actor in a Git commit (ie. an author or committer). */
export type GitActor = GQLType & {
    /** A URL pointing to the author's public avatar. */
    avatarUrl(args?: { size?: Int }): URI
    /** The timestamp of the Git action (authoring or committing). */
    date?: GitTimestamp
    /** The email in the Git commit. */
    email?: string
    /** The name in the Git commit. */
    name?: string
    /** The GitHub user corresponding to the email field. Null if no such user exists. */
    user?: User
}

/** An ISO-8601 encoded date string. Unlike the DateTime type, GitTimestamp is not converted in UTC. */
export type GitTimestamp = any

/** An edge in a connection. */
export type GitActorEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: GitActor
}

/** The connection type for Commit. */
export type CommitConnection = GQLType & {
    /** A list of edges. */
    edges?: CommitEdge[]
    /** A list of nodes. */
    nodes?: Commit[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type CommitEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Commit
}

/** The connection type for Commit. */
export type CommitHistoryConnection = GQLType & {
    /** A list of edges. */
    edges?: CommitEdge[]
    /** A list of nodes. */
    nodes?: Commit[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Specifies an author for filtering Git commits. */
export type CommitAuthor = {
    /** ID of a User to filter by. If non-null, only commits authored by this user will be returned. This field takes precedence over emails. */
    id?: ID
    /** Email addresses to filter by. Commits authored by any of the specified email addresses will be returned. */
    emails?: string[]
}

/** The connection type for CommitComment. */
export type CommitCommentConnection = GQLType & {
    /** A list of edges. */
    edges?: CommitCommentEdge[]
    /** A list of nodes. */
    nodes?: CommitComment[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type CommitCommentEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: CommitComment
}

/** Represents a comment on a given Commit. */
export type CommitComment = GQLType & {
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the subject of the comment. */
    authorAssociation: CommentAuthorAssociation
    /** Identifies the comment body. */
    body: string
    /** Identifies the comment body rendered to HTML. */
    bodyHTML: HTML
    /** The body rendered to text. */
    bodyText: string
    /** Identifies the commit associated with the comment, if the commit exists. */
    commit?: Commit
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The actor who edited the comment. */
    editor?: Actor
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** Returns whether or not a comment has been minimized. */
    isMinimized: boolean
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** Returns why the comment was minimized. */
    minimizedReason?: string
    /** Identifies the file path associated with the comment. */
    path?: string
    /** Identifies the line position associated with the comment. */
    position?: Int
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** A list of reactions grouped by content left on the subject. */
    reactionGroups?: ReactionGroup[]
    /** A list of Reactions left on the Issue. */
    reactions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        content?: ReactionContent
        orderBy?: ReactionOrder
    }): ReactionConnection
    /** The repository associated with this node. */
    repository: Repository
    /** The HTTP path permalink for this commit comment. */
    resourcePath: URI
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL permalink for this commit comment. */
    url: URI
    /** A list of edits to this content. */
    userContentEdits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserContentEditConnection | undefined
    /** Check if the current viewer can delete this object. */
    viewerCanDelete: boolean
    /** Check if the current viewer can minimize this object. */
    viewerCanMinimize: boolean
    /** Can user react to this subject */
    viewerCanReact: boolean
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
}

/** Entities that can be deleted. */
export interface Deletable extends GQLType {
    /** Check if the current viewer can delete this object. */
    viewerCanDelete: boolean
    /** Use `asCommitComment` to access fields on the underlying concrete type. */
    asCommitComment: CommitComment
    /** Use `asGistComment` to access fields on the underlying concrete type. */
    asGistComment: GistComment
    /** Use `asIssueComment` to access fields on the underlying concrete type. */
    asIssueComment: IssueComment
    /** Use `asPullRequestReviewComment` to access fields on the underlying concrete type. */
    asPullRequestReviewComment: PullRequestReviewComment
    /** Use `asPullRequestReview` to access fields on the underlying concrete type. */
    asPullRequestReview: PullRequestReview
}

/** Represents a subject that can be reacted on. */
export interface Reactable extends GQLType {
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** A list of reactions grouped by content left on the subject. */
    reactionGroups?: ReactionGroup[]
    /** A list of Reactions left on the Issue. */
    reactions: ReactionConnection
    /** Can user react to this subject */
    viewerCanReact: boolean
    /** Use `asIssue` to access fields on the underlying concrete type. */
    asIssue: Issue
    /** Use `asPullRequest` to access fields on the underlying concrete type. */
    asPullRequest: PullRequest
    /** Use `asCommitComment` to access fields on the underlying concrete type. */
    asCommitComment: CommitComment
    /** Use `asIssueComment` to access fields on the underlying concrete type. */
    asIssueComment: IssueComment
    /** Use `asPullRequestReviewComment` to access fields on the underlying concrete type. */
    asPullRequestReviewComment: PullRequestReviewComment
    /** Use `asPullRequestReview` to access fields on the underlying concrete type. */
    asPullRequestReview: PullRequestReview
}

/** A group of emoji reactions to a particular piece of content. */
export type ReactionGroup = GQLType & {
    /** Identifies the emoji reaction. */
    content: ReactionContent
    /** Identifies when the reaction was created. */
    createdAt?: DateTime
    /** The subject that was reacted to. */
    subject: Reactable
    /** Users who have reacted to the reaction subject with the emotion represented by this reaction group */
    users(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ReactingUserConnection
    /** Whether or not the authenticated user has left a reaction on the subject. */
    viewerHasReacted: boolean
}

/** Emojis that can be attached to Issues, Pull Requests and Comments. */
export type ReactionContent =
    | 'THUMBS_UP'
    | 'THUMBS_DOWN'
    | 'LAUGH'
    | 'HOORAY'
    | 'CONFUSED'
    | 'HEART'
    | 'ROCKET'
    | 'EYES'

/** The connection type for User. */
export type ReactingUserConnection = GQLType & {
    /** A list of edges. */
    edges?: ReactingUserEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a user that's made a reaction. */
export type ReactingUserEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    node: User
    /** The moment when the user made the reaction. */
    reactedAt: DateTime
}

/** A list of reactions that have been left on the subject. */
export type ReactionConnection = GQLType & {
    /** A list of edges. */
    edges?: ReactionEdge[]
    /** A list of nodes. */
    nodes?: Reaction[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
    /** Whether or not the authenticated user has left a reaction on the subject. */
    viewerHasReacted: boolean
}

/** An edge in a connection. */
export type ReactionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Reaction
}

/** An emoji reaction to a particular piece of content. */
export type Reaction = GQLType & {
    /** Identifies the emoji reaction. */
    content: ReactionContent
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** The reactable piece of content */
    reactable: Reactable
    /** Identifies the user who created this reaction. */
    user?: User
}

/** Ways in which lists of reactions can be ordered upon return. */
export type ReactionOrder = {
    /** The field in which to order reactions by. */
    field: ReactionOrderField
    /** The direction in which to order reactions by the specified field. */
    direction: OrderDirection
}

/** A list of fields that reactions can be ordered by. */
export type ReactionOrderField = 'CREATED_AT'

/** Information about a signature (GPG or S/MIME) on a Commit or Tag. */
export interface GitSignature extends GQLType {
    /** Email used to sign this object. */
    email: string
    /** True if the signature is valid and verified by GitHub. */
    isValid: boolean
    /** Payload for GPG signing object. Raw ODB object without the signature header. */
    payload: string
    /** ASCII-armored signature header from object. */
    signature: string
    /** GitHub user corresponding to the email signing this commit. */
    signer?: User
    /** The state of this signature. `VALID` if signature is valid and verified by GitHub, otherwise represents reason why signature is considered invalid. */
    state: GitSignatureState
    /** True if the signature was made with GitHub's signing key. */
    wasSignedByGitHub: boolean
    /** Use `asGpgSignature` to access fields on the underlying concrete type. */
    asGpgSignature: GpgSignature
    /** Use `asSmimeSignature` to access fields on the underlying concrete type. */
    asSmimeSignature: SmimeSignature
    /** Use `asUnknownSignature` to access fields on the underlying concrete type. */
    asUnknownSignature: UnknownSignature
}

/** The state of a Git signature. */
export type GitSignatureState =
    | 'VALID'
    | 'INVALID'
    | 'MALFORMED_SIG'
    | 'UNKNOWN_KEY'
    | 'BAD_EMAIL'
    | 'UNVERIFIED_EMAIL'
    | 'NO_USER'
    | 'UNKNOWN_SIG_TYPE'
    | 'UNSIGNED'
    | 'GPGVERIFY_UNAVAILABLE'
    | 'GPGVERIFY_ERROR'
    | 'NOT_SIGNING_KEY'
    | 'EXPIRED_KEY'
    | 'OCSP_PENDING'
    | 'OCSP_ERROR'
    | 'BAD_CERT'
    | 'OCSP_REVOKED'

/** Represents a commit status. */
export type Status = GQLType & {
    /** The commit this status is attached to. */
    commit?: Commit
    /** Looks up an individual status context by context name. */
    context(args: { name: string }): StatusContext | undefined
    /** The individual status contexts for this commit. */
    contexts: StatusContext[]
    id: ID
    /** The combined commit status. */
    state: StatusState
}

/** The possible commit status states. */
export type StatusState = 'EXPECTED' | 'ERROR' | 'FAILURE' | 'PENDING' | 'SUCCESS'

/** Represents an individual commit status context */
export type StatusContext = GQLType & {
    /** The avatar of the OAuth application or the user that created the status */
    avatarUrl(args?: { size?: Int }): URI | undefined
    /** This commit this status context is attached to. */
    commit?: Commit
    /** The name of this status context. */
    context: string
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The actor who created this status context. */
    creator?: Actor
    /** The description for this status context. */
    description?: string
    id: ID
    /** The state of this status context. */
    state: StatusState
    /** The URL for this status context. */
    targetUrl?: URI
}

/** A special type of user which takes actions on behalf of GitHub Apps. */
export type Bot = GQLType & {
    /** A URL pointing to the GitHub App's public avatar. */
    avatarUrl(args?: { size?: Int }): URI
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** The username of the actor. */
    login: string
    /** The HTTP path for this bot */
    resourcePath: URI
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this bot */
    url: URI
}

/** The possible states of a pull request. */
export type PullRequestState = 'OPEN' | 'CLOSED' | 'MERGED'

/** Represents a Git blame. */
export type Blame = GQLType & {
    /** The list of ranges from a Git blame. */
    ranges: BlameRange[]
}

/** Represents a range of information from a Git blame. */
export type BlameRange = GQLType & {
    /** Identifies the recency of the change, from 1 (new) to 10 (old). This is calculated as a 2-quantile and determines the length of distance between the median age of all the changes in the file and the recency of the current range's change. */
    age: Int
    /** Identifies the line author */
    commit: Commit
    /** The ending line for the range */
    endingLine: Int
    /** The starting line for the range */
    startingLine: Int
}

/** The connection type for Deployment. */
export type DeploymentConnection = GQLType & {
    /** A list of edges. */
    edges?: DeploymentEdge[]
    /** A list of nodes. */
    nodes?: Deployment[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type DeploymentEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Deployment
}

/** Represents triggered deployment instance. */
export type Deployment = GQLType & {
    /** Identifies the commit sha of the deployment. */
    commit?: Commit
    /** Identifies the oid of the deployment commit, even if the commit has been deleted. */
    commitOid: string
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the actor who triggered the deployment. */
    creator?: Actor
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The deployment description. */
    description?: string
    /** The environment to which this deployment was made. */
    environment?: string
    id: ID
    /** The latest status of this deployment. */
    latestStatus?: DeploymentStatus
    /** Extra information that a deployment system might need. */
    payload?: string
    /** Identifies the Ref of the deployment, if the deployment was created by ref. */
    ref?: Ref
    /** Identifies the repository associated with the deployment. */
    repository: Repository
    /** The current state of the deployment. */
    state?: DeploymentState
    /** A list of statuses associated with the deployment. */
    statuses(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): DeploymentStatusConnection | undefined
    /** The deployment task. */
    task?: string
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
}

/** The connection type for DeploymentStatus. */
export type DeploymentStatusConnection = GQLType & {
    /** A list of edges. */
    edges?: DeploymentStatusEdge[]
    /** A list of nodes. */
    nodes?: DeploymentStatus[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type DeploymentStatusEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: DeploymentStatus
}

/** Describes the status of a given deployment attempt. */
export type DeploymentStatus = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the actor who triggered the deployment. */
    creator?: Actor
    /** Identifies the deployment associated with status. */
    deployment: Deployment
    /** Identifies the description of the deployment. */
    description?: string
    /** Identifies the environment URL of the deployment. */
    environmentUrl?: URI
    id: ID
    /** Identifies the log URL of the deployment. */
    logUrl?: URI
    /** Identifies the current state of the deployment. */
    state: DeploymentStatusState
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
}

/** The possible states for a deployment status. */
export type DeploymentStatusState =
    | 'PENDING'
    | 'SUCCESS'
    | 'FAILURE'
    | 'INACTIVE'
    | 'ERROR'
    | 'QUEUED'
    | 'IN_PROGRESS'

/** The possible states in which a deployment can be. */
export type DeploymentState =
    | 'ABANDONED'
    | 'ACTIVE'
    | 'DESTROYED'
    | 'ERROR'
    | 'FAILURE'
    | 'INACTIVE'
    | 'PENDING'
    | 'QUEUED'
    | 'IN_PROGRESS'

/** Ordering options for deployment connections */
export type DeploymentOrder = {
    /** The field to order deployments by. */
    field: DeploymentOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which deployment connections can be ordered. */
export type DeploymentOrderField = 'CREATED_AT'

/** Ways in which lists of issues can be ordered upon return. */
export type PullRequestOrder = {
    /** The field in which to order pull requests by. */
    field: PullRequestOrderField
    /** The direction in which to order pull requests by the specified field. */
    direction: OrderDirection
}

/** Properties by which pull_requests connections can be ordered. */
export type PullRequestOrderField = 'CREATED_AT' | 'UPDATED_AT'

/** The connection type for ReleaseAsset. */
export type ReleaseAssetConnection = GQLType & {
    /** A list of edges. */
    edges?: ReleaseAssetEdge[]
    /** A list of nodes. */
    nodes?: ReleaseAsset[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ReleaseAssetEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: ReleaseAsset
}

/** A release asset contains the content for a release asset. */
export type ReleaseAsset = GQLType & {
    /** The asset's content-type */
    contentType: string
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The number of times this asset was downloaded */
    downloadCount: Int
    /** Identifies the URL where you can download the release asset via the browser. */
    downloadUrl: URI
    id: ID
    /** Identifies the title of the release asset. */
    name: string
    /** Release that the asset is associated with */
    release?: Release
    /** The size (in bytes) of the asset */
    size: Int
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The user that performed the upload */
    uploadedBy: User
    /** Identifies the URL of the release asset. */
    url: URI
}

/** The connection type for RegistryPackageVersion. */
export type RegistryPackageVersionConnection = GQLType & {
    /** A list of edges. */
    edges?: RegistryPackageVersionEdge[]
    /** A list of nodes. */
    nodes?: RegistryPackageVersion[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type RegistryPackageVersionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: RegistryPackageVersion
}

/** A package version contains the information about a specific package version. */
export type RegistryPackageVersion = GQLType & {
    /** list of dependencies for this package */
    dependencies(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        type?: RegistryPackageDependencyType
    }): RegistryPackageDependencyConnection
    /** A file associated with this registry package version */
    fileByName(args: { filename: string }): RegistryPackageFile | undefined
    /** List of files associated with this registry package version */
    files(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): RegistryPackageFileConnection
    id: ID
    /** A single line of text to install this package version. */
    installationCommand?: string
    /** Identifies the package manifest for this package version. */
    manifest?: string
    /** Identifies the platform this version was built for. */
    platform?: string
    /** The README of this package version */
    readme?: string
    /** The HTML README of this package version */
    readmeHtml?: HTML
    /** Registry package associated with this version. */
    registryPackage?: RegistryPackage
    /** Release associated with this package. */
    release?: Release
    /** Identifies the sha256. */
    sha256?: string
    /** Identifies the size. */
    size?: Int
    /** Statistics about package activity. */
    statistics?: RegistryPackageVersionStatistics
    /** Identifies the package version summary. */
    summary?: string
    /** Time at which the most recent file upload for this package version finished */
    updatedAt: DateTime
    /** Identifies the version number. */
    version: string
    /** Can the current viewer edit this Package version. */
    viewerCanEdit: boolean
}

/** Represents a object that contains package version activity statistics such as downloads. */
export type RegistryPackageVersionStatistics = GQLType & {
    /** Number of times the package was downloaded this month. */
    downloadsThisMonth: Int
    /** Number of times the package was downloaded this week. */
    downloadsThisWeek: Int
    /** Number of times the package was downloaded this year. */
    downloadsThisYear: Int
    /** Number of times the package was downloaded today. */
    downloadsToday: Int
    /** Number of times the package was downloaded since it was created. */
    downloadsTotalCount: Int
}

/** The connection type for RegistryPackageDependency. */
export type RegistryPackageDependencyConnection = GQLType & {
    /** A list of edges. */
    edges?: RegistryPackageDependencyEdge[]
    /** A list of nodes. */
    nodes?: RegistryPackageDependency[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type RegistryPackageDependencyEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: RegistryPackageDependency
}

/** A package dependency contains the information needed to satisfy a dependency. */
export type RegistryPackageDependency = GQLType & {
    /** Identifies the type of dependency. */
    dependencyType: RegistryPackageDependencyType
    id: ID
    /** Identifies the name of the dependency. */
    name: string
    /** Identifies the version of the dependency. */
    version: string
}

/** The possible types of a registry package dependency. */
export type RegistryPackageDependencyType =
    | 'DEFAULT'
    | 'DEV'
    | 'TEST'
    | 'PEER'
    | 'OPTIONAL'
    | 'BUNDLED'

/** The connection type for RegistryPackageFile. */
export type RegistryPackageFileConnection = GQLType & {
    /** A list of edges. */
    edges?: RegistryPackageFileEdge[]
    /** A list of nodes. */
    nodes?: RegistryPackageFile[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type RegistryPackageFileEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: RegistryPackageFile
}

/** A file in a specific registry package version. */
export type RegistryPackageFile = GQLType & {
    /** A unique identifier for this file. */
    guid?: string
    id: ID
    /** Identifies the md5. */
    md5?: string
    /** URL to download the asset metadata. */
    metadataUrl: URI
    /** Name of the file */
    name: string
    /** The package version this file belongs to. */
    packageVersion: RegistryPackageVersion
    /** Identifies the sha1. */
    sha1?: string
    /** Identifies the sha256. */
    sha256?: string
    /** Identifies the size. */
    size?: Int
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** URL to download the asset. */
    url: URI
}

/** A public description of a Marketplace category. */
export type MarketplaceCategory = GQLType & {
    /** The category's description. */
    description?: string
    /** The technical description of how apps listed in this category work with GitHub. */
    howItWorks?: string
    id: ID
    /** The category's name. */
    name: string
    /** How many Marketplace listings have this as their primary category. */
    primaryListingCount: Int
    /** The HTTP path for this Marketplace category. */
    resourcePath: URI
    /** How many Marketplace listings have this as their secondary category. */
    secondaryListingCount: Int
    /** The short name of the category used in its URL. */
    slug: string
    /** The HTTP URL for this Marketplace category. */
    url: URI
}

/** Look up Marketplace Listings */
export type MarketplaceListingConnection = GQLType & {
    /** A list of edges. */
    edges?: MarketplaceListingEdge[]
    /** A list of nodes. */
    nodes?: MarketplaceListing[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type MarketplaceListingEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: MarketplaceListing
}

/** The connection type for Release. */
export type ReleaseConnection = GQLType & {
    /** A list of edges. */
    edges?: ReleaseEdge[]
    /** A list of nodes. */
    nodes?: Release[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ReleaseEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Release
}

/** Ways in which lists of releases can be ordered upon return. */
export type ReleaseOrder = {
    /** The field in which to order releases by. */
    field: ReleaseOrderField
    /** The direction in which to order releases by the specified field. */
    direction: OrderDirection
}

/** Properties by which release connections can be ordered. */
export type ReleaseOrderField = 'CREATED_AT' | 'NAME'

/** The connection type for GistComment. */
export type GistCommentConnection = GQLType & {
    /** A list of edges. */
    edges?: GistCommentEdge[]
    /** A list of nodes. */
    nodes?: GistComment[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type GistCommentEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: GistComment
}

/** Represents a comment on an Gist. */
export type GistComment = GQLType & {
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the gist. */
    authorAssociation: CommentAuthorAssociation
    /** Identifies the comment body. */
    body: string
    /** The comment body rendered to HTML. */
    bodyHTML: HTML
    /** The body rendered to text. */
    bodyText: string
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The actor who edited the comment. */
    editor?: Actor
    /** The associated gist. */
    gist: Gist
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** Returns whether or not a comment has been minimized. */
    isMinimized: boolean
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** Returns why the comment was minimized. */
    minimizedReason?: string
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** A list of edits to this content. */
    userContentEdits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserContentEditConnection | undefined
    /** Check if the current viewer can delete this object. */
    viewerCanDelete: boolean
    /** Check if the current viewer can minimize this object. */
    viewerCanMinimize: boolean
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
}

/** The connection type for Gist. */
export type GistConnection = GQLType & {
    /** A list of edges. */
    edges?: GistEdge[]
    /** A list of nodes. */
    nodes?: Gist[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type GistEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Gist
}

/** Ordering options for gist connections */
export type GistOrder = {
    /** The field to order repositories by. */
    field: GistOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which gist connections can be ordered. */
export type GistOrderField = 'CREATED_AT' | 'UPDATED_AT' | 'PUSHED_AT'

/** A file in a gist. */
export type GistFile = GQLType & {
    /** The file name encoded to remove characters that are invalid in URL paths. */
    encodedName?: string
    /** The gist file encoding. */
    encoding?: string
    /** The file extension from the file name. */
    extension?: string
    /** Indicates if this file is an image. */
    isImage: boolean
    /** Whether the file's contents were truncated. */
    isTruncated: boolean
    /** The programming language this file is written in. */
    language?: Language
    /** The gist file name. */
    name?: string
    /** The gist file size in bytes. */
    size?: Int
    /** UTF8 text data or null if the file is binary */
    text(args?: { truncate?: Int }): string | undefined
}

/** Represents a given language found in repositories. */
export type Language = GQLType & {
    /** The color defined for the current language. */
    color?: string
    id: ID
    /** The name of the current language. */
    name: string
}

/** Represents items that can be pinned to a profile page or dashboard. */
export type PinnableItemType =
    | 'REPOSITORY'
    | 'GIST'
    | 'ISSUE'
    | 'PROJECT'
    | 'PULL_REQUEST'
    | 'USER'
    | 'ORGANIZATION'
    | 'TEAM'

/** A list of projects associated with the owner. */
export type ProjectConnection = GQLType & {
    /** A list of edges. */
    edges?: ProjectEdge[]
    /** A list of nodes. */
    nodes?: Project[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ProjectEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Project
}

/** Ways in which lists of projects can be ordered upon return. */
export type ProjectOrder = {
    /** The field in which to order projects by. */
    field: ProjectOrderField
    /** The direction in which to order projects by the specified field. */
    direction: OrderDirection
}

/** Properties by which project connections can be ordered. */
export type ProjectOrderField = 'CREATED_AT' | 'UPDATED_AT' | 'NAME'

/** The connection type for OrganizationAuditEntry. */
export type OrganizationAuditEntryConnection = GQLType & {
    /** A list of edges. */
    edges?: OrganizationAuditEntryEdge[]
    /** A list of nodes. */
    nodes?: OrganizationAuditEntry[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type OrganizationAuditEntryEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: OrganizationAuditEntry
}

/** An audit entry in an organization audit log. */
export type OrganizationAuditEntry =
    | MembersCanDeleteReposClearAuditEntry
    | MembersCanDeleteReposDisableAuditEntry
    | MembersCanDeleteReposEnableAuditEntry
    | OauthApplicationCreateAuditEntry
    | OrgAddBillingManagerAuditEntry
    | OrgAddMemberAuditEntry
    | OrgBlockUserAuditEntry
    | OrgConfigDisableCollaboratorsOnlyAuditEntry
    | OrgConfigEnableCollaboratorsOnlyAuditEntry
    | OrgDisableOauthAppRestrictionsAuditEntry
    | OrgDisableSamlAuditEntry
    | OrgDisableTwoFactorRequirementAuditEntry
    | OrgEnableOauthAppRestrictionsAuditEntry
    | OrgEnableSamlAuditEntry
    | OrgEnableTwoFactorRequirementAuditEntry
    | OrgInviteMemberAuditEntry
    | OrgInviteToBusinessAuditEntry
    | OrgOauthAppAccessApprovedAuditEntry
    | OrgOauthAppAccessDeniedAuditEntry
    | OrgOauthAppAccessRequestedAuditEntry
    | OrgRemoveBillingManagerAuditEntry
    | OrgRemoveMemberAuditEntry
    | OrgRemoveOutsideCollaboratorAuditEntry
    | OrgRestoreMemberAuditEntry
    | OrgUnblockUserAuditEntry
    | OrgUpdateDefaultRepositoryPermissionAuditEntry
    | OrgUpdateMemberAuditEntry
    | OrgUpdateMemberRepositoryCreationPermissionAuditEntry
    | OrgUpdateMemberRepositoryInvitationPermissionAuditEntry
    | PrivateRepositoryForkingDisableAuditEntry
    | PrivateRepositoryForkingEnableAuditEntry
    | RepoAccessAuditEntry
    | RepoAddMemberAuditEntry
    | RepoAddTopicAuditEntry
    | RepoArchivedAuditEntry
    | RepoChangeMergeSettingAuditEntry
    | RepoConfigDisableAnonymousGitAccessAuditEntry
    | RepoConfigDisableCollaboratorsOnlyAuditEntry
    | RepoConfigDisableContributorsOnlyAuditEntry
    | RepoConfigDisableSockpuppetDisallowedAuditEntry
    | RepoConfigEnableAnonymousGitAccessAuditEntry
    | RepoConfigEnableCollaboratorsOnlyAuditEntry
    | RepoConfigEnableContributorsOnlyAuditEntry
    | RepoConfigEnableSockpuppetDisallowedAuditEntry
    | RepoConfigLockAnonymousGitAccessAuditEntry
    | RepoConfigUnlockAnonymousGitAccessAuditEntry
    | RepoCreateAuditEntry
    | RepoDestroyAuditEntry
    | RepoRemoveMemberAuditEntry
    | RepoRemoveTopicAuditEntry
    | RepositoryVisibilityChangeDisableAuditEntry
    | RepositoryVisibilityChangeEnableAuditEntry
    | TeamAddMemberAuditEntry
    | TeamAddRepositoryAuditEntry
    | TeamChangeParentTeamAuditEntry
    | TeamRemoveMemberAuditEntry
    | TeamRemoveRepositoryAuditEntry

/** An entry in the audit log. */
export interface AuditEntry extends GQLType {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** Use `asMembersCanDeleteReposClearAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposClearAuditEntry: MembersCanDeleteReposClearAuditEntry
    /** Use `asMembersCanDeleteReposDisableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposDisableAuditEntry: MembersCanDeleteReposDisableAuditEntry
    /** Use `asMembersCanDeleteReposEnableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposEnableAuditEntry: MembersCanDeleteReposEnableAuditEntry
    /** Use `asOauthApplicationCreateAuditEntry` to access fields on the underlying concrete type. */
    asOauthApplicationCreateAuditEntry: OauthApplicationCreateAuditEntry
    /** Use `asOrgAddBillingManagerAuditEntry` to access fields on the underlying concrete type. */
    asOrgAddBillingManagerAuditEntry: OrgAddBillingManagerAuditEntry
    /** Use `asOrgAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgAddMemberAuditEntry: OrgAddMemberAuditEntry
    /** Use `asOrgBlockUserAuditEntry` to access fields on the underlying concrete type. */
    asOrgBlockUserAuditEntry: OrgBlockUserAuditEntry
    /** Use `asOrgConfigDisableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asOrgConfigDisableCollaboratorsOnlyAuditEntry: OrgConfigDisableCollaboratorsOnlyAuditEntry
    /** Use `asOrgConfigEnableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asOrgConfigEnableCollaboratorsOnlyAuditEntry: OrgConfigEnableCollaboratorsOnlyAuditEntry
    /** Use `asOrgDisableOauthAppRestrictionsAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableOauthAppRestrictionsAuditEntry: OrgDisableOauthAppRestrictionsAuditEntry
    /** Use `asOrgDisableSamlAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableSamlAuditEntry: OrgDisableSamlAuditEntry
    /** Use `asOrgDisableTwoFactorRequirementAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableTwoFactorRequirementAuditEntry: OrgDisableTwoFactorRequirementAuditEntry
    /** Use `asOrgEnableOauthAppRestrictionsAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableOauthAppRestrictionsAuditEntry: OrgEnableOauthAppRestrictionsAuditEntry
    /** Use `asOrgEnableSamlAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableSamlAuditEntry: OrgEnableSamlAuditEntry
    /** Use `asOrgEnableTwoFactorRequirementAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableTwoFactorRequirementAuditEntry: OrgEnableTwoFactorRequirementAuditEntry
    /** Use `asOrgInviteMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgInviteMemberAuditEntry: OrgInviteMemberAuditEntry
    /** Use `asOrgInviteToBusinessAuditEntry` to access fields on the underlying concrete type. */
    asOrgInviteToBusinessAuditEntry: OrgInviteToBusinessAuditEntry
    /** Use `asOrgOauthAppAccessApprovedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessApprovedAuditEntry: OrgOauthAppAccessApprovedAuditEntry
    /** Use `asOrgOauthAppAccessDeniedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessDeniedAuditEntry: OrgOauthAppAccessDeniedAuditEntry
    /** Use `asOrgOauthAppAccessRequestedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessRequestedAuditEntry: OrgOauthAppAccessRequestedAuditEntry
    /** Use `asOrgRemoveBillingManagerAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveBillingManagerAuditEntry: OrgRemoveBillingManagerAuditEntry
    /** Use `asOrgRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveMemberAuditEntry: OrgRemoveMemberAuditEntry
    /** Use `asOrgRemoveOutsideCollaboratorAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveOutsideCollaboratorAuditEntry: OrgRemoveOutsideCollaboratorAuditEntry
    /** Use `asOrgRestoreMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgRestoreMemberAuditEntry: OrgRestoreMemberAuditEntry
    /** Use `asOrgUnblockUserAuditEntry` to access fields on the underlying concrete type. */
    asOrgUnblockUserAuditEntry: OrgUnblockUserAuditEntry
    /** Use `asOrgUpdateDefaultRepositoryPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateDefaultRepositoryPermissionAuditEntry: OrgUpdateDefaultRepositoryPermissionAuditEntry
    /** Use `asOrgUpdateMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberAuditEntry: OrgUpdateMemberAuditEntry
    /** Use `asOrgUpdateMemberRepositoryCreationPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberRepositoryCreationPermissionAuditEntry: OrgUpdateMemberRepositoryCreationPermissionAuditEntry
    /** Use `asOrgUpdateMemberRepositoryInvitationPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberRepositoryInvitationPermissionAuditEntry: OrgUpdateMemberRepositoryInvitationPermissionAuditEntry
    /** Use `asPrivateRepositoryForkingDisableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingDisableAuditEntry: PrivateRepositoryForkingDisableAuditEntry
    /** Use `asPrivateRepositoryForkingEnableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingEnableAuditEntry: PrivateRepositoryForkingEnableAuditEntry
    /** Use `asRepoAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoAccessAuditEntry: RepoAccessAuditEntry
    /** Use `asRepoAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddMemberAuditEntry: RepoAddMemberAuditEntry
    /** Use `asRepoAddTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddTopicAuditEntry: RepoAddTopicAuditEntry
    /** Use `asRepoArchivedAuditEntry` to access fields on the underlying concrete type. */
    asRepoArchivedAuditEntry: RepoArchivedAuditEntry
    /** Use `asRepoChangeMergeSettingAuditEntry` to access fields on the underlying concrete type. */
    asRepoChangeMergeSettingAuditEntry: RepoChangeMergeSettingAuditEntry
    /** Use `asRepoConfigDisableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableAnonymousGitAccessAuditEntry: RepoConfigDisableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigDisableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableCollaboratorsOnlyAuditEntry: RepoConfigDisableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigDisableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableContributorsOnlyAuditEntry: RepoConfigDisableContributorsOnlyAuditEntry
    /** Use `asRepoConfigDisableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableSockpuppetDisallowedAuditEntry: RepoConfigDisableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigEnableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableAnonymousGitAccessAuditEntry: RepoConfigEnableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigEnableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableCollaboratorsOnlyAuditEntry: RepoConfigEnableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigEnableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableContributorsOnlyAuditEntry: RepoConfigEnableContributorsOnlyAuditEntry
    /** Use `asRepoConfigEnableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableSockpuppetDisallowedAuditEntry: RepoConfigEnableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigLockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigLockAnonymousGitAccessAuditEntry: RepoConfigLockAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigUnlockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigUnlockAnonymousGitAccessAuditEntry: RepoConfigUnlockAnonymousGitAccessAuditEntry
    /** Use `asRepoCreateAuditEntry` to access fields on the underlying concrete type. */
    asRepoCreateAuditEntry: RepoCreateAuditEntry
    /** Use `asRepoDestroyAuditEntry` to access fields on the underlying concrete type. */
    asRepoDestroyAuditEntry: RepoDestroyAuditEntry
    /** Use `asRepoRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveMemberAuditEntry: RepoRemoveMemberAuditEntry
    /** Use `asRepoRemoveTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveTopicAuditEntry: RepoRemoveTopicAuditEntry
    /** Use `asRepositoryVisibilityChangeDisableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeDisableAuditEntry: RepositoryVisibilityChangeDisableAuditEntry
    /** Use `asRepositoryVisibilityChangeEnableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeEnableAuditEntry: RepositoryVisibilityChangeEnableAuditEntry
    /** Use `asTeamAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddMemberAuditEntry: TeamAddMemberAuditEntry
    /** Use `asTeamAddRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddRepositoryAuditEntry: TeamAddRepositoryAuditEntry
    /** Use `asTeamChangeParentTeamAuditEntry` to access fields on the underlying concrete type. */
    asTeamChangeParentTeamAuditEntry: TeamChangeParentTeamAuditEntry
    /** Use `asTeamRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveMemberAuditEntry: TeamRemoveMemberAuditEntry
    /** Use `asTeamRemoveRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveRepositoryAuditEntry: TeamRemoveRepositoryAuditEntry
}

/** Types that can initiate an audit log event. */
export type AuditEntryActor = Bot | Organization | User

/** Location information for an actor */
export type ActorLocation = GQLType & {
    /** City */
    city?: string
    /** Country name */
    country?: string
    /** Country code */
    countryCode?: string
    /** Region name */
    region?: string
    /** Region or state code */
    regionCode?: string
}

/** An ISO-8601 encoded UTC date string with millisecond precison. */
export type PreciseDateTime = any

/** Metadata for an audit entry with action org.* */
export interface OrganizationAuditEntryData extends GQLType {
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** Use `asMembersCanDeleteReposClearAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposClearAuditEntry: MembersCanDeleteReposClearAuditEntry
    /** Use `asMembersCanDeleteReposDisableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposDisableAuditEntry: MembersCanDeleteReposDisableAuditEntry
    /** Use `asMembersCanDeleteReposEnableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposEnableAuditEntry: MembersCanDeleteReposEnableAuditEntry
    /** Use `asOauthApplicationCreateAuditEntry` to access fields on the underlying concrete type. */
    asOauthApplicationCreateAuditEntry: OauthApplicationCreateAuditEntry
    /** Use `asOrgAddBillingManagerAuditEntry` to access fields on the underlying concrete type. */
    asOrgAddBillingManagerAuditEntry: OrgAddBillingManagerAuditEntry
    /** Use `asOrgAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgAddMemberAuditEntry: OrgAddMemberAuditEntry
    /** Use `asOrgBlockUserAuditEntry` to access fields on the underlying concrete type. */
    asOrgBlockUserAuditEntry: OrgBlockUserAuditEntry
    /** Use `asOrgConfigDisableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asOrgConfigDisableCollaboratorsOnlyAuditEntry: OrgConfigDisableCollaboratorsOnlyAuditEntry
    /** Use `asOrgConfigEnableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asOrgConfigEnableCollaboratorsOnlyAuditEntry: OrgConfigEnableCollaboratorsOnlyAuditEntry
    /** Use `asOrgDisableOauthAppRestrictionsAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableOauthAppRestrictionsAuditEntry: OrgDisableOauthAppRestrictionsAuditEntry
    /** Use `asOrgDisableSamlAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableSamlAuditEntry: OrgDisableSamlAuditEntry
    /** Use `asOrgDisableTwoFactorRequirementAuditEntry` to access fields on the underlying concrete type. */
    asOrgDisableTwoFactorRequirementAuditEntry: OrgDisableTwoFactorRequirementAuditEntry
    /** Use `asOrgEnableOauthAppRestrictionsAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableOauthAppRestrictionsAuditEntry: OrgEnableOauthAppRestrictionsAuditEntry
    /** Use `asOrgEnableSamlAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableSamlAuditEntry: OrgEnableSamlAuditEntry
    /** Use `asOrgEnableTwoFactorRequirementAuditEntry` to access fields on the underlying concrete type. */
    asOrgEnableTwoFactorRequirementAuditEntry: OrgEnableTwoFactorRequirementAuditEntry
    /** Use `asOrgInviteMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgInviteMemberAuditEntry: OrgInviteMemberAuditEntry
    /** Use `asOrgInviteToBusinessAuditEntry` to access fields on the underlying concrete type. */
    asOrgInviteToBusinessAuditEntry: OrgInviteToBusinessAuditEntry
    /** Use `asOrgOauthAppAccessApprovedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessApprovedAuditEntry: OrgOauthAppAccessApprovedAuditEntry
    /** Use `asOrgOauthAppAccessDeniedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessDeniedAuditEntry: OrgOauthAppAccessDeniedAuditEntry
    /** Use `asOrgOauthAppAccessRequestedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessRequestedAuditEntry: OrgOauthAppAccessRequestedAuditEntry
    /** Use `asOrgRemoveBillingManagerAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveBillingManagerAuditEntry: OrgRemoveBillingManagerAuditEntry
    /** Use `asOrgRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveMemberAuditEntry: OrgRemoveMemberAuditEntry
    /** Use `asOrgRemoveOutsideCollaboratorAuditEntry` to access fields on the underlying concrete type. */
    asOrgRemoveOutsideCollaboratorAuditEntry: OrgRemoveOutsideCollaboratorAuditEntry
    /** Use `asOrgRestoreMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgRestoreMemberAuditEntry: OrgRestoreMemberAuditEntry
    /** Use `asOrgRestoreMemberMembershipOrganizationAuditEntryData` to access fields on the underlying concrete type. */
    asOrgRestoreMemberMembershipOrganizationAuditEntryData: OrgRestoreMemberMembershipOrganizationAuditEntryData
    /** Use `asOrgUnblockUserAuditEntry` to access fields on the underlying concrete type. */
    asOrgUnblockUserAuditEntry: OrgUnblockUserAuditEntry
    /** Use `asOrgUpdateDefaultRepositoryPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateDefaultRepositoryPermissionAuditEntry: OrgUpdateDefaultRepositoryPermissionAuditEntry
    /** Use `asOrgUpdateMemberAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberAuditEntry: OrgUpdateMemberAuditEntry
    /** Use `asOrgUpdateMemberRepositoryCreationPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberRepositoryCreationPermissionAuditEntry: OrgUpdateMemberRepositoryCreationPermissionAuditEntry
    /** Use `asOrgUpdateMemberRepositoryInvitationPermissionAuditEntry` to access fields on the underlying concrete type. */
    asOrgUpdateMemberRepositoryInvitationPermissionAuditEntry: OrgUpdateMemberRepositoryInvitationPermissionAuditEntry
    /** Use `asPrivateRepositoryForkingDisableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingDisableAuditEntry: PrivateRepositoryForkingDisableAuditEntry
    /** Use `asPrivateRepositoryForkingEnableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingEnableAuditEntry: PrivateRepositoryForkingEnableAuditEntry
    /** Use `asRepoAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoAccessAuditEntry: RepoAccessAuditEntry
    /** Use `asRepoAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddMemberAuditEntry: RepoAddMemberAuditEntry
    /** Use `asRepoAddTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddTopicAuditEntry: RepoAddTopicAuditEntry
    /** Use `asRepoArchivedAuditEntry` to access fields on the underlying concrete type. */
    asRepoArchivedAuditEntry: RepoArchivedAuditEntry
    /** Use `asRepoChangeMergeSettingAuditEntry` to access fields on the underlying concrete type. */
    asRepoChangeMergeSettingAuditEntry: RepoChangeMergeSettingAuditEntry
    /** Use `asRepoConfigDisableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableAnonymousGitAccessAuditEntry: RepoConfigDisableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigDisableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableCollaboratorsOnlyAuditEntry: RepoConfigDisableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigDisableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableContributorsOnlyAuditEntry: RepoConfigDisableContributorsOnlyAuditEntry
    /** Use `asRepoConfigDisableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableSockpuppetDisallowedAuditEntry: RepoConfigDisableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigEnableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableAnonymousGitAccessAuditEntry: RepoConfigEnableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigEnableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableCollaboratorsOnlyAuditEntry: RepoConfigEnableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigEnableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableContributorsOnlyAuditEntry: RepoConfigEnableContributorsOnlyAuditEntry
    /** Use `asRepoConfigEnableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableSockpuppetDisallowedAuditEntry: RepoConfigEnableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigLockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigLockAnonymousGitAccessAuditEntry: RepoConfigLockAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigUnlockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigUnlockAnonymousGitAccessAuditEntry: RepoConfigUnlockAnonymousGitAccessAuditEntry
    /** Use `asRepoCreateAuditEntry` to access fields on the underlying concrete type. */
    asRepoCreateAuditEntry: RepoCreateAuditEntry
    /** Use `asRepoDestroyAuditEntry` to access fields on the underlying concrete type. */
    asRepoDestroyAuditEntry: RepoDestroyAuditEntry
    /** Use `asRepoRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveMemberAuditEntry: RepoRemoveMemberAuditEntry
    /** Use `asRepoRemoveTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveTopicAuditEntry: RepoRemoveTopicAuditEntry
    /** Use `asRepositoryVisibilityChangeDisableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeDisableAuditEntry: RepositoryVisibilityChangeDisableAuditEntry
    /** Use `asRepositoryVisibilityChangeEnableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeEnableAuditEntry: RepositoryVisibilityChangeEnableAuditEntry
    /** Use `asTeamAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddMemberAuditEntry: TeamAddMemberAuditEntry
    /** Use `asTeamAddRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddRepositoryAuditEntry: TeamAddRepositoryAuditEntry
    /** Use `asTeamChangeParentTeamAuditEntry` to access fields on the underlying concrete type. */
    asTeamChangeParentTeamAuditEntry: TeamChangeParentTeamAuditEntry
    /** Use `asTeamRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveMemberAuditEntry: TeamRemoveMemberAuditEntry
    /** Use `asTeamRemoveRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveRepositoryAuditEntry: TeamRemoveRepositoryAuditEntry
}

/** Represents a comment on an Issue. */
export type IssueComment = GQLType & {
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the subject of the comment. */
    authorAssociation: CommentAuthorAssociation
    /** The body as Markdown. */
    body: string
    /** The body rendered to HTML. */
    bodyHTML: HTML
    /** The body rendered to text. */
    bodyText: string
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The actor who edited the comment. */
    editor?: Actor
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** Returns whether or not a comment has been minimized. */
    isMinimized: boolean
    /** Identifies the issue associated with the comment. */
    issue: Issue
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** Returns why the comment was minimized. */
    minimizedReason?: string
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** Returns the pull request associated with the comment, if this comment was made on a
pull request.
 */
    pullRequest?: PullRequest
    /** A list of reactions grouped by content left on the subject. */
    reactionGroups?: ReactionGroup[]
    /** A list of Reactions left on the Issue. */
    reactions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        content?: ReactionContent
        orderBy?: ReactionOrder
    }): ReactionConnection
    /** The repository associated with this node. */
    repository: Repository
    /** The HTTP path for this issue comment */
    resourcePath: URI
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this issue comment */
    url: URI
    /** A list of edits to this content. */
    userContentEdits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserContentEditConnection | undefined
    /** Check if the current viewer can delete this object. */
    viewerCanDelete: boolean
    /** Check if the current viewer can minimize this object. */
    viewerCanMinimize: boolean
    /** Can user react to this subject */
    viewerCanReact: boolean
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
}

/** The possible PubSub channels for an issue. */
export type IssuePubSubTopic = 'UPDATED' | 'MARKASREAD' | 'TIMELINE' | 'STATE'

/** Audit log entry for a members_can_delete_repos.clear event. */
export type MembersCanDeleteReposClearAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Metadata for an audit entry containing enterprise account information. */
export interface EnterpriseAuditEntryData extends GQLType {
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    /** Use `asMembersCanDeleteReposClearAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposClearAuditEntry: MembersCanDeleteReposClearAuditEntry
    /** Use `asMembersCanDeleteReposDisableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposDisableAuditEntry: MembersCanDeleteReposDisableAuditEntry
    /** Use `asMembersCanDeleteReposEnableAuditEntry` to access fields on the underlying concrete type. */
    asMembersCanDeleteReposEnableAuditEntry: MembersCanDeleteReposEnableAuditEntry
    /** Use `asOrgInviteToBusinessAuditEntry` to access fields on the underlying concrete type. */
    asOrgInviteToBusinessAuditEntry: OrgInviteToBusinessAuditEntry
    /** Use `asPrivateRepositoryForkingDisableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingDisableAuditEntry: PrivateRepositoryForkingDisableAuditEntry
    /** Use `asPrivateRepositoryForkingEnableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingEnableAuditEntry: PrivateRepositoryForkingEnableAuditEntry
    /** Use `asRepositoryVisibilityChangeDisableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeDisableAuditEntry: RepositoryVisibilityChangeDisableAuditEntry
    /** Use `asRepositoryVisibilityChangeEnableAuditEntry` to access fields on the underlying concrete type. */
    asRepositoryVisibilityChangeEnableAuditEntry: RepositoryVisibilityChangeEnableAuditEntry
}

/** The connection type for Organization. */
export type OrganizationConnection = GQLType & {
    /** A list of edges. */
    edges?: OrganizationEdge[]
    /** A list of nodes. */
    nodes?: Organization[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type OrganizationEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Organization
}

/** An Invitation for a user to an organization. */
export type OrganizationInvitation = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The email address of the user invited to the organization. */
    email?: string
    id: ID
    /** The type of invitation that was sent (e.g. email, user). */
    invitationType: OrganizationInvitationType
    /** The user who was invited to the organization. */
    invitee?: User
    /** The user who created the invitation. */
    inviter: User
    /** The organization the invite is for */
    organization: Organization
    /** The user's pending role in the organization (e.g. member, owner). */
    role: OrganizationInvitationRole
}

/** The possible organization invitation types. */
export type OrganizationInvitationType = 'USER' | 'EMAIL'

/** The possible organization invitation roles. */
export type OrganizationInvitationRole = 'DIRECT_MEMBER' | 'ADMIN' | 'BILLING_MANAGER' | 'REINSTATE'

/** The connection type for Team. */
export type TeamConnection = GQLType & {
    /** A list of edges. */
    edges?: TeamEdge[]
    /** A list of nodes. */
    nodes?: Team[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type TeamEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Team
}

/** A team of users in an organization. */
export type Team = GQLType & {
    /** A list of teams that are ancestors of this team. */
    ancestors(args?: { after?: string; before?: string; first?: Int; last?: Int }): TeamConnection
    /** A URL pointing to the team's avatar. */
    avatarUrl(args?: { size?: Int }): URI | undefined
    /** List of child teams belonging to this team */
    childTeams(args?: {
        orderBy?: TeamOrder
        userLogins?: string[]
        immediateOnly?: boolean
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): TeamConnection
    /** The slug corresponding to the organization and team. */
    combinedSlug: string
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The description of the team. */
    description?: string
    /** The HTTP path for editing this team */
    editTeamResourcePath: URI
    /** The HTTP URL for editing this team */
    editTeamUrl: URI
    id: ID
    /** A list of pending invitations for users to this team */
    invitations(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): OrganizationInvitationConnection | undefined
    /** Get the status messages members of this entity have set that are either public or visible only to the organization. */
    memberStatuses(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: UserStatusOrder
    }): UserStatusConnection
    /** A list of users who are members of this team. */
    members(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        query?: string
        membership?: TeamMembershipType
        role?: TeamMemberRole
        orderBy?: TeamMemberOrder
    }): TeamMemberConnection
    /** The HTTP path for the team' members */
    membersResourcePath: URI
    /** The HTTP URL for the team' members */
    membersUrl: URI
    /** The name of the team. */
    name: string
    /** The HTTP path creating a new team */
    newTeamResourcePath: URI
    /** The HTTP URL creating a new team */
    newTeamUrl: URI
    /** The organization that owns this team. */
    organization: Organization
    /** The parent team of the team. */
    parentTeam?: Team
    /** The level of privacy the team has. */
    privacy: TeamPrivacy
    /** A list of repositories this team has access to. */
    repositories(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        query?: string
        orderBy?: TeamRepositoryOrder
    }): TeamRepositoryConnection
    /** The HTTP path for this team's repositories */
    repositoriesResourcePath: URI
    /** The HTTP URL for this team's repositories */
    repositoriesUrl: URI
    /** The HTTP path for this team */
    resourcePath: URI
    /** The slug corresponding to the team. */
    slug: string
    /** The HTTP path for this team's teams */
    teamsResourcePath: URI
    /** The HTTP URL for this team's teams */
    teamsUrl: URI
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this team */
    url: URI
    /** Team is adminable by the viewer. */
    viewerCanAdminister: boolean
    /** Check if the viewer is able to change their subscription status for the repository. */
    viewerCanSubscribe: boolean
    /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
    viewerSubscription?: SubscriptionState
}

/** The possible team privacy values. */
export type TeamPrivacy = 'SECRET' | 'VISIBLE'

/** The connection type for User. */
export type TeamMemberConnection = GQLType & {
    /** A list of edges. */
    edges?: TeamMemberEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a user who is a member of a team. */
export type TeamMemberEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The HTTP path to the organization's member access page. */
    memberAccessResourcePath: URI
    /** The HTTP URL to the organization's member access page. */
    memberAccessUrl: URI
    node: User
    /** The role the member has on the team. */
    role: TeamMemberRole
}

/** The possible team member roles; either 'maintainer' or 'member'. */
export type TeamMemberRole = 'MAINTAINER' | 'MEMBER'

/** Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL. */
export type TeamMembershipType = 'IMMEDIATE' | 'CHILD_TEAM' | 'ALL'

/** Ordering options for team member connections */
export type TeamMemberOrder = {
    /** The field to order team members by. */
    field: TeamMemberOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which team member connections can be ordered. */
export type TeamMemberOrderField = 'LOGIN' | 'CREATED_AT'

/** The connection type for Repository. */
export type TeamRepositoryConnection = GQLType & {
    /** A list of edges. */
    edges?: TeamRepositoryEdge[]
    /** A list of nodes. */
    nodes?: Repository[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a team repository. */
export type TeamRepositoryEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    node: Repository
    /** The permission level the team has on the repository */
    permission: RepositoryPermission
}

/** The access level to a repository */
export type RepositoryPermission = 'ADMIN' | 'MAINTAIN' | 'WRITE' | 'TRIAGE' | 'READ'

/** Ordering options for team repository connections */
export type TeamRepositoryOrder = {
    /** The field to order repositories by. */
    field: TeamRepositoryOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which team repository connections can be ordered. */
export type TeamRepositoryOrderField =
    | 'CREATED_AT'
    | 'UPDATED_AT'
    | 'PUSHED_AT'
    | 'NAME'
    | 'PERMISSION'
    | 'STARGAZERS'

/** Represents a connection between a team (parent) and a project (child). */
export type TeamProjectEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The parent team that grants inherited permission to this project */
    inheritedPermissionOrigin?: Team
    /** The item at the end of the edge. */
    node?: Project
    /** The HTTP path for this team's project */
    teamProjectResourcePath: URI
    /** The HTTP URL for this team's project */
    teamProjectUrl: URI
}

/** The connection type for OrganizationInvitation. */
export type OrganizationInvitationConnection = GQLType & {
    /** A list of edges. */
    edges?: OrganizationInvitationEdge[]
    /** A list of nodes. */
    nodes?: OrganizationInvitation[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type OrganizationInvitationEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: OrganizationInvitation
}

/** Ways in which team connections can be ordered. */
export type TeamOrder = {
    /** The field in which to order nodes by. */
    field: TeamOrderField
    /** The direction in which to order nodes. */
    direction: OrderDirection
}

/** Properties by which team connections can be ordered. */
export type TeamOrderField = 'NAME'

/** Represents a team's eligibility to be a child team of another */
export type TeamEligibilityEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Team
}

/** The possible default permissions for repositories. */
export type DefaultRepositoryPermissionField = 'NONE' | 'READ' | 'WRITE' | 'ADMIN'

/** The connection type for ExternalIdentity. */
export type ExternalIdentityConnection = GQLType & {
    /** A list of edges. */
    edges?: ExternalIdentityEdge[]
    /** A list of nodes. */
    nodes?: ExternalIdentity[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ExternalIdentityEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: ExternalIdentity
}

/** An external identity provisioned by SAML SSO or SCIM. */
export type ExternalIdentity = GQLType & {
    /** The GUID for this identity */
    guid: string
    id: ID
    /** Organization invitation for this SCIM-provisioned external identity */
    organizationInvitation?: OrganizationInvitation
    /** SAML Identity attributes */
    samlIdentity?: ExternalIdentitySamlAttributes
    /** SCIM Identity attributes */
    scimIdentity?: ExternalIdentityScimAttributes
    /** User linked to this external identity. Will be NULL if this identity has not been claimed by an organization member. */
    user?: User
}

/** SAML attributes for the External Identity */
export type ExternalIdentitySamlAttributes = GQLType & {
    /** The NameID of the SAML identity */
    nameId?: string
}

/** SCIM attributes for the External Identity */
export type ExternalIdentityScimAttributes = GQLType & {
    /** The userName of the SCIM identity */
    username?: string
}

/** A user's public key. */
export type PublicKey = GQLType & {
    /** The last time this authorization was used to perform an action. Values will be null for keys not owned by the user. */
    accessedAt?: DateTime
    /** Identifies the date and time when the key was created. Keys created before March 5th, 2014 have inaccurate values. Values will be null for keys not owned by the user. */
    createdAt?: DateTime
    /** The fingerprint for this PublicKey. */
    fingerprint: string
    id: ID
    /** Whether this PublicKey is read-only or not. Values will be null for keys not owned by the user. */
    isReadOnly?: boolean
    /** The public key string. */
    key: string
    /** Identifies the date and time when the key was updated. Keys created before March 5th, 2014 may have inaccurate values. Values will be null for keys not owned by the user. */
    updatedAt?: DateTime
}

/** A valid x509 certificate string */
export type X509Certificate = any

/** The possible states in which authentication can be configured with an identity provider. */
export type IdentityProviderConfigurationState = 'ENFORCED' | 'CONFIGURED' | 'UNCONFIGURED'

/** An ISO-8601 encoded date string. */
export type Date = any

/** Audit log entry for a members_can_delete_repos.disable event. */
export type MembersCanDeleteReposDisableAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a members_can_delete_repos.enable event. */
export type MembersCanDeleteReposEnableAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a oauth_application.create event. */
export type OauthApplicationCreateAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The application URL of the OAuth Application. */
    applicationUrl?: URI
    /** The callback URL of the OAuth Application. */
    callbackUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The name of the OAuth Application. */
    oauthApplicationName?: string
    /** The HTTP path for the OAuth Application */
    oauthApplicationResourcePath?: URI
    /** The HTTP URL for the OAuth Application */
    oauthApplicationUrl?: URI
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The rate limit of the OAuth Application. */
    rateLimit?: Int
    /** The state of the OAuth Application. */
    state?: OauthApplicationCreateAuditEntryState
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Metadata for an audit entry with action oauth_application.* */
export interface OauthApplicationAuditEntryData extends GQLType {
    /** The name of the OAuth Application. */
    oauthApplicationName?: string
    /** The HTTP path for the OAuth Application */
    oauthApplicationResourcePath?: URI
    /** The HTTP URL for the OAuth Application */
    oauthApplicationUrl?: URI
    /** Use `asOauthApplicationCreateAuditEntry` to access fields on the underlying concrete type. */
    asOauthApplicationCreateAuditEntry: OauthApplicationCreateAuditEntry
    /** Use `asOrgOauthAppAccessApprovedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessApprovedAuditEntry: OrgOauthAppAccessApprovedAuditEntry
    /** Use `asOrgOauthAppAccessDeniedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessDeniedAuditEntry: OrgOauthAppAccessDeniedAuditEntry
    /** Use `asOrgOauthAppAccessRequestedAuditEntry` to access fields on the underlying concrete type. */
    asOrgOauthAppAccessRequestedAuditEntry: OrgOauthAppAccessRequestedAuditEntry
}

/** The state of an OAuth Application when it was created. */
export type OauthApplicationCreateAuditEntryState = 'ACTIVE' | 'SUSPENDED' | 'PENDING_DELETION'

/** The state of an OAuth Application when its tokens were revoked. */
export type OauthApplicationRevokeTokensAuditEntryState =
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'PENDING_DELETION'

/** Audit log entry for a org.add_billing_manager */
export type OrgAddBillingManagerAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The email address used to invite a billing manager for the organization. */
    invitationEmail?: string
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.add_member */
export type OrgAddMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The permission level of the member added to the organization. */
    permission?: OrgAddMemberAuditEntryPermission
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** The permissions available to members on an Organization. */
export type OrgAddMemberAuditEntryPermission = 'READ' | 'ADMIN'

/** Audit log entry for a org.block_user */
export type OrgBlockUserAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The blocked user. */
    blockedUser?: User
    /** The username of the blocked user. */
    blockedUserName?: string
    /** The HTTP path for the blocked user. */
    blockedUserResourcePath?: URI
    /** The HTTP URL for the blocked user. */
    blockedUserUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.config.disable_collaborators_only event. */
export type OrgConfigDisableCollaboratorsOnlyAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.config.enable_collaborators_only event. */
export type OrgConfigEnableCollaboratorsOnlyAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.disable_oauth_app_restrictions event. */
export type OrgDisableOauthAppRestrictionsAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.disable_saml event. */
export type OrgDisableSamlAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The SAML provider's digest algorithm URL. */
    digestMethodUrl?: URI
    id: ID
    /** The SAML provider's issuer URL. */
    issuerUrl?: URI
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The SAML provider's signature algorithm URL. */
    signatureMethodUrl?: URI
    /** The SAML provider's single sign-on URL. */
    singleSignOnUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.disable_two_factor_requirement event. */
export type OrgDisableTwoFactorRequirementAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.enable_oauth_app_restrictions event. */
export type OrgEnableOauthAppRestrictionsAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.enable_saml event. */
export type OrgEnableSamlAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The SAML provider's digest algorithm URL. */
    digestMethodUrl?: URI
    id: ID
    /** The SAML provider's issuer URL. */
    issuerUrl?: URI
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The SAML provider's signature algorithm URL. */
    signatureMethodUrl?: URI
    /** The SAML provider's single sign-on URL. */
    singleSignOnUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.enable_two_factor_requirement event. */
export type OrgEnableTwoFactorRequirementAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.invite_member event. */
export type OrgInviteMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The email address of the organization invitation. */
    email?: string
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The organization invitation. */
    organizationInvitation?: OrganizationInvitation
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.invite_to_business event. */
export type OrgInviteToBusinessAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.oauth_app_access_approved event. */
export type OrgOauthAppAccessApprovedAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The name of the OAuth Application. */
    oauthApplicationName?: string
    /** The HTTP path for the OAuth Application */
    oauthApplicationResourcePath?: URI
    /** The HTTP URL for the OAuth Application */
    oauthApplicationUrl?: URI
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.oauth_app_access_denied event. */
export type OrgOauthAppAccessDeniedAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The name of the OAuth Application. */
    oauthApplicationName?: string
    /** The HTTP path for the OAuth Application */
    oauthApplicationResourcePath?: URI
    /** The HTTP URL for the OAuth Application */
    oauthApplicationUrl?: URI
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.oauth_app_access_requested event. */
export type OrgOauthAppAccessRequestedAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The name of the OAuth Application. */
    oauthApplicationName?: string
    /** The HTTP path for the OAuth Application */
    oauthApplicationResourcePath?: URI
    /** The HTTP URL for the OAuth Application */
    oauthApplicationUrl?: URI
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.remove_billing_manager event. */
export type OrgRemoveBillingManagerAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The reason for the billing manager being removed. */
    reason?: OrgRemoveBillingManagerAuditEntryReason
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** The reason a billing manager was removed from an Organization. */
export type OrgRemoveBillingManagerAuditEntryReason =
    | 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE'
    | 'SAML_EXTERNAL_IDENTITY_MISSING'
    | 'SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY'

/** Audit log entry for a org.remove_member event. */
export type OrgRemoveMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The types of membership the member has with the organization. */
    membershipTypes?: OrgRemoveMemberAuditEntryMembershipType[]
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The reason for the member being removed. */
    reason?: OrgRemoveMemberAuditEntryReason
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** The reason a member was removed from an Organization. */
export type OrgRemoveMemberAuditEntryReason =
    | 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE'
    | 'SAML_EXTERNAL_IDENTITY_MISSING'
    | 'SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY'

/** The type of membership a user has with an Organization. */
export type OrgRemoveMemberAuditEntryMembershipType =
    | 'DIRECT_MEMBER'
    | 'ADMIN'
    | 'BILLING_MANAGER'
    | 'UNAFFILIATED'
    | 'OUTSIDE_COLLABORATOR'

/** Audit log entry for a org.remove_outside_collaborator event. */
export type OrgRemoveOutsideCollaboratorAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The types of membership the outside collaborator has with the organization. */
    membershipTypes?: OrgRemoveOutsideCollaboratorAuditEntryMembershipType[]
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The reason for the outside collaborator being removed from the Organization. */
    reason?: OrgRemoveOutsideCollaboratorAuditEntryReason
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** The reason an outside collaborator was removed from an Organization. */
export type OrgRemoveOutsideCollaboratorAuditEntryReason =
    | 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE'
    | 'SAML_EXTERNAL_IDENTITY_MISSING'

/** The type of membership a user has with an Organization. */
export type OrgRemoveOutsideCollaboratorAuditEntryMembershipType =
    | 'OUTSIDE_COLLABORATOR'
    | 'UNAFFILIATED'
    | 'BILLING_MANAGER'

/** Audit log entry for a org.restore_member event. */
export type OrgRestoreMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The number of custom email routings for the restored member. */
    restoredCustomEmailRoutingsCount?: Int
    /** The number of issue assignemnts for the restored member. */
    restoredIssueAssignmentsCount?: Int
    /** Restored organization membership objects. */
    restoredMemberships?: OrgRestoreMemberAuditEntryMembership[]
    /** The number of restored memberships. */
    restoredMembershipsCount?: Int
    /** The number of repositories of the restored member. */
    restoredRepositoriesCount?: Int
    /** The number of starred repositories for the restored member. */
    restoredRepositoryStarsCount?: Int
    /** The number of watched repositories for the restored member. */
    restoredRepositoryWatchesCount?: Int
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Types of memberships that can be restored for an Organization member. */
export type OrgRestoreMemberAuditEntryMembership =
    | OrgRestoreMemberMembershipOrganizationAuditEntryData
    | OrgRestoreMemberMembershipRepositoryAuditEntryData
    | OrgRestoreMemberMembershipTeamAuditEntryData

/** Metadata for an organization membership for org.restore_member actions */
export type OrgRestoreMemberMembershipOrganizationAuditEntryData = GQLType & {
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
}

/** Metadata for a repository membership for org.restore_member actions */
export type OrgRestoreMemberMembershipRepositoryAuditEntryData = GQLType & {
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
}

/** Metadata for an audit entry with action repo.* */
export interface RepositoryAuditEntryData extends GQLType {
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** Use `asOrgRestoreMemberMembershipRepositoryAuditEntryData` to access fields on the underlying concrete type. */
    asOrgRestoreMemberMembershipRepositoryAuditEntryData: OrgRestoreMemberMembershipRepositoryAuditEntryData
    /** Use `asPrivateRepositoryForkingDisableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingDisableAuditEntry: PrivateRepositoryForkingDisableAuditEntry
    /** Use `asPrivateRepositoryForkingEnableAuditEntry` to access fields on the underlying concrete type. */
    asPrivateRepositoryForkingEnableAuditEntry: PrivateRepositoryForkingEnableAuditEntry
    /** Use `asRepoAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoAccessAuditEntry: RepoAccessAuditEntry
    /** Use `asRepoAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddMemberAuditEntry: RepoAddMemberAuditEntry
    /** Use `asRepoAddTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddTopicAuditEntry: RepoAddTopicAuditEntry
    /** Use `asRepoArchivedAuditEntry` to access fields on the underlying concrete type. */
    asRepoArchivedAuditEntry: RepoArchivedAuditEntry
    /** Use `asRepoChangeMergeSettingAuditEntry` to access fields on the underlying concrete type. */
    asRepoChangeMergeSettingAuditEntry: RepoChangeMergeSettingAuditEntry
    /** Use `asRepoConfigDisableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableAnonymousGitAccessAuditEntry: RepoConfigDisableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigDisableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableCollaboratorsOnlyAuditEntry: RepoConfigDisableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigDisableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableContributorsOnlyAuditEntry: RepoConfigDisableContributorsOnlyAuditEntry
    /** Use `asRepoConfigDisableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigDisableSockpuppetDisallowedAuditEntry: RepoConfigDisableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigEnableAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableAnonymousGitAccessAuditEntry: RepoConfigEnableAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigEnableCollaboratorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableCollaboratorsOnlyAuditEntry: RepoConfigEnableCollaboratorsOnlyAuditEntry
    /** Use `asRepoConfigEnableContributorsOnlyAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableContributorsOnlyAuditEntry: RepoConfigEnableContributorsOnlyAuditEntry
    /** Use `asRepoConfigEnableSockpuppetDisallowedAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigEnableSockpuppetDisallowedAuditEntry: RepoConfigEnableSockpuppetDisallowedAuditEntry
    /** Use `asRepoConfigLockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigLockAnonymousGitAccessAuditEntry: RepoConfigLockAnonymousGitAccessAuditEntry
    /** Use `asRepoConfigUnlockAnonymousGitAccessAuditEntry` to access fields on the underlying concrete type. */
    asRepoConfigUnlockAnonymousGitAccessAuditEntry: RepoConfigUnlockAnonymousGitAccessAuditEntry
    /** Use `asRepoCreateAuditEntry` to access fields on the underlying concrete type. */
    asRepoCreateAuditEntry: RepoCreateAuditEntry
    /** Use `asRepoDestroyAuditEntry` to access fields on the underlying concrete type. */
    asRepoDestroyAuditEntry: RepoDestroyAuditEntry
    /** Use `asRepoRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveMemberAuditEntry: RepoRemoveMemberAuditEntry
    /** Use `asRepoRemoveTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveTopicAuditEntry: RepoRemoveTopicAuditEntry
    /** Use `asTeamAddRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddRepositoryAuditEntry: TeamAddRepositoryAuditEntry
    /** Use `asTeamRemoveRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveRepositoryAuditEntry: TeamRemoveRepositoryAuditEntry
}

/** Metadata for a team membership for org.restore_member actions */
export type OrgRestoreMemberMembershipTeamAuditEntryData = GQLType & {
    /** The team associated with the action */
    team?: Team
    /** The name of the team */
    teamName?: string
    /** The HTTP path for this team */
    teamResourcePath?: URI
    /** The HTTP URL for this team */
    teamUrl?: URI
}

/** Metadata for an audit entry with action team.* */
export interface TeamAuditEntryData extends GQLType {
    /** The team associated with the action */
    team?: Team
    /** The name of the team */
    teamName?: string
    /** The HTTP path for this team */
    teamResourcePath?: URI
    /** The HTTP URL for this team */
    teamUrl?: URI
    /** Use `asOrgRestoreMemberMembershipTeamAuditEntryData` to access fields on the underlying concrete type. */
    asOrgRestoreMemberMembershipTeamAuditEntryData: OrgRestoreMemberMembershipTeamAuditEntryData
    /** Use `asTeamAddMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddMemberAuditEntry: TeamAddMemberAuditEntry
    /** Use `asTeamAddRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamAddRepositoryAuditEntry: TeamAddRepositoryAuditEntry
    /** Use `asTeamChangeParentTeamAuditEntry` to access fields on the underlying concrete type. */
    asTeamChangeParentTeamAuditEntry: TeamChangeParentTeamAuditEntry
    /** Use `asTeamRemoveMemberAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveMemberAuditEntry: TeamRemoveMemberAuditEntry
    /** Use `asTeamRemoveRepositoryAuditEntry` to access fields on the underlying concrete type. */
    asTeamRemoveRepositoryAuditEntry: TeamRemoveRepositoryAuditEntry
}

/** Audit log entry for a org.unblock_user */
export type OrgUnblockUserAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The user being unblocked by the organization. */
    blockedUser?: User
    /** The username of the blocked user. */
    blockedUserName?: string
    /** The HTTP path for the blocked user. */
    blockedUserResourcePath?: URI
    /** The HTTP URL for the blocked user. */
    blockedUserUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a org.update_default_repository_permission */
export type OrgUpdateDefaultRepositoryPermissionAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The new default repository permission level for the organization. */
    permission?: OrgUpdateDefaultRepositoryPermissionAuditEntryPermission
    /** The former default repository permission level for the organization. */
    permissionWas?: OrgUpdateDefaultRepositoryPermissionAuditEntryPermission
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** The default permission a repository can have in an Organization. */
export type OrgUpdateDefaultRepositoryPermissionAuditEntryPermission =
    | 'READ'
    | 'WRITE'
    | 'ADMIN'
    | 'NONE'

/** Audit log entry for a org.update_member event. */
export type OrgUpdateMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The new member permission level for the organization. */
    permission?: OrgUpdateMemberAuditEntryPermission
    /** The former member permission level for the organization. */
    permissionWas?: OrgUpdateMemberAuditEntryPermission
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** The permissions available to members on an Organization. */
export type OrgUpdateMemberAuditEntryPermission = 'READ' | 'ADMIN'

/** Audit log entry for a org.update_member_repository_creation_permission event. */
export type OrgUpdateMemberRepositoryCreationPermissionAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** Can members create repositories in the organization. */
    canCreateRepositories?: boolean
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** The permission for visibility level of repositories for this organization. */
    visibility?: OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility
}

/** The permissions available for repository creation on an Organization. */
export type OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility = 'ALL' | 'PUBLIC'

/** Audit log entry for a org.update_member_repository_invitation_permission event. */
export type OrgUpdateMemberRepositoryInvitationPermissionAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** Can outside collaborators be invited to repositories in the organization. */
    canInviteOutsideCollaboratorsToRepositories?: boolean
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a private_repository_forking.disable event. */
export type PrivateRepositoryForkingDisableAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a private_repository_forking.enable event. */
export type PrivateRepositoryForkingEnableAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.access event. */
export type RepoAccessAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** The visibility of the repository */
    visibility?: RepoAccessAuditEntryVisibility
}

/** The privacy of a repository */
export type RepoAccessAuditEntryVisibility = 'INTERNAL' | 'PRIVATE' | 'PUBLIC'

/** Audit log entry for a repo.add_member event. */
export type RepoAddMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** The visibility of the repository */
    visibility?: RepoAddMemberAuditEntryVisibility
}

/** The privacy of a repository */
export type RepoAddMemberAuditEntryVisibility = 'INTERNAL' | 'PRIVATE' | 'PUBLIC'

/** Audit log entry for a repo.add_topic event. */
export type RepoAddTopicAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The name of the topic added to the repository */
    topic?: Topic
    /** The name of the topic added to the repository */
    topicName?: string
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Metadata for an audit entry with a topic. */
export interface TopicAuditEntryData extends GQLType {
    /** The name of the topic added to the repository */
    topic?: Topic
    /** The name of the topic added to the repository */
    topicName?: string
    /** Use `asRepoAddTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoAddTopicAuditEntry: RepoAddTopicAuditEntry
    /** Use `asRepoRemoveTopicAuditEntry` to access fields on the underlying concrete type. */
    asRepoRemoveTopicAuditEntry: RepoRemoveTopicAuditEntry
}

/** Audit log entry for a repo.archived event. */
export type RepoArchivedAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** The visibility of the repository */
    visibility?: RepoArchivedAuditEntryVisibility
}

/** The privacy of a repository */
export type RepoArchivedAuditEntryVisibility = 'INTERNAL' | 'PRIVATE' | 'PUBLIC'

/** Audit log entry for a repo.change_merge_setting event. */
export type RepoChangeMergeSettingAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** Whether the change was to enable (true) or disable (false) the merge type */
    isEnabled?: boolean
    /** The merge method affected by the change */
    mergeType?: RepoChangeMergeSettingAuditEntryMergeType
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** The merge options available for pull requests to this repository. */
export type RepoChangeMergeSettingAuditEntryMergeType = 'MERGE' | 'REBASE' | 'SQUASH'

/** Audit log entry for a repo.config.disable_anonymous_git_access event. */
export type RepoConfigDisableAnonymousGitAccessAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.disable_collaborators_only event. */
export type RepoConfigDisableCollaboratorsOnlyAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.disable_contributors_only event. */
export type RepoConfigDisableContributorsOnlyAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.disable_sockpuppet_disallowed event. */
export type RepoConfigDisableSockpuppetDisallowedAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.enable_anonymous_git_access event. */
export type RepoConfigEnableAnonymousGitAccessAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.enable_collaborators_only event. */
export type RepoConfigEnableCollaboratorsOnlyAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.enable_contributors_only event. */
export type RepoConfigEnableContributorsOnlyAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.enable_sockpuppet_disallowed event. */
export type RepoConfigEnableSockpuppetDisallowedAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.lock_anonymous_git_access event. */
export type RepoConfigLockAnonymousGitAccessAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.config.unlock_anonymous_git_access event. */
export type RepoConfigUnlockAnonymousGitAccessAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repo.create event. */
export type RepoCreateAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The name of the parent repository for this forked repository. */
    forkParentName?: string
    /** The name of the root repository for this netork. */
    forkSourceName?: string
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** The visibility of the repository */
    visibility?: RepoCreateAuditEntryVisibility
}

/** The privacy of a repository */
export type RepoCreateAuditEntryVisibility = 'INTERNAL' | 'PRIVATE' | 'PUBLIC'

/** Audit log entry for a repo.destroy event. */
export type RepoDestroyAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** The visibility of the repository */
    visibility?: RepoDestroyAuditEntryVisibility
}

/** The privacy of a repository */
export type RepoDestroyAuditEntryVisibility = 'INTERNAL' | 'PRIVATE' | 'PUBLIC'

/** Audit log entry for a repo.remove_member event. */
export type RepoRemoveMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
    /** The visibility of the repository */
    visibility?: RepoRemoveMemberAuditEntryVisibility
}

/** The privacy of a repository */
export type RepoRemoveMemberAuditEntryVisibility = 'INTERNAL' | 'PRIVATE' | 'PUBLIC'

/** Audit log entry for a repo.remove_topic event. */
export type RepoRemoveTopicAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The name of the topic added to the repository */
    topic?: Topic
    /** The name of the topic added to the repository */
    topicName?: string
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repository_visibility_change.disable event. */
export type RepositoryVisibilityChangeDisableAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a repository_visibility_change.enable event. */
export type RepositoryVisibilityChangeEnableAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    /** The HTTP path for this enterprise. */
    enterpriseResourcePath?: URI
    /** The slug of the enterprise. */
    enterpriseSlug?: string
    /** The HTTP URL for this enterprise. */
    enterpriseUrl?: URI
    id: ID
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a team.add_member event. */
export type TeamAddMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** Whether the team was mapped to an LDAP Group. */
    isLdapMapped?: boolean
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The team associated with the action */
    team?: Team
    /** The name of the team */
    teamName?: string
    /** The HTTP path for this team */
    teamResourcePath?: URI
    /** The HTTP URL for this team */
    teamUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a team.add_repository event. */
export type TeamAddRepositoryAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** Whether the team was mapped to an LDAP Group. */
    isLdapMapped?: boolean
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The team associated with the action */
    team?: Team
    /** The name of the team */
    teamName?: string
    /** The HTTP path for this team */
    teamResourcePath?: URI
    /** The HTTP URL for this team */
    teamUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a team.change_parent_team event. */
export type TeamChangeParentTeamAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** Whether the team was mapped to an LDAP Group. */
    isLdapMapped?: boolean
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The new parent team. */
    parentTeam?: Team
    /** The name of the new parent team */
    parentTeamName?: string
    /** The name of the former parent team */
    parentTeamNameWas?: string
    /** The HTTP path for the parent team */
    parentTeamResourcePath?: URI
    /** The HTTP URL for the parent team */
    parentTeamUrl?: URI
    /** The former parent team. */
    parentTeamWas?: Team
    /** The HTTP path for the previous parent team */
    parentTeamWasResourcePath?: URI
    /** The HTTP URL for the previous parent team */
    parentTeamWasUrl?: URI
    /** The team associated with the action */
    team?: Team
    /** The name of the team */
    teamName?: string
    /** The HTTP path for this team */
    teamResourcePath?: URI
    /** The HTTP URL for this team */
    teamUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a team.remove_member event. */
export type TeamRemoveMemberAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** Whether the team was mapped to an LDAP Group. */
    isLdapMapped?: boolean
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The team associated with the action */
    team?: Team
    /** The name of the team */
    teamName?: string
    /** The HTTP path for this team */
    teamResourcePath?: URI
    /** The HTTP URL for this team */
    teamUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Audit log entry for a team.remove_repository event. */
export type TeamRemoveRepositoryAuditEntry = GQLType & {
    /** The action name */
    action: string
    /** The user who initiated the action */
    actor?: AuditEntryActor
    /** The IP address of the actor */
    actorIp?: string
    /** A readable representation of the actor's location */
    actorLocation?: ActorLocation
    /** The username of the user who initiated the action */
    actorLogin?: string
    /** The HTTP path for the actor. */
    actorResourcePath?: URI
    /** The HTTP URL for the actor. */
    actorUrl?: URI
    /** The time the action was initiated */
    createdAt: PreciseDateTime
    id: ID
    /** Whether the team was mapped to an LDAP Group. */
    isLdapMapped?: boolean
    /** The Organization associated with the Audit Entry. */
    organization?: Organization
    /** The name of the Organization. */
    organizationName?: string
    /** The HTTP path for the organization */
    organizationResourcePath?: URI
    /** The HTTP URL for the organization */
    organizationUrl?: URI
    /** The repository associated with the action */
    repository?: Repository
    /** The name of the repository */
    repositoryName?: string
    /** The HTTP path for the repository */
    repositoryResourcePath?: URI
    /** The HTTP URL for the repository */
    repositoryUrl?: URI
    /** The team associated with the action */
    team?: Team
    /** The name of the team */
    teamName?: string
    /** The HTTP path for this team */
    teamResourcePath?: URI
    /** The HTTP URL for this team */
    teamUrl?: URI
    /** The user affected by the action */
    user?: User
    /** For actions involving two users, the actor is the initiator and the user is the affected user. */
    userLogin?: string
    /** The HTTP path for the user. */
    userResourcePath?: URI
    /** The HTTP URL for the user. */
    userUrl?: URI
}

/** Ordering options for Audit Log connections. */
export type AuditLogOrder = {
    /** The field to order Audit Logs by. */
    field?: AuditLogOrderField
    /** The ordering direction. */
    direction?: OrderDirection
}

/** Properties by which Audit Log connections can be ordered. */
export type AuditLogOrderField = 'CREATED_AT'

/** An Identity Provider configured to provision SAML and SCIM identities for Organizations */
export type OrganizationIdentityProvider = GQLType & {
    /** The digest algorithm used to sign SAML requests for the Identity Provider. */
    digestMethod?: URI
    /** External Identities provisioned by this Identity Provider */
    externalIdentities(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ExternalIdentityConnection
    id: ID
    /** The x509 certificate used by the Identity Provder to sign assertions and responses. */
    idpCertificate?: X509Certificate
    /** The Issuer Entity ID for the SAML Identity Provider */
    issuer?: string
    /** Organization this Identity Provider belongs to */
    organization?: Organization
    /** The signature algorithm used to sign SAML requests for the Identity Provider. */
    signatureMethod?: URI
    /** The URL endpoint for the Identity Provider's SAML SSO. */
    ssoUrl?: URI
}

/** The connection type for User. */
export type OrganizationMemberConnection = GQLType & {
    /** A list of edges. */
    edges?: OrganizationMemberEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a user within an organization. */
export type OrganizationMemberEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** Whether the organization member has two factor enabled or not. Returns null if information is not available to viewer. */
    hasTwoFactorEnabled?: boolean
    /** The item at the end of the edge. */
    node?: User
    /** The role this user has in the organization. */
    role?: OrganizationMemberRole
}

/** The possible roles within an organization for its members. */
export type OrganizationMemberRole = 'MEMBER' | 'ADMIN'

/** The role of a user on a team. */
export type TeamRole = 'ADMIN' | 'MEMBER'

/** The privacy of a Gist */
export type GistPrivacy = 'PUBLIC' | 'SECRET' | 'ALL'

/** Represents a pending collaborator on a repository. */
export type PendingCollaboratorEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: User
}

/** An edge in a connection. */
export type RepositoryInvitationEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: RepositoryInvitation
}

/** An invitation for a user to be added to a repository. */
export type RepositoryInvitation = GQLType & {
    id: ID
    /** The user who received the invitation. */
    invitee: User
    /** The user who created the invitation. */
    inviter: User
    /** The permission granted on this repository by this invitation. */
    permission: RepositoryPermission
    /** The Repository the user is invited to. */
    repository?: RepositoryInfo
}

/** A placeholder user for attribution of imported data on GitHub. */
export type Mannequin = GQLType & {
    /** A URL pointing to the GitHub App's public avatar. */
    avatarUrl(args?: { size?: Int }): URI
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** The username of the actor. */
    login: string
    /** The HTML path to this resource. */
    resourcePath: URI
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The URL to this resource. */
    url: URI
}

/** A list of languages associated with the parent. */
export type LanguageConnection = GQLType & {
    /** A list of edges. */
    edges?: LanguageEdge[]
    /** A list of nodes. */
    nodes?: Language[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
    /** The total size in bytes of files written in that language. */
    totalSize: Int
}

/** Represents the language of a repository. */
export type LanguageEdge = GQLType & {
    cursor: string
    node: Language
    /** The number of bytes of code written in the language. */
    size: Int
}

/** Represents a Milestone object on a given repository. */
export type Milestone = GQLType & {
    /** `true` if the object is closed (definition of closed may depend on type) */
    closed: boolean
    /** Identifies the date and time when the object was closed. */
    closedAt?: DateTime
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the actor who created the milestone. */
    creator?: Actor
    /** Identifies the description of the milestone. */
    description?: string
    /** Identifies the due date of the milestone. */
    dueOn?: DateTime
    id: ID
    /** Just for debugging on review-lab */
    issuePrioritiesDebug: string
    /** A list of issues associated with the milestone. */
    issues(args?: {
        orderBy?: IssueOrder
        labels?: string[]
        states?: IssueState[]
        filterBy?: IssueFilters
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): IssueConnection
    /** Identifies the number of the milestone. */
    number: Int
    /** A list of pull requests associated with the milestone. */
    pullRequests(args?: {
        states?: PullRequestState[]
        labels?: string[]
        headRefName?: string
        baseRefName?: string
        orderBy?: IssueOrder
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestConnection
    /** The repository associated with this milestone. */
    repository: Repository
    /** The HTTP path for this milestone */
    resourcePath: URI
    /** Identifies the state of the milestone. */
    state: MilestoneState
    /** Identifies the title of the milestone. */
    title: string
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL for this milestone */
    url: URI
}

/** The possible states of a milestone. */
export type MilestoneState = 'OPEN' | 'CLOSED'

/** The connection type for PullRequestChangedFile. */
export type PullRequestChangedFileConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestChangedFileEdge[]
    /** A list of nodes. */
    nodes?: PullRequestChangedFile[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PullRequestChangedFileEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequestChangedFile
}

/** A file changed in a pull request. */
export type PullRequestChangedFile = GQLType & {
    /** The number of additions to the file. */
    additions: Int
    /** The number of deletions to the file. */
    deletions: Int
    /** The path of the file. */
    path: string
}

/** Whether or not a PullRequest can be merged. */
export type MergeableState = 'MERGEABLE' | 'CONFLICTING' | 'UNKNOWN'

/** A review comment associated with a given repository pull request. */
export type PullRequestReviewComment = GQLType & {
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the subject of the comment. */
    authorAssociation: CommentAuthorAssociation
    /** The comment body of this review comment. */
    body: string
    /** The comment body of this review comment rendered to HTML. */
    bodyHTML: HTML
    /** The comment body of this review comment rendered as plain text. */
    bodyText: string
    /** Identifies the commit associated with the comment. */
    commit: Commit
    /** Identifies when the comment was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The diff hunk to which the comment applies. */
    diffHunk: string
    /** Identifies when the comment was created in a draft state. */
    draftedAt: DateTime
    /** The actor who edited the comment. */
    editor?: Actor
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** Returns whether or not a comment has been minimized. */
    isMinimized: boolean
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** Returns why the comment was minimized. */
    minimizedReason?: string
    /** Identifies the original commit associated with the comment. */
    originalCommit?: Commit
    /** The original line index in the diff to which the comment applies. */
    originalPosition: Int
    /** Identifies when the comment body is outdated */
    outdated: boolean
    /** The path to which the comment applies. */
    path: string
    /** The line index in the diff to which the comment applies. */
    position?: Int
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** The pull request associated with this review comment. */
    pullRequest: PullRequest
    /** The pull request review associated with this review comment. */
    pullRequestReview?: PullRequestReview
    /** A list of reactions grouped by content left on the subject. */
    reactionGroups?: ReactionGroup[]
    /** A list of Reactions left on the Issue. */
    reactions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        content?: ReactionContent
        orderBy?: ReactionOrder
    }): ReactionConnection
    /** The comment this is a reply to. */
    replyTo?: PullRequestReviewComment
    /** The repository associated with this node. */
    repository: Repository
    /** The HTTP path permalink for this review comment. */
    resourcePath: URI
    /** Identifies the state of the comment. */
    state: PullRequestReviewCommentState
    /** Identifies when the comment was last updated. */
    updatedAt: DateTime
    /** The HTTP URL permalink for this review comment. */
    url: URI
    /** A list of edits to this content. */
    userContentEdits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserContentEditConnection | undefined
    /** Check if the current viewer can delete this object. */
    viewerCanDelete: boolean
    /** Check if the current viewer can minimize this object. */
    viewerCanMinimize: boolean
    /** Can user react to this subject */
    viewerCanReact: boolean
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
}

/** A review object for a given pull request. */
export type PullRequestReview = GQLType & {
    /** The actor who authored the comment. */
    author?: Actor
    /** Author's association with the subject of the comment. */
    authorAssociation: CommentAuthorAssociation
    /** Identifies the pull request review body. */
    body: string
    /** The body of this review rendered to HTML. */
    bodyHTML: HTML
    /** The body of this review rendered as plain text. */
    bodyText: string
    /** A list of review comments for the current pull request review. */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestReviewCommentConnection
    /** Identifies the commit associated with this pull request review. */
    commit?: Commit
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Check if this comment was created via an email reply. */
    createdViaEmail: boolean
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The actor who edited the comment. */
    editor?: Actor
    id: ID
    /** Check if this comment was edited and includes an edit with the creation data */
    includesCreatedEdit: boolean
    /** The moment the editor made the last edit */
    lastEditedAt?: DateTime
    /** A list of teams that this review was made on behalf of. */
    onBehalfOf(args?: { after?: string; before?: string; first?: Int; last?: Int }): TeamConnection
    /** Identifies when the comment was published at. */
    publishedAt?: DateTime
    /** Identifies the pull request associated with this pull request review. */
    pullRequest: PullRequest
    /** A list of reactions grouped by content left on the subject. */
    reactionGroups?: ReactionGroup[]
    /** A list of Reactions left on the Issue. */
    reactions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        content?: ReactionContent
        orderBy?: ReactionOrder
    }): ReactionConnection
    /** The repository associated with this node. */
    repository: Repository
    /** The HTTP path permalink for this PullRequestReview. */
    resourcePath: URI
    /** Identifies the current state of the pull request review. */
    state: PullRequestReviewState
    /** Identifies when the Pull Request Review was submitted */
    submittedAt?: DateTime
    /** Identifies the date and time when the object was last updated. */
    updatedAt: DateTime
    /** The HTTP URL permalink for this PullRequestReview. */
    url: URI
    /** A list of edits to this content. */
    userContentEdits(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): UserContentEditConnection | undefined
    /** Check if the current viewer can delete this object. */
    viewerCanDelete: boolean
    /** Can user react to this subject */
    viewerCanReact: boolean
    /** Check if the current viewer can update this object. */
    viewerCanUpdate: boolean
    /** Reasons why the current viewer can not update this comment. */
    viewerCannotUpdateReasons: CommentCannotUpdateReason[]
    /** Did the viewer author this comment. */
    viewerDidAuthor: boolean
}

/** The possible states of a pull request review. */
export type PullRequestReviewState =
    | 'PENDING'
    | 'COMMENTED'
    | 'APPROVED'
    | 'CHANGES_REQUESTED'
    | 'DISMISSED'

/** The connection type for PullRequestReviewComment. */
export type PullRequestReviewCommentConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestReviewCommentEdge[]
    /** A list of nodes. */
    nodes?: PullRequestReviewComment[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PullRequestReviewCommentEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequestReviewComment
}

/** A threaded list of comments for a given pull request. */
export type PullRequestReviewThread = GQLType & {
    /** A list of pull request comments associated with the thread. */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PullRequestReviewCommentConnection
    id: ID
    /** Whether this thread has been resolved */
    isResolved: boolean
    /** Identifies the pull request associated with this thread. */
    pullRequest: PullRequest
    /** Identifies the repository associated with this thread. */
    repository: Repository
    /** The user who resolved this thread */
    resolvedBy?: User
    /** Whether or not the viewer can resolve this thread */
    viewerCanResolve: boolean
    /** Whether or not the viewer can unresolve this thread */
    viewerCanUnresolve: boolean
}

/** Represents a Git commit part of a pull request. */
export type PullRequestCommit = GQLType & {
    /** The Git commit object */
    commit: Commit
    id: ID
    /** The pull request this commit belongs to */
    pullRequest: PullRequest
    /** The HTTP path for this pull request commit */
    resourcePath: URI
    /** The HTTP URL for this pull request commit */
    url: URI
}

/** Review comment threads for a pull request review. */
export type PullRequestReviewThreadConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestReviewThreadEdge[]
    /** A list of nodes. */
    nodes?: PullRequestReviewThread[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PullRequestReviewThreadEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequestReviewThread
}

/** The possible states of a pull request review comment. */
export type PullRequestReviewCommentState = 'PENDING' | 'SUBMITTED'

/** The possible PubSub channels for a pull request. */
export type PullRequestPubSubTopic = 'UPDATED' | 'MARKASREAD' | 'HEAD_REF' | 'TIMELINE' | 'STATE'

/** The connection type for IssueComment. */
export type IssueCommentConnection = GQLType & {
    /** A list of edges. */
    edges?: IssueCommentEdge[]
    /** A list of nodes. */
    nodes?: IssueComment[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type IssueCommentEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: IssueComment
}

/** The connection type for PullRequestReview. */
export type PullRequestReviewConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestReviewEdge[]
    /** A list of nodes. */
    nodes?: PullRequestReview[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PullRequestReviewEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequestReview
}

/** The connection type for PullRequestCommit. */
export type PullRequestCommitConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestCommitEdge[]
    /** A list of nodes. */
    nodes?: PullRequestCommit[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PullRequestCommitEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequestCommit
}

/** The connection type for ReviewRequest. */
export type ReviewRequestConnection = GQLType & {
    /** A list of edges. */
    edges?: ReviewRequestEdge[]
    /** A list of nodes. */
    nodes?: ReviewRequest[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ReviewRequestEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: ReviewRequest
}

/** A request for a user to review a pull request. */
export type ReviewRequest = GQLType & {
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** Identifies the pull request associated with this review request. */
    pullRequest: PullRequest
    /** The reviewer that is requested. */
    requestedReviewer?: RequestedReviewer
}

/** Types that can be requested reviewers. */
export type RequestedReviewer = User | Team | Mannequin

/** The connection type for PullRequestTimelineItem. */
export type PullRequestTimelineConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestTimelineItemEdge[]
    /** A list of nodes. */
    nodes?: PullRequestTimelineItem[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PullRequestTimelineItemEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequestTimelineItem
}

/** An item in an pull request timeline */
export type PullRequestTimelineItem =
    | Commit
    | CommitCommentThread
    | PullRequestReview
    | PullRequestReviewThread
    | PullRequestReviewComment
    | IssueComment
    | ClosedEvent
    | ReopenedEvent
    | SubscribedEvent
    | UnsubscribedEvent
    | MergedEvent
    | ReferencedEvent
    | CrossReferencedEvent
    | AssignedEvent
    | UnassignedEvent
    | LabeledEvent
    | UnlabeledEvent
    | MilestonedEvent
    | DemilestonedEvent
    | RenamedTitleEvent
    | LockedEvent
    | UnlockedEvent
    | DeployedEvent
    | DeploymentEnvironmentChangedEvent
    | HeadRefDeletedEvent
    | HeadRefRestoredEvent
    | HeadRefForcePushedEvent
    | BaseRefForcePushedEvent
    | ReviewRequestedEvent
    | ReviewRequestRemovedEvent
    | ReviewDismissedEvent
    | UserBlockedEvent

/** A thread of comments on a commit. */
export type CommitCommentThread = GQLType & {
    /** The comments that exist in this thread. */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): CommitCommentConnection
    /** The commit the comments were made on. */
    commit: Commit
    id: ID
    /** The file the comments were made on. */
    path?: string
    /** The position in the diff for the commit that the comment was made on. */
    position?: Int
    /** The repository associated with this node. */
    repository: Repository
}

/** Used for return value of Repository.issueOrPullRequest. */
export type IssueOrPullRequest = Issue | PullRequest

/** Represents a 'closed' event on any `Closable`. */
export type ClosedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Object that was closed. */
    closable: Closable
    /** Object which triggered the creation of this event. */
    closer?: Closer
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** The HTTP path for this closed event. */
    resourcePath: URI
    /** The HTTP URL for this closed event. */
    url: URI
}

/** The object which triggered a `ClosedEvent`. */
export type Closer = Commit | PullRequest

/** Represents a 'reopened' event on any `Closable`. */
export type ReopenedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Object that was reopened. */
    closable: Closable
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
}

/** Represents a 'subscribed' event on a given `Subscribable`. */
export type SubscribedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Object referenced by event. */
    subscribable: Subscribable
}

/** Represents an 'unsubscribed' event on a given `Subscribable`. */
export type UnsubscribedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Object referenced by event. */
    subscribable: Subscribable
}

/** Represents a 'merged' event on a given pull request. */
export type MergedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the commit associated with the `merge` event. */
    commit?: Commit
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the Ref associated with the `merge` event. */
    mergeRef?: Ref
    /** Identifies the name of the Ref associated with the `merge` event. */
    mergeRefName: string
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** The HTTP path for this merged event. */
    resourcePath: URI
    /** The HTTP URL for this merged event. */
    url: URI
}

/** Represents a 'referenced' event on a given `ReferencedSubject`. */
export type ReferencedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the commit associated with the 'referenced' event. */
    commit?: Commit
    /** Identifies the repository associated with the 'referenced' event. */
    commitRepository: Repository
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Reference originated in a different repository. */
    isCrossRepository: boolean
    /** Checks if the commit message itself references the subject. Can be false in the case of a commit comment reference. */
    isDirectReference: boolean
    /** Object referenced by event. */
    subject: ReferencedSubject
}

/** Any referencable object */
export type ReferencedSubject = Issue | PullRequest

/** Represents a mention made by one issue or pull request to another. */
export type CrossReferencedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Reference originated in a different repository. */
    isCrossRepository: boolean
    /** Identifies when the reference was made. */
    referencedAt: DateTime
    /** The HTTP path for this pull request. */
    resourcePath: URI
    /** Issue or pull request that made the reference. */
    source: ReferencedSubject
    /** Issue or pull request to which the reference was made. */
    target: ReferencedSubject
    /** The HTTP URL for this pull request. */
    url: URI
    /** Checks if the target will be closed when the source is merged. */
    willCloseTarget: boolean
}

/** Represents an 'assigned' event on any assignable object. */
export type AssignedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the assignable associated with the event. */
    assignable: Assignable
    /** Identifies the user or mannequin that was assigned. */
    assignee?: Assignee
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the user who was assigned. */
    /** @deprecated Assignees can now be mannequins. Use the `assignee` field instead. Removal on 2020-01-01 UTC. */
    user?: User
}

/** Types that can be assigned to issues. */
export type Assignee = Bot | Mannequin | Organization | User

/** Represents an 'unassigned' event on any assignable object. */
export type UnassignedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the assignable associated with the event. */
    assignable: Assignable
    /** Identifies the user or mannequin that was unassigned. */
    assignee?: Assignee
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the subject (user) who was unassigned. */
    /** @deprecated Assignees can now be mannequins. Use the `assignee` field instead. Removal on 2020-01-01 UTC. */
    user?: User
}

/** Represents a 'labeled' event on a given issue or pull request. */
export type LabeledEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the label associated with the 'labeled' event. */
    label: Label
    /** Identifies the `Labelable` associated with the event. */
    labelable: Labelable
}

/** Represents an 'unlabeled' event on a given issue or pull request. */
export type UnlabeledEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the label associated with the 'unlabeled' event. */
    label: Label
    /** Identifies the `Labelable` associated with the event. */
    labelable: Labelable
}

/** Represents a 'milestoned' event on a given issue or pull request. */
export type MilestonedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the milestone title associated with the 'milestoned' event. */
    milestoneTitle: string
    /** Object referenced by event. */
    subject: MilestoneItem
}

/** Types that can be inside a Milestone. */
export type MilestoneItem = Issue | PullRequest

/** Represents a 'demilestoned' event on a given issue or pull request. */
export type DemilestonedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the milestone title associated with the 'demilestoned' event. */
    milestoneTitle: string
    /** Object referenced by event. */
    subject: MilestoneItem
}

/** Represents a 'renamed' event on a given issue or pull request */
export type RenamedTitleEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the current title of the issue or pull request. */
    currentTitle: string
    id: ID
    /** Identifies the previous title of the issue or pull request. */
    previousTitle: string
    /** Subject that was renamed. */
    subject: RenamedTitleSubject
}

/** An object which has a renamable title */
export type RenamedTitleSubject = Issue | PullRequest

/** Represents a 'locked' event on a given issue or pull request. */
export type LockedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Reason that the conversation was locked (optional). */
    lockReason?: LockReason
    /** Object that was locked. */
    lockable: Lockable
}

/** Represents an 'unlocked' event on a given issue or pull request. */
export type UnlockedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Object that was unlocked. */
    lockable: Lockable
}

/** Represents a 'deployed' event on a given pull request. */
export type DeployedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** The deployment associated with the 'deployed' event. */
    deployment: Deployment
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** The ref associated with the 'deployed' event. */
    ref?: Ref
}

/** Represents a 'deployment_environment_changed' event on a given pull request. */
export type DeploymentEnvironmentChangedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The deployment status that updated the deployment environment. */
    deploymentStatus: DeploymentStatus
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
}

/** Represents a 'head_ref_deleted' event on a given pull request. */
export type HeadRefDeletedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the Ref associated with the `head_ref_deleted` event. */
    headRef?: Ref
    /** Identifies the name of the Ref associated with the `head_ref_deleted` event. */
    headRefName: string
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
}

/** Represents a 'head_ref_restored' event on a given pull request. */
export type HeadRefRestoredEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
}

/** Represents a 'head_ref_force_pushed' event on a given pull request. */
export type HeadRefForcePushedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the after commit SHA for the 'head_ref_force_pushed' event. */
    afterCommit?: Commit
    /** Identifies the before commit SHA for the 'head_ref_force_pushed' event. */
    beforeCommit?: Commit
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** Identifies the fully qualified ref name for the 'head_ref_force_pushed' event. */
    ref?: Ref
}

/** Represents a 'base_ref_force_pushed' event on a given pull request. */
export type BaseRefForcePushedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the after commit SHA for the 'base_ref_force_pushed' event. */
    afterCommit?: Commit
    /** Identifies the before commit SHA for the 'base_ref_force_pushed' event. */
    beforeCommit?: Commit
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** Identifies the fully qualified ref name for the 'base_ref_force_pushed' event. */
    ref?: Ref
}

/** Represents an 'review_requested' event on a given pull request. */
export type ReviewRequestedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** Identifies the reviewer whose review was requested. */
    requestedReviewer?: RequestedReviewer
}

/** Represents an 'review_request_removed' event on a given pull request. */
export type ReviewRequestRemovedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** Identifies the reviewer whose review request was removed. */
    requestedReviewer?: RequestedReviewer
}

/** Represents a 'review_dismissed' event on a given issue or pull request. */
export type ReviewDismissedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** Identifies the optional message associated with the 'review_dismissed' event. */
    dismissalMessage?: string
    /** Identifies the optional message associated with the event, rendered to HTML. */
    dismissalMessageHTML?: string
    id: ID
    /** Identifies the previous state of the review with the 'review_dismissed' event. */
    previousReviewState: PullRequestReviewState
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** Identifies the commit which caused the review to become stale. */
    pullRequestCommit?: PullRequestCommit
    /** The HTTP path for this review dismissed event. */
    resourcePath: URI
    /** Identifies the review associated with the 'review_dismissed' event. */
    review?: PullRequestReview
    /** The HTTP URL for this review dismissed event. */
    url: URI
}

/** Represents a 'user_blocked' event on a given user. */
export type UserBlockedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Number of days that the user was blocked for. */
    blockDuration: UserBlockDuration
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** The user who was blocked. */
    subject?: User
}

/** The possible durations that a user can be blocked for. */
export type UserBlockDuration = 'ONE_DAY' | 'THREE_DAYS' | 'ONE_WEEK' | 'ONE_MONTH' | 'PERMANENT'

/** The connection type for PullRequestTimelineItems. */
export type PullRequestTimelineItemsConnection = GQLType & {
    /** A list of edges. */
    edges?: PullRequestTimelineItemsEdge[]
    /** Identifies the count of items after applying `before` and `after` filters. */
    filteredCount: Int
    /** A list of nodes. */
    nodes?: PullRequestTimelineItems[]
    /** Identifies the count of items after applying `before`/`after` filters and `first`/`last`/`skip` slicing. */
    pageCount: Int
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
    /** Identifies the date and time when the timeline was last updated. */
    updatedAt: DateTime
}

/** An edge in a connection. */
export type PullRequestTimelineItemsEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PullRequestTimelineItems
}

/** An item in a pull request timeline */
export type PullRequestTimelineItems =
    | PullRequestCommit
    | PullRequestCommitCommentThread
    | PullRequestReview
    | PullRequestReviewThread
    | PullRequestRevisionMarker
    | BaseRefChangedEvent
    | BaseRefForcePushedEvent
    | DeployedEvent
    | DeploymentEnvironmentChangedEvent
    | HeadRefDeletedEvent
    | HeadRefForcePushedEvent
    | HeadRefRestoredEvent
    | MergedEvent
    | ReviewDismissedEvent
    | ReviewRequestedEvent
    | ReviewRequestRemovedEvent
    | ReadyForReviewEvent
    | IssueComment
    | CrossReferencedEvent
    | AddedToProjectEvent
    | AssignedEvent
    | ClosedEvent
    | CommentDeletedEvent
    | ConvertedNoteToIssueEvent
    | DemilestonedEvent
    | LabeledEvent
    | LockedEvent
    | MarkedAsDuplicateEvent
    | MentionedEvent
    | MilestonedEvent
    | MovedColumnsInProjectEvent
    | PinnedEvent
    | ReferencedEvent
    | RemovedFromProjectEvent
    | RenamedTitleEvent
    | ReopenedEvent
    | SubscribedEvent
    | TransferredEvent
    | UnassignedEvent
    | UnlabeledEvent
    | UnlockedEvent
    | UserBlockedEvent
    | UnpinnedEvent
    | UnsubscribedEvent

/** Represents a commit comment thread part of a pull request. */
export type PullRequestCommitCommentThread = GQLType & {
    /** The comments that exist in this thread. */
    comments(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): CommitCommentConnection
    /** The commit the comments were made on. */
    commit: Commit
    id: ID
    /** The file the comments were made on. */
    path?: string
    /** The position in the diff for the commit that the comment was made on. */
    position?: Int
    /** The pull request this commit comment thread belongs to */
    pullRequest: PullRequest
    /** The repository associated with this node. */
    repository: Repository
}

/** Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits. */
export type PullRequestRevisionMarker = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The last commit the viewer has seen. */
    lastSeenCommit: Commit
    /** The pull request to which the marker belongs. */
    pullRequest: PullRequest
}

/** Represents a 'base_ref_changed' event on a given issue or pull request. */
export type BaseRefChangedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
}

/** Represents a 'ready_for_review' event on a given pull request. */
export type ReadyForReviewEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** PullRequest referenced by event. */
    pullRequest: PullRequest
    /** The HTTP path for this ready for review event. */
    resourcePath: URI
    /** The HTTP URL for this ready for review event. */
    url: URI
}

/** Represents a 'added_to_project' event on a given issue or pull request. */
export type AddedToProjectEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
}

/** Represents a 'comment_deleted' event on a given issue or pull request. */
export type CommentDeletedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
}

/** Represents a 'converted_note_to_issue' event on a given issue or pull request. */
export type ConvertedNoteToIssueEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
}

/** Represents a 'marked_as_duplicate' event on a given issue or pull request. */
export type MarkedAsDuplicateEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
}

/** Represents a 'mentioned' event on a given issue or pull request. */
export type MentionedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
}

/** Represents a 'moved_columns_in_project' event on a given issue or pull request. */
export type MovedColumnsInProjectEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
}

/** Represents a 'pinned' event on a given issue or pull request. */
export type PinnedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the issue associated with the event. */
    issue: Issue
}

/** Represents a 'removed_from_project' event on a given issue or pull request. */
export type RemovedFromProjectEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
}

/** Represents a 'transferred' event on a given issue or pull request. */
export type TransferredEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    /** The repository this came from */
    fromRepository?: Repository
    id: ID
    /** Identifies the issue associated with the event. */
    issue: Issue
}

/** Represents an 'unpinned' event on a given issue or pull request. */
export type UnpinnedEvent = GQLType & {
    /** Identifies the actor who performed the event. */
    actor?: Actor
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** Identifies the issue associated with the event. */
    issue: Issue
}

/** The possible item types found in a timeline. */
export type PullRequestTimelineItemsItemType =
    | 'PULL_REQUEST_COMMIT'
    | 'PULL_REQUEST_COMMIT_COMMENT_THREAD'
    | 'PULL_REQUEST_REVIEW'
    | 'PULL_REQUEST_REVIEW_THREAD'
    | 'PULL_REQUEST_REVISION_MARKER'
    | 'BASE_REF_CHANGED_EVENT'
    | 'BASE_REF_FORCE_PUSHED_EVENT'
    | 'DEPLOYED_EVENT'
    | 'DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT'
    | 'HEAD_REF_DELETED_EVENT'
    | 'HEAD_REF_FORCE_PUSHED_EVENT'
    | 'HEAD_REF_RESTORED_EVENT'
    | 'MERGED_EVENT'
    | 'REVIEW_DISMISSED_EVENT'
    | 'REVIEW_REQUESTED_EVENT'
    | 'REVIEW_REQUEST_REMOVED_EVENT'
    | 'READY_FOR_REVIEW_EVENT'
    | 'ISSUE_COMMENT'
    | 'CROSS_REFERENCED_EVENT'
    | 'ADDED_TO_PROJECT_EVENT'
    | 'ASSIGNED_EVENT'
    | 'CLOSED_EVENT'
    | 'COMMENT_DELETED_EVENT'
    | 'CONVERTED_NOTE_TO_ISSUE_EVENT'
    | 'DEMILESTONED_EVENT'
    | 'LABELED_EVENT'
    | 'LOCKED_EVENT'
    | 'MARKED_AS_DUPLICATE_EVENT'
    | 'MENTIONED_EVENT'
    | 'MILESTONED_EVENT'
    | 'MOVED_COLUMNS_IN_PROJECT_EVENT'
    | 'PINNED_EVENT'
    | 'REFERENCED_EVENT'
    | 'REMOVED_FROM_PROJECT_EVENT'
    | 'RENAMED_TITLE_EVENT'
    | 'REOPENED_EVENT'
    | 'SUBSCRIBED_EVENT'
    | 'TRANSFERRED_EVENT'
    | 'UNASSIGNED_EVENT'
    | 'UNLABELED_EVENT'
    | 'UNLOCKED_EVENT'
    | 'USER_BLOCKED_EVENT'
    | 'UNPINNED_EVENT'
    | 'UNSUBSCRIBED_EVENT'

/** A suggestion to review a pull request based on a user's commit history and review comments. */
export type SuggestedReviewer = GQLType & {
    /** Is this suggestion based on past commits? */
    isAuthor: boolean
    /** Is this suggestion based on past review comments? */
    isCommenter: boolean
    /** Identifies the user suggested to review the pull request. */
    reviewer: User
}

/** The possible archived states of a project card. */
export type ProjectCardArchivedState = 'ARCHIVED' | 'NOT_ARCHIVED'

/** The connection type for IssueTimelineItem. */
export type IssueTimelineConnection = GQLType & {
    /** A list of edges. */
    edges?: IssueTimelineItemEdge[]
    /** A list of nodes. */
    nodes?: IssueTimelineItem[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type IssueTimelineItemEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: IssueTimelineItem
}

/** An item in an issue timeline */
export type IssueTimelineItem =
    | Commit
    | IssueComment
    | CrossReferencedEvent
    | ClosedEvent
    | ReopenedEvent
    | SubscribedEvent
    | UnsubscribedEvent
    | ReferencedEvent
    | AssignedEvent
    | UnassignedEvent
    | LabeledEvent
    | UnlabeledEvent
    | UserBlockedEvent
    | MilestonedEvent
    | DemilestonedEvent
    | RenamedTitleEvent
    | LockedEvent
    | UnlockedEvent
    | TransferredEvent

/** The connection type for IssueTimelineItems. */
export type IssueTimelineItemsConnection = GQLType & {
    /** A list of edges. */
    edges?: IssueTimelineItemsEdge[]
    /** Identifies the count of items after applying `before` and `after` filters. */
    filteredCount: Int
    /** A list of nodes. */
    nodes?: IssueTimelineItems[]
    /** Identifies the count of items after applying `before`/`after` filters and `first`/`last`/`skip` slicing. */
    pageCount: Int
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
    /** Identifies the date and time when the timeline was last updated. */
    updatedAt: DateTime
}

/** An edge in a connection. */
export type IssueTimelineItemsEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: IssueTimelineItems
}

/** An item in an issue timeline */
export type IssueTimelineItems =
    | IssueComment
    | CrossReferencedEvent
    | AddedToProjectEvent
    | AssignedEvent
    | ClosedEvent
    | CommentDeletedEvent
    | ConvertedNoteToIssueEvent
    | DemilestonedEvent
    | LabeledEvent
    | LockedEvent
    | MarkedAsDuplicateEvent
    | MentionedEvent
    | MilestonedEvent
    | MovedColumnsInProjectEvent
    | PinnedEvent
    | ReferencedEvent
    | RemovedFromProjectEvent
    | RenamedTitleEvent
    | ReopenedEvent
    | SubscribedEvent
    | TransferredEvent
    | UnassignedEvent
    | UnlabeledEvent
    | UnlockedEvent
    | UserBlockedEvent
    | UnpinnedEvent
    | UnsubscribedEvent

/** The possible item types found in a timeline. */
export type IssueTimelineItemsItemType =
    | 'ISSUE_COMMENT'
    | 'CROSS_REFERENCED_EVENT'
    | 'ADDED_TO_PROJECT_EVENT'
    | 'ASSIGNED_EVENT'
    | 'CLOSED_EVENT'
    | 'COMMENT_DELETED_EVENT'
    | 'CONVERTED_NOTE_TO_ISSUE_EVENT'
    | 'DEMILESTONED_EVENT'
    | 'LABELED_EVENT'
    | 'LOCKED_EVENT'
    | 'MARKED_AS_DUPLICATE_EVENT'
    | 'MENTIONED_EVENT'
    | 'MILESTONED_EVENT'
    | 'MOVED_COLUMNS_IN_PROJECT_EVENT'
    | 'PINNED_EVENT'
    | 'REFERENCED_EVENT'
    | 'REMOVED_FROM_PROJECT_EVENT'
    | 'RENAMED_TITLE_EVENT'
    | 'REOPENED_EVENT'
    | 'SUBSCRIBED_EVENT'
    | 'TRANSFERRED_EVENT'
    | 'UNASSIGNED_EVENT'
    | 'UNLABELED_EVENT'
    | 'UNLOCKED_EVENT'
    | 'USER_BLOCKED_EVENT'
    | 'UNPINNED_EVENT'
    | 'UNSUBSCRIBED_EVENT'

/** Represents a connection between a project (parent) and a team (child). */
export type ProjectTeamEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Team
    /** The HTTP path for this project's team */
    projectTeamResourcePath: URI
    /** The HTTP URL for this project's team */
    projectTeamUrl: URI
}

/** Represents a user project. */
export type ProjectUserEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: User
}

/** Collaborators affiliation level with a subject. */
export type CollaboratorAffiliation = 'OUTSIDE' | 'DIRECT' | 'ALL'

/** An installation on a repository */
export type InstalledAppEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: App
}

/** A user who has contributed to a repository. */
export type RepositoryContributorEdge = GQLType & {
    /** The number of contributions the user has made in the repository. */
    contributionsCount: Int
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: User
}

/** The connection type for DeployKey. */
export type DeployKeyConnection = GQLType & {
    /** A list of edges. */
    edges?: DeployKeyEdge[]
    /** A list of nodes. */
    nodes?: DeployKey[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type DeployKeyEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: DeployKey
}

/** A repository deploy key. */
export type DeployKey = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** The deploy key. */
    key: string
    /** Whether or not the deploy key is read only. */
    readOnly: boolean
    /** The deploy key title. */
    title: string
    /** Whether or not the deploy key has been verified. */
    verified: boolean
}

/** The affiliation type between collaborator and repository. */
export type RepositoryCollaboratorAffiliation = 'ALL' | 'OUTSIDE'

/** The connection type for BranchProtectionRule. */
export type BranchProtectionRuleConnection = GQLType & {
    /** A list of edges. */
    edges?: BranchProtectionRuleEdge[]
    /** A list of nodes. */
    nodes?: BranchProtectionRule[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type BranchProtectionRuleEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: BranchProtectionRule
}

/** A branch protection rule. */
export type BranchProtectionRule = GQLType & {
    /** A list of conflicts matching branches protection rule and other branch protection rules */
    branchProtectionRuleConflicts(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): BranchProtectionRuleConflictConnection
    /** The actor who created this branch protection rule. */
    creator?: Actor
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** Will new commits pushed to matching branches dismiss pull request review approvals. */
    dismissesStaleReviews: boolean
    id: ID
    /** Can admins overwrite branch protection. */
    isAdminEnforced: boolean
    /** Repository refs that are protected by this rule */
    matchingRefs(args?: { after?: string; before?: string; first?: Int; last?: Int }): RefConnection
    /** Identifies the protection rule pattern. */
    pattern: string
    /** A list push allowances for this branch protection rule. */
    pushAllowances(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): PushAllowanceConnection
    /** The repository associated with this branch protection rule. */
    repository?: Repository
    /** Number of approving reviews required to update matching branches. */
    requiredApprovingReviewCount?: Int
    /** List of required status check contexts that must pass for commits to be accepted to matching branches. */
    requiredStatusCheckContexts?: string[]
    /** Are approving reviews required to update matching branches. */
    requiresApprovingReviews: boolean
    /** Are reviews from code owners required to update matching branches. */
    requiresCodeOwnerReviews: boolean
    /** Are commits required to be signed. */
    requiresCommitSignatures: boolean
    /** Are status checks required to update matching branches. */
    requiresStatusChecks: boolean
    /** Are branches required to be up to date before merging. */
    requiresStrictStatusChecks: boolean
    /** Is pushing to matching branches restricted. */
    restrictsPushes: boolean
    /** Is dismissal of pull request reviews restricted. */
    restrictsReviewDismissals: boolean
    /** A list review dismissal allowances for this branch protection rule. */
    reviewDismissalAllowances(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): ReviewDismissalAllowanceConnection
}

/** The connection type for ReviewDismissalAllowance. */
export type ReviewDismissalAllowanceConnection = GQLType & {
    /** A list of edges. */
    edges?: ReviewDismissalAllowanceEdge[]
    /** A list of nodes. */
    nodes?: ReviewDismissalAllowance[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type ReviewDismissalAllowanceEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: ReviewDismissalAllowance
}

/** A team or user who has the ability to dismiss a review on a protected branch. */
export type ReviewDismissalAllowance = GQLType & {
    /** The actor that can dismiss. */
    actor?: ReviewDismissalAllowanceActor
    /** Identifies the branch protection rule associated with the allowed user or team. */
    branchProtectionRule?: BranchProtectionRule
    id: ID
}

/** Types that can be an actor. */
export type ReviewDismissalAllowanceActor = User | Team

/** The connection type for PushAllowance. */
export type PushAllowanceConnection = GQLType & {
    /** A list of edges. */
    edges?: PushAllowanceEdge[]
    /** A list of nodes. */
    nodes?: PushAllowance[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PushAllowanceEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PushAllowance
}

/** A team or user who has the ability to push to a protected branch. */
export type PushAllowance = GQLType & {
    /** The actor that can push. */
    actor?: PushAllowanceActor
    /** Identifies the branch protection rule associated with the allowed user or team. */
    branchProtectionRule?: BranchProtectionRule
    id: ID
}

/** Types that can be an actor. */
export type PushAllowanceActor = User | Team

/** The connection type for Ref. */
export type RefConnection = GQLType & {
    /** A list of edges. */
    edges?: RefEdge[]
    /** A list of nodes. */
    nodes?: Ref[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type RefEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Ref
}

/** The connection type for BranchProtectionRuleConflict. */
export type BranchProtectionRuleConflictConnection = GQLType & {
    /** A list of edges. */
    edges?: BranchProtectionRuleConflictEdge[]
    /** A list of nodes. */
    nodes?: BranchProtectionRuleConflict[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type BranchProtectionRuleConflictEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: BranchProtectionRuleConflict
}

/** A conflict between two branch protection rules. */
export type BranchProtectionRuleConflict = GQLType & {
    /** Identifies the branch protection rule. */
    branchProtectionRule?: BranchProtectionRule
    /** Identifies the conflicting branch protection rule. */
    conflictingBranchProtectionRule?: BranchProtectionRule
    /** Identifies the branch ref that has conflicting rules */
    ref?: Ref
}

/** The connection type for Milestone. */
export type MilestoneConnection = GQLType & {
    /** A list of edges. */
    edges?: MilestoneEdge[]
    /** A list of nodes. */
    nodes?: Milestone[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type MilestoneEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Milestone
}

/** Ordering options for milestone connections. */
export type MilestoneOrder = {
    /** The field to order milestones by. */
    field: MilestoneOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which milestone connections can be ordered. */
export type MilestoneOrderField = 'DUE_DATE' | 'CREATED_AT' | 'UPDATED_AT' | 'NUMBER'

/** The Code of Conduct for a repository */
export type CodeOfConduct = GQLType & {
    /** The body of the Code of Conduct */
    body?: string
    id: ID
    /** The key for the Code of Conduct */
    key: string
    /** The formal name of the Code of Conduct */
    name: string
    /** The HTTP path for this Code of Conduct */
    resourcePath?: URI
    /** The HTTP URL for this Code of Conduct */
    url?: URI
}

/** The connection type for User. */
export type RepositoryCollaboratorConnection = GQLType & {
    /** A list of edges. */
    edges?: RepositoryCollaboratorEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a user who is a collaborator of a repository. */
export type RepositoryCollaboratorEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    node: User
    /** The permission the user has on the repository. */
    permission: RepositoryPermission
    /** A list of sources for the user's access to the repository. */
    permissionSources?: PermissionSource[]
}

/** A level of permission and source for a user's access to a repository. */
export type PermissionSource = GQLType & {
    /** The organization the repository belongs to. */
    organization: Organization
    /** The level of access this source has granted to the user. */
    permission: DefaultRepositoryPermissionField
    /** The source of this permission. */
    source: PermissionGranter
}

/** Types that can grant permissions on a repository to a user */
export type PermissionGranter = Organization | Repository | Team

/** Ordering options for language connections. */
export type LanguageOrder = {
    /** The field to order languages by. */
    field: LanguageOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which language connections can be ordered. */
export type LanguageOrderField = 'SIZE'

/** Ways in which lists of git refs can be ordered upon return. */
export type RefOrder = {
    /** The field in which to order refs by. */
    field: RefOrderField
    /** The direction in which to order refs by the specified field. */
    direction: OrderDirection
}

/** Properties by which ref connections can be ordered. */
export type RefOrderField = 'TAG_COMMIT_DATE' | 'ALPHABETICAL'

/** A GitHub Security Advisory */
export type SecurityAdvisory = GQLType & {
    /** Identifies the primary key from the database. */
    databaseId?: Int
    /** This is a long plaintext description of the advisory */
    description: string
    /** The GitHub Security Advisory ID */
    ghsaId: string
    id: ID
    /** A list of identifiers for this advisory */
    identifiers: SecurityAdvisoryIdentifier[]
    /** The organization that originated the advisory */
    origin: string
    /** When the advisory was published */
    publishedAt: DateTime
    /** A list of references for this advisory */
    references: SecurityAdvisoryReference[]
    /** The severity of the advisory */
    severity: SecurityAdvisorySeverity
    /** A short plaintext summary of the advisory */
    summary: string
    /** When the advisory was last updated */
    updatedAt: DateTime
    /** Vulnerabilities associated with this Advisory */
    vulnerabilities(args?: {
        orderBy?: SecurityVulnerabilityOrder
        ecosystem?: SecurityAdvisoryEcosystem
        package?: string
        severities?: SecurityAdvisorySeverity[]
        after?: string
        before?: string
        first?: Int
        last?: Int
    }): SecurityVulnerabilityConnection
    /** When the advisory was withdrawn, if it has been withdrawn */
    withdrawnAt?: DateTime
}

/** Severity of the vulnerability. */
export type SecurityAdvisorySeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'

/** A GitHub Security Advisory Identifier */
export type SecurityAdvisoryIdentifier = GQLType & {
    /** The identifier type, e.g. GHSA, CVE */
    type: string
    /** The identifier */
    value: string
}

/** A GitHub Security Advisory Reference */
export type SecurityAdvisoryReference = GQLType & {
    /** A publicly accessible reference */
    url: URI
}

/** The connection type for SecurityVulnerability. */
export type SecurityVulnerabilityConnection = GQLType & {
    /** A list of edges. */
    edges?: SecurityVulnerabilityEdge[]
    /** A list of nodes. */
    nodes?: SecurityVulnerability[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type SecurityVulnerabilityEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: SecurityVulnerability
}

/** An individual vulnerability within an Advisory */
export type SecurityVulnerability = GQLType & {
    /** The Advisory associated with this Vulnerability */
    advisory: SecurityAdvisory
    /** The first version containing a fix for the vulnerability */
    firstPatchedVersion?: SecurityAdvisoryPackageVersion
    /** A description of the vulnerable package */
    package: SecurityAdvisoryPackage
    /** The severity of the vulnerability within this package */
    severity: SecurityAdvisorySeverity
    /** When the vulnerability was last updated */
    updatedAt: DateTime
    /** A string that describes the vulnerable package versions.
This string follows a basic syntax with a few forms.
+ `= 0.2.0` denotes a single vulnerable version.
+ `<= 1.0.8` denotes a version range up to and including the specified version
+ `< 0.1.11` denotes a version range up to, but excluding, the specified version
+ `>= 4.3.0, < 4.3.5` denotes a version range with a known minimum and maximum version.
+ `>= 0.0.1` denotes a version range with a known minimum, but no known maximum
 */
    vulnerableVersionRange: string
}

/** An individual package */
export type SecurityAdvisoryPackage = GQLType & {
    /** The ecosystem the package belongs to, e.g. RUBYGEMS, NPM */
    ecosystem: SecurityAdvisoryEcosystem
    /** The package name */
    name: string
}

/** The possible ecosystems of a security vulnerability's package. */
export type SecurityAdvisoryEcosystem = 'RUBYGEMS' | 'NPM' | 'PIP' | 'MAVEN' | 'NUGET'

/** An individual package version */
export type SecurityAdvisoryPackageVersion = GQLType & {
    /** The package name or version */
    identifier: string
}

/** Ordering options for security vulnerability connections */
export type SecurityVulnerabilityOrder = {
    /** The field to order security vulnerabilities by. */
    field: SecurityVulnerabilityOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which security vulnerability connections can be ordered. */
export type SecurityVulnerabilityOrderField = 'UPDATED_AT'

/** Git SSH string */
export type GitSSHRemote = any

/** Represents a single registry metadatum */
export type RegistryPackageMetadatum = {
    /** Name of the metadatum. */
    name: string
    /** Value of the metadatum. */
    value: string
    /** True, if the metadatum can be updated if it already exists */
    update?: boolean
}

/** Represents a object that contains package activity statistics such as downloads. */
export type RegistryPackageStatistics = GQLType & {
    /** Number of times the package was downloaded this month. */
    downloadsThisMonth: Int
    /** Number of times the package was downloaded this week. */
    downloadsThisWeek: Int
    /** Number of times the package was downloaded this year. */
    downloadsThisYear: Int
    /** Number of times the package was downloaded today. */
    downloadsToday: Int
    /** Number of times the package was downloaded since it was created. */
    downloadsTotalCount: Int
}

/** The connection type for Topic. */
export type TopicConnection = GQLType & {
    /** A list of edges. */
    edges?: TopicEdge[]
    /** A list of nodes. */
    nodes?: Topic[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type TopicEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Topic
}

/** The connection type for RegistryPackageTag. */
export type RegistryPackageTagConnection = GQLType & {
    /** A list of edges. */
    edges?: RegistryPackageTagEdge[]
    /** A list of nodes. */
    nodes?: RegistryPackageTag[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type RegistryPackageTagEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: RegistryPackageTag
}

/** A version tag contains the mapping between a tag name and a version. */
export type RegistryPackageTag = GQLType & {
    id: ID
    /** Identifies the tag name of the version. */
    name: string
    /** version that the tag is associated with */
    version?: RegistryPackageVersion
}

/** Entities that can be sponsored through GitHub Sponsors */
export interface Sponsorable extends GQLType {
    /** This object's sponsorships as the maintainer. */
    sponsorshipsAsMaintainer: SponsorshipConnection
    /** This object's sponsorships as the sponsor. */
    sponsorshipsAsSponsor: SponsorshipConnection
    /** Use `asUser` to access fields on the underlying concrete type. */
    asUser: User
}

/** Represents a sponsor. */
export type SponsorEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: User
}

/** A sponsorship relationship between a sponsor and a maintainer */
export type Sponsorship = GQLType & {
    /** Identifies the date and time when the object was created. */
    createdAt: DateTime
    id: ID
    /** The entity that is being sponsored */
    maintainer: User
    /** The privacy level for this sponsorship. */
    privacyLevel: SponsorshipPrivacy
    /** The entity that is sponsoring. Returns null if the sponsorship is private */
    sponsor?: User
}

/** The privacy of a sponsorship */
export type SponsorshipPrivacy = 'PUBLIC' | 'PRIVATE'

/** The connection type for Sponsorship. */
export type SponsorshipConnection = GQLType & {
    /** A list of edges. */
    edges?: SponsorshipEdge[]
    /** A list of nodes. */
    nodes?: Sponsorship[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type SponsorshipEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: Sponsorship
}

/** Ordering options for sponsorship connections. */
export type SponsorshipOrder = {
    /** The ordering direction. */
    direction: OrderDirection
}

/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
export type ContributionsCollection = GQLType & {
    /** Commit contributions made by the user, grouped by repository. */
    commitContributionsByRepository(args?: {
        maxRepositories?: Int
    }): CommitContributionsByRepository[]
    /** A calendar of this user's contributions on GitHub. */
    contributionCalendar: ContributionCalendar
    /** The years the user has been making contributions with the most recent year first. */
    contributionYears: Int[]
    /** Determine if this collection's time span ends in the current month.
     */
    doesEndInCurrentMonth: boolean
    /** The date of the first restricted contribution the user made in this time period. Can only be non-null when the user has enabled private contribution counts. */
    earliestRestrictedContributionDate?: Date
    /** The ending date and time of this collection. */
    endedAt: DateTime
    /** The first issue the user opened on GitHub. This will be null if that issue was opened outside the collection's time range and ignoreTimeRange is false. If the issue is not visible but the user has opted to show private contributions, a RestrictedContribution will be returned. */
    firstIssueContribution?: CreatedIssueOrRestrictedContribution
    /** The first pull request the user opened on GitHub. This will be null if that pull request was opened outside the collection's time range and ignoreTimeRange is not true. If the pull request is not visible but the user has opted to show private contributions, a RestrictedContribution will be returned. */
    firstPullRequestContribution?: CreatedPullRequestOrRestrictedContribution
    /** The first repository the user created on GitHub. This will be null if that first repository was created outside the collection's time range and ignoreTimeRange is false. If the repository is not visible, then a RestrictedContribution is returned. */
    firstRepositoryContribution?: CreatedRepositoryOrRestrictedContribution
    /** Does the user have any more activity in the timeline that occurred prior to the collection's time range? */
    hasActivityInThePast: boolean
    /** Determine if there are any contributions in this collection. */
    hasAnyContributions: boolean
    /** Determine if the user made any contributions in this time frame whose details are not visible because they were made in a private repository. Can only be true if the user enabled private contribution counts. */
    hasAnyRestrictedContributions: boolean
    /** Whether or not the collector's time span is all within the same day. */
    isSingleDay: boolean
    /** A list of issues the user opened. */
    issueContributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        excludeFirst?: boolean
        excludePopular?: boolean
        orderBy?: ContributionOrder
    }): CreatedIssueContributionConnection
    /** Issue contributions made by the user, grouped by repository. */
    issueContributionsByRepository(args?: {
        maxRepositories?: Int
        excludeFirst?: boolean
        excludePopular?: boolean
    }): IssueContributionsByRepository[]
    /** When the user signed up for GitHub. This will be null if that sign up date falls outside the collection's time range and ignoreTimeRange is false. */
    joinedGitHubContribution?: JoinedGitHubContribution
    /** The date of the most recent restricted contribution the user made in this time period. Can only be non-null when the user has enabled private contribution counts. */
    latestRestrictedContributionDate?: Date
    /** When this collection's time range does not include any activity from the user, use this
to get a different collection from an earlier time range that does have activity.
 */
    mostRecentCollectionWithActivity?: ContributionsCollection
    /** Returns a different contributions collection from an earlier time range than this one
that does not have any contributions.
 */
    mostRecentCollectionWithoutActivity?: ContributionsCollection
    /** The issue the user opened on GitHub that received the most comments in the specified
time frame.
 */
    popularIssueContribution?: CreatedIssueContribution
    /** The pull request the user opened on GitHub that received the most comments in the
specified time frame.
 */
    popularPullRequestContribution?: CreatedPullRequestContribution
    /** Pull request contributions made by the user. */
    pullRequestContributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        excludeFirst?: boolean
        excludePopular?: boolean
        orderBy?: ContributionOrder
    }): CreatedPullRequestContributionConnection
    /** Pull request contributions made by the user, grouped by repository. */
    pullRequestContributionsByRepository(args?: {
        maxRepositories?: Int
        excludeFirst?: boolean
        excludePopular?: boolean
    }): PullRequestContributionsByRepository[]
    /** Pull request review contributions made by the user. */
    pullRequestReviewContributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: ContributionOrder
    }): CreatedPullRequestReviewContributionConnection
    /** Pull request review contributions made by the user, grouped by repository. */
    pullRequestReviewContributionsByRepository(args?: {
        maxRepositories?: Int
    }): PullRequestReviewContributionsByRepository[]
    /** A list of repositories owned by the user that the user created in this time range. */
    repositoryContributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        excludeFirst?: boolean
        orderBy?: ContributionOrder
    }): CreatedRepositoryContributionConnection
    /** A count of contributions made by the user that the viewer cannot access. Only non-zero when the user has chosen to share their private contribution counts. */
    restrictedContributionsCount: Int
    /** The beginning date and time of this collection. */
    startedAt: DateTime
    /** How many commits were made by the user in this time span. */
    totalCommitContributions: Int
    /** How many issues the user opened. */
    totalIssueContributions(args?: { excludeFirst?: boolean; excludePopular?: boolean }): Int
    /** How many pull requests the user opened. */
    totalPullRequestContributions(args?: { excludeFirst?: boolean; excludePopular?: boolean }): Int
    /** How many pull request reviews the user left. */
    totalPullRequestReviewContributions: Int
    /** How many different repositories the user committed to. */
    totalRepositoriesWithContributedCommits: Int
    /** How many different repositories the user opened issues in. */
    totalRepositoriesWithContributedIssues(args?: {
        excludeFirst?: boolean
        excludePopular?: boolean
    }): Int
    /** How many different repositories the user left pull request reviews in. */
    totalRepositoriesWithContributedPullRequestReviews: Int
    /** How many different repositories the user opened pull requests in. */
    totalRepositoriesWithContributedPullRequests(args?: {
        excludeFirst?: boolean
        excludePopular?: boolean
    }): Int
    /** How many repositories the user created. */
    totalRepositoryContributions(args?: { excludeFirst?: boolean }): Int
    /** The user who made the contributions in this collection. */
    user: User
}

/** Represents a contribution a user made on GitHub, such as opening an issue. */
export interface Contribution extends GQLType {
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
    /** Use `asCreatedIssueContribution` to access fields on the underlying concrete type. */
    asCreatedIssueContribution: CreatedIssueContribution
    /** Use `asCreatedRepositoryContribution` to access fields on the underlying concrete type. */
    asCreatedRepositoryContribution: CreatedRepositoryContribution
    /** Use `asJoinedGitHubContribution` to access fields on the underlying concrete type. */
    asJoinedGitHubContribution: JoinedGitHubContribution
    /** Use `asRestrictedContribution` to access fields on the underlying concrete type. */
    asRestrictedContribution: RestrictedContribution
    /** Use `asCreatedPullRequestContribution` to access fields on the underlying concrete type. */
    asCreatedPullRequestContribution: CreatedPullRequestContribution
    /** Use `asCreatedPullRequestReviewContribution` to access fields on the underlying concrete type. */
    asCreatedPullRequestReviewContribution: CreatedPullRequestReviewContribution
    /** Use `asCreatedCommitContribution` to access fields on the underlying concrete type. */
    asCreatedCommitContribution: CreatedCommitContribution
}

/** The connection type for CreatedIssueContribution. */
export type CreatedIssueContributionConnection = GQLType & {
    /** A list of edges. */
    edges?: CreatedIssueContributionEdge[]
    /** A list of nodes. */
    nodes?: CreatedIssueContribution[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type CreatedIssueContributionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: CreatedIssueContribution
}

/** Represents the contribution a user made on GitHub by opening an issue. */
export type CreatedIssueContribution = GQLType & {
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** The issue that was opened. */
    issue: Issue
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
}

/** Ordering options for contribution connections. */
export type ContributionOrder = {
    /** The field by which to order contributions.

**Upcoming Change on 2019-10-01 UTC**
**Description:** `field` will be removed. Only one order field is supported.
**Reason:** `field` will be removed.
 */
    field?: ContributionOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which contribution connections can be ordered. */
export type ContributionOrderField = 'OCCURRED_AT'

/** The connection type for CreatedRepositoryContribution. */
export type CreatedRepositoryContributionConnection = GQLType & {
    /** A list of edges. */
    edges?: CreatedRepositoryContributionEdge[]
    /** A list of nodes. */
    nodes?: CreatedRepositoryContribution[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type CreatedRepositoryContributionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: CreatedRepositoryContribution
}

/** Represents the contribution a user made on GitHub by creating a repository. */
export type CreatedRepositoryContribution = GQLType & {
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The repository that was created. */
    repository: Repository
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
}

/** Represents a user signing up for a GitHub account. */
export type JoinedGitHubContribution = GQLType & {
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
}

/** Represents either a repository the viewer can access or a restricted contribution. */
export type CreatedRepositoryOrRestrictedContribution =
    | CreatedRepositoryContribution
    | RestrictedContribution

/** Represents a private contribution a user made on GitHub. */
export type RestrictedContribution = GQLType & {
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
}

/** Represents either a issue the viewer can access or a restricted contribution. */
export type CreatedIssueOrRestrictedContribution = CreatedIssueContribution | RestrictedContribution

/** Represents either a pull request the viewer can access or a restricted contribution. */
export type CreatedPullRequestOrRestrictedContribution =
    | CreatedPullRequestContribution
    | RestrictedContribution

/** Represents the contribution a user made on GitHub by opening a pull request. */
export type CreatedPullRequestContribution = GQLType & {
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The pull request that was opened. */
    pullRequest: PullRequest
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
}

/** A calendar of contributions made on GitHub by a user. */
export type ContributionCalendar = GQLType & {
    /** A list of hex color codes used in this calendar. The darker the color, the more contributions it represents. */
    colors: string[]
    /** Determine if the color set was chosen because it's currently Halloween. */
    isHalloween: boolean
    /** A list of the months of contributions in this calendar. */
    months: ContributionCalendarMonth[]
    /** The count of total contributions in the calendar. */
    totalContributions: Int
    /** A list of the weeks of contributions in this calendar. */
    weeks: ContributionCalendarWeek[]
}

/** A week of contributions in a user's contribution graph. */
export type ContributionCalendarWeek = GQLType & {
    /** The days of contributions in this week. */
    contributionDays: ContributionCalendarDay[]
    /** The date of the earliest square in this week. */
    firstDay: Date
}

/** Represents a single day of contributions on GitHub by a user. */
export type ContributionCalendarDay = GQLType & {
    /** The hex color code that represents how many contributions were made on this day compared to others in the calendar. */
    color: string
    /** How many contributions were made by the user on this day. */
    contributionCount: Int
    /** The day this square represents. */
    date: Date
    /** A number representing which day of the week this square represents, e.g., 1 is Monday. */
    weekday: Int
}

/** A month of contributions in a user's contribution graph. */
export type ContributionCalendarMonth = GQLType & {
    /** The date of the first day of this month. */
    firstDay: Date
    /** The name of the month. */
    name: string
    /** How many weeks started in this month. */
    totalWeeks: Int
    /** The year the month occurred in. */
    year: Int
}

/** The connection type for CreatedPullRequestReviewContribution. */
export type CreatedPullRequestReviewContributionConnection = GQLType & {
    /** A list of edges. */
    edges?: CreatedPullRequestReviewContributionEdge[]
    /** A list of nodes. */
    nodes?: CreatedPullRequestReviewContribution[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type CreatedPullRequestReviewContributionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: CreatedPullRequestReviewContribution
}

/** Represents the contribution a user made by leaving a review on a pull request. */
export type CreatedPullRequestReviewContribution = GQLType & {
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The pull request the user reviewed. */
    pullRequest: PullRequest
    /** The review the user left on the pull request. */
    pullRequestReview: PullRequestReview
    /** The repository containing the pull request that the user reviewed. */
    repository: Repository
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
}

/** This aggregates pull request reviews made by a user within one repository. */
export type PullRequestReviewContributionsByRepository = GQLType & {
    /** The pull request review contributions. */
    contributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: ContributionOrder
    }): CreatedPullRequestReviewContributionConnection
    /** The repository in which the pull request reviews were made. */
    repository: Repository
}

/** This aggregates commits made by a user within one repository. */
export type CommitContributionsByRepository = GQLType & {
    /** The commit contributions, each representing a day. */
    contributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: CommitContributionOrder
    }): CreatedCommitContributionConnection
    /** The repository in which the commits were made. */
    repository: Repository
    /** The HTTP path for the user's commits to the repository in this time range. */
    resourcePath: URI
    /** The HTTP URL for the user's commits to the repository in this time range. */
    url: URI
}

/** The connection type for CreatedCommitContribution. */
export type CreatedCommitContributionConnection = GQLType & {
    /** A list of edges. */
    edges?: CreatedCommitContributionEdge[]
    /** A list of nodes. */
    nodes?: CreatedCommitContribution[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of commits across days and repositories in the connection.
     */
    totalCount: Int
}

/** An edge in a connection. */
export type CreatedCommitContributionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: CreatedCommitContribution
}

/** Represents the contribution a user made by committing to a repository. */
export type CreatedCommitContribution = GQLType & {
    /** How many commits were made on this day to this repository by the user. */
    commitCount: Int
    /** Whether this contribution is associated with a record you do not have access to. For
example, your own 'first issue' contribution may have been made on a repository you can no
longer access.
 */
    isRestricted: boolean
    /** When this contribution was made. */
    occurredAt: DateTime
    /** The repository the user made a commit in. */
    repository: Repository
    /** The HTTP path for this contribution. */
    resourcePath: URI
    /** The HTTP URL for this contribution. */
    url: URI
    /** The user who made this contribution.
     */
    user: User
}

/** Ordering options for commit contribution connections. */
export type CommitContributionOrder = {
    /** The field by which to order commit contributions. */
    field: CommitContributionOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which commit contribution connections can be ordered. */
export type CommitContributionOrderField = 'OCCURRED_AT' | 'COMMIT_COUNT'

/** The connection type for CreatedPullRequestContribution. */
export type CreatedPullRequestContributionConnection = GQLType & {
    /** A list of edges. */
    edges?: CreatedPullRequestContributionEdge[]
    /** A list of nodes. */
    nodes?: CreatedPullRequestContribution[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type CreatedPullRequestContributionEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: CreatedPullRequestContribution
}

/** This aggregates pull requests opened by a user within one repository. */
export type PullRequestContributionsByRepository = GQLType & {
    /** The pull request contributions. */
    contributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: ContributionOrder
    }): CreatedPullRequestContributionConnection
    /** The repository in which the pull requests were opened. */
    repository: Repository
}

/** This aggregates issues opened by a user within one repository. */
export type IssueContributionsByRepository = GQLType & {
    /** The issue contributions. */
    contributions(args?: {
        after?: string
        before?: string
        first?: Int
        last?: Int
        orderBy?: ContributionOrder
    }): CreatedIssueContributionConnection
    /** The repository in which the issues were opened. */
    repository: Repository
}

/** The connection type for SavedReply. */
export type SavedReplyConnection = GQLType & {
    /** A list of edges. */
    edges?: SavedReplyEdge[]
    /** A list of nodes. */
    nodes?: SavedReply[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type SavedReplyEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: SavedReply
}

/** A Saved Reply is text a user can use to reply quickly. */
export type SavedReply = GQLType & {
    /** The body of the saved reply. */
    body: string
    /** The saved reply body rendered to HTML. */
    bodyHTML: HTML
    /** Identifies the primary key from the database. */
    databaseId?: Int
    id: ID
    /** The title of the saved reply. */
    title: string
    /** The user that saved this reply. */
    user?: Actor
}

/** Ordering options for saved reply connections. */
export type SavedReplyOrder = {
    /** The field to order saved replies by. */
    field: SavedReplyOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which saved reply connections can be ordered. */
export type SavedReplyOrderField = 'UPDATED_AT'

/** The reason a repository is listed as 'contributed'. */
export type RepositoryContributionType =
    | 'COMMIT'
    | 'ISSUE'
    | 'PULL_REQUEST'
    | 'REPOSITORY'
    | 'PULL_REQUEST_REVIEW'

/** An edge in a connection. */
export type IssueOrPullRequestEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: IssueOrPullRequest
}

/** The connection type for PublicKey. */
export type PublicKeyConnection = GQLType & {
    /** A list of edges. */
    edges?: PublicKeyEdge[]
    /** A list of nodes. */
    nodes?: PublicKey[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type PublicKeyEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: PublicKey
}

/** The connection type for User. */
export type FollowingConnection = GQLType & {
    /** A list of edges. */
    edges?: UserEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** The connection type for User. */
export type FollowerConnection = GQLType & {
    /** A list of edges. */
    edges?: UserEdge[]
    /** A list of nodes. */
    nodes?: User[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** The connection type for Repository. */
export type StarredRepositoryConnection = GQLType & {
    /** A list of edges. */
    edges?: StarredRepositoryEdge[]
    /** A list of nodes. */
    nodes?: Repository[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** Represents a starred repository. */
export type StarredRepositoryEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    node: Repository
    /** Identifies when the item was starred. */
    starredAt: DateTime
}

/** Represents a starred topic. */
export type StarredTopicEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    node: Topic
    /** Identifies when the item was starred. */
    starredAt: DateTime
}

/** An edge in a connection. */
export type AppEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: App
}

/** Represents the client's rate limit. */
export type RateLimit = GQLType & {
    /** The point cost for the current query counting against the rate limit. */
    cost: Int
    /** The maximum number of points the client is permitted to consume in a 60 minute window. */
    limit: Int
    /** The maximum number of nodes this query may return */
    nodeCount: Int
    /** The number of points remaining in the current rate limit window. */
    remaining: Int
    /** The time at which the current rate limit window resets in UTC epoch seconds. */
    resetAt: DateTime
}

/** A list of results that matched against a search query. */
export type SearchResultItemConnection = GQLType & {
    /** The number of pieces of code that matched the search query. */
    codeCount: Int
    /** A list of edges. */
    edges?: SearchResultItemEdge[]
    /** The number of issues that matched the search query. */
    issueCount: Int
    /** A list of nodes. */
    nodes?: SearchResultItem[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** The number of repositories that matched the search query. */
    repositoryCount: Int
    /** The number of users that matched the search query. */
    userCount: Int
    /** The number of wiki pages that matched the search query. */
    wikiCount: Int
}

/** An edge in a connection. */
export type SearchResultItemEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: SearchResultItem
    /** Text matches on the result found. */
    textMatches?: TextMatch[]
}

/** The results of a search. */
export type SearchResultItem =
    | Issue
    | PullRequest
    | Repository
    | User
    | Organization
    | MarketplaceListing
    | App

/** A text match within a search result. */
export type TextMatch = GQLType & {
    /** The specific text fragment within the property matched on. */
    fragment: string
    /** Highlights within the matched fragment. */
    highlights: TextMatchHighlight[]
    /** The property matched on. */
    property: string
}

/** Represents a single highlight in a search result match. */
export type TextMatchHighlight = GQLType & {
    /** The indice in the fragment where the matched text begins. */
    beginIndice: Int
    /** The indice in the fragment where the matched text ends. */
    endIndice: Int
    /** The text matched. */
    text: string
}

/** Represents the individual results of a search. */
export type SearchType = 'ISSUE' | 'REPOSITORY' | 'USER'

/** A GitHub Sponsors listing. */
export type SponsorsListing = GQLType & {
    /** The full description of the listing. */
    fullDescription: string
    id: ID
    /** The short description of the listing. */
    shortDescription: string
    /** The short name of the listing. */
    slug: string
}

/** Types that can be inside Collection Items. */
export type CollectionItemContent = Repository | Organization | User

/** Represents information about the GitHub instance. */
export type GitHubMetadata = GQLType & {
    /** Returns a String that's a SHA of `github-services` */
    gitHubServicesSha: GitObjectID
    /** IP addresses that users connect to for git operations */
    gitIpAddresses?: string[]
    /** IP addresses that service hooks are sent from */
    hookIpAddresses?: string[]
    /** IP addresses that the importer connects from */
    importerIpAddresses?: string[]
    /** Whether or not users are verified */
    isPasswordAuthenticationVerifiable: boolean
    /** IP addresses for GitHub Pages' A records */
    pagesIpAddresses?: string[]
}

/** The connection type for SecurityAdvisory. */
export type SecurityAdvisoryConnection = GQLType & {
    /** A list of edges. */
    edges?: SecurityAdvisoryEdge[]
    /** A list of nodes. */
    nodes?: SecurityAdvisory[]
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** Identifies the total count of items in the connection. */
    totalCount: Int
}

/** An edge in a connection. */
export type SecurityAdvisoryEdge = GQLType & {
    /** A cursor for use in pagination. */
    cursor: string
    /** The item at the end of the edge. */
    node?: SecurityAdvisory
}

/** Ordering options for security advisory connections */
export type SecurityAdvisoryOrder = {
    /** The field to order security advisories by. */
    field: SecurityAdvisoryOrderField
    /** The ordering direction. */
    direction: OrderDirection
}

/** Properties by which security advisory connections can be ordered. */
export type SecurityAdvisoryOrderField = 'PUBLISHED_AT' | 'UPDATED_AT'

/** An advisory identifier to filter results on. */
export type SecurityAdvisoryIdentifierFilter = {
    /** The identifier type. */
    type: SecurityAdvisoryIdentifierType
    /** The identifier string. Supports exact or partial matching. */
    value: string
}

/** Identifier formats available for advisories. */
export type SecurityAdvisoryIdentifierType = 'CVE' | 'GHSA'

/** The root query for implementing GraphQL mutations. */
export type Mutation = GQLType & {
    /** Applies a suggested topic to the repository. */
    acceptTopicSuggestion(args: {
        input: AcceptTopicSuggestionInput
    }): AcceptTopicSuggestionPayload | undefined
    /** Adds assignees to an assignable object. */
    addAssigneesToAssignable(args: {
        input: AddAssigneesToAssignableInput
    }): AddAssigneesToAssignablePayload | undefined
    /** Adds a comment to an Issue or Pull Request. */
    addComment(args: { input: AddCommentInput }): AddCommentPayload | undefined
    /** Adds labels to a labelable object. */
    addLabelsToLabelable(args: {
        input: AddLabelsToLabelableInput
    }): AddLabelsToLabelablePayload | undefined
    /** Adds a card to a ProjectColumn. Either `contentId` or `note` must be provided but **not** both. */
    addProjectCard(args: { input: AddProjectCardInput }): AddProjectCardPayload | undefined
    /** Adds a column to a Project. */
    addProjectColumn(args: { input: AddProjectColumnInput }): AddProjectColumnPayload | undefined
    /** Adds a review to a Pull Request. */
    addPullRequestReview(args: {
        input: AddPullRequestReviewInput
    }): AddPullRequestReviewPayload | undefined
    /** Adds a comment to a review. */
    addPullRequestReviewComment(args: {
        input: AddPullRequestReviewCommentInput
    }): AddPullRequestReviewCommentPayload | undefined
    /** Adds a reaction to a subject. */
    addReaction(args: { input: AddReactionInput }): AddReactionPayload | undefined
    /** Adds a star to a Starrable. */
    addStar(args: { input: AddStarInput }): AddStarPayload | undefined
    /** Update your status on GitHub. */
    changeUserStatus(args: { input: ChangeUserStatusInput }): ChangeUserStatusPayload | undefined
    /** Clears all labels from a labelable object. */
    clearLabelsFromLabelable(args: {
        input: ClearLabelsFromLabelableInput
    }): ClearLabelsFromLabelablePayload | undefined
    /** Creates a new project by cloning configuration from an existing project. */
    cloneProject(args: { input: CloneProjectInput }): CloneProjectPayload | undefined
    /** Create a new repository with the same files and directory structure as a template repository. */
    cloneTemplateRepository(args: {
        input: CloneTemplateRepositoryInput
    }): CloneTemplateRepositoryPayload | undefined
    /** Close an issue. */
    closeIssue(args: { input: CloseIssueInput }): CloseIssuePayload | undefined
    /** Close a pull request. */
    closePullRequest(args: { input: ClosePullRequestInput }): ClosePullRequestPayload | undefined
    /** Convert a project note card to one associated with a newly created issue. */
    convertProjectCardNoteToIssue(args: {
        input: ConvertProjectCardNoteToIssueInput
    }): ConvertProjectCardNoteToIssuePayload | undefined
    /** Create a new branch protection rule */
    createBranchProtectionRule(args: {
        input: CreateBranchProtectionRuleInput
    }): CreateBranchProtectionRulePayload | undefined
    /** Creates a new issue. */
    createIssue(args: { input: CreateIssueInput }): CreateIssuePayload | undefined
    /** Creates a new project. */
    createProject(args: { input: CreateProjectInput }): CreateProjectPayload | undefined
    /** Create a new pull request */
    createPullRequest(args: { input: CreatePullRequestInput }): CreatePullRequestPayload | undefined
    /** Create a new Git Ref. */
    createRef(args: { input: CreateRefInput }): CreateRefPayload | undefined
    /** Create a new repository. */
    createRepository(args: { input: CreateRepositoryInput }): CreateRepositoryPayload | undefined
    /** Rejects a suggested topic for the repository. */
    declineTopicSuggestion(args: {
        input: DeclineTopicSuggestionInput
    }): DeclineTopicSuggestionPayload | undefined
    /** Delete a branch protection rule */
    deleteBranchProtectionRule(args: {
        input: DeleteBranchProtectionRuleInput
    }): DeleteBranchProtectionRulePayload | undefined
    /** Deletes an Issue object. */
    deleteIssue(args: { input: DeleteIssueInput }): DeleteIssuePayload | undefined
    /** Deletes an IssueComment object. */
    deleteIssueComment(args: {
        input: DeleteIssueCommentInput
    }): DeleteIssueCommentPayload | undefined
    /** Deletes a project. */
    deleteProject(args: { input: DeleteProjectInput }): DeleteProjectPayload | undefined
    /** Deletes a project card. */
    deleteProjectCard(args: { input: DeleteProjectCardInput }): DeleteProjectCardPayload | undefined
    /** Deletes a project column. */
    deleteProjectColumn(args: {
        input: DeleteProjectColumnInput
    }): DeleteProjectColumnPayload | undefined
    /** Deletes a pull request review. */
    deletePullRequestReview(args: {
        input: DeletePullRequestReviewInput
    }): DeletePullRequestReviewPayload | undefined
    /** Deletes a pull request review comment. */
    deletePullRequestReviewComment(args: {
        input: DeletePullRequestReviewCommentInput
    }): DeletePullRequestReviewCommentPayload | undefined
    /** Delete a Git Ref. */
    deleteRef(args: { input: DeleteRefInput }): DeleteRefPayload | undefined
    /** Dismisses an approved or rejected pull request review. */
    dismissPullRequestReview(args: {
        input: DismissPullRequestReviewInput
    }): DismissPullRequestReviewPayload | undefined
    /** Creates a repository link for a project. */
    linkRepositoryToProject(args: {
        input: LinkRepositoryToProjectInput
    }): LinkRepositoryToProjectPayload | undefined
    /** Lock a lockable object */
    lockLockable(args: { input: LockLockableInput }): LockLockablePayload | undefined
    /** Merge a head into a branch. */
    mergeBranch(args: { input: MergeBranchInput }): MergeBranchPayload | undefined
    /** Merge a pull request. */
    mergePullRequest(args: { input: MergePullRequestInput }): MergePullRequestPayload | undefined
    /** Moves a project card to another place. */
    moveProjectCard(args: { input: MoveProjectCardInput }): MoveProjectCardPayload | undefined
    /** Moves a project column to another place. */
    moveProjectColumn(args: { input: MoveProjectColumnInput }): MoveProjectColumnPayload | undefined
    /** Removes assignees from an assignable object. */
    removeAssigneesFromAssignable(args: {
        input: RemoveAssigneesFromAssignableInput
    }): RemoveAssigneesFromAssignablePayload | undefined
    /** Removes labels from a Labelable object. */
    removeLabelsFromLabelable(args: {
        input: RemoveLabelsFromLabelableInput
    }): RemoveLabelsFromLabelablePayload | undefined
    /** Removes outside collaborator from all repositories in an organization. */
    removeOutsideCollaborator(args: {
        input: RemoveOutsideCollaboratorInput
    }): RemoveOutsideCollaboratorPayload | undefined
    /** Removes a reaction from a subject. */
    removeReaction(args: { input: RemoveReactionInput }): RemoveReactionPayload | undefined
    /** Removes a star from a Starrable. */
    removeStar(args: { input: RemoveStarInput }): RemoveStarPayload | undefined
    /** Reopen a issue. */
    reopenIssue(args: { input: ReopenIssueInput }): ReopenIssuePayload | undefined
    /** Reopen a pull request. */
    reopenPullRequest(args: { input: ReopenPullRequestInput }): ReopenPullRequestPayload | undefined
    /** Set review requests on a pull request. */
    requestReviews(args: { input: RequestReviewsInput }): RequestReviewsPayload | undefined
    /** Marks a review thread as resolved. */
    resolveReviewThread(args: {
        input: ResolveReviewThreadInput
    }): ResolveReviewThreadPayload | undefined
    /** Submits a pending pull request review. */
    submitPullRequestReview(args: {
        input: SubmitPullRequestReviewInput
    }): SubmitPullRequestReviewPayload | undefined
    /** Transfer an issue to a different repository */
    transferIssue(args: { input: TransferIssueInput }): TransferIssuePayload | undefined
    /** Deletes a repository link from a project. */
    unlinkRepositoryFromProject(args: {
        input: UnlinkRepositoryFromProjectInput
    }): UnlinkRepositoryFromProjectPayload | undefined
    /** Unlock a lockable object */
    unlockLockable(args: { input: UnlockLockableInput }): UnlockLockablePayload | undefined
    /** Unmark an issue as a duplicate of another issue. */
    unmarkIssueAsDuplicate(args: {
        input: UnmarkIssueAsDuplicateInput
    }): UnmarkIssueAsDuplicatePayload | undefined
    /** Marks a review thread as unresolved. */
    unresolveReviewThread(args: {
        input: UnresolveReviewThreadInput
    }): UnresolveReviewThreadPayload | undefined
    /** Create a new branch protection rule */
    updateBranchProtectionRule(args: {
        input: UpdateBranchProtectionRuleInput
    }): UpdateBranchProtectionRulePayload | undefined
    /** Updates an Issue. */
    updateIssue(args: { input: UpdateIssueInput }): UpdateIssuePayload | undefined
    /** Updates an IssueComment object. */
    updateIssueComment(args: {
        input: UpdateIssueCommentInput
    }): UpdateIssueCommentPayload | undefined
    /** Updates an existing project. */
    updateProject(args: { input: UpdateProjectInput }): UpdateProjectPayload | undefined
    /** Updates an existing project card. */
    updateProjectCard(args: { input: UpdateProjectCardInput }): UpdateProjectCardPayload | undefined
    /** Updates an existing project column. */
    updateProjectColumn(args: {
        input: UpdateProjectColumnInput
    }): UpdateProjectColumnPayload | undefined
    /** Update a pull request */
    updatePullRequest(args: { input: UpdatePullRequestInput }): UpdatePullRequestPayload | undefined
    /** Updates the body of a pull request review. */
    updatePullRequestReview(args: {
        input: UpdatePullRequestReviewInput
    }): UpdatePullRequestReviewPayload | undefined
    /** Updates a pull request review comment. */
    updatePullRequestReviewComment(args: {
        input: UpdatePullRequestReviewCommentInput
    }): UpdatePullRequestReviewCommentPayload | undefined
    /** Update a Git Ref. */
    updateRef(args: { input: UpdateRefInput }): UpdateRefPayload | undefined
    /** Update information about a repository. */
    updateRepository(args: { input: UpdateRepositoryInput }): UpdateRepositoryPayload | undefined
    /** Updates the state for subscribable subjects. */
    updateSubscription(args: {
        input: UpdateSubscriptionInput
    }): UpdateSubscriptionPayload | undefined
    /** Replaces the repository's topics with the given topics. */
    updateTopics(args: { input: UpdateTopicsInput }): UpdateTopicsPayload | undefined
}

/** Autogenerated return type of AddReaction */
export type AddReactionPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The reaction object. */
    reaction?: Reaction
    /** The reactable subject. */
    subject?: Reactable
}

/** Autogenerated input type of AddReaction */
export type AddReactionInput = {
    /** The Node ID of the subject to modify. */
    subjectId: ID
    /** The name of the emoji to react with. */
    content: ReactionContent
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of RemoveReaction */
export type RemoveReactionPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The reaction object. */
    reaction?: Reaction
    /** The reactable subject. */
    subject?: Reactable
}

/** Autogenerated input type of RemoveReaction */
export type RemoveReactionInput = {
    /** The Node ID of the subject to modify. */
    subjectId: ID
    /** The name of the emoji reaction to remove. */
    content: ReactionContent
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateSubscription */
export type UpdateSubscriptionPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The input subscribable entity. */
    subscribable?: Subscribable
}

/** Autogenerated input type of UpdateSubscription */
export type UpdateSubscriptionInput = {
    /** The Node ID of the subscribable object to modify. */
    subscribableId: ID
    /** The new state of the subscription. */
    state: SubscriptionState
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AddComment */
export type AddCommentPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The edge from the subject's comment connection. */
    commentEdge?: IssueCommentEdge
    /** The subject */
    subject?: Node
    /** The edge from the subject's timeline connection. */
    timelineEdge?: IssueTimelineItemEdge
}

/** Autogenerated input type of AddComment */
export type AddCommentInput = {
    /** The Node ID of the subject to modify. */
    subjectId: ID
    /** The contents of the comment. */
    body: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of MinimizeComment */
export type MinimizeCommentInput = {
    /** The Node ID of the subject to modify. */
    subjectId: ID
    /** The classification of comment */
    classifier: ReportedContentClassifiers
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** The reasons a piece of content can be reported or minimized. */
export type ReportedContentClassifiers = 'SPAM' | 'ABUSE' | 'OFF_TOPIC' | 'OUTDATED' | 'RESOLVED'

/** Autogenerated input type of UnminimizeComment */
export type UnminimizeCommentInput = {
    /** The Node ID of the subject to modify. */
    subjectId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateIssueComment */
export type UpdateIssueCommentPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated comment. */
    issueComment?: IssueComment
}

/** Autogenerated input type of UpdateIssueComment */
export type UpdateIssueCommentInput = {
    /** The ID of the IssueComment to modify. */
    id: ID
    /** The updated text of the comment. */
    body: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreateProject */
export type CreateProjectPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The new project. */
    project?: Project
}

/** Autogenerated input type of CreateProject */
export type CreateProjectInput = {
    /** The owner ID to create the project under. */
    ownerId: ID
    /** The name of project. */
    name: string
    /** The description of project. */
    body?: string
    /** The name of the GitHub-provided template. */
    template?: ProjectTemplate
    /** A list of repository IDs to create as linked repositories for the project */
    repositoryIds?: ID[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** GitHub-provided templates for Projects */
export type ProjectTemplate =
    | 'BASIC_KANBAN'
    | 'AUTOMATED_KANBAN_V2'
    | 'AUTOMATED_REVIEWS_KANBAN'
    | 'BUG_TRIAGE'

/** Autogenerated return type of UpdateProject */
export type UpdateProjectPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated project. */
    project?: Project
}

/** Autogenerated input type of UpdateProject */
export type UpdateProjectInput = {
    /** The Project ID to update. */
    projectId: ID
    /** The name of project. */
    name?: string
    /** The description of project. */
    body?: string
    /** Whether the project is open or closed. */
    state?: ProjectState
    /** Whether the project is public or not. */
    public?: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeleteProject */
export type DeleteProjectPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The repository or organization the project was removed from. */
    owner?: ProjectOwner
}

/** Autogenerated input type of DeleteProject */
export type DeleteProjectInput = {
    /** The Project ID to update. */
    projectId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CloneProject */
export type CloneProjectPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The id of the JobStatus for populating cloned fields. */
    jobStatusId?: string
    /** The new cloned project. */
    project?: Project
}

/** Autogenerated input type of CloneProject */
export type CloneProjectInput = {
    /** The owner ID to create the project under. */
    targetOwnerId: ID
    /** The source project to clone. */
    sourceId: ID
    /** Whether or not to clone the source project's workflows. */
    includeWorkflows: boolean
    /** The name of the project. */
    name: string
    /** The description of the project. */
    body?: string
    /** The visibility of the project, defaults to false (private). */
    public?: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of ImportProject */
export type ImportProjectInput = {
    /** The name of the Organization or User to create the Project under. */
    ownerName: string
    /** The name of Project. */
    name: string
    /** The description of Project. */
    body?: string
    /** Whether the Project is public or not. */
    public?: boolean
    /** A list of columns containing issues and pull requests. */
    columnImports: ProjectColumnImport[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** A project column and a list of its issues and PRs. */
export type ProjectColumnImport = {
    /** The name of the column. */
    columnName: string
    /** The position of the column, starting from 0. */
    position: Int
    /** A list of issues and pull requests in the column. */
    issues?: ProjectCardImport[]
}

/** An issue or PR and its owning repository to be used in a project card. */
export type ProjectCardImport = {
    /** Repository name with owner (owner/repository). */
    repository: string
    /** The issue or pull request number. */
    number: Int
}

/** Autogenerated return type of AddProjectColumn */
export type AddProjectColumnPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The edge from the project's column connection. */
    columnEdge?: ProjectColumnEdge
    /** The project */
    project?: Project
}

/** Autogenerated input type of AddProjectColumn */
export type AddProjectColumnInput = {
    /** The Node ID of the project. */
    projectId: ID
    /** The name of the column. */
    name: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of MoveProjectColumn */
export type MoveProjectColumnPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The new edge of the moved column. */
    columnEdge?: ProjectColumnEdge
}

/** Autogenerated input type of MoveProjectColumn */
export type MoveProjectColumnInput = {
    /** The id of the column to move. */
    columnId: ID
    /** Place the new column after the column with this id. Pass null to place it at the front. */
    afterColumnId?: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateProjectColumn */
export type UpdateProjectColumnPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated project column. */
    projectColumn?: ProjectColumn
}

/** Autogenerated input type of UpdateProjectColumn */
export type UpdateProjectColumnInput = {
    /** The ProjectColumn ID to update. */
    projectColumnId: ID
    /** The name of project column. */
    name: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeleteProjectColumn */
export type DeleteProjectColumnPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The deleted column ID. */
    deletedColumnId?: ID
    /** The project the deleted column was in. */
    project?: Project
}

/** Autogenerated input type of DeleteProjectColumn */
export type DeleteProjectColumnInput = {
    /** The id of the column to delete. */
    columnId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AddProjectCard */
export type AddProjectCardPayload = GQLType & {
    /** The edge from the ProjectColumn's card connection. */
    cardEdge?: ProjectCardEdge
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The ProjectColumn */
    projectColumn?: ProjectColumn
}

/** Autogenerated input type of AddProjectCard */
export type AddProjectCardInput = {
    /** The Node ID of the ProjectColumn. */
    projectColumnId: ID
    /** The content of the card. Must be a member of the ProjectCardItem union */
    contentId?: ID
    /** The note on the card. */
    note?: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateProjectCard */
export type UpdateProjectCardPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated ProjectCard. */
    projectCard?: ProjectCard
}

/** Autogenerated input type of UpdateProjectCard */
export type UpdateProjectCardInput = {
    /** The ProjectCard ID to update. */
    projectCardId: ID
    /** Whether or not the ProjectCard should be archived */
    isArchived?: boolean
    /** The note of ProjectCard. */
    note?: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of MoveProjectCard */
export type MoveProjectCardPayload = GQLType & {
    /** The new edge of the moved card. */
    cardEdge?: ProjectCardEdge
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of MoveProjectCard */
export type MoveProjectCardInput = {
    /** The id of the card to move. */
    cardId: ID
    /** The id of the column to move it into. */
    columnId: ID
    /** Place the new card after the card with this id. Pass null to place it at the top. */
    afterCardId?: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeleteProjectCard */
export type DeleteProjectCardPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The column the deleted card was in. */
    column?: ProjectColumn
    /** The deleted card ID. */
    deletedCardId?: ID
}

/** Autogenerated input type of DeleteProjectCard */
export type DeleteProjectCardInput = {
    /** The id of the card to delete. */
    cardId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of LinkRepositoryToProject */
export type LinkRepositoryToProjectPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The linked Project. */
    project?: Project
    /** The linked Repository. */
    repository?: Repository
}

/** Autogenerated input type of LinkRepositoryToProject */
export type LinkRepositoryToProjectInput = {
    /** The ID of the Project to link to a Repository */
    projectId: ID
    /** The ID of the Repository to link to a Project. */
    repositoryId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UnlinkRepositoryFromProject */
export type UnlinkRepositoryFromProjectPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The linked Project. */
    project?: Project
    /** The linked Repository. */
    repository?: Repository
}

/** Autogenerated input type of UnlinkRepositoryFromProject */
export type UnlinkRepositoryFromProjectInput = {
    /** The ID of the Project linked to the Repository. */
    projectId: ID
    /** The ID of the Repository linked to the Project. */
    repositoryId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ConvertProjectCardNoteToIssue */
export type ConvertProjectCardNoteToIssuePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated ProjectCard. */
    projectCard?: ProjectCard
}

/** Autogenerated input type of ConvertProjectCardNoteToIssue */
export type ConvertProjectCardNoteToIssueInput = {
    /** The ProjectCard ID to convert. */
    projectCardId: ID
    /** The ID of the repository to create the issue in. */
    repositoryId: ID
    /** The title of the newly created issue. Defaults to the card's note text. */
    title?: string
    /** The body of the newly created issue. */
    body?: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UnmarkIssueAsDuplicate */
export type UnmarkIssueAsDuplicatePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The issue or pull request that was marked as a duplicate. */
    duplicate?: IssueOrPullRequest
}

/** Autogenerated input type of UnmarkIssueAsDuplicate */
export type UnmarkIssueAsDuplicateInput = {
    /** ID of the issue or pull request currently marked as a duplicate. */
    duplicateId: ID
    /** ID of the issue or pull request currently considered canonical/authoritative/original. */
    canonicalId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of LockLockable */
export type LockLockablePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The item that was locked. */
    lockedRecord?: Lockable
}

/** Autogenerated input type of LockLockable */
export type LockLockableInput = {
    /** ID of the issue or pull request to be locked. */
    lockableId: ID
    /** A reason for why the issue or pull request will be locked. */
    lockReason?: LockReason
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UnlockLockable */
export type UnlockLockablePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The item that was unlocked. */
    unlockedRecord?: Lockable
}

/** Autogenerated input type of UnlockLockable */
export type UnlockLockableInput = {
    /** ID of the issue or pull request to be unlocked. */
    lockableId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AddAssigneesToAssignable */
export type AddAssigneesToAssignablePayload = GQLType & {
    /** The item that was assigned. */
    assignable?: Assignable
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of AddAssigneesToAssignable */
export type AddAssigneesToAssignableInput = {
    /** The id of the assignable object to add assignees to. */
    assignableId: ID
    /** The id of users to add as assignees. */
    assigneeIds: ID[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of RemoveAssigneesFromAssignable */
export type RemoveAssigneesFromAssignablePayload = GQLType & {
    /** The item that was unassigned. */
    assignable?: Assignable
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of RemoveAssigneesFromAssignable */
export type RemoveAssigneesFromAssignableInput = {
    /** The id of the assignable object to remove assignees from. */
    assignableId: ID
    /** The id of users to remove as assignees. */
    assigneeIds: ID[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AddLabelsToLabelable */
export type AddLabelsToLabelablePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The item that was labeled. */
    labelable?: Labelable
}

/** Autogenerated input type of AddLabelsToLabelable */
export type AddLabelsToLabelableInput = {
    /** The id of the labelable object to add labels to. */
    labelableId: ID
    /** The ids of the labels to add. */
    labelIds: ID[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreateIssue */
export type CreateIssuePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The new issue. */
    issue?: Issue
}

/** Autogenerated input type of CreateIssue */
export type CreateIssueInput = {
    /** The Node ID of the repository. */
    repositoryId: ID
    /** The title for the issue. */
    title: string
    /** The body for the issue description. */
    body?: string
    /** The Node ID for the user assignee for this issue. */
    assigneeIds?: ID[]
    /** The Node ID of the milestone for this issue. */
    milestoneId?: ID
    /** An array of Node IDs of labels for this issue. */
    labelIds?: ID[]
    /** An array of Node IDs for projects associated with this issue. */
    projectIds?: ID[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ClearLabelsFromLabelable */
export type ClearLabelsFromLabelablePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The item that was unlabeled. */
    labelable?: Labelable
}

/** Autogenerated input type of ClearLabelsFromLabelable */
export type ClearLabelsFromLabelableInput = {
    /** The id of the labelable object to clear the labels from. */
    labelableId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of RemoveLabelsFromLabelable */
export type RemoveLabelsFromLabelablePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The Labelable the labels were removed from. */
    labelable?: Labelable
}

/** Autogenerated input type of RemoveLabelsFromLabelable */
export type RemoveLabelsFromLabelableInput = {
    /** The id of the Labelable to remove labels from. */
    labelableId: ID
    /** The ids of labels to remove. */
    labelIds: ID[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CloseIssue */
export type CloseIssuePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The issue that was closed. */
    issue?: Issue
}

/** Autogenerated input type of CloseIssue */
export type CloseIssueInput = {
    /** ID of the issue to be closed. */
    issueId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ReopenIssue */
export type ReopenIssuePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The issue that was opened. */
    issue?: Issue
}

/** Autogenerated input type of ReopenIssue */
export type ReopenIssueInput = {
    /** ID of the issue to be opened. */
    issueId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of TransferIssue */
export type TransferIssuePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The issue that was transferred */
    issue?: Issue
}

/** Autogenerated input type of TransferIssue */
export type TransferIssueInput = {
    /** The Node ID of the issue to be transferred */
    issueId: ID
    /** The Node ID of the repository the issue should be transferred to */
    repositoryId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeleteIssueComment */
export type DeleteIssueCommentPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of DeleteIssueComment */
export type DeleteIssueCommentInput = {
    /** The ID of the comment to delete. */
    id: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateIssue */
export type UpdateIssuePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The issue. */
    issue?: Issue
}

/** Autogenerated input type of UpdateIssue */
export type UpdateIssueInput = {
    /** The ID of the Issue to modify. */
    id: ID
    /** The title for the issue. */
    title?: string
    /** The body for the issue description. */
    body?: string
    /** An array of Node IDs of users for this issue. */
    assigneeIds?: ID[]
    /** The Node ID of the milestone for this issue. */
    milestoneId?: ID
    /** An array of Node IDs of labels for this issue. */
    labelIds?: ID[]
    /** The desired issue state. */
    state?: IssueState
    /** An array of Node IDs for projects associated with this issue. */
    projectIds?: ID[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeleteIssue */
export type DeleteIssuePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The repository the issue belonged to */
    repository?: Repository
}

/** Autogenerated input type of DeleteIssue */
export type DeleteIssueInput = {
    /** The ID of the issue to delete. */
    issueId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of PinIssue */
export type PinIssueInput = {
    /** The ID of the issue to be pinned */
    issueId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UnpinIssue */
export type UnpinIssueInput = {
    /** The ID of the issue to be unpinned */
    issueId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreatePullRequest */
export type CreatePullRequestPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The new pull request. */
    pullRequest?: PullRequest
}

/** Autogenerated input type of CreatePullRequest */
export type CreatePullRequestInput = {
    /** The Node ID of the repository. */
    repositoryId: ID
    /** The name of the branch you want your changes pulled into. This should be an existing branch
on the current repository. You cannot update the base branch on a pull request to point
to another repository.
 */
    baseRefName: string
    /** The name of the branch where your changes are implemented. For cross-repository pull requests
in the same network, namespace `head_ref_name` with a user like this: `username:branch`.
 */
    headRefName: string
    /** The title of the pull request. */
    title: string
    /** The contents of the pull request. */
    body?: string
    /** Indicates whether maintainers can modify the pull request. */
    maintainerCanModify?: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdatePullRequest */
export type UpdatePullRequestPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated pull request. */
    pullRequest?: PullRequest
}

/** Autogenerated input type of UpdatePullRequest */
export type UpdatePullRequestInput = {
    /** The Node ID of the pull request. */
    pullRequestId: ID
    /** The name of the branch you want your changes pulled into. This should be an existing branch
on the current repository.
 */
    baseRefName?: string
    /** The title of the pull request. */
    title?: string
    /** The contents of the pull request. */
    body?: string
    /** Indicates whether maintainers can modify the pull request. */
    maintainerCanModify?: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ClosePullRequest */
export type ClosePullRequestPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The pull request that was closed. */
    pullRequest?: PullRequest
}

/** Autogenerated input type of ClosePullRequest */
export type ClosePullRequestInput = {
    /** ID of the pull request to be closed. */
    pullRequestId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ReopenPullRequest */
export type ReopenPullRequestPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The pull request that was reopened. */
    pullRequest?: PullRequest
}

/** Autogenerated input type of ReopenPullRequest */
export type ReopenPullRequestInput = {
    /** ID of the pull request to be reopened. */
    pullRequestId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of MergePullRequest */
export type MergePullRequestPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The pull request that was merged. */
    pullRequest?: PullRequest
}

/** Autogenerated input type of MergePullRequest */
export type MergePullRequestInput = {
    /** ID of the pull request to be merged. */
    pullRequestId: ID
    /** Commit headline to use for the merge commit; if omitted, a default message will be used. */
    commitHeadline?: string
    /** Commit body to use for the merge commit; if omitted, a default message will be used */
    commitBody?: string
    /** OID that the pull request head ref must match to allow merge; if omitted, no check is performed. */
    expectedHeadOid?: GitObjectID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeletePullRequestReviewComment */
export type DeletePullRequestReviewCommentPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The pull request review the deleted comment belonged to. */
    pullRequestReview?: PullRequestReview
}

/** Autogenerated input type of DeletePullRequestReviewComment */
export type DeletePullRequestReviewCommentInput = {
    /** The ID of the comment to delete. */
    id: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AddPullRequestReview */
export type AddPullRequestReviewPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The newly created pull request review. */
    pullRequestReview?: PullRequestReview
    /** The edge from the pull request's review connection. */
    reviewEdge?: PullRequestReviewEdge
}

/** Autogenerated input type of AddPullRequestReview */
export type AddPullRequestReviewInput = {
    /** The Node ID of the pull request to modify. */
    pullRequestId: ID
    /** The commit OID the review pertains to. */
    commitOID?: GitObjectID
    /** The contents of the review body comment. */
    body?: string
    /** The event to perform on the pull request review. */
    event?: PullRequestReviewEvent
    /** The review line comments. */
    comments?: DraftPullRequestReviewComment[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** The possible events to perform on a pull request review. */
export type PullRequestReviewEvent = 'COMMENT' | 'APPROVE' | 'REQUEST_CHANGES' | 'DISMISS'

/** Specifies a review comment to be left with a Pull Request Review. */
export type DraftPullRequestReviewComment = {
    /** Path to the file being commented on. */
    path: string
    /** Position in the file to leave a comment on. */
    position: Int
    /** Body of the comment to leave. */
    body: string
}

/** Autogenerated return type of SubmitPullRequestReview */
export type SubmitPullRequestReviewPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The submitted pull request review. */
    pullRequestReview?: PullRequestReview
}

/** Autogenerated input type of SubmitPullRequestReview */
export type SubmitPullRequestReviewInput = {
    /** The Pull Request Review ID to submit. */
    pullRequestReviewId: ID
    /** The event to send to the Pull Request Review. */
    event: PullRequestReviewEvent
    /** The text field to set on the Pull Request Review. */
    body?: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdatePullRequestReview */
export type UpdatePullRequestReviewPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated pull request review. */
    pullRequestReview?: PullRequestReview
}

/** Autogenerated input type of UpdatePullRequestReview */
export type UpdatePullRequestReviewInput = {
    /** The Node ID of the pull request review to modify. */
    pullRequestReviewId: ID
    /** The contents of the pull request review body. */
    body: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DismissPullRequestReview */
export type DismissPullRequestReviewPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The dismissed pull request review. */
    pullRequestReview?: PullRequestReview
}

/** Autogenerated input type of DismissPullRequestReview */
export type DismissPullRequestReviewInput = {
    /** The Node ID of the pull request review to modify. */
    pullRequestReviewId: ID
    /** The contents of the pull request review dismissal message. */
    message: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeletePullRequestReview */
export type DeletePullRequestReviewPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The deleted pull request review. */
    pullRequestReview?: PullRequestReview
}

/** Autogenerated input type of DeletePullRequestReview */
export type DeletePullRequestReviewInput = {
    /** The Node ID of the pull request review to delete. */
    pullRequestReviewId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ResolveReviewThread */
export type ResolveReviewThreadPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The thread to resolve. */
    thread?: PullRequestReviewThread
}

/** Autogenerated input type of ResolveReviewThread */
export type ResolveReviewThreadInput = {
    /** The ID of the thread to resolve */
    threadId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UnresolveReviewThread */
export type UnresolveReviewThreadPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The thread to resolve. */
    thread?: PullRequestReviewThread
}

/** Autogenerated input type of UnresolveReviewThread */
export type UnresolveReviewThreadInput = {
    /** The ID of the thread to unresolve */
    threadId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AddPullRequestReviewComment */
export type AddPullRequestReviewCommentPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The newly created comment. */
    comment?: PullRequestReviewComment
    /** The edge from the review's comment connection. */
    commentEdge?: PullRequestReviewCommentEdge
}

/** Autogenerated input type of AddPullRequestReviewComment */
export type AddPullRequestReviewCommentInput = {
    /** The Node ID of the review to modify. */
    pullRequestReviewId: ID
    /** The SHA of the commit to comment on. */
    commitOID?: GitObjectID
    /** The text of the comment. */
    body: string
    /** The relative path of the file to comment on. */
    path?: string
    /** The line index in the diff to comment on. */
    position?: Int
    /** The comment id to reply to. */
    inReplyTo?: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdatePullRequestReviewComment */
export type UpdatePullRequestReviewCommentPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated comment. */
    pullRequestReviewComment?: PullRequestReviewComment
}

/** Autogenerated input type of UpdatePullRequestReviewComment */
export type UpdatePullRequestReviewCommentInput = {
    /** The Node ID of the comment to modify. */
    pullRequestReviewCommentId: ID
    /** The text of the comment. */
    body: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseProfile */
export type UpdateEnterpriseProfileInput = {
    /** The Enterprise ID to update. */
    enterpriseId: ID
    /** The name of the enterprise. */
    name?: string
    /** The description of the enterprise. */
    description?: string
    /** The URL of the enterprise's website. */
    websiteUrl?: string
    /** The location of the enterprise. */
    location?: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of InviteEnterpriseAdmin */
export type InviteEnterpriseAdminInput = {
    /** The ID of the enterprise to which you want to invite an administrator. */
    enterpriseId: ID
    /** The login of a user to invite as an administrator. */
    invitee?: string
    /** The email of the person to invite as an administrator. */
    email?: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of AcceptEnterpriseAdministratorInvitation */
export type AcceptEnterpriseAdministratorInvitationInput = {
    /** The id of the invitation being accepted */
    invitationId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of CancelEnterpriseAdminInvitation */
export type CancelEnterpriseAdminInvitationInput = {
    /** The Node ID of the pending enterprise administrator invitation. */
    invitationId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of RemoveEnterpriseAdmin */
export type RemoveEnterpriseAdminInput = {
    /** The Enterprise ID from which to remove the administrator. */
    enterpriseId: ID
    /** The login of the user to remove as an administrator. */
    login: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of RemoveEnterpriseOrganization */
export type RemoveEnterpriseOrganizationInput = {
    /** The ID of the enterprise from which the organization should be removed. */
    enterpriseId: ID
    /** The ID of the organization to remove from the enterprise. */
    organizationId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of CreateEnterpriseOrganization */
export type CreateEnterpriseOrganizationInput = {
    /** The ID of the enterprise owning the new organization. */
    enterpriseId: ID
    /** The login of the new organization. */
    login: string
    /** The profile name of the new organization. */
    profileName: string
    /** The email used for sending billing receipts. */
    billingEmail: string
    /** The logins for the administrators of the new organization. */
    adminLogins: string[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of RegenerateEnterpriseIdentityProviderRecoveryCodes */
export type RegenerateEnterpriseIdentityProviderRecoveryCodesInput = {
    /** The ID of the enterprise on which to set an identity provider. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanCreateRepositoriesSetting */
export type UpdateEnterpriseMembersCanCreateRepositoriesSettingInput = {
    /** The ID of the enterprise on which to set the members can create repositories setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseAllowPrivateRepositoryForkingSetting */
export type UpdateEnterpriseAllowPrivateRepositoryForkingSettingInput = {
    /** The ID of the enterprise on which to set the allow private repository forking setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseDefaultRepositoryPermissionSetting */
export type UpdateEnterpriseDefaultRepositoryPermissionSettingInput = {
    /** The ID of the enterprise on which to set the default repository permission setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseTeamDiscussionsSetting */
export type UpdateEnterpriseTeamDiscussionsSettingInput = {
    /** The ID of the enterprise on which to set the team discussions setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseOrganizationProjectsSetting */
export type UpdateEnterpriseOrganizationProjectsSettingInput = {
    /** The ID of the enterprise on which to set the organization projects setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseRepositoryProjectsSetting */
export type UpdateEnterpriseRepositoryProjectsSettingInput = {
    /** The ID of the enterprise on which to set the repository projects setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanChangeRepositoryVisibilitySetting */
export type UpdateEnterpriseMembersCanChangeRepositoryVisibilitySettingInput = {
    /** The ID of the enterprise on which to set the members can change repository visibility setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanInviteCollaboratorsSetting */
export type UpdateEnterpriseMembersCanInviteCollaboratorsSettingInput = {
    /** The ID of the enterprise on which to set the members can invite collaborators setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanDeleteRepositoriesSetting */
export type UpdateEnterpriseMembersCanDeleteRepositoriesSettingInput = {
    /** The ID of the enterprise on which to set the members can delete repositories setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanMakePurchasesSetting */
export type UpdateEnterpriseMembersCanMakePurchasesSettingInput = {
    /** The ID of the enterprise on which to set the members can make purchases setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseTwoFactorAuthenticationRequiredSetting */
export type UpdateEnterpriseTwoFactorAuthenticationRequiredSettingInput = {
    /** The ID of the enterprise on which to set the two factor authentication required setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanUpdateProtectedBranchesSetting */
export type UpdateEnterpriseMembersCanUpdateProtectedBranchesSettingInput = {
    /** The ID of the enterprise on which to set the members can update protected branches setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanDeleteIssuesSetting */
export type UpdateEnterpriseMembersCanDeleteIssuesSettingInput = {
    /** The ID of the enterprise on which to set the members can delete issues setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseMembersCanViewDependencyInsightsSetting */
export type UpdateEnterpriseMembersCanViewDependencyInsightsSettingInput = {
    /** The ID of the enterprise on which to set the members can view dependency insights setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseActionExecutionCapabilitySetting */
export type UpdateEnterpriseActionExecutionCapabilitySettingInput = {
    /** The ID of the enterprise on which to set the members can create repositories setting. */
    enterpriseId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateEnterpriseAdministratorRole */
export type UpdateEnterpriseAdministratorRoleInput = {
    /** The ID of the Enterprise which the admin belongs to. */
    enterpriseId: ID
    /** The login of a administrator whose role is being changed. */
    login: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of RemoveOutsideCollaborator */
export type RemoveOutsideCollaboratorPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The user that was removed as an outside collaborator. */
    removedUser?: User
}

/** Autogenerated input type of RemoveOutsideCollaborator */
export type RemoveOutsideCollaboratorInput = {
    /** The ID of the outside collaborator to remove. */
    userId: ID
    /** The ID of the organization to remove the outside collaborator from. */
    organizationId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of RequestReviews */
export type RequestReviewsPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The pull request that is getting requests. */
    pullRequest?: PullRequest
    /** The edge from the pull request to the requested reviewers. */
    requestedReviewersEdge?: UserEdge
}

/** Autogenerated input type of RequestReviews */
export type RequestReviewsInput = {
    /** The Node ID of the pull request to modify. */
    pullRequestId: ID
    /** The Node IDs of the user to request. */
    userIds?: ID[]
    /** The Node IDs of the team to request. */
    teamIds?: ID[]
    /** Add users to the set rather than replace. */
    union?: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** The possible states of a registry package file. */
export type RegistryPackageFileState = 'NEW' | 'UPLOADED'

/** Autogenerated return type of CloneTemplateRepository */
export type CloneTemplateRepositoryPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The new repository. */
    repository?: Repository
}

/** Autogenerated input type of CloneTemplateRepository */
export type CloneTemplateRepositoryInput = {
    /** The Node ID of the template repository. */
    repositoryId: ID
    /** The name of the new repository. */
    name: string
    /** The ID of the owner for the new repository. */
    ownerId: ID
    /** A short description of the new repository. */
    description?: string
    /** Indicates the repository's visibility level. */
    visibility: RepositoryVisibility
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreateRepository */
export type CreateRepositoryPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The new repository. */
    repository?: Repository
}

/** Autogenerated input type of CreateRepository */
export type CreateRepositoryInput = {
    /** The name of the new repository. */
    name: string
    /** The ID of the owner for the new repository. */
    ownerId?: ID
    /** A short description of the new repository. */
    description?: string
    /** Indicates the repository's visibility level. */
    visibility: RepositoryVisibility
    /** Whether this repository should be marked as a template such that anyone who can access it can create new repositories with the same files and directory structure. */
    template?: boolean
    /** The URL for a web page about this repository. */
    homepageUrl?: URI
    /** Indicates if the repository should have the wiki feature enabled. */
    hasWikiEnabled?: boolean
    /** Indicates if the repository should have the issues feature enabled. */
    hasIssuesEnabled?: boolean
    /** When an organization is specified as the owner, this ID identifies the team that should be granted access to the new repository. */
    teamId?: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateRepository */
export type UpdateRepositoryPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated repository. */
    repository?: Repository
}

/** Autogenerated input type of UpdateRepository */
export type UpdateRepositoryInput = {
    /** The ID of the repository to update. */
    repositoryId: ID
    /** The new name of the repository. */
    name?: string
    /** A new description for the repository. Pass an empty string to erase the existing description. */
    description?: string
    /** Whether this repository should be marked as a template such that anyone who can access it can create new repositories with the same files and directory structure. */
    template?: boolean
    /** The URL for a web page about this repository. Pass an empty string to erase the existing URL. */
    homepageUrl?: URI
    /** Indicates if the repository should have the wiki feature enabled. */
    hasWikiEnabled?: boolean
    /** Indicates if the repository should have the issues feature enabled. */
    hasIssuesEnabled?: boolean
    /** Indicates if the repository should have the project boards feature enabled. */
    hasProjectsEnabled?: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreateRef */
export type CreateRefPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The newly created ref. */
    ref?: Ref
}

/** Autogenerated input type of CreateRef */
export type CreateRefInput = {
    /** The Node ID of the Repository to create the Ref in. */
    repositoryId: ID
    /** The fully qualified name of the new Ref (ie: `refs/heads/my_new_branch`). */
    name: string
    /** The GitObjectID that the new Ref shall target. Must point to a commit. */
    oid: GitObjectID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateRef */
export type UpdateRefPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The updated Ref. */
    ref?: Ref
}

/** Autogenerated input type of UpdateRef */
export type UpdateRefInput = {
    /** The Node ID of the Ref to be updated. */
    refId: ID
    /** The GitObjectID that the Ref shall be updated to target. */
    oid: GitObjectID
    /** Permit updates of branch Refs that are not fast-forwards? */
    force?: boolean
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeleteRef */
export type DeleteRefPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of DeleteRef */
export type DeleteRefInput = {
    /** The Node ID of the Ref to be deleted. */
    refId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of MergeBranch */
export type MergeBranchPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The resulting merge Commit. */
    mergeCommit?: Commit
}

/** Autogenerated input type of MergeBranch */
export type MergeBranchInput = {
    /** The Node ID of the Repository containing the base branch that will be modified. */
    repositoryId: ID
    /** The name of the base branch that the provided head will be merged into. */
    base: string
    /** The head to merge into the base branch. This can be a branch name or a commit GitObjectID. */
    head: string
    /** Message to use for the merge commit. If omitted, a default will be used. */
    commitMessage?: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AddStar */
export type AddStarPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The starrable. */
    starrable?: Starrable
}

/** Autogenerated input type of AddStar */
export type AddStarInput = {
    /** The Starrable ID to star. */
    starrableId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of RemoveStar */
export type RemoveStarPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The starrable. */
    starrable?: Starrable
}

/** Autogenerated input type of RemoveStar */
export type RemoveStarInput = {
    /** The Starrable ID to unstar. */
    starrableId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of AcceptTopicSuggestion */
export type AcceptTopicSuggestionPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The accepted topic. */
    topic?: Topic
}

/** Autogenerated input type of AcceptTopicSuggestion */
export type AcceptTopicSuggestionInput = {
    /** The Node ID of the repository. */
    repositoryId: ID
    /** The name of the suggested topic. */
    name: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeclineTopicSuggestion */
export type DeclineTopicSuggestionPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** The declined topic. */
    topic?: Topic
}

/** Autogenerated input type of DeclineTopicSuggestion */
export type DeclineTopicSuggestionInput = {
    /** The Node ID of the repository. */
    repositoryId: ID
    /** The name of the suggested topic. */
    name: string
    /** The reason why the suggested topic is declined. */
    reason: TopicSuggestionDeclineReason
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Reason that the suggested topic is declined. */
export type TopicSuggestionDeclineReason =
    | 'NOT_RELEVANT'
    | 'TOO_SPECIFIC'
    | 'PERSONAL_PREFERENCE'
    | 'TOO_GENERAL'

/** Autogenerated return type of UpdateTopics */
export type UpdateTopicsPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Names of the provided topics that are not valid. */
    invalidTopicNames?: string[]
    /** The updated repository. */
    repository?: Repository
}

/** Autogenerated input type of UpdateTopics */
export type UpdateTopicsInput = {
    /** The Node ID of the repository. */
    repositoryId: ID
    /** An array of topic names. */
    topicNames: string[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of CreateBranchProtectionRule */
export type CreateBranchProtectionRulePayload = GQLType & {
    /** The newly created BranchProtectionRule. */
    branchProtectionRule?: BranchProtectionRule
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of CreateBranchProtectionRule */
export type CreateBranchProtectionRuleInput = {
    /** The global relay id of the repository in which a new branch protection rule should be created in. */
    repositoryId: ID
    /** The glob-like pattern used to determine matching branches. */
    pattern: string
    /** Are approving reviews required to update matching branches. */
    requiresApprovingReviews?: boolean
    /** Number of approving reviews required to update matching branches. */
    requiredApprovingReviewCount?: Int
    /** Are commits required to be signed. */
    requiresCommitSignatures?: boolean
    /** Can admins overwrite branch protection. */
    isAdminEnforced?: boolean
    /** Are status checks required to update matching branches. */
    requiresStatusChecks?: boolean
    /** Are branches required to be up to date before merging. */
    requiresStrictStatusChecks?: boolean
    /** Are reviews from code owners required to update matching branches. */
    requiresCodeOwnerReviews?: boolean
    /** Will new commits pushed to matching branches dismiss pull request review approvals. */
    dismissesStaleReviews?: boolean
    /** Is dismissal of pull request reviews restricted. */
    restrictsReviewDismissals?: boolean
    /** A list of User or Team IDs allowed to dismiss reviews on pull requests targeting matching branches. */
    reviewDismissalActorIds?: ID[]
    /** Is pushing to matching branches restricted. */
    restrictsPushes?: boolean
    /** A list of User or Team IDs allowed to push to matching branches. */
    pushActorIds?: ID[]
    /** List of required status check contexts that must pass for commits to be accepted to matching branches. */
    requiredStatusCheckContexts?: string[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of UpdateBranchProtectionRule */
export type UpdateBranchProtectionRulePayload = GQLType & {
    /** The newly created BranchProtectionRule. */
    branchProtectionRule?: BranchProtectionRule
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of UpdateBranchProtectionRule */
export type UpdateBranchProtectionRuleInput = {
    /** The global relay id of the branch protection rule to be updated. */
    branchProtectionRuleId: ID
    /** The glob-like pattern used to determine matching branches. */
    pattern?: string
    /** Are approving reviews required to update matching branches. */
    requiresApprovingReviews?: boolean
    /** Number of approving reviews required to update matching branches. */
    requiredApprovingReviewCount?: Int
    /** Are commits required to be signed. */
    requiresCommitSignatures?: boolean
    /** Can admins overwrite branch protection. */
    isAdminEnforced?: boolean
    /** Are status checks required to update matching branches. */
    requiresStatusChecks?: boolean
    /** Are branches required to be up to date before merging. */
    requiresStrictStatusChecks?: boolean
    /** Are reviews from code owners required to update matching branches. */
    requiresCodeOwnerReviews?: boolean
    /** Will new commits pushed to matching branches dismiss pull request review approvals. */
    dismissesStaleReviews?: boolean
    /** Is dismissal of pull request reviews restricted. */
    restrictsReviewDismissals?: boolean
    /** A list of User or Team IDs allowed to dismiss reviews on pull requests targeting matching branches. */
    reviewDismissalActorIds?: ID[]
    /** Is pushing to matching branches restricted. */
    restrictsPushes?: boolean
    /** A list of User or Team IDs allowed to push to matching branches. */
    pushActorIds?: ID[]
    /** List of required status check contexts that must pass for commits to be accepted to matching branches. */
    requiredStatusCheckContexts?: string[]
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of DeleteBranchProtectionRule */
export type DeleteBranchProtectionRulePayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated input type of DeleteBranchProtectionRule */
export type DeleteBranchProtectionRuleInput = {
    /** The global relay id of the branch protection rule to be deleted. */
    branchProtectionRuleId: ID
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Autogenerated return type of ChangeUserStatus */
export type ChangeUserStatusPayload = GQLType & {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
    /** Your updated status. */
    status?: UserStatus
}

/** Autogenerated input type of ChangeUserStatus */
export type ChangeUserStatusInput = {
    /** The emoji to represent your status. Can either be a native Unicode emoji or an emoji name with colons, e.g., :grinning:. */
    emoji?: string
    /** A short description of your current status. */
    message?: string
    /** The ID of the organization whose members will be allowed to see the status. If omitted, the status will be publicly visible. */
    organizationId?: ID
    /** Whether this status should indicate you are not fully available on GitHub, e.g., you are away. */
    limitedAvailability?: boolean
    /** If set, the user status will not be shown after this date. */
    expiresAt?: DateTime
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** A content attachment */
export type ContentAttachment = GQLType & {
    /** The body text of the content attachment. This parameter supports markdown. */
    body: string
    /** The content reference that the content attachment is attached to. */
    contentReference: ContentReference
    /** Identifies the primary key from the database. */
    databaseId: Int
    id: ID
    /** The title of the content attachment. */
    title: string
}

/** A content reference */
export type ContentReference = GQLType & {
    /** Identifies the primary key from the database. */
    databaseId: Int
    id: ID
    /** The reference of the content reference. */
    reference: string
}

/** Autogenerated input type of CreateContentAttachment */
export type CreateContentAttachmentInput = {
    /** The node ID of the content_reference. */
    contentReferenceId: ID
    /** The title of the content attachment. */
    title: string
    /** The body of the content attachment, which may contain markdown. */
    body: string
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: string
}

/** Represents a GPG signature on a Commit or Tag. */
export type GpgSignature = GQLType & {
    /** Email used to sign this object. */
    email: string
    /** True if the signature is valid and verified by GitHub. */
    isValid: boolean
    /** Hex-encoded ID of the key that signed this object. */
    keyId?: string
    /** Payload for GPG signing object. Raw ODB object without the signature header. */
    payload: string
    /** ASCII-armored signature header from object. */
    signature: string
    /** GitHub user corresponding to the email signing this commit. */
    signer?: User
    /** The state of this signature. `VALID` if signature is valid and verified by GitHub, otherwise represents reason why signature is considered invalid. */
    state: GitSignatureState
    /** True if the signature was made with GitHub's signing key. */
    wasSignedByGitHub: boolean
}

/** Represents an S/MIME signature on a Commit or Tag. */
export type SmimeSignature = GQLType & {
    /** Email used to sign this object. */
    email: string
    /** True if the signature is valid and verified by GitHub. */
    isValid: boolean
    /** Payload for GPG signing object. Raw ODB object without the signature header. */
    payload: string
    /** ASCII-armored signature header from object. */
    signature: string
    /** GitHub user corresponding to the email signing this commit. */
    signer?: User
    /** The state of this signature. `VALID` if signature is valid and verified by GitHub, otherwise represents reason why signature is considered invalid. */
    state: GitSignatureState
    /** True if the signature was made with GitHub's signing key. */
    wasSignedByGitHub: boolean
}

/** Represents a Git tag. */
export type Tag = GQLType & {
    /** An abbreviated version of the Git object ID */
    abbreviatedOid: string
    /** The HTTP path for this Git object */
    commitResourcePath: URI
    /** The HTTP URL for this Git object */
    commitUrl: URI
    id: ID
    /** The Git tag message. */
    message?: string
    /** The Git tag name. */
    name: string
    /** The Git object ID */
    oid: GitObjectID
    /** The Repository the Git object belongs to */
    repository: Repository
    /** Details about the tag author. */
    tagger?: GitActor
    /** The Git object the tag points to. */
    target: GitObject
}

/** Represents an unknown signature on a Commit or Tag. */
export type UnknownSignature = GQLType & {
    /** Email used to sign this object. */
    email: string
    /** True if the signature is valid and verified by GitHub. */
    isValid: boolean
    /** Payload for GPG signing object. Raw ODB object without the signature header. */
    payload: string
    /** ASCII-armored signature header from object. */
    signature: string
    /** GitHub user corresponding to the email signing this commit. */
    signer?: User
    /** The state of this signature. `VALID` if signature is valid and verified by GitHub, otherwise represents reason why signature is considered invalid. */
    state: GitSignatureState
    /** True if the signature was made with GitHub's signing key. */
    wasSignedByGitHub: boolean
}
