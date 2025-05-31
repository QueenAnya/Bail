import makeWASocket from './Socket'
import { proto } from '../WAProto'
export * from '../WAProto'
export * from './Utils'
export * from './Types'
export * from './Store'
export * from './Defaults'
export * from './WABinary'
export * from './WAM'
export * from './WAUSync'

export type WASocket = ReturnType<typeof makeWASocket>
export { makeWASocket, proto }
export default makeWASocket
