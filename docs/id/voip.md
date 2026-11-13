> Halaman ini belum diterjemahkan — isinya masih dalam bahasa Inggris.

## Unified VoIP API

Anya and Elaina call features are exposed through **one `voip` client**. No engine-selection option is required: the method you invoke automatically selects the internal signaling engine. The merged implementation in `src/Voip/` is the only VoIP source in this tree.

```ts
import makeWASocket from '@teamolduser/baileys'

const sock = makeWASocket({ auth: state })
const voip = await sock.makeVoipClient()

// Anya multi-call API
const call = await voip.initiateCall('15551234567', {
  audioSource: './audio.mp3',
  durationMs: 60_000
})
const activeCalls = await voip.getActiveCalls()

// Elaina media/group-call API is available on the same client.
// First end the previous call before switching internal signaling engines.
// const mediaCall = await voip.call('15551234567', { audioSource: './audio.mp3' })
// mediaCall.enqueue('./next-track.mp3')

// Alternative: import { makeVoipClient } and use the top-level factory:
// const socketVoip = await makeVoipClient(sock)
```

The same client exposes `initiateCall()`, `initiateCalls()`, `callMany()`, `acceptCall()`, `rejectCall()`, `call()`, `callGroup()`, `joinGroupCall()`, `getActiveCalls()`, `getCall()`, `getActiveCallCount()`, `endCall()`, `endAllCalls()`, `setOptions()`, `resetCallState()`, and `disconnect()`. The call object includes methods appropriate to the call-creation API: Anya calls expose incoming-call lifecycle and video controls; Elaina calls expose audio/video playlists and screen-sharing controls.

**Safety note:** Both original engines own WhatsApp signaling state, so they cannot safely manage active calls at the same time on one socket. The unified client switches automatically only when the previous engine has no active calls; it throws a clear error if a switch is attempted while a call is active. Do not start direct `sock.initiateCall()` calls while an Elaina media call is active. See the complete VoIP API guide.

## VoIP diagnostics and call timelines

Ported from innovatorssoft/baileys. One shared instance records a bounded per-call timeline and redacts anything that
looks like key material before it reaches a log line.

```ts
import { voipDiagnostics, VoipDiagnostics, sanitizeJid, summarizeNode } from '@teamolduser/baileys'

// one shared instance; pass your pino logger so lines go wherever the rest of your logs go
voipDiagnostics.setLogger(logger)
voipDiagnostics.setDiagnosticMode(true)   // elevates debug -> info in production

voipDiagnostics.log({
    component: 'Signaling',
    event: 'offer_received',
    callId,
    jid: peerJid,
    data: { retry: 2, enc: 'never logged' }   // enc comes out as [REDACTED]
})

// reconstruct a failed call
console.log(voipDiagnostics.formatTimeline(callId))
```

| Export | What it does |
| --- | --- |
| `voipDiagnostics` | shared `VoipDiagnostics` instance (one per process, across module copies) |
| `new VoipDiagnostics(logger, { diagnostic, logFile })` | your own instance; `logFile` is opt-in — nothing is written to disk unless you name a file |
| `CallTimelineStore` | the bounded timeline on its own (`maxEntriesPerCall`, `maxCalls`, `ttlMs`) |
| `sanitizeJid` / `summarizeAttrs` / `summarizeNode` | redaction helpers, usable in your own logging |

`CallSession` is the innovatorssoft name for the call object this package exposes as `ActiveCall`; both names are
exported from the package root.
