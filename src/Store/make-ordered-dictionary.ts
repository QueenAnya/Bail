function makeOrderedDictionary<T>(idGetter: (item: T) => string) {
	const array: T[] = []
	const dict: { [_: string]: T } = {}

	const get = (id: string): T | undefined => dict[id]

	const update = (item: T) => {
		const id = idGetter(item)
		const idx = array.findIndex(i => idGetter(i) === id)
		if (idx >= 0) {
			array[idx] = item
			dict[id] = item
			return true
		}
		return false
	}

	const upsert = (item: T) => {
		if (!update(item)) {
			array.push(item)
			dict[idGetter(item)] = item
		}
	}

	const remove = (predicate: (item: T, index: number) => boolean) => {
		for (let i = 0; i < array.length; ) {
			if (predicate(array[i], i)) {
				delete dict[idGetter(array[i])]
				array.splice(i, 1)
			} else i++
		}
	}

	const all = () => array.slice()

	const toJSON = () => array.slice()
	const fromJSON = (newItems: T[]) => {
		array.splice(0, array.length, ...newItems)
		// rebuild dict
		for (const k of Object.keys(dict)) delete dict[k]
		for (const item of newItems) dict[idGetter(item)] = item
	}

	return { get, update, upsert, remove, all, toJSON, fromJSON }
}

export default makeOrderedDictionary
