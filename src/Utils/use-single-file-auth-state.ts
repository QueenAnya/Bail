import { Mutex } from 'async-mutex'
import { readFile, writeFile } from 'fs/promises'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'

// We still use a lock (mutex) to avoid race conditions on file read/write
const fileLock = new Mutex()

/**
 * Stores the full authentication state in a single file.
 * Less efficient than multi-file, but simpler to manage.
 *
 * Good for small bots, but for production use you should use a DB.
 */
export const useSingleFileAuthState = async (
	file: string
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> => {
	let creds: AuthenticationCreds
	let keys: SignalDataTypeMap = {} as any

	// Load existing auth file if present
	try {
		const data = JSON.parse(await readFile(file, { encoding: 'utf-8' }), BufferJSON.reviver)
		creds = data.creds
		keys = data.keys
	} catch {
		creds = initAuthCreds()
		keys = {} as any
	}

	// Save everything back into single file
	const saveState = async (): Promise<void> => {
		const release = await fileLock.acquire()
		try {
			await writeFile(file, JSON.stringify({ creds, keys }, BufferJSON.replacer, 2))
		} finally {
			release()
		}
	}

	const state: AuthenticationState = {
		creds,
		keys: {
			get: async <T extends keyof SignalDataTypeMap>(
				type: T,
				ids: string[]
			): Promise<{ [id: string]: SignalDataTypeMap[T] }> => {
				const data: { [id: string]: SignalDataTypeMap[T] } = {}
				for (const id of ids) {
					const value = (keys[type] as any)?.[id]
					if (value) {
						data[id] = value as SignalDataTypeMap[T]
					}
				}

				return data
			},
			set: async (data): Promise<void> => {
				for (const key of Object.keys(data) as (keyof SignalDataTypeMap)[]) {
					if (!keys[key]) {
						keys[key] = {} as any
					}

					Object.assign(keys[key], data[key])
				}

				await saveState()
			},
			clear: async (): Promise<void> => {
				keys = {} as any
				await saveState()
			}
		}
	}

	return { state, saveCreds: saveState }
}
