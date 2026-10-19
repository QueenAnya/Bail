import {
	AIRich,
	AIRichCarousel,
	Button,
	ButtonV2,
	mapSection,
	MB,
	MessageBuilder,
	nativeFlowButtonsViolateConstraints,
	Toolkit
} from '../../Extras'

describe('Elaina MessageBuilder static helper compatibility', () => {
	it('registers helpers on all builder namespaces through the ported barrel', () => {
		for (const builder of [Button, ButtonV2, AIRichCarousel, AIRich, Toolkit, MessageBuilder]) {
			expect((builder as any).mapSection).toBe(mapSection)
			expect((builder as any).nativeFlowButtonsViolateConstraints).toBe(nativeFlowButtonsViolateConstraints)
		}

		expect((MB as any).mapSection).toBe(mapSection)
	})

	it('preserves existing static methods and freezes the namespace like Elaina', () => {
		expect(MB).toBe(MessageBuilder)
		expect(Object.isFrozen(MessageBuilder)).toBe(true)
		expect((AIRich as any).newLayout).toBeDefined()
	})
})
