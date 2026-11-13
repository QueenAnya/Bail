# Presence and read receipts

```ts
await sock.sendPresenceUpdate('composing', jid)   // typing…
await sock.sendPresenceUpdate('paused', jid)      // stopped
await sock.sendPresenceUpdate('available')        // online
await sock.sendPresenceUpdate('unavailable')      // offline

await sock.presenceSubscribe(jid)                 // ask for their presence
await sock.readMessages([msg.key])                // blue ticks
```

Presence arrives as events:

```ts
sock.ev.on('presence.update', ({ id, presences }) => {
	const state = presences[id]?.lastKnownPresence // 'available' | 'composing' | 'unavailable' | …
})
```

### Checking a number

```ts
const [result] = await sock.onWhatsApp('919876543210')
// { jid, exists: true } or { exists: false }
```

This is the only supported way to test whether a number is on WhatsApp. Building a jid and sending to it works for
numbers that are registered, but fails silently otherwise.

### Read receipts

`sock.readMessages` only accepts messages you actually received. Calling it with a key you sent is a no-op, which is why
"my bot does not mark chats read" usually means the key came from the wrong place.
