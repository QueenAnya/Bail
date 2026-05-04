/**
 * addon: pairing-fix
 * Source patch: Baileys-fix-pairing-code
 *
 * Problem: requestPairingCode() fires immediately even if the WebSocket
 * hasn't yet received the `pair-device` stanza from WA servers, causing
 * 404/timeout errors.
 *
 * Fix: wraps the raw pairing IQ (sendPairingIQ) in a queue that waits
 * for `pairingReady` before firing.  Socket.ts must call
 * `setPairingReady()` when it receives the `pair-device` stanza and
 * `clearPairingState()` on disconnect.
 *
 * Usage:
 *   import { createPairingQueue } from '../addons/pairing-fix'
 *   const pq = createPairingQueue(sendPairingIQFn)
 *   // In pair-device handler:  pq.setReady()
 *   // In disconnect handler:   pq.clear()
 *   // Replace requestPairingCode with: pq.requestPairingCode
 */

export type SendPairingIQFn = (phoneNumber: string, customPairingCode?: string) => Promise<string>

export type PairingQueue = {
	/** Mark socket as ready to accept a pairing IQ */
	setReady: () => void
	/** Clear all pending state (call on disconnect) */
	clear: (err?: Error) => void
	/** Drop-in replacement for requestPairingCode */
	requestPairingCode: (phoneNumber: string, customPairingCode?: string) => Promise<string>
}

export const createPairingQueue = (sendPairingIQ: SendPairingIQFn): PairingQueue => {
	let ready = false
	let inProgress = false
	let pendingResolve: (() => void) | undefined
	let pendingReject: ((err: Error) => void) | undefined

	const setReady = () => {
		ready = true
		if (pendingResolve) {
			const r = pendingResolve
			pendingResolve = undefined
			pendingReject = undefined
			r()
		}
	}

	const clear = (err?: Error) => {
		if (pendingReject) {
			pendingReject(err ?? new Error('Connection closed before pairing completed'))
			pendingResolve = undefined
			pendingReject = undefined
		}

		ready = false
		inProgress = false
	}

	const requestPairingCode = async (phoneNumber: string, customPairingCode?: string): Promise<string> => {
		if (inProgress) {
			throw new Error('A pairing request is already in progress')
		}

		inProgress = true

		if (ready) {
			try {
				return await sendPairingIQ(phoneNumber, customPairingCode)
			} finally {
				inProgress = false
			}
		}

		return new Promise<string>((resolve, reject) => {
			pendingResolve = () => {
				sendPairingIQ(phoneNumber, customPairingCode)
					.then(resolve)
					.catch(reject)
					.finally(() => {
						inProgress = false
					})
			}

			pendingReject = (err: Error) => {
				inProgress = false
				reject(err)
			}
		})
	}

	return { setReady, clear, requestPairingCode }
}
