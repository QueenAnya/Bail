/**
 * Bot-forwarded rich response wrapper.
 *
 * Ported from the anya-bail merge session (@itsliaaa/baileys lineage) — this
 * file adds ONLY the functionality that was genuinely missing from the
 * existing `message-composer.ts` / `rich-response.ts` pair: the
 * botForwardedMessage envelope (with verification-metadata stubs) and the
 * `unifiedResponse` buffer builder that makes tables/code blocks render
 * correctly inside it. Everything else (tokenizeCode, keyword sets, types,
 * sendTable/sendList/etc.) already existed and is reused as-is.
 */

import { getRandomValues, randomUUID } from 'crypto'
import { proto } from '../../WAProto/index.js'
import { DONATE_URL } from '../Defaults/index.js'
import type { RichSubMessage } from './message-composer.js'
import { CodeHighlightType, RichSubMessageType, tokenizeCode } from './message-composer.js'

export type RichContent = {
	code?: string
	contentText?: string
	/** Alias for contentText */
	text?: string
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
	/** Single inline image with optional caption/link — url string. */
	inlineImage?: string
	imageText?: string
	alignment?: string
	tapLinkUrl?: string
	/** Array of LaTeX expression strings, rendered as a native LATEX submessage */
	latex?: string[]
	noHeading?: boolean
	richResponse?:
		| (
				| { text: string; inlineEntities?: unknown[] }
				| { code: { highlightType: CodeHighlightType; codeContent: string }[]; language: string }
				| { table: { isHeading?: boolean; items: string[] }[]; title?: string }
		  )[]
		/** Shorthand: nest text/code/table/language directly under richResponse instead of at the top level */
		| Omit<RichContent, 'richResponse'>
	table?: string[][]
	title?: string
}

// ─── unifiedResponse builder — injects buffer so tables/code blocks render correctly ─

export const toUnified = (submessages: RichSubMessage[]) => ({
	response_id: randomUUID(),
	sections: submessages.map(submessage => {
		switch (submessage.messageType) {
			case RichSubMessageType.CODE: {
				const meta = submessage.codeMetadata!
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
				const meta = submessage.tableMetadata!
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

			case RichSubMessageType.INLINE_IMAGE: {
				const meta = (submessage as any).imageMetadata
				return {
					view_model: {
						primitive: {
							media: {
								url: meta?.imageUrl?.imageHighResUrl ?? meta?.imageUrl?.imagePreviewUrl ?? meta?.imageUrl,
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

			case RichSubMessageType.LATEX: {
				const meta = (submessage as any).latexMetadata
				return {
					view_model: {
						primitive: {
							text: meta?.text ?? '',
							expressions: meta?.expressions ?? [],
							__typename: 'GenAILatexUXPrimitive'
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

// ─── Bot metadata stubs ─────────────────────────────────────────────────────

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

/**
 * Build a complete botForwardedMessage with richResponseMessage.
 * Supports code, table, text, links, and richResponse arrays.
 */
export const prepareRichResponseMessage = (content: RichContent) => {
	// Support both the flat shape ({ code, text, language, ... } at top level)
	// and the nested shorthand sock.sendMessage(jid, { richResponse: { text, code, language } })
	// — when richResponse is a plain object (not an array), merge its fields
	// into the top-level content before processing.
	if (content.richResponse && !Array.isArray(content.richResponse)) {
		content = { ...content, ...(content.richResponse as unknown as RichContent), richResponse: undefined }
	}

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
	const bodyText = contentText ?? (content as { text?: string }).text

	let submessages: RichSubMessage[] = []

	if (Array.isArray(richResponse)) {
		submessages = richResponse.map(item => {
			if ('text' in item) {
				return { messageType: RichSubMessageType.TEXT, messageText: item.text }
			} else if ('code' in item) {
				return {
					messageType: RichSubMessageType.CODE,
					codeMetadata: { codeLanguage: item.language, codeBlocks: item.code }
				}
			} else {
				return { messageType: RichSubMessageType.TABLE, tableMetadata: { title: item.title ?? '', rows: item.table } }
			}
		})
	} else {
		if (headerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: headerText })
		if (bodyText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: bodyText })

		if (code) {
			const lang = language ?? 'javascript'
			submessages.push({
				messageType: RichSubMessageType.CODE,
				codeMetadata: { codeLanguage: lang, codeBlocks: tokenizeCode(code, lang) }
			})
		}

		if (content.inlineImage) {
			submessages.push({
				messageType: RichSubMessageType.INLINE_IMAGE,
				imageMetadata: {
					imageUrl: content.inlineImage,
					imageText: content.imageText,
					alignment: content.alignment,
					tapLinkUrl: content.tapLinkUrl
				}
			} as unknown as RichSubMessage)
		}

		if (content.latex && content.latex.length > 0) {
			submessages.push({
				messageType: RichSubMessageType.LATEX,
				latexMetadata: { text: bodyText, expressions: content.latex }
			} as unknown as RichSubMessage)
		}

		if (links) {
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
								reference_title: linkField.title ?? 'Citation Reference',
								reference_display_name: linkField.displayName ?? 'Reference',
								sources: sources ?? [],
								__typename: 'GenAISearchCitationItem'
							}
						}
					]
				} as unknown as RichSubMessage)
			})
		}

		if (table) {
			submessages.push({
				messageType: RichSubMessageType.TABLE,
				tableMetadata: {
					title: title ?? '',
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
			data: Buffer.from(JSON.stringify(unified), 'utf-8')
		},
		contextInfo: buildRichContextInfo()
	})

	const message = wrapToBotForwardedMessage(richResponseMessage)
	const botMetadata = message.messageContextInfo.botMetadata

	if (disclaimerText) {
		;(botMetadata as Record<string, unknown>).messageDisclaimerText = disclaimerText
	}

	;(botMetadata as Record<string, unknown>).botResponseId = unified.response_id

	return message
}
