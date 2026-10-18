# Anya-Baileys Interactive Messaging Audit

## Scope
Audited the supplied `Anya-baileys-master(5).zip` source tree for buttons, Native Flow, cards/carousel, list sections, Galaxy Flow and the actual `sendMessage` relay path. This is a source-level audit, not a live WhatsApp delivery test.

## Existing implementation confirmed
- `src/Utils/messages.ts`: `generateWAMessageContent` already handles legacy `buttons`, `templateButtons`, plain list `sections`, `nativeFlow`, `interactiveButtons`, raw interactive payloads, and `cards`/carousel. It prepares media headers and per-card Native Flow payloads.
- `src/addons/button-sender.ts`: exports `sendInteractiveMessage` and `sendButtons`, normalizes legacy/native button shapes, validates complex flow payloads (including `galaxy_message`), and relays with required binary nodes.
- `src/addons/native-flow-interactive.ts` and `src/addons/interactive-message.ts`: implement Native Flow conversion, `single_select` sections, offer/option params and generator APIs.
- `src/WABinary/generic-utils.ts` plus `src/Socket/messages-send.ts`: automatic `<biz>` node injection is integrated into `relayMessage`; carousel detection and first-card Native Flow fallback are present.
- `src/addons/index.ts` and `src/index.ts`: add-on exports are wired through the package root. The simpler Utils generator variants are deliberately exported with `Basic` suffixes to avoid name collisions.
- Existing regression tests cover interactive-only payload fallback and carousel biz-node detection.

## Defect fixed in this update
`src/addons/button-sender.ts` already accepts and validates `galaxy_message`, and `src/ported/native-flow.ts` recognizes it. However, `src/WABinary/generic-utils.ts` did not include `galaxy_message` in `FLOWS_MAP`. Consequently, the automatic `<biz>` node builder could treat a Galaxy Flow as generic `mixed` instead of naming the native flow specifically. Added `galaxy_message: true` and a regression test asserting the generated `<native_flow>` node has `name="galaxy_message"` and `v="2"`.

## Important API distinction
- Top-level `{ sections: [...] }` builds an ordinary WhatsApp `ListMessage`.
- Native Flow single-select sections must be supplied as a Native Flow button, e.g. `{ name: 'single_select', buttonParamsJson: JSON.stringify({ title, sections }) }`, or through the supported shorthand `{ text, sections }` inside `nativeFlow` / `interactiveButtons`.
- `cards` is the carousel content shape; each card may carry its own `buttons` or `nativeFlow`.
- `sendInteractiveMessage(sock, jid, content)` is an explicit low-level helper; normal `{ nativeFlow }`, `{ interactiveButtons }`, `{ sections }`, and `{ cards }` payloads also go through the core `sock.sendMessage` message generator. They are not dependent on a custom `conn.client` wrapper.

## Validation status
- Static source inspection completed.
- Automated regression test added.
- Tests/build were not run in this environment because this extracted ZIP does not include installed dependencies (`node_modules`). No claim of live WhatsApp/iOS/Android verification is made.
