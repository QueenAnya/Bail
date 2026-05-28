/**
 * Baileys Event Stream — capture and replay socket events to/from a file
 * Source: @innovatorssoft/baileys baileys-event-stream.js
 */
import { EventEmitter } from 'events'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { createInterface } from 'readline'
import type { BaileysEventEmitter } from '../Types/index.js'

let _writeQueue = Promise.resolve()
const enqueue = (fn: () => Promise<void>) => {
	_writeQueue = _writeQueue.then(fn).catch(() => {})
}

export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const originalEmit = ev.emit.bind(ev)

	ev.emit = function (event: string, ...args: any[]): boolean {
		const data = args[0]
		const line = JSON.stringify({ timestamp: Date.now(), event, data }) + '\n'
		const result = originalEmit(event as any, data)
		enqueue(() => writeFile(filename, line, { flag: 'a' }))
		return result
	} as typeof ev.emit
}

export const readAndEmitEventStream = (
	filename: string,
	delayIntervalMs = 0
): { ev: EventEmitter; task: Promise<void> } => {
	const ev = new EventEmitter()
	const task = (async () => {
		const fileStream = createReadStream(filename)
		const rl = createInterface({ input: fileStream, crlfDelay: Infinity })
		for await (const line of rl) {
			if (!line.trim()) continue
			try {
				const { event, data } = JSON.parse(line) as { event: string; data: unknown }
				ev.emit(event, data)
				if (delayIntervalMs) await new Promise(r => setTimeout(r, delayIntervalMs))
			} catch {
				/* skip malformed lines */
			}
		}
		fileStream.destroy()
	})()
	return { ev, task }
}
