import makeWASocket from './Socket/index'

export * from '../WAProto/index.js'
export * from './Utils/index'
export * from './Types/index'
export * from './Defaults/index'
export * from './WABinary/index'
export * from './WAM/index'
export * from './WAUSync/index'
export * from './Addons/index'
import './Utils/proto-compat'
export * from './Extras/index'
// resolve ambiguity: the bare `useSqliteAuthState` / `useMongoAuthState` names stay Anya's originals (Addons/Utils);
// the Elaina-compatible ports are exported from src/Extras as `useSqliteAuthState2` / `useMongoAuthState2`, with the
// elaina names aliased inside those modules.
export { useSqliteAuthState } from './Addons/use-sqlite-auth-state'
export { useMongoAuthState } from './Utils/use-mongo-file-auth-state'
export * from './Voip/index'
export * from './Framework/index'

export type { UsernameSocket } from './Socket/username'

export type WASocket = ReturnType<typeof makeWASocket>
export { makeWASocket }
export default makeWASocket
