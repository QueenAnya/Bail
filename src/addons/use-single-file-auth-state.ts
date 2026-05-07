/**
 * Single-File Auth State (deprecated, for backwards compatibility)
 * Ported from innovatorssoft/Baileys
 *
 * @deprecated Use useMultiFileAuthState instead
 */

import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import type { AuthenticationState } from '../Types'

const KEY_MAP: Record<string, string> = {
	'pre-key': 'preKeys',
	session: 'sessions',
	'sender-key': 'senderKeys',
	'app-state-sync-key': 'appStateSyncKeys',
	'app-state-sync-version': 'appStateVersions',
	'sender-key-memory': 'senderKeyMemory'
}

/**
 * @deprecated Do NOT use in production. Stores entire auth state in one JSON file.
 * Provided only for migration / compatibility purposes.
 */
export const useSingleFileAuthState = (
	filename: string,
	logger?: { trace: (...args: unknown[]) => void }
): { state: AuthenticationState; saveState: () => void } => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { readFileSync, writeFileSync, existsSync } = require('fs') as typeof import('fs')

	let creds: AuthenticationState['creds']
	let keys: Record<string, Record<string, unknown>> = {}

	const saveState = () => {
		logger?.trace('saving auth state')
		writeFileSync(filename, JSON.stringify({ creds, keys }, BufferJSON.replacer, 2))
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
				get(type, ids) {
					const key = KEY_MAP[type]!
					return ids.reduce<Record<string, unknown>>((dict, id) => {
						let value = keys[key]?.[id]
						if (value) {
							if (type === 'app-state-sync-key') {
								value = proto.Message.AppStateSyncKeyData.fromObject(value as object)
							}
							dict[id] = value
						}
						return dict
					}, {})
				},
				set(data) {
					for (const _key in data) {
						const key = KEY_MAP[_key]!
						keys[key] = keys[key] || {}
						Object.assign(keys[key], (data as Record<string, unknown>)[_key])
					}
					saveState()
				}
			}
		},
		saveState
	}
}
