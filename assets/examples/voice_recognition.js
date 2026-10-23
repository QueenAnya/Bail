// Voice transcription + wake-phrase events (src/Extras/voice-recognition.ts).
//
// Opt-in: the library downloads eligible incoming voice notes and hands the audio buffer to
// YOUR transcribe() callback. No speech-to-text service is bundled.
// Set limits (pttOnly, maxDuration, maxBytes) before enabling this in groups.
//
// Run: node assets/examples/voice_recognition.js
import pino from 'pino'
import makeWASocket, { bindVoiceRecognition, useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }) })
sock.ev.on('creds.update', saveCreds)

// Placeholder: call your own speech-to-text service here.
// Return a string or { text: 'recognized words' }.
const yourTranscriptionFunction = async (buffer, mimetype) => {
	console.log(`got ${buffer.length} bytes of ${mimetype}`)
	return 'hey anya what time is it'
}

const unbindVoice = bindVoiceRecognition(sock, {
	// Optional: lets the binding re-load messages by key (use your own store here).
	getMessage: async () => undefined,
	voiceRecognition: {
		enabled: true,
		pttOnly: true, // only voice notes, not music/audio files
		maxDuration: 60, // seconds
		maxBytes: 16 * 1024 * 1024,
		allowFromMe: false,
		wakePhrases: ['hey anya', 'okay anya'],
		// Optional: skip chats / senders before anything is downloaded.
		shouldProcess: async ({ isGroup }) => !isGroup,
		transcribe: async ({ buffer, mimetype }) => yourTranscriptionFunction(buffer, mimetype)
	}
})

sock.ev.on('voice.transcription', event => {
	console.log('Transcript:', event.transcript)
})
sock.ev.on('voice.command', event => {
	console.log('Activation:', event.activation, 'Command:', event.commandText)
})

// When shutting down or disabling the feature:
process.on('SIGINT', () => {
	unbindVoice()
	process.exit(0)
})
