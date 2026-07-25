/**
 * Simple in-memory key-value repository backed by a Map.
 * Used by makeInMemoryStore to hold Labels.
 */
export class ObjectRepository<T extends object> {
	private readonly entityMap: Map<string, T>

	constructor(entities: Record<string, T> = {}) {
		this.entityMap = new Map(Object.entries(entities))
	}

	findById(id: string): T | undefined {
		return this.entityMap.get(id)
	}

	findAll(): T[] {
		return Array.from(this.entityMap.values())
	}

	upsertById(id: string, entity: T): void {
		this.entityMap.set(id, { ...entity })
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

	fromJSON(items: { id: string; [key: string]: any }[]): void {
		this.entityMap.clear()
		for (const item of items) {
			this.entityMap.set(item.id, item as T)
		}
	}
}
