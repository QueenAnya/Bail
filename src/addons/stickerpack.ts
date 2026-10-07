/**
 * stickerpack.ts
 * Source: itsliaaa/baileys `prepareStickerPackMessage` (lib/Utils/messages.js)
 * based on https://github.com/WhiskeySockets/Baileys/pull/1561
 * Credits: stickerPackMessage field validity work by @jlucaso1.
 *
 * Builds a `stickerPackMessage`: stickers + cover are converted to WebP, zipped,
 * encrypted and uploaded as `sticker-pack`; a 252x252 JPEG thumbnail of the cover is
 * uploaded as `thumbnail-sticker-pack` with the SAME mediaKey.
 */
import { Boom } from '@hapi/boom'
import { zip } from 'fflate'
import { promises as fs } from 'fs'
import { proto } from '../../WAProto/index.js'
import type { MessageContentGenerationOptions, StickerPack } from '../Types'
import { sha256 } from '../Utils/crypto'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics'
import { encryptedStream, getImageProcessingLibrary, getStream, toBuffer } from '../Utils/messages-media'
import { isWebPBuffer } from './from-messages'

/** Max concurrent stickers processed at once */
const CONCURRENCY_LIMIT = 15
/** Max stickers allowed in one pack */
const MAX_STICKERS = 60
/** Max size of one WebP sticker (bytes) */
const MAX_STICKER_BYTES = 1024 * 1024

/** Detect animated WebP by checking the VP8X chunk animation flag */
export const isAnimatedWebP = (buffer: Buffer): boolean => {
	if (!isWebPBuffer(buffer)) return false
	// Parse chunks starting after the RIFF header (12 bytes)
	let offset = 12
	while (offset < buffer.length - 8) {
		const chunkFourCC = buffer.toString('ascii', offset, offset + 4)
		const chunkSize = buffer.readUInt32LE(offset + 4)
		if (chunkFourCC === 'VP8X') {
			// VP8X extended header, animation flag = bit 1 of the flags byte at offset+8
			const flagsOffset = offset + 8
			if (flagsOffset < buffer.length) {
				return ((buffer[flagsOffset] as number) & 0x02) !== 0
			}

			return false
		}

		offset += 8 + chunkSize + (chunkSize % 2)
	}

	return false
}

export const prepareStickerPackMessage = async (
	message: StickerPack,
	options: MessageContentGenerationOptions
): Promise<proto.Message.StickerPackMessage> => {
	const {
		cover,
		stickers = [],
		name = '📦 Sticker Pack',
		publisher = '@teamolduser/baileys',
		description = '🏷️ @teamolduser/baileys'
	} = message

	if (stickers.length > MAX_STICKERS) {
		throw new Boom(`Sticker pack exceeds the maximum limit of ${MAX_STICKERS} stickers`, { statusCode: 400 })
	}

	if (stickers.length === 0) {
		throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
	}

	if (!cover) {
		throw new Boom('Sticker pack must contain a cover', { statusCode: 400 })
	}

	const logger = options.logger

	// ── cache: key = urls of all url-based stickers ───────────────────────
	let cacheableKey: string | false = false
	if (Array.isArray(stickers) && stickers.length && options.mediaCache) {
		const urls: string[] = []
		for (const sticker of stickers) {
			const data = sticker.data as any
			if (typeof data === 'object' && data?.url) {
				urls.push(data.url.toString())
			}
		}

		if (urls.length > 0) {
			cacheableKey = 'sticker:' + urls.join('@')
		}
	}

	if (cacheableKey) {
		const mediaBuff = await options.mediaCache!.get<Buffer>(cacheableKey)
		if (mediaBuff) {
			logger?.debug({ cacheableKey }, 'got media cache hit')
			return proto.Message.StickerPackMessage.decode(mediaBuff)
		}
	}

	const lib: any = await getImageProcessingLibrary()
	const hasSharp = 'sharp' in lib && !!lib.sharp?.default
	const hasImage = 'image' in lib && !!lib.image?.Transformer
	const hasJimp = 'jimp' in lib && !!lib.jimp?.Jimp
	if (!hasSharp && !hasImage) {
		throw new Boom('No image processing library (sharp or @napi-rs/image) available for converting sticker to WebP.')
	}

	const toWebp = async (buffer: Buffer): Promise<Buffer> => {
		if (hasSharp) {
			return lib.sharp.default(buffer).resize(512, 512, { fit: 'inside' }).webp({ quality: 80 }).toBuffer()
		}

		return new lib.image.Transformer(buffer).resize(512, 512).webp(80)
	}

	const stickerPackIdValue = generateMessageIDV2()
	const stickerData: Record<string, [Uint8Array, { level: 0 }]> = {}
	const stickerMetadata: proto.Message.StickerPackMessage.ISticker[] = new Array(stickers.length)

	// ── Step 1: stickers → WebP (chunked) ─────────────────────────────────
	for (let i = 0; i < stickers.length; i += CONCURRENCY_LIMIT) {
		const promises: Promise<void>[] = []
		const chunkEnd = Math.min(i + CONCURRENCY_LIMIT, stickers.length)
		for (let j = i; j < chunkEnd; j++) {
			promises.push(
				(async (index: number) => {
					const sticker = stickers[index]!
					const { stream } = await getStream(sticker.data)
					const buffer = (await toBuffer(stream)) as Buffer
					let webpBuffer: Buffer
					let isAnimated = false
					if (isWebPBuffer(buffer)) {
						webpBuffer = buffer
						isAnimated = isAnimatedWebP(buffer)
					} else {
						webpBuffer = await toWebp(buffer)
					}

					if (webpBuffer.length > MAX_STICKER_BYTES) {
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

	// ── Step 2: cover (tray icon) → WebP inside the ZIP ───────────────────
	const trayIconFileName = `${stickerPackIdValue}.webp`
	const { stream: coverStream } = await getStream(cover)
	const coverBuffer = (await toBuffer(coverStream)) as Buffer
	const coverWebpBuffer = isWebPBuffer(coverBuffer) ? coverBuffer : await toWebp(coverBuffer)
	stickerData[trayIconFileName] = [new Uint8Array(coverWebpBuffer), { level: 0 }]

	// ── Step 3: ZIP + encrypt + upload as 'sticker-pack' ──────────────────
	const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
		zip(stickerData, (error, data) => (error ? reject(error) : resolve(Buffer.from(data))))
	})

	const stickerPackUpload = await encryptedStream(zipBuffer, 'sticker-pack', {
		logger,
		opts: options.options
	})

	let stickerPackUploadResult: { directPath?: string | null }
	try {
		stickerPackUploadResult = await options.upload(stickerPackUpload.encFilePath, {
			fileEncSha256B64: stickerPackUpload.fileEncSha256.toString('base64'),
			mediaType: 'sticker-pack',
			timeoutMs: options.mediaUploadTimeoutMs
		})
	} finally {
		fs.unlink(stickerPackUpload.encFilePath).catch(() => logger?.warn('failed to remove tmp file'))
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
		let thumbUploadResult: { directPath?: string | null }
		try {
			thumbUploadResult = await options.upload(thumbUpload.encFilePath, {
				fileEncSha256B64: thumbUpload.fileEncSha256.toString('base64'),
				mediaType: 'thumbnail-sticker-pack',
				timeoutMs: options.mediaUploadTimeoutMs
			})
		} finally {
			fs.unlink(thumbUpload.encFilePath).catch(() => logger?.warn('failed to remove tmp file'))
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
		await options.mediaCache!.set(cacheableKey, proto.Message.StickerPackMessage.encode(obj).finish())
	}

	return proto.Message.StickerPackMessage.fromObject(obj)
}
