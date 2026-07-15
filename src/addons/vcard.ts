/**
 * vCard / Contact Card Generator
 * Source: @innovatorssoft/baileys vcard.js
 */

export type VCardPhone = { number: string; type?: string; label?: string }
export type VCardEmail = { email: string; type?: string }
export type VCardUrl = { url: string; type?: string }
export type VCardAddress = {
	street?: string
	city?: string
	state?: string
	postalCode?: string
	country?: string
	type?: string
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

const escapeVCard = (str: string) =>
	str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
const formatPhone = (phone: string) => phone.replace(/[^\d+]/g, '')

export const generateVCard = (contact: VCardContact): string => {
	const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0']
	const escapedName = escapeVCard(contact.fullName)
	lines.push(`FN:${escapedName}`)
	const parts = contact.fullName.split(' ')
	if (parts.length >= 2) {
		const last = parts[parts.length - 1]!
		const first = parts.slice(0, -1).join(' ')
		lines.push(`N:${escapeVCard(last)};${escapeVCard(first)};;;`)
	} else lines.push(`N:${escapedName};;;;`)
	if (contact.organization) lines.push(`ORG:${escapeVCard(contact.organization)}`)
	if (contact.title) lines.push(`TITLE:${escapeVCard(contact.title)}`)
	for (const phone of contact.phones ?? []) {
		const type = phone.type || 'CELL'
		const num = formatPhone(phone.number)
		lines.push(
			phone.label
				? `TEL;type=${type};type=VOICE;X-ABLabel=${escapeVCard(phone.label)}:${num}`
				: `TEL;type=${type};type=VOICE:${num}`
		)
	}
	for (const email of contact.emails ?? []) lines.push(`EMAIL;type=${email.type || 'OTHER'}:${email.email}`)
	for (const url of contact.urls ?? []) lines.push(`URL;type=${url.type || 'OTHER'}:${url.url}`)
	for (const addr of contact.addresses ?? []) {
		const p = [
			'',
			'',
			addr.street || '',
			addr.city || '',
			addr.state || '',
			addr.postalCode || '',
			addr.country || ''
		].map(s => escapeVCard(s))
		lines.push(`ADR;type=${addr.type || 'OTHER'}:${p.join(';')}`)
	}
	if (contact.birthday) lines.push(`BDAY:${contact.birthday}`)
	if (contact.note) lines.push(`NOTE:${escapeVCard(contact.note)}`)
	lines.push('END:VCARD')
	return lines.join('\r\n')
}

export const generateVCards = (contacts: VCardContact[]): string => contacts.map(generateVCard).join('\r\n')

export const parseVCard = (vcard: string): Partial<VCardContact> => {
	const contact: Partial<VCardContact> & { phones?: VCardPhone[]; emails?: VCardEmail[] } = {}
	for (const line of vcard.split(/\r?\n/)) {
		const colonIdx = line.indexOf(':')
		if (colonIdx === -1) continue
		const key = line.substring(0, colonIdx)
		const value = line.substring(colonIdx + 1)
		const unescape = (s: string) => s.replace(/\\([;,n\\])/g, '$1').replace(/\\n/g, '\n')
		if (key.startsWith('FN')) contact.fullName = unescape(value)
		else if (key.startsWith('ORG')) contact.organization = unescape(value)
		else if (key.startsWith('TITLE')) contact.title = unescape(value)
		else if (key.startsWith('TEL')) {
			const m = key.match(/type=(\w+)/i)
			contact.phones = contact.phones || []
			contact.phones.push({ number: value, type: m?.[1]?.toUpperCase() || 'CELL' })
		} else if (key.startsWith('EMAIL')) {
			const m = key.match(/type=(\w+)/i)
			contact.emails = contact.emails || []
			contact.emails.push({ email: value, type: m?.[1]?.toUpperCase() || 'OTHER' })
		} else if (key.startsWith('BDAY')) contact.birthday = value
		else if (key.startsWith('NOTE')) contact.note = value.replace(/\\n/g, '\n')
	}
	return contact
}

export const createContactCard = (contact: VCardContact) => ({
	contacts: { displayName: contact.displayName || contact.fullName, contacts: [{ vcard: generateVCard(contact) }] }
})

export const createContactCards = (contacts: VCardContact[]) => ({
	contacts: {
		displayName:
			contacts.length === 1 && contacts[0]
				? contacts[0].displayName || contacts[0].fullName
				: `${contacts.length} Contacts`,
		contacts: contacts.map(c => ({ vcard: generateVCard(c) }))
	}
})

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
