/**
 * Single-file auth state for Baileys.
 *
 * @deprecated Use `useMultiFileAuthState` instead.
 * Stores the full authentication state in a single JSON file.
 * DO NOT USE IN PRODUCTION — provided for backwards compatibility only.
 */

import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, ILogger, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'

// Legacy key map — only here for backwards compatibility
const KEY_MAP: { [k: string]: string } = {
	'pre-key': 'preKeys',
	session: 'sessions',
	'sender-key': 'senderKeys',
	'app-state-sync-key': 'appStateSyncKeys',
	'app-state-sync-version': 'appStateVersions',
	'sender-key-memory': 'senderKeyMemory'
}

interface SingleFileAuthState {
	state: AuthenticationState
	saveState: () => void
}

/**
 * @deprecated Use `useMultiFileAuthState` instead.
 * Stores the full authentication state in a single JSON file.
 *
 * @example
 * const { state, saveState } = useSingleFileAuthState('./auth.json')
 * const sock = makeWASocket({ auth: state })
 * sock.ev.on('creds.update', saveState)
 */
export const useSingleFileAuthState = (filename: string, logger?: ILogger): SingleFileAuthState => {
	// Lazy-require fs so that environments without fs (e.g., browser bundles) don't crash at import
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { readFileSync, writeFileSync, existsSync } = require('fs') as typeof import('fs')

	let creds: AuthenticationCreds
	let keys: Record<string, Record<string, unknown>> = {}

	const saveState = (): void => {
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
				get: (type: keyof SignalDataTypeMap, ids: string[]) => {
					const keyName = KEY_MAP[type as string]
					return ids.reduce((dict: Record<string, unknown>, id) => {
						let value = keys[keyName]?.[id]
						if (value) {
							if (type === 'app-state-sync-key') {
								value = proto.Message.AppStateSyncKeyData.fromObject(value as object)
							}
							dict[id] = value
						}
						return dict
					}, {}) as unknown as { [id: string]: SignalDataTypeMap[typeof type] }
				},
				set: (data: { [category: string]: { [id: string]: unknown } | null }) => {
					for (const _key in data) {
						const keyName = KEY_MAP[_key]
						keys[keyName] = keys[keyName] || {}
						Object.assign(keys[keyName], data[_key])
					}
					saveState()
				}
			}
		},
		saveState
	}
}
