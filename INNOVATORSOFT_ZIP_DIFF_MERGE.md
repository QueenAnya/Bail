# innovatorssoft zip2 -> zip1 merge audit

Compared old `zip2(1)` against new `zip1(1)` and checked the functional deltas against qb2_35.

## Merged
- WhatsApp client revision updated to `2.3000.1047543106` in source fallback/version metadata and WAProto version comment.
- Local MathJax LaTeX rendering added (`src/Utils/mathjax.ts`) using `mathjax-full` + existing optional `sharp`; the old remote Codecogs renderer was replaced by the local renderer.
- Username normalization/validation/target helpers added to the existing username utility without removing its username-key helpers.
- Username resolution error/result/cache types added and exported.
- Username resolution cache and `resolveUsername`, `resolveUsernames`, `invalidateUsername`, `refreshUsername` added to the username socket.
- `usernameCache` socket config added.
- `onWhatsApp` now accepts mixed phone/JID/LID/username target inputs while preserving the existing phone/LID implementation.
- Username USync request element + error-safe parsing added.
- USync result parsing now preserves returned LID/PN/error attributes where available.
- Group metadata now persists discovered LID↔PN mappings.
- Signal device extraction now skips missing/invalid JIDs instead of blindly destructuring `jidDecode`.
- Strict `raw: true` proto-message mode added while preserving the existing `{ raw: proto.IMessage }` API.
- Three GitHub workflow Node versions updated from 20.x to 24.x.
- Changed generated WAProto modules from the new snapshot are included under `WAProto/upstream-b46/` and merged only for missing top-level proto types at runtime; existing qb2 proto types are not overwritten.

## Intentionally skipped because already present / richer in qb2_35
- Existing username ingestion, LID/PN mapping, group metadata fields and username socket management.
- Existing contact USync username handling.
- Existing LID USync participant handling (the upstream snapshot's removal of that element was not blindly applied because qb2 already relies on it).
- Existing `sharp` dependency (`^0.34.4`) was retained; only `mathjax-full` was added.
- Documentation/example-only changes were not copied over the customized qb2 documentation/examples.

## Validation
- ZIP/source tree integrity checked.
- TypeScript was invoked for static checking; full dependency-backed build/tests could not run because `node_modules` is not installed in the working environment.
