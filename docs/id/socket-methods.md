> Halaman ini belum diterjemahkan — isinya masih dalam bahasa Inggris.

## Account and chat methods

```ts
await sock.getUsername()                         // { username, state, pin }   (built on tb2's username socket)
await sock.checkUsernameAvailability('alice')    // { available, suggestions, response }
await sock.getUsernames(jid1, jid2)              // [{ jid, username }]
await sock.removeUsername()                      // same as deleteUsername()
await sock.removeUsernamePin()
await sock.fetchAbout('9199xxxxxxxx@s.whatsapp.net')      // { jid, status }
await sock.updateTextStatus('busy', { emoji: '🔥' })      // text: '' clears it
await sock.fetchUserNotices()                    // + updateUserNoticeStage(noticeId, stage)
await sock.fetchOptOutList()                     // + updateOptOut({ jid, category, action })
await sock.fetchPushSettings()
await sock.fetchServerLinkPreview('https://example.com')
await sock.reportSpam(jid, { flow: SPAM_FLOWS.OverflowMenuReport })   // SPAM_FLOWS is exported
await sock.getServerProps({ refresh: true })     // + fetchProps({ full: true })
await sock.checkAccountHealth('9199xxxxxxxx')    // { exists, isBusiness, about, hasProfilePhoto, self: { capped, warned, remaining }, notes }
```

## Message helpers

```ts
await sock.sendHD(jid, { image: { url: './photo.jpg' }, caption: 'HD' })        // SD message + linked HD child (image or video)
await sock.sendImgVid(jid, { image: { url: './a.jpg' }, video: { url: './a.mp4' }, caption: 'motion photo' })
await sock.removeMemberLabel(groupJid)                                           // = updateMemberLabel(groupJid, '')
await sock.resetGroupSenderKey(groupJid)                                         // { jid, cleared, devices } - redistributes the sender key
await sock.groupQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])   // raw w:g2 IQ, + communityQuery
await sock.executeWMexQuery({ newsletter_id: jid }, queryId, 'xwa2_newsletter_admin')       // raw WMex query
```
