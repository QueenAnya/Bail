/**
 * Rich message helpers re-exported from addons layer
 * Source: @innovatorssoft/baileys Socket/rich-messages.js
 */
export {
	generateTableContent,
	generateListContent,
	generateCodeBlockContent,
	generateLatexContent,
	generateLatexImageContent,
	generateLatexInlineImageContent,
	captureUnifiedResponse,
	generateUnifiedResponseContent,
	generateRichMessageContent
} from '../addons/rich-message-composer'

export type { RichLatexExpression as LatexExpression } from '../addons/rich-message-composer'
