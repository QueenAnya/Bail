# Privacy and disappearing messages

### Disappearing messages

The timer is per chat, in seconds, and only a fixed set is accepted:

```ts
import { DISAPPEARING_DURATIONS, normalizeDisappearingDuration } from '@teamolduser/baileys'

await sock.sendMessage(jid, { disappearingMessagesInChat: 86400 })
```

| Value | Meaning |
|---|---|
| `0` | off |
| `86400` | 24 hours |
| `604800` | 7 days |
| `7776000` | 90 days |

`normalizeDisappearingDuration` takes a **number** and converts the shorthands the socket accepts:

| Input | Result |
|---|---|
| `0` | `0` (off) |
| `1` or `24` | `86400` |
| `7` | `604800` |
| `30` | `2592000` |
| `90` | `7776000` |
| anything else | treated as seconds already |

A non-numeric string (`'24h'`, `'off'`) throws a `Boom` with status 400 — it does not parse human shorthands, so convert
those yourself before calling it.

### Blocking and reporting

```ts
await sock.updateBlockStatus(jid, 'block')   // or 'unblock'
await sock.reportSpam(jid, { flow: SPAM_FLOWS.OverflowMenuReport })
```

Reporting is one-way and not reversible from the API; the result comes back as a node you read with
`readSpamReportResult`.

### What a bot cannot change

Privacy settings (last seen, profile photo, read receipts, group add permissions) live on the account, not the socket.
The API can read them in some cases but cannot set them — telling users otherwise is the usual source of bug reports.
