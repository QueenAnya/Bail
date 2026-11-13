# Pairing code

Instead of scanning a QR code you can pair with an 8-character code. The flow is: open the socket, wait for the
`pair-device` stanza, then ask for the code with the phone number in international format (digits only).

```ts
const sock = makeWASocket({ auth: state, printQRInTerminal: false })

if (!sock.authState.creds.registered) {
	const phoneNumber = '919876543210' // country code + number, no +, no spaces
	const code = await sock.requestPairingCode(phoneNumber)
	console.log('enter on the phone:', code) // e.g. 'ABCD-1234'
}
```

### The request is confirmed by the server

`requestPairingCode` does not invent the code locally — it sends an IQ and the server answers with the code. If you call
it before the socket has received `pair-device`, the IQ fails with a 404 or times out. That is what
`createPairingQueue` in `src/Addons/pairing-fix.ts` exists for: it queues the call until the socket is actually ready.

```ts
import { createPairingQueue } from '@teamolduser/baileys'

const pq = createPairingQueue(sendPairingIQ) // sendPairingIQ is the raw IQ sender
// in the pair-device handler:
pq.setReady()
// in the connection-close handler:
pq.clear()

const code = await pq.requestPairingCode('919876543210')
```

### One code at a time

A pairing code is valid for one attempt. Requesting a second code while the first is still pending returns `409` from
the server, and the phone shows nothing. Wait for the attempt to finish — success, failure, or the code expiring —
before asking again.

### A custom code

The second argument lets you choose the code, which is handy for testing. It still has to be accepted by the server, so
stick to the same alphabet the default uses (uppercase letters and digits, eight characters):

```ts
const code = await sock.requestPairingCode('919876543210', 'ANYA1234')
```

### Checking pairing without touching the running bot

Pairing mutates the credentials file, so never pair against the same auth folder a live bot is using. Copy the folder
first, pair on the copy, and inspect the result:

```bash
cp -r ./auth ./auth-check
# point a throwaway script at ./auth-check, pair, then read auth-check/creds.json
```

`node scripts/live-check.mjs --check 1` does exactly this — it pairs a copy and reports what came back.
