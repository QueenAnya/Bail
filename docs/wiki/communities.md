# Communities

A community is a container with linked groups. Same shape as groups, prefixed `community…`:

```ts
const community = await sock.communityCreate('Anya users', 'Everything about the library')
await sock.communityCreateGroup(community.id, 'Announcements', ['919876543210@s.whatsapp.net'])
await sock.communityLinkGroup(community.id, existingGroupJid)
await sock.communityUnlinkGroup(community.id, existingGroupJid)

const meta = await sock.communityMetadata(community.id)
const groups = await sock.communityFetchLinkedGroups(community.id)
const all = await sock.communityFetchAllParticipating()
```

Invites, participants, settings and ephemeral work exactly like groups:

```ts
await sock.communityParticipantsUpdate(community.id, [jid], 'add')
await sock.communitySettingUpdate(community.id, 'announcement')
await sock.communityToggleEphemeral(community.id, 86400)
await sock.communityUpdateSubject(community.id, 'Anya users — official')
await sock.communityUpdateDescription(community.id, 'Rules and releases')
await sock.communityRequestParticipantsUpdate(community.id, [jid], 'approve')
await sock.communityLeave(community.id)
```
