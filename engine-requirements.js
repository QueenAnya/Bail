const major = parseInt(process.versions.node.split('.')[0], 10)

// better-sqlite3 ^13 (a dependency, used by the SQLite auth state / Framework store) needs Node.js 22+
if (major < 22) {
	console.error(
		`\n❌ This package requires Node.js 22+ to run reliably.\n` +
			`   You are using Node.js ${process.versions.node}.\n` +
			`   Please upgrade to Node.js 22+ to proceed.\n`
	)
	process.exit(1)
}
