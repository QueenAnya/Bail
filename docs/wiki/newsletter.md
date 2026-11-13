# Newsletter / channels

[← back to the README](../README.md)

## Channel (newsletter) methods

```ts
const jid = '120363xxxxxxxxxxxx@newsletter'
await sock.newsletterUpdateUserSetting(jid, 'ADMIN_NOTIFICATIONS', true)   // mute / unmute
await sock.newsletterUpdateReactions(jid, 'BASIC')                          // ALL | BASIC | NONE | BLOCKLIST
await sock.newsletterAdminInfo(jid)               // { adminCount, adminProfile, adminProfilesEnabled }
await sock.newsletterAdminCapabilities(jid)       // ['CHANNEL_STATUS_PRODUCER', ...]
await sock.newsletterCanPostStatus(jid)           // { canPost, canPostMusic, capabilities }
await sock.newsletterCreateAdminInvite(jid, '9199xxxxxxxx@s.whatsapp.net')
await sock.newsletterRevokeAdminInvite(jid, userJid)   // + newsletterAcceptAdminInvite(jid), newsletterPendingAdminInvites(jid)
await sock.newsletterFollowers(jid, { count: 100 })
await sock.newsletterInsights(jid, { metrics: ['NET_FOLLOWS', 'UNFOLLOWS'] })
await sock.newsletterPinMessages(jid, [150, 151])      // + newsletterUnpinMessages  (server ids are 99..2147476647)
await sock.newsletterLabelAiContent(jid, 150)          // + newsletterLabelPaidPartnership
await sock.newsletterPollVoters(jid, 150)              // + newsletterReactionSenders(jid, 150)
await sock.newsletterSendPollVote(jid, 150, ['Option A'])
await sock.newsletterFetchMessageUpdates(jid, { count: 20 })
await sock.newsletterQuestionResponses(jid, 150)       // + newsletterQuestionResponseState(...)
await sock.newsletterMyAddOns()                        // + newsletterStatusMyAddOns()
await sock.newsletterEnforcements(jid)                 // + newsletterReports(), newsletterAppealReport(reportId, reason)
await sock.newsletterRecommended({ limit: 10 })        // + newsletterSimilar(jid)
await sock.newsletterDirectoryList({ view: 'RECOMMENDED' })   // + newsletterDirectorySearch('news'), newsletterDirectoryCategories()
```

Events `newsletter-admin-profile.update` / `mex.notification`, `newsletterMeta` on live channel messages and `key.isNewsletterSender` are described in *Elaina 1.4.7 follow-up sync*.

### Channel statuses

```ts
const sent = await sock.sendNewsletterStatus(jid, { text: 'New post!' })            // text / image / video / gif / audio / question
await sock.sendNewsletterStatus(jid, { image: { url: './pic.jpg' }, caption: 'hi' }, { aiContent: true })
await sock.sendNewsletterStatusReaction(jid, sent.newsletterStatusServerId, '🔥')   // reaction: null removes it
await sock.revokeNewsletterStatus(jid, sent.key.id)
const list = await sock.getNewsletterStatuses(jid, { count: 20 })                    // { jid, t, statuses: [...] }
const updates = await sock.getNewsletterStatusUpdates(jid, { since: 1700000000 })
```

You must be an admin with the `CHANNEL_STATUS_PRODUCER` capability (`sock.newsletterCanPostStatus(jid)` tells you). The status
is acknowledged by the server; its server id (needed for reactions / revoke) arrives in a separate `<status>` stanza, which is
waited for automatically (`resolveServerId: false` skips that).

## Newsletter API

Everything the four merged forks expose for channels is on the socket returned by `makeWASocket()` — 55 methods,
no extra wiring. This section is the usage reference; the newsletter guide covers setup and
lifecycle.

**Contents**

- [Quick start](#quick-start)
- [Method reference](#method-reference) · lifecycle · reading ·
  audience · posting · admin ·
  discovery · moderation
- [Mute](#mute-two-paths) · [Generic dispatch](#generic-dispatch)
- [Types](#types) · [Query ids](#query-ids-and-generations)
- [Helpers merged onto the socket](#helpers-merged-onto-the-socket)
- [Endpoint allowlist](#endpoint-allowlist) · [Dependencies](#dependencies)
- [Tests](#tests-and-guards) · [Build](#build-and-test) · [Not merged](#what-is-not-merged)

### Quick start

```js
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state } = await useMultiFileAuthState('auth')
const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }) })

const channel = '120363410154606795@newsletter'

// read
const meta = await sock.newsletterMetadata('jid', channel)

// follow, then post
await sock.newsletterFollow(channel)
await sock.newsletterUpdateName(channel, 'Daily updates')
```

`jid` values are `120363…@newsletter`. A channel can also be addressed by its invite code with
`newsletterMetadata('invite', 'AB12CdEfGh')`.

---

### Method reference

#### Channel lifecycle

| Method | Signature | Returns | Notes |
| --- | --- | --- | --- |
| `newsletterCreate` | `(name: string, description?: string)` | `NewsletterMetadata` | creates a channel you own |
| `newsletterDelete` | `(jid: string)` | `unknown` | owner only |
| `newsletterFollow` | `(jid: string)` | `unknown` | subscribe your account |
| `newsletterUnfollow` | `(jid: string)` | `unknown` | |
| `newsletterChangeOwner` | `(jid: string, newOwnerJid: string)` | `unknown` | owner only |
| `newsletterFetchAllParticipating` | `()` | `Record<string, NewsletterMetadata>` | every channel this account follows |

```js
const created = await sock.newsletterCreate('My Channel', 'About things')
const mine = await sock.newsletterFetchAllParticipating()
console.log(Object.keys(mine))   // ['120363…@newsletter', …]
```

#### Reading a channel

| Method | Signature | Returns | Notes |
| --- | --- | --- | --- |
| `newsletterMetadata` | `(type: 'invite' \| 'jid', key: string, options?)` | `NewsletterMetadata \| null` | `options`: `fetchCreationTime`, `fetchFullImage`, `fetchViewerMetadata`, `fetchPinnedMessages`, `fetchStatusMetadata`, `fetchWamoSub`, `viewRole` |
| `newsletterSubscribers` | `(jid: string, options?: { count?: number })` | `unknown` | subscriber list |
| `newsletterAdminCount` | `(jid: string)` | `number` | |
| `newsletterAdminInfo` | `(jid: string)` | `unknown` | admin roster |
| `newsletterSubscribed` | `(options?)` | `unknown` | channels *you* are subscribed to |

```js
const meta = await sock.newsletterMetadata('jid', channel, {
    fetchViewerMetadata: true,
    fetchPinnedMessages: true
})

const byInvite = await sock.newsletterMetadata('invite', 'AB12CdEfGh')
const admins = await sock.newsletterAdminCount(channel)
```

#### Audience and engagement

| Method | Signature | Returns | Notes |
| --- | --- | --- | --- |
| `newsletterFollowers` | `(jid: string, options?)` | `unknown` | `options`: `count` |
| `newsletterPollVoters` | `(jid: string, serverId: string, options?)` | `unknown` | who voted on a poll |
| `newsletterReactionSenders` | `(jid: string, serverId: string)` | `unknown` | who reacted |
| `newsletterQuestionResponses` | `(jid: string, serverId: string, options?)` | `unknown` | answers to a question post |
| `newsletterQuestionResponseState` | `(jid, serverId, responseServerId, state)` | `unknown` | |
| `newsletterSendPollVote` | `(jid, parentServerId, options)` | `unknown` | vote as this account |
| `newsletterFetchMessageUpdates` | `(jid: string, options?)` | `unknown` | views/reactions without bodies |
| `newsletterFetchMessages` | `(jid, count, since, after)` | `unknown` | message bodies |
| `newsletterFetchUpdates` | `(jid, count, after?, since?)` | `unknown` | low-level update feed |

```js
const followers = await sock.newsletterFollowers(channel, { count: 50 })
const voters = await sock.newsletterPollVoters(channel, serverId, { count: 20 })
const reactors = await sock.newsletterReactionSenders(channel, serverId)
const updates = await sock.newsletterFetchMessageUpdates(channel, { count: 20 })
```

#### Posting and settings

| Method | Signature | Notes |
| --- | --- | --- |
| `newsletterUpdateName` | `(jid: string, name: string)` | |
| `newsletterUpdateDescription` | `(jid: string, description: string)` | |
| `newsletterUpdatePicture` | `(jid: string, content: WAMediaUpload)` | buffer, path or stream |
| `newsletterRemovePicture` | `(jid: string)` | |
| `newsletterPinMessages` | `(jid: string, serverIds: string \| string[])` | |
| `newsletterUnpinMessages` | `(jid: string, serverIds: string \| string[])` | |
| `newsletterReactionMode` | `(jid: string, mode: string)` | `ALL` · `BASIC` · `NONE` · `BLOCKLIST` |
| `newsletterUpdateReactions` | `(jid: string, setting: string)` | validates against the same four values |
| `newsletterUpdateUserSetting` | `(jid, type, value: boolean)` | `type`: `ADMIN_NOTIFICATIONS` · `FOLLOWER_NOTIFICATIONS` |
| `newsletterReactMessage` | `(jid, serverId, reaction?: string)` | empty string removes the reaction |
| `newsletterCanPostStatus` | `(jid: string)` | whether this account may post status |
| `newsletterLabelAiContent` | `(jid, serverId, messageType = 'MESSAGE')` | AI-content label |
| `newsletterLabelPaidPartnership` | `(jid, serverId, messageType = 'MESSAGE')` | paid-partnership label |

```js
await sock.newsletterUpdatePicture(channel, fs.readFileSync('banner.jpg'))
await sock.newsletterPinMessages(channel, ['100', '101'])
await sock.newsletterReactionMode(channel, 'BASIC')
await sock.newsletterReactMessage(channel, serverId, '👍')
```

#### Admin

| Method | Signature | Notes |
| --- | --- | --- |
| `newsletterCreateAdminInvite` | `(jid: string, userJid: string)` | |
| `newsletterRevokeAdminInvite` | `(jid: string, userJid: string)` | |
| `newsletterAcceptAdminInvite` | `(jid: string)` | accept an invite you received |
| `newsletterPendingAdminInvites` | `(jid: string)` | |
| `newsletterAdminCapabilities` | `(jid: string)` | what this account may do in the channel |
| `newsletterDemote` | `(jid: string, userJid: string)` | |

```js
await sock.newsletterCreateAdminInvite(channel, '919999999999@s.whatsapp.net')
const pending = await sock.newsletterPendingAdminInvites(channel)
const caps = await sock.newsletterAdminCapabilities(channel)
```

#### Discovery

| Method | Signature | Notes |
| --- | --- | --- |
| `newsletterRecommended` | `(options?)` | `limit`, `countryCodes`, `fetchStatusMetadata` |
| `newsletterSimilar` | `(jid: string, options?)` | channels like this one |
| `newsletterDirectoryList` | `(options?)` | `limit`, `cursorToken` |
| `newsletterDirectorySearch` | `(searchText: string, options?)` | `categories`, `limit`, `cursorToken` |
| `newsletterDirectoryCategories` | `(options?)` | category tree |

```js
const recs = await sock.newsletterRecommended({ limit: 10, countryCodes: ['IN'] })
const similar = await sock.newsletterSimilar(channel, { limit: 10 })
const found = await sock.newsletterDirectorySearch('football', { limit: 20 })
```

#### Moderation and insights

| Method | Signature | Notes |
| --- | --- | --- |
| `newsletterInsights` | `(jid: string, options?)` | reach and engagement |
| `newsletterEnforcements` | `(jid: string, locale = 'en_US')` | enforcement records |
| `newsletterReports` | `(locale = 'en_US')` | reports against channels |
| `newsletterAppealReport` | `(reportId: string, reason: string)` | appeal one |
| `newsletterMyAddOns` | `(options?)` | your add-ons (`limit`, `jid`) |
| `newsletterStatusMyAddOns` | `(options?)` | status add-ons |

```js
const insights = await sock.newsletterInsights(channel, { limit: 20 })
const reports = await sock.newsletterReports('en_US')
await sock.newsletterAppealReport(reportId, 'posted by mistake')
```

---

### Mute: two paths

The forks disagree about how muting works, so both paths exist. The default is elaina's.

| Method | Path | When to use |
| --- | --- | --- |
| `newsletterMute(jid)` / `newsletterUnmute(jid)` | user settings (`ADMIN_NOTIFICATIONS`) | **default** — works against this repo's pinned client revision |
| `newsletterMuteLegacy(jid)` / `newsletterUnmuteLegacy(jid)` | dedicated `mute_v2` query | client generations that still serve `mute_v2` (whiskeysockets / itsliaaa) |

```js
await sock.newsletterMute(channel)          // setting-based
await sock.newsletterMuteLegacy(channel)    // dedicated query
```

If the legacy pair answers `400`, the setting-based pair is the one that works.

### Generic dispatch

```js
await sock.newsletterAction(jid, 'FOLLOW')   // any QueryIds name
```

User-called only: nothing in the library invokes it, and `test/no-auto-follow.test.js` fails if anything starts to.
It is the one place `QueryIds[…]` may be indexed dynamically.

---

### Types

All of them are declared in `src/Types/Mex.ts` alongside `QueryIds` and `XWAPaths`, so the whole newsletter surface is
one file. Import them from the package root or from `Types/Mex` — there is no separate newsletter types module.

```ts
import type {
    NewsletterMetadata, NewsletterState, NewsletterVerification, NewsletterMute,
    NewsletterReactionMode, NewsletterViewerMetadata, NewsletterReaction,
    NewsletterFetchedUpdate, SubscriberAction, ReactionModeUpdate,
    NewsletterSettingsUpdate, NewsletterMetadataExtended
} from '@teamolduser/baileys'
```

#### `NewsletterMetadata` — 18 fields

elaina's shape is the base (what every method above returns); innovatorssoft's extra fields are merged in.

| Field | Type | From |
| --- | --- | --- |
| `id` | `string` | elaina |
| `owner` | `string?` | elaina |
| `name` | `string` | elaina |
| `description` | `string?` | elaina |
| `invite` | `string?` | elaina |
| `creation_time` | `number?` | elaina |
| `subscribers` | `number?` | elaina |
| `verification` | `'VERIFIED' \| 'UNVERIFIED'?` | elaina |
| `mute_state` | `'ON' \| 'OFF'?` | elaina |
| `thread_metadata` | `{ creation_time?, name?, description? }?` | elaina |
| `picture` | `{ url?, directPath?, mediaKey?, id? } \| string \| null?` | **both** — object here, path string there |
| `reaction_codes` | `{ code, count }[] \| NewsletterReactionMode?` | **both** — tally here, single mode there |
| `state` | `NewsletterState?` | innovatorssoft |
| `nameTime` | `number?` | innovatorssoft |
| `descriptionTime` | `number?` | innovatorssoft |
| `handle` | `null?` | innovatorssoft |
| `preview` | `string \| null?` | innovatorssoft |
| `viewer_metadata` | `NewsletterViewerMetadata?` | innovatorssoft |

`NewsletterMetadataExtended` is an alias of `NewsletterMetadata`.

#### Exported union types

| Type | Values |
| --- | --- |
| `NewsletterState` | `'ACTIVE' \| 'GEOSUSPENDED' \| 'SUSPENDED'` |
| `NewsletterVerification` | `'VERIFIED' \| 'UNVERIFIED'` |
| `NewsletterMute` | `'ON' \| 'OFF' \| 'UNDEFINED'` |
| `NewsletterReactionMode` | `'ALL' \| 'BASIC' \| 'NONE'` |
| `SubscriberAction` | `'promote' \| 'demote'` |

---

### Query ids and generations

`QueryIds` has 63 members, `XWAPaths` 51. The **primary** values are elaina's — the generation this repo's pinned
client revision speaks. Other forks' values are kept as `_ALT` constants, each commented with its source:

```ts
QueryIds.FOLLOW      // '24404358912487870'  — use this
QueryIds.FOLLOW_ALT  // '7871414976211147'   — innovatorssoft's older generation, do not use
```

| Group | Count | Source |
| --- | --- | --- |
| primary | 45 | elaina |
| ours only | 3 | this repo |
| `_ALT` alternates | 15 | whiskeysockets + itsliaaa, and innovatorssoft |

`test/no-auto-follow.test.js` forbids any file outside `src/Types/Mex.ts` from referencing an `_ALT` / `_LEGACY`
constant — a wrong-generation id fails at runtime, and a used id is a live capability.

---

### Helpers merged onto the socket

`makeWASocket()` runs `makeUsernameSocket()` and then `makePortedSocket()`, so ported helpers sit on the socket even
though they live outside `Socket/`:

```js
await sock.getUsername('919999999999')      // Extras/chats-extras
await sock.setUsername('myhandle')          // Socket/username
await sock.fetchAbout(jid)
await sock.reportSpam(jid)
await sock.checkAccountHealth()
await sock.updateTextStatus('text', {})
await sock.fetchPrivacySettings()
await sock.updateLastSeenPrivacy('contacts')
```

---

### Endpoint allowlist

The websocket refuses any `waWebSocketUrl` that is not a WhatsApp host or loopback.

```js
makeWASocket({ ... })                                    // wss://web.whatsapp.com — allowed
makeWASocket({ waWebSocketUrl: 'wss://proxy.local' })     // throws
makeWASocket({ waWebSocketUrl: 'wss://proxy.local',
               allowCustomEndpoint: true })               // allowed, logs a warning naming the host
```

Deliberate: a library that connects anywhere is indistinguishable from one that phones home. Details in
[`SECURITY.md`](../../SECURITY.md).

### Dependencies

| Dependency | State | Why |
| --- | --- | --- |
| `libsignal` | `npm:@teamolduser/libsignal@1.0.1` | upstream 6.0.0 with its own `console.*` calls commented out; diff recorded in `SECURITY.md` |
| `ffmpeg-static` | regular dependency | the bundled binary is used when it downloaded; `getFfmpegBin()` still falls back to a system `ffmpeg`, so a failed download degrades instead of breaking |

---

### Tests and guards

```bash
node --test test/*.test.js                                  # 128 tests
node scripts/audit-elaina-parity.mjs ../elaina-baileys      # byte parity, 15 ported modules
node scripts/check-revision.mjs                             # pinned revision vs the live web client
node scripts/verify-live.mjs --payments                     # real send path, your own paired session
```

| Test file | Locks down |
| --- | --- |
| `no-auto-follow.test.js` | no automatic follow, no hardcoded `@newsletter` JID, alternates never used |
| `socket-surface.test.js` | every chats/communities/groups/newsletter method from all four forks exists |
| `newsletter-types.test.js` | the 11 newsletter types and the 18-field metadata shape |
| `newsletter-surface.test.js` | the 55 newsletter methods in the compiled module |
| `signal-roundtrip.test.js` | Signal encrypt/decrypt through the pinned libsignal |
| `endpoint-allowlist.test.js` | the websocket guard, including lookalike-host and userinfo spoofing |

### Build and test

```bash
node -v            # 24.x or newer
npm install
npm run build      # src/*.ts → lib/*.js
node --test test/*.test.js
```

### What is *not* merged

Stated plainly so nobody assumes more than is true: `Socket/business*`, `messages-recv`, `messages-send`,
`rich-messages`, `mex`, `socket` and `username` were **not** diffed method-by-method against the four forks. Only the
15 modules under `src/Extras/` have byte-level parity coverage, and `Utils/`, `WABinary/`, `Defaults/` are covered by
the elaina parity audit alone.
