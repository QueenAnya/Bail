import { jest } from '@jest/globals'
import { makeKeepAlive } from '../../Utils/keep-alive'

const INTERVAL = 1000

const make = (over: Partial<Parameters<typeof makeKeepAlive>[0]> = {}) => {
	let last: Date | undefined = new Date()
	let closed = false
	const ping = jest.fn<() => Promise<unknown>>(async () => {
		last = new Date() // server responded
	})
	const onDead = jest.fn()
	const ka = makeKeepAlive({
		intervalMs: INTERVAL,
		isClosed: () => closed,
		isOpen: () => true,
		getLastRecv: () => last,
		setLastRecv: d => {
			last = d
		},
		ping,
		onDead,
		...over
	})
	return { ka, ping, onDead, close: () => (closed = true), setLast: (d?: Date) => (last = d) }
}

describe('makeKeepAlive', () => {
	beforeEach(() => jest.useFakeTimers())
	afterEach(() => jest.useRealTimers())

	it('pings every interval and never overlaps', async () => {
		let inFlight = 0
		let maxInFlight = 0
		const { ka, ping } = make({
			ping: jest.fn(async () => {
				inFlight++
				maxInFlight = Math.max(maxInFlight, inFlight)
				await new Promise(r => setTimeout(r, INTERVAL * 1.5)) // slower than interval
				inFlight--
			})
		})
		void ping
		ka.start()
		await jest.advanceTimersByTimeAsync(INTERVAL * 8)
		expect(maxInFlight).toBe(1)
		ka.stop()
	})

	it('resets failure counter after a successful ping', async () => {
		const { ka, ping, onDead } = make()
		ping.mockRejectedValueOnce(new Error('x')).mockRejectedValueOnce(new Error('x'))
		ka.start()
		await jest.advanceTimersByTimeAsync(INTERVAL * 2)
		expect(ka.consecutiveFailures).toBe(2)
		await jest.advanceTimersByTimeAsync(INTERVAL)
		expect(ka.consecutiveFailures).toBe(0)
		expect(onDead).not.toHaveBeenCalled()
		ka.stop()
	})

	it('declares dead after 3 consecutive ping failures', async () => {
		const { ka, ping, onDead } = make()
		ping.mockRejectedValue(new Error('timeout'))
		ka.start()
		await jest.advanceTimersByTimeAsync(INTERVAL * 5)
		expect(onDead).toHaveBeenCalledTimes(1)
		expect(onDead).toHaveBeenCalledWith('ping-failures')
		expect(ping).toHaveBeenCalledTimes(3)
		ka.stop()
	})

	it('declares dead when silent for > 2x interval + 5s', async () => {
		const { ka, ping, onDead, setLast } = make()
		setLast(new Date(Date.now() - (INTERVAL * 2 + 6000)))
		ka.start()
		await jest.advanceTimersByTimeAsync(INTERVAL)
		expect(onDead).toHaveBeenCalledWith('silent')
		expect(ping).not.toHaveBeenCalled()
		ka.stop()
	})

	it('initialises lastRecv when unset and does not kill immediately', async () => {
		const { ka, onDead, setLast } = make()
		setLast(undefined)
		ka.start()
		await jest.advanceTimersByTimeAsync(INTERVAL)
		expect(onDead).not.toHaveBeenCalled()
		ka.stop()
	})

	it('stops scheduling once closed and stop() clears pending timer', async () => {
		const { ka, ping, close } = make()
		ka.start()
		await jest.advanceTimersByTimeAsync(INTERVAL)
		expect(ping).toHaveBeenCalledTimes(1)
		close()
		await jest.advanceTimersByTimeAsync(INTERVAL * 5)
		expect(ping).toHaveBeenCalledTimes(1)

		const b = make()
		b.ka.start()
		b.ka.stop()
		await jest.advanceTimersByTimeAsync(INTERVAL * 3)
		expect(b.ping).not.toHaveBeenCalled()
	})

	it('skips ping (no failure counted) when ws not open', async () => {
		const { ka, ping } = make({ isOpen: () => false })
		ka.start()
		await jest.advanceTimersByTimeAsync(INTERVAL * 3)
		expect(ping).not.toHaveBeenCalled()
		expect(ka.consecutiveFailures).toBe(0)
		ka.stop()
	})
})
