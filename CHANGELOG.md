# 3.0.0-1 (2026-10-17)

### Fixed

* **MessageBuilder:** `Button.addButton` normalizes `display_text` aliases (`text`, `displayText`, `displaytext`, `buttonText`) and leaves serialized `buttonParamsJson` strings untouched.
* **MessageBuilder:** `Button.addButton` keeps array params as a JSON array instead of collapsing them.
* **MessageBuilder:** `ButtonV2.addRawButton` normalizes label aliases; a string `buttonText` becomes `{ displayText }`.
* **MessageBuilder:** `src/ported/v2.ts` imports `AIRichCarousel` (plain `Carousel` is not exported from `MessageBuilder/index.ts`), which fixes the `tsc` errors.

### Added

* **MessageBuilder:** `ButtonV2.addButton` and `Button.addButton` accept an object form; `Button.addButton` rejects a missing button name.

### Changed

* `src/ported/message-builder/` is kept for now as a deprecated, unused duplicate (synced with `src/ported/MessageBuilder/`, not exported); `src/ported/MessageBuilder/` is the exported one. Delete the old folder when it is no longer needed.
