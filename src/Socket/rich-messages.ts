import { randomBytes, randomUUID } from 'crypto'
import { proto } from '../../WAProto/index.js'
import type { WAMessage, MiscMessageGenerationOptions, AnyMessageContent } from '../Types'
import {
	generateTableContent,
	generateListContent,
	generateCodeBlockContent,
	generateLatexContent,
	generateLatexImageContent,
	generateLatexInlineImageContent,
	captureUnifiedResponse,
	generateUnifiedResponseContent,
	generateRichMessageContent,
	type LatexExpression
} from '../Utils/message-composer'
import { generateWAMessageFromContent } from '../Utils/messages'
import type { SocketConfig } from '../Types'

export type SendMessageFn = (
	jid: string,
	content: AnyMessageContent,
	options?: MiscMessageGenerationOptions
) => Promise<WAMessage | undefined>

export interface RichMessageSocket {
	sendTable(
		jid: string,
		title: string,
		headers: string[],
		rows: string[][],
		options?: { quoted?: WAMessage; headerText?: string; footer?: string } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	sendList(
		jid: string,
		title: string,
		items: string[] | string[][],
		options?: { quoted?: WAMessage; headerText?: string; footer?: string } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	sendCodeBlock(
		jid: string,
		code: string,
		options?: { title?: string; footer?: string; language?: string; quoted?: WAMessage } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	sendLatex(
		jid: string,
		expressions: LatexExpression[],
		options?: { text?: string; headerText?: string; footer?: string; quoted?: WAMessage } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	sendLatexImage(
		jid: string,
		expressions: LatexExpression[],
		renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>,
		options?: { text?: string; headerText?: string; footer?: string; quoted?: WAMessage } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	sendLatexInlineImage(
		jid: string,
		expressions: LatexExpression[],
		renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>,
		options?: { text?: string; headerText?: string; footer?: string; quoted?: WAMessage } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	sendRichMessage(
		jid: string,
		submessages: any[],
		options?: { quoted?: WAMessage } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	captureUnifiedResponse(message: WAMessage): ReturnType<typeof captureUnifiedResponse>

	sendUnifiedResponse(
		jid: string,
		captured: NonNullable<ReturnType<typeof captureUnifiedResponse>>,
		options?: { quoted?: WAMessage } & MiscMessageGenerationOptions
	): Promise<WAMessage | undefined>

	sendAlbum(
		jid: string,
		album: Array<({ image: any } | { video: any }) & { caption?: string }>,
		options?: MiscMessageGenerationOptions
	): Promise<WAMessage[] | undefined>
}

export const makeRichMessagesSocket = (sock: any): RichMessageSocket => {
	const { sendMessage, relayMessage, waUploadToServer, authState } = sock

	const relayRichMessage = async (
		jid: string,
		{ message, messageId }: { message: proto.IMessage; messageId: string },
		options: MiscMessageGenerationOptions = {}
	) => {
		const fullMsg = generateWAMessageFromContent(jid, message, {
			userJid: authState.creds.me!.id,
			...options,
			messageId
		})
		await relayMessage(jid, fullMsg.message!, { messageId: fullMsg.key.id! })
		return fullMsg
	}

	return {
		sendTable: async (jid, title, headers, rows, options = {}) => {
			const { quoted, headerText, footer, ...msgOptions } = options as any
			const { message, messageId } = generateTableContent(title, headers, rows, quoted, { headerText, footer })
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		sendList: async (jid, title, items, options = {}) => {
			const { quoted, headerText, footer, ...msgOptions } = options as any
			const { message, messageId } = generateListContent(title, items, quoted, { headerText, footer })
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		sendCodeBlock: async (jid, code, options = {}) => {
			const { quoted, title, footer, language, ...msgOptions } = options as any
			const { message, messageId } = generateCodeBlockContent(code, quoted, { title, footer, language })
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		sendLatex: async (jid, expressions, options = {}) => {
			const { quoted, text, headerText, footer, ...msgOptions } = options as any
			const { message, messageId } = generateLatexContent(quoted, { text, expressions, headerText, footer })
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		sendLatexImage: async (jid, expressions, renderLatexToPng, options = {}) => {
			const { quoted, text, headerText, footer, ...msgOptions } = options as any
			const uploadFn = async (buffer: Buffer, _type: string) => waUploadToServer(buffer, { mediaType: 'image' })
			const { message, messageId } = await generateLatexImageContent(
				quoted,
				{ text, expressions, headerText, footer },
				uploadFn,
				renderLatexToPng
			)
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		sendLatexInlineImage: async (jid, expressions, renderLatexToPng, options = {}) => {
			const { quoted, text, headerText, footer, ...msgOptions } = options as any
			const uploadFn = async (buffer: Buffer, _type: string) => waUploadToServer(buffer, { mediaType: 'image' })
			const { message, messageId } = await generateLatexInlineImageContent(
				quoted,
				{ text, expressions, headerText, footer },
				uploadFn,
				renderLatexToPng
			)
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		sendRichMessage: async (jid, submessages, options = {}) => {
			const { quoted, ...msgOptions } = options as any
			const { message, messageId } = generateRichMessageContent(submessages, quoted)
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		captureUnifiedResponse: (message: WAMessage) => captureUnifiedResponse(message.message!),

		sendUnifiedResponse: async (jid, captured, options = {}) => {
			const { quoted, ...msgOptions } = options as any
			const { message, messageId } = generateUnifiedResponseContent(quoted, captured)
			return relayRichMessage(jid, { message, messageId }, msgOptions)
		},

		sendAlbum: async (jid, album, options = {}) => {
			const { isJidNewsletter } = await import('../WABinary')
			const { generateWAMessage } = await import('../Utils/messages')
			const userJid = authState.creds.me!.id

			const albumMsg = generateWAMessageFromContent(
				jid,
				{
					albumMessage: {
						expectedImageCount: album.filter(i => 'image' in i).length,
						expectedVideoCount: album.filter(i => 'video' in i).length
					}
				},
				{ userJid, ...options }
			)

			await relayMessage(jid, albumMsg.message!, { messageId: albumMsg.key.id! })

			const results: WAMessage[] = []
			for (const media of album) {
				const mediaMsg = await generateWAMessage(jid, media as any, {
					userJid,
					upload: async (encFilePath: any, opts: any) => {
						return waUploadToServer(encFilePath, { ...opts, newsletter: isJidNewsletter(jid) })
					},
					...options
				})

				if (mediaMsg) {
					mediaMsg.message!.messageContextInfo = {
						messageSecret: randomBytes(32),
						messageAssociation: { associationType: 1, parentMessageKey: albumMsg.key }
					}
					await relayMessage(jid, mediaMsg.message!, {
						messageId: mediaMsg.key.id!,
						...options
					})
					results.push(mediaMsg)
				}
			}
			return results
		}
	}
}
