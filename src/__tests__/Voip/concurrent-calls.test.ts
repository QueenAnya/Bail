import { jest } from '@jest/globals'
import { AudioFeeder } from '../../Voip/audio-feeder'
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

const mk = (id: string, jid: string, durationMs = 5000, engine = mockEngine()) =>
	new ActiveCall(id, jid, engine, durationMs, jid, 0)

const ring = (c: ActiveCall) => c._updateState(CallState.PreacceptReceived)
const accept = (c: ActiveCall) => c._updateState(CallState.AcceptReceived)
const connect = (c: ActiveCall) => c._updateState(CallState.Active)

describe('Concurrent outgoing VoIP calls', () => {
	jest.setTimeout(15000)

	it('single call baseline', async () => {
		const call = mk('CALL_SINGLE', '1111111111@s.whatsapp.net', 2000)
		expect(call.status).toBe('initiating')
		expect(call.ended).toBe(false)

		ring(call)
		expect(call.status).toBe('ringing')
		connect(call)
		expect(call.status).toBe('connected')
		expect(call.connectedAt).toBeGreaterThan(0)

		const summary = call.getSummary()
		expect(summary.id).toBe('CALL_SINGLE')
		expect(summary.status).toBe('connected')

		call.end()
		await call.waitForEnd()
		expect(call.status).toBe('ended')
	})

	it('two concurrent calls progress independently', async () => {
		const a = mk('CALL_A', '1000000001@s.whatsapp.net')
		const b = mk('CALL_B', '1000000002@s.whatsapp.net')

		ring(a)
		expect([a.status, b.status]).toEqual(['ringing', 'initiating'])
		connect(b)
		expect([a.status, b.status]).toEqual(['ringing', 'connected'])
		connect(a)
		expect([a.status, b.status]).toEqual(['connected', 'connected'])

		a.end()
		await a.waitForEnd()
		expect([a.ended, b.ended]).toEqual([true, false])
		b.end()
		await b.waitForEnd()
		expect(b.ended).toBe(true)
	})

	it('five concurrent calls hold distinct states', () => {
		const calls = Array.from({ length: 5 }, (_, i) => mk(`CALL_${i + 1}`, `900000000${i + 1}@s.whatsapp.net`))
		calls.forEach((c, i) => {
			expect(c.callId).toBe(`CALL_${i + 1}`)
			expect(c.ended).toBe(false)
		})

		ring(calls[0]!)
		accept(calls[1]!)
		connect(calls[2]!)
		calls[3]!._handleSignalingError('offer', 'unreachable')

		expect(calls.map(c => c.status)).toEqual(['ringing', 'accepted', 'connected', 'unreachable', 'initiating'])
		calls.forEach(c => c.end())
	})

	it('failure isolation: one call failing leaves others active', () => {
		const a = mk('FAIL_A', '2000000001@s.whatsapp.net')
		const b = mk('ACTIVE_B', '2000000002@s.whatsapp.net')
		const c = mk('ACTIVE_C', '2000000003@s.whatsapp.net')
		ring(a)
		connect(b)
		connect(c)

		let reason: string | null = null
		a.on('ended', r => (reason = r))
		a._handleSignalingError('offer', 'unreachable')

		expect(a.ended).toBe(true)
		expect(reason).toBe('unreachable')
		expect(a.status).toBe('unreachable')
		expect([b.ended, b.status]).toEqual([false, 'connected'])
		expect([c.ended, c.status]).toEqual([false, 'connected'])
		b.end()
		c.end()
	})

	it('early termination isolation', async () => {
		const a = mk('END_A', '3000000001@s.whatsapp.net')
		const b = mk('CONT_B', '3000000002@s.whatsapp.net')
		connect(a)
		connect(b)
		a.end('completed')
		await a.waitForEnd()
		expect([a.ended, b.ended, b.status]).toEqual([true, false, 'connected'])
		b.end()
	})

	it('per-call engines are isolated (endCall hits only its own engine)', () => {
		const e1 = mockEngine()
		const e2 = mockEngine()
		const a = mk('E1', '1@s.whatsapp.net', 5000, e1)
		const b = mk('E2', '2@s.whatsapp.net', 5000, e2)
		a.end()
		expect(e1.endCall).toHaveBeenCalledTimes(1)
		expect(e2.endCall).not.toHaveBeenCalled()
		b.mute(true)
		expect(e2.setMute).toHaveBeenCalledWith(true)
		expect(e1.setMute).not.toHaveBeenCalled()
		b.end()
	})

	it('cross-call audio isolation: independent AudioFeeders & durations', async () => {
		const chunksA: Float32Array[] = []
		const chunksB: Float32Array[] = []
		const callA = mk('AUD_A', '4000000001@s.whatsapp.net', 150)
		const callB = mk('AUD_B', '4000000002@s.whatsapp.net', 400)
		connect(callA)
		connect(callB)

		// in tb the AudioFeeder is owned by the engine wiring, one per call
		const fA = new AudioFeeder(16000, 1, 320, c => chunksA.push(c), 'silence', true, { durationMs: 150 })
		const fB = new AudioFeeder(16000, 1, 320, c => chunksB.push(c), 'silence', true, { durationMs: 400 })
		fA.start()
		fB.start()

		await callA.waitForEnd()
		expect(callA.ended).toBe(true)
		expect(callB.ended).toBe(false)

		await callB.waitForEnd()
		fA.stop()
		fB.stop()
		expect(chunksA.length).toBeGreaterThan(0)
		expect(chunksB.length).toBeGreaterThan(chunksA.length)
	})

	it('getSummary() exposes safe public descriptors only', () => {
		const call = mk('CALL_SAFE', '6000000001@s.whatsapp.net', 45000)
		call._audioSource = './test.mp3'
		call._repeatAudio = true

		const s: any = call.getSummary()
		expect(s.id).toBe('CALL_SAFE')
		expect(s.jid).toBe('6000000001@s.whatsapp.net')
		expect(s.status).toBe('initiating')
		expect(s.state).toBe(CallState.Idle)
		expect(s.audioSource).toBe('./test.mp3')
		expect(s.durationMs).toBe(45000)
		expect(s.repeatAudio).toBe(true)
		expect(s.startedAt).toBeGreaterThan(0)
		expect(s.connectedAt).toBeNull()
		expect(s.endedAt).toBeNull()
		expect(s.engine).toBeUndefined()
		expect(s.audioFeeder).toBeUndefined()
		expect(s.timers).toBeUndefined()
		call.end()
	})

	it('_forceEnd("disconnect") ends a call without engine.endCall', async () => {
		const e = mockEngine()
		const call = mk('DISC', '1@s.whatsapp.net', 5000, e)
		call._forceEnd('disconnect')
		expect(await call.waitForEnd()).toBe('disconnect')
		expect(e.endCall).not.toHaveBeenCalled()
	})
})
