# Troubleshooting

### Connection

| Symptom | Likely cause | Fix |
|---|---|---|
| `405` / `428` right after connect | the pinned WhatsApp Web version is stale | `node scripts/update-version.ts`, or wait for the daily `update-version` workflow |
| `401` / `device_removed` | the session was logged out from the phone | delete the auth folder and pair again |
| `Stream Errored (conflict)` | the same credentials are used by two processes | one auth folder per running bot, always |
| `Connection Closed (515)` | expected right after pairing | reconnect once; do not treat it as an error |
| QR keeps refreshing | the phone never completes the scan | check the clock on the phone; pairing codes expire quickly |
| `ENOTFOUND` / proxy errors | egress blocked | allow `*.whatsapp.net`, `*.whatsapp.com`, `web.whatsapp.com` |

### Pairing

| Symptom | Cause | Fix |
|---|---|---|
| `409` when requesting a code | a code was already requested and is still pending | wait for it to expire, then request again |
| The phone never shows the prompt | the IQ fired before `pair-device` arrived | use `createPairingQueue` from `src/Addons/pairing-fix.ts` |
| Code is not 8 characters | custom codes must be 8 uppercase letters/digits | `'ANYA1234'`, not `'anya'` |
| `Socket is required` | a helper was called with `undefined` instead of the socket | pass `sock` — most extras take it as the first argument |

### Messages

| Symptom | Cause | Fix |
|---|---|---|
| Messages arrive but never decrypt | pre-keys missing — the auth state was copied without `pre-key` records | migrate with `migrateAuthState`, never copy only `creds.json` |
| `conversation` is empty | the message is wrapped (ephemeral, view-once, edited) | `extractMessageContent` / `extractMessageText` |
| Sends hang on status updates | the `w:mex` status endpoint changed | see [Message content](docs/wiki/message-content.md) |
| Button or AIRich renders differently | the client validates payloads, not us | send one to a test number before shipping |
| `Cannot read properties of undefined (reading 'undefined')` when replying | the quoted key came from a different message | quote `msg.key`, not a key you built |
| The bot replies in every group except one | that group has `announcement` on and the bot is not an admin | check `groupMetadata(jid).announce`, then promote the bot |

### Identity

| Symptom | Cause | Fix |
|---|---|---|
| The id looks like a lid, not a phone number | newer accounts are addressed by lid | read `participantAlt` / `senderPn`, or use `splitJidsByType` |
| A jid you built silently fails | the number is not on WhatsApp | `sock.onWhatsApp(number)` first |
| Group members show different ids than before | lid migration in progress | map through `lid-mapping.update`, do not rewrite stored jids |

### Build and runtime

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot find module 'better-sqlite3'` | Node < 22, or the native module was not rebuilt | `npm rebuild better-sqlite3` |
| `ERR_MODULE_NOT_FOUND` after a local build | `tsc` ran without `tsc-esm-fix` | `npm run build` (it runs both) |
| Tests fail with `createRequireEsmError` | jest ran without the ESM flag | `npm test` (the script sets `--experimental-vm-modules`) |
| Not sure whether your build really works | — | `node scripts/live-check.mjs --check 1..4` on a paired number; see `docs/live-test.md` |
| Migrated backends but the bot still asks for a QR | creds were copied but not saved | pass the adapter to `migrateAuthState`, or call `saveCreds()` |
