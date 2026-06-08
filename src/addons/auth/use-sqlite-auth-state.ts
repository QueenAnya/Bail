/**
 * SQLite-backed Authentication State
 *
 * Source: @itsliaaa/baileys (use-sqlite-auth-state.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Uses `better-sqlite3` for synchronous, transactional key storage.
 * Requires: `npm install better-sqlite3` (+ `@types/better-sqlite3` for TS)
 *
 * Two tables:
 *   - `creds`        — stores the authentication credentials (single row `__creds__`)
 *   - `signal_keys`  — stores Signal Protocol session/pre-keys (type + id composite PK)
 *
 * @example
 * import { useSqliteAuthState } from './addons/auth/use-sqlite-auth-state.js'
 *
 * const { state, saveCreds } = await useSqliteAuthState({ dbPath: './auth.db' })
 * const sock = makeWASocket({ auth: state })
 * sock.ev.on('creds.update', saveCreds)
 */

import { proto } from '../../../WAProto/index.js'
import { initAuthCreds } from '../../Utils/auth-utils.js'
import { BufferJSON } from '../../Utils/generics.js'
import type { AuthenticationState } from '../../Types/index.js'

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
			database: import('better-sqlite3').Database
	  }

export type SqliteAuthStateResult = {
	state: AuthenticationState
	saveCreds: () => void
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

async function loadBetterSqlite3(): Promise<(typeof import('better-sqlite3'))['default']> {
	try {
		const mod = (await import('better-sqlite3')) as Record<string, unknown>
		return (mod.default ?? mod) as (typeof import('better-sqlite3'))['default']
	} catch (cause) {
		throw Object.assign(
			new Error(
				'`better-sqlite3` is required for `useSqliteAuthState`. ' +
					'Install it as a peer dependency: npm install better-sqlite3'
			),
			{ cause }
		)
	}
}

// ─── useSqliteAuthState ────────────────────────────────────────────────────────

/**
 * Create a SQLite-backed auth state.
 * WAL journal mode is enabled for reliable concurrent-read performance.
 */
export async function useSqliteAuthState(opts: SqliteAuthStateOptions): Promise<SqliteAuthStateResult> {
	let db: import('better-sqlite3').Database

	if (opts.database) {
		db = opts.database
	} else {
		const Database = await loadBetterSqlite3()
		db = new Database(opts.dbPath!)
	}

	// WAL mode — concurrent reads with sporadic writes (recommended by SQLite docs)
	db.pragma('journal_mode = WAL')
	db.pragma('synchronous  = NORMAL')
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
		keyListIds: db.prepare<[string]>('SELECT id FROM signal_keys WHERE type = ?'),
		keyList: db.prepare<[string]>('SELECT id, value FROM signal_keys WHERE type = ?'),
		clearKeys: db.prepare('DELETE FROM signal_keys')
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
				}
			}
		},

		saveCreds: () => persistCreds(creds)
	}
}
