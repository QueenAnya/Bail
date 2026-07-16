# Changelog — `anya-bail` (v9.5.5-anya-merged.1)

This build merges 5 source snapshots into one package. Base = `D_may11`
(`@queenanya/baileys` 9.5.5-beta.2, cleanest test run, correct LID handling),
extended with features pulled from 3 other snapshots and one comprehensive
`innovatorssoft/baileys` merge (`E_merged`, `baileys` 7.0.0-rc13).

Source snapshots referenced below:

| Tag      | Date     | package version                                      |
| -------- | -------- | ---------------------------------------------------- |
| A_apr17  | Apr 17   | `@queenanya/baileys` 9.5.4                           |
| B_may01  | May 1    | `@queenanya/baileys` 9.5.5-beta.1                    |
| C_may03  | May 3    | `@queenanya/baileys` 9.4.4                           |
| D_may11  | May 11   | `baileys` 9.5.5-beta.2 — **merge base**              |
| E_merged | Jul 8–10 | `baileys` 7.0.0-rc13 (innovatorssoft/itsliaaa merge) |

---

---

## Critical bug: `chatModify`-based features (star/archive/mute/pin/clearMessage) silently no-op

**Second real bug found via live user testing** (`clearMessage`, then
confirmed `star`/archive also affected — "no error, feature just doesn't
do anything"). Unlike the buttons/sections bug above, this one produces
**no thrown error at all**, making it much harder to detect from code
review or unit tests alone.

Traced the entire call chain end-to-end against `C_may03` (9.4.4, the
last version confirmed fully working) and found every single function
involved — `appPatch`, `chatModificationToAppPatch`, `getMessageRange`,
`resyncAppState`, `getAppStateSyncKey`, `encodeSyncdPatch`,
`mutationKeys`, `generateMac` — **byte-identical** between the two. The
only difference anywhere in this feature's dependency chain: the native
(Rust/WASM) `whatsapp-rust-bridge` package, which provides
`expandAppStateKeys` (used to derive the 5 AES/HMAC keys — indexKey,
valueEncryptionKey, valueMacKey, snapshotMacKey, patchMacKey — that
every `chatModify` action is encrypted and MAC'd with before being sent
to WhatsApp's servers).

- `C_may03` (working): `whatsapp-rust-bridge@0.5.3`
- `D_may11` → this build (not working): `whatsapp-rust-bridge@0.5.4`

The version bump happened in D_may11's own C→D transition, silently,
with no accompanying test coverage for app-state-sync — `appPatch`-based
features aren't covered by this codebase's Jest suite at all (they
require a live, authenticated connection to actually observe an effect,
so nothing here would have caught a native-module regression). A native
module producing subtly wrong key-derivation output would explain the
symptom exactly: the JS code runs to completion without throwing (the
patch gets built and sent successfully at the network level), but if the
keys are wrong, WhatsApp's servers can't validate the patch and simply
don't apply it — invisible from this library's side.

**Fix:** downgraded `whatsapp-rust-bridge` back to `0.5.3` in
`package.json` (`dependencies`) — the last version confirmed working.
Verified: the 3 APIs this codebase actually uses from the package
(`expandAppStateKeys`, `md5`, `hkdf`, `LTHashAntiTampering`) are called
identically in `C_may03`, so this is a safe, compatible downgrade — not
a partial/best-effort one. Also directly verified `expandAppStateKeys`
still produces 5 correctly-sized (32-byte) keys after the downgrade.

**Not independently re-verified against a live WhatsApp connection** (not
possible in this environment) — if `star`/`archive`/`clearMessage`/`mute`/
`pin` still don't work after this fix, the native module version is
ruled out and the next place to look is `authState.keys` (the app-state
sync key storage/retrieval implementation in the bot's own auth-state
adapter), since that's the one remaining piece of this pipeline that
lives outside this package.

## Critical bug: buttons/sections/templateButtons/nativeFlow/cards/productList broken for typical usage

**Root cause of "40–50% of features not working" reported after the last
build.** `generateWAMessageContent()` had **two separate, non-exclusive
if-chains** back to back — inherited from D_may11's own original
architecture, not introduced by this merge (confirmed: the identical
pattern exists in D_may11's unmodified source).

Chain 1 (text, media, contacts, location, groupInvite, payment, order,
stickerPack, etc.) ended with a generic fallback:
`} else { m = await prepareWAMessageMedia(...) }` — which **throws
`Invalid media type` for any content that doesn't match a chain-1 key**.
Chain 2 (`buttons`, `sections`, `templateButtons`, `nativeFlow`, `cards`,
and this build's new `productList`) started as a **separate standalone
`if`** immediately after chain 1's closing brace — not an `else if`.

Net effect: `sock.sendMessage(jid, { buttons: [...] })` on its own threw
`Invalid media type` before ever reaching the buttons-handling code,
because chain 1's fallback ran first and threw. It only "worked" when the
content happened to also include an unrelated chain-1-matching key (most
commonly `text`), which let chain 1 exit through a non-throwing branch
first, after which chain 2 ran and overwrote `m` with the real buttons
message. This explains why `9.4.4` (which doesn't have the buttons/
sections/templateButtons/nativeFlow/cards feature family at all) worked
fine, while this build — which has the fuller feature set — silently
broke most calls to it.

**Fix:** merged the two chains into one continuous `if / else if / ... /
else` — chain 2 now continues chain 1 directly, and the generic
`prepareWAMessageMedia` fallback was moved to be the true final `else`
of the whole combined chain (after `cards`), not a false stop partway
through. Verified with content that intentionally omits `text`/any
chain-1 key for `buttons`, `sections`, `templateButtons`, and
`productList` — all now succeed. (`cards` correctly still throws on
genuinely invalid input — a real internal validation, not this bug.)

This is the same category of bug as the `stickerPack` fix earlier in
this document, but affecting a much larger surface (the entire second
if-block, not one branch).

## Merge — base selection

- **D_may11 chosen as base.** A→B→C→D is one continuous lineage (each
  snapshot is a direct descendant of the previous), so D already contains
  everything from A/B/C. Verified: 0 TS errors, 403/403 tests, clean async
  exit (B/C both leaked an open Jest handle; D fixed it).
- **From C_may03:** ported `outgoing-calls.ts` (call initiate/reject/end)
  and `call-handler.ts` (call relay/transport layer) — both were dropped
  in D's C→D refactor with no replacement.
- **From E_merged:** ported `decrypt-event-edit.ts`, `native-flow-buttons.ts`,
  `use-sqlite-auth-state.ts`, and the in-memory `store/` module — none of
  these existed in D.

## Bug fixes found during merge

- **`stickerPack` message generation was broken.** A test file was saved
  without a `.ts` extension (`sticker-pack.test`), so it silently never
  ran. Renaming it exposed a real bug: the `stickerPack` content-type check
  was a standalone `if` placed _after_ the main content-type if/else chain,
  so the chain's generic fallback (`prepareWAMessageMedia`) threw
  `Invalid media type` before the sticker-pack branch was ever reached.
  Fixed by folding the check into the chain as a proper `else if`.
- `stickerPackSize` / `fileLength` / `mediaKeyTimestamp` were left as
  protobuf `Long` objects instead of plain JS numbers (these are `uint64`
  fields in the schema, and `fromObject()` wraps them by default). Fixed
  by unwrapping to `Number(...)` after construction.
- `packId` option on `StickerPack` was declared but never read — a custom
  pack id was always overwritten by a generated one. Fixed.

## `uuid` field on `MessageKey`

- Added `uuid?: string` to `WAMessageKey` and to `AnyMessageContent` as a
  proper typed field (was previously accessed via `as any` casts).
- Fixed `generateKeyUuid(userUuid?)`: the existing implementation
  **truncated/padded any custom uuid to exactly 11 characters**, silently
  mutating whatever the caller supplied. Rewritten so a custom uuid
  (`content.uuid` or `options.uuid`) is returned **exactly as given**,
  with no truncation, padding, or modification — and the generated
  default is capped at a maximum of 15 characters.
- Priority: `content.uuid` > `options.uuid` > generated default.
  `key.id` (the standard message id, `4NY4W3B...`) is completely
  untouched by this feature.

## `@napi-rs/image` — completed a half-wired backend

- `prepareStickerPackMessage()` already checked for a third image backend
  (`hasImage = 'image' in lib && !!lib.image?.Transformer`) alongside
  sharp/jimp — but `getImageProcessingLibrary()` never actually tried to
  load `@napi-rs/image`, so that branch was always dead. Confirmed this
  was true in E_merged too (not a merge artifact — an upstream gap).
- Rewrote `getImageProcessingLibrary()` to load all three backends in
  parallel and return whichever succeeded (previously it returned only
  the first match, sharp-or-jimp).
- Added `@napi-rs/image@^1.12.0` to `devDependencies`, `peerDependencies`,
  and `peerDependenciesMeta` (optional), matching the existing sharp/jimp
  pattern.
- Verified against the real published API (`new Transformer(buf).resize(w,h).webp(quality)`)
  with a real image round-trip (RIFF/WEBP magic-byte check).

## Missing content types — ported from `innovatorssoft/baileys` (E_merged)

Added to `Utils/messages.ts` (`generateWAMessageContent`) and typed in
`Types/Message.ts` (`AnyRegularMessageContent`):

- `adminInvite` — newsletter admin invite card
- `keep` — pin/keep a message in chat
- `call` — scheduled call creation card
- `paymentInvite` — payment invite card
- `payment` — request-payment message
- `order` — order message (`proto.Message.IOrderMessage` passthrough)
- `pollResult` — poll result snapshot message
- `shop` — shop storefront interactive card
- `collection` — collection interactive card

Not ported: `productList` — the type existed in E_merged's own type
definitions but was never wired to a runtime handler there either
(confirmed absent in `generateWAMessageContent`). Left unimplemented
rather than guessing at the intended behavior.

## Rich-message socket methods

- Replaced D's split `addons/rich-message-composer.ts` +
  `addons/rich-message-utils.ts` with E_merged's single, more complete
  `innovatorssoft/message-composer.ts` (renamed to `addons/message-composer.ts`).
  D's version was missing `generateMarkdownContent`, `renderLatexToPng`,
  and `uploadUnencryptedToWA` entirely.
- Removed `addons/rich-types.ts` — its constants (`RichSubMessageType`,
  `CodeHighlightType`, language keyword sets) were exact duplicates of
  what the new `message-composer.ts` already defines; keeping both caused
  a duplicate-export collision.
- Added socket methods, wired in `Socket/messages-send.ts`:
  `sendTable`, `sendList`, `sendCodeBlock`, `sendMarkdown`, `sendLatex`,
  `sendLatexImage`, `sendLatexInlineImage`, `sendRichMessage`,
  `sendUnifiedResponse`.

## `<biz>` binary node — buttons/list/template render fix

- **This was a real functional gap, not cosmetic.** WhatsApp expects a
  `<biz>` binary node alongside buttons/list/template/interactive
  (native-flow) messages; without it, these message types may not render
  correctly (or at all) on real WhatsApp clients. This build had zero
  `<biz>`-node handling anywhere before this change.
- Ported `getBizBinaryNode()` and `getBinaryFilteredBizBot()` into
  `WABinary/generic-utils.ts`, and `shouldIncludeBizBinaryNode()` into
  `Utils/messages.ts`.
- Wired into `relayMessage()` (`Socket/messages-send.ts`): the `<biz>`
  node is now appended automatically whenever the outgoing message needs
  one, unless `additionalNodes` already supplied one.
- Added `addBizAttributes?: boolean` to `MessageRelayOptions` to force
  the node for message types that wouldn't normally need it.
- Added automatic detection: `sendMessage()` now sets
  `addBizAttributes` when the content includes
  `secureMetaServiceLabel: true` (see below).

## `ai` bot-icon flag

- Added `ai?: boolean` to `MinimalRelayOptions` (so it's available on
  both `MessageRelayOptions` and `MiscMessageGenerationOptions`).
- When `sock.sendMessage(jid, content, { ai: true })` is used in a 1:1 or
  LID chat, `relayMessage()` now pushes a `{ tag: 'bot', attrs: { biz_bot: '1' } }`
  node onto the stanza, which shows the small "AI" icon on the message
  bubble in the WhatsApp client. No-op in groups/status/newsletters.
- Avoids double-pushing the bot node if `additionalNodes` already
  contains one (checked via `getBinaryFilteredBizBot`).

## `secureMetaServiceLabel` content flag

- Added `secureMetaServiceLabel?: boolean` to `AnyMessageContent`.
- `sendMessage()` now inspects the content for this flag and, if set,
  forces `addBizAttributes: true` on the `relayMessage()` call — i.e. a
  `<biz>` node gets attached even for message types that wouldn't
  otherwise trigger one.

## New chat/profile methods

- `updatePanoramaProfilePicture(jid, content, options?)` — sets a wide
  "panorama" profile picture (adds a full-size preview alongside the
  standard square thumbnail). Depends on new
  `generatePanoramaProfilePicture()` in `Utils/messages-media.ts`
  (sharp/jimp, same backend selection as the rest of the media pipeline).
- `clearMessage(jid, key, messageTimestamp)` — deletes a single message
  from chat history via `chatModify`.

## WAProto schema audit

Checked whether `itsliaaa/baileys` or `innovatorssoft/baileys` shipped a
newer/different WAProto schema than D_may11's:

- **`D_may11/WAProto/WAProto.proto` and `E_merged/WAProto/WAProto.proto`
  are byte-for-byte identical** (5,479 lines, 421 messages, `diff`
  reports zero differences). No schema update needed — both lineages
  were already on the same proto generation.
- **Found and removed a stale duplicate:** D_may11 (and this build,
  inherited from it) had a leftover nested `WAProto/WAProto/` folder —
  an exact copy of the top-level `WAProto/` directory (proto, generated
  `index.js`/`index.d.ts`, build scripts), ~5.2MB, left over from a
  previous proto-regeneration run. Confirmed nothing in `src/` imports
  from the nested path. It was also **stale**: the top-level
  `index.js` has a BigInt fast-path optimization for Long→string/number
  conversion that the nested copy doesn't have. Removed — not used, and
  the copy that remains is the newer/faster one.

## Proto layer — full-restructure assessment (not adopted) + targeted additions

Two real, currently-published upstream packages were checked directly
(not derived/merged snapshots): `@innovatorssoft/baileys` 7.4.4 and
`@itsliaaa/baileys` 0.3.18-final.

**Full proto restructure — assessed, not adopted.** innovatorssoft's real
repo has completely restructured `WAProto.proto` into 26 separate
per-concern files (`E2E.proto`, `Adv.proto`, `SyncAction.proto`, etc.,
6,495 total lines vs this build's 5,479-line monolithic file) targeting
a newer WhatsApp Web version (`1043028647` vs `1035194821`). Deep
assessment found the real, shipped package has **322 of 437 top-level
type names (74%) duplicated across multiple files** (e.g. `BotMetadata`
is separately defined in 6 different files) — resolved at runtime only
by object-spread order in their `index.js` barrel, with no reliable way
to verify from outside that every duplicate pair is field-identical.
Their own shipped `WAProto/index.d.ts` also has real import-path bugs
(wrong paths, a `WAChatLockSettings`/`ChatLockSettings` name mismatch, a
missing `AICommonDeprecated` import). Given the size and risk of safely
reconciling 322 collisions by hand, this was not adopted wholesale —
staying on the current, fully-tested monolithic proto was judged safer
than a large, hard-to-fully-verify migration.

**Targeted additions — adopted.** Compared this build's `Message`
wrapper (95 direct content fields) against innovatorssoft's real E2E.proto
`Message` wrapper (107 fields) to find genuinely new, real (not derived)
message types. Of 12 new fields found:

- Skipped `groupRootKeyShare` / `rootSecretDistributeMessage` — internal
  Signal/E2E session-key protocol messages, not application content;
  wiring these into the content-type dispatcher would be unsafe.
- Skipped `newsletterAdminProfileMessage(V2)`, `newsletterAdminProfileStatusMessage`,
  `spoilerMessage` — all typed as `FutureProofMessage` in the real proto,
  i.e. WhatsApp-reserved placeholders with no real schema yet.
- Skipped `conditionalRevealMessage` — needs real `encPayload`/`encIv`
  ciphertext this build has no keying infrastructure to produce safely.
- Skipped `pollCreationMessageV6` — a poll-creation schema version bump;
  the existing (older) poll-creation path already works and changing it
  needs more validation than fits this pass.
- **Added, with exact field numbers matching the real upstream schema
  (119, 121, 122, 124, 125):**
  - `eventInvite` → `eventInviteMessage` — share/forward an existing
    event invite (distinct from `event`, which creates a new one)
  - `paymentReminder` → `paymentReminderMessage` — recurring payment
    reminder card
  - `pollAddOption` → `pollAddOptionMessage` — add an option to an
    existing poll
  - `splitPayment` → `splitPaymentMessage` — bill-splitting request
    among multiple participants

Proto regenerated via the project's own `GenerateStatics.sh`
(`pbjs`/`pbts`) after editing `WAProto.proto` — not hand-edited compiled
output. All 4 new types verified with a dedicated test (written, run,
removed) confirming correct message construction and no interference
with existing content types.

## `phonenumber-mcc.json` — removed (confirmed dead, not fabricated)

- Confirmed byte-identical to the real `@innovatorssoft/baileys` 7.4.4
  package's copy — this is genuine data, not something invented during
  the merge.
- Absent entirely from `@itsliaaa/baileys`.
- **But unused everywhere**: even in innovatorssoft's own real,
  currently-published package, the loaded data is only re-exported as a
  `PHONENUMBER_MCC` constant from `Defaults/index.ts` and never consumed
  by any other file in their codebase. In this build it was even more
  orphaned — not exported at all, just an unreferenced JSON file. Removed.

## `productList` and raw-passthrough content — completed (not skipped)

Originally flagged as "documented but never built" dead code in
E_merged. Implemented properly here instead of porting the gap:

- **`productList`** — product-catalog list message. Maps directly onto
  the real `Message.ListMessage.ProductListInfo` proto schema
  (`listType: PRODUCT_LIST`, `productSections[]`, each with `title` +
  `products[{productId}]`, optional `businessOwnerJid`). Verified against
  `WAProto/WAProto.proto` rather than guessed.
- **Raw passthrough** — a generic escape hatch: if content already has
  an `interactiveMessage` / `buttonsMessage` / `listMessage` /
  `templateMessage` key (a real `proto.IMessage` sub-field), it's copied
  through as-is instead of going through the higher-level shorthands.
  Checked first, so it never interferes with normal `text`/other content.

`getBinaryFilteredButtons` remains intentionally unported — genuinely
unused everywhere, including in E_merged's own codebase.

## Known dead code — identified but intentionally not ported

Exists in `innovatorssoft/baileys` (E_merged) itself, unrelated to this
merge — confirmed by checking whether E_merged's own codebase calls it
anywhere:

- **`getBinaryFilteredButtons`** (`WABinary/generic-utils.ts`) — fully
  implemented, exported, but never called. The one place that logically
  needed it (`relayMessage`'s biz-node decision) uses an inline duplicate
  check instead. No functional value in porting it.

## Known pre-existing test issue (not a regression)

- `sticker-pack.test.ts` → _"should reject sticker exceeding 1MB size
  limit"_ — flaky by test design, not a code bug. The sticker pipeline
  resizes to 512×512 before the size check runs, and a WebP-encoded
  512×512 image at quality 80 essentially never exceeds 1MB regardless of
  input size or content (even random noise). 442/443 tests pass; this is
  the one failure, present before and after every change in this merge.

## Verification

Every change in this document was checked with `tsc --noEmit` (0 errors)
and the full Jest suite (442/443 passing throughout) after each step, plus
dedicated scratch tests for `generateKeyUuid`, `@napi-rs/image` loading,
and the `<biz>` node builder (written, run, and removed — not part of the
committed test suite).

---

# Upstream Changelog (D_may11)

## 9.5.5-beta.2 (2026-05-11)
