<h1 align='center'><img alt="Baileys logo" src="https://raw.githubusercontent.com/WhiskeySockets/Baileys/refs/heads/master/Media/logo.png" height="75"/></h1>

<div align='center'>Baileys is a WebSockets-based TypeScript library for interacting with the WhatsApp Web API.</div>

> [!CAUTION]
> NOTICE OF BREAKING CHANGE.
>
> As of 7.0.0, multiple breaking changes were introduced into the library.
>
> Please check out https://whiskey.so/migrate-latest for more information.

# Important Note

This is a temporary README.md, the new guide is in development and will this file will be replaced with .github/README.md (already a default on GitHub).

New guide link: https://baileys.wiki

# About This Fork (@queenanya/baileys)

This is an extended fork built on top of `@whiskeysockets/baileys`.

- **[Fork-Exclusive Features — Usage Guide](#fork-exclusive-features--usage-guide)**
  (below) — code examples for every fork-exclusive feature (rich
  responses, carousels, sticker packs, auto-reply, scheduler, and more).
- **[`src/addons/README.md`](src/addons/README.md)** — per-file source
  attribution and verification notes (which fork, which commit, what was
  checked).

Summary of what's different:

- **35 addon files** (`src/addons/`) — auto-reply, anti-delete, message
  scheduling, JID plotting/LID support, rich responses (tables/lists/code
  blocks/LaTeX), interactive buttons, call handling, chat control
  (typing/pinned/read-receipts), status posting, templates, vCards, SQLite
  & cache-manager auth state, and more. Sourced and function-level
  verified against `innovatorssoft/Baileys`, `itsliaaa/baileys`, and 11
  real WhiskeySockets PR branches.
- **74 extra WAProto message types** (schema-only), reconstructed from
  itsliaaa's and innovatorssoft's proto sources.
- **WhatsApp Username socket** — 9 functions: `checkUsername`, `setUsername`,
  `deleteUsername`, `getMyUsername`, `setUsernamePin`, `findUserByUsername`,
  `fetchContactUsernames`, `checkUsernameMulti`, `getUsernameRecommendations`
  (ported from innovatorssoft/Baileys).
- **Album send** — `sendMessage(jid, { album: [...] })` with proto container +
  sequential media relay, `hasValidAlbumMedia` validation per item,
  configurable `delayMs` (default 800ms).
- **StickerPack full pipeline** — `stickerPackMessage` routing baked into
  `sendMessage` + standalone `prepareStickerPackMessageItsliaaa` builder.
- **Android browser** — `Browsers.android('Chrome')` with ViewOnce receive
  support and experimental-use warning.
- **Proto security** — WAProto globals (`$Object`, `$BigInt`, `$Array` etc.)
  via `$util.global.*` prevent scope shadowing/prototype pollution.
  `protobufjs` upgraded to `^8.7.0`.
- **Advanced single-file auth** — LRUCache (max 20,000) + Mutex +
  debounced atomic write (temp → rename, 3s flush) for crash-safe storage.
- WA Web version pin kept current with the live WhatsApp Web build.
- Security fix: `extractVideoThumb` switched from `exec()` to `spawn()`
  closing a shell injection vector.

## Fork-Exclusive Features — Usage Guide

### 1. Rich AI-Style Responses

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

### 2. Interactive Buttons

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

### 3. Carousel Messages (multi-card, native flow)

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

### 4. Sticker Packs

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

### 5. Newsletter Extensions

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

### 6. Chat History Helpers

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

### 7. Auto-Reply System

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

### 8. Message Scheduler

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

### 9. Anti-Delete

```ts
import { createAntiDeleteHandler, makeInMemoryStore } from '@queenanya/baileys'

const store = makeInMemoryStore()
store.bind(sock.ev)

const antiDelete = createAntiDeleteHandler(store, { notifyJid: yourOwnJid })
sock.ev.on('messages.update', updates => antiDelete.handleUpdates(updates, sock))
```

**Source:** innovatorssoft/Baileys (`src/addons/anti-delete.ts`).

---

### 10. Chat Control (Typing / Pinned Messages / Read Receipts)

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

### 11. Status Posting (StatusHelper)

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

### 12. Message Templates

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

### 13. vCard Contact Builder

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

### 14. Message Search (client-side index)

```ts
import { createMessageSearch } from '@queenanya/baileys'

const search = createMessageSearch(store) // pass your message store
const results = search.searchMessages(jid, 'invoice', { limit: 10 })
```

**Source:** innovatorssoft/Baileys (`src/addons/message-search.ts`).

---

### 15. Alternate Auth State Backends

```ts
import { useSqliteAuthState } from '@queenanya/baileys' // itsliaaa
import { useCacheManagerAuthState } from '@queenanya/baileys' // innovatorssoft — Redis/Memcached/etc via cache-manager v5
import { useMongoFileAuthState } from '@queenanya/baileys'
import { useSingleFileAuthState } from '@queenanya/baileys' // itsliaaa

const { state, saveCreds } = await useSqliteAuthState({ database: './auth.db' })
```

---

### 16. Call Handling (Full)

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

### 17. JID Utilities & LID Support

```ts
import { getSenderPn, normalizePhoneToJid, plotJid, onWhatsAppWithLidSupport } from '@queenanya/baileys'

const result = await onWhatsAppWithLidSupport(sock, ['1234567890', '5511@lid'])
```

**Source:** `jid-plotting.ts` from innovatorssoft (leaked real `.ts` source,
verified 100% match); LID support from the real
`Baileys-fix-on-whatsapp-lid-support` WhiskeySockets PR branch.

---

### 18. Browser Presets

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

### 19. Miscellaneous PR-Sourced Fixes (real WhiskeySockets PR branches, unmerged upstream)

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

### 20. Album Send

Send multiple images/videos as a native WhatsApp album (carousel of media):

```ts
await sock.sendMessage(
	jid,
	{
		album: [
			{ image: { url: 'https://example.com/photo1.jpg' }, caption: 'First photo' },
			{ image: fs.readFileSync('./photo2.png') },
			{ video: { url: 'https://example.com/clip.mp4' }, caption: 'Short clip' }
		]
	},
	{
		delayMs: 800 // delay between each media relay (default: 800ms)
	}
)
```

**How it works:**

1. An `albumMessage` container is sent first (with expected image/video counts)
2. Each media item is then relayed individually, linked back to the parent via `messageAssociation`
3. `hasValidAlbumMedia` validates each item is image or video before sending
4. Invalid items throw `400 Bad Request` instead of silently failing

**Ported from:** `@itsliaaa/baileys`

---

### 21. WhatsApp Username Socket

Full WhatsApp username management — check availability, set, pin, find users:

```ts
// Check if username is available
const result = await sock.checkUsername('myusername')
if (result.available) {
	console.log('Available!')
} else {
	console.log('Taken. Suggestions:', result.suggestions)
}

// Set your username
await sock.setUsername('myusername', {
	source: 'USER_INPUT' // or 'FB', 'IG', 'SUGGESTION'
})

// Get your current username
const username = await sock.getMyUsername()

// Pin username with a PIN (for cross-platform discovery)
await sock.setUsernamePin('1234')

// Find a user by their username (returns their JID)
const user = await sock.findUserByUsername('theirusername')
console.log(user?.jid) // '1234567890@s.whatsapp.net'

// Fetch usernames of known contacts (USync)
const contacts = await sock.fetchContactUsernames('1234567890@s.whatsapp.net', '0987654321@s.whatsapp.net')

// Check multiple usernames at once
const multi = await sock.checkUsernameMulti(['name1', 'name2', 'name3'])

// Delete your username
await sock.deleteUsername()

// Get username recommendations
const recs = await sock.getUsernameRecommendations()
```

> **Note:** `USERNAME_QUERY_IDS` are captured from live WA Web sessions and
> may rotate with WA updates. Use the `proto-extract` tool to refresh them.

**Constants exposed:**

```ts
sock.USERNAME_QUERY_IDS // { CHECK, CHECK_MULTI, SET, GET, GET_RECOMMENDATIONS, PIN_SET }
sock.USERNAME_CHECK_RESULT // { SUCCESS, INVALID }
sock.USERNAME_SOURCE // { FB, IG, USER_INPUT, SUGGESTION }
```

**Ported from:** `innovatorssoft/Baileys` (`Socket/username.js`)

---

### 22. WAProto Schema Extensions

74 extra message types beyond real WhiskeySockets/Baileys (61 from
itsliaaa, 13 from innovatorssoft) — bots, polls-add-option, split-payments,
event-invites, chat-theming, subscription/broadcast app-state-sync actions,
and more. **Schema-only** — encode/decode works
(`proto.SplitPaymentMessage.create({...})`), but no `Socket` helper sends
or recognizes them automatically yet. Full list in
[`src/addons/README.md`](src/addons/README.md#waproto-schema-extensions).

---

## Security Fixes (informational — no API surface)

- **Proto globals** (`$Object`, `$BigInt`, `$Array` etc.): WAProto/index.js
  now accesses all builtins via `$util.global.*` — prevents prototype
  pollution and scope shadowing attacks. `protobufjs` upgraded `^7.5.6` →
  `^8.7.0`. Critical checks (`__proto__` guard + recursion depth limit)
  were already present; globals are the remaining layer. Ported from
  `@biled` (AgusXzz/biled).
- **`extractVideoThumb`**: FFmpeg invocation switched from shell-string
  `exec()` to argument-array `spawn()`, closing a shell injection vector.
- **`Panoramic Profile Picture`**: fixed wire attribute
  (`type: 'preview'` → `'fullsize'`) that likely caused WhatsApp's server
  to reject/ignore the wide banner image.
- **`peerDependenciesMeta`**: `sharp` is now correctly marked optional
  (was listed as a peer dependency without the `optional: true` flag).
- **Single-file auth atomic write**: `useSingleFileAuthState` now writes
  to a `.temp` file first and atomically renames it — prevents partial/corrupt
  auth files on crash mid-write.

# Get Support

If you'd like business to enterprise-level support from Rajeh, the current maintainer of Baileys, you can book a video chat. Book a 1 hour time slot by contacting him on Discord or pre-ordering [here](https://purpshell.dev/book). The earlier you pre-order the better, as his time slots usually fill up very quickly. He offers immense value per hour and will answer all your questions before the time runs out.

If you are a business, we encourage you to contribute back to the high development costs of the project and to feed the maintainers who dump tens of hours a week on this. You can do so by booking meetings or sponsoring below. All support, even in bona fide / contribution hours, is welcome by businesses of all sizes. This is not condoning or endorsing businesses to use the library. See the Disclaimer below.

# Sponsor

If you'd like to financially support this project, you can do so by supporting the current maintainer [here](https://purpshell.dev/sponsor).

# Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates.
The official WhatsApp website can be found at whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.

The maintainers of Baileys do not in any way condone the use of this application in practices that violate the Terms of Service of WhatsApp. The maintainers of this application call upon the personal responsibility of its users to use this application in a fair way, as it is intended to be used.
Use at your own discretion. Do not spam people with this. We discourage any stalkerware, bulk or automated messaging usage.

##

- Baileys does not require Selenium or any other browser to be interface with WhatsApp Web, it does so directly using a **WebSocket**.
- Not running Selenium or Chromium saves you like **half a gig** of ram :/
- Baileys supports interacting with the multi-device & web versions of WhatsApp.
- Thank you to [@pokearaujo](https://github.com/pokearaujo/multidevice) for writing his observations on the workings of WhatsApp Multi-Device. Also, thank you to [@Sigalor](https://github.com/sigalor/whatsapp-web-reveng) for writing his observations on the workings of WhatsApp Web and thanks to [@Rhymen](https://github.com/Rhymen/go-whatsapp/) for the **go** implementation.

> [!IMPORTANT]
> The original repository had to be removed by the original author - we now continue development in this repository here.
> This is the only official repository and is maintained by the community.
> **Join the Discord [here](https://discord.gg/WeJM5FP9GG)**

## Example

Do check out & run [example.ts](Example/example.ts) to see an example usage of the library.
The script covers most common use cases.
To run the example script, download or clone the repo and then type the following in a terminal:

1. `cd path/to/Baileys`
2. `yarn`
3. `yarn example`

## Install

Use the stable version:

```
yarn add @whiskeysockets/baileys
```

Use the edge version (no guarantee of stability, but latest fixes + features)

```
yarn add github:WhiskeySockets/Baileys
```

Then import your code using:

```ts
import makeWASocket from '@whiskeysockets/baileys'
```

# Links

- [Discord](https://discord.gg/WeJM5FP9GG)
- [Docs](https://baileys.wiki/docs/intro/)

# Index

- [Connecting Account](#connecting-account)
  - [Connect with QR-CODE](#starting-socket-with-qr-code)
  - [Connect with Pairing Code](#starting-socket-with-pairing-code)
  - [Receive Full History](#receive-full-history)
- [Important Notes About Socket Config](#important-notes-about-socket-config)
  - [Caching Group Metadata (Recommended)](#caching-group-metadata-recommended)
  - [Improve Retry System & Decrypt Poll Votes](#improve-retry-system--decrypt-poll-votes)
  - [Receive Notifications in Whatsapp App](#receive-notifications-in-whatsapp-app)

- [Save Auth Info](#saving--restoring-sessions)
- [Handling Events](#handling-events)
  - [Example to Start](#example-to-start)
  - [Decrypt Poll Votes](#decrypt-poll-votes)
  - [Summary of Events on First Connection](#summary-of-events-on-first-connection)
- [Implementing a Data Store](#implementing-a-data-store)
- [Whatsapp IDs Explain](#whatsapp-ids-explain)
- [Utility Functions](#utility-functions)
- [Sending Messages](#sending-messages)
  - [Non-Media Messages](#non-media-messages)
    - [Text Message](#text-message)
    - [Quote Message](#quote-message-works-with-all-types)
    - [Mention User](#mention-user-works-with-most-types)
    - [Forward Messages](#forward-messages)
    - [Location Message](#location-message)
    - [Contact Message](#contact-message)
    - [Reaction Message](#reaction-message)
    - [Pin Message](#pin-message)
    - [Poll Message](#poll-message)
  - [Sending with Link Preview](#sending-messages-with-link-previews)
  - [Media Messages](#media-messages)
    - [Gif Message](#gif-message)
    - [Video Message](#video-message)
    - [Audio Message](#audio-message)
    - [Image Message](#image-message)
    - [ViewOnce Message](#view-once-message)
- [Modify Messages](#modify-messages)
  - [Delete Messages (for everyone)](#deleting-messages-for-everyone)
  - [Edit Messages](#editing-messages)
- [Manipulating Media Messages](#manipulating-media-messages)
  - [Thumbnail in Media Messages](#thumbnail-in-media-messages)
  - [Downloading Media Messages](#downloading-media-messages)
  - [Re-upload Media Message to Whatsapp](#re-upload-media-message-to-whatsapp)
- [Reject Call](#reject-call)
- [Send States in Chat](#send-states-in-chat)
  - [Reading Messages](#reading-messages)
  - [Update Presence](#update-presence)
- [Modifying Chats](#modifying-chats)
  - [Archive a Chat](#archive-a-chat)
  - [Mute/Unmute a Chat](#muteunmute-a-chat)
  - [Mark a Chat Read/Unread](#mark-a-chat-readunread)
  - [Delete a Message for Me](#delete-a-message-for-me)
  - [Delete a Chat](#delete-a-chat)
  - [Star/Unstar a Message](#starunstar-a-message)
  - [Disappearing Messages](#disappearing-messages)
- [User Querys](#user-querys)
  - [Check If ID Exists in Whatsapp](#check-if-id-exists-in-whatsapp)
  - [Query Chat History (groups too)](#query-chat-history-groups-too)
  - [Fetch Status](#fetch-status)
  - [Fetch Profile Picture (groups too)](#fetch-profile-picture-groups-too)
  - [Fetch Bussines Profile (such as description or category)](#fetch-bussines-profile-such-as-description-or-category)
  - [Fetch Someone's Presence (if they're typing or online)](#fetch-someones-presence-if-theyre-typing-or-online)
- [Change Profile](#change-profile)
  - [Change Profile Status](#change-profile-status)
  - [Change Profile Name](#change-profile-name)
  - [Change Display Picture (groups too)](#change-display-picture-groups-too)
  - [Remove display picture (groups too)](#remove-display-picture-groups-too)
- [Groups](#groups)
  - [Create a Group](#create-a-group)
  - [Add/Remove or Demote/Promote](#addremove-or-demotepromote)
  - [Change Subject (name)](#change-subject-name)
  - [Change Description](#change-description)
  - [Change Settings](#change-settings)
  - [Leave a Group](#leave-a-group)
  - [Get Invite Code](#get-invite-code)
  - [Revoke Invite Code](#revoke-invite-code)
  - [Join Using Invitation Code](#join-using-invitation-code)
  - [Get Group Info by Invite Code](#get-group-info-by-invite-code)
  - [Query Metadata (participants, name, description...)](#query-metadata-participants-name-description)
  - [Join using groupInviteMessage](#join-using-groupinvitemessage)
  - [Get Request Join List](#get-request-join-list)
  - [Approve/Reject Request Join](#approvereject-request-join)
  - [Get All Participating Groups Metadata](#get-all-participating-groups-metadata)
  - [Toggle Ephemeral](#toggle-ephemeral)
  - [Change Add Mode](#change-add-mode)
- [Privacy](#privacy)
  - [Block/Unblock User](#blockunblock-user)
  - [Get Privacy Settings](#get-privacy-settings)
  - [Get BlockList](#get-blocklist)
  - [Update LastSeen Privacy](#update-lastseen-privacy)
  - [Update Online Privacy](#update-online-privacy)
  - [Update Profile Picture Privacy](#update-profile-picture-privacy)
  - [Update Status Privacy](#update-status-privacy)
  - [Update Read Receipts Privacy](#update-read-receipts-privacy)
  - [Update Groups Add Privacy](#update-groups-add-privacy)
  - [Update Default Disappearing Mode](#update-default-disappearing-mode)
- [Broadcast Lists & Stories](#broadcast-lists--stories)
  - [Send Broadcast & Stories](#send-broadcast--stories)
  - [Query a Broadcast List's Recipients & Name](#query-a-broadcast-lists-recipients--name)
- [Writing Custom Functionality](#writing-custom-functionality)
  - [Enabling Debug Level in Baileys Logs](#enabling-debug-level-in-baileys-logs)
  - [How Whatsapp Communicate With Us](#how-whatsapp-communicate-with-us)
  - [Register a Callback for Websocket Events](#register-a-callback-for-websocket-events)

## Connecting Account

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code** with WhatsApp on your phone.

> [!NOTE]
> **[Here](#example-to-start) is a simple example of event handling**

> [!TIP]
> **You can see all supported socket configs in the [SocketConfig type alias](https://baileys.wiki/docs/api/type-aliases/SocketConfig/) (Recommended)**

### Starting socket with **QR-CODE**

> [!TIP]
> You can customize browser name if you connect with **QR-CODE**, with `Browser` constant, we have some browsers config, **see the [BrowsersMap type alias](https://baileys.wiki/docs/api/type-aliases/BrowsersMap/)**

```ts
import makeWASocket from '@whiskeysockets/baileys'

const sock = makeWASocket({
	// can provide additional config here
	browser: Browsers.ubuntu('My App'),
	printQRInTerminal: true
})
```

If the connection is successful, you will see a QR code printed on your terminal screen, scan it with WhatsApp on your phone and you'll be logged in!

### Starting socket with **Pairing Code**

> [!IMPORTANT]
> Pairing Code isn't Mobile API, it's a method to connect Whatsapp Web without QR-CODE, you can connect only with one device, see [here](https://faq.whatsapp.com/1324084875126592/?cms_platform=web)

The phone number can't have `+` or `()` or `-`, only numbers, you must provide country code

```ts
import makeWASocket from '@whiskeysockets/baileys'

const sock = makeWASocket({
	// can provide additional config here
	printQRInTerminal: false //need to be false
})

if (!sock.authState.creds.registered) {
	const number = 'XXXXXXXXXXX'
	const code = await sock.requestPairingCode(number)
	console.log(code)
}
```

### Receive Full History

1. Set `syncFullHistory` as `true`
2. Baileys, by default, use chrome browser config
   - If you'd like to emulate a desktop connection (and receive more message history), this browser setting to your Socket config:

```ts
const sock = makeWASocket({
	...otherOpts,
	// can use Windows, Ubuntu here too
	browser: Browsers.macOS('Desktop'),
	syncFullHistory: true
})
```

## Important Notes About Socket Config

### Caching Group Metadata (Recommended)

- If you use baileys for groups, we recommend you to set `cachedGroupMetadata` in socket config, you need to implement a cache like this:

  ```ts
  const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false })

  const sock = makeWASocket({
  	cachedGroupMetadata: async jid => groupCache.get(jid)
  })

  sock.ev.on('groups.update', async ([event]) => {
  	const metadata = await sock.groupMetadata(event.id)
  	groupCache.set(event.id, metadata)
  })

  sock.ev.on('group-participants.update', async event => {
  	const metadata = await sock.groupMetadata(event.id)
  	groupCache.set(event.id, metadata)
  })
  ```

### Improve Retry System & Decrypt Poll Votes

- If you want to improve sending message, retrying when error occurs and decrypt poll votes, you need to have a store and set `getMessage` config in socket like this:
  ```ts
  const sock = makeWASocket({
  	getMessage: async key => await getMessageFromStore(key)
  })
  ```

### Receive Notifications in Whatsapp App

- If you want to receive notifications in whatsapp app, set `markOnlineOnConnect` to `false`
  ```ts
  const sock = makeWASocket({
  	markOnlineOnConnect: false
  })
  ```

## Saving & Restoring Sessions

You obviously don't want to keep scanning the QR code every time you want to connect.

So, you can load the credentials to log back in:

```ts
import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

// will use the given state to connect
// so if valid credentials are available -- it'll connect without QR
const sock = makeWASocket({ auth: state })

// this will be called as soon as the credentials are updated
sock.ev.on('creds.update', saveCreds)
```

> [!IMPORTANT]
> `useMultiFileAuthState` is a utility function to help save the auth state in a single folder, this function serves as a good guide to help write auth & key states for SQL/no-SQL databases, which I would recommend in any production grade system.

> [!NOTE]
> When a message is received/sent, due to signal sessions needing updating, the auth keys (`authState.keys`) will update. Whenever that happens, you must save the updated keys (`authState.keys.set()` is called). Not doing so will prevent your messages from reaching the recipient & cause other unexpected consequences. The `useMultiFileAuthState` function automatically takes care of that, but for any other serious implementation -- you will need to be very careful with the key state management.

## Handling Events

- Baileys uses the EventEmitter syntax for events.
  They're all nicely typed up, so you shouldn't have any issues with an Intellisense editor like VS Code.

> [!IMPORTANT]
> **The events are in the [BaileysEventMap type alias](https://baileys.wiki/docs/api/type-aliases/BaileysEventMap/)**, it's important you see all events

You can listen to these events like this:

```ts
const sock = makeWASocket()
sock.ev.on('messages.upsert', ({ messages }) => {
	console.log('got messages', messages)
})
```

### Example to Start

> [!NOTE]
> This example includes basic auth storage too

> [!NOTE]
> For reliable serialization of the authentication state, especially when storing as JSON, always use the BufferJSON utility.

```ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp() {
	const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
	const sock = makeWASocket({
		// can provide additional config here
		auth: state,
		printQRInTerminal: true
	})
	sock.ev.on('connection.update', update => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
			console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
			// reconnect if not logged out
			if (shouldReconnect) {
				connectToWhatsApp()
			}
		} else if (connection === 'open') {
			console.log('opened connection')
		}
	})
	sock.ev.on('messages.upsert', event => {
		for (const m of event.messages) {
			console.log(JSON.stringify(m, undefined, 2))

			console.log('replying to', m.key.remoteJid)
			await sock.sendMessage(m.key.remoteJid!, { text: 'Hello Word' })
		}
	})

	// to storage creds (session info) when it updates
	sock.ev.on('creds.update', saveCreds)
}
// run in main file
connectToWhatsApp()
```

> [!IMPORTANT]
> In `messages.upsert` it's recommended to use a loop like `for (const message of event.messages)` to handle all messages in array

### Decrypt Poll Votes

- By default poll votes are encrypted and handled in `messages.update`
- That's a simple example

```ts
sock.ev.on('messages.update', event => {
	for (const { key, update } of event) {
		if (update.pollUpdates) {
			const pollCreation = await getMessage(key)
			if (pollCreation) {
				console.log(
					'got poll update, aggregation: ',
					getAggregateVotesInPollMessage({
						message: pollCreation,
						pollUpdates: update.pollUpdates
					})
				)
			}
		}
	}
})
```

- `getMessage` is a [store](#implementing-a-data-store) implementation (in your end)

### Summary of Events on First Connection

1. When you connect first time, `connection.update` will be fired requesting you to restart sock
2. Then, history messages will be received in `messaging.history-set`

## Implementing a Data Store

- Baileys does not come with a defacto storage for chats, contacts, or messages. However, a simple in-memory implementation has been provided. The store listens for chat updates, new messages, message updates, etc., to always have an up-to-date version of the data.

> [!IMPORTANT]
> I highly recommend building your own data store, as storing someone's entire chat history in memory is a terrible waste of RAM.

It can be used as follows:

```ts
import makeWASocket, { makeInMemoryStore } from '@whiskeysockets/baileys'
// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = makeInMemoryStore({})
// can be read from a file
store.readFromFile('./baileys_store.json')
// saves the state to a file every 10s
setInterval(() => {
	store.writeToFile('./baileys_store.json')
}, 10_000)

const sock = makeWASocket({})
// will listen from this socket
// the store can listen from a new socket once the current socket outlives its lifetime
store.bind(sock.ev)

sock.ev.on('chats.upsert', () => {
	// can use 'store.chats' however you want, even after the socket dies out
	// 'chats' => a KeyedDB instance
	console.log('got chats', store.chats.all())
})

sock.ev.on('contacts.upsert', () => {
	console.log('got contacts', Object.values(store.contacts))
})
```

The store also provides some simple functions such as `loadMessages` that utilize the store to speed up data retrieval.

## Whatsapp IDs Explain

- `id` is the WhatsApp ID, called `jid` too, of the person or group you're sending the message to.
  - It must be in the format `[country code][phone number]@s.whatsapp.net`
    - Example for people: `+19999999999@s.whatsapp.net`.
    - For groups, it must be in the format `123456789-123345@g.us`.
  - For broadcast lists, it's `[timestamp of creation]@broadcast`.
  - For stories, the ID is `status@broadcast`.

## Utility Functions

- `getContentType`, returns the content type for any message
- `getDevice`, returns the device from message
- `makeCacheableSignalKeyStore`, make auth store more fast
- `downloadContentFromMessage`, download content from any message

## Sending Messages

- Send all types of messages with a single function
  - **In the [AnyMessageContent type alias](https://baileys.wiki/docs/api/type-aliases/AnyMessageContent/) you can see all message contents supported, like text message**
  - **In the [MiscMessageGenerationOptions type alias](https://baileys.wiki/docs/api/type-aliases/MiscMessageGenerationOptions/) you can see all options supported, like quote message**

  ```ts
  const jid: string
  const content: AnyMessageContent
  const options: MiscMessageGenerationOptions

  sock.sendMessage(jid, content, options)
  ```

### Non-Media Messages

#### Text Message

```ts
await sock.sendMessage(jid, { text: 'hello word' })
```

#### Quote Message (works with all types)

```ts
await sock.sendMessage(jid, { text: 'hello word' }, { quoted: message })
```

#### Mention User (works with most types)

- @number is to mention in text, it's optional

```ts
await sock.sendMessage(jid, {
	text: '@12345678901',
	mentions: ['12345678901@s.whatsapp.net']
})
```

#### Forward Messages

- You need to have message object, can be retrieved from [store](#implementing-a-data-store) or use a [message](https://baileys.wiki/docs/api/type-aliases/WAMessage/) object

```ts
const msg = getMessageFromStore() // implement this on your end
await sock.sendMessage(jid, { forward: msg }) // WA forward the message!
```

#### Location Message

```ts
await sock.sendMessage(jid, {
	location: {
		degreesLatitude: 24.121231,
		degreesLongitude: 55.1121221
	}
})
```

#### Contact Message

```ts
const vcard =
	'BEGIN:VCARD\n' + // metadata of the contact card
	'VERSION:3.0\n' +
	'FN:Jeff Singh\n' + // full name
	'ORG:Ashoka Uni;\n' + // the organization of the contact
	'TEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\n' + // WhatsApp ID + phone number
	'END:VCARD'

await sock.sendMessage(id, {
	contacts: {
		displayName: 'Jeff',
		contacts: [{ vcard }]
	}
})
```

#### Reaction Message

- You need to pass the key of message, you can retrieve from [store](#implementing-a-data-store) or use a [key](https://baileys.wiki/docs/api/type-aliases/WAMessageKey/) object

```ts
await sock.sendMessage(jid, {
	react: {
		text: '💖', // use an empty string to remove the reaction
		key: message.key
	}
})
```

#### Pin Message

- You need to pass the key of message, you can retrieve from [store](#implementing-a-data-store) or use a [key](https://baileys.wiki/docs/api/type-aliases/WAMessageKey/) object

- Time can be:

| Time | Seconds   |
| ---- | --------- |
| 24h  | 86.400    |
| 7d   | 604.800   |
| 30d  | 2.592.000 |

```ts
await sock.sendMessage(
    jid,
    {
        pin: {
            type: 1, // 0 to remove
            time: 86400
            key: message.key
        }
    }
)
```

#### Poll Message

```ts
await sock.sendMessage(
    jid,
    {
        poll: {
            name: 'My Poll',
            values: ['Option 1', 'Option 2', ...],
            selectableCount: 1,
            toAnnouncementGroup: false // or true
        }
    }
)
```

### Sending Messages with Link Previews

1. By default, wa does not have link generation when sent from the web
2. Baileys has a function to generate the content for these link previews
3. To enable this function's usage, add `link-preview-js` as a dependency to your project with `yarn add link-preview-js`
4. Send a link:

```ts
await sock.sendMessage(jid, {
	text: 'Hi, this was sent using https://github.com/whiskeysockets/baileys'
})
```

### Media Messages

Sending media (video, stickers, images) is easier & more efficient than ever.

> [!NOTE]
> In media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly, you can see more in the [WAMediaUpload type alias](https://baileys.wiki/docs/api/type-aliases/WAMediaUpload/)

- When specifying a media url, Baileys never loads the entire buffer into memory; it even encrypts the media as a readable stream.

> [!TIP]
> It's recommended to use Stream or Url to save memory

#### Gif Message

- Whatsapp doesn't support `.gif` files, that's why we send gifs as common `.mp4` video with `gifPlayback` flag

```ts
await sock.sendMessage(jid, {
	video: fs.readFileSync('Media/ma_gif.mp4'),
	caption: 'hello word',
	gifPlayback: true
})
```

#### Video Message

```ts
await sock.sendMessage(id, {
	video: {
		url: './Media/ma_gif.mp4'
	},
	caption: 'hello word',
	ptv: false // if set to true, will send as a `video note`
})
```

#### Audio Message

- To audio message work in all devices you need to convert with some tool like `ffmpeg` with this flags:

  ```bash
      codec: libopus //ogg file
      ac: 1 //one channel
      avoid_negative_ts
      make_zero
  ```

  - Example:

  ```bash
  ffmpeg -i input.mp4 -avoid_negative_ts make_zero -ac 1 output.ogg
  ```

```ts
await sock.sendMessage(jid, {
	audio: {
		url: './Media/audio.mp3'
	},
	mimetype: 'audio/mp4'
})
```

#### Image Message

```ts
await sock.sendMessage(id, {
	image: {
		url: './Media/ma_img.png'
	},
	caption: 'hello word'
})
```

#### View Once Message

- You can send all messages above as `viewOnce`, you only need to pass `viewOnce: true` in content object

```ts
await sock.sendMessage(id, {
	image: {
		url: './Media/ma_img.png'
	},
	viewOnce: true, //works with video, audio too
	caption: 'hello word'
})
```

## Modify Messages

### Deleting Messages (for everyone)

```ts
const msg = await sock.sendMessage(jid, { text: 'hello word' })
await sock.sendMessage(jid, { delete: msg.key })
```

**Note:** deleting for oneself is supported via `chatModify`, see in [this section](#modifying-chats)

### Editing Messages

- You can pass all editable contents here

```ts
await sock.sendMessage(jid, {
	text: 'updated text goes here',
	edit: response.key
})
```

## Manipulating Media Messages

### Thumbnail in Media Messages

- For media messages, the thumbnail can be generated automatically for images & stickers provided you add `jimp` or `sharp` as a dependency in your project using `yarn add jimp` or `yarn add sharp`.
- Thumbnails for videos can also be generated automatically, though, you need to have `ffmpeg` installed on your system.

### Downloading Media Messages

If you want to save the media you received

```ts
import { createWriteStream } from 'fs'
import { downloadMediaMessage, getContentType } from '@whiskeysockets/baileys'

sock.ev.on('messages.upsert', async ({ [m] }) => {
    if (!m.message) return // if there is no text or media message
    const messageType = getContentType(m) // get what type of message it is (text, image, video...)

    // if the message is an image
    if (messageType === 'imageMessage') {
        // download the message
        const stream = await downloadMediaMessage(
            m,
            'stream', // can be 'buffer' too
            { },
            {
                logger,
                // pass this so that baileys can request a reupload of media
                // that has been deleted
                reuploadRequest: sock.updateMediaMessage
            }
        )
        // save to file
        const writeStream = createWriteStream('./my-download.jpeg')
        stream.pipe(writeStream)
    }
}
```

### Re-upload Media Message to Whatsapp

- WhatsApp automatically removes old media from their servers. For the device to access said media -- a re-upload is required by another device that has it. This can be accomplished using:

```ts
await sock.updateMediaMessage(msg)
```

## Reject Call

- You can obtain `callId` and `callFrom` from `call` event

```ts
await sock.rejectCall(callId, callFrom)
```

## Send States in Chat

### Reading Messages

- A set of message [keys](https://baileys.wiki/docs/api/type-aliases/WAMessageKey/) must be explicitly marked read now.
- You cannot mark an entire 'chat' read as it were with Baileys Web.
  This means you have to keep track of unread messages.

```ts
const key: WAMessageKey
// can pass multiple keys to read multiple messages as well
await sock.readMessages([key])
```

The message ID is the unique identifier of the message that you are marking as read.
On a `WAMessage`, the `messageID` can be accessed using `messageID = message.key.id`.

### Update Presence

- `presence` can be one of the values in the [WAPresence type alias](https://baileys.wiki/docs/api/type-aliases/WAPresence/)
- The presence expires after about 10 seconds.
- This lets the person/group with `jid` know whether you're online, offline, typing etc.

```ts
await sock.sendPresenceUpdate('available', jid)
```

> [!NOTE]
> If a desktop client is active, WA doesn't send push notifications to the device. If you would like to receive said notifications -- mark your Baileys client offline using `sock.sendPresenceUpdate('unavailable')`

## Modifying Chats

WA uses an encrypted form of communication to send chat/app updates. This has been implemented mostly and you can send the following updates:

> [!IMPORTANT]
> If you mess up one of your updates, WA can log you out of all your devices and you'll have to log in again.

### Archive a Chat

```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify({ archive: true, lastMessages: [lastMsgInChat] }, jid)
```

### Mute/Unmute a Chat

- Supported times:

| Time   | Miliseconds |
| ------ | ----------- |
| Remove | null        |
| 8h     | 86.400.000  |
| 7d     | 604.800.000 |

```ts
// mute for 8 hours
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)
// unmute
await sock.chatModify({ mute: null }, jid)
```

### Mark a Chat Read/Unread

```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
// mark it unread
await sock.chatModify({ markRead: false, lastMessages: [lastMsgInChat] }, jid)
```

### Delete a Message for Me

```ts
await sock.chatModify(
	{
		clear: {
			messages: [
				{
					id: 'ATWYHDNNWU81732J',
					fromMe: true,
					timestamp: '1654823909'
				}
			]
		}
	},
	jid
)
```

### Delete a Chat

```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify(
	{
		delete: true,
		lastMessages: [
			{
				key: lastMsgInChat.key,
				messageTimestamp: lastMsgInChat.messageTimestamp
			}
		]
	},
	jid
)
```

### Pin/Unpin a Chat

```ts
await sock.chatModify(
	{
		pin: true // or `false` to unpin
	},
	jid
)
```

### Star/Unstar a Message

```ts
await sock.chatModify(
	{
		star: {
			messages: [
				{
					id: 'messageID',
					fromMe: true // or `false`
				}
			],
			star: true // - true: Star Message; false: Unstar Message
		}
	},
	jid
)
```

### Disappearing Messages

- Ephemeral can be:

| Time   | Seconds   |
| ------ | --------- |
| Remove | 0         |
| 24h    | 86.400    |
| 7d     | 604.800   |
| 90d    | 7.776.000 |

- You need to pass in **Seconds**, default is 7 days

```ts
// turn on disappearing messages
await sock.sendMessage(
	jid,
	// this is 1 week in seconds -- how long you want messages to appear for
	{ disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }
)

// will send as a disappearing message
await sock.sendMessage(jid, { text: 'hello' }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })

// turn off disappearing messages
await sock.sendMessage(jid, { disappearingMessagesInChat: false })
```

## User Querys

### Check If ID Exists in Whatsapp

```ts
const [result] = await sock.onWhatsApp(jid)
if (result.exists) console.log(`${jid} exists on WhatsApp, as jid: ${result.jid}`)
```

### Query Chat History (groups too)

- You need to have oldest message in chat

```ts
const msg = await getOldestMessageInChat(jid) // implement this on your end
await sock.fetchMessageHistory(
	50, //quantity (max: 50 per query)
	msg.key,
	msg.messageTimestamp
)
```

- Messages will be received in `messaging.history-set` event

### Fetch Status

```ts
const status = await sock.fetchStatus(jid)
console.log('status: ' + status)
```

### Fetch Profile Picture (groups too)

- To get the display picture of some person/group

```ts
// for low res picture
const ppUrl = await sock.profilePictureUrl(jid)
console.log(ppUrl)

// for high res picture
const ppUrl = await sock.profilePictureUrl(jid, 'image')
```

### Fetch Bussines Profile (such as description or category)

```ts
const profile = await sock.getBusinessProfile(jid)
console.log('business description: ' + profile.description + ', category: ' + profile.category)
```

### Fetch Someone's Presence (if they're typing or online)

```ts
// the presence update is fetched and called here
sock.ev.on('presence.update', console.log)

// request updates for a chat
await sock.presenceSubscribe(jid)
```

## Change Profile

### Change Profile Status

```ts
await sock.updateProfileStatus('Hello World!')
```

### Change Profile Name

```ts
await sock.updateProfileName('My name')
```

### Change Display Picture (groups too)

- To change your display picture or a group's

> [!NOTE]
> Like media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly, you can see more in the [WAMediaUpload type alias](https://baileys.wiki/docs/api/type-aliases/WAMediaUpload/)

```ts
await sock.updateProfilePicture(jid, { url: './new-profile-picture.jpeg' })
```

### Remove display picture (groups too)

```ts
await sock.removeProfilePicture(jid)
```

## Groups

- To change group properties you need to be admin

### Create a Group

```ts
// title & participants
const group = await sock.groupCreate('My Fab Group', ['1234@s.whatsapp.net', '4564@s.whatsapp.net'])
console.log('created group with id: ' + group.gid)
await sock.sendMessage(group.id, { text: 'hello there' }) // say hello to everyone on the group
```

### Add/Remove or Demote/Promote

```ts
// id & people to add to the group (will throw error if it fails)
await sock.groupParticipantsUpdate(
	jid,
	['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'],
	'add' // replace this parameter with 'remove' or 'demote' or 'promote'
)
```

### Change Subject (name)

```ts
await sock.groupUpdateSubject(jid, 'New Subject!')
```

### Change Description

```ts
await sock.groupUpdateDescription(jid, 'New Description!')
```

### Change Settings

```ts
// only allow admins to send messages
await sock.groupSettingUpdate(jid, 'announcement')
// allow everyone to send messages
await sock.groupSettingUpdate(jid, 'not_announcement')
// allow everyone to modify the group's settings -- like display picture etc.
await sock.groupSettingUpdate(jid, 'unlocked')
// only allow admins to modify the group's settings
await sock.groupSettingUpdate(jid, 'locked')
```

### Leave a Group

```ts
// will throw error if it fails
await sock.groupLeave(jid)
```

### Get Invite Code

- To create link with code use `'https://chat.whatsapp.com/' + code`

```ts
const code = await sock.groupInviteCode(jid)
console.log('group code: ' + code)
```

### Revoke Invite Code

```ts
const code = await sock.groupRevokeInvite(jid)
console.log('New group code: ' + code)
```

### Join Using Invitation Code

- Code can't have `https://chat.whatsapp.com/`, only code

```ts
const response = await sock.groupAcceptInvite(code)
console.log('joined to: ' + response)
```

### Get Group Info by Invite Code

```ts
const response = await sock.groupGetInviteInfo(code)
console.log('group information: ' + response)
```

### Query Metadata (participants, name, description...)

```ts
const metadata = await sock.groupMetadata(jid)
console.log(metadata.id + ', title: ' + metadata.subject + ', description: ' + metadata.desc)
```

### Join using `groupInviteMessage`

```ts
const response = await sock.groupAcceptInviteV4(jid, groupInviteMessage)
console.log('joined to: ' + response)
```

### Get Request Join List

```ts
const response = await sock.groupRequestParticipantsList(jid)
console.log(response)
```

### Approve/Reject Request Join

```ts
const response = await sock.groupRequestParticipantsUpdate(
	jid, // group id
	['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'],
	'approve' // or 'reject'
)
console.log(response)
```

### Get All Participating Groups Metadata

```ts
const response = await sock.groupFetchAllParticipating()
console.log(response)
```

### Toggle Ephemeral

- Ephemeral can be:

| Time   | Seconds   |
| ------ | --------- |
| Remove | 0         |
| 24h    | 86.400    |
| 7d     | 604.800   |
| 90d    | 7.776.000 |

```ts
await sock.groupToggleEphemeral(jid, 86400)
```

### Change Add Mode

```ts
await sock.groupMemberAddMode(
	jid,
	'all_member_add' // or 'admin_add'
)
```

## Privacy

### Block/Unblock User

```ts
await sock.updateBlockStatus(jid, 'block') // Block user
await sock.updateBlockStatus(jid, 'unblock') // Unblock user
```

### Get Privacy Settings

```ts
const privacySettings = await sock.fetchPrivacySettings(true)
console.log('privacy settings: ' + privacySettings)
```

### Get BlockList

```ts
const response = await sock.fetchBlocklist()
console.log(response)
```

### Update LastSeen Privacy

```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateLastSeenPrivacy(value)
```

### Update Online Privacy

```ts
const value = 'all' // 'match_last_seen'
await sock.updateOnlinePrivacy(value)
```

### Update Profile Picture Privacy

```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateProfilePicturePrivacy(value)
```

### Update Status Privacy

```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateStatusPrivacy(value)
```

### Update Read Receipts Privacy

```ts
const value = 'all' // 'none'
await sock.updateReadReceiptsPrivacy(value)
```

### Update Groups Add Privacy

```ts
const value = 'all' // 'contacts' | 'contact_blacklist'
await sock.updateGroupsAddPrivacy(value)
```

### Update Default Disappearing Mode

- Like [this](#disappearing-messages), ephemeral can be:

| Time   | Seconds   |
| ------ | --------- |
| Remove | 0         |
| 24h    | 86.400    |
| 7d     | 604.800   |
| 90d    | 7.776.000 |

```ts
const ephemeral = 86400
await sock.updateDefaultDisappearingMode(ephemeral)
```

## Broadcast Lists & Stories

### Send Broadcast & Stories

- Messages can be sent to broadcasts & stories. You need to add the following message options in sendMessage, like this:

```ts
await sock.sendMessage(
	jid,
	{
		image: {
			url: url
		},
		caption: caption
	},
	{
		backgroundColor: backgroundColor,
		font: font,
		statusJidList: statusJidList,
		broadcast: true
	}
)
```

- Message body can be a `extendedTextMessage` or `imageMessage` or `videoMessage` or `voiceMessage`, see the [AnyRegularMessageContent type alias](https://baileys.wiki/docs/api/type-aliases/AnyRegularMessageContent/)
- You can add `backgroundColor` and other options in the message options, see the [MiscMessageGenerationOptions type alias](https://baileys.wiki/docs/api/type-aliases/MiscMessageGenerationOptions/)
- `broadcast: true` enables broadcast mode
- `statusJidList`: a list of people that you can get which you need to provide, which are the people who will get this status message.

- You can send messages to broadcast lists the same way you send messages to groups & individual chats.
- Right now, WA Web does not support creating broadcast lists, but you can still delete them.
- Broadcast IDs are in the format `12345678@broadcast`

### Query a Broadcast List's Recipients & Name

```ts
const bList = await sock.getBroadcastListInfo('1234@broadcast')
console.log(`list name: ${bList.name}, recps: ${bList.recipients}`)
```

## Writing Custom Functionality

Baileys is written with custom functionality in mind. Instead of forking the project & re-writing the internals, you can simply write your own extensions.

### Enabling Debug Level in Baileys Logs

First, enable the logging of unhandled messages from WhatsApp by setting:

```ts
const sock = makeWASocket({
	logger: P({ level: 'debug' })
})
```

This will enable you to see all sorts of messages WhatsApp sends in the console.

### How Whatsapp Communicate With Us

> [!TIP]
> If you want to learn whatsapp protocol, we recommend to study about Libsignal Protocol and Noise Protocol

- **Example:** Functionality to track the battery percentage of your phone. You enable logging and you'll see a message about your battery pop up in the console:
  ```
  {
      "level": 10,
      "fromMe": false,
      "frame": {
          "tag": "ib",
          "attrs": {
              "from": "@s.whatsapp.net"
          },
          "content": [
              {
                  "tag": "edge_routing",
                  "attrs": {},
                  "content": [
                      {
                          "tag": "routing_info",
                          "attrs": {},
                          "content": {
                              "type": "Buffer",
                              "data": [8,2,8,5]
                          }
                      }
                  ]
              }
          ]
      },
      "msg":"communication"
  }
  ```

The `'frame'` is what the message received is, it has three components:

- `tag` -- what this frame is about (eg. message will have 'message')
- `attrs` -- a string key-value pair with some metadata (contains ID of the message usually)
- `content` -- the actual data (eg. a message node will have the actual message content in it)
- read more about this format [here](/src/WABinary/readme.md)

### Register a Callback for Websocket Events

> [!TIP]
> Recommended to see `onMessageReceived` function in `socket.ts` file to understand how websockets events are fired

```ts
// for any message with tag 'edge_routing'
sock.ws.on('CB:edge_routing', (node: BinaryNode) => {})

// for any message with tag 'edge_routing' and id attribute = abcd
sock.ws.on('CB:edge_routing,id:abcd', (node: BinaryNode) => {})

// for any message with tag 'edge_routing', id attribute = abcd & first content node routing_info
sock.ws.on('CB:edge_routing,id:abcd,routing_info', (node: BinaryNode) => {})
```

# License

Copyright (c) 2025 Rajeh Taher/WhiskeySockets

Licensed under the MIT License:
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Thus, the maintainers of the project can't be held liable for any potential misuse of this project.
