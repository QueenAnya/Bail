# Notable behaviour changes

Things that differ from upstream Baileys, and will surprise you if you are porting code over.

### Auth state

- **`list()` on every adapter.** Upstream leaves it out; here every adapter can enumerate its records, which is what
  makes `migrateAuthState` possible.
- **`session` on every adapter.** Omit it and the layout is byte-identical to before, so existing deployments do not
  move.
- **`creds.saved` in the migration result.** A bare state cannot persist itself — pass the adapter object and it is
  saved for you.
- **SQLite needs `dbPath`.** A missing or misspelled option throws instead of silently creating an in-memory database.

### Messages

- **`extractMessageContent` first.** Wrapper keys (`ephemeralMessage`, `viewOnceMessage`, …) mean `conversation` is
  empty for most real traffic.
- **`sendMessage` returns the sent message.** Use `msg.key` for reactions and edits, not the key you passed in.
- **Retries need `getMessage`.** Without it, a decrypt retry on an old message cannot be resolved.

### Socket

- **`AnchorGuard` is opt-in** and needs its own package; nothing is loaded unless you ask for it.
- **`markOnlineOnConnect` defaults to `true`.** A bot that should stay invisible must set it to `false`.
- **`emitOwnEvents` defaults to `false`.** Set it to `true` if you want your own messages in `messages.upsert`.

### Tooling

- **`npm run test2`** is the local suite (202 tests, no network). `npm test` is the jest suite over `src/__tests__`.
- **`npm run readme`** checks that the README is complete: every source file mentioned, every internal link resolving,
  the index listing every section, and `.github/README.md` in step. `npm run readme:check` is the quiet CI form —
  it exits non-zero on drift. Neither command rewrites anything.
- **`npm run readme:generate`** rebuilds the reference sections from `docs/wiki/`, `docs/en/` and the source, and writes
  them to `README.generated.md`. The README itself is not touched — diff the two and copy what you want.
- **`npm run readme:apply`** writes those sections straight into the README, but only between the marker pairs
  (`<!-- BEGIN GENERATED: wiki -->` … `<!-- END GENERATED: api -->`) — hand-written prose is never touched. It always
  rebuilds the index as well, so a single command refreshes both the reference blocks and the table of contents.
- **`npm run readme:index`** rebuilds only the `📚 Index` table of contents from **every** heading — H1, H2 and H3 —
  as a nested list, leaving every other line alone. Anchors follow GitHub's rules
  (`## ⚠️ Important Notice` → `#-important-notice`) and duplicate titles get the `-1`, `-2` suffixes GitHub adds.
  Headings inside code fences are skipped, so a bash comment like `# or` is not mistaken for a section.
  `node scripts/generate-readme.mjs --index --depth=4` also lists the H4 sub-sections.
- **`node scripts/sync-readme.mjs`** copies the README into `.github/README.md` with the asset paths adjusted.
- **`yarn install`, not `npm install`, in this repository.** `yarn.lock` is a yarn 4 lockfile; npm rewrites that file in
  the old v1 format whenever it runs. If you did run `npm install`, run `yarn install` once before committing so the lock
  you push is the yarn 4 one.
- **`npm run check:tracked`** proves that everything the build, the docs site and the workflows need is actually tracked
  by git. A `.gitignore` rule like `docs/*` keeps the wiki out of the repository while the files still sit on disk, so
  CI builds an empty site and the failure looks unrelated. Runs as the first step of the build workflow.
- **`node scripts/live-check.mjs`** exercises the risky paths against a real account; see `docs/live-test.md`.
