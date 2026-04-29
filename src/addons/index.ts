/**
 * Baileys-patchd — addons/index.ts
 *
 * Central export point for all addon modules.
 * Every feature ported from innovatorssoft or the 8 patch branches
 * lives here in self-contained files.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FEATURE MAP
 * ─────────────────────────────────────────────────────────────────────────────
 * addon file                  | source patch / origin
 * ────────────────────────────┼─────────────────────────────────────────────
 * auto-reply                  | innovatorssoft — Auto-Reply System
 * anti-delete                 | innovatorssoft — Anti-Delete System
 * message-scheduler           | innovatorssoft — Message Scheduler
 * jid-plot                    | innovatorssoft — JID Plotting & LID Support
 * rich-response               | innovatorssoft — sendTable/sendList/sendCodeBlock/sendLatex/sendRichMessage/captureUnifiedResponse
 * browser-presets             | Baileys-android-browser + Baileys-fix-pairing-code
 * pairing-fix                 | Baileys-fix-pairing-code
 * lid-support                 | Baileys-fix-on-whatsapp-lid-support
 * outgoing-calls              | Baileys-feature-outgoing-calls
 * past-participants           | Baileys-pastParticepnts
 * mex-linked-profiles         | Baileys-fix-mex-linked-profiles
 * stickerpack                 | Baileys-feat-add-stickerpack-support
 * privacy-tokens              | Baileys-feat-add-stickerpack-support (getPrivacyTokens)
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── innovatorssoft addons ──────────────────────────────────────────────────────
export * from './auto-reply'
export * from './anti-delete'
export * from './message-scheduler'
export * from './jid-plot'
export * from './rich-response'

// ── patch-branch addons ───────────────────────────────────────────────────────
export * from './browser-presets'
export * from './pairing-fix'
export * from './lid-support'
export * from './outgoing-calls'
export * from './past-participants'
export * from './mex-linked-profiles'
export * from './stickerpack'
export * from './privacy-tokens'
