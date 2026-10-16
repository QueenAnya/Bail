/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT, Copyright (c) 2025 Rajeh Taher/WhiskeySockets,
 * (c) 2026 rexxhayanasi) - Utils/newsletter-status.js, rewritten in TypeScript as an add-on socket layer.
 *
 * Channel (newsletter) STATUS posts: `sendNewsletterStatus` (text / image / video / gif / audio, questions, AI label),
 * `sendNewsletterStatusReaction`, `revokeNewsletterStatus`, `getNewsletterStatuses`, `getNewsletterStatusUpdates`.
 * The `<status>` stanza format comes from elaina-baileys and was NOT re-verified against a live WhatsApp server here.
 */
import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto/index.js'
import { WAMessageStatus } from '../Types'
import { generateMessageIDV2 } from '../Utils/generics'
import { generateWAMessage, normalizeMessageContent } from '../Utils/messages'
import type { BinaryNode } from '../WABinary'
import { getBinaryNodeChild, getBinaryNodeChildren, isJidNewsletter, S_WHATSAPP_NET } from '../WABinary'
import { prepareModernMessageContent } from './modern-messages'
import { toNewsletterServerId } from './newsletter-extras'

export const NEWSLETTER_STATUS_MEDIA_TYPES = new Set(['audio', 'gif', 'image', 'video'])
export const NEWSLETTER_STATUS_WEB_MEDIA_TYPES = new Set(['image', 'video'])
export const NEWSLETTER_STATUS_INTERACTIONS = new Set(['question', 'question_response', 'question_reshare'])
export const NEWSLETTER_STATUS_CONTENT_TYPES = new Set(['text', 'media', 'reaction'])
const NEWSLETTER_STATUS_CALLBACK_EVENTS = ['CB:ack', 'CB:status', 'CB:iq', 'CB:notification', 'CB:message']
const NEWSLETTER_STATUS_EDIT_REACTION_REVOKE = '7'
const NEWSLETTER_STATUS_EDIT_ADMIN_REVOKE = '8'
const NEWSLETTER_STATUS_ACK_CLASS = 'status'
const NEWSLETTER_STATUS_ACK_TIMEOUT_MS = 20000
const NEWSLETTER_STATUS_SERVER_ID_TIMEOUT_MS = 8000

/** `StatusAttribution.Type.NEWSLETTER_STATUS` (not named in this WAProto) */
const STATUS_ATTRIBUTION_NEWSLETTER_STATUS = 9

const isPresent = (value: unknown): boolean => value !== undefined && value !== null && value !== ''

const encodeNewsletterMessage = (message: any): Uint8Array => proto.Message.encode(message).finish()

export const getNewsletterStatusMediaType = (message: any): string | undefined => {
	const content: any = normalizeMessageContent(message)
	if (content?.imageMessage) return 'image'
	if (content?.videoMessage) return content.videoMessage.gifPlayback ? 'gif' : 'video'
	if (content?.audioMessage) return 'audio'
	return undefined
}

const assertNewsletterJid = (jid: string) => {
	if (!isJidNewsletter(jid)) throw new TypeError('Newsletter status target must be a @newsletter JID')
}

const assertInteraction = (interactionType?: string) => {
	if (interactionType !== undefined && !NEWSLETTER_STATUS_INTERACTIONS.has(interactionType)) {
		throw new TypeError(`Unsupported newsletter status interaction: ${interactionType}`)
	}
}

const assertMediaType = (mediaType?: string) => {
	if (mediaType !== undefined && !NEWSLETTER_STATUS_MEDIA_TYPES.has(mediaType)) {
		throw new TypeError(`Unsupported newsletter status media type: ${mediaType}`)
	}
}

const readIntAttr = (attrs: Record<string, string> | undefined, key: string): number | undefined => {
	if (!isPresent(attrs?.[key])) return undefined
	const parsed = Number.parseInt(String(attrs![key]), 10)
	return Number.isFinite(parsed) ? parsed : undefined
}

const buildMetaNode = ({
	interactionType,
	parentServerId,
	responseServerId,
	aiContent
}: {
	interactionType?: string
	parentServerId?: string | number
	responseServerId?: string | number
	aiContent?: boolean
}): BinaryNode | undefined => {
	assertInteraction(interactionType)

	const attrs: Record<string, string> = {}
	if (interactionType) {
		attrs.interaction_type = interactionType
		if (interactionType === 'question_reshare') {
			if (!isPresent(parentServerId)) throw new TypeError('question_reshare requires parentServerId')
			if (!isPresent(responseServerId)) throw new TypeError('question_reshare requires responseServerId')
			attrs.parent_server_id = toNewsletterServerId(parentServerId, 'parentServerId')
			attrs.response_server_id = String(responseServerId)
		} else if (interactionType === 'question_response' && isPresent(responseServerId)) {
			attrs.response_server_id = String(responseServerId)
		}
	}

	if (!interactionType && !aiContent) return undefined

	return {
		tag: 'meta',
		attrs,
		content: aiContent ? [{ tag: 'ai_content', attrs: {}, content: undefined }] : undefined
	}
}

export const withNewsletterStatusAttribution = (content: any) => ({
	...content,
	contextInfo: {
		statusAttributions: [{ type: STATUS_ATTRIBUTION_NEWSLETTER_STATUS }],
		featureEligibilities: { canBeReshared: true },
		...(content?.contextInfo || {})
	}
})

const snapshotCallbackNode = (event: string, node: any) => ({
	event,
	tag: node?.tag,
	attrs: node?.attrs || {},
	children: Array.isArray(node?.content)
		? node.content.map((child: any) => ({ tag: child?.tag, attrs: child?.attrs || {} }))
		: []
})

const collectStatusCallbacks = (sock: NewsletterStatusSocket) => {
	const frames: any[] = []
	const listeners: [string, (node: any) => void][] = []

	for (const event of NEWSLETTER_STATUS_CALLBACK_EVENTS) {
		const listener = (node: any) => {
			if (frames.length >= 40) return
			frames.push(snapshotCallbackNode(event, node))
		}

		sock.ws.on(event, listener)
		listeners.push([event, listener])
	}

	return {
		frames,
		stop: () => {
			for (const [event, listener] of listeners) {
				sock.ws.off(event, listener)
			}
		}
	}
}

export const parseNewsletterStatusAck = (node: any, { jid, messageId }: { jid?: string; messageId?: string } = {}) => {
	if (!node || typeof node !== 'object') throw new TypeError('Newsletter status ack node is required')
	if (node.tag !== 'ack') {
		throw new Boom(`Newsletter status expected <ack>, got <${node.tag}>`, { data: node })
	}

	const attrs = node.attrs || {}
	if (attrs.class !== undefined && attrs.class !== NEWSLETTER_STATUS_ACK_CLASS) {
		throw new Boom(`Newsletter status ack has class "${attrs.class}", expected "${NEWSLETTER_STATUS_ACK_CLASS}"`, {
			data: node
		})
	}

	if (isPresent(messageId) && isPresent(attrs.id) && attrs.id !== messageId) {
		throw new Boom(`Newsletter status ack id mismatch: ${attrs.id} != ${messageId}`, { data: node })
	}

	if (isPresent(jid) && isPresent(attrs.from) && attrs.from !== jid) {
		throw new Boom(`Newsletter status ack from mismatch: ${attrs.from} != ${jid}`, { data: node })
	}

	return {
		class: attrs.class as string | undefined,
		from: attrs.from as string | undefined,
		id: attrs.id as string | undefined,
		t: readIntAttr(attrs, 't'),
		serverId: readIntAttr(attrs, 'server_id'),
		edit: attrs.edit as string | undefined,
		error: isPresent(attrs.error) ? String(attrs.error) : undefined,
		applicationError: readIntAttr(attrs, 'application_error'),
		backoff: readIntAttr(attrs, 'backoff'),
		node
	}
}

export interface NewsletterStatusSocket {
	ws: {
		on: (event: string, listener: (node: any) => void) => any
		off: (event: string, listener: (node: any) => void) => any
	}
	query: (node: BinaryNode) => Promise<BinaryNode>
	sendNode: (node: BinaryNode) => Promise<void>
	waitForMessage: (messageId: string, timeoutMs?: number) => Promise<any>
	waUploadToServer: (...args: any[]) => Promise<any>
	authState: { creds: { me?: { id: string } } }
	logger?: any
}

/**
 * The ack carries from, class, id and t, and nothing else. The server id lands separately, in the `<status>` stanza the
 * server sends back to the publisher. Reacting to or revoking your own status needs that id, so wait a moment for the echo.
 */
export const waitForNewsletterStatusServerId = (
	sock: NewsletterStatusSocket,
	{ jid, messageId, timeoutMs = 8000 }: { jid?: string; messageId?: string; timeoutMs?: number }
) => {
	let settle: (value: any) => void = () => {}

	const promise: Promise<{ serverId: number; node: any } | undefined> & { cancel?: () => void } = new Promise(
		resolve => {
			let done = false
			const finish = (value: any) => {
				if (done) return
				done = true
				clearTimeout(timer)
				sock.ws.off('CB:status', onStatus)
				resolve(value)
			}

			const onStatus = (node: any) => {
				if (node?.tag !== 'status') return
				const attrs = node.attrs || {}
				if (isPresent(jid) && isPresent(attrs.from) && attrs.from !== jid) return
				if (isPresent(messageId) && isPresent(attrs.id) && attrs.id !== messageId) return
				const serverId = readIntAttr(attrs, 'server_id')
				if (serverId !== undefined) finish({ serverId, node })
			}

			const timer = setTimeout(() => finish(undefined), timeoutMs)
			sock.ws.on('CB:status', onStatus)
			settle = finish
		}
	)
	promise.cancel = () => settle(undefined)
	return promise
}

const assertStatusServerResponse = (
	response: any,
	{ jid, messageId, callbacks = [] }: { jid: string; messageId: string; callbacks?: any[] }
) => {
	if (!response) {
		const suffix = callbacks.length
			? `; callbacks=${JSON.stringify(callbacks)}`
			: '; no ack/status/iq/notification/message callback observed'
		throw new Boom(`Newsletter status server ACK timed out for ${messageId}${suffix}`, {
			data: { messageId, callbacks }
		})
	}

	const ack = parseNewsletterStatusAck(response, { jid, messageId })
	if (ack.error) {
		const details = [
			ack.applicationError !== undefined ? `application_error=${ack.applicationError}` : undefined,
			ack.backoff !== undefined ? `backoff=${ack.backoff}` : undefined
		]
			.filter(Boolean)
			.join(', ')
		const hint = ['403', '401', 'not-authorized', 'forbidden'].includes(ack.error)
			? '; the channel may be missing the CHANNEL_STATUS_PRODUCER capability, check newsletterCanPostStatus(jid)'
			: ''
		throw new Boom(`Newsletter status rejected by server (${ack.error})${details ? `: ${details}` : ''}${hint}`, {
			data: ack
		})
	}

	return ack
}

export const buildNewsletterAdminProfileStatusMessage = (message: any) => {
	if (!message || typeof message !== 'object') throw new TypeError('Newsletter status message is required')
	return proto.Message.create({
		newsletterAdminProfileStatusMessage: (proto.Message as any).FutureProofMessage.create({ message })
	})
}

const resolveStatusPayload = ({ message, payload }: { message?: any; payload?: Uint8Array }) => {
	if (payload !== undefined) {
		if (!(payload instanceof Uint8Array)) throw new TypeError('Newsletter status payload must be a Uint8Array')
		return payload
	}

	if (!message || typeof message !== 'object') throw new TypeError('Newsletter status message is required')
	return encodeNewsletterMessage(message)
}

export const buildNewsletterStatusNode = ({
	jid,
	message,
	payload,
	messageId,
	mediaType,
	mediaId,
	mediaHandle,
	parentServerId,
	responseServerId,
	interactionType,
	aiContent
}: {
	jid: string
	message?: any
	payload?: Uint8Array
	messageId: string
	mediaType?: string
	mediaId?: string | number
	mediaHandle?: string | number
	parentServerId?: string | number
	responseServerId?: string | number
	interactionType?: string
	aiContent?: boolean
}): BinaryNode => {
	assertNewsletterJid(jid)
	if (!messageId) throw new TypeError('Newsletter status messageId is required')
	assertMediaType(mediaType)
	assertInteraction(interactionType)

	const handle = isPresent(mediaHandle) ? mediaHandle : mediaId
	if (isPresent(handle) && !mediaType) {
		throw new TypeError('mediaId requires a media newsletter status')
	}

	if (mediaType && !isPresent(handle)) {
		throw new TypeError('Native newsletter status media requires the media handle returned by the newsletter upload')
	}

	if (interactionType === 'question_reshare' && !mediaType) {
		throw new TypeError('question_reshare requires media')
	}

	if (interactionType === 'question_response') {
		if (mediaType) throw new TypeError('question_response is published as a text status')
		if (!isPresent(parentServerId)) throw new TypeError('question_response requires parentServerId')
	}

	const attrs: Record<string, string> = { to: jid, id: messageId, type: mediaType ? 'media' : 'text' }
	if (mediaType) attrs.media_id = String(handle)
	if (interactionType === 'question_response') {
		attrs.server_id = toNewsletterServerId(parentServerId, 'parentServerId')
	}

	const content: BinaryNode[] = [
		{
			tag: 'plaintext',
			attrs: mediaType ? { mediatype: mediaType } : {},
			content: resolveStatusPayload({ message, payload })
		}
	]

	const metaNode = buildMetaNode({ interactionType, parentServerId, responseServerId, aiContent })
	if (metaNode) content.push(metaNode)

	return { tag: 'status', attrs, content }
}

export const buildNewsletterStatusReactionNode = ({
	jid,
	messageId,
	parentServerId,
	reaction
}: {
	jid: string
	messageId: string
	parentServerId: string | number
	reaction?: string | null
}): BinaryNode => {
	assertNewsletterJid(jid)
	if (!messageId) throw new TypeError('Newsletter status reaction messageId is required')
	if (!isPresent(parentServerId)) {
		throw new TypeError('Newsletter status reaction requires parentServerId')
	}

	const isRevoke = !isPresent(reaction)
	const attrs: Record<string, string> = {
		to: jid,
		id: messageId,
		server_id: toNewsletterServerId(parentServerId, 'parentServerId'),
		type: 'reaction'
	}
	if (isRevoke) attrs.edit = NEWSLETTER_STATUS_EDIT_REACTION_REVOKE

	return {
		tag: 'status',
		attrs,
		content: [{ tag: 'reaction', attrs: isRevoke ? {} : { code: reaction as string }, content: undefined }]
	}
}

export const buildNewsletterStatusRevokeNode = ({ jid, statusId }: { jid: string; statusId: string }): BinaryNode => {
	assertNewsletterJid(jid)
	if (!statusId) throw new TypeError('Newsletter status revoke requires the status id')

	return {
		tag: 'status',
		attrs: { to: jid, id: statusId, type: 'text', edit: NEWSLETTER_STATUS_EDIT_ADMIN_REVOKE },
		content: [{ tag: 'plaintext', attrs: {}, content: undefined }]
	}
}

const sendStatusNode = async (
	sock: NewsletterStatusSocket,
	node: BinaryNode,
	{ jid, messageId, timeoutMs }: { jid: string; messageId: string; timeoutMs: number }
) => {
	const diagnostics = collectStatusCallbacks(sock)
	const responsePromise = sock.waitForMessage(messageId, timeoutMs)

	try {
		await sock.sendNode(node)
		const response = await responsePromise
		return assertStatusServerResponse(response, { jid, messageId, callbacks: diagnostics.frames })
	} finally {
		diagnostics.stop()
	}
}

const decodeStatusPayload = (plaintext?: BinaryNode) => {
	const bytes = plaintext?.content
	if (!bytes || Array.isArray(bytes)) return undefined
	return proto.Message.decode(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes as any))
}

const parseStatusAdminProfile = (meta?: BinaryNode) => {
	const adminProfile = meta && getBinaryNodeChild(meta, 'admin_profile')
	if (!adminProfile) return undefined

	const name = getBinaryNodeChild(adminProfile, 'name')
	const picture = getBinaryNodeChild(adminProfile, 'picture')
	const content = name?.content
	return {
		id: adminProfile.attrs?.id,
		name:
			typeof content === 'string'
				? content
				: content instanceof Uint8Array
					? Buffer.from(content).toString('utf-8')
					: undefined,
		pictureId: picture?.attrs?.id,
		pictureDirectPath: picture?.attrs?.direct_path
	}
}

const parseStatusNode = (status: BinaryNode) => {
	const plaintext = getBinaryNodeChild(status, 'plaintext')
	const reaction = getBinaryNodeChild(status, 'reaction')
	const meta = getBinaryNodeChild(status, 'meta')
	const reactions = getBinaryNodeChild(status, 'reactions')
	const viewsCount = getBinaryNodeChild(status, 'views_count')
	const responsesCount = getBinaryNodeChild(status, 'responses_count')
	return {
		id: status.attrs?.id,
		serverId: readIntAttr(status.attrs, 'server_id'),
		t: readIntAttr(status.attrs, 't'),
		isSender: status.attrs?.is_sender === 'true',
		type: status.attrs?.type,
		edit: status.attrs?.edit,
		mediaType: plaintext?.attrs?.mediatype,
		interactionType: meta?.attrs?.interaction_type,
		reaction: reaction ? (reaction.attrs?.code ?? '') : undefined,
		adminProfile: parseStatusAdminProfile(meta),
		paidPartnership: meta ? !!getBinaryNodeChild(meta, 'paid_partnership') : false,
		aiContent: meta ? !!getBinaryNodeChild(meta, 'ai_content') : false,
		editTimestamp: readIntAttr(meta?.attrs, 'msg_edit_t'),
		originalTimestamp: readIntAttr(meta?.attrs, 'original_msg_t'),
		reactionCounts: reactions
			? getBinaryNodeChildren(reactions, 'reaction').map(entry => ({
					code: entry.attrs?.code,
					count: readIntAttr(entry.attrs, 'count')
				}))
			: undefined,
		viewsCount: readIntAttr(viewsCount?.attrs, 'count'),
		responsesCount: readIntAttr(responsesCount?.attrs, 'count'),
		message: decodeStatusPayload(plaintext),
		node: status
	}
}

export const parseNewsletterStatusesResponse = (node: BinaryNode) => {
	const statuses = getBinaryNodeChild(node, 'statuses')
	if (!statuses) {
		const children = Array.isArray(node?.content) ? node.content.map(child => child?.tag) : []
		throw new Boom(`Newsletter statuses response has no <statuses> child, got [${children.join(', ')}]`, { data: node })
	}

	return {
		jid: statuses.attrs?.jid,
		t: readIntAttr(statuses.attrs, 't'),
		statuses: getBinaryNodeChildren(statuses, 'status').map(parseStatusNode)
	}
}

export const parseNewsletterStatusUpdatesResponse = (node: BinaryNode) => {
	const updates = getBinaryNodeChild(node, 'status_updates')
	if (!updates) {
		const children = Array.isArray(node?.content) ? node.content.map(child => child?.tag) : []
		throw new Boom(`Newsletter status updates response has no <status_updates> child, got [${children.join(', ')}]`, {
			data: node
		})
	}

	return parseNewsletterStatusesResponse(updates)
}

export interface NewsletterStatusConfig {
	logger?: any
	mediaCache?: any
	options?: any
}

export const makeNewsletterStatusExtras = (sock: NewsletterStatusSocket, config: NewsletterStatusConfig = {}) => {
	const logger = config.logger ?? sock.logger

	return {
		/**
		 * Posts a channel status. `content` is any content `sock.sendMessage` understands (text / image / video / gif /
		 * audio, `question`, ...). Options: `aiContent`, `interactionType`, `parentServerId`, `responseServerId`,
		 * `statusAttribution` (default true), `messageId`, `ackTimeoutMs`, `resolveServerId`, `serverIdTimeoutMs`.
		 * Returns the message with `newsletterStatusServerId` (needed for reactions / revoke).
		 */
		sendNewsletterStatus: async (jid: string, content: any, options: Record<string, any> = {}) => {
			assertNewsletterJid(jid)
			if (!content || typeof content !== 'object' || Array.isArray(content)) {
				throw new TypeError('Newsletter status content must be an object')
			}

			const userJid = sock.authState?.creds?.me?.id
			if (!userJid) throw new TypeError('Not authenticated')

			const {
				mediaId,
				mediaHandle: requestedMediaHandle,
				parentServerId,
				responseServerId,
				interactionType: requestedInteractionType,
				aiContent,
				statusAttribution = true,
				messageId: requestedMessageId,
				ackTimeoutMs,
				resolveServerId,
				serverIdTimeoutMs,
				transport,
				...messageOptions
			} = options

			if (transport !== undefined) {
				logger?.warn?.(
					{ transport },
					'newsletter status "transport" option is obsolete, the verified status-publish transport is always used'
				)
			}

			let uploadedMediaHandle: string | undefined
			const upload = async (...args: any[]) => {
				const result = await sock.waUploadToServer(...args)
				if (args[1]?.newsletter) {
					uploadedMediaHandle =
						result?.handle ?? result?.media_id ?? result?.mediaId ?? result?.fbid ?? uploadedMediaHandle
				}

				return result
			}

			const preparedContent = prepareModernMessageContent(content)
			const fullMsg: any = await generateWAMessage(
				jid,
				statusAttribution ? withNewsletterStatusAttribution(preparedContent) : preparedContent,
				{
					logger,
					userJid,
					upload,
					mediaCache: config.mediaCache,
					options: config.options,
					...messageOptions,
					messageId: requestedMessageId || generateMessageIDV2(userJid)
				} as any
			)

			const normalized: any = normalizeMessageContent(fullMsg.message)
			const mediaType = getNewsletterStatusMediaType(fullMsg.message)
			if (!mediaType && (normalized?.documentMessage || normalized?.stickerMessage)) {
				throw new TypeError('Native newsletter status supports text, image, video, gif, and audio')
			}

			if (mediaType && !NEWSLETTER_STATUS_WEB_MEDIA_TYPES.has(mediaType)) {
				logger?.warn?.(
					{ mediaType },
					'newsletter status media type is not published by WhatsApp Web itself, the server may reject it'
				)
			}

			const interactionType = requestedInteractionType || (content.question ? 'question' : undefined)
			if (interactionType === 'question' && !mediaType) {
				logger?.warn?.(
					'WhatsApp Web only publishes question newsletter statuses on top of media, a text question status may be rejected'
				)
			}

			const node = buildNewsletterStatusNode({
				jid,
				message: fullMsg.message,
				messageId: fullMsg.key.id,
				mediaType,
				mediaHandle: requestedMediaHandle ?? mediaId ?? uploadedMediaHandle,
				parentServerId,
				responseServerId,
				interactionType,
				aiContent
			})

			const echo =
				resolveServerId === false
					? null
					: waitForNewsletterStatusServerId(sock, {
							jid,
							messageId: fullMsg.key.id,
							timeoutMs: serverIdTimeoutMs ?? NEWSLETTER_STATUS_SERVER_ID_TIMEOUT_MS
						})

			let ack
			try {
				ack = await sendStatusNode(sock, node, {
					jid,
					messageId: fullMsg.key.id,
					timeoutMs: ackTimeoutMs ?? NEWSLETTER_STATUS_ACK_TIMEOUT_MS
				})
			} catch (error) {
				echo?.cancel?.()
				throw error
			}

			const delivered = echo ? await echo : undefined

			fullMsg.status = WAMessageStatus.SERVER_ACK
			fullMsg.newsletterStatusServerId = ack.serverId ?? delivered?.serverId
			fullMsg.newsletterStatusAck = ack
			fullMsg.newsletterStatusResponse = ack.node
			if (delivered) fullMsg.newsletterStatusDelivered = delivered.node
			return fullMsg
		},

		/** react to a channel status; `reaction: null` removes your reaction */
		sendNewsletterStatusReaction: async (
			jid: string,
			parentServerId: string | number,
			reaction?: string | null,
			options: { messageId?: string; ackTimeoutMs?: number } = {}
		) => {
			assertNewsletterJid(jid)
			const userJid = sock.authState?.creds?.me?.id
			if (!userJid) throw new TypeError('Not authenticated')

			const messageId = options.messageId || generateMessageIDV2(userJid)
			const node = buildNewsletterStatusReactionNode({ jid, messageId, parentServerId, reaction })
			const ack = await sendStatusNode(sock, node, {
				jid,
				messageId,
				timeoutMs: options.ackTimeoutMs ?? NEWSLETTER_STATUS_ACK_TIMEOUT_MS
			})

			return {
				key: { remoteJid: jid, fromMe: true, id: messageId },
				status: WAMessageStatus.SERVER_ACK,
				newsletterStatusServerId: ack.serverId,
				newsletterStatusAck: ack,
				newsletterStatusResponse: ack.node
			}
		},

		/** delete one of your channel statuses (`statusId` is the message id of the status you sent) */
		revokeNewsletterStatus: async (jid: string, statusId: string, options: { ackTimeoutMs?: number } = {}) => {
			assertNewsletterJid(jid)
			const userJid = sock.authState?.creds?.me?.id
			if (!userJid) throw new TypeError('Not authenticated')

			const node = buildNewsletterStatusRevokeNode({ jid, statusId })
			const ack = await sendStatusNode(sock, node, {
				jid,
				messageId: statusId,
				timeoutMs: options.ackTimeoutMs ?? NEWSLETTER_STATUS_ACK_TIMEOUT_MS
			})

			return {
				key: { remoteJid: jid, fromMe: true, id: statusId },
				status: WAMessageStatus.SERVER_ACK,
				newsletterStatusAck: ack,
				newsletterStatusResponse: ack.node
			}
		},

		/** statuses of a channel: `{ jid, t, statuses: [...] }` */
		getNewsletterStatuses: async (
			jid: string,
			options: { count?: number; before?: string | number; after?: string | number; viewRole?: string } = {}
		) => {
			assertNewsletterJid(jid)
			const { count = 20, before, after, viewRole } = options
			const attrs: Record<string, string> = { type: 'jid', jid }
			if (isPresent(viewRole)) attrs.view_role = String(viewRole).toLowerCase()
			attrs.count = String(count)
			if (isPresent(before)) attrs.before = toNewsletterServerId(before, 'before')
			else if (isPresent(after)) attrs.after = toNewsletterServerId(after, 'after')

			const result = await sock.query({
				tag: 'iq',
				attrs: { to: S_WHATSAPP_NET, xmlns: 'newsletter', type: 'get' },
				content: [{ tag: 'statuses', attrs, content: undefined }]
			})
			return parseNewsletterStatusesResponse(result)
		},

		/** status updates (reactions / views counters) of a channel since a timestamp */
		getNewsletterStatusUpdates: async (
			jid: string,
			options: { count?: number; since?: number; before?: string | number; after?: string | number } = {}
		) => {
			assertNewsletterJid(jid)
			const { count = 20, since, before, after } = options
			const attrs: Record<string, string> = { count: String(count) }
			if (isPresent(since)) attrs.since = String(since)
			if (isPresent(before)) attrs.before = toNewsletterServerId(before, 'before')
			else if (isPresent(after)) attrs.after = toNewsletterServerId(after, 'after')

			const result = await sock.query({
				tag: 'iq',
				attrs: { to: jid, xmlns: 'newsletter', type: 'get' },
				content: [{ tag: 'status_updates', attrs, content: undefined }]
			})
			return parseNewsletterStatusUpdatesResponse(result)
		}
	}
}

/** Standalone factory forms of the channel status helpers (same behaviour as the `sock.*` methods). */
export const makeNewsletterStatusSender = (sock: NewsletterStatusSocket, config: NewsletterStatusConfig = {}) =>
	makeNewsletterStatusExtras(sock, config).sendNewsletterStatus
export const makeNewsletterStatusReactionSender = (sock: NewsletterStatusSocket, config: NewsletterStatusConfig = {}) =>
	makeNewsletterStatusExtras(sock, config).sendNewsletterStatusReaction
export const makeNewsletterStatusRevokeSender = (sock: NewsletterStatusSocket, config: NewsletterStatusConfig = {}) =>
	makeNewsletterStatusExtras(sock, config).revokeNewsletterStatus
export const makeNewsletterStatusFetcher = (sock: NewsletterStatusSocket, config: NewsletterStatusConfig = {}) =>
	makeNewsletterStatusExtras(sock, config).getNewsletterStatuses
export const makeNewsletterStatusUpdatesFetcher = (sock: NewsletterStatusSocket, config: NewsletterStatusConfig = {}) =>
	makeNewsletterStatusExtras(sock, config).getNewsletterStatusUpdates
