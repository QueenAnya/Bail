/**
 * Re-export shim — message-composer → addons/rich-message-composer
 * Kept for backward compatibility with existing imports
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
	generateRichMessageContent,
	buildBotForwardedMessage,
	buildRichContextInfo
} from '../addons/rich-message-composer.js'

export type {
	RichLatexExpression as LatexExpression,
	RichCodeOptions,
	RichTableOptions,
	RichLatexOptions
} from '../addons/rich-message-composer.js'
