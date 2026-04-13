export type WACallUpdateType =
	| 'offer'
	| 'ringing'
	| 'timeout'
	| 'reject'
	| 'accept'
	| 'terminate'
	| 'preaccept'
	| 'group_update'
	| 'reminder'

export type WACallParticipant = {
	jid?: string
	state?: string
	userPn?: string
	type?: string
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
	/** Group call link token */
	linkToken?: string
	/** Link creator JID */
	linkCreator?: string
	/** Link creator phone number */
	linkCreatorPn?: string
	/** Call media type (audio/video) */
	media?: string
	/** Max connected participants */
	connectedLimit?: number
	/** Call participants list */
	participants?: WACallParticipant[]
	/** Reason for call termination */
	terminateReason?: string
	/** Call duration in seconds */
	duration?: number
}
