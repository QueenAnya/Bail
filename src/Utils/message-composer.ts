/**
 * Re-export shim — message-composer → addons/message-composer
 * Kept for backward compatibility with existing imports
 * Source: innovatorssoft/baileys (comprehensive rich-message composer)
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
	generateRichMessageContent,
	buildBotForwardedMessage,
	buildRichContextInfo,
	renderLatexToPng,
	uploadUnencryptedToWA
} from '../addons/message-composer.js'

export type { LatexExpression } from '../addons/message-composer.js'
