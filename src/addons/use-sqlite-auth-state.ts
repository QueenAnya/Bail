/**
 * SQLite-backed Auth State
 * Source: itsliaaa/baileys (ported from compiled JS to TypeScript)
 *
 * Requires the `better-sqlite3` package as a peer dependency:
 *   npm install better-sqlite3
 *
 * WAL mode is used so reads can happen concurrently alongside the
 * occasional write, which matches SQLite's own guidance for
 * read-heavy / sporadic-write workloads like an auth-state store.
 */

import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import type { AuthenticationCreds, SignalDataTypeMap } from '../Types'

interface SqliteStatement<TRow = any> {
	get: (...params: any[]) => TRow | undefined
	run: (...params: any[]) => unknown
}

interface SqliteDatabase {
	pragma: (sql: string) => unknown
	exec: (sql: string) => unknown
	prepare: <TRow = any>(sql: string) => SqliteStatement<TRow>
	transaction: (fn: () => void) => () => void
}

export interface SqliteAuthStateOptions {
	dbPath?: string
	database?: SqliteDatabase
}

async function loadBetterSqlite3(): Promise<new (path: string) => SqliteDatabase> {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mod: any = await import('better-sqlite3')
		return mod.default ?? mod
	} catch (err) {
		const helpful: Error & { cause?: unknown } = new Error(
			'`better-sqlite3` is required for `useSqliteAuthState`. Install it as a peer dependency: `npm install better-sqlite3` (or `yarn add better-sqlite3`).'
		)
		helpful.cause = err
		throw helpful
	}
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

export async function useSqliteAuthState(opts: SqliteAuthStateOptions): Promise<{
	state: {
		creds: AuthenticationCreds
		keys: {
			get: <T extends keyof SignalDataTypeMap>(
				type: T,
				ids: string[]
			) => Promise<{ [id: string]: SignalDataTypeMap[T] }>
			set: (data: { [category: string]: { [id: string]: unknown } }) => Promise<void>
		}
	}
	saveCreds: () => Promise<void>
}> {
	let db: SqliteDatabase

	if (opts.database) {
		db = opts.database
	} else {
		const Database = await loadBetterSqlite3()
		db = new Database(opts.dbPath as string)
	}

	db.pragma('journal_mode = WAL')
	db.pragma('synchronous = NORMAL')
	db.exec(CREATE_SCHEMA_SQL)

	const stmts = {
		credsSelect: db.prepare<{ value: string }>('SELECT value FROM creds WHERE key = ?'),
		credsUpsert: db.prepare(
			'INSERT INTO creds (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
		),
		keySelect: db.prepare<{ value: string }>('SELECT value FROM signal_keys WHERE type = ? AND id = ?'),
		keyUpsert: db.prepare(
			'INSERT INTO signal_keys (type, id, value) VALUES (?, ?, ?) ON CONFLICT(type, id) DO UPDATE SET value = excluded.value'
		),
		keyDelete: db.prepare('DELETE FROM signal_keys WHERE type = ? AND id = ?'),
		keyListIds: db.prepare('SELECT id FROM signal_keys WHERE type = ?'),
		keyList: db.prepare('SELECT id, value FROM signal_keys WHERE type = ?'),
		clearKeys: db.prepare('DELETE FROM signal_keys')
	}

	const loadCreds = (): AuthenticationCreds => {
		const row = stmts.credsSelect.get(CREDS_ROW_KEY)
		if (!row) return initAuthCreds()
		return JSON.parse(row.value, BufferJSON.reviver)
	}

	const persistCreds = (creds: AuthenticationCreds): void => {
		stmts.credsUpsert.run(CREDS_ROW_KEY, JSON.stringify(creds, BufferJSON.replacer))
	}

	const creds = loadCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data: { [id: string]: any } = {}
					for (const id of ids) {
						const row = stmts.keySelect.get(type as string, id)
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
							for (const id in data[category]) {
								const value = data[category]![id]
								if (value) {
									const stringified = JSON.stringify(value, BufferJSON.replacer)
									stmts.keyUpsert.run(category, id, stringified)
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
			persistCreds(creds)
		}
	}
}
