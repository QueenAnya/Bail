export type WACallUpdateType =
	| 'offer'
	| 'ringing'
	| 'preaccept'
	| 'transport'
	| 'relaylatency'
	| 'timeout'
	| 'reject'
	| 'accept'
	| 'terminate'

/** Options for initiating an outgoing call — Source: Baileys-feature-outgoing-calls */
export type WAInitiateCallOptions = {
	/** Start as video call (default: false = audio) */
	isVideo?: boolean
}

/** Result returned by initiateCall() — Source: Baileys-feature-outgoing-calls */
export type WAInitiateCallResult = {
	/** Generated call ID */
	callId: string
	/** Recipient JID */
	to: string
	/** Whether this is a video call */
	isVideo: boolean
}

export type WACallEvent = {
	chatId: string
	from: string
	callerPn?: string
	isGroup?: boolean
	groupJid?: string
	id: string
	date: Date
	isVideo?: boolean
	status: WACallUpdateType
	offline: boolean
	latencyMs?: number
}
