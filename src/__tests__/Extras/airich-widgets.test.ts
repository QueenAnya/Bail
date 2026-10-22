import { describe, expect, it } from '@jest/globals'
import { AIRich } from '../../Extras/MessageBuilder/index'

/**
 * AIRich widgets ported from elaina-baileys commit f025122
 * ("feat(airich): tambah primitive baru 2.26.39.3 ke MessageBuilder"):
 * addHtmlCard, addSelectableText, addQuiz, addComparisonTable, addSports.
 */
const makeRich = () => new AIRich({} as any) as any

const primitiveOf = (rich: any, index = 0) => rich._nodes[index].section.view_model

describe('AIRich widgets (elaina f025122)', () => {
	it('addHtmlCard builds a GenAIHtmlCardPrimitive', () => {
		const rich = makeRich()
		const returned = rich.addHtmlCard('<b>hi</b>', { width: 120, height: 80, id: 'card' })

		expect(returned).toBe(rich)

		const primitive = primitiveOf(rich).primitive
		expect(primitive.__typename).toBe('GenAIHtmlCardPrimitive')
		expect(primitive.html).toBe('<b>hi</b>')
		expect(primitive.mime_type).toBe('text/html')
		expect(primitive.width).toBe(120)
		expect(primitive.height).toBe(80)
		expect(rich._nodes[0].id).toBe('card')
		expect(() => rich.addHtmlCard(123)).toThrow(TypeError)
	})

	it('addSelectableText keeps the text as the plain submessage', () => {
		const rich = makeRich()
		rich.addSelectableText('pick me', { selectionId: 's1' })

		const primitive = primitiveOf(rich).primitive
		expect(primitive.__typename).toBe('GenAISelectableTextPrimitive')
		expect(primitive.selectable_text).toBe('pick me')
		expect(primitive.selection_id).toBe('s1')
		expect(rich._nodes[0].submessage).toMatchObject({ messageType: 2, messageText: 'pick me' })
		expect(() => rich.addSelectableText(1)).toThrow(TypeError)
	})

	it('addQuiz normalises string and object options', () => {
		const rich = makeRich()
		rich.addQuiz('2 + 2?', ['3', { text: '4', correct: true }], { explanation: 'basic maths' })

		const primitive = primitiveOf(rich).primitive
		expect(primitive.__typename).toBe('GenAIQuizPrimitive')
		expect(primitive.question).toBe('2 + 2?')
		expect(primitive.options).toEqual([
			{ option_text: '3', is_correct: false },
			{ option_text: '4', is_correct: true }
		])
		expect(primitive.explanation).toBe('basic maths')
		expect(() => rich.addQuiz('q', [])).toThrow(TypeError)
		expect(() => rich.addQuiz(1, ['a'])).toThrow(TypeError)
	})

	it('addComparisonTable wraps array rows into cells', () => {
		const rich = makeRich()
		rich.addComparisonTable(['A', 'B'], [['1', '2'], { cells: ['3', '4'] }], { highlightLabel: 'B' })

		const primitive = primitiveOf(rich).primitive
		expect(primitive.__typename).toBe('GenAIFusedComparisonTablePrimitive')
		expect(primitive.columns).toEqual(['A', 'B'])
		expect(primitive.rows).toEqual([{ cells: ['1', '2'] }, { cells: ['3', '4'] }])
		expect(primitive.highlight_label).toBe('B')
		expect(() => rich.addComparisonTable('x', [])).toThrow(TypeError)
	})

	it('addSports uses a single layout for one game and HScroll for several', () => {
		const single = makeRich()
		single.addSports({ home: 'A', away: 'B' }, { league: 'NBA' })

		const one = primitiveOf(single).primitive
		expect(one.__typename).toBe('GenAISportsWidgetPrimitive')
		expect(one.league).toBe('NBA')

		const many = makeRich()
		many.addSports([{ home: 'A' }, { home: 'C', league: 'NFL' }], { league: 'NBA' })

		const list = primitiveOf(many).primitives
		expect(list).toHaveLength(2)
		expect(list[0].league).toBe('NBA')
		expect(list[1].league).toBe('NFL')
		expect(list.every((item: any) => item.__typename === 'GenAISportsWidgetPrimitive')).toBe(true)
		expect(() => makeRich().addSports([])).toThrow(TypeError)
	})
})
