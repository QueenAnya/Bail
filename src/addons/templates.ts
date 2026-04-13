/**
 * Message Templates System
 * Ported from Baileys-Joss / innovatorssoft.
 */

// =====================================================
// TYPES
// =====================================================

export interface TemplateVariable {
	name: string
	defaultValue?: string
	required: boolean
}

export interface MessageTemplate {
	id: string
	name: string
	/** Content with {{variable}} or {{variable:default}} placeholders */
	content: string
	description?: string
	category?: string
	variables: TemplateVariable[]
	createdAt: Date
	updatedAt: Date
}

export type TemplateData = Record<string, string | number | undefined | null>

// =====================================================
// TEMPLATE MANAGER
// =====================================================

export class TemplateManager {
	private templates: Map<string, MessageTemplate> = new Map()

	private generateId(): string {
		return `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	private extractVariables(content: string): TemplateVariable[] {
		const regex = /\{\{(\w+)(?::([^}]*))?\}\}/g
		const variables: TemplateVariable[] = []
		const seen = new Set<string>()
		let match: RegExpExecArray | null

		while ((match = regex.exec(content)) !== null) {
			const name = match[1]
			if (!name) continue
			const defaultValue = match[2]
			if (!seen.has(name)) {
				seen.add(name)
				variables.push({ name, defaultValue, required: !defaultValue })
			}
		}

		return variables
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
			variables: this.extractVariables(options.content),
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
			updates.variables = this.extractVariables(updates.content)
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
		return this.renderContent(template.content, data)
	}

	renderContent(content: string, data: TemplateData = {}): string {
		return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (_match, name: string, defaultValue: string | undefined) => {
			const value = data[name]
			if (value !== undefined && value !== null) return String(value)
			if (defaultValue !== undefined) return defaultValue
			return _match
		})
	}

	validate(id: string, data: TemplateData): { valid: boolean; missing: string[] } {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)

		const missing: string[] = []
		for (const variable of template.variables) {
			if (variable.required && !(variable.name in data)) {
				missing.push(variable.name)
			}
		}

		return { valid: missing.length === 0, missing }
	}

	export(): string {
		return JSON.stringify(Array.from(this.templates.values()), null, 2)
	}

	import(json: string, overwrite = false): number {
		const templates = JSON.parse(json) as MessageTemplate[]
		let imported = 0
		for (const template of templates) {
			if (!overwrite && this.templates.has(template.id)) continue
			this.templates.set(template.id, {
				...template,
				createdAt: new Date(template.createdAt),
				updatedAt: new Date(template.updatedAt)
			})
			imported++
		}
		return imported
	}
}

// =====================================================
// PRESET TEMPLATES
// =====================================================

export const PRESET_TEMPLATES: Record<string, Omit<MessageTemplate, 'id' | 'variables' | 'createdAt' | 'updatedAt'>> = {
	ORDER_CONFIRMATION: {
		name: 'Order Confirmation',
		category: 'order',
		content: `✅ *Order Confirmed!*\n\nOrder ID: #{{orderId}}\nCustomer: {{customerName}}\nDate: {{orderDate}}\n\n📦 *Items:*\n{{items}}\n\n💰 *Total: Rp {{total}}*\n\nThank you for your order! 🙏`
	},
	ORDER_SHIPPED: {
		name: 'Order Shipped',
		category: 'order',
		content: `📦 *Your Order is On The Way!*\n\nOrder ID: #{{orderId}}\nTracking: {{trackingNumber}}\nCourier: {{courier}}\n\nEstimated delivery: {{estimatedDate}}\n\nTrack your package: {{trackingUrl:}}`
	},
	INVOICE: {
		name: 'Invoice',
		category: 'invoice',
		content: `📄 *INVOICE*\n\nInvoice #: {{invoiceNumber}}\nDate: {{invoiceDate}}\nDue Date: {{dueDate}}\n\n*Bill To:*\n{{customerName}}\n{{customerAddress:}}\n\n*Items:*\n{{items}}\n\nSubtotal: Rp {{subtotal}}\nTax ({{taxRate:11}}%): Rp {{tax}}\n*Total: Rp {{total}}*\n\nPayment Method: {{paymentMethod:Transfer Bank}}\nAccount: {{bankAccount:}}`
	},
	WELCOME: {
		name: 'Welcome Message',
		category: 'greeting',
		content: `👋 *Welcome, {{name}}!*\n\nThank you for joining {{companyName:us}}!\n\nWe're excited to have you. Here's what you can do:\n{{features:- Explore our products\n- Get exclusive offers\n- 24/7 support}}\n\nNeed help? Just reply to this message!`
	},
	BIRTHDAY: {
		name: 'Birthday Wishes',
		category: 'greeting',
		content: `🎂 *Happy Birthday, {{name}}!* 🎉\n\nWishing you a wonderful day filled with joy and happiness!\n\n🎁 As a special gift, here's {{discount:10}}% off your next purchase!\nUse code: {{code:BIRTHDAY{{year}}}}\n\nHave a great celebration! 🥳`
	},
	REMINDER: {
		name: 'Reminder',
		category: 'notification',
		content: `⏰ *Reminder*\n\nHi {{name}},\n\nThis is a friendly reminder about:\n📋 {{subject}}\n\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location:TBD}}\n\n{{notes:}}\n\nDon't forget! 🙏`
	},
	APPOINTMENT: {
		name: 'Appointment Confirmation',
		category: 'notification',
		content: `📅 *Appointment Confirmed*\n\nHi {{name}},\n\nYour appointment has been scheduled:\n\n📋 Service: {{service}}\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location}}\n\nPlease arrive 10 minutes early.\n\nNeed to reschedule? Reply to this message.`
	},
	SUPPORT_TICKET: {
		name: 'Support Ticket',
		category: 'support',
		content: `🎫 *Support Ticket Created*\n\nTicket #: {{ticketId}}\nSubject: {{subject}}\nPriority: {{priority:Normal}}\n\nHi {{name}},\n\nWe've received your request and our team is working on it.\n\nExpected response time: {{responseTime:24 hours}}\n\nThank you for your patience! 🙏`
	},
	SUPPORT_RESOLVED: {
		name: 'Support Resolved',
		category: 'support',
		content: `✅ *Issue Resolved*\n\nTicket #: {{ticketId}}\n\nHi {{name}},\n\nYour issue has been resolved:\n\n*Solution:*\n{{solution}}\n\nIf you need further assistance, please reply to this message.\n\nThank you! 🙏`
	}
}

/**
 * Create a TemplateManager, optionally pre-loaded with preset templates.
 *
 * @example
 * const tm = createTemplateManager()
 * const rendered = tm.render('welcome', { name: 'Alice', companyName: 'Acme' })
 * await sock.sendMessage(jid, { text: rendered })
 */
export const createTemplateManager = (includePresets = true): TemplateManager => {
	const manager = new TemplateManager()
	if (includePresets) {
		for (const [key, template] of Object.entries(PRESET_TEMPLATES)) {
			manager.create({ ...template, id: key.toLowerCase() })
		}
	}
	return manager
}

/**
 * Standalone render function — no manager needed.
 *
 * @example
 * const text = renderTemplate('Hello {{name}}!', { name: 'Alice' })
 * // → 'Hello Alice!'
 */
export const renderTemplate = (content: string, data: TemplateData = {}): string => {
	return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (_match, name: string, defaultValue: string | undefined) => {
		const value = data[name]
		if (value !== undefined && value !== null) return String(value)
		if (defaultValue !== undefined) return defaultValue
		return _match
	})
}
