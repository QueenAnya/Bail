# External ad reply

`externalAdReply` renders the card above a message — thumbnail, title, body, and a link. It is a *content* field, so it
goes next to the text you are sending:

```ts
await sock.sendMessage(jid, {
	text: 'Have a look',
	externalAdReply: {
		title: 'Anya Baileys',
		body: 'WhatsApp Multi-Device for Node.js',
		mediaType: 1,
		mediaUrl: 'https://example.com/thumb.jpg',
		thumbnailUrl: 'https://example.com/thumb.jpg',
		sourceUrl: 'https://github.com/Teamolduser/Baileys',
		showAdAttribution: false
	}
})
```

### Why the card sometimes does not appear

| Symptom | Cause |
|---|---|
| Card missing entirely | `mediaType` set but no usable thumbnail — the client drops the whole card |
| Only the text arrives | `externalAdReply` placed inside `contextInfo` instead of next to `text` |
| Thumbnail blank but title shows | the image URL is not reachable from the phone, or is not JPEG/PNG |
| "via ad" label appears | `showAdAttribution: true` — see below |

The most reliable shape is a real, reachable image URL plus `mediaType: 1`. If you have the image as a buffer, upload it
and use the returned URL rather than a local path.

### Click-to-WhatsApp and the "via ad" label

`showAdAttribution` marks the message as coming from an advertisement. Two things that look alike but are not:

- the **card** — built by `externalAdReply`, available to any bot
- the **"via ad" label** — added by WhatsApp when a message is sent through the click-to-WhatsApp flow

A bot can render the card; it cannot legitimately produce the ad label. Setting `showAdAttribution: true` on a normal
message does not make it a real ad, and WhatsApp treats it as a mismatch. Leave it `false`.
