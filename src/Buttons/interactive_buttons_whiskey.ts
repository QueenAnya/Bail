// src/Utils/interactive-buttons.ts
// PR-ready TypeScript conversion of interactive-buttons.js for WhiskeySockets/Baileys
// -----------------------------------------------------------------------------
// NOTES FOR MAINTAINERS
// 1. Adjust import paths at the top to match Baileys monorepo layout. I kept imports
//    intentionally generic (see TODO) so you can place the file under `src/Utils` and
//    update the relative path to where helpers live.
// 2. I added minimal explicit types to make the file compile under `strict: true`.
// 3. A lightweight unit test (vitest) is provided below in the PR description section.
// -----------------------------------------------------------------------------

/* eslint-disable max-lines */

// TODO: Update these imports to whatever the project internal layout uses.
// Example inside the Baileys repo it might be: import { generateMessageIDV2 } from '../WABinary'
import {
  generateMessageIDV2,
  normalizeMessageContent,
  generateWAMessageFromContent
} from '../utils'; // <-- adjust path to actual internal exports
import {
  isJidGroup
} from '../WABinary'; // <-- adjust path to actual internal exports

/**
 * Lightweight types used inside this file. Keep them local to avoid coupling to the
 * repository's global types while still providing helpful type-safety for a PR.
 */
export interface SockLike {
  authState?: { creds?: { me?: { id?: string } } };
  user?: { id?: string };
  relayMessage?: (jid: string, message: any, opts?: any) => Promise<void>;
  logger?: { debug?: (...args: any[]) => void; warn?: (...args: any[]) => void };
  config?: { emitOwnEvents?: boolean };
  processingMutex?: { mutex?: (cb: () => void) => void } | null;
  upsertMessage?: (msg: any, action?: string) => void;
}

type ButtonAuthoring =
  | { id: string; text: string }
  | { id?: string; text?: string; displayText?: string }
  | { buttonId?: string; buttonText?: { displayText: string } }
  | { name: string; buttonParamsJson: string }
  | { buttonParamsJson?: string; name?: string };

export class InteractiveValidationError extends Error {
  context?: string;
  errors: string[];
  warnings: string[];
  example?: any;

  constructor(message: string, { context, errors = [], warnings = [], example } = {} as any) {
    super(message);
    this.name = 'InteractiveValidationError';
    this.context = context;
    this.errors = errors;
    this.warnings = warnings;
    this.example = example;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      errors: this.errors,
      warnings: this.warnings,
      example: this.example
    };
  }

  formatDetailed() {
    const lines: string[] = [];
    lines.push(`[${this.name}] ${this.message}${this.context ? ' (' + this.context + ')' : ''}`);
    if (this.errors?.length) {
      lines.push('Errors:');
      this.errors.forEach(e => lines.push('  - ' + e));
    }
    if (this.warnings?.length) {
      lines.push('Warnings:');
      this.warnings.forEach(w => lines.push('  - ' + w));
    }
    if (this.example) {
      lines.push('Example payload:', JSON.stringify(this.example, null, 2));
    }
    return lines.join('\n');
  }
}

/** Utilities */
function safeJsonParse(str: string) {
  try {
    return { value: JSON.parse(str), error: null } as const;
  } catch (e: any) {
    return { value: null, error: e } as const;
  }
}

function safeJsonStringify(val: any) {
  try {
    return { value: JSON.stringify(val), error: null } as const;
  } catch (e: any) {
    return { value: null, error: e } as const;
  }
}

/** Example payloads used in error messages */
const EXAMPLE_PAYLOADS = {
  sendButtons: {
    text: 'Choose an option',
    buttons: [
      { id: 'opt1', text: 'Option 1' },
      { id: 'opt2', text: 'Option 2' },
      { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Visit Site', url: 'https://example.com' }) }
    ],
    footer: 'Footer text'
  },
  sendInteractiveMessage: {
    text: 'Pick an action',
    interactiveButtons: [
      { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Hello', id: 'hello' }) },
      { name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: 'Copy Code', copy_code: 'ABC123' }) }
    ],
    footer: 'Footer'
  }
};

/** Allowed / required maps */
const SEND_BUTTONS_ALLOWED_COMPLEX = new Set(['cta_url', 'cta_copy', 'cta_call']);
const INTERACTIVE_ALLOWED_NAMES = new Set([
  'quick_reply', 'cta_url', 'cta_copy', 'cta_call', 'cta_catalog', 'cta_reminder', 'cta_cancel_reminder',
  'address_message', 'send_location', 'open_webview', 'mpm', 'wa_payment_transaction_details',
  'automated_greeting_message_view_catalog', 'galaxy_message', 'single_select'
]);

const REQUIRED_FIELDS_MAP: Record<string, string[]> = {
  cta_url: ['display_text', 'url'],
  cta_copy: ['display_text', 'copy_code'],
  cta_call: ['display_text', 'phone_number'],
  cta_catalog: ['business_phone_number'],
  cta_reminder: ['display_text'],
  cta_cancel_reminder: ['display_text'],
  address_message: ['display_text'],
  send_location: ['display_text'],
  open_webview: ['title', 'link'],
  mpm: ['product_id'],
  wa_payment_transaction_details: ['transaction_id'],
  automated_greeting_message_view_catalog: ['business_phone_number', 'catalog_product_id'],
  galaxy_message: ['flow_token', 'flow_id'],
  single_select: ['title', 'sections'],
  quick_reply: ['display_text', 'id']
};

/** Parse buttonParamsJson and validate required fields for named types. */
export function parseButtonParams(name: string, buttonParamsJson: string, errors: string[], warnings: string[], index: number) {
  const { value: parsed, error } = safeJsonParse(buttonParamsJson);
  if (error) {
    errors.push(`button[${index}] (${name}) invalid JSON: ${error.message}`);
    return null;
  }

  const req = REQUIRED_FIELDS_MAP[name] || [];
  for (const f of req) {
    if (!(f in parsed)) {
      errors.push(`button[${index}] (${name}) missing required field '${f}'`);
    }
  }

  if (name === 'open_webview' && (parsed as any).link) {
    if (typeof (parsed as any).link !== 'object' || !(parsed as any).link.url) {
      errors.push(`button[${index}] (open_webview) link.url required`);
    }
  }

  if (name === 'single_select') {
    if (!Array.isArray((parsed as any).sections) || (parsed as any).sections.length === 0) {
      errors.push(`button[${index}] (single_select) sections must be non-empty array`);
    }
  }

  return parsed;
}

/** Validate a set of authoring buttons and return errors/warnings + cleaned clones. */
export function validateAuthoringButtons(buttons: any): { errors: string[]; warnings: string[]; valid: boolean; cleaned: any[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (buttons == null) {
    return { errors: [], warnings: [], valid: true, cleaned: [] };
  }
  if (!Array.isArray(buttons)) {
    errors.push('buttons must be an array');
    return { errors, warnings, valid: false, cleaned: [] };
  }

  const SOFT_BUTTON_CAP = 25;
  if (buttons.length === 0) {
    warnings.push('buttons array is empty');
  } else if (buttons.length > SOFT_BUTTON_CAP) {
    warnings.push(`buttons count (${buttons.length}) exceeds soft cap of ${SOFT_BUTTON_CAP}; may be rejected by client`);
  }

  const cleaned = buttons.map((orig: any, idx: number) => {
    if (orig == null || typeof orig !== 'object') {
      errors.push(`button[${idx}] is not an object`);
      return orig;
    }

    const b = { ...orig };

    if (b.name && b.buttonParamsJson) {
      if (typeof b.buttonParamsJson !== 'string') {
        errors.push(`button[${idx}] buttonParamsJson must be string`);
      } else {
        const { error } = safeJsonParse(b.buttonParamsJson);
        if (error) errors.push(`button[${idx}] buttonParamsJson is not valid JSON: ${error.message}`);
      }
      return b;
    }

    if (b.id || b.text || b.displayText) {
      return b;
    }

    if (b.buttonId && b.buttonText && typeof b.buttonText === 'object' && b.buttonText.displayText) {
      return b;
    }

    if (b.buttonParamsJson) {
      if (typeof b.buttonParamsJson !== 'string') {
        warnings.push(`button[${idx}] has non-string buttonParamsJson; will attempt to stringify`);
        const { value, error } = safeJsonStringify(b.buttonParamsJson);
        if (error) {
          errors.push(`button[${idx}] buttonParamsJson could not be serialized: ${error.message}`);
          return b;
        }
        b.buttonParamsJson = value;
      } else {
        const { error } = safeJsonParse(b.buttonParamsJson);
        if (error) warnings.push(`button[${idx}] buttonParamsJson not valid JSON (${error.message})`);
      }
      if (!b.name) {
        warnings.push(`button[${idx}] missing name; defaulting to quick_reply`);
        b.name = 'quick_reply';
      }
      return b;
    }

    warnings.push(`button[${idx}] unrecognized shape; passing through unchanged`);
    return b;
  });

  return { errors, warnings, valid: errors.length === 0, cleaned };
}

/** Validation for "sendButtons" style payloads (legacy quick reply + limited complex CTAs). */
export function validateSendButtonsPayload(data: any): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['payload must be an object'], warnings };
  }
  if (!data.text || typeof data.text !== 'string') {
    errors.push('text is mandatory and must be a string');
  }
  if (!Array.isArray(data.buttons) || data.buttons.length === 0) {
    errors.push('buttons is mandatory and must be a non-empty array');
  } else {
    data.buttons.forEach((btn: any, i: number) => {
      if (!btn || typeof btn !== 'object') {
        errors.push(`button[${i}] must be an object`);
        return;
      }
      if (btn.id && btn.text) {
        if (typeof btn.id !== 'string' || typeof btn.text !== 'string') {
          errors.push(`button[${i}] legacy quick reply id/text must be strings`);
        }
        return;
      }
      if (btn.name && btn.buttonParamsJson) {
        if (!SEND_BUTTONS_ALLOWED_COMPLEX.has(btn.name)) {
          errors.push(`button[${i}] name '${btn.name}' not allowed in sendButtons`);
          return;
        }
        if (typeof btn.buttonParamsJson !== 'string') {
          errors.push(`button[${i}] buttonParamsJson must be string`);
          return;
        }
        parseButtonParams(btn.name, btn.buttonParamsJson, errors, warnings, i);
        return;
      }
      errors.push(`button[${i}] invalid shape (must be legacy quick reply or named ${Array.from(SEND_BUTTONS_ALLOWED_COMPLEX).join(', ')})`);
    });
  }

  return { valid: errors.length === 0, errors, warnings };
}

/** Validation for "interactive" authoring payloads. */
export function validateSendInteractiveMessagePayload(data: any): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['payload must be an object'], warnings };
  }
  if (!data.text || typeof data.text !== 'string') {
    errors.push('text is mandatory and must be a string');
  }
  if (!Array.isArray(data.interactiveButtons) || data.interactiveButtons.length === 0) {
    errors.push('interactiveButtons is mandatory and must be a non-empty array');
  } else {
    data.interactiveButtons.forEach((btn: any, i: number) => {
      if (!btn || typeof btn !== 'object') {
        errors.push(`interactiveButtons[${i}] must be an object`);
        return;
      }
      if (!btn.name || typeof btn.name !== 'string') {
        errors.push(`interactiveButtons[${i}] missing name`);
        return;
      }
      if (!INTERACTIVE_ALLOWED_NAMES.has(btn.name)) {
        errors.push(`interactiveButtons[${i}] name '${btn.name}' not allowed`);
        return;
      }
      if (!btn.buttonParamsJson || typeof btn.buttonParamsJson !== 'string') {
        errors.push(`interactiveButtons[${i}] buttonParamsJson must be string`);
        return;
      }
      parseButtonParams(btn.name, btn.buttonParamsJson, errors, warnings, i);
    });
  }

  return { valid: errors.length === 0, errors, warnings };
}

/** Validate the final content object that will be passed to generateWAMessageFromContent */
export function validateInteractiveMessageContent(content: any): { errors: string[]; warnings: string[]; valid: boolean } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!content || typeof content !== 'object') {
    return { errors: ['content must be an object'], warnings, valid: false };
  }

  const interactive = content.interactiveMessage;
  if (!interactive) {
    return { errors, warnings, valid: true };
  }

  const nativeFlow = interactive.nativeFlowMessage;
  if (!nativeFlow) {
    errors.push('interactiveMessage.nativeFlowMessage missing');
    return { errors, warnings, valid: false };
  }

  if (!Array.isArray(nativeFlow.buttons)) {
    errors.push('nativeFlowMessage.buttons must be an array');
    return { errors, warnings, valid: false };
  }
  if (nativeFlow.buttons.length === 0) {
    warnings.push('nativeFlowMessage.buttons is empty');
  }

  nativeFlow.buttons.forEach((btn: any, i: number) => {
    if (!btn || typeof btn !== 'object') {
      errors.push(`buttons[${i}] is not an object`);
      return;
    }
    if (!btn.buttonParamsJson) {
      warnings.push(`buttons[${i}] missing buttonParamsJson (may fail to render)`);
    } else if (typeof btn.buttonParamsJson !== 'string') {
      errors.push(`buttons[${i}] buttonParamsJson must be string`);
    } else {
      const { error } = safeJsonParse(btn.buttonParamsJson);
      if (error) warnings.push(`buttons[${i}] buttonParamsJson invalid JSON (${error.message})`);
    }
    if (!btn.name) {
      warnings.push(`buttons[${i}] missing name; defaulting to quick_reply`);
      btn.name = 'quick_reply';
    }
  });

  return { errors, warnings, valid: errors.length === 0 };
}

/** Helpers to determine button type and args for nodes */
export function getButtonType(message: any): string | null {
  if (message.listMessage) return 'list';
  if (message.buttonsMessage) return 'buttons';
  if (message.interactiveMessage?.nativeFlowMessage) return 'native_flow';
  return null;
}

export function getButtonArgs(message: any): any {
  const nativeFlow = message.interactiveMessage?.nativeFlowMessage;
  const firstButtonName = nativeFlow?.buttons?.[0]?.name;
  const nativeFlowSpecials = [
    'mpm', 'cta_catalog', 'send_location',
    'call_permission_request', 'wa_payment_transaction_details',
    'automated_greeting_message_view_catalog'
  ];

  if (nativeFlow && (firstButtonName === 'review_and_pay' || firstButtonName === 'payment_info')) {
    return {
      tag: 'biz',
      attrs: {
        native_flow_name: firstButtonName === 'review_and_pay' ? 'order_details' : firstButtonName
      }
    };
  } else if (nativeFlow && nativeFlowSpecials.includes(firstButtonName)) {
    return {
      tag: 'biz',
      attrs: {},
      content: [{
        tag: 'interactive',
        attrs: { type: 'native_flow', v: '1' },
        content: [{ tag: 'native_flow', attrs: { v: '2', name: firstButtonName } }]
      }]
    };
  } else if (nativeFlow || message.buttonsMessage) {
    return {
      tag: 'biz',
      attrs: {},
      content: [{
        tag: 'interactive',
        attrs: { type: 'native_flow', v: '1' },
        content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }]
      }]
    };
  } else if (message.listMessage) {
    return {
      tag: 'biz',
      attrs: {},
      content: [{ tag: 'list', attrs: { v: '2', type: 'product_list' } }]
    };
  }
  return { tag: 'biz', attrs: {} };
}

/** Convert a user-friendly "interactiveButtons" authoring shape into the
 * structure expected by generateWAMessageFromContent (nativeFlowMessage).
 */
export function convertToInteractiveMessage(content: any): any {
  if (content.interactiveButtons && content.interactiveButtons.length > 0) {
    const interactiveMessage: any = {
      nativeFlowMessage: {
        buttons: content.interactiveButtons.map((btn: any) => ({
          name: btn.name || 'quick_reply',
          buttonParamsJson: btn.buttonParamsJson
        }))
      }
    };

    if (content.title || content.subtitle) {
      interactiveMessage.header = { title: content.title ?? content.subtitle ?? '' };
    }
    if (content.text) interactiveMessage.body = { text: content.text };
    if (content.footer) interactiveMessage.footer = { text: content.footer };

    const newContent = { ...content };
    delete newContent.interactiveButtons;
    delete newContent.title;
    delete newContent.subtitle;
    delete newContent.text;
    delete newContent.footer;

    return { ...newContent, interactiveMessage };
  }
  return content;
}

/** Main: send an interactive message using a baileys socket-like object. */
export async function sendInteractiveMessage(sock: SockLike | undefined | null, jid: string, content: any, options: any = {}) {
  if (!sock) {
    throw new InteractiveValidationError('Socket is required', { context: 'sendInteractiveMessage' });
  }

  if (content && Array.isArray(content.interactiveButtons)) {
    const strict = validateSendInteractiveMessagePayload(content);
    if (!strict.valid) {
      throw new InteractiveValidationError('Interactive authoring payload invalid', {
        context: 'sendInteractiveMessage.validateSendInteractiveMessagePayload',
        errors: strict.errors,
        warnings: strict.warnings,
        example: EXAMPLE_PAYLOADS.sendInteractiveMessage
      });
    }
    if (strict.warnings.length) console.warn('sendInteractiveMessage warnings:', strict.warnings);
  }

  const convertedContent = convertToInteractiveMessage(content);

  const { errors: contentErrors, warnings: contentWarnings, valid: contentValid } = validateInteractiveMessageContent(convertedContent);
  if (!contentValid) {
    throw new InteractiveValidationError('Converted interactive content invalid', {
      context: 'sendInteractiveMessage.validateInteractiveMessageContent',
      errors: contentErrors,
      warnings: contentWarnings,
      example: convertToInteractiveMessage(EXAMPLE_PAYLOADS.sendInteractiveMessage)
    });
  }
  if (contentWarnings.length) {
    console.warn('Interactive content warnings:', contentWarnings);
  }

  const relayMessage = sock?.relayMessage;
  if (typeof relayMessage !== 'function') {
    throw new InteractiveValidationError('Socket does not expose relayMessage function', { context: 'sendInteractiveMessage' });
  }

  const userJid = sock.authState?.creds?.me?.id || sock.user?.id;
  const messageIdArg = (typeof generateMessageIDV2 === 'function' && userJid) ? generateMessageIDV2(userJid) : undefined;

  const fullMsg = generateWAMessageFromContent(jid, convertedContent, {
    logger: sock.logger,
    userJid,
    messageId: messageIdArg,
    timestamp: Date.now(),
    ...options
  });

  const normalizedContent = normalizeMessageContent(fullMsg.message);
  const buttonType = getButtonType(normalizedContent);

  const additionalNodes = [...(options.additionalNodes || [])];
  if (buttonType) {
    const buttonsNode = getButtonArgs(normalizedContent);
    const isPrivate = !isJidGroup(jid);
    additionalNodes.push(buttonsNode);
    if (isPrivate) additionalNodes.push({ tag: 'bot', attrs: { biz_bot: '1' } });
    console.log('Interactive send: ', {
      type: buttonType,
      nodes: additionalNodes.map((n: any) => ({ tag: n.tag, attrs: n.attrs })),
      private: isPrivate
    });
  }

  await relayMessage(jid, fullMsg.message, {
    messageId: fullMsg.key?.id,
    useCachedGroupMetadata: options.useCachedGroupMetadata,
    additionalAttributes: options.additionalAttributes || {},
    statusJidList: options.statusJidList,
    additionalNodes
  });

  const isPrivateChat = !isJidGroup(jid);
  if (sock.config?.emitOwnEvents && isPrivateChat) {
    process.nextTick(() => {
      try {
        if (sock.processingMutex?.mutex && typeof sock.upsertMessage === 'function') {
          sock.processingMutex.mutex(() => sock.upsertMessage!(fullMsg, 'append'));
        }
      } catch (e: any) {
        console.warn('upsertMessage failed:', e?.message ?? e);
      }
    });
  }

  return fullMsg;
}

/** Convenience wrapper for the legacy sendButtons authoring shape. */
export async function sendInteractiveButtonsBasic(sock: SockLike | undefined | null, jid: string, data: any = {}, options: any = {}) {
  if (!sock) {
    throw new InteractiveValidationError('Socket is required', { context: 'sendButtons' });
  }

  const { text = '', footer = '', title, subtitle, buttons = [] } = data;
  const strict = validateSendButtonsPayload({ text, buttons, title, subtitle, footer });
  if (!strict.valid) {
    throw new InteractiveValidationError('Buttons payload invalid', {
      context: 'sendButtons.validateSendButtonsPayload',
      errors: strict.errors,
      warnings: strict.warnings,
      example: EXAMPLE_PAYLOADS.sendButtons
    });
  }
  if (strict.warnings.length) console.warn('sendButtons warnings:', strict.warnings);

  const { errors, warnings, cleaned } = validateAuthoringButtons(buttons);
  if (errors.length) {
    throw new InteractiveValidationError('Authoring button objects invalid', {
      context: 'sendButtons.validateAuthoringButtons',
      errors,
      warnings,
      example: EXAMPLE_PAYLOADS.sendButtons.buttons
    });
  }
  if (warnings.length) {
    console.warn('Button validation warnings:', warnings);
  }

  const interactiveButtons = buildInteractiveButtons(cleaned);

  const payload: any = { text, footer, interactiveButtons };
  if (title) payload.title = title;
  if (subtitle) payload.subtitle = subtitle;

  return sendInteractiveMessage(sock, jid, payload, options);
}

export const sendButtons = sendInteractiveButtonsBasic;

/**
 * -----------------------------------------------------------------------------
 * PR CONTENT BELOW (copy into your PR description)
 * -----------------------------------------------------------------------------
 * Title: feat(utils): add interactive buttons utility (TypeScript)
 *
 * Summary:
 * - Adds `src/Utils/interactive-buttons.ts` which provides helper functions
 *   to author and send interactive buttons using Baileys nativeFlowMessage.
 * - Includes validation, conversion (authoring -> nativeFlow), and a
 *   convenience `sendButtons` wrapper for legacy quick replies.
 * - Lightweight types added to keep file self-contained; please update imports
 *   to match repo layout when landing the file.
 *
 * Files to add:
 * - src/Utils/interactive-buttons.ts  (this file)
 * - (optional) tests/utils/interactive-buttons.spec.ts  - example unit test
 *
 * Test (suggested):
 * - Use a small mocked `sock` object with `relayMessage` stubbed and assert the
 *   function calls and payload shapes. An example vitest/Jest test is provided
 *   below in the PR body for maintainers to pick.
 *
 * Lint & Build:
 * - Run `pnpm install && pnpm build` to confirm type errors. Adjust imports.
 *
 * Why this change:
 * - Centralizes interactive button authoring logic so other consumers in the
 *   repo can reuse a single, validated implementation.
 *
 * Breaking changes: none (all exports are additive).
 * -----------------------------------------------------------------------------
 * Example unit test (vitest) - place in `tests/utils/interactive-buttons.spec.ts`:
 *
 * ```ts
 * import { describe, it, expect, vi } from 'vitest';
 * import { sendButtons } from '../../src/Utils/interactive-buttons';
 *
 * describe('interactive-buttons', () => {
 *   it('sends simple legacy quick reply', async () => {
 *     const sent: any[] = [];
 *     const sock: any = {
 *       authState: { creds: { me: { id: 'user@server' } } },
 *       relayMessage: async (jid: string, message: any, opts: any) => { sent.push({ jid, message, opts }); },
 *       logger: { debug: () => {}, warn: () => {} },
 *     };
 *
 *     await sendButtons(sock, '12345@s.whatsapp.net', {
 *       text: 'Pick one',
 *       buttons: [{ id: 'whiskey_1', text: 'this is whiskey' }]
 *     });
 *
 *     expect(sent.length).toBe(1);
 *     expect(sent[0].jid).toBe('12345@s.whatsapp.net');
 *   });
 * });
 * ```
 * -----------------------------------------------------------------------------
 */