## Unreleased

- **feat:** concurrent VoIP call management — `sock.initiateCalls()`,
  `getActiveCalls()`, `getCall(callId)`, `getActiveCallCount()`,
  `endCall(callId)`, `endAllCalls()`, `setVoipOptions()`. Each concurrent
  call gets its own isolated WASM engine + transport; signaling routes
  events to the right call by `callId`. (Source: PR, upstream fork.)
- **feat:** video call orientation support (`isHorizontal`/`orientation`)
  and audio/video source looping (`repeat`/`videoLoop`).
- **feat:** inline entity parsing for markdown — `[text](url)` links,
  citations, and LaTeX embeds inside `sendMarkdown`/`sendRichMessage`
  content are now parsed into real clickable/rendered entities instead
  of being sent as plain bracket text. (Source: PR, upstream fork.)
- **fix:** VoIP no longer writes ffmpeg/engine errors directly to
  `process.stderr` — they were already surfaced via the `videoError`/
  `error` events, so the direct stderr write was just noise for anyone
  already handling those events.
- **feat:** `sock.initiateCall()` now supports outgoing video calls —
  `isVideo`, `videoSource`, `videoWidth`/`videoHeight`, `videoFps`,
  `videoLoop` options. Frames are decoded via ffmpeg into raw YUV420p and
  pushed through the same WASM engine `sendAudioData` already uses (a
  verified `onVideoDataFromJs` binding), triggered off the call's audio
  pipeline coming up rather than a separate WASM "video ready" callback —
  the source fork's own equivalent callback doesn't appear to be backed
  by an actual engine hook, so it was adapted rather than ported as-is.
  (Source: PR, upstream fork.)
- **feat:** `sock.sendRichHtml(jid, html, quoted?, options?)` — sends an
  arbitrary HTML snippet as a rich, native-rendered message (via the same
  GenAI unified-response mechanism `sendTable`/`sendMarkdown`/etc. use),
  with optional `id`, `title`, `source`/`trusted_sources`, `headerText`,
  and `footer`. (Source: PR, upstream fork.)
- **fix:** undecryptable `status@broadcast` messages no longer stall the
  entire offline message queue. They were NACK'd like any other failed
  message, which makes the server hold the stanza and keep re-delivering
  it on every reconnect — and while it's pending, the rest of the queued
  offline messages are withheld behind it. Statuses are best-effort
  content, so an undecryptable one is now ack'd (dropped) instead of
  NACK'd. (Source: PR, upstream.)
- **test:** added a regression test for the existing partial-`creds.update`
  presence-announce fix (guards against a nameless `<presence/>` node
  being sent on ordinary key churn, which the server reads as
  "available" and can suppress push notifications). (Source: PR, upstream.)
- **fix:** `sock.sendMessage([jidA, jidB, jidC], { ... })` (status
  mention) now actually works — `jid` accepted an array in the docs but
  the implementation only handled a single string `jid`. Delegates to the
  same group-expansion + `mentioned_users` logic `sock.sendStatusMentions`
  already used.
- **feat:** `createVoipClient()` (standalone, separate-session VoIP calling)
  is now fully self-contained — vendored `baileys-caller`'s connection-setup
  logic (`Voip/voip-client.ts`) instead of dynamically importing the
  external, unpublished `baileys-caller` npm package. No more manual
  `npm install github:...`, no more manual build step, no more extra
  peer dependency for this feature. Old exported
  type names (`VoipClientConfig`/`VoipCallOptions`/`VoipCallEvents`/
  `VoipActiveCall`) still work as deprecated aliases.
- **feat:** `groupStatus`, `isLottie`, `spoiler`, `secureMetaServiceLabel`,
  `ai`, and `ephemeral` can now each be set as either a content-level flag
  (`sock.sendMessage(jid, { ..., spoiler: true })`) or an options-level
  flag (`sock.sendMessage(jid, { ... }, { spoiler: true })`) —
  interchangeably, whichever is set wins.
- **feat:** new `ephemeral: true` content/options shorthand — sends a
  disappearing message using WhatsApp's default expiration, without
  needing to compute `ephemeralExpiration` yourself.
- **fix:** `invoiceNote` now actually works — was documented as
  "not supported yet" but is now implemented (attach an invoice note to
  an `image`/`document` message).

## 9.10.15 (2026-08-22)
