import { describe, expect, it } from '@jest/globals'
import { Button, ButtonV2 } from '../../ported/MessageBuilder/index'
const sock: any = {}
describe('displayText fixes', () => {
	it('fix2: Button.addButton normalizes display_text aliases', () => {
		const b: any = new Button(sock)
		b.addButton('quick_reply', { text: 'Hi', id: '1' })
		const p = JSON.parse(b._buttons[0].buttonParamsJson)
		expect(p.display_text).toBe('Hi')
		b.addButton('quick_reply', JSON.stringify({ display_text: 'Raw', id: '2' }))
		expect(b._buttons[1].buttonParamsJson).toBe(JSON.stringify({ display_text: 'Raw', id: '2' }))
	})
	it('fix1: ButtonV2.addRawButton normalizes aliases', () => {
		const b: any = new ButtonV2(sock)
		b.addRawButton({ buttonId: 'x', text: 'Label', type: 1 })
		expect(b._buttons[0].buttonText).toEqual({ displayText: 'Label' })
		b.addRawButton({ name: 'quick_reply', text: 'T', buttonParamsJson: { id: '3' } })
		expect(JSON.parse(b._buttons[1].buttonParamsJson).display_text).toBe('T')
		const ser = { name: 'cta_url', buttonParamsJson: '{"display_text":"S"}' }
		b.addRawButton(ser)
		expect(b._buttons[2]).toBe(ser)
	})
})
it('fix1b: string buttonText becomes { displayText }', () => {
	const b: any = new ButtonV2(sock)
	b.addRawButton({ buttonId: 'y', buttonText: 'Str', type: 1 })
	expect(b._buttons[0].buttonText).toEqual({ displayText: 'Str' })
})

describe('addButton input forms', () => {
	it('ButtonV2.addButton accepts an object with display-text aliases and id aliases', () => {
		const b: any = new ButtonV2(sock)
		b.addButton({ display_text: 'A', id: 'a1' })
		b.addButton({ text: 'B', button_id: 'b1' })
		b.addButton({ displayText: 'C', buttonId: 'c1' })
		b.addButton('D', 'd1')
		expect(b._buttons.map((x: any) => [x.buttonId, x.buttonText.displayText, x.type])).toEqual([
			['a1', 'A', 1],
			['b1', 'B', 1],
			['c1', 'C', 1],
			['d1', 'D', 1]
		])
	})
	it('ButtonV2.addButton object without a label falls back to an empty label, not [object Object]', () => {
		const b: any = new ButtonV2(sock)
		b.addButton({ id: 'z' })
		expect(b._buttons[0].buttonText.displayText).toBe('')
	})
	it('Button.addButton accepts { name, buttonParamsJson } and plain objects, and rejects a missing name', () => {
		const b: any = new Button(sock)
		b.addButton({ name: 'quick_reply', buttonParamsJson: { text: 'Hi', id: '1' } })
		expect(JSON.parse(b._buttons[0].buttonParamsJson)).toEqual({ text: 'Hi', id: '1', display_text: 'Hi' })
		b.addButton('cta_url', undefined)
		expect(b._buttons[1].buttonParamsJson).toBe('{}')
		expect(() => b.addButton({ buttonParamsJson: {} })).toThrow('native flow button name')
		expect(() => b.addButton(undefined, {})).toThrow('native flow button name')
	})
})

describe('addButton array params', () => {
	it('keeps array params as a JSON array and turns a missing params into {}', () => {
		const b: any = new Button(sock)
		b.addButton('custom', ['a', 'b'])
		b.addButton('custom', undefined)
		expect(JSON.parse(b._buttons[0].buttonParamsJson)).toEqual(['a', 'b'])
		expect(b._buttons[1].buttonParamsJson).toBe('{}')
	})
})
