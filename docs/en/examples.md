# Examples

The snippets below assume `@teamolduser/baileys` is installed in an ESM project and that you have a WhatsApp account you are authorized to link.

## Text command bot skeleton

```js
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'
import pino from 'pino'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }) })
sock.ev.on('creds.update', saveCreds)

sock.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return
  for (const message of messages) {
    const content = message.message
    const text = content?.conversation ?? content?.extendedTextMessage?.text ?? ''
    if (!text || message.key.fromMe || !message.key.remoteJid) continue
    if (text.trim().toLowerCase() === 'ping') {
      await sock.sendMessage(message.key.remoteJid, { text: 'pong' })
    }
  }
})
```

This is a minimal example, not a complete production bot. Add reconnect/backoff, error handling, shutdown handling, and message deduplication as required.

## MongoDB auth with isolated sessions

```js
import makeWASocket, { useMongoAuthState2 } from '@teamolduser/baileys'

const auth = await useMongoAuthState2({
  uri: process.env.MONGODB_URI,
  dbName: 'whatsapp',
  collectionName: 'baileys_auth',
  session: process.env.BOT_SESSION ?? 'bot-1'
})
const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)
```

Use a unique `session` value for each independent bot. Keep it stable for that bot across restarts.

## Store chats and messages in memory

```ts
import makeWASocket, { makeInMemoryStore } from '@teamolduser/baileys'

const store = makeInMemoryStore({})
const sock = makeWASocket({ /* auth: state, ... */ })
store.bind(sock.ev)

// The store provides read/write helpers; see the source API for exact methods.
```

The in-memory store is not a durable database. Persist it only if your application's requirements call for it, and remember that saved messages can contain private data.

## AIRich widgets, A2UI and AIRichMessage

`assets/examples/airich_widgets.js` sends an `AIRich` message with `addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable` and `addSports`, an A2UI info card, and an `AIRichMessage`. These payloads are experimental; check them on your own account first.

```bash
node assets/examples/airich_widgets.js 6281234567890
```

## WAProto additions (offline check)

`assets/examples/waproto_additions.js` encodes and decodes the new elaina-synced WAProto fields locally and prints the default WhatsApp Web version. It does not connect to WhatsApp.

```bash
node assets/examples/waproto_additions.js
```

