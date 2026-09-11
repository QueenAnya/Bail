/**
 * addon: voip-calling
 * Standalone WhatsApp voice calling on a SEPARATE, dedicated session.
 *
 * ── IMPORTANT: this runs on a SEPARATE WhatsApp session ──────────────────────
 * `createVoipClient()` creates its OWN independent connection (its own
 * `useMultiFileAuthState`, its own socket, its own QR scan). It does NOT
 * attach to — and cannot share auth/session state with — your main bot
 * socket. If you want both a regular bot AND voice calling, you need two
 * separate linked-device sessions: one for the bot (this package, as
 * normal), one dedicated to VoIP (a second QR scan, second `authDir`).
 *
 * For the common case — placing calls from your EXISTING bot connection —
 * use `sock.initiateCall(jid, opts)` instead. Every socket created via the
 * standard `makeWASocket()` factory already has it wired in (see
 * `Socket/username.ts` → `Voip/voip-engine.ts`); no separate session, no
 * separate QR scan needed.
 *
 * ── Origin ─────────────────────────────────────────────────────────────────
 * Originally wrapped the third-party `baileys-caller` SDK
 * (https://github.com/SheIITear/baileys-caller, MIT, by ShellTear) as an
 * external, separately-installed dependency. It's now this fork's own
 * vendored TypeScript port (`Voip/voip-client.ts`, reusing the same
 * WASM/signaling/relay/audio engine as `sock.initiateCall()`) — no external
 * package, no separate build step, no extra peer
 * dependency required.
 *
 * ── Usage ─────────────────────────────────────────────────────────────────────
 *   import { createVoipClient } from '@queenanya/baileys'
 *
 *   const voip = await createVoipClient({ authDir: './voip_auth' })
 *   const call = await voip.call('12345678901', { audioSource: './hello.mp3' })
 *   call.on('connected', () => console.log('call connected'))
 *   call.on('ended', reason => console.log('call ended:', reason))
 */
export { createVoipClient, VoipClient, CallState } from '../Voip/voip-client'
export type { ActiveCall, AudioConfig, CallEvents, CallOptions, VoipSdkConfig } from '../Voip/voip-client'

/** @deprecated Use `VoipSdkConfig` instead — kept as an alias for anything
 *  that imported the old external-wrapper type name. */
export type { VoipSdkConfig as VoipClientConfig } from '../Voip/voip-client'

/** @deprecated Use `CallOptions` instead — kept as an alias for anything
 *  that imported the old external-wrapper type name. */
export type { CallOptions as VoipCallOptions } from '../Voip/voip-client'

/** @deprecated Use `CallEvents` instead — kept as an alias for anything
 *  that imported the old external-wrapper type name. */
export type { CallEvents as VoipCallEvents } from '../Voip/voip-client'

/** @deprecated Use `ActiveCall` instead — kept as an alias for anything
 *  that imported the old external-wrapper type name. */
export type { ActiveCall as VoipActiveCall } from '../Voip/voip-client'
