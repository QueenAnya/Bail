# AnchorGuard

An **anti-force-close guard** for WhatsApp, ported from Elaina Baileys. It watches the messages going in and out, spots
the payloads that make WhatsApp Web or the phone app crash, and deletes them before anyone opens them. Optionally it
blocks the sender, kicks them from a group, and catches the "spam-add" attack where a group is flooded with Meta AI
numbers.

It does **not** keep your bot process alive — a bot does not render a UI, so a crash payload cannot kill it. The guard
protects the people on the other end of the socket.

The guard package ships with this one, so there is nothing extra to install:

```ts
const sock = makeWASocket({
	auth: state,
	AnchorGuard: true,
	AnchorGuardConfig: {
		autoDelete: true,
		guardIncoming: true,
		guardOutgoing: true,
		blockOnBug: true,
		kickOnBug: true,
		onDetect: ({ direction, jid, sender, reasons }) => console.log('[guard]', direction, jid, reasons)
	}
})
```

Once attached, the handle is `sock.anchorGuard`; `sock.anchorGuard.stop()` detaches every hook.

## How it works

The guard attaches three things when the socket is created:

| Hook | What it does |
|---|---|
| `messages.upsert` | scans every incoming message; a flagged one is deleted before your handler (or the recipient) sees it |
| `sock.sendMessage` (wrapped) | scans outgoing content and throws instead of sending a payload that would crash the recipient |
| `group-participants.update` | watches member additions for the Meta AI spam-add attack |

What happens to a flagged message depends on where it landed and what the bot is allowed to do:

| Situation | Response |
|---|---|
| Group, bot is admin | delete for everyone (revoke) + kick the sender + block the sender |
| Group, bot is not admin | delete for me + block the sender |
| Direct chat | delete for me + block the sender |
| Your own message (`fromMe`) | revoked, no block |

WhatsApp does not let you revoke someone else's message unless you are an admin, which is why the non-admin path falls
back to delete-for-me.

## Options

Every key below goes in `AnchorGuardConfig`. Defaults are the package's own.

| Option | Default | Meaning |
|---|---|---|
| `autoDelete` | `true` | delete a flagged message automatically |
| `revokeForEveryoneIfAdmin` | `true` | in a group, revoke when the bot is admin; otherwise delete-for-me |
| `kickOnBug` | `true` | kick the sender from the group (needs admin) |
| `blockOnBug` | `true` | block the sender (never your own number) |
| `guardIncoming` | `true` | scan `messages.upsert` |
| `guardOutgoing` | `true` | wrap `sendMessage` and refuse dangerous payloads |
| `groupMetadata` | `null` | `async jid => metadata`, so admin checks can use your cache instead of a query |
| `selfOnly` | `false` | only guard your own chat |
| `burstThreshold` | `2` | flagged messages from one sender (inside `burstWindowMs`) before escalating |
| `burstWindowMs` | `60000` | the burst window |
| `leaveGroupOnBurst` | `false` | leave the group when a kick keeps failing during a burst |
| `cooldownMs` | `15000` | quiet period for repeated logs from the same chat |
| `guardGroupAdds` | `true` | watch `group-participants.update` for adds |
| `autoKickBadAdds` | `true` | kick a dangerous number the moment it is added (needs admin) |
| `metaAiNumbers` | `true` | treat Meta AI numbers (`1313555…`) as a dangerous add |
| `addWatchlist` | `[]` | extra numbers to kick on sight when added |
| `ownJid` | `sock.user.id` | your own jid |
| `thresholds` | `{}` | override the detection limits from `ANTIBUG_DEFAULTS` |
| `onDetect` | `null` | called with `{ direction, jid, sender, reasons }` |
| `proto` | `null` | pass Baileys' `proto` to also check the encoded protobuf size |

## The spam-add attack

A known way to get a group restricted or banned: add a pile of **Meta AI** numbers (`+1 313 555-xxxx`) to it. The guard
watches member additions, and when the added number is a Meta AI number or is on `addWatchlist` it kicks it straight
away (if the bot is admin). If the same person keeps doing it past `burstThreshold`, the **adder** is blocked and kicked
too. Ordinary members being added are left alone.

## Detection without a socket

`detectBug` is exported on its own, which is handy in tests or when you already have a message object:

```ts
import { detectBug } from '@rexxhayanasi/elaina-anchorguard'

const { flagged, reasons } = detectBug(msg.message)
if (flagged) console.log('crash payload:', reasons)
```

## What it catches

- **Control and null bytes** (`\u0000`, C0/C1) — the classic crasher
- floods of **combining** characters, and **invisible / zero-width / hair-space / RTL override** characters
- **giant text or captions**, and excessive newlines
- **mention bombs** (`mentionedJid` / `groupMentions` with hundreds of entries)
- `nativeFlowMessage` / `listMessage` / `carouselMessage` with too many buttons, sections, rows or cards
- broken or oversized `buttonParamsJson`
- **AIRich** responses with too many submessages or content items
- **location / liveLocation** with invalid coordinates (NaN, Infinity, out of range)
- polls with too many options, oversized contact arrays
- **NaN / Infinity** in any field
- wrapper nesting that is too deep (`viewOnce` / `ephemeral` / `deviceSent` / `edited`)
- structures that are too deep, too large, or genuinely circular
- encoded protobuf larger than the limit (when `proto` is passed)

The generic walk inspects every field of every message type, so the flood / size / nesting / number checks cover types
this list does not name; the per-type checks add structural limits on top.

## Limits, honestly

This is **best effort, not a guarantee** — think antivirus, not a firewall. It catches the crash patterns it knows plus
structural heuristics; a new vector needs a package update. Thresholds are tunable through `thresholds` so a legitimately
long message does not trip them, but tuning them down weakens the protection.

It ships as a dependency, but the import stays lazy and guarded: if the package is somehow missing from
`node_modules`, the socket does **not** throw — it logs a warning through `sock.logger` naming the package and carries
on without a guard. Attach your own logger if you want to see that warning — the default logger is silent in most
setups.
