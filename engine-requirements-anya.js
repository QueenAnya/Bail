/**
 * Anya's own Node floor.
 *
 * `engine-requirements.js` is WhiskeySockets' file, verbatim (Node 20+), and `engine-requirements2.js` is Elaina's,
 * verbatim (also Node 20+). Both declare a floor that is true for them; this package has one extra fact to account for:
 * `better-sqlite3` ^13 — used by the SQLite auth state and the Framework store — needs Node.js 22+.
 *
 * It is an *optional* dependency, so a Node 20 install succeeds and everything except those two features works. This
 * check therefore fails below 20 (nothing works there) and only warns between 20 and 22 (SQLite features are off).
 */
const major = parseInt(process.versions.node.split('.')[0], 10)

if (major < 20) {
	console.error(
		`\n❌ This package requires Node.js 20+.\n` +
			`   You are using Node.js ${process.versions.node}.\n` +
			`   Please upgrade to Node.js 20+ to proceed.\n`
	)
	process.exit(1)
}

if (major < 22) {
	console.warn(
		`\n⚠️  Node.js ${process.versions.node} works, but the SQLite auth state (useSqliteAuthState) and the Framework\n` +
			`   store need better-sqlite3, which requires Node.js 22+. Everything else runs fine on 20 and 21.\n`
	)
}
