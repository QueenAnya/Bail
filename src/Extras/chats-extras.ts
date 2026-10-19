/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT, Copyright (c) 2025 Rajeh Taher/WhiskeySockets,
 * (c) 2026 rexxhayanasi) - Socket/chats.js (+ Socket/socket.js `getUsernames`), rewritten in TypeScript as an
 * add-on socket layer.
 *
 * Account / chat level methods tb2 did not have: username helpers (elaina names, built on tb2's username socket),
 * `fetchAbout`, notices (`fetchUserNotices`, `updateUserNoticeStage`), opt-out list (`fetchOptOutList`,
 * `updateOptOut`), `fetchPushSettings`, `fetchServerLinkPreview`, `reportSpam`, `updateTextStatus`,
 * `fetchProps` / `getServerProps` and `checkAccountHealth`.
 */
import { Boom } from '@hapi/boom'
import { executeWMexQuery as genericExecuteWMexQuery } from '../Socket/mex'
import { USERNAME_QUERY_IDS } from '../Socket/username'
import { QueryIds, XWAPaths } from '../Types'
import type { BinaryNode } from '../WABinary'
import {
	getBinaryNodeChild,
	getBinaryNodeChildren,
	isJidGroup,
	jidDecode,
	jidNormalizedUser,
	reduceBinaryNodeToDictionary,
	S_WHATSAPP_NET
} from '../WABinary'

export const PortedChatQueryIds = {
	ABOUT_STATUS: '24535500086059408',
	PLAINTEXT_LINK_PREVIEW: '9101130456653613'
} as const

export const PortedChatPaths = {
	xwa2_users_updates_since: 'xwa2_users_updates_since',
	xwa2_newsletter_link_preview: 'xwa2_newsletter_link_preview'
} as const

export const SPAM_FLOWS = Object.freeze({
	Block: 'block_dialog',
	OverflowMenuBlock: 'overflow_menu_block',
	OverflowMenuReport: 'overflow_menu_report',
	MediaViewer: 'media_viewer',
	MessageMenu: 'message_menu',
	CommunityHome: 'community_home',
	AccountInfoReport: 'account_info_report',
	GroupInfoReport: 'group_info_report',
	GroupSpamBannerReport: 'group_spam_banner_report',
	OneToOneChatSpamBannerReport: '1_1_spam_banner_report',
	BizSpamBannerBlock: 'biz_spam_banner_block',
	ChatListBlock: 'chat_list_block',
	NotificationBlock: 'notification_block',
	StatusPostReport: 'status_post_report',
	NewsletterInfoReport: 'newsletter_info_report'
})

export interface SpamReportOptions {
	/** one of `SPAM_FLOWS`, default `overflow_menu_report` */
	flow?: string
	source?: string
	subject?: string
	isKnownChat?: boolean
}

export const buildSpamListNode = (jid: string, options: SpamReportOptions = {}): BinaryNode => {
	if (typeof jid !== 'string' || !jid.includes('@')) {
		throw new Boom(`${JSON.stringify(jid)} is not a jid to report`, { statusCode: 400, data: { jid } })
	}

	const flow = options.flow ?? SPAM_FLOWS.OverflowMenuReport
	if (typeof flow !== 'string' || !flow.length) {
		throw new Boom('spam flow must be a non-empty string, see SPAM_FLOWS', { statusCode: 400, data: { flow } })
	}

	const attrs: Record<string, string> = {
		jid: isJidGroup(jid) ? jid : jidNormalizedUser(jid),
		spam_flow: flow
	}
	if (options.source) {
		attrs.source = jidNormalizedUser(options.source)
	}

	if (options.subject) {
		attrs.subject = options.subject
	}

	if (typeof options.isKnownChat === 'boolean') {
		attrs.is_known_chat = options.isKnownChat ? 'true' : 'false'
	}

	return { tag: 'spam_list', attrs }
}

export const readSpamReportResult = (sent: BinaryNode, result: BinaryNode) => {
	const error = getBinaryNodeChild(result, 'error')
	if (error) {
		throw new Boom('reportSpam was rejected by the server', {
			statusCode: Number(error.attrs?.code) || 400,
			data: { jid: sent.attrs.jid, flow: sent.attrs.spam_flow, text: error.attrs?.text }
		})
	}

	return { jid: sent.attrs.jid, flow: sent.attrs.spam_flow, reported: true, node: result }
}

export interface AccountHealth {
	jid: string
	exists: boolean
	isBusiness: boolean
	verifiedName: string | null
	about: string | null
	hasProfilePhoto: boolean
	self: { capped?: boolean; warned?: boolean; unlimited?: boolean; remaining?: number } | null
	notes: string[]
}

export interface ChatsExtrasSocket {
	query: (node: BinaryNode) => Promise<BinaryNode>
	generateMessageTag: () => string
	logger?: any
	ev: { emit: (event: any, data: any) => any }
	authState?: { creds: any }
	serverProps?: Record<string, any>
	// from the base socket / username layer (all of them exist in tb2)
	deleteUsername: () => Promise<any>
	checkUsername: (username: string, includeSuggestions?: boolean) => Promise<any>
	fetchContactUsernames: (...jids: string[]) => Promise<any[]>
	onWhatsApp: (...jids: string[]) => Promise<any>
	getBusinessProfile: (jid: string) => Promise<any>
	fetchStatus: (...jids: string[]) => Promise<any>
	profilePictureUrl: (jid: string, type?: 'preview' | 'image') => Promise<string | undefined>
	fetchNewChatMessageCap: () => Promise<any>
}

export const makeChatsExtras = (sock: ChatsExtrasSocket) => {
	const { query, generateMessageTag } = sock
	const wmex = <T = any>(variables: Record<string, unknown>, queryId: string, dataPath: string): Promise<T> =>
		genericExecuteWMexQuery<T>(variables, queryId, dataPath, query, generateMessageTag)

	let lastServerProps: Record<string, string> = { ...(sock.authState?.creds?.serverProps || {}) }

	const fetchProps = async ({ full = false }: { full?: boolean } = {}) => {
		const authState = sock.authState
		const hash = full ? undefined : authState?.creds?.lastPropHash
		const resultNode = await query({
			tag: 'iq',
			attrs: { to: S_WHATSAPP_NET, xmlns: 'abt', type: 'get' },
			content: [{ tag: 'props', attrs: { protocol: '1', ...(hash ? { hash } : {}) } }]
		})
		const propsNode = getBinaryNodeChild(resultNode, 'props')
		if (propsNode && authState) {
			const delta = reduceBinaryNodeToDictionary(propsNode, 'prop')
			const update: Record<string, any> = {}
			if (full) {
				lastServerProps = delta
				update.serverProps = delta
			} else if (Object.keys(delta).length) {
				lastServerProps = { ...lastServerProps, ...delta }
				update.serverProps = lastServerProps
			}

			if (propsNode.attrs?.hash && propsNode.attrs.hash !== authState.creds.lastPropHash) {
				update.lastPropHash = propsNode.attrs.hash
			}

			if (Object.keys(update).length) {
				Object.assign(authState.creds, update)
				sock.ev.emit('creds.update', update)
			}
		}

		const props = lastServerProps
		const flag = (value: string | undefined) => value === 'true' || value === '1'
		const serverProps = sock.serverProps
		if (serverProps) {
			const privacyTokenProp = props['10518'] ?? props['privacy_token_sending_on_all_1_on_1_messages']
			if (privacyTokenProp !== undefined) {
				serverProps.privacyTokenOn1to1 = flag(privacyTokenProp)
			}

			const profilePicProp = props['9666'] ?? props['profile_scraping_privacy_token_in_photo_iq']
			if (profilePicProp !== undefined) {
				serverProps.profilePicPrivacyToken = flag(profilePicProp)
			}

			const lidIssueProp = props['14303'] ?? props['lid_trusted_token_issue_to_lid']
			if (lidIssueProp !== undefined) {
				serverProps.lidTrustedTokenIssueToLid = flag(lidIssueProp)
			}
		}

		sock.logger?.debug?.({ count: Object.keys(props).length }, 'fetched props')
		return props
	}

	return {
		/** own username info: `{ username, state, pin }` (built on tb2's username query) */
		getUsername: async () => {
			const data = await wmex<any>({}, USERNAME_QUERY_IDS.GET, 'xwa2_username_get')
			const info = data?.username_info ?? data
			return {
				username: info?.username ?? null,
				state: info?.state ?? null,
				pin: info?.pin ?? null
			}
		},

		/** same as `deleteUsername()` */
		removeUsername: () => sock.deleteUsername(),

		/** like `checkUsername`, with `{ available, suggestions, response }` as the result */
		checkUsernameAvailability: async (username: string, options: { includeSuggestions?: boolean } = {}) => {
			const response = await sock.checkUsername(username.replace(/^@/, ''), options.includeSuggestions ?? true)
			return { available: !!response?.available, suggestions: response?.suggestions ?? [], response }
		},

		/** usernames of known contacts: `[{ jid, username }]` (like `fetchContactUsernames`, only with a username) */
		getUsernames: async (...jids: (string | string[])[]) => {
			const list = (jids.flat() as string[]).filter(jid => typeof jid === 'string' && jid.includes('@'))
			if (!list.length) {
				return []
			}

			const entries = await sock.fetchContactUsernames(...list.map(jid => jidNormalizedUser(jid)))
			return entries
				.filter((entry: any) => typeof entry?.username === 'string' && entry.username.length > 0)
				.map(({ username, id }: any) => ({ jid: id, username }))
		},

		/** removes the username pin */
		removeUsernamePin: async () => {
			const response = await wmex<any>({ pin: null }, USERNAME_QUERY_IDS.PIN_SET, 'xwa2_username_pin_set')
			return response?.result === 'SUCCESS'
		},

		/** the "About" text of a user: `{ jid, status, response }` */
		fetchAbout: async (jid: string) => {
			const { user } = jidDecode(jidNormalizedUser(jid)) || {}
			if (!user) {
				throw new Boom('Invalid user jid', { statusCode: 400 })
			}

			const response = await wmex<any>(
				{ user: { user_id: user } },
				PortedChatQueryIds.ABOUT_STATUS,
				PortedChatPaths.xwa2_users_updates_since
			)
			const updates = Array.isArray(response) ? response[0]?.updates : undefined
			return { jid: jidNormalizedUser(jid), status: updates?.[0]?.text ?? null, response }
		},

		/** sets the text status; `text: ''` / `null` clears it */
		updateTextStatus: (text: string | null, options: { ephemeralDurationSec?: number; emoji?: string } = {}) => {
			const input: Record<string, unknown> = {
				text: text === '' ? null : (text ?? null),
				ephemeral_duration_sec: options.ephemeralDurationSec ?? 0
			}
			if (options.emoji) {
				input.emoji = { content: options.emoji }
			}

			return wmex({ input }, QueryIds.UPDATE_TEXT_STATUS, XWAPaths.xwa2_update_text_status)
		},

		fetchUserNotices: async (since = 0) => {
			const result = await query({
				tag: 'iq',
				attrs: { to: S_WHATSAPP_NET, type: 'get', xmlns: 'tos', id: generateMessageTag() },
				content: [{ tag: 'get_user_disclosures', attrs: { t: String(since) } }]
			})
			return getBinaryNodeChildren(result, 'notice').map(node => ({
				id: node.attrs.id,
				stage: node.attrs.stage,
				t: node.attrs.t,
				version: node.attrs.version,
				type: node.attrs.type
			}))
		},

		updateUserNoticeStage: async (noticeId: string | number, stage: string | number) => {
			await query({
				tag: 'iq',
				attrs: { to: S_WHATSAPP_NET, type: 'set', xmlns: 'tos', id: generateMessageTag() },
				content: [{ tag: 'notice', attrs: { id: String(noticeId), stage: String(stage) } }]
			})
		},

		fetchOptOutList: async (options: { category?: string; dhash?: string } = {}) => {
			const attrs: Record<string, string> = {
				to: S_WHATSAPP_NET,
				type: 'get',
				xmlns: 'optoutlist',
				id: generateMessageTag()
			}
			if (options.category) {
				attrs.category = options.category
			}

			const content = options.dhash ? [{ tag: 'item', attrs: { dhash: options.dhash } }] : undefined
			const result = await query({ tag: 'iq', attrs, content })
			return getBinaryNodeChildren(result, 'item').map(node => node.attrs)
		},

		updateOptOut: async ({
			jid,
			category,
			action,
			dhash,
			reason,
			entryPoint,
			signupId,
			duration
		}: {
			jid: string
			category: string
			action: string
			dhash?: string
			reason?: string
			entryPoint?: string
			signupId?: string
			duration?: number | string | null
		}) => {
			const attrs: Record<string, string> = { jid: jidNormalizedUser(jid), category, action }
			if (dhash) attrs.dhash = dhash
			if (reason) attrs.reason = reason
			if (entryPoint) attrs.entry_point = entryPoint
			if (signupId) attrs.signup_id = signupId
			if (duration !== undefined && duration !== null) attrs.duration = String(duration)
			await query({
				tag: 'iq',
				attrs: { to: S_WHATSAPP_NET, type: 'set', xmlns: 'optoutlist', id: generateMessageTag() },
				content: [{ tag: 'item', attrs }]
			})
		},

		fetchPushSettings: async () => {
			const result = await query({
				tag: 'iq',
				attrs: { to: S_WHATSAPP_NET, type: 'get', xmlns: 'urn:xmpp:whatsapp:push', id: generateMessageTag() },
				content: [{ tag: 'settings', attrs: {} }]
			})
			return getBinaryNodeChild(result, 'settings')?.attrs ?? {}
		},

		/** link preview from the WhatsApp server (the same thing the app uses for channel posts) */
		fetchServerLinkPreview: (url: string) =>
			wmex({ input: { url } }, PortedChatQueryIds.PLAINTEXT_LINK_PREVIEW, PortedChatPaths.xwa2_newsletter_link_preview),

		/** report a user / group / newsletter as spam: `{ jid, flow, reported, node }` */
		reportSpam: async (jid: string, options: SpamReportOptions = {}) => {
			const node = buildSpamListNode(jid, options)
			const result = await query({
				tag: 'iq',
				attrs: { xmlns: 'spam', to: S_WHATSAPP_NET, type: 'set' },
				content: [node]
			})
			return readSpamReportResult(node, result)
		},

		fetchProps,

		/** the server AB props (cached; `refresh: true` fetches the full list again) */
		getServerProps: async ({ refresh = false }: { refresh?: boolean } = {}) => {
			if (refresh) {
				return fetchProps({ full: true })
			}

			if (!Object.keys(lastServerProps).length) {
				await fetchProps({ full: true })
			}

			return lastServerProps
		},

		/** quick health report of a number: registered?, business?, about, profile photo and the new-chat cap of YOUR account */
		checkAccountHealth: async (jid: string): Promise<AccountHealth> => {
			const number = String(jid).split('@')[0]!.split(':')[0]!
			const info: AccountHealth = {
				jid,
				exists: false,
				isBusiness: false,
				verifiedName: null,
				about: null,
				hasProfilePhoto: false,
				self: null,
				notes: []
			}
			const [onWa] = (await sock.onWhatsApp(number).catch(() => [])) || []
			info.exists = !!onWa?.exists
			if (onWa?.jid) {
				info.jid = onWa.jid
			}

			if (!info.exists) {
				info.notes.push('This number is not registered on WhatsApp')
				return info
			}

			const biz = await sock.getBusinessProfile(info.jid).catch(() => null)
			if (biz && Object.keys(biz).length) {
				info.isBusiness = true
				info.verifiedName = biz.verifiedName || biz.business_name || biz.description || null
			}

			const status = await sock.fetchStatus(info.jid).catch(() => null)
			const entry = Array.isArray(status) ? status[0] : status
			info.about = entry?.status?.status ?? entry?.status ?? null

			const pic = await sock.profilePictureUrl(info.jid, 'image').catch(() => null)
			info.hasProfilePhoto = !!pic

			const cap = await sock.fetchNewChatMessageCap().catch(() => null)
			if (cap) {
				info.self = { capped: cap.capped, warned: cap.warned, unlimited: cap.unlimited, remaining: cap.remaining }
				if (cap.capped) {
					info.notes.push('Your account is capped for new chats right now - slow down')
				} else if (cap.warned) {
					info.notes.push('Your account has been warned about new chats')
				} else {
					info.notes.push('Your account is healthy for new chats')
				}
			}

			return info
		}
	}
}
