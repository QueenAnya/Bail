/**
 * vCard / Contact Card Generator
 * Ported from Baileys-Joss / innovatorssoft.
 */

import type { AnyMessageContent } from '../Types'

// =====================================================
// TYPES
// =====================================================

export interface VCardPhone {
	number: string
	/** e.g. 'CELL', 'WORK', 'HOME' */
	type?: string
	label?: string
}

export interface VCardEmail {
	email: string
	/** e.g. 'WORK', 'HOME', 'OTHER' */
	type?: string
}

export interface VCardUrl {
	url: string
	type?: string
}

export interface VCardAddress {
	street?: string
	city?: string
	state?: string
	postalCode?: string
	country?: string
	/** e.g. 'HOME', 'WORK' */
	type?: string
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
	/** Format: YYYYMMDD */
	birthday?: string
	note?: string
}

// =====================================================
// HELPERS
// =====================================================

const escapeVCard = (str: string): string =>
	str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

const formatPhone = (phone: string): string => phone.replace(/[^\d+]/g, '')

// =====================================================
// GENERATORS
// =====================================================

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

	if (contact.organization) {
		lines.push(`ORG:${escapeVCard(contact.organization)}`)
	}

	if (contact.title) {
		lines.push(`TITLE:${escapeVCard(contact.title)}`)
	}

	if (contact.phones && contact.phones.length > 0) {
		for (const phone of contact.phones) {
			const type = phone.type || 'CELL'
			const formatted = formatPhone(phone.number)
			if (phone.label) {
				lines.push(`TEL;type=${type};type=VOICE;X-ABLabel=${escapeVCard(phone.label)}:${formatted}`)
			} else {
				lines.push(`TEL;type=${type};type=VOICE:${formatted}`)
			}
		}
	}

	if (contact.emails && contact.emails.length > 0) {
		for (const email of contact.emails) {
			const type = email.type || 'OTHER'
			lines.push(`EMAIL;type=${type}:${email.email}`)
		}
	}

	if (contact.urls && contact.urls.length > 0) {
		for (const url of contact.urls) {
			const type = url.type || 'OTHER'
			lines.push(`URL;type=${type}:${url.url}`)
		}
	}

	if (contact.addresses && contact.addresses.length > 0) {
		for (const addr of contact.addresses) {
			const type = addr.type || 'OTHER'
			const parts = [
				'', // PO Box
				'', // Extended
				addr.street || '',
				addr.city || '',
				addr.state || '',
				addr.postalCode || '',
				addr.country || ''
			].map(p => escapeVCard(p))
			lines.push(`ADR;type=${type}:${parts.join(';')}`)
		}
	}

	if (contact.birthday) {
		lines.push(`BDAY:${contact.birthday}`)
	}

	if (contact.note) {
		lines.push(`NOTE:${escapeVCard(contact.note)}`)
	}

	lines.push('END:VCARD')
	return lines.join('\r\n')
}

/** Generate multiple vCards joined together */
export const generateVCards = (contacts: VCardContact[]): string => contacts.map(generateVCard).join('\r\n')

/** Basic vCard 3.0 parser */
export const parseVCard = (vcard: string): Partial<VCardContact> => {
	const contact: Partial<VCardContact> & {
		phones?: VCardPhone[]
		emails?: VCardEmail[]
	} = {}
	const lines = vcard.split(/\r?\n/)

	for (const line of lines) {
		const colonIdx = line.indexOf(':')
		if (colonIdx === -1) continue
		const key = line.substring(0, colonIdx)
		const value = line.substring(colonIdx + 1)

		if (key.startsWith('FN')) {
			contact.fullName = value.replace(/\\([;,n\\])/g, '$1').replace(/\\n/g, '\n')
		} else if (key.startsWith('ORG')) {
			contact.organization = value.replace(/\\([;,n\\])/g, '$1')
		} else if (key.startsWith('TITLE')) {
			contact.title = value.replace(/\\([;,n\\])/g, '$1')
		} else if (key.startsWith('TEL')) {
			contact.phones = contact.phones || []
			const typeMatch = key.match(/type=(\w+)/i)
			contact.phones.push({ number: value, type: typeMatch?.[1]?.toUpperCase() || 'CELL' })
		} else if (key.startsWith('EMAIL')) {
			contact.emails = contact.emails || []
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

/** Create a single contact card message content */
export const createContactCard = (contact: VCardContact): AnyMessageContent =>
	({
		contacts: {
			displayName: contact.displayName || contact.fullName,
			contacts: [{ vcard: generateVCard(contact) }]
		}
	}) as unknown as AnyMessageContent

/** Create a multi-contact card message content */
export const createContactCards = (contacts: VCardContact[]): AnyMessageContent => {
	const first = contacts[0]
	return {
		contacts: {
			displayName: contacts.length === 1 && first ? first.displayName || first.fullName : `${contacts.length} Contacts`,
			contacts: contacts.map(c => ({ vcard: generateVCard(c) }))
		}
	} as unknown as AnyMessageContent
}

/**
 * Quick helper to build a minimal VCardContact from a name and phone.
 *
 * @example
 * const card = quickContact('Alice', '+1234567890', { organization: 'Acme' })
 * await sock.sendMessage(jid, createContactCard(card))
 */
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
