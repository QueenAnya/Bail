/**
 * Rich Message Composer — botForwardedMessage / richResponseMessage builders
 * Source: @innovatorssoft/baileys message-composer.js
 *
 * Provides table, list, code-block, LaTeX, inline-image, and unified-response
 * content builders for Meta AI–style rich responses.
 */
import { proto } from '../../WAProto/index.js'
import { generateMessageID } from '../Utils/generics.js'
import { CodeHighlightType, RichSubMessageType, LANGUAGE_KEYWORDS } from './rich-types.js'

export type { CodeHighlightType, RichSubMessageType }

export type CodeToken = { highlightType: CodeHighlightType; codeContent: string }
export type TableRow = { items: string[]; isHeading?: boolean }

export type RichTableOptions = { headerText?: string; footer?: string }
export type RichCodeOptions = { title?: string; language?: string; footer?: string }
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
export type RichLatexOptions = {
	text?: string
	expressions: RichLatexExpression[]
	headerText?: string
	footer?: string
}

export type WAMessageLike = { key?: proto.IMessageKey; message?: proto.IMessage | null; sender?: string }

// ── Tokenizer ────────────────────────────────────────────────────────────────

export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] || LANGUAGE_KEYWORDS['javascript']
	const blocks: CodeToken[] = []
	const lines = codeStr.split('\n')

	for (let li = 0; li < lines.length; li++) {
		const line = lines[li]!
		const isLast = li === lines.length - 1
		const nl = isLast ? '' : '\n'

		if (!line.trim()) {
			blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
			continue
		}
		if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
			blocks.push({ highlightType: CodeHighlightType.COMMENT, codeContent: line + nl })
			continue
		}

		const regex =
			/(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_$][\w$]*\b)|([^\s\w$"'`]+)|(\s+)/g
		let match: RegExpExecArray | null
		const tokens: CodeToken[] = []

		while ((match = regex.exec(line)) !== null) {
			const val = match[0]
			if (match[1]) tokens.push({ highlightType: CodeHighlightType.COMMENT, codeContent: val })
			else if (match[2] || match[3] || match[4])
				tokens.push({ highlightType: CodeHighlightType.STRING, codeContent: val })
			else if (match[5]) tokens.push({ highlightType: CodeHighlightType.NUMBER, codeContent: val })
			else if (match[6]) {
				if (keywords?.has(val)) tokens.push({ highlightType: CodeHighlightType.KEYWORD, codeContent: val })
				else {
					const after = line.slice(regex.lastIndex).trimStart()
					tokens.push({
						highlightType: after.startsWith('(') ? CodeHighlightType.METHOD : CodeHighlightType.DEFAULT,
						codeContent: val
					})
				}
			} else tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
		}

		if (tokens.length === 0) {
			blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
			continue
		}

		const merged: CodeToken[] = []
		for (const t of tokens) {
			const prev = merged.length > 0 ? merged[merged.length - 1] : undefined
			if (prev && prev.highlightType === t.highlightType) prev.codeContent += t.codeContent
			else merged.push({ ...t })
		}
		if (merged.length > 0) merged[merged.length - 1]!.codeContent += nl
		blocks.push(...merged)
	}

	return blocks
}

// ── Context / wrapper helpers ─────────────────────────────────────────────────

export const buildRichContextInfo = (quoted?: WAMessageLike | null) => {
	const ctxInfo: proto.IContextInfo = {
		forwardingScore: 1,
		isForwarded: true,
		forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
		forwardOrigin: 4
	}
	if (quoted?.key) {
		ctxInfo.stanzaId = quoted.key.id
		ctxInfo.participant = quoted.key.participant || (quoted as any).sender || quoted.key.remoteJid
		ctxInfo.quotedMessage = quoted.message
	}
	return ctxInfo
}

export const buildBotForwardedMessage = (
	submessages: proto.IAIRichResponseMessage['submessages'],
	contextInfo: proto.IContextInfo,
	unifiedResponse?: proto.IAIRichResponseMessage['unifiedResponse']
): proto.IMessage => {
	const richResponse: proto.IAIRichResponseMessage = { messageType: 1, submessages, contextInfo }
	if (unifiedResponse) richResponse.unifiedResponse = unifiedResponse
	return { botForwardedMessage: { message: { richResponseMessage: richResponse } } }
}

// ── Content Generators ───────────────────────────────────────────────────────

export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: WAMessageLike | null,
	options: RichTableOptions = {}
) => {
	const tableRows: proto.IAITableMetadata['rows'] = [
		{ items: headers, isHeading: true },
		...rows.map(row => ({ items: row.map(String) }))
	]
	const submessages: proto.IAIRichResponseMessage['submessages'] = []
	if (options.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateListContent = (
	title: string,
	items: string[] | string[][],
	quoted?: WAMessageLike | null,
	options: RichTableOptions = {}
) => {
	const tableRows = items.map(item => ({ items: Array.isArray(item) ? item.map(String) : [String(item)] }))
	const submessages: proto.IAIRichResponseMessage['submessages'] = []
	if (options.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateCodeBlockContent = (
	code: string,
	quoted?: WAMessageLike | null,
	options: RichCodeOptions = {}
) => {
	const { title, footer, language = 'javascript' } = options
	const submessages: proto.IAIRichResponseMessage['submessages'] = []
	if (title) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: title })
	submessages.push({
		messageType: RichSubMessageType.CODE,
		codeMetadata: { codeLanguage: language, codeBlocks: tokenizeCode(code, language) }
	})
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateLatexContent = (quoted: WAMessageLike | null | undefined, options: RichLatexOptions) => {
	const { text, expressions, headerText, footer } = options
	const submessages: proto.IAIRichResponseMessage['submessages'] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	const latexExpressions = expressions.map(expr => {
		const entry: any = { latexExpression: expr.latexExpression, url: expr.url, width: expr.width, height: expr.height }
		if (expr.fontHeight !== undefined) entry.fontHeight = expr.fontHeight
		if (expr.imageTopPadding !== undefined) entry.imageTopPadding = expr.imageTopPadding
		if (expr.imageLeadingPadding !== undefined) entry.imageLeadingPadding = expr.imageLeadingPadding
		if (expr.imageBottomPadding !== undefined) entry.imageBottomPadding = expr.imageBottomPadding
		if (expr.imageTrailingPadding !== undefined) entry.imageTrailingPadding = expr.imageTrailingPadding
		return entry
	})
	submessages.push({
		messageType: RichSubMessageType.LATEX,
		latexMetadata: { text: text || '', expressions: latexExpressions }
	})
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateLatexImageContent = async (
	quoted: WAMessageLike | null | undefined,
	options: RichLatexOptions,
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: proto.IAIRichResponseMessage['submessages'] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	const latexExpressions = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const uploadResult = await uploadFn(buffer, 'image')
			return { latexExpression: expr.latexExpression, url: uploadResult.url || uploadResult.directPath, width, height }
		})
	)
	submessages.push({
		messageType: RichSubMessageType.LATEX,
		latexMetadata: { text: text || '', expressions: latexExpressions }
	})
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateLatexInlineImageContent = async (
	quoted: WAMessageLike | null | undefined,
	options: RichLatexOptions,
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: proto.IAIRichResponseMessage['submessages'] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	if (text) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: text })
	for (const expr of expressions) {
		const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
		const uploadResult = await uploadFn(buffer, 'image')
		const imageUrl = uploadResult.url || uploadResult.directPath
		submessages.push({
			messageType: RichSubMessageType.INLINE_IMAGE,
			imageMetadata: {
				imageUrl: { imagePreviewUrl: imageUrl, imageHighResUrl: imageUrl },
				imageText: expr.latexExpression,
				alignment: 2
			}
		})
	}
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const captureUnifiedResponse = (msg: proto.IMessage | null | undefined) => {
	const botFwd = msg?.botForwardedMessage?.message
	if (!botFwd) return null
	const rich = botFwd.richResponseMessage
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

export const generateRichMessageContent = (
	submessages: proto.IAIRichResponseMessage['submessages'],
	quoted?: WAMessageLike | null
) => ({
	message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
	messageId: generateMessageID()
})
