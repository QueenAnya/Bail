/**
 * baileys-event-stream.ts
 * Ported from innovatorssoft/Baileys → TypeScript for @queenanya/baileys
 *
 * Utilities to capture and replay Baileys event streams to/from a file.
 * Useful for debugging, testing, and replaying events in development.
 *
 * Usage:
 *   import { captureEventStream, readAndEmitEventStream } from '@queenanya/baileys'
 *
 *   // Capture all events to a file
 *   captureEventStream(sock.ev, './events.ndjson')
 *
 *   // Replay events from a file
 *   const { ev, task } = readAndEmitEventStream('./events.ndjson', 100)
 *   ev.on('messages.upsert', handler)
 *   await task
 */

import { EventEmitter } from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import { delay } from '../Utils/generics.js'
import { makeMutex } from '../Utils/make-mutex.js'
import type { BaileysEventEmitter } from '../Types/Events.js'

/**
 * Captures events from a Baileys event emitter and appends them to a file
 * as newline-delimited JSON (NDJSON).
 *
 * Each line: { timestamp: number, event: string, data: unknown }
 *
 * @param ev       The Baileys event emitter to capture from.
 * @param filename Path to the output file (created/appended).
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const originalEmit = ev.emit.bind(ev)
	// Write mutex so lines are appended in order even under concurrent emits
	const writeMutex = makeMutex()

	// Monkey-patch emit to intercept every event
	;(ev as unknown as EventEmitter).emit = function (...args: Parameters<EventEmitter['emit']>) {
		const [event, data] = args
		const content = JSON.stringify({ timestamp: Date.now(), event, data }) + '\n'
		const result = originalEmit(event as never, data as never)
		writeMutex.mutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result
	}
}

/**
 * Reads a previously captured event stream file and replays all events
 * on a fresh EventEmitter.
 *
 * @param filename        Path to the NDJSON event file.
 * @param delayIntervalMs Optional delay (ms) between each event emit.
 *                        Useful for slow-motion replay during debugging.
 * @returns { ev, task } where `ev` is the emitter and `task` resolves
 *          when all events have been replayed.
 */
export const readAndEmitEventStream = (
	filename: string,
	delayIntervalMs = 0
): { ev: EventEmitter; task: Promise<void> } => {
	const ev = new EventEmitter()

	const fireEvents = async (): Promise<void> => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({
			input: fileStream,
			crlfDelay: Infinity
		})

		for await (const line of rl) {
			if (line) {
				const { event, data } = JSON.parse(line) as { event: string; data: unknown }
				ev.emit(event, data)
				if (delayIntervalMs) {
					await delay(delayIntervalMs)
				}
			}
		}

		fileStream.destroy()
	}

	return {
		ev,
		task: fireEvents()
	}
}
