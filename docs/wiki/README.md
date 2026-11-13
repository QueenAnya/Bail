# Anya Baileys — wiki

The [README](../README.md) is the full manual — usage **and** reference in one file, written by hand. This folder holds
the same reference split into pages so the documentation site can publish it, plus the per-feature guides in
[`../en/`](../en/).

The two are maintained side by side: a change to one should be made to the other. `node scripts/sync-readme.mjs` keeps
`.github/README.md` in step with `README.md`, but nothing copies between the wiki and the README.

## Pages

| Page | What is in it |
| --- | --- |
| [Auth state adapters](auth-state.md) | multi-file, single-file, SQLite ×2, MySQL, PostgreSQL, Redis, MongoDB ×2, NekoDB, Turso — options, `session`, `clearAuth`, `close` |
| [Store APIs](store.md) | `makeInMemoryStore`, ordered dictionary, chat and message keys |
| [Newsletter / channels](newsletter.md) | all 55 newsletter methods, query ids and generations, endpoint allowlist |
| [Socket methods](socket-methods.md) | account, chat and message helper methods |
| [Message content](message-content.md) | every content key and every message type |
| [MessageBuilder and AIRich](messagebuilder.md) | buttons, carousels, rich responses, bot signature |
| [VoIP](voip.md) | call signalling, diagnostics, call timelines |
| [In-app HTML webview](webview.md) | the `webView` payload and its options |
| [Calls, queues and screen sharing](calls.md) | group calls, queue handling, screen sharing |
| [Native flow payloads](native-flow.md) | raw native-flow examples, without the helper builders |
| [V2 interactive names](interactive-v2.md) | the 222 `…V2` aliases and where they come from |
| [Account health signals](account-health.md) | reachout timelock, new-chat caps, enforcement notices |
| [Pairing code](pairing.md) | pairing-code flow, the ready queue, custom codes |
| [AnchorGuard](anchor-guard.md) | anti-force-close guard: crash payloads, spam-add, every option |
| [External ad reply](ad-reply.md) | the ad-style card and why it sometimes does not render |
| [Link previews](link-previews.md) | rich link cards, status preview styles, reading one back |
| [A2UI cards](a2ui.md) | the A2UI node builders and catalog |
| [Message types](message-types.md) | wrapper keys, and why `conversation` is empty |
| [Content keys](content-keys.md) | every key `sendMessage` accepts |
| [Modern messages](modern-messages.md) | the ported modern content builders |
| [Scheduled messages](scheduled-messages.md) | the client-side scheduler |
| [Groups](groups.md) | participants, invites, join requests, settings |
| [Communities](communities.md) | creating, linking groups, settings |
| [Chat state](chat-state.md) | chats extras, labels, history resync |
| [Privacy](privacy.md) | disappearing timers, blocking, reporting |
| [Presence](presence.md) | typing, online state, read receipts, checking a number |
| [Profile photos](profile-photos.md) | reading, changing and removing |
| [Business](business.md) | catalog, quick replies, member labels |
| [Channels](channels.md) | the admin side of newsletters |
| [Calls in depth](calls-deep.md) | voice, video, group calls, screen sharing |
| [Events](events.md) | every event and its payload |
| [Socket config](socket-config.md) | every `makeWASocket` option |
| [Internals](internals.md) | a map of `Socket`, `Signal`, `Voip`, `WABinary`, `WAM`, `WAUSync` |
| [Framework](framework.md) | `Bot`, `SQLiteStore`, `SessionManager`, `StatsManager`, `MediaManager` |
| [Useful exports](useful-exports.md) | the helpers you reach for once a bot grows |
| [Updating the version](updating-version.md) | the version and proto refresh workflows |
| [Behaviour changes](behaviour-changes.md) | what differs from upstream |
| [Migration](migration.md) | coming from upstream Baileys |
| [Troubleshooting](troubleshooting.md) | the errors people actually hit |

## Not in the wiki

- [Live testing the risky paths](../live-test.md) — run `scripts/live-check.mjs` against a real account
- [Per-feature guides](../en/) — newsletter setup, sessions, and the rest
- [Full historical reference](../reference-full.md) — the pre-wiki dump, kept for archaeology

## Conventions

- Every page starts with a link back to the README.
- Code examples are TypeScript and use the public package name, `@teamolduser/baileys`.
- If a method here is not on the socket, that is a bug — `scripts/audit-elaina-parity.mjs` and the unit suite should
  have caught it. Open an issue.
