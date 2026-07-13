/**
 * Rich Message Type Enums — friendly name mappings over proto enum values
 */
import { proto } from '../../WAProto/index.js'

const RST = proto.AIRichResponseSubMessageType
const CHT = proto.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType

/** Friendly aliases for proto.AIRichResponseSubMessageType */
export const RichSubMessageType = {
	UNKNOWN: RST.AI_RICH_RESPONSE_UNKNOWN as number,
	GRID_IMAGE: RST.AI_RICH_RESPONSE_GRID_IMAGE as number,
	TEXT: RST.AI_RICH_RESPONSE_TEXT as number,
	INLINE_IMAGE: RST.AI_RICH_RESPONSE_INLINE_IMAGE as number,
	TABLE: RST.AI_RICH_RESPONSE_TABLE as number,
	CODE: RST.AI_RICH_RESPONSE_CODE as number,
	DYNAMIC: RST.AI_RICH_RESPONSE_DYNAMIC as number,
	MAP: RST.AI_RICH_RESPONSE_MAP as number,
	LATEX: RST.AI_RICH_RESPONSE_LATEX as number,
	CONTENT_ITEMS: RST.AI_RICH_RESPONSE_CONTENT_ITEMS as number
} as const

export type RichSubMessageType = (typeof RichSubMessageType)[keyof typeof RichSubMessageType]

/** Friendly aliases for proto.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType */
export const CodeHighlightType = {
	DEFAULT: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT as number,
	KEYWORD: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD as number,
	METHOD: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD as number,
	STRING: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING as number,
	NUMBER: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER as number,
	COMMENT: CHT.AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT as number
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
