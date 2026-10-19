/**
 * Image-processing library loader — combines the loaders of itsliaaa/baileys
 * and innovatorssoft/baileys:
 *
 *   - itsliaaa:        sharp → @napi-rs/image → jimp priority, result CACHED after the
 *                      first successful load (no re-importing on every media call).
 *   - innovatorssoft:  jimp default-export unwrapping (`jimp.default || jimp`), so a
 *                      CommonJS-style jimp still exposes `.Jimp`.
 *   - tb2:             all three libraries are optional — whichever is installed is used.
 *
 * Re-exported from `Utils/messages-media.ts` too, so existing imports keep working.
 */
import { Boom } from '@hapi/boom'

const loadImageProcessingLibrary = async () => {
	const [jimp, sharp, image] = await Promise.all([
		import('jimp').catch(() => {}),
		// @ts-ignore — sharp is an optional peer dependency and may not be installed
		import('sharp').catch(() => {}),
		// @ts-ignore — @napi-rs/image is an optional peer dependency and may not be installed
		import('@napi-rs/image').catch(() => {})
	])

	if (sharp) {
		return { sharp }
	}

	if (image) {
		return { image }
	}

	if (jimp) {
		// innovatorssoft: a CJS/default-export jimp has no named `Jimp` → expose the default as `Jimp`
		const j: any = jimp
		return { jimp: (j.Jimp || !j.default ? jimp : { ...j, Jimp: j.default }) as typeof jimp }
	}

	throw new Boom('No image processing library available')
}

let pending: ReturnType<typeof loadImageProcessingLibrary> | undefined

/** Returns `{ sharp }`, `{ image }` or `{ jimp }` (first one installed). Cached after first load. */
export const getImageProcessingLibrary = async () => {
	if (!pending) {
		pending = loadImageProcessingLibrary()
		// don't cache a failure — a later call may succeed
		pending.catch(() => {
			pending = undefined
		})
	}

	return pending
}

/** Forget the cached library (mainly for tests). */
export const clearImageProcessingLibraryCache = () => {
	pending = undefined
}

/** Name of the active library — 'sharp' | 'image' | 'jimp'. */
export const getImageProcessingLibraryName = async (): Promise<'sharp' | 'image' | 'jimp'> => {
	const lib = await getImageProcessingLibrary()
	return 'sharp' in lib ? 'sharp' : 'image' in lib ? 'image' : 'jimp'
}
