# Calls in depth

Signalling only — the audio and video themselves are yours to carry.

```ts
const call = await sock.offerCall(jid, { isVideo: false })
sock.ev.on('call', async events => {
	for (const event of events) {
		if (event.status === 'offer') await sock.acceptCall(event.id, event.from)
		if (event.status === 'terminate') { /* clean up */ }
	}
})

await sock.rejectCall(callId, callFrom)
await sock.terminateCall(callId, callFrom)
```

| Method | Use |
|---|---|
| `offerCall(jid, { isVideo })` | start a call |
| `acceptCall(id, from)` | answer |
| `rejectCall(id, from)` | decline |
| `terminateCall(id, from)` | hang up |

### Group calls and screen sharing

Group calls go through the relay in `src/Socket/Client`. Screen sharing is a video call with a screen track; the
`voip.md` wiki page has the signalling sequence, and `voipDiagnostics` records timelines when you need to see what the
server actually said:

```ts
sock.voipDiagnostics.logFile = './voip-debug.log' // opt-in
```
