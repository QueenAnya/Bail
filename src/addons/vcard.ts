/**
 * vCard / Contact Card Helpers
 * Source: @innovatorssoft/baileys (vcard.ts)
 */

export interface VCardPhone {
	number: string
	type?: string
	label?: string
}
export interface VCardEmail {
	email: string
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
	birthday?: string
	note?: string
}

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

const fmtPhone = (p: string) => p.replace(/[^\d+]/g, '')

export const generateVCard = (c: VCardContact): string => {
	const l: string[] = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${esc(c.fullName)}`]
	const parts = c.fullName.split(' ')
	if (parts.length >= 2) {
		const last = parts[parts.length - 1]!
		l.push(`N:${esc(last)};${esc(parts.slice(0, -1).join(' '))};;;`)
	} else {
		l.push(`N:${esc(c.fullName)};;;;`)
	}
	if (c.organization) l.push(`ORG:${esc(c.organization)}`)
	if (c.title) l.push(`TITLE:${esc(c.title)}`)
	for (const p of c.phones ?? []) {
		const t = p.type ?? 'CELL'
		l.push(
			p.label
				? `TEL;type=${t};type=VOICE;X-ABLabel=${esc(p.label)}:${fmtPhone(p.number)}`
				: `TEL;type=${t};type=VOICE:${fmtPhone(p.number)}`
		)
	}
	for (const e of c.emails ?? []) l.push(`EMAIL;type=${e.type ?? 'OTHER'}:${e.email}`)
	for (const u of c.urls ?? []) l.push(`URL;type=${u.type ?? 'OTHER'}:${u.url}`)
	for (const a of c.addresses ?? []) {
		const pts = ['', '', a.street ?? '', a.city ?? '', a.state ?? '', a.postalCode ?? '', a.country ?? ''].map(esc)
		l.push(`ADR;type=${a.type ?? 'OTHER'}:${pts.join(';')}`)
	}
	if (c.birthday) l.push(`BDAY:${c.birthday}`)
	if (c.note) l.push(`NOTE:${esc(c.note)}`)
	l.push('END:VCARD')
	return l.join('\r\n')
}

export const generateVCards = (contacts: VCardContact[]) => contacts.map(generateVCard).join('\r\n')

export const parseVCard = (vcard: string): Partial<VCardContact> => {
	const c: Partial<VCardContact> & { phones?: VCardPhone[]; emails?: VCardEmail[] } = {}
	for (const line of vcard.split(/\r?\n/)) {
		const sep = line.indexOf(':')
		if (sep < 0) continue
		const key = line.slice(0, sep)
		const val = line.slice(sep + 1)
		const unescape = (s: string) => s.replace(/\\([;,n\\])/g, '$1').replace(/\\n/g, '\n')
		if (key.startsWith('FN')) c.fullName = unescape(val)
		else if (key.startsWith('ORG')) c.organization = unescape(val)
		else if (key.startsWith('TITLE')) c.title = unescape(val)
		else if (key.startsWith('TEL')) {
			c.phones = c.phones ?? []
			const m = key.match(/type=(\w+)/i)
			c.phones.push({ number: val, type: m?.[1]?.toUpperCase() ?? 'CELL' })
		} else if (key.startsWith('EMAIL')) {
			c.emails = c.emails ?? []
			const m = key.match(/type=(\w+)/i)
			c.emails.push({ email: val, type: m?.[1]?.toUpperCase() ?? 'OTHER' })
		} else if (key.startsWith('BDAY')) c.birthday = val
		else if (key.startsWith('NOTE')) c.note = unescape(val)
	}
	return c
}

/** Build a contact card message content for sendMessage */
export const createContactCard = (c: VCardContact) => ({
	contacts: { displayName: c.displayName ?? c.fullName, contacts: [{ vcard: generateVCard(c) }] }
})

/** Build a multi-contact card message content */
export const createContactCards = (contacts: VCardContact[]) => ({
	contacts: {
		displayName:
			contacts.length === 1 ? (contacts[0]!.displayName ?? contacts[0]!.fullName) : `${contacts.length} Contacts`,
		contacts: contacts.map(c => ({ vcard: generateVCard(c) }))
	}
})

/** Quick helper: build a VCardContact from just a name and phone number */
export const quickContact = (
	name: string,
	phone: string,
	opts?: { organization?: string; email?: string }
): VCardContact => ({
	fullName: name,
	phones: [{ number: phone, type: 'CELL' }],
	organization: opts?.organization,
	emails: opts?.email ? [{ email: opts.email, type: 'WORK' }] : undefined
})
