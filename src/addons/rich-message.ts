/**
 * Rich Response / Meta AI Messages
 *
 * Best-of-both from @itsliaaa/baileys (rich-message-utils) and
 * @innovatorssoft/baileys (message-composer).
 *
 * Combines ItsLiaaa's proto-correct wrapToBotForwardedMessage + unifiedResponse
 * buffer injection with InnovatorsSoft's richer sendTable/sendList/sendCodeBlock/
 * sendLatex/sendLatexImage/sendLatexInlineImage/sendUnifiedResponse API surface.
 *
 * All AI/rich messages are wrapped in botForwardedMessage so WhatsApp renders
 * them with the AI icon and proper layout.
 */

import { getRandomValues, randomUUID } from 'crypto'
import { proto } from '../../WAProto/index.js'
import { DONATE_URL, LEXER_REGEX } from '../Defaults/index.js'
import { CodeHighlightType, RichSubMessageType } from '../Types/RichType.js'
import { generateMessageID, generateMessageIDV2 } from '../Utils/generics.js'
import { LANGUAGE_KEYWORDS } from '../WABinary/constants.js'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CodeBlock = { highlightType: CodeHighlightType; codeContent: string }

export type RichSubMessage =
	| { messageType: RichSubMessageType.TEXT; messageText: string; inlineEntities?: unknown[] }
	| {
			messageType: RichSubMessageType.CODE
			codeMetadata: { codeLanguage: string; codeBlocks: CodeBlock[] }
	  }
	| {
			messageType: RichSubMessageType.TABLE
			tableMetadata: {
				title?: string
				rows: { isHeading?: boolean; items: string[] }[]
			}
	  }
	| {
			messageType: RichSubMessageType.LATEX
			latexMetadata: {
				text: string
				expressions: LatexExpression[]
			}
	  }
	| {
			messageType: RichSubMessageType.INLINE_IMAGE
			imageMetadata: {
				imageUrl: { imagePreviewUrl: string; imageHighResUrl: string }
				imageText: string
				alignment: number
			}
	  }

export type LatexExpression = {
	latexExpression: string
	url: string
	width: number
	height: number
	fontHeight?: number
	imageTopPadding?: number
	imageLeadingPadding?: number
	imageBottomPadding?: number
	imageTrailingPadding?: number
}

export type RichContent = {
	code?: string
	contentText?: string
	disclaimerText?: string
	footerText?: string
	headerText?: string
	language?: string
	links?: {
		text: string
		url?: string
		title?: string
		displayName?: string
		sources?: { displayName?: string; subtitle?: string; url?: string }[]
	}[]
	noHeading?: boolean
	richResponse?: (
		| { text: string; inlineEntities?: unknown[] }
		| { code: CodeBlock[]; language: string }
		| { table: { isHeading?: boolean; items: string[] }[]; title?: string }
	)[]
	table?: string[][]
	title?: string
}

export type CapturedUnifiedResponse = {
	unifiedResponse: { data: Uint8Array }
	submessages: RichSubMessage[]
	contextInfo: proto.IContextInfo
}

// ─── Code Tokenizer (ItsLiaaa regex-based, better accuracy) ──────────────────

/**
 * Tokenize code into highlight blocks using ItsLiaaa's LEXER_REGEX approach.
 * Falls back gracefully if the regex constant isn't in your Defaults.
 */
export const tokenizeCode = (code: string, language = 'javascript'): CodeBlock[] => {
	const keywords: Set<string> = LANGUAGE_KEYWORDS[language] ?? new Set()
	const blocks: CodeBlock[] = []

	try {
		LEXER_REGEX.lastIndex = 0
		let match: RegExpExecArray | null
		while ((match = LEXER_REGEX.exec(code)) !== null) {
			if (match[1]) {
				blocks.push({ highlightType: CodeHighlightType.COMMENT, codeContent: match[1] })
			} else if (match[2]) {
				blocks.push({ highlightType: CodeHighlightType.STRING, codeContent: match[2] })
			} else if (match[3]) {
				blocks.push({
					highlightType: keywords.has(match[3]) ? CodeHighlightType.KEYWORD : CodeHighlightType.METHOD,
					codeContent: match[3]
				})
			} else if (match[4]) {
				blocks.push({
					highlightType: keywords.has(match[4]) ? CodeHighlightType.KEYWORD : CodeHighlightType.DEFAULT,
					codeContent: match[4]
				})
			} else if (match[5]) {
				blocks.push({ highlightType: CodeHighlightType.NUMBER, codeContent: match[5] })
			} else {
				blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: match[6] ?? '' })
			}
		}
	} catch {
		// Fallback: return the code as a single default block
		blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: code })
	}

	return blocks
}

// ─── unifiedResponse builder (ItsLiaaa — injects buffer for proper rendering) ─

/**
 * Convert submessages to the unified JSON structure that WhatsApp expects
 * inside `richResponseMessage.unifiedResponse.data` for correct rendering
 * of tables and code blocks. (ItsLiaaa fix)
 */
export const toUnified = (submessages: RichSubMessage[]) => ({
	response_id: randomUUID(),
	sections: submessages.map(submessage => {
		switch (submessage.messageType) {
			case RichSubMessageType.CODE: {
				const meta = submessage.codeMetadata
				return {
					view_model: {
						primitive: {
							language: meta.codeLanguage,
							code_blocks: meta.codeBlocks.map(b => ({
								content: b.codeContent,
								type: CodeHighlightType[b.highlightType]
							})),
							__typename: 'GenAICodeUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}

			case RichSubMessageType.TABLE: {
				const meta = submessage.tableMetadata
				return {
					view_model: {
						primitive: {
							title: meta.title,
							rows: meta.rows.map(row => ({
								is_header: row.isHeading,
								cells: row.items,
								markdown_cells: row.items.map(item => ({ text: item }))
							})),
							__typename: 'GenATableUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}

			case RichSubMessageType.TEXT:
			default:
				return {
					view_model: {
						primitive: {
							text: (submessage as { messageText?: string }).messageText ?? '',
							inline_entities: (submessage as { inlineEntities?: unknown[] }).inlineEntities ?? [],
							__typename: 'GenAIMarkdownTextUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
		}
	})
})

// ─── Bot metadata stubs (ItsLiaaa) ───────────────────────────────────────────

export const botMetadataSignature = (): Uint8Array => {
	const sig = new Uint8Array(64)
	getRandomValues(sig)
	return sig
}

export const botMetadataCertificate = (length = 685): Uint8Array => {
	const cert = new Uint8Array(length)
	cert[0] = 48
	cert[1] = 130
	getRandomValues(cert.subarray(2))
	return cert
}

// ─── Core wrapper ─────────────────────────────────────────────────────────────

/**
 * Wrap a richResponseMessage into the botForwardedMessage envelope
 * with verification metadata stubs.
 */
export const wrapToBotForwardedMessage = (richResponseMessage: proto.IAIRichResponseMessage) => ({
	messageContextInfo: {
		botMetadata: {
			verificationMetadata: {
				proofs: [
					{
						certificateChain: [botMetadataCertificate(), botMetadataCertificate(892)],
						version: 1,
						useCase: 1,
						signature: botMetadataSignature()
					}
				]
			}
		}
	},
	botForwardedMessage: {
		message: { richResponseMessage }
	}
})

// ─── Context info builder (InnovatorsSoft) ────────────────────────────────────

const buildRichContextInfo = (quoted?: proto.IWebMessageInfo): proto.IContextInfo => {
	const ctx: proto.IContextInfo = {
		forwardingScore: 1,
		isForwarded: true,
		forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
		forwardOrigin: 4
	}
	if (quoted?.key) {
		ctx.stanzaId = quoted.key.id
		ctx.participant = quoted.key.participant ?? quoted.key.remoteJid
		ctx.quotedMessage = quoted.message
	}

	return ctx
}

// ─── prepareRichResponseMessage (ItsLiaaa full implementation) ────────────────

/**
 * Build a complete botForwardedMessage with richResponseMessage.
 * Supports code, table, text, links, and richResponse arrays.
 */
export const prepareRichResponseMessage = (content: RichContent) => {
	const {
		code,
		contentText,
		disclaimerText,
		footerText,
		headerText,
		language,
		links,
		noHeading,
		richResponse,
		table,
		title
	} = content

	let submessages: RichSubMessage[] = []

	if (Array.isArray(richResponse)) {
		submessages = richResponse.map(item => {
			if ('text' in item) {
				return { messageType: RichSubMessageType.TEXT, messageText: item.text, inlineEntities: item.inlineEntities }
			} else if ('code' in item) {
				return {
					messageType: RichSubMessageType.CODE,
					codeMetadata: { codeLanguage: item.language, codeBlocks: item.code }
				}
			} else {
				return { messageType: RichSubMessageType.TABLE, tableMetadata: { title: item.title, rows: item.table } }
			}
		})
	} else {
		if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
		if (contentText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: contentText })

		if (code) {
			const lang = language ?? 'javascript'
			submessages.push({
				messageType: RichSubMessageType.CODE,
				codeMetadata: { codeLanguage: lang, codeBlocks: tokenizeCode(code, lang) }
			})
		} else if (links) {
			links.forEach((linkField, index) => {
				const prefix = 'SS_' + index
				const url = linkField.url ?? DONATE_URL
				const sources = linkField.sources?.map(s => ({
					source_type: 'THIRD_PARTY',
					source_display_name: s.displayName ?? 'Source',
					source_subtitle: s.subtitle ?? '',
					source_url: s.url ?? url
				}))
				submessages.push({
					messageType: RichSubMessageType.TEXT,
					messageText: linkField.text + ` {{${prefix}}}¹{{/${prefix}}} `,
					inlineEntities: [
						{
							key: prefix,
							metadata: {
								reference_id: index + 1,
								reference_url: url,
								reference_title: linkField.title ?? '',
								reference_display_name: linkField.displayName ?? 'Source',
								sources: sources ?? [],
								__typename: 'GenAISearchCitationItem'
							}
						}
					]
				})
			})
		} else if (table) {
			submessages.push({
				messageType: RichSubMessageType.TABLE,
				tableMetadata: {
					title,
					rows: table.map((items, index) => ({ isHeading: !noHeading && index === 0, items }))
				}
			})
		}

		if (footerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footerText })
	}

	const unified = toUnified(submessages)

	const richResponseMessage = proto.AIRichResponseMessage.create({
		submessages: submessages as unknown as proto.IAIRichResponseSubMessage[],
		messageType: proto.AIRichResponseMessageType.AI_RICH_RESPONSE_TYPE_STANDARD,
		unifiedResponse: {
			// ItsLiaaa fix: inject buffer so tables/code blocks render correctly
			data: Buffer.from(JSON.stringify(unified), 'utf-8')
		},
		contextInfo: {
			isForwarded: true,
			forwardingScore: 1,
			forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
			forwardOrigin: 4
		}
	})

	const message = wrapToBotForwardedMessage(richResponseMessage)
	const botMetadata = message.messageContextInfo.botMetadata

	if (disclaimerText) {
		;(botMetadata as Record<string, unknown>).messageDisclaimerText = disclaimerText
	}

	;(botMetadata as Record<string, unknown>).botResponseId = unified.response_id

	return message
}

// ─── High-level senders (InnovatorsSoft API surface) ─────────────────────────

/**
 * Send a rich table message.
 */
export const sendTable = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: proto.IWebMessageInfo,
	options: { headerText?: string; footer?: string } = {}
) => {
	const tableRows = [{ items: headers, isHeading: true }, ...rows.map(row => ({ items: row.map(String) }))]
	const submessages: RichSubMessage[] = []
	if (options.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })

	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx),
		messageId: generateMessageIDV2()
	}
}

/**
 * Send a rich list message.
 */
export const sendList = (
	title: string,
	items: (string | string[])[],
	quoted?: proto.IWebMessageInfo,
	options: { headerText?: string; footer?: string } = {}
) => {
	const tableRows = items.map(item => ({
		items: Array.isArray(item) ? item.map(String) : [String(item)]
	}))
	const submessages: RichSubMessage[] = []
	if (options.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.headerText })
	submessages.push({ messageType: RichSubMessageType.TABLE, tableMetadata: { title, rows: tableRows } })
	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })

	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx),
		messageId: generateMessageIDV2()
	}
}

/**
 * Send a rich code-block message with syntax highlighting.
 */
export const sendCodeBlock = (
	code: string,
	quoted?: proto.IWebMessageInfo,
	options: { title?: string; language?: string; footer?: string } = {}
) => {
	const lang = options.language ?? 'javascript'
	const submessages: RichSubMessage[] = []
	if (options.title) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.title })
	submessages.push({
		messageType: RichSubMessageType.CODE,
		codeMetadata: { codeLanguage: lang, codeBlocks: tokenizeCode(code, lang) }
	})
	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })

	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx),
		messageId: generateMessageIDV2()
	}
}

/**
 * Send a LaTeX expression message (text-only, no image rendering).
 */
export const sendLatex = (
	quoted: proto.IWebMessageInfo | undefined,
	options: {
		text?: string
		expressions: LatexExpression[]
		headerText?: string
		footer?: string
	}
) => {
	const submessages: RichSubMessage[] = []
	if (options.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.headerText })
	submessages.push({
		messageType: RichSubMessageType.LATEX,
		latexMetadata: { text: options.text ?? '', expressions: options.expressions }
	})
	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })

	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx),
		messageId: generateMessageIDV2()
	}
}

/**
 * Render LaTeX to images, upload, and build a latex message.
 */
export const sendLatexImage = async (
	quoted: proto.IWebMessageInfo | undefined,
	options: {
		text?: string
		expressions: { latexExpression: string }[]
		headerText?: string
		footer?: string
	},
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const submessages: RichSubMessage[] = []
	if (options.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.headerText })

	const expressions = await Promise.all(
		options.expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
			const result = await uploadFn(buffer, 'image')
			return { latexExpression: expr.latexExpression, url: result.url ?? result.directPath ?? '', width, height }
		})
	)

	submessages.push({
		messageType: RichSubMessageType.LATEX,
		latexMetadata: { text: options.text ?? '', expressions }
	})
	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })

	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx),
		messageId: generateMessageIDV2()
	}
}

/**
 * Render each LaTeX expression as an inline image block.
 */
export const sendLatexInlineImage = async (
	quoted: proto.IWebMessageInfo | undefined,
	options: {
		text?: string
		expressions: { latexExpression: string }[]
		headerText?: string
		footer?: string
	},
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPng: (expr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
) => {
	const submessages: RichSubMessage[] = []
	if (options.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.headerText })
	if (options.text) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.text })

	for (const expr of options.expressions) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { buffer, width, height } = await renderLatexToPng(expr.latexExpression)
		const result = await uploadFn(buffer, 'image')
		const imageUrl = result.url ?? result.directPath ?? ''
		submessages.push({
			messageType: RichSubMessageType.INLINE_IMAGE,
			imageMetadata: {
				imageUrl: { imagePreviewUrl: imageUrl, imageHighResUrl: imageUrl },
				imageText: expr.latexExpression,
				alignment: 2
			}
		})
	}

	if (options.footer) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: options.footer })

	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx),
		messageId: generateMessageIDV2()
	}
}

/**
 * Build a fully custom rich message from an arbitrary submessages array.
 */
export const sendRichMessage = (submessages: RichSubMessage[], quoted?: proto.IWebMessageInfo) => {
	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx),
		messageId: generateMessageIDV2()
	}
}

/**
 * Capture the unifiedResponse payload from an incoming Meta AI botForwardedMessage.
 * Returns null if not a rich response.
 */
export const captureUnifiedResponse = (msg: proto.IMessage | null | undefined): CapturedUnifiedResponse | null => {
	const botFwd = msg?.botForwardedMessage?.message
	if (!botFwd) return null
	const rich = botFwd.richResponseMessage
	if (!rich?.unifiedResponse?.data) return null
	return {
		unifiedResponse: { data: rich.unifiedResponse.data },
		submessages: (rich.submessages ?? []) as unknown as RichSubMessage[],
		contextInfo: rich.contextInfo ?? {}
	}
}

/**
 * Re-send a previously captured unified response to a new JID / with a new quote.
 */
export const sendUnifiedResponse = (quoted: proto.IWebMessageInfo | undefined, captured: CapturedUnifiedResponse) => {
	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(captured.submessages, ctx, captured.unifiedResponse),
		messageId: generateMessageIDV2()
	}
}

// ─── Internal helper (reuse in the high-level builders) ─────────────────────

const buildBotForwardedMessage = (
	submessages: RichSubMessage[],
	contextInfo: proto.IContextInfo,
	unifiedResponse?: { data: Uint8Array }
) => {
	const richResponse: Record<string, unknown> = {
		messageType: 1,
		submessages,
		contextInfo
	}
	if (unifiedResponse) richResponse.unifiedResponse = unifiedResponse

	return {
		botForwardedMessage: {
			message: { richResponseMessage: richResponse }
		}
	}
}

/**
 * Generate a Meta AI–style markdown message content.
 * Used by sendMarkdown — wraps plain text in a GenAIMarkdownTextUXPrimitive.
 */
export const generateMarkdownContent = (
	text: string,
	quoted?: proto.IWebMessageInfo,
	options: Record<string, unknown> = {}
): { message: proto.IMessage; messageId: string } => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { randomUUID } = require('crypto') as typeof import('crypto')

	const submessages: RichSubMessage[] = [{ messageType: RichSubMessageType.TEXT, messageText: text } as any]

	const sections = [
		{
			view_model: {
				primitive: { text, __typename: 'GenAIMarkdownTextUXPrimitive' },
				__typename: 'GenAISingleLayoutViewModel'
			}
		}
	]

	const unifiedResponse = {
		data: Buffer.from(JSON.stringify({ response_id: randomUUID(), sections }))
	}

	const ctx = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctx, unifiedResponse),
		messageId: generateMessageID()
	}
}
