/**
 * Baileys Event Stream — capture & replay events to/from a file.
 * Ported from innovatorssoft/Baileys.
 */

import EventEmitter from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import type { BaileysEventEmitter } from '../Types'
import { delay } from '../Utils/generics'
import { makeMutex } from '../Utils/make-mutex'

/**
 * Monkey-patches the event emitter to append every emitted event as a
 * JSON line to `filename`. Useful for debugging and replaying sessions.
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const oldEmit = ev.emit.bind(ev)
	const writeMutex = makeMutex()

	// @ts-ignore — intentional monkey-patch
	ev.emit = function (...args: Parameters<typeof oldEmit>) {
		const [event, data] = args
		const content = JSON.stringify({ timestamp: Date.now(), event, data }) + '\n'
		const result = oldEmit(...args)
		writeMutex.mutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result
	}
}

export interface EventStreamResult {
	ev: EventEmitter
	task: Promise<void>
}

/**
 * Reads a captured event stream file and re-emits every event.
 * @param filename  Path to the captured event file.
 * @param delayIntervalMs  Optional delay (ms) between events — useful for slow replay.
 */
export const readAndEmitEventStream = (filename: string, delayIntervalMs = 0): EventStreamResult => {
	const ev = new EventEmitter()

	const fireEvents = async () => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({ input: fileStream, crlfDelay: Infinity })

		for await (const line of rl) {
			if (line) {
				const { event, data } = JSON.parse(line)
				ev.emit(event, data)
				if (delayIntervalMs) await delay(delayIntervalMs)
			}
		}

		fileStream.destroy()
	}

	return { ev, task: fireEvents() }
}
