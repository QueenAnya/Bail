import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto'
import { BinaryNode } from './types'

// some extra useful utilities

export const getBinaryNodeChildren = (node: BinaryNode | undefined, childTag: string): BinaryNode[] => {
    if(!node || !Array.isArray(node.content)) {
        return []
    }
    return node.content.filter((item): item is BinaryNode => item.tag === childTag)
}

export const getAllBinaryNodeChildren = ({ content }: BinaryNode): BinaryNode[] => {
    return Array.isArray(content) ? content : []
}

export const getBinaryNodeChild = (node: BinaryNode | undefined, childTag: string): BinaryNode | undefined => {
    if(!node || !Array.isArray(node.content)) {
        return undefined
    }
    return node.content.find(item => item.tag === childTag)
}

export const getBinaryNodeChildBuffer = (node: BinaryNode | undefined, childTag: string): Uint8Array | Buffer | undefined => {
    const child = getBinaryNodeChild(node, childTag)?.content
    if(Buffer.isBuffer(child) || child instanceof Uint8Array) {
        return child
    }
    return undefined
}

export const getBinaryNodeChildString = (node: BinaryNode | undefined, childTag: string): string | undefined => {
    const child = getBinaryNodeChild(node, childTag)?.content
    if(Buffer.isBuffer(child) || child instanceof Uint8Array) {
        return Buffer.from(child).toString('utf-8')
    } else if(typeof child === 'string') {
        return child
    }
    return undefined
}

export const getBinaryNodeChildUInt = (node: BinaryNode | undefined, childTag: string, length: number): number | undefined => {
    const buff = getBinaryNodeChildBuffer(node, childTag)
    if(buff) {
        return bufferToUInt(buff, length)
    }
    return undefined
}

export const assertNodeErrorFree = (node: BinaryNode): void => {
    const errNode = getBinaryNodeChild(node, 'error')
    if(errNode) {
        throw new Boom(errNode.attrs?.text || 'Unknown error', { 
            data: Number(errNode.attrs?.code) || 0 
        })
    }
}

export const reduceBinaryNodeToDictionary = (node: BinaryNode, tag: string): Record<string, string> => {
    const nodes = getBinaryNodeChildren(node, tag)
    return nodes.reduce(
        (dict, { attrs }) => {
            const name = attrs?.name || attrs?.config_code
            const value = attrs?.value || attrs?.config_value
            if(name && value) {
                dict[name] = value
            }
            return dict
        }, {} as Record<string, string>
    )
}

export const getBinaryNodeMessages = ({ content }: BinaryNode): proto.WebMessageInfo[] => {
    if(!Array.isArray(content)) {
        return []
    }
    
    const msgs: proto.WebMessageInfo[] = []
    for(const item of content) {
        if(item.tag === 'message' && item.content) {
            try {
                msgs.push(proto.WebMessageInfo.decode(item.content as Buffer))
            } catch(error) {
                // Handle decode error if needed
                console.error('Failed to decode message:', error)
            }
        }
    }
    return msgs
}

function bufferToUInt(e: Uint8Array | Buffer, t: number): number {
    let a = 0
    for(let i = 0; i < t; i++) {
        a = 256 * a + e[i]
    }
    return a
}

const tabs = (n: number): string => '\t'.repeat(n)

export function binaryNodeToString(node: BinaryNode | BinaryNode['content'] | undefined, i = 0): string | undefined {
    if(!node) {
        return undefined
    }

    if(typeof node === 'string') {
        return tabs(i) + node
    }

    if(node instanceof Uint8Array) {
        return tabs(i) + Buffer.from(node).toString('hex')
    }

    if(Array.isArray(node)) {
        return node.map((x) => tabs(i + 1) + binaryNodeToString(x, i + 1)).join('\n')
    }

    const children = binaryNodeToString(node.content, i + 1)
    const attrs = Object.entries(node.attrs || {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}='${v}'`)
        .join(' ')

    const tag = `<${node.tag}${attrs ? ' ' + attrs : ''}`
    const content: string = children ? `>\n${children}\n${tabs(i)}</${node.tag}>` : '/>'

    return tag + content
}