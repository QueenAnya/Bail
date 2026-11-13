## New message content keys

`sock.sendMessage` understands these extra content keys (they are converted into raw proto content, see `src/Extras/modern-messages.ts`):

| Key | Example |
| --- | --- |
| `question` | `{ question: { text: 'Favourite colour?' } }` |
| `questionReply` / `questionResponse` | `{ questionResponse: { key, text: 'blue' } }` |
| `statusQuestionAnswer` / `statusQuoted` / `statusStickerInteraction` / `statusNotification` | status related replies (`key`, `stickerKey`, ...) |
| `comment` | `{ comment: { targetMessageKey: key, content: { text: 'nice' } } }` |
| `statusMention` | `{ statusMention: { key } }` (`group: true` for group statuses) |
| `groupStatusReaction` | `{ groupStatusReaction: { key, text: '🔥' } }` |
| `newsletterAdminInvite` / `newsletterFollowerInvite` | `{ newsletterAdminInvite: { newsletterJid, newsletterName, caption } }` |
| `scheduledCall` / `scheduledCallEdit` | `{ scheduledCall: { scheduledTimestampMs, callType, title } }` |
| `music` | `{ music: { songId, title, author, songUri, artworkUri } }` (uris must be WhatsApp / Meta hosted) |
| `splitPayment` / `splitPaymentUpdate` | `{ splitPayment: { splitId, total: 900, participants: [{ jid, amount: 300 }] } }` |
| `paymentReminder` | `{ paymentReminder: { reminderId, amount: 499, payeeVpa: 'shop@upi' } }` |
| `addYours` | `{ text: 'My turn!', addYours: statusKey }` (also `messageAssociation`) |
| `statusAudience` | `{ text: 'hi', statusAudience: 'Close friends' }` |
| `richLink` | `{ richLink: { url, title, description, image, text } }` - link card with your own title / description / picture |
| `song` | `{ song: { audio, artwork, title, author, url } }` - audio with a music-style card |
| `socialPreview` | `{ text: url, socialPreview: { ... } }` - social post metadata on a link preview (see `SocialMediaPostType`) |
| `statusLinkPreview` | `{ text: url, statusLinkPreview: 1 }` - status link-preview style (non-negative integer) |
| `groupMentions` | `{ text: 'hi', groupMentions: [{ groupJid, groupSubject }] }` |
| `forwardedNewsletter` | `{ text, forwardedNewsletter: { newsletterJid, serverMessageId, newsletterName } }` - "Forwarded from channel" header |
| `newsletterStatus` / `groupStatusAttribution` / `statusAttributions` | decorate a status with a channel / group reshare attribution |

- Money is the **human amount** and the default currency is **INR** for message content (payment, request payment, order, product, catalog create; pass `currency: 'USD'` for another). The standalone `money(amount, currencyCode)` helper keeps upstream behaviour and requires an explicit code, e.g. `money(500, 'INR')`.
- `pollAddOption` and `eventInvite` use `PollAddOptionMessage` / `EventInviteMessage` from this WAProto (found under `proto.Message` or as
  flat `proto.*` classes). The channel-status attribution type 9 is sent as a number.
- `addYours` / `statusAudience` cannot be combined with a key that builds its own message (`question`, `comment`, ...) - an error says so.
- Builders and readers are exported as well: `buildSplitPayment`, `readSplitPayment`, `buildPaymentReminder`, `readPaymentReminder`, `money`,
  `buildMusicMessage`, `readMusicMessage`, `locationSticker`, `channelSticker`, `linkSticker`, `musicSticker`, `messageSticker`,
  `normalizeStickers`, `readStickers`, `encodeScheduledMessage`, `decodeScheduledMessage`, `buildScheduledMsgMetaNode`,
  `buildUnscheduleProtocolMessage`, `isScheduledTimeValid`, `prepareModernMessageContent`.

### Example commands

`assets/examples/example.js`: `!question`, `!comment`, `!addyours`, `!splitpay`, `!remind`, `!hd`, `!motion`, `!health <number>`, `!about <number>`,
`!serverprops`, `!serverlink <url>`, `!nlinfo <channel jid>`, `!nldirectory <text>`, `!nlstatus <channel jid> <text>`, `!resetkey` (group).
