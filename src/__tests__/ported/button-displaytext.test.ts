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

	it('fix1b: string buttonText becomes { displayText }', () => {
		const b: any = new ButtonV2(sock)
		b.addRawButton({ buttonId: 'y', buttonText: 'Str', type: 1 })
		expect(b._buttons[0].buttonText).toEqual({ displayText: 'Str' })
	})
})
