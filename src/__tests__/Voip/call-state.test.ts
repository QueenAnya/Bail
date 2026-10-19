import { jest } from '@jest/globals'
import { CallState } from '../../Voip/types'
import { ActiveCall } from '../../Voip/voip-engine'

const mockEngine = () =>
	({
		endCall: jest.fn(),
		setMute: jest.fn(),
		malloc: jest.fn(() => 1024),
		free: jest.fn(),
		sendAudioData: jest.fn(),
		sendVideoFrame: jest.fn(),
		startCall: jest.fn()
	}) as any

// ActiveCall(callId, peerJid, engine, durationMs, phoneNumber?, preRingingTimeoutMs?)
const makeCall = (id: string, jid: string, o: { durationMs?: number; preRingingTimeoutMs?: number } = {}) =>
	new ActiveCall(id, jid, mockEngine(), o.durationMs ?? 5000, jid, o.preRingingTimeoutMs ?? 5000)

describe('ActiveCall lifecycle & state sync', () => {
	jest.setTimeout(10000)

	it('ringing -> accepted -> connected -> ended', async () => {
		const call = makeCall('CALL123', '1234567890@s.whatsapp.net')
		const history: string[] = []
		const fired = { ringing: false, accepted: false, connected: false }
		call.on('stateChange', s => history.push(s))
		call.on('ringing', () => (fired.ringing = true))
		call.on('accepted', () => (fired.accepted = true))
		call.on('connected', () => (fired.connected = true))

		call._updateState(CallState.PreacceptReceived)
		expect(call.status).toBe('ringing')
		call._updateState(CallState.AcceptReceived)
		expect(call.status).toBe('accepted')
		call._updateState(CallState.Active)
		expect(call.status).toBe('connected')
		expect(call.connectedAt).toBeGreaterThan(0)

		call.end()
		expect(await call.waitForEnd()).toBe('completed')
		expect(fired).toEqual({ ringing: true, accepted: true, connected: true })
		expect(history).toEqual(['ringing', 'accepted', 'connected', 'ending', 'ended'])
		expect(call.ended).toBe(true)
		expect(call.status).toBe('ended')
	})

	it('unreachable recipient fails without ringing/connected/audio events', async () => {
		const call = makeCall('CALL456', '9999999999@s.whatsapp.net')
		const seen: string[] = []
		for (const e of ['ringing', 'connected', 'audioReady', 'streaming']) call.on(e, () => seen.push(e))

		call._handleSignalingError('offer', 'unreachable')

		expect(await call.waitForEnd()).toBe('unreachable')
		expect(call.status).toBe('unreachable')
		expect(seen).toEqual([])
	})

	it.each([['error_404'], ['error_480']])('%s maps to unreachable', async type => {
		const call = makeCall('C', '1@s.whatsapp.net')
		call._handleSignalingError('offer', type)
		expect(await call.waitForEnd()).toBe('unreachable')
	})

	it('ack_timeout maps to timeout; unknown signaling error maps to failed (+error event)', async () => {
		const a = makeCall('A', '1@s.whatsapp.net')
		a._handleSignalingError('offer', 'ack_timeout')
		expect(await a.waitForEnd()).toBe('timeout')
		expect(a.status).toBe('timeout')

		const b = makeCall('B', '2@s.whatsapp.net')
		const onError = jest.fn()
		b.on('error', onError)
		b._handleSignalingError('offer', 'weird')
		expect(await b.waitForEnd()).toBe('signaling error (weird)')
		expect(b.status).toBe('failed')
		expect(onError).toHaveBeenCalledTimes(1)
	})

	it('pre-ringing timeout ends as unreachable if remote never rings', async () => {
		const call = makeCall('CALL789', '8888888888@s.whatsapp.net', { preRingingTimeoutMs: 100 })
		const seen: string[] = []
		call.on('ringing', () => seen.push('ringing'))
		call.on('connected', () => seen.push('connected'))

		expect(await call.waitForEnd()).toBe('unreachable')
		expect(call.status).toBe('unreachable')
		expect(seen).toEqual([])
	})

	it('pre-ringing timeout is cancelled once the remote rings', async () => {
		const call = makeCall('RING', '1@s.whatsapp.net', { preRingingTimeoutMs: 150 })
		call._updateState(CallState.PreacceptReceived)
		await new Promise(r => setTimeout(r, 300))
		expect(call.ended).toBe(false)
		expect(call.status).toBe('ringing')
		call.end()
	})

	it('rejection transitions to rejected without connected/streaming', async () => {
		const call = makeCall('CALL_REJ', '7777777777@s.whatsapp.net')
		const seen: string[] = []
		call.on('connected', () => seen.push('connected'))
		call.on('streaming', () => seen.push('streaming'))

		call._updateState(CallState.PreacceptReceived)
		call._handleSignalingEvent('reject', 'rejected')

		expect(await call.waitForEnd()).toBe('rejected')
		expect(call.status).toBe('rejected')
		expect(seen).toEqual([])
	})

	it.each([
		['unavailable', 'unreachable'],
		['peer_offline', 'unreachable'],
		['timeout', 'timeout'],
		['declined', 'rejected'],
		['something_else', 'something_else']
	])('terminate reason "%s" ends as "%s"', async (reason, expected) => {
		const call = makeCall('T', '1@s.whatsapp.net')
		call._handleSignalingEvent('terminate', reason)
		expect(await call.waitForEnd()).toBe(expected)
	})

	it('WASM Idle/Ending state forces end', async () => {
		const call = makeCall('W', '1@s.whatsapp.net')
		call._updateState(CallState.Ending)
		expect(await call.waitForEnd()).toBe('ended')
	})

	it('durationMs auto-hangs up with "completed" and signals engine.endCall', async () => {
		const engine = mockEngine()
		const call = new ActiveCall('DUR', '1@s.whatsapp.net', engine, 60, '1@s.whatsapp.net', 0)
		expect(await call.waitForEnd()).toBe('completed')
		expect(engine.endCall).toHaveBeenCalledTimes(1)
	})

	it('remote_end / rejected do NOT re-signal engine.endCall', async () => {
		const engine = mockEngine()
		const call = new ActiveCall('R', '1@s.whatsapp.net', engine, 5000, '1@s.whatsapp.net', 0)
		call.end('remote_end')
		expect(engine.endCall).not.toHaveBeenCalled()
	})

	it('end() is idempotent and ignores later signaling', async () => {
		const call = makeCall('IDEM', '1@s.whatsapp.net')
		const onEnded = jest.fn()
		call.on('ended', onEnded)
		call.end()
		call.end('again')
		call._handleSignalingEvent('terminate', 'timeout')
		expect(onEnded).toHaveBeenCalledTimes(1)
		expect(call.status).toBe('ended')
	})

	it('consecutive calls do not leak timers or state', async () => {
		const c1 = makeCall('CALL_1', '111@s.whatsapp.net', { durationMs: 50 })
		c1._updateState(CallState.Active)
		c1.end()
		await c1.waitForEnd()
		expect(c1.ended).toBe(true)

		const c2 = makeCall('CALL_2', '222@s.whatsapp.net', { durationMs: 50 })
		expect(c2.ended).toBe(false)
		expect(c2.status).toBe('initiating')
		expect(c2.callId).toBe('CALL_2')
		c2.end()
		await c2.waitForEnd()
		expect(c2.ended).toBe(true)
	})
})
