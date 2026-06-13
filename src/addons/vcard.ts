/**
 * vCard / Contact Card Generator
 *
 * Source: @innovatorssoft/baileys (vcard.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Generate RFC-3.0 vCard strings and WhatsApp contactMessage / contactsArrayMessage content.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type VCardPhone = {
	number: string
	type?: 'CELL' | 'HOME' | 'WORK' | 'OTHER'
	label?: string
}

export type VCardEmail = {
	email: string
	type?: 'HOME' | 'WORK' | 'OTHER'
}

export type VCardUrl = {
	url: string
	type?: 'HOME' | 'WORK' | 'OTHER'
}

export type VCardAddress = {
	street?: string
	city?: string
	state?: string
	postalCode?: string
	country?: string
	type?: 'HOME' | 'WORK' | 'OTHER'
}

export type VCardContact = {
	fullName: string
	displayName?: string
	organization?: string
	title?: string
	phones?: VCardPhone[]
	emails?: VCardEmail[]
	urls?: VCardUrl[]
	addresses?: VCardAddress[]
	birthday?: string
	note?: string
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

const escape = (s: string): string =>
	s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

const formatPhone = (phone: string): string => phone.replace(/[^\d+]/g, '')

// ─── generateVCard ────────────────────────────────────────────────────────────

/** Generate a vCard 3.0 string from a VCardContact. */
export const generateVCard = (contact: VCardContact): string => {
	const lines: string[] = []
	lines.push('BEGIN:VCARD', 'VERSION:3.0')

	const escapedName = escape(contact.fullName)
	lines.push(`FN:${escapedName}`)

	const parts = contact.fullName.split(' ')
	if (parts.length >= 2) {
		const last = escape(parts[parts.length - 1] ?? '')
		const first = escape(parts.slice(0, -1).join(' '))
		lines.push(`N:${last};${first};;;`)
	} else {
		lines.push(`N:${escapedName};;;;`)
	}

	if (contact.organization) lines.push(`ORG:${escape(contact.organization)}`)
	if (contact.title) lines.push(`TITLE:${escape(contact.title)}`)

	for (const phone of contact.phones ?? []) {
		const t = phone.type ?? 'CELL'
		const num = formatPhone(phone.number)
		if (phone.label) {
			lines.push(`TEL;type=${t};type=VOICE;X-ABLabel=${escape(phone.label)}:${num}`)
		} else {
			lines.push(`TEL;type=${t};type=VOICE:${num}`)
		}
	}

	for (const email of contact.emails ?? []) {
		lines.push(`EMAIL;type=${email.type ?? 'OTHER'}:${email.email}`)
	}

	for (const url of contact.urls ?? []) {
		lines.push(`URL;type=${url.type ?? 'OTHER'}:${url.url}`)
	}

	for (const addr of contact.addresses ?? []) {
		const parts2 = [
			'',
			'',
			addr.street ?? '',
			addr.city ?? '',
			addr.state ?? '',
			addr.postalCode ?? '',
			addr.country ?? ''
		].map(p => escape(p))
		lines.push(`ADR;type=${addr.type ?? 'OTHER'}:${parts2.join(';')}`)
	}

	if (contact.birthday) lines.push(`BDAY:${contact.birthday}`)
	if (contact.note) lines.push(`NOTE:${escape(contact.note)}`)

	lines.push('END:VCARD')
	return lines.join('\r\n')
}

/** Generate multiple vCards joined by CRLF. */
export const generateVCards = (contacts: VCardContact[]): string => contacts.map(generateVCard).join('\r\n')

/** Basic vCard parser (FN, ORG, TITLE, TEL, EMAIL, BDAY, NOTE). */
export const parseVCard = (vcard: string): Partial<VCardContact> => {
	const contact: Partial<VCardContact> = {}
	const unescape = (s: string) => s.replace(/\\([;,n\\])/g, '$1').replace(/\\n/g, '\n')

	for (const line of vcard.split(/\r?\n/)) {
		const colonIdx = line.indexOf(':')
		if (colonIdx === -1) continue
		const key = line.slice(0, colonIdx)
		const value = line.slice(colonIdx + 1)

		if (key.startsWith('FN')) {
			contact.fullName = unescape(value)
		} else if (key.startsWith('ORG')) {
			contact.organization = unescape(value)
		} else if (key.startsWith('TITLE')) {
			contact.title = unescape(value)
		} else if (key.startsWith('TEL')) {
			const typeMatch = key.match(/type=(\w+)/i)
			contact.phones = contact.phones ?? []
			contact.phones.push({
				number: value,
				type: (typeMatch?.[1]?.toUpperCase() ?? 'CELL') as VCardPhone['type']
			})
		} else if (key.startsWith('EMAIL')) {
			const typeMatch = key.match(/type=(\w+)/i)
			contact.emails = contact.emails ?? []
			contact.emails.push({
				email: value,
				type: (typeMatch?.[1]?.toUpperCase() ?? 'OTHER') as VCardEmail['type']
			})
		} else if (key.startsWith('BDAY')) {
			contact.birthday = value
		} else if (key.startsWith('NOTE')) {
			contact.note = unescape(value)
		}
	}

	return contact
}

// ─── WhatsApp message content builders ───────────────────────────────────────

/** Build a single-contact contactMessage content. */
export const createContactCard = (
	contact: VCardContact
): { contacts: { displayName: string; contacts: { vcard: string }[] } } => ({
	contacts: {
		displayName: contact.displayName ?? contact.fullName,
		contacts: [{ vcard: generateVCard(contact) }]
	}
})

/** Build a multi-contact contactsArrayMessage content. */
export const createContactCards = (
	contacts: VCardContact[]
): { contacts: { displayName: string; contacts: { vcard: string }[] } } => {
	const first = contacts[0]
	return {
		contacts: {
			displayName:
				contacts.length === 1 && first ? (first.displayName ?? first.fullName) : `${contacts.length} Contacts`,
			contacts: contacts.map(c => ({ vcard: generateVCard(c) }))
		}
	}
}

/** Quickly create a VCardContact from a name + phone number. */
export const quickContact = (
	name: string,
	phone: string,
	options?: { organization?: string; email?: string }
): VCardContact => ({
	fullName: name,
	phones: [{ number: phone, type: 'CELL' }],
	organization: options?.organization,
	emails: options?.email ? [{ email: options.email, type: 'WORK' }] : undefined
})
