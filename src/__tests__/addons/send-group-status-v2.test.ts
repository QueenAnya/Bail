import { jest } from '@jest/globals'

const generateWAMessage = jest.fn(async (jid: unknown, content: unknown, options: { messageId?: string }) => ({
	key: { id: options?.messageId || 'TEST-GROUP-STATUS-V2' },
	message: {
		extendedTextMessage: {
			text: 'Hello'
		}
	}
}))

jest.unstable_mockModule('../../Utils/messages.js', () => ({
	generateWAMessage
}))

describe('sendGroupStatusV2', () => {
	test('wraps generated message as groupStatusMessageV2, sets isGroupStatus, and assigns a 4NY4W3B message id', async () => {
		const { sendGroupStatusV2 } = await import('../../addons/send-group-status-v2')

		const relayMessage = jest.fn(async () => undefined)
		const sock = {
			user: { id: '123@s.whatsapp.net' },
			logger: undefined,
			waUploadToServer: jest.fn(),
			relayMessage
		}

		const result = await sendGroupStatusV2(sock, '120363000000000000@g.us', { text: 'Hello' })

		expect(generateWAMessage).toHaveBeenCalledTimes(1)
		expect(relayMessage).toHaveBeenCalledTimes(1)

		const firstCall = relayMessage.mock.calls[0] as [string, any, { messageId: string }] | undefined
		expect(firstCall).toBeDefined()
		if (!firstCall) throw new Error('relayMessage was not called')

		const [, wrapped, options] = firstCall
		expect(wrapped.groupStatusMessageV2?.message?.extendedTextMessage?.contextInfo?.isGroupStatus).toBe(true)
		// unlike sendGroupStatus, V2 assigns its own 4NY4W3B-prefixed id rather
		// than reusing generateWAMessage's id, when the caller gives none.
		expect(options.messageId).toMatch(/^4NY4W3B[0-9A-F]{18}$/)
		expect(result.message?.groupStatusMessageV2).toBeDefined()
		expect(result.key.id).toBe(options.messageId)
	})

	test('keeps a caller-supplied messageId instead of generating one', async () => {
		const { sendGroupStatusV2 } = await import('../../addons/send-group-status-v2')

		const relayMessage = jest.fn(async () => undefined)
		const sock = { user: { id: '123@s.whatsapp.net' }, waUploadToServer: jest.fn(), relayMessage }

		await sendGroupStatusV2(sock, '120363000000000000@g.us', { text: 'Hello' }, { messageId: 'CUSTOM-ID' })

		const secondCall = relayMessage.mock.calls[0] as [string, any, { messageId: string }] | undefined
		if (!secondCall) throw new Error('relayMessage was not called')
		expect(secondCall[2].messageId).toBe('CUSTOM-ID')
	})

	test('rejects a non-group JID', async () => {
		const { sendGroupStatusV2 } = await import('../../addons/send-group-status-v2')
		const sock = { user: { id: '123@s.whatsapp.net' }, waUploadToServer: jest.fn(), relayMessage: jest.fn() }

		await expect(sendGroupStatusV2(sock, '123@s.whatsapp.net', { text: 'Hello' })).rejects.toThrow(
			'groupStatus can only be sent to a group JID'
		)
	})

	test('rejects when the socket is not yet authenticated', async () => {
		const { sendGroupStatusV2 } = await import('../../addons/send-group-status-v2')
		const sock = { user: undefined, waUploadToServer: jest.fn(), relayMessage: jest.fn() }

		await expect(sendGroupStatusV2(sock, '120363000000000000@g.us', { text: 'Hello' })).rejects.toThrow(
			'Socket is not authenticated yet'
		)
	})
})
