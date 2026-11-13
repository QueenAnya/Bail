# Chat state, labels and history

### Chat helpers

`makeChatsExtras(sock)` adds the chat-level operations that are not on the socket: clearing a message modification,
reporting spam, and reading the result back.

```ts
import { makeChatsExtras, SPAM_FLOWS } from '@teamolduser/baileys'

const chats = makeChatsExtras(sock)

await chats.reportSpam(jid, { flow: SPAM_FLOWS.OverflowMenuReport })
```

### Labels

Business accounts can tag chats with labels. The label helpers are part of the chats extras; the newsletter extras carry
the channel equivalents.

```ts
await chats.addLabel(jid, labelId)
await chats.removeLabel(jid, labelId)
```

### History and resync

When a bot restarts with an old auth state, WhatsApp may send an abbreviated history sync. If chats look empty:

1. check `creds.accountSyncCounter` — a low number means the account never finished syncing
2. do not delete the auth folder to "force" a resync; that costs a re-pair
3. `sock.ev.on('messaging-history.set', …)` tells you what actually arrived
