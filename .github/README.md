<h1 align='center'>
  <img alt="anya-bail logo" src="https://raw.githubusercontent.com/WhiskeySockets/Baileys/refs/heads/master/Media/logo.png" height="75"/>
</h1>

<div align='center'>

**anya-bail** — A heavily extended fork of [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys), the WhatsApp Web API library.

Maintained for [@queenanya/baileys](https://github.com/QueenAnya/ANYA-MD) | Last updated: **April 2026**

[![WA Version](https://img.shields.io/badge/WA%20Version-2.3000.1037656372-green)](#) [![Base](https://img.shields.io/badge/Base-WhiskeySockets%2FBaileys-blue)](#)

</div>

---

## What's Different from Upstream

| Feature                               | Upstream Baileys | anya-bail                                 |
| ------------------------------------- | ---------------- | ----------------------------------------- |
| Interactive / button messages         | ❌               | ✅ Full support                           |
| Template messages                     | ❌               | ✅                                        |
| List messages                         | ❌               | ✅                                        |
| Cards / Carousel messages             | ❌               | ✅                                        |
| Album messages                        | ❌               | ✅                                        |
| Sticker pack messages                 | ❌               | ✅                                        |
| Share / Request phone number          | ❌               | ✅                                        |
| AI icon on messages                   | ❌               | ✅                                        |
| Rich response / Meta AI messages      | ❌               | ✅                                        |
| Outgoing call API                     | ❌               | ✅                                        |
| Full MEX notification dispatcher      | Partial          | ✅                                        |
| `messaging-history.status` event      | ❌               | ✅                                        |
| `message-capping.update` event        | ❌               | ✅                                        |
| Reachout timelock event               | ❌               | ✅                                        |
| MongoDB auth state                    | ❌               | ✅                                        |
| Single-file auth state                | ❌               | ✅                                        |
| iOS / Android / KaiOS browser support | Limited          | ✅ Extended                               |
| Pairing race-condition fix            | ❌               | ✅                                        |
| Username in contacts / groups         | ❌               | ✅                                        |
| `authorUsername` in group events      | ❌               | ✅                                        |
| `chunkOrder` in history sync          | ❌               | ✅                                        |
| tctoken prune on reconnect            | ❌               | ✅                                        |
| App state sync resilience             | Partial          | ✅ `forceSnapshot` + `blockedCollections` |
| Message ID prefix                     | `3EB0`           | `4NY4W3B`                                 |
| Addons layer                          | ❌               | ✅ 18 addon files                         |

---

## Installation

```bash
npm install anya-bail
# or
yarn add anya-bail
```

---

## Table of Contents

- [Connecting](#connecting)
- [Sending Messages](#sending-messages)
  - [Text](#text-message)
  - [Media](#image--video--audio--document)
  - [Buttons](#button-message)
  - [Template](#template-message)
  - [Interactive / List](#interactive--list-message)
  - [Album](#album-message)
  - [Sticker Pack](#sticker-pack-message)
  - [Share Phone Number](#share-phone-number-message)
  - [Request Phone Number](#request-phone-number-message)
  - [AI Icon Feature](#ai-icon-feature)
  - [Rich Response / Meta AI Messages](#rich-response-message)
    - [sendTable](#sendtable)
    - [sendList](#sendlist)
    - [sendCodeBlock](#sendcodeblock)
    - [sendLatex](#sendlatex)
    - [sendLatexImage](#sendlateximage)
    - [sendLatexInlineImage](#sendlatexinlineimage)
    - [sendRichMessage](#sendrichmessage)
    - [captureUnifiedResponse / sendUnifiedResponse](#captureunifiedresponse--sendunifiedresponse)
- [Calls](#calls)
- [Auth State](#auth-state)
- [MEX Notifications](#mex-notifications)
- [Addons](#addons)
- [Changelog](#changelog)

---

## Connecting

```ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from 'anya-bail'
import { Boom } from '@hapi/boom'

const { state, saveCreds } = await useMultiFileAuthState('./auth_info')

const sock = makeWASocket({
	auth: state,
	printQRInTerminal: true
})

sock.ev.on('creds.update', saveCreds)

sock.ev.on('connection.update', update => {
	const { connection, lastDisconnect } = update
	if (connection === 'close') {
		const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
		if (shouldReconnect) connectToWhatsApp()
	}
})
```

**Pairing Code (instead of QR):**

```ts
const code = await sock.requestPairingCode('+91XXXXXXXXXX')
console.log('Pairing code:', code)
```

---

## Sending Messages

### Text Message

```ts
await sock.sendMessage(jid, { text: 'Hello World!' })
```

### Image / Video / Audio / Document

```ts
// Image
await sock.sendMessage(jid, { image: { url: './image.jpg' }, caption: 'caption' })

// Video
await sock.sendMessage(jid, { video: { url: './video.mp4' }, caption: 'caption' })

// Audio (PTT)
await sock.sendMessage(jid, { audio: { url: './audio.mp3' }, mimetype: 'audio/mp4', ptt: true })

// Document
await sock.sendMessage(jid, { document: { url: './file.pdf' }, mimetype: 'application/pdf', fileName: 'file.pdf' })
```

### Button Message

```ts
await sock.sendMessage(jid, {
	buttons: [
		{ buttonId: 'btn1', buttonText: { displayText: 'Option 1' }, type: 1 },
		{ buttonId: 'btn2', buttonText: { displayText: 'Option 2' }, type: 1 }
	],
	text: 'Pick an option:',
	footer: 'Powered by anya-bail'
})
```

### Template Message

```ts
await sock.sendMessage(jid, {
	templateButtons: [
		{ index: 1, urlButton: { displayText: 'Visit', url: 'https://example.com' } },
		{ index: 2, callButton: { displayText: 'Call', phoneNumber: '+91XXXXXXXXXX' } },
		{ index: 3, quickReplyButton: { displayText: 'Reply', id: 'id1' } }
	],
	text: 'Template body',
	footer: 'footer'
})
```

### Interactive / List Message

```ts
// Interactive buttons
await sock.sendMessage(jid, {
	interactiveButtons: [
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Yes', id: 'yes' }) },
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'No', id: 'no' }) }
	],
	body: { text: 'Are you sure?' },
	footer: { text: 'anya-bail' }
})

// List message
await sock.sendMessage(jid, {
	sections: [
		{
			title: 'Section 1',
			rows: [
				{ title: 'Row 1', rowId: 'r1', description: 'Description 1' },
				{ title: 'Row 2', rowId: 'r2', description: 'Description 2' }
			]
		}
	],
	title: 'List Title',
	text: 'List body',
	footer: 'footer',
	buttonText: 'Open List'
})
```

### Album Message

```ts
await sock.sendMessage(jid, {
	album: {
		expectedImageCount: 2,
		expectedVideoCount: 1
	}
})
// Then send each media with albumParentKey
await sock.sendMessage(jid, {
	image: { url: './photo1.jpg' },
	caption: 'First',
	albumParentKey: albumMsg.key
})
```

### Sticker Pack Message

```ts
await sock.sendMessage(jid, {
	stickerPack: {
		stickers: [
			{
				fileSha256: Buffer.from('...'),
				fileEncSha256: Buffer.from('...'),
				mediaKey: Buffer.from('...'),
				directPath: '/v/...',
				fileLength: 12345
			}
		]
	}
})
```

### Share Phone Number Message

```ts
await sock.sendMessage(jid, { sharePhoneNumber: true })
```

### Request Phone Number Message

```ts
await sock.sendMessage(jid, { requestPhoneNumber: true })
```

### AI Icon Feature

```ts
// Adds Meta AI bot icon to any message
await sock.sendMessage(jid, { text: 'I am a bot!' }, { ai: true })
```

### Rich Response Message

#### sendTable

```ts
await sock.sendTable(
	jid,
	'Results',
	['Name', 'Score'],
	[
		['Alice', '98'],
		['Bob', '87']
	],
	quotedMsg,
	{ headerText: 'Leaderboard:', footer: 'Updated now' }
)
```

#### sendList

```ts
await sock.sendList(jid, 'Todo', ['Buy milk', 'Call mom', 'Push code'], quotedMsg)
```

#### sendCodeBlock

```ts
await sock.sendCodeBlock(jid, `const greet = name => \`Hello \${name}\``, quotedMsg, {
	title: 'Example',
	language: 'javascript'
})
// Supported: javascript, typescript, python (js, ts, py)
```

#### sendLatex

```ts
await sock.sendLatex(jid, quotedMsg, {
	text: 'Quadratic formula:',
	expressions: [{ latexExpression: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' }]
})
```

#### sendLatexImage

```ts
await sock.sendLatexImage(
	jid,
	quotedMsg,
	{ expressions: [{ latexExpression: 'e^{i\\pi}+1=0' }] },
	async latex => renderToPng(latex), // → { buffer, width, height }
	async (buf, type) => uploadToWA(buf, type) // → { url?, directPath? }
)
```

#### sendLatexInlineImage

Same as `sendLatexImage` but each expression renders as its own inline image block.

#### sendRichMessage

```ts
import { RichSubMessageType } from 'anya-bail'

await sock.sendRichMessage(
	jid,
	[
		{ messageType: RichSubMessageType.TEXT, messageText: 'Hello from bot!' },
		{
			messageType: RichSubMessageType.TABLE,
			tableMetadata: {
				title: 'Data',
				rows: [{ items: ['Key', 'Value'], isHeading: true }, { items: ['status', 'ok'] }]
			}
		}
	],
	quotedMsg
)
```

#### captureUnifiedResponse / sendUnifiedResponse

```ts
sock.ev.on('messages.upsert', async ({ messages }) => {
	for (const msg of messages) {
		const captured = sock.captureUnifiedResponse(msg.message)
		if (captured) {
			await sock.sendUnifiedResponse(otherJid, quotedMsg, captured)
		}
	}
})
```

---

## Calls

```ts
// Outgoing call
const { callId } = await sock.initiateCall(jid, { isVideo: false })
await sock.acceptCall(jid, callId)
await sock.preacceptCall(jid, callId)
await sock.muteCall(jid, callId, { isMuted: true })
await sock.terminateCall(jid, callId)
await sock.cancelCall(jid, callId)

// Group call links
const link = await sock.queryCallLink(callLinkToken)
await sock.joinCallLink(callLinkToken)
```

---

## Auth State

```ts
// Multi-file (default)
const { state, saveCreds } = await useMultiFileAuthState('./auth_info')

// Single-file
import { useSingleFileAuthState } from 'anya-bail'
const { state, saveState } = useSingleFileAuthState('./auth.json')

// MongoDB
import { useMongoFileAuthState } from 'anya-bail'
const { state, saveCreds } = await useMongoFileAuthState(mongoCollection)
```

---

## MEX Notifications

```ts
// Newsletter
sock.ev.on('newsletter-settings.update', ({ id, update }) => {})
sock.ev.on('newsletter-participants.update', ({ id, user, new_role }) => {})

// Linked profiles (LID ↔ PN mapping)
sock.ev.on('lid-mapping.update', ({ lid, pn }) => {})

// Message capping quota
sock.ev.on('message-capping.update', ({ used_quota, total_quota }) => {})

// WA Business reachout timelock
sock.ev.on('connection.update', ({ reachoutTimeLock }) => {
	if (reachoutTimeLock?.isActive) {
		console.log('Restricted until:', reachoutTimeLock.timeEnforcementEnds)
	}
})

// History sync completion / stall
sock.ev.on('messaging-history.status', ({ syncType, status, explicit }) => {
	console.log(`History sync ${status} (${syncType}) explicit=${explicit}`)
})
```

---

## Addons

```ts
import { buildVCard, AutoReplyEngine, createScheduler, ... } from 'anya-bail'
```

| Addon                 | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `message-composer`    | Rich/bot message builders (table, list, code, latex) |
| `button-sender`       | Interactive / native-flow button helpers             |
| `call-handler`        | Inbound call handling                                |
| `auto-reply`          | Rule-based auto-reply engine                         |
| `scheduling`          | Message queue + scheduled sending                    |
| `anti-delete`         | Detect and recover deleted messages                  |
| `vcard`               | Build vCard contact strings                          |
| `message-search`      | Search messages by type/text/regex                   |
| `status-posting`      | Broadcast statuses to multiple JIDs                  |
| `jid-plotting`        | JID resolution + LID/PN mapping helpers              |
| `templates`           | Template message variable helpers                    |
| `interactive-message` | Interactive message utilities                        |
| `from-messages`       | Message processing helpers                           |
| `from-messages-recv`  | Inbound message helpers                              |
| `from-messages-send`  | Outbound message helpers                             |
| `from-chats`          | Chat event helpers                                   |

---

## Changelog

### v8.0.0 — April 2026 (anya-bail)

**Based on:** WhiskeySockets/Baileys master (April 2026) + InnovatorsSOFT Baileys additions

**Added over upstream:**

- Full interactive/button/template/list/cards/carousel message system
- Album messages with `albumParentKey` support
- Sticker pack messages
- Share/Request phone number messages
- AI icon on any message (`options.ai = true`)
- Rich response / Meta AI messages — `sendTable`, `sendList`, `sendCodeBlock`, `sendLatex`, `sendLatexImage`, `sendLatexInlineImage`, `sendRichMessage`, `captureUnifiedResponse`, `sendUnifiedResponse`
- Full outgoing call API (`initiateCall`, `acceptCall`, `preacceptCall`, `muteCall`, `terminateCall`, `cancelCall`, `queryCallLink`, `joinCallLink`)
- Full MEX notification dispatcher — reachout timelock, message capping, linked profiles, newsletter ops
- `messaging-history.status` event with pause timeout (120s)
- `message-capping.update` event
- `authorUsername` in group participant events
- `chunkOrder` in history sync
- MongoDB + single-file auth states
- Extended browser map: iOS, Android, androidCompanion, Linux, KaiOS, ChromeOS
- `getPlatformDisplayName()` utility
- Pairing race-condition fix (`sendPairingIQ` + queue)
- `buildPairingQRData` from companion-reg-client-utils
- tctoken issuance + prune system (daily cleanup on reconnect)
- App state sync resilience: `forceSnapshotCollections`, `blockedCollections`
- `ensureLTHashStateVersion`, `isMissingKeyError`, `isAppStateSyncIrrecoverable`, `MAX_SYNC_ATTEMPTS`
- `storeTcTokensFromHistorySync` — saves tctokens from history sync chats
- `SERVER_ERROR_CODES` (463 MissingTcToken, 479 SmaxInvalid)
- Username fields in Contact, GroupMetadata, GroupParticipant, WAMessageKey
- `isJidBot`, `isJidMetaAI`, `PSA_WID` exports
- `onBeforeSessionRefresh` in identity change handler
- `QueryIdd`, `MexOperations`, `XWAPathsMexUpdates` in Newsletter types
- 18-file addons layer
- Message ID prefix: `4NY4W3B`
- WA version: `2.3000.1037656372`

---

> Based on [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) and [InnovatorsSOFT/Baileys](https://github.com/InnovatorsSOFT/Baileys). Not affiliated with WhatsApp or Meta.
