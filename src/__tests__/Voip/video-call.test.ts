import { jest } from '@jest/globals'
import { spawnSync } from 'node:child_process'
import { ActiveCall } from '../../Voip/voip-engine'

const hasFfmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0
const itFfmpeg = hasFfmpeg ? it : it.skip

const mockEngine = () =>
	({
		malloc: jest.fn(() => 1000),
		free: jest.fn(),
		sendAudioData: jest.fn(),
		sendVideoFrame: jest.fn(),
		endCall: jest.fn(),
		setMute: jest.fn()
	}) as any

/** mirrors what initiateCall() does when opts.isVideo is set */
const makeVideoCall = (
	id: string,
	jid: string,
	engine: any,
	o: { src?: string; w?: number; h?: number; fps?: number; horizontal?: boolean; orientation?: number } = {}
) => {
	const call = new ActiveCall(id, jid, engine, 5000, jid, 0)
	call.isVideo = true
	call._videoSource = o.src ?? 'lavfi:testsrc=size=320x240:rate=15'
	call._videoWidth = o.w ?? 640
	call._videoHeight = o.h ?? 480
	call._videoFps = o.fps ?? 15
	call.isHorizontal = Boolean(o.horizontal)
	call._videoOrientation = o.orientation ?? (call.isHorizontal ? 2 : 0)
	return call
}

describe('Video call lifecycle & concurrency', () => {
	jest.setTimeout(20000)

	it('summary reflects video config', () => {
		const call = makeVideoCall('VID_OK', '123@s.whatsapp.net', mockEngine())
		const s = call.getSummary()
		expect(call.isVideo).toBe(true)
		expect(s.isVideo).toBe(true)
		expect(s.videoSource).toBe('lavfi:testsrc=size=320x240:rate=15')
		call.end()
	})

	it('startVideo is a no-op for audio-only calls (no _videoSource)', () => {
		const call = new ActiveCall('AUDIO', '1@s.whatsapp.net', mockEngine(), 5000, '1@s.whatsapp.net', 0)
		const onStarted = jest.fn()
		call.on('videoStarted', onStarted)
		call.startVideo(1000)
		expect(onStarted).not.toHaveBeenCalled()
		expect(call.videoFeeder).toBeNull()
		call.end()
	})

	itFfmpeg('streams frames to engine.sendVideoFrame and emits videoStarted', async () => {
		const engine = mockEngine()
		const call = makeVideoCall('STREAM', '123@s.whatsapp.net', engine, { w: 320, h: 240 })
		const onStarted = jest.fn()
		call.on('videoStarted', onStarted)

		engine.sendVideoFrame.mockImplementation(() => {
			call.stopVideo()
		})

		call.startVideo(1000)
		expect(onStarted).toHaveBeenCalledTimes(1)

		const start = Date.now()
		while (engine.sendVideoFrame.mock.calls.length === 0 && Date.now() - start < 10000) {
			await new Promise(r => setTimeout(r, 25))
		}

		expect(engine.sendVideoFrame).toHaveBeenCalled()
		const [buf, ptr, w, h, fps] = engine.sendVideoFrame.mock.calls[0] as any[]
		expect(Buffer.isBuffer(buf)).toBe(true)
		expect(buf.length).toBe(320 * 240 * 1.5)
		expect([ptr, w, h, fps]).toEqual([1000, 320, 240, 15])
		expect(call.videoFeeder).toBeNull()

		call.end('completed')
		expect(call.ended).toBe(true)
	})

	it('startVideo twice does not create a second feeder', () => {
		const call = makeVideoCall('TWICE', '1@s.whatsapp.net', mockEngine(), { w: 320, h: 240 })
		call.startVideo(1)
		const first = call.videoFeeder
		call.startVideo(1)
		expect(call.videoFeeder).toBe(first)
		call.end()
	})

	it('concurrent video calls have isolated feeders and state', () => {
		const e1 = mockEngine()
		const e2 = mockEngine()
		const c1 = makeVideoCall('VID_1', '111@s.whatsapp.net', e1, { w: 320, h: 240 })
		const c2 = makeVideoCall('VID_2', '222@s.whatsapp.net', e2, {
			w: 640,
			h: 480,
			src: 'lavfi:testsrc=size=640x480:rate=15'
		})

		expect([c1._videoWidth, c2._videoWidth]).toEqual([320, 640])
		c1.startVideo(1)
		c2.startVideo(2)
		expect(c1.videoFeeder).not.toBeNull()
		expect(c1.videoFeeder).not.toBe(c2.videoFeeder)
		expect(c1.videoFeeder!.width).toBe(320)
		expect(c2.videoFeeder!.width).toBe(640)

		c1.end('completed')
		expect(c1.videoFeeder).toBeNull()
		expect(c2.videoFeeder).not.toBeNull() // untouched
		expect(c2.ended).toBe(false)
		c2.end('completed')
		expect([c1.ended, c2.ended]).toEqual([true, true])
	})

	it('end() stops the video feeder', () => {
		const call = makeVideoCall('END', '1@s.whatsapp.net', mockEngine(), { w: 320, h: 240 })
		call.startVideo(1)
		expect(call.videoFeeder?.isRunning).toBe(true)
		call.end()
		expect(call.videoFeeder).toBeNull()
	})

	it('orientation fields are reported in the summary', () => {
		const v = makeVideoCall('V', '1@s.whatsapp.net', mockEngine())
		expect([v.isHorizontal, v._videoOrientation]).toEqual([false, 0])
		expect([v.getSummary().isHorizontal, v.getSummary().videoOrientation]).toEqual([false, 0])
		v.end()

		const h = makeVideoCall('H', '2@s.whatsapp.net', mockEngine(), { horizontal: true })
		expect([h.isHorizontal, h._videoOrientation]).toEqual([true, 2])
		expect([h.getSummary().isHorizontal, h.getSummary().videoOrientation]).toEqual([true, 2])
		h.end()

		const r = makeVideoCall('R', '3@s.whatsapp.net', mockEngine(), { orientation: 1 })
		expect(r.getSummary().videoOrientation).toBe(1)
		r.end()
	})

	it('a bad video source surfaces as videoError instead of throwing', () => {
		const call = makeVideoCall('BAD', '1@s.whatsapp.net', mockEngine(), { src: './does_not_exist_123.mp4' })
		const onErr = jest.fn()
		call.on('videoError', onErr)
		expect(() => call.startVideo(1)).not.toThrow()
		expect(onErr).toHaveBeenCalledTimes(1)
		expect(call.videoFeeder).toBeNull()
		call.end()
	})
})
