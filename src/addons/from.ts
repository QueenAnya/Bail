/**
 * from.ts
 * Helpers ported directly from Baileys Socket/Utils source files.
 *
 * Sources:
 *   Section 1 — src/Socket/chats.ts          (chat modification helpers)
 *   Section 2 — src/Utils/messages.ts         (message content builders: adminInvite, call, paymentInvite, stickerPack)
 *   Section 3 — src/Socket/messages-recv.ts   (call handler factory: makeCallHandlers)
 *   Section 4 — src/Socket/messages-send.ts   (status mention helpers: execSendStatusMentions)
 */

// ─────────────────────────────────────────────────────────────────────────────
// Source: from-chats.ts
// ─────────────────────────────────────────────────────────────────────────────

import Long from 'long'
import type { WAMessageKey, ChatModification } from '../Types'

export function buildClearMessageModification(key: WAMessageKey, timeStamp: number | Long): ChatModification {
	return {
		delete: true,
		lastMessages: [{ key, messageTimestamp: timeStamp }]
	}
}

export function createChatHelpers(chatModify: (mod: ChatModification, jid: string) => Promise<any>) {
	return {
		clearMessage: (jid: string, key: WAMessageKey, timeStamp: number | Long) => {
			return chatModify(buildClearMessageModification(key, timeStamp), jid)
		}
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Source: from-messages.ts
// ─────────────────────────────────────────────────────────────────────────────

import { gunzipSync, gzipSync } from 'zlib'
import { promises as fs } from 'fs'
import { zipSync } from 'fflate'
import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto/index.js'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics'
import { sha256 } from '../Utils/crypto'
import { encryptedStream, getImageProcessingLibrary, getStream, toBuffer } from '../Utils/messages-media'
import { generateThumbnail } from '../Utils/messages-media'
import type { MessageContentGenerationOptions } from '../Types'
import type { AdminInviteInfo, CallCreationInfo, PaymentInviteInfo, StickerPack } from '../Types/Message'

// ── adminInvite → newsletterAdminInviteMessage ─────────────────────────────

export async function buildAdminInviteMessage(
	adminInvite: AdminInviteInfo,
	contextInfo: any,
	options: MessageContentGenerationOptions
): Promise<proto.Message.INewsletterAdminInviteMessage> {
	const msg: proto.Message.INewsletterAdminInviteMessage = {
		newsletterJid: adminInvite.jid,
		newsletterName: adminInvite.name,
		caption: adminInvite.caption,
		inviteExpiration: adminInvite.expiration,
		contextInfo
	}
	if (options.getProfilePicUrl) {
		try {
			const pfpUrl = await options.getProfilePicUrl(adminInvite.jid, 'preview')
			if (pfpUrl) {
				const { thumbnail } = await generateThumbnail(pfpUrl, 'image', {})
				if (thumbnail) msg.jpegThumbnail = Buffer.from(thumbnail, 'base64')
			}
		} catch {}
	}
	return msg
}

// ── call → scheduledCallCreationMessage ───────────────────────────────────

export function buildCallMessage(call: CallCreationInfo): proto.Message.IScheduledCallCreationMessage {
	return {
		scheduledTimestampMs: call.time ?? Date.now(),
		callType: call.type ?? 1,
		title: call.name ?? 'Call'
	}
}

// ── paymentInvite → paymentInviteMessage ──────────────────────────────────

export function buildPaymentInviteMessage(paymentInvite: PaymentInviteInfo): proto.Message.IPaymentInviteMessage {
	return {
		expiryTimestamp: paymentInvite.expiry ?? 0,
		serviceType: paymentInvite.type ?? 2
	}
}

// ── stickerPack → stickerPackMessage ──────────────────────────────────────

export function isWebPBuffer(buffer: Buffer): boolean {
	if (buffer.length < 12) return false
	const riffHeader = buffer.toString('ascii', 0, 4)
	const webpHeader = buffer.toString('ascii', 8, 12)
	return riffHeader === 'RIFF' && webpHeader === 'WEBP'
}

export function isAnimatedWebP(buffer: Buffer): boolean {
	if (!isWebPBuffer(buffer)) return false
	// VP8X chunk starts at offset 12 for extended WebP
	try {
		let offset = 12
		while (offset + 8 <= buffer.length) {
			const chunkId = buffer.toString('ascii', offset, offset + 4)
			const chunkSize = buffer.readUInt32LE(offset + 4)
			if (chunkId === 'VP8X') {
				// flags byte at offset+8, bit 1 (0x02) = animation
				const flags = buffer[offset + 8] ?? 0
				return (flags & 0x02) !== 0
			}
			offset += 8 + chunkSize + (chunkSize % 2)
		}
	} catch {}
	return false
}

export function isLottieBuffer(buffer: Buffer): boolean {
	if (buffer.length < 2) return false
	let jsonBuffer: Buffer

	if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
		// gzip-compressed
		try {
			jsonBuffer = gunzipSync(buffer, { maxOutputLength: 50 * 1024 * 1024 }) as Buffer
		} catch {
			return false
		}
	} else if (buffer[0] === 0x7b) {
		// raw JSON starts with '{'
		jsonBuffer = buffer
	} else {
		return false
	}

	try {
		const str = jsonBuffer.toString('utf8', 0, Math.min(jsonBuffer.length, 4096))
		return str.includes('"v"') && str.includes('"layers"') && str.includes('"ip"') && str.includes('"op"')
	} catch {
		return false
	}
}

export async function buildStickerPackMessage(
	stickerPack: StickerPack,
	options: MessageContentGenerationOptions
): Promise<proto.Message.IStickerPackMessage> {
	const { stickers, cover, name, publisher, packId, description } = stickerPack
	const stickerPackId = packId || generateMessageIDV2()
	const stickerData: Record<string, any> = {}

	// ── Step 1: Process stickers ──────────────────────────────────────────
	const validStickers = (stickers as any[]).filter(s => s !== null && s !== undefined)
	if (validStickers.length < 1) {
		throw new Error('Sticker pack must contain at least one sticker')
	}

	const stickerMetadata = await Promise.all(
		validStickers.map(async (s: any, i: number) => {
			const raw = s.sticker ?? s.data
			const normalized = Buffer.isBuffer(raw) ? raw : typeof raw === 'string' ? { url: raw } : raw
			const { stream } = await getStream(normalized)
			const buffer = (await toBuffer(stream)) as Buffer

			// Lottie/WAS detection (PR #260)
			const detectedLottie = s.isLottie !== undefined ? s.isLottie : isLottieBuffer(buffer)
			let finalBuffer = buffer

			if (detectedLottie) {
				// Raw Lottie JSON → gzip to WAS
				if (buffer[0] === 0x7b) {
					finalBuffer = gzipSync(buffer) as Buffer
				}
			} else if (isWebPBuffer(buffer)) {
				finalBuffer = buffer // preserve WebP as-is (keeps EXIF + animation)
			} else {
				// Non-WebP sticker — needs sharp to convert (jimp can't output WebP)
				const lib = await getImageProcessingLibrary()
				if (lib?.sharp) {
					finalBuffer = await lib.sharp.default(buffer).webp().toBuffer()
				} else {
					throw new Boom(
						`Sticker ${i + 1}: No image processing library (sharp) available for converting to WebP. Either install sharp or provide stickers in WebP format.`,
						{ statusCode: 400 }
					)
				}
			}

			const isAnimated = detectedLottie ? true : isAnimatedWebP(finalBuffer)
			const extension = detectedLottie ? 'was' : 'webp'
			// Use sha256 hash for filename (deduplication) — RFC 4648 base64url
			const hash = sha256(finalBuffer).toString('base64url')
			const fileName = `${hash}.${extension}`

			// Dedup: only add if not already in stickerData
			if (!stickerData[fileName]) {
				stickerData[fileName] = [new Uint8Array(finalBuffer), { level: 0 as 0 }]
			}

			return {
				fileName,
				mimetype: detectedLottie ? 'application/was' : 'image/webp',
				isAnimated,
				isLottie: detectedLottie,
				emojis: s.emojis || [],
				accessibilityLabel: s.accessibilityLabel || ''
			}
		})
	)

	// ── Step 2: Process cover (tray icon) → add INSIDE ZIP ───────────────
	const coverRaw = Buffer.isBuffer(cover) ? cover : typeof cover === 'string' ? { url: cover } : cover
	const { stream: coverStream } = await getStream(coverRaw)
	const coverBuffer = (await toBuffer(coverStream)) as Buffer

	// Cover as WebP in ZIP (tray icon)
	let coverWebP: Buffer
	if (isWebPBuffer(coverBuffer)) {
		coverWebP = coverBuffer
	} else {
		const lib = await getImageProcessingLibrary()
		if (lib?.sharp) {
			coverWebP = await lib.sharp.default(coverBuffer).webp().toBuffer()
		} else {
			throw new Boom(
				'No image processing library (sharp) available for converting cover to WebP. Either install sharp or provide cover in WebP format.',
				{ statusCode: 400 }
			)
		}
	}

	const trayIconFileName = `${stickerPackId}.webp`
	stickerData[trayIconFileName] = [new Uint8Array(coverWebP), { level: 0 as 0 }]

	// ── Step 3: ZIP + encrypt + upload as 'sticker-pack' ─────────────────
	const zipBuffer = Buffer.from(zipSync(stickerData))

	const stickerPackEncrypted = await encryptedStream(zipBuffer, 'sticker-pack' as any, {
		logger: options.logger,
		opts: options.options
	})

	const stickerPackResult = await options.upload(stickerPackEncrypted.encFilePath, {
		fileEncSha256B64: stickerPackEncrypted.fileEncSha256.toString('base64'),
		mediaType: 'sticker-pack' as any,
		timeoutMs: options.mediaUploadTimeoutMs
	})

	// Cleanup temp file
	try {
		await fs.unlink(stickerPackEncrypted.encFilePath)
	} catch {}

	// ── Step 4: Generate 252x252 JPEG thumbnail + upload as 'thumbnail-sticker-pack'
	// CRITICAL: same mediaKey as ZIP upload (required by WhatsApp protocol)
	let thumbnailBuffer: Buffer
	try {
		const lib = await getImageProcessingLibrary()
		if (lib?.sharp) {
			thumbnailBuffer = await lib.sharp.default(coverBuffer).resize(252, 252).jpeg().toBuffer()
		} else if (lib?.jimp) {
			const jimpImage = await lib.jimp.Jimp.read(coverBuffer)
			thumbnailBuffer = await jimpImage.resize({ w: 252, h: 252 }).getBuffer('image/jpeg')
		} else {
			throw new Error('No image processing library available for thumbnail generation')
		}
		if (!thumbnailBuffer || thumbnailBuffer.length === 0) {
			throw new Error('Failed to generate thumbnail buffer')
		}
	} catch {
		thumbnailBuffer = coverBuffer
	}

	const thumbEncrypted = await encryptedStream(thumbnailBuffer, 'thumbnail-sticker-pack' as any, {
		logger: options.logger,
		opts: options.options,
		mediaKey: stickerPackEncrypted.mediaKey // SAME mediaKey — protocol requirement!
	})

	const thumbResult = await options.upload(thumbEncrypted.encFilePath, {
		fileEncSha256B64: thumbEncrypted.fileEncSha256.toString('base64'),
		mediaType: 'thumbnail-sticker-pack' as any,
		timeoutMs: options.mediaUploadTimeoutMs
	})

	// Cleanup thumb temp file
	try {
		await fs.unlink(thumbEncrypted.encFilePath)
	} catch {}

	// ── Step 5: Return complete IStickerPackMessage ───────────────────────
	return {
		name,
		publisher,
		stickerPackId,
		packDescription: description,
		stickerPackOrigin: proto.Message.StickerPackMessage.StickerPackOrigin.USER_CREATED,
		stickerPackSize: zipBuffer.length,
		stickers: stickerMetadata,

		// ZIP upload fields
		fileSha256: stickerPackEncrypted.fileSha256,
		fileEncSha256: stickerPackEncrypted.fileEncSha256,
		mediaKey: stickerPackEncrypted.mediaKey,
		directPath: stickerPackResult.directPath,
		fileLength: zipBuffer.length,
		mediaKeyTimestamp: unixTimestampSeconds(),

		// Tray icon (cover filename inside ZIP)
		trayIconFileName,

		// Thumbnail upload fields (separate 252x252 JPEG, same mediaKey)
		thumbnailDirectPath: thumbResult.directPath,
		thumbnailSha256: thumbEncrypted.fileSha256,
		thumbnailEncSha256: thumbEncrypted.fileEncSha256,
		thumbnailHeight: 252,
		thumbnailWidth: 252,
		imageDataHash: sha256(thumbnailBuffer).toString('base64')
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Source: from-messages-recv.ts
// ─────────────────────────────────────────────────────────────────────────────

import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { encodeSignedDeviceIdentity } from '../Utils'
import type { BinaryNode } from '../WABinary'
import { isJidGroup, jidEncode } from '../WABinary'
import type { WACallEvent, WAInitiateCallOptions, WAInitiateCallResult } from '../Types'

export type CallHandlerDeps = {
	authState: any
	query: (node: BinaryNode) => Promise<any>
	sendNode: (node: BinaryNode) => Promise<void>
	generateMessageTag: () => string
	getUSyncDevices: (
		jids: string[],
		useCache: boolean,
		ignoreZeroDevices: boolean
	) => Promise<Array<{ user: string; device?: number }>>
	assertSessions: (jids: string[], force?: boolean) => Promise<any>
	createParticipantNodes: (
		jids: string[],
		message: any,
		extraAttrs?: any
	) => Promise<{ nodes: BinaryNode[]; shouldIncludeDeviceIdentity: boolean }>
	callOfferCache: { set: (k: string, v: any, ttl?: number) => any; del: (k: string) => any }
}

export function makeCallHandlers(deps: CallHandlerDeps) {
	const {
		authState,
		query,
		sendNode,
		generateMessageTag,
		getUSyncDevices,
		assertSessions,
		createParticipantNodes,
		callOfferCache
	} = deps

	/** Reject an incoming call (WhiskeySockets) */
	const rejectCall = async (callId: string, callFrom: string) => {
		await query({
			tag: 'call',
			attrs: { from: authState.creds.me!.id, to: callFrom },
			content: [
				{
					tag: 'reject',
					attrs: { 'call-id': callId, 'call-creator': callFrom, count: '0' },
					content: undefined
				}
			]
		})
	}

	/** Build and send a call offer stanza with proper E2E encryption (baileys) */
	const offerCall = async (toJid: string, isVideo = false) => {
		const callId = randomBytes(16).toString('hex').toUpperCase().substring(0, 64)
		const offerContent: BinaryNode[] = []

		if (isVideo) {
			offerContent.push({
				tag: 'video',
				attrs: {
					enc: 'vp8',
					dec: 'vp8',
					orientation: '0',
					screen_width: '1920',
					screen_height: '1080',
					device_orientation: '0'
				},
				content: undefined
			})
		}
		offerContent.push({ tag: 'audio', attrs: { enc: 'opus', rate: '16000' }, content: undefined })
		offerContent.push({ tag: 'audio', attrs: { enc: 'opus', rate: '8000' }, content: undefined })
		offerContent.push({ tag: 'net', attrs: { medium: '3' }, content: undefined })
		offerContent.push({ tag: 'capability', attrs: { ver: '1' }, content: new Uint8Array([1, 4, 255, 131, 207, 4]) })
		offerContent.push({ tag: 'encopt', attrs: { keygen: '2' }, content: undefined })

		const encKey = randomBytes(32)
		const devices = (await getUSyncDevices([toJid], true, false)).map(({ user, device }) =>
			jidEncode(user, 's.whatsapp.net', device)
		)
		await assertSessions(devices, true)

		const { nodes: destinations, shouldIncludeDeviceIdentity } = await createParticipantNodes(
			devices,
			{ call: { callKey: new Uint8Array(encKey) } },
			{ count: '0' }
		)
		offerContent.push({ tag: 'destination', attrs: {}, content: destinations })

		if (shouldIncludeDeviceIdentity) {
			offerContent.push({
				tag: 'device-identity',
				attrs: {},
				content: encodeSignedDeviceIdentity(authState.creds.account!, true)
			})
		}

		await query({
			tag: 'call',
			attrs: { id: generateMessageTag(), to: toJid },
			content: [
				{
					tag: 'offer',
					attrs: { 'call-id': callId, 'call-creator': authState.creds.me!.id },
					content: offerContent
				}
			]
		})
		return { id: callId, to: toJid }
	}

	/** Initiate an outgoing call — calls offerCall, caches state (PR #2375 + addons) */
	const initiateCall = async (jid: string, options: WAInitiateCallOptions = {}): Promise<WAInitiateCallResult> => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated')

		const isVideo = !!options.isVideo
		const isGroup = isJidGroup(jid)
		const result = await offerCall(jid, isVideo)
		const callId = result.id

		await callOfferCache.set(callId, {
			chatId: jid,
			from: meId,
			id: callId,
			date: new Date(),
			offline: false,
			status: 'offer',
			isVideo,
			isGroup,
			groupJid: isGroup ? jid : undefined
		} as WACallEvent)

		return { callId, to: jid, isVideo }
	}

	/** Terminate/hang up an active or ringing call (baileys) */
	const terminateCall = async (
		callId: string,
		callTo: string,
		callCreator?: string,
		reason?: string,
		duration?: number
	) => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const attrs: Record<string, string> = { 'call-id': callId, 'call-creator': callCreator || meId }
		if (reason) attrs.reason = reason
		if (typeof duration === 'number') {
			attrs.duration = String(duration)
			attrs.audio_duration = String(duration)
		}

		await query({
			tag: 'call',
			attrs: { to: callTo, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'terminate', attrs, content: undefined }]
		})
		await callOfferCache.del(callId)
	}

	/** Cancel an outgoing call — delegates to terminateCall */
	const cancelCall = async (callId: string, callTo: string) => terminateCall(callId, callTo)

	/** Accept (answer) an incoming call (baileys) */
	const acceptCall = async (callId: string, callFrom: string, isVideo?: boolean) => {
		const meId = authState.creds.me?.id
		if (!meId) throw new Boom('Not authenticated', { statusCode: 401 })

		const content: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) content.push({ tag: 'video', attrs: { dec: 'H264,AV1', device_orientation: '1' }, content: undefined })
		content.push(
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined }
		)
		await query({
			tag: 'call',
			attrs: { from: meId, to: callFrom, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'accept', attrs: { 'call-id': callId, 'call-creator': callFrom }, content }]
		})
	}

	/** Send preaccept signal (codec capabilities) for an incoming call (baileys) */
	const preacceptCall = async (callId: string, callCreator: string, isVideo?: boolean) => {
		const content: BinaryNode[] = [{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined }]
		if (isVideo) {
			content.push({
				tag: 'video',
				attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
				content: undefined
			})
		}
		content.push(
			{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		)
		await query({
			tag: 'call',
			attrs: { to: callCreator, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'preaccept', attrs: { 'call-id': callId, 'call-creator': callCreator }, content }]
		})
	}

	/** Report relay latency measurements (baileys) */
	const sendRelayLatency = async (
		callId: string,
		callCreator: string,
		relays: Array<{ relayName?: string; latency: number; relayId?: string; dlBw?: number; ulBw?: number }>,
		transactionId?: string
	) => {
		const attrs: Record<string, string> = { 'call-id': callId, 'call-creator': callCreator }
		if (transactionId) attrs['transaction-id'] = transactionId

		await sendNode({
			tag: 'call',
			attrs: { to: callCreator, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'relaylatency',
					attrs,
					content: relays.map(r => {
						const a: Record<string, string> = {}
						if (r.relayName) a.relay_name = r.relayName
						a.latency = String(r.latency)
						if (r.relayId) a.relay_id = r.relayId
						if (r.dlBw !== undefined) a.dl_bw = String(r.dlBw)
						if (r.ulBw !== undefined) a.ul_bw = String(r.ulBw)
						return { tag: 'te', attrs: a, content: undefined }
					})
				}
			]
		})
	}

	/** Send ICE transport candidates (baileys) */
	const sendTransport = async (
		callId: string,
		callCreator: string,
		to: string,
		candidates: Array<{ priority: string; data: Uint8Array }>,
		round?: number
	) => {
		const attrs: Record<string, string> = {
			'call-id': callId,
			'call-creator': callCreator,
			'transport-message-type': '1'
		}
		if (round !== undefined) attrs['p2p-cand-round'] = String(round)
		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'transport',
					attrs,
					content: candidates.map(c => ({ tag: 'te', attrs: { priority: c.priority }, content: c.data }))
				}
			]
		})
	}

	/** Send call duration log after a call ends (baileys) */
	const sendCallDuration = async (
		callId: string,
		callCreator: string,
		peer: string,
		audioDuration: number,
		callType = '1x1'
	) => {
		await sendNode({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'duration',
					attrs: {
						'call-id': callId,
						'call-creator': callCreator,
						peer,
						audio_duration: String(audioDuration),
						type: callType
					},
					content: undefined
				}
			]
		})
	}

	/** Mute or unmute during a call (baileys) */
	const muteCall = async (callId: string, callCreator: string, to: string, muted: boolean) => {
		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'mute_v2',
					attrs: { 'mute-state': muted ? '1' : '0', 'call-id': callId, 'call-creator': callCreator },
					content: undefined
				}
			]
		})
	}

	/** Send heartbeat to keep a group/link call alive (baileys) */
	const sendHeartbeat = async (callId: string, callCreator: string) => {
		await sendNode({
			tag: 'call',
			attrs: { to: `${callId}@call`, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'heartbeat', attrs: { 'call-id': callId, 'call-creator': callCreator }, content: undefined }]
		})
	}

	/** Send encryption re-key during a call (baileys) */
	const sendEncRekey = async (callId: string, callCreator: string, to: string, transactionId: string) => {
		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'enc_rekey',
					attrs: { 'transaction-id': transactionId, 'call-id': callId, 'call-creator': callCreator },
					content: [
						{ tag: 'encopt', attrs: { keygen: '2' }, content: undefined },
						{ tag: 'enc', attrs: { v: '2', type: 'msg' }, content: undefined }
					]
				}
			]
		})
	}

	/** Send video state change during a call (baileys) */
	const sendVideoState = async (
		callId: string,
		callCreator: string,
		to: string,
		enabled: boolean,
		orientation = '1'
	) => {
		await sendNode({
			tag: 'call',
			attrs: { to, id: randomBytes(16).toString('hex').toUpperCase() },
			content: [
				{
					tag: 'video',
					attrs: {
						'call-id': callId,
						'call-creator': callCreator,
						state: enabled ? '1' : '0',
						device_orientation: orientation
					},
					content: undefined
				}
			]
		})
	}

	/** Query info about a call link before joining (baileys) */
	const queryCallLink = async (token: string, media = 'video') => {
		return await query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_query', attrs: { media, token }, content: undefined }]
		})
	}

	/** Join a call via its link token (baileys) */
	const joinCallLink = async (token: string, media = 'video') => {
		const content: BinaryNode[] = [
			{ tag: 'audio', attrs: { rate: '16000', enc: 'opus' }, content: undefined },
			{ tag: 'net', attrs: { medium: '2' }, content: undefined },
			{ tag: 'capability', attrs: { ver: '1' }, content: undefined }
		]
		if (media === 'video') {
			content.splice(1, 0, {
				tag: 'video',
				attrs: { screen_width: '1080', screen_height: '2400', dec: 'H264,H265,AV1', device_orientation: '0' },
				content: undefined
			})
		}
		return await query({
			tag: 'call',
			attrs: { to: 'call', id: randomBytes(16).toString('hex').toUpperCase() },
			content: [{ tag: 'link_join', attrs: { media, token }, content }]
		})
	}

	return {
		rejectCall,
		offerCall,
		initiateCall,
		terminateCall,
		cancelCall,
		acceptCall,
		preacceptCall,
		sendRelayLatency,
		sendTransport,
		sendCallDuration,
		muteCall,
		sendHeartbeat,
		sendEncRekey,
		sendVideoState,
		queryCallLink,
		joinCallLink
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Source: from-messages-send.ts
// ─────────────────────────────────────────────────────────────────────────────

import { randomBytes } from 'crypto'
import type { AnyMessageContent, WAMessage, MessageRelayOptions } from '../Types'
import { isJidGroup, jidNormalizedUser } from '../WABinary'
import { delay } from '../Utils/generics'
import { generateWAMessage, generateWAMessageFromContent } from '../Utils/messages'

const STORIES_JID = 'status@broadcast'

export interface StatusMentionDeps {
	meId: string
	logger: { error: (msg: string) => void }
	groupMetadata: (jid: string) => Promise<{ participants: Array<{ id: string }> }>
	cachedGroupMetadata?: (jid: string) => Promise<{ participants: Array<{ id: string }> } | undefined>
	generateWAMessageFn?: typeof generateWAMessage
	relayMessage: (jid: string, message: any, opts: any) => Promise<any>
	waUploadToServer: any
	getUrlInfo?: any
	config: any
	linkPreviewImageThumbnailWidth?: number
	generateHighQualityLinkPreview?: boolean
	httpRequestOptions?: any
}

export function normalizeStatusContent(content: AnyMessageContent): {
	msgContent: AnyMessageContent
	font?: number
	textColor?: string
	backgroundColor?: string
	ptt?: boolean
} {
	const getRandomHex = () =>
		'#' +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0')
	const isMedia = 'image' in content || 'video' in content || 'audio' in content
	const isAudio = 'audio' in content
	const msgContent = { ...content } as Record<string, unknown>

	if (isMedia && !isAudio) {
		if (msgContent.text) {
			msgContent.caption = msgContent.text
			delete msgContent.text
		}
		delete msgContent.ptt
		delete msgContent.font
		delete msgContent.backgroundColor
		delete msgContent.textColor
	}
	if (isAudio) {
		delete msgContent.text
		delete msgContent.caption
		delete msgContent.font
		delete msgContent.textColor
	}

	return {
		msgContent: msgContent as AnyMessageContent,
		font: !isMedia ? ((content as any).font ?? Math.floor(Math.random() * 9)) : undefined,
		textColor: !isMedia ? ((content as any).textColor ?? getRandomHex()) : undefined,
		backgroundColor: !isMedia || isAudio ? ((content as any).backgroundColor ?? getRandomHex()) : undefined,
		ptt: isAudio ? (typeof (content as any).ptt === 'boolean' ? (content as any).ptt : true) : undefined
	}
}

export function buildStatusMentionNode(jids: string[]): any {
	return {
		tag: 'meta',
		attrs: {},
		content: [
			{
				tag: 'mentioned_users',
				attrs: {},
				content: jids.map(jid => ({
					tag: 'to',
					attrs: { jid: jidNormalizedUser(jid) }
				}))
			}
		]
	}
}

export async function execSendStatusMentions(
	content: AnyMessageContent,
	jids: string[],
	deps: StatusMentionDeps
): Promise<WAMessage> {
	const {
		meId,
		logger,
		groupMetadata,
		cachedGroupMetadata,
		relayMessage,
		waUploadToServer,
		getUrlInfo,
		config,
		linkPreviewImageThumbnailWidth,
		generateHighQualityLinkPreview,
		httpRequestOptions
	} = deps

	const userJid = jidNormalizedUser(meId)
	const allUsers = new Set<string>([userJid])

	for (const id of jids) {
		const isGroup = isJidGroup(id)
		// match fork: isJidUser = ends with @s.whatsapp.net
		const isPrivate = id.endsWith('@s.whatsapp.net')

		if (isGroup) {
			try {
				// fork: cachedGroupMetadata first, then fallback to groupMetadata
				const meta = (cachedGroupMetadata ? await cachedGroupMetadata(id) : undefined) || (await groupMetadata(id))
				meta.participants.forEach(p => allUsers.add(jidNormalizedUser(p.id)))
			} catch (e) {
				logger.error(`Error getting metadata for group ${id}: ${e}`)
			}
		} else if (isPrivate) {
			allUsers.add(jidNormalizedUser(id))
		}
	}

	const { msgContent, font, textColor, backgroundColor, ptt } = normalizeStatusContent(content)

	const msg = await generateWAMessage(STORIES_JID, msgContent, {
		logger,
		userJid,
		getUrlInfo: getUrlInfo
			? (text: string) =>
					getUrlInfo(text, {
						thumbnailWidth: linkPreviewImageThumbnailWidth,
						fetchOpts: { timeout: 3000, ...(httpRequestOptions || {}) },
						logger,
						uploadImage: generateHighQualityLinkPreview ? waUploadToServer : undefined
					})
			: undefined,
		upload: waUploadToServer,
		mediaCache: config.mediaCache,
		options: config.options,
		font,
		backgroundColor,
		ptt,
		...(textColor ? { textColor } : {})
	} as any)

	await relayMessage(STORIES_JID, msg.message!, {
		messageId: msg.key.id!,
		statusJidList: Array.from(allUsers),
		additionalNodes: [buildStatusMentionNode(jids)]
	})

	for (const id of jids) {
		try {
			const normalizedId = jidNormalizedUser(id)
			const isPrivate = normalizedId.endsWith('@s.whatsapp.net')
			const type = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage'
			const protocolMessage = {
				[type]: { message: { protocolMessage: { key: msg.key, type: 25 } } },
				messageContextInfo: { messageSecret: randomBytes(32) }
			}
			const statusMsg = generateWAMessageFromContent(normalizedId, protocolMessage, { userJid: meId })
			await relayMessage(normalizedId, statusMsg.message!, {
				additionalNodes: [
					{
						tag: 'meta',
						attrs: isPrivate ? { is_status_mention: 'true' } : { is_group_status_mention: 'true' }
					}
				]
			})
			await delay(2000)
		} catch (e) {
			logger.error(`Error sending status mention to ${id}: ${e}`)
		}
	}

	return msg
}
