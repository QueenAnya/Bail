export type Comparable<T, K = string> = {
  key: (x: T) => K
  compare?: (a: K, b: K) => number
}

export default function makeOrderedDictionary<T, K = string>(
  opts?: Comparable<T, K>,
) {
  const keyFn = opts?.key ?? ((x: any) => x.id as unknown as K)
  const compare = opts?.compare ?? ((a: any, b: any) => (a > b ? 1 : a < b ? -1 : 0))

  const map = new Map<K, T>()
  const order: K[] = []

  return {
    get size() {
      return map.size
    },
    set(item: T) {
      const k = keyFn(item)
      if (!map.has(k)) order.push(k)
      map.set(k, item)
    },
    get(k: K) {
      return map.get(k)
    },
    has(k: K) {
      return map.has(k)
    },
    delete(k: K) {
      const existed = map.delete(k)
      const idx = order.indexOf(k)
      if (idx !== -1) order.splice(idx, 1)
      return existed
    },
    slice(start = 0, end = order.length) {
      return order.slice(start, end).map(k => map.get(k)!) as T[]
    },
    toJSON() {
      return order.map(k => map.get(k))
    },
    clear() {
      map.clear()
      order.length = 0
    },
    entries() {
      return Array.from(order).map(k => [k, map.get(k)!] as [K, T])
    }
  }
}
