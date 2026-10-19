import { jest } from '@jest/globals'
import { useMongoAuthState2 } from '../../Extras'

type Doc = { session: string; type: string; id: string; value: string }

const makeCollection = () => {
	const rows = new Map<string, Doc>()
	const key = (s: string, t: string, id: string) => `${s}\u0000${t}\u0000${id}`
	const collection = {
		createIndex: jest.fn(async () => 'session_type_id_unique'),
		findOne: jest.fn(async (filter: any) => rows.get(key(filter.session, filter.type, filter.id)) ?? null),
		find: jest.fn((filter: any) => ({
			toArray: async () =>
				[...rows.values()].filter(
					doc => doc.session === filter.session && doc.type === filter.type && filter.id.$in.includes(doc.id)
				)
		})),
		updateOne: jest.fn(async (filter: any, update: any) => {
			rows.set(key(filter.session, filter.type, filter.id), {
				...filter,
				value: update.$set.value
			})
		}),
		deleteOne: jest.fn(async (filter: any) => {
			rows.delete(key(filter.session, filter.type, filter.id))
		}),
		bulkWrite: jest.fn(async (ops: any[]) => {
			for (const op of ops) {
				if (op.updateOne) {
					const { filter, update } = op.updateOne
					rows.set(key(filter.session, filter.type, filter.id), { ...filter, value: update.$set.value })
				} else if (op.deleteOne) {
					const { session, type, id } = op.deleteOne.filter
					rows.delete(key(session, type, id))
				}
			}
		}),
		deleteMany: jest.fn(async (filter: any) => {
			for (const [k, doc] of rows) if (doc.session === filter.session) rows.delete(k)
		})
	}
	return { collection, rows }
}

describe('useMongoAuthState2', () => {
	it('supports batch reads/writes, session isolation, clearAuth and root export', async () => {
		const { collection, rows } = makeCollection()
		const first = await useMongoAuthState2({ collection, session: 'bot-a' })
		const second = await useMongoAuthState2({ collection, session: 'bot-b' })

		await first.state.keys.set({ session: { one: Buffer.from('01', 'hex'), two: Buffer.from('02', 'hex') } })
		await second.state.keys.set({ session: { one: Buffer.from('ff', 'hex') } })
		const got = await first.state.keys.get('session', ['one', 'two', 'missing'])
		expect(Buffer.from(got.one!).toString('hex')).toBe('01')
		expect(Buffer.from(got.two!).toString('hex')).toBe('02')
		expect(got.missing).toBeUndefined()
		expect(collection.bulkWrite).toHaveBeenCalledWith(expect.any(Array), { ordered: false })

		await first.clearAuth()
		expect([...rows.values()].every(row => row.session === 'bot-b')).toBe(true)
		await first.close()
		await second.close()
	})

	it('accepts a Db object and does not close externally owned clients', async () => {
		const { collection } = makeCollection()
		const client = { db: jest.fn(() => ({ collection: jest.fn(() => collection) })), close: jest.fn(async () => {}) }
		const auth = await useMongoAuthState2({ client, dbName: 'test-db' })
		expect(client.db).toHaveBeenCalledWith('test-db')
		await auth.close()
		expect(client.close).not.toHaveBeenCalled()
	})

	it('requires a collection, db, client or URI', async () => {
		await expect(useMongoAuthState2()).rejects.toThrow('needs a collection, a db, a client, or a uri')
	})
})
