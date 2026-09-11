/**
 * message-composer.ts (addons)
 * Rich message builders for Meta AI / Bot botForwardedMessage payloads.
 * Ported from upstream main (April 2026).
 */

// Import into local scope AND re-export for consumers
import { CodeHighlightType, RichSubMessageType } from '../Types/RichType'
export { CodeHighlightType, RichSubMessageType }

import { createHash, randomUUID } from 'crypto'
import { promises as fsp } from 'fs'
import os from 'os'
import path from 'path'
import type { proto } from '../../WAProto/index.js'
import type { WAMediaUploadFunction } from '../Types/Message'
import { generateMessageID } from '../Utils/generics'
import { getUrlFromDirectPath } from '../Utils/messages-media'

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
	inlineEntities?: InlineEntityItem[]
}

/** Options controlling `extractIE`'s inline-entity extraction from markdown text. */
export type ExtractOptions = {
	extract?: boolean
	hyperlink?: boolean
	citation?: boolean
	latex?: boolean
}

export interface InlineEntityItem {
	key: string
	metadata: {
		display_name?: string
		is_trusted?: boolean
		url?: string
		reference_id?: number
		reference_url?: string
		reference_title?: string
		reference_display_name?: string
		sources?: unknown[]
		latex_expression?: string
		latex_image?: { url?: string; width?: number; height?: number }
		font_height?: number
		padding?: number
		__typename?: string
	}
}

export interface ExtractedIE {
	text: string
	ie: Array<{ type: string; ie: Record<string, unknown> }>
	inline_entities: InlineEntityItem[]
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

// ── Inline entity extraction ────────────────────────────────────────────────

/**
 * Extract inline entities (hyperlinks, citations, latex) from markdown text.
 * Recognizes `[text](url)` as a hyperlink, `[](url)` as a citation, and
 * `[latex|width|height|fontHeight|padding](url)` (angle brackets) as a
 * latex-image reference, replacing each with a `{{KEY}}...{{/KEY}}` tag and
 * returning the matching WhatsApp inline_entities metadata.
 */
export const extractIE = (
	text: string,
	{ extract = true, hyperlink = true, citation = true, latex = true }: ExtractOptions = {}
): ExtractedIE => {
	if (!text || typeof text !== 'string' || !extract) {
		return { text: text || '', ie: [], inline_entities: [] }
	}

	const createIE = (type: string, entityData: Record<string, any>): InlineEntityItem | null => {
		if (type === 'hyperlink') {
			return {
				key: entityData.key,
				metadata: {
					display_name: entityData.text,
					is_trusted: entityData.is_trusted,
					url: entityData.url,
					__typename: 'GenAIInlineLinkItem'
				}
			}
		}

		if (type === 'citation') {
			return {
				key: entityData.key,
				metadata: {
					reference_id: entityData.reference_id,
					reference_url: entityData.url,
					reference_title: entityData.url,
					reference_display_name: entityData.url,
					sources: [],
					__typename: 'GenAISearchCitationItem'
				}
			}
		}

		if (type === 'latex') {
			return {
				key: entityData.key,
				metadata: {
					latex_expression: entityData.text,
					latex_image: {
						url: entityData.url,
						width: Number(entityData.width) || 100,
						height: Number(entityData.height) || 100
					},
					font_height: Number(entityData.font_height) || 83.333333333333,
					padding: Number(entityData.padding) || 15,
					__typename: 'GenAILatexItem'
				}
			}
		}

		return null
	}

	let citation_index = 1
	let hyperlink_index = 0
	let latex_index = 0

	/** Builds the {key, tag, data} triple for one matched [text](url)/[text]<url> span, or null to skip it (type disabled via options). */
	const buildInlineEntityMatch = (
		type: 'link' | 'latex',
		raw: string,
		rawUrl: string
	): { key: string; tag: string; data: { type: string; ie: Record<string, unknown> } } | null => {
		let url = rawUrl

		if (type === 'latex') {
			if (!latex) return null
			const [txt = '', width = null, height = null, font_height = null, padding = null] = raw.split('|')
			const key = `LATEX_${latex_index++}`
			const tag = `{{${key}}}${txt || 'image'}{{/${key}}}`
			return { key, tag, data: { type: 'latex', ie: { key, text: txt, url, width, height, font_height, padding } } }
		}

		if (raw) {
			if (!hyperlink) return null
			const trusted = !url.startsWith('!')
			if (!trusted) url = url.slice(1)
			const key = `HYPERLINK_${hyperlink_index++}`
			const tag = `{{${key}}}${url}{{/${key}}}`
			return { key, tag, data: { type: 'hyperlink', ie: { key, text: raw, url, is_trusted: trusted } } }
		}

		if (!citation) return null
		const key = `CITATION_${citation_index - 1}`
		const tag = `{{${key}}}${url}{{/${key}}}`
		return { key, tag, data: { type: 'citation', ie: { reference_id: citation_index++, key, text: '', url } } }
	}

	const ie: Array<{ type: string; ie: Record<string, unknown> }> = []
	const inline_entities: InlineEntityItem[] = []
	let result = ''
	let last = 0
	const stack: number[] = []

	/** Finds the index just past the matching close bracket, accounting for escapes and nested pairs. */
	const findMatchingClose = (str: string, from: number, open: string, close: string): number => {
		let end = from
		let depth = 1
		while (end < str.length && depth > 0) {
			if (str[end] === open && str[end - 1] !== '\\') depth++
			else if (str[end] === close && str[end - 1] !== '\\') depth--
			end++
		}

		return depth > 0 ? -1 : end
	}

	for (let i = 0; i < text.length; i++) {
		if (text[i] === '[' && text[i - 1] !== '\\') {
			stack.push(i)
		} else if (text[i] === ']' && text[i - 1] !== '\\') {
			if (text[i + 1] === '(' || text[i + 1] === '<') {
				const start = stack.pop()
				if (start === undefined) continue

				const open = text[i + 1] as '(' | '<'
				const close = open === '(' ? ')' : '>'
				const type = open === '(' ? 'link' : 'latex'
				const end = findMatchingClose(text, i + 2, open, close)

				if (end === -1) continue

				const raw = text.slice(start + 1, i).trim()
				const url = text.slice(i + 2, end - 1).trim()

				const match = buildInlineEntityMatch(type, raw, url)
				if (!match) continue
				const { tag, data } = match

				result += text.slice(last, start) + tag
				last = end

				ie.push(data)
				const entity = createIE(data.type, data.ie)
				if (entity) inline_entities.push(entity)

				i = end - 1
			} else {
				stack.pop()
			}
		}
	}

	result += text.slice(last)

	return { text: result, ie, inline_entities }
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
 * sections.
 */
const buildUnifiedResponseSections = (submessages: RichSubMessage[], extractOptions: ExtractOptions = {}) => ({
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
							markdown_cells: r.items.map(item => {
								const extracted = extractIE(item, extractOptions)
								return extracted.inline_entities.length
									? { text: extracted.text, inline_entities: extracted.inline_entities }
									: { text: extracted.text }
							})
						})),
						__typename: 'GenATableUXPrimitive'
					},
					__typename: 'GenAISingleLayoutViewModel'
				}
			}
		}

		// TEXT (and default fallback)
		const extracted = extractIE((sm as { messageText?: string }).messageText ?? '', extractOptions)
		const providedEntities = (sm as { inlineEntities?: InlineEntityItem[] }).inlineEntities ?? []
		return {
			view_model: {
				primitive: {
					text: extracted.text,
					inline_entities: [...providedEntities, ...extracted.inline_entities],
					__typename: 'GenAIMarkdownTextUXPrimitive'
				},
				__typename: 'GenAISingleLayoutViewModel'
			}
		}
	})
})

export type GenerateRichMessageOptions = { useMarkdown?: boolean } & ExtractOptions

export const generateRichMessageContent = (
	submessages: RichSubMessage[],
	quoted?: QuotedMsg,
	options: GenerateRichMessageOptions = {}
): RichMessageContent => {
	const unifiedResponse = options.useMarkdown
		? { data: Buffer.from(JSON.stringify(buildUnifiedResponseSections(submessages, options))).toString('base64') }
		: undefined
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted), unifiedResponse),
		messageId: generateMessageID()
	}
}

export type GenerateRichHtmlOptions = {
	id?: string
	title?: string
	source?: string
	trusted_sources?: string | string[]
	typename?: string
	headerText?: string
	footer?: string
}

/**
 * Generate a rich HTML message payload — renders arbitrary HTML inside a
 * GenAI unified-response primitive, forwarded as a bot-style message.
 */
export const generateRichHtmlContent = (
	html: string,
	quoted?: QuotedMsg,
	options: GenerateRichHtmlOptions = {}
): RichMessageContent => {
	const { id, title, source, trusted_sources, headerText, footer, typename } = options
	const responseId = id ? `${id}-${Date.now()}` : randomUUID()
	const trusted = trusted_sources
		? Array.isArray(trusted_sources)
			? trusted_sources
			: [trusted_sources]
		: source
			? [source]
			: []
	const primitiveTypename = typename || 'GenAIHtmlPrimitive'

	const submessages: RichSubMessage[] = []
	if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
	if (title) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: title })
	if (footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footer })

	const payload = {
		response_id: responseId,
		sections: [
			{
				view_model: {
					primitive: {
						__typename: primitiveTypename,
						payload: html,
						trusted_sources: trusted
					},
					__typename: 'GenAISingleLayoutViewModel'
				}
			}
		]
	}

	const unifiedResponse = { data: Buffer.from(JSON.stringify(payload)).toString('base64') }
	const message: proto.IMessage = {
		...buildBotForwardedMessage(submessages, buildRichContextInfo(quoted), unifiedResponse),
		messageContextInfo: {
			deviceListMetadata: {},
			deviceListMetadataVersion: 2,
			botMetadata: { messageDisclaimerText: '', botResponseId: responseId }
		}
	}

	return {
		message,
		messageId: generateMessageID()
	}
}

/**
 * Renders a LaTeX expression to a PNG image via the codecogs.com public rendering API.
 */
export const renderLatexToPng = async (
	latexExpr: string
): Promise<{ buffer: Buffer; width: number; height: number }> => {
	const encoded = encodeURIComponent(latexExpr)
	const url = `https://latex.codecogs.com/png.image?%5Cdpi%7B1200%7D%5Cbg%7Bwhite%7D${encoded}`
	const res = await fetch(url)
	if (!res.ok) throw new Error(`[renderLatexToPng] HTTP ${res.status}`)
	const buffer = Buffer.from(await res.arrayBuffer())
	return { buffer, width: 1200, height: 600 }
}

/**
 * Uploads a raw (unencrypted-at-rest) buffer — e.g. a rendered LaTeX/table PNG — to WA's media
 * servers via the socket's `waUploadToServer`. Writes to a temp file, uploads, then cleans up.
 */
export const uploadUnencryptedToWA = async (
	buffer: Buffer,
	waUploadToServer: WAMediaUploadFunction
): Promise<{ url: string; directPath: string }> => {
	const sha256B64 = createHash('sha256').update(buffer).digest('base64')
	const tmpPath = path.join(os.tmpdir(), `wa_upload_${Date.now()}.png`)
	await fsp.writeFile(tmpPath, buffer)
	try {
		const result = await waUploadToServer(tmpPath, {
			mediaType: 'image',
			fileEncSha256B64: sha256B64
		})
		return {
			url: result.mediaUrl || getUrlFromDirectPath(result.directPath),
			directPath: result.directPath
		}
	} finally {
		try {
			await fsp.unlink(tmpPath)
		} catch {}
	}
}

/** Always builds native markdown unifiedResponse */
export const generateMarkdownContent = (
	text: string,
	quoted?: QuotedMsg,
	options: ExtractOptions = {}
): RichMessageContent => {
	const submessages: RichSubMessage[] = [{ messageType: RichSubMessageType.TEXT, messageText: text }]
	const unifiedResponse = {
		data: Buffer.from(JSON.stringify(buildUnifiedResponseSections(submessages, options))).toString('base64')
	}
	return {
		message: buildBotForwardedMessage(submessages, buildRichContextInfo(quoted), unifiedResponse),
		messageId: generateMessageID()
	}
}
