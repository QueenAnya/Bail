/**
 * Rich Response System (botForwardedMessage / AI-style messages)
 *
 * Builds richResponseMessage payloads that render as WhatsApp AI bot messages:
 * — Code blocks with syntax highlighting
 * — LaTeX expressions
 * — Tables
 * — Inline text with entities (citation links)
 * — Reel/content-item carousels
 *
 * Source: @itsliaaa/baileys (rich-message-utils.js) — most complete,
 * with unifiedResponse.data Buffer encoding for proper rendering.
 */

import { randomBytes, randomUUID } from 'crypto'
import { proto } from '../../WAProto/index.js'
import { unixTimestampSeconds } from '../Utils/generics.js'
import { tokenizeCode } from './message-composer.js'
import type { CodeBlockToken } from './message-composer.js'

// ─── Sub-message type enum ────────────────────────────────────────────────────

export enum RichSubMessageType {
	TEXT = 0,
	CODE = 1,
	CONTENT_ITEMS = 2,
	LATEX = 3,
	TABLE = 4
}

// ─── Input types ──────────────────────────────────────────────────────────────

export interface RichTextSubmessage {
	text: string
	inlineEntities?: any[]
}
export interface RichCodeSubmessage {
	code: CodeBlockToken[]
	language?: string
}
export interface RichTableSubmessage {
	table: Array<{ isHeading?: boolean; items: string[] }>
	title?: string
}
export interface RichLatexSubmessage {
	expressions: Array<{
		latexExpression: string
		url?: string
		width?: number
		height?: number
		fontHeight?: number
	}>
	text?: string
}
export interface RichReelItem {
	videoUrl: string
	thumbnailUrl: string
	title: string
	creator?: string
	profileIconUrl?: string
	likesCount?: number
	sharesCount?: number
	viewCount?: number
	reelSource?: string
	isVerified?: boolean
}
export interface RichContentItemsSubmessage {
	items: RichReelItem[]
}

export type RichSubmessage =
	| { messageType: RichSubMessageType.TEXT; messageText: string; inlineEntities?: any[] }
	| { messageType: RichSubMessageType.CODE; codeMetadata: { codeLanguage: string; codeBlocks: CodeBlockToken[] } }
	| {
			messageType: RichSubMessageType.TABLE
			tableMetadata: { title?: string; rows: Array<{ isHeading?: boolean; items: string[] }> }
	  }
	| { messageType: RichSubMessageType.LATEX; latexMetadata: { text?: string; expressions: any[] } }
	| {
			messageType: RichSubMessageType.CONTENT_ITEMS
			contentItemsMetadata: { itemsMetadata: any[]; contentType?: number }
	  }

// ─── unifiedResponse builder ──────────────────────────────────────────────────

export const toUnifiedResponse = (submessages: RichSubmessage[]) => ({
	response_id: randomUUID(),
	sections: submessages.map(sm => {
		switch (sm.messageType) {
			case RichSubMessageType.CODE:
				return {
					view_model: {
						primitive: {
							language: sm.codeMetadata.codeLanguage,
							code_blocks: sm.codeMetadata.codeBlocks.map(b => ({
								content: b.codeContent,
								type: b.highlightType.toString()
							})),
							__typename: 'GenAICodeUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			case RichSubMessageType.TABLE:
				return {
					view_model: {
						primitive: {
							title: sm.tableMetadata.title,
							rows: sm.tableMetadata.rows.map(r => ({ is_header: r.isHeading, cells: r.items, markdown_cells: [] })),
							__typename: 'GenATableUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			case RichSubMessageType.LATEX: {
				const expr = sm.latexMetadata.expressions[0]
				const item = {
					latex_expression: expr?.latexExpression,
					font_height: expr?.fontHeight,
					padding: 15,
					latex_image: { url: expr?.url, width: expr?.width ?? 388, height: expr?.height ?? 160 }
				}
				return {
					view_model: {
						primitive: { ...item, item, __typename: 'GenAILatexUXPrimitive' },
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}
			case RichSubMessageType.CONTENT_ITEMS:
				return {
					view_model: {
						primitives: sm.contentItemsMetadata.itemsMetadata.map((meta: any) => {
							const r = meta.reelItem ?? meta
							return {
								reels_url: r.videoUrl,
								thumbnail_url: r.thumbnailUrl,
								creator: r.creator ?? 'Baileys',
								avatar_url: r.profileIconUrl,
								reels_title: r.title,
								likes_count: r.likesCount ?? 0,
								shares_count: r.sharesCount ?? 0,
								view_count: r.viewCount ?? 0,
								reel_source: r.reelSource ?? 'IG',
								is_verified: r.isVerified ?? false,
								__typename: 'GenAIReelPrimitive'
							}
						}),
						__typename: 'GenAIHScrollLayoutViewModel'
					}
				}
			case RichSubMessageType.TEXT:
			default:
				return {
					view_model: {
						primitive: {
							text: sm.messageText,
							inline_entities: sm.inlineEntities ?? [],
							__typename: 'GenAIMarkdownTextUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
		}
	})
})

// ─── Wrapper builder ──────────────────────────────────────────────────────────

const genCertificate = (length = 700) => {
	const cert = new Uint8Array(length)
	cert[0] = 48
	cert[1] = 130
	cert.set(randomBytes(length - 2), 2)
	return cert
}

const genSignature = () => {
	const sig = new Uint8Array(64)
	sig.set(randomBytes(64))
	return sig
}

export const wrapToBotForwardedMessage = (richResponseMessage: any): proto.IMessage => ({
	messageContextInfo: {
		botMetadata: {
			pluginMetadata: {},
			verificationMetadata: {
				proofs: [
					{
						certificateChain: [genCertificate(684), genCertificate(892)],
						version: 1,
						useCase: 1,
						signature: genSignature()
					}
				]
			},
			botRenderingConfigMetadata: { renderingPayload: randomBytes(32) }
		}
	},
	botForwardedMessage: {
		message: { richResponseMessage }
	}
})

// ─── High-level prepareRichResponseMessage ────────────────────────────────────

export interface RichResponseInput {
	/** Pre-built array of submessages (full control) */
	richResponse?: Array<{
		text?: string
		inlineEntities?: any[]
		code?: CodeBlockToken[]
		language?: string
		expressions?: any[]
		items?: RichReelItem[]
		table?: Array<{ isHeading?: boolean; items: string[] }>
		title?: string
	}>
	/** Shortcut: plain text header */
	headerText?: string
	/** Shortcut: plain text body */
	contentText?: string
	/** Shortcut: code block */
	code?: string
	language?: string
	/** Shortcut: LaTeX expressions */
	expressions?: any[]
	text?: string
	/** Shortcut: reel/content items carousel */
	items?: RichReelItem[]
	/** Shortcut: citation links */
	links?: Array<{ text: string; url?: string; title?: string; displayName?: string; sources?: any[] }>
	/** Shortcut: table */
	table?: string[][]
	title?: string
	noHeading?: boolean
	/** Plain text footer */
	footerText?: string
}

/**
 * Build and return a complete botForwardedMessage with rich content.
 * Handles text, code blocks, LaTeX, tables, reel carousels, and citation links.
 */
export const prepareRichResponseMessage = (content: RichResponseInput): proto.IMessage => {
	let submessages: RichSubmessage[] = []

	if (Array.isArray(content.richResponse)) {
		submessages = content.richResponse.map((sm): RichSubmessage => {
			if (sm.text)
				return { messageType: RichSubMessageType.TEXT, messageText: sm.text, inlineEntities: sm.inlineEntities }
			if (sm.code)
				return {
					messageType: RichSubMessageType.CODE,
					codeMetadata: { codeLanguage: sm.language ?? 'javascript', codeBlocks: sm.code }
				}
			if (sm.expressions)
				return { messageType: RichSubMessageType.LATEX, latexMetadata: { expressions: sm.expressions } }
			if (sm.items)
				return {
					messageType: RichSubMessageType.CONTENT_ITEMS,
					contentItemsMetadata: { itemsMetadata: sm.items.map(i => ({ reelItem: i })) }
				}
			if (sm.table) return { messageType: RichSubMessageType.TABLE, tableMetadata: { title: sm.title, rows: sm.table } }
			return sm as any
		})
	} else {
		if (content.headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: content.headerText })
		if (content.contentText)
			submessages.push({ messageType: RichSubMessageType.TEXT, messageText: content.contentText })

		if (content.code) {
			const lang = content.language ?? 'javascript'
			submessages.push({
				messageType: RichSubMessageType.CODE,
				codeMetadata: { codeLanguage: lang, codeBlocks: tokenizeCode(content.code, lang) }
			})
		} else if (content.expressions) {
			submessages.push({
				messageType: RichSubMessageType.LATEX,
				latexMetadata: { text: content.text, expressions: content.expressions }
			})
		} else if (content.items) {
			submessages.push({
				messageType: RichSubMessageType.CONTENT_ITEMS,
				contentItemsMetadata: {
					itemsMetadata: content.items.map(item => ({ reelItem: item })),
					contentType: 1
				}
			})
		} else if (content.links) {
			content.links.forEach((link, i) => {
				const prefix = `SS_${i}`
				const url = link.url ?? 'https://github.com/WhiskeySockets/Baileys'
				const sources = link.sources?.map(s => ({
					source_type: 'THIRD_PARTY',
					source_display_name: s.displayName ?? link.displayName ?? 'Baileys',
					source_subtitle: s.subtitle ?? '',
					source_url: s.url ?? url
				}))
				submessages.push({
					messageType: RichSubMessageType.TEXT,
					messageText: `${link.text} {{${prefix}}}¹{{/${prefix}}} `,
					inlineEntities: [
						{
							key: prefix,
							metadata: {
								reference_id: i + 1,
								reference_url: url,
								reference_title: link.title ?? 'Source',
								reference_display_name: link.displayName ?? 'Baileys',
								sources: sources ?? [],
								__typename: 'GenAISearchCitationItem'
							}
						}
					]
				})
			})
		} else if (content.table) {
			submessages.push({
				messageType: RichSubMessageType.TABLE,
				tableMetadata: {
					title: content.title,
					rows: content.table.map((items, idx) => ({
						isHeading: !content.noHeading && idx === 0,
						items
					}))
				}
			})
		}

		if (content.footerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: content.footerText })
	}

	const unified = toUnifiedResponse(submessages)
	const message = wrapToBotForwardedMessage({
		submessages: [],
		messageType: proto.AIRichResponseMessageType.AI_RICH_RESPONSE_TYPE_STANDARD,
		unifiedResponse: { data: Buffer.from(JSON.stringify(unified), 'utf-8') },
		contextInfo: {
			isForwarded: true,
			forwardingScore: 1,
			forwardedAiBotMessageInfo: { botJid: '867051314767696@bot' },
			forwardOrigin: 4,
			botMessageSharingInfo: { forwardScore: 1 }
		}
	})

	return message
}
