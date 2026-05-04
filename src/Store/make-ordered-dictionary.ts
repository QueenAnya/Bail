/**
 * An ordered dictionary that maintains insertion order and allows key-based lookups.
 * Ported from InnovatorsSoft Baileys.
 */
export type KeyedDBKey<T> = {
	key: (item: T) => string
	compare: (k1: string, k2: string) => number
}

export const makeOrderedDictionary = <T>(idGetter: (item: T) => string) => {
	const array: T[] = []
	const dict: { [id: string]: T } = {}

	const get = (id: string): T | undefined => dict[id]

	const update = (item: T): boolean => {
		const id = idGetter(item)
		const idx = array.findIndex(i => idGetter(i) === id)
		if (idx >= 0) {
			array[idx] = item
			dict[id] = item
			return true
		}
		return false
	}

	const upsert = (item: T, mode: 'append' | 'prepend') => {
		const id = idGetter(item)
		if (get(id)) {
			update(item)
		} else {
			if (mode === 'append') {
				array.push(item)
			} else {
				array.splice(0, 0, item)
			}
			dict[id] = item
		}
	}

	const remove = (item: T): boolean => {
		const id = idGetter(item)
		const idx = array.findIndex(i => idGetter(i) === id)
		if (idx >= 0) {
			array.splice(idx, 1)
			delete dict[id]
			return true
		}
		return false
	}

	const filter = (predicate: (item: T) => boolean) => {
		for (let i = array.length - 1; i >= 0; i--) {
			const item = array[i]
			if (item !== undefined && !predicate(item)) {
				const id = idGetter(item)
				array.splice(i, 1)
				delete dict[id]
			}
		}
	}

	const clear = () => {
		array.splice(0, array.length)
		for (const key in dict) {
			delete dict[key]
		}
	}

	return {
		array,
		get,
		upsert,
		update,
		remove,
		filter,
		clear,
		updateAssign: (id: string, updateData: Partial<T>): boolean => {
			const item = get(id)
			if (item) {
				Object.assign(item, updateData)
				const newId = idGetter(item)
				if (newId !== id) {
					delete dict[id]
					dict[newId] = item
				}
				return true
			}
			return false
		},
		toJSON: () => array
	}
}

export type OrderedDictionary<T> = ReturnType<typeof makeOrderedDictionary<T>>
