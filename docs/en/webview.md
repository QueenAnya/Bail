## In-app HTML webview (`webView`)

Hand it the jid and the HTML, it sends the page. Nothing else — no markup helpers, no validation layer, no height
injection. The HTML goes out exactly as you wrote it.

It is on the socket, under three names:

```ts
const { messageId } = await sock.webView(jid, {
    html: page,                 // your full HTML document, sent byte-for-byte
    title: 'Order status',      // optional: disclaimer text + notification preview
    label: 'tap to open',       // optional: preview line on the card
    forwarded: false            // optional: no "Forwarded" badge
})

await sock.web(jid, { html: page })             // same method
await sock.sendHtmlWebview(jid, { html: page }) // the name it shipped under first
```

The standalone function still exists for code that already holds the socket:

```ts
import { webView } from '@teamolduser/baileys'

const { messageId } = await webView(sock, jid, { html: page })
```

| Option | Meaning |
| --- | --- |
| `html` | the page — required, passed through untouched |
| `title` | `messageDisclaimerText` + notification preview |
| `label` | the submessage preview on the card |
| `forwarded` | `true` (default) = Meta-AI forward styling, `false` = clean origin |
| `quoted` | quote an existing message |
| `messageId` | reuse a specific id instead of generating one |

`web` and `sendHtmlWebview` are aliases of the same function — `web(sock, jid, { html })` works exactly the same, and
code written against the earlier name keeps working.

Two stanzas go out and both are needed: the `botForwardedMessage` rich response, then a `protocolMessage` **type-14
edit** of that same message id. The second is what makes the client render the page — send only the first and the card
never opens.

Validation is not done here. If you want a page checked before sending, run your own check first — this function sends
what you give it.
