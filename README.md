<h1 align='center'><img alt="Baileys logo" src="https://raw.githubusercontent.com/WhiskeySockets/Baileys/refs/heads/master/Media/logo.png" height="75"/></h1>

<div align='center'>Anya-Bail is a fork of <a href="https://github.com/WhiskeySockets/Baileys">@whiskeysockets/baileys</a> with additional features ported from <a href="https://github.com/innovatorssoft/Baileys">@innovatorssoft/baileys</a>.</div>

<br/>

> [!IMPORTANT]
> Anya-Bail is **WhiskeySockets/Baileys** as the base — extended with innovatorssoft addons, outgoing call support, advanced message types, and more.

## Install

```
yarn add github:YourUser/anya-bail
```

Import in your code:

```ts
import makeWASocket from 'anya-bail'
```

## Example

Check out & run [example.ts](Example/example.ts) to see usage of the library.

```
cd path/to/anya-bail
yarn
yarn example
```

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
  - [Single File Auth State](#single-file-auth-state)
  - [MongoDB Auth State](#mongodb-auth-state)
- [Handling Events](#handling-events)
  - [Example to Start](#example-to-start)
  - [Decrypt Poll Votes](#decrypt-poll-votes)
  - [Auto-Reply System](#auto-reply-system)
  - [Anti-Delete System](#anti-delete-system)
  - [Summary of Events on First Connection](#summary-of-events-on-first-connection)
- [Implementing a Data Store](#implementing-a-data-store)
- [Whatsapp IDs Explain](#whatsapp-ids-explain)
- [Utility Functions](#utility-functions)
  - [Message Scheduler](#message-scheduler)
  - [Message Search](#message-search)
  - [Message Templates](#message-templates)
  - [JID Plotting & LID Support](#jid-plotting--lid-support)
  - [vCard / Contact Card Generator](#vcard--contact-card-generator)
- [Sending Messages](#sending-messages)
  - [Non-Media Messages](#non-media-messages)
    - [Text Message](#text-message)
    - [Quote Message](#quote-message-works-with-all-types)
    - [Mention User](#mention-user-works-with-most-types)
    - [Mention All (@all)](#mention-all-all)
    - [Forward Messages](#forward-messages)
    - [Location Message](#location-message)
    - [Contact Message (vCard)](#contact-message-vcard)
    - [Reaction Message](#reaction-message)
    - [Pin Message](#pin-message)
    - [Poll Message](#poll-message)
  - [Sending with Link Preview](#sending-messages-with-link-previews)
  - [Media Messages](#media-messages)
    - [Image Message](#image-message)
    - [Video Message](#video-message)
    - [Audio Message](#audio-message)
    - [Gif Message](#gif-message)
    - [Document Message](#document-message)
    - [ViewOnce Message](#view-once-message)
    - [Album Message](#album-message)
    - [Sticker Pack Message](#sticker-pack-message)
  - [Button & Interactive Messages](#button--interactive-messages)
    - [Quick Reply Buttons (sendButtons)](#quick-reply-buttons-sendbuttons)
    - [Interactive Buttons (interactiveButtons)](#interactive-buttons-interactivebuttons)
    - [List Message (sections)](#list-message-sections)
    - [Template Buttons](#template-buttons)
    - [Cards / Carousel Message](#cards--carousel-message)
    - [sendInteractiveMessage (Advanced)](#sendinteractivemessage-advanced)
  - [Status / Stories](#status--stories)
    - [Text Status](#text-status)
    - [Image / Video Status](#image--video-status)
    - [Send Status Mentions](#send-status-mentions)
    - [Group Status](#group-status)
  - [Other Message Types](#other-message-types)
    - [Group Invite Message](#group-invite-message)
    - [Admin Invite Message](#admin-invite-message)
    - [Event Message](#event-message)
- [Outgoing Calls](#outgoing-calls)
  - [Initiate a Call](#initiate-a-call)
  - [Accept / Reject a Call](#accept--reject-a-call)
  - [Cancel a Call](#cancel-a-call)
  - [Mute / Unmute in Call](#mute--unmute-in-call)
- [Modify Messages](#modify-messages)
  - [Delete Messages (for everyone)](#deleting-messages-for-everyone)
  - [Edit Messages](#editing-messages)
- [Manipulating Media Messages](#manipulating-media-messages)
  - [Downloading Media Messages](#downloading-media-messages)
  - [Re-upload Media Message to Whatsapp](#re-upload-media-message-to-whatsapp)
- [Send States in Chat](#send-states-in-chat)
  - [Reading Messages](#reading-messages)
  - [Update Presence](#update-presence)
- [Modifying Chats](#modifying-chats)
- [User Querys](#user-querys)
- [Change Profile](#change-profile)
- [Groups](#groups)
- [Privacy](#privacy)
- [Broadcast Lists & Stories](#broadcast-lists--stories)
- [Writing Custom Functionality](#writing-custom-functionality)

---

## Connecting Account

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code**.

### Starting socket with **QR-CODE**

```ts
import makeWASocket, { Browsers } from 'anya-bail'

const sock = makeWASocket({
	browser: Browsers.ubuntu('My App'),
	printQRInTerminal: true
})
```

### Starting socket with **Pairing Code**

> [!IMPORTANT]
> Phone number must not have `+`, `()` or `-`. Include country code.

```ts
import makeWASocket from 'anya-bail'

const sock = makeWASocket({
	printQRInTerminal: false
})

if (!sock.authState.creds.registered) {
	const number = 'XXXXXXXXXXX'
	const code = await sock.requestPairingCode(number)
	console.log(code)
}
```

### Receive Full History

```ts
const sock = makeWASocket({
	browser: Browsers.macOS('Desktop'),
	syncFullHistory: true
})
```

---

## Important Notes About Socket Config

### Caching Group Metadata (Recommended)

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

```ts
const sock = makeWASocket({
	getMessage: async key => await getMessageFromStore(key)
})
```

### Receive Notifications in Whatsapp App

```ts
const sock = makeWASocket({
	markOnlineOnConnect: false
})
```

---

## Saving & Restoring Sessions

### Multi-File Auth State (default)

```ts
import makeWASocket, { useMultiFileAuthState } from 'anya-bail'

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

### Single File Auth State

Stores all credentials in a single JSON file — useful for simpler deployments.

```ts
import makeWASocket from 'anya-bail'
import { useSingleFileAuthState } from 'anya-bail'

const { state, saveCreds } = await useSingleFileAuthState('./auth.json')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

### MongoDB Auth State

Stores credentials in a MongoDB collection — recommended for production.

```ts
import makeWASocket from 'anya-bail'
import { useMongoFileAuthState } from 'anya-bail'
import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const collection = client.db('baileys').collection('auth')

const { state, saveCreds } = await useMongoFileAuthState(collection)
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

---

## Handling Events

```ts
const sock = makeWASocket()
sock.ev.on('messages.upsert', ({ messages }) => {
	console.log('got messages', messages)
})
```

### Example to Start

```ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from 'anya-bail'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp() {
	const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
	const sock = makeWASocket({ auth: state, printQRInTerminal: true })

	sock.ev.on('connection.update', update => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
			if (shouldReconnect) connectToWhatsApp()
		} else if (connection === 'open') {
			console.log('opened connection')
		}
	})

	sock.ev.on('messages.upsert', async event => {
		for (const m of event.messages) {
			console.log(JSON.stringify(m, undefined, 2))
			await sock.sendMessage(m.key.remoteJid!, { text: 'Hello!' })
		}
	})

	sock.ev.on('creds.update', saveCreds)
}

connectToWhatsApp()
```

### Decrypt Poll Votes

```ts
sock.ev.on('messages.update', event => {
	for (const { key, update } of event) {
		if (update.pollUpdates) {
			const pollCreation = await getMessage(key)
			if (pollCreation) {
				console.log(
					'poll update:',
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

### Auto-Reply System

Keyword/pattern-based automatic response handler with cooldowns, group/private filters, and typing simulation.

```ts
import { createAutoReply } from 'anya-bail'

const autoReply = createAutoReply((jid, content) => sock.sendMessage(jid, content), {
	simulateTyping: true,
	typingDuration: 1000,
	globalCooldown: 2000
})

// Add a keyword rule
autoReply.addRule({
	keywords: ['hello', 'hi'],
	response: { text: 'Hello! How can I help?' },
	cooldown: 5000
})

// Add a regex rule
autoReply.addRule({
	pattern: /^!ping$/i,
	response: { text: 'Pong! 🏓' },
	quoted: true
})

// Add a dynamic response
autoReply.addRule({
	keywords: ['time'],
	response: async msg => ({ text: `Current time: ${new Date().toLocaleString()}` })
})

// Process incoming messages
sock.ev.on('messages.upsert', async ({ messages }) => {
	for (const msg of messages) {
		if (!msg.key.fromMe) await autoReply.process(msg)
	}
})
```

### Anti-Delete System

Store messages and detect/recover deleted messages.

```ts
import { MessageStore, createAntiDeleteHandler, createMessageStoreHandler } from 'anya-bail'

const store = new MessageStore({ maxMessagesPerChat: 100, ttl: 24 * 60 * 60 * 1000 })

// Store incoming messages
const storeHandler = createMessageStoreHandler(store)
sock.ev.on('messages.upsert', ({ messages }) => {
	for (const msg of messages) storeHandler(msg)
})

// Detect deletions
const antiDelete = createAntiDeleteHandler(store)
sock.ev.on('messages.update', async updates => {
	for (const update of updates) {
		const deleted = antiDelete(update)
		if (deleted) {
			console.log('Message was deleted:', deleted.originalMessage)
			// Re-send the deleted message
			await sock.sendMessage(deleted.originalMessage.key.remoteJid!, { forward: deleted.originalMessage })
		}
	}
})
```

### Summary of Events on First Connection

1. `connection.update` fires requesting you to restart sock
2. History messages received in `messaging.history-set`

---

## Implementing a Data Store

```ts
import makeWASocket, { makeInMemoryStore } from 'anya-bail'

const store = makeInMemoryStore({})
store.readFromFile('./baileys_store.json')
setInterval(() => store.writeToFile('./baileys_store.json'), 10_000)

const sock = makeWASocket({})
store.bind(sock.ev)
```

---

## Whatsapp IDs Explain

- User: `[country code][phone]@s.whatsapp.net` → `19999999999@s.whatsapp.net`
- Group: `123456789-123345@g.us`
- Broadcast: `[timestamp]@broadcast`
- Status/Stories: `status@broadcast`

---

## Utility Functions

- `getContentType` — returns the content type for any message
- `getDevice` — returns the device from message ID
- `makeCacheableSignalKeyStore` — make auth store faster
- `downloadContentFromMessage` — download content from any message
- `getMediaType` — returns media type string from `proto.IMessage`
- `getMessageType` — returns message category (text/media/poll/reaction/event)
- `getButtonType` — detects button/interactive message type (`list|buttons|native_flow`)
- `getButtonArgs` — builds the `<biz>` binary node for button messages

### Message Scheduler

Schedule messages to be sent at a future time or after a delay.

```ts
import { createMessageScheduler } from 'anya-bail'

const scheduler = createMessageScheduler((jid, content) => sock.sendMessage(jid, content), {
	maxQueue: 1000,
	onSent: scheduled => console.log('Sent:', scheduled.id),
	onFailed: (scheduled, err) => console.error('Failed:', err)
})

// Schedule at a specific time
const id = scheduler.schedule('jid@s.whatsapp.net', { text: 'Good morning!' }, new Date('2025-01-01T08:00:00'))

// Schedule after a delay (ms)
scheduler.scheduleDelay('jid@s.whatsapp.net', { text: 'Reminder!' }, 5 * 60 * 1000)

// Cancel
scheduler.cancel(id)

// List pending
const pending = scheduler.getPending()
console.log(pending)
```

### Message Search

Search through stored messages by keyword, regex, sender, date range, or type.

```ts
import { MessageSearchManager } from 'anya-bail'

const search = new MessageSearchManager()

// Add messages to index
sock.ev.on('messages.upsert', ({ messages }) => {
	search.addMessages(messages)
})

// Search by keyword
const results = search.search('hello', {
	jid: 'jid@s.whatsapp.net',
	limit: 20,
	caseSensitive: false
})

// Search by regex
const regexResults = search.searchRegex(/order #\d+/i)

// Filter by type
const images = search.getByType('image')
const texts = search.getByType('text')

// Get by JID
const chatMessages = search.getByJid('jid@s.whatsapp.net')

console.log(`Found ${results.length} results`)
```

### Message Templates

Create reusable text templates with `{{variable}}` placeholders.

```ts
import { createTemplateManager, renderTemplate } from 'anya-bail'

const tm = createTemplateManager()

// Create a template
tm.create({
	name: 'welcome',
	content: 'Hello {{name}}! Welcome to {{group}}. Your code is {{code:NONE}}.'
})

// Render it
const text = tm.render('welcome-id', {
	name: 'Alice',
	group: 'Dev Chat',
	code: 'XYZ99'
})
await sock.sendMessage(jid, { text })

// Quick one-off render (no storage)
const msg = renderTemplate('Hi {{name}}, your order {{id}} is ready!', {
	name: 'Bob',
	id: '#1234'
})
await sock.sendMessage(jid, { text: msg })
```

### JID Plotting & LID Support

Parse, decode, and resolve WhatsApp JIDs including LID (Linked ID) mapping.

```ts
import { parseJid, plotJid, getSenderPn } from 'anya-bail'

// Parse any JID
const info = parseJid('19999999999@s.whatsapp.net')
console.log(info)
// { jid, user, server, isLid, isPn, isGroup, isNewsletter, normalizedUser, ... }

// Plot a JID (resolve pn/lid)
const plotted = plotJid('19999999999@s.whatsapp.net')
console.log(plotted.primary) // normalized primary JID

// Get current session's sender info
const senderInfo = getSenderPn(sock.authState.creds)
console.log(senderInfo?.phoneNumber) // '+19999999999'
```

### vCard / Contact Card Generator

Generate properly formatted vCards for contact messages.

```ts
import { generateVCard, createContactCard, quickContact } from 'anya-bail'

// Full vCard
const vcard = generateVCard({
	fullName: 'John Doe',
	phones: [{ number: '+919876543210', type: 'CELL' }],
	emails: [{ email: 'john@example.com', type: 'WORK' }],
	organization: 'Acme Corp'
})

await sock.sendMessage(jid, {
	contacts: {
		displayName: 'John Doe',
		contacts: [{ vcard }]
	}
})

// Quick one-liner
await sock.sendMessage(jid, quickContact('Jane Smith', '+911234567890'))
```

---

## Sending Messages

```ts
const jid: string
const content: AnyMessageContent
const options: MiscMessageGenerationOptions

sock.sendMessage(jid, content, options)
```

### Non-Media Messages

#### Text Message

```ts
await sock.sendMessage(jid, { text: 'hello world' })
```

#### Quote Message (works with all types)

```ts
await sock.sendMessage(jid, { text: 'hello world' }, { quoted: message })
```

#### Mention User (works with most types)

```ts
await sock.sendMessage(jid, {
	text: '@19999999999',
	mentions: ['19999999999@s.whatsapp.net']
})
```

#### Mention All (@all)

```ts
await sock.sendMessage(jid, {
	text: '@all please read this!',
	mentionAll: true
})
```

#### Forward Messages

```ts
const msg = getMessageFromStore() // from your store
await sock.sendMessage(jid, { forward: msg })
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

#### Contact Message (vCard)

```ts
const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Jeff Singh\nTEL;waid=911234567890:+91 12345 67890\nEND:VCARD'

await sock.sendMessage(jid, {
	contacts: {
		displayName: 'Jeff',
		contacts: [{ vcard }]
	}
})
```

#### Reaction Message

```ts
await sock.sendMessage(jid, {
	react: {
		text: '💖', // empty string to remove
		key: message.key
	}
})
```

#### Pin Message

| Time | Seconds |
| ---- | ------- |
| 24h  | 86400   |
| 7d   | 604800  |
| 30d  | 2592000 |

```ts
await sock.sendMessage(jid, {
	pin: message.key,
	type: 1, // 0 to unpin
	time: 86400
})
```

#### Poll Message

```ts
await sock.sendMessage(jid, {
	poll: {
		name: 'Favourite color?',
		values: ['Red', 'Blue', 'Green'],
		selectableCount: 1
	}
})
```

---

### Sending Messages with Link Previews

Install `link-preview-js`:

```bash
yarn add link-preview-js
```

```ts
await sock.sendMessage(jid, {
	text: 'Check this out: https://github.com/WhiskeySockets/Baileys'
})
```

---

### Media Messages

> [!NOTE]
> You can pass `{ stream: Stream }`, `{ url: 'https://...' }`, or a `Buffer` for any media.

#### Image Message

```ts
await sock.sendMessage(jid, {
	image: { url: './Media/photo.png' },
	caption: 'hello world'
})
```

#### Video Message

```ts
await sock.sendMessage(jid, {
	video: { url: './Media/video.mp4' },
	caption: 'hello world',
	ptv: false // set true to send as video note
})
```

#### Audio Message

```ts
await sock.sendMessage(jid, {
	audio: { url: './Media/audio.mp3' },
	mimetype: 'audio/mp4'
})
```

#### Gif Message

```ts
await sock.sendMessage(jid, {
	video: fs.readFileSync('Media/animation.mp4'),
	caption: 'hello world',
	gifPlayback: true
})
```

#### Document Message

```ts
await sock.sendMessage(jid, {
	document: { url: './report.pdf' },
	mimetype: 'application/pdf',
	fileName: 'report.pdf'
})
```

#### View Once Message

```ts
await sock.sendMessage(jid, {
	image: { url: './Media/photo.png' },
	viewOnce: true,
	caption: 'disappears after viewing'
})
```

#### Album Message

Send multiple images/videos grouped as an album.

```ts
await sock.sendMessage(jid, {
	album: [
		{ image: { url: 'https://example.com/photo1.jpg' }, caption: 'Photo 1' },
		{ image: { url: 'https://example.com/photo2.jpg' }, caption: 'Photo 2' },
		{ video: { url: 'https://example.com/clip.mp4' }, caption: 'Video 1' }
	]
})
```

#### Sticker Pack Message

Send a WhatsApp sticker pack (multiple stickers bundled).

```ts
await sock.sendMessage(jid, {
	stickerPack: {
		name: 'My Sticker Pack',
		publisher: 'My Name',
		stickers: [
			{ data: fs.readFileSync('./sticker1.webp'), id: 's1', emoji: ['😀'] },
			{ data: fs.readFileSync('./sticker2.webp'), id: 's2', emoji: ['🔥'] }
		]
	}
})
```

---

### Button & Interactive Messages

#### Quick Reply Buttons (sendButtons)

```ts
import { sendButtons } from 'anya-bail'

await sendButtons(sock, jid, {
	body: 'Choose an option:',
	footer: 'Powered by Anya',
	buttons: [
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Yes', id: 'yes' }) },
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'No', id: 'no' }) }
	]
})
```

#### Interactive Buttons (interactiveButtons)

Native-flow buttons — work on iOS and Android.

```ts
// Text body + buttons
await sock.sendMessage(jid, {
	text: 'What would you like to do?',
	footer: 'Choose below',
	interactiveButtons: [
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Option 1', id: 'opt1' }) },
		{ name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Visit', url: 'https://example.com' }) }
	]
})

// Image + buttons
await sock.sendMessage(jid, {
	image: { url: 'https://example.com/banner.jpg' },
	caption: 'Check this out',
	interactiveButtons: [
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Learn More', id: 'learn' }) }
	]
})
```

#### List Message (sections)

```ts
await sock.sendMessage(jid, {
	text: 'Pick a fruit:',
	title: 'Fruit Menu',
	buttonText: 'Open List',
	footer: 'Choose one',
	sections: [
		{
			title: 'Tropical',
			rows: [
				{ rowId: 'mango', title: 'Mango', description: 'Sweet & juicy' },
				{ rowId: 'papaya', title: 'Papaya', description: 'Rich in vitamins' }
			]
		},
		{
			title: 'Berries',
			rows: [
				{ rowId: 'strawberry', title: 'Strawberry' },
				{ rowId: 'blueberry', title: 'Blueberry' }
			]
		}
	]
})
```

#### Template Buttons

```ts
await sock.sendMessage(jid, {
	text: 'Hello! Need help?',
	footer: 'Support Bot',
	templateButtons: [
		{ index: 1, quickReplyButton: { displayText: 'Yes please', id: 'help_yes' } },
		{ index: 2, urlButton: { displayText: 'View Docs', url: 'https://example.com' } },
		{ index: 3, callButton: { displayText: 'Call Us', phoneNumber: '+919999999999' } }
	]
})
```

#### Cards / Carousel Message

Send a horizontal carousel of cards, each with media, body, footer, and buttons.

```ts
await sock.sendMessage(jid, {
	text: 'Choose a product:',
	cards: [
		{
			image: { url: 'https://example.com/product1.jpg' },
			title: 'Product One',
			body: 'Great quality at a great price.',
			footer: '$29.99',
			buttons: [
				{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Buy Now', id: 'buy_p1' }) },
				{
					name: 'cta_url',
					buttonParamsJson: JSON.stringify({ display_text: 'Details', url: 'https://example.com/p1' })
				}
			]
		},
		{
			image: { url: 'https://example.com/product2.jpg' },
			title: 'Product Two',
			body: 'Premium tier.',
			footer: '$59.99',
			buttons: [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Buy Now', id: 'buy_p2' }) }]
		}
	]
})
```

#### sendInteractiveMessage (Advanced)

Low-level power function for full control over interactive messages.

```ts
import { sendInteractiveMessage } from 'anya-bail'

await sendInteractiveMessage(sock, jid, {
	body: 'Choose your plan',
	footer: 'Anya Bot',
	header: { title: 'Subscription', hasMediaAttachment: false },
	buttons: [
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Basic', id: 'plan_basic' }) },
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Pro', id: 'plan_pro' }) },
		{ name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Learn More', url: 'https://example.com' }) }
	]
})
```

---

### Status / Stories

#### Text Status

```ts
import { createTextStatus, STATUS_BACKGROUNDS, STATUS_FONTS } from 'anya-bail'

const status = createTextStatus({
	text: 'Hello World! 🌍',
	backgroundColor: STATUS_BACKGROUNDS.solid.green,
	font: STATUS_FONTS.SANS_SERIF,
	textColor: '#FFFFFF'
})

await sock.sendMessage('status@broadcast', status, {
	statusJidList: ['19999999999@s.whatsapp.net'],
	broadcast: true
})
```

#### Image / Video Status

```ts
import { createImageStatus, createVideoStatus, createAudioStatus } from 'anya-bail'

// Image
const imgStatus = createImageStatus({ url: './photo.jpg' }, { caption: 'Good morning!' })

// Video
const vidStatus = createVideoStatus({ url: './clip.mp4' }, { caption: 'Watch this!' })

// Voice note
const audioStatus = createAudioStatus(fs.readFileSync('./audio.ogg'))

await sock.sendMessage('status@broadcast', imgStatus, {
	statusJidList: ['19999999999@s.whatsapp.net']
})
```

#### Send Status Mentions

Send a status/story and tag specific users or groups. Group members are resolved automatically.

```ts
await sock.sendStatusMentions(
	{
		text: 'Hello everyone!',
		backgroundColor: '#25D366'
	},
	[
		'19999999999@s.whatsapp.net', // individual user
		'120363xxxxxxxx@g.us' // whole group
	]
)
```

#### Group Status

Send a status visible only to a specific group's members.

```ts
await sock.sendMessage('120363xxxxxxxx@g.us', {
	text: 'Group update!',
	groupStatus: true
})

// With media
await sock.sendMessage('120363xxxxxxxx@g.us', {
	image: { url: './announcement.jpg' },
	caption: 'Important announcement',
	groupStatus: true
})
```

---

### Other Message Types

#### Group Invite Message

```ts
const code = await sock.groupInviteCode(groupJid)

await sock.sendMessage(jid, {
	groupInvite: {
		jid: groupJid,
		inviteCode: code,
		inviteExpiration: Date.now() + 7 * 24 * 60 * 60 * 1000,
		subject: 'My Group',
		text: 'Join our group!'
	}
})
```

#### Admin Invite Message

Invite someone to become a newsletter admin.

```ts
await sock.sendMessage(jid, {
	adminInvite: {
		newsletterJid: 'newsletter-jid@newsletter',
		newsletterName: 'My Channel',
		inviteExpiration: Date.now() + 3 * 24 * 60 * 60 * 1000
	}
})
```

#### Event Message

```ts
await sock.sendMessage(jid, {
	event: {
		name: 'Team Meetup',
		description: 'Monthly sync meeting',
		startDate: new Date('2025-02-01T10:00:00'),
		endDate: new Date('2025-02-01T11:00:00'),
		location: 'Conference Room A',
		extraGuestsAllowed: true
	}
})
```

---

## Outgoing Calls

Initiate, manage, and terminate outgoing voice and video calls.

> [!NOTE]
> Inject `makeCallHandlerAddon` into your socket to expose call methods.

```ts
import { makeCallHandlerAddon } from 'anya-bail'
// (called internally via from-messages-recv.ts makeCallHandlers)
```

### Initiate a Call

```ts
// Voice call
const { callId, to } = await sock.initiateCall(jid)

// Video call
const { callId, to } = await sock.initiateCall(jid, { isVideo: true })
```

### Accept / Reject a Call

```ts
// Accept incoming call (from 'call' event)
sock.ev.on('call', async ([call]) => {
	if (call.status === 'offer') {
		await sock.acceptCall(call.id, call.from, call.isVideo)
	}
})

// Reject incoming call
await sock.rejectCall(callId, callFrom)
```

### Cancel a Call

```ts
await sock.cancelCall(callId, callTo)
```

### Mute / Unmute in Call

```ts
await sock.muteCall(callId, callCreator, to, true) // mute
await sock.muteCall(callId, callCreator, to, false) // unmute
```

---

## Modify Messages

### Deleting Messages (for everyone)

```ts
const msg = await sock.sendMessage(jid, { text: 'hello world' })
await sock.sendMessage(jid, { delete: msg.key })
```

### Editing Messages

```ts
await sock.sendMessage(jid, {
	text: 'updated text',
	edit: response.key
})
```

---

## Manipulating Media Messages

### Downloading Media Messages

```ts
import { createWriteStream } from 'fs'
import { downloadMediaMessage } from 'anya-bail'

sock.ev.on('messages.upsert', async ({ messages: [m] }) => {
	if (!m.message) return
	if (m.message.imageMessage) {
		const stream = await downloadMediaMessage(
			m,
			'stream',
			{},
			{
				logger,
				reuploadRequest: sock.updateMediaMessage
			}
		)
		stream.pipe(createWriteStream('./download.jpeg'))
	}
})
```

### Re-upload Media Message to Whatsapp

```ts
await sock.updateMediaMessage(msg)
```

---

## Send States in Chat

### Reading Messages

```ts
const key: WAMessageKey
await sock.readMessages([key])
```

### Update Presence

```ts
// 'available' | 'unavailable' | 'composing' | 'recording' | 'paused'
await sock.sendPresenceUpdate('composing', jid)
```

---

## Modifying Chats

```ts
const lastMsg = await getLastMessageInChat(jid)

// Archive
await sock.chatModify({ archive: true, lastMessages: [lastMsg] }, jid)

// Mute 8h
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)

// Mark unread
await sock.chatModify({ markRead: false, lastMessages: [lastMsg] }, jid)

// Delete chat
await sock.chatModify(
	{ delete: true, lastMessages: [{ key: lastMsg.key, messageTimestamp: lastMsg.messageTimestamp }] },
	jid
)

// Pin/unpin
await sock.chatModify({ pin: true }, jid)

// Star message
await sock.chatModify({ star: { messages: [{ id: 'messageID', fromMe: true }], star: true } }, jid)

// Disappearing messages
await sock.sendMessage(jid, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL })
await sock.sendMessage(jid, { text: 'hello' }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
```

---

## User Querys

```ts
// Check if exists
const [result] = await sock.onWhatsApp(jid)
if (result.exists) console.log(`${jid} exists`)

// Fetch history
await sock.fetchMessageHistory(50, msg.key, msg.messageTimestamp)

// Fetch status
const status = await sock.fetchStatus(jid)

// Profile picture
const ppUrl = await sock.profilePictureUrl(jid, 'image')

// Business profile
const profile = await sock.getBusinessProfile(jid)

// Presence
sock.ev.on('presence.update', console.log)
await sock.presenceSubscribe(jid)
```

---

## Change Profile

```ts
await sock.updateProfileStatus('Hello World!')
await sock.updateProfileName('My Name')
await sock.updateProfilePicture(jid, { url: './new-pic.jpeg' })
await sock.removeProfilePicture(jid)
```

---

## Groups

```ts
// Create
const group = await sock.groupCreate('My Group', ['1234@s.whatsapp.net'])

// Add/Remove/Promote/Demote
await sock.groupParticipantsUpdate(jid, ['abcd@s.whatsapp.net'], 'add')

// Settings
await sock.groupUpdateSubject(jid, 'New Name')
await sock.groupUpdateDescription(jid, 'New Desc')
await sock.groupSettingUpdate(jid, 'announcement') // admins only send
await sock.groupSettingUpdate(jid, 'locked') // admins only edit

// Invite
const code = await sock.groupInviteCode(jid)
await sock.groupAcceptInvite(code)

// Ephemeral
await sock.groupToggleEphemeral(jid, 86400) // 24h

// Get all participating
const all = await sock.groupFetchAllParticipating()
```

---

## Privacy

```ts
await sock.updateBlockStatus(jid, 'block')
await sock.updateLastSeenPrivacy('contacts') // 'all' | 'contacts' | 'none'
await sock.updateOnlinePrivacy('all')
await sock.updateProfilePicturePrivacy('contacts')
await sock.updateStatusPrivacy('contacts')
await sock.updateReadReceiptsPrivacy('all')
await sock.updateGroupsAddPrivacy('contacts')
await sock.updateDefaultDisappearingMode(86400)
const settings = await sock.fetchPrivacySettings(true)
const blocklist = await sock.fetchBlocklist()
```

---

## Broadcast Lists & Stories

```ts
await sock.sendMessage(
	'status@broadcast',
	{
		image: { url: 'https://example.com/image.jpg' },
		caption: 'Good morning!'
	},
	{
		backgroundColor: '#25D366',
		font: 2,
		statusJidList: ['19999999999@s.whatsapp.net'],
		broadcast: true
	}
)

// Query broadcast list
const bList = await sock.getBroadcastListInfo('1234@broadcast')
console.log(`name: ${bList.name}, recps: ${bList.recipients}`)
```

---

## Writing Custom Functionality

### Enabling Debug Level in Baileys Logs

```ts
import P from 'pino'

const sock = makeWASocket({
	logger: P({ level: 'debug' })
})
```

### Register a Callback for Websocket Events

```ts
// For any message with tag 'edge_routing'
sock.ws.on('CB:edge_routing', (node: BinaryNode) => {})

// With specific id attribute
sock.ws.on('CB:edge_routing,id:abcd', (node: BinaryNode) => {})

// With id and first content node
sock.ws.on('CB:edge_routing,id:abcd,routing_info', (node: BinaryNode) => {})
```

---

# License

Copyright (c) 2025 WhiskeySockets / Anya-Bail Contributors

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

The maintainers do not condone use of this application in practices that violate the Terms of Service of WhatsApp. Use at your own discretion.
