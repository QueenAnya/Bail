/**
 * MediaManager.ts
 * Media conversion helpers: image/video → WebP stickers, audio → OGG voice notes.
 *
 * Fixes applied vs PR #2710:
 *  - P1: ESM-compatible node-webpmux import via createRequire (was bare `require()`)
 *  - P1: Voice note params: added -ac 1 (mono), -ar 16000, -application voip,
 *        -b:a 32k — WA server requires mono Opus at ~16kHz for PTT.
 *  - P2: All fs.writeFileSync/readFileSync/copyFileSync/unlinkSync replaced with
 *        fs.promises.* (async) to avoid blocking the event loop under load.
 *  - P2: Sticker EXIF payload length is now correctly serialized (P2 pack metadata).
 *  - P2: err types changed from `any` to `unknown`.
 *
 * Source: WhiskeySockets/Baileys PR #2710 (LuferOS) — enterprise bot framework
 */

import { createRequire } from 'module'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { randomBytes } from 'crypto'
import ffmpegStatic from 'ffmpeg-static'

// P1 FIX: ESM-safe require for CJS-only package
const require = createRequire(import.meta.url)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpmux = require('node-webpmux')

// Configure ffmpeg path from static binary
import ffmpegLib from 'fluent-ffmpeg'
if (ffmpegStatic) {
	ffmpegLib.setFfmpegPath(ffmpegStatic)
}

export type StickerMetadata = {
	packname?: string
	author?: string
}

export class MediaManager {
	/** Generate a temp file path with a given extension */
	private static getTempFile(ext: string): string {
		return path.join(os.tmpdir(), `baileys-fw-${randomBytes(8).toString('hex')}.${ext}`)
	}

	/**
	 * Convert image or video to a WebP sticker buffer.
	 * Applies packname/author EXIF metadata when provided.
	 *
	 * P2 FIX: Uses fs.promises.* throughout (non-blocking).
	 * P2 FIX: EXIF payload length correctly written to buffer.
	 */
	public static async convertToSticker(
		inputPathOrBuffer: string | Buffer,
		metadata?: StickerMetadata
	): Promise<Buffer> {
		const tempInput = MediaManager.getTempFile('in')
		const tempOutput = MediaManager.getTempFile('webp')

		try {
			// P2 FIX: async write
			if (Buffer.isBuffer(inputPathOrBuffer)) {
				await fs.promises.writeFile(tempInput, inputPathOrBuffer)
			} else {
				await fs.promises.copyFile(inputPathOrBuffer, tempOutput.replace('.webp', '.in'))
				await fs.promises.copyFile(inputPathOrBuffer, tempInput)
			}

			await new Promise<void>((resolve, reject) => {
				ffmpegLib(tempInput)
					.outputOptions([
						'-vcodec',
						'libwebp',
						'-vf',
						'scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=white@0',
						'-loop',
						'0',
						'-preset',
						'default',
						'-an',
						'-vsync',
						'0',
						'-t',
						'00:00:05'
					])
					.output(tempOutput)
					.on('end', () => resolve())
					.on('error', (err: unknown) => reject(err))
					.run()
			})

			// P2 FIX: async read
			const webpBuffer = await fs.promises.readFile(tempOutput)

			// P2 FIX: EXIF pack metadata — write serialized JSON length into buffer at offset 14
			if (metadata?.packname || metadata?.author) {
				const exifJson = JSON.stringify({
					'sticker-pack-id': `com.queenanya.sticker.${randomBytes(4).toString('hex')}`,
					'sticker-pack-name': metadata.packname || '',
					'sticker-pack-publisher': metadata.author || '',
					emojis: ['🤖']
				})
				const exifBytes = Buffer.from(exifJson, 'utf8')
				const exifHeader = Buffer.alloc(22)
				exifHeader.writeUInt32BE(exifBytes.length, 14) // write payload length
				const fullExif = Buffer.concat([exifHeader, exifBytes])

				const img = new webpmux.Image()
				await img.load(webpBuffer)
				img.exif = fullExif
				return await img.save(null)
			}

			return webpBuffer
		} finally {
			// P2 FIX: async cleanup, ignore errors
			await fs.promises.unlink(tempInput).catch(() => {})
			await fs.promises.unlink(tempOutput).catch(() => {})
		}
	}

	/**
	 * Convert audio to OGG Opus voice note format.
	 *
	 * P1 FIX: Added required WA voice note params:
	 *   -ac 1       → mono (required by WA)
	 *   -ar 16000   → 16kHz sample rate (WA standard for PTT)
	 *   -application voip → Opus VOIP application mode
	 *   -b:a 32k    → bitrate appropriate for voice
	 *   -compression_level 10 → maximize compression
	 */
	public static async convertToVoiceNote(inputPathOrBuffer: string | Buffer): Promise<Buffer> {
		const tempInput = MediaManager.getTempFile('in')
		const tempOutput = MediaManager.getTempFile('ogg')

		try {
			// P2 FIX: async write
			if (Buffer.isBuffer(inputPathOrBuffer)) {
				await fs.promises.writeFile(tempInput, inputPathOrBuffer)
			} else {
				await fs.promises.copyFile(inputPathOrBuffer, tempInput)
			}

			await new Promise<void>((resolve, reject) => {
				ffmpegLib(tempInput)
					.inputOptions(['-y'])
					.outputOptions([
						'-c:a',
						'libopus',
						'-ac',
						'1', // P1 FIX: mono channel (required by WA)
						'-ar',
						'16000', // P1 FIX: 16kHz sample rate
						'-application',
						'voip', // P1 FIX: VOIP application mode
						'-b:a',
						'32k', // P1 FIX: appropriate bitrate for voice
						'-compression_level',
						'10',
						'-vbr',
						'on'
					])
					.format('ogg')
					.output(tempOutput)
					.on('end', () => resolve())
					.on('error', (err: unknown) => reject(err))
					.run()
			})

			// P2 FIX: async read
			return await fs.promises.readFile(tempOutput)
		} finally {
			// P2 FIX: async cleanup
			await fs.promises.unlink(tempInput).catch(() => {})
			await fs.promises.unlink(tempOutput).catch(() => {})
		}
	}
}
