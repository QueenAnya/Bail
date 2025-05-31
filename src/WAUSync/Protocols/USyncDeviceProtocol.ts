import { USyncQueryProtocol } from '../../Types/USync'
import { assertNodeErrorFree, BinaryNode, getBinaryNodeChild } from '../../WABinary'
//import { USyncUser } from '../USyncUser'

export type KeyIndexData = {
    timestamp: number
    signedKeyIndex?: Uint8Array
    expectedTimestamp?: number
}

export type DeviceListData = {
    id: number
    keyIndex?: number
    isHosted?: boolean
}

export type ParsedDeviceInfo = {
    deviceList?: DeviceListData[]
    keyIndex?: KeyIndexData
}

export class USyncDeviceProtocol implements USyncQueryProtocol {
    name = 'devices'

    getQueryElement(): BinaryNode {
        return {
            tag: 'devices',
            attrs: {
                version: '2',
            },
        }
    }

    getUserElement(/* user: USyncUser */): BinaryNode | null {
        //TODO: Implement device phashing, ts and expectedTs
        //TODO: if all are not present, return null <- current behavior
        //TODO: otherwise return a node w tag 'devices' w those as attrs
        return null
    }

    parser(node: BinaryNode): ParsedDeviceInfo {
        const deviceList: DeviceListData[] = []
        let keyIndex: KeyIndexData | undefined = undefined

        if(node.tag === 'devices') {
            assertNodeErrorFree(node)
            const deviceListNode = getBinaryNodeChild(node, 'device-list')
            const keyIndexNode = getBinaryNodeChild(node, 'key-index-list')

            if(deviceListNode && Array.isArray(deviceListNode.content)) {
                for(const item of deviceListNode.content) {
                    if(item.tag === 'device' && item.attrs) {
                        const id = Number(item.attrs.id) || 0
                        const keyIndexValue = item.attrs['key-index'] 
                            ? Number(item.attrs['key-index']) 
                            : undefined
                        const isHosted = item.attrs['is_hosted'] === 'true'

                        deviceList.push({
                            id,
                            keyIndex: keyIndexValue,
                            isHosted
                        })
                    }
                }
            }

            if(keyIndexNode?.tag === 'key-index-list' && keyIndexNode.attrs) {
                const timestamp = Number(keyIndexNode.attrs['ts']) || 0
                const expectedTimestamp = keyIndexNode.attrs['expected_ts'] 
                    ? Number(keyIndexNode.attrs['expected_ts']) 
                    : undefined

                keyIndex = {
                    timestamp,
                    signedKeyIndex: keyIndexNode.content instanceof Uint8Array 
                        ? keyIndexNode.content 
                        : undefined,
                    expectedTimestamp
                }
            }
        }

        return {
            deviceList: deviceList.length > 0 ? deviceList : undefined,
            keyIndex
        }
    }
}