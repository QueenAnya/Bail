/**
 * stickerpack.ts
 * Source: itsliaaa/baileys `prepareStickerPackMessage` (lib/Utils/messages.js)
 * based on https://github.com/WhiskeySockets/Baileys/pull/1561
 * Credits: stickerPackMessage field validity work by @jlucaso1.
 *
 * Builds a `stickerPackMessage`: stickers + cover are converted to WebP (ORIGINAL size and
 * quality 100 by default), zipped, encrypted and uploaded as `sticker-pack`; a 252x252 JPEG
 * thumbnail of the cover is uploaded as `thumbnail-sticker-pack` with the SAME mediaKey.
 * No sticker-count limit and no per-sticker / pack size limit (itsliaaa's 60 / 1MB / 512px / q80 caps removed).
 */
import { Boom } from '@hapi/boom'
import { spawn } from 'child_process'
import { randomBytes } from 'crypto'
import { zip } from 'fflate'
import { promises as fs } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { proto } from '../../WAProto/index.js'
import type { MessageContentGenerationOptions, StickerPack } from '../Types'
import { sha256 } from '../Utils/crypto'
import { generateMessageIDV2, unixTimestampSeconds } from '../Utils/generics'
import { encryptedStream, getImageProcessingLibrary, getStream, toBuffer } from '../Utils/messages-media'
import { isWebPBuffer } from './from-messages'

/** Stickers converted at the same time (same constant as itsliaaa) */
const CONCURRENCY_LIMIT = 15

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

/** Video → animated WebP via ffmpeg: original resolution + fps, quality 100. */
const videoToWebp = async (buffer: Buffer): Promise<Buffer> => {
	const ffmpegPath = await getFfmpegPath()
	const id = randomBytes(6).toString('hex')
	const input = join(tmpdir(), `stk-in-${id}`)
	const output = join(tmpdir(), `stk-out-${id}.webp`)
	await fs.writeFile(input, buffer)
	const filters = 'format=yuva420p'
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

/** normalize user media: Buffer / url string / { url } / stream → WAMediaUpload */
const toBufferFromUpload = async (raw: any): Promise<Buffer> => {
	const normalized = Buffer.isBuffer(raw) ? raw : typeof raw === 'string' ? { url: raw } : raw
	const { stream } = await getStream(normalized)
	return (await toBuffer(stream)) as Buffer
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
		description = '🏷️ @teamolduser/baileys',
		packId
	} = message

	const validStickers = (stickers as any[]).filter(s => s !== null && s !== undefined)
	if (validStickers.length === 0) {
		throw new Boom('Sticker pack must contain at least one sticker', { statusCode: 400 })
	}

	if (!cover) {
		throw new Boom('Sticker pack must contain a cover', { statusCode: 400 })
	}

	const logger = options.logger

	// ── cache: key = urls of all url-based stickers + the pack settings ───
	let cacheableKey: string | false = false
	if (options.mediaCache) {
		const urls: string[] = []
		for (const sticker of validStickers) {
			const data = (sticker.data ?? sticker.sticker) as any
			if (typeof data === 'object' && data?.url) {
				urls.push(data.url.toString())
			}
		}

		if (urls.length > 0) {
			const settings = JSON.stringify([name, publisher, description, packId ?? null])
			cacheableKey = 'sticker:' + urls.join('@') + '#' + sha256(Buffer.from(settings)).toString('hex')
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

	/** WebP stays untouched; image → WebP at ORIGINAL size, quality 100; video → animated WebP */
	const toWebp = async (buffer: Buffer): Promise<Buffer> => {
		if (isWebPBuffer(buffer)) return buffer
		if (isVideoBuffer(buffer)) return videoToWebp(buffer)
		if (hasSharp) {
			return lib.sharp.default(buffer, { animated: true }).webp({ quality: 100 }).toBuffer()
		}

		if (hasImage) {
			return new lib.image.Transformer(buffer).webp(100)
		}

		throw new Boom(
			'No image processing library (sharp or @napi-rs/image) available for converting sticker to WebP. Either install one of them or provide stickers in WebP format.',
			{ statusCode: 400 }
		)
	}

	const stickerPackIdValue = packId || generateMessageIDV2()
	const stickerData: Record<string, [Uint8Array, { level: 0 }]> = {}
	const stickerMetadata: proto.Message.StickerPackMessage.ISticker[] = new Array(validStickers.length)

	// ── Step 1: stickers → WebP (chunked) ───────────────────────────
	for (let i = 0; i < validStickers.length; i += CONCURRENCY_LIMIT) {
		const chunkEnd = Math.min(i + CONCURRENCY_LIMIT, validStickers.length)
		const promises: Promise<void>[] = []
		for (let j = i; j < chunkEnd; j++) {
			promises.push(
				(async (index: number) => {
					const sticker = validStickers[index]
					// `data` is preferred; `sticker` is the (deprecated) alias
					const raw = sticker.data ?? sticker.sticker
					if (!raw) {
						throw new Boom(`Sticker at index ${index} is missing media — provide either 'data' or 'sticker'`, {
							statusCode: 400
						})
					}

					const buffer = await toBufferFromUpload(raw)
					const finalBuffer = await toWebp(buffer)
					// animated WebP is auto-detected
					const isAnimated = isAnimatedWebP(finalBuffer)
					// sha256 hash as filename (dedup) — RFC 4648 base64url
					const fileName = `${sha256(finalBuffer).toString('base64url')}.webp`
					if (!stickerData[fileName]) {
						stickerData[fileName] = [new Uint8Array(finalBuffer), { level: 0 }]
					}

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
	const coverBuffer = await toBufferFromUpload(cover)
	stickerData[trayIconFileName] = [new Uint8Array(await toWebp(coverBuffer)), { level: 0 }]

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
