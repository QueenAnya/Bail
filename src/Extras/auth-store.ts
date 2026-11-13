/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT, Copyright (c) 2025 Rajeh Taher/WhiskeySockets,
 * (c) 2026 rexxhayanasi) - Utils/auth-store.js, rewritten in TypeScript.
 *
 * Shared helper for the database auth states (PostgreSQL, MySQL, Redis): a tiny key/value `AuthStore`
 * interface plus `makeAuthStateFromStore`, which turns any such store into a Baileys `AuthenticationState`.
 */
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationStateWithListing, SignalDataSet, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'

export const CREDS_KEY = 'creds'

export interface AuthStoreEntry {
	type: string
	id: string
	value: string
}

export interface AuthStore {
	/** returns the stored JSON string, or null */
	read: (type: string, id: string) => Promise<string | null | undefined>
	readMany: (type: string, ids: string[]) => Promise<Record<string, string>>
	write: (type: string, id: string, value: string) => Promise<void>
	/** applies all writes and removals (transactionally where the backend supports it) */
	apply: (writes: AuthStoreEntry[], removals: Omit<AuthStoreEntry, 'value'>[]) => Promise<void>
	/**
	 * Enumerate every `(id, value)` pair for a type.
	 *
	 * Required: every backend behind this helper (SQL, Redis, Mongo, NekoDB) can enumerate its rows, and
	 * `migrateAuthState` needs it. Requiring it here is what lets these adapters return a provably migratable state.
	 */
	list: (type: string) => AsyncIterable<readonly [string, string]>
	/** ids-only fast path, for adapters that can answer without reading the values */
	listIds?: (type: string) => AsyncIterable<string>
	/** removes every row of this session */
	clear: () => Promise<void>
	close?: () => Promise<void>
}

export interface DatabaseAuthState {
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
	/** deletes the whole session from the backend */
	clearAuth: () => Promise<void>
	/** closes the connection / pool when this auth state created it */
	close: () => Promise<void>
}

export const encodeAuthValue = (value: unknown): string => JSON.stringify(value, BufferJSON.replacer)

export const decodeAuthValue = (type: string, raw: unknown): any => {
	if (raw === null || raw === undefined) {
		return null
	}

	const value = typeof raw === 'string' ? JSON.parse(raw, BufferJSON.reviver) : raw
	if (type === 'app-state-sync-key' && value) {
		return proto.Message.AppStateSyncKeyData.fromObject(value)
	}

	return value
}

/** Loads a ported auth adapter's runtime database driver with a helpful error if installation is incomplete. */
export const loadOptionalModule = async (name: string, usedBy: string): Promise<any> => {
	try {
		const mod = await import(name)
		return mod.default ?? mod
	} catch (err) {
		const helpful = new Error(
			`\`${name}\` is required for \`${usedBy}\`. Install it as a peer dependency: \`npm install ${name}\`.`
		)
		;(helpful as Error & { cause?: unknown }).cause = err
		throw helpful
	}
}

/**
 * Reset a creds object in place. `clearAuth()` empties the store, but the creds object is handed to the socket by
 * reference — if it is not reset too, the next `saveCreds()` writes the old credentials straight back into the store
 * that was just emptied, and the account silently comes back. Mutating in place keeps the identity the socket holds.
 */
export const resetCredsInPlace = (creds: AuthenticationCreds): void => {
	const fresh = initAuthCreds()
	for (const key of Object.keys(creds)) {
		delete (creds as Record<string, unknown>)[key]
	}

	Object.assign(creds, fresh)
}

export const makeAuthStateFromStore = async (store: AuthStore): Promise<DatabaseAuthState> => {
	const stored = await store.read(CREDS_KEY, CREDS_KEY)
	const creds: AuthenticationCreds = decodeAuthValue(CREDS_KEY, stored) ?? initAuthCreds()

	const state: AuthenticationStateWithListing = {
		creds,
		keys: {
			get: async (type, ids) => {
				const data: { [id: string]: SignalDataTypeMap[typeof type] } = {}
				const rows = await store.readMany(type, ids)
				for (const id of ids) {
					const value = decodeAuthValue(type, rows[id])
					if (value) {
						data[id] = value
					}
				}

				return data
			},
			set: async (data: SignalDataSet) => {
				const writes: AuthStoreEntry[] = []
				const removals: Omit<AuthStoreEntry, 'value'>[] = []
				for (const type in data) {
					for (const id in data[type as keyof SignalDataTypeMap]) {
						const value = data[type as keyof SignalDataTypeMap]![id]
						if (value) {
							writes.push({ type, id, value: encodeAuthValue(value) })
						} else {
							removals.push({ type, id })
						}
					}
				}

				if (writes.length || removals.length) {
					await store.apply(writes, removals)
				}
			},
			list: async function* (type) {
				for await (const [id, raw] of store.list(type)) {
					const value = decodeAuthValue(type, raw)
					if (value !== null && value !== undefined) {
						yield [id, value] as const
					}
				}
			}
		}
	}

	// `listIds` stays optional: it is only the fast path `skipExisting` uses.
	if (store.listIds) {
		const listIds = store.listIds
		state.keys.listIds = async function* (type) {
			yield* listIds(type)
		}
	}

	return {
		state,
		saveCreds: async () => {
			await store.write(CREDS_KEY, CREDS_KEY, encodeAuthValue(creds))
		},
		clearAuth: async () => {
			await store.clear()
			resetCredsInPlace(creds)
		},
		close: async () => {
			await store.close?.()
		}
	}
}
