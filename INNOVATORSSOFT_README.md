# Baileys — innovatorssoft Feature Port

This patch adds all features from `@innovatorssoft/baileys` into `@whiskeysockets/baileys`.

---

## Table of Contents

- [Sending Messages](#sending-messages)
  - [Text Message](#text-message)
  - [Image / Video / Document / Audio](#image--video--document--audio)
  - [HD Image / HD Video](#hd-image--hd-video)
  - [Album Message](#album-message)
  - [Sticker Pack Message](#sticker-pack-message)
  - [Event Message](#event-message)
  - [Call Message](#call-message)
  - [Payment Message](#payment-message)
  - [Payment Invite Message](#payment-invite-message)
  - [Admin Invite Message](#admin-invite-message)
  - [Group Invite Message](#group-invite-message)
  - [vCard / Contact Cards](#vcard--contact-cards)
  - [Share / Request Phone Number](#share--request-phone-number)
  - [Disappearing Messages](#disappearing-messages)
  - [Clear Messages](#clear-messages)
- [Button Messages](#button-messages)
  - [Classic Buttons (iOS + Android)](#classic-buttons-ios--android)
  - [Interactive Buttons (native flow)](#interactive-buttons-native-flow)
  - [Template Buttons](#template-buttons)
  - [List / Sections Message](#list--sections-message)
  - [Cards / Carousel Message](#cards--carousel-message)
  - [Shop Message](#shop-message)
  - [Collection Message](#collection-message)
  - [Buttons Interactive Message PAY](#buttons-interactive-message-pay)
  - [Buttons Interactive Message PIX](#buttons-interactive-message-pix)
  - [Buttons Reply Message](#buttons-reply-message)
- [Interactive Helpers](#interactive-helpers)
- [Status / Story](#status--story)
  - [Text Status](#text-status)
  - [Media Status](#media-status)
  - [Status Mentions](#status-mentions)
  - [Broadcast Lists](#broadcast-lists)
- [Calls](#calls)
  - [Initiate Voice Call](#initiate-voice-call)
  - [Reject Call](#reject-call)
- [AI Icon Feature](#ai-icon-feature)
- [innovatorssoft Utils](#innovatorssoft-utils)
  - [Anti-Delete System](#anti-delete-system)
  - [Message Scheduler](#message-scheduler)
  - [Auto-Reply System](#auto-reply-system)
  - [Message Templates](#message-templates)
  - [Message Search](#message-search)
  - [vCard Helpers](#vcard-helpers)
  - [Status Helpers](#status-helpers)
  - [Chat Control](#chat-control)
  - [JID Plotting & LID Support](#jid-plotting--lid-support)
- [Data Store (Implementing)](#data-store-implementing)

---

## Sending Messages

### Text Message
```ts
await conn.sendMessage(jid, { text: 'Hello World!' })
```

### Image / Video / Document / Audio
```ts
// Image
await conn.sendMessage(jid, {
  image: { url: 'https://example.com/img.jpg' },
  caption: 'Hello!'
})

// Video
await conn.sendMessage(jid, {
  video: { url: 'https://example.com/video.mp4' },
  caption: 'Watch this'
})

// Document
await conn.sendMessage(jid, {
  document: { url: 'https://example.com/file.pdf' },
  mimetype: 'application/pdf',
  fileName: 'file.pdf'
})

// Audio / Voice Note
await conn.sendMessage(jid, {
  audio: { url: 'https://example.com/audio.mp3' },
  mimetype: 'audio/mp4',
  ptt: true  // voice note
})
```

### HD Image / HD Video
```ts
// HD Image — full quality, no compression
await conn.sendMessage(jid, {
  image: { url: 'https://example.com/photo.jpg' },
  caption: 'High quality photo',
  hd: true
})

// HD Video
await conn.sendMessage(jid, {
  video: { url: 'https://example.com/video.mp4' },
  caption: 'HD video',
  hd: true
})
```

### Album Message
```ts
await conn.sendMessage(jid, {
  album: [
    { image: { url: 'https://example.com/img1.jpg' }, caption: 'Photo 1' },
    { image: Buffer, caption: 'Photo 2' },
    { video: { url: 'https://example.com/video.mp4' }, caption: 'Video 1' },
    { video: Buffer }
  ]
})
```

### Sticker Pack Message
```ts
await conn.sendMessage(jid, {
  stickerPack: {
    name: 'My Pack',
    publisher: 'Author Name',
    description: 'Cool stickers',
    cover: fs.readFileSync('./cover.webp'),
    stickers: [
      { sticker: fs.readFileSync('./sticker1.webp'), emojis: ['😀'] },
      { sticker: fs.readFileSync('./sticker2.webp'), emojis: ['😂'], isAnimated: true }
    ]
  }
})
```

### Event Message
```ts
await conn.sendMessage(jid, {
  event: {
    name: 'Team Meeting',
    description: 'Weekly sync',
    startDate: new Date('2025-12-25T10:00:00'),
    endDate: new Date('2025-12-25T11:00:00'),
    location: { degreesLatitude: 0, degreesLongitude: 0, name: 'Office' }
  }
})
```

### Call Message
```ts
// Schedule a call (not initiate — see Calls section for that)
await conn.sendMessage(jid, {
  call: {
    name: 'Team Call',
    time: Date.now() + 3600000, // 1 hour from now
    type: 1  // 1=audio, 2=video
  }
})
```

### Payment Message
```ts
await conn.sendMessage(jid, {
  payment: {
    note: 'Payment for services',
    currency: 'USD',
    amount: 100,
    expiry: Date.now() + 86400000
  }
})
```

### Payment Invite Message
```ts
await conn.sendMessage(jid, {
  paymentInvite: {
    type: 2,
    expiry: Date.now() + 86400000
  }
})
```

### Admin Invite Message
```ts
await conn.sendMessage(jid, {
  adminInvite: {
    jid: '120363xxxxxx@newsletter',
    name: 'My Channel',
    caption: 'Join my channel!',
    expiration: Date.now() + 604800000
  }
})
```

### Group Invite Message
```ts
await conn.sendMessage(jid, {
  groupInvite: {
    jid: 'groupjid@g.us',
    inviteCode: 'abc123',
    inviteExpiration: Date.now() + 604800000,
    text: 'Join our group!',
    subject: 'My Group'
  }
})
```

### vCard / Contact Cards
```ts
// Single contact
await conn.sendMessage(jid, {
  contacts: {
    displayName: 'John Doe',
    contacts: [{
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL;type=CELL:+1234567890\nEND:VCARD`
    }]
  }
})

// Multiple contacts
await conn.sendMessage(jid, {
  contacts: {
    displayName: '3 Contacts',
    contacts: [
      { vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Alice\nTEL:+1111111111\nEND:VCARD` },
      { vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Bob\nTEL:+2222222222\nEND:VCARD` }
    ]
  }
})
```

### Share / Request Phone Number
```ts
// Share your phone number
await conn.sendMessage(jid, { sharePhoneNumber: true })

// Request phone number
await conn.sendMessage(jid, { requestPhoneNumber: true })
```

### Disappearing Messages
```ts
// Enable (24h)
await conn.sendMessage(jid, { disappearingMessagesInChat: true })
// Enable (7 days)
await conn.sendMessage(jid, { disappearingMessagesInChat: 604800 })
// Disable
await conn.sendMessage(jid, { disappearingMessagesInChat: false })
```

### Clear Messages
```ts
// Clear/delete message for me
await conn.clearMessage(jid, messageKey, messageTimestamp)
```

---

## Button Messages

### Classic Buttons (iOS + Android)
```ts
// Text + buttons
await conn.sendMessage(jid, {
  text: 'Choose an option:',
  footer: 'Powered by Bot',
  buttons: [
    { buttonId: 'btn1', buttonText: { displayText: '✅ Yes' } },
    { buttonId: 'btn2', buttonText: { displayText: '❌ No' } },
    { buttonId: 'btn3', buttonText: { displayText: '🤔 Maybe' } }
  ]
})

// Image + buttons
await conn.sendMessage(jid, {
  image: { url: 'https://example.com/img.jpg' },
  caption: 'What do you think?',
  footer: 'Select below',
  buttons: [
    { buttonId: 'like', buttonText: { displayText: '👍 Like' } },
    { buttonId: 'dislike', buttonText: { displayText: '👎 Dislike' } }
  ]
})

// Video + buttons
await conn.sendMessage(jid, {
  video: { url: 'https://example.com/video.mp4' },
  caption: 'Watch and choose',
  buttons: [
    { buttonId: 'subscribe', buttonText: { displayText: '🔔 Subscribe' } }
  ]
})

// Document + buttons
await conn.sendMessage(jid, {
  document: { url: 'https://example.com/file.pdf' },
  mimetype: 'application/pdf',
  fileName: 'file.pdf',
  caption: 'Read this document',
  buttons: [
    { buttonId: 'confirm', buttonText: { displayText: '✅ Confirmed' } }
  ]
})
```

### Interactive Buttons (native flow)
```ts
// Text + interactive buttons
await conn.sendMessage(jid, {
  text: 'Choose:',
  footer: 'Bot Footer',
  interactiveButtons: [
    {
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({ display_text: '✅ Accept', id: 'accept' })
    },
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: '🌐 Visit',
        url: 'https://example.com'
      })
    },
    {
      name: 'cta_copy',
      buttonParamsJson: JSON.stringify({ display_text: '📋 Copy Code', copy_code: 'ABC123' })
    },
    {
      name: 'cta_call',
      buttonParamsJson: JSON.stringify({ display_text: '📞 Call', phone_number: '+911234567890' })
    }
  ]
})

// Image + interactive buttons
await conn.sendMessage(jid, {
  image: { url: 'https://example.com/img.jpg' },
  caption: 'Choose an action',
  footer: 'Footer',
  interactiveButtons: [
    {
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({ display_text: '❤️ Like', id: 'like' })
    }
  ],
  hasMediaAttachment: true
})
```

### Template Buttons
```ts
await conn.sendMessage(jid, {
  text: 'Template message',
  footer: 'Footer',
  templateButtons: [
    { index: 1, urlButton: { displayText: '🌐 Website', url: 'https://example.com' } },
    { index: 2, callButton: { displayText: '📞 Call', phoneNumber: '+911234567890' } },
    { index: 3, quickReplyButton: { displayText: '💬 Reply', id: 'reply_id' } }
  ]
})
```

### List / Sections Message
```ts
// Text-only list
await conn.sendMessage(jid, {
  text: 'Select from menu',
  footer: 'Bot Menu',
  title: 'Main Menu',
  buttonText: 'Open Menu',
  sections: [
    {
      title: '🎮 Entertainment',
      rows: [
        { rowId: 'games', title: 'Games', description: 'Play mini games' },
        { rowId: 'music', title: 'Music', description: 'Listen to music' }
      ]
    },
    {
      title: '🛠️ Tools',
      rows: [
        { rowId: 'translate', title: 'Translate', description: 'Language translate' },
        { rowId: 'convert', title: 'Convert', description: 'File conversion' }
      ]
    }
  ]
})

// Image + list (via interactiveButtons single_select)
await conn.sendMessage(jid, {
  image: { url: 'https://example.com/menu.jpg' },
  caption: 'Browse our menu',
  footer: 'Restaurant Bot',
  interactiveButtons: [
    {
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: 'View Menu',
        sections: [
          {
            title: 'Food',
            rows: [
              { title: 'Fried Rice', description: '$2.50', id: 'nasi-goreng' },
              { title: 'Fried Noodles', description: '$2.00', id: 'mie-goreng' }
            ]
          },
          {
            title: 'Drinks',
            rows: [
              { title: 'Ice Tea', description: '$0.50', id: 'es-teh' },
              { title: 'Coffee', description: '$1.00', id: 'kopi' }
            ]
          }
        ]
      })
    }
  ]
})
```

### Cards / Carousel Message
```ts
await conn.sendMessage(jid, {
  text: 'Check these out!',
  footer: 'Swipe right →',
  cards: [
    {
      image: { url: 'https://example.com/card1.jpg' },
      title: 'Card 1',
      body: 'Description for card 1',
      footer: 'Card Footer',
      buttons: [
        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Select', id: 'card1' }) },
        { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Learn More', url: 'https://example.com' }) }
      ]
    },
    {
      video: { url: 'https://example.com/card2.mp4' },
      title: 'Card 2',
      body: 'Video card',
      footer: 'Card Footer',
      buttons: [
        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Watch', id: 'card2' }) }
      ]
    },
    {
      document: { url: 'https://example.com/doc.pdf' },
      mimetype: 'application/pdf',
      fileName: 'doc.pdf',
      title: 'Document Card',
      body: 'Download this doc',
      buttons: [
        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Download', id: 'doc1' }) }
      ]
    }
  ]
})
```

### Shop Message
```ts
await conn.sendMessage(jid, {
  text: 'Welcome to our shop!',
  title: 'Our Store',
  footer: 'Shop Now',
  shop: { surface: 1, id: 'https://example.com/shop' }
})

// With image
await conn.sendMessage(jid, {
  image: { url: 'https://example.com/shop.jpg' },
  caption: 'Browse products',
  shop: { surface: 1, id: 'https://example.com/shop' }
})
```

### Collection Message
```ts
await conn.sendMessage(jid, {
  text: 'Product Collection',
  footer: 'Browse All',
  collection: {
    bizJid: '628xxx@s.whatsapp.net',
    id: 'collection_id',
    version: 1
  }
})
```

### Buttons Interactive Message PAY
```ts
await conn.sendMessage(jid, {
  text: 'Complete your payment',
  interactiveButtons: [
    {
      name: 'review_and_pay',
      buttonParamsJson: JSON.stringify({
        currency: 'IDR',
        total_amount: { value: '100000', offset: '100' },
        reference_id: 'REF123',
        type: 'physical-goods',
        payment_type: 'confirm',
        payment_status: 'captured',
        payment_timestamp: Math.floor(Date.now() / 1000),
        order: {
          status: 'completed',
          order_type: 'PAYMENT_REQUEST',
          subtotal: { value: '100000', offset: '100' },
          items: [{
            retailer_id: 'item_001',
            name: 'Product Name',
            amount: { value: '100000', offset: '100' },
            quantity: '1'
          }]
        }
      })
    }
  ]
})
```

### Buttons Interactive Message PIX
```ts
await conn.sendMessage(jid, {
  text: '',
  interactiveButtons: [
    {
      name: 'payment_info',
      buttonParamsJson: JSON.stringify({
        payment_settings: [{
          type: 'pix_static_code',
          pix_static_code: {
            merchant_name: 'My Store',
            key: 'example@email.com',
            key_type: 'EMAIL'  // PHONE | EMAIL | CPF | EVP
          }
        }]
      })
    }
  ]
})
```

### Buttons Reply Message
```ts
// Reply to a classic button
await conn.sendMessage(jid, {
  buttonReply: { displayText: 'Button 1', id: 'btn1', index: 0 },
  type: 'plain'
})

// Reply to template button
await conn.sendMessage(jid, {
  buttonReply: { displayText: 'Yes', id: 'yes', index: 1 },
  type: 'template'
})

// Reply to list selection
await conn.sendMessage(jid, {
  buttonReply: { title: 'Fried Rice', description: '$2.50', rowId: 'nasi-goreng' },
  type: 'list'
})

// Reply to interactive (native flow)
await conn.sendMessage(jid, {
  buttonReply: {
    displayText: 'Option 1',
    nativeFlows: { name: 'menu_options', paramsJson: JSON.stringify({ id: 'opt1' }), version: 1 }
  },
  type: 'interactive'
})
```

---

## Interactive Helpers

```ts
import {
  generateInteractiveButtonMessage,
  generateInteractiveListMessage,
  generateCombinedButtons,
  generateCopyCodeButton,
  generateUrlButtonMessage,
  generateQuickReplyButtons
} from 'baileys'

// Quick reply buttons
const qr = generateQuickReplyButtons(
  'Choose an option:',
  [
    { id: 'btn1', displayText: '✅ Accept' },
    { id: 'btn2', displayText: '❌ Reject' }
  ],
  { footer: 'Powered by Bot' }
)
await conn.sendMessage(jid, qr.interactiveMessage)

// URL buttons
const url = generateUrlButtonMessage(
  'Visit our website',
  [{ displayText: '🌐 Open', url: 'https://example.com' }],
  { title: 'Our Site', footer: 'Click to open' }
)
await conn.sendMessage(jid, url.interactiveMessage)

// Copy code button
const copy = generateCopyCodeButton('Your OTP:', '483920', '📋 Copy OTP')
await conn.sendMessage(jid, copy.interactiveMessage)

// Combined buttons (url + reply + copy + call)
const combined = generateCombinedButtons('What would you like?', [
  { type: 'url', displayText: '🌐 Website', url: 'https://example.com' },
  { type: 'reply', displayText: '💬 Chat', id: 'start_chat' },
  { type: 'copy', displayText: '📋 Promo', copyCode: 'PROMO2025' },
  { type: 'call', displayText: '📞 Call', phoneNumber: '+911234567890' }
], { footer: 'Choose any option' })
await conn.sendMessage(jid, combined.interactiveMessage)

// List message
const list = generateInteractiveListMessage({
  title: '📋 Menu',
  buttonText: 'Open Menu',
  description: 'Select an item',
  footer: 'Bot',
  sections: [
    { title: 'Food', rows: [{ rowId: 'rice', title: 'Rice', description: '$2' }] }
  ]
})
await conn.sendMessage(jid, list.listMessage)
```

---

## Status / Story

### Text Status
```ts
await conn.sendMessage('status@broadcast', {
  text: 'Hello Everyone! 👋',
  backgroundColor: '#25D366',
  font: 2
}, {
  statusJidList: ['628xxx@s.whatsapp.net', '629xxx@s.whatsapp.net']
})
```

### Media Status
```ts
// Image status
await conn.sendMessage('status@broadcast', {
  image: { url: 'https://example.com/img.jpg' },
  caption: 'Good morning! ☀️'
}, {
  statusJidList: ['628xxx@s.whatsapp.net']
})

// Video status
await conn.sendMessage('status@broadcast', {
  video: { url: 'https://example.com/video.mp4' },
  caption: 'Watch this!'
}, {
  statusJidList: ['628xxx@s.whatsapp.net']
})
```

### Status Mentions
```ts
// Mention specific users/groups in status
await conn.sendStatusMentions(
  { text: 'Hello @everyone! 👋', backgroundColor: '#25D366' },
  ['628xxx@s.whatsapp.net', '629yyy@s.whatsapp.net']
)

// With image
await conn.sendStatusMentions(
  { image: { url: 'https://example.com/img.jpg' }, caption: 'Tag friends!' },
  ['628xxx@s.whatsapp.net']
)
```

### Broadcast Lists
```ts
// Send to broadcast list
await conn.sendMessage('1234567890@broadcast', { text: 'Hello broadcast!' })

// Get broadcast list info
const bList = await conn.getBroadcastListInfo('1234@broadcast')
console.log(`Name: ${bList.name}, Recipients: ${bList.recipients}`)
```

---

## Calls

### Initiate Voice Call
```ts
// Voice call
const { callId } = await conn.initiateCall(jid)

// Video call
const { callId } = await conn.initiateCall(jid, { isVideo: true })

// Cancel outgoing call
await conn.cancelCall(callId, jid)

// Accept incoming call
await conn.acceptCall(callId, callFrom, false) // false = audio, true = video
```

### Reject Call
```ts
// Get callId and callFrom from 'call' event
conn.ev.on('call', async (calls) => {
  for (const call of calls) {
    if (call.status === 'offer') {
      await conn.rejectCall(call.id, call.from)
    }
  }
})
```

---

## AI Icon Feature

```ts
// Show AI icon on message
await conn.sendMessage(jid, { text: 'AI-powered response!' }, { ai: true })

// With image
await conn.sendMessage(jid, {
  image: { url: 'https://example.com/img.jpg' },
  caption: 'AI generated image'
}, { ai: true })
```

---

## innovatorssoft Utils

Import from `baileys/src/Utils/innovatorssoft`:

```ts
import {
  // Anti-Delete
  MessageStore, createAntiDeleteHandler, createMessageStoreHandler,
  // Scheduler
  MessageScheduler, createMessageScheduler,
  // Auto-Reply
  AutoReplyHandler, createAutoReply,
  // Templates
  TemplateManager, createTemplateManager, renderTemplate, PRESET_TEMPLATES,
  // Search
  MessageSearchManager, searchMessages, searchMessagesRegex,
  // vCard
  generateVCard, createContactCard, createContactCards, quickContact,
  // Status
  StatusHelper, createTextStatus, createImageStatus, STATUS_BACKGROUNDS, STATUS_FONTS,
  // Chat Control
  TypingIndicator, createTypingIndicator, PinnedMessagesManager, createReadReceiptController,
  DISAPPEARING_DURATIONS,
  // JID
  parseJid, getSenderPn, plotJid, normalizePhoneToJid, createJidPlotter
} from 'baileys/src/Utils/innovatorssoft'
```

### Anti-Delete System
```ts
const store = new MessageStore({ maxMessagesPerChat: 1000, ttl: 86400000 })

// Store incoming messages
conn.ev.on('messages.upsert', createMessageStoreHandler(store))

// Detect deleted messages
conn.ev.on('messages.update', (updates) => {
  const deleted = createAntiDeleteHandler(store)(updates)
  for (const info of deleted) {
    console.log('Deleted message:', info.originalMessage)
    // Re-send to chat
    conn.sendMessage(info.key.remoteJid!, {
      text: `🔴 *Anti-Delete*\n${info.originalMessage.message?.conversation || '[media]'}`
    })
  }
})

// Get stats
console.log(store.getStats())
```

### Message Scheduler
```ts
const scheduler = createMessageScheduler(
  (jid, content) => conn.sendMessage(jid, content),
  {
    onSent: (s) => console.log(`✅ Sent to ${s.jid}`),
    onFailed: (s, err) => console.error(`❌ Failed: ${err.message}`)
  }
)

// Schedule at specific time
const entry = scheduler.schedule(
  jid,
  { text: '🎂 Happy Birthday!' },
  new Date('2025-12-25T09:00:00')
)

// Schedule with delay (30 minutes)
scheduler.scheduleDelay(jid, { text: 'Reminder! ⏰' }, 30 * 60 * 1000)

// Manage scheduled messages
const pending = scheduler.getPending()
scheduler.cancel(entry.id)          // Cancel one
scheduler.cancelForJid(jid)         // Cancel all for jid
scheduler.clearAll()                // Cancel all
scheduler.stop()                    // Stop timer
scheduler.start()                   // Restart timer
```

### Auto-Reply System
```ts
const autoReply = createAutoReply(
  (jid, content, opts) => conn.sendMessage(jid, content, opts),
  (jid, presence) => conn.sendPresenceUpdate(presence, jid),
  {
    simulateTyping: true,
    typingDuration: 1500,
    globalCooldown: 2000,
    onReply: (rule, msg) => console.log(`Rule matched: ${rule.id}`)
  }
)

// Add rules
autoReply.addRule({
  keywords: ['hi', 'hello', 'hey'],
  response: { text: 'Hello! How can I help you? 👋' },
  quoted: true
})

autoReply.addRule({
  exactMatch: '!menu',
  response: { text: '📋 Menu:\n1. Help\n2. Info\n3. Contact' },
  priority: 10
})

autoReply.addRule({
  pattern: /\d{4}-\d{4}/,
  response: async (msg) => ({ text: `Order found for: ${msg.key.remoteJid}` }),
  groupsOnly: true
})

// Enable/disable
autoReply.setRuleActive('rule_id', false)

// Process messages
conn.ev.on('messages.upsert', async ({ messages }) => {
  for (const msg of messages) {
    if (!msg.key.fromMe) await autoReply.processMessage(msg)
  }
})
```

### Message Templates
```ts
const manager = createTemplateManager()  // includes presets

// Create custom template
manager.create({
  name: 'Order',
  category: 'order',
  content: '✅ Order #{{orderId}} confirmed!\nCustomer: {{name}}\nTotal: {{total}}'
})

// Render
const text = manager.render('order', {
  orderId: '12345',
  name: 'John',
  total: '$50'
})
await conn.sendMessage(jid, { text })

// Validate before render
const { valid, missing } = manager.validate('order', { orderId: '123' })
if (!valid) console.log('Missing:', missing)

// Quick render without manager
const text2 = renderTemplate('Hello {{name}}! Welcome to {{company:our store}}', {
  name: 'Alice'
})
// → "Hello Alice! Welcome to our store"

// Preset templates
console.log(PRESET_TEMPLATES.ORDER_CONFIRMATION)
console.log(PRESET_TEMPLATES.WELCOME)
console.log(PRESET_TEMPLATES.BIRTHDAY)
```

### Message Search
```ts
const search = new MessageSearchManager()

// Add messages
conn.ev.on('messages.upsert', ({ messages }) => {
  search.addMessages(messages)
})

// Search
const results = search.search('hello', { limit: 10, fromMe: false })
for (const r of results) {
  console.log(r.matchedText, r.relevanceScore)
}

// Regex search
const regexResults = search.searchRegex(/\d{6}/, { limit: 5 })

// Filter by type
const images = search.getByType('image')
const groupMsgs = search.getByJid('group@g.us')
```

### vCard Helpers
```ts
import { generateVCard, createContactCard, createContactCards, quickContact } from 'baileys/src/Utils/innovatorssoft'

// Generate vCard string
const vcard = generateVCard({
  fullName: 'John Doe',
  phones: [{ number: '+1234567890', type: 'CELL' }],
  emails: [{ email: 'john@example.com', type: 'WORK' }],
  organization: 'Example Corp'
})

// Send single contact
await conn.sendMessage(jid, createContactCard({
  fullName: 'John Doe',
  phones: [{ number: '+1234567890' }]
}))

// Send multiple contacts
await conn.sendMessage(jid, createContactCards([
  { fullName: 'Alice', phones: [{ number: '+111' }] },
  { fullName: 'Bob', phones: [{ number: '+222' }] }
]))

// Quick helper
const contact = quickContact('John Doe', '+1234567890', { email: 'john@example.com' })
await conn.sendMessage(jid, createContactCard(contact))
```

### Status Helpers
```ts
import { StatusHelper, STATUS_BACKGROUNDS, STATUS_FONTS } from 'baileys/src/Utils/innovatorssoft'

// Text status
const textContent = StatusHelper.text(
  'Good Morning! ☀️',
  STATUS_BACKGROUNDS.solid.blue,
  STATUS_FONTS.DANCING
)
await StatusHelper.send(conn, textContent, ['628xxx@s.whatsapp.net'])

// Image status
const imgContent = StatusHelper.imageUrl('https://example.com/img.jpg', 'Caption')
await StatusHelper.send(conn, imgContent, ['628xxx@s.whatsapp.net'])

// Video status
const vidContent = StatusHelper.videoUrl('https://example.com/video.mp4')
await StatusHelper.send(conn, vidContent, ['628xxx@s.whatsapp.net'])

// Voice note status
const audioContent = StatusHelper.voiceNote(audioBuffer)
await StatusHelper.send(conn, audioContent, ['628xxx@s.whatsapp.net'])

// Send to groups too
await StatusHelper.send(conn, textContent, [
  '628xxx@s.whatsapp.net',
  '120363xxx@g.us'  // group
])
```

### Chat Control
```ts
import {
  createTypingIndicator,
  createPinnedMessagesManager,
  createReadReceiptController,
  DISAPPEARING_DURATIONS
} from 'baileys/src/Utils/innovatorssoft'

// Typing indicator
const typing = createTypingIndicator(
  (jid, presence) => conn.sendPresenceUpdate(presence, jid)
)

// Show typing for 2s then send
await typing.simulateTyping(jid, 2000, () =>
  conn.sendMessage(jid, { text: 'Here is your answer!' })
)

// Manual control
await typing.startTyping(jid, { duration: 3000 })
await typing.stopTyping(jid)

// Recording indicator
await typing.startRecording(jid, { duration: 2000 })

// Pinned messages tracker
const pins = createPinnedMessagesManager()
pins.pin(jid, messageId, 'senderJid')
const pinned = pins.getPinned(jid)
pins.unpin(jid, messageId)

// Read receipts controller
const readCtrl = createReadReceiptController(
  (jid, participant, ids) => conn.readMessages([{ id: ids[0], remoteJid: jid, participant }])
)
readCtrl.disable()  // Disable read receipts
readCtrl.enable()   // Enable
await readCtrl.markRead(jid, participant, [messageId])

// Disappearing durations
console.log(DISAPPEARING_DURATIONS.HOURS_24)  // 86400
console.log(DISAPPEARING_DURATIONS.DAYS_7)    // 604800
```

### JID Plotting & LID Support
```ts
import {
  parseJid, getSenderPn, isSelf, plotJid,
  normalizePhoneToJid, formatJidDisplay,
  isSameUser, getJidVariants, createJidPlotter
} from 'baileys/src/Utils/innovatorssoft'

// Parse JID info
const info = parseJid('628xxx@s.whatsapp.net')
console.log(info?.isPn, info?.isGroup, info?.user)

// Get current session info
const me = getSenderPn(conn.authState.creds)
console.log(me?.phoneNumber, me?.lid)

// Check if same user
console.log(isSameUser('628xxx@s.whatsapp.net', '628xxx@lid'))  // true

// Normalize phone to JID
const jid = normalizePhoneToJid('628123456789')  // → 628123456789@s.whatsapp.net

// Format for display
const display = formatJidDisplay('628xxx:2@s.whatsapp.net', { showDevice: true, showType: true })

// Get all variants of a number
const variants = getJidVariants('628123456789')

// LID/PN bidirectional plotter (needs LID mapping store)
const plotter = createJidPlotter(
  (pn) => signalRepository.lidMapping.getLIDForPN(pn),
  (lid) => signalRepository.lidMapping.getPNForLID(lid)
)
const result = await plotter.plotBidirectional('628xxx@s.whatsapp.net')
console.log(result.pn, result.lid)
```

---

## Data Store (Implementing)

```ts
import makeWASocket, { makeInMemoryStore } from 'baileys'

const store = makeInMemoryStore({})

const conn = makeWASocket({
  auth: state,
  cachedGroupMetadata: async (jid) => store.groupMetadata[jid]
})

store.bind(conn.ev)

// Messages are now cached in store.messages[jid]
// Chats in store.chats
// Contacts in store.contacts
// Group metadata in store.groupMetadata
```

---

## Change Add Mode
```ts
// Allow all members to add others
await conn.groupMemberAddMode(jid, 'all_member_add')

// Admin only can add
await conn.groupMemberAddMode(jid, 'admin_add')
```
