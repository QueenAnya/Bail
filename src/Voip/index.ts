/**
 * Unified public VoIP API.
 *
 * All Anya and Elaina methods are exposed by one client. The required internal
 * signaling engine is selected automatically by the invoked method; callers do not select an engine explicitly.
 * Original source snapshots live under repository-root
 * `Voip/` and `Voip2/` for maintainers and are not part of the published API.
 */
export { ActiveCall, MergedVoipClient, makeVoipClient } from './socket-client'
// Elaina names: the separate-session client, the audio / video feeders and the I420 format constant
export { VoipClient } from './voip-client'
export { AudioFeeder } from './audio-feeder'
export { VIDEO_FORMAT_I420, VideoFeeder } from './video-feeder'
export { CallState } from './types'
export type {
	CallOptions,
	CallEvents,
	CallRequest,
	CallSummary,
	CallStatus,
	VoipConfigOptions,
	MergedVoipClientOptions
} from './types'
