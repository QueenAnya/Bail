/**
 * CallManager — concurrency limit + optional waiting queue on top of `sock.initiateCall()`.
 *
 * Counterpart of @innovatorssoft/baileys' `CallManager` (`maxConcurrentCalls`, `onLimit: 'queue' | 'reject'`,
 * active/waiting call lists, memory stats). That fork ships its own signaling engine; this fork already has a
 * socket-integrated engine (`Voip/voip-engine.ts`), so this class is a thin, engine-agnostic layer over it and
 * never touches call stanzas itself — no double handling of `<call>` nodes.
 *
 * @example
 * const calls = new CallManager({ sock, maxConcurrentCalls: 2, onLimit: 'queue' })
 * calls.on('call.queued', ({ jid, position }) => console.log(jid, 'waits at', position))
 * const call = await calls.startCall('12345678901', { audioSource: './hello.mp3' }) // resolves once it really starts
 */
import { EventEmitter } from 'events'
import { VoipResourceManager } from './resource-manager'
import type { CallSummary } from './types'
import type { ActiveCall, InitiateCallOptions } from './voip-engine'

/** The only thing CallManager needs from a socket. */
export type CallManagerSocket = {
	initiateCall: (jidOrPhoneNumber: string, opts?: InitiateCallOptions) => Promise<ActiveCall>
}

export type CallManagerConfig = {
	sock: CallManagerSocket
	/** Calls allowed at the same time (default `1`). */
	maxConcurrentCalls?: number
	/** What to do when the limit is hit: throw (`'reject'`, default) or wait (`'queue'`). */
	onLimit?: 'reject' | 'queue'
	logger?: { warn?: (obj: unknown, msg?: string) => void; debug?: (obj: unknown, msg?: string) => void }
}

export type WaitingCallSummary = {
	jid: string
	position: number
	queuedAt: number
	options?: InitiateCallOptions
}

type QueuedCall = {
	jid: string
	options: InitiateCallOptions | undefined
	queuedAt: number
	resolve: (call: ActiveCall) => void
	reject: (err: Error) => void
}

export class CallManager extends EventEmitter {
	readonly sock: CallManagerSocket
	maxConcurrentCalls: number
	onLimit: 'reject' | 'queue'

	readonly #calls = new Map<string, ActiveCall>()
	readonly #waiting: QueuedCall[] = []
	readonly #logger: CallManagerConfig['logger']
	#starting = 0
	#cleanedUp = false

	constructor(config: CallManagerConfig) {
		super()
		this.sock = config.sock
		this.maxConcurrentCalls =
			typeof config.maxConcurrentCalls === 'number' && config.maxConcurrentCalls > 0 ? config.maxConcurrentCalls : 1
		this.onLimit = config.onLimit === 'queue' ? 'queue' : 'reject'
		this.#logger = config.logger
	}

	/** Calls that are running (or being set up) right now. */
	get activeCallCount(): number {
		let count = this.#starting
		for (const call of this.#calls.values()) if (!call.ended) count++
		return count
	}

	get waitingCallCount(): number {
		return this.#waiting.length
	}

	getCall = (callId: string): ActiveCall | undefined => this.#calls.get(callId)

	getActiveCalls = (): CallSummary[] =>
		Array.from(this.#calls.values())
			.filter(call => !call.ended)
			.map(call => call.getSummary())

	getWaitingCalls = (): WaitingCallSummary[] =>
		this.#waiting.map((item, index) => ({
			jid: item.jid,
			position: index + 1,
			queuedAt: item.queuedAt,
			options: item.options
		}))

	getMemoryStats = () =>
		VoipResourceManager.getMemoryStats({
			// this fork runs one isolated engine + relay per call
			activeWorkers: this.activeCallCount,
			relayConnections: this.activeCallCount,
			activeCalls: this.activeCallCount,
			waitingCalls: this.waitingCallCount,
			totalManagedCalls: this.#calls.size
		})

	/**
	 * Place a call. Under the limit it starts immediately; at the limit it either throws
	 * (`onLimit: 'reject'`) or waits and resolves as soon as a slot frees up (`onLimit: 'queue'`).
	 */
	startCall = (jid: string, options?: InitiateCallOptions): Promise<ActiveCall> => {
		if (this.#cleanedUp) return Promise.reject(new Error('CallManager has been cleaned up'))

		if (this.activeCallCount < this.maxConcurrentCalls) {
			return this.#start(jid, options)
		}

		if (this.onLimit === 'reject') {
			return Promise.reject(new Error(`Maximum concurrent call limit (${this.maxConcurrentCalls}) reached.`))
		}

		return new Promise<ActiveCall>((resolve, reject) => {
			this.#waiting.push({ jid, options, queuedAt: Date.now(), resolve, reject })
			this.emit('call.queued', { jid, position: this.#waiting.length })
		})
	}

	/** Ends one call; a waiting call with that `jid`-less id is simply ignored. */
	endCall = (callId: string, reason = 'completed'): void => {
		this.#calls.get(callId)?.end(reason)
	}

	/** Ends every running call and rejects everything still waiting. */
	endAllCalls = (reason = 'completed'): void => {
		this.#rejectWaiting(new Error('Call queue cleared'))
		for (const call of Array.from(this.#calls.values())) call.end(reason)
	}

	/** Stop accepting calls, end running ones and reject the queue. Safe to call more than once. */
	cleanup = (): void => {
		if (this.#cleanedUp) return
		this.#cleanedUp = true
		this.endAllCalls('disconnect')
		this.removeAllListeners()
	}

	#rejectWaiting = (error: Error): void => {
		for (const item of this.#waiting.splice(0)) item.reject(error)
	}

	#start = async (jid: string, options?: InitiateCallOptions): Promise<ActiveCall> => {
		this.#starting++
		let call: ActiveCall
		try {
			call = await this.sock.initiateCall(jid, options)
		} catch (error) {
			this.#starting--
			// the slot is free again — let the next waiting call try
			this.#drain()
			throw error
		}

		this.#starting--
		this.#calls.set(call.callId, call)
		call.once('ended', (reason: string) => {
			this.#calls.delete(call.callId)
			this.emit('call.ended', { callId: call.callId, reason, call })
			this.#drain()
		})
		this.emit('call.started', call)
		return call
	}

	/** Start as many waiting calls as the limit allows. */
	#drain = (): void => {
		while (!this.#cleanedUp && this.#waiting.length > 0 && this.activeCallCount < this.maxConcurrentCalls) {
			const next = this.#waiting.shift()!
			this.#start(next.jid, next.options).then(next.resolve, error => {
				this.#logger?.warn?.({ err: error, jid: next.jid }, 'queued call failed to start')
				next.reject(error instanceof Error ? error : new Error(String(error)))
			})
		}
	}
}
