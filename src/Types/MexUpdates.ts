/**
 * MexUpdates — community/group ownership and sharing update operation types.
 * Ported from innovatorssoft/Baileys.
 */

export const enum MexUpdatesOperations {
	OWNER_COMMUNITY = 'NotificationCommunityOwnerUpdate',
	GROUP_LIMIT_SHARING = 'NotificationGroupLimitSharingPropertyUpdate'
}

export const enum XWAPathsUpdates {
	GROUP_SHARING_CHANGE = 'xwa2_notify_group_on_prop_change',
	COMMUNITY_OWNER_CHANGE = 'xwa2_notify_group_on_participants_roles_change'
}
