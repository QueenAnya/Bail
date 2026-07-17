/**
 * addon: typing-indicator
 *
 * Manual/standalone typing & recording presence control, for use without
 * the auto-reply system's built-in simulateTyping option.
 */

type SendPresenceFn = (jid: string, presence: string) => Promise<void> | void

export type TypingIndicator = {
	/** Show "typing..." for `duration` ms, then invoke `andThen`, returning its result. */
	simulateTyping: <T>(jid: string, duration: number, andThen: () => Promise<T> | T) => Promise<T>
	/** Start the "composing" presence. Auto-pauses after `opts.duration` ms if given. */
	startTyping: (jid: string, opts?: { duration?: number }) => Promise<void>
	/** Send the "paused" presence, stopping any active typing indicator for this JID. */
	stopTyping: (jid: string) => Promise<void>
	/** Start the "recording" (voice note) presence. Auto-pauses after `opts.duration` ms if given. */
	startRecording: (jid: string, opts?: { duration?: number }) => Promise<void>
	/** Stop all active indicators across all JIDs (e.g. on socket close). */
	stopAll: () => Promise<void>
}

/**
 * Create a typing indicator controller wired to your socket's sendPresenceUpdate.
 * @example
 * const typing = createTypingIndicator((jid, presence) => sock.sendPresenceUpdate(presence, jid))
 * await typing.simulateTyping(jid, 2000, () => sock.sendMessage(jid, { text: 'Hi!' }))
 */
export const createTypingIndicator = (sendPresence: SendPresenceFn): TypingIndicator => {
	const timers = new Map<string, ReturnType<typeof setTimeout>>()

	const clearTimer = (jid: string) => {
		const t = timers.get(jid)
		if (t) {
			clearTimeout(t)
			timers.delete(jid)
		}
	}

	const startPresence = async (jid: string, presence: 'composing' | 'recording', opts?: { duration?: number }) => {
		clearTimer(jid)
		await sendPresence(jid, presence)
		if (opts?.duration) {
			const timer = setTimeout(() => {
				timers.delete(jid)
				void sendPresence(jid, 'paused')
			}, opts.duration)
			timers.set(jid, timer)
		}
	}

	const stopTyping = async (jid: string) => {
		clearTimer(jid)
		await sendPresence(jid, 'paused')
	}

	return {
		simulateTyping: async (jid, duration, andThen) => {
			await startPresence(jid, 'composing', { duration })
			await new Promise(resolve => setTimeout(resolve, duration))
			return andThen()
		},
		startTyping: (jid, opts) => startPresence(jid, 'composing', opts),
		stopTyping,
		startRecording: (jid, opts) => startPresence(jid, 'recording', opts),
		stopAll: async () => {
			const jids = [...timers.keys()]
			for (const jid of jids) {
				clearTimer(jid)
			}

			await Promise.all(jids.map(jid => sendPresence(jid, 'paused')))
		}
	}
}
