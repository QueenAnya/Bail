/**
 * Generic in-memory keyed entity repository, used by the in-memory store
 * for labels.
 *
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 */

export class ObjectRepository<T> {
	private entityMap: Map<string, T>

	constructor(entities: Record<string, T> = {}) {
		this.entityMap = new Map(Object.entries(entities))
	}

	findById(id: string): T | undefined {
		return this.entityMap.get(id)
	}

	findAll(): T[] {
		return Array.from(this.entityMap.values())
	}

	upsertById(id: string, entity: T): Map<string, T> {
		return this.entityMap.set(id, { ...entity })
	}

	deleteById(id: string): boolean {
		return this.entityMap.delete(id)
	}

	count(): number {
		return this.entityMap.size
	}

	toJSON(): T[] {
		return this.findAll()
	}
}
