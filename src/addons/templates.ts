/**
 * Message Templates System
 * Source: @innovatorssoft/baileys templates.js
 */
export type TemplateVariable = { name: string; defaultValue?: string; required: boolean }
export type MessageTemplate = {
	id: string
	name: string
	content: string
	description?: string
	category?: string
	variables: TemplateVariable[]
	createdAt: Date
	updatedAt: Date
}
export type TemplateUpdateData = Partial<Omit<MessageTemplate, 'id' | 'createdAt' | 'variables'>>

export class TemplateManager {
	private templates = new Map<string, MessageTemplate>()

	private generateId() {
		return `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	private extractVariables(content: string): TemplateVariable[] {
		const regex = /\{\{(\w+)(?::([^}]*))?\}\}/g
		const variables: TemplateVariable[] = []
		const seen = new Set<string>()
		let match: RegExpExecArray | null
		while ((match = regex.exec(content)) !== null) {
			const name = match[1]!
			if (!seen.has(name)) {
				seen.add(name)
				variables.push({ name, defaultValue: match[2], required: !match[2] })
			}
		}
		return variables
	}

	create(options: Omit<MessageTemplate, 'variables' | 'createdAt' | 'updatedAt'> & { id?: string }): MessageTemplate {
		const template: MessageTemplate = {
			...options,
			id: options.id ?? this.generateId(),
			variables: this.extractVariables(options.content),
			createdAt: new Date(),
			updatedAt: new Date()
		}
		this.templates.set(template.id, template)
		return template
	}

	get(id: string) {
		return this.templates.get(id)
	}
	getByName(name: string) {
		return Array.from(this.templates.values()).find(t => t.name === name)
	}
	getAll() {
		return Array.from(this.templates.values())
	}
	getByCategory(category: string) {
		return Array.from(this.templates.values()).filter(t => t.category === category)
	}

	update(id: string, updates: TemplateUpdateData): MessageTemplate | undefined {
		const template = this.templates.get(id)
		if (!template) return undefined
		const updated = {
			...template,
			...updates,
			...(updates.content ? { variables: this.extractVariables(updates.content) } : {}),
			updatedAt: new Date()
		}
		this.templates.set(id, updated)
		return updated
	}

	delete(id: string) {
		return this.templates.delete(id)
	}

	render(id: string, data: Record<string, string | number> = {}): string {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)
		return this.renderContent(template.content, data)
	}

	renderContent(content: string, data: Record<string, string | number> = {}): string {
		return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (match, name, defaultValue) => {
			const value = data[name]
			if (value !== undefined && value !== null) return String(value)
			if (defaultValue !== undefined) return defaultValue
			return match
		})
	}

	validate(id: string, data: Record<string, any>) {
		const template = this.templates.get(id)
		if (!template) throw new Error(`Template not found: ${id}`)
		const missing = template.variables.filter(v => v.required && !(v.name in data)).map(v => v.name)
		return { valid: missing.length === 0, missing }
	}

	export() {
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
	REMINDER: {
		name: 'Reminder',
		category: 'notification',
		content: `⏰ *Reminder*\n\nHi {{name}},\n\nThis is a friendly reminder about:\n📋 {{subject}}\n\n📅 Date: {{date}}\n🕐 Time: {{time}}\n\nDon't forget! 🙏`
	},
	BIRTHDAY: {
		name: 'Birthday Wishes',
		category: 'greeting',
		content: `🎂 *Happy Birthday, {{name}}!* 🎉\n\nWishing you a wonderful day! 🥳\n\n🎁 Use code: {{code:BIRTHDAY}} for {{discount:10}}% off!`
	}
}

export const createTemplateManager = (includePresets = true): TemplateManager => {
	const manager = new TemplateManager()
	if (includePresets) {
		for (const [key, template] of Object.entries(PRESET_TEMPLATES))
			manager.create({ ...template, id: key.toLowerCase() })
	}
	return manager
}

export const renderTemplate = (content: string, data: Record<string, string | number> = {}): string =>
	content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (match, name, defaultValue) => {
		const value = data[name]
		if (value !== undefined && value !== null) return String(value)
		if (defaultValue !== undefined) return defaultValue
		return match
	})
