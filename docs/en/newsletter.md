# Newsletters (WhatsApp channels)

A WhatsApp channel JID ends in `@newsletter`. Channel APIs are separate from group APIs, and some methods require a newsletter **server message ID** rather than a normal chat message key ID.

## Create and update a channel

```js
const channel = await sock.newsletterCreate(
  'Anya Updates',
  'Product announcements and updates'
)
console.log(channel.id)

await sock.newsletterUpdateName(channel.id, 'Anya News')
await sock.newsletterUpdateDescription(channel.id, 'Official updates')
```

Use a channel JID returned by the library. Other base methods include follow/unfollow, mute/unmute, and fetching channel metadata/messages; see the generated API reference for exact signatures in this version.

## Ported newsletter extras

The `src/ported/newsletter-extras.ts` module adds methods for areas such as admin invites and capabilities, followers, insights, channel directory/search/categories, recommendations/similar channels, enforcement/reporting and appeals, poll voters, reaction senders, pin/unpin, labels, and question-response state. Newsletter status methods are in `src/ported/newsletter-status.ts`.

These are WhatsApp private-protocol operations and can change server-side. Confirm the method's signature in the source/API reference and handle server errors instead of assuming every operation is available to every channel/account.

## Server IDs versus message keys

Do not pass `message.key.id` to a method that explicitly expects a newsletter server ID. Obtain the appropriate server ID from the newsletter message metadata or the return value of the corresponding newsletter API. Anya validates newsletter server IDs in its helper layer and rejects values outside the accepted range.
