/**
 * SQLite-backed Authentication State
 *
 * Clean TypeScript with full types and JSDoc.
 *
 * Uses `better-sqlite3` for synchronous, transactional key storage.
 * `better-sqlite3` is a hard dependency of this package (pulled in for the
 * Framework's SQLiteStore/StatsManager) — no separate install needed.
 *
 * Two tables:
 *   - `creds`        — stores the authentication credentials (single row `__creds__`)
 *   - `signal_keys`  — stores Signal Protocol session/pre-keys (type + id composite PK)
 *
 * @example
 * import { makeWASocket, useSqliteAuthState } from '@teamolduser/baileys'
 *
 * const { state, saveCreds } = await useSqliteAuthState({ dbPath: './auth.db' })
 * const sock = makeWASocket({ auth: state })
 * sock.ev.on('creds.update', saveCreds)
 */

import type BetterSqlite3 from 'better-sqlite3'
import { proto } from '../../WAProto/index.js'
import type { AuthenticationState, AuthenticationStateWithListing } from '../Types/index'
import { normalizeAuthArgs, promoteHandle } from '../Utils/auth-args'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'

// ─── Types ─────────────────────────────────────────────────────────────────────

export type SqliteAuthStateOptions =
	| {
			/** Path to the SQLite database file (will be created if it does not exist). */
			dbPath: string
			database?: undefined
	  }
	| {
			dbPath?: undefined
			/** Pass an existing better-sqlite3 Database instance. */
			database: BetterSqlite3.Database
	  }

export type SqliteAuthStateResult = {
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
}

// ─── Schema ────────────────────────────────────────────────────────────────────

const CREDS_ROW_KEY = '__creds__'

const CREATE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS creds (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS signal_keys (
  type  TEXT NOT NULL,
  id    TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (type, id)
);
CREATE INDEX IF NOT EXISTS signal_keys_type_idx ON signal_keys(type);
`

// ─── Lazy loader ───────────────────────────────────────────────────────────────

/** Loads `better-sqlite3` on first use (so importing this module never pulls the native addon in). */
async function loadBetterSqlite3(): Promise<typeof BetterSqlite3> {
	try {
		// ESM/CJS interop: the constructor is either `mod.default` or the module itself
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mod = (await import('better-sqlite3')) as any
		return (mod.default ?? mod) as typeof BetterSqlite3
	} catch (cause) {
		throw Object.assign(
			new Error('`better-sqlite3` is required for `useSqliteAuthState`. ' + 'Install it with: yarn add better-sqlite3'),
			{ cause }
		)
	}
}

// ─── useSqliteAuthState ────────────────────────────────────────────────────────

/**
 * Create a SQLite-backed auth state.
 * WAL journal mode is enabled for reliable concurrent-read performance.
 */
export async function useSqliteAuthState(
	/**
	 * Options object, or positional arguments. Accepted shapes:
	 * `(dbPath)`, `(dbPath, session)`, `({ dbPath })`, `({ database })`.
	 */
	a: string | SqliteAuthStateOptions,
	b?: string | SqliteAuthStateOptions,
	c?: string
): Promise<SqliteAuthStateResult> {
	const opts = promoteHandle(
		normalizeAuthArgs<SqliteAuthStateOptions & { session?: string }>(
			[a, b, c],
			['dbPath', 'session'],
			['dbPath', 'database', 'session']
		),
		['dbPath'],
		'database',
		(v: any) => typeof v?.pragma === 'function' || typeof v?.prepare === 'function'
	)

	let db: BetterSqlite3.Database

	if (opts.database) {
		db = opts.database
	} else {
		const target = typeof opts.dbPath === 'string' ? opts.dbPath : undefined
		if (!target) {
			throw new Error('useSqliteAuthState needs a `dbPath` string (or an existing `database`)')
		}

		const Database = await loadBetterSqlite3()
		db = new Database(target)
	}

	// WAL mode — concurrent reads with sporadic writes (recommended by SQLite docs)
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
		keyList: db.prepare<[string]>('SELECT id, value FROM signal_keys WHERE type = ? ORDER BY id')
	} as const

	const loadCreds = () => {
		const row = stmts.credsSelect.get(CREDS_ROW_KEY) as { value: string } | undefined
		if (!row) return initAuthCreds()
		return JSON.parse(row.value, BufferJSON.reviver) as AuthenticationState['creds']
	}

	const persistCreds = (creds: AuthenticationState['creds']) => {
		stmts.credsUpsert.run(CREDS_ROW_KEY, JSON.stringify(creds, BufferJSON.replacer))
	}

	const creds = loadCreds()

	return {
		state: {
			creds,
			keys: {
				// @ts-ignore
				get: async (type, ids) => {
					const data: Record<string, unknown> = {}
					for (const id of ids) {
						const row = stmts.keySelect.get(type, id) as { value: string } | undefined
						if (row) {
							let value = JSON.parse(row.value, BufferJSON.reviver)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}

							data[id] = value
						}
					}

					return data
				},

				set: async data => {
					const writeTx = db.transaction(() => {
						for (const category in data) {
							const categoryData = data[category as keyof typeof data] as Record<string, unknown>
							for (const id in categoryData) {
								const value = categoryData[id]
								if (value) {
									stmts.keyUpsert.run(category, id, JSON.stringify(value, BufferJSON.replacer))
								} else {
									stmts.keyDelete.run(category, id)
								}
							}
						}
					})
					writeTx()
				},
				list: async function* (type) {
					for (const row of stmts.keyList.all(type) as { id: string; value: string }[]) {
						yield [row.id, JSON.parse(row.value, BufferJSON.reviver)] as const
					}
				},
				listIds: async function* (type) {
					for (const row of stmts.keyList.all(type) as { id: string }[]) {
						yield row.id
					}
				}
			}
		},

		// async — same signature as itsliaaa/baileys (`saveCreds: () => Promise<void>`)
		saveCreds: async () => {
			persistCreds(creds)
		}
	}
}
