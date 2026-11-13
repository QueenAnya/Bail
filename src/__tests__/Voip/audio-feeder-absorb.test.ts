import { describe, expect, it } from '@jest/globals'
import { AudioFeeder } from '../../Voip/audio-feeder'

const FRAMES = 320
const CHUNK_BYTES = FRAMES * Float32Array.BYTES_PER_ELEMENT

const ramp = (bytes: number, start = 0) => {
	const floats = new Float32Array(bytes / Float32Array.BYTES_PER_ELEMENT)
	for (let i = 0; i < floats.length; i++) floats[i] = start + i
	return Buffer.from(floats.buffer, floats.byteOffset, bytes)
}

describe('AudioFeeder chunk assembly', () => {
	it('keeps ffmpeg reads of any size in order across chunk boundaries', () => {
		const feeder: any = new AudioFeeder(16000, 1, FRAMES, () => {})

		feeder._absorb(ramp(CHUNK_BYTES / 2, 0))
		expect(feeder.queuedChunks).toBe(0) // half a chunk is not emitted early
		expect(feeder._pendingBytes).toBe(CHUNK_BYTES / 2)

		feeder._absorb(ramp(CHUNK_BYTES / 2, FRAMES / 2)) // completes chunk 0 exactly at the seam
		expect(feeder.queuedChunks).toBe(1)
		expect(feeder._queue[0][0]).toBe(0)
		expect(feeder._queue[0][FRAMES - 1]).toBe(FRAMES - 1)

		// three odd sized reads (7, 1000 and 300 floats) that straddle the next boundaries
		feeder._absorb(ramp(7 * 4, FRAMES))
		feeder._absorb(ramp(1000 * 4, FRAMES + 7))
		feeder._absorb(ramp(300 * 4, FRAMES + 1007))
		const all = feeder._queue.flatMap((chunk: Float32Array) => Array.from(chunk))
		expect(all.every((value: number, index: number) => value === index)).toBe(true) // one unbroken ramp
		expect(feeder.queuedChunks).toBe(5) // 1627 floats absorbed -> 5 whole chunks
		expect(feeder._pendingBytes).toBe((1627 % FRAMES) * 4) // the 27 floats left over wait for the next read
	})
})
