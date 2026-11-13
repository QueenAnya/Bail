import { jest } from '@jest/globals'
import { proto } from '../../../WAProto/index.js'
import {
	type AuthStore,
	type AuthStoreEntry,
	makeAuthStateFromStore,
	useMySQLAuthState,
	useNekoDBAuth,
	usePostgresAuthState,
	useRedisAuthState
} from '../../Extras'

/** in-memory AuthStore: (type, id) -> json string */
const makeMemoryStore = () => {
	const rows = new Map<string, string>()
	const k = (type: string, id: string) => `${type}\u0000${id}`
	const store: AuthStore = {
		read: async (type, id) => rows.get(k(type, id)) ?? null,
		readMany: async (type, ids) => {
			const out: Record<string, string> = {}
			for (const id of ids) {
				const v = rows.get(k(type, id))
				if (v !== undefined) out[id] = v
			}

			return out
		},
		write: async (type, id, value) => void rows.set(k(type, id), value),
		list: async function* (type) {
			for (const [key, value] of rows) {
				const [rowType, id = ''] = key.split('\u0000')
				if (rowType === type) yield [id, value] as const
			}
		},
		apply: async (writes: AuthStoreEntry[], removals) => {
			for (const w of writes) rows.set(k(w.type, w.id), w.value)
			for (const r of removals) rows.delete(k(r.type, r.id))
		},
		clear: async () => rows.clear()
	}
	return { store, rows }
}

describe('makeAuthStateFromStore', () => {
	it('creates fresh creds when the store is empty and saves them with saveCreds', async () => {
		const { store, rows } = makeMemoryStore()
		const auth = await makeAuthStateFromStore(store)
		expect(auth.state.creds.registrationId).toEqual(expect.any(Number))
		expect(rows.size).toBe(0)
		await auth.saveCreds()
		expect(rows.has('creds\u0000creds')).toBe(true)

		const again = await makeAuthStateFromStore(store)
		expect(again.state.creds.registrationId).toBe(auth.state.creds.registrationId)
		expect(Buffer.from(again.state.creds.noiseKey.private).equals(Buffer.from(auth.state.creds.noiseKey.private))).toBe(
			true
		)
	})

	it('round-trips Buffer keys, removes keys set to null and rebuilds app-state-sync-key as proto', async () => {
		const { store } = makeMemoryStore()
		const auth = await makeAuthStateFromStore(store)
		await auth.state.keys.set({
			'pre-key': { '1': { private: Buffer.from('aa', 'hex'), public: Buffer.from('bb', 'hex') } },
			session: { 'x@s.whatsapp.net': Buffer.from('cafebabe', 'hex') },
			'app-state-sync-key': { K1: proto.Message.AppStateSyncKeyData.create({ keyData: Buffer.from('0102', 'hex') }) }
		})

		const got = await auth.state.keys.get('session', ['x@s.whatsapp.net', 'missing'])
		expect(Buffer.from(got['x@s.whatsapp.net']!).toString('hex')).toBe('cafebabe')
		expect(got.missing).toBeUndefined()

		const pre = await auth.state.keys.get('pre-key', ['1'])
		expect(Buffer.from(pre['1']!.private).toString('hex')).toBe('aa')

		const sync = await auth.state.keys.get('app-state-sync-key', ['K1'])
		expect(sync.K1).toBeInstanceOf(proto.Message.AppStateSyncKeyData)

		await auth.state.keys.set({ session: { 'x@s.whatsapp.net': null } })
		expect((await auth.state.keys.get('session', ['x@s.whatsapp.net']))['x@s.whatsapp.net']).toBeUndefined()
	})

	it('clearAuth empties the store and close() closes it', async () => {
		const { store, rows } = makeMemoryStore()
		store.close = jest.fn(async () => {})
		const auth = await makeAuthStateFromStore(store)
		await auth.state.keys.set({ session: { a: Buffer.from('01', 'hex') } })
		expect(rows.size).toBe(1)
		await auth.clearAuth()
		expect(rows.size).toBe(0)
		await auth.close()
		expect(store.close).toHaveBeenCalled()
	})
})

describe('usePostgresAuthState (fake pool)', () => {
	const makeFakePool = () => {
		const data = new Map<string, string>()
		const log: string[] = []
		const key = (s: string, t: string, i: string) => `${s}|${t}|${i}`
		const run = async (sql: string, p: any[] = []) => {
			const text = sql.replace(/\s+/g, ' ').trim()
			log.push(text.split(' ').slice(0, 3).join(' '))
			if (text.startsWith('CREATE TABLE')) return { rows: [] }
			if (text.startsWith('INSERT INTO')) {
				data.set(key(p[0], p[1], p[2]), p[3])
				return { rows: [] }
			}

			if (text.startsWith('SELECT value'))
				return { rows: data.has(key(p[0], p[1], p[2])) ? [{ value: data.get(key(p[0], p[1], p[2])) }] : [] }
			if (text.startsWith('SELECT id, value')) {
				return {
					rows: (p[2] as string[])
						.filter(i => data.has(key(p[0], p[1], i)))
						.map(i => ({ id: i, value: data.get(key(p[0], p[1], i)) }))
				}
			}

			if (text.startsWith('DELETE FROM') && text.includes('AND type = $2 AND id = $3')) {
				data.delete(key(p[0], p[1], p[2]))
				return { rows: [] }
			}

			if (text.startsWith('DELETE FROM')) {
				for (const k of [...data.keys()]) if (k.startsWith(p[0] + '|')) data.delete(k)
				return { rows: [] }
			}

			return { rows: [] } // BEGIN / COMMIT / ROLLBACK
		}

		const client = { query: run, release: jest.fn() }
		return { pool: { query: run, connect: async () => client, end: jest.fn(async () => {}) }, data, log, client }
	}

	it('creates the table, stores / reads / removes keys in a transaction and keeps sessions apart', async () => {
		const { pool, data, log, client } = makeFakePool()
		const a = await usePostgresAuthState({ pool, session: 'bot-a' })
		const b = await usePostgresAuthState({ pool, session: 'bot-b' })
		expect(log[0]).toBe('CREATE TABLE IF')

		await a.state.keys.set({ session: { one: Buffer.from('01', 'hex'), two: Buffer.from('02', 'hex') } })
		await b.state.keys.set({ session: { one: Buffer.from('ff', 'hex') } })
		expect(log).toContain('BEGIN')
		expect(log).toContain('COMMIT')
		expect(client.release).toHaveBeenCalled()

		const got = await a.state.keys.get('session', ['one', 'two', 'three'])
		expect(Buffer.from(got.one!).toString('hex')).toBe('01')
		expect(Buffer.from(got.two!).toString('hex')).toBe('02')
		expect(got.three).toBeUndefined()
		expect(Buffer.from((await b.state.keys.get('session', ['one'])).one!).toString('hex')).toBe('ff')

		await a.state.keys.set({ session: { one: null } })
		expect((await a.state.keys.get('session', ['one'])).one).toBeUndefined()

		await a.clearAuth()
		expect([...data.keys()].every(k => k.startsWith('bot-b|'))).toBe(true)
		await a.close()
		expect(pool.end).not.toHaveBeenCalled() // the pool was passed in, so it is not closed
	})

	it('rejects unsafe table names and needs a pool / connectionString', async () => {
		const { pool } = makeFakePool()
		await expect(usePostgresAuthState({ pool, table: 'x; drop table y' })).rejects.toThrow('plain identifier')
		await expect(usePostgresAuthState({})).rejects.toThrow('needs a pool')
	})
})

describe('useMySQLAuthState (fake pool)', () => {
	it('uses ON DUPLICATE KEY, IN (?) with an array and a transaction for apply()', async () => {
		const data = new Map<string, string>()
		const log: string[] = []
		const key = (s: string, t: string, i: string) => `${s}|${t}|${i}`
		const run = async (sql: string, p: any[] = []) => {
			const text = sql.replace(/\s+/g, ' ').trim()
			log.push(text.split(' ')[0]!)
			if (text.startsWith('INSERT INTO')) {
				expect(text).toContain('ON DUPLICATE KEY UPDATE')
				data.set(key(p[0], p[1], p[2]), p[3])
				return [[]]
			}

			if (text.startsWith('SELECT value'))
				return [data.has(key(p[0], p[1], p[2])) ? [{ value: data.get(key(p[0], p[1], p[2])) }] : []]
			if (text.startsWith('SELECT id, value')) {
				expect(text).toContain('IN (?)')
				expect(Array.isArray(p[2])).toBe(true)
				return [
					(p[2] as string[])
						.filter(i => data.has(key(p[0], p[1], i)))
						.map(i => ({ id: i, value: data.get(key(p[0], p[1], i)) }))
				]
			}

			if (text.startsWith('DELETE FROM') && text.includes('AND id = ?')) data.delete(key(p[0], p[1], p[2]))
			return [[]]
		}

		const connection = {
			query: run,
			beginTransaction: jest.fn(async () => {}),
			commit: jest.fn(async () => {}),
			rollback: jest.fn(async () => {}),
			release: jest.fn()
		}
		const pool = { query: run, getConnection: async () => connection, end: jest.fn(async () => {}) }
		const auth = await useMySQLAuthState({ pool })
		await auth.state.keys.set({
			'pre-key': { '5': { private: Buffer.from('aa', 'hex'), public: Buffer.from('bb', 'hex') } }
		})
		expect(connection.beginTransaction).toHaveBeenCalled()
		expect(connection.commit).toHaveBeenCalled()
		const got = await auth.state.keys.get('pre-key', ['5', '6'])
		expect(Buffer.from(got['5']!.public).toString('hex')).toBe('bb')
		expect(got['6']).toBeUndefined()

		await auth.state.keys.set({ 'pre-key': { '5': null } })
		expect((await auth.state.keys.get('pre-key', ['5']))['5']).toBeUndefined()
	})

	it('rolls back when a write fails', async () => {
		const connection = {
			query: async () => {
				throw new Error('boom')
			},
			beginTransaction: async () => {},
			commit: jest.fn(async () => {}),
			rollback: jest.fn(async () => {}),
			release: jest.fn()
		}
		const pool = { query: async () => [[]], getConnection: async () => connection, end: async () => {} }
		const auth = await useMySQLAuthState({ pool })
		await expect(auth.state.keys.set({ session: { a: Buffer.from('01', 'hex') } })).rejects.toThrow('boom')
		expect(connection.rollback).toHaveBeenCalled()
		expect(connection.release).toHaveBeenCalled()
	})
})

describe('useRedisAuthState (fake ioredis client)', () => {
	const makeFakeRedis = () => {
		const hashes = new Map<string, Map<string, string>>()
		const h = (k: string) => hashes.get(k) ?? hashes.set(k, new Map()).get(k)!
		const client: any = {
			hget: async (k: string, f: string) => hashes.get(k)?.get(f) ?? null,
			hmget: async (k: string, fields: string[]) => fields.map(f => hashes.get(k)?.get(f) ?? null),
			hset: async (k: string, f: string, v: string) => void h(k).set(f, v),
			hdel: async (k: string, f: string) => void h(k).delete(f),
			del: async (keys: string[]) => keys.forEach(k => hashes.delete(k)),
			keys: async (pattern: string) => [...hashes.keys()].filter(k => k.startsWith(pattern.replace('*', ''))),
			multi: () => {
				const ops: (() => Promise<void>)[] = []
				const chain: any = {
					hset: (k: string, f: string, v: string) => (ops.push(() => client.hset(k, f, v)), chain),
					hdel: (k: string, f: string) => (ops.push(() => client.hdel(k, f)), chain),
					exec: async () => {
						for (const op of ops) await op()
					}
				}
				return chain
			},
			quit: jest.fn(async () => {})
		}
		return { client, hashes }
	}

	it('stores one hash per key type and isolates sessions', async () => {
		const { client, hashes } = makeFakeRedis()
		const a = await useRedisAuthState({ client, session: 's1' })
		const b = await useRedisAuthState({ client, session: 's2', prefix: 'other' })
		await a.state.keys.set({
			session: { x: Buffer.from('0a', 'hex') },
			'pre-key': { '1': { private: Buffer.from('01', 'hex'), public: Buffer.from('02', 'hex') } }
		})
		await b.state.keys.set({ session: { x: Buffer.from('0b', 'hex') } })
		expect([...hashes.keys()].sort()).toEqual([
			'baileys_auth:s1:pre-key',
			'baileys_auth:s1:session',
			'other:s2:session'
		])

		expect(Buffer.from((await a.state.keys.get('session', ['x'])).x!).toString('hex')).toBe('0a')
		expect(Buffer.from((await b.state.keys.get('session', ['x'])).x!).toString('hex')).toBe('0b')

		await a.state.keys.set({ session: { x: null } })
		expect((await a.state.keys.get('session', ['x'])).x).toBeUndefined()

		await a.clearAuth()
		expect([...hashes.keys()]).toEqual(['other:s2:session'])
		await a.close()
		expect(client.quit).not.toHaveBeenCalled() // client was passed in
	})

	it('works with node-redis style camelCase commands', async () => {
		const { client } = makeFakeRedis()
		const camel: any = {
			hGet: client.hget,
			hmGet: client.hmget,
			hSet: client.hset,
			hDel: client.hdel,
			del: client.del,
			keys: client.keys
		}
		const auth = await useRedisAuthState({ client: camel })
		await auth.state.keys.set({ session: { a: Buffer.from('09', 'hex') } })
		expect(Buffer.from((await auth.state.keys.get('session', ['a'])).a!).toString('hex')).toBe('09')
	})
})

describe('useNekoDBAuth (fake db)', () => {
	it('upserts docs, reads them back (incl. app-state-sync-key as proto) and drops the collection', async () => {
		const docs = new Map<string, any>()
		const col = {
			helper: () => ({
				upsert: async (where: any, doc: any) => void docs.set(where.k, doc),
				findOne: async (where: any) => docs.get(where.k) ?? null,
				deleteWhere: async (where: any) => void docs.delete(where.k)
			})
		}
		const db = { collection: () => col, deleteCollection: jest.fn(async () => docs.clear()) }
		const auth = await useNekoDBAuth(db)
		await auth.saveCreds()
		expect(docs.has('creds')).toBe(true)

		await auth.state.keys.set({
			session: { a: Buffer.from('0c', 'hex') },
			'app-state-sync-key': { K: proto.Message.AppStateSyncKeyData.create({ keyData: Buffer.from('01', 'hex') }) }
		})
		expect(Buffer.from((await auth.state.keys.get('session', ['a'])).a!).toString('hex')).toBe('0c')
		expect((await auth.state.keys.get('app-state-sync-key', ['K'])).K).toBeInstanceOf(proto.Message.AppStateSyncKeyData)

		await auth.state.keys.set({ session: { a: null } })
		expect(docs.has('session-a')).toBe(false)

		await auth.clearAuth()
		expect(db.deleteCollection).toHaveBeenCalledWith('baileys_auth')
		await expect(useNekoDBAuth({} as any)).rejects.toThrow('NekoDB')
	})
})
