#!/usr/bin/env node
/**
 * Verifies that everything the repository needs actually reaches GitHub.
 *
 * `.gitignore` is the one file that can silently break CI: a rule like `docs/*` keeps the documentation site's source
 * out of the repo, so `docs.yml` / `pages.yml` build an empty site, and a rule like `lib` also swallows `scripts/lib/`,
 * so the README tooling cannot import its own helper. Neither shows up locally — the files are on disk, just not in git.
 *
 *   node scripts/check-tracked.mjs          # report + exit 1 when a required path is ignored
 *   node scripts/check-tracked.mjs --all    # also list ignored paths that are fine to ignore
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const showAll = process.argv.includes('--all')

/** Paths the workflows, the docs site and the build genuinely need. */
const REQUIRED = [
	'package.json',
	'yarn.lock',
	'.yarnrc.yml',
	'src',
	'test',
	'WAProto',
	'assets/wasm',
	'scripts',
	'scripts/lib/headings.mjs',
	'script',
	'docs/wiki',
	'docs/en',
	'docs/meta.json',
	'.github/workflows',
	'tsconfig.build.json',
	'typedoc.json'
]

/** Ignored paths that are expected — build output, local scripts, credentials. */
const INTENTIONAL = [
	'node_modules',
	'/lib',
	'site',
	'site-api.json',
	'.wa-bundle',
	'README.generated.md',
	'u.sh',
	'u2.sh',
	'auth_info',
	'.env'
]

const git = (...args) => {
	try {
		return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
	} catch {
		return null
	}
}

const isGitRepo = git('rev-parse', '--is-inside-work-tree') === 'true'
if (!isGitRepo) {
	console.error('check-tracked: not a git repository, nothing to compare')
	process.exit(2)
}

const ignored = path => {
	try {
		// --no-index: ask .gitignore, not the index — a file already added stays tracked, which hides the rule
		execFileSync('git', ['check-ignore', '-q', '--no-index', path], { cwd: ROOT, stdio: 'ignore' })
		return true
	} catch {
		return false
	}
}

const problems = []

for (const path of REQUIRED) {
	if (!existsSync(join(ROOT, path))) {
		problems.push(`${path} does not exist`)
		continue
	}

	if (ignored(path)) {
		let rule = ''
		try {
			rule = execFileSync('git', ['check-ignore', '-v', '--no-index', path], { cwd: ROOT, encoding: 'utf8' })
				.trim()
				.split('\t')[0]
		} catch {}

		problems.push(`${path} is gitignored${rule ? ` (${rule})` : ''} — it will never reach GitHub`)
	}
}

// how much of the tree is actually tracked
const tracked = (git('ls-files') ?? '').split('\n').filter(Boolean)
const onDisk = (git('ls-files', '--others', '--exclude-standard', '--cached') ?? '').split('\n').filter(Boolean)

if (problems.length) {
	console.error('✗ check-tracked: these are needed but ignored by git:')
	for (const problem of problems) console.error(`  - ${problem}`)
	console.error('\nFix .gitignore (anchor rules with a leading `/` so they only match the root), then re-add.')
	process.exit(1)
}

console.log(`✓ every required path is tracked (${tracked.length} files in git, ${onDisk.length} known to git)`)

if (showAll) {
	const all = (git('status', '--porcelain', '--ignored') ?? '')
		.split('\n')
		.filter(line => line.startsWith('!!'))
		.map(line => line.slice(3))

	const unexpected = all.filter(path => !INTENTIONAL.some(keep => path === keep || path.startsWith(`${keep}/`)))
	if (unexpected.length) {
		console.log('\nIgnored paths (check these are deliberate):')
		for (const path of unexpected) console.log(`  - ${path}`)
	}
}
