/**
 * Rich Message Type Aliases — map to proto.AIRichResponseSubMessageType values
 * Using actual proto enum values to ensure type compatibility
 */
import { proto } from '../../WAProto/index.js'

// ── Re-export proto enums as friendly aliases ──────────────────────────────
export const RichSubMessageType = proto.AIRichResponseSubMessageType
export type RichSubMessageType = proto.AIRichResponseSubMessageType

export const CodeHighlightType = proto.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType
export type CodeHighlightType = proto.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType

// ── Language keyword sets for tokenizer ────────────────────────────────────
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
