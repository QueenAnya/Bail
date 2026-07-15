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
	generateMarkdownContent,
	captureUnifiedResponse,
	generateUnifiedResponseContent,
	generateRichMessageContent
} from '../addons/message-composer.js'

export type { LatexExpression } from '../addons/message-composer.js'
