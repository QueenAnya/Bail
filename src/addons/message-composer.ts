/**
 * Message Composer — Rich Response / Meta AI Messages
 * Tables, Code Blocks, LaTeX, Inline Images, Unified Responses
 * Part of innovatorssoft/baileys addons
 */

import { generateMessageID } from '../Utils/generics'
import type { WAMessage } from '../Types'

// ── Enums ──────────────────────────────────────────────────────────────────

export const CodeHighlightType = {
	DEFAULT: 0,
	KEYWORD: 1,
	METHOD: 2,
	STRING: 3,
	NUMBER: 4,
	COMMENT: 5
} as const

export const RichSubMessageType = {
	UNKNOWN: 0,
	GRID_IMAGE: 1,
	TEXT: 2,
	INLINE_IMAGE: 3,
	TABLE: 4,
	CODE: 5,
	DYNAMIC: 6,
	MAP: 7,
	LATEX: 8,
	CONTENT_ITEMS: 9
} as const

// ── Code Tokenizer ────────────────────────────────────────────────────────

const JS_KEYWORDS = new Set([
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
	'set'
])
const PYTHON_KEYWORDS = new Set([
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
const LANGUAGE_KEYWORDS: Record<string, Set<string>> = {
	javascript: JS_KEYWORDS,
	typescript: JS_KEYWORDS,
	js: JS_KEYWORDS,
	ts: JS_KEYWORDS,
	python: PYTHON_KEYWORDS,
	py: PYTHON_KEYWORDS
}

interface CodeToken {
	highlightType: number
	codeContent: string
}

export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] || JS_KEYWORDS
	const blocks: CodeToken[] = []
	const lines = codeStr.split('\n')

	for (let li = 0; li < lines.length; li++) {
		const line = lines[li]!
		const nl = li < lines.length - 1 ? '\n' : ''
		if (!line.trim()) {
			blocks.push({ highlightType: 0, codeContent: line + nl })
			continue
		}
		if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
			blocks.push({ highlightType: 5, codeContent: line + nl })
			continue
		}

		const regex =
			/(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_$][\w$]*\b)|([^\s\w$"'`]+)|(\s+)/g
		let match: RegExpExecArray | null
		const tokens: CodeToken[] = []

		while ((match = regex.exec(line)) !== null) {
			const val = match[0]
			if (match[1]) tokens.push({ highlightType: 5, codeContent: val })
			else if (match[2] || match[3] || match[4]) tokens.push({ highlightType: 3, codeContent: val })
			else if (match[5]) tokens.push({ highlightType: 4, codeContent: val })
			else if (match[6]) {
				if (keywords.has(val)) tokens.push({ highlightType: 1, codeContent: val })
				else if (line.slice(regex.lastIndex).trimStart().startsWith('('))
					tokens.push({ highlightType: 2, codeContent: val })
				else tokens.push({ highlightType: 0, codeContent: val })
			} else tokens.push({ highlightType: 0, codeContent: val })
		}

		const merged: CodeToken[] = []
		for (const t of tokens) {
			const prev = merged[merged.length - 1]
			if (prev && prev.highlightType === t.highlightType) prev.codeContent += t.codeContent
			else merged.push({ ...t })
		}
		if (merged.length > 0) merged[merged.length - 1]!.codeContent += nl
		blocks.push(...(merged.length ? merged : [{ highlightType: 0, codeContent: line + nl }]))
	}
	return blocks
}

// ── Context / Wrapper ─────────────────────────────────────────────────────

export const buildRichContextInfo = (quoted: WAMessage | null | undefined) => {
	const ctxInfo: Record<string, any> = {
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

export const buildBotForwardedMessage = (submessages: any[], contextInfo: any, unifiedResponse?: any) => {
	const richResponse: any = { messageType: 1, submessages, contextInfo }
	if (unifiedResponse) richResponse.unifiedResponse = unifiedResponse
	return { botForwardedMessage: { message: { richResponseMessage: richResponse } } }
}

// ── Generators ────────────────────────────────────────────────────────────

export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: WAMessage | null,
	options: { headerText?: string; footer?: string } = {}
) => {
	const submessages: any[] = []
	if (options.headerText) submessages.push({ messageType: 2, messageText: options.headerText })
	submessages.push({
		messageType: 4,
		tableMetadata: { title, rows: [{ items: headers, isHeading: true }, ...rows.map(r => ({ items: r.map(String) }))] }
	})
	if (options.footer) submessages.push({ messageType: 2, messageText: options.footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateListContent = (
	title: string,
	items: Array<string | string[]>,
	quoted?: WAMessage | null,
	options: { headerText?: string; footer?: string } = {}
) => {
	const submessages: any[] = []
	if (options.headerText) submessages.push({ messageType: 2, messageText: options.headerText })
	submessages.push({
		messageType: 4,
		tableMetadata: { title, rows: items.map(i => ({ items: Array.isArray(i) ? i.map(String) : [String(i)] })) }
	})
	if (options.footer) submessages.push({ messageType: 2, messageText: options.footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateCodeBlockContent = (
	code: string,
	quoted?: WAMessage | null,
	options: { title?: string; language?: string; footer?: string } = {}
) => {
	const { title, footer, language = 'javascript' } = options
	const submessages: any[] = []
	if (title) submessages.push({ messageType: 2, messageText: title })
	submessages.push({
		messageType: 5,
		codeMetadata: { codeLanguage: language, codeBlocks: tokenizeCode(code, language) }
	})
	if (footer) submessages.push({ messageType: 2, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
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

export const generateLatexContent = (
	quoted: WAMessage | null | undefined,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string }
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateLatexImageContent = async (
	quoted: WAMessage | null | undefined,
	options: { text?: string; expressions: Array<{ latexExpression: string }>; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })

	const rendered = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const upload = await uploadFn(buffer, 'image')
			return { latexExpression: expr.latexExpression, url: upload.url || upload.directPath, width, height }
		})
	)

	submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions: rendered } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateLatexInlineImageContent = async (
	quoted: WAMessage | null | undefined,
	options: { text?: string; expressions: Array<{ latexExpression: string }>; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	if (text) submessages.push({ messageType: 2, messageText: text })

	for (const expr of expressions) {
		const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
		const upload = await uploadFn(buffer, 'image')
		const imageUrl = upload.url || upload.directPath
		submessages.push({
			messageType: 3,
			imageMetadata: {
				imageUrl: { imagePreviewUrl: imageUrl, imageHighResUrl: imageUrl },
				imageText: expr.latexExpression,
				alignment: 2
			}
		})
	}

	if (footer) submessages.push({ messageType: 2, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const captureUnifiedResponse = (msg: any) => {
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
	quoted: WAMessage | null | undefined,
	captured: ReturnType<typeof captureUnifiedResponse>
) => {
	if (!captured) throw new Error('No captured unified response')
	return {
		message: buildBotForwardedMessage(captured.submessages, buildRichContextInfo(quoted), captured.unifiedResponse),
		messageId: generateMessageID()
	}
}

export const generateRichMessageContent = (submessages: any[], quoted?: WAMessage | null) => ({
	message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
	messageId: generateMessageID()
})
