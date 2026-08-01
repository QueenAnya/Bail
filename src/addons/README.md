# Baileys (F_merge) — Addons

This folder contains every ported/extra feature on top of vanilla
`@whiskeysockets/baileys`. Every addon is self-contained, fully typed, and
re-exported from `addons/index.ts` → `src/index.ts`.

All sources below were verified against the actual upstream code (not just
doc claims) — either by diffing against a real clone of
`WhiskeySockets/Baileys` (GitHub master), or by function/field-level
comparison against `innovatorssoft/Baileys` and `itsliaaa/baileys`'s
compiled output.

---

## Addon Files & Verified Sources

| File                                                                                  | Feature                                                                                                                                                                                                                                                                                                                                  | Source                                                                                                                                                                                                   | Verified                                                                                                                                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `call-handler.ts`                                                                     | Full outgoing/incoming call support (offer, accept, cancel, mute, terminate, join/query call link, heartbeat, transport, relay-latency, enc-rekey)                                                                                                                                                                                       | innovatorssoft (`Socket/messages-recv.js`, embedded call block)                                                                                                                                          | ✅ 15/15 functions + `sanitizeCallerPn` match by name & signature                                                                                                       |
| `chat-control.ts`                                                                     | `TypingIndicator`, `PinnedMessagesManager`, `ReadReceiptController`, disappearing-message durations                                                                                                                                                                                                                                      | innovatorssoft (`Utils/chat-control.js`)                                                                                                                                                                 | ✅ exports match                                                                                                                                                        |
| `status-helpers.ts`                                                                   | `StatusHelper` — text/image/video/gif/voice-note status posting                                                                                                                                                                                                                                                                          | innovatorssoft (`Utils/status-posting.js`)                                                                                                                                                               | ✅ core functions match                                                                                                                                                 |
| `use-cache-manager-auth-state.ts`                                                     | Auth state backed by any `cache-manager` v5 store (Redis, Memcached, in-memory)                                                                                                                                                                                                                                                          | innovatorssoft (`Store/make-cache-manager-store.js`)                                                                                                                                                     | ✅ TTL constant + structure match                                                                                                                                       |
| `use-sqlite-auth-state.ts`                                                            | SQLite-backed auth state                                                                                                                                                                                                                                                                                                                 | **itsliaaa** (`Utils/use-sqlite-auth-state.js`)                                                                                                                                                          | ✅ exact schema/function match                                                                                                                                          |
| `jid-plotting.ts`                                                                     | JID plotting, `getSenderPn`, `normalizePhoneToJid`                                                                                                                                                                                                                                                                                       | innovatorssoft (leaked real `.ts` source, "Baileys-Joss" origin)                                                                                                                                         | ✅ 100% function-for-function match                                                                                                                                     |
| `message-composer.ts`                                                                 | `generateTableContent`/`generateListContent`/`generateCodeBlockContent`/`generateLatexContent`/etc., `extractUnifiedResponse`, `tokenizeCode` + syntax keyword sets                                                                                                                                                                      | innovatorssoft (`feat/send-rich-message` branch, `Utils/message-composer.js`)                                                                                                                            | ✅ 9 exports match 1:1                                                                                                                                                  |
| `rich-response.ts`                                                                    | `sendTable`/`sendList`/`sendCodeBlock`/`sendLatex`/`sendLatexImage`(QuickLaTeX)/`sendLatexInlineImage`/`sendRichMessage` (now builds real `botForwardedMessage`+`unifiedResponse` payload with `useMarkdown: true`, falls back to plain text otherwise)/`captureUnifiedResponse`/`sendUnifiedResponse`/`sendMarkdown`                    | innovatorssoft (partial — wraps `message-composer.ts` + `bot-forwarded-message.ts`)                                                                                                                      | ✅ verified — `sendRichMessage` rewritten this session to match documented behavior (was a simplified text-only stub before)                                            |
| `bot-forwarded-message.ts`                                                            | `botMetadataSignature`/`botMetadataCertificate`/`wrapToBotForwardedMessage`/`prepareRichResponseMessage`                                                                                                                                                                                                                                 | **itsliaaa** (reconstructed field numbers from compiled `index.js`)                                                                                                                                      | ✅ round-trip encode/decode tested                                                                                                                                      |
| `interactive-message.ts`                                                              | `generateCombinedButtons` (shorthand: `reply`/`copy`/`url`/`call`/`sections` + bare native `{name, buttonParamsJson}` pass-through, `icon` field, `offer`/`bottomSheet` wrappers), `generateInteractiveButtonMessage`, `generateInteractiveListMessage`, `generateTemplateMessage`                                                       | innovatorssoft                                                                                                                                                                                           | ✅ core functions match                                                                                                                                                 |
| `button-sender.ts`                                                                    | `buildInteractiveButtons`, payload validators, legacy-format compat                                                                                                                                                                                                                                                                      | `@ryuu-reinzz/button-helper` v2.2.5 (not innovatorssoft/itsliaaa)                                                                                                                                        | —                                                                                                                                                                       |
| `message-search.ts`                                                                   | `createMessageSearch` / `searchMessages`                                                                                                                                                                                                                                                                                                 | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `message-utils.ts`                                                                    | `getContentType`, `downloadMediaMessage` helpers, misc                                                                                                                                                                                                                                                                                   | innovatorssoft                                                                                                                                                                                           | ✅ 9/13 functions match                                                                                                                                                 |
| `anti-delete.ts`                                                                      | `MessageStore`, `createMessageStoreHandler`, `createAntiDeleteHandler`                                                                                                                                                                                                                                                                   | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `auto-reply.ts`                                                                       | `createAutoReply` — keyword/regex rules, cooldowns, JID allowlists                                                                                                                                                                                                                                                                       | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `scheduling.ts`                                                                       | Scheduling helpers                                                                                                                                                                                                                                                                                                                       | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `templates.ts`                                                                        | `createTemplateManager`, `renderTemplate`, `PRESET_TEMPLATES` (order, welcome, reminder, support-ticket, birthday, invoice)                                                                                                                                                                                                              | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `vcard.ts`                                                                            | `generateVCard(s)`, `parseVCard`, `createContactCard(s)` (called `ContactData` here vs. their `VCardContact`)                                                                                                                                                                                                                            | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `status-posting.ts`                                                                   | Legacy status-posting helpers                                                                                                                                                                                                                                                                                                            | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `baileys-event-stream.ts`                                                             | Event-stream utilities                                                                                                                                                                                                                                                                                                                   | innovatorssoft                                                                                                                                                                                           | ✅ match                                                                                                                                                                |
| `in-memory-store.ts`                                                                  | `makeInMemoryStore` (exported as `makeSimpleInMemoryStore` — aliased to avoid clashing with `Store/make-in-memory-store.ts`)                                                                                                                                                                                                             | innovatorssoft (added, not wired in their own barrel export either)                                                                                                                                      | ✅ match                                                                                                                                                                |
| `chat-history-helpers.ts`                                                             | `getLastMessageInChat`, `getOldestMessageInChat`, `copyNForward`                                                                                                                                                                                                                                                                         | Not from any fork — these were "implement this yourself" stubs in innovatorssoft's README examples; built here as real implementations on top of `SimpleInMemoryStore` + `generateForwardMessageContent` | —                                                                                                                                                                       |
| `browser-presets.ts`                                                                  | `Browsers.android()` preset, `getPlatformDisplayName()`, `ANDROID_PHONE` PlatformType fallback                                                                                                                                                                                                                                           | `Baileys-android-browser` + `InfiniteAPI-feat-android-browser-upstream` (real WhiskeySockets PR branches)                                                                                                | ✅ verified against actual PR source                                                                                                                                    |
| `pairing-fix.ts`                                                                      | Pairing queue — waits for `pair-device` stanza before sending IQ                                                                                                                                                                                                                                                                         | `Baileys-fix-pairing-code` (real PR branch)                                                                                                                                                              | ✅ `pairingReady` state gate matches                                                                                                                                    |
| `lid-support.ts`                                                                      | `onWhatsApp()` LID JID support                                                                                                                                                                                                                                                                                                           | `Baileys-fix-on-whatsapp-lid-support` (real PR branch)                                                                                                                                                   | ✅ `withLIDProtocol()`/`isLidUser` match                                                                                                                                |
| `outgoing-calls.ts`                                                                   | `initiateCall()`/`cancelCall()`/etc. (outgoing-only subset; see `call-handler.ts` for the full innovatorssoft version)                                                                                                                                                                                                                   | `Baileys-feature-outgoing-calls` (real PR branch)                                                                                                                                                        | ✅ verified                                                                                                                                                             |
| `past-participants.ts`                                                                | `processPastParticipants()` — history-sync past group members                                                                                                                                                                                                                                                                            | `Baileys-pastParticepnts` (real PR branch)                                                                                                                                                               | ✅ `pastParticipants`/`authorPn` fields match                                                                                                                           |
| `stickerpack.ts`                                                                      | `Sticker`/`StickerPack` types, `buildStickerPackProto()` — real full implementation lives in `from-messages.ts`'s `buildStickerPackMessage()` (WebP conversion, Lottie/WAS animated-sticker support beyond what any fork has, ZIP+encrypt+upload, tray icon + thumbnail, 60-sticker/1MB-per-sticker limits, 15-way concurrency batching) | `Baileys-feat-add-stickerpack-support` (real PR branch) + safety limits ported from itsliaaa                                                                                                             | ✅ verified — F_merge's implementation exceeds itsliaaa's (adds Lottie/WAS support itsliaaa lacks); this session added itsliaaa's missing count/size/concurrency limits |
| `jid-plot.ts`                                                                         | Separate, smaller JID-plotting variant                                                                                                                                                                                                                                                                                                   | Unverified — no match found in either fork or any supplied PR                                                                                                                                            | ❌                                                                                                                                                                      |
| `message-scheduler.ts`                                                                | Alternate scheduler implementation                                                                                                                                                                                                                                                                                                       | Unverified — no match found in either fork                                                                                                                                                               | ❌                                                                                                                                                                      |
| `from-chats.ts`, `from-messages.ts`, `from-messages-recv.ts`, `from-messages-send.ts` | Baseline re-exports adapted from this fork's own `Socket`/`Utils` files                                                                                                                                                                                                                                                                  | WhiskeySockets/Baileys (this fork's own source, not a third-party fork)                                                                                                                                  | —                                                                                                                                                                       |

---

## WAProto Schema Extensions (schema-only — not wired to Socket helpers)

74 message types were added to `WAProto/WAProto.proto` beyond real
WhiskeySockets/Baileys GitHub master (verified against commit `731cd6b5`,
27 Jun 2026):

- **61 from itsliaaa/baileys** — field numbers reconstructed from their
  compiled `WAProto/index.js` encode functions (bots, polls-add-option,
  split-payments, event-invites, chat-theming, subscription/broadcast
  app-state-sync actions).
- **13 from innovatorssoft/Baileys** — field numbers taken directly from
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
  Matches innovatorssoft's fix ("Switched FFmpeg execution from exec to
  spawn for safer process handling").

## Browser Presets

`PLATFORM_MAP`/`PLATFORM_VERSIONS` in `Utils/browser-utils.ts` are
byte-identical to innovatorssoft's. Cross-checked `Browsers` against
innovatorssoft, itsliaaa, and all 11 supplied WhiskeySockets PR branches —
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
  `useMarkdown: true` is passed (matches innovatorssoft's real behavior,
  verified against their actual compiled `rich-message-utils.js`, not
  just documentation).
- Added `generateMarkdownContent()` — a dedicated generator that always
  builds `unifiedResponse` (innovatorssoft has this as a separate function
  from the general rich-message path; `sock.sendMarkdown()` now uses it).
- `sock.sendRichMessage(jid, submessages, quoted, { useMarkdown })` now
  passes the option through.
- **`content.richResponse` / `content.table` / `content.code` /
  `content.links` shorthand** — `sock.sendMessage(jid, { richResponse: {...} })`
  was completely unwired before this session; now dispatches to
  `prepareRichResponseMessage()`. Supports both the flat shape
  (`{ code, text, language }` at the top level, matching real
  innovatorssoft's actual destructuring) and the nested shorthand shown in
  documentation (`{ richResponse: { text, code, language } }`) — the
  nested object form is merged into the flat shape automatically.
- `toUnified()` in `bot-forwarded-message.ts` — added the missing
  `INLINE_IMAGE` case; confirmed the `markdown_cells` field on table rows
  is real (present in innovatorssoft's `rich-message-utils.js`, just
  missing from their simpler `generateRichMessageContent`'s inline
  version — an inconsistency in their own codebase between two parallel
  implementations of the same concept).
- Rewrote `rich-response.ts`'s addon-layer `sendTable`/`sendList`/
  `sendCodeBlock` to match real innovatorssoft signatures
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

Compared F_merge's 18 newsletter methods against innovatorssoft's and
itsliaaa's real compiled source. 4 were genuinely missing and have been
added:

- **`newsletterSubscribed()`** (itsliaaa) — fetch all newsletters this
  account is subscribed to (like `groupFetchAllParticipating`, but for
  newsletters).
- **`newsletterReactionMode(jid, mode)`** (innovatorssoft) — set who can
  react to newsletter posts.
- **`newsletterAction(jid, type)`** (innovatorssoft) — generic dispatcher
  to any `QueryIds` action by name.
- **`newsletterFetchUpdates(jid, count, after, since)`** (innovatorssoft)
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
against innovatorssoft's real `rich-message-utils.js` field-by-field.
Found:

- **`posts`, `products`, `suggested`, `inlineVideo`** — these are
  unimplemented placeholder stubs even in innovatorssoft's own real
  source (they push a literal string like `'POSTS'` as message text, not
  an actual feature). Not ported — there's nothing real to port.
- **`inlineImage`, `latex` (array of expressions)** — these ARE real and
  were missing. Added, including a matching `LATEX` case in `toUnified()`.
- **`links` citation handling** — the previous version computed
  `sources` (citation metadata) but then discarded it (`void sources`)
  instead of attaching it. Fixed to properly attach via `inlineEntities`
  on the text submessage, matching real innovatorssoft behavior.
- **Independent conditions, not else-if** — the previous version treated
  `code`/`links`/`table` as mutually exclusive (`else if` chain), so only
  one could appear per call. Real innovatorssoft uses independent `if`
  statements, allowing text+code+image+latex+links+table to all combine
  in a single call. Fixed to match.

## Latest Upstream Sync — innovatorssoft commit ad6be86 (27 Jul 2026)

Checked innovatorssoft/Baileys's latest commits (`git fetch`, 14 hours old
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
- Ported innovatorssoft's test cases plus two extra regression checks into
  `src/__tests__/binary/carousel-biz-node.test.ts`.

## Carousel Message Shorthand (content.cards)

Cross-checked innovatorssoft's README "Carousel & Native Flow" section
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
innovatorssoft's README (URL button w/ webview, offer banner, and
quick_reply w/ icon + bottom_sheet) — all fields came through correctly
in the built proto.

## Feature Comparison Table Verification (17 fork-exclusive features)

Went through innovatorssoft's README "Feature Comparison" table
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
  innovatorssoft's own code.
- **Panoramic Profile Picture** — found and fixed a real bug:
  `updatePanoramaProfilePicture` was sending `attrs: { type: 'preview' }`
  for the wide/banner image; real innovatorssoft (and the WhatsApp
  protocol) uses `attrs: { type: 'fullsize' }`. `'preview'` is very
  likely misinterpreted or ignored by WhatsApp's server. Fixed.
  `generatePanoramaProfilePicture`'s resize/crop logic was cross-checked
  and confirmed equivalent (640×640 square crop, aspect-preserving wide
  resize capped at `maxWidth`).
- **Shop & Collection Messages** — confirmed present, and found F*merge
  had \_already* fixed a real bug present in innovatorssoft's own source:
  their `shop`/`collection` content-type handlers do
  `...Object.assign(interactiveMessage, m)` inside a header object spread
  — this mutates and mis-spreads the whole `interactiveMessage` into
  `header`, which is corrupted output. F_merge's version (marked
  `// FIX Bug 1` in the code) properly attaches `imageMessage`/
  `videoMessage`/`documentMessage` onto `header` directly instead.
- **StatusHelper** — `STATUS_BACKGROUNDS` and `STATUS_FONTS` diffed
  field-by-field against innovatorssoft: byte-for-byte identical values
  (11 solid colors, 6 gradients, 10 font IDs 0–9).
- **Group Status (`groupStatus`) & `interactiveAsTemplate`** — confirmed
  present and structurally matching (`contextInfo.isGroupStatus` +
  `groupStatusMessageV2` wrapper; `interactiveMessage` →
  `templateMessage.interactiveMessageTemplate` wrapper).

## Follow-up Verification (this session)

- **`from-messages.ts`** — checked all 7 functions against innovatorssoft's
  entire real `lib/` (not just the files checked before): **0 matches**.
  Confirmed against itsliaaa too: only `isWebPBuffer`/`isAnimatedWebP`
  match (2/7) — already documented, no change needed.
- **`stickerpack.ts`** — added `convertToWebP(input)`, extracted from
  itsliaaa/baileys's inline sticker-pack conversion logic (previously only
  present inline inside `from-messages.ts`'s `buildStickerPackMessage`,
  not exposed as a standalone reusable function here). Accepts a Buffer,
  URL string, or Stream; passes through untouched if already WebP;
  otherwise converts via the sharp → @napi-rs/image fallback chain
  (512×512 'inside' fit, quality 80), matching itsliaaa exactly. The
  existing WhiskeySockets-PR-based shell functions
  (`buildStickerPackProto`, `generateStickerPackId`,
  `STICKER_PACK_MESSAGE_TYPE`) are unchanged. Runtime-tested with a real
  PNG buffer — correctly converts to WebP.
- **`rich-response.ts`** — confirmed itsliaaa has none of this
  (`sendTable`/`sendCodeBlock`/etc. don't exist there at all). Re-verified
  all 9 innovatorssoft-sourced exports are present and were already
  deep-fixed in earlier sessions; nothing further to add.

## Follow-up (round 2)

- **`from-messages.ts` — `buildAdminInviteMessage`/`buildCallMessage`/
  `buildPaymentInviteMessage`** — these showed 0% match against
  innovatorssoft by function name because innovatorssoft has this logic
  **inline** in `generateWAMessageContent` (not as separate exported
  functions). Compared field-by-field against the real inline code: all
  match exactly, **except one default value** — `buildCallMessage`'s
  default title was `'Call'`, real innovatorssoft uses `'Call Creation'`.
  Fixed. Source comments updated to correctly credit innovatorssoft
  instead of the vague "messages.ts → X block".
- **`stickerpack.ts`** — kept the WhiskeySockets-PR-based shell functions
  (`buildStickerPackProto`, `generateStickerPackId`,
  `STICKER_PACK_MESSAGE_TYPE`) and `convertToWebP` as-is, and additionally
  ported itsliaaa/baileys's **complete** `prepareStickerPackMessage` as a
  distinct function — `prepareStickerPackMessageItsliaaa()` — kept
  side-by-side rather than merged in, since the two have different
  design choices (this fork's `buildStickerPackMessage` in
  `from-messages.ts` builds a raw proto object for the caller to send
  manually; itsliaaa's version does the full upload pipeline itself and
  returns a ready-to-send `StickerPackMessage`, plus supports optional
  media caching keyed by sticker URLs). End-to-end tested with a real PNG
  buffer through a mocked upload function — ZIP build, ID generation,
  and thumbnail generation all confirmed working.
- Also discovered and fixed: **`stickerpack.ts` itself was never wired
  into the addons barrel export** (`addons/index.ts`) — none of its
  exports (`buildStickerPackProto`, `generateStickerPackId`,
  `STICKER_PACK_MESSAGE_TYPE`, `convertToWebP`,
  `prepareStickerPackMessageItsliaaa`) were reachable via
  `import { ... } from '@queenanya/baileys'` before this fix.
- **`rich-response.ts`** — reconfirmed itsliaaa has none of this
  (`sendTable`, `sendCodeBlock`, etc. don't exist there). All 9
  innovatorssoft-sourced exports already present and verified in earlier
  sessions; nothing further needed.

## Known Gaps / Not Implemented

- `jid-plot.ts`, `message-scheduler.ts` — attribution comments reference
  innovatorssoft, but no matching function names could be found in either
  fork's source. Treat with caution; re-verify before relying on them.
- `uploadMediaToWhatsApp(buffer, type)` as a standalone importable
  function — this was never real. It was a placeholder callback name in a
  doc example (`sendLatexImage(expr, renderFn, uploadFn)`), not an actual
  export from any fork. The real underlying function is
  `getWAUploadToServer` in `Utils/messages-media.ts`, which is already
  present and — for newsletter media paths + thumbnail direct-paths — is
  ahead of real upstream, not behind it.
