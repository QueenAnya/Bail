/**
 * media-messages.ts
 * Jimp-based profile-picture image generators (square + panoramic/wide).
 *
 * Ported from a user-supplied `media-messages.js`, which targeted Jimp
 * 0.22.x. This fork pins `jimp@^1.6.1`, which changed its API significantly:
 *   - `import Jimp from 'jimp'` (default export)
 *     → `import { Jimp, JimpMime } from 'jimp'` (named exports)
 *   - `jimp.getWidth()` / `jimp.getHeight()` → `jimp.bitmap.width` / `.height`
 *   - `jimp.getBufferAsync(mime)` → `await jimp.getBuffer(mime)` (no more
 *     separate `*Async` suffix — `getBuffer` itself returns a Promise)
 *   - `Jimp.MIME_JPEG` (static constant on the class)
 *     → `JimpMime.jpeg` (separate named export object)
 *   - `.crop(x, y, w, h)`, `.resize(w, h)`, `.quality(n)`, `.scaleToFit(w, h)`,
 *     `.normalize()` — all unchanged, still positional-arg chainable methods.
 *
 * Deduplication: the source file had two pairs of functions with genuinely
 * identical bodies under different names:
 *   - `generatePP` was byte-identical to `generateProfilePictureFP`
 *   - `changeprofileFull` was near-identical to `generateProfilePictureFull`
 *     (differed only by a bug — `MIME_JPEG` used unqualified instead of
 *     `Jimp.MIME_JPEG`, which would have thrown a ReferenceError at runtime)
 * Each pair is implemented once below and exported under both original
 * names as aliases, so nothing that imports either name breaks.
 */

import { Jimp, JimpMime } from 'jimp'
import type { WAMediaUpload } from '../Types/index.js'

const toBuffer = async (stream: NodeJS.ReadableStream): Promise<Buffer> => {
	const chunks: Buffer[] = []
	for await (const chunk of stream) {
		chunks.push(chunk as Buffer)
	}

	;(stream as unknown as { destroy?: () => void }).destroy?.()
	return Buffer.concat(chunks)
}

/**
 * Generates a panoramic/wide profile picture buffer — landscape images are
 * scaled down to a 720px-wide target, portrait images to a 324px-wide
 * target, preserving aspect ratio throughout (no cropping is actually
 * applied — the "crop" call in the original source used the image's own
 * full bounds, so it was a no-op; omitted here for clarity).
 *
 * Exported as both `generateProfilePictureFull` and `changeprofileFull`
 * (the latter was a buggy near-duplicate in the source; now fixed).
 */
const generateWideProfilePicture = async (img: Buffer | string) => {
	const jimp = await Jimp.read(img)
	const width = jimp.bitmap.width
	const height = jimp.bitmap.height
	const ratio = width > height ? width / 720 : width / 324
	const targetWidth = Math.round(width / ratio)
	const targetHeight = Math.round(height / ratio)

	const buffer = await jimp.resize({ w: targetWidth, h: targetHeight }).getBuffer(JimpMime.jpeg, { quality: 100 })

	return { img: buffer }
}

export const generateProfilePictureFull = generateWideProfilePicture
export const changeprofileFull = generateWideProfilePicture

/**
 * Generates a square profile picture buffer (main image, scaled to fit
 * within 720x720) plus a normalized preview buffer, from the source
 * image's own full bounds (no meaningful crop applied — see note above).
 *
 * Exported as both `generateProfilePictureFP` and `generatePP` (the source
 * had these as two byte-identical functions under different names).
 */
const generateSquareProfilePicture = async (buffer: Buffer | string) => {
	const jimp = await Jimp.read(buffer)

	const img = await jimp.clone().scaleToFit({ w: 720, h: 720 }).getBuffer(JimpMime.jpeg)
	const preview = await jimp.clone().normalize().getBuffer(JimpMime.jpeg)

	return { img, preview }
}

export const generateProfilePictureFP = generateSquareProfilePicture
export const generatePP = generateSquareProfilePicture

/**
 * Generates a profile picture buffer from a flexible input source — a raw
 * Buffer, a `{ url }` media-upload descriptor, or a `{ stream }`
 * media-upload descriptor — unlike the two functions above, which only
 * accept an already Jimp-readable source. Resizes the longer dimension
 * down to 720px, preserving aspect ratio on the other.
 */
export const generateProfilePicturee = async (mediaUpload: WAMediaUpload) => {
	let bufferOrFilePath: Buffer | string

	if (Buffer.isBuffer(mediaUpload)) {
		bufferOrFilePath = mediaUpload
	} else if ('url' in mediaUpload) {
		bufferOrFilePath = mediaUpload.url.toString()
	} else {
		bufferOrFilePath = await toBuffer((mediaUpload as { stream: NodeJS.ReadableStream }).stream)
	}

	const jimp = await Jimp.read(bufferOrFilePath)
	const { width, height } = jimp.bitmap

	const resized =
		width > height
			? jimp.resize({ w: 720, h: Math.round((height / width) * 720) })
			: jimp.resize({ w: Math.round((width / height) * 720), h: 720 })

	const img = await resized.getBuffer(JimpMime.jpeg, { quality: 100 })

	return { img }
}
