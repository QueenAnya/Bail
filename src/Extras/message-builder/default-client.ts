/**
 * Default socket for the builders (`Button`, `ButtonV2`, `Carousel`, `AIRich`).
 *
 * `new MB.AIRich()` normally needs the socket as its first argument. Every socket made by `makeWASocket`
 * registers itself here, so when exactly one socket is alive the builders can be created without it.
 * With several live sockets this refuses to guess, because a message could leave through the wrong
 * account: use `sock.AIRich` / `sock.MB` (bound to that socket) or pass the socket explicitly.
 */
const sockets = new Set<object>()

/** Registers a socket; returns the function that removes it again. */
export const registerDefaultClient = (sock: object) => {
	sockets.add(sock)
	return () => {
		sockets.delete(sock)
	}
}

/** Returns `client` when given, otherwise the only live socket. */
export const resolveClient = (client?: any) => {
	if (client) {
		return client
	}

	if (sockets.size === 1) {
		return sockets.values().next().value
	}

	throw new Error(
		sockets.size > 1
			? 'Socket is required: several sockets are active, use sock.AIRich / sock.MB or pass the socket explicitly'
			: 'Socket is required'
	)
}
