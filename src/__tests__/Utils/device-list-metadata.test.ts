import { describe, expect, it } from '@jest/globals'
import { randomBytes } from 'crypto'
import { generateWAMessageFromContent } from '../../Utils/messages'

const userJid = '919876543210@s.whatsapp.net'

const withSecret = () => ({ conversation: 'hi', messageContextInfo: { messageSecret: randomBytes(32) } })

describe('deviceListMetadata on 1:1 messages', () => {
	it('adds the recipient device-list hash to a message that carries a message secret', () => {
		const info = generateWAMessageFromContent('919111111111@s.whatsapp.net', withSecret(), { userJid }).message
			?.messageContextInfo

		expect(info?.deviceListMetadataVersion).toBe(2)
		expect(info?.deviceListMetadata?.recipientKeyHash).toHaveLength(10)
		expect(Number(info?.deviceListMetadata?.recipientTimestamp)).toBeGreaterThan(1_700_000_000)
	})

	it('also does so for LID chats, with a fresh hash every time', () => {
		const first = generateWAMessageFromContent('123456789@lid', withSecret(), { userJid }).message?.messageContextInfo
		const second = generateWAMessageFromContent('123456789@lid', withSecret(), { userJid }).message?.messageContextInfo

		expect(first?.deviceListMetadata?.recipientKeyHash).toHaveLength(10)
		expect(
			Buffer.from(first!.deviceListMetadata!.recipientKeyHash!).equals(
				Buffer.from(second!.deviceListMetadata!.recipientKeyHash!)
			)
		).toBe(false)
	})

	it('leaves group messages and messages without a secret alone', () => {
		const group = generateWAMessageFromContent('120363000000000000@g.us', withSecret(), { userJid }).message
			?.messageContextInfo
		expect(group?.deviceListMetadata).toBeFalsy()

		const plain = generateWAMessageFromContent('919111111111@s.whatsapp.net', { conversation: 'hi' }, { userJid })
		expect(plain.message?.messageContextInfo).toBeFalsy()
	})
})
