/**
 * Rich Message Composer — table/code/latex/list builders
 * Source: @innovatorssoft/baileys message-composer.js
 */
import { proto } from '../../WAProto/index.js'
import { generateMessageID } from '../Utils/generics.js'
import { CodeHighlightType, RichSubMessageType, LANGUAGE_KEYWORDS } from './rich-types.js'

export type { CodeHighlightType, RichSubMessageType }
export type RichLatexExpression = {
	latexExpression: string
	url?: string
	width?: number
	height?: number
	fontHeight?: number
	imageTopPadding?: number
	imageLeadingPadding?: number
	imageBottomPadding?: number
	imageTrailingPadding?: number
}
export type RichTableOptions = { headerText?: string; footer?: string }
export type RichCodeOptions = { title?: string; language?: string; footer?: string }
export type RichLatexOptions = {
	text?: string
	expressions: RichLatexExpression[]
	headerText?: string
	footer?: string
}
export type WAMessageLike = { key?: proto.IMessageKey; message?: proto.IMessage | null; sender?: string }

export const buildRichContextInfo = (quoted?: WAMessageLike | null): proto.IContextInfo => {
	const ctxInfo: proto.IContextInfo = {
		forwardingScore: 1,
		isForwarded: true,
		forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
		forwardOrigin: 4 as any
	}
	if (quoted?.key) {
		ctxInfo.stanzaId = quoted.key.id
		ctxInfo.participant = quoted.key.participant || (quoted as any).sender || quoted.key.remoteJid
		ctxInfo.quotedMessage = quoted.message
	}
	return ctxInfo
}

export const buildBotForwardedMessage = (
	submessages: any[],
	contextInfo: proto.IContextInfo,
	unifiedResponse?: any
): proto.IMessage => ({
	botForwardedMessage: {
		message: {
			richResponseMessage: {
				messageType: 1,
				submessages,
				contextInfo,
				...(unifiedResponse ? { unifiedResponse } : {})
			} as any
		}
	}
})

const sub = (messageType: number, rest: Record<string, any>) => ({ messageType, ...rest })

export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: WAMessageLike | null,
	options: RichTableOptions = {}
) => {
	const tableRows = [{ items: headers, isHeading: true }, ...rows.map(r => ({ items: r }))]
	const subs: any[] = []
	if (options.headerText) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.headerText }))
	subs.push(sub(RichSubMessageType.TABLE, { tableMetadata: { title, rows: tableRows } }))
	if (options.footer) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.footer }))
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

export const generateListContent = (
	title: string,
	items: string[] | string[][],
	quoted?: WAMessageLike | null,
	options: RichTableOptions = {}
) => {
	const tableRows = (items as any[]).map(i => ({ items: Array.isArray(i) ? i : [String(i)] }))
	const subs: any[] = []
	if (options.headerText) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.headerText }))
	subs.push(sub(RichSubMessageType.TABLE, { tableMetadata: { title, rows: tableRows } }))
	if (options.footer) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.footer }))
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

export const generateCodeBlockContent = (
	code: string,
	quoted?: WAMessageLike | null,
	options: RichCodeOptions = {}
) => {
	const { title, footer, language = 'javascript' } = options
	const keywords = LANGUAGE_KEYWORDS[language] || new Set<string>()
	const codeBlocks = tokenizeCode(code, keywords)
	const subs: any[] = []
	if (title) subs.push(sub(RichSubMessageType.TEXT, { messageText: title }))
	subs.push(sub(RichSubMessageType.CODE, { codeMetadata: { codeLanguage: language, codeBlocks } }))
	if (footer) subs.push(sub(RichSubMessageType.TEXT, { messageText: footer }))
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

const tokenizeCode = (code: string, keywords: Set<string>) => {
	const blocks: { highlightType: number; codeContent: string }[] = []
	const lines = code.split('\n')
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]!
		const nl = i === lines.length - 1 ? '' : '\n'
		if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
			blocks.push({ highlightType: CodeHighlightType.COMMENT, codeContent: line + nl })
			continue
		}
		const regex =
			/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([a-zA-Z_$][\w$]*(?=\s*\())|([a-zA-Z_$][\w$]*)|([^\s\w$"']+|\s+)/g
		let match: RegExpExecArray | null
		const tokens: { highlightType: number; codeContent: string }[] = []
		while ((match = regex.exec(line)) !== null) {
			if (match[1]) tokens.push({ highlightType: CodeHighlightType.STRING, codeContent: match[1] })
			else if (match[2]) tokens.push({ highlightType: CodeHighlightType.NUMBER, codeContent: match[2] })
			else if (match[3])
				tokens.push({
					highlightType: keywords.has(match[3]) ? CodeHighlightType.KEYWORD : CodeHighlightType.METHOD,
					codeContent: match[3]
				})
			else if (match[4])
				tokens.push({
					highlightType: keywords.has(match[4]) ? CodeHighlightType.KEYWORD : CodeHighlightType.DEFAULT,
					codeContent: match[4]
				})
			else tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: match[0] })
		}
		if (tokens.length > 0) tokens[tokens.length - 1]!.codeContent += nl
		else blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
		blocks.push(...tokens)
	}
	return blocks
}

export const generateLatexContent = (quoted: WAMessageLike | null | undefined, options: RichLatexOptions) => {
	const subs: any[] = []
	if (options.headerText) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.headerText }))
	subs.push(
		sub(RichSubMessageType.LATEX, {
			latexMetadata: {
				text: options.text || '',
				expressions: options.expressions.map(e => ({
					latexExpression: e.latexExpression,
					url: e.url,
					width: e.width,
					height: e.height
				}))
			}
		})
	)
	if (options.footer) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.footer }))
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

export const generateLatexImageContent = async (
	quoted: WAMessageLike | null | undefined,
	options: RichLatexOptions,
	uploadFn: (buf: Buffer, t: string) => Promise<{ url?: string; directPath?: string }>,
	renderFn: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const expressions = await Promise.all(
		options.expressions.map(async e => {
			const { buffer, width, height } = await renderFn(e.latexExpression)
			const r = await uploadFn(buffer, 'image')
			return { latexExpression: e.latexExpression, url: r.url || r.directPath, width, height }
		})
	)
	const subs: any[] = []
	if (options.headerText) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.headerText }))
	subs.push(sub(RichSubMessageType.LATEX, { latexMetadata: { text: options.text || '', expressions } }))
	if (options.footer) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.footer }))
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

export const generateLatexInlineImageContent = async (
	quoted: WAMessageLike | null | undefined,
	options: RichLatexOptions,
	uploadFn: (buf: Buffer, t: string) => Promise<{ url?: string; directPath?: string }>,
	renderFn: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const subs: any[] = []
	if (options.headerText) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.headerText }))
	if (options.text) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.text }))
	for (const e of options.expressions) {
		const { buffer, width, height } = await renderFn(e.latexExpression)
		const r = await uploadFn(buffer, 'image')
		const url = r.url || r.directPath
		subs.push(
			sub(RichSubMessageType.INLINE_IMAGE, {
				imageMetadata: {
					imageUrl: { imagePreviewUrl: url, imageHighResUrl: url },
					imageText: e.latexExpression,
					alignment: 2
				}
			})
		)
	}
	if (options.footer) subs.push(sub(RichSubMessageType.TEXT, { messageText: options.footer }))
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

export const captureUnifiedResponse = (msg: proto.IMessage | null | undefined) => {
	const rich = msg?.botForwardedMessage?.message?.richResponseMessage as any
	if (!rich?.unifiedResponse?.data) return null
	return {
		unifiedResponse: { data: rich.unifiedResponse.data },
		submessages: rich.submessages || [],
		contextInfo: rich.contextInfo || {}
	}
}

export const generateUnifiedResponseContent = (
	quoted: WAMessageLike | null | undefined,
	captured: ReturnType<typeof captureUnifiedResponse>
) => {
	if (!captured) throw new Error('captured is null — use captureUnifiedResponse() first')
	return {
		message: buildBotForwardedMessage(captured.submessages, buildRichContextInfo(quoted), captured.unifiedResponse),
		messageId: generateMessageID()
	}
}

export const generateRichMessageContent = (submessages: any[], quoted?: WAMessageLike | null) => ({
	message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
	messageId: generateMessageID()
})
