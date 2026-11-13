<div align="center">

<img alt="Anya Baileys" src="../Media/logo.png" height="90" />

# @teamolduser/baileys

**An extended Baileys — the WebSockets-based TypeScript library for the WhatsApp Web API — with the ports, adapters and fixes upstream has not shipped yet.**

<a href="https://www.npmjs.com/package/@teamolduser/baileys"><img alt="npm" src="https://img.shields.io/npm/v/@teamolduser/baileys?style=for-the-badge&logo=npm&labelColor=161b22&color=cb3837" /></a>
<a href="https://www.npmjs.com/package/@teamolduser/baileys"><img alt="downloads" src="https://img.shields.io/npm/dm/@teamolduser/baileys?style=for-the-badge&logo=npm&labelColor=161b22&color=cb3837" /></a>
<a href="https://github.com/Teamolduser/Baileys/stargazers"><img alt="stars" src="https://img.shields.io/github/stars/Teamolduser/Baileys?style=for-the-badge&logo=github&labelColor=161b22" /></a>
<a href="../LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-3da639?style=for-the-badge&labelColor=161b22" /></a>
<a href="https://nodejs.org"><img alt="node" src="https://img.shields.io/badge/node-%E2%89%A522-339933?style=for-the-badge&logo=node.js&labelColor=161b22" /></a>
<a href="#"><img alt="esm" src="https://img.shields.io/badge/module-ESM-f7df1e?style=for-the-badge&logo=javascript&labelColor=161b22&logoColor=black" /></a>

[Quick start](#-quick-start) · [Install](#-install) · [Usage](#-connecting-an-account) · [Reference](#-links) · [Docs site](https://teamolduser.github.io/Baileys/)

</div>

---

> [!TIP]
> **Documentation site** — <https://teamolduser.github.io/Baileys/>: the same pages as [`docs/wiki/`](../docs/wiki/),
> rendered with search. It is rebuilt from `master` on every push that touches `docs/`, and the link here updates
> itself from the deployment, so forks do not need to edit it.

---

## ⚠️ Important Notice

This is an **unofficial** library. It is not affiliated with, endorsed by, or supported by WhatsApp or Meta.

> [!WARNING]
> Using it can get a number **banned**. Do not use it with a number you care about. The maintainers take no
> responsibility for account loss, data loss, or anything else that follows from using it.

Prefer the official [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp) for anything that matters.

## 🚀 Quick Start

```ts
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info')
const sock = makeWASocket({ auth: state })

sock.ev.on('creds.update', saveCreds)
sock.ev.on('connection.update', ({ connection, qr, lastDisconnect }) => {
	if (qr) console.log('scan this:', qr)
	if (connection === 'close') {
		const code = lastDisconnect?.error?.output?.statusCode
		if (code !== DisconnectReason.loggedOut) console.log('reconnecting…')
	}
})
sock.ev.on('messages.upsert', ({ messages }) => {
	for (const m of messages) console.log(m.key.remoteJid, m.message)
})
```

## 📦 Install

```bash
npm install @teamolduser/baileys
# or
yarn add @teamolduser/baileys
# or
pnpm add @teamolduser/baileys
```

Straight from GitHub:

```bash
npm install github:Teamolduser/Baileys
```

> [!IMPORTANT]
> **Node 22 or newer is required.** The SQLite auth state and the Framework store import `better-sqlite3 ^13`, which
needs it. `npm run check:engine` enforces the floor; `engine-requirements.js` and `engine-requirements2.js` are the
upstream files, kept verbatim for diffing.

The package is **ESM-only**. From CommonJS use `await import('@teamolduser/baileys')`.

Installing runs a Node version check first (`preinstall` → `engine-requirements-anya.js`): below Node.js 20 it stops,
and on 20 or 21 it warns.

`better-sqlite3` — used by the SQLite auth state and the Framework store — declares `node >=22`. It stays a regular
dependency on purpose: `src/Framework/Store/SQLiteStore.ts` and `src/Framework/StatsManager.ts` import it statically, so
without it the package root cannot be imported at all (`ERR_MODULE_NOT_FOUND`). Node.js **22+ is therefore the real
floor** for this package, even though the check only hard-fails below 20.

## ✨ What is in the box

A quick map of what this fork adds on top of upstream Baileys, so you know where to look.

| Area | What you get | Where |
|---|---|---|
| Auth backends | 14 adapters — files, SQLite ×2, Postgres, MySQL, Turso, Redis ×2, Mongo ×2, NekoDB, NeDB, cache-manager | [Sessions and auth state](#sessions-and-auth-state) |
| Moving backends | `migrateAuthState` copies creds and every signal key without a re-pair | [Moving credentials](#moving-credentials-to-another-backend) |
| Call shapes | every adapter takes `(a)`, `(a, b, c)`, `({ a })`, `({ a, b, c })` and the mixes | [Sessions and auth state](#sessions-and-auth-state) |
| Newsletter / channels | 55 methods — create, follow, mute, admin invites, insights, directory, reports | [Newsletter and channels](#newsletter-and-channels) |
| MessageBuilder | buttons, lists, carousels, AIRich, native flow, A2UI cards | [MessageBuilder, AIRich and webview](#messagebuilder-airich-and-webview) |
| Rich content | link previews, ad-style cards, payments, scheduled messages, modern content types | [Rich content](#rich-content) |
| VoIP | call signalling, group calls, screen sharing, diagnostics | [VoIP](#voip) |
| HTML webview | `webView` / `web` / `sendHtmlWebview` bound to the socket | [MessageBuilder, AIRich and webview](#messagebuilder-airich-and-webview) |
| Extras catalogue | ~90 modules ported from other forks, documented module by module | [Extras and Addons](#-extras-and-addons) |
| Full reference | every wiki page, every feature guide, every export — inline in this file | [Full reference](#-full-reference) |

Everything is TypeScript, ships with its own types, and is tested by `npm run test2` (202 tests, no network).

## 📚 Index

- [@teamolduser/baileys](#teamolduserbaileys)
  - [⚠️ Important Notice](#-important-notice)
  - [🚀 Quick Start](#-quick-start)
  - [📦 Install](#-install)
  - [✨ What is in the box](#-what-is-in-the-box)
  - [🔌 Connecting an account](#-connecting-an-account)
  - [💾 Sessions and auth state](#-sessions-and-auth-state)
    - [Picking an adapter](#picking-an-adapter)
    - [Sessions in one database](#sessions-in-one-database)
    - [Moving credentials to another backend](#moving-credentials-to-another-backend)
  - [📡 Handling events](#-handling-events)
  - [💬 Sending messages](#-sending-messages)
  - [👥 Groups](#-groups)
  - [🏘️ Communities](#-communities)
  - [💬 Chats](#-chats)
  - [👤 Profile and privacy](#-profile-and-privacy)
  - [📇 Contacts and presence](#-contacts-and-presence)
  - [📨 Message operations](#-message-operations)
  - [🛍️ Business and catalog](#-business-and-catalog)
  - [📞 Calls](#-calls)
  - [✨ Rich content](#-rich-content)
  - [🗄️ Data store](#-data-store)
  - [🔧 Raw access](#-raw-access)
  - [🪪 WhatsApp IDs: JID, PN, LID](#-whatsapp-ids-jid-pn-lid)
  - [⚙️ Socket config](#-socket-config)
  - [🎨 MessageBuilder, AIRich and webview](#-messagebuilder-airich-and-webview)
  - [📰 Newsletters — channels](#-newsletters-channels)
  - [📞 VoIP](#-voip)
  - [🧩 Extras and Addons](#-extras-and-addons)
  - [🔗 Links](#-links)
  - [🙏 Credits](#-credits)
    - [This fork](#this-fork)
    - [Upstream](#upstream)
    - [Forks whose work is ported here](#forks-whose-work-is-ported-here)
    - [Third-party packages](#third-party-packages)
    - [Thanks](#thanks)
  - [📖 Full reference](#-full-reference)
    - [Auth state adapters](#auth-state-adapters)
    - [Database auth states](#database-auth-states)
    - [MongoDB Auth State 2 (`useMongoAuthState2`)](#mongodb-auth-state-2-usemongoauthstate2)
    - [SQLite Auth State 2 (`useSqliteAuthState2`)](#sqlite-auth-state-2-usesqliteauthstate2)
    - [Turso / libSQL Auth State (`useTursoAuthState`)](#turso-libsql-auth-state-usetursoauthstate)
    - [Migrating between adapters](#migrating-between-adapters)
    - [Auth adapter examples](#auth-adapter-examples)
    - [How the arguments line up](#how-the-arguments-line-up)
    - [One positional argument](#one-positional-argument)
    - [Argument order](#argument-order)
    - [Options object with just the location](#options-object-with-just-the-location)
    - [Options object with every level](#options-object-with-every-level)
    - [Return shapes](#return-shapes)
    - [Sharing one backend between bots](#sharing-one-backend-between-bots)
    - [Moving between adapters later](#moving-between-adapters-later)
    - [Store APIs](#store-apis)
    - [Store APIs at the package root](#store-apis-at-the-package-root)
    - [Socket methods](#socket-methods)
    - [Account and chat methods](#account-and-chat-methods)
    - [Message helpers](#message-helpers)
    - [Message content](#message-content)
    - [New message content keys](#new-message-content-keys)
    - [MessageBuilder and AIRich](#messagebuilder-and-airich)
    - [MessageBuilder / AIRich](#messagebuilder-airich)
    - [Native flow payloads](#native-flow-payloads)
    - [Direct Native Flow examples (without helper builders)](#direct-native-flow-examples-without-helper-builders)
    - [V2 interactive names](#v2-interactive-names)
    - [Elaina-derived interactive APIs (V2 naming)](#elaina-derived-interactive-apis-v2-naming)
    - [Newsletter and channels](#newsletter-and-channels)
    - [Channel (newsletter) methods](#channel-newsletter-methods)
    - [Newsletter API](#newsletter-api)
    - [Calls, queues and screen sharing](#calls-queues-and-screen-sharing)
    - [🎧 Call queues, screen sharing and group calls](#-call-queues-screen-sharing-and-group-calls)
    - [VoIP](#voip)
    - [Unified VoIP API](#unified-voip-api)
    - [VoIP diagnostics and call timelines](#voip-diagnostics-and-call-timelines)
    - [In-app HTML webview](#in-app-html-webview)
    - [In-app HTML webview (`webView`)](#in-app-html-webview-webview)
    - [Account health signals](#account-health-signals)
    - [🛡️ Account health signals](#-account-health-signals)
    - [Pairing code](#pairing-code)
    - [AnchorGuard](#anchorguard)
    - [External ad reply](#external-ad-reply)
    - [Rich link cards and status previews](#rich-link-cards-and-status-previews)
    - [A2UI cards](#a2ui-cards)
    - [Message types](#message-types)
    - [Message content keys](#message-content-keys)
    - [Modern message API](#modern-message-api)
    - [Scheduled messages](#scheduled-messages)
    - [Group administration](#group-administration)
    - [Communities](#communities)
    - [Chat state, labels and history](#chat-state-labels-and-history)
    - [Privacy and disappearing messages](#privacy-and-disappearing-messages)
    - [Presence and read receipts](#presence-and-read-receipts)
    - [Profile photos](#profile-photos)
    - [Business, catalog and labels](#business-catalog-and-labels)
    - [Channel administration](#channel-administration)
    - [Calls in depth](#calls-in-depth)
    - [Event reference](#event-reference)
    - [Socket config reference](#socket-config-reference)
    - [Framework](#framework)
    - [`SQLiteStore`](#sqlitestore)
    - [`SessionManager`](#sessionmanager)
    - [`MediaManager`](#mediamanager)
    - [`StatsManager`](#statsmanager)
    - [`Bot`](#bot)
    - [`Context`](#context)
    - [Example](#example)
    - [Internals](#internals)
    - [`src/Socket`](#srcsocket)
    - [`src/Signal`](#srcsignal)
    - [`src/Voip`](#srcvoip)
    - [`src/WABinary`, `src/WAM`, `src/WAUSync`](#srcwabinary-srcwam-srcwausync)
    - [`src/Defaults`](#srcdefaults)
    - [`src/Extras/MessageBuilder/bot-signature.ts`](#srcextrasmessagebuilderbot-signaturets)
    - [Reading a stack trace](#reading-a-stack-trace)
    - [Addons that are entry points rather than helpers](#addons-that-are-entry-points-rather-than-helpers)
    - [Type-only folders](#type-only-folders)
    - [The remaining internals](#the-remaining-internals)
    - [Useful exports](#useful-exports)
    - [Updating the WhatsApp Web version](#updating-the-whatsapp-web-version)
    - [Getting a tarball](#getting-a-tarball)
    - [Notable behaviour changes](#notable-behaviour-changes)
    - [Coming from upstream Baileys](#coming-from-upstream-baileys)
    - [Troubleshooting](#troubleshooting)
  - [📘 Feature guides](#-feature-guides)
    - [account health](#account-health)
    - [🛡️ Account health signals](#-account-health-signals-1)
    - [auth state](#auth-state)
    - [Database auth states](#database-auth-states-1)
    - [MongoDB Auth State 2 (`useMongoAuthState2`)](#mongodb-auth-state-2-usemongoauthstate2-1)
    - [SQLite Auth State 2 (`useSqliteAuthState2`)](#sqlite-auth-state-2-usesqliteauthstate2-1)
    - [Turso / libSQL Auth State (`useTursoAuthState`)](#turso-libsql-auth-state-usetursoauthstate-1)
    - [Moving credentials to another backend](#moving-credentials-to-another-backend-1)
    - [builder](#builder)
    - [Imports](#imports)
    - [Build an interactive button message](#build-an-interactive-button-message)
    - [Static helper attachment](#static-helper-attachment)
    - [Main builder families](#main-builder-families)
    - [Compatibility notes](#compatibility-notes)
    - [Access paths](#access-paths)
    - [calls](#calls)
    - [🎧 Call queues, screen sharing and group calls](#-call-queues-screen-sharing-and-group-calls-1)
    - [elaina parity](#elaina-parity)
    - [What "parity" means here](#what-parity-means-here)
    - [All fifteen are identical](#all-fifteen-are-identical)
    - [What the stanza suite covers](#what-the-stanza-suite-covers)
    - [Provenance](#provenance)
    - [What parity does not cover](#what-parity-does-not-cover)
    - [Dependency trust](#dependency-trust)
    - [examples](#examples)
    - [Text command bot skeleton](#text-command-bot-skeleton)
    - [MongoDB auth with isolated sessions](#mongodb-auth-with-isolated-sessions)
    - [Store chats and messages in memory](#store-chats-and-messages-in-memory)
    - [AIRich widgets, A2UI and AIRichMessage](#airich-widgets-a2ui-and-airichmessage)
    - [WAProto additions (offline check)](#waproto-additions-offline-check)
    - [getting started](#getting-started)
    - [Requirements](#requirements)
    - [Install](#install)
    - [Create a socket and persist credentials](#create-a-socket-and-persist-credentials)
    - [Important session rule](#important-session-rule)
    - [groups](#groups)
    - [Create a group](#create-a-group)
    - [Update participants](#update-participants)
    - [Group metadata and admin operations](#group-metadata-and-admin-operations)
    - [index](#index)
    - [Start here](#start-here)
    - [Package](#package)
    - [interactive v2](#interactive-v2)
    - [Elaina-derived interactive APIs (V2 naming)](#elaina-derived-interactive-apis-v2-naming-1)
    - [live verification](#live-verification)
    - [Before you start](#before-you-start)
    - [Step 1 — build the library](#step-1-build-the-library)
    - [Step 2 — pair once, if you have not already](#step-2-pair-once-if-you-have-not-already)
    - [Step 3 — run the checks](#step-3-run-the-checks)
    - [Step 4 — read the result](#step-4-read-the-result)
    - [Step 5 — if something fails](#step-5-if-something-fails)
    - [What this does not cover](#what-this-does-not-cover)
    - [If you want the strongest signal](#if-you-want-the-strongest-signal)
    - [message content](#message-content-1)
    - [New message content keys](#new-message-content-keys-1)
    - [messagebuilder](#messagebuilder)
    - [MessageBuilder / AIRich](#messagebuilder-airich-1)
    - [messages](#messages)
    - [Receive new messages](#receive-new-messages)
    - [Extract simple text](#extract-simple-text)
    - [Send a text message](#send-a-text-message)
    - [Mark messages as read](#mark-messages-as-read)
    - [Interactive messages](#interactive-messages)
    - [native flow](#native-flow)
    - [Direct Native Flow examples (without helper builders)](#direct-native-flow-examples-without-helper-builders-1)
    - [newsletter](#newsletter)
    - [Create and update a channel](#create-and-update-a-channel)
    - [Ported newsletter extras](#ported-newsletter-extras)
    - [Server IDs versus message keys](#server-ids-versus-message-keys)
    - [pairing](#pairing)
    - [porting changes](#porting-changes)
    - [1. MessageBuilder static helper attachment](#1-messagebuilder-static-helper-attachment)
    - [2. Store root exports](#2-store-root-exports)
    - [3. MongoDB `useMongoAuthState2`](#3-mongodb-usemongoauthstate2)
    - [4. SQLite `useSqliteAuthState2`](#4-sqlite-usesqliteauthstate2)
    - [5. Package metadata and compatibility tests](#5-package-metadata-and-compatibility-tests)
    - [6. Cumulative ZIP and ported-folder organization](#6-cumulative-zip-and-ported-folder-organization)
    - [Elaina name compatibility](#elaina-name-compatibility)
    - [Elaina sync: commit f025122 to the 21-oct build](#elaina-sync-commit-f025122-to-the-21-oct-build)
    - [sessions](#sessions)
    - [Multi-file auth state](#multi-file-auth-state)
    - [Database-backed auth states](#database-backed-auth-states)
    - [`useMongoAuthState2`](#usemongoauthstate2)
    - [`useSqliteAuthState2`](#usesqliteauthstate2)
    - [`useTursoAuthState`](#usetursoauthstate)
    - [Sessions across the file-based adapters](#sessions-across-the-file-based-adapters)
    - [Store lifecycle](#store-lifecycle)
    - [Production guidance](#production-guidance)
    - [socket methods](#socket-methods-1)
    - [Account and chat methods](#account-and-chat-methods-1)
    - [Message helpers](#message-helpers-1)
    - [stability checklist](#stability-checklist)
    - [Step 0 — build and run the local suite (5 minutes, no account)](#step-0-build-and-run-the-local-suite-5-minutes-no-account)
    - [Step 1 — pair a spare number (10 minutes, needs a phone)](#step-1-pair-a-spare-number-10-minutes-needs-a-phone)
    - [Step 2 — prove the stanzas are accepted (15 minutes, needs the paired session)](#step-2-prove-the-stanzas-are-accepted-15-minutes-needs-the-paired-session)
    - [Step 3 — reconnect storm (5 minutes, needs the paired session)](#step-3-reconnect-storm-5-minutes-needs-the-paired-session)
    - [Step 4 — soak (24 hours, needs the paired session)](#step-4-soak-24-hours-needs-the-paired-session)
    - [Step 5 — put it in CI (10 minutes)](#step-5-put-it-in-ci-10-minutes)
    - [Step 6 — keep the revision fresh (ongoing)](#step-6-keep-the-revision-fresh-ongoing)
    - [What is still unprovable from here](#what-is-still-unprovable-from-here)
    - [store](#store)
    - [Store APIs at the package root](#store-apis-at-the-package-root-1)
    - [voip](#voip-1)
    - [Unified VoIP API](#unified-voip-api-1)
    - [VoIP diagnostics and call timelines](#voip-diagnostics-and-call-timelines-1)
    - [webview](#webview)
    - [In-app HTML webview (`webView`)](#in-app-html-webview-webview-1)
  - [🔎 API reference](#-api-reference)
    - [Extras](#extras)
    - [Addons](#addons)
    - [Utils](#utils)
  - [📄 License](#-license)

## 🔌 Connecting an account

> [!TIP]
> `printQRInTerminal` prints the QR in the terminal for you. To render it yourself, read `qr` from `connection.update`
> and draw it with any QR library.

**QR** — print the string from `connection.update` and render it yourself, or scan it from
*WhatsApp → Linked devices*.

> [!NOTE]
> The phone number must be digits only — country code, no `+`, no spaces or dashes.

**Pairing code** — no camera needed:

```ts
const sock = makeWASocket({ auth: state, printQRInTerminal: false })
const phoneNumber = '919999999999'          // country code, no +
const code = await sock.requestPairingCode(phoneNumber)
console.log(code)                            // type it into WhatsApp → Linked devices → Link with phone number
```

**Full history** — the server only sends recent history to a browser identity. Ask for a Desktop sub-platform:

```ts
const sock = makeWASocket({
	auth: state,
	browser: Browsers.windows('Desktop'),
	syncFullHistory: true
})
```

## 💾 Sessions and auth state

### Picking an adapter

Every adapter returns `{ state, saveCreds }`. Some also expose `clearAuth()` and `close()`.

| Adapter | Import | Storage |
| --- | --- | --- |
| `useMultiFileAuthState` | root | one JSON file per key, inside a folder |
| `useSingleFileAuthState` | root | one JSON file |
| `useSqliteAuthState` | root | SQLite (`better-sqlite3`) |
| `useSqliteAuthState2` | root | SQLite, Elaina-compatible |
| `useMySQLAuthState` | root | MySQL / MariaDB |
| `usePostgresAuthState` | root | PostgreSQL |
| `useRedisAuthState` | root | Redis — works with `ioredis` or node-redis; both ship with the package |
| `useRedisAuthState2` | root | Redis — node-redis (`redis` v4+) only, explicit API |
| `useMongoAuthState` | root | MongoDB |
| `useMongoAuthState2` | root | MongoDB, Elaina-compatible |
| `useMongoFileAuthState` | root | MongoDB collection you pass in, `{ session }` namespaces the `_id`s |
| `useNekoDBAuth` | root | NekoDB (Elaina-compatible) |
| `useNedbAuthState` | root | NeDB via `@seald-io/nedb` — embedded, file or in-memory |
| `useTursoAuthState` | root | Turso / libSQL — `{ path }` for local, `{ url, authToken }` for cloud |

Every adapter accepts the same eight call shapes — positional, an options object, or any mix:

```ts
// the same eight shapes, shown on the PostgreSQL adapter
usePostgresAuthState(connectionString, table, session)
usePostgresAuthState({ connectionString, table, session })
usePostgresAuthState(connectionString)
usePostgresAuthState({ connectionString })
usePostgresAuthState(connectionString, { table, session })
usePostgresAuthState({ connectionString }, table, session)
usePostgresAuthState(connectionString, table, { session })
usePostgresAuthState(connectionString, { table }, session)
```

The first argument is always where the data lives — a filename, a folder, a dbPath, a url, a uri, a connection string,
or a live handle such as a pool, client or collection. The second is the next level down, when the backend has one: a
token, a collection, a table or a connection name. The third is the session, so several bots can share one database or
folder. Adapters without a middle level simply take the session in its place.

### Sessions in one database

All nine carry a `session` option: one database or folder can hold several bots, and each session only sees its own
keys. File-based adapters use a subfolder, database adapters use a key prefix.

```ts
const { state, saveCreds } = await useTursoAuthState({
	url: process.env.TURSO_URL,
	authToken: process.env.TURSO_TOKEN,
	session: 'bot-a'
})
```

### Moving credentials to another backend

Switching auth backends normally means scanning the QR code again. `migrateAuthState` copies the whole state —
credentials plus every signal key — so the device stays paired.

```ts
import { migrateAuthState, useMultiFileAuthState, usePostgresAuthState } from '@teamolduser/baileys'

const oldAuth = await useMultiFileAuthState('./auth')
const newAuth = await usePostgresAuthState({ pool, session: 'prod' })

const { creds, counts, verified } = await migrateAuthState({ from: oldAuth, to: newAuth })
// creds   : { copied: true, saved: true }
// counts  : { 'pre-key': 32, session: 14, … }
// verified: true
```

Pass the adapter objects and the destination's creds are saved for you. Pass bare states
(`{ from: oldAuth.state, to: newAuth.state }`) and call `newAuth.saveCreds()` yourself — the result then reports
`creds.saved: false`.

Records are streamed in batches (`batchSize`, default 100), so a large account is never held in memory. Re-running
after a crash resumes safely: existing ids are skipped (`skipExisting`, default true) and writes are upserts.
`verify` (default true) compares both id sets afterwards and reports mismatches in `warnings`.

The source is never modified. When you are happy with the copy, delete the old state yourself — and only after
`verified` came back true:

```ts
if (verified) {
	await oldAuth.clearAuth() // this session only; other bots in the same store keep theirs
}
```

Every adapter implements `list(type)`, so any of them can be the source — file, SQLite, Postgres, MySQL, Turso,
Redis, MongoDB, NekoDB or cache-manager. The deprecated `useSingleFileAuthStateLegacy` is the one exception.

## 📡 Handling events

```ts
sock.ev.on('messages.upsert', ({ messages, type }) => {})        // type: 'notify' | 'append'
sock.ev.on('messages.update', updates => {})
sock.ev.on('message-receipt.update', updates => {})
sock.ev.on('presence.update', ({ id, presences }) => {})
sock.ev.on('groups.upsert', groups => {})
sock.ev.on('groups.update', updates => {})
sock.ev.on('group-participants.update', update => {})
sock.ev.on('contacts.upsert', contacts => {})
sock.ev.on('contacts.update', updates => {})
sock.ev.on('chats.upsert', chats => {})
sock.ev.on('chats.update', updates => {})
sock.ev.on('connection.update', update => {})
sock.ev.on('creds.update', saveCreds)
sock.ev.on('call', calls => {})
```

## 💬 Sending messages

```ts
await sock.sendMessage(jid, { text: 'hello' })

await sock.sendMessage(jid, { image: { url: './photo.jpg' }, caption: 'hi' })
await sock.sendMessage(jid, { video: { url: './clip.mp4' }, gifPlayback: true })
await sock.sendMessage(jid, { audio: { url: './voice.ogg' }, ptt: true })
await sock.sendMessage(jid, { document: { url: './file.pdf' }, mimetype: 'application/pdf', fileName: 'file.pdf' })

await sock.sendMessage(jid, { react: { text: '👍', key: message.key } })
await sock.sendMessage(jid, { poll: { name: 'lunch?', values: ['a', 'b'], selectableCount: 1 } })
await sock.sendMessage(jid, { location: { degreesLatitude: 19.07, degreesLongitude: 72.87 } })
```

Extended content — buttons, lists, carousels, AIRich, albums, native flow, LaTeX — is in
the reference sections below and in `src/Extras`.

**Status update:**

```ts
await sock.sendMessage('status@broadcast', { text: 'hello' }, { statusJidList: [sock.user.id] })
```

## 👥 Groups

```ts

const group = await sock.groupCreate('My group', ['919999999999@s.whatsapp.net'])

const meta = await sock.groupMetadata(group.id)
console.log(meta.subject, meta.participants.length, meta.addressingMode)

await sock.groupParticipantsUpdate(group.id, ['918888888888@s.whatsapp.net'], 'add')      // add | remove | promote | demote

await sock.groupUpdateSubject(group.id, 'New subject')
await sock.groupUpdateDescription(group.id, 'What this group is for')
await sock.groupSettingUpdate(group.id, 'announcement')     // announcement | not_announcement | locked | unlocked
await sock.groupToggleEphemeral(group.id, 7 * 24 * 3600)    // disappearing messages, seconds
await sock.groupMemberAddMode(group.id, 'all_member_add')   // admin_add | all_member_add
await sock.groupJoinApprovalMode(group.id, 'on')            // on | off
```

Invites:

```ts

const code = await sock.groupInviteCode(group.id)
await sock.groupRevokeInvite(group.id)

const info = await sock.groupGetInviteInfo(code)
const joined = await sock.groupAcceptInvite(code)          // returns the group jid

await sock.groupLeave(group.id)
```

Join requests, when approval mode is on:

```ts

const pending = await sock.groupRequestParticipantsList(group.id)
await sock.groupRequestParticipantsUpdate(group.id, [pending[0].jid], 'approve')   // approve | reject
```

## 🏘️ Communities

```ts

const community = await sock.communityCreate('My community', 'Description')
await sock.communityCreateGroup('Group inside it', ['919999999999@s.whatsapp.net'], community.id)

const meta = await sock.communityMetadata(community.id)
const linked = await sock.communityFetchLinkedGroups(community.id)

await sock.communityLinkGroup(community.id, groupJid)
await sock.communityUnlinkGroup(community.id, groupJid)

await sock.communityParticipantsUpdate(community.id, [jid], 'add')
await sock.communityRequestParticipantsList(community.id)
await sock.communityRequestParticipantsUpdate(community.id, [jid], 'approve')

await sock.communityUpdateSubject(community.id, 'New name')
await sock.communityUpdateDescription(community.id, 'New description')
await sock.communityToggleEphemeral(community.id, 86400)
await sock.communitySettingUpdate(community.id, 'locked')
await sock.communityInviteCode(community.id)
await sock.communityRevokeInvite(community.id)
const joined = await sock.communityAcceptInvite(code)
await sock.communityLeave(community.id)
```

## 💬 Chats

`chatModify` covers archive, pin, mute and read state in one call:

```ts

await sock.chatModify({ archive: true, lastMessages: [] }, jid)
await sock.chatModify({ pin: true }, jid)
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)          // null unmutes
await sock.chatModify({ markRead: true, lastMessages: [message] }, jid)
await sock.chatModify({ clear: true }, jid)                        // clear messages, keep the chat
await sock.deleteChat(jid, message.key, message.messageTimestamp)  // remove the chat
```

```ts

await sock.star(jid, [{ id: message.key.id!, fromMe: true }], true)
const statuses = await sock.fetchStatus('919999999999@s.whatsapp.net')

const labels = await sock.addLabel(jid, { id: '1', name: 'VIP', color: 1, deleted: false })
await sock.addChatLabel(jid, '1')
await sock.addMessageLabel(message.key.id!, '1')
await sock.removeMessageLabel(message.key.id!, '1')
```

## 👤 Profile and privacy

```ts

await sock.updateProfileName('My bot')
await sock.updateProfileStatus('available')
await sock.updateProfilePicture(jid, { url: './avatar.jpg' })
await sock.removeProfilePicture(jid)
await sock.updateCoverPhoto({ url: './cover.jpg' })
await sock.updatePanoramaProfilePicture({ url: './pano.jpg' })

const url = await sock.profilePictureUrl(jid, 'image')   // 'preview' | 'image'
```

```ts

const privacy = await sock.fetchPrivacySettings(true)
await sock.updateLastSeenPrivacy('contacts')            // all | contacts | contact_blacklist | none
await sock.updateReadReceiptsPrivacy('all')             // all | none
await sock.updateOnlinePrivacy('match_last_seen')
await sock.updateStatusPrivacy('contacts')
await sock.updateGroupsAddPrivacy('contacts')
await sock.updateDefaultDisappearing(7 * 24 * 3600)
await sock.updateMessagesPrivacy('contacts')
await sock.updateCallPrivacy('contacts')
await sock.updateDisableLinkPreviewsPrivacy(true)
```

## 📇 Contacts and presence

```ts

const results = await sock.onWhatsApp('919999999999')          // [{ jid, exists }]
const users = await sock.onWhatsAppUsername({ username: 'someone' })

await sock.addOrEditContact('919999999999@s.whatsapp.net', { firstName: 'Someone' })
await sock.removeContact('919999999999@s.whatsapp.net')

await sock.updateBlockStatus(jid, 'block')                     // block | unblock
const blocked = await sock.fetchBlocklist()

await sock.presenceSubscribe(jid)
await sock.sendPresenceUpdate('composing', jid)                // composing | recording | paused | available | unavailable

const business = await sock.getBusinessProfile(jid)
await sock.updateBusinessProfile({ description: 'We sell things' })
```

## 📨 Message operations

```ts

await sock.readMessages([message.key])
await sock.sendReceipt(jid, undefined, [message.key.id!], 'read')

await sock.copyNForward(targetJid, message, true)              // forward with a fresh message id
await sock.sendRawMessage(buffer)                              // raw protobuf bytes
await sock.updateMediaMessage(message)                         // re-upload media, new URL

/** wait for the server's answer to a message you just sent */
const reply = await sock.waitForMessage(messageId, 30_000)

/** ask the server to re-send a message you could not decrypt */
await sock.requestPlaceholderResend(message.key)
```

## 🛍️ Business and catalog

```ts
await sock.productCreate({ name: 'Widget', price: 199900, currency: 'INR', isHidden: false })
await sock.productUpdate(productId, { price: 149900 })
await sock.productDelete([productId])

const catalog = await sock.getCatalog({ jid: businessJid, limit: 20 })
const collections = await sock.getCollections(businessJid)
const order = await sock.getOrderDetails(orderId, tokenBase64, businessJid)
```

## 📞 Calls

```ts

const call = await sock.offerCall(jid, false)                  // isVideo
await sock.acceptCall(call.id, call.from, false)
await sock.rejectCall(call.id, call.from)
await sock.terminateCall(call.id, call.to, call.from)
await sock.muteCall(call.id, call.from, call.to, true)
await sock.unmuteCall(call.id, call.from, call.to)
await sock.sendCallDuration(call.id, call.to, 12)

const link = await sock.createCallLink('video')                // 'audio' | 'video'
await sock.queryCallLink(link)
await sock.joinCallLink(link)
```

Incoming calls arrive on `sock.ev.on('call', calls => …)`.

## ✨ Rich content

Beyond plain media, the socket can send structured payloads:

```ts

await sock.sendList(jid, 'Pick one', ['first', 'second'])
await sock.sendMarkdown(jid, '# heading\n**bold** and *italic*')
await sock.sendCodeBlock(jid, 'console.log(1)', undefined, { language: 'js', title: 'example.js' })
await sock.sendTable(jid, 'Results', ['name', 'score'], [['a', '1'], ['b', '2']])
await sock.sendLatex(jid, quoted, { expressions: [{ latex: 'x^2' }] })
await sock.sendRichMessage(jid, [{ type: 'text', text: 'rich' }])
await sock.sendStickerPack(jid, { name: 'pack', stickers: [] })
await sock.sendGroupStatus(groupJid, { text: 'group status' })
```

## 🗄️ Data store

```ts
import { makeInMemoryStore } from '@teamolduser/baileys'

const store = makeInMemoryStore({})
store.bind(sock.ev)

sock.ev.on('messages.upsert', () => {
	console.log(store.messages['919999999999@s.whatsapp.net']?.array)
})
```

Persist it yourself — `store.writeToFile('store.json')` and `makeInMemoryStore({})` on start.

## 🔧 Raw access

```ts
const response = await sock.query({ tag: 'iq', attrs: { type: 'get', xmlns: 'w:p' }, content: [] })
await sock.sendNode({ tag: 'presence', attrs: { type: 'available' }, content: [] })

await sock.logout('bye')       // unlinks the device and closes the socket
```

## 🪪 WhatsApp IDs: JID, PN, LID

| Term | Meaning |
| --- | --- |
| **JID** | `number@s.whatsapp.net` (user) or `id@g.us` (group) |
| **PN** | phone-number JID — the classic form |
| **LID** | linked-ID JID (`…@lid`) — an opaque id newer chats are addressed by |

Newer contacts arrive as `@lid`, and the phone number has to be recovered from the local mapping store. When a message
carries no `*_pn` attribute, this package resolves it from that store rather than leaving an unresolvable sender
(upstream PR #2744).

```ts
const pn = await sock.signalRepository.getStoredLIDForPN('919999999999')
```

## ⚙️ Socket config

The full list is in `src/Types/Socket.ts`. The ones that differ from stock Baileys:

| Option | Default | What it does |
| --- | --- | --- |
| `passiveLogin` | `false` | Send `passive: true` in the login node (upstream behaviour). Flip it to compare the two on one account |
| `allowCustomEndpoint` | `false` | Permit a non-WhatsApp `waWebSocketUrl` (localhost and a proxy you control only) |
| `cachedGroupMetadata` | — | Reuse group metadata instead of refetching on every send |
| `qrTimeout` | `60000` | How long one QR lives |
| `getMessage` | — | Retry-message lookup for decryption failures |

## 🎨 MessageBuilder, AIRich and webview

`MessageBuilder` (ported from elaina-baileys) builds interactive payloads without hand-writing protobuf:

```ts
import { MessageBuilder } from '@teamolduser/baileys'

const mb = new MessageBuilder()
	.text('pick one')
	.button({ name: 'yes', id: 'yes' })
	.button({ name: 'no', id: 'no' })

await sock.sendMessage(jid, mb.build())
```

`webView` renders an HTML page inside WhatsApp. It sits on the socket under three names, so you never pass the socket
back in:

```ts
await sock.webView(jid, { html: '<h1>hello</h1>', title: 'Order status' })
await sock.web(jid, { html: '<h1>hello</h1>' })             // same method
await sock.sendHtmlWebview(jid, { html: '<h1>hello</h1>' })  // the name it shipped under first
```

The standalone form still works for code that already holds the socket:

```ts
import { webView } from '@teamolduser/baileys'

await webView(sock, jid, { html: '<h1>hello</h1>', title: 'Order status' })
```

The Elaina export name `Carousel` is `AIRichCarousel` here (also `CarouselV2`), because `Carousel` is already a message
type.

## 📰 Newsletters — channels

55 methods on `sock.newsletter` — create, update, mute, follow, react, fetch messages, admin requests, insights,
directory search. 

```ts
const meta = await sock.newsletterMetadata('jid', '120363000000000000@newsletter')
await sock.newsletterFollow('120363000000000000@newsletter')
await sock.newsletterReactMessage(jid, serverId, '👍')
```

## 📞 VoIP

Call signalling, call state, screen sharing and group calls. Diagnostics helper:

```ts
import { voipDiagnostics } from '@teamolduser/baileys'

voipDiagnostics.logFile = './voip-debug.log'   // opt-in: nothing is written by default
```

## 🧩 Extras and Addons

Beyond the socket API, the package ships two folders of extras. Everything below is exported from the package root.

**`src/Extras`** — features ported from other Baileys forks (each file names its source in the header).

| Module | Gives you | Reach for it when |
|---|---|---|
| `messages-extras` | `makeMessagesExtras` — association types, sender-key memory summaries | you need the ported message helpers |
| `messages-helpers` | `trimEmptyValues`, `songThumbnail`, `prepareLinkThumbnail` | building message payloads by hand |
| `modern-messages` | `makeQuestionMessage`, `makeQuestionResponseMessage`, status notification types | polls-with-questions, modern content |
| `newsletter-extras` | `makeNewsletterExtras` — admin invites, followers, insights, directory, reports, labels | running a channel |
| `newsletter-status` | `getNewsletterStatusMediaType`, `NEWSLETTER_SERVER_ID_MIN` / `MAX` | posting channel statuses |
| `newsletter-status-socket` | `makeNewsletterStatusExtras` — send / react / revoke / fetch statuses | status work on a channel |
| `chats-extras` | `makeChatsExtras` — query ids, paths, spam flows | chat-level operations not on the socket |
| `status-stickers` | `stickerArea`, `StatusLinkType`, sticker defaults | posting sticker statuses |
| `payment-messages` | `buildSplitPayment`, `buildPaymentReminder`, `money`, `readSplitPayment` | payments and reminders |
| `scheduled-message` | `encodeScheduledMessage`, `decodeScheduledMessage`, reveal keys | scheduled messages at the proto level |
| `sender-key-memory` | `pickSenderKeyRecipients`, `senderKeyResetSummary` | group fan-out debugging |
| `group-metadata-cache` | `isUsableGroupMetadata`, `describeUnusableGroupMetadata` | deciding whether cached metadata is still good |
| `link-preview-metadata` | `buildSocialPreview`, `readSocialPreview`, `videoEndCard` | rich link previews |
| `native-flow` | `NATIVE_FLOW_NAMES`, `buttonLimitFor`, `isWebSupportedButtonName` | native-flow interactive messages |
| `html-app` | `HTML_APP_BYTE_BUDGET`, `HTML_APP_MESSAGE_CEILING`, `checkHtmlApp` | sizing an HTML webview app |
| `html-multiplayer` | `withHtmlMultiplayer`, `htmlMultiplayerPrelude` | multiplayer webview apps |
| `voice-recognition` | `matchVoiceWakePhrase`, `normalizeVoiceText` | wake-word handling |
| `optional-media` | `loadSharp`, `loadFfmpeg`, `hasOptionalMedia` | media work without a hard dependency |
| `ttl-cache` | `TTLCache` — in-memory cache with expiry | caching anything per key |
| `auth-store` | `makeAuthStateFromStore`, `encodeAuthValue`, `decodeAuthValue` | writing your own auth backend |
| `socket` | `makePortedSocket`, `bindMessageBuilder` | wiring the ported pieces onto a socket |

**`src/Addons`** — smaller, self-contained helpers.

| Module | Gives you | Reach for it when |
|---|---|---|
| `anti-delete` | `MessageStore`, `isDeleteMessage`, `getDeletedMessageKey` | keeping a copy of deleted messages |
| `auto-reply` | `createAutoReply`, `AutoReplyHandler` | rules-based replies |
| `message-scheduler` / `scheduling` | `scheduleMessage`, `scheduleMessageAfter`, `createMessageScheduler` | sending later |
| `message-search` | `searchMessages`, `searchMessagesRegex`, `extractMessageText` | searching a chat history |
| `templates` | `createTemplateManager`, `PRESET_TEMPLATES` | reusable message templates |
| `chat-control` / `disappearing` | `createTypingIndicator`, `DISAPPEARING_DURATIONS`, `normalizeDisappearingDuration` | typing state, disappearing timers |
| `presence-monitor` | `monitorPresence`, `createPresenceTracker`, `setDefaultTimezone` | online/offline tracking |
| `button-sender` / `interactive-message` | `buildInteractiveButtons`, `generateInteractiveListMessage`, validators | building interactive payloads |
| `native-flow-interactive` | `convertNativeFlowButtons`, `buildNativeFlowMessageParamsJson` | native-flow payloads |
| `stickerpack` | `buildStickerPackProto`, `convertToWebP`, `generateStickerPackId` | sticker packs |
| `vcard` | `generateVCard`, `parseVCard`, `escapeVCard` | contact cards |
| `jid-plot` / `jid-plotting` / `lid-support` | `plotJidPair`, `parseJid`, `splitJidsByType`, `resolvePnJid` | PN/LID juggling |
| `media-set` / `media-messages` | `updateProfilePictureFull`, `changeprofileFull`, `generateProfilePictureFull` | setting avatars in full quality |
| `resize-image` / `image-processing` | `resizeImage`, `getImageProcessingLibrary`, `clearImageProcessingLibraryCache` | resizing, and detecting sharp/ffmpeg |
| `group-status-v2` / `send-group-status-v2` | `GroupStatusV2`, `sendGroupStatusV2` | group statuses |
| `status-posting` / `status-helpers` | `STATUS_BROADCAST_JID`, `STATUS_BACKGROUNDS`, `STATUS_FONTS` | posting a status with styling |
| `call-handler` / `from-messages-recv` | `makeCallHandlerAddon`, `makeCallHandlers` | reacting to calls |
| `raw-message` | `buildRawMessageContent`, `RAW_MODE_HELPER_KEYS` | sending hand-built protos |
| `message-utils` | `getMessageType`, `getMediaType`, `getButtonType` | classifying a message |
| `from-chats` | `createChatHelpers`, `buildClearMessageModification` | the ported chat helpers |
| `from-messages` | `buildAdminInviteMessage`, `buildCallMessage`, `buildPaymentInviteMessage` | ported message builders |
| `from-messages-send` | `normalizeStatusContent`, `buildStatusMentionNode`, `execSendStatusMentions` | status mentions on send |
| `send-group-v4-invite` | `sendGroupV4Invite`, `sendGroupInvite` | inviting into a group |
| `newsletter-role-updates` | `emitNewsletterRoleUpdate` | reacting to channel role changes |
| `message-composer` | `CPP_KEYWORDS`, `JS_KEYWORDS`, … keyword sets for code blocks | syntax-highlighted code messages |
| `bot-forwarded-message` / `rich-message-utils` | `toUnified`, bot metadata signature helpers | bot-forwarded content |
| `baileys-event-stream` | `captureEventStream`, `readAndEmitEventStream` | replaying events |
| `pairing-fix` | `createPairingQueue` | serialising pairing attempts |
| `browser-presets` | `androidBrowserPreset`, `getPlatformDisplayName` | browser fingerprints |
| `find-user-id` | `findUserId` | resolving a user id |
| `past-participants` | `processPastParticipants` | reading old group members |
| `link-preview-extras` | `applyLinkPreviewMetadata` | thumbnail metadata |
| `mathjax` | `getMathJax`, `convertLatexToPng`, `convertLatexToSvg` | LaTeX rendering |
| `use-cache-manager-auth-state` | `useCacheManagerAuthState` | any cache-manager v5 store as the auth backend |
| `use-sqlite-auth-state` | `useSqliteAuthState` | SQLite via a pre-existing handle |

A one-file example for each of these lives in `Example/`, and the full reference is in [`docs/wiki/`](../docs/wiki/).

## 🔗 Links

The deep reference lives in [`docs/wiki/`](../docs/wiki/), one page per topic — the same split upstream keeps on its wiki:

| Page | What is in it |
| --- | --- |
| [Auth state adapters](../docs/wiki/auth-state.md) | every adapter, its options, `session`, `clearAuth`, `close` |
| [Store APIs](../docs/wiki/store.md) | `makeInMemoryStore`, ordered dictionary, chat/message keys |
| [Newsletter / channels](../docs/wiki/newsletter.md) | all 55 newsletter methods, query ids, endpoint allowlist |
| [Socket methods](../docs/wiki/socket-methods.md) | account, chat and message helper methods |
| [Message content](../docs/wiki/message-content.md) | every content key and every message type |
| [MessageBuilder and AIRich](../docs/wiki/messagebuilder.md) | buttons, carousels, rich responses, bot signature |
| [VoIP](../docs/wiki/voip.md) | call signalling, diagnostics, call timelines |
| [In-app HTML webview](../docs/wiki/webview.md) | `webView` payload and options |
| [Calls, queues and screen sharing](../docs/wiki/calls.md) | group calls, queue handling |
| [Native flow payloads](../docs/wiki/native-flow.md) | raw native-flow examples without the builders |
| [V2 interactive names](../docs/wiki/interactive-v2.md) | the 222 `…V2` aliases and where they come from |
| [Account health signals](../docs/wiki/account-health.md) | reachout timelock, new-chat caps, enforcement |
| [Live testing](../docs/live-test.md) | checking the risky paths on a real account |

- **Documentation site** — <https://teamolduser.github.io/Baileys/> (built from `docs/`, published to the `web` branch)
- **Wiki source** — [`docs/wiki/`](../docs/wiki/README.md), the same content as plain markdown

Other entry points:

- [`Example/example.ts`](../Example/example.ts) — a runnable bot skeleton
- [`SECURITY.md`](../SECURITY.md) — how to report a vulnerability
- [`docs/en/`](../docs/en/) — per-feature guides

## 🙏 Credits

### This fork

Anya Baileys is maintained by [Teamolduser](https://github.com/Teamolduser). Bug reports and pull requests go to
[Teamolduser/Baileys](https://github.com/Teamolduser/Baileys).

### Upstream

Built on [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) — the Multi-Device socket, the proto
definitions and the crypto layer are theirs. MIT licensed, notices preserved.

### Forks whose work is ported here

| Fork | What came from it |
|---|---|
| [rexxzyid/Elaina-baileys](https://github.com/rexxzyid/Elaina-baileys) | the auth adapters, payment messages, modern content builders, newsletter extras |
| [itsliaaa/baileys](https://github.com/itsliaaa/baileys) | newsletter query ids, channel helpers |
| [innovatorssoft/baileys](https://github.com/innovatorssoft/baileys) | MessageBuilder pieces, cache-manager auth, status helpers |
| [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) | the base socket, `auth-utils`, store |

Every ported file names its source and licence in its header, and `src/Extras/index.ts` keeps the list in one place.

### Third-party packages

`libsignal` (Teamolduser build), `@hapi/boom`, `async-mutex`, `pino`, `qrcode-terminal`, `@cacheable/node-cache`,
`@seald-io/nedb`, and the database drivers listed under [Install](#-install). Each keeps its own licence.

### Thanks

To everyone who filed an issue with a reproducible case — the fixes for wrapper keys, retry behaviour and the pairing
queue all came from reports like those.


## 📖 Full reference

Everything below is the deep reference, written out in full so you do not have to leave this file. The same material is
published as separate pages under [`docs/wiki/`](../docs/wiki/) for the documentation site — this section is maintained by
hand alongside it, so if you change one, change the other.

### Auth state adapters

Every adapter accepts the same eight call shapes — positional, an options object, or any mix:

```ts
// the same eight shapes, shown on the PostgreSQL adapter
usePostgresAuthState(connectionString, table, session)
usePostgresAuthState({ connectionString, table, session })
usePostgresAuthState(connectionString)
usePostgresAuthState({ connectionString })
usePostgresAuthState(connectionString, { table, session })
usePostgresAuthState({ connectionString }, table, session)
usePostgresAuthState(connectionString, table, { session })
usePostgresAuthState(connectionString, { table }, session)
```

The first argument is always where the data lives — a filename, a folder, a dbPath, a url, a uri, a connection string,
or a live handle such as a pool, client or collection. The second is the next level down, when the backend has one: a
token, a collection, a table or a connection name. The third is the session, so several bots can share one database or
folder. Adapters without a middle level simply take the session in its place.



[← back to the README](../README.md)

### Database auth states

```ts
import makeWASocket, { usePostgresAuthState, useMySQLAuthState, useRedisAuthState, useNekoDBAuth, useTursoAuthState } from '@teamolduser/baileys'

// PostgreSQL (`pg` is installed with the package) - pass a connectionString / config, or your own Pool
// `url` is accepted everywhere a uri or connectionString is, so `{ url: process.env.DATABASE_URL }` also works
const { state, saveCreds, clearAuth, close } = await usePostgresAuthState({ connectionString: process.env.DATABASE_URL, session: 'bot-1' })
// MySQL / MariaDB (`mysql2` is installed with the package)
const mysql = await useMySQLAuthState({ uri: 'mysql://user:pass@host/db', table: 'baileys_auth', session: 'bot-1' })
// Redis - one hash per key type: <prefix>:<session>:<type>
// `useRedisAuthState` speaks both clients and loads whichever package is installed (`ioredis` ships with the package,
// `redis` is yours to add). `useRedisAuthState2` is the node-redis-only variant: same layout, explicit API.
const redis = await useRedisAuthState({ uri: 'redis://localhost:6379', session: 'bot-1' })
// `url` is the same option — handy when the value comes from REDIS_URL
const redisFromEnv = await useRedisAuthState({ url: process.env.REDIS_URL, session: 'bot-1' })
const redis2 = await useRedisAuthState2({ uri: 'redis://localhost:6379', session: 'bot-2' })

// or bring your own client - both accept one, and neither closes a client it did not create
const ioredis = new Redis('redis://localhost:6379')
await useRedisAuthState({ client: ioredis })
const nodeRedis = createClient({ url: 'redis://localhost:6379' })
await nodeRedis.connect()
await useRedisAuthState2({ client: nodeRedis })
// NekoDB - pass a connected NekoDB instance
const neko = await useNekoDBAuth(db, 'baileys_auth')
// Turso / libSQL - local file, or Turso cloud with a token
const tursoLocal = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })
const tursoCloud = await useTursoAuthState({ url: 'libsql://my-db-myorg.turso.io', authToken: process.env.TURSO_TOKEN, session: 'bot-1' })

const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

- The MongoDB (`mongodb`), MySQL/MariaDB (`mysql2`), PostgreSQL (`pg`), SQLite (`better-sqlite3`), Turso (`@libsql/client`) and Redis (`ioredis` **and** `redis`) drivers are declared as runtime dependencies, so the package manager installs them automatically. They are loaded only when the corresponding adapter is used. NekoDB still expects you to pass an already connected database instance.
- `session` is supported by **every** adapter — multi-file (subfolder), single-file and mongo-file (key prefix), and
  every database adapter (prefix or table suffix). `useMongoFileAuthState(collection, { session })` prefixes the
  document `_id`s with `<session>:`, so several bots can share one collection.
- `session` lets several bots share one backend — a table, a Redis prefix, a folder or a file. Every adapter takes it
  now, including the file-based ones (`useMultiFileAuthState(folder, { session })`, `useSingleFileAuthState(file, { session })`);
  see sessions across the file-based adapters. `clearAuth()`
  deletes only that session, `close()` closes a connection the helper created itself (a pool / client you passed in is
  never closed).
- Writes are transactional (PostgreSQL / MySQL) or `MULTI` (Redis). Table names must be plain identifiers.
- `makeAuthStateFromStore(store)` builds the same thing on top of any key/value store that implements `AuthStore`.

### MongoDB Auth State 2 (`useMongoAuthState2`)

`useMongoAuthState2` is the Elaina-compatible MongoDB adapter added without changing the existing `useMongoAuthState` API. The `mongodb` driver is declared as a runtime dependency and is installed automatically with the package. Create a MongoDB-backed auth state from a URI:

```ts
import makeWASocket, { useMongoAuthState2 } from '@teamolduser/baileys'

const auth = await useMongoAuthState2({
  uri: process.env.MONGODB_URI!,
  dbName: 'whatsapp',
  collectionName: 'baileys_auth',
  session: 'bot-1'
})

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// On an intentional logout/reset, this deletes only the selected session.
// await auth.clearAuth()

// Call only when this auth-state instance is no longer needed.
// Since the adapter created the client from `uri`, close() closes that client.
// await auth.close()
```

You can instead pass an existing MongoDB `client`, `db`, or `collection`; those resources remain caller-owned and `close()` will not close them. Use the same `session` string to resume a bot and a different string for each independent bot sharing the collection. `clearAuth()` is destructive for that session. The adapter creates a unique `{ session, type, id }` index and uses batched reads plus `bulkWrite` for key updates/removals.

### SQLite Auth State 2 (`useSqliteAuthState2`)

`useSqliteAuthState2` is a separate Elaina-compatible SQLite adapter. The existing `useSqliteAuthState` remains unchanged. This adapter adds `clearAuth()` and `close()` lifecycle methods.

```ts
import makeWASocket, { useSqliteAuthState2 } from '@teamolduser/baileys'

const auth = await useSqliteAuthState2({ dbPath: './auth.db' })
const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Destructive: clears auth rows from the `creds` and `signal_keys` tables.
// await auth.clearAuth()

// Closes the database only when the adapter opened it from dbPath.
await auth.close()
```

To reuse an existing `better-sqlite3` connection, pass `{ database: db }`. The adapter will not close a caller-owned database handle. The adapter uses the Elaina-compatible `creds` and `signal_keys` schema. `better-sqlite3` is already a dependency of this package.

---

### Turso / libSQL Auth State (`useTursoAuthState`)

One adapter for both shapes Turso offers, because `@libsql/client` speaks the same protocol for each:

| Target | What to pass | Resulting URL |
| --- | --- | --- |
| Local file | `{ path: './auth.db' }` | `file:./auth.db` |
| Turso cloud | `{ url: 'libsql://<db>-<org>.turso.io', authToken: '…' }` | used as given |
| Explicit | `{ url: 'file:./auth.db' }` | used as given |

```ts
import makeWASocket, { useTursoAuthState } from '@teamolduser/baileys'

// local database file — no account, no token
const auth = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Turso cloud
const cloud = await useTursoAuthState({
    url: 'libsql://my-db-myorg.turso.io',
    authToken: process.env.TURSO_TOKEN,
    session: 'bot-1'
})

// Destructive: removes every row of this session
// await auth.clearAuth()

// Closes the client only when the adapter created it
await auth.close()
```

- A token is only sent when you supply one, so the local file needs neither an account nor a token.
- `session` lets several bots share one database; `table` (default `baileys_auth`) names the table. Rows are
  `(session, type, id, value)` with a composite primary key.
- `apply()` runs through `client.batch(…, 'write')`, so an app-state patch lands in one transaction.
- `@libsql/client` is a declared runtime dependency but is loaded lazily — a bot that never uses Turso does not touch it.
- `toLibsqlUrl({ path })` is exported if you want to resolve the URL yourself before calling.

---

### Migrating between adapters

`migrateAuthState` copies creds and every signal key record from one adapter to another, so the device stays paired and
no QR scan is needed.

```ts
import { migrateAuthState } from '@teamolduser/baileys'

const from = await useMultiFileAuthState('./auth')
const to = await usePostgresAuthState({ pool, session: 'prod' })

const result = await migrateAuthState({ from, to })
```

`from` and `to` each accept either the adapter object or the bare `.state`. Passing the adapter lets the migrator call
`saveCreds()` for you; with a bare state you must call it yourself.

| Option | Default | Meaning |
|---|---|---|
| `batchSize` | `100` | records buffered between a `list` pull and a `set` push |
| `skipExisting` | `true` | skip ids already on the destination, so a partial run resumes |
| `verify` | `true` | re-enumerate both sides afterwards and compare id sets |
| `logger` | — | receives `info` / `warn` progress lines |

Result:

```ts
{
	creds: { copied: true, saved: true },
	counts: { 'pre-key': 32, session: 14, 'app-state-sync-key': 3 },
	verified: true,
	warnings: []
}
```

The source is never modified. Listing bypasses the cache layer, so the durable content is what gets copied.

#### Which adapters can be a source?

All of them — each implements `list(type)`:

| Adapter | How it enumerates |
|---|---|
| multi-file | scans the session folder |
| single-file | scans the JSON keys |
| sqlite / sqlite2 | `SELECT id, value FROM signal_keys` |
| Postgres / MySQL / Turso | paged `SELECT`, 500 rows at a time |
| Redis / Redis2 | `HGETALL <prefix>:<session>:<type>` |
| mongo / mongo-file | `find({ session, type })` |
| NekoDB | `findMany` plus a key prefix |
| NeDB (`@seald-io/nedb`) | `find` on the `k` prefix |
| cache-manager | `keys()` plus a key prefix |

`useSingleFileAuthStateLegacy` is the exception: it is a byte-for-byte upstream reference kept for parity and is
deprecated — migrate *away* from it by first opening the same file with `useSingleFileAuthState`.

#### Clearing the old auth afterwards

The migrator does not delete anything on the source. That is deliberate: if verification fails you would lose your
only copy.

Clear it yourself, and only once `verified` came back true:

```ts
const result = await migrateAuthState({ from: oldAuth, to: newAuth })

if (result.verified) {
	await oldAuth.clearAuth()
} else {
	console.warn('not verified — keeping the old state', result.warnings)
}
```

| Adapter | How to clear |
|---|---|
| multi-file | `clearAuth()` — removes that session's `.json` files |
| single-file | `clearAuth()` — removes that session's keys from the shared file |
| sqlite2, Postgres, MySQL, Turso, Redis, Redis2, mongo2, NekoDB | `clearAuth()` — deletes only this session's rows |
| cache-manager | `clearState()` (the name differs) |
| mongo-file | no `clearAuth()` — delete the documents from the collection yourself |

Take a backup first — `cp -r ./auth ./auth.bak`, or a database dump. Clearing is not reversible, and clearing the
wrong session costs another QR scan.

_Also published at [docs/wiki/auth-state.md](../docs/wiki/auth-state.md)_

### Auth adapter examples

Every adapter returns an `AuthenticationState` for `makeWASocket`, plus a way to persist the credentials:

```ts
import makeWASocket from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth') // or any adapter below
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

### How the arguments line up

Every adapter is called the same way: the location first, then the next level down where the backend has one, then the
session. Each of those three can also arrive inside an options object.

| Position | What goes there | Examples |
| --- | --- | --- |
| location | where the data lives | filename, folder, `dbPath`, `url`, `uri`, `connectionString`, or a live pool / client / collection |
| second level | only where the backend has one | token, collection, table, connection name |
| session | which bot's data this is | `'bot-1'`, `'bot-a'` |

```ts
await useMultiFileAuthState('./auth')                                  // location only
await useMultiFileAuthState({ foldername: './auth', session: 'bot-a' }) // options object
await usePostgresAuthState(connectionString, table, session)           // all three, positional
await usePostgresAuthState({ connectionString, table, session })       // all three, options object
```

---

### One positional argument

Where the data lives, and nothing else.

#### `useSingleFileAuthStateLegacy(filename)`

**Deprecated.** Byte-for-byte upstream: synchronous, no debounce, no atomic swap. Returns `{ state, saveState }` —
`saveState`, not `saveCreds`, and it is not async.

```ts
const { state, saveState } = useSingleFileAuthStateLegacy('./auth.json')
saveState()
```

---

### Argument order

Every adapter takes its arguments positionally: where the data lives, then the next level down where the backend has
one (a collection, a table, a connection name), then the session. An options object works anywhere a positional one
does — `useXAuthState({ uri, table, session })` is the same call as `useXAuthState(uri, table, session)`.

#### `useMultiFileAuthState(foldername, { session })`

First argument: the folder. The session becomes a subfolder. One JSON file per key type.

```ts
const { state, saveCreds, clearAuth } = await useMultiFileAuthState('./auth')
const botB = await useMultiFileAuthState('./auth', { session: 'bot-b' }) // ./auth/bot-b/
```

#### `useSingleFileAuthState(filename, { session })`

First argument: the file. Debounced (3 s) atomic writes; `flush()` writes now.

```ts
const { state, saveCreds, flush, clearAuth } = await useSingleFileAuthState('./auth.json')
await saveCreds()
await flush() // before shutdown
```

#### `useMongoFileAuthState(collection, { session })`

First argument: the collection object itself; the session is the second. Also exported as `useMongoAuthState`.

```ts
const collection = client.db('bot').collection('baileys_auth')
const { state, saveCreds } = await useMongoFileAuthState(collection, { session: 'bot-a' })
```

#### `useNekoDBAuth(db, collectionname, { session })`

Takes the connected NekoDB instance, then the collection name, then the session. Positional only — it does not take
an options object.

```ts
const { state, saveCreds, clearAuth } = await useNekoDBAuth(db, 'baileys_auth', { session: 'bot-a' })
```

#### `useCacheManagerAuthState(store, sessionname)`

Takes a cache-manager v5 store (`set` / `get` / `del` / `keys`), then the session name as a plain string.
Clearing is `clearState`, not `clearAuth`.

```ts
const { state, saveCreds, clearState } = await useCacheManagerAuthState(cache, 'bot-a')
```

---

### Options object with just the location

#### `useSqliteAuthState({ dbpath })`

Takes a `dbPath`, or an existing `database` handle instead.

```ts
const { state, saveCreds } = await useSqliteAuthState({ dbPath: './auth.db' })
```

---

### Options object with every level

Where it lives, then the token / table / collection, then the session.

#### `useSqliteAuthState2({ dbpath, session })`

Takes a `dbPath` (alias `path`) or an existing `database`, then the session.

```ts
const { state, saveCreds, clearAuth, close } = await useSqliteAuthState2({
	dbPath: './auth.db',
	session: 'bot-a'
})
```

#### `usePostgresAuthState({ connectionstring, table, session })`

Takes a `connectionString` (or its alias `url`, or a `pool` / `config`), then the table, then the session.

```ts
const { state, saveCreds, close } = await usePostgresAuthState({
	connectionString: process.env.DATABASE_URL,
	table: 'baileys_auth',
	session: 'bot-a'
})
```

#### `useMySQLAuthState({ uri, table, session })`

Takes a `uri` (or its alias `url`, or a `pool` / `config`), then the table, then the session.

```ts
const { state, saveCreds, close } = await useMySQLAuthState({
	uri: process.env.MYSQL_URL,
	table: 'baileys_auth',
	session: 'bot-a'
})
```

#### `useTursoAuthState({ url, token, table, session })`

Takes a `url` for a cloud database, or a `path` for a local file; then the `authToken` / table, then the session.

```ts
const local = await useTursoAuthState({ path: './auth.db', session: 'bot-a' })

const cloud = await useTursoAuthState({
	url: process.env.TURSO_URL, // libsql://my-db-myorg.turso.io
	authToken: process.env.TURSO_TOKEN,
	session: 'bot-a'
})
```

#### `useRedisAuthState({ uri, session })`

Takes a `uri` (or its alias `url`, or an existing `client`), then the session. `prefix` defaults to `baileys_auth`.
Speaks `ioredis` and node-redis — commands are looked up by name.

```ts
const { state, saveCreds } = await useRedisAuthState({
	uri: 'redis://localhost:6379', // or { url: process.env.REDIS_URL }
	session: 'bot-a'
})
```

#### `useRedisAuthState2({ url, session })`

The node-redis-only variant. Same key layout, so you can swap it with `useRedisAuthState` without migrating.

```ts
const { state, saveCreds, close } = await useRedisAuthState2({
	url: process.env.REDIS_URL,
	session: 'bot-a',
	closeClient: true // also close a client you passed in
})
```

#### `useMongoAuthState(...)` — one name, both shapes

`useMongoAuthState` is the name every fork exports, and it takes both forms:

```ts
// a connection: a bare string, { uri } or { url } — this is useMongoAuthState2 underneath
await useMongoAuthState('mongodb://user:pass@host/db')
await useMongoAuthState({ uri: process.env.MONGO_URL, collectionName: 'baileys_auth', session: 'bot-1' })
await useMongoAuthState('mongodb://…', 'baileys_auth', 'bot-1')

// an existing collection: the original Anya adapter (no clearAuth / close, it never owns a client)
await useMongoAuthState({ collection })
```

A string, or a bag with `uri` / `url`, is a connection; anything carrying a `collection` is a handle.

#### `useMongoAuthState2({ uri, collectionName, session })`

Takes a `uri` (or its alias `url`, or a `collection` / `db` / `client`), then the collection name (`dbName` goes
with it), then the session.

```ts
const { state, saveCreds, clearAuth, close } = await useMongoAuthState2({
	uri: process.env.MONGO_URL, // `url` works too, and so does a bare string: useMongoAuthState2('mongodb://…')
	dbName: 'bot',
	collectionName: 'baileys_auth',
	session: 'bot-a'
})
```

---

### Return shapes

Most adapters return `{ state, saveCreds, clearAuth, close }`. The exceptions:

| Adapter | Differs how |
|---|---|
| `useMultiFileAuthState` | no `close` (nothing to close) |
| `useSingleFileAuthState` | adds `flush()` and an alias `saveState` |
| `useSingleFileAuthStateLegacy` | sync, returns `{ state, saveState }` only |
| `useMongoFileAuthState` | returns `{ state, saveCreds }` — no `clearAuth` |
| `useNekoDBAuth` | `clearAuth()` drops the whole collection |
| `useCacheManagerAuthState` | `clearState()` instead of `clearAuth()` |
| `useSqliteAuthState` | returns `{ state, saveCreds }` |

### Sharing one backend between bots

Every adapter takes `c` (session). Omit it (or pass `'default'`) and the layout stays exactly as it was, so existing
deployments do not move.

```ts
const botA = await usePostgresAuthState({ pool, session: 'shop' })
const botB = await usePostgresAuthState({ pool, session: 'support' })
```

### Moving between adapters later

`migrateAuthState` copies creds and every signal key, so switching backends does not need another QR scan. See
[auth-state.md](auth-state.md#migrating-between-adapters).

_Also published at [docs/wiki/auth-examples.md](../docs/wiki/auth-examples.md)_

### Store APIs

[← back to the README](../README.md)

### Store APIs at the package root

The existing in-memory store is available from the package root. It subscribes to socket events when bound and keeps an in-memory view of chats, contacts, messages, groups, presences, and labels. It is not a durable database by itself.

```ts
import makeWASocket, {
  makeInMemoryStore,
  makeOrderedDictionary,
  ObjectRepository,
  useMultiFileAuthState
} from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth')
const sock = makeWASocket({ auth: state })
const store = makeInMemoryStore({})
store.readFromFile('./baileys-store.json')
store.bind(sock.ev)

sock.ev.on('creds.update', saveCreds)
// Persist on your own chosen cadence or during graceful shutdown.
store.writeToFile('./baileys-store.json')

// Useful store lookups:
const message = await store.loadMessage('12345@s.whatsapp.net', 'MESSAGE_ID')
const latest = await store.mostRecentMessage('12345@s.whatsapp.net')
const group = await store.fetchGroupMetadata('GROUP_ID@g.us', sock)

// A small ordered dictionary keyed by an item's id:
const recent = makeOrderedDictionary<{ id: string; text: string }>(item => item.id)
recent.upsert({ id: 'm1', text: 'hello' }, 'append')
console.log(recent.get('m1'), recent.array)

// Generic in-memory repository for entities with string ids:
const labels = new ObjectRepository<{ id: string; name: string }>()
labels.upsertById('label-1', { id: 'label-1', name: 'Important' })
console.log(labels.findById('label-1'), labels.findAll())
```

`store.readFromFile()` / `writeToFile()` are synchronous JSON helpers. Protect the file appropriately and prefer a database-backed store if you need durability, concurrent writers, or large histories.

_Also published at [docs/wiki/store.md](../docs/wiki/store.md)_

### Socket methods

[← back to the README](../README.md)

### Account and chat methods

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

### Message helpers

```ts
await sock.sendHD(jid, { image: { url: './photo.jpg' }, caption: 'HD' })        // SD message + linked HD child (image or video)
await sock.sendImgVid(jid, { image: { url: './a.jpg' }, video: { url: './a.mp4' }, caption: 'motion photo' })
await sock.removeMemberLabel(groupJid)                                           // = updateMemberLabel(groupJid, '')
await sock.resetGroupSenderKey(groupJid)                                         // { jid, cleared, devices } - redistributes the sender key
await sock.groupQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])   // raw w:g2 IQ, + communityQuery
await sock.executeWMexQuery({ newsletter_id: jid }, queryId, 'xwa2_newsletter_admin')       // raw WMex query
```

_Also published at [docs/wiki/socket-methods.md](../docs/wiki/socket-methods.md)_

### Message content

[← back to the README](../README.md)

### New message content keys

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

#### Example commands

`assets/examples/example.js`: `!question`, `!comment`, `!addyours`, `!splitpay`, `!remind`, `!hd`, `!motion`, `!health <number>`, `!about <number>`,
`!serverprops`, `!serverlink <url>`, `!nlinfo <channel jid>`, `!nldirectory <text>`, `!nlstatus <channel jid> <text>`, `!resetkey` (group).

_Also published at [docs/wiki/message-content.md](../docs/wiki/message-content.md)_

### MessageBuilder and AIRich

[← back to the README](../README.md)

### MessageBuilder / AIRich

```ts
import { MB, MessageBuilder, AIRich, Button, sendA2UI, sendHtmlApp, sendAIRichMessage, readRichMessage, verifyRichResponseSignature, forwardRichResponse } from '@teamolduser/baileys'

await new Button(sock).setTitle('Menu').addReply('Ping', 'ping').send(jid)

const rich = new AIRich(sock)
rich.addText('*Report*')
rich.addSection(MB.dividerSection())
rich.addSection(MB.taskSection({ taskId: 'job-1', title: 'Rendering', status: MB.TaskStatus.RUNNING }))
await rich.send(jid)

await sendHtmlApp(sock, jid, '<h1>Hello</h1>', { title: 'Mini app' })

// Elaina-compatible static helper attachment: helpers are available on MB/MessageBuilder.
const map = MB.mapSection({ items: [], queryStatus: 'FETCHED' })
const divider = MessageBuilder.dividerSection()

// Inspect/verify a received signed AI rich response before forwarding it.
const parsedRich = readRichMessage(incomingMessage)
const signature = verifyRichResponseSignature(incomingMessage) // { status: 'passed' } or { status: 'failed', reason }
if (parsedRich && signature.status === 'passed') {
  await forwardRichResponse(sock, jid, incomingMessage)
}
```

- The builder covers tables, code, A2UI cards, HTML mini apps, embedded screens and Meta AI sections (sports, places, quiz, search, ...).
- The Elaina name `Carousel` is **`CarouselV2`** here (the bare name `Carousel` is already a message type, so it is not exported). `CarouselV2`, `AIRichCarousel`, `AIRichCarouselV2` and `MB.Carousel` are all the same class .
- The builder is **licensed separately by its author** - keep the watermark in `src/Extras/MessageBuilder/index.ts` and keep the original watermark and license header in that file.

#### AIRich widgets (`addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable`, `addSports`)

Added from elaina-baileys commit `f025122` ("tambah primitive baru 2.26.39.3 ke MessageBuilder"). Elaina dropped these five methods again in its 15-oct build; they are kept here. They live in `src/Extras/MessageBuilder` next to the other `add*` helpers, each returns the builder, and each also exists as an `...V2` alias (`addQuizV2`, ...). They are experimental, so check that your target clients draw them.

```js
import { AIRich } from '@teamolduser/baileys'
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

// Send once the connection is open (connection.update -> connection === 'open').
const jid = '6281234567890@s.whatsapp.net'

await new AIRich(sock)
    .setTitle('Widgets')
    .addHtmlCard('<h1>Hello</h1>', { width: 320, height: 160 })          // GenAIHtmlCardPrimitive
    .addSelectableText('Select me', { selectionId: 'sel-1' })              // GenAISelectableTextPrimitive
    .addQuiz('2 + 2?', ['3', { text: '4', correct: true }], { explanation: 'Basic maths' })
    .addComparisonTable(['Feature', 'A', 'B'], [['Speed', 'fast', 'slow']], { highlightLabel: 'A' })
    .addSports([{ home: 'A', away: 'B' }, { home: 'C', away: 'D' }], { league: 'NBA' })
    .send(jid)
```

The global `MB` works exactly as in elaina-baileys: the builders take the socket as their first argument (`new MB.AIRich(sock)`). On top of that, the socket carries bound versions that add `sock` for you:

```js
import { AIRich, MB } from '@teamolduser/baileys'

new MB.AIRich(sock)           // 1. as in elaina-baileys: socket as the first argument
new AIRich(sock)              // 2. named import, same thing
new sock.AIRich()             // 3. bound to this socket, no sock argument
sock.MB.AIRich                // 4. same class through sock.MB; sock.MB.sendA2UI(jid, ...) etc. also take no sock
```

`sock.MB` is `MB` with the builder classes (`AIRich`, `Button`, `ButtonV2`, `Carousel`) and the `send*` helpers (`sendA2UI`, `sendA2UIBloks`, `sendAIRichMessage`, ...) bound to that socket; every other member is passed through unchanged. The global `MB.sendA2UI(sock, jid, ...)` keeps its `sock` argument.

| Method | Arguments | Notes |
|---|---|---|
| `addHtmlCard(html, opts)` | `opts`: `mimeType` (`text/html`), `width` (300), `height` (200), `cardType`, `sandbox` | `html` must be a string |
| `addSelectableText(text, opts)` | `opts`: `selectionId` | the text is also sent as the plain submessage |
| `addQuiz(question, options, opts)` | `options`: non-empty array of strings or `{ text, correct }`; `opts`: `explanation` | a string option counts as a wrong answer |
| `addComparisonTable(columns, rows, opts)` | `rows`: arrays (wrapped into `{ cells }`) or row objects; `opts`: `highlightLabel` | |
| `addSports(games, opts)` | `games`: one game or an array; `opts`: `league` (default for each game) | one game uses the `Single` layout, several use `HScroll` |

All five accept `{ id, replace, insertAt }` like the other `add*` methods, and throw a `TypeError` for invalid input. A runnable version is in `assets/examples/airich_widgets.js`.

#### Elaina sync notes (30-sep to 21-oct)

- Default WhatsApp Web version was `2.3000.1050764678` here (now `2.3000.1051456098`; `src/Defaults/index.ts`, `src/Utils/generics.ts`, `src/Defaults/baileys-version.json`, `WAProto/WAProto.proto` header).
- Carousel biz node: `shouldIncludeBizBinaryNode` only returns `true` for a carousel when at least one card holds a native flow message, and `getBizBinaryNode` falls back to the mixed native-flow node when only a later card carries the buttons.
- Interactive message headers (`generateWAMessageContent`) and `AIRich` headers no longer send an empty `title` / `subtitle` (`headerText` in `src/Utils/messages.ts`).
- WAProto additions from the 21-oct build: `Conversation.acp2HistoryWithheld`, `DeviceCapabilities.hostWriteMutationSupport`, `HistorySync.favoriteStickers` / `omittedConversations` / `omittedConversationsProvided`, `Message.instantImageMessage`, `MsgOpaqueData.musicData`, `PollAdditionalMetadata.originalOptions`, `SyncActionValue.communityNestingStateAction` / `sharedDeviceSecretAction`, `WebMessageInfo.eventInviteAdditionalMetadata`, plus the types `RecoverableHistoryConversation`, `EventInviteAdditionalMetadata`, `HostWriteMutationSupport`, `MusicData`, `CommunityNestingStateAction` and `SharedDeviceSecretAction`. `Message.requestLocationMessage` (136) / `requestLocationUpdateMessage` (138) are included too, but elaina references their message types without ever defining them, so here `Message.RequestLocationMessage` and `Message.RequestLocationUpdateMessage` are empty placeholder messages: they encode and decode, and any real contents WhatsApp sends are kept as unknown fields until the real definitions are known. The generated `WAProto/index.js` / `index.d.ts` were patched by hand for these additions; `yarn gen:protobuf` regenerates them from `WAProto/WAProto.proto`.
- `BotModeSelectionMetadata.BotUserSelectionMode` uses the latest names `DEFAULT_MODE` (0) and `THINK_HARD_MODE` (1) in `WAProto/index.js`, `index.d.ts`, `WAProto.proto` and the `BotMetadata` sub-proto (they were `UNKNOWN_MODE` / `REASONING_MODE`).
- `assets/examples/waproto_additions.js` round-trips the new WAProto fields locally (no WhatsApp connection) and prints the default WhatsApp Web version, which is a quick check after `yarn build`.
- `libsignal` stays on `@teamolduser/libsignal@1.0.1`; elaina's switch to the registry `libsignal@^6.0.0` was not adopted.
- `.github/workflows/auto-update.yml` follows elaina's 21-oct flow (manual runs publish only with `publish: true`) but uses yarn, `yarn update:version`, and this package name; the proto refresh stays in `update-proto.yml`.
- `sock.MB` and `sock.AIRich` are attached to the socket (`src/Extras/socket.ts`) and bound to it, so they need no `sock` argument. The global `MB` is unchanged from elaina-baileys (`new MB.AIRich(sock)`).
- ffmpeg: VoIP audio/video feeders and media conversion now spawn the bundled `ffmpeg-static` binary when it exists (`src/Utils/ffmpeg-path.ts`), and fall back to `ffmpeg` on PATH. `package.json` allows only the `ffmpeg-static` install script to run (`dependenciesMeta`), so `yarn install` downloads its binary even when Yarn disables dependency build scripts by default. If it was installed before this change, run `yarn rebuild ffmpeg-static` once; no system ffmpeg or PATH change is needed.
- Comparison against elaina-baileys 1.4.7 (exports, socket methods and behaviour): every socket method and export of elaina exists here (only `Carousel` is named `CarouselV2`, see above). Differences that were found and fixed: `sock.fetchNewChatMessageCap()` now sends the real query type `INDIVIDUAL_NEW_CHAT_THREAD` with id `27910975521856601` and returns the parsed object (`status`, `capped`, `warned`, `unlimited`, `remaining`, ...; see Account health signals); `normalizeMessageContent` unwraps all 32 `FUTURE_PROOF_MESSAGE_KEYS` instead of 11; a `quoted` message without readable content is sent without the quote (with a warning) instead of throwing; `requestPairingCode` validates the phone number format and strips punctuation; the `wa:update`, `wa:diff`, `audit:apk`, `verify:proto`, `verify:mex`, `fetch:bundle`, `check:proto`, `sync:proto`, `test:pairing` and `proto:update` npm scripts are wired and adapted to the TypeScript layout .
- Also taken from elaina 1.4.7: the persisted-query ids and paths of the core newsletter operations in `src/Types/Mex.ts` (`CREATE`, `METADATA`, `SUBSCRIBERS`/`FOLLOWERS`, `SUBSCRIBED`, `ADMIN_COUNT`, `CHANGE_OWNER`, `DEMOTE` and the `xwa2_newsletter_admin_demote` path) together with their call shapes: `newsletterSubscribers()` now returns the follower list (the count is `subscribers` of `newsletterMetadata()`), `newsletterMetadata()` and `newsletterSubscribed()` take the optional switches, `newsletterMute()` / `newsletterUnmute()` go through the user setting, and `newsletterUpdate()` no longer overwrites an update's own `settings` with `null`. `requestPairingCode` rejects an answer that carries no `link_code_pairing_ref` ("accepted without registering it") instead of saving `creds.me`; the pairing tests' server replies now include that reference like the real server's. Ack error `475` raises `message-capping.update`; `NACK_REASONS` gained `StaleGroupAddressingMode` (421) and `NewChatMessagesCapped` (475); 1:1 messages that carry a message secret get the recipient `deviceListMetadata`; `executeWMexQuery` errors name the query and carry the variables that were sent; `isValidUsername` / `validateUsername` follow WhatsApp's real username rules (3-35 characters, `_` allowed at the edges, at least one letter, no leading/trailing/double `.`, no reserved words or domain endings).
- Kept as Anya's own, because it is the better of the two: `fetchLatestBaileysVersion` (live version from wppconnect with a fallback, where elaina reads its own repository's `Defaults/index.js` by line number), `makeNewsletterStatus*` (thin aliases of one shared `makeNewsletterStatusExtras`), `useMongoAuthState` next to elaina's `useMongoAuthState2`, and `downloadMediaMessage`'s handling of Boom status codes. Whether the newsletter ids above are still served can be checked at any time with `npm run verify:mex`.
- Tests: `src/__tests__/Extras/airich-widgets.test.ts` and the extra cases in `src/__tests__/binary/carousel-biz-node.test.ts`.

#### A2UI cards and AIRichMessage

Synced from the elaina-baileys 15-oct / 21-oct docs. The render notes below are elaina's findings from testing against real clients; they have not been re-verified for this package.

There are two A2UI payload shapes, and the difference matters:

| Shape | `data` content | Evidence |
|---|---|---|
| Ready-made element | `{"type":"info_card", ...}` and `{"type":"list_card", ...}` | Android knows exactly these two kinds, and WA Web's `a2ui_supported_elements` AB prop lists `"info_card, list_card"` |
| `createSurface` tree | `{version, createSurface:{surfaceId, root, components}}` | WA Web debug fixture; the renderer is lazy-loaded, so it is not verified from the bundle |

```js
import { MB } from '@teamolduser/baileys'
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

// Send once the connection is open (connection.update -> connection === 'open').
const jid = '6281234567890@s.whatsapp.net'

// Ready-made element: the safest path, because Android only draws info_card and list_card.
await MB.sendA2UI(sock, jid, [], {
    type: 'im_a2ui',
    uuid: crypto.randomUUID(),
    fallback: 'MENU\nPick a category below.',
    data: MB.a2uiInfoCard({ title: 'MENU', body: 'Pick a category below.' })
})

// Same components tree through a rich response (AIRich + bloksSection).
await MB.sendA2UIBloks(sock, jid, [
    MB.a2uiColumn('root', ['img', 't1']),
    MB.a2uiImage('img', 'https://example.com/cover.jpg'),
    MB.a2uiText('t1', 'Hello')
], { uuid: crypto.randomUUID() })
```

- `a2uiInfoCard` / `a2uiListCard` build the element objects; `sendA2UI` and `sendA2UIBloks` both accept any element through `data`.
- `sendA2UIBloks` takes the same `components` tree as `sendA2UI` (raw `data` objects included). `buildA2UISection(components, options)` returns just the section if you want to assemble an `AIRich` yourself.
- `a2uiSurface` writes `root` and no longer adds `catalogId` / `sendDataModel` unless you pass them. When no `fallback` is given, `a2uiFallback` derives one from the card text.

> [!WARNING]
> Per elaina's testing, **a regular account cannot get an A2UI card drawn**, and this is not a payload bug. `sendA2UI` only shows the `fallback` text, and `sendA2UIBloks` shows an empty bubble. The WA Web client gates both: `bloksWidget` cards need `im_a2ui_require_bot_attribution` (default true) to be off or the message to be a 1P biz-bot message, and `WebMessageInfo.is1PBizBotMessage` is set by the server, so a sender cannot fill it. `FOABloksPrimitive` needs the `foABloksNodeRenderer`, which is only enabled behind a gatekeeper. Treat both helpers as tools to verify the payload shape, not as a way to get a rendered card out of a normal account.

`AIRichMessage` builds a full rich response, including the submessages and forwarding context the official generator stamps (`WAWebGenerateRichResponseMessageProto`). `sendAIRichMessage(sock, jid, options)` accepts `sections`, `text`, `nativeFlow` and `submessages` together:

```js
await MB.sendAIRichMessage(sock, jid, {
    text: 'Hello from AIRichMessage',
    submessages: [
        MB.AIRichMessage.inlineImage({ previewUrl: 'https://x/y.jpg', highResUrl: 'https://x/y-hi.jpg' }),
        MB.AIRichMessage.table({ rows: [{ items: ['Price', '10'], isHeading: true }] })
    ]
})
```

- `AIRichMessage.text`, `inlineImage`, `table` and `contentItems` are submessage factories; `AIRichMessage.textSection` and `nativeFlowSection` are section factories. `AIRichMessage.submessage(kind, payload)` picks a factory from `AI_RICH_SUBMESSAGE_KINDS` (`text`, `inline_image`, `table`, `content_items`).
- The forwarding context set by `AIRich.build` includes `botMessageSharingInfo` with `botEntryPointOrigin: 31` (`META_AI_FORWARD`) and a `forwardScore` equal to `forwardingScore`; both can be turned off with the `messageSharing` / `forwarded` options.
- `AIRich.addSubmessage` works without a section, so a submessage can be attached to a message whose sections are empty.
- `FOABloksPrimitive` now has a factory, `bloksSection`.

#### Button label and payload forms

All forms below produce the same wire payload. The display-text aliases `display_text`, `text`, `displayText`, `displaytext` and
`buttonText` (string or `{ displayText }`) are accepted, and an already serialized `buttonParamsJson` string is kept byte-for-byte.

```ts
// Native flow button builder (interactiveMessage)
new Button(sock)
  .addButton('quick_reply', { text: 'Hi', id: '1' })                    // -> { text: 'Hi', id: '1', display_text: 'Hi' }
  .addButton('cta_url', JSON.stringify({ display_text: 'Site', url: 'https://example.com' })) // kept as is
  .addButton({ name: 'quick_reply', buttonParamsJson: { displayText: 'Yes', id: 'y' } })      // object form
  .addReply('Direct', '2')

// Legacy buttons builder (buttonsMessage)
new ButtonV2(sock)
  .addButton('Yes', 'y')                                    // addButton(label, id)
  .addButton({ text: 'No', id: 'n' })                       // object form: text | display_text | displayText, id | buttonId | button_id
  .addRawButton({ buttonId: 'm', text: 'Maybe', type: 1 })  // string buttonText / aliases become { displayText }
```

- `Button.addButton` throws a `TypeError` when no native flow button name is given.
- `ButtonV2.addButton({ id })` without any label falls back to an empty label.

_Also published at [docs/wiki/messagebuilder.md](../docs/wiki/messagebuilder.md)_

### Native flow payloads

[← back to the README](../README.md)

### Direct Native Flow examples (without helper builders)

These examples construct and send the payload directly. They do **not** call Anya's `generateCombinedButtons()` or Elaina's `new Button(sock)` builder. `jid` must be the destination JID and `sock` must be an authenticated, connected socket.

#### Anya: direct native-flow payload

Anya's `src/Addons/interactive-message.ts` defines the native-flow payload fields used below. The helper examples send the returned `interactiveMessage` object as the message content; this example constructs that same content shape inline:

```ts
await sock.sendMessage(jid, {
  body: { text: 'Choose an option' },
  footer: { text: 'Anya Bot' },
  nativeFlowMessage: {
    buttons: [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: 'Ping',
          id: '.ping',
        }),
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'Open Website',
          url: 'https://example.com',
          merchant_url: 'https://example.com',
        }),
      },
      {
        name: 'cta_copy',
        buttonParamsJson: JSON.stringify({
          display_text: 'Copy Code',
          copy_code: 'ABC123',
        }),
      },
    ],
    messageParamsJson: '',
  },
})
```

This is the raw content shape used by the Anya helper. If your application is calling a different Baileys API/version, check that version's `sendMessage()` accepted content types before using this exact call.

#### Elaina: direct native-flow payload and relay

Elaina's `Button` builder creates a full WhatsApp message with `generateWAMessageFromContent()` and relays it with the `biz` / `native_flow` additional nodes. To do that directly, use the same lower-level steps without `new Button(sock)`:

```js
import { generateWAMessageFromContent } from '../../lib/index.js'

const message = await generateWAMessageFromContent(
  jid,
  {
    interactiveMessage: {
      body: { text: 'Choose an option' },
      footer: { text: 'Elaina native-flow demo' },
      nativeFlowMessage: {
        messageParamsJson: '{}',
        buttons: [
          {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
              display_text: 'Ping',
              id: '.ping',
            }),
          },
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: 'Open Website',
              url: 'https://example.com',
              merchant_url: 'https://example.com',
            }),
          },
        ],
      },
    },
  },
  {},
)

await sock.relayMessage(message.key.remoteJid, message.message, {
  messageId: message.key.id,
  additionalNodes: [
    {
      tag: 'biz',
      attrs: {},
      content: [
        {
          tag: 'interactive',
          attrs: { type: 'native_flow', v: '1' },
          content: [
            { tag: 'native_flow', attrs: { v: '9', name: 'mixed' } },
          ],
        },
      ],
    },
  ],
})
```

**Path note:** the import above matches the relative path from `assets/buttonsbuilder/MessageBuilder.js`. If this code lives in another directory, adjust the relative import to the project's exported `generateWAMessageFromContent` entry. Elaina's builder also adds context and payload options; include those explicitly if your use case needs them.

#### Which one should I use?

- Use Anya's inline payload when you want to construct the native-flow content directly with `sock.sendMessage()`.
- Use Elaina's lower-level `generateWAMessageFromContent()` + `sock.relayMessage()` path when you need to reproduce the builder's native-flow relay metadata without instantiating `Button`.
- These are direct-payload examples, not proof that WhatsApp renders every button type identically on every client. Test with the target WhatsApp clients.

_Also published at [docs/wiki/native-flow.md](../docs/wiki/native-flow.md)_

### V2 interactive names

[← back to the README](../README.md)

### Elaina-derived interactive APIs (V2 naming)

Elaina-derived carousel, native-flow, section, list, card and rich-message helpers have explicit `V2` aliases exported from `src/Extras/v2.ts` and re-exported through `src/Extras/index.ts`. These aliases are a naming layer for the ported API, not a separate wire protocol. The Elaina general-purpose builder is also exported as `ElainaButtonV2`; do not infer that Anya had a pre-existing `ButtonV2` API.

See the V2 naming guide for import guidance and the alias families.

_Also published at [docs/wiki/interactive-v2.md](../docs/wiki/interactive-v2.md)_

### Newsletter and channels

[← back to the README](../README.md)

### Channel (newsletter) methods

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

#### Channel statuses

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

### Newsletter API

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

#### Quick start

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

#### Method reference

##### Channel lifecycle

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

##### Reading a channel

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

##### Audience and engagement

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

##### Posting and settings

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

##### Admin

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

##### Discovery

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

##### Moderation and insights

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

#### Mute: two paths

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

#### Generic dispatch

```js
await sock.newsletterAction(jid, 'FOLLOW')   // any QueryIds name
```

User-called only: nothing in the library invokes it, and `test/no-auto-follow.test.js` fails if anything starts to.
It is the one place `QueryIds[…]` may be indexed dynamically.

---

#### Types

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

##### `NewsletterMetadata` — 18 fields

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

##### Exported union types

| Type | Values |
| --- | --- |
| `NewsletterState` | `'ACTIVE' \| 'GEOSUSPENDED' \| 'SUSPENDED'` |
| `NewsletterVerification` | `'VERIFIED' \| 'UNVERIFIED'` |
| `NewsletterMute` | `'ON' \| 'OFF' \| 'UNDEFINED'` |
| `NewsletterReactionMode` | `'ALL' \| 'BASIC' \| 'NONE'` |
| `SubscriberAction` | `'promote' \| 'demote'` |

---

#### Query ids and generations

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

#### Helpers merged onto the socket

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

#### Endpoint allowlist

The websocket refuses any `waWebSocketUrl` that is not a WhatsApp host or loopback.

```js
makeWASocket({ ... })                                    // wss://web.whatsapp.com — allowed
makeWASocket({ waWebSocketUrl: 'wss://proxy.local' })     // throws
makeWASocket({ waWebSocketUrl: 'wss://proxy.local',
               allowCustomEndpoint: true })               // allowed, logs a warning naming the host
```

Deliberate: a library that connects anywhere is indistinguishable from one that phones home. Details in
[`SECURITY.md`](../../SECURITY.md).

#### Dependencies

| Dependency | State | Why |
| --- | --- | --- |
| `libsignal` | `npm:@teamolduser/libsignal@1.0.1` | upstream 6.0.0 with its own `console.*` calls commented out; diff recorded in `SECURITY.md` |
| `ffmpeg-static` | regular dependency | the bundled binary is used when it downloaded; `getFfmpegBin()` still falls back to a system `ffmpeg`, so a failed download degrades instead of breaking |

---

#### Tests and guards

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

#### Build and test

```bash
node -v            # 24.x or newer
npm install
npm run build      # src/*.ts → lib/*.js
node --test test/*.test.js
```

#### What is *not* merged

Stated plainly so nobody assumes more than is true: `Socket/business*`, `messages-recv`, `messages-send`,
`rich-messages`, `mex`, `socket` and `username` were **not** diffed method-by-method against the four forks. Only the
15 modules under `src/Extras/` have byte-level parity coverage, and `Utils/`, `WABinary/`, `Defaults/` are covered by
the elaina parity audit alone.

_Also published at [docs/wiki/newsletter.md](../docs/wiki/newsletter.md)_

### Calls, queues and screen sharing

[← back to the README](../README.md)

### 🎧 Call queues, screen sharing and group calls

These options belong to the media-call methods of the unified `voip` client — `voip.call()`, `voip.callGroup()` and `voip.joinGroupCall()` (the Elaina-style engine). See the [unified VoIP API](#unified-voip-api) note about switching engines, and Voice calling for the basics.

#### Audio queue

```js
const voip = await sock.makeVoipClient()

const call = await voip.call('628123456789', {
  playlist: ['intro.mp3', 'song.mp3'],
  idleGraceMs: 30000,   // wait this long after the queue runs dry before hanging up
  durationMs: 0         // 0 = no fixed length, the queue decides
})

call.enqueue('next-track.mp3')   // add a track while the call is running
call.queued()                    // tracks still waiting
call.nowPlaying()                // the track being played
call.skip()                      // jump to the next track
```

By default the call ends once the queue is empty, after `idleGraceMs` (0 unless you set it); pass `endWhenQueueEmpty: false` to keep it open until you end it. Sources can be files, URLs or anything ffmpeg reads.

#### Video queue

One-to-one and group calls both accept video. Frames come from ffmpeg just like the audio does, so the video source can be a file, a URL, a still image or a `lavfi:` generator.

```js
const call = await voip.call('628123456789', {
  video: true,
  videoPlaylist: ['clip.mp4'],
  playlist: ['song.mp3'],
  durationMs: 0
})

call.on('videotrack', track => console.log('now showing', track))
```

```js
const call = await voip.callGroup('12345-67890@g.us', {
  video: true,
  videoPlaylist: ['clip.mp4']
})
```

Video has its own queue, separate from the audio queue: `playVideo`, `enqueueVideo`, `skipVideo`, `queuedVideo` and `nowPlayingVideo`, with the `videotrack` and `videotrackend` events. The rule for ending the call stays tied to the audio queue, so the call ends when the audio runs out, not when the pictures do.

A still image is looped rather than shown for a single frame, which makes it an easy way to send a steady card:

```js
await voip.call('628123456789', { video: true, videoSource: './poster.jpg', playlist: ['song.mp3'] })
```

The engine picks the resolution and frame rate when the call connects, and the feeder scales to fit, padding so the aspect ratio is kept. Frames go to the WASM encoder as I420. When the queue runs dry the last frame is held instead of cutting to black, so a stall reads as a frozen picture, not a flicker.

Audio and video are two ffmpeg processes with two different clocks. Playing the same file through both will drift apart; if you need the two locked together, give the file to `playlist` only and keep the picture a still image.

#### Screen sharing

The same video, sent as a screen share rather than as a camera. It is a separate WASM entry point, so the receiver sees it labelled as a shared screen instead of as if the bot turned its camera on.

```js
const call = await voip.call('628123456789', {
  screenShare: true,
  videoPlaylist: ['slide.png'],
  playlist: ['narration.mp3']
})
```

`screenShare: true` already implies `video: true`. Switch it on and off mid-call with `call.startScreenShare()` and `call.stopScreenShare()`; `call.isScreenShare()` reports which one is live.

Which is better depends on what you send, and both are worth testing on a real call:

- **Screen share** suits still content — slides, lyrics, a single card. The encoder favours sharpness over motion, and a 16:9 source is not forced into a portrait camera frame.
- **The camera path** suits moving pictures and reaches everyone. Screen sharing is gated by `calling_screen_share_milestone_version`: a recipient on an older WhatsApp gets an "please update" dialog instead of your content. Groups also cap how many participants may share, and usually only one may share at a time.

#### Group calls

```js
const call = await voip.callGroup('12345-67890@g.us', {
  playlist: ['one.mp3', 'two.mp3'],
  idleGraceMs: 30000,
  durationMs: 0
})
```

`callGroup` reads the member list from the group's metadata, resolves each member's LID and devices, then calls them all. Pass `participants` to call only some of them, or `metadata` if you already have it and want to skip the fetch.

To join a call somebody else started, hand `joinGroupCall` what the incoming offer says:

```js
const call = await voip.joinGroupCall({
  callId,
  callCreatorJid,
  groupJid,
  playlist: ['one.mp3']
})
```

The queue behaves the same in a group call as in a one-to-one call.

Media is produced by ffmpeg: Anya uses the bundled `ffmpeg-static` binary when it exists and falls back to `ffmpeg` on the `PATH`; set `ffmpegPath` on the client to point at a specific binary. The VoIP resources (`whatsapp.wasm`, `loader.js`, `worker-modules.js`) are WhatsApp Web's own files, carried byte for byte; `npm run verify:assets` re-checks their checksums.

---

_Also published at [docs/wiki/calls.md](../docs/wiki/calls.md)_

### VoIP

[← back to the README](../README.md)

### Unified VoIP API

Anya and Elaina call features are exposed through **one `voip` client**. No engine-selection option is required: the method you invoke automatically selects the internal signaling engine. The merged implementation in `src/Voip/` is the only VoIP source in this tree.

```ts
import makeWASocket from '@teamolduser/baileys'

const sock = makeWASocket({ auth: state })
const voip = await sock.makeVoipClient()

// Anya multi-call API
const call = await voip.initiateCall('15551234567', {
  audioSource: './audio.mp3',
  durationMs: 60_000
})
const activeCalls = await voip.getActiveCalls()

// Elaina media/group-call API is available on the same client.
// First end the previous call before switching internal signaling engines.
// const mediaCall = await voip.call('15551234567', { audioSource: './audio.mp3' })
// mediaCall.enqueue('./next-track.mp3')

// Alternative: import { makeVoipClient } and use the top-level factory:
// const socketVoip = await makeVoipClient(sock)
```

The same client exposes `initiateCall()`, `initiateCalls()`, `callMany()`, `acceptCall()`, `rejectCall()`, `call()`, `callGroup()`, `joinGroupCall()`, `getActiveCalls()`, `getCall()`, `getActiveCallCount()`, `endCall()`, `endAllCalls()`, `setOptions()`, `resetCallState()`, and `disconnect()`. The call object includes methods appropriate to the call-creation API: Anya calls expose incoming-call lifecycle and video controls; Elaina calls expose audio/video playlists and screen-sharing controls.

**Safety note:** Both original engines own WhatsApp signaling state, so they cannot safely manage active calls at the same time on one socket. The unified client switches automatically only when the previous engine has no active calls; it throws a clear error if a switch is attempted while a call is active. Do not start direct `sock.initiateCall()` calls while an Elaina media call is active. See the complete VoIP API guide.

### VoIP diagnostics and call timelines

Ported from innovatorssoft/baileys. One shared instance records a bounded per-call timeline and redacts anything that
looks like key material before it reaches a log line.

```ts
import { voipDiagnostics, VoipDiagnostics, sanitizeJid, summarizeNode } from '@teamolduser/baileys'

// one shared instance; pass your pino logger so lines go wherever the rest of your logs go
voipDiagnostics.setLogger(logger)
voipDiagnostics.setDiagnosticMode(true)   // elevates debug -> info in production

voipDiagnostics.log({
    component: 'Signaling',
    event: 'offer_received',
    callId,
    jid: peerJid,
    data: { retry: 2, enc: 'never logged' }   // enc comes out as [REDACTED]
})

// reconstruct a failed call
console.log(voipDiagnostics.formatTimeline(callId))
```

| Export | What it does |
| --- | --- |
| `voipDiagnostics` | shared `VoipDiagnostics` instance (one per process, across module copies) |
| `new VoipDiagnostics(logger, { diagnostic, logFile })` | your own instance; `logFile` is opt-in — nothing is written to disk unless you name a file |
| `CallTimelineStore` | the bounded timeline on its own (`maxEntriesPerCall`, `maxCalls`, `ttlMs`) |
| `sanitizeJid` / `summarizeAttrs` / `summarizeNode` | redaction helpers, usable in your own logging |

`CallSession` is the innovatorssoft name for the call object this package exposes as `ActiveCall`; both names are
exported from the package root.

_Also published at [docs/wiki/voip.md](../docs/wiki/voip.md)_

### In-app HTML webview

[← back to the README](../README.md)

### In-app HTML webview (`webView`)

Hand it the jid and the HTML, it sends the page. Nothing else — no markup helpers, no validation layer, no height
injection. The HTML goes out exactly as you wrote it.

It is on the socket, under three names:

```ts
const { messageId } = await sock.webView(jid, {
    html: page,                 // your full HTML document, sent byte-for-byte
    title: 'Order status',      // optional: disclaimer text + notification preview
    label: 'tap to open',       // optional: preview line on the card
    forwarded: false            // optional: no "Forwarded" badge
})

await sock.web(jid, { html: page })            // same method
await sock.sendHtmlWebview(jid, { html: page }) // the name it shipped under first
```

The standalone function still exists for code that already holds the socket:

```ts
import { webView } from '@teamolduser/baileys'

const { messageId } = await webView(sock, jid, { html: page })
```

| Option | Meaning |
| --- | --- |
| `html` | the page — required, passed through untouched |
| `title` | `messageDisclaimerText` + notification preview |
| `label` | the submessage preview on the card |
| `forwarded` | `true` (default) = Meta-AI forward styling, `false` = clean origin |
| `quoted` | quote an existing message |
| `messageId` | reuse a specific id instead of generating one |

`sock.webView`, `sock.web` and `sock.sendHtmlWebview` are the same bound method, and `webView(sock, jid, options)`,
`web(sock, jid, options)`, `sendHtmlWebview(sock, jid, options)` are the same standalone function. Both forms send an
identical payload.

Two stanzas go out and both are needed: the `botForwardedMessage` rich response, then a `protocolMessage` **type-14
edit** of that same message id. The second is what makes the client render the page — send only the first and the card
never opens.

Validation is not done here. If you want a page checked before sending, run your own check first — this function sends
what you give it.

_Also published at [docs/wiki/webview.md](../docs/wiki/webview.md)_

### Account health signals

[← back to the README](../README.md)

### 🛡️ Account health signals

WhatsApp tracks how an account reaches out to people it has never talked to, and tells its client where it stands. Reading those two signals is far more dependable than guessing a safe pause.

Both are the same `w:mex` queries WA Web runs, so the answer comes from WhatsApp's server, not from a local count:

| Function | Persisted query | When it can be called |
| --- | --- | --- |
| `fetchNewChatMessageCap()` | `WAWebMexFetchNewChatMessageCappingInfoJobQuery` (`27910975521856601`) | any time after connecting |
| `fetchAccountReachoutTimelock()` | `WAWebMexFetchReachoutTimelockJobQuery` (`23983697327930364`) | any time after connecting |

#### New-chat quota

```js
const cap = await sock.fetchNewChatMessageCap()
```

What comes back:

| Field | Meaning |
| --- | --- |
| `status` | `NONE` → `FIRST_WARNING` → `SECOND_WARNING` → `CAPPED`, WhatsApp's own escalation ladder |
| `capped` | `true` once `status` is `CAPPED`: sending to new chats is refused |
| `warned` | `true` on both `FIRST_WARNING` and `SECOND_WARNING` |
| `unlimited` | `true` when the server sent no quota (or a negative one), so there is nothing to count down |
| `totalQuota` | the new-chat allowance for one cycle |
| `usedQuota` | how much of it the cycle has used |
| `remaining` | `totalQuota - usedQuota`, never negative; `null` when `unlimited` |
| `cycleStart`, `cycleEnd` | start and end of the cycle, **unix seconds** — multiply by 1000 for `new Date` |
| `serverTime` | the server clock when it answered, to compare `cycleEnd` without trusting your machine's clock |
| `oteStatus`, `mvStatus`, `subscriptionStatus` | verification and subscription status that ride along in the answer |
| `response` | the raw reply, if you want a field that is not mapped yet |

Only **starting** a chat with a number you have never talked to uses the quota. Replying in a conversation someone else started does not count, and neither does sending again to an existing chat.

Worth knowing: this query asks for one kind of quota, `INDIVIDUAL_NEW_CHAT_THREAD` — the new-chat **thread** quota, not a message count. Earlier Anya builds sent `INDIVIDUAL_NEW_CHAT_MSG`, a name no WhatsApp client has, which is why the call could come back with an error or empty numbers, and returned the raw reply without the fields above. The server also pushes this state on its own as the `message-capping.update` event (the raw payload, snake_case). A send that WhatsApp refuses because of the quota (ack error `475`) raises the same event with `capping_status: 'CAPPED'`, the `jid` and the `messageId` of the rejected message, and is never retried.

#### Reachout timelock

```js
const lock = await sock.fetchAccountReachoutTimelock()
```

| Field | Meaning |
| --- | --- |
| `isActive` | the account is currently restricted from contacting new people |
| `timeEnforcementEnds` | a `Date` for when the restriction lifts, `undefined` when the server sends `0` |
| `enforcementType` | the reason — `BIZ_QUALITY` is quality-based, `BIZ_COMMERCE_VIOLATION_*` are policy categories |

Calling it also emits `connection.update`, so one call informs the whole bot. The state also arrives unasked:

```js
sock.ev.on('connection.update', ({ reachoutTimeLock }) => {
  if (reachoutTimeLock?.isActive) stopSending()
})
```

#### Using it as a guard

```js
const guard = async () => {
  const lock = await sock.fetchAccountReachoutTimelock()
  if (lock.isActive) return { send: false, reason: 'reachout timelock until ' + lock.timeEnforcementEnds }

  const cap = await sock.fetchNewChatMessageCap()
  if (cap.capped) return { send: false, reason: 'new-chat quota used up until ' + new Date(cap.cycleEnd * 1000) }
  if (cap.warned) return { send: false, reason: 'WhatsApp has already warned this account: ' + cap.status }
  if (cap.remaining !== null && cap.remaining < 10) return { send: false, reason: 'only ' + cap.remaining + ' left in this cycle' }

  return { send: true, remaining: cap.remaining }
}
```

Check before a round and again every batch — `SECOND_WARNING` is the last state before the quota lands, so stopping there is the difference between a pause and a block.

> [!NOTE]
> Bulk sending through an unofficial client is outside WhatsApp's Terms of Service, whatever the recipients agreed to. The sanctioned route for opt-in bulk sending is the WhatsApp Business Platform. These signals reduce the chance of tripping an automatic limit; they do not make an account safe.

---

_Also published at [docs/wiki/account-health.md](../docs/wiki/account-health.md)_

### Pairing code

Instead of scanning a QR code you can pair with an 8-character code. The flow is: open the socket, wait for the
`pair-device` stanza, then ask for the code with the phone number in international format (digits only).

```ts
const sock = makeWASocket({ auth: state, printQRInTerminal: false })

if (!sock.authState.creds.registered) {
	const phoneNumber = '919876543210' // country code + number, no +, no spaces
	const code = await sock.requestPairingCode(phoneNumber)
	console.log('enter on the phone:', code) // e.g. 'ABCD-1234'
}
```

#### The request is confirmed by the server

`requestPairingCode` does not invent the code locally — it sends an IQ and the server answers with the code. If you call
it before the socket has received `pair-device`, the IQ fails with a 404 or times out. That is what
`createPairingQueue` in `src/Addons/pairing-fix.ts` exists for: it queues the call until the socket is actually ready.

```ts
import { createPairingQueue } from '@teamolduser/baileys'

const pq = createPairingQueue(sendPairingIQ) // sendPairingIQ is the raw IQ sender
// in the pair-device handler:
pq.setReady()
// in the connection-close handler:
pq.clear()

const code = await pq.requestPairingCode('919876543210')
```

#### One code at a time

A pairing code is valid for one attempt. Requesting a second code while the first is still pending returns `409` from
the server, and the phone shows nothing. Wait for the attempt to finish — success, failure, or the code expiring —
before asking again.

#### A custom code

The second argument lets you choose the code, which is handy for testing. It still has to be accepted by the server, so
stick to the same alphabet the default uses (uppercase letters and digits, eight characters):

```ts
const code = await sock.requestPairingCode('919876543210', 'ANYA1234')
```

#### Checking pairing without touching the running bot

Pairing mutates the credentials file, so never pair against the same auth folder a live bot is using. Copy the folder
first, pair on the copy, and inspect the result:

```bash
cp -r ./auth ./auth-check
### point a throwaway script at ./auth-check, pair, then read auth-check/creds.json
```

`node scripts/live-check.mjs --check 1` does exactly this — it pairs a copy and reports what came back.

_Also published at [docs/wiki/pairing.md](../docs/wiki/pairing.md)_

### AnchorGuard

An **anti-force-close guard**, ported from Elaina Baileys. It watches the messages going in and out, spots the payloads
that make WhatsApp Web or the phone app crash, and deletes them before anyone opens them. Optionally it blocks the
sender, kicks them from a group, and catches the "spam-add" attack where a group is flooded with Meta AI numbers.

It does **not** keep your bot process alive — a bot renders no UI, so a crash payload cannot kill it. The guard protects
the people on the other end of the socket.

The guard package ships with this one, so there is nothing extra to install:

```ts
const sock = makeWASocket({
	auth: state,
	AnchorGuard: true,
	AnchorGuardConfig: {
		autoDelete: true,
		guardIncoming: true,
		guardOutgoing: true,
		blockOnBug: true,
		kickOnBug: true,
		onDetect: ({ direction, jid, sender, reasons }) => console.log('[guard]', direction, jid, reasons)
	}
})
```

Once attached the handle is `sock.anchorGuard`; `sock.anchorGuard.stop()` detaches every hook.

#### How it works

| Hook | What it does |
|---|---|
| `messages.upsert` | scans every incoming message; a flagged one is deleted before your handler sees it |
| `sock.sendMessage` (wrapped) | scans outgoing content and throws instead of sending a payload that would crash the recipient |
| `group-participants.update` | watches member additions for the Meta AI spam-add attack |

| Situation | Response |
|---|---|
| Group, bot is admin | delete for everyone (revoke) + kick the sender + block the sender |
| Group, bot is not admin | delete for me + block the sender |
| Direct chat | delete for me + block the sender |
| Your own message (`fromMe`) | revoked, no block |

WhatsApp does not let you revoke someone else's message unless you are an admin, which is why the non-admin path falls
back to delete-for-me.

#### Options

Every key goes in `AnchorGuardConfig`. Defaults are the package's own.

| Option | Default | Meaning |
|---|---|---|
| `autoDelete` | `true` | delete a flagged message automatically |
| `revokeForEveryoneIfAdmin` | `true` | in a group, revoke when the bot is admin; otherwise delete-for-me |
| `kickOnBug` | `true` | kick the sender from the group (needs admin) |
| `blockOnBug` | `true` | block the sender (never your own number) |
| `guardIncoming` | `true` | scan `messages.upsert` |
| `guardOutgoing` | `true` | wrap `sendMessage` and refuse dangerous payloads |
| `groupMetadata` | `null` | `async jid => metadata`, so admin checks can use your cache |
| `selfOnly` | `false` | only guard your own chat |
| `burstThreshold` | `2` | flagged messages from one sender before escalating |
| `burstWindowMs` | `60000` | the burst window |
| `leaveGroupOnBurst` | `false` | leave the group when a kick keeps failing during a burst |
| `cooldownMs` | `15000` | quiet period for repeated logs from the same chat |
| `guardGroupAdds` | `true` | watch `group-participants.update` for adds |
| `autoKickBadAdds` | `true` | kick a dangerous number the moment it is added (needs admin) |
| `metaAiNumbers` | `true` | treat Meta AI numbers (`1313555…`) as a dangerous add |
| `addWatchlist` | `[]` | extra numbers to kick on sight when added |
| `ownJid` | `sock.user.id` | your own jid |
| `thresholds` | `{}` | override the detection limits from `ANTIBUG_DEFAULTS` |
| `onDetect` | `null` | called with `{ direction, jid, sender, reasons }` |
| `proto` | `null` | pass Baileys' `proto` to also check the encoded protobuf size |

#### Detection without a socket

```ts
import { detectBug } from '@rexxhayanasi/elaina-anchorguard'

const { flagged, reasons } = detectBug(msg.message)
if (flagged) console.log('crash payload:', reasons)
```

#### What it catches

Control and null bytes (`\u0000`, C0/C1); floods of combining or invisible / zero-width / RTL characters; giant text or
captions and excess newlines; mention bombs; native-flow, list and carousel messages with too many buttons or rows;
broken `buttonParamsJson`; AIRich with too many submessages; invalid location coordinates; oversized polls and contact
arrays; `NaN` / `Infinity` in any field; wrapper nesting that is too deep; oversized or circular structures; an encoded
protobuf over the limit when `proto` is passed.

#### Limits, honestly

Best effort, not a guarantee — antivirus, not a firewall. It catches known crash patterns plus structural heuristics; a
new vector needs a package update. `thresholds` is there so a legitimately long message does not trip it, but lowering
them weakens the protection.

It ships as a dependency, but the import is still lazy and guarded: if the package is somehow missing from
`node_modules`, the socket does **not** throw — it logs a warning through `sock.logger` naming the package and carries
on without a guard. Attach your own logger to see that warning.

### External ad reply

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

#### Why the card sometimes does not appear

| Symptom | Cause |
|---|---|
| Card missing entirely | `mediaType` set but no usable thumbnail — the client drops the whole card |
| Only the text arrives | `externalAdReply` placed inside `contextInfo` instead of next to `text` |
| Thumbnail blank but title shows | the image URL is not reachable from the phone, or is not JPEG/PNG |
| "via ad" label appears | `showAdAttribution: true` — see below |

The most reliable shape is a real, reachable image URL plus `mediaType: 1`. If you have the image as a buffer, upload it
and use the returned URL rather than a local path.

#### Click-to-WhatsApp and the "via ad" label

`showAdAttribution` marks the message as coming from an advertisement. Two things that look alike but are not:

- the **card** — built by `externalAdReply`, available to any bot
- the **"via ad" label** — added by WhatsApp when a message is sent through the click-to-WhatsApp flow

A bot can render the card; it cannot legitimately produce the ad label. Setting `showAdAttribution: true` on a normal
message does not make it a real ad, and WhatsApp treats it as a mismatch. Leave it `false`.

_Also published at [docs/wiki/ad-reply.md](../docs/wiki/ad-reply.md)_

### Rich link cards and status previews

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

_Also published at [docs/wiki/link-previews.md](../docs/wiki/link-previews.md)_

### A2UI cards

A2UI is the card format Meta uses for rich, structured replies. The builders live in
`src/Extras/MessageBuilder/extras.ts` and produce the node tree the spec expects.

```ts
import { a2uiText, a2uiImage, A2UI_BASIC_CATALOG, BLOKS_A2UI_TYPE } from '@teamolduser/baileys'

const card = {
	type: BLOKS_A2UI_TYPE,
	catalog: A2UI_BASIC_CATALOG,
	body: [
		a2uiImage('img', 'https://example.com/cover.jpg'),
		a2uiText('title', 'Anya Baileys', { variant: 'heading' }),
		a2uiText('body', 'Multi-device socket, MessageBuilder and channels.')
	]
}
```

| Export | Purpose |
|---|---|
| `BLOKS_A2UI_TYPE` | the `im_a2ui` type string the client expects |
| `BLOKS_A2UI_REPLY_ACTION` | action id used when the user taps the card |
| `A2UI_BASIC_CATALOG` | the v0.9 basic catalog URL |
| `a2uiText(id, text, { variant })` | a text node (`body`, `heading`, …) |
| `a2uiImage(id, url, { variant, fit })` | an image node; throws on an empty URL |

Cards are validated by the client, not by us — a node with an unknown `variant` or a missing id is dropped silently, so
send one card to a test number before wiring it into a flow.

_Also published at [docs/wiki/a2ui.md](../docs/wiki/a2ui.md)_

### Message types

Most messages are **not** `conversation`. A disappearing message, a view-once, an edited message and a captioned document
all wrap the real content one or more levels deep. Reading `msg.message.conversation` is therefore the single most common
source of "my bot receives nothing".

```ts
import { extractMessageContent, extractMessageText } from '@teamolduser/baileys'

const inner = extractMessageContent(msg.message) // unwraps ephemeral / viewOnce / edited / documentWithCaption
const text = extractMessageText(msg.message)     // '' when there is no text at all
```

The wrapper keys `extractMessageContent` handles:

```
ephemeralMessage, viewOnceMessage, viewOnceMessageV2, viewOnceMessageV2Extension,
documentWithCaptionMessage, editedMessage, associatedChildMessage,
groupStatusMessage, groupStatusMessageV2, spoilerMessage, lottieStickerMessage
```

If you are branching on the type yourself, check the wrapper first, then the content — never assume the top level.

_Also published at [docs/wiki/message-types.md](../docs/wiki/message-types.md)_

### Message content keys

The keys `sendMessage` accepts, with the shape each one expects. Anything not listed here is a wrapper — use
`extractMessageContent` before reading it.

| Key | Sends |
|---|---|
| `text` | plain text |
| `image` / `video` | `Buffer` or `{ url }`, plus `caption` |
| `audio` | `Buffer` or `{ url }`, plus `ptt: true` for a voice note |
| `document` | `Buffer` or `{ url }`, plus `fileName`, `mimetype` |
| `sticker` | `Buffer` or `{ url }` |
| `location` | `{ degreesLatitude, degreesLongitude }` |
| `contacts` | `{ displayName, contacts: [{ vcard }] }` |
| `reaction` | `{ text, key }` |
| `poll` | `{ name, values, selectableCount }` |
| `pollResult` / `pollUpdate` | a vote |
| `delete` | `{ remoteJid, fromMe, id }` — a revoke |
| `edit` | `{ text, ... }` on a message you sent |
| `forward` | `{ key }` |
| `disappearingMessagesInChat` | the timer for a chat |
| `buttons` / `templateButtons` / `sections` | legacy interactive payloads |
| `listMessage` / `buttonsMessage` / `templateMessage` | pre-built protos |
| `externalAdReply` | the ad-style card |
| `viewOnce` | wrap a media message as view-once |
| `ptv` | a video note |
| `album` | several media items in one send |

Wrapper keys you will *receive* (never send these as content):

```
ephemeralMessage, viewOnceMessage, viewOnceMessageV2, viewOnceMessageV2Extension,
documentWithCaptionMessage, editedMessage, associatedChildMessage,
groupStatusMessage, groupStatusMessageV2, spoilerMessage, lottieStickerMessage
```

_Also published at [docs/wiki/content-keys.md](../docs/wiki/content-keys.md)_

### Modern message API

The ported modern content types, each with its own builder. They are plain content keys, so they go through
`sock.sendMessage` like anything else.

| Builder | Sends |
|---|---|
| `makeQuestionMessage` | a question prompt with answers |
| `makeQuestionResponseMessage` | a response to a question |
| `makeQuestionReplyMessage` | a reply inside a question thread |
| `makePollAddOptionMessage` | adds an option to a running poll |
| `makeStatusMentionMessage` | mentions someone in a status |
| `makeStatusQuotedMessage` | quotes a status |
| `makeStatusStickerInteractionMessage` | sticker reaction on a status |
| `makeStatusNotificationMessage` | a status notification |
| `makeStatusAudienceMetadata` | custom audience (close friends) |
| `makeStatusAddYoursAssociation` | the "add yours" prompt |
| `makeGroupStatusReactionMessage` | group status reaction |
| `makeCommentMessage` | comment on a channel post |
| `makeEventInviteMessage` | event invite |
| `makeScheduledCallCreationMessage` / `makeScheduledCallEditMessage` | scheduled calls |
| `makeNewsletterAdminInviteMessage` | channel admin invite |
| `makeNewsletterFollowerInviteMessage` | channel follower invite |

```ts
import { makeQuestionMessage } from '@teamolduser/baileys'

await sock.sendMessage(jid, makeQuestionMessage({
	question: 'Which release should I ship?',
	options: ['v1', 'v2', 'neither']
}))
```

Each builder validates its own inputs and throws a named error rather than sending a malformed proto — a rejected
payload from the server gives you much less to work with.

_Also published at [docs/wiki/modern-messages.md](../docs/wiki/modern-messages.md)_

### Scheduled messages

Scheduled messages are client-side: a job queue that fires `sendMessage` at the right time. Nothing is stored on
WhatsApp's side, so a bot that is offline when the time comes does not send it.

```ts
import { attachSchedulerSendFn, scheduleMessage, scheduleMessageAfter } from '@teamolduser/baileys'

attachSchedulerSendFn((jid, content, options) => sock.sendMessage(jid, content, options))

const job = scheduleMessage({
	jid,
	content: { text: 'Good morning' },
	sendAt: new Date('2026-11-10T03:30:00Z'),
	repeatIntervalMs: 24 * 60 * 60 * 1000, // optional: daily
	maxRepeats: 30
})

// or relative
scheduleMessageAfter({ jid, content: { text: 'in 10 minutes' }, delayMs: 600_000 })
```

| Helper | Use |
|---|---|
| `scheduleMessage({ jid, content, sendAt })` | send at a date/time |
| `scheduleMessageAfter({ jid, content, delayMs })` | send after a delay |
| `getAllScheduledMessages()` | list pending jobs |
| `cancelScheduledMessage(id)` / `cancelAllScheduledMessages()` | cancel |
| `createMessageScheduler()` | a manager instance instead of module-level state |

_Also published at [docs/wiki/scheduled-messages.md](../docs/wiki/scheduled-messages.md)_

### Group administration

Every group call takes the group jid (`…@g.us`). The full set, as it exists on the socket:

#### Reading a group

```ts
const meta = await sock.groupMetadata(jid)
// { id, subject, desc, owner, participants: [{ id, admin, lid }], addressingMode, ... }

// every group this account is in, in one call
const all = await sock.groupFetchAllParticipating()
```

`groupMetadata` is cached by the socket for a short while — if you need fresh participants right after a change, wait
for the `groups.update` event instead of polling.

#### Creating, leaving, renaming

```ts
const group = await sock.groupCreate('Support', ['919876543210@s.whatsapp.net'])
await sock.groupUpdateSubject(group.id, 'Support — tier 1')
await sock.groupUpdateDescription(group.id, 'First line support')
await sock.groupLeave(group.id)
```

#### Participants

```ts
await sock.groupParticipantsUpdate(jid, ['919876543210@s.whatsapp.net'], 'add')      // or 'remove' | 'promote' | 'demote'
```

The server answers per participant: `200` added, `403` invite sent instead (privacy setting), `408` left recently,
`409` already in the group, `500` group full. Always read the result array — a `200` for one participant does not mean
the rest worked.

#### Invites

```ts
const code = await sock.groupInviteCode(jid)        // e.g. 'AbCdEf123'
const info = await sock.groupGetInviteInfo(code)    // subject, size, participants
await sock.groupRevokeInvite(jid)                   // old link stops working
await sock.groupAcceptInvite(code)                  // join
```

`groupInviteCode` fails with `403` when you are not an admin and the group restricts links.

#### Join requests

Groups with approval on queue joiners:

```ts
const pending = await sock.groupRequestParticipantsList(jid)
await sock.groupRequestParticipantsUpdate(jid, [pending[0].jid], 'approve') // or 'reject'
```

#### Settings

```ts
await sock.groupSettingUpdate(jid, 'announcement')       // only admins can send
await sock.groupSettingUpdate(jid, 'not_announcement')   // everyone can send
await sock.groupSettingUpdate(jid, 'locked')             // only admins can edit group info
await sock.groupMemberAddMode(jid, 'all_member_add')     // or 'admin_add'
await sock.groupJoinApprovalMode(jid, 'on')              // or 'off'
await sock.groupToggleEphemeral(jid, 86400)              // disappearing: 0 | 86400 | 604800 | 7776000
```

#### Ephemeral and addressing

`addressingMode` decides whether the group is addressed by lid or by phone-number jid. Read it from `groupMetadata`
before constructing participant jids; `splitJidsByType` from the lid-support addon does the split for you.

_Also published at [docs/wiki/groups.md](../docs/wiki/groups.md)_

### Communities

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

_Also published at [docs/wiki/communities.md](../docs/wiki/communities.md)_

### Chat state, labels and history

#### Chat helpers

`makeChatsExtras(sock)` adds the chat-level operations that are not on the socket: clearing a message modification,
reporting spam, and reading the result back.

```ts
import { makeChatsExtras, SPAM_FLOWS } from '@teamolduser/baileys'

const chats = makeChatsExtras(sock)

await chats.reportSpam(jid, { flow: SPAM_FLOWS.OverflowMenuReport })
```

#### Labels

Business accounts can tag chats with labels. The label helpers are part of the chats extras; the newsletter extras carry
the channel equivalents.

```ts
await chats.addLabel(jid, labelId)
await chats.removeLabel(jid, labelId)
```

#### History and resync

When a bot restarts with an old auth state, WhatsApp may send an abbreviated history sync. If chats look empty:

1. check `creds.accountSyncCounter` — a low number means the account never finished syncing
2. do not delete the auth folder to "force" a resync; that costs a re-pair
3. `sock.ev.on('messaging-history.set', …)` tells you what actually arrived

_Also published at [docs/wiki/chat-state.md](../docs/wiki/chat-state.md)_

### Privacy and disappearing messages

#### Disappearing messages

The timer is per chat, in seconds, and only a fixed set is accepted:

```ts
import { DISAPPEARING_DURATIONS, normalizeDisappearingDuration } from '@teamolduser/baileys'

await sock.sendMessage(jid, { disappearingMessagesInChat: 86400 })
```

| Value | Meaning |
|---|---|
| `0` | off |
| `86400` | 24 hours |
| `604800` | 7 days |
| `7776000` | 90 days |

`normalizeDisappearingDuration` takes a **number** and converts the shorthands the socket accepts:

| Input | Result |
|---|---|
| `0` | `0` (off) |
| `1` or `24` | `86400` |
| `7` | `604800` |
| `30` | `2592000` |
| `90` | `7776000` |
| anything else | treated as seconds already |

A non-numeric string (`'24h'`, `'off'`) throws a `Boom` with status 400 — it does not parse human shorthands, so convert
those yourself before calling it.

#### Blocking and reporting

```ts
await sock.updateBlockStatus(jid, 'block')   // or 'unblock'
await sock.reportSpam(jid, { flow: SPAM_FLOWS.OverflowMenuReport })
```

Reporting is one-way and not reversible from the API; the result comes back as a node you read with
`readSpamReportResult`.

#### What a bot cannot change

Privacy settings (last seen, profile photo, read receipts, group add permissions) live on the account, not the socket.
The API can read them in some cases but cannot set them — telling users otherwise is the usual source of bug reports.

_Also published at [docs/wiki/privacy.md](../docs/wiki/privacy.md)_

### Presence and read receipts

```ts
await sock.sendPresenceUpdate('composing', jid)   // typing…
await sock.sendPresenceUpdate('paused', jid)      // stopped
await sock.sendPresenceUpdate('available')        // online
await sock.sendPresenceUpdate('unavailable')      // offline

await sock.presenceSubscribe(jid)                 // ask for their presence
await sock.readMessages([msg.key])                // blue ticks
```

Presence arrives as events:

```ts
sock.ev.on('presence.update', ({ id, presences }) => {
	const state = presences[id]?.lastKnownPresence // 'available' | 'composing' | 'unavailable' | …
})
```

#### Checking a number

```ts
const [result] = await sock.onWhatsApp('919876543210')
// { jid, exists: true } or { exists: false }
```

This is the only supported way to test whether a number is on WhatsApp. Building a jid and sending to it works for
numbers that are registered, but fails silently otherwise.

#### Read receipts

`sock.readMessages` only accepts messages you actually received. Calling it with a key you sent is a no-op, which is why
"my bot does not mark chats read" usually means the key came from the wrong place.

_Also published at [docs/wiki/presence.md](../docs/wiki/presence.md)_

### Profile photos

```ts
// read the URL of someone's picture
const url = await sock.profilePictureUrl(jid, 'image')

// change your own
import { generateProfilePictureFull, updateProfilePictureFull } from '@teamolduser/baileys'

const { img } = await generateProfilePictureFull(buffer) // resized and encoded the way WA wants it
await sock.updateProfilePicture(sock.user.id, img)
await updateProfilePictureFull(sock.user.id, buffer, sock) // full-quality variant

// remove it
await sock.removeProfilePicture(jid)
```

`generateProfilePictureFull` is the important one: WhatsApp rejects pictures outside its size and aspect rules, and the
helper produces a payload the server accepts. Passing a raw buffer straight to `updateProfilePicture` usually fails
silently.

_Also published at [docs/wiki/profile-photos.md](../docs/wiki/profile-photos.md)_

### Business, catalog and labels

Business accounts get product and label calls on top of the normal surface.

#### Products

```ts
const { products } = await sock.getCatalog({ jid: businessJid })
await sock.productCreate({ name: 'Anya Pro', price: 900, currency: 'INR', … })
await sock.productUpdate(productId, { price: 1200 })
await sock.productDelete([productId])
```

Prices are in the smallest unit of the currency (`900` = ₹9.00 for INR, `900` = $9.00 for USD) — the same `offset`
convention `money()` from the payment extras uses.

#### Profile and quick replies

```ts
await sock.updateProfileStatus('Back at 6')
await sock.updateProfileName('Support bot')
await sock.updateBusinessProfile({ address: '…', email: '…', description: '…' })

await sock.addOrEditQuickReply({ shortcut: '/hours', message: 'We are open 9–6 IST' })
const replies = await sock.getQuickReply()
```

#### Group member labels

Member labels are the business tags shown next to a participant:

```ts
await sock.updateMemberLabel(jid, 'VIP')
await sock.updateMemberLabel(jid, '')   // clear
```

#### Re-fetching expired media

Media URLs expire. Re-request instead of re-downloading from a saved URL:

```ts
await sock.updateMediaMessage({ key: msg.key, message: msg.message })
```

_Also published at [docs/wiki/business.md](../docs/wiki/business.md)_

### Channel administration

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

_Also published at [docs/wiki/channels.md](../docs/wiki/channels.md)_

### Calls in depth

Signalling only — the audio and video themselves are yours to carry.

```ts
const call = await sock.offerCall(jid, { isVideo: false })
sock.ev.on('call', async events => {
	for (const event of events) {
		if (event.status === 'offer') await sock.acceptCall(event.id, event.from)
		if (event.status === 'terminate') { /* clean up */ }
	}
})

await sock.rejectCall(callId, callFrom)
await sock.terminateCall(callId, callFrom)
```

| Method | Use |
|---|---|
| `offerCall(jid, { isVideo })` | start a call |
| `acceptCall(id, from)` | answer |
| `rejectCall(id, from)` | decline |
| `terminateCall(id, from)` | hang up |

#### Group calls and screen sharing

Group calls go through the relay in `src/Socket/Client`. Screen sharing is a video call with a screen track; the
`voip.md` wiki page has the signalling sequence, and `voipDiagnostics` records timelines when you need to see what the
server actually said:

```ts
sock.voipDiagnostics.logFile = './voip-debug.log' // opt-in
```

_Also published at [docs/wiki/calls-deep.md](../docs/wiki/calls-deep.md)_

### Event reference

Every event the socket emits, with the payload shape. `sock.ev.on(name, handler)` — the handler gets one object.

#### Connection and credentials

| Event | Payload | Fires when |
|---|---|---|
| `connection.update` | `{ connection, lastDisconnect, isNewLogin, qr, receivedPendingNotifications }` | the socket connects, reconnects, or drops |
| `creds.update` | — | the credentials changed and should be saved (`saveCreds`) |
| `messaging-history.set` | `{ chats, contacts, messages, isLatest, progress, syncType }` | history arrives after a fresh pair |
| `messaging-history.status` | `{ syncType, progress }` | progress of the history sync |
| `lid-mapping.update` | `{ mappings }` | a new lid ↔ phone-number mapping is learned |

```ts
sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
	if (qr) console.log('scan this:', qr)
	if (connection === 'open') console.log('connected as', sock.user?.id)
	if (connection === 'close') {
		const code = (lastDisconnect?.error as Boom)?.output?.statusCode
		if (code !== DisconnectReason.loggedOut) reconnect()
	}
})
```

#### Messages

| Event | Payload |
|---|---|
| `messages.upsert` | `{ messages, type }` — `type` is `'notify'` for live messages, `'append'` for history |
| `messages.update` | `[{ key, update }]` — status, edit, and receipt-like changes |
| `messages.delete` | `{ keys }` (a revoke) or `{ jid, all: true }` (chat cleared) |
| `message-receipt.update` | `[{ key, receipt }]` — delivery and read receipts |
| `message-capping.update` | `{ … }` — new-chat send quota |
| `link-preview.update` | `{ … }` — a link preview was resolved |

```ts
sock.ev.on('messages.upsert', ({ messages, type }) => {
	if (type !== 'notify') return
	for (const msg of messages) {
		if (msg.key.fromMe) continue
		const text = extractMessageText(msg.message) // never read .conversation directly
		console.log(msg.key.remoteJid, text)
	}
})
```

#### Chats and contacts

| Event | Payload |
|---|---|
| `chats.upsert` | `Chat[]` |
| `chats.update` | `Partial<Chat>[]` |
| `chats.delete` | `string[]` (jids) |
| `contacts.upsert` | `Contact[]` |
| `contacts.update` | `Partial<Contact>[]` |
| `blocklist.set` | `{ blocklist }` |
| `blocklist.update` | `{ blocklist, type }` |
| `presence.update` | `{ id, presences }` |
| `settings.update` | `{ … }` |

#### Groups and communities

| Event | Payload |
|---|---|
| `groups.upsert` | `GroupMetadata[]` |
| `groups.update` | `Partial<GroupMetadata>[]` |
| `group-participants.update` | `{ id, participants, action }` — `action` is `add`, `remove`, `promote`, `demote` |
| `group.member-tag.update` | `{ … }` |
| `community-owner.update` | `{ … }` |

```ts
sock.ev.on('group-participants.update', ({ id, participants, action }) => {
	console.log(`${participants.length} ${action} in ${id}`)
})
```

#### Channels

| Event | Payload |
|---|---|
| `newsletter-participants.update` | `{ id, author, new_role, action }` |
| `newsletter-settings.update` | `{ id, update }` |
| `newsletter-admin-profile.update` | `{ id, … }` |
| `limit-sharing.update` | `{ … }` |

#### Calls

| Event | Payload |
|---|---|
| `call` | `[{ id, from, status, isVideo, date }]` — `status` is `offer`, `ringing`, `accept`, `reject`, `terminate` |

_Also published at [docs/wiki/events.md](../docs/wiki/events.md)_

### Socket config reference

Every option `makeWASocket` accepts, grouped by what it changes.

#### Connection

| Option | Default | Meaning |
|---|---|---|
| `version` | pinned | the WhatsApp Web version string; `scripts/update-version.ts` refreshes it |
| `browser` | `Browsers.ubuntu('Chrome')` | the fingerprint sent on connect |
| `connectTimeoutMs` | `60_000` | how long to wait for the handshake |
| `defaultQueryTimeoutMs` | `60_000` | per-IQ timeout |
| `keepAliveIntervalMs` | `30_000` | websocket keep-alive |
| `retryRequestDelayMs` | `250` | delay between retries of one request |
| `maxMsgRetryCount` | `5` | decrypt retries before giving up |
| `syncFullHistory` | `false` | request the whole history on pair |
| `shouldSyncHistoryMessage` | — | filter what is synced |
| `markOnlineOnConnect` | `true` | appear online as soon as the socket opens |
| `fireInitQueries` | `true` | send the initial queries (blocklist, privacy, …) |
| `emitOwnEvents` | `false` | emit events for your own messages too |

#### Auth and session

| Option | Meaning |
|---|---|
| `auth` | the `AuthenticationState` — every adapter in this README returns one |
| `printQRInTerminal` | show the QR in the terminal |
| `pairingCode` / `requestPairingCode` | pair with a code instead |
| `AnchorGuard` | opt-in anti-crash guard (see above) |
| `AnchorGuardConfig` | options forwarded to the guard |

#### Media

| Option | Meaning |
|---|---|
| `generateHighQualityLinkPreview` | fetch a full thumbnail instead of a small one |
| `mediaUploadTimeoutMs` | upload timeout |
| `options` (in `sendMessage`) | per-message overrides, e.g. `{ quoted }`, `{ ephemeralExpiration }` |

#### Behaviour

| Option | Meaning |
|---|---|
| `getMessage` | callback used to re-fetch a message the store no longer has — needed for retries and decryption |
| `cachedGroupMetadata` | supply cached group metadata to skip a round trip |
| `enableAutoSessionRecreation` | recreate a broken signal session automatically |
| `enableRecentMessageCache` | keep recent messages in memory for retries |
| `logger` | a pino-compatible logger; `silent` for tests |

```ts
const sock = makeWASocket({
	auth: state,
	browser: Browsers.macOS('Desktop'),
	syncFullHistory: false,
	markOnlineOnConnect: false,
	generateHighQualityLinkPreview: true,
	getMessage: async key => (await store.loadMessage(key.remoteJid!, key.id!))?.message,
	logger: pino({ level: 'warn' })
})
```

_Also published at [docs/wiki/socket-config.md](../docs/wiki/socket-config.md)_

### Framework

`src/Framework` is a small, optional layer on top of the socket: a bot loop, per-chat session storage, media helpers and
group statistics. It is plain TypeScript, uses only `better-sqlite3` (already a dependency), and nothing in it is
required to use the socket itself.

```ts
import { Bot, MediaManager, SessionManager, SQLiteStore, StatsManager } from '@teamolduser/baileys'
```

### `SQLiteStore`

The key/value store the other pieces sit on. Synchronous, because `better-sqlite3` is.

```ts
const store = new SQLiteStore('./bot.db')

store.set('greeting', { text: 'hi' })   // values are JSON.stringify'd
store.get('greeting')                   // { text: 'hi' } | undefined
store.has('greeting')                   // boolean
store.del('greeting')
store.close()
```

| Method | Notes |
|---|---|
| `constructor(dbPath)` | opens or creates the file |
| `set(key, value)` | always JSON — a raw string that happens to be valid JSON round-trips correctly |
| `get(key)` | parsed value, or `undefined` |
| `has(key)` | `true` when a value exists |
| `del(key)` | removes one key |
| `close()` | closes the database |

### `SessionManager`

Per-chat session state on top of `SQLiteStore` — one row per jid, with a read-modify-write helper.

```ts
const sessions = new SessionManager(store)

sessions.set('919876543210@s.whatsapp.net', { step: 'awaiting-name' })
sessions.get('919876543210@s.whatsapp.net')            // { step: 'awaiting-name' }

sessions.update(jid, prev => ({ ...prev, step: 'done' }))  // updater gets the previous value
sessions.has(jid)                                       // boolean
sessions.delete(jid)
```

Keys are stored as `session_<jid>`, so a `SessionManager` and your own `SQLiteStore` keys never collide.

### `MediaManager`

Static helpers for the two conversions WhatsApp is picky about.

```ts
// image or video buffer -> WebP sticker, with optional pack metadata
const sticker = await MediaManager.convertToSticker(buffer, {
	packname: 'Anya',
	author: 'Teamolduser'
})

// audio buffer/path -> a voice note the client will render as PTT
const voice = await MediaManager.convertToVoiceNote(inputPathOrBuffer)
```

Both write to a temp file and shell out to `ffmpeg` when the format needs it, so `ffmpeg` must be on `PATH` for the
video/audio paths. Images that `sharp` can handle skip the subprocess.

### `StatsManager`

Group activity counters, for leaderboards and quiet-member reports.

```ts
const stats = new StatsManager('./bot.db', jid => sock.groupMetadata(jid))

stats.observeMessage(groupJid, userJid, isSticker)   // call from messages.upsert
stats.getTopUsers(groupJid, 10)                      // [{ id, count }]
stats.getTopStickers(groupJid, 10)
await stats.getGhosts(groupJid, connected, 30)       // members quiet for 30 days
stats.close()
```

`getGhosts` reads the participant list through the `groupMetaFn` you pass in, so it always works against current
membership rather than a stale cache.

### `Bot`

A ready-made loop: connect, reconnect on disconnect, pair on first run, and expose the socket.

```ts
import { Bot } from '@teamolduser/baileys'

const bot = new Bot({
	authFolder: './auth',
	phoneNumber: '919876543210',   // used only when the session is not registered yet
	logger: pino({ level: 'warn' })
})

bot.on('messages.upsert', ({ messages }) => {
	for (const msg of messages) console.log(msg.key.remoteJid)
})

await bot.start()
```

It owns the reconnect timer and the pairing flow, which is the part most bots get wrong: it waits for the socket to be
ready before requesting a pairing code, and it backs off between reconnect attempts instead of hot-looping.

### `Context`

A thin wrapper passed to handlers: the socket, the message, and the parsed sender/chat ids — so a handler does not have
to re-derive `remoteJid` and `participant` every time.

```ts
bot.on('messages.upsert', async ({ messages }) => {
	for (const msg of messages) {
		const ctx = Context.from(sock, msg)
		console.log(ctx.chat, ctx.sender, ctx.text)
	}
})
```

### Example

`src/Framework/bot-example.ts` is a runnable bot using all of the above. Copy it, point `authFolder` somewhere, and
`node dist/Framework/bot-example.js`.

_Also published at [docs/wiki/framework.md](../docs/wiki/framework.md)_

### Internals

A map of the folders you will end up in when something goes wrong below the socket API. None of this is required
reading to *use* the library — it is here so a bug report can name the file it belongs to.

### `src/Socket`

One file per protocol area; `index.ts` assembles them into the socket you get back from `makeWASocket`.

| File | Responsibility |
|---|---|
| `socket.ts` | the connection itself: websocket, handshake, keep-alive, QR/pairing |
| `messages-send.ts` | `sendMessage` and every relay it builds |
| `messages-recv.ts` | decoding incoming stanzas, decrypt, receipts, retries |
| `groups.ts` | `group*` methods — participants, invites, settings |
| `communities.ts` | `community*` methods |
| `chats.ts` | chat-level operations (archive, pin, mute, read) |
| `business.ts` / `business-mex.ts` | catalog, profile, quick replies over the `w:mex` endpoint |
| `newsletter.ts` | the 55 channel methods |
| `mex.ts` | the generic `w:mex` query helper the other modules use |
| `username.ts` | the username (handle) API |
| `Client/websocket.ts` | the socket transport, reconnect and close semantics |

If a call returns `405` or `428`, the version string in `src/Defaults` is the first thing to check — the endpoints move
with the WhatsApp Web release.

### `src/Signal`

The crypto layer.

| File | Responsibility |
|---|---|
| `libsignal.ts` | the store adapter between Baileys keys and `libsignal` |
| `lid-mapping.ts` | lid ↔ phone-number mapping, used by every `…Alt` field |
| `Group/group_cipher.ts` | group message encrypt/decrypt |
| `Group/group-session-builder.ts` | building a sender-key session for a group |
| `Group/sender-key-*.ts` | the sender-key state machine (record, state, message, distribution, chain key) |
| `Group/keyhelper.ts` | key derivation helpers |
| `Group/ciphertext-message.ts` | the sender-key ciphertext wrapper |

The sender-key files are what `pickSenderKeyRecipients` and `senderKeyResetSummary` in `src/Extras/sender-key-memory.ts`
report on — a fan-out bug almost always ends up here.

### `src/Voip`

Call signalling and the WASM engine.

| File | Responsibility |
|---|---|
| `signaling.ts` | offer / accept / reject / terminate stanzas |
| `call-manager.ts` | call state and the event timeline |
| `incoming-call.ts` | the receive side of an offer |
| `relay-transport.ts` | the relay socket for media |
| `playlist-feeder.ts` | feeding an audio queue into a call |
| `resource-manager.ts` | the WASM engine's resources |
| `wasm-engine.ts` / `wasm-assets.ts` | loading and verifying `whatsapp.wasm` |

`npm run build` runs `scripts/verify-voip-assets.mjs`, which checks the WASM checksums — a mismatched asset is the most
common reason calls fail to start after an upgrade.

### `src/WABinary`, `src/WAM`, `src/WAUSync`

| Folder | Responsibility |
|---|---|
| `WABinary` | the binary node encoder/decoder — `encode.ts`, `decode.ts` |
| `WAM` | the metrics/binary-info layer that wraps outgoing nodes |
| `WAUSync` | the usync query framework and its protocols |

`WAUSync/Protocols` has one file per lookup type: `USyncContactProtocol`, `USyncDeviceProtocol`,
`USyncDisappearingModeProtocol`, `USyncStatusProtocol`, `USyncTextStatusProtocol`, `USyncUsernameProtocol`,
`UsyncBotProfileProtocol`, `UsyncLIDProtocol`. When a lookup returns nothing, that protocol is where it stopped.

### `src/Defaults`

`phonenumber-mcc.ts` is the country-code → MCC table used when building a device fingerprint. `index.ts` holds the
WhatsApp Web version string and the default socket config.

### `src/Extras/MessageBuilder/bot-signature.ts`

Bot signature verification: `loadBotSignatureRoot`, `constructSignaturePayload`, `isParsableCertificateChain`,
`verifyBotSignature`. Used when you need to prove a message really came from a verified bot account rather than one that
merely set the header.

### Reading a stack trace

| Frame looks like | Area |
|---|---|
| `Socket/messages-recv` | decryption, retries, receipts |
| `Socket/messages-send` | payload building, relay |
| `Signal/Group/*` | group fan-out and sender keys |
| `Voip/*` | call signalling |
| `WABinary/*` | malformed node — usually a wrong field type in a hand-built proto |
| `WAUSync/*` | a lookup returned nothing |
| `Extras/*`, `Addons/*` | the ported helpers; each file names its source in the header |

### Addons that are entry points rather than helpers

Three files in `src/Addons` and `src/Utils` do not export a function — they are alternative entry points:

| File | What it is |
|---|---|
| `Addons/voip-calling.ts` | a **standalone** voice-calling client on its own linked-device session. It opens its own socket and its own auth folder; it cannot share state with your bot socket. Use it when you want a dedicated calling session alongside a normal bot. |
| `Addons/voip-compat.ts` | the `@innovatorssoft/baileys` naming layer over the socket-integrated VoIP engine (`sock.initiateCall()`). Nothing here starts a second engine — it only renames (`CallSession` = `ActiveCall`, plus `CallDirection` / `CallMediaType`). |
| `Utils/message-composer.ts` | a one-line re-export of `Addons/message-composer`, kept so older import paths keep working. |

### Type-only folders

`src/Types` holds interfaces with no runtime code: `Bussines.ts` (catalog and profile shapes), `RichType.ts` (rich
message payloads), `Signal.ts` (the signal key maps), `USync.ts` (usync query shapes), plus `Socket.ts`, `Events.ts`,
`Auth.ts` and `Chat.ts` which the public API is typed against. They never need importing at runtime — `import type` only.

### The remaining internals

`sender-chain-key.ts`, `sender-message-key.ts`, and `sender-key-distribution-message.ts` / `sender-key-message.ts` /
`sender-key-name.ts` / `sender-key-record.ts` / `sender-key-state.ts` under `src/Signal/Group` are the sender-key state
machine in its individual pieces; `Voip/worker-bootstrap.ts` starts the WASM worker; `WAM/BinaryInfo.ts` describes the
metrics wrapper; `WAUSync/USyncQuery.ts` plus `Protocols/UsyncBotProfileProtocol.ts` and `Protocols/UsyncLIDProtocol.ts`
are the query framework and its two least-used protocols. `Socket/Client/types.ts` is the transport interface.

_Also published at [docs/wiki/internals.md](../docs/wiki/internals.md)_

### Useful exports

A few things you will reach for once a bot grows.

| Export | What it is |
|---|---|
| `TTLCache` | in-memory cache with per-entry expiry — safer than a plain `Map` for anything user-driven |
| `MessageStore` | keeps a copy of received messages so deleted ones can still be read |
| `extractMessageContent` | unwraps ephemeral / view-once / edited wrappers and returns the inner message |
| `extractMessageText` | pulls the text out of any message type |
| `isDeleteMessage` / `getDeletedMessageKey` | detect a revoke and find what it pointed at |
| `getMessageType` / `getMediaType` | classify a message without a long switch |
| `normalizeJidForSend` / `parseJid` | fix a jid before it reaches the wire |
| `loadOptionalModule` | load a driver lazily with a helpful error when it is missing |

_Also published at [docs/wiki/useful-exports.md](../docs/wiki/useful-exports.md)_

### Updating the WhatsApp Web version

WhatsApp Web pins a version string; when it moves, an old client starts failing with `405`/`428`. Two things keep it
current:

```bash
node scripts/update-version.ts        # fetch the current version and write it into src/Defaults
npm run proto:update                  # refresh the proto definitions
```

`.github/workflows/update-version.yml` runs the first daily at 00:00 IST and opens a PR with the change, and
`proto-watch.yml` does the same for the proto. Both open a branch and a pull request rather than pushing to `master`, so
you review the bump before it ships.

### Getting a tarball

`.github/workflows/tarball.yml` packs the library and hands you the file two ways: as a workflow artifact, and on a
`tarball` branch where the URL does not expire.

```bash
# from the Actions tab, or on every push to master
npm install https://github.com/OWNER/REPO/raw/tarball/teamolduser-baileys-1.0.0-beta.1.tgz
```

The branch always holds exactly one `.tgz` — a new run replaces the old file instead of piling up. `npm pack` output
cannot be read with `--json` here: the `prepack` build writes to stdout and corrupts it, so the workflow takes the
filename from `ls -t`.

`publish-selected-docs.yml` ships the same tarball to the docs destination repository under `tarball/`, so that repo can
be installed from as well.

_Also published at [docs/wiki/updating-version.md](../docs/wiki/updating-version.md)_

### Notable behaviour changes

Things that differ from upstream Baileys, and will surprise you if you are porting code over.

#### Auth state

- **`list()` on every adapter.** Upstream leaves it out; here every adapter can enumerate its records, which is what
  makes `migrateAuthState` possible.
- **`session` on every adapter.** Omit it and the layout is byte-identical to before, so existing deployments do not
  move.
- **`creds.saved` in the migration result.** A bare state cannot persist itself — pass the adapter object and it is
  saved for you.
- **SQLite needs `dbPath`.** A missing or misspelled option throws instead of silently creating an in-memory database.

#### Messages

- **`extractMessageContent` first.** Wrapper keys (`ephemeralMessage`, `viewOnceMessage`, …) mean `conversation` is
  empty for most real traffic.
- **`sendMessage` returns the sent message.** Use `msg.key` for reactions and edits, not the key you passed in.
- **Retries need `getMessage`.** Without it, a decrypt retry on an old message cannot be resolved.

#### Socket

- **`AnchorGuard` is opt-in** and needs its own package; nothing is loaded unless you ask for it.
- **`markOnlineOnConnect` defaults to `true`.** A bot that should stay invisible must set it to `false`.
- **`emitOwnEvents` defaults to `false`.** Set it to `true` if you want your own messages in `messages.upsert`.

#### Tooling

- **`npm run test2`** is the local suite (202 tests, no network). `npm test` is the jest suite over `src/__tests__`.
- **`npm run readme`** checks that the README is complete: every source file mentioned, every internal link resolving,
  the index listing every section, and `.github/README.md` in step. `npm run readme:check` is the quiet CI form —
  it exits non-zero on drift. Neither command rewrites anything.
- **`npm run readme:generate`** rebuilds the reference sections from `docs/wiki/`, `docs/en/` and the source, and writes
  them to `README.generated.md`. The README itself is not touched — diff the two and copy what you want.
- **`npm run readme:apply`** writes those sections straight into the README, but only between the marker pairs
  (`<!-- BEGIN GENERATED: wiki -->` … `<!-- END GENERATED: api -->`) — hand-written prose is never touched. It always
  rebuilds the index as well, so a single command refreshes both the reference blocks and the table of contents.
- **`npm run readme:index`** rebuilds only the `📚 Index` table of contents from **every** heading — H1, H2 and H3 —
  as a nested list, leaving every other line alone. Anchors follow GitHub's rules
  (`## ⚠️ Important Notice` → `#-important-notice`) and duplicate titles get the `-1`, `-2` suffixes GitHub adds.
  Headings inside code fences are skipped, so a bash comment like `# or` is not mistaken for a section.
  `node scripts/generate-readme.mjs --index --depth=4` also lists the H4 sub-sections.
- **`node scripts/sync-readme.mjs`** copies the README into `.github/README.md` with the asset paths adjusted.
- **`clearAuth()` wipes memory too.** It empties the store *and* resets the in-memory `creds` object in place (same
  object identity, fresh contents). Without that reset the next `saveCreds()` — which a live socket calls constantly —
  writes the old credentials straight back into the store that was just emptied, and the account silently comes back.
  Every adapter does this through `resetCredsInPlace()` in `src/Extras/auth-store.ts`.
- **`yarn install`, not `npm install`, in this repository.** `yarn.lock` is a yarn 4 lockfile; npm rewrites that file in
  the old v1 format whenever it runs. If you did run `npm install`, run `yarn install` once before committing so the lock
  you push is the yarn 4 one.
- **`npm run check:tracked`** proves that everything the build, the docs site and the workflows need is actually tracked
  by git. A `.gitignore` rule like `docs/*` keeps the wiki out of the repository while the files still sit on disk, so
  CI builds an empty site and the failure looks unrelated. Runs as the first step of the build workflow.
- **`node scripts/live-check.mjs`** exercises the risky paths against a real account; see `docs/live-test.md`.

_Also published at [docs/wiki/behaviour-changes.md](../docs/wiki/behaviour-changes.md)_

### Coming from upstream Baileys

The API is a superset: if your code works against WhiskeySockets/Baileys it works here, with the differences listed in
[Notable behaviour changes](#️-notable-behaviour-changes). A few mechanical steps when switching:

#### 1. The package name

```diff
-import makeWASocket from '@whiskeysockets/baileys'
+import makeWASocket from '@teamolduser/baileys'
```

#### 2. Auth state — same call, more options

```ts
// unchanged
const { state, saveCreds } = await useMultiFileAuthState('./auth')

// or a database, with the same call shape
const { state, saveCreds } = await usePostgresAuthState({ connectionString: process.env.DATABASE_URL })
```

`useMultiFileAuthState` still takes `(folder)`, so an existing call site needs no edit. Moving to a database later is a
`migrateAuthState` call, not a re-pair.

#### 3. Reading messages

```diff
-const text = msg.message?.conversation
+const text = extractMessageText(msg.message)
```

#### 4. `libsignal`

This fork pins `libsignal` to its own build (`npm:@teamolduser/libsignal`). Do not override it with the upstream
package — the wire format and the session store expectations differ.

#### 5. Optional drivers

`better-sqlite3`, `pg`, `mysql2`, `mongodb`, `ioredis`, `redis`, `@libsql/client` and `@seald-io/nedb` are regular
dependencies, so a plain install is enough. They are loaded lazily — a bot that never touches Postgres never pays for
it.

#### 6. Where the extras live

| You want | Import from |
|---|---|
| an auth backend | `use*AuthState` — package root |
| a ported builder (`makeQuestionMessage`, `buildSplitPayment`, …) | package root (`src/Extras`) |
| a small helper (`scheduleMessage`, `generateVCard`, `searchMessages`, …) | package root (`src/Addons`) |
| the socket itself | package root (`makeWASocket`) |

Everything is exported from the root; there are no deep import paths to remember.

_Also published at [docs/wiki/migration.md](../docs/wiki/migration.md)_

### Troubleshooting

#### Connection

| Symptom | Likely cause | Fix |
|---|---|---|
| `405` / `428` right after connect | the pinned WhatsApp Web version is stale | `node scripts/update-version.ts`, or wait for the daily `update-version` workflow |
| `401` / `device_removed` | the session was logged out from the phone | delete the auth folder and pair again |
| `Stream Errored (conflict)` | the same credentials are used by two processes | one auth folder per running bot, always |
| `Connection Closed (515)` | expected right after pairing | reconnect once; do not treat it as an error |
| QR keeps refreshing | the phone never completes the scan | check the clock on the phone; pairing codes expire quickly |
| `ENOTFOUND` / proxy errors | egress blocked | allow `*.whatsapp.net`, `*.whatsapp.com`, `web.whatsapp.com` |

#### Pairing

| Symptom | Cause | Fix |
|---|---|---|
| `409` when requesting a code | a code was already requested and is still pending | wait for it to expire, then request again |
| The phone never shows the prompt | the IQ fired before `pair-device` arrived | use `createPairingQueue` from `src/Addons/pairing-fix.ts` |
| Code is not 8 characters | custom codes must be 8 uppercase letters/digits | `'ANYA1234'`, not `'anya'` |
| `Socket is required` | a helper was called with `undefined` instead of the socket | pass `sock` — most extras take it as the first argument |

#### Messages

| Symptom | Cause | Fix |
|---|---|---|
| Messages arrive but never decrypt | pre-keys missing — the auth state was copied without `pre-key` records | migrate with `migrateAuthState`, never copy only `creds.json` |
| `conversation` is empty | the message is wrapped (ephemeral, view-once, edited) | `extractMessageContent` / `extractMessageText` |
| Sends hang on status updates | the `w:mex` status endpoint changed | see [Message content](../docs/wiki/message-content.md) |
| Button or AIRich renders differently | the client validates payloads, not us | send one to a test number before shipping |
| `Cannot read properties of undefined (reading 'undefined')` when replying | the quoted key came from a different message | quote `msg.key`, not a key you built |
| The bot replies in every group except one | that group has `announcement` on and the bot is not an admin | check `groupMetadata(jid).announce`, then promote the bot |

#### Identity

| Symptom | Cause | Fix |
|---|---|---|
| The id looks like a lid, not a phone number | newer accounts are addressed by lid | read `participantAlt` / `senderPn`, or use `splitJidsByType` |
| A jid you built silently fails | the number is not on WhatsApp | `sock.onWhatsApp(number)` first |
| Group members show different ids than before | lid migration in progress | map through `lid-mapping.update`, do not rewrite stored jids |

#### Build and runtime

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot find module 'better-sqlite3'` | Node < 22, or the native module was not rebuilt | `npm rebuild better-sqlite3` |
| `ERR_MODULE_NOT_FOUND` after a local build | `tsc` ran without `tsc-esm-fix` | `npm run build` (it runs both) |
| Tests fail with `createRequireEsmError` | jest ran without the ESM flag | `npm test` (the script sets `--experimental-vm-modules`) |
| Not sure whether your build really works | — | `node scripts/live-check.mjs --check 1..4` on a paired number; see `docs/live-test.md` |
| Migrated backends but the bot still asks for a QR | creds were copied but not saved | pass the adapter to `migrateAuthState`, or call `saveCreds()` |

_Also published at [docs/wiki/troubleshooting.md](../docs/wiki/troubleshooting.md)_

## 📘 Feature guides

Longer walk-throughs, one per feature. The same guides are published under [`docs/en/`](../docs/en/) for the docs site.

### account health

### 🛡️ Account health signals

WhatsApp tracks how an account reaches out to people it has never talked to, and tells its client where it stands. Reading those two signals is far more dependable than guessing a safe pause.

Both are the same `w:mex` queries WA Web runs, so the answer comes from WhatsApp's server, not from a local count:

| Function | Persisted query | When it can be called |
| --- | --- | --- |
| `fetchNewChatMessageCap()` | `WAWebMexFetchNewChatMessageCappingInfoJobQuery` (`27910975521856601`) | any time after connecting |
| `fetchAccountReachoutTimelock()` | `WAWebMexFetchReachoutTimelockJobQuery` (`23983697327930364`) | any time after connecting |

#### New-chat quota

```js
const cap = await sock.fetchNewChatMessageCap()
```

What comes back:

| Field | Meaning |
| --- | --- |
| `status` | `NONE` → `FIRST_WARNING` → `SECOND_WARNING` → `CAPPED`, WhatsApp's own escalation ladder |
| `capped` | `true` once `status` is `CAPPED`: sending to new chats is refused |
| `warned` | `true` on both `FIRST_WARNING` and `SECOND_WARNING` |
| `unlimited` | `true` when the server sent no quota (or a negative one), so there is nothing to count down |
| `totalQuota` | the new-chat allowance for one cycle |
| `usedQuota` | how much of it the cycle has used |
| `remaining` | `totalQuota - usedQuota`, never negative; `null` when `unlimited` |
| `cycleStart`, `cycleEnd` | start and end of the cycle, **unix seconds** — multiply by 1000 for `new Date` |
| `serverTime` | the server clock when it answered, to compare `cycleEnd` without trusting your machine's clock |
| `oteStatus`, `mvStatus`, `subscriptionStatus` | verification and subscription status that ride along in the answer |
| `response` | the raw reply, if you want a field that is not mapped yet |

Only **starting** a chat with a number you have never talked to uses the quota. Replying in a conversation someone else started does not count, and neither does sending again to an existing chat.

Worth knowing: this query asks for one kind of quota, `INDIVIDUAL_NEW_CHAT_THREAD` — the new-chat **thread** quota, not a message count. Earlier Anya builds sent `INDIVIDUAL_NEW_CHAT_MSG`, a name no WhatsApp client has, which is why the call could come back with an error or empty numbers, and returned the raw reply without the fields above. The server also pushes this state on its own as the `message-capping.update` event (the raw payload, snake_case). A send that WhatsApp refuses because of the quota (ack error `475`) raises the same event with `capping_status: 'CAPPED'`, the `jid` and the `messageId` of the rejected message, and is never retried.

#### Reachout timelock

```js
const lock = await sock.fetchAccountReachoutTimelock()
```

| Field | Meaning |
| --- | --- |
| `isActive` | the account is currently restricted from contacting new people |
| `timeEnforcementEnds` | a `Date` for when the restriction lifts, `undefined` when the server sends `0` |
| `enforcementType` | the reason — `BIZ_QUALITY` is quality-based, `BIZ_COMMERCE_VIOLATION_*` are policy categories |

Calling it also emits `connection.update`, so one call informs the whole bot. The state also arrives unasked:

```js
sock.ev.on('connection.update', ({ reachoutTimeLock }) => {
  if (reachoutTimeLock?.isActive) stopSending()
})
```

#### Using it as a guard

```js
const guard = async () => {
  const lock = await sock.fetchAccountReachoutTimelock()
  if (lock.isActive) return { send: false, reason: 'reachout timelock until ' + lock.timeEnforcementEnds }

  const cap = await sock.fetchNewChatMessageCap()
  if (cap.capped) return { send: false, reason: 'new-chat quota used up until ' + new Date(cap.cycleEnd * 1000) }
  if (cap.warned) return { send: false, reason: 'WhatsApp has already warned this account: ' + cap.status }
  if (cap.remaining !== null && cap.remaining < 10) return { send: false, reason: 'only ' + cap.remaining + ' left in this cycle' }

  return { send: true, remaining: cap.remaining }
}
```

Check before a round and again every batch — `SECOND_WARNING` is the last state before the quota lands, so stopping there is the difference between a pause and a block.

> [!NOTE]
> Bulk sending through an unofficial client is outside WhatsApp's Terms of Service, whatever the recipients agreed to. The sanctioned route for opt-in bulk sending is the WhatsApp Business Platform. These signals reduce the chance of tripping an automatic limit; they do not make an account safe.

---

_Also published at [docs/en/account-health.md](../docs/en/account-health.md)_

### auth state

### Database auth states

```ts
import makeWASocket, { usePostgresAuthState, useMySQLAuthState, useRedisAuthState, useNekoDBAuth, useTursoAuthState } from '@teamolduser/baileys'

// PostgreSQL (`pg` is installed with the package) - pass a connectionString / config, or your own Pool
const { state, saveCreds, clearAuth, close } = await usePostgresAuthState({ connectionString: process.env.DATABASE_URL, session: 'bot-1' })
// MySQL / MariaDB (`mysql2` is installed with the package)
const mysql = await useMySQLAuthState({ uri: 'mysql://user:pass@host/db', table: 'baileys_auth', session: 'bot-1' })
// Redis (`ioredis` is installed with the package) - one hash per key type: <prefix>:<session>:<type>
const redis = await useRedisAuthState({ uri: 'redis://localhost:6379', session: 'bot-1' })
// NekoDB - pass a connected NekoDB instance
const neko = await useNekoDBAuth(db, 'baileys_auth')
// Turso / libSQL - local file, or Turso cloud with a token
const tursoLocal = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })
const tursoCloud = await useTursoAuthState({ url: 'libsql://my-db-myorg.turso.io', authToken: process.env.TURSO_TOKEN, session: 'bot-1' })

const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)
```

- The MongoDB (`mongodb`), MySQL/MariaDB (`mysql2`), PostgreSQL (`pg`), and Redis (`ioredis`) drivers are declared as runtime dependencies, so the package manager installs them automatically. They are loaded only when the corresponding adapter is used. NekoDB still expects you to pass an already connected database instance.
- `session` lets several bots share one backend — a table, a Redis prefix, a folder or a file. Every adapter takes it
  now, including the file-based ones (`useMultiFileAuthState(folder, { session })`, `useSingleFileAuthState(file, { session })`);
  see sessions across the file-based adapters. `clearAuth()`
  deletes only that session, `close()` closes a connection the helper created itself (a pool / client you passed in is
  never closed).
- Writes are transactional (PostgreSQL / MySQL) or `MULTI` (Redis). Table names must be plain identifiers.
- `makeAuthStateFromStore(store)` builds the same thing on top of any key/value store that implements `AuthStore`.

### MongoDB Auth State 2 (`useMongoAuthState2`)

`useMongoAuthState2` is the Elaina-compatible MongoDB adapter added without changing the existing `useMongoAuthState` API. The `mongodb` driver is declared as a runtime dependency and is installed automatically with the package. Create a MongoDB-backed auth state from a URI:

```ts
import makeWASocket, { useMongoAuthState2 } from '@teamolduser/baileys'

const auth = await useMongoAuthState2({
  uri: process.env.MONGODB_URI!,
  dbName: 'whatsapp',
  collectionName: 'baileys_auth',
  session: 'bot-1'
})

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// On an intentional logout/reset, this deletes only the selected session.
// await auth.clearAuth()

// Call only when this auth-state instance is no longer needed.
// Since the adapter created the client from `uri`, close() closes that client.
// await auth.close()
```

You can instead pass an existing MongoDB `client`, `db`, or `collection`; those resources remain caller-owned and `close()` will not close them. Use the same `session` string to resume a bot and a different string for each independent bot sharing the collection. `clearAuth()` is destructive for that session. The adapter creates a unique `{ session, type, id }` index and uses batched reads plus `bulkWrite` for key updates/removals.

### SQLite Auth State 2 (`useSqliteAuthState2`)

`useSqliteAuthState2` is a separate Elaina-compatible SQLite adapter. The existing `useSqliteAuthState` remains unchanged. This adapter adds `clearAuth()` and `close()` lifecycle methods.

```ts
import makeWASocket, { useSqliteAuthState2 } from '@teamolduser/baileys'

const auth = await useSqliteAuthState2({ dbPath: './auth.db' })
const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Destructive: clears auth rows from the `creds` and `signal_keys` tables.
// await auth.clearAuth()

// Closes the database only when the adapter opened it from dbPath.
await auth.close()
```

To reuse an existing `better-sqlite3` connection, pass `{ database: db }`. The adapter will not close a caller-owned database handle. The adapter uses the Elaina-compatible `creds` and `signal_keys` schema. `better-sqlite3` is already a dependency of this package.

---

### Turso / libSQL Auth State (`useTursoAuthState`)

One adapter for both shapes Turso offers, because `@libsql/client` speaks the same protocol for each:

| Target | What to pass | Resulting URL |
| --- | --- | --- |
| Local file | `{ path: './auth.db' }` | `file:./auth.db` |
| Turso cloud | `{ url: 'libsql://<db>-<org>.turso.io', authToken: '…' }` | used as given |
| Explicit | `{ url: 'file:./auth.db' }` | used as given |

```ts
import makeWASocket, { useTursoAuthState } from '@teamolduser/baileys'

// local database file — no account, no token
const auth = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Turso cloud
const cloud = await useTursoAuthState({
    url: 'libsql://my-db-myorg.turso.io',
    authToken: process.env.TURSO_TOKEN,
    session: 'bot-1'
})

// Destructive: removes every row of this session
// await auth.clearAuth()

// Closes the client only when the adapter created it
await auth.close()
```

- A token is only sent when you supply one, so the local file needs neither an account nor a token.
- `session` lets several bots share one database; `table` (default `baileys_auth`) names the table. Rows are
  `(session, type, id, value)` with a composite primary key.
- `apply()` runs through `client.batch(…, 'write')`, so an app-state patch lands in one transaction.
- `@libsql/client` is a declared runtime dependency but is loaded lazily — a bot that never uses Turso does not touch it.
- `toLibsqlUrl({ path })` is exported if you want to resolve the URL yourself before calling.

---

### Moving credentials to another backend

`migrateAuthState` copies creds and every signal key record from one adapter to another, so the device stays paired.

```ts
import { migrateAuthState } from '@teamolduser/baileys'

const from = await useMultiFileAuthState('./auth')
const to = await usePostgresAuthState({ pool, session: 'prod' })

const { creds, counts, verified } = await migrateAuthState({ from, to })
// creds: { copied: true, saved: true }   counts: { 'pre-key': 32, … }   verified: true
```

- `from` and `to` take the adapter object or the bare `.state`. With the adapter, `saveCreds()` is called for you.
- Records stream in batches (`batchSize`, default 100); re-running resumes because existing ids are skipped.
- The source is never modified. Once `verified` is true, clear it yourself with `oldAuth.clearAuth()` — take a backup
  first.
- Every adapter implements `list(type)`, so any of them can be the source.

_Also published at [docs/en/auth-state.md](../docs/en/auth-state.md)_

### builder

Anya includes the ported MessageBuilder module under `src/ported/MessageBuilder/`. The public entry point remains the existing `src/ported/index.ts` barrel, which is re-exported from the package root. The internal folder is not intended to be imported as a separate package entry point.

### Imports

```ts
import {
  MessageBuilder,
  MB,
  Button,
  ButtonV2,
  AIRich,
  AIRichCarousel,
  Toolkit,
  MESSAGE_BUILDER_VERSION,
  mapSection
} from '@teamolduser/baileys'
```

`MB` is an alias of `MessageBuilder`. The builder classes are available as named exports and through the `MessageBuilder`/`MB` namespace object.

### Build an interactive button message

```ts
const message = new Button(sock)
  .setTitle('Anya Menu')
  .setBody('Choose an action')
  .setFooter('Powered by Anya')
  .addReply('Say hello', 'hello')

await message.send('14155550123@s.whatsapp.net')
```

Builder methods can differ by builder type. Consult the method declarations/source for the exact methods available in your installed revision. Use `.build(jid)` when the builder supports building a payload without sending it, and `.send(jid)` when you want it sent directly.

### Static helper attachment

Anya registers helper functions from the MessageBuilder extras, Meta AI, bot-signature, native-flow, and message-helper modules onto the relevant static containers at runtime. The registration is performed internally by `src/ported/MessageBuilder/attach-static-helpers.ts`; it does not require a second public import.

For example, helpers such as `mapSection` can be called through the attached namespace:

```ts
const map = MB.mapSection({ items: [], queryStatus: 'FETCHED' })
const sameMap = MessageBuilder.mapSection({ items: [], queryStatus: 'FETCHED' })
```

The helper is also available as a named package export where exported by the barrel. Prefer named imports for code that does not specifically need Elaina-style static access. Static registration preserves existing class members and does not overwrite an existing property with the same name.

### Main builder families

- `Button` and `ButtonV2` — interactive native-flow buttons.
- `AIRichCarousel` — carousel-style AI-rich sections. The Elaina name `Carousel` is **`CarouselV2`** in this package (the bare name `Carousel` is not exported); `CarouselV2`, `AIRichCarouselV2` and `MB.Carousel` are the same class. See [Elaina-derived names and the V2 aliases](../elaina-interactive-apis-v2.md).
- `AIRich` — AI-rich response payloads and sections. It also offers `addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable` and `addSports` (from elaina commit `f025122`); see the README for the arguments.
- `Toolkit` — helper utilities exposed by the ported builder module.
- `MessageBuilder` / `MB` — namespace-style access to the builder classes and registered helpers.

### Compatibility notes

WhatsApp's interactive payloads are protocol-sensitive and some renderers are client-specific. A successfully built payload does not guarantee every button or AI-rich primitive will render on every WhatsApp client. Validate your target devices and keep regression tests around helper calls used by your application.

### Access paths

The global `MB` works as in elaina-baileys: `new MB.AIRich(sock)` / `new AIRich(sock)` take the socket as the first argument.

The socket also carries bound versions, so no `sock` argument is needed there:

- `new sock.AIRich()` / `sock.MB.AIRich` (also `Button`, `ButtonV2`, `Carousel`): bound to that socket.
- `sock.MB.sendA2UI(jid, components, options)` and the other `send*` helpers: `sock.MB` adds the socket.

_Also published at [docs/en/builder.md](../docs/en/builder.md)_

### calls

### 🎧 Call queues, screen sharing and group calls

These options belong to the media-call methods of the unified `voip` client — `voip.call()`, `voip.callGroup()` and `voip.joinGroupCall()` (the Elaina-style engine). See the [unified VoIP API](#unified-voip-api) note about switching engines, and Voice calling for the basics.

#### Audio queue

```js
const voip = await sock.makeVoipClient()

const call = await voip.call('628123456789', {
  playlist: ['intro.mp3', 'song.mp3'],
  idleGraceMs: 30000,   // wait this long after the queue runs dry before hanging up
  durationMs: 0         // 0 = no fixed length, the queue decides
})

call.enqueue('next-track.mp3')   // add a track while the call is running
call.queued()                    // tracks still waiting
call.nowPlaying()                // the track being played
call.skip()                      // jump to the next track
```

By default the call ends once the queue is empty, after `idleGraceMs` (0 unless you set it); pass `endWhenQueueEmpty: false` to keep it open until you end it. Sources can be files, URLs or anything ffmpeg reads.

#### Video queue

One-to-one and group calls both accept video. Frames come from ffmpeg just like the audio does, so the video source can be a file, a URL, a still image or a `lavfi:` generator.

```js
const call = await voip.call('628123456789', {
  video: true,
  videoPlaylist: ['clip.mp4'],
  playlist: ['song.mp3'],
  durationMs: 0
})

call.on('videotrack', track => console.log('now showing', track))
```

```js
const call = await voip.callGroup('12345-67890@g.us', {
  video: true,
  videoPlaylist: ['clip.mp4']
})
```

Video has its own queue, separate from the audio queue: `playVideo`, `enqueueVideo`, `skipVideo`, `queuedVideo` and `nowPlayingVideo`, with the `videotrack` and `videotrackend` events. The rule for ending the call stays tied to the audio queue, so the call ends when the audio runs out, not when the pictures do.

A still image is looped rather than shown for a single frame, which makes it an easy way to send a steady card:

```js
await voip.call('628123456789', { video: true, videoSource: './poster.jpg', playlist: ['song.mp3'] })
```

The engine picks the resolution and frame rate when the call connects, and the feeder scales to fit, padding so the aspect ratio is kept. Frames go to the WASM encoder as I420. When the queue runs dry the last frame is held instead of cutting to black, so a stall reads as a frozen picture, not a flicker.

Audio and video are two ffmpeg processes with two different clocks. Playing the same file through both will drift apart; if you need the two locked together, give the file to `playlist` only and keep the picture a still image.

#### Screen sharing

The same video, sent as a screen share rather than as a camera. It is a separate WASM entry point, so the receiver sees it labelled as a shared screen instead of as if the bot turned its camera on.

```js
const call = await voip.call('628123456789', {
  screenShare: true,
  videoPlaylist: ['slide.png'],
  playlist: ['narration.mp3']
})
```

`screenShare: true` already implies `video: true`. Switch it on and off mid-call with `call.startScreenShare()` and `call.stopScreenShare()`; `call.isScreenShare()` reports which one is live.

Which is better depends on what you send, and both are worth testing on a real call:

- **Screen share** suits still content — slides, lyrics, a single card. The encoder favours sharpness over motion, and a 16:9 source is not forced into a portrait camera frame.
- **The camera path** suits moving pictures and reaches everyone. Screen sharing is gated by `calling_screen_share_milestone_version`: a recipient on an older WhatsApp gets an "please update" dialog instead of your content. Groups also cap how many participants may share, and usually only one may share at a time.

#### Group calls

```js
const call = await voip.callGroup('12345-67890@g.us', {
  playlist: ['one.mp3', 'two.mp3'],
  idleGraceMs: 30000,
  durationMs: 0
})
```

`callGroup` reads the member list from the group's metadata, resolves each member's LID and devices, then calls them all. Pass `participants` to call only some of them, or `metadata` if you already have it and want to skip the fetch.

To join a call somebody else started, hand `joinGroupCall` what the incoming offer says:

```js
const call = await voip.joinGroupCall({
  callId,
  callCreatorJid,
  groupJid,
  playlist: ['one.mp3']
})
```

The queue behaves the same in a group call as in a one-to-one call.

Media is produced by ffmpeg: Anya uses the bundled `ffmpeg-static` binary when it exists and falls back to `ffmpeg` on the `PATH`; set `ffmpegPath` on the client to point at a specific binary. The VoIP resources (`whatsapp.wasm`, `loader.js`, `worker-modules.js`) are WhatsApp Web's own files, carried byte for byte; `npm run verify:assets` re-checks their checksums.

---

_Also published at [docs/en/calls.md](../docs/en/calls.md)_

### elaina parity

`src/Extras` is ported from [elaina-baileys](https://github.com/rexxzyid/elaina-baileys). This page records how
close the port is, so "ported" does not have to mean "trust me".

### What "parity" means here

Each ported module is compared with its elaina source after **stripping types and minifying both sides** through
esbuild. Formatting, comments, TypeScript annotations and `import type` lines therefore cannot hide a difference;
anything that still differs is a real decision.

```bash
npm i -D esbuild
node scripts/audit-elaina-parity.mjs /path/to/elaina-baileys-main
```

Current result against elaina-baileys **1.4.7**:

```
15 identical, 0 expected differences, 0 unexplained
```

A deliberate local change is not drift. Record it, with a reason, and the audit stays green:

```bash
node scripts/audit-elaina-parity.mjs ../elaina-baileys-main \
  --update native-flow.ts --reason "raised the button cap after testing the current Web build"
```

That writes an entry into `parity-baseline.json` (module, a hash of the normalised code, the reason, the date).
From then on the report says `intentional`, not `UNEXPLAINED`. The hash is what makes this safe: change that module
again without recording it and the audit fails, with a note that the earlier reason no longer describes the code.

```bash
node scripts/audit-elaina-parity.mjs ../elaina-baileys-main --update --all-identical
```

drops entries for modules that match upstream again — useful after re-porting a module from a newer release.

Unexplained differences exit non-zero, so this can be a CI gate.

### All fifteen are identical

`group-metadata-cache`, `html-app`, `html-multiplayer`, `link-preview-metadata`, `native-flow`, `optional-media`,
`sender-key-memory`, `ttl-cache`, `voice-recognition`, `status-stickers`, `auth-store`, `modern-messages`,
`scheduled-message`, `payment-messages`, `newsletter-status` — byte-for-byte the same code once types are stripped.

Two pieces of machinery made that possible without changing behaviour:

- **`src/Utils/proto-compat.ts`** aliases the proto types this WAProto build exposes flat
  (`ConditionalRevealMessage`, `PollAddOptionMessage`, `EventInviteMessage`) under `proto.Message`, so the ported
  modules keep upstream's exact expressions instead of hardcoding enum numbers or resolving paths at call time.
- **`src/Extras/newsletter-status-socket.ts`** holds the one thing this fork adds on top of upstream's status
  file: a factory that returns the five operations as an object, so `Extras/socket.ts` can merge them in a single
  spread. Upstream attaches them to the socket individually. Keeping the composition out of
  `newsletter-status.ts` is what lets that file stay identical.


### What the stanza suite covers

`test/extras-stanza.test.js` encodes and decodes every message this fork builds through the generated protobuf
schema, including the relay payloads that go out as raw proto fields — `paymentReminderMessage`,
`splitPaymentMessage`, `splitPaymentUpdateMessage` and `musicMessage` — driven through the real path
(`preparePortedMessageContent` → raw mode → encode → decode).

### Provenance

`src/Extras/index.ts` exports `PORTED_FROM`, recording the release this layer came from, the release it was last
checked against, when, and the measured parity (`byteIdenticalModules: '14/15'`). Update it when you re-run the
audit.

### What parity does not cover

Byte equality proves the *code* matches. It does not prove the protocol works — that needs a paired account. See
[Live verification](./live-verification.md).

### Dependency trust

`libsignal` used to be `npm:@teamolduser/libsignal@1.0.1`, a republished fork of the Signal protocol implementation
— the most security-sensitive dependency in the tree, and one whose code cannot be reviewed as text. It is now
upstream `libsignal@^6`, the same package elaina-baileys uses, and `test/signal-roundtrip.test.js` proves the swap
by actually building a session and encrypting/decrypting a message.

`ffmpeg-static` is a regular dependency: it downloads a binary in its install script, and `getFfmpegBin()` falls back to
a system `ffmpeg` if that download ever fails, so a bad download degrades instead of breaking the install.

`whatsapp-rust-bridge` remains. It is a native Rust crypto bridge with no install scripts, but it is compiled code;
swapping it for elaina's bridge would be a port, not a dependency change.

_Also published at [docs/en/elaina-parity.md](../docs/en/elaina-parity.md)_

### examples

The snippets below assume `@teamolduser/baileys` is installed in an ESM project and that you have a WhatsApp account you are authorized to link.

### Text command bot skeleton

```js
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'
import pino from 'pino'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }) })
sock.ev.on('creds.update', saveCreds)

sock.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return
  for (const message of messages) {
    const content = message.message
    const text = content?.conversation ?? content?.extendedTextMessage?.text ?? ''
    if (!text || message.key.fromMe || !message.key.remoteJid) continue
    if (text.trim().toLowerCase() === 'ping') {
      await sock.sendMessage(message.key.remoteJid, { text: 'pong' })
    }
  }
})
```

This is a minimal example, not a complete production bot. Add reconnect/backoff, error handling, shutdown handling, and message deduplication as required.

### MongoDB auth with isolated sessions

```js
import makeWASocket, { useMongoAuthState2 } from '@teamolduser/baileys'

const auth = await useMongoAuthState2({
  uri: process.env.MONGODB_URI,
  dbName: 'whatsapp',
  collectionName: 'baileys_auth',
  session: process.env.BOT_SESSION ?? 'bot-1'
})
const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)
```

Use a unique `session` value for each independent bot. Keep it stable for that bot across restarts.

### Store chats and messages in memory

```ts
import makeWASocket, { makeInMemoryStore } from '@teamolduser/baileys'

const store = makeInMemoryStore({})
const sock = makeWASocket({ /* auth: state, ... */ })
store.bind(sock.ev)

// The store provides read/write helpers; see the source API for exact methods.
```

The in-memory store is not a durable database. Persist it only if your application's requirements call for it, and remember that saved messages can contain private data.

### AIRich widgets, A2UI and AIRichMessage

`assets/examples/airich_widgets.js` sends an `AIRich` message with `addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable` and `addSports`, an A2UI info card, and an `AIRichMessage`. These payloads are experimental; check them on your own account first.

```bash
node assets/examples/airich_widgets.js 6281234567890
```

### WAProto additions (offline check)

`assets/examples/waproto_additions.js` encodes and decodes the new elaina-synced WAProto fields locally and prints the default WhatsApp Web version. It does not connect to WhatsApp.

```bash
node assets/examples/waproto_additions.js
```

_Also published at [docs/en/examples.md](../docs/en/examples.md)_

### getting started

### Requirements

Use a Node.js version supported by this repository's `package.json` and `engine-requirements.js`. Check your installed version with:

```bash
node --version
```

### Install

```bash
npm install @teamolduser/baileys
```

The library is ESM-first. In an application that uses `.js` files with ESM syntax, set `"type": "module"` in your application's `package.json`, or use `.mjs` files.

### Create a socket and persist credentials

```js
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@teamolduser/baileys'
import pino from 'pino'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({
  auth: state,
  logger: pino({ level: 'silent' })
})

sock.ev.on('creds.update', saveCreds)
sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
  if (connection === 'open') console.log('Connected')
  if (connection === 'close') {
    const code = lastDisconnect?.error?.output?.statusCode
    console.log('Connection closed:', code)
    if (code !== DisconnectReason.loggedOut) {
      console.log('Reconnect by creating a new socket with your reconnect policy.')
    }
  }
})
```

The snippet shows the basic lifecycle only. For production use, add a reconnect strategy with backoff, handle shutdown signals, and avoid creating multiple sockets for the same saved session.

### Important session rule

Always persist credential updates by registering `sock.ev.on('creds.update', saveCreds)`. Keep the session directory private: it contains credentials and Signal keys that can grant access to the linked account.

_Also published at [docs/en/getting-started.md](../docs/en/getting-started.md)_

### groups

Group JIDs commonly end in `@g.us`. Participant identifiers may be phone-number JIDs or LIDs depending on the account and WhatsApp's current addressing behavior. Prefer identifiers received from socket events or metadata rather than constructing them from phone numbers without validation.

### Create a group

```js
const group = await sock.groupCreate('Anya Community', [
  '14155550123@s.whatsapp.net',
  '14155550124@s.whatsapp.net'
])

console.log('Group JID:', group.id)
```

Replace the sample identifiers with valid participants. WhatsApp may reject group creation based on account permissions, privacy settings, or server policy.

### Update participants

```js
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'add')
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'remove')
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'promote')
await sock.groupParticipantsUpdate(groupJid, [participantJid], 'demote')
```

The action is the third argument and the participant list is an array. Check the returned per-participant results; an `add` request can result in an invite rather than an immediate addition when privacy rules prevent direct adds.

### Group metadata and admin operations

Use the socket's group metadata and participant-update methods for the base group workflow. This fork also contains ported message/group helpers such as group metadata caching and sender-key reset/query helpers. Those are lower-level/protocol-sensitive features; inspect their TypeScript signatures and test against a non-production group before relying on them.

_Also published at [docs/en/groups.md](../docs/en/groups.md)_

### index

Anya Baileys is a WhatsApp Multi-Device library for Node.js. It provides a WebSocket-based WhatsApp client, typed protocol definitions, socket methods, authentication-state adapters, and additional helpers.

> **Important:** This is an unofficial library that interacts with WhatsApp's private protocol. Protocol behavior can change without notice. Use it responsibly and protect account credentials.

### Start here

- [Getting started](./getting-started.md) — install, connect, and persist credentials.
- [Pairing code](./pairing.md) — link a device without scanning a QR code.
- [Messages](./messages.md) — receive and send messages.
- [MessageBuilder](./builder.md) — create interactive messages and use static helper functions.
- [Groups](./groups.md) — create groups and manage participants.
- [Newsletters](./newsletter.md) — work with WhatsApp channels.
- [Session storage](./sessions.md) — choose a local or database-backed auth store.
- [Examples](./examples.md) — small end-to-end examples.
- [Porting and compatibility changes](./porting-changes.md) — recent additions made to Anya.

### Package

The package name in this repository is `@teamolduser/baileys`.

```bash
npm install @teamolduser/baileys
```

Use ESM imports. The exact runtime and optional peer-dependency requirements are listed in the root `package.json`.

_Also published at [docs/en/index.md](../docs/en/index.md)_

### interactive v2

### Elaina-derived interactive APIs (V2 naming)

Elaina-derived carousel, native-flow, section, list, card and rich-message helpers have explicit `V2` aliases exported from `src/Extras/v2.ts` and re-exported through `src/Extras/index.ts`. These aliases are a naming layer for the ported API, not a separate wire protocol. The Elaina general-purpose builder is also exported as `ElainaButtonV2`; do not infer that Anya had a pre-existing `ButtonV2` API.

See the V2 naming guide for import guidance and the alias families.

_Also published at [docs/en/interactive-v2.md](../docs/en/interactive-v2.md)_

### live verification

Everything in `test/` is local. It proves the crypto round-trips, the nodes have the right shape, the
validators fire and the queues advance. None of it proves WhatsApp's servers accept what we send. That
needs a real paired account, so it is a step you run, not something I can run for you.

`scripts/verify-live.mjs` is the harness. It never creates a pairing and, unless you pass `--to`, it only
ever messages your own account.

### Before you start

- A **spare number** you can afford to lose. This is an unofficial client; bans happen.
- A **paired session directory** (the folder `useMultiFileAuthState` writes).
- For the channel-status step only: a channel you **administer**, and an account with the
  `CHANNEL_STATUS_PRODUCER` capability.
- Nothing else — the script installs nothing and writes nothing except WhatsApp traffic.

### Step 1 — build the library

```bash
npm install
npm run build          # tsc + tsc-esm-fix, writes lib/
```

### Step 2 — pair once, if you have not already

```bash
node -e "
import('./lib/index.js').then(async ({ default: makeWASocket, useMultiFileAuthState }) => {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const sock = makeWASocket({ auth: state })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', u => {
    if (u.qr) console.log('scan this:', u.qr)
    if (u.connection === 'open') { console.log('paired'); process.exit(0) }
  })
})"
```

Or pair with a code instead of a QR: call `sock.requestPairingCode('<number>')` about three seconds after the
socket exists — calling it immediately throws.

### Step 3 — run the checks

Start with the safe set:

```bash
node scripts/verify-live.mjs --session ./session
```

Then add the shapes you actually care about:

```bash
node scripts/verify-live.mjs --session ./session --interactive
node scripts/verify-live.mjs --session ./session --scheduled
node scripts/verify-live.mjs --session ./session --newsletter 1234567890@newsletter --post-status
```

| Flag | What it adds |
|---|---|
| (none) | connect + send a text to yourself and receive the echo |
| `--interactive` | builds and relays an interactive button message |
| `--scheduled` | schedules a message 15 minutes out, then unschedules it |
| `--newsletter <jid> --post-status` | checks capabilities, posts a text status, confirms it is listed, revokes it |
| `--to <jid>` | send somewhere other than yourself — only if you mean it |
| `--timeout <ms>` | per-step timeout, default 45s |

### Step 4 — read the result

Each line is one step:

```
ok   connect (revision accepted)      socket open, creds intact
ok   send text, receive echo          id 3EB0... echoed as 3EB0...
skip send interactive buttons         pass --interactive to include it
2 passed, 0 failed, 1 skipped
```

Exit code is 0 only when every step that ran passed. `skip` means you did not ask for it, not that it passed.

What each step actually proves:

- **connect** — the pinned `client_revision` in `src/Defaults/index.ts` is still accepted. A stale revision
  is refused at the handshake, so this is the cheapest canary you have.
- **send text, receive echo** — the send path and `messages.upsert` both work end to end.
- **interactive buttons** — the `interactiveMessage` payload and the `biz` node it rides on are accepted.
  If it is accepted but renders wrong, that is a rendering issue, not a protocol one.
- **scheduled** — the `conditionalRevealMessage` envelope and its `<meta>` node are accepted, and the
  unschedule protocol message is too.
- **newsletter status** — capabilities first (most accounts lack `CHANNEL_STATUS_PRODUCER`; the step fails
  with that reason instead of pretending), then the post is confirmed by reading it back from
  `getNewsletterStatuses`, then revoked.

### Step 5 — if something fails

| Failing step | Likely cause | What to do |
|---|---|---|
| connect (closed before open, 405/415) | client revision too old | bump `version` in `src/Defaults/index.ts` to the current `client_revision` from `web.whatsapp.com/sw.js` |
| connect (401/403/419) | session dead or logged out | delete the session dir and pair again |
| interactive | `biz` node or button shape rejected | check `MessageBuilder` against a message your phone renders; the builders live in `src/Extras/MessageBuilder/` |
| scheduled | outside the window, or the account lacks the capability | the window is 10 min – 14 days for chats, 10 min – 30 days for newsletters |
| newsletter status | no `CHANNEL_STATUS_PRODUCER`, or not an admin | check with `newsletterAdminCapabilities`; this is an account capability, not a code bug |

### What this does not cover

- **Calls.** Audio/video need a second peer; `test/voip.test.js` covers the feeders and the state machine,
  not a real call.
- **Media upload.** Sending an image or video exercises the upload path, which the harness skips to keep it
  cheap.
- **Groups.** Every step targets a chat you own; group operations need a group you can post in.
- **Long-run stability.** One pass proves acceptance, not that a reconnect storm or a long session holds up.

### If you want the strongest signal

Run the harness twice: once on the pinned revision, then again after bumping `version` to whatever
`web.whatsapp.com/sw.js` currently reports. If both connect, the revision is not your bottleneck. If only
the newer one connects, your pinned revision has gone stale and the constant needs a refresh — that is the
single most common reason a working bot suddenly stops connecting.

_Also published at [docs/en/live-verification.md](../docs/en/live-verification.md)_

### message content

### New message content keys

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

#### Example commands

`assets/examples/example.js`: `!question`, `!comment`, `!addyours`, `!splitpay`, `!remind`, `!hd`, `!motion`, `!health <number>`, `!about <number>`,
`!serverprops`, `!serverlink <url>`, `!nlinfo <channel jid>`, `!nldirectory <text>`, `!nlstatus <channel jid> <text>`, `!resetkey` (group).

_Also published at [docs/en/message-content.md](../docs/en/message-content.md)_

### messagebuilder

### MessageBuilder / AIRich

```ts
import { MB, MessageBuilder, AIRich, Button, sendA2UI, sendHtmlApp, sendAIRichMessage, readRichMessage, verifyRichResponseSignature, forwardRichResponse } from '@teamolduser/baileys'

await new Button(sock).setTitle('Menu').addReply('Ping', 'ping').send(jid)

const rich = new AIRich(sock)
rich.addText('*Report*')
rich.addSection(MB.dividerSection())
rich.addSection(MB.taskSection({ taskId: 'job-1', title: 'Rendering', status: MB.TaskStatus.RUNNING }))
await rich.send(jid)

await sendHtmlApp(sock, jid, '<h1>Hello</h1>', { title: 'Mini app' })

// Elaina-compatible static helper attachment: helpers are available on MB/MessageBuilder.
const map = MB.mapSection({ items: [], queryStatus: 'FETCHED' })
const divider = MessageBuilder.dividerSection()

// Inspect/verify a received signed AI rich response before forwarding it.
const parsedRich = readRichMessage(incomingMessage)
const signature = verifyRichResponseSignature(incomingMessage) // { status: 'passed' } or { status: 'failed', reason }
if (parsedRich && signature.status === 'passed') {
  await forwardRichResponse(sock, jid, incomingMessage)
}
```

- The builder covers tables, code, A2UI cards, HTML mini apps, embedded screens and Meta AI sections (sports, places, quiz, search, ...).
- The Elaina name `Carousel` is **`CarouselV2`** here (the bare name `Carousel` is already a message type, so it is not exported). `CarouselV2`, `AIRichCarousel`, `AIRichCarouselV2` and `MB.Carousel` are all the same class .
- The builder is **licensed separately by its author** - keep the watermark in `src/Extras/MessageBuilder/index.ts` and keep the original watermark and license header in that file.

#### AIRich widgets (`addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable`, `addSports`)

Added from elaina-baileys commit `f025122` ("tambah primitive baru 2.26.39.3 ke MessageBuilder"). Elaina dropped these five methods again in its 15-oct build; they are kept here. They live in `src/Extras/MessageBuilder` next to the other `add*` helpers, each returns the builder, and each also exists as an `...V2` alias (`addQuizV2`, ...). They are experimental, so check that your target clients draw them.

```js
import { AIRich } from '@teamolduser/baileys'
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

// Send once the connection is open (connection.update -> connection === 'open').
const jid = '6281234567890@s.whatsapp.net'

await new AIRich(sock)
    .setTitle('Widgets')
    .addHtmlCard('<h1>Hello</h1>', { width: 320, height: 160 })          // GenAIHtmlCardPrimitive
    .addSelectableText('Select me', { selectionId: 'sel-1' })              // GenAISelectableTextPrimitive
    .addQuiz('2 + 2?', ['3', { text: '4', correct: true }], { explanation: 'Basic maths' })
    .addComparisonTable(['Feature', 'A', 'B'], [['Speed', 'fast', 'slow']], { highlightLabel: 'A' })
    .addSports([{ home: 'A', away: 'B' }, { home: 'C', away: 'D' }], { league: 'NBA' })
    .send(jid)
```

The global `MB` works exactly as in elaina-baileys: the builders take the socket as their first argument (`new MB.AIRich(sock)`). On top of that, the socket carries bound versions that add `sock` for you:

```js
import { AIRich, MB } from '@teamolduser/baileys'

new MB.AIRich(sock)           // 1. as in elaina-baileys: socket as the first argument
new AIRich(sock)              // 2. named import, same thing
new sock.AIRich()             // 3. bound to this socket, no sock argument
sock.MB.AIRich                // 4. same class through sock.MB; sock.MB.sendA2UI(jid, ...) etc. also take no sock
```

`sock.MB` is `MB` with the builder classes (`AIRich`, `Button`, `ButtonV2`, `Carousel`) and the `send*` helpers (`sendA2UI`, `sendA2UIBloks`, `sendAIRichMessage`, ...) bound to that socket; every other member is passed through unchanged. The global `MB.sendA2UI(sock, jid, ...)` keeps its `sock` argument.

| Method | Arguments | Notes |
|---|---|---|
| `addHtmlCard(html, opts)` | `opts`: `mimeType` (`text/html`), `width` (300), `height` (200), `cardType`, `sandbox` | `html` must be a string |
| `addSelectableText(text, opts)` | `opts`: `selectionId` | the text is also sent as the plain submessage |
| `addQuiz(question, options, opts)` | `options`: non-empty array of strings or `{ text, correct }`; `opts`: `explanation` | a string option counts as a wrong answer |
| `addComparisonTable(columns, rows, opts)` | `rows`: arrays (wrapped into `{ cells }`) or row objects; `opts`: `highlightLabel` | |
| `addSports(games, opts)` | `games`: one game or an array; `opts`: `league` (default for each game) | one game uses the `Single` layout, several use `HScroll` |

All five accept `{ id, replace, insertAt }` like the other `add*` methods, and throw a `TypeError` for invalid input. A runnable version is in `assets/examples/airich_widgets.js`.

#### Elaina sync notes (30-sep to 21-oct)

- Default WhatsApp Web version was `2.3000.1050764678` here (now `2.3000.1051456098`; `src/Defaults/index.ts`, `src/Utils/generics.ts`, `src/Defaults/baileys-version.json`, `WAProto/WAProto.proto` header).
- Carousel biz node: `shouldIncludeBizBinaryNode` only returns `true` for a carousel when at least one card holds a native flow message, and `getBizBinaryNode` falls back to the mixed native-flow node when only a later card carries the buttons.
- Interactive message headers (`generateWAMessageContent`) and `AIRich` headers no longer send an empty `title` / `subtitle` (`headerText` in `src/Utils/messages.ts`).
- WAProto additions from the 21-oct build: `Conversation.acp2HistoryWithheld`, `DeviceCapabilities.hostWriteMutationSupport`, `HistorySync.favoriteStickers` / `omittedConversations` / `omittedConversationsProvided`, `Message.instantImageMessage`, `MsgOpaqueData.musicData`, `PollAdditionalMetadata.originalOptions`, `SyncActionValue.communityNestingStateAction` / `sharedDeviceSecretAction`, `WebMessageInfo.eventInviteAdditionalMetadata`, plus the types `RecoverableHistoryConversation`, `EventInviteAdditionalMetadata`, `HostWriteMutationSupport`, `MusicData`, `CommunityNestingStateAction` and `SharedDeviceSecretAction`. `Message.requestLocationMessage` (136) / `requestLocationUpdateMessage` (138) are included too, but elaina references their message types without ever defining them, so here `Message.RequestLocationMessage` and `Message.RequestLocationUpdateMessage` are empty placeholder messages: they encode and decode, and any real contents WhatsApp sends are kept as unknown fields until the real definitions are known. The generated `WAProto/index.js` / `index.d.ts` were patched by hand for these additions; `yarn gen:protobuf` regenerates them from `WAProto/WAProto.proto`.
- `BotModeSelectionMetadata.BotUserSelectionMode` uses the latest names `DEFAULT_MODE` (0) and `THINK_HARD_MODE` (1) in `WAProto/index.js`, `index.d.ts`, `WAProto.proto` and the `BotMetadata` sub-proto (they were `UNKNOWN_MODE` / `REASONING_MODE`).
- `assets/examples/waproto_additions.js` round-trips the new WAProto fields locally (no WhatsApp connection) and prints the default WhatsApp Web version, which is a quick check after `yarn build`.
- `libsignal` stays on `@teamolduser/libsignal@1.0.1`; elaina's switch to the registry `libsignal@^6.0.0` was not adopted.
- `.github/workflows/auto-update.yml` follows elaina's 21-oct flow (manual runs publish only with `publish: true`) but uses yarn, `yarn update:version`, and this package name; the proto refresh stays in `update-proto.yml`.
- `sock.MB` and `sock.AIRich` are attached to the socket (`src/Extras/socket.ts`) and bound to it, so they need no `sock` argument. The global `MB` is unchanged from elaina-baileys (`new MB.AIRich(sock)`).
- ffmpeg: VoIP audio/video feeders and media conversion now spawn the bundled `ffmpeg-static` binary when it exists (`src/Utils/ffmpeg-path.ts`), and fall back to `ffmpeg` on PATH. `package.json` allows only the `ffmpeg-static` install script to run (`dependenciesMeta`), so `yarn install` downloads its binary even when Yarn disables dependency build scripts by default. If it was installed before this change, run `yarn rebuild ffmpeg-static` once; no system ffmpeg or PATH change is needed.
- Comparison against elaina-baileys 1.4.7 (exports, socket methods and behaviour): every socket method and export of elaina exists here (only `Carousel` is named `CarouselV2`, see above). Differences that were found and fixed: `sock.fetchNewChatMessageCap()` now sends the real query type `INDIVIDUAL_NEW_CHAT_THREAD` with id `27910975521856601` and returns the parsed object (`status`, `capped`, `warned`, `unlimited`, `remaining`, ...; see Account health signals); `normalizeMessageContent` unwraps all 32 `FUTURE_PROOF_MESSAGE_KEYS` instead of 11; a `quoted` message without readable content is sent without the quote (with a warning) instead of throwing; `requestPairingCode` validates the phone number format and strips punctuation; the `wa:update`, `wa:diff`, `audit:apk`, `verify:proto`, `verify:mex`, `fetch:bundle`, `check:proto`, `sync:proto`, `test:pairing` and `proto:update` npm scripts are wired and adapted to the TypeScript layout .
- Also taken from elaina 1.4.7: the persisted-query ids and paths of the core newsletter operations in `src/Types/Mex.ts` (`CREATE`, `METADATA`, `SUBSCRIBERS`/`FOLLOWERS`, `SUBSCRIBED`, `ADMIN_COUNT`, `CHANGE_OWNER`, `DEMOTE` and the `xwa2_newsletter_admin_demote` path) together with their call shapes: `newsletterSubscribers()` now returns the follower list (the count is `subscribers` of `newsletterMetadata()`), `newsletterMetadata()` and `newsletterSubscribed()` take the optional switches, `newsletterMute()` / `newsletterUnmute()` go through the user setting, and `newsletterUpdate()` no longer overwrites an update's own `settings` with `null`. `requestPairingCode` rejects an answer that carries no `link_code_pairing_ref` ("accepted without registering it") instead of saving `creds.me`; the pairing tests' server replies now include that reference like the real server's. Ack error `475` raises `message-capping.update`; `NACK_REASONS` gained `StaleGroupAddressingMode` (421) and `NewChatMessagesCapped` (475); 1:1 messages that carry a message secret get the recipient `deviceListMetadata`; `executeWMexQuery` errors name the query and carry the variables that were sent; `isValidUsername` / `validateUsername` follow WhatsApp's real username rules (3-35 characters, `_` allowed at the edges, at least one letter, no leading/trailing/double `.`, no reserved words or domain endings).
- Kept as Anya's own, because it is the better of the two: `fetchLatestBaileysVersion` (live version from wppconnect with a fallback, where elaina reads its own repository's `Defaults/index.js` by line number), `makeNewsletterStatus*` (thin aliases of one shared `makeNewsletterStatusExtras`), `useMongoAuthState` next to elaina's `useMongoAuthState2`, and `downloadMediaMessage`'s handling of Boom status codes. Whether the newsletter ids above are still served can be checked at any time with `npm run verify:mex`.
- Tests: `src/__tests__/Extras/airich-widgets.test.ts` and the extra cases in `src/__tests__/binary/carousel-biz-node.test.ts`.

#### A2UI cards and AIRichMessage

Synced from the elaina-baileys 15-oct / 21-oct docs. The render notes below are elaina's findings from testing against real clients; they have not been re-verified for this package.

There are two A2UI payload shapes, and the difference matters:

| Shape | `data` content | Evidence |
|---|---|---|
| Ready-made element | `{"type":"info_card", ...}` and `{"type":"list_card", ...}` | Android knows exactly these two kinds, and WA Web's `a2ui_supported_elements` AB prop lists `"info_card, list_card"` |
| `createSurface` tree | `{version, createSurface:{surfaceId, root, components}}` | WA Web debug fixture; the renderer is lazy-loaded, so it is not verified from the bundle |

```js
import { MB } from '@teamolduser/baileys'
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

// Send once the connection is open (connection.update -> connection === 'open').
const jid = '6281234567890@s.whatsapp.net'

// Ready-made element: the safest path, because Android only draws info_card and list_card.
await MB.sendA2UI(sock, jid, [], {
    type: 'im_a2ui',
    uuid: crypto.randomUUID(),
    fallback: 'MENU\nPick a category below.',
    data: MB.a2uiInfoCard({ title: 'MENU', body: 'Pick a category below.' })
})

// Same components tree through a rich response (AIRich + bloksSection).
await MB.sendA2UIBloks(sock, jid, [
    MB.a2uiColumn('root', ['img', 't1']),
    MB.a2uiImage('img', 'https://example.com/cover.jpg'),
    MB.a2uiText('t1', 'Hello')
], { uuid: crypto.randomUUID() })
```

- `a2uiInfoCard` / `a2uiListCard` build the element objects; `sendA2UI` and `sendA2UIBloks` both accept any element through `data`.
- `sendA2UIBloks` takes the same `components` tree as `sendA2UI` (raw `data` objects included). `buildA2UISection(components, options)` returns just the section if you want to assemble an `AIRich` yourself.
- `a2uiSurface` writes `root` and no longer adds `catalogId` / `sendDataModel` unless you pass them. When no `fallback` is given, `a2uiFallback` derives one from the card text.

> [!WARNING]
> Per elaina's testing, **a regular account cannot get an A2UI card drawn**, and this is not a payload bug. `sendA2UI` only shows the `fallback` text, and `sendA2UIBloks` shows an empty bubble. The WA Web client gates both: `bloksWidget` cards need `im_a2ui_require_bot_attribution` (default true) to be off or the message to be a 1P biz-bot message, and `WebMessageInfo.is1PBizBotMessage` is set by the server, so a sender cannot fill it. `FOABloksPrimitive` needs the `foABloksNodeRenderer`, which is only enabled behind a gatekeeper. Treat both helpers as tools to verify the payload shape, not as a way to get a rendered card out of a normal account.

`AIRichMessage` builds a full rich response, including the submessages and forwarding context the official generator stamps (`WAWebGenerateRichResponseMessageProto`). `sendAIRichMessage(sock, jid, options)` accepts `sections`, `text`, `nativeFlow` and `submessages` together:

```js
await MB.sendAIRichMessage(sock, jid, {
    text: 'Hello from AIRichMessage',
    submessages: [
        MB.AIRichMessage.inlineImage({ previewUrl: 'https://x/y.jpg', highResUrl: 'https://x/y-hi.jpg' }),
        MB.AIRichMessage.table({ rows: [{ items: ['Price', '10'], isHeading: true }] })
    ]
})
```

- `AIRichMessage.text`, `inlineImage`, `table` and `contentItems` are submessage factories; `AIRichMessage.textSection` and `nativeFlowSection` are section factories. `AIRichMessage.submessage(kind, payload)` picks a factory from `AI_RICH_SUBMESSAGE_KINDS` (`text`, `inline_image`, `table`, `content_items`).
- The forwarding context set by `AIRich.build` includes `botMessageSharingInfo` with `botEntryPointOrigin: 31` (`META_AI_FORWARD`) and a `forwardScore` equal to `forwardingScore`; both can be turned off with the `messageSharing` / `forwarded` options.
- `AIRich.addSubmessage` works without a section, so a submessage can be attached to a message whose sections are empty.
- `FOABloksPrimitive` now has a factory, `bloksSection`.

#### Button label and payload forms

All forms below produce the same wire payload. The display-text aliases `display_text`, `text`, `displayText`, `displaytext` and
`buttonText` (string or `{ displayText }`) are accepted, and an already serialized `buttonParamsJson` string is kept byte-for-byte.

```ts
// Native flow button builder (interactiveMessage)
new Button(sock)
  .addButton('quick_reply', { text: 'Hi', id: '1' })                    // -> { text: 'Hi', id: '1', display_text: 'Hi' }
  .addButton('cta_url', JSON.stringify({ display_text: 'Site', url: 'https://example.com' })) // kept as is
  .addButton({ name: 'quick_reply', buttonParamsJson: { displayText: 'Yes', id: 'y' } })      // object form
  .addReply('Direct', '2')

// Legacy buttons builder (buttonsMessage)
new ButtonV2(sock)
  .addButton('Yes', 'y')                                    // addButton(label, id)
  .addButton({ text: 'No', id: 'n' })                       // object form: text | display_text | displayText, id | buttonId | button_id
  .addRawButton({ buttonId: 'm', text: 'Maybe', type: 1 })  // string buttonText / aliases become { displayText }
```

- `Button.addButton` throws a `TypeError` when no native flow button name is given.
- `ButtonV2.addButton({ id })` without any label falls back to an empty label.

_Also published at [docs/en/messagebuilder.md](../docs/en/messagebuilder.md)_

### messages

### Receive new messages

Incoming messages are delivered through `messages.upsert`. Check `type` if the bot should respond only to newly received messages and not historical messages from a sync.

```js
sock.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return

  for (const message of messages) {
    if (!message.message) continue
    console.log('Chat:', message.key.remoteJid)
    console.log('Message ID:', message.key.id)
  }
})
```

### Extract simple text

Different message types store text in different fields. This helper covers common text and caption types; it is not a complete parser for every WhatsApp message type.

```js
function getText(message) {
  const content = message?.message
  if (!content) return ''
  return content.conversation
    ?? content.extendedTextMessage?.text
    ?? content.imageMessage?.caption
    ?? content.videoMessage?.caption
    ?? content.documentMessage?.caption
    ?? ''
}
```

### Send a text message

```js
await sock.sendMessage('14155550123@s.whatsapp.net', {
  text: 'Hello from Anya Baileys'
})
```

For groups, use the group's JID (usually ending in `@g.us`). User identifiers can also use newer LID addressing, so do not assume every participant ID is a phone-number JID. Prefer JIDs supplied by the library and message metadata.

### Mark messages as read

Use the message keys received from the event. Confirm the exact method signature against the generated API reference for the installed version before relying on advanced receipt behavior.

### Interactive messages

For button, carousel, and AI-rich payload construction, see [MessageBuilder](./builder.md). Interactive message behavior is client- and protocol-version-dependent; test against the WhatsApp clients you intend to support.

_Also published at [docs/en/messages.md](../docs/en/messages.md)_

### native flow

### Direct Native Flow examples (without helper builders)

These examples construct and send the payload directly. They do **not** call Anya's `generateCombinedButtons()` or Elaina's `new Button(sock)` builder. `jid` must be the destination JID and `sock` must be an authenticated, connected socket.

#### Anya: direct native-flow payload

Anya's `src/Addons/interactive-message.ts` defines the native-flow payload fields used below. The helper examples send the returned `interactiveMessage` object as the message content; this example constructs that same content shape inline:

```ts
await sock.sendMessage(jid, {
  body: { text: 'Choose an option' },
  footer: { text: 'Anya Bot' },
  nativeFlowMessage: {
    buttons: [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: 'Ping',
          id: '.ping',
        }),
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'Open Website',
          url: 'https://example.com',
          merchant_url: 'https://example.com',
        }),
      },
      {
        name: 'cta_copy',
        buttonParamsJson: JSON.stringify({
          display_text: 'Copy Code',
          copy_code: 'ABC123',
        }),
      },
    ],
    messageParamsJson: '',
  },
})
```

This is the raw content shape used by the Anya helper. If your application is calling a different Baileys API/version, check that version's `sendMessage()` accepted content types before using this exact call.

#### Elaina: direct native-flow payload and relay

Elaina's `Button` builder creates a full WhatsApp message with `generateWAMessageFromContent()` and relays it with the `biz` / `native_flow` additional nodes. To do that directly, use the same lower-level steps without `new Button(sock)`:

```js
import { generateWAMessageFromContent } from '../../lib/index.js'

const message = await generateWAMessageFromContent(
  jid,
  {
    interactiveMessage: {
      body: { text: 'Choose an option' },
      footer: { text: 'Elaina native-flow demo' },
      nativeFlowMessage: {
        messageParamsJson: '{}',
        buttons: [
          {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
              display_text: 'Ping',
              id: '.ping',
            }),
          },
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: 'Open Website',
              url: 'https://example.com',
              merchant_url: 'https://example.com',
            }),
          },
        ],
      },
    },
  },
  {},
)

await sock.relayMessage(message.key.remoteJid, message.message, {
  messageId: message.key.id,
  additionalNodes: [
    {
      tag: 'biz',
      attrs: {},
      content: [
        {
          tag: 'interactive',
          attrs: { type: 'native_flow', v: '1' },
          content: [
            { tag: 'native_flow', attrs: { v: '9', name: 'mixed' } },
          ],
        },
      ],
    },
  ],
})
```

**Path note:** the import above matches the relative path from `assets/buttonsbuilder/MessageBuilder.js`. If this code lives in another directory, adjust the relative import to the project's exported `generateWAMessageFromContent` entry. Elaina's builder also adds context and payload options; include those explicitly if your use case needs them.

#### Which one should I use?

- Use Anya's inline payload when you want to construct the native-flow content directly with `sock.sendMessage()`.
- Use Elaina's lower-level `generateWAMessageFromContent()` + `sock.relayMessage()` path when you need to reproduce the builder's native-flow relay metadata without instantiating `Button`.
- These are direct-payload examples, not proof that WhatsApp renders every button type identically on every client. Test with the target WhatsApp clients.

_Also published at [docs/en/native-flow.md](../docs/en/native-flow.md)_

### newsletter

A WhatsApp channel JID ends in `@newsletter`. Channel APIs are separate from group APIs, and some methods require a newsletter **server message ID** rather than a normal chat message key ID.

### Create and update a channel

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

### Ported newsletter extras

The `src/ported/newsletter-extras.ts` module adds methods for areas such as admin invites and capabilities, followers, insights, channel directory/search/categories, recommendations/similar channels, enforcement/reporting and appeals, poll voters, reaction senders, pin/unpin, labels, and question-response state. Newsletter status methods are in `src/ported/newsletter-status.ts`.

These are WhatsApp private-protocol operations and can change server-side. Confirm the method's signature in the source/API reference and handle server errors instead of assuming every operation is available to every channel/account.

### Server IDs versus message keys

Do not pass `message.key.id` to a method that explicitly expects a newsletter server ID. Obtain the appropriate server ID from the newsletter message metadata or the return value of the corresponding newsletter API. Anya validates newsletter server IDs in its helper layer and rejects values outside the accepted range.

_Also published at [docs/en/newsletter.md](../docs/en/newsletter.md)_

### pairing

A pairing code links the WhatsApp account without scanning a QR code. Create the socket with an auth state first, then request a code only when the saved credentials are not already registered.

```js
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })
sock.ev.on('creds.update', saveCreds)

if (!state.creds.registered) {
  const code = await sock.requestPairingCode('14155550123')
  console.log('Enter this pairing code in WhatsApp:', code)
}
```

Pass the phone number in international format: country calling code followed by the national number, using digits only. Do not include a local trunk prefix or punctuation. Replace the example number with the account's actual number.

Pairing requests can be rate-limited or rejected by WhatsApp. Handle errors and avoid repeatedly requesting new codes in a tight loop. Follow the current WhatsApp app flow shown on the device to complete linking.

_Also published at [docs/en/pairing.md](../docs/en/pairing.md)_

### porting changes

This page documents the additions made during the Anya/Elaina comparison and follow-up fixes. It describes the repository state represented by this documentation update; it does not claim that a full build or runtime test suite has passed.

### 1. MessageBuilder static helper attachment

**Location:** `src/ported/MessageBuilder/`

The helper modules are kept together in a dedicated folder. `attach-static-helpers.ts` is an internal side-effect module imported by the existing `src/ported/index.ts` barrel. The folder is not exported as a second public entry point.

The attachment registers helpers from the MessageBuilder extras, Meta AI, bot-signature, native-flow, and message-helper modules on the supported static containers. The registration preserves existing properties instead of replacing them. `MessageBuilder` and `MB` refer to the same namespace object.

Example:

```ts
import { MB, MessageBuilder } from '@teamolduser/baileys'

const section = MB.mapSection({ items: [], queryStatus: 'FETCHED' })
const sameSection = MessageBuilder.mapSection({ items: [], queryStatus: 'FETCHED' })
```

Use named exports when static namespace-style access is not needed. Since this is a ported interactive-message implementation, test payloads on target WhatsApp clients.

### 2. Store root exports

**Locations:** `src/ported/store-exports.ts`, `src/ported/index.ts`, `src/Store/index.ts`, `src/__tests__/store-exports.test.ts`

The Store API is re-exported by `src/ported/store-exports.ts` and `src/ported/index.ts`; the existing package-root `src/index.ts` already exports the ported barrel, so Store helpers are available at the package root without a separate Store export path. Public Store exports include:

- `makeInMemoryStore`
- `makeOrderedDictionary`
- `ObjectRepository`
- `waChatKey`
- `waMessageID`
- `waLabelAssociationKey`
- `BaileysInMemoryStoreConfig` (type)

Example:

```ts
import {
  makeInMemoryStore,
  makeOrderedDictionary,
  ObjectRepository
} from '@teamolduser/baileys'
```

`makeInMemoryStore` binds to socket events and keeps an in-memory view of chats, contacts, messages, group metadata, presences, and labels. It is not a replacement for a durable database.

### 3. MongoDB `useMongoAuthState2`

**Location:** `src/ported/use-mongo-auth-state2.ts`

This new function is intentionally separate from the existing `useMongoAuthState` implementation, so current callers are not forced onto a changed API. It is exported through `src/ported/index.ts` and the package root.

It supports:

- MongoDB URI/client creation when a URI is supplied;
- caller-supplied `client`, `db`, or `collection`;
- configurable database and collection names;
- a `session` namespace for isolating bots in a shared collection;
- batched key reads and `bulkWrite` updates/removals;
- `clearAuth()` for the current session;
- `close()` that only closes a client owned by the adapter.

The MongoDB driver is declared as a runtime dependency and is installed automatically by the package manager. Keep the same `session` name to resume an existing bot and use distinct names for independent bots. `clearAuth()` is destructive for that session.

### 4. SQLite `useSqliteAuthState2`

**Location:** `src/ported/use-sqlite-auth-state2.ts`

This separate Elaina-compatible SQLite adapter preserves the existing `useSqliteAuthState` API. It accepts either `dbPath` or an existing `better-sqlite3` `database` handle and returns `state`, `saveCreds()`, `clearAuth()`, and `close()`. A database opened from `dbPath` is owned by the adapter and closed by `close()`; a supplied database handle remains caller-owned. It uses the `creds` and `signal_keys` tables from the Elaina implementation.

```ts
import { useSqliteAuthState2 } from '@teamolduser/baileys'

const auth = await useSqliteAuthState2({ dbPath: './auth.db' })
// Register auth.saveCreds on sock.ev's creds.update event.
// await auth.clearAuth() // destructive: deletes auth rows in the two auth tables
await auth.close()
```

### 5. Package metadata and compatibility tests

The MongoDB, MySQL/MariaDB, PostgreSQL, and Redis drivers are listed as runtime dependencies so users do not need to install them separately. The repository also contains compatibility test scripts for selected inherited test files and a Store export regression test. Run the actual build and test commands in an environment where dependencies can be installed before treating these changes as fully verified:

```bash
yarn install
yarn build
yarn test --runInBand
yarn test:compat
```

The static archive checks performed while preparing this update do not substitute for the full TypeScript build, Jest suite, integration tests, or a live WhatsApp session.

### 6. Cumulative ZIP and ported-folder organization

The current archive is cumulative across the earlier audit, static-verification, MessageBuilder, Store, MongoDB AuthState2, and English-documentation updates. The current code implementations introduced for these ports are organized under `src/ported/`, including `MessageBuilder/`, `use-mongo-auth-state2.ts`, `store-exports.ts`, the socket wrapper fix, and the other Elaina-derived feature modules.

Tests remain under `src/__tests__/` and `test/`; dependency metadata and scripts remain in `package.json`; user-facing guides remain under `docs/en/`; and the root README / LICENSE / audit files remain at repository level. These are supporting files rather than runtime feature implementations, so they are intentionally not moved into `src/ported/`.

### Elaina name compatibility

**Locations:** `src/Extras/index.ts`, `src/Extras/v2.ts`, `src/Voip/index.ts`, `src/__tests__/elaina-name-compat.test.ts`

- `src/Extras/index.ts` now re-exports `./v2`, so the 222 explicit `V2` aliases (for example `CarouselV2`, `TaskStatusV2`) are available from the package root. Before this change the file existed but was not exported.
- The Elaina name `Carousel` is `CarouselV2` here (same class as `AIRichCarousel` and `MB.Carousel`); the bare name `Carousel` stays unexported because it is already a message type.
- `src/Voip/index.ts` exports the Elaina VoIP names `ActiveCall`, `VoipClient`, `AudioFeeder`, `VideoFeeder` and `VIDEO_FORMAT_I420` next to `MergedVoipClient` / `makeVoipClient`. The old `createVoipClient({ authDir })` factory remains unexported.

See [Elaina-derived names and the V2 aliases](../elaina-interactive-apis-v2.md) for the full list.

### Elaina sync: commit f025122 to the 21-oct build

**Locations:** `src/Extras/MessageBuilder/index.ts`, `src/Extras/v2.ts`, `src/WABinary/generic-utils.ts`, `WAProto/`, `src/Defaults/`, `src/Utils/generics.ts`, `.github/workflows/auto-update.yml`, `package.json`

- Commit `f025122` only added five `AIRich` methods: `addHtmlCard`, `addSelectableText`, `addQuiz`, `addComparisonTable`, `addSports`. They are present here (plus `...V2` aliases) even though elaina removed them in its 15-oct build.
- Carousel biz node and empty header title/subtitle (`headerText` in `src/Utils/messages.ts`, plus the builder header) follow elaina's 21-oct fixes.
- WhatsApp Web version `2.3000.1050764678` and the WAProto additions from the 21-oct build are applied; see the README section "Elaina sync notes" for the field list. `Message.requestLocationMessage` / `requestLocationUpdateMessage` use empty placeholder types because elaina never defines them.
- `BotModeSelectionMetadata.BotUserSelectionMode` now uses `DEFAULT_MODE` / `THINK_HARD_MODE` (previously `UNKNOWN_MODE` / `REASONING_MODE`) in the generated WAProto files and the `BotMetadata` sub-proto.
- `libsignal` stays on `@teamolduser/libsignal@1.0.1`; elaina's move to the registry `libsignal@^6.0.0` was not adopted, so `yarn.lock` is unchanged.

- `sock.MB` and `sock.AIRich` are attached to the socket in `src/Extras/socket.ts` and bound to it (no `sock` argument, `send*` helpers included). The global `MB` is unchanged from elaina-baileys: `new MB.AIRich(sock)`.

- ffmpeg: VoIP audio/video feeders and media conversion now spawn the bundled `ffmpeg-static` binary when it exists (`src/Utils/ffmpeg-path.ts`), and fall back to `ffmpeg` on PATH. `package.json` allows only the `ffmpeg-static` install script to run (`dependenciesMeta`), so `yarn install` downloads its binary even when Yarn disables dependency build scripts by default. If it was installed before this change, run `yarn rebuild ffmpeg-static` once; no system ffmpeg or PATH change is needed.

Usage examples: `assets/examples/airich_widgets.js` and `assets/examples/waproto_additions.js`. None of this has been built, linted or run against a live WhatsApp session in the environment where it was prepared.

_Also published at [docs/en/porting-changes.md](../docs/en/porting-changes.md)_

### sessions

Auth state contains credentials and Signal keys. Losing it usually means linking the device again; leaking it can compromise the linked account. Keep session files, database access, and connection strings private.

For every auth-state implementation that returns `saveCreds`, register it on the socket's `creds.update` event:

```js
sock.ev.on('creds.update', saveCreds)
```

### Multi-file auth state

```js
import { useMultiFileAuthState } from '@teamolduser/baileys'
const { state, saveCreds } = await useMultiFileAuthState('./session')
```

This is convenient for development and a single bot instance. Do not delete or edit key files while the socket is running.

### Database-backed auth states

This repository includes database adapter functions in the ported modules. Check each function's options and lifecycle contract before using it:

- `useMongoAuthState2` — MongoDB driver adapter with session namespacing and batch key operations.
- `useSqliteAuthState` — Anya's existing SQLite auth-state adapter.
- `useSqliteAuthState2` — separate Elaina-compatible SQLite adapter with `clearAuth()` and `close()` support.
- `usePostgresAuthState` — PostgreSQL adapter.
- `useMySQLAuthState` — MySQL adapter.
- `useRedisAuthState` — Redis adapter.
- `useNekoDBAuth` — adapter for a caller-provided NekoDB-like database instance.
- `useTursoAuthState` — Turso / libSQL adapter. `{ path: './auth.db' }` for a local file, or
  `{ url: 'libsql://<db>-<org>.turso.io', authToken }` for Turso cloud.

The package declares `mongodb`, `mysql2`, `pg`, `ioredis` and `@libsql/client` as runtime dependencies, so npm/Yarn installs these database drivers automatically. The driver modules are loaded only when their corresponding adapter is used. `useNekoDBAuth` accepts an already connected NekoDB instance and does not import or install a NekoDB client package for you.

### `useMongoAuthState2`

The new adapter is deliberately separate from Anya's existing MongoDB auth-state API. It accepts a MongoDB URI, an existing client, a database, or a collection:

```ts
import makeWASocket, { useMongoAuthState2 } from '@teamolduser/baileys'

const auth = await useMongoAuthState2({
  uri: process.env.MONGODB_URI,
  dbName: 'whatsapp',
  collectionName: 'baileys_auth',
  session: 'bot-1'
})

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)
```

Available options:

| Option | Description |
| --- | --- |
| `uri` | MongoDB connection URI; creates a client owned by this adapter when used alone. |
| `clientOptions` | Options passed to the MongoDB driver's `MongoClient` constructor. |
| `client` | Existing `MongoClient`; this adapter does not close it. |
| `db` | Existing MongoDB `Db` instance. |
| `collection` | Existing collection; takes precedence over `db`/`client` resolution. |
| `dbName` | Database name selected from the client. |
| `collectionName` | Collection name; defaults to `baileys_auth`. |
| `session` | Namespace for this bot's records; defaults to `default`. Use a unique value per independent bot/session. |

The returned object contains `state`, `saveCreds`, `clearAuth()`, and `close()`.

- `clearAuth()` deletes auth records for the configured `session` only.
- `close()` closes the MongoDB client only when `useMongoAuthState2` created it from `uri`. Caller-supplied clients are not closed.
- Keep `session` stable across restarts to resume the same session. Use different names to isolate separate bots sharing one collection.
- Do not call `clearAuth()` unless you intend to remove that session's stored credentials and keys.

### `useSqliteAuthState2`

`useSqliteAuthState2` is the Elaina-compatible SQLite implementation, added separately so the existing `useSqliteAuthState` API remains unchanged. It uses `better-sqlite3`, which is already a package dependency in this repository.

```ts
import makeWASocket, { useSqliteAuthState2 } from '@teamolduser/baileys'

const auth = await useSqliteAuthState2({ dbPath: './auth.db' })
const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// Call only when intentionally clearing this auth database's Baileys auth rows.
// await auth.clearAuth()

// Close the database only when this adapter opened it from dbPath.
await auth.close()
```

You can instead pass an existing `better-sqlite3` `Database` instance with `{ database: db }`; that connection remains caller-owned and `auth.close()` will not close it. The adapter uses the Elaina-compatible `creds` and `signal_keys` tables. `clearAuth()` deletes the auth rows in those tables, so do not use it if those tables contain auth state you want to preserve.

### `useTursoAuthState`

Turso / libSQL adapter. It covers both shapes Turso offers through one `@libsql/client` client:

| Target | Options | URL used |
| --- | --- | --- |
| Local database file | `{ path: './auth.db' }` | `file:./auth.db` |
| Turso cloud | `{ url: 'libsql://<db>-<org>.turso.io', authToken }` | as given |
| Explicit | `{ url: 'file:./auth.db' }` | as given |

```ts
import makeWASocket, { useTursoAuthState } from '@teamolduser/baileys'

// local file — no account, no token
const auth = await useTursoAuthState({ path: './auth.db', session: 'bot-1' })

// Turso cloud — a token is only sent when you supply one
const cloud = await useTursoAuthState({
    url: 'libsql://my-db-myorg.turso.io',
    authToken: process.env.TURSO_TOKEN,
    session: 'bot-1'
})

const sock = makeWASocket({ auth: auth.state })
sock.ev.on('creds.update', auth.saveCreds)

// await auth.clearAuth()   // removes every row of this session
await auth.close()          // closes the client only when this adapter created it
```

Rows live in one table (`baileys_auth` by default, override with `table`) keyed by `(session, type, id)`, so several
bots can share one database. `apply()` writes through `client.batch(…, 'write')`, so an app-state patch lands in a
single transaction. `@libsql/client` is a runtime dependency and is imported lazily — a bot that does not use Turso
never loads it. `toLibsqlUrl({ path, url })` is exported if you want to resolve the URL yourself.

### Sessions across the file-based adapters

Every auth adapter now takes a `session`, so several bots can share one backend — one database, one folder, or one
file. Leaving it out keeps the previous layout exactly as it was.

| Adapter | Backend | What `session` does | `clearAuth()` scope |
| --- | --- | --- | --- |
| `useMultiFileAuthState(folder, { session })` | folder | files go in `<folder>/<session>` | that session's files |
| `useSingleFileAuthState(file, { session })` | one JSON file | keys are stored as `<session>:<key>` | that session's keys |
| `useSqliteAuthState2({ dbPath, session })` | SQLite | keys are stored as `<session>:<key>` | that session's rows |
| `useNekoDBAuth(db, collection, { session })` | NekoDB | keys are stored as `<session>:<key>` | that session's documents |
| `useMongoAuthState2({ uri, session })` · `usePostgresAuthState` · `useMySQLAuthState` · `useRedisAuthState` · `useTursoAuthState` | database | namespaced rows / keys / hashes | that session's rows |

```ts
// two bots, one folder
const a = await useMultiFileAuthState('./auth', { session: 'bot-a' })   // ./auth/bot-a/creds.json
const b = await useMultiFileAuthState('./auth', { session: 'bot-b' })   // ./auth/bot-b/creds.json

// two bots, one JSON file
const c = await useSingleFileAuthState('./auth.json', { session: 'bot-c' })   // {"bot-c:creds": …}
```

Notes that apply to all of them:

- `clearAuth()` removes **only that session** when a session is set; with no session it clears the whole store, which
  is the old behaviour.
- A session name is used as a path segment by the folder adapter, so `/` and `..` are replaced — a session cannot
  escape its folder.
- The single-file adapter writes with a 3-second debounce. Two adapters on one file merge on flush instead of
  overwriting each other, and `flush()` forces an immediate write (call it before shutdown).

### Store lifecycle

When shutting down a bot, stop accepting new work, close the socket according to your application's lifecycle, and call `auth.close()` for adapters that return it. Do not close a shared database client from an auth adapter that does not own it.

### Production guidance

Use encrypted transport where supported, restrict database permissions, store secrets in environment/secret managers, back up the data securely, and never commit session files or connection strings to version control.

_Also published at [docs/en/sessions.md](../docs/en/sessions.md)_

### socket methods

### Account and chat methods

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

### Message helpers

```ts
await sock.sendHD(jid, { image: { url: './photo.jpg' }, caption: 'HD' })        // SD message + linked HD child (image or video)
await sock.sendImgVid(jid, { image: { url: './a.jpg' }, video: { url: './a.mp4' }, caption: 'motion photo' })
await sock.removeMemberLabel(groupJid)                                           // = updateMemberLabel(groupJid, '')
await sock.resetGroupSenderKey(groupJid)                                         // { jid, cleared, devices } - redistributes the sender key
await sock.groupQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])   // raw w:g2 IQ, + communityQuery
await sock.executeWMexQuery({ newsletter_id: jid }, queryId, 'xwa2_newsletter_admin')       // raw WMex query
```

_Also published at [docs/en/socket-methods.md](../docs/en/socket-methods.md)_

### stability checklist

Two of these steps need a paired WhatsApp account, so they are yours. Everything before them is already green and
re-runnable.

Each step says what it proves and what a failure means.

---

### Step 0 — build and run the local suite (5 minutes, no account)

```bash
npm install
npm run build
node --test test/*.test.js
```

Expect `103 tests, 103 pass, 0 fail, 0 skip`.

Then check the port has not drifted from upstream:

```bash
npm i -D esbuild
git clone --depth 1 https://github.com/rexxzyid/elaina-baileys.git /tmp/elaina
node scripts/audit-elaina-parity.mjs /tmp/elaina
```

Expect `15 identical, 0 expected differences, 0 unexplained`. The script exits non-zero if any module drifts, so
this is a CI gate rather than a report.

**What it proves:** the code compiles, every unit and concurrency and soak test passes, and all fifteen ported
modules are byte-identical to elaina-baileys after type-stripping.

---

### Step 1 — pair a spare number (10 minutes, needs a phone)

Use a number you can afford to lose. This is an unofficial client.

```bash
node -e "
import('./lib/index.js').then(async ({ default: makeWASocket, useMultiFileAuthState }) => {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const sock = makeWASocket({ auth: state })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', u => {
    if (u.qr) console.log('QR:', u.qr)
    if (u.connection === 'open') { console.log('paired'); process.exit(0) }
  })
})"
```

Scan the QR string with WhatsApp → Linked devices. If you would rather use a code, call
`sock.requestPairingCode('<number>')` about three seconds after the socket exists — calling it immediately throws.

---

### Step 2 — prove the stanzas are accepted (15 minutes, needs the paired session)

Start with the safe set. It only ever messages your own account.

```bash
node scripts/verify-live.mjs --session ./session
```

Expect:

```
ok   connect (revision accepted)      socket open, creds intact
ok   send text, receive echo          id 3EB0... echoed as 3EB0...
skip send interactive buttons         pass --interactive to include it
```

Then add each shape you actually use, one at a time:

```bash
node scripts/verify-live.mjs --session ./session --interactive
node scripts/verify-live.mjs --session ./session --scheduled
node scripts/verify-live.mjs --session ./session --newsletter 1234567890@newsletter --post-status
node scripts/verify-live.mjs --session ./session --payments --music-uri https://mmg.whatsapp.net/...
```

`--payments` sends a payment reminder and a music message as raw proto fields
(`paymentReminderMessage` / `musicMessage`). The unit suite proves they encode and that raw mode accepts them; only
the server can prove they render, which is what this step adds. Music URIs must come from a Meta catalog entry —
the builder refuses anything not hosted on a WhatsApp/Meta CDN.

| Step | What it proves | If it fails |
|---|---|---|
| connect | the pinned `client_revision` is still accepted | 405/415 → revision stale, run `node scripts/check-revision.mjs --fix` and rebuild. 401/403/419 → session dead, delete `./session` and re-pair |
| send text, receive echo | send path and `messages.upsert` work end to end | check the session is still linked; look at the socket's own error |
| interactive buttons | the `interactiveMessage` payload and its `biz` node are accepted | compare against a message your phone renders; builders live in `src/Extras/MessageBuilder/` |
| scheduled | the `conditionalRevealMessage` envelope and its `<meta>` node are accepted, and unschedule too | the window is 10 min – 14 days for chats, 10 min – 30 days for newsletters |
| newsletter status | capabilities, then the post is confirmed by reading it back, then revoked | almost always a missing `CHANNEL_STATUS_PRODUCER` capability or non-admin rights, not a code bug |

**What it proves:** this is the only step that proves WhatsApp accepts what this fork sends. Everything else in
the repo is local.

---

### Step 3 — reconnect storm (5 minutes, needs the paired session)

```bash
node scripts/verify-live.mjs --session ./session --storm 5
```

It force-closes the websocket five times and waits for the socket to come back each time. It fails if a reconnect
times out, if `connection.update` listeners grow by more than 2 across cycles, or if the heap grows more than 60MB.

Expect something like `reconnects 820/640/700/660/690ms, listeners 1/1/1/1/1, heap 58/58/59/59/60MB`.

**What it proves:** the reconnect path works against the real server and does not leak listeners or memory. The
local soak suite covers the same failure modes for the message path, but only a live socket can test reconnect.

---

### Step 4 — soak (24 hours, needs the paired session)

Run your bot with the process watched, then look at the two numbers that matter:

```bash
node --expose-gc your-bot.js    # or however you start it
### in another shell, every hour:
ps -o rss= -p <pid>                     # RSS in KB
node -e "console.log(process.listenerCount?.('x'))"   # or log it from inside your bot
```

Log from inside the bot, hourly:

```js
setInterval(() => {
	const mb = Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
	const listeners = ['messages.upsert', 'connection.update', 'creds.update']
		.map(event => `${event}=${sock.ev.listenerCount(event)}`).join(' ')
	console.log(`[soak] heap=${mb}MB ${listeners}`)
}, 60 * 60 * 1000).unref()
```

**Pass:** heap plateaus (small sawtooth is normal, a straight climb is not) and listener counts stay flat.
**Fail:** listeners climbing means something adds a handler per message; heap climbing without retained data
usually means the same.

---

### Step 5 — put it in CI (10 minutes)

`.github/workflows/verify.yml` is in the repo. It runs on every push and PR, plus every Monday:

- build + `node --test` on Node 24 and 26
- the elaina parity audit against the pinned upstream release
- `scripts/check-revision.mjs` on the weekly schedule, which fails when the pinned client revision falls behind

Nothing to configure beyond pushing the file. If you fork, update the repo URL in the parity job.

---

### Step 6 — keep the revision fresh (ongoing)

```bash
node scripts/check-revision.mjs          # is the pin stale?
node scripts/check-revision.mjs --fix    # update src/Defaults/index.ts in place
npm run build
node scripts/verify-live.mjs --session ./session    # confirm the new pin connects
```

The weekly CI job does the check for you; the `--fix` + rebuild + verify loop is what you do when it fires.

---

### What is still unprovable from here

- **Load at your real message rate.** The suite proves correctness under concurrency, not throughput on your box.
- **Media upload.** The harness deliberately skips it to keep runs cheap.
- **Calls.** Audio/video need a second peer; `test/voip.test.js` covers the feeders and state machine only.
- **Ban risk.** No test can prove your account is safe. Keep the number expendable and the volume human-shaped.

_Also published at [docs/en/stability-checklist.md](../docs/en/stability-checklist.md)_

### store

### Store APIs at the package root

The existing in-memory store is available from the package root. It subscribes to socket events when bound and keeps an in-memory view of chats, contacts, messages, groups, presences, and labels. It is not a durable database by itself.

```ts
import makeWASocket, {
  makeInMemoryStore,
  makeOrderedDictionary,
  ObjectRepository,
  useMultiFileAuthState
} from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./auth')
const sock = makeWASocket({ auth: state })
const store = makeInMemoryStore({})
store.readFromFile('./baileys-store.json')
store.bind(sock.ev)

sock.ev.on('creds.update', saveCreds)
// Persist on your own chosen cadence or during graceful shutdown.
store.writeToFile('./baileys-store.json')

// Useful store lookups:
const message = await store.loadMessage('12345@s.whatsapp.net', 'MESSAGE_ID')
const latest = await store.mostRecentMessage('12345@s.whatsapp.net')
const group = await store.fetchGroupMetadata('GROUP_ID@g.us', sock)

// A small ordered dictionary keyed by an item's id:
const recent = makeOrderedDictionary<{ id: string; text: string }>(item => item.id)
recent.upsert({ id: 'm1', text: 'hello' }, 'append')
console.log(recent.get('m1'), recent.array)

// Generic in-memory repository for entities with string ids:
const labels = new ObjectRepository<{ id: string; name: string }>()
labels.upsertById('label-1', { id: 'label-1', name: 'Important' })
console.log(labels.findById('label-1'), labels.findAll())
```

`store.readFromFile()` / `writeToFile()` are synchronous JSON helpers. Protect the file appropriately and prefer a database-backed store if you need durability, concurrent writers, or large histories.

_Also published at [docs/en/store.md](../docs/en/store.md)_

### voip

### Unified VoIP API

Anya and Elaina call features are exposed through **one `voip` client**. No engine-selection option is required: the method you invoke automatically selects the internal signaling engine. The merged implementation in `src/Voip/` is the only VoIP source in this tree.

```ts
import makeWASocket from '@teamolduser/baileys'

const sock = makeWASocket({ auth: state })
const voip = await sock.makeVoipClient()

// Anya multi-call API
const call = await voip.initiateCall('15551234567', {
  audioSource: './audio.mp3',
  durationMs: 60_000
})
const activeCalls = await voip.getActiveCalls()

// Elaina media/group-call API is available on the same client.
// First end the previous call before switching internal signaling engines.
// const mediaCall = await voip.call('15551234567', { audioSource: './audio.mp3' })
// mediaCall.enqueue('./next-track.mp3')

// Alternative: import { makeVoipClient } and use the top-level factory:
// const socketVoip = await makeVoipClient(sock)
```

The same client exposes `initiateCall()`, `initiateCalls()`, `callMany()`, `acceptCall()`, `rejectCall()`, `call()`, `callGroup()`, `joinGroupCall()`, `getActiveCalls()`, `getCall()`, `getActiveCallCount()`, `endCall()`, `endAllCalls()`, `setOptions()`, `resetCallState()`, and `disconnect()`. The call object includes methods appropriate to the call-creation API: Anya calls expose incoming-call lifecycle and video controls; Elaina calls expose audio/video playlists and screen-sharing controls.

**Safety note:** Both original engines own WhatsApp signaling state, so they cannot safely manage active calls at the same time on one socket. The unified client switches automatically only when the previous engine has no active calls; it throws a clear error if a switch is attempted while a call is active. Do not start direct `sock.initiateCall()` calls while an Elaina media call is active. See the complete VoIP API guide.

### VoIP diagnostics and call timelines

Ported from innovatorssoft/baileys. One shared instance records a bounded per-call timeline and redacts anything that
looks like key material before it reaches a log line.

```ts
import { voipDiagnostics, VoipDiagnostics, sanitizeJid, summarizeNode } from '@teamolduser/baileys'

// one shared instance; pass your pino logger so lines go wherever the rest of your logs go
voipDiagnostics.setLogger(logger)
voipDiagnostics.setDiagnosticMode(true)   // elevates debug -> info in production

voipDiagnostics.log({
    component: 'Signaling',
    event: 'offer_received',
    callId,
    jid: peerJid,
    data: { retry: 2, enc: 'never logged' }   // enc comes out as [REDACTED]
})

// reconstruct a failed call
console.log(voipDiagnostics.formatTimeline(callId))
```

| Export | What it does |
| --- | --- |
| `voipDiagnostics` | shared `VoipDiagnostics` instance (one per process, across module copies) |
| `new VoipDiagnostics(logger, { diagnostic, logFile })` | your own instance; `logFile` is opt-in — nothing is written to disk unless you name a file |
| `CallTimelineStore` | the bounded timeline on its own (`maxEntriesPerCall`, `maxCalls`, `ttlMs`) |
| `sanitizeJid` / `summarizeAttrs` / `summarizeNode` | redaction helpers, usable in your own logging |

`CallSession` is the innovatorssoft name for the call object this package exposes as `ActiveCall`; both names are
exported from the package root.

_Also published at [docs/en/voip.md](../docs/en/voip.md)_

### webview

### In-app HTML webview (`webView`)

Hand it the jid and the HTML, it sends the page. Nothing else — no markup helpers, no validation layer, no height
injection. The HTML goes out exactly as you wrote it.

It is on the socket, under three names:

```ts
const { messageId } = await sock.webView(jid, {
    html: page,                 // your full HTML document, sent byte-for-byte
    title: 'Order status',      // optional: disclaimer text + notification preview
    label: 'tap to open',       // optional: preview line on the card
    forwarded: false            // optional: no "Forwarded" badge
})

await sock.web(jid, { html: page })             // same method
await sock.sendHtmlWebview(jid, { html: page }) // the name it shipped under first
```

The standalone function still exists for code that already holds the socket:

```ts
import { webView } from '@teamolduser/baileys'

const { messageId } = await webView(sock, jid, { html: page })
```

| Option | Meaning |
| --- | --- |
| `html` | the page — required, passed through untouched |
| `title` | `messageDisclaimerText` + notification preview |
| `label` | the submessage preview on the card |
| `forwarded` | `true` (default) = Meta-AI forward styling, `false` = clean origin |
| `quoted` | quote an existing message |
| `messageId` | reuse a specific id instead of generating one |

`web` and `sendHtmlWebview` are aliases of the same function — `web(sock, jid, { html })` works exactly the same, and
code written against the earlier name keeps working.

Two stanzas go out and both are needed: the `botForwardedMessage` rich response, then a `protocolMessage` **type-14
edit** of that same message id. The second is what makes the client render the page — send only the first and the card
never opens.

Validation is not done here. If you want a page checked before sending, run your own check first — this function sends
what you give it.

_Also published at [docs/en/webview.md](../docs/en/webview.md)_

## 🔎 API reference

Every export from `src/Extras`, `src/Addons` and `src/Utils`, with the signature it is declared with. Kept in step with
the source by hand — if you add an export, add a row.

### Extras

| Module | Export | Kind |
| --- | --- | --- |
| `auth-store` | `CREDS_KEY` | const |
| `auth-store` | `AuthStoreEntry` | interface |
| `auth-store` | `AuthStore` | interface |
| `auth-store` | `DatabaseAuthState` | interface |
| `auth-store` | `encodeAuthValue` | const |
| `auth-store` | `decodeAuthValue` | const |
| `auth-store` | `loadOptionalModule` | const |
| `auth-store` | `makeAuthStateFromStore` | const |
| `chats-extras` | `PortedChatQueryIds` | const |
| `chats-extras` | `PortedChatPaths` | const |
| `chats-extras` | `SPAM_FLOWS` | const |
| `chats-extras` | `SpamReportOptions` | interface |
| `chats-extras` | `buildSpamListNode` | const |
| `chats-extras` | `readSpamReportResult` | const |
| `chats-extras` | `AccountHealth` | interface |
| `chats-extras` | `ChatsExtrasSocket` | interface |
| `chats-extras` | `makeChatsExtras` | const |
| `group-metadata-cache` | `GROUP_ADDRESSING_MODES` | const |
| `group-metadata-cache` | `isUsableGroupMetadata` | const |
| `group-metadata-cache` | `describeUnusableGroupMetadata` | const |
| `html-app` | `HTML_APP_MESSAGE_CEILING` | const |
| `html-app` | `HTML_APP_BYTE_BUDGET` | const |
| `html-app` | `HTML_APP_BYTE_LIMIT` | const |
| `html-app` | `wireBytes` | const |
| `html-app` | `HtmlAppCheckOptions` | interface |
| `html-app` | `checkHtmlApp` | const |
| `html-multiplayer` | `HtmlMultiplayerOptions` | interface |
| `html-multiplayer` | `htmlMultiplayerPrelude` | const |
| `html-multiplayer` | `withHtmlMultiplayer` | const |
| `link-preview-metadata` | `SocialMediaPostType` | const |
| `link-preview-metadata` | `VideoEndCardInput` | interface |
| `link-preview-metadata` | `videoEndCard` | const |
| `link-preview-metadata` | `SocialPreviewInput` | interface |
| `link-preview-metadata` | `SocialPreviewInput` | interface |
| `link-preview-metadata` | `buildSocialPreview` | const |
| `link-preview-metadata` | `readSocialPreview` | const |
| `messages-extras` | `AssociationType` | const |
| `messages-extras` | `senderKeyMemoryResetSummary` | const |
| `messages-extras` | `MessagesExtrasSocket` | interface |
| `messages-extras` | `MessagesExtrasConfig` | interface |
| `messages-extras` | `makeMessagesExtras` | const |
| `messages-helpers` | `trimEmptyValues` | const |
| `messages-helpers` | `songThumbnail` | const |
| `messages-helpers` | `prepareLinkThumbnail` | const |
| `messages-helpers` | `prepareProductMessage` | const |
| `messages-helpers` | `buttonLimitFor` | const |
| `messages-helpers` | `nativeFlowButtonsViolateConstraints` | const |
| `messages-helpers` | `warnOnNativeFlowConstraints` | const |
| `modern-messages` | `STATUS_NOTIFICATION_TYPES` | const |
| `modern-messages` | `makeQuestionMessage` | const |
| `modern-messages` | `makeQuestionResponseMessage` | const |
| `modern-messages` | `makeQuestionReplyMessage` | const |
| `modern-messages` | `makeStatusQuestionAnswerMessage` | const |
| `modern-messages` | `makeStatusQuotedMessage` | const |
| `modern-messages` | `makeStatusStickerInteractionMessage` | const |
| `modern-messages` | `makeStatusNotificationMessage` | const |
| `modern-messages` | `makeNewsletterAdminInviteMessage` | const |
| `modern-messages` | `makeNewsletterFollowerInviteMessage` | const |
| `modern-messages` | `makePollAddOptionMessage` | const |
| `modern-messages` | `makeCommentMessage` | const |
| `modern-messages` | `makeEventInviteMessage` | const |
| `modern-messages` | `makeScheduledCallCreationMessage` | const |
| `modern-messages` | `makeScheduledCallEditMessage` | const |
| `modern-messages` | `makeGroupStatusReactionMessage` | const |
| `modern-messages` | `makeNewsletterStatusAttribution` | const |
| `modern-messages` | `makeGroupStatusAttribution` | const |
| `modern-messages` | `STATUS_AUDIENCE_DEFAULT_LIST_NAME` | const |
| `modern-messages` | `STATUS_AUDIENCE_DEFAULT_EMOJI` | const |
| `modern-messages` | `makeStatusAudienceMetadata` | const |
| `modern-messages` | `makeMessageAssociation` | const |
| `modern-messages` | `makeStatusAddYoursAssociation` | const |
| `modern-messages` | `makeStatusMentionMessage` | const |
| `modern-messages` | `prepareModernMessageContent` | const |
| `native-flow` | `NATIVE_FLOW_NAMES` | const |
| `native-flow` | `WEB_SUPPORTED_INTERACTIVE_FLOWS` | const |
| `native-flow` | `NATIVE_FLOW_BUTTON_LIMIT` | const |
| `native-flow` | `getNativeFlowNameByButtonName` | const |
| `native-flow` | `isWebSupportedButtonName` | const |
| `native-flow` | `checkNativeFlowButtons` | const |
| `newsletter-extras` | `PortedNewsletterQueryIds` | const |
| `newsletter-extras` | `PortedNewsletterPaths` | const |
| `newsletter-extras` | `toNewsletterServerIds` | const |
| `newsletter-extras` | `NewsletterUserSettingType` | type |
| `newsletter-extras` | `toNewsletterUserSettingInput` | const |
| `newsletter-extras` | `decodeNewsletterPlaintext` | const |
| `newsletter-extras` | `decodeNewsletterMessageNodes` | const |
| `newsletter-extras` | `NewsletterExtrasDeps` | interface |
| `newsletter-extras` | `makeNewsletterExtras` | const |
| `newsletter-status-socket` | `makeNewsletterStatusExtras` | const |
| `newsletter-status` | `getNewsletterStatusMediaType` | const |
| `newsletter-status` | `NEWSLETTER_SERVER_ID_MIN` | const |
| `newsletter-status` | `NEWSLETTER_SERVER_ID_MAX` | const |
| `newsletter-status` | `toNewsletterServerId` | const |
| `newsletter-status` | `withNewsletterStatusAttribution` | const |
| `newsletter-status` | `parseNewsletterStatusAck` | const |
| `newsletter-status` | `NewsletterStatusConfig` | interface |
| `newsletter-status` | `NewsletterStatusSocket` | interface |
| `newsletter-status` | `waitForNewsletterStatusServerId` | const |
| `newsletter-status` | `buildNewsletterAdminProfileStatusMessage` | const |
| `newsletter-status` | `buildNewsletterStatusNode` | const |
| `newsletter-status` | `buildNewsletterStatusReactionNode` | const |
| `newsletter-status` | `buildNewsletterStatusRevokeNode` | const |
| `newsletter-status` | `makeNewsletterStatusSender` | const |
| `newsletter-status` | `makeNewsletterStatusReactionSender` | const |
| `newsletter-status` | `makeNewsletterStatusRevokeSender` | const |
| `newsletter-status` | `parseNewsletterStatusUpdatesResponse` | const |
| `newsletter-status` | `makeNewsletterStatusUpdatesFetcher` | const |
| `newsletter-status` | `parseNewsletterStatusesResponse` | const |
| `newsletter-status` | `makeNewsletterStatusFetcher` | const |
| `optional-media` | `loadSharp` | const |
| `optional-media` | `loadFfmpeg` | const |
| `optional-media` | `hasOptionalMedia` | const |
| `payment-messages` | `SplitPaymentStatus` | const |
| `payment-messages` | `ReminderFrequency` | const |
| `payment-messages` | `ReminderStatus` | const |
| `payment-messages` | `MONEY_OFFSET` | const |
| `payment-messages` | `money` | const |
| `payment-messages` | `readMoney` | const |
| `payment-messages` | `SplitPaymentParticipant` | interface |
| `payment-messages` | `SplitPaymentInput` | interface |
| `payment-messages` | `buildSplitPayment` | const |
| `payment-messages` | `buildSplitPaymentUpdate` | const |
| `payment-messages` | `PaymentReminderInput` | interface |
| `payment-messages` | `buildPaymentReminder` | const |
| `payment-messages` | `readSplitPayment` | const |
| `payment-messages` | `readPaymentReminder` | const |
| `scheduled-message` | `SCHEDULED_MSG_META_TYPE` | const |
| `scheduled-message` | `SCHEDULED_MSG_MAX_PER_CHAT` | const |
| `scheduled-message` | `SCHEDULED_MSG_MAX_MEDIA` | const |
| `scheduled-message` | `SCHEDULED_MSG_RESOURCE_LIMIT_NACK_CODE` | const |
| `scheduled-message` | `SCHEDULED_MSG_REVEAL_KEY_BYTES` | const |
| `scheduled-message` | `SCHEDULED_MSG_REVEAL_KEY_IV_BYTES` | const |
| `scheduled-message` | `SCHEDULED_MSG_REVEAL_KEY_RETENTION_DAYS` | const |
| `scheduled-message` | `SCHEDULED_MSG_TAG_BYTES` | const |
| `scheduled-message` | `SCHEDULED_MSG_WINDOW` | const |
| `scheduled-message` | `generateRevealKey` | const |
| `scheduled-message` | `generateRevealKeyId` | const |
| `scheduled-message` | `encryptWithRevealKey` | const |
| `scheduled-message` | `decryptWithRevealKey` | const |
| `scheduled-message` | `buildConditionalRevealMessage` | const |
| `scheduled-message` | `encodeScheduledMessage` | const |
| `scheduled-message` | `decodeScheduledMessage` | const |
| `scheduled-message` | `buildScheduledMsgMetaNode` | const |
| `scheduled-message` | `buildUnscheduleProtocolMessage` | const |
| `scheduled-message` | `isScheduledTimeValid` | const |
| `sender-key-memory` | `pickSenderKeyRecipients` | const |
| `sender-key-memory` | `deliveredSenderKeyJids` | const |
| `sender-key-memory` | `senderKeyResetSummary` | const |
| `sender-key-memory` | `commitSenderKeyDelivery` | const |
| `socket` | `bindMessageBuilder` | const |
| `socket` | `preparePortedMessageContent` | const |
| `socket` | `makePortedSocket` | const |
| `status-stickers` | `StatusLinkType` | const |
| `status-stickers` | `STICKER_DEFAULT_AREA` | const |
| `status-stickers` | `StickerArea` | interface |
| `status-stickers` | `stickerArea` | const |
| `status-stickers` | `locationSticker` | const |
| `status-stickers` | `channelSticker` | const |
| `status-stickers` | `linkSticker` | const |
| `status-stickers` | `MusicStickerOptions` | interface |
| `status-stickers` | `musicSticker` | const |
| `status-stickers` | `messageSticker` | const |
| `status-stickers` | `normalizeStickers` | const |
| `status-stickers` | `readStickers` | const |
| `status-stickers` | `MusicMessageStyle` | const |
| `status-stickers` | `MUSIC_ALLOWED_HOSTS` | const |
| `status-stickers` | `isMusicHostAllowed` | const |
| `status-stickers` | `buildMusicMessage` | const |
| `status-stickers` | `readMusicMessage` | const |
| `ttl-cache` | `TTLCache` | class |
| `use-mongo-auth-state2` | `MongoAuthState2Options` | interface |
| `use-mongo-auth-state2` | `useMongoAuthState2( /** `(uri)`, `(uri, collectionName, session)`, `({ uri, collectionName, session })`, `({ collection })`. */ a: string | MongoAuthState2Options = {}, b?: string | MongoAuthState2Options, c?: string )` | function |
| `use-mongo-auth-state2` | `useMongoAuthState` | const |
| `use-mysql-auth-state` | `MySQLAuthStateOptions` | interface |
| `use-mysql-auth-state` | `useMySQLAuthState( /** `(uri)`, `(uri, table, session)`, `({ uri, table, session })`, `({ pool })`. */ a: string | MySQLAuthStateOptions = {}, b?: string | MySQLAuthStateOptions, c?: string )` | function |
| `use-nedb-auth-state` | `NedbAuthState` | interface |
| `use-nedb-auth-state` | `NedbAuthStateOptions` | interface |
| `use-nedb-auth-state` | `useNedbAuthState( /** * Accepted shapes: `(datastore)`, `(filename)`, `({ filename })`, `(datastore, { session })`, * `({ filename, session })` — and the other mixes every adapter accepts. */ a: any, b?: string | NedbAuthStateOptions, c?: string | NedbAuthStateOptions )` | function |
| `use-nekodb-auth-state` | `NekoDBAuthState` | interface |
| `use-nekodb-auth-state` | `NekoDBAuthOptions` | interface |
| `use-nekodb-auth-state` | `useNekoDBAuth( /** * Accepted shapes: `(db)`, `(db, collectionName, { session })`, `({ db, collectionName, session })`. */ a: any, b: string | (NekoDBAuthOptions & { db?: any; collectionName?: string }) = 'baileys_auth', c?: NekoDBAuthOptions )` | function |
| `use-postgres-auth-state` | `PostgresAuthStateOptions` | interface |
| `use-postgres-auth-state` | `usePostgresAuthState( /** `(connectionString)`, `(connectionString, table, session)`, `({ connectionString, table, session })`, `({ pool })`. */ a: string | PostgresAuthStateOptions = {}, b?: string | PostgresAuthStateOptions, c?: string )` | function |
| `use-redis-auth-state` | `RedisAuthStateOptions` | interface |
| `use-redis-auth-state` | `connectFromUri` | const |
| `use-redis-auth-state` | `useRedisAuthState( /** `(uri)`, `(uri, session)`, `({ uri, session })`, `({ client })`. */ a: string | RedisAuthStateOptions = {}, b?: string | RedisAuthStateOptions, c?: string )` | function |
| `use-redis-auth-state2` | `RedisAuthState2Options` | interface |
| `use-redis-auth-state2` | `useRedisAuthState2( /** `(url)`, `(url, session)`, `({ url, session })`, `({ client })`. */ a: string | RedisAuthState2Options = {}, b?: string | RedisAuthState2Options, c?: string )` | function |
| `use-sqlite-auth-state2` | `SqliteAuthState2Options` | type |
| `use-sqlite-auth-state2` | `SqliteAuthState2Result` | type |
| `use-sqlite-auth-state2` | `useSqliteAuthState2( /** * Options object, or positional arguments. Accepted shapes: * `(dbPath)`, `(dbPath, session)`, `({ dbPath })`, `({ dbPath, session })`, `({ database })`. */ a: string | SqliteAuthState2Options, b?: string | SqliteAuthState2Options, c?: string )` | function |
| `use-sqlite-auth-state2` | `useSqliteAuthState` | const |
| `use-turso-auth-state` | `TursoAuthStateOptions` | interface |
| `use-turso-auth-state` | `toLibsqlUrl` | const |
| `use-turso-auth-state` | `useTursoAuthState( /** `(url)`, `(url, token, session)`, `({ url, authToken, session })`, `({ path })`. */ a: string | TursoAuthStateOptions = {}, b?: string | TursoAuthStateOptions, c?: string )` | function |
| `voice-recognition` | `normalizeVoiceText` | const |
| `voice-recognition` | `matchVoiceWakePhrase` | const |
| `voice-recognition` | `removeVoiceWakePhrase` | const |
| `voice-recognition` | `bindVoiceRecognition` | const |

### Addons

| Module | Export | Kind |
| --- | --- | --- |
| `anti-delete` | `MessageStoreOptions` | interface |
| `anti-delete` | `StoredMessage` | interface |
| `anti-delete` | `DeletedMessageInfo` | interface |
| `anti-delete` | `MessageStore` | class |
| `anti-delete` | `isDeleteMessage` | const |
| `anti-delete` | `getDeletedMessageKey` | const |
| `anti-delete` | `createAntiDeleteHandler` | const |
| `anti-delete` | `createMessageStoreHandler` | const |
| `auto-reply` | `AutoReplyRule` | interface |
| `auto-reply` | `AutoReplyOptions` | interface |
| `auto-reply` | `AutoReplyHandler` | class |
| `auto-reply` | `createAutoReply` | const |
| `baileys-event-stream` | `captureEventStream` | const |
| `baileys-event-stream` | `readAndEmitEventStream` | const |
| `bot-forwarded-message` | `RichContent` | type |
| `bot-forwarded-message` | `toUnified` | const |
| `bot-forwarded-message` | `botMetadataSignature` | const |
| `bot-forwarded-message` | `botMetadataCertificate` | const |
| `bot-forwarded-message` | `wrapToBotForwardedMessage` | const |
| `bot-forwarded-message` | `prepareRichResponseMessage` | const |
| `browser-presets` | `androidBrowserPreset` | const |
| `browser-presets` | `getPlatformDisplayName` | const |
| `button-sender` | `NativeSendButton` | type |
| `button-sender` | `LegacySendButton` | type |
| `button-sender` | `OldBaileysSendButton` | type |
| `button-sender` | `AnyRawButton` | type |
| `button-sender` | `SendButtonsData` | interface |
| `button-sender` | `SendInteractiveData` | interface |
| `button-sender` | `ValidationResult` | interface |
| `button-sender` | `ButtonSenderSocket` | interface |
| `button-sender` | `InteractiveValidationError` | class |
| `button-sender` | `buildInteractiveButtons(buttons: AnyRawButton[] = [])` | function |
| `button-sender` | `validateAuthoringButtons(buttons: unknown)` | function |
| `button-sender` | `validateSendButtonsPayload(data: unknown)` | function |
| `button-sender` | `validateSendInteractiveMessagePayload(data: unknown)` | function |
| `button-sender` | `validateInteractiveMessageContent(content: unknown)` | function |
| `button-sender` | `convertToInteractiveMessage(content: Record<string, unknown>)` | function |
| `button-sender` | `sendInteractiveMessage( sock: ButtonSenderSocket, jid: string, content: Record<string, unknown>, options: MessageRelayOptions = {} )` | function |
| `button-sender` | `sendInteractiveMessageV2( sock: ButtonSenderSocket, jid: string, content: Record<string, unknown>, options: MessageRelayOptions = {} )` | function |
| `button-sender` | `sendButtons( sock: ButtonSenderSocket, jid: string, data: SendButtonsData = { text: '', buttons: [] }, options: MessageRelayOptions = {} )` | function |
| `call-handler` | `CallHandlerContext` | interface |
| `call-handler` | `RelayEntry` | interface |
| `call-handler` | `CallTransportCandidate` | interface |
| `call-handler` | `makeCallHandlerAddon` | const |
| `chat-control` | `DISAPPEARING_DURATIONS` | const |
| `chat-control` | `DisappearingDuration` | type |
| `chat-control` | `TypingIndicator` | class |
| `chat-control` | `createTypingIndicator` | const |
| `chat-control` | `PinnedMessage` | type |
| `chat-control` | `PinnedMessagesManager` | class |
| `chat-control` | `createPinnedMessagesManager` | const |
| `chat-control` | `ReadReceiptConfig` | type |
| `chat-control` | `ReadReceiptController` | type |
| `chat-control` | `createReadReceiptController` | const |
| `chat-history-helpers` | `getLastMessageInChat` | const |
| `chat-history-helpers` | `getOldestMessageInChat` | const |
| `chat-history-helpers` | `copyNForward` | const |
| `chat-history-helpers` | `uploadMediaToWhatsApp` | const |
| `disappearing` | `DISAPPEARING_SHORTHANDS` | const |
| `disappearing` | `normalizeDisappearingDuration` | const |
| `find-user-id` | `UserIdLookup` | type |
| `find-user-id` | `findUserId` | const |
| `from-chats` | `buildClearMessageModification(key: WAMessageKey, timeStamp: number | Long)` | function |
| `from-chats` | `createChatHelpers(chatModify: (mod: ChatModification, jid: string) => Promise<any>)` | function |
| `from-messages-recv` | `CallHandlerDeps` | type |
| `from-messages-recv` | `makeCallHandlers(deps: CallHandlerDeps)` | function |
| `from-messages-send` | `StatusMentionDeps` | interface |
| `from-messages-send` | `normalizeStatusContent(content: AnyMessageContent)` | function |
| `from-messages-send` | `buildStatusMentionNode(jids: string[])` | function |
| `from-messages-send` | `execSendStatusMentions( content: AnyMessageContent, jids: string[], deps: StatusMentionDeps )` | function |
| `from-messages` | `buildAdminInviteMessage( adminInvite: AdminInviteInfo, contextInfo: any, options: MessageContentGenerationOptions )` | function |
| `from-messages` | `buildCallMessage(call: CallCreationInfo)` | function |
| `from-messages` | `buildPaymentInviteMessage(paymentInvite: PaymentInviteInfo)` | function |
| `from-messages` | `buildPaymentMessage(payment: PaymentMessageOptions)` | function |
| `from-messages` | `isWebPBuffer(buffer: Buffer)` | function |
| `from-messages` | `isAnimatedWebP(buffer: Buffer)` | function |
| `from-messages` | `isLottieBuffer(buffer: Buffer)` | function |
| `from-messages` | `resolveStickerPackConcurrency` | const |
| `from-messages` | `StickerWebpOptions` | type |
| `from-messages` | `resolveStickerPackMaxSize` | const |
| `from-messages` | `resolveStickerQuality` | const |
| `from-messages` | `sharpToStickerWebp` | const |
| `from-messages` | `toStickerWebp` | const |
| `from-messages` | `buildStickerPackMessage( stickerPack: StickerPack, options: MessageContentGenerationOptions )` | function |
| `group-status-v2` | `GroupStatusV2( // eslint-disable-next-line @typescript-eslint/no-explicit-any sock: any, jid: string, content: AnyMessageContent, options: Partial<MessageGenerationOptions> = {} )` | function |
| `group-status` | `GroupStatus( sock: any, groupJid: string, content: Record<string, any>, options: Record<string, any> = {} )` | function |
| `image-processing` | `getImageProcessingLibrary` | const |
| `image-processing` | `clearImageProcessingLibraryCache` | const |
| `image-processing` | `getImageProcessingLibraryName` | const |
| `in-memory-store` | `InMemoryStoreConfig` | type |
| `in-memory-store` | `InMemoryStore` | type |
| `in-memory-store` | `makeInMemoryStore` | const |
| `interactive-message-basic` | `BasicButton` | type |
| `interactive-message-basic` | `BasicButtonsContent` | type |
| `interactive-message-basic` | `generateInteractiveButtonMessage` | const |
| `interactive-message-basic` | `BasicListRow` | type |
| `interactive-message-basic` | `BasicListSection` | type |
| `interactive-message-basic` | `BasicListContent` | type |
| `interactive-message-basic` | `generateInteractiveListMessage` | const |
| `interactive-message-basic` | `BasicTemplateButton` | type |
| `interactive-message-basic` | `BasicTemplateContent` | type |
| `interactive-message-basic` | `generateTemplateMessage` | const |
| `interactive-message-basic` | `BasicNativeFlowButton` | type |
| `interactive-message-basic` | `BasicNativeFlowOptions` | type |
| `interactive-message-basic` | `generateNativeFlowMessage` | const |
| `interactive-message-basic` | `generateCopyCodeButton` | const |
| `interactive-message-basic` | `BasicUrlButton` | type |
| `interactive-message-basic` | `generateUrlButtonMessage` | const |
| `interactive-message-basic` | `BasicQuickReplyButton` | type |
| `interactive-message-basic` | `generateQuickReplyButtons` | const |
| `interactive-message-basic` | `BasicCombinedButton` | type |
| `interactive-message-basic` | `generateCombinedButtons` | const |
| `interactive-message` | `InteractiveButton` | type |
| `interactive-message` | `InteractiveButtonMessageContent` | type |
| `interactive-message` | `ListRow` | type |
| `interactive-message` | `ListSection` | type |
| `interactive-message` | `InteractiveListMessageContent` | type |
| `interactive-message` | `TemplateHydratedButton` | type |
| `interactive-message` | `TemplateMessageContent` | type |
| `interactive-message` | `NativeFlowButton` | type |
| `interactive-message` | `NativeFlowOptions` | type |
| `interactive-message` | `CopyCodeButtonOptions` | type |
| `interactive-message` | `UrlButton` | type |
| `interactive-message` | `UrlButtonOptions` | type |
| `interactive-message` | `QuickReplyButton` | type |
| `interactive-message` | `QuickReplyOptions` | type |
| `interactive-message` | `CombinedButton` | type |
| `interactive-message` | `CombinedButtonOptions` | type |
| `interactive-message` | `generateInteractiveButtonMessage` | const |
| `interactive-message` | `generateInteractiveListMessage` | const |
| `interactive-message` | `generateTemplateMessage` | const |
| `interactive-message` | `generateNativeFlowMessage` | const |
| `interactive-message` | `generateCopyCodeButton` | const |
| `interactive-message` | `generateUrlButtonMessage` | const |
| `interactive-message` | `generateQuickReplyButtons` | const |
| `interactive-message` | `generateCombinedButtons` | const |
| `jid-plot` | `JidPlotEntry` | type |
| `jid-plot` | `plotJidPair` | const |
| `jid-plot` | `plotJidPairs` | const |
| `jid-plot` | `resolvePnJid` | const |
| `jid-plot` | `resolveLidJid` | const |
| `jid-plot` | `hasLidMapping` | const |
| `jid-plot` | `hasPnMapping` | const |
| `jid-plot` | `getAllJidPlotEntries` | const |
| `jid-plot` | `clearJidPlot` | const |
| `jid-plot` | `normalizeJidForSend` | const |
| `jid-plotting` | `JidInfo` | interface |
| `jid-plotting` | `SenderPnInfo` | interface |
| `jid-plotting` | `PlottedJid` | interface |
| `jid-plotting` | `parseJid` | const |
| `jid-plotting` | `getSenderPn` | const |
| `jid-plotting` | `getCurrentSenderInfo` | const |
| `jid-plotting` | `isSelf` | const |
| `jid-plotting` | `plotJid` | const |
| `jid-plotting` | `normalizePhoneToJid` | const |
| `jid-plotting` | `extractPhoneNumber` | const |
| `jid-plotting` | `formatJidDisplay` | const |
| `jid-plotting` | `isSameUser` | const |
| `jid-plotting` | `getJidVariants` | const |
| `jid-plotting` | `constructJidWithDevice` | const |
| `jid-plotting` | `getRemoteJidFromMessage` | const |
| `jid-plotting` | `JidPlotterWithMapping` | interface |
| `jid-plotting` | `createJidPlotter` | const |
| `lid-support` | `OnWhatsAppResult` | type |
| `lid-support` | `splitJidsByType` | const |
| `lid-support` | `mergeLidAndPnResults` | const |
| `link-preview-extras` | `applyLinkPreviewMetadata` | const |
| `link-preview-extras` | `buildFaviconMMSMetadata` | const |
| `mathjax` | `getMathJax` | const |
| `mathjax` | `scaleMap` | const |
| `mathjax` | `unsupportedCommands` | const |
| `mathjax` | `convertLatexToSvg` | const |
| `mathjax` | `LatexRenderOptions` | interface |
| `mathjax` | `renderLatexToPng` | const |
| `mathjax` | `renderLatexToPngg` | const |
| `mathjax` | `convertLatexToPng` | const |
| `media-messages` | `generateProfilePictureFull` | const |
| `media-messages` | `changeprofileFull` | const |
| `media-messages` | `generateProfilePictureFP` | const |
| `media-messages` | `generatePP` | const |
| `media-messages` | `generateProfilePicturee` | const |
| `media-set` | `updateProfilePictureFull` | const |
| `media-set` | `updateProfilePictureFull2` | const |
| `media-set` | `groupStatus` | const |
| `media-set` | `groupStatusV2` | const |
| `media-set` | `groupSetMemberLabel` | const |
| `media-set` | `groupLabel` | const |
| `message-composer` | `CPP_KEYWORDS` | const |
| `message-composer` | `CSS_KEYWORDS` | const |
| `message-composer` | `GO_KEYWORDS` | const |
| `message-composer` | `HTML_KEYWORDS` | const |
| `message-composer` | `JS_KEYWORDS` | const |
| `message-composer` | `PYTHON_KEYWORDS` | const |
| `message-composer` | `RUST_KEYWORDS` | const |
| `message-composer` | `C_KEYWORDS` | const |
| `message-composer` | `CSHARP_KEYWORDS` | const |
| `message-composer` | `BASH_KEYWORDS` | const |
| `message-composer` | `CMD_KEYWORDS` | const |
| `message-composer` | `POWERSHELL_KEYWORDS` | const |
| `message-composer` | `LANGUAGE_KEYWORDS` | const |
| `message-composer` | `CodeToken` | type |
| `message-composer` | `LatexExpression` | type |
| `message-composer` | `RichSubMessage` | type |
| `message-composer` | `ExtractOptions` | type |
| `message-composer` | `InlineEntityItem` | interface |
| `message-composer` | `ExtractedIE` | interface |
| `message-composer` | `RichMessageContent` | type |
| `message-composer` | `CapturedUnifiedResponse` | type |
| `message-composer` | `tokenizeCode` | const |
| `message-composer` | `extractIE` | const |
| `message-composer` | `buildRichContextInfo` | const |
| `message-composer` | `buildBotForwardedMessage` | const |
| `message-composer` | `generateTableContent` | const |
| `message-composer` | `generateListContent` | const |
| `message-composer` | `generateCodeBlockContent` | const |
| `message-composer` | `generateLatexContent` | const |
| `message-composer` | `generateLatexImageContent` | const |
| `message-composer` | `generateLatexInlineImageContent` | const |
| `message-composer` | `extractUnifiedResponse` | const |
| `message-composer` | `generateUnifiedResponseContent` | const |
| `message-composer` | `GenerateRichMessageOptions` | type |
| `message-composer` | `generateRichMessageContent` | const |
| `message-composer` | `GenerateRichHtmlOptions` | type |
| `message-composer` | `generateRichHtmlContent` | const |
| `message-composer` | `sendRichHtml` | const |
| `message-composer` | `renderLatexToPng` | const |
| `message-composer` | `uploadUnencryptedToWA` | const |
| `message-composer` | `generateMarkdownContent` | const |
| `message-scheduler` | `ScheduledMessageJob` | type |
| `message-scheduler` | `attachSchedulerSendFn` | const |
| `message-scheduler` | `scheduleMessage` | const |
| `message-scheduler` | `scheduleMessageAfter` | const |
| `message-scheduler` | `cancelScheduledMessage` | const |
| `message-scheduler` | `getScheduledMessage` | const |
| `message-scheduler` | `getAllScheduledMessages` | const |
| `message-scheduler` | `getPendingScheduledMessages` | const |
| `message-scheduler` | `cancelAllScheduledMessages` | const |
| `message-search` | `SearchMessageType` | type |
| `message-search` | `SearchOptions` | interface |
| `message-search` | `SearchResult` | interface |
| `message-search` | `RegexSearchOptions` | interface |
| `message-search` | `extractMessageText` | const |
| `message-search` | `calculateRelevance` | const |
| `message-search` | `searchMessages` | const |
| `message-search` | `searchMessagesRegex` | const |
| `message-search` | `MessageSearchManager` | class |
| `message-search` | `createMessageSearch` | const |
| `message-utils` | `getMediaType(message: proto.IMessage)` | function |
| `message-utils` | `getMessageType(message: proto.IMessage)` | function |
| `message-utils` | `getButtonType(message: proto.IMessage)` | function |
| `message-utils` | `getButtonArgs(message: proto.IMessage)` | function |
| `message-utils` | `MentionContent` | interface |
| `message-utils` | `AlbumMediaItem` | type |
| `message-utils` | `AlbumOptions` | interface |
| `message-utils` | `MessageExtrasContext` | interface |
| `message-utils` | `buildMentionContextInfo` | const |
| `message-utils` | `extractFromButtonsMessage` | const |
| `message-utils` | `normalizeMediaInput` | const |
| `message-utils` | `patchMessageForMdIfRequired` | const |
| `message-utils` | `prepareAlbumMessageContent` | const |
| `message-utils` | `makeMessageExtrasAddon` | const |
| `native-flow-interactive` | `resolveButtonText` | const |
| `native-flow-interactive` | `buildNativeFlowMessageParamsJson` | const |
| `native-flow-interactive` | `convertNativeFlowButtons` | const |
| `native-flow-interactive` | `prepareNativeFlowMessage` | const |
| `native-flow-interactive` | `hasValidInteractiveHeader` | const |
| `native-flow-interactive` | `pickInteractiveHeaderMedia` | const |
| `native-flow-interactive` | `NativeFlowInteractiveDeps` | interface |
| `native-flow-interactive` | `buildNativeFlowInteractiveMessage` | const |
| `native-flow-interactive` | `hasRawInteractiveContent` | const |
| `native-flow-interactive` | `prepareRawInteractiveContent` | const |
| `newsletter-role-updates` | `NewsletterRoleUpdateAction` | type |
| `newsletter-role-updates` | `emitNewsletterRoleUpdate` | const |
| `outgoing-calls` | `WAInitiateCallOptions` | type |
| `outgoing-calls` | `WAInitiateCallResult` | type |
| `outgoing-calls` | `WACallUpdateType` | type |
| `outgoing-calls` | `createCallLink` | const |
| `outgoing-calls` | `initiateCall` | const |
| `outgoing-calls` | `rejectCall` | const |
| `outgoing-calls` | `endCall` | const |
| `pairing-fix` | `SendPairingIQFn` | type |
| `pairing-fix` | `PairingQueue` | type |
| `pairing-fix` | `createPairingQueue` | const |
| `past-participants` | `GroupPastParticipant` | type |
| `past-participants` | `GroupPastParticipantsResult` | type |
| `past-participants` | `processPastParticipants` | const |
| `past-participants` | `hasPastParticipants` | const |
| `presence-monitor` | `PresenceStatus` | type |
| `presence-monitor` | `PresenceMonitorOptions` | interface |
| `presence-monitor` | `PresenceOnlineEvent` | interface |
| `presence-monitor` | `PresenceOfflineEvent` | interface |
| `presence-monitor` | `PresenceSessionSummary` | interface |
| `presence-monitor` | `PresenceStateView` | interface |
| `presence-monitor` | `PresenceTrackerSession` | interface |
| `presence-monitor` | `PresenceTrackerStatus` | interface |
| `presence-monitor` | `PresenceMonitorEvents` | type |
| `presence-monitor` | `MinimalSocket` | interface |
| `presence-monitor` | `formatDuration` | const |
| `presence-monitor` | `getDefaultTimezone` | const |
| `presence-monitor` | `setDefaultTimezone` | const |
| `presence-monitor` | `formatTime` | const |
| `presence-monitor` | `formatDateTime` | const |
| `presence-monitor` | `formatTimeAgo` | const |
| `presence-monitor` | `normalizeContactJid` | const |
| `presence-monitor` | `PresenceMonitor` | class |
| `presence-monitor` | `monitorPresence` | const |
| `presence-monitor` | `isOnlinePresence` | const |
| `presence-monitor` | `isOfflinePresence` | const |
| `presence-monitor` | `createPresenceTracker` | const |
| `raw-message` | `RAW_MODE_HELPER_KEYS` | const |
| `raw-message` | `buildRawMessageContent` | const |
| `resize-image` | `resizeImage` | const |
| `rich-message-utils` | `RichContent` | type |
| `rich-message-utils` | `toUnified` | const |
| `rich-message-utils` | `botMetadataSignature` | const |
| `rich-message-utils` | `botMetadataCertificate` | const |
| `rich-message-utils` | `wrapToBotForwardedMessage` | const |
| `rich-message-utils` | `prepareRichResponseMessage` | const |
| `rich-response` | `sendTable` | const |
| `rich-response` | `sendList` | const |
| `rich-response` | `sendCodeBlock` | const |
| `rich-response` | `sendLatex` | const |
| `rich-response` | `sendLatexImage` | const |
| `rich-response` | `sendLatexInlineImage` | const |
| `rich-response` | `SendRichMessageOptions` | type |
| `rich-response` | `sendRichMessage` | const |
| `rich-response` | `UnifiedResponseEntry` | type |
| `rich-response` | `captureUnifiedResponse` | const |
| `rich-response` | `sendUnifiedResponse` | const |
| `rich-response` | `clearCapturedResponses` | const |
| `rich-response` | `getCapturedResponses` | const |
| `scheduling` | `SchedulerOptions` | interface |
| `scheduling` | `ScheduledMessageStatus` | type |
| `scheduling` | `ScheduledMessage` | interface |
| `scheduling` | `MessageScheduler` | class |
| `scheduling` | `createMessageScheduler` | const |
| `send-group-status-v2` | `sendGroupStatusV2( // eslint-disable-next-line @typescript-eslint/no-explicit-any sock: any, jid: string, content: AnyMessageContent, options: Partial<MessageGenerationOptions> = {} )` | function |
| `send-group-status` | `sendGroupStatus( sock: any, groupJid: string, content: Record<string, any>, options: Record<string, any> = {} )` | function |
| `send-group-v4-invite` | `GroupParticipantUpdateResult` | interface |
| `send-group-v4-invite` | `SendGroupV4InviteDeps` | interface |
| `send-group-v4-invite` | `sendGroupV4Invite( deps: SendGroupV4InviteDeps, groupJid: string, participant: string, inviteCode: string, inviteExpiration?: number, groupName?: string, caption?: string, jpegThumbnail?: Buffer, options: MiscMessageGenerationOptions = {} )` | function |
| `send-group-v4-invite` | `sendGroupInvite( deps: SendGroupV4InviteDeps, groupJid: string, user: string )` | function |
| `status-helpers` | `STATUS_BROADCAST_JID` | const |
| `status-helpers` | `STATUS_BACKGROUNDS` | const |
| `status-helpers` | `STATUS_FONTS` | const |
| `status-helpers` | `StatusFont` | type |
| `status-helpers` | `generateStatusMessageId` | const |
| `status-helpers` | `TextStatusOptions` | type |
| `status-helpers` | `MediaStatusOptions` | type |
| `status-helpers` | `createTextStatus` | const |
| `status-helpers` | `createImageStatus` | const |
| `status-helpers` | `createVideoStatus` | const |
| `status-helpers` | `createAudioStatus` | const |
| `status-helpers` | `getStatusJid` | const |
| `status-helpers` | `StatusHelper` | const |
| `status-posting` | `STATUS_BROADCAST_JID` | const |
| `status-posting` | `STATUS_BACKGROUNDS` | const |
| `status-posting` | `STATUS_FONTS` | const |
| `status-posting` | `generateStatusMessageId` | const |
| `status-posting` | `getStatusJid` | const |
| `status-posting` | `TextStatusOptions` | interface |
| `status-posting` | `MediaStatusOptions` | interface |
| `status-posting` | `createTextStatus` | const |
| `status-posting` | `createImageStatus` | const |
| `status-posting` | `createVideoStatus` | const |
| `status-posting` | `createAudioStatus` | const |
| `status-posting` | `StatusHelper` | const |
| `status-posting` | `StatusMentionContent` | interface |
| `status-posting` | `StatusMentionsContext` | interface |
| `status-posting` | `makeStatusMentionsAddon` | const |
| `stickerpack` | `convertToWebP` | const |
| `stickerpack` | `generateStickerPackId` | const |
| `stickerpack` | `buildStickerPackProto` | const |
| `stickerpack` | `STICKER_PACK_MESSAGE_TYPE` | const |
| `stickerpack` | `StickerInput` | type |
| `stickerpack` | `StickerPackInput` | type |
| `stickerpack` | `StickerPackOptions` | type |
| `stickerpack` | `prepareStickerPackMessage` | const |
| `templates` | `TemplateVariable` | interface |
| `templates` | `MessageTemplate` | interface |
| `templates` | `TemplateData` | type |
| `templates` | `TemplateManager` | class |
| `templates` | `PRESET_TEMPLATES` | const |
| `templates` | `createTemplateManager` | const |
| `templates` | `renderTemplate` | const |
| `use-cache-manager-auth-state` | `CacheManagerStore` | type |
| `use-cache-manager-auth-state` | `useCacheManagerAuthState` | const |
| `use-cache-manager-auth-state` | `makeCacheManagerAuthState` | const |
| `use-sqlite-auth-state` | `SqliteAuthStateOptions` | type |
| `use-sqlite-auth-state` | `SqliteAuthStateResult` | type |
| `use-sqlite-auth-state` | `useSqliteAuthState( /** * Options object, or positional arguments. Accepted shapes: * `(dbPath)`, `(dbPath, session)`, `({ dbPath })`, `({ database })`. */ a: string | SqliteAuthStateOptions, b?: string | SqliteAuthStateOptions, c?: string )` | function |
| `vcard` | `ContactPhone` | interface |
| `vcard` | `ContactEmail` | interface |
| `vcard` | `ContactUrl` | interface |
| `vcard` | `ContactAddress` | interface |
| `vcard` | `ContactData` | interface |
| `vcard` | `escapeVCard` | const |
| `vcard` | `formatPhone` | const |
| `vcard` | `generateVCard` | const |
| `vcard` | `generateVCards` | const |
| `vcard` | `parseVCard` | const |
| `vcard` | `createContactCard` | const |
| `vcard` | `createContactCards` | const |
| `vcard` | `quickContact` | const |
| `webview` | `HTML_WEBVIEW_BOT_JID` | const |
| `webview` | `FORWARD_ORIGIN_META_AI` | const |
| `webview` | `BOT_ENTRY_POINT_META_AI_FORWARD` | const |
| `webview` | `WebViewOptions` | interface |
| `webview` | `WebViewResult` | interface |
| `webview` | `HtmlWebviewSocket` | interface |
| `webview` | `webView( sock: HtmlWebviewSocket, chatId: string, options: WebViewOptions )` | function |
| `webview` | `web` | const |
| `webview` | `sendHtmlWebview` | const |

### Utils

| Module | Export | Kind |
| --- | --- | --- |
| `auth-args` | `isOptionsObject` | const |
| `auth-args` | `normalizeAuthArgs` | const |
| `auth-args` | `pickAlias` | const |
| `auth-args` | `promoteHandle` | const |
| `auth-utils` | `makeCacheableSignalKeyStore( store: SignalKeyStore, logger?: ILogger, _cache?: CacheStore )` | function |
| `auth-utils` | `addTransactionCapability` | const |
| `auth-utils` | `assertMeId` | const |
| `auth-utils` | `initAuthCreds` | const |
| `browser-utils` | `Browsers` | const |
| `browser-utils` | `isAndroidBrowser` | const |
| `browser-utils` | `getPlatformId` | const |
| `browser-utils` | `getPlatformDisplayName` | const |
| `browser-utils` | `getPairingCodeOsDisplay` | const |
| `business-mex` | `parseMexOrderDetails` | const |
| `business` | `parseCatalogNode` | const |
| `business` | `parseCollectionsNode` | const |
| `business` | `parseOrderDetailsNode` | const |
| `business` | `toProductNode` | const |
| `business` | `parseProductNode` | const |
| `business` | `uploadingNecessaryImagesOfProduct( product: T, waUploadToServer: WAMediaUploadFunction, timeoutMs = 30_000 )` | function |
| `business` | `uploadingNecessaryImages` | const |
| `chat-utils` | `ChatMutationMap` | type |
| `chat-utils` | `makeLtHashGenerator` | const |
| `chat-utils` | `newLTHashState` | const |
| `chat-utils` | `ensureLTHashStateVersion` | const |
| `chat-utils` | `MAX_SYNC_ATTEMPTS` | const |
| `chat-utils` | `isMissingKeyError` | const |
| `chat-utils` | `isAppStateSyncIrrecoverable` | const |
| `chat-utils` | `encodeSyncdPatch` | const |
| `chat-utils` | `decodeSyncdMutations` | const |
| `chat-utils` | `decodeSyncdPatch` | const |
| `chat-utils` | `extractSyncdPatches` | const |
| `chat-utils` | `downloadExternalBlob` | const |
| `chat-utils` | `downloadExternalPatch` | const |
| `chat-utils` | `decodeSyncdSnapshot` | const |
| `chat-utils` | `decodePatches` | const |
| `chat-utils` | `chatModificationToAppPatch` | const |
| `chat-utils` | `processSyncAction` | const |
| `companion-reg-client-utils` | `CompanionWebClientType` | enum |
| `companion-reg-client-utils` | `PairingCodePlatform` | type |
| `companion-reg-client-utils` | `getCompanionWebClientType` | const |
| `companion-reg-client-utils` | `getCompanionPlatformId` | const |
| `companion-reg-client-utils` | `deriveCanonicalCompanionPlatformDisplay` | const |
| `companion-reg-client-utils` | `getPairingCodePlatform` | const |
| `companion-reg-client-utils` | `buildPairingQRData` | const |
| `companion-reg-client-utils` | `PairingQRRenderer` | type |
| `companion-reg-client-utils` | `makePairingQRRenderer` | const |
| `companion-reg-client-utils` | `CompanionRegRefreshContext` | type |
| `companion-reg-client-utils` | `CompanionRegRefreshOutcome` | type |
| `companion-reg-client-utils` | `handleCompanionRegRefresh` | const |
| `companion-reg-client-utils` | `buildCompanionRegNode` | const |
| `companion-reg-client-utils` | `defaultCompanionPlatformDisplay` | const |
| `crypto` | `generateSignalPubKey` | const |
| `crypto` | `Curve` | const |
| `crypto` | `signedKeyPair` | const |
| `crypto` | `aesEncryptGCM(plaintext: Uint8Array, key: Uint8Array, iv: Uint8Array, additionalData: Uint8Array)` | function |
| `crypto` | `aesDecryptGCM(ciphertext: Uint8Array, key: Uint8Array, iv: Uint8Array, additionalData: Uint8Array)` | function |
| `crypto` | `aesEncryptCTR(plaintext: Uint8Array, key: Uint8Array, iv: Uint8Array)` | function |
| `crypto` | `aesDecryptCTR(ciphertext: Uint8Array, key: Uint8Array, iv: Uint8Array)` | function |
| `crypto` | `aesDecrypt(buffer: Uint8Array, key: Uint8Array)` | function |
| `crypto` | `aesDecryptWithIV(buffer: Uint8Array, key: Uint8Array, IV: Uint8Array)` | function |
| `crypto` | `aesEncrypt(buffer: Uint8Array, key: Uint8Array)` | function |
| `crypto` | `aesEncrypWithIV(buffer: Buffer, key: Buffer, IV: Buffer)` | function |
| `crypto` | `hmacSign( buffer: Buffer | Uint8Array, key: Buffer | Uint8Array, variant: 'sha256' | 'sha512' = 'sha256' )` | function |
| `crypto` | `sha256(buffer: Buffer)` | function |
| `crypto` | `derivePairingCodeKey(pairingCode: string, salt: Buffer)` | function |
| `decode-wa-message` | `getDecryptionJid` | const |
| `decode-wa-message` | `NO_MESSAGE_FOUND_ERROR_TEXT` | const |
| `decode-wa-message` | `MISSING_KEYS_ERROR_TEXT` | const |
| `decode-wa-message` | `ACCOUNT_RESTRICTED_TEXT` | const |
| `decode-wa-message` | `DECRYPTION_RETRY_CONFIG` | const |
| `decode-wa-message` | `NACK_REASONS` | const |
| `decode-wa-message` | `SERVER_ERROR_CODES` | const |
| `decode-wa-message` | `RETRYABLE_ACK_CODES` | const |
| `decode-wa-message` | `extractAddressingContext` | const |
| `decode-wa-message` | `decodeMessageNode(stanza: BinaryNode, meId: string, meLid: string)` | function |
| `decode-wa-message` | `decryptMessageNode` | const |
| `event-buffer` | `DEFAULT_MAX_EVENT_LISTENERS` | const |
| `event-buffer` | `makeEventBuffer` | const |
| `ffmpeg-path` | `getFfmpegBin` | const |
| `generics` | `BufferJSON` | const |
| `generics` | `getKeyAuthor` | const |
| `generics` | `isStringNullOrEmpty` | const |
| `generics` | `writeRandomPadMax16` | const |
| `generics` | `unpadRandomMax16` | const |
| `generics` | `generateParticipantHashV2` | const |
| `generics` | `encodeWAMessage` | const |
| `generics` | `generateRegistrationId` | const |
| `generics` | `encodeBigEndian` | const |
| `generics` | `toNumber` | const |
| `generics` | `unixTimestampSeconds` | const |
| `generics` | `DebouncedTimeout` | type |
| `generics` | `debouncedTimeout` | const |
| `generics` | `delay` | const |
| `generics` | `delayCancellable` | const |
| `generics` | `promiseTimeout( ms: number | undefined, promise: (resolve: (v: T) => void, reject: (error: any) => void) => void )` | function |
| `generics` | `generateMessageIDV2` | const |
| `generics` | `generateMessageID` | const |
| `generics` | `bindWaitForEvent(ev: BaileysEventEmitter, event: T)` | function |
| `generics` | `bindWaitForConnectionUpdate` | const |
| `generics` | `generateKeyUuid` | const |
| `generics` | `printQRIfNecessaryListener` | const |
| `generics` | `fetchLatestBaileysVersion` | const |
| `generics` | `fetchLatestBaileysVersion2` | const |
| `generics` | `fetchAlphaWaWebVersion` | const |
| `generics` | `fetchLatestWaWebVersion` | const |
| `generics` | `generateMdTagPrefix` | const |
| `generics` | `getStatusFromReceiptType` | const |
| `generics` | `getErrorCodeFromStreamError` | const |
| `generics` | `getCallStatusFromNode` | const |
| `generics` | `getCodeFromWSError` | const |
| `generics` | `isWABusinessPlatform` | const |
| `generics` | `trimUndefined(obj: { [_: string]: any })` | function |
| `generics` | `bytesToCrockford(buffer: Buffer)` | function |
| `generics` | `encodeNewsletterMessage(message: proto.IMessage)` | function |
| `generics` | `toUnicodeEscape(text: string)` | function |
| `generics` | `fromUnicodeEscape(escapedText: string)` | function |
| `generics` | `asciiEncode(text: string)` | function |
| `generics` | `asciiDecode(...codes: number[] | [number[]])` | function |
| `history` | `downloadHistory` | const |
| `history` | `processHistoryMessage` | const |
| `history` | `downloadAndProcessHistorySyncNotification` | const |
| `history` | `getHistoryMsg` | const |
| `identity-change-handler` | `IdentityChangeResult` | type |
| `identity-change-handler` | `IdentityChangeContext` | type |
| `identity-change-handler` | `handleIdentityChange( node: BinaryNode, ctx: IdentityChangeContext )` | function |
| `interactive-message` | `InteractiveButton` | type |
| `interactive-message` | `InteractiveButtonMessageContent` | type |
| `interactive-message` | `ListRow` | type |
| `interactive-message` | `ListSection` | type |
| `interactive-message` | `InteractiveListMessageContent` | type |
| `interactive-message` | `TemplateHydratedButton` | type |
| `interactive-message` | `TemplateMessageContent` | type |
| `interactive-message` | `NativeFlowButton` | type |
| `interactive-message` | `NativeFlowOptions` | type |
| `interactive-message` | `CopyCodeButtonOptions` | type |
| `interactive-message` | `UrlButton` | type |
| `interactive-message` | `UrlButtonOptions` | type |
| `interactive-message` | `QuickReplyButton` | type |
| `interactive-message` | `QuickReplyOptions` | type |
| `interactive-message` | `CombinedButton` | type |
| `interactive-message` | `CombinedButtonOptions` | type |
| `interactive-message` | `generateInteractiveButtonMessage` | const |
| `interactive-message` | `generateInteractiveListMessage` | const |
| `interactive-message` | `generateTemplateMessage` | const |
| `interactive-message` | `generateNativeFlowMessage` | const |
| `interactive-message` | `generateCopyCodeButton` | const |
| `interactive-message` | `generateUrlButtonMessage` | const |
| `interactive-message` | `generateQuickReplyButtons` | const |
| `interactive-message` | `generateCombinedButtons` | const |
| `keep-alive` | `KeepAliveOptions` | type |
| `keep-alive` | `makeKeepAlive` | const |
| `link-preview` | `URLGenerationOptions` | type |
| `link-preview` | `getUrlInfo` | const |
| `link-preview` | `linkPreviewResponseToUrlInfo` | const |
| `lock-manager` | `LockRef` | type |
| `lock-manager` | `LockManager` | type |
| `lock-manager` | `makeLockManager` | const |
| `logger` | `ILogger` | interface |
| `lt-hash` | `LT_HASH_ANTI_TAMPERING` | const |
| `make-mutex` | `makeMutex` | const |
| `make-mutex` | `Mutex` | type |
| `make-mutex` | `makeKeyedMutex` | const |
| `make-mutex` | `KeyedMutex` | type |
| `message-retry-manager` | `DEFAULT_MAX_MSG_RETRY_COUNT` | const |
| `message-retry-manager` | `RecentMessageKey` | interface |
| `message-retry-manager` | `RecentMessage` | interface |
| `message-retry-manager` | `SessionRecreateHistory` | interface |
| `message-retry-manager` | `RetryCounter` | interface |
| `message-retry-manager` | `PendingPhoneRequest` | type |
| `message-retry-manager` | `RetryStatistics` | interface |
| `message-retry-manager` | `RetryReason` | enum |
| `message-retry-manager` | `MessageRetryManager` | class |
| `messages-media` | `hkdfInfoKey` | const |
| `messages-media` | `getRawMediaUploadData` | const |
| `messages-media` | `getMediaKeys( buffer: Uint8Array | string | null | undefined, mediaType: MediaType )` | function |
| `messages-media` | `extractVideoThumb` | const |
| `messages-media` | `extractImageThumb` | const |
| `messages-media` | `encodeBase64EncodedStringForUpload` | const |
| `messages-media` | `generateProfilePicture` | const |
| `messages-media` | `generatePanoramaProfilePicture` | const |
| `messages-media` | `mediaMessageSHA256B64` | const |
| `messages-media` | `getAudioDuration(buffer: Buffer | string | Readable)` | function |
| `messages-media` | `getAudioWaveform(buffer: Buffer | string | Readable, logger?: ILogger)` | function |
| `messages-media` | `toReadable` | const |
| `messages-media` | `toBuffer` | const |
| `messages-media` | `getStream` | const |
| `messages-media` | `generateThumbnail( file: string, mediaType: 'video' | 'image', options: { logger?: ILogger hdMode?: boolean } )` | function |
| `messages-media` | `getHttpStream` | const |
| `messages-media` | `encryptedStream` | const |
| `messages-media` | `DEF_MEDIA_HOST` | const |
| `messages-media` | `MediaDownloadOptions` | type |
| `messages-media` | `getUrlFromDirectPath` | const |
| `messages-media` | `downloadContentFromMessage` | const |
| `messages-media` | `downloadEncryptedContent` | const |
| `messages-media` | `extensionForMediaMessage(message: WAMessageContent)` | function |
| `messages-media` | `UploadParams` | type |
| `messages-media` | `uploadWithNodeHttp` | const |
| `messages-media` | `getWAUploadToServer` | const |
| `messages-media` | `encryptMediaRetryRequest` | const |
| `messages-media` | `decodeMediaRetryNode` | const |
| `messages-media` | `decryptMediaRetryData` | const |
| `messages-media` | `getStatusCodeForMediaRetry` | const |
| `messages` | `extractUrlFromText` | const |
| `messages` | `generateLinkPreviewIfRequired` | const |
| `messages` | `getPollOptionHash` | const |
| `messages` | `prepareWAMessageMedia` | const |
| `messages` | `prepareDisappearingMessageSettingContent` | const |
| `messages` | `generateForwardMessageContent` | const |
| `messages` | `hasNonNullishProperty` | const |
| `messages` | `hasOptionalProperty(obj: T, key: K)` | function |
| `messages` | `generateWAMessageContent` | const |
| `messages` | `generateWAMessageFromContent` | const |
| `messages` | `generateWAMessage` | const |
| `messages` | `getContentType` | const |
| `messages` | `FUTURE_PROOF_MESSAGE_KEYS` | const |
| `messages` | `normalizeMessageContent` | const |
| `messages` | `getFutureProofMessagee` | const |
| `messages` | `extractMessageContent` | const |
| `messages` | `getDevice` | const |
| `messages` | `updateMessageWithReceipt` | const |
| `messages` | `updateMessageWithReaction` | const |
| `messages` | `updateMessageWithPollUpdate` | const |
| `messages` | `updateMessageWithEventResponse` | const |
| `messages` | `getAggregateVotesInPollMessage( { message, pollUpdates }: Pick<WAMessage, 'pollUpdates' | 'message'>, meId?: string )` | function |
| `messages` | `getAggregateResponsesInEventMessage( { eventResponses }: Pick<WAMessage, 'eventResponses'>, meId?: string )` | function |
| `messages` | `aggregateMessageKeysNotFromMe` | const |
| `messages` | `downloadMediaMessage` | const |
| `messages` | `hasValidAlbumMedia` | const |
| `messages` | `hasValidInteractiveHeader` | const |
| `messages` | `hasValidCarouselHeader` | const |
| `messages` | `assertMediaContent` | const |
| `migrate-auth-state` | `MigrateAuthStateResult` | type |
| `migrate-auth-state` | `AuthStateOrAdapter` | type |
| `migrate-auth-state` | `MigrateAuthStateOptions` | type |
| `migrate-auth-state` | `migrateAuthState({ from, to, batchSize = 100, skipExisting = true, logger, verify = true }: MigrateAuthStateOptions)` | function |
| `new-chat-cap` | `parseNewChatMessageCap` | const |
| `newsletter-meta` | `NewsletterMessageMeta` | interface |
| `newsletter-meta` | `extractNewsletterMessageMeta` | const |
| `noise-handler` | `makeNoiseHandler` | const |
| `offline-node-processor` | `OfflineNodeType` | type |
| `offline-node-processor` | `MessageType` | type |
| `offline-node-processor` | `OfflineNodeProcessorDeps` | type |
| `offline-node-processor` | `makeOfflineNodeProcessor( nodeProcessorMap: Map<OfflineNodeType, (node: BinaryNode) => Promise<void>>, deps: OfflineNodeProcessorDeps, batchSize = 10 )` | function |
| `passkey` | `PasskeyNotificationType` | type |
| `passkey` | `PasskeyRequestState` | type |
| `passkey` | `getPasskeyRequestState` | const |
| `pre-key-manager` | `PreKeyManager` | class |
| `process-message` | `cleanMessage` | const |
| `process-message` | `isRealMessage` | const |
| `process-message` | `shouldIncrementChatUnread` | const |
| `process-message` | `getChatId` | const |
| `process-message` | `decryptPollVote( { encPayload, encIv }: proto.Message.IPollEncValue, { pollCreatorJid, pollMsgId, pollEncKey, voterJid }: PollContext )` | function |
| `process-message` | `decryptEventResponse( { encPayload, encIv }: proto.Message.IPollEncValue, { eventCreatorJid, eventMsgId, eventEncKey, responderJid }: EventContext )` | function |
| `process-message` | `decryptReaction(enc: proto.Message.IPollEncValue, ctx: EncActionContext)` | function |
| `process-message` | `decryptComment(enc: proto.Message.IPollEncValue, ctx: EncActionContext)` | function |
| `process-message` | `decryptMessageEdit( { encPayload, encIv }: proto.Message.IPollEncValue, { originalSenderJid, originalMsgId, editEncKey, editorJid }: EditContext )` | function |
| `proto-compat` | `PROTO_COMPAT_APPLIED` | const |
| `proto-compat` | `FIELD_ALIASES_APPLIED` | const |
| `reporting-utils` | `ReportingField` | type |
| `reporting-utils` | `shouldIncludeReportingToken` | const |
| `reporting-utils` | `getMessageReportingToken` | const |
| `shortcake-crypto` | `ShortcakeKeyPair` | type |
| `shortcake-crypto` | `generateShortcakeKeyPair` | const |
| `shortcake-crypto` | `shortcakeDH` | const |
| `shortcake-crypto` | `shortcakeEncrypt` | const |
| `shortcake-crypto` | `shortcakeDecrypt` | const |
| `shortcake-crypto` | `shortcakeHKDF` | const |
| `shortcake-crypto` | `shortcakeHMAC` | const |
| `shortcake` | `ShortcakeSession` | type |
| `shortcake` | `ShortcakeSignPasskeyAssertion` | type |
| `shortcake` | `beginShortcakeHandshake` | const |
| `shortcake` | `completeShortcakeHandshake` | const |
| `shortcake` | `hasActiveShortcakeSession` | const |
| `shortcake` | `abortShortcakeHandshake` | const |
| `signal` | `createSignalIdentity` | const |
| `signal` | `getPreKeys` | const |
| `signal` | `generateOrGetPreKeys` | const |
| `signal` | `xmppSignedPreKey` | const |
| `signal` | `xmppPreKey` | const |
| `signal` | `extractE2ESessionFromRetryReceipt` | const |
| `signal` | `parseAndInjectE2ESessions` | const |
| `signal` | `extractDeviceJids` | const |
| `signal` | `getNextPreKeys` | const |
| `signal` | `getNextPreKeysNode` | const |
| `stanza-ack` | `buildAckStanza(node: BinaryNode, errorCode?: number, meId?: string)` | function |
| `sync-action-utils` | `ContactsUpsertResult` | type |
| `sync-action-utils` | `LidMappingUpdateResult` | type |
| `sync-action-utils` | `SyncActionResult` | type |
| `sync-action-utils` | `processContactAction` | const |
| `sync-action-utils` | `emitSyncActionResults` | const |
| `tc-token-utils` | `TC_TOKEN_INDEX_KEY` | const |
| `tc-token-utils` | `readTcTokenIndex(keys: SignalKeyStoreWithTransaction)` | function |
| `tc-token-utils` | `buildMergedTcTokenIndexWrite( keys: SignalKeyStoreWithTransaction, addedJids: Iterable<string> )` | function |
| `tc-token-utils` | `isTcTokenExpired(timestamp: number | string | null | undefined)` | function |
| `tc-token-utils` | `shouldSendNewTcToken(senderTimestamp: number | undefined)` | function |
| `tc-token-utils` | `resolveTcTokenJid( jid: string, getLIDForPN: (pn: string) => Promise<string | null> )` | function |
| `tc-token-utils` | `resolveIssuanceJid( jid: string, issueToLid: boolean, getLIDForPN: (pn: string) => Promise<string | null>, getPNForLID?: (lid: string) => Promise<string | null> )` | function |
| `tc-token-utils` | `buildTcTokenFromJid({ authState, jid, baseContent = [], getLIDForPN }: TcTokenParams)` | function |
| `tc-token-utils` | `storeTcTokensFromIqResult({ result, fallbackJid, keys, getLIDForPN, onNewJidStored }: StoreTcTokensParams)` | function |
| `tc-token-utils` | `StoreTcTokenFromMessageParams` | type |
| `tc-token-utils` | `storeTcTokenFromMessageNode({ node, keys, getLIDForPN, onNewJidStored, logger, fallbackJid }: StoreTcTokenFromMessageParams)` | function |
| `use-mongo-file-auth-state` | `MongoFileAuthStateOptions` | interface |
| `use-mongo-file-auth-state` | `useMongoFileAuthState` | const |
| `use-mongo-file-auth-state` | `useMongoAuthState` | const |
| `use-multi-file-auth-state` | `countAuthFileLocks` | const |
| `use-multi-file-auth-state` | `MultiFileAuthStateOptions` | interface |
| `use-multi-file-auth-state` | `useMultiFileAuthState` | const |
| `use-single-file-auth-state-legacy` | `useSingleFileAuthStateLegacy` | const |
| `use-single-file-auth-state` | `SingleFileAuthStateOptions` | interface |
| `use-single-file-auth-state` | `useSingleFileAuthState` | const |
| `username` | `UsernameKeyOptions` | type |
| `username` | `RepeatedDigitUsernameKeyOptions` | type |
| `username` | `isValidUsernameKey` | const |
| `username` | `isRepeatedDigitUsernameKey` | const |
| `username` | `makeRepeatedDigitUsernameKey` | const |
| `username` | `makeRandomUsernameKey` | const |
| `username` | `normalizeUsername` | const |
| `username` | `isValidUsername` | const |
| `username` | `validateUsername` | const |
| `username` | `isUsernameTarget` | const |
| `username` | `isJidTarget` | const |
| `username` | `resolveMessageTarget` | const |
| `username` | `USERNAME_MIN_LENGTH` | const |
| `username` | `USERNAME_MAX_LENGTH` | const |
| `username` | `USERNAME_PIN_LENGTH` | const |
| `username` | `UsernameValidationError` | const |
| `username` | `UsernameValidationErrorType` | type |
| `username` | `stripUsernamePrefix` | const |
| `username` | `displayUsername` | const |
| `username` | `validateUsernameFormat` | const |
| `username` | `assertUsername` | const |
| `username` | `isUsernamePin` | const |
| `validate-connection` | `generateLoginNode` | const |
| `validate-connection` | `generateRegistrationNode` | const |
| `validate-connection` | `configureSuccessfulPairing` | const |
| `validate-connection` | `encodeSignedDeviceIdentity` | const |

## 📄 License

Copyright (c) 2026 Teamolduser
Copyright (c) 2026 Rajeh Taher/WhiskeySockets
Copyright (c) 2026 Elaina Baileys contributors

Derived from [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) and
[@rexxhayanasi/elaina-baileys](https://github.com/rexxzyid/Elaina-baileys), both MIT. Their notices are preserved as the
licence requires. See [LICENSE](../LICENSE).
