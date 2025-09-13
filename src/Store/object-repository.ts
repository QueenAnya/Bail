export class ObjectRepository<T extends { id?: string }> {
  readonly entityMap = new Map<string, T>()

  create(entity: T & { id: string }) {
    this.entityMap.set(entity.id, entity)
    return entity
  }

  findById(id: string) {
    return this.entityMap.get(id)
  }

  findAll() {
    return Array.from(this.entityMap.values())
  }

  update(id: string, patch: Partial<T>) {
    const cur = this.entityMap.get(id)
    if (!cur) return undefined
    const updated = Object.assign({}, cur, patch)
    this.entityMap.set(id, updated as T)
    return updated as T
  }

  deleteById(id: string) {
    return this.entityMap.delete(id)
  }

  count() {
    return this.entityMap.size
  }

  toJSON() {
    return this.findAll()
  }
}
