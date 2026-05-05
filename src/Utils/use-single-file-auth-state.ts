import { Mutex } from 'async-mutex'
import { mkdir, readFile, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationState, SignalDataTypeMap } from '../Types'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'

const fileLock = new Mutex()

export const useSingleFileAuthState = async (
	filePath: string
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> => {
	const resolvedPath = join(filePath)
	const folder = join(resolvedPath, '..')
	// const resolvedPath = join(folderPath, 'creds.json'); // folderPath = filePath if folder path given in filePath or folderPath
	// const folder = folderPath or filePath // if folder path given

	const ensureFolder = async () => {
		const folderInfo = await stat(folder).catch(() => null)
		if (folderInfo) {
			if (!folderInfo.isDirectory()) {
				throw new Error(`Path ${folder} is not a directory`)
			}
		} else {
			await mkdir(folder, { recursive: true })
		}
	}

	const readFullData = async (): Promise<{
		creds: AuthenticationCreds
		keys: { [key: string]: { [id: string]: any } }
	}> => {
		await ensureFolder()
		return fileLock.acquire().then(async release => {
			try {
				const raw = await readFile(resolvedPath, 'utf-8').catch(() => null)
				if (!raw) return { creds: initAuthCreds(), keys: {} }
				return JSON.parse(raw, BufferJSON.reviver)
			} finally {
				release()
			}
		})
	}

	const writeFullData = async (data: {
		creds: AuthenticationCreds
		keys: { [key: string]: { [id: string]: any } }
	}) => {
		await ensureFolder()
		return fileLock.acquire().then(async release => {
			try {
				await writeFile(resolvedPath, JSON.stringify(data, BufferJSON.replacer, 2))
			} finally {
				release()
			}
		})
	}

	const fullData = await readFullData()

	return {
		state: {
			creds: fullData.creds,
			keys: {
				get: async (type, ids) => {
					const result: { [id: string]: SignalDataTypeMap[typeof type] } = {}
					for (const id of ids) {
						let value = fullData.keys?.[type]?.[id]
						if (type === 'app-state-sync-key' && value) {
							value = proto.Message.AppStateSyncKeyData.fromObject(value)
						}

						result[id] = value
					}

					return result
				},
				set: async data => {
					for (const category in data) {
						if (!fullData.keys[category]) fullData.keys[category] = {}
						for (const id in data[category as keyof SignalDataTypeMap]) {
							const value = data[category as keyof SignalDataTypeMap]![id]
							if (value) {
								fullData.keys[category][id] = value
							} else {
								delete fullData.keys[category][id]
							}
						}
					}

					await writeFullData(fullData)
				}
			}
		},
		saveCreds: async () => {
			await writeFullData(fullData)
		}
	}
}
