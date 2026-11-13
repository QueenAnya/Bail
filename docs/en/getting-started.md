# Getting started

## Requirements

Use a Node.js version supported by this repository's `package.json` and `engine-requirements.js`. Check your installed version with:

```bash
node --version
```

## Install

```bash
npm install @teamolduser/baileys
```

The library is ESM-first. In an application that uses `.js` files with ESM syntax, set `"type": "module"` in your application's `package.json`, or use `.mjs` files.

## Create a socket and persist credentials

```js
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@teamolduser/baileys'
import pino from 'pino'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({
  auth: state,
  logger: pino({ level: 'silent' })
})

sock.ev.on('creds.update', saveCreds)
sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
  if (connection === 'open') console.log('Connected')
  if (connection === 'close') {
    const code = lastDisconnect?.error?.output?.statusCode
    console.log('Connection closed:', code)
    if (code !== DisconnectReason.loggedOut) {
      console.log('Reconnect by creating a new socket with your reconnect policy.')
    }
  }
})
```

The snippet shows the basic lifecycle only. For production use, add a reconnect strategy with backoff, handle shutdown signals, and avoid creating multiple sockets for the same saved session.

## Important session rule

Always persist credential updates by registering `sock.ev.on('creds.update', saveCreds)`. Keep the session directory private: it contains credentials and Signal keys that can grant access to the linked account.
