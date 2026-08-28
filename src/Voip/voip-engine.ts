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
import { CallState } from './types'
import { WasmEngine } from './wasm-engine'

export type { VoipSdkConfig, CallOptions, CallEvents, AudioConfig } from './types'
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

/** A live or recently-ended call. */
export class ActiveCall extends EventEmitter {
	#state: CallState = CallState.Idle
	#endResolver!: (reason: string) => void
	readonly #endPromise: Promise<string>
	#endTimer: ReturnType<typeof setTimeout> | null = null
	#ended = false

	/** @internal mirrors the source path for the audio feeder */
	_audioSource = 'silence'

	constructor(
		public readonly callId: string,
		private readonly engine: WasmEngine,
		durationMs: number
	) {
		super()
		this.#endPromise = new Promise(res => {
			this.#endResolver = res
		})
		if (durationMs > 0) {
			this.#endTimer = setTimeout(() => this.end(), durationMs)
		}
	}

	get state(): CallState {
		return this.#state
	}

	end = (): void => {
		if (this.#ended) return
		this.#ended = true
		if (this.#endTimer) {
			clearTimeout(this.#endTimer)
			this.#endTimer = null
		}

		try {
			this.engine.endCall(0, true)
		} catch {}
	}

	mute = (muted: boolean): void => {
		try {
			this.engine.setMute(muted)
		} catch {}
	}

	waitForEnd = (): Promise<string> => this.#endPromise

	/** @internal — called by the engine wiring below on WASM call-state change */
	_updateState = (state: number): void => {
		this.#state = state as CallState
		if (state === CallState.PreacceptReceived) this.emit('ringing')
		else if (state === CallState.Active) this.emit('connected')
		else if (state === CallState.Idle || state === CallState.Ending) {
			this._forceEnd('ended')
		}
	}

	/** @internal */
	_emitAudio = (pcm: Float32Array): void => {
		this.emit('audio', pcm)
	}

	/** @internal */
	_forceEnd = (reason: string): void => {
		if (this.#ended) return
		this.#ended = true
		if (this.#endTimer) {
			clearTimeout(this.#endTimer)
			this.#endTimer = null
		}

		this.emit('ended', reason)
		this.#endResolver(reason)
	}
}

export type InitiateCallOptions = {
	/** Audio source: file path to MP3/WAV, or 'silence' for an empty uplink. */
	audioSource?: string
	/** Auto-hangup after N ms (default: 120000). */
	durationMs?: number
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
export const attachVoipToSocket = (sock: BaileysSocket & { presenceSubscribe: (jid: string) => Promise<void> }) => {
	let engine: WasmEngine | null = null
	let relay: RelayRtcTransport | null = null
	let signaling: SignalingBridge | null = null
	let activeCall: ActiveCall | null = null
	let readyPromise: Promise<void> | null = null

	// Audio-capture state populated when WASM negotiates audio params
	let capturePtr = 0
	let captureChunkBytes = 0
	let captureSampleRate = 16000
	let captureChannels = 1
	let captureFramesPerChunk = 320
	let feeder: AudioFeeder | null = null

	const handleCallEvent = (eventType: number, eventData?: string): void => {
		if (eventType === 16 && eventData) {
			try {
				const parsed = JSON.parse(eventData)
				const info = parsed.call_info ?? parsed.callInfo ?? {}
				const callState = Number(info.call_state ?? info.callState ?? 0)
				activeCall?._updateState(callState)
			} catch {}
		} else if (eventType === 156 && eventData) {
			try {
				const update = JSON.parse(eventData) as RelayListUpdatePayload
				relay?.updateRelayList(update)
			} catch {}
		} else if (eventType === 2) {
			activeCall?._forceEnd('remote_end')
		}
	}

	const handleAudioCaptureInit = (config: {
		sampleRate: number
		channels: number
		bitsPerSample: number
		framesPerChunk: number
	}): void => {
		if (!engine) return
		captureSampleRate = config.sampleRate || 16000
		captureChannels = config.channels || 1
		captureFramesPerChunk = config.framesPerChunk || 320
		const chunkSamples = captureFramesPerChunk * captureChannels
		captureChunkBytes = chunkSamples * Float32Array.BYTES_PER_ELEMENT
		capturePtr = engine.malloc(captureChunkBytes)
	}

	const handleAudioCaptureStart = (): void => {
		if (!engine || !capturePtr) return
		const audioSource = activeCall?._audioSource ?? 'silence'
		feeder = new AudioFeeder(
			captureSampleRate,
			captureChannels,
			captureFramesPerChunk,
			chunk => {
				if (engine && capturePtr) engine.sendAudioData(chunk, capturePtr)
			},
			audioSource
		)
		feeder.start()
	}

	const handleAudioCaptureStop = (): void => {
		feeder?.stop()
		feeder = null
		if (engine && capturePtr) {
			try {
				engine.free(capturePtr)
			} catch {}

			capturePtr = 0
		}
	}

	/** Lazily bring up the WASM engine + signaling bridge on first use. */
	const ensureReady = async (): Promise<void> => {
		if (readyPromise) return readyPromise

		readyPromise = (async () => {
			signaling = new SignalingBridge({ sock })
			await signaling.init()

			relay = new RelayRtcTransport({
				onTransportMessage: (data, ip, port) => engine?.handleOnTransportMessage(data, ip, port),
				onIceRtt: (rttMs, ip, port) => engine?.updateIceRtt(rttMs, ip, port)
			})

			engine = new WasmEngine({
				callbacks: {
					onSignalingXmpp: (peerJid, callId, xmlPayload) => signaling!.sendSignaling(peerJid, callId, xmlPayload),
					onCallEvent: (eventType, eventData) => handleCallEvent(eventType, eventData),
					sendDataToRelay: (data, ip, port) => relay!.send(data, ip, port),
					onAudioCaptureInit: config => handleAudioCaptureInit(config),
					onAudioCaptureStart: () => handleAudioCaptureStart(),
					onAudioCaptureStop: () => handleAudioCaptureStop(),
					onAudioPlaybackData: audioData => activeCall?._emitAudio(audioData),
					cryptoHkdf: computeHkdf,
					hmacSha256: computeHmacSha256
				}
			})

			await engine.initialize()
			signaling.attachEngine(engine)

			const selfPnJid = sock.authState.creds.me?.id
			const selfLidJid = sock.authState.creds.me?.lid
			engine.initVoipStack(selfPnJid, toBareJid(selfPnJid), selfLidJid)
			await engine.waitForVoipStackReady()
			try {
				engine.updateNetworkMedium(2, 0)
			} catch {}

			sock.ws.on('CB:call', (node: any) => {
				signaling!.processIncomingCall(node, engine!, activeCall?.callId ?? '')
			})
			sock.ws.on('CB:receipt', (node: any) => {
				if (!isCallReceiptNode(node)) return
				signaling!.processIncomingReceipt(node, engine!, activeCall?.callId ?? '')
			})
		})()

		return readyPromise
	}

	/** Places an outbound voice call. Accepts either a bare phone number
	 *  ("12345678901") or an already-formed JID ("12345678901@s.whatsapp.net"). */
	const initiateCall = async (jidOrPhoneNumber: string, opts: InitiateCallOptions = {}): Promise<ActiveCall> => {
		await ensureReady()
		if (!engine || !signaling) throw new Error('VoIP engine failed to initialize')
		if (activeCall) throw new Error('A call is already active on this socket.')

		const targetPnJid = jidOrPhoneNumber.includes('@')
			? toBareJid(jidOrPhoneNumber)
			: `${jidOrPhoneNumber.replace(/\D/g, '')}@s.whatsapp.net`
		const durationMs = opts.durationMs ?? 120_000
		const audioSource = opts.audioSource ?? 'silence'

		const peerLid = await signaling.resolveLid(targetPnJid)
		if (!peerLid) throw new Error(`Could not resolve LID for ${targetPnJid}`)

		for (const jid of [targetPnJid, peerLid]) {
			try {
				await sock.presenceSubscribe(jid)
			} catch {}
		}

		await new Promise(r => setTimeout(r, 750))

		const peerDeviceJids = await signaling.discoverPeerDevices(peerLid)
		const deviceList = peerDeviceJids.length ? peerDeviceJids : [toBareJid(peerLid)]

		await signaling.ensureSessionsForPeers(deviceList)

		await new Promise(r => setTimeout(r, 500))
		await signaling.issueTcToken(peerLid)
		const tcToken = await signaling.ensureTcToken(peerLid, targetPnJid)

		const callId = ('00' + randomBytes(16).toString('hex').slice(2)).toUpperCase()

		const call = new ActiveCall(callId, engine, durationMs)
		call._audioSource = audioSource
		activeCall = call

		engine.startCall({
			peerJid: peerLid,
			peerPn: targetPnJid,
			peerList: deviceList,
			callId,
			isVideo: false,
			isLidCall: true,
			isFromDialer: false,
			extraData: tcToken
		})

		// Clear activeCall once this call ends, so a subsequent initiateCall()
		// isn't blocked by the "already active" guard above.
		call.once('ended', () => {
			if (activeCall === call) activeCall = null
		})

		return call
	}

	/** Tears down the VoIP engine (does not touch the underlying socket —
	 *  that's owned by the caller, not by VoIP). */
	const disconnectVoip = (): void => {
		activeCall?._forceEnd('disconnect')
		activeCall = null
		void relay?.closeAll()
		engine?.destroy()
		engine = null
		relay = null
		signaling = null
		readyPromise = null
	}

	return { initiateCall, disconnectVoip }
}
