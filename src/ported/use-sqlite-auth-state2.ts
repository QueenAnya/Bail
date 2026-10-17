/**
 * SQLite auth-state adapter ported from @rexxhayanasi/elaina-baileys' Utils/use-sqlite-auth-state.js
 * (MIT; upstream attribution is preserved in the repository's LICENSE and NOTICE.md).
 * Kept as `useSqliteAuthState2` so Anya's existing `useSqliteAuthState` API remains unchanged.
 *
 * Uses the same `creds` and `signal_keys` schema as the Elaina implementation. When an existing
 * database handle is supplied, its lifecycle remains owned by the caller; a handle created from
 * `dbPath` is owned and closed by this adapter.
 */
import type BetterSqlite3 from 'better-sqlite3'
import { proto } from '../../WAProto/index.js'
import type { AuthenticationState, SignalDataTypeMap } from '../Types/index'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'

export type SqliteAuthState2Options =
	| {
			/** Path to a SQLite database file (created when it does not exist). */
			dbPath: string
			database?: undefined
	  }
	| {
			dbPath?: undefined
			/** Existing better-sqlite3 Database instance. This adapter will not close it. */
			database: BetterSqlite3.Database
	  }

export type SqliteAuthState2Result = {
	state: AuthenticationState
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
		throw Object.assign(
			new Error(
				'`better-sqlite3` is required for `useSqliteAuthState2`. Install it with: `npm install better-sqlite3`.'
			),
			{ cause }
		)
	}
}

/**
 * Create an Elaina-compatible SQLite auth state. Enables WAL mode and exposes `clearAuth()` and `close()`.
 * The existing `useSqliteAuthState` implementation is intentionally not modified.
 */
export async function useSqliteAuthState2(opts: SqliteAuthState2Options): Promise<SqliteAuthState2Result> {
	let db: BetterSqlite3.Database
	let ownsDatabase = false

	if (opts.database) {
		db = opts.database
	} else {
		const Database = await loadBetterSqlite3()
		db = new Database(opts.dbPath)
		ownsDatabase = true
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

		const loadCreds = () => {
			const row = stmts.credsSelect.get(CREDS_ROW_KEY) as { value: string } | undefined
			return row ? (JSON.parse(row.value, BufferJSON.reviver) as AuthenticationState['creds']) : initAuthCreds()
		}

		const persistCreds = (creds: AuthenticationState['creds']) => {
			stmts.credsUpsert.run(CREDS_ROW_KEY, JSON.stringify(creds, BufferJSON.replacer))
		}

		const creds = loadCreds()
		const writeTransaction = db.transaction((data: Parameters<AuthenticationState['keys']['set']>[0]) => {
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

		return {
			state: {
				creds,
				keys: {
					get: async <T extends keyof SignalDataTypeMap>(type: T, ids: string[]) => {
						const data: { [id: string]: SignalDataTypeMap[T] } = {}
						for (const id of ids) {
							const row = stmts.keySelect.get(type, id) as { value: string } | undefined
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
						writeTransaction(data)
					}
				}
			},
			saveCreds: async () => {
				persistCreds(creds)
			},
			clearAuth: async () => {
				const clearTransaction = db.transaction(() => {
					stmts.clearKeys.run()
					stmts.clearCreds.run()
				})
				clearTransaction()
			},
			close: async () => {
				if (ownsDatabase && db.open) db.close()
			}
		}
	} catch (error) {
		if (ownsDatabase && db.open) db.close()
		throw error
	}
}
