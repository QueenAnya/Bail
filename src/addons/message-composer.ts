/**
 * message-composer.ts
 * Ported from @innovatorssoft/baileys
 * Builders for Meta AI–style rich response messages:
 *   - Tables, Lists, Code blocks (with syntax highlighting), LaTeX, Unified responses
 */

import { generateMessageIDV2 } from '../Utils/generics.js'
import type { proto } from '../../WAProto/index.js'

// ── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_BOT_JID = '867051314767696@bot'

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

// ── Types ─────────────────────────────────────────────────────────────────────

type CodeToken = {
	highlightType: number
	codeContent: string
}

type LatexExpression = {
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

type Submessage = Record<string, unknown>

type RichContextInfo = {
	forwardingScore: number
	isForwarded: boolean
	forwardedAiBotMessageInfo: { botJid: string }
	forwardOrigin: number
	stanzaId?: string
	participant?: string
	quotedMessage?: proto.IMessage
}

type UploadFn = (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>
type RenderLatexFn = (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>

export type CapturedUnifiedResponse = {
	unifiedResponse: { data: unknown }
	submessages: Submessage[]
	contextInfo: Record<string, unknown>
}

// ── Tokenizer ─────────────────────────────────────────────────────────────────

export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] || JS_KEYWORDS
	const blocks: CodeToken[] = []
	const lines = codeStr.split('\n')

	for (let li = 0; li < lines.length; li++) {
		const line = lines[li]
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
			const prev = merged.length > 0 ? merged[merged.length - 1] : undefined
			if (prev && prev.highlightType === t.highlightType) {
				prev.codeContent += t.codeContent
			} else {
				merged.push({ ...t })
			}
		}

		if (merged.length > 0) {
			merged[merged.length - 1].codeContent += nl
		}

		blocks.push(...merged)
	}

	return blocks
}

// ── Context / wrapper helpers ─────────────────────────────────────────────────

export const buildRichContextInfo = (
	quoted?: { key?: proto.IMessageKey; message?: proto.IMessage; sender?: string } | null,
	botJid = DEFAULT_BOT_JID
): RichContextInfo => {
	const ctxInfo: RichContextInfo = {
		forwardingScore: 1,
		isForwarded: true,
		forwardedAiBotMessageInfo: { botJid },
		forwardOrigin: 4
	}

	if (quoted?.key) {
		ctxInfo.stanzaId = quoted.key.id ?? undefined
		ctxInfo.participant = quoted.key.participant || (quoted as any).sender || quoted.key.remoteJid || undefined
		ctxInfo.quotedMessage = quoted.message ?? undefined
	}

	return ctxInfo
}

export const buildBotForwardedMessage = (
	submessages: Submessage[],
	contextInfo: RichContextInfo,
	unifiedResponse?: CapturedUnifiedResponse['unifiedResponse']
) => {
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

// ── Generators ────────────────────────────────────────────────────────────────

export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: Parameters<typeof buildRichContextInfo>[0],
	options: { headerText?: string; footer?: string } = {}
) => {
	const { footer, headerText } = options
	const tableRows = [{ items: headers, isHeading: true }, ...rows.map(row => ({ items: row.map(String) }))]

	const submessages: Submessage[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })

	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageIDV2()
	}
}

export const generateListContent = (
	title: string,
	items: (string | string[])[],
	quoted?: Parameters<typeof buildRichContextInfo>[0],
	options: { headerText?: string; footer?: string } = {}
) => {
	const { footer, headerText } = options
	const tableRows = items.map(item => ({
		items: Array.isArray(item) ? item.map(String) : [String(item)]
	}))

	const submessages: Submessage[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })

	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageIDV2()
	}
}

export const generateCodeBlockContent = (
	code: string,
	quoted?: Parameters<typeof buildRichContextInfo>[0],
	options: { title?: string; language?: string; footer?: string } = {}
) => {
	const { title, footer, language = 'javascript' } = options
	const submessages: Submessage[] = []

	if (title) submessages.push({ messageType: 2, messageText: title })
	submessages.push({
		messageType: 5,
		codeMetadata: {
			codeLanguage: language,
			codeBlocks: tokenizeCode(code, language)
		}
	})
	if (footer) submessages.push({ messageType: 2, messageText: footer })

	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageIDV2()
	}
}

export const generateLatexContent = (
	quoted: Parameters<typeof buildRichContextInfo>[0] | null,
	options: {
		text?: string
		expressions: LatexExpression[]
		headerText?: string
		footer?: string
	}
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: Submessage[] = []

	if (headerText) submessages.push({ messageType: 2, messageText: headerText })

	const latexExpressions = expressions.map(expr => {
		const entry: Record<string, unknown> = {
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

	submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions: latexExpressions } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })

	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageIDV2()
	}
}

export const generateLatexImageContent = async (
	quoted: Parameters<typeof buildRichContextInfo>[0] | null,
	options: {
		text?: string
		expressions: LatexExpression[]
		headerText?: string
		footer?: string
	},
	uploadFn: UploadFn,
	renderLatexToPng: RenderLatexFn
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: Submessage[] = []

	if (headerText) submessages.push({ messageType: 2, messageText: headerText })

	const latexExpressions = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const uploadResult = await uploadFn(buffer, 'image')
			const imageUrl = uploadResult.url || uploadResult.directPath
			return { latexExpression: expr.latexExpression, url: imageUrl, width, height }
		})
	)

	submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions: latexExpressions } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })

	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageIDV2()
	}
}

export const generateLatexInlineImageContent = async (
	quoted: Parameters<typeof buildRichContextInfo>[0] | null,
	options: {
		text?: string
		expressions: LatexExpression[]
		headerText?: string
		footer?: string
	},
	uploadFn: UploadFn,
	renderLatexToPng: RenderLatexFn
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: Submessage[] = []

	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	if (text) submessages.push({ messageType: 2, messageText: text })

	for (const expr of expressions) {
		const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
		const uploadResult = await uploadFn(buffer, 'image')
		const imageUrl = uploadResult.url || uploadResult.directPath
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
		messageId: generateMessageIDV2()
	}
}

/**
 * Capture the unifiedResponse payload from an incoming Meta AI botForwardedMessage.
 * Returns null if the message is not a rich response.
 */
export const captureUnifiedResponse = (msg: proto.IMessage): CapturedUnifiedResponse | null => {
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
	quoted: Parameters<typeof buildRichContextInfo>[0] | null,
	captured: CapturedUnifiedResponse
) => {
	return {
		message: buildBotForwardedMessage(captured.submessages, buildRichContextInfo(quoted), captured.unifiedResponse),
		messageId: generateMessageIDV2()
	}
}

/**
 * Build a fully custom rich message from an arbitrary submessages array.
 */
export const generateRichMessageContent = (
	submessages: Submessage[],
	quoted?: Parameters<typeof buildRichContextInfo>[0]
) => {
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageIDV2()
	}
}
