# Baileys-patchd — Addons

This folder contains all ported features from the **innovatorssoft** Baileys fork
and eight upstream patch branches. Every addon is self-contained, fully typed,
and exported from `addons/index.ts` → re-exported from `src/index.ts`.

---

## Addon Files & Sources

| File                     | Feature                                                                                     | Source                                             |
| ------------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `auto-reply.ts`          | Auto-Reply System                                                                           | innovatorssoft                                     |
| `anti-delete.ts`         | Anti-Delete System                                                                          | innovatorssoft                                     |
| `message-scheduler.ts`   | Message Scheduler                                                                           | innovatorssoft                                     |
| `jid-plot.ts`            | JID Plotting & LID Support                                                                  | innovatorssoft                                     |
| `rich-response.ts`       | sendTable / sendList / sendCodeBlock / sendLatex / sendRichMessage / captureUnifiedResponse | innovatorssoft                                     |
| `browser-presets.ts`     | `Browsers.android()` preset + `getPlatformDisplayName()`                                    | Baileys-android-browser + Baileys-fix-pairing-code |
| `pairing-fix.ts`         | Pairing queue — waits for pair-device before sending IQ                                     | Baileys-fix-pairing-code                           |
| `lid-support.ts`         | `onWhatsApp()` LID JID support helpers                                                      | Baileys-fix-on-whatsapp-lid-support                |
| `outgoing-calls.ts`      | `initiateCall()` / `rejectCall()` / `endCall()` / `createCallLink()`                        | Baileys-feature-outgoing-calls                     |
| `past-participants.ts`   | `processPastParticipants()` — history sync past members                                     | Baileys-pastParticepnts                            |
| `mex-linked-profiles.ts` | Flexible mex payload parsing + `NotificationLinkedProfilesUpdates`                          | Baileys-fix-mex-linked-profiles                    |
| `stickerpack.ts`         | `Sticker` / `StickerPack` types + `buildStickerPackProto()`                                 | Baileys-feat-add-stickerpack-support               |
| `privacy-tokens.ts`      | `buildPrivacyTokenNode()` — simplified getPrivacyTokens                                     | Baileys-feat-add-stickerpack-support               |

---

## What Was Applied Directly to Source Files

The following patches were applied **directly** into the main source files (not just addons):

### `src/Utils/browser-utils.ts`

- Added `Browsers.android(browser)` preset
- Added `getPlatformDisplayName(browser)` function
- Fixed `getPlatformId()` fallback to `CHROME` instead of hardcoded `'1'`

### `src/Socket/socket.ts`

- **LID support fix** (`Baileys-fix-on-whatsapp-lid-support`):
  `onWhatsApp()` now supports `@lid` JIDs via a separate `USyncQuery` with `LIDProtocol`
  instead of silently skipping them with a warning.
- **Pairing-code fix** (`Baileys-fix-pairing-code`):
  Split `requestPairingCode()` into `sendPairingIQ()` (raw sender) + queue wrapper.
  Queues the IQ until `pair-device` stanza is received. Uses canonical browser
  platform IDs (1–6) to avoid WA server 400 rejections. Clears queue on disconnect.

### `src/Socket/messages-recv.ts`

- **Mex linked-profiles fix** (`Baileys-fix-mex-linked-profiles`):
  Flexible payload extraction (handles both `mexNode.content` and `update` child).
  Added `NotificationLinkedProfilesUpdates` case that emits `lid-mapping.update` events.

### `src/Socket/messages-send.ts`

- Added `stickerPackMessage` → `'sticker_pack'` to `getMessageType()`

### `src/Utils/process-message.ts`

- Added `pastParticipants` field to `messaging-history.set` emit

### `src/Types/Call.ts`

- Added `WAInitiateCallOptions` and `WAInitiateCallResult` types

### `src/Types/Message.ts`

- Added `Sticker` and `StickerPack` rich types
- Added `richStickerPack: StickerPack` to `AnyRegularMessageContent`

### `src/Types/Events.ts`

- Added `pastParticipants?: proto.IPastParticipants[] | null` to `messaging-history.set`

### `src/Types/index.ts`

- Added `android` to `BrowsersMap` type

---

## Usage Examples

### Auto-Reply

```ts
import { addAutoReplyRule, checkAutoReply } from '@whiskeysockets/baileys'

addAutoReplyRule({
	id: 'ping',
	pattern: 'ping',
	matchMode: 'exact',
	replyText: 'pong!'
})

sock.ev.on('messages.upsert', async ({ messages }) => {
	for (const msg of messages) {
		const isGroup = msg.key.remoteJid!.endsWith('@g.us')
		const reply = await checkAutoReply(msg, isGroup)
		if (reply) await sock.sendMessage(msg.key.remoteJid!, { text: reply })
	}
})
```

### Anti-Delete

```ts
import { cacheMessageForAntiDelete, getAntiDeletedMessage } from '@whiskeysockets/baileys'

// Cache every incoming message
sock.ev.on('messages.upsert', ({ messages }) => {
	messages.forEach(cacheMessageForAntiDelete)
})

// On delete, retrieve original
sock.ev.on('messages.update', updates => {
	for (const update of updates) {
		if (update.update.messageStubType === proto.WebMessageInfo.StubType.REVOKE) {
			const original = getAntiDeletedMessage(update.key)
			if (original) console.log('Deleted message was:', original.message)
		}
	}
})
```

### Message Scheduler

```ts
import { attachSchedulerSendFn, scheduleMessageAfter } from '@whiskeysockets/baileys'

attachSchedulerSendFn(sock.sendMessage)

scheduleMessageAfter({
	jid: '1234567890@s.whatsapp.net',
	content: { text: 'Hello in 10 seconds!' },
	delayMs: 10_000
})
```

### sendTable / sendList / sendCodeBlock / sendLatex / sendRichMessage

```ts
import { sendTable, sendList, sendCodeBlock, sendLatex, sendRichMessage } from '@whiskeysockets/baileys'

await sendTable(
	sock.sendMessage,
	jid,
	[
		['Name', 'Age'],
		['Alice', '30'],
		['Bob', '25']
	],
	{ title: 'Users', headerRow: true }
)

await sendList(sock.sendMessage, jid, ['Apple', 'Banana', 'Cherry'], { title: 'Fruits', ordered: true })

await sendCodeBlock(sock.sendMessage, jid, 'console.log("Hello")', { language: 'js' })

await sendLatex(sock.sendMessage, jid, 'E = mc^2')

await sendRichMessage(sock.sendMessage, jid, {
	parts: [
		{ type: 'text', text: 'Here is a table:' },
		{
			type: 'table',
			table: {
				rows: [
					['A', 'B'],
					['1', '2']
				],
				headerRow: true
			}
		}
	]
})
```

### Outgoing Calls

```ts
import { initiateCall, rejectCall, endCall } from '@whiskeysockets/baileys'

// Start audio call
const result = await initiateCall(sock.sendNode, sock.authState.creds.me!.id, '1234567890@s.whatsapp.net')
console.log('Call started:', result.callId)

// Reject incoming call
sock.ev.on('call', async ([call]) => {
	if (call.status === 'offer') {
		await rejectCall(sock.sendNode, sock.authState.creds.me!.id, call.from, call.id)
	}
})
```

### Android Browser Preset

```ts
import makeWASocket, { Browsers } from '@whiskeysockets/baileys'

const sock = makeWASocket({
	browser: Browsers.android('MyApp')
})
```

### JID Plotting (LID ↔ PN mapping)

```ts
import { plotJidPair, resolvePnJid, resolveLidJid } from '@whiskeysockets/baileys'

plotJidPair('1234567890@s.whatsapp.net', '99887766@lid')
console.log(resolvePnJid('99887766@lid')) // '1234567890@s.whatsapp.net'
console.log(resolveLidJid('1234567890@s.whatsapp.net')) // '99887766@lid'
```

### captureUnifiedResponse / sendUnifiedResponse

```ts
import { captureUnifiedResponse, sendUnifiedResponse } from '@whiskeysockets/baileys'

captureUnifiedResponse(jid1, { text: 'Hello' })
captureUnifiedResponse(jid2, { text: 'World' })
await sendUnifiedResponse(sock.sendMessage) // sends both at once
```
