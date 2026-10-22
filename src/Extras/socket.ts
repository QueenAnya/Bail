/**
 * Socket layer for everything under `src/Extras`: takes the finished tb2 socket and adds the ported methods on top.
 * It is the last layer in `Socket/index.ts`, so the ported methods can use anything the socket already offers.
 *
 * It also wraps `sendMessage`, so the content keys ported from elaina-baileys work in the usual call:
 *   question, questionReply, comment, statusMention, statusQuoted, ...  (see modern-messages.ts)
 *   music, splitPayment, splitPaymentUpdate, paymentReminder            (see payment-messages.ts / status-stickers.ts)
 *   newsletterStatus, statusAudience, addYours, messageAssociation      (decorate other content)
 */
import { makeChatsExtras } from './chats-extras'
import { AIRich, AIRichCarousel, Button, ButtonV2, MB } from './MessageBuilder/index'
import './MessageBuilder/attach-static-helpers'
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
		/** MessageBuilder bound to this socket: `new sock.MB.AIRich()`, `sock.MB.sendA2UI(jid, ...)`, ... (no socket argument). */
		MB: BoundMessageBuilder
		/** AIRich class bound to this socket: `new sock.AIRich()` (no socket argument). */
		AIRich: BoundBuilderClass<typeof AIRich>
	}

/**
 * `MB` bound to one socket: the builder classes get the socket as their first constructor argument and the
 * `send*` helpers (`sendA2UI`, `sendAIRichMessage`, ...) as their first call argument, so none of them need it.
 * Everything else on `MB` is passed through unchanged.
 */
export const bindMessageBuilder = (sock: object) => {
	const bindClass = <C extends new (client: any, ...args: any[]) => any>(Base: C) =>
		class extends (Base as any) {
			constructor(...args: any[]) {
				super(sock, ...args)
			}
		} as unknown as new (...args: any[]) => InstanceType<C>

	const bound: Record<string, any> = { ...MB }
	for (const [name, value] of Object.entries(MB)) {
		if (typeof value === 'function' && /^send[A-Z]/.test(name)) {
			bound[name] = (...args: any[]) => (value as any)(sock, ...args)
		}
	}

	const BoundAIRich = Object.assign(bindClass(AIRich), AIRich)
	bound.AIRich = BoundAIRich
	bound.Button = Object.assign(bindClass(Button), Button)
	bound.ButtonV2 = Object.assign(bindClass(ButtonV2), ButtonV2)
	bound.Carousel = bound.AIRichCarousel = Object.assign(bindClass(AIRichCarousel), AIRichCarousel)
	return bound as BoundMessageBuilder
}

/** A builder class whose constructor no longer takes the socket as first argument. */
type BoundBuilderClass<C extends abstract new (client: any, ...args: any[]) => any> = (new (
	...args: ConstructorParameters<C> extends [any, ...infer Rest] ? Rest : never
) => InstanceType<C>) &
	Omit<C, 'prototype'>

type BoundMessageBuilder = Omit<typeof MB, 'AIRich' | 'Button' | 'ButtonV2' | 'Carousel' | 'AIRichCarousel'> & {
	AIRich: BoundBuilderClass<typeof AIRich>
	Button: BoundBuilderClass<typeof Button>
	ButtonV2: BoundBuilderClass<typeof ButtonV2>
	Carousel: BoundBuilderClass<typeof AIRichCarousel>
	AIRichCarousel: BoundBuilderClass<typeof AIRichCarousel>
	[name: string]: any
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

	const ported = {
		...sock,
		...newsletterExtras,
		...chatsExtras,
		...messagesExtras,
		...newsletterStatusExtras,
		sendMessage
	} as unknown as PortedSocket<T>

	// socket-bound builders: `new sock.AIRich()`, `sock.MB.sendA2UI(jid, ...)`. The global `MB` stays as in elaina-baileys
	// (`new MB.AIRich(sock)`).
	const boundMB = bindMessageBuilder(ported)
	ported.MB = boundMB
	ported.AIRich = boundMB.AIRich

	return ported
}
