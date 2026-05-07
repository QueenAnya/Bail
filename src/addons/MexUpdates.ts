/**
 * MEX Operation Name Constants
 * Ported from innovatorssoft/Baileys
 */

export const MexUpdatesOperations = {
	OWNER_COMMUNITY: 'NotificationCommunityOwnerUpdate',
	GROUP_MEMBER_LINK: 'NotificationGroupMemberLinkPropertyUpdate',
	GROUP_LIMIT_SHARING: 'NotificationGroupLimitSharingPropertyUpdate'
} as const

export const XWAPathsMexUpdates = {
	GROUP_SHARING_CHANGE: 'xwa2_notify_group_on_prop_change',
	COMMUNITY_OWNER_CHANGE: 'xwa2_notify_group_on_participants_roles_change'
} as const

export type MexUpdatesOperationKey = keyof typeof MexUpdatesOperations
export type MexUpdatesOperationValue = (typeof MexUpdatesOperations)[MexUpdatesOperationKey]
