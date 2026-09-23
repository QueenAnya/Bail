import * as $protobuf from "protobufjs";
import Long = require("long");

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
