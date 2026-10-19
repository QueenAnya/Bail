# 3.0.0 (2026-10-19)

### Added

* **Elaina sync:** WhatsApp Web `2.3000.1049978204`, updated WAProto, retryable-nack resend with `outboundResendCache`, photo polls (`getPollOptionHash`), `cancelPairingCode` and `pairingCodeTimeoutMs`, `buildMemberLabelMessage`, `GroupHistoryToggleMode`, username helpers, and the extra content keys `richLink`, `song`, `socialPreview`, `statusLinkPreview`, `groupMentions`, `forwardedNewsletter`.
* **Extras (`src/Extras`):** `group-metadata-cache`, `ttl-cache`, `sender-key-memory`, `optional-media`, `native-flow`, `html-app`, `html-multiplayer`, `link-preview-metadata`, `voice-recognition`, `messages-helpers`, and the `MessageBuilder` / AIRich builders.
* **MessageBuilder:** `ButtonV2.addButton` and `Button.addButton` accept an object form; `Button.addButton` rejects a missing button name.
* **Lint:** `eslint.config.mts` lists `**/*.ts`, so `yarn lint` really checks TypeScript files.

### Fixed

* **MessageBuilder:** `Button.addButton` normalizes `display_text` aliases (`text`, `displayText`, `displaytext`, `buttonText`), leaves serialized `buttonParamsJson` strings untouched and keeps array params as a JSON array.
* **MessageBuilder:** `ButtonV2.addRawButton` normalizes label aliases; a string `buttonText` becomes `{ displayText }`.
* **MessageBuilder:** `src/Extras/v2.ts` imports `AIRichCarousel` (plain `Carousel` is not exported from `MessageBuilder/index.ts`), which fixes the `tsc` errors.
* **Messages:** `groupMentions` also works when the message has no `contextInfo` yet.
* **Messages:** `pollAddOption` / `eventInvite` find `PollAddOptionMessage` / `EventInviteMessage` as flat `proto.*` classes.

### Changed

* `src/Extras/message-builder/` is kept for now as a deprecated, unused duplicate (synced with `src/Extras/MessageBuilder/`, not exported). Delete it when it is no longer needed.

