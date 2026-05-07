/**
 * Ordered Dictionary — maintains insertion order while providing O(1) id-based lookup.
 * Ported from innovatorssoft/Baileys
 */

export interface OrderedDictionary<T> {
	array: T[]
	get(id: string): T | undefined
	upsert(item: T, mode: 'append' | 'prepend'): void
	update(item: T): boolean
	updateAssign(id: string, update: Partial<T>): boolean
	remove(item: T): boolean
	clear(): void
	filter(contain: (item: T) => boolean): void
	toJSON(): T[]
	fromJSON(newItems: T[]): void
}

export const makeOrderedDictionary = <T>(idGetter: (item: T) => string): OrderedDictionary<T> => {
	const array: T[] = []
	const dict: Record<string, T> = {}

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

	const upsert = (item: T, mode: 'append' | 'prepend'): void => {
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

	return {
		array,
		get,
		upsert,
		update,
		remove,
		updateAssign(id, upd) {
			const item = get(id)
			if (item) {
				Object.assign(item as object, upd)
				delete dict[id]
				dict[idGetter(item)] = item
				return true
			}
			return false
		},
		clear() {
			array.splice(0, array.length)
			for (const key of Object.keys(dict)) delete dict[key]
		},
		filter(contain) {
			let i = 0
			while (i < array.length) {
				if (!contain(array[i]!)) {
					delete dict[idGetter(array[i]!)]
					array.splice(i, 1)
				} else {
					i++
				}
			}
		},
		toJSON: () => array,
		fromJSON(newItems) {
			array.splice(0, array.length, ...newItems)
		}
	}
}
