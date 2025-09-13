import makeOrderedDictionary from './make-ordered-dictionary'
import { ObjectRepository } from './object-repository'
import fs from 'fs/promises'
import path from 'path'

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
    // minimal binding example: keep contacts and chats reactive if socket emits updates
    const ev = socket?.ev
    if (!ev || typeof ev.on !== 'function') return

    // example: when connection update contains 'contacts' or 'chats' payloads
    ev.on('creds.update', ({ creds }: any) => {
      // creds may contain me / my info; store if needed
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

    // allow external writes to persist
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
