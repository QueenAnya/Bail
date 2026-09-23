/**
 * VoIP call orchestration — wires the WASM VoIP stack onto an EXISTING,
 * already-connected queenanya socket (single session), instead of creating
 * a separate standalone connection the way upstream baileys-caller's
 * `VoipClient.connect()` does.
 *
 * Ported from baileys-caller (https://github.com/SheIITear/baileys-caller,
 * MIT, by ShellTear). The signaling/WASM/relay/audio layers are unchanged —
 * only the "how do we get a `sock`" part differs: here it's handed to us
 * already open.
 *
 * Adds `sock.initiateCall(jid, opts)` to the socket, matching the shape:
 *
 *   const call = await sock.initiateCall(jid, {
 *     audioSource: './audio.mp3', // MP3/WAV path, or 'silence'
 *     durationMs: 30000
 *   })
 *   call.on('ringing', () => ...)
 *   call.on('connected', () => ...)
 *   call.on('audio', (pcmChunk) => ...)   // 16 kHz mono Float32Array
 *   call.on('ended', (reason) => ...)
 *   call.on('error', (err) => ...)
 *
 * @author ShellTear (original signaling/WASM/relay/audio design),
 *         adapted for single-session use in @queenanya/baileys
 */
import { createHmac, randomBytes } from 'crypto'
import { EventEmitter } from 'events'
import { AudioFeeder } from './audio-feeder'
import { type RelayListUpdatePayload, RelayRtcTransport } from './relay-transport'
import { type BaileysSocket, SignalingBridge } from './signaling'
import { CallState, type CallStatus, type CallSummary, type VoipConfigOptions } from './types'
import { VideoFeeder } from './video-feeder'
import { WasmEngine } from './wasm-engine'

export type {
	VoipSdkConfig,
	CallOptions,
	CallEvents,
	AudioConfig,
	CallStatus,
	CallSummary,
	CallRequest,
	VoipConfigOptions
} from './types'
export { CallState } from './types'

const SHA256_LEN = 32

const toBareJid = (jid: string): string => {
	if (!jid) return jid
	const at = jid.indexOf('@')
	if (at < 0) return jid
	const user = jid.slice(0, at).split(':')[0]
	return `${user}@${jid.slice(at + 1)}`
}

const computeHkdf = (key: Uint8Array, salt: Uint8Array | null, info: Uint8Array, length: number): Uint8Array => {
	const effectiveSalt = salt && salt.length > 0 ? Buffer.from(salt) : Buffer.alloc(SHA256_LEN, 0)
	const prk = createHmac('sha256', effectiveSalt).update(key).digest()
	const blocks = Math.ceil(length / SHA256_LEN)
	const okm = Buffer.alloc(blocks * SHA256_LEN)
	let prev = Buffer.alloc(0)
	for (let i = 1; i <= blocks; i += 1) {
		prev = createHmac('sha256', prk)
			.update(prev)
			.update(info)
			.update(Buffer.from([i]))
			.digest()
		prev.copy(okm, (i - 1) * SHA256_LEN)
	}

	return new Uint8Array(okm.buffer, okm.byteOffset, length)
}

const computeHmacSha256 = (data: Uint8Array, key: Uint8Array): Uint8Array => {
	const result = createHmac('sha256', Buffer.from(key)).update(data).digest()
	return new Uint8Array(result.buffer, result.byteOffset, result.byteLength)
}

const isCallReceiptNode = (node: any): boolean => {
	if (node?.tag !== 'receipt') return false
	const child = Array.isArray(node.content) ? node.content[0] : null
	return !!(child?.attrs?.['call-id'] || child?.attrs?.call_id)
}

const DEFAULT_PRE_RINGING_TIMEOUT_MS = 20_000

/** A live or recently-ended call. */
export class ActiveCall extends EventEmitter {
	readonly startedAt = Date.now()
	connectedAt: number | null = null
	endedAt: number | null = null

	#state: CallState = CallState.Idle
	#status: CallStatus = 'initiating'
	#endResolver!: (reason: string) => void
	readonly #endPromise: Promise<string>
	#endTimer: ReturnType<typeof setTimeout> | null = null
	#preRingingTimer: ReturnType<typeof setTimeout> | null = null
	#ended = false

	/** @internal mirrors the source path for the audio feeder */
	_audioSource = 'silence'
	/** @internal whether the audio source should loop for the life of the call */
	_repeatAudio = false
	/** @internal auto-hangup duration, also reported via getSummary() */
	_durationMs = 120_000

	/** @internal video source path/options, set by initiateCall when isVideo is requested */
	_videoSource: string | null = null
	_videoWidth = 640
	_videoHeight = 480
	_videoFps = 15
	_videoLoop = false
	/** @internal true = horizontal/landscape, false = vertical/portrait */
	isHorizontal = false
	/** @internal raw orientation flag passed to sendVideoFrame (0 = portrait, 2 = landscape, etc.) */
	_videoOrientation = 0
	/** @internal whether this is a video call */
	isVideo = false
	/** @internal set by voip-engine once the video feeder is actually running */
	videoFeeder: VideoFeeder | null = null

	constructor(
		public readonly callId: string,
		public readonly peerJid: string,
		private readonly engine: WasmEngine,
		durationMs: number,
		public readonly phoneNumber: string = peerJid,
		preRingingTimeoutMs = DEFAULT_PRE_RINGING_TIMEOUT_MS
	) {
		super()
		this._durationMs = durationMs
		this.#endPromise = new Promise(res => {
			this.#endResolver = res
		})
		if (durationMs > 0) {
			this.#endTimer = setTimeout(() => this.end('completed'), durationMs)
		}

		if (preRingingTimeoutMs > 0) {
			this.#preRingingTimer = setTimeout(() => this.#handlePreRingingTimeout(), preRingingTimeoutMs)
		}
	}

	/**
	 * Start streaming a video source into this call. `ptr` must be a
	 * pre-allocated WASM heap buffer at least `width * height * 1.5` bytes
	 * (YUV420p frame size) — see `handleAudioCaptureStart` in
	 * `attachVoipToSocket`, which allocates and passes this in.
	 */
	startVideo = (ptr: number): void => {
		if (this.#ended || this.videoFeeder || !this._videoSource) return
		this.emit('videoStarted')
		try {
			this.videoFeeder = new VideoFeeder(
				this._videoSource,
				(frameBuf, width, height, fps) => {
					if (!this.#ended) this.engine.sendVideoFrame(frameBuf, ptr, width, height, fps, 1, this._videoOrientation)
				},
				() => {
					if (!this.#ended) this.emit('videoEnded')
				},
				err => {
					if (!this.#ended) this.emit('videoError', err)
				},
				{
					width: this._videoWidth,
					height: this._videoHeight,
					fps: this._videoFps,
					loop: this._videoLoop,
					durationMs: this._durationMs
				}
			)
			this.videoFeeder.start()
		} catch (err) {
			this.emit('videoError', err)
		}
	}

	stopVideo = (): void => {
		this.videoFeeder?.stop()
		this.videoFeeder = null
	}

	get state(): CallState {
		return this.#state
	}

	get status(): CallStatus {
		return this.#status
	}

	get ended(): boolean {
		return this.#ended
	}

	/** Snapshot of this call's current config/state, mirroring upstream's CallSummary. */
	getSummary = (): CallSummary => ({
		id: this.callId,
		jid: this.peerJid,
		status: this.#status,
		state: this.#state,
		startedAt: this.startedAt,
		connectedAt: this.connectedAt,
		endedAt: this.endedAt,
		durationMs: this._durationMs,
		audioSource: this._audioSource,
		repeatAudio: this._repeatAudio,
		isVideo: this.isVideo,
		isHorizontal: this.isHorizontal,
		videoOrientation: this._videoOrientation,
		videoSource: this._videoSource
	})

	/** Ends the call. `reason` defaults to `'completed'`; for `'remote_end'`
	 *  or `'rejected'` we skip re-signaling `endCall` to the WASM since the
	 *  remote side already tore it down. */
	end = (reason = 'completed'): void => {
		if (this.#ended) return
		this.#ended = true
		this.endedAt = Date.now()
		this.#clearTimers()
		this.stopVideo()
		this.#setStatus('ending')
		if (reason !== 'remote_end' && reason !== 'rejected') {
			try {
				this.engine.endCall(0, true)
			} catch {}
		}

		this.#setStatus('ended')
		this.emit('ended', reason)
		this.#endResolver(reason)
	}

	mute = (muted: boolean): void => {
		try {
			this.engine.setMute(muted)
		} catch {}
	}

	waitForEnd = (): Promise<string> => this.#endPromise

	#setStatus = (status: CallStatus): void => {
		if (this.#status === status) return
		this.#status = status
		this.emit('stateChange', status)
	}

	#confirmRinging = (): void => {
		if (this.#preRingingTimer) {
			clearTimeout(this.#preRingingTimer)
			this.#preRingingTimer = null
		}

		if (!['ringing', 'accepted', 'connected', 'audio_ready', 'streaming'].includes(this.#status)) {
			this.#setStatus('ringing')
			this.emit('ringing')
		}
	}

	#confirmAccepted = (): void => {
		if (this.#preRingingTimer) {
			clearTimeout(this.#preRingingTimer)
			this.#preRingingTimer = null
		}

		if (!['accepted', 'connected', 'audio_ready', 'streaming'].includes(this.#status)) {
			this.#setStatus('accepted')
			this.emit('accepted')
		}
	}

	#confirmConnected = (): void => {
		if (this.#preRingingTimer) {
			clearTimeout(this.#preRingingTimer)
			this.#preRingingTimer = null
		}

		if (!['connected', 'audio_ready', 'streaming'].includes(this.#status)) {
			this.connectedAt = Date.now()
			this.#setStatus('connected')
			this.emit('connected')
		}
	}

	/** @internal — call once the audio feeder actually starts pushing frames. */
	_confirmAudioReady = (): void => {
		if (!['audio_ready', 'streaming'].includes(this.#status)) {
			this.#setStatus('audio_ready')
			this.emit('audioReady')
		}
	}

	/** @internal — call on the first real audio chunk sent. */
	_confirmStreaming = (): void => {
		if (this.#status !== 'streaming') {
			this.#setStatus('streaming')
			this.emit('streaming')
		}
	}

	/** @internal — called by the engine wiring below on WASM call-state change */
	_updateState = (state: number): void => {
		this.#state = state as CallState
		if (state === CallState.PreacceptReceived) this.#confirmRinging()
		else if (state === CallState.AcceptReceived) this.#confirmAccepted()
		else if (state === CallState.Active) this.#confirmConnected()
		else if (state === CallState.Idle || state === CallState.Ending) this._forceEnd('ended')
	}

	/** @internal — called on raw signaling tags (terminate/reject/preaccept/accept/receipt),
	 *  which typically reach us faster than a WASM call-state round trip. */
	_handleSignalingEvent = (tag: string, reason?: string): void => {
		if (this.#ended) return
		if (tag === 'terminate') {
			const normalized = String(reason || '').toLowerCase()
			if (normalized.includes('unavailable') || normalized.includes('peer_offline')) {
				this._handleUnreachable()
			} else if (normalized.includes('timeout')) {
				this._handleTimeout()
			} else if (normalized.includes('reject') || normalized.includes('declined')) {
				this._handleRejected()
			} else {
				this._forceEnd(reason || 'remote_end')
			}
		} else if (tag === 'reject') {
			this._handleRejected()
		} else if (tag === 'preaccept' || tag === 'ringing' || tag === 'receipt') {
			this.#confirmRinging()
		} else if (tag === 'accept') {
			this.#confirmAccepted()
		}
	}

	/** @internal — called on signaling-layer errors (ack timeout, 404/480, etc.) */
	_handleSignalingError = (_signalingTag: string, errorType: string): void => {
		if (this.#ended) return
		if (errorType === 'unreachable' || errorType === 'error_404' || errorType === 'error_480') {
			this._handleUnreachable()
		} else if (errorType === 'ack_timeout') {
			this._handleTimeout()
		} else {
			this._forceFail(`signaling error (${errorType})`)
		}
	}

	/** @internal */
	_handleUnreachable = (): void => {
		if (this.#ended) return
		this.#setStatus('unreachable')
		this._forceEnd('unreachable')
	}

	/** @internal */
	_handleRejected = (): void => {
		if (this.#ended) return
		this.#setStatus('rejected')
		this._forceEnd('rejected')
	}

	/** @internal */
	_handleTimeout = (): void => {
		if (this.#ended) return
		this.#setStatus('timeout')
		this._forceEnd('timeout')
	}

	/** @internal */
	_forceFail = (reason: string): void => {
		if (this.#ended) return
		this.#setStatus('failed')
		this.emit('error', new Error(`VoIP call failed: ${reason}`))
		this._forceEnd(reason)
	}

	/** @internal */
	_emitAudio = (pcm: Float32Array): void => {
		this.emit('audio', pcm)
	}

	/** @internal */
	_forceEnd = (reason: string): void => {
		if (this.#ended) return
		this.#ended = true
		this.endedAt = Date.now()
		this.#clearTimers()

		if (!['unreachable', 'rejected', 'timeout', 'failed'].includes(this.#status)) {
			this.#setStatus('ended')
		}

		this.stopVideo()
		this.emit('ended', reason)
		this.#endResolver(reason)
	}

	#handlePreRingingTimeout = (): void => {
		if (this.#ended || ['ringing', 'accepted', 'connected', 'audio_ready', 'streaming'].includes(this.#status)) {
			return
		}

		this._handleUnreachable()
	}

	#clearTimers = (): void => {
		if (this.#endTimer) {
			clearTimeout(this.#endTimer)
			this.#endTimer = null
		}

		if (this.#preRingingTimer) {
			clearTimeout(this.#preRingingTimer)
			this.#preRingingTimer = null
		}
	}
}

export type InitiateCallOptions = {
	/** Phone number or JID — optional here since it's normally the first arg to initiateCall(). */
	to?: string
	/** Audio source: file path to MP3/WAV, or 'silence' for an empty uplink. */
	audioSource?: string
	/** Auto-hangup after N ms (default: 120000). */
	durationMs?: number
	durationMS?: number
	/** Whether this is a video call (default: false). Requires videoSource. */
	isVideo?: boolean
	/** Video source: file path to MP4/MKV/MOV/AVI, streamed via ffmpeg. */
	videoSource?: string
	/** Video frame width (default: 640). Rounded up to an even number. */
	videoWidth?: number
	width?: number
	/** Video frame height (default: 480). Rounded up to an even number. */
	videoHeight?: number
	height?: number
	/** Video frame rate, 1-60 (default: 15). */
	videoFps?: number
	fps?: number
	/** Loop the video source continuously until durationMs is reached. */
	videoLoop?: boolean
	repeatVideo?: boolean
	loop?: boolean
	/** Stream video in horizontal (landscape) orientation if true. (default: false / portrait) */
	isHorizontal?: boolean
	horizontal?: boolean
	/** Explicit raw device/video orientation (0 = vertical/portrait, 2 = horizontal/landscape, etc.). */
	orientation?: number
	videoOrientation?: number
	/** Loop audioSource for the life of the call instead of playing it once. */
	repeatAudio?: boolean
	repeat?: boolean
	/** Timeout waiting for remote device to confirm ringing, in ms (default: 20000). */
	preRingingTimeoutMs?: number
}

/**
 * Attaches VoIP calling to an already-connected queenanya socket.
 * Called once per socket (see Socket/socket.ts) — sets up the WASM engine,
 * signaling bridge, and relay transport, then exposes `sock.initiateCall()`.
 *
 * Safe to call even if the caller never places a call: the WASM stack only
 * initializes lazily, on first `initiateCall()` — this avoids paying the
 * worker-pool/WASM-compile cost for bots that never use VoIP.
 */
/** Per-call isolated resources: its own WASM engine, relay transport, and
 *  audio/video capture state, so concurrent calls don't share buffers. */
type CallContext = {
	call: ActiveCall
	engine: WasmEngine
	relay: RelayRtcTransport
	capturePtr: number
	captureChunkBytes: number
	captureSampleRate: number
	captureChannels: number
	captureFramesPerChunk: number
	feeder: AudioFeeder | null
	videoPtr: number
}

export const attachVoipToSocket = (sock: BaileysSocket & { presenceSubscribe: (jid: string) => Promise<void> }) => {
	let signaling: SignalingBridge | null = null
	let signalingReadyPromise: Promise<void> | null = null
	let callbacksWired = false
	let maxConcurrentCalls = Number.POSITIVE_INFINITY

	/** Every call this socket currently has open, keyed by callId — one
	 *  entry whether there's a single call or several placed concurrently. */
	const calls = new Map<string, CallContext>()

	/** Brings up the (single, shared) signaling bridge on first use, and wires
	 *  the inbound call/receipt socket listeners exactly once. Each concurrent
	 *  call still gets its own isolated WasmEngine + RelayRtcTransport — see
	 *  `createCallContext` — signaling is the one thing safe to share, since
	 *  it already keys its internal peer/session bookkeeping by callId. */
	const ensureSignalingReady = async (): Promise<SignalingBridge> => {
		if (!signalingReadyPromise) {
			signalingReadyPromise = (async () => {
				const bridge = new SignalingBridge({ sock })
				await bridge.init()
				signaling = bridge
			})()
		}

		await signalingReadyPromise
		if (!signaling) throw new Error('VoIP signaling failed to initialize')

		if (!callbacksWired) {
			callbacksWired = true
			// Fan the raw node out to every open call's own engine — each call's
			// signaling processing internally no-ops unless the node's call-id
			// matches that call, so this is safe even with several calls live.
			sock.ws.on('CB:call', (node: any) => {
				for (const ctx of calls.values()) {
					signaling!.processIncomingCall(node, ctx.engine, ctx.call.callId)
				}
			})
			sock.ws.on('CB:receipt', (node: any) => {
				if (!isCallReceiptNode(node)) return
				for (const ctx of calls.values()) {
					signaling!.processIncomingReceipt(node, ctx.engine, ctx.call.callId)
				}
			})

			// Fast-path reject/unreachable/timeout detection straight off the raw
			// signaling tags, instead of waiting on a WASM call-state round trip.
			signaling.setSignalingEventListener((tag, reason, callId) => {
				calls.get(callId)?.call._handleSignalingEvent(tag, reason)
			})
			signaling.setSignalingErrorListener((tag, errorType, _peerJid, callId) => {
				calls.get(callId)?.call._handleSignalingError(tag, errorType)
			})
		}

		return signaling
	}

	/** Builds a fresh, fully isolated WASM engine + relay transport + capture
	 *  state for one call. Called once per `initiateCall()`, so concurrent
	 *  calls never share an audio/video buffer or WASM instance. */
	const createCallContext = async (callId: string): Promise<CallContext> => {
		const bridge = await ensureSignalingReady()

		const ctx: CallContext = {
			call: null as unknown as ActiveCall,
			engine: null as unknown as WasmEngine,
			relay: null as unknown as RelayRtcTransport,
			capturePtr: 0,
			captureChunkBytes: 0,
			captureSampleRate: 16000,
			captureChannels: 1,
			captureFramesPerChunk: 320,
			feeder: null,
			videoPtr: 0
		}

		const handleCallEvent = (eventType: number, eventData?: string): void => {
			if (eventType === 16 && eventData) {
				try {
					const parsed = JSON.parse(eventData)
					const info = parsed.call_info ?? parsed.callInfo ?? {}
					const callState = Number(info.call_state ?? info.callState ?? 0)
					ctx.call?._updateState(callState)
				} catch {}
			} else if (eventType === 156 && eventData) {
				try {
					const update = JSON.parse(eventData) as RelayListUpdatePayload
					ctx.relay?.updateRelayList(update)
				} catch {}
			} else if (eventType === 2) {
				ctx.call?._forceEnd('remote_end')
			}
		}

		const handleAudioCaptureInit = (config: {
			sampleRate: number
			channels: number
			bitsPerSample: number
			framesPerChunk: number
		}): void => {
			if (!ctx.engine) return
			ctx.captureSampleRate = config.sampleRate || 16000
			ctx.captureChannels = config.channels || 1
			ctx.captureFramesPerChunk = config.framesPerChunk || 320
			const chunkSamples = ctx.captureFramesPerChunk * ctx.captureChannels
			ctx.captureChunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT
			ctx.capturePtr = ctx.engine.malloc(ctx.captureChunkBytes)
		}

		const handleAudioCaptureStart = (): void => {
			if (!ctx.engine || !ctx.capturePtr) return
			const audioSource = ctx.call?._audioSource ?? 'silence'
			const repeatAudio = ctx.call?._repeatAudio ?? false
			ctx.call?._confirmAudioReady()
			ctx.call?._confirmStreaming()
			ctx.feeder = new AudioFeeder(
				ctx.captureSampleRate,
				ctx.captureChannels,
				ctx.captureFramesPerChunk,
				chunk => {
					if (ctx.engine && ctx.capturePtr) ctx.engine.sendAudioData(chunk, ctx.capturePtr)
				},
				audioSource,
				repeatAudio
			)
			ctx.feeder.start()

			if (ctx.engine && ctx.call?._videoSource && !ctx.videoPtr) {
				const frameBytes = Math.ceil(ctx.call._videoWidth / 2) * 2 * (Math.ceil(ctx.call._videoHeight / 2) * 2) * 1.5
				ctx.videoPtr = ctx.engine.malloc(Math.ceil(frameBytes))
				ctx.call.startVideo(ctx.videoPtr)
			}
		}

		const handleAudioCaptureStop = (): void => {
			ctx.feeder?.stop()
			ctx.feeder = null
			if (ctx.engine && ctx.capturePtr) {
				try {
					ctx.engine.free(ctx.capturePtr)
				} catch {}

				ctx.capturePtr = 0
			}

			ctx.call?.stopVideo()
			if (ctx.engine && ctx.videoPtr) {
				try {
					ctx.engine.free(ctx.videoPtr)
				} catch {}

				ctx.videoPtr = 0
			}
		}

		const relay = new RelayRtcTransport({
			onTransportMessage: (data, ip, port) => ctx.engine?.handleOnTransportMessage(data, ip, port),
			onIceRtt: (rttMs, ip, port) => ctx.engine?.updateIceRtt(rttMs, ip, port)
		})

		const engine = new WasmEngine({
			callbacks: {
				onSignalingXmpp: (peerJid, cid, xmlPayload) => bridge.sendSignaling(peerJid, cid, xmlPayload),
				onCallEvent: (eventType, eventData) => handleCallEvent(eventType, eventData),
				sendDataToRelay: (data, ip, port) => relay.send(data, ip, port),
				onAudioCaptureInit: config => handleAudioCaptureInit(config),
				onAudioCaptureStart: () => handleAudioCaptureStart(),
				onAudioCaptureStop: () => handleAudioCaptureStop(),
				onAudioPlaybackData: audioData => ctx.call?._emitAudio(audioData),
				cryptoHkdf: computeHkdf,
				hmacSha256: computeHmacSha256
			}
		})

		await engine.initialize()
		// registerCallEngine claims the primary/fallback slot too, but only if
		// nothing already holds it — so inbound offers still have somewhere to
		// land without concurrent calls stealing that slot from each other.
		bridge.registerCallEngine(callId, engine)

		const selfPnJid = sock.authState.creds.me?.id
		const selfLidJid = sock.authState.creds.me?.lid
		engine.initVoipStack(selfPnJid, toBareJid(selfPnJid), selfLidJid)
		await engine.waitForVoipStackReady()
		try {
			engine.updateNetworkMedium(2, 0)
		} catch {}

		ctx.engine = engine
		ctx.relay = relay
		return ctx
	}

	/** Tears down one call's isolated engine/relay and drops it from the map. */
	const teardownCallContext = (callId: string, ctx: CallContext): void => {
		calls.delete(callId)
		signaling?.unregisterCallEngine(callId)
		void ctx.relay.closeAll()
		try {
			ctx.engine.destroy()
		} catch {}
	}

	/** Places an outbound voice call. Accepts either a bare phone number
	 *  ("12345678901") or an already-formed JID ("12345678901@s.whatsapp.net").
	 *  Safe to call multiple times concurrently — each call gets its own
	 *  isolated WASM engine, so they don't interfere with each other. */
	const initiateCall = async (jidOrPhoneNumber: string, opts: InitiateCallOptions = {}): Promise<ActiveCall> => {
		const bridge = await ensureSignalingReady()
		if (calls.size >= maxConcurrentCalls) {
			throw new Error(`Maximum concurrent call limit (${maxConcurrentCalls}) reached.`)
		}

		const targetPnJid = jidOrPhoneNumber.includes('@')
			? toBareJid(jidOrPhoneNumber)
			: `${jidOrPhoneNumber.replace(/\D/g, '')}@s.whatsapp.net`
		const durationMs = opts.durationMs ?? opts.durationMS ?? 120_000
		const audioSource = opts.audioSource ?? 'silence'
		const isVideo = Boolean(opts.isVideo)
		if (isVideo && !opts.videoSource) {
			throw new Error('videoSource is required when isVideo is true')
		}

		const peerLid = await bridge.resolveLid(targetPnJid)
		if (!peerLid) throw new Error(`Could not resolve LID for ${targetPnJid}`)

		for (const jid of [targetPnJid, peerLid]) {
			try {
				await sock.presenceSubscribe(jid)
			} catch {}
		}

		await new Promise(r => setTimeout(r, 750))

		const peerDeviceJids = await bridge.discoverPeerDevices(peerLid)
		const deviceList = peerDeviceJids.length ? peerDeviceJids : [toBareJid(peerLid)]

		await bridge.ensureSessionsForPeers(deviceList)

		await new Promise(r => setTimeout(r, 500))
		await bridge.issueTcToken(peerLid)
		const tcToken = await bridge.ensureTcToken(peerLid, targetPnJid)

		const callId = ('00' + randomBytes(16).toString('hex').slice(2)).toUpperCase()
		const ctx = await createCallContext(callId)

		const preRingingTimeoutMs = Number(opts.preRingingTimeoutMs ?? DEFAULT_PRE_RINGING_TIMEOUT_MS)
		const call = new ActiveCall(callId, peerLid, ctx.engine, durationMs, targetPnJid, preRingingTimeoutMs)
		call._audioSource = audioSource
		call._repeatAudio = Boolean(opts.repeatAudio ?? opts.repeat ?? false)
		call.isVideo = isVideo
		if (isVideo) {
			call._videoSource = opts.videoSource!
			call._videoWidth = opts.videoWidth ?? opts.width ?? 640
			call._videoHeight = opts.videoHeight ?? opts.height ?? 480
			call._videoFps = opts.videoFps ?? opts.fps ?? 15
			call._videoLoop = Boolean(opts.videoLoop ?? opts.repeatVideo ?? opts.loop ?? false)
			call.isHorizontal = Boolean(opts.isHorizontal ?? opts.horizontal ?? false)
			call._videoOrientation = Number(opts.orientation ?? opts.videoOrientation ?? (call.isHorizontal ? 2 : 0))
		}

		ctx.call = call
		calls.set(callId, ctx)

		ctx.engine.startCall({
			peerJid: peerLid,
			peerPn: targetPnJid,
			peerList: deviceList,
			callId,
			isVideo,
			isLidCall: true,
			isFromDialer: false,
			extraData: tcToken
		})

		call.once('ended', () => teardownCallContext(callId, ctx))

		return call
	}

	/** Places several outbound calls concurrently. Failures for individual
	 *  targets don't stop the rest — check the returned array's length
	 *  against `requests.length` if you need to know which ones failed. */
	const initiateCalls = async (
		requests: Array<{ jid: string; options?: InitiateCallOptions }>
	): Promise<ActiveCall[]> => {
		const settled = await Promise.allSettled(requests.map(r => initiateCall(r.jid, r.options)))
		return settled.filter((r): r is PromiseFulfilledResult<ActiveCall> => r.status === 'fulfilled').map(r => r.value)
	}

	/** Snapshot of every call currently open on this socket. */
	const getActiveCalls = async () => Array.from(calls.values()).map(ctx => ctx.call.getSummary())

	/** Look up one specific open call by its callId. */
	const getCall = async (callId: string): Promise<ActiveCall | undefined> => calls.get(callId)?.call

	const getActiveCallCount = async (): Promise<number> => calls.size

	/** Ends one specific call by callId; a no-op if that callId isn't open. */
	const endCall = async (callId: string): Promise<void> => {
		calls.get(callId)?.call.end()
	}

	/** Ends every call currently open on this socket. */
	const endAllCalls = async (): Promise<void> => {
		for (const ctx of calls.values()) ctx.call.end()
	}

	/** Adjusts socket-level VoIP limits, e.g. `{ maxConcurrentCalls: 10 }`. */
	const setVoipOptions = async (options: VoipConfigOptions): Promise<void> => {
		if (typeof options.maxConcurrentCalls === 'number' && options.maxConcurrentCalls > 0) {
			maxConcurrentCalls = options.maxConcurrentCalls
		}
	}

	/** Tears down every open call and its isolated engine/relay (does not
	 *  touch the underlying socket — that's owned by the caller, not by VoIP). */
	const disconnectVoip = (): void => {
		for (const [callId, ctx] of calls) {
			ctx.call._forceEnd('disconnect')
			teardownCallContext(callId, ctx)
		}

		signaling = null
		signalingReadyPromise = null
		callbacksWired = false
	}

	return {
		initiateCall,
		initiateCalls,
		getActiveCalls,
		getCall,
		getActiveCallCount,
		endCall,
		endAllCalls,
		setVoipOptions,
		disconnectVoip
	}
}
