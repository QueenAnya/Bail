# F_merge — Fork-Exclusive Features Usage Guide

This document covers every feature in this fork that **does not exist in
real `@whiskeysockets/baileys`**. For source attribution and verification
details (which fork, which commit, what was checked), see
[`src/addons/README.md`](src/addons/README.md). This file is
usage-focused — code examples for how to actually use each feature.

All examples assume `sock = makeWASocket(...)`.

---

## 1. Rich AI-Style Responses

Native WhatsApp "rich response" content — tables, syntax-highlighted code
blocks, LaTeX, markdown, and citations, rendered as native UI primitives
(not plain text).

### Quick content-type shorthand

```ts
await sock.sendMessage(jid, {
	richResponse: {
		text: 'Here is a JavaScript example:',
		code: `const greet = (name) => console.log('Hello, ' + name)`,
		language: 'javascript'
	}
})
```

Also accepts `table`, `links`, `inlineImage`, `latex` (array), `headerText`,
`footerText`, `disclaimerText`, `noHeading`. Can combine several in one call:

```ts
await sock.sendMessage(jid, {
	headerText: 'Search results:',
	links: [{ text: 'Docs', url: 'https://example.com', sources: [{ displayName: 'Wiki' }] }],
	code: 'npm install foo',
	language: 'bash',
	latex: ['E=mc^2'],
	footerText: 'Powered by Baileys'
})
```

### Socket-level helpers

```ts
await sock.sendTable(
	jid,
	'Price List',
	['Item', 'Qty', 'Price'],
	[
		['Apple', '3', '$1.50'],
		['Banana', '6', '$0.90']
	]
)

await sock.sendList(jid, 'Todo', ['Buy milk', 'Walk dog'])

await sock.sendCodeBlock(jid, 'console.log("Hello World")', null, {
	title: 'Example',
	language: 'javascript'
})

await sock.sendLatex(jid, 'E=mc^2') // inline text-style
await sock.sendLatexImage(jid, null, 'E=mc^2') // rendered as PNG (QuickLaTeX)
await sock.sendLatexInlineImage(jid, null, 'E=mc^2') // inline variant

await sock.sendMarkdown(jid, '# H1\n## H2\n==Highlighted==\n_Italics_ and **Bold**!')
```

### Fully custom — raw submessages + native rendering

```ts
import { RichSubMessageType } from '@queenanya/baileys'

await sock.sendRichMessage(jid, [
  { messageType: RichSubMessageType.TEXT, messageText: 'Report:' },
  { messageType: RichSubMessageType.CODE, codeMetadata: { codeLanguage: 'python', codeBlocks: [...] } }
], /* quoted */ null, { useMarkdown: true }) // useMarkdown: renders as native primitives, not plain text
```

### Capturing AI-style unified responses (for logging/analytics)

```ts
import { captureUnifiedResponse, sendUnifiedResponse, getCapturedResponses } from '@queenanya/baileys'

captureUnifiedResponse(someIncomingMessage)
const captured = getCapturedResponses()
```

**Source:** innovatorssoft/Baileys. Underlying machinery:
`generateRichMessageContent`, `generateMarkdownContent`, `generateTableContent`,
`generateCodeBlockContent` (`src/addons/message-composer.ts`), and
`prepareRichResponseMessage`/`toUnified` (`src/addons/bot-forwarded-message.ts`).

---

## 2. Interactive Buttons

### Shorthand builder (recommended)

```ts
import { generateCombinedButtons } from '@queenanya/baileys'

const msg = generateCombinedButtons(
	'Choose an option:',
	[
		{ type: 'reply', displayText: 'Track Order', id: 'track', icon: 'default' },
		{ type: 'url', displayText: 'Visit Site', url: 'https://example.com', useWebview: true },
		{ type: 'copy', displayText: 'Copy Code', copyCode: 'SALE10' },
		{ type: 'call', displayText: 'Call Us', phoneNumber: '+11234567890' },
		{
			type: 'sections',
			displayText: 'Pick a category',
			sections: [{ title: 'Fruits', rows: [{ title: 'Apple', id: 'apple' }] }]
		},
		// Bare native format also works, no `type` field needed — auto-detected:
		{ name: 'cta_catalog', buttonParamsJson: JSON.stringify({ business_phone_number: '628xxx' }) }
	],
	{
		footer: 'Powered by Baileys',
		offer: { text: '10% off today!', code: 'SALE10' }, // → limited_time_offer banner
		bottomSheet: { title: 'More options', buttonText: 'View' } // → collapses into a sheet
	}
)

await sock.sendMessage(jid, msg)
```

### Content-type shorthand

```ts
await sock.sendMessage(jid, {
	interactiveButtons: [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Yes', id: 'yes' }) }]
})
```

**Source:** innovatorssoft/Baileys (`src/addons/interactive-message.ts`).

---

## 3. Carousel Messages (multi-card, native flow)

```ts
await sock.sendMessage(jid, {
	text: 'Check out these products!',
	footer: '@queenanya/baileys',
	cards: [
		{
			image: { url: 'https://example.com/1.jpg' },
			caption: 'Product 1', // alias for `body`
			nativeFlow: [
				// alias for `buttons`, shorthand-converted
				{ text: 'Buy Now', url: 'https://shop.example.com/1', useWebview: true }
			]
		},
		{
			image: { url: 'https://example.com/2.jpg' },
			caption: 'Product 2 — On Sale!',
			offerText: '20% off',
			offerCode: 'SALE20',
			offerUrl: 'https://example.com',
			nativeFlow: [{ text: 'Order', id: '#order-2', icon: 'cart' }]
		},
		{
			image: { url: 'https://example.com/3.jpg' },
			caption: 'Product 3',
			optionText: 'More info',
			optionTitle: 'Select an option',
			nativeFlow: [
				{ text: 'Details', id: '#details-3' },
				{ text: 'Source', url: 'https://example.com' }
			]
		}
	]
})
```

**Source:** innovatorssoft/Baileys (`src/Utils/messages.ts`, `cards` content-type
dispatch). Fix for carousel messages not sending their required `biz` binary
node is from innovatorssoft commit `ad6be86`.

---

## 4. Sticker Packs

Two implementations are available — pick whichever fits your workflow:

### A. Raw proto builder (WhiskeySockets-PR-based, `from-messages.ts`)

Full pipeline (WebP conversion incl. Lottie/WAS animated stickers, ZIP,
encrypt, upload) built into `sock.sendMessage`:

```ts
await sock.sendMessage(jid, {
	stickerPack: {
		name: 'My Pack',
		publisher: 'Me',
		stickers: [
			{ data: fs.readFileSync('./sticker1.png') },
			{ data: 'https://example.com/sticker2.webp', emojis: ['😀'] }
		],
		cover: fs.readFileSync('./cover.png')
	}
})
```

Limits enforced (ported from itsliaaa): max 60 stickers/pack, 1MB/sticker,
processed in batches of 15 concurrently.

### B. itsliaaa's full builder (standalone, returns ready-to-send message)

```ts
import { prepareStickerPackMessageItsliaaa } from '@queenanya/baileys'

const stickerPackMessage = await prepareStickerPackMessageItsliaaa(
	{
		cover: coverBuffer,
		stickers: [{ data: sticker1Buffer, emojis: ['🎉'] }, { data: sticker2Buffer }],
		name: 'My Pack',
		publisher: 'Me'
	},
	{
		upload: sock.waUploadToServer, // required
		mediaCache: myOptionalCache // optional — caches by sticker URLs
	}
)

await sock.relayMessage(jid, { stickerPackMessage }, {})
```

### Standalone WebP converter

```ts
import { convertToWebP } from '@queenanya/baileys'

const { buffer, isAnimated } = await convertToWebP('https://example.com/pic.png')
// or: await convertToWebP(fs.readFileSync('./sticker.jpg'))
```

**Source:** shell/proto from `Baileys-feat-add-stickerpack-support` (real
WhiskeySockets PR); `convertToWebP` and safety limits from itsliaaa/baileys.

---

## 5. Newsletter Extensions

Beyond the standard newsletter methods, this fork adds:

```ts
await sock.newsletterSubscribed() // list all subscribed newsletters
await sock.newsletterReactionMode(newsletterJid, 'admin') // who can react to posts
await sock.newsletterAction(newsletterJid, 'FOLLOW') // generic QueryIds dispatcher
await sock.newsletterFetchUpdates(newsletterJid, 50) // fetch state-update events (not message content)
```

**Source:** `newsletterSubscribed` from itsliaaa; the other three from
innovatorssoft/Baileys.

---

## 6. Chat History Helpers

```ts
import { getLastMessageInChat, getOldestMessageInChat, copyNForward, makeSimpleInMemoryStore } from '@queenanya/baileys'

const store = makeSimpleInMemoryStore()
store.bind(sock.ev)

const last = getLastMessageInChat(store, jid)
const oldest = getOldestMessageInChat(store, jid) // useful as fetchMessageHistory's cursor

await copyNForward(sock, targetJid, someMessage) // re-send/forward a message
```

Note: these three didn't exist in either fork — they were "implement this
yourself" stubs in innovatorssoft's docs, implemented here for real on top
of the store + `generateForwardMessageContent`.

---

## 7. Auto-Reply System

```ts
import { createAutoReply } from '@queenanya/baileys'

const autoReply = createAutoReply(sock.sendMessage, (jid, presence) => sock.sendPresenceUpdate(presence, jid), {
	simulateTyping: true,
	typingDuration: 1500,
	globalCooldown: 1000
})

autoReply.addRule({ keywords: ['hi', 'hello'], response: 'Hey there! 👋' })
autoReply.addRule({
	pattern: /order\s+#?(\d+)/i,
	response: async (match, msg) => `Looking up order ${match[1]}...`
})

sock.ev.on('messages.upsert', ({ messages }) => {
	for (const msg of messages) autoReply.processMessage(msg)
})
```

**Source:** innovatorssoft/Baileys (`src/addons/auto-reply.ts`).

---

## 8. Message Scheduler

```ts
import { createMessageScheduler } from '@queenanya/baileys'

const scheduler = createMessageScheduler(sock.sendMessage, {
	onSent: (s, msg) => console.log(`Sent to ${s.jid}`),
	onFailed: (s, err) => console.error(`Failed: ${err.message}`)
})

scheduler.schedule(jid, { text: 'Happy New Year!' }, new Date('2027-01-01T00:00:00'))
scheduler.scheduleDelay(jid, { text: 'Reminder' }, 60_000) // in 1 minute
```

**Source:** innovatorssoft/Baileys (`src/addons/scheduling.ts`).

---

## 9. Anti-Delete

```ts
import { createAntiDeleteHandler, makeInMemoryStore } from '@queenanya/baileys'

const store = makeInMemoryStore()
store.bind(sock.ev)

const antiDelete = createAntiDeleteHandler(store, { notifyJid: yourOwnJid })
sock.ev.on('messages.update', updates => antiDelete.handleUpdates(updates, sock))
```

**Source:** innovatorssoft/Baileys (`src/addons/anti-delete.ts`).

---

## 10. Chat Control (Typing / Pinned Messages / Read Receipts)

```ts
import {
	createTypingIndicator,
	createPinnedMessagesManager,
	createReadReceiptController,
	DISAPPEARING_DURATIONS
} from '@queenanya/baileys'

const typing = createTypingIndicator(sock.sendPresenceUpdate)
await typing.start(jid)
await typing.stop(jid)

const pinned = createPinnedMessagesManager()
pinned.pin(jid, messageKey, DISAPPEARING_DURATIONS.ONE_DAY)

const receipts = createReadReceiptController(sock.readMessages)
```

**Source:** innovatorssoft/Baileys (`src/addons/chat-control.ts`).

---

## 11. Status Posting (StatusHelper)

```ts
import { StatusHelper, STATUS_BACKGROUNDS, STATUS_FONTS } from '@queenanya/baileys'

await sock.sendMessage(
	'status@broadcast',
	StatusHelper.createTextStatus({
		text: 'Hello world!',
		backgroundColor: STATUS_BACKGROUNDS.gradient.sunset,
		font: STATUS_FONTS.BEBASNEUE
	})
)

await sock.sendMessage('status@broadcast', StatusHelper.createImageStatus(buffer, { caption: 'Nice view' }))
await sock.sendMessage('status@broadcast', StatusHelper.createVideoStatus(buffer))
await sock.sendMessage('status@broadcast', StatusHelper.gif(buffer)) // video status marked as gifPlayback
```

**Source:** innovatorssoft/Baileys (`src/addons/status-helpers.ts`). Colors
and font IDs verified byte-identical.

---

## 12. Message Templates

```ts
import { createTemplateManager, renderTemplate, PRESET_TEMPLATES } from '@queenanya/baileys'

const templates = createTemplateManager(true) // true = load built-in presets

const invoiceText = templates.render('invoice', {
	invoiceNumber: 'INV-111',
	customerName: 'John Doe',
	invoiceDate: '2026-01-15',
	dueDate: 'on receipt',
	items: '1x Widget - $10',
	subtotal: '$10',
	total: '$10'
})

// Quick one-off render without a manager:
const quick = renderTemplate('Hi {{name}}, your order #{{orderId}} is {{status:processing}}', {
	name: 'Alice',
	orderId: '123'
})
```

Built-in presets: `ORDER_CONFIRMATION`, `WELCOME`, `REMINDER`,
`SUPPORT_TICKET`, `BIRTHDAY`, `INVOICE`.

**Source:** innovatorssoft/Baileys (`src/addons/templates.ts`).

---

## 13. vCard Contact Builder

```ts
import { generateVCard, createContactCard, createContactCards } from '@queenanya/baileys'

const vcard = generateVCard({
  fullName: 'John Doe',
  phones: [{ number: '+11234567890', type: 'CELL' }],
  emails: [{ address: 'john@example.com' }]
})

await sock.sendMessage(jid, createContactCard({ fullName: 'John Doe', phones: [...] }))
await sock.sendMessage(jid, createContactCards([contact1, contact2]))
```

**Source:** innovatorssoft/Baileys (`src/addons/vcard.ts`).

---

## 14. Message Search (client-side index)

```ts
import { createMessageSearch } from '@queenanya/baileys'

const search = createMessageSearch(store) // pass your message store
const results = search.searchMessages(jid, 'invoice', { limit: 10 })
```

**Source:** innovatorssoft/Baileys (`src/addons/message-search.ts`).

---

## 15. Alternate Auth State Backends

```ts
import { useSqliteAuthState } from '@queenanya/baileys' // itsliaaa
import { useCacheManagerAuthState } from '@queenanya/baileys' // innovatorssoft — Redis/Memcached/etc via cache-manager v5
import { useMongoFileAuthState } from '@queenanya/baileys'
import { useSingleFileAuthState } from '@queenanya/baileys' // itsliaaa

const { state, saveCreds } = await useSqliteAuthState({ database: './auth.db' })
```

---

## 16. Call Handling (Full)

```ts
import { makeCallHandlerAddon } from '@queenanya/baileys'

// Injected into the socket at build time; exposes:
await sock.offerCall(jid, isVideo)
await sock.acceptCall(callId, callFrom)
await sock.terminateCall(callId, callFrom)
await sock.muteCall(callId, callFrom, muted)
await sock.joinCallLink(link)
```

**Source:** innovatorssoft/Baileys (`Socket/messages-recv.js`'s embedded call
block, extracted into `src/addons/call-handler.ts`). Includes
`sanitizeCallerPn` for a Brazilian-landline caller-ID quirk.

---

## 17. JID Utilities & LID Support

```ts
import { getSenderPn, normalizePhoneToJid, plotJid, onWhatsAppWithLidSupport } from '@queenanya/baileys'

const result = await onWhatsAppWithLidSupport(sock, ['1234567890', '5511@lid'])
```

**Source:** `jid-plotting.ts` from innovatorssoft (leaked real `.ts` source,
verified 100% match); LID support from the real
`Baileys-fix-on-whatsapp-lid-support` WhiskeySockets PR branch.

---

## 18. Browser Presets

```ts
import { Browsers } from '@queenanya/baileys'

makeWASocket({ browser: Browsers.android('Chrome') })
makeWASocket({ browser: Browsers.solaris('Chrome') })
```

`solaris` preset is exclusive to this fork (sourced from innovatorssoft).
`android` preset + `ANDROID_PHONE` PlatformType fallback are from real
WhiskeySockets PR branches (`Baileys-android-browser`,
`InfiniteAPI-feat-android-browser-upstream`).

---

## 19. Miscellaneous PR-Sourced Fixes (real WhiskeySockets PR branches, unmerged upstream)

These are core-file patches, not addons — no import needed, they just work:

- **`past-participants.ts`** helpers for processing `pastParticipants` from
  history sync (PR: `Baileys-pastParticepnts`)
- **Pairing-code queue fix** — waits for `pair-device` stanza before sending
  the pairing IQ (PR: `Baileys-fix-pairing-code`)
- **Username ingestion** — `Contact.username` populated from
  `participant_username`/`username` attrs (PR: `Baileys-username-ingest`)
- **Mex notification dispatch** & **linked-profiles fix** (PRs:
  `Baileys-feat-mex-notification-dispatch`, `Baileys-fix-mex-linked-profiles`)
- **Browser identity in QR pairing data** (PR: `Baileys-feat-add-browser-to-qr`)

---

## 20. WAProto Schema Extensions

74 extra message types beyond real WhiskeySockets/Baileys (61 from
itsliaaa, 13 from innovatorssoft) — bots, polls-add-option, split-payments,
event-invites, chat-theming, subscription/broadcast app-state-sync actions,
and more. **Schema-only** — encode/decode works
(`proto.SplitPaymentMessage.create({...})`), but no `Socket` helper sends
or recognizes them automatically yet. Full list in
[`src/addons/README.md`](src/addons/README.md#waproto-schema-extensions).

---

## Security Fixes (informational — no API surface)

- **`extractVideoThumb`**: FFmpeg invocation switched from shell-string
  `exec()` to argument-array `spawn()`, closing a shell injection vector.
- **`Panoramic Profile Picture`**: fixed wire attribute
  (`type: 'preview'` → `'fullsize'`) that likely caused WhatsApp's server
  to reject/ignore the wide banner image.
- **`peerDependenciesMeta`**: `sharp` is now correctly marked optional
  (was listed as a peer dependency without the `optional: true` flag).
