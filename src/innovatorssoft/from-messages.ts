/**
 * from-messages.ts
 * Source: src/Utils/messages.ts
 *
 * Message content builder functions ported from innovatorssoft/baileys.
 * These are imported back into generateWAMessageContent in messages.ts.
 */
import { proto } from '../../WAProto/index.js'
import { WAProto } from '../Types'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics'
import { sha256 } from '../Utils/crypto'
import { encryptedStream, getImageProcessingLibrary, getStream, toBuffer } from '../Utils/messages-media'
import { generateThumbnail } from '../Utils/messages-media'
import type { MessageContentGenerationOptions } from '../Types'
import type { AdminInviteInfo, CallCreationInfo, PaymentInviteInfo, StickerPack } from '../Types/Message'

// ── adminInvite → newsletterAdminInviteMessage ─────────────────────────────

/**
 * Build newsletterAdminInviteMessage from adminInvite content
 * Source: messages.ts → adminInvite block
 */
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
	if(options.getProfilePicUrl) {
		try {
			const pfpUrl = await options.getProfilePicUrl(adminInvite.jid, 'preview')
			if(pfpUrl) {
				const { thumbnail } = await generateThumbnail(pfpUrl, 'image', {})
				if(thumbnail) msg.jpegThumbnail = Buffer.from(thumbnail, 'base64')
			}
		} catch {}
	}
	return msg
}

// ── call → scheduledCallCreationMessage ───────────────────────────────────

/**
 * Build scheduledCallCreationMessage from call content
 * Source: messages.ts → call block
 */
export function buildCallMessage(call: CallCreationInfo): proto.Message.IScheduledCallCreationMessage {
	return {
		scheduledTimestampMs: call.time ?? Date.now(),
		callType: call.type ?? 1,
		title: call.name ?? 'Call'
	}
}

// ── paymentInvite → paymentInviteMessage ──────────────────────────────────

/**
 * Build paymentInviteMessage from paymentInvite content
 * Source: messages.ts → paymentInvite block
 */
export function buildPaymentInviteMessage(paymentInvite: PaymentInviteInfo): proto.Message.IPaymentInviteMessage {
	return {
		expiryTimestamp: paymentInvite.expiry ?? 0,
		serviceType: paymentInvite.type ?? 2
	}
}

// ── stickerPack → stickerPackMessage ──────────────────────────────────────

/**
 * Check if buffer is a valid WebP file (magic bytes: RIFF....WEBP)
 * Source: PR #84 rsalcara/InfiniteAPI
 */
export function isWebPBuffer(buffer: Buffer): boolean {
	if(buffer.length < 12) return false
	const riffHeader = buffer.toString('ascii', 0, 4)
	const webpHeader = buffer.toString('ascii', 8, 12)
	return riffHeader === 'RIFF' && webpHeader === 'WEBP'
}

/**
 * Detect animated WebP by checking VP8X chunk animation flag
 * Source: PR #84 rsalcara/InfiniteAPI
 */
export function isAnimatedWebP(buffer: Buffer): boolean {
	if(!isWebPBuffer(buffer)) return false
	// VP8X chunk starts at offset 12 for extended WebP
	try {
		let offset = 12
		while(offset + 8 <= buffer.length) {
			const chunkId = buffer.toString('ascii', offset, offset + 4)
			const chunkSize = buffer.readUInt32LE(offset + 4)
			if(chunkId === 'VP8X') {
				// flags byte at offset+8, bit 1 (0x02) = animation
				const flags = buffer[offset + 8] ?? 0
				return (flags & 0x02) !== 0
			}
			offset += 8 + chunkSize + (chunkSize % 2)
		}
	} catch {}
	return false
}

/**
 * Detect Lottie/WAS format (gzip-compressed or raw Lottie JSON)
 * WAS = WhatsApp Animated Sticker = gzip-compressed Lottie JSON
 * Source: PR #260 rsalcara/InfiniteAPI
 */
export function isLottieBuffer(buffer: Buffer): boolean {
	if(buffer.length < 2) return false
	let jsonBuffer: Buffer

	if(buffer[0] === 0x1f && buffer[1] === 0x8b) {
		// gzip-compressed
		try {
			const { gunzipSync } = require('zlib')
			jsonBuffer = gunzipSync(buffer, { maxOutputLength: 50 * 1024 * 1024 }) as Buffer
		} catch { return false }
	} else if(buffer[0] === 0x7b) {
		// raw JSON starts with '{'
		jsonBuffer = buffer
	} else {
		return false
	}

	try {
		const str = jsonBuffer.toString('utf8', 0, Math.min(jsonBuffer.length, 4096))
		return str.includes('"v"') && str.includes('"layers"') && str.includes('"ip"') && str.includes('"op"')
	} catch { return false }
}

/**
 * Build stickerPackMessage following PR #1561 (WhiskeySockets) + PR #84 + PR #260 approach:
 *
 * Architecture:
 * 1. Process stickers → WebP/WAS buffers (with Lottie support from PR #260)
 * 2. Cover (tray icon) → add to ZIP as ${packId}.webp inside ZIP
 * 3. ZIP everything → encrypt → upload as 'sticker-pack'
 * 4. Generate 252x252 JPEG thumbnail from cover → encrypt with SAME mediaKey → upload as 'thumbnail-sticker-pack'
 * 5. Return full IStickerPackMessage with both upload results
 *
 * KEY FIXES vs old implementation:
 * - Cover goes INSIDE ZIP (not uploaded separately as image)
 * - Thumbnail is separate 252x252 JPEG upload with same mediaKey
 * - stickerPackOrigin: USER_CREATED (not THIRD_PARTY)
 * - thumbnail-sticker-pack media type for thumbnail
 */
export async function buildStickerPackMessage(
	stickerPack: StickerPack,
	options: MessageContentGenerationOptions
): Promise<proto.Message.IStickerPackMessage> {
	const { stickers, cover, name, publisher, packId, description } = stickerPack
	const { zipSync } = await import('fflate' as any)

	const stickerPackId = packId || generateMessageIDV2()
	const stickerData: Record<string, any> = {}

	// ── Step 1: Process stickers ──────────────────────────────────────────
	const validStickers = (stickers as any[]).filter(s => s !== null && s !== undefined)
	if(validStickers.length < 1) {
		throw new Error('Sticker pack must contain at least one sticker')
	}

	const stickerMetadata = await Promise.all(validStickers.map(async (s: any, i: number) => {
		const raw = s.sticker ?? s.data
		const normalized = Buffer.isBuffer(raw) ? raw :
			typeof raw === 'string' ? { url: raw } : raw
		const { stream } = await getStream(normalized)
		const buffer = await toBuffer(stream) as Buffer

		// Lottie/WAS detection (PR #260)
		const detectedLottie = s.isLottie !== undefined ? s.isLottie : isLottieBuffer(buffer)
		let finalBuffer = buffer

		if(detectedLottie) {
			// Raw Lottie JSON → gzip to WAS
			if(buffer[0] === 0x7b) {
				const { gzipSync } = require('zlib')
				finalBuffer = gzipSync(buffer) as Buffer
			}
		} else if(isWebPBuffer(buffer)) {
			finalBuffer = buffer // preserve WebP as-is (keeps EXIF + animation)
		} else {
			// Non-WebP sticker — needs sharp to convert (jimp can't output WebP)
			const lib = await getImageProcessingLibrary()
			if(lib?.sharp) {
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
		if(!stickerData[fileName]) {
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
	}))

	// ── Step 2: Process cover (tray icon) → add INSIDE ZIP ───────────────
	const coverRaw = Buffer.isBuffer(cover) ? cover :
		typeof cover === 'string' ? { url: cover } : cover
	const { stream: coverStream } = await getStream(coverRaw)
	const coverBuffer = await toBuffer(coverStream) as Buffer

	// Cover as WebP in ZIP (tray icon)
	let coverWebP: Buffer
	if(isWebPBuffer(coverBuffer)) {
		coverWebP = coverBuffer
	} else {
		const lib = await getImageProcessingLibrary()
		if(lib?.sharp) {
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

	const stickerPackEncrypted = await encryptedStream(
		zipBuffer,
		'sticker-pack' as any,
		{ logger: options.logger, opts: options.options }
	)

	const stickerPackResult = await options.upload(stickerPackEncrypted.encFilePath, {
		fileEncSha256B64: stickerPackEncrypted.fileEncSha256.toString('base64'),
		mediaType: 'sticker-pack' as any,
		timeoutMs: options.mediaUploadTimeoutMs
	})

	// Cleanup temp file
	try {
		const { promises: fs } = require('fs')
		await fs.unlink(stickerPackEncrypted.encFilePath)
	} catch {}

	// ── Step 4: Generate 252x252 JPEG thumbnail + upload as 'thumbnail-sticker-pack'
	// CRITICAL: same mediaKey as ZIP upload (required by WhatsApp protocol)
	let thumbnailBuffer: Buffer
	try {
		const lib = await getImageProcessingLibrary()
		if(lib?.sharp) {
			thumbnailBuffer = await lib.sharp.default(coverBuffer).resize(252, 252).jpeg().toBuffer()
		} else if(lib?.jimp) {
			const jimpImage = await lib.jimp.Jimp.read(coverBuffer)
			thumbnailBuffer = await jimpImage.resize({ w: 252, h: 252 }).getBuffer('image/jpeg')
		} else {
			throw new Error('No image processing library available for thumbnail generation')
		}
		if(!thumbnailBuffer || thumbnailBuffer.length === 0) {
			throw new Error('Failed to generate thumbnail buffer')
		}
	} catch {
		thumbnailBuffer = coverBuffer
	}

	const thumbEncrypted = await encryptedStream(
		thumbnailBuffer,
		'thumbnail-sticker-pack' as any,
		{
			logger: options.logger,
			opts: options.options,
			mediaKey: stickerPackEncrypted.mediaKey // SAME mediaKey — protocol requirement!
		}
	)

	const thumbResult = await options.upload(thumbEncrypted.encFilePath, {
		fileEncSha256B64: thumbEncrypted.fileEncSha256.toString('base64'),
		mediaType: 'thumbnail-sticker-pack' as any,
		timeoutMs: options.mediaUploadTimeoutMs
	})

	// Cleanup thumb temp file
	try {
		const { promises: fs } = require('fs')
		await fs.unlink(thumbEncrypted.encFilePath)
	} catch {}

	// ── Step 5: Return complete IStickerPackMessage ───────────────────────
	return {
		name, publisher, stickerPackId,
		packDescription: description,
		stickerPackOrigin: WAProto.Message.StickerPackMessage.StickerPackOrigin.USER_CREATED,
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
