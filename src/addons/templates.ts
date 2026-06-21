/**
 * Message Template System
 *
 * Source: @innovatorssoft/baileys (templates.js)
 * Rewritten as clean TypeScript with full types and JSDoc.
 *
 * Variable syntax: `{{variableName}}` or `{{variableName:defaultValue}}`
 * Required variables have no default. Optional variables provide a fallback.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type TemplateVariable = {
	name: string
	defaultValue?: string
	required: boolean
}

export type Template = {
	id: string
	name: string
	content: string
	description?: string
	category?: string
	variables: TemplateVariable[]
	createdAt: Date
	updatedAt: Date
}

export type TemplateCreateOptions = {
	id?: string
	name: string
	content: string
	description?: string
	category?: string
}

export type TemplateUpdateOptions = Partial<Omit<TemplateCreateOptions, 'id'>>

export type TemplateValidationResult = {
	valid: boolean
	/** Names of required variables that are missing from the supplied data */
	missing: string[]
}

// ─── TemplateManager ─────────────────────────────────────────────────────────

/**
 * Manage reusable message templates with `{{variable:default}}` interpolation.
 *
 * @example
 * const mgr = createTemplateManager()
 * const tpl = mgr.getByName('Welcome Message')!
 * const text = mgr.render(tpl.id, { name: 'Alice', companyName: 'Acme' })
 * await sock.sendMessage(jid, { text })
 */
export class TemplateManager {
	private readonly templates = new Map<string, Template>()

	private generateId(): string {
		return `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
	}

	private extractVariables(content: string): TemplateVariable[] {
		const rx = /\{\{(\w+)(?::([^}]*))?\}\}/g
		const seen = new Set<string>()
		const result: TemplateVariable[] = []
		let match: RegExpExecArray | null
		while ((match = rx.exec(content)) !== null) {
			const name = match[1]
			if (!name || seen.has(name)) continue
			seen.add(name)
			result.push({
				name,
				defaultValue: match[2],
				required: match[2] === undefined
			})
		}

		return result
	}

	/** Create and store a new template. */
	create(options: TemplateCreateOptions): Template {
		const template: Template = {
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

	/** Look up a template by ID. */
	get(id: string): Template | undefined {
		return this.templates.get(id)
	}

	/** Look up a template by exact name. */
	getByName(name: string): Template | undefined {
		return Array.from(this.templates.values()).find(t => t.name === name)
	}

	/** Return all templates. */
	getAll(): Template[] {
		return Array.from(this.templates.values())
	}

	/** Return all templates in a category. */
	getByCategory(category: string): Template[] {
		return Array.from(this.templates.values()).filter(t => t.category === category)
	}

	/** Update an existing template. Returns `undefined` if the ID is not found. */
	update(id: string, updates: TemplateUpdateOptions): Template | undefined {
		const template = this.templates.get(id)
		if (!template) return undefined
		const updated: Template = {
			...template,
			...updates,
			variables: updates.content ? this.extractVariables(updates.content) : template.variables,
			updatedAt: new Date()
		}
		this.templates.set(id, updated)
		return updated
	}

	/** Delete a template by ID. Returns `true` if it existed. */
	delete(id: string): boolean {
		return this.templates.delete(id)
	}

	/**
	 * Render a template by ID with the supplied variable data.
	 * Unreplaced required variables are left as their original `{{name}}` token.
	 * @throws If the template ID does not exist
	 */
	render(id: string, data: Record<string, string | number | boolean> = {}): string {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)
		return this.renderContent(template.content, data)
	}

	/**
	 * Render an arbitrary template string (no ID lookup).
	 */
	renderContent(content: string, data: Record<string, string | number | boolean> = {}): string {
		return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (_match, name: string, defaultValue?: string) => {
			const value = data[name]
			if (value !== undefined && value !== null) return String(value)
			if (defaultValue !== undefined) return defaultValue
			return _match
		})
	}

	/**
	 * Validate that all required variables are present in `data`.
	 */
	validate(id: string, data: Record<string, unknown>): TemplateValidationResult {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)
		const missing = template.variables.filter(v => v.required && !(v.name in data)).map(v => v.name)
		return { valid: missing.length === 0, missing }
	}

	/** Serialise all templates to a JSON string (for persistence). */
	export(): string {
		return JSON.stringify(Array.from(this.templates.values()), null, 2)
	}

	/**
	 * Import templates from a previously exported JSON string.
	 * @param overwrite - Replace existing templates with the same ID (default: `false`)
	 * @returns Number of templates imported
	 */
	import(json: string, overwrite = false): number {
		const items = JSON.parse(json) as Template[]
		let count = 0
		for (const item of items) {
			if (!overwrite && this.templates.has(item.id)) continue
			this.templates.set(item.id, {
				...item,
				createdAt: new Date(item.createdAt),
				updatedAt: new Date(item.updatedAt)
			})
			count++
		}

		return count
	}

	get size(): number {
		return this.templates.size
	}
}

// ─── Preset templates ─────────────────────────────────────────────────────────

export const PRESET_TEMPLATES: Record<string, TemplateCreateOptions> = {
	ORDER_CONFIRMATION: {
		name: 'Order Confirmation',
		category: 'order',
		description: 'Sent when an order is placed',
		content: `✅ *Order Confirmed!*\n\nOrder ID: #{{orderId}}\nCustomer: {{customerName}}\nDate: {{orderDate}}\n\n📦 *Items:*\n{{items}}\n\n💰 *Total: {{currency:USD}} {{total}}*\n\nThank you for your order! 🙏`
	},
	ORDER_SHIPPED: {
		name: 'Order Shipped',
		category: 'order',
		description: 'Sent when an order ships',
		content: `📦 *Your Order is On The Way!*\n\nOrder ID: #{{orderId}}\nTracking: {{trackingNumber}}\nCourier: {{courier}}\n\nEstimated delivery: {{estimatedDate}}\n\nTrack your package: {{trackingUrl:}}`
	},
	INVOICE: {
		name: 'Invoice',
		category: 'invoice',
		description: 'Standard invoice template',
		content: `📄 *INVOICE*\n\nInvoice #: {{invoiceNumber}}\nDate: {{invoiceDate}}\nDue Date: {{dueDate}}\n\n*Bill To:*\n{{customerName}}\n{{customerAddress:}}\n\n*Items:*\n{{items}}\n\nSubtotal: {{currency:USD}} {{subtotal}}\nTax ({{taxRate:0}}%): {{currency:USD}} {{tax}}\n*Total: {{currency:USD}} {{total}}*\n\nPayment Method: {{paymentMethod:Bank Transfer}}`
	},
	WELCOME: {
		name: 'Welcome Message',
		category: 'greeting',
		description: 'Onboarding welcome message',
		content: `👋 *Welcome, {{name}}!*\n\nThank you for joining {{companyName:us}}!\n\nWe're excited to have you. Here's what you can do:\n{{features:- Explore our products\n- Get exclusive offers\n- 24/7 support}}\n\nNeed help? Just reply to this message!`
	},
	BIRTHDAY: {
		name: 'Birthday Wishes',
		category: 'greeting',
		description: 'Birthday greeting with optional discount code',
		content: `🎂 *Happy Birthday, {{name}}!* 🎉\n\nWishing you a wonderful day filled with joy!\n\n🎁 As a special gift, here's {{discount:10}}% off your next purchase!\nUse code: {{code:BDAY}}\n\nHave a great celebration! 🥳`
	},
	REMINDER: {
		name: 'Reminder',
		category: 'notification',
		description: 'General event/task reminder',
		content: `⏰ *Reminder*\n\nHi {{name}},\n\nThis is a friendly reminder about:\n📋 {{subject}}\n\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location:TBD}}\n\n{{notes:}}\n\nDon't forget! 🙏`
	},
	APPOINTMENT: {
		name: 'Appointment Confirmation',
		category: 'notification',
		description: 'Service appointment confirmation',
		content: `📅 *Appointment Confirmed*\n\nHi {{name}},\n\nYour appointment has been scheduled:\n\n📋 Service: {{service}}\n📅 Date: {{date}}\n🕐 Time: {{time}}\n📍 Location: {{location}}\n\nPlease arrive 10 minutes early.\n\nNeed to reschedule? Reply to this message.`
	},
	SUPPORT_TICKET: {
		name: 'Support Ticket Created',
		category: 'support',
		description: 'Sent when a support ticket is opened',
		content: `🎫 *Support Ticket Created*\n\nTicket #: {{ticketId}}\nSubject: {{subject}}\nPriority: {{priority:Normal}}\n\nHi {{name}},\n\nWe've received your request and our team is working on it.\n\nExpected response time: {{responseTime:24 hours}}\n\nThank you for your patience! 🙏`
	},
	SUPPORT_RESOLVED: {
		name: 'Support Resolved',
		category: 'support',
		description: 'Sent when a support ticket is resolved',
		content: `✅ *Issue Resolved*\n\nTicket #: {{ticketId}}\n\nHi {{name}},\n\nYour issue has been resolved:\n\n*Solution:*\n{{solution}}\n\nIf you need further assistance, please reply to this message.\n\nThank you! 🙏`
	}
}

// ─── Factory helpers ──────────────────────────────────────────────────────────

/**
 * Create a TemplateManager pre-loaded with the 9 built-in preset templates.
 *
 * @param includePresets - Whether to load the preset templates (default: `true`)
 */
export const createTemplateManager = (includePresets = true): TemplateManager => {
	const mgr = new TemplateManager()
	if (includePresets) {
		for (const [key, template] of Object.entries(PRESET_TEMPLATES)) {
			mgr.create({ ...template, id: key.toLowerCase() })
		}
	}

	return mgr
}

/**
 * One-shot template render without a TemplateManager instance.
 *
 * @example
 * const text = renderTemplate('Hello {{name}}, your order #{{orderId}} is ready!', {
 *     name: 'Alice', orderId: '1234'
 * })
 */
export const renderTemplate = (content: string, data: Record<string, string | number | boolean> = {}): string =>
	content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (_match, name: string, defaultValue?: string) => {
		const value = data[name]
		if (value !== undefined && value !== null) return String(value)
		if (defaultValue !== undefined) return defaultValue
		return _match
	})
