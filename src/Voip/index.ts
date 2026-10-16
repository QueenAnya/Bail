/**
 * Unified public VoIP API.
 *
 * All Anya and Elaina methods are exposed by one client. The required internal
 * signaling engine is selected automatically by the invoked method; callers do not select an engine explicitly.
 * Original source snapshots live under repository-root
 * `Voip/` and `Voip2/` for maintainers and are not part of the published API.
 */
export { MergedVoipClient, makeVoipClient } from './socket-client'
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
