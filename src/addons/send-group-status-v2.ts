import { randomBytes } from 'crypto'
import type { AnyMessageContent } from '../Types/Message.js'
import type { MessageGenerationOptions } from '../Types/Message.js'
import { generateWAMessage } from '../Utils/messages.js'

/**
 * Alternate implementation of the Group Status (groupStatusMessageV2) helper,
 * kept alongside `sendGroupStatus` (send-group-status.ts) rather than
 * replacing it. Differs from `sendGroupStatus` in a few ways:
 *   - Requires `sock.user` to already be set (throws otherwise) instead of
 *     passing a possibly-undefined `userJid` through to `generateWAMessage`.
 *   - Mutates the plain `generateWAMessage` result object directly (no
 *     `proto.Message.create()` re-wrap).
 *   - Assigns its own `3EB0`-prefixed message ID (matching the ID shape a
 *     real WhatsApp client uses for group-status messages) instead of
 *     reusing whatever ID `generateWAMessage` generated, unless the caller
 *     already supplied one via `options.messageId`.
 *
 * Usage: await sock.sendGroupStatusV2(groupJid, { text: 'Hello group!' })
 */
export async function sendGroupStatusV2(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	sock: any,
	jid: string,
	content: AnyMessageContent,
	options: Partial<MessageGenerationOptions> = {}
) {
	if (!jid.endsWith('@g.us')) {
		throw new Error('groupStatus can only be sent to a group JID (e.g. 120363xxxxxxxx@g.us)')
	}

	// 1. Build the message the same way sock.sendMessage would internally.
	const userJid = sock.user?.id
	if (!userJid) {
		throw new Error('Socket is not authenticated yet (sock.user is undefined)')
	}

	const fullMsg = await generateWAMessage(jid, content, {
		userJid,
		logger: sock.logger,
		upload: sock.waUploadToServer,
		...options
	} as MessageGenerationOptions)

	// 2. Wrap whatever content was generated (text/image/video/etc.) in
	// groupStatusMessageV2, marking contextInfo.isGroupStatus along the way.
	let m = fullMsg.message!
	const messageType = Object.keys(m)[0] as string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const key = (m as any)[messageType]
	if (key && 'contextInfo' in key && key.contextInfo) {
		key.contextInfo.isGroupStatus = true
	} else if (key) {
		key.contextInfo = { isGroupStatus: true }
	}

	if (key) {
		const contextInfo = key.contextInfo
		if (contextInfo.pairedMediaType === undefined) contextInfo.pairedMediaType = 0
		if (contextInfo.forwardingScore === undefined) contextInfo.forwardingScore = 0
		if (!contextInfo.featureEligibilities) {
			contextInfo.featureEligibilities = { canBeReshared: true, canReceiveMultiReact: true }
		}

		if (!contextInfo.statusAttributions?.length) {
			contextInfo.statusAttributions = [{ type: 5 /* GROUP_STATUS */, groupStatus: { authorJid: userJid } }]
		}
	}

	m = { groupStatusMessageV2: { message: m } }
	fullMsg.message = m

	// 3. Group-status messages get their own ID prefix, matching what a
	// real WhatsApp client sends (unless the caller already gave one).
	if (!options.messageId) {
		fullMsg.key.id = '3EB0' + randomBytes(18).toString('hex').toUpperCase()
	}

	// 4. Relay it like a normal outgoing message.
	await sock.relayMessage(jid, fullMsg.message!, {
		messageId: fullMsg.key.id!
	})

	return fullMsg
}
