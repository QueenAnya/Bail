# Channel administration

`newsletter.md` in the wiki lists all 55 methods. The ones used most:

```ts
const channel = await sock.newsletterCreate('Anya releases', 'Notes and versions')
await sock.newsletterMetadata('JID', channelJid)
await sock.newsletterFollow(channelJid)
await sock.newsletterMute(channelJid)          // or newsletterUnmute
await sock.newsletterUpdateName(channelJid, 'Anya releases — v2')
await sock.newsletterUpdateDescription(channelJid, 'Changelog')
await sock.newsletterReactMessage(channelJid, serverId, '👍')
await sock.newsletterAdminCount(channelJid)
await sock.newsletterChangeOwner(channelJid, newOwnerJid)
```

Channels use a **server id** for messages, not a message key. `toNewsletterServerId` converts one to the other, and
`NEWSLETTER_SERVER_ID_MIN` / `MAX` bound the range the API accepts.
