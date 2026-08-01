/**
 * Interactive Carousel Biz Node
 * Source: innovatorssoft/Baileys commit ad6be86 ("Handle carousel
 * interactive biz binary nodes") — ported test cases + the corresponding
 * fix in Utils/messages.ts (shouldIncludeBizBinaryNode) and
 * WABinary/generic-utils.ts (getBizBinaryNode).
 */
import { getBizBinaryNode, shouldIncludeBizBinaryNode } from '../../WABinary/generic-utils'

describe('Interactive Carousel Biz Node', () => {
	it('shouldIncludeBizBinaryNode returns true for interactive carouselMessage', () => {
		const message = {
			interactiveMessage: {
				carouselMessage: {
					cards: [
						{
							nativeFlowMessage: {
								buttons: [{ name: 'quick_reply' }]
							}
						}
					]
				}
			}
		} as any

		expect(shouldIncludeBizBinaryNode(message)).toBe(true)
	})

	it('getBizBinaryNode returns biz binary node for carouselMessage', () => {
		const message = {
			interactiveMessage: {
				carouselMessage: {
					cards: [
						{
							nativeFlowMessage: {
								buttons: [{ name: 'cta_url' }]
							}
						}
					]
				}
			}
		} as any

		const bizNode = getBizBinaryNode(message)
		expect(bizNode).toBeDefined()
		expect(bizNode.tag).toBe('biz')
		expect(bizNode.content).toBeDefined()
	})

	it('shouldIncludeBizBinaryNode still returns true for plain nativeFlowMessage (no regression)', () => {
		const message = {
			interactiveMessage: {
				nativeFlowMessage: {
					buttons: [{ name: 'quick_reply' }]
				}
			}
		} as any

		expect(shouldIncludeBizBinaryNode(message)).toBe(true)
	})

	it('shouldIncludeBizBinaryNode returns false for interactiveMessage with neither nativeFlowMessage nor carouselMessage', () => {
		const message = {
			interactiveMessage: {}
		} as any

		expect(shouldIncludeBizBinaryNode(message)).toBe(false)
	})
})
