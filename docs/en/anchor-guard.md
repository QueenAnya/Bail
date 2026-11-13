## 🛡️ AnchorGuard — crash payloads and spam-add

WhatsApp renders messages. Some payloads make that rendering crash — a null byte in a caption, four thousand combining
marks, a carousel with hundreds of cards. On a phone that is a force-close; on WhatsApp Web it is a frozen tab. A bot
never renders anything, so the payload passes straight through your socket and lands on the people you are talking to.

AnchorGuard sits in the socket and removes those payloads before they arrive.

The guard package ships with this one, so there is nothing extra to install:

```ts
const sock = makeWASocket({
	auth: state,
	AnchorGuard: true,
	AnchorGuardConfig: {
		autoDelete: true,
		blockOnBug: true,
		kickOnBug: true,
		onDetect: ({ direction, jid, sender, reasons }) => logger.warn({ direction, jid, sender, reasons }, 'crash payload')
	}
})
```

`sock.anchorGuard.stop()` detaches everything again.

### What gets attached

| Hook | Effect |
| --- | --- |
| `messages.upsert` | every incoming message is scanned; a flagged one is deleted before your handler runs |
| `sock.sendMessage` | outgoing content is scanned and rejected instead of sent |
| `group-participants.update` | member additions are checked for the Meta AI spam-add pattern |

### What happens to a flagged message

| Where | What the guard does |
| --- | --- |
| Group, bot is admin | revoke for everyone, kick the sender, block the sender |
| Group, bot is not admin | delete for me, block the sender |
| Direct chat | delete for me, block the sender |
| Your own message | revoked, never blocked |

Revoking someone else's message needs admin rights — that is a WhatsApp rule, not a guard limitation — so the non-admin
path is delete-for-me.

### Tuning

| Option | Default | Why you would change it |
| --- | --- | --- |
| `thresholds` | `{}` | a bot that legitimately posts very long messages can raise the size limits |
| `burstThreshold` / `burstWindowMs` | `2` / `60000` | how many hits from one sender before the guard escalates |
| `cooldownMs` | `15000` | stop repeated logging from a chat under attack |
| `guardOutgoing` | `true` | set `false` if you build payloads yourself and want them untouched |
| `groupMetadata` | `null` | hand it your cache so admin checks do not cost a query |
| `addWatchlist` | `[]` | numbers to kick the moment they are added |

### The spam-add attack

Adding a batch of Meta AI numbers (`+1 313 555-xxxx`) to a group is a known way to get that group restricted. With
`guardGroupAdds` and `autoKickBadAdds` on, each such number is kicked as it appears, and a repeat offender past
`burstThreshold` is blocked and kicked themselves. Members added normally are not touched.

### Checking a payload yourself

```ts
import { detectBug } from '@rexxhayanasi/elaina-anchorguard'

const { flagged, reasons } = detectBug(msg.message)
```

Useful in a test, or in a queue worker that inspects messages before they reach a socket.

### What it does not do

It is best effort. It knows the crash patterns that have been seen plus structural limits, so a brand-new vector needs a
package update. It also cannot protect a client that has already rendered the message — the point is to delete it before
that happens. And it is not a ban-prevention tool: it removes crash payloads and spam-adds, nothing more.
