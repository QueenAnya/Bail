import {
	makeInMemoryStore,
	makeOrderedDictionary,
	ObjectRepository,
	waChatKey,
	waMessageID,
	waLabelAssociationKey
} from '../index'

// These imports intentionally come from the package root, not src/Store.
describe('Store public exports', () => {
	it('exports the in-memory store and store helpers from the root barrel', () => {
		expect(typeof makeInMemoryStore).toBe('function')
		expect(typeof makeOrderedDictionary).toBe('function')
		expect(typeof ObjectRepository).toBe('function')
		expect(typeof waChatKey).toBe('function')
		expect(typeof waMessageID).toBe('function')
		expect(typeof waLabelAssociationKey).toBe('object')
	})

	it('keeps the ordered dictionary and repository usable', () => {
		const dictionary = makeOrderedDictionary<{ id: string; value: number }>(item => item.id)
		dictionary.upsert({ id: 'first', value: 1 }, 'append')
		expect(dictionary.get('first')).toEqual({ id: 'first', value: 1 })

		const repository = new ObjectRepository<{ name: string }>()
		repository.upsertById('label-1', { name: 'test' })
		expect(repository.findById('label-1')).toEqual({ name: 'test' })
	})
})
