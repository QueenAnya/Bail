# CI diagnostics without RDP

The GitHub Actions workflow `.github/workflows/diagnostics.yml` runs on pushes to `master` and can also be started manually from **Actions → Build Lint Test Diagnostics → Run workflow**.

It installs dependencies, then runs `yarn build`, `yarn lint`, and `yarn test --runInBand`. Each command's combined output and exit code are saved separately. The workflow uploads these files as the `anya-build-lint-test-logs` artifact even when a check fails:

- `build-output.txt` and `build-exit-code.txt`
- `lint-output.txt` and `lint-exit-code.txt`
- `test-output.txt` and `test-exit-code.txt`

Download the artifact from the completed GitHub Actions run and share the relevant `.txt` logs. This avoids manually copying thousands of lines from an RDP session.

The workflow deliberately continues after individual checks fail so all three logs are collected. The final step still marks the job failed if any check exits non-zero.
