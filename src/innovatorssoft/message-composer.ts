/**
 * Rich Message Composer — sendTable / sendList / sendCodeBlock / sendLatex /
 * sendRichMessage / captureUnifiedResponse building blocks.
 *
 * Source: innovatorssoft/baileys (ported from compiled JS to TypeScript)
 *
 * NOTE: the shapes involved here (botForwardedMessage / richResponseMessage /
 * unifiedResponse) are loosely typed on purpose — they mirror an internal
 * Meta-AI rich-response proto structure that isn't part of the public
 * Baileys proto typings, so `any` is used deliberately in several spots
 * instead of fighting the compiler over an undocumented wire format.
 */

import * as crypto from 'crypto'
import { proto } from '../../WAProto/index.js'
import { generateMessageID } from '../Utils/generics'
import { getUrlFromDirectPath } from '../Utils/messages-media'

export const JS_KEYWORDS: Set<string> = new Set([
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

export const PYTHON_KEYWORDS: Set<string> = new Set([
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
	METHOD = 2,
	STR = 3,
	NUMBER = 4,
	COMMENT = 5
}

export enum RichSubMessageType {
	UNKNOWN = 0,
	GRID_IMAGE = 1,
	TEXT = 2,
	IMAGE = 3,
	TABLE = 4,
	CODE_BLOCK = 5,
	DYNAMIC = 6,
	MAP = 7,
	LATEX = 8,
	CONTENT_ITEMS = 9
}

export interface CodeBlockToken {
	highlightType: CodeHighlightType
	codeContent: string
}

export interface LatexExpression {
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

export const tokenizeCode = (codeStr: string, language = 'javascript'): CodeBlockToken[] => {
	const keywords = LANGUAGE_KEYWORDS[language] || JS_KEYWORDS
	const blocks: CodeBlockToken[] = []
	const lines = codeStr.split('\n')

	for (let li = 0; li < lines.length; li++) {
		const line = lines[li]!
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
			/(\/\/.*$|#.*$)|(\"(?:[^\"\\]|\\.)*\")|('(?:[^'\\]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_$][\w$]*\b)|([^\s\w$\"'`]+)|(\s+)/g

		let match: RegExpExecArray | null
		const tokens: CodeBlockToken[] = []

		while ((match = regex.exec(line)) !== null) {
			const val = match[0]

			if (match[1]) {
				tokens.push({ highlightType: CodeHighlightType.COMMENT, codeContent: val })
			} else if (match[2] || match[3] || match[4]) {
				tokens.push({ highlightType: CodeHighlightType.STR, codeContent: val })
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

		const merged: CodeBlockToken[] = []
		for (const t of tokens) {
			const prev = merged.length > 0 ? merged[merged.length - 1] : undefined
			if (prev && prev.highlightType === t.highlightType) {
				prev.codeContent += t.codeContent
			} else {
				merged.push({ ...t })
			}
		}

		if (merged.length > 0) {
			merged[merged.length - 1]!.codeContent += nl
		}

		blocks.push(...merged)
	}

	return blocks
}

/** Build a contextInfo object for botForwardedMessage payloads. */
export const buildRichContextInfo = (quoted?: any, options: { botJid?: string; mentions?: string[] } = {}): any => {
	const ctxInfo: any = {
		forwardingScore: 1,
		isForwarded: true,
		forwardedAiBotMessageInfo: { botJid: options.botJid ? options.botJid : '867051314767696@bot' },
		forwardOrigin: 4,
		...(options.mentions ? { mentionedJid: options.mentions } : {})
	}

	if (quoted?.key) {
		ctxInfo.stanzaId = quoted.key.id
		ctxInfo.participant = quoted.key.participant || quoted.sender || quoted.key.remoteJid
		ctxInfo.quotedMessage = quoted.message
	}

	return ctxInfo
}

/**
 * Generates a dummy (random-byte) signature for the bot-message
 * verification metadata. WhatsApp's client checks for the *presence* and
 * *shape* of this field on AI rich-response messages, not a real
 * cryptographic signature, so random bytes in the right shape are
 * sufficient — this mirrors what innovatorssoft/baileys does.
 */
export const botMetadataSignature = (): Uint8Array => {
	const signature = new Uint8Array(64)
	crypto.randomFillSync(signature)
	return signature
}

/** Generates a dummy (random-byte) X.509-shaped certificate, see {@link botMetadataSignature}. */
export const botMetadataCertificate = (length = 685): Uint8Array => {
	const certificate = new Uint8Array(length)
	certificate[0] = 48
	certificate[1] = 130
	crypto.randomFillSync(certificate.subarray(2))
	return certificate
}

/** Wrap submessages into the botForwardedMessage → richResponseMessage proto structure. */
export const buildBotForwardedMessage = (
	submessages: any[],
	contextInfo?: any,
	unifiedResponse?: { data: string | Buffer }
): proto.IMessage => {
	const richResponse: any = {
		messageType: 1,
		submessages,
		contextInfo
	}

	if (unifiedResponse) {
		richResponse.unifiedResponse = unifiedResponse
	}

	return {
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
			message: {
				richResponseMessage: richResponse
			}
		}
	} as unknown as proto.IMessage
}

export const generateTableContent = (
	title: string,
	headers: string[],
	rows: string[][],
	quoted?: any,
	options: { headerText?: string; footer?: string } = {}
): { message: proto.IMessage; messageId: string } => {
	const { footer, headerText } = options
	const tableRows = [{ items: headers, isHeading: true }, ...rows.map(row => ({ items: row.map(String) }))]

	const submessages: any[] = []
	if (headerText) {
		submessages.push({ messageType: 2, messageText: headerText })
	}

	submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
	if (footer) {
		submessages.push({ messageType: 2, messageText: footer })
	}

	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctxInfo),
		messageId: generateMessageID()
	}
}

export const generateListContent = (
	title: string,
	items: string[] | string[][],
	quoted?: any,
	options: { headerText?: string; footer?: string } = {}
): { message: proto.IMessage; messageId: string } => {
	const { footer, headerText } = options
	const tableRows = items.map(item => ({
		items: Array.isArray(item) ? item.map(String) : [String(item)]
	}))

	const submessages: any[] = []
	if (headerText) {
		submessages.push({ messageType: 2, messageText: headerText })
	}

	submessages.push({ messageType: 4, tableMetadata: { title, rows: tableRows } })
	if (footer) {
		submessages.push({ messageType: 2, messageText: footer })
	}

	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctxInfo),
		messageId: generateMessageID()
	}
}

export const generateCodeBlockContent = (
	code: string,
	quoted?: any,
	options: { title?: string; footer?: string; language?: string } = {}
): { message: proto.IMessage; messageId: string } => {
	const { title, footer, language = 'javascript' } = options
	const submessages: any[] = []

	if (title) {
		submessages.push({ messageType: 2, messageText: title })
	}

	submessages.push({
		messageType: 5,
		codeMetadata: {
			codeLanguage: language,
			codeBlocks: tokenizeCode(code, language)
		}
	})
	if (footer) {
		submessages.push({ messageType: 2, messageText: footer })
	}

	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctxInfo),
		messageId: generateMessageID()
	}
}

export const generateLatexContent = (
	quoted: any,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string }
): { message: proto.IMessage; messageId: string } => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []

	if (headerText) {
		submessages.push({ messageType: 2, messageText: headerText })
	}

	const latexExpressions = expressions.map(expr => {
		const entry: any = {
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
	if (footer) {
		submessages.push({ messageType: 2, messageText: footer })
	}

	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctxInfo),
		messageId: generateMessageID()
	}
}

export const generateLatexImageContent = async (
	quoted: any,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPngFn: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<{ message: proto.IMessage; messageId: string }> => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []

	if (headerText) {
		submessages.push({ messageType: 2, messageText: headerText })
	}

	const latexExpressions = await Promise.all(
		expressions.map(async expr => {
			const { buffer, width, height } = await renderLatexToPngFn(expr.latexExpression)
			const uploadResult = await uploadFn(buffer, 'image')
			const imageUrl = uploadResult.url || uploadResult.directPath
			return { latexExpression: expr.latexExpression, url: imageUrl, width, height }
		})
	)

	submessages.push({ messageType: 8, latexMetadata: { text: text || '', expressions: latexExpressions } })
	if (footer) {
		submessages.push({ messageType: 2, messageText: footer })
	}

	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctxInfo),
		messageId: generateMessageID()
	}
}

export const generateLatexInlineImageContent = async (
	quoted: any,
	options: { text?: string; expressions: LatexExpression[]; headerText?: string; footer?: string },
	uploadFn: (buffer: Buffer, type: string) => Promise<{ url?: string; directPath?: string }>,
	renderLatexToPngFn: (latexExpr: string) => Promise<{ buffer: Buffer; width: number; height: number }>
): Promise<{ message: proto.IMessage; messageId: string }> => {
	const { text, expressions, headerText, footer } = options
	const submessages: any[] = []

	if (headerText) {
		submessages.push({ messageType: 2, messageText: headerText })
	}

	if (text) {
		submessages.push({ messageType: 2, messageText: text })
	}

	for (const expr of expressions) {
		const { buffer } = await renderLatexToPngFn(expr.latexExpression)
		const uploadResult = await uploadFn(buffer, 'image')
		const imageUrl = uploadResult.url || uploadResult.directPath

		submessages.push({
			messageType: 3,
			imageMetadata: {
				imageUrl: {
					imagePreviewUrl: imageUrl,
					imageHighResUrl: imageUrl
				},
				imageText: expr.latexExpression,
				alignment: 2
			}
		})
	}

	if (footer) {
		submessages.push({ messageType: 2, messageText: footer })
	}

	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(submessages, ctxInfo),
		messageId: generateMessageID()
	}
}

export const generateMarkdownContent = (
	text: string,
	quoted?: any,
	options: { botJid?: string; mentions?: string[] } = {}
): { message: proto.IMessage; messageId: string } => {
	const submessages: any[] = [
		{
			messageType: 2,
			messageText: text
		}
	]

	const sections = submessages
		.map(sm => {
			if (sm.messageType === 2) {
				return {
					view_model: {
						primitive: {
							text: sm.messageText,
							__typename: 'GenAIMarkdownTextUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}

			return null
		})
		.filter(Boolean)

	const unifiedResponse = {
		data: Buffer.from(
			JSON.stringify({
				response_id: crypto.randomUUID(),
				sections
			})
		).toString('base64')
	}

	const ctxInfo = buildRichContextInfo(quoted, options)
	return {
		message: buildBotForwardedMessage(submessages, ctxInfo, unifiedResponse),
		messageId: generateMessageID()
	}
}

export const captureUnifiedResponse = (
	msg: any
): { unifiedResponse: { data: string | Buffer }; submessages: any[]; contextInfo: any } | null => {
	const botFwd = msg?.botForwardedMessage?.message
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
	quoted: any,
	captured: { submessages: any[]; unifiedResponse: { data: string | Buffer } }
): { message: proto.IMessage; messageId: string } => {
	const ctxInfo = buildRichContextInfo(quoted)
	return {
		message: buildBotForwardedMessage(captured.submessages, ctxInfo, captured.unifiedResponse),
		messageId: generateMessageID()
	}
}

export const generateRichMessageContent = (
	submessages: any[],
	quoted?: any,
	options: {
		botJid?: string
		mentions?: string[]
		useMarkdown?: boolean
		unifiedResponse?: { data: string | Buffer }
	} = {}
): { message: proto.IMessage; messageId: string } => {
	const ctxInfo = buildRichContextInfo(quoted, options)

	let unifiedResponse = options.unifiedResponse
	if (options.useMarkdown && !unifiedResponse) {
		const sections = submessages
			.map(sm => {
				if (sm.messageType === 2) {
					return {
						view_model: {
							primitive: { text: sm.messageText, __typename: 'GenAIMarkdownTextUXPrimitive' },
							__typename: 'GenAISingleLayoutViewModel'
						}
					}
				}

				if (sm.messageType === 4 && sm.tableMetadata) {
					return {
						view_model: {
							primitive: {
								rows: sm.tableMetadata.rows.map((r: any) => ({
									is_header: !!r.isHeading,
									cells: r.items
								})),
								__typename: 'GenATableUXPrimitive'
							},
							__typename: 'GenAISingleLayoutViewModel'
						}
					}
				}

				if (sm.messageType === 5 && sm.codeMetadata) {
					return {
						view_model: {
							primitive: {
								language: sm.codeMetadata.codeLanguage || 'javascript',
								code_blocks: sm.codeMetadata.codeBlocks.map((cb: any) => ({
									content: cb.codeContent,
									type: 'DEFAULT'
								})),
								__typename: 'GenAICodeUXPrimitive'
							},
							__typename: 'GenAISingleLayoutViewModel'
						}
					}
				}

				if (sm.messageType === 3 && sm.imageMetadata) {
					return {
						view_model: {
							primitive: {
								media: {
									url: sm.imageMetadata.imageUrl?.imageHighResUrl || sm.imageMetadata.imageUrl?.imagePreviewUrl,
									mime_type: 'image/png'
								},
								imagine_type: 'IMAGE',
								status: { status: 'READY' },
								__typename: 'GenAIImaginePrimitive'
							},
							__typename: 'GenAISingleLayoutViewModel'
						}
					}
				}

				return null
			})
			.filter(Boolean)

		if (sections.length > 0) {
			unifiedResponse = {
				data: Buffer.from(
					JSON.stringify({
						response_id: crypto.randomUUID(),
						sections
					})
				).toString('base64')
			}
		}
	}

	return {
		message: buildBotForwardedMessage(submessages, ctxInfo, unifiedResponse),
		messageId: generateMessageID()
	}
}

/** Render LaTeX to PNG image using the online codecogs API. */
export async function renderLatexToPng(latexExpr: string): Promise<{ buffer: Buffer; width: number; height: number }> {
	const encoded = encodeURIComponent(latexExpr)
	const url = `https://latex.codecogs.com/png.image?%5Cdpi%7B1200%7D%5Cbg%7Bwhite%7D${encoded}`
	const res = await fetch(url)
	if (!res.ok) throw new Error(`[renderLatexToPng] HTTP ${res.status}`)
	const buffer = Buffer.from(await res.arrayBuffer())
	return { buffer, width: 1200, height: 600 }
}

/** Helper to upload an unencrypted buffer to WhatsApp CDN. */
export async function uploadUnencryptedToWA(
	buffer: Buffer,
	waUploadToServer: (
		path: string,
		opts: { mediaType: string; fileEncSha256B64: string }
	) => Promise<{ mediaUrl?: string; directPath?: string }>
): Promise<{ url: string | undefined; directPath: string | undefined }> {
	const fs = await import('fs')
	const path = await import('path')
	const os = await import('os')
	const sha256B64 = crypto.createHash('sha256').update(buffer).digest('base64')
	const tmpPath = path.join(os.tmpdir(), `wa_upload_${Date.now()}.png`)
	await fs.promises.writeFile(tmpPath, buffer)
	try {
		const result = await waUploadToServer(tmpPath, {
			mediaType: 'image',
			fileEncSha256B64: sha256B64
		})
		return {
			url: result.mediaUrl || (result.directPath ? getUrlFromDirectPath(result.directPath) : undefined),
			directPath: result.directPath
		}
	} finally {
		try {
			await fs.promises.unlink(tmpPath)
		} catch (_) {
			// ignore cleanup errors
		}
	}
}

// ── Full Rich-Response builder (richResponse / code / links / table) ─────────

export const toUnified = (submessages: any[], uuid?: string): any => ({
	response_id: uuid || crypto.randomUUID(),
	sections: submessages.map(submessage => {
		switch (submessage.messageType) {
			case RichSubMessageType.CODE_BLOCK: {
				const codeMetadata = submessage.codeMetadata
				return {
					view_model: {
						primitive: {
							language: codeMetadata.codeLanguage,
							code_blocks: codeMetadata.codeBlocks.map((block: CodeBlockToken) => ({
								content: block.codeContent,
								type: CodeHighlightType[block.highlightType] || 'DEFAULT'
							})),
							__typename: 'GenAICodeUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}

			case RichSubMessageType.CONTENT_ITEMS:
			case RichSubMessageType.IMAGE:
			case RichSubMessageType.LATEX:
				return {}

			case RichSubMessageType.TABLE: {
				const tableMetadata = submessage.tableMetadata
				return {
					view_model: {
						primitive: {
							title: tableMetadata.title,
							rows: tableMetadata.rows.map((row: any) => ({
								is_header: row.isHeading,
								cells: row.items,
								markdown_cells: row.items.map((item: string) => ({ text: item }))
							})),
							__typename: 'GenATableUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}

			case RichSubMessageType.TEXT:
				return {
					view_model: {
						primitive: {
							text: submessage.messageText,
							inline_entities: submessage.inlineEntities || [],
							__typename: 'GenAIMarkdownTextUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
		}

		return submessage
	})
})

export interface RichResponseLinkSource {
	displayName?: string
	subtitle?: string
	url?: string
}

export interface RichResponseLink {
	text: string
	url?: string
	title?: string
	displayName?: string
	sources?: RichResponseLinkSource[]
}

export interface RichResponseSubmessage {
	text?: string
	inlineEntities?: any[]
	code?: string
	language?: string
	items?: any
	inlineImage?: any
	imageText?: string
	alignment?: number
	tapLinkUrl?: string
	inlineVideo?: any
	latex?: LatexExpression[]
	posts?: any
	products?: any
	suggested?: any
	table?: string[][]
	title?: string
	[key: string]: unknown
}

export interface RichResponseContent {
	headerText?: string
	contentText?: string
	footerText?: string
	disclaimerText?: string
	code?: string
	language?: string
	items?: any
	inlineImage?: any
	imageText?: string
	alignment?: number
	tapLinkUrl?: string
	inlineVideo?: any
	latex?: LatexExpression[]
	links?: RichResponseLink[]
	posts?: any
	products?: any
	suggested?: any
	table?: string[][]
	title?: string
	noHeading?: boolean
	richResponse?: RichResponseSubmessage[]
	text?: string
	contextInfo?: any
	mentions?: string[]
	mentionAll?: boolean
}

const DONATE_URL = 'https://www.whatsapp.com'

export const prepareRichResponseMessage = (content: RichResponseContent): proto.IMessage => {
	const {
		alignment,
		code,
		contentText,
		disclaimerText,
		footerText,
		headerText,
		imageText,
		inlineImage,
		inlineVideo,
		items,
		language,
		latex,
		links,
		noHeading,
		posts,
		products,
		suggested,
		richResponse,
		table,
		tapLinkUrl,
		title
	} = content

	let submessages: any[] = []

	if (Array.isArray(richResponse)) {
		submessages = richResponse.map(submessage => {
			if (submessage.text) {
				return {
					messageType: RichSubMessageType.TEXT,
					messageText: submessage.text,
					inlineEntities: submessage.inlineEntities
				}
			} else if (submessage.code) {
				return {
					messageType: RichSubMessageType.CODE_BLOCK,
					codeMetadata: { codeLanguage: submessage.language, codeBlocks: submessage.code }
				}
			} else if (submessage.items) {
				return {
					messageType: RichSubMessageType.CONTENT_ITEMS,
					contentItemsMetadata: { itemsMetadata: submessage.items, contentType: 0 }
				}
			} else if (submessage.inlineImage) {
				return {
					messageType: RichSubMessageType.IMAGE,
					imageMetadata: {
						imageUrl: submessage.inlineImage,
						imageText: submessage.imageText,
						alignment: submessage.alignment,
						tapLinkUrl: submessage.tapLinkUrl
					}
				}
			} else if (submessage.inlineVideo) {
				return { messageType: RichSubMessageType.TEXT, messageText: 'INLINE_VIDEO' }
			} else if (submessage.latex) {
				return {
					messageType: RichSubMessageType.LATEX,
					latexMetadata: { text: submessage.text, expressions: submessage.latex }
				}
			} else if (submessage.posts) {
				return { messageType: RichSubMessageType.TEXT, messageText: 'POSTS' }
			} else if (submessage.products) {
				return { messageType: RichSubMessageType.TEXT, messageText: 'PRODUCTS' }
			} else if (submessage.suggested) {
				return { messageType: RichSubMessageType.TEXT, messageText: 'SUGGESTED_PROMPT' }
			} else if (submessage.table) {
				return {
					messageType: RichSubMessageType.TABLE,
					tableMetadata: { title: submessage.title, rows: submessage.table }
				}
			}

			return submessage
		})
	} else {
		if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
		if (contentText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: contentText })
		if (code) {
			const lang = language || 'javascript'
			submessages.push({
				messageType: RichSubMessageType.CODE_BLOCK,
				codeMetadata: { codeLanguage: lang, codeBlocks: tokenizeCode(code, lang) }
			})
		}

		if (items) {
			submessages.push({
				messageType: RichSubMessageType.CONTENT_ITEMS,
				contentItemsMetadata: { itemsMetadata: items, contentType: 0 }
			})
		}

		if (inlineImage) {
			submessages.push({
				messageType: RichSubMessageType.IMAGE,
				imageMetadata: { imageUrl: inlineImage, imageText, alignment, tapLinkUrl }
			})
		}

		if (inlineVideo) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: 'INLINE_VIDEO' })
		if (latex)
			submessages.push({
				messageType: RichSubMessageType.LATEX,
				latexMetadata: { text: content.text, expressions: latex }
			})

		if (links) {
			links.forEach((linkField, index) => {
				const prefix = 'SS_' + index
				const url = linkField.url || DONATE_URL
				const sources = linkField.sources?.map(sourceField => ({
					source_type: 'THIRD_PARTY',
					source_display_name: sourceField.displayName || 'Donate',
					source_subtitle: sourceField.subtitle || '',
					source_url: sourceField.url || url
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
								reference_title: linkField.title || 'Citation Reference',
								reference_display_name: linkField.displayName || 'Reference',
								sources: sources || [],
								__typename: 'GenAISearchCitationItem'
							}
						}
					]
				})
			})
		}

		if (posts) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: 'POSTS' })
		if (products) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: 'PRODUCTS' })
		if (suggested) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: 'SUGGESTED_PROMPT' })
		if (table) {
			submessages.push({
				messageType: RichSubMessageType.TABLE,
				tableMetadata: {
					title,
					rows: table.map((rowItems, index) => ({
						isHeading: !noHeading && index === 0,
						items: rowItems
					}))
				}
			})
		}

		if (footerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footerText })
	}

	const uuid = crypto.randomUUID()
	const unified = toUnified(submessages, uuid)
	const richResponseMessage: any = {
		submessages,
		messageType: 0,
		unifiedResponse: { data: Buffer.from(JSON.stringify(unified)) },
		contextInfo: {
			...(content.contextInfo || {}),
			isForwarded: true,
			forwardingScore: 1,
			forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
			forwardOrigin: 4
		}
	}

	const wrapped = buildBotForwardedMessage(
		submessages,
		richResponseMessage.contextInfo,
		richResponseMessage.unifiedResponse
	) as any

	if (disclaimerText) {
		wrapped.messageContextInfo.botMetadata.messageDisclaimerText = disclaimerText
	}

	wrapped.messageContextInfo.botMetadata.botResponseId = uuid

	return wrapped as proto.IMessage
}
