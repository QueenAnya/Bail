# Pairing code

A pairing code links the WhatsApp account without scanning a QR code. Create the socket with an auth state first, then request a code only when the saved credentials are not already registered.

```js
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

if (!state.creds.registered) {
  const code = await sock.requestPairingCode('14155550123')
  console.log('Enter this pairing code in WhatsApp:', code)
}
```

Pass the phone number in international format: country calling code followed by the national number, using digits only. Do not include a local trunk prefix or punctuation. Replace the example number with the account's actual number.

Pairing requests can be rate-limited or rejected by WhatsApp. Handle errors and avoid repeatedly requesting new codes in a tight loop. Follow the current WhatsApp app flow shown on the device to complete linking.
