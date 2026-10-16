# Original VoIP source snapshots (repository-only)

These folders are retained at the repository root for maintenance and source comparison. They are not imported by the build, are not exported by the package, and are excluded from npm publication.

- `anya-pre-merge/`: Anya `src/Voip/` snapshot from before the unified public facade.
- `anya-standalone/`: older standalone Anya VoIP wrapper, kept for reference only.
- `elaina-voip2/`: original Elaina VoIP implementation, including its upstream license and notice.

The publishable merged implementation lives under `src/Voip/` and is exported through the package's existing `src/index.ts` barrel. Runtime WASM assets required by that merged implementation are kept under `assets/wasm/` and included in the npm package.
