# Anya Baileys

Anya Baileys is a WhatsApp Multi-Device library for Node.js. It provides a WebSocket-based WhatsApp client, typed protocol definitions, socket methods, authentication-state adapters, and additional helpers.

> **Important:** This is an unofficial library that interacts with WhatsApp's private protocol. Protocol behavior can change without notice. Use it responsibly and protect account credentials.

## Start here

- [Getting started](./getting-started.md) — install, connect, and persist credentials.
- [Pairing code](./pairing.md) — link a device without scanning a QR code.
- [Messages](./messages.md) — receive and send messages.
- [MessageBuilder](./builder.md) — create interactive messages and use static helper functions.
- [Groups](./groups.md) — create groups and manage participants.
- [Newsletters](./newsletter.md) — work with WhatsApp channels.
- [Session storage](./sessions.md) — choose a local or database-backed auth store.
- [Examples](./examples.md) — small end-to-end examples.
- [Porting and compatibility changes](./porting-changes.md) — recent additions made to Anya.

## Package

The package name in this repository is `@teamolduser/baileys`.

```bash
npm install @teamolduser/baileys
```

Use ESM imports. The exact runtime and optional peer-dependency requirements are listed in the root `package.json`.
