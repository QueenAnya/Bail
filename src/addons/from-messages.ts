/**
 * from-messages.ts
 * Source: src/Utils/messages.ts
 *
 * Message content builder functions ported from baileys.
 * These are imported back into generateWAMessageContent in messages.ts.
 */
import { Boom } from '@hapi/boom'
import { spawn } from 'child_process'
import { randomBytes } from 'crypto'
import { zipSync } from 'fflate'
import { promises as fs } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { gunzipSync, gzipSync } from 'zlib'
import { proto } from '../../WAProto/index.js'
import type { MessageContentGenerationOptions } from '../Types'
import type {
	AdminInviteInfo,
	CallCreationInfo,
	PaymentInviteInfo,
	PaymentMessageOptions,
	StickerPack
} from '../Types/Message'
import { sha256 } from '../Utils/crypto'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics'
import {
	encryptedStream,
	generateThumbnail,
	getImageProcessingLibrary,
	getStream,
	toBuffer
} from '../Utils/messages-media'

// ── adminInvite → newsletterAdminInviteMessage ─────────────────────────────

/**
 * Build newsletterAdminInviteMessage from adminInvite content
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

/**
 * Build scheduledCallCreationMessage from call content, including the
 * 'Call Creation' default title.
 */
export function buildCallMessage(call: CallCreationInfo): proto.Message.IScheduledCallCreationMessage {
	return {
		scheduledTimestampMs: call.time ?? Date.now(),
		callType: call.type ?? 1,
		title: call.name ?? 'Call Creation'
	}
}

// ── paymentInvite → paymentInviteMessage ──────────────────────────────────

/**
 * Build paymentInviteMessage from paymentInvite content
 */
export function buildPaymentInviteMessage(paymentInvite: PaymentInviteInfo): proto.Message.IPaymentInviteMessage {
	return {
		expiryTimestamp: paymentInvite.expiry ?? 0,
		serviceType: paymentInvite.type ?? 2
	}
}

// ── payment → requestPaymentMessage ───────────────────────────────────────

/**
 * Build requestPaymentMessage from payment content. `amount` is in the
 * currency's smallest unit (e.g. cents) — both the legacy `amount1000`
 * field and the modern `Money` shape are populated for compatibility.
 */
export function buildPaymentMessage(payment: PaymentMessageOptions): proto.Message.IRequestPaymentMessage {
	// innovatorssoft form also passes `amount` as a string, `from` (= receiverJid), `offset` and `image`
	// ({ placeholderArgb, textArgb, subtextArgb } → background)
	const value = typeof payment.amount === 'string' ? Number(payment.amount) : payment.amount
	const offset = payment.offset && payment.offset > 0 ? payment.offset : 100
	const currency = payment.currency ?? 'IDR'
	return {
		noteMessage: payment.note ? { conversation: payment.note } : undefined,
		currencyCodeIso4217: currency,
		amount1000: Math.round((value * 1000) / offset),
		amount: { value, offset, currencyCode: currency },
		requestFrom: payment.receiverJid ?? payment.from,
		expiryTimestamp: payment.expiry ?? 0,
		...(payment.image
			? {
					background: {
						placeholderArgb: payment.image.placeholderArgb,
						textArgb: payment.image.textArgb,
						subtextArgb: payment.image.subtextArgb
					}
				}
			: {})
	}
}

// ── stickerPack → stickerPackMessage ──────────────────────────────────────

/**
 * Check if buffer is a valid WebP file (magic bytes: RIFF....WEBP)
 * Source: PR #84 rsalcara/InfiniteAPI
 */
export function isWebPBuffer(buffer: Buffer): boolean {
	if (buffer.length < 12) return false
	const riffHeader = buffer.toString('ascii', 0, 4)
	const webpHeader = buffer.toString('ascii', 8, 12)
	return riffHeader === 'RIFF' && webpHeader === 'WEBP'
}

/**
 * Detect animated WebP by checking VP8X chunk animation flag
 * Source: PR #84 rsalcara/InfiniteAPI
 */
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

/**
 * Detect Lottie/WAS format (gzip-compressed or raw Lottie JSON)
 * WAS = WhatsApp Animated Sticker = gzip-compressed Lottie JSON
 * Source: PR #260 rsalcara/InfiniteAPI
 */
export function isLottieBuffer(buffer: Buffer): boolean {
	if (buffer.length < 2) return false
	let jsonBuffer: Buffer

	if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
		// gzip-compressed
		try {
			jsonBuffer = gunzipSync(buffer, { maxOutputLength: 50 * 1024 * 1024 })
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

/**
 * Build stickerPackMessage following PR #1561 + PR #84 + PR #260 approach:
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
/** Max concurrent stickers processed at once — avoids CPU/memory spikes on large packs */
const DEFAULT_STICKER_PACK_CONCURRENCY = 15

/**
 * How many stickers are converted at the same time. Set `concurrency` on the sticker pack to change it
 * (lower = less RAM/CPU, higher = potentially faster); invalid values fall back to the default (15).
 * Decimals are rounded down, anything below 1 becomes 1.
 */
export const resolveStickerPackConcurrency = (value?: number | null): number => {
	if (typeof value !== 'number' || !Number.isFinite(value)) return DEFAULT_STICKER_PACK_CONCURRENCY
	return Math.max(1, Math.floor(value))
}

/**
 * Convert any image/GIF to a WebP sticker at its ORIGINAL size and quality: no 512 cap, no upscaling,
 * WebP quality 100. Quality is NEVER lowered automatically and there is no per-sticker size cap.
 * `square: true` pads to a transparent square whose side is the image's longest side (aspect kept;
 * WhatsApp's pack viewer squeezes non-square stickers).
 * Animated inputs (GIF/APNG/animated WebP) stay animated.
 */
export const sharpToStickerWebp = async (
	sharpDefault: any,
	buffer: Buffer,
	opts: { square?: boolean } = {}
): Promise<Buffer> => {
	const render = (pad: boolean, side: number): Promise<Buffer> => {
		let img = sharpDefault(buffer, { animated: true })
		if (pad) img = img.resize(side, side, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
		return img.webp({ quality: 100 }).toBuffer()
	}

	if (!opts.square) {
		return render(false, 0)
	}

	const meta = await sharpDefault(buffer, { animated: true }).metadata()
	const w: number = meta.width ?? 512
	const h: number = meta.pageHeight ?? meta.height ?? w
	const side = Math.max(w, h)
	// padding an animated image isn't supported by every sharp build -> fall back to unpadded
	return render(true, side).catch(() => render(false, side))
}

const isVideoBuffer = (b: Buffer) =>
	(b.length > 12 && b.toString('latin1', 4, 8) === 'ftyp') || // mp4 / mov / 3gp
	(b.length > 4 && b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) // webm / mkv

/** ffmpeg binary: bundled `ffmpeg-static` if its binary exists, else the system `ffmpeg`. */
const getFfmpegPath = async (): Promise<string> => {
	try {
		const mod: any = await import('ffmpeg-static')
		const path: unknown = mod?.default ?? mod
		if (typeof path === 'string') {
			await fs.access(path)
			return path
		}
	} catch {
		// not installed / binary missing → system ffmpeg
	}

	return 'ffmpeg'
}

/** Video -> animated WebP via ffmpeg: original resolution and fps, quality 100 (never lowered automatically). */
const videoToStickerWebp = async (buffer: Buffer, square: boolean): Promise<Buffer> => {
	const ffmpegPath = await getFfmpegPath()
	const id = randomBytes(6).toString('hex')
	const input = join(tmpdir(), `stk-in-${id}`)
	const output = join(tmpdir(), `stk-out-${id}.webp`)
	await fs.writeFile(input, buffer)
	const filters = [
		'format=yuva420p',
		...(square ? ['pad=max(iw\\,ih):max(iw\\,ih):(ow-iw)/2:(oh-ih)/2:color=black@0'] : [])
	].join(',')
	try {
		await new Promise<void>((resolve, reject) => {
			const ff = spawn(ffmpegPath, [
				'-y',
				'-i',
				input,
				'-t',
				'10',
				'-an',
				'-vsync',
				'0',
				'-vf',
				filters,
				'-vcodec',
				'libwebp',
				'-lossless',
				'0',
				'-quality',
				'100',
				'-compression_level',
				'6',
				'-loop',
				'0',
				output
			])
			let err = ''
			ff.stderr.on('data', d => (err += d))
			ff.on('error', () =>
				reject(
					new Boom('ffmpeg not found - install ffmpeg or the ffmpeg-static package to convert video stickers', {
						statusCode: 400
					})
				)
			)
			ff.on('close', code => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code}\n${err}`))))
		})
		return await fs.readFile(output)
	} finally {
		await fs.unlink(input).catch(() => {})
		await fs.unlink(output).catch(() => {})
	}
}

/**
 * Anything → WebP sticker, itsliaaa-style auto conversion with innovatorssoft-style fidelity:
 *   - already WebP            → bytes untouched (original size, quality, EXIF, animation)
 *   - PNG / JPG / GIF / ...   → WebP at original size, quality 100 (never lowered automatically)
 *   - video (mp4/webm/mkv...) → animated WebP via ffmpeg, original size
 * Never resized or padded unless the caller passes `square: true` (opt-in, not used by packs).
 */
export const toStickerWebp = async (buffer: Buffer, opts: { square?: boolean } = {}): Promise<Buffer> => {
	if (isWebPBuffer(buffer)) {
		return buffer
	}

	if (isVideoBuffer(buffer)) {
		return videoToStickerWebp(buffer, !!opts.square)
	}

	const lib = await getImageProcessingLibrary()
	if ('sharp' in lib && lib.sharp) {
		return sharpToStickerWebp((lib.sharp as any).default, buffer, opts)
	}

	if ('image' in lib && lib.image) {
		return new (lib.image as any).Transformer(buffer).webp(100)
	}

	throw new Boom(
		'No image processing library (sharp or @napi-rs/image) available for converting to WebP. Either install one of them or provide stickers in WebP format.',
		{ statusCode: 400 }
	)
}

export async function buildStickerPackMessage(
	stickerPack: StickerPack,
	options: MessageContentGenerationOptions
): Promise<proto.Message.IStickerPackMessage> {
	const { stickers, cover, name, publisher, packId, description } = stickerPack
	const concurrency = resolveStickerPackConcurrency(stickerPack.concurrency)
	const stickerPackId = packId || generateMessageIDV2()
	const stickerData: Record<string, any> = {}

	// ── Step 1: Process stickers ──────────────────────────────────────────
	const validStickers = (stickers as any[]).filter(s => s !== null && s !== undefined)
	if (validStickers.length < 1) {
		throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
	}

	const stickerMetadata: any[] = new Array(validStickers.length)
	for (let i = 0; i < validStickers.length; i += concurrency) {
		const chunkEnd = Math.min(i + concurrency, validStickers.length)
		const chunkResults = await Promise.all(
			validStickers.slice(i, chunkEnd).map(async (s: any, offset: number) => {
				const index = i + offset
				const raw = s.data ?? s.sticker
				if (!raw) {
					throw new Error(`Sticker at index ${index} is missing media — provide either 'data' or 'sticker'`)
				}

				const normalized = Buffer.isBuffer(raw) ? raw : typeof raw === 'string' ? { url: raw } : raw
				const { stream } = await getStream(normalized)
				const buffer = (await toBuffer(stream)) as Buffer

				// Lottie/WAS detection (PR #260)
				const detectedLottie = s.isLottie !== undefined ? s.isLottie : isLottieBuffer(buffer)
				let finalBuffer = buffer

				if (detectedLottie) {
					// Raw Lottie JSON → gzip to WAS
					if (buffer[0] === 0x7b) {
						finalBuffer = gzipSync(buffer)
					}
				} else {
					// WebP stays untouched; png/jpg/gif/video → WebP automatically (original size + quality)
					finalBuffer = await toStickerWebp(buffer)
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
		for (let j = 0; j < chunkResults.length; j++) {
			stickerMetadata[i + j] = chunkResults[j]
		}
	}

	// ── Step 2: Process cover (tray icon) → add INSIDE ZIP ───────────────
	const coverRaw = Buffer.isBuffer(cover) ? cover : typeof cover === 'string' ? { url: cover } : cover
	const { stream: coverStream } = await getStream(coverRaw)
	const coverBuffer = (await toBuffer(coverStream)) as Buffer

	// Cover as WebP in ZIP (tray icon)
	const coverWebP = await toStickerWebp(coverBuffer)

	const trayIconFileName = `${stickerPackId}.webp`
	stickerData[trayIconFileName] = [new Uint8Array(coverWebP), { level: 0 as 0 }]

	// ── Step 3: ZIP + encrypt + upload as 'sticker-pack' ─────────────────
	const zipBuffer = Buffer.from(zipSync(stickerData))

	const stickerPackEncrypted = await encryptedStream(zipBuffer, 'sticker-pack', {
		logger: options.logger,
		opts: options.options
	})

	const stickerPackResult = await options.upload(stickerPackEncrypted.encFilePath, {
		fileEncSha256B64: stickerPackEncrypted.fileEncSha256.toString('base64'),
		mediaType: 'sticker-pack',
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
		} else if (lib?.image) {
			thumbnailBuffer = await new lib.image.Transformer(coverBuffer).resize(252, 252).jpeg()
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

	const thumbEncrypted = await encryptedStream(thumbnailBuffer, 'thumbnail-sticker-pack', {
		logger: options.logger,
		opts: options.options,
		mediaKey: stickerPackEncrypted.mediaKey // SAME mediaKey — protocol requirement!
	})

	const thumbResult = await options.upload(thumbEncrypted.encFilePath, {
		fileEncSha256B64: thumbEncrypted.fileEncSha256.toString('base64'),
		mediaType: 'thumbnail-sticker-pack',
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
