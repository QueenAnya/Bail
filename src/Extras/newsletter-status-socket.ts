/**
 * The socket-shaped facade over the newsletter status API.
 *
 * Upstream (elaina-baileys) attaches each operation to the socket individually:
 *   sock.sendNewsletterStatus = makeNewsletterStatusSender(sock, config)
 *   sock.sendNewsletterStatusReaction = makeNewsletterStatusReactionSender(sock)
 *   ...
 *
 * This fork hands the same five methods back as one object so `Extras/socket.ts` can merge them with the other
 * ported layers in a single spread. The operations themselves live in `newsletter-status.ts`, which is why that
 * file stays byte-identical to upstream; only this composition is local.
 */
import {
	makeNewsletterStatusFetcher,
	makeNewsletterStatusReactionSender,
	makeNewsletterStatusRevokeSender,
	makeNewsletterStatusSender,
	makeNewsletterStatusUpdatesFetcher,
	type NewsletterStatusConfig,
	type NewsletterStatusSocket
} from './newsletter-status'

export const makeNewsletterStatusExtras = (sock: NewsletterStatusSocket, config: NewsletterStatusConfig = {}) => {
	/** the senders read `config.logger` directly, so default it here exactly as the old factory did */
	const resolved: NewsletterStatusConfig = { logger: config.logger ?? sock.logger, ...config }

	return {
		sendNewsletterStatus: makeNewsletterStatusSender(sock, resolved),
		sendNewsletterStatusReaction: makeNewsletterStatusReactionSender(sock),
		revokeNewsletterStatus: makeNewsletterStatusRevokeSender(sock),
		getNewsletterStatuses: makeNewsletterStatusFetcher(sock),
		getNewsletterStatusUpdates: makeNewsletterStatusUpdatesFetcher(sock)
	}
}
