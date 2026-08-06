/**
 * message-composer.ts (addons)
 * Rich message builders for Meta AI / Bot botForwardedMessage payloads.
 * Ported from WhiskeySockets/Baileys main (April 2026).
 */

// Import into local scope AND re-export for consumers
import { CodeHighlightType, RichSubMessageType } from '../Types/RichType'
export { CodeHighlightType, RichSubMessageType }

import type { proto } from '../../WAProto/index.js'
import { generateMessageID } from '../Utils/generics'

// ── Keyword sets ──────────────────────────────────────────────────────────────

// ─── Syntax-highlighting keyword sets (used by addons/rich-message tokenizer) ─

export const CPP_KEYWORDS = new Set([
	'alignas',
	'alignof',
	'and',
	'and_eq',
	'asm',
	'auto',
	'bitand',
	'bitor',
	'bool',
	'break',
	'case',
	'catch',
	'char',
	'class',
	'compl',
	'concept',
	'const',
	'consteval',
	'constexpr',
	'constinit',
	'const_cast',
	'continue',
	'co_await',
	'co_return',
	'co_yield',
	'decltype',
	'default',
	'delete',
	'do',
	'double',
	'dynamic_cast',
	'else',
	'enum',
	'explicit',
	'export',
	'extern',
	'false',
	'float',
	'for',
	'friend',
	'goto',
	'if',
	'inline',
	'int',
	'long',
	'mutable',
	'namespace',
	'new',
	'noexcept',
	'not',
	'not_eq',
	'nullptr',
	'operator',
	'or',
	'or_eq',
	'private',
	'protected',
	'public',
	'register',
	'reinterpret_cast',
	'requires',
	'return',
	'short',
	'signed',
	'sizeof',
	'static',
	'static_assert',
	'static_cast',
	'struct',
	'switch',
	'template',
	'this',
	'thread_local',
	'throw',
	'true',
	'try',
	'typedef',
	'typeid',
	'typename',
	'union',
	'unsigned',
	'using',
	'virtual',
	'void',
	'volatile',
	'wchar_t',
	'while',
	'xor',
	'xor_eq'
])

export const CSS_KEYWORDS = new Set([
	'import',
	'media',
	'font-face',
	'keyframes',
	'supports',
	'charset',
	'important',
	'root',
	'hover',
	'active',
	'focus',
	'visited',
	'before',
	'after',
	'not',
	'nth-child',
	'first-child',
	'last-child',
	'only-child',
	'none',
	'inherit',
	'initial',
	'unset',
	'auto',
	'transparent',
	'currentcolor'
])

export const GO_KEYWORDS = new Set([
	'break',
	'default',
	'func',
	'interface',
	'select',
	'case',
	'defer',
	'go',
	'map',
	'struct',
	'chan',
	'else',
	'goto',
	'package',
	'switch',
	'const',
	'fallthrough',
	'if',
	'range',
	'type',
	'continue',
	'for',
	'import',
	'return',
	'var',
	'true',
	'false',
	'nil'
])

export const HTML_KEYWORDS = new Set([
	'html',
	'head',
	'body',
	'title',
	'meta',
	'link',
	'script',
	'style',
	'header',
	'footer',
	'main',
	'section',
	'article',
	'aside',
	'nav',
	'div',
	'span',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'p',
	'a',
	'img',
	'ul',
	'ol',
	'li',
	'table',
	'tr',
	'td',
	'th',
	'thead',
	'tbody',
	'form',
	'input',
	'button',
	'select',
	'textarea',
	'label',
	'option',
	'canvas',
	'svg',
	'iframe',
	'video',
	'audio',
	'source'
])
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
export const RUST_KEYWORDS = new Set([
	'as',
	'break',
	'const',
	'continue',
	'crate',
	'else',
	'enum',
	'extern',
	'false',
	'fn',
	'for',
	'if',
	'impl',
	'in',
	'let',
	'loop',
	'match',
	'mod',
	'move',
	'mut',
	'pub',
	'ref',
	'return',
	'self',
	'Self',
	'static',
	'struct',
	'super',
	'trait',
	'true',
	'type',
	'unsafe',
	'use',
	'where',
	'while',
	'async',
	'await',
	'dyn',
	'abstract',
	'become',
	'box',
	'do',
	'final',
	'macro',
	'override',
	'priv',
	'typeof',
	'unsized',
	'virtual',
	'yield',
	'try'
])

export const C_KEYWORDS = new Set([
	'auto',
	'break',
	'case',
	'char',
	'const',
	'continue',
	'default',
	'do',
	'double',
	'else',
	'enum',
	'extern',
	'float',
	'for',
	'goto',
	'if',
	'inline',
	'int',
	'long',
	'register',
	'restrict',
	'return',
	'short',
	'signed',
	'sizeof',
	'static',
	'struct',
	'switch',
	'typedef',
	'union',
	'unsigned',
	'void',
	'volatile',
	'while',
	'_Alignas',
	'_Alignof',
	'_Atomic',
	'_Bool',
	'_Complex',
	'_Generic',
	'_Imaginary',
	'_Noreturn',
	'_Static_assert',
	'_Thread_local'
])

export const CSHARP_KEYWORDS = new Set([
	'abstract',
	'as',
	'base',
	'bool',
	'break',
	'byte',
	'case',
	'catch',
	'char',
	'checked',
	'class',
	'const',
	'continue',
	'decimal',
	'default',
	'delegate',
	'do',
	'double',
	'else',
	'enum',
	'event',
	'explicit',
	'extern',
	'false',
	'finally',
	'fixed',
	'float',
	'for',
	'foreach',
	'goto',
	'if',
	'implicit',
	'in',
	'int',
	'interface',
	'internal',
	'is',
	'lock',
	'long',
	'namespace',
	'new',
	'null',
	'object',
	'operator',
	'out',
	'override',
	'params',
	'private',
	'protected',
	'public',
	'readonly',
	'ref',
	'return',
	'sbyte',
	'sealed',
	'short',
	'sizeof',
	'stackalloc',
	'static',
	'string',
	'struct',
	'switch',
	'this',
	'throw',
	'true',
	'try',
	'typeof',
	'uint',
	'ulong',
	'unchecked',
	'unsafe',
	'ushort',
	'using',
	'virtual',
	'void',
	'volatile',
	'while',
	'async',
	'await',
	'record',
	'init',
	'required',
	'file',
	'global',
	'nameof',
	'var',
	'dynamic',
	'partial',
	'yield',
	'from',
	'where',
	'select',
	'group',
	'orderby',
	'join',
	'let',
	'into',
	'equals',
	'by',
	'ascending',
	'descending'
])

export const BASH_KEYWORDS = new Set([
	'if',
	'then',
	'else',
	'elif',
	'fi',
	'case',
	'esac',
	'for',
	'while',
	'until',
	'do',
	'done',
	'in',
	'function',
	'select',
	'time',
	'coproc',
	'echo',
	'printf',
	'read',
	'cd',
	'pwd',
	'exit',
	'export',
	'unset',
	'alias',
	'unalias',
	'source',
	'exec',
	'eval',
	'test',
	'shift',
	'trap',
	'wait',
	'jobs',
	'kill',
	'bg',
	'fg',
	'history',
	'type',
	'ulimit',
	'umask',
	'set',
	'true',
	'false'
])

export const CMD_KEYWORDS = new Set([
	'echo',
	'set',
	'if',
	'else',
	'for',
	'in',
	'do',
	'goto',
	'call',
	'exit',
	'shift',
	'pause',
	'start',
	'title',
	'cls',
	'rem',
	'dir',
	'copy',
	'move',
	'del',
	'mkdir',
	'rmdir',
	'type',
	'ren',
	'tasklist',
	'taskkill',
	'ping',
	'ipconfig',
	'netstat',
	'shutdown'
])

export const POWERSHELL_KEYWORDS = new Set([
	'function',
	'filter',
	'param',
	'begin',
	'process',
	'end',
	'if',
	'else',
	'elseif',
	'switch',
	'foreach',
	'for',
	'while',
	'do',
	'until',
	'break',
	'continue',
	'return',
	'throw',
	'trap',
	'try',
	'catch',
	'finally',
	'$true',
	'$false',
	'$null',
	'Write-Host',
	'Write-Output',
	'Get-Item',
	'Set-Item',
	'Get-ChildItem',
	'Remove-Item',
	'Copy-Item',
	'Move-Item',
	'Test-Path',
	'Invoke-Command'
])

export const LANGUAGE_KEYWORDS: Record<string, Set<string>> = {
	javascript: JS_KEYWORDS,
	typescript: JS_KEYWORDS,
	js: JS_KEYWORDS,
	ts: JS_KEYWORDS,
	python: PYTHON_KEYWORDS,
	py: PYTHON_KEYWORDS,
	css: CSS_KEYWORDS,
	html: HTML_KEYWORDS,
	go: GO_KEYWORDS,
	golang: GO_KEYWORDS,
	cpp: CPP_KEYWORDS,
	'c++': CPP_KEYWORDS,
	rust: RUST_KEYWORDS,
	rs: RUST_KEYWORDS,
	c: C_KEYWORDS,
	h: C_KEYWORDS,
	csharp: CSHARP_KEYWORDS,
	cs: CSHARP_KEYWORDS,
	bash: BASH_KEYWORDS,
	sh: BASH_KEYWORDS,
	zsh: BASH_KEYWORDS,
	cmd: CMD_KEYWORDS,
	bat: CMD_KEYWORDS,
	powershell: POWERSHELL_KEYWORDS,
	ps1: POWERSHELL_KEYWORDS
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
			if (prev?.highlightType === t.highlightType) {
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
	unifiedResponse?: { data: Buffer | Uint8Array | string }
): proto.IMessage => {
	const richResponse: Record<string, unknown> = { messageType: 1, submessages, contextInfo }
	if (unifiedResponse) richResponse.unifiedResponse = unifiedResponse
	return {
		richResponseMessage: richResponse
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
		const { buffer /* width, height */ } = await renderLatexToPng(expr.latexExpression)
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

export const extractUnifiedResponse = (msg: proto.IMessage | null | undefined): CapturedUnifiedResponse | null => {
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

/**
 * Converts submessages into WhatsApp's native unifiedResponse primitive
 * sections (matches innovatorssoft's rich-message-utils.js toUnified).
 */
const buildUnifiedResponseSections = (submessages: RichSubMessage[]) => ({
	response_id: generateMessageID(),
	sections: submessages.map(sm => {
		if (sm.messageType === RichSubMessageType.CODE && sm.codeMetadata) {
			return {
				view_model: {
					primitive: {
						language: sm.codeMetadata.codeLanguage,
						code_blocks: sm.codeMetadata.codeBlocks.map(b => ({
							content: b.codeContent,
							type: CodeHighlightType[b.highlightType] ?? 'DEFAULT'
						})),
						__typename: 'GenAICodeUXPrimitive'
					},
					__typename: 'GenAISingleLayoutViewModel'
				}
			}
		}

		if (sm.messageType === RichSubMessageType.TABLE && sm.tableMetadata) {
			return {
				view_model: {
					primitive: {
						title: sm.tableMetadata.title,
						rows: sm.tableMetadata.rows.map(r => ({
							is_header: !!r.isHeading,
							cells: r.items,
							markdown_cells: r.items.map(item => ({ text: item }))
						})),
						__typename: 'GenATableUXPrimitive'
					},
					__typename: 'GenAISingleLayoutViewModel'
				}
			}
		}

		// TEXT (and default fallback)
		return {
			view_model: {
				primitive: {
					text: (sm as { messageText?: string }).messageText ?? '',
					inline_entities: (sm as { inlineEntities?: unknown[] }).inlineEntities ?? [],
					__typename: 'GenAIMarkdownTextUXPrimitive'
				},
				__typename: 'GenAISingleLayoutViewModel'
			}
		}
	})
})

export type GenerateRichMessageOptions = { useMarkdown?: boolean }

export const generateRichMessageContent = (
	submessages: RichSubMessage[],
	quoted?: QuotedMsg,
	options: GenerateRichMessageOptions = {}
): RichMessageContent => {
	const unifiedResponse = options.useMarkdown
		? { data: Buffer.from(JSON.stringify(buildUnifiedResponseSections(submessages))).toString('base64') }
		: undefined
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted), unifiedResponse),
		messageId: generateMessageID()
	}
}

/** Always builds native markdown unifiedResponse (matches innovatorssoft's dedicated generateMarkdownContent) */
export const generateMarkdownContent = (text: string, quoted?: QuotedMsg): RichMessageContent => {
	const submessages: RichSubMessage[] = [{ messageType: RichSubMessageType.TEXT, messageText: text }]
	const unifiedResponse = {
		data: Buffer.from(JSON.stringify(buildUnifiedResponseSections(submessages))).toString('base64')
	}
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted), unifiedResponse),
		messageId: generateMessageID()
	}
}
