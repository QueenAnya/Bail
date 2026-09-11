/**
 * Rich message helpers re-exported from addons layer
 */
export {
	generateTableContent,
	generateListContent,
	generateCodeBlockContent,
	generateLatexContent,
	generateLatexImageContent,
	generateLatexInlineImageContent,
	extractUnifiedResponse,
	generateUnifiedResponseContent,
	generateRichMessageContent
} from '../addons/message-composer.js'

export type { LatexExpression } from '../addons/message-composer.js'
