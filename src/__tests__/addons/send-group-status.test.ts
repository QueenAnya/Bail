import { jest } from '@jest/globals'
import { proto } from '../../../WAProto/index.js'

const generateWAMessage = jest.fn(async () => ({
	key: { id: 'TEST-GROUP-STATUS' },
	message: {
		extendedTextMessage: {
			text: 'Hello'
		}
	}
}))

jest.unstable_mockModule('../../Utils/messages.js', () => ({
	generateWAMessage
}))

describe('sendGroupStatus', () => {
	test('wraps generated message as groupStatusMessageV2 and sets isGroupStatus', async () => {
		const { sendGroupStatus } = await import('../../addons/send-group-status')

		const relayMessage = jest.fn(async () => undefined)
		const sock = {
			user: { id: '123@s.whatsapp.net' },
			logger: undefined,
			waUploadToServer: jest.fn(),
			relayMessage
		}

		const result = await sendGroupStatus(sock, '120363000000000000@g.us', { text: 'Hello' })

		expect(generateWAMessage).toHaveBeenCalledTimes(1)
		expect(relayMessage).toHaveBeenCalledTimes(1)
		const firstCall = relayMessage.mock.calls[0] as [string, proto.Message, { messageId: string }] | undefined
		expect(firstCall).toBeDefined()
		if (!firstCall) throw new Error('relayMessage was not called')
		const [, wrapped, options] = firstCall
		expect(wrapped).toBeInstanceOf(proto.Message)
		expect(wrapped.groupStatusMessageV2?.message?.extendedTextMessage?.contextInfo?.isGroupStatus).toBe(true)
		expect(options.messageId).toBe('TEST-GROUP-STATUS')
		expect(result.message?.groupStatusMessageV2).toBeDefined()
	})

	test('rejects a non-group JID', async () => {
		const { sendGroupStatus } = await import('../../addons/send-group-status')
		const sock = { user: { id: '123@s.whatsapp.net' }, waUploadToServer: jest.fn(), relayMessage: jest.fn() }

		await expect(sendGroupStatus(sock, '123@s.whatsapp.net', { text: 'Hello' })).rejects.toThrow('invalid group JID')
	})
})
