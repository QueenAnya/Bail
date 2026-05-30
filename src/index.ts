import makeWASocket from './Socket/index'

export * from '../WAProto/index.js'
export * from './Utils/index'
export * from './Types/index'
export * from './Defaults/index'
export * from './WABinary/index'
export * from './WAM/index'
export * from './WAUSync/index'

export type WASocket = ReturnType<typeof makeWASocket>
export { makeWASocket }
export default makeWASocket

// ─── Addons (interactive, rich-response, status, templates) ────────────────
export * from './addons/index.js'
export { useSingleFileAuthState } from './Utils/use-single-file-auth-state.js'
export { makeInMemoryStore, waChatKey, waMessageID } from './Utils/make-in-memory-store.js'
export { makeLockManager } from './Utils/lock-manager.js'
export { useSqliteAuthState } from './Utils/use-sqlite-auth-state.js'
export { migrateAuthState } from './Utils/migrate-auth-state.js'
export { runDetached } from './Utils/generics.js'
export { AuthFileCorruptError } from './Utils/use-multi-file-auth-state.js'
export { generateKeyUuid } from './Utils/generics.js'
