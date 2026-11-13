# Internals

A map of the folders you will end up in when something goes wrong below the socket API. None of this is required
reading to *use* the library — it is here so a bug report can name the file it belongs to.

## `src/Socket`

One file per protocol area; `index.ts` assembles them into the socket you get back from `makeWASocket`.

| File | Responsibility |
|---|---|
| `socket.ts` | the connection itself: websocket, handshake, keep-alive, QR/pairing |
| `messages-send.ts` | `sendMessage` and every relay it builds |
| `messages-recv.ts` | decoding incoming stanzas, decrypt, receipts, retries |
| `groups.ts` | `group*` methods — participants, invites, settings |
| `communities.ts` | `community*` methods |
| `chats.ts` | chat-level operations (archive, pin, mute, read) |
| `business.ts` / `business-mex.ts` | catalog, profile, quick replies over the `w:mex` endpoint |
| `newsletter.ts` | the 55 channel methods |
| `mex.ts` | the generic `w:mex` query helper the other modules use |
| `username.ts` | the username (handle) API |
| `Client/websocket.ts` | the socket transport, reconnect and close semantics |

If a call returns `405` or `428`, the version string in `src/Defaults` is the first thing to check — the endpoints move
with the WhatsApp Web release.

## `src/Signal`

The crypto layer.

| File | Responsibility |
|---|---|
| `libsignal.ts` | the store adapter between Baileys keys and `libsignal` |
| `lid-mapping.ts` | lid ↔ phone-number mapping, used by every `…Alt` field |
| `Group/group_cipher.ts` | group message encrypt/decrypt |
| `Group/group-session-builder.ts` | building a sender-key session for a group |
| `Group/sender-key-*.ts` | the sender-key state machine (record, state, message, distribution, chain key) |
| `Group/keyhelper.ts` | key derivation helpers |
| `Group/ciphertext-message.ts` | the sender-key ciphertext wrapper |

The sender-key files are what `pickSenderKeyRecipients` and `senderKeyResetSummary` in `src/Extras/sender-key-memory.ts`
report on — a fan-out bug almost always ends up here.

## `src/Voip`

Call signalling and the WASM engine.

| File | Responsibility |
|---|---|
| `signaling.ts` | offer / accept / reject / terminate stanzas |
| `call-manager.ts` | call state and the event timeline |
| `incoming-call.ts` | the receive side of an offer |
| `relay-transport.ts` | the relay socket for media |
| `playlist-feeder.ts` | feeding an audio queue into a call |
| `resource-manager.ts` | the WASM engine's resources |
| `wasm-engine.ts` / `wasm-assets.ts` | loading and verifying `whatsapp.wasm` |

`npm run build` runs `scripts/verify-voip-assets.mjs`, which checks the WASM checksums — a mismatched asset is the most
common reason calls fail to start after an upgrade.

## `src/WABinary`, `src/WAM`, `src/WAUSync`

| Folder | Responsibility |
|---|---|
| `WABinary` | the binary node encoder/decoder — `encode.ts`, `decode.ts` |
| `WAM` | the metrics/binary-info layer that wraps outgoing nodes |
| `WAUSync` | the usync query framework and its protocols |

`WAUSync/Protocols` has one file per lookup type: `USyncContactProtocol`, `USyncDeviceProtocol`,
`USyncDisappearingModeProtocol`, `USyncStatusProtocol`, `USyncTextStatusProtocol`, `USyncUsernameProtocol`,
`UsyncBotProfileProtocol`, `UsyncLIDProtocol`. When a lookup returns nothing, that protocol is where it stopped.

## `src/Defaults`

`phonenumber-mcc.ts` is the country-code → MCC table used when building a device fingerprint. `index.ts` holds the
WhatsApp Web version string and the default socket config.

## `src/Extras/MessageBuilder/bot-signature.ts`

Bot signature verification: `loadBotSignatureRoot`, `constructSignaturePayload`, `isParsableCertificateChain`,
`verifyBotSignature`. Used when you need to prove a message really came from a verified bot account rather than one that
merely set the header.

## Reading a stack trace

| Frame looks like | Area |
|---|---|
| `Socket/messages-recv` | decryption, retries, receipts |
| `Socket/messages-send` | payload building, relay |
| `Signal/Group/*` | group fan-out and sender keys |
| `Voip/*` | call signalling |
| `WABinary/*` | malformed node — usually a wrong field type in a hand-built proto |
| `WAUSync/*` | a lookup returned nothing |
| `Extras/*`, `Addons/*` | the ported helpers; each file names its source in the header |

## Addons that are entry points rather than helpers

Three files in `src/Addons` and `src/Utils` do not export a function — they are alternative entry points:

| File | What it is |
|---|---|
| `Addons/voip-calling.ts` | a **standalone** voice-calling client on its own linked-device session. It opens its own socket and its own auth folder; it cannot share state with your bot socket. Use it when you want a dedicated calling session alongside a normal bot. |
| `Addons/voip-compat.ts` | the `@innovatorssoft/baileys` naming layer over the socket-integrated VoIP engine (`sock.initiateCall()`). Nothing here starts a second engine — it only renames (`CallSession` = `ActiveCall`, plus `CallDirection` / `CallMediaType`). |
| `Utils/message-composer.ts` | a one-line re-export of `Addons/message-composer`, kept so older import paths keep working. |

## Type-only folders

`src/Types` holds interfaces with no runtime code: `Bussines.ts` (catalog and profile shapes), `RichType.ts` (rich
message payloads), `Signal.ts` (the signal key maps), `USync.ts` (usync query shapes), plus `Socket.ts`, `Events.ts`,
`Auth.ts` and `Chat.ts` which the public API is typed against. They never need importing at runtime — `import type` only.

## The remaining internals

`sender-chain-key.ts`, `sender-message-key.ts`, and `sender-key-distribution-message.ts` / `sender-key-message.ts` /
`sender-key-name.ts` / `sender-key-record.ts` / `sender-key-state.ts` under `src/Signal/Group` are the sender-key state
machine in its individual pieces; `Voip/worker-bootstrap.ts` starts the WASM worker; `WAM/BinaryInfo.ts` describes the
metrics wrapper; `WAUSync/USyncQuery.ts` plus `Protocols/UsyncBotProfileProtocol.ts` and `Protocols/UsyncLIDProtocol.ts`
are the query framework and its two least-used protocols. `Socket/Client/types.ts` is the transport interface.
