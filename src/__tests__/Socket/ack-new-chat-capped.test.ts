import { jest } from '@jest/globals'
import { EventEmitter } from 'events'
import { DEFAULT_CONNECTION_CONFIG } from '../../Defaults'
import type { AuthenticationState, SignalDataTypeMap, SocketConfig } from '../../Types'
import { initAuthCreds } from '../../Utils/auth-utils'
import type { ILogger } from '../../Utils/logger'

class MockWebSocketClient extends EventEmitter {
	public sent: Array<string | Uint8Array> = []
	private closed = false
	private closing = false

	constructor(
		public url: URL,
		public config: SocketConfig
	) {
		super()
	}

	get isOpen() {
		return !this.closed && !this.closing
	}

	get isClosed() {
		return this.closed
	}

	get isClosing() {
		return this.closing
	}

	get isConnecting() {
		return false
	}

	connect() {}

	async close() {
		if (this.closed) {
			return
		}

		this.closing = true
		this.closed = true
		this.closing = false
		this.emit('close')
	}

	send(data: string | Uint8Array, cb?: (err?: Error) => void) {
		this.sent.push(data)
		cb?.()
		return true
	}
}

const mockSockets: MockWebSocketClient[] = []
const createWebSocketClient = (url: URL, config: SocketConfig) => {
	const socket = new MockWebSocketClient(url, config)
	mockSockets.push(socket)
	return socket
}

jest.unstable_mockModule('../../Socket/Client/websocket', () => ({
	WebSocketClient: jest.fn<typeof createWebSocketClient>(createWebSocketClient)
}))

const { default: makeWASocket } = await import('../../Socket')
const { NACK_REASONS, SERVER_ERROR_CODES } = await import('../../Utils/decode-wa-message')

const makeAuthState = (): AuthenticationState => ({
	creds: initAuthCreds(),
	keys: {
		get: async <T extends keyof SignalDataTypeMap>(type: T, ids: string[]) => {
			void type
			void ids
			return {}
		},
		set: async data => {
			void data
		}
	}
})

type TestLogger = ILogger & {
	child: jest.MockedFunction<ILogger['child']>
	trace: jest.MockedFunction<ILogger['trace']>
	debug: jest.MockedFunction<ILogger['debug']>
	info: jest.MockedFunction<ILogger['info']>
	warn: jest.MockedFunction<ILogger['warn']>
	error: jest.MockedFunction<ILogger['error']>
}

const makeLogger = (): TestLogger => {
	const logger: TestLogger = {
		level: 'trace',
		child: jest.fn<ILogger['child']>(),
		trace: jest.fn<ILogger['trace']>(),
		debug: jest.fn<ILogger['debug']>(),
		info: jest.fn<ILogger['info']>(),
		warn: jest.fn<ILogger['warn']>(),
		error: jest.fn<ILogger['error']>()
	}

	logger.child.mockReturnValue(logger)

	return logger
}

describe('ack error 475 (new chat quota reached)', () => {
	it('exposes the codes', () => {
		expect(NACK_REASONS.NewChatMessagesCapped).toBe(475)
		expect(NACK_REASONS.StaleGroupAddressingMode).toBe(421)
		expect(SERVER_ERROR_CODES.NewChatMessagesCapped).toBe('475')
	})

	it('emits message-capping.update with the rejected message and does not treat it as a retryable nack', async () => {
		mockSockets.length = 0
		const logger = makeLogger()
		const sock = makeWASocket({
			...DEFAULT_CONNECTION_CONFIG,
			auth: makeAuthState(),
			logger,
			defaultQueryTimeoutMs: 1_000
		})
		const ws = mockSockets[0]!

		const updates: unknown[] = []
		sock.ev.on('message-capping.update', update => updates.push(update))

		ws.emit('CB:ack,class:message', {
			tag: 'ack',
			attrs: { class: 'message', id: 'MSG1', from: '919876543210@s.whatsapp.net', error: '475' }
		})
		await new Promise(resolve => setTimeout(resolve, 50))

		expect(updates).toEqual([{ capping_status: 'CAPPED', jid: '919876543210@s.whatsapp.net', messageId: 'MSG1' }])
		await sock.end(new Error('test complete'))
	})
})
