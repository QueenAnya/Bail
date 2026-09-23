import * as $protobuf from "protobufjs";
import Long = require("long");

export namespace E2E {

    interface IGroupRootKeyShareEntry extends E2E.GroupRootKeyShareEntry.$Properties {
    }

    class GroupRootKeyShareEntry {
        constructor(p?: E2E.GroupRootKeyShareEntry.$Properties);
        $unknowns?: Uint8Array[];
        groupRootKey?: (Uint8Array|null);
        keyId?: (string|null);
        expiryTimestampMs?: (number|Long|null);
        createdTimestampMs?: (number|Long|null);
        static create(properties: E2E.GroupRootKeyShareEntry.$Shape): E2E.GroupRootKeyShareEntry & E2E.GroupRootKeyShareEntry.$Shape;
        static create(properties?: E2E.GroupRootKeyShareEntry.$Properties): E2E.GroupRootKeyShareEntry;
        static encode(m: E2E.GroupRootKeyShareEntry.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.GroupRootKeyShareEntry & E2E.GroupRootKeyShareEntry.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.GroupRootKeyShareEntry;
        static toObject(m: E2E.GroupRootKeyShareEntry, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace GroupRootKeyShareEntry {
        interface $Properties {
            groupRootKey?: (Uint8Array|null);
            keyId?: (string|null);
            expiryTimestampMs?: (number|Long|null);
            createdTimestampMs?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.GroupRootKeyShareEntry.$Properties;
    }

    interface IGroupRootKeyShare extends E2E.GroupRootKeyShare.$Properties {
    }

    class GroupRootKeyShare {
        constructor(p?: E2E.GroupRootKeyShare.$Properties);
        $unknowns?: Uint8Array[];
        keys: E2E.GroupRootKeyShareEntry.$Properties[];
        static create(properties: E2E.GroupRootKeyShare.$Shape): E2E.GroupRootKeyShare & E2E.GroupRootKeyShare.$Shape;
        static create(properties?: E2E.GroupRootKeyShare.$Properties): E2E.GroupRootKeyShare;
        static encode(m: E2E.GroupRootKeyShare.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.GroupRootKeyShare & E2E.GroupRootKeyShare.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.GroupRootKeyShare;
        static toObject(m: E2E.GroupRootKeyShare, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace GroupRootKeyShare {
        interface $Properties {
            keys?: (E2E.GroupRootKeyShareEntry.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.GroupRootKeyShare.$Properties;
    }

    interface IAIQueryFanout extends E2E.AIQueryFanout.$Properties {
    }

    class AIQueryFanout {
        constructor(p?: E2E.AIQueryFanout.$Properties);
        $unknowns?: Uint8Array[];
        messageKey?: (Protocol.MessageKey.$Properties|null);
        message?: (E2E.Message.$Properties|null);
        timestamp?: (number|Long|null);
        static create(properties: E2E.AIQueryFanout.$Shape): E2E.AIQueryFanout & E2E.AIQueryFanout.$Shape;
        static create(properties?: E2E.AIQueryFanout.$Properties): E2E.AIQueryFanout;
        static encode(m: E2E.AIQueryFanout.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.AIQueryFanout & E2E.AIQueryFanout.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.AIQueryFanout;
        static toObject(m: E2E.AIQueryFanout, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIQueryFanout {
        interface $Properties {
            messageKey?: (Protocol.MessageKey.$Properties|null);
            message?: (E2E.Message.$Properties|null);
            timestamp?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          messageKey?: Protocol.MessageKey.$Shape|null;
          message?: E2E.Message.$Shape|null;
          timestamp?: number|Long|null;
          $unknowns?: Uint8Array[];
        };
    }

    interface IAIRichResponseMessage extends E2E.AIRichResponseMessage.$Properties {
    }

    class AIRichResponseMessage {
        constructor(p?: E2E.AIRichResponseMessage.$Properties);
        $unknowns?: Uint8Array[];
        messageType?: (AICommonDeprecated.AIRichResponseMessageType|null);
        submessages: AICommonDeprecated.AIRichResponseSubMessage.$Properties[];
        unifiedResponse?: (AICommon.AIRichResponseUnifiedResponse.$Properties|null);
        contextInfo?: (E2E.ContextInfo.$Properties|null);
        originalRecipientMetadata?: (AICommon.AIRichResponseUnifiedResponse.$Properties|null);
        static create(properties: E2E.AIRichResponseMessage.$Shape): E2E.AIRichResponseMessage & E2E.AIRichResponseMessage.$Shape;
        static create(properties?: E2E.AIRichResponseMessage.$Properties): E2E.AIRichResponseMessage;
        static encode(m: E2E.AIRichResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.AIRichResponseMessage & E2E.AIRichResponseMessage.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.AIRichResponseMessage;
        static toObject(m: E2E.AIRichResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseMessage {
        interface $Properties {
            messageType?: (AICommonDeprecated.AIRichResponseMessageType|null);
            submessages?: (AICommonDeprecated.AIRichResponseSubMessage.$Properties[]|null);
            unifiedResponse?: (AICommon.AIRichResponseUnifiedResponse.$Properties|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            originalRecipientMetadata?: (AICommon.AIRichResponseUnifiedResponse.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          messageType?: AICommonDeprecated.AIRichResponseMessageType|null;
          submessages?: AICommonDeprecated.AIRichResponseSubMessage.$Shape[]|null;
          unifiedResponse?: AICommon.AIRichResponseUnifiedResponse.$Shape|null;
          contextInfo?: E2E.ContextInfo.$Shape|null;
          originalRecipientMetadata?: AICommon.AIRichResponseUnifiedResponse.$Shape|null;
          $unknowns?: Uint8Array[];
        };
    }

    interface IMemberLabel extends E2E.MemberLabel.$Properties {
    }

    class MemberLabel {
        constructor(p?: E2E.MemberLabel.$Properties);
        $unknowns?: Uint8Array[];
        label?: (string|null);
        labelTimestamp?: (number|Long|null);
        static create(properties: E2E.MemberLabel.$Shape): E2E.MemberLabel & E2E.MemberLabel.$Shape;
        static create(properties?: E2E.MemberLabel.$Properties): E2E.MemberLabel;
        static encode(m: E2E.MemberLabel.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.MemberLabel & E2E.MemberLabel.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.MemberLabel;
        static toObject(m: E2E.MemberLabel, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MemberLabel {
        interface $Properties {
            label?: (string|null);
            labelTimestamp?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.MemberLabel.$Properties;
    }

    interface IUrlTrackingMap extends E2E.UrlTrackingMap.$Properties {
    }

    class UrlTrackingMap {
        constructor(p?: E2E.UrlTrackingMap.$Properties);
        $unknowns?: Uint8Array[];
        urlTrackingMapElements: E2E.UrlTrackingMap.UrlTrackingMapElement.$Properties[];
        static create(properties: E2E.UrlTrackingMap.$Shape): E2E.UrlTrackingMap & E2E.UrlTrackingMap.$Shape;
        static create(properties?: E2E.UrlTrackingMap.$Properties): E2E.UrlTrackingMap;
        static encode(m: E2E.UrlTrackingMap.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.UrlTrackingMap & E2E.UrlTrackingMap.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.UrlTrackingMap;
        static toObject(m: E2E.UrlTrackingMap, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace UrlTrackingMap {
        interface $Properties {
            urlTrackingMapElements?: (E2E.UrlTrackingMap.UrlTrackingMapElement.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.UrlTrackingMap.$Properties;

        interface IUrlTrackingMapElement extends E2E.UrlTrackingMap.UrlTrackingMapElement.$Properties {
        }

        class UrlTrackingMapElement {
            constructor(p?: E2E.UrlTrackingMap.UrlTrackingMapElement.$Properties);
            $unknowns?: Uint8Array[];
            originalUrl?: (string|null);
            unconsentedUsersUrl?: (string|null);
            consentedUsersUrl?: (string|null);
            cardIndex?: (number|null);
            static create(properties: E2E.UrlTrackingMap.UrlTrackingMapElement.$Shape): E2E.UrlTrackingMap.UrlTrackingMapElement & E2E.UrlTrackingMap.UrlTrackingMapElement.$Shape;
            static create(properties?: E2E.UrlTrackingMap.UrlTrackingMapElement.$Properties): E2E.UrlTrackingMap.UrlTrackingMapElement;
            static encode(m: E2E.UrlTrackingMap.UrlTrackingMapElement.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.UrlTrackingMap.UrlTrackingMapElement & E2E.UrlTrackingMap.UrlTrackingMapElement.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.UrlTrackingMap.UrlTrackingMapElement;
            static toObject(m: E2E.UrlTrackingMap.UrlTrackingMapElement, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UrlTrackingMapElement {
            interface $Properties {
                originalUrl?: (string|null);
                unconsentedUsersUrl?: (string|null);
                consentedUsersUrl?: (string|null);
                cardIndex?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.UrlTrackingMap.UrlTrackingMapElement.$Properties;
        }
    }

    interface IProcessedVideo extends E2E.ProcessedVideo.$Properties {
    }

    class ProcessedVideo {
        constructor(p?: E2E.ProcessedVideo.$Properties);
        $unknowns?: Uint8Array[];
        directPath?: (string|null);
        fileSha256?: (Uint8Array|null);
        height?: (number|null);
        width?: (number|null);
        fileLength?: (number|Long|null);
        bitrate?: (number|null);
        quality?: (E2E.ProcessedVideo.VideoQuality|null);
        capabilities: string[];
        static create(properties: E2E.ProcessedVideo.$Shape): E2E.ProcessedVideo & E2E.ProcessedVideo.$Shape;
        static create(properties?: E2E.ProcessedVideo.$Properties): E2E.ProcessedVideo;
        static encode(m: E2E.ProcessedVideo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ProcessedVideo & E2E.ProcessedVideo.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.ProcessedVideo;
        static toObject(m: E2E.ProcessedVideo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ProcessedVideo {
        interface $Properties {
            directPath?: (string|null);
            fileSha256?: (Uint8Array|null);
            height?: (number|null);
            width?: (number|null);
            fileLength?: (number|Long|null);
            bitrate?: (number|null);
            quality?: (E2E.ProcessedVideo.VideoQuality|null);
            capabilities?: (string[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.ProcessedVideo.$Properties;

        enum VideoQuality {
            UNDEFINED = 0,
            LOW = 1,
            MID = 2,
            HIGH = 3
        }
    }

    interface ILIDMigrationMappingSyncMessage extends E2E.LIDMigrationMappingSyncMessage.$Properties {
    }

    class LIDMigrationMappingSyncMessage {
        constructor(p?: E2E.LIDMigrationMappingSyncMessage.$Properties);
        $unknowns?: Uint8Array[];
        encodedMappingPayload?: (Uint8Array|null);
        static create(properties: E2E.LIDMigrationMappingSyncMessage.$Shape): E2E.LIDMigrationMappingSyncMessage & E2E.LIDMigrationMappingSyncMessage.$Shape;
        static create(properties?: E2E.LIDMigrationMappingSyncMessage.$Properties): E2E.LIDMigrationMappingSyncMessage;
        static encode(m: E2E.LIDMigrationMappingSyncMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.LIDMigrationMappingSyncMessage & E2E.LIDMigrationMappingSyncMessage.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.LIDMigrationMappingSyncMessage;
        static toObject(m: E2E.LIDMigrationMappingSyncMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace LIDMigrationMappingSyncMessage {
        interface $Properties {
            encodedMappingPayload?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.LIDMigrationMappingSyncMessage.$Properties;
    }

    interface IMediaNotifyMessage extends E2E.MediaNotifyMessage.$Properties {
    }

    class MediaNotifyMessage {
        constructor(p?: E2E.MediaNotifyMessage.$Properties);
        $unknowns?: Uint8Array[];
        expressPathUrl?: (string|null);
        fileEncSha256?: (Uint8Array|null);
        fileLength?: (number|Long|null);
        static create(properties: E2E.MediaNotifyMessage.$Shape): E2E.MediaNotifyMessage & E2E.MediaNotifyMessage.$Shape;
        static create(properties?: E2E.MediaNotifyMessage.$Properties): E2E.MediaNotifyMessage;
        static encode(m: E2E.MediaNotifyMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.MediaNotifyMessage & E2E.MediaNotifyMessage.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.MediaNotifyMessage;
        static toObject(m: E2E.MediaNotifyMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MediaNotifyMessage {
        interface $Properties {
            expressPathUrl?: (string|null);
            fileEncSha256?: (Uint8Array|null);
            fileLength?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.MediaNotifyMessage.$Properties;
    }

    interface IMessageSecretMessage extends E2E.MessageSecretMessage.$Properties {
    }

    class MessageSecretMessage {
        constructor(p?: E2E.MessageSecretMessage.$Properties);
        $unknowns?: Uint8Array[];
        version?: (number|null);
        encIv?: (Uint8Array|null);
        encPayload?: (Uint8Array|null);
        static create(properties: E2E.MessageSecretMessage.$Shape): E2E.MessageSecretMessage & E2E.MessageSecretMessage.$Shape;
        static create(properties?: E2E.MessageSecretMessage.$Properties): E2E.MessageSecretMessage;
        static encode(m: E2E.MessageSecretMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.MessageSecretMessage & E2E.MessageSecretMessage.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.MessageSecretMessage;
        static toObject(m: E2E.MessageSecretMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MessageSecretMessage {
        interface $Properties {
            version?: (number|null);
            encIv?: (Uint8Array|null);
            encPayload?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.MessageSecretMessage.$Properties;
    }

    interface IGroupMention extends E2E.GroupMention.$Properties {
    }

    class GroupMention {
        constructor(p?: E2E.GroupMention.$Properties);
        $unknowns?: Uint8Array[];
        groupJid?: (string|null);
        groupSubject?: (string|null);
        static create(properties: E2E.GroupMention.$Shape): E2E.GroupMention & E2E.GroupMention.$Shape;
        static create(properties?: E2E.GroupMention.$Properties): E2E.GroupMention;
        static encode(m: E2E.GroupMention.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.GroupMention & E2E.GroupMention.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.GroupMention;
        static toObject(m: E2E.GroupMention, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace GroupMention {
        interface $Properties {
            groupJid?: (string|null);
            groupSubject?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.GroupMention.$Properties;
    }

    interface IActionLink extends E2E.ActionLink.$Properties {
    }

    class ActionLink {
        constructor(p?: E2E.ActionLink.$Properties);
        $unknowns?: Uint8Array[];
        url?: (string|null);
        buttonTitle?: (string|null);
        static create(properties: E2E.ActionLink.$Shape): E2E.ActionLink & E2E.ActionLink.$Shape;
        static create(properties?: E2E.ActionLink.$Properties): E2E.ActionLink;
        static encode(m: E2E.ActionLink.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ActionLink & E2E.ActionLink.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.ActionLink;
        static toObject(m: E2E.ActionLink, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ActionLink {
        interface $Properties {
            url?: (string|null);
            buttonTitle?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.ActionLink.$Properties;
    }

    interface IDisappearingMode extends E2E.DisappearingMode.$Properties {
    }

    class DisappearingMode {
        constructor(p?: E2E.DisappearingMode.$Properties);
        $unknowns?: Uint8Array[];
        initiator?: (E2E.DisappearingMode.Initiator|null);
        trigger?: (E2E.DisappearingMode.Trigger|null);
        initiatorDeviceJid?: (string|null);
        initiatedByMe?: (boolean|null);
        static create(properties: E2E.DisappearingMode.$Shape): E2E.DisappearingMode & E2E.DisappearingMode.$Shape;
        static create(properties?: E2E.DisappearingMode.$Properties): E2E.DisappearingMode;
        static encode(m: E2E.DisappearingMode.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.DisappearingMode & E2E.DisappearingMode.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.DisappearingMode;
        static toObject(m: E2E.DisappearingMode, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace DisappearingMode {
        interface $Properties {
            initiator?: (E2E.DisappearingMode.Initiator|null);
            trigger?: (E2E.DisappearingMode.Trigger|null);
            initiatorDeviceJid?: (string|null);
            initiatedByMe?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.DisappearingMode.$Properties;

        enum Initiator {
            CHANGED_IN_CHAT = 0,
            INITIATED_BY_ME = 1,
            INITIATED_BY_OTHER = 2,
            BIZ_UPGRADE_FB_HOSTING = 3
        }

        enum Trigger {
            UNKNOWN = 0,
            CHAT_SETTING = 1,
            ACCOUNT_SETTING = 2,
            BULK_CHANGE = 3,
            BIZ_SUPPORTS_FB_HOSTING = 4,
            UNKNOWN_GROUPS = 5
        }
    }

    interface IPaymentBackground extends E2E.PaymentBackground.$Properties {
    }

    class PaymentBackground {
        constructor(p?: E2E.PaymentBackground.$Properties);
        $unknowns?: Uint8Array[];
        id?: (string|null);
        fileLength?: (number|Long|null);
        width?: (number|null);
        height?: (number|null);
        mimetype?: (string|null);
        placeholderArgb?: (number|null);
        textArgb?: (number|null);
        subtextArgb?: (number|null);
        mediaData?: (E2E.PaymentBackground.MediaData.$Properties|null);
        type?: (E2E.PaymentBackground.Type|null);
        static create(properties: E2E.PaymentBackground.$Shape): E2E.PaymentBackground & E2E.PaymentBackground.$Shape;
        static create(properties?: E2E.PaymentBackground.$Properties): E2E.PaymentBackground;
        static encode(m: E2E.PaymentBackground.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.PaymentBackground & E2E.PaymentBackground.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.PaymentBackground;
        static toObject(m: E2E.PaymentBackground, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace PaymentBackground {
        interface $Properties {
            id?: (string|null);
            fileLength?: (number|Long|null);
            width?: (number|null);
            height?: (number|null);
            mimetype?: (string|null);
            placeholderArgb?: (number|null);
            textArgb?: (number|null);
            subtextArgb?: (number|null);
            mediaData?: (E2E.PaymentBackground.MediaData.$Properties|null);
            type?: (E2E.PaymentBackground.Type|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.PaymentBackground.$Properties;

        interface IMediaData extends E2E.PaymentBackground.MediaData.$Properties {
        }

        class MediaData {
            constructor(p?: E2E.PaymentBackground.MediaData.$Properties);
            $unknowns?: Uint8Array[];
            mediaKey?: (Uint8Array|null);
            mediaKeyTimestamp?: (number|Long|null);
            fileSha256?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            directPath?: (string|null);
            static create(properties: E2E.PaymentBackground.MediaData.$Shape): E2E.PaymentBackground.MediaData & E2E.PaymentBackground.MediaData.$Shape;
            static create(properties?: E2E.PaymentBackground.MediaData.$Properties): E2E.PaymentBackground.MediaData;
            static encode(m: E2E.PaymentBackground.MediaData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.PaymentBackground.MediaData & E2E.PaymentBackground.MediaData.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.PaymentBackground.MediaData;
            static toObject(m: E2E.PaymentBackground.MediaData, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MediaData {
            interface $Properties {
                mediaKey?: (Uint8Array|null);
                mediaKeyTimestamp?: (number|Long|null);
                fileSha256?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                directPath?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.PaymentBackground.MediaData.$Properties;
        }

        enum Type {
            UNKNOWN = 0,
            DEFAULT = 1
        }
    }

    interface IMoney extends E2E.Money.$Properties {
    }

    class Money {
        constructor(p?: E2E.Money.$Properties);
        $unknowns?: Uint8Array[];
        value?: (number|Long|null);
        offset?: (number|null);
        currencyCode?: (string|null);
        static create(properties: E2E.Money.$Shape): E2E.Money & E2E.Money.$Shape;
        static create(properties?: E2E.Money.$Properties): E2E.Money;
        static encode(m: E2E.Money.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Money & E2E.Money.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.Money;
        static toObject(m: E2E.Money, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace Money {
        interface $Properties {
            value?: (number|Long|null);
            offset?: (number|null);
            currencyCode?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.Money.$Properties;
    }

    interface IHydratedTemplateButton extends E2E.HydratedTemplateButton.$Properties {
    }

    class HydratedTemplateButton {
        constructor(p?: E2E.HydratedTemplateButton.$Properties);
        $unknowns?: Uint8Array[];
        index?: (number|null);
        quickReplyButton?: (E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Properties|null);
        urlButton?: (E2E.HydratedTemplateButton.HydratedURLButton.$Properties|null);
        callButton?: (E2E.HydratedTemplateButton.HydratedCallButton.$Properties|null);
        hydratedButton?: ("quickReplyButton"|"urlButton"|"callButton");
        static create(properties: E2E.HydratedTemplateButton.$Shape): E2E.HydratedTemplateButton & E2E.HydratedTemplateButton.$Shape;
        static create(properties?: E2E.HydratedTemplateButton.$Properties): E2E.HydratedTemplateButton;
        static encode(m: E2E.HydratedTemplateButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.HydratedTemplateButton & E2E.HydratedTemplateButton.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.HydratedTemplateButton;
        static toObject(m: E2E.HydratedTemplateButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace HydratedTemplateButton {
        interface $Properties {
            index?: (number|null);
            quickReplyButton?: (E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Properties|null);
            urlButton?: (E2E.HydratedTemplateButton.HydratedURLButton.$Properties|null);
            callButton?: (E2E.HydratedTemplateButton.HydratedCallButton.$Properties|null);
            hydratedButton?: ("quickReplyButton"|"urlButton"|"callButton");
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          index?: number|null;
          quickReplyButton?: E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Shape|null;
          urlButton?: E2E.HydratedTemplateButton.HydratedURLButton.$Shape|null;
          callButton?: E2E.HydratedTemplateButton.HydratedCallButton.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ hydratedButton?: undefined; quickReplyButton?: null; urlButton?: null; callButton?: null }|{ hydratedButton?: "quickReplyButton"; quickReplyButton: E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Shape; urlButton?: null; callButton?: null }|{ hydratedButton?: "urlButton"; quickReplyButton?: null; urlButton: E2E.HydratedTemplateButton.HydratedURLButton.$Shape; callButton?: null }|{ hydratedButton?: "callButton"; quickReplyButton?: null; urlButton?: null; callButton: E2E.HydratedTemplateButton.HydratedCallButton.$Shape })
        );

        interface IHydratedCallButton extends E2E.HydratedTemplateButton.HydratedCallButton.$Properties {
        }

        class HydratedCallButton {
            constructor(p?: E2E.HydratedTemplateButton.HydratedCallButton.$Properties);
            $unknowns?: Uint8Array[];
            displayText?: (string|null);
            phoneNumber?: (string|null);
            static create(properties: E2E.HydratedTemplateButton.HydratedCallButton.$Shape): E2E.HydratedTemplateButton.HydratedCallButton & E2E.HydratedTemplateButton.HydratedCallButton.$Shape;
            static create(properties?: E2E.HydratedTemplateButton.HydratedCallButton.$Properties): E2E.HydratedTemplateButton.HydratedCallButton;
            static encode(m: E2E.HydratedTemplateButton.HydratedCallButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.HydratedTemplateButton.HydratedCallButton & E2E.HydratedTemplateButton.HydratedCallButton.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.HydratedTemplateButton.HydratedCallButton;
            static toObject(m: E2E.HydratedTemplateButton.HydratedCallButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HydratedCallButton {
            interface $Properties {
                displayText?: (string|null);
                phoneNumber?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.HydratedTemplateButton.HydratedCallButton.$Properties;
        }

        interface IHydratedQuickReplyButton extends E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Properties {
        }

        class HydratedQuickReplyButton {
            constructor(p?: E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Properties);
            $unknowns?: Uint8Array[];
            displayText?: (string|null);
            id?: (string|null);
            static create(properties: E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Shape): E2E.HydratedTemplateButton.HydratedQuickReplyButton & E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Shape;
            static create(properties?: E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Properties): E2E.HydratedTemplateButton.HydratedQuickReplyButton;
            static encode(m: E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.HydratedTemplateButton.HydratedQuickReplyButton & E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.HydratedTemplateButton.HydratedQuickReplyButton;
            static toObject(m: E2E.HydratedTemplateButton.HydratedQuickReplyButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HydratedQuickReplyButton {
            interface $Properties {
                displayText?: (string|null);
                id?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.HydratedTemplateButton.HydratedQuickReplyButton.$Properties;
        }

        interface IHydratedURLButton extends E2E.HydratedTemplateButton.HydratedURLButton.$Properties {
        }

        class HydratedURLButton {
            constructor(p?: E2E.HydratedTemplateButton.HydratedURLButton.$Properties);
            $unknowns?: Uint8Array[];
            displayText?: (string|null);
            url?: (string|null);
            consentedUsersUrl?: (string|null);
            webviewPresentation?: (E2E.HydratedTemplateButton.HydratedURLButton.WebviewPresentationType|null);
            static create(properties: E2E.HydratedTemplateButton.HydratedURLButton.$Shape): E2E.HydratedTemplateButton.HydratedURLButton & E2E.HydratedTemplateButton.HydratedURLButton.$Shape;
            static create(properties?: E2E.HydratedTemplateButton.HydratedURLButton.$Properties): E2E.HydratedTemplateButton.HydratedURLButton;
            static encode(m: E2E.HydratedTemplateButton.HydratedURLButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.HydratedTemplateButton.HydratedURLButton & E2E.HydratedTemplateButton.HydratedURLButton.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.HydratedTemplateButton.HydratedURLButton;
            static toObject(m: E2E.HydratedTemplateButton.HydratedURLButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HydratedURLButton {
            interface $Properties {
                displayText?: (string|null);
                url?: (string|null);
                consentedUsersUrl?: (string|null);
                webviewPresentation?: (E2E.HydratedTemplateButton.HydratedURLButton.WebviewPresentationType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.HydratedTemplateButton.HydratedURLButton.$Properties;

            enum WebviewPresentationType {
                FULL = 1,
                TALL = 2,
                COMPACT = 3
            }
        }
    }

    interface ITemplateButton extends E2E.TemplateButton.$Properties {
    }

    class TemplateButton {
        constructor(p?: E2E.TemplateButton.$Properties);
        $unknowns?: Uint8Array[];
        index?: (number|null);
        quickReplyButton?: (E2E.TemplateButton.QuickReplyButton.$Properties|null);
        urlButton?: (E2E.TemplateButton.URLButton.$Properties|null);
        callButton?: (E2E.TemplateButton.CallButton.$Properties|null);
        button?: ("quickReplyButton"|"urlButton"|"callButton");
        static create(properties: E2E.TemplateButton.$Shape): E2E.TemplateButton & E2E.TemplateButton.$Shape;
        static create(properties?: E2E.TemplateButton.$Properties): E2E.TemplateButton;
        static encode(m: E2E.TemplateButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.TemplateButton & E2E.TemplateButton.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.TemplateButton;
        static toObject(m: E2E.TemplateButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace TemplateButton {
        interface $Properties {
            index?: (number|null);
            quickReplyButton?: (E2E.TemplateButton.QuickReplyButton.$Properties|null);
            urlButton?: (E2E.TemplateButton.URLButton.$Properties|null);
            callButton?: (E2E.TemplateButton.CallButton.$Properties|null);
            button?: ("quickReplyButton"|"urlButton"|"callButton");
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          index?: number|null;
          quickReplyButton?: E2E.TemplateButton.QuickReplyButton.$Shape|null;
          urlButton?: E2E.TemplateButton.URLButton.$Shape|null;
          callButton?: E2E.TemplateButton.CallButton.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ button?: undefined; quickReplyButton?: null; urlButton?: null; callButton?: null }|{ button?: "quickReplyButton"; quickReplyButton: E2E.TemplateButton.QuickReplyButton.$Shape; urlButton?: null; callButton?: null }|{ button?: "urlButton"; quickReplyButton?: null; urlButton: E2E.TemplateButton.URLButton.$Shape; callButton?: null }|{ button?: "callButton"; quickReplyButton?: null; urlButton?: null; callButton: E2E.TemplateButton.CallButton.$Shape })
        );

        interface ICallButton extends E2E.TemplateButton.CallButton.$Properties {
        }

        class CallButton {
            constructor(p?: E2E.TemplateButton.CallButton.$Properties);
            $unknowns?: Uint8Array[];
            displayText?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
            phoneNumber?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
            static create(properties: E2E.TemplateButton.CallButton.$Shape): E2E.TemplateButton.CallButton & E2E.TemplateButton.CallButton.$Shape;
            static create(properties?: E2E.TemplateButton.CallButton.$Properties): E2E.TemplateButton.CallButton;
            static encode(m: E2E.TemplateButton.CallButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.TemplateButton.CallButton & E2E.TemplateButton.CallButton.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.TemplateButton.CallButton;
            static toObject(m: E2E.TemplateButton.CallButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CallButton {
            interface $Properties {
                displayText?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                phoneNumber?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              displayText?: E2E.Message.HighlyStructuredMessage.$Shape|null;
              phoneNumber?: E2E.Message.HighlyStructuredMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IQuickReplyButton extends E2E.TemplateButton.QuickReplyButton.$Properties {
        }

        class QuickReplyButton {
            constructor(p?: E2E.TemplateButton.QuickReplyButton.$Properties);
            $unknowns?: Uint8Array[];
            displayText?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
            id?: (string|null);
            static create(properties: E2E.TemplateButton.QuickReplyButton.$Shape): E2E.TemplateButton.QuickReplyButton & E2E.TemplateButton.QuickReplyButton.$Shape;
            static create(properties?: E2E.TemplateButton.QuickReplyButton.$Properties): E2E.TemplateButton.QuickReplyButton;
            static encode(m: E2E.TemplateButton.QuickReplyButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.TemplateButton.QuickReplyButton & E2E.TemplateButton.QuickReplyButton.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.TemplateButton.QuickReplyButton;
            static toObject(m: E2E.TemplateButton.QuickReplyButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace QuickReplyButton {
            interface $Properties {
                displayText?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                id?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              displayText?: E2E.Message.HighlyStructuredMessage.$Shape|null;
              id?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IURLButton extends E2E.TemplateButton.URLButton.$Properties {
        }

        class URLButton {
            constructor(p?: E2E.TemplateButton.URLButton.$Properties);
            $unknowns?: Uint8Array[];
            displayText?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
            url?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
            static create(properties: E2E.TemplateButton.URLButton.$Shape): E2E.TemplateButton.URLButton & E2E.TemplateButton.URLButton.$Shape;
            static create(properties?: E2E.TemplateButton.URLButton.$Properties): E2E.TemplateButton.URLButton;
            static encode(m: E2E.TemplateButton.URLButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.TemplateButton.URLButton & E2E.TemplateButton.URLButton.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.TemplateButton.URLButton;
            static toObject(m: E2E.TemplateButton.URLButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace URLButton {
            interface $Properties {
                displayText?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                url?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              displayText?: E2E.Message.HighlyStructuredMessage.$Shape|null;
              url?: E2E.Message.HighlyStructuredMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }
    }

    interface ILocation extends E2E.Location.$Properties {
    }

    class Location {
        constructor(p?: E2E.Location.$Properties);
        $unknowns?: Uint8Array[];
        degreesLatitude?: (number|null);
        degreesLongitude?: (number|null);
        name?: (string|null);
        static create(properties: E2E.Location.$Shape): E2E.Location & E2E.Location.$Shape;
        static create(properties?: E2E.Location.$Properties): E2E.Location;
        static encode(m: E2E.Location.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Location & E2E.Location.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.Location;
        static toObject(m: E2E.Location, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace Location {
        interface $Properties {
            degreesLatitude?: (number|null);
            degreesLongitude?: (number|null);
            name?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.Location.$Properties;
    }

    interface IPoint extends E2E.Point.$Properties {
    }

    class Point {
        constructor(p?: E2E.Point.$Properties);
        $unknowns?: Uint8Array[];
        xDeprecated?: (number|null);
        yDeprecated?: (number|null);
        x?: (number|null);
        y?: (number|null);
        static create(properties: E2E.Point.$Shape): E2E.Point & E2E.Point.$Shape;
        static create(properties?: E2E.Point.$Properties): E2E.Point;
        static encode(m: E2E.Point.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Point & E2E.Point.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.Point;
        static toObject(m: E2E.Point, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace Point {
        interface $Properties {
            xDeprecated?: (number|null);
            yDeprecated?: (number|null);
            x?: (number|null);
            y?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.Point.$Properties;
    }

    interface IInteractiveAnnotation extends E2E.InteractiveAnnotation.$Properties {
    }

    class InteractiveAnnotation {
        constructor(p?: E2E.InteractiveAnnotation.$Properties);
        $unknowns?: Uint8Array[];
        polygonVertices: E2E.Point.$Properties[];
        shouldSkipConfirmation?: (boolean|null);
        embeddedContent?: (E2E.EmbeddedContent.$Properties|null);
        statusLinkType?: (E2E.InteractiveAnnotation.StatusLinkType|null);
        location?: (E2E.Location.$Properties|null);
        newsletter?: (E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties|null);
        embeddedAction?: (boolean|null);
        tapAction?: (E2E.TapLinkAction.$Properties|null);
        action?: ("location"|"newsletter"|"embeddedAction"|"tapAction");
        static create(properties: E2E.InteractiveAnnotation.$Shape): E2E.InteractiveAnnotation & E2E.InteractiveAnnotation.$Shape;
        static create(properties?: E2E.InteractiveAnnotation.$Properties): E2E.InteractiveAnnotation;
        static encode(m: E2E.InteractiveAnnotation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.InteractiveAnnotation & E2E.InteractiveAnnotation.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.InteractiveAnnotation;
        static toObject(m: E2E.InteractiveAnnotation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace InteractiveAnnotation {
        interface $Properties {
            polygonVertices?: (E2E.Point.$Properties[]|null);
            shouldSkipConfirmation?: (boolean|null);
            embeddedContent?: (E2E.EmbeddedContent.$Properties|null);
            statusLinkType?: (E2E.InteractiveAnnotation.StatusLinkType|null);
            location?: (E2E.Location.$Properties|null);
            newsletter?: (E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties|null);
            embeddedAction?: (boolean|null);
            tapAction?: (E2E.TapLinkAction.$Properties|null);
            action?: ("location"|"newsletter"|"embeddedAction"|"tapAction");
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          polygonVertices?: E2E.Point.$Shape[]|null;
          shouldSkipConfirmation?: boolean|null;
          embeddedContent?: E2E.EmbeddedContent.$Shape|null;
          statusLinkType?: E2E.InteractiveAnnotation.StatusLinkType|null;
          location?: E2E.Location.$Shape|null;
          newsletter?: E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Shape|null;
          embeddedAction?: boolean|null;
          tapAction?: E2E.TapLinkAction.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ action?: undefined; location?: null; newsletter?: null; embeddedAction?: null; tapAction?: null }|{ action?: "location"; location: E2E.Location.$Shape; newsletter?: null; embeddedAction?: null; tapAction?: null }|{ action?: "newsletter"; location?: null; newsletter: E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Shape; embeddedAction?: null; tapAction?: null }|{ action?: "embeddedAction"; location?: null; newsletter?: null; embeddedAction: boolean; tapAction?: null }|{ action?: "tapAction"; location?: null; newsletter?: null; embeddedAction?: null; tapAction: E2E.TapLinkAction.$Shape })
        );

        enum StatusLinkType {
            RASTERIZED_LINK_PREVIEW = 1,
            RASTERIZED_LINK_TRUNCATED = 2,
            RASTERIZED_LINK_FULL_URL = 3
        }
    }

    interface ITapLinkAction extends E2E.TapLinkAction.$Properties {
    }

    class TapLinkAction {
        constructor(p?: E2E.TapLinkAction.$Properties);
        $unknowns?: Uint8Array[];
        title?: (string|null);
        tapUrl?: (string|null);
        static create(properties: E2E.TapLinkAction.$Shape): E2E.TapLinkAction & E2E.TapLinkAction.$Shape;
        static create(properties?: E2E.TapLinkAction.$Properties): E2E.TapLinkAction;
        static encode(m: E2E.TapLinkAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.TapLinkAction & E2E.TapLinkAction.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.TapLinkAction;
        static toObject(m: E2E.TapLinkAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace TapLinkAction {
        interface $Properties {
            title?: (string|null);
            tapUrl?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.TapLinkAction.$Properties;
    }

    interface IEmbeddedContent extends E2E.EmbeddedContent.$Properties {
    }

    class EmbeddedContent {
        constructor(p?: E2E.EmbeddedContent.$Properties);
        $unknowns?: Uint8Array[];
        embeddedMessage?: (E2E.EmbeddedMessage.$Properties|null);
        embeddedMusic?: (E2E.EmbeddedMusic.$Properties|null);
        content?: ("embeddedMessage"|"embeddedMusic");
        static create(properties: E2E.EmbeddedContent.$Shape): E2E.EmbeddedContent & E2E.EmbeddedContent.$Shape;
        static create(properties?: E2E.EmbeddedContent.$Properties): E2E.EmbeddedContent;
        static encode(m: E2E.EmbeddedContent.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.EmbeddedContent & E2E.EmbeddedContent.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.EmbeddedContent;
        static toObject(m: E2E.EmbeddedContent, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace EmbeddedContent {
        interface $Properties {
            embeddedMessage?: (E2E.EmbeddedMessage.$Properties|null);
            embeddedMusic?: (E2E.EmbeddedMusic.$Properties|null);
            content?: ("embeddedMessage"|"embeddedMusic");
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          embeddedMessage?: E2E.EmbeddedMessage.$Shape|null;
          embeddedMusic?: E2E.EmbeddedMusic.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ content?: undefined; embeddedMessage?: null; embeddedMusic?: null }|{ content?: "embeddedMessage"; embeddedMessage: E2E.EmbeddedMessage.$Shape; embeddedMusic?: null }|{ content?: "embeddedMusic"; embeddedMessage?: null; embeddedMusic: E2E.EmbeddedMusic.$Shape })
        );
    }

    interface IEmbeddedMusic extends E2E.EmbeddedMusic.$Properties {
    }

    class EmbeddedMusic {
        constructor(p?: E2E.EmbeddedMusic.$Properties);
        $unknowns?: Uint8Array[];
        musicContentMediaId?: (string|null);
        songId?: (string|null);
        author?: (string|null);
        title?: (string|null);
        artworkDirectPath?: (string|null);
        artworkSha256?: (Uint8Array|null);
        artworkEncSha256?: (Uint8Array|null);
        artistAttribution?: (string|null);
        countryBlocklist?: (Uint8Array|null);
        isExplicit?: (boolean|null);
        artworkMediaKey?: (Uint8Array|null);
        musicSongStartTimeInMs?: (number|Long|null);
        derivedContentStartTimeInMs?: (number|Long|null);
        overlapDurationInMs?: (number|Long|null);
        static create(properties: E2E.EmbeddedMusic.$Shape): E2E.EmbeddedMusic & E2E.EmbeddedMusic.$Shape;
        static create(properties?: E2E.EmbeddedMusic.$Properties): E2E.EmbeddedMusic;
        static encode(m: E2E.EmbeddedMusic.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.EmbeddedMusic & E2E.EmbeddedMusic.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.EmbeddedMusic;
        static toObject(m: E2E.EmbeddedMusic, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace EmbeddedMusic {
        interface $Properties {
            musicContentMediaId?: (string|null);
            songId?: (string|null);
            author?: (string|null);
            title?: (string|null);
            artworkDirectPath?: (string|null);
            artworkSha256?: (Uint8Array|null);
            artworkEncSha256?: (Uint8Array|null);
            artistAttribution?: (string|null);
            countryBlocklist?: (Uint8Array|null);
            isExplicit?: (boolean|null);
            artworkMediaKey?: (Uint8Array|null);
            musicSongStartTimeInMs?: (number|Long|null);
            derivedContentStartTimeInMs?: (number|Long|null);
            overlapDurationInMs?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.EmbeddedMusic.$Properties;
    }

    interface IEmbeddedMessage extends E2E.EmbeddedMessage.$Properties {
    }

    class EmbeddedMessage {
        constructor(p?: E2E.EmbeddedMessage.$Properties);
        $unknowns?: Uint8Array[];
        stanzaId?: (string|null);
        message?: (E2E.Message.$Properties|null);
        static create(properties: E2E.EmbeddedMessage.$Shape): E2E.EmbeddedMessage & E2E.EmbeddedMessage.$Shape;
        static create(properties?: E2E.EmbeddedMessage.$Properties): E2E.EmbeddedMessage;
        static encode(m: E2E.EmbeddedMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.EmbeddedMessage & E2E.EmbeddedMessage.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.EmbeddedMessage;
        static toObject(m: E2E.EmbeddedMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace EmbeddedMessage {
        interface $Properties {
            stanzaId?: (string|null);
            message?: (E2E.Message.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          stanzaId?: string|null;
          message?: E2E.Message.$Shape|null;
          $unknowns?: Uint8Array[];
        };
    }

    interface IDeviceListMetadata extends E2E.DeviceListMetadata.$Properties {
    }

    class DeviceListMetadata {
        constructor(p?: E2E.DeviceListMetadata.$Properties);
        $unknowns?: Uint8Array[];
        senderKeyHash?: (Uint8Array|null);
        senderTimestamp?: (number|Long|null);
        senderKeyIndexes: number[];
        senderAccountType?: (Adv.ADVEncryptionType|null);
        receiverAccountType?: (Adv.ADVEncryptionType|null);
        recipientKeyHash?: (Uint8Array|null);
        recipientTimestamp?: (number|Long|null);
        recipientKeyIndexes: number[];
        static create(properties: E2E.DeviceListMetadata.$Shape): E2E.DeviceListMetadata & E2E.DeviceListMetadata.$Shape;
        static create(properties?: E2E.DeviceListMetadata.$Properties): E2E.DeviceListMetadata;
        static encode(m: E2E.DeviceListMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.DeviceListMetadata & E2E.DeviceListMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.DeviceListMetadata;
        static toObject(m: E2E.DeviceListMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace DeviceListMetadata {
        interface $Properties {
            senderKeyHash?: (Uint8Array|null);
            senderTimestamp?: (number|Long|null);
            senderKeyIndexes?: (number[]|null);
            senderAccountType?: (Adv.ADVEncryptionType|null);
            receiverAccountType?: (Adv.ADVEncryptionType|null);
            recipientKeyHash?: (Uint8Array|null);
            recipientTimestamp?: (number|Long|null);
            recipientKeyIndexes?: (number[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.DeviceListMetadata.$Properties;
    }

    interface IMessageContextInfo extends E2E.MessageContextInfo.$Properties {
    }

    class MessageContextInfo {
        constructor(p?: E2E.MessageContextInfo.$Properties);
        $unknowns?: Uint8Array[];
        deviceListMetadata?: (E2E.DeviceListMetadata.$Properties|null);
        deviceListMetadataVersion?: (number|null);
        messageSecret?: (Uint8Array|null);
        paddingBytes?: (Uint8Array|null);
        messageAddOnDurationInSecs?: (number|null);
        botMessageSecret?: (Uint8Array|null);
        botMetadata?: (AICommon.BotMetadata.$Properties|null);
        reportingTokenVersion?: (number|null);
        messageAddOnExpiryType?: (E2E.MessageContextInfo.MessageAddonExpiryType|null);
        messageAssociation?: (E2E.MessageAssociation.$Properties|null);
        capiCreatedGroup?: (boolean|null);
        supportPayload?: (string|null);
        limitSharing?: (Protocol.LimitSharing.$Properties|null);
        limitSharingV2?: (Protocol.LimitSharing.$Properties|null);
        threadId: E2E.ThreadID.$Properties[];
        weblinkRenderConfig?: (E2E.WebLinkRenderConfig|null);
        teeBotMetadata?: (Uint8Array|null);
        accountEncryptionAttestation?: (Aea.NonE2EEAttestation.$Properties|null);
        associatedPrimaryIdentityKey?: (Uint8Array|null);
        teeContextAnchorMessageId?: (string|null);
        acp2Setting?: (Protocol.ACP2Setting.$Properties|null);
        static create(properties: E2E.MessageContextInfo.$Shape): E2E.MessageContextInfo & E2E.MessageContextInfo.$Shape;
        static create(properties?: E2E.MessageContextInfo.$Properties): E2E.MessageContextInfo;
        static encode(m: E2E.MessageContextInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.MessageContextInfo & E2E.MessageContextInfo.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.MessageContextInfo;
        static toObject(m: E2E.MessageContextInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MessageContextInfo {
        interface $Properties {
            deviceListMetadata?: (E2E.DeviceListMetadata.$Properties|null);
            deviceListMetadataVersion?: (number|null);
            messageSecret?: (Uint8Array|null);
            paddingBytes?: (Uint8Array|null);
            messageAddOnDurationInSecs?: (number|null);
            botMessageSecret?: (Uint8Array|null);
            botMetadata?: (AICommon.BotMetadata.$Properties|null);
            reportingTokenVersion?: (number|null);
            messageAddOnExpiryType?: (E2E.MessageContextInfo.MessageAddonExpiryType|null);
            messageAssociation?: (E2E.MessageAssociation.$Properties|null);
            capiCreatedGroup?: (boolean|null);
            supportPayload?: (string|null);
            limitSharing?: (Protocol.LimitSharing.$Properties|null);
            limitSharingV2?: (Protocol.LimitSharing.$Properties|null);
            threadId?: (E2E.ThreadID.$Properties[]|null);
            weblinkRenderConfig?: (E2E.WebLinkRenderConfig|null);
            teeBotMetadata?: (Uint8Array|null);
            accountEncryptionAttestation?: (Aea.NonE2EEAttestation.$Properties|null);
            associatedPrimaryIdentityKey?: (Uint8Array|null);
            teeContextAnchorMessageId?: (string|null);
            acp2Setting?: (Protocol.ACP2Setting.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.MessageContextInfo.$Properties;

        enum MessageAddonExpiryType {
            STATIC = 1,
            DEPENDENT_ON_PARENT = 2
        }
    }

    interface IThreadID extends E2E.ThreadID.$Properties {
    }

    class ThreadID {
        constructor(p?: E2E.ThreadID.$Properties);
        $unknowns?: Uint8Array[];
        threadType?: (E2E.ThreadID.ThreadType|null);
        threadKey?: (Protocol.MessageKey.$Properties|null);
        static create(properties: E2E.ThreadID.$Shape): E2E.ThreadID & E2E.ThreadID.$Shape;
        static create(properties?: E2E.ThreadID.$Properties): E2E.ThreadID;
        static encode(m: E2E.ThreadID.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ThreadID & E2E.ThreadID.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.ThreadID;
        static toObject(m: E2E.ThreadID, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ThreadID {
        interface $Properties {
            threadType?: (E2E.ThreadID.ThreadType|null);
            threadKey?: (Protocol.MessageKey.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.ThreadID.$Properties;

        enum ThreadType {
            UNKNOWN = 0,
            VIEW_REPLIES = 1,
            AI_THREAD = 2
        }
    }

    interface IMessageAssociation extends E2E.MessageAssociation.$Properties {
    }

    class MessageAssociation {
        constructor(p?: E2E.MessageAssociation.$Properties);
        $unknowns?: Uint8Array[];
        associationType?: (E2E.MessageAssociation.AssociationType|null);
        parentMessageKey?: (Protocol.MessageKey.$Properties|null);
        messageIndex?: (number|null);
        static create(properties: E2E.MessageAssociation.$Shape): E2E.MessageAssociation & E2E.MessageAssociation.$Shape;
        static create(properties?: E2E.MessageAssociation.$Properties): E2E.MessageAssociation;
        static encode(m: E2E.MessageAssociation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.MessageAssociation & E2E.MessageAssociation.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.MessageAssociation;
        static toObject(m: E2E.MessageAssociation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MessageAssociation {
        interface $Properties {
            associationType?: (E2E.MessageAssociation.AssociationType|null);
            parentMessageKey?: (Protocol.MessageKey.$Properties|null);
            messageIndex?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.MessageAssociation.$Properties;

        enum AssociationType {
            UNKNOWN = 0,
            MEDIA_ALBUM = 1,
            BOT_PLUGIN = 2,
            EVENT_COVER_IMAGE = 3,
            STATUS_POLL = 4,
            HD_VIDEO_DUAL_UPLOAD = 5,
            STATUS_EXTERNAL_RESHARE = 6,
            MEDIA_POLL = 7,
            STATUS_ADD_YOURS = 8,
            STATUS_NOTIFICATION = 9,
            HD_IMAGE_DUAL_UPLOAD = 10,
            STICKER_ANNOTATION = 11,
            MOTION_PHOTO = 12,
            STATUS_LINK_ACTION = 13,
            VIEW_ALL_REPLIES = 14,
            STATUS_ADD_YOURS_AI_IMAGINE = 15,
            STATUS_QUESTION = 16,
            STATUS_ADD_YOURS_DIWALI = 17,
            STATUS_REACTION = 18,
            HEVC_VIDEO_DUAL_UPLOAD = 19,
            POLL_ADD_OPTION = 20
        }
    }

    interface IContextInfo extends E2E.ContextInfo.$Properties {
    }

    class ContextInfo {
        constructor(p?: E2E.ContextInfo.$Properties);
        $unknowns?: Uint8Array[];
        stanzaId?: (string|null);
        participant?: (string|null);
        quotedMessage?: (E2E.Message.$Properties|null);
        remoteJid?: (string|null);
        mentionedJid: string[];
        conversionSource?: (string|null);
        conversionData?: (Uint8Array|null);
        conversionDelaySeconds?: (number|null);
        forwardingScore?: (number|null);
        isForwarded?: (boolean|null);
        quotedAd?: (E2E.ContextInfo.AdReplyInfo.$Properties|null);
        placeholderKey?: (Protocol.MessageKey.$Properties|null);
        expiration?: (number|null);
        ephemeralSettingTimestamp?: (number|Long|null);
        ephemeralSharedSecret?: (Uint8Array|null);
        externalAdReply?: (E2E.ContextInfo.ExternalAdReplyInfo.$Properties|null);
        entryPointConversionSource?: (string|null);
        entryPointConversionApp?: (string|null);
        entryPointConversionDelaySeconds?: (number|null);
        disappearingMode?: (E2E.DisappearingMode.$Properties|null);
        actionLink?: (E2E.ActionLink.$Properties|null);
        groupSubject?: (string|null);
        parentGroupJid?: (string|null);
        trustBannerType?: (string|null);
        trustBannerAction?: (number|null);
        isSampled?: (boolean|null);
        groupMentions: E2E.GroupMention.$Properties[];
        utm?: (E2E.ContextInfo.UTMInfo.$Properties|null);
        forwardedNewsletterMessageInfo?: (E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties|null);
        businessMessageForwardInfo?: (E2E.ContextInfo.BusinessMessageForwardInfo.$Properties|null);
        smbClientCampaignId?: (string|null);
        smbServerCampaignId?: (string|null);
        dataSharingContext?: (E2E.ContextInfo.DataSharingContext.$Properties|null);
        alwaysShowAdAttribution?: (boolean|null);
        featureEligibilities?: (E2E.ContextInfo.FeatureEligibilities.$Properties|null);
        entryPointConversionExternalSource?: (string|null);
        entryPointConversionExternalMedium?: (string|null);
        ctwaSignals?: (string|null);
        ctwaPayload?: (Uint8Array|null);
        forwardedAiBotMessageInfo?: (AICommon.ForwardedAIBotMessageInfo.$Properties|null);
        statusAttributionType?: (E2E.ContextInfo.StatusAttributionType|null);
        urlTrackingMap?: (E2E.UrlTrackingMap.$Properties|null);
        pairedMediaType?: (E2E.ContextInfo.PairedMediaType|null);
        rankingVersion?: (number|null);
        memberLabel?: (E2E.MemberLabel.$Properties|null);
        isQuestion?: (boolean|null);
        statusSourceType?: (E2E.ContextInfo.StatusSourceType|null);
        statusAttributions: StatusAttributions.StatusAttribution.$Properties[];
        isGroupStatus?: (boolean|null);
        forwardOrigin?: (E2E.ContextInfo.ForwardOrigin|null);
        questionReplyQuotedMessage?: (E2E.ContextInfo.QuestionReplyQuotedMessage.$Properties|null);
        statusAudienceMetadata?: (E2E.ContextInfo.StatusAudienceMetadata.$Properties|null);
        nonJidMentions?: (number|null);
        quotedType?: (E2E.ContextInfo.QuotedType|null);
        botMessageSharingInfo?: (AICommon.BotMessageSharingInfo.$Properties|null);
        isSpoiler?: (boolean|null);
        mediaDomainInfo?: (E2E.MediaDomainInfo.$Properties|null);
        partiallySelectedContent?: (E2E.ContextInfo.PartiallySelectedContent.$Properties|null);
        afterReadDuration?: (number|null);
        crossAppSource?: (E2E.ContextInfo.CrossAppSource|null);
        businessInteractionPills?: (E2E.ContextInfo.BusinessInteractionPills.$Properties|null);
        posterStatusId?: (string|null);
        instagramThreadLink?: (E2E.ContextInfo.InstagramThreadLink.$Properties|null);
        aiProvenance?: (AICommon.AIProvenance.$Properties|null);
        experienceIds: number[];
        partnerDeepLinkToken?: (string|null);
        static create(properties: E2E.ContextInfo.$Shape): E2E.ContextInfo & E2E.ContextInfo.$Shape;
        static create(properties?: E2E.ContextInfo.$Properties): E2E.ContextInfo;
        static encode(m: E2E.ContextInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo & E2E.ContextInfo.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.ContextInfo;
        static toObject(m: E2E.ContextInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ContextInfo {
        interface $Properties {
            stanzaId?: (string|null);
            participant?: (string|null);
            quotedMessage?: (E2E.Message.$Properties|null);
            remoteJid?: (string|null);
            mentionedJid?: (string[]|null);
            conversionSource?: (string|null);
            conversionData?: (Uint8Array|null);
            conversionDelaySeconds?: (number|null);
            forwardingScore?: (number|null);
            isForwarded?: (boolean|null);
            quotedAd?: (E2E.ContextInfo.AdReplyInfo.$Properties|null);
            placeholderKey?: (Protocol.MessageKey.$Properties|null);
            expiration?: (number|null);
            ephemeralSettingTimestamp?: (number|Long|null);
            ephemeralSharedSecret?: (Uint8Array|null);
            externalAdReply?: (E2E.ContextInfo.ExternalAdReplyInfo.$Properties|null);
            entryPointConversionSource?: (string|null);
            entryPointConversionApp?: (string|null);
            entryPointConversionDelaySeconds?: (number|null);
            disappearingMode?: (E2E.DisappearingMode.$Properties|null);
            actionLink?: (E2E.ActionLink.$Properties|null);
            groupSubject?: (string|null);
            parentGroupJid?: (string|null);
            trustBannerType?: (string|null);
            trustBannerAction?: (number|null);
            isSampled?: (boolean|null);
            groupMentions?: (E2E.GroupMention.$Properties[]|null);
            utm?: (E2E.ContextInfo.UTMInfo.$Properties|null);
            forwardedNewsletterMessageInfo?: (E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties|null);
            businessMessageForwardInfo?: (E2E.ContextInfo.BusinessMessageForwardInfo.$Properties|null);
            smbClientCampaignId?: (string|null);
            smbServerCampaignId?: (string|null);
            dataSharingContext?: (E2E.ContextInfo.DataSharingContext.$Properties|null);
            alwaysShowAdAttribution?: (boolean|null);
            featureEligibilities?: (E2E.ContextInfo.FeatureEligibilities.$Properties|null);
            entryPointConversionExternalSource?: (string|null);
            entryPointConversionExternalMedium?: (string|null);
            ctwaSignals?: (string|null);
            ctwaPayload?: (Uint8Array|null);
            forwardedAiBotMessageInfo?: (AICommon.ForwardedAIBotMessageInfo.$Properties|null);
            statusAttributionType?: (E2E.ContextInfo.StatusAttributionType|null);
            urlTrackingMap?: (E2E.UrlTrackingMap.$Properties|null);
            pairedMediaType?: (E2E.ContextInfo.PairedMediaType|null);
            rankingVersion?: (number|null);
            memberLabel?: (E2E.MemberLabel.$Properties|null);
            isQuestion?: (boolean|null);
            statusSourceType?: (E2E.ContextInfo.StatusSourceType|null);
            statusAttributions?: (StatusAttributions.StatusAttribution.$Properties[]|null);
            isGroupStatus?: (boolean|null);
            forwardOrigin?: (E2E.ContextInfo.ForwardOrigin|null);
            questionReplyQuotedMessage?: (E2E.ContextInfo.QuestionReplyQuotedMessage.$Properties|null);
            statusAudienceMetadata?: (E2E.ContextInfo.StatusAudienceMetadata.$Properties|null);
            nonJidMentions?: (number|null);
            quotedType?: (E2E.ContextInfo.QuotedType|null);
            botMessageSharingInfo?: (AICommon.BotMessageSharingInfo.$Properties|null);
            isSpoiler?: (boolean|null);
            mediaDomainInfo?: (E2E.MediaDomainInfo.$Properties|null);
            partiallySelectedContent?: (E2E.ContextInfo.PartiallySelectedContent.$Properties|null);
            afterReadDuration?: (number|null);
            crossAppSource?: (E2E.ContextInfo.CrossAppSource|null);
            businessInteractionPills?: (E2E.ContextInfo.BusinessInteractionPills.$Properties|null);
            posterStatusId?: (string|null);
            instagramThreadLink?: (E2E.ContextInfo.InstagramThreadLink.$Properties|null);
            aiProvenance?: (AICommon.AIProvenance.$Properties|null);
            experienceIds?: (number[]|null);
            partnerDeepLinkToken?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          stanzaId?: string|null;
          participant?: string|null;
          quotedMessage?: E2E.Message.$Shape|null;
          remoteJid?: string|null;
          mentionedJid?: string[]|null;
          conversionSource?: string|null;
          conversionData?: Uint8Array|null;
          conversionDelaySeconds?: number|null;
          forwardingScore?: number|null;
          isForwarded?: boolean|null;
          quotedAd?: E2E.ContextInfo.AdReplyInfo.$Shape|null;
          placeholderKey?: Protocol.MessageKey.$Shape|null;
          expiration?: number|null;
          ephemeralSettingTimestamp?: number|Long|null;
          ephemeralSharedSecret?: Uint8Array|null;
          externalAdReply?: E2E.ContextInfo.ExternalAdReplyInfo.$Shape|null;
          entryPointConversionSource?: string|null;
          entryPointConversionApp?: string|null;
          entryPointConversionDelaySeconds?: number|null;
          disappearingMode?: E2E.DisappearingMode.$Shape|null;
          actionLink?: E2E.ActionLink.$Shape|null;
          groupSubject?: string|null;
          parentGroupJid?: string|null;
          trustBannerType?: string|null;
          trustBannerAction?: number|null;
          isSampled?: boolean|null;
          groupMentions?: E2E.GroupMention.$Shape[]|null;
          utm?: E2E.ContextInfo.UTMInfo.$Shape|null;
          forwardedNewsletterMessageInfo?: E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Shape|null;
          businessMessageForwardInfo?: E2E.ContextInfo.BusinessMessageForwardInfo.$Shape|null;
          smbClientCampaignId?: string|null;
          smbServerCampaignId?: string|null;
          dataSharingContext?: E2E.ContextInfo.DataSharingContext.$Shape|null;
          alwaysShowAdAttribution?: boolean|null;
          featureEligibilities?: E2E.ContextInfo.FeatureEligibilities.$Shape|null;
          entryPointConversionExternalSource?: string|null;
          entryPointConversionExternalMedium?: string|null;
          ctwaSignals?: string|null;
          ctwaPayload?: Uint8Array|null;
          forwardedAiBotMessageInfo?: AICommon.ForwardedAIBotMessageInfo.$Shape|null;
          statusAttributionType?: E2E.ContextInfo.StatusAttributionType|null;
          urlTrackingMap?: E2E.UrlTrackingMap.$Shape|null;
          pairedMediaType?: E2E.ContextInfo.PairedMediaType|null;
          rankingVersion?: number|null;
          memberLabel?: E2E.MemberLabel.$Shape|null;
          isQuestion?: boolean|null;
          statusSourceType?: E2E.ContextInfo.StatusSourceType|null;
          statusAttributions?: StatusAttributions.StatusAttribution.$Shape[]|null;
          isGroupStatus?: boolean|null;
          forwardOrigin?: E2E.ContextInfo.ForwardOrigin|null;
          questionReplyQuotedMessage?: E2E.ContextInfo.QuestionReplyQuotedMessage.$Shape|null;
          statusAudienceMetadata?: E2E.ContextInfo.StatusAudienceMetadata.$Shape|null;
          nonJidMentions?: number|null;
          quotedType?: E2E.ContextInfo.QuotedType|null;
          botMessageSharingInfo?: AICommon.BotMessageSharingInfo.$Shape|null;
          isSpoiler?: boolean|null;
          mediaDomainInfo?: E2E.MediaDomainInfo.$Shape|null;
          partiallySelectedContent?: E2E.ContextInfo.PartiallySelectedContent.$Shape|null;
          afterReadDuration?: number|null;
          crossAppSource?: E2E.ContextInfo.CrossAppSource|null;
          businessInteractionPills?: E2E.ContextInfo.BusinessInteractionPills.$Shape|null;
          posterStatusId?: string|null;
          instagramThreadLink?: E2E.ContextInfo.InstagramThreadLink.$Shape|null;
          aiProvenance?: AICommon.AIProvenance.$Shape|null;
          experienceIds?: number[]|null;
          partnerDeepLinkToken?: string|null;
          $unknowns?: Uint8Array[];
        };

        interface IAdReplyInfo extends E2E.ContextInfo.AdReplyInfo.$Properties {
        }

        class AdReplyInfo {
            constructor(p?: E2E.ContextInfo.AdReplyInfo.$Properties);
            $unknowns?: Uint8Array[];
            advertiserName?: (string|null);
            mediaType?: (E2E.ContextInfo.AdReplyInfo.MediaType|null);
            jpegThumbnail?: (Uint8Array|null);
            caption?: (string|null);
            static create(properties: E2E.ContextInfo.AdReplyInfo.$Shape): E2E.ContextInfo.AdReplyInfo & E2E.ContextInfo.AdReplyInfo.$Shape;
            static create(properties?: E2E.ContextInfo.AdReplyInfo.$Properties): E2E.ContextInfo.AdReplyInfo;
            static encode(m: E2E.ContextInfo.AdReplyInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.AdReplyInfo & E2E.ContextInfo.AdReplyInfo.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.AdReplyInfo;
            static toObject(m: E2E.ContextInfo.AdReplyInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AdReplyInfo {
            interface $Properties {
                advertiserName?: (string|null);
                mediaType?: (E2E.ContextInfo.AdReplyInfo.MediaType|null);
                jpegThumbnail?: (Uint8Array|null);
                caption?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.AdReplyInfo.$Properties;

            enum MediaType {
                NONE = 0,
                IMAGE = 1,
                VIDEO = 2
            }
        }

        interface IBusinessInteractionPills extends E2E.ContextInfo.BusinessInteractionPills.$Properties {
        }

        class BusinessInteractionPills {
            constructor(p?: E2E.ContextInfo.BusinessInteractionPills.$Properties);
            $unknowns?: Uint8Array[];
            businessJid?: (string|null);
            pills: E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties[];
            entryPoint?: (E2E.ContextInfo.BusinessInteractionPills.EntryPoint|null);
            signedPayload?: (Uint8Array|null);
            signatureEnvelope?: (AICommon.BotSignatureVerificationMetadata.$Properties|null);
            unauthenticatedBusinessMetadata?: (E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Properties|null);
            static create(properties: E2E.ContextInfo.BusinessInteractionPills.$Shape): E2E.ContextInfo.BusinessInteractionPills & E2E.ContextInfo.BusinessInteractionPills.$Shape;
            static create(properties?: E2E.ContextInfo.BusinessInteractionPills.$Properties): E2E.ContextInfo.BusinessInteractionPills;
            static encode(m: E2E.ContextInfo.BusinessInteractionPills.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.BusinessInteractionPills & E2E.ContextInfo.BusinessInteractionPills.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.BusinessInteractionPills;
            static toObject(m: E2E.ContextInfo.BusinessInteractionPills, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessInteractionPills {
            interface $Properties {
                businessJid?: (string|null);
                pills?: (E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties[]|null);
                entryPoint?: (E2E.ContextInfo.BusinessInteractionPills.EntryPoint|null);
                signedPayload?: (Uint8Array|null);
                signatureEnvelope?: (AICommon.BotSignatureVerificationMetadata.$Properties|null);
                unauthenticatedBusinessMetadata?: (E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.BusinessInteractionPills.$Properties;

            enum EntryPoint {
                ENTRY_POINT_UNKNOWN = 0,
                P2P_LINK_SHARE = 1,
                CONTACT_CARD_SHARING = 2,
                PHONE_NUMBER = 3,
                STATUS = 4,
                IN_THREAD_CONTEXT_CARD = 5
            }

            interface IPill extends E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties {
            }

            class Pill {
                constructor(p?: E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties);
                $unknowns?: Uint8Array[];
                pillType?: (E2E.ContextInfo.BusinessInteractionPills.PillType|null);
                actionUrl?: (string|null);
                static create(properties: E2E.ContextInfo.BusinessInteractionPills.Pill.$Shape): E2E.ContextInfo.BusinessInteractionPills.Pill & E2E.ContextInfo.BusinessInteractionPills.Pill.$Shape;
                static create(properties?: E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties): E2E.ContextInfo.BusinessInteractionPills.Pill;
                static encode(m: E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.BusinessInteractionPills.Pill & E2E.ContextInfo.BusinessInteractionPills.Pill.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.ContextInfo.BusinessInteractionPills.Pill;
                static toObject(m: E2E.ContextInfo.BusinessInteractionPills.Pill, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Pill {
                interface $Properties {
                    pillType?: (E2E.ContextInfo.BusinessInteractionPills.PillType|null);
                    actionUrl?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties;
            }

            enum PillType {
                UNKNOWN = 0,
                VIEW_BUSINESS = 1,
                CHAT = 2,
                CALL = 3,
                CATALOG = 4,
                CHANNEL = 5,
                BOOK_APPOINTMENT = 6,
                OFFERS = 7,
                BESTSELLERS = 8,
                MENU = 9,
                ABOUT = 10,
                SHOP = 11,
                ORDER = 12
            }

            interface ISignedPayload extends E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Properties {
            }

            class SignedPayload {
                constructor(p?: E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Properties);
                $unknowns?: Uint8Array[];
                verifiedName?: (string|null);
                pills: E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties[];
                static create(properties: E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Shape): E2E.ContextInfo.BusinessInteractionPills.SignedPayload & E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Shape;
                static create(properties?: E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Properties): E2E.ContextInfo.BusinessInteractionPills.SignedPayload;
                static encode(m: E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.BusinessInteractionPills.SignedPayload & E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.ContextInfo.BusinessInteractionPills.SignedPayload;
                static toObject(m: E2E.ContextInfo.BusinessInteractionPills.SignedPayload, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace SignedPayload {
                interface $Properties {
                    verifiedName?: (string|null);
                    pills?: (E2E.ContextInfo.BusinessInteractionPills.Pill.$Properties[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.ContextInfo.BusinessInteractionPills.SignedPayload.$Properties;
            }

            interface IUnauthenticatedBusinessMetadata extends E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Properties {
            }

            class UnauthenticatedBusinessMetadata {
                constructor(p?: E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Properties);
                $unknowns?: Uint8Array[];
                businessName?: (string|null);
                businessCategory?: (string|null);
                businessIsOpen?: (boolean|null);
                businessIsOpenSnapshotMs?: (number|Long|null);
                static create(properties: E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Shape): E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata & E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Shape;
                static create(properties?: E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Properties): E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata;
                static encode(m: E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata & E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata;
                static toObject(m: E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace UnauthenticatedBusinessMetadata {
                interface $Properties {
                    businessName?: (string|null);
                    businessCategory?: (string|null);
                    businessIsOpen?: (boolean|null);
                    businessIsOpenSnapshotMs?: (number|Long|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.ContextInfo.BusinessInteractionPills.UnauthenticatedBusinessMetadata.$Properties;
            }
        }

        interface IBusinessMessageForwardInfo extends E2E.ContextInfo.BusinessMessageForwardInfo.$Properties {
        }

        class BusinessMessageForwardInfo {
            constructor(p?: E2E.ContextInfo.BusinessMessageForwardInfo.$Properties);
            $unknowns?: Uint8Array[];
            businessOwnerJid?: (string|null);
            static create(properties: E2E.ContextInfo.BusinessMessageForwardInfo.$Shape): E2E.ContextInfo.BusinessMessageForwardInfo & E2E.ContextInfo.BusinessMessageForwardInfo.$Shape;
            static create(properties?: E2E.ContextInfo.BusinessMessageForwardInfo.$Properties): E2E.ContextInfo.BusinessMessageForwardInfo;
            static encode(m: E2E.ContextInfo.BusinessMessageForwardInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.BusinessMessageForwardInfo & E2E.ContextInfo.BusinessMessageForwardInfo.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.BusinessMessageForwardInfo;
            static toObject(m: E2E.ContextInfo.BusinessMessageForwardInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessMessageForwardInfo {
            interface $Properties {
                businessOwnerJid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.BusinessMessageForwardInfo.$Properties;
        }

        enum CrossAppSource {
            CROSS_APP_SOURCE_UNKNOWN = 0,
            CROSS_APP_SOURCE_INSTAGRAM = 1,
            CROSS_APP_SOURCE_FACEBOOK = 2
        }

        interface IDataSharingContext extends E2E.ContextInfo.DataSharingContext.$Properties {
        }

        class DataSharingContext {
            constructor(p?: E2E.ContextInfo.DataSharingContext.$Properties);
            $unknowns?: Uint8Array[];
            showMmDisclosure?: (boolean|null);
            encryptedSignalTokenConsented?: (string|null);
            parameters: E2E.ContextInfo.DataSharingContext.Parameters.$Properties[];
            dataSharingFlags?: (number|null);
            static create(properties: E2E.ContextInfo.DataSharingContext.$Shape): E2E.ContextInfo.DataSharingContext & E2E.ContextInfo.DataSharingContext.$Shape;
            static create(properties?: E2E.ContextInfo.DataSharingContext.$Properties): E2E.ContextInfo.DataSharingContext;
            static encode(m: E2E.ContextInfo.DataSharingContext.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.DataSharingContext & E2E.ContextInfo.DataSharingContext.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.DataSharingContext;
            static toObject(m: E2E.ContextInfo.DataSharingContext, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DataSharingContext {
            interface $Properties {
                showMmDisclosure?: (boolean|null);
                encryptedSignalTokenConsented?: (string|null);
                parameters?: (E2E.ContextInfo.DataSharingContext.Parameters.$Properties[]|null);
                dataSharingFlags?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.DataSharingContext.$Properties;

            enum DataSharingFlags {
                SHOW_MM_DISCLOSURE_ON_CLICK = 1,
                SHOW_MM_DISCLOSURE_ON_READ = 2
            }

            interface IParameters extends E2E.ContextInfo.DataSharingContext.Parameters.$Properties {
            }

            class Parameters {
                constructor(p?: E2E.ContextInfo.DataSharingContext.Parameters.$Properties);
                $unknowns?: Uint8Array[];
                key?: (string|null);
                stringData?: (string|null);
                intData?: (number|Long|null);
                floatData?: (number|null);
                contents?: (E2E.ContextInfo.DataSharingContext.Parameters.$Properties|null);
                static create(properties: E2E.ContextInfo.DataSharingContext.Parameters.$Shape): E2E.ContextInfo.DataSharingContext.Parameters & E2E.ContextInfo.DataSharingContext.Parameters.$Shape;
                static create(properties?: E2E.ContextInfo.DataSharingContext.Parameters.$Properties): E2E.ContextInfo.DataSharingContext.Parameters;
                static encode(m: E2E.ContextInfo.DataSharingContext.Parameters.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.DataSharingContext.Parameters & E2E.ContextInfo.DataSharingContext.Parameters.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.ContextInfo.DataSharingContext.Parameters;
                static toObject(m: E2E.ContextInfo.DataSharingContext.Parameters, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Parameters {
                interface $Properties {
                    key?: (string|null);
                    stringData?: (string|null);
                    intData?: (number|Long|null);
                    floatData?: (number|null);
                    contents?: (E2E.ContextInfo.DataSharingContext.Parameters.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.ContextInfo.DataSharingContext.Parameters.$Properties;
            }
        }

        interface IExternalAdReplyInfo extends E2E.ContextInfo.ExternalAdReplyInfo.$Properties {
        }

        class ExternalAdReplyInfo {
            constructor(p?: E2E.ContextInfo.ExternalAdReplyInfo.$Properties);
            $unknowns?: Uint8Array[];
            title?: (string|null);
            body?: (string|null);
            mediaType?: (E2E.ContextInfo.ExternalAdReplyInfo.MediaType|null);
            thumbnailUrl?: (string|null);
            mediaUrl?: (string|null);
            thumbnail?: (Uint8Array|null);
            sourceType?: (string|null);
            sourceId?: (string|null);
            sourceUrl?: (string|null);
            containsAutoReply?: (boolean|null);
            renderLargerThumbnail?: (boolean|null);
            showAdAttribution?: (boolean|null);
            ctwaClid?: (string|null);
            ref?: (string|null);
            clickToWhatsappCall?: (boolean|null);
            adContextPreviewDismissed?: (boolean|null);
            sourceApp?: (string|null);
            automatedGreetingMessageShown?: (boolean|null);
            greetingMessageBody?: (string|null);
            ctaPayload?: (string|null);
            disableNudge?: (boolean|null);
            originalImageUrl?: (string|null);
            automatedGreetingMessageCtaType?: (string|null);
            wtwaAdFormat?: (boolean|null);
            adType?: (E2E.ContextInfo.ExternalAdReplyInfo.AdType|null);
            wtwaWebsiteUrl?: (string|null);
            adPreviewUrl?: (string|null);
            containsCtwaFlowsAutoReply?: (boolean|null);
            agmThumbnailStrategy?: (number|null);
            agmTitleStrategy?: (number|null);
            agmSubtitleStrategy?: (number|null);
            agmHeaderInteractionStrategy?: (number|null);
            containsCtwaFlowsAutoLabel?: (boolean|null);
            static create(properties: E2E.ContextInfo.ExternalAdReplyInfo.$Shape): E2E.ContextInfo.ExternalAdReplyInfo & E2E.ContextInfo.ExternalAdReplyInfo.$Shape;
            static create(properties?: E2E.ContextInfo.ExternalAdReplyInfo.$Properties): E2E.ContextInfo.ExternalAdReplyInfo;
            static encode(m: E2E.ContextInfo.ExternalAdReplyInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.ExternalAdReplyInfo & E2E.ContextInfo.ExternalAdReplyInfo.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.ExternalAdReplyInfo;
            static toObject(m: E2E.ContextInfo.ExternalAdReplyInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ExternalAdReplyInfo {
            interface $Properties {
                title?: (string|null);
                body?: (string|null);
                mediaType?: (E2E.ContextInfo.ExternalAdReplyInfo.MediaType|null);
                thumbnailUrl?: (string|null);
                mediaUrl?: (string|null);
                thumbnail?: (Uint8Array|null);
                sourceType?: (string|null);
                sourceId?: (string|null);
                sourceUrl?: (string|null);
                containsAutoReply?: (boolean|null);
                renderLargerThumbnail?: (boolean|null);
                showAdAttribution?: (boolean|null);
                ctwaClid?: (string|null);
                ref?: (string|null);
                clickToWhatsappCall?: (boolean|null);
                adContextPreviewDismissed?: (boolean|null);
                sourceApp?: (string|null);
                automatedGreetingMessageShown?: (boolean|null);
                greetingMessageBody?: (string|null);
                ctaPayload?: (string|null);
                disableNudge?: (boolean|null);
                originalImageUrl?: (string|null);
                automatedGreetingMessageCtaType?: (string|null);
                wtwaAdFormat?: (boolean|null);
                adType?: (E2E.ContextInfo.ExternalAdReplyInfo.AdType|null);
                wtwaWebsiteUrl?: (string|null);
                adPreviewUrl?: (string|null);
                containsCtwaFlowsAutoReply?: (boolean|null);
                agmThumbnailStrategy?: (number|null);
                agmTitleStrategy?: (number|null);
                agmSubtitleStrategy?: (number|null);
                agmHeaderInteractionStrategy?: (number|null);
                containsCtwaFlowsAutoLabel?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.ExternalAdReplyInfo.$Properties;

            enum AdType {
                CTWA = 0,
                CAWC = 1
            }

            enum MediaType {
                NONE = 0,
                IMAGE = 1,
                VIDEO = 2
            }
        }

        interface IFeatureEligibilities extends E2E.ContextInfo.FeatureEligibilities.$Properties {
        }

        class FeatureEligibilities {
            constructor(p?: E2E.ContextInfo.FeatureEligibilities.$Properties);
            $unknowns?: Uint8Array[];
            cannotBeReactedTo?: (boolean|null);
            cannotBeRanked?: (boolean|null);
            canRequestFeedback?: (boolean|null);
            canBeReshared?: (boolean|null);
            canReceiveMultiReact?: (boolean|null);
            static create(properties: E2E.ContextInfo.FeatureEligibilities.$Shape): E2E.ContextInfo.FeatureEligibilities & E2E.ContextInfo.FeatureEligibilities.$Shape;
            static create(properties?: E2E.ContextInfo.FeatureEligibilities.$Properties): E2E.ContextInfo.FeatureEligibilities;
            static encode(m: E2E.ContextInfo.FeatureEligibilities.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.FeatureEligibilities & E2E.ContextInfo.FeatureEligibilities.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.FeatureEligibilities;
            static toObject(m: E2E.ContextInfo.FeatureEligibilities, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FeatureEligibilities {
            interface $Properties {
                cannotBeReactedTo?: (boolean|null);
                cannotBeRanked?: (boolean|null);
                canRequestFeedback?: (boolean|null);
                canBeReshared?: (boolean|null);
                canReceiveMultiReact?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.FeatureEligibilities.$Properties;
        }

        enum ForwardOrigin {
            UNKNOWN = 0,
            CHAT = 1,
            STATUS = 2,
            CHANNELS = 3,
            META_AI = 4,
            UGC = 5
        }

        interface IForwardedNewsletterMessageInfo extends E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties {
        }

        class ForwardedNewsletterMessageInfo {
            constructor(p?: E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties);
            $unknowns?: Uint8Array[];
            newsletterJid?: (string|null);
            serverMessageId?: (number|null);
            newsletterName?: (string|null);
            contentType?: (E2E.ContextInfo.ForwardedNewsletterMessageInfo.ContentType|null);
            accessibilityText?: (string|null);
            profileName?: (string|null);
            static create(properties: E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Shape): E2E.ContextInfo.ForwardedNewsletterMessageInfo & E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Shape;
            static create(properties?: E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties): E2E.ContextInfo.ForwardedNewsletterMessageInfo;
            static encode(m: E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.ForwardedNewsletterMessageInfo & E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.ForwardedNewsletterMessageInfo;
            static toObject(m: E2E.ContextInfo.ForwardedNewsletterMessageInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ForwardedNewsletterMessageInfo {
            interface $Properties {
                newsletterJid?: (string|null);
                serverMessageId?: (number|null);
                newsletterName?: (string|null);
                contentType?: (E2E.ContextInfo.ForwardedNewsletterMessageInfo.ContentType|null);
                accessibilityText?: (string|null);
                profileName?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.ForwardedNewsletterMessageInfo.$Properties;

            enum ContentType {
                UPDATE = 1,
                UPDATE_CARD = 2,
                LINK_CARD = 3
            }
        }

        interface IInstagramThreadLink extends E2E.ContextInfo.InstagramThreadLink.$Properties {
        }

        class InstagramThreadLink {
            constructor(p?: E2E.ContextInfo.InstagramThreadLink.$Properties);
            $unknowns?: Uint8Array[];
            url?: (string|null);
            static create(properties: E2E.ContextInfo.InstagramThreadLink.$Shape): E2E.ContextInfo.InstagramThreadLink & E2E.ContextInfo.InstagramThreadLink.$Shape;
            static create(properties?: E2E.ContextInfo.InstagramThreadLink.$Properties): E2E.ContextInfo.InstagramThreadLink;
            static encode(m: E2E.ContextInfo.InstagramThreadLink.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.InstagramThreadLink & E2E.ContextInfo.InstagramThreadLink.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.InstagramThreadLink;
            static toObject(m: E2E.ContextInfo.InstagramThreadLink, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InstagramThreadLink {
            interface $Properties {
                url?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.InstagramThreadLink.$Properties;
        }

        enum PairedMediaType {
            NOT_PAIRED_MEDIA = 0,
            SD_VIDEO_PARENT = 1,
            HD_VIDEO_CHILD = 2,
            SD_IMAGE_PARENT = 3,
            HD_IMAGE_CHILD = 4,
            MOTION_PHOTO_PARENT = 5,
            MOTION_PHOTO_CHILD = 6,
            HEVC_VIDEO_PARENT = 7,
            HEVC_VIDEO_CHILD = 8
        }

        interface IPartiallySelectedContent extends E2E.ContextInfo.PartiallySelectedContent.$Properties {
        }

        class PartiallySelectedContent {
            constructor(p?: E2E.ContextInfo.PartiallySelectedContent.$Properties);
            $unknowns?: Uint8Array[];
            text?: (string|null);
            static create(properties: E2E.ContextInfo.PartiallySelectedContent.$Shape): E2E.ContextInfo.PartiallySelectedContent & E2E.ContextInfo.PartiallySelectedContent.$Shape;
            static create(properties?: E2E.ContextInfo.PartiallySelectedContent.$Properties): E2E.ContextInfo.PartiallySelectedContent;
            static encode(m: E2E.ContextInfo.PartiallySelectedContent.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.PartiallySelectedContent & E2E.ContextInfo.PartiallySelectedContent.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.PartiallySelectedContent;
            static toObject(m: E2E.ContextInfo.PartiallySelectedContent, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PartiallySelectedContent {
            interface $Properties {
                text?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.PartiallySelectedContent.$Properties;
        }

        interface IQuestionReplyQuotedMessage extends E2E.ContextInfo.QuestionReplyQuotedMessage.$Properties {
        }

        class QuestionReplyQuotedMessage {
            constructor(p?: E2E.ContextInfo.QuestionReplyQuotedMessage.$Properties);
            $unknowns?: Uint8Array[];
            serverQuestionId?: (number|null);
            quotedQuestion?: (E2E.Message.$Properties|null);
            quotedResponse?: (E2E.Message.$Properties|null);
            static create(properties: E2E.ContextInfo.QuestionReplyQuotedMessage.$Shape): E2E.ContextInfo.QuestionReplyQuotedMessage & E2E.ContextInfo.QuestionReplyQuotedMessage.$Shape;
            static create(properties?: E2E.ContextInfo.QuestionReplyQuotedMessage.$Properties): E2E.ContextInfo.QuestionReplyQuotedMessage;
            static encode(m: E2E.ContextInfo.QuestionReplyQuotedMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.QuestionReplyQuotedMessage & E2E.ContextInfo.QuestionReplyQuotedMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.QuestionReplyQuotedMessage;
            static toObject(m: E2E.ContextInfo.QuestionReplyQuotedMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace QuestionReplyQuotedMessage {
            interface $Properties {
                serverQuestionId?: (number|null);
                quotedQuestion?: (E2E.Message.$Properties|null);
                quotedResponse?: (E2E.Message.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              serverQuestionId?: number|null;
              quotedQuestion?: E2E.Message.$Shape|null;
              quotedResponse?: E2E.Message.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        enum QuotedType {
            EXPLICIT = 0,
            AUTO = 1
        }

        enum StatusAttributionType {
            NONE = 0,
            RESHARED_FROM_MENTION = 1,
            RESHARED_FROM_POST = 2,
            RESHARED_FROM_POST_MANY_TIMES = 3,
            FORWARDED_FROM_STATUS = 4
        }

        interface IStatusAudienceMetadata extends E2E.ContextInfo.StatusAudienceMetadata.$Properties {
        }

        class StatusAudienceMetadata {
            constructor(p?: E2E.ContextInfo.StatusAudienceMetadata.$Properties);
            $unknowns?: Uint8Array[];
            audienceType?: (E2E.ContextInfo.StatusAudienceMetadata.AudienceType|null);
            listName?: (string|null);
            listEmoji?: (string|null);
            static create(properties: E2E.ContextInfo.StatusAudienceMetadata.$Shape): E2E.ContextInfo.StatusAudienceMetadata & E2E.ContextInfo.StatusAudienceMetadata.$Shape;
            static create(properties?: E2E.ContextInfo.StatusAudienceMetadata.$Properties): E2E.ContextInfo.StatusAudienceMetadata;
            static encode(m: E2E.ContextInfo.StatusAudienceMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.StatusAudienceMetadata & E2E.ContextInfo.StatusAudienceMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.StatusAudienceMetadata;
            static toObject(m: E2E.ContextInfo.StatusAudienceMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusAudienceMetadata {
            interface $Properties {
                audienceType?: (E2E.ContextInfo.StatusAudienceMetadata.AudienceType|null);
                listName?: (string|null);
                listEmoji?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.StatusAudienceMetadata.$Properties;

            enum AudienceType {
                UNKNOWN = 0,
                CLOSE_FRIENDS = 1
            }
        }

        enum StatusSourceType {
            IMAGE = 0,
            VIDEO = 1,
            GIF = 2,
            AUDIO = 3,
            TEXT = 4,
            MUSIC_STANDALONE = 5
        }

        interface IUTMInfo extends E2E.ContextInfo.UTMInfo.$Properties {
        }

        class UTMInfo {
            constructor(p?: E2E.ContextInfo.UTMInfo.$Properties);
            $unknowns?: Uint8Array[];
            utmSource?: (string|null);
            utmCampaign?: (string|null);
            static create(properties: E2E.ContextInfo.UTMInfo.$Shape): E2E.ContextInfo.UTMInfo & E2E.ContextInfo.UTMInfo.$Shape;
            static create(properties?: E2E.ContextInfo.UTMInfo.$Properties): E2E.ContextInfo.UTMInfo;
            static encode(m: E2E.ContextInfo.UTMInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.ContextInfo.UTMInfo & E2E.ContextInfo.UTMInfo.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.ContextInfo.UTMInfo;
            static toObject(m: E2E.ContextInfo.UTMInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UTMInfo {
            interface $Properties {
                utmSource?: (string|null);
                utmCampaign?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.ContextInfo.UTMInfo.$Properties;
        }
    }

    interface IMediaDomainInfo extends E2E.MediaDomainInfo.$Properties {
    }

    class MediaDomainInfo {
        constructor(p?: E2E.MediaDomainInfo.$Properties);
        $unknowns?: Uint8Array[];
        mediaKeyDomain?: (E2E.MediaKeyDomain|null);
        e2EeMediaKey?: (Uint8Array|null);
        static create(properties: E2E.MediaDomainInfo.$Shape): E2E.MediaDomainInfo & E2E.MediaDomainInfo.$Shape;
        static create(properties?: E2E.MediaDomainInfo.$Properties): E2E.MediaDomainInfo;
        static encode(m: E2E.MediaDomainInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.MediaDomainInfo & E2E.MediaDomainInfo.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.MediaDomainInfo;
        static toObject(m: E2E.MediaDomainInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MediaDomainInfo {
        interface $Properties {
            mediaKeyDomain?: (E2E.MediaKeyDomain|null);
            e2EeMediaKey?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = E2E.MediaDomainInfo.$Properties;
    }

    interface IMessage extends E2E.Message.$Properties {
    }

    class Message {
        constructor(p?: E2E.Message.$Properties);
        $unknowns?: Uint8Array[];
        conversation?: (string|null);
        senderKeyDistributionMessage?: (E2E.Message.SenderKeyDistributionMessage.$Properties|null);
        imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
        contactMessage?: (E2E.Message.ContactMessage.$Properties|null);
        locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
        extendedTextMessage?: (E2E.Message.ExtendedTextMessage.$Properties|null);
        documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
        audioMessage?: (E2E.Message.AudioMessage.$Properties|null);
        videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
        call?: (E2E.Message.Call.$Properties|null);
        chat?: (E2E.Message.Chat.$Properties|null);
        protocolMessage?: (E2E.Message.ProtocolMessage.$Properties|null);
        contactsArrayMessage?: (E2E.Message.ContactsArrayMessage.$Properties|null);
        highlyStructuredMessage?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
        fastRatchetKeySenderKeyDistributionMessage?: (E2E.Message.SenderKeyDistributionMessage.$Properties|null);
        sendPaymentMessage?: (E2E.Message.SendPaymentMessage.$Properties|null);
        liveLocationMessage?: (E2E.Message.LiveLocationMessage.$Properties|null);
        requestPaymentMessage?: (E2E.Message.RequestPaymentMessage.$Properties|null);
        declinePaymentRequestMessage?: (E2E.Message.DeclinePaymentRequestMessage.$Properties|null);
        cancelPaymentRequestMessage?: (E2E.Message.CancelPaymentRequestMessage.$Properties|null);
        templateMessage?: (E2E.Message.TemplateMessage.$Properties|null);
        stickerMessage?: (E2E.Message.StickerMessage.$Properties|null);
        groupInviteMessage?: (E2E.Message.GroupInviteMessage.$Properties|null);
        templateButtonReplyMessage?: (E2E.Message.TemplateButtonReplyMessage.$Properties|null);
        productMessage?: (E2E.Message.ProductMessage.$Properties|null);
        deviceSentMessage?: (E2E.Message.DeviceSentMessage.$Properties|null);
        messageContextInfo?: (E2E.MessageContextInfo.$Properties|null);
        listMessage?: (E2E.Message.ListMessage.$Properties|null);
        viewOnceMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        orderMessage?: (E2E.Message.OrderMessage.$Properties|null);
        listResponseMessage?: (E2E.Message.ListResponseMessage.$Properties|null);
        ephemeralMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        invoiceMessage?: (E2E.Message.InvoiceMessage.$Properties|null);
        buttonsMessage?: (E2E.Message.ButtonsMessage.$Properties|null);
        buttonsResponseMessage?: (E2E.Message.ButtonsResponseMessage.$Properties|null);
        paymentInviteMessage?: (E2E.Message.PaymentInviteMessage.$Properties|null);
        interactiveMessage?: (E2E.Message.InteractiveMessage.$Properties|null);
        reactionMessage?: (E2E.Message.ReactionMessage.$Properties|null);
        stickerSyncRmrMessage?: (E2E.Message.StickerSyncRMRMessage.$Properties|null);
        interactiveResponseMessage?: (E2E.Message.InteractiveResponseMessage.$Properties|null);
        pollCreationMessage?: (E2E.Message.PollCreationMessage.$Properties|null);
        pollUpdateMessage?: (E2E.Message.PollUpdateMessage.$Properties|null);
        keepInChatMessage?: (E2E.Message.KeepInChatMessage.$Properties|null);
        documentWithCaptionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        requestPhoneNumberMessage?: (E2E.Message.RequestPhoneNumberMessage.$Properties|null);
        viewOnceMessageV2?: (E2E.Message.FutureProofMessage.$Properties|null);
        encReactionMessage?: (E2E.Message.EncReactionMessage.$Properties|null);
        editedMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        viewOnceMessageV2Extension?: (E2E.Message.FutureProofMessage.$Properties|null);
        pollCreationMessageV2?: (E2E.Message.PollCreationMessage.$Properties|null);
        scheduledCallCreationMessage?: (E2E.Message.ScheduledCallCreationMessage.$Properties|null);
        groupMentionedMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        pinInChatMessage?: (E2E.Message.PinInChatMessage.$Properties|null);
        pollCreationMessageV3?: (E2E.Message.PollCreationMessage.$Properties|null);
        scheduledCallEditMessage?: (E2E.Message.ScheduledCallEditMessage.$Properties|null);
        ptvMessage?: (E2E.Message.VideoMessage.$Properties|null);
        botInvokeMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        callLogMesssage?: (E2E.Message.CallLogMessage.$Properties|null);
        messageHistoryBundle?: (E2E.Message.MessageHistoryBundle.$Properties|null);
        encCommentMessage?: (E2E.Message.EncCommentMessage.$Properties|null);
        bcallMessage?: (E2E.Message.BCallMessage.$Properties|null);
        lottieStickerMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        eventMessage?: (E2E.Message.EventMessage.$Properties|null);
        encEventResponseMessage?: (E2E.Message.EncEventResponseMessage.$Properties|null);
        commentMessage?: (E2E.Message.CommentMessage.$Properties|null);
        newsletterAdminInviteMessage?: (E2E.Message.NewsletterAdminInviteMessage.$Properties|null);
        placeholderMessage?: (E2E.Message.PlaceholderMessage.$Properties|null);
        secretEncryptedMessage?: (E2E.Message.SecretEncryptedMessage.$Properties|null);
        albumMessage?: (E2E.Message.AlbumMessage.$Properties|null);
        eventCoverImage?: (E2E.Message.FutureProofMessage.$Properties|null);
        stickerPackMessage?: (E2E.Message.StickerPackMessage.$Properties|null);
        statusMentionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        pollResultSnapshotMessage?: (E2E.Message.PollResultSnapshotMessage.$Properties|null);
        pollCreationOptionImageMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        associatedChildMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        groupStatusMentionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        pollCreationMessageV4?: (E2E.Message.FutureProofMessage.$Properties|null);
        statusAddYours?: (E2E.Message.FutureProofMessage.$Properties|null);
        groupStatusMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        richResponseMessage?: (E2E.AIRichResponseMessage.$Properties|null);
        statusNotificationMessage?: (E2E.Message.StatusNotificationMessage.$Properties|null);
        limitSharingMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        botTaskMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        questionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        messageHistoryNotice?: (E2E.Message.MessageHistoryNotice.$Properties|null);
        groupStatusMessageV2?: (E2E.Message.FutureProofMessage.$Properties|null);
        botForwardedMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        statusQuestionAnswerMessage?: (E2E.Message.StatusQuestionAnswerMessage.$Properties|null);
        questionReplyMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        questionResponseMessage?: (E2E.Message.QuestionResponseMessage.$Properties|null);
        statusQuotedMessage?: (E2E.Message.StatusQuotedMessage.$Properties|null);
        statusStickerInteractionMessage?: (E2E.Message.StatusStickerInteractionMessage.$Properties|null);
        pollCreationMessageV5?: (E2E.Message.PollCreationMessage.$Properties|null);
        newsletterFollowerInviteMessageV2?: (E2E.Message.NewsletterFollowerInviteMessage.$Properties|null);
        pollResultSnapshotMessageV3?: (E2E.Message.PollResultSnapshotMessage.$Properties|null);
        newsletterAdminProfileMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        spoilerMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        pollCreationMessageV6?: (E2E.Message.PollCreationMessage.$Properties|null);
        conditionalRevealMessage?: (E2E.Message.ConditionalRevealMessage.$Properties|null);
        pollAddOptionMessage?: (E2E.Message.PollAddOptionMessage.$Properties|null);
        eventInviteMessage?: (E2E.Message.EventInviteMessage.$Properties|null);
        groupRootKeyShare?: (E2E.GroupRootKeyShare.$Properties|null);
        paymentReminderMessage?: (E2E.Message.PaymentReminderMessage.$Properties|null);
        splitPaymentMessage?: (E2E.Message.SplitPaymentMessage.$Properties|null);
        newsletterAdminProfileStatusMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        rootSecretDistributeMessage?: (E2E.Message.RootSecretDistributeMessage.$Properties|null);
        splitPaymentUpdateMessage?: (E2E.Message.SplitPaymentUpdateMessage.$Properties|null);
        musicMessage?: (E2E.Message.MusicMessage.$Properties|null);
        statusLinkPreviewMetadata?: (E2E.Message.StatusLinkPreviewMetadata.$Properties|null);
        botPlatformRegistrationSuccessMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        newsletterScheduledMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        acp2SettingMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        audioStickerMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
        static create(properties: E2E.Message.$Shape): E2E.Message & E2E.Message.$Shape;
        static create(properties?: E2E.Message.$Properties): E2E.Message;
        static encode(m: E2E.Message.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message & E2E.Message.$Shape;
        static fromObject(d: { [k: string]: any }): E2E.Message;
        static toObject(m: E2E.Message, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace Message {
        interface $Properties {
            conversation?: (string|null);
            senderKeyDistributionMessage?: (E2E.Message.SenderKeyDistributionMessage.$Properties|null);
            imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
            contactMessage?: (E2E.Message.ContactMessage.$Properties|null);
            locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
            extendedTextMessage?: (E2E.Message.ExtendedTextMessage.$Properties|null);
            documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
            audioMessage?: (E2E.Message.AudioMessage.$Properties|null);
            videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
            call?: (E2E.Message.Call.$Properties|null);
            chat?: (E2E.Message.Chat.$Properties|null);
            protocolMessage?: (E2E.Message.ProtocolMessage.$Properties|null);
            contactsArrayMessage?: (E2E.Message.ContactsArrayMessage.$Properties|null);
            highlyStructuredMessage?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
            fastRatchetKeySenderKeyDistributionMessage?: (E2E.Message.SenderKeyDistributionMessage.$Properties|null);
            sendPaymentMessage?: (E2E.Message.SendPaymentMessage.$Properties|null);
            liveLocationMessage?: (E2E.Message.LiveLocationMessage.$Properties|null);
            requestPaymentMessage?: (E2E.Message.RequestPaymentMessage.$Properties|null);
            declinePaymentRequestMessage?: (E2E.Message.DeclinePaymentRequestMessage.$Properties|null);
            cancelPaymentRequestMessage?: (E2E.Message.CancelPaymentRequestMessage.$Properties|null);
            templateMessage?: (E2E.Message.TemplateMessage.$Properties|null);
            stickerMessage?: (E2E.Message.StickerMessage.$Properties|null);
            groupInviteMessage?: (E2E.Message.GroupInviteMessage.$Properties|null);
            templateButtonReplyMessage?: (E2E.Message.TemplateButtonReplyMessage.$Properties|null);
            productMessage?: (E2E.Message.ProductMessage.$Properties|null);
            deviceSentMessage?: (E2E.Message.DeviceSentMessage.$Properties|null);
            messageContextInfo?: (E2E.MessageContextInfo.$Properties|null);
            listMessage?: (E2E.Message.ListMessage.$Properties|null);
            viewOnceMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            orderMessage?: (E2E.Message.OrderMessage.$Properties|null);
            listResponseMessage?: (E2E.Message.ListResponseMessage.$Properties|null);
            ephemeralMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            invoiceMessage?: (E2E.Message.InvoiceMessage.$Properties|null);
            buttonsMessage?: (E2E.Message.ButtonsMessage.$Properties|null);
            buttonsResponseMessage?: (E2E.Message.ButtonsResponseMessage.$Properties|null);
            paymentInviteMessage?: (E2E.Message.PaymentInviteMessage.$Properties|null);
            interactiveMessage?: (E2E.Message.InteractiveMessage.$Properties|null);
            reactionMessage?: (E2E.Message.ReactionMessage.$Properties|null);
            stickerSyncRmrMessage?: (E2E.Message.StickerSyncRMRMessage.$Properties|null);
            interactiveResponseMessage?: (E2E.Message.InteractiveResponseMessage.$Properties|null);
            pollCreationMessage?: (E2E.Message.PollCreationMessage.$Properties|null);
            pollUpdateMessage?: (E2E.Message.PollUpdateMessage.$Properties|null);
            keepInChatMessage?: (E2E.Message.KeepInChatMessage.$Properties|null);
            documentWithCaptionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            requestPhoneNumberMessage?: (E2E.Message.RequestPhoneNumberMessage.$Properties|null);
            viewOnceMessageV2?: (E2E.Message.FutureProofMessage.$Properties|null);
            encReactionMessage?: (E2E.Message.EncReactionMessage.$Properties|null);
            editedMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            viewOnceMessageV2Extension?: (E2E.Message.FutureProofMessage.$Properties|null);
            pollCreationMessageV2?: (E2E.Message.PollCreationMessage.$Properties|null);
            scheduledCallCreationMessage?: (E2E.Message.ScheduledCallCreationMessage.$Properties|null);
            groupMentionedMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            pinInChatMessage?: (E2E.Message.PinInChatMessage.$Properties|null);
            pollCreationMessageV3?: (E2E.Message.PollCreationMessage.$Properties|null);
            scheduledCallEditMessage?: (E2E.Message.ScheduledCallEditMessage.$Properties|null);
            ptvMessage?: (E2E.Message.VideoMessage.$Properties|null);
            botInvokeMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            callLogMesssage?: (E2E.Message.CallLogMessage.$Properties|null);
            messageHistoryBundle?: (E2E.Message.MessageHistoryBundle.$Properties|null);
            encCommentMessage?: (E2E.Message.EncCommentMessage.$Properties|null);
            bcallMessage?: (E2E.Message.BCallMessage.$Properties|null);
            lottieStickerMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            eventMessage?: (E2E.Message.EventMessage.$Properties|null);
            encEventResponseMessage?: (E2E.Message.EncEventResponseMessage.$Properties|null);
            commentMessage?: (E2E.Message.CommentMessage.$Properties|null);
            newsletterAdminInviteMessage?: (E2E.Message.NewsletterAdminInviteMessage.$Properties|null);
            placeholderMessage?: (E2E.Message.PlaceholderMessage.$Properties|null);
            secretEncryptedMessage?: (E2E.Message.SecretEncryptedMessage.$Properties|null);
            albumMessage?: (E2E.Message.AlbumMessage.$Properties|null);
            eventCoverImage?: (E2E.Message.FutureProofMessage.$Properties|null);
            stickerPackMessage?: (E2E.Message.StickerPackMessage.$Properties|null);
            statusMentionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            pollResultSnapshotMessage?: (E2E.Message.PollResultSnapshotMessage.$Properties|null);
            pollCreationOptionImageMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            associatedChildMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            groupStatusMentionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            pollCreationMessageV4?: (E2E.Message.FutureProofMessage.$Properties|null);
            statusAddYours?: (E2E.Message.FutureProofMessage.$Properties|null);
            groupStatusMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            richResponseMessage?: (E2E.AIRichResponseMessage.$Properties|null);
            statusNotificationMessage?: (E2E.Message.StatusNotificationMessage.$Properties|null);
            limitSharingMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            botTaskMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            questionMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            messageHistoryNotice?: (E2E.Message.MessageHistoryNotice.$Properties|null);
            groupStatusMessageV2?: (E2E.Message.FutureProofMessage.$Properties|null);
            botForwardedMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            statusQuestionAnswerMessage?: (E2E.Message.StatusQuestionAnswerMessage.$Properties|null);
            questionReplyMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            questionResponseMessage?: (E2E.Message.QuestionResponseMessage.$Properties|null);
            statusQuotedMessage?: (E2E.Message.StatusQuotedMessage.$Properties|null);
            statusStickerInteractionMessage?: (E2E.Message.StatusStickerInteractionMessage.$Properties|null);
            pollCreationMessageV5?: (E2E.Message.PollCreationMessage.$Properties|null);
            newsletterFollowerInviteMessageV2?: (E2E.Message.NewsletterFollowerInviteMessage.$Properties|null);
            pollResultSnapshotMessageV3?: (E2E.Message.PollResultSnapshotMessage.$Properties|null);
            newsletterAdminProfileMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            spoilerMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            pollCreationMessageV6?: (E2E.Message.PollCreationMessage.$Properties|null);
            conditionalRevealMessage?: (E2E.Message.ConditionalRevealMessage.$Properties|null);
            pollAddOptionMessage?: (E2E.Message.PollAddOptionMessage.$Properties|null);
            eventInviteMessage?: (E2E.Message.EventInviteMessage.$Properties|null);
            groupRootKeyShare?: (E2E.GroupRootKeyShare.$Properties|null);
            paymentReminderMessage?: (E2E.Message.PaymentReminderMessage.$Properties|null);
            splitPaymentMessage?: (E2E.Message.SplitPaymentMessage.$Properties|null);
            newsletterAdminProfileStatusMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            rootSecretDistributeMessage?: (E2E.Message.RootSecretDistributeMessage.$Properties|null);
            splitPaymentUpdateMessage?: (E2E.Message.SplitPaymentUpdateMessage.$Properties|null);
            musicMessage?: (E2E.Message.MusicMessage.$Properties|null);
            statusLinkPreviewMetadata?: (E2E.Message.StatusLinkPreviewMetadata.$Properties|null);
            botPlatformRegistrationSuccessMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            newsletterScheduledMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            acp2SettingMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            audioStickerMessage?: (E2E.Message.FutureProofMessage.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          conversation?: string|null;
          senderKeyDistributionMessage?: E2E.Message.SenderKeyDistributionMessage.$Shape|null;
          imageMessage?: E2E.Message.ImageMessage.$Shape|null;
          contactMessage?: E2E.Message.ContactMessage.$Shape|null;
          locationMessage?: E2E.Message.LocationMessage.$Shape|null;
          extendedTextMessage?: E2E.Message.ExtendedTextMessage.$Shape|null;
          documentMessage?: E2E.Message.DocumentMessage.$Shape|null;
          audioMessage?: E2E.Message.AudioMessage.$Shape|null;
          videoMessage?: E2E.Message.VideoMessage.$Shape|null;
          call?: E2E.Message.Call.$Shape|null;
          chat?: E2E.Message.Chat.$Shape|null;
          protocolMessage?: E2E.Message.ProtocolMessage.$Shape|null;
          contactsArrayMessage?: E2E.Message.ContactsArrayMessage.$Shape|null;
          highlyStructuredMessage?: E2E.Message.HighlyStructuredMessage.$Shape|null;
          fastRatchetKeySenderKeyDistributionMessage?: E2E.Message.SenderKeyDistributionMessage.$Shape|null;
          sendPaymentMessage?: E2E.Message.SendPaymentMessage.$Shape|null;
          liveLocationMessage?: E2E.Message.LiveLocationMessage.$Shape|null;
          requestPaymentMessage?: E2E.Message.RequestPaymentMessage.$Shape|null;
          declinePaymentRequestMessage?: E2E.Message.DeclinePaymentRequestMessage.$Shape|null;
          cancelPaymentRequestMessage?: E2E.Message.CancelPaymentRequestMessage.$Shape|null;
          templateMessage?: E2E.Message.TemplateMessage.$Shape|null;
          stickerMessage?: E2E.Message.StickerMessage.$Shape|null;
          groupInviteMessage?: E2E.Message.GroupInviteMessage.$Shape|null;
          templateButtonReplyMessage?: E2E.Message.TemplateButtonReplyMessage.$Shape|null;
          productMessage?: E2E.Message.ProductMessage.$Shape|null;
          deviceSentMessage?: E2E.Message.DeviceSentMessage.$Shape|null;
          messageContextInfo?: E2E.MessageContextInfo.$Shape|null;
          listMessage?: E2E.Message.ListMessage.$Shape|null;
          viewOnceMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          orderMessage?: E2E.Message.OrderMessage.$Shape|null;
          listResponseMessage?: E2E.Message.ListResponseMessage.$Shape|null;
          ephemeralMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          invoiceMessage?: E2E.Message.InvoiceMessage.$Shape|null;
          buttonsMessage?: E2E.Message.ButtonsMessage.$Shape|null;
          buttonsResponseMessage?: E2E.Message.ButtonsResponseMessage.$Shape|null;
          paymentInviteMessage?: E2E.Message.PaymentInviteMessage.$Shape|null;
          interactiveMessage?: E2E.Message.InteractiveMessage.$Shape|null;
          reactionMessage?: E2E.Message.ReactionMessage.$Shape|null;
          stickerSyncRmrMessage?: E2E.Message.StickerSyncRMRMessage.$Shape|null;
          interactiveResponseMessage?: E2E.Message.InteractiveResponseMessage.$Shape|null;
          pollCreationMessage?: E2E.Message.PollCreationMessage.$Shape|null;
          pollUpdateMessage?: E2E.Message.PollUpdateMessage.$Shape|null;
          keepInChatMessage?: E2E.Message.KeepInChatMessage.$Shape|null;
          documentWithCaptionMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          requestPhoneNumberMessage?: E2E.Message.RequestPhoneNumberMessage.$Shape|null;
          viewOnceMessageV2?: E2E.Message.FutureProofMessage.$Shape|null;
          encReactionMessage?: E2E.Message.EncReactionMessage.$Shape|null;
          editedMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          viewOnceMessageV2Extension?: E2E.Message.FutureProofMessage.$Shape|null;
          pollCreationMessageV2?: E2E.Message.PollCreationMessage.$Shape|null;
          scheduledCallCreationMessage?: E2E.Message.ScheduledCallCreationMessage.$Shape|null;
          groupMentionedMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          pinInChatMessage?: E2E.Message.PinInChatMessage.$Shape|null;
          pollCreationMessageV3?: E2E.Message.PollCreationMessage.$Shape|null;
          scheduledCallEditMessage?: E2E.Message.ScheduledCallEditMessage.$Shape|null;
          ptvMessage?: E2E.Message.VideoMessage.$Shape|null;
          botInvokeMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          callLogMesssage?: E2E.Message.CallLogMessage.$Shape|null;
          messageHistoryBundle?: E2E.Message.MessageHistoryBundle.$Shape|null;
          encCommentMessage?: E2E.Message.EncCommentMessage.$Shape|null;
          bcallMessage?: E2E.Message.BCallMessage.$Shape|null;
          lottieStickerMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          eventMessage?: E2E.Message.EventMessage.$Shape|null;
          encEventResponseMessage?: E2E.Message.EncEventResponseMessage.$Shape|null;
          commentMessage?: E2E.Message.CommentMessage.$Shape|null;
          newsletterAdminInviteMessage?: E2E.Message.NewsletterAdminInviteMessage.$Shape|null;
          placeholderMessage?: E2E.Message.PlaceholderMessage.$Shape|null;
          secretEncryptedMessage?: E2E.Message.SecretEncryptedMessage.$Shape|null;
          albumMessage?: E2E.Message.AlbumMessage.$Shape|null;
          eventCoverImage?: E2E.Message.FutureProofMessage.$Shape|null;
          stickerPackMessage?: E2E.Message.StickerPackMessage.$Shape|null;
          statusMentionMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          pollResultSnapshotMessage?: E2E.Message.PollResultSnapshotMessage.$Shape|null;
          pollCreationOptionImageMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          associatedChildMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          groupStatusMentionMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          pollCreationMessageV4?: E2E.Message.FutureProofMessage.$Shape|null;
          statusAddYours?: E2E.Message.FutureProofMessage.$Shape|null;
          groupStatusMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          richResponseMessage?: E2E.AIRichResponseMessage.$Shape|null;
          statusNotificationMessage?: E2E.Message.StatusNotificationMessage.$Shape|null;
          limitSharingMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          botTaskMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          questionMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          messageHistoryNotice?: E2E.Message.MessageHistoryNotice.$Shape|null;
          groupStatusMessageV2?: E2E.Message.FutureProofMessage.$Shape|null;
          botForwardedMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          statusQuestionAnswerMessage?: E2E.Message.StatusQuestionAnswerMessage.$Shape|null;
          questionReplyMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          questionResponseMessage?: E2E.Message.QuestionResponseMessage.$Shape|null;
          statusQuotedMessage?: E2E.Message.StatusQuotedMessage.$Shape|null;
          statusStickerInteractionMessage?: E2E.Message.StatusStickerInteractionMessage.$Shape|null;
          pollCreationMessageV5?: E2E.Message.PollCreationMessage.$Shape|null;
          newsletterFollowerInviteMessageV2?: E2E.Message.NewsletterFollowerInviteMessage.$Shape|null;
          pollResultSnapshotMessageV3?: E2E.Message.PollResultSnapshotMessage.$Shape|null;
          newsletterAdminProfileMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          spoilerMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          pollCreationMessageV6?: E2E.Message.PollCreationMessage.$Shape|null;
          conditionalRevealMessage?: E2E.Message.ConditionalRevealMessage.$Shape|null;
          pollAddOptionMessage?: E2E.Message.PollAddOptionMessage.$Shape|null;
          eventInviteMessage?: E2E.Message.EventInviteMessage.$Shape|null;
          groupRootKeyShare?: E2E.GroupRootKeyShare.$Shape|null;
          paymentReminderMessage?: E2E.Message.PaymentReminderMessage.$Shape|null;
          splitPaymentMessage?: E2E.Message.SplitPaymentMessage.$Shape|null;
          newsletterAdminProfileStatusMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          rootSecretDistributeMessage?: E2E.Message.RootSecretDistributeMessage.$Shape|null;
          splitPaymentUpdateMessage?: E2E.Message.SplitPaymentUpdateMessage.$Shape|null;
          musicMessage?: E2E.Message.MusicMessage.$Shape|null;
          statusLinkPreviewMetadata?: E2E.Message.StatusLinkPreviewMetadata.$Shape|null;
          botPlatformRegistrationSuccessMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          newsletterScheduledMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          acp2SettingMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          audioStickerMessage?: E2E.Message.FutureProofMessage.$Shape|null;
          $unknowns?: Uint8Array[];
        };

        interface IAlbumMessage extends E2E.Message.AlbumMessage.$Properties {
        }

        class AlbumMessage {
            constructor(p?: E2E.Message.AlbumMessage.$Properties);
            $unknowns?: Uint8Array[];
            expectedImageCount?: (number|null);
            expectedVideoCount?: (number|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.AlbumMessage.$Shape): E2E.Message.AlbumMessage & E2E.Message.AlbumMessage.$Shape;
            static create(properties?: E2E.Message.AlbumMessage.$Properties): E2E.Message.AlbumMessage;
            static encode(m: E2E.Message.AlbumMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AlbumMessage & E2E.Message.AlbumMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AlbumMessage;
            static toObject(m: E2E.Message.AlbumMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AlbumMessage {
            interface $Properties {
                expectedImageCount?: (number|null);
                expectedVideoCount?: (number|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              expectedImageCount?: number|null;
              expectedVideoCount?: number|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IAppStateFatalExceptionNotification extends E2E.Message.AppStateFatalExceptionNotification.$Properties {
        }

        class AppStateFatalExceptionNotification {
            constructor(p?: E2E.Message.AppStateFatalExceptionNotification.$Properties);
            $unknowns?: Uint8Array[];
            collectionNames: string[];
            timestamp?: (number|Long|null);
            static create(properties: E2E.Message.AppStateFatalExceptionNotification.$Shape): E2E.Message.AppStateFatalExceptionNotification & E2E.Message.AppStateFatalExceptionNotification.$Shape;
            static create(properties?: E2E.Message.AppStateFatalExceptionNotification.$Properties): E2E.Message.AppStateFatalExceptionNotification;
            static encode(m: E2E.Message.AppStateFatalExceptionNotification.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AppStateFatalExceptionNotification & E2E.Message.AppStateFatalExceptionNotification.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AppStateFatalExceptionNotification;
            static toObject(m: E2E.Message.AppStateFatalExceptionNotification, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppStateFatalExceptionNotification {
            interface $Properties {
                collectionNames?: (string[]|null);
                timestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.AppStateFatalExceptionNotification.$Properties;
        }

        interface IAppStateSyncKey extends E2E.Message.AppStateSyncKey.$Properties {
        }

        class AppStateSyncKey {
            constructor(p?: E2E.Message.AppStateSyncKey.$Properties);
            $unknowns?: Uint8Array[];
            keyId?: (E2E.Message.AppStateSyncKeyId.$Properties|null);
            keyData?: (E2E.Message.AppStateSyncKeyData.$Properties|null);
            static create(properties: E2E.Message.AppStateSyncKey.$Shape): E2E.Message.AppStateSyncKey & E2E.Message.AppStateSyncKey.$Shape;
            static create(properties?: E2E.Message.AppStateSyncKey.$Properties): E2E.Message.AppStateSyncKey;
            static encode(m: E2E.Message.AppStateSyncKey.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AppStateSyncKey & E2E.Message.AppStateSyncKey.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AppStateSyncKey;
            static toObject(m: E2E.Message.AppStateSyncKey, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppStateSyncKey {
            interface $Properties {
                keyId?: (E2E.Message.AppStateSyncKeyId.$Properties|null);
                keyData?: (E2E.Message.AppStateSyncKeyData.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.AppStateSyncKey.$Properties;
        }

        interface IAppStateSyncKeyData extends E2E.Message.AppStateSyncKeyData.$Properties {
        }

        class AppStateSyncKeyData {
            constructor(p?: E2E.Message.AppStateSyncKeyData.$Properties);
            $unknowns?: Uint8Array[];
            keyData?: (Uint8Array|null);
            fingerprint?: (E2E.Message.AppStateSyncKeyFingerprint.$Properties|null);
            timestamp?: (number|Long|null);
            static create(properties: E2E.Message.AppStateSyncKeyData.$Shape): E2E.Message.AppStateSyncKeyData & E2E.Message.AppStateSyncKeyData.$Shape;
            static create(properties?: E2E.Message.AppStateSyncKeyData.$Properties): E2E.Message.AppStateSyncKeyData;
            static encode(m: E2E.Message.AppStateSyncKeyData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AppStateSyncKeyData & E2E.Message.AppStateSyncKeyData.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AppStateSyncKeyData;
            static toObject(m: E2E.Message.AppStateSyncKeyData, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppStateSyncKeyData {
            interface $Properties {
                keyData?: (Uint8Array|null);
                fingerprint?: (E2E.Message.AppStateSyncKeyFingerprint.$Properties|null);
                timestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.AppStateSyncKeyData.$Properties;
        }

        interface IAppStateSyncKeyFingerprint extends E2E.Message.AppStateSyncKeyFingerprint.$Properties {
        }

        class AppStateSyncKeyFingerprint {
            constructor(p?: E2E.Message.AppStateSyncKeyFingerprint.$Properties);
            $unknowns?: Uint8Array[];
            rawId?: (number|null);
            currentIndex?: (number|null);
            deviceIndexes: number[];
            static create(properties: E2E.Message.AppStateSyncKeyFingerprint.$Shape): E2E.Message.AppStateSyncKeyFingerprint & E2E.Message.AppStateSyncKeyFingerprint.$Shape;
            static create(properties?: E2E.Message.AppStateSyncKeyFingerprint.$Properties): E2E.Message.AppStateSyncKeyFingerprint;
            static encode(m: E2E.Message.AppStateSyncKeyFingerprint.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AppStateSyncKeyFingerprint & E2E.Message.AppStateSyncKeyFingerprint.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AppStateSyncKeyFingerprint;
            static toObject(m: E2E.Message.AppStateSyncKeyFingerprint, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppStateSyncKeyFingerprint {
            interface $Properties {
                rawId?: (number|null);
                currentIndex?: (number|null);
                deviceIndexes?: (number[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.AppStateSyncKeyFingerprint.$Properties;
        }

        interface IAppStateSyncKeyId extends E2E.Message.AppStateSyncKeyId.$Properties {
        }

        class AppStateSyncKeyId {
            constructor(p?: E2E.Message.AppStateSyncKeyId.$Properties);
            $unknowns?: Uint8Array[];
            keyId?: (Uint8Array|null);
            static create(properties: E2E.Message.AppStateSyncKeyId.$Shape): E2E.Message.AppStateSyncKeyId & E2E.Message.AppStateSyncKeyId.$Shape;
            static create(properties?: E2E.Message.AppStateSyncKeyId.$Properties): E2E.Message.AppStateSyncKeyId;
            static encode(m: E2E.Message.AppStateSyncKeyId.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AppStateSyncKeyId & E2E.Message.AppStateSyncKeyId.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AppStateSyncKeyId;
            static toObject(m: E2E.Message.AppStateSyncKeyId, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppStateSyncKeyId {
            interface $Properties {
                keyId?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.AppStateSyncKeyId.$Properties;
        }

        interface IAppStateSyncKeyRequest extends E2E.Message.AppStateSyncKeyRequest.$Properties {
        }

        class AppStateSyncKeyRequest {
            constructor(p?: E2E.Message.AppStateSyncKeyRequest.$Properties);
            $unknowns?: Uint8Array[];
            keyIds: E2E.Message.AppStateSyncKeyId.$Properties[];
            static create(properties: E2E.Message.AppStateSyncKeyRequest.$Shape): E2E.Message.AppStateSyncKeyRequest & E2E.Message.AppStateSyncKeyRequest.$Shape;
            static create(properties?: E2E.Message.AppStateSyncKeyRequest.$Properties): E2E.Message.AppStateSyncKeyRequest;
            static encode(m: E2E.Message.AppStateSyncKeyRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AppStateSyncKeyRequest & E2E.Message.AppStateSyncKeyRequest.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AppStateSyncKeyRequest;
            static toObject(m: E2E.Message.AppStateSyncKeyRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppStateSyncKeyRequest {
            interface $Properties {
                keyIds?: (E2E.Message.AppStateSyncKeyId.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.AppStateSyncKeyRequest.$Properties;
        }

        interface IAppStateSyncKeyShare extends E2E.Message.AppStateSyncKeyShare.$Properties {
        }

        class AppStateSyncKeyShare {
            constructor(p?: E2E.Message.AppStateSyncKeyShare.$Properties);
            $unknowns?: Uint8Array[];
            keys: E2E.Message.AppStateSyncKey.$Properties[];
            static create(properties: E2E.Message.AppStateSyncKeyShare.$Shape): E2E.Message.AppStateSyncKeyShare & E2E.Message.AppStateSyncKeyShare.$Shape;
            static create(properties?: E2E.Message.AppStateSyncKeyShare.$Properties): E2E.Message.AppStateSyncKeyShare;
            static encode(m: E2E.Message.AppStateSyncKeyShare.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AppStateSyncKeyShare & E2E.Message.AppStateSyncKeyShare.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AppStateSyncKeyShare;
            static toObject(m: E2E.Message.AppStateSyncKeyShare, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppStateSyncKeyShare {
            interface $Properties {
                keys?: (E2E.Message.AppStateSyncKey.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.AppStateSyncKeyShare.$Properties;
        }

        interface IAudioMessage extends E2E.Message.AudioMessage.$Properties {
        }

        class AudioMessage {
            constructor(p?: E2E.Message.AudioMessage.$Properties);
            $unknowns?: Uint8Array[];
            url?: (string|null);
            mimetype?: (string|null);
            fileSha256?: (Uint8Array|null);
            fileLength?: (number|Long|null);
            seconds?: (number|null);
            ptt?: (boolean|null);
            mediaKey?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            directPath?: (string|null);
            mediaKeyTimestamp?: (number|Long|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            streamingSidecar?: (Uint8Array|null);
            waveform?: (Uint8Array|null);
            backgroundArgb?: (number|null);
            viewOnce?: (boolean|null);
            accessibilityLabel?: (string|null);
            static create(properties: E2E.Message.AudioMessage.$Shape): E2E.Message.AudioMessage & E2E.Message.AudioMessage.$Shape;
            static create(properties?: E2E.Message.AudioMessage.$Properties): E2E.Message.AudioMessage;
            static encode(m: E2E.Message.AudioMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.AudioMessage & E2E.Message.AudioMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.AudioMessage;
            static toObject(m: E2E.Message.AudioMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AudioMessage {
            interface $Properties {
                url?: (string|null);
                mimetype?: (string|null);
                fileSha256?: (Uint8Array|null);
                fileLength?: (number|Long|null);
                seconds?: (number|null);
                ptt?: (boolean|null);
                mediaKey?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                directPath?: (string|null);
                mediaKeyTimestamp?: (number|Long|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                streamingSidecar?: (Uint8Array|null);
                waveform?: (Uint8Array|null);
                backgroundArgb?: (number|null);
                viewOnce?: (boolean|null);
                accessibilityLabel?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              url?: string|null;
              mimetype?: string|null;
              fileSha256?: Uint8Array|null;
              fileLength?: number|Long|null;
              seconds?: number|null;
              ptt?: boolean|null;
              mediaKey?: Uint8Array|null;
              fileEncSha256?: Uint8Array|null;
              directPath?: string|null;
              mediaKeyTimestamp?: number|Long|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              streamingSidecar?: Uint8Array|null;
              waveform?: Uint8Array|null;
              backgroundArgb?: number|null;
              viewOnce?: boolean|null;
              accessibilityLabel?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IBCallMessage extends E2E.Message.BCallMessage.$Properties {
        }

        class BCallMessage {
            constructor(p?: E2E.Message.BCallMessage.$Properties);
            $unknowns?: Uint8Array[];
            sessionId?: (string|null);
            mediaType?: (E2E.Message.BCallMessage.MediaType|null);
            masterKey?: (Uint8Array|null);
            caption?: (string|null);
            static create(properties: E2E.Message.BCallMessage.$Shape): E2E.Message.BCallMessage & E2E.Message.BCallMessage.$Shape;
            static create(properties?: E2E.Message.BCallMessage.$Properties): E2E.Message.BCallMessage;
            static encode(m: E2E.Message.BCallMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.BCallMessage & E2E.Message.BCallMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.BCallMessage;
            static toObject(m: E2E.Message.BCallMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BCallMessage {
            interface $Properties {
                sessionId?: (string|null);
                mediaType?: (E2E.Message.BCallMessage.MediaType|null);
                masterKey?: (Uint8Array|null);
                caption?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.BCallMessage.$Properties;

            enum MediaType {
                UNKNOWN = 0,
                AUDIO = 1,
                VIDEO = 2
            }
        }

        interface IBotHistoryShareSyncMetadata extends E2E.Message.BotHistoryShareSyncMetadata.$Properties {
        }

        class BotHistoryShareSyncMetadata {
            constructor(p?: E2E.Message.BotHistoryShareSyncMetadata.$Properties);
            $unknowns?: Uint8Array[];
            botJid?: (string|null);
            historyShareCutoffTimestamp?: (number|Long|null);
            historyShareMessages: E2E.Message.HistoryShareMessageEntry.$Properties[];
            static create(properties: E2E.Message.BotHistoryShareSyncMetadata.$Shape): E2E.Message.BotHistoryShareSyncMetadata & E2E.Message.BotHistoryShareSyncMetadata.$Shape;
            static create(properties?: E2E.Message.BotHistoryShareSyncMetadata.$Properties): E2E.Message.BotHistoryShareSyncMetadata;
            static encode(m: E2E.Message.BotHistoryShareSyncMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.BotHistoryShareSyncMetadata & E2E.Message.BotHistoryShareSyncMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.BotHistoryShareSyncMetadata;
            static toObject(m: E2E.Message.BotHistoryShareSyncMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotHistoryShareSyncMetadata {
            interface $Properties {
                botJid?: (string|null);
                historyShareCutoffTimestamp?: (number|Long|null);
                historyShareMessages?: (E2E.Message.HistoryShareMessageEntry.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.BotHistoryShareSyncMetadata.$Properties;
        }

        interface IButtonsMessage extends E2E.Message.ButtonsMessage.$Properties {
        }

        class ButtonsMessage {
            constructor(p?: E2E.Message.ButtonsMessage.$Properties);
            $unknowns?: Uint8Array[];
            contentText?: (string|null);
            footerText?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            buttons: E2E.Message.ButtonsMessage.Button.$Properties[];
            headerType?: (E2E.Message.ButtonsMessage.HeaderType|null);
            text?: (string|null);
            documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
            imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
            videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
            locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
            header?: ("text"|"documentMessage"|"imageMessage"|"videoMessage"|"locationMessage");
            static create(properties: E2E.Message.ButtonsMessage.$Shape): E2E.Message.ButtonsMessage & E2E.Message.ButtonsMessage.$Shape;
            static create(properties?: E2E.Message.ButtonsMessage.$Properties): E2E.Message.ButtonsMessage;
            static encode(m: E2E.Message.ButtonsMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ButtonsMessage & E2E.Message.ButtonsMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ButtonsMessage;
            static toObject(m: E2E.Message.ButtonsMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ButtonsMessage {
            interface $Properties {
                contentText?: (string|null);
                footerText?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                buttons?: (E2E.Message.ButtonsMessage.Button.$Properties[]|null);
                headerType?: (E2E.Message.ButtonsMessage.HeaderType|null);
                text?: (string|null);
                documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
                imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
                videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
                locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
                header?: ("text"|"documentMessage"|"imageMessage"|"videoMessage"|"locationMessage");
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              contentText?: string|null;
              footerText?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              buttons?: E2E.Message.ButtonsMessage.Button.$Shape[]|null;
              headerType?: E2E.Message.ButtonsMessage.HeaderType|null;
              text?: string|null;
              documentMessage?: E2E.Message.DocumentMessage.$Shape|null;
              imageMessage?: E2E.Message.ImageMessage.$Shape|null;
              videoMessage?: E2E.Message.VideoMessage.$Shape|null;
              locationMessage?: E2E.Message.LocationMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ header?: undefined; text?: null; documentMessage?: null; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ header?: "text"; text: string; documentMessage?: null; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ header?: "documentMessage"; text?: null; documentMessage: E2E.Message.DocumentMessage.$Shape; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ header?: "imageMessage"; text?: null; documentMessage?: null; imageMessage: E2E.Message.ImageMessage.$Shape; videoMessage?: null; locationMessage?: null }|{ header?: "videoMessage"; text?: null; documentMessage?: null; imageMessage?: null; videoMessage: E2E.Message.VideoMessage.$Shape; locationMessage?: null }|{ header?: "locationMessage"; text?: null; documentMessage?: null; imageMessage?: null; videoMessage?: null; locationMessage: E2E.Message.LocationMessage.$Shape })
            );

            interface IButton extends E2E.Message.ButtonsMessage.Button.$Properties {
            }

            class Button {
                constructor(p?: E2E.Message.ButtonsMessage.Button.$Properties);
                $unknowns?: Uint8Array[];
                buttonId?: (string|null);
                buttonText?: (E2E.Message.ButtonsMessage.Button.ButtonText.$Properties|null);
                type?: (E2E.Message.ButtonsMessage.Button.Type|null);
                nativeFlowInfo?: (E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Properties|null);
                static create(properties: E2E.Message.ButtonsMessage.Button.$Shape): E2E.Message.ButtonsMessage.Button & E2E.Message.ButtonsMessage.Button.$Shape;
                static create(properties?: E2E.Message.ButtonsMessage.Button.$Properties): E2E.Message.ButtonsMessage.Button;
                static encode(m: E2E.Message.ButtonsMessage.Button.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ButtonsMessage.Button & E2E.Message.ButtonsMessage.Button.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ButtonsMessage.Button;
                static toObject(m: E2E.Message.ButtonsMessage.Button, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Button {
                interface $Properties {
                    buttonId?: (string|null);
                    buttonText?: (E2E.Message.ButtonsMessage.Button.ButtonText.$Properties|null);
                    type?: (E2E.Message.ButtonsMessage.Button.Type|null);
                    nativeFlowInfo?: (E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ButtonsMessage.Button.$Properties;

                interface IButtonText extends E2E.Message.ButtonsMessage.Button.ButtonText.$Properties {
                }

                class ButtonText {
                    constructor(p?: E2E.Message.ButtonsMessage.Button.ButtonText.$Properties);
                    $unknowns?: Uint8Array[];
                    displayText?: (string|null);
                    static create(properties: E2E.Message.ButtonsMessage.Button.ButtonText.$Shape): E2E.Message.ButtonsMessage.Button.ButtonText & E2E.Message.ButtonsMessage.Button.ButtonText.$Shape;
                    static create(properties?: E2E.Message.ButtonsMessage.Button.ButtonText.$Properties): E2E.Message.ButtonsMessage.Button.ButtonText;
                    static encode(m: E2E.Message.ButtonsMessage.Button.ButtonText.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ButtonsMessage.Button.ButtonText & E2E.Message.ButtonsMessage.Button.ButtonText.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.ButtonsMessage.Button.ButtonText;
                    static toObject(m: E2E.Message.ButtonsMessage.Button.ButtonText, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ButtonText {
                    interface $Properties {
                        displayText?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.ButtonsMessage.Button.ButtonText.$Properties;
                }

                interface INativeFlowInfo extends E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Properties {
                }

                class NativeFlowInfo {
                    constructor(p?: E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Properties);
                    $unknowns?: Uint8Array[];
                    name?: (string|null);
                    paramsJson?: (string|null);
                    static create(properties: E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Shape): E2E.Message.ButtonsMessage.Button.NativeFlowInfo & E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Shape;
                    static create(properties?: E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Properties): E2E.Message.ButtonsMessage.Button.NativeFlowInfo;
                    static encode(m: E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ButtonsMessage.Button.NativeFlowInfo & E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.ButtonsMessage.Button.NativeFlowInfo;
                    static toObject(m: E2E.Message.ButtonsMessage.Button.NativeFlowInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace NativeFlowInfo {
                    interface $Properties {
                        name?: (string|null);
                        paramsJson?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.ButtonsMessage.Button.NativeFlowInfo.$Properties;
                }

                enum Type {
                    UNKNOWN = 0,
                    RESPONSE = 1,
                    NATIVE_FLOW = 2
                }
            }

            enum HeaderType {
                UNKNOWN = 0,
                EMPTY = 1,
                TEXT = 2,
                DOCUMENT = 3,
                IMAGE = 4,
                VIDEO = 5,
                LOCATION = 6
            }
        }

        interface IButtonsResponseMessage extends E2E.Message.ButtonsResponseMessage.$Properties {
        }

        class ButtonsResponseMessage {
            constructor(p?: E2E.Message.ButtonsResponseMessage.$Properties);
            $unknowns?: Uint8Array[];
            selectedButtonId?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            type?: (E2E.Message.ButtonsResponseMessage.Type|null);
            selectedDisplayText?: (string|null);
            response?: "selectedDisplayText";
            static create(properties: E2E.Message.ButtonsResponseMessage.$Shape): E2E.Message.ButtonsResponseMessage & E2E.Message.ButtonsResponseMessage.$Shape;
            static create(properties?: E2E.Message.ButtonsResponseMessage.$Properties): E2E.Message.ButtonsResponseMessage;
            static encode(m: E2E.Message.ButtonsResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ButtonsResponseMessage & E2E.Message.ButtonsResponseMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ButtonsResponseMessage;
            static toObject(m: E2E.Message.ButtonsResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ButtonsResponseMessage {
            interface $Properties {
                selectedButtonId?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                type?: (E2E.Message.ButtonsResponseMessage.Type|null);
                selectedDisplayText?: (string|null);
                response?: "selectedDisplayText";
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              selectedButtonId?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              type?: E2E.Message.ButtonsResponseMessage.Type|null;
              selectedDisplayText?: string|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ response?: undefined; selectedDisplayText?: null }|{ response?: "selectedDisplayText"; selectedDisplayText: string })
            );

            enum Type {
                UNKNOWN = 0,
                DISPLAY_TEXT = 1
            }
        }

        interface ICall extends E2E.Message.Call.$Properties {
        }

        class Call {
            constructor(p?: E2E.Message.Call.$Properties);
            $unknowns?: Uint8Array[];
            callKey?: (Uint8Array|null);
            conversionSource?: (string|null);
            conversionData?: (Uint8Array|null);
            conversionDelaySeconds?: (number|null);
            ctwaSignals?: (string|null);
            ctwaPayload?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            nativeFlowCallButtonPayload?: (string|null);
            deeplinkPayload?: (string|null);
            messageContextInfo?: (E2E.MessageContextInfo.$Properties|null);
            callEntryPoint?: (number|null);
            callReason?: (string|null);
            static create(properties: E2E.Message.Call.$Shape): E2E.Message.Call & E2E.Message.Call.$Shape;
            static create(properties?: E2E.Message.Call.$Properties): E2E.Message.Call;
            static encode(m: E2E.Message.Call.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.Call & E2E.Message.Call.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.Call;
            static toObject(m: E2E.Message.Call, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Call {
            interface $Properties {
                callKey?: (Uint8Array|null);
                conversionSource?: (string|null);
                conversionData?: (Uint8Array|null);
                conversionDelaySeconds?: (number|null);
                ctwaSignals?: (string|null);
                ctwaPayload?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                nativeFlowCallButtonPayload?: (string|null);
                deeplinkPayload?: (string|null);
                messageContextInfo?: (E2E.MessageContextInfo.$Properties|null);
                callEntryPoint?: (number|null);
                callReason?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              callKey?: Uint8Array|null;
              conversionSource?: string|null;
              conversionData?: Uint8Array|null;
              conversionDelaySeconds?: number|null;
              ctwaSignals?: string|null;
              ctwaPayload?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              nativeFlowCallButtonPayload?: string|null;
              deeplinkPayload?: string|null;
              messageContextInfo?: E2E.MessageContextInfo.$Shape|null;
              callEntryPoint?: number|null;
              callReason?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface ICallLogMessage extends E2E.Message.CallLogMessage.$Properties {
        }

        class CallLogMessage {
            constructor(p?: E2E.Message.CallLogMessage.$Properties);
            $unknowns?: Uint8Array[];
            isVideo?: (boolean|null);
            callOutcome?: (E2E.Message.CallLogMessage.CallOutcome|null);
            durationSecs?: (number|Long|null);
            callType?: (E2E.Message.CallLogMessage.CallType|null);
            participants: E2E.Message.CallLogMessage.CallParticipant.$Properties[];
            static create(properties: E2E.Message.CallLogMessage.$Shape): E2E.Message.CallLogMessage & E2E.Message.CallLogMessage.$Shape;
            static create(properties?: E2E.Message.CallLogMessage.$Properties): E2E.Message.CallLogMessage;
            static encode(m: E2E.Message.CallLogMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.CallLogMessage & E2E.Message.CallLogMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.CallLogMessage;
            static toObject(m: E2E.Message.CallLogMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CallLogMessage {
            interface $Properties {
                isVideo?: (boolean|null);
                callOutcome?: (E2E.Message.CallLogMessage.CallOutcome|null);
                durationSecs?: (number|Long|null);
                callType?: (E2E.Message.CallLogMessage.CallType|null);
                participants?: (E2E.Message.CallLogMessage.CallParticipant.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.CallLogMessage.$Properties;

            enum CallOutcome {
                CONNECTED = 0,
                MISSED = 1,
                FAILED = 2,
                REJECTED = 3,
                ACCEPTED_ELSEWHERE = 4,
                ONGOING = 5,
                SILENCED_BY_DND = 6,
                SILENCED_UNKNOWN_CALLER = 7
            }

            interface ICallParticipant extends E2E.Message.CallLogMessage.CallParticipant.$Properties {
            }

            class CallParticipant {
                constructor(p?: E2E.Message.CallLogMessage.CallParticipant.$Properties);
                $unknowns?: Uint8Array[];
                jid?: (string|null);
                callOutcome?: (E2E.Message.CallLogMessage.CallOutcome|null);
                static create(properties: E2E.Message.CallLogMessage.CallParticipant.$Shape): E2E.Message.CallLogMessage.CallParticipant & E2E.Message.CallLogMessage.CallParticipant.$Shape;
                static create(properties?: E2E.Message.CallLogMessage.CallParticipant.$Properties): E2E.Message.CallLogMessage.CallParticipant;
                static encode(m: E2E.Message.CallLogMessage.CallParticipant.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.CallLogMessage.CallParticipant & E2E.Message.CallLogMessage.CallParticipant.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.CallLogMessage.CallParticipant;
                static toObject(m: E2E.Message.CallLogMessage.CallParticipant, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace CallParticipant {
                interface $Properties {
                    jid?: (string|null);
                    callOutcome?: (E2E.Message.CallLogMessage.CallOutcome|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.CallLogMessage.CallParticipant.$Properties;
            }

            enum CallType {
                REGULAR = 0,
                SCHEDULED_CALL = 1,
                VOICE_CHAT = 2
            }
        }

        interface ICancelPaymentRequestMessage extends E2E.Message.CancelPaymentRequestMessage.$Properties {
        }

        class CancelPaymentRequestMessage {
            constructor(p?: E2E.Message.CancelPaymentRequestMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            static create(properties: E2E.Message.CancelPaymentRequestMessage.$Shape): E2E.Message.CancelPaymentRequestMessage & E2E.Message.CancelPaymentRequestMessage.$Shape;
            static create(properties?: E2E.Message.CancelPaymentRequestMessage.$Properties): E2E.Message.CancelPaymentRequestMessage;
            static encode(m: E2E.Message.CancelPaymentRequestMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.CancelPaymentRequestMessage & E2E.Message.CancelPaymentRequestMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.CancelPaymentRequestMessage;
            static toObject(m: E2E.Message.CancelPaymentRequestMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CancelPaymentRequestMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.CancelPaymentRequestMessage.$Properties;
        }

        interface IChat extends E2E.Message.Chat.$Properties {
        }

        class Chat {
            constructor(p?: E2E.Message.Chat.$Properties);
            $unknowns?: Uint8Array[];
            displayName?: (string|null);
            id?: (string|null);
            static create(properties: E2E.Message.Chat.$Shape): E2E.Message.Chat & E2E.Message.Chat.$Shape;
            static create(properties?: E2E.Message.Chat.$Properties): E2E.Message.Chat;
            static encode(m: E2E.Message.Chat.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.Chat & E2E.Message.Chat.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.Chat;
            static toObject(m: E2E.Message.Chat, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Chat {
            interface $Properties {
                displayName?: (string|null);
                id?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.Chat.$Properties;
        }

        interface IChatAnimatedWallpaper extends E2E.Message.ChatAnimatedWallpaper.$Properties {
        }

        class ChatAnimatedWallpaper {
            constructor(p?: E2E.Message.ChatAnimatedWallpaper.$Properties);
            $unknowns?: Uint8Array[];
            animatedWallpaperId?: (string|null);
            dimLevel?: (number|null);
            static create(properties: E2E.Message.ChatAnimatedWallpaper.$Shape): E2E.Message.ChatAnimatedWallpaper & E2E.Message.ChatAnimatedWallpaper.$Shape;
            static create(properties?: E2E.Message.ChatAnimatedWallpaper.$Properties): E2E.Message.ChatAnimatedWallpaper;
            static encode(m: E2E.Message.ChatAnimatedWallpaper.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ChatAnimatedWallpaper & E2E.Message.ChatAnimatedWallpaper.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ChatAnimatedWallpaper;
            static toObject(m: E2E.Message.ChatAnimatedWallpaper, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatAnimatedWallpaper {
            interface $Properties {
                animatedWallpaperId?: (string|null);
                dimLevel?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ChatAnimatedWallpaper.$Properties;
        }

        interface IChatCustomImageWallpaper extends E2E.Message.ChatCustomImageWallpaper.$Properties {
        }

        class ChatCustomImageWallpaper {
            constructor(p?: E2E.Message.ChatCustomImageWallpaper.$Properties);
            $unknowns?: Uint8Array[];
            directPath?: (string|null);
            mediaKey?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            fileSha256?: (Uint8Array|null);
            dimLevel?: (number|null);
            static create(properties: E2E.Message.ChatCustomImageWallpaper.$Shape): E2E.Message.ChatCustomImageWallpaper & E2E.Message.ChatCustomImageWallpaper.$Shape;
            static create(properties?: E2E.Message.ChatCustomImageWallpaper.$Properties): E2E.Message.ChatCustomImageWallpaper;
            static encode(m: E2E.Message.ChatCustomImageWallpaper.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ChatCustomImageWallpaper & E2E.Message.ChatCustomImageWallpaper.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ChatCustomImageWallpaper;
            static toObject(m: E2E.Message.ChatCustomImageWallpaper, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatCustomImageWallpaper {
            interface $Properties {
                directPath?: (string|null);
                mediaKey?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                fileSha256?: (Uint8Array|null);
                dimLevel?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ChatCustomImageWallpaper.$Properties;
        }

        interface IChatDefaultWallpaper extends E2E.Message.ChatDefaultWallpaper.$Properties {
        }

        class ChatDefaultWallpaper {
            constructor(p?: E2E.Message.ChatDefaultWallpaper.$Properties);
            $unknowns?: Uint8Array[];
            isDoodleEnabled?: (boolean|null);
            static create(properties: E2E.Message.ChatDefaultWallpaper.$Shape): E2E.Message.ChatDefaultWallpaper & E2E.Message.ChatDefaultWallpaper.$Shape;
            static create(properties?: E2E.Message.ChatDefaultWallpaper.$Properties): E2E.Message.ChatDefaultWallpaper;
            static encode(m: E2E.Message.ChatDefaultWallpaper.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ChatDefaultWallpaper & E2E.Message.ChatDefaultWallpaper.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ChatDefaultWallpaper;
            static toObject(m: E2E.Message.ChatDefaultWallpaper, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatDefaultWallpaper {
            interface $Properties {
                isDoodleEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ChatDefaultWallpaper.$Properties;
        }

        interface IChatSolidColorWallpaper extends E2E.Message.ChatSolidColorWallpaper.$Properties {
        }

        class ChatSolidColorWallpaper {
            constructor(p?: E2E.Message.ChatSolidColorWallpaper.$Properties);
            $unknowns?: Uint8Array[];
            colorLight?: (string|null);
            colorDark?: (string|null);
            isDoodleEnabled?: (boolean|null);
            static create(properties: E2E.Message.ChatSolidColorWallpaper.$Shape): E2E.Message.ChatSolidColorWallpaper & E2E.Message.ChatSolidColorWallpaper.$Shape;
            static create(properties?: E2E.Message.ChatSolidColorWallpaper.$Properties): E2E.Message.ChatSolidColorWallpaper;
            static encode(m: E2E.Message.ChatSolidColorWallpaper.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ChatSolidColorWallpaper & E2E.Message.ChatSolidColorWallpaper.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ChatSolidColorWallpaper;
            static toObject(m: E2E.Message.ChatSolidColorWallpaper, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatSolidColorWallpaper {
            interface $Properties {
                colorLight?: (string|null);
                colorDark?: (string|null);
                isDoodleEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ChatSolidColorWallpaper.$Properties;
        }

        interface IChatStockImageWallpaper extends E2E.Message.ChatStockImageWallpaper.$Properties {
        }

        class ChatStockImageWallpaper {
            constructor(p?: E2E.Message.ChatStockImageWallpaper.$Properties);
            $unknowns?: Uint8Array[];
            stockImageId?: (string|null);
            dimLevel?: (number|null);
            static create(properties: E2E.Message.ChatStockImageWallpaper.$Shape): E2E.Message.ChatStockImageWallpaper & E2E.Message.ChatStockImageWallpaper.$Shape;
            static create(properties?: E2E.Message.ChatStockImageWallpaper.$Properties): E2E.Message.ChatStockImageWallpaper;
            static encode(m: E2E.Message.ChatStockImageWallpaper.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ChatStockImageWallpaper & E2E.Message.ChatStockImageWallpaper.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ChatStockImageWallpaper;
            static toObject(m: E2E.Message.ChatStockImageWallpaper, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatStockImageWallpaper {
            interface $Properties {
                stockImageId?: (string|null);
                dimLevel?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ChatStockImageWallpaper.$Properties;
        }

        interface IChatThemeSetting extends E2E.Message.ChatThemeSetting.$Properties {
        }

        class ChatThemeSetting {
            constructor(p?: E2E.Message.ChatThemeSetting.$Properties);
            $unknowns?: Uint8Array[];
            settingTimestampMs?: (number|Long|null);
            clearTheme?: (boolean|null);
            colorSchemeId?: (string|null);
            defaultWallpaper?: (E2E.Message.ChatDefaultWallpaper.$Properties|null);
            solidColor?: (E2E.Message.ChatSolidColorWallpaper.$Properties|null);
            stockImage?: (E2E.Message.ChatStockImageWallpaper.$Properties|null);
            customImage?: (E2E.Message.ChatCustomImageWallpaper.$Properties|null);
            animatedWallpaper?: (E2E.Message.ChatAnimatedWallpaper.$Properties|null);
            wallpaper?: ("defaultWallpaper"|"solidColor"|"stockImage"|"customImage"|"animatedWallpaper");
            static create(properties: E2E.Message.ChatThemeSetting.$Shape): E2E.Message.ChatThemeSetting & E2E.Message.ChatThemeSetting.$Shape;
            static create(properties?: E2E.Message.ChatThemeSetting.$Properties): E2E.Message.ChatThemeSetting;
            static encode(m: E2E.Message.ChatThemeSetting.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ChatThemeSetting & E2E.Message.ChatThemeSetting.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ChatThemeSetting;
            static toObject(m: E2E.Message.ChatThemeSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatThemeSetting {
            interface $Properties {
                settingTimestampMs?: (number|Long|null);
                clearTheme?: (boolean|null);
                colorSchemeId?: (string|null);
                defaultWallpaper?: (E2E.Message.ChatDefaultWallpaper.$Properties|null);
                solidColor?: (E2E.Message.ChatSolidColorWallpaper.$Properties|null);
                stockImage?: (E2E.Message.ChatStockImageWallpaper.$Properties|null);
                customImage?: (E2E.Message.ChatCustomImageWallpaper.$Properties|null);
                animatedWallpaper?: (E2E.Message.ChatAnimatedWallpaper.$Properties|null);
                wallpaper?: ("defaultWallpaper"|"solidColor"|"stockImage"|"customImage"|"animatedWallpaper");
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              settingTimestampMs?: number|Long|null;
              clearTheme?: boolean|null;
              colorSchemeId?: string|null;
              defaultWallpaper?: E2E.Message.ChatDefaultWallpaper.$Shape|null;
              solidColor?: E2E.Message.ChatSolidColorWallpaper.$Shape|null;
              stockImage?: E2E.Message.ChatStockImageWallpaper.$Shape|null;
              customImage?: E2E.Message.ChatCustomImageWallpaper.$Shape|null;
              animatedWallpaper?: E2E.Message.ChatAnimatedWallpaper.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ wallpaper?: undefined; defaultWallpaper?: null; solidColor?: null; stockImage?: null; customImage?: null; animatedWallpaper?: null }|{ wallpaper?: "defaultWallpaper"; defaultWallpaper: E2E.Message.ChatDefaultWallpaper.$Shape; solidColor?: null; stockImage?: null; customImage?: null; animatedWallpaper?: null }|{ wallpaper?: "solidColor"; defaultWallpaper?: null; solidColor: E2E.Message.ChatSolidColorWallpaper.$Shape; stockImage?: null; customImage?: null; animatedWallpaper?: null }|{ wallpaper?: "stockImage"; defaultWallpaper?: null; solidColor?: null; stockImage: E2E.Message.ChatStockImageWallpaper.$Shape; customImage?: null; animatedWallpaper?: null }|{ wallpaper?: "customImage"; defaultWallpaper?: null; solidColor?: null; stockImage?: null; customImage: E2E.Message.ChatCustomImageWallpaper.$Shape; animatedWallpaper?: null }|{ wallpaper?: "animatedWallpaper"; defaultWallpaper?: null; solidColor?: null; stockImage?: null; customImage?: null; animatedWallpaper: E2E.Message.ChatAnimatedWallpaper.$Shape })
            );
        }

        interface ICloudAPIThreadControlNotification extends E2E.Message.CloudAPIThreadControlNotification.$Properties {
        }

        class CloudAPIThreadControlNotification {
            constructor(p?: E2E.Message.CloudAPIThreadControlNotification.$Properties);
            $unknowns?: Uint8Array[];
            status?: (E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControl|null);
            senderNotificationTimestampMs?: (number|Long|null);
            consumerLid?: (string|null);
            consumerPhoneNumber?: (string|null);
            notificationContent?: (E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Properties|null);
            shouldSuppressNotification?: (boolean|null);
            static create(properties: E2E.Message.CloudAPIThreadControlNotification.$Shape): E2E.Message.CloudAPIThreadControlNotification & E2E.Message.CloudAPIThreadControlNotification.$Shape;
            static create(properties?: E2E.Message.CloudAPIThreadControlNotification.$Properties): E2E.Message.CloudAPIThreadControlNotification;
            static encode(m: E2E.Message.CloudAPIThreadControlNotification.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.CloudAPIThreadControlNotification & E2E.Message.CloudAPIThreadControlNotification.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.CloudAPIThreadControlNotification;
            static toObject(m: E2E.Message.CloudAPIThreadControlNotification, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CloudAPIThreadControlNotification {
            interface $Properties {
                status?: (E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControl|null);
                senderNotificationTimestampMs?: (number|Long|null);
                consumerLid?: (string|null);
                consumerPhoneNumber?: (string|null);
                notificationContent?: (E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Properties|null);
                shouldSuppressNotification?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.CloudAPIThreadControlNotification.$Properties;

            enum CloudAPIThreadControl {
                UNKNOWN = 0,
                CONTROL_PASSED = 1,
                CONTROL_TAKEN = 2,
                INFO = 3
            }

            interface ICloudAPIThreadControlNotificationContent extends E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Properties {
            }

            class CloudAPIThreadControlNotificationContent {
                constructor(p?: E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Properties);
                $unknowns?: Uint8Array[];
                handoffNotificationText?: (string|null);
                extraJson?: (string|null);
                static create(properties: E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Shape): E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent & E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Shape;
                static create(properties?: E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Properties): E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent;
                static encode(m: E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent & E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent;
                static toObject(m: E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace CloudAPIThreadControlNotificationContent {
                interface $Properties {
                    handoffNotificationText?: (string|null);
                    extraJson?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.CloudAPIThreadControlNotification.CloudAPIThreadControlNotificationContent.$Properties;
            }
        }

        interface ICommentMessage extends E2E.Message.CommentMessage.$Properties {
        }

        class CommentMessage {
            constructor(p?: E2E.Message.CommentMessage.$Properties);
            $unknowns?: Uint8Array[];
            message?: (E2E.Message.$Properties|null);
            targetMessageKey?: (Protocol.MessageKey.$Properties|null);
            static create(properties: E2E.Message.CommentMessage.$Shape): E2E.Message.CommentMessage & E2E.Message.CommentMessage.$Shape;
            static create(properties?: E2E.Message.CommentMessage.$Properties): E2E.Message.CommentMessage;
            static encode(m: E2E.Message.CommentMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.CommentMessage & E2E.Message.CommentMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.CommentMessage;
            static toObject(m: E2E.Message.CommentMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CommentMessage {
            interface $Properties {
                message?: (E2E.Message.$Properties|null);
                targetMessageKey?: (Protocol.MessageKey.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              message?: E2E.Message.$Shape|null;
              targetMessageKey?: Protocol.MessageKey.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IConditionalRevealMessage extends E2E.Message.ConditionalRevealMessage.$Properties {
        }

        class ConditionalRevealMessage {
            constructor(p?: E2E.Message.ConditionalRevealMessage.$Properties);
            $unknowns?: Uint8Array[];
            encPayload?: (Uint8Array|null);
            encIv?: (Uint8Array|null);
            conditionalRevealMessageType?: (E2E.Message.ConditionalRevealMessage.ConditionalRevealMessageType|null);
            revealKeyId?: (string|null);
            static create(properties: E2E.Message.ConditionalRevealMessage.$Shape): E2E.Message.ConditionalRevealMessage & E2E.Message.ConditionalRevealMessage.$Shape;
            static create(properties?: E2E.Message.ConditionalRevealMessage.$Properties): E2E.Message.ConditionalRevealMessage;
            static encode(m: E2E.Message.ConditionalRevealMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ConditionalRevealMessage & E2E.Message.ConditionalRevealMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ConditionalRevealMessage;
            static toObject(m: E2E.Message.ConditionalRevealMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ConditionalRevealMessage {
            interface $Properties {
                encPayload?: (Uint8Array|null);
                encIv?: (Uint8Array|null);
                conditionalRevealMessageType?: (E2E.Message.ConditionalRevealMessage.ConditionalRevealMessageType|null);
                revealKeyId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ConditionalRevealMessage.$Properties;

            enum ConditionalRevealMessageType {
                UNKNOWN = 0,
                SCHEDULED_MESSAGE = 1
            }
        }

        interface IContactMessage extends E2E.Message.ContactMessage.$Properties {
        }

        class ContactMessage {
            constructor(p?: E2E.Message.ContactMessage.$Properties);
            $unknowns?: Uint8Array[];
            displayName?: (string|null);
            vcard?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            isSelfContact?: (boolean|null);
            static create(properties: E2E.Message.ContactMessage.$Shape): E2E.Message.ContactMessage & E2E.Message.ContactMessage.$Shape;
            static create(properties?: E2E.Message.ContactMessage.$Properties): E2E.Message.ContactMessage;
            static encode(m: E2E.Message.ContactMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ContactMessage & E2E.Message.ContactMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ContactMessage;
            static toObject(m: E2E.Message.ContactMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ContactMessage {
            interface $Properties {
                displayName?: (string|null);
                vcard?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                isSelfContact?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              displayName?: string|null;
              vcard?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              isSelfContact?: boolean|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IContactsArrayMessage extends E2E.Message.ContactsArrayMessage.$Properties {
        }

        class ContactsArrayMessage {
            constructor(p?: E2E.Message.ContactsArrayMessage.$Properties);
            $unknowns?: Uint8Array[];
            displayName?: (string|null);
            contacts: E2E.Message.ContactMessage.$Properties[];
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.ContactsArrayMessage.$Shape): E2E.Message.ContactsArrayMessage & E2E.Message.ContactsArrayMessage.$Shape;
            static create(properties?: E2E.Message.ContactsArrayMessage.$Properties): E2E.Message.ContactsArrayMessage;
            static encode(m: E2E.Message.ContactsArrayMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ContactsArrayMessage & E2E.Message.ContactsArrayMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ContactsArrayMessage;
            static toObject(m: E2E.Message.ContactsArrayMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ContactsArrayMessage {
            interface $Properties {
                displayName?: (string|null);
                contacts?: (E2E.Message.ContactMessage.$Properties[]|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              displayName?: string|null;
              contacts?: E2E.Message.ContactMessage.$Shape[]|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IDeclinePaymentRequestMessage extends E2E.Message.DeclinePaymentRequestMessage.$Properties {
        }

        class DeclinePaymentRequestMessage {
            constructor(p?: E2E.Message.DeclinePaymentRequestMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            static create(properties: E2E.Message.DeclinePaymentRequestMessage.$Shape): E2E.Message.DeclinePaymentRequestMessage & E2E.Message.DeclinePaymentRequestMessage.$Shape;
            static create(properties?: E2E.Message.DeclinePaymentRequestMessage.$Properties): E2E.Message.DeclinePaymentRequestMessage;
            static encode(m: E2E.Message.DeclinePaymentRequestMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.DeclinePaymentRequestMessage & E2E.Message.DeclinePaymentRequestMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.DeclinePaymentRequestMessage;
            static toObject(m: E2E.Message.DeclinePaymentRequestMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DeclinePaymentRequestMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.DeclinePaymentRequestMessage.$Properties;
        }

        interface IDeviceSentMessage extends E2E.Message.DeviceSentMessage.$Properties {
        }

        class DeviceSentMessage {
            constructor(p?: E2E.Message.DeviceSentMessage.$Properties);
            $unknowns?: Uint8Array[];
            destinationJid?: (string|null);
            message?: (E2E.Message.$Properties|null);
            phash?: (string|null);
            static create(properties: E2E.Message.DeviceSentMessage.$Shape): E2E.Message.DeviceSentMessage & E2E.Message.DeviceSentMessage.$Shape;
            static create(properties?: E2E.Message.DeviceSentMessage.$Properties): E2E.Message.DeviceSentMessage;
            static encode(m: E2E.Message.DeviceSentMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.DeviceSentMessage & E2E.Message.DeviceSentMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.DeviceSentMessage;
            static toObject(m: E2E.Message.DeviceSentMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DeviceSentMessage {
            interface $Properties {
                destinationJid?: (string|null);
                message?: (E2E.Message.$Properties|null);
                phash?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              destinationJid?: string|null;
              message?: E2E.Message.$Shape|null;
              phash?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IDocumentMessage extends E2E.Message.DocumentMessage.$Properties {
        }

        class DocumentMessage {
            constructor(p?: E2E.Message.DocumentMessage.$Properties);
            $unknowns?: Uint8Array[];
            url?: (string|null);
            mimetype?: (string|null);
            title?: (string|null);
            fileSha256?: (Uint8Array|null);
            fileLength?: (number|Long|null);
            pageCount?: (number|null);
            mediaKey?: (Uint8Array|null);
            fileName?: (string|null);
            fileEncSha256?: (Uint8Array|null);
            directPath?: (string|null);
            mediaKeyTimestamp?: (number|Long|null);
            contactVcard?: (boolean|null);
            thumbnailDirectPath?: (string|null);
            thumbnailSha256?: (Uint8Array|null);
            thumbnailEncSha256?: (Uint8Array|null);
            jpegThumbnail?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            thumbnailHeight?: (number|null);
            thumbnailWidth?: (number|null);
            caption?: (string|null);
            accessibilityLabel?: (string|null);
            static create(properties: E2E.Message.DocumentMessage.$Shape): E2E.Message.DocumentMessage & E2E.Message.DocumentMessage.$Shape;
            static create(properties?: E2E.Message.DocumentMessage.$Properties): E2E.Message.DocumentMessage;
            static encode(m: E2E.Message.DocumentMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.DocumentMessage & E2E.Message.DocumentMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.DocumentMessage;
            static toObject(m: E2E.Message.DocumentMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DocumentMessage {
            interface $Properties {
                url?: (string|null);
                mimetype?: (string|null);
                title?: (string|null);
                fileSha256?: (Uint8Array|null);
                fileLength?: (number|Long|null);
                pageCount?: (number|null);
                mediaKey?: (Uint8Array|null);
                fileName?: (string|null);
                fileEncSha256?: (Uint8Array|null);
                directPath?: (string|null);
                mediaKeyTimestamp?: (number|Long|null);
                contactVcard?: (boolean|null);
                thumbnailDirectPath?: (string|null);
                thumbnailSha256?: (Uint8Array|null);
                thumbnailEncSha256?: (Uint8Array|null);
                jpegThumbnail?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                thumbnailHeight?: (number|null);
                thumbnailWidth?: (number|null);
                caption?: (string|null);
                accessibilityLabel?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              url?: string|null;
              mimetype?: string|null;
              title?: string|null;
              fileSha256?: Uint8Array|null;
              fileLength?: number|Long|null;
              pageCount?: number|null;
              mediaKey?: Uint8Array|null;
              fileName?: string|null;
              fileEncSha256?: Uint8Array|null;
              directPath?: string|null;
              mediaKeyTimestamp?: number|Long|null;
              contactVcard?: boolean|null;
              thumbnailDirectPath?: string|null;
              thumbnailSha256?: Uint8Array|null;
              thumbnailEncSha256?: Uint8Array|null;
              jpegThumbnail?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              thumbnailHeight?: number|null;
              thumbnailWidth?: number|null;
              caption?: string|null;
              accessibilityLabel?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IEncCommentMessage extends E2E.Message.EncCommentMessage.$Properties {
        }

        class EncCommentMessage {
            constructor(p?: E2E.Message.EncCommentMessage.$Properties);
            $unknowns?: Uint8Array[];
            targetMessageKey?: (Protocol.MessageKey.$Properties|null);
            encPayload?: (Uint8Array|null);
            encIv?: (Uint8Array|null);
            static create(properties: E2E.Message.EncCommentMessage.$Shape): E2E.Message.EncCommentMessage & E2E.Message.EncCommentMessage.$Shape;
            static create(properties?: E2E.Message.EncCommentMessage.$Properties): E2E.Message.EncCommentMessage;
            static encode(m: E2E.Message.EncCommentMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.EncCommentMessage & E2E.Message.EncCommentMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.EncCommentMessage;
            static toObject(m: E2E.Message.EncCommentMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EncCommentMessage {
            interface $Properties {
                targetMessageKey?: (Protocol.MessageKey.$Properties|null);
                encPayload?: (Uint8Array|null);
                encIv?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.EncCommentMessage.$Properties;
        }

        interface IEncEventResponseMessage extends E2E.Message.EncEventResponseMessage.$Properties {
        }

        class EncEventResponseMessage {
            constructor(p?: E2E.Message.EncEventResponseMessage.$Properties);
            $unknowns?: Uint8Array[];
            eventCreationMessageKey?: (Protocol.MessageKey.$Properties|null);
            encPayload?: (Uint8Array|null);
            encIv?: (Uint8Array|null);
            static create(properties: E2E.Message.EncEventResponseMessage.$Shape): E2E.Message.EncEventResponseMessage & E2E.Message.EncEventResponseMessage.$Shape;
            static create(properties?: E2E.Message.EncEventResponseMessage.$Properties): E2E.Message.EncEventResponseMessage;
            static encode(m: E2E.Message.EncEventResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.EncEventResponseMessage & E2E.Message.EncEventResponseMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.EncEventResponseMessage;
            static toObject(m: E2E.Message.EncEventResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EncEventResponseMessage {
            interface $Properties {
                eventCreationMessageKey?: (Protocol.MessageKey.$Properties|null);
                encPayload?: (Uint8Array|null);
                encIv?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.EncEventResponseMessage.$Properties;
        }

        interface IEncReactionMessage extends E2E.Message.EncReactionMessage.$Properties {
        }

        class EncReactionMessage {
            constructor(p?: E2E.Message.EncReactionMessage.$Properties);
            $unknowns?: Uint8Array[];
            targetMessageKey?: (Protocol.MessageKey.$Properties|null);
            encPayload?: (Uint8Array|null);
            encIv?: (Uint8Array|null);
            static create(properties: E2E.Message.EncReactionMessage.$Shape): E2E.Message.EncReactionMessage & E2E.Message.EncReactionMessage.$Shape;
            static create(properties?: E2E.Message.EncReactionMessage.$Properties): E2E.Message.EncReactionMessage;
            static encode(m: E2E.Message.EncReactionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.EncReactionMessage & E2E.Message.EncReactionMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.EncReactionMessage;
            static toObject(m: E2E.Message.EncReactionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EncReactionMessage {
            interface $Properties {
                targetMessageKey?: (Protocol.MessageKey.$Properties|null);
                encPayload?: (Uint8Array|null);
                encIv?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.EncReactionMessage.$Properties;
        }

        interface IEventInviteMessage extends E2E.Message.EventInviteMessage.$Properties {
        }

        class EventInviteMessage {
            constructor(p?: E2E.Message.EventInviteMessage.$Properties);
            $unknowns?: Uint8Array[];
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            eventId?: (string|null);
            eventTitle?: (string|null);
            jpegThumbnail?: (Uint8Array|null);
            startTime?: (number|Long|null);
            caption?: (string|null);
            isCanceled?: (boolean|null);
            endTime?: (number|Long|null);
            callLink?: (string|null);
            static create(properties: E2E.Message.EventInviteMessage.$Shape): E2E.Message.EventInviteMessage & E2E.Message.EventInviteMessage.$Shape;
            static create(properties?: E2E.Message.EventInviteMessage.$Properties): E2E.Message.EventInviteMessage;
            static encode(m: E2E.Message.EventInviteMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.EventInviteMessage & E2E.Message.EventInviteMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.EventInviteMessage;
            static toObject(m: E2E.Message.EventInviteMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EventInviteMessage {
            interface $Properties {
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                eventId?: (string|null);
                eventTitle?: (string|null);
                jpegThumbnail?: (Uint8Array|null);
                startTime?: (number|Long|null);
                caption?: (string|null);
                isCanceled?: (boolean|null);
                endTime?: (number|Long|null);
                callLink?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              contextInfo?: E2E.ContextInfo.$Shape|null;
              eventId?: string|null;
              eventTitle?: string|null;
              jpegThumbnail?: Uint8Array|null;
              startTime?: number|Long|null;
              caption?: string|null;
              isCanceled?: boolean|null;
              endTime?: number|Long|null;
              callLink?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IEventMessage extends E2E.Message.EventMessage.$Properties {
        }

        class EventMessage {
            constructor(p?: E2E.Message.EventMessage.$Properties);
            $unknowns?: Uint8Array[];
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            isCanceled?: (boolean|null);
            name?: (string|null);
            description?: (string|null);
            location?: (E2E.Message.LocationMessage.$Properties|null);
            joinLink?: (string|null);
            startTime?: (number|Long|null);
            endTime?: (number|Long|null);
            extraGuestsAllowed?: (boolean|null);
            isScheduleCall?: (boolean|null);
            hasReminder?: (boolean|null);
            reminderOffsetSec?: (number|Long|null);
            static create(properties: E2E.Message.EventMessage.$Shape): E2E.Message.EventMessage & E2E.Message.EventMessage.$Shape;
            static create(properties?: E2E.Message.EventMessage.$Properties): E2E.Message.EventMessage;
            static encode(m: E2E.Message.EventMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.EventMessage & E2E.Message.EventMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.EventMessage;
            static toObject(m: E2E.Message.EventMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EventMessage {
            interface $Properties {
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                isCanceled?: (boolean|null);
                name?: (string|null);
                description?: (string|null);
                location?: (E2E.Message.LocationMessage.$Properties|null);
                joinLink?: (string|null);
                startTime?: (number|Long|null);
                endTime?: (number|Long|null);
                extraGuestsAllowed?: (boolean|null);
                isScheduleCall?: (boolean|null);
                hasReminder?: (boolean|null);
                reminderOffsetSec?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              contextInfo?: E2E.ContextInfo.$Shape|null;
              isCanceled?: boolean|null;
              name?: string|null;
              description?: string|null;
              location?: E2E.Message.LocationMessage.$Shape|null;
              joinLink?: string|null;
              startTime?: number|Long|null;
              endTime?: number|Long|null;
              extraGuestsAllowed?: boolean|null;
              isScheduleCall?: boolean|null;
              hasReminder?: boolean|null;
              reminderOffsetSec?: number|Long|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IEventResponseMessage extends E2E.Message.EventResponseMessage.$Properties {
        }

        class EventResponseMessage {
            constructor(p?: E2E.Message.EventResponseMessage.$Properties);
            $unknowns?: Uint8Array[];
            response?: (E2E.Message.EventResponseMessage.EventResponseType|null);
            timestampMs?: (number|Long|null);
            extraGuestCount?: (number|null);
            static create(properties: E2E.Message.EventResponseMessage.$Shape): E2E.Message.EventResponseMessage & E2E.Message.EventResponseMessage.$Shape;
            static create(properties?: E2E.Message.EventResponseMessage.$Properties): E2E.Message.EventResponseMessage;
            static encode(m: E2E.Message.EventResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.EventResponseMessage & E2E.Message.EventResponseMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.EventResponseMessage;
            static toObject(m: E2E.Message.EventResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace EventResponseMessage {
            interface $Properties {
                response?: (E2E.Message.EventResponseMessage.EventResponseType|null);
                timestampMs?: (number|Long|null);
                extraGuestCount?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.EventResponseMessage.$Properties;

            enum EventResponseType {
                UNKNOWN = 0,
                GOING = 1,
                NOT_GOING = 2,
                MAYBE = 3
            }
        }

        interface IExtendedTextMessage extends E2E.Message.ExtendedTextMessage.$Properties {
        }

        class ExtendedTextMessage {
            constructor(p?: E2E.Message.ExtendedTextMessage.$Properties);
            $unknowns?: Uint8Array[];
            text?: (string|null);
            matchedText?: (string|null);
            description?: (string|null);
            title?: (string|null);
            textArgb?: (number|null);
            backgroundArgb?: (number|null);
            font?: (E2E.Message.ExtendedTextMessage.FontType|null);
            previewType?: (E2E.Message.ExtendedTextMessage.PreviewType|null);
            jpegThumbnail?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            doNotPlayInline?: (boolean|null);
            thumbnailDirectPath?: (string|null);
            thumbnailSha256?: (Uint8Array|null);
            thumbnailEncSha256?: (Uint8Array|null);
            mediaKey?: (Uint8Array|null);
            mediaKeyTimestamp?: (number|Long|null);
            thumbnailHeight?: (number|null);
            thumbnailWidth?: (number|null);
            inviteLinkGroupType?: (E2E.Message.ExtendedTextMessage.InviteLinkGroupType|null);
            inviteLinkParentGroupSubjectV2?: (string|null);
            inviteLinkParentGroupThumbnailV2?: (Uint8Array|null);
            inviteLinkGroupTypeV2?: (E2E.Message.ExtendedTextMessage.InviteLinkGroupType|null);
            viewOnce?: (boolean|null);
            videoHeight?: (number|null);
            videoWidth?: (number|null);
            faviconMmsMetadata?: (E2E.Message.MMSThumbnailMetadata.$Properties|null);
            linkPreviewMetadata?: (E2E.Message.LinkPreviewMetadata.$Properties|null);
            paymentLinkMetadata?: (E2E.Message.PaymentLinkMetadata.$Properties|null);
            endCardTiles: E2E.Message.VideoEndCard.$Properties[];
            videoContentUrl?: (string|null);
            musicMetadata?: (E2E.EmbeddedMusic.$Properties|null);
            paymentExtendedMetadata?: (E2E.Message.PaymentExtendedMetadata.$Properties|null);
            static create(properties: E2E.Message.ExtendedTextMessage.$Shape): E2E.Message.ExtendedTextMessage & E2E.Message.ExtendedTextMessage.$Shape;
            static create(properties?: E2E.Message.ExtendedTextMessage.$Properties): E2E.Message.ExtendedTextMessage;
            static encode(m: E2E.Message.ExtendedTextMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ExtendedTextMessage & E2E.Message.ExtendedTextMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ExtendedTextMessage;
            static toObject(m: E2E.Message.ExtendedTextMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ExtendedTextMessage {
            interface $Properties {
                text?: (string|null);
                matchedText?: (string|null);
                description?: (string|null);
                title?: (string|null);
                textArgb?: (number|null);
                backgroundArgb?: (number|null);
                font?: (E2E.Message.ExtendedTextMessage.FontType|null);
                previewType?: (E2E.Message.ExtendedTextMessage.PreviewType|null);
                jpegThumbnail?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                doNotPlayInline?: (boolean|null);
                thumbnailDirectPath?: (string|null);
                thumbnailSha256?: (Uint8Array|null);
                thumbnailEncSha256?: (Uint8Array|null);
                mediaKey?: (Uint8Array|null);
                mediaKeyTimestamp?: (number|Long|null);
                thumbnailHeight?: (number|null);
                thumbnailWidth?: (number|null);
                inviteLinkGroupType?: (E2E.Message.ExtendedTextMessage.InviteLinkGroupType|null);
                inviteLinkParentGroupSubjectV2?: (string|null);
                inviteLinkParentGroupThumbnailV2?: (Uint8Array|null);
                inviteLinkGroupTypeV2?: (E2E.Message.ExtendedTextMessage.InviteLinkGroupType|null);
                viewOnce?: (boolean|null);
                videoHeight?: (number|null);
                videoWidth?: (number|null);
                faviconMmsMetadata?: (E2E.Message.MMSThumbnailMetadata.$Properties|null);
                linkPreviewMetadata?: (E2E.Message.LinkPreviewMetadata.$Properties|null);
                paymentLinkMetadata?: (E2E.Message.PaymentLinkMetadata.$Properties|null);
                endCardTiles?: (E2E.Message.VideoEndCard.$Properties[]|null);
                videoContentUrl?: (string|null);
                musicMetadata?: (E2E.EmbeddedMusic.$Properties|null);
                paymentExtendedMetadata?: (E2E.Message.PaymentExtendedMetadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              text?: string|null;
              matchedText?: string|null;
              description?: string|null;
              title?: string|null;
              textArgb?: number|null;
              backgroundArgb?: number|null;
              font?: E2E.Message.ExtendedTextMessage.FontType|null;
              previewType?: E2E.Message.ExtendedTextMessage.PreviewType|null;
              jpegThumbnail?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              doNotPlayInline?: boolean|null;
              thumbnailDirectPath?: string|null;
              thumbnailSha256?: Uint8Array|null;
              thumbnailEncSha256?: Uint8Array|null;
              mediaKey?: Uint8Array|null;
              mediaKeyTimestamp?: number|Long|null;
              thumbnailHeight?: number|null;
              thumbnailWidth?: number|null;
              inviteLinkGroupType?: E2E.Message.ExtendedTextMessage.InviteLinkGroupType|null;
              inviteLinkParentGroupSubjectV2?: string|null;
              inviteLinkParentGroupThumbnailV2?: Uint8Array|null;
              inviteLinkGroupTypeV2?: E2E.Message.ExtendedTextMessage.InviteLinkGroupType|null;
              viewOnce?: boolean|null;
              videoHeight?: number|null;
              videoWidth?: number|null;
              faviconMmsMetadata?: E2E.Message.MMSThumbnailMetadata.$Shape|null;
              linkPreviewMetadata?: E2E.Message.LinkPreviewMetadata.$Shape|null;
              paymentLinkMetadata?: E2E.Message.PaymentLinkMetadata.$Shape|null;
              endCardTiles?: E2E.Message.VideoEndCard.$Shape[]|null;
              videoContentUrl?: string|null;
              musicMetadata?: E2E.EmbeddedMusic.$Shape|null;
              paymentExtendedMetadata?: E2E.Message.PaymentExtendedMetadata.$Shape|null;
              $unknowns?: Uint8Array[];
            };

            enum FontType {
                SYSTEM = 0,
                SYSTEM_TEXT = 1,
                FB_SCRIPT = 2,
                SYSTEM_BOLD = 6,
                MORNINGBREEZE_REGULAR = 7,
                CALISTOGA_REGULAR = 8,
                EXO2_EXTRABOLD = 9,
                COURIERPRIME_BOLD = 10
            }

            enum InviteLinkGroupType {
                DEFAULT = 0,
                PARENT = 1,
                SUB = 2,
                DEFAULT_SUB = 3
            }

            enum PreviewType {
                NONE = 0,
                VIDEO = 1,
                PLACEHOLDER = 4,
                IMAGE = 5,
                PAYMENT_LINKS = 6,
                PROFILE = 7
            }
        }

        interface IFullHistorySyncOnDemandConfig extends E2E.Message.FullHistorySyncOnDemandConfig.$Properties {
        }

        class FullHistorySyncOnDemandConfig {
            constructor(p?: E2E.Message.FullHistorySyncOnDemandConfig.$Properties);
            $unknowns?: Uint8Array[];
            historyFromTimestamp?: (number|Long|null);
            historyDurationDays?: (number|null);
            static create(properties: E2E.Message.FullHistorySyncOnDemandConfig.$Shape): E2E.Message.FullHistorySyncOnDemandConfig & E2E.Message.FullHistorySyncOnDemandConfig.$Shape;
            static create(properties?: E2E.Message.FullHistorySyncOnDemandConfig.$Properties): E2E.Message.FullHistorySyncOnDemandConfig;
            static encode(m: E2E.Message.FullHistorySyncOnDemandConfig.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.FullHistorySyncOnDemandConfig & E2E.Message.FullHistorySyncOnDemandConfig.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.FullHistorySyncOnDemandConfig;
            static toObject(m: E2E.Message.FullHistorySyncOnDemandConfig, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FullHistorySyncOnDemandConfig {
            interface $Properties {
                historyFromTimestamp?: (number|Long|null);
                historyDurationDays?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.FullHistorySyncOnDemandConfig.$Properties;
        }

        interface IFullHistorySyncOnDemandRequestMetadata extends E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties {
        }

        class FullHistorySyncOnDemandRequestMetadata {
            constructor(p?: E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties);
            $unknowns?: Uint8Array[];
            requestId?: (string|null);
            businessProduct?: (string|null);
            opaqueClientData?: (Uint8Array|null);
            static create(properties: E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Shape): E2E.Message.FullHistorySyncOnDemandRequestMetadata & E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Shape;
            static create(properties?: E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties): E2E.Message.FullHistorySyncOnDemandRequestMetadata;
            static encode(m: E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.FullHistorySyncOnDemandRequestMetadata & E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.FullHistorySyncOnDemandRequestMetadata;
            static toObject(m: E2E.Message.FullHistorySyncOnDemandRequestMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FullHistorySyncOnDemandRequestMetadata {
            interface $Properties {
                requestId?: (string|null);
                businessProduct?: (string|null);
                opaqueClientData?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties;
        }

        interface IFutureProofMessage extends E2E.Message.FutureProofMessage.$Properties {
        }

        class FutureProofMessage {
            constructor(p?: E2E.Message.FutureProofMessage.$Properties);
            $unknowns?: Uint8Array[];
            message?: (E2E.Message.$Properties|null);
            static create(properties: E2E.Message.FutureProofMessage.$Shape): E2E.Message.FutureProofMessage & E2E.Message.FutureProofMessage.$Shape;
            static create(properties?: E2E.Message.FutureProofMessage.$Properties): E2E.Message.FutureProofMessage;
            static encode(m: E2E.Message.FutureProofMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.FutureProofMessage & E2E.Message.FutureProofMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.FutureProofMessage;
            static toObject(m: E2E.Message.FutureProofMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FutureProofMessage {
            interface $Properties {
                message?: (E2E.Message.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              message?: E2E.Message.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IGroupInviteMessage extends E2E.Message.GroupInviteMessage.$Properties {
        }

        class GroupInviteMessage {
            constructor(p?: E2E.Message.GroupInviteMessage.$Properties);
            $unknowns?: Uint8Array[];
            groupJid?: (string|null);
            inviteCode?: (string|null);
            inviteExpiration?: (number|Long|null);
            groupName?: (string|null);
            jpegThumbnail?: (Uint8Array|null);
            caption?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            groupType?: (E2E.Message.GroupInviteMessage.GroupType|null);
            static create(properties: E2E.Message.GroupInviteMessage.$Shape): E2E.Message.GroupInviteMessage & E2E.Message.GroupInviteMessage.$Shape;
            static create(properties?: E2E.Message.GroupInviteMessage.$Properties): E2E.Message.GroupInviteMessage;
            static encode(m: E2E.Message.GroupInviteMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.GroupInviteMessage & E2E.Message.GroupInviteMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.GroupInviteMessage;
            static toObject(m: E2E.Message.GroupInviteMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace GroupInviteMessage {
            interface $Properties {
                groupJid?: (string|null);
                inviteCode?: (string|null);
                inviteExpiration?: (number|Long|null);
                groupName?: (string|null);
                jpegThumbnail?: (Uint8Array|null);
                caption?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                groupType?: (E2E.Message.GroupInviteMessage.GroupType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              groupJid?: string|null;
              inviteCode?: string|null;
              inviteExpiration?: number|Long|null;
              groupName?: string|null;
              jpegThumbnail?: Uint8Array|null;
              caption?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              groupType?: E2E.Message.GroupInviteMessage.GroupType|null;
              $unknowns?: Uint8Array[];
            };

            enum GroupType {
                DEFAULT = 0,
                PARENT = 1
            }
        }

        interface IHighlyStructuredMessage extends E2E.Message.HighlyStructuredMessage.$Properties {
        }

        class HighlyStructuredMessage {
            constructor(p?: E2E.Message.HighlyStructuredMessage.$Properties);
            $unknowns?: Uint8Array[];
            namespace?: (string|null);
            elementName?: (string|null);
            params: string[];
            fallbackLg?: (string|null);
            fallbackLc?: (string|null);
            localizableParams: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Properties[];
            deterministicLg?: (string|null);
            deterministicLc?: (string|null);
            hydratedHsm?: (E2E.Message.TemplateMessage.$Properties|null);
            static create(properties: E2E.Message.HighlyStructuredMessage.$Shape): E2E.Message.HighlyStructuredMessage & E2E.Message.HighlyStructuredMessage.$Shape;
            static create(properties?: E2E.Message.HighlyStructuredMessage.$Properties): E2E.Message.HighlyStructuredMessage;
            static encode(m: E2E.Message.HighlyStructuredMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HighlyStructuredMessage & E2E.Message.HighlyStructuredMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.HighlyStructuredMessage;
            static toObject(m: E2E.Message.HighlyStructuredMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HighlyStructuredMessage {
            interface $Properties {
                namespace?: (string|null);
                elementName?: (string|null);
                params?: (string[]|null);
                fallbackLg?: (string|null);
                fallbackLc?: (string|null);
                localizableParams?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Properties[]|null);
                deterministicLg?: (string|null);
                deterministicLc?: (string|null);
                hydratedHsm?: (E2E.Message.TemplateMessage.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              namespace?: string|null;
              elementName?: string|null;
              params?: string[]|null;
              fallbackLg?: string|null;
              fallbackLc?: string|null;
              localizableParams?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Shape[]|null;
              deterministicLg?: string|null;
              deterministicLc?: string|null;
              hydratedHsm?: E2E.Message.TemplateMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            };

            interface IHSMLocalizableParameter extends E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Properties {
            }

            class HSMLocalizableParameter {
                constructor(p?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Properties);
                $unknowns?: Uint8Array[];
                default?: (string|null);
                currency?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Properties|null);
                dateTime?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Properties|null);
                paramOneof?: ("currency"|"dateTime");
                static create(properties: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Shape): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Shape;
                static create(properties?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Properties): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter;
                static encode(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter;
                static toObject(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace HSMLocalizableParameter {
                interface $Properties {
                    "default"?: (string|null);
                    currency?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Properties|null);
                    dateTime?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Properties|null);
                    paramOneof?: ("currency"|"dateTime");
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  "default"?: string|null;
                  currency?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Shape|null;
                  dateTime?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Shape|null;
                  $unknowns?: Uint8Array[];
                } & (
                  ({ paramOneof?: undefined; currency?: null; dateTime?: null }|{ paramOneof?: "currency"; currency: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Shape; dateTime?: null }|{ paramOneof?: "dateTime"; currency?: null; dateTime: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Shape })
                );

                interface IHSMCurrency extends E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Properties {
                }

                class HSMCurrency {
                    constructor(p?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Properties);
                    $unknowns?: Uint8Array[];
                    currencyCode?: (string|null);
                    amount1000?: (number|Long|null);
                    static create(properties: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Shape): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Shape;
                    static create(properties?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Properties): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency;
                    static encode(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency;
                    static toObject(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace HSMCurrency {
                    interface $Properties {
                        currencyCode?: (string|null);
                        amount1000?: (number|Long|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMCurrency.$Properties;
                }

                interface IHSMDateTime extends E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Properties {
                }

                class HSMDateTime {
                    constructor(p?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Properties);
                    $unknowns?: Uint8Array[];
                    component?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Properties|null);
                    unixEpoch?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Properties|null);
                    datetimeOneof?: ("component"|"unixEpoch");
                    static create(properties: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Shape): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Shape;
                    static create(properties?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Properties): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime;
                    static encode(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime;
                    static toObject(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace HSMDateTime {
                    interface $Properties {
                        component?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Properties|null);
                        unixEpoch?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Properties|null);
                        datetimeOneof?: ("component"|"unixEpoch");
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = {
                      component?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Shape|null;
                      unixEpoch?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Shape|null;
                      $unknowns?: Uint8Array[];
                    } & (
                      ({ datetimeOneof?: undefined; component?: null; unixEpoch?: null }|{ datetimeOneof?: "component"; component: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Shape; unixEpoch?: null }|{ datetimeOneof?: "unixEpoch"; component?: null; unixEpoch: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Shape })
                    );

                    interface IHSMDateTimeComponent extends E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Properties {
                    }

                    class HSMDateTimeComponent {
                        constructor(p?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Properties);
                        $unknowns?: Uint8Array[];
                        dayOfWeek?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.DayOfWeekType|null);
                        year?: (number|null);
                        month?: (number|null);
                        dayOfMonth?: (number|null);
                        hour?: (number|null);
                        minute?: (number|null);
                        calendar?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.CalendarType|null);
                        static create(properties: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Shape): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Shape;
                        static create(properties?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Properties): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent;
                        static encode(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Shape;
                        static fromObject(d: { [k: string]: any }): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent;
                        static toObject(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent, o?: $protobuf.IConversionOptions): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                        static getTypeUrl(prefix?: string): string;
                    }

                    namespace HSMDateTimeComponent {
                        interface $Properties {
                            dayOfWeek?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.DayOfWeekType|null);
                            year?: (number|null);
                            month?: (number|null);
                            dayOfMonth?: (number|null);
                            hour?: (number|null);
                            minute?: (number|null);
                            calendar?: (E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.CalendarType|null);
                            $unknowns?: Uint8Array[];
                        }
                        type $Shape = E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeComponent.$Properties;

                        enum CalendarType {
                            GREGORIAN = 1,
                            SOLAR_HIJRI = 2
                        }

                        enum DayOfWeekType {
                            MONDAY = 1,
                            TUESDAY = 2,
                            WEDNESDAY = 3,
                            THURSDAY = 4,
                            FRIDAY = 5,
                            SATURDAY = 6,
                            SUNDAY = 7
                        }
                    }

                    interface IHSMDateTimeUnixEpoch extends E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Properties {
                    }

                    class HSMDateTimeUnixEpoch {
                        constructor(p?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Properties);
                        $unknowns?: Uint8Array[];
                        timestamp?: (number|Long|null);
                        static create(properties: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Shape): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Shape;
                        static create(properties?: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Properties): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch;
                        static encode(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch & E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Shape;
                        static fromObject(d: { [k: string]: any }): E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch;
                        static toObject(m: E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch, o?: $protobuf.IConversionOptions): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                        static getTypeUrl(prefix?: string): string;
                    }

                    namespace HSMDateTimeUnixEpoch {
                        interface $Properties {
                            timestamp?: (number|Long|null);
                            $unknowns?: Uint8Array[];
                        }
                        type $Shape = E2E.Message.HighlyStructuredMessage.HSMLocalizableParameter.HSMDateTime.HSMDateTimeUnixEpoch.$Properties;
                    }
                }
            }
        }

        interface IHistoryShareMessageEntry extends E2E.Message.HistoryShareMessageEntry.$Properties {
        }

        class HistoryShareMessageEntry {
            constructor(p?: E2E.Message.HistoryShareMessageEntry.$Properties);
            $unknowns?: Uint8Array[];
            stanzaId?: (string|null);
            messageSecretProof?: (Uint8Array|null);
            static create(properties: E2E.Message.HistoryShareMessageEntry.$Shape): E2E.Message.HistoryShareMessageEntry & E2E.Message.HistoryShareMessageEntry.$Shape;
            static create(properties?: E2E.Message.HistoryShareMessageEntry.$Properties): E2E.Message.HistoryShareMessageEntry;
            static encode(m: E2E.Message.HistoryShareMessageEntry.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HistoryShareMessageEntry & E2E.Message.HistoryShareMessageEntry.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.HistoryShareMessageEntry;
            static toObject(m: E2E.Message.HistoryShareMessageEntry, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HistoryShareMessageEntry {
            interface $Properties {
                stanzaId?: (string|null);
                messageSecretProof?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.HistoryShareMessageEntry.$Properties;
        }

        interface IHistorySyncMessageAccessStatus extends E2E.Message.HistorySyncMessageAccessStatus.$Properties {
        }

        class HistorySyncMessageAccessStatus {
            constructor(p?: E2E.Message.HistorySyncMessageAccessStatus.$Properties);
            $unknowns?: Uint8Array[];
            completeAccessGranted?: (boolean|null);
            static create(properties: E2E.Message.HistorySyncMessageAccessStatus.$Shape): E2E.Message.HistorySyncMessageAccessStatus & E2E.Message.HistorySyncMessageAccessStatus.$Shape;
            static create(properties?: E2E.Message.HistorySyncMessageAccessStatus.$Properties): E2E.Message.HistorySyncMessageAccessStatus;
            static encode(m: E2E.Message.HistorySyncMessageAccessStatus.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HistorySyncMessageAccessStatus & E2E.Message.HistorySyncMessageAccessStatus.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.HistorySyncMessageAccessStatus;
            static toObject(m: E2E.Message.HistorySyncMessageAccessStatus, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HistorySyncMessageAccessStatus {
            interface $Properties {
                completeAccessGranted?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.HistorySyncMessageAccessStatus.$Properties;
        }

        interface IHistorySyncNotification extends E2E.Message.HistorySyncNotification.$Properties {
        }

        class HistorySyncNotification {
            constructor(p?: E2E.Message.HistorySyncNotification.$Properties);
            $unknowns?: Uint8Array[];
            fileSha256?: (Uint8Array|null);
            fileLength?: (number|Long|null);
            mediaKey?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            directPath?: (string|null);
            syncType?: (E2E.Message.HistorySyncType|null);
            chunkOrder?: (number|null);
            originalMessageId?: (string|null);
            progress?: (number|null);
            oldestMsgInChunkTimestampSec?: (number|Long|null);
            initialHistBootstrapInlinePayload?: (Uint8Array|null);
            peerDataRequestSessionId?: (string|null);
            fullHistorySyncOnDemandRequestMetadata?: (E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties|null);
            encHandle?: (string|null);
            messageAccessStatus?: (E2E.Message.HistorySyncMessageAccessStatus.$Properties|null);
            static create(properties: E2E.Message.HistorySyncNotification.$Shape): E2E.Message.HistorySyncNotification & E2E.Message.HistorySyncNotification.$Shape;
            static create(properties?: E2E.Message.HistorySyncNotification.$Properties): E2E.Message.HistorySyncNotification;
            static encode(m: E2E.Message.HistorySyncNotification.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.HistorySyncNotification & E2E.Message.HistorySyncNotification.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.HistorySyncNotification;
            static toObject(m: E2E.Message.HistorySyncNotification, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HistorySyncNotification {
            interface $Properties {
                fileSha256?: (Uint8Array|null);
                fileLength?: (number|Long|null);
                mediaKey?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                directPath?: (string|null);
                syncType?: (E2E.Message.HistorySyncType|null);
                chunkOrder?: (number|null);
                originalMessageId?: (string|null);
                progress?: (number|null);
                oldestMsgInChunkTimestampSec?: (number|Long|null);
                initialHistBootstrapInlinePayload?: (Uint8Array|null);
                peerDataRequestSessionId?: (string|null);
                fullHistorySyncOnDemandRequestMetadata?: (E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties|null);
                encHandle?: (string|null);
                messageAccessStatus?: (E2E.Message.HistorySyncMessageAccessStatus.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.HistorySyncNotification.$Properties;
        }

        enum HistorySyncType {
            INITIAL_BOOTSTRAP = 0,
            INITIAL_STATUS_V3 = 1,
            FULL = 2,
            RECENT = 3,
            PUSH_NAME = 4,
            NON_BLOCKING_DATA = 5,
            ON_DEMAND = 6,
            NO_HISTORY = 7,
            MESSAGE_ACCESS_STATUS = 8
        }

        interface IImageMessage extends E2E.Message.ImageMessage.$Properties {
        }

        class ImageMessage {
            constructor(p?: E2E.Message.ImageMessage.$Properties);
            $unknowns?: Uint8Array[];
            url?: (string|null);
            mimetype?: (string|null);
            caption?: (string|null);
            fileSha256?: (Uint8Array|null);
            fileLength?: (number|Long|null);
            height?: (number|null);
            width?: (number|null);
            mediaKey?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            interactiveAnnotations: E2E.InteractiveAnnotation.$Properties[];
            directPath?: (string|null);
            mediaKeyTimestamp?: (number|Long|null);
            jpegThumbnail?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            firstScanSidecar?: (Uint8Array|null);
            firstScanLength?: (number|null);
            experimentGroupId?: (number|null);
            scansSidecar?: (Uint8Array|null);
            scanLengths: number[];
            midQualityFileSha256?: (Uint8Array|null);
            midQualityFileEncSha256?: (Uint8Array|null);
            viewOnce?: (boolean|null);
            thumbnailDirectPath?: (string|null);
            thumbnailSha256?: (Uint8Array|null);
            thumbnailEncSha256?: (Uint8Array|null);
            staticUrl?: (string|null);
            annotations: E2E.InteractiveAnnotation.$Properties[];
            imageSourceType?: (E2E.Message.ImageMessage.ImageSourceType|null);
            accessibilityLabel?: (string|null);
            qrUrl?: (string|null);
            static create(properties: E2E.Message.ImageMessage.$Shape): E2E.Message.ImageMessage & E2E.Message.ImageMessage.$Shape;
            static create(properties?: E2E.Message.ImageMessage.$Properties): E2E.Message.ImageMessage;
            static encode(m: E2E.Message.ImageMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ImageMessage & E2E.Message.ImageMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ImageMessage;
            static toObject(m: E2E.Message.ImageMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ImageMessage {
            interface $Properties {
                url?: (string|null);
                mimetype?: (string|null);
                caption?: (string|null);
                fileSha256?: (Uint8Array|null);
                fileLength?: (number|Long|null);
                height?: (number|null);
                width?: (number|null);
                mediaKey?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                interactiveAnnotations?: (E2E.InteractiveAnnotation.$Properties[]|null);
                directPath?: (string|null);
                mediaKeyTimestamp?: (number|Long|null);
                jpegThumbnail?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                firstScanSidecar?: (Uint8Array|null);
                firstScanLength?: (number|null);
                experimentGroupId?: (number|null);
                scansSidecar?: (Uint8Array|null);
                scanLengths?: (number[]|null);
                midQualityFileSha256?: (Uint8Array|null);
                midQualityFileEncSha256?: (Uint8Array|null);
                viewOnce?: (boolean|null);
                thumbnailDirectPath?: (string|null);
                thumbnailSha256?: (Uint8Array|null);
                thumbnailEncSha256?: (Uint8Array|null);
                staticUrl?: (string|null);
                annotations?: (E2E.InteractiveAnnotation.$Properties[]|null);
                imageSourceType?: (E2E.Message.ImageMessage.ImageSourceType|null);
                accessibilityLabel?: (string|null);
                qrUrl?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              url?: string|null;
              mimetype?: string|null;
              caption?: string|null;
              fileSha256?: Uint8Array|null;
              fileLength?: number|Long|null;
              height?: number|null;
              width?: number|null;
              mediaKey?: Uint8Array|null;
              fileEncSha256?: Uint8Array|null;
              interactiveAnnotations?: E2E.InteractiveAnnotation.$Shape[]|null;
              directPath?: string|null;
              mediaKeyTimestamp?: number|Long|null;
              jpegThumbnail?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              firstScanSidecar?: Uint8Array|null;
              firstScanLength?: number|null;
              experimentGroupId?: number|null;
              scansSidecar?: Uint8Array|null;
              scanLengths?: number[]|null;
              midQualityFileSha256?: Uint8Array|null;
              midQualityFileEncSha256?: Uint8Array|null;
              viewOnce?: boolean|null;
              thumbnailDirectPath?: string|null;
              thumbnailSha256?: Uint8Array|null;
              thumbnailEncSha256?: Uint8Array|null;
              staticUrl?: string|null;
              annotations?: E2E.InteractiveAnnotation.$Shape[]|null;
              imageSourceType?: E2E.Message.ImageMessage.ImageSourceType|null;
              accessibilityLabel?: string|null;
              qrUrl?: string|null;
              $unknowns?: Uint8Array[];
            };

            enum ImageSourceType {
                USER_IMAGE = 0,
                AI_GENERATED = 1,
                AI_MODIFIED = 2,
                RASTERIZED_TEXT_STATUS = 3
            }
        }

        interface IInitialSecurityNotificationSettingSync extends E2E.Message.InitialSecurityNotificationSettingSync.$Properties {
        }

        class InitialSecurityNotificationSettingSync {
            constructor(p?: E2E.Message.InitialSecurityNotificationSettingSync.$Properties);
            $unknowns?: Uint8Array[];
            securityNotificationEnabled?: (boolean|null);
            static create(properties: E2E.Message.InitialSecurityNotificationSettingSync.$Shape): E2E.Message.InitialSecurityNotificationSettingSync & E2E.Message.InitialSecurityNotificationSettingSync.$Shape;
            static create(properties?: E2E.Message.InitialSecurityNotificationSettingSync.$Properties): E2E.Message.InitialSecurityNotificationSettingSync;
            static encode(m: E2E.Message.InitialSecurityNotificationSettingSync.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InitialSecurityNotificationSettingSync & E2E.Message.InitialSecurityNotificationSettingSync.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.InitialSecurityNotificationSettingSync;
            static toObject(m: E2E.Message.InitialSecurityNotificationSettingSync, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InitialSecurityNotificationSettingSync {
            interface $Properties {
                securityNotificationEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.InitialSecurityNotificationSettingSync.$Properties;
        }

        enum InsightDeliveryState {
            SENT = 0,
            DELIVERED = 1,
            READ = 2,
            REPLIED = 3,
            QUICK_REPLIED = 4
        }

        interface IInteractiveMessage extends E2E.Message.InteractiveMessage.$Properties {
        }

        class InteractiveMessage {
            constructor(p?: E2E.Message.InteractiveMessage.$Properties);
            $unknowns?: Uint8Array[];
            header?: (E2E.Message.InteractiveMessage.Header.$Properties|null);
            body?: (E2E.Message.InteractiveMessage.Body.$Properties|null);
            footer?: (E2E.Message.InteractiveMessage.Footer.$Properties|null);
            bloksWidget?: (E2E.Message.InteractiveMessage.BloksWidget.$Properties|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            urlTrackingMap?: (E2E.UrlTrackingMap.$Properties|null);
            shopStorefrontMessage?: (E2E.Message.InteractiveMessage.ShopMessage.$Properties|null);
            collectionMessage?: (E2E.Message.InteractiveMessage.CollectionMessage.$Properties|null);
            nativeFlowMessage?: (E2E.Message.InteractiveMessage.NativeFlowMessage.$Properties|null);
            carouselMessage?: (E2E.Message.InteractiveMessage.CarouselMessage.$Properties|null);
            interactiveMessage?: ("shopStorefrontMessage"|"collectionMessage"|"nativeFlowMessage"|"carouselMessage");
            static create(properties: E2E.Message.InteractiveMessage.$Shape): E2E.Message.InteractiveMessage & E2E.Message.InteractiveMessage.$Shape;
            static create(properties?: E2E.Message.InteractiveMessage.$Properties): E2E.Message.InteractiveMessage;
            static encode(m: E2E.Message.InteractiveMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage & E2E.Message.InteractiveMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage;
            static toObject(m: E2E.Message.InteractiveMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InteractiveMessage {
            interface $Properties {
                header?: (E2E.Message.InteractiveMessage.Header.$Properties|null);
                body?: (E2E.Message.InteractiveMessage.Body.$Properties|null);
                footer?: (E2E.Message.InteractiveMessage.Footer.$Properties|null);
                bloksWidget?: (E2E.Message.InteractiveMessage.BloksWidget.$Properties|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                urlTrackingMap?: (E2E.UrlTrackingMap.$Properties|null);
                shopStorefrontMessage?: (E2E.Message.InteractiveMessage.ShopMessage.$Properties|null);
                collectionMessage?: (E2E.Message.InteractiveMessage.CollectionMessage.$Properties|null);
                nativeFlowMessage?: (E2E.Message.InteractiveMessage.NativeFlowMessage.$Properties|null);
                carouselMessage?: (E2E.Message.InteractiveMessage.CarouselMessage.$Properties|null);
                interactiveMessage?: ("shopStorefrontMessage"|"collectionMessage"|"nativeFlowMessage"|"carouselMessage");
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              header?: E2E.Message.InteractiveMessage.Header.$Shape|null;
              body?: E2E.Message.InteractiveMessage.Body.$Shape|null;
              footer?: E2E.Message.InteractiveMessage.Footer.$Shape|null;
              bloksWidget?: E2E.Message.InteractiveMessage.BloksWidget.$Shape|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              urlTrackingMap?: E2E.UrlTrackingMap.$Shape|null;
              shopStorefrontMessage?: E2E.Message.InteractiveMessage.ShopMessage.$Shape|null;
              collectionMessage?: E2E.Message.InteractiveMessage.CollectionMessage.$Shape|null;
              nativeFlowMessage?: E2E.Message.InteractiveMessage.NativeFlowMessage.$Shape|null;
              carouselMessage?: E2E.Message.InteractiveMessage.CarouselMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ interactiveMessage?: undefined; shopStorefrontMessage?: null; collectionMessage?: null; nativeFlowMessage?: null; carouselMessage?: null }|{ interactiveMessage?: "shopStorefrontMessage"; shopStorefrontMessage: E2E.Message.InteractiveMessage.ShopMessage.$Shape; collectionMessage?: null; nativeFlowMessage?: null; carouselMessage?: null }|{ interactiveMessage?: "collectionMessage"; shopStorefrontMessage?: null; collectionMessage: E2E.Message.InteractiveMessage.CollectionMessage.$Shape; nativeFlowMessage?: null; carouselMessage?: null }|{ interactiveMessage?: "nativeFlowMessage"; shopStorefrontMessage?: null; collectionMessage?: null; nativeFlowMessage: E2E.Message.InteractiveMessage.NativeFlowMessage.$Shape; carouselMessage?: null }|{ interactiveMessage?: "carouselMessage"; shopStorefrontMessage?: null; collectionMessage?: null; nativeFlowMessage?: null; carouselMessage: E2E.Message.InteractiveMessage.CarouselMessage.$Shape })
            );

            interface IBloksWidget extends E2E.Message.InteractiveMessage.BloksWidget.$Properties {
            }

            class BloksWidget {
                constructor(p?: E2E.Message.InteractiveMessage.BloksWidget.$Properties);
                $unknowns?: Uint8Array[];
                uuid?: (string|null);
                data?: (string|null);
                type?: (string|null);
                fallback?: (string|null);
                static create(properties: E2E.Message.InteractiveMessage.BloksWidget.$Shape): E2E.Message.InteractiveMessage.BloksWidget & E2E.Message.InteractiveMessage.BloksWidget.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.BloksWidget.$Properties): E2E.Message.InteractiveMessage.BloksWidget;
                static encode(m: E2E.Message.InteractiveMessage.BloksWidget.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.BloksWidget & E2E.Message.InteractiveMessage.BloksWidget.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.BloksWidget;
                static toObject(m: E2E.Message.InteractiveMessage.BloksWidget, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BloksWidget {
                interface $Properties {
                    uuid?: (string|null);
                    data?: (string|null);
                    type?: (string|null);
                    fallback?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.InteractiveMessage.BloksWidget.$Properties;
            }

            interface IBody extends E2E.Message.InteractiveMessage.Body.$Properties {
            }

            class Body {
                constructor(p?: E2E.Message.InteractiveMessage.Body.$Properties);
                $unknowns?: Uint8Array[];
                text?: (string|null);
                static create(properties: E2E.Message.InteractiveMessage.Body.$Shape): E2E.Message.InteractiveMessage.Body & E2E.Message.InteractiveMessage.Body.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.Body.$Properties): E2E.Message.InteractiveMessage.Body;
                static encode(m: E2E.Message.InteractiveMessage.Body.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.Body & E2E.Message.InteractiveMessage.Body.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.Body;
                static toObject(m: E2E.Message.InteractiveMessage.Body, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Body {
                interface $Properties {
                    text?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.InteractiveMessage.Body.$Properties;
            }

            interface ICarouselMessage extends E2E.Message.InteractiveMessage.CarouselMessage.$Properties {
            }

            class CarouselMessage {
                constructor(p?: E2E.Message.InteractiveMessage.CarouselMessage.$Properties);
                $unknowns?: Uint8Array[];
                cards: E2E.Message.InteractiveMessage.$Properties[];
                messageVersion?: (number|null);
                carouselCardType?: (E2E.Message.InteractiveMessage.CarouselMessage.CarouselCardType|null);
                static create(properties: E2E.Message.InteractiveMessage.CarouselMessage.$Shape): E2E.Message.InteractiveMessage.CarouselMessage & E2E.Message.InteractiveMessage.CarouselMessage.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.CarouselMessage.$Properties): E2E.Message.InteractiveMessage.CarouselMessage;
                static encode(m: E2E.Message.InteractiveMessage.CarouselMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.CarouselMessage & E2E.Message.InteractiveMessage.CarouselMessage.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.CarouselMessage;
                static toObject(m: E2E.Message.InteractiveMessage.CarouselMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace CarouselMessage {
                interface $Properties {
                    cards?: (E2E.Message.InteractiveMessage.$Properties[]|null);
                    messageVersion?: (number|null);
                    carouselCardType?: (E2E.Message.InteractiveMessage.CarouselMessage.CarouselCardType|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  cards?: E2E.Message.InteractiveMessage.$Shape[]|null;
                  messageVersion?: number|null;
                  carouselCardType?: E2E.Message.InteractiveMessage.CarouselMessage.CarouselCardType|null;
                  $unknowns?: Uint8Array[];
                };

                enum CarouselCardType {
                    UNKNOWN = 0,
                    HSCROLL_CARDS = 1,
                    ALBUM_IMAGE = 2
                }
            }

            interface ICollectionMessage extends E2E.Message.InteractiveMessage.CollectionMessage.$Properties {
            }

            class CollectionMessage {
                constructor(p?: E2E.Message.InteractiveMessage.CollectionMessage.$Properties);
                $unknowns?: Uint8Array[];
                bizJid?: (string|null);
                id?: (string|null);
                messageVersion?: (number|null);
                static create(properties: E2E.Message.InteractiveMessage.CollectionMessage.$Shape): E2E.Message.InteractiveMessage.CollectionMessage & E2E.Message.InteractiveMessage.CollectionMessage.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.CollectionMessage.$Properties): E2E.Message.InteractiveMessage.CollectionMessage;
                static encode(m: E2E.Message.InteractiveMessage.CollectionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.CollectionMessage & E2E.Message.InteractiveMessage.CollectionMessage.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.CollectionMessage;
                static toObject(m: E2E.Message.InteractiveMessage.CollectionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace CollectionMessage {
                interface $Properties {
                    bizJid?: (string|null);
                    id?: (string|null);
                    messageVersion?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.InteractiveMessage.CollectionMessage.$Properties;
            }

            interface IFooter extends E2E.Message.InteractiveMessage.Footer.$Properties {
            }

            class Footer {
                constructor(p?: E2E.Message.InteractiveMessage.Footer.$Properties);
                $unknowns?: Uint8Array[];
                text?: (string|null);
                hasMediaAttachment?: (boolean|null);
                audioMessage?: (E2E.Message.AudioMessage.$Properties|null);
                media?: "audioMessage";
                static create(properties: E2E.Message.InteractiveMessage.Footer.$Shape): E2E.Message.InteractiveMessage.Footer & E2E.Message.InteractiveMessage.Footer.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.Footer.$Properties): E2E.Message.InteractiveMessage.Footer;
                static encode(m: E2E.Message.InteractiveMessage.Footer.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.Footer & E2E.Message.InteractiveMessage.Footer.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.Footer;
                static toObject(m: E2E.Message.InteractiveMessage.Footer, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Footer {
                interface $Properties {
                    text?: (string|null);
                    hasMediaAttachment?: (boolean|null);
                    audioMessage?: (E2E.Message.AudioMessage.$Properties|null);
                    media?: "audioMessage";
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  text?: string|null;
                  hasMediaAttachment?: boolean|null;
                  audioMessage?: E2E.Message.AudioMessage.$Shape|null;
                  $unknowns?: Uint8Array[];
                } & (
                  ({ media?: undefined; audioMessage?: null }|{ media?: "audioMessage"; audioMessage: E2E.Message.AudioMessage.$Shape })
                );
            }

            interface IHeader extends E2E.Message.InteractiveMessage.Header.$Properties {
            }

            class Header {
                constructor(p?: E2E.Message.InteractiveMessage.Header.$Properties);
                $unknowns?: Uint8Array[];
                title?: (string|null);
                subtitle?: (string|null);
                hasMediaAttachment?: (boolean|null);
                bloksWidget?: (E2E.Message.InteractiveMessage.BloksWidget.$Properties|null);
                documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
                imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
                jpegThumbnail?: (Uint8Array|null);
                videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
                locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
                productMessage?: (E2E.Message.ProductMessage.$Properties|null);
                media?: ("documentMessage"|"imageMessage"|"jpegThumbnail"|"videoMessage"|"locationMessage"|"productMessage");
                static create(properties: E2E.Message.InteractiveMessage.Header.$Shape): E2E.Message.InteractiveMessage.Header & E2E.Message.InteractiveMessage.Header.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.Header.$Properties): E2E.Message.InteractiveMessage.Header;
                static encode(m: E2E.Message.InteractiveMessage.Header.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.Header & E2E.Message.InteractiveMessage.Header.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.Header;
                static toObject(m: E2E.Message.InteractiveMessage.Header, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Header {
                interface $Properties {
                    title?: (string|null);
                    subtitle?: (string|null);
                    hasMediaAttachment?: (boolean|null);
                    bloksWidget?: (E2E.Message.InteractiveMessage.BloksWidget.$Properties|null);
                    documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
                    imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
                    jpegThumbnail?: (Uint8Array|null);
                    videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
                    locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
                    productMessage?: (E2E.Message.ProductMessage.$Properties|null);
                    media?: ("documentMessage"|"imageMessage"|"jpegThumbnail"|"videoMessage"|"locationMessage"|"productMessage");
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  title?: string|null;
                  subtitle?: string|null;
                  hasMediaAttachment?: boolean|null;
                  bloksWidget?: E2E.Message.InteractiveMessage.BloksWidget.$Shape|null;
                  documentMessage?: E2E.Message.DocumentMessage.$Shape|null;
                  imageMessage?: E2E.Message.ImageMessage.$Shape|null;
                  jpegThumbnail?: Uint8Array|null;
                  videoMessage?: E2E.Message.VideoMessage.$Shape|null;
                  locationMessage?: E2E.Message.LocationMessage.$Shape|null;
                  productMessage?: E2E.Message.ProductMessage.$Shape|null;
                  $unknowns?: Uint8Array[];
                } & (
                  ({ media?: undefined; documentMessage?: null; imageMessage?: null; jpegThumbnail?: null; videoMessage?: null; locationMessage?: null; productMessage?: null }|{ media?: "documentMessage"; documentMessage: E2E.Message.DocumentMessage.$Shape; imageMessage?: null; jpegThumbnail?: null; videoMessage?: null; locationMessage?: null; productMessage?: null }|{ media?: "imageMessage"; documentMessage?: null; imageMessage: E2E.Message.ImageMessage.$Shape; jpegThumbnail?: null; videoMessage?: null; locationMessage?: null; productMessage?: null }|{ media?: "jpegThumbnail"; documentMessage?: null; imageMessage?: null; jpegThumbnail: Uint8Array; videoMessage?: null; locationMessage?: null; productMessage?: null }|{ media?: "videoMessage"; documentMessage?: null; imageMessage?: null; jpegThumbnail?: null; videoMessage: E2E.Message.VideoMessage.$Shape; locationMessage?: null; productMessage?: null }|{ media?: "locationMessage"; documentMessage?: null; imageMessage?: null; jpegThumbnail?: null; videoMessage?: null; locationMessage: E2E.Message.LocationMessage.$Shape; productMessage?: null }|{ media?: "productMessage"; documentMessage?: null; imageMessage?: null; jpegThumbnail?: null; videoMessage?: null; locationMessage?: null; productMessage: E2E.Message.ProductMessage.$Shape })
                );
            }

            interface INativeFlowMessage extends E2E.Message.InteractiveMessage.NativeFlowMessage.$Properties {
            }

            class NativeFlowMessage {
                constructor(p?: E2E.Message.InteractiveMessage.NativeFlowMessage.$Properties);
                $unknowns?: Uint8Array[];
                buttons: E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Properties[];
                messageParamsJson?: (string|null);
                messageVersion?: (number|null);
                static create(properties: E2E.Message.InteractiveMessage.NativeFlowMessage.$Shape): E2E.Message.InteractiveMessage.NativeFlowMessage & E2E.Message.InteractiveMessage.NativeFlowMessage.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.NativeFlowMessage.$Properties): E2E.Message.InteractiveMessage.NativeFlowMessage;
                static encode(m: E2E.Message.InteractiveMessage.NativeFlowMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.NativeFlowMessage & E2E.Message.InteractiveMessage.NativeFlowMessage.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.NativeFlowMessage;
                static toObject(m: E2E.Message.InteractiveMessage.NativeFlowMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace NativeFlowMessage {
                interface $Properties {
                    buttons?: (E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Properties[]|null);
                    messageParamsJson?: (string|null);
                    messageVersion?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.InteractiveMessage.NativeFlowMessage.$Properties;

                interface INativeFlowButton extends E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Properties {
                }

                class NativeFlowButton {
                    constructor(p?: E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Properties);
                    $unknowns?: Uint8Array[];
                    name?: (string|null);
                    buttonParamsJson?: (string|null);
                    static create(properties: E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Shape): E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton & E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Shape;
                    static create(properties?: E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Properties): E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton;
                    static encode(m: E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton & E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton;
                    static toObject(m: E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace NativeFlowButton {
                    interface $Properties {
                        name?: (string|null);
                        buttonParamsJson?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.InteractiveMessage.NativeFlowMessage.NativeFlowButton.$Properties;
                }
            }

            interface IShopMessage extends E2E.Message.InteractiveMessage.ShopMessage.$Properties {
            }

            class ShopMessage {
                constructor(p?: E2E.Message.InteractiveMessage.ShopMessage.$Properties);
                $unknowns?: Uint8Array[];
                id?: (string|null);
                surface?: (E2E.Message.InteractiveMessage.ShopMessage.Surface|null);
                messageVersion?: (number|null);
                static create(properties: E2E.Message.InteractiveMessage.ShopMessage.$Shape): E2E.Message.InteractiveMessage.ShopMessage & E2E.Message.InteractiveMessage.ShopMessage.$Shape;
                static create(properties?: E2E.Message.InteractiveMessage.ShopMessage.$Properties): E2E.Message.InteractiveMessage.ShopMessage;
                static encode(m: E2E.Message.InteractiveMessage.ShopMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveMessage.ShopMessage & E2E.Message.InteractiveMessage.ShopMessage.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveMessage.ShopMessage;
                static toObject(m: E2E.Message.InteractiveMessage.ShopMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace ShopMessage {
                interface $Properties {
                    id?: (string|null);
                    surface?: (E2E.Message.InteractiveMessage.ShopMessage.Surface|null);
                    messageVersion?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.InteractiveMessage.ShopMessage.$Properties;

                enum Surface {
                    UNKNOWN_SURFACE = 0,
                    FB = 1,
                    IG = 2,
                    WA = 3
                }
            }
        }

        interface IInteractiveResponseMessage extends E2E.Message.InteractiveResponseMessage.$Properties {
        }

        class InteractiveResponseMessage {
            constructor(p?: E2E.Message.InteractiveResponseMessage.$Properties);
            $unknowns?: Uint8Array[];
            body?: (E2E.Message.InteractiveResponseMessage.Body.$Properties|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            nativeFlowResponseMessage?: (E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Properties|null);
            interactiveResponseMessage?: "nativeFlowResponseMessage";
            static create(properties: E2E.Message.InteractiveResponseMessage.$Shape): E2E.Message.InteractiveResponseMessage & E2E.Message.InteractiveResponseMessage.$Shape;
            static create(properties?: E2E.Message.InteractiveResponseMessage.$Properties): E2E.Message.InteractiveResponseMessage;
            static encode(m: E2E.Message.InteractiveResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveResponseMessage & E2E.Message.InteractiveResponseMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveResponseMessage;
            static toObject(m: E2E.Message.InteractiveResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InteractiveResponseMessage {
            interface $Properties {
                body?: (E2E.Message.InteractiveResponseMessage.Body.$Properties|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                nativeFlowResponseMessage?: (E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Properties|null);
                interactiveResponseMessage?: "nativeFlowResponseMessage";
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              body?: E2E.Message.InteractiveResponseMessage.Body.$Shape|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              nativeFlowResponseMessage?: E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ interactiveResponseMessage?: undefined; nativeFlowResponseMessage?: null }|{ interactiveResponseMessage?: "nativeFlowResponseMessage"; nativeFlowResponseMessage: E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Shape })
            );

            interface IBody extends E2E.Message.InteractiveResponseMessage.Body.$Properties {
            }

            class Body {
                constructor(p?: E2E.Message.InteractiveResponseMessage.Body.$Properties);
                $unknowns?: Uint8Array[];
                text?: (string|null);
                format?: (E2E.Message.InteractiveResponseMessage.Body.Format|null);
                static create(properties: E2E.Message.InteractiveResponseMessage.Body.$Shape): E2E.Message.InteractiveResponseMessage.Body & E2E.Message.InteractiveResponseMessage.Body.$Shape;
                static create(properties?: E2E.Message.InteractiveResponseMessage.Body.$Properties): E2E.Message.InteractiveResponseMessage.Body;
                static encode(m: E2E.Message.InteractiveResponseMessage.Body.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveResponseMessage.Body & E2E.Message.InteractiveResponseMessage.Body.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveResponseMessage.Body;
                static toObject(m: E2E.Message.InteractiveResponseMessage.Body, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Body {
                interface $Properties {
                    text?: (string|null);
                    format?: (E2E.Message.InteractiveResponseMessage.Body.Format|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.InteractiveResponseMessage.Body.$Properties;

                enum Format {
                    DEFAULT = 0,
                    EXTENSIONS_1 = 1
                }
            }

            interface INativeFlowResponseMessage extends E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Properties {
            }

            class NativeFlowResponseMessage {
                constructor(p?: E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Properties);
                $unknowns?: Uint8Array[];
                name?: (string|null);
                paramsJson?: (string|null);
                version?: (number|null);
                static create(properties: E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Shape): E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage & E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Shape;
                static create(properties?: E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Properties): E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage;
                static encode(m: E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage & E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage;
                static toObject(m: E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace NativeFlowResponseMessage {
                interface $Properties {
                    name?: (string|null);
                    paramsJson?: (string|null);
                    version?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.InteractiveResponseMessage.NativeFlowResponseMessage.$Properties;
            }
        }

        interface IInvoiceMessage extends E2E.Message.InvoiceMessage.$Properties {
        }

        class InvoiceMessage {
            constructor(p?: E2E.Message.InvoiceMessage.$Properties);
            $unknowns?: Uint8Array[];
            note?: (string|null);
            token?: (string|null);
            attachmentType?: (E2E.Message.InvoiceMessage.AttachmentType|null);
            attachmentMimetype?: (string|null);
            attachmentMediaKey?: (Uint8Array|null);
            attachmentMediaKeyTimestamp?: (number|Long|null);
            attachmentFileSha256?: (Uint8Array|null);
            attachmentFileEncSha256?: (Uint8Array|null);
            attachmentDirectPath?: (string|null);
            attachmentJpegThumbnail?: (Uint8Array|null);
            static create(properties: E2E.Message.InvoiceMessage.$Shape): E2E.Message.InvoiceMessage & E2E.Message.InvoiceMessage.$Shape;
            static create(properties?: E2E.Message.InvoiceMessage.$Properties): E2E.Message.InvoiceMessage;
            static encode(m: E2E.Message.InvoiceMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.InvoiceMessage & E2E.Message.InvoiceMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.InvoiceMessage;
            static toObject(m: E2E.Message.InvoiceMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InvoiceMessage {
            interface $Properties {
                note?: (string|null);
                token?: (string|null);
                attachmentType?: (E2E.Message.InvoiceMessage.AttachmentType|null);
                attachmentMimetype?: (string|null);
                attachmentMediaKey?: (Uint8Array|null);
                attachmentMediaKeyTimestamp?: (number|Long|null);
                attachmentFileSha256?: (Uint8Array|null);
                attachmentFileEncSha256?: (Uint8Array|null);
                attachmentDirectPath?: (string|null);
                attachmentJpegThumbnail?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.InvoiceMessage.$Properties;

            enum AttachmentType {
                IMAGE = 0,
                PDF = 1
            }
        }

        interface IKeepInChatMessage extends E2E.Message.KeepInChatMessage.$Properties {
        }

        class KeepInChatMessage {
            constructor(p?: E2E.Message.KeepInChatMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            keepType?: (E2E.KeepType|null);
            timestampMs?: (number|Long|null);
            static create(properties: E2E.Message.KeepInChatMessage.$Shape): E2E.Message.KeepInChatMessage & E2E.Message.KeepInChatMessage.$Shape;
            static create(properties?: E2E.Message.KeepInChatMessage.$Properties): E2E.Message.KeepInChatMessage;
            static encode(m: E2E.Message.KeepInChatMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.KeepInChatMessage & E2E.Message.KeepInChatMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.KeepInChatMessage;
            static toObject(m: E2E.Message.KeepInChatMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace KeepInChatMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                keepType?: (E2E.KeepType|null);
                timestampMs?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.KeepInChatMessage.$Properties;
        }

        interface ILinkPreviewMetadata extends E2E.Message.LinkPreviewMetadata.$Properties {
        }

        class LinkPreviewMetadata {
            constructor(p?: E2E.Message.LinkPreviewMetadata.$Properties);
            $unknowns?: Uint8Array[];
            paymentLinkMetadata?: (E2E.Message.PaymentLinkMetadata.$Properties|null);
            urlMetadata?: (E2E.Message.URLMetadata.$Properties|null);
            fbExperimentId?: (number|null);
            linkMediaDuration?: (number|null);
            socialMediaPostType?: (E2E.Message.LinkPreviewMetadata.SocialMediaPostType|null);
            linkInlineVideoMuted?: (boolean|null);
            videoContentUrl?: (string|null);
            musicMetadata?: (E2E.EmbeddedMusic.$Properties|null);
            videoContentCaption?: (string|null);
            static create(properties: E2E.Message.LinkPreviewMetadata.$Shape): E2E.Message.LinkPreviewMetadata & E2E.Message.LinkPreviewMetadata.$Shape;
            static create(properties?: E2E.Message.LinkPreviewMetadata.$Properties): E2E.Message.LinkPreviewMetadata;
            static encode(m: E2E.Message.LinkPreviewMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.LinkPreviewMetadata & E2E.Message.LinkPreviewMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.LinkPreviewMetadata;
            static toObject(m: E2E.Message.LinkPreviewMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LinkPreviewMetadata {
            interface $Properties {
                paymentLinkMetadata?: (E2E.Message.PaymentLinkMetadata.$Properties|null);
                urlMetadata?: (E2E.Message.URLMetadata.$Properties|null);
                fbExperimentId?: (number|null);
                linkMediaDuration?: (number|null);
                socialMediaPostType?: (E2E.Message.LinkPreviewMetadata.SocialMediaPostType|null);
                linkInlineVideoMuted?: (boolean|null);
                videoContentUrl?: (string|null);
                musicMetadata?: (E2E.EmbeddedMusic.$Properties|null);
                videoContentCaption?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.LinkPreviewMetadata.$Properties;

            enum SocialMediaPostType {
                NONE = 0,
                REEL = 1,
                LIVE_VIDEO = 2,
                LONG_VIDEO = 3,
                SINGLE_IMAGE = 4,
                CAROUSEL = 5
            }
        }

        interface IListMessage extends E2E.Message.ListMessage.$Properties {
        }

        class ListMessage {
            constructor(p?: E2E.Message.ListMessage.$Properties);
            $unknowns?: Uint8Array[];
            title?: (string|null);
            description?: (string|null);
            buttonText?: (string|null);
            listType?: (E2E.Message.ListMessage.ListType|null);
            sections: E2E.Message.ListMessage.Section.$Properties[];
            productListInfo?: (E2E.Message.ListMessage.ProductListInfo.$Properties|null);
            footerText?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.ListMessage.$Shape): E2E.Message.ListMessage & E2E.Message.ListMessage.$Shape;
            static create(properties?: E2E.Message.ListMessage.$Properties): E2E.Message.ListMessage;
            static encode(m: E2E.Message.ListMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListMessage & E2E.Message.ListMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ListMessage;
            static toObject(m: E2E.Message.ListMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ListMessage {
            interface $Properties {
                title?: (string|null);
                description?: (string|null);
                buttonText?: (string|null);
                listType?: (E2E.Message.ListMessage.ListType|null);
                sections?: (E2E.Message.ListMessage.Section.$Properties[]|null);
                productListInfo?: (E2E.Message.ListMessage.ProductListInfo.$Properties|null);
                footerText?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              title?: string|null;
              description?: string|null;
              buttonText?: string|null;
              listType?: E2E.Message.ListMessage.ListType|null;
              sections?: E2E.Message.ListMessage.Section.$Shape[]|null;
              productListInfo?: E2E.Message.ListMessage.ProductListInfo.$Shape|null;
              footerText?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };

            enum ListType {
                UNKNOWN = 0,
                SINGLE_SELECT = 1,
                PRODUCT_LIST = 2
            }

            interface IProduct extends E2E.Message.ListMessage.Product.$Properties {
            }

            class Product {
                constructor(p?: E2E.Message.ListMessage.Product.$Properties);
                $unknowns?: Uint8Array[];
                productId?: (string|null);
                static create(properties: E2E.Message.ListMessage.Product.$Shape): E2E.Message.ListMessage.Product & E2E.Message.ListMessage.Product.$Shape;
                static create(properties?: E2E.Message.ListMessage.Product.$Properties): E2E.Message.ListMessage.Product;
                static encode(m: E2E.Message.ListMessage.Product.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListMessage.Product & E2E.Message.ListMessage.Product.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ListMessage.Product;
                static toObject(m: E2E.Message.ListMessage.Product, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Product {
                interface $Properties {
                    productId?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ListMessage.Product.$Properties;
            }

            interface IProductListHeaderImage extends E2E.Message.ListMessage.ProductListHeaderImage.$Properties {
            }

            class ProductListHeaderImage {
                constructor(p?: E2E.Message.ListMessage.ProductListHeaderImage.$Properties);
                $unknowns?: Uint8Array[];
                productId?: (string|null);
                jpegThumbnail?: (Uint8Array|null);
                static create(properties: E2E.Message.ListMessage.ProductListHeaderImage.$Shape): E2E.Message.ListMessage.ProductListHeaderImage & E2E.Message.ListMessage.ProductListHeaderImage.$Shape;
                static create(properties?: E2E.Message.ListMessage.ProductListHeaderImage.$Properties): E2E.Message.ListMessage.ProductListHeaderImage;
                static encode(m: E2E.Message.ListMessage.ProductListHeaderImage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListMessage.ProductListHeaderImage & E2E.Message.ListMessage.ProductListHeaderImage.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ListMessage.ProductListHeaderImage;
                static toObject(m: E2E.Message.ListMessage.ProductListHeaderImage, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace ProductListHeaderImage {
                interface $Properties {
                    productId?: (string|null);
                    jpegThumbnail?: (Uint8Array|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ListMessage.ProductListHeaderImage.$Properties;
            }

            interface IProductListInfo extends E2E.Message.ListMessage.ProductListInfo.$Properties {
            }

            class ProductListInfo {
                constructor(p?: E2E.Message.ListMessage.ProductListInfo.$Properties);
                $unknowns?: Uint8Array[];
                productSections: E2E.Message.ListMessage.ProductSection.$Properties[];
                headerImage?: (E2E.Message.ListMessage.ProductListHeaderImage.$Properties|null);
                businessOwnerJid?: (string|null);
                static create(properties: E2E.Message.ListMessage.ProductListInfo.$Shape): E2E.Message.ListMessage.ProductListInfo & E2E.Message.ListMessage.ProductListInfo.$Shape;
                static create(properties?: E2E.Message.ListMessage.ProductListInfo.$Properties): E2E.Message.ListMessage.ProductListInfo;
                static encode(m: E2E.Message.ListMessage.ProductListInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListMessage.ProductListInfo & E2E.Message.ListMessage.ProductListInfo.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ListMessage.ProductListInfo;
                static toObject(m: E2E.Message.ListMessage.ProductListInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace ProductListInfo {
                interface $Properties {
                    productSections?: (E2E.Message.ListMessage.ProductSection.$Properties[]|null);
                    headerImage?: (E2E.Message.ListMessage.ProductListHeaderImage.$Properties|null);
                    businessOwnerJid?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ListMessage.ProductListInfo.$Properties;
            }

            interface IProductSection extends E2E.Message.ListMessage.ProductSection.$Properties {
            }

            class ProductSection {
                constructor(p?: E2E.Message.ListMessage.ProductSection.$Properties);
                $unknowns?: Uint8Array[];
                title?: (string|null);
                products: E2E.Message.ListMessage.Product.$Properties[];
                static create(properties: E2E.Message.ListMessage.ProductSection.$Shape): E2E.Message.ListMessage.ProductSection & E2E.Message.ListMessage.ProductSection.$Shape;
                static create(properties?: E2E.Message.ListMessage.ProductSection.$Properties): E2E.Message.ListMessage.ProductSection;
                static encode(m: E2E.Message.ListMessage.ProductSection.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListMessage.ProductSection & E2E.Message.ListMessage.ProductSection.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ListMessage.ProductSection;
                static toObject(m: E2E.Message.ListMessage.ProductSection, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace ProductSection {
                interface $Properties {
                    title?: (string|null);
                    products?: (E2E.Message.ListMessage.Product.$Properties[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ListMessage.ProductSection.$Properties;
            }

            interface IRow extends E2E.Message.ListMessage.Row.$Properties {
            }

            class Row {
                constructor(p?: E2E.Message.ListMessage.Row.$Properties);
                $unknowns?: Uint8Array[];
                title?: (string|null);
                description?: (string|null);
                rowId?: (string|null);
                static create(properties: E2E.Message.ListMessage.Row.$Shape): E2E.Message.ListMessage.Row & E2E.Message.ListMessage.Row.$Shape;
                static create(properties?: E2E.Message.ListMessage.Row.$Properties): E2E.Message.ListMessage.Row;
                static encode(m: E2E.Message.ListMessage.Row.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListMessage.Row & E2E.Message.ListMessage.Row.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ListMessage.Row;
                static toObject(m: E2E.Message.ListMessage.Row, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Row {
                interface $Properties {
                    title?: (string|null);
                    description?: (string|null);
                    rowId?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ListMessage.Row.$Properties;
            }

            interface ISection extends E2E.Message.ListMessage.Section.$Properties {
            }

            class Section {
                constructor(p?: E2E.Message.ListMessage.Section.$Properties);
                $unknowns?: Uint8Array[];
                title?: (string|null);
                rows: E2E.Message.ListMessage.Row.$Properties[];
                static create(properties: E2E.Message.ListMessage.Section.$Shape): E2E.Message.ListMessage.Section & E2E.Message.ListMessage.Section.$Shape;
                static create(properties?: E2E.Message.ListMessage.Section.$Properties): E2E.Message.ListMessage.Section;
                static encode(m: E2E.Message.ListMessage.Section.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListMessage.Section & E2E.Message.ListMessage.Section.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ListMessage.Section;
                static toObject(m: E2E.Message.ListMessage.Section, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Section {
                interface $Properties {
                    title?: (string|null);
                    rows?: (E2E.Message.ListMessage.Row.$Properties[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ListMessage.Section.$Properties;
            }
        }

        interface IListResponseMessage extends E2E.Message.ListResponseMessage.$Properties {
        }

        class ListResponseMessage {
            constructor(p?: E2E.Message.ListResponseMessage.$Properties);
            $unknowns?: Uint8Array[];
            title?: (string|null);
            listType?: (E2E.Message.ListResponseMessage.ListType|null);
            singleSelectReply?: (E2E.Message.ListResponseMessage.SingleSelectReply.$Properties|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            description?: (string|null);
            static create(properties: E2E.Message.ListResponseMessage.$Shape): E2E.Message.ListResponseMessage & E2E.Message.ListResponseMessage.$Shape;
            static create(properties?: E2E.Message.ListResponseMessage.$Properties): E2E.Message.ListResponseMessage;
            static encode(m: E2E.Message.ListResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListResponseMessage & E2E.Message.ListResponseMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ListResponseMessage;
            static toObject(m: E2E.Message.ListResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ListResponseMessage {
            interface $Properties {
                title?: (string|null);
                listType?: (E2E.Message.ListResponseMessage.ListType|null);
                singleSelectReply?: (E2E.Message.ListResponseMessage.SingleSelectReply.$Properties|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                description?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              title?: string|null;
              listType?: E2E.Message.ListResponseMessage.ListType|null;
              singleSelectReply?: E2E.Message.ListResponseMessage.SingleSelectReply.$Shape|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              description?: string|null;
              $unknowns?: Uint8Array[];
            };

            enum ListType {
                UNKNOWN = 0,
                SINGLE_SELECT = 1
            }

            interface ISingleSelectReply extends E2E.Message.ListResponseMessage.SingleSelectReply.$Properties {
            }

            class SingleSelectReply {
                constructor(p?: E2E.Message.ListResponseMessage.SingleSelectReply.$Properties);
                $unknowns?: Uint8Array[];
                selectedRowId?: (string|null);
                static create(properties: E2E.Message.ListResponseMessage.SingleSelectReply.$Shape): E2E.Message.ListResponseMessage.SingleSelectReply & E2E.Message.ListResponseMessage.SingleSelectReply.$Shape;
                static create(properties?: E2E.Message.ListResponseMessage.SingleSelectReply.$Properties): E2E.Message.ListResponseMessage.SingleSelectReply;
                static encode(m: E2E.Message.ListResponseMessage.SingleSelectReply.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ListResponseMessage.SingleSelectReply & E2E.Message.ListResponseMessage.SingleSelectReply.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ListResponseMessage.SingleSelectReply;
                static toObject(m: E2E.Message.ListResponseMessage.SingleSelectReply, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace SingleSelectReply {
                interface $Properties {
                    selectedRowId?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.ListResponseMessage.SingleSelectReply.$Properties;
            }
        }

        interface ILiveLocationMessage extends E2E.Message.LiveLocationMessage.$Properties {
        }

        class LiveLocationMessage {
            constructor(p?: E2E.Message.LiveLocationMessage.$Properties);
            $unknowns?: Uint8Array[];
            degreesLatitude?: (number|null);
            degreesLongitude?: (number|null);
            accuracyInMeters?: (number|null);
            speedInMps?: (number|null);
            degreesClockwiseFromMagneticNorth?: (number|null);
            caption?: (string|null);
            sequenceNumber?: (number|Long|null);
            timeOffset?: (number|null);
            jpegThumbnail?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.LiveLocationMessage.$Shape): E2E.Message.LiveLocationMessage & E2E.Message.LiveLocationMessage.$Shape;
            static create(properties?: E2E.Message.LiveLocationMessage.$Properties): E2E.Message.LiveLocationMessage;
            static encode(m: E2E.Message.LiveLocationMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.LiveLocationMessage & E2E.Message.LiveLocationMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.LiveLocationMessage;
            static toObject(m: E2E.Message.LiveLocationMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LiveLocationMessage {
            interface $Properties {
                degreesLatitude?: (number|null);
                degreesLongitude?: (number|null);
                accuracyInMeters?: (number|null);
                speedInMps?: (number|null);
                degreesClockwiseFromMagneticNorth?: (number|null);
                caption?: (string|null);
                sequenceNumber?: (number|Long|null);
                timeOffset?: (number|null);
                jpegThumbnail?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              degreesLatitude?: number|null;
              degreesLongitude?: number|null;
              accuracyInMeters?: number|null;
              speedInMps?: number|null;
              degreesClockwiseFromMagneticNorth?: number|null;
              caption?: string|null;
              sequenceNumber?: number|Long|null;
              timeOffset?: number|null;
              jpegThumbnail?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface ILocationMessage extends E2E.Message.LocationMessage.$Properties {
        }

        class LocationMessage {
            constructor(p?: E2E.Message.LocationMessage.$Properties);
            $unknowns?: Uint8Array[];
            degreesLatitude?: (number|null);
            degreesLongitude?: (number|null);
            name?: (string|null);
            address?: (string|null);
            url?: (string|null);
            isLive?: (boolean|null);
            accuracyInMeters?: (number|null);
            speedInMps?: (number|null);
            degreesClockwiseFromMagneticNorth?: (number|null);
            comment?: (string|null);
            jpegThumbnail?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.LocationMessage.$Shape): E2E.Message.LocationMessage & E2E.Message.LocationMessage.$Shape;
            static create(properties?: E2E.Message.LocationMessage.$Properties): E2E.Message.LocationMessage;
            static encode(m: E2E.Message.LocationMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.LocationMessage & E2E.Message.LocationMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.LocationMessage;
            static toObject(m: E2E.Message.LocationMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LocationMessage {
            interface $Properties {
                degreesLatitude?: (number|null);
                degreesLongitude?: (number|null);
                name?: (string|null);
                address?: (string|null);
                url?: (string|null);
                isLive?: (boolean|null);
                accuracyInMeters?: (number|null);
                speedInMps?: (number|null);
                degreesClockwiseFromMagneticNorth?: (number|null);
                comment?: (string|null);
                jpegThumbnail?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              degreesLatitude?: number|null;
              degreesLongitude?: number|null;
              name?: string|null;
              address?: string|null;
              url?: string|null;
              isLive?: boolean|null;
              accuracyInMeters?: number|null;
              speedInMps?: number|null;
              degreesClockwiseFromMagneticNorth?: number|null;
              comment?: string|null;
              jpegThumbnail?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IMMSThumbnailMetadata extends E2E.Message.MMSThumbnailMetadata.$Properties {
        }

        class MMSThumbnailMetadata {
            constructor(p?: E2E.Message.MMSThumbnailMetadata.$Properties);
            $unknowns?: Uint8Array[];
            thumbnailDirectPath?: (string|null);
            thumbnailSha256?: (Uint8Array|null);
            thumbnailEncSha256?: (Uint8Array|null);
            mediaKey?: (Uint8Array|null);
            mediaKeyTimestamp?: (number|Long|null);
            thumbnailHeight?: (number|null);
            thumbnailWidth?: (number|null);
            static create(properties: E2E.Message.MMSThumbnailMetadata.$Shape): E2E.Message.MMSThumbnailMetadata & E2E.Message.MMSThumbnailMetadata.$Shape;
            static create(properties?: E2E.Message.MMSThumbnailMetadata.$Properties): E2E.Message.MMSThumbnailMetadata;
            static encode(m: E2E.Message.MMSThumbnailMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.MMSThumbnailMetadata & E2E.Message.MMSThumbnailMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.MMSThumbnailMetadata;
            static toObject(m: E2E.Message.MMSThumbnailMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MMSThumbnailMetadata {
            interface $Properties {
                thumbnailDirectPath?: (string|null);
                thumbnailSha256?: (Uint8Array|null);
                thumbnailEncSha256?: (Uint8Array|null);
                mediaKey?: (Uint8Array|null);
                mediaKeyTimestamp?: (number|Long|null);
                thumbnailHeight?: (number|null);
                thumbnailWidth?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.MMSThumbnailMetadata.$Properties;
        }

        interface IMarkAsVerifiedAction extends E2E.Message.MarkAsVerifiedAction.$Properties {
        }

        class MarkAsVerifiedAction {
            constructor(p?: E2E.Message.MarkAsVerifiedAction.$Properties);
            $unknowns?: Uint8Array[];
            userJidString?: (string|null);
            verified?: (boolean|null);
            verifiedIdentityKey?: (Uint8Array|null);
            actionSeq?: (number|Long|null);
            static create(properties: E2E.Message.MarkAsVerifiedAction.$Shape): E2E.Message.MarkAsVerifiedAction & E2E.Message.MarkAsVerifiedAction.$Shape;
            static create(properties?: E2E.Message.MarkAsVerifiedAction.$Properties): E2E.Message.MarkAsVerifiedAction;
            static encode(m: E2E.Message.MarkAsVerifiedAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.MarkAsVerifiedAction & E2E.Message.MarkAsVerifiedAction.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.MarkAsVerifiedAction;
            static toObject(m: E2E.Message.MarkAsVerifiedAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MarkAsVerifiedAction {
            interface $Properties {
                userJidString?: (string|null);
                verified?: (boolean|null);
                verifiedIdentityKey?: (Uint8Array|null);
                actionSeq?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.MarkAsVerifiedAction.$Properties;
        }

        interface IMessageHistoryBundle extends E2E.Message.MessageHistoryBundle.$Properties {
        }

        class MessageHistoryBundle {
            constructor(p?: E2E.Message.MessageHistoryBundle.$Properties);
            $unknowns?: Uint8Array[];
            mimetype?: (string|null);
            fileSha256?: (Uint8Array|null);
            mediaKey?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            directPath?: (string|null);
            mediaKeyTimestamp?: (number|Long|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            messageHistoryMetadata?: (E2E.Message.MessageHistoryMetadata.$Properties|null);
            static create(properties: E2E.Message.MessageHistoryBundle.$Shape): E2E.Message.MessageHistoryBundle & E2E.Message.MessageHistoryBundle.$Shape;
            static create(properties?: E2E.Message.MessageHistoryBundle.$Properties): E2E.Message.MessageHistoryBundle;
            static encode(m: E2E.Message.MessageHistoryBundle.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.MessageHistoryBundle & E2E.Message.MessageHistoryBundle.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.MessageHistoryBundle;
            static toObject(m: E2E.Message.MessageHistoryBundle, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MessageHistoryBundle {
            interface $Properties {
                mimetype?: (string|null);
                fileSha256?: (Uint8Array|null);
                mediaKey?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                directPath?: (string|null);
                mediaKeyTimestamp?: (number|Long|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                messageHistoryMetadata?: (E2E.Message.MessageHistoryMetadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              mimetype?: string|null;
              fileSha256?: Uint8Array|null;
              mediaKey?: Uint8Array|null;
              fileEncSha256?: Uint8Array|null;
              directPath?: string|null;
              mediaKeyTimestamp?: number|Long|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              messageHistoryMetadata?: E2E.Message.MessageHistoryMetadata.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IMessageHistoryMetadata extends E2E.Message.MessageHistoryMetadata.$Properties {
        }

        class MessageHistoryMetadata {
            constructor(p?: E2E.Message.MessageHistoryMetadata.$Properties);
            $unknowns?: Uint8Array[];
            historyReceivers: string[];
            oldestMessageTimestampInWindow?: (number|Long|null);
            messageCount?: (number|Long|null);
            nonHistoryReceivers: string[];
            oldestMessageTimestampInBundle?: (number|Long|null);
            static create(properties: E2E.Message.MessageHistoryMetadata.$Shape): E2E.Message.MessageHistoryMetadata & E2E.Message.MessageHistoryMetadata.$Shape;
            static create(properties?: E2E.Message.MessageHistoryMetadata.$Properties): E2E.Message.MessageHistoryMetadata;
            static encode(m: E2E.Message.MessageHistoryMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.MessageHistoryMetadata & E2E.Message.MessageHistoryMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.MessageHistoryMetadata;
            static toObject(m: E2E.Message.MessageHistoryMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MessageHistoryMetadata {
            interface $Properties {
                historyReceivers?: (string[]|null);
                oldestMessageTimestampInWindow?: (number|Long|null);
                messageCount?: (number|Long|null);
                nonHistoryReceivers?: (string[]|null);
                oldestMessageTimestampInBundle?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.MessageHistoryMetadata.$Properties;
        }

        interface IMessageHistoryNotice extends E2E.Message.MessageHistoryNotice.$Properties {
        }

        class MessageHistoryNotice {
            constructor(p?: E2E.Message.MessageHistoryNotice.$Properties);
            $unknowns?: Uint8Array[];
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            messageHistoryMetadata?: (E2E.Message.MessageHistoryMetadata.$Properties|null);
            botHistoryShareSyncMetadata?: (E2E.Message.BotHistoryShareSyncMetadata.$Properties|null);
            static create(properties: E2E.Message.MessageHistoryNotice.$Shape): E2E.Message.MessageHistoryNotice & E2E.Message.MessageHistoryNotice.$Shape;
            static create(properties?: E2E.Message.MessageHistoryNotice.$Properties): E2E.Message.MessageHistoryNotice;
            static encode(m: E2E.Message.MessageHistoryNotice.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.MessageHistoryNotice & E2E.Message.MessageHistoryNotice.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.MessageHistoryNotice;
            static toObject(m: E2E.Message.MessageHistoryNotice, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MessageHistoryNotice {
            interface $Properties {
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                messageHistoryMetadata?: (E2E.Message.MessageHistoryMetadata.$Properties|null);
                botHistoryShareSyncMetadata?: (E2E.Message.BotHistoryShareSyncMetadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              contextInfo?: E2E.ContextInfo.$Shape|null;
              messageHistoryMetadata?: E2E.Message.MessageHistoryMetadata.$Shape|null;
              botHistoryShareSyncMetadata?: E2E.Message.BotHistoryShareSyncMetadata.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IMusicMessage extends E2E.Message.MusicMessage.$Properties {
        }

        class MusicMessage {
            constructor(p?: E2E.Message.MusicMessage.$Properties);
            $unknowns?: Uint8Array[];
            embeddedMusic?: (E2E.EmbeddedMusic.$Properties|null);
            songUri?: (string|null);
            artworkUri?: (string|null);
            style?: (number|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.MusicMessage.$Shape): E2E.Message.MusicMessage & E2E.Message.MusicMessage.$Shape;
            static create(properties?: E2E.Message.MusicMessage.$Properties): E2E.Message.MusicMessage;
            static encode(m: E2E.Message.MusicMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.MusicMessage & E2E.Message.MusicMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.MusicMessage;
            static toObject(m: E2E.Message.MusicMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MusicMessage {
            interface $Properties {
                embeddedMusic?: (E2E.EmbeddedMusic.$Properties|null);
                songUri?: (string|null);
                artworkUri?: (string|null);
                style?: (number|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              embeddedMusic?: E2E.EmbeddedMusic.$Shape|null;
              songUri?: string|null;
              artworkUri?: string|null;
              style?: number|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };

            enum MusicMessageStyle {
                UNKNOWN = 0,
                VINYL = 1
            }
        }

        interface INewsletterAdminInviteMessage extends E2E.Message.NewsletterAdminInviteMessage.$Properties {
        }

        class NewsletterAdminInviteMessage {
            constructor(p?: E2E.Message.NewsletterAdminInviteMessage.$Properties);
            $unknowns?: Uint8Array[];
            newsletterJid?: (string|null);
            newsletterName?: (string|null);
            jpegThumbnail?: (Uint8Array|null);
            caption?: (string|null);
            inviteExpiration?: (number|Long|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.NewsletterAdminInviteMessage.$Shape): E2E.Message.NewsletterAdminInviteMessage & E2E.Message.NewsletterAdminInviteMessage.$Shape;
            static create(properties?: E2E.Message.NewsletterAdminInviteMessage.$Properties): E2E.Message.NewsletterAdminInviteMessage;
            static encode(m: E2E.Message.NewsletterAdminInviteMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.NewsletterAdminInviteMessage & E2E.Message.NewsletterAdminInviteMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.NewsletterAdminInviteMessage;
            static toObject(m: E2E.Message.NewsletterAdminInviteMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace NewsletterAdminInviteMessage {
            interface $Properties {
                newsletterJid?: (string|null);
                newsletterName?: (string|null);
                jpegThumbnail?: (Uint8Array|null);
                caption?: (string|null);
                inviteExpiration?: (number|Long|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              newsletterJid?: string|null;
              newsletterName?: string|null;
              jpegThumbnail?: Uint8Array|null;
              caption?: string|null;
              inviteExpiration?: number|Long|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface INewsletterFollowerInviteMessage extends E2E.Message.NewsletterFollowerInviteMessage.$Properties {
        }

        class NewsletterFollowerInviteMessage {
            constructor(p?: E2E.Message.NewsletterFollowerInviteMessage.$Properties);
            $unknowns?: Uint8Array[];
            newsletterJid?: (string|null);
            newsletterName?: (string|null);
            jpegThumbnail?: (Uint8Array|null);
            caption?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.NewsletterFollowerInviteMessage.$Shape): E2E.Message.NewsletterFollowerInviteMessage & E2E.Message.NewsletterFollowerInviteMessage.$Shape;
            static create(properties?: E2E.Message.NewsletterFollowerInviteMessage.$Properties): E2E.Message.NewsletterFollowerInviteMessage;
            static encode(m: E2E.Message.NewsletterFollowerInviteMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.NewsletterFollowerInviteMessage & E2E.Message.NewsletterFollowerInviteMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.NewsletterFollowerInviteMessage;
            static toObject(m: E2E.Message.NewsletterFollowerInviteMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace NewsletterFollowerInviteMessage {
            interface $Properties {
                newsletterJid?: (string|null);
                newsletterName?: (string|null);
                jpegThumbnail?: (Uint8Array|null);
                caption?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              newsletterJid?: string|null;
              newsletterName?: string|null;
              jpegThumbnail?: Uint8Array|null;
              caption?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IOrderMessage extends E2E.Message.OrderMessage.$Properties {
        }

        class OrderMessage {
            constructor(p?: E2E.Message.OrderMessage.$Properties);
            $unknowns?: Uint8Array[];
            orderId?: (string|null);
            thumbnail?: (Uint8Array|null);
            itemCount?: (number|null);
            status?: (E2E.Message.OrderMessage.OrderStatus|null);
            surface?: (E2E.Message.OrderMessage.OrderSurface|null);
            message?: (string|null);
            orderTitle?: (string|null);
            sellerJid?: (string|null);
            token?: (string|null);
            totalAmount1000?: (number|Long|null);
            totalCurrencyCode?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            messageVersion?: (number|null);
            orderRequestMessageId?: (Protocol.MessageKey.$Properties|null);
            catalogType?: (string|null);
            static create(properties: E2E.Message.OrderMessage.$Shape): E2E.Message.OrderMessage & E2E.Message.OrderMessage.$Shape;
            static create(properties?: E2E.Message.OrderMessage.$Properties): E2E.Message.OrderMessage;
            static encode(m: E2E.Message.OrderMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.OrderMessage & E2E.Message.OrderMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.OrderMessage;
            static toObject(m: E2E.Message.OrderMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace OrderMessage {
            interface $Properties {
                orderId?: (string|null);
                thumbnail?: (Uint8Array|null);
                itemCount?: (number|null);
                status?: (E2E.Message.OrderMessage.OrderStatus|null);
                surface?: (E2E.Message.OrderMessage.OrderSurface|null);
                message?: (string|null);
                orderTitle?: (string|null);
                sellerJid?: (string|null);
                token?: (string|null);
                totalAmount1000?: (number|Long|null);
                totalCurrencyCode?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                messageVersion?: (number|null);
                orderRequestMessageId?: (Protocol.MessageKey.$Properties|null);
                catalogType?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              orderId?: string|null;
              thumbnail?: Uint8Array|null;
              itemCount?: number|null;
              status?: E2E.Message.OrderMessage.OrderStatus|null;
              surface?: E2E.Message.OrderMessage.OrderSurface|null;
              message?: string|null;
              orderTitle?: string|null;
              sellerJid?: string|null;
              token?: string|null;
              totalAmount1000?: number|Long|null;
              totalCurrencyCode?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              messageVersion?: number|null;
              orderRequestMessageId?: Protocol.MessageKey.$Shape|null;
              catalogType?: string|null;
              $unknowns?: Uint8Array[];
            };

            enum OrderStatus {
                INQUIRY = 1,
                ACCEPTED = 2,
                DECLINED = 3
            }

            enum OrderSurface {
                CATALOG = 1
            }
        }

        interface IPaymentExtendedMetadata extends E2E.Message.PaymentExtendedMetadata.$Properties {
        }

        class PaymentExtendedMetadata {
            constructor(p?: E2E.Message.PaymentExtendedMetadata.$Properties);
            $unknowns?: Uint8Array[];
            type?: (number|null);
            platform?: (string|null);
            messageParamsJson?: (string|null);
            static create(properties: E2E.Message.PaymentExtendedMetadata.$Shape): E2E.Message.PaymentExtendedMetadata & E2E.Message.PaymentExtendedMetadata.$Shape;
            static create(properties?: E2E.Message.PaymentExtendedMetadata.$Properties): E2E.Message.PaymentExtendedMetadata;
            static encode(m: E2E.Message.PaymentExtendedMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PaymentExtendedMetadata & E2E.Message.PaymentExtendedMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PaymentExtendedMetadata;
            static toObject(m: E2E.Message.PaymentExtendedMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PaymentExtendedMetadata {
            interface $Properties {
                type?: (number|null);
                platform?: (string|null);
                messageParamsJson?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PaymentExtendedMetadata.$Properties;
        }

        interface IPaymentInviteMessage extends E2E.Message.PaymentInviteMessage.$Properties {
        }

        class PaymentInviteMessage {
            constructor(p?: E2E.Message.PaymentInviteMessage.$Properties);
            $unknowns?: Uint8Array[];
            serviceType?: (E2E.Message.PaymentInviteMessage.ServiceType|null);
            expiryTimestamp?: (number|Long|null);
            incentiveEligible?: (boolean|null);
            referralId?: (string|null);
            inviteType?: (E2E.Message.PaymentInviteMessage.InviteType|null);
            static create(properties: E2E.Message.PaymentInviteMessage.$Shape): E2E.Message.PaymentInviteMessage & E2E.Message.PaymentInviteMessage.$Shape;
            static create(properties?: E2E.Message.PaymentInviteMessage.$Properties): E2E.Message.PaymentInviteMessage;
            static encode(m: E2E.Message.PaymentInviteMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PaymentInviteMessage & E2E.Message.PaymentInviteMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PaymentInviteMessage;
            static toObject(m: E2E.Message.PaymentInviteMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PaymentInviteMessage {
            interface $Properties {
                serviceType?: (E2E.Message.PaymentInviteMessage.ServiceType|null);
                expiryTimestamp?: (number|Long|null);
                incentiveEligible?: (boolean|null);
                referralId?: (string|null);
                inviteType?: (E2E.Message.PaymentInviteMessage.InviteType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PaymentInviteMessage.$Properties;

            enum InviteType {
                DEFAULT = 0,
                MAPPER = 1
            }

            enum ServiceType {
                UNKNOWN = 0,
                FBPAY = 1,
                NOVI = 2,
                UPI = 3,
                PIX = 4
            }
        }

        interface IPaymentLinkMetadata extends E2E.Message.PaymentLinkMetadata.$Properties {
        }

        class PaymentLinkMetadata {
            constructor(p?: E2E.Message.PaymentLinkMetadata.$Properties);
            $unknowns?: Uint8Array[];
            button?: (E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Properties|null);
            header?: (E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Properties|null);
            provider?: (E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Properties|null);
            static create(properties: E2E.Message.PaymentLinkMetadata.$Shape): E2E.Message.PaymentLinkMetadata & E2E.Message.PaymentLinkMetadata.$Shape;
            static create(properties?: E2E.Message.PaymentLinkMetadata.$Properties): E2E.Message.PaymentLinkMetadata;
            static encode(m: E2E.Message.PaymentLinkMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PaymentLinkMetadata & E2E.Message.PaymentLinkMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PaymentLinkMetadata;
            static toObject(m: E2E.Message.PaymentLinkMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PaymentLinkMetadata {
            interface $Properties {
                button?: (E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Properties|null);
                header?: (E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Properties|null);
                provider?: (E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PaymentLinkMetadata.$Properties;

            interface IPaymentLinkButton extends E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Properties {
            }

            class PaymentLinkButton {
                constructor(p?: E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Properties);
                $unknowns?: Uint8Array[];
                displayText?: (string|null);
                static create(properties: E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Shape): E2E.Message.PaymentLinkMetadata.PaymentLinkButton & E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Shape;
                static create(properties?: E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Properties): E2E.Message.PaymentLinkMetadata.PaymentLinkButton;
                static encode(m: E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PaymentLinkMetadata.PaymentLinkButton & E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PaymentLinkMetadata.PaymentLinkButton;
                static toObject(m: E2E.Message.PaymentLinkMetadata.PaymentLinkButton, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace PaymentLinkButton {
                interface $Properties {
                    displayText?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PaymentLinkMetadata.PaymentLinkButton.$Properties;
            }

            interface IPaymentLinkHeader extends E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Properties {
            }

            class PaymentLinkHeader {
                constructor(p?: E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Properties);
                $unknowns?: Uint8Array[];
                headerType?: (E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.PaymentLinkHeaderType|null);
                static create(properties: E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Shape): E2E.Message.PaymentLinkMetadata.PaymentLinkHeader & E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Shape;
                static create(properties?: E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Properties): E2E.Message.PaymentLinkMetadata.PaymentLinkHeader;
                static encode(m: E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PaymentLinkMetadata.PaymentLinkHeader & E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PaymentLinkMetadata.PaymentLinkHeader;
                static toObject(m: E2E.Message.PaymentLinkMetadata.PaymentLinkHeader, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace PaymentLinkHeader {
                interface $Properties {
                    headerType?: (E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.PaymentLinkHeaderType|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PaymentLinkMetadata.PaymentLinkHeader.$Properties;

                enum PaymentLinkHeaderType {
                    LINK_PREVIEW = 0,
                    ORDER = 1
                }
            }

            interface IPaymentLinkProvider extends E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Properties {
            }

            class PaymentLinkProvider {
                constructor(p?: E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Properties);
                $unknowns?: Uint8Array[];
                paramsJson?: (string|null);
                static create(properties: E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Shape): E2E.Message.PaymentLinkMetadata.PaymentLinkProvider & E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Shape;
                static create(properties?: E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Properties): E2E.Message.PaymentLinkMetadata.PaymentLinkProvider;
                static encode(m: E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PaymentLinkMetadata.PaymentLinkProvider & E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PaymentLinkMetadata.PaymentLinkProvider;
                static toObject(m: E2E.Message.PaymentLinkMetadata.PaymentLinkProvider, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace PaymentLinkProvider {
                interface $Properties {
                    paramsJson?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PaymentLinkMetadata.PaymentLinkProvider.$Properties;
            }
        }

        interface IPaymentReminderMessage extends E2E.Message.PaymentReminderMessage.$Properties {
        }

        class PaymentReminderMessage {
            constructor(p?: E2E.Message.PaymentReminderMessage.$Properties);
            $unknowns?: Uint8Array[];
            reminderId?: (string|null);
            instanceId?: (string|null);
            description?: (string|null);
            frequency?: (E2E.Message.PaymentReminderMessage.ReminderFrequency|null);
            status?: (E2E.Message.PaymentReminderMessage.ReminderStatus|null);
            payeeVpa?: (string|null);
            payeeJid?: (string|null);
            payerJid?: (string|null);
            amount?: (E2E.Money.$Properties|null);
            static create(properties: E2E.Message.PaymentReminderMessage.$Shape): E2E.Message.PaymentReminderMessage & E2E.Message.PaymentReminderMessage.$Shape;
            static create(properties?: E2E.Message.PaymentReminderMessage.$Properties): E2E.Message.PaymentReminderMessage;
            static encode(m: E2E.Message.PaymentReminderMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PaymentReminderMessage & E2E.Message.PaymentReminderMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PaymentReminderMessage;
            static toObject(m: E2E.Message.PaymentReminderMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PaymentReminderMessage {
            interface $Properties {
                reminderId?: (string|null);
                instanceId?: (string|null);
                description?: (string|null);
                frequency?: (E2E.Message.PaymentReminderMessage.ReminderFrequency|null);
                status?: (E2E.Message.PaymentReminderMessage.ReminderStatus|null);
                payeeVpa?: (string|null);
                payeeJid?: (string|null);
                payerJid?: (string|null);
                amount?: (E2E.Money.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PaymentReminderMessage.$Properties;

            enum ReminderFrequency {
                REMINDER_FREQUENCY_UNKNOWN = 0,
                WEEKLY = 1,
                BI_WEEKLY = 2,
                MONTHLY = 3,
                QUARTERLY = 4
            }

            enum ReminderStatus {
                REMINDER_STATUS_UNKNOWN = 0,
                ACTIVE = 1,
                CANCELLED_BY_CREATOR = 2,
                STOPPED_BY_RECEIVER = 3,
                EXPIRED = 4,
                PAID = 5
            }
        }

        interface IPeerDataOperationRequestMessage extends E2E.Message.PeerDataOperationRequestMessage.$Properties {
        }

        class PeerDataOperationRequestMessage {
            constructor(p?: E2E.Message.PeerDataOperationRequestMessage.$Properties);
            $unknowns?: Uint8Array[];
            peerDataOperationRequestType?: (E2E.Message.PeerDataOperationRequestType|null);
            requestStickerReupload: E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Properties[];
            requestUrlPreview: E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Properties[];
            historySyncOnDemandRequest?: (E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Properties|null);
            placeholderMessageResendRequest: E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Properties[];
            fullHistorySyncOnDemandRequest?: (E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Properties|null);
            syncdCollectionFatalRecoveryRequest?: (E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Properties|null);
            historySyncChunkRetryRequest?: (E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Properties|null);
            galaxyFlowAction?: (E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Properties|null);
            companionCanonicalUserNonceFetchRequest?: (E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Properties|null);
            bizBroadcastInsightsContactListRequest?: (E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Properties|null);
            bizBroadcastInsightsRefreshRequest?: (E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Properties|null);
            static create(properties: E2E.Message.PeerDataOperationRequestMessage.$Shape): E2E.Message.PeerDataOperationRequestMessage & E2E.Message.PeerDataOperationRequestMessage.$Shape;
            static create(properties?: E2E.Message.PeerDataOperationRequestMessage.$Properties): E2E.Message.PeerDataOperationRequestMessage;
            static encode(m: E2E.Message.PeerDataOperationRequestMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage & E2E.Message.PeerDataOperationRequestMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage;
            static toObject(m: E2E.Message.PeerDataOperationRequestMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PeerDataOperationRequestMessage {
            interface $Properties {
                peerDataOperationRequestType?: (E2E.Message.PeerDataOperationRequestType|null);
                requestStickerReupload?: (E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Properties[]|null);
                requestUrlPreview?: (E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Properties[]|null);
                historySyncOnDemandRequest?: (E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Properties|null);
                placeholderMessageResendRequest?: (E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Properties[]|null);
                fullHistorySyncOnDemandRequest?: (E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Properties|null);
                syncdCollectionFatalRecoveryRequest?: (E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Properties|null);
                historySyncChunkRetryRequest?: (E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Properties|null);
                galaxyFlowAction?: (E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Properties|null);
                companionCanonicalUserNonceFetchRequest?: (E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Properties|null);
                bizBroadcastInsightsContactListRequest?: (E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Properties|null);
                bizBroadcastInsightsRefreshRequest?: (E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PeerDataOperationRequestMessage.$Properties;

            interface IBizBroadcastInsightsContactListRequest extends E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Properties {
            }

            class BizBroadcastInsightsContactListRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Properties);
                $unknowns?: Uint8Array[];
                campaignId?: (string|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest & E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest & E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BizBroadcastInsightsContactListRequest {
                interface $Properties {
                    campaignId?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsContactListRequest.$Properties;
            }

            interface IBizBroadcastInsightsRefreshRequest extends E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Properties {
            }

            class BizBroadcastInsightsRefreshRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Properties);
                $unknowns?: Uint8Array[];
                campaignId?: (string|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest & E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest & E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BizBroadcastInsightsRefreshRequest {
                interface $Properties {
                    campaignId?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.BizBroadcastInsightsRefreshRequest.$Properties;
            }

            interface ICompanionCanonicalUserNonceFetchRequest extends E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Properties {
            }

            class CompanionCanonicalUserNonceFetchRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Properties);
                $unknowns?: Uint8Array[];
                registrationTraceId?: (string|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest & E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest & E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace CompanionCanonicalUserNonceFetchRequest {
                interface $Properties {
                    registrationTraceId?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.CompanionCanonicalUserNonceFetchRequest.$Properties;
            }

            interface IFullHistorySyncOnDemandRequest extends E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Properties {
            }

            class FullHistorySyncOnDemandRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Properties);
                $unknowns?: Uint8Array[];
                requestMetadata?: (E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties|null);
                historySyncConfig?: (CompanionReg.DeviceProps.HistorySyncConfig.$Properties|null);
                fullHistorySyncOnDemandConfig?: (E2E.Message.FullHistorySyncOnDemandConfig.$Properties|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest & E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest & E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace FullHistorySyncOnDemandRequest {
                interface $Properties {
                    requestMetadata?: (E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties|null);
                    historySyncConfig?: (CompanionReg.DeviceProps.HistorySyncConfig.$Properties|null);
                    fullHistorySyncOnDemandConfig?: (E2E.Message.FullHistorySyncOnDemandConfig.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.FullHistorySyncOnDemandRequest.$Properties;
            }

            interface IGalaxyFlowAction extends E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Properties {
            }

            class GalaxyFlowAction {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Properties);
                $unknowns?: Uint8Array[];
                type?: (E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.GalaxyFlowActionType|null);
                flowId?: (string|null);
                stanzaId?: (string|null);
                galaxyFlowDownloadRequestId?: (string|null);
                agmId?: (string|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Shape): E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction & E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Properties): E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction & E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace GalaxyFlowAction {
                interface $Properties {
                    type?: (E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.GalaxyFlowActionType|null);
                    flowId?: (string|null);
                    stanzaId?: (string|null);
                    galaxyFlowDownloadRequestId?: (string|null);
                    agmId?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.GalaxyFlowAction.$Properties;

                enum GalaxyFlowActionType {
                    NOTIFY_LAUNCH = 1,
                    DOWNLOAD_RESPONSES = 2
                }
            }

            interface IHistorySyncChunkRetryRequest extends E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Properties {
            }

            class HistorySyncChunkRetryRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Properties);
                $unknowns?: Uint8Array[];
                syncType?: (E2E.Message.HistorySyncType|null);
                chunkOrder?: (number|null);
                chunkNotificationId?: (string|null);
                regenerateChunk?: (boolean|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest & E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest & E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace HistorySyncChunkRetryRequest {
                interface $Properties {
                    syncType?: (E2E.Message.HistorySyncType|null);
                    chunkOrder?: (number|null);
                    chunkNotificationId?: (string|null);
                    regenerateChunk?: (boolean|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.HistorySyncChunkRetryRequest.$Properties;
            }

            interface IHistorySyncOnDemandRequest extends E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Properties {
            }

            class HistorySyncOnDemandRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Properties);
                $unknowns?: Uint8Array[];
                chatJid?: (string|null);
                oldestMsgId?: (string|null);
                oldestMsgFromMe?: (boolean|null);
                onDemandMsgCount?: (number|null);
                oldestMsgTimestampMs?: (number|Long|null);
                accountLid?: (string|null);
                supportInlineResponse?: (boolean|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest & E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest & E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace HistorySyncOnDemandRequest {
                interface $Properties {
                    chatJid?: (string|null);
                    oldestMsgId?: (string|null);
                    oldestMsgFromMe?: (boolean|null);
                    onDemandMsgCount?: (number|null);
                    oldestMsgTimestampMs?: (number|Long|null);
                    accountLid?: (string|null);
                    supportInlineResponse?: (boolean|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.HistorySyncOnDemandRequest.$Properties;
            }

            interface IPlaceholderMessageResendRequest extends E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Properties {
            }

            class PlaceholderMessageResendRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Properties);
                $unknowns?: Uint8Array[];
                messageKey?: (Protocol.MessageKey.$Properties|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest & E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest & E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace PlaceholderMessageResendRequest {
                interface $Properties {
                    messageKey?: (Protocol.MessageKey.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.PlaceholderMessageResendRequest.$Properties;
            }

            interface IRequestStickerReupload extends E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Properties {
            }

            class RequestStickerReupload {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Properties);
                $unknowns?: Uint8Array[];
                fileSha256?: (string|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Shape): E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload & E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Properties): E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload & E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace RequestStickerReupload {
                interface $Properties {
                    fileSha256?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.RequestStickerReupload.$Properties;
            }

            interface IRequestUrlPreview extends E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Properties {
            }

            class RequestUrlPreview {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Properties);
                $unknowns?: Uint8Array[];
                url?: (string|null);
                includeHqThumbnail?: (boolean|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Shape): E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview & E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Properties): E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview & E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace RequestUrlPreview {
                interface $Properties {
                    url?: (string|null);
                    includeHqThumbnail?: (boolean|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.RequestUrlPreview.$Properties;
            }

            interface ISyncDCollectionFatalRecoveryRequest extends E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Properties {
            }

            class SyncDCollectionFatalRecoveryRequest {
                constructor(p?: E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Properties);
                $unknowns?: Uint8Array[];
                collectionName?: (string|null);
                timestamp?: (number|Long|null);
                static create(properties: E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Shape): E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest & E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Properties): E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest;
                static encode(m: E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest & E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest;
                static toObject(m: E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace SyncDCollectionFatalRecoveryRequest {
                interface $Properties {
                    collectionName?: (string|null);
                    timestamp?: (number|Long|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PeerDataOperationRequestMessage.SyncDCollectionFatalRecoveryRequest.$Properties;
            }
        }

        interface IPeerDataOperationRequestResponseMessage extends E2E.Message.PeerDataOperationRequestResponseMessage.$Properties {
        }

        class PeerDataOperationRequestResponseMessage {
            constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.$Properties);
            $unknowns?: Uint8Array[];
            peerDataOperationRequestType?: (E2E.Message.PeerDataOperationRequestType|null);
            stanzaId?: (string|null);
            peerDataOperationResult: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Properties[];
            static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage & E2E.Message.PeerDataOperationRequestResponseMessage.$Shape;
            static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage;
            static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage & E2E.Message.PeerDataOperationRequestResponseMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage;
            static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PeerDataOperationRequestResponseMessage {
            interface $Properties {
                peerDataOperationRequestType?: (E2E.Message.PeerDataOperationRequestType|null);
                stanzaId?: (string|null);
                peerDataOperationResult?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              peerDataOperationRequestType?: E2E.Message.PeerDataOperationRequestType|null;
              stanzaId?: string|null;
              peerDataOperationResult?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Shape[]|null;
              $unknowns?: Uint8Array[];
            };

            interface IPeerDataOperationResult extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Properties {
            }

            class PeerDataOperationResult {
                constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Properties);
                $unknowns?: Uint8Array[];
                mediaUploadResult?: (MmsRetry.MediaRetryNotification.ResultType|null);
                stickerMessage?: (E2E.Message.StickerMessage.$Properties|null);
                linkPreviewResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Properties|null);
                placeholderMessageResendResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Properties|null);
                waffleNonceFetchRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Properties|null);
                fullHistorySyncOnDemandRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Properties|null);
                companionMetaNonceFetchRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Properties|null);
                syncdSnapshotFatalRecoveryResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Properties|null);
                companionCanonicalUserNonceFetchRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Properties|null);
                historySyncChunkRetryResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Properties|null);
                flowResponsesCsvBundle?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Properties|null);
                bizBroadcastInsightsContactListResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Properties|null);
                contactRefreshResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Properties|null);
                static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Shape;
                static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult;
                static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult;
                static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace PeerDataOperationResult {
                interface $Properties {
                    mediaUploadResult?: (MmsRetry.MediaRetryNotification.ResultType|null);
                    stickerMessage?: (E2E.Message.StickerMessage.$Properties|null);
                    linkPreviewResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Properties|null);
                    placeholderMessageResendResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Properties|null);
                    waffleNonceFetchRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Properties|null);
                    fullHistorySyncOnDemandRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Properties|null);
                    companionMetaNonceFetchRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Properties|null);
                    syncdSnapshotFatalRecoveryResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Properties|null);
                    companionCanonicalUserNonceFetchRequestResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Properties|null);
                    historySyncChunkRetryResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Properties|null);
                    flowResponsesCsvBundle?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Properties|null);
                    bizBroadcastInsightsContactListResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Properties|null);
                    contactRefreshResponse?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  mediaUploadResult?: MmsRetry.MediaRetryNotification.ResultType|null;
                  stickerMessage?: E2E.Message.StickerMessage.$Shape|null;
                  linkPreviewResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Shape|null;
                  placeholderMessageResendResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Shape|null;
                  waffleNonceFetchRequestResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Shape|null;
                  fullHistorySyncOnDemandRequestResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Shape|null;
                  companionMetaNonceFetchRequestResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Shape|null;
                  syncdSnapshotFatalRecoveryResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Shape|null;
                  companionCanonicalUserNonceFetchRequestResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Shape|null;
                  historySyncChunkRetryResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Shape|null;
                  flowResponsesCsvBundle?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Shape|null;
                  bizBroadcastInsightsContactListResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Shape|null;
                  contactRefreshResponse?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Shape|null;
                  $unknowns?: Uint8Array[];
                };

                interface IBizBroadcastInsightsContactListResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Properties {
                }

                class BizBroadcastInsightsContactListResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    campaignId?: (string|null);
                    timestampMs?: (number|Long|null);
                    contacts: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Properties[];
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace BizBroadcastInsightsContactListResponse {
                    interface $Properties {
                        campaignId?: (string|null);
                        timestampMs?: (number|Long|null);
                        contacts?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Properties[]|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactListResponse.$Properties;
                }

                interface IBizBroadcastInsightsContactState extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Properties {
                }

                class BizBroadcastInsightsContactState {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Properties);
                    $unknowns?: Uint8Array[];
                    contactJid?: (string|null);
                    state?: (E2E.Message.InsightDeliveryState|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace BizBroadcastInsightsContactState {
                    interface $Properties {
                        contactJid?: (string|null);
                        state?: (E2E.Message.InsightDeliveryState|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.BizBroadcastInsightsContactState.$Properties;
                }

                interface ICompanionCanonicalUserNonceFetchResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Properties {
                }

                class CompanionCanonicalUserNonceFetchResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    nonce?: (string|null);
                    waFbid?: (string|null);
                    forceRefresh?: (boolean|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace CompanionCanonicalUserNonceFetchResponse {
                    interface $Properties {
                        nonce?: (string|null);
                        waFbid?: (string|null);
                        forceRefresh?: (boolean|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionCanonicalUserNonceFetchResponse.$Properties;
                }

                interface ICompanionMetaNonceFetchResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Properties {
                }

                class CompanionMetaNonceFetchResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    nonce?: (string|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace CompanionMetaNonceFetchResponse {
                    interface $Properties {
                        nonce?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.CompanionMetaNonceFetchResponse.$Properties;
                }

                interface IContactRefreshResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Properties {
                }

                class ContactRefreshResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    coveredRequestIds: string[];
                    collectionVersion?: (number|Long|null);
                    primaryDurationMs?: (number|Long|null);
                    uniqueContactCount?: (number|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ContactRefreshResponse {
                    interface $Properties {
                        coveredRequestIds?: (string[]|null);
                        collectionVersion?: (number|Long|null);
                        primaryDurationMs?: (number|Long|null);
                        uniqueContactCount?: (number|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.ContactRefreshResponse.$Properties;
                }

                interface IFlowResponsesCsvBundle extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Properties {
                }

                class FlowResponsesCsvBundle {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Properties);
                    $unknowns?: Uint8Array[];
                    flowId?: (string|null);
                    galaxyFlowDownloadRequestId?: (string|null);
                    fileName?: (string|null);
                    mimetype?: (string|null);
                    fileSha256?: (Uint8Array|null);
                    mediaKey?: (Uint8Array|null);
                    fileEncSha256?: (Uint8Array|null);
                    directPath?: (string|null);
                    mediaKeyTimestamp?: (number|Long|null);
                    fileLength?: (number|Long|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace FlowResponsesCsvBundle {
                    interface $Properties {
                        flowId?: (string|null);
                        galaxyFlowDownloadRequestId?: (string|null);
                        fileName?: (string|null);
                        mimetype?: (string|null);
                        fileSha256?: (Uint8Array|null);
                        mediaKey?: (Uint8Array|null);
                        fileEncSha256?: (Uint8Array|null);
                        directPath?: (string|null);
                        mediaKeyTimestamp?: (number|Long|null);
                        fileLength?: (number|Long|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FlowResponsesCsvBundle.$Properties;
                }

                interface IFullHistorySyncOnDemandRequestResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Properties {
                }

                class FullHistorySyncOnDemandRequestResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    requestMetadata?: (E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties|null);
                    responseCode?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandResponseCode|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace FullHistorySyncOnDemandRequestResponse {
                    interface $Properties {
                        requestMetadata?: (E2E.Message.FullHistorySyncOnDemandRequestMetadata.$Properties|null);
                        responseCode?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandResponseCode|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.FullHistorySyncOnDemandRequestResponse.$Properties;
                }

                enum FullHistorySyncOnDemandResponseCode {
                    REQUEST_SUCCESS = 0,
                    REQUEST_TIME_EXPIRED = 1,
                    DECLINED_SHARING_HISTORY = 2,
                    GENERIC_ERROR = 3,
                    ERROR_REQUEST_ON_NON_SMB_PRIMARY = 4,
                    ERROR_HOSTED_DEVICE_NOT_CONNECTED = 5,
                    ERROR_HOSTED_DEVICE_LOGIN_TIME_NOT_SET = 6,
                    ERROR_MULTI_PROVIDER_NOT_CONFIGURED = 7
                }

                interface IHistorySyncChunkRetryResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Properties {
                }

                class HistorySyncChunkRetryResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    syncType?: (E2E.Message.HistorySyncType|null);
                    chunkOrder?: (number|null);
                    requestId?: (string|null);
                    responseCode?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponseCode|null);
                    canRecover?: (boolean|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace HistorySyncChunkRetryResponse {
                    interface $Properties {
                        syncType?: (E2E.Message.HistorySyncType|null);
                        chunkOrder?: (number|null);
                        requestId?: (string|null);
                        responseCode?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponseCode|null);
                        canRecover?: (boolean|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.HistorySyncChunkRetryResponse.$Properties;
                }

                enum HistorySyncChunkRetryResponseCode {
                    GENERATION_ERROR = 1,
                    CHUNK_CONSUMED = 2,
                    TIMEOUT = 3,
                    SESSION_EXHAUSTED = 4,
                    CHUNK_EXHAUSTED = 5,
                    DUPLICATED_REQUEST = 6
                }

                interface ILinkPreviewResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Properties {
                }

                class LinkPreviewResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    url?: (string|null);
                    title?: (string|null);
                    description?: (string|null);
                    thumbData?: (Uint8Array|null);
                    matchText?: (string|null);
                    previewType?: (string|null);
                    hqThumbnail?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Properties|null);
                    previewMetadata?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Properties|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace LinkPreviewResponse {
                    interface $Properties {
                        url?: (string|null);
                        title?: (string|null);
                        description?: (string|null);
                        thumbData?: (Uint8Array|null);
                        matchText?: (string|null);
                        previewType?: (string|null);
                        hqThumbnail?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Properties|null);
                        previewMetadata?: (E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Properties|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.$Properties;

                    interface ILinkPreviewHighQualityThumbnail extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Properties {
                    }

                    class LinkPreviewHighQualityThumbnail {
                        constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Properties);
                        $unknowns?: Uint8Array[];
                        directPath?: (string|null);
                        thumbHash?: (string|null);
                        encThumbHash?: (string|null);
                        mediaKey?: (Uint8Array|null);
                        mediaKeyTimestampMs?: (number|Long|null);
                        thumbWidth?: (number|null);
                        thumbHeight?: (number|null);
                        static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Shape;
                        static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail;
                        static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Shape;
                        static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail;
                        static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail, o?: $protobuf.IConversionOptions): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                        static getTypeUrl(prefix?: string): string;
                    }

                    namespace LinkPreviewHighQualityThumbnail {
                        interface $Properties {
                            directPath?: (string|null);
                            thumbHash?: (string|null);
                            encThumbHash?: (string|null);
                            mediaKey?: (Uint8Array|null);
                            mediaKeyTimestampMs?: (number|Long|null);
                            thumbWidth?: (number|null);
                            thumbHeight?: (number|null);
                            $unknowns?: Uint8Array[];
                        }
                        type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.LinkPreviewHighQualityThumbnail.$Properties;
                    }

                    interface IPaymentLinkPreviewMetadata extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Properties {
                    }

                    class PaymentLinkPreviewMetadata {
                        constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Properties);
                        $unknowns?: Uint8Array[];
                        isBusinessVerified?: (boolean|null);
                        providerName?: (string|null);
                        amount?: (string|null);
                        offset?: (string|null);
                        currency?: (string|null);
                        static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Shape;
                        static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata;
                        static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Shape;
                        static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata;
                        static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                        toJSON(): { [k: string]: any };
                        static getTypeUrl(prefix?: string): string;
                    }

                    namespace PaymentLinkPreviewMetadata {
                        interface $Properties {
                            isBusinessVerified?: (boolean|null);
                            providerName?: (string|null);
                            amount?: (string|null);
                            offset?: (string|null);
                            currency?: (string|null);
                            $unknowns?: Uint8Array[];
                        }
                        type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.LinkPreviewResponse.PaymentLinkPreviewMetadata.$Properties;
                    }
                }

                interface IPlaceholderMessageResendResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Properties {
                }

                class PlaceholderMessageResendResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    webMessageInfoBytes?: (Uint8Array|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace PlaceholderMessageResendResponse {
                    interface $Properties {
                        webMessageInfoBytes?: (Uint8Array|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.PlaceholderMessageResendResponse.$Properties;
                }

                interface ISyncDSnapshotFatalRecoveryResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Properties {
                }

                class SyncDSnapshotFatalRecoveryResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    collectionSnapshot?: (Uint8Array|null);
                    isCompressed?: (boolean|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace SyncDSnapshotFatalRecoveryResponse {
                    interface $Properties {
                        collectionSnapshot?: (Uint8Array|null);
                        isCompressed?: (boolean|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.SyncDSnapshotFatalRecoveryResponse.$Properties;
                }

                interface IWaffleNonceFetchResponse extends E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Properties {
                }

                class WaffleNonceFetchResponse {
                    constructor(p?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Properties);
                    $unknowns?: Uint8Array[];
                    nonce?: (string|null);
                    waEntFbid?: (string|null);
                    static create(properties: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Shape): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Shape;
                    static create(properties?: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Properties): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse;
                    static encode(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse & E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Shape;
                    static fromObject(d: { [k: string]: any }): E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse;
                    static toObject(m: E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace WaffleNonceFetchResponse {
                    interface $Properties {
                        nonce?: (string|null);
                        waEntFbid?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = E2E.Message.PeerDataOperationRequestResponseMessage.PeerDataOperationResult.WaffleNonceFetchResponse.$Properties;
                }
            }
        }

        enum PeerDataOperationRequestType {
            UPLOAD_STICKER = 0,
            SEND_RECENT_STICKER_BOOTSTRAP = 1,
            GENERATE_LINK_PREVIEW = 2,
            HISTORY_SYNC_ON_DEMAND = 3,
            PLACEHOLDER_MESSAGE_RESEND = 4,
            WAFFLE_LINKING_NONCE_FETCH = 5,
            FULL_HISTORY_SYNC_ON_DEMAND = 6,
            COMPANION_META_NONCE_FETCH = 7,
            COMPANION_SYNCD_SNAPSHOT_FATAL_RECOVERY = 8,
            COMPANION_CANONICAL_USER_NONCE_FETCH = 9,
            HISTORY_SYNC_CHUNK_RETRY = 10,
            GALAXY_FLOW_ACTION = 11,
            BUSINESS_BROADCAST_INSIGHTS_DELIVERED_TO = 12,
            BUSINESS_BROADCAST_INSIGHTS_REFRESH = 13,
            CONTACT_REFRESH_REQUEST = 14
        }

        interface IPinInChatMessage extends E2E.Message.PinInChatMessage.$Properties {
        }

        class PinInChatMessage {
            constructor(p?: E2E.Message.PinInChatMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            type?: (E2E.Message.PinInChatMessage.Type|null);
            senderTimestampMs?: (number|Long|null);
            static create(properties: E2E.Message.PinInChatMessage.$Shape): E2E.Message.PinInChatMessage & E2E.Message.PinInChatMessage.$Shape;
            static create(properties?: E2E.Message.PinInChatMessage.$Properties): E2E.Message.PinInChatMessage;
            static encode(m: E2E.Message.PinInChatMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PinInChatMessage & E2E.Message.PinInChatMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PinInChatMessage;
            static toObject(m: E2E.Message.PinInChatMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PinInChatMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                type?: (E2E.Message.PinInChatMessage.Type|null);
                senderTimestampMs?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PinInChatMessage.$Properties;

            enum Type {
                UNKNOWN_TYPE = 0,
                PIN_FOR_ALL = 1,
                UNPIN_FOR_ALL = 2
            }
        }

        interface IPlaceholderMessage extends E2E.Message.PlaceholderMessage.$Properties {
        }

        class PlaceholderMessage {
            constructor(p?: E2E.Message.PlaceholderMessage.$Properties);
            $unknowns?: Uint8Array[];
            type?: (E2E.Message.PlaceholderMessage.PlaceholderType|null);
            static create(properties: E2E.Message.PlaceholderMessage.$Shape): E2E.Message.PlaceholderMessage & E2E.Message.PlaceholderMessage.$Shape;
            static create(properties?: E2E.Message.PlaceholderMessage.$Properties): E2E.Message.PlaceholderMessage;
            static encode(m: E2E.Message.PlaceholderMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PlaceholderMessage & E2E.Message.PlaceholderMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PlaceholderMessage;
            static toObject(m: E2E.Message.PlaceholderMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PlaceholderMessage {
            interface $Properties {
                type?: (E2E.Message.PlaceholderMessage.PlaceholderType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PlaceholderMessage.$Properties;

            enum PlaceholderType {
                MASK_LINKED_DEVICES = 0
            }
        }

        interface IPollAddOptionMessage extends E2E.Message.PollAddOptionMessage.$Properties {
        }

        class PollAddOptionMessage {
            constructor(p?: E2E.Message.PollAddOptionMessage.$Properties);
            $unknowns?: Uint8Array[];
            pollCreationMessageKey?: (Protocol.MessageKey.$Properties|null);
            addOption?: (E2E.Message.PollCreationMessage.Option.$Properties|null);
            metadata?: (E2E.Message.PollUpdateMessageMetadata.$Properties|null);
            static create(properties: E2E.Message.PollAddOptionMessage.$Shape): E2E.Message.PollAddOptionMessage & E2E.Message.PollAddOptionMessage.$Shape;
            static create(properties?: E2E.Message.PollAddOptionMessage.$Properties): E2E.Message.PollAddOptionMessage;
            static encode(m: E2E.Message.PollAddOptionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollAddOptionMessage & E2E.Message.PollAddOptionMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PollAddOptionMessage;
            static toObject(m: E2E.Message.PollAddOptionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PollAddOptionMessage {
            interface $Properties {
                pollCreationMessageKey?: (Protocol.MessageKey.$Properties|null);
                addOption?: (E2E.Message.PollCreationMessage.Option.$Properties|null);
                metadata?: (E2E.Message.PollUpdateMessageMetadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PollAddOptionMessage.$Properties;
        }

        enum PollContentType {
            UNKNOWN = 0,
            TEXT = 1,
            IMAGE = 2
        }

        interface IPollCreationMessage extends E2E.Message.PollCreationMessage.$Properties {
        }

        class PollCreationMessage {
            constructor(p?: E2E.Message.PollCreationMessage.$Properties);
            $unknowns?: Uint8Array[];
            encKey?: (Uint8Array|null);
            name?: (string|null);
            options: E2E.Message.PollCreationMessage.Option.$Properties[];
            selectableOptionsCount?: (number|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            pollContentType?: (E2E.Message.PollContentType|null);
            pollType?: (E2E.Message.PollType|null);
            correctAnswer?: (E2E.Message.PollCreationMessage.Option.$Properties|null);
            endTime?: (number|Long|null);
            hideParticipantName?: (boolean|null);
            allowAddOption?: (boolean|null);
            static create(properties: E2E.Message.PollCreationMessage.$Shape): E2E.Message.PollCreationMessage & E2E.Message.PollCreationMessage.$Shape;
            static create(properties?: E2E.Message.PollCreationMessage.$Properties): E2E.Message.PollCreationMessage;
            static encode(m: E2E.Message.PollCreationMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollCreationMessage & E2E.Message.PollCreationMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PollCreationMessage;
            static toObject(m: E2E.Message.PollCreationMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PollCreationMessage {
            interface $Properties {
                encKey?: (Uint8Array|null);
                name?: (string|null);
                options?: (E2E.Message.PollCreationMessage.Option.$Properties[]|null);
                selectableOptionsCount?: (number|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                pollContentType?: (E2E.Message.PollContentType|null);
                pollType?: (E2E.Message.PollType|null);
                correctAnswer?: (E2E.Message.PollCreationMessage.Option.$Properties|null);
                endTime?: (number|Long|null);
                hideParticipantName?: (boolean|null);
                allowAddOption?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              encKey?: Uint8Array|null;
              name?: string|null;
              options?: E2E.Message.PollCreationMessage.Option.$Shape[]|null;
              selectableOptionsCount?: number|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              pollContentType?: E2E.Message.PollContentType|null;
              pollType?: E2E.Message.PollType|null;
              correctAnswer?: E2E.Message.PollCreationMessage.Option.$Shape|null;
              endTime?: number|Long|null;
              hideParticipantName?: boolean|null;
              allowAddOption?: boolean|null;
              $unknowns?: Uint8Array[];
            };

            interface IOption extends E2E.Message.PollCreationMessage.Option.$Properties {
            }

            class Option {
                constructor(p?: E2E.Message.PollCreationMessage.Option.$Properties);
                $unknowns?: Uint8Array[];
                optionName?: (string|null);
                optionHash?: (string|null);
                static create(properties: E2E.Message.PollCreationMessage.Option.$Shape): E2E.Message.PollCreationMessage.Option & E2E.Message.PollCreationMessage.Option.$Shape;
                static create(properties?: E2E.Message.PollCreationMessage.Option.$Properties): E2E.Message.PollCreationMessage.Option;
                static encode(m: E2E.Message.PollCreationMessage.Option.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollCreationMessage.Option & E2E.Message.PollCreationMessage.Option.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PollCreationMessage.Option;
                static toObject(m: E2E.Message.PollCreationMessage.Option, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Option {
                interface $Properties {
                    optionName?: (string|null);
                    optionHash?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PollCreationMessage.Option.$Properties;
            }
        }

        interface IPollEncValue extends E2E.Message.PollEncValue.$Properties {
        }

        class PollEncValue {
            constructor(p?: E2E.Message.PollEncValue.$Properties);
            $unknowns?: Uint8Array[];
            encPayload?: (Uint8Array|null);
            encIv?: (Uint8Array|null);
            static create(properties: E2E.Message.PollEncValue.$Shape): E2E.Message.PollEncValue & E2E.Message.PollEncValue.$Shape;
            static create(properties?: E2E.Message.PollEncValue.$Properties): E2E.Message.PollEncValue;
            static encode(m: E2E.Message.PollEncValue.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollEncValue & E2E.Message.PollEncValue.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PollEncValue;
            static toObject(m: E2E.Message.PollEncValue, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PollEncValue {
            interface $Properties {
                encPayload?: (Uint8Array|null);
                encIv?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PollEncValue.$Properties;
        }

        interface IPollResultSnapshotMessage extends E2E.Message.PollResultSnapshotMessage.$Properties {
        }

        class PollResultSnapshotMessage {
            constructor(p?: E2E.Message.PollResultSnapshotMessage.$Properties);
            $unknowns?: Uint8Array[];
            name?: (string|null);
            pollVotes: E2E.Message.PollResultSnapshotMessage.PollVote.$Properties[];
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            pollType?: (E2E.Message.PollType|null);
            static create(properties: E2E.Message.PollResultSnapshotMessage.$Shape): E2E.Message.PollResultSnapshotMessage & E2E.Message.PollResultSnapshotMessage.$Shape;
            static create(properties?: E2E.Message.PollResultSnapshotMessage.$Properties): E2E.Message.PollResultSnapshotMessage;
            static encode(m: E2E.Message.PollResultSnapshotMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollResultSnapshotMessage & E2E.Message.PollResultSnapshotMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PollResultSnapshotMessage;
            static toObject(m: E2E.Message.PollResultSnapshotMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PollResultSnapshotMessage {
            interface $Properties {
                name?: (string|null);
                pollVotes?: (E2E.Message.PollResultSnapshotMessage.PollVote.$Properties[]|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                pollType?: (E2E.Message.PollType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              name?: string|null;
              pollVotes?: E2E.Message.PollResultSnapshotMessage.PollVote.$Shape[]|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              pollType?: E2E.Message.PollType|null;
              $unknowns?: Uint8Array[];
            };

            interface IPollVote extends E2E.Message.PollResultSnapshotMessage.PollVote.$Properties {
            }

            class PollVote {
                constructor(p?: E2E.Message.PollResultSnapshotMessage.PollVote.$Properties);
                $unknowns?: Uint8Array[];
                optionName?: (string|null);
                optionVoteCount?: (number|Long|null);
                static create(properties: E2E.Message.PollResultSnapshotMessage.PollVote.$Shape): E2E.Message.PollResultSnapshotMessage.PollVote & E2E.Message.PollResultSnapshotMessage.PollVote.$Shape;
                static create(properties?: E2E.Message.PollResultSnapshotMessage.PollVote.$Properties): E2E.Message.PollResultSnapshotMessage.PollVote;
                static encode(m: E2E.Message.PollResultSnapshotMessage.PollVote.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollResultSnapshotMessage.PollVote & E2E.Message.PollResultSnapshotMessage.PollVote.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.PollResultSnapshotMessage.PollVote;
                static toObject(m: E2E.Message.PollResultSnapshotMessage.PollVote, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace PollVote {
                interface $Properties {
                    optionName?: (string|null);
                    optionVoteCount?: (number|Long|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.PollResultSnapshotMessage.PollVote.$Properties;
            }
        }

        enum PollType {
            POLL = 0,
            QUIZ = 1
        }

        interface IPollUpdateMessage extends E2E.Message.PollUpdateMessage.$Properties {
        }

        class PollUpdateMessage {
            constructor(p?: E2E.Message.PollUpdateMessage.$Properties);
            $unknowns?: Uint8Array[];
            pollCreationMessageKey?: (Protocol.MessageKey.$Properties|null);
            vote?: (E2E.Message.PollEncValue.$Properties|null);
            metadata?: (E2E.Message.PollUpdateMessageMetadata.$Properties|null);
            senderTimestampMs?: (number|Long|null);
            static create(properties: E2E.Message.PollUpdateMessage.$Shape): E2E.Message.PollUpdateMessage & E2E.Message.PollUpdateMessage.$Shape;
            static create(properties?: E2E.Message.PollUpdateMessage.$Properties): E2E.Message.PollUpdateMessage;
            static encode(m: E2E.Message.PollUpdateMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollUpdateMessage & E2E.Message.PollUpdateMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PollUpdateMessage;
            static toObject(m: E2E.Message.PollUpdateMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PollUpdateMessage {
            interface $Properties {
                pollCreationMessageKey?: (Protocol.MessageKey.$Properties|null);
                vote?: (E2E.Message.PollEncValue.$Properties|null);
                metadata?: (E2E.Message.PollUpdateMessageMetadata.$Properties|null);
                senderTimestampMs?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PollUpdateMessage.$Properties;
        }

        interface IPollUpdateMessageMetadata extends E2E.Message.PollUpdateMessageMetadata.$Properties {
        }

        class PollUpdateMessageMetadata {
            constructor(p?: E2E.Message.PollUpdateMessageMetadata.$Properties);
            $unknowns?: Uint8Array[];
            pollNameHash?: (Uint8Array|null);
            lastEditStanzaId?: (string|null);
            static create(properties: E2E.Message.PollUpdateMessageMetadata.$Shape): E2E.Message.PollUpdateMessageMetadata & E2E.Message.PollUpdateMessageMetadata.$Shape;
            static create(properties?: E2E.Message.PollUpdateMessageMetadata.$Properties): E2E.Message.PollUpdateMessageMetadata;
            static encode(m: E2E.Message.PollUpdateMessageMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollUpdateMessageMetadata & E2E.Message.PollUpdateMessageMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PollUpdateMessageMetadata;
            static toObject(m: E2E.Message.PollUpdateMessageMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PollUpdateMessageMetadata {
            interface $Properties {
                pollNameHash?: (Uint8Array|null);
                lastEditStanzaId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PollUpdateMessageMetadata.$Properties;
        }

        interface IPollVoteMessage extends E2E.Message.PollVoteMessage.$Properties {
        }

        class PollVoteMessage {
            constructor(p?: E2E.Message.PollVoteMessage.$Properties);
            $unknowns?: Uint8Array[];
            selectedOptions: Uint8Array[];
            static create(properties: E2E.Message.PollVoteMessage.$Shape): E2E.Message.PollVoteMessage & E2E.Message.PollVoteMessage.$Shape;
            static create(properties?: E2E.Message.PollVoteMessage.$Properties): E2E.Message.PollVoteMessage;
            static encode(m: E2E.Message.PollVoteMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.PollVoteMessage & E2E.Message.PollVoteMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.PollVoteMessage;
            static toObject(m: E2E.Message.PollVoteMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PollVoteMessage {
            interface $Properties {
                selectedOptions?: (Uint8Array[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.PollVoteMessage.$Properties;
        }

        interface IProductMessage extends E2E.Message.ProductMessage.$Properties {
        }

        class ProductMessage {
            constructor(p?: E2E.Message.ProductMessage.$Properties);
            $unknowns?: Uint8Array[];
            product?: (E2E.Message.ProductMessage.ProductSnapshot.$Properties|null);
            businessOwnerJid?: (string|null);
            catalog?: (E2E.Message.ProductMessage.CatalogSnapshot.$Properties|null);
            body?: (string|null);
            footer?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.ProductMessage.$Shape): E2E.Message.ProductMessage & E2E.Message.ProductMessage.$Shape;
            static create(properties?: E2E.Message.ProductMessage.$Properties): E2E.Message.ProductMessage;
            static encode(m: E2E.Message.ProductMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ProductMessage & E2E.Message.ProductMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ProductMessage;
            static toObject(m: E2E.Message.ProductMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ProductMessage {
            interface $Properties {
                product?: (E2E.Message.ProductMessage.ProductSnapshot.$Properties|null);
                businessOwnerJid?: (string|null);
                catalog?: (E2E.Message.ProductMessage.CatalogSnapshot.$Properties|null);
                body?: (string|null);
                footer?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              product?: E2E.Message.ProductMessage.ProductSnapshot.$Shape|null;
              businessOwnerJid?: string|null;
              catalog?: E2E.Message.ProductMessage.CatalogSnapshot.$Shape|null;
              body?: string|null;
              footer?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };

            interface ICatalogSnapshot extends E2E.Message.ProductMessage.CatalogSnapshot.$Properties {
            }

            class CatalogSnapshot {
                constructor(p?: E2E.Message.ProductMessage.CatalogSnapshot.$Properties);
                $unknowns?: Uint8Array[];
                catalogImage?: (E2E.Message.ImageMessage.$Properties|null);
                title?: (string|null);
                description?: (string|null);
                static create(properties: E2E.Message.ProductMessage.CatalogSnapshot.$Shape): E2E.Message.ProductMessage.CatalogSnapshot & E2E.Message.ProductMessage.CatalogSnapshot.$Shape;
                static create(properties?: E2E.Message.ProductMessage.CatalogSnapshot.$Properties): E2E.Message.ProductMessage.CatalogSnapshot;
                static encode(m: E2E.Message.ProductMessage.CatalogSnapshot.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ProductMessage.CatalogSnapshot & E2E.Message.ProductMessage.CatalogSnapshot.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ProductMessage.CatalogSnapshot;
                static toObject(m: E2E.Message.ProductMessage.CatalogSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace CatalogSnapshot {
                interface $Properties {
                    catalogImage?: (E2E.Message.ImageMessage.$Properties|null);
                    title?: (string|null);
                    description?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  catalogImage?: E2E.Message.ImageMessage.$Shape|null;
                  title?: string|null;
                  description?: string|null;
                  $unknowns?: Uint8Array[];
                };
            }

            interface IProductSnapshot extends E2E.Message.ProductMessage.ProductSnapshot.$Properties {
            }

            class ProductSnapshot {
                constructor(p?: E2E.Message.ProductMessage.ProductSnapshot.$Properties);
                $unknowns?: Uint8Array[];
                productImage?: (E2E.Message.ImageMessage.$Properties|null);
                productId?: (string|null);
                title?: (string|null);
                description?: (string|null);
                currencyCode?: (string|null);
                priceAmount1000?: (number|Long|null);
                retailerId?: (string|null);
                url?: (string|null);
                productImageCount?: (number|null);
                firstImageId?: (string|null);
                salePriceAmount1000?: (number|Long|null);
                signedUrl?: (string|null);
                static create(properties: E2E.Message.ProductMessage.ProductSnapshot.$Shape): E2E.Message.ProductMessage.ProductSnapshot & E2E.Message.ProductMessage.ProductSnapshot.$Shape;
                static create(properties?: E2E.Message.ProductMessage.ProductSnapshot.$Properties): E2E.Message.ProductMessage.ProductSnapshot;
                static encode(m: E2E.Message.ProductMessage.ProductSnapshot.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ProductMessage.ProductSnapshot & E2E.Message.ProductMessage.ProductSnapshot.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.ProductMessage.ProductSnapshot;
                static toObject(m: E2E.Message.ProductMessage.ProductSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace ProductSnapshot {
                interface $Properties {
                    productImage?: (E2E.Message.ImageMessage.$Properties|null);
                    productId?: (string|null);
                    title?: (string|null);
                    description?: (string|null);
                    currencyCode?: (string|null);
                    priceAmount1000?: (number|Long|null);
                    retailerId?: (string|null);
                    url?: (string|null);
                    productImageCount?: (number|null);
                    firstImageId?: (string|null);
                    salePriceAmount1000?: (number|Long|null);
                    signedUrl?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  productImage?: E2E.Message.ImageMessage.$Shape|null;
                  productId?: string|null;
                  title?: string|null;
                  description?: string|null;
                  currencyCode?: string|null;
                  priceAmount1000?: number|Long|null;
                  retailerId?: string|null;
                  url?: string|null;
                  productImageCount?: number|null;
                  firstImageId?: string|null;
                  salePriceAmount1000?: number|Long|null;
                  signedUrl?: string|null;
                  $unknowns?: Uint8Array[];
                };
            }
        }

        interface IProtocolMessage extends E2E.Message.ProtocolMessage.$Properties {
        }

        class ProtocolMessage {
            constructor(p?: E2E.Message.ProtocolMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            type?: (E2E.Message.ProtocolMessage.Type|null);
            ephemeralExpiration?: (number|null);
            ephemeralSettingTimestamp?: (number|Long|null);
            historySyncNotification?: (E2E.Message.HistorySyncNotification.$Properties|null);
            appStateSyncKeyShare?: (E2E.Message.AppStateSyncKeyShare.$Properties|null);
            appStateSyncKeyRequest?: (E2E.Message.AppStateSyncKeyRequest.$Properties|null);
            initialSecurityNotificationSettingSync?: (E2E.Message.InitialSecurityNotificationSettingSync.$Properties|null);
            appStateFatalExceptionNotification?: (E2E.Message.AppStateFatalExceptionNotification.$Properties|null);
            disappearingMode?: (E2E.DisappearingMode.$Properties|null);
            editedMessage?: (E2E.Message.$Properties|null);
            timestampMs?: (number|Long|null);
            peerDataOperationRequestMessage?: (E2E.Message.PeerDataOperationRequestMessage.$Properties|null);
            peerDataOperationRequestResponseMessage?: (E2E.Message.PeerDataOperationRequestResponseMessage.$Properties|null);
            botFeedbackMessage?: (AICommon.BotFeedbackMessage.$Properties|null);
            invokerJid?: (string|null);
            requestWelcomeMessageMetadata?: (E2E.Message.RequestWelcomeMessageMetadata.$Properties|null);
            mediaNotifyMessage?: (E2E.MediaNotifyMessage.$Properties|null);
            cloudApiThreadControlNotification?: (E2E.Message.CloudAPIThreadControlNotification.$Properties|null);
            lidMigrationMappingSyncMessage?: (E2E.LIDMigrationMappingSyncMessage.$Properties|null);
            limitSharing?: (Protocol.LimitSharing.$Properties|null);
            aiPsiMetadata?: (Uint8Array|null);
            aiQueryFanout?: (E2E.AIQueryFanout.$Properties|null);
            memberLabel?: (E2E.MemberLabel.$Properties|null);
            aiMediaCollectionMessage?: (AICommon.AIMediaCollectionMessage.$Properties|null);
            afterReadDuration?: (number|null);
            chatThemeSetting?: (E2E.Message.ChatThemeSetting.$Properties|null);
            aiMetadataOperation?: (AICommon.AIMetadataOperation.$Properties|null);
            markAsVerifiedAction?: (E2E.Message.MarkAsVerifiedAction.$Properties|null);
            coexStateSync?: (ServerSync.CoexStateSync.$Properties|null);
            acp2Setting?: (Protocol.ACP2Setting.$Properties|null);
            sharedDeviceContactHashKeyShare?: (E2E.Message.SharedDeviceContactHashKeyShare.$Properties|null);
            sharedDeviceContactHashKeyRequest?: (E2E.Message.SharedDeviceContactHashKeyRequest.$Properties|null);
            static create(properties: E2E.Message.ProtocolMessage.$Shape): E2E.Message.ProtocolMessage & E2E.Message.ProtocolMessage.$Shape;
            static create(properties?: E2E.Message.ProtocolMessage.$Properties): E2E.Message.ProtocolMessage;
            static encode(m: E2E.Message.ProtocolMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ProtocolMessage & E2E.Message.ProtocolMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ProtocolMessage;
            static toObject(m: E2E.Message.ProtocolMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ProtocolMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                type?: (E2E.Message.ProtocolMessage.Type|null);
                ephemeralExpiration?: (number|null);
                ephemeralSettingTimestamp?: (number|Long|null);
                historySyncNotification?: (E2E.Message.HistorySyncNotification.$Properties|null);
                appStateSyncKeyShare?: (E2E.Message.AppStateSyncKeyShare.$Properties|null);
                appStateSyncKeyRequest?: (E2E.Message.AppStateSyncKeyRequest.$Properties|null);
                initialSecurityNotificationSettingSync?: (E2E.Message.InitialSecurityNotificationSettingSync.$Properties|null);
                appStateFatalExceptionNotification?: (E2E.Message.AppStateFatalExceptionNotification.$Properties|null);
                disappearingMode?: (E2E.DisappearingMode.$Properties|null);
                editedMessage?: (E2E.Message.$Properties|null);
                timestampMs?: (number|Long|null);
                peerDataOperationRequestMessage?: (E2E.Message.PeerDataOperationRequestMessage.$Properties|null);
                peerDataOperationRequestResponseMessage?: (E2E.Message.PeerDataOperationRequestResponseMessage.$Properties|null);
                botFeedbackMessage?: (AICommon.BotFeedbackMessage.$Properties|null);
                invokerJid?: (string|null);
                requestWelcomeMessageMetadata?: (E2E.Message.RequestWelcomeMessageMetadata.$Properties|null);
                mediaNotifyMessage?: (E2E.MediaNotifyMessage.$Properties|null);
                cloudApiThreadControlNotification?: (E2E.Message.CloudAPIThreadControlNotification.$Properties|null);
                lidMigrationMappingSyncMessage?: (E2E.LIDMigrationMappingSyncMessage.$Properties|null);
                limitSharing?: (Protocol.LimitSharing.$Properties|null);
                aiPsiMetadata?: (Uint8Array|null);
                aiQueryFanout?: (E2E.AIQueryFanout.$Properties|null);
                memberLabel?: (E2E.MemberLabel.$Properties|null);
                aiMediaCollectionMessage?: (AICommon.AIMediaCollectionMessage.$Properties|null);
                afterReadDuration?: (number|null);
                chatThemeSetting?: (E2E.Message.ChatThemeSetting.$Properties|null);
                aiMetadataOperation?: (AICommon.AIMetadataOperation.$Properties|null);
                markAsVerifiedAction?: (E2E.Message.MarkAsVerifiedAction.$Properties|null);
                coexStateSync?: (ServerSync.CoexStateSync.$Properties|null);
                acp2Setting?: (Protocol.ACP2Setting.$Properties|null);
                sharedDeviceContactHashKeyShare?: (E2E.Message.SharedDeviceContactHashKeyShare.$Properties|null);
                sharedDeviceContactHashKeyRequest?: (E2E.Message.SharedDeviceContactHashKeyRequest.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              key?: Protocol.MessageKey.$Shape|null;
              type?: E2E.Message.ProtocolMessage.Type|null;
              ephemeralExpiration?: number|null;
              ephemeralSettingTimestamp?: number|Long|null;
              historySyncNotification?: E2E.Message.HistorySyncNotification.$Shape|null;
              appStateSyncKeyShare?: E2E.Message.AppStateSyncKeyShare.$Shape|null;
              appStateSyncKeyRequest?: E2E.Message.AppStateSyncKeyRequest.$Shape|null;
              initialSecurityNotificationSettingSync?: E2E.Message.InitialSecurityNotificationSettingSync.$Shape|null;
              appStateFatalExceptionNotification?: E2E.Message.AppStateFatalExceptionNotification.$Shape|null;
              disappearingMode?: E2E.DisappearingMode.$Shape|null;
              editedMessage?: E2E.Message.$Shape|null;
              timestampMs?: number|Long|null;
              peerDataOperationRequestMessage?: E2E.Message.PeerDataOperationRequestMessage.$Shape|null;
              peerDataOperationRequestResponseMessage?: E2E.Message.PeerDataOperationRequestResponseMessage.$Shape|null;
              botFeedbackMessage?: AICommon.BotFeedbackMessage.$Shape|null;
              invokerJid?: string|null;
              requestWelcomeMessageMetadata?: E2E.Message.RequestWelcomeMessageMetadata.$Shape|null;
              mediaNotifyMessage?: E2E.MediaNotifyMessage.$Shape|null;
              cloudApiThreadControlNotification?: E2E.Message.CloudAPIThreadControlNotification.$Shape|null;
              lidMigrationMappingSyncMessage?: E2E.LIDMigrationMappingSyncMessage.$Shape|null;
              limitSharing?: Protocol.LimitSharing.$Shape|null;
              aiPsiMetadata?: Uint8Array|null;
              aiQueryFanout?: E2E.AIQueryFanout.$Shape|null;
              memberLabel?: E2E.MemberLabel.$Shape|null;
              aiMediaCollectionMessage?: AICommon.AIMediaCollectionMessage.$Shape|null;
              afterReadDuration?: number|null;
              chatThemeSetting?: E2E.Message.ChatThemeSetting.$Shape|null;
              aiMetadataOperation?: AICommon.AIMetadataOperation.$Shape|null;
              markAsVerifiedAction?: E2E.Message.MarkAsVerifiedAction.$Shape|null;
              coexStateSync?: ServerSync.CoexStateSync.$Shape|null;
              acp2Setting?: Protocol.ACP2Setting.$Shape|null;
              sharedDeviceContactHashKeyShare?: E2E.Message.SharedDeviceContactHashKeyShare.$Shape|null;
              sharedDeviceContactHashKeyRequest?: E2E.Message.SharedDeviceContactHashKeyRequest.$Shape|null;
              $unknowns?: Uint8Array[];
            };

            enum Type {
                REVOKE = 0,
                EPHEMERAL_SETTING = 3,
                EPHEMERAL_SYNC_RESPONSE = 4,
                HISTORY_SYNC_NOTIFICATION = 5,
                APP_STATE_SYNC_KEY_SHARE = 6,
                APP_STATE_SYNC_KEY_REQUEST = 7,
                MSG_FANOUT_BACKFILL_REQUEST = 8,
                INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC = 9,
                APP_STATE_FATAL_EXCEPTION_NOTIFICATION = 10,
                SHARE_PHONE_NUMBER = 11,
                MESSAGE_EDIT = 14,
                PEER_DATA_OPERATION_REQUEST_MESSAGE = 16,
                PEER_DATA_OPERATION_REQUEST_RESPONSE_MESSAGE = 17,
                REQUEST_WELCOME_MESSAGE = 18,
                BOT_FEEDBACK_MESSAGE = 19,
                MEDIA_NOTIFY_MESSAGE = 20,
                CLOUD_API_THREAD_CONTROL_NOTIFICATION = 21,
                LID_MIGRATION_MAPPING_SYNC = 22,
                REMINDER_MESSAGE = 23,
                BOT_MEMU_ONBOARDING_MESSAGE = 24,
                STATUS_MENTION_MESSAGE = 25,
                STOP_GENERATION_MESSAGE = 26,
                LIMIT_SHARING = 27,
                AI_PSI_METADATA = 28,
                AI_QUERY_FANOUT = 29,
                GROUP_MEMBER_LABEL_CHANGE = 30,
                AI_MEDIA_COLLECTION_MESSAGE = 31,
                MESSAGE_UNSCHEDULE = 32,
                CHAT_THEME_SETTING = 34,
                AI_METADATA_OPERATION = 35,
                MARK_AS_VERIFIED_ACTION = 36,
                COEX_STATE_SYNC = 37,
                ACP2_SETTING = 39,
                SHARED_DEVICE_CONTACT_HASH_KEY_SHARE = 40,
                SHARED_DEVICE_CONTACT_HASH_KEY_REQUEST = 41
            }
        }

        interface IQuestionResponseMessage extends E2E.Message.QuestionResponseMessage.$Properties {
        }

        class QuestionResponseMessage {
            constructor(p?: E2E.Message.QuestionResponseMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            text?: (string|null);
            static create(properties: E2E.Message.QuestionResponseMessage.$Shape): E2E.Message.QuestionResponseMessage & E2E.Message.QuestionResponseMessage.$Shape;
            static create(properties?: E2E.Message.QuestionResponseMessage.$Properties): E2E.Message.QuestionResponseMessage;
            static encode(m: E2E.Message.QuestionResponseMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.QuestionResponseMessage & E2E.Message.QuestionResponseMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.QuestionResponseMessage;
            static toObject(m: E2E.Message.QuestionResponseMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace QuestionResponseMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                text?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.QuestionResponseMessage.$Properties;
        }

        interface IReactionMessage extends E2E.Message.ReactionMessage.$Properties {
        }

        class ReactionMessage {
            constructor(p?: E2E.Message.ReactionMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            text?: (string|null);
            groupingKey?: (string|null);
            senderTimestampMs?: (number|Long|null);
            static create(properties: E2E.Message.ReactionMessage.$Shape): E2E.Message.ReactionMessage & E2E.Message.ReactionMessage.$Shape;
            static create(properties?: E2E.Message.ReactionMessage.$Properties): E2E.Message.ReactionMessage;
            static encode(m: E2E.Message.ReactionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ReactionMessage & E2E.Message.ReactionMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ReactionMessage;
            static toObject(m: E2E.Message.ReactionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ReactionMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                text?: (string|null);
                groupingKey?: (string|null);
                senderTimestampMs?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ReactionMessage.$Properties;
        }

        interface IRequestPaymentMessage extends E2E.Message.RequestPaymentMessage.$Properties {
        }

        class RequestPaymentMessage {
            constructor(p?: E2E.Message.RequestPaymentMessage.$Properties);
            $unknowns?: Uint8Array[];
            noteMessage?: (E2E.Message.$Properties|null);
            currencyCodeIso4217?: (string|null);
            amount1000?: (number|Long|null);
            requestFrom?: (string|null);
            expiryTimestamp?: (number|Long|null);
            amount?: (E2E.Money.$Properties|null);
            background?: (E2E.PaymentBackground.$Properties|null);
            static create(properties: E2E.Message.RequestPaymentMessage.$Shape): E2E.Message.RequestPaymentMessage & E2E.Message.RequestPaymentMessage.$Shape;
            static create(properties?: E2E.Message.RequestPaymentMessage.$Properties): E2E.Message.RequestPaymentMessage;
            static encode(m: E2E.Message.RequestPaymentMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.RequestPaymentMessage & E2E.Message.RequestPaymentMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.RequestPaymentMessage;
            static toObject(m: E2E.Message.RequestPaymentMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace RequestPaymentMessage {
            interface $Properties {
                noteMessage?: (E2E.Message.$Properties|null);
                currencyCodeIso4217?: (string|null);
                amount1000?: (number|Long|null);
                requestFrom?: (string|null);
                expiryTimestamp?: (number|Long|null);
                amount?: (E2E.Money.$Properties|null);
                background?: (E2E.PaymentBackground.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              noteMessage?: E2E.Message.$Shape|null;
              currencyCodeIso4217?: string|null;
              amount1000?: number|Long|null;
              requestFrom?: string|null;
              expiryTimestamp?: number|Long|null;
              amount?: E2E.Money.$Shape|null;
              background?: E2E.PaymentBackground.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IRequestPhoneNumberMessage extends E2E.Message.RequestPhoneNumberMessage.$Properties {
        }

        class RequestPhoneNumberMessage {
            constructor(p?: E2E.Message.RequestPhoneNumberMessage.$Properties);
            $unknowns?: Uint8Array[];
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.RequestPhoneNumberMessage.$Shape): E2E.Message.RequestPhoneNumberMessage & E2E.Message.RequestPhoneNumberMessage.$Shape;
            static create(properties?: E2E.Message.RequestPhoneNumberMessage.$Properties): E2E.Message.RequestPhoneNumberMessage;
            static encode(m: E2E.Message.RequestPhoneNumberMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.RequestPhoneNumberMessage & E2E.Message.RequestPhoneNumberMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.RequestPhoneNumberMessage;
            static toObject(m: E2E.Message.RequestPhoneNumberMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace RequestPhoneNumberMessage {
            interface $Properties {
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface IRequestWelcomeMessageMetadata extends E2E.Message.RequestWelcomeMessageMetadata.$Properties {
        }

        class RequestWelcomeMessageMetadata {
            constructor(p?: E2E.Message.RequestWelcomeMessageMetadata.$Properties);
            $unknowns?: Uint8Array[];
            localChatState?: (E2E.Message.RequestWelcomeMessageMetadata.LocalChatState|null);
            welcomeTrigger?: (E2E.Message.RequestWelcomeMessageMetadata.WelcomeTrigger|null);
            botAgentMetadata?: (AICommon.BotAgentMetadata.$Properties|null);
            static create(properties: E2E.Message.RequestWelcomeMessageMetadata.$Shape): E2E.Message.RequestWelcomeMessageMetadata & E2E.Message.RequestWelcomeMessageMetadata.$Shape;
            static create(properties?: E2E.Message.RequestWelcomeMessageMetadata.$Properties): E2E.Message.RequestWelcomeMessageMetadata;
            static encode(m: E2E.Message.RequestWelcomeMessageMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.RequestWelcomeMessageMetadata & E2E.Message.RequestWelcomeMessageMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.RequestWelcomeMessageMetadata;
            static toObject(m: E2E.Message.RequestWelcomeMessageMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace RequestWelcomeMessageMetadata {
            interface $Properties {
                localChatState?: (E2E.Message.RequestWelcomeMessageMetadata.LocalChatState|null);
                welcomeTrigger?: (E2E.Message.RequestWelcomeMessageMetadata.WelcomeTrigger|null);
                botAgentMetadata?: (AICommon.BotAgentMetadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.RequestWelcomeMessageMetadata.$Properties;

            enum LocalChatState {
                EMPTY = 0,
                NON_EMPTY = 1
            }

            enum WelcomeTrigger {
                CHAT_OPEN = 0,
                COMPANION_PAIRING = 1
            }
        }

        interface IRootSecretDistributeMessage extends E2E.Message.RootSecretDistributeMessage.$Properties {
        }

        class RootSecretDistributeMessage {
            constructor(p?: E2E.Message.RootSecretDistributeMessage.$Properties);
            $unknowns?: Uint8Array[];
            chatJid?: (string|null);
            static create(properties: E2E.Message.RootSecretDistributeMessage.$Shape): E2E.Message.RootSecretDistributeMessage & E2E.Message.RootSecretDistributeMessage.$Shape;
            static create(properties?: E2E.Message.RootSecretDistributeMessage.$Properties): E2E.Message.RootSecretDistributeMessage;
            static encode(m: E2E.Message.RootSecretDistributeMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.RootSecretDistributeMessage & E2E.Message.RootSecretDistributeMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.RootSecretDistributeMessage;
            static toObject(m: E2E.Message.RootSecretDistributeMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace RootSecretDistributeMessage {
            interface $Properties {
                chatJid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.RootSecretDistributeMessage.$Properties;
        }

        interface IScheduledCallCreationMessage extends E2E.Message.ScheduledCallCreationMessage.$Properties {
        }

        class ScheduledCallCreationMessage {
            constructor(p?: E2E.Message.ScheduledCallCreationMessage.$Properties);
            $unknowns?: Uint8Array[];
            scheduledTimestampMs?: (number|Long|null);
            callType?: (E2E.Message.ScheduledCallCreationMessage.CallType|null);
            title?: (string|null);
            static create(properties: E2E.Message.ScheduledCallCreationMessage.$Shape): E2E.Message.ScheduledCallCreationMessage & E2E.Message.ScheduledCallCreationMessage.$Shape;
            static create(properties?: E2E.Message.ScheduledCallCreationMessage.$Properties): E2E.Message.ScheduledCallCreationMessage;
            static encode(m: E2E.Message.ScheduledCallCreationMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ScheduledCallCreationMessage & E2E.Message.ScheduledCallCreationMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ScheduledCallCreationMessage;
            static toObject(m: E2E.Message.ScheduledCallCreationMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ScheduledCallCreationMessage {
            interface $Properties {
                scheduledTimestampMs?: (number|Long|null);
                callType?: (E2E.Message.ScheduledCallCreationMessage.CallType|null);
                title?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ScheduledCallCreationMessage.$Properties;

            enum CallType {
                UNKNOWN = 0,
                VOICE = 1,
                VIDEO = 2
            }
        }

        interface IScheduledCallEditMessage extends E2E.Message.ScheduledCallEditMessage.$Properties {
        }

        class ScheduledCallEditMessage {
            constructor(p?: E2E.Message.ScheduledCallEditMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            editType?: (E2E.Message.ScheduledCallEditMessage.EditType|null);
            static create(properties: E2E.Message.ScheduledCallEditMessage.$Shape): E2E.Message.ScheduledCallEditMessage & E2E.Message.ScheduledCallEditMessage.$Shape;
            static create(properties?: E2E.Message.ScheduledCallEditMessage.$Properties): E2E.Message.ScheduledCallEditMessage;
            static encode(m: E2E.Message.ScheduledCallEditMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.ScheduledCallEditMessage & E2E.Message.ScheduledCallEditMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.ScheduledCallEditMessage;
            static toObject(m: E2E.Message.ScheduledCallEditMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ScheduledCallEditMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                editType?: (E2E.Message.ScheduledCallEditMessage.EditType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.ScheduledCallEditMessage.$Properties;

            enum EditType {
                UNKNOWN = 0,
                CANCEL = 1
            }
        }

        interface ISecretEncryptedMessage extends E2E.Message.SecretEncryptedMessage.$Properties {
        }

        class SecretEncryptedMessage {
            constructor(p?: E2E.Message.SecretEncryptedMessage.$Properties);
            $unknowns?: Uint8Array[];
            targetMessageKey?: (Protocol.MessageKey.$Properties|null);
            encPayload?: (Uint8Array|null);
            encIv?: (Uint8Array|null);
            secretEncType?: (E2E.Message.SecretEncryptedMessage.SecretEncType|null);
            remoteKeyId?: (string|null);
            static create(properties: E2E.Message.SecretEncryptedMessage.$Shape): E2E.Message.SecretEncryptedMessage & E2E.Message.SecretEncryptedMessage.$Shape;
            static create(properties?: E2E.Message.SecretEncryptedMessage.$Properties): E2E.Message.SecretEncryptedMessage;
            static encode(m: E2E.Message.SecretEncryptedMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SecretEncryptedMessage & E2E.Message.SecretEncryptedMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SecretEncryptedMessage;
            static toObject(m: E2E.Message.SecretEncryptedMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SecretEncryptedMessage {
            interface $Properties {
                targetMessageKey?: (Protocol.MessageKey.$Properties|null);
                encPayload?: (Uint8Array|null);
                encIv?: (Uint8Array|null);
                secretEncType?: (E2E.Message.SecretEncryptedMessage.SecretEncType|null);
                remoteKeyId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.SecretEncryptedMessage.$Properties;

            enum SecretEncType {
                UNKNOWN = 0,
                EVENT_EDIT = 1,
                MESSAGE_EDIT = 2,
                MESSAGE_SCHEDULE = 3,
                POLL_EDIT = 4,
                POLL_ADD_OPTION = 5
            }
        }

        interface ISendPaymentMessage extends E2E.Message.SendPaymentMessage.$Properties {
        }

        class SendPaymentMessage {
            constructor(p?: E2E.Message.SendPaymentMessage.$Properties);
            $unknowns?: Uint8Array[];
            noteMessage?: (E2E.Message.$Properties|null);
            requestMessageKey?: (Protocol.MessageKey.$Properties|null);
            background?: (E2E.PaymentBackground.$Properties|null);
            transactionData?: (string|null);
            static create(properties: E2E.Message.SendPaymentMessage.$Shape): E2E.Message.SendPaymentMessage & E2E.Message.SendPaymentMessage.$Shape;
            static create(properties?: E2E.Message.SendPaymentMessage.$Properties): E2E.Message.SendPaymentMessage;
            static encode(m: E2E.Message.SendPaymentMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SendPaymentMessage & E2E.Message.SendPaymentMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SendPaymentMessage;
            static toObject(m: E2E.Message.SendPaymentMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SendPaymentMessage {
            interface $Properties {
                noteMessage?: (E2E.Message.$Properties|null);
                requestMessageKey?: (Protocol.MessageKey.$Properties|null);
                background?: (E2E.PaymentBackground.$Properties|null);
                transactionData?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              noteMessage?: E2E.Message.$Shape|null;
              requestMessageKey?: Protocol.MessageKey.$Shape|null;
              background?: E2E.PaymentBackground.$Shape|null;
              transactionData?: string|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface ISenderKeyDistributionMessage extends E2E.Message.SenderKeyDistributionMessage.$Properties {
        }

        class SenderKeyDistributionMessage {
            constructor(p?: E2E.Message.SenderKeyDistributionMessage.$Properties);
            $unknowns?: Uint8Array[];
            groupId?: (string|null);
            axolotlSenderKeyDistributionMessage?: (Uint8Array|null);
            static create(properties: E2E.Message.SenderKeyDistributionMessage.$Shape): E2E.Message.SenderKeyDistributionMessage & E2E.Message.SenderKeyDistributionMessage.$Shape;
            static create(properties?: E2E.Message.SenderKeyDistributionMessage.$Properties): E2E.Message.SenderKeyDistributionMessage;
            static encode(m: E2E.Message.SenderKeyDistributionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SenderKeyDistributionMessage & E2E.Message.SenderKeyDistributionMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SenderKeyDistributionMessage;
            static toObject(m: E2E.Message.SenderKeyDistributionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SenderKeyDistributionMessage {
            interface $Properties {
                groupId?: (string|null);
                axolotlSenderKeyDistributionMessage?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.SenderKeyDistributionMessage.$Properties;
        }

        interface ISharedDeviceContactHashKey extends E2E.Message.SharedDeviceContactHashKey.$Properties {
        }

        class SharedDeviceContactHashKey {
            constructor(p?: E2E.Message.SharedDeviceContactHashKey.$Properties);
            $unknowns?: Uint8Array[];
            epoch?: (number|null);
            kind?: (E2E.Message.SharedDeviceContactHashKey.Kind|null);
            keyData?: (Uint8Array|null);
            static create(properties: E2E.Message.SharedDeviceContactHashKey.$Shape): E2E.Message.SharedDeviceContactHashKey & E2E.Message.SharedDeviceContactHashKey.$Shape;
            static create(properties?: E2E.Message.SharedDeviceContactHashKey.$Properties): E2E.Message.SharedDeviceContactHashKey;
            static encode(m: E2E.Message.SharedDeviceContactHashKey.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SharedDeviceContactHashKey & E2E.Message.SharedDeviceContactHashKey.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SharedDeviceContactHashKey;
            static toObject(m: E2E.Message.SharedDeviceContactHashKey, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SharedDeviceContactHashKey {
            interface $Properties {
                epoch?: (number|null);
                kind?: (E2E.Message.SharedDeviceContactHashKey.Kind|null);
                keyData?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.SharedDeviceContactHashKey.$Properties;

            enum Kind {
                UNKNOWN = 0,
                LID = 1,
                PHONE_NUMBER = 2
            }
        }

        interface ISharedDeviceContactHashKeyRequest extends E2E.Message.SharedDeviceContactHashKeyRequest.$Properties {
        }

        class SharedDeviceContactHashKeyRequest {
            constructor(p?: E2E.Message.SharedDeviceContactHashKeyRequest.$Properties);
            $unknowns?: Uint8Array[];
            knownEpoch?: (number|null);
            static create(properties: E2E.Message.SharedDeviceContactHashKeyRequest.$Shape): E2E.Message.SharedDeviceContactHashKeyRequest & E2E.Message.SharedDeviceContactHashKeyRequest.$Shape;
            static create(properties?: E2E.Message.SharedDeviceContactHashKeyRequest.$Properties): E2E.Message.SharedDeviceContactHashKeyRequest;
            static encode(m: E2E.Message.SharedDeviceContactHashKeyRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SharedDeviceContactHashKeyRequest & E2E.Message.SharedDeviceContactHashKeyRequest.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SharedDeviceContactHashKeyRequest;
            static toObject(m: E2E.Message.SharedDeviceContactHashKeyRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SharedDeviceContactHashKeyRequest {
            interface $Properties {
                knownEpoch?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.SharedDeviceContactHashKeyRequest.$Properties;
        }

        interface ISharedDeviceContactHashKeyShare extends E2E.Message.SharedDeviceContactHashKeyShare.$Properties {
        }

        class SharedDeviceContactHashKeyShare {
            constructor(p?: E2E.Message.SharedDeviceContactHashKeyShare.$Properties);
            $unknowns?: Uint8Array[];
            keys: E2E.Message.SharedDeviceContactHashKey.$Properties[];
            static create(properties: E2E.Message.SharedDeviceContactHashKeyShare.$Shape): E2E.Message.SharedDeviceContactHashKeyShare & E2E.Message.SharedDeviceContactHashKeyShare.$Shape;
            static create(properties?: E2E.Message.SharedDeviceContactHashKeyShare.$Properties): E2E.Message.SharedDeviceContactHashKeyShare;
            static encode(m: E2E.Message.SharedDeviceContactHashKeyShare.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SharedDeviceContactHashKeyShare & E2E.Message.SharedDeviceContactHashKeyShare.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SharedDeviceContactHashKeyShare;
            static toObject(m: E2E.Message.SharedDeviceContactHashKeyShare, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SharedDeviceContactHashKeyShare {
            interface $Properties {
                keys?: (E2E.Message.SharedDeviceContactHashKey.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.SharedDeviceContactHashKeyShare.$Properties;
        }

        interface ISplitPaymentMessage extends E2E.Message.SplitPaymentMessage.$Properties {
        }

        class SplitPaymentMessage {
            constructor(p?: E2E.Message.SplitPaymentMessage.$Properties);
            $unknowns?: Uint8Array[];
            splitId?: (string|null);
            totalAmount?: (E2E.Money.$Properties|null);
            description?: (string|null);
            requesterJid?: (string|null);
            participants: E2E.Message.SplitPaymentParticipant.$Properties[];
            createdAtMs?: (number|Long|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            static create(properties: E2E.Message.SplitPaymentMessage.$Shape): E2E.Message.SplitPaymentMessage & E2E.Message.SplitPaymentMessage.$Shape;
            static create(properties?: E2E.Message.SplitPaymentMessage.$Properties): E2E.Message.SplitPaymentMessage;
            static encode(m: E2E.Message.SplitPaymentMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SplitPaymentMessage & E2E.Message.SplitPaymentMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SplitPaymentMessage;
            static toObject(m: E2E.Message.SplitPaymentMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SplitPaymentMessage {
            interface $Properties {
                splitId?: (string|null);
                totalAmount?: (E2E.Money.$Properties|null);
                description?: (string|null);
                requesterJid?: (string|null);
                participants?: (E2E.Message.SplitPaymentParticipant.$Properties[]|null);
                createdAtMs?: (number|Long|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              splitId?: string|null;
              totalAmount?: E2E.Money.$Shape|null;
              description?: string|null;
              requesterJid?: string|null;
              participants?: E2E.Message.SplitPaymentParticipant.$Shape[]|null;
              createdAtMs?: number|Long|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface ISplitPaymentParticipant extends E2E.Message.SplitPaymentParticipant.$Properties {
        }

        class SplitPaymentParticipant {
            constructor(p?: E2E.Message.SplitPaymentParticipant.$Properties);
            $unknowns?: Uint8Array[];
            jid?: (string|null);
            amount?: (E2E.Money.$Properties|null);
            status?: (E2E.Message.SplitPaymentParticipant.SplitPaymentStatus|null);
            static create(properties: E2E.Message.SplitPaymentParticipant.$Shape): E2E.Message.SplitPaymentParticipant & E2E.Message.SplitPaymentParticipant.$Shape;
            static create(properties?: E2E.Message.SplitPaymentParticipant.$Properties): E2E.Message.SplitPaymentParticipant;
            static encode(m: E2E.Message.SplitPaymentParticipant.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SplitPaymentParticipant & E2E.Message.SplitPaymentParticipant.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SplitPaymentParticipant;
            static toObject(m: E2E.Message.SplitPaymentParticipant, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SplitPaymentParticipant {
            interface $Properties {
                jid?: (string|null);
                amount?: (E2E.Money.$Properties|null);
                status?: (E2E.Message.SplitPaymentParticipant.SplitPaymentStatus|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.SplitPaymentParticipant.$Properties;

            enum SplitPaymentStatus {
                PENDING = 0,
                PAID = 1
            }
        }

        interface ISplitPaymentUpdateMessage extends E2E.Message.SplitPaymentUpdateMessage.$Properties {
        }

        class SplitPaymentUpdateMessage {
            constructor(p?: E2E.Message.SplitPaymentUpdateMessage.$Properties);
            $unknowns?: Uint8Array[];
            splitId?: (string|null);
            participantJid?: (string|null);
            static create(properties: E2E.Message.SplitPaymentUpdateMessage.$Shape): E2E.Message.SplitPaymentUpdateMessage & E2E.Message.SplitPaymentUpdateMessage.$Shape;
            static create(properties?: E2E.Message.SplitPaymentUpdateMessage.$Properties): E2E.Message.SplitPaymentUpdateMessage;
            static encode(m: E2E.Message.SplitPaymentUpdateMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.SplitPaymentUpdateMessage & E2E.Message.SplitPaymentUpdateMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.SplitPaymentUpdateMessage;
            static toObject(m: E2E.Message.SplitPaymentUpdateMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SplitPaymentUpdateMessage {
            interface $Properties {
                splitId?: (string|null);
                participantJid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.SplitPaymentUpdateMessage.$Properties;
        }

        interface IStatusLinkPreviewMetadata extends E2E.Message.StatusLinkPreviewMetadata.$Properties {
        }

        class StatusLinkPreviewMetadata {
            constructor(p?: E2E.Message.StatusLinkPreviewMetadata.$Properties);
            $unknowns?: Uint8Array[];
            style?: (E2E.Message.StatusLinkPreviewMetadata.Style|null);
            static create(properties: E2E.Message.StatusLinkPreviewMetadata.$Shape): E2E.Message.StatusLinkPreviewMetadata & E2E.Message.StatusLinkPreviewMetadata.$Shape;
            static create(properties?: E2E.Message.StatusLinkPreviewMetadata.$Properties): E2E.Message.StatusLinkPreviewMetadata;
            static encode(m: E2E.Message.StatusLinkPreviewMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StatusLinkPreviewMetadata & E2E.Message.StatusLinkPreviewMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StatusLinkPreviewMetadata;
            static toObject(m: E2E.Message.StatusLinkPreviewMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusLinkPreviewMetadata {
            interface $Properties {
                style?: (E2E.Message.StatusLinkPreviewMetadata.Style|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.StatusLinkPreviewMetadata.$Properties;

            enum Style {
                AUTO = 0,
                COMPACT = 1,
                FULL = 2,
                IMMERSIVE = 3
            }
        }

        interface IStatusNotificationMessage extends E2E.Message.StatusNotificationMessage.$Properties {
        }

        class StatusNotificationMessage {
            constructor(p?: E2E.Message.StatusNotificationMessage.$Properties);
            $unknowns?: Uint8Array[];
            responseMessageKey?: (Protocol.MessageKey.$Properties|null);
            originalMessageKey?: (Protocol.MessageKey.$Properties|null);
            type?: (E2E.Message.StatusNotificationMessage.StatusNotificationType|null);
            static create(properties: E2E.Message.StatusNotificationMessage.$Shape): E2E.Message.StatusNotificationMessage & E2E.Message.StatusNotificationMessage.$Shape;
            static create(properties?: E2E.Message.StatusNotificationMessage.$Properties): E2E.Message.StatusNotificationMessage;
            static encode(m: E2E.Message.StatusNotificationMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StatusNotificationMessage & E2E.Message.StatusNotificationMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StatusNotificationMessage;
            static toObject(m: E2E.Message.StatusNotificationMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusNotificationMessage {
            interface $Properties {
                responseMessageKey?: (Protocol.MessageKey.$Properties|null);
                originalMessageKey?: (Protocol.MessageKey.$Properties|null);
                type?: (E2E.Message.StatusNotificationMessage.StatusNotificationType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.StatusNotificationMessage.$Properties;

            enum StatusNotificationType {
                UNKNOWN = 0,
                STATUS_ADD_YOURS = 1,
                STATUS_RESHARE = 2,
                STATUS_QUESTION_ANSWER_RESHARE = 3,
                STATUS_GROUP_STATUS_REPLY = 4
            }
        }

        interface IStatusQuestionAnswerMessage extends E2E.Message.StatusQuestionAnswerMessage.$Properties {
        }

        class StatusQuestionAnswerMessage {
            constructor(p?: E2E.Message.StatusQuestionAnswerMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            text?: (string|null);
            static create(properties: E2E.Message.StatusQuestionAnswerMessage.$Shape): E2E.Message.StatusQuestionAnswerMessage & E2E.Message.StatusQuestionAnswerMessage.$Shape;
            static create(properties?: E2E.Message.StatusQuestionAnswerMessage.$Properties): E2E.Message.StatusQuestionAnswerMessage;
            static encode(m: E2E.Message.StatusQuestionAnswerMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StatusQuestionAnswerMessage & E2E.Message.StatusQuestionAnswerMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StatusQuestionAnswerMessage;
            static toObject(m: E2E.Message.StatusQuestionAnswerMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusQuestionAnswerMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                text?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.StatusQuestionAnswerMessage.$Properties;
        }

        interface IStatusQuotedMessage extends E2E.Message.StatusQuotedMessage.$Properties {
        }

        class StatusQuotedMessage {
            constructor(p?: E2E.Message.StatusQuotedMessage.$Properties);
            $unknowns?: Uint8Array[];
            type?: (E2E.Message.StatusQuotedMessage.StatusQuotedMessageType|null);
            text?: (string|null);
            thumbnail?: (Uint8Array|null);
            originalStatusId?: (Protocol.MessageKey.$Properties|null);
            static create(properties: E2E.Message.StatusQuotedMessage.$Shape): E2E.Message.StatusQuotedMessage & E2E.Message.StatusQuotedMessage.$Shape;
            static create(properties?: E2E.Message.StatusQuotedMessage.$Properties): E2E.Message.StatusQuotedMessage;
            static encode(m: E2E.Message.StatusQuotedMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StatusQuotedMessage & E2E.Message.StatusQuotedMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StatusQuotedMessage;
            static toObject(m: E2E.Message.StatusQuotedMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusQuotedMessage {
            interface $Properties {
                type?: (E2E.Message.StatusQuotedMessage.StatusQuotedMessageType|null);
                text?: (string|null);
                thumbnail?: (Uint8Array|null);
                originalStatusId?: (Protocol.MessageKey.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.StatusQuotedMessage.$Properties;

            enum StatusQuotedMessageType {
                QUESTION_ANSWER = 1
            }
        }

        interface IStatusStickerInteractionMessage extends E2E.Message.StatusStickerInteractionMessage.$Properties {
        }

        class StatusStickerInteractionMessage {
            constructor(p?: E2E.Message.StatusStickerInteractionMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            stickerKey?: (string|null);
            type?: (E2E.Message.StatusStickerInteractionMessage.StatusStickerType|null);
            static create(properties: E2E.Message.StatusStickerInteractionMessage.$Shape): E2E.Message.StatusStickerInteractionMessage & E2E.Message.StatusStickerInteractionMessage.$Shape;
            static create(properties?: E2E.Message.StatusStickerInteractionMessage.$Properties): E2E.Message.StatusStickerInteractionMessage;
            static encode(m: E2E.Message.StatusStickerInteractionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StatusStickerInteractionMessage & E2E.Message.StatusStickerInteractionMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StatusStickerInteractionMessage;
            static toObject(m: E2E.Message.StatusStickerInteractionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusStickerInteractionMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                stickerKey?: (string|null);
                type?: (E2E.Message.StatusStickerInteractionMessage.StatusStickerType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.StatusStickerInteractionMessage.$Properties;

            enum StatusStickerType {
                UNKNOWN = 0,
                REACTION = 1
            }
        }

        interface IStickerMessage extends E2E.Message.StickerMessage.$Properties {
        }

        class StickerMessage {
            constructor(p?: E2E.Message.StickerMessage.$Properties);
            $unknowns?: Uint8Array[];
            url?: (string|null);
            fileSha256?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            mediaKey?: (Uint8Array|null);
            mimetype?: (string|null);
            height?: (number|null);
            width?: (number|null);
            directPath?: (string|null);
            fileLength?: (number|Long|null);
            mediaKeyTimestamp?: (number|Long|null);
            firstFrameLength?: (number|null);
            firstFrameSidecar?: (Uint8Array|null);
            isAnimated?: (boolean|null);
            pngThumbnail?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            stickerSentTs?: (number|Long|null);
            isAvatar?: (boolean|null);
            isAiSticker?: (boolean|null);
            isLottie?: (boolean|null);
            accessibilityLabel?: (string|null);
            premium?: (number|null);
            emojis?: (string|null);
            audioMessage?: (E2E.Message.AudioMessage.$Properties|null);
            audio?: "audioMessage";
            static create(properties: E2E.Message.StickerMessage.$Shape): E2E.Message.StickerMessage & E2E.Message.StickerMessage.$Shape;
            static create(properties?: E2E.Message.StickerMessage.$Properties): E2E.Message.StickerMessage;
            static encode(m: E2E.Message.StickerMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StickerMessage & E2E.Message.StickerMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StickerMessage;
            static toObject(m: E2E.Message.StickerMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StickerMessage {
            interface $Properties {
                url?: (string|null);
                fileSha256?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                mediaKey?: (Uint8Array|null);
                mimetype?: (string|null);
                height?: (number|null);
                width?: (number|null);
                directPath?: (string|null);
                fileLength?: (number|Long|null);
                mediaKeyTimestamp?: (number|Long|null);
                firstFrameLength?: (number|null);
                firstFrameSidecar?: (Uint8Array|null);
                isAnimated?: (boolean|null);
                pngThumbnail?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                stickerSentTs?: (number|Long|null);
                isAvatar?: (boolean|null);
                isAiSticker?: (boolean|null);
                isLottie?: (boolean|null);
                accessibilityLabel?: (string|null);
                premium?: (number|null);
                emojis?: (string|null);
                audioMessage?: (E2E.Message.AudioMessage.$Properties|null);
                audio?: "audioMessage";
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              url?: string|null;
              fileSha256?: Uint8Array|null;
              fileEncSha256?: Uint8Array|null;
              mediaKey?: Uint8Array|null;
              mimetype?: string|null;
              height?: number|null;
              width?: number|null;
              directPath?: string|null;
              fileLength?: number|Long|null;
              mediaKeyTimestamp?: number|Long|null;
              firstFrameLength?: number|null;
              firstFrameSidecar?: Uint8Array|null;
              isAnimated?: boolean|null;
              pngThumbnail?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              stickerSentTs?: number|Long|null;
              isAvatar?: boolean|null;
              isAiSticker?: boolean|null;
              isLottie?: boolean|null;
              accessibilityLabel?: string|null;
              premium?: number|null;
              emojis?: string|null;
              audioMessage?: E2E.Message.AudioMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ audio?: undefined; audioMessage?: null }|{ audio?: "audioMessage"; audioMessage: E2E.Message.AudioMessage.$Shape })
            );
        }

        interface IStickerPackMessage extends E2E.Message.StickerPackMessage.$Properties {
        }

        class StickerPackMessage {
            constructor(p?: E2E.Message.StickerPackMessage.$Properties);
            $unknowns?: Uint8Array[];
            stickerPackId?: (string|null);
            name?: (string|null);
            publisher?: (string|null);
            stickers: E2E.Message.StickerPackMessage.Sticker.$Properties[];
            fileLength?: (number|Long|null);
            fileSha256?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            mediaKey?: (Uint8Array|null);
            directPath?: (string|null);
            caption?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            packDescription?: (string|null);
            mediaKeyTimestamp?: (number|Long|null);
            trayIconFileName?: (string|null);
            thumbnailDirectPath?: (string|null);
            thumbnailSha256?: (Uint8Array|null);
            thumbnailEncSha256?: (Uint8Array|null);
            thumbnailHeight?: (number|null);
            thumbnailWidth?: (number|null);
            imageDataHash?: (string|null);
            stickerPackSize?: (number|Long|null);
            stickerPackOrigin?: (E2E.Message.StickerPackMessage.StickerPackOrigin|null);
            static create(properties: E2E.Message.StickerPackMessage.$Shape): E2E.Message.StickerPackMessage & E2E.Message.StickerPackMessage.$Shape;
            static create(properties?: E2E.Message.StickerPackMessage.$Properties): E2E.Message.StickerPackMessage;
            static encode(m: E2E.Message.StickerPackMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StickerPackMessage & E2E.Message.StickerPackMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StickerPackMessage;
            static toObject(m: E2E.Message.StickerPackMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StickerPackMessage {
            interface $Properties {
                stickerPackId?: (string|null);
                name?: (string|null);
                publisher?: (string|null);
                stickers?: (E2E.Message.StickerPackMessage.Sticker.$Properties[]|null);
                fileLength?: (number|Long|null);
                fileSha256?: (Uint8Array|null);
                fileEncSha256?: (Uint8Array|null);
                mediaKey?: (Uint8Array|null);
                directPath?: (string|null);
                caption?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                packDescription?: (string|null);
                mediaKeyTimestamp?: (number|Long|null);
                trayIconFileName?: (string|null);
                thumbnailDirectPath?: (string|null);
                thumbnailSha256?: (Uint8Array|null);
                thumbnailEncSha256?: (Uint8Array|null);
                thumbnailHeight?: (number|null);
                thumbnailWidth?: (number|null);
                imageDataHash?: (string|null);
                stickerPackSize?: (number|Long|null);
                stickerPackOrigin?: (E2E.Message.StickerPackMessage.StickerPackOrigin|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              stickerPackId?: string|null;
              name?: string|null;
              publisher?: string|null;
              stickers?: E2E.Message.StickerPackMessage.Sticker.$Shape[]|null;
              fileLength?: number|Long|null;
              fileSha256?: Uint8Array|null;
              fileEncSha256?: Uint8Array|null;
              mediaKey?: Uint8Array|null;
              directPath?: string|null;
              caption?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              packDescription?: string|null;
              mediaKeyTimestamp?: number|Long|null;
              trayIconFileName?: string|null;
              thumbnailDirectPath?: string|null;
              thumbnailSha256?: Uint8Array|null;
              thumbnailEncSha256?: Uint8Array|null;
              thumbnailHeight?: number|null;
              thumbnailWidth?: number|null;
              imageDataHash?: string|null;
              stickerPackSize?: number|Long|null;
              stickerPackOrigin?: E2E.Message.StickerPackMessage.StickerPackOrigin|null;
              $unknowns?: Uint8Array[];
            };

            interface ISticker extends E2E.Message.StickerPackMessage.Sticker.$Properties {
            }

            class Sticker {
                constructor(p?: E2E.Message.StickerPackMessage.Sticker.$Properties);
                $unknowns?: Uint8Array[];
                fileName?: (string|null);
                isAnimated?: (boolean|null);
                emojis: string[];
                accessibilityLabel?: (string|null);
                isLottie?: (boolean|null);
                mimetype?: (string|null);
                premium?: (number|null);
                static create(properties: E2E.Message.StickerPackMessage.Sticker.$Shape): E2E.Message.StickerPackMessage.Sticker & E2E.Message.StickerPackMessage.Sticker.$Shape;
                static create(properties?: E2E.Message.StickerPackMessage.Sticker.$Properties): E2E.Message.StickerPackMessage.Sticker;
                static encode(m: E2E.Message.StickerPackMessage.Sticker.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StickerPackMessage.Sticker & E2E.Message.StickerPackMessage.Sticker.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.StickerPackMessage.Sticker;
                static toObject(m: E2E.Message.StickerPackMessage.Sticker, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Sticker {
                interface $Properties {
                    fileName?: (string|null);
                    isAnimated?: (boolean|null);
                    emojis?: (string[]|null);
                    accessibilityLabel?: (string|null);
                    isLottie?: (boolean|null);
                    mimetype?: (string|null);
                    premium?: (number|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = E2E.Message.StickerPackMessage.Sticker.$Properties;
            }

            enum StickerPackOrigin {
                FIRST_PARTY = 0,
                THIRD_PARTY = 1,
                USER_CREATED = 2
            }
        }

        interface IStickerSyncRMRMessage extends E2E.Message.StickerSyncRMRMessage.$Properties {
        }

        class StickerSyncRMRMessage {
            constructor(p?: E2E.Message.StickerSyncRMRMessage.$Properties);
            $unknowns?: Uint8Array[];
            filehash: string[];
            rmrSource?: (string|null);
            requestTimestamp?: (number|Long|null);
            static create(properties: E2E.Message.StickerSyncRMRMessage.$Shape): E2E.Message.StickerSyncRMRMessage & E2E.Message.StickerSyncRMRMessage.$Shape;
            static create(properties?: E2E.Message.StickerSyncRMRMessage.$Properties): E2E.Message.StickerSyncRMRMessage;
            static encode(m: E2E.Message.StickerSyncRMRMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.StickerSyncRMRMessage & E2E.Message.StickerSyncRMRMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.StickerSyncRMRMessage;
            static toObject(m: E2E.Message.StickerSyncRMRMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StickerSyncRMRMessage {
            interface $Properties {
                filehash?: (string[]|null);
                rmrSource?: (string|null);
                requestTimestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.StickerSyncRMRMessage.$Properties;
        }

        interface ITemplateButtonReplyMessage extends E2E.Message.TemplateButtonReplyMessage.$Properties {
        }

        class TemplateButtonReplyMessage {
            constructor(p?: E2E.Message.TemplateButtonReplyMessage.$Properties);
            $unknowns?: Uint8Array[];
            selectedId?: (string|null);
            selectedDisplayText?: (string|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            selectedIndex?: (number|null);
            selectedCarouselCardIndex?: (number|null);
            static create(properties: E2E.Message.TemplateButtonReplyMessage.$Shape): E2E.Message.TemplateButtonReplyMessage & E2E.Message.TemplateButtonReplyMessage.$Shape;
            static create(properties?: E2E.Message.TemplateButtonReplyMessage.$Properties): E2E.Message.TemplateButtonReplyMessage;
            static encode(m: E2E.Message.TemplateButtonReplyMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.TemplateButtonReplyMessage & E2E.Message.TemplateButtonReplyMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.TemplateButtonReplyMessage;
            static toObject(m: E2E.Message.TemplateButtonReplyMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TemplateButtonReplyMessage {
            interface $Properties {
                selectedId?: (string|null);
                selectedDisplayText?: (string|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                selectedIndex?: (number|null);
                selectedCarouselCardIndex?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              selectedId?: string|null;
              selectedDisplayText?: string|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              selectedIndex?: number|null;
              selectedCarouselCardIndex?: number|null;
              $unknowns?: Uint8Array[];
            };
        }

        interface ITemplateMessage extends E2E.Message.TemplateMessage.$Properties {
        }

        class TemplateMessage {
            constructor(p?: E2E.Message.TemplateMessage.$Properties);
            $unknowns?: Uint8Array[];
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            hydratedTemplate?: (E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties|null);
            templateId?: (string|null);
            fourRowTemplate?: (E2E.Message.TemplateMessage.FourRowTemplate.$Properties|null);
            hydratedFourRowTemplate?: (E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties|null);
            interactiveMessageTemplate?: (E2E.Message.InteractiveMessage.$Properties|null);
            format?: ("fourRowTemplate"|"hydratedFourRowTemplate"|"interactiveMessageTemplate");
            static create(properties: E2E.Message.TemplateMessage.$Shape): E2E.Message.TemplateMessage & E2E.Message.TemplateMessage.$Shape;
            static create(properties?: E2E.Message.TemplateMessage.$Properties): E2E.Message.TemplateMessage;
            static encode(m: E2E.Message.TemplateMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.TemplateMessage & E2E.Message.TemplateMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.TemplateMessage;
            static toObject(m: E2E.Message.TemplateMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TemplateMessage {
            interface $Properties {
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                hydratedTemplate?: (E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties|null);
                templateId?: (string|null);
                fourRowTemplate?: (E2E.Message.TemplateMessage.FourRowTemplate.$Properties|null);
                hydratedFourRowTemplate?: (E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties|null);
                interactiveMessageTemplate?: (E2E.Message.InteractiveMessage.$Properties|null);
                format?: ("fourRowTemplate"|"hydratedFourRowTemplate"|"interactiveMessageTemplate");
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              contextInfo?: E2E.ContextInfo.$Shape|null;
              hydratedTemplate?: E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Shape|null;
              templateId?: string|null;
              fourRowTemplate?: E2E.Message.TemplateMessage.FourRowTemplate.$Shape|null;
              hydratedFourRowTemplate?: E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Shape|null;
              interactiveMessageTemplate?: E2E.Message.InteractiveMessage.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ format?: undefined; fourRowTemplate?: null; hydratedFourRowTemplate?: null; interactiveMessageTemplate?: null }|{ format?: "fourRowTemplate"; fourRowTemplate: E2E.Message.TemplateMessage.FourRowTemplate.$Shape; hydratedFourRowTemplate?: null; interactiveMessageTemplate?: null }|{ format?: "hydratedFourRowTemplate"; fourRowTemplate?: null; hydratedFourRowTemplate: E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Shape; interactiveMessageTemplate?: null }|{ format?: "interactiveMessageTemplate"; fourRowTemplate?: null; hydratedFourRowTemplate?: null; interactiveMessageTemplate: E2E.Message.InteractiveMessage.$Shape })
            );

            interface IFourRowTemplate extends E2E.Message.TemplateMessage.FourRowTemplate.$Properties {
            }

            class FourRowTemplate {
                constructor(p?: E2E.Message.TemplateMessage.FourRowTemplate.$Properties);
                $unknowns?: Uint8Array[];
                content?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                footer?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                buttons: E2E.TemplateButton.$Properties[];
                documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
                highlyStructuredMessage?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
                videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
                locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
                title?: ("documentMessage"|"highlyStructuredMessage"|"imageMessage"|"videoMessage"|"locationMessage");
                static create(properties: E2E.Message.TemplateMessage.FourRowTemplate.$Shape): E2E.Message.TemplateMessage.FourRowTemplate & E2E.Message.TemplateMessage.FourRowTemplate.$Shape;
                static create(properties?: E2E.Message.TemplateMessage.FourRowTemplate.$Properties): E2E.Message.TemplateMessage.FourRowTemplate;
                static encode(m: E2E.Message.TemplateMessage.FourRowTemplate.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.TemplateMessage.FourRowTemplate & E2E.Message.TemplateMessage.FourRowTemplate.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.TemplateMessage.FourRowTemplate;
                static toObject(m: E2E.Message.TemplateMessage.FourRowTemplate, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace FourRowTemplate {
                interface $Properties {
                    content?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                    footer?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                    buttons?: (E2E.TemplateButton.$Properties[]|null);
                    documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
                    highlyStructuredMessage?: (E2E.Message.HighlyStructuredMessage.$Properties|null);
                    imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
                    videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
                    locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
                    title?: ("documentMessage"|"highlyStructuredMessage"|"imageMessage"|"videoMessage"|"locationMessage");
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  content?: E2E.Message.HighlyStructuredMessage.$Shape|null;
                  footer?: E2E.Message.HighlyStructuredMessage.$Shape|null;
                  buttons?: E2E.TemplateButton.$Shape[]|null;
                  documentMessage?: E2E.Message.DocumentMessage.$Shape|null;
                  highlyStructuredMessage?: E2E.Message.HighlyStructuredMessage.$Shape|null;
                  imageMessage?: E2E.Message.ImageMessage.$Shape|null;
                  videoMessage?: E2E.Message.VideoMessage.$Shape|null;
                  locationMessage?: E2E.Message.LocationMessage.$Shape|null;
                  $unknowns?: Uint8Array[];
                } & (
                  ({ title?: undefined; documentMessage?: null; highlyStructuredMessage?: null; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ title?: "documentMessage"; documentMessage: E2E.Message.DocumentMessage.$Shape; highlyStructuredMessage?: null; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ title?: "highlyStructuredMessage"; documentMessage?: null; highlyStructuredMessage: E2E.Message.HighlyStructuredMessage.$Shape; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ title?: "imageMessage"; documentMessage?: null; highlyStructuredMessage?: null; imageMessage: E2E.Message.ImageMessage.$Shape; videoMessage?: null; locationMessage?: null }|{ title?: "videoMessage"; documentMessage?: null; highlyStructuredMessage?: null; imageMessage?: null; videoMessage: E2E.Message.VideoMessage.$Shape; locationMessage?: null }|{ title?: "locationMessage"; documentMessage?: null; highlyStructuredMessage?: null; imageMessage?: null; videoMessage?: null; locationMessage: E2E.Message.LocationMessage.$Shape })
                );
            }

            interface IHydratedFourRowTemplate extends E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties {
            }

            class HydratedFourRowTemplate {
                constructor(p?: E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties);
                $unknowns?: Uint8Array[];
                hydratedContentText?: (string|null);
                hydratedFooterText?: (string|null);
                hydratedButtons: E2E.HydratedTemplateButton.$Properties[];
                templateId?: (string|null);
                maskLinkedDevices?: (boolean|null);
                documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
                hydratedTitleText?: (string|null);
                imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
                videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
                locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
                title?: ("documentMessage"|"hydratedTitleText"|"imageMessage"|"videoMessage"|"locationMessage");
                static create(properties: E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Shape): E2E.Message.TemplateMessage.HydratedFourRowTemplate & E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Shape;
                static create(properties?: E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties): E2E.Message.TemplateMessage.HydratedFourRowTemplate;
                static encode(m: E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.TemplateMessage.HydratedFourRowTemplate & E2E.Message.TemplateMessage.HydratedFourRowTemplate.$Shape;
                static fromObject(d: { [k: string]: any }): E2E.Message.TemplateMessage.HydratedFourRowTemplate;
                static toObject(m: E2E.Message.TemplateMessage.HydratedFourRowTemplate, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace HydratedFourRowTemplate {
                interface $Properties {
                    hydratedContentText?: (string|null);
                    hydratedFooterText?: (string|null);
                    hydratedButtons?: (E2E.HydratedTemplateButton.$Properties[]|null);
                    templateId?: (string|null);
                    maskLinkedDevices?: (boolean|null);
                    documentMessage?: (E2E.Message.DocumentMessage.$Properties|null);
                    hydratedTitleText?: (string|null);
                    imageMessage?: (E2E.Message.ImageMessage.$Properties|null);
                    videoMessage?: (E2E.Message.VideoMessage.$Properties|null);
                    locationMessage?: (E2E.Message.LocationMessage.$Properties|null);
                    title?: ("documentMessage"|"hydratedTitleText"|"imageMessage"|"videoMessage"|"locationMessage");
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  hydratedContentText?: string|null;
                  hydratedFooterText?: string|null;
                  hydratedButtons?: E2E.HydratedTemplateButton.$Shape[]|null;
                  templateId?: string|null;
                  maskLinkedDevices?: boolean|null;
                  documentMessage?: E2E.Message.DocumentMessage.$Shape|null;
                  hydratedTitleText?: string|null;
                  imageMessage?: E2E.Message.ImageMessage.$Shape|null;
                  videoMessage?: E2E.Message.VideoMessage.$Shape|null;
                  locationMessage?: E2E.Message.LocationMessage.$Shape|null;
                  $unknowns?: Uint8Array[];
                } & (
                  ({ title?: undefined; documentMessage?: null; hydratedTitleText?: null; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ title?: "documentMessage"; documentMessage: E2E.Message.DocumentMessage.$Shape; hydratedTitleText?: null; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ title?: "hydratedTitleText"; documentMessage?: null; hydratedTitleText: string; imageMessage?: null; videoMessage?: null; locationMessage?: null }|{ title?: "imageMessage"; documentMessage?: null; hydratedTitleText?: null; imageMessage: E2E.Message.ImageMessage.$Shape; videoMessage?: null; locationMessage?: null }|{ title?: "videoMessage"; documentMessage?: null; hydratedTitleText?: null; imageMessage?: null; videoMessage: E2E.Message.VideoMessage.$Shape; locationMessage?: null }|{ title?: "locationMessage"; documentMessage?: null; hydratedTitleText?: null; imageMessage?: null; videoMessage?: null; locationMessage: E2E.Message.LocationMessage.$Shape })
                );
            }
        }

        interface IURLMetadata extends E2E.Message.URLMetadata.$Properties {
        }

        class URLMetadata {
            constructor(p?: E2E.Message.URLMetadata.$Properties);
            $unknowns?: Uint8Array[];
            fbExperimentId?: (number|null);
            static create(properties: E2E.Message.URLMetadata.$Shape): E2E.Message.URLMetadata & E2E.Message.URLMetadata.$Shape;
            static create(properties?: E2E.Message.URLMetadata.$Properties): E2E.Message.URLMetadata;
            static encode(m: E2E.Message.URLMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.URLMetadata & E2E.Message.URLMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.URLMetadata;
            static toObject(m: E2E.Message.URLMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace URLMetadata {
            interface $Properties {
                fbExperimentId?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.URLMetadata.$Properties;
        }

        interface IVideoEndCard extends E2E.Message.VideoEndCard.$Properties {
        }

        class VideoEndCard {
            constructor(p?: E2E.Message.VideoEndCard.$Properties);
            $unknowns?: Uint8Array[];
            username?: (string|null);
            caption?: (string|null);
            thumbnailImageUrl?: (string|null);
            profilePictureUrl?: (string|null);
            static create(properties: E2E.Message.VideoEndCard.$Shape): E2E.Message.VideoEndCard & E2E.Message.VideoEndCard.$Shape;
            static create(properties?: E2E.Message.VideoEndCard.$Properties): E2E.Message.VideoEndCard;
            static encode(m: E2E.Message.VideoEndCard.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.VideoEndCard & E2E.Message.VideoEndCard.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.VideoEndCard;
            static toObject(m: E2E.Message.VideoEndCard, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace VideoEndCard {
            interface $Properties {
                username?: (string|null);
                caption?: (string|null);
                thumbnailImageUrl?: (string|null);
                profilePictureUrl?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = E2E.Message.VideoEndCard.$Properties;
        }

        interface IVideoMessage extends E2E.Message.VideoMessage.$Properties {
        }

        class VideoMessage {
            constructor(p?: E2E.Message.VideoMessage.$Properties);
            $unknowns?: Uint8Array[];
            url?: (string|null);
            mimetype?: (string|null);
            fileSha256?: (Uint8Array|null);
            fileLength?: (number|Long|null);
            seconds?: (number|null);
            mediaKey?: (Uint8Array|null);
            caption?: (string|null);
            gifPlayback?: (boolean|null);
            height?: (number|null);
            width?: (number|null);
            fileEncSha256?: (Uint8Array|null);
            interactiveAnnotations: E2E.InteractiveAnnotation.$Properties[];
            directPath?: (string|null);
            mediaKeyTimestamp?: (number|Long|null);
            jpegThumbnail?: (Uint8Array|null);
            contextInfo?: (E2E.ContextInfo.$Properties|null);
            streamingSidecar?: (Uint8Array|null);
            gifAttribution?: (E2E.Message.VideoMessage.Attribution|null);
            viewOnce?: (boolean|null);
            thumbnailDirectPath?: (string|null);
            thumbnailSha256?: (Uint8Array|null);
            thumbnailEncSha256?: (Uint8Array|null);
            staticUrl?: (string|null);
            annotations: E2E.InteractiveAnnotation.$Properties[];
            accessibilityLabel?: (string|null);
            processedVideos: E2E.ProcessedVideo.$Properties[];
            externalShareFullVideoDurationInSeconds?: (number|null);
            motionPhotoPresentationOffsetMs?: (number|Long|null);
            metadataUrl?: (string|null);
            videoSourceType?: (E2E.Message.VideoMessage.VideoSourceType|null);
            dashManifestUrl?: (string|null);
            static create(properties: E2E.Message.VideoMessage.$Shape): E2E.Message.VideoMessage & E2E.Message.VideoMessage.$Shape;
            static create(properties?: E2E.Message.VideoMessage.$Properties): E2E.Message.VideoMessage;
            static encode(m: E2E.Message.VideoMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): E2E.Message.VideoMessage & E2E.Message.VideoMessage.$Shape;
            static fromObject(d: { [k: string]: any }): E2E.Message.VideoMessage;
            static toObject(m: E2E.Message.VideoMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace VideoMessage {
            interface $Properties {
                url?: (string|null);
                mimetype?: (string|null);
                fileSha256?: (Uint8Array|null);
                fileLength?: (number|Long|null);
                seconds?: (number|null);
                mediaKey?: (Uint8Array|null);
                caption?: (string|null);
                gifPlayback?: (boolean|null);
                height?: (number|null);
                width?: (number|null);
                fileEncSha256?: (Uint8Array|null);
                interactiveAnnotations?: (E2E.InteractiveAnnotation.$Properties[]|null);
                directPath?: (string|null);
                mediaKeyTimestamp?: (number|Long|null);
                jpegThumbnail?: (Uint8Array|null);
                contextInfo?: (E2E.ContextInfo.$Properties|null);
                streamingSidecar?: (Uint8Array|null);
                gifAttribution?: (E2E.Message.VideoMessage.Attribution|null);
                viewOnce?: (boolean|null);
                thumbnailDirectPath?: (string|null);
                thumbnailSha256?: (Uint8Array|null);
                thumbnailEncSha256?: (Uint8Array|null);
                staticUrl?: (string|null);
                annotations?: (E2E.InteractiveAnnotation.$Properties[]|null);
                accessibilityLabel?: (string|null);
                processedVideos?: (E2E.ProcessedVideo.$Properties[]|null);
                externalShareFullVideoDurationInSeconds?: (number|null);
                motionPhotoPresentationOffsetMs?: (number|Long|null);
                metadataUrl?: (string|null);
                videoSourceType?: (E2E.Message.VideoMessage.VideoSourceType|null);
                dashManifestUrl?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              url?: string|null;
              mimetype?: string|null;
              fileSha256?: Uint8Array|null;
              fileLength?: number|Long|null;
              seconds?: number|null;
              mediaKey?: Uint8Array|null;
              caption?: string|null;
              gifPlayback?: boolean|null;
              height?: number|null;
              width?: number|null;
              fileEncSha256?: Uint8Array|null;
              interactiveAnnotations?: E2E.InteractiveAnnotation.$Shape[]|null;
              directPath?: string|null;
              mediaKeyTimestamp?: number|Long|null;
              jpegThumbnail?: Uint8Array|null;
              contextInfo?: E2E.ContextInfo.$Shape|null;
              streamingSidecar?: Uint8Array|null;
              gifAttribution?: E2E.Message.VideoMessage.Attribution|null;
              viewOnce?: boolean|null;
              thumbnailDirectPath?: string|null;
              thumbnailSha256?: Uint8Array|null;
              thumbnailEncSha256?: Uint8Array|null;
              staticUrl?: string|null;
              annotations?: E2E.InteractiveAnnotation.$Shape[]|null;
              accessibilityLabel?: string|null;
              processedVideos?: E2E.ProcessedVideo.$Shape[]|null;
              externalShareFullVideoDurationInSeconds?: number|null;
              motionPhotoPresentationOffsetMs?: number|Long|null;
              metadataUrl?: string|null;
              videoSourceType?: E2E.Message.VideoMessage.VideoSourceType|null;
              dashManifestUrl?: string|null;
              $unknowns?: Uint8Array[];
            };

            enum Attribution {
                NONE = 0,
                GIPHY = 1,
                TENOR = 2,
                KLIPY = 3
            }

            enum VideoSourceType {
                USER_VIDEO = 0,
                AI_GENERATED = 1
            }
        }
    }

    enum KeepType {
        UNKNOWN = 0,
        KEEP_FOR_ALL = 1,
        UNDO_KEEP_FOR_ALL = 2
    }

    enum WebLinkRenderConfig {
        WEBVIEW = 0,
        SYSTEM = 1
    }

    enum MediaKeyDomain {
        MEDIA_KEY_DOMAIN_UNKNOWN = 0,
        MEDIA_KEY_DOMAIN_E2EE = 1,
        MEDIA_KEY_DOMAIN_NON_E2EE = 2
    }
}

export namespace Protocol {

    interface IACP2Setting extends Protocol.ACP2Setting.$Properties {
    }

    class ACP2Setting {
        constructor(p?: Protocol.ACP2Setting.$Properties);
        $unknowns?: Uint8Array[];
        enabled?: (boolean|null);
        trigger?: (Protocol.LimitSharing.TriggerType|null);
        settingTimestamp?: (number|Long|null);
        initiatedByMe?: (boolean|null);
        static create(properties: Protocol.ACP2Setting.$Shape): Protocol.ACP2Setting & Protocol.ACP2Setting.$Shape;
        static create(properties?: Protocol.ACP2Setting.$Properties): Protocol.ACP2Setting;
        static encode(m: Protocol.ACP2Setting.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Protocol.ACP2Setting & Protocol.ACP2Setting.$Shape;
        static fromObject(d: { [k: string]: any }): Protocol.ACP2Setting;
        static toObject(m: Protocol.ACP2Setting, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ACP2Setting {
        interface $Properties {
            enabled?: (boolean|null);
            trigger?: (Protocol.LimitSharing.TriggerType|null);
            settingTimestamp?: (number|Long|null);
            initiatedByMe?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Protocol.ACP2Setting.$Properties;
    }

    interface ILimitSharing extends Protocol.LimitSharing.$Properties {
    }

    class LimitSharing {
        constructor(p?: Protocol.LimitSharing.$Properties);
        $unknowns?: Uint8Array[];
        sharingLimited?: (boolean|null);
        trigger?: (Protocol.LimitSharing.TriggerType|null);
        limitSharingSettingTimestamp?: (number|Long|null);
        initiatedByMe?: (boolean|null);
        static create(properties: Protocol.LimitSharing.$Shape): Protocol.LimitSharing & Protocol.LimitSharing.$Shape;
        static create(properties?: Protocol.LimitSharing.$Properties): Protocol.LimitSharing;
        static encode(m: Protocol.LimitSharing.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Protocol.LimitSharing & Protocol.LimitSharing.$Shape;
        static fromObject(d: { [k: string]: any }): Protocol.LimitSharing;
        static toObject(m: Protocol.LimitSharing, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace LimitSharing {
        interface $Properties {
            sharingLimited?: (boolean|null);
            trigger?: (Protocol.LimitSharing.TriggerType|null);
            limitSharingSettingTimestamp?: (number|Long|null);
            initiatedByMe?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Protocol.LimitSharing.$Properties;

        enum TriggerType {
            UNKNOWN = 0,
            CHAT_SETTING = 1,
            BIZ_SUPPORTS_FB_HOSTING = 2,
            UNKNOWN_GROUP = 3
        }
    }

    interface IMessageKey extends Protocol.MessageKey.$Properties {
    }

    class MessageKey {
        constructor(p?: Protocol.MessageKey.$Properties);
        $unknowns?: Uint8Array[];
        remoteJid?: (string|null);
        fromMe?: (boolean|null);
        id?: (string|null);
        participant?: (string|null);
        static create(properties: Protocol.MessageKey.$Shape): Protocol.MessageKey & Protocol.MessageKey.$Shape;
        static create(properties?: Protocol.MessageKey.$Properties): Protocol.MessageKey;
        static encode(m: Protocol.MessageKey.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Protocol.MessageKey & Protocol.MessageKey.$Shape;
        static fromObject(d: { [k: string]: any }): Protocol.MessageKey;
        static toObject(m: Protocol.MessageKey, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MessageKey {
        interface $Properties {
            remoteJid?: (string|null);
            fromMe?: (boolean|null);
            id?: (string|null);
            participant?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Protocol.MessageKey.$Properties;
    }
}

export namespace AICommonDeprecated {

    interface IAIRichResponseSubMessage extends AICommonDeprecated.AIRichResponseSubMessage.$Properties {
    }

    class AIRichResponseSubMessage {
        constructor(p?: AICommonDeprecated.AIRichResponseSubMessage.$Properties);
        $unknowns?: Uint8Array[];
        messageType?: (AICommonDeprecated.AIRichResponseSubMessageType|null);
        gridImageMetadata?: (AICommonDeprecated.AIRichResponseGridImageMetadata.$Properties|null);
        messageText?: (string|null);
        imageMetadata?: (AICommonDeprecated.AIRichResponseInlineImageMetadata.$Properties|null);
        codeMetadata?: (AICommonDeprecated.AIRichResponseCodeMetadata.$Properties|null);
        tableMetadata?: (AICommonDeprecated.AIRichResponseTableMetadata.$Properties|null);
        dynamicMetadata?: (AICommonDeprecated.AIRichResponseDynamicMetadata.$Properties|null);
        latexMetadata?: (AICommonDeprecated.AIRichResponseLatexMetadata.$Properties|null);
        mapMetadata?: (AICommonDeprecated.AIRichResponseMapMetadata.$Properties|null);
        contentItemsMetadata?: (AICommonDeprecated.AIRichResponseContentItemsMetadata.$Properties|null);
        static create(properties: AICommonDeprecated.AIRichResponseSubMessage.$Shape): AICommonDeprecated.AIRichResponseSubMessage & AICommonDeprecated.AIRichResponseSubMessage.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseSubMessage.$Properties): AICommonDeprecated.AIRichResponseSubMessage;
        static encode(m: AICommonDeprecated.AIRichResponseSubMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseSubMessage & AICommonDeprecated.AIRichResponseSubMessage.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseSubMessage;
        static toObject(m: AICommonDeprecated.AIRichResponseSubMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseSubMessage {
        interface $Properties {
            messageType?: (AICommonDeprecated.AIRichResponseSubMessageType|null);
            gridImageMetadata?: (AICommonDeprecated.AIRichResponseGridImageMetadata.$Properties|null);
            messageText?: (string|null);
            imageMetadata?: (AICommonDeprecated.AIRichResponseInlineImageMetadata.$Properties|null);
            codeMetadata?: (AICommonDeprecated.AIRichResponseCodeMetadata.$Properties|null);
            tableMetadata?: (AICommonDeprecated.AIRichResponseTableMetadata.$Properties|null);
            dynamicMetadata?: (AICommonDeprecated.AIRichResponseDynamicMetadata.$Properties|null);
            latexMetadata?: (AICommonDeprecated.AIRichResponseLatexMetadata.$Properties|null);
            mapMetadata?: (AICommonDeprecated.AIRichResponseMapMetadata.$Properties|null);
            contentItemsMetadata?: (AICommonDeprecated.AIRichResponseContentItemsMetadata.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          messageType?: AICommonDeprecated.AIRichResponseSubMessageType|null;
          gridImageMetadata?: AICommonDeprecated.AIRichResponseGridImageMetadata.$Shape|null;
          messageText?: string|null;
          imageMetadata?: AICommonDeprecated.AIRichResponseInlineImageMetadata.$Shape|null;
          codeMetadata?: AICommonDeprecated.AIRichResponseCodeMetadata.$Shape|null;
          tableMetadata?: AICommonDeprecated.AIRichResponseTableMetadata.$Shape|null;
          dynamicMetadata?: AICommonDeprecated.AIRichResponseDynamicMetadata.$Shape|null;
          latexMetadata?: AICommonDeprecated.AIRichResponseLatexMetadata.$Shape|null;
          mapMetadata?: AICommonDeprecated.AIRichResponseMapMetadata.$Shape|null;
          contentItemsMetadata?: AICommonDeprecated.AIRichResponseContentItemsMetadata.$Shape|null;
          $unknowns?: Uint8Array[];
        };
    }

    interface IAIRichResponseContentItemsMetadata extends AICommonDeprecated.AIRichResponseContentItemsMetadata.$Properties {
    }

    class AIRichResponseContentItemsMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseContentItemsMetadata.$Properties);
        $unknowns?: Uint8Array[];
        itemsMetadata: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Properties[];
        contentType?: (AICommonDeprecated.AIRichResponseContentItemsMetadata.ContentType|null);
        static create(properties: AICommonDeprecated.AIRichResponseContentItemsMetadata.$Shape): AICommonDeprecated.AIRichResponseContentItemsMetadata & AICommonDeprecated.AIRichResponseContentItemsMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseContentItemsMetadata.$Properties): AICommonDeprecated.AIRichResponseContentItemsMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseContentItemsMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseContentItemsMetadata & AICommonDeprecated.AIRichResponseContentItemsMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseContentItemsMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseContentItemsMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseContentItemsMetadata {
        interface $Properties {
            itemsMetadata?: (AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Properties[]|null);
            contentType?: (AICommonDeprecated.AIRichResponseContentItemsMetadata.ContentType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          itemsMetadata?: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Shape[]|null;
          contentType?: AICommonDeprecated.AIRichResponseContentItemsMetadata.ContentType|null;
          $unknowns?: Uint8Array[];
        };

        interface IAIRichResponseContentItemMetadata extends AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Properties {
        }

        class AIRichResponseContentItemMetadata {
            constructor(p?: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Properties);
            $unknowns?: Uint8Array[];
            reelItem?: (AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Properties|null);
            aiRichResponseContentItem?: "reelItem";
            static create(properties: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Shape): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata & AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Shape;
            static create(properties?: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Properties): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata;
            static encode(m: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata & AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata;
            static toObject(m: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIRichResponseContentItemMetadata {
            interface $Properties {
                reelItem?: (AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Properties|null);
                aiRichResponseContentItem?: "reelItem";
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              reelItem?: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ aiRichResponseContentItem?: undefined; reelItem?: null }|{ aiRichResponseContentItem?: "reelItem"; reelItem: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Shape })
            );
        }

        interface IAIRichResponseReelItem extends AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Properties {
        }

        class AIRichResponseReelItem {
            constructor(p?: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Properties);
            $unknowns?: Uint8Array[];
            title?: (string|null);
            profileIconUrl?: (string|null);
            thumbnailUrl?: (string|null);
            videoUrl?: (string|null);
            static create(properties: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Shape): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem & AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Shape;
            static create(properties?: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Properties): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem;
            static encode(m: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem & AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Shape;
            static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem;
            static toObject(m: AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIRichResponseReelItem {
            interface $Properties {
                title?: (string|null);
                profileIconUrl?: (string|null);
                thumbnailUrl?: (string|null);
                videoUrl?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.$Properties;
        }

        enum ContentType {
            DEFAULT = 0,
            CAROUSEL = 1
        }
    }

    interface IAIRichResponseMapMetadata extends AICommonDeprecated.AIRichResponseMapMetadata.$Properties {
    }

    class AIRichResponseMapMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseMapMetadata.$Properties);
        $unknowns?: Uint8Array[];
        centerLatitude?: (number|null);
        centerLongitude?: (number|null);
        latitudeDelta?: (number|null);
        longitudeDelta?: (number|null);
        annotations: AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Properties[];
        showInfoList?: (boolean|null);
        static create(properties: AICommonDeprecated.AIRichResponseMapMetadata.$Shape): AICommonDeprecated.AIRichResponseMapMetadata & AICommonDeprecated.AIRichResponseMapMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseMapMetadata.$Properties): AICommonDeprecated.AIRichResponseMapMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseMapMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseMapMetadata & AICommonDeprecated.AIRichResponseMapMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseMapMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseMapMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseMapMetadata {
        interface $Properties {
            centerLatitude?: (number|null);
            centerLongitude?: (number|null);
            latitudeDelta?: (number|null);
            longitudeDelta?: (number|null);
            annotations?: (AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Properties[]|null);
            showInfoList?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseMapMetadata.$Properties;

        interface IAIRichResponseMapAnnotation extends AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Properties {
        }

        class AIRichResponseMapAnnotation {
            constructor(p?: AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Properties);
            $unknowns?: Uint8Array[];
            annotationNumber?: (number|null);
            latitude?: (number|null);
            longitude?: (number|null);
            title?: (string|null);
            body?: (string|null);
            static create(properties: AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Shape): AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation & AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Shape;
            static create(properties?: AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Properties): AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation;
            static encode(m: AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation & AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Shape;
            static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation;
            static toObject(m: AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIRichResponseMapAnnotation {
            interface $Properties {
                annotationNumber?: (number|null);
                latitude?: (number|null);
                longitude?: (number|null);
                title?: (string|null);
                body?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.$Properties;
        }
    }

    interface IAIRichResponseLatexMetadata extends AICommonDeprecated.AIRichResponseLatexMetadata.$Properties {
    }

    class AIRichResponseLatexMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseLatexMetadata.$Properties);
        $unknowns?: Uint8Array[];
        text?: (string|null);
        expressions: AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Properties[];
        static create(properties: AICommonDeprecated.AIRichResponseLatexMetadata.$Shape): AICommonDeprecated.AIRichResponseLatexMetadata & AICommonDeprecated.AIRichResponseLatexMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseLatexMetadata.$Properties): AICommonDeprecated.AIRichResponseLatexMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseLatexMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseLatexMetadata & AICommonDeprecated.AIRichResponseLatexMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseLatexMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseLatexMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseLatexMetadata {
        interface $Properties {
            text?: (string|null);
            expressions?: (AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseLatexMetadata.$Properties;

        interface IAIRichResponseLatexExpression extends AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Properties {
        }

        class AIRichResponseLatexExpression {
            constructor(p?: AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Properties);
            $unknowns?: Uint8Array[];
            latexExpression?: (string|null);
            url?: (string|null);
            width?: (number|null);
            height?: (number|null);
            fontHeight?: (number|null);
            imageTopPadding?: (number|null);
            imageLeadingPadding?: (number|null);
            imageBottomPadding?: (number|null);
            imageTrailingPadding?: (number|null);
            static create(properties: AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Shape): AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression & AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Shape;
            static create(properties?: AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Properties): AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression;
            static encode(m: AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression & AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Shape;
            static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression;
            static toObject(m: AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIRichResponseLatexExpression {
            interface $Properties {
                latexExpression?: (string|null);
                url?: (string|null);
                width?: (number|null);
                height?: (number|null);
                fontHeight?: (number|null);
                imageTopPadding?: (number|null);
                imageLeadingPadding?: (number|null);
                imageBottomPadding?: (number|null);
                imageTrailingPadding?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.$Properties;
        }
    }

    interface IAIRichResponseDynamicMetadata extends AICommonDeprecated.AIRichResponseDynamicMetadata.$Properties {
    }

    class AIRichResponseDynamicMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseDynamicMetadata.$Properties);
        $unknowns?: Uint8Array[];
        type?: (AICommonDeprecated.AIRichResponseDynamicMetadata.AIRichResponseDynamicMetadataType|null);
        version?: (number|Long|null);
        url?: (string|null);
        loopCount?: (number|null);
        static create(properties: AICommonDeprecated.AIRichResponseDynamicMetadata.$Shape): AICommonDeprecated.AIRichResponseDynamicMetadata & AICommonDeprecated.AIRichResponseDynamicMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseDynamicMetadata.$Properties): AICommonDeprecated.AIRichResponseDynamicMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseDynamicMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseDynamicMetadata & AICommonDeprecated.AIRichResponseDynamicMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseDynamicMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseDynamicMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseDynamicMetadata {
        interface $Properties {
            type?: (AICommonDeprecated.AIRichResponseDynamicMetadata.AIRichResponseDynamicMetadataType|null);
            version?: (number|Long|null);
            url?: (string|null);
            loopCount?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseDynamicMetadata.$Properties;

        enum AIRichResponseDynamicMetadataType {
            AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_UNKNOWN = 0,
            AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_IMAGE = 1,
            AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF = 2
        }
    }

    interface IAIRichResponseTableMetadata extends AICommonDeprecated.AIRichResponseTableMetadata.$Properties {
    }

    class AIRichResponseTableMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseTableMetadata.$Properties);
        $unknowns?: Uint8Array[];
        rows: AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Properties[];
        title?: (string|null);
        static create(properties: AICommonDeprecated.AIRichResponseTableMetadata.$Shape): AICommonDeprecated.AIRichResponseTableMetadata & AICommonDeprecated.AIRichResponseTableMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseTableMetadata.$Properties): AICommonDeprecated.AIRichResponseTableMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseTableMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseTableMetadata & AICommonDeprecated.AIRichResponseTableMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseTableMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseTableMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseTableMetadata {
        interface $Properties {
            rows?: (AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Properties[]|null);
            title?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseTableMetadata.$Properties;

        interface IAIRichResponseTableRow extends AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Properties {
        }

        class AIRichResponseTableRow {
            constructor(p?: AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Properties);
            $unknowns?: Uint8Array[];
            items: string[];
            isHeading?: (boolean|null);
            static create(properties: AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Shape): AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow & AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Shape;
            static create(properties?: AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Properties): AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow;
            static encode(m: AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow & AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Shape;
            static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow;
            static toObject(m: AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIRichResponseTableRow {
            interface $Properties {
                items?: (string[]|null);
                isHeading?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.$Properties;
        }
    }

    interface IAIRichResponseCodeMetadata extends AICommonDeprecated.AIRichResponseCodeMetadata.$Properties {
    }

    class AIRichResponseCodeMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseCodeMetadata.$Properties);
        $unknowns?: Uint8Array[];
        codeLanguage?: (string|null);
        codeBlocks: AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Properties[];
        static create(properties: AICommonDeprecated.AIRichResponseCodeMetadata.$Shape): AICommonDeprecated.AIRichResponseCodeMetadata & AICommonDeprecated.AIRichResponseCodeMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseCodeMetadata.$Properties): AICommonDeprecated.AIRichResponseCodeMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseCodeMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseCodeMetadata & AICommonDeprecated.AIRichResponseCodeMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseCodeMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseCodeMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseCodeMetadata {
        interface $Properties {
            codeLanguage?: (string|null);
            codeBlocks?: (AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseCodeMetadata.$Properties;

        interface IAIRichResponseCodeBlock extends AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Properties {
        }

        class AIRichResponseCodeBlock {
            constructor(p?: AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Properties);
            $unknowns?: Uint8Array[];
            highlightType?: (AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType|null);
            codeContent?: (string|null);
            static create(properties: AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Shape): AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock & AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Shape;
            static create(properties?: AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Properties): AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock;
            static encode(m: AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock & AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Shape;
            static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock;
            static toObject(m: AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIRichResponseCodeBlock {
            interface $Properties {
                highlightType?: (AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType|null);
                codeContent?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.$Properties;
        }

        enum AIRichResponseCodeHighlightType {
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT = 0,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD = 1,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD = 2,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING = 3,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER = 4,
            AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT = 5
        }
    }

    interface IAIRichResponseInlineImageMetadata extends AICommonDeprecated.AIRichResponseInlineImageMetadata.$Properties {
    }

    class AIRichResponseInlineImageMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseInlineImageMetadata.$Properties);
        $unknowns?: Uint8Array[];
        imageUrl?: (AICommonDeprecated.AIRichResponseImageURL.$Properties|null);
        imageText?: (string|null);
        alignment?: (AICommonDeprecated.AIRichResponseInlineImageMetadata.AIRichResponseImageAlignment|null);
        tapLinkUrl?: (string|null);
        static create(properties: AICommonDeprecated.AIRichResponseInlineImageMetadata.$Shape): AICommonDeprecated.AIRichResponseInlineImageMetadata & AICommonDeprecated.AIRichResponseInlineImageMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseInlineImageMetadata.$Properties): AICommonDeprecated.AIRichResponseInlineImageMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseInlineImageMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseInlineImageMetadata & AICommonDeprecated.AIRichResponseInlineImageMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseInlineImageMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseInlineImageMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseInlineImageMetadata {
        interface $Properties {
            imageUrl?: (AICommonDeprecated.AIRichResponseImageURL.$Properties|null);
            imageText?: (string|null);
            alignment?: (AICommonDeprecated.AIRichResponseInlineImageMetadata.AIRichResponseImageAlignment|null);
            tapLinkUrl?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseInlineImageMetadata.$Properties;

        enum AIRichResponseImageAlignment {
            AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED = 0,
            AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED = 1,
            AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED = 2
        }
    }

    interface IAIRichResponseGridImageMetadata extends AICommonDeprecated.AIRichResponseGridImageMetadata.$Properties {
    }

    class AIRichResponseGridImageMetadata {
        constructor(p?: AICommonDeprecated.AIRichResponseGridImageMetadata.$Properties);
        $unknowns?: Uint8Array[];
        gridImageUrl?: (AICommonDeprecated.AIRichResponseImageURL.$Properties|null);
        imageUrls: AICommonDeprecated.AIRichResponseImageURL.$Properties[];
        static create(properties: AICommonDeprecated.AIRichResponseGridImageMetadata.$Shape): AICommonDeprecated.AIRichResponseGridImageMetadata & AICommonDeprecated.AIRichResponseGridImageMetadata.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseGridImageMetadata.$Properties): AICommonDeprecated.AIRichResponseGridImageMetadata;
        static encode(m: AICommonDeprecated.AIRichResponseGridImageMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseGridImageMetadata & AICommonDeprecated.AIRichResponseGridImageMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseGridImageMetadata;
        static toObject(m: AICommonDeprecated.AIRichResponseGridImageMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseGridImageMetadata {
        interface $Properties {
            gridImageUrl?: (AICommonDeprecated.AIRichResponseImageURL.$Properties|null);
            imageUrls?: (AICommonDeprecated.AIRichResponseImageURL.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseGridImageMetadata.$Properties;
    }

    interface IAIRichResponseImageURL extends AICommonDeprecated.AIRichResponseImageURL.$Properties {
    }

    class AIRichResponseImageURL {
        constructor(p?: AICommonDeprecated.AIRichResponseImageURL.$Properties);
        $unknowns?: Uint8Array[];
        imagePreviewUrl?: (string|null);
        imageHighResUrl?: (string|null);
        sourceUrl?: (string|null);
        static create(properties: AICommonDeprecated.AIRichResponseImageURL.$Shape): AICommonDeprecated.AIRichResponseImageURL & AICommonDeprecated.AIRichResponseImageURL.$Shape;
        static create(properties?: AICommonDeprecated.AIRichResponseImageURL.$Properties): AICommonDeprecated.AIRichResponseImageURL;
        static encode(m: AICommonDeprecated.AIRichResponseImageURL.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommonDeprecated.AIRichResponseImageURL & AICommonDeprecated.AIRichResponseImageURL.$Shape;
        static fromObject(d: { [k: string]: any }): AICommonDeprecated.AIRichResponseImageURL;
        static toObject(m: AICommonDeprecated.AIRichResponseImageURL, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseImageURL {
        interface $Properties {
            imagePreviewUrl?: (string|null);
            imageHighResUrl?: (string|null);
            sourceUrl?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommonDeprecated.AIRichResponseImageURL.$Properties;
    }

    enum AIRichResponseSubMessageType {
        AI_RICH_RESPONSE_UNKNOWN = 0,
        AI_RICH_RESPONSE_GRID_IMAGE = 1,
        AI_RICH_RESPONSE_TEXT = 2,
        AI_RICH_RESPONSE_INLINE_IMAGE = 3,
        AI_RICH_RESPONSE_TABLE = 4,
        AI_RICH_RESPONSE_CODE = 5,
        AI_RICH_RESPONSE_DYNAMIC = 6,
        AI_RICH_RESPONSE_MAP = 7,
        AI_RICH_RESPONSE_LATEX = 8,
        AI_RICH_RESPONSE_CONTENT_ITEMS = 9
    }

    enum AIRichResponseMessageType {
        AI_RICH_RESPONSE_TYPE_UNKNOWN = 0,
        AI_RICH_RESPONSE_TYPE_STANDARD = 1
    }
}

export namespace AICommon {

    interface IBizAIMetadataSync extends AICommon.BizAIMetadataSync.$Properties {
    }

    class BizAIMetadataSync {
        constructor(p?: AICommon.BizAIMetadataSync.$Properties);
        $unknowns?: Uint8Array[];
        serverEvent?: (AICommon.BizAIMetadataSync.ServerEvent.$Properties|null);
        operation?: "serverEvent";
        static create(properties: AICommon.BizAIMetadataSync.$Shape): AICommon.BizAIMetadataSync & AICommon.BizAIMetadataSync.$Shape;
        static create(properties?: AICommon.BizAIMetadataSync.$Properties): AICommon.BizAIMetadataSync;
        static encode(m: AICommon.BizAIMetadataSync.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BizAIMetadataSync & AICommon.BizAIMetadataSync.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BizAIMetadataSync;
        static toObject(m: AICommon.BizAIMetadataSync, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BizAIMetadataSync {
        interface $Properties {
            serverEvent?: (AICommon.BizAIMetadataSync.ServerEvent.$Properties|null);
            operation?: "serverEvent";
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          serverEvent?: AICommon.BizAIMetadataSync.ServerEvent.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ operation?: undefined; serverEvent?: null }|{ operation?: "serverEvent"; serverEvent: AICommon.BizAIMetadataSync.ServerEvent.$Shape })
        );

        interface IServerEvent extends AICommon.BizAIMetadataSync.ServerEvent.$Properties {
        }

        class ServerEvent {
            constructor(p?: AICommon.BizAIMetadataSync.ServerEvent.$Properties);
            $unknowns?: Uint8Array[];
            protocolEvent?: (AICommon.BizAIMetadataSync.ServerEvent.ProtocolEvent|null);
            agentOnboardingStarted?: (AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Properties|null);
            event?: ("protocolEvent"|"agentOnboardingStarted");
            static create(properties: AICommon.BizAIMetadataSync.ServerEvent.$Shape): AICommon.BizAIMetadataSync.ServerEvent & AICommon.BizAIMetadataSync.ServerEvent.$Shape;
            static create(properties?: AICommon.BizAIMetadataSync.ServerEvent.$Properties): AICommon.BizAIMetadataSync.ServerEvent;
            static encode(m: AICommon.BizAIMetadataSync.ServerEvent.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BizAIMetadataSync.ServerEvent & AICommon.BizAIMetadataSync.ServerEvent.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BizAIMetadataSync.ServerEvent;
            static toObject(m: AICommon.BizAIMetadataSync.ServerEvent, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ServerEvent {
            interface $Properties {
                protocolEvent?: (AICommon.BizAIMetadataSync.ServerEvent.ProtocolEvent|null);
                agentOnboardingStarted?: (AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Properties|null);
                event?: ("protocolEvent"|"agentOnboardingStarted");
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              protocolEvent?: AICommon.BizAIMetadataSync.ServerEvent.ProtocolEvent|null;
              agentOnboardingStarted?: AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Shape|null;
              $unknowns?: Uint8Array[];
            } & (
              ({ event?: undefined; protocolEvent?: null; agentOnboardingStarted?: null }|{ event?: "protocolEvent"; protocolEvent: AICommon.BizAIMetadataSync.ServerEvent.ProtocolEvent; agentOnboardingStarted?: null }|{ event?: "agentOnboardingStarted"; protocolEvent?: null; agentOnboardingStarted: AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Shape })
            );

            interface IAgentOnboardingStarted extends AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Properties {
            }

            class AgentOnboardingStarted {
                constructor(p?: AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Properties);
                $unknowns?: Uint8Array[];
                composerBlockDurationSecs?: (number|Long|null);
                static create(properties: AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Shape): AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted & AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Shape;
                static create(properties?: AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Properties): AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted;
                static encode(m: AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted & AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Shape;
                static fromObject(d: { [k: string]: any }): AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted;
                static toObject(m: AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace AgentOnboardingStarted {
                interface $Properties {
                    composerBlockDurationSecs?: (number|Long|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.$Properties;
            }

            enum ProtocolEvent {
                UNSPECIFIED = 0,
                AGENT_CHAT_READY = 1
            }
        }
    }

    interface IAIProvenance extends AICommon.AIProvenance.$Properties {
    }

    class AIProvenance {
        constructor(p?: AICommon.AIProvenance.$Properties);
        $unknowns?: Uint8Array[];
        c2PaMetadata?: (AICommon.AIProvenance.Metadata.$Properties|null);
        iptcMetadata?: (AICommon.AIProvenance.Metadata.$Properties|null);
        static create(properties: AICommon.AIProvenance.$Shape): AICommon.AIProvenance & AICommon.AIProvenance.$Shape;
        static create(properties?: AICommon.AIProvenance.$Properties): AICommon.AIProvenance;
        static encode(m: AICommon.AIProvenance.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIProvenance & AICommon.AIProvenance.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIProvenance;
        static toObject(m: AICommon.AIProvenance, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIProvenance {
        interface $Properties {
            c2PaMetadata?: (AICommon.AIProvenance.Metadata.$Properties|null);
            iptcMetadata?: (AICommon.AIProvenance.Metadata.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AIProvenance.$Properties;

        interface IMetadata extends AICommon.AIProvenance.Metadata.$Properties {
        }

        class Metadata {
            constructor(p?: AICommon.AIProvenance.Metadata.$Properties);
            $unknowns?: Uint8Array[];
            createdWithGenAi?: (boolean|null);
            editedWithGenAi?: (boolean|null);
            static create(properties: AICommon.AIProvenance.Metadata.$Shape): AICommon.AIProvenance.Metadata & AICommon.AIProvenance.Metadata.$Shape;
            static create(properties?: AICommon.AIProvenance.Metadata.$Properties): AICommon.AIProvenance.Metadata;
            static encode(m: AICommon.AIProvenance.Metadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIProvenance.Metadata & AICommon.AIProvenance.Metadata.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.AIProvenance.Metadata;
            static toObject(m: AICommon.AIProvenance.Metadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Metadata {
            interface $Properties {
                createdWithGenAi?: (boolean|null);
                editedWithGenAi?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.AIProvenance.Metadata.$Properties;
        }
    }

    interface IBotAgentDeepLinkMetadata extends AICommon.BotAgentDeepLinkMetadata.$Properties {
    }

    class BotAgentDeepLinkMetadata {
        constructor(p?: AICommon.BotAgentDeepLinkMetadata.$Properties);
        $unknowns?: Uint8Array[];
        token?: (string|null);
        clientPublicKey?: (Uint8Array|null);
        static create(properties: AICommon.BotAgentDeepLinkMetadata.$Shape): AICommon.BotAgentDeepLinkMetadata & AICommon.BotAgentDeepLinkMetadata.$Shape;
        static create(properties?: AICommon.BotAgentDeepLinkMetadata.$Properties): AICommon.BotAgentDeepLinkMetadata;
        static encode(m: AICommon.BotAgentDeepLinkMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotAgentDeepLinkMetadata & AICommon.BotAgentDeepLinkMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotAgentDeepLinkMetadata;
        static toObject(m: AICommon.BotAgentDeepLinkMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotAgentDeepLinkMetadata {
        interface $Properties {
            token?: (string|null);
            clientPublicKey?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotAgentDeepLinkMetadata.$Properties;
    }

    interface IBotAgentMetadata extends AICommon.BotAgentMetadata.$Properties {
    }

    class BotAgentMetadata {
        constructor(p?: AICommon.BotAgentMetadata.$Properties);
        $unknowns?: Uint8Array[];
        deepLinkMetadata?: (AICommon.BotAgentDeepLinkMetadata.$Properties|null);
        static create(properties: AICommon.BotAgentMetadata.$Shape): AICommon.BotAgentMetadata & AICommon.BotAgentMetadata.$Shape;
        static create(properties?: AICommon.BotAgentMetadata.$Properties): AICommon.BotAgentMetadata;
        static encode(m: AICommon.BotAgentMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotAgentMetadata & AICommon.BotAgentMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotAgentMetadata;
        static toObject(m: AICommon.BotAgentMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotAgentMetadata {
        interface $Properties {
            deepLinkMetadata?: (AICommon.BotAgentDeepLinkMetadata.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotAgentMetadata.$Properties;
    }

    interface IBotInfrastructureDiagnostics extends AICommon.BotInfrastructureDiagnostics.$Properties {
    }

    class BotInfrastructureDiagnostics {
        constructor(p?: AICommon.BotInfrastructureDiagnostics.$Properties);
        $unknowns?: Uint8Array[];
        botBackend?: (AICommon.BotInfrastructureDiagnostics.BotBackend|null);
        toolsUsed: string[];
        isThinking?: (boolean|null);
        static create(properties: AICommon.BotInfrastructureDiagnostics.$Shape): AICommon.BotInfrastructureDiagnostics & AICommon.BotInfrastructureDiagnostics.$Shape;
        static create(properties?: AICommon.BotInfrastructureDiagnostics.$Properties): AICommon.BotInfrastructureDiagnostics;
        static encode(m: AICommon.BotInfrastructureDiagnostics.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotInfrastructureDiagnostics & AICommon.BotInfrastructureDiagnostics.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotInfrastructureDiagnostics;
        static toObject(m: AICommon.BotInfrastructureDiagnostics, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotInfrastructureDiagnostics {
        interface $Properties {
            botBackend?: (AICommon.BotInfrastructureDiagnostics.BotBackend|null);
            toolsUsed?: (string[]|null);
            isThinking?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotInfrastructureDiagnostics.$Properties;

        enum BotBackend {
            AAPI = 0,
            CLIPPY = 1
        }
    }

    interface IAIHomeState extends AICommon.AIHomeState.$Properties {
    }

    class AIHomeState {
        constructor(p?: AICommon.AIHomeState.$Properties);
        $unknowns?: Uint8Array[];
        lastFetchTime?: (number|Long|null);
        capabilityOptions: AICommon.AIHomeState.AIHomeOption.$Properties[];
        conversationOptions: AICommon.AIHomeState.AIHomeOption.$Properties[];
        static create(properties: AICommon.AIHomeState.$Shape): AICommon.AIHomeState & AICommon.AIHomeState.$Shape;
        static create(properties?: AICommon.AIHomeState.$Properties): AICommon.AIHomeState;
        static encode(m: AICommon.AIHomeState.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIHomeState & AICommon.AIHomeState.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIHomeState;
        static toObject(m: AICommon.AIHomeState, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIHomeState {
        interface $Properties {
            lastFetchTime?: (number|Long|null);
            capabilityOptions?: (AICommon.AIHomeState.AIHomeOption.$Properties[]|null);
            conversationOptions?: (AICommon.AIHomeState.AIHomeOption.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AIHomeState.$Properties;

        interface IAIHomeOption extends AICommon.AIHomeState.AIHomeOption.$Properties {
        }

        class AIHomeOption {
            constructor(p?: AICommon.AIHomeState.AIHomeOption.$Properties);
            $unknowns?: Uint8Array[];
            type?: (AICommon.AIHomeState.AIHomeOption.AIHomeActionType|null);
            title?: (string|null);
            promptText?: (string|null);
            sessionId?: (string|null);
            imageWdsIdentifier?: (string|null);
            imageTintColor?: (string|null);
            imageBackgroundColor?: (string|null);
            cardTypeId?: (string|null);
            static create(properties: AICommon.AIHomeState.AIHomeOption.$Shape): AICommon.AIHomeState.AIHomeOption & AICommon.AIHomeState.AIHomeOption.$Shape;
            static create(properties?: AICommon.AIHomeState.AIHomeOption.$Properties): AICommon.AIHomeState.AIHomeOption;
            static encode(m: AICommon.AIHomeState.AIHomeOption.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIHomeState.AIHomeOption & AICommon.AIHomeState.AIHomeOption.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.AIHomeState.AIHomeOption;
            static toObject(m: AICommon.AIHomeState.AIHomeOption, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIHomeOption {
            interface $Properties {
                type?: (AICommon.AIHomeState.AIHomeOption.AIHomeActionType|null);
                title?: (string|null);
                promptText?: (string|null);
                sessionId?: (string|null);
                imageWdsIdentifier?: (string|null);
                imageTintColor?: (string|null);
                imageBackgroundColor?: (string|null);
                cardTypeId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.AIHomeState.AIHomeOption.$Properties;

            enum AIHomeActionType {
                PROMPT = 0,
                CREATE_IMAGE = 1,
                ANIMATE_PHOTO = 2,
                ANALYZE_FILE = 3,
                COLLABORATE = 4,
                OPEN_GREETING_CARD = 5
            }
        }
    }

    interface IBotDocumentMessageMetadata extends AICommon.BotDocumentMessageMetadata.$Properties {
    }

    class BotDocumentMessageMetadata {
        constructor(p?: AICommon.BotDocumentMessageMetadata.$Properties);
        $unknowns?: Uint8Array[];
        pluginType?: (AICommon.BotDocumentMessageMetadata.DocumentPluginType|null);
        static create(properties: AICommon.BotDocumentMessageMetadata.$Shape): AICommon.BotDocumentMessageMetadata & AICommon.BotDocumentMessageMetadata.$Shape;
        static create(properties?: AICommon.BotDocumentMessageMetadata.$Properties): AICommon.BotDocumentMessageMetadata;
        static encode(m: AICommon.BotDocumentMessageMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotDocumentMessageMetadata & AICommon.BotDocumentMessageMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotDocumentMessageMetadata;
        static toObject(m: AICommon.BotDocumentMessageMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotDocumentMessageMetadata {
        interface $Properties {
            pluginType?: (AICommon.BotDocumentMessageMetadata.DocumentPluginType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotDocumentMessageMetadata.$Properties;

        enum DocumentPluginType {
            TEXT_EXTRACTION = 0,
            OCR_AND_IMAGES = 1
        }
    }

    interface ISessionTransparencyMetadata extends AICommon.SessionTransparencyMetadata.$Properties {
    }

    class SessionTransparencyMetadata {
        constructor(p?: AICommon.SessionTransparencyMetadata.$Properties);
        $unknowns?: Uint8Array[];
        disclaimerText?: (string|null);
        hcaId?: (string|null);
        sessionTransparencyType?: (AICommon.SessionTransparencyType|null);
        static create(properties: AICommon.SessionTransparencyMetadata.$Shape): AICommon.SessionTransparencyMetadata & AICommon.SessionTransparencyMetadata.$Shape;
        static create(properties?: AICommon.SessionTransparencyMetadata.$Properties): AICommon.SessionTransparencyMetadata;
        static encode(m: AICommon.SessionTransparencyMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.SessionTransparencyMetadata & AICommon.SessionTransparencyMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.SessionTransparencyMetadata;
        static toObject(m: AICommon.SessionTransparencyMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SessionTransparencyMetadata {
        interface $Properties {
            disclaimerText?: (string|null);
            hcaId?: (string|null);
            sessionTransparencyType?: (AICommon.SessionTransparencyType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.SessionTransparencyMetadata.$Properties;
    }

    interface IAIRegenerateMetadata extends AICommon.AIRegenerateMetadata.$Properties {
    }

    class AIRegenerateMetadata {
        constructor(p?: AICommon.AIRegenerateMetadata.$Properties);
        $unknowns?: Uint8Array[];
        messageKey?: (Protocol.MessageKey.$Properties|null);
        responseTimestampMs?: (number|Long|null);
        static create(properties: AICommon.AIRegenerateMetadata.$Shape): AICommon.AIRegenerateMetadata & AICommon.AIRegenerateMetadata.$Shape;
        static create(properties?: AICommon.AIRegenerateMetadata.$Properties): AICommon.AIRegenerateMetadata;
        static encode(m: AICommon.AIRegenerateMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIRegenerateMetadata & AICommon.AIRegenerateMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIRegenerateMetadata;
        static toObject(m: AICommon.AIRegenerateMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRegenerateMetadata {
        interface $Properties {
            messageKey?: (Protocol.MessageKey.$Properties|null);
            responseTimestampMs?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AIRegenerateMetadata.$Properties;
    }

    interface IAIRichResponseUnifiedResponse extends AICommon.AIRichResponseUnifiedResponse.$Properties {
    }

    class AIRichResponseUnifiedResponse {
        constructor(p?: AICommon.AIRichResponseUnifiedResponse.$Properties);
        $unknowns?: Uint8Array[];
        data?: (Uint8Array|null);
        static create(properties: AICommon.AIRichResponseUnifiedResponse.$Shape): AICommon.AIRichResponseUnifiedResponse & AICommon.AIRichResponseUnifiedResponse.$Shape;
        static create(properties?: AICommon.AIRichResponseUnifiedResponse.$Properties): AICommon.AIRichResponseUnifiedResponse;
        static encode(m: AICommon.AIRichResponseUnifiedResponse.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIRichResponseUnifiedResponse & AICommon.AIRichResponseUnifiedResponse.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIRichResponseUnifiedResponse;
        static toObject(m: AICommon.AIRichResponseUnifiedResponse, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIRichResponseUnifiedResponse {
        interface $Properties {
            data?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AIRichResponseUnifiedResponse.$Properties;
    }

    interface IBotMessageSharingInfo extends AICommon.BotMessageSharingInfo.$Properties {
    }

    class BotMessageSharingInfo {
        constructor(p?: AICommon.BotMessageSharingInfo.$Properties);
        $unknowns?: Uint8Array[];
        botEntryPointOrigin?: (AICommon.BotMetricsEntryPoint|null);
        forwardScore?: (number|null);
        static create(properties: AICommon.BotMessageSharingInfo.$Shape): AICommon.BotMessageSharingInfo & AICommon.BotMessageSharingInfo.$Shape;
        static create(properties?: AICommon.BotMessageSharingInfo.$Properties): AICommon.BotMessageSharingInfo;
        static encode(m: AICommon.BotMessageSharingInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMessageSharingInfo & AICommon.BotMessageSharingInfo.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMessageSharingInfo;
        static toObject(m: AICommon.BotMessageSharingInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMessageSharingInfo {
        interface $Properties {
            botEntryPointOrigin?: (AICommon.BotMetricsEntryPoint|null);
            forwardScore?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMessageSharingInfo.$Properties;
    }

    interface IForwardedAIBotMessageInfo extends AICommon.ForwardedAIBotMessageInfo.$Properties {
    }

    class ForwardedAIBotMessageInfo {
        constructor(p?: AICommon.ForwardedAIBotMessageInfo.$Properties);
        $unknowns?: Uint8Array[];
        botName?: (string|null);
        botJid?: (string|null);
        creatorName?: (string|null);
        static create(properties: AICommon.ForwardedAIBotMessageInfo.$Shape): AICommon.ForwardedAIBotMessageInfo & AICommon.ForwardedAIBotMessageInfo.$Shape;
        static create(properties?: AICommon.ForwardedAIBotMessageInfo.$Properties): AICommon.ForwardedAIBotMessageInfo;
        static encode(m: AICommon.ForwardedAIBotMessageInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.ForwardedAIBotMessageInfo & AICommon.ForwardedAIBotMessageInfo.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.ForwardedAIBotMessageInfo;
        static toObject(m: AICommon.ForwardedAIBotMessageInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ForwardedAIBotMessageInfo {
        interface $Properties {
            botName?: (string|null);
            botJid?: (string|null);
            creatorName?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.ForwardedAIBotMessageInfo.$Properties;
    }

    interface IBotFeedbackMessage extends AICommon.BotFeedbackMessage.$Properties {
    }

    class BotFeedbackMessage {
        constructor(p?: AICommon.BotFeedbackMessage.$Properties);
        $unknowns?: Uint8Array[];
        messageKey?: (Protocol.MessageKey.$Properties|null);
        kind?: (AICommon.BotFeedbackMessage.BotFeedbackKind|null);
        text?: (string|null);
        kindNegative?: (number|Long|null);
        kindPositive?: (number|Long|null);
        kindReport?: (AICommon.BotFeedbackMessage.ReportKind|null);
        sideBySideSurveyMetadata?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Properties|null);
        static create(properties: AICommon.BotFeedbackMessage.$Shape): AICommon.BotFeedbackMessage & AICommon.BotFeedbackMessage.$Shape;
        static create(properties?: AICommon.BotFeedbackMessage.$Properties): AICommon.BotFeedbackMessage;
        static encode(m: AICommon.BotFeedbackMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage & AICommon.BotFeedbackMessage.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage;
        static toObject(m: AICommon.BotFeedbackMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotFeedbackMessage {
        interface $Properties {
            messageKey?: (Protocol.MessageKey.$Properties|null);
            kind?: (AICommon.BotFeedbackMessage.BotFeedbackKind|null);
            text?: (string|null);
            kindNegative?: (number|Long|null);
            kindPositive?: (number|Long|null);
            kindReport?: (AICommon.BotFeedbackMessage.ReportKind|null);
            sideBySideSurveyMetadata?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotFeedbackMessage.$Properties;

        enum BotFeedbackKind {
            BOT_FEEDBACK_POSITIVE = 0,
            BOT_FEEDBACK_NEGATIVE_GENERIC = 1,
            BOT_FEEDBACK_NEGATIVE_HELPFUL = 2,
            BOT_FEEDBACK_NEGATIVE_INTERESTING = 3,
            BOT_FEEDBACK_NEGATIVE_ACCURATE = 4,
            BOT_FEEDBACK_NEGATIVE_SAFE = 5,
            BOT_FEEDBACK_NEGATIVE_OTHER = 6,
            BOT_FEEDBACK_NEGATIVE_REFUSED = 7,
            BOT_FEEDBACK_NEGATIVE_NOT_VISUALLY_APPEALING = 8,
            BOT_FEEDBACK_NEGATIVE_NOT_RELEVANT_TO_TEXT = 9,
            BOT_FEEDBACK_NEGATIVE_PERSONALIZED = 10,
            BOT_FEEDBACK_NEGATIVE_CLARITY = 11,
            BOT_FEEDBACK_NEGATIVE_DOESNT_LOOK_LIKE_THE_PERSON = 12,
            BOT_FEEDBACK_NEGATIVE_HALLUCINATION_INTERNAL_ONLY = 13,
            BOT_FEEDBACK_NEGATIVE = 14
        }

        enum BotFeedbackKindMultipleNegative {
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_GENERIC = 1,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_HELPFUL = 2,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_INTERESTING = 4,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_ACCURATE = 8,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_SAFE = 16,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_OTHER = 32,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_REFUSED = 64,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_VISUALLY_APPEALING = 128,
            BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_RELEVANT_TO_TEXT = 256
        }

        enum BotFeedbackKindMultiplePositive {
            BOT_FEEDBACK_MULTIPLE_POSITIVE_GENERIC = 1
        }

        enum ReportKind {
            NONE = 0,
            GENERIC = 1
        }

        interface ISideBySideSurveyMetadata extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Properties {
        }

        class SideBySideSurveyMetadata {
            constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Properties);
            $unknowns?: Uint8Array[];
            selectedRequestId?: (string|null);
            surveyId?: (number|null);
            simonSessionFbid?: (string|null);
            responseOtid?: (string|null);
            responseTimestampMsString?: (string|null);
            isSelectedResponsePrimary?: (boolean|null);
            messageIdToEdit?: (string|null);
            analyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Properties|null);
            metaAiAnalyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Properties|null);
            static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Shape;
            static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata;
            static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata;
            static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SideBySideSurveyMetadata {
            interface $Properties {
                selectedRequestId?: (string|null);
                surveyId?: (number|null);
                simonSessionFbid?: (string|null);
                responseOtid?: (string|null);
                responseTimestampMsString?: (string|null);
                isSelectedResponsePrimary?: (boolean|null);
                messageIdToEdit?: (string|null);
                analyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Properties|null);
                metaAiAnalyticsData?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.$Properties;

            interface ISideBySideSurveyAnalyticsData extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Properties {
            }

            class SideBySideSurveyAnalyticsData {
                constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Properties);
                $unknowns?: Uint8Array[];
                tessaEvent?: (string|null);
                tessaSessionFbid?: (string|null);
                simonSessionFbid?: (string|null);
                static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Shape;
                static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData;
                static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Shape;
                static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData;
                static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace SideBySideSurveyAnalyticsData {
                interface $Properties {
                    tessaEvent?: (string|null);
                    tessaSessionFbid?: (string|null);
                    simonSessionFbid?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.$Properties;
            }

            interface ISidebySideSurveyMetaAiAnalyticsData extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Properties {
            }

            class SidebySideSurveyMetaAiAnalyticsData {
                constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Properties);
                $unknowns?: Uint8Array[];
                surveyId?: (number|null);
                primaryResponseId?: (string|null);
                testArmName?: (string|null);
                timestampMsString?: (string|null);
                ctaImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Properties|null);
                ctaClickEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Properties|null);
                cardImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Properties|null);
                responseEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Properties|null);
                abandonEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Properties|null);
                static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Shape;
                static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData;
                static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Shape;
                static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData;
                static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace SidebySideSurveyMetaAiAnalyticsData {
                interface $Properties {
                    surveyId?: (number|null);
                    primaryResponseId?: (string|null);
                    testArmName?: (string|null);
                    timestampMsString?: (string|null);
                    ctaImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Properties|null);
                    ctaClickEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Properties|null);
                    cardImpressionEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Properties|null);
                    responseEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Properties|null);
                    abandonEvent?: (AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Properties|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.$Properties;

                interface ISideBySideSurveyAbandonEventData extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Properties {
                }

                class SideBySideSurveyAbandonEventData {
                    constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Properties);
                    $unknowns?: Uint8Array[];
                    abandonDwellTimeMsString?: (string|null);
                    static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Shape;
                    static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData;
                    static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Shape;
                    static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData;
                    static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace SideBySideSurveyAbandonEventData {
                    interface $Properties {
                        abandonDwellTimeMsString?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.$Properties;
                }

                interface ISideBySideSurveyCTAClickEventData extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Properties {
                }

                class SideBySideSurveyCTAClickEventData {
                    constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Properties);
                    $unknowns?: Uint8Array[];
                    isSurveyExpired?: (boolean|null);
                    clickDwellTimeMsString?: (string|null);
                    static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Shape;
                    static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData;
                    static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Shape;
                    static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData;
                    static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace SideBySideSurveyCTAClickEventData {
                    interface $Properties {
                        isSurveyExpired?: (boolean|null);
                        clickDwellTimeMsString?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.$Properties;
                }

                interface ISideBySideSurveyCTAImpressionEventData extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Properties {
                }

                class SideBySideSurveyCTAImpressionEventData {
                    constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Properties);
                    $unknowns?: Uint8Array[];
                    isSurveyExpired?: (boolean|null);
                    static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Shape;
                    static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData;
                    static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Shape;
                    static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData;
                    static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace SideBySideSurveyCTAImpressionEventData {
                    interface $Properties {
                        isSurveyExpired?: (boolean|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.$Properties;
                }

                interface ISideBySideSurveyCardImpressionEventData extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Properties {
                }

                class SideBySideSurveyCardImpressionEventData {
                    constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Properties);
                    $unknowns?: Uint8Array[];
                    static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Shape;
                    static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData;
                    static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Shape;
                    static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData;
                    static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace SideBySideSurveyCardImpressionEventData {
                    interface $Properties {
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.$Properties;
                }

                interface ISideBySideSurveyResponseEventData extends AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Properties {
                }

                class SideBySideSurveyResponseEventData {
                    constructor(p?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Properties);
                    $unknowns?: Uint8Array[];
                    responseDwellTimeMsString?: (string|null);
                    selectedResponseId?: (string|null);
                    static create(properties: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Shape): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Shape;
                    static create(properties?: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Properties): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData;
                    static encode(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                    static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData & AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Shape;
                    static fromObject(d: { [k: string]: any }): AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData;
                    static toObject(m: AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData, o?: $protobuf.IConversionOptions): { [k: string]: any };
                    toJSON(): { [k: string]: any };
                    static getTypeUrl(prefix?: string): string;
                }

                namespace SideBySideSurveyResponseEventData {
                    interface $Properties {
                        responseDwellTimeMsString?: (string|null);
                        selectedResponseId?: (string|null);
                        $unknowns?: Uint8Array[];
                    }
                    type $Shape = AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.$Properties;
                }
            }
        }
    }

    interface IBotGroupParticipantMetadata extends AICommon.BotGroupParticipantMetadata.$Properties {
    }

    class BotGroupParticipantMetadata {
        constructor(p?: AICommon.BotGroupParticipantMetadata.$Properties);
        $unknowns?: Uint8Array[];
        botFbid?: (string|null);
        static create(properties: AICommon.BotGroupParticipantMetadata.$Shape): AICommon.BotGroupParticipantMetadata & AICommon.BotGroupParticipantMetadata.$Shape;
        static create(properties?: AICommon.BotGroupParticipantMetadata.$Properties): AICommon.BotGroupParticipantMetadata;
        static encode(m: AICommon.BotGroupParticipantMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotGroupParticipantMetadata & AICommon.BotGroupParticipantMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotGroupParticipantMetadata;
        static toObject(m: AICommon.BotGroupParticipantMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotGroupParticipantMetadata {
        interface $Properties {
            botFbid?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotGroupParticipantMetadata.$Properties;
    }

    interface IBotRenderingConfigMetadata extends AICommon.BotRenderingConfigMetadata.$Properties {
    }

    class BotRenderingConfigMetadata {
        constructor(p?: AICommon.BotRenderingConfigMetadata.$Properties);
        $unknowns?: Uint8Array[];
        bloksVersioningId?: (string|null);
        pixelDensity?: (number|null);
        static create(properties: AICommon.BotRenderingConfigMetadata.$Shape): AICommon.BotRenderingConfigMetadata & AICommon.BotRenderingConfigMetadata.$Shape;
        static create(properties?: AICommon.BotRenderingConfigMetadata.$Properties): AICommon.BotRenderingConfigMetadata;
        static encode(m: AICommon.BotRenderingConfigMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotRenderingConfigMetadata & AICommon.BotRenderingConfigMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotRenderingConfigMetadata;
        static toObject(m: AICommon.BotRenderingConfigMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotRenderingConfigMetadata {
        interface $Properties {
            bloksVersioningId?: (string|null);
            pixelDensity?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotRenderingConfigMetadata.$Properties;
    }

    interface IBotHistoryShareMetadata extends AICommon.BotHistoryShareMetadata.$Properties {
    }

    class BotHistoryShareMetadata {
        constructor(p?: AICommon.BotHistoryShareMetadata.$Properties);
        $unknowns?: Uint8Array[];
        participantsMetadata: AICommon.BotGroupParticipantMetadata.$Properties[];
        static create(properties: AICommon.BotHistoryShareMetadata.$Shape): AICommon.BotHistoryShareMetadata & AICommon.BotHistoryShareMetadata.$Shape;
        static create(properties?: AICommon.BotHistoryShareMetadata.$Properties): AICommon.BotHistoryShareMetadata;
        static encode(m: AICommon.BotHistoryShareMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotHistoryShareMetadata & AICommon.BotHistoryShareMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotHistoryShareMetadata;
        static toObject(m: AICommon.BotHistoryShareMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotHistoryShareMetadata {
        interface $Properties {
            participantsMetadata?: (AICommon.BotGroupParticipantMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotHistoryShareMetadata.$Properties;
    }

    interface IBotGroupMetadata extends AICommon.BotGroupMetadata.$Properties {
    }

    class BotGroupMetadata {
        constructor(p?: AICommon.BotGroupMetadata.$Properties);
        $unknowns?: Uint8Array[];
        participantsMetadata: AICommon.BotGroupParticipantMetadata.$Properties[];
        static create(properties: AICommon.BotGroupMetadata.$Shape): AICommon.BotGroupMetadata & AICommon.BotGroupMetadata.$Shape;
        static create(properties?: AICommon.BotGroupMetadata.$Properties): AICommon.BotGroupMetadata;
        static encode(m: AICommon.BotGroupMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotGroupMetadata & AICommon.BotGroupMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotGroupMetadata;
        static toObject(m: AICommon.BotGroupMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotGroupMetadata {
        interface $Properties {
            participantsMetadata?: (AICommon.BotGroupParticipantMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotGroupMetadata.$Properties;
    }

    interface IAISubscriptionUpsellMetadata extends AICommon.AISubscriptionUpsellMetadata.$Properties {
    }

    class AISubscriptionUpsellMetadata {
        constructor(p?: AICommon.AISubscriptionUpsellMetadata.$Properties);
        $unknowns?: Uint8Array[];
        requestType?: (AICommon.AISubscriptionRequestType|null);
        static create(properties: AICommon.AISubscriptionUpsellMetadata.$Shape): AICommon.AISubscriptionUpsellMetadata & AICommon.AISubscriptionUpsellMetadata.$Shape;
        static create(properties?: AICommon.AISubscriptionUpsellMetadata.$Properties): AICommon.AISubscriptionUpsellMetadata;
        static encode(m: AICommon.AISubscriptionUpsellMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AISubscriptionUpsellMetadata & AICommon.AISubscriptionUpsellMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AISubscriptionUpsellMetadata;
        static toObject(m: AICommon.AISubscriptionUpsellMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AISubscriptionUpsellMetadata {
        interface $Properties {
            requestType?: (AICommon.AISubscriptionRequestType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AISubscriptionUpsellMetadata.$Properties;
    }

    interface IBotMetadata extends AICommon.BotMetadata.$Properties {
    }

    class BotMetadata {
        constructor(p?: AICommon.BotMetadata.$Properties);
        $unknowns?: Uint8Array[];
        personaId?: (string|null);
        pluginMetadata?: (AICommon.BotPluginMetadata.$Properties|null);
        suggestedPromptMetadata?: (AICommon.BotSuggestedPromptMetadata.$Properties|null);
        invokerJid?: (string|null);
        sessionMetadata?: (AICommon.BotSessionMetadata.$Properties|null);
        memuMetadata?: (AICommon.BotMemuMetadata.$Properties|null);
        timezone?: (string|null);
        reminderMetadata?: (AICommon.BotReminderMetadata.$Properties|null);
        modelMetadata?: (AICommon.BotModelMetadata.$Properties|null);
        messageDisclaimerText?: (string|null);
        progressIndicatorMetadata?: (AICommon.BotProgressIndicatorMetadata.$Properties|null);
        capabilityMetadata?: (AICommon.BotCapabilityMetadata.$Properties|null);
        imagineMetadata?: (AICommon.BotImagineMetadata.$Properties|null);
        memoryMetadata?: (AICommon.BotMemoryMetadata.$Properties|null);
        renderingMetadata?: (AICommon.BotRenderingMetadata.$Properties|null);
        botMetricsMetadata?: (AICommon.BotMetricsMetadata.$Properties|null);
        botLinkedAccountsMetadata?: (AICommon.BotLinkedAccountsMetadata.$Properties|null);
        richResponseSourcesMetadata?: (AICommon.BotSourcesMetadata.$Properties|null);
        aiConversationContext?: (Uint8Array|null);
        botPromotionMessageMetadata?: (AICommon.BotPromotionMessageMetadata.$Properties|null);
        botModeSelectionMetadata?: (AICommon.BotModeSelectionMetadata.$Properties|null);
        botQuotaMetadata?: (AICommon.BotQuotaMetadata.$Properties|null);
        botAgeCollectionMetadata?: (AICommon.BotAgeCollectionMetadata.$Properties|null);
        conversationStarterPromptId?: (string|null);
        botResponseId?: (string|null);
        verificationMetadata?: (AICommon.BotSignatureVerificationMetadata.$Properties|null);
        unifiedResponseMutation?: (AICommon.BotUnifiedResponseMutation.$Properties|null);
        botMessageOriginMetadata?: (AICommon.BotMessageOriginMetadata.$Properties|null);
        inThreadSurveyMetadata?: (AICommon.InThreadSurveyMetadata.$Properties|null);
        botThreadInfo?: (AICommon.AIThreadInfo.$Properties|null);
        regenerateMetadata?: (AICommon.AIRegenerateMetadata.$Properties|null);
        sessionTransparencyMetadata?: (AICommon.SessionTransparencyMetadata.$Properties|null);
        botDocumentMessageMetadata?: (AICommon.BotDocumentMessageMetadata.$Properties|null);
        botGroupMetadata?: (AICommon.BotGroupMetadata.$Properties|null);
        botRenderingConfigMetadata?: (AICommon.BotRenderingConfigMetadata.$Properties|null);
        botInfrastructureDiagnostics?: (AICommon.BotInfrastructureDiagnostics.$Properties|null);
        aiMediaCollectionMetadata?: (AICommon.AIMediaCollectionMetadata.$Properties|null);
        commandMetadata?: (AICommon.BotCommandMetadata.$Properties|null);
        resolvedToolCallMetadata?: (AICommon.BotResolvedToolCallMetadata.$Properties|null);
        subscriptionUpsellMetadata?: (AICommon.AISubscriptionUpsellMetadata.$Properties|null);
        pttPromptMetadata?: (AICommon.BotPttPromptMetadata.$Properties|null);
        botHistoryShareMetadata?: (AICommon.BotHistoryShareMetadata.$Properties|null);
        responseStoppedByUser?: (boolean|null);
        internalMetadata?: (Uint8Array|null);
        static create(properties: AICommon.BotMetadata.$Shape): AICommon.BotMetadata & AICommon.BotMetadata.$Shape;
        static create(properties?: AICommon.BotMetadata.$Properties): AICommon.BotMetadata;
        static encode(m: AICommon.BotMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMetadata & AICommon.BotMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMetadata;
        static toObject(m: AICommon.BotMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMetadata {
        interface $Properties {
            personaId?: (string|null);
            pluginMetadata?: (AICommon.BotPluginMetadata.$Properties|null);
            suggestedPromptMetadata?: (AICommon.BotSuggestedPromptMetadata.$Properties|null);
            invokerJid?: (string|null);
            sessionMetadata?: (AICommon.BotSessionMetadata.$Properties|null);
            memuMetadata?: (AICommon.BotMemuMetadata.$Properties|null);
            timezone?: (string|null);
            reminderMetadata?: (AICommon.BotReminderMetadata.$Properties|null);
            modelMetadata?: (AICommon.BotModelMetadata.$Properties|null);
            messageDisclaimerText?: (string|null);
            progressIndicatorMetadata?: (AICommon.BotProgressIndicatorMetadata.$Properties|null);
            capabilityMetadata?: (AICommon.BotCapabilityMetadata.$Properties|null);
            imagineMetadata?: (AICommon.BotImagineMetadata.$Properties|null);
            memoryMetadata?: (AICommon.BotMemoryMetadata.$Properties|null);
            renderingMetadata?: (AICommon.BotRenderingMetadata.$Properties|null);
            botMetricsMetadata?: (AICommon.BotMetricsMetadata.$Properties|null);
            botLinkedAccountsMetadata?: (AICommon.BotLinkedAccountsMetadata.$Properties|null);
            richResponseSourcesMetadata?: (AICommon.BotSourcesMetadata.$Properties|null);
            aiConversationContext?: (Uint8Array|null);
            botPromotionMessageMetadata?: (AICommon.BotPromotionMessageMetadata.$Properties|null);
            botModeSelectionMetadata?: (AICommon.BotModeSelectionMetadata.$Properties|null);
            botQuotaMetadata?: (AICommon.BotQuotaMetadata.$Properties|null);
            botAgeCollectionMetadata?: (AICommon.BotAgeCollectionMetadata.$Properties|null);
            conversationStarterPromptId?: (string|null);
            botResponseId?: (string|null);
            verificationMetadata?: (AICommon.BotSignatureVerificationMetadata.$Properties|null);
            unifiedResponseMutation?: (AICommon.BotUnifiedResponseMutation.$Properties|null);
            botMessageOriginMetadata?: (AICommon.BotMessageOriginMetadata.$Properties|null);
            inThreadSurveyMetadata?: (AICommon.InThreadSurveyMetadata.$Properties|null);
            botThreadInfo?: (AICommon.AIThreadInfo.$Properties|null);
            regenerateMetadata?: (AICommon.AIRegenerateMetadata.$Properties|null);
            sessionTransparencyMetadata?: (AICommon.SessionTransparencyMetadata.$Properties|null);
            botDocumentMessageMetadata?: (AICommon.BotDocumentMessageMetadata.$Properties|null);
            botGroupMetadata?: (AICommon.BotGroupMetadata.$Properties|null);
            botRenderingConfigMetadata?: (AICommon.BotRenderingConfigMetadata.$Properties|null);
            botInfrastructureDiagnostics?: (AICommon.BotInfrastructureDiagnostics.$Properties|null);
            aiMediaCollectionMetadata?: (AICommon.AIMediaCollectionMetadata.$Properties|null);
            commandMetadata?: (AICommon.BotCommandMetadata.$Properties|null);
            resolvedToolCallMetadata?: (AICommon.BotResolvedToolCallMetadata.$Properties|null);
            subscriptionUpsellMetadata?: (AICommon.AISubscriptionUpsellMetadata.$Properties|null);
            pttPromptMetadata?: (AICommon.BotPttPromptMetadata.$Properties|null);
            botHistoryShareMetadata?: (AICommon.BotHistoryShareMetadata.$Properties|null);
            responseStoppedByUser?: (boolean|null);
            internalMetadata?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMetadata.$Properties;
    }

    interface IBotPttPromptMetadata extends AICommon.BotPttPromptMetadata.$Properties {
    }

    class BotPttPromptMetadata {
        constructor(p?: AICommon.BotPttPromptMetadata.$Properties);
        $unknowns?: Uint8Array[];
        transcript?: (string|null);
        static create(properties: AICommon.BotPttPromptMetadata.$Shape): AICommon.BotPttPromptMetadata & AICommon.BotPttPromptMetadata.$Shape;
        static create(properties?: AICommon.BotPttPromptMetadata.$Properties): AICommon.BotPttPromptMetadata;
        static encode(m: AICommon.BotPttPromptMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotPttPromptMetadata & AICommon.BotPttPromptMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotPttPromptMetadata;
        static toObject(m: AICommon.BotPttPromptMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPttPromptMetadata {
        interface $Properties {
            transcript?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotPttPromptMetadata.$Properties;
    }

    interface IBotResolvedToolCallMetadata extends AICommon.BotResolvedToolCallMetadata.$Properties {
    }

    class BotResolvedToolCallMetadata {
        constructor(p?: AICommon.BotResolvedToolCallMetadata.$Properties);
        $unknowns?: Uint8Array[];
        toolCallId?: (string|null);
        resolutionDataSerialized?: (string|null);
        static create(properties: AICommon.BotResolvedToolCallMetadata.$Shape): AICommon.BotResolvedToolCallMetadata & AICommon.BotResolvedToolCallMetadata.$Shape;
        static create(properties?: AICommon.BotResolvedToolCallMetadata.$Properties): AICommon.BotResolvedToolCallMetadata;
        static encode(m: AICommon.BotResolvedToolCallMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotResolvedToolCallMetadata & AICommon.BotResolvedToolCallMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotResolvedToolCallMetadata;
        static toObject(m: AICommon.BotResolvedToolCallMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotResolvedToolCallMetadata {
        interface $Properties {
            toolCallId?: (string|null);
            resolutionDataSerialized?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotResolvedToolCallMetadata.$Properties;
    }

    interface IBotCommandMetadata extends AICommon.BotCommandMetadata.$Properties {
    }

    class BotCommandMetadata {
        constructor(p?: AICommon.BotCommandMetadata.$Properties);
        $unknowns?: Uint8Array[];
        commandName?: (string|null);
        commandDescription?: (string|null);
        commandPrompt?: (string|null);
        static create(properties: AICommon.BotCommandMetadata.$Shape): AICommon.BotCommandMetadata & AICommon.BotCommandMetadata.$Shape;
        static create(properties?: AICommon.BotCommandMetadata.$Properties): AICommon.BotCommandMetadata;
        static encode(m: AICommon.BotCommandMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotCommandMetadata & AICommon.BotCommandMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotCommandMetadata;
        static toObject(m: AICommon.BotCommandMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotCommandMetadata {
        interface $Properties {
            commandName?: (string|null);
            commandDescription?: (string|null);
            commandPrompt?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotCommandMetadata.$Properties;
    }

    interface IAIMetadataOperation extends AICommon.AIMetadataOperation.$Properties {
    }

    class AIMetadataOperation {
        constructor(p?: AICommon.AIMetadataOperation.$Properties);
        $unknowns?: Uint8Array[];
        hatchMetadataSync?: (AICommon.HatchMetadataSync.$Properties|null);
        bizAiMetadataSync?: (AICommon.BizAIMetadataSync.$Properties|null);
        static create(properties: AICommon.AIMetadataOperation.$Shape): AICommon.AIMetadataOperation & AICommon.AIMetadataOperation.$Shape;
        static create(properties?: AICommon.AIMetadataOperation.$Properties): AICommon.AIMetadataOperation;
        static encode(m: AICommon.AIMetadataOperation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIMetadataOperation & AICommon.AIMetadataOperation.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIMetadataOperation;
        static toObject(m: AICommon.AIMetadataOperation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIMetadataOperation {
        interface $Properties {
            hatchMetadataSync?: (AICommon.HatchMetadataSync.$Properties|null);
            bizAiMetadataSync?: (AICommon.BizAIMetadataSync.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          hatchMetadataSync?: AICommon.HatchMetadataSync.$Shape|null;
          bizAiMetadataSync?: AICommon.BizAIMetadataSync.$Shape|null;
          $unknowns?: Uint8Array[];
        };
    }

    interface IHatchMetadataSync extends AICommon.HatchMetadataSync.$Properties {
    }

    class HatchMetadataSync {
        constructor(p?: AICommon.HatchMetadataSync.$Properties);
        $unknowns?: Uint8Array[];
        data?: (Uint8Array|null);
        timestampMs?: (number|Long|null);
        requestId?: (string|null);
        static create(properties: AICommon.HatchMetadataSync.$Shape): AICommon.HatchMetadataSync & AICommon.HatchMetadataSync.$Shape;
        static create(properties?: AICommon.HatchMetadataSync.$Properties): AICommon.HatchMetadataSync;
        static encode(m: AICommon.HatchMetadataSync.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.HatchMetadataSync & AICommon.HatchMetadataSync.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.HatchMetadataSync;
        static toObject(m: AICommon.HatchMetadataSync, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace HatchMetadataSync {
        interface $Properties {
            data?: (Uint8Array|null);
            timestampMs?: (number|Long|null);
            requestId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.HatchMetadataSync.$Properties;
    }

    interface IAIMediaCollectionMessage extends AICommon.AIMediaCollectionMessage.$Properties {
    }

    class AIMediaCollectionMessage {
        constructor(p?: AICommon.AIMediaCollectionMessage.$Properties);
        $unknowns?: Uint8Array[];
        collectionId?: (string|null);
        expectedMediaCount?: (number|null);
        hasGlobalCaption?: (boolean|null);
        static create(properties: AICommon.AIMediaCollectionMessage.$Shape): AICommon.AIMediaCollectionMessage & AICommon.AIMediaCollectionMessage.$Shape;
        static create(properties?: AICommon.AIMediaCollectionMessage.$Properties): AICommon.AIMediaCollectionMessage;
        static encode(m: AICommon.AIMediaCollectionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIMediaCollectionMessage & AICommon.AIMediaCollectionMessage.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIMediaCollectionMessage;
        static toObject(m: AICommon.AIMediaCollectionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIMediaCollectionMessage {
        interface $Properties {
            collectionId?: (string|null);
            expectedMediaCount?: (number|null);
            hasGlobalCaption?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AIMediaCollectionMessage.$Properties;
    }

    interface IAIMediaCollectionMetadata extends AICommon.AIMediaCollectionMetadata.$Properties {
    }

    class AIMediaCollectionMetadata {
        constructor(p?: AICommon.AIMediaCollectionMetadata.$Properties);
        $unknowns?: Uint8Array[];
        collectionId?: (string|null);
        uploadOrderIndex?: (number|null);
        static create(properties: AICommon.AIMediaCollectionMetadata.$Shape): AICommon.AIMediaCollectionMetadata & AICommon.AIMediaCollectionMetadata.$Shape;
        static create(properties?: AICommon.AIMediaCollectionMetadata.$Properties): AICommon.AIMediaCollectionMetadata;
        static encode(m: AICommon.AIMediaCollectionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIMediaCollectionMetadata & AICommon.AIMediaCollectionMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIMediaCollectionMetadata;
        static toObject(m: AICommon.AIMediaCollectionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIMediaCollectionMetadata {
        interface $Properties {
            collectionId?: (string|null);
            uploadOrderIndex?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AIMediaCollectionMetadata.$Properties;
    }

    interface IAIThreadInfo extends AICommon.AIThreadInfo.$Properties {
    }

    class AIThreadInfo {
        constructor(p?: AICommon.AIThreadInfo.$Properties);
        $unknowns?: Uint8Array[];
        serverInfo?: (AICommon.AIThreadInfo.AIThreadServerInfo.$Properties|null);
        clientInfo?: (AICommon.AIThreadInfo.AIThreadClientInfo.$Properties|null);
        static create(properties: AICommon.AIThreadInfo.$Shape): AICommon.AIThreadInfo & AICommon.AIThreadInfo.$Shape;
        static create(properties?: AICommon.AIThreadInfo.$Properties): AICommon.AIThreadInfo;
        static encode(m: AICommon.AIThreadInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIThreadInfo & AICommon.AIThreadInfo.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.AIThreadInfo;
        static toObject(m: AICommon.AIThreadInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIThreadInfo {
        interface $Properties {
            serverInfo?: (AICommon.AIThreadInfo.AIThreadServerInfo.$Properties|null);
            clientInfo?: (AICommon.AIThreadInfo.AIThreadClientInfo.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.AIThreadInfo.$Properties;

        interface IAIThreadClientInfo extends AICommon.AIThreadInfo.AIThreadClientInfo.$Properties {
        }

        class AIThreadClientInfo {
            constructor(p?: AICommon.AIThreadInfo.AIThreadClientInfo.$Properties);
            $unknowns?: Uint8Array[];
            type?: (AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);
            sourceChatJid?: (string|null);
            static create(properties: AICommon.AIThreadInfo.AIThreadClientInfo.$Shape): AICommon.AIThreadInfo.AIThreadClientInfo & AICommon.AIThreadInfo.AIThreadClientInfo.$Shape;
            static create(properties?: AICommon.AIThreadInfo.AIThreadClientInfo.$Properties): AICommon.AIThreadInfo.AIThreadClientInfo;
            static encode(m: AICommon.AIThreadInfo.AIThreadClientInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIThreadInfo.AIThreadClientInfo & AICommon.AIThreadInfo.AIThreadClientInfo.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.AIThreadInfo.AIThreadClientInfo;
            static toObject(m: AICommon.AIThreadInfo.AIThreadClientInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIThreadClientInfo {
            interface $Properties {
                type?: (AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);
                sourceChatJid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.AIThreadInfo.AIThreadClientInfo.$Properties;

            enum AIThreadType {
                UNKNOWN = 0,
                DEFAULT = 1,
                INCOGNITO = 2,
                SIDE_CHAT = 3
            }
        }

        interface IAIThreadServerInfo extends AICommon.AIThreadInfo.AIThreadServerInfo.$Properties {
        }

        class AIThreadServerInfo {
            constructor(p?: AICommon.AIThreadInfo.AIThreadServerInfo.$Properties);
            $unknowns?: Uint8Array[];
            title?: (string|null);
            static create(properties: AICommon.AIThreadInfo.AIThreadServerInfo.$Shape): AICommon.AIThreadInfo.AIThreadServerInfo & AICommon.AIThreadInfo.AIThreadServerInfo.$Shape;
            static create(properties?: AICommon.AIThreadInfo.AIThreadServerInfo.$Properties): AICommon.AIThreadInfo.AIThreadServerInfo;
            static encode(m: AICommon.AIThreadInfo.AIThreadServerInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.AIThreadInfo.AIThreadServerInfo & AICommon.AIThreadInfo.AIThreadServerInfo.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.AIThreadInfo.AIThreadServerInfo;
            static toObject(m: AICommon.AIThreadInfo.AIThreadServerInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIThreadServerInfo {
            interface $Properties {
                title?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.AIThreadInfo.AIThreadServerInfo.$Properties;
        }
    }

    interface IBotUnifiedResponseMutation extends AICommon.BotUnifiedResponseMutation.$Properties {
    }

    class BotUnifiedResponseMutation {
        constructor(p?: AICommon.BotUnifiedResponseMutation.$Properties);
        $unknowns?: Uint8Array[];
        sbsMetadata?: (AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Properties|null);
        mediaDetailsMetadataList: AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Properties[];
        static create(properties: AICommon.BotUnifiedResponseMutation.$Shape): AICommon.BotUnifiedResponseMutation & AICommon.BotUnifiedResponseMutation.$Shape;
        static create(properties?: AICommon.BotUnifiedResponseMutation.$Properties): AICommon.BotUnifiedResponseMutation;
        static encode(m: AICommon.BotUnifiedResponseMutation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotUnifiedResponseMutation & AICommon.BotUnifiedResponseMutation.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotUnifiedResponseMutation;
        static toObject(m: AICommon.BotUnifiedResponseMutation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotUnifiedResponseMutation {
        interface $Properties {
            sbsMetadata?: (AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Properties|null);
            mediaDetailsMetadataList?: (AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotUnifiedResponseMutation.$Properties;

        interface IMediaDetailsMetadata extends AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Properties {
        }

        class MediaDetailsMetadata {
            constructor(p?: AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Properties);
            $unknowns?: Uint8Array[];
            id?: (string|null);
            highResMedia?: (AICommon.BotMediaMetadata.$Properties|null);
            previewMedia?: (AICommon.BotMediaMetadata.$Properties|null);
            static create(properties: AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Shape): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata & AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Shape;
            static create(properties?: AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Properties): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata;
            static encode(m: AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata & AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata;
            static toObject(m: AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MediaDetailsMetadata {
            interface $Properties {
                id?: (string|null);
                highResMedia?: (AICommon.BotMediaMetadata.$Properties|null);
                previewMedia?: (AICommon.BotMediaMetadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.$Properties;
        }

        interface ISideBySideMetadata extends AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Properties {
        }

        class SideBySideMetadata {
            constructor(p?: AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Properties);
            $unknowns?: Uint8Array[];
            primaryResponseId?: (string|null);
            surveyCtaHasRendered?: (boolean|null);
            static create(properties: AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Shape): AICommon.BotUnifiedResponseMutation.SideBySideMetadata & AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Shape;
            static create(properties?: AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Properties): AICommon.BotUnifiedResponseMutation.SideBySideMetadata;
            static encode(m: AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotUnifiedResponseMutation.SideBySideMetadata & AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotUnifiedResponseMutation.SideBySideMetadata;
            static toObject(m: AICommon.BotUnifiedResponseMutation.SideBySideMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SideBySideMetadata {
            interface $Properties {
                primaryResponseId?: (string|null);
                surveyCtaHasRendered?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotUnifiedResponseMutation.SideBySideMetadata.$Properties;
        }
    }

    interface IBotMessageOrigin extends AICommon.BotMessageOrigin.$Properties {
    }

    class BotMessageOrigin {
        constructor(p?: AICommon.BotMessageOrigin.$Properties);
        $unknowns?: Uint8Array[];
        type?: (AICommon.BotMessageOrigin.BotMessageOriginType|null);
        static create(properties: AICommon.BotMessageOrigin.$Shape): AICommon.BotMessageOrigin & AICommon.BotMessageOrigin.$Shape;
        static create(properties?: AICommon.BotMessageOrigin.$Properties): AICommon.BotMessageOrigin;
        static encode(m: AICommon.BotMessageOrigin.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMessageOrigin & AICommon.BotMessageOrigin.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMessageOrigin;
        static toObject(m: AICommon.BotMessageOrigin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMessageOrigin {
        interface $Properties {
            type?: (AICommon.BotMessageOrigin.BotMessageOriginType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMessageOrigin.$Properties;

        enum BotMessageOriginType {
            BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED = 0
        }
    }

    interface IBotMessageOriginMetadata extends AICommon.BotMessageOriginMetadata.$Properties {
    }

    class BotMessageOriginMetadata {
        constructor(p?: AICommon.BotMessageOriginMetadata.$Properties);
        $unknowns?: Uint8Array[];
        origins: AICommon.BotMessageOrigin.$Properties[];
        static create(properties: AICommon.BotMessageOriginMetadata.$Shape): AICommon.BotMessageOriginMetadata & AICommon.BotMessageOriginMetadata.$Shape;
        static create(properties?: AICommon.BotMessageOriginMetadata.$Properties): AICommon.BotMessageOriginMetadata;
        static encode(m: AICommon.BotMessageOriginMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMessageOriginMetadata & AICommon.BotMessageOriginMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMessageOriginMetadata;
        static toObject(m: AICommon.BotMessageOriginMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMessageOriginMetadata {
        interface $Properties {
            origins?: (AICommon.BotMessageOrigin.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMessageOriginMetadata.$Properties;
    }

    interface IInThreadSurveyMetadata extends AICommon.InThreadSurveyMetadata.$Properties {
    }

    class InThreadSurveyMetadata {
        constructor(p?: AICommon.InThreadSurveyMetadata.$Properties);
        $unknowns?: Uint8Array[];
        tessaSessionId?: (string|null);
        simonSessionId?: (string|null);
        simonSurveyId?: (string|null);
        tessaRootId?: (string|null);
        requestId?: (string|null);
        tessaEvent?: (string|null);
        invitationHeaderText?: (string|null);
        invitationBodyText?: (string|null);
        invitationCtaText?: (string|null);
        invitationCtaUrl?: (string|null);
        surveyTitle?: (string|null);
        questions: AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties[];
        surveyContinueButtonText?: (string|null);
        surveySubmitButtonText?: (string|null);
        privacyStatementFull?: (string|null);
        privacyStatementParts: AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties[];
        feedbackToastText?: (string|null);
        startQuestionIndex?: (number|null);
        static create(properties: AICommon.InThreadSurveyMetadata.$Shape): AICommon.InThreadSurveyMetadata & AICommon.InThreadSurveyMetadata.$Shape;
        static create(properties?: AICommon.InThreadSurveyMetadata.$Properties): AICommon.InThreadSurveyMetadata;
        static encode(m: AICommon.InThreadSurveyMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.InThreadSurveyMetadata & AICommon.InThreadSurveyMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.InThreadSurveyMetadata;
        static toObject(m: AICommon.InThreadSurveyMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace InThreadSurveyMetadata {
        interface $Properties {
            tessaSessionId?: (string|null);
            simonSessionId?: (string|null);
            simonSurveyId?: (string|null);
            tessaRootId?: (string|null);
            requestId?: (string|null);
            tessaEvent?: (string|null);
            invitationHeaderText?: (string|null);
            invitationBodyText?: (string|null);
            invitationCtaText?: (string|null);
            invitationCtaUrl?: (string|null);
            surveyTitle?: (string|null);
            questions?: (AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties[]|null);
            surveyContinueButtonText?: (string|null);
            surveySubmitButtonText?: (string|null);
            privacyStatementFull?: (string|null);
            privacyStatementParts?: (AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties[]|null);
            feedbackToastText?: (string|null);
            startQuestionIndex?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.InThreadSurveyMetadata.$Properties;

        interface IInThreadSurveyOption extends AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Properties {
        }

        class InThreadSurveyOption {
            constructor(p?: AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Properties);
            $unknowns?: Uint8Array[];
            stringValue?: (string|null);
            numericValue?: (number|null);
            textTranslated?: (string|null);
            static create(properties: AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Shape): AICommon.InThreadSurveyMetadata.InThreadSurveyOption & AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Shape;
            static create(properties?: AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Properties): AICommon.InThreadSurveyMetadata.InThreadSurveyOption;
            static encode(m: AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.InThreadSurveyMetadata.InThreadSurveyOption & AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.InThreadSurveyMetadata.InThreadSurveyOption;
            static toObject(m: AICommon.InThreadSurveyMetadata.InThreadSurveyOption, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InThreadSurveyOption {
            interface $Properties {
                stringValue?: (string|null);
                numericValue?: (number|null);
                textTranslated?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Properties;
        }

        interface IInThreadSurveyPrivacyStatementPart extends AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties {
        }

        class InThreadSurveyPrivacyStatementPart {
            constructor(p?: AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties);
            $unknowns?: Uint8Array[];
            text?: (string|null);
            url?: (string|null);
            static create(properties: AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Shape): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart & AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Shape;
            static create(properties?: AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;
            static encode(m: AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart & AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;
            static toObject(m: AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InThreadSurveyPrivacyStatementPart {
            interface $Properties {
                text?: (string|null);
                url?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties;
        }

        interface IInThreadSurveyQuestion extends AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties {
        }

        class InThreadSurveyQuestion {
            constructor(p?: AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties);
            $unknowns?: Uint8Array[];
            questionText?: (string|null);
            questionId?: (string|null);
            questionOptions: AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Properties[];
            static create(properties: AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Shape): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion & AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Shape;
            static create(properties?: AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion;
            static encode(m: AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion & AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion;
            static toObject(m: AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InThreadSurveyQuestion {
            interface $Properties {
                questionText?: (string|null);
                questionId?: (string|null);
                questionOptions?: (AICommon.InThreadSurveyMetadata.InThreadSurveyOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties;
        }
    }

    interface IBotSourcesMetadata extends AICommon.BotSourcesMetadata.$Properties {
    }

    class BotSourcesMetadata {
        constructor(p?: AICommon.BotSourcesMetadata.$Properties);
        $unknowns?: Uint8Array[];
        sources: AICommon.BotSourcesMetadata.BotSourceItem.$Properties[];
        static create(properties: AICommon.BotSourcesMetadata.$Shape): AICommon.BotSourcesMetadata & AICommon.BotSourcesMetadata.$Shape;
        static create(properties?: AICommon.BotSourcesMetadata.$Properties): AICommon.BotSourcesMetadata;
        static encode(m: AICommon.BotSourcesMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotSourcesMetadata & AICommon.BotSourcesMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotSourcesMetadata;
        static toObject(m: AICommon.BotSourcesMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSourcesMetadata {
        interface $Properties {
            sources?: (AICommon.BotSourcesMetadata.BotSourceItem.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotSourcesMetadata.$Properties;

        interface IBotSourceItem extends AICommon.BotSourcesMetadata.BotSourceItem.$Properties {
        }

        class BotSourceItem {
            constructor(p?: AICommon.BotSourcesMetadata.BotSourceItem.$Properties);
            $unknowns?: Uint8Array[];
            provider?: (AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider|null);
            thumbnailCdnUrl?: (string|null);
            sourceProviderUrl?: (string|null);
            sourceQuery?: (string|null);
            faviconCdnUrl?: (string|null);
            citationNumber?: (number|null);
            sourceTitle?: (string|null);
            static create(properties: AICommon.BotSourcesMetadata.BotSourceItem.$Shape): AICommon.BotSourcesMetadata.BotSourceItem & AICommon.BotSourcesMetadata.BotSourceItem.$Shape;
            static create(properties?: AICommon.BotSourcesMetadata.BotSourceItem.$Properties): AICommon.BotSourcesMetadata.BotSourceItem;
            static encode(m: AICommon.BotSourcesMetadata.BotSourceItem.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotSourcesMetadata.BotSourceItem & AICommon.BotSourcesMetadata.BotSourceItem.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotSourcesMetadata.BotSourceItem;
            static toObject(m: AICommon.BotSourcesMetadata.BotSourceItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotSourceItem {
            interface $Properties {
                provider?: (AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider|null);
                thumbnailCdnUrl?: (string|null);
                sourceProviderUrl?: (string|null);
                sourceQuery?: (string|null);
                faviconCdnUrl?: (string|null);
                citationNumber?: (number|null);
                sourceTitle?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotSourcesMetadata.BotSourceItem.$Properties;

            enum SourceProvider {
                UNKNOWN = 0,
                BING = 1,
                GOOGLE = 2,
                SUPPORT = 3,
                OTHER = 4
            }
        }
    }

    interface IBotAgeCollectionMetadata extends AICommon.BotAgeCollectionMetadata.$Properties {
    }

    class BotAgeCollectionMetadata {
        constructor(p?: AICommon.BotAgeCollectionMetadata.$Properties);
        $unknowns?: Uint8Array[];
        ageCollectionEligible?: (boolean|null);
        shouldTriggerAgeCollectionOnClient?: (boolean|null);
        ageCollectionType?: (AICommon.BotAgeCollectionMetadata.AgeCollectionType|null);
        static create(properties: AICommon.BotAgeCollectionMetadata.$Shape): AICommon.BotAgeCollectionMetadata & AICommon.BotAgeCollectionMetadata.$Shape;
        static create(properties?: AICommon.BotAgeCollectionMetadata.$Properties): AICommon.BotAgeCollectionMetadata;
        static encode(m: AICommon.BotAgeCollectionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotAgeCollectionMetadata & AICommon.BotAgeCollectionMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotAgeCollectionMetadata;
        static toObject(m: AICommon.BotAgeCollectionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotAgeCollectionMetadata {
        interface $Properties {
            ageCollectionEligible?: (boolean|null);
            shouldTriggerAgeCollectionOnClient?: (boolean|null);
            ageCollectionType?: (AICommon.BotAgeCollectionMetadata.AgeCollectionType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotAgeCollectionMetadata.$Properties;

        enum AgeCollectionType {
            O18_BINARY = 0,
            WAFFLE = 1
        }
    }

    interface IBotImagineMetadata extends AICommon.BotImagineMetadata.$Properties {
    }

    class BotImagineMetadata {
        constructor(p?: AICommon.BotImagineMetadata.$Properties);
        $unknowns?: Uint8Array[];
        imagineType?: (AICommon.BotImagineMetadata.ImagineType|null);
        shortPrompt?: (string|null);
        static create(properties: AICommon.BotImagineMetadata.$Shape): AICommon.BotImagineMetadata & AICommon.BotImagineMetadata.$Shape;
        static create(properties?: AICommon.BotImagineMetadata.$Properties): AICommon.BotImagineMetadata;
        static encode(m: AICommon.BotImagineMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotImagineMetadata & AICommon.BotImagineMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotImagineMetadata;
        static toObject(m: AICommon.BotImagineMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotImagineMetadata {
        interface $Properties {
            imagineType?: (AICommon.BotImagineMetadata.ImagineType|null);
            shortPrompt?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotImagineMetadata.$Properties;

        enum ImagineType {
            UNKNOWN = 0,
            IMAGINE = 1,
            MEMU = 2,
            FLASH = 3,
            EDIT = 4
        }
    }

    interface IBotQuotaMetadata extends AICommon.BotQuotaMetadata.$Properties {
    }

    class BotQuotaMetadata {
        constructor(p?: AICommon.BotQuotaMetadata.$Properties);
        $unknowns?: Uint8Array[];
        botFeatureQuotaMetadata: AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties[];
        static create(properties: AICommon.BotQuotaMetadata.$Shape): AICommon.BotQuotaMetadata & AICommon.BotQuotaMetadata.$Shape;
        static create(properties?: AICommon.BotQuotaMetadata.$Properties): AICommon.BotQuotaMetadata;
        static encode(m: AICommon.BotQuotaMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotQuotaMetadata & AICommon.BotQuotaMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotQuotaMetadata;
        static toObject(m: AICommon.BotQuotaMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotQuotaMetadata {
        interface $Properties {
            botFeatureQuotaMetadata?: (AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotQuotaMetadata.$Properties;

        interface IBotFeatureQuotaMetadata extends AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties {
        }

        class BotFeatureQuotaMetadata {
            constructor(p?: AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties);
            $unknowns?: Uint8Array[];
            featureType?: (AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);
            remainingQuota?: (number|null);
            expirationTimestamp?: (number|Long|null);
            static create(properties: AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Shape): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata & AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Shape;
            static create(properties?: AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata;
            static encode(m: AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata & AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata;
            static toObject(m: AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotFeatureQuotaMetadata {
            interface $Properties {
                featureType?: (AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);
                remainingQuota?: (number|null);
                expirationTimestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties;

            enum BotFeatureType {
                UNKNOWN_FEATURE = 0,
                REASONING_FEATURE = 1
            }
        }
    }

    interface IBotModeSelectionMetadata extends AICommon.BotModeSelectionMetadata.$Properties {
    }

    class BotModeSelectionMetadata {
        constructor(p?: AICommon.BotModeSelectionMetadata.$Properties);
        $unknowns?: Uint8Array[];
        mode: AICommon.BotModeSelectionMetadata.BotUserSelectionMode[];
        overrideMode: number[];
        static create(properties: AICommon.BotModeSelectionMetadata.$Shape): AICommon.BotModeSelectionMetadata & AICommon.BotModeSelectionMetadata.$Shape;
        static create(properties?: AICommon.BotModeSelectionMetadata.$Properties): AICommon.BotModeSelectionMetadata;
        static encode(m: AICommon.BotModeSelectionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotModeSelectionMetadata & AICommon.BotModeSelectionMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotModeSelectionMetadata;
        static toObject(m: AICommon.BotModeSelectionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotModeSelectionMetadata {
        interface $Properties {
            mode?: (AICommon.BotModeSelectionMetadata.BotUserSelectionMode[]|null);
            overrideMode?: (number[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotModeSelectionMetadata.$Properties;

        enum BotUserSelectionMode {
            DEFAULT_MODE = 0,
            THINK_HARD_MODE = 1
        }
    }

    interface IBotCapabilityMetadata extends AICommon.BotCapabilityMetadata.$Properties {
    }

    class BotCapabilityMetadata {
        constructor(p?: AICommon.BotCapabilityMetadata.$Properties);
        $unknowns?: Uint8Array[];
        capabilities: AICommon.BotCapabilityMetadata.BotCapabilityType[];
        static create(properties: AICommon.BotCapabilityMetadata.$Shape): AICommon.BotCapabilityMetadata & AICommon.BotCapabilityMetadata.$Shape;
        static create(properties?: AICommon.BotCapabilityMetadata.$Properties): AICommon.BotCapabilityMetadata;
        static encode(m: AICommon.BotCapabilityMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotCapabilityMetadata & AICommon.BotCapabilityMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotCapabilityMetadata;
        static toObject(m: AICommon.BotCapabilityMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotCapabilityMetadata {
        interface $Properties {
            capabilities?: (AICommon.BotCapabilityMetadata.BotCapabilityType[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotCapabilityMetadata.$Properties;

        enum BotCapabilityType {
            UNKNOWN = 0,
            PROGRESS_INDICATOR = 1,
            RICH_RESPONSE_HEADING = 2,
            RICH_RESPONSE_NESTED_LIST = 3,
            AI_MEMORY = 4,
            RICH_RESPONSE_THREAD_SURFING = 5,
            RICH_RESPONSE_TABLE = 6,
            RICH_RESPONSE_CODE = 7,
            RICH_RESPONSE_STRUCTURED_RESPONSE = 8,
            RICH_RESPONSE_INLINE_IMAGE = 9,
            WA_IG_1P_PLUGIN_RANKING_CONTROL = 10,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_1 = 11,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_2 = 12,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_3 = 13,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_4 = 14,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_5 = 15,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_6 = 16,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_7 = 17,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_8 = 18,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_9 = 19,
            WA_IG_1P_PLUGIN_RANKING_UPDATE_10 = 20,
            RICH_RESPONSE_SUB_HEADING = 21,
            RICH_RESPONSE_GRID_IMAGE = 22,
            AI_STUDIO_UGC_MEMORY = 23,
            RICH_RESPONSE_LATEX = 24,
            RICH_RESPONSE_MAPS = 25,
            RICH_RESPONSE_INLINE_REELS = 26,
            AGENTIC_PLANNING = 27,
            ACCOUNT_LINKING = 28,
            STREAMING_DISAGGREGATION = 29,
            RICH_RESPONSE_GRID_IMAGE_3P = 30,
            RICH_RESPONSE_LATEX_INLINE = 31,
            QUERY_PLAN = 32,
            PROACTIVE_MESSAGE = 33,
            RICH_RESPONSE_UNIFIED_RESPONSE = 34,
            PROMOTION_MESSAGE = 35,
            SIMPLIFIED_PROFILE_PAGE = 36,
            RICH_RESPONSE_SOURCES_IN_MESSAGE = 37,
            RICH_RESPONSE_SIDE_BY_SIDE_SURVEY = 38,
            RICH_RESPONSE_UNIFIED_TEXT_COMPONENT = 39,
            AI_SHARED_MEMORY = 40,
            RICH_RESPONSE_UNIFIED_SOURCES = 41,
            RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS = 42,
            RICH_RESPONSE_UR_INLINE_REELS_ENABLED = 43,
            RICH_RESPONSE_UR_MEDIA_GRID_ENABLED = 44,
            RICH_RESPONSE_UR_TIMESTAMP_PLACEHOLDER = 45,
            RICH_RESPONSE_IN_APP_SURVEY = 46,
            AI_RESPONSE_MODEL_BRANDING = 47,
            SESSION_TRANSPARENCY_SYSTEM_MESSAGE = 48,
            RICH_RESPONSE_UR_REASONING = 49,
            RICH_RESPONSE_UR_ZEITGEIST_CITATIONS = 50,
            RICH_RESPONSE_UR_ZEITGEIST_CAROUSEL = 51,
            AI_IMAGINE_LOADING_INDICATOR = 52,
            RICH_RESPONSE_UR_IMAGINE = 53,
            AI_IMAGINE_UR_TO_NATIVE_LOADING_INDICATOR = 54,
            RICH_RESPONSE_UR_BLOKS_ENABLED = 55,
            RICH_RESPONSE_INLINE_LINKS_ENABLED = 56,
            RICH_RESPONSE_UR_IMAGINE_VIDEO = 57,
            JSON_PATCH_STREAMING = 58,
            AI_TAB_FORCE_CLIPPY = 59,
            UNIFIED_RESPONSE_EMBEDDED_SCREENS = 60,
            AI_SUBSCRIPTION_ENABLED = 61,
            UNIFIED_RESPONSE_AI_CONTENT_SEARCH_ENABLED = 62,
            UNIFIED_RESPONSE_MARKDOWN_LINKS_ENABLED = 63,
            AI_RICH_RESPONSE_MAPS_V2_ENABLED = 64,
            AI_SUBSCRIPTION_METERING_ENABLED = 65,
            RICH_RESPONSE_SPORTS_WIDGET_ENABLED = 66,
            AI_RICH_RESPONSE_ARTIFACTS_ENABLED = 67,
            AI_RICH_RESPONSE_EMAIL_CALENDAR_ENABLED = 68,
            AI_RICH_RESPONSE_REMINDERS_ENABLED = 69,
            AI_STOP_GENERATION_ENABLED = 70,
            AI_RICH_RESPONSE_3P_LINKING_CARD_ENABLED = 71
        }
    }

    interface IBotProgressIndicatorMetadata extends AICommon.BotProgressIndicatorMetadata.$Properties {
    }

    class BotProgressIndicatorMetadata {
        constructor(p?: AICommon.BotProgressIndicatorMetadata.$Properties);
        $unknowns?: Uint8Array[];
        progressDescription?: (string|null);
        stepsMetadata: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties[];
        estimatedCompletionTime?: (number|Long|null);
        static create(properties: AICommon.BotProgressIndicatorMetadata.$Shape): AICommon.BotProgressIndicatorMetadata & AICommon.BotProgressIndicatorMetadata.$Shape;
        static create(properties?: AICommon.BotProgressIndicatorMetadata.$Properties): AICommon.BotProgressIndicatorMetadata;
        static encode(m: AICommon.BotProgressIndicatorMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotProgressIndicatorMetadata & AICommon.BotProgressIndicatorMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata;
        static toObject(m: AICommon.BotProgressIndicatorMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotProgressIndicatorMetadata {
        interface $Properties {
            progressDescription?: (string|null);
            stepsMetadata?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties[]|null);
            estimatedCompletionTime?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotProgressIndicatorMetadata.$Properties;

        interface IBotPlanningStepMetadata extends AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties {
        }

        class BotPlanningStepMetadata {
            constructor(p?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties);
            $unknowns?: Uint8Array[];
            statusTitle?: (string|null);
            statusBody?: (string|null);
            sourcesMetadata: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties[];
            status?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);
            isReasoning?: (boolean|null);
            isEnhancedSearch?: (boolean|null);
            sections: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties[];
            static create(properties: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Shape): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Shape;
            static create(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata;
            static encode(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata;
            static toObject(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotPlanningStepMetadata {
            interface $Properties {
                statusTitle?: (string|null);
                statusBody?: (string|null);
                sourcesMetadata?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties[]|null);
                status?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);
                isReasoning?: (boolean|null);
                isEnhancedSearch?: (boolean|null);
                sections?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties;

            interface IBotPlanningSearchSourceMetadata extends AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties {
            }

            class BotPlanningSearchSourceMetadata {
                constructor(p?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties);
                $unknowns?: Uint8Array[];
                title?: (string|null);
                provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);
                sourceUrl?: (string|null);
                favIconUrl?: (string|null);
                static create(properties: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Shape): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Shape;
                static create(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;
                static encode(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Shape;
                static fromObject(d: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;
                static toObject(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BotPlanningSearchSourceMetadata {
                interface $Properties {
                    title?: (string|null);
                    provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);
                    sourceUrl?: (string|null);
                    favIconUrl?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties;
            }

            interface IBotPlanningSearchSourcesMetadata extends AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties {
            }

            class BotPlanningSearchSourcesMetadata {
                constructor(p?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties);
                $unknowns?: Uint8Array[];
                sourceTitle?: (string|null);
                provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);
                sourceUrl?: (string|null);
                static create(properties: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Shape): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Shape;
                static create(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;
                static encode(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Shape;
                static fromObject(d: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;
                static toObject(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BotPlanningSearchSourcesMetadata {
                interface $Properties {
                    sourceTitle?: (string|null);
                    provider?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);
                    sourceUrl?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties;

                enum BotPlanningSearchSourceProvider {
                    UNKNOWN = 0,
                    OTHER = 1,
                    GOOGLE = 2,
                    BING = 3
                }
            }

            interface IBotPlanningStepSectionMetadata extends AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties {
            }

            class BotPlanningStepSectionMetadata {
                constructor(p?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties);
                $unknowns?: Uint8Array[];
                sectionTitle?: (string|null);
                sectionBody?: (string|null);
                sourcesMetadata: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties[];
                static create(properties: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Shape): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Shape;
                static create(properties?: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;
                static encode(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata & AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Shape;
                static fromObject(d: { [k: string]: any }): AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;
                static toObject(m: AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BotPlanningStepSectionMetadata {
                interface $Properties {
                    sectionTitle?: (string|null);
                    sectionBody?: (string|null);
                    sourcesMetadata?: (AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties;
            }

            enum BotSearchSourceProvider {
                UNKNOWN_PROVIDER = 0,
                OTHER = 1,
                GOOGLE = 2,
                BING = 3
            }

            enum PlanningStepStatus {
                UNKNOWN = 0,
                PLANNED = 1,
                EXECUTING = 2,
                FINISHED = 3
            }
        }
    }

    interface IBotModelMetadata extends AICommon.BotModelMetadata.$Properties {
    }

    class BotModelMetadata {
        constructor(p?: AICommon.BotModelMetadata.$Properties);
        $unknowns?: Uint8Array[];
        modelType?: (AICommon.BotModelMetadata.ModelType|null);
        premiumModelStatus?: (AICommon.BotModelMetadata.PremiumModelStatus|null);
        modelNameOverride?: (string|null);
        static create(properties: AICommon.BotModelMetadata.$Shape): AICommon.BotModelMetadata & AICommon.BotModelMetadata.$Shape;
        static create(properties?: AICommon.BotModelMetadata.$Properties): AICommon.BotModelMetadata;
        static encode(m: AICommon.BotModelMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotModelMetadata & AICommon.BotModelMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotModelMetadata;
        static toObject(m: AICommon.BotModelMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotModelMetadata {
        interface $Properties {
            modelType?: (AICommon.BotModelMetadata.ModelType|null);
            premiumModelStatus?: (AICommon.BotModelMetadata.PremiumModelStatus|null);
            modelNameOverride?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotModelMetadata.$Properties;

        enum ModelType {
            UNKNOWN_TYPE = 0,
            LLAMA_PROD = 1,
            LLAMA_PROD_PREMIUM = 2
        }

        enum PremiumModelStatus {
            UNKNOWN_STATUS = 0,
            AVAILABLE = 1,
            QUOTA_EXCEED_LIMIT = 2
        }
    }

    interface IBotReminderMetadata extends AICommon.BotReminderMetadata.$Properties {
    }

    class BotReminderMetadata {
        constructor(p?: AICommon.BotReminderMetadata.$Properties);
        $unknowns?: Uint8Array[];
        requestMessageKey?: (Protocol.MessageKey.$Properties|null);
        action?: (AICommon.BotReminderMetadata.ReminderAction|null);
        name?: (string|null);
        nextTriggerTimestamp?: (number|Long|null);
        frequency?: (AICommon.BotReminderMetadata.ReminderFrequency|null);
        static create(properties: AICommon.BotReminderMetadata.$Shape): AICommon.BotReminderMetadata & AICommon.BotReminderMetadata.$Shape;
        static create(properties?: AICommon.BotReminderMetadata.$Properties): AICommon.BotReminderMetadata;
        static encode(m: AICommon.BotReminderMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotReminderMetadata & AICommon.BotReminderMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotReminderMetadata;
        static toObject(m: AICommon.BotReminderMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotReminderMetadata {
        interface $Properties {
            requestMessageKey?: (Protocol.MessageKey.$Properties|null);
            action?: (AICommon.BotReminderMetadata.ReminderAction|null);
            name?: (string|null);
            nextTriggerTimestamp?: (number|Long|null);
            frequency?: (AICommon.BotReminderMetadata.ReminderFrequency|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotReminderMetadata.$Properties;

        enum ReminderAction {
            NOTIFY = 1,
            CREATE = 2,
            DELETE = 3,
            UPDATE = 4
        }

        enum ReminderFrequency {
            ONCE = 1,
            DAILY = 2,
            WEEKLY = 3,
            BIWEEKLY = 4,
            MONTHLY = 5
        }
    }

    interface IBotMemuMetadata extends AICommon.BotMemuMetadata.$Properties {
    }

    class BotMemuMetadata {
        constructor(p?: AICommon.BotMemuMetadata.$Properties);
        $unknowns?: Uint8Array[];
        faceImages: AICommon.BotMediaMetadata.$Properties[];
        static create(properties: AICommon.BotMemuMetadata.$Shape): AICommon.BotMemuMetadata & AICommon.BotMemuMetadata.$Shape;
        static create(properties?: AICommon.BotMemuMetadata.$Properties): AICommon.BotMemuMetadata;
        static encode(m: AICommon.BotMemuMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMemuMetadata & AICommon.BotMemuMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMemuMetadata;
        static toObject(m: AICommon.BotMemuMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMemuMetadata {
        interface $Properties {
            faceImages?: (AICommon.BotMediaMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMemuMetadata.$Properties;
    }

    interface IBotMediaMetadata extends AICommon.BotMediaMetadata.$Properties {
    }

    class BotMediaMetadata {
        constructor(p?: AICommon.BotMediaMetadata.$Properties);
        $unknowns?: Uint8Array[];
        fileSha256?: (string|null);
        mediaKey?: (string|null);
        fileEncSha256?: (string|null);
        directPath?: (string|null);
        mediaKeyTimestamp?: (number|Long|null);
        mimetype?: (string|null);
        orientationType?: (AICommon.BotMediaMetadata.OrientationType|null);
        static create(properties: AICommon.BotMediaMetadata.$Shape): AICommon.BotMediaMetadata & AICommon.BotMediaMetadata.$Shape;
        static create(properties?: AICommon.BotMediaMetadata.$Properties): AICommon.BotMediaMetadata;
        static encode(m: AICommon.BotMediaMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMediaMetadata & AICommon.BotMediaMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMediaMetadata;
        static toObject(m: AICommon.BotMediaMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMediaMetadata {
        interface $Properties {
            fileSha256?: (string|null);
            mediaKey?: (string|null);
            fileEncSha256?: (string|null);
            directPath?: (string|null);
            mediaKeyTimestamp?: (number|Long|null);
            mimetype?: (string|null);
            orientationType?: (AICommon.BotMediaMetadata.OrientationType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMediaMetadata.$Properties;

        enum OrientationType {
            CENTER = 1,
            LEFT = 2,
            RIGHT = 3
        }
    }

    interface IBotSessionMetadata extends AICommon.BotSessionMetadata.$Properties {
    }

    class BotSessionMetadata {
        constructor(p?: AICommon.BotSessionMetadata.$Properties);
        $unknowns?: Uint8Array[];
        sessionId?: (string|null);
        sessionSource?: (AICommon.BotSessionSource|null);
        static create(properties: AICommon.BotSessionMetadata.$Shape): AICommon.BotSessionMetadata & AICommon.BotSessionMetadata.$Shape;
        static create(properties?: AICommon.BotSessionMetadata.$Properties): AICommon.BotSessionMetadata;
        static encode(m: AICommon.BotSessionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotSessionMetadata & AICommon.BotSessionMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotSessionMetadata;
        static toObject(m: AICommon.BotSessionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSessionMetadata {
        interface $Properties {
            sessionId?: (string|null);
            sessionSource?: (AICommon.BotSessionSource|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotSessionMetadata.$Properties;
    }

    interface IBotMetricsMetadata extends AICommon.BotMetricsMetadata.$Properties {
    }

    class BotMetricsMetadata {
        constructor(p?: AICommon.BotMetricsMetadata.$Properties);
        $unknowns?: Uint8Array[];
        destinationId?: (string|null);
        destinationEntryPoint?: (AICommon.BotMetricsEntryPoint|null);
        threadOrigin?: (AICommon.BotMetricsThreadEntryPoint|null);
        static create(properties: AICommon.BotMetricsMetadata.$Shape): AICommon.BotMetricsMetadata & AICommon.BotMetricsMetadata.$Shape;
        static create(properties?: AICommon.BotMetricsMetadata.$Properties): AICommon.BotMetricsMetadata;
        static encode(m: AICommon.BotMetricsMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMetricsMetadata & AICommon.BotMetricsMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMetricsMetadata;
        static toObject(m: AICommon.BotMetricsMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMetricsMetadata {
        interface $Properties {
            destinationId?: (string|null);
            destinationEntryPoint?: (AICommon.BotMetricsEntryPoint|null);
            threadOrigin?: (AICommon.BotMetricsThreadEntryPoint|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMetricsMetadata.$Properties;
    }

    interface IBotRenderingMetadata extends AICommon.BotRenderingMetadata.$Properties {
    }

    class BotRenderingMetadata {
        constructor(p?: AICommon.BotRenderingMetadata.$Properties);
        $unknowns?: Uint8Array[];
        keywords: AICommon.BotRenderingMetadata.Keyword.$Properties[];
        static create(properties: AICommon.BotRenderingMetadata.$Shape): AICommon.BotRenderingMetadata & AICommon.BotRenderingMetadata.$Shape;
        static create(properties?: AICommon.BotRenderingMetadata.$Properties): AICommon.BotRenderingMetadata;
        static encode(m: AICommon.BotRenderingMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotRenderingMetadata & AICommon.BotRenderingMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotRenderingMetadata;
        static toObject(m: AICommon.BotRenderingMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotRenderingMetadata {
        interface $Properties {
            keywords?: (AICommon.BotRenderingMetadata.Keyword.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotRenderingMetadata.$Properties;

        interface IKeyword extends AICommon.BotRenderingMetadata.Keyword.$Properties {
        }

        class Keyword {
            constructor(p?: AICommon.BotRenderingMetadata.Keyword.$Properties);
            $unknowns?: Uint8Array[];
            value?: (string|null);
            associatedPrompts: string[];
            static create(properties: AICommon.BotRenderingMetadata.Keyword.$Shape): AICommon.BotRenderingMetadata.Keyword & AICommon.BotRenderingMetadata.Keyword.$Shape;
            static create(properties?: AICommon.BotRenderingMetadata.Keyword.$Properties): AICommon.BotRenderingMetadata.Keyword;
            static encode(m: AICommon.BotRenderingMetadata.Keyword.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotRenderingMetadata.Keyword & AICommon.BotRenderingMetadata.Keyword.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotRenderingMetadata.Keyword;
            static toObject(m: AICommon.BotRenderingMetadata.Keyword, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Keyword {
            interface $Properties {
                value?: (string|null);
                associatedPrompts?: (string[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotRenderingMetadata.Keyword.$Properties;
        }
    }

    interface IBotPromotionMessageMetadata extends AICommon.BotPromotionMessageMetadata.$Properties {
    }

    class BotPromotionMessageMetadata {
        constructor(p?: AICommon.BotPromotionMessageMetadata.$Properties);
        $unknowns?: Uint8Array[];
        promotionType?: (AICommon.BotPromotionMessageMetadata.BotPromotionType|null);
        buttonTitle?: (string|null);
        static create(properties: AICommon.BotPromotionMessageMetadata.$Shape): AICommon.BotPromotionMessageMetadata & AICommon.BotPromotionMessageMetadata.$Shape;
        static create(properties?: AICommon.BotPromotionMessageMetadata.$Properties): AICommon.BotPromotionMessageMetadata;
        static encode(m: AICommon.BotPromotionMessageMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotPromotionMessageMetadata & AICommon.BotPromotionMessageMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotPromotionMessageMetadata;
        static toObject(m: AICommon.BotPromotionMessageMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPromotionMessageMetadata {
        interface $Properties {
            promotionType?: (AICommon.BotPromotionMessageMetadata.BotPromotionType|null);
            buttonTitle?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotPromotionMessageMetadata.$Properties;

        enum BotPromotionType {
            UNKNOWN_TYPE = 0,
            C50 = 1,
            SURVEY_PLATFORM = 2
        }
    }

    interface IBotSignatureVerificationUseCaseProof extends AICommon.BotSignatureVerificationUseCaseProof.$Properties {
    }

    class BotSignatureVerificationUseCaseProof {
        constructor(p?: AICommon.BotSignatureVerificationUseCaseProof.$Properties);
        $unknowns?: Uint8Array[];
        version?: (number|null);
        useCase?: (AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);
        signature?: (Uint8Array|null);
        certificateChain: Uint8Array[];
        certificateChainSki: AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Properties[];
        static create(properties: AICommon.BotSignatureVerificationUseCaseProof.$Shape): AICommon.BotSignatureVerificationUseCaseProof & AICommon.BotSignatureVerificationUseCaseProof.$Shape;
        static create(properties?: AICommon.BotSignatureVerificationUseCaseProof.$Properties): AICommon.BotSignatureVerificationUseCaseProof;
        static encode(m: AICommon.BotSignatureVerificationUseCaseProof.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotSignatureVerificationUseCaseProof & AICommon.BotSignatureVerificationUseCaseProof.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotSignatureVerificationUseCaseProof;
        static toObject(m: AICommon.BotSignatureVerificationUseCaseProof, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSignatureVerificationUseCaseProof {
        interface $Properties {
            version?: (number|null);
            useCase?: (AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);
            signature?: (Uint8Array|null);
            certificateChain?: (Uint8Array[]|null);
            certificateChainSki?: (AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotSignatureVerificationUseCaseProof.$Properties;

        enum BotSignatureUseCase {
            UNSPECIFIED = 0,
            WA_BOT_MSG = 1,
            WA_TEE_BOT_MSG = 2,
            P2P_PILLS = 3,
            WA_WAFFLE = 4,
            WA_FEATURE_PKI = 5
        }

        interface ICertificateSKI extends AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Properties {
        }

        class CertificateSKI {
            constructor(p?: AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Properties);
            $unknowns?: Uint8Array[];
            useCase?: (AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);
            ski?: (Uint8Array|null);
            static create(properties: AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Shape): AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI & AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Shape;
            static create(properties?: AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Properties): AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI;
            static encode(m: AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI & AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Shape;
            static fromObject(d: { [k: string]: any }): AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI;
            static toObject(m: AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CertificateSKI {
            interface $Properties {
                useCase?: (AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);
                ski?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.$Properties;
        }
    }

    interface IBotSignatureVerificationMetadata extends AICommon.BotSignatureVerificationMetadata.$Properties {
    }

    class BotSignatureVerificationMetadata {
        constructor(p?: AICommon.BotSignatureVerificationMetadata.$Properties);
        $unknowns?: Uint8Array[];
        proofs: AICommon.BotSignatureVerificationUseCaseProof.$Properties[];
        static create(properties: AICommon.BotSignatureVerificationMetadata.$Shape): AICommon.BotSignatureVerificationMetadata & AICommon.BotSignatureVerificationMetadata.$Shape;
        static create(properties?: AICommon.BotSignatureVerificationMetadata.$Properties): AICommon.BotSignatureVerificationMetadata;
        static encode(m: AICommon.BotSignatureVerificationMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotSignatureVerificationMetadata & AICommon.BotSignatureVerificationMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotSignatureVerificationMetadata;
        static toObject(m: AICommon.BotSignatureVerificationMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSignatureVerificationMetadata {
        interface $Properties {
            proofs?: (AICommon.BotSignatureVerificationUseCaseProof.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotSignatureVerificationMetadata.$Properties;
    }

    interface IBotMemoryFact extends AICommon.BotMemoryFact.$Properties {
    }

    class BotMemoryFact {
        constructor(p?: AICommon.BotMemoryFact.$Properties);
        $unknowns?: Uint8Array[];
        fact?: (string|null);
        factId?: (string|null);
        static create(properties: AICommon.BotMemoryFact.$Shape): AICommon.BotMemoryFact & AICommon.BotMemoryFact.$Shape;
        static create(properties?: AICommon.BotMemoryFact.$Properties): AICommon.BotMemoryFact;
        static encode(m: AICommon.BotMemoryFact.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMemoryFact & AICommon.BotMemoryFact.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMemoryFact;
        static toObject(m: AICommon.BotMemoryFact, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMemoryFact {
        interface $Properties {
            fact?: (string|null);
            factId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMemoryFact.$Properties;
    }

    interface IBotMemoryMetadata extends AICommon.BotMemoryMetadata.$Properties {
    }

    class BotMemoryMetadata {
        constructor(p?: AICommon.BotMemoryMetadata.$Properties);
        $unknowns?: Uint8Array[];
        addedFacts: AICommon.BotMemoryFact.$Properties[];
        removedFacts: AICommon.BotMemoryFact.$Properties[];
        disclaimer?: (string|null);
        static create(properties: AICommon.BotMemoryMetadata.$Shape): AICommon.BotMemoryMetadata & AICommon.BotMemoryMetadata.$Shape;
        static create(properties?: AICommon.BotMemoryMetadata.$Properties): AICommon.BotMemoryMetadata;
        static encode(m: AICommon.BotMemoryMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotMemoryMetadata & AICommon.BotMemoryMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotMemoryMetadata;
        static toObject(m: AICommon.BotMemoryMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMemoryMetadata {
        interface $Properties {
            addedFacts?: (AICommon.BotMemoryFact.$Properties[]|null);
            removedFacts?: (AICommon.BotMemoryFact.$Properties[]|null);
            disclaimer?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotMemoryMetadata.$Properties;
    }

    interface IBotLinkedAccount extends AICommon.BotLinkedAccount.$Properties {
    }

    class BotLinkedAccount {
        constructor(p?: AICommon.BotLinkedAccount.$Properties);
        $unknowns?: Uint8Array[];
        type?: (AICommon.BotLinkedAccount.BotLinkedAccountType|null);
        static create(properties: AICommon.BotLinkedAccount.$Shape): AICommon.BotLinkedAccount & AICommon.BotLinkedAccount.$Shape;
        static create(properties?: AICommon.BotLinkedAccount.$Properties): AICommon.BotLinkedAccount;
        static encode(m: AICommon.BotLinkedAccount.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotLinkedAccount & AICommon.BotLinkedAccount.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotLinkedAccount;
        static toObject(m: AICommon.BotLinkedAccount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotLinkedAccount {
        interface $Properties {
            type?: (AICommon.BotLinkedAccount.BotLinkedAccountType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotLinkedAccount.$Properties;

        enum BotLinkedAccountType {
            BOT_LINKED_ACCOUNT_TYPE_1P = 0
        }
    }

    interface IBotLinkedAccountsMetadata extends AICommon.BotLinkedAccountsMetadata.$Properties {
    }

    class BotLinkedAccountsMetadata {
        constructor(p?: AICommon.BotLinkedAccountsMetadata.$Properties);
        $unknowns?: Uint8Array[];
        accounts: AICommon.BotLinkedAccount.$Properties[];
        acAuthTokens?: (Uint8Array|null);
        acErrorCode?: (number|null);
        static create(properties: AICommon.BotLinkedAccountsMetadata.$Shape): AICommon.BotLinkedAccountsMetadata & AICommon.BotLinkedAccountsMetadata.$Shape;
        static create(properties?: AICommon.BotLinkedAccountsMetadata.$Properties): AICommon.BotLinkedAccountsMetadata;
        static encode(m: AICommon.BotLinkedAccountsMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotLinkedAccountsMetadata & AICommon.BotLinkedAccountsMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotLinkedAccountsMetadata;
        static toObject(m: AICommon.BotLinkedAccountsMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotLinkedAccountsMetadata {
        interface $Properties {
            accounts?: (AICommon.BotLinkedAccount.$Properties[]|null);
            acAuthTokens?: (Uint8Array|null);
            acErrorCode?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotLinkedAccountsMetadata.$Properties;
    }

    interface IBotPromptSuggestion extends AICommon.BotPromptSuggestion.$Properties {
    }

    class BotPromptSuggestion {
        constructor(p?: AICommon.BotPromptSuggestion.$Properties);
        $unknowns?: Uint8Array[];
        prompt?: (string|null);
        promptId?: (string|null);
        static create(properties: AICommon.BotPromptSuggestion.$Shape): AICommon.BotPromptSuggestion & AICommon.BotPromptSuggestion.$Shape;
        static create(properties?: AICommon.BotPromptSuggestion.$Properties): AICommon.BotPromptSuggestion;
        static encode(m: AICommon.BotPromptSuggestion.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotPromptSuggestion & AICommon.BotPromptSuggestion.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotPromptSuggestion;
        static toObject(m: AICommon.BotPromptSuggestion, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPromptSuggestion {
        interface $Properties {
            prompt?: (string|null);
            promptId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotPromptSuggestion.$Properties;
    }

    interface IBotPromptSuggestions extends AICommon.BotPromptSuggestions.$Properties {
    }

    class BotPromptSuggestions {
        constructor(p?: AICommon.BotPromptSuggestions.$Properties);
        $unknowns?: Uint8Array[];
        suggestions: AICommon.BotPromptSuggestion.$Properties[];
        static create(properties: AICommon.BotPromptSuggestions.$Shape): AICommon.BotPromptSuggestions & AICommon.BotPromptSuggestions.$Shape;
        static create(properties?: AICommon.BotPromptSuggestions.$Properties): AICommon.BotPromptSuggestions;
        static encode(m: AICommon.BotPromptSuggestions.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotPromptSuggestions & AICommon.BotPromptSuggestions.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotPromptSuggestions;
        static toObject(m: AICommon.BotPromptSuggestions, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPromptSuggestions {
        interface $Properties {
            suggestions?: (AICommon.BotPromptSuggestion.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotPromptSuggestions.$Properties;
    }

    interface IBotSuggestedPromptMetadata extends AICommon.BotSuggestedPromptMetadata.$Properties {
    }

    class BotSuggestedPromptMetadata {
        constructor(p?: AICommon.BotSuggestedPromptMetadata.$Properties);
        $unknowns?: Uint8Array[];
        suggestedPrompts: string[];
        selectedPromptIndex?: (number|null);
        promptSuggestions?: (AICommon.BotPromptSuggestions.$Properties|null);
        selectedPromptId?: (string|null);
        static create(properties: AICommon.BotSuggestedPromptMetadata.$Shape): AICommon.BotSuggestedPromptMetadata & AICommon.BotSuggestedPromptMetadata.$Shape;
        static create(properties?: AICommon.BotSuggestedPromptMetadata.$Properties): AICommon.BotSuggestedPromptMetadata;
        static encode(m: AICommon.BotSuggestedPromptMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotSuggestedPromptMetadata & AICommon.BotSuggestedPromptMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotSuggestedPromptMetadata;
        static toObject(m: AICommon.BotSuggestedPromptMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSuggestedPromptMetadata {
        interface $Properties {
            suggestedPrompts?: (string[]|null);
            selectedPromptIndex?: (number|null);
            promptSuggestions?: (AICommon.BotPromptSuggestions.$Properties|null);
            selectedPromptId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotSuggestedPromptMetadata.$Properties;
    }

    interface IBotPluginMetadata extends AICommon.BotPluginMetadata.$Properties {
    }

    class BotPluginMetadata {
        constructor(p?: AICommon.BotPluginMetadata.$Properties);
        $unknowns?: Uint8Array[];
        provider?: (AICommon.BotPluginMetadata.SearchProvider|null);
        pluginType?: (AICommon.BotPluginMetadata.PluginType|null);
        thumbnailCdnUrl?: (string|null);
        profilePhotoCdnUrl?: (string|null);
        searchProviderUrl?: (string|null);
        referenceIndex?: (number|null);
        expectedLinksCount?: (number|null);
        searchQuery?: (string|null);
        parentPluginMessageKey?: (Protocol.MessageKey.$Properties|null);
        deprecatedField?: (AICommon.BotPluginMetadata.PluginType|null);
        parentPluginType?: (AICommon.BotPluginMetadata.PluginType|null);
        faviconCdnUrl?: (string|null);
        static create(properties: AICommon.BotPluginMetadata.$Shape): AICommon.BotPluginMetadata & AICommon.BotPluginMetadata.$Shape;
        static create(properties?: AICommon.BotPluginMetadata.$Properties): AICommon.BotPluginMetadata;
        static encode(m: AICommon.BotPluginMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): AICommon.BotPluginMetadata & AICommon.BotPluginMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): AICommon.BotPluginMetadata;
        static toObject(m: AICommon.BotPluginMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPluginMetadata {
        interface $Properties {
            provider?: (AICommon.BotPluginMetadata.SearchProvider|null);
            pluginType?: (AICommon.BotPluginMetadata.PluginType|null);
            thumbnailCdnUrl?: (string|null);
            profilePhotoCdnUrl?: (string|null);
            searchProviderUrl?: (string|null);
            referenceIndex?: (number|null);
            expectedLinksCount?: (number|null);
            searchQuery?: (string|null);
            parentPluginMessageKey?: (Protocol.MessageKey.$Properties|null);
            deprecatedField?: (AICommon.BotPluginMetadata.PluginType|null);
            parentPluginType?: (AICommon.BotPluginMetadata.PluginType|null);
            faviconCdnUrl?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = AICommon.BotPluginMetadata.$Properties;

        enum PluginType {
            UNKNOWN_PLUGIN = 0,
            REELS = 1,
            SEARCH = 2
        }

        enum SearchProvider {
            UNKNOWN = 0,
            BING = 1,
            GOOGLE = 2,
            SUPPORT = 3
        }
    }

    enum SessionTransparencyType {
        UNKNOWN_TYPE = 0,
        NY_AI_SAFETY_DISCLAIMER = 1
    }

    enum AISubscriptionRequestType {
        UNSPECIFIED = 0,
        THINK_HARD = 1,
        IMAGE_GEN = 2,
        VIDEO_GEN = 3
    }

    enum BotSessionSource {
        NONE = 0,
        NULL_STATE = 1,
        TYPEAHEAD = 2,
        USER_INPUT = 3,
        EMU_FLASH = 4,
        EMU_FLASH_FOLLOWUP = 5,
        VOICE = 6,
        AI_HOME_SESSION = 7
    }

    enum BotMetricsThreadEntryPoint {
        AI_TAB_THREAD = 1,
        AI_HOME_THREAD = 2,
        AI_DEEPLINK_IMMERSIVE_THREAD = 3,
        AI_DEEPLINK_THREAD = 4,
        ASK_META_AI_CONTEXT_MENU_THREAD = 5
    }

    enum BotMetricsEntryPoint {
        UNDEFINED_ENTRY_POINT = 0,
        FAVICON = 1,
        CHATLIST = 2,
        AISEARCH_NULL_STATE_PAPER_PLANE = 3,
        AISEARCH_NULL_STATE_SUGGESTION = 4,
        AISEARCH_TYPE_AHEAD_SUGGESTION = 5,
        AISEARCH_TYPE_AHEAD_PAPER_PLANE = 6,
        AISEARCH_TYPE_AHEAD_RESULT_CHATLIST = 7,
        AISEARCH_TYPE_AHEAD_RESULT_MESSAGES = 8,
        AIVOICE_SEARCH_BAR = 9,
        AIVOICE_FAVICON = 10,
        AISTUDIO = 11,
        DEEPLINK = 12,
        NOTIFICATION = 13,
        PROFILE_MESSAGE_BUTTON = 14,
        FORWARD = 15,
        APP_SHORTCUT = 16,
        FF_FAMILY = 17,
        AI_TAB = 18,
        AI_HOME = 19,
        AI_DEEPLINK_IMMERSIVE = 20,
        AI_DEEPLINK = 21,
        META_AI_CHAT_SHORTCUT_AI_STUDIO = 22,
        UGC_CHAT_SHORTCUT_AI_STUDIO = 23,
        NEW_CHAT_AI_STUDIO = 24,
        AIVOICE_FAVICON_CALL_HISTORY = 25,
        ASK_META_AI_CONTEXT_MENU = 26,
        ASK_META_AI_CONTEXT_MENU_1ON1 = 27,
        ASK_META_AI_CONTEXT_MENU_GROUP = 28,
        INVOKE_META_AI_1ON1 = 29,
        INVOKE_META_AI_GROUP = 30,
        META_AI_FORWARD = 31,
        NEW_CHAT_AI_CONTACT = 32,
        MESSAGE_QUICK_ACTION_1_ON_1_CHAT = 33,
        MESSAGE_QUICK_ACTION_GROUP_CHAT = 34,
        ATTACHMENT_TRAY_1_ON_1_CHAT = 35,
        ATTACHMENT_TRAY_GROUP_CHAT = 36,
        ASK_META_AI_MEDIA_VIEWER_1ON1 = 37,
        ASK_META_AI_MEDIA_VIEWER_GROUP = 38,
        MEDIA_PICKER_1_ON_1_CHAT = 39,
        MEDIA_PICKER_GROUP_CHAT = 40,
        ASK_META_AI_NO_SEARCH_RESULTS = 41,
        META_AI_SETTINGS = 45,
        WEB_INTRO_PANEL = 46,
        WEB_NAVIGATION_BAR = 47,
        GROUP_MEMBER = 54,
        CHATLIST_SEARCH = 55,
        NEW_CHAT_LIST = 56,
        CONTACTS_TAB = 57,
        NEW_3P_AGENT_CREATION = 58
    }
}

export namespace Adv {

    interface IADVSignedDeviceIdentityHMAC extends Adv.ADVSignedDeviceIdentityHMAC.$Properties {
    }

    class ADVSignedDeviceIdentityHMAC {
        constructor(p?: Adv.ADVSignedDeviceIdentityHMAC.$Properties);
        $unknowns?: Uint8Array[];
        details?: (Uint8Array|null);
        hmac?: (Uint8Array|null);
        accountType?: (Adv.ADVEncryptionType|null);
        static create(properties: Adv.ADVSignedDeviceIdentityHMAC.$Shape): Adv.ADVSignedDeviceIdentityHMAC & Adv.ADVSignedDeviceIdentityHMAC.$Shape;
        static create(properties?: Adv.ADVSignedDeviceIdentityHMAC.$Properties): Adv.ADVSignedDeviceIdentityHMAC;
        static encode(m: Adv.ADVSignedDeviceIdentityHMAC.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Adv.ADVSignedDeviceIdentityHMAC & Adv.ADVSignedDeviceIdentityHMAC.$Shape;
        static fromObject(d: { [k: string]: any }): Adv.ADVSignedDeviceIdentityHMAC;
        static toObject(m: Adv.ADVSignedDeviceIdentityHMAC, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ADVSignedDeviceIdentityHMAC {
        interface $Properties {
            details?: (Uint8Array|null);
            hmac?: (Uint8Array|null);
            accountType?: (Adv.ADVEncryptionType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Adv.ADVSignedDeviceIdentityHMAC.$Properties;
    }

    interface IADVSignedDeviceIdentity extends Adv.ADVSignedDeviceIdentity.$Properties {
    }

    class ADVSignedDeviceIdentity {
        constructor(p?: Adv.ADVSignedDeviceIdentity.$Properties);
        $unknowns?: Uint8Array[];
        details?: (Uint8Array|null);
        accountSignatureKey?: (Uint8Array|null);
        accountSignature?: (Uint8Array|null);
        deviceSignature?: (Uint8Array|null);
        static create(properties: Adv.ADVSignedDeviceIdentity.$Shape): Adv.ADVSignedDeviceIdentity & Adv.ADVSignedDeviceIdentity.$Shape;
        static create(properties?: Adv.ADVSignedDeviceIdentity.$Properties): Adv.ADVSignedDeviceIdentity;
        static encode(m: Adv.ADVSignedDeviceIdentity.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Adv.ADVSignedDeviceIdentity & Adv.ADVSignedDeviceIdentity.$Shape;
        static fromObject(d: { [k: string]: any }): Adv.ADVSignedDeviceIdentity;
        static toObject(m: Adv.ADVSignedDeviceIdentity, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ADVSignedDeviceIdentity {
        interface $Properties {
            details?: (Uint8Array|null);
            accountSignatureKey?: (Uint8Array|null);
            accountSignature?: (Uint8Array|null);
            deviceSignature?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Adv.ADVSignedDeviceIdentity.$Properties;
    }

    interface IADVDeviceIdentity extends Adv.ADVDeviceIdentity.$Properties {
    }

    class ADVDeviceIdentity {
        constructor(p?: Adv.ADVDeviceIdentity.$Properties);
        $unknowns?: Uint8Array[];
        rawId?: (number|null);
        timestamp?: (number|Long|null);
        keyIndex?: (number|null);
        accountType?: (Adv.ADVEncryptionType|null);
        deviceType?: (Adv.ADVEncryptionType|null);
        static create(properties: Adv.ADVDeviceIdentity.$Shape): Adv.ADVDeviceIdentity & Adv.ADVDeviceIdentity.$Shape;
        static create(properties?: Adv.ADVDeviceIdentity.$Properties): Adv.ADVDeviceIdentity;
        static encode(m: Adv.ADVDeviceIdentity.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Adv.ADVDeviceIdentity & Adv.ADVDeviceIdentity.$Shape;
        static fromObject(d: { [k: string]: any }): Adv.ADVDeviceIdentity;
        static toObject(m: Adv.ADVDeviceIdentity, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ADVDeviceIdentity {
        interface $Properties {
            rawId?: (number|null);
            timestamp?: (number|Long|null);
            keyIndex?: (number|null);
            accountType?: (Adv.ADVEncryptionType|null);
            deviceType?: (Adv.ADVEncryptionType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Adv.ADVDeviceIdentity.$Properties;
    }

    interface IADVSignedKeyIndexList extends Adv.ADVSignedKeyIndexList.$Properties {
    }

    class ADVSignedKeyIndexList {
        constructor(p?: Adv.ADVSignedKeyIndexList.$Properties);
        $unknowns?: Uint8Array[];
        details?: (Uint8Array|null);
        accountSignature?: (Uint8Array|null);
        accountSignatureKey?: (Uint8Array|null);
        static create(properties: Adv.ADVSignedKeyIndexList.$Shape): Adv.ADVSignedKeyIndexList & Adv.ADVSignedKeyIndexList.$Shape;
        static create(properties?: Adv.ADVSignedKeyIndexList.$Properties): Adv.ADVSignedKeyIndexList;
        static encode(m: Adv.ADVSignedKeyIndexList.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Adv.ADVSignedKeyIndexList & Adv.ADVSignedKeyIndexList.$Shape;
        static fromObject(d: { [k: string]: any }): Adv.ADVSignedKeyIndexList;
        static toObject(m: Adv.ADVSignedKeyIndexList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ADVSignedKeyIndexList {
        interface $Properties {
            details?: (Uint8Array|null);
            accountSignature?: (Uint8Array|null);
            accountSignatureKey?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Adv.ADVSignedKeyIndexList.$Properties;
    }

    interface IADVKeyIndexList extends Adv.ADVKeyIndexList.$Properties {
    }

    class ADVKeyIndexList {
        constructor(p?: Adv.ADVKeyIndexList.$Properties);
        $unknowns?: Uint8Array[];
        rawId?: (number|null);
        timestamp?: (number|Long|null);
        currentIndex?: (number|null);
        validIndexes: number[];
        accountType?: (Adv.ADVEncryptionType|null);
        static create(properties: Adv.ADVKeyIndexList.$Shape): Adv.ADVKeyIndexList & Adv.ADVKeyIndexList.$Shape;
        static create(properties?: Adv.ADVKeyIndexList.$Properties): Adv.ADVKeyIndexList;
        static encode(m: Adv.ADVKeyIndexList.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Adv.ADVKeyIndexList & Adv.ADVKeyIndexList.$Shape;
        static fromObject(d: { [k: string]: any }): Adv.ADVKeyIndexList;
        static toObject(m: Adv.ADVKeyIndexList, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ADVKeyIndexList {
        interface $Properties {
            rawId?: (number|null);
            timestamp?: (number|Long|null);
            currentIndex?: (number|null);
            validIndexes?: (number[]|null);
            accountType?: (Adv.ADVEncryptionType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Adv.ADVKeyIndexList.$Properties;
    }

    enum ADVEncryptionType {
        E2EE = 0,
        HOSTED = 1,
        NON_E2EE = 2
    }
}

export namespace Aea {

    interface INonE2EEAttestation extends Aea.NonE2EEAttestation.$Properties {
    }

    class NonE2EEAttestation {
        constructor(p?: Aea.NonE2EEAttestation.$Properties);
        $unknowns?: Uint8Array[];
        accountType?: (Aea.NonE2EEAttestation.AccountType|null);
        static create(properties: Aea.NonE2EEAttestation.$Shape): Aea.NonE2EEAttestation & Aea.NonE2EEAttestation.$Shape;
        static create(properties?: Aea.NonE2EEAttestation.$Properties): Aea.NonE2EEAttestation;
        static encode(m: Aea.NonE2EEAttestation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Aea.NonE2EEAttestation & Aea.NonE2EEAttestation.$Shape;
        static fromObject(d: { [k: string]: any }): Aea.NonE2EEAttestation;
        static toObject(m: Aea.NonE2EEAttestation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace NonE2EEAttestation {
        interface $Properties {
            accountType?: (Aea.NonE2EEAttestation.AccountType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Aea.NonE2EEAttestation.$Properties;

        enum AccountType {
            E2EE = 0,
            HYBRID_E2EE = 1,
            NON_E2EE = 2
        }
    }
}

export namespace StatusAttributions {

    interface IStatusAttribution extends StatusAttributions.StatusAttribution.$Properties {
    }

    class StatusAttribution {
        constructor(p?: StatusAttributions.StatusAttribution.$Properties);
        $unknowns?: Uint8Array[];
        type?: (StatusAttributions.StatusAttribution.Type|null);
        actionUrl?: (string|null);
        statusReshare?: (StatusAttributions.StatusAttribution.StatusReshare.$Properties|null);
        externalShare?: (StatusAttributions.StatusAttribution.ExternalShare.$Properties|null);
        music?: (StatusAttributions.StatusAttribution.Music.$Properties|null);
        groupStatus?: (StatusAttributions.StatusAttribution.GroupStatus.$Properties|null);
        rlAttribution?: (StatusAttributions.StatusAttribution.RLAttribution.$Properties|null);
        aiCreatedAttribution?: (StatusAttributions.StatusAttribution.AiCreatedAttribution.$Properties|null);
        attributionData?: ("statusReshare"|"externalShare"|"music"|"groupStatus"|"rlAttribution"|"aiCreatedAttribution");
        static create(properties: StatusAttributions.StatusAttribution.$Shape): StatusAttributions.StatusAttribution & StatusAttributions.StatusAttribution.$Shape;
        static create(properties?: StatusAttributions.StatusAttribution.$Properties): StatusAttributions.StatusAttribution;
        static encode(m: StatusAttributions.StatusAttribution.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution & StatusAttributions.StatusAttribution.$Shape;
        static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution;
        static toObject(m: StatusAttributions.StatusAttribution, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace StatusAttribution {
        interface $Properties {
            type?: (StatusAttributions.StatusAttribution.Type|null);
            actionUrl?: (string|null);
            statusReshare?: (StatusAttributions.StatusAttribution.StatusReshare.$Properties|null);
            externalShare?: (StatusAttributions.StatusAttribution.ExternalShare.$Properties|null);
            music?: (StatusAttributions.StatusAttribution.Music.$Properties|null);
            groupStatus?: (StatusAttributions.StatusAttribution.GroupStatus.$Properties|null);
            rlAttribution?: (StatusAttributions.StatusAttribution.RLAttribution.$Properties|null);
            aiCreatedAttribution?: (StatusAttributions.StatusAttribution.AiCreatedAttribution.$Properties|null);
            attributionData?: ("statusReshare"|"externalShare"|"music"|"groupStatus"|"rlAttribution"|"aiCreatedAttribution");
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          type?: StatusAttributions.StatusAttribution.Type|null;
          actionUrl?: string|null;
          statusReshare?: StatusAttributions.StatusAttribution.StatusReshare.$Shape|null;
          externalShare?: StatusAttributions.StatusAttribution.ExternalShare.$Shape|null;
          music?: StatusAttributions.StatusAttribution.Music.$Shape|null;
          groupStatus?: StatusAttributions.StatusAttribution.GroupStatus.$Shape|null;
          rlAttribution?: StatusAttributions.StatusAttribution.RLAttribution.$Shape|null;
          aiCreatedAttribution?: StatusAttributions.StatusAttribution.AiCreatedAttribution.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ attributionData?: undefined; statusReshare?: null; externalShare?: null; music?: null; groupStatus?: null; rlAttribution?: null; aiCreatedAttribution?: null }|{ attributionData?: "statusReshare"; statusReshare: StatusAttributions.StatusAttribution.StatusReshare.$Shape; externalShare?: null; music?: null; groupStatus?: null; rlAttribution?: null; aiCreatedAttribution?: null }|{ attributionData?: "externalShare"; statusReshare?: null; externalShare: StatusAttributions.StatusAttribution.ExternalShare.$Shape; music?: null; groupStatus?: null; rlAttribution?: null; aiCreatedAttribution?: null }|{ attributionData?: "music"; statusReshare?: null; externalShare?: null; music: StatusAttributions.StatusAttribution.Music.$Shape; groupStatus?: null; rlAttribution?: null; aiCreatedAttribution?: null }|{ attributionData?: "groupStatus"; statusReshare?: null; externalShare?: null; music?: null; groupStatus: StatusAttributions.StatusAttribution.GroupStatus.$Shape; rlAttribution?: null; aiCreatedAttribution?: null }|{ attributionData?: "rlAttribution"; statusReshare?: null; externalShare?: null; music?: null; groupStatus?: null; rlAttribution: StatusAttributions.StatusAttribution.RLAttribution.$Shape; aiCreatedAttribution?: null }|{ attributionData?: "aiCreatedAttribution"; statusReshare?: null; externalShare?: null; music?: null; groupStatus?: null; rlAttribution?: null; aiCreatedAttribution: StatusAttributions.StatusAttribution.AiCreatedAttribution.$Shape })
        );

        interface IAiCreatedAttribution extends StatusAttributions.StatusAttribution.AiCreatedAttribution.$Properties {
        }

        class AiCreatedAttribution {
            constructor(p?: StatusAttributions.StatusAttribution.AiCreatedAttribution.$Properties);
            $unknowns?: Uint8Array[];
            source?: (StatusAttributions.StatusAttribution.AiCreatedAttribution.Source|null);
            static create(properties: StatusAttributions.StatusAttribution.AiCreatedAttribution.$Shape): StatusAttributions.StatusAttribution.AiCreatedAttribution & StatusAttributions.StatusAttribution.AiCreatedAttribution.$Shape;
            static create(properties?: StatusAttributions.StatusAttribution.AiCreatedAttribution.$Properties): StatusAttributions.StatusAttribution.AiCreatedAttribution;
            static encode(m: StatusAttributions.StatusAttribution.AiCreatedAttribution.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution.AiCreatedAttribution & StatusAttributions.StatusAttribution.AiCreatedAttribution.$Shape;
            static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution.AiCreatedAttribution;
            static toObject(m: StatusAttributions.StatusAttribution.AiCreatedAttribution, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AiCreatedAttribution {
            interface $Properties {
                source?: (StatusAttributions.StatusAttribution.AiCreatedAttribution.Source|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = StatusAttributions.StatusAttribution.AiCreatedAttribution.$Properties;

            enum Source {
                UNKNOWN = 0,
                STATUS_MIMICRY = 1
            }
        }

        interface IExternalShare extends StatusAttributions.StatusAttribution.ExternalShare.$Properties {
        }

        class ExternalShare {
            constructor(p?: StatusAttributions.StatusAttribution.ExternalShare.$Properties);
            $unknowns?: Uint8Array[];
            actionUrl?: (string|null);
            source?: (StatusAttributions.StatusAttribution.ExternalShare.Source|null);
            duration?: (number|null);
            actionFallbackUrl?: (string|null);
            static create(properties: StatusAttributions.StatusAttribution.ExternalShare.$Shape): StatusAttributions.StatusAttribution.ExternalShare & StatusAttributions.StatusAttribution.ExternalShare.$Shape;
            static create(properties?: StatusAttributions.StatusAttribution.ExternalShare.$Properties): StatusAttributions.StatusAttribution.ExternalShare;
            static encode(m: StatusAttributions.StatusAttribution.ExternalShare.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution.ExternalShare & StatusAttributions.StatusAttribution.ExternalShare.$Shape;
            static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution.ExternalShare;
            static toObject(m: StatusAttributions.StatusAttribution.ExternalShare, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ExternalShare {
            interface $Properties {
                actionUrl?: (string|null);
                source?: (StatusAttributions.StatusAttribution.ExternalShare.Source|null);
                duration?: (number|null);
                actionFallbackUrl?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = StatusAttributions.StatusAttribution.ExternalShare.$Properties;

            enum Source {
                UNKNOWN = 0,
                INSTAGRAM = 1,
                FACEBOOK = 2,
                MESSENGER = 3,
                SPOTIFY = 4,
                YOUTUBE = 5,
                PINTEREST = 6,
                THREADS = 7,
                APPLE_MUSIC = 8,
                SHARECHAT = 9,
                GOOGLE_PHOTOS = 10,
                SOUNDCLOUD = 11,
                SHAZAM = 12,
                PICSART = 13
            }
        }

        interface IGroupStatus extends StatusAttributions.StatusAttribution.GroupStatus.$Properties {
        }

        class GroupStatus {
            constructor(p?: StatusAttributions.StatusAttribution.GroupStatus.$Properties);
            $unknowns?: Uint8Array[];
            authorJid?: (string|null);
            static create(properties: StatusAttributions.StatusAttribution.GroupStatus.$Shape): StatusAttributions.StatusAttribution.GroupStatus & StatusAttributions.StatusAttribution.GroupStatus.$Shape;
            static create(properties?: StatusAttributions.StatusAttribution.GroupStatus.$Properties): StatusAttributions.StatusAttribution.GroupStatus;
            static encode(m: StatusAttributions.StatusAttribution.GroupStatus.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution.GroupStatus & StatusAttributions.StatusAttribution.GroupStatus.$Shape;
            static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution.GroupStatus;
            static toObject(m: StatusAttributions.StatusAttribution.GroupStatus, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace GroupStatus {
            interface $Properties {
                authorJid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = StatusAttributions.StatusAttribution.GroupStatus.$Properties;
        }

        interface IMusic extends StatusAttributions.StatusAttribution.Music.$Properties {
        }

        class Music {
            constructor(p?: StatusAttributions.StatusAttribution.Music.$Properties);
            $unknowns?: Uint8Array[];
            authorName?: (string|null);
            songId?: (string|null);
            title?: (string|null);
            author?: (string|null);
            artistAttribution?: (string|null);
            isExplicit?: (boolean|null);
            static create(properties: StatusAttributions.StatusAttribution.Music.$Shape): StatusAttributions.StatusAttribution.Music & StatusAttributions.StatusAttribution.Music.$Shape;
            static create(properties?: StatusAttributions.StatusAttribution.Music.$Properties): StatusAttributions.StatusAttribution.Music;
            static encode(m: StatusAttributions.StatusAttribution.Music.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution.Music & StatusAttributions.StatusAttribution.Music.$Shape;
            static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution.Music;
            static toObject(m: StatusAttributions.StatusAttribution.Music, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Music {
            interface $Properties {
                authorName?: (string|null);
                songId?: (string|null);
                title?: (string|null);
                author?: (string|null);
                artistAttribution?: (string|null);
                isExplicit?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = StatusAttributions.StatusAttribution.Music.$Properties;
        }

        interface IRLAttribution extends StatusAttributions.StatusAttribution.RLAttribution.$Properties {
        }

        class RLAttribution {
            constructor(p?: StatusAttributions.StatusAttribution.RLAttribution.$Properties);
            $unknowns?: Uint8Array[];
            source?: (StatusAttributions.StatusAttribution.RLAttribution.Source|null);
            static create(properties: StatusAttributions.StatusAttribution.RLAttribution.$Shape): StatusAttributions.StatusAttribution.RLAttribution & StatusAttributions.StatusAttribution.RLAttribution.$Shape;
            static create(properties?: StatusAttributions.StatusAttribution.RLAttribution.$Properties): StatusAttributions.StatusAttribution.RLAttribution;
            static encode(m: StatusAttributions.StatusAttribution.RLAttribution.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution.RLAttribution & StatusAttributions.StatusAttribution.RLAttribution.$Shape;
            static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution.RLAttribution;
            static toObject(m: StatusAttributions.StatusAttribution.RLAttribution, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace RLAttribution {
            interface $Properties {
                source?: (StatusAttributions.StatusAttribution.RLAttribution.Source|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = StatusAttributions.StatusAttribution.RLAttribution.$Properties;

            enum Source {
                UNKNOWN = 0,
                RAY_BAN_META_GLASSES = 1,
                OAKLEY_META_GLASSES = 2,
                HYPERNOVA_GLASSES = 3
            }
        }

        interface IStatusReshare extends StatusAttributions.StatusAttribution.StatusReshare.$Properties {
        }

        class StatusReshare {
            constructor(p?: StatusAttributions.StatusAttribution.StatusReshare.$Properties);
            $unknowns?: Uint8Array[];
            source?: (StatusAttributions.StatusAttribution.StatusReshare.Source|null);
            metadata?: (StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Properties|null);
            static create(properties: StatusAttributions.StatusAttribution.StatusReshare.$Shape): StatusAttributions.StatusAttribution.StatusReshare & StatusAttributions.StatusAttribution.StatusReshare.$Shape;
            static create(properties?: StatusAttributions.StatusAttribution.StatusReshare.$Properties): StatusAttributions.StatusAttribution.StatusReshare;
            static encode(m: StatusAttributions.StatusAttribution.StatusReshare.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution.StatusReshare & StatusAttributions.StatusAttribution.StatusReshare.$Shape;
            static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution.StatusReshare;
            static toObject(m: StatusAttributions.StatusAttribution.StatusReshare, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusReshare {
            interface $Properties {
                source?: (StatusAttributions.StatusAttribution.StatusReshare.Source|null);
                metadata?: (StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = StatusAttributions.StatusAttribution.StatusReshare.$Properties;

            interface IMetadata extends StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Properties {
            }

            class Metadata {
                constructor(p?: StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Properties);
                $unknowns?: Uint8Array[];
                duration?: (number|null);
                channelJid?: (string|null);
                channelMessageId?: (number|null);
                hasMultipleReshares?: (boolean|null);
                static create(properties: StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Shape): StatusAttributions.StatusAttribution.StatusReshare.Metadata & StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Shape;
                static create(properties?: StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Properties): StatusAttributions.StatusAttribution.StatusReshare.Metadata;
                static encode(m: StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): StatusAttributions.StatusAttribution.StatusReshare.Metadata & StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Shape;
                static fromObject(d: { [k: string]: any }): StatusAttributions.StatusAttribution.StatusReshare.Metadata;
                static toObject(m: StatusAttributions.StatusAttribution.StatusReshare.Metadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Metadata {
                interface $Properties {
                    duration?: (number|null);
                    channelJid?: (string|null);
                    channelMessageId?: (number|null);
                    hasMultipleReshares?: (boolean|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = StatusAttributions.StatusAttribution.StatusReshare.Metadata.$Properties;
            }

            enum Source {
                UNKNOWN = 0,
                INTERNAL_RESHARE = 1,
                MENTION_RESHARE = 2,
                CHANNEL_RESHARE = 3,
                FORWARD = 4
            }
        }

        enum Type {
            UNKNOWN = 0,
            RESHARE = 1,
            EXTERNAL_SHARE = 2,
            MUSIC = 3,
            STATUS_MENTION = 4,
            GROUP_STATUS = 5,
            RL_ATTRIBUTION = 6,
            AI_CREATED = 7,
            LAYOUTS = 8,
            NEWSLETTER_STATUS = 9,
            STATUS_CLOSE_SHARING = 10,
            PAID_PARTNERSHIP = 11,
            USERNAME_STATUS = 12
        }
    }
}

export namespace ServerSync {

    interface ICoexStateSync extends ServerSync.CoexStateSync.$Properties {
    }

    class CoexStateSync {
        constructor(p?: ServerSync.CoexStateSync.$Properties);
        $unknowns?: Uint8Array[];
        collectionMutations: ServerSync.CoexStateSync.CollectionMutations.$Properties[];
        static create(properties: ServerSync.CoexStateSync.$Shape): ServerSync.CoexStateSync & ServerSync.CoexStateSync.$Shape;
        static create(properties?: ServerSync.CoexStateSync.$Properties): ServerSync.CoexStateSync;
        static encode(m: ServerSync.CoexStateSync.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.CoexStateSync & ServerSync.CoexStateSync.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.CoexStateSync;
        static toObject(m: ServerSync.CoexStateSync, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace CoexStateSync {
        interface $Properties {
            collectionMutations?: (ServerSync.CoexStateSync.CollectionMutations.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.CoexStateSync.$Properties;

        interface ICollectionMutations extends ServerSync.CoexStateSync.CollectionMutations.$Properties {
        }

        class CollectionMutations {
            constructor(p?: ServerSync.CoexStateSync.CollectionMutations.$Properties);
            $unknowns?: Uint8Array[];
            collection?: (string|null);
            mutations: ServerSync.CoexStateSync.Mutation.$Properties[];
            static create(properties: ServerSync.CoexStateSync.CollectionMutations.$Shape): ServerSync.CoexStateSync.CollectionMutations & ServerSync.CoexStateSync.CollectionMutations.$Shape;
            static create(properties?: ServerSync.CoexStateSync.CollectionMutations.$Properties): ServerSync.CoexStateSync.CollectionMutations;
            static encode(m: ServerSync.CoexStateSync.CollectionMutations.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.CoexStateSync.CollectionMutations & ServerSync.CoexStateSync.CollectionMutations.$Shape;
            static fromObject(d: { [k: string]: any }): ServerSync.CoexStateSync.CollectionMutations;
            static toObject(m: ServerSync.CoexStateSync.CollectionMutations, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CollectionMutations {
            interface $Properties {
                collection?: (string|null);
                mutations?: (ServerSync.CoexStateSync.Mutation.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = ServerSync.CoexStateSync.CollectionMutations.$Properties;
        }

        interface IMutation extends ServerSync.CoexStateSync.Mutation.$Properties {
        }

        class Mutation {
            constructor(p?: ServerSync.CoexStateSync.Mutation.$Properties);
            $unknowns?: Uint8Array[];
            index?: (ServerSync.SyncdIndex.$Properties|null);
            value?: (ServerSync.SyncdValue.$Properties|null);
            dirtyVersion?: (number|Long|null);
            operation?: (ServerSync.SyncdMutation.SyncdOperation|null);
            static create(properties: ServerSync.CoexStateSync.Mutation.$Shape): ServerSync.CoexStateSync.Mutation & ServerSync.CoexStateSync.Mutation.$Shape;
            static create(properties?: ServerSync.CoexStateSync.Mutation.$Properties): ServerSync.CoexStateSync.Mutation;
            static encode(m: ServerSync.CoexStateSync.Mutation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.CoexStateSync.Mutation & ServerSync.CoexStateSync.Mutation.$Shape;
            static fromObject(d: { [k: string]: any }): ServerSync.CoexStateSync.Mutation;
            static toObject(m: ServerSync.CoexStateSync.Mutation, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Mutation {
            interface $Properties {
                index?: (ServerSync.SyncdIndex.$Properties|null);
                value?: (ServerSync.SyncdValue.$Properties|null);
                dirtyVersion?: (number|Long|null);
                operation?: (ServerSync.SyncdMutation.SyncdOperation|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = ServerSync.CoexStateSync.Mutation.$Properties;
        }
    }

    interface ISyncdPatch extends ServerSync.SyncdPatch.$Properties {
    }

    class SyncdPatch {
        constructor(p?: ServerSync.SyncdPatch.$Properties);
        $unknowns?: Uint8Array[];
        version?: (ServerSync.SyncdVersion.$Properties|null);
        mutations: ServerSync.SyncdMutation.$Properties[];
        externalMutations?: (ServerSync.ExternalBlobReference.$Properties|null);
        snapshotMac?: (Uint8Array|null);
        patchMac?: (Uint8Array|null);
        keyId?: (ServerSync.KeyId.$Properties|null);
        exitCode?: (ServerSync.ExitCode.$Properties|null);
        deviceIndex?: (number|null);
        clientDebugData?: (Uint8Array|null);
        static create(properties: ServerSync.SyncdPatch.$Shape): ServerSync.SyncdPatch & ServerSync.SyncdPatch.$Shape;
        static create(properties?: ServerSync.SyncdPatch.$Properties): ServerSync.SyncdPatch;
        static encode(m: ServerSync.SyncdPatch.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdPatch & ServerSync.SyncdPatch.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdPatch;
        static toObject(m: ServerSync.SyncdPatch, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdPatch {
        interface $Properties {
            version?: (ServerSync.SyncdVersion.$Properties|null);
            mutations?: (ServerSync.SyncdMutation.$Properties[]|null);
            externalMutations?: (ServerSync.ExternalBlobReference.$Properties|null);
            snapshotMac?: (Uint8Array|null);
            patchMac?: (Uint8Array|null);
            keyId?: (ServerSync.KeyId.$Properties|null);
            exitCode?: (ServerSync.ExitCode.$Properties|null);
            deviceIndex?: (number|null);
            clientDebugData?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdPatch.$Properties;
    }

    interface ISyncdMutation extends ServerSync.SyncdMutation.$Properties {
    }

    class SyncdMutation {
        constructor(p?: ServerSync.SyncdMutation.$Properties);
        $unknowns?: Uint8Array[];
        operation?: (ServerSync.SyncdMutation.SyncdOperation|null);
        record?: (ServerSync.SyncdRecord.$Properties|null);
        static create(properties: ServerSync.SyncdMutation.$Shape): ServerSync.SyncdMutation & ServerSync.SyncdMutation.$Shape;
        static create(properties?: ServerSync.SyncdMutation.$Properties): ServerSync.SyncdMutation;
        static encode(m: ServerSync.SyncdMutation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdMutation & ServerSync.SyncdMutation.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdMutation;
        static toObject(m: ServerSync.SyncdMutation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdMutation {
        interface $Properties {
            operation?: (ServerSync.SyncdMutation.SyncdOperation|null);
            record?: (ServerSync.SyncdRecord.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdMutation.$Properties;

        enum SyncdOperation {
            SET = 0,
            REMOVE = 1
        }
    }

    interface ISyncdMutations extends ServerSync.SyncdMutations.$Properties {
    }

    class SyncdMutations {
        constructor(p?: ServerSync.SyncdMutations.$Properties);
        $unknowns?: Uint8Array[];
        mutations: ServerSync.SyncdMutation.$Properties[];
        static create(properties: ServerSync.SyncdMutations.$Shape): ServerSync.SyncdMutations & ServerSync.SyncdMutations.$Shape;
        static create(properties?: ServerSync.SyncdMutations.$Properties): ServerSync.SyncdMutations;
        static encode(m: ServerSync.SyncdMutations.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdMutations & ServerSync.SyncdMutations.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdMutations;
        static toObject(m: ServerSync.SyncdMutations, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdMutations {
        interface $Properties {
            mutations?: (ServerSync.SyncdMutation.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdMutations.$Properties;
    }

    interface ISyncdSnapshot extends ServerSync.SyncdSnapshot.$Properties {
    }

    class SyncdSnapshot {
        constructor(p?: ServerSync.SyncdSnapshot.$Properties);
        $unknowns?: Uint8Array[];
        version?: (ServerSync.SyncdVersion.$Properties|null);
        records: ServerSync.SyncdRecord.$Properties[];
        mac?: (Uint8Array|null);
        keyId?: (ServerSync.KeyId.$Properties|null);
        static create(properties: ServerSync.SyncdSnapshot.$Shape): ServerSync.SyncdSnapshot & ServerSync.SyncdSnapshot.$Shape;
        static create(properties?: ServerSync.SyncdSnapshot.$Properties): ServerSync.SyncdSnapshot;
        static encode(m: ServerSync.SyncdSnapshot.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdSnapshot & ServerSync.SyncdSnapshot.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdSnapshot;
        static toObject(m: ServerSync.SyncdSnapshot, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdSnapshot {
        interface $Properties {
            version?: (ServerSync.SyncdVersion.$Properties|null);
            records?: (ServerSync.SyncdRecord.$Properties[]|null);
            mac?: (Uint8Array|null);
            keyId?: (ServerSync.KeyId.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdSnapshot.$Properties;
    }

    interface IExternalBlobReference extends ServerSync.ExternalBlobReference.$Properties {
    }

    class ExternalBlobReference {
        constructor(p?: ServerSync.ExternalBlobReference.$Properties);
        $unknowns?: Uint8Array[];
        mediaKey?: (Uint8Array|null);
        directPath?: (string|null);
        handle?: (string|null);
        fileSizeBytes?: (number|Long|null);
        fileSha256?: (Uint8Array|null);
        fileEncSha256?: (Uint8Array|null);
        static create(properties: ServerSync.ExternalBlobReference.$Shape): ServerSync.ExternalBlobReference & ServerSync.ExternalBlobReference.$Shape;
        static create(properties?: ServerSync.ExternalBlobReference.$Properties): ServerSync.ExternalBlobReference;
        static encode(m: ServerSync.ExternalBlobReference.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.ExternalBlobReference & ServerSync.ExternalBlobReference.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.ExternalBlobReference;
        static toObject(m: ServerSync.ExternalBlobReference, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ExternalBlobReference {
        interface $Properties {
            mediaKey?: (Uint8Array|null);
            directPath?: (string|null);
            handle?: (string|null);
            fileSizeBytes?: (number|Long|null);
            fileSha256?: (Uint8Array|null);
            fileEncSha256?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.ExternalBlobReference.$Properties;
    }

    interface ISyncdRecord extends ServerSync.SyncdRecord.$Properties {
    }

    class SyncdRecord {
        constructor(p?: ServerSync.SyncdRecord.$Properties);
        $unknowns?: Uint8Array[];
        index?: (ServerSync.SyncdIndex.$Properties|null);
        value?: (ServerSync.SyncdValue.$Properties|null);
        keyId?: (ServerSync.KeyId.$Properties|null);
        static create(properties: ServerSync.SyncdRecord.$Shape): ServerSync.SyncdRecord & ServerSync.SyncdRecord.$Shape;
        static create(properties?: ServerSync.SyncdRecord.$Properties): ServerSync.SyncdRecord;
        static encode(m: ServerSync.SyncdRecord.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdRecord & ServerSync.SyncdRecord.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdRecord;
        static toObject(m: ServerSync.SyncdRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdRecord {
        interface $Properties {
            index?: (ServerSync.SyncdIndex.$Properties|null);
            value?: (ServerSync.SyncdValue.$Properties|null);
            keyId?: (ServerSync.KeyId.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdRecord.$Properties;
    }

    interface IKeyId extends ServerSync.KeyId.$Properties {
    }

    class KeyId {
        constructor(p?: ServerSync.KeyId.$Properties);
        $unknowns?: Uint8Array[];
        id?: (Uint8Array|null);
        static create(properties: ServerSync.KeyId.$Shape): ServerSync.KeyId & ServerSync.KeyId.$Shape;
        static create(properties?: ServerSync.KeyId.$Properties): ServerSync.KeyId;
        static encode(m: ServerSync.KeyId.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.KeyId & ServerSync.KeyId.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.KeyId;
        static toObject(m: ServerSync.KeyId, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace KeyId {
        interface $Properties {
            id?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.KeyId.$Properties;
    }

    interface ISyncdValue extends ServerSync.SyncdValue.$Properties {
    }

    class SyncdValue {
        constructor(p?: ServerSync.SyncdValue.$Properties);
        $unknowns?: Uint8Array[];
        blob?: (Uint8Array|null);
        static create(properties: ServerSync.SyncdValue.$Shape): ServerSync.SyncdValue & ServerSync.SyncdValue.$Shape;
        static create(properties?: ServerSync.SyncdValue.$Properties): ServerSync.SyncdValue;
        static encode(m: ServerSync.SyncdValue.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdValue & ServerSync.SyncdValue.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdValue;
        static toObject(m: ServerSync.SyncdValue, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdValue {
        interface $Properties {
            blob?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdValue.$Properties;
    }

    interface ISyncdIndex extends ServerSync.SyncdIndex.$Properties {
    }

    class SyncdIndex {
        constructor(p?: ServerSync.SyncdIndex.$Properties);
        $unknowns?: Uint8Array[];
        blob?: (Uint8Array|null);
        static create(properties: ServerSync.SyncdIndex.$Shape): ServerSync.SyncdIndex & ServerSync.SyncdIndex.$Shape;
        static create(properties?: ServerSync.SyncdIndex.$Properties): ServerSync.SyncdIndex;
        static encode(m: ServerSync.SyncdIndex.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdIndex & ServerSync.SyncdIndex.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdIndex;
        static toObject(m: ServerSync.SyncdIndex, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdIndex {
        interface $Properties {
            blob?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdIndex.$Properties;
    }

    interface IExitCode extends ServerSync.ExitCode.$Properties {
    }

    class ExitCode {
        constructor(p?: ServerSync.ExitCode.$Properties);
        $unknowns?: Uint8Array[];
        code?: (number|Long|null);
        text?: (string|null);
        static create(properties: ServerSync.ExitCode.$Shape): ServerSync.ExitCode & ServerSync.ExitCode.$Shape;
        static create(properties?: ServerSync.ExitCode.$Properties): ServerSync.ExitCode;
        static encode(m: ServerSync.ExitCode.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.ExitCode & ServerSync.ExitCode.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.ExitCode;
        static toObject(m: ServerSync.ExitCode, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ExitCode {
        interface $Properties {
            code?: (number|Long|null);
            text?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.ExitCode.$Properties;
    }

    interface ISyncdVersion extends ServerSync.SyncdVersion.$Properties {
    }

    class SyncdVersion {
        constructor(p?: ServerSync.SyncdVersion.$Properties);
        $unknowns?: Uint8Array[];
        version?: (number|Long|null);
        static create(properties: ServerSync.SyncdVersion.$Shape): ServerSync.SyncdVersion & ServerSync.SyncdVersion.$Shape;
        static create(properties?: ServerSync.SyncdVersion.$Properties): ServerSync.SyncdVersion;
        static encode(m: ServerSync.SyncdVersion.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ServerSync.SyncdVersion & ServerSync.SyncdVersion.$Shape;
        static fromObject(d: { [k: string]: any }): ServerSync.SyncdVersion;
        static toObject(m: ServerSync.SyncdVersion, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncdVersion {
        interface $Properties {
            version?: (number|Long|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = ServerSync.SyncdVersion.$Properties;
    }
}

export namespace CompanionReg {

    interface IClientPairingProps extends CompanionReg.ClientPairingProps.$Properties {
    }

    class ClientPairingProps {
        constructor(p?: CompanionReg.ClientPairingProps.$Properties);
        $unknowns?: Uint8Array[];
        isChatDbLidMigrated?: (boolean|null);
        isSyncdPureLidSession?: (boolean|null);
        isSyncdSnapshotRecoveryEnabled?: (boolean|null);
        isHsThumbnailSyncEnabled?: (boolean|null);
        subscriptionSyncPayload?: (Uint8Array|null);
        isBotJidDbMigrated?: (boolean|null);
        static create(properties: CompanionReg.ClientPairingProps.$Shape): CompanionReg.ClientPairingProps & CompanionReg.ClientPairingProps.$Shape;
        static create(properties?: CompanionReg.ClientPairingProps.$Properties): CompanionReg.ClientPairingProps;
        static encode(m: CompanionReg.ClientPairingProps.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.ClientPairingProps & CompanionReg.ClientPairingProps.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.ClientPairingProps;
        static toObject(m: CompanionReg.ClientPairingProps, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ClientPairingProps {
        interface $Properties {
            isChatDbLidMigrated?: (boolean|null);
            isSyncdPureLidSession?: (boolean|null);
            isSyncdSnapshotRecoveryEnabled?: (boolean|null);
            isHsThumbnailSyncEnabled?: (boolean|null);
            subscriptionSyncPayload?: (Uint8Array|null);
            isBotJidDbMigrated?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.ClientPairingProps.$Properties;
    }

    interface IEncryptedPairingRequest extends CompanionReg.EncryptedPairingRequest.$Properties {
    }

    class EncryptedPairingRequest {
        constructor(p?: CompanionReg.EncryptedPairingRequest.$Properties);
        $unknowns?: Uint8Array[];
        encryptedPayload?: (Uint8Array|null);
        iv?: (Uint8Array|null);
        static create(properties: CompanionReg.EncryptedPairingRequest.$Shape): CompanionReg.EncryptedPairingRequest & CompanionReg.EncryptedPairingRequest.$Shape;
        static create(properties?: CompanionReg.EncryptedPairingRequest.$Properties): CompanionReg.EncryptedPairingRequest;
        static encode(m: CompanionReg.EncryptedPairingRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.EncryptedPairingRequest & CompanionReg.EncryptedPairingRequest.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.EncryptedPairingRequest;
        static toObject(m: CompanionReg.EncryptedPairingRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace EncryptedPairingRequest {
        interface $Properties {
            encryptedPayload?: (Uint8Array|null);
            iv?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.EncryptedPairingRequest.$Properties;
    }

    interface IPairingRequest extends CompanionReg.PairingRequest.$Properties {
    }

    class PairingRequest {
        constructor(p?: CompanionReg.PairingRequest.$Properties);
        $unknowns?: Uint8Array[];
        companionPublicKey?: (Uint8Array|null);
        companionIdentityKey?: (Uint8Array|null);
        advSecret?: (Uint8Array|null);
        static create(properties: CompanionReg.PairingRequest.$Shape): CompanionReg.PairingRequest & CompanionReg.PairingRequest.$Shape;
        static create(properties?: CompanionReg.PairingRequest.$Properties): CompanionReg.PairingRequest;
        static encode(m: CompanionReg.PairingRequest.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.PairingRequest & CompanionReg.PairingRequest.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.PairingRequest;
        static toObject(m: CompanionReg.PairingRequest, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingRequest {
        interface $Properties {
            companionPublicKey?: (Uint8Array|null);
            companionIdentityKey?: (Uint8Array|null);
            advSecret?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.PairingRequest.$Properties;
    }

    interface IPrimaryEphemeralIdentity extends CompanionReg.PrimaryEphemeralIdentity.$Properties {
    }

    class PrimaryEphemeralIdentity {
        constructor(p?: CompanionReg.PrimaryEphemeralIdentity.$Properties);
        $unknowns?: Uint8Array[];
        publicKey?: (Uint8Array|null);
        nonce?: (Uint8Array|null);
        static create(properties: CompanionReg.PrimaryEphemeralIdentity.$Shape): CompanionReg.PrimaryEphemeralIdentity & CompanionReg.PrimaryEphemeralIdentity.$Shape;
        static create(properties?: CompanionReg.PrimaryEphemeralIdentity.$Properties): CompanionReg.PrimaryEphemeralIdentity;
        static encode(m: CompanionReg.PrimaryEphemeralIdentity.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.PrimaryEphemeralIdentity & CompanionReg.PrimaryEphemeralIdentity.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.PrimaryEphemeralIdentity;
        static toObject(m: CompanionReg.PrimaryEphemeralIdentity, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace PrimaryEphemeralIdentity {
        interface $Properties {
            publicKey?: (Uint8Array|null);
            nonce?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.PrimaryEphemeralIdentity.$Properties;
    }

    interface IProloguePayload extends CompanionReg.ProloguePayload.$Properties {
    }

    class ProloguePayload {
        constructor(p?: CompanionReg.ProloguePayload.$Properties);
        $unknowns?: Uint8Array[];
        companionEphemeralIdentity?: (Uint8Array|null);
        commitment?: (CompanionReg.CompanionCommitment.$Properties|null);
        static create(properties: CompanionReg.ProloguePayload.$Shape): CompanionReg.ProloguePayload & CompanionReg.ProloguePayload.$Shape;
        static create(properties?: CompanionReg.ProloguePayload.$Properties): CompanionReg.ProloguePayload;
        static encode(m: CompanionReg.ProloguePayload.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.ProloguePayload & CompanionReg.ProloguePayload.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.ProloguePayload;
        static toObject(m: CompanionReg.ProloguePayload, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ProloguePayload {
        interface $Properties {
            companionEphemeralIdentity?: (Uint8Array|null);
            commitment?: (CompanionReg.CompanionCommitment.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.ProloguePayload.$Properties;
    }

    interface ICompanionCommitment extends CompanionReg.CompanionCommitment.$Properties {
    }

    class CompanionCommitment {
        constructor(p?: CompanionReg.CompanionCommitment.$Properties);
        $unknowns?: Uint8Array[];
        hash?: (Uint8Array|null);
        static create(properties: CompanionReg.CompanionCommitment.$Shape): CompanionReg.CompanionCommitment & CompanionReg.CompanionCommitment.$Shape;
        static create(properties?: CompanionReg.CompanionCommitment.$Properties): CompanionReg.CompanionCommitment;
        static encode(m: CompanionReg.CompanionCommitment.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.CompanionCommitment & CompanionReg.CompanionCommitment.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.CompanionCommitment;
        static toObject(m: CompanionReg.CompanionCommitment, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace CompanionCommitment {
        interface $Properties {
            hash?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.CompanionCommitment.$Properties;
    }

    interface ICompanionEphemeralIdentity extends CompanionReg.CompanionEphemeralIdentity.$Properties {
    }

    class CompanionEphemeralIdentity {
        constructor(p?: CompanionReg.CompanionEphemeralIdentity.$Properties);
        $unknowns?: Uint8Array[];
        publicKey?: (Uint8Array|null);
        deviceType?: (CompanionReg.DeviceProps.PlatformType|null);
        ref?: (string|null);
        static create(properties: CompanionReg.CompanionEphemeralIdentity.$Shape): CompanionReg.CompanionEphemeralIdentity & CompanionReg.CompanionEphemeralIdentity.$Shape;
        static create(properties?: CompanionReg.CompanionEphemeralIdentity.$Properties): CompanionReg.CompanionEphemeralIdentity;
        static encode(m: CompanionReg.CompanionEphemeralIdentity.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.CompanionEphemeralIdentity & CompanionReg.CompanionEphemeralIdentity.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.CompanionEphemeralIdentity;
        static toObject(m: CompanionReg.CompanionEphemeralIdentity, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace CompanionEphemeralIdentity {
        interface $Properties {
            publicKey?: (Uint8Array|null);
            deviceType?: (CompanionReg.DeviceProps.PlatformType|null);
            ref?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.CompanionEphemeralIdentity.$Properties;
    }

    interface IDeviceProps extends CompanionReg.DeviceProps.$Properties {
    }

    class DeviceProps {
        constructor(p?: CompanionReg.DeviceProps.$Properties);
        $unknowns?: Uint8Array[];
        os?: (string|null);
        version?: (CompanionReg.DeviceProps.AppVersion.$Properties|null);
        platformType?: (CompanionReg.DeviceProps.PlatformType|null);
        requireFullSync?: (boolean|null);
        historySyncConfig?: (CompanionReg.DeviceProps.HistorySyncConfig.$Properties|null);
        static create(properties: CompanionReg.DeviceProps.$Shape): CompanionReg.DeviceProps & CompanionReg.DeviceProps.$Shape;
        static create(properties?: CompanionReg.DeviceProps.$Properties): CompanionReg.DeviceProps;
        static encode(m: CompanionReg.DeviceProps.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.DeviceProps & CompanionReg.DeviceProps.$Shape;
        static fromObject(d: { [k: string]: any }): CompanionReg.DeviceProps;
        static toObject(m: CompanionReg.DeviceProps, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace DeviceProps {
        interface $Properties {
            os?: (string|null);
            version?: (CompanionReg.DeviceProps.AppVersion.$Properties|null);
            platformType?: (CompanionReg.DeviceProps.PlatformType|null);
            requireFullSync?: (boolean|null);
            historySyncConfig?: (CompanionReg.DeviceProps.HistorySyncConfig.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = CompanionReg.DeviceProps.$Properties;

        interface IAppVersion extends CompanionReg.DeviceProps.AppVersion.$Properties {
        }

        class AppVersion {
            constructor(p?: CompanionReg.DeviceProps.AppVersion.$Properties);
            $unknowns?: Uint8Array[];
            primary?: (number|null);
            secondary?: (number|null);
            tertiary?: (number|null);
            quaternary?: (number|null);
            quinary?: (number|null);
            static create(properties: CompanionReg.DeviceProps.AppVersion.$Shape): CompanionReg.DeviceProps.AppVersion & CompanionReg.DeviceProps.AppVersion.$Shape;
            static create(properties?: CompanionReg.DeviceProps.AppVersion.$Properties): CompanionReg.DeviceProps.AppVersion;
            static encode(m: CompanionReg.DeviceProps.AppVersion.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.DeviceProps.AppVersion & CompanionReg.DeviceProps.AppVersion.$Shape;
            static fromObject(d: { [k: string]: any }): CompanionReg.DeviceProps.AppVersion;
            static toObject(m: CompanionReg.DeviceProps.AppVersion, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AppVersion {
            interface $Properties {
                primary?: (number|null);
                secondary?: (number|null);
                tertiary?: (number|null);
                quaternary?: (number|null);
                quinary?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = CompanionReg.DeviceProps.AppVersion.$Properties;
        }

        interface IHistorySyncConfig extends CompanionReg.DeviceProps.HistorySyncConfig.$Properties {
        }

        class HistorySyncConfig {
            constructor(p?: CompanionReg.DeviceProps.HistorySyncConfig.$Properties);
            $unknowns?: Uint8Array[];
            fullSyncDaysLimit?: (number|null);
            fullSyncSizeMbLimit?: (number|null);
            storageQuotaMb?: (number|null);
            inlineInitialPayloadInE2EeMsg?: (boolean|null);
            recentSyncDaysLimit?: (number|null);
            supportCallLogHistory?: (boolean|null);
            supportBotUserAgentChatHistory?: (boolean|null);
            supportCagReactionsAndPolls?: (boolean|null);
            supportBizHostedMsg?: (boolean|null);
            supportRecentSyncChunkMessageCountTuning?: (boolean|null);
            supportHostedGroupMsg?: (boolean|null);
            supportFbidBotChatHistory?: (boolean|null);
            supportAddOnHistorySyncMigration?: (boolean|null);
            supportMessageAssociation?: (boolean|null);
            supportGroupHistory?: (boolean|null);
            onDemandReady?: (boolean|null);
            supportGuestChat?: (boolean|null);
            completeOnDemandReady?: (boolean|null);
            thumbnailSyncDaysLimit?: (number|null);
            initialSyncMaxMessagesPerChat?: (number|null);
            supportManusHistory?: (boolean|null);
            supportHatchHistory?: (boolean|null);
            supportedBotChannelFbids: string[];
            supportInlineContacts?: (boolean|null);
            supportNewsletter?: (boolean|null);
            static create(properties: CompanionReg.DeviceProps.HistorySyncConfig.$Shape): CompanionReg.DeviceProps.HistorySyncConfig & CompanionReg.DeviceProps.HistorySyncConfig.$Shape;
            static create(properties?: CompanionReg.DeviceProps.HistorySyncConfig.$Properties): CompanionReg.DeviceProps.HistorySyncConfig;
            static encode(m: CompanionReg.DeviceProps.HistorySyncConfig.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): CompanionReg.DeviceProps.HistorySyncConfig & CompanionReg.DeviceProps.HistorySyncConfig.$Shape;
            static fromObject(d: { [k: string]: any }): CompanionReg.DeviceProps.HistorySyncConfig;
            static toObject(m: CompanionReg.DeviceProps.HistorySyncConfig, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace HistorySyncConfig {
            interface $Properties {
                fullSyncDaysLimit?: (number|null);
                fullSyncSizeMbLimit?: (number|null);
                storageQuotaMb?: (number|null);
                inlineInitialPayloadInE2EeMsg?: (boolean|null);
                recentSyncDaysLimit?: (number|null);
                supportCallLogHistory?: (boolean|null);
                supportBotUserAgentChatHistory?: (boolean|null);
                supportCagReactionsAndPolls?: (boolean|null);
                supportBizHostedMsg?: (boolean|null);
                supportRecentSyncChunkMessageCountTuning?: (boolean|null);
                supportHostedGroupMsg?: (boolean|null);
                supportFbidBotChatHistory?: (boolean|null);
                supportAddOnHistorySyncMigration?: (boolean|null);
                supportMessageAssociation?: (boolean|null);
                supportGroupHistory?: (boolean|null);
                onDemandReady?: (boolean|null);
                supportGuestChat?: (boolean|null);
                completeOnDemandReady?: (boolean|null);
                thumbnailSyncDaysLimit?: (number|null);
                initialSyncMaxMessagesPerChat?: (number|null);
                supportManusHistory?: (boolean|null);
                supportHatchHistory?: (boolean|null);
                supportedBotChannelFbids?: (string[]|null);
                supportInlineContacts?: (boolean|null);
                supportNewsletter?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = CompanionReg.DeviceProps.HistorySyncConfig.$Properties;
        }

        enum PlatformType {
            UNKNOWN = 0,
            CHROME = 1,
            FIREFOX = 2,
            IE = 3,
            OPERA = 4,
            SAFARI = 5,
            EDGE = 6,
            DESKTOP = 7,
            IPAD = 8,
            ANDROID_TABLET = 9,
            OHANA = 10,
            ALOHA = 11,
            CATALINA = 12,
            TCL_TV = 13,
            IOS_PHONE = 14,
            IOS_CATALYST = 15,
            ANDROID_PHONE = 16,
            ANDROID_AMBIGUOUS = 17,
            WEAR_OS = 18,
            AR_WRIST = 19,
            AR_DEVICE = 20,
            UWP = 21,
            VR = 22,
            CLOUD_API = 23,
            SMARTGLASSES = 24,
            WAIL = 25,
            WASS = 26,
            BUSINESS_BACK_OFFICE = 27
        }
    }
}

export namespace MmsRetry {

    interface IServerErrorReceipt extends MmsRetry.ServerErrorReceipt.$Properties {
    }

    class ServerErrorReceipt {
        constructor(p?: MmsRetry.ServerErrorReceipt.$Properties);
        $unknowns?: Uint8Array[];
        stanzaId?: (string|null);
        static create(properties: MmsRetry.ServerErrorReceipt.$Shape): MmsRetry.ServerErrorReceipt & MmsRetry.ServerErrorReceipt.$Shape;
        static create(properties?: MmsRetry.ServerErrorReceipt.$Properties): MmsRetry.ServerErrorReceipt;
        static encode(m: MmsRetry.ServerErrorReceipt.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MmsRetry.ServerErrorReceipt & MmsRetry.ServerErrorReceipt.$Shape;
        static fromObject(d: { [k: string]: any }): MmsRetry.ServerErrorReceipt;
        static toObject(m: MmsRetry.ServerErrorReceipt, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ServerErrorReceipt {
        interface $Properties {
            stanzaId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = MmsRetry.ServerErrorReceipt.$Properties;
    }

    interface IMediaRetryNotification extends MmsRetry.MediaRetryNotification.$Properties {
    }

    class MediaRetryNotification {
        constructor(p?: MmsRetry.MediaRetryNotification.$Properties);
        $unknowns?: Uint8Array[];
        stanzaId?: (string|null);
        directPath?: (string|null);
        result?: (MmsRetry.MediaRetryNotification.ResultType|null);
        messageSecret?: (Uint8Array|null);
        static create(properties: MmsRetry.MediaRetryNotification.$Shape): MmsRetry.MediaRetryNotification & MmsRetry.MediaRetryNotification.$Shape;
        static create(properties?: MmsRetry.MediaRetryNotification.$Properties): MmsRetry.MediaRetryNotification;
        static encode(m: MmsRetry.MediaRetryNotification.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MmsRetry.MediaRetryNotification & MmsRetry.MediaRetryNotification.$Shape;
        static fromObject(d: { [k: string]: any }): MmsRetry.MediaRetryNotification;
        static toObject(m: MmsRetry.MediaRetryNotification, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace MediaRetryNotification {
        interface $Properties {
            stanzaId?: (string|null);
            directPath?: (string|null);
            result?: (MmsRetry.MediaRetryNotification.ResultType|null);
            messageSecret?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = MmsRetry.MediaRetryNotification.$Properties;

        enum ResultType {
            GENERAL_ERROR = 0,
            SUCCESS = 1,
            NOT_FOUND = 2,
            DECRYPTION_ERROR = 3
        }
    }
}
