/**
 * addon: voip-calling
 * Wraps the third-party `baileys-caller` SDK (https://github.com/SheIITear/baileys-caller,
 * MIT licensed, by ShellTear) for placing WhatsApp voice calls.
 *
 * ── IMPORTANT: this runs on a SEPARATE WhatsApp session ──────────────────────
 * `baileys-caller`'s `VoipClient` creates its OWN internal `@whiskeysockets/baileys`
 * connection (its own `useMultiFileAuthState`, its own `makeWASocket`, its own QR
 * scan). It does NOT attach to — and cannot share auth/session state with — your
 * main queenanya bot socket. If you want both a regular bot AND voice calling,
 * you need two separate linked-device sessions: one for the bot (this package),
 * one dedicated to VoIP (a second QR scan, second `authDir`).
 *
 * ── Setup (not installed by default) ─────────────────────────────────────────
 * `baileys-caller` isn't published on npm; install it via git URL, along with
 * its own peer dependency on the upstream `@whiskeysockets/baileys` package
 * (a different install from this `@queenanya/baileys` package — they coexist
 * independently in node_modules under different names):
 *
 *   npm install git+https://github.com/SheIITear/baileys-caller.git @whiskeysockets/baileys
 *
 * `baileys-caller` has no `prepare`/`postinstall` script, so after installing
 * you must build it and fetch its WASM assets manually:
 *
 *   cd node_modules/baileys-caller
 *   npm install
 *   npm run build
 *   npm run fetch-wasm
 *
 * It also depends on `@roamhq/wrtc` (native WebRTC bindings) — this compiles
 * a native addon on install; make sure your build toolchain is available.
 *
 * ── Usage ─────────────────────────────────────────────────────────────────────
 *   import { createVoipClient } from '@queenanya/baileys'
 *
 *   const voip = await createVoipClient({ authDir: './voip_auth' })
 *   const call = await voip.call('12345678901', { audioSource: './hello.mp3' })
 *   call.on('connected', () => console.log('call connected'))
 *   call.on('ended', reason => console.log('call ended:', reason))
 */

/** Options for placing a call. Mirrors baileys-caller's CallOptions. */
export type VoipCallOptions = {
	/** Audio source: file path to MP3/WAV, or 'silence' for an empty uplink. */
	audioSource?: string
	/** Auto-hangup after N ms (default: 120000). */
	durationMs?: number
}

/** Events emitted by an active call. */
export interface VoipCallEvents {
	ringing: () => void
	connected: () => void
	/** 16 kHz mono Float32 PCM frame from the remote peer. */
	audio: (pcm: Float32Array) => void
	/** Reason: 'hangup' | 'timeout' | 'rejected' | 'remote_end' | 'disconnect' | etc. */
	ended: (reason: string) => void
	error: (err: Error) => void
}

/** A live or recently-ended call. Thin structural type over baileys-caller's ActiveCall. */
export interface VoipActiveCall {
	readonly callId: string
	readonly state: number
	end(): void
	mute(muted: boolean): void
	waitForEnd(): Promise<string>
	on<E extends keyof VoipCallEvents>(event: E, listener: VoipCallEvents[E]): this
	once<E extends keyof VoipCallEvents>(event: E, listener: VoipCallEvents[E]): this
}

/** Config for connecting the dedicated VoIP session. */
export type VoipClientConfig = {
	/** Path to a Baileys multi-file auth state directory — must be separate
	 *  from your main bot's auth directory; this is an independent session. */
	authDir: string
}

/** Structural surface of baileys-caller's VoipClient we actually use. */
export interface VoipClient {
	connect(): Promise<void>
	call(phoneNumber: string, opts?: VoipCallOptions): Promise<VoipActiveCall>
	disconnect(): void
}

/**
 * Creates and connects a dedicated VoIP session via `baileys-caller`.
 *
 * Throws a clear error if `baileys-caller` isn't installed — it's an optional
 * peer dependency, not bundled with this package (see file header for setup).
 *
 * @example
 * const voip = await createVoipClient({ authDir: './voip_auth' })
 * const call = await voip.call('12345678901', { audioSource: './hello.mp3' })
 */
export const createVoipClient = async (config: VoipClientConfig): Promise<VoipClient> => {
	let mod: { VoipClient: new (config: VoipClientConfig) => VoipClient }
	try {
		// Dynamic import: baileys-caller is an optional dependency the user
		// installs separately (see setup instructions above) — importing it
		// statically would make it a hard dependency of this whole package.
		mod = (await import('baileys-caller')) as unknown as typeof mod
	} catch {
		throw new Error(
			'baileys-caller is not installed. Install it with:\n' +
				'  npm install git+https://github.com/SheIITear/baileys-caller.git @whiskeysockets/baileys\n' +
				'then build it (it has no install-time build step):\n' +
				'  cd node_modules/baileys-caller && npm install && npm run build && npm run fetch-wasm'
		)
	}

	const client = new mod.VoipClient(config)
	await client.connect()
	return client
}
