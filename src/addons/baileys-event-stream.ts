/**
 * Baileys Event Stream Utilities
 * Ported from innovatorssoft/Baileys to TypeScript
 * Capture & replay Baileys events to/from a file
 */

import EventEmitter from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import { delay } from '../Utils/generics'
import { makeMutex } from '../Utils/make-mutex'
import type { BaileysEventEmitter } from '../Types'

// ── captureEventStream ─────────────────────────────────────────────────────

/**
 * Captures all events from a BaileysEventEmitter and appends them as NDJSON to a file.
 * Useful for debugging, replaying, or persisting event history.
 *
 * @param ev       The Baileys event emitter to capture from
 * @param filename Path of the file to write events to
 *
 * @example
 * captureEventStream(sock.ev, './events.ndjson')
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const originalEmit = (ev as unknown as EventEmitter).emit.bind(ev)
	const writeMutex = makeMutex()

	// Monkey-patch emit to intercept all events
	;(ev as unknown as EventEmitter).emit = function (...args: Parameters<typeof originalEmit>) {
		const content = JSON.stringify({ timestamp: Date.now(), event: args[0], data: args[1] }) + '\n'
		const result = originalEmit(...args)
		writeMutex.mutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result
	}
}

// ── readAndEmitEventStream ─────────────────────────────────────────────────

export interface EventStreamResult {
	ev: EventEmitter
	task: Promise<void>
}

/**
 * Reads an NDJSON event file (written by captureEventStream) and re-emits
 * each event on a new EventEmitter.
 *
 * @param filename        Path to the NDJSON file
 * @param delayIntervalMs Optional delay between events in ms (default: 0)
 * @returns               `{ ev, task }` — listen on `ev`, await `task` for completion
 *
 * @example
 * const { ev, task } = readAndEmitEventStream('./events.ndjson', 50)
 * ev.on('messages.upsert', ({ messages }) => console.log(messages))
 * await task
 */
export const readAndEmitEventStream = (filename: string, delayIntervalMs = 0): EventStreamResult => {
	const ev = new EventEmitter()

	const fireEvents = async (): Promise<void> => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({ input: fileStream, crlfDelay: Infinity })

		for await (const line of rl) {
			if (line) {
				const { event, data } = JSON.parse(line) as { event: string; data: unknown }
				ev.emit(event, data)
				if (delayIntervalMs) await delay(delayIntervalMs)
			}
		}

		fileStream.destroy()
	}

	return {
		ev,
		task: fireEvents()
	}
}
