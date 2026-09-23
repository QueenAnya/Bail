# Queen-Anya final merge audit

This ZIP combines the previously prepared qb2_35 changes:
- carousel `<biz>` compatibility and regression coverage
- iOS/native-flow compatibility hardening
- self-contained button-sender implementation (no @ryuu-reinzz/button-helper runtime dependency)
- WhiskeySockets master parity/hardening changes already prepared
- InnovatorsSoft old->new ZIP functional diff already merged
- standalone `sendGroupStatus()` addon while preserving `sock.sendMessage(..., { groupStatus: true })`

## InnovatorsSoft source placement
Feature-level additions are kept under `src/addons` where practical. The local MathJax implementation was moved from `src/Utils/mathjax.ts` to `src/addons/mathjax.ts` and its imports were updated.

Some InnovatorsSoft changes are protocol/core integration by nature (username resolution in Socket/WAUSync, LID/PN mapping, raw-message handling, etc.); those remain in their required core files because moving them wholesale into an addon would disable the actual integration.

## WAProto
The temporary `WAProto/upstream-b46/` directory has been removed. Its generated `.proto`, `.js`, and `.d.ts` files are now placed directly under `WAProto/`. `WAProto/index.js` now imports `./merge.js`.
