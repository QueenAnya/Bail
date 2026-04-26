/**
 * mex-updates.ts
 * Ported from @innovatorssoft/baileys
 * Constants for MEX (WhatsApp multi-device extended) notification operations.
 */

export const MexOperations = {
	UPDATE: 'update',
	PROMOTE: 'promote',
	DEMOTE: 'demote'
} as const

export const MexUpdatesOperations = {
	OWNER_COMMUNITY: 'NotificationCommunityOwnerUpdate',
	GROUP_MEMBER_LINK: 'NotificationGroupMemberLinkPropertyUpdate',
	GROUP_LIMIT_SHARING: 'NotificationGroupLimitSharingPropertyUpdate'
} as const

export const XWAPathsMexUpdates = {
	GROUP_SHARING_CHANGE: 'xwa2_notify_group_on_prop_change',
	COMMUNITY_OWNER_CHANGE: 'xwa2_notify_group_on_participants_roles_change'
} as const

export type MexOperation = (typeof MexOperations)[keyof typeof MexOperations]
export type MexUpdatesOperation = (typeof MexUpdatesOperations)[keyof typeof MexUpdatesOperations]
