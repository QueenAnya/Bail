/**
 * SQLiteStore.ts
 * Generic key-value store backed by better-sqlite3.
 * Used for msgRetryCounterCache and SessionManager to reduce RAM footprint.
 *
 * Fixes applied vs PR #2710:
 *  - P2: Always JSON.stringify on set (including strings) so get<string>
 *    round-trips correctly — raw string storage causes type corruption on retrieve.
 *  - P2: set(key, undefined) → delegates to del(key) instead of crashing.
 *
 * Source: WhiskeySockets/Baileys PR #2710 (LuferOS) — enterprise bot framework
 */

import Database from 'better-sqlite3'

export class SQLiteStore {
	private db: Database.Database
	private getStmt: Database.Statement
	private setStmt: Database.Statement
	private delStmt: Database.Statement

	constructor(dbPath: string) {
		this.db = new Database(dbPath)
		this.db.exec(`
			CREATE TABLE IF NOT EXISTS kv_store (
				key   TEXT PRIMARY KEY,
				value TEXT NOT NULL
			)
		`)
		this.getStmt = this.db.prepare('SELECT value FROM kv_store WHERE key = ?')
		this.setStmt = this.db.prepare(
			'INSERT INTO kv_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
		)
		this.delStmt = this.db.prepare('DELETE FROM kv_store WHERE key = ?')
	}

	get<T = unknown>(key: string): T | undefined {
		const row = this.getStmt.get(key) as { value: string } | undefined
		if (!row) return undefined
		try {
			return JSON.parse(row.value) as T
		} catch {
			// Fallback for legacy non-JSON rows (migration safety)
			return row.value as unknown as T
		}
	}

	set<T>(key: string, value: T): void {
		// P2 FIX: guard undefined — delegate to del so callers don't need to check
		if (value === undefined || value === null) {
			this.del(key)
			return
		}
		// P2 FIX: always JSON.stringify — raw string storage breaks round-trip for
		// values that are valid JSON (numbers, booleans, JSON objects serialized as strings)
		this.setStmt.run(key, JSON.stringify(value))
	}

	del(key: string): void {
		this.delStmt.run(key)
	}

	close(): void {
		this.db.close()
	}
}
