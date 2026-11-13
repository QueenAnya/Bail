# Live testing the four risky paths

This package carries fixes upstream WhiskeySockets has not merged. Four of them sit on the connection and message
paths, so they are the ones to exercise on a real account before you trust a deploy. `scripts/live-check.mjs` runs all
four and prints PASS / FAIL / SKIP per check.

Nothing in the script is destructive: it sends a message to yourself and a status update visible only to you.

## Before you start

1. Use a **spare number**, not your main bot's number, for the first run.
2. Build once, so the script has `lib/`:

   ```bash
   npm install
   npm run build
   ```

3. Pick a folder for the auth state (created on first run, keep it out of git):

   ```bash
   export ANOTHER_AUTH_DIR=./auth-live
   ```

## Step 1 — handshake and pairing (`passive`, upstream PR #2682)

This is the highest-risk change: it is the one wire difference between this package and upstream.

```bash
node scripts/live-check.mjs --check 1
```

- The QR is drawn in the terminal. Scan it from **WhatsApp → Linked devices → Link a device**.
- **PASS** means a QR was emitted, i.e. the server accepted the handshake.
- **FAIL with 428 before any QR** is exactly the symptom the flag is about. Now run the same check with upstream's
  behaviour and compare on the same account:

  ```bash
  ANOTHER_PASSIVE=true node scripts/live-check.mjs --check 1
  ```

- If one pairs and the other 428s, you have your answer for your account: keep the one that pairs. If both pair,
  leave the default (`false`).

Once paired, rerun `--check 1` — with credentials present it checks the **reconnect** path instead, which is where the
428 was originally reported.

## Step 2 — inbound message and ack (PR #2749)

```bash
node scripts/live-check.mjs --check 2
```

The script sends a message to yourself and waits for it to come back through the receive path.

- **PASS**: sent once, received once.
- **FAIL "never came back"**: the receive path or the ack is broken — the server will re-deliver forever.
- **FAIL "delivered N times"**: the ack stanza is not landing, so the server keeps resending.

## Step 3 — LID senders resolve to a phone number (PR #2744)

```bash
node scripts/live-check.mjs --check 3
```

It watches inbound messages for 20 seconds and reports any sender that arrives as `@lid` with no phone-number
alternative. **For this check to mean anything you have to send a message in during that window.**

The clearest way is a **group**: in a group the chat jid is `…@g.us` and the sender is `key.participant`, which is
exactly where LID-addressed members show up. Send one message in any group you are in, from your phone, while the
window is open. A direct message from a LID-addressed contact works too.

- **PASS**: no unresolved LID senders — it says how many group and direct messages it actually checked.
- **SKIP**: nothing arrived in the window. Nothing was tested; rerun and send a message this time.
- **FAIL**: it prints the senders it could not resolve. Those are the participants your bot will not be able to
  attribute.

## Step 4 — status update over the migrated endpoint (PR #2755)

```bash
node scripts/live-check.mjs --check 4
```

Posts one status update addressed only to you.

- **PASS**: it prints the message id. Open the Status tab on your phone and confirm it is there.
- **FAIL**: the send threw or returned nothing — the `w:mex` migration may not match what the server expects today.

## Reading the result

Run everything in one go once the individual checks behave:

```bash
node scripts/live-check.mjs
```

Exit code is `1` if anything failed, so it can gate a release:

```bash
node scripts/live-check.mjs && npm publish
```

## What a PASS does not prove

- It proves the path works **on your account, today**. WhatsApp changes server behaviour without notice.
- It does not prove the same for a different browser/platform config (`browser`, `syncFullHistory`, desktop pairing).
- It does not cover the other ten unmerged fixes — those are listed in the README's rollout table.

## If something fails

1. Note which check failed and the status code it printed.
2. Flip `passiveLogin` first if it is check 1 — that isolates the one deliberate wire difference.
3. Roll back to the previous release rather than editing individual files: the unmerged fixes are interdependent.
