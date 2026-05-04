/**
 * Message Templates System — reusable templates with {{variable}} interpolation
 * Part of innovatorssoft/baileys addons
 */

export interface TemplateVariable {
	name: string
	defaultValue?: string
	required: boolean
}

export interface MessageTemplate {
	id: string
	name: string
	content: string
	description?: string
	category?: string
	variables: TemplateVariable[]
	createdAt: Date
	updatedAt: Date
}

export type TemplateData = Record<string, string | number | boolean>

const VARIABLE_REGEX = /\{\{(\w+)(?::([^}]*))?\}\}/g

const extractVariables = (content: string): TemplateVariable[] => {
	const variables: TemplateVariable[] = []
	const seen = new Set<string>()
	let match: RegExpExecArray | null
	const re = new RegExp(VARIABLE_REGEX.source, 'g')
	while ((match = re.exec(content)) !== null) {
		const name = match[1]
		if (!name || seen.has(name)) continue
		seen.add(name)
		variables.push({ name, defaultValue: match[2], required: match[2] === undefined })
	}
	return variables
}

const renderContent = (content: string, data: TemplateData = {}): string =>
	content.replace(VARIABLE_REGEX, (match, name, defaultValue) => {
		const value = data[name]
		if (value !== undefined && value !== null) return String(value)
		if (defaultValue !== undefined) return defaultValue
		return match
	})

export class TemplateManager {
	private templates: Map<string, MessageTemplate> = new Map()

	create(options: {
		id?: string
		name: string
		content: string
		description?: string
		category?: string
	}): MessageTemplate {
		const template: MessageTemplate = {
			id: options.id ?? `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
			name: options.name,
			content: options.content,
			description: options.description,
			category: options.category,
			variables: extractVariables(options.content),
			createdAt: new Date(),
			updatedAt: new Date()
		}
		this.templates.set(template.id, template)
		return template
	}

	get(id: string): MessageTemplate | undefined {
		return this.templates.get(id)
	}
	getByName(name: string): MessageTemplate | undefined {
		return Array.from(this.templates.values()).find(t => t.name === name)
	}
	getAll(): MessageTemplate[] {
		return Array.from(this.templates.values())
	}
	getByCategory(category: string): MessageTemplate[] {
		return Array.from(this.templates.values()).filter(t => t.category === category)
	}
	delete(id: string): boolean {
		return this.templates.delete(id)
	}

	update(
		id: string,
		updates: Partial<Pick<MessageTemplate, 'name' | 'content' | 'description' | 'category'>>
	): MessageTemplate | undefined {
		const t = this.templates.get(id)
		if (!t) return undefined
		const updated = {
			...t,
			...updates,
			updatedAt: new Date(),
			variables: updates.content ? extractVariables(updates.content) : t.variables
		}
		this.templates.set(id, updated)
		return updated
	}

	render(id: string, data: TemplateData = {}): string {
		const t = this.templates.get(id)
		if (!t) throw new Error(`Template not found: ${id}`)
		return renderContent(t.content, data)
	}

	validate(id: string, data: TemplateData): { valid: boolean; missing: string[] } {
		const t = this.templates.get(id)
		if (!t) throw new Error(`Template not found: ${id}`)
		const missing = t.variables.filter(v => v.required && !(v.name in data)).map(v => v.name)
		return { valid: missing.length === 0, missing }
	}

	export(): string {
		return JSON.stringify(Array.from(this.templates.values()), null, 2)
	}

	import(json: string, overwrite = false): number {
		const templates: MessageTemplate[] = JSON.parse(json)
		let imported = 0
		for (const t of templates) {
			if (!overwrite && this.templates.has(t.id)) continue
			this.templates.set(t.id, { ...t, createdAt: new Date(t.createdAt), updatedAt: new Date(t.updatedAt) })
			imported++
		}
		return imported
	}
}

export const PRESET_TEMPLATES = {
	ORDER_CONFIRMATION: {
		name: 'Order Confirmation',
		category: 'order',
		content: `✅ *Order Confirmed!*\n\nOrder ID: #{{orderId}}\nCustomer: {{customerName}}\nDate: {{orderDate}}\n\n📦 *Items:*\n{{items}}\n\n💰 *Total: Rp {{total}}*\n\nThank you for your order! 🙏`
	},
	WELCOME: {
		name: 'Welcome Message',
		category: 'greeting',
		content: `👋 *Welcome, {{name}}!*\n\nThank you for joining {{companyName:us}}!\n\nNeed help? Just reply to this message!`
	},
	BIRTHDAY: {
		name: 'Birthday Wishes',
		category: 'greeting',
		content: `🎂 *Happy Birthday, {{name}}!* 🎉\n\nWishing you a wonderful day!\n\n🎁 Use code: {{code:BIRTHDAY}} for {{discount:10}}% off!`
	},
	REMINDER: {
		name: 'Reminder',
		category: 'notification',
		content: `⏰ *Reminder*\n\nHi {{name}},\n\n📋 {{subject}}\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location:TBD}}`
	},
	APPOINTMENT: {
		name: 'Appointment Confirmation',
		category: 'notification',
		content: `📅 *Appointment Confirmed*\n\nHi {{name}},\n\n📋 Service: {{service}}\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location}}\n\nPlease arrive 10 minutes early.`
	},
	SUPPORT_TICKET: {
		name: 'Support Ticket',
		category: 'support',
		content: `🎫 *Ticket #{{ticketId}}*\n\nHi {{name}}, we've received your request.\n\n*Subject:* {{subject}}\n*Priority:* {{priority:Normal}}\n\nExpected response: {{responseTime:24 hours}}`
	}
}

export const createTemplateManager = (includePresets = true): TemplateManager => {
	const manager = new TemplateManager()
	if (includePresets) {
		for (const [key, template] of Object.entries(PRESET_TEMPLATES)) {
			manager.create({ ...template, id: key.toLowerCase() })
		}
	}
	return manager
}

export const renderTemplate = renderContent
