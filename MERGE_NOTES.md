# Merge Notes — anya-bail 9.9.0-5 (final, corrected)

Base: F_final-9_9_0-5-anya-merged_1 (most complete addon set + verified clean tsc build).

## ⚠️ CORRECTION (this pass) — please read first

An earlier version of this merge incorrectly adopted a "newer" WAProto schema and
several dependency version bumps from anya-baileys-9_9_0-5, on the assumption that
higher version numbers meant "more up to date with real WhatsApp/WhiskeySockets."

That assumption was checked against the real sources this pass and found **wrong**:

- Fetched the actual `WhiskeySockets/Baileys` master branch (rc13, the real npm-published
  `@whiskeysockets/baileys@7.0.0-rc13`) and the auto-generated docs at baileys.wiki.
  The 14 "new" message types (GroupRootKeyShare, EventInviteMessage, SplitPaymentMessage,
  ConditionalRevealMessage, PaymentReminderMessage, etc.) **do not exist** in the real
  official Baileys protobuf schema. They were not real WhatsApp protocol additions —
  origin unclear, but not upstream.
- Fetched the real official `package.json` from `WhiskeySockets/Baileys` master. The
  "bumped" versions I'd adopted (`@cacheable/node-cache` 1.5.3, `lru-cache` 11.2.6,
  `p-queue` 9.1.0, `whatsapp-rust-bridge` 0.5.5, `ws` 8.19.0) **do not match** what's
  actually published. Real rc13 pins: `@cacheable/node-cache` ^1.4.0, `lru-cache` ^11.1.0,
  `p-queue` ^9.0.0, `whatsapp-rust-bridge` 0.5.4, `ws` ^8.13.0.

**Both have been reverted** to match the real, verified `@whiskeysockets/baileys@7.0.0-rc13`
values exactly (WAProto.proto restored to the original F_final version, which was
already correct; package.json dependency versions restored to official pins). The
`uuid` field patch (see below) was then re-applied on top of the _correct_ proto.

One exception: `long` (^5.3.2) is kept as an explicit dependency even though official
package.json doesn't list it directly — the source code (`generics.ts`, `chats.ts`,
`messages-recv.ts`) imports from `'long'` directly, so it needs to be an explicit dep
regardless of how upstream's own package.json handles it (they likely get it transitively
via protobufjs and never audited their own package.json for it).

Lesson: version numbers on unofficial forks are not a reliable signal of being
"more current" — always diff against the actual named upstream source, not just
against version strings.

## Changes made (verified against real sources)

1. **WAProto**: unchanged from F_final's original — confirmed to already match the
   real MessageKey shape and message set (verified via WhiskeySockets/Baileys master
   - baileys.wiki generated docs), plus the uuid field addition below.

2. **package.json dependencies**: match the real `@whiskeysockets/baileys@7.0.0-rc13`
   published package.json exactly, with `long` kept explicit for the reason above.
   `libsignal` stays on standard `^6.0.0` (see decision below).

3. **uuid field added to MessageKey** (custom feature, not upstream):
   - `WAProto.proto`: `optional string uuid = 5;` added to `message MessageKey`
   - `WAProto/index.js` + `index.d.ts`: hand-patched encode/decode/fromObject/toObject/
     prototype/oneOf accessor + type declarations for the new field
   - `src/Utils/generics.ts`: `generateKeyUuid(userUuid?)` already existed (from a prior
     session) but was dead code — never called, and the proto had no field for it
   - `src/Types/Message.ts`: added `uuid?: string` to `MinimalRelayOptions` (mirrors
     `messageId`)
   - `src/Utils/messages.ts` (`generateWAMessageFromContent`): wired in —
     `uuid: generateKeyUuid((content as { uuid?: string })?.uuid ?? options?.uuid)`
     Priority: `content.uuid` -> `options.uuid` -> generated default (15 chars).
     **The existing `id` field and its generation (`generateMessageIDV2()`) were left
     completely untouched.**

4. **status-posting.ts**: ported `makeStatusMentionsAddon` (status/story @mentions,
   resolves group participants automatically) from anya-baileys-9_9_0-5 — this is
   addon-layer code, unrelated to the protocol schema issue above, and still stands.
   Exported from the addons barrel (`index.ts`).

5. **rich-response.ts**: ported the unified-response capture registry —
   `captureUnifiedResponse`, `sendUnifiedResponse`, `clearCapturedResponses`,
   `getCapturedResponses` (+ `UnifiedResponseEntry` type). Also addon-layer, unaffected
   by the correction above. Exported from the addons barrel.

6. Removed `package-lock.json` / `yarn.lock` (now out of sync with the corrected
   dependency versions — regenerate with a fresh install). No `lib/` build output is
   included since the source changed after the correction; run `npm run build` fresh.

## Addons-list.txt cross-check (this pass)

The user uploaded a combined itsliaaa/baileys + innovatorssoft/Baileys feature
list (`addons-list.txt` — a merged/duplicated TOC+content document, with some
sections appearing as TOC links only and no body). Checked every concrete
function-level addon mentioned (`sock.X(...)` calls) against `src/addons/`:

- Already present and matching: `sendTable`, `sendList`, `sendCodeBlock`, `sendLatex`,
  `sendLatexImage`, `sendLatexInlineImage`, `sendRichMessage`, `captureUnifiedResponse`,
  `sendUnifiedResponse`, `sendStatusMentions`, `tokenizeCode`.
- Already present in **core** (not addons — stock Baileys Socket methods, unrelated
  to the addon layer): `clearMessage`, `resize`, `updatePanoramaProfilePicture`.
- **Added this pass**: `sendMarkdown` (in `rich-message.ts`) — was genuinely missing.
  Sends a markdown-formatted text message via the same Meta AI rich-message primitives
  as the rest of the file (headings, `==highlight==`, `_italics_`, `**bold**`).
- **Not found anywhere, low confidence it's real**: `copyNForward` — only appears as a
  commented-out suggestion line in the source document (`// await sock.copyNForward(...)`),
  never shown with an actual implementation or usage example. Not added — flag if you
  find a real spec for it.
- `MEX Notifications` and `Interactive Helpers` sections in the source document only
  exist as table-of-contents links with no body text anywhere in the file — could not
  verify what functions they'd require without the underlying README source.

## Decisions finalized

- **libsignal: staying on standard `^6.0.0`** (matches real official rc13 exactly).
  anya-9_9_0-5's swap to `@queenanya/libsignal@5.0.5` was checked against the npm
  registry — no trace of the package exists publicly. Not adopted.

## Still NOT done — needs your decision or local verification

- **Build/test not run.** No network access in this environment (`npm install` returns
  403 against the registry). Run `npm install && npm run build && npm test` locally
  before trusting this.
- **16 other overlapping addon files reviewed for exports, not deep-merged.** F_final's
  versions were confirmed larger/more developed in every case except status-posting and
  rich-response (both ported above). Some "missing" exports in other forks turned out
  to be internal helpers already inlined into F_final's public functions.
- **itsliaaa/baileys and innovatorssoft/Baileys were identified but not diffed in
  detail this pass** — itsliaaa's fork notably uses protobuf definitions from
  WPPConnect's `wa-proto` repo rather than WhiskeySockets' own, which is a different
  schema lineage; worth a dedicated comparison if you want their specific fixes
  (e.g. their newsletter media upload fix) ported in.
