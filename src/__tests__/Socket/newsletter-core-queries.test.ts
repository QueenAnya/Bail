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

const mexCalls: { variables: Record<string, any>; queryId: string; dataPath: string }[] = []
let mexReply: (queryId: string, dataPath: string) => unknown = () => ({})

jest.unstable_mockModule('../../Socket/mex', () => ({
	wMexQuery: jest.fn(),
	executeWMexQuery: jest.fn(async (variables: Record<string, any>, queryId: string, dataPath: string) => {
		mexCalls.push({ variables, queryId, dataPath })
		return mexReply(queryId, dataPath)
	})
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

const lastCall = () => mexCalls[mexCalls.length - 1]!

describe('newsletter core queries use the live persisted-query ids', () => {
	let sock: ReturnType<typeof makeWASocket>

	beforeEach(() => {
		mockSockets.length = 0
		mexCalls.length = 0
		mexReply = () => ({})
		sock = makeWASocket({
			...DEFAULT_CONNECTION_CONFIG,
			auth: makeAuthState(),
			logger: makeLogger(),
			defaultQueryTimeoutMs: 1_000
		})
	})

	afterEach(async () => {
		await sock.end(new Error('test complete'))
	})

	it('creates a channel with the current CREATE id', async () => {
		mexReply = () => ({
			id: '1@newsletter',
			state: { type: 'ACTIVE' },
			thread_metadata: {
				creation_time: '1',
				description: { text: 'd' },
				invite: 'abc',
				name: { text: 'n' },
				picture: { id: 'p', direct_path: '/p' },
				subscribers_count: '3',
				verification: 'UNVERIFIED'
			},
			viewer_metadata: { mute: 'OFF', role: 'OWNER' }
		})
		const created = await sock.newsletterCreate('n', 'd')

		expect(lastCall()).toMatchObject({ queryId: '25149874324715067', dataPath: 'xwa2_newsletter_create' })
		expect(created).toMatchObject({ id: '1@newsletter', name: 'n', subscribers: 3 })
	})

	it('reads metadata with the full-image rule of the key type and the extra switches', async () => {
		mexReply = () => ({ id: '1@newsletter', name: 'n' })
		await sock.newsletterMetadata('jid', '1@newsletter')
		expect(lastCall()).toMatchObject({ queryId: '27456920720571478', dataPath: 'xwa2_newsletter' })
		expect(lastCall().variables).toMatchObject({
			fetch_creation_time: true,
			fetch_full_image: true,
			fetch_viewer_metadata: true,
			fetch_pinned_messages: false,
			input: { key: '1@newsletter', type: 'JID' }
		})

		await sock.newsletterMetadata('invite', 'CODE', { viewRole: 'GUEST', fetchPinnedMessages: true })
		expect(lastCall().variables).toMatchObject({
			fetch_full_image: false,
			fetch_pinned_messages: true,
			input: { key: 'CODE', type: 'INVITE', view_role: 'GUEST' }
		})
	})

	it('lists followers through the followers query', async () => {
		mexReply = () => ({
			followers: {
				edges: [
					{
						role: 'SUBSCRIBER',
						follow_time: '10',
						node: { id: 'u1@lid', pn: '919876543210', display_name: 'A', username_info: { username: 'a' } }
					}
				]
			}
		})
		const followers = await sock.newsletterSubscribers('1@newsletter', { count: 5 })

		expect(lastCall()).toMatchObject({ queryId: '27472091235714801', dataPath: 'xwa2_newsletter_followers' })
		expect(lastCall().variables).toEqual({ input: { newsletter_id: '1@newsletter', count: 5 } })
		expect(followers).toEqual([
			{
				id: 'u1@lid',
				phoneNumber: '919876543210',
				displayName: 'A',
				username: 'a',
				role: 'SUBSCRIBER',
				followTime: '10'
			}
		])
	})

	it('lists subscribed channels with the SUBSCRIBED id and the optional switches', async () => {
		await sock.newsletterSubscribed()
		expect(lastCall()).toMatchObject({ queryId: '25399611239711790', dataPath: 'xwa2_newsletter_subscribed' })
		expect(lastCall().variables).toEqual({ fetch_status_metadata: false, fetch_wamo_sub: false })

		await sock.newsletterSubscribed({ fetchStatusMetadata: true })
		expect(lastCall().variables).toEqual({ fetch_status_metadata: true, fetch_wamo_sub: false })

		await sock.newsletterFetchAllParticipating()
		expect(lastCall().queryId).toBe('25399611239711790')
	})

	it('mutes and unmutes through the user setting', async () => {
		mexReply = () => ({ id: '1@newsletter', state: { type: 'ACTIVE' } })

		expect(await sock.newsletterMute('1@newsletter')).toEqual({ id: '1@newsletter', state: 'ACTIVE' })
		expect(lastCall()).toMatchObject({
			queryId: '31938993655691868',
			dataPath: 'xwa2_newsletter_update_user_setting'
		})
		expect(lastCall().variables.input).toMatchObject({ newsletter_id: '1@newsletter', value: 'ON' })

		await sock.newsletterUnmute('1@newsletter')
		expect(lastCall().variables.input.value).toBe('OFF')
	})

	it('keeps the settings of an update instead of overwriting them with null', async () => {
		await sock.newsletterUpdate('1@newsletter', { settings: { reaction_codes: { value: 'ALL' } } } as never)
		expect(lastCall().variables.updates.settings).toEqual({ reaction_codes: { value: 'ALL' } })

		await sock.newsletterUpdateName('1@newsletter', 'new name')
		expect(lastCall().variables.updates).toEqual({ settings: null, name: 'new name' })
	})

	it('uses the current ids for admin count, change owner, demote and delete', async () => {
		mexReply = () => ({ admin_count: 2 })
		expect(await sock.newsletterAdminCount('1@newsletter')).toBe(2)
		expect(lastCall()).toMatchObject({ queryId: '26278439461859188', dataPath: 'xwa2_newsletter_admin' })

		await sock.newsletterChangeOwner('1@newsletter', '919876543210@s.whatsapp.net')
		expect(lastCall()).toMatchObject({ queryId: '9546742745432473', dataPath: 'xwa2_newsletter_change_owner' })

		await sock.newsletterDemote('1@newsletter', '919876543210@s.whatsapp.net')
		expect(lastCall()).toMatchObject({ queryId: '9880997548630971', dataPath: 'xwa2_newsletter_admin_demote' })

		await sock.newsletterDelete('1@newsletter')
		expect(lastCall()).toMatchObject({ queryId: '30062808666639665', dataPath: 'xwa2_newsletter_delete_v2' })
	})
})
