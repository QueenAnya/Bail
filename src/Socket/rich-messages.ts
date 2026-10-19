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
} from '../Addons/message-composer.js'

export type { LatexExpression } from '../Addons/message-composer.js'
