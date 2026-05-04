/**
 * Baileys Event Stream Utilities
 * Ported from InnovatorsSoft Baileys (baileys-event-stream.js).
 * Capture events to file & replay them for debugging/testing.
 */

import EventEmitter from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import type { BaileysEventEmitter } from '../Types'
import { delay } from './generics'
import { makeMutex } from './make-mutex'

/**
 * Captures events from a Baileys event emitter and appends them to a JSONL file.
 * Useful for debugging or recording a session for replay.
 *
 * @param ev  - The Baileys event emitter
 * @param filename - Path to the output JSONL file
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string) => {
	const originalEmit = ev.emit.bind(ev)
	const { mutex } = makeMutex()

	// Monkey-patch emit to intercept all events
	const patchedEmit = function (event: string, ...args: any[]): boolean {
		const content = JSON.stringify({ timestamp: Date.now(), event, data: args[0] }) + '\n'
		const result = (originalEmit as (...a: any[]) => boolean)(event, ...args)
		mutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result as boolean
	}

	ev.emit = patchedEmit as typeof ev.emit
}

type EventStreamEntry = {
	timestamp: number
	event: string
	data: any
}

/**
 * Reads a JSONL event stream file and replays the events on a new EventEmitter.
 *
 * @param filename        - Path to the JSONL event file
 * @param delayIntervalMs - Optional delay (ms) between each emitted event
 * @returns { ev, task } - ev is the emitter, task is the Promise that fires all events
 */
export const readAndEmitEventStream = (
	filename: string,
	delayIntervalMs = 0
): {
	ev: EventEmitter
	task: Promise<void>
} => {
	const ev = new EventEmitter()

	const fireEvents = async () => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({ input: fileStream, crlfDelay: Infinity })

		for await (const line of rl) {
			if (line) {
				const { event, data } = JSON.parse(line) as EventStreamEntry
				ev.emit(event, data)
				if (delayIntervalMs) {
					await delay(delayIntervalMs)
				}
			}
		}

		fileStream.destroy()
	}

	return { ev, task: fireEvents() }
}
