/**
 * Rich Response / Meta AI Message Composer
 * Ported from innovatorssoft/Baileys
 *
 * Provides helpers for:
 *  - sendTable        — rich table (botForwardedMessage → richResponseMessage)
 *  - sendList         — rich single-column list
 *  - sendCodeBlock    — syntax-highlighted code block
 *  - sendLatex        — LaTeX expression (text only)
 *  - sendLatexImage   — LaTeX rendered to uploaded PNG images
 *  - sendLatexInlineImage — LaTeX as inline image blocks
 *  - sendRichMessage  — fully custom submessages array
 *  - captureUnifiedResponse / generateUnifiedResponseContent — Meta AI relay
 */

import { generateMessageID } from '../Utils/generics'
import type { WAMessage } from '../Types'

// ── Language keyword sets ─────────────────────────────────────────────────────

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
	'set',
	'debugger',
	'with'
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

// ── Token/sub-message type enums ─────────────────────────────────────────────

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

export interface CodeToken {
	highlightType: CodeHighlightType
	codeContent: string
}

export interface TableRow {
	items: string[]
	isHeading?: boolean
}

export interface SubMessage {
	messageType: number
	messageText?: string
	tableMetadata?: { title: string; rows: TableRow[] }
	codeMetadata?: { codeLanguage: string; codeBlocks: CodeToken[] }
	latexMetadata?: { text: string; expressions: LatexExpression[] }
	imageMetadata?: {
		imageUrl: { imagePreviewUrl: string; imageHighResUrl: string }
		imageText: string
		alignment: number
	}
	[key: string]: unknown
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

export interface LatexOptions {
	text?: string
	expressions: LatexExpression[]
	headerText?: string
	footer?: string
}

export interface CapturedUnifiedResponse {
	unifiedResponse: { data: unknown }
	submessages: SubMessage[]
	contextInfo: Record<string, unknown>
}

export interface RichMessageResult {
	message: { botForwardedMessage: { message: { richResponseMessage: unknown } } }
	messageId: string
}

// ── Tokenizer ─────────────────────────────────────────────────────────────────

/**
 * Tokenise a code string for syntax highlighting in a richResponseMessage code block.
 */
export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] || JS_KEYWORDS
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
			const val = match[0]!
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
					if (after.startsWith('(')) {
						tokens.push({ highlightType: CodeHighlightType.METHOD, codeContent: val })
					} else {
						tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
					}
				}
			} else {
				tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
			}
		}

		if (tokens.length === 0) {
			blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
			continue
		}

		// Merge adjacent same-type tokens
		const merged: CodeToken[] = []
		for (const t of tokens) {
			const prev = merged.length > 0 ? merged[merged.length - 1]! : undefined
			if (prev && prev.highlightType === t.highlightType) {
				prev.codeContent += t.codeContent
			} else {
				merged.push({ ...t })
			}
		}
		if (merged.length > 0) {
			merged[merged.length - 1]!.codeContent += nl
		}
		blocks.push(...merged)
	}

	return blocks
}

// ── Context / wrapper helpers ─────────────────────────────────────────────────

/**
 * Build a contextInfo object for botForwardedMessage payloads.
 */
export const buildRichContextInfo = (quoted?: WAMessage | null): Record<string, unknown> => {
	const ctxInfo: Record<string, unknown> = {
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

/**
 * Wrap submessages into the botForwardedMessage → richResponseMessage proto structure.
 */
export const buildBotForwardedMessage = (
	submessages: SubMessage[],
	contextInfo: Record<string, unknown>,
	unifiedResponse?: CapturedUnifiedResponse['unifiedResponse']
): RichMessageResult['message'] => {
	const richResponse: Record<string, unknown> = {
		messageType: 1,
		submessages,
		contextInfo
	}

	if (unifiedResponse) {
		richResponse.unifiedResponse = unifiedResponse
	}

	return {
		botForwardedMessage: {
			message: {
				richResponseMessage: richResponse
			}
		}
	}
}

// ── Rich message generators ───────────────────────────────────────────────────

/**
 * Generate a rich table message.
 */
export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: WAMessage | null,
	options: { headerText?: string; footer?: string } = {}
): RichMessageResult => {
	const { footer, headerText } = options
	const tableRows: TableRow[] = [{ items: headers, isHeading: true }, ...rows.map(row => ({ items: row.map(String) }))]

	const submessages: SubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })

	const ctxInfo = buildRichContextInfo(quoted)
	return { message: buildBotForwardedMessage(submessages, ctxInfo), messageId: generateMessageID() }
}

/**
 * Generate a rich list message (single-column table).
 */
export const generateListContent = (
	title: string,
	items: string[] | string[][],
	quoted?: WAMessage | null,
	options: { headerText?: string; footer?: string } = {}
): RichMessageResult => {
	const { footer, headerText } = options
	const tableRows: TableRow[] = items.map(item => ({
		items: Array.isArray(item) ? item.map(String) : [String(item)]
	}))

	const submessages: SubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })

	const ctxInfo = buildRichContextInfo(quoted)
	return { message: buildBotForwardedMessage(submessages, ctxInfo), messageId: generateMessageID() }
}

/**
 * Generate a syntax-highlighted code block message.
 */
export const generateCodeBlockContent = (
	code: string,
	quoted?: WAMessage | null,
	options: { title?: string; language?: string; footer?: string } = {}
): RichMessageResult => {
	const { title, footer, language = 'javascript' } = options

	const submessages: SubMessage[] = []
	if (title) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: title })
	submessages.push({
		messageType: RichSubMessageType.CODE,
		codeMetadata: {
			codeLanguage: language,
			codeBlocks: tokenizeCode(code, language)
		}
	})
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })

	const ctxInfo = buildRichContextInfo(quoted)
	return { message: buildBotForwardedMessage(submessages, ctxInfo), messageId: generateMessageID() }
}

/**
 * Generate a LaTeX expression message (text only, no image rendering).
 */
export const generateLatexContent = (
	quoted: WAMessage | null | undefined,
	options: LatexOptions
): RichMessageResult => {
	const { text, expressions, headerText, footer } = options

	const submessages: SubMessage[] = []
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

	const ctxInfo = buildRichContextInfo(quoted)
	return { message: buildBotForwardedMessage(submessages, ctxInfo), messageId: generateMessageID() }
}

/**
 * Render LaTeX expressions to images, upload them, and build a latex message.
 */
export const generateLatexImageContent = async (
	quoted: WAMessage | null | undefined,
	options: LatexOptions,
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<RichMessageResult> => {
	const { text, expressions, headerText, footer } = options

	const submessages: SubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })

	const latexExpressions = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const uploadResult = await uploadFn(buffer, 'image')
			const imageUrl = uploadResult.url || uploadResult.directPath || ''
			return { latexExpression: expr.latexExpression, url: imageUrl, width, height }
		})
	)

	submessages.push({
		messageType: RichSubMessageType.LATEX,
		latexMetadata: { text: text || '', expressions: latexExpressions }
	})
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })

	const ctxInfo = buildRichContextInfo(quoted)
	return { message: buildBotForwardedMessage(submessages, ctxInfo), messageId: generateMessageID() }
}

/**
 * Render each LaTeX expression as an inline image block.
 */
export const generateLatexInlineImageContent = async (
	quoted: WAMessage | null | undefined,
	options: LatexOptions,
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<RichMessageResult> => {
	const { text, expressions, headerText, footer } = options

	const submessages: SubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	if (text) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: text })

	for (const expr of expressions) {
		const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
		const uploadResult = await uploadFn(buffer, 'image')
		const imageUrl = uploadResult.url || uploadResult.directPath || ''
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

	const ctxInfo = buildRichContextInfo(quoted)
	return { message: buildBotForwardedMessage(submessages, ctxInfo), messageId: generateMessageID() }
}

/**
 * Capture the unifiedResponse payload from an incoming Meta AI botForwardedMessage.
 * Returns null if the message is not a rich response.
 */
export const captureUnifiedResponse = (msg: WAMessage['message']): CapturedUnifiedResponse | null => {
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

/**
 * Re-send a previously captured unified response to a new JID.
 */
export const generateUnifiedResponseContent = (
	quoted: WAMessage | null | undefined,
	captured: CapturedUnifiedResponse
): RichMessageResult => {
	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(captured.submessages, ctxInfo, captured.unifiedResponse),
		messageId: generateMessageID()
	}
}

/**
 * Build a fully custom rich message from an arbitrary submessages array.
 */
export const generateRichMessageContent = (submessages: SubMessage[], quoted?: WAMessage | null): RichMessageResult => {
	const ctxInfo = buildRichContextInfo(quoted)
	return { message: buildBotForwardedMessage(submessages, ctxInfo), messageId: generateMessageID() }
}
