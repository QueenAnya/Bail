import type { ILogger } from './logger'

export type KeepAliveOptions = {
	intervalMs: number
	maxFailures?: number
	isClosed: () => boolean
	isOpen: () => boolean
	/** last time anything was received from the server */
	getLastRecv: () => Date | undefined
	setLastRecv: (d: Date) => void
	/** send one ping; must reject on failure */
	ping: () => Promise<unknown>
	/** called once when the connection is considered dead */
	onDead: (reason: 'silent' | 'ping-failures') => void
	logger?: ILogger
}

/**
 * Keepalive using recursive setTimeout (pings never overlap). Declares the
 * connection dead after `maxFailures` consecutive failed pings, or when the
 * socket has been silent for > 2x interval.
 */
export const makeKeepAlive = (opts: KeepAliveOptions) => {
	const { intervalMs, isClosed, isOpen, getLastRecv, setLastRecv, ping, onDead, logger } = opts
	const maxFailures = opts.maxFailures ?? 3
	let timer: NodeJS.Timeout | undefined
	let consecutiveFailures = 0

	const schedule = () => {
		timer = setTimeout(async () => {
			if (isClosed()) {
				return
			}

			let last = getLastRecv()
			if (!last) {
				last = new Date()
				setLastRecv(last)
			}

			const diff = Date.now() - last.getTime()
			if (diff > intervalMs * 2 + 5000) {
				logger?.warn({ diff, intervalMs }, 'connection silent for too long')
				onDead('silent')
				return
			}

			if (isOpen()) {
				try {
					await ping()
					consecutiveFailures = 0
				} catch (err: any) {
					consecutiveFailures++
					logger?.error(
						{ trace: err?.stack, consecutivePingFailures: consecutiveFailures, maxFailures },
						'error in sending keep alive'
					)
					if (consecutiveFailures >= maxFailures) {
						logger?.warn('max ping failures reached, terminating connection')
						onDead('ping-failures')
						return
					}
				}
			} else {
				logger?.warn('keep alive called when WS not open')
			}

			if (!isClosed()) {
				schedule()
			}
		}, intervalMs)
	}

	return {
		start: () => {
			stop()
			schedule()
		},
		stop,
		get consecutiveFailures() {
			return consecutiveFailures
		}
	}

	function stop() {
		if (timer) {
			clearTimeout(timer)
			timer = undefined
		}

		consecutiveFailures = 0
	}
}
