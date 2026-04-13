import EventEmitter from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import { delay } from './generics'
import { makeMutex } from './make-mutex'
import type { BaileysEventEmitter } from '../Types'

/**
 * Captures events from a Baileys event emitter and appends them to a file.
 * Useful for replaying events during debugging.
 *
 * @param ev       - The Baileys event emitter
 * @param filename - File path to append events to
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const oldEmit = ev.emit.bind(ev)
	const writeMutex = makeMutex()

	// Monkey-patch emit to capture all events
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ev.emit = function (...args: [string, ...any[]]): boolean {
		const content = JSON.stringify({ timestamp: Date.now(), event: args[0], data: args[1] }) + '\n'
		const result = oldEmit(...args)
		writeMutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result
	}
}

/**
 * Read a previously captured event stream file and re-emit all events.
 *
 * @param filename        - Path to the captured event file
 * @param delayIntervalMs - Delay (ms) between each event emit
 * @returns `{ ev, task }` — an EventEmitter and the async task promise
 */
export const readAndEmitEventStream = (
	filename: string,
	delayIntervalMs = 0
): { ev: EventEmitter; task: Promise<void> } => {
	const ev = new EventEmitter()

	const fireEvents = async (): Promise<void> => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({ input: fileStream, crlfDelay: Infinity })

		for await (const line of rl) {
			if (line) {
				const { event, data } = JSON.parse(line)
				ev.emit(event, data)
				if (delayIntervalMs) await delay(delayIntervalMs)
			}
		}

		fileStream.close()
	}

	return { ev, task: fireEvents() }
}
