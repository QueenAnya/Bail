# Updating the WhatsApp Web version

WhatsApp Web pins a version string; when it moves, an old client starts failing with `405`/`428`. Two things keep it
current:

```bash
node scripts/update-version.ts        # fetch the current version and write it into src/Defaults
npm run proto:update                  # refresh the proto definitions
```

`.github/workflows/update-version.yml` runs the first daily at 00:00 IST and opens a PR with the change, and
`proto-watch.yml` does the same for the proto. Both open a branch and a pull request rather than pushing to `master`, so
you review the bump before it ships.
