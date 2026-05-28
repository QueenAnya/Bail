/**
 * SQLite Auth State
 * Source: @itsliaaa/baileys v0.3.12 — Utils/use-sqlite-auth-state.js
 * Requires: npm install better-sqlite3
 */
import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils.js'
import { BufferJSON } from '../Utils/generics.js'
import type { AuthenticationState } from '../Types/index.js'

export type SqliteAuthStateOptions = {
	/** Path to the SQLite database file */
	dbPath?: string
	/** Or pass an existing better-sqlite3 Database instance */
	database?: any
}

const CREDS_ROW_KEY = '__creds__'
const SCHEMA = `
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

async function loadBetterSqlite3() {
	try {
		const mod = (await import('better-sqlite3' as string)) as any
		return mod.default ?? mod
	} catch {
		throw new Error('`better-sqlite3` is required. Install it: npm install better-sqlite3')
	}
}

export const useSqliteAuthState = async (
	opts: SqliteAuthStateOptions
): Promise<{
	state: AuthenticationState
	saveCreds: () => Promise<void>
}> => {
	let db: any
	if (opts.database) {
		db = opts.database
	} else {
		const Database = await loadBetterSqlite3()
		db = new Database(opts.dbPath!)
	}
	db.pragma('journal_mode = WAL')
	db.pragma('synchronous = NORMAL')
	db.exec(SCHEMA)

	const stmts = {
		credsSelect: db.prepare('SELECT value FROM creds WHERE key = ?'),
		credsUpsert: db.prepare(
			'INSERT INTO creds (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
		),
		keySelect: db.prepare('SELECT value FROM signal_keys WHERE type = ? AND id = ?'),
		keyUpsert: db.prepare(
			'INSERT INTO signal_keys (type, id, value) VALUES (?, ?, ?) ON CONFLICT(type, id) DO UPDATE SET value = excluded.value'
		),
		keyDelete: db.prepare('DELETE FROM signal_keys WHERE type = ? AND id = ?')
	}

	const loadCreds = () => {
		const row = stmts.credsSelect.get(CREDS_ROW_KEY) as any
		if (!row) return initAuthCreds()
		return JSON.parse(row.value, BufferJSON.reviver)
	}

	const creds = loadCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type: string, ids: string[]) => {
					const data: Record<string, any> = {}
					for (const id of ids) {
						const row = stmts.keySelect.get(type, id) as any
						if (row) {
							let value = JSON.parse(row.value, BufferJSON.reviver)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}
							data[id] = value
						}
					}
					return data as any
				},
				set: async (data: Record<string, Record<string, any>>) => {
					const writeTx = db.transaction(() => {
						for (const category in data) {
							for (const id in data[category]) {
								const value = data[category][id]
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
		saveCreds: async () => {
			stmts.credsUpsert.run(CREDS_ROW_KEY, JSON.stringify(creds, BufferJSON.replacer))
		}
	}
}
