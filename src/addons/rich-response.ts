/**
 * Rich Response Utilities
 * sendTable, sendList, sendCodeBlock, sendLatex, sendLatexImage,
 * sendLatexInlineImage, sendRichMessage, captureUnifiedResponse, sendUnifiedResponse
 */

import type { AnyMessageContent, MiscMessageGenerationOptions } from '../Types'

type SendFn = (jid: string, content: AnyMessageContent, options?: MiscMessageGenerationOptions) => Promise<any>

// ─── Table ────────────────────────────────────────────────────────────────────

/**
 * Format a 2D array as a plain-text table and send it.
 * @example sendTable(sock.sendMessage, jid, [['Name','Age'],['Alice','30']])
 */
export const sendTable = async (
	sendMessage: SendFn,
	jid: string,
	rows: string[][],
	opts?: { title?: string; headerRow?: boolean } & MiscMessageGenerationOptions
): Promise<void> => {
	const hasHeader = opts?.headerRow !== false
	const colWidths = rows[0]?.map((_, ci) => Math.max(...rows.map(r => (r[ci] ?? '').length))) ?? []
	const divider = colWidths.map(w => '─'.repeat(w + 2)).join('┼')

	const formatted = rows.map((row, ri) => {
		const line = row.map((cell, ci) => (cell ?? '').padEnd(colWidths[ci] ?? 0)).join(' │ ')
		if (hasHeader && ri === 0) return `┌${divider}┐\n│ ${line} │\n├${divider}┤`
		return `│ ${line} │`
	})

	formatted.push(`└${divider}┘`)

	const tableText = (opts?.title ? `*${opts.title}*\n` : '') + '```\n' + formatted.join('\n') + '\n```'
	await sendMessage(jid, { text: tableText }, opts)
}

// ─── List ─────────────────────────────────────────────────────────────────────

/**
 * Format an array of items as a numbered or bulleted list and send it.
 */
export const sendList = async (
	sendMessage: SendFn,
	jid: string,
	items: string[],
	opts?: { title?: string; ordered?: boolean } & MiscMessageGenerationOptions
): Promise<void> => {
	const { title, ordered = false } = opts ?? {}
	const lines = items.map((item, i) => (ordered ? `${i + 1}. ${item}` : `• ${item}`))
	const text = (title ? `*${title}*\n` : '') + lines.join('\n')
	await sendMessage(jid, { text }, opts)
}

// ─── Code Block ───────────────────────────────────────────────────────────────

/**
 * Send a code block (wrapped in triple backticks).
 * language is a hint for syntax highlighting in clients that support it.
 */
export const sendCodeBlock = async (
	sendMessage: SendFn,
	jid: string,
	code: string,
	opts?: { language?: string; title?: string } & MiscMessageGenerationOptions
): Promise<void> => {
	const { language = '', title } = opts ?? {}
	const block = '```' + language + '\n' + code + '\n```'
	const text = (title ? `*${title}*\n` : '') + block
	await sendMessage(jid, { text }, opts)
}

// ─── LaTeX ────────────────────────────────────────────────────────────────────

/**
 * Send a LaTeX expression as raw text (wrapped in backticks).
 * Note: WhatsApp does not natively render LaTeX. This sends the raw expression.
 */
export const sendLatex = async (
	sendMessage: SendFn,
	jid: string,
	expression: string,
	opts?: MiscMessageGenerationOptions
): Promise<void> => {
	await sendMessage(jid, { text: '`' + expression + '`' }, opts)
}

/**
 * Render a LaTeX expression to a PNG image via an external API (e.g. quicklatex.com)
 * and send it as an image message.
 */
export const sendLatexImage = async (
	sendMessage: SendFn,
	jid: string,
	expression: string,
	opts?: { caption?: string } & MiscMessageGenerationOptions
): Promise<void> => {
	// Uses QuickLaTeX render API — no API key required for simple expressions
	const encodedFormula = encodeURIComponent(
		`\\documentclass{standalone}\\begin{document}\\Large $${expression}$\\end{document}`
	)
	const apiUrl = `https://quicklatex.com/latex3.f?formula=${encodedFormula}&fsize=50px&fcolor=000000&bcolor=ffffff`
	const { caption, ...sendOpts } = opts ?? {}

	const resp = await fetch(apiUrl)
	const text = await resp.text()
	// Response format: "0\n<imageUrl>\n<width> <height>"
	const lines = text.trim().split('\n')
	if (lines[0] !== '0') throw new Error('LaTeX render failed: ' + text)
	const imageUrl = lines[1]!.trim()

	await sendMessage(jid, { image: { url: imageUrl }, caption }, sendOpts)
}

/**
 * Render a LaTeX expression to PNG and send it inline (as image with expression as caption).
 */
export const sendLatexInlineImage = async (
	sendMessage: SendFn,
	jid: string,
	expression: string,
	opts?: MiscMessageGenerationOptions
): Promise<void> => {
	await sendLatexImage(sendMessage, jid, expression, { ...opts, caption: expression })
}

// ─── Rich Message ──────────────────────────────────────────────────────────────

import type { RichMessageOptions, RichTextTable, RichTextList, CodeBlockOptions, LatexOptions } from '../Types'

const renderTable = (table: RichTextTable): string => {
	const rows = table.rows
	if (!rows.length) return ''
	const hasHeader = table.headerRow !== false
	const colWidths = rows[0]!.map((_, ci) => Math.max(...rows.map(r => (r[ci] ?? '').length)))
	const divider = colWidths.map(w => '─'.repeat(w + 2)).join('┼')
	const lines = rows.map((row, ri) => {
		const line = row.map((cell, ci) => (cell ?? '').padEnd(colWidths[ci] ?? 0)).join(' │ ')
		if (hasHeader && ri === 0) return `┌${divider}┐\n│ ${line} │\n├${divider}┤`
		return `│ ${line} │`
	})
	lines.push(`└${divider}┘`)
	return (table.title ? `*${table.title}*\n` : '') + '```\n' + lines.join('\n') + '\n```'
}

const renderList = (list: RichTextList): string => {
	const lines = list.items.map((item, i) => (list.ordered ? `${i + 1}. ${item}` : `• ${item}`))
	return (list.title ? `*${list.title}*\n` : '') + lines.join('\n')
}

const renderCode = (code: CodeBlockOptions): string => '```' + (code.language ?? '') + '\n' + code.code + '\n```'

const renderLatex = (latex: LatexOptions): string => '`' + latex.expression + '`'

/**
 * Send a rich message composed of mixed content parts (text, table, list, code, latex).
 */
export const sendRichMessage = async (
	sendMessage: SendFn,
	jid: string,
	rich: RichMessageOptions,
	opts?: MiscMessageGenerationOptions
): Promise<void> => {
	const parts = rich.parts.map(part => {
		switch (part.type) {
			case 'text':
				return part.text
			case 'table':
				return renderTable(part.table)
			case 'list':
				return renderList(part.list)
			case 'code':
				return renderCode(part.code)
			case 'latex':
				return renderLatex(part.latex)
			default:
				return ''
		}
	})
	const text = parts.join('\n\n') + (rich.caption ? '\n\n' + rich.caption : '')
	await sendMessage(jid, { text }, opts)
}

// ─── Unified Response ──────────────────────────────────────────────────────────

export type UnifiedResponseEntry = {
	jid: string
	content: AnyMessageContent
	options?: MiscMessageGenerationOptions
}

let capturedResponses: UnifiedResponseEntry[] = []

/**
 * Capture a response without immediately sending it.
 * Useful for building batched sends.
 */
export const captureUnifiedResponse = (
	jid: string,
	content: AnyMessageContent,
	options?: MiscMessageGenerationOptions
): UnifiedResponseEntry => {
	const entry: UnifiedResponseEntry = { jid, content, options }
	capturedResponses.push(entry)
	return entry
}

/**
 * Send all captured unified responses and clear the capture buffer.
 * Returns the results in order.
 */
export const sendUnifiedResponse = async (sendMessage: SendFn): Promise<any[]> => {
	const toSend = [...capturedResponses]
	capturedResponses = []
	return Promise.all(toSend.map(e => sendMessage(e.jid, e.content, e.options)))
}

/**
 * Clear captured responses without sending them
 */
export const clearCapturedResponses = (): void => {
	capturedResponses = []
}

/**
 * Get current captured responses without clearing
 */
export const getCapturedResponses = (): UnifiedResponseEntry[] => [...capturedResponses]
