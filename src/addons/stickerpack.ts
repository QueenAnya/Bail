/**
 * addon: stickerpack
 * Source patch: Baileys-feat-add-stickerpack-support (shell/metadata functions)
 * + itsliaaa `prepareStickerPackMessage` (lib/Utils/messages.js), based on
 *   https://github.com/WhiskeySockets/Baileys/pull/1561 (field validity work by @jlucaso1).
 *
 * Adds support for sending WhatsApp Sticker Pack messages.
 * Sticker and StickerPack types are the canonical definitions in Types/Message.ts.
 *
 * This addon exports:
 *   - prepareStickerPackMessage() — full pipeline (convert, ZIP, encrypt, upload, thumbnail) returning a
 *     ready-to-send stickerPackMessage; the alternate builder next to `buildStickerPackMessage()` in from-messages.ts
 *   - buildStickerPackProto() — builds the proto payload for a StickerPackMessage
 *   - generateStickerPackId() — generates a random pack ID
 *   - STICKER_PACK_MESSAGE_TYPE — the message type string 'sticker_pack'
 *   - convertToWebP()  converts a Buffer, URL string, or Stream into a WebP
 *     sticker buffer at its original size (WebP passthrough; PNG/JPG/GIF/video converted).
 *
 * Media rules (same as `buildStickerPackMessage`): WebP is sent untouched; PNG/JPG/GIF/video are converted to WebP at the
 * ORIGINAL size and ORIGINAL quality (lossless WebP) by default. Optional `maxSize` (longest side in px, never upscaled),
 * `quality` (`'original'` = default / lossless, or 1-100 = lossy) and `concurrency` are available on the pack; the cover / tray icon
 * always stays original. Lottie (`.was` / raw Lottie JSON) stickers are kept as Lottie.
 * No sticker-count limit and no per-sticker / pack size limit.
 */

import { Boom } from '@hapi/boom'
import { zip } from 'fflate'
import { promises as fsPromises } from 'fs'
import { gzipSync } from 'zlib'
import { proto } from '../../WAProto/index.js'
import type { WAMediaUpload } from '../Types'
import { sha256 } from '../Utils/crypto.js'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics.js'
import type { ILogger } from '../Utils/logger.js'
import { encryptedStream, getImageProcessingLibrary, getStream, toBuffer } from '../Utils/messages-media.js'
import {
	isAnimatedWebP,
	isLottieBuffer,
	resolveStickerPackConcurrency,
	resolveStickerPackMaxSize,
	resolveStickerQuality,
	toStickerWebp
} from './from-messages.js'

// Re-export Sticker and StickerPack from Types for convenience
export type { Sticker, StickerPack } from '../Types'

/**
 * Convert a Buffer, URL string, or Stream into a WebP sticker buffer.
 *
 * Same rules as the sticker packs (see `toStickerWebp` in from-messages.ts):
 *   - already WebP            -> returned untouched (original size, quality, EXIF, animation)
 *   - PNG / JPG / GIF / ...   -> WebP at the ORIGINAL size (no 512 resize) and ORIGINAL quality (lossless),
 *                                never lowered automatically
 *   - video (mp4/webm/mkv)    -> animated WebP via ffmpeg, original size
 * Needs `sharp` or `@napi-rs/image` for images (ffmpeg for video); a clear error is thrown otherwise.
 *
 * @example
 * const { buffer, isAnimated } = await convertToWebP('https://example.com/pic.png')
 * const { buffer: b2 } = await convertToWebP(fs.readFileSync('./sticker.jpg'))
 */
export const convertToWebP = async (input: WAMediaUpload): Promise<{ buffer: Buffer; isAnimated: boolean }> => {
	const { stream } = await getStream(input)
	const buffer = await toBuffer(stream)
	const webpBuffer = await toStickerWebp(buffer)
	return { buffer: webpBuffer, isAnimated: isAnimatedWebP(webpBuffer) }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Generate a random sticker pack ID (16 hex chars).
 */
export const generateStickerPackId = (): string => {
	const arr = new Uint8Array(8)
	for (let i = 0; i < 8; i++) arr[i] = Math.floor(Math.random() * 256)
	return Array.from(arr)
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}

/**
 * Build the proto-level stickerPackMessage payload.
 * The result can be passed directly as the stickerPackMessage field in a proto.IMessage.
 */
export const buildStickerPackProto = (pack: {
	name: string
	publisher: string
	packId?: string
	description?: string
}): {
	name: string
	publisher: string
	packId: string
	description: string
} => ({
	name: pack.name,
	publisher: pack.publisher,
	packId: pack.packId ?? generateStickerPackId(),
	description: pack.description ?? ''
})

/**
 * stickerPack message type marker — getMediaType() returns this for stickerPackMessage.
 */
export const STICKER_PACK_MESSAGE_TYPE = 'sticker_pack' as const

// ═══════════════════════════════════════════════════════════════════════════
// Full sticker-pack builder — kept as a distinct alternative alongside
// buildStickerPackMessage() in from-messages.ts.
// Includes: media caching, concurrency batching, Lottie/WAS stickers,
// cover→trayIcon-in-ZIP, and separate 252×252 JPEG thumbnail generation.
// ═══════════════════════════════════════════════════════════════════════════

export type StickerInput = {
	/** sticker media (Buffer / `{ url }` / stream / path) */
	data?: WAMediaUpload
	/** alias of `data` (the field name used by @innovatorssoft/baileys) */
	sticker?: WAMediaUpload
	/** emoji tags for this sticker (default ['✨']) */
	emojis?: string[]
	/** accessibility label */
	accessibilityLabel?: string
	/** override animated-WebP auto detection */
	isAnimated?: boolean
	/** override Lottie (.was / raw Lottie JSON) auto detection */
	isLottie?: boolean
}

export type StickerPackInput = {
	cover: WAMediaUpload
	stickers: StickerInput[]
	/** fixed pack id; a random one is generated when omitted */
	packId?: string
	/** stickers converted at the same time (default 15) - lower it on low-RAM hosts */
	concurrency?: number
	/**
	 * longest side (px) for stickers that have to be CONVERTED to WebP (PNG/JPG/GIF/video); never upscaled, WebP stickers
	 * are never touched. Default: the original size (no cap) - `false` / omitted keeps it, e.g. `512` = WhatsApp's own size
	 */
	maxSize?: number | false
	/** `'original'` (default) = lossless WebP / original quality for converted stickers; a number 1-100 = lossy WebP of that quality */
	quality?: number | 'original'
	name?: string
	publisher?: string
	description?: string
}

export type StickerPackOptions = {
	logger?: ILogger
	upload: (
		filePath: string,
		opts: { fileEncSha256B64: string; mediaType: string; timeoutMs?: number }
	) => Promise<{ directPath: string }>
	options?: RequestInit
	mediaUploadTimeoutMs?: number
	mediaCache?: { get: (key: string) => Promise<Buffer | undefined>; set: (key: string, value: Buffer) => void }
}

/** normalize user media: Buffer / url string / { url } / stream → WAMediaUpload → Buffer */
const toBufferFromUpload = async (raw: any): Promise<Buffer> => {
	const normalized = Buffer.isBuffer(raw) ? raw : typeof raw === 'string' ? { url: raw } : raw
	const { stream } = await getStream(normalized)
	return (await toBuffer(stream)) as Buffer
}

/**
 * Build a complete, ready-to-send stickerPackMessage (ZIP built, encrypted,
 * and uploaded). Sticker-pack field validity work credited to @jlucaso1,
 * based on PR #1561.
 */
export const prepareStickerPackMessage = async (
	message: StickerPackInput,
	options: StickerPackOptions
): Promise<proto.Message.IStickerPackMessage> => {
	const {
		cover,
		stickers = [],
		packId,
		concurrency: concurrencyOption,
		maxSize,
		quality,
		name = '📦 Sticker Pack',
		publisher = '@teamolduser/baileys',
		description = '🏷️ @teamolduser/baileys'
	} = message

	const validStickers = (stickers as (StickerInput | null | undefined)[]).filter(
		(s): s is StickerInput => s !== null && s !== undefined
	)
	if (validStickers.length === 0) {
		throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
	}

	if (!cover) {
		throw new Boom('Sticker pack must contain a cover', { statusCode: 400 })
	}

	const { logger } = options
	const webpOptions = { maxSize: resolveStickerPackMaxSize(maxSize), quality }

	// ── cache: key = urls of all url-based stickers + the pack settings ───
	let cacheableKey: string | false = false
	if (options.mediaCache) {
		const urls: string[] = []
		for (const sticker of validStickers) {
			const data = (sticker.data ?? sticker.sticker) as any
			if (typeof data === 'object' && data?.url) urls.push(data.url.toString())
		}

		if (urls.length > 0) {
			const settings = JSON.stringify([
				name,
				publisher,
				description,
				packId ?? null,
				webpOptions.maxSize ?? null,
				resolveStickerQuality(quality) ?? null
			])
			cacheableKey = 'sticker:' + urls.join('@') + '#' + sha256(Buffer.from(settings)).toString('hex')
		}
	}

	if (cacheableKey) {
		const mediaBuff = await options.mediaCache!.get(cacheableKey)
		if (mediaBuff) {
			logger?.debug({ cacheableKey }, 'got media cache hit')
			return proto.Message.StickerPackMessage.decode(mediaBuff)
		}
	}

	const lib: any = await getImageProcessingLibrary()
	const hasSharp = 'sharp' in lib && !!lib.sharp?.default
	const hasImage = 'image' in lib && !!lib.image?.Transformer
	const hasJimp = 'jimp' in lib && !!lib.jimp?.Jimp
	const stickerPackIdValue = packId || generateMessageIDV2()
	const stickerData: Record<string, [Uint8Array, { level: 0 }]> = {}
	const stickerMetadata: proto.Message.StickerPackMessage.ISticker[] = new Array(validStickers.length)

	// ── Step 1: stickers → WebP / WAS (chunked) ───────────────────────────
	const concurrency = resolveStickerPackConcurrency(concurrencyOption)
	for (let i = 0; i < validStickers.length; i += concurrency) {
		const chunkEnd = Math.min(i + concurrency, validStickers.length)
		const promises: Promise<void>[] = []
		for (let j = i; j < chunkEnd; j++) {
			promises.push(
				(async (index: number) => {
					const sticker = validStickers[index]!
					// `data` is preferred; `sticker` is the (deprecated) alias
					const raw = sticker.data ?? sticker.sticker
					if (!raw) {
						throw new Boom(`Sticker at index ${index} is missing media — provide either 'data' or 'sticker'`, {
							statusCode: 400
						})
					}

					const buffer = await toBufferFromUpload(raw)
					// explicit `isLottie` wins, otherwise auto-detected
					const isLottie: boolean = sticker.isLottie !== undefined ? !!sticker.isLottie : isLottieBuffer(buffer)
					let finalBuffer: Buffer
					if (isLottie) {
						// raw Lottie JSON → gzip to WAS; already-gzipped WAS stays as is
						finalBuffer = buffer[0] === 0x7b ? gzipSync(buffer) : buffer
					} else {
						// WebP untouched; png/jpg/gif/video → WebP (original size + original quality unless maxSize / quality are set)
						finalBuffer = await toStickerWebp(buffer, webpOptions)
					}

					// explicit `isAnimated` wins, otherwise auto-detected (Lottie is always animated)
					const isAnimated: boolean =
						sticker.isAnimated !== undefined ? !!sticker.isAnimated : isLottie ? true : isAnimatedWebP(finalBuffer)
					const extension = isLottie ? 'was' : 'webp'
					// sha256 hash as filename (dedup) - same scheme as buildStickerPackMessage: base64 with '/' -> '-'
					const fileName = `${sha256(finalBuffer).toString('base64').replace(/\//g, '-')}.${extension}`
					if (!stickerData[fileName]) {
						stickerData[fileName] = [new Uint8Array(finalBuffer), { level: 0 }]
					}

					stickerMetadata[index] = {
						fileName,
						mimetype: isLottie ? 'application/was' : 'image/webp',
						isAnimated,
						isLottie,
						emojis: sticker.emojis || ['✨'],
						accessibilityLabel: sticker.accessibilityLabel || '‎'
					}
				})(j)
			)
		}

		await Promise.all(promises)
	}

	// ── Step 2: cover (tray icon) → WebP inside the ZIP ───────────────────
	const trayIconFileName = `${stickerPackIdValue}.webp`
	const coverBuffer = await toBufferFromUpload(cover)
	// tray icon: ALWAYS original size + original quality (not affected by `maxSize` / `quality`)
	stickerData[trayIconFileName] = [new Uint8Array(await toStickerWebp(coverBuffer)), { level: 0 }]

	// ── Step 3: ZIP + encrypt + upload as 'sticker-pack' ──────────────────
	const zipBuffer: Buffer = await new Promise((resolve, reject) => {
		zip(stickerData, (error, data) => (error ? reject(error) : resolve(Buffer.from(data))))
	})

	const stickerPackUpload = await encryptedStream(zipBuffer, 'sticker-pack', { logger, opts: options.options })
	let stickerPackUploadResult: { directPath: string }
	try {
		stickerPackUploadResult = await options.upload(stickerPackUpload.encFilePath, {
			fileEncSha256B64: stickerPackUpload.fileEncSha256.toString('base64'),
			mediaType: 'sticker-pack',
			timeoutMs: options.mediaUploadTimeoutMs
		})
	} finally {
		fsPromises.unlink(stickerPackUpload.encFilePath).catch(() => logger?.warn('failed to remove tmp file'))
	}

	const obj: proto.Message.IStickerPackMessage = {
		name,
		publisher,
		stickerPackId: stickerPackIdValue,
		packDescription: description,
		stickerPackOrigin: proto.Message.StickerPackMessage.StickerPackOrigin.USER_CREATED,
		stickerPackSize: zipBuffer.length,
		stickers: stickerMetadata,
		fileSha256: stickerPackUpload.fileSha256,
		fileEncSha256: stickerPackUpload.fileEncSha256,
		mediaKey: stickerPackUpload.mediaKey,
		directPath: stickerPackUploadResult.directPath,
		fileLength: stickerPackUpload.fileLength,
		mediaKeyTimestamp: unixTimestampSeconds(),
		trayIconFileName
	}

	// ── Step 4: 252x252 JPEG thumbnail, SAME mediaKey (protocol requirement) ──
	try {
		let thumbnailBuffer: Buffer
		if (hasSharp) {
			thumbnailBuffer = await lib.sharp.default(coverBuffer).resize(252, 252).jpeg().toBuffer()
		} else if (hasImage) {
			thumbnailBuffer = await new lib.image.Transformer(coverBuffer).resize(252, 252).jpeg()
		} else if (hasJimp) {
			const jimpImage = await lib.jimp.Jimp.read(coverBuffer)
			thumbnailBuffer = await jimpImage.resize({ w: 252, h: 252 }).getBuffer('image/jpeg')
		} else {
			throw new Error('No image processing library available for thumbnail generation')
		}

		if (!thumbnailBuffer || thumbnailBuffer.length === 0) {
			throw new Error('Failed to generate thumbnail buffer')
		}

		const thumbUpload = await encryptedStream(thumbnailBuffer, 'thumbnail-sticker-pack', {
			logger,
			opts: options.options,
			mediaKey: stickerPackUpload.mediaKey
		})
		let thumbUploadResult: { directPath: string }
		try {
			thumbUploadResult = await options.upload(thumbUpload.encFilePath, {
				fileEncSha256B64: thumbUpload.fileEncSha256.toString('base64'),
				mediaType: 'thumbnail-sticker-pack',
				timeoutMs: options.mediaUploadTimeoutMs
			})
		} finally {
			fsPromises.unlink(thumbUpload.encFilePath).catch(() => logger?.warn('failed to remove tmp file'))
		}

		Object.assign(obj, {
			thumbnailDirectPath: thumbUploadResult.directPath,
			thumbnailSha256: thumbUpload.fileSha256,
			thumbnailEncSha256: thumbUpload.fileEncSha256,
			thumbnailHeight: 252,
			thumbnailWidth: 252,
			imageDataHash: sha256(thumbnailBuffer).toString('base64')
		})
	} catch (error) {
		logger?.warn(`Thumbnail generation failed: ${error}`)
	}

	if (cacheableKey) {
		logger?.debug({ cacheableKey }, 'set cache (background)')
		options.mediaCache!.set(cacheableKey, Buffer.from(proto.Message.StickerPackMessage.encode(obj).finish()))
	}

	return proto.Message.StickerPackMessage.fromObject(obj)
}
