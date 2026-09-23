export interface UsernameResolutionResult {
	username: string
	jid?: string
	lid?: string
	pn?: string
}

export interface UsernameCacheEntry extends UsernameResolutionResult {
	resolvedAt: number
	notFound?: boolean
}

export type MessageTarget =
	string | { type: 'jid'; jid: string } | { type: 'username'; username: string } | { type: 'lid'; lid: string }

export class UsernameError extends Error {
	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
	}
}

export class UsernameNotFoundError extends UsernameError {
	readonly username: string
	constructor(username: string) {
		super(`Username not found: ${username}`)
		this.username = username
	}
}

export class UsernameInvalidError extends UsernameError {
	readonly username: string
	constructor(username: string, reason?: string) {
		super(`Invalid username "${username}"${reason ? `: ${reason}` : ''}`)
		this.username = username
	}
}

export class UsernameResolutionError extends UsernameError {
	readonly username: string
	readonly originalError?: unknown
	constructor(username: string, originalError?: unknown) {
		super(
			`Failed to resolve username "${username}": ${
				originalError instanceof Error ? originalError.message : originalError || 'Unknown error'
			}`
		)
		this.username = username
		this.originalError = originalError
	}
}

export class UsernameProtocolError extends UsernameError {}

export class UsernameResolutionTimeoutError extends UsernameError {
	readonly username: string
	constructor(username: string) {
		super(`Username resolution timed out for "${username}"`)
		this.username = username
	}
}
