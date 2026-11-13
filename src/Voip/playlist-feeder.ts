/**
 * Playlist layer for `AudioFeeder`.
 *
 * Elaina's `AudioFeeder.start([tracks])` plays a queue and reports track transitions through hooks.
 * This fork's `AudioFeeder` is deliberately single-source, so the queue lives here instead of being
 * grafted onto the audio path: this class owns one `AudioFeeder` at a time and moves to the next
 * track when the current one ends. Nothing in `audio-feeder.ts` changed, so call behaviour is
 * untouched.
 */
import { AudioFeeder } from './audio-feeder'

export interface PlaylistFeederHooks {
	onTrackStart?: (track: string) => void
	onTrackEnd?: (track: string) => void
	onIdle?: () => void
	onChunk?: (chunk: Float32Array) => void
}

export interface PlaylistFeederOptions extends PlaylistFeederHooks {
	sampleRate?: number
	channels?: number
	framesPerChunk?: number
	/** swap the feeder for a stub in tests; defaults to a real `AudioFeeder` per track */
	createFeeder?: (track: string, onEnd: () => void) => AudioFeeder
}

export class PlaylistAudioFeeder {
	#tracks: string[] = []
	#current: string | null = null
	#feeder: AudioFeeder | null = null
	#stopped = false
	#started = false

	constructor(private readonly options: PlaylistFeederOptions = {}) {}

	/** the track being fed right now, or null between tracks and while idle */
	get currentTrack(): string | null {
		return this.#current
	}

	/** nothing playing and nothing queued */
	get idle(): boolean {
		return this.#feeder === null && this.#tracks.length === 0
	}

	/** tracks waiting behind the current one */
	get playlistLength(): number {
		return this.#tracks.length
	}

	get isRunning(): boolean {
		return this.#feeder !== null
	}

	/** internals, read by the node tests only */
	get _feederForTest(): { end?: () => void; stop?: () => void } | null {
		return this.#feeder
	}

	/** Replace the queue and start playing immediately. An empty list leaves the feeder idle. */
	start = (tracks: string[] | string = []): void => {
		const list = (Array.isArray(tracks) ? tracks : [tracks]).filter(Boolean)
		this.stop()
		this.#stopped = false
		this.#started = true
		this.#tracks = list
		this.#advance()
	}

	/** Queue a track. If nothing is playing, this starts it. */
	enqueue = (track: string): number => {
		if (!track) throw new TypeError('enqueue needs a track')
		if (this.#feeder === null) {
			this.#stopped = false
			this.#started = true
			this.#tracks.push(track)
			this.#advance()
		} else {
			this.#tracks.push(track)
		}

		return this.#tracks.length
	}

	/** Drop everything queued; the current track keeps playing. */
	clearPlaylist = (): void => {
		this.#tracks = []
	}

	/** Drop the current track and move on. Returns false when there was nothing to skip. */
	skip = (): boolean => {
		if (this.#feeder === null) return false
		const ended = this.#current
		this.#disposeFeeder()
		if (ended) this.options.onTrackEnd?.(ended)
		this.#advance()
		return true
	}

	stop = (): void => {
		this.#stopped = true
		this.#disposeFeeder()
		this.#tracks = []
		this.#current = null
	}

	#disposeFeeder = (): void => {
		const feeder = this.#feeder
		this.#feeder = null
		this.#current = null
		try {
			feeder?.stop()
		} catch {
			// a stub feeder that has no stop() must not break the queue
		}
	}

	#advance = (): void => {
		if (this.#stopped) return

		const next = this.#tracks.shift()
		if (!next) {
			this.#feeder = null
			this.#current = null
			if (this.#started) this.options.onIdle?.()
			return
		}

		this.#current = next
		const onEnd = () => this.#handleTrackEnd(next)
		this.#feeder = this.#makeFeeder(next, onEnd)
		this.options.onTrackStart?.(next)
		try {
			this.#feeder.start()
		} catch (error) {
			// a source ffmpeg cannot open ends the track rather than wedging the queue
			this.#handleTrackEnd(next, error as Error)
		}
	}

	// `_error` is part of the hook signature and is reported by the caller, not here
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	#handleTrackEnd = (track: string, _error?: Error): void => {
		// a feeder that already moved on (skip, stop) must not fire the hooks twice
		if (this.#stopped || this.#current !== track) return
		this.#disposeFeeder()
		this.options.onTrackEnd?.(track)
		this.#advance()
	}

	#makeFeeder = (track: string, onEnd: () => void): AudioFeeder => {
		if (this.options.createFeeder) {
			return this.options.createFeeder(track, onEnd)
		}

		return new AudioFeeder(
			this.options.sampleRate ?? 16000,
			this.options.channels ?? 1,
			this.options.framesPerChunk ?? 320,
			chunk => this.options.onChunk?.(chunk),
			track,
			false,
			{ onEnd }
		)
	}
}
