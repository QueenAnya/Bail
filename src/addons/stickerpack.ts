/**
 * addon: stickerpack
 * Source patch: Baileys-feat-add-stickerpack-support (shell/metadata functions)
 * + itsliaaa/baileys (convertToWebP — auto-converts Buffer/URL/Stream input
 *   to a WhatsApp-ready WebP sticker buffer, extracted from their inline
 *   prepareStickerPackMessage conversion logic into a standalone function).
 *
 * Adds support for sending WhatsApp Sticker Pack messages.
 * Sticker and StickerPack types are the canonical definitions in Types/Message.ts.
 *
 * This addon exports:
 *   - buildStickerPackProto() — builds the proto payload for a StickerPackMessage
 *   - generateStickerPackId() — generates a random pack ID
 *   - STICKER_PACK_MESSAGE_TYPE — the message type string 'sticker_pack'
 *   - convertToWebP() — converts a Buffer, URL string, or Stream into a WebP
 *     sticker buffer (passthrough if already WebP), matching itsliaaa's
 *     sharp → @napi-rs/image → jimp fallback chain.
 */

import { Boom } from '@hapi/boom'
import type { WAMediaUpload } from '../Types'
import { getImageProcessingLibrary, getStream, toBuffer } from '../Utils/messages-media.js'
import { isAnimatedWebP, isWebPBuffer } from './from-messages.js'

// Re-export Sticker and StickerPack from Types for convenience
export type { Sticker, StickerPack } from '../Types'

/**
 * Convert a Buffer, URL string, or Stream into a WebP sticker buffer.
 * If the input is already a valid WebP, it's returned untouched (and
 * `isAnimated` reflects whether it's an animated WebP).
 * Source: itsliaaa/baileys — sharp → @napi-rs/image → jimp fallback chain,
 * 512x512 'inside' fit, quality 80.
 *
 * @example
 * const { buffer, isAnimated } = await convertToWebP('https://example.com/pic.png')
 * const { buffer: b2 } = await convertToWebP(fs.readFileSync('./sticker.jpg'))
 */
export const convertToWebP = async (input: WAMediaUpload): Promise<{ buffer: Buffer; isAnimated: boolean }> => {
	const { stream } = await getStream(input)
	const buffer = await toBuffer(stream)

	if (isWebPBuffer(buffer)) {
		return { buffer, isAnimated: isAnimatedWebP(buffer) }
	}

	const lib = await getImageProcessingLibrary()
	const hasSharp = 'sharp' in lib && !!(lib as any).sharp?.default
	const hasImage = 'image' in lib && !!(lib as any).image?.Transformer

	if (!hasSharp && !hasImage) {
		throw new Boom('No image processing library (sharp or @napi-rs/image) available for converting sticker to WebP.')
	}

	let webpBuffer: Buffer
	if (hasSharp) {
		webpBuffer = await (lib as any).sharp
			.default(buffer)
			.resize(512, 512, { fit: 'inside' })
			.webp({ quality: 80 })
			.toBuffer()
	} else {
		webpBuffer = await new (lib as any).image.Transformer(buffer).resize(512, 512).webp(80)
	}

	return { buffer: webpBuffer, isAnimated: false }
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
// itsliaaa/baileys full sticker-pack builder — kept as a distinct alternative
// alongside the WhiskeySockets-PR-based buildStickerPackMessage() in
// from-messages.ts. Ported directly from their compiled Utils/messages.js
// prepareStickerPackMessage, including: media caching, per-sticker
// count/size limits, 15-way concurrency batching, cover→trayIcon-in-ZIP,
// and separate 252×252 JPEG thumbnail generation.
// ═══════════════════════════════════════════════════════════════════════════

import { zip } from 'fflate'
import { promises as fsPromises } from 'fs'
import { proto } from '../../WAProto/index.js'
import { sha256 } from '../Utils/crypto.js'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics.js'
import type { ILogger } from '../Utils/logger.js'
import { encryptedStream } from '../Utils/messages-media.js'

const ITSL_CONCURRENCY_LIMIT = 15

export type ItsliaaaStickerInput = {
	data: WAMediaUpload
	emojis?: string[]
	accessibilityLabel?: string
}

export type ItsliaaaStickerPackInput = {
	cover: WAMediaUpload
	stickers: ItsliaaaStickerInput[]
	name?: string
	publisher?: string
	description?: string
}

export type ItsliaaaStickerPackOptions = {
	logger?: ILogger
	upload: (
		filePath: string,
		opts: { fileEncSha256B64: string; mediaType: string; timeoutMs?: number }
	) => Promise<{ directPath: string }>
	options?: RequestInit
	mediaUploadTimeoutMs?: number
	mediaCache?: { get: (key: string) => Promise<Buffer | undefined>; set: (key: string, value: Buffer) => void }
}

/**
 * Build a complete, ready-to-send stickerPackMessage (ZIP built, encrypted,
 * and uploaded) — itsliaaa/baileys's implementation, function-for-function.
 * Source: itsliaaa/baileys Utils/messages.js prepareStickerPackMessage
 * (credits their own comment: sticker-pack field validity work by @jlucaso1,
 * based on WhiskeySockets/Baileys PR #1561).
 */
export const prepareStickerPackMessageItsliaaa = async (
	message: ItsliaaaStickerPackInput,
	options: ItsliaaaStickerPackOptions
): Promise<proto.Message.IStickerPackMessage> => {
	const {
		cover,
		stickers = [],
		name = '📦 Sticker Pack',
		publisher = 'GitHub: itsliaaa',
		description = '🏷️ itsliaaa/baileys'
	} = message

	if (stickers.length > 60) {
		throw new Boom('Sticker pack exceeds the maximum limit of 60 stickers', { statusCode: 400 })
	}

	if (stickers.length === 0) {
		throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
	}

	if (!cover) {
		throw new Boom('Sticker pack must contain a cover', { statusCode: 400 })
	}

	const { logger } = options

	// Media caching (keyed by concatenated sticker URLs, if all stickers are URL-based)
	let cacheableKey: string | false = false
	if (stickers.length && options.mediaCache) {
		const urls: string[] = []
		for (const s of stickers) {
			const data = s.data as any
			if (typeof data === 'object' && data?.url) urls.push(data.url)
		}

		if (urls.length > 0) cacheableKey = 'sticker:' + urls.join('@')
	}

	if (cacheableKey) {
		const mediaBuff = await options.mediaCache!.get(cacheableKey)
		if (mediaBuff) {
			logger?.debug({ cacheableKey }, 'got media cache hit')
			return proto.Message.StickerPackMessage.decode(mediaBuff)
		}
	}

	const lib = await getImageProcessingLibrary()
	const hasSharp = 'sharp' in lib && !!(lib as any).sharp?.default
	const hasImage = 'image' in lib && !!(lib as any).image?.Transformer
	const hasJimp = 'jimp' in lib && !!(lib as any).jimp?.Jimp
	if (!hasSharp && !hasImage) {
		throw new Boom('No image processing library (sharp or @napi-rs/image) available for converting sticker to WebP.')
	}

	const stickerPackIdValue = generateMessageIDV2()
	const stickerData: Record<string, [Uint8Array, { level: 0 }]> = {}
	const stickerMetadata: any[] = new Array(stickers.length)

	for (let i = 0; i < stickers.length; i += ITSL_CONCURRENCY_LIMIT) {
		const chunkEnd = Math.min(i + ITSL_CONCURRENCY_LIMIT, stickers.length)
		const promises: Promise<void>[] = []
		for (let j = i; j < chunkEnd; j++) {
			promises.push(
				(async (index: number) => {
					const sticker = stickers[index]!
					const { stream } = await getStream(sticker.data)
					const buffer = await toBuffer(stream)
					let webpBuffer: Buffer
					let isAnimated = false
					if (isWebPBuffer(buffer)) {
						webpBuffer = buffer
						isAnimated = isAnimatedWebP(buffer)
					} else if (hasSharp) {
						webpBuffer = await (lib as any).sharp
							.default(buffer)
							.resize(512, 512, { fit: 'inside' })
							.webp({ quality: 80 })
							.toBuffer()
					} else {
						webpBuffer = await new (lib as any).image.Transformer(buffer).resize(512, 512).webp(80)
					}

					if (webpBuffer.length > 1024 * 1024) {
						throw new Boom(`Sticker at index ${index} exceeds the 1MB size limit`, { statusCode: 400 })
					}

					const hash = sha256(webpBuffer).toString('base64').replace(/\//g, '-')
					const fileName = `${hash}.webp`
					stickerData[fileName] = [new Uint8Array(webpBuffer), { level: 0 }]
					stickerMetadata[index] = {
						fileName,
						mimetype: 'image/webp',
						isAnimated,
						emojis: sticker.emojis || ['✨'],
						accessibilityLabel: sticker.accessibilityLabel || '‎'
					}
				})(j)
			)
		}

		await Promise.all(promises)
	}

	const trayIconFileName = `${stickerPackIdValue}.webp`
	const { stream: coverStream } = await getStream(cover)
	const coverBuffer = await toBuffer(coverStream)
	let coverWebpBuffer: Buffer
	if (isWebPBuffer(coverBuffer)) {
		coverWebpBuffer = coverBuffer
	} else if (hasSharp) {
		coverWebpBuffer = await (lib as any).sharp
			.default(coverBuffer)
			.resize(512, 512, { fit: 'inside' })
			.webp({ quality: 80 })
			.toBuffer()
	} else {
		coverWebpBuffer = await new (lib as any).image.Transformer(coverBuffer).resize(512, 512).webp(80)
	}

	stickerData[trayIconFileName] = [new Uint8Array(coverWebpBuffer), { level: 0 }]

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

	const obj: Record<string, unknown> = {
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

	try {
		let thumbnailBuffer: Buffer
		if (hasSharp) {
			thumbnailBuffer = await (lib as any).sharp.default(coverBuffer).resize(252, 252).jpeg().toBuffer()
		} else if (hasImage) {
			thumbnailBuffer = await new (lib as any).image.Transformer(coverBuffer).resize(252, 252).jpeg()
		} else if (hasJimp) {
			const jimpImage = await (lib as any).jimp.Jimp.read(coverBuffer)
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
		options.mediaCache!.set(cacheableKey, Buffer.from(proto.Message.StickerPackMessage.encode(obj as any).finish()))
	}

	return proto.Message.StickerPackMessage.fromObject(obj)
}
