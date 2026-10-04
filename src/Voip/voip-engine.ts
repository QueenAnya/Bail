/**
 * VoIP call orchestration — wires the WASM VoIP stack onto an EXISTING,
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
 *         adapted for single-session use in @teamolduser/baileys
 */
import { createHmac, randomBytes } from 'crypto'
import { EventEmitter } from 'events'
import { encodeBinaryNode } from '../WABinary/encode'
import { AudioFeeder } from './audio-feeder'
import {
	buildAcceptStanza,
	buildMuteV2Stanza,
	buildPreacceptStanza,
	buildRejectStanza,
	buildRelayLatencyStanza,
	buildTransportStanza,
	type OfferRelayEndpoint,
	parseOfferRelays
} from './incoming-call'
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

	/** true for calls received from a peer (see `call.incoming`), false for calls we placed */
	isIncoming = false
	/** `'incoming'` for received calls, `'outgoing'` for calls we placed */
	direction: 'incoming' | 'outgoing' = 'outgoing'
	/** JID that created the call (incoming calls) */
	callCreator = ''
	/** caller's phone-number JID when WhatsApp provides one (incoming calls) */
	callerPn = ''
	/** incoming calls are never queued by this engine; kept for innovatorssoft API parity */
	isWaiting = false
	/** @internal true once `accept()` was called on an incoming call */
	_accepted = false
	/** @internal wired by attachVoipToSocket for incoming calls */
	_acceptHandler: ((options: AcceptCallOptions) => Promise<ActiveCall>) | null = null
	/** @internal wired by attachVoipToSocket for incoming calls */
	_rejectHandler: ((reason?: string) => Promise<void>) | null = null
	#seenNonIdleState = false

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

	/** True while an incoming call can still be answered. */
	get canAccept(): boolean {
		return this.isIncoming && !this.#ended && !this._accepted
	}

	/**
	 * Answers an incoming call and starts streaming `audioSource` to the caller.
	 *
	 *   sock.ev.on('call.incoming', async call => {
	 *     await call.accept({ audioSource: './audio.mp3', repeatAudio: false })
	 *   })
	 */
	accept = async (options: AcceptCallOptions = {}): Promise<ActiveCall> => {
		if (!this._acceptHandler) throw new Error('Only incoming calls can be accepted')
		return this._acceptHandler(options)
	}

	/** Declines an incoming call (`reason`: `'declined'` | `'busy'` …). */
	reject = async (reason = 'declined'): Promise<void> => {
		if (!this._rejectHandler) throw new Error('Only incoming calls can be rejected')
		await this._rejectHandler(reason)
	}

	unmute = (): void => this.mute(false)

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
		videoSource: this._videoSource,
		direction: this.direction,
		callerPn: this.callerPn || undefined
	})

	/** Ends the call. `reason` defaults to `'completed'`; for `'remote_end'`
	 *  or `'rejected'` we skip re-signaling `endCall` to the WASM since the
	 *  remote side already tore it down. */
	end = (reason = 'completed'): void => {
		if (this.#ended) return
		// hanging up an incoming call that was never answered == declining it
		if (this.isIncoming && !this._accepted && this._rejectHandler) {
			void this._rejectHandler('declined')
			return
		}

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
		if (state !== CallState.Idle) this.#seenNonIdleState = true
		if (state === CallState.PreacceptReceived) this.#confirmRinging()
		else if (state === CallState.AcceptReceived) this.#confirmAccepted()
		else if (state === CallState.Active) this.#confirmConnected()
		else if (state === CallState.Idle || state === CallState.Ending) {
			// an incoming call's engine starts out Idle (it has not seen the offer yet) — that is not an end
			if (this.isIncoming && !this.#seenNonIdleState) return
			this._forceEnd('ended')
		}
	}

	/** @internal — incoming call: mark as ringing (caller's phone shows "ringing") */
	_markRinging = (): void => this.#confirmRinging()

	/** @internal — incoming call: mark as answered */
	_beginAccepted = (): void => {
		this._accepted = true
		this.#confirmAccepted()
	}

	/** @internal — incoming call: start the auto-hangup timer once answered (0 = no limit) */
	_startDurationTimer = (durationMs: number): void => {
		this._durationMs = durationMs
		if (this.#endTimer) clearTimeout(this.#endTimer)
		this.#endTimer = null
		if (durationMs > 0 && !this.#ended) {
			this.#endTimer = setTimeout(() => this.end('completed'), durationMs)
		}
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

export type AcceptCallOptions = {
	/** Audio streamed to the caller: file path to MP3/WAV, or `'silence'` (default). */
	audioSource?: string
	audio?: string
	/** Loop `audioSource` for the life of the call instead of playing it once. */
	repeatAudio?: boolean
	repeat?: boolean
	/** Video source for incoming video calls (file path, streamed via ffmpeg). */
	videoSource?: string
	video?: string
	/** Auto-hangup after N ms (default: 120000, `0` = no limit). */
	durationMs?: number
	durationMS?: number
	isMicEnabled?: boolean
	isCameraEnabled?: boolean
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
	/** incoming calls only */
	incoming?: {
		callNode: any
		callKey?: Uint8Array
		relays: OfferRelayEndpoint[]
		/** resolves once the preaccept/relaylatency stanzas have been sent (or failed) */
		ringing: Promise<void>
	}
	/** incoming calls: true once the offer has been fed to this call's engine */
	offerFed: boolean
	/** incoming calls: signaling nodes that arrived before the offer was fed (replayed after) */
	pendingNodes: any[]
}

export const attachVoipToSocket = (
	sock: BaileysSocket & { presenceSubscribe: (jid: string) => Promise<void> },
	voipConfig?: boolean | VoipConfigOptions
) => {
	let signaling: SignalingBridge | null = null
	let signalingReadyPromise: Promise<void> | null = null
	let callbacksWired = false
	let maxConcurrentCalls = Number.POSITIVE_INFINITY
	/** incoming calls are only handled when `voip` was passed in the socket config */
	let incomingEnabled = Boolean(voipConfig)
	const pendingIncoming = new Set<string>()

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
					// an incoming call whose offer has not been fed to its engine yet (still ringing) is
					// routed by `routeRingingCallNode` instead — the engine knows nothing about it yet
					if (ctx.call.isIncoming && !ctx.offerFed) continue
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
			videoPtr: 0,
			offerFed: false,
			pendingNodes: []
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
				repeatAudio,
				{
					// once a non-looping, non-silence audio source finishes playing, hang up —
					// mirrors a real call ending when the caller stops talking
					onEnd:
						!repeatAudio && audioSource !== 'silence'
							? () => {
									if (!ctx.call?.ended) ctx.call?.end('completed')
								}
							: undefined,
					durationMs: ctx.call?._durationMs
				}
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

	// ─── incoming calls ───────────────────────────────────────────────────────

	/** Answers an incoming call: feeds the offer to its engine, connects the relays, sends the
	 *  accept signaling in the order WhatsApp expects and starts the media path. */
	const acceptIncoming = async (ctx: CallContext, options: AcceptCallOptions = {}): Promise<ActiveCall> => {
		const call = ctx.call
		const incoming = ctx.incoming
		if (!incoming) throw new Error('Not an incoming call')
		if (call.ended) throw new Error(`Cannot accept call ${call.callId}: call has already ended.`)
		if (!call.canAccept) throw new Error(`Call ${call.callId} cannot be accepted in state: ${call.status}`)
		if (!incoming.callKey) {
			throw new Error(`Cannot accept call ${call.callId}: the call key could not be decrypted.`)
		}

		// mark answered right away so an `accepted_elsewhere` echo during the async setup below
		// does not end the call
		call._beginAccepted()

		call._audioSource = options.audioSource ?? options.audio ?? 'silence'
		call._repeatAudio = Boolean(options.repeatAudio ?? options.repeat ?? false)
		const videoSource = options.videoSource ?? options.video
		if (videoSource) call._videoSource = videoSource
		call._startDurationTimer(options.durationMs ?? options.durationMS ?? 120_000)

		const bridge = await ensureSignalingReady()

		// make sure the caller saw us ringing before we answer (bounded: never hang on a stuck send)
		await Promise.race([incoming.ringing, new Promise<void>(resolve => setTimeout(resolve, 3000))])

		// 1. feed the (already decrypted) offer to this call's WASM engine, then replay anything that arrived meanwhile
		await bridge.processIncomingCallAndWait(incoming.callNode, ctx.engine, call.callId)
		ctx.offerFed = true
		if (call.ended) return call
		for (const node of ctx.pendingNodes.splice(0)) {
			bridge.processIncomingCall(node, ctx.engine, call.callId)
		}

		// 2. connect to the relays announced in the offer
		try {
			ctx.relay.connectRelays(incoming.relays)
		} catch {}

		// 3. accept signaling — our raw <accept> must be the first accept the caller's phone sees
		await bridge.sendCallNode(buildMuteV2Stanza(call.callId, call.callCreator, call.peerJid))
		await bridge.sendCallNode(buildTransportStanza(call.callId, call.callCreator, call.peerJid))
		if (call.ended) return call

		let encrypted: Awaited<ReturnType<SignalingBridge['encryptCallKeyFor']>> | undefined
		for (const target of [call.peerJid, call.callCreator, call.callerPn].filter(Boolean)) {
			try {
				encrypted = await bridge.encryptCallKeyFor(target, incoming.callKey)
				if (encrypted?.encNode) break
			} catch {}
		}

		if (!encrypted?.encNode) {
			throw new Error(`Failed to encrypt accept stanza for call ${call.callId}: could not encrypt the call key.`)
		}

		const acceptStanza = buildAcceptStanza(
			call.callId,
			call.callCreator,
			call.peerJid,
			call.isVideo,
			encrypted.encNode,
			encrypted.shouldIncludeDeviceIdentity ? bridge.getDeviceIdentityNode() : undefined
		)
		const ackPromise = bridge.waitForAck(acceptStanza.attrs.id, 5000).catch(() => undefined)
		await bridge.sendCallNode(acceptStanza)

		// pipe the server's ack into the engine for faster relay confirmation
		void (async () => {
			try {
				const ack = await ackPromise
				if (!ack || call.ended) return
				const tcToken = await bridge.ensureTcToken(call.peerJid, call.callCreator)
				ctx.engine.handleSignalingAck({
					payload: Buffer.from(encodeBinaryNode(ack)).toString('base64'),
					ackError: ack.attrs?.error ?? '0',
					msgType: 'accept',
					peerJid: call.peerJid,
					extraData: tcToken
				})
			} catch {}
		})()

		if (call.ended) return call

		// 4. start the media engine only after the caller has our accept on the wire
		ctx.engine.acceptCall(options.isMicEnabled ?? true, options.isCameraEnabled ?? call.isVideo)
		return call
	}

	/** Declines an incoming call. */
	const rejectIncoming = async (ctx: CallContext, reason = 'declined'): Promise<void> => {
		const call = ctx.call
		if (call.ended) return
		try {
			const bridge = await ensureSignalingReady()
			await bridge.sendCallNode(buildRejectStanza(call.callId, call.callCreator, call.peerJid, reason))
		} catch {}

		try {
			ctx.engine.rejectCall()
		} catch {}

		call._handleRejected()
	}

	/** Handles a new `<call><offer>`: rings the caller, builds an isolated engine and emits `call.incoming`. */
	const handleIncomingOffer = async (node: any, offer: any): Promise<void> => {
		const callId = String(offer.attrs?.['call-id'] ?? offer.attrs?.call_id ?? '')
		if (!callId || calls.has(callId) || pendingIncoming.has(callId)) return
		pendingIncoming.add(callId)

		try {
			// ignore stale offers replayed from the offline queue
			const sentAt = Number(offer.attrs?.t ?? node.attrs?.t ?? 0)
			if (sentAt && Date.now() / 1000 - sentAt > 90) return

			const callerJid = String(node.attrs?.from ?? '')
			if (!callerJid) return
			const callCreator = String(offer.attrs?.['call-creator'] ?? callerJid)
			const callerPn = String(offer.attrs?.caller_pn ?? '')
			const offerChildren: any[] = Array.isArray(offer.content) ? offer.content : []
			const isVideo = offerChildren.some(c => c?.tag === 'video')

			const bridge = await ensureSignalingReady()

			if (calls.size >= maxConcurrentCalls) {
				await bridge.sendCallNode(buildRejectStanza(callId, callCreator, callerJid, 'busy')).catch(() => {})
				return
			}

			const { relays, participantJids } = parseOfferRelays(node)
			const callKey = await bridge.decryptIncomingOfferKey(node, callerJid)

			// tell the caller's phone we are ringing — sent in the background so a slow/blocked send never
			// delays building the call; accept waits for it (see `incoming.ringing`)
			const ringing = (async () => {
				try {
					await bridge.sendCallNode(buildPreacceptStanza(callId, callCreator, callerJid, isVideo))
				} catch {}

				if (relays.length) {
					try {
						await bridge.sendCallNode(
							buildRelayLatencyStanza(callId, callCreator, toBareJid(callerJid), relays, participantJids)
						)
					} catch {}
				}
			})()

			const ctx = await createCallContext(callId)
			const call = new ActiveCall(callId, callerJid, ctx.engine, 0, callerPn || callerJid, 0)
			call.isIncoming = true
			call.direction = 'incoming'
			call.callCreator = callCreator
			call.callerPn = callerPn
			call.isVideo = isVideo
			call._acceptHandler = options => acceptIncoming(ctx, options)
			call._rejectHandler = reason => rejectIncoming(ctx, reason)

			ctx.call = call
			ctx.incoming = { callNode: node, callKey, relays, ringing }
			calls.set(callId, ctx)

			// nobody answered: stop ringing after 90s (the caller normally hangs up first)
			const ringTimer = setTimeout(() => {
				if (call.canAccept) void rejectIncoming(ctx, 'timeout')
			}, 90_000)
			call.once('ended', () => {
				clearTimeout(ringTimer)
				teardownCallContext(callId, ctx)
			})

			call._markRinging()
			sock.ev.emit('call.incoming', call)
		} finally {
			pendingIncoming.delete(callId)
		}
	}

	/** Routes call stanzas for an incoming call that is still ringing (engine has not seen the offer). */
	const routeRingingCallNode = (node: any, child: any): boolean => {
		const callId = String(child?.attrs?.['call-id'] ?? child?.attrs?.call_id ?? '')
		const ctx = callId ? calls.get(callId) : undefined
		if (!ctx || !ctx.call?.isIncoming || ctx.offerFed) return false

		if (child.tag === 'terminate' || child.tag === 'reject') {
			const reasonChild = Array.isArray(child.content) ? child.content.find((c: any) => c?.tag === 'reason') : undefined
			ctx.call._handleSignalingEvent(
				child.tag,
				String(child.attrs?.reason ?? reasonChild?.attrs?.text ?? reasonChild?.attrs?.type ?? '')
			)
		} else if (child.tag !== 'offer' && ctx.pendingNodes.length < 50) {
			ctx.pendingNodes.push(node)
		}

		return true
	}

	// Lightweight raw listener: only does anything for offers (when incoming calls are enabled) and for
	// stanzas of an incoming call that is still ringing. Does not start the WASM stack by itself.
	sock.ws.on('CB:call', (node: any) => {
		const child = Array.isArray(node?.content) ? node.content[0] : undefined
		if (!child) return
		if (child.tag === 'offer') {
			if (incomingEnabled) void handleIncomingOffer(node, child).catch(() => {})
			return
		}

		routeRingingCallNode(node, child)
	})

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

		incomingEnabled = true
	}

	/**
	 * Snapshot of VoIP subsystem + process memory, shaped like the
	 * `@innovatorssoft/baileys` `getVoipMemoryStats()` result so the same
	 * `!voipstats` / `!callinfo` example code works unchanged.
	 *
	 * Only values this engine can genuinely observe are filled in. Anya runs
	 * one isolated engine per call, so `activeWorkers`/`activeRelayConnections`
	 * equal the number of open calls; there is no ffmpeg pool or shared
	 * compiled-module cache, so those report 0.
	 */
	const getVoipMemoryStats = async () => {
		const mem = process.memoryUsage()
		const toMb = (bytes: number) => Math.round(bytes / 1024 / 1024)
		const activeCalls = calls.size
		return {
			process: {
				rssMb: toMb(mem.rss),
				heapUsedMb: toMb(mem.heapUsed),
				heapTotalMb: toMb(mem.heapTotal),
				externalMb: toMb(mem.external)
			},
			calls: { activeCalls, maxConcurrentCalls: Number.isFinite(maxConcurrentCalls) ? maxConcurrentCalls : null },
			resourceManager: {
				activeWorkers: activeCalls,
				activeRelayConnections: activeCalls,
				activeFfmpegProcesses: 0,
				compiledModulesCached: 0
			}
		}
	}

	/**
	 * Lightweight VoIP client facade (`sock.getVoipClient()`), mirroring the
	 * `@innovatorssoft/baileys` shape used by its example: a live `calls` map
	 * (callId → call) plus the same call-control helpers. Calls here are
	 * outbound-only — see `getVoipMemoryStats` note above.
	 */
	const getVoipClient = async () => ({
		get calls(): Map<string, ActiveCall> {
			return new Map(Array.from(calls, ([id, ctx]) => [id, ctx.call]))
		},
		getCall: (callId: string) => calls.get(callId)?.call,
		getActiveCalls,
		getActiveCallCount,
		endCall,
		endAllCalls,
		setOptions: setVoipOptions,
		getMemoryStats: getVoipMemoryStats
	})

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

	if (voipConfig && typeof voipConfig === 'object') void setVoipOptions(voipConfig)

	return {
		initiateCall,
		initiateCalls,
		getActiveCalls,
		getCall,
		getActiveCallCount,
		endCall,
		endAllCalls,
		setVoipOptions,
		getVoipMemoryStats,
		getVoipClient,
		disconnectVoip
	}
}
