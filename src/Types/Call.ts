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

/** Options for initiating an outgoing WhatsApp call */
export type WAInitiateCallOptions = {
	/** Whether to initiate a video call instead of a voice call */
	isVideo?: boolean
}

/** Result returned after successfully initiating an outgoing call */
export type WAInitiateCallResult = {
	/** The unique identifier for the call session */
	callId: string
	/** The JID of the recipient */
	to: string
	/** Whether this is a video call */
	isVideo: boolean
}
