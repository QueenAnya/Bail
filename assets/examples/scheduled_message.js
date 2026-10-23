// Scheduled-message protocol helpers (src/Extras/scheduled-message.ts).
//
// Low-level building blocks only: they encode / decode the conditional-reveal payload and
// check the scheduling window. They are NOT a job queue or a durable scheduler.
// Runs offline, no socket needed.
//
// Run: node assets/examples/scheduled_message.js
import {
	proto,
	encodeScheduledMessage,
	decodeScheduledMessage,
	isScheduledTimeValid,
	buildUnscheduleProtocolMessage,
	SCHEDULED_MSG_WINDOW
} from '@teamolduser/baileys'

// 1) Check the requested time against the supported window (chats: 10 min .. 14 days).
const scheduledAtSeconds = Math.floor(Date.now() / 1000) + 60 * 10 + 60
if (!isScheduledTimeValid(scheduledAtSeconds)) {
	throw new Error('The requested time is outside the supported scheduling window')
}

// Newsletters use a longer window (10 min .. 30 days).
console.log(
	'valid for a newsletter 20 days ahead:',
	isScheduledTimeValid(
		Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 20,
		Math.floor(Date.now() / 1000),
		SCHEDULED_MSG_WINDOW.newsletter
	)
)

// 2) Encode the content that is revealed later. Persist revealKey + revealKeyId securely.
const original = { conversation: 'This content is revealed later' }
const encoded = encodeScheduledMessage(original)

// 3) Decode it again with the reveal key. Never log or expose revealKey in real code.
const decoded = decodeScheduledMessage(encoded.message, encoded.revealKey)
console.log('decoded:', proto.Message.toObject(decoded), 'revealKeyId:', encoded.revealKeyId)

// 4) Cancel a scheduled message: protocol message that carries the original message key.
const unschedule = buildUnscheduleProtocolMessage({
	remoteJid: '6281234567890@s.whatsapp.net',
	fromMe: true,
	id: 'ABCDEF1234567890'
})
console.log('unschedule payload:', unschedule)
