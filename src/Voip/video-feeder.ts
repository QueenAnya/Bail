/**
 * Video feeder.
 *
 * Spawns ffmpeg to decode `source` into raw YUV420p frames at the requested
 * resolution/fps, then emits each decoded frame via `onFrame`. Mirrors
 * `audio-feeder.ts`'s decode-and-chunk design, but for video.
 */
import { type ChildProcessByStdio, execFile, spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve as resolvePath } from 'node:path'
import type { Readable } from 'node:stream'

const FFMPEG_BIN = 'ffmpeg'
const DEFAULT_WIDTH = 640
const DEFAULT_HEIGHT = 480
const DEFAULT_FPS = 15
const MAX_STDERR_CHARS = 16 * 1024

let ffmpegAvailableCache: boolean | null = null

/** Checks (and caches) whether an `ffmpeg` binary is reachable on PATH. */
export const checkFfmpegAvailable = (bin = FFMPEG_BIN): Promise<boolean> => {
	if (ffmpegAvailableCache !== null) return Promise.resolve(ffmpegAvailableCache)
	return new Promise(res => {
		execFile(bin, ['-version'], { timeout: 5000 }, err => {
			ffmpegAvailableCache = !err
			res(ffmpegAvailableCache)
		})
	})
}

export type VideoFeederOptions = {
	width?: number
	height?: number
	fps?: number
	loop?: boolean
	durationMs?: number
}

export class VideoFeeder {
	readonly source: string
	readonly width: number
	readonly height: number
	readonly fps: number
	readonly frameSizeBytes: number
	readonly loop: boolean
	readonly durationMs: number

	#running = false
	#proc: ChildProcessByStdio<null, Readable, Readable> | null = null
	#pending = Buffer.alloc(0)
	#stderr = ''

	framesProduced = 0
	framesEmitted = 0
	bytesProduced = 0

	constructor(
		source: string,
		private readonly onFrame: (frame: Buffer, width: number, height: number, fps: number) => void,
		private readonly onEnd: (() => void) | null = null,
		private readonly onError: ((err: Error) => void) | null = null,
		options: VideoFeederOptions = {}
	) {
		if (!source) throw new Error('Video source is required')

		let resolvedSource = source
		if (!resolvedSource.startsWith('lavfi:')) {
			if (!existsSync(resolvedSource)) {
				const cwdResolved = resolvePath(process.cwd(), resolvedSource)
				if (existsSync(cwdResolved)) {
					resolvedSource = cwdResolved
				} else {
					throw new Error(`Video source file not found: ${source}`)
				}
			}
		}

		this.source = resolvedSource

		let width = Number(options.width || DEFAULT_WIDTH)
		let height = Number(options.height || DEFAULT_HEIGHT)
		if (width % 2 !== 0) width += 1
		if (height % 2 !== 0) height += 1
		this.width = width
		this.height = height

		this.fps = Math.max(1, Math.min(60, Number(options.fps || DEFAULT_FPS)))
		this.frameSizeBytes = Math.floor(this.width * this.height * 1.5)

		this.loop = Boolean(options.loop)
		this.durationMs = Number(options.durationMs ?? 0)
	}

	get isRunning(): boolean {
		return this.#running
	}

	start = (): void => {
		if (this.#proc || this.#running) return
		this.#running = true
		this.framesProduced = 0
		this.framesEmitted = 0
		this.bytesProduced = 0
		this.#pending = Buffer.alloc(0)
		this.#stderr = ''

		const scaleFilter = `scale=${this.width}:${this.height}:force_original_aspect_ratio=decrease,pad=${this.width}:${this.height}:(ow-iw)/2:(oh-ih)/2`

		const args = ['-hide_banner', '-loglevel', 'error']

		if (this.loop && !this.source.startsWith('lavfi:')) {
			args.push('-stream_loop', '-1')
		}

		if (this.source.startsWith('lavfi:')) {
			args.push('-f', 'lavfi', '-re', '-i', this.source.slice(6))
		} else {
			args.push('-re', '-i', this.source)
		}

		args.push('-an', '-vf', scaleFilter, '-r', String(this.fps), '-pix_fmt', 'yuv420p', '-f', 'rawvideo', 'pipe:1')

		try {
			this.#proc = spawn(FFMPEG_BIN, args, { stdio: ['ignore', 'pipe', 'pipe'] })
		} catch (err) {
			this.#running = false
			this.onError?.(err as Error)
			return
		}

		const proc = this.#proc

		proc.stdout?.on('data', (chunk: Buffer) => {
			if (!this.#running) return
			this.#handleData(chunk)
		})

		proc.stderr?.on('data', (chunk: Buffer) => {
			this.#stderr = (this.#stderr + chunk.toString()).slice(-MAX_STDERR_CHARS)
		})

		proc.on('error', (err: Error) => {
			this.#running = false
			this.onError?.(err)
		})

		proc.on('close', (code: number | null) => {
			if (this.#proc === proc) this.#proc = null
			const wasRunning = this.#running
			this.#running = false

			if (code !== 0 && code !== null && wasRunning) {
				const errMsg = this.#stderr.trim() || `FFmpeg exited with code ${code}`
				this.onError?.(new Error(errMsg))
			} else if (wasRunning) {
				this.onEnd?.()
			}
		})
	}

	#handleData = (chunk: Buffer): void => {
		this.bytesProduced += chunk.length
		this.#pending = Buffer.concat([this.#pending, chunk])

		while (this.#pending.length >= this.frameSizeBytes) {
			const frameBuf = this.#pending.subarray(0, this.frameSizeBytes)
			this.#pending = this.#pending.subarray(this.frameSizeBytes)

			this.framesProduced += 1
			this.framesEmitted += 1

			try {
				this.onFrame(frameBuf, this.width, this.height, this.fps)
			} catch (err) {
				this.onError?.(err as Error)
			}
		}
	}

	stop = (): void => {
		this.#running = false
		if (this.#proc) {
			try {
				this.#proc.kill('SIGKILL')
			} catch {}

			this.#proc = null
		}

		this.#pending = Buffer.alloc(0)
	}
}
