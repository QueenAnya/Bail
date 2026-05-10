/**
 * Baileys Event Stream — capture and replay socket events to/from a file
 * Source: @innovatorssoft/baileys baileys-event-stream.js
 */
import { EventEmitter } from 'events'
import { createReadStream, createWriteStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import { makeMutex } from '../Utils/make-mutex.js'
import type { BaileysEventEmitter } from '../Types/index.js'

/**
 * Monkey-patches a BaileysEventEmitter to append every emitted event as a
 * JSON line to `filename`.  Call once after `makeWASocket()` returns.
 */
export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const originalEmit = ev.emit.bind(ev)
	const writeMutex = makeMutex()

	// @ts-expect-error — we're intentionally overriding the typed emit signature
	ev.emit = (...args: [string, ...any[]]) => {
		const [event, data] = args
		const content = JSON.stringify({ timestamp: Date.now(), event, data }) + '\n'
		const result = originalEmit(event as any, data)
		writeMutex(async () => {
			await writeFile(filename, content, { flag: 'a' })
		})
		return result
	}
}

/**
 * Reads a captured event stream file line-by-line and re-emits each event
 * from a fresh EventEmitter.  Useful for testing or replay without a live WA
 * connection.
 *
 * @param filename      - Path to the .jsonl file produced by `captureEventStream`
 * @param delayIntervalMs - Optional delay between events (ms)
 */
export const readAndEmitEventStream = (
	filename: string,
	delayIntervalMs = 0
): { ev: EventEmitter; task: Promise<void> } => {
	const ev = new EventEmitter()

	const fireEvents = async () => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({ input: fileStream, crlfDelay: Infinity })

		for await (const line of rl) {
			if (!line) continue
			const { event, data } = JSON.parse(line) as { event: string; data: unknown }
			ev.emit(event, data)
			if (delayIntervalMs) await new Promise(r => setTimeout(r, delayIntervalMs))
		}

		fileStream.destroy()
	}

	return { ev, task: fireEvents() }
}
