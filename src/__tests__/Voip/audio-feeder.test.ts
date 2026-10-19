import { jest } from '@jest/globals'
import { AudioFeeder } from '../../Voip/audio-feeder'

const SR = 16000
const CH = 1
const FRAMES = 320 // 20ms per chunk

describe('AudioFeeder', () => {
	jest.setTimeout(15000)
	const feeders: AudioFeeder[] = []
	const make = (...args: ConstructorParameters<typeof AudioFeeder>) => {
		const f = new AudioFeeder(...args)
		feeders.push(f)
		return f
	}

	afterEach(() => {
		for (const f of feeders.splice(0)) f.stop()
	})

	it('produces Float32Array chunks of framesPerChunk * channels', done => {
		let received = 0
		const feeder = make(SR, CH, FRAMES, chunk => {
			expect(chunk).toBeInstanceOf(Float32Array)
			expect(chunk.length).toBe(FRAMES * CH)
			if (++received >= 5) {
				feeder.stop()
				expect(feeder.chunksEmitted).toBeGreaterThanOrEqual(5)
				done()
			}
		})
		feeder.start()
	})

	it('durationMs stops emission and fires onEnd once', done => {
		const chunks: Float32Array[] = []
		let ends = 0
		const feeder = make(SR, CH, FRAMES, c => chunks.push(c), 'silence', true, {
			durationMs: 200,
			onEnd: () => {
				ends++
				expect(feeder.emittedDurationMs).toBeGreaterThanOrEqual(200)
				expect(chunks.length).toBeGreaterThanOrEqual(10)
				setTimeout(() => {
					expect(ends).toBe(1)
					done()
				}, 100)
			}
		})
		feeder.start()
	})

	it('stops around durationMs (no big overshoot)', done => {
		const feeder = make(SR, CH, FRAMES, () => {}, 'silence', true, {
			durationMs: 100,
			onEnd: () => {
				expect(feeder.emittedDurationMs).toBeGreaterThanOrEqual(100)
				expect(feeder.emittedDurationMs).toBeLessThanOrEqual(160)
				done()
			}
		})
		feeder.start()
	})

	it('exact duration execution (500ms => >= 25 chunks)', done => {
		const feeder = make(SR, CH, FRAMES, () => {}, 'silence', true, {
			durationMs: 500,
			onEnd: () => {
				expect(feeder.emittedDurationMs).toBeGreaterThanOrEqual(500)
				expect(feeder.chunksEmitted).toBeGreaterThanOrEqual(25)
				done()
			}
		})
		feeder.start()
	})

	it('stop() immediately halts emission and does not fire onEnd', done => {
		let afterStop = 0
		let stopped = false
		const onEnd = jest.fn()
		const feeder = make(
			SR,
			CH,
			FRAMES,
			() => {
				if (stopped) afterStop++
			},
			'silence',
			true,
			{ durationMs: 60000, onEnd }
		)
		feeder.start()
		setTimeout(() => {
			stopped = true
			feeder.stop()
			setTimeout(() => {
				expect(afterStop).toBe(0)
				expect(onEnd).not.toHaveBeenCalled()
				done()
			}, 100)
		}, 80)
	})

	it('missing audio file does not crash and ends via onEnd', done => {
		const chunks: number[] = []
		const feeder = make(SR, CH, FRAMES, c => chunks.push(c.length), 'nonexistent_audio_file.mp3', false, {
			onEnd: () => {
				expect(chunks.every(l => l === FRAMES * CH)).toBe(true)
				done()
			}
		})
		feeder.start()
	})

	it('without onEnd keeps legacy behaviour (no crash, stops emitting once ffmpeg exits)', done => {
		const feeder = make(SR, CH, FRAMES, () => {}, 'nonexistent_audio_file.mp3', false)
		feeder.start()
		setTimeout(() => {
			const n = feeder.chunksEmitted
			setTimeout(() => {
				expect(feeder.chunksEmitted).toBe(n)
				done()
			}, 200)
		}, 400)
	})
})
