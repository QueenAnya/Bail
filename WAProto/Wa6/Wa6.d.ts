import * as $protobuf from "protobufjs";
import Long = require("long");

export namespace Wa6 {

    interface IClientPayload extends Wa6.ClientPayload.$Properties {
    }

    class ClientPayload {
        constructor(p?: Wa6.ClientPayload.$Properties);
        $unknowns?: Uint8Array[];
        username?: (number|Long|null);
        passive?: (boolean|null);
        userAgent?: (Wa6.ClientPayload.UserAgent.$Properties|null);
        webInfo?: (Wa6.ClientPayload.WebInfo.$Properties|null);
        pushName?: (string|null);
        sessionId?: (number|null);
        shortConnect?: (boolean|null);
        connectType?: (Wa6.ClientPayload.ConnectType|null);
        connectReason?: (Wa6.ClientPayload.ConnectReason|null);
        shards: number[];
        dnsSource?: (Wa6.ClientPayload.DNSSource.$Properties|null);
        connectAttemptCount?: (number|null);
        device?: (number|null);
        devicePairingData?: (Wa6.ClientPayload.DevicePairingRegistrationData.$Properties|null);
        product?: (Wa6.ClientPayload.Product|null);
        fbCat?: (Uint8Array|null);
        fbUserAgent?: (Uint8Array|null);
        oc?: (boolean|null);
        lc?: (number|null);
        iosAppExtension?: (Wa6.ClientPayload.IOSAppExtension|null);
        fbAppId?: (number|Long|null);
        fbDeviceId?: (Uint8Array|null);
        pull?: (boolean|null);
        paddingBytes?: (Uint8Array|null);
        yearClass?: (number|null);
        memClass?: (number|null);
        interopData?: (Wa6.ClientPayload.InteropData.$Properties|null);
        trafficAnonymization?: (Wa6.ClientPayload.TrafficAnonymization|null);
        lidDbMigrated?: (boolean|null);
        accountType?: (Wa6.ClientPayload.AccountType|null);
        connectionSequenceInfo?: (number|null);
        paaLink?: (boolean|null);
        preacksCount?: (number|null);
        processingQueueSize?: (number|null);
        pairedPeripherals: string[];
        testIsolationId?: (Uint8Array|null);
        static create(properties: Wa6.ClientPayload.$Shape): Wa6.ClientPayload & Wa6.ClientPayload.$Shape;
        static create(properties?: Wa6.ClientPayload.$Properties): Wa6.ClientPayload;
        static encode(m: Wa6.ClientPayload.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload & Wa6.ClientPayload.$Shape;
        static fromObject(d: { [k: string]: any }): Wa6.ClientPayload;
        static toObject(m: Wa6.ClientPayload, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ClientPayload {
        interface $Properties {
            username?: (number|Long|null);
            passive?: (boolean|null);
            userAgent?: (Wa6.ClientPayload.UserAgent.$Properties|null);
            webInfo?: (Wa6.ClientPayload.WebInfo.$Properties|null);
            pushName?: (string|null);
            sessionId?: (number|null);
            shortConnect?: (boolean|null);
            connectType?: (Wa6.ClientPayload.ConnectType|null);
            connectReason?: (Wa6.ClientPayload.ConnectReason|null);
            shards?: (number[]|null);
            dnsSource?: (Wa6.ClientPayload.DNSSource.$Properties|null);
            connectAttemptCount?: (number|null);
            device?: (number|null);
            devicePairingData?: (Wa6.ClientPayload.DevicePairingRegistrationData.$Properties|null);
            product?: (Wa6.ClientPayload.Product|null);
            fbCat?: (Uint8Array|null);
            fbUserAgent?: (Uint8Array|null);
            oc?: (boolean|null);
            lc?: (number|null);
            iosAppExtension?: (Wa6.ClientPayload.IOSAppExtension|null);
            fbAppId?: (number|Long|null);
            fbDeviceId?: (Uint8Array|null);
            pull?: (boolean|null);
            paddingBytes?: (Uint8Array|null);
            yearClass?: (number|null);
            memClass?: (number|null);
            interopData?: (Wa6.ClientPayload.InteropData.$Properties|null);
            trafficAnonymization?: (Wa6.ClientPayload.TrafficAnonymization|null);
            lidDbMigrated?: (boolean|null);
            accountType?: (Wa6.ClientPayload.AccountType|null);
            connectionSequenceInfo?: (number|null);
            paaLink?: (boolean|null);
            preacksCount?: (number|null);
            processingQueueSize?: (number|null);
            pairedPeripherals?: (string[]|null);
            testIsolationId?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Wa6.ClientPayload.$Properties;

        enum AccountType {
            DEFAULT = 0,
            GUEST = 1
        }

        enum ConnectReason {
            PUSH = 0,
            USER_ACTIVATED = 1,
            SCHEDULED = 2,
            ERROR_RECONNECT = 3,
            NETWORK_SWITCH = 4,
            PING_RECONNECT = 5,
            UNKNOWN = 6
        }

        enum ConnectType {
            CELLULAR_UNKNOWN = 0,
            WIFI_UNKNOWN = 1,
            CELLULAR_EDGE = 100,
            CELLULAR_IDEN = 101,
            CELLULAR_UMTS = 102,
            CELLULAR_EVDO = 103,
            CELLULAR_GPRS = 104,
            CELLULAR_HSDPA = 105,
            CELLULAR_HSUPA = 106,
            CELLULAR_HSPA = 107,
            CELLULAR_CDMA = 108,
            CELLULAR_1XRTT = 109,
            CELLULAR_EHRPD = 110,
            CELLULAR_LTE = 111,
            CELLULAR_HSPAP = 112
        }

        interface IDNSSource extends Wa6.ClientPayload.DNSSource.$Properties {
        }

        class DNSSource {
            constructor(p?: Wa6.ClientPayload.DNSSource.$Properties);
            $unknowns?: Uint8Array[];
            dnsMethod?: (Wa6.ClientPayload.DNSSource.DNSResolutionMethod|null);
            appCached?: (boolean|null);
            static create(properties: Wa6.ClientPayload.DNSSource.$Shape): Wa6.ClientPayload.DNSSource & Wa6.ClientPayload.DNSSource.$Shape;
            static create(properties?: Wa6.ClientPayload.DNSSource.$Properties): Wa6.ClientPayload.DNSSource;
            static encode(m: Wa6.ClientPayload.DNSSource.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload.DNSSource & Wa6.ClientPayload.DNSSource.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.ClientPayload.DNSSource;
            static toObject(m: Wa6.ClientPayload.DNSSource, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DNSSource {
            interface $Properties {
                dnsMethod?: (Wa6.ClientPayload.DNSSource.DNSResolutionMethod|null);
                appCached?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.ClientPayload.DNSSource.$Properties;

            enum DNSResolutionMethod {
                SYSTEM = 0,
                GOOGLE = 1,
                HARDCODED = 2,
                OVERRIDE = 3,
                FALLBACK = 4,
                MNS = 5,
                MNS_SECONDARY = 6,
                SOCKS_PROXY = 7
            }
        }

        interface IDevicePairingRegistrationData extends Wa6.ClientPayload.DevicePairingRegistrationData.$Properties {
        }

        class DevicePairingRegistrationData {
            constructor(p?: Wa6.ClientPayload.DevicePairingRegistrationData.$Properties);
            $unknowns?: Uint8Array[];
            eRegid?: (Uint8Array|null);
            eKeytype?: (Uint8Array|null);
            eIdent?: (Uint8Array|null);
            eSkeyId?: (Uint8Array|null);
            eSkeyVal?: (Uint8Array|null);
            eSkeySig?: (Uint8Array|null);
            buildHash?: (Uint8Array|null);
            deviceProps?: (Uint8Array|null);
            static create(properties: Wa6.ClientPayload.DevicePairingRegistrationData.$Shape): Wa6.ClientPayload.DevicePairingRegistrationData & Wa6.ClientPayload.DevicePairingRegistrationData.$Shape;
            static create(properties?: Wa6.ClientPayload.DevicePairingRegistrationData.$Properties): Wa6.ClientPayload.DevicePairingRegistrationData;
            static encode(m: Wa6.ClientPayload.DevicePairingRegistrationData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload.DevicePairingRegistrationData & Wa6.ClientPayload.DevicePairingRegistrationData.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.ClientPayload.DevicePairingRegistrationData;
            static toObject(m: Wa6.ClientPayload.DevicePairingRegistrationData, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DevicePairingRegistrationData {
            interface $Properties {
                eRegid?: (Uint8Array|null);
                eKeytype?: (Uint8Array|null);
                eIdent?: (Uint8Array|null);
                eSkeyId?: (Uint8Array|null);
                eSkeyVal?: (Uint8Array|null);
                eSkeySig?: (Uint8Array|null);
                buildHash?: (Uint8Array|null);
                deviceProps?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.ClientPayload.DevicePairingRegistrationData.$Properties;
        }

        enum IOSAppExtension {
            SHARE_EXTENSION = 0,
            SERVICE_EXTENSION = 1,
            INTENTS_EXTENSION = 2
        }

        interface IInteropData extends Wa6.ClientPayload.InteropData.$Properties {
        }

        class InteropData {
            constructor(p?: Wa6.ClientPayload.InteropData.$Properties);
            $unknowns?: Uint8Array[];
            accountId?: (number|Long|null);
            token?: (Uint8Array|null);
            enableReadReceipts?: (boolean|null);
            static create(properties: Wa6.ClientPayload.InteropData.$Shape): Wa6.ClientPayload.InteropData & Wa6.ClientPayload.InteropData.$Shape;
            static create(properties?: Wa6.ClientPayload.InteropData.$Properties): Wa6.ClientPayload.InteropData;
            static encode(m: Wa6.ClientPayload.InteropData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload.InteropData & Wa6.ClientPayload.InteropData.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.ClientPayload.InteropData;
            static toObject(m: Wa6.ClientPayload.InteropData, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InteropData {
            interface $Properties {
                accountId?: (number|Long|null);
                token?: (Uint8Array|null);
                enableReadReceipts?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.ClientPayload.InteropData.$Properties;
        }

        enum Product {
            WHATSAPP = 0,
            MESSENGER = 1,
            INTEROP = 2,
            INTEROP_MSGR = 3,
            WHATSAPP_LID = 4
        }

        enum TrafficAnonymization {
            OFF = 0,
            STANDARD = 1
        }

        interface IUserAgent extends Wa6.ClientPayload.UserAgent.$Properties {
        }

        class UserAgent {
            constructor(p?: Wa6.ClientPayload.UserAgent.$Properties);
            $unknowns?: Uint8Array[];
            platform?: (Wa6.ClientPayload.UserAgent.Platform|null);
            appVersion?: (Wa6.ClientPayload.UserAgent.AppVersion.$Properties|null);
            mcc?: (string|null);
            mnc?: (string|null);
            osVersion?: (string|null);
            manufacturer?: (string|null);
            device?: (string|null);
            osBuildNumber?: (string|null);
            phoneId?: (string|null);
            releaseChannel?: (Wa6.ClientPayload.UserAgent.ReleaseChannel|null);
            localeLanguageIso6391?: (string|null);
            localeCountryIso31661Alpha2?: (string|null);
            deviceBoard?: (string|null);
            deviceExpId?: (string|null);
            deviceType?: (Wa6.ClientPayload.UserAgent.DeviceType|null);
            deviceModelType?: (string|null);
            distributionChannel?: (Wa6.ClientPayload.UserAgent.DistributionChannel|null);
            static create(properties: Wa6.ClientPayload.UserAgent.$Shape): Wa6.ClientPayload.UserAgent & Wa6.ClientPayload.UserAgent.$Shape;
            static create(properties?: Wa6.ClientPayload.UserAgent.$Properties): Wa6.ClientPayload.UserAgent;
            static encode(m: Wa6.ClientPayload.UserAgent.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload.UserAgent & Wa6.ClientPayload.UserAgent.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.ClientPayload.UserAgent;
            static toObject(m: Wa6.ClientPayload.UserAgent, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UserAgent {
            interface $Properties {
                platform?: (Wa6.ClientPayload.UserAgent.Platform|null);
                appVersion?: (Wa6.ClientPayload.UserAgent.AppVersion.$Properties|null);
                mcc?: (string|null);
                mnc?: (string|null);
                osVersion?: (string|null);
                manufacturer?: (string|null);
                device?: (string|null);
                osBuildNumber?: (string|null);
                phoneId?: (string|null);
                releaseChannel?: (Wa6.ClientPayload.UserAgent.ReleaseChannel|null);
                localeLanguageIso6391?: (string|null);
                localeCountryIso31661Alpha2?: (string|null);
                deviceBoard?: (string|null);
                deviceExpId?: (string|null);
                deviceType?: (Wa6.ClientPayload.UserAgent.DeviceType|null);
                deviceModelType?: (string|null);
                distributionChannel?: (Wa6.ClientPayload.UserAgent.DistributionChannel|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.ClientPayload.UserAgent.$Properties;

            interface IAppVersion extends Wa6.ClientPayload.UserAgent.AppVersion.$Properties {
            }

            class AppVersion {
                constructor(p?: Wa6.ClientPayload.UserAgent.AppVersion.$Properties);
                $unknowns?: Uint8Array[];
                primary?: (number|null);
                secondary?: (number|null);
                tertiary?: (number|null);
                quaternary?: (number|null);
                quinary?: (number|null);
                static create(properties: Wa6.ClientPayload.UserAgent.AppVersion.$Shape): Wa6.ClientPayload.UserAgent.AppVersion & Wa6.ClientPayload.UserAgent.AppVersion.$Shape;
                static create(properties?: Wa6.ClientPayload.UserAgent.AppVersion.$Properties): Wa6.ClientPayload.UserAgent.AppVersion;
                static encode(m: Wa6.ClientPayload.UserAgent.AppVersion.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload.UserAgent.AppVersion & Wa6.ClientPayload.UserAgent.AppVersion.$Shape;
                static fromObject(d: { [k: string]: any }): Wa6.ClientPayload.UserAgent.AppVersion;
                static toObject(m: Wa6.ClientPayload.UserAgent.AppVersion, o?: $protobuf.IConversionOptions): { [k: string]: any };
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
                type $Shape = Wa6.ClientPayload.UserAgent.AppVersion.$Properties;
            }

            enum DeviceType {
                PHONE = 0,
                TABLET = 1,
                DESKTOP = 2,
                WEARABLE = 3,
                VR = 4
            }

            enum DistributionChannel {
                APPSTORE = 0,
                WEBSITE = 1,
                TESTFLIGHT = 2,
                INTERNAL = 3
            }

            enum Platform {
                ANDROID = 0,
                IOS = 1,
                WINDOWS_PHONE = 2,
                BLACKBERRY = 3,
                BLACKBERRYX = 4,
                S40 = 5,
                S60 = 6,
                PYTHON_CLIENT = 7,
                TIZEN = 8,
                ENTERPRISE = 9,
                SMB_ANDROID = 10,
                KAIOS = 11,
                SMB_IOS = 12,
                WINDOWS = 13,
                WEB = 14,
                PORTAL = 15,
                GREEN_ANDROID = 16,
                GREEN_IPHONE = 17,
                BLUE_ANDROID = 18,
                BLUE_IPHONE = 19,
                FBLITE_ANDROID = 20,
                MLITE_ANDROID = 21,
                IGLITE_ANDROID = 22,
                PAGE = 23,
                MACOS = 24,
                OCULUS_MSG = 25,
                OCULUS_CALL = 26,
                MILAN = 27,
                CAPI = 28,
                WEAROS = 29,
                ARDEVICE = 30,
                VRDEVICE = 31,
                BLUE_WEB = 32,
                IPAD = 33,
                TEST = 34,
                SMART_GLASSES = 35,
                BLUE_VR = 36,
                AR_WRIST = 37,
                WAIL = 38,
                WORK_ANDROID = 39,
                WORK_IOS = 40
            }

            enum ReleaseChannel {
                RELEASE = 0,
                BETA = 1,
                ALPHA = 2,
                DEBUG = 3
            }
        }

        interface IWebInfo extends Wa6.ClientPayload.WebInfo.$Properties {
        }

        class WebInfo {
            constructor(p?: Wa6.ClientPayload.WebInfo.$Properties);
            $unknowns?: Uint8Array[];
            refToken?: (string|null);
            version?: (string|null);
            webdPayload?: (Wa6.ClientPayload.WebInfo.WebdPayload.$Properties|null);
            webSubPlatform?: (Wa6.ClientPayload.WebInfo.WebSubPlatform|null);
            browser?: (string|null);
            browserVersion?: (string|null);
            static create(properties: Wa6.ClientPayload.WebInfo.$Shape): Wa6.ClientPayload.WebInfo & Wa6.ClientPayload.WebInfo.$Shape;
            static create(properties?: Wa6.ClientPayload.WebInfo.$Properties): Wa6.ClientPayload.WebInfo;
            static encode(m: Wa6.ClientPayload.WebInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload.WebInfo & Wa6.ClientPayload.WebInfo.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.ClientPayload.WebInfo;
            static toObject(m: Wa6.ClientPayload.WebInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace WebInfo {
            interface $Properties {
                refToken?: (string|null);
                version?: (string|null);
                webdPayload?: (Wa6.ClientPayload.WebInfo.WebdPayload.$Properties|null);
                webSubPlatform?: (Wa6.ClientPayload.WebInfo.WebSubPlatform|null);
                browser?: (string|null);
                browserVersion?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.ClientPayload.WebInfo.$Properties;

            enum WebSubPlatform {
                WEB_BROWSER = 0,
                APP_STORE = 1,
                WIN_STORE = 2,
                DARWIN = 3,
                WIN32 = 4,
                WIN_HYBRID = 5
            }

            interface IWebdPayload extends Wa6.ClientPayload.WebInfo.WebdPayload.$Properties {
            }

            class WebdPayload {
                constructor(p?: Wa6.ClientPayload.WebInfo.WebdPayload.$Properties);
                $unknowns?: Uint8Array[];
                usesParticipantInKey?: (boolean|null);
                supportsStarredMessages?: (boolean|null);
                supportsDocumentMessages?: (boolean|null);
                supportsUrlMessages?: (boolean|null);
                supportsMediaRetry?: (boolean|null);
                supportsE2EImage?: (boolean|null);
                supportsE2EVideo?: (boolean|null);
                supportsE2EAudio?: (boolean|null);
                supportsE2EDocument?: (boolean|null);
                documentTypes?: (string|null);
                features?: (Uint8Array|null);
                static create(properties: Wa6.ClientPayload.WebInfo.WebdPayload.$Shape): Wa6.ClientPayload.WebInfo.WebdPayload & Wa6.ClientPayload.WebInfo.WebdPayload.$Shape;
                static create(properties?: Wa6.ClientPayload.WebInfo.WebdPayload.$Properties): Wa6.ClientPayload.WebInfo.WebdPayload;
                static encode(m: Wa6.ClientPayload.WebInfo.WebdPayload.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.ClientPayload.WebInfo.WebdPayload & Wa6.ClientPayload.WebInfo.WebdPayload.$Shape;
                static fromObject(d: { [k: string]: any }): Wa6.ClientPayload.WebInfo.WebdPayload;
                static toObject(m: Wa6.ClientPayload.WebInfo.WebdPayload, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace WebdPayload {
                interface $Properties {
                    usesParticipantInKey?: (boolean|null);
                    supportsStarredMessages?: (boolean|null);
                    supportsDocumentMessages?: (boolean|null);
                    supportsUrlMessages?: (boolean|null);
                    supportsMediaRetry?: (boolean|null);
                    supportsE2EImage?: (boolean|null);
                    supportsE2EVideo?: (boolean|null);
                    supportsE2EAudio?: (boolean|null);
                    supportsE2EDocument?: (boolean|null);
                    documentTypes?: (string|null);
                    features?: (Uint8Array|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = Wa6.ClientPayload.WebInfo.WebdPayload.$Properties;
            }
        }
    }

    interface IHandshakeMessage extends Wa6.HandshakeMessage.$Properties {
    }

    class HandshakeMessage {
        constructor(p?: Wa6.HandshakeMessage.$Properties);
        $unknowns?: Uint8Array[];
        clientHello?: (Wa6.HandshakeMessage.ClientHello.$Properties|null);
        serverHello?: (Wa6.HandshakeMessage.ServerHello.$Properties|null);
        clientFinish?: (Wa6.HandshakeMessage.ClientFinish.$Properties|null);
        static create(properties: Wa6.HandshakeMessage.$Shape): Wa6.HandshakeMessage & Wa6.HandshakeMessage.$Shape;
        static create(properties?: Wa6.HandshakeMessage.$Properties): Wa6.HandshakeMessage;
        static encode(m: Wa6.HandshakeMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.HandshakeMessage & Wa6.HandshakeMessage.$Shape;
        static fromObject(d: { [k: string]: any }): Wa6.HandshakeMessage;
        static toObject(m: Wa6.HandshakeMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace HandshakeMessage {
        interface $Properties {
            clientHello?: (Wa6.HandshakeMessage.ClientHello.$Properties|null);
            serverHello?: (Wa6.HandshakeMessage.ServerHello.$Properties|null);
            clientFinish?: (Wa6.HandshakeMessage.ClientFinish.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = Wa6.HandshakeMessage.$Properties;

        interface IClientFinish extends Wa6.HandshakeMessage.ClientFinish.$Properties {
        }

        class ClientFinish {
            constructor(p?: Wa6.HandshakeMessage.ClientFinish.$Properties);
            $unknowns?: Uint8Array[];
            static?: (Uint8Array|null);
            payload?: (Uint8Array|null);
            extendedCiphertext?: (Uint8Array|null);
            paddedBytes?: (Uint8Array|null);
            simulateXxkemFs?: (boolean|null);
            static create(properties: Wa6.HandshakeMessage.ClientFinish.$Shape): Wa6.HandshakeMessage.ClientFinish & Wa6.HandshakeMessage.ClientFinish.$Shape;
            static create(properties?: Wa6.HandshakeMessage.ClientFinish.$Properties): Wa6.HandshakeMessage.ClientFinish;
            static encode(m: Wa6.HandshakeMessage.ClientFinish.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.HandshakeMessage.ClientFinish & Wa6.HandshakeMessage.ClientFinish.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.HandshakeMessage.ClientFinish;
            static toObject(m: Wa6.HandshakeMessage.ClientFinish, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ClientFinish {
            interface $Properties {
                "static"?: (Uint8Array|null);
                payload?: (Uint8Array|null);
                extendedCiphertext?: (Uint8Array|null);
                paddedBytes?: (Uint8Array|null);
                simulateXxkemFs?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.HandshakeMessage.ClientFinish.$Properties;
        }

        interface IClientHello extends Wa6.HandshakeMessage.ClientHello.$Properties {
        }

        class ClientHello {
            constructor(p?: Wa6.HandshakeMessage.ClientHello.$Properties);
            $unknowns?: Uint8Array[];
            ephemeral?: (Uint8Array|null);
            static?: (Uint8Array|null);
            payload?: (Uint8Array|null);
            useExtended?: (boolean|null);
            extendedCiphertext?: (Uint8Array|null);
            paddedBytes?: (Uint8Array|null);
            sendServerHelloPaddedBytes?: (boolean|null);
            simulateXxkemFs?: (boolean|null);
            pqMode?: (Wa6.HandshakeMessage.HandshakePqMode|null);
            extendedEphemeral?: (Uint8Array|null);
            static create(properties: Wa6.HandshakeMessage.ClientHello.$Shape): Wa6.HandshakeMessage.ClientHello & Wa6.HandshakeMessage.ClientHello.$Shape;
            static create(properties?: Wa6.HandshakeMessage.ClientHello.$Properties): Wa6.HandshakeMessage.ClientHello;
            static encode(m: Wa6.HandshakeMessage.ClientHello.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.HandshakeMessage.ClientHello & Wa6.HandshakeMessage.ClientHello.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.HandshakeMessage.ClientHello;
            static toObject(m: Wa6.HandshakeMessage.ClientHello, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ClientHello {
            interface $Properties {
                ephemeral?: (Uint8Array|null);
                "static"?: (Uint8Array|null);
                payload?: (Uint8Array|null);
                useExtended?: (boolean|null);
                extendedCiphertext?: (Uint8Array|null);
                paddedBytes?: (Uint8Array|null);
                sendServerHelloPaddedBytes?: (boolean|null);
                simulateXxkemFs?: (boolean|null);
                pqMode?: (Wa6.HandshakeMessage.HandshakePqMode|null);
                extendedEphemeral?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.HandshakeMessage.ClientHello.$Properties;
        }

        enum HandshakePqMode {
            HANDSHAKE_PQ_MODE_UNKNOWN = 0,
            XXKEM = 1,
            XXKEM_FS = 2,
            XXKEM_EPH = 9,
            WA_CLASSICAL = 3,
            WA_PQ = 4,
            IKKEM = 5,
            IKKEM_FS = 6,
            XXKEM_2 = 7,
            IKKEM_2 = 8
        }

        interface IServerHello extends Wa6.HandshakeMessage.ServerHello.$Properties {
        }

        class ServerHello {
            constructor(p?: Wa6.HandshakeMessage.ServerHello.$Properties);
            $unknowns?: Uint8Array[];
            ephemeral?: (Uint8Array|null);
            static?: (Uint8Array|null);
            payload?: (Uint8Array|null);
            extendedStatic?: (Uint8Array|null);
            paddingBytes?: (Uint8Array|null);
            extendedCiphertext?: (Uint8Array|null);
            static create(properties: Wa6.HandshakeMessage.ServerHello.$Shape): Wa6.HandshakeMessage.ServerHello & Wa6.HandshakeMessage.ServerHello.$Shape;
            static create(properties?: Wa6.HandshakeMessage.ServerHello.$Properties): Wa6.HandshakeMessage.ServerHello;
            static encode(m: Wa6.HandshakeMessage.ServerHello.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): Wa6.HandshakeMessage.ServerHello & Wa6.HandshakeMessage.ServerHello.$Shape;
            static fromObject(d: { [k: string]: any }): Wa6.HandshakeMessage.ServerHello;
            static toObject(m: Wa6.HandshakeMessage.ServerHello, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ServerHello {
            interface $Properties {
                ephemeral?: (Uint8Array|null);
                "static"?: (Uint8Array|null);
                payload?: (Uint8Array|null);
                extendedStatic?: (Uint8Array|null);
                paddingBytes?: (Uint8Array|null);
                extendedCiphertext?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = Wa6.HandshakeMessage.ServerHello.$Properties;
        }
    }
}
