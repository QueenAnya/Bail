import { EventEmitter } from 'events'
import * as v2 from '../Extras/v2'
import * as api from '../index'

describe('Elaina name compatibility', () => {
	it('the Elaina "Carousel" is CarouselV2 (same class as AIRichCarousel and MB.Carousel)', () => {
		expect(typeof api.CarouselV2).toBe('function')
		expect(api.CarouselV2).toBe(api.AIRichCarousel)
		expect(api.AIRichCarouselV2).toBe(api.AIRichCarousel)
		expect((api.MB as Record<string, unknown>).Carousel).toBe(api.AIRichCarousel)
	})

	it('the bare name Carousel stays unexported (it is already a message type here)', () => {
		expect((api as Record<string, unknown>).Carousel).toBeUndefined()
	})

	it('every V2 alias in src/Extras/v2.ts is reachable from the package root and is the same value', () => {
		const names = Object.keys(v2).filter(name => name !== 'default')
		expect(names.length).toBeGreaterThanOrEqual(200)
		const unreachable = names.filter(
			name => !(name in api) || (api as Record<string, unknown>)[name] !== (v2 as Record<string, unknown>)[name]
		)
		expect(unreachable).toEqual([])
	})

	it('V2 aliases point at the original helpers', () => {
		expect(api.TaskStatusV2).toBe(api.TaskStatus)
		expect(api.MBV2).toBe(api.MB)
		expect(api.MessageBuilderV2).toBe(api.MessageBuilder)
		expect(api.ToolkitV2).toBe(api.Toolkit)
	})

	it('exports the Elaina VoIP names from the package root', () => {
		expect(typeof api.VoipClient).toBe('function')
		expect(typeof api.AudioFeeder).toBe('function')
		expect(typeof api.VideoFeeder).toBe('function')
		expect(api.VIDEO_FORMAT_I420).toBe(0)
		expect(typeof api.ActiveCall).toBe('function')
		// the call object of the unified client is an EventEmitter, like Elaina's ActiveCall
		expect(Object.getPrototypeOf(api.ActiveCall.prototype)).toBe(EventEmitter.prototype)
	})

	it('keeps the unified VoIP API and does not bring back the old createVoipClient factory', () => {
		expect(typeof api.makeVoipClient).toBe('function')
		expect(typeof api.MergedVoipClient).toBe('function')
		expect((api as Record<string, unknown>).createVoipClient).toBeUndefined()
	})
})
