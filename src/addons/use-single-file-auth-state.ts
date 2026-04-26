/**
 * use-single-file-auth-state.ts
 * Ported from @innovatorssoft/baileys
 *
 * @deprecated Use useMultiFileAuthState instead.
 * Stores the full authentication state in a single JSON file.
 * DO NOT USE IN PRODUCTION — only for quick testing.
 */

import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils.js'
import { BufferJSON } from '../Utils/generics.js'
import type { AuthenticationState } from '../Types/Auth.js'
import type { ILogger } from '../Utils/logger.js'

const KEY_MAP: Record<string, string> = {
	'pre-key': 'preKeys',
	session: 'sessions',
	'sender-key': 'senderKeys',
	'app-state-sync-key': 'appStateSyncKeys',
	'app-state-sync-version': 'appStateVersions',
	'sender-key-memory': 'senderKeyMemory'
}

export type SingleFileAuthStateResult = {
	state: AuthenticationState
	saveState: () => void
}

/**
 * @deprecated Use useMultiFileAuthState instead.
 */
export const useSingleFileAuthState = (filename: string, logger?: ILogger): SingleFileAuthStateResult => {
	const { readFileSync, writeFileSync, existsSync } = require('fs')

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
				get: (type: string, ids: string[]) => {
					const key = KEY_MAP[type]
					return ids.reduce((dict: Record<string, unknown>, id: string) => {
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
				set: (data: Record<string, Record<string, unknown>>) => {
					for (const _key in data) {
						const key = KEY_MAP[_key]
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
