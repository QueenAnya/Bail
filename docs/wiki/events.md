# Event reference

Every event the socket emits, with the payload shape. `sock.ev.on(name, handler)` — the handler gets one object.

### Connection and credentials

| Event | Payload | Fires when |
|---|---|---|
| `connection.update` | `{ connection, lastDisconnect, isNewLogin, qr, receivedPendingNotifications }` | the socket connects, reconnects, or drops |
| `creds.update` | — | the credentials changed and should be saved (`saveCreds`) |
| `messaging-history.set` | `{ chats, contacts, messages, isLatest, progress, syncType }` | history arrives after a fresh pair |
| `messaging-history.status` | `{ syncType, progress }` | progress of the history sync |
| `lid-mapping.update` | `{ mappings }` | a new lid ↔ phone-number mapping is learned |

```ts
sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
	if (qr) console.log('scan this:', qr)
	if (connection === 'open') console.log('connected as', sock.user?.id)
	if (connection === 'close') {
		const code = (lastDisconnect?.error as Boom)?.output?.statusCode
		if (code !== DisconnectReason.loggedOut) reconnect()
	}
})
```

### Messages

| Event | Payload |
|---|---|
| `messages.upsert` | `{ messages, type }` — `type` is `'notify'` for live messages, `'append'` for history |
| `messages.update` | `[{ key, update }]` — status, edit, and receipt-like changes |
| `messages.delete` | `{ keys }` (a revoke) or `{ jid, all: true }` (chat cleared) |
| `message-receipt.update` | `[{ key, receipt }]` — delivery and read receipts |
| `message-capping.update` | `{ … }` — new-chat send quota |
| `link-preview.update` | `{ … }` — a link preview was resolved |

```ts
sock.ev.on('messages.upsert', ({ messages, type }) => {
	if (type !== 'notify') return
	for (const msg of messages) {
		if (msg.key.fromMe) continue
		const text = extractMessageText(msg.message) // never read .conversation directly
		console.log(msg.key.remoteJid, text)
	}
})
```

### Chats and contacts

| Event | Payload |
|---|---|
| `chats.upsert` | `Chat[]` |
| `chats.update` | `Partial<Chat>[]` |
| `chats.delete` | `string[]` (jids) |
| `contacts.upsert` | `Contact[]` |
| `contacts.update` | `Partial<Contact>[]` |
| `blocklist.set` | `{ blocklist }` |
| `blocklist.update` | `{ blocklist, type }` |
| `presence.update` | `{ id, presences }` |
| `settings.update` | `{ … }` |

### Groups and communities

| Event | Payload |
|---|---|
| `groups.upsert` | `GroupMetadata[]` |
| `groups.update` | `Partial<GroupMetadata>[]` |
| `group-participants.update` | `{ id, participants, action }` — `action` is `add`, `remove`, `promote`, `demote` |
| `group.member-tag.update` | `{ … }` |
| `community-owner.update` | `{ … }` |

```ts
sock.ev.on('group-participants.update', ({ id, participants, action }) => {
	console.log(`${participants.length} ${action} in ${id}`)
})
```

### Channels

| Event | Payload |
|---|---|
| `newsletter-participants.update` | `{ id, author, new_role, action }` |
| `newsletter-settings.update` | `{ id, update }` |
| `newsletter-admin-profile.update` | `{ id, … }` |
| `limit-sharing.update` | `{ … }` |

### Calls

| Event | Payload |
|---|---|
| `call` | `[{ id, from, status, isVideo, date }]` — `status` is `offer`, `ringing`, `accept`, `reject`, `terminate` |
