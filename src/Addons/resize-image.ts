import { Boom } from '@hapi/boom'
import type { WAMediaUpload } from '../Types'
import { getStream, toBuffer } from '../Utils/messages-media'
import { getImageProcessingLibrary } from './image-processing'

/**
 * `sock.resize(image, width, height)` — resizes an image (Buffer, `{ url }`, `{ stream }`, http(s) URL or
 * local file path) to exactly `width` x `height` and returns it as a JPEG Buffer; typically used for
 * `jpegThumbnail`, e.g. `jpegThumbnail: await sock.resize('https://example.com/pic.jpg', 320, 320)`.
 * (Documented in the @innovatorssoft/baileys README.)
 */
export const resizeImage = async (media: WAMediaUpload | string, width = 320, height = 320): Promise<Buffer> => {
	const source: WAMediaUpload = typeof media === 'string' ? { url: media } : media
	const buffer = Buffer.isBuffer(source) ? source : await toBuffer((await getStream(source)).stream)

	const lib = await getImageProcessingLibrary()
	if ('sharp' in lib && typeof lib.sharp?.default === 'function') {
		return lib.sharp.default(buffer).resize(width, height, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer()
	}

	if ('image' in lib && typeof lib.image?.Transformer === 'function') {
		return new lib.image.Transformer(buffer).resize(width, height).jpeg(80)
	}

	if ('jimp' in lib && typeof lib.jimp?.Jimp === 'function') {
		const jimp = await (lib.jimp.Jimp as any).read(buffer)
		return jimp
			.resize({ w: width, h: height, mode: lib.jimp.ResizeStrategy.BILINEAR })
			.getBuffer('image/jpeg', { quality: 80 })
	}

	throw new Boom('No image processing library available')
}
