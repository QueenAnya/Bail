import { EventEmitter } from 'events'
import { writeFileSync, appendFileSync } from 'fs'
import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import type { BaileysEventEmitter } from '../Types'
import { BufferJSON } from './generics'
import { makeMutex } from './make-mutex'

export const captureEventStream = (ev: BaileysEventEmitter, filename: string): void => {
	const oldEmit = ev.emit.bind(ev)
	const writeMutex = makeMutex()
	// @ts-ignore — monkey patch
	ev.emit = function (...args: any[]) {
		const content = JSON.stringify({ timestamp: Date.now(), event: args[0], data: args[1] }, BufferJSON.replacer) + '\n'
		const result = oldEmit(...args)
		writeMutex.mutex(async () => {
			appendFileSync(filename, content)
		})
		return result
	}
}

export const readAndEmitEventStream = (
	filename: string,
	delayIntervalMs = 0
): {
	ev: BaileysEventEmitter
	task: Promise<void>
} => {
	const emitter = new EventEmitter() as BaileysEventEmitter
	const task = new Promise<void>((resolve, reject) => {
		const rl = createInterface({ input: createReadStream(filename), crlfDelay: Infinity })
		const lines: string[] = []
		rl.on('line', line => lines.push(line))
		rl.on('close', async () => {
			for (const line of lines) {
				if (!line.trim()) continue
				try {
					const { event, data } = JSON.parse(line, BufferJSON.reviver)
					emitter.emit(event, data)
					if (delayIntervalMs > 0) await new Promise(r => setTimeout(r, delayIntervalMs))
				} catch {}
			}
			resolve()
		})
		rl.on('error', reject)
	})
	return { ev: emitter, task }
}
