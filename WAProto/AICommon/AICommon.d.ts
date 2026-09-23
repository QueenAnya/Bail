import * as $protobuf from "protobufjs";
import Long = require("long");

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
