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

	it('uses galaxy_message as a named native flow instead of generic mixed flow', () => {
		const message = {
			interactiveMessage: {
				nativeFlowMessage: {
					buttons: [
						{
							name: 'galaxy_message',
							buttonParamsJson: JSON.stringify({ flow_token: 'test-token', flow_id: 'test-flow' })
						}
					]
				}
			}
		} as any

		const bizNode = getBizBinaryNode(message)
		const interactive = (bizNode.content as any[]).find(node => node?.tag === 'interactive')
		const nativeFlow = interactive?.content?.find((node: any) => node?.tag === 'native_flow')

		expect(nativeFlow?.attrs?.name).toBe('galaxy_message')
		expect(nativeFlow?.attrs?.v).toBe('2')
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

	it('shouldIncludeBizBinaryNode is false for a carousel whose cards hold no native flow buttons', () => {
		const plain = { interactiveMessage: { carouselMessage: { cards: [{ body: { text: 'x' } }] } } } as any
		const empty = { interactiveMessage: { carouselMessage: { cards: [] } } } as any

		expect(shouldIncludeBizBinaryNode(plain)).toBe(false)
		expect(shouldIncludeBizBinaryNode(empty)).toBe(false)
		expect(shouldIncludeBizBinaryNode({ conversation: 'halo' } as any)).toBe(false)
	})

	it('builds the mixed native flow biz node when only a later card holds native flow buttons', () => {
		const message = {
			interactiveMessage: {
				carouselMessage: {
					cards: [
						{ body: { text: 'x' } },
						{ nativeFlowMessage: { buttons: [{ name: 'quick_reply', buttonParamsJson: '{}' }] } }
					]
				}
			}
		} as any

		expect(shouldIncludeBizBinaryNode(message)).toBe(true)

		const biz = getBizBinaryNode(message)
		expect(biz.tag).toBe('biz')
		const interactive = (biz.content as any[]).find(node => node?.tag === 'interactive')
		expect(interactive?.attrs).toEqual({ type: 'native_flow', v: '1' })
		expect(interactive?.content?.[0]?.attrs).toEqual({ v: '9', name: 'mixed' })
	})
})
