/**
 * Rich Message Type Enums — friendly name mappings over proto enum values
 */
import { proto } from '../../WAProto/index.js'

const RST = proto.AIRichResponseSubMessageType
const CHT = proto.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType

/** Friendly aliases for proto.AIRichResponseSubMessageType */
export const RichSubMessageType = {
	UNKNOWN: RST.AI_RICH_RESPONSE_UNKNOWN,
	GRID_IMAGE: RST.AI_RICH_RESPONSE_GRID_IMAGE,
	TEXT: RST.AI_RICH_RESPONSE_TEXT,
	INLINE_IMAGE: RST.AI_RICH_RESPONSE_INLINE_IMAGE,
	TABLE: RST.AI_RICH_RESPONSE_TABLE,
	CODE: RST.AI_RICH_RESPONSE_CODE,
	DYNAMIC: RST.AI_RICH_RESPONSE_DYNAMIC,
	MAP: RST.AI_RICH_RESPONSE_MAP,
	LATEX: RST.AI_RICH_RESPONSE_LATEX,
	CONTENT_ITEMS: RST.AI_RICH_RESPONSE_CONTENT_ITEMS
} as const

export type RichSubMessageType = (typeof RichSubMessageType)[keyof typeof RichSubMessageType]

/** Friendly aliases for proto.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType */
export const CodeHighlightType = {
	DEFAULT: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT,
	KEYWORD: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD,
	METHOD: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD,
	STRING: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING,
	NUMBER: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER,
	COMMENT: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT
} as const

export type CodeHighlightType = (typeof CodeHighlightType)[keyof typeof CodeHighlightType]

// ── Language keyword sets for tokenizer ───────────────────────────────────
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
