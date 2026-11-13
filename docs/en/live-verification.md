# Live verification — how to prove the stanzas are accepted

Everything in `test/` is local. It proves the crypto round-trips, the nodes have the right shape, the
validators fire and the queues advance. None of it proves WhatsApp's servers accept what we send. That
needs a real paired account, so it is a step you run, not something I can run for you.

`scripts/verify-live.mjs` is the harness. It never creates a pairing and, unless you pass `--to`, it only
ever messages your own account.

## Before you start

- A **spare number** you can afford to lose. This is an unofficial client; bans happen.
- A **paired session directory** (the folder `useMultiFileAuthState` writes).
- For the channel-status step only: a channel you **administer**, and an account with the
  `CHANNEL_STATUS_PRODUCER` capability.
- Nothing else — the script installs nothing and writes nothing except WhatsApp traffic.

## Step 1 — build the library

```bash
npm install
npm run build          # tsc + tsc-esm-fix, writes lib/
```

## Step 2 — pair once, if you have not already

```bash
node -e "
import('./lib/index.js').then(async ({ default: makeWASocket, useMultiFileAuthState }) => {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const sock = makeWASocket({ auth: state })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', u => {
    if (u.qr) console.log('scan this:', u.qr)
    if (u.connection === 'open') { console.log('paired'); process.exit(0) }
  })
})"
```

Or pair with a code instead of a QR: call `sock.requestPairingCode('<number>')` about three seconds after the
socket exists — calling it immediately throws.

## Step 3 — run the checks

Start with the safe set:

```bash
node scripts/verify-live.mjs --session ./session
```

Then add the shapes you actually care about:

```bash
node scripts/verify-live.mjs --session ./session --interactive
node scripts/verify-live.mjs --session ./session --scheduled
node scripts/verify-live.mjs --session ./session --newsletter 1234567890@newsletter --post-status
```

| Flag | What it adds |
|---|---|
| (none) | connect + send a text to yourself and receive the echo |
| `--interactive` | builds and relays an interactive button message |
| `--scheduled` | schedules a message 15 minutes out, then unschedules it |
| `--newsletter <jid> --post-status` | checks capabilities, posts a text status, confirms it is listed, revokes it |
| `--to <jid>` | send somewhere other than yourself — only if you mean it |
| `--timeout <ms>` | per-step timeout, default 45s |

## Step 4 — read the result

Each line is one step:

```
ok   connect (revision accepted)      socket open, creds intact
ok   send text, receive echo          id 3EB0... echoed as 3EB0...
skip send interactive buttons         pass --interactive to include it
2 passed, 0 failed, 1 skipped
```

Exit code is 0 only when every step that ran passed. `skip` means you did not ask for it, not that it passed.

What each step actually proves:

- **connect** — the pinned `client_revision` in `src/Defaults/index.ts` is still accepted. A stale revision
  is refused at the handshake, so this is the cheapest canary you have.
- **send text, receive echo** — the send path and `messages.upsert` both work end to end.
- **interactive buttons** — the `interactiveMessage` payload and the `biz` node it rides on are accepted.
  If it is accepted but renders wrong, that is a rendering issue, not a protocol one.
- **scheduled** — the `conditionalRevealMessage` envelope and its `<meta>` node are accepted, and the
  unschedule protocol message is too.
- **newsletter status** — capabilities first (most accounts lack `CHANNEL_STATUS_PRODUCER`; the step fails
  with that reason instead of pretending), then the post is confirmed by reading it back from
  `getNewsletterStatuses`, then revoked.

## Step 5 — if something fails

| Failing step | Likely cause | What to do |
|---|---|---|
| connect (closed before open, 405/415) | client revision too old | bump `version` in `src/Defaults/index.ts` to the current `client_revision` from `web.whatsapp.com/sw.js` |
| connect (401/403/419) | session dead or logged out | delete the session dir and pair again |
| interactive | `biz` node or button shape rejected | check `MessageBuilder` against a message your phone renders; the builders live in `src/Extras/MessageBuilder/` |
| scheduled | outside the window, or the account lacks the capability | the window is 10 min – 14 days for chats, 10 min – 30 days for newsletters |
| newsletter status | no `CHANNEL_STATUS_PRODUCER`, or not an admin | check with `newsletterAdminCapabilities`; this is an account capability, not a code bug |

## What this does not cover

- **Calls.** Audio/video need a second peer; `test/voip.test.js` covers the feeders and the state machine,
  not a real call.
- **Media upload.** Sending an image or video exercises the upload path, which the harness skips to keep it
  cheap.
- **Groups.** Every step targets a chat you own; group operations need a group you can post in.
- **Long-run stability.** One pass proves acceptance, not that a reconnect storm or a long session holds up.

## If you want the strongest signal

Run the harness twice: once on the pinned revision, then again after bumping `version` to whatever
`web.whatsapp.com/sw.js` currently reports. If both connect, the revision is not your bottleneck. If only
the newer one connects, your pinned revision has gone stale and the constant needs a refresh — that is the
single most common reason a working bot suddenly stops connecting.
