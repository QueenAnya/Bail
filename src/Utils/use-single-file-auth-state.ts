import { readFileSync, writeFileSync, existsSync } from 'fs'
import type { AuthenticationState } from '../Types'
import { BufferJSON } from './generics'
import { initAuthCreds } from './auth-utils'

const KEY_MAP: { [key: string]: string } = {
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
 */
export const useSingleFileAuthState = (
	filename: string,
	logger?: any
): {
	state: AuthenticationState
	saveState: () => void
} => {
	let creds: any
	let keys: any = {}

	const saveState = () => {
		logger && logger.trace('saving auth state')
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
					return ids.reduce((dict: any, id) => {
						let value = keys[key]?.[id]
						if (value) {
							if (type === 'app-state-sync-key') {
								const { proto } = require('../../WAProto/index.js')
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}
							dict[id] = value
						}
						return dict
					}, {})
				},
				set: (data: any) => {
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
