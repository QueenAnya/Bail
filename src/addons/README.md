# Baileys (F_merge) — Addons

This folder contains every ported/extra feature on top of vanilla
`@whiskeysockets/baileys`. Every addon is self-contained, fully typed, and
re-exported from `addons/index.ts` → `src/index.ts`.

All sources below were verified against the actual upstream code (not just
doc claims) — either by diffing against a real clone of
`WhiskeySockets/Baileys` (GitHub master), or by function/field-level
comparison against `another upstream fork` and `an upstream fork`'s
compiled output.

Every `.ts` file under `addons/` that exports real functionality is
listed in the table below (`index.ts`, the barrel file, is the only
intentional exclusion — everything else, including `Voip/voip-client.ts`
which lives outside `addons/`, is covered in its own dedicated section
further down).

---

## Addon Files & Verified Sources

| File                                                                                  | Feature                                                                                                                                                                                                                                                                                                                                  | Source                                                                                                                                                                                                   | Verified                                                                                                                                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `call-handler.ts`                                                                     | Full outgoing/incoming call support (offer, accept, cancel, mute, terminate, join/query call link, heartbeat, transport, relay-latency, enc-rekey)                                                                                                                                                                                       | another upstream fork (`Socket/messages-recv.js`, embedded call block)                                                                                                                                          | ✅ 15/15 functions + `sanitizeCallerPn` match by name & signature                                                                                                       |
| `chat-control.ts`                                                                     | `TypingIndicator`, `PinnedMessagesManager`, `ReadReceiptController`, disappearing-message durations                                                                                                                                                                                                                                      | another upstream fork (`Utils/chat-control.js`)                                                                                                                                                                 | ✅ exports match                                                                                                                                                        |
| `status-helpers.ts`                                                                   | `StatusHelper` — text/image/video/gif/voice-note status posting                                                                                                                                                                                                                                                                          | another upstream fork (`Utils/status-posting.js`)                                                                                                                                                               | ✅ core functions match                                                                                                                                                 |
| `use-cache-manager-auth-state.ts`                                                     | Auth state backed by any `cache-manager` v5 store (Redis, Memcached, in-memory)                                                                                                                                                                                                                                                          | another upstream fork (`Store/make-cache-manager-store.js`)                                                                                                                                                     | ✅ TTL constant + structure match                                                                                                                                       |
| `use-sqlite-auth-state.ts`                                                            | SQLite-backed auth state                                                                                                                                                                                                                                                                                                                 | **an upstream fork** (`Utils/use-sqlite-auth-state.js`)                                                                                                                                                          | ✅ exact schema/function match                                                                                                                                          |
| `jid-plotting.ts`                                                                     | JID plotting, `getSenderPn`, `normalizePhoneToJid`                                                                                                                                                                                                                                                                                       | another upstream fork (leaked real `.ts` source, "Baileys-Joss" origin)                                                                                                                                         | ✅ 100% function-for-function match                                                                                                                                     |
| `message-composer.ts`                                                                 | `generateTableContent`/`generateListContent`/`generateCodeBlockContent`/`generateLatexContent`/etc., `extractUnifiedResponse`, `tokenizeCode` + syntax keyword sets                                                                                                                                                                      | another upstream fork (`feat/send-rich-message` branch, `Utils/message-composer.js`)                                                                                                                            | ✅ 9 exports match 1:1                                                                                                                                                  |
| `rich-response.ts`                                                                    | `sendTable`/`sendList`/`sendCodeBlock`/`sendLatex`/`sendLatexImage`(QuickLaTeX)/`sendLatexInlineImage`/`sendRichMessage` (now builds real `botForwardedMessage`+`unifiedResponse` payload with `useMarkdown: true`, falls back to plain text otherwise)/`captureUnifiedResponse`/`sendUnifiedResponse`/`sendMarkdown`                    | another upstream fork (partial — wraps `message-composer.ts` + `bot-forwarded-message.ts`)                                                                                                                      | ✅ verified — `sendRichMessage` rewritten this session to match documented behavior (was a simplified text-only stub before)                                            |
| `bot-forwarded-message.ts`                                                            | `botMetadataSignature`/`botMetadataCertificate`/`wrapToBotForwardedMessage`/`prepareRichResponseMessage`                                                                                                                                                                                                                                 | **an upstream fork** (reconstructed field numbers from compiled `index.js`)                                                                                                                                      | ✅ round-trip encode/decode tested                                                                                                                                      |
| `interactive-message.ts`                                                              | `generateCombinedButtons` (shorthand: `reply`/`copy`/`url`/`call`/`sections` + bare native `{name, buttonParamsJson}` pass-through, `icon` field, `offer`/`bottomSheet` wrappers), `generateInteractiveButtonMessage`, `generateInteractiveListMessage`, `generateTemplateMessage`                                                       | another upstream fork                                                                                                                                                                                           | ✅ core functions match                                                                                                                                                 |
| `button-sender.ts`                                                                    | `buildInteractiveButtons`, payload validators, legacy-format compat                                                                                                                                                                                                                                                                      | `@ryuu-reinzz/button-helper` v2.2.5 (not community forks)                                                                                                                                        | —                                                                                                                                                                       |
| `message-search.ts`                                                                   | `createMessageSearch` / `searchMessages`                                                                                                                                                                                                                                                                                                 | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `message-utils.ts`                                                                    | `getContentType`, `downloadMediaMessage` helpers, misc                                                                                                                                                                                                                                                                                   | another upstream fork                                                                                                                                                                                           | ✅ 9/13 functions match                                                                                                                                                 |
| `anti-delete.ts`                                                                      | `MessageStore`, `createMessageStoreHandler`, `createAntiDeleteHandler`                                                                                                                                                                                                                                                                   | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `auto-reply.ts`                                                                       | `createAutoReply` — keyword/regex rules, cooldowns, JID allowlists                                                                                                                                                                                                                                                                       | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `scheduling.ts`                                                                       | Scheduling helpers                                                                                                                                                                                                                                                                                                                       | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `templates.ts`                                                                        | `createTemplateManager`, `renderTemplate`, `PRESET_TEMPLATES` (order, welcome, reminder, support-ticket, birthday, invoice)                                                                                                                                                                                                              | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `vcard.ts`                                                                            | `generateVCard(s)`, `parseVCard`, `createContactCard(s)` (called `ContactData` here vs. their `VCardContact`)                                                                                                                                                                                                                            | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `status-posting.ts`                                                                   | Legacy status-posting helpers                                                                                                                                                                                                                                                                                                            | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `baileys-event-stream.ts`                                                             | Event-stream utilities                                                                                                                                                                                                                                                                                                                   | another upstream fork                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `in-memory-store.ts`                                                                  | `makeInMemoryStore` (exported as `makeSimpleInMemoryStore` — aliased to avoid clashing with `Store/make-in-memory-store.ts`)                                                                                                                                                                                                             | another upstream fork (added, not wired in their own barrel export either)                                                                                                                                      | ✅ match                                                                                                                                                                |
| `chat-history-helpers.ts`                                                             | `getLastMessageInChat`, `getOldestMessageInChat`, `copyNForward`                                                                                                                                                                                                                                                                         | Not from any fork — these were "implement this yourself" stubs in the other upstream fork's README examples; built here as real implementations on top of `SimpleInMemoryStore` + `generateForwardMessageContent` | —                                                                                                                                                                       |
| `browser-presets.ts`                                                                  | `Browsers.android()` preset, `getPlatformDisplayName()`, `ANDROID_PHONE` PlatformType fallback                                                                                                                                                                                                                                           | `Baileys-android-browser` + `InfiniteAPI-feat-android-browser-upstream` (real WhiskeySockets PR branches)                                                                                                | ✅ verified against actual PR source                                                                                                                                    |
| `pairing-fix.ts`                                                                      | Pairing queue — waits for `pair-device` stanza before sending IQ                                                                                                                                                                                                                                                                         | `Baileys-fix-pairing-code` (real PR branch)                                                                                                                                                              | ✅ `pairingReady` state gate matches                                                                                                                                    |
| `lid-support.ts`                                                                      | `onWhatsApp()` LID JID support                                                                                                                                                                                                                                                                                                           | `Baileys-fix-on-whatsapp-lid-support` (real PR branch)                                                                                                                                                   | ✅ `withLIDProtocol()`/`isLidUser` match                                                                                                                                |
| `outgoing-calls.ts`                                                                   | `initiateCall()`/`cancelCall()`/etc. (outgoing-only subset; see `call-handler.ts` for the full another upstream fork version)                                                                                                                                                                                                                   | `Baileys-feature-outgoing-calls` (real PR branch)                                                                                                                                                        | ✅ verified                                                                                                                                                             |
| `past-participants.ts`                                                                | `processPastParticipants()` — history-sync past group members                                                                                                                                                                                                                                                                            | `Baileys-pastParticepnts` (real PR branch)                                                                                                                                                               | ✅ `pastParticipants`/`authorPn` fields match                                                                                                                           |
| `stickerpack.ts`                                                                      | `Sticker`/`StickerPack` types, `buildStickerPackProto()` — real full implementation lives in `from-messages.ts`'s `buildStickerPackMessage()` (WebP conversion, Lottie/WAS animated-sticker support beyond what any fork has, ZIP+encrypt+upload, tray icon + thumbnail, 60-sticker/1MB-per-sticker limits, 15-way concurrency batching) | `Baileys-feat-add-stickerpack-support` (real PR branch) + safety limits ported from an upstream fork                                                                                                             | ✅ verified — F_merge's implementation exceeds the upstream fork's (adds Lottie/WAS support an upstream fork lacks); this session added the upstream fork's missing count/size/concurrency limits |
| `jid-plot.ts`                                                                         | Separate, smaller JID-plotting variant                                                                                                                                                                                                                                                                                                   | Unverified — no match found in either fork or any supplied PR                                                                                                                                            | ❌                                                                                                                                                                      |
| `message-scheduler.ts`                                                                | Alternate scheduler implementation                                                                                                                                                                                                                                                                                                       | Unverified — no match found in either fork                                                                                                                                                               | ❌                                                                                                                                                                      |
| `from-chats.ts`, `from-messages.ts`, `from-messages-recv.ts`, `from-messages-send.ts` | Baseline re-exports adapted from this fork's own `Socket`/`Utils` files                                                                                                                                                                                                                                                                  | WhiskeySockets/Baileys (this fork's own source, not a third-party fork)                                                                                                                                  | —                                                                                                                                                                       |
| `interactive-message-basic.ts` | Pure TS port of the other upstream fork's `interactive-message.js` (same 8 functions as `interactive-message.ts`) | another upstream fork | ✅ logic identical to `interactive-message.ts`; kept for reference, deliberately **not** re-exported from `addons/index.ts` (same export policy as `status-helpers.ts`) |
| `link-preview-extras.ts` | `applyLinkPreviewMetadata`, `buildFaviconMMSMetadata` — `linkPreviewMetadata` + `favicon` support on text messages | another upstream fork (commit `fc139c8`) | ✅ called from `Utils/messages.ts`; type-only import of `prepareWAMessageMedia` avoids a runtime circular import |
| `newsletter-role-updates.ts` | `emitNewsletterRoleUpdate` — promote/demote event emission, fixes a missing `NotificationNewsletterAdminDemote` case that silently dropped demotions | another upstream fork (commit `170c5af`) | ✅ called from `Socket/messages-recv.ts` |
| `find-user-id.ts` | `findUserId` — resolves a PN or LID jid to both forms | an upstream fork | ✅ called from `Socket/chats.ts` as `sock.findUserId()`; takes `lidMapping` as a parameter rather than importing `signalRepository` directly |
| `media-messages.ts`, `media-set.ts` | Jimp-based profile-picture generators (`generatePP`/`generateProfilePictureFP`, `generateProfilePictureFull`/`changeprofileFull`, `generateProfilePicturee`) | User-supplied source, ported to this fork's `jimp@^1.6.1` API | ✅ deduplicated — 2 pairs of near-identical functions merged into one implementation each (aliased under both original names); one `ReferenceError`-causing bug fixed along the way |
| `rich-message-utils.ts` | `toUnified`, `botMetadataSignature`/`botMetadataCertificate`, `wrapToBotForwardedMessage`, `prepareRichResponseMessage`, `RichContent` type | another upstream fork | ✅ deep-verified against their real compiled `rich-message-utils.js`; missing `INLINE_IMAGE` case and `markdown_cells` field added this session |
| `voip-calling.ts` | `createVoipClient({ authDir })` — standalone second-session VoIP wrapper (own QR scan, own auth dir); thin re-export of `Voip/voip-client.ts` (this fork's own vendored port, no external package) | [`baileys-caller`](https://github.com/SheIITear/baileys-caller) by SheIITear | ✅ separate-session alternative to the primary same-session `src/Voip/` integration (`sock.initiateCall()`) — see the dedicated "VoIP Calling" section below for `Voip/voip-client.ts` itself (lives outside `addons/`) |

---

## WAProto Schema Extensions (schema-only — not wired to Socket helpers)

74 message types were added to `WAProto/WAProto.proto` beyond real
WhiskeySockets/Baileys GitHub master (verified against commit `731cd6b5`,
27 Jun 2026):

- **61 from an upstream fork** — field numbers reconstructed from their
  compiled `WAProto/index.js` encode functions (bots, polls-add-option,
  split-payments, event-invites, chat-theming, subscription/broadcast
  app-state-sync actions).
- **13 from another upstream fork** — field numbers taken directly from
  their real `.proto` source files (`AIProvenance`, `CoexStateSync`,
  `HistoryShareMessageEntry`, `MarkAsVerifiedAction`, etc.)

`WAProto/index.js`/`index.d.ts` were regenerated with the repo's own
`GenerateStatics.sh`, so they retain the newer `protobufjs-cli`
prototype-pollution guards + recursion-depth limits that real upstream's
committed generated file doesn't currently have (upstream's `protobufjs`
dependency supports it — their generated code just hasn't been
regenerated with a newer `pbjs` yet).

These types are schema-only: encode/decode works, but no `Socket`/addon
helper sends or recognizes them automatically yet.

---

## Direct Core-File Patches (verified against real WhiskeySockets PR branches)

The following were already merged directly into core `Socket`/`Types`
files (not addons) — each verified field/function-name-for-name against
the actual uploaded PR branch snapshots:

| Feature                                                                  | File(s)                                       | Source PR                                |
| ------------------------------------------------------------------------ | --------------------------------------------- | ---------------------------------------- |
| WA username ingestion (`Contact.username`, `participant_username`)       | `Types/Contact.ts`, `Socket/messages-recv.ts` | `Baileys-username-ingest`                |
| Mex notification dispatch (`handleMexNotification`)                      | `Socket/messages-recv.ts`                     | `Baileys-feat-mex-notification-dispatch` |
| Mex linked-profiles (`xwa2_notify_linked_profiles`)                      | `Socket/messages-recv.ts`                     | `Baileys-fix-mex-linked-profiles`        |
| Browser identity in QR pairing data (`buildPairingQRData(..., browser)`) | `Socket/socket.ts`                            | `Baileys-feat-add-browser-to-qr`         |

---

## Security Fixes

- **`Utils/messages-media.ts` — `extractVideoThumb`**: replaced
  `exec(\`ffmpeg ... ${path} ...\`)`(shell-string interpolation — a shell
injection vector if`path`ever contains untrusted input) with`spawn('ffmpeg', [...args])`. Also streams the thumbnail via stdout
  instead of a temp file, removing the write/read/unlink cycle entirely.
  Matches the other upstream fork's fix ("Switched FFmpeg execution from exec to
  spawn for safer process handling").

## Browser Presets

`PLATFORM_MAP`/`PLATFORM_VERSIONS` in `Utils/browser-utils.ts` are
byte-identical to the other upstream fork's. Cross-checked `Browsers` against
another upstream fork, an upstream fork, and all 11 supplied WhiskeySockets PR branches —
only one preset was missing and has been added: **`Browsers.solaris`**.
The 11 PR branches only contain vanilla-upstream-level `Browsers` objects
(no fork adds anything beyond what's already here).

---

## Rich Response System — Deep Fixes (this session)

A real bug was found and fixed in the actual production code path (not
the addon layer): **`generateRichMessageContent`** in `message-composer.ts`
— used by `sock.sendRichMessage()` and `sock.sendMarkdown()` — never built
a `unifiedResponse` payload at all, meaning native markdown/rich-content
rendering silently never worked through those socket methods, even though
a separate unused copy of similar logic existed in the addon layer.

Fixed:

- `generateRichMessageContent(submessages, quoted, { useMarkdown })` — now
  builds `unifiedResponse` via a `toUnified`-equivalent when
  `useMarkdown: true` is passed (matches the other upstream fork's real behavior,
  verified against their actual compiled `rich-message-utils.js`, not
  just documentation).
- Added `generateMarkdownContent()` — a dedicated generator that always
  builds `unifiedResponse` (another upstream fork has this as a separate function
  from the general rich-message path; `sock.sendMarkdown()` now uses it).
- `sock.sendRichMessage(jid, submessages, quoted, { useMarkdown })` now
  passes the option through.
- **`content.richResponse` / `content.table` / `content.code` /
  `content.links` shorthand** — `sock.sendMessage(jid, { richResponse: {...} })`
  was completely unwired before this session; now dispatches to
  `prepareRichResponseMessage()`. Supports both the flat shape
  (`{ code, text, language }` at the top level, matching real
  the other upstream fork's actual destructuring) and the nested shorthand shown in
  documentation (`{ richResponse: { text, code, language } }`) — the
  nested object form is merged into the flat shape automatically.
- `toUnified()` in `bot-forwarded-message.ts` — added the missing
  `INLINE_IMAGE` case; confirmed the `markdown_cells` field on table rows
  is real (present in the other upstream fork's `rich-message-utils.js`, just
  missing from their simpler `generateRichMessageContent`'s inline
  version — an inconsistency in their own codebase between two parallel
  implementations of the same concept).
- Rewrote `rich-response.ts`'s addon-layer `sendTable`/`sendList`/
  `sendCodeBlock` to match real another upstream fork signatures
  (`sendTable(sendFn, jid, title, headers, rows, quoted, opts)`, etc.) and
  build real native content instead of a plain-text/ASCII-art fallback.
  **Note:** these addon-layer functions are separate from the real,
  actually-wired `sock.sendTable()`/`sock.sendCodeBlock()` socket methods
  in `Socket/messages-send.ts` (which use `generateTableContent()`/
  `generateCodeBlockContent()` from `message-composer.ts` via
  `relayMessage`) — use the socket methods for normal usage; the addon
  versions exist for cases where you have a `sendMessage` function without
  a full socket instance.

On the `unifiedResponse.data` bytes-vs-base64-string question raised
earlier: this turned out not to matter. protobufjs decodes a JS `string`
given to a `bytes`-typed field as base64 before writing it to the wire,
so a raw `Buffer` of the JSON and a base64-encoded string of that same
JSON produce byte-identical wire output. Kept as a plain `Buffer` for
type-safety (no cast needed).

## Core Function Verification (this session)

`generateWAMessageContent` and `relayMessage` — diffed line-by-line
against real WhiskeySockets/Baileys GitHub master. Both confirmed clean:
every apparent "removed" line in the diff was actually present, just
reformatted or genuinely enhanced (e.g. an extra newsletter-poll
`messageSecret` safety check and an `encReactionMessage` check that
upstream doesn't have). No regressions found.

## Newsletter System

Compared F_merge's 18 newsletter methods against the other upstream fork's and
the upstream fork's real compiled source. 4 were genuinely missing and have been
added:

- **`newsletterSubscribed()`** (an upstream fork) — fetch all newsletters this
  account is subscribed to (like `groupFetchAllParticipating`, but for
  newsletters).
- **`newsletterReactionMode(jid, mode)`** (another upstream fork) — set who can
  react to newsletter posts.
- **`newsletterAction(jid, type)`** (another upstream fork) — generic dispatcher
  to any `QueryIds` action by name.
- **`newsletterFetchUpdates(jid, count, after, since)`** (another upstream fork)
  — fetch message state-update events (reactions/views on existing
  messages), distinct from `newsletterFetchMessages` which fetches
  message content itself.

Added the `JOB_MUTATION` QueryId these needed. Along the way, fixed a
`QueryIds` vs `QueryIdd` (pre-existing typo'd duplicate enum) mismatch —
`newsletterSubscribed` now correctly uses `QueryIdd.SUBSCRIBED`, matching
the existing pattern used by `newsletterFetchAllParticipating`'s
`QueryIdd.GETSUBSCRIBED`.

## Rich Response — Further Deep-Port from rich-message-utils.js

Compared `bot-forwarded-message.ts`'s `prepareRichResponseMessage`
against the other upstream fork's real `rich-message-utils.js` field-by-field.
Found:

- **`posts`, `products`, `suggested`, `inlineVideo`** — these are
  unimplemented placeholder stubs even in the other upstream fork's own real
  source (they push a literal string like `'POSTS'` as message text, not
  an actual feature). Not ported — there's nothing real to port.
- **`inlineImage`, `latex` (array of expressions)** — these ARE real and
  were missing. Added, including a matching `LATEX` case in `toUnified()`.
- **`links` citation handling** — the previous version computed
  `sources` (citation metadata) but then discarded it (`void sources`)
  instead of attaching it. Fixed to properly attach via `inlineEntities`
  on the text submessage, matching real another upstream fork behavior.
- **Independent conditions, not else-if** — the previous version treated
  `code`/`links`/`table` as mutually exclusive (`else if` chain), so only
  one could appear per call. Real another upstream fork uses independent `if`
  statements, allowing text+code+image+latex+links+table to all combine
  in a single call. Fixed to match.

## Latest Upstream Sync — another upstream fork commit ad6be86 (27 Jul 2026)

Checked the other upstream fork's latest commits (`git fetch`, 14 hours old
at time of writing) against F_merge. Found and ported one genuine gap:

- **Carousel interactive biz binary nodes** — `shouldIncludeBizBinaryNode`
  (`WABinary/generic-utils.ts`) now also treats
  `interactiveMessage.carouselMessage` as a valid trigger (previously only
  checked `nativeFlowMessage`), and `getBizBinaryNode` now falls back to
  the first carousel card's native flow buttons
  (`carouselMessage.cards[0].nativeFlowMessage`) when there's no top-level
  `nativeFlowMessage`. Without this, sending an interactive carousel
  message would silently skip the required `biz` binary node WhatsApp
  needs to render buttons/quality-control on carousel cards.
- Ported the other upstream fork's test cases plus two extra regression checks into
  `src/__tests__/binary/carousel-biz-node.test.ts`.

## Carousel Message Shorthand (content.cards)

Cross-checked the other upstream fork's README "Carousel & Native Flow" section
against F_merge's `content.cards` handler in `Utils/messages.ts`. Found
genuine gaps — the handler only understood the raw native format
(`buttons`, `body`), not the documented convenience shorthand. Fixed:

- **`caption`** — now accepted as an alias for `body` on each card.
- **`nativeFlow`** — now accepted as an alias for `buttons`, and each
  entry is shorthand-converted: `{ url }` → `cta_url` (with
  `useWebview`), `{ copy }` → `cta_copy`, `{ call }` → `cta_call`,
  `{ sections }` → `single_select`, `{ id }` (default) → `quick_reply`.
  `icon` is supported on all of them.
- **`offerText`/`offerCode`/`offerUrl`/`offerExpiration`** — now wrapped
  into `nativeFlowMessage.messageParamsJson` as a `limited_time_offer`
  block per card.
- **`optionText`/`optionTitle`** — now wrapped into
  `nativeFlowMessage.messageParamsJson` as a `bottom_sheet` block per
  card.

Verified end-to-end against the exact 3-card example from
the other upstream fork's README (URL button w/ webview, offer banner, and
quick_reply w/ icon + bottom_sheet) — all fields came through correctly
in the built proto.

## Feature Comparison Table Verification (17 fork-exclusive features)

Went through the other upstream fork's README "Feature Comparison" table
item-by-item, checking real code (not just presence) against F_merge:

- **Auto-Reply, Message Scheduler, Anti-Delete, Rich AI Responses,
  Interactive Message Generators, Carousel & Native Flow, Message
  Templates, vCard Builder, Message Search, Read Receipt Controller,
  Typing Indicator, JID Plotting & LID Support** — previously verified in
  earlier sessions (see the corresponding table rows above).
- **PIX / PAY Interactive Buttons** — these are raw `interactiveButtons`
  payloads with specific `name` values (`payment_info`, `review_and_pay`)
  — confirmed the generic `interactiveButtons` content-type dispatch
  already handles them, no special-casing needed either in F_merge or in
  the other upstream fork's own code.
- **Panoramic Profile Picture** — found and fixed a real bug:
  `updatePanoramaProfilePicture` was sending `attrs: { type: 'preview' }`
  for the wide/banner image; real another upstream fork (and the WhatsApp
  protocol) uses `attrs: { type: 'fullsize' }`. `'preview'` is very
  likely misinterpreted or ignored by WhatsApp's server. Fixed.
  `generatePanoramaProfilePicture`'s resize/crop logic was cross-checked
  and confirmed equivalent (640×640 square crop, aspect-preserving wide
  resize capped at `maxWidth`).
- **Shop & Collection Messages** — confirmed present, and found F*merge
  had \_already* fixed a real bug present in the other upstream fork's own source:
  their `shop`/`collection` content-type handlers do
  `...Object.assign(interactiveMessage, m)` inside a header object spread
  — this mutates and mis-spreads the whole `interactiveMessage` into
  `header`, which is corrupted output. F_merge's version (marked
  `// FIX Bug 1` in the code) properly attaches `imageMessage`/
  `videoMessage`/`documentMessage` onto `header` directly instead.
- **StatusHelper** — `STATUS_BACKGROUNDS` and `STATUS_FONTS` diffed
  field-by-field against another upstream fork: byte-for-byte identical values
  (11 solid colors, 6 gradients, 10 font IDs 0–9).
- **Group Status (`groupStatus`) & `interactiveAsTemplate`** — confirmed
  present and structurally matching (`contextInfo.isGroupStatus` +
  `groupStatusMessageV2` wrapper; `interactiveMessage` →
  `templateMessage.interactiveMessageTemplate` wrapper).

## Follow-up Verification (this session)

- **`from-messages.ts`** — checked all 7 functions against the other upstream fork's
  entire real `lib/` (not just the files checked before): **0 matches**.
  Confirmed against an upstream fork too: only `isWebPBuffer`/`isAnimatedWebP`
  match (2/7) — already documented, no change needed.
- **`stickerpack.ts`** — added `convertToWebP(input)`, extracted from
  the upstream fork's inline sticker-pack conversion logic (previously only
  present inline inside `from-messages.ts`'s `buildStickerPackMessage`,
  not exposed as a standalone reusable function here). Accepts a Buffer,
  URL string, or Stream; passes through untouched if already WebP;
  otherwise converts via the sharp → @napi-rs/image fallback chain
  (512×512 'inside' fit, quality 80), matching an upstream fork exactly. The
  existing WhiskeySockets-PR-based shell functions
  (`buildStickerPackProto`, `generateStickerPackId`,
  `STICKER_PACK_MESSAGE_TYPE`) are unchanged. Runtime-tested with a real
  PNG buffer — correctly converts to WebP.
- **`rich-response.ts`** — confirmed an upstream fork has none of this
  (`sendTable`/`sendCodeBlock`/etc. don't exist there at all). Re-verified
  all 9 another upstream fork-sourced exports are present and were already
  deep-fixed in earlier sessions; nothing further to add.

## Follow-up (round 2)

- **`from-messages.ts` — `buildAdminInviteMessage`/`buildCallMessage`/
  `buildPaymentInviteMessage`** — these showed 0% match against
  another upstream fork by function name because another upstream fork has this logic
  **inline** in `generateWAMessageContent` (not as separate exported
  functions). Compared field-by-field against the real inline code: all
  match exactly, **except one default value** — `buildCallMessage`'s
  default title was `'Call'`, real another upstream fork uses `'Call Creation'`.
  Fixed. Source comments updated to correctly credit another upstream fork
  instead of the vague "messages.ts → X block".
- **`stickerpack.ts`** — kept the WhiskeySockets-PR-based shell functions
  (`buildStickerPackProto`, `generateStickerPackId`,
  `STICKER_PACK_MESSAGE_TYPE`) and `convertToWebP` as-is, and additionally
  ported the upstream fork's **complete** `prepareStickerPackMessage` as a
  distinct function — `prepareStickerPackMessage()` — kept
  side-by-side rather than merged in, since the two have different
  design choices (this fork's `buildStickerPackMessage` in
  `from-messages.ts` builds a raw proto object for the caller to send
  manually; the upstream fork's version does the full upload pipeline itself and
  returns a ready-to-send `StickerPackMessage`, plus supports optional
  media caching keyed by sticker URLs). End-to-end tested with a real PNG
  buffer through a mocked upload function — ZIP build, ID generation,
  and thumbnail generation all confirmed working.
- Also discovered and fixed: **`stickerpack.ts` itself was never wired
  into the addons barrel export** (`addons/index.ts`) — none of its
  exports (`buildStickerPackProto`, `generateStickerPackId`,
  `STICKER_PACK_MESSAGE_TYPE`, `convertToWebP`,
  `prepareStickerPackMessage`) were reachable via
  `import { ... } from '@queenanya/baileys'` before this fix.
- **`rich-response.ts`** — reconfirmed an upstream fork has none of this
  (`sendTable`, `sendCodeBlock`, etc. don't exist there). All 9
  another upstream fork-sourced exports already present and verified in earlier
  sessions; nothing further needed.

## Known Gaps / Not Implemented

- `jid-plot.ts`, `message-scheduler.ts` — attribution comments reference
  another upstream fork, but no matching function names could be found in either
  fork's source. Treat with caution; re-verify before relying on them.
- `uploadMediaToWhatsApp(buffer, type)` as a standalone importable
  function — this was never real. It was a placeholder callback name in a
  doc example (`sendLatexImage(expr, renderFn, uploadFn)`), not an actual
  export from any fork. The real underlying function is
  `getWAUploadToServer` in `Utils/messages-media.ts`, which is already
  present and — for newsletter media paths + thumbnail direct-paths — is
  ahead of real upstream, not behind it.

## another upstream fork `Utils/` Full Re-Audit (this session)

Cross-checked every another upstream fork-attributed file the user flagged from a
live GitHub file listing (16 files: `anti-delete`, `auto-reply`,
`baileys-event-stream`, `chat-control`, `identity-change-handler`,
`interactive-message`, `jid-plotting`, `message-composer`, `message-search`,
`rich-message-utils`, `scheduling`, `status-posting`, `templates`,
`use-mongo-file-auth-state`, `use-single-file-auth-state`, `vcard`) against
this fork's current source, function-by-function.

**15 of 16 confirmed as faithful existing ports** — same exported functions,
same logic, same edge-case handling as the other upstream fork's `.js`, already
correctly present (in most cases as a typed superset with extra
interfaces/options the other upstream fork's plain JS doesn't have). No changes
needed for: `anti-delete`, `auto-reply`, `baileys-event-stream`,
`chat-control`, `identity-change-handler`, `interactive-message`,
`jid-plotting`, `message-composer`, `message-search`, `scheduling`,
`status-posting`, `templates`, `use-mongo-file-auth-state`, `vcard`, and
`rich-message-utils` (the other upstream fork's `botMetadataSignature` /
`botMetadataCertificate` / `wrapToBotForwardedMessage` /
`prepareRichResponseMessage` are all present, consolidated into
`addons/bot-forwarded-message.ts` instead of a separate file — logic
verified identical, only the random-byte source differs cosmetically:
`crypto.randomFillSync` (Node) vs `getRandomValues` (Web Crypto), both
cryptographically equivalent).

**1 of 16 was genuinely different — cloned as a separate file:**
`use-single-file-auth-state.js`. the other upstream fork's version is the **original
upstream WhiskeySockets/Baileys deprecated example implementation** — marked
`@deprecated`, explicitly commented "DO NOT USE IN A PROD ENVIRONMENT",
synchronous, no caching, no debouncing, no atomic writes, no concurrency
guard (`writeFileSync` on every single `set()` call). This fork's existing
`use-single-file-auth-state.ts` is a different, production-hardened
implementation (LRUCache + `async-mutex` + debounced atomic temp-file-swap
writes, ported from an upstream fork). Since the two differ fundamentally in
approach (not just cosmetically), the other upstream fork's version was NOT used to
overwrite the existing file — it was added as
**`Utils/use-single-file-auth-state-legacy.ts`**, exporting
`useSingleFileAuthStateLegacy`, clearly marked deprecated, for anyone who
specifically needs its exact (KEY_MAP-translated, synchronous) behavior for
compatibility reasons. The default `use-single-file-auth-state.ts` remains
the recommended option.

## Category B/C Cleanup — This Session

Following up on the full `addons/` audit above, the user confirmed all
Category C files (originally-unmatched to either fork) **except
`button-sender.ts`** were personally hand-ported from community forks
by the user — not misattributed, just not matchable by function-name search
alone (likely renamed/restructured during porting). No changes made to
Category C as a result; `button-sender.ts` remains the one file with
genuinely unconfirmed origin.

### `bot-forwarded-message.ts` → renamed to `rich-message-utils.ts`

Full function-by-function re-check (all 6 exports of the other upstream fork's
`rich-message-utils.js`, not just the 4 checked earlier) confirmed 100%
logical parity: `botMetadataSignature`, `botMetadataCertificate`,
`wrapToBotForwardedMessage`, `toUnified`, `prepareRichResponseMessage` are
all defined directly and match; `tokenizeCode` is imported from
`message-composer.ts` rather than redefined — which turns out to mirror
the other upstream fork's own source exactly (their `message-composer.js` and
`rich-message-utils.js` duplicate `tokenizeCode` verbatim; this fork just
de-duplicated it). Since the file is a complete, faithful port, it was
renamed to match the upstream filename. All import references
(`Utils/messages.ts`, `addons/index.ts`, `addons/rich-response.ts`) updated
accordingly.

## Full `addons/` Audit — File Rename, Export Fixes, New Clone (this session)

Cross-checked all 34 files in `src/addons/` against both the other upstream fork's
and the upstream fork's actual source, function-by-function (not just filename
matching). Findings and fixes:

1. **`bot-forwarded-message.ts` → renamed to `rich-message-utils.ts`.**
   Confirmed all 6 of the other upstream fork's `rich-message-utils.js` functions are
   present and logically identical: `botMetadataSignature`,
   `botMetadataCertificate`, `wrapToBotForwardedMessage`,
   `prepareRichResponseMessage`, `toUnified` (all defined directly), and
   `tokenizeCode` (imported from `message-composer.ts` rather than
   duplicated — the other upstream fork's own source duplicates this function
   verbatim across both files; this fork de-duplicated it, which doesn't
   change behavior). Since scope was 100% complete, renamed to match the
   upstream filename. All internal/external references
   (`Utils/messages.ts`, `addons/index.ts`, `addons/rich-response.ts`)
   updated accordingly.

2. **`interactive-message.ts` export was commented out** in
   `addons/index.ts` (`//export * from './interactive-message'`) —
   uncommented. Checked for naming collisions against every other
   currently-exported addon file first; none found.

3. **`status-helpers.ts` — confirmed already correctly exported** via a
   pre-existing aliased block in `addons/index.ts` (`*Basic` suffix on all
   12 overlapping names vs `status-posting.ts`). No action needed beyond
   expanding its header comment to clarify the relationship between the two
   files (same core functions; `status-posting.ts` additionally has
   StatusMentions mention-tagging support).

4. **`status-posting.ts` — real bug found and fixed, then made defensive.**
   The `groupStatus` field for group status sends was nested inside
   `contextInfo` under the wrong name (`isGroupStatus`) instead of being a
   top-level `groupStatus` field, which is what the other upstream fork's source —
   and, going by the field-naming convention, WhatsApp's actual protocol —
   expects. `status-helpers.ts` already had this correct, which is how the
   discrepancy was caught. Final fix ships **both** placements defensively:
   `groupStatus: true` (top-level, confirmed-correct) AND
   `isGroupStatus: true` (nested in `contextInfo`, the original queenanya
   placement) side by side, so nothing that may have relied on the old
   field is silently broken — the extra field is harmless if unused.

5. **`interactive-message-basic.ts` — new file, added, NOT exported.** A
   pure, faithful TypeScript port of the other upstream fork's `interactive-message.js`
   (same 8 functions as `interactive-message.ts`, which additionally has
   full param/return TS types — logic confirmed identical, not a behavior
   fork). **Export policy:** when a cloned file's functions are already
   available via another exported file, the clone is kept in the repo for
   reference/audit purposes but is deliberately **not** re-exported from
   `addons/index.ts` — avoids alias-naming churn for zero functional
   benefit. Same policy applied to `status-helpers.ts` (also kept,
   also unexported, since `status-posting.ts` already exports the same
   12 functions).

**Category C note (per user instruction):** the ~13 addon files with no
matching function names in either fork's source (`button-sender.ts`
excepted — origin still unclear) are confirmed to be code the user added
personally from community forks — not flagged as attribution
errors, left as-is.

## Jimp Profile-Picture Generators — `media-messages.ts` / `media-set.ts` (new)

User-supplied `media-messages.js` (Jimp 0.22.x) + `media-set.js` ported to
this fork's `jimp@^1.6.1` (a breaking API change: default export → named
`{ Jimp, JimpMime }`, `getBufferAsync(mime)` → `await getBuffer(mime)`,
`Jimp.MIME_JPEG` → `JimpMime.jpeg`). `jimp` moved from an optional peer
dependency to a hard `dependencies` entry, same reasoning as the Framework
peer-dep fix — these addon files are unconditionally exported from the
package root, so `jimp` must always be installed.

**Deduplicated:** the source had two pairs of functions with identical (or
near-identical, minus a bug) bodies under different names —
`generatePP`/`generateProfilePictureFP`, and
`generateProfilePictureFull`/`changeprofileFull` (the latter had a
`ReferenceError`-causing bug: bare `MIME_JPEG` instead of `Jimp.MIME_JPEG`).
Each pair is implemented once and exported under **both** original names
as aliases, so nothing importing either name breaks — no functional
duplication, no lost compatibility. `generateProfilePicturee` (flexible
Buffer/url/stream input) stays separate — it's genuinely different logic.

`media-set.ts`'s imports were changed from `@queenanya/baileys` (external
package import, as the user's original file had it) to relative internal
paths, since these files now live inside the package itself.

## VoIP Calling — `src/Voip/` (same-session + separate-session, both vendored)

Ported from [`baileys-caller`](https://github.com/SheIITear/baileys-caller)
(by SheIITear) — wraps WhatsApp Web's official VoIP WASM stack (worker
thread pool, RTP/SRTP session management, FFmpeg audio decode/resample).
**Two integration modes exist, for two different use cases:**

### `src/Voip/voip-engine.ts` — same-session (the primary, requested integration)

Wired directly into the core socket chain (`Socket/socket.ts` →
`registerSocketEndHandler`, invoked from `Socket/username.ts`'s
`attachVoipToSocket(sock)`), exposing `sock.initiateCall(jid, opts)` on
your **existing** bot connection — no separate QR scan, no separate auth
directory. This is what [§30 in the main README](../../README.md#30-voice-calling-wasm-based-same-session)
documents. Lazy-initialized (WASM engine only spins up on first
`initiateCall()` call).

**2 bugs found and fixed during verification:**

1. **Asset path resolution bug** (`wasm-engine.ts`) — the original
   `baileys-caller` compiles flat into `dist/*.mjs` (one directory level
   under its package root), so `path.resolve(__dirname, '..')` correctly
   reached its package root to find `assets/wasm/whatsapp.wasm`. This
   fork's build (`tsconfig.build.json`: `outDir: "lib"`, no `rootDir`
   override) mirrors `src/`'s subfolder structure — so this file compiles
   to `lib/Voip/wasm-engine.js`, **two** levels under the package root, not
   one. The single-level `path.resolve(__dirname, '..')` would have
   resolved to `lib/` and never found the WASM binary at runtime. Fixed to
   `path.resolve(__dirname, '..', '..')`. This fix propagates correctly to
   every other asset lookup (`loader.js`, `worker-modules.js`) since they
   all derive from the same corrected `resourcesPath`.
2. **Implicit `any`** (`audio-feeder.ts`) — the `ffmpeg` child process
   `'exit'` event handler's `code` parameter was untyped; annotated as
   `number | null` (matches Node's actual `ChildProcess` `'exit'` event
   signature).

Everything else in the port (`types.ts`, `audio-feeder.ts`,
`relay-transport.ts`, `signaling.ts`, `wasm-engine.ts`,
`worker-bootstrap.ts`) is a faithful line-for-line port of the original
`.mts` source — verified this session by diffing against the real
`baileys-caller` repo source directly (not just documentation): every
function/method/class name matches 1:1, and the only content differences
are cosmetic (single vs double quotes, semicolons dropped, multi-statement
lines split — this project's prettier style) plus the two documented bug
fixes above and `__filename`/`__dirname` renamed to
`__voipFilename`/`__voipDirname` in `wasm-engine.ts` (avoids a collision
once this file lives inside a larger bundled project). No logic gaps
found.

`@roamhq/wrtc` (native WebRTC bindings) is a **lazy dynamic import**
(`import('@roamhq/wrtc')`) inside the call-placing method, not a static
top-level import — so it's correctly left as an _optional_ peer dependency
(unlike `node-webpmux`/`fluent-ffmpeg`/`jimp`/etc., which needed to move to
hard `dependencies` earlier in this fork's history because they're
statically imported at module load time from files that are unconditionally
exported). Consumers who never call `sock.initiateCall()` never need
`@roamhq/wrtc` installed at all.

### `Voip/voip-client.ts` + `addons/voip-calling.ts` — separate-session alternative

A **different, standalone** wrapper — `createVoipClient({ authDir })`
creates its **own independent** WhatsApp connection (own QR scan, own auth
directory), for cases where you want calling fully decoupled from your main
bot's session.

**This session:** vendored `baileys-caller`'s `src/index.mts` (the
`VoipClient` class — 401 lines) as `Voip/voip-client.ts`, replacing the
previous design which dynamically imported the **external**
[`baileys-caller`](https://github.com/SheIITear/baileys-caller) npm
package at runtime (required a manual `npm install github:...`, a manual
build step, and a `@whiskeysockets/baileys` peer dependency — none of
that is needed anymore).

The port turned out simpler than a full transcription: `index.mts`'s
`VoipClient` duplicates the entire WASM/signaling/relay/audio engine
inline (same logic `voip-engine.ts` already has, just owning its own
socket instead of attaching to an existing one). Since this fork's
`makeWASocket()` factory already wires `sock.initiateCall()` into
*every* socket it creates (via `Socket/username.ts` →
`attachVoipToSocket`), `voip-client.ts` doesn't need to duplicate that
engine at all — it only needed to port the "create a brand-new
connection" part (`useMultiFileAuthState`, socket creation, QR-code
display, auto-reconnect on the post-QR 515 stream-error path), then
delegates `call()` straight to the already-wired `sock.initiateCall()`.
No engine code is duplicated between the two integration modes.

`addons/voip-calling.ts` is now a thin re-export of `Voip/voip-client.ts`
(previously it defined its own structural types and dynamically imported
the external package). The old exported type names
(`VoipClientConfig`/`VoipCallOptions`/`VoipCallEvents`/`VoipActiveCall`)
are kept as `@deprecated` aliases pointing at the new names
(`VoipSdkConfig`/`CallOptions`/`CallEvents`/`ActiveCall`) so nothing
importing the old names breaks.

`addons/baileys-caller.d.ts` (the ambient type stub that let the old
`import('baileys-caller')` type-check without the package installed) was
deleted — dead code now that nothing dynamically imports that module
anymore.

## New Addons This Session — link-preview-extras, newsletter-role-updates, find-user-id

Three new addon files, extracted out of core-file changes so the actual
logic lives here rather than inline in `Socket/`/`Utils/` files (only the
hook call remains in core):

| File | Feature | Source | Notes |
| --- | --- | --- | --- |
| `link-preview-extras.ts` | `applyLinkPreviewMetadata`, `buildFaviconMMSMetadata` — `linkPreviewMetadata` + `favicon` support on text messages | another upstream fork (commit `fc139c8`) | Called from `Utils/messages.ts`. Uses a type-only import of `prepareWAMessageMedia` to avoid a runtime circular import. |
| `newsletter-role-updates.ts` | `emitNewsletterRoleUpdate` — promote/demote event emission, fixes a missing `NotificationNewsletterAdminDemote` case that silently dropped demotions | another upstream fork (commit `170c5af`, author/user empty-string fallback ported) | Called from `Socket/messages-recv.ts`. |
| `find-user-id.ts` | `findUserId` — resolves a PN or LID jid to both forms | an upstream fork | Called from `Socket/chats.ts` as `sock.findUserId()`. Takes `lidMapping` as a parameter rather than importing `signalRepository` directly, keeping the addon decoupled from Socket-layer construction. |

Also fixed this session (not addon-extractable — genuine core bugs, stay
in core files per the project's own rule that core-file patches from
modified forks are the one exception that doesn't move to addons when the
fix is a one-line change to existing core logic rather than new
standalone functionality):
- `generateWAMessageFromContent` (`Utils/messages.ts`) no longer disables
  quoting entirely inside newsletters — only `contextInfo.remoteJid` is
  skipped now, matching an upstream fork.
- `WAUrlInfo.previewType` is respected instead of hardcoded to `0`.
- Standalone `interactiveButtons` messages gained the same
  `offerText`/`offerCode`/`offerUrl`/`offerExpiration`/`optionText`/
  `optionTitle`/`audioFooter` support carousel cards already had, via two
  new shared helpers in `Utils/messages.ts`:
  `convertNativeFlowButtons` and `buildNativeFlowMessageParamsJson`.
- `secretEncryptedMessage`/`SecretEncType.MESSAGE_EDIT` (WhatsApp's newer
  E2EE message-edit envelope) is now decrypted in
  `Utils/process-message.ts` (`decryptMessageEdit`/`buildEditUpdate`),
  surfaced through the existing `messages.update` event.
- `businessOwnerJid` is now validated before building a `product:`
  message (`Utils/messages.ts`).
- `updateBusinessProfile` now resolves as a correctly-spelled alias for
  `updateBussinesProfile` (`Socket/business.ts`).

## community forks Cross-Check — README-Documented but Unimplemented Features (this session)

Cross-referenced every `sock.sendMessage(...)` example already documented
in this fork's own `README.md` against actual `Utils/messages.ts` /
`Socket/messages-send.ts` logic (i.e. "does the code actually do what the
docs claim"), then against `an upstream fork` and `another upstream fork`
source to source the correct behavior. Found two doc/code mismatches —
both fixed this session:

| Feature | Was documented as | Actually was | Source | Fix |
| --- | --- | --- | --- | --- |
| `invoiceNote` | `> [!NOTE] Invoice message are not supported yet.` — i.e. openly a stub | No `invoiceMessage` handling existed anywhere in `Utils/messages.ts`; the WAProto schema (`InvoiceMessage`) was already present and unused | an upstream fork (`Utils/messages.js`, `Lia@Changes 01-02-26`) | Added as a post-processing step in `generateWAMessageContent` (`Utils/messages.ts`) — wraps an already-built `imageMessage`/`documentMessage` into `invoiceMessage`, carrying over the media's upload metadata (`directPath`, `fileEncSha256`, `mediaKey`, etc.) plus the note text. Added `invoiceNote: string` to the `AnyMessageContent` union in `Types/Message.ts`. README note updated to reflect it now works. |
| `sock.sendMessage([jidA, jidB, jidC], { text })` (status mention) | Documented under "🎞️ Status Mention" with no caveat — implied working | `sendMessage`'s `jid` param was typed `string` only; passing an array silently mis-behaved (no `Array.isArray(jid)` branch existed) | an upstream fork (`Socket/messages-send.js`, `Lia@Changes 13-03-26 --- Add status mentions!`) | Ported the array-jid branch into `sendMessage` (`Socket/messages-send.ts`): widened the `jid` param to `string \| string[]`; an array posts a single `status@broadcast` update, expands any group jids to their participants, dedupes into a `Set`, and relays with `statusJidList` + a `mentioned_users` binary node so each jid is mentioned on the status. README given a note clarifying the group-expansion behavior. |

Everything else cross-checked from the same README pass (`ai`,
`groupStatus`, `requestPaymentFrom`, `orderText`, `raw`,
`secureMetaServiceLabel`, `spoiler`, `externalAdReply`, `album`,
`disclaimerText`/`headerText`/`contentText`/`links`/`footerText`, `table`,
`tokenizeCode`, `richResponse` raw submessages, sticker packs
`cover`/`stickers`/`publisher`) was confirmed already correctly wired to
matching code — no further gaps found in that pass.

## Dual Content/Options Flags — groupStatus, isLottie, spoiler, secureMetaServiceLabel, ai, ephemeral (this session)

Per user request: these six boolean flags previously only worked when set
on the **content** object (e.g. `{ image: {...}, spoiler: true }`), except
`ai` and `secureMetaServiceLabel` which only worked when set on the
**options** object. Neither accepted the other form.

Added a normalization step at the top of `sendMessage` (`Socket/messages-send.ts`,
right after the array-jid branch) that merges `content` and `options` for
all six flags before any other logic runs: whichever side sets a flag
wins (content takes priority if both are set), and the merged boolean is
written back onto **both** objects. This means every existing
content-based check (`hasOptionalProperty(message, 'groupStatus')` etc. in
`Utils/messages.ts`) and every existing options-based check
(`options.ai`, `options.secureMetaServiceLabel` in `Socket/messages-send.ts`)
keeps working completely unmodified — they just now also see values that
originated on the other side.

`ephemeral` is new (did not exist in either form before, despite being
shown in this fork's own README `ephemeral: true` example) — it's
translated into `options.ephemeralExpiration = WA_DEFAULT_EPHEMERAL` unless
an explicit `ephemeralExpiration` was already given, which always takes
priority. Source: an upstream fork.

Type additions: `MiscMessageGenerationOptions` (`Types/Message.ts`) gained
`groupStatus?`, `isLottie?`, `spoiler?`, `ephemeral?` (options-level);
the `AnyMessageContent` union gained `ai?` and `secureMetaServiceLabel?`
member types (content-level) plus the new `ephemeral?` member.

## CI Lint Fixes — max-depth + prettier (this session)

`yarn lint` on CI flagged 4 real issues (all in the array-jid `sendMessage`
addition above; everything else in the CI output was pre-existing
`@typescript-eslint/no-explicit-any` warnings unrelated to this session):

- Two `max-depth` errors from nesting `if (isJidGroup) → try → for
  (participant)` five/six levels deep inside `sendMessage`. Fixed by
  extracting the group-expansion loop into a standalone
  `expandStatusMentionJids(jids)` helper (declared once, near
  `markIdentityChanged`, using the same closure-captured
  `cachedGroupMetadata` / `groupMetadata` / `logger`), so the call site is
  now a single `const allUsers = await expandStatusMentionJids(jid)` line.
- Two `prettier/prettier` formatting errors (long single-line array
  literal, long single-line object destructure) — reformatted to
  prettier's expected multi-line style.
