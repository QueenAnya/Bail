> Halaman ini belum diterjemahkan — isinya masih dalam bahasa Inggris.

## 🛡️ Account health signals

WhatsApp tracks how an account reaches out to people it has never talked to, and tells its client where it stands. Reading those two signals is far more dependable than guessing a safe pause.

Both are the same `w:mex` queries WA Web runs, so the answer comes from WhatsApp's server, not from a local count:

| Function | Persisted query | When it can be called |
| --- | --- | --- |
| `fetchNewChatMessageCap()` | `WAWebMexFetchNewChatMessageCappingInfoJobQuery` (`27910975521856601`) | any time after connecting |
| `fetchAccountReachoutTimelock()` | `WAWebMexFetchReachoutTimelockJobQuery` (`23983697327930364`) | any time after connecting |

### New-chat quota

```js
const cap = await sock.fetchNewChatMessageCap()
```

What comes back:

| Field | Meaning |
| --- | --- |
| `status` | `NONE` → `FIRST_WARNING` → `SECOND_WARNING` → `CAPPED`, WhatsApp's own escalation ladder |
| `capped` | `true` once `status` is `CAPPED`: sending to new chats is refused |
| `warned` | `true` on both `FIRST_WARNING` and `SECOND_WARNING` |
| `unlimited` | `true` when the server sent no quota (or a negative one), so there is nothing to count down |
| `totalQuota` | the new-chat allowance for one cycle |
| `usedQuota` | how much of it the cycle has used |
| `remaining` | `totalQuota - usedQuota`, never negative; `null` when `unlimited` |
| `cycleStart`, `cycleEnd` | start and end of the cycle, **unix seconds** — multiply by 1000 for `new Date` |
| `serverTime` | the server clock when it answered, to compare `cycleEnd` without trusting your machine's clock |
| `oteStatus`, `mvStatus`, `subscriptionStatus` | verification and subscription status that ride along in the answer |
| `response` | the raw reply, if you want a field that is not mapped yet |

Only **starting** a chat with a number you have never talked to uses the quota. Replying in a conversation someone else started does not count, and neither does sending again to an existing chat.

Worth knowing: this query asks for one kind of quota, `INDIVIDUAL_NEW_CHAT_THREAD` — the new-chat **thread** quota, not a message count. Earlier Anya builds sent `INDIVIDUAL_NEW_CHAT_MSG`, a name no WhatsApp client has, which is why the call could come back with an error or empty numbers, and returned the raw reply without the fields above. The server also pushes this state on its own as the `message-capping.update` event (the raw payload, snake_case). A send that WhatsApp refuses because of the quota (ack error `475`) raises the same event with `capping_status: 'CAPPED'`, the `jid` and the `messageId` of the rejected message, and is never retried.

### Reachout timelock

```js
const lock = await sock.fetchAccountReachoutTimelock()
```

| Field | Meaning |
| --- | --- |
| `isActive` | the account is currently restricted from contacting new people |
| `timeEnforcementEnds` | a `Date` for when the restriction lifts, `undefined` when the server sends `0` |
| `enforcementType` | the reason — `BIZ_QUALITY` is quality-based, `BIZ_COMMERCE_VIOLATION_*` are policy categories |

Calling it also emits `connection.update`, so one call informs the whole bot. The state also arrives unasked:

```js
sock.ev.on('connection.update', ({ reachoutTimeLock }) => {
  if (reachoutTimeLock?.isActive) stopSending()
})
```

### Using it as a guard

```js
const guard = async () => {
  const lock = await sock.fetchAccountReachoutTimelock()
  if (lock.isActive) return { send: false, reason: 'reachout timelock until ' + lock.timeEnforcementEnds }

  const cap = await sock.fetchNewChatMessageCap()
  if (cap.capped) return { send: false, reason: 'new-chat quota used up until ' + new Date(cap.cycleEnd * 1000) }
  if (cap.warned) return { send: false, reason: 'WhatsApp has already warned this account: ' + cap.status }
  if (cap.remaining !== null && cap.remaining < 10) return { send: false, reason: 'only ' + cap.remaining + ' left in this cycle' }

  return { send: true, remaining: cap.remaining }
}
```

Check before a round and again every batch — `SECOND_WARNING` is the last state before the quota lands, so stopping there is the difference between a pause and a block.

> [!NOTE]
> Bulk sending through an unofficial client is outside WhatsApp's Terms of Service, whatever the recipients agreed to. The sanctioned route for opt-in bulk sending is the WhatsApp Business Platform. These signals reduce the chance of tripping an automatic limit; they do not make an account safe.

---
