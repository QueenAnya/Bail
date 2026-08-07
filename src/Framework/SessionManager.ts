/**
 * SessionManager.ts
 * Per-JID session CRUD backed by SQLiteStore.
 *
 * Fixes applied vs PR #2710:
 *  - P2: Generic defaults changed from `any` to `unknown` for type safety.
 *
 * Source: WhiskeySockets/Baileys PR #2710 (LuferOS) — enterprise bot framework
 */

import type { SQLiteStore } from './Store/SQLiteStore'

export class SessionManager {
	private store: SQLiteStore

	constructor(store: SQLiteStore) {
		this.store = store
	}

	private key(jid: string): string {
		return `session_${jid}`
	}

	// P2 FIX: default generic to unknown instead of any
	get<T = unknown>(jid: string): T | undefined {
		return this.store.get<T>(this.key(jid))
	}

	set<T = unknown>(jid: string, data: T): void {
		this.store.set<T>(this.key(jid), data)
	}

	update<T = unknown>(jid: string, updater: (prev: T | undefined) => T): void {
		const prev = this.get<T>(jid)
		this.set<T>(jid, updater(prev))
	}

	delete(jid: string): void {
		this.store.del(this.key(jid))
	}

	has(jid: string): boolean {
		return this.get(jid) !== undefined
	}
}
