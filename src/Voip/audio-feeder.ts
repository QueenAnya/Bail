/**
 * Audio feeder.
 *
 * Spawns ffmpeg to decode `source` into f32le PCM at the requested rate, then
 * meters frames out at chunk-cadence to the WASM uplink.
 *
 * @author ShellTear
 */
import { type ChildProcessWithoutNullStreams, spawn } from 'node:child_process'

const LOW_WATERMARK_CHUNKS = 16
const MAX_QUEUED_CHUNKS = 1024
const DEFAULT_WARMUP_MS = 500

export type AudioFeederOptions = {
	/** stop after this much audio has been emitted (0 / unset = unlimited) */
	durationMs?: number
	/** called once when the feeder finishes (duration reached, or non-silence source exhausted) */
	onEnd?: () => void
}

export class AudioFeeder {
	#proc: ChildProcessWithoutNullStreams | null = null
	#pending = Buffer.alloc(0)
	#queue: Float32Array[] = []
	#emitTimer: NodeJS.Timeout | null = null
	#nextEmitAtMs = 0
	#warmupUntilMs = 0
	#finished = false
	#stopped = true

	droppedChunks = 0
	underflowChunks = 0
	bytesProduced = 0
	chunksEmitted = 0
	emittedDurationMs = 0

	constructor(
		private readonly sampleRate: number,
		private readonly channels: number,
		private readonly framesPerChunk: number,
		private readonly onChunk: (chunk: Float32Array) => void,
		private readonly source = 'silence',
		private readonly repeat = false,
		private readonly options: AudioFeederOptions = {}
	) {}

	start = (): void => {
		if (this.#proc) return
		this.#finished = false
		this.#stopped = false
		this.chunksEmitted = 0
		this.emittedDurationMs = 0

		const chunkSamples = this.framesPerChunk * this.channels
		const chunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT
		const chunkIntervalMs = (this.framesPerChunk / this.sampleRate) * 1000

		const inputArgs = this.#resolveInputArgs()

		this.#proc = spawn('ffmpeg', [
			'-hide_banner',
			'-loglevel',
			'error',
			'-thread_queue_size',
			'512',
			...inputArgs,
			'-f',
			'f32le',
			'-ac',
			String(this.channels),
			'-ar',
			String(this.sampleRate),
			'pipe:1'
		])

		const proc = this.#proc

		proc.stdout.on('data', (chunk: Buffer) => {
			this.#pending = Buffer.concat([this.#pending, chunk])
			while (this.#pending.length >= chunkBytes) {
				if (this.#queue.length >= MAX_QUEUED_CHUNKS) {
					this.#proc?.stdout.pause()
					break
				}

				const frame = this.#pending.subarray(0, chunkBytes)
				this.#pending = this.#pending.subarray(chunkBytes)
				const out = new Float32Array(chunkSamples)
				out.set(new Float32Array(frame.buffer, frame.byteOffset, chunkSamples))
				this.bytesProduced += chunkBytes
				this.#queue.push(out)
			}
		})

		proc.stderr?.on('data', () => {})

		// a spawn failure (e.g. ffmpeg not installed -> ENOENT) emits 'error' and never 'exit',
		// so release the process here too or the feeder would believe ffmpeg is still running
		proc.on('error', () => {
			if (this.#proc === proc) this.#proc = null
		})

		proc.on('exit', () => {
			if (this.#proc === proc) this.#proc = null
		})

		this.#nextEmitAtMs = 0
		const durationMs = this.options.durationMs ?? 0
		this.#warmupUntilMs =
			(durationMs > 0 && durationMs <= DEFAULT_WARMUP_MS) || !this.source || this.source === 'silence'
				? 0
				: Date.now() + DEFAULT_WARMUP_MS
		this.#scheduleNext(chunkSamples, chunkIntervalMs)
	}

	stop = (): void => {
		this.#stopped = true
		if (this.#emitTimer) {
			clearTimeout(this.#emitTimer)
			this.#emitTimer = null
		}

		this.#proc?.kill('SIGKILL')
		this.#proc = null
		this.#pending = Buffer.alloc(0)
		this.#queue = []
		this.#warmupUntilMs = 0
	}

	#resolveInputArgs = (): string[] => {
		if (!this.source || this.source === 'silence') {
			return ['-f', 'lavfi', '-i', `aevalsrc=0:d=3600:s=${this.sampleRate}`]
		}

		if (this.source.startsWith('lavfi:')) {
			return ['-f', 'lavfi', '-i', this.source.slice('lavfi:'.length)]
		}

		if (this.repeat) {
			return ['-stream_loop', '-1', '-i', this.source]
		}

		return ['-i', this.source]
	}

	#scheduleNext = (chunkSamples: number, chunkIntervalMs: number): void => {
		if (this.#stopped || this.#finished) return
		// legacy behaviour: without onEnd, stop scheduling once ffmpeg has exited
		if (!this.#proc && !this.options.onEnd) return
		const now = Date.now()
		if (this.#nextEmitAtMs === 0) this.#nextEmitAtMs = now
		const delayMs = Math.max(0, this.#nextEmitAtMs - now)

		this.#emitTimer = setTimeout(() => {
			this.#emitTimer = null
			if (this.#queue.length < LOW_WATERMARK_CHUNKS && Date.now() < this.#warmupUntilMs) {
				this.#nextEmitAtMs = Date.now() + 10
				this.#scheduleNext(chunkSamples, chunkIntervalMs)
				return
			}

			this.#flushOne(chunkSamples, chunkIntervalMs)
			this.#nextEmitAtMs += chunkIntervalMs
			this.#scheduleNext(chunkSamples, chunkIntervalMs)
		}, delayMs)
	}

	#finish = (): void => {
		if (this.#finished) return
		this.#finished = true
		this.stop()
		this.options.onEnd?.()
	}

	#flushOne = (chunkSamples: number, chunkIntervalMs: number): void => {
		if (this.#finished) return

		let nextChunk = this.#queue.shift()
		if (!nextChunk) {
			// source exhausted: only end when a consumer asked to be told (keeps legacy silence-padding otherwise)
			if (this.options.onEnd && this.source !== 'silence' && !this.#proc) {
				this.#finish()
				return
			}

			nextChunk = new Float32Array(chunkSamples)
			this.underflowChunks += 1
		}

		this.chunksEmitted += 1
		this.emittedDurationMs = this.chunksEmitted * chunkIntervalMs
		this.onChunk(nextChunk)

		const durationMs = this.options.durationMs ?? 0
		if (durationMs > 0 && this.emittedDurationMs >= durationMs) {
			this.#finish()
			return
		}

		if (this.#proc?.stdout.isPaused() && this.#queue.length <= MAX_QUEUED_CHUNKS / 4) {
			this.#proc.stdout.resume()
		}
	}
}
