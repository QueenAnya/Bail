/**
 * from-chats.ts
 * Source: src/Socket/chats.ts
 *
 * Chat modification helpers ported from baileys.
 * These are imported back into makeChatsSocket.
 */
import Long from 'long'
import type { ChatModification, WAMessageKey } from '../Types/index.js'

/**
 * Build the ChatModification object for clearing/deleting a message (for me)
 * Source: chats.ts → clearMessage
 *
 * @example
 * const mod = buildClearMessageModification(key, timestamp)
 * chatModify(mod, jid)
 */
export function buildClearMessageModification(key: WAMessageKey, timeStamp: number | Long): ChatModification {
	return {
		delete: true,
		lastMessages: [{ key, messageTimestamp: timeStamp }]
	}
}

/**
 * Factory: creates clearMessage bound to chatModify
 * Source: chats.ts → clearMessage
 *
 * @example
 * const { clearMessage } = createChatHelpers(chatModify)
 * await clearMessage(jid, key, timestamp)
 */
export function createChatHelpers(chatModify: (mod: ChatModification, jid: string) => Promise<any>) {
	return {
		clearMessage: (jid: string, key: WAMessageKey, timeStamp: number | Long) => {
			return chatModify(buildClearMessageModification(key, timeStamp), jid)
		}
	}
}
