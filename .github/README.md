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
    - [Live Location Message](#live-location-message)
    - [Contact Message (vCard)](#contact-message-vcard)
    - [Reaction Message](#reaction-message)
    - [Pin Message](#pin-message)
    - [Keep Message](#keep-message)
    - [Poll Message](#poll-message)
    - [Poll Result Message](#poll-result-message)
    - [Event Message](#event-message)
    - [Decrypt Event Response](#decrypt-event-response)
    - [Call Message](#call-message)
    - [Order Message](#order-message)
    - [Product Message](#product-message)
    - [Payment Message](#payment-message)
    - [Payment Invite Message](#payment-invite-message)
    - [Admin Invite Message](#admin-invite-message)
    - [Group Invite Message](#group-invite-message)
    - [Sticker Pack Message](#sticker-pack-message)
    - [Share Phone Number Message](#share-phone-number-message)
    - [Request Phone Number Message](#request-phone-number-message)
    - [Buttons Reply Message](#buttons-reply-message)
  - [Sending with Link Preview](#sending-messages-with-link-previews)
  - [AI Icon Feature](#ai-icon-feature)
  - [Media Messages](#media-messages)
    - [Image Message](#image-message)
    - [HD Image Message](#hd-image-message)
    - [Video Message](#video-message)
    - [HD Video Message](#hd-video-message)
    - [Ptv Video Message (Video Note)](#ptv-video-message-video-note)
    - [Audio Message](#audio-message)
    - [Gif Message](#gif-message)
    - [Document Message](#document-message)
    - [ViewOnce Message](#view-once-message)
    - [Album Message](#album-message)
    - [Sticker Pack Message (media)](#sticker-pack-message)
  - [Button & Interactive Messages](#button--interactive-messages)
    - [Buttons Message](#buttons-message)
    - [List Message (sections)](#list-message-sections)
    - [Product List Message](#product-list-message)
    - [Template Buttons](#template-buttons)
    - [Interactive Buttons (interactiveButtons)](#interactive-buttons-interactivebuttons)
    - [Interactive Buttons — All Button Types](#interactive-buttons--all-button-types)
    - [Interactive Buttons PIX Payment](#interactive-buttons-pix-payment)
    - [Interactive Buttons PAY](#interactive-buttons-pay)
    - [Cards / Carousel Message](#cards--carousel-message)
    - [Shop Message](#shop-message)
    - [Collection Message](#collection-message)
    - [Quick Reply Buttons (sendButtons)](#quick-reply-buttons-sendbuttons)
    - [sendInteractiveMessage (Advanced)](#sendinteractivemessage-advanced)
    - [Interactive as Template](#interactive-as-template)
  - [Status / Stories](#status--stories)
    - [Text Status](#text-status)
    - [Image / Video Status](#image--video-status)
    - [StatusHelper (Quick API)](#statushelper-quick-api)
    - [Send Status Mentions](#send-status-mentions)
    - [Group Status](#group-status)
- [Outgoing Calls](#outgoing-calls)
  - [Initiate a Call](#initiate-a-call)
  - [Accept / Reject a Call](#accept--reject-a-call)
  - [Cancel a Call](#cancel-a-call)
  - [Mute / Unmute in Call](#mute--unmute-in-call)
- [Modify Messages](#modify-messages)
  - [Delete Messages (for everyone)](#deleting-messages-for-everyone)
  - [Edit Messages](#editing-messages)
- [Manipulating Media Messages](#manipulating-media-messages)
  - [Thumbnail in Media Messages](#thumbnail-in-media-messages)
  - [Downloading Media Messages](#downloading-media-messages)
  - [Re-upload Media Message to Whatsapp](#re-upload-media-message-to-whatsapp)
- [Send States in Chat](#send-states-in-chat)
  - [Reading Messages](#reading-messages)
  - [Update Presence](#update-presence)
  - [Typing Indicator](#typing-indicator)
  - [Read Receipt Control](#read-receipt-control)
- [Modifying Chats](#modifying-chats)
  - [Archive a Chat](#archive-a-chat)
  - [Mute/Unmute a Chat](#muteunmute-a-chat)
  - [Mark a Chat Read/Unread](#mark-a-chat-readunread)
  - [Delete a Message for Me](#delete-a-message-for-me)
  - [Delete a Chat](#delete-a-chat)
  - [Pin/Unpin a Chat](#pinunpin-a-chat)
  - [Star/Unstar a Message](#starunstar-a-message)
  - [Disappearing Messages](#disappearing-messages)
  - [Clear Messages](#clear-messages)
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
  - [Panoramic (Wide) Profile Picture](#panoramic-wide-profile-picture)
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
  - [Update Member Label](#update-member-label)
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
import makeWASocket, { useSingleFileAuthState } from 'anya-bail'

const { state, saveCreds } = await useSingleFileAuthState('./auth.json')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

### MongoDB Auth State

Stores credentials in a MongoDB collection — recommended for production.

```ts
import makeWASocket, { useMongoFileAuthState } from 'anya-bail'
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

const autoReply = createAutoReply(
	(jid, content, opts) => sock.sendMessage(jid, content, opts),
	(jid, presence) => sock.sendPresenceUpdate(presence, jid),
	{
		simulateTyping: true,
		typingDuration: 1500,
		globalCooldown: 2000
	}
)

// Keyword rule
autoReply.addRule({
	keywords: ['hello', 'hi'],
	response: { text: 'Hello! How can I help?' },
	cooldown: 5000
})

// Regex rule
autoReply.addRule({
	pattern: /^!ping$/i,
	response: { text: 'Pong! 🏓' },
	quoted: true
})

// Dynamic response
autoReply.addRule({
	keywords: ['time'],
	response: async msg => ({ text: `Current time: ${new Date().toLocaleString()}` })
})

// Groups only
autoReply.addRule({
	exactMatch: '!help',
	groupsOnly: true,
	cooldown: 30_000,
	response: { text: 'Available commands:\n• !help\n• !info\n• !ping' }
})

// Process incoming messages
sock.ev.on('messages.upsert', async ({ messages }) => {
	for (const msg of messages) {
		if (!msg.key.fromMe) await autoReply.processMessage(msg)
	}
})
```

**Managing Rules:**

```ts
autoReply.setRuleActive(rule.id, false) // pause
autoReply.setRuleActive(rule.id, true) // resume
autoReply.removeRule(rule.id)
autoReply.clearRules()
const rules = autoReply.getRules()
```

### Anti-Delete System

Store messages and detect/recover deleted messages.

```ts
import { MessageStore, createAntiDeleteHandler, createMessageStoreHandler } from 'anya-bail'

const store = new MessageStore({ maxMessagesPerChat: 1000, ttl: 24 * 60 * 60 * 1000 })

sock.ev.on('messages.upsert', createMessageStoreHandler(store))

const antiDeleteHandler = createAntiDeleteHandler(store)
sock.ev.on('messages.update', updates => {
	const deletedMessages = antiDeleteHandler(updates)
	for (const info of deletedMessages) {
		console.log('Message deleted from:', info.key.remoteJid)
		console.log('Original:', info.originalMessage.message)
		// await sock.copyNForward(info.key.remoteJid, info.originalMessage)
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
- `getMessageType` — returns message category (`text/media/poll/reaction/event`)
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

// Manage
scheduler.cancel(id)
scheduler.cancelForJid(jid)
scheduler.stop()
scheduler.start()
const pending = scheduler.getPending()
```

### Message Search

Search through stored messages by keyword, regex, sender, date range, or type.

```ts
import { createMessageSearch, searchMessages } from 'anya-bail'

const search = createMessageSearch()

sock.ev.on('messages.upsert', ({ messages }) => search.addMessages(messages))

// Keyword search
const results = search.search('hello', {
	jid: 'jid@s.whatsapp.net',
	limit: 20,
	caseSensitive: false,
	messageTypes: ['text', 'image'],
	fromDate: new Date('2024-01-01')
})

// Regex search
const regexResults = search.searchRegex(/order\s*#?\d+/i)

// Quick functional search
const quickResults = searchMessages(rawMessages, 'keyword', { jid: 'jid@s.whatsapp.net', fromMe: false })
```

### Message Templates

Create reusable text templates with `{{variable}}` placeholders.

```ts
import { createTemplateManager, renderTemplate, PRESET_TEMPLATES } from 'anya-bail'

const tm = createTemplateManager(true) // true = include presets

// Use a preset template
const invoice = tm.render('invoice', {
	invoiceNumber: 'INV-001',
	customerName: 'John Doe',
	total: '11,000'
})
await sock.sendMessage(jid, { text: invoice })

// Create custom template
tm.create({
	name: 'welcome',
	content: 'Hello {{name}}! Welcome to {{group}}. Code: {{code:NONE}}.'
})
const text = tm.render('welcome', { name: 'Alice', group: 'Dev Chat', code: 'XYZ99' })
await sock.sendMessage(jid, { text })

// Quick one-off render
const msg = renderTemplate('Hi {{name}}, your order {{id}} is ready!', { name: 'Bob', id: '#1234' })
await sock.sendMessage(jid, { text: msg })
```

### JID Plotting & LID Support

Parse, decode, and resolve WhatsApp JIDs including LID (Linked ID) mapping.

```ts
import { parseJid, plotJid, getSenderPn } from 'anya-bail'

const info = parseJid('19999999999@s.whatsapp.net')
// { jid, user, server, isLid, isPn, isGroup, isNewsletter, normalizedUser, ... }

const plotted = plotJid('19999999999@s.whatsapp.net')
console.log(plotted.primary)

const senderInfo = getSenderPn(sock.authState.creds)
console.log(senderInfo?.phoneNumber) // '+19999999999'
```

### vCard / Contact Card Generator

Generate properly formatted vCards for contact messages.

```ts
import { generateVCard, quickContact, createContactCard, createContactCards } from 'anya-bail'

// Quick single contact
await sock.sendMessage(
	jid,
	createContactCard(
		quickContact('John Doe', '+919876543210', {
			organization: 'Acme Corp',
			email: 'john@acme.com'
		})
	)
)

// Multiple contacts
await sock.sendMessage(jid, createContactCards([quickContact('Alice', '+111111'), quickContact('Bob', '+222222')]))

// Full vCard
const vcard = generateVCard({
	fullName: 'Jane Smith',
	phones: [{ number: '+123', type: 'CELL' }],
	emails: [{ email: 'jane@tech.inc', type: 'WORK' }],
	organization: 'Tech Inc'
})
await sock.sendMessage(jid, { contacts: { displayName: 'Jane Smith', contacts: [{ vcard }] } })
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
const msg = getMessageFromStore()
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

#### Live Location Message

```ts
await sock.sendMessage(jid, {
	location: {
		degreesLatitude: 24.121231,
		degreesLongitude: 55.1121221
	},
	live: true
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

#### Keep Message

```ts
await sock.sendMessage(jid, {
	keep: {
		key: message.key,
		type: 1 // or 2
	}
})
```

#### Poll Message

```ts
await sock.sendMessage(jid, {
	poll: {
		name: 'Favourite color?',
		values: ['Red', 'Blue', 'Green'],
		selectableCount: 1,
		toAnnouncementGroup: false
	}
})
```

#### Poll Result Message

```ts
await sock.sendMessage(jid, {
	pollResult: {
		name: 'My Poll',
		values: [
			['Option 1', 1000],
			['Option 2', 2000]
		]
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

#### Decrypt Event Response

```ts
sock.ev.on('messages.update', event => {
	for (const { key, update } of event) {
		if (update.eventResponses) {
			const eventCreation = await getMessage(key)
			if (eventCreation) {
				console.log(
					'event response aggregation:',
					getAggregateResponsesInEventMessage({
						eventResponses: update.eventResponses
					})
				)
			}
		}
	}
})
```

#### Call Message

Send a scheduled call creation notification (not an actual call — see [Outgoing Calls](#outgoing-calls) for real signaling).

```ts
await sock.sendMessage(jid, {
	call: {
		name: 'Team Standup',
		type: 1 // 2 for video
	}
})
```

#### Order Message

```ts
await sock.sendMessage(jid, {
	order: {
		orderId: '574xxx',
		thumbnail: 'your_thumbnail',
		itemCount: 'your_count',
		status: 'INQUIRY', // INQUIRY | ACCEPTED | DECLINED
		surface: 'CATALOG',
		message: 'your_caption',
		orderTitle: 'your_title',
		sellerJid: 'your_jid',
		token: 'your_token',
		totalAmount1000: 'your_amount',
		totalCurrencyCode: 'IDR'
	}
})
```

#### Product Message

```ts
await sock.sendMessage(jid, {
	product: {
		productImage: { url: 'https://example.com/product.jpg' },
		productId: 'your_id',
		title: 'Product Title',
		description: 'Product description',
		currencyCode: 'IDR',
		priceAmount1000: 'your_amount',
		retailerId: 'your_retailer',
		url: 'https://example.com',
		productImageCount: 1,
		salePriceAmount1000: 'your_sale_price'
	},
	businessOwnerJid: '628xxx@s.whatsapp.net'
})
```

#### Payment Message

```ts
await sock.sendMessage(jid, {
	payment: {
		note: 'Payment for order #123',
		currency: 'IDR',
		offset: 0,
		amount: '10000',
		expiry: 0,
		from: '628xxxx@s.whatsapp.net'
	}
})
```

#### Payment Invite Message

```ts
await sock.sendMessage(jid, {
	paymentInvite: {
		type: 1, // 1 | 2 | 3
		expiry: 0
	}
})
```

#### Admin Invite Message

Invite someone to become a newsletter admin.

```ts
await sock.sendMessage(jid, {
	adminInvite: {
		jid: '123xxx@newsletter',
		name: 'My Channel',
		caption: 'Please be my channel admin',
		expiration: 86400,
		jpegThumbnail: Buffer // optional
	}
})
```

#### Group Invite Message

```ts
await sock.sendMessage(jid, {
	groupInvite: {
		jid: '123xxx@g.us',
		name: 'My Group',
		caption: 'Please Join My Whatsapp Group',
		code: 'invite_code',
		expiration: 86400,
		jpegThumbnail: Buffer // optional
	}
})
```

#### Sticker Pack Message

Send a WhatsApp sticker pack.

```ts
await sock.sendMessage(jid, {
	stickerPack: {
		name: 'My Sticker Pack',
		publisher: 'My Name',
		stickers: [
			{
				sticker: { url: 'https://example.com/sticker1.webp' },
				emojis: ['😀'],
				isAnimated: false
			},
			{
				sticker: fs.readFileSync('./sticker2.webp'),
				emojis: ['🔥']
			}
		]
	}
})
```

#### Share Phone Number Message

```ts
await sock.sendMessage(jid, {
	sharePhoneNumber: {}
})
```

#### Request Phone Number Message

```ts
await sock.sendMessage(jid, {
	requestPhoneNumber: {}
})
```

#### Buttons Reply Message

Reply to button/list/interactive messages.

```ts
// List reply
await sock.sendMessage(jid, {
	buttonReply: { name: 'Option', description: 'desc', rowId: 'ID' },
	type: 'list'
})

// Plain button reply
await sock.sendMessage(jid, {
	buttonReply: { displayText: 'Clicked', id: 'ID' },
	type: 'plain'
})

// Template reply
await sock.sendMessage(jid, {
	buttonReply: { displayText: 'Clicked', id: 'ID', index: 1 },
	type: 'template'
})

// Interactive (native flow) reply
await sock.sendMessage(jid, {
	buttonReply: {
		body: 'Response',
		nativeFlows: { name: 'menu_options', paramsJson: JSON.stringify({ id: 'ID' }), version: 1 }
	},
	type: 'interactive'
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

### AI Icon Feature

Adds the AI icon to a message, showing it as AI-generated.

```ts
// via sendMessage options
await sock.sendMessage(jid, { text: 'AI-generated reply' }, { ai: true })

// via relayMessage (use capital AI)
await sock.relayMessage(jid, { extendedTextMessage: { text: 'Hi' } }, { AI: true })
```

---

### Media Messages

> [!NOTE]
> You can pass `{ stream: Stream }`, `{ url: 'https://...' }`, or a `Buffer` for any media.

> [!TIP]
> It's recommended to use Stream or URL to save memory.

#### Image Message

```ts
await sock.sendMessage(jid, {
	image: { url: './Media/photo.png' },
	caption: 'hello world'
})
```

#### HD Image Message

Send images at full, uncompressed quality (`hd: true` skips WhatsApp compression).

```ts
await sock.sendMessage(jid, {
	image: { url: './Media/photo.png' },
	caption: 'High quality photo',
	hd: true
})
```

#### Video Message

```ts
await sock.sendMessage(jid, {
	video: { url: './Media/video.mp4' },
	caption: 'hello world'
})
```

#### HD Video Message

```ts
await sock.sendMessage(jid, {
	video: { url: './Media/video.mp4' },
	caption: 'HD video',
	hd: true
})
```

#### Ptv Video Message (Video Note)

Send a video as a circular video note (like voice messages but video).

```ts
await sock.sendMessage(jid, {
	video: { url: './Media/clip.mp4' },
	ptv: true
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

WhatsApp doesn't support `.gif` — send as `.mp4` with `gifPlayback: true`.

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
		{ image: fs.readFileSync('./photo2.jpg'), caption: 'Photo 2' },
		{ video: { url: 'https://example.com/clip.mp4' }, caption: 'Video' },
		{ video: fs.readFileSync('./clip2.mp4'), caption: 'Video 2' }
	]
})
```

---

### Button & Interactive Messages

#### Buttons Message

Classic button message (up to 3 buttons).

```ts
await sock.sendMessage(jid, {
	text: 'This is a button message!',
	footer: 'Hello World!',
	buttons: [
		{ buttonId: 'Id1', buttonText: { displayText: 'Button 1' } },
		{ buttonId: 'Id2', buttonText: { displayText: 'Button 2' } },
		{ buttonId: 'Id3', buttonText: { displayText: 'Button 3' } }
	]
})

// With image
await sock.sendMessage(jid, {
	image: { url: 'https://example.com/banner.jpg' },
	caption: 'Check this out',
	footer: 'Hello World!',
	buttons: [{ buttonId: 'Id1', buttonText: { displayText: 'Buy Now' } }]
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

#### Product List Message

```ts
await sock.sendMessage(jid, {
	text: 'Our products:',
	footer: 'Shop now',
	title: 'Product Catalog',
	buttonText: 'View Products',
	productList: [
		{
			title: 'Category 1',
			products: [{ productId: '1234' }, { productId: '5678' }]
		}
	],
	businessOwnerJid: '628xxx@s.whatsapp.net',
	thumbnail: 'https://example.com/thumbnail.jpg'
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

#### Interactive Buttons (interactiveButtons)

Native-flow buttons — work on iOS and Android. Supports text, image, video, document, location, or product header.

```ts
// Text body + buttons
await sock.sendMessage(jid, {
	text: 'What would you like to do?',
	title: 'Main Menu',
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
	title: 'Title',
	footer: 'Footer',
	interactiveButtons: [
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Learn More', id: 'learn' }) }
	],
	hasMediaAttachment: false
})

// Video + buttons
await sock.sendMessage(jid, {
	video: { url: 'https://example.com/clip.mp4' },
	caption: 'Watch this',
	footer: 'Footer',
	interactiveButtons: [
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Reply', id: 'reply1' }) }
	],
	hasMediaAttachment: false
})
```

#### Interactive Buttons — All Button Types

Full list of all supported `name` values for `interactiveButtons`:

```ts
await sock.sendMessage(jid, {
	text: 'Interactive message',
	interactiveButtons: [
		// Quick reply
		{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Click Me!', id: 'your_id' }) },
		// CTA URL
		{
			name: 'cta_url',
			buttonParamsJson: JSON.stringify({
				display_text: 'Visit',
				url: 'https://example.com',
				merchant_url: 'https://example.com'
			})
		},
		// Copy code
		{ name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: 'Copy', copy_code: '1234567890' }) },
		// Call button
		{ name: 'cta_call', buttonParamsJson: JSON.stringify({ display_text: 'Call Me!', phone_number: '628xxx' }) },
		// Catalog
		{ name: 'cta_catalog', buttonParamsJson: JSON.stringify({ business_phone_number: '628xxx' }) },
		// Reminder
		{ name: 'cta_reminder', buttonParamsJson: JSON.stringify({ display_text: 'Remind Me' }) },
		// Cancel reminder
		{ name: 'cta_cancel_reminder', buttonParamsJson: JSON.stringify({ display_text: 'Cancel' }) },
		// Send location
		{ name: 'send_location', buttonParamsJson: JSON.stringify({ display_text: 'Send Location' }) },
		// Open webview
		{
			name: 'open_webview',
			buttonParamsJson: JSON.stringify({ title: 'Open', link: { in_app_webview: true, url: 'https://example.com' } })
		},
		// MPM (multi-product message)
		{ name: 'mpm', buttonParamsJson: JSON.stringify({ product_id: '8816262248471474' }) },
		// Single select (inline list)
		{
			name: 'single_select',
			buttonParamsJson: JSON.stringify({
				title: 'Choose',
				sections: [
					{
						title: 'Section 1',
						rows: [
							{ header: 'H1', title: 'Title 1', description: 'Desc', id: 'id1' },
							{ header: 'H2', title: 'Title 2', description: 'Desc', id: 'id2' }
						]
					}
				]
			})
		},
		// Flow (galaxy_message)
		{
			name: 'galaxy_message',
			buttonParamsJson: JSON.stringify({
				mode: 'published',
				flow_message_version: '3',
				flow_id: '1307913409923914',
				flow_cta: 'Open Flow',
				flow_action: 'navigate',
				flow_action_payload: { screen: 'QUESTION_ONE', params: { user_id: '123456789' } }
			})
		}
	]
})
```

#### Interactive Buttons PIX Payment

```ts
await sock.sendMessage(jid, {
	text: '',
	interactiveButtons: [
		{
			name: 'payment_info',
			buttonParamsJson: JSON.stringify({
				payment_settings: [
					{
						type: 'pix_static_code',
						pix_static_code: {
							merchant_name: 'My Store',
							key: 'example@email.com',
							key_type: 'EMAIL' // PHONE | EMAIL | CPF | EVP
						}
					}
				]
			})
		}
	]
})
```

#### Interactive Buttons PAY

```ts
await sock.sendMessage(jid, {
	text: '',
	interactiveButtons: [
		{
			name: 'review_and_pay',
			buttonParamsJson: JSON.stringify({
				currency: 'IDR',
				total_amount: { value: '999999999', offset: '100' },
				reference_id: '45XXXXX',
				type: 'physical-goods',
				order: {
					status: 'completed',
					order_type: 'PAYMENT_REQUEST',
					items: [
						{
							retailer_id: 'your_retailer_id',
							name: 'Product Name',
							amount: { value: '999999999', offset: '100' },
							quantity: '1'
						}
					]
				}
			})
		}
	]
})
```

#### Cards / Carousel Message

Send a horizontal carousel of cards, each with media, body, footer, and buttons.

```ts
await sock.sendMessage(jid, {
	text: 'Choose a product:',
	title: 'Product Catalog',
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
			video: { url: 'https://example.com/demo.mp4' },
			title: 'Product Two',
			body: 'Premium tier.',
			footer: '$59.99',
			buttons: [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Buy Now', id: 'buy_p2' }) }]
		}
	]
})
```

#### Shop Message

```ts
await sock.sendMessage(jid, {
	text: 'Browse our shop',
	title: 'Our Store',
	footer: 'Shop now',
	shop: {
		surface: 1, // 2 | 3 | 4
		id: 'https://example.com'
	}
})

// With image
await sock.sendMessage(jid, {
	image: { url: 'https://example.com/banner.jpg' },
	caption: 'Browse our shop',
	shop: { surface: 1, id: 'https://example.com' },
	hasMediaAttachment: false
})
```

#### Collection Message

```ts
await sock.sendMessage(jid, {
	text: 'View our collection',
	title: 'Collection',
	footer: 'Browse now',
	collection: {
		bizJid: 'biz-jid@s.whatsapp.net',
		id: 'https://example.com',
		version: 1
	}
})

// With image
await sock.sendMessage(jid, {
	image: { url: 'https://example.com/banner.jpg' },
	caption: 'Our collection',
	collection: { bizJid: 'biz-jid@s.whatsapp.net', id: 'https://example.com', version: 1 },
	hasMediaAttachment: false
})
```

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

#### Interactive as Template

Wrap an `interactiveMessage` inside a `templateMessage` envelope (for clients that only render template-wrapped content).

```ts
await sock.sendMessage(jid, {
	interactiveMessage: {
		nativeFlowMessage: {
			buttons: [{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Click', id: 'id1' }) }]
		},
		body: { text: 'Hello!' }
	},
	interactiveAsTemplate: true,
	id: 'my-template-001' // optional custom templateId
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

const imgStatus = createImageStatus({ url: './photo.jpg' }, { caption: 'Good morning!' })
const vidStatus = createVideoStatus({ url: './clip.mp4' }, { caption: 'Watch this!' })
const audioStatus = createAudioStatus(fs.readFileSync('./audio.ogg'))

await sock.sendMessage('status@broadcast', imgStatus, {
	statusJidList: ['19999999999@s.whatsapp.net']
})
```

#### StatusHelper (Quick API)

```ts
import { StatusHelper, STATUS_BACKGROUNDS, STATUS_FONTS } from 'anya-bail'

const jidList = [
	'12345@s.whatsapp.net',
	'120363xxx@g.us' // group status supported!
]

// Text
await StatusHelper.send(sock, StatusHelper.text('Hello World! 🌍', STATUS_BACKGROUNDS.solid.purple), jidList)

// Image
await StatusHelper.send(sock, StatusHelper.image(imageBuffer, 'Beautiful day! ☀️'), jidList)

// Video
await StatusHelper.send(sock, StatusHelper.video(videoBuffer, 'Check this! 🎬'), jidList)

// GIF (loop, no sound)
await StatusHelper.send(sock, StatusHelper.gif(gifBuffer, 'Animated! 🎭'), jidList)

// Voice note
await StatusHelper.send(sock, StatusHelper.voiceNote(audioBuffer), jidList)
```

#### Send Status Mentions

Send a status/story and tag specific users or groups. Group members are resolved automatically.

```ts
// Text
await sock.sendStatusMentions(
	{
		text: 'Hello everyone!',
		backgroundColor: '#25D366',
		font: 2
	},
	[
		'19999999999@s.whatsapp.net',
		'120363xxxxxxxx@g.us' // group — all members get the mention
	]
)

// Image
await sock.sendStatusMentions({ image: { url: 'https://example.com/photo.jpg' }, caption: 'Check this!' }, jids)

// Video
await sock.sendStatusMentions({ video: { url: 'https://example.com/clip.mp4' }, caption: 'Watch this!' }, jids)

// Audio
await sock.sendStatusMentions(
	{ audio: { url: 'https://example.com/audio.mp3' }, mimetype: 'audio/mp4', ptt: true },
	jids
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

## Outgoing Calls

### Initiate a Call

```ts
// Voice call
const { callId } = await sock.initiateCall(jid)

// Video call
const { callId } = await sock.initiateCall(jid, { isVideo: true })
```

### Accept / Reject a Call

```ts
sock.ev.on('call', async ([call]) => {
	if (call.status === 'offer') {
		await sock.acceptCall(call.id, call.from, call.isVideo)
	}
})

// Reject
await sock.rejectCall(callId, callFrom)
```

### Cancel a Call

```ts
await sock.cancelCall(callId, jid)
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

> [!NOTE]
> Deleting for oneself is supported via `chatModify` — see [Modifying Chats](#modifying-chats)

### Editing Messages

```ts
await sock.sendMessage(jid, {
	text: 'updated text',
	edit: response.key
})
```

---

## Manipulating Media Messages

### Thumbnail in Media Messages

For images & stickers, thumbnails can be generated automatically if you add `jimp` or `sharp`:

```bash
yarn add jimp
# or
yarn add sharp
```

For videos, `ffmpeg` must be installed on your system.

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

// With built-in blocking simulation
await sock.sendPresenceUpdate('composing', jid, {
	simulateTyping: true,
	typingDuration: 2500
})
await sock.sendMessage(jid, { text: 'Hello!' })
```

### Typing Indicator

Manual typing/recording presence control without needing the auto-reply system.

```ts
import { createTypingIndicator } from 'anya-bail'

const typing = createTypingIndicator((jid, presence) => sock.sendPresenceUpdate(presence, jid))

// Show "typing..." for 2s, then run callback
await typing.simulateTyping(jid, 2000, () => sock.sendMessage(jid, { text: 'Here is your answer! ✅' }))

// Manual start (auto-pauses after 5s)
await typing.startTyping(jid, { duration: 5000 })
await typing.stopTyping(jid)

// Voice note recording indicator
await typing.startRecording(jid, { duration: 3000 })

// Stop all active indicators
await typing.stopAll()
```

### Read Receipt Control

Control read receipts (blue ticks) with delays, global toggle, and per-JID exclusions.

```ts
import { createReadReceiptController } from 'anya-bail'

const readReceipts = createReadReceiptController(
	(jid, participant, messageIds) => sock.readMessages([{ remoteJid: jid, id: messageIds[0] }]),
	{
		enabled: true,
		readDelay: 1000,
		excludeJids: ['blocked@s.whatsapp.net']
	}
)

// Mark as read (respects config + excluded JIDs + readDelay)
await readReceipts.markRead(jid, participant, ['messageId123'])

// Force read (bypasses all rules)
await readReceipts.forceMarkRead(jid, participant, ['messageId123'])

// Global toggle
readReceipts.disable()
readReceipts.enable()

// Update config dynamically
readReceipts.setConfig({ enabled: true, readDelay: 2000 })
```

---

## Modifying Chats

> [!IMPORTANT]
> If you mess up one of your updates, WA can log you out of all your devices.

### Archive a Chat

```ts
const lastMsg = await getLastMessageInChat(jid)
await sock.chatModify({ archive: true, lastMessages: [lastMsg] }, jid)
```

### Mute/Unmute a Chat

| Time   | Milliseconds |
| ------ | ------------ |
| Remove | null         |
| 8h     | 28800000     |
| 7d     | 604800000    |

```ts
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)
await sock.chatModify({ mute: null }, jid) // unmute
```

### Mark a Chat Read/Unread

```ts
const lastMsg = await getLastMessageInChat(jid)
await sock.chatModify({ markRead: false, lastMessages: [lastMsg] }, jid)
```

### Delete a Message for Me

```ts
await sock.chatModify({ clear: { messages: [{ id: 'ATWYHDNNWU81732J', fromMe: true, timestamp: '1654823909' }] } }, jid)
```

### Delete a Chat

```ts
const lastMsg = await getLastMessageInChat(jid)
await sock.chatModify(
	{ delete: true, lastMessages: [{ key: lastMsg.key, messageTimestamp: lastMsg.messageTimestamp }] },
	jid
)
```

### Pin/Unpin a Chat

```ts
await sock.chatModify({ pin: true }, jid)
await sock.chatModify({ pin: false }, jid)
```

### Star/Unstar a Message

```ts
await sock.chatModify({ star: { messages: [{ id: 'messageID', fromMe: true }], star: true } }, jid)
```

### Disappearing Messages

| Time | Seconds |
| ---- | ------- |
| Off  | 0       |
| 24h  | 86400   |
| 7d   | 604800  |
| 90d  | 7776000 |

```ts
await sock.sendMessage(jid, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL })
await sock.sendMessage(jid, { text: 'hello' }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
await sock.sendMessage(jid, { disappearingMessagesInChat: false }) // turn off
```

### Clear Messages

```ts
await sock.clearMessage(jid, key, timestamps)
```

---

## User Querys

### Check If ID Exists in Whatsapp

```ts
const [result] = await sock.onWhatsApp(jid)
if (result.exists) console.log(`${jid} exists`)
```

### Query Chat History (groups too)

```ts
const msg = await getOldestMessageInChat(jid)
await sock.fetchMessageHistory(50, msg.key, msg.messageTimestamp)
// Received in 'messaging.history-set' event
```

### Fetch Status

```ts
const status = await sock.fetchStatus(jid)
```

### Fetch Profile Picture (groups too)

```ts
const ppUrl = await sock.profilePictureUrl(jid) // low res
const ppUrlHd = await sock.profilePictureUrl(jid, 'image') // high res
```

### Fetch Bussines Profile (such as description or category)

```ts
const profile = await sock.getBusinessProfile(jid)
console.log(profile.description, profile.category)
```

### Fetch Someone's Presence (if they're typing or online)

```ts
sock.ev.on('presence.update', console.log)
await sock.presenceSubscribe(jid)
```

---

## Change Profile

### Change Profile Status

```ts
await sock.updateProfileStatus('Hello World!')
```

### Change Profile Name

```ts
await sock.updateProfileName('My Name')
```

### Change Display Picture (groups too)

```ts
await sock.updateProfilePicture(jid, { url: './new-pic.jpeg' })
```

### Panoramic (Wide) Profile Picture

Set a full-width banner profile picture without square cropping.

```ts
// Basic — no cropping, displayed as wide banner
await sock.updatePanoramaProfilePicture(myJid, { url: './panorama.jpg' })

// With custom options
await sock.updatePanoramaProfilePicture(
	myJid,
	{ url: './wide-photo.jpg' },
	{
		maxWidth: 1080,
		quality: 90
	}
)

// Group banner
await sock.updatePanoramaProfilePicture(groupJid, { url: './group-banner.jpg' })
```

### Remove display picture (groups too)

```ts
await sock.removeProfilePicture(jid)
```

---

## Groups

```ts
// Create
const group = await sock.groupCreate('My Group', ['1234@s.whatsapp.net'])

// Add/Remove/Promote/Demote
await sock.groupParticipantsUpdate(jid, ['abcd@s.whatsapp.net'], 'add')

// Update settings
await sock.groupUpdateSubject(jid, 'New Name')
await sock.groupUpdateDescription(jid, 'New Desc')
await sock.groupSettingUpdate(jid, 'announcement') // admins-only send
await sock.groupSettingUpdate(jid, 'locked') // admins-only edit

// Invite
const code = await sock.groupInviteCode(jid)
await sock.groupRevokeInvite(jid)
await sock.groupAcceptInvite(code)
const info = await sock.groupGetInviteInfo(code)

// Metadata
const metadata = await sock.groupMetadata(jid)
await sock.groupAcceptInviteV4(jid, groupInviteMessage)

// Join requests
const list = await sock.groupRequestParticipantsList(jid)
await sock.groupRequestParticipantsUpdate(jid, ['abcd@s.whatsapp.net'], 'approve')

// Misc
const all = await sock.groupFetchAllParticipating()
await sock.groupToggleEphemeral(jid, 86400) // 24h
await sock.groupMemberAddMode(jid, 'all_member_add')
await sock.groupLeave(jid)
```

### Update Member Label

Update a specific member's custom label/tag within a group.

```ts
await sock.updateMemberLabel(
	groupJid, // must be a group JID
	'VIP Member' // string label, max 30 characters
)
```

---

## Privacy

```ts
await sock.updateBlockStatus(jid, 'block')
await sock.updateBlockStatus(jid, 'unblock')
const settings = await sock.fetchPrivacySettings(true)
const blocklist = await sock.fetchBlocklist()
await sock.updateLastSeenPrivacy('contacts') // 'all' | 'contacts' | 'none'
await sock.updateOnlinePrivacy('all')
await sock.updateProfilePicturePrivacy('contacts')
await sock.updateStatusPrivacy('contacts')
await sock.updateReadReceiptsPrivacy('all')
await sock.updateGroupsAddPrivacy('contacts')
await sock.updateDefaultDisappearingMode(86400)
```

---

## Broadcast Lists & Stories

### Send Broadcast & Stories

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
```

### Query a Broadcast List's Recipients & Name

```ts
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

### How Whatsapp Communicate With Us

The `'frame'` has three components:

- `tag` — what this frame is about (e.g. `'message'`)
- `attrs` — a key-value pair with metadata (contains message ID)
- `content` — the actual data

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
