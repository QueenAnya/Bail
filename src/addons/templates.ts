/**
 * Message Template Manager
 * Ported from innovatorssoft/Baileys
 *
 * Supports {{variable}} and {{variable:defaultValue}} syntax.
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
		const name = match[1]!
		if (seen.has(name)) continue
		seen.add(name)
		const defaultValue = match[2]
		variables.push({ name, defaultValue, required: defaultValue === undefined })
	}

	return variables
}

const renderContent = (content: string, data: TemplateData = {}): string =>
	content.replace(VARIABLE_REGEX, (match, name: string, defaultValue?: string) => {
		const value = data[name]
		if (value !== undefined && value !== null) return String(value)
		if (defaultValue !== undefined) return defaultValue
		return match
	})

export class TemplateManager {
	private templates = new Map<string, MessageTemplate>()

	private generateId(): string {
		return `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	create(
		options: Omit<MessageTemplate, 'id' | 'variables' | 'createdAt' | 'updatedAt'> & { id?: string }
	): MessageTemplate {
		const template: MessageTemplate = {
			id: options.id ?? this.generateId(),
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

	update(id: string, updates: Partial<Omit<MessageTemplate, 'id' | 'createdAt'>>): MessageTemplate | undefined {
		const template = this.templates.get(id)
		if (!template) return undefined

		if (updates.content) {
			updates.variables = extractVariables(updates.content)
		}

		const updated: MessageTemplate = { ...template, ...updates, updatedAt: new Date() }
		this.templates.set(id, updated)
		return updated
	}

	delete(id: string): boolean {
		return this.templates.delete(id)
	}

	render(id: string, data: TemplateData = {}): string {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)
		return renderContent(template.content, data)
	}

	validate(id: string, data: TemplateData): { valid: boolean; missing: string[] } {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)

		const missing = template.variables.filter(v => v.required && !(v.name in data)).map(v => v.name)

		return { valid: missing.length === 0, missing }
	}

	export(): string {
		return JSON.stringify(Array.from(this.templates.values()), null, 2)
	}

	import(json: string, overwrite = false): number {
		const templates = JSON.parse(json) as MessageTemplate[]
		let imported = 0
		for (const t of templates) {
			if (!overwrite && this.templates.has(t.id)) continue
			this.templates.set(t.id, {
				...t,
				createdAt: new Date(t.createdAt),
				updatedAt: new Date(t.updatedAt)
			})
			imported++
		}
		return imported
	}
}

export const PRESET_TEMPLATES = {
	ORDER_CONFIRMATION: {
		name: 'Order Confirmation',
		category: 'order',
		content: `✅ *Order Confirmed!*\n\nOrder ID: #{{orderId}}\nCustomer: {{customerName}}\nDate: {{orderDate}}\n\n📦 *Items:*\n{{items}}\n\n💰 *Total: {{total}}*\n\nThank you for your order! 🙏`
	},
	ORDER_SHIPPED: {
		name: 'Order Shipped',
		category: 'order',
		content: `📦 *Your Order is On The Way!*\n\nOrder ID: #{{orderId}}\nTracking: {{trackingNumber}}\nCourier: {{courier}}\n\nEstimated delivery: {{estimatedDate}}\n\nTrack your package: {{trackingUrl:}}`
	},
	WELCOME: {
		name: 'Welcome Message',
		category: 'greeting',
		content: `👋 *Welcome, {{name}}!*\n\nThank you for joining {{companyName:us}}!\n\nWe're excited to have you. Here's what you can do:\n{{features:- Explore our products\n- Get exclusive offers\n- 24/7 support}}\n\nNeed help? Just reply to this message!`
	},
	BIRTHDAY: {
		name: 'Birthday Wishes',
		category: 'greeting',
		content: `🎂 *Happy Birthday, {{name}}!* 🎉\n\nWishing you a wonderful day!\n\n🎁 Special gift: {{discount:10}}% off your next purchase!\nUse code: {{code:BIRTHDAY}}\n\nHave a great celebration! 🥳`
	},
	REMINDER: {
		name: 'Reminder',
		category: 'notification',
		content: `⏰ *Reminder*\n\nHi {{name}},\n\nThis is a friendly reminder about:\n📋 {{subject}}\n\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location:TBD}}\n\n{{notes:}}\n\nDon't forget! 🙏`
	},
	SUPPORT_TICKET: {
		name: 'Support Ticket',
		category: 'support',
		content: `🎫 *Support Ticket Created*\n\nTicket #: {{ticketId}}\nSubject: {{subject}}\nPriority: {{priority:Normal}}\n\nHi {{name}},\n\nWe've received your request.\n\nExpected response time: {{responseTime:24 hours}}\n\nThank you for your patience! 🙏`
	}
} as const

/** Create a TemplateManager with optional preset templates loaded */
export const createTemplateManager = (includePresets = true): TemplateManager => {
	const manager = new TemplateManager()
	if (includePresets) {
		for (const [key, template] of Object.entries(PRESET_TEMPLATES)) {
			manager.create({ ...template, id: key.toLowerCase() })
		}
	}
	return manager
}

/** Render a raw template string with data (no manager needed) */
export const renderTemplate = (content: string, data: TemplateData = {}): string => renderContent(content, data)
