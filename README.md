# 🌱 @queenanya/baileys

<h1 align='center'><img alt="Baileys logo" src="Media/logo.png" height="75"/></h1>

<p align="center">
   An extended fork of Baileys — the WebSockets-based TypeScript library for the WhatsApp Web API — with 35+ addon modules, interactive messages, albums, LaTeX rendering, rich responses, and additional message types.
   <br><br>
   <a href="https://www.npmjs.com/package/@queenanya/baileys">
      <img src="https://img.shields.io/npm/v/@queenanya/baileys?style=for-the-badge&logo=npm"/>
   </a>
   <a href="https://github.com/QueenAnya/Bail">
      <img src="https://img.shields.io/github/stars/QueenAnya/Bail?style=for-the-badge&logo=github"/>
   </a>
   <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge"/>
   </a>
   <a href="https://nodejs.org">
      <img src="https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&labelColor=green&logoColor=white&style=for-the-badge"/>
   </a>
   <a href="#">
      <img src="https://img.shields.io/badge/ESM-only?logo=javascript&labelColor=yellow&logoColor=black&style=for-the-badge"/>
   </a>
   <a href="https://deepwiki.com/QueenAnya/Bail">
      <img src="https://deepwiki.com/badge.svg" alt="Ask Deep-Wiki"/>
   </a>
</p>

---

## ⚠️ Important Notice

This library is an unofficial, community-maintained fork and is in no way affiliated with or endorsed by WhatsApp/Meta. Use at your own discretion. Do not spam people with this. We discourage any stalkerware, bulk or automated messaging usage.

---

### ✨ Highlights

This fork is based on the original open-source Baileys library
and adds fork-exclusive functionality on top of it — 35+ addon modules
(rich responses, interactive buttons, scheduling, status posting, call
handling, extra auth-state backends, and more), a WhatsApp username API,
album send, sticker packs, LaTeX rendering, and features ported from other
community forks (credited inline throughout this README and in
`src/addons/`).

> [!IMPORTANT]
> Full credit and respect for the original library belong to
> its maintainers and contributors:
> [purpshell](https://github.com/purpshell),
> [jlucaso1](https://github.com/jlucaso1),
> [adiwajshing](https://github.com/adiwajshing). Where a specific feature
> in this fork was ported from another community fork rather than written
> from scratch, it is credited at the point it's documented below and in
> the source comment where it lives.

### 📥 Install

```
yarn add @queenanya/baileys
```

or

```
npm install @queenanya/baileys
```

For the latest unreleased fixes/features straight from source, clone this
repository and install locally:

```
git clone https://github.com/QueenAnya/Bail
cd Bail
yarn install
yarn build
```

Then import your code using:

```ts
import makeWASocket from '@queenanya/baileys'
```

Do check out & run [example.ts](Example/example.ts) or
[assets/examples/example.js](assets/examples/example.js) to see an example
usage of the library, covering most common use cases plus this fork's
addon-based features (pairing code, media handling, link previews, and
more).

### 🚀 Quick Start

Connect, listen for messages, and auto-reply — in under 15 lines:

```ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@queenanya/baileys'
import { Boom } from '@hapi/boom'

async function connect() {
	const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')
	const sock = makeWASocket({ auth: state, printQRInTerminal: true })

	sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
		if (connection === 'close') {
			const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
			if (shouldReconnect) connect()
		} else if (connection === 'open') {
			console.log('✅ Connected!')
		}
	})

	sock.ev.on('messages.upsert', ({ messages }) => {
		for (const msg of messages) {
			if (!msg.key.fromMe) sock.sendMessage(msg.key.remoteJid!, { text: 'Hello!' })
		}
	})

	sock.ev.on('creds.update', saveCreds)
}

connect()
```

> 💡 Scan the QR code printed in your terminal with WhatsApp on your phone to log in.
> Prefer a pairing code instead? See [Request Custom Pairing Code](#-request-custom-pairing-code) below.

#### 📋 A Few More, Copy-Paste Ready

**1️⃣ Text with mentions**
```ts
await sock.sendMessage(jid, { text: 'Hi @123456789!', mentions: ['123456789@s.whatsapp.net'] })
```

**2️⃣ Image with caption**
```ts
await sock.sendMessage(jid, { image: { url: './photo.jpg' }, caption: 'Check this out 📸' })
```

**3️⃣ Interactive buttons**
```ts
await sock.sendMessage(jid, {
	text: 'Pick one:',
	interactiveButtons: [
		{ text: 'Visit site', url: 'https://example.com' },
		{ text: 'Reply', id: 'reply-1' }
	]
})
```

**4️⃣ Poll**
```ts
await sock.sendMessage(jid, { poll: { name: 'Best day?', values: ['Mon', 'Fri'], selectableCount: 1 } })
```

Every feature this fork adds beyond upstream Baileys — album send, sticker
packs, rich AI-style responses, LaTeX, scheduling helpers, and more — is
documented in full below, in
[🧩 QB2 Fork-Exclusive Features](#-qb2-fork-exclusive-features).

### 📋 Table of Contents
- [🚀 Quick Start](#-quick-start)
- [📋 Table of Contents](#-table-of-contents)
- [✨ Highlights](#-highlights)
- [🛠️ Internal Adjustments](#%EF%B8%8F-internal-adjustments)
- [📨 Messages Handling & Compatibility](#-highlights)
- [🧩 Additional Message Options](#-additional-message-options)
- [📥 Installation](#-installation)
   - [🧩 Import (ESM & CJS)](#-import-esm--cjs)
- [🌐 Connect to WhatsApp (Quick Step)](#-connect-to-whatsapp-quick-step)
   - [🔐 Auth State](#-auth-state)
- [🗄️ Implementing Data Store](#%EF%B8%8F-implementing-data-store)
- [🪪 WhatsApp IDs Explain](#-whatsapp-ids-explain)
- [✉️ Sending Messages](#%EF%B8%8F-sending-messages)
   - [🔠 Text](#-text)
   - [🔔 Mention](#-mention)
   - [😁 Reaction](#-reaction)
   - [📌 Pin Message](#-pin-message)
   - [🔖 Keep Chat](#-keep-chat)
   - [➡️ Forward Message](#%EF%B8%8F-forward-message)
   - [👤 Contact](#-contact)
   - [📍 Location](#-location)
   - [🗓️ Event](#%EF%B8%8F-event)
   - [👥 Group Invite](#-group-invite)
   - [🛍️ Product](#%EF%B8%8F-product)
   - [📊 Poll](#-poll)
   - [💭 Button Response](#-button-response)
   - [✨ Rich Response](#-rich-response)
   - [🧾 Message with Code Block](#-message-with-code-block)
   - [🌏 Message with Inline Entities](#-message-with-inline-entities)
   - [📋 Message with Table](#-message-with-table)
   - [🎞️ Status Mention](#%EF%B8%8F-status-mention)
- [📁 Sending Media Messages](#-sending-media-messages)
   - [🖼️ Image](#%EF%B8%8F-image)
   - [🎥 Video](#-video)
   - [📃 Sticker](#-sticker)
   - [💽 Audio](#-audio)
   - [🗂️ Document](#%EF%B8%8F-document)
   - [🖼️ Album (Image & Video)](#%EF%B8%8F-album-image--video)
   - [📦 Sticker Pack](#-sticker-pack)
- [👉🏻 Sending Interactive Messages](#-sending-interactive-messages)
   - [🔘 Buttons](#-buttons)
   - [📋 List](#-list)
   - [🗄️ Interactive](#%EF%B8%8F-interactive)
   - [🫙 Hydrated Template](#-hydrated-template)
- [💳 Sending Payment Messages](#-sending-payment-messages)
   - [➕ Invite Payment](#-invite-payment)
   - [🧾 Invoice](#-invoice)
   - [🛍️ Order](#%EF%B8%8F-order)
   - [💳 Request Payment](#-request-payment)
- [👁️ Other Message Options](#%EF%B8%8F-other-message-options)
   - [🤖 AI Icon](#-ai-icon)
   - [🕒 Ephemeral](#-ephemeral)
   - [📰 External Ad Reply](#-external-ad-reply)
   - [🧑‍🧑‍🧒 Group Status](#%E2%80%8D%E2%80%8D-group-status)
   - [🐱 Lottie Sticker](#-lottie-sticker)
   - [🧩 Raw](#-raw)
   - [🏷️ Secure Meta Service Label](#%EF%B8%8F-secure-meta-service-label)
   - [📑 Spoiler](#-spoiler)
   - [👁️ View Once](#%EF%B8%8F-view-once)
   - [👁️ View Once V2](#%EF%B8%8F-view-once-v2)
   - [👁️ View Once V2 Extension](#%EF%B8%8F-view-once-v2-extension)
- [♻️ Modify Messages](#%EF%B8%8F-modify-messages)
   - [🗑️ Delete Messages](#%EF%B8%8F-delete-messages)
   - [✏️ Edit Messages](#%EF%B8%8F-edit-messages)
- [🧰 Additional Contents](#-additional-contents)
   - [🏷️ Find User ID (JID|PN/LID)](#%EF%B8%8F-find-user-id-jidpnlid)
   - [🔑 Request Custom Pairing Code](#-request-custom-pairing-code)
   - [🖼️ Image Processing](#%EF%B8%8F-image-processing)
   - [📣 Newsletter Management](#-newsletter-management)
   - [👥 Group Management](#-group-management)
   - [👥 Community Management](#-community-management)
   - [👤 Profile Management](#-profile-management)
   - [🛒 Business Management](#-business-management)
   - [🔐 Privacy Management](#-privacy-management)
   - [📡 Events](#-events)
- [🧩 QB2 Fork-Exclusive Features](#-qb2-fork-exclusive-features)
- [📦 Fork Base](#-fork-base)
- [📣 Credits](#-credits)

### 🛠️ Internal Adjustments
- 🖼️ Fixed an issue where media could not be sent to newsletters due to an upstream issue.
- 📁 Reintroduced [`makeInMemoryStore`](#%EF%B8%8F-implementing-data-store) with a minimal ESM adaptation and small adjustments for Baileys v7.
- 📦 Switched FFmpeg execution from `exec` to `spawn` for safer process handling.
- 🗃️ Added [`@napi-rs/image`](https://www.npmjs.com/package/@napi-rs/image) as a supported image processing backend in [`getImageProcessingLibrary()`](#%EF%B8%8F-image-processing), offering a balance between performance and compatibility.

### 📨 Messages Handling & Compatibility
- 📩 Expanded messages support for:
   - 🖼️ [Album Message](#%EF%B8%8F-album-image--video)
   - 👤 [Group Status Message](#%E2%80%8D%E2%80%8D-group-status)
   - 👉🏻 [Interactive Message](#-sending-interactive-messages) (buttons, lists, native flows, templates, carousels).
   - 🎞️ [Status Mention Message](#%EF%B8%8F-status-mention)
   - 📦 [Sticker Pack Message](#-sticker-pack)
   - ✨ [Rich Response Message](#-rich-response) **[NEW]**
   - 🧾 [Message with Code Blocks](#-message-with-code-block) **[NEW]**
   - [🌏 Message with Inline Entities](#-message-with-inline-entities) **[NEW]**
   - 📋 [Message with Table](#-message-with-table) **[NEW]**
   - 💳 [Payment-related Message](#-sending-payment-messages) (payment requests, invites, orders, invoices).
- 📰 Simplified sending messages with ad thumbnail using [`externalAdReply`](#-external-ad-reply), without requiring manual `contextInfo`.
- 💭 Added support for quoting messages inside channel (newsletter). **[NEW]**
- 🎀 Added support for [custom button icon](#%EF%B8%8F-interactive). **[NEW]**

### 🧩 Additional Message Options
- 👁️ Added optional boolean flags for message handling:  
   - 🤖 [`ai`](#-ai-icon) - AI icon on message
   - 📣 [`mentionAll`](#-mention) - Mention all group participants without requiring their JIDs in `mentions` or `mentionedJid` **[NEW]**
   - 🔧 [`ephemeral`](#-ephemeral), [`groupStatus`](#%E2%80%8D%E2%80%8D-group-status), [`isLottie`](#-lottie-sticker), [`spoiler`](#-spoiler), [`viewOnce`](#%EF%B8%8F-view-once), [`viewOnceV2`](#%EF%B8%8F-view-once-v2), [`viewOnceV2Extension`](#%EF%B8%8F-view-once-v2-extension), [`interactiveAsTemplate`](#%EF%B8%8F-interactive) - Message wrappers
   - 🔒 [`secureMetaServiceLabel`](#%EF%B8%8F-secure-meta-service-label) - Secure meta service label on message **[NEW]**
   - 📄 [`raw`](#-raw) - Build your message manually **(DO NOT USE FOR EXPLOITATION)**

### 📥 Installation

- 📄 Via `package.json`

```json
# NPM
"dependencies": {
   "@queenanya/baileys": "latest"
}

# GitHub
"dependencies": {
   "@queenanya/baileys": "github:QueenAnya/Bail"
}
```

- ⌨️ Via terminal

```bash
# NPM
npm i @queenanya/baileys@latest

# GitHub
npm i github:QueenAnya/Bail
```

#### 🧩 Import (ESM & CJS)

```javascript
// --- ESM
import { makeWASocket } from '@queenanya/baileys'

// --- CJS (tested and working on Node.js 24 ✅)
const { makeWASocket } = require('@queenanya/baileys')
```

### 🌐 Connect to WhatsApp (Quick Step)

```javascript
import { makeWASocket, delay, DisconnectReason, useMultiFileAuthState } from '@queenanya/baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

// --- Connect with pairing code
const myPhoneNumber = '6288888888888'

const logger = pino({ level: 'silent' })

const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')
    
   const sock = makeWASocket({
      logger,
      auth: state
   })

   sock.ev.on('creds.update', saveCreds)

   sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'connecting' && !sock.authState.creds.registered) {
         await delay(1500)
         const code = await sock.requestPairingCode(myPhoneNumber)
         console.log('🔗 Pairing code', ':', code)
      }
      else if (connection === 'close') {
         const shouldReconnect = new Boom(connection?.lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log('⚠️ Connection closed because', lastDisconnect.error, ', reconnecting ', shouldReconnect)
         if (shouldReconnect) {
            connectToWhatsApp()
         }
      }
      else if (connection === 'open') {
         console.log('✅ Successfully connected to WhatsApp')
      }
   })

   sock.ev.on('messages.upsert', async ({ messages }) => {
      for (const message of messages) {
         if (!message.message) continue

         console.log('🔔 Got new message', ':', message)
         await sock.sendMessage(message.key.remoteJid, {
            text: '👋🏻 Hello world'
         })
      }
   })
}

connectToWhatsApp()
```

#### 🔐 Auth State

> [!NOTE]
> You can use the experimental `useSingleFileAuthState` and `useSqliteAuthState` as an alternative to `useMultiFileAuthState`. However, `useSingleFileAuthState` already includes an internal caching mechanism, so there is no need to wrap `state.keys` with `makeCacheableSignalKeyStore`.

### 🗄️ Implementing Data Store

> [!CAUTION]
> I highly recommend building your own data store, as keeping an entire chat history in memory can lead to excessive RAM usage.

```javascript
import { makeWASocket, makeInMemoryStore, delay, DisconnectReason, useMultiFileAuthState } from '@queenanya/baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

const myPhoneNumber = '6288888888888'

// --- Create your store path
const storePath = './store.json'

const logger = pino({ level: 'silent' })

const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')
    
   const sock = makeWASocket({
      logger,
      auth: state
   })

   const store = makeInMemoryStore({
      logger,
      socket: sock
   })

   store.bind(sock.ev)

   sock.ev.on('creds.update', saveCreds)

   sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'connecting' && !sock.authState.creds.registered) {
         await delay(1500)
         const code = await sock.requestPairingCode(myPhoneNumber)
         console.log('🔗 Pairing code', ':', code)
      }
      else if (connection === 'close') {
         const shouldReconnect = new Boom(connection?.lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log('⚠️ Connection closed because', lastDisconnect.error, ', reconnecting ', shouldReconnect)
         if (shouldReconnect) {
            connectToWhatsApp()
         }
      }
      else if (connection === 'open') {
         console.log('✅ Successfully connected to WhatsApp')
      }
   })

   sock.ev.on('chats.upsert', () => {
      console.log('✉️ Got chats', store.chats.all())
   })

   sock.ev.on('contacts.upsert', () => {
      console.log('👥 Got contacts', Object.values(store.contacts))
   })

   // --- Read store from file
   store.readFromFile(storePath)

   // --- Save store every 3 minutes
   setInterval(() => {
      store.writeToFile(storePath)
   }, 180000)
}

connectToWhatsApp()
```

### 🪪 WhatsApp IDs Explain

`id` is the WhatsApp ID, called `jid` and `lid` too, of the person or group you're sending the message to.
- It must be in the format `[country code][phone number]@s.whatsapp.net`
   - Example for people: `19999999999@s.whatsapp.net` and `12699999999@lid`.
   - For groups, it must be in the format `123456789-123345@g.us`.
- For Meta AI, it's `11111111111@bot`.
- For broadcast lists, it's `[timestamp of creation]@broadcast`.
- For stories, the ID is `status@broadcast`.

### ✉️ Sending Messages

> [!NOTE]
> You can get the `jid` from `message.key.remoteJid` in the first example.

#### 🔠 Text

```javascript
// --- Send a regular text message
sock.sendMessage(jid, {
   text: '👋🏻 Hello'
}, {
   quoted: message
})

// --- Send a text message with a link preview
const urlA = 'https://www.npmjs.com/package/@queenanya/baileys'

sock.sendMessage(jid, {
   text: urlA + ' 👆🏻 Check it out!',
   linkPreview: {
      'matched-text': urlA,
      title: '🌱 @queenanya/baileys',
      description: 'Underrated Baileys Fork',
      previewType: 0, // --- Use 1 for video playback in the link preview
      jpegThumbnail: fs.readFileSync('./path/to/image.jpg')
   }
})

// --- Send a text message with a large link preview and favicon
import { prepareWAMessageMedia } from '@queenanya/baileys'

const urlB = 'https://www.npmjs.com/package/@queenanya/baileys#readme'

const { imageMessage: image } = await prepareWAMessageMedia({
   image: {
      url: './path/to/image.jpg'
   }
}, {
   upload: sock.waUploadToServer,
   mediaTypeOverride: 'thumbnail-link'
})

// --- Set the thumbnail display size
image.height = 720
image.width = 480

sock.sendMessage(jid, {
   text: urlB + ' 👆🏻 Check it out!',
   linkPreview: {
      'matched-text': urlB,
      title: '🌱 @queenanya/baileys',
      description: 'Underrated Baileys Fork',
      previewType: 0,
      jpegThumbnail: fs.readFileSync('./path/to/image.jpg'),
      highQualityThumbnail: image,
      linkPreviewMetadata: {
         linkMediaDuration: 0, // --- Duration in seconds (for video/audio content)
         socialMediaPostType: 1, // --- Enum: 0 = NONE, 1 = REEL, 2 = LIVE_VIDEO, 3 = LONG_VIDEO, 4 = SINGLE_IMAGE, 5 = CAROUSEL
      } // --- Additional metadata for large link preview
   },
   favicon: {
      url: './path/to/tiny-image.ico'
   }
})
```

#### 🔔 Mention

```javascript
// --- Regular mention
sock.sendMessage(jid, {
   text: '👋🏻 Hello @628123456789',
   mentions: ['628123456789@s.whatsapp.net']
}, {
   quoted: message
})

// --- Mention all
sock.sendMessage(jid, {
   text: '👋🏻 Hello @all',
   mentionAll: true
}, {
   quoted: message
})
```

#### 😁 Reaction

```javascript
sock.sendMessage(jid, {
   react: {
      key: message.key,
      text: '✨'
   }
})
```

#### 📌 Pin Message

```javascript
sock.sendMessage(jid, {
   pin: message.key,
   time: 86400, // --- Set the value in seconds: 86400 (1d), 604800 (7d), or 2592000 (30d)
   type: 1 // --- Or 2 to remove
})
```

#### 🔖 Keep Chat

> [!NOTE]
> Keep Chat can only be used in chats or groups with disappearing messages enabled.

```javascript
sock.sendMessage(jid, {
   keep: message.key,
   type: 1 // --- Or 2 to remove
})
```

#### ➡️ Forward Message

```javascript
sock.sendMessage(jid, {
   forward: message,
   force: true // --- Optional
})
```

#### 👤 Contact

```javascript
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Jane Doe\n'
            + 'ORG:Waitress;\n'
            + 'TEL;type=CELL;type=VOICE;waid=628123456789:+62 8123 4567 89\n'
            + 'END:VCARD'

sock.sendMessage(jid, {
   contacts: {
      displayName: 'Jane Doe',
      contacts: [
         { vcard }
      ]
   }
}, {
   quoted: message
})
```

#### 📍 Location

```javascript
sock.sendMessage(jid, {
   location: {
      degreesLatitude: 24.121231,
      degreesLongitude: 55.1121221,
      name: '👋🏻 I am here'
   }
}, {
   quoted: message
})
```

#### 🗓️ Event

```javascript
sock.sendMessage(jid, {
   event: {
      name: '🎶 Meet & Mingle Party',
      description: 'Meet & Mingle Party is a fun, casual gathering to connect, chat, and build new relationships within the community.',
      call: 'audio', // --- Or "video", this field is optional
      startDate: new Date(Date.now() + 3600000),
      endDate: new Date(Date.now() + 28800000),
      isCancelled: false, // --- Optional
      isScheduleCall: false, // --- Optional
      extraGuestsAllowed: false, // --- Optional
      location: {
         name: 'Jakarta',
         degreesLatitude: -6.2,
         degreesLongitude: 106.8
      }
   }
}, {
   quoted: message
})
```

#### 👥 Group Invite

```javascript
const inviteCode = groupUrl
   .split('chat.whatsapp.com/')[1]
   ?.split('?')[0]

const groupJid = '1201111111111@g.us'
const groupName = '@queenanya/baileys'

sock.sendMessage(jid, {
   groupInvite: {
      inviteCode,
      inviteExpiration: Date.now() + 86400000,
      text: '👋🏻 Hello, we invite you to join our group.',
      jid: groupJid,
      subject: groupName,
   }
}, {
   quoted: message
})
```

#### 🛍️ Product

```javascript
import { randomUUID } from 'crypto'

sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   body: '👋🏻 Check my product here!',
   footer: '@queenanya/baileys',
   product: {
      currencyCode: 'IDR',
      description: '🛍️ Interesting product!',
      priceAmount1000: 70_000_000,
      productId: randomUUID(),
      productImageCount: 1,
      salePriceAmount1000: 65_000_000,
      signedUrl: 'https://www.npmjs.com/package/@queenanya/baileys',
      title: '📦 QB2 Store (Premium)',
      url: 'https://www.npmjs.com/package/@queenanya/baileys'
   },
   businessOwnerJid: '0@s.whatsapp.net'
})
```

#### 📊 Poll

```javascript
// --- Regular poll message
sock.sendMessage(jid, {
   poll: {
      name: '🔥 Voting time',
      values: ['Yes', 'No'],
      selectableCount: 1,
      toAnnouncementGroup: false,
      endDate: new Date(Date.now() + 28800000), // --- Optional
      hideVoter: false, // --- Optional
      canAddOption: false // --- Optional
   }
}, {
   quoted: message
})

// --- Quiz (only for newsletter)
sock.sendMessage('1211111111111@newsletter', {
   poll: {
      name: '🔥 Quiz',
      values: ['Yes', 'No'],
      correctAnswer: 'Yes',
      pollType: 1
   }
}, {
   quoted: message
})

// --- Poll result
sock.sendMessage(jid, {
   pollResult: {
      name: '📝 Poll Result',
      votes: [{
         name: 'Nice',
         voteCount: 10
      }, {
         name: 'Nah',
         voteCount: 2
      }],
      pollType: 0 // Or 1 for quiz
   }
}, {
   quoted: message
})

// --- Poll update
sock.sendMessage(jid, {
   pollUpdate: {
      metadata: {},
      key: message.key,
      vote: {
         enclv: /* <Buffer> */,
         encPayload: /* <Buffer> */
      }
   }
}, {
   quoted: message
})
```

#### 💭 Button Response

```javascript
// --- Using buttonsResponseMessage
sock.sendMessage(jid, {
   type: 'plain',
   buttonReply: {
      id: '#Menu',
      displayText: '✨ Interesting Menu'
   }
}, {
   quoted: message
})

// --- Using interactiveResponseMessage
sock.sendMessage(jid, {
   flowReply: {
      format: 0,
      text: '💭 Response',
      name: 'menu_options',
      paramsJson: JSON.stringify({
         id: '#Menu',
         description: '✨ Interesting Menu'
      })
   }
}, {
   quoted: message
})

// --- Using listResponseMessage
sock.sendMessage(jid, {
   listReply: {
      title: '📄 See More',
      description: '✨ Interesting Menu',
      id: '#Menu'
   }
}, {
   quoted: message
})

// --- Using templateButtonReplyMessage
sock.sendMessage(jid, {
   type: 'template',
   buttonReply: {
      id: '#Menu',
      displayText: '✨ Interesting Menu',
      index: 1
   }
}, {
   quoted: message
})
```

#### ✨ Rich Response

> [!NOTE]
> `richResponse[]` is a representation of [`submessages[]`](https://baileys.wiki/docs/api/namespaces/proto/interfaces/IAIRichResponseSubMessage) inside `richResponseMessage`.

> [!TIP]
> You can still use the original [`submessages[]`](https://baileys.wiki/docs/api/namespaces/proto/interfaces/IAIRichResponseSubMessage) field directly.
> The code example below is just an implementation using a helper, not a required structure.

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'RAW submessages structure example',
   richResponse: [{
      text: 'Example Usage',
   }, {
      language: 'javascript',
      code: [{
         highlightType: 0,
         codeContent: 'console.log("Hello, World!")'
      }]
   }, {
      text: 'Pretty simple, right?\n'
   }, {
      text: 'Comparison between Node.js, Bun, and Deno',
   }, {
      title: 'Runtime Comparison',
      table: [{
         isHeading: true,
         items: ['', 'Node.js', 'Bun', 'Deno']
      }, {
         isHeading: false,
         items: ['Engine', 'V8 (C++)', 'JavaScriptCore (C++)', 'V8 (C++)']
      }, {
         isHeading: false,
         items: ['Performance', '4/5', '5/5', '4/5']
      }]
   }, {
      text: 'Does this help clarify the differences?'
   }]
})
```

> [!TIP]
> You can easily add syntax highlighting by importing `tokenizeCode` directly from Baileys.

```javascript
import { tokenizeCode } from '@queenanya/baileys'

const language = 'javascript'
const code = 'console.log("Hello, World!")'

sock.sendMessage(jid, {
   disclaimerText: 'Example of tokenizing Code Block',
   richResponse: [{
      text: 'Example Usage',
   }, {
      language,
      code: tokenizeCode(code, language)
   }, {
      text: 'Pretty simple, right?'
   }]
})
```

> 💡 Supported Languages: `css`, `html`, `javascript`, `typescript`, `python`, `golang`, `rust`, `c`, `c#`, `c++`, `bash`, `bat`, `powershell`.

#### 🧾 Message with Code Block

> [!NOTE]
> This feature already includes a built-in tokenizer with `tokenizeCode`.

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Code Block',
   headerText: '## Example Usage',
   contentText: '---',
   code: 'console.log("Hello, World!")',
   language: 'javascript',
   footerText: 'Pretty simple, right?'
})
```

#### 🌏 Message with Inline Entities

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Inline Entities',
   headerText: '## Check Out!',
   contentText: '---',
   links: [{
      text: '1. Google',
      title: 'Popular Search Engine',
      url: 'https://www.google.com/'
   }, {
      text: '2. YouTube',
      title: 'Popular Streaming Platform',
      url: 'https://www.youtube.com/'
   }, {
      text: '3. Modded Baileys',
      title: 'Underrated Baileys Fork',
      url: 'https://www.npmjs.com/package/@queenanya/baileys'
   }],
   footerText: '---'
})
```

#### 📋 Message with Table

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Table',
   headerText: '## Comparison between Node.js, Bun, and Deno',
   contentText: '---',
   title: 'Runtime Comparison',
   table: [
      ['', 'Node.js', 'Bun', 'Deno'],
      ['Engine', 'V8 (C++)', 'JavaScriptCore (C++)', 'V8 (C++)'],
      ['Performance', '4/5', '5/5', '4/5']
   ],
   noHeading: false, // --- Optional
   footerText: 'Does this help clarify the differences?'
})
```

#### 🎞️ Status Mention

Posts a single status update and mentions each jid — group jids are
automatically expanded to their participants, so you can mix users and
groups freely. Works with any status content (text, image, video, or
audio), and each mentioned user gets an individual mention notification
in addition to the status post.

```javascript
// shorthand — array as the jid
sock.sendMessage([jidA, jidB, jidC], {
   text: 'Hello! 👋🏻'
})

// same thing, via the named method
sock.sendStatusMentions([jidA, jidB, groupJid], {
   text: 'Hello! 👋🏻'
})

// works with media too
sock.sendStatusMentions([jidA, jidB], {
   image: { url: './path/to/image.jpg' },
   caption: 'Check this out!'
})
```

### 📁 Sending Media Messages

> [!NOTE]
> For media messages, you can pass a `Buffer` directly, or an object with either `{ stream: Readable }` or `{ url: string }` (local file path or HTTP/HTTPS URL).

#### 🖼️ Image

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '🔥 Superb'
}, {
   quoted: message
})
```

#### 🎥 Video

```javascript
sock.sendMessage(jid, {
   video: {
      url: './path/to/video.mp4'
   },
   gifPlayback: false, // --- Set true if you want to send video as GIF
   ptv: false,  // --- Set true if you want to send video as PTV
   caption: '🔥 Superb'
}, {
   quoted: message
})
```

#### 📃 Sticker

```javascript
sock.sendMessage(jid, {
   sticker: {
      url: './path/to/sticker.webp'
   }
}, {
   quoted: message
})
```

#### 💽 Audio

```javascript
sock.sendMessage(jid, {
   audio: {
      url: './path/to/audio.mp3'
   },
   ptt: false // --- Set true if you want to send audio as Voice Note
}, {
   quoted: message
})
```

#### 🗂️ Document

```javascript
sock.sendMessage(jid, {
   document: {
      url: './path/to/document.pdf'
   },
   mimetype: 'application/pdf',
   caption: '✨ My work!'
}, {
   quoted: message
})
```

#### 🖼️ Album (Image & Video)

```javascript
sock.sendMessage(jid, {
   album: [{
      image: {
         url: './path/to/image.jpg'
      },
      caption: '1st image'
   }, {
      video: {
         url: './path/to/video.mp4'
      },
      caption: '1st video'
   }, {
      image: {
         url: './path/to/image.jpg'
      },
      caption: '2nd image'
   }, {
      video: {
         url: './path/to/video.mp4'
      },
      caption: '2nd video'
   }]
}, {
   quoted: message
})
```

#### 📦 Sticker Pack

> [!IMPORTANT]
> If `sharp` or `@napi-rs/image` is not installed, the `cover` and `stickers` must already be in WebP format.

```javascript
sock.sendMessage(jid, {
   cover: {
      url: './path/to/image.webp'
   },
   stickers: [{
      data: {
         url: './path/to/image.webp'
      }
   }, {
      data: {
         url: './path/to/image.webp'
      }
   }, {
      data: {
         url: './path/to/image.webp'
      }
   }],
   name: '📦 My Sticker Pack',
   publisher: '🌟 QB2 Store',
   description: '@queenanya/baileys'
}, {
   quoted: message
})
```

### 👉🏻 Sending Interactive Messages

#### 🔘 Buttons

```javascript
// --- Regular buttons message
sock.sendMessage(jid, {
   text: '👆🏻 Buttons!',
   footer: '@queenanya/baileys',
   buttons: [{
      text: '👋🏻 SignUp',
      id: '#SignUp'
   }]
}, {
   quoted: message
})

// --- Buttons with Media & Native Flow
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '👆🏻 Buttons and Native Flow!',
   footer: '@queenanya/baileys',
   buttons: [{
      text: '👋🏻 Rating',
      id: '#Rating'
   }, {
      text: '📋 Select',
      sections: [{
         title: '✨ Section 1',
         rows: [{
            header: '',
            title: '💭 Secret Ingredient',
            description: '',
            id: '#SecretIngredient'
         }]
      }, {
         title: '✨ Section 2',
         highlight_label: '🔥 Popular',
         rows: [{
            header: '',
            title: '🏷️ Coupon',
            description: '',
            id: '#CouponCode'
         }]
      }]
   }]
}, {
   quoted: message
})
```

#### 📋 List

> [!NOTE]
> It only works in private chat (`@s.whatsapp.net`).

```javascript
sock.sendMessage(jid, {
   text: '📋 List!',
   footer: '@queenanya/baileys',
   buttonText: '📋 Select',
   title: '👋🏻 Hello',
   sections: [{
      title: '🚀 Menu 1',
      rows: [{
         title: '✨ AI',
         description: '',
         rowId: '#AI'
      }]
   }, {
      title: '🌱 Menu 2',
      rows: [{
         title: '🔍 Search',
         description: '',
         rowId: '#Search'
      }]
   }]
}, {
   quoted: message
})
```

#### 🗄️ Interactive

```javascript
// --- Native Flow
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '🗄️️ Interactive!',
   footer: '@queenanya/baileys',
   optionText: '👉🏻 Select Options', // --- Optional, wrap all native flow into a single list
   optionTitle: '📄 Select Options', // --- Optional
   offerText: '🏷️ Newest Coupon!', // --- Optional, add an offer into message
   offerCode: '@queenanya/baileys', // --- Optional
   offerUrl: 'https://www.npmjs.com/package/@queenanya/baileys', // --- Optional
   offerExpiration: Date.now() + 3_600_000, // --- Optional
   nativeFlow: [{
      text: '👋🏻 Greeting',
      id: '#Greeting',
      icon: 'review' // --- Optional
   }, {
      text: '📞 Call',
      call: '628123456789'
   }, {
      text: '📋 Copy',
      copy: '@queenanya/baileys'
   }, {
      text: '🌐 Source',
      url: 'https://www.npmjs.com/package/@queenanya/baileys',
      useWebview: true // --- Optional
   }, {
      text: '📋 Select',
      sections: [{
         title: '✨ Section 1',
         rows: [{
            header: '',
            title: '🏷️ Coupon',
            description: '',
            id: '#CouponCode'
         }]
      }, {
         title: '✨ Section 2',
         highlight_label: '🔥 Popular',
         rows: [{
            header: '',
            title: '💭 Secret Ingredient',
            description: '',
            id: '#SecretIngredient'
         }]
      }],
      icon: 'default' // --- Optional
   }],
   interactiveAsTemplate: false, // --- Optional, wrap the interactive message into a template
}, {
   quoted: message
})

// --- Carousel & Native Flow
sock.sendMessage(jid, {
   text: '🗂️ Interactive with Carousel!',
   footer: '@queenanya/baileys',
   cards: [{
      image: {
         url: './path/to/image.jpg'
      },
      caption: '🖼️ Image 1',
      footer: '🏷️️ Pinterest',
      nativeFlow: [{
         text: '🌐 Source',
         url: 'https://www.npmjs.com/package/@queenanya/baileys',
         useWebview: true
      }]
   }, {
      image: {
         url: './path/to/image.jpg'
      },
      caption: '🖼️ Image 2',
      footer: '🏷️ Pinterest',
      offerText: '🏷️ New Coupon!',
      offerCode: '@queenanya/baileys',
      offerUrl: 'https://www.npmjs.com/package/@queenanya/baileys',
      offerExpiration: Date.now() + 3_600_000,
      nativeFlow: [{
         text: '🌐 Source',
         url: 'https://www.npmjs.com/package/@queenanya/baileys'
      }]
   }, {
      image: {
         url: './path/to/image.jpg'
      },
      caption: '🖼️ Image 3',
      footer: '🏷️ Pinterest',
      optionText: '👉🏻 Select Options',
      optionTitle: '👉🏻 Select Options',
      offerText: '🏷️ New Coupon!',
      offerCode: '@queenanya/baileys',
      offerUrl: 'https://www.npmjs.com/package/@queenanya/baileys',
      offerExpiration: Date.now() + 3_600_000,
      nativeFlow: [{
         text: '🛒 Product',
         id: '#Product',
         icon: 'default'
      }, {
         text: '🌐 Source',
         url: 'https://www.npmjs.com/package/@queenanya/baileys'
      }]
   }]
}, {
   quoted: message
})

// --- Native Flow with Audio in the Footer
sock.sendMessage(jid, {
   text: '🔈 Music in the footer!',
   audioFooter: {
      url: './path/to/audio.mp3'
   }, // --- Like other media upload methods, buffers and streams are supported
   nativeFlow: [{
      text: '👍🏻 Good, next',
      id: '#Next',
      icon: 'review'
   }, {
      text: '👎🏻 Skip',
      id: '#Skip',
      icon: 'default'
   }]
}, {
   quoted: message
})
```

#### 🫙 Hydrated Template

```javascript
sock.sendMessage(jid, {
   title: '👋🏻 Hello',
   image: {
      url: './path/to/image.jpg'
   },
   caption: '🫙 Template!',
   footer: '@queenanya/baileys',
   templateButtons: [{
      text: '👉?? Tap Here',
      id: '#Order'
   }, {
      text: '🌐 Source',
      url: 'https://www.npmjs.com/package/@queenanya/baileys'
   }, {
      text: '📞 Call',
      call: '628123456789'
   }]
}, {
   quoted: message
})
```

### 💳 Sending Payment Messages

#### 💰 Request Payment

```javascript
sock.sendMessage(jid, {
   payment: {
      note: 'Payment for services',
      currency: 'USD',
      amount: 100, // smallest currency unit — 100 = $1.00
      expiry: Date.now() + 86400000
   }
})
```

#### ➕ Invite Payment

```javascript
sock.sendMessage(jid, {
   paymentInviteServiceType: 3 // 1, 2, or 3
})
```

#### 🧾 Invoice

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   invoiceNote: '🏷️ Invoice'
})
```

#### 🛍️ Order

```javascript
sock.sendMessage(chat, {
   orderText: '🛍️ Order',
   thumbnail: fs.readFileSync('./path/to/image.jpg') // --- Must in buffer format
}, {
   quoted: message
})
```

#### 💳 Request Payment

```javascript
sock.sendMessage(jid, {
   text: '💳 Request Payment',
   requestPaymentFrom: '0@s.whatsapp.net'
})
```

### 👁️ Other Message Options

#### 🤖 AI Icon

> [!NOTE]
> It only works in private chat (`@s.whatsapp.net`).

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '🤖 With AI icon!',
   ai: true
}, {
   quoted: message
})
```

#### 🕒 Ephemeral

> [!NOTE]
> Wrap message into `ephemeralMessage`

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '👁️ Ephemeral',
   ephemeral: true
})
```

#### 📰 External Ad Reply

> [!NOTE]
> Add an ad thumbnail to messages (may not be displayed on some WhatsApp versions).

```javascript
sock.sendMessage(jid, {
   text: '📰 External Ad Reply',
   externalAdReply: {
      title: '📝 Did you know?',
      body: '❓ I dont know',
      thumbnail: fs.readFileSync('./path/to/image.jpg'), // --- Must in buffer format
      largeThumbnail: false, // --- Or true for bigger thumbnail
      url: 'https://www.npmjs.com/package/@queenanya/baileys' // --- Optional, used for WhatsApp internal thumbnail caching and direct URL
   }
}, {
   quoted: message
})
```

#### 🧑‍🧑‍🧒 Group Status

> [!NOTE]
> It only works in group chat (`@g.us`)

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '👥 Group Status!',
   groupStatus: true
})
```

#### 🐱 Lottie Sticker

> [!NOTE]
> Wrap message into `lottieStickerMessage`

```javascript
sock.sendMessage(jid, {
   sticker: {
      url: './path/to/sticker.webp'
   },
   isLottie: true
})
```

#### 🧩 Raw

```javascript
sock.sendMessage(jid, {
   extendedTextMessage: {
      text: '📃 Built manually from scratch using the raw WhatsApp proto structure',
      contextInfo: {
         externalAdReply: {
            title: '@queenanya/baileys',
            thumbnail: fs.readFileSync('./path/to/image.jpg'),
            sourceApp: 'whatsapp',
            showAdAttribution: true,
            mediaType: 1
         }
      }
   },
   raw: true
}, {
   quoted: message
})
```

#### 🏷️ Secure Meta Service Label

```javascript
sock.sendMessage(jid, {
   text: '🏷️ Just a label!',
   secureMetaServiceLabel: true
})
```

#### 📑 Spoiler

> [!NOTE]
> Wrap message into `spoilerMessage`

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '❔ Spoiler',
   spoiler: true
})
```

#### 👁️ View Once

> [!NOTE]
> Wrap message into `viewOnceMessage`

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '👁️ View Once',
   viewOnce: true
})
```

#### 👁️ View Once V2

> [!NOTE]
> Wrap message into `viewOnceMessageV2`

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '👁️ View Once V2',
   viewOnceV2: true
})
```

#### 👁️ View Once V2 Extension

> [!NOTE]
> Wrap message into `viewOnceMessageV2Extension`

```javascript
sock.sendMessage(jid, {
   image: {
      url: './path/to/image.jpg'
   },
   caption: '👁️ View Once V2 Extension',
   viewOnceV2Extension: true
})
```

### ♻️ Modify Messages

#### 🗑️ Delete Messages

```javascript
sock.sendMessage(jid, {
   delete: message.key
})
```

#### ✏️ Edit Messages

```javascript
// --- Edit plain text
sock.sendMessage(jid, {
   text: '✨ I mean, nice!',
   edit: message.key
})

// --- Edit media messages caption
sock.sendMessage(jid, {
   caption: '✨ I mean, here is the image!',
   edit: message.key
})
```

### 🧰 Additional Contents

#### 🏷️ Find User ID (JID|PN/LID)

> [!NOTE]
> The ID must contain numbers only (no +, (), or -) and must include the country code with WhatsApp ID format.

```javascript
// --- PN (Phone Number)
const phoneNumber = '6281111111111@s.whatsapp.net'

const ids = await sock.findUserId(phoneNumber)

console.log('🏷️ Got user ID', ':', ids)

// --- LID (Local Identifier)
const lid = '43411111111111@lid'

const ids = await sock.findUserId(lid)

console.log('🏷️ Got user ID', ':', ids)

// --- Output
// {
//    phoneNumber: '6281111111111@s.whatsapp.net',
//    lid: '43411111111111@lid'
// }
// --- Output when failed
// {
//    phoneNumber: '6281111111111@s.whatsapp.net',
//    lid: undefined
// }
// --- Same output shape regardless of input type
```

#### 🔑 Request Custom Pairing Code

> [!NOTE]
> The phone number must contain numbers only (no +, (), or -) and must include the country code.

```javascript
const phoneNumber = '6281111111111'
const customPairingCode = 'STARFALL'

await sock.requestPairingCode(phoneNumber, customPairingCode)

console.log('🔗 Pairing code', ':', customPairingCode)
```

#### 🖼️ Image Processing

> [!NOTE]
> Automatically use available image processing library: `sharp`, `@napi-rs/image`, or `jimp`

```javascript
import { getImageProcessingLibrary } from '@queenanya/baileys'
import { readFile } from 'fs/promises'

const lib = await getImageProcessingLibrary()

const bufferOrFilePath = './path/to/image.jpg'
const width = 512

let output

// --- If sharp installed
if (lib.sharp?.default) {
   const img = lib.sharp.default(bufferOrFilePath)

   output = await img.resize(width)
      .jpeg({ quality: 80 })
      .toBuffer()
}

// --- If @napi-rs/image installed
else if (lib.image?.Transformer) {
   // --- Must in buffer format
   const inputBuffer = Buffer.isBuffer(bufferOrFilePath)
      ? bufferOrFilePath
      : await readFile(bufferOrFilePath)

   const img = new lib.image.Transformer(inputBuffer)

   output = await img.resize(width, undefined, 0)
      .jpeg(50)
}

// --- If jimp installed
else if (lib.jimp?.Jimp) {
   const img = await lib.jimp.Jimp.read(bufferOrFilePath)

   output = await img
      .resize({ w: width, mode: lib.jimp.ResizeStrategy.BILINEAR })
      .getBuffer('image/jpeg', { quality: 50 })
}

// --- Fallback
else {
   throw new Error('No image processing available')
}

console.log('✅ Process completed!')
console.dir(output, { depth: null })
```

#### 📣 Newsletter Management

```javascript
// --- Create a new one
sock.newsletterCreate('@queenanya/baileys', '📣 Fresh updates weekly')

// --- Get info
const metadata = sock.newsletterMetadata('1231111111111@newsletter')
console.dir(metadata, { depth: null })

// --- Get subscribers count
const subscribers = await sock.newsletterSubscribers('1231111111111@newsletter')
console.dir(subscribers, { depth: null })

// --- Follow and Unfollow
sock.newsletterFollow('1231111111111@newsletter')
sock.newsletterUnfollow('1231111111111@newsletter')

// --- Mute and Unmute
sock.newsletterMute('1231111111111@newsletter')
sock.newsletterUnmute('1231111111111@newsletter')

// --- Demote admin
sock.newsletterDemote('1231111111111@newsletter', '6281111111111@s.whatsapp.net')

// --- Change owner
sock.newsletterChangeOwner('1231111111111@newsletter', '6281111111111@s.whatsapp.net')

// --- Update newsletter
sock.newsletterUpdate('1231111111111@newsletter', { name: '@queenanya/baileys' })

// --- Change name
sock.newsletterUpdateName('1231111111111@newsletter', '📦 @queenanya/baileys')

// --- Change description
sock.newsletterUpdateDescription('1231111111111@newsletter', '📣 Fresh updates weekly')

// --- Change photo
sock.newsletterUpdatePicture('1231111111111@newsletter', {
   url: 'path/to/image.jpg'
})

// --- Remove photo
sock.newsletterRemovePicture('1231111111111@newsletter')

// --- React to a message
sock.newsletterReactMessage('1231111111111@newsletter', '100', '💛')

// --- Get admin count
const count = await sock.newsletterAdminCount('1231111111111@newsletter')

// --- Get all subscribed newsletters
const newsletters = await sock.newsletterSubscribed()
console.dir(newsletters, { depth: null })

// --- Fetch newsletter messages
const messages = sock.newsletterFetchMessages('jid', '1231111111111@newsletter', 50, 0, 0)
console.dir(messages, { depth: null })

// --- Delete newsletter
sock.newsletterDelete('1231111111111@newsletter')
```

#### 👥 Group Management

```javascript
// --- Create a new one and add participants using their JIDs
const group = sock.groupCreate('@queenanya/baileys', ['628123456789@s.whatsapp.net'])
console.dir(group, { depth: null })

// --- Get info
const metadata = await sock.groupMetadata(jid)
console.dir(metadata, { depth: null })

// --- Get group invite code
const inviteCode = await sock.groupInviteCode(jid)
console.dir(inviteCode, { depth: null })


// --- Revoke invite link
sock.groupRevokeInvite(jid)

// --- Accept group invite
sock.groupAcceptInvite(inviteCode)

// --- Leave group
sock.groupLeave(jid)

// --- Add participants
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'add')

// --- Remove participants
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'remove')

// --- Promote to admin
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'promote')

// --- Demote from admin
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'demote')

// --- Accept join requests
sock.groupRequestParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'approve')

// --- Change name
sock.groupUpdateSubject(jid, '📦 @queenanya/baileys')

// --- Change description
sock.groupUpdateDescription(jid, 'Updated description')

// --- Change photo
sock.updateProfilePicture(jid, {
   url: 'path/to/image.jpg'
})

// --- Remove photo
sock.removeProfilePicture(jid)

// --- Set group as admin only for chatting
sock.groupSettingUpdate(jid, 'announcement')

// --- Set group as open to all for chatting
sock.groupSettingUpdate(jid, 'not_announcement')

// --- Set admin only can edit group info
sock.groupSettingUpdate(jid, 'locked')

// --- Set all participants can edit group info
sock.groupSettingUpdate(jid, 'unlocked')

// --- Set admin only can add participants
sock.groupMemberAddMode(jid, 'admin_add')

// --- Set all participants can add participants
sock.groupMemberAddMode(jid, 'all_member_add')

// --- Enable or disable temporary messages with seconds format
sock.groupToggleEphemeral(jid, 86400)

// --- Disable temporary messages
sock.groupToggleEphemeral(jid, 0)

// --- Enable or disable membership approval mode
sock.groupJoinApprovalMode(jid, 'on')
sock.groupJoinApprovalMode(jid, 'off')

// --- Get all groups metadata
const groups = await sock.groupFetchAllParticipating()
console.dir(groups, { depth: null })

// --- Get pending join requests
const requests = await sock.groupRequestParticipantsList(jid)
console.dir(requests, { depth: null })

// --- Get group info from link
const group = await sock.groupGetInviteInfo('ABC123456789')
console.log('👥 Got group info from invite code', ':', group)

// --- Update bot member label
sock.updateMemberLabel(jid, '@queenanya/baileys')
```

#### 👥 Community Management

```javascript
// --- Create a new one and add description
const community = await sock.communityCreate('@queenanya/baileys', '📣 Fresh updates weekly')
console.dir(community, { depth: null })

// --- Create a subgroup for community and add participants using their JIDs
const group = await sock.communityCreateGroup('📢 Announcements', ['628123456789@s.whatsapp.net'], communityJid)

// --- Link an existing group
sock.communityLinkGroup(groupJid, communityJid)

// --- Unlink an existing group
sock.communityUnlinkGroup(groupJid, communityJid)

// --- Get info
const metadata = await sock.communityMetadata(jid)
console.dir(metadata, { depth: null })

// --- Get community invite code
const inviteCode = await sock.communityInviteCode(jid)
console.dir(inviteCode, { depth: null })

// --- Revoke invite link
sock.communityRevokeInvite(jid)

// --- Accept community invite
sock.communityAcceptInvite(inviteCode)

// --- Leave community
sock.communityLeave(jid)

// --- Accept join requests
sock.communityRequestParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'approve')

// --- Change name
sock.communityUpdateSubject(jid, '📦 @queenanya/baileys')

// --- Change description
sock.communityUpdateDescription(jid, 'Updated description')

// --- Set community as admin only for chatting
sock.communitySettingUpdate(jid, 'announcement')

// --- Set community as open to all for chatting
sock.communitySettingUpdate(jid, 'not_announcement')

// --- Set admin only can edit community info
sock.communitySettingUpdate(jid, 'locked')

// --- Set all participants can edit community info
sock.communitySettingUpdate(jid, 'unlocked')

// --- Set admin only can add participants
sock.communityMemberAddMode(jid, 'admin_add')

// --- Set all participants can add participants
sock.communityMemberAddMode(jid, 'all_member_add')

// --- Enable or disable temporary messages with seconds format
sock.communityToggleEphemeral(jid, 86400)

// --- Disable temporary messages
sock.communityToggleEphemeral(jid, 0)

// --- Enable or disable membership approval mode
sock.communityJoinApprovalMode(jid, 'on')
sock.communityJoinApprovalMode(jid, 'off')

// --- Get all communities metadata
const communities = await sock.communityFetchAllParticipating()
console.dir(communities, { depth: null })

// --- Get all community linked groups
const linked = await sock.communityFetchLinkedGroups(jid)
console.dir(linked, { depth: null })

// --- Get pending join requests
const requests = await sock.communityRequestParticipantsList(jid)
console.dir(requests, { depth: null })

// --- Get community info from link
const community = await sock.communityGetInviteInfo('ABC123456789')
console.log('👥 Got community info from invite code', ':', community)
```

#### 👤 Profile Management

```javascript
// --- Get user profile picture
const url = await sock.profilePictureUrl(jid, 'image')
console.log('🖼️ Got user profile url', url)

// --- Update profile picture
sock.updateProfilePicture(jid, buffer)
sock.updateProfilePicture(jid, { url })

// --- Remove profile picture
sock.removeProfilePicture(jid)

// --- Update profile name
sock.updateProfileName('My Name')

// --- Update profile status
sock.updateProfileStatus('Available')

// --- Presence
sock.sendPresenceUpdate('available', jid)
sock.presenceSubscribe(jid)

// --- Read receipts
sock.readMessages([message.key])
sock.sendReceipt(jid, participant, [messageId], 'read')

// --- Block user
sock.updateBlockStatus(jid, 'block')

// --- Unblock user
sock.updateBlockStatus(jid, 'unblock')

// --- Fetch blocklist
const blocked = await sock.fetchBlocklist()
console.dir(blocked, { depth: null })

// --- Modify chats
sock.chatModify({
   archive: true,
   lastMessageOrig: message,
   lastMessage: message
}, jid)

// --- Star messages
sock.star(jid, [{ id: messageId, fromMe: true }], true)

// --- Contact
sock.addOrEditContact(jid, { displayName: 'QB2 Store' })
sock.removeContact(jid)

// --- Label
sock.addChatLabel(jid, labelId)
sock.removeChatLabel(jid, labelId)
sock.addMessageLabel(jid, messageId, labelId)

// --- App state sync
sock.resyncAppState(['regular', 'critical_block'], true)

// --- Get business profile
const profile = await sock.getBusinessProfile(jid)
console.dir(profile, { depth: null })

// --- Get broadcast list info (⚠️ experimental — see note below)
const bList = await sock.getBroadcastListInfo('1234567890@broadcast')
console.log(`Name: ${bList.name}, Recipients: ${bList.recipients}`)
```

> **⚠️ `getBroadcastListInfo` is experimental / unverified.** It was
> documented in the upstream fork this was ported from, but was never
> actually implemented there either — there's no known-working reference
> to copy, so this is a best-effort query using the same IQ shape as
> `getBusinessProfile` with the `w:b` (broadcast) namespace. It has not
> been confirmed against a live WhatsApp connection. Test it before
> relying on it, and treat an empty `recipients` array as "unconfirmed",
> not necessarily "no recipients."


#### 🛒 Business Management

```javascript
// --- Create a new product
const product = await sock.productCreate({
   name: '🧩 QB2 Store (Premium)',
   description: 'Get a full version of Starseed!',
   price: 100000,
   currency: 'IDR',
   originCountryCode: 'ID',
   images: [
      bufferImage,
      {
         url: './path/to/image.jpg'
      }
   ]
})
console.dir(product, { depth: null })

// --- Update product
await sock.productUpdate(productId, {
   name: '🧩 QB2 Store (Premium)',
   description: 'Get a full version of Starseed with more features!',
   price: 75000,
   currency: 'IDR',
   images: [
      {
         url: './path/to/image.jpg'
      }
   ]
})

// --- Delete product
sock.productDelete([productId])

// --- Get catalog info
const { products, nextPageCursor } = await sock.getCatalog({
  jid: '628123456789@s.whatsapp.net',
  limit: 10
})

// --- Get collections
const collections = await sock.getCollections('628123456789@s.whatsapp.net', 10)
console.dir(collections, { depth: null })

// --- Get order info
const order = await sock.getOrderDetails(orderId, tokenBase64)
console.dir(order, { depth: null })

// --- Get order info for a specific seller/buyer jid (optional 3rd param).
// Fetched via WhatsApp's MEX endpoint, which rejects your own LID jid —
// if `jid` is one of your own aliases, it's automatically resolved to
// your PN form for you.
const orderForJid = await sock.getOrderDetails(orderId, tokenBase64, sellerJid)

// --- Update business profile
await sock.updateBusinessProfile({
   address: 'Jakarta, Indonesia',
   description: '🛒 Official QB2 Store',
   websites: ['https://www.npmjs.com/package/@queenanya/baileys'],
   email: 'store@example.com',
   hours: {
      timezone: 'Asia/Jakarta',
      days: [{ day: 'mon', mode: 'open_24h' }]
   }
})

// --- Update cover
sock.updateCoverPhoto({
   url: './path/to/image.jpg'
})

// --- Remove cover
sock.removeCoverPhoto(coverId)

// --- Update quick replies
sock.addOrEditQuickReply({
  shortcut: 'hello',
  message: 'Hello from business account',
})

// --- Remove quick reply
sock.removeQuickReply(timestamp)
```

#### 🔐 Privacy Management

```javascript
// --- Update last seen privacy
sock.updateLastSeenPrivacy('all')
sock.updateLastSeenPrivacy('contacts')
sock.updateLastSeenPrivacy('contact_blacklist')
sock.updateLastSeenPrivacy('nobody')

// --- Update online privacy
sock.updateOnlinePrivacy('all')
sock.updateOnlinePrivacy('match_last_seen')

// --- Update profile picture privacy
sock.updateProfilePicturePrivacy('contacts')

// --- Update status privacy
sock.updateStatusPrivacy('contacts')

// --- Update read receipts privacy
sock.updateReadReceiptsPrivacy('all')
sock.updateReadReceiptsPrivacy('none')

// --- Update groups add privacy
sock.updateGroupsAddPrivacy('all')
sock.updateGroupsAddPrivacy('contacts')

// --- Update messages privacy
sock.updateMessagesPrivacy('all')
sock.updateMessagesPrivacy('contacts')
sock.updateMessagesPrivacy('nobody')

// --- Update call privacy
sock.updateCallPrivacy('everyone')

// --- Update default disappearing mode
sock.updateDefaultDisappearingMode(86400)

// --- Update link previews privacy
sock.updateDisableLinkPreviewsPrivacy(true)
```

#### 📡 Events

```javascript
sock.ev.on('connection.update', (update) => {})
sock.ev.on('creds.update', (update) => {})
sock.ev.on('messaging-history.set', (update) => {})
sock.ev.on('messaging-history.status', (update) => {})
sock.ev.on('chats.upsert', (update) => {})
sock.ev.on('chats.update', (update) => {})
sock.ev.on('chats.delete', (update) => {})
sock.ev.on('chats.lock', (update) => {})
sock.ev.on('lid-mapping.update', (update) => {})
sock.ev.on('presence.update', (update) => {})
sock.ev.on('contacts.upsert', (update) => {})
sock.ev.on('contacts.update', (update) => {})
sock.ev.on('messages.delete', (update) => {})
sock.ev.on('messages.update', (update) => {})
sock.ev.on('messages.media-update', (update) => {})
sock.ev.on('messages.upsert', (update) => {})
sock.ev.on('messages.reaction', (update) => {})
sock.ev.on('message-receipt.update', (update) => {})
sock.ev.on('groups.upsert', (update) => {})
sock.ev.on('groups.update', (update) => {})
sock.ev.on('group-participants.update', (update) => {})
sock.ev.on('group.join-request', (update) => {})
sock.ev.on('group.member-tag.update', (update) => {})
sock.ev.on('blocklist.set', (update) => {})
sock.ev.on('blocklist.update', (update) => {})
sock.ev.on('call', (update) => {})
sock.ev.on('labels.edit', (update) => {})
sock.ev.on('labels.association', (update) => {})
sock.ev.on('newsletter.reaction', (update) => {})
sock.ev.on('newsletter.view', (update) => {})
sock.ev.on('newsletter-participants.update', (update) => {})
sock.ev.on('newsletter-settings.update', (update) => {})
sock.ev.on('settings.update', (update) => {})
```

### 🧩 QB2 Fork-Exclusive Features

Everything below this point is exclusive to this fork (`@queenanya/baileys`)
and does not exist in the upstream library.

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

await sock.sendRichHtml(jid, '<b>Hello</b> <i>world</i>!', null, {
	title: 'My HTML Message',
	source: 'example.com'
})
```

#### Inline entities — links, citations, and LaTeX

`sendMarkdown`/`sendRichMessage` content is scanned for inline
`[text](url)`-style syntax and turned into real, natively-rendered
entities instead of being sent as plain bracket text:

```ts
// Hyperlink — renders as a clickable, styled link
await sock.sendMarkdown(jid, 'Check out [Google](https://google.com)!')

// Untrusted link — prefix the URL with `!` to mark it as untrusted
await sock.sendMarkdown(jid, 'Careful: [this site](!https://sketchy.example)')

// Citation — empty link text renders as a numbered reference
await sock.sendMarkdown(jid, 'As shown in the docs. [](https://openai.com)')

// LaTeX image embed — `[expression|width|height]<imageUrl>`
await sock.sendMarkdown(jid, '[E=mc^2|400|200]<https://example.com/eq.png>')
```

Each of these can be toggled off individually via the `extract` options
(`hyperlink`, `citation`, `latex`, or `extract: false` to disable all
parsing and send the raw bracket text as-is):

```ts
await sock.sendMarkdown(jid, text, null, { citation: false })
```

Underlying machinery: `extractIE` (`src/addons/message-composer.ts`).

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

Underlying machinery:
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

Implementation: `src/addons/interactive-message.ts`.

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

Implementation: `src/Utils/messages.ts`, `cards` content-type
dispatch, including the fix for carousel messages not sending their
required `biz` binary node.

---

### 4. Sticker Packs

Two implementations are available — pick whichever fits your workflow:

### A. Raw proto builder (upstream-PR-based, `from-messages.ts`)

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

Limits enforced: max 60 stickers/pack, 1MB/sticker, processed in
batches of 15 concurrently. A random `packId` is generated automatically
if you don't supply one — pass `packId: generateStickerPackId()` yourself
if you need to know it ahead of time (e.g. to reference the pack elsewhere
before sending).

### B. Alternate builder (standalone, returns a ready-to-send message)

A second, independent sticker-pack builder — use whichever produces
the result you need; both are fully supported.

```ts
import { prepareStickerPackMessage } from '@queenanya/baileys'

const stickerPackMessage = await prepareStickerPackMessage(
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

Or use the dedicated socket method, which does the same thing in one call:

```ts
await sock.sendStickerPack(jid, {
	cover: coverBuffer,
	stickers: [{ data: sticker1Buffer, emojis: ['🎉'] }, { data: sticker2Buffer }],
	name: 'My Pack',
	publisher: 'Me'
})
```

### Standalone WebP converter

```ts
import { convertToWebP } from '@queenanya/baileys'

const { buffer, isAnimated } = await convertToWebP('https://example.com/pic.png')
// or: await convertToWebP(fs.readFileSync('./sticker.jpg'))
```

Implementation: shell/proto from `Baileys-feat-add-stickerpack-support`
(a real upstream PR); `convertToWebP` and the safety limits above.

---

### 5. Newsletter Extensions

Beyond the standard newsletter methods, this fork adds:

```ts
await sock.newsletterSubscribed() // list all subscribed newsletters
await sock.newsletterReactionMode(newsletterJid, 'admin') // who can react to posts
await sock.newsletterAction(newsletterJid, 'FOLLOW') // generic QueryIds dispatcher
await sock.newsletterFetchUpdates(newsletterJid, 50) // fetch state-update events (not message content)
```

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

Note: these three didn't exist as real implementations elsewhere — they
were "implement this yourself" stubs, implemented here for real on top
of the store + `generateForwardMessageContent`.

---

### 6b. Past Group Participants (history sync)

WhatsApp's history sync can include a list of people who've left/been
removed from a group (`pastParticipants`), sent as raw protobuf data on
the `messaging-history.set` event. `processPastParticipants` turns that
into a plain, easy-to-use shape:

```ts
import { processPastParticipants, hasPastParticipants } from '@queenanya/baileys'

sock.ev.on('messaging-history.set', ({ pastParticipants }) => {
	if (!pastParticipants?.length) return

	const results = processPastParticipants(pastParticipants)
	for (const { groupJid, participants } of results) {
		for (const p of participants) {
			console.log(`${p.jid} ${p.leaveReason} group ${groupJid} at ${p.leaveTs}`)
		}
	}
})

// hasPastParticipants(event) is a quick boolean check for the same field,
// if you just need to know whether any are present.
```

Implementation: `src/addons/past-participants.ts` (PR: `Baileys-pastParticepnts`).

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

Implementation: `src/addons/auto-reply.ts`.

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

Implementation: `src/addons/scheduling.ts`.

---

### 9. Anti-Delete

```ts
import { createAntiDeleteHandler, makeInMemoryStore } from '@queenanya/baileys'

const store = makeInMemoryStore()
store.bind(sock.ev)

const antiDelete = createAntiDeleteHandler(store, { notifyJid: yourOwnJid })
sock.ev.on('messages.update', updates => antiDelete.handleUpdates(updates, sock))
```

`makeInMemoryStore().bind(sock.ev)` above feeds the store automatically. If
you're using your own `MessageStore`-compatible store instead and want a
ready-made `messages.upsert` handler for it (filters out protocol/
sender-key-distribution messages before storing), use
`createMessageStoreHandler(store)`:
```ts
import { createMessageStoreHandler } from '@queenanya/baileys'

sock.ev.on('messages.upsert', createMessageStoreHandler(store))
```

Implementation: `src/addons/anti-delete.ts`.

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

Implementation: `src/addons/chat-control.ts`.

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

Implementation: `src/addons/status-helpers.ts`. Colors
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

Implementation: `src/addons/templates.ts`.

---

### 13. vCard Contact Builder

```ts
import { generateVCard, createContactCard, createContactCards, quickContact } from '@queenanya/baileys'

const vcard = generateVCard({
  fullName: 'John Doe',
  phones: [{ number: '+11234567890', type: 'CELL' }],
  emails: [{ email: 'john@example.com' }]
})

await sock.sendMessage(jid, createContactCard({ fullName: 'John Doe', phones: [...] }))
await sock.sendMessage(jid, createContactCards([contact1, contact2]))

// quickContact — shorthand for a simple single-contact ContactData object
await sock.sendMessage(jid, createContactCard(quickContact('Jane Doe', '+11234567890', { organization: 'Acme', email: 'jane@example.com' })))
```

Implementation: `src/addons/vcard.ts`.

---

### 14. Message Search (client-side index)

```ts
import { createMessageSearch } from '@queenanya/baileys'

const search = createMessageSearch(store) // pass your message store
const results = search.searchMessages(jid, 'invoice', { limit: 10 })
```

Implementation: `src/addons/message-search.ts`.

---

### 15. Alternate Auth State Backends

```ts
import { useSqliteAuthState } from '@queenanya/baileys'
import { useCacheManagerAuthState } from '@queenanya/baileys' // Redis/Memcached/etc via cache-manager v5
import { useMongoFileAuthState } from '@queenanya/baileys'
import { useSingleFileAuthState } from '@queenanya/baileys'

const { state, saveCreds } = await useSqliteAuthState({ database: './auth.db' })
```

> **Legacy variant:** `useSingleFileAuthStateLegacy` is also available —
> a synchronous, non-cached, non-debounced implementation kept only for
> exact compatibility with the original upstream reference example.
> **Not recommended for production** (no atomic writes, writes to disk on
> every single `set()` call); use `useSingleFileAuthState` instead unless
> you specifically need this file's exact legacy behavior.

---

### 16. Call Handling (Full)

```ts
// Wired directly into every socket via Socket/messages-recv.ts — no
// import needed beyond sock = makeWASocket(...):

// Convenience wrapper — calls offerCall() and tracks it in the call-offer
// cache for you, returning the generated callId:
const { callId, to, isVideo } = await sock.WAInitiateCall(jid, { isVideo: true })

await sock.offerCall(jid, isVideo)
await sock.acceptCall(callId, callFrom, isVideo)
await sock.preacceptCall(callId, callCreator, isVideo)
await sock.terminateCall(callId, callTo)
await sock.cancelCall(callId, callTo) // alias for terminateCall
await sock.muteCall(callId, callCreator, to, muted)
await sock.joinCallLink(link)
await sock.queryCallLink(token)
await sock.sendHeartbeat(callId, callCreator)
await sock.sendCallDuration(callId, callCreator, to, durationSeconds)
```

Implementation: `Socket/messages-recv.ts`'s call-handling section (full
offer/accept/preaccept/terminate/mute/heartbeat/transport/relay-latency/
enc-rekey/video-state support), including `sanitizeCallerPn` for a
Brazilian-landline caller-ID quirk. `WAInitiateCall`/`offerCall` only
place the WhatsApp-protocol call **signal** (rings the other device) —
there's no actual audio/video media here; for a call that streams real
audio/video, use `sock.initiateCall()` from
[§30 Voice Calling](#30-voice-calling-wasm-based-same-session) instead.
`src/addons/call-handler.ts` documents the same signaling-only API as a
standalone, uninjected addon — kept for reference, but not wired into
the socket: every method it provides already exists, fully wired, in
`messages-recv.ts` (wiring it in as well would just duplicate working
code, and its `initiateCall` export would collide with the unrelated
WASM-based `sock.initiateCall()` mentioned above).

---

### 17. JID Utilities & LID Support

```ts
import { getSenderPn, normalizePhoneToJid, plotJid } from '@queenanya/baileys'

// sock.onWhatsApp() accepts LID (@lid) jids directly, alongside phone-number
// jids — LID jids are resolved to their phone-number form internally and
// existence-checked the same way, with results reported back under the
// original LID.
const result = await sock.onWhatsApp('1234567890', '5511@lid')
```

Implementation: `jid-plotting.ts` for `plotJid`/`normalizePhoneToJid`/
`getSenderPn`; LID support in `onWhatsApp` from the real
`Baileys-fix-on-whatsapp-lid-support` upstream PR branch, wired into
`sock.onWhatsApp()` directly via
[`src/addons/lid-support.ts`](src/addons/lid-support.ts).

---

### 18. Browser Presets

```ts
import { Browsers } from '@queenanya/baileys'

makeWASocket({ browser: Browsers.android('Chrome') })
makeWASocket({ browser: Browsers.solaris('Chrome') })
```

`solaris` preset is exclusive to this fork.
`android` preset + `ANDROID_PHONE` PlatformType fallback are from real
upstream PR branches (`Baileys-android-browser`,
`InfiniteAPI-feat-android-browser-upstream`).

---

### 19. Miscellaneous PR-Sourced Fixes (real upstream PR branches, unmerged)

These are core-file patches, not addons — no import needed, they just work:

- **Pairing-code queue fix** — waits for `pair-device` stanza before sending
  the pairing IQ (PR: `Baileys-fix-pairing-code`)
- **Pairing-code companion_platform_display OS fallback** — a non-canonical
  `browser[0]` (e.g. a custom product name like `"Aidy Staging"` instead of
  `"Mac OS"`/`"Windows"`/`"Ubuntu"`) used to be sent to WhatsApp verbatim
  (a leftover no-op fallback), which the pairing-code registration endpoint
  rejects with a 400; it now falls back to `"Mac OS"` for any
  non-canonical OS name, same as `config.companionPlatformDisplay` already
  let you override manually (PR:
  `Baileys-fix-pairing-code-regression-upstream`)
- **Community metadata group-node fallback** — `sock.communityMetadata()`
  (and anything built on `extractCommunityMetadata`, e.g.
  `communityGetInviteInfo`) used to crash with a raw "Cannot read
  properties of undefined" if WhatsApp responded with a `<group>` node
  instead of `<community>`; it now falls back to `<group>` and throws a
  descriptive `Boom` error only if neither is present (PR:
  `Baileys-fix-community-metadata-group-fallback`)
- **Order-details PN/LID fix** — `sock.getOrderDetails()` now queries
  through WhatsApp's MEX endpoint instead of the legacy `fb:thrift_iq`
  query, and auto-resolves your own LID jid to its PN alias when you're
  fetching your own order (the MEX endpoint rejects LID jids for this)
  (PR: `Baileys-fix-order-details-pn-lid`)
- **Profile status MEX+legacy dual-write fallback** — see
  [§29 Profile Status](#29-profile-status--emoji--auto-expiry) (PR:
  `Baileys-fix-update-profile-status-about`)
- **Username ingestion** — `Contact.username` populated from
  `participant_username`/`username` attrs (PR: `Baileys-username-ingest`)
- **Mex notification dispatch** & **linked-profiles fix** (PRs:
  `Baileys-feat-mex-notification-dispatch`, `Baileys-fix-mex-linked-profiles`)
- **Browser identity in QR pairing data** (PR: `Baileys-feat-add-browser-to-qr`)
- **`companion_reg_refresh` QR-pairing fix** — when WhatsApp retires an
  unpaired companion's registration mid-flow (a `<notification
  type="companion_reg_refresh">`), Baileys now rotates the advertisement
  secret and re-renders the on-screen QR with it, instead of leaving a QR
  code on screen that the phone will always report as a failed link.
  Nothing to call — it applies automatically while a QR is displayed and
  pairing hasn't completed yet. (Upstream PR #2765, fixes #2737)
- **`INITIAL_STATUS_V3` history sync** — statuses posted before you linked
  the device are now parsed out of history sync and delivered through the
  normal `messaging-history.set` event, instead of being downloaded and
  silently dropped. Nothing to call — just listen for
  `messaging-history.set` as usual and status messages (`key.remoteJid ===
  'status@broadcast'`) will be included. (Upstream PR #2756)
- **Newsletter admin-demote events** — `NotificationNewsletterAdminDemote`
  is routed to this fork's legacy-mex newsletter handler alongside
  `NotificationNewsletterAdminPromote`, but had no case of its own there,
  so every demotion fell through to the "unhandled" default and never
  emitted `newsletter-participants.update`. It now emits the same event a
  promotion does, with `action: 'demote'` and `new_role: 'SUBSCRIBER'`
  via `emitNewsletterRoleUpdate` in
  [`src/addons/newsletter-role-updates.ts`](src/addons/newsletter-role-updates.ts).
  (`author`/`user` also default to an empty string rather than
  `undefined` if the server omits them.)
- **`lottieStickerMessage` unwrapping** — messages get wrapped in
  `lottieStickerMessage` when sent as animated (Lottie) stickers, but the
  content-normalization helper that unwraps future-proof envelopes
  (`ephemeralMessage`, `viewOnceMessage`, `editedMessage`, etc.) didn't
  know about that wrapper, so callers reading `message.message` on a
  Lottie sticker got the wrapper instead of the actual sticker content.
  Nothing to call — normal message handling now unwraps it like any
  other envelope type.
- **`a.whatsapp.net` no longer used as a media download host** —
  `downloadContentFromMessage` builds its download URL from, in order: an
  explicit `host` option, the host parsed from the message's `url` field,
  then `DEF_MEDIA_HOST`. `a.whatsapp.net` is the host WhatsApp puts on
  that generic `url` field, not an actual media CDN host, so treating it
  as a valid directPath host made those downloads fail. It's now treated
  the same as "no host was carried on the message", i.e. `DEF_MEDIA_HOST`
  is used instead. See `resolveDownloadHost` in
  [`src/Utils/messages-media.ts`](src/Utils/messages-media.ts).
- **`blocklist.set` now actually fires** — `BaileysEventMap` has always
  declared a `blocklist.set` event (the full blocklist snapshot, as
  opposed to `blocklist.update`'s incremental add/remove), and
  `fetchBlocklist()` has always queried the server for the full list on
  every connection open as part of `executeInitQueries()` — but the
  result was discarded rather than emitted, so nothing that only listened
  for `blocklist.set` ever received the initial blocklist. It's now
  emitted from inside `fetchBlocklist()`
  ([`src/Socket/chats.ts`](src/Socket/chats.ts)) right after the fetch,
  both on the automatic connect-time call and any manual
  `sock.fetchBlocklist()` call.
- **`'everyone'`/`'nobody'` privacy value aliases** — the various
  `update*Privacy()` functions (`updateLastSeenPrivacy`,
  `updateReadReceiptsPrivacy`, etc.) accept these as friendlier aliases
  for the wire-protocol values `'all'`/`'none'`. Only added where the
  canonical value they alias is itself valid for that setting —
  `updateMessagesPrivacy`, for instance, has no `'none'`/`'nobody'` level
  upstream (only `'all'`/`'contacts'`), so it accepts `'everyone'` but not
  `'nobody'`. The alias is normalized to the canonical value in
  `privacyQuery()` ([`src/Socket/chats.ts`](src/Socket/chats.ts)) right
  before it reaches WhatsApp's privacy XML — the server itself never sees
  `'everyone'`/`'nobody'` literally.
- **`updateBusinessProfile` alias** — this fork's business profile
  updater was originally named `updateBussinesProfile` (missing an "s"
  in "Business"). That name is unchanged for backwards compatibility,
  but `sock.updateBusinessProfile(...)` — the correctly-spelled name
  used by most examples — now resolves to the same function too. See
  [`src/Socket/business.ts`](src/Socket/business.ts).
- **Encrypted message edits** (`secretEncryptedMessage` /
  `SecretEncType.MESSAGE_EDIT`) — WhatsApp added an E2EE envelope for
  message edits (May 2026) alongside the older
  `protocolMessage.editedMessage` path. This fork didn't decrypt it at
  all before, so an edit sent through the new path was silently dropped.
  It's now decrypted (same HKDF-derivation pattern as the existing poll
  vote / event response decryption right above it in the same file) and
  surfaced through the same `messages.update` event the legacy edit path
  already uses, so no new event type is needed. See
  `decryptMessageEdit`/`buildEditUpdate` in
  [`src/Utils/process-message.ts`](src/Utils/process-message.ts).
- **`businessOwnerJid` validation on product messages** — sending a
  `product:` message with no `businessOwnerJid` now throws immediately
  instead of silently building a malformed `productMessage` that
  WhatsApp would reject anyway.
- **Standalone `interactiveButtons` messages now have full parity with
  carousel cards** — the carousel `cards` path already accepted
  convenient button shorthand (`{ text, url }`, `{ text, copy }`,
  `{ text, call }`, `{ text, sections }`, or the default `{ text, id }`
  quick-reply shape), `offerText`/`offerCode`/`offerUrl`/
  `offerExpiration` (a limited-time-offer banner), `optionText`/
  `optionTitle` (a "view more" bottom sheet), and converted it all to
  native_flow's `{ name, buttonParamsJson }` form. A standalone
  (non-carousel) interactive message with `interactiveButtons` only
  accepted the fully-formed button objects and had none of the
  offer/option support. Both paths now share
  `convertNativeFlowButtons` and `buildNativeFlowMessageParamsJson`
  (both in [`src/Utils/messages.ts`](src/Utils/messages.ts)), so the same
  shorthand and offer/option fields work either way. An `audioFooter`
  option (audio instead of a text footer) was also added to the
  standalone path, matching what carousel cards already had.
- **Quoting inside newsletters (channels)** — `generateWAMessageFromContent`
  previously disabled quoting entirely when the target was a newsletter
  (`if (quoted && !isJidNewsletter(jid))`). Quoting now works inside
  newsletters; only `contextInfo.remoteJid` is skipped for them, since
  that field only makes sense for cross-chat (group) quoting.
- **`previewType` on link previews** — `WAUrlInfo` gained a
  `previewType` field (e.g. to request video-style preview playback);
  previously always hardcoded to `0` regardless of what was passed. Only
  takes effect if you set it — omitted, behavior is unchanged.
- **Poll expiry, add-option, and quiz support** — `PollMessageOptions`
  gained `endDate` (expiration), `canAddOption` (let participants add
  their own options), and `pollType`/`correctAnswer` (quiz polls,
  newsletter-only — throws if `correctAnswer` is missing when
  `pollType: 1`). Required adding `endTime` and `allowAddOption` fields
  to `PollCreationMessage` in `WAProto.proto` itself (verified against
  another fork's actual wire encoding before adding — WhatsApp had
  added these to the protocol but this fork's proto never had them) and
  regenerating the proto bindings.
- **`pollResult` (poll-results summary) now actually works** —
  `AnyMessageContent` had a `pollResult` type declared, but nothing in
  `generateWAMessageContent` ever implemented it — sending it did
  nothing (same bug class as the `blocklist.set` fix). Replaced with a
  friendly `PollResultOptions` (`name`/`votes`/`pollType`) type and a
  real implementation.
- **`pollUpdate`** (send a raw, pre-encrypted poll vote) — new, advanced/
  low-level API; the caller supplies an already-encrypted vote payload.
- **`richResponse[]` array format is now correctly typed** — the runtime
  already supported passing `richResponse` as an array of submessages
  (text/code/table items), via `src/addons/rich-message-utils.ts`, but
  the public `AnyMessageContent` type only declared the flat
  single-object shorthand — passing an array was a TypeScript error even
  though it worked at runtime. Fixed by using the addon's own
  (already-correct) `RichContent` type for the public API instead of a
  narrower duplicate declaration.
- **`flowReply`** (reply to a native-flow interactive message,
  `interactiveResponseMessage`) — was completely missing; proto already
  supported it.
- **`buttons:` array shorthand now supports `sections`/native-flow
  buttons** — previously every button in a plain `buttons:` array was
  force-set to a classic `RESPONSE` type, so a button with `sections`
  (meant to become a `single_select` native-flow button) was silently
  turned into a broken/invalid button. Buttons with `sections` or a raw
  `name` now correctly route to native_flow; everything else still
  becomes a classic response button.
- **`templateButtons:` shorthand** — previously required fully-formed
  `IHydratedTemplateButton` objects; now also accepts `{ text, id }` →
  quickReplyButton, `{ text, url }` → urlButton, `{ text, call }` →
  callButton shorthand, matching the documented examples.
- **Convenience proto enum aliases** — `ButtonHeaderType`, `ButtonType`,
  `CarouselCardType`, `ProtocolType` exported as shorter aliases for
  their `WAProto.Message.*` equivalents (e.g. `ButtonType` for
  `WAProto.Message.ButtonsMessage.Button.Type`). No new capability —
  the underlying enums were already reachable via `WAProto`, just longer
  to type.
- **Quiz-poll-only-in-newsletter validation** — sending a quiz poll
  (`pollType: 1`) outside a newsletter now throws instead of silently
  producing a poll WhatsApp would reject.
- **Correct `edit` attribute for newsletter message edits** — was always
  `'1'`; edits inside a newsletter now correctly send `'3'`. Keep-in-chat
  messages are now grouped with delete-messages for this attribute
  (both need the same admin-delete-detection logic).
- **AI-icon-only-in-private-chat now throws instead of silently no-op'ing**
  — sending `{ ai: true }` outside a 1:1 chat previously just skipped
  adding the AI icon without telling the caller; it now throws so the
  mistake is caught immediately.
- **Album minimum-2-media validation** — sending an album with fewer
  than 2 items now throws instead of producing a malformed album
  message.
- **`externalAdReply` direct shorthand** — attach an ad-reply preview
  without building `contextInfo` yourself first:
  `sock.sendMessage(jid, { text, externalAdReply: {...} })`. Includes a
  thumbnail-buffer-type validation. The capability already existed via
  raw `contextInfo.externalAdReply`; this is a shorthand, not new
  reach.
- **Poll `messageContextInfo` ordering bug** — `m.messageContextInfo`
  was being set on the message object *before* the actual
  `pollCreationMessage*` field. Several downstream steps
  (`groupStatus`, `spoiler`, `externalAdReply`, mentions, ephemeral
  expiration) detect "the message type" via `Object.keys(m)[0]` —
  with `messageContextInfo` set first, that resolved to
  `'messageContextInfo'` instead of the actual poll field, silently
  misplacing any of those options when combined with a poll. Fixed by
  setting `messageContextInfo` after the poll field, matching every
  other message type's ordering.
- **`refreshMediaConn` race condition** — wasn't guarded by a mutex, so
  two concurrent calls needing a refresh (e.g. two messages sent at
  once) could race: duplicate network requests and inconsistent shared
  state. Now uses the same `makeKeyedMutex` pattern already used for
  Signal session encryption in the same file.
- **`sock.onWhatsApp()` now accepts LID jids** — previously only accepted
  phone-number jids and logged a warning for any LID passed in. LID jids
  are now resolved to their phone-number form via
  `signalRepository.lidMapping.getPNForLID()` and existence-checked the
  same way as any other number, with results reported back under the
  original LID. A LID with no known PN mapping is reported as not
  existing rather than guessed at. Uses the helpers in
  [`src/addons/lid-support.ts`](src/addons/lid-support.ts).
- **`sock.sendStickerPack()`** — a dedicated method for the alternate
  sticker-pack builder (`prepareStickerPackMessage`,
  [`src/addons/stickerpack.ts`](src/addons/stickerpack.ts)). This builder
  is a separate implementation from the one
  `sock.sendMessage(jid, { stickerPack: {...} })` already uses
  internally; both remain available, and `sendStickerPack` gives the
  alternate one a normal `sock.*` call instead of requiring
  `sock.relayMessage()` directly:
  ```ts
  await sock.sendStickerPack(jid, {
     cover: coverBuffer,
     stickers: [{ data: sticker1Buffer, emojis: ['🎉'] }, { data: sticker2Buffer }],
     name: 'My Pack',
     publisher: 'Me'
  })
  ```
- **Dual content/options flags** — `groupStatus`, `isLottie`, `spoiler`,
  `secureMetaServiceLabel`, `ai`, and `ephemeral` can each be set either
  as a content-level property or as an options-level property —
  whichever is set wins; if both are set, content takes priority:
  ```ts
  // these two are equivalent
  await sock.sendMessage(jid, { image: {...}, spoiler: true })
  await sock.sendMessage(jid, { image: {...} }, { spoiler: true })
  ```
- **`ephemeral: true` shorthand** — sends a disappearing message using
  WhatsApp's default expiration, without needing to compute
  `ephemeralExpiration` yourself (an explicit `ephemeralExpiration`
  always takes priority if given):
  ```ts
  await sock.sendMessage(jid, { image: {...}, ephemeral: true })
  ```

---

### 20. Album Send

Send multiple images/videos as a native WhatsApp album (carousel of media):

```ts
await sock.sendMessage(jid, {
    album: [
        { image: { url: 'https://example.com/photo1.jpg' }, caption: 'First photo' },
        { image: fs.readFileSync('./photo2.png') },
        { video: { url: 'https://example.com/clip.mp4' }, caption: 'Short clip' }
    ]
}, {
    delayMs: 800  // delay between each media relay (default: 800ms)
})
```

**How it works:**
1. An `albumMessage` container is sent first (with expected image/video counts)
2. Each media item is then relayed individually, linked back to the parent via `messageAssociation`
3. `hasValidAlbumMedia` validates each item is image or video before sending
4. Invalid items throw `400 Bad Request` instead of silently failing

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
const contacts = await sock.fetchContactUsernames(
    '1234567890@s.whatsapp.net',
    '0987654321@s.whatsapp.net'
)

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
sock.USERNAME_QUERY_IDS  // { CHECK, CHECK_MULTI, SET, GET, GET_RECOMMENDATIONS, PIN_SET }
sock.USERNAME_CHECK_RESULT  // { SUCCESS, INVALID }
sock.USERNAME_SOURCE  // { FB, IG, USER_INPUT, SUGGESTION }
```

---

### 22. Enterprise Bot Framework (`src/Framework/`)

A high-level `Bot` class with middleware routing, command handling, SQLite-backed
sessions/stats, and automatic reconnect with message queueing.

```ts
import { Bot } from '@queenanya/baileys'
import { useMultiFileAuthState } from '@queenanya/baileys'
import pino from 'pino'

const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
const logger = pino({ level: 'info' })

const bot = new Bot({
    socketConfig: { auth: state, logger },
    dbPath: './bot_store.db',   // per-instance — avoids shared-DB collisions
    enableStats: true,
    logger
})

await bot.start()                          // creates bot.socket
bot.socket!.ev.on('creds.update', saveCreds) // register AFTER start()

bot.command('!sticker', async ctx => {
    await ctx.replySticker(imageBuffer, { packname: 'My Pack', author: 'Me' })
})

bot.command('!ghosts', async ctx => {
    const ghosts = await bot.stats!.getGhosts(ctx.remoteJid!, true, 30)
    // ...
})
```

**Source:** PR #2710 (LuferOS). The upstream PR had **12
reviewer-flagged bugs across P0–P3 severity and was never revised** — all are
fixed here before inclusion:

| # | Bug | Severity | Fix |
|---|---|---|---|
| 1 | `bot.socket?.ev.on('creds.update', ...)` called before `bot.start()` — socket is `undefined`, listener silently never registers, session lost on every restart | P0 | `bot-example.ts` now calls `await bot.start()` **first**, then registers `creds.update` |
| 2 | `require('node-webpmux')` — CJS `require` crashes in ESM at import time | P1 | `createRequire(import.meta.url)` in `MediaManager.ts` |
| 3 | Voice notes missing `-ac 1` / `-ar 16000` / `-application voip` — WA rejects or misplays non-mono Opus | P1 | Full param set added in `convertToVoiceNote()` |
| 4 | Stats stored/queried with raw (non-normalized) JIDs — device-suffix variants split into separate entries, active users misreported as "ghosts" | P1 | `jidNormalizedUser()` applied in `observeMessage()` and `getGhosts()` |
| 5 | `text.startsWith(cmd)` matches `!stickerSpam` for command `!sticker` | P2 | `Bot.command()` now requires exact match or `cmd + ' '` prefix |
| 6 | Message queue never rejected on `DisconnectReason.loggedOut` — pending promises hang forever | P2 | `rejectQueue()` called on logged-out close with `Boom(401)` |
| 7 | `fs.writeFileSync`/`readFileSync`/`unlinkSync` block the event loop during media conversion | P2 | All I/O switched to `fs.promises.*` in `MediaManager.ts` |
| 8 | `SQLiteStore.set()` stored raw strings unconditionally — `get<string>()` on a JSON-looking string round-trips incorrectly | P2 | Always `JSON.stringify()` on write, `JSON.parse()` on read, with legacy fallback |
| 9 | `new SQLiteStore('baileys_store.db')` hardcoded — two Bot instances in the same directory share (and corrupt) state | P2 | `BotConfig.dbPath` is now required/configurable, defaults documented |
| 10 | All logging via `console.log`, including raw JIDs in log lines — no log-level control, not Pino-compatible | P2 | `BotConfig.logger: ILogger` — structured, Pino-compatible logging throughout |
| 11 | `Context.text` only reads `conversation`/`extendedTextMessage` — a command sent as an image caption never matches | P3 | `text` getter also checks `imageMessage.caption`, `videoMessage.caption`, `documentMessage.caption` |
| 12 | `import makeWASocket` (value import) used only as a type — breaks under `verbatimModuleSyntax` | P1 | Changed to `import type makeWASocket` in `Context.ts` |

**Dependencies:** `node-webpmux`, `fluent-ffmpeg`, `ffmpeg-static`, `better-sqlite3` are
regular (hard) dependencies of this package — since `Framework/` is exported
unconditionally from the package root, they must always be installed rather
than left as optional peer dependencies (which previously caused `Cannot find
module` build failures for anyone who hadn't separately installed them).

---

### 23. WAProto Schema Extensions

74 extra message types beyond the real upstream library — bots,
polls-add-option, split-payments, event-invites, chat-theming,
subscription/broadcast app-state-sync actions, and more. **Schema-only**
— encode/decode works
(`proto.SplitPaymentMessage.create({...})`), but no `Socket` helper sends
or recognizes them automatically yet. See `WAProto/WAProto.proto` for the
full schema.

### 24. Hidden-Voter Polls (V6)

Send a poll where WhatsApp hides individual voter names in the results:

```ts
await sock.sendMessage(jid, {
	poll: {
		name: 'Pick a time',
		values: ['9 AM', '2 PM', '6 PM'],
		selectableCount: 1,
		hideVoterNames: true // uses the V6 poll wire format
	}
})
```

Omit `hideVoterNames` (or set it `false`) for a normal poll — the standard
V2/V3/V1 format is used as before.

### 25. Phone-Generated Link Previews

Ask the paired phone to generate a high-quality link preview natively
(better quality than fetching + parsing the URL yourself), instead of the
default local `link-preview-js` fetch:

```ts
const requestId = await sock.requestPhoneLinkPreview('https://example.com')

sock.ev.on('link-preview.update', ({ requestId: id, url, urlInfo }) => {
	console.log('Preview ready for', url, urlInfo.title)
	// use urlInfo as the `linkPreview` field when you send the actual message
})
```

The response arrives asynchronously via the `link-preview.update` event —
match it to your request using the returned `requestId`.

### 26. Shortcake Passkey Companion Linking

Complete WhatsApp's passkey-based companion-linking handshake headlessly,
by providing a callback that signs the WA challenge with your platform's
passkey/WebAuthn provider:

```ts
const sock = makeWASocket({
	auth: state,
	signPasskeyAssertion: async challenge => {
		// sign `challenge` with your platform's FIDO2/WebAuthn authenticator
		// and return the raw assertion signature bytes
		return await myPasskeyProvider.sign(challenge)
	}
})

sock.ev.on('connection.update', ({ passkeyRequest }) => {
	if (passkeyRequest) {
		console.log('Passkey linking step:', passkeyRequest.type)
		// handshake completes automatically if signPasskeyAssertion is set;
		// this event fires either way so you can show UI/logs
	}
})
```

Without `signPasskeyAssertion`, the `passkeyRequest` event still fires (so
you know a passkey step occurred), but the handshake itself won't be
completed automatically.

### 27. Jimp Profile-Picture Generators (`media-messages.ts` / `media-set.ts`)

Lower-level Jimp-based image resizing + profile-picture setters, useful
when you want to generate the resized buffer yourself before sending (e.g.
to preview it, cache it, or pick which variant to upload):

```ts
import {
	generateProfilePictureFull, // wide/panoramic-style resize (720 or 324 wide, by aspect)
	generateProfilePictureFP, // square: { img: 720x720 fit, preview: normalized }
	generatePP, // alias of generateProfilePictureFP
	generateProfilePicturee, // flexible input (Buffer | { url } | { stream }), 720px longer side
	updateProfilePictureFull, // sets the main (scaled-to-fit) image via w:profile:picture IQ
	updateProfilePictureFull2, // sets the normalized preview image via w:profile:picture IQ
	groupStatus, // send a group-only status update to one group
	groupStatusV2, // send a group-only status update to multiple groups
	groupSetMemberLabel // set/update a member's label in a group (awaited)
} from '@queenanya/baileys'

// Resize + set a group's profile picture in one go:
const buffer = await fs.promises.readFile('./photo.jpg')
await updateProfilePictureFull(groupJid, buffer, sock)

// Or generate the buffer yourself first (e.g. to preview before sending):
const { img, preview } = await generateProfilePictureFP(buffer)
```

> For most cases, prefer the standard [`updateProfilePicture`](#change-profile)
> (see Change Profile, above) — these lower-level generators are for when
> you specifically need the resized buffer itself, or the group-status /
> member-label helpers, which aren't in the standard API.
>
> `changeprofileFull` is an alias of `generateProfilePictureFull`.
> `groupLabel(jid, text, sock)` is a fire-and-forget variant of
> `groupSetMemberLabel` (errors are swallowed rather than thrown) —
> prefer `groupSetMemberLabel` if you need to await/observe failures.

### 28. Panoramic (Wide/Banner) Profile Picture

Set a full-width banner-style profile picture (in addition to the normal
square one) without square cropping:

```ts
const buffer = await fs.promises.readFile('./wide-banner.jpg')
await sock.updatePanoramaProfilePicture(jid, buffer, {
	maxWidth: 720, // optional, defaults to 720
	quality: 90 // optional JPEG quality, defaults to 100
})
```

### 29. Profile Status — Emoji & Auto-Expiry

The standard `updateProfileStatus` now optionally accepts an emoji and an
auto-expiry duration (in seconds). (Upstream PR #2755)

```ts
// Plain text status (unchanged, still works)
await sock.updateProfileStatus('Busy right now')

// With emoji + auto-expiry after 1 hour
await sock.updateProfileStatus('In a meeting', '📅', 3600)

// Object form — same fields, explicit
await sock.updateProfileStatus({ text: 'In a meeting', emoji: '📅', ephemeralDuration: 3600 })

// Clear the status
await sock.updateProfileStatus('')
```

Status text is truncated to 50 Unicode code points if longer (matching
WhatsApp's current About-text limit). If you don't pass a duration, it
defaults to 24 hours — WhatsApp's MEX endpoint rejects an explicit `0`
with a 400 error when *setting* a status (`0` is only valid when
*clearing* one).

This writes through both WhatsApp's modern MEX endpoint and the legacy
`xmlns: 'status'` IQ — some surfaces still read the legacy field, so both
get updated. If the MEX write fails, the legacy one is still attempted
rather than failing outright immediately (PR:
`Baileys-fix-update-profile-status-about`).

To **read** a contact's modern text status (emoji + auto-expiry included,
unlike the legacy plain-text status), use a USync query with
`withTextStatusProtocol()`:

```ts
import { USyncQuery, USyncUser } from '@queenanya/baileys'

const query = new USyncQuery()
	.withTextStatusProtocol()
	.withUser(new USyncUser().withPhoneNumber('12345678901'))

const result = await sock.executeUSyncQuery(query)
const textStatus = result?.list[0]?.text_status
// { text, emoji, ephemeralDurationSeconds, lastUpdateTime }
```

### 30. Voice Calling (WASM-based, same session)

Place an actual voice call — real audio in and out — directly from your
existing socket, no separate connection needed:

```ts
const call = await sock.initiateCall(normalizedJid, {
	audioSource: './audio.mp3', // MP3/WAV file path, or 'silence' for an empty uplink
	durationMs: 30000 // optional; auto-hangup after this long (default 120000)
})

call.on('ringing', () => console.log('Call is ringing...'))
call.on('connected', () => console.log('Connected & streaming audio!'))
call.on('audio', pcmChunk => {
	/* incoming 16 kHz Float32Array PCM */
})
call.on('ended', reason => console.log('Call ended:', reason))
call.on('error', err => console.log('Call error:', err))
```

The WASM voice-calling engine only initializes on your **first**
`initiateCall()` — bots that never place a call pay no extra startup cost.
Requires the optional peer dependency `@roamhq/wrtc` (native WebRTC
bindings) — install it separately if you plan to use this feature:

```
yarn add @roamhq/wrtc
```

#### Video Calls

```ts
const videoCall = await sock.initiateCall(normalizedJid, {
	isVideo: true,
	videoSource: './video.mp4',
	audioSource: './audio.mp3', // or 'silence', or the same file as videoSource
	videoWidth: 640,            // default: 640 (rounded up to even)
	videoHeight: 480,           // default: 480 (rounded up to even)
	videoFps: 15,               // default: 15
	videoLoop: true,            // loop the video source until durationMs
	durationMs: 30000
})

videoCall.on('videoStarted', () => console.log('video stream started'))
videoCall.on('videoEnded', () => console.log('video stream ended (source EOF)'))
videoCall.on('videoError', err => console.error('video stream error:', err))
```

Video frames are decoded from `videoSource` (MP4/MKV/MOV/AVI, anything
ffmpeg reads) into raw YUV420p and pushed into the same call the audio
pipeline uses — video starts once the call's audio pipeline is confirmed
live, since that's a reliably-observed signal; there's no separate
WASM-side "video ready" callback to wait on.

##### Orientation (landscape video)

```ts
const videoCall = await sock.initiateCall(normalizedJid, {
	isVideo: true,
	videoSource: './video.mp4',
	isHorizontal: true // stream landscape instead of the default portrait
	// or set the raw orientation flag directly: orientation: 2
})
```

#### Repeating the audio/video source

By default `audioSource`/`videoSource` play once and then the call falls
back to silence/frozen frame until `durationMs` hits. Pass `repeatAudio`
(alias: `repeat`) / `videoLoop` (aliases: `repeatVideo`, `loop`) to loop
the file continuously for the life of the call instead:

```ts
const call = await sock.initiateCall(normalizedJid, {
	audioSource: './hold-music.mp3',
	repeatAudio: true, // loops hold-music.mp3 until durationMs / call.end()
	durationMs: 60000
})
```

#### Call status, muting, and waiting for the end

Besides the numeric `call.state` (mirrors the raw WASM `CallState`),
every call also exposes a higher-level `call.status` string plus a
`stateChange` event — useful when you just want to know "is this call
still going" without decoding WASM state numbers:

```ts
const call = await sock.initiateCall(normalizedJid, { audioSource: './hi.mp3' })

call.on('stateChange', status => console.log('status →', status))
// idle → initiating → ringing → accepted → connected → audio_ready → streaming → ended
// (or: → unreachable / rejected / timeout / failed, if the call doesn't connect)

call.on('accepted', () => console.log('remote device accepted the call'))
call.on('audioReady', () => console.log('audio pipeline is live'))
call.on('streaming', () => console.log('first audio chunk sent'))

call.mute(true) // mute your outgoing audio without ending the call
const reason = await call.waitForEnd() // resolves once the call ends, with the reason

console.log(call.peerJid, call.phoneNumber, call.startedAt, call.getSummary())
```

If the remote device never confirms ringing within `preRingingTimeoutMs`
(default 20000ms), the call auto-ends with status `'unreachable'` instead
of sitting around until `durationMs` — useful for detecting dead/invalid
numbers quickly:

```ts
const call = await sock.initiateCall(normalizedJid, {
	audioSource: './hi.mp3',
	preRingingTimeoutMs: 8000 // fail fast after 8s of no ringing confirmation
})
call.on('ended', reason => {
	// reason is one of: 'completed' | 'unreachable' | 'rejected' | 'timeout' |
	//                    'remote_end' | 'disconnect' | 'ended' | <error message>
})
```

#### Concurrent calls

`initiateCall()` can be called multiple times without waiting for the
previous call to end — each call gets its own isolated WASM engine, so
they don't share audio/video buffers or interfere with each other:

```ts
// Place several calls at once
const [placedCall1, placedCall2] = await Promise.all([
	sock.initiateCall('12345678901', { audioSource: './a.mp3' }),
	sock.initiateCall('19876543210', { audioSource: './b.mp3' })
])

// or the batch helper, which doesn't let one failure stop the rest
const calls = await sock.initiateCalls([
	{ jid: '12345678901', options: { audioSource: './a.mp3' } },
	{ jid: '19876543210', options: { audioSource: './b.mp3' } }
])

// Manage everything currently open on this socket
console.log(await sock.getActiveCallCount())
console.log(await sock.getActiveCalls()) // CallSummary[]
const one = await sock.getCall(placedCall1.callId)
await sock.endCall(placedCall1.callId)
await sock.endAllCalls()

// Cap how many calls this socket will run at once (default: unlimited)
await sock.setVoipOptions({ maxConcurrentCalls: 5 })
```

#### Call links & rejecting incoming calls

```ts
// Get a shareable call.whatsapp.com link (doesn't place a call itself)
const token = await sock.createCallLink('video') // or 'audio'
console.log(`https://call.whatsapp.com/video/${token}`)

// Reject an incoming call (e.g. from a call-offer event)
sock.ev.on('call', async ([call]) => {
	if (call.status === 'offer') {
		await sock.rejectCall(call.id, call.from)
	}
})
```

Ported from [`baileys-caller`](https://github.com/SheIITear/baileys-caller)
and adapted to run on your **existing** socket/session (the original
package creates its own separate connection).

#### Standalone client (separate session)

For cases where you want calling fully decoupled from your main bot —
its own auth directory, its own QR scan — use `createVoipClient()`
instead. This is a vendored internal port of `baileys-caller`'s
standalone client; it shares the same WASM/signaling/relay/audio engine
as `sock.initiateCall()` above, just wired to its own independent
connection rather than your bot's. It mirrors the same concurrent-call
API too (`callMany`, `getActiveCalls`, `getCall`, `getActiveCallCount`,
`endCall`, `endAllCalls`, `setOptions`):

```ts
import { createVoipClient } from '@queenanya/baileys'

const voip = await createVoipClient({ authDir: './voip_auth' })
const call = await voip.call('12345678901', { audioSource: './hello.mp3' })

call.on('connected', () => console.log('call connected'))
call.on('ended', reason => console.log('call ended:', reason))

// Multiple calls at once, same as sock.initiateCalls()
const calls = await voip.callMany([
	{ jid: '12345678901', options: { audioSource: './a.mp3' } },
	{ jid: '19876543210', options: { audioSource: './b.mp3' } }
])

// later
voip.disconnect()
```

### 31. `companionPlatformDisplay` Override (Pairing by Code)

WhatsApp validates the `companion_platform_display` field sent during
pairing-by-code registration. Baileys derives it from your `browser`
config as `` `${browser[1]} (${browser[0]})` `` — e.g. `Chrome (Windows)`.
QR pairing accepts any value here, but pairing **by code** does not: if
you put a product name in `browser[0]` (a common integrator pattern, since
that's also what shows up under WhatsApp's "Linked devices" list), the
server rejects the `companion_hello` with `400 bad-request`.

Because `requestPairingCode()` generates the code locally before the
stanza is even acknowledged, this failure used to be **silent** — the
promise resolved, a code came back, and the user would type a code that
could never work, with no error surfaced anywhere below `trace`-level
logging.

Two fixes ship together here:

1. An optional `companionPlatformDisplay` on the socket config lets you
   keep a product name in `browser[0]` (for the Linked-devices UI) while
   sending a value WhatsApp actually accepts for validation.
   `DEFAULT_CONNECTION_CONFIG` (`src/Defaults/index.ts`) carries a real
   default for it, derived from the same `Browsers.ubuntu('Firefox')` used
   for the default `browser`. If you override `browser` without also
   setting `companionPlatformDisplay`, you'll get this default's display
   string rather than one derived from your own `browser` — set both
   together if you're overriding `browser`.
2. The registration IQ is now awaited (`query` instead of fire-and-forget),
   and credentials are only persisted after the server actually accepts —
   so a rejected or timed-out registration now throws instead of quietly
   handing back a dead code.

```ts
const sock = makeWASocket({
	browser: ['My Product', 'Chrome', '10.0'], // shown under Linked Devices
	companionPlatformDisplay: 'Chrome (Windows)' // what WhatsApp validates — omit to fall back to `${browser[1]} (${browser[0]})`
})

const code = await sock.requestPairingCode('XXXXXXXXXXX')
```

If omitted, behavior is unchanged (byte-identical payload to before). If the
server rejects the registration (bad `companionPlatformDisplay` value,
rate-limited, or timed out), `requestPairingCode()` now throws instead of
returning a code that will never work.

(Upstream PR #2769)

---


### 📦 Fork Base

This fork is based on the original open-source Baileys library.

### 📣 Credits

This fork uses Protocol Buffer definitions maintained by [WPP Connect](https://github.com/wppconnect-team) via [`wa-proto`](https://github.com/wppconnect-team/wa-proto).

Full credit is attributed to the original maintainers and contributors of Baileys:
- [purpshell](https://github.com/purpshell)
- [jlucaso1](https://github.com/jlucaso1)
- [adiwajshing](https://github.com/adiwajshing)

Several fork-exclusive features documented above were adapted from other
community projects in the Baileys ecosystem, including the third-party
[baileys-caller](https://github.com/SheIITear/baileys-caller) SDK
(VoIP calling).

---

# About This Fork (@queenanya/baileys)

This is an extended fork of the original open-source Baileys library, adding
35+ addon modules (rich responses, interactive buttons, scheduling, status
posting, call handling, extra auth-state backends, and more), a WhatsApp
username API, album send, sticker packs, and other fork-exclusive features
documented in [Fork-Exclusive Features — Usage Guide](#fork-exclusive-features--usage-guide)
above.

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

##

- Baileys does not require Selenium or any other browser to be interface with WhatsApp Web, it does so directly using a **WebSocket**.
- Not running Selenium or Chromium saves you like **half a gig** of ram :/
- Baileys supports interacting with the multi-device & web versions of WhatsApp.
- Thank you to [@pokearaujo](https://github.com/pokearaujo/multidevice) for writing his observations on the workings of WhatsApp Multi-Device. Also, thank you to [@Sigalor](https://github.com/sigalor/whatsapp-web-reveng) for writing his observations on the workings of WhatsApp Web and thanks to [@Rhymen](https://github.com/Rhymen/go-whatsapp/) for the **go** implementation.

> [!IMPORTANT]
> The original repository had to be removed by the original author - we now continue development in this repository here.
> This is the only official repository and is maintained by the community.
> **Join the Discord [here](https://discord.gg/WeJM5FP9GG)**

# Links
- [Innovators](https://discord.gg/G3RfM6FDHS)
- [Itsukichan](https://discord.gg/nqssuNjjSH)
- [QueenAnya Discord](https://discord.gg/WeJM5FP9GG)

# License

Copyright (c) 2026 QueenAnya

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
