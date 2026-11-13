# Scheduled messages

Scheduled messages are client-side: a job queue that fires `sendMessage` at the right time. Nothing is stored on
WhatsApp's side, so a bot that is offline when the time comes does not send it.

```ts
import { attachSchedulerSendFn, scheduleMessage, scheduleMessageAfter } from '@teamolduser/baileys'

attachSchedulerSendFn((jid, content, options) => sock.sendMessage(jid, content, options))

const job = scheduleMessage({
	jid,
	content: { text: 'Good morning' },
	sendAt: new Date('2026-11-10T03:30:00Z'),
	repeatIntervalMs: 24 * 60 * 60 * 1000, // optional: daily
	maxRepeats: 30
})

// or relative
scheduleMessageAfter({ jid, content: { text: 'in 10 minutes' }, delayMs: 600_000 })
```

| Helper | Use |
|---|---|
| `scheduleMessage({ jid, content, sendAt })` | send at a date/time |
| `scheduleMessageAfter({ jid, content, delayMs })` | send after a delay |
| `getAllScheduledMessages()` | list pending jobs |
| `cancelScheduledMessage(id)` / `cancelAllScheduledMessages()` | cancel |
| `createMessageScheduler()` | a manager instance instead of module-level state |
