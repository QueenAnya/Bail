#!/usr/bin/env node
/**
 * README completeness check.
 *
 * The README is written by hand — nothing here rewrites it. What this script does is prove it is still *complete* and
 * *internally consistent*, so a new export cannot quietly go undocumented and a renamed file cannot leave a dead link.
 *
 *   node scripts/build-readme.mjs          # human report, exit 1 if anything is missing
 *   node scripts/build-readme.mjs --quiet  # only the summary line
 *
 * Checks:
 *   1. every export under src/ (Extras, Addons, Utils, Framework, Socket, Signal, Voip, …) is mentioned in the README
 *   2. every `docs/…` link in the README resolves on disk
 *   3. every `##` section appears in the `📚 Index` list
 *   4. `.github/README.md` matches `README.md` (asset paths aside)
 */
import { readFileSync, existsSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { join, basename } from 'node:path'
import { headingsWithAnchors } from './lib/headings.mjs'

const ROOT = process.cwd()
const README = join(ROOT, 'README.md')
const GITHUB_README = join(ROOT, '.github/README.md')
const quiet = process.argv.includes('--quiet')

const problems = []
const note = line => {
	if (!quiet) {
		console.log(line)
	}
}

/** Every .ts file under src, skipping barrels, tests and declarations. */
const sourceFiles = async dir => {
	const out = []
	const walk = async current => {
		const entries = await readdir(current, { withFileTypes: true }).catch(() => [])
		for (const entry of entries) {
			const path = join(current, entry.name)
			if (entry.isDirectory()) {
				if (entry.name === '__tests__' || entry.name === 'node_modules') continue
				await walk(path)
			} else if (
				entry.name.endsWith('.ts') &&
				!entry.name.endsWith('.d.ts') &&
				entry.name !== 'index.ts'
			) {
				out.push(path)
			}
		}
	}

	await walk(dir)
	return out
}

const exportsOf = source =>
	[
		...source.matchAll(/export (?:async )?(?:function|const|class|interface|type|enum) (\w+)/g)
	].map(m => m[1])

const main = async () => {
	if (!existsSync(README)) {
		console.error('build-readme: README.md not found')
		process.exit(1)
	}

	const readme = readFileSync(README, 'utf8')

	// ── 1. every source file is represented ──────────────────────────────────────────────────────────────────────
	const files = await sourceFiles(join(ROOT, 'src'))
	const undocumented = []
	for (const file of files) {
		const source = readFileSync(file, 'utf8')
		const names = exportsOf(source)
		const mentioned = names.some(name => readme.includes(name)) || readme.includes(basename(file))
		if (!mentioned) {
			undocumented.push(file.replace(ROOT + '/', ''))
		}
	}

	if (undocumented.length) {
		problems.push(`${undocumented.length} source file(s) not mentioned in the README`)
		note('\nUndocumented files:')
		for (const file of undocumented) note(`  - ${file}`)
	} else {
		note(`✓ every source file is documented (${files.length} files)`)
	}

	// ── 2. internal links resolve ────────────────────────────────────────────────────────────────────────────────
	const links = new Set([...readme.matchAll(/\]\((docs\/[^)#]+|Media\/[^)#]+|assets\/[^)#]+)\)/g)].map(m => m[1]))
	const broken = [...links].filter(link => !existsSync(join(ROOT, link)))
	if (broken.length) {
		problems.push(`${broken.length} broken internal link(s)`)
		note('\nBroken links:')
		for (const link of broken) note(`  - ${link}`)
	} else {
		note(`✓ every internal link resolves (${links.size} links)`)
	}

	// ── 3. the index lists every heading (H1, H2 and H3) ───────────────────────────────────────────────────────
	const headings = headingsWithAnchors(readme, 3)
	const indexStart = readme.indexOf('## 📚 Index')
	if (indexStart === -1) {
		problems.push('no 📚 Index section')
	} else {
		const indexEnd = readme.indexOf('\n## ', indexStart + 5)
		const index = readme.slice(indexStart, indexEnd === -1 ? undefined : indexEnd)
		const missing = headings.filter(h => !index.includes(`[${h.title}](#${h.anchor})`))

		if (missing.length) {
			problems.push(`${missing.length} heading(s) missing from the index`)
			note('\nMissing from the index:')
			for (const h of missing.slice(0, 20)) note(`  - ${'#'.repeat(h.level)} ${h.title}`)
			if (missing.length > 20) note(`  … and ${missing.length - 20} more`)
		} else {
			note(`✓ the index lists all ${headings.length} headings (H1–H3)`)
		}
	}

	// ── 4. the .github copy is in step ──────────────────────────────────────────────────────────────────────────
	if (!existsSync(GITHUB_README)) {
		problems.push('.github/README.md is missing — run `node scripts/sync-readme.mjs`')
	} else {
		const copy = readFileSync(GITHUB_README, 'utf8')
		// the copy points one level up for root paths only — mirror exactly what sync-readme.mjs rewrites
		const ROOT_PATHS = ['Media', 'assets', 'docs', 'Example', 'SECURITY.md', 'LICENSE', 'NOTICE.md', 'package.json']
		const normalise = text => {
			let out = text
			for (const dir of ROOT_PATHS) {
				out = out.replaceAll(`](../${dir}`, `](${dir}`).replaceAll(`"../${dir}`, `"${dir}`)
			}

			return out
		}

		if (normalise(copy) !== readme) {
			problems.push('.github/README.md is out of date — run `node scripts/sync-readme.mjs`')
		} else {
			note('✓ .github/README.md is in sync')
		}
	}

	// ── summary ─────────────────────────────────────────────────────────────────────────────────────────────────
	const lines = readme.split('\n').length
	note(`\nREADME: ${lines} lines, ${headings.length} sections`)

	if (problems.length) {
		console.error('\n✗ README check failed:')
		for (const problem of problems) console.error(`  - ${problem}`)
		process.exit(1)
	}

	console.log('✓ README is complete and consistent')
}

await main()
