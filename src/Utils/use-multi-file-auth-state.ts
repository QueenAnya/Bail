import { Mutex } from 'async-mutex'
import { mkdir, readdir, readFile, stat, unlink, writeFile } from 'fs/promises'
import { join } from 'path'
import { proto } from '../../WAProto/index.js'
import type { AuthenticationCreds, AuthenticationStateWithListing, SignalDataTypeMap } from '../Types'
import { normalizeAuthArgs, pickAlias } from './auth-args'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'
import { resetCredsInPlace } from '../Extras/auth-store'

// We need to lock files due to the fact that we are using async functions to read and write files
// https://github.com/nodejs/node/issues/26338
// Use a Map to store mutexes for each file path
const fileLocks = new Map<string, { mutex: Mutex; waiting: number }>()

/** number of file paths currently tracked by the per-file lock map (idle entries are removed) */
export const countAuthFileLocks = () => fileLocks.size

/** a session name becomes a directory name, so it must not escape the folder */
const fixSessionName = (session: string) => session.replace(/[\\/]/g, '-').replace(/\.\./g, '-')

// Run `work` under the file's mutex; the map entry is dropped once nobody is waiting on it
const withFileLock = async <T>(path: string, work: () => Promise<T>): Promise<T> => {
	let entry = fileLocks.get(path)
	if (!entry) {
		entry = { mutex: new Mutex(), waiting: 0 }
		fileLocks.set(path, entry)
	}

	entry.waiting++
	const release = await entry.mutex.acquire()
	try {
		return await work()
	} finally {
		release()
		entry.waiting--
		if (entry.waiting === 0) {
			fileLocks.delete(path)
		}
	}
}

/**
 * stores the full authentication state in a single folder.
 * Far more efficient than singlefileauthstate
 *
 * Again, I wouldn't endorse this for any production level use other than perhaps a bot.
 * Would recommend writing an auth state for use with a proper SQL or No-SQL DB
 * */
export interface MultiFileAuthStateOptions {
	/**
	 * Namespace this session inside the folder: files live in `<folder>/<session>`.
	 *
	 * Omit it (or pass `default`) and the layout is exactly what it always was — one folder, one session. Set it and
	 * several bots can share one folder, each in its own subdirectory.
	 */
	session?: string
}

export const useMultiFileAuthState = async (
	/**
	 * The folder, or an options object. Accepted shapes:
	 * `(folder)`, `(folder, { session })`, `({ foldername })`, `({ foldername, session })`.
	 */
	a: string | (MultiFileAuthStateOptions & { foldername?: string; folder?: string }),
	b?: MultiFileAuthStateOptions
): Promise<{
	state: AuthenticationStateWithListing
	saveCreds: () => Promise<void>
	clearAuth: () => Promise<void>
}> => {
	const opts = normalizeAuthArgs<MultiFileAuthStateOptions & { foldername?: string; folder?: string }>(
		[a, b],
		['foldername', 'session']
	)
	const folder = pickAlias<string>(opts, ['foldername', 'folder', 'filename'])
	if (!folder) {
		throw new Error('useMultiFileAuthState needs a folder (or { foldername })')
	}

	const session = opts.session && opts.session !== 'default' ? opts.session : undefined
	/** everything is written below `baseDir`, so a session is just a subdirectory */
	const baseDir = session ? join(folder, fixSessionName(session)) : folder
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const writeData = async (data: any, file: string) => {
		const filePath = join(baseDir, fixFileName(file)!)
		return withFileLock(filePath, () => writeFile(filePath, JSON.stringify(data, BufferJSON.replacer)))
	}

	const readData = async (file: string) => {
		try {
			const filePath = join(baseDir, fixFileName(file)!)
			return await withFileLock(filePath, async () => {
				const data = await readFile(filePath, { encoding: 'utf-8' })
				return JSON.parse(data, BufferJSON.reviver)
			})
		} catch (error) {
			return null
		}
	}

	const removeData = async (file: string) => {
		try {
			const filePath = join(baseDir, fixFileName(file)!)
			await withFileLock(filePath, async () => {
				try {
					await unlink(filePath)
				} catch {}
			})
		} catch {}
	}

	const folderInfo = await stat(baseDir).catch(() => {})
	if (folderInfo) {
		if (!folderInfo.isDirectory()) {
			throw new Error(
				`found something that is not a directory at ${baseDir}, either delete it or specify a different location`
			)
		}
	} else {
		await mkdir(baseDir, { recursive: true })
	}

	const fixFileName = (file?: string) => file?.replace(/\//g, '__')?.replace(/:/g, '-')

	const creds: AuthenticationCreds = (await readData('creds.json')) || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async (type, ids) => {
					const data: { [_: string]: SignalDataTypeMap[typeof type] } = {}
					await Promise.all(
						ids.map(async id => {
							let value = await readData(`${type}-${id}.json`)
							if (type === 'app-state-sync-key' && value) {
								value = proto.Message.AppStateSyncKeyData.fromObject(value)
							}

							data[id] = value
						})
					)

					return data
				},
				set: async data => {
					const tasks: Promise<void>[] = []
					for (const category in data) {
						for (const id in data[category as keyof SignalDataTypeMap]) {
							const value = data[category as keyof SignalDataTypeMap]![id]
							const file = `${category}-${id}.json`
							tasks.push(value ? writeData(value, file) : removeData(file))
						}
					}

					await Promise.all(tasks)
				},
				/**
				 * Walks the session folder. File names are `<type>-<id>.json`, so the id is the rest of the name after the
				 * type — the same shape `set` writes.
				 */
				list: async function* (type) {
					const files = await readdir(baseDir).catch(() => [] as string[])
					const head = `${type}-`
					for (const file of files.sort()) {
						if (!file.startsWith(head) || !file.endsWith('.json')) {
							continue
						}

						const raw = await readData(file)
						if (raw !== null && raw !== undefined) {
							yield [file.slice(head.length, -'.json'.length), raw] as const
						}
					}
				},
				listIds: async function* (type) {
					const files = await readdir(baseDir).catch(() => [] as string[])
					const head = `${type}-`
					for (const file of files.sort()) {
						if (file.startsWith(head) && file.endsWith('.json')) {
							yield file.slice(head.length, -'.json'.length)
						}
					}
				}
			}
		},
		saveCreds: async () => {
			return writeData(creds, 'creds.json')
		},
		/** removes every auth file of this session (the folder itself is left in place) */
		clearAuth: async () => {
			const entries = await readdir(baseDir).catch(() => [] as string[])
			await Promise.all(
				entries.filter(name => name.endsWith('.json')).map(name => unlink(join(baseDir, name)).catch(() => {}))
			)
			resetCredsInPlace(creds)
		}
	}
}
