/**
 * Single-file JSON Auth State
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * @deprecated Use multi-file auth state (or the SQLite auth state addon)
 * instead. This is kept only for parity with the source fork's docs —
 * the upstream Baileys maintainers explicitly warn against using a single
 * JSON file for auth state in production, since every credential/key
 * update rewrites the entire file to disk.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { proto } from '../../WAProto/index.js'
import { initAuthCreds } from '../Utils/auth-utils'
import { BufferJSON } from '../Utils/generics'
import type { AuthenticationState, SignalDataTypeMap } from '../Types'
import type { ILogger } from '../Utils/logger'

// Historical key-name mapping, kept only for backwards compatibility with
// files written by older versions of this addon — do not rely on this
// mapping in new code.
const KEY_MAP: { [T in keyof SignalDataTypeMap]: string } = {
	'pre-key': 'preKeys',
	session: 'sessions',
	'sender-key': 'senderKeys',
	'app-state-sync-key': 'appStateSyncKeys',
	'app-state-sync-version': 'appStateVersions',
	'sender-key-memory': 'senderKeyMemory',
	'lid-mapping': 'lidMapping',
	'device-list': 'deviceList',
	tctoken: 'tctoken',
	'identity-key': 'identityKey'
}

/**
 * @deprecated use multi file auth state instead please
 * Stores the full authentication state in a single JSON file.
 *
 * DO NOT USE IN A PROD ENVIRONMENT, only meant to serve as an example.
 */
export const useSingleFileAuthState = (
	filename: string,
	logger?: ILogger
): { state: AuthenticationState; saveState: () => void } => {
	let creds: AuthenticationState['creds']
	let keys: { [key: string]: { [id: string]: unknown } } = {}

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
				get: async <T extends keyof SignalDataTypeMap>(type: T, ids: string[]) => {
					const key = KEY_MAP[type]
					return ids.reduce(
						(dict, id) => {
							let value = keys[key]?.[id]
							if (value) {
								if (type === 'app-state-sync-key') {
									value = proto.Message.AppStateSyncKeyData.fromObject(value as object)
								}

								;(dict as any)[id] = value
							}

							return dict
						},
						{} as { [id: string]: SignalDataTypeMap[T] }
					)
				},
				set: async (data: any) => {
					for (const _key in data) {
						const key = KEY_MAP[_key as keyof SignalDataTypeMap]
						keys[key] = keys[key] || {}
						Object.assign(keys[key]!, data[_key])
					}

					saveState()
				}
			}
		},
		saveState
	}
}
