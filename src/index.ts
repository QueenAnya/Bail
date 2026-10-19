import makeWASocket from './Socket/index'

export * from '../WAProto/index.js'
export * from './Utils/index'
export * from './Types/index'
export * from './Defaults/index'
export * from './WABinary/index'
export * from './WAM/index'
export * from './WAUSync/index'
export * from './addons/index'
export * from './ported/index'
// Resolve the duplicate Carousel name exported by Types and ported APIs.
export { Carousel } from './ported/MessageBuilder/index'
export * from './Voip/index'
export * from './Framework/index'

export type { UsernameSocket } from './Socket/username'

export type WASocket = ReturnType<typeof makeWASocket>
export { makeWASocket }
export default makeWASocket
