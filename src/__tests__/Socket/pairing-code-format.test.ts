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

describe('requestPairingCode phone number format', () => {
	beforeEach(() => {
		mockSockets.length = 0
		jest.clearAllMocks()
	})

	const reject = async (value: string) => {
		const sock = makeWASocket({
			...DEFAULT_CONNECTION_CONFIG,
			auth: makeAuthState(),
			logger: makeLogger(),
			defaultQueryTimeoutMs: 1_000,
			browser: ['Aidy Staging', 'Firefox', '120.0']
		})
		try {
			await expect(sock.requestPairingCode(value)).rejects.toMatchObject({
				message: expect.stringContaining('international format'),
				output: { statusCode: 400 }
			})
		} finally {
			await sock.end(new Error('test complete'))
		}
	}

	it('refuses a number with a leading 0 (national format)', async () => {
		await reject('0812345678')
	})

	it('refuses a number that is too short or too long', async () => {
		await reject('12345')
		await reject('1234567890123456')
	})

	it('refuses input without any digits', async () => {
		await reject('not a number')
		await reject('')
	})
})
