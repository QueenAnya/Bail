import { jest } from '@jest/globals'
import { checkFfmpegAvailable, VideoFeeder } from '../../Voip/video-feeder'

describe('VideoFeeder', () => {
	jest.setTimeout(20000)
	const feeders: VideoFeeder[] = []
	const make = (...args: ConstructorParameters<typeof VideoFeeder>) => {
		const f = new VideoFeeder(...args)
		feeders.push(f)
		return f
	}

	afterEach(() => {
		for (const f of feeders.splice(0)) f.stop()
	})

	it('validates input and computes YUV420p dimensions', () => {
		expect(() => new VideoFeeder('', () => {})).toThrow('Video source is required')
		expect(() => new VideoFeeder('./nonexistent_video_file_123.mp4', () => {})).toThrow('Video source file not found')

		const f = make('lavfi:testsrc=size=320x240:rate=15', () => {}, null, null, { width: 320, height: 240, fps: 15 })
		expect(f.width).toBe(320)
		expect(f.height).toBe(240)
		expect(f.fps).toBe(15)
		expect(f.frameSizeBytes).toBe(320 * 240 * 1.5)
	})

	it('aligns odd width/height to even for YUV420p', () => {
		const f = make('lavfi:testsrc=size=321x241:rate=15', () => {}, null, null, { width: 321, height: 241 })
		expect(f.width).toBe(322)
		expect(f.height).toBe(242)
		expect(f.frameSizeBytes).toBe(322 * 242 * 1.5)
	})

	it('clamps fps to 1..60', () => {
		expect(make('lavfi:testsrc', () => {}, null, null, { fps: 500 }).fps).toBe(60)
		expect(make('lavfi:testsrc', () => {}, null, null, { fps: -3 }).fps).toBe(1)
		expect(make('lavfi:testsrc', () => {}, null, null, { fps: 0 }).fps).toBe(15) // unset -> default
	})

	it('streams real YUV420p frames from a synthetic source', async () => {
		if (!(await checkFfmpegAvailable())) {
			console.log('ffmpeg not on PATH, skipping live transcoding test')
			return
		}

		await new Promise<void>((resolve, reject) => {
			const width = 320
			const height = 240
			let frames = 0
			const feeder = make(
				'lavfi:testsrc=size=320x240:rate=15',
				(buf, w, h, fps) => {
					try {
						expect(Buffer.isBuffer(buf)).toBe(true)
						expect(buf.length).toBe(width * height * 1.5)
						expect([w, h, fps]).toEqual([width, height, 15])
						if (++frames >= 3) {
							feeder.stop()
							expect(feeder.framesEmitted).toBeGreaterThanOrEqual(3)
							expect(feeder.isRunning).toBe(false)
							resolve()
						}
					} catch (e) {
						reject(e)
					}
				},
				() => resolve(),
				err => reject(err),
				{ width, height, fps: 15 }
			)
			feeder.start()
		})
	})

	it('stops cleanly and releases the process', () => {
		const f = make('lavfi:testsrc=size=320x240:rate=15', () => {}, null, null, { width: 320, height: 240 })
		f.start()
		expect(f.isRunning).toBe(true)
		f.stop()
		expect(f.isRunning).toBe(false)
	})

	it('start() is idempotent while running', () => {
		const f = make('lavfi:testsrc=size=320x240:rate=15', () => {}, null, null, { width: 320, height: 240 })
		f.start()
		f.start()
		expect(f.isRunning).toBe(true)
		f.stop()
	})
})
