/**
 * Socket layer for everything under `src/ported`: takes the finished tb2 socket and adds the ported methods on top.
 * It is the last layer in `Socket/index.ts`, so the ported methods can use anything the socket already offers.
 *
 * It also wraps `sendMessage`, so the content keys ported from elaina-baileys work in the usual call:
 *   question, questionReply, comment, statusMention, statusQuoted, ...  (see modern-messages.ts)
 *   music, splitPayment, splitPaymentUpdate, paymentReminder            (see payment-messages.ts / status-stickers.ts)
 *   newsletterStatus, statusAudience, addYours, messageAssociation      (decorate other content)
 */
import { makeChatsExtras } from './chats-extras'
import { makeMessagesExtras, type MessagesExtrasConfig, type MessagesExtrasSocket } from './messages-extras'
import { prepareModernMessageContent } from './modern-messages'
import { makeNewsletterExtras } from './newsletter-extras'
import { makeNewsletterStatusExtras, type NewsletterStatusSocket } from './newsletter-status'
import { buildPaymentReminder, buildSplitPayment, buildSplitPaymentUpdate } from './payment-messages'
import { buildMusicMessage } from './status-stickers'

type BaseSocket = Parameters<typeof makeChatsExtras>[0] &
	MessagesExtrasSocket &
	NewsletterStatusSocket & {
		sendMessage: (jid: string, content: any, options?: any) => Promise<any>
	}

type PortedSocket<T extends BaseSocket> = T &
	ReturnType<typeof makeNewsletterExtras> &
	ReturnType<typeof makeChatsExtras> &
	ReturnType<typeof makeMessagesExtras> &
	ReturnType<typeof makeNewsletterStatusExtras> & {
		sendMessage: T['sendMessage']
	}

/** `music`, `splitPayment`, `splitPaymentUpdate`, `paymentReminder` -> raw proto content (tb2's `raw: true` mode) */
const preparePaymentAndMusicContent = (content: any): any => {
	if (!content || typeof content !== 'object' || Array.isArray(content)) {
		return content
	}

	if (content.music) {
		return { raw: true, musicMessage: buildMusicMessage(content.music) }
	}

	if (content.splitPayment) {
		return { raw: true, splitPaymentMessage: buildSplitPayment(content.splitPayment) }
	}

	if (content.splitPaymentUpdate) {
		return { raw: true, splitPaymentUpdateMessage: buildSplitPaymentUpdate(content.splitPaymentUpdate) }
	}

	if (content.paymentReminder) {
		return { raw: true, paymentReminderMessage: buildPaymentReminder(content.paymentReminder) }
	}

	return content
}

export const preparePortedMessageContent = (content: any): any =>
	prepareModernMessageContent(preparePaymentAndMusicContent(content))

export const makePortedSocket = <T extends BaseSocket>(sock: T, config: MessagesExtrasConfig = {}): PortedSocket<T> => {
	const newsletterExtras = makeNewsletterExtras({
		query: sock.query,
		generateMessageTag: sock.generateMessageTag,
		logger: sock.logger
	})
	const chatsExtras = makeChatsExtras(sock)
	const messagesExtras = makeMessagesExtras(sock, config)
	const newsletterStatusExtras = makeNewsletterStatusExtras(sock, { logger: sock.logger, ...config })

	const baseSendMessage = sock.sendMessage.bind(sock)
	const sendMessage = ((jid: string, content: any, options?: any) =>
		baseSendMessage(jid, preparePortedMessageContent(content), options)) as T['sendMessage']

	return {
		...sock,
		...newsletterExtras,
		...chatsExtras,
		...messagesExtras,
		...newsletterStatusExtras,
		sendMessage
	}
}
