/**
 * Rich Message Utils — correct botForwardedMessage with unifiedResponse.data Buffer injection
 * Source: @itsliaaa/baileys rich-message-utils.js (Lia@Changes 09-04-26)
 *
 * This is the CORRECT implementation for iOS/Android rendering of Meta AI rich messages.
 * The key difference: injects unifiedResponse.data as a Buffer (ArrayBufferLike) which
 * WA clients need to render tables, code blocks, LaTeX, etc.
 */
import { getRandomValues, randomBytes, randomUUID } from 'crypto'
import { proto } from '../../WAProto/index.js'
import { BOT_RENDERING_CONFIG_METADATA, DONATE_URL } from '../Defaults/index.js'
import { unixTimestampSeconds } from '../Utils/generics.js'
import { CodeHighlightType, RichSubMessageType, LANGUAGE_KEYWORDS } from './rich-types.js'

export type { CodeHighlightType, RichSubMessageType }

// ── Tokenizer (LEXER_REGEX approach from itsliaaa) ──────────────────────────

const LEXER_REGEX =
	/(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|([a-zA-Z_$][\w$]*(?=\s*\())|([a-zA-Z_$][\w$]*)|(\b\d+(?:\.\d+)?\b)|([^\w\s$"'`#/]+|\s+)/g

export const tokenizeCode = (code: string, language = 'javascript') => {
	const keywords = LANGUAGE_KEYWORDS[language] || new Set<string>()
	const blocks: { highlightType: CodeHighlightType; codeContent: string }[] = []
	LEXER_REGEX.lastIndex = 0
	let match: RegExpExecArray | null
	while ((match = LEXER_REGEX.exec(code)) !== null) {
		if (match[1]) blocks.push({ highlightType: CodeHighlightType.COMMENT, codeContent: match[1] })
		else if (match[2]) blocks.push({ highlightType: CodeHighlightType.STRING, codeContent: match[2] })
		else if (match[3])
			blocks.push({
				highlightType: keywords.has(match[3]) ? CodeHighlightType.KEYWORD : CodeHighlightType.METHOD,
				codeContent: match[3]
			})
		else if (match[4])
			blocks.push({
				highlightType: keywords.has(match[4]) ? CodeHighlightType.KEYWORD : CodeHighlightType.DEFAULT,
				codeContent: match[4]
			})
		else if (match[5]) blocks.push({ highlightType: CodeHighlightType.NUMBER, codeContent: match[5] })
		else blocks.push({ highlightType: CodeHighlightType.DEFAULT, codeContent: match[6] || match[0] })
	}
	return blocks
}

// ── toUnified — builds JSON payload for unifiedResponse.data Buffer ──────────

export const toUnified = (submessages: proto.IAIRichResponseSubMessage[]) => ({
	response_id: randomUUID(),
	sections: submessages.map(submessage => {
		switch (submessage.messageType) {
			case RichSubMessageType.CODE: {
				const cm = submessage.codeMetadata!
				return {
					view_model: {
						primitive: {
							language: cm.codeLanguage,
							code_blocks: (cm.codeBlocks || []).map((b: any) => ({
								content: b.codeContent,
								type: CodeHighlightType[b.highlightType]
							})),
							__typename: 'GenAICodeUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}
			case RichSubMessageType.CONTENT_ITEMS: {
				const items = submessage.contentItemsMetadata!.itemsMetadata || []
				return {
					view_model: {
						primitives: items.map((item: any) => {
							const r = item.reelItem
							return {
								reels_url: r.videoUrl,
								thumbnail_url: r.thumbnailUrl,
								creator: r.creator || '@itsliaaa/baileys',
								avatar_url: r.profileIconUrl,
								reels_title: r.title,
								likes_count: r.likesCount || 0,
								shares_count: r.sharesCount || 0,
								view_count: r.viewCount || 0,
								reel_source: r.reelSource || 'IG',
								is_verified: r.isVerified || false,
								__typename: 'GenAIReelPrimitive'
							}
						}),
						__typename: 'GenAIHScrollLayoutViewModel'
					}
				}
			}
			case RichSubMessageType.LATEX: {
				const lm = submessage.latexMetadata!
				const expr = (lm.expressions || [])[0]
				const item = {
					latex_expression: expr?.latexExpression,
					font_height: expr?.fontHeight,
					padding: 15,
					latex_image: { url: expr?.url, width: expr?.width || 388, height: expr?.height || 160 }
				}
				return {
					view_model: {
						primitive: { item, ...item, __typename: 'GenAILatexUXPrimitive' },
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
			}
			case RichSubMessageType.TABLE: {
				const tm = submessage.tableMetadata!
				return {
					view_model: {
						primitive: {
							title: tm.title,
							rows: (tm.rows || []).map((r: any) => ({ is_header: r.isHeading, cells: r.items, markdown_cells: [] })),
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
							inline_entities: (submessage as any).inlineEntities || [],
							__typename: 'GenAIMarkdownTextUXPrimitive'
						},
						__typename: 'GenAISingleLayoutViewModel'
					}
				}
		}
		return submessage
	})
})

// ── Bot metadata helpers ──────────────────────────────────────────────────────

export const botMetadataSignature = () => {
	const s = new Uint8Array(64)
	getRandomValues(s)
	return s
}
export const botMetadataCertificate = (length = 700) => {
	const c = new Uint8Array(length)
	c[0] = 48
	c[1] = 130
	getRandomValues(c.subarray(2))
	return c
}

export const wrapToBotForwardedMessage = (richResponseMessage: proto.IAIRichResponseMessage): proto.IMessage => ({
	messageContextInfo: {
		botMetadata: {
			pluginMetadata: {},
			verificationMetadata: {
				proofs: [
					{
						certificateChain: [botMetadataCertificate(684), botMetadataCertificate(892)],
						version: 1,
						useCase: 1,
						signature: botMetadataSignature()
					}
				]
			},
			botRenderingConfigMetadata: BOT_RENDERING_CONFIG_METADATA
		}
	},
	botForwardedMessage: { message: { richResponseMessage } }
})

// ── buildAdditionalBotMetadataContext ────────────────────────────────────────

export const buildAdditionalBotMetadataContext = (submessages: proto.IAIRichResponseSubMessage[]) => {
	const sources: any[] = []
	const mediaDetailsMetadataList: any[] = []
	for (let i = 0; i < submessages.length; i++) {
		const sm = submessages[i]!
		if (sm.messageType === RichSubMessageType.CONTENT_ITEMS) {
			const items = sm.contentItemsMetadata?.itemsMetadata || []
			for (const item of items) {
				const r = (item as any).reelItem
				sources.push({
					provider: 0,
					thumbnailCdnUrl: r.thumbnailUrl,
					sourceProviderUrl: r.videoUrl,
					sourceQuery: '',
					faviconCdnUrl: '',
					citationNumber: i + 1,
					sourceTitle: r.title
				})
				mediaDetailsMetadataList.push({
					id: randomBytes(32).toString('hex'),
					previewMedia: {
						fileSha256: '',
						mediaKey: '',
						fileEncSha256: '',
						directPath: '',
						mediaKeyTimestamp: unixTimestampSeconds(),
						mimetype: 'image/jpeg'
					}
				})
			}
		} else if (sm.messageType === RichSubMessageType.LATEX) {
			for (const _expr of sm.latexMetadata?.expressions || []) {
				mediaDetailsMetadataList.push({
					id: randomBytes(32).toString('hex'),
					previewMedia: {
						fileSha256: '',
						mediaKey: '',
						fileEncSha256: '',
						directPath: '',
						mediaKeyTimestamp: unixTimestampSeconds(),
						mimetype: 'image/jpeg'
					}
				})
			}
		}
	}
	return { sources, mediaDetailsMetadataList }
}

// ── prepareRichResponseMessage — main entry point ────────────────────────────

export type RichResponseContent = {
	code?: string
	contentText?: string
	expressions?: any[]
	footerText?: string
	headerText?: string
	items?: any[]
	language?: string
	links?: Array<{
		text: string
		url?: string
		title?: string
		displayName?: string
		sources?: Array<{ displayName?: string; subtitle?: string; url?: string }>
	}>
	noHeading?: boolean
	richResponse?: any[]
	table?: string[][]
	text?: string
	title?: string
}

export const prepareRichResponseMessage = (content: RichResponseContent): proto.IMessage => {
	const {
		code,
		contentText,
		expressions,
		footerText,
		headerText,
		items,
		language,
		links,
		noHeading,
		richResponse,
		table,
		text,
		title
	} = content
	let submessages: proto.IAIRichResponseSubMessage[] = []

	if (Array.isArray(richResponse)) {
		submessages = richResponse.map(sm => {
			if (sm.text)
				return {
					messageType: RichSubMessageType.TEXT,
					messageText: sm.text,
					...(sm.inlineEntities ? { inlineEntities: sm.inlineEntities } : {})
				}
			if (sm.code)
				return {
					messageType: RichSubMessageType.CODE,
					codeMetadata: { codeLanguage: sm.language, codeBlocks: sm.code }
				}
			if (sm.expressions)
				return { messageType: RichSubMessageType.LATEX, latexMetadata: { text: sm.text, expressions: sm.expressions } }
			if (sm.items)
				return { messageType: RichSubMessageType.CONTENT_ITEMS, contentItemsMetadata: { itemsMetadata: sm.items } }
			if (sm.table) return { messageType: RichSubMessageType.TABLE, tableMetadata: { title: sm.title, rows: sm.table } }
			return sm
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
		} else if (expressions) {
			submessages.push({ messageType: RichSubMessageType.LATEX, latexMetadata: { text, expressions } })
		} else if (items) {
			submessages.push({
				messageType: RichSubMessageType.CONTENT_ITEMS,
				contentItemsMetadata: {
					itemsMetadata: items.map(item => ({ reelItem: item })),
					contentType: proto.AIRichResponseContentItemsMetadata.ContentType.CAROUSEL
				}
			})
		} else if (links) {
			links.forEach((linkField, index) => {
				const prefix = 'SS_' + index
				const url = linkField.url || DONATE_URL
				const sources = linkField.sources?.map(s => ({
					source_type: 'THIRD_PARTY',
					source_display_name: s.displayName || 'Donate',
					source_subtitle: s.subtitle || 'Saweria',
					source_url: s.url || url
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
								reference_title: linkField.title || 'Reference',
								reference_display_name: linkField.displayName || 'Link',
								sources: sources || [],
								__typename: 'GenAISearchCitationItem'
							}
						}
					]
				} as any)
			})
		} else if (table) {
			submessages.push({
				messageType: RichSubMessageType.TABLE,
				tableMetadata: {
					title,
					rows: table.map((row, index) => ({ isHeading: !noHeading && index === 0, items: row }))
				}
			})
		}

		if (footerText) submessages.push({ messageType: RichSubMessageType.TEXT, messageText: footerText })
	}

	const unified = toUnified(submessages)
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

	const { sources, mediaDetailsMetadataList } = buildAdditionalBotMetadataContext(submessages)
	const botMetadata = (message as any).messageContextInfo.botMetadata
	if (sources.length > 0) botMetadata.richResponseSourcesMetadata = { sources }
	if (mediaDetailsMetadataList.length > 0) botMetadata.unifiedResponseMutation = { mediaDetailsMetadataList }

	return message
}
