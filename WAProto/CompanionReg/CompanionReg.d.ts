import * as $protobuf from "protobufjs";
import Long = require("long");

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
