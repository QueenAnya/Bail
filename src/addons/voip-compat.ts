/**
 * VoIP compatibility layer for @innovatorssoft/baileys naming.
 *
 * Everything here sits on top of this fork's own socket-integrated VoIP engine
 * (`sock.initiateCall()`, see `addons/voip-calling.ts`) — nothing here starts a second engine.
 *
 *  - `CallDirection`, `CallMediaType`  — string-literal constants
 *  - `CallSession`                      — alias of `ActiveCall` (innovatorssoft exports it under both names)
 *  - `CallManager`                      — concurrency limit + `onLimit: 'queue'` waiting queue
 *  - `VoipResourceManager`, `resolvePthreadPoolSize` — counters, WASM module cache, memory stats
 *  - `ensureWasmAssets`                 — copy/verify the bundled WASM assets
 */
export { CallManager } from '../Voip/call-manager'
export type { CallManagerConfig, CallManagerSocket, WaitingCallSummary } from '../Voip/call-manager'
export { resolvePthreadPoolSize, VoipResourceManager } from '../Voip/resource-manager'
export type { VoipMemoryStatsInput } from '../Voip/resource-manager'
export { CallDirection, CallMediaType } from '../Voip/types'
export { ensureWasmAssets } from '../Voip/wasm-assets'
export { ActiveCall as CallSession } from '../Voip/voip-engine'
