import EventEmitter from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import type { BaileysEventEmitter } from '../Types'
import { delay } from '../Utils/generics'
import { makeMutex } from '../Utils/make-mutex'

/**
 * Captures events from a baileys event emitter & stores them in a file
 * @param ev The event emitter to read events from
 * @param filename File to save to
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const oldEmit = ev.emit
	// write mutex so data is appended in order
	const writeMutex = makeMutex()
	// monkey patch eventemitter to capture all events
	ev.emit = function (...args: Parameters<typeof oldEmit>) {
		const content = JSON.stringify({ timestamp: Date.now(), event: args[0], data: args[1] }) + '\n'
		const result = oldEmit.apply(ev, args)
		// void: intentional fire-and-forget inside mutex — errors logged by caller
		void writeMutex.mutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result
	}
}

/**
 * Read event file and emit events from there
 * @param filename filename containing event data
 * @param delayIntervalMs delay between each event emit
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
			if (line) {
				const { event, data } = JSON.parse(line) as { event: string; data: unknown }
				ev.emit(event, data)
				if (delayIntervalMs) await delay(delayIntervalMs)
			}
		}
		fileStream.close()
	}
	return { ev, task: fireEvents() }
}
