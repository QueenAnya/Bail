/**
 * Heading helpers shared by `build-readme.mjs` (the checker) and `generate-readme.mjs` (the generator), so the index
 * they agree on cannot drift.
 */

/** GitHub's anchor rules: lowercase, drop punctuation, spaces to dashes, keep the dash an emoji leaves behind. */
export const slugify = title =>
	title
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-')

/**
 * Every heading in a markdown file, outside code fences, skipping the `📚 Index` section itself.
 *
 * Code fences matter: the README contains bash comments like `# or`, which look exactly like an H1.
 */
export const collectHeadings = (markdown, maxDepth = 3) => {
	const out = []
	let fence = false
	let inIndex = false

	for (const line of markdown.split('\n')) {
		if (line.trim().startsWith('```')) {
			fence = !fence
			continue
		}

		if (fence) {
			continue
		}

		const match = line.match(/^(#{1,6})\s+(.*)$/)
		if (!match) {
			continue
		}

		const level = match[1].length
		const title = match[2].trim()

		if (level === 2 && title === '📚 Index') {
			inIndex = true
			continue
		}

		// the index is a flat list of links; the next real section closes it
		if (inIndex) {
			if (level <= 2) {
				inIndex = false
			} else {
				continue
			}
		}

		if (level > maxDepth) {
			continue
		}

		out.push({ level, title })
	}

	return out
}

/**
 * Headings with their anchor, de-duplicated the way GitHub does it: the second "Install" becomes `#install-1`.
 */
export const headingsWithAnchors = (markdown, maxDepth = 3) => {
	const seen = new Map()

	return collectHeadings(markdown, maxDepth).map(heading => {
		const base = slugify(heading.title)
		const count = seen.get(base) ?? 0
		seen.set(base, count + 1)

		return { ...heading, anchor: count === 0 ? base : `${base}-${count}` }
	})
}

/** Renders the `📚 Index` section as a nested list. */
export const renderIndex = (markdown, maxDepth = 3) => {
	const headings = headingsWithAnchors(markdown, maxDepth)
	const lines = ['## 📚 Index', '']

	for (const heading of headings) {
		const indent = '  '.repeat(Math.max(heading.level - 1, 0))
		lines.push(`${indent}- [${heading.title}](#${heading.anchor})`)
	}

	lines.push('')
	return { body: lines.join('\n'), headings }
}
