/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT, Copyright (c) 2025 Rajeh Taher/WhiskeySockets,
 * (c) 2026 rexxhayanasi) - Utils/auth-store.js, rewritten in TypeScript.
 *
 * Shared helper for the database auth states (PostgreSQL, MySQL, Redis): a tiny key/value `AuthStore`
 * interface plus `makeAuthStateFromStore`, which turns any such store into a Baileys `AuthenticationState`.
 */
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataSet, SignalDataTypeMap } from '../Types'
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
	/** removes every row of this session */
	clear: () => Promise<void>
	close?: () => Promise<void>
}

export interface DatabaseAuthState {
	state: AuthenticationState
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

export const makeAuthStateFromStore = async (store: AuthStore): Promise<DatabaseAuthState> => {
	const stored = await store.read(CREDS_KEY, CREDS_KEY)
	const creds: AuthenticationCreds = decodeAuthValue(CREDS_KEY, stored) ?? initAuthCreds()

	const state: AuthenticationState = {
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
					const entries = data[type as keyof SignalDataTypeMap]!
					for (const id in entries) {
						const value = entries[id]
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
			}
		}
	}

	return {
		state,
		saveCreds: async () => {
			await store.write(CREDS_KEY, CREDS_KEY, encodeAuthValue(creds))
		},
		clearAuth: async () => {
			await store.clear()
		},
		close: async () => {
			await store.close?.()
		}
	}
}
