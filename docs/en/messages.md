# Messages

## Receive new messages

Incoming messages are delivered through `messages.upsert`. Check `type` if the bot should respond only to newly received messages and not historical messages from a sync.

```js
sock.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return

  for (const message of messages) {
    if (!message.message) continue
    console.log('Chat:', message.key.remoteJid)
    console.log('Message ID:', message.key.id)
  }
})
```

## Extract simple text

Different message types store text in different fields. This helper covers common text and caption types; it is not a complete parser for every WhatsApp message type.

```js
function getText(message) {
  const content = message?.message
  if (!content) return ''
  return content.conversation
    ?? content.extendedTextMessage?.text
    ?? content.imageMessage?.caption
    ?? content.videoMessage?.caption
    ?? content.documentMessage?.caption
    ?? ''
}
```

## Send a text message

```js
await sock.sendMessage('14155550123@s.whatsapp.net', {
  text: 'Hello from Anya Baileys'
})
```

For groups, use the group's JID (usually ending in `@g.us`). User identifiers can also use newer LID addressing, so do not assume every participant ID is a phone-number JID. Prefer JIDs supplied by the library and message metadata.

## Mark messages as read

Use the message keys received from the event. Confirm the exact method signature against the generated API reference for the installed version before relying on advanced receipt behavior.

## Interactive messages

For button, carousel, and AI-rich payload construction, see [MessageBuilder](./builder.md). Interactive message behavior is client- and protocol-version-dependent; test against the WhatsApp clients you intend to support.
