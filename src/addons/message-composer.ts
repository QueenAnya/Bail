/**
 * message-composer.ts (addons)
 * Rich message builders for Meta AI / Bot botForwardedMessage payloads.
 * Ported from WhiskeySockets/Baileys main (April 2026).
 */

import type { proto } from '../../WAProto/index.js'
import { generateMessageID } from '../Utils/generics'

// ── Keyword sets ──────────────────────────────────────────────────────────────

export const JS_KEYWORDS = new Set([
	'import',
	'export',
	'from',
	'default',
	'as',
	'const',
	'let',
	'var',
	'function',
	'class',
	'extends',
	'new',
	'return',
	'if',
	'else',
	'for',
	'while',
	'do',
	'switch',
	'case',
	'break',
	'continue',
	'try',
	'catch',
	'finally',
	'throw',
	'async',
	'await',
	'yield',
	'typeof',
	'instanceof',
	'in',
	'of',
	'delete',
	'void',
	'true',
	'false',
	'null',
	'undefined',
	'NaN',
	'Infinity',
	'this',
	'super',
	'static',
	'get',
	'set',
	'debugger',
	'with'
])

export const PYTHON_KEYWORDS = new Set([
	'import',
	'from',
	'as',
	'def',
	'class',
	'return',
	'if',
	'elif',
	'else',
	'for',
	'while',
	'break',
	'continue',
	'try',
	'except',
	'finally',
	'raise',
	'with',
	'yield',
	'lambda',
	'pass',
	'del',
	'global',
	'nonlocal',
	'assert',
	'True',
	'False',
	'None',
	'and',
	'or',
	'not',
	'in',
	'is',
	'async',
	'await',
	'self',
	'print'
])

export const LANGUAGE_KEYWORDS: Record<string, Set<string>> = {
	javascript: JS_KEYWORDS,
	typescript: JS_KEYWORDS,
	js: JS_KEYWORDS,
	ts: JS_KEYWORDS,
	python: PYTHON_KEYWORDS,
	py: PYTHON_KEYWORDS
}

// ── Enums ─────────────────────────────────────────────────────────────────────

export enum CodeHighlightType {
	DEFAULT = 0,
	KEYWORD = 1,
	METHOD = 2,
	STRING = 3,
	NUMBER = 4,
	COMMENT = 5
}

export enum RichSubMessageType {
	UNKNOWN = 0,
	GRID_IMAGE = 1,
	TEXT = 2,
	INLINE_IMAGE = 3,
	TABLE = 4,
	CODE = 5,
	DYNAMIC = 6,
	MAP = 7,
	LATEX = 8,
	CONTENT_ITEMS = 9
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type CodeToken = { highlightType: CodeHighlightType; codeContent: string }

export type LatexExpression = {
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

export type RichSubMessage = {
	messageType: RichSubMessageType | number
	messageText?: string
	tableMetadata?: { title: string; rows: Array<{ items: string[]; isHeading?: boolean }> }
	codeMetadata?: { codeLanguage: string; codeBlocks: CodeToken[] }
	latexMetadata?: { text: string; expressions: LatexExpression[] }
	imageMetadata?: {
		imageUrl: { imagePreviewUrl: string; imageHighResUrl: string }
		imageText?: string
		alignment?: number
	}
}

export type RichMessageContent = { message: proto.IMessage; messageId: string }

export type CapturedUnifiedResponse = {
	unifiedResponse: { data: Buffer | Uint8Array }
	submessages: RichSubMessage[]
	contextInfo: Record<string, unknown>
}

type QuotedMsg = { key?: proto.IMessageKey; message?: proto.IMessage | null; sender?: string } | undefined

// ── Tokenizer ─────────────────────────────────────────────────────────────────

export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] || JS_KEYWORDS
	const blocks: CodeToken[] = []
	const lines = codeStr.split('\n')

	for (let li = 0; li < lines.length; li++) {
		const line = lines[li] as string
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

		const regex = new RegExp(
			[
				'(\\/\\/.*$|#.*$)',
				'("(?:[^"\\\\]|\\\\.)*")',
				"('(?:[^'\\\\]|\\\\.)*')",
				'(`(?:[^`\\\\]|\\\\.)*`)',
				'(\\b\\d+(?:\\.\\d+)?\\b)',
				'(\\b[a-zA-Z_$][\\w$]*\\b)',
				'([^\\s\\w$"\'`]+)',
				'(\\s+)'
			].join('|'),
			'g'
		)

		let match: RegExpExecArray | null
		const tokens: CodeToken[] = []

		while ((match = regex.exec(line)) !== null) {
			const val = match[0]
			if (match[1]) {
				tokens.push({ highlightType: CodeHighlightType.COMMENT, codeContent: val })
			} else if (match[2] || match[3] || match[4]) {
				tokens.push({ highlightType: CodeHighlightType.STRING, codeContent: val })
			} else if (match[5]) {
				tokens.push({ highlightType: CodeHighlightType.NUMBER, codeContent: val })
			} else if (match[6]) {
				if (keywords.has(val)) {
					tokens.push({ highlightType: CodeHighlightType.KEYWORD, codeContent: val })
				} else {
					const after = line.slice(regex.lastIndex).trimStart()
					tokens.push({
						highlightType: after.startsWith('(') ? CodeHighlightType.METHOD : CodeHighlightType.DEFAULT,
						codeContent: val
					})
				}
			} else {
				tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
			}
		}

		if (tokens.length === 0) {
			blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
			continue
		}

		const merged: CodeToken[] = []
		for (const t of tokens) {
			const prev = merged.length > 0 ? merged[merged.length - 1]! : undefined
			if (prev && prev.highlightType === t.highlightType) {
				prev.codeContent += t.codeContent
			} else {
				merged.push({ ...t })
			}
		}
		if (merged.length > 0) merged[merged.length - 1]!.codeContent += nl
		blocks.push(...merged)
	}

	return blocks
}

// ── Context / wrapper helpers ─────────────────────────────────────────────────

export const buildRichContextInfo = (quoted?: QuotedMsg): Record<string, unknown> => {
	const ctxInfo: Record<string, unknown> = {
		forwardingScore: 1,
		isForwarded: true,
		forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
		forwardOrigin: 4
	}
	if (quoted?.key) {
		ctxInfo.stanzaId = quoted.key.id
		ctxInfo.participant = quoted.key.participant || quoted.sender || quoted.key.remoteJid
		ctxInfo.quotedMessage = quoted.message
	}
	return ctxInfo
}

export const buildBotForwardedMessage = (
	submessages: RichSubMessage[],
	contextInfo: Record<string, unknown>,
	unifiedResponse?: { data: Buffer | Uint8Array }
): proto.IMessage => {
	const richResponse: Record<string, unknown> = { messageType: 1, submessages, contextInfo }
	if (unifiedResponse) richResponse.unifiedResponse = unifiedResponse
	return {
		richResponseMessage: richResponse as unknown as proto.IAIRichResponseMessage
	}
}

// ── Generators ────────────────────────────────────────────────────────────────

export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: QuotedMsg,
	options: { headerText?: string; footer?: string } = {}
): RichMessageContent => {
	const { footer, headerText } = options
	const tableRows = [{ items: headers, isHeading: true }, ...rows.map(row => ({ items: row.map(String) }))]
	const submessages: RichSubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateListContent = (
	title: string,
	items: string[] | string[][],
	quoted?: QuotedMsg,
	options: { headerText?: string; footer?: string } = {}
): RichMessageContent => {
	const { footer, headerText } = options
	const tableRows = items.map(item => ({ items: Array.isArray(item) ? item.map(String) : [String(item)] }))
	const submessages: RichSubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateCodeBlockContent = (
	code: string,
	quoted?: QuotedMsg,
	options: { title?: string; footer?: string; language?: string } = {}
): RichMessageContent => {
	const { title, footer, language = 'javascript' } = options
	const submessages: RichSubMessage[] = []
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

export const generateLatexContent = (
	quoted: QuotedMsg,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string }
): RichMessageContent => {
	const { text, expressions, headerText, footer } = options
	const submessages: RichSubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	const latexExpressions: LatexExpression[] = expressions.map(expr => {
		const entry: LatexExpression = {
			latexExpression: expr.latexExpression,
			url: expr.url,
			width: expr.width,
			height: expr.height
		}
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
	quoted: QuotedMsg,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<RichMessageContent> => {
	const { text, expressions, headerText, footer } = options
	const submessages: RichSubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	const latexExpressions = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const res = await uploadFn(buffer, 'image')
			return { latexExpression: expr.latexExpression, url: res.url || res.directPath, width, height }
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
	quoted: QuotedMsg,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<RichMessageContent> => {
	const { text, expressions, headerText, footer } = options
	const submessages: RichSubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	if (text) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: text })
	for (const expr of expressions) {
		const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
		const res = await uploadFn(buffer, 'image')
		const imageUrl = res.url || res.directPath || ''
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

export const captureUnifiedResponse = (msg: proto.IMessage | null | undefined): CapturedUnifiedResponse | null => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const botFwd = (msg as any)?.botForwardedMessage?.message
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
	quoted: QuotedMsg,
	captured: CapturedUnifiedResponse
): RichMessageContent => ({
	message: buildBotForwardedMessage(captured.submessages, buildRichContextInfo(quoted), captured.unifiedResponse),
	messageId: generateMessageID()
})

export const generateRichMessageContent = (submessages: RichSubMessage[], quoted?: QuotedMsg): RichMessageContent => ({
	message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
	messageId: generateMessageID()
})
