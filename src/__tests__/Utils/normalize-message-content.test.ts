import { describe, expect, it } from '@jest/globals'
import { FUTURE_PROOF_MESSAGE_KEYS, normalizeMessageContent } from '../../Utils/messages'

describe('normalizeMessageContent', () => {
	it('unwraps every future-proof wrapper to the message inside', () => {
		for (const key of FUTURE_PROOF_MESSAGE_KEYS) {
			const content = { [key]: { message: { conversation: `inside ${key}` } } } as never
			expect(normalizeMessageContent(content)?.conversation).toBe(`inside ${key}`)
		}
	})

	it('covers the wrappers that used to leave `conversation` empty', () => {
		for (const key of [
			'statusMentionMessage',
			'questionMessage',
			'botInvokeMessage',
			'groupMentionedMessage',
			'newsletterScheduledMessage',
			'pollCreationMessageV4'
		]) {
			expect(FUTURE_PROOF_MESSAGE_KEYS).toContain(key)
		}
	})

	it('unwraps nested wrappers', () => {
		const content = {
			ephemeralMessage: { message: { viewOnceMessage: { message: { conversation: 'deep' } } } }
		} as never
		expect(normalizeMessageContent(content)?.conversation).toBe('deep')
	})

	it('returns plain content untouched and undefined for nothing', () => {
		const plain = { conversation: 'hi' }
		expect(normalizeMessageContent(plain)).toBe(plain)
		expect(normalizeMessageContent(undefined)).toBeUndefined()
		expect(normalizeMessageContent(null)).toBeUndefined()
	})
})
