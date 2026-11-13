/**
 * Ported from @rexxhayanasi/elaina-baileys (MIT, Copyright (c) 2025 Rajeh Taher/WhiskeySockets,
 * (c) 2026 rexxhayanasi) - Socket/messages-send.js, Socket/groups.js, Socket/communities.js,
 * Utils/sender-key-memory.js, rewritten in TypeScript as an add-on socket layer.
 *
 * Adds: `sendHD` (SD message + HD child upload, WhatsApp's "HD" photo / video), `sendImgVid` (motion photo: an image
 * with a paired video), `removeMemberLabel`, `resetGroupSenderKey`, plus the low level helpers `groupQuery`,
 * `communityQuery` and `executeWMexQuery`.
 */
import { Boom } from '@hapi/boom'
import { proto } from '../../WAProto/index.js'
import { executeWMexQuery as genericExecuteWMexQuery } from '../Socket/mex'
import { generateMessageIDV2 } from '../Utils/generics'
import { generateWAMessage } from '../Utils/messages'
import type { BinaryNode } from '../WABinary'
import { isJidGroup } from '../WABinary'
import { senderKeyResetSummary } from './sender-key-memory'

export const AssociationType = proto.MessageAssociation.AssociationType

/**
 * Anya-specific alias for `senderKeyResetSummary` (Elaina's name, which is the canonical export in
 * `./sender-key-memory`). This used to be a second, separately ported copy of the same logic; there is
 * now one implementation and both names point at it.
 */
export const senderKeyMemoryResetSummary = senderKeyResetSummary

export interface MessagesExtrasSocket {
	query: (node: BinaryNode) => Promise<BinaryNode>
	generateMessageTag: () => string
	logger: any
	authState: {
		creds: { me?: { id: string } }
		keys: { get: (type: any, ids: string[]) => any; set: (data: any) => any }
	}
	relayMessage: (jid: string, message: any, options: any) => Promise<string>
	waUploadToServer: any
	upsertMessage: (message: any, type: 'append' | 'notify') => Promise<void>
	messageMutex: { mutex: <T>(fn: () => Promise<T> | T) => Promise<T> }
	updateMemberLabel: (jid: string, memberLabel: string) => Promise<any>
}

export interface MessagesExtrasConfig {
	mediaCache?: any
	options?: any
	emitOwnEvents?: boolean
}

type SendOptions = Record<string, any> & {
	useCachedGroupMetadata?: boolean
	statusJidList?: string[]
	additionalAttributes?: Record<string, string>
	additionalNodes?: BinaryNode[]
}

export const makeMessagesExtras = (sock: MessagesExtrasSocket, config: MessagesExtrasConfig = {}) => {
	const { query, generateMessageTag, logger, authState } = sock

	const relayOptsOf = (options: SendOptions) => ({
		useCachedGroupMetadata: options.useCachedGroupMetadata,
		statusJidList: options.statusJidList,
		additionalAttributes: options.additionalAttributes,
		additionalNodes: options.additionalNodes
	})

	const genOptsOf = (userJid: string, options: SendOptions) => ({
		logger,
		userJid,
		upload: sock.waUploadToServer,
		mediaCache: config.mediaCache,
		options: config.options,
		...options
	})

	const emit = (message: any) => {
		if (config.emitOwnEvents) {
			process.nextTick(() => {
				void sock.messageMutex.mutex(() => sock.upsertMessage(message, 'append'))
			})
		}
	}

	return {
		/**
		 * Sends a photo / video the way WhatsApp's "HD" quality does: a normal (SD) message followed by an HD child that is
		 * linked to it. `content.hd` can be a separate HD source; by default the same media is sent as the HD child.
		 *   sock.sendHD(jid, { image: buffer, caption: 'hi' })
		 *   sock.sendHD(jid, { video: { url }, hd: { url: hdUrl } })
		 */
		sendHD: async (jid: string, content: Record<string, any>, options: SendOptions = {}) => {
			const userJid = authState.creds.me!.id
			const isVideo = !!content.video
			const media = isVideo ? content.video : content.image
			if (!media) {
				throw new Boom('sendHD needs { image } or { video }', { statusCode: 400 })
			}

			const hdSource = content.hd && content.hd !== true ? content.hd : media
			const parentContent = { ...content }
			delete parentContent.hd
			const mediaKey = isVideo ? 'videoMessage' : 'imageMessage'
			const parentPaired = isVideo
				? proto.ContextInfo.PairedMediaType.SD_VIDEO_PARENT
				: proto.ContextInfo.PairedMediaType.SD_IMAGE_PARENT
			const childPaired = isVideo
				? proto.ContextInfo.PairedMediaType.HD_VIDEO_CHILD
				: proto.ContextInfo.PairedMediaType.HD_IMAGE_CHILD
			const association = isVideo ? AssociationType.HD_VIDEO_DUAL_UPLOAD : AssociationType.HD_IMAGE_DUAL_UPLOAD
			const genOpts = genOptsOf(userJid, options)
			const relayOpts = relayOptsOf(options)

			const parent: any = await generateWAMessage(jid, parentContent, {
				...genOpts,
				messageId: generateMessageIDV2(userJid)
			})
			parent.message[mediaKey].contextInfo = {
				...(parent.message[mediaKey].contextInfo || {}),
				pairedMediaType: parentPaired
			}
			await sock.relayMessage(jid, parent.message, { messageId: parent.key.id, ...relayOpts })
			emit(parent)

			const child: any = await generateWAMessage(jid, isVideo ? { video: hdSource } : { image: hdSource }, {
				...genOpts,
				messageId: generateMessageIDV2(userJid)
			})
			child.message[mediaKey].contextInfo = {
				...(child.message[mediaKey].contextInfo || {}),
				pairedMediaType: childPaired
			}
			child.message.messageContextInfo = {
				...(child.message.messageContextInfo || {}),
				messageAssociation: { parentMessageKey: parent.key, associationType: association }
			}
			await sock.relayMessage(jid, child.message, { messageId: child.key.id, ...relayOpts })
			emit(child)
			return parent
		},

		/** motion photo: `{ image, video, caption? }` - an image with a paired short video. */
		sendImgVid: async (
			jid: string,
			content: { image: any; video: any; caption?: string },
			options: SendOptions = {}
		) => {
			const userJid = authState.creds.me!.id
			const { image, video, caption } = content
			if (!image || !video) {
				throw new Boom('sendImgVid needs { image, video }', { statusCode: 400 })
			}

			const genOpts = genOptsOf(userJid, options)
			const relayOpts = relayOptsOf(options)

			const parent: any = await generateWAMessage(
				jid,
				{ image, caption },
				{
					...genOpts,
					messageId: generateMessageIDV2(userJid)
				}
			)
			await sock.relayMessage(jid, parent.message, { messageId: parent.key.id, ...relayOpts })
			emit(parent)

			const child: any = await generateWAMessage(
				jid,
				{ video },
				{
					...genOpts,
					messageId: generateMessageIDV2(userJid)
				}
			)
			child.message.messageContextInfo = {
				...(child.message.messageContextInfo || {}),
				messageAssociation: { associationType: AssociationType.MOTION_PHOTO, parentMessageKey: parent.key }
			}
			await sock.relayMessage(jid, child.message, { messageId: child.key.id, ...relayOpts })
			emit(child)
			return parent
		},

		/** removes your member label in a group (same as `updateMemberLabel(jid, '')`) */
		removeMemberLabel: (jid: string) => sock.updateMemberLabel(jid, ''),

		/**
		 * Forgets which devices already got your sender key in a group, so the next send redistributes it
		 * (useful when members cannot decrypt your group messages). Returns `{ jid, cleared, devices }`.
		 */
		resetGroupSenderKey: async (jid: string) => {
			if (!isJidGroup(jid)) {
				throw new Boom('resetGroupSenderKey needs a group jid', { statusCode: 400 })
			}

			const stored = await authState.keys.get('sender-key-memory', [jid])
			const summary = senderKeyResetSummary(stored, jid)
			await authState.keys.set({ 'sender-key-memory': { [jid]: null } })
			logger.info(summary, 'cleared sender key memory, the next send redistributes the key')
			return summary
		},

		/** raw `w:g2` group IQ: `groupQuery(jid, 'get', [{ tag: 'query', attrs: { request: 'interactive' } }])` */
		groupQuery: (jid: string, type: 'get' | 'set', content: BinaryNode[]) =>
			query({ tag: 'iq', attrs: { type, xmlns: 'w:g2', to: jid }, content }),

		/** raw `w:g2` community IQ (same wire format as `groupQuery`) */
		communityQuery: (jid: string, type: 'get' | 'set', content: BinaryNode[]) =>
			query({ tag: 'iq', attrs: { type, xmlns: 'w:g2', to: jid }, content }),

		/** raw WMex (GraphQL) query: `executeWMexQuery(variables, queryId, dataPath)` */
		executeWMexQuery: <T = any>(variables: Record<string, unknown>, queryId: string, dataPath: string): Promise<T> =>
			genericExecuteWMexQuery<T>(variables, queryId, dataPath, query, generateMessageTag)
	}
}
