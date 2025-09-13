// Combined single-file ESM TypeScript version of the store (tsc-ready)
import fs from 'fs/promises'
import path from 'path'

export type Comparable<T, K = string> = {
  key: (x: T) => K
  compare?: (a: K, b: K) => number
}

// Ordered dictionary
export function makeOrderedDictionary<T, K = string>(opts?: Comparable<T, K>) {
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

// ObjectRepository
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

// makeInMemoryStore
export type InMemoryStoreOptions = {
  logger?: { info?: (...args: any[]) => void; debug?: (...args: any[]) => void; error?: (...args: any[]) => void }
  cwd?: string
  filename?: string
}

export default function makeInMemoryStore(opts: InMemoryStoreOptions = {}) {
  const logger = opts.logger ?? console
  const chats = makeOrderedDictionary<any, string>({ key: (c: any) => c.id })
  const contacts = new ObjectRepository<any>()
  const messages = new Map<string, any[]>() // chatId -> messages[]
  const labels = new ObjectRepository<any>()
  let isClone = false

  async function writeToFile() {
    if (!opts.cwd) return
    const dest = path.join(opts.cwd, opts.filename ?? 'baileys_store.json')
    const payload = {
      chats: chats.toJSON(),
      contacts: contacts.findAll(),
      messages: Array.from(messages.entries()),
      labels: labels.findAll(),
      generatedAt: Date.now(),
      isClone
    }
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.writeFile(dest, JSON.stringify(payload, null, 2), 'utf-8')
    logger.info?.('store written to', dest)
  }

  async function readFromFile() {
    if (!opts.cwd) return
    const src = path.join(opts.cwd, opts.filename ?? 'baileys_store.json')
    try {
      const raw = await fs.readFile(src, 'utf-8')
      const parsed = JSON.parse(raw)
      // restore chats
      if (Array.isArray(parsed.chats)) parsed.chats.forEach((c: any) => chats.set(c))
      if (Array.isArray(parsed.contacts)) parsed.contacts.forEach((c: any) => contacts.create(c))
      if (Array.isArray(parsed.messages)) parsed.messages.forEach(([k, v]: any) => messages.set(k, v))
      if (Array.isArray(parsed.labels)) parsed.labels.forEach((l: any) => labels.create(l))
      isClone = parsed.isClone ?? false
      logger.info?.('store loaded from', src)
    } catch (e: any) {
      logger.debug?.('no store file to read at', src)
    }
  }

  function bind(socket: { ev?: any; ws?: any } | any) {
    const ev = socket?.ev
    if (!ev || typeof ev.on !== 'function') return

    ev.on('creds.update', ({ creds }: any) => {
      logger.debug?.('creds updated')
    })

    ev.on('chats.set', ({ chats: newChats }: any) => {
      if (Array.isArray(newChats)) newChats.forEach((c: any) => chats.set(c))
    })

    ev.on('contacts.set', ({ contacts: newContacts }: any) => {
      if (Array.isArray(newContacts)) newContacts.forEach((c: any) => contacts.create(c))
    })

    ev.on('messages.upsert', ({ messages: newMessages, type }: any) => {
      if (!Array.isArray(newMessages)) return
      for (const m of newMessages) {
        const chatId = m.key?.remoteJid ?? m.chatId ?? 'unknown'
        const arr = messages.get(chatId) ?? []
        arr.push(m)
        messages.set(chatId, arr)
      }
    })

    ev.on('store.write', async () => {
      await writeToFile().catch(() => {})
    })
  }

  return {
    isClone,
    chats,
    contacts,
    messages,
    labels,
    writeToFile,
    readFromFile,
    bind,
    toJSON() {
      return {
        chats: chats.toJSON(),
        contacts: contacts.findAll(),
        messages: Array.from(messages.entries()),
        labels: labels.findAll()
      }
    }
  }
}

export { makeInMemoryStore }
