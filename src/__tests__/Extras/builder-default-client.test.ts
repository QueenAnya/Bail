import { describe, expect, it } from '@jest/globals'
import { registerDefaultClient } from '../../Extras/MessageBuilder/default-client'
import { AIRich, Button, Carousel, MB } from '../../Extras/MessageBuilder/index'
import { bindMessageBuilder } from '../../Extras/socket'

describe('builders without a socket argument', () => {
	it('needs an explicit socket while no socket is registered', () => {
		expect(() => new (AIRich as any)()).toThrow('Socket is required')
		expect(() => new (Button as any)()).toThrow('Socket is required')
	})

	it('uses the only registered socket, and refuses to guess with several', () => {
		const unregisterA = registerDefaultClient({ name: 'a' })

		expect(new (AIRich as any)()).toBeInstanceOf(AIRich)
		expect(new (MB.AIRich as any)()).toBeInstanceOf(AIRich)
		expect(new (Carousel as any)()).toBeInstanceOf(Carousel)

		const unregisterB = registerDefaultClient({ name: 'b' })
		expect(() => new (AIRich as any)()).toThrow('several sockets are active')
		// an explicit socket always works
		expect(new (AIRich as any)({ name: 'explicit' })).toBeInstanceOf(AIRich)

		unregisterB()
		expect(new (AIRich as any)()).toBeInstanceOf(AIRich)

		unregisterA()
		expect(() => new (AIRich as any)()).toThrow('Socket is required')
	})
})

describe('bindMessageBuilder (sock.MB / sock.AIRich)', () => {
	const sock = { name: 'bound' }
	const bound: any = bindMessageBuilder(sock)

	it('creates builders bound to the socket, without passing it', () => {
		const rich = new bound.AIRich()
		expect(rich).toBeInstanceOf(AIRich)
		expect(new bound.Button()).toBeInstanceOf(Button)
		expect(new bound.Carousel()).toBeInstanceOf(Carousel)
		expect(new bound.AIRichCarousel()).toBeInstanceOf(Carousel)
	})

	it('keeps AIRich constructor options and the static helpers', () => {
		const rich = new bound.AIRich({ dynamic: false })
		expect(rich._dynamic).toBe(false)
		expect(typeof bound.AIRich.newLayout).toBe('function')
		expect(bound.AIRich.newLayout('Single', { a: 1 })).toEqual(AIRich.newLayout('Single', { a: 1 }))
	})

	it('passes the other MB members through and keeps send helpers as functions', () => {
		expect(bound.VERSION).toBe(MB.VERSION)
		expect(bound.Toolkit).toBe(MB.Toolkit)
		expect(typeof bound.sendA2UI).toBe('function')
		expect(bound.sendA2UI).not.toBe((MB as any).sendA2UI)
	})
})
