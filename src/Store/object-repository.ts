/**
 * Simple in-memory object repository keyed by ID.
 * Ported from InnovatorsSoft Baileys.
 */
export class ObjectRepository<T extends { id?: string | number }> {
	private entityMap: Map<string | number, T>

	constructor(entities: Record<string | number, T> = {}) {
		this.entityMap = new Map(Object.entries(entities) as [string, T][])
	}

	findById(id: string | number): T | undefined {
		return this.entityMap.get(id)
	}

	findAll(): T[] {
		return Array.from(this.entityMap.values())
	}

	upsertById(id: string | number, entity: T): this {
		this.entityMap.set(id, { ...entity })
		return this
	}

	deleteById(id: string | number): boolean {
		return this.entityMap.delete(id)
	}

	count(): number {
		return this.entityMap.size
	}

	toJSON(): T[] {
		return this.findAll()
	}
}
