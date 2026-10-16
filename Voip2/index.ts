/**
 * Elaina Baileys VoIP engine, ported separately as Voip2.
 * The original Anya engine remains under src/Voip and its existing exports.
 *
 * These aliases intentionally avoid colliding with Anya's existing VoIP names.
 */
export {
  ActiveCall as ActiveCall2,
  ActiveCall as ElainaActiveCall,
  CallState as CallState2,
  CallState as ElainaCallState,
  VoipClient as VoipClient2,
  VoipClient as ElainaVoipClient,
  makeVoipClient as makeVoipClient2,
} from './client.js'
export { AudioFeeder as AudioFeeder2, AudioFeeder as ElainaAudioFeeder } from './audio-feeder.js'
export {
  VideoFeeder as VideoFeeder2,
  VideoFeeder as ElainaVideoFeeder,
  VIDEO_FORMAT_I420 as VIDEO_FORMAT_I420_2,
} from './video-feeder.js'
