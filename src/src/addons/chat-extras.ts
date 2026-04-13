/**
 * Chat Extras Addon
 * Ported from innovatorssoft/Baileys.
 *
 * Adds: clearMessage, getLidUser, updatePanoramaProfilePicture
 *
 * Usage — inject into makeChatsSocket return:
 * ```ts
 * const chatExtras = makeChatExtrasAddon({ query, authState, chatModify, executeUSyncQuery })
 * return { ...sock, ...chatExtras }
 * ```
 */

import { Boom } from '@hapi/boom'
import type { ChatModification, WAMediaUpload } from '../Types'
import { generateProfilePicture } from '../Utils'
import { isJidUser, jidNormalizedUser, S_WHATSAPP_NET } from '../WABinary'
import { USyncQuery } from '../WAUSync'

interface BinaryNode {
	tag: string
	attrs: Record<string, string | undefined>
	content?: BinaryNode[] | Buffer | Uint8Array | undefined
}

export interface ChatExtrasContext {
	query: (node: BinaryNode) => Promise<BinaryNode>
	authState: { creds: { me?: { id: string; lid?: string } } }
	chatModify: (mod: ChatModification, jid: string) => Promise<void>
	executeUSyncQuery: (query: USyncQuery) => Promise<{ list: unknown[] } | undefined>
}

export const makeChatExtrasAddon = (ctx: ChatExtrasContext) => {
	const { query, authState, chatModify, executeUSyncQuery } = ctx

	/**
	 * Clear (delete) a single message from a chat.
	 * Equivalent to long-pressing → Delete in the WA UI.
	 *
	 * @example
	 * await sock.clearMessage(jid, msg.key, msg.messageTimestamp!)
	 */
	const clearMessage = (
		jid: string,
		key: { id?: string | null; remoteJid?: string | null; fromMe?: boolean | null },
		timeStamp: number | Long | null | undefined
	): Promise<void> => {
		return chatModify(
			{
				delete: true,
				lastMessages: [{ key, messageTimestamp: timeStamp }]
			} as unknown as ChatModification,
			jid
		)
	}

	/**
	 * Fetch the LID (Linked ID) for a given PN-based user JID.
	 *
	 * @example
	 * const result = await sock.getLidUser('1234567890@s.whatsapp.net')
	 * console.log(result) // [{ id: 'lid@lid', lid: '...' }]
	 */
	const getLidUser = async (jid: string): Promise<unknown[] | undefined> => {
		if (!jid) throw new Boom('Please input a jid user')
		if (!isJidUser(jid)) throw new Boom('Invalid JID: Not a user JID!')

		const targetJid = jidNormalizedUser(jid)

		const usyncQuery = new USyncQuery()
		usyncQuery.protocols.push({
			name: 'lid',
			getQueryElement: () => ({ tag: 'lid', attrs: {}, content: undefined }),
			getUserElement: () => null,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			parser: (node: any) => node.attrs.val
		} as unknown as Parameters<typeof USyncQuery.prototype.protocols.push>[0])

		usyncQuery.users.push({ id: targetJid } as unknown as Parameters<typeof USyncQuery.prototype.users.push>[0])

		const result = await executeUSyncQuery(usyncQuery)
		return result?.list
	}

	/**
	 * Update the profile picture with both a square preview and a full panorama image.
	 * Provide either your own JID (to update your profile) or a group JID.
	 *
	 * @example
	 * await sock.updatePanoramaProfilePicture(sock.user!.id, fs.readFileSync('banner.jpg'))
	 */
	const updatePanoramaProfilePicture = async (
		jid: string,
		content: WAMediaUpload,
		options?: { quality?: number }
	): Promise<void> => {
		if (!jid) {
			throw new Boom(
				'Illegal no-jid profile update. Please specify either your ID or the ID of the chat you wish to update'
			)
		}

		let targetJid: string | undefined
		if (authState.creds.me && jidNormalizedUser(jid) !== jidNormalizedUser(authState.creds.me.id)) {
			targetJid = jidNormalizedUser(jid)
		}

		// generateProfilePicture returns { img } for the square version
		// For panorama we send both the square preview and the full buffer
		const { img } = await generateProfilePicture(content, options)

		// Use the raw content buffer as the full-size panorama
		let fullImg: Buffer | Uint8Array
		if (Buffer.isBuffer(content)) {
			fullImg = content
		} else if ('url' in (content as object)) {
			// If URL provided, re-use the same img for fullsize
			fullImg = img
		} else {
			fullImg = img
		}

		await query({
			tag: 'iq',
			attrs: {
				to: S_WHATSAPP_NET,
				type: 'set',
				xmlns: 'w:profile:picture',
				...(targetJid ? { target: targetJid } : {})
			},
			content: [
				{ tag: 'picture', attrs: { type: 'image' }, content: img },
				{ tag: 'picture', attrs: { type: 'fullsize' }, content: fullImg }
			]
		})
	}

	return {
		clearMessage,
		getLidUser,
		updatePanoramaProfilePicture
	}
}
