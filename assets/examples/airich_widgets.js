// AIRich widgets + A2UI / AIRichMessage usage (synced from elaina-baileys).
//
//   - addHtmlCard, addSelectableText, addQuiz, addComparisonTable, addSports
//     come from elaina-baileys commit f025122 ("tambah primitive baru 2.26.39.3").
//   - sendA2UIBloks / AIRichMessage come from the elaina-baileys 15-oct and 21-oct updates.
//
// All of these are experimental WhatsApp payloads: whether a client draws them depends on
// the account, platform and rollout, so test on your own account before relying on them.
//
// Run: node assets/examples/airich_widgets.js 6281234567890
import crypto from 'crypto'
import pino from 'pino'
import makeWASocket, { MB, useMultiFileAuthState } from '@teamolduser/baileys'

const target = process.argv[2]
if (!target) {
	console.error('Usage: node airich_widgets.js <phone number in international format>')
	process.exit(1)
}

const jid = `${target}@s.whatsapp.net`
const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state, logger: pino({ level: 'silent' }) })
sock.ev.on('creds.update', saveCreds)

// Ways to create the builder:
//   new MB.AIRich(sock) / new AIRich(sock)   as in elaina-baileys, socket as the first argument
//   new sock.AIRich() / new sock.MB.AIRich() bound to the socket, no sock argument

const widgets = async () => {
	// One AIRich message can hold every widget; each add* method returns the builder.
	await new sock.AIRich()
		.setTitle('AIRich widgets')
		.setFooter('elaina-baileys f025122')
		.addText('HTML card, selectable text, quiz, comparison table and a sports widget:')
		// width/height/mimeType/cardType/sandbox are optional (defaults: text/html, 300x200).
		.addHtmlCard('<h1 style="font-family:sans-serif">Hello</h1><p>Rendered by GenAIHtmlCardPrimitive</p>', {
			width: 320,
			height: 160
		})
		// Plain text the user can select; selectionId is optional.
		.addSelectableText('Select me', { selectionId: 'sel-1' })
		// Options can be plain strings (wrong answers) or { text, correct } objects.
		.addQuiz('What is 2 + 2?', ['3', { text: '4', correct: true }, '5'], { explanation: '2 + 2 = 4' })
		// Rows can be arrays (wrapped into { cells }) or ready-made row objects.
		.addComparisonTable(
			['Feature', 'Anya', 'Elaina'],
			[
				['Language', 'TypeScript', 'JavaScript'],
				['Package manager', 'yarn', 'npm']
			],
			{ highlightLabel: 'Anya' }
		)
		// One game -> single card, several games -> HScroll. `league` is the default for each game.
		.addSports([{ home: 'Team A', away: 'Team B' }, { home: 'Team C', away: 'Team D' }], { league: 'NBA' })
		// Every add* method also accepts { id, replace, insertAt } as the last option.
		.send(jid)
}

const a2ui = async () => {
	// Ready-made element: the shape Android actually knows (info_card / list_card).
	await sock.MB.sendA2UI(jid, [], {
		type: 'im_a2ui',
		uuid: crypto.randomUUID(),
		fallback: 'MENU\nPick a category below.',
		data: MB.a2uiInfoCard({ title: 'MENU', body: 'Pick a category below.' })
	})

	// The same card sent through a rich response (bloksSection).
	await sock.MB.sendA2UIBloks(jid, [MB.a2uiColumn('root', ['t1']), MB.a2uiText('t1', 'Hello from A2UI')], {
		uuid: crypto.randomUUID()
	})
}

const richMessage = async () => {
	// AIRichMessage keeps the forwarding context (botMessageSharingInfo / forwardScore) the official client sets.
	await sock.MB.sendAIRichMessage(jid, {
		text: 'Hello from AIRichMessage',
		submessages: [
			MB.AIRichMessage.inlineImage({ previewUrl: 'https://example.com/y.jpg', highResUrl: 'https://example.com/y-hi.jpg' }),
			MB.AIRichMessage.table({ rows: [{ items: ['Price', '10'], isHeading: true }] })
		]
	})
}

sock.ev.on('connection.update', async ({ connection }) => {
	if (connection !== 'open') return
	for (const run of [widgets, a2ui, richMessage]) {
		try {
			await run()
		} catch (error) {
			console.error(`${run.name} failed:`, error)
		}
	}
	process.exit(0)
})
