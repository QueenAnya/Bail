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
	lines.push(`FN:${escapeVCard(contact.fullName)}`)
	lines.push(`N:${escapeVCard(contact.fullName)};;;;`)
	if (contact.displayName) lines.push(`NICKNAME:${escapeVCard(contact.displayName)}`)
	if (contact.organization) lines.push(`ORG:${escapeVCard(contact.organization)}`)
	if (contact.title) lines.push(`TITLE:${escapeVCard(contact.title)}`)
	for (const phone of contact.phones || []) {
		const type = phone.type || 'CELL'
		lines.push(`TEL;TYPE=${type}:${formatPhone(phone.number)}`)
	}
	for (const email of contact.emails || []) {
		const type = email.type || 'OTHER'
		lines.push(`EMAIL;TYPE=${type}:${escapeVCard(email.email)}`)
	}
	for (const url of contact.urls || []) {
		const type = url.type || 'OTHER'
		lines.push(`URL;TYPE=${type}:${escapeVCard(url.url)}`)
	}
	for (const addr of contact.addresses || []) {
		const type = addr.type || 'OTHER'
		const parts = [
			'',
			'',
			escapeVCard(addr.street || ''),
			escapeVCard(addr.city || ''),
			escapeVCard(addr.state || ''),
			escapeVCard(addr.postalCode || ''),
			escapeVCard(addr.country || '')
		]
		lines.push(`ADR;TYPE=${type}:${parts.join(';')}`)
	}
	if (contact.birthday) lines.push(`BDAY:${contact.birthday.replace(/-/g, '')}`)
	if (contact.note) lines.push(`NOTE:${escapeVCard(contact.note)}`)
	lines.push('END:VCARD')
	return lines.join('\r\n')
}

export const generateVCards = (contacts: VCardContact[]): string => contacts.map(generateVCard).join('\r\n')

export const parseVCard = (vcard: string): Partial<VCardContact> => {
	const result: Partial<VCardContact> = {}
	const lines = vcard.split(/\r?\n/)
	for (const line of lines) {
		if (line.startsWith('FN:')) result.fullName = line.slice(3)
		else if (line.startsWith('NICKNAME:')) result.displayName = line.slice(9)
		else if (line.startsWith('ORG:')) result.organization = line.slice(4)
		else if (line.startsWith('TITLE:')) result.title = line.slice(6)
		else if (line.startsWith('NOTE:')) result.note = line.slice(5)
	}
	return result
}

export const createContactCard = (contact: VCardContact) => ({
	contacts: {
		displayName: contact.displayName || contact.fullName,
		contacts: [{ vcard: generateVCard(contact) }]
	}
})

export const createContactCards = (contacts: VCardContact[]) => ({
	contacts: {
		displayName: contacts[0]?.displayName || contacts[0]?.fullName || 'Contacts',
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
	...(options?.organization ? { organization: options.organization } : {}),
	...(options?.email ? { emails: [{ email: options.email }] } : {})
})
