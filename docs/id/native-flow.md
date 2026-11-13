> Halaman ini belum diterjemahkan — isinya masih dalam bahasa Inggris.

## Direct Native Flow examples (without helper builders)

These examples construct and send the payload directly. They do **not** call Anya's `generateCombinedButtons()` or Elaina's `new Button(sock)` builder. `jid` must be the destination JID and `sock` must be an authenticated, connected socket.

### Anya: direct native-flow payload

Anya's `src/Addons/interactive-message.ts` defines the native-flow payload fields used below. The helper examples send the returned `interactiveMessage` object as the message content; this example constructs that same content shape inline:

```ts
await sock.sendMessage(jid, {
  body: { text: 'Choose an option' },
  footer: { text: 'Anya Bot' },
  nativeFlowMessage: {
    buttons: [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: 'Ping',
          id: '.ping',
        }),
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'Open Website',
          url: 'https://example.com',
          merchant_url: 'https://example.com',
        }),
      },
      {
        name: 'cta_copy',
        buttonParamsJson: JSON.stringify({
          display_text: 'Copy Code',
          copy_code: 'ABC123',
        }),
      },
    ],
    messageParamsJson: '',
  },
})
```

This is the raw content shape used by the Anya helper. If your application is calling a different Baileys API/version, check that version's `sendMessage()` accepted content types before using this exact call.

### Elaina: direct native-flow payload and relay

Elaina's `Button` builder creates a full WhatsApp message with `generateWAMessageFromContent()` and relays it with the `biz` / `native_flow` additional nodes. To do that directly, use the same lower-level steps without `new Button(sock)`:

```js
import { generateWAMessageFromContent } from '../../lib/index.js'

const message = await generateWAMessageFromContent(
  jid,
  {
    interactiveMessage: {
      body: { text: 'Choose an option' },
      footer: { text: 'Elaina native-flow demo' },
      nativeFlowMessage: {
        messageParamsJson: '{}',
        buttons: [
          {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
              display_text: 'Ping',
              id: '.ping',
            }),
          },
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: 'Open Website',
              url: 'https://example.com',
              merchant_url: 'https://example.com',
            }),
          },
        ],
      },
    },
  },
  {},
)

await sock.relayMessage(message.key.remoteJid, message.message, {
  messageId: message.key.id,
  additionalNodes: [
    {
      tag: 'biz',
      attrs: {},
      content: [
        {
          tag: 'interactive',
          attrs: { type: 'native_flow', v: '1' },
          content: [
            { tag: 'native_flow', attrs: { v: '9', name: 'mixed' } },
          ],
        },
      ],
    },
  ],
})
```

**Path note:** the import above matches the relative path from `assets/buttonsbuilder/MessageBuilder.js`. If this code lives in another directory, adjust the relative import to the project's exported `generateWAMessageFromContent` entry. Elaina's builder also adds context and payload options; include those explicitly if your use case needs them.

### Which one should I use?

- Use Anya's inline payload when you want to construct the native-flow content directly with `sock.sendMessage()`.
- Use Elaina's lower-level `generateWAMessageFromContent()` + `sock.relayMessage()` path when you need to reproduce the builder's native-flow relay metadata without instantiating `Button`.
- These are direct-payload examples, not proof that WhatsApp renders every button type identically on every client. Test with the target WhatsApp clients.
