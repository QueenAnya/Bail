/**
 * Turso / libSQL auth state.
 *
 * One adapter for both shapes Turso offers, because `@libsql/client` speaks one protocol for both:
 *
 *   local   — a file on disk:            { path: './auth.db' }   →  file:./auth.db
 *   remote  — a Turso cloud database:    { url: 'libsql://<db>-<org>.turso.io', authToken: '…' }
 *
 * `url` may also be given for a local file (`file:./auth.db`), and `path` may be given for a remote one — the two are
 * just conveniences over the same `url` field. Tokens are only sent when one is supplied, so a local file needs
 * neither an account nor a token.
 *
 * Rows live in one table, one row per auth key:
 *
 *   baileys_auth(session TEXT, type TEXT, id TEXT, value TEXT, PRIMARY KEY (session, type, id))
 *
 * `@libsql/client` is loaded lazily, so a bot that does not use Turso never needs it installed.
 */
import { normalizeAuthArgs, promoteHandle } from '../Utils/auth-args'
import { type AuthStore, type DatabaseAuthState, loadOptionalModule, makeAuthStateFromStore } from './auth-store'

export interface TursoAuthStateOptions {
	/** local database file, e.g. `./auth.db` — turned into `file:./auth.db` */
	path?: string
	/** `libsql://…turso.io` for cloud, or `file:…` / `http(s)://…` — wins over `path` when both are given */
	url?: string
	/** Turso database token; only needed for a remote database */
	authToken?: string
	/** an existing `@libsql/client` client (it is NOT closed by `close()`) */
	client?: any
	/** session name, lets several bots share one database, default `default` */
	session?: string
	/** table name, default `baileys_auth` */
	table?: string
}

const DEFAULT_TABLE = 'baileys_auth'

/** `./auth.db` → `file:./auth.db`; anything already carrying a scheme is left alone */
export const toLibsqlUrl = (opts: Pick<TursoAuthStateOptions, 'path' | 'url'>): string => {
	if (opts.url) {
		return opts.url
	}

	if (opts.path) {
		return opts.path.includes(':') ? opts.path : `file:${opts.path}`
	}

	throw new Error('useTursoAuthState needs a `path` (local file) or a `url` (libsql://… for Turso cloud)')
}

const quote = (name: string): string => `"${name.replace(/"/g, '""')}"`

export async function useTursoAuthState(
	/** `(url)`, `(url, token, session)`, `({ url, authToken, session })`, `({ path })`. */
	a: string | TursoAuthStateOptions = {},
	b?: string | TursoAuthStateOptions,
	c?: string
): Promise<DatabaseAuthState> {
	const opts = promoteHandle(
		normalizeAuthArgs<TursoAuthStateOptions>(
			[a, b, c],
			['url', 'authToken', 'session'],
			['url', 'path', 'authToken', 'table', 'client', 'session']
		),
		['url', 'path'],
		'client',
		(v: any) => typeof v?.execute === 'function' || typeof v?.batch === 'function'
	)
	const session = opts.session ?? 'default'
	const table = quote(opts.table ?? DEFAULT_TABLE)
	let client = opts.client
	let owned = false

	if (!client) {
		const url = toLibsqlUrl(opts)
		const libsql = await loadOptionalModule('@libsql/client', 'useTursoAuthState')
		client = libsql.createClient({
			url,
			...(opts.authToken ? { authToken: opts.authToken } : {})
		})
		owned = true
	}

	const exec = (sql: string, args: unknown[] = []) => client.execute({ sql, args })

	await exec(`CREATE TABLE IF NOT EXISTS ${table} (
		session TEXT NOT NULL,
		type TEXT NOT NULL,
		id TEXT NOT NULL,
		value TEXT NOT NULL,
		PRIMARY KEY (session, type, id)
	)`)

	const store: AuthStore = {
		read: async (type, id) => {
			const result = await exec(`SELECT value FROM ${table} WHERE session = ? AND type = ? AND id = ?`, [
				session,
				type,
				id
			])
			const row = result?.rows?.[0]
			return row ? String(row.value) : null
		},
		readMany: async (type, ids) => {
			if (!ids.length) {
				return {}
			}

			const placeholders = ids.map(() => '?').join(', ')
			const result = await exec(
				`SELECT id, value FROM ${table} WHERE session = ? AND type = ? AND id IN (${placeholders})`,
				[session, type, ...ids]
			)

			const rows: Record<string, string> = {}
			for (const row of result?.rows ?? []) {
				rows[String(row.id)] = String(row.value)
			}

			return rows
		},
		write: async (type, id, value) => {
			await exec(
				`INSERT INTO ${table} (session, type, id, value) VALUES (?, ?, ?, ?)
				 ON CONFLICT(session, type, id) DO UPDATE SET value = excluded.value`,
				[session, type, id, value]
			)
		},
		apply: async (writes, removals) => {
			/** libSQL batches run in one implicit transaction, which is what an app-state patch needs */
			const statements = [
				...writes.map(entry => ({
					sql: `INSERT INTO ${table} (session, type, id, value) VALUES (?, ?, ?, ?)
					      ON CONFLICT(session, type, id) DO UPDATE SET value = excluded.value`,
					args: [session, entry.type, entry.id, entry.value]
				})),
				...removals.map(entry => ({
					sql: `DELETE FROM ${table} WHERE session = ? AND type = ? AND id = ?`,
					args: [session, entry.type, entry.id]
				}))
			]

			if (!statements.length) {
				return
			}

			if (typeof client.batch === 'function') {
				await client.batch(statements, 'write')
				return
			}

			for (const statement of statements) {
				await client.execute(statement)
			}
		},
		list: async function* (type) {
			const pageSize = 500
			let lastId: string | null = null
			for (;;) {
				const result = lastId
					? await exec(`SELECT id, value FROM ${table} WHERE session = ? AND type = ? AND id > ? ORDER BY id LIMIT ?`, [
							session,
							type,
							lastId,
							pageSize
						])
					: await exec(`SELECT id, value FROM ${table} WHERE session = ? AND type = ? ORDER BY id LIMIT ?`, [
							session,
							type,
							pageSize
						])

				const rows = result.rows as unknown as Array<{ id: string; value: string }>
				if (!rows.length) {
					return
				}

				for (const row of rows) {
					yield [String(row.id), String(row.value)] as const
				}

				if (rows.length < pageSize) {
					return
				}

				lastId = String(rows[rows.length - 1]!.id)
			}
		},
		listIds: async function* (type) {
			const result = await exec(`SELECT id FROM ${table} WHERE session = ? AND type = ? ORDER BY id`, [session, type])
			for (const row of result.rows as unknown as Array<{ id: string }>) {
				yield String(row.id)
			}
		},
		clear: async () => {
			await exec(`DELETE FROM ${table} WHERE session = ?`, [session])
		},
		close: async () => {
			if (owned) {
				await client.close?.()
			}
		}
	}

	return makeAuthStateFromStore(store)
}
