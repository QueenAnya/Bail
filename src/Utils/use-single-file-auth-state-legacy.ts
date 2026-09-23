/**
 * use-single-file-auth-state-legacy.ts
 *
 * This is the original upstream reference
 * implementation — kept here as a SEPARATE file rather than overwriting
 * `use-single-file-auth-state.ts` because the two differ fundamentally:
 *
 *   | | This file (legacy) | use-single-file-auth-state.ts (default) |
 *   |---|---|---|
 *   | Style | synchronous | async |
 *   | Caching | none | LRUCache (max 20,000) |
 *   | Write safety | direct `writeFileSync` on every `set()` | debounced (3s) atomic write (temp → rename) |
 *   | Concurrency | none | `async-mutex` |
 *   | Key storage | `KEY_MAP`-translated nested object | flat `type+id` keys |
 *
 * @deprecated Use `useMultiFileAuthState` (or the default
 * `useSingleFileAuthState` in `use-single-file-auth-state.ts`, which fixes
 * all the caveats below) instead. This is kept only for parity with
 * upstream for anyone specifically relying on its exact
 * behavior. Per the original upstream comment: **DO NOT USE IN A PRODUCTION
 * ENVIRONMENT** — every `set()` call synchronously rewrites the entire file
 * with no debouncing, no atomic temp-file swap, and no concurrency guard,
 * so it is both slow and crash-unsafe under real traffic.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs'
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'
import type { ILogger } from './logger'

// useless key map only there to maintain backwards compatibility
// do not use in your own systems please
// NOTE: only covers the original 6 signal-data types this file shipped with
// upstream — newer types (lid-mapping, device-list, tctoken, identity-key)
// are intentionally NOT mapped here, matching the original source exactly.
const KEY_MAP: Partial<Record<keyof SignalDataTypeMap, string>> = {
	'pre-key': 'preKeys',
	session: 'sessions',
	'sender-key': 'senderKeys',
	'app-state-sync-key': 'appStateSyncKeys',
	'app-state-sync-version': 'appStateVersions',
	'sender-key-memory': 'senderKeyMemory'
}

/**
 * @deprecated use multi file auth state instead please
 * stores the full authentication state in a single JSON file
 *
 * DO NOT USE IN A PROD ENVIRONMENT, only meant to serve as an example
 * */
export const useSingleFileAuthStateLegacy = (
	filename: string,
	logger?: ILogger
): { state: AuthenticationState; saveState: () => void } => {
	let creds: AuthenticationCreds
	let keys: { [_: string]: any } = {}

	// save the authentication state to a file
	const saveState = () => {
		logger?.trace('saving auth state')
		writeFileSync(
			filename,
			// BufferJSON replacer utility saves buffers nicely
			JSON.stringify({ creds, keys }, BufferJSON.replacer, 2)
		)
	}

	if (existsSync(filename)) {
		const result = JSON.parse(readFileSync(filename, { encoding: 'utf-8' }), BufferJSON.reviver)
		creds = result.creds
		keys = result.keys
	} else {
		creds = initAuthCreds()
		keys = {}
	}

	return {
		state: {
			creds,
			keys: {
				get: (type: keyof SignalDataTypeMap, ids: string[]) => {
					const key = KEY_MAP[type] ?? type
					return ids.reduce((dict: { [id: string]: any }, id) => {
						let value = keys[key]?.[id]
						if (value) {
							if (type === 'app-state-sync-key') {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}

							dict[id] = value
						}

						return dict
					}, {})
				},
				set: (data: any) => {
					for (const _key in data) {
						const key = KEY_MAP[_key as keyof SignalDataTypeMap] ?? _key
						keys[key] = keys[key] || {}
						Object.assign(keys[key], data[_key])
					}

					saveState()
				}
			}
		},
		saveState
	}
}
