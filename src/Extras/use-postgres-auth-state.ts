/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT) - Utils/use-postgres-auth-state.js, rewritten in TypeScript.
 *
 * Stores the auth state in PostgreSQL (`pg`, a runtime dependency).
 */
import { normalizeAuthArgs, promoteHandle } from '../Utils/auth-args'
import { type AuthStore, type DatabaseAuthState, loadOptionalModule, makeAuthStateFromStore } from './auth-store'

export interface PostgresAuthStateOptions {
	/** an existing `pg` Pool (it is NOT closed by `close()`) */
	pool?: any
	/** connection string, used when no pool is given */
	connectionString?: string
	/** Alias for `connectionString` — every adapter accepts the same key. */
	url?: string
	/** `pg` Pool config, used when no pool is given */
	config?: any
	/** table name (plain identifier), default `baileys_auth` */
	table?: string
	/** session name, lets several bots share one table, default `default` */
	session?: string
}

const quoteIdentifier = (name: string): string => {
	if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
		throw new Error(`table name must be a plain identifier, got ${JSON.stringify(name)}`)
	}

	return `"${name}"`
}

export async function usePostgresAuthState(
	/** `(connectionString)`, `(connectionString, table, session)`, `({ connectionString, table, session })`, `({ pool })`. */
	a: string | PostgresAuthStateOptions = {},
	b?: string | PostgresAuthStateOptions,
	c?: string
): Promise<DatabaseAuthState> {
	const opts = promoteHandle(
		normalizeAuthArgs<PostgresAuthStateOptions>(
			[a, b, c],
			['connectionString', 'table', 'session'],
			['connectionString', 'url', 'pool', 'config', 'table', 'session']
		),
		['connectionString', 'url'],
		'pool',
		(v: any) => typeof v?.query === 'function'
	)
	const table = quoteIdentifier(opts.table ?? 'baileys_auth')
	const session = opts.session ?? 'default'
	let pool = opts.pool
	let owned = false

	if (!pool) {
		// `url` is accepted as a synonym for `connectionString` so every adapter takes the same shape
		const connectionString = opts.connectionString ?? opts.url
		if (!connectionString && !opts.config) {
			throw new Error('usePostgresAuthState needs a pool, a connectionString, or a config')
		}

		const pg = await loadOptionalModule('pg', 'usePostgresAuthState')
		pool = new pg.Pool(opts.config ?? { connectionString })
		owned = true
	}

	await pool.query(`CREATE TABLE IF NOT EXISTS ${table} (
		session TEXT NOT NULL,
		type TEXT NOT NULL,
		id TEXT NOT NULL,
		value TEXT NOT NULL,
		PRIMARY KEY (session, type, id)
	)`)

	const upsert = `INSERT INTO ${table} (session, type, id, value) VALUES ($1, $2, $3, $4)
		ON CONFLICT (session, type, id) DO UPDATE SET value = EXCLUDED.value`

	const store: AuthStore = {
		read: async (type, id) => {
			const result = await pool.query(`SELECT value FROM ${table} WHERE session = $1 AND type = $2 AND id = $3`, [
				session,
				type,
				id
			])
			return result.rows[0]?.value ?? null
		},
		readMany: async (type, ids) => {
			if (!ids.length) {
				return {}
			}

			const result = await pool.query(
				`SELECT id, value FROM ${table} WHERE session = $1 AND type = $2 AND id = ANY($3)`,
				[session, type, ids]
			)
			const rows: Record<string, string> = {}
			for (const row of result.rows) {
				rows[row.id] = row.value
			}

			return rows
		},
		write: async (type, id, value) => {
			await pool.query(upsert, [session, type, id, value])
		},
		apply: async (writes, removals) => {
			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				for (const entry of writes) {
					await client.query(upsert, [session, entry.type, entry.id, entry.value])
				}

				for (const entry of removals) {
					await client.query(`DELETE FROM ${table} WHERE session = $1 AND type = $2 AND id = $3`, [
						session,
						entry.type,
						entry.id
					])
				}

				await client.query('COMMIT')
			} catch (err) {
				await client.query('ROLLBACK')
				throw err
			} finally {
				client.release()
			}
		},
		/**
		 * Paged so a large account is streamed rather than buffered — `migrateAuthState` consumes this directly.
		 */
		list: async function* (type) {
			const pageSize = 500
			let lastId: string | null = null
			for (;;) {
				const result: { rows: { id: string; value: string }[] } = lastId
					? await pool.query(
							`SELECT id, value FROM ${table} WHERE session = $1 AND type = $2 AND id > $3 ORDER BY id LIMIT $4`,
							[session, type, lastId, pageSize]
						)
					: await pool.query(`SELECT id, value FROM ${table} WHERE session = $1 AND type = $2 ORDER BY id LIMIT $3`, [
							session,
							type,
							pageSize
						])

				if (!result.rows.length) {
					return
				}

				for (const row of result.rows) {
					yield [row.id, row.value] as const
				}

				if (result.rows.length < pageSize) {
					return
				}

				lastId = result.rows[result.rows.length - 1]!.id
			}
		},
		listIds: async function* (type) {
			const result: { rows: { id: string }[] } = await pool.query(
				`SELECT id FROM ${table} WHERE session = $1 AND type = $2 ORDER BY id`,
				[session, type]
			)
			for (const row of result.rows) {
				yield row.id
			}
		},
		clear: async () => {
			await pool.query(`DELETE FROM ${table} WHERE session = $1`, [session])
		},
		close: async () => {
			if (owned) {
				await pool.end()
			}
		}
	}

	return makeAuthStateFromStore(store)
}
