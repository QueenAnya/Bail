import { proto } from '../../WAProto'
import { generateMessageID } from './generics'

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

export const LANGUAGE_KEYWORDS: { [key: string]: Set<string> } = {
	javascript: JS_KEYWORDS,
	typescript: JS_KEYWORDS,
	js: JS_KEYWORDS,
	ts: JS_KEYWORDS,
	python: PYTHON_KEYWORDS,
	py: PYTHON_KEYWORDS
}

export enum CodeHighlightType {
	DEFAULT = 0,
	KEYWORD = 1,
	STR = 2,
	NUMBER = 3,
	METHOD = 4,
	COMMENT = 5
}

export enum RichSubMessageType {
	IMAGE = 3,
	TABLE = 4,
	CODE_BLOCK = 5,
	LATEX = 8
}

export interface CodeBlockToken {
	highlightType: CodeHighlightType
	codeContent: string
}

export interface RichContextInfo {
	stanzaId: string
	participant: string
	quotedMessage: proto.IMessage
}

export interface LatexExpression {
	latexExpression: string
	url?: string
	width?: number
	height?: number
}

export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeBlockToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] || JS_KEYWORDS
	const blocks: CodeBlockToken[] = []
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
			/(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(` + '`(?:[^`\\\\]|\\\\.)*`' + `)|(\\b\\d+(?:\\.\\d+)?\\b)|(\\b[a-zA-Z_$][\\w$]*\\b)|([^\\s\\w$"'` + '`' + `]+)|(\\s+)/g

		let match
		const tokens: CodeBlockToken[] = []

		while ((match = regex.exec(line)) !== null) {
			const val = match[0]
			if (match[1]) tokens.push({ highlightType: CodeHighlightType.COMMENT, codeContent: val })
			else if (match[2] || match[3] || match[4]) tokens.push({ highlightType: CodeHighlightType.STR, codeContent: val })
			else if (match[5]) tokens.push({ highlightType: CodeHighlightType.NUMBER, codeContent: val })
			else if (match[6]) {
				if (keywords.has(val)) tokens.push({ highlightType: CodeHighlightType.KEYWORD, codeContent: val })
				else {
					const after = line.slice(regex.lastIndex).trimStart()
					if (after.startsWith('(')) tokens.push({ highlightType: CodeHighlightType.METHOD, codeContent: val })
					else tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
				}
			} else tokens.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: val })
		}

		if (tokens.length === 0) {
			blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: line + nl })
			continue
		}

		const merged: CodeBlockToken[] = []
		for (const t of tokens) {
			const prev = merged.length > 0 ? merged[merged.length - 1] : undefined
			if (prev && prev.highlightType === t.highlightType) prev.codeContent += t.codeContent
			else merged.push({ ...t })
		}
		if (merged.length > 0) merged[merged.length - 1].codeContent += nl
		blocks.push(...merged)
	}

	return blocks
}

export const buildRichContextInfo = (quoted?: any): proto.IContextInfo | undefined => {
	const ctxInfo: any = {
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
	submessages: any[],
	ctxInfo?: proto.IContextInfo,
	unifiedResponse?: { data: Buffer }
): proto.IMessage => {
	const richResponse: any = { messageType: 1, submessages, contextInfo: ctxInfo }
	if (unifiedResponse) richResponse.unifiedResponse = unifiedResponse
	return { botForwardedMessage: { message: { richResponseMessage: richResponse } } }
}

export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: any,
	options: { headerText?: string; footer?: string } = {}
) => {
	const { footer, headerText } = options
	const tableRows = [{ items: headers, isHeading: true }, ...rows.map(row => ({ items: row.map(String) }))]
	const submessages: any[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateListContent = (
	title: string,
	items: string[] | string[][],
	quoted?: any,
	options: { headerText?: string; footer?: string } = {}
) => {
	const { footer, headerText } = options
	const tableRows = items.map(item => ({ items: Array.isArray(item) ? item.map(String) : [String(item)] }))
	const submessages: any[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateCodeBlockContent = (
	code: string,
	quoted?: any,
	options: { title?: string; footer?: string; language?: string } = {}
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

export const generateLatexContent = (
	quoted?: any,
	options?: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string }
) => {
	const { text, expressions = [], headerText, footer } = options || {}
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
	quoted: any,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []
	if (headerText) submessages.push({ messageType: 2, messageText: headerText })
	const latexExpressions = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const uploadResult = await uploadFn(buffer, 'image')
			return { latexExpression: expr.latexExpression, url: uploadResult.url || uploadResult.directPath, width, height }
		})
	)
	submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions: latexExpressions } })
	if (footer) submessages.push({ messageType: 2, messageText: footer })
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}

export const generateLatexInlineImageContent = async (
	quoted: any,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []
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
		messageId: generateMessageID()
	}
}

export const captureUnifiedResponse = (msg: proto.IMessage) => {
	const botFwd = (msg as any)?.botForwardedMessage?.message
	if (!botFwd) return null
	const rich = botFwd.richResponseMessage
	if (!rich?.unifiedResponse?.data) return null
	return {
		unifiedResponse: { data: rich.unifiedResponse.data as Buffer },
		submessages: rich.submessages || [],
		contextInfo: rich.contextInfo || {}
	}
}

export const generateUnifiedResponseContent = (
	quoted: any,
	captured: { submessages: any[]; unifiedResponse: { data: Buffer } }
) => {
	return {
		message: buildBotForwardedMessage(captured.submessages, buildRichContextInfo(quoted), captured.unifiedResponse),
		messageId: generateMessageID()
	}
}

export const generateRichMessageContent = (submessages: any[], quoted?: any) => {
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted)),
		messageId: generateMessageID()
	}
}
