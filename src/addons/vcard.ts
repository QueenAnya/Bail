/**
 * vCard / Contact Card Generator & Parser
 * Ported from innovatorssoft/Baileys
 */

export interface VCardPhone {
	number: string
	type?: 'CELL' | 'HOME' | 'WORK' | string
	label?: string
}

export interface VCardEmail {
	email: string
	type?: 'HOME' | 'WORK' | 'OTHER' | string
}

export interface VCardUrl {
	url: string
	type?: 'HOME' | 'WORK' | 'OTHER' | string
}

export interface VCardAddress {
	street?: string
	city?: string
	state?: string
	postalCode?: string
	country?: string
	type?: 'HOME' | 'WORK' | 'OTHER' | string
}

export interface VCardContact {
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

const escapeVCard = (str: string): string =>
	str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

const formatPhone = (phone: string): string => phone.replace(/[^\d+]/g, '')

/** Generate a vCard 3.0 string from contact data */
export const generateVCard = (contact: VCardContact): string => {
	const lines: string[] = []

	lines.push('BEGIN:VCARD')
	lines.push('VERSION:3.0')

	const escapedName = escapeVCard(contact.fullName)
	lines.push(`FN:${escapedName}`)

	const nameParts = contact.fullName.split(' ')
	if (nameParts.length >= 2) {
		const lastName = nameParts[nameParts.length - 1] || ''
		const firstName = nameParts.slice(0, -1).join(' ')
		lines.push(`N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`)
	} else {
		lines.push(`N:${escapedName};;;;`)
	}

	if (contact.organization) lines.push(`ORG:${escapeVCard(contact.organization)}`)
	if (contact.title) lines.push(`TITLE:${escapeVCard(contact.title)}`)

	for (const phone of contact.phones || []) {
		const type = phone.type || 'CELL'
		const formatted = formatPhone(phone.number)
		if (phone.label) {
			lines.push(`TEL;type=${type};type=VOICE;X-ABLabel=${escapeVCard(phone.label)}:${formatted}`)
		} else {
			lines.push(`TEL;type=${type};type=VOICE:${formatted}`)
		}
	}

	for (const email of contact.emails || []) {
		lines.push(`EMAIL;type=${email.type || 'OTHER'}:${email.email}`)
	}

	for (const url of contact.urls || []) {
		lines.push(`URL;type=${url.type || 'OTHER'}:${url.url}`)
	}

	for (const addr of contact.addresses || []) {
		const parts = [
			'',
			'',
			addr.street || '',
			addr.city || '',
			addr.state || '',
			addr.postalCode || '',
			addr.country || ''
		].map(p => escapeVCard(p))
		lines.push(`ADR;type=${addr.type || 'OTHER'}:${parts.join(';')}`)
	}

	if (contact.birthday) lines.push(`BDAY:${contact.birthday}`)
	if (contact.note) lines.push(`NOTE:${escapeVCard(contact.note)}`)

	lines.push('END:VCARD')
	return lines.join('\r\n')
}

/** Generate multiple vCards joined together */
export const generateVCards = (contacts: VCardContact[]): string => contacts.map(generateVCard).join('\r\n')

/** Parse a vCard string to a VCardContact (basic parser) */
export const parseVCard = (vcard: string): Partial<VCardContact> => {
	const contact: Partial<VCardContact> & {
		phones?: VCardPhone[]
		emails?: VCardEmail[]
	} = {}
	const lines = vcard.split(/\r?\n/)

	for (const line of lines) {
		const colonIdx = line.indexOf(':')
		if (colonIdx === -1) continue
		const key = line.slice(0, colonIdx)
		const value = line.slice(colonIdx + 1)

		const unescape = (s: string) => s.replace(/\\([;,n\\])/g, '$1').replace(/\\n/g, '\n')

		if (key.startsWith('FN')) {
			contact.fullName = unescape(value)
		} else if (key.startsWith('ORG')) {
			contact.organization = unescape(value)
		} else if (key.startsWith('TITLE')) {
			contact.title = unescape(value)
		} else if (key.startsWith('TEL')) {
			if (!contact.phones) contact.phones = []
			const typeMatch = key.match(/type=(\w+)/i)
			contact.phones.push({ number: value, type: typeMatch?.[1]?.toUpperCase() || 'CELL' })
		} else if (key.startsWith('EMAIL')) {
			if (!contact.emails) contact.emails = []
			const typeMatch = key.match(/type=(\w+)/i)
			contact.emails.push({ email: value, type: typeMatch?.[1]?.toUpperCase() || 'OTHER' })
		} else if (key.startsWith('BDAY')) {
			contact.birthday = value
		} else if (key.startsWith('NOTE')) {
			contact.note = value.replace(/\\n/g, '\n')
		}
	}

	return contact
}

/** Create a contacts message content from one contact */
export const createContactCard = (
	contact: VCardContact
): { contacts: { displayName: string; contacts: { vcard: string }[] } } => ({
	contacts: {
		displayName: contact.displayName || contact.fullName,
		contacts: [{ vcard: generateVCard(contact) }]
	}
})

/** Create a contacts message content from multiple contacts */
export const createContactCards = (
	contacts: VCardContact[]
): { contacts: { displayName: string; contacts: { vcard: string }[] } } => {
	const first = contacts[0]
	return {
		contacts: {
			displayName: contacts.length === 1 && first ? first.displayName || first.fullName : `${contacts.length} Contacts`,
			contacts: contacts.map(c => ({ vcard: generateVCard(c) }))
		}
	}
}

/** Build a minimal VCardContact from a name and phone number */
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
