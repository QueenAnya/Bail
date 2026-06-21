import EventEmitter from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import type { BaileysEventEmitter } from '../Types/index.js'
import { delay } from '../Utils/generics.js'
import { makeMutex } from '../Utils/make-mutex.js'

/**
 * Monkey-patches `ev.emit` to append every Baileys event as a JSON line
 * (NDJSON) to `filename`. Useful for debugging or replaying sessions.
 *
 * @example
 * captureEventStream(sock.ev, './events.ndjson')
 */
export function captureEventStream(ev: BaileysEventEmitter, filename: string): void {
	const originalEmit = ev.emit.bind(ev)
	const writeMutex = makeMutex()

	// eslint-disable-next-line func-style
	const patchedEmit: (...a: any[]) => boolean = function (event: any, ...rest: any[]) {
		const line = JSON.stringify({ timestamp: Date.now(), event, data: rest[0] }) + '\n'
		const result = (originalEmit as (...a: any[]) => boolean)(event, ...rest)
		void writeMutex.mutex(async () => {
			await writeFile(filename, line, { flag: 'a' })
		})
		return result
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	;(ev as any).emit = patchedEmit
}

/**
 * Reads an NDJSON file written by {@link captureEventStream} and replays
 * each event on a new EventEmitter.
 *
 * @param filename        Path to the NDJSON file.
 * @param delayIntervalMs Milliseconds to wait between events (default 0).
 * @returns `{ ev, task }` — ev is the emitter, task resolves when done.
 */
export const readAndEmitEventStream = (
	filename: string,
	delayIntervalMs = 0
): { ev: BaileysEventEmitter; task: Promise<void> } => {
	const ev = new EventEmitter() as BaileysEventEmitter

	const fireEvents = async () => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({ input: fileStream, crlfDelay: Infinity })

		for await (const line of rl) {
			if (!line.trim()) continue
			try {
				const { event, data } = JSON.parse(line)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				;(ev as any).emit(event, data)
				if (delayIntervalMs) await delay(delayIntervalMs)
			} catch {
				// skip malformed lines
			}
		}

		fileStream.destroy()
	}

	return { ev, task: fireEvents() }
}
