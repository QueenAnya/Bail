/**
 * Ported from @rexxhayanasi/elaina-baileys 1.4.5 (MIT) - Utils/messages.js helpers
 * (trimEmptyValues, songThumbnail, prepareLinkThumbnail, prepareProductMessage, native flow
 * button constraint checks, FUTURE_PROOF_MESSAGE_KEYS). Copied as-is (type-checking disabled);
 * only imports were adapted for tb2.
 */
// @ts-nocheck
import { Boom } from '@hapi/boom'
import { LIBRARY_NAME } from '../Defaults'
import { encryptedStream, extractImageThumb, getStream, toBuffer } from '../Utils/messages-media'
import { prepareWAMessageMedia } from '../Utils/messages'
import { NATIVE_FLOW_BUTTON_LIMIT, WEB_SUPPORTED_INTERACTIVE_FLOWS, getNativeFlowNameByButtonName } from './native-flow'

export const trimEmptyValues = (object) => {
    for (const key of Object.keys(object)) {
        if (object[key] === undefined) {
            delete object[key];
        }
    }
    return object;
};

export const songThumbnail = async (artwork, width, logger) => {
    const source = Buffer.isBuffer(artwork) ? artwork : await toBuffer(await getStream(artwork).then(({ stream }) => stream));
    try {
        const { buffer } = await extractImageThumb(source, width);
        return buffer;
    }
    catch (error) {
        logger?.warn?.({ trace: error?.message }, 'could not downscale the song artwork, sending it whole');
        return source;
    }
};

export const prepareLinkThumbnail = async (image, options, { thumbnailWidth = 640, upload = true } = {}) => {
    if (upload && typeof options?.upload !== 'function') {
        throw new Boom('a large link thumbnail has to be uploaded, so this needs an upload function', { statusCode: 400 });
    }
    const source = Buffer.isBuffer(image) ? image : await toBuffer(await getStream(image).then(({ stream }) => stream));
    let full;
    let width;
    let height;
    try {
        const probe = await extractImageThumb(source, thumbnailWidth);
        const original = probe.original;
        width = Math.min(thumbnailWidth, original.width);
        height = Math.round(original.height * width / original.width);
        full = width === thumbnailWidth ? probe.buffer : (await extractImageThumb(source, width)).buffer;
    }
    catch (error) {
        options.logger?.warn?.({ trace: error?.message }, 'no image library could measure the link thumbnail, so the card stays small');
        return { jpegThumbnail: source };
    }
    let jpegThumbnail;
    try {
        jpegThumbnail = (await extractImageThumb(source, Math.min(192, width))).buffer;
    }
    catch {
        jpegThumbnail = full;
    }
    if (!upload) {
        return { jpegThumbnail };
    }
    const blob = await encryptedStream(full, 'thumbnail-link', {
        logger: options.logger,
        opts: options.options
    });
    let result;
    try {
        result = await options.upload(blob.encFilePath, {
            fileEncSha256B64: blob.fileEncSha256.toString('base64'),
            mediaType: 'thumbnail-link',
            timeoutMs: options.mediaUploadTimeoutMs
        });
    }
    finally {
        fs.unlink(blob.encFilePath).catch(() => options.logger?.warn?.('failed to remove tmp file'));
    }
    return {
        jpegThumbnail,
        highQualityThumbnail: {
            directPath: result.directPath,
            mediaKey: blob.mediaKey,
            mediaKeyTimestamp: unixTimestampSeconds(),
            fileSha256: blob.fileSha256,
            fileEncSha256: blob.fileEncSha256,
            width,
            height
        }
    };
};

export const prepareProductMessage = async (message, options) => {
    if (!message.businessOwnerJid) {
        throw new Boom('"businessOwnerJid" is missing from the content', { statusCode: 400 });
    }
    const { imageMessage } = await prepareWAMessageMedia({ image: message.image || message.product.productImage }, options);

    const { image, ...content } = message;
    // The image is intentionally omitted from the outer content; it is embedded in productImage below.
    void image;
    content.product = {
        currencyCode: 'IDR',
        priceAmount1000: 1000,
        title: LIBRARY_NAME,
        ...message.product,
        productImage: imageMessage
    };
    return content;
};

export const buttonLimitFor = buttons => buttons[0]?.name === 'quick_reply'
    ? NATIVE_FLOW_BUTTON_LIMIT.quickReply
    : NATIVE_FLOW_BUTTON_LIMIT.other;

export const nativeFlowButtonsViolateConstraints = (buttons = []) => {
    if (!buttons.length) {
        return false;
    }
    const isQuickReply = button => button?.name === 'quick_reply';
    const firstIsQuickReply = isQuickReply(buttons[0]);
    if (buttons.length > buttonLimitFor(buttons)) {
        return true;
    }
    return !buttons.slice(1).every(button => {
        const mapped = getNativeFlowNameByButtonName(button?.name);
        const nameAllowed = mapped === null || mapped === undefined || WEB_SUPPORTED_INTERACTIVE_FLOWS.includes(mapped);
        return nameAllowed && firstIsQuickReply === isQuickReply(button);
    });
};

export const warnOnNativeFlowConstraints = (buttons, logger) => {
    if (!logger?.warn || !nativeFlowButtonsViolateConstraints(buttons)) {
        return;
    }
    const limit = buttonLimitFor(buttons);
    const kinds = [...new Set(buttons.map(button => button?.name))];
    logger.warn({ buttons: buttons.length, limit, kinds }, 'these native flow buttons break the client\'s button constraints, '
        + 'so it cannot work out a flow name and draws the whole message as unsupported: keep every button the same kind as the first '
        + `and at most ${limit} of them`);
};

export const FUTURE_PROOF_MESSAGE_KEYS = [
    'acp2SettingMessage',
    'associatedChildMessage',
    'audioStickerMessage',
    'botForwardedMessage',
    'botGroupParticipantMessage',
    'botInvokeMessage',
    'botPlatformRegistrationSuccessMessage',
    'botTaskMessage',
    'documentWithCaptionMessage',
    'editedMessage',
    'ephemeralMessage',
    'eventCoverImage',
    'groupMentionedMessage',
    'groupStatusMentionMessage',
    'groupStatusMessage',
    'groupStatusMessageV2',
    'limitSharingMessage',
    'lottieStickerMessage',
    'newsletterAdminProfileMessage',
    'newsletterAdminProfileMessageV2',
    'newsletterAdminProfileStatusMessage',
    'newsletterScheduledMessage',
    'pollCreationMessageV4',
    'pollCreationOptionImageMessage',
    'questionMessage',
    'questionReplyMessage',
    'spoilerMessage',
    'statusAddYours',
    'statusMentionMessage',
    'viewOnceMessage',
    'viewOnceMessageV2',
    'viewOnceMessageV2Extension'
];
