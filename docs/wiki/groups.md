# Group administration

Every group call takes the group jid (`…@g.us`). The full set, as it exists on the socket:

### Reading a group

```ts
const meta = await sock.groupMetadata(jid)
// { id, subject, desc, owner, participants: [{ id, admin, lid }], addressingMode, ... }

// every group this account is in, in one call
const all = await sock.groupFetchAllParticipating()
```

`groupMetadata` is cached by the socket for a short while — if you need fresh participants right after a change, wait
for the `groups.update` event instead of polling.

### Creating, leaving, renaming

```ts
const group = await sock.groupCreate('Support', ['919876543210@s.whatsapp.net'])
await sock.groupUpdateSubject(group.id, 'Support — tier 1')
await sock.groupUpdateDescription(group.id, 'First line support')
await sock.groupLeave(group.id)
```

### Participants

```ts
await sock.groupParticipantsUpdate(jid, ['919876543210@s.whatsapp.net'], 'add')      // or 'remove' | 'promote' | 'demote'
```

The server answers per participant: `200` added, `403` invite sent instead (privacy setting), `408` left recently,
`409` already in the group, `500` group full. Always read the result array — a `200` for one participant does not mean
the rest worked.

### Invites

```ts
const code = await sock.groupInviteCode(jid)        // e.g. 'AbCdEf123'
const info = await sock.groupGetInviteInfo(code)    // subject, size, participants
await sock.groupRevokeInvite(jid)                   // old link stops working
await sock.groupAcceptInvite(code)                  // join
```

`groupInviteCode` fails with `403` when you are not an admin and the group restricts links.

### Join requests

Groups with approval on queue joiners:

```ts
const pending = await sock.groupRequestParticipantsList(jid)
await sock.groupRequestParticipantsUpdate(jid, [pending[0].jid], 'approve') // or 'reject'
```

### Settings

```ts
await sock.groupSettingUpdate(jid, 'announcement')       // only admins can send
await sock.groupSettingUpdate(jid, 'not_announcement')   // everyone can send
await sock.groupSettingUpdate(jid, 'locked')             // only admins can edit group info
await sock.groupMemberAddMode(jid, 'all_member_add')     // or 'admin_add'
await sock.groupJoinApprovalMode(jid, 'on')              // or 'off'
await sock.groupToggleEphemeral(jid, 86400)              // disappearing: 0 | 86400 | 604800 | 7776000
```

### Ephemeral and addressing

`addressingMode` decides whether the group is addressed by lid or by phone-number jid. Read it from `groupMetadata`
before constructing participant jids; `splitJidsByType` from the lid-support addon does the split for you.
