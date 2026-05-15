export interface TemplateVariable {
	name: string
	defaultValue?: string
	required?: boolean
}
export interface MessageTemplate {
	id: string
	name: string
	description?: string
	content: string
	variables: TemplateVariable[]
	category?: string
	createdAt: Date
	updatedAt: Date
}
export interface TemplateData {
	[key: string]: string | number | undefined
}

export class TemplateManager {
	private templates = new Map<string, MessageTemplate>()

	private generateId() {
		return `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
	}

	private extractVariables(content: string): TemplateVariable[] {
		const regex = /\{\{(\w+)(?::([^}]*))?\}\}/g
		const variables: TemplateVariable[] = []
		const seen = new Set<string>()
		let match
		while ((match = regex.exec(content)) !== null) {
			const name = match[1]
			if (!name || seen.has(name)) continue
			seen.add(name)
			variables.push({ name, defaultValue: match[2] })
		}
		return variables
	}

	create(options: {
		name: string
		content: string
		description?: string
		category?: string
		id?: string
	}): MessageTemplate {
		const id = options.id || this.generateId()
		const now = new Date()
		const tpl: MessageTemplate = {
			id,
			name: options.name,
			content: options.content,
			description: options.description,
			category: options.category,
			variables: this.extractVariables(options.content),
			createdAt: now,
			updatedAt: now
		}
		this.templates.set(id, tpl)
		return tpl
	}

	get(id: string): MessageTemplate | undefined {
		return this.templates.get(id)
	}
	getByName(name: string): MessageTemplate | undefined {
		return [...this.templates.values()].find(t => t.name === name)
	}
	getAll(): MessageTemplate[] {
		return [...this.templates.values()]
	}
	getByCategory(category: string): MessageTemplate[] {
		return [...this.templates.values()].filter(t => t.category === category)
	}

	update(id: string, updates: Partial<Omit<MessageTemplate, 'id' | 'createdAt'>>): MessageTemplate | undefined {
		const tpl = this.templates.get(id)
		if (!tpl) return undefined
		Object.assign(tpl, updates, { updatedAt: new Date() })
		if (updates.content) tpl.variables = this.extractVariables(tpl.content)
		return tpl
	}

	delete(id: string): boolean {
		return this.templates.delete(id)
	}

	renderContent(content: string, data: TemplateData = {}): string {
		return content.replace(/\{\{(\w+)(?::([^}]*))?\}\}/g, (_, name, defaultVal) => {
			const val = data[name]
			if (val !== undefined) return String(val)
			if (defaultVal !== undefined) return defaultVal
			return `{{${name}}}`
		})
	}

	render(id: string, data?: TemplateData): string {
		const tpl = this.templates.get(id)
		if (!tpl) throw new Error(`Template not found: ${id}`)
		return this.renderContent(tpl.content, data)
	}

	validate(id: string, data: TemplateData): { valid: boolean; missing: string[] } {
		const tpl = this.templates.get(id)
		if (!tpl) return { valid: false, missing: [] }
		const missing = tpl.variables.filter(v => v.required && data[v.name] === undefined).map(v => v.name)
		return { valid: missing.length === 0, missing }
	}

	export(): string {
		return JSON.stringify([...this.templates.values()], null, 2)
	}

	import(json: string, overwrite = false): number {
		const items: MessageTemplate[] = JSON.parse(json)
		let count = 0
		for (const tpl of items) {
			if (!overwrite && this.templates.has(tpl.id)) continue
			this.templates.set(tpl.id, { ...tpl, createdAt: new Date(tpl.createdAt), updatedAt: new Date(tpl.updatedAt) })
			count++
		}
		return count
	}
}

export const PRESET_TEMPLATES: Record<string, Omit<MessageTemplate, 'id' | 'createdAt' | 'updatedAt' | 'variables'>> = {
	greeting: { name: 'Greeting', content: 'Hello {{name}}! Welcome to {{company}}.', category: 'onboarding' },
	reminder: {
		name: 'Reminder',
		content: 'Hi {{name}}, this is a reminder for {{event}} on {{date}}.',
		category: 'notifications'
	},
	farewell: { name: 'Farewell', content: 'Goodbye {{name}}! Thank you for being with us.', category: 'general' }
}

export const createTemplateManager = (includePresets = false): TemplateManager => {
	const manager = new TemplateManager()
	if (includePresets) {
		for (const [, preset] of Object.entries(PRESET_TEMPLATES)) {
			manager.create(preset as any)
		}
	}
	return manager
}

export const renderTemplate = (content: string, data?: TemplateData): string =>
	new TemplateManager().renderContent(content, data)
