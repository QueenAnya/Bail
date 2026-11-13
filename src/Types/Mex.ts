import type { proto } from '../../WAProto'
export enum XWAPaths {
	xwa2_newsletter_create = 'xwa2_newsletter_create',
	xwa2_newsletter_subscribers = 'xwa2_newsletter_subscribers',
	xwa2_newsletter_view = 'xwa2_newsletter_view',
	xwa2_newsletter_metadata = 'xwa2_newsletter',
	xwa2_newsletter_admin_count = 'xwa2_newsletter_admin',
	xwa2_newsletter_follow = 'xwa2_newsletter_follow',
	xwa2_newsletter_unfollow = 'xwa2_newsletter_unfollow',
	xwa2_newsletter_join_v2 = 'xwa2_newsletter_join_v2',
	xwa2_newsletter_leave_v2 = 'xwa2_newsletter_leave_v2',
	xwa2_newsletter_change_owner = 'xwa2_newsletter_change_owner',
	xwa2_newsletter_demote = 'xwa2_newsletter_admin_demote',
	xwa2_newsletter_delete_v2 = 'xwa2_newsletter_delete_v2',
	xwa2_newsletter_subscribed = 'xwa2_newsletter_subscribed',
	xwa2_newsletter_followers = 'xwa2_newsletter_followers',
	xwa2_newsletter_update_user_setting = 'xwa2_newsletter_update_user_setting',
	xwa2_fetch_account_reachout_timelock = 'xwa2_fetch_account_reachout_timelock',
	xwa2_message_capping_info = 'xwa2_message_capping_info',
	xwa2_update_text_status = 'xwa2_update_text_status',

	admin_profile = 'xwa2_newsletter_admin',
	pending_admin_invites = 'xwa2_newsletter_admin',
	voter_list = 'voter_list',
	xwa2_channel_enforcements = 'xwa2_channel_enforcements',
	xwa2_channels_reports = 'xwa2_channels_reports',
	xwa2_create_channel_report_appeal_v2 = 'xwa2_create_channel_report_appeal_v2',
	xwa2_newsletter_admin_capabilities = 'xwa2_newsletter_admin',
	xwa2_newsletter_admin_info = 'xwa2_newsletter_admin',
	xwa2_newsletter_admin_insights = 'xwa2_newsletter_admin_insights',
	xwa2_newsletter_admin_invite_accept = 'xwa2_newsletter_admin_invite_accept',
	xwa2_newsletter_admin_invite_create = 'xwa2_newsletter_admin_invite_create',
	xwa2_newsletter_admin_invite_revoke = 'xwa2_newsletter_admin_invite_revoke',
	xwa2_newsletter_label_ai_content = 'xwa2_newsletter_label_ai_content',
	xwa2_newsletter_label_paid_partnership = 'xwa2_newsletter_label_paid_partnership',
	xwa2_newsletter_link_preview = 'xwa2_newsletter_link_preview',
	xwa2_newsletter_pin_messages = 'xwa2_newsletter_pin_messages',
	xwa2_newsletter_question_response_state_update = 'xwa2_newsletter_question_response_state_update',
	xwa2_newsletter_unpin_messages = 'xwa2_newsletter_unpin_messages',
	xwa2_newsletters_directory_category_preview = 'xwa2_newsletters_directory_category_preview',
	xwa2_newsletters_directory_list = 'xwa2_newsletters_directory_list',
	xwa2_newsletters_directory_search = 'xwa2_newsletters_directory_search',
	xwa2_newsletters_reaction_sender_list = 'xwa2_newsletters_reaction_sender_list',
	xwa2_newsletters_recommended = 'xwa2_newsletters_recommended',
	xwa2_newsletters_similar = 'xwa2_newsletters_similar',
	xwa2_text_status_list = 'xwa2_text_status_list',
	xwa2_username_check = 'xwa2_username_check',
	xwa2_username_get = 'xwa2_username_get',
	xwa2_username_pin_set = 'xwa2_username_pin_set',
	xwa2_username_set = 'xwa2_username_set',
	xwa2_users_updates_since = 'xwa2_users_updates_since',
	/** from whiskeysockets */
	/** dedicated mute path — see QueryIds.MUTE */
	xwa2_newsletter_mute_v2 = 'xwa2_newsletter_mute_v2',
	/** from whiskeysockets */
	/** dedicated mute path — see QueryIds.MUTE */
	xwa2_newsletter_unmute_v2 = 'xwa2_newsletter_unmute_v2',
	/** from whiskeysockets, itsliaaa */
	xwa2_newsletter_demote_alt = 'xwa2_newsletter_demote'
}

export enum QueryIds {
	CREATE = '25149874324715067',
	UPDATE_METADATA = '24250201037901610',
	METADATA = '27456920720571478',
	SUBSCRIBERS = '27472091235714801',
	FOLLOWERS = '27472091235714801',
	SUBSCRIBED = '25399611239711790',
	UPDATE_USER_SETTING = '31938993655691868',
	FOLLOW = '24404358912487870',
	UNFOLLOW = '9767147403369991',
	ADMIN_COUNT = '26278439461859188',
	CHANGE_OWNER = '9546742745432473',
	DEMOTE = '9880997548630971',
	DELETE = '30062808666639665',
	REACHOUT_TIMELOCK = '23983697327930364',
	MESSAGE_CAPPING_INFO = '27910975521856601',
	/** Used by newsletterReactionMode */
	JOB_MUTATION = '7150902998257522',
	UPDATE_TEXT_STATUS = '9152604461510864',

	ABOUT_STATUS = '24535500086059408',
	ACCEPT_ADMIN_INVITE = '9580828702035549',
	ADMIN_CAPABILITIES = '9801384413216421',
	ADMIN_INFO = '26278439461859188',
	CHANNEL_REPORTS = '35936238352686172',
	CREATE_ADMIN_INVITE = '9387141988078609',
	CREATE_REPORT_APPEAL = '27103316329328467',
	DIRECTORY_CATEGORIES = '35266481849605779',
	DIRECTORY_LIST = '26125047313831973',
	DIRECTORY_SEARCH = '26301059626252132',
	ENFORCEMENTS = '27835373536068060',
	INSIGHTS = '9853618868050977',
	LABEL_AI_CONTENT = '27909718265289596',
	PAID_PARTNERSHIP_LABEL = '26102375079404865',
	PENDING_ADMIN_INVITES = '28049623068067370',
	PIN_MESSAGES = '27165709459706559',
	PLAINTEXT_LINK_PREVIEW = '9101130456653613',
	POLL_VOTERS = '9407762219322536',
	QUESTION_RESPONSE_STATE = '24636260219323456',
	REACTION_SENDER_LIST = '29575462448733991',
	RECOMMENDED = '25806748772361516',
	REVOKE_ADMIN_INVITE = '9656078347839416',
	SIMILAR = '26217043484590756',
	TEXT_STATUS_LIST = '24072923595647473',
	UNPIN_MESSAGES = '28007176042216937',
	USERNAME_CHECK = '26122779627399568',
	USERNAME_GET = '25347099718279209',
	USERNAME_PIN_SET = '9749436995157074',
	USERNAME_SET = '25757341163897635',
	/** from majority */
	/** dedicated mute path — still served by WhiskeySockets/itsliaaa; elaina and this repo mute via user settings */
	MUTE = '29766401636284406',
	/** from innovatorssoft */
	MUTE_ALT = '25151904754424642',
	/** from majority */
	/** dedicated mute path — see MUTE */
	UNMUTE = '9864994326891137',
	/** from innovatorssoft */
	UNMUTE_ALT = '7337137176362961',
	/** from whiskeysockets, itsliaaa */
	CREATE_ALT = '8823471724422422',
	/** from innovatorssoft */
	CREATE_ALT2 = '6996806640408138',
	/** from whiskeysockets, itsliaaa */
	METADATA_ALT = '6563316087068696',
	/** from innovatorssoft */
	METADATA_ALT2 = '6620195908089573',
	/** from whiskeysockets, itsliaaa */
	SUBSCRIBERS_ALT = '9783111038412085',
	/** from innovatorssoft, itsliaaa */
	SUBSCRIBED_ALT = '6388546374527196',
	/** from innovatorssoft */
	FOLLOW_ALT = '7871414976211147',
	/** from innovatorssoft */
	UNFOLLOW_ALT = '7238632346214362',
	/** from whiskeysockets, innovatorssoft, itsliaaa */
	ADMIN_COUNT_ALT = '7130823597031706',
	/** from whiskeysockets, innovatorssoft, itsliaaa */
	CHANGE_OWNER_ALT = '7341777602580933',
	/** from whiskeysockets, innovatorssoft, itsliaaa */
	DEMOTE_ALT = '6551828931592903',
	/** from innovatorssoft */
	DELETE_ALT = '8316537688363079',
	/** from whiskeysockets, itsliaaa */
	MESSAGE_CAPPING_INFO_ALT = '24503548349331633'
}

/** Object form accepted by updateProfileStatus, alongside a plain string. */
export type TextStatusInput = {
	text?: string | null
	emoji?: string | null
	ephemeralDuration?: number | null
}

export type TextStatusUpdateResponse = {
	result: boolean | string
}
export type NewsletterUpdate = {
	name?: string
	description?: string
	picture?: string
}

export interface NewsletterCreateResponse {
	id: string
	state: { type: string }
	thread_metadata: {
		creation_time: string
		description: { id: string; text: string; update_time: string }
		handle: string | null
		invite: string
		name: { id: string; text: string; update_time: string }
		picture: { direct_path: string; id: string; type: string }
		preview: { direct_path: string; id: string; type: string }
		subscribers_count: string
		verification: 'VERIFIED' | 'UNVERIFIED'
	}
	viewer_metadata: {
		mute: 'ON' | 'OFF'
		role: NewsletterViewRole
	}
}

export type NewsletterViewRole = 'ADMIN' | 'GUEST' | 'OWNER' | 'SUBSCRIBER'
/**
 * Channel metadata, merged across the forks this repo ports from.
 *
 * elaina's shape is the base (every socket method here returns it). innovatorssoft models extra fields —
 * `state`, `nameTime`, `descriptionTime`, `handle`, `preview`, `viewer_metadata` — and those are added as optional,
 * so nothing that reads the base shape changes. The two fields where the forks disagree are widened to unions:
 * `picture` is an object here and a direct path string there, `reaction_codes` is a per-code tally here and a single
 * mode there.
 */
export interface NewsletterMetadata {
	id: string
	owner?: string
	name: string
	description?: string
	invite?: string
	creation_time?: number
	subscribers?: number
	/** object (this repo / elaina) or a direct path string (innovatorssoft) */
	picture?:
		| {
				url?: string
				directPath?: string
				mediaKey?: string
				id?: string
		  }
		| string
		| null
	verification?: NewsletterVerificationValue
	/** per-code tally (this repo) or a single reaction mode (innovatorssoft) */
	reaction_codes?:
		| {
				code: string
				count: number
		  }[]
		| NewsletterReactionMode
	mute_state?: 'ON' | 'OFF'
	thread_metadata?: {
		creation_time?: number
		name?: string
		description?: string
	}
	// ---- fields innovatorssoft models and elaina does not ----
	/** lifecycle state of the channel */
	state?: NewsletterState
	/** timestamp of the last name change */
	nameTime?: number
	/** timestamp of the last description change */
	descriptionTime?: number
	/** opaque handle; innovatorssoft types it as null */
	handle?: null
	/** lower-quality preview path */
	preview?: string | null
	/** the viewer's own mute/viewer-role pair */
	viewer_metadata?: NewsletterViewerMetadata
}

/** local alias so the interface above reads cleanly; same union the forks use */
export type NewsletterVerificationValue = 'VERIFIED' | 'UNVERIFIED'

export const MexOperations = {
	PROMOTE: 'NotificationNewsletterAdminPromote',
	DEMOTE: 'NotificationNewsletterAdminDemote',
	UPDATE: 'NotificationNewsletterUpdate'
}

export const MexUpdatesOperations = {
	OWNER_COMMUNITY: 'NotificationCommunityOwnerUpdate',
	GROUP_MEMBER_LINK: 'NotificationGroupMemberLinkPropertyUpdate',
	GROUP_LIMIT_SHARING: 'NotificationGroupLimitSharingPropertyUpdate'
} as const

export type MexUpdatesOperation = (typeof MexUpdatesOperations)[keyof typeof MexUpdatesOperations]

export const XWAPathsMexUpdates = {
	GROUP_SHARING_CHANGE: 'xwa2_notify_group_on_prop_change',
	COMMUNITY_OWNER_CHANGE: 'xwa2_notify_group_on_participants_roles_change'
} as const

export type XWAPathMexUpdate = (typeof XWAPathsMexUpdates)[keyof typeof XWAPathsMexUpdates]

// ---------------------------------------------------------------------------------------------
// Newsletter types (ported from innovatorssoft/baileys `lib/Types/Newsletter.d.ts`)
// ---------------------------------------------------------------------------------------------

/** Who may react to posts in a channel. */
export type NewsletterReactionMode = 'ALL' | 'BASIC' | 'NONE'

/** Lifecycle state of a channel. */
export type NewsletterState = 'ACTIVE' | 'GEOSUSPENDED' | 'SUSPENDED'

/** Whether the channel carries a verification badge. */
export type NewsletterVerification = 'VERIFIED' | 'UNVERIFIED'

/** Notification state of a channel from the viewer's side. */
export type NewsletterMute = 'ON' | 'OFF' | 'UNDEFINED'

/** The viewer's own relationship to a channel. */
export type NewsletterViewerMetadata = {
	mute: NewsletterMute
	view_role: import('./Mex').NewsletterViewRole
}

/** What a subscriber action does. */
export type SubscriberAction = 'promote' | 'demote'

/** The reaction-mode payload a settings update carries. */
export type ReactionModeUpdate = {
	reaction_codes: {
		blocked_codes: null
		enabled_ts_sec: null
		value: NewsletterReactionMode
	}
}

/** Currently only the reaction-mode update exists. */
export type NewsletterSettingsUpdate = ReactionModeUpdate

/** One reaction on a channel message. */
export type NewsletterReaction = {
	count: number
	code: string
}

/** A message update (views, reactions) fetched without pulling the message body. */
export type NewsletterFetchedUpdate = {
	/** id of the message in the channel, starts from 100 */
	server_id: string
	/** view count */
	views?: number
	/** reactions on the message */
	reactions: NewsletterReaction[]
	/** the message itself; absent when only updates were requested */
	message?: proto.IWebMessageInfo
}

/**
 * Kept for compatibility: the fields that used to live only here are now on `NewsletterMetadata` itself, so this is
 * an alias rather than a second shape.
 */
export type NewsletterMetadataExtended = import('./Mex').NewsletterMetadata
