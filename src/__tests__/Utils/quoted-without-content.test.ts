import { describe, expect, it, jest } from '@jest/globals'
import { generateWAMessageFromContent } from '../../Utils/messages'

const jid = '120363000000000000@g.us'
const userJid = '919876543210@s.whatsapp.net'

const makeLogger = () => ({ warn: jest.fn() })

describe('generateWAMessageFromContent with a quoted message that has no content', () => {
	it('sends without the quote and logs once, instead of throwing', () => {
		const logger = makeLogger()
		// `{ key }` built by hand: no `message` at all
		const quoted = { key: { remoteJid: jid, id: 'ABC123', fromMe: false } } as never

		const message = generateWAMessageFromContent(
			jid,
			{ conversation: 'hello' },
			{ userJid, quoted, logger: logger as never }
		)

		expect(message.message?.conversation).toBe('hello')
		expect(logger.warn).toHaveBeenCalledTimes(1)
		expect(logger.warn.mock.calls[0]?.[1]).toBe('nothing quotable here, sending without the quote')
	})

	it('treats a message that failed to decrypt the same way', () => {
		const logger = makeLogger()
		const quoted = { key: { remoteJid: jid, id: 'DEF456' }, messageStubType: 2 } as never

		expect(() =>
			generateWAMessageFromContent(
				jid,
				{ extendedTextMessage: { text: 'reply' } },
				{ userJid, quoted, logger: logger as never }
			)
		).not.toThrow()
		expect(logger.warn).toHaveBeenCalledTimes(1)
	})

	it('still quotes a message that has content', () => {
		const logger = makeLogger()
		const quoted = {
			key: { remoteJid: jid, id: 'GHI789', fromMe: false, participant: '919111111111@s.whatsapp.net' },
			message: { conversation: 'original' }
		} as never

		const message = generateWAMessageFromContent(
			jid,
			{ extendedTextMessage: { text: 'reply' } },
			{ userJid, quoted, logger: logger as never }
		)

		const context = message.message?.extendedTextMessage?.contextInfo
		expect(context?.stanzaId).toBe('GHI789')
		expect(context?.quotedMessage?.conversation).toBe('original')
		expect(logger.warn).not.toHaveBeenCalled()
	})
})
