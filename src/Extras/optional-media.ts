/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.x (MIT) - Utils/optional-media.js
 * Copied as-is (JS -> TS); only import paths and parameter types were adapted for tb2.
 * Re-checked against elaina-baileys 1.4.7: the exported surface matches; see PORTED_FROM below.
 */
const cache = new Map<string, Promise<any>>()

const MESSAGES: Record<string, string> = {
	sharp: 'sharp is an optional dependency. Install it with: npm i sharp',
	'fluent-ffmpeg': 'fluent-ffmpeg is an optional dependency. Install it with: npm i fluent-ffmpeg'
}

const isMissingModule = (error: any, name: string) => {
	const code = error?.code
	if (code !== 'ERR_MODULE_NOT_FOUND' && code !== 'MODULE_NOT_FOUND') {
		return false
	}

	const message = String(error?.message ?? '')
	return message.includes(`'${name}'`) || message.includes(`"${name}"`)
}

const loadOptional = (name: string) => {
	if (!cache.has(name)) {
		cache.set(
			name,
			import(name).then(
				loaded => loaded?.default ?? loaded,
				error => {
					cache.delete(name)
					if (isMissingModule(error, name)) {
						throw new Error(MESSAGES[name] ?? `${name} is an optional dependency. Install it with: npm i ${name}`)
					}

					throw error
				}
			)
		)
	}

	return cache.get(name)
}

export const loadSharp = () => loadOptional('sharp')

export const loadFfmpeg = () => loadOptional('fluent-ffmpeg')

export const hasOptionalMedia = async (name: string) => {
	try {
		await loadOptional(name)
		return true
	} catch {
		return false
	}
}
