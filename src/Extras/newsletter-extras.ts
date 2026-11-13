/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT, Copyright (c) 2025 Rajeh Taher/WhiskeySockets,
 * (c) 2026 rexxhayanasi) - Socket/newsletter.js, Utils/decode-wa-message.js (extractNewsletterMessageMeta),
 * rewritten in TypeScript as an add-on socket layer.
 *
 * Adds the channel (newsletter) methods tb2 did not have yet: admin invites / info / capabilities,
 * followers, insights, directory (list / search / categories), recommended / similar channels, enforcements and
 * reports (+ appeal), poll voters / reaction senders / poll votes, pin / unpin messages, AI-content and
 * paid-partnership labels, question responses, message updates and "my add-ons".
 *
 * Query ids / paths are taken from elaina-baileys; they are kept in `PortedNewsletterQueryIds` /
 * `PortedNewsletterPaths` so tb2's own `QueryIds` / `XWAPaths` stay untouched.
 */
import { Boom } from '@hapi/boom'
import { createHash } from 'crypto'
import { proto } from '../../WAProto/index.js'
import { executeWMexQuery as genericExecuteWMexQuery } from '../Socket/mex'
import { QueryIds } from '../Types'
import { extractNewsletterMessageMeta } from '../Utils/newsletter-meta'
import type { BinaryNode } from '../WABinary'
import { getBinaryNodeChild, getBinaryNodeChildren, S_WHATSAPP_NET } from '../WABinary'
import { toNewsletterServerId } from './newsletter-status'

export const PortedNewsletterQueryIds = {
	UPDATE_USER_SETTING: '31938993655691868',
	ENFORCEMENTS: '27835373536068060',
	CHANNEL_REPORTS: '35936238352686172',
	CREATE_REPORT_APPEAL: '27103316329328467',
	ADMIN_CAPABILITIES: '9801384413216421',
	ADMIN_INFO: '26278439461859188',
	POLL_VOTERS: '9407762219322536',
	REACTION_SENDER_LIST: '29575462448733991',
	PIN_MESSAGES: '27165709459706559',
	UNPIN_MESSAGES: '28007176042216937',
	LABEL_AI_CONTENT: '27909718265289596',
	PAID_PARTNERSHIP_LABEL: '26102375079404865',
	CREATE_ADMIN_INVITE: '9387141988078609',
	REVOKE_ADMIN_INVITE: '9656078347839416',
	ACCEPT_ADMIN_INVITE: '9580828702035549',
	RECOMMENDED: '25806748772361516',
	SIMILAR: '26217043484590756',
	INSIGHTS: '9853618868050977',
	FOLLOWERS: '27472091235714801',
	PENDING_ADMIN_INVITES: '28049623068067370',
	QUESTION_RESPONSE_STATE: '24636260219323456',
	DIRECTORY_LIST: '26125047313831973',
	DIRECTORY_SEARCH: '26301059626252132',
	DIRECTORY_CATEGORIES: '35266481849605779'
} as const

export const PortedNewsletterPaths = {
	xwa2_newsletter_update_user_setting: 'xwa2_newsletter_update_user_setting',
	xwa2_channel_enforcements: 'xwa2_channel_enforcements',
	xwa2_channels_reports: 'xwa2_channels_reports',
	xwa2_create_channel_report_appeal_v2: 'xwa2_create_channel_report_appeal_v2',
	xwa2_newsletter_admin_capabilities: 'xwa2_newsletter_admin',
	xwa2_newsletter_admin_info: 'xwa2_newsletter_admin',
	voter_list: 'voter_list',
	xwa2_newsletters_reaction_sender_list: 'xwa2_newsletters_reaction_sender_list',
	xwa2_newsletter_pin_messages: 'xwa2_newsletter_pin_messages',
	xwa2_newsletter_unpin_messages: 'xwa2_newsletter_unpin_messages',
	xwa2_newsletter_label_ai_content: 'xwa2_newsletter_label_ai_content',
	xwa2_newsletter_label_paid_partnership: 'xwa2_newsletter_label_paid_partnership',
	xwa2_newsletter_admin_invite_create: 'xwa2_newsletter_admin_invite_create',
	xwa2_newsletter_admin_invite_revoke: 'xwa2_newsletter_admin_invite_revoke',
	xwa2_newsletter_admin_invite_accept: 'xwa2_newsletter_admin_invite_accept',
	xwa2_newsletters_recommended: 'xwa2_newsletters_recommended',
	xwa2_newsletters_similar: 'xwa2_newsletters_similar',
	xwa2_newsletter_admin_insights: 'xwa2_newsletter_admin_insights',
	xwa2_newsletter_followers: 'xwa2_newsletter_followers',
	pending_admin_invites: 'xwa2_newsletter_admin',
	xwa2_newsletter_question_response_state_update: 'xwa2_newsletter_question_response_state_update',
	xwa2_newsletters_directory_list: 'xwa2_newsletters_directory_list',
	xwa2_newsletters_directory_search: 'xwa2_newsletters_directory_search',
	xwa2_newsletters_directory_category_preview: 'xwa2_newsletters_directory_category_preview'
} as const

const NEWSLETTER_REACTION_SETTINGS = new Set(['ALL', 'BASIC', 'NONE', 'BLOCKLIST'])

/** The server only accepts newsletter message server ids in this range. */
export const toNewsletterServerIds = (serverIds: unknown): string[] => {
	const list = Array.isArray(serverIds) ? serverIds : [serverIds]
	if (!list.length) {
		throw new TypeError('a newsletter server id is required')
	}

	return list.map(id => toNewsletterServerId(id))
}

export type NewsletterUserSettingType = 'ADMIN_NOTIFICATIONS' | 'FOLLOWER_NOTIFICATIONS'

export const toNewsletterUserSettingInput = (jid: string, type: NewsletterUserSettingType, muted: boolean) => {
	if (typeof jid !== 'string' || !jid.endsWith('@newsletter')) {
		throw new TypeError(`${JSON.stringify(jid)} is not a newsletter jid`)
	}

	return {
		input: {
			newsletter_id: jid,
			type: type === 'FOLLOWER_NOTIFICATIONS' ? 'MUTE_FOLLOWER_ACTIVITY' : 'MUTE_ADMIN_ACTIVITY',
			value: muted ? 'ON' : 'OFF'
		}
	}
}

export type { NewsletterMessageMeta } from '../Utils/newsletter-meta'
export { extractNewsletterMessageMeta }

export const decodeNewsletterPlaintext = (plaintextNode?: BinaryNode) => {
	if (!plaintextNode?.content) {
		return undefined
	}

	const buffer =
		typeof plaintextNode.content === 'string'
			? Buffer.from(plaintextNode.content, 'binary')
			: Buffer.from(plaintextNode.content as Uint8Array)
	return proto.Message.decode(buffer).toJSON()
}

export const decodeNewsletterMessageNodes = (parentNode: BinaryNode, newsletterJid: string, logger?: any): any[] => {
	const messages: any[] = []
	for (const child of getBinaryNodeChildren(parentNode, 'message')) {
		const plaintextNode = getBinaryNodeChild(child, 'plaintext')
		if (!plaintextNode?.content) {
			continue
		}

		try {
			const fullMessage: any = proto.WebMessageInfo.fromObject({
				key: {
					remoteJid: newsletterJid,
					id: child.attrs.id || child.attrs.server_id,
					fromMe: child.attrs.is_sender === 'true'
				},
				message: decodeNewsletterPlaintext(plaintextNode),
				messageTimestamp: child.attrs.t ? +child.attrs.t : undefined
			}).toJSON()
			if (child.attrs.server_id) {
				fullMessage.key.server_id = child.attrs.server_id
			}

			const meta = extractNewsletterMessageMeta(child)
			if (meta) {
				fullMessage.newsletterMeta = meta
				if (meta.adminProfile?.name) {
					fullMessage.pushName = meta.adminProfile.name
				}
			}

			messages.push(fullMessage)
		} catch (error) {
			logger?.error?.({ error }, 'Failed to decode newsletter message')
		}
	}

	return messages
}

type QueryFn = (node: BinaryNode) => Promise<BinaryNode>

export interface NewsletterExtrasDeps {
	query: QueryFn
	generateMessageTag: () => string
	logger?: any
}

/** Builds the extra newsletter methods on top of `query` + `generateMessageTag` (both come from the base socket). */
export const makeNewsletterExtras = ({ query, generateMessageTag, logger }: NewsletterExtrasDeps) => {
	const wmex = <T = any>(variables: Record<string, unknown>, queryId: string, dataPath: string): Promise<T> =>
		genericExecuteWMexQuery<T>(variables, queryId, dataPath, query, generateMessageTag)

	const newsletterUpdate = (jid: string, updates: Record<string, unknown>) =>
		wmex(
			{ newsletter_id: jid, updates: { settings: null, ...updates } },
			QueryIds.UPDATE_METADATA,
			'xwa2_newsletter_update'
		)

	const fetchMyAddOns = async (options: { limit?: number; jid?: string }, type?: string) => {
		const attrs: Record<string, string> = { limit: String(options.limit ?? 100) }
		if (type) {
			attrs.type = type
		}

		if (options.jid) {
			attrs.jid = options.jid
		}

		const result = await query({
			tag: 'iq',
			attrs: { id: generateMessageTag(), type: 'get', xmlns: 'newsletter', to: S_WHATSAPP_NET },
			content: [{ tag: 'my_addons', attrs, content: undefined }]
		})
		const addOns = getBinaryNodeChild(result, 'my_addons')
		if (!addOns) {
			return []
		}

		return getBinaryNodeChildren(addOns, 'messages').map(group => ({
			jid: group.attrs?.jid,
			messages: getBinaryNodeChildren(group, 'message').map(entry => {
				const reaction = getBinaryNodeChild(entry, 'reaction')
				const votes = getBinaryNodeChild(entry, 'votes')
				return {
					serverId: entry.attrs?.server_id ? Number(entry.attrs.server_id) : undefined,
					reaction: reaction
						? { code: reaction.attrs?.code, t: reaction.attrs?.t ? Number(reaction.attrs.t) : undefined }
						: undefined,
					pollVote: votes
						? {
								t: votes.attrs?.t ? Number(votes.attrs.t) : undefined,
								hashes: getBinaryNodeChildren(votes, 'vote').map(vote =>
									Buffer.from((vote.content as Uint8Array | undefined) ?? []).toString('hex')
								)
							}
						: undefined
				}
			})
		}))
	}

	const newsletterUserSetting = async (jid: string, type: NewsletterUserSettingType, muted: boolean) => {
		const response = await wmex<any>(
			toNewsletterUserSettingInput(jid, type, muted),
			PortedNewsletterQueryIds.UPDATE_USER_SETTING,
			PortedNewsletterPaths.xwa2_newsletter_update_user_setting
		)
		return { id: response?.id ?? jid, state: response?.state?.type }
	}

	const mapEnforcement = (entry: any) => ({
		enforcementId: entry?.enforcement_id,
		createdAt: entry?.enforcement_creation_time ? Number(entry.enforcement_creation_time) : undefined,
		violationCategory: entry?.enforcement_violation_category,
		source: entry?.enforcement_source,
		appealState: entry?.appeal_state,
		appealCreatedAt: entry?.appeal_creation_time ? Number(entry.appeal_creation_time) : undefined,
		appealReasonOptions: (entry?.appeal_reason_options ?? []).map((option: any) => ({
			reason: option?.reason,
			label: option?.label
		})),
		appealFormUrl: entry?.enforcement_extra_data?.ip_violation_report_data?.appeal_form_url,
		policy: entry?.enforcement_policy_information
			? {
					headline: entry.enforcement_policy_information.headline,
					subtitle: entry.enforcement_policy_information.subtitle,
					overview: entry.enforcement_policy_information.overview,
					explanation: entry.enforcement_policy_information.explanation,
					adminDisclaimer: entry.enforcement_policy_information.admin_disclaimer
				}
			: undefined
	})

	return {
		/** mute / unmute notifications (`ADMIN_NOTIFICATIONS` or `FOLLOWER_NOTIFICATIONS`) of a channel */
		newsletterUpdateUserSetting: (jid: string, type: NewsletterUserSettingType, muted: boolean) =>
			newsletterUserSetting(jid, type, muted),

		/** reaction setting of an owned channel: `ALL` | `BASIC` | `NONE` | `BLOCKLIST` */
		newsletterUpdateReactions: async (jid: string, setting: string) => {
			const value = String(setting ?? '').toUpperCase()
			if (!NEWSLETTER_REACTION_SETTINGS.has(value)) {
				throw new Boom(`reaction setting must be one of ${[...NEWSLETTER_REACTION_SETTINGS].join(', ')}`, {
					statusCode: 400,
					data: { setting }
				})
			}

			return newsletterUpdate(jid, { settings: { reaction_codes: { value } } })
		},

		newsletterFetchMessageUpdates: async (
			jid: string,
			options: { count?: number; since?: number; before?: number; after?: number } = {}
		) => {
			const { count = 20, since, before, after } = options
			const attrs: Record<string, string> = { count: String(count) }
			if (since !== undefined) {
				attrs.since = String(since)
			}

			if (before !== undefined) {
				attrs.before = String(before)
			} else if (after !== undefined) {
				attrs.after = String(after)
			}

			const result = await query({
				tag: 'iq',
				attrs: { id: generateMessageTag(), type: 'get', xmlns: 'newsletter', to: jid },
				content: [{ tag: 'message_updates', attrs, content: undefined }]
			})
			const updates = getBinaryNodeChild(result, 'message_updates')
			const messages = updates && getBinaryNodeChild(updates, 'messages')
			return {
				jid: messages?.attrs?.jid ?? jid,
				messages: messages ? decodeNewsletterMessageNodes(messages, messages.attrs?.jid ?? jid, logger) : []
			}
		},

		newsletterQuestionResponses: async (
			jid: string,
			serverId: string | number,
			options: { count?: number; before?: number; filter?: string; searchText?: string } = {}
		) => {
			const { count = 20, before, filter, searchText } = options
			const attrs: Record<string, string> = { server_id: String(serverId), count: String(count) }
			if (before !== undefined) {
				attrs.before = String(before)
			}

			const content: BinaryNode[] = []
			if (filter) {
				content.push({ tag: 'filters', attrs: {}, content: [{ tag: filter, attrs: {}, content: undefined }] })
			}

			if (searchText) {
				content.push({ tag: 'search', attrs: { text: searchText }, content: undefined })
			}

			const result = await query({
				tag: 'iq',
				attrs: { id: generateMessageTag(), type: 'get', xmlns: 'newsletter', to: jid },
				content: [{ tag: 'question_responses', attrs, content: content.length ? content : undefined }]
			})
			const responses = getBinaryNodeChild(result, 'question_responses')
			if (!responses) {
				return { jid, serverId: Number(serverId), responses: [] }
			}

			return {
				jid: result.attrs?.from ?? jid,
				serverId: responses.attrs?.server_id ? Number(responses.attrs.server_id) : Number(serverId),
				responses: getBinaryNodeChildren(responses, 'question_response').map(entry => {
					const messageNode = getBinaryNodeChild(entry, 'message')
					const sender = getBinaryNodeChild(entry, 'sender')
					const picture = sender && getBinaryNodeChild(sender, 'picture')
					const flags = getBinaryNodeChild(entry, 'flags')
					const plaintext = messageNode && getBinaryNodeChild(messageNode, 'plaintext')
					return {
						id: messageNode?.attrs?.id,
						t: messageNode?.attrs?.t ? Number(messageNode.attrs.t) : undefined,
						isSender: messageNode?.attrs?.is_sender === 'true',
						responseServerId: messageNode?.attrs?.response_server_id,
						sender: {
							lid: sender?.attrs?.lid,
							notifyName: sender?.attrs?.notify_name,
							pictureDirectPath: picture?.attrs?.direct_path
						},
						replied: flags ? !!getBinaryNodeChild(flags, 'replied') : false,
						starred: flags ? !!getBinaryNodeChild(flags, 'starred') : false,
						message: decodeNewsletterPlaintext(plaintext || undefined)
					}
				})
			}
		},

		/** your own reactions / poll votes in channels */
		newsletterMyAddOns: (options: { limit?: number; jid?: string } = {}) => fetchMyAddOns(options, undefined),
		/** your own reactions / poll votes on channel statuses */
		newsletterStatusMyAddOns: (options: { limit?: number; jid?: string } = {}) => fetchMyAddOns(options, 'status'),

		newsletterAdminCapabilities: async (jid: string): Promise<string[]> => {
			const response = await wmex<any>(
				{ newsletter_id: jid },
				PortedNewsletterQueryIds.ADMIN_CAPABILITIES,
				PortedNewsletterPaths.xwa2_newsletter_admin_capabilities
			)
			return response?.capabilities ?? []
		},

		newsletterEnforcements: async (jid: string, locale = 'en_US') => {
			const response = await wmex<any>(
				{ newsletter_id: jid, locale },
				PortedNewsletterQueryIds.ENFORCEMENTS,
				PortedNewsletterPaths.xwa2_channel_enforcements
			)
			const nested = (list: any[] | undefined) =>
				(list ?? []).map(entry => mapEnforcement(entry?.base_enforcement_data ?? entry))
			return {
				adminProfiles: (response?.admin_profiles ?? []).map(mapEnforcement),
				profilePictureDeletions: (response?.profile_picture_deletions ?? []).map(mapEnforcement),
				suspensions: (response?.suspensions ?? []).map(mapEnforcement),
				violatingMessages: nested(response?.violating_messages),
				geoSuspensions: nested(response?.geosuspensions)
			}
		},

		newsletterReports: async (locale = 'en_US') => {
			const response = await wmex<any>(
				{ locale },
				PortedNewsletterQueryIds.CHANNEL_REPORTS,
				PortedNewsletterPaths.xwa2_channels_reports
			)
			return response?.channels_reports ?? []
		},

		newsletterAppealReport: (reportId: string | number, reason: string) =>
			wmex(
				{ report_id: String(reportId), reason },
				PortedNewsletterQueryIds.CREATE_REPORT_APPEAL,
				PortedNewsletterPaths.xwa2_create_channel_report_appeal_v2
			),

		/** can this account post channel statuses (and music statuses) in `jid`? */
		newsletterCanPostStatus: async (jid: string) => {
			const capabilities = await wmex<any>(
				{ newsletter_id: jid },
				PortedNewsletterQueryIds.ADMIN_CAPABILITIES,
				PortedNewsletterPaths.xwa2_newsletter_admin_capabilities
			)
			const list: string[] = capabilities?.capabilities ?? []
			return {
				canPost: list.includes('CHANNEL_STATUS_PRODUCER'),
				canPostMusic: list.includes('CHANNEL_STATUS_MUSIC'),
				capabilities: list
			}
		},

		newsletterAdminInfo: async (jid: string) => {
			const response = await wmex<any>(
				{ newsletter_id: jid },
				PortedNewsletterQueryIds.ADMIN_INFO,
				PortedNewsletterPaths.xwa2_newsletter_admin_info
			)
			return {
				id: response?.id ?? jid,
				adminCount: response?.admin_count ?? 0,
				adminProfile: response?.admin_profile
					? {
							id: response.admin_profile.id,
							name: response.admin_profile.name,
							picture: response.admin_profile.picture
								? { id: response.admin_profile.picture.id, directPath: response.admin_profile.picture.direct_path }
								: undefined
						}
					: undefined,
				adminProfilesEnabled: response?.admin_settings?.admin_profiles_enabled ?? false
			}
		},

		newsletterPollVoters: (
			jid: string,
			serverId: string | number,
			options: { limit?: number; voteHash?: string } = {}
		) =>
			wmex(
				{
					input: {
						newsletter_id: jid,
						server_id: String(serverId),
						limit: options.limit ?? 100,
						vote_hash: options.voteHash
					}
				},
				PortedNewsletterQueryIds.POLL_VOTERS,
				PortedNewsletterPaths.voter_list
			),

		newsletterReactionSenders: (jid: string, serverId: string | number) =>
			wmex(
				{ input: { id: jid, server_id: String(serverId) } },
				PortedNewsletterQueryIds.REACTION_SENDER_LIST,
				PortedNewsletterPaths.xwa2_newsletters_reaction_sender_list
			),

		newsletterPinMessages: async (jid: string, serverIds: string | number | (string | number)[]) =>
			wmex(
				{ newsletter_id: jid, input: { message_ids: toNewsletterServerIds(serverIds) } },
				PortedNewsletterQueryIds.PIN_MESSAGES,
				PortedNewsletterPaths.xwa2_newsletter_pin_messages
			),

		newsletterUnpinMessages: async (jid: string, serverIds: string | number | (string | number)[]) =>
			wmex(
				{ newsletter_id: jid, input: { message_ids: toNewsletterServerIds(serverIds) } },
				PortedNewsletterQueryIds.UNPIN_MESSAGES,
				PortedNewsletterPaths.xwa2_newsletter_unpin_messages
			),

		newsletterLabelAiContent: (jid: string, serverId: string | number, messageType = 'MESSAGE') =>
			wmex(
				{ newsletter_id: jid, server_id: String(serverId), message_type: messageType },
				PortedNewsletterQueryIds.LABEL_AI_CONTENT,
				PortedNewsletterPaths.xwa2_newsletter_label_ai_content
			),

		newsletterLabelPaidPartnership: (jid: string, serverId: string | number, messageType = 'MESSAGE') =>
			wmex(
				{ newsletter_id: jid, server_id: String(serverId), message_type: messageType },
				PortedNewsletterQueryIds.PAID_PARTNERSHIP_LABEL,
				PortedNewsletterPaths.xwa2_newsletter_label_paid_partnership
			),

		newsletterCreateAdminInvite: (jid: string, userJid: string) =>
			wmex(
				{ newsletter_id: jid, user_id: userJid },
				PortedNewsletterQueryIds.CREATE_ADMIN_INVITE,
				PortedNewsletterPaths.xwa2_newsletter_admin_invite_create
			),

		newsletterRevokeAdminInvite: (jid: string, userJid: string) =>
			wmex(
				{ newsletter_id: jid, user_id: userJid },
				PortedNewsletterQueryIds.REVOKE_ADMIN_INVITE,
				PortedNewsletterPaths.xwa2_newsletter_admin_invite_revoke
			),

		newsletterAcceptAdminInvite: (jid: string) =>
			wmex(
				{ newsletter_id: jid },
				PortedNewsletterQueryIds.ACCEPT_ADMIN_INVITE,
				PortedNewsletterPaths.xwa2_newsletter_admin_invite_accept
			),

		newsletterDirectoryList: (
			options: {
				fetchStatusMetadata?: boolean
				view?: string
				countryCodes?: string[]
				categories?: string[]
				limit?: number
				cursorToken?: string
			} = {}
		) =>
			wmex(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						view: options.view ?? 'RECOMMENDED',
						filters: { country_codes: options.countryCodes ?? [], categories: options.categories ?? [] },
						limit: options.limit ?? 20,
						start_cursor: options.cursorToken
					}
				},
				PortedNewsletterQueryIds.DIRECTORY_LIST,
				PortedNewsletterPaths.xwa2_newsletters_directory_list
			),

		newsletterDirectorySearch: (
			searchText: string,
			options: { fetchStatusMetadata?: boolean; categories?: string[]; limit?: number; cursorToken?: string } = {}
		) =>
			wmex(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						search_text: searchText,
						categories: options.categories ?? [],
						limit: options.limit ?? 20,
						start_cursor: options.cursorToken
					}
				},
				PortedNewsletterQueryIds.DIRECTORY_SEARCH,
				PortedNewsletterPaths.xwa2_newsletters_directory_search
			),

		newsletterDirectoryCategories: (
			options: {
				fetchStatusMetadata?: boolean
				categories?: string[]
				countryCode?: string
				perCategoryLimit?: number
			} = {}
		) =>
			wmex(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: {
						categories: options.categories ?? [],
						country_code: options.countryCode || undefined,
						per_category_limit: options.perCategoryLimit ?? 10
					}
				},
				PortedNewsletterQueryIds.DIRECTORY_CATEGORIES,
				PortedNewsletterPaths.xwa2_newsletters_directory_category_preview
			),

		/** vote on a channel poll (`options` are the option names; they are hashed with SHA-256) */
		newsletterSendPollVote: async (jid: string, parentServerId: string | number, options: string | string[]) => {
			const names = Array.isArray(options) ? options : [options]
			const votes: BinaryNode[] = names.map(name => ({
				tag: 'vote',
				attrs: {},
				content: createHash('sha256').update(String(name), 'utf-8').digest()
			}))
			const messageId = generateMessageTag()
			await query({
				tag: 'message',
				attrs: { to: jid, id: messageId, type: 'poll', server_id: String(parentServerId) },
				content: [
					{ tag: 'meta', attrs: { polltype: 'vote' } },
					{ tag: 'votes', attrs: {}, content: votes }
				]
			})
			return { id: messageId }
		},

		newsletterInsights: (jid: string, options: { metrics?: string[] } = {}) =>
			wmex(
				{ input: { newsletter_id: jid, metrics: options.metrics ?? ['NET_FOLLOWS', 'UNFOLLOWS'] } },
				PortedNewsletterQueryIds.INSIGHTS,
				PortedNewsletterPaths.xwa2_newsletter_admin_insights
			),

		newsletterFollowers: (jid: string, options: { count?: number } = {}) =>
			wmex(
				{ input: { newsletter_id: jid, count: options.count ?? 100 } },
				PortedNewsletterQueryIds.FOLLOWERS,
				PortedNewsletterPaths.xwa2_newsletter_followers
			),

		newsletterPendingAdminInvites: async (jid: string) => {
			const response = await wmex<any>(
				{ newsletter_id: jid },
				PortedNewsletterQueryIds.PENDING_ADMIN_INVITES,
				PortedNewsletterPaths.pending_admin_invites
			)
			return (response?.pending_admin_invites ?? []).map((invite: any) => ({
				id: invite?.user?.id,
				phoneNumber: invite?.user?.pn
			}))
		},

		newsletterQuestionResponseState: (
			jid: string,
			serverId: string | number,
			responseServerId: string | number,
			state: string
		) =>
			wmex(
				{
					newsletter_id: jid,
					server_id: String(serverId),
					response_server_id: String(responseServerId),
					state
				},
				PortedNewsletterQueryIds.QUESTION_RESPONSE_STATE,
				PortedNewsletterPaths.xwa2_newsletter_question_response_state_update
			),

		newsletterRecommended: (options: { fetchStatusMetadata?: boolean; limit?: number; countryCodes?: string[] } = {}) =>
			wmex(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: { limit: options.limit ?? 20, country_codes: options.countryCodes ?? [] }
				},
				PortedNewsletterQueryIds.RECOMMENDED,
				PortedNewsletterPaths.xwa2_newsletters_recommended
			),

		newsletterSimilar: (
			jid: string,
			options: { fetchStatusMetadata?: boolean; limit?: number; countryCodes?: string[] } = {}
		) =>
			wmex(
				{
					fetch_status_metadata: options.fetchStatusMetadata ?? false,
					input: { newsletter_id: jid, limit: options.limit ?? 20, country_codes: options.countryCodes ?? [] }
				},
				PortedNewsletterQueryIds.SIMILAR,
				PortedNewsletterPaths.xwa2_newsletters_similar
			)
	}
}
