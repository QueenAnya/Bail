/**
 * Rich Message Composer
 *
 * Provides strongly-typed helpers for building WhatsApp AI/bot-style rich messages:
 *  — Tables, code blocks (with syntax highlighting), LaTeX expressions,
 *    inline images, lists, and arbitrary sub-message arrays.
 *  — Wraps everything in the botForwardedMessage → richResponseMessage proto.
 *
 * Source: @innovatorssoft/baileys (message-composer.js) — best tokenizer,
 * most complete, cleanest API.
 */

import { proto } from '../../WAProto/index.js'
import { generateMessageID } from '../Utils/generics.js'

// ─── Language keywords (for syntax highlighting) ─────────────────────────────

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

// ─── Enums ────────────────────────────────────────────────────────────────────

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

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface CodeBlockToken {
	highlightType: CodeHighlightType
	codeContent: string
}

export interface LatexExpression {
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

export interface RichContextInfo {
	stanzaId?: string
	participant?: string
	quotedMessage?: proto.IMessage
}

// ─── Tokenizer ────────────────────────────────────────────────────────────────

/** Tokenize source code into highlight blocks for a code-block sub-message. */
export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeBlockToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] ?? JS_KEYWORDS
	const blocks: CodeBlockToken[] = []
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
		const tokens: CodeBlockToken[] = []

		while ((match = regex.exec(line)) !== null) {
			const val = match[0]!
			if (match[1]) tokens.push({ highlightType: CodeHighlightType.COMMENT, codeContent: val })
			else if (match[2] || match[3] || match[4])
				tokens.push({ highlightType: CodeHighlightType.STRING, codeContent: val })
			else if (match[5]) tokens.push({ highlightType: CodeHighlightType.NUMBER, codeContent: val })
			else if (match[6]) {
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

		if (!tokens.length) {
			blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
			continue
		}

		// Merge adjacent same-type tokens
		const merged: CodeBlockToken[] = []
		for (const t of tokens) {
			const prev = merged[merged.length - 1]
			if (prev?.highlightType === t.highlightType) {
				prev.codeContent += t.codeContent
			} else merged.push({ ...t })
		}
		if (merged.length) merged[merged.length - 1]!.codeContent += nl
		blocks.push(...merged)
	}
	return blocks
}

// ─── Context / wrapper helpers ────────────────────────────────────────────────

/** Build a contextInfo object for botForwardedMessage payloads. */
export const buildRichContextInfo = (quoted?: any): proto.IContextInfo => {
	const ctxInfo: proto.IContextInfo = {
		forwardingScore: 1,
		isForwarded: true,
		forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
		forwardOrigin: 4
	}
	if (quoted?.key) {
		ctxInfo.stanzaId = quoted.key.id
		ctxInfo.participant = quoted.key.participant ?? quoted.sender ?? quoted.key.remoteJid
		ctxInfo.quotedMessage = quoted.message
	}
	return ctxInfo
}

/** Wrap sub-messages into the botForwardedMessage → richResponseMessage proto structure. */
export const buildBotForwardedMessage = (
	submessages: any[],
	contextInfo?: proto.IContextInfo,
	unifiedResponse?: { data: Buffer }
): proto.IMessage => {
	const richResponse: any = { messageType: 1, submessages, contextInfo }
	if (unifiedResponse) richResponse.unifiedResponse = unifiedResponse
	return { botForwardedMessage: { message: { richResponseMessage: richResponse } } }
}

// ─── Generators ───────────────────────────────────────────────────────────────

/** Generate a rich table message. */
export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: any,
	options?: { headerText?: string; footer?: string }
): { message: proto.IMessage; messageId: string } => {
	const { footer, headerText } = options ?? {}
	const tableRows = [{ items: headers, isHeading: true }, ...rows.map(row => ({ items: row.map(String) }))]
	const subs: any[] = []
	if (headerText) subs.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	subs.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (footer) subs.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

/** Generate a rich list message (rendered as table rows). */
export const generateListContent = (
	title: string,
	items: string[] | string[][],
	quoted?: any,
	options?: { headerText?: string; footer?: string }
): { message: proto.IMessage; messageId: string } => {
	const { footer, headerText } = options ?? {}
	const tableRows = items.map(item => ({ items: Array.isArray(item) ? item.map(String) : [String(item)] }))
	const subs: any[] = []
	if (headerText) subs.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	subs.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (footer) subs.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

/** Generate a rich code-block message with syntax highlighting. */
export const generateCodeBlockContent = (
	code: string,
	quoted?: any,
	options?: { title?: string; language?: string; footer?: string }
): { message: proto.IMessage; messageId: string } => {
	const { title, footer, language = 'javascript' } = options ?? {}
	const subs: any[] = []
	if (title) subs.push({ messageType: RichSubMessageType.TEXT, messageText: title })
	subs.push({
		messageType: RichSubMessageType.CODE,
		codeMetadata: { codeLanguage: language, codeBlocks: tokenizeCode(code, language) }
	})
	if (footer) subs.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

/** Generate a LaTeX expression message (text only, no image upload). */
export const generateLatexContent = (
	quoted?: any,
	options?: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string }
): { message: proto.IMessage; messageId: string } => {
	const { text, expressions = [], headerText, footer } = options ?? {}
	const subs: any[] = []
	if (headerText) subs.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	subs.push({ messageType: RichSubMessageType.LATEX, latexMetadata: { text: text ?? '', expressions } })
	if (footer) subs.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

/** Render LaTeX expressions to images, upload them, and build a latex message. */
export const generateLatexImageContent = async (
	quoted: any,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<{ message: proto.IMessage; messageId: string }> => {
	const { text, expressions = [], headerText, footer } = options
	const subs: any[] = []
	if (headerText) subs.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })

	const resolved = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const res = await uploadFn(buffer, 'image')
			return { latexExpression: expr.latexExpression, url: res.url ?? res.directPath, width, height }
		})
	)

	subs.push({ messageType: RichSubMessageType.LATEX, latexMetadata: { text: text ?? '', expressions: resolved } })
	if (footer) subs.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

/** Render each LaTeX expression as an inline image block. */
export const generateLatexInlineImageContent = async (
	quoted: any,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<{ message: proto.IMessage; messageId: string }> => {
	const { text, expressions = [], headerText, footer } = options
	const subs: any[] = []
	if (headerText) subs.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	if (text) subs.push({ messageType: RichSubMessageType.TEXT, messageText: text })

	for (const expr of expressions) {
		const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
		const res = await uploadFn(buffer, 'image')
		const url = res.url ?? res.directPath
		subs.push({
			messageType: RichSubMessageType.INLINE_IMAGE,
			imageMetadata: {
				imageUrl: { imagePreviewUrl: url, imageHighResUrl: url },
				imageText: expr.latexExpression,
				alignment: 2
			}
		})
	}

	if (footer) subs.push({ messageType: RichSubMessageType.TEXT, messageText: footer })
	return { message: buildBotForwardedMessage(subs, buildRichContextInfo(quoted)), messageId: generateMessageID() }
}

/** Capture the unifiedResponse payload from an incoming Meta AI botForwardedMessage. */
export const captureUnifiedResponse = (msg: proto.IMessage) => {
	const rich = msg?.botForwardedMessage?.message?.richResponseMessage
	if (!rich?.unifiedResponse?.data) return null
	return {
		unifiedResponse: { data: Buffer.from(rich.unifiedResponse.data as Uint8Array) },
		submessages: rich.submessages ?? [],
		contextInfo: rich.contextInfo ?? {}
	}
}

/** Re-send a previously captured unified response to a new JID. */
export const generateUnifiedResponseContent = (
	quoted: any,
	captured: { submessages: any[]; unifiedResponse: { data: Buffer } }
): { message: proto.IMessage; messageId: string } => ({
	message: buildBotForwardedMessage(captured.submessages, buildRichContextInfo(quoted), captured.unifiedResponse),
	messageId: generateMessageID()
})

/** Build a fully custom rich message from an arbitrary sub-messages array. */
export const generateRichMessageContent = (
	submessages: any[],
	quoted?: any
): { message: proto.IMessage; messageId: string } => ({
	message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
	messageId: generateMessageID()
})
