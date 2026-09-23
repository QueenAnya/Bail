/**
 * Interactive Carousel Biz Node
 * Commit ad6be86 ("Handle carousel
 * interactive biz binary nodes") — ported test cases + the corresponding
 * fix in Socket/messages-send.ts (relayMessage integration) and
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
		expect(bizNode.attrs?.actual_actors).toBe('2')
		expect(bizNode.attrs?.host_storage).toBe('2')
	})

	it('uses the first carousel card native-flow buttons when there is no top-level nativeFlowMessage', () => {
		const message = {
			interactiveMessage: {
				carouselMessage: {
					cards: [
						{
							nativeFlowMessage: {
								buttons: [{ name: 'mpm' }]
							}
						},
						{ nativeFlowMessage: { buttons: [{ name: 'quick_reply' }] } }
					]
				}
			}
		} as any

		const bizNode = getBizBinaryNode(message)
		const interactive = (bizNode.content as any[]).find(node => node?.tag === 'interactive')
		const nativeFlow = interactive?.content?.find((node: any) => node?.tag === 'native_flow')

		expect(nativeFlow?.attrs?.name).toBe('mpm')
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
