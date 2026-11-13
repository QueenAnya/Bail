> Halaman ini belum diterjemahkan — isinya masih dalam bahasa Inggris.

## Elaina-derived interactive APIs (V2 naming)

Elaina-derived carousel, native-flow, section, list, card and rich-message helpers have explicit `V2` aliases exported from `src/Extras/v2.ts` and re-exported through `src/Extras/index.ts`. These aliases are a naming layer for the ported API, not a separate wire protocol. The Elaina general-purpose builder is also exported as `ElainaButtonV2`; do not infer that Anya had a pre-existing `ButtonV2` API.

See the V2 naming guide for import guidance and the alias families.
