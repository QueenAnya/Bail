/**
 * SQLite auth-state adapter ported from @rexxhayanasi/elaina-baileys' Utils/use-sqlite-auth-state.js
 * (MIT; upstream attribution is preserved in the repository's LICENSE).
 * Kept as `useSqliteAuthState2` so Anya's existing `useSqliteAuthState` API remains unchanged.
 *
 * Uses the same `creds` and `signal_keys` schema as the Elaina implementation. When an existing
 * database handle is supplied, its lifecycle remains owned by the caller; a handle created from
 * `dbPath` is owned and closed by this adapter.
 */
import type BetterSqlite3 from 'better-sqlite3'
import { proto } from '../../WAProto/index.js'
import type { AuthenticationState, AuthenticationStateWithListing, SignalDataTypeMap } from '../Types/index'
import { normalizeAuthArgs, pickAlias, promoteHandle } from '../Utils/auth-args'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import { resetCredsInPlace } from './auth-store'

export type SqliteAuthState2Options = {
	/** Path to a SQLite database file (created when it does not exist). */
	dbPath?: string
	/** alias of `dbPath` */
	path?: string
	/** Existing better-sqlite3 Database instance. This adapter will not close it. */
	database?: BetterSqlite3.Database
	/**
	 * Namespace this session inside the database: keys are stored as `<session>:<key>`.
	 *
	 * Omit it (or pass `default`) and rows look exactly as they always have, so an existing database keeps working.
	 * Set it and several bots can share one file.
	 */
	session?: string
}

export type SqliteAuthState2Result = {
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
	clearAuth: () => Promise<void>
	close: () => Promise<void>
}

const CREDS_ROW_KEY = '__creds__'
const CREATE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS creds (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS signal_keys (
  type TEXT NOT NULL,
  id TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (type, id)
);
CREATE INDEX IF NOT EXISTS signal_keys_type_idx ON signal_keys(type);
`

async function loadBetterSqlite3(): Promise<typeof BetterSqlite3> {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mod = (await import('better-sqlite3')) as any
		return (mod.default ?? mod) as typeof BetterSqlite3
	} catch (cause) {
		/** elaina calls this `helpful`; keep the name so the two files diff cleanly */
		const helpful = new Error(
			'`better-sqlite3` is required for `useSqliteAuthState2`. Install it with: `npm install better-sqlite3`.'
		)
		;(helpful as Error & { cause?: unknown }).cause = cause
		throw helpful
	}
}

/**
 * Create an Elaina-compatible SQLite auth state. Enables WAL mode and exposes `clearAuth()` and `close()`.
 * The existing `useSqliteAuthState` implementation is intentionally not modified.
 */
export async function useSqliteAuthState2(
	/**
	 * Options object, or positional arguments. Accepted shapes:
	 * `(dbPath)`, `(dbPath, session)`, `({ dbPath })`, `({ dbPath, session })`, `({ database })`.
	 */
	a: string | SqliteAuthState2Options,
	b?: string | SqliteAuthState2Options,
	c?: string
): Promise<SqliteAuthState2Result> {
	const opts = promoteHandle(
		normalizeAuthArgs<SqliteAuthState2Options>(
			[a, b, c],
			['dbPath', 'session'],
			['dbPath', 'path', 'database', 'session']
		),
		['dbPath', 'path'],
		'database',
		(v: any) => typeof v?.pragma === 'function' || typeof v?.prepare === 'function'
	)
	if (!opts.dbPath && !opts.path && !opts.database) {
		opts.dbPath = pickAlias<string>(opts, ['dbpath', 'db', 'file'])
	}

	const session = opts.session && opts.session !== 'default' ? opts.session : undefined
	/** every row is keyed through this, so a session is a key prefix and nothing else changes */
	const ns = (value: string) => (session ? `${session}:${value}` : value)
	let db: BetterSqlite3.Database
	let owned = false

	if (opts.database) {
		db = opts.database
	} else {
		// A missing (or misspelled) path used to fall through to `new Database(undefined)`, which is an in-memory
		// database — the bot would pair, then lose everything on restart. Fail loudly instead.
		const raw = opts.dbPath ?? opts.path
		// a typo'd option arrives here as an object, which better-sqlite3 would turn into an in-memory database
		const target = typeof raw === 'string' ? raw : undefined
		if (!target) {
			throw new Error(
				'useSqliteAuthState2 needs a `dbPath` (or a `path`, or an existing `database`). Pass `dbPath: ":memory:"` if you really want an in-memory store.'
			)
		}

		const Database = await loadBetterSqlite3()
		db = new Database(target)
		owned = true
	}

	try {
		db.pragma('journal_mode = WAL')
		db.pragma('synchronous = NORMAL')
		db.exec(CREATE_SCHEMA_SQL)

		const stmts = {
			credsSelect: db.prepare<[string]>('SELECT value FROM creds WHERE key = ?'),
			credsUpsert: db.prepare<[string, string]>(
				'INSERT INTO creds (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
			),
			keySelect: db.prepare<[string, string]>('SELECT value FROM signal_keys WHERE type = ? AND id = ?'),
			keyUpsert: db.prepare<[string, string, string]>(
				'INSERT INTO signal_keys (type, id, value) VALUES (?, ?, ?) ON CONFLICT(type, id) DO UPDATE SET value = excluded.value'
			),
			keyDelete: db.prepare<[string, string]>('DELETE FROM signal_keys WHERE type = ? AND id = ?'),
			clearKeys: db.prepare('DELETE FROM signal_keys'),
			clearCreds: db.prepare('DELETE FROM creds')
		} as const

		// only list()/listIds() need this statement, so it is prepared on first use rather than for every consumer
		let keyListStmt: BetterSqlite3.Statement<[string]> | undefined
		const keyList = () =>
			(keyListStmt ??= db.prepare<[string]>('SELECT id, value FROM signal_keys WHERE type = ? ORDER BY id'))

		const loadCreds = () => {
			const row = stmts.credsSelect.get(ns(CREDS_ROW_KEY)) as { value: string } | undefined
			return row ? (JSON.parse(row.value, BufferJSON.reviver) as AuthenticationState['creds']) : initAuthCreds()
		}

		const persistCreds = (creds: AuthenticationState['creds']) => {
			stmts.credsUpsert.run(ns(CREDS_ROW_KEY), JSON.stringify(creds, BufferJSON.replacer))
		}

		/** rows are stored with the session prefix inside both columns, so strip it back off the id */
		const stripPrefix = (value: string) => {
			if (!session) {
				return value
			}

			const head = `${session}:`
			return value.startsWith(head) ? value.slice(head.length) : value
		}

		const creds = loadCreds()
		const writeTx = db.transaction((data: Parameters<AuthenticationState['keys']['set']>[0]) => {
			for (const category in data) {
				const categoryData = data[category as keyof typeof data] as Record<string, unknown>
				for (const id in categoryData) {
					const value = categoryData[id]
					if (value) {
						const stringified = JSON.stringify(value, BufferJSON.replacer)
						stmts.keyUpsert.run(ns(category), ns(id), stringified)
					} else {
						stmts.keyDelete.run(ns(category), ns(id))
					}
				}
			}
		})

		return {
			state: {
				creds,
				keys: {
					get: async <T extends keyof SignalDataTypeMap>(type: T, ids: string[]) => {
						const data: { [id: string]: SignalDataTypeMap[T] } = {}
						for (const id of ids) {
							const row = stmts.keySelect.get(ns(type), ns(id)) as { value: string } | undefined
							if (row) {
								let value: unknown = JSON.parse(row.value, BufferJSON.reviver)
								if (type === 'app-state-sync-key' && value) {
									value = proto.Message.AppStateSyncKeyData.fromObject(value)
								}

								data[id] = value as SignalDataTypeMap[T]
							}
						}

						return data
					},
					set: async data => {
						writeTx(data)
					},
					/** `type` and `id` carry the session prefix in the table, so the id is stripped on the way out */
					list: async function* (type: keyof SignalDataTypeMap) {
						for (const row of keyList().all(ns(type)) as { id: string; value: string }[]) {
							const decoded = JSON.parse(row.value, BufferJSON.reviver)
							yield [stripPrefix(row.id), decoded] as const
						}
					},
					listIds: async function* (type: keyof SignalDataTypeMap) {
						for (const row of keyList().all(ns(type)) as { id: string }[]) {
							yield stripPrefix(row.id)
						}
					}
				}
			},
			saveCreds: async () => {
				persistCreds(creds)
			},
			clearAuth: async () => {
				if (!session) {
					const wipe = db.transaction(() => {
						stmts.clearKeys.run()
						stmts.clearCreds.run()
					})
					wipe()
					resetCredsInPlace(creds)
					return
				}

				/** only this session's rows — the other bots sharing the file keep theirs */
				const wipe = db.transaction(() => {
					db.prepare('DELETE FROM signal_keys WHERE type LIKE ?').run(`${session}:%`)
					db.prepare('DELETE FROM creds WHERE key LIKE ?').run(`${session}:%`)
				})
				wipe()
				resetCredsInPlace(creds)
			},
			close: async () => {
				if (owned && db.open) db.close()
			}
		}
	} catch (error) {
		if (owned && db.open) db.close()
		throw error
	}
}

/**
 * Elaina exports this adapter as `useSqliteAuthState`. That name is already taken at the package root by Anya's own
 * adapter (`src/Addons/use-sqlite-auth-state.ts`), so this module cannot re-export it without a clash. Import the
 * Elaina-compatible one as `useSqliteAuthState2`, or take `useSqliteAuthState` from the package root for Anya's.
 */

/**
 * Elaina's export name for this adapter.
 *
 * The pre-existing Anya adapter keeps the bare `useSqliteAuthState` name, so the Elaina-compatible port is exported
 * as `useSqliteAuthState2` (this function). Both names are available: the bare one from the package root resolves to
 * Anya's original, and this alias gives code ported from elaina-baileys its own name.
 */
export const useSqliteAuthState = useSqliteAuthState2
