/**
 * addon: chat-history-helpers
 *
 * Small convenience helpers that were referenced as "implement this on your
 * end" stubs in innovatorssoft's README examples (getLastMessageInChat /
 * getOldestMessageInChat / copyNForward). This addon provides real
 * implementations, built on top of this fork's SimpleInMemoryStore and the
 * existing generateForwardMessageContent utility — not ported from any
 * upstream source, since none of the forks actually implement these.
 */

import type { WAMessage } from '../Types/index.js'
import type { AnyMediaMessageContent, WAMediaUploadFunction } from '../Types/Message.js'
import { generateForwardMessageContent, prepareWAMessageMedia } from '../Utils/messages.js'
import type { InMemoryStore } from './in-memory-store.js'

/**
 * Get the most recently stored message in a chat.
 * Requires a SimpleInMemoryStore instance (see makeSimpleInMemoryStore) that
 * has been kept in sync with `messages.upsert` events for this chat.
 */
export const getLastMessageInChat = (store: InMemoryStore, jid: string): WAMessage | undefined => {
	const msgs = store.messages.get(jid)
	if (!msgs || msgs.length === 0) return undefined
	return msgs[msgs.length - 1]
}

/**
 * Get the oldest stored message in a chat (useful as the `oldestMsgKey`
 * cursor for `sock.fetchMessageHistory(...)`, which pages backwards from it).
 * Requires a SimpleInMemoryStore instance kept in sync with `messages.upsert`.
 */
export const getOldestMessageInChat = (store: InMemoryStore, jid: string): WAMessage | undefined => {
	const msgs = store.messages.get(jid)
	if (!msgs || msgs.length === 0) return undefined
	return msgs[0]
}

/**
 * Re-send ("copy-forward") an existing message to a (possibly different) jid.
 * Thin wrapper around generateForwardMessageContent + sock.sendMessage —
 * strips the original sender's quoting/context the same way WhatsApp's own
 * "Forward" action does, and marks the copy as forwarded.
 *
 * Usage: await copyNForward(sock, targetJid, originalMessage)
 */
export const copyNForward = async (
	sock: { sendMessage: (jid: string, content: unknown) => Promise<WAMessage | undefined> },
	jid: string,
	message: WAMessage,
	forceForward = false
): Promise<WAMessage | undefined> => {
	const content = generateForwardMessageContent(message, forceForward)
	return sock.sendMessage(jid, content)
}

/**
 * Upload media directly to WhatsApp's own encrypted media CDN and get back
 * a ready-to-send message-content object (with mediaKey, url/directPath,
 * fileEncSha256, etc).
 *
 * IMPORTANT: WhatsApp clients only accept media that lives on WhatsApp's own
 * CDN, encrypted with a mediaKey the recipient can derive — there is no way
 * to point a WAMessage at an arbitrary third-party URL and have it render.
 * This wrapper does the real, official upload (same path prepareWAMessageMedia
 * / sock.waUploadToServer use internally) — it does not accept or return an
 * arbitrary external URL.
 *
 * Usage: const media = await uploadMediaToWhatsApp(sock, { image: buffer })
 *        await sock.sendMessage(jid, media)
 */
export const uploadMediaToWhatsApp = async (
	sock: { waUploadToServer: WAMediaUploadFunction },
	message: AnyMediaMessageContent,
	opts?: { logger?: import('../Utils/logger.js').ILogger; mediaTypeOverride?: import('../Defaults/index.js').MediaType }
) => {
	return prepareWAMessageMedia(message, {
		upload: sock.waUploadToServer,
		logger: opts?.logger,
		mediaTypeOverride: opts?.mediaTypeOverride
	})
}
