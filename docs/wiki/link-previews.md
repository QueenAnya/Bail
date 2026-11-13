# Rich link cards and status previews

A link preview is a thumbnail plus a title, description and canonical URL, attached to the text. `sendMessage` builds
one for you when you pass `linkPreview`; the extras in `src/Extras/link-preview-metadata.ts` let you build and read the
payload yourself.

```ts
import { buildSocialPreview, readSocialPreview } from '@teamolduser/baileys'

const preview = buildSocialPreview({
	url: 'https://github.com/Teamolduser/Baileys',
	title: 'Anya Baileys',
	description: 'WhatsApp Multi-Device for Node.js',
	// jpegThumbnail or thumbnailUrl
})

await sock.sendMessage(jid, { text: 'https://github.com/Teamolduser/Baileys', ...preview })
```

Reading one back out of a received message:

```ts
const preview = readSocialPreview(msg.message)
// { url, title, description, mediaType, ... } or undefined
```

For statuses the preview style is a separate field — a status link preview can be styled independently of a chat
message, and mixing the two shapes is the usual reason a status shows the link but no card.
