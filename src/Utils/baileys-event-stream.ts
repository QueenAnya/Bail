import EventEmitter from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import type { BaileysEventEmitter } from '../Types'
import { delay } from './generics'
import { makeMutex } from './make-mutex'

/**
 * Captures events from a Baileys event emitter and stores them in a JSONL file.
 * Useful for replaying events in tests or debugging.
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string) => {
	const oldEmit = ev.emit.bind(ev)
	const writeMutex = makeMutex()

	// Monkey-patch the emitter to write each event to file
	;(ev as any).emit = function (...args: any[]) {
		const content = JSON.stringify({ timestamp: Date.now(), event: args[0], data: args[1] }) + '\n'
		const result = oldEmit(...(args as [any, ...any[]]))
		writeMutex.mutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result
	}
}

/**
 * Reads a captured event file and re-emits each event from a new EventEmitter.
 * Optionally delays between events for replay simulation.
 */
export const readAndEmitEventStream = (filename: string, delayIntervalMs = 0) => {
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
		fileStream.close()
	}

	return { ev, task: fireEvents() }
}
