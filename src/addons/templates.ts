/**
 * Message Template Manager
 *
 * Variable-interpolation template system for reusable WhatsApp messages.
 * Syntax: {{variableName}} or {{variableName:defaultValue}}
 *
 * Includes preset templates: orders, invoices, greetings,
 * reminders, appointments, and support tickets.
 *
 * Source: @innovatorssoft/baileys (templates.js)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

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

export interface CreateTemplateOptions {
	id?: string
	name: string
	content: string
	description?: string
	category?: string
}

export interface ValidationResult {
	valid: boolean
	missing: string[]
}

// ─── TemplateManager class ────────────────────────────────────────────────────

export class TemplateManager {
	private templates = new Map<string, MessageTemplate>()

	private generateId(): string {
		return `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	private extractVariables(content: string): TemplateVariable[] {
		const regex = /\{\{(\w+)(?::([^}]*))?\}\}/g
		const vars: TemplateVariable[] = []
		const seen = new Set<string>()
		let match: RegExpExecArray | null

		while ((match = regex.exec(content)) !== null) {
			const name = match[1]!
			if (seen.has(name)) continue
			seen.add(name)
			const defaultValue = match[2]
			vars.push({ name, defaultValue, required: defaultValue === undefined })
		}
		return vars
	}

	/** Create and register a new template */
	create(options: CreateTemplateOptions): MessageTemplate {
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

	/** Get template by ID */
	get(id: string): MessageTemplate | undefined {
		return this.templates.get(id)
	}

	/** Get template by name */
	getByName(name: string): MessageTemplate | undefined {
		return Array.from(this.templates.values()).find(t => t.name === name)
	}

	/** Get all templates */
	getAll(): MessageTemplate[] {
		return Array.from(this.templates.values())
	}

	/** Get templates by category */
	getByCategory(category: string): MessageTemplate[] {
		return Array.from(this.templates.values()).filter(t => t.category === category)
	}

	/** Update an existing template */
	update(id: string, updates: Partial<CreateTemplateOptions>): MessageTemplate | undefined {
		const existing = this.templates.get(id)
		if (!existing) return undefined

		const updated: MessageTemplate = {
			...existing,
			...updates,
			variables: updates.content ? this.extractVariables(updates.content) : existing.variables,
			updatedAt: new Date()
		}
		this.templates.set(id, updated)
		return updated
	}

	/** Delete a template by ID */
	delete(id: string): boolean {
		return this.templates.delete(id)
	}

	/**
	 * Render a template by ID with variable substitution.
	 * @throws if the template is not found
	 */
	render(id: string, data: Record<string, string | number> = {}): string {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)
		return this.renderContent(template.content, data)
	}

	/** Render any content string with variable substitution */
	renderContent(content: string, data: Record<string, string | number> = {}): string {
		return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (_match, name: string, defaultValue?: string) => {
			const val = data[name]
			if (val !== undefined && val !== null) return String(val)
			if (defaultValue !== undefined) return defaultValue
			return _match
		})
	}

	/** Validate a template against provided data — returns missing required fields */
	validate(id: string, data: Record<string, any>): ValidationResult {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)

		const missing = template.variables.filter(v => v.required && !(v.name in data)).map(v => v.name)

		return { valid: missing.length === 0, missing }
	}

	/** Export all templates as JSON */
	export(): string {
		return JSON.stringify(Array.from(this.templates.values()), null, 2)
	}

	/** Import templates from JSON; set overwrite=true to replace existing */
	import(json: string, overwrite = false): number {
		const items = JSON.parse(json) as MessageTemplate[]
		let count = 0
		for (const t of items) {
			if (!overwrite && this.templates.has(t.id)) continue
			this.templates.set(t.id, {
				...t,
				createdAt: new Date(t.createdAt),
				updatedAt: new Date(t.updatedAt)
			})
			count++
		}
		return count
	}
}

// ─── Preset templates ─────────────────────────────────────────────────────────

export const PRESET_TEMPLATES: Record<string, Omit<CreateTemplateOptions, 'id'>> = {
	ORDER_CONFIRMATION: {
		name: 'Order Confirmation',
		category: 'order',
		content: `✅ *Order Confirmed!*\n\nOrder ID: #{{orderId}}\nCustomer: {{customerName}}\nDate: {{orderDate}}\n\n📦 *Items:*\n{{items}}\n\n💰 *Total: {{currency:$}} {{total}}*\n\nThank you for your order! 🙏`
	},
	ORDER_SHIPPED: {
		name: 'Order Shipped',
		category: 'order',
		content: `📦 *Your Order is On The Way!*\n\nOrder ID: #{{orderId}}\nTracking: {{trackingNumber}}\nCourier: {{courier}}\n\nEstimated delivery: {{estimatedDate}}\n\nTrack: {{trackingUrl:}}`
	},
	INVOICE: {
		name: 'Invoice',
		category: 'invoice',
		content: `📄 *INVOICE*\n\nInvoice #: {{invoiceNumber}}\nDate: {{invoiceDate}}\nDue Date: {{dueDate}}\n\n*Bill To:*\n{{customerName}}\n{{customerAddress:}}\n\n*Items:*\n{{items}}\n\nSubtotal: {{currency:$}} {{subtotal}}\nTax ({{taxRate:10}}%): {{currency:$}} {{tax}}\n*Total: {{currency:$}} {{total}}*\n\nPayment: {{paymentMethod:Bank Transfer}}`
	},
	WELCOME: {
		name: 'Welcome Message',
		category: 'greeting',
		content: `👋 *Welcome, {{name}}!*\n\nThank you for joining {{companyName:us}}!\n\nWe're excited to have you on board.\n\n{{features:Here's what you can explore:\n- Our products\n- Exclusive offers\n- 24/7 support}}\n\nNeed help? Just reply to this message!`
	},
	BIRTHDAY: {
		name: 'Birthday Wishes',
		category: 'greeting',
		content: `🎂 *Happy Birthday, {{name}}!* 🎉\n\nWishing you a wonderful day!\n\n🎁 Special gift: {{discount:10}}% off your next purchase!\nCode: {{code:BIRTHDAY}}\n\nHave a great celebration! 🥳`
	},
	REMINDER: {
		name: 'Reminder',
		category: 'notification',
		content: `⏰ *Reminder*\n\nHi {{name}},\n\n📋 {{subject}}\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location:TBD}}\n\n{{notes:}}\n\nDon't forget! 🙏`
	},
	APPOINTMENT: {
		name: 'Appointment Confirmation',
		category: 'notification',
		content: `📅 *Appointment Confirmed*\n\nHi {{name}},\n\n📋 Service: {{service}}\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location}}\n\nPlease arrive 10 minutes early.\nTo reschedule, reply to this message.`
	},
	SUPPORT_TICKET: {
		name: 'Support Ticket',
		category: 'support',
		content: `🎫 *Support Ticket Created*\n\nTicket #: {{ticketId}}\nSubject: {{subject}}\nPriority: {{priority:Normal}}\n\nHi {{name}},\nWe've received your request.\n\nExpected response: {{responseTime:24 hours}}\n\nThank you for your patience! 🙏`
	},
	SUPPORT_RESOLVED: {
		name: 'Support Resolved',
		category: 'support',
		content: `✅ *Issue Resolved*\n\nTicket #: {{ticketId}}\n\nHi {{name}},\n\nYour issue has been resolved:\n\n*Solution:*\n{{solution}}\n\nNeed more help? Just reply. 🙏`
	}
}

// ─── Factory + standalone renderer ───────────────────────────────────────────

/** Create a ready-to-use TemplateManager, optionally pre-loaded with preset templates */
export const createTemplateManager = (includePresets = true): TemplateManager => {
	const manager = new TemplateManager()
	if (includePresets) {
		for (const [key, tpl] of Object.entries(PRESET_TEMPLATES)) {
			manager.create({ ...tpl, id: key.toLowerCase() })
		}
	}
	return manager
}

/** Render any template content string directly — no manager needed */
export const renderTemplate = (content: string, data: Record<string, string | number> = {}): string =>
	content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (_match, name: string, defaultValue?: string) => {
		const val = data[name]
		if (val !== undefined && val !== null) return String(val)
		if (defaultValue !== undefined) return defaultValue
		return _match
	})
