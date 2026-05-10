/**
 * Rich Message Type Enums
 * Source: @itsliaaa/baileys RichType + @innovatorssoft/baileys message-composer
 */

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

// ── Language keyword sets for syntax highlighting ────────────────────────────

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
