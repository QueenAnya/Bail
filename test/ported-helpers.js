// Elaina's tests call generateWAMessageContent with Elaina-only content keys (splitPayment, music, richLink,
// nativeFlow, ...). Here those keys are rewritten by preparePortedMessageContent (what sock.sendMessage runs first).
import { generateWAMessageContent as core } from '../lib/Utils/messages.js';
import { preparePortedMessageContent } from '../lib/Extras/socket.js';

export const generateWAMessageContent = async (content, options) => core(preparePortedMessageContent(content), options);
