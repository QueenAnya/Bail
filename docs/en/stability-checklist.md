# Stability checklist — what to run, in order

Two of these steps need a paired WhatsApp account, so they are yours. Everything before them is already green and
re-runnable.

Each step says what it proves and what a failure means.

---

## Step 0 — build and run the local suite (5 minutes, no account)

```bash
npm install
npm run build
node --test test/*.test.js
```

Expect `103 tests, 103 pass, 0 fail, 0 skip`.

Then check the port has not drifted from upstream:

```bash
npm i -D esbuild
git clone --depth 1 https://github.com/rexxzyid/elaina-baileys.git /tmp/elaina
node scripts/audit-elaina-parity.mjs /tmp/elaina
```

Expect `15 identical, 0 expected differences, 0 unexplained`. The script exits non-zero if any module drifts, so
this is a CI gate rather than a report.

**What it proves:** the code compiles, every unit and concurrency and soak test passes, and all fifteen ported
modules are byte-identical to elaina-baileys after type-stripping.

---

## Step 1 — pair a spare number (10 minutes, needs a phone)

Use a number you can afford to lose. This is an unofficial client.

```bash
node -e "
import('./lib/index.js').then(async ({ default: makeWASocket, useMultiFileAuthState }) => {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const sock = makeWASocket({ auth: state })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', u => {
    if (u.qr) console.log('QR:', u.qr)
    if (u.connection === 'open') { console.log('paired'); process.exit(0) }
  })
})"
```

Scan the QR string with WhatsApp → Linked devices. If you would rather use a code, call
`sock.requestPairingCode('<number>')` about three seconds after the socket exists — calling it immediately throws.

---

## Step 2 — prove the stanzas are accepted (15 minutes, needs the paired session)

Start with the safe set. It only ever messages your own account.

```bash
node scripts/verify-live.mjs --session ./session
```

Expect:

```
ok   connect (revision accepted)      socket open, creds intact
ok   send text, receive echo          id 3EB0... echoed as 3EB0...
skip send interactive buttons         pass --interactive to include it
```

Then add each shape you actually use, one at a time:

```bash
node scripts/verify-live.mjs --session ./session --interactive
node scripts/verify-live.mjs --session ./session --scheduled
node scripts/verify-live.mjs --session ./session --newsletter 1234567890@newsletter --post-status
node scripts/verify-live.mjs --session ./session --payments --music-uri https://mmg.whatsapp.net/...
```

`--payments` sends a payment reminder and a music message as raw proto fields
(`paymentReminderMessage` / `musicMessage`). The unit suite proves they encode and that raw mode accepts them; only
the server can prove they render, which is what this step adds. Music URIs must come from a Meta catalog entry —
the builder refuses anything not hosted on a WhatsApp/Meta CDN.

| Step | What it proves | If it fails |
|---|---|---|
| connect | the pinned `client_revision` is still accepted | 405/415 → revision stale, run `node scripts/check-revision.mjs --fix` and rebuild. 401/403/419 → session dead, delete `./session` and re-pair |
| send text, receive echo | send path and `messages.upsert` work end to end | check the session is still linked; look at the socket's own error |
| interactive buttons | the `interactiveMessage` payload and its `biz` node are accepted | compare against a message your phone renders; builders live in `src/Extras/MessageBuilder/` |
| scheduled | the `conditionalRevealMessage` envelope and its `<meta>` node are accepted, and unschedule too | the window is 10 min – 14 days for chats, 10 min – 30 days for newsletters |
| newsletter status | capabilities, then the post is confirmed by reading it back, then revoked | almost always a missing `CHANNEL_STATUS_PRODUCER` capability or non-admin rights, not a code bug |

**What it proves:** this is the only step that proves WhatsApp accepts what this fork sends. Everything else in
the repo is local.

---

## Step 3 — reconnect storm (5 minutes, needs the paired session)

```bash
node scripts/verify-live.mjs --session ./session --storm 5
```

It force-closes the websocket five times and waits for the socket to come back each time. It fails if a reconnect
times out, if `connection.update` listeners grow by more than 2 across cycles, or if the heap grows more than 60MB.

Expect something like `reconnects 820/640/700/660/690ms, listeners 1/1/1/1/1, heap 58/58/59/59/60MB`.

**What it proves:** the reconnect path works against the real server and does not leak listeners or memory. The
local soak suite covers the same failure modes for the message path, but only a live socket can test reconnect.

---

## Step 4 — soak (24 hours, needs the paired session)

Run your bot with the process watched, then look at the two numbers that matter:

```bash
node --expose-gc your-bot.js    # or however you start it
# in another shell, every hour:
ps -o rss= -p <pid>                     # RSS in KB
node -e "console.log(process.listenerCount?.('x'))"   # or log it from inside your bot
```

Log from inside the bot, hourly:

```js
setInterval(() => {
	const mb = Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
	const listeners = ['messages.upsert', 'connection.update', 'creds.update']
		.map(event => `${event}=${sock.ev.listenerCount(event)}`).join(' ')
	console.log(`[soak] heap=${mb}MB ${listeners}`)
}, 60 * 60 * 1000).unref()
```

**Pass:** heap plateaus (small sawtooth is normal, a straight climb is not) and listener counts stay flat.
**Fail:** listeners climbing means something adds a handler per message; heap climbing without retained data
usually means the same.

---

## Step 5 — put it in CI (10 minutes)

`.github/workflows/verify.yml` is in the repo. It runs on every push and PR, plus every Monday:

- build + `node --test` on Node 24 and 26
- the elaina parity audit against the pinned upstream release
- `scripts/check-revision.mjs` on the weekly schedule, which fails when the pinned client revision falls behind

Nothing to configure beyond pushing the file. If you fork, update the repo URL in the parity job.

---

## Step 6 — keep the revision fresh (ongoing)

```bash
node scripts/check-revision.mjs          # is the pin stale?
node scripts/check-revision.mjs --fix    # update src/Defaults/index.ts in place
npm run build
node scripts/verify-live.mjs --session ./session    # confirm the new pin connects
```

The weekly CI job does the check for you; the `--fix` + rebuild + verify loop is what you do when it fires.

---

## What is still unprovable from here

- **Load at your real message rate.** The suite proves correctness under concurrency, not throughput on your box.
- **Media upload.** The harness deliberately skips it to keep runs cheap.
- **Calls.** Audio/video need a second peer; `test/voip.test.js` covers the feeders and state machine only.
- **Ban risk.** No test can prove your account is safe. Keep the number expendable and the volume human-shaped.
