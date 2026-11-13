# Groups

Group JIDs commonly end in `@g.us`. Participant identifiers may be phone-number JIDs or LIDs depending on the account and WhatsApp's current addressing behavior. Prefer identifiers received from socket events or metadata rather than constructing them from phone numbers without validation.

## Create a group

```js
const group = await sock.groupCreate('Anya Community', [
  '14155550123@s.whatsapp.net',
  '14155550124@s.whatsapp.net'
])

console.log('Group JID:', group.id)
```

Replace the sample identifiers with valid participants. WhatsApp may reject group creation based on account permissions, privacy settings, or server policy.

## Update participants

```js
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'add')
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'remove')
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'promote')
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'demote')
```

The action is the third argument and the participant list is an array. Check the returned per-participant results; an `add` request can result in an invite rather than an immediate addition when privacy rules prevent direct adds.

## Group metadata and admin operations

Use the socket's group metadata and participant-update methods for the base group workflow. This fork also contains ported message/group helpers such as group metadata caching and sender-key reset/query helpers. Those are lower-level/protocol-sensitive features; inspect their TypeScript signatures and test against a non-production group before relying on them.
