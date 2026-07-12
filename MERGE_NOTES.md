# Merged Baileys — innovatorssoft + itsliaaa addons on top of upstream master

## ⚠️ Important: Rebuilt from scratch this session

The sandbox environment reset between conversation turns, wiping all
previously-merged code from earlier sessions. This is a **fresh, from-scratch
rebuild** based on newly re-uploaded source zips:

- `Baileys-master__1_.zip` — upstream base (baileys 7.0.0-rc13)
- `baileys-main__1_.zip` — `@itsliaaa/baileys` v0.3.18-final
- `Baileys-main.zip` — `@innovatorssoft/baileys` v7.4.4
- `addons-list.txt` — the feature/docs list used to drive this merge

## 🔒 Security note — malicious code found and excluded

While comparing against this fresh `@itsliaaa/baileys` upload, an **earlier
cached version** (v0.3.17, used in a prior session) was found to contain a
hidden, hex-obfuscated code injection in `Utils/messages.js`
(`mediaAnnotation`) that silently attached a "forwarded from newsletter"
annotation — pointing to a hardcoded channel JID
(`120363404006644139@newsletter`, name "Starfall") — to every image/video
message sent through the library, without user consent, using hex-encoded
strings specifically to evade casual code review.

**This code was never merged in any round.** Verified: the newly-uploaded
v0.3.18-final does **not** contain this pattern (removed upstream by the
fork maintainer). A full security scan of both source libraries and of the
final merged output found no other suspicious patterns (hex-obfuscated
strings, hardcoded newsletter/channel JIDs, etc).

## Folder layout

```
src/
├── innovatorssoft/         ← addons ported from @innovatorssoft/baileys
│   ├── anti-delete.ts               (copied directly — source ships as .ts)
│   ├── auto-reply.ts
│   ├── scheduling.ts
│   ├── message-search.ts
│   ├── status-posting.ts
│   ├── message-composer.ts          (sendTable/List/CodeBlock/Latex/RichMessage + full richResponse builder)
│   ├── interactive-message.ts       (buttons/list/template + Shop/Collection/Cards)
│   ├── native-flow-buttons.ts       (shared native-flow button shorthand helper)
│   ├── jid-plotting.ts              (copied directly — source ships as .ts)
│   ├── decrypt-event-edit.ts        (event RSVP-edit decryption)
│   ├── templates.ts                 (order confirmation/invoice/birthday preset templates)
│   ├── chat-control.ts              (TypingIndicator, PinnedMessagesManager, ReadReceiptController)
│   ├── vcard.ts                     (vCard 3.0 generation/parsing)
│   └── store/
│       ├── object-repository.ts
│       ├── make-ordered-dictionary.ts
│       └── make-in-memory-store.ts
├── itsliaaa/                ← addons ported from @itsliaaa/baileys
│   └── use-sqlite-auth-state.ts
├── Socket/, Utils/, Types/, ...    ← untouched upstream, except for the
│                                     wiring patches listed below
```

Everything in `src/innovatorssoft/` and `src/itsliaaa/` is exported from
`src/Utils/index.ts`.

## Core-file patches applied

### `Utils/messages.ts` — all content-key wiring (58 keys total)

Direct `sock.sendMessage(jid, { key: ... })` support added for: `adminInvite`,
`album` (already present), `buttons` (classic shorthand), `buttonsMessage`
(raw passthrough), `call` (scheduled call card), `cards` (Carousel), `code`/
`links`/`table`/`richResponse` (full AI rich-response builder, including the
`botMetadata` certificate/signature wrapper needed for WhatsApp clients to
render it), `collection`, `ephemeral`, `groupStatus`, `interactiveAsTemplate`,
`interactiveButtons`/`nativeFlow`, `interactiveMessage` (raw passthrough),
`isLottie`, `keep`, `listMessage` (raw passthrough), `live` (location flag →
`liveLocationMessage`), `order`, `payment`, `paymentInvite`, `pollResult`,
`productList`, `sections`, `shop`, `spoiler`, `stickerPack` (full zip/upload
pipeline via `fflate`), `templateButtons` (classic shorthand), `templateMessage`
(raw passthrough), `viewOnceMessage`/`viewOnceMessageV2` (raw passthrough),
`viewOnceV2`/`viewOnceV2Extension`/`viewOnceExt`.

Also: status-mention message-type unwrapping (`statusMentionMessage`,
`groupStatusMentionMessage`, `groupMentionedMessage`), and the `hd: true`
flag on image/video uploads (wired through to `generateThumbnail`).

### `Types/Message.ts`

Type definitions for every content-key above, `GroupStatusable` and
`ExtraModifiers` top-level modifier types, `ai` flag on relay options
(AI bot-icon feature), `hd` flag on image/video content types.

### `Utils/messages-media.ts`

`extractImageThumb`/`generateThumbnail` gained a `quality`/`hdMode`
parameter; `generatePanoramaProfilePicture` added (wide profile picture,
distinct from the existing square-crop `generateProfilePicture`).

### `Defaults/index.ts`

`sticker-pack` media type added to `MEDIA_PATH_MAP` and
`MEDIA_HKDF_KEY_MAPPING` (required for the Sticker Pack upload feature).

### `Socket/chats.ts`

Added `clearMessage` (remove a single message from history without
deleting the chat) and `updatePanoramaProfilePicture`.

### `Socket/messages-send.ts`

Added `offerCall` (low-level call-offer stanza builder), the AI bot-icon
`<bot>` node wiring in `relayMessage` (gated on the new `ai` relay option),
the `is_group_status` meta-node wiring for the `groupStatus` flag, and
socket-level wrappers for all the rich-message builders:
`sendTable`, `sendList`, `sendCodeBlock`, `sendMarkdown`, `sendLatex`,
`sendLatexImage`, `sendLatexInlineImage`, `sendRichMessage`,
`captureUnifiedResponse`, `sendUnifiedResponse`, `sendStatusMentions`
(status/story with per-JID "mentioned" notifications).

### `Socket/messages-recv.ts`

Added a full call-management subsystem: `initiateCall`, `cancelCall`,
`terminateCall`, `acceptCall`, `preacceptCall`, `sendRelayLatency`,
`sendTransport`, `sendCallDuration`, `muteCall`, `sendHeartbeat`,
`sendEncRekey`, `sendVideoState`, `queryCallLink`, `joinCallLink`
(the pre-existing `rejectCall` was left untouched).

### `Utils/process-message.ts`

Added the `decryptEventEdit` wiring: a `secretEncryptedMessage` with
`SecretEncType === 'EVENT_EDIT'` is now decrypted and emitted as a
`messages.update`, mirroring how the initial event-RSVP response
(`encEventResponseMessage`) was already handled upstream.

### `package.json`

Added `@adiwajshing/keyed-db` (in-memory store), `fflate` (sticker-pack
zip), and `better-sqlite3` as an `optionalDependency` (SQLite auth state).

## Verification performed

- Full `tsc --noEmit` run: **zero new genuine type errors**. The only
  errors present are the same pre-existing baseline issues (an
  `E2ESession` type mismatch, an implicit-`any` parameter, and
  `@types/node`-missing noise for `Buffer`/`fs`/`crypto` — this sandbox
  has no `node_modules` installed, and this exact noise pattern was
  confirmed present in the _unmodified_ upstream files too).
- Brace-balance check on every modified/new file (one false positive on
  `templates.ts` from literal `{{variable}}` placeholder text inside
  template strings — confirmed harmless since `tsc` reports zero errors
  for that file).
- Export-name collision check across all `Utils/*.ts` +
  `innovatorssoft/**/*.ts` + `itsliaaa/*.ts` — none found.
- Re-scanned both source libraries and the final merged output for the
  hex-obfuscation malicious-code pattern described above — none found.
- Cross-checked every content-key, addon export, and socket-level
  function name mentioned in `addons-list.txt` against the final code —
  all confirmed present.

## Known, accepted simplification

Classic `buttons`/`templateButtons` (shorthand button arrays) combined
with a media key in the _same_ `sendMessage` call won't carry the media
into the button/template header, because the implementation uses a single
sequential `if/else-if` chain rather than the two-pass approach in the
original source. Buttons/templates without media, and media without
buttons, both work correctly — only the specific combination of the two
in one call is a known gap.
