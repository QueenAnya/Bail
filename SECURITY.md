# Security Policy

## Reporting a Vulnerability

**Do not file security issues as public GitHub issues, Discord posts, or PRs.** A public report is itself an exploit broadcast — many downstream projects pull this package from npm or from `github:Teamolduser/Baileys`, so a vulnerable version is in the wild within minutes.

Use this private channel:

**Preferred:** [GitHub Security Advisories](https://github.com/Teamolduser/Baileys/security/advisories/new) on this repository. It gives us a private workspace to coordinate the fix and to notify downstream projects without publishing an exploit.

If Advisories is unavailable to you, open a *private* report there anyway or contact the maintainer through the Discord linked in the README — do not post details in a public channel.

If you don't get an acknowledgement within **72 hours**, please re-send.

### Where a bug actually lives

Anya is derived from [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) (MIT) and
[@rexxhayanasi/elaina-baileys](https://github.com/rexxzyid/Elaina-baileys) (MIT). If the bug is present in upstream
Baileys, please also report it to the upstream project — a fix that only lands here leaves every other downstream
exposed. Upstream's own policy is in their `SECURITY.md`.

## What to include

A useful report contains:

- **Affected versions** (commit SHA or release tag)
- **Component**: socket, signal/crypto, auth state, message decoding, media handling, etc.
- **Impact**: what an attacker can do (read messages, hijack sessions, impersonate, DoS, etc.) and under what preconditions
- **Reproduction**: minimal code, captured stanza, or a deterministic test case. If repro requires a paired account or live connection, describe the setup instead — don't attach session state.
- **Suggested fix** (optional but appreciated)

If a fix touches the wire protocol or signal-protocol session state, please flag that explicitly — those changes need extra coordination because they affect persisted state on every downstream user.

## What we treat as a vulnerability

In scope:

- Auth state / key store leakage or downgrade
- Session, prekey, or sender-key handling that lets a remote party impersonate, replay, or decrypt outside the intended audience
- Memory corruption / RCE via crafted stanzas, media, or protobuf payloads
- Logic bugs that bypass intended access controls (e.g., reading messages from chats the local account isn't part of)
- Vulnerabilities in dependencies reachable through this package's public API
- Information disclosure (PII, message content, JIDs/phone numbers, tokens) through logs or error messages on default configurations

Out of scope (please file as regular issues or PRs):

- Bugs that only affect availability of the local process (a malformed input that throws an exception in your handler is not a CVE; a malformed input that lets a remote party crash any client built on this package is)
- Issues in third-party WhatsApp clones or in forks of this package
- Behavior of WhatsApp itself — we don't control the server; report those to Meta
- Missing rate limiting in _your_ application — Baileys doesn't add rate limiting on top of WhatsApp's
- Reports that boil down to "the library can be misused for spam." See `CODE_OF_CONDUCT.md` § Project-Specific Conduct; that's a contributions matter, not a vulnerability.

## Coordinated disclosure

Our default timeline:

| Day              | Step                                                                        |
| ---------------- | --------------------------------------------------------------------------- |
| 0                | Report received, acknowledged within 72h                                    |
| ≤ 7              | Initial assessment shared with reporter; severity and rough timeline agreed |
| ≤ 30             | Fix prepared on a private branch; reporter invited to validate if they want |
| Coordinated date | Fix merged, release published, advisory + CVE published                     |

If you need to disclose sooner (e.g., active exploitation in the wild), tell us — we'll prioritize accordingly. If a fix is taking longer than 30 days, we'll keep you updated and explain why.

We're happy to credit reporters in the advisory. Tell us how you'd like to be credited (name, handle, organization) or if you'd prefer to remain anonymous.

## Supported versions

Security fixes are backported to the **latest minor release line**. Older majors (≤ 6.x) are unmaintained — please upgrade. The `master` branch is also patched immediately, but downstream pinning to `master` is at your own risk for stability.

| Version         | Supported |
| --------------- | --------- |
| `7.x` (current) | ✅        |
| `< 7.0`         | ❌        |

## Operational security for users

A few notes for downstream users — these aren't vulnerabilities in Baileys, but they are common ways production systems leak:

- **`baileys_auth_info/` is equivalent to a long-lived credential.** Store it like an SSH private key. Don't commit it. Don't put it in container images. Encrypt it at rest if you can.
- **Logs leak.** The default logger emits debug-level information that includes JIDs and message metadata. Set `level: 'silent'` or filter aggressively in production.
- **Don't paste auth state into AI tools, screenshots, or support tickets.** It's not redactable — anyone with the directory contents can hijack the session.
- **Pin a release.** Pulling `github:Teamolduser/Baileys` always grabs `master`. Use a tagged release in production.

For non-security questions, see Discord (https://discord.gg/WeJM5FP9GG) or the wiki (https://baileys.wiki).

## Antivirus false positives

This is a WhatsApp client. It reads a session directory and opens a socket to WhatsApp, because that is what the
product is. That behaviour profile is also what "WhatsApp session stealer" malware looks like, so heuristic engines
flag it — and they flag every Baileys fork for the same reason. A detection on `assets/wasm/whatsapp.wasm`, a
`.node` file, or a name like `Wacatac` / `PUA` / `Heur` is a heuristic on an opaque binary, not evidence of a
payload.

What this repository does to keep that surface small, and what you can verify yourself:

- **The socket only dials WhatsApp.** `src/Socket/socket.ts` refuses any `waWebSocketUrl` that is not a WhatsApp
  host or loopback, unless the caller sets `allowCustomEndpoint`. A library that will connect anywhere is
  indistinguishable from one that phones home; the exception is now explicit. Covered by
  `test/endpoint-allowlist.test.js`, including lookalike-host and userinfo spoofing.
- **Session data is not sent anywhere.** There is no outbound host in `src/` other than WhatsApp's own; the checks
  used to confirm that are described in the project's security scan.
- **`importScripts` cannot execute arbitrary files.** The VoIP worker shim only evals `.js`/`.mjs` files that
  resolve inside the package directory.
- **No install-time downloads by default.** `ffmpeg-static` is an optional dependency; the library falls back to a
  system `ffmpeg`.
- **Signal is upstream.** `libsignal@^6`, not a republished fork. `test/signal-roundtrip.test.js` builds a session
  and encrypts/decrypts through it.
- **Published with provenance.** `npm publish --provenance` attaches a signed attestation of the commit and build
  that produced the tarball; verify with `npm audit signatures`.

If a scanner still flags a release, report it to the vendor as a false positive on the specific file (usually the
wasm or a prebuilt `.node`), and run the library in a container with an expendable number until the detection
clears. Signature-based scanning cannot distinguish "reads a session and talks to WhatsApp" from "steals a session";
only behaviour in a sandbox can.

## `@teamolduser/libsignal` — audited diff

`package.json` pins `libsignal` to `npm:@teamolduser/libsignal@1.0.1`, a fork of upstream `libsignal@6.0.0`
maintained by this project to silence the library's own console output. That fork has been diffed against upstream,
and the result is recorded here so nobody has to take it on trust:

| Check | Result |
|---|---|
| Files changed | 5 source files + `package.json`; nothing added or removed |
| Lines changed | 20 removed, 20 added — every added line is the same line commented out |
| Non-comment additions | none |
| New dependencies | none (deps identical to upstream) |
| New install scripts | none |
| Network / file / process code added | none |
| `package.json` differences | `name`, `version`, and the `packageManager` pin removed |

The five files are `src/curve.js`, `src/queue_job.js`, `src/session_builder.js`, `src/session_cipher.js` and
`src/session_record.js`; in each case a `console.error` / `console.warn` / `console.info` call is commented out.
`test/signal-roundtrip.test.js` builds a session and encrypts/decrypts against this fork, so the crypto path is
exercised, not just imported.

To re-verify after any version bump:

```bash
npm pack @teamolduser/libsignal@<version> && tar -xzf teamolduser-libsignal-*.tgz
npm pack libsignal@<upstream version>          && tar -xzf libsignal-*.tgz
diff -ru package fork/package | grep -E '^[<>]'
```

The console silencing lives entirely in the fork. If the fork is ever dropped in favour of upstream `libsignal`,
those ten `console.*` calls come back — that is the trade-off to remember, not something this repo works around.
