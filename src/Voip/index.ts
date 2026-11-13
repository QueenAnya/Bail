/**
 * Unified public VoIP API.
 *
 * All Anya and Elaina methods are exposed by one client. The required internal
 * signaling engine is selected automatically by the invoked method; callers do not select an engine explicitly.
 * Original source snapshots live under repository-root
 * were dropped from this tree; this module is the merged Anya + Elaina implementation.
 */
export { ActiveCall, MergedVoipClient, makeVoipClient } from './socket-client'
// Elaina names: the separate-session client, the audio / video feeders and the I420 format constant
export { VoipClient } from './voip-client'
export { AudioFeeder } from './audio-feeder'
export { PlaylistAudioFeeder } from './playlist-feeder'
export type { PlaylistFeederHooks, PlaylistFeederOptions } from './playlist-feeder'
export { VIDEO_FORMAT_I420, VideoFeeder } from './video-feeder'
export { CallState } from './types'
// structured logging, per-call timeline, and log redaction (innovatorssoft/baileys)
export {
	CallTimelineStore,
	VoipDiagnostics,
	voipDiagnostics,
	sanitizeJid,
	summarizeAttrs,
	summarizeNode
} from './diagnostics'
export type { TimelineEntry, VoipDiagnosticsOptions, VoipLogInput, NodeSummary } from './diagnostics'
export type {
	CallOptions,
	CallEvents,
	CallRequest,
	CallSummary,
	CallStatus,
	VoipConfigOptions,
	MergedVoipClientOptions
} from './types'
