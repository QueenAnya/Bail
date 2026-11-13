# Framework

`src/Framework` is a small, optional layer on top of the socket: a bot loop, per-chat session storage, media helpers and
group statistics. It is plain TypeScript, uses only `better-sqlite3` (already a dependency), and nothing in it is
required to use the socket itself.

```ts
import { Bot, MediaManager, SessionManager, SQLiteStore, StatsManager } from '@teamolduser/baileys'
```

## `SQLiteStore`

The key/value store the other pieces sit on. Synchronous, because `better-sqlite3` is.

```ts
const store = new SQLiteStore('./bot.db')

store.set('greeting', { text: 'hi' })   // values are JSON.stringify'd
store.get('greeting')                   // { text: 'hi' } | undefined
store.has('greeting')                   // boolean
store.del('greeting')
store.close()
```

| Method | Notes |
|---|---|
| `constructor(dbPath)` | opens or creates the file |
| `set(key, value)` | always JSON — a raw string that happens to be valid JSON round-trips correctly |
| `get(key)` | parsed value, or `undefined` |
| `has(key)` | `true` when a value exists |
| `del(key)` | removes one key |
| `close()` | closes the database |

## `SessionManager`

Per-chat session state on top of `SQLiteStore` — one row per jid, with a read-modify-write helper.

```ts
const sessions = new SessionManager(store)

sessions.set('919876543210@s.whatsapp.net', { step: 'awaiting-name' })
sessions.get('919876543210@s.whatsapp.net')            // { step: 'awaiting-name' }

sessions.update(jid, prev => ({ ...prev, step: 'done' }))  // updater gets the previous value
sessions.has(jid)                                       // boolean
sessions.delete(jid)
```

Keys are stored as `session_<jid>`, so a `SessionManager` and your own `SQLiteStore` keys never collide.

## `MediaManager`

Static helpers for the two conversions WhatsApp is picky about.

```ts
// image or video buffer -> WebP sticker, with optional pack metadata
const sticker = await MediaManager.convertToSticker(buffer, {
	packname: 'Anya',
	author: 'Teamolduser'
})

// audio buffer/path -> a voice note the client will render as PTT
const voice = await MediaManager.convertToVoiceNote(inputPathOrBuffer)
```

Both write to a temp file and shell out to `ffmpeg` when the format needs it, so `ffmpeg` must be on `PATH` for the
video/audio paths. Images that `sharp` can handle skip the subprocess.

## `StatsManager`

Group activity counters, for leaderboards and quiet-member reports.

```ts
const stats = new StatsManager('./bot.db', jid => sock.groupMetadata(jid))

stats.observeMessage(groupJid, userJid, isSticker)   // call from messages.upsert
stats.getTopUsers(groupJid, 10)                      // [{ id, count }]
stats.getTopStickers(groupJid, 10)
await stats.getGhosts(groupJid, connected, 30)       // members quiet for 30 days
stats.close()
```

`getGhosts` reads the participant list through the `groupMetaFn` you pass in, so it always works against current
membership rather than a stale cache.

## `Bot`

A ready-made loop: connect, reconnect on disconnect, pair on first run, and expose the socket.

```ts
import { Bot } from '@teamolduser/baileys'

const bot = new Bot({
	authFolder: './auth',
	phoneNumber: '919876543210',   // used only when the session is not registered yet
	logger: pino({ level: 'warn' })
})

bot.on('messages.upsert', ({ messages }) => {
	for (const msg of messages) console.log(msg.key.remoteJid)
})

await bot.start()
```

It owns the reconnect timer and the pairing flow, which is the part most bots get wrong: it waits for the socket to be
ready before requesting a pairing code, and it backs off between reconnect attempts instead of hot-looping.

## `Context`

A thin wrapper passed to handlers: the socket, the message, and the parsed sender/chat ids — so a handler does not have
to re-derive `remoteJid` and `participant` every time.

```ts
bot.on('messages.upsert', async ({ messages }) => {
	for (const msg of messages) {
		const ctx = Context.from(sock, msg)
		console.log(ctx.chat, ctx.sender, ctx.text)
	}
})
```

## Example

`src/Framework/bot-example.ts` is a runnable bot using all of the above. Copy it, point `authFolder` somewhere, and
`node dist/Framework/bot-example.js`.
