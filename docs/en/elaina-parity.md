# Elaina parity

`src/Extras` is ported from [elaina-baileys](https://github.com/rexxzyid/elaina-baileys). This page records how
close the port is, so "ported" does not have to mean "trust me".

## What "parity" means here

Each ported module is compared with its elaina source after **stripping types and minifying both sides** through
esbuild. Formatting, comments, TypeScript annotations and `import type` lines therefore cannot hide a difference;
anything that still differs is a real decision.

```bash
npm i -D esbuild
node scripts/audit-elaina-parity.mjs /path/to/elaina-baileys-main
```

Current result against elaina-baileys **1.4.7**:

```
15 identical, 0 expected differences, 0 unexplained
```

A deliberate local change is not drift. Record it, with a reason, and the audit stays green:

```bash
node scripts/audit-elaina-parity.mjs ../elaina-baileys-main \
  --update native-flow.ts --reason "raised the button cap after testing the current Web build"
```

That writes an entry into `parity-baseline.json` (module, a hash of the normalised code, the reason, the date).
From then on the report says `intentional`, not `UNEXPLAINED`. The hash is what makes this safe: change that module
again without recording it and the audit fails, with a note that the earlier reason no longer describes the code.

```bash
node scripts/audit-elaina-parity.mjs ../elaina-baileys-main --update --all-identical
```

drops entries for modules that match upstream again — useful after re-porting a module from a newer release.

Unexplained differences exit non-zero, so this can be a CI gate.

## All fifteen are identical

`group-metadata-cache`, `html-app`, `html-multiplayer`, `link-preview-metadata`, `native-flow`, `optional-media`,
`sender-key-memory`, `ttl-cache`, `voice-recognition`, `status-stickers`, `auth-store`, `modern-messages`,
`scheduled-message`, `payment-messages`, `newsletter-status` — byte-for-byte the same code once types are stripped.

Two pieces of machinery made that possible without changing behaviour:

- **`src/Utils/proto-compat.ts`** aliases the proto types this WAProto build exposes flat
  (`ConditionalRevealMessage`, `PollAddOptionMessage`, `EventInviteMessage`) under `proto.Message`, so the ported
  modules keep upstream's exact expressions instead of hardcoding enum numbers or resolving paths at call time.
- **`src/Extras/newsletter-status-socket.ts`** holds the one thing this fork adds on top of upstream's status
  file: a factory that returns the five operations as an object, so `Extras/socket.ts` can merge them in a single
  spread. Upstream attaches them to the socket individually. Keeping the composition out of
  `newsletter-status.ts` is what lets that file stay identical.


## What the stanza suite covers

`test/extras-stanza.test.js` encodes and decodes every message this fork builds through the generated protobuf
schema, including the relay payloads that go out as raw proto fields — `paymentReminderMessage`,
`splitPaymentMessage`, `splitPaymentUpdateMessage` and `musicMessage` — driven through the real path
(`preparePortedMessageContent` → raw mode → encode → decode).

## Provenance

`src/Extras/index.ts` exports `PORTED_FROM`, recording the release this layer came from, the release it was last
checked against, when, and the measured parity (`byteIdenticalModules: '14/15'`). Update it when you re-run the
audit.

## What parity does not cover

Byte equality proves the *code* matches. It does not prove the protocol works — that needs a paired account. See
[Live verification](./live-verification.md).

## Dependency trust

`libsignal` used to be `npm:@teamolduser/libsignal@1.0.1`, a republished fork of the Signal protocol implementation
— the most security-sensitive dependency in the tree, and one whose code cannot be reviewed as text. It is now
upstream `libsignal@^6`, the same package elaina-baileys uses, and `test/signal-roundtrip.test.js` proves the swap
by actually building a session and encrypting/decrypting a message.

`ffmpeg-static` is a regular dependency: it downloads a binary in its install script, and `getFfmpegBin()` falls back to
a system `ffmpeg` if that download ever fails, so a bad download degrades instead of breaking the install.

`whatsapp-rust-bridge` remains. It is a native Rust crypto bridge with no install scripts, but it is compiled code;
swapping it for elaina's bridge would be a port, not a dependency change.
