import { jest } from '@jest/globals'
import { useSqliteAuthState2 } from '../../ported'

const makeFakeDatabase = () => {
	const creds = new Map<string, string>()
	const keys = new Map<string, string>()
	const key = (type: string, id: string) => `${type}\u0000${id}`
	const database: any = {
		open: true,
		pragma: jest.fn(() => undefined),
		exec: jest.fn(() => undefined),
		prepare: jest.fn((sql: string) => {
			const normalized = sql.replace(/\s+/g, ' ').trim()
			if (normalized.startsWith('SELECT value FROM creds')) {
				return { get: (id: string) => (creds.has(id) ? { value: creds.get(id) } : undefined) }
			}
			if (normalized.startsWith('INSERT INTO creds')) {
				return { run: (id: string, value: string) => void creds.set(id, value) }
			}
			if (normalized.startsWith('SELECT value FROM signal_keys')) {
				return { get: (type: string, id: string) => (keys.has(key(type, id)) ? { value: keys.get(key(type, id)) } : undefined) }
			}
			if (normalized.startsWith('INSERT INTO signal_keys')) {
				return { run: (type: string, id: string, value: string) => void keys.set(key(type, id), value) }
			}
			if (normalized.startsWith('DELETE FROM signal_keys WHERE')) {
				return { run: (type: string, id: string) => void keys.delete(key(type, id)) }
			}
			if (normalized === 'DELETE FROM signal_keys') {
				return { run: () => keys.clear() }
			}
			if (normalized === 'DELETE FROM creds') {
				return { run: () => creds.clear() }
			}
			throw new Error(`Unexpected SQL in fake database: ${normalized}`)
		}),
		transaction: jest.fn((fn: (...args: any[]) => unknown) => (...args: any[]) => fn(...args)),
		close: jest.fn(() => {
			database.open = false
		})
	}
	return { database, creds, keys }
}

describe('useSqliteAuthState2', () => {
	it('round-trips keys and credentials, supports clearAuth, and is exported from the ported barrel', async () => {
		const { database, creds, keys } = makeFakeDatabase()
		const auth = await useSqliteAuthState2({ database })
		await auth.state.keys.set({ session: { first: Buffer.from('0102', 'hex') } })
		const loaded = await auth.state.keys.get('session', ['first', 'missing'])
		expect(Buffer.from(loaded.first!).toString('hex')).toBe('0102')
		expect(loaded.missing).toBeUndefined()

		await auth.saveCreds()
		expect(creds.has('__creds__')).toBe(true)
		expect(keys.size).toBe(1)
		await auth.clearAuth()
		expect(creds.size).toBe(0)
		expect(keys.size).toBe(0)
	})

	it('does not close a caller-owned database instance', async () => {
		const { database } = makeFakeDatabase()
		const auth = await useSqliteAuthState2({ database })
		await auth.close()
		expect(database.close).not.toHaveBeenCalled()
		expect(database.open).toBe(true)
	})
})
