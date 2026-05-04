/**
 * vCard / Contact Card Generator
 * Part of innovatorssoft/baileys addons
 */

import type { AnyMessageContent } from '../Types'

export interface VCardContact {
	fullName: string
	displayName?: string
	organization?: string
	title?: string
	phones?: Array<{ number: string; type?: 'CELL' | 'WORK' | 'HOME' | 'MAIN' | 'FAX' | 'PAGER'; label?: string }>
	emails?: Array<{ email: string; type?: 'WORK' | 'HOME' | 'OTHER' }>
	urls?: Array<{ url: string; type?: 'WORK' | 'HOME' | 'OTHER' }>
	addresses?: Array<{
		street?: string
		city?: string
		state?: string
		postalCode?: string
		country?: string
		type?: 'WORK' | 'HOME' | 'OTHER'
	}>
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
		const num = formatPhone(phone.number)
		lines.push(
			phone.label
				? `TEL;type=${type};type=VOICE;X-ABLabel=${escapeVCard(phone.label)}:${num}`
				: `TEL;type=${type};type=VOICE:${num}`
		)
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

export const generateVCards = (contacts: VCardContact[]): string => contacts.map(generateVCard).join('\r\n')

export const parseVCard = (vcard: string): Partial<VCardContact> => {
	const contact: Partial<VCardContact> = {}
	for (const line of vcard.split(/\r?\n/)) {
		const colonIdx = line.indexOf(':')
		if (colonIdx === -1) continue
		const key = line.substring(0, colonIdx)
		const value = line.substring(colonIdx + 1)
		if (key.startsWith('FN')) contact.fullName = value.replace(/\\([;,n\\])/g, '$1')
		else if (key.startsWith('ORG')) contact.organization = value.replace(/\\([;,n\\])/g, '$1')
		else if (key.startsWith('TITLE')) contact.title = value.replace(/\\([;,n\\])/g, '$1')
		else if (key.startsWith('TEL')) {
			const typeMatch = key.match(/type=(\w+)/i)
			contact.phones = contact.phones || []
			contact.phones.push({ number: value, type: (typeMatch?.[1]?.toUpperCase() as any) || 'CELL' })
		} else if (key.startsWith('EMAIL')) {
			const typeMatch = key.match(/type=(\w+)/i)
			contact.emails = contact.emails || []
			contact.emails.push({ email: value, type: (typeMatch?.[1]?.toUpperCase() as any) || 'OTHER' })
		} else if (key.startsWith('BDAY')) contact.birthday = value
		else if (key.startsWith('NOTE')) contact.note = value.replace(/\\n/g, '\n')
	}
	return contact
}

export const createContactCard = (contact: VCardContact): AnyMessageContent =>
	({
		contacts: {
			displayName: contact.displayName || contact.fullName,
			contacts: [{ vcard: generateVCard(contact) }]
		}
	}) as any

export const createContactCards = (contacts: VCardContact[]): AnyMessageContent => {
	const first = contacts[0]
	return {
		contacts: {
			displayName: contacts.length === 1 && first ? first.displayName || first.fullName : `${contacts.length} Contacts`,
			contacts: contacts.map(c => ({ vcard: generateVCard(c) }))
		}
	} as any
}

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
