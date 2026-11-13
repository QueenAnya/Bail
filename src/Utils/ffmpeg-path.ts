import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'

let cached: string | undefined

/**
 * ffmpeg binary to spawn: the bundled `ffmpeg-static` binary when it was downloaded (so nothing has to be
 * installed on the machine or added to PATH), otherwise the system `ffmpeg`.
 *
 * `ffmpeg-static` downloads its binary in its install script; if your package manager skipped that script,
 * run `yarn rebuild ffmpeg-static` once.
 */
export const getFfmpegBin = (): string => {
	if (cached) {
		return cached
	}

	// an explicit override wins over everything, so a deployment can pin its own build
	const override = process.env.FFMPEG_PATH?.trim()
	if (override) {
		cached = override
		return override
	}

	try {
		const bundled: unknown = createRequire(import.meta.url)('ffmpeg-static')
		const path = typeof bundled === 'string' ? bundled : (bundled as { default?: unknown } | null)?.default
		if (typeof path === 'string' && existsSync(path)) {
			cached = path
			return path
		}
	} catch {
		// ffmpeg-static not installed or not loadable: fall back to the system ffmpeg
	}

	cached = 'ffmpeg'
	return cached
}
