import * as $protobuf from "protobufjs";
import Long = require("long");

export namespace BotMetadata {

    interface IBotMetadata extends BotMetadata.BotMetadata.$Properties {
    }

    class BotMetadata {
        constructor(p?: BotMetadata.BotMetadata.$Properties);
        $unknowns?: Uint8Array[];
        avatarMetadata?: (BotMetadata.BotAvatarMetadata.$Properties|null);
        personaId?: (string|null);
        pluginMetadata?: (BotMetadata.BotPluginMetadata.$Properties|null);
        suggestedPromptMetadata?: (BotMetadata.BotSuggestedPromptMetadata.$Properties|null);
        invokerJid?: (string|null);
        sessionMetadata?: (BotMetadata.BotSessionMetadata.$Properties|null);
        memuMetadata?: (BotMetadata.BotMemuMetadata.$Properties|null);
        timezone?: (string|null);
        reminderMetadata?: (BotMetadata.BotReminderMetadata.$Properties|null);
        modelMetadata?: (BotMetadata.BotModelMetadata.$Properties|null);
        messageDisclaimerText?: (string|null);
        progressIndicatorMetadata?: (BotMetadata.BotProgressIndicatorMetadata.$Properties|null);
        capabilityMetadata?: (BotMetadata.BotCapabilityMetadata.$Properties|null);
        imagineMetadata?: (BotMetadata.BotImagineMetadata.$Properties|null);
        memoryMetadata?: (BotMetadata.BotMemoryMetadata.$Properties|null);
        renderingMetadata?: (BotMetadata.BotRenderingMetadata.$Properties|null);
        botMetricsMetadata?: (BotMetadata.BotMetricsMetadata.$Properties|null);
        botLinkedAccountsMetadata?: (BotMetadata.BotLinkedAccountsMetadata.$Properties|null);
        richResponseSourcesMetadata?: (BotMetadata.BotSourcesMetadata.$Properties|null);
        aiConversationContext?: (Uint8Array|null);
        botPromotionMessageMetadata?: (BotMetadata.BotPromotionMessageMetadata.$Properties|null);
        botModeSelectionMetadata?: (BotMetadata.BotModeSelectionMetadata.$Properties|null);
        botQuotaMetadata?: (BotMetadata.BotQuotaMetadata.$Properties|null);
        botAgeCollectionMetadata?: (BotMetadata.BotAgeCollectionMetadata.$Properties|null);
        conversationStarterPromptId?: (string|null);
        botResponseId?: (string|null);
        verificationMetadata?: (BotMetadata.BotSignatureVerificationMetadata.$Properties|null);
        unifiedResponseMutation?: (BotMetadata.BotUnifiedResponseMutation.$Properties|null);
        botMessageOriginMetadata?: (BotMetadata.BotMessageOriginMetadata.$Properties|null);
        inThreadSurveyMetadata?: (BotMetadata.InThreadSurveyMetadata.$Properties|null);
        botThreadInfo?: (BotMetadata.AIThreadInfo.$Properties|null);
        static create(properties: BotMetadata.BotMetadata.$Shape): BotMetadata.BotMetadata & BotMetadata.BotMetadata.$Shape;
        static create(properties?: BotMetadata.BotMetadata.$Properties): BotMetadata.BotMetadata;
        static encode(m: BotMetadata.BotMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMetadata & BotMetadata.BotMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMetadata;
        static toObject(m: BotMetadata.BotMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMetadata {
        interface $Properties {
            avatarMetadata?: (BotMetadata.BotAvatarMetadata.$Properties|null);
            personaId?: (string|null);
            pluginMetadata?: (BotMetadata.BotPluginMetadata.$Properties|null);
            suggestedPromptMetadata?: (BotMetadata.BotSuggestedPromptMetadata.$Properties|null);
            invokerJid?: (string|null);
            sessionMetadata?: (BotMetadata.BotSessionMetadata.$Properties|null);
            memuMetadata?: (BotMetadata.BotMemuMetadata.$Properties|null);
            timezone?: (string|null);
            reminderMetadata?: (BotMetadata.BotReminderMetadata.$Properties|null);
            modelMetadata?: (BotMetadata.BotModelMetadata.$Properties|null);
            messageDisclaimerText?: (string|null);
            progressIndicatorMetadata?: (BotMetadata.BotProgressIndicatorMetadata.$Properties|null);
            capabilityMetadata?: (BotMetadata.BotCapabilityMetadata.$Properties|null);
            imagineMetadata?: (BotMetadata.BotImagineMetadata.$Properties|null);
            memoryMetadata?: (BotMetadata.BotMemoryMetadata.$Properties|null);
            renderingMetadata?: (BotMetadata.BotRenderingMetadata.$Properties|null);
            botMetricsMetadata?: (BotMetadata.BotMetricsMetadata.$Properties|null);
            botLinkedAccountsMetadata?: (BotMetadata.BotLinkedAccountsMetadata.$Properties|null);
            richResponseSourcesMetadata?: (BotMetadata.BotSourcesMetadata.$Properties|null);
            aiConversationContext?: (Uint8Array|null);
            botPromotionMessageMetadata?: (BotMetadata.BotPromotionMessageMetadata.$Properties|null);
            botModeSelectionMetadata?: (BotMetadata.BotModeSelectionMetadata.$Properties|null);
            botQuotaMetadata?: (BotMetadata.BotQuotaMetadata.$Properties|null);
            botAgeCollectionMetadata?: (BotMetadata.BotAgeCollectionMetadata.$Properties|null);
            conversationStarterPromptId?: (string|null);
            botResponseId?: (string|null);
            verificationMetadata?: (BotMetadata.BotSignatureVerificationMetadata.$Properties|null);
            unifiedResponseMutation?: (BotMetadata.BotUnifiedResponseMutation.$Properties|null);
            botMessageOriginMetadata?: (BotMetadata.BotMessageOriginMetadata.$Properties|null);
            inThreadSurveyMetadata?: (BotMetadata.InThreadSurveyMetadata.$Properties|null);
            botThreadInfo?: (BotMetadata.AIThreadInfo.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMetadata.$Properties;
    }

    interface IAIThreadInfo extends BotMetadata.AIThreadInfo.$Properties {
    }

    class AIThreadInfo {
        constructor(p?: BotMetadata.AIThreadInfo.$Properties);
        $unknowns?: Uint8Array[];
        serverInfo?: (BotMetadata.AIThreadInfo.AIThreadServerInfo.$Properties|null);
        clientInfo?: (BotMetadata.AIThreadInfo.AIThreadClientInfo.$Properties|null);
        static create(properties: BotMetadata.AIThreadInfo.$Shape): BotMetadata.AIThreadInfo & BotMetadata.AIThreadInfo.$Shape;
        static create(properties?: BotMetadata.AIThreadInfo.$Properties): BotMetadata.AIThreadInfo;
        static encode(m: BotMetadata.AIThreadInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.AIThreadInfo & BotMetadata.AIThreadInfo.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.AIThreadInfo;
        static toObject(m: BotMetadata.AIThreadInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace AIThreadInfo {
        interface $Properties {
            serverInfo?: (BotMetadata.AIThreadInfo.AIThreadServerInfo.$Properties|null);
            clientInfo?: (BotMetadata.AIThreadInfo.AIThreadClientInfo.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.AIThreadInfo.$Properties;

        interface IAIThreadClientInfo extends BotMetadata.AIThreadInfo.AIThreadClientInfo.$Properties {
        }

        class AIThreadClientInfo {
            constructor(p?: BotMetadata.AIThreadInfo.AIThreadClientInfo.$Properties);
            $unknowns?: Uint8Array[];
            type?: (BotMetadata.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);
            static create(properties: BotMetadata.AIThreadInfo.AIThreadClientInfo.$Shape): BotMetadata.AIThreadInfo.AIThreadClientInfo & BotMetadata.AIThreadInfo.AIThreadClientInfo.$Shape;
            static create(properties?: BotMetadata.AIThreadInfo.AIThreadClientInfo.$Properties): BotMetadata.AIThreadInfo.AIThreadClientInfo;
            static encode(m: BotMetadata.AIThreadInfo.AIThreadClientInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.AIThreadInfo.AIThreadClientInfo & BotMetadata.AIThreadInfo.AIThreadClientInfo.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.AIThreadInfo.AIThreadClientInfo;
            static toObject(m: BotMetadata.AIThreadInfo.AIThreadClientInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIThreadClientInfo {
            interface $Properties {
                type?: (BotMetadata.AIThreadInfo.AIThreadClientInfo.AIThreadType|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.AIThreadInfo.AIThreadClientInfo.$Properties;

            enum AIThreadType {
                UNKNOWN = 0,
                DEFAULT = 1,
                INCOGNITO = 2
            }
        }

        interface IAIThreadServerInfo extends BotMetadata.AIThreadInfo.AIThreadServerInfo.$Properties {
        }

        class AIThreadServerInfo {
            constructor(p?: BotMetadata.AIThreadInfo.AIThreadServerInfo.$Properties);
            $unknowns?: Uint8Array[];
            title?: (string|null);
            static create(properties: BotMetadata.AIThreadInfo.AIThreadServerInfo.$Shape): BotMetadata.AIThreadInfo.AIThreadServerInfo & BotMetadata.AIThreadInfo.AIThreadServerInfo.$Shape;
            static create(properties?: BotMetadata.AIThreadInfo.AIThreadServerInfo.$Properties): BotMetadata.AIThreadInfo.AIThreadServerInfo;
            static encode(m: BotMetadata.AIThreadInfo.AIThreadServerInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.AIThreadInfo.AIThreadServerInfo & BotMetadata.AIThreadInfo.AIThreadServerInfo.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.AIThreadInfo.AIThreadServerInfo;
            static toObject(m: BotMetadata.AIThreadInfo.AIThreadServerInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AIThreadServerInfo {
            interface $Properties {
                title?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.AIThreadInfo.AIThreadServerInfo.$Properties;
        }
    }

    interface IBotUnifiedResponseMutation extends BotMetadata.BotUnifiedResponseMutation.$Properties {
    }

    class BotUnifiedResponseMutation {
        constructor(p?: BotMetadata.BotUnifiedResponseMutation.$Properties);
        $unknowns?: Uint8Array[];
        sbsMetadata?: (BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Properties|null);
        static create(properties: BotMetadata.BotUnifiedResponseMutation.$Shape): BotMetadata.BotUnifiedResponseMutation & BotMetadata.BotUnifiedResponseMutation.$Shape;
        static create(properties?: BotMetadata.BotUnifiedResponseMutation.$Properties): BotMetadata.BotUnifiedResponseMutation;
        static encode(m: BotMetadata.BotUnifiedResponseMutation.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotUnifiedResponseMutation & BotMetadata.BotUnifiedResponseMutation.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotUnifiedResponseMutation;
        static toObject(m: BotMetadata.BotUnifiedResponseMutation, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotUnifiedResponseMutation {
        interface $Properties {
            sbsMetadata?: (BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotUnifiedResponseMutation.$Properties;

        interface ISideBySideMetadata extends BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Properties {
        }

        class SideBySideMetadata {
            constructor(p?: BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Properties);
            $unknowns?: Uint8Array[];
            primaryResponseId?: (string|null);
            static create(properties: BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Shape): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata & BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Shape;
            static create(properties?: BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Properties): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata;
            static encode(m: BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata & BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata;
            static toObject(m: BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SideBySideMetadata {
            interface $Properties {
                primaryResponseId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.$Properties;
        }
    }

    interface IBotMessageOrigin extends BotMetadata.BotMessageOrigin.$Properties {
    }

    class BotMessageOrigin {
        constructor(p?: BotMetadata.BotMessageOrigin.$Properties);
        $unknowns?: Uint8Array[];
        type?: (BotMetadata.BotMessageOrigin.BotMessageOriginType|null);
        static create(properties: BotMetadata.BotMessageOrigin.$Shape): BotMetadata.BotMessageOrigin & BotMetadata.BotMessageOrigin.$Shape;
        static create(properties?: BotMetadata.BotMessageOrigin.$Properties): BotMetadata.BotMessageOrigin;
        static encode(m: BotMetadata.BotMessageOrigin.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMessageOrigin & BotMetadata.BotMessageOrigin.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMessageOrigin;
        static toObject(m: BotMetadata.BotMessageOrigin, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMessageOrigin {
        interface $Properties {
            type?: (BotMetadata.BotMessageOrigin.BotMessageOriginType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMessageOrigin.$Properties;

        enum BotMessageOriginType {
            BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED = 0
        }
    }

    interface IBotMessageOriginMetadata extends BotMetadata.BotMessageOriginMetadata.$Properties {
    }

    class BotMessageOriginMetadata {
        constructor(p?: BotMetadata.BotMessageOriginMetadata.$Properties);
        $unknowns?: Uint8Array[];
        origins: BotMetadata.BotMessageOrigin.$Properties[];
        static create(properties: BotMetadata.BotMessageOriginMetadata.$Shape): BotMetadata.BotMessageOriginMetadata & BotMetadata.BotMessageOriginMetadata.$Shape;
        static create(properties?: BotMetadata.BotMessageOriginMetadata.$Properties): BotMetadata.BotMessageOriginMetadata;
        static encode(m: BotMetadata.BotMessageOriginMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMessageOriginMetadata & BotMetadata.BotMessageOriginMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMessageOriginMetadata;
        static toObject(m: BotMetadata.BotMessageOriginMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMessageOriginMetadata {
        interface $Properties {
            origins?: (BotMetadata.BotMessageOrigin.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMessageOriginMetadata.$Properties;
    }

    interface IInThreadSurveyMetadata extends BotMetadata.InThreadSurveyMetadata.$Properties {
    }

    class InThreadSurveyMetadata {
        constructor(p?: BotMetadata.InThreadSurveyMetadata.$Properties);
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
        questions: BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties[];
        surveyContinueButtonText?: (string|null);
        surveySubmitButtonText?: (string|null);
        privacyStatementFull?: (string|null);
        privacyStatementParts: BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties[];
        feedbackToastText?: (string|null);
        static create(properties: BotMetadata.InThreadSurveyMetadata.$Shape): BotMetadata.InThreadSurveyMetadata & BotMetadata.InThreadSurveyMetadata.$Shape;
        static create(properties?: BotMetadata.InThreadSurveyMetadata.$Properties): BotMetadata.InThreadSurveyMetadata;
        static encode(m: BotMetadata.InThreadSurveyMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.InThreadSurveyMetadata & BotMetadata.InThreadSurveyMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata;
        static toObject(m: BotMetadata.InThreadSurveyMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
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
            questions?: (BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties[]|null);
            surveyContinueButtonText?: (string|null);
            surveySubmitButtonText?: (string|null);
            privacyStatementFull?: (string|null);
            privacyStatementParts?: (BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties[]|null);
            feedbackToastText?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.InThreadSurveyMetadata.$Properties;

        interface IInThreadSurveyOption extends BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Properties {
        }

        class InThreadSurveyOption {
            constructor(p?: BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Properties);
            $unknowns?: Uint8Array[];
            stringValue?: (string|null);
            numericValue?: (number|null);
            textTranslated?: (string|null);
            static create(properties: BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Shape): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption & BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Shape;
            static create(properties?: BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Properties): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption;
            static encode(m: BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption & BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption;
            static toObject(m: BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption, o?: $protobuf.IConversionOptions): { [k: string]: any };
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
            type $Shape = BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Properties;
        }

        interface IInThreadSurveyPrivacyStatementPart extends BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties {
        }

        class InThreadSurveyPrivacyStatementPart {
            constructor(p?: BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties);
            $unknowns?: Uint8Array[];
            text?: (string|null);
            url?: (string|null);
            static create(properties: BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Shape): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart & BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Shape;
            static create(properties?: BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;
            static encode(m: BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart & BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart;
            static toObject(m: BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InThreadSurveyPrivacyStatementPart {
            interface $Properties {
                text?: (string|null);
                url?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.$Properties;
        }

        interface IInThreadSurveyQuestion extends BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties {
        }

        class InThreadSurveyQuestion {
            constructor(p?: BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties);
            $unknowns?: Uint8Array[];
            questionText?: (string|null);
            questionId?: (string|null);
            questionOptions: BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Properties[];
            static create(properties: BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Shape): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion & BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Shape;
            static create(properties?: BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion;
            static encode(m: BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion & BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion;
            static toObject(m: BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InThreadSurveyQuestion {
            interface $Properties {
                questionText?: (string|null);
                questionId?: (string|null);
                questionOptions?: (BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.$Properties;
        }
    }

    interface IBotSourcesMetadata extends BotMetadata.BotSourcesMetadata.$Properties {
    }

    class BotSourcesMetadata {
        constructor(p?: BotMetadata.BotSourcesMetadata.$Properties);
        $unknowns?: Uint8Array[];
        sources: BotMetadata.BotSourcesMetadata.BotSourceItem.$Properties[];
        static create(properties: BotMetadata.BotSourcesMetadata.$Shape): BotMetadata.BotSourcesMetadata & BotMetadata.BotSourcesMetadata.$Shape;
        static create(properties?: BotMetadata.BotSourcesMetadata.$Properties): BotMetadata.BotSourcesMetadata;
        static encode(m: BotMetadata.BotSourcesMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotSourcesMetadata & BotMetadata.BotSourcesMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotSourcesMetadata;
        static toObject(m: BotMetadata.BotSourcesMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSourcesMetadata {
        interface $Properties {
            sources?: (BotMetadata.BotSourcesMetadata.BotSourceItem.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotSourcesMetadata.$Properties;

        interface IBotSourceItem extends BotMetadata.BotSourcesMetadata.BotSourceItem.$Properties {
        }

        class BotSourceItem {
            constructor(p?: BotMetadata.BotSourcesMetadata.BotSourceItem.$Properties);
            $unknowns?: Uint8Array[];
            provider?: (BotMetadata.BotSourcesMetadata.BotSourceItem.SourceProvider|null);
            thumbnailCdnUrl?: (string|null);
            sourceProviderUrl?: (string|null);
            sourceQuery?: (string|null);
            faviconCdnUrl?: (string|null);
            citationNumber?: (number|null);
            sourceTitle?: (string|null);
            static create(properties: BotMetadata.BotSourcesMetadata.BotSourceItem.$Shape): BotMetadata.BotSourcesMetadata.BotSourceItem & BotMetadata.BotSourcesMetadata.BotSourceItem.$Shape;
            static create(properties?: BotMetadata.BotSourcesMetadata.BotSourceItem.$Properties): BotMetadata.BotSourcesMetadata.BotSourceItem;
            static encode(m: BotMetadata.BotSourcesMetadata.BotSourceItem.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotSourcesMetadata.BotSourceItem & BotMetadata.BotSourcesMetadata.BotSourceItem.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.BotSourcesMetadata.BotSourceItem;
            static toObject(m: BotMetadata.BotSourcesMetadata.BotSourceItem, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotSourceItem {
            interface $Properties {
                provider?: (BotMetadata.BotSourcesMetadata.BotSourceItem.SourceProvider|null);
                thumbnailCdnUrl?: (string|null);
                sourceProviderUrl?: (string|null);
                sourceQuery?: (string|null);
                faviconCdnUrl?: (string|null);
                citationNumber?: (number|null);
                sourceTitle?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.BotSourcesMetadata.BotSourceItem.$Properties;

            enum SourceProvider {
                UNKNOWN = 0,
                BING = 1,
                GOOGLE = 2,
                SUPPORT = 3,
                OTHER = 4
            }
        }
    }

    interface IBotAgeCollectionMetadata extends BotMetadata.BotAgeCollectionMetadata.$Properties {
    }

    class BotAgeCollectionMetadata {
        constructor(p?: BotMetadata.BotAgeCollectionMetadata.$Properties);
        $unknowns?: Uint8Array[];
        ageCollectionEligible?: (boolean|null);
        shouldTriggerAgeCollectionOnClient?: (boolean|null);
        static create(properties: BotMetadata.BotAgeCollectionMetadata.$Shape): BotMetadata.BotAgeCollectionMetadata & BotMetadata.BotAgeCollectionMetadata.$Shape;
        static create(properties?: BotMetadata.BotAgeCollectionMetadata.$Properties): BotMetadata.BotAgeCollectionMetadata;
        static encode(m: BotMetadata.BotAgeCollectionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotAgeCollectionMetadata & BotMetadata.BotAgeCollectionMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotAgeCollectionMetadata;
        static toObject(m: BotMetadata.BotAgeCollectionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotAgeCollectionMetadata {
        interface $Properties {
            ageCollectionEligible?: (boolean|null);
            shouldTriggerAgeCollectionOnClient?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotAgeCollectionMetadata.$Properties;
    }

    interface IBotImagineMetadata extends BotMetadata.BotImagineMetadata.$Properties {
    }

    class BotImagineMetadata {
        constructor(p?: BotMetadata.BotImagineMetadata.$Properties);
        $unknowns?: Uint8Array[];
        imagineType?: (BotMetadata.BotImagineMetadata.ImagineType|null);
        static create(properties: BotMetadata.BotImagineMetadata.$Shape): BotMetadata.BotImagineMetadata & BotMetadata.BotImagineMetadata.$Shape;
        static create(properties?: BotMetadata.BotImagineMetadata.$Properties): BotMetadata.BotImagineMetadata;
        static encode(m: BotMetadata.BotImagineMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotImagineMetadata & BotMetadata.BotImagineMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotImagineMetadata;
        static toObject(m: BotMetadata.BotImagineMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotImagineMetadata {
        interface $Properties {
            imagineType?: (BotMetadata.BotImagineMetadata.ImagineType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotImagineMetadata.$Properties;

        enum ImagineType {
            UNKNOWN = 0,
            IMAGINE = 1,
            MEMU = 2,
            FLASH = 3,
            EDIT = 4
        }
    }

    interface IBotQuotaMetadata extends BotMetadata.BotQuotaMetadata.$Properties {
    }

    class BotQuotaMetadata {
        constructor(p?: BotMetadata.BotQuotaMetadata.$Properties);
        $unknowns?: Uint8Array[];
        botFeatureQuotaMetadata: BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties[];
        static create(properties: BotMetadata.BotQuotaMetadata.$Shape): BotMetadata.BotQuotaMetadata & BotMetadata.BotQuotaMetadata.$Shape;
        static create(properties?: BotMetadata.BotQuotaMetadata.$Properties): BotMetadata.BotQuotaMetadata;
        static encode(m: BotMetadata.BotQuotaMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotQuotaMetadata & BotMetadata.BotQuotaMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotQuotaMetadata;
        static toObject(m: BotMetadata.BotQuotaMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotQuotaMetadata {
        interface $Properties {
            botFeatureQuotaMetadata?: (BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotQuotaMetadata.$Properties;

        interface IBotFeatureQuotaMetadata extends BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties {
        }

        class BotFeatureQuotaMetadata {
            constructor(p?: BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties);
            $unknowns?: Uint8Array[];
            featureType?: (BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);
            remainingQuota?: (number|null);
            expirationTimestamp?: (number|Long|null);
            static create(properties: BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Shape): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata & BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Shape;
            static create(properties?: BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata;
            static encode(m: BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata & BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata;
            static toObject(m: BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotFeatureQuotaMetadata {
            interface $Properties {
                featureType?: (BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType|null);
                remainingQuota?: (number|null);
                expirationTimestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.$Properties;

            enum BotFeatureType {
                UNKNOWN_FEATURE = 0,
                REASONING_FEATURE = 1
            }
        }
    }

    interface IBotModeSelectionMetadata extends BotMetadata.BotModeSelectionMetadata.$Properties {
    }

    class BotModeSelectionMetadata {
        constructor(p?: BotMetadata.BotModeSelectionMetadata.$Properties);
        $unknowns?: Uint8Array[];
        mode: BotMetadata.BotModeSelectionMetadata.BotUserSelectionMode[];
        static create(properties: BotMetadata.BotModeSelectionMetadata.$Shape): BotMetadata.BotModeSelectionMetadata & BotMetadata.BotModeSelectionMetadata.$Shape;
        static create(properties?: BotMetadata.BotModeSelectionMetadata.$Properties): BotMetadata.BotModeSelectionMetadata;
        static encode(m: BotMetadata.BotModeSelectionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotModeSelectionMetadata & BotMetadata.BotModeSelectionMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotModeSelectionMetadata;
        static toObject(m: BotMetadata.BotModeSelectionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotModeSelectionMetadata {
        interface $Properties {
            mode?: (BotMetadata.BotModeSelectionMetadata.BotUserSelectionMode[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotModeSelectionMetadata.$Properties;

        enum BotUserSelectionMode {
            UNKNOWN_MODE = 0,
            REASONING_MODE = 1
        }
    }

    interface IBotCapabilityMetadata extends BotMetadata.BotCapabilityMetadata.$Properties {
    }

    class BotCapabilityMetadata {
        constructor(p?: BotMetadata.BotCapabilityMetadata.$Properties);
        $unknowns?: Uint8Array[];
        capabilities: BotMetadata.BotCapabilityMetadata.BotCapabilityType[];
        static create(properties: BotMetadata.BotCapabilityMetadata.$Shape): BotMetadata.BotCapabilityMetadata & BotMetadata.BotCapabilityMetadata.$Shape;
        static create(properties?: BotMetadata.BotCapabilityMetadata.$Properties): BotMetadata.BotCapabilityMetadata;
        static encode(m: BotMetadata.BotCapabilityMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotCapabilityMetadata & BotMetadata.BotCapabilityMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotCapabilityMetadata;
        static toObject(m: BotMetadata.BotCapabilityMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotCapabilityMetadata {
        interface $Properties {
            capabilities?: (BotMetadata.BotCapabilityMetadata.BotCapabilityType[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotCapabilityMetadata.$Properties;

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
            RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS = 42
        }
    }

    interface IBotProgressIndicatorMetadata extends BotMetadata.BotProgressIndicatorMetadata.$Properties {
    }

    class BotProgressIndicatorMetadata {
        constructor(p?: BotMetadata.BotProgressIndicatorMetadata.$Properties);
        $unknowns?: Uint8Array[];
        progressDescription?: (string|null);
        stepsMetadata: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties[];
        static create(properties: BotMetadata.BotProgressIndicatorMetadata.$Shape): BotMetadata.BotProgressIndicatorMetadata & BotMetadata.BotProgressIndicatorMetadata.$Shape;
        static create(properties?: BotMetadata.BotProgressIndicatorMetadata.$Properties): BotMetadata.BotProgressIndicatorMetadata;
        static encode(m: BotMetadata.BotProgressIndicatorMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotProgressIndicatorMetadata & BotMetadata.BotProgressIndicatorMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata;
        static toObject(m: BotMetadata.BotProgressIndicatorMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotProgressIndicatorMetadata {
        interface $Properties {
            progressDescription?: (string|null);
            stepsMetadata?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotProgressIndicatorMetadata.$Properties;

        interface IBotPlanningStepMetadata extends BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties {
        }

        class BotPlanningStepMetadata {
            constructor(p?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties);
            $unknowns?: Uint8Array[];
            statusTitle?: (string|null);
            statusBody?: (string|null);
            sourcesMetadata: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties[];
            status?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);
            isReasoning?: (boolean|null);
            isEnhancedSearch?: (boolean|null);
            sections: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties[];
            static create(properties: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Shape): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Shape;
            static create(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata;
            static encode(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata;
            static toObject(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotPlanningStepMetadata {
            interface $Properties {
                statusTitle?: (string|null);
                statusBody?: (string|null);
                sourcesMetadata?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties[]|null);
                status?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus|null);
                isReasoning?: (boolean|null);
                isEnhancedSearch?: (boolean|null);
                sections?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.$Properties;

            interface IBotPlanningSearchSourceMetadata extends BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties {
            }

            class BotPlanningSearchSourceMetadata {
                constructor(p?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties);
                $unknowns?: Uint8Array[];
                title?: (string|null);
                provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);
                sourceUrl?: (string|null);
                favIconUrl?: (string|null);
                static create(properties: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Shape): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Shape;
                static create(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;
                static encode(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Shape;
                static fromObject(d: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata;
                static toObject(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BotPlanningSearchSourceMetadata {
                interface $Properties {
                    title?: (string|null);
                    provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider|null);
                    sourceUrl?: (string|null);
                    favIconUrl?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties;
            }

            interface IBotPlanningSearchSourcesMetadata extends BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties {
            }

            class BotPlanningSearchSourcesMetadata {
                constructor(p?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties);
                $unknowns?: Uint8Array[];
                sourceTitle?: (string|null);
                provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);
                sourceUrl?: (string|null);
                static create(properties: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Shape): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Shape;
                static create(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;
                static encode(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Shape;
                static fromObject(d: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata;
                static toObject(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BotPlanningSearchSourcesMetadata {
                interface $Properties {
                    sourceTitle?: (string|null);
                    provider?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider|null);
                    sourceUrl?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.$Properties;

                enum BotPlanningSearchSourceProvider {
                    UNKNOWN = 0,
                    OTHER = 1,
                    GOOGLE = 2,
                    BING = 3
                }
            }

            interface IBotPlanningStepSectionMetadata extends BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties {
            }

            class BotPlanningStepSectionMetadata {
                constructor(p?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties);
                $unknowns?: Uint8Array[];
                sectionTitle?: (string|null);
                sectionBody?: (string|null);
                sourcesMetadata: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties[];
                static create(properties: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Shape): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Shape;
                static create(properties?: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;
                static encode(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata & BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Shape;
                static fromObject(d: { [k: string]: any }): BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata;
                static toObject(m: BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace BotPlanningStepSectionMetadata {
                interface $Properties {
                    sectionTitle?: (string|null);
                    sectionBody?: (string|null);
                    sourcesMetadata?: (BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.$Properties[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.$Properties;
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

    interface IBotModelMetadata extends BotMetadata.BotModelMetadata.$Properties {
    }

    class BotModelMetadata {
        constructor(p?: BotMetadata.BotModelMetadata.$Properties);
        $unknowns?: Uint8Array[];
        modelType?: (BotMetadata.BotModelMetadata.ModelType|null);
        premiumModelStatus?: (BotMetadata.BotModelMetadata.PremiumModelStatus|null);
        static create(properties: BotMetadata.BotModelMetadata.$Shape): BotMetadata.BotModelMetadata & BotMetadata.BotModelMetadata.$Shape;
        static create(properties?: BotMetadata.BotModelMetadata.$Properties): BotMetadata.BotModelMetadata;
        static encode(m: BotMetadata.BotModelMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotModelMetadata & BotMetadata.BotModelMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotModelMetadata;
        static toObject(m: BotMetadata.BotModelMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotModelMetadata {
        interface $Properties {
            modelType?: (BotMetadata.BotModelMetadata.ModelType|null);
            premiumModelStatus?: (BotMetadata.BotModelMetadata.PremiumModelStatus|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotModelMetadata.$Properties;

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

    interface IBotReminderMetadata extends BotMetadata.BotReminderMetadata.$Properties {
    }

    class BotReminderMetadata {
        constructor(p?: BotMetadata.BotReminderMetadata.$Properties);
        $unknowns?: Uint8Array[];
        requestMessageKey?: (Protocol.MessageKey.$Properties|null);
        action?: (BotMetadata.BotReminderMetadata.ReminderAction|null);
        name?: (string|null);
        nextTriggerTimestamp?: (number|Long|null);
        frequency?: (BotMetadata.BotReminderMetadata.ReminderFrequency|null);
        static create(properties: BotMetadata.BotReminderMetadata.$Shape): BotMetadata.BotReminderMetadata & BotMetadata.BotReminderMetadata.$Shape;
        static create(properties?: BotMetadata.BotReminderMetadata.$Properties): BotMetadata.BotReminderMetadata;
        static encode(m: BotMetadata.BotReminderMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotReminderMetadata & BotMetadata.BotReminderMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotReminderMetadata;
        static toObject(m: BotMetadata.BotReminderMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotReminderMetadata {
        interface $Properties {
            requestMessageKey?: (Protocol.MessageKey.$Properties|null);
            action?: (BotMetadata.BotReminderMetadata.ReminderAction|null);
            name?: (string|null);
            nextTriggerTimestamp?: (number|Long|null);
            frequency?: (BotMetadata.BotReminderMetadata.ReminderFrequency|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotReminderMetadata.$Properties;

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

    interface IBotMemuMetadata extends BotMetadata.BotMemuMetadata.$Properties {
    }

    class BotMemuMetadata {
        constructor(p?: BotMetadata.BotMemuMetadata.$Properties);
        $unknowns?: Uint8Array[];
        faceImages: BotMetadata.BotMediaMetadata.$Properties[];
        static create(properties: BotMetadata.BotMemuMetadata.$Shape): BotMetadata.BotMemuMetadata & BotMetadata.BotMemuMetadata.$Shape;
        static create(properties?: BotMetadata.BotMemuMetadata.$Properties): BotMetadata.BotMemuMetadata;
        static encode(m: BotMetadata.BotMemuMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMemuMetadata & BotMetadata.BotMemuMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMemuMetadata;
        static toObject(m: BotMetadata.BotMemuMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMemuMetadata {
        interface $Properties {
            faceImages?: (BotMetadata.BotMediaMetadata.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMemuMetadata.$Properties;
    }

    interface IBotMediaMetadata extends BotMetadata.BotMediaMetadata.$Properties {
    }

    class BotMediaMetadata {
        constructor(p?: BotMetadata.BotMediaMetadata.$Properties);
        $unknowns?: Uint8Array[];
        fileSha256?: (string|null);
        mediaKey?: (string|null);
        fileEncSha256?: (string|null);
        directPath?: (string|null);
        mediaKeyTimestamp?: (number|Long|null);
        mimetype?: (string|null);
        orientationType?: (BotMetadata.BotMediaMetadata.OrientationType|null);
        static create(properties: BotMetadata.BotMediaMetadata.$Shape): BotMetadata.BotMediaMetadata & BotMetadata.BotMediaMetadata.$Shape;
        static create(properties?: BotMetadata.BotMediaMetadata.$Properties): BotMetadata.BotMediaMetadata;
        static encode(m: BotMetadata.BotMediaMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMediaMetadata & BotMetadata.BotMediaMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMediaMetadata;
        static toObject(m: BotMetadata.BotMediaMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
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
            orientationType?: (BotMetadata.BotMediaMetadata.OrientationType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMediaMetadata.$Properties;

        enum OrientationType {
            CENTER = 1,
            LEFT = 2,
            RIGHT = 3
        }
    }

    interface IBotSessionMetadata extends BotMetadata.BotSessionMetadata.$Properties {
    }

    class BotSessionMetadata {
        constructor(p?: BotMetadata.BotSessionMetadata.$Properties);
        $unknowns?: Uint8Array[];
        sessionId?: (string|null);
        sessionSource?: (BotMetadata.BotSessionSource|null);
        static create(properties: BotMetadata.BotSessionMetadata.$Shape): BotMetadata.BotSessionMetadata & BotMetadata.BotSessionMetadata.$Shape;
        static create(properties?: BotMetadata.BotSessionMetadata.$Properties): BotMetadata.BotSessionMetadata;
        static encode(m: BotMetadata.BotSessionMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotSessionMetadata & BotMetadata.BotSessionMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotSessionMetadata;
        static toObject(m: BotMetadata.BotSessionMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSessionMetadata {
        interface $Properties {
            sessionId?: (string|null);
            sessionSource?: (BotMetadata.BotSessionSource|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotSessionMetadata.$Properties;
    }

    interface IBotMetricsMetadata extends BotMetadata.BotMetricsMetadata.$Properties {
    }

    class BotMetricsMetadata {
        constructor(p?: BotMetadata.BotMetricsMetadata.$Properties);
        $unknowns?: Uint8Array[];
        destinationId?: (string|null);
        destinationEntryPoint?: (BotMetadata.BotMetricsEntryPoint|null);
        threadOrigin?: (BotMetadata.BotMetricsThreadEntryPoint|null);
        static create(properties: BotMetadata.BotMetricsMetadata.$Shape): BotMetadata.BotMetricsMetadata & BotMetadata.BotMetricsMetadata.$Shape;
        static create(properties?: BotMetadata.BotMetricsMetadata.$Properties): BotMetadata.BotMetricsMetadata;
        static encode(m: BotMetadata.BotMetricsMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMetricsMetadata & BotMetadata.BotMetricsMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMetricsMetadata;
        static toObject(m: BotMetadata.BotMetricsMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMetricsMetadata {
        interface $Properties {
            destinationId?: (string|null);
            destinationEntryPoint?: (BotMetadata.BotMetricsEntryPoint|null);
            threadOrigin?: (BotMetadata.BotMetricsThreadEntryPoint|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMetricsMetadata.$Properties;
    }

    interface IBotRenderingMetadata extends BotMetadata.BotRenderingMetadata.$Properties {
    }

    class BotRenderingMetadata {
        constructor(p?: BotMetadata.BotRenderingMetadata.$Properties);
        $unknowns?: Uint8Array[];
        keywords: BotMetadata.BotRenderingMetadata.Keyword.$Properties[];
        static create(properties: BotMetadata.BotRenderingMetadata.$Shape): BotMetadata.BotRenderingMetadata & BotMetadata.BotRenderingMetadata.$Shape;
        static create(properties?: BotMetadata.BotRenderingMetadata.$Properties): BotMetadata.BotRenderingMetadata;
        static encode(m: BotMetadata.BotRenderingMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotRenderingMetadata & BotMetadata.BotRenderingMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotRenderingMetadata;
        static toObject(m: BotMetadata.BotRenderingMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotRenderingMetadata {
        interface $Properties {
            keywords?: (BotMetadata.BotRenderingMetadata.Keyword.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotRenderingMetadata.$Properties;

        interface IKeyword extends BotMetadata.BotRenderingMetadata.Keyword.$Properties {
        }

        class Keyword {
            constructor(p?: BotMetadata.BotRenderingMetadata.Keyword.$Properties);
            $unknowns?: Uint8Array[];
            value?: (string|null);
            associatedPrompts: string[];
            static create(properties: BotMetadata.BotRenderingMetadata.Keyword.$Shape): BotMetadata.BotRenderingMetadata.Keyword & BotMetadata.BotRenderingMetadata.Keyword.$Shape;
            static create(properties?: BotMetadata.BotRenderingMetadata.Keyword.$Properties): BotMetadata.BotRenderingMetadata.Keyword;
            static encode(m: BotMetadata.BotRenderingMetadata.Keyword.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotRenderingMetadata.Keyword & BotMetadata.BotRenderingMetadata.Keyword.$Shape;
            static fromObject(d: { [k: string]: any }): BotMetadata.BotRenderingMetadata.Keyword;
            static toObject(m: BotMetadata.BotRenderingMetadata.Keyword, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace Keyword {
            interface $Properties {
                value?: (string|null);
                associatedPrompts?: (string[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = BotMetadata.BotRenderingMetadata.Keyword.$Properties;
        }
    }

    interface IBotPromotionMessageMetadata extends BotMetadata.BotPromotionMessageMetadata.$Properties {
    }

    class BotPromotionMessageMetadata {
        constructor(p?: BotMetadata.BotPromotionMessageMetadata.$Properties);
        $unknowns?: Uint8Array[];
        promotionType?: (BotMetadata.BotPromotionMessageMetadata.BotPromotionType|null);
        buttonTitle?: (string|null);
        static create(properties: BotMetadata.BotPromotionMessageMetadata.$Shape): BotMetadata.BotPromotionMessageMetadata & BotMetadata.BotPromotionMessageMetadata.$Shape;
        static create(properties?: BotMetadata.BotPromotionMessageMetadata.$Properties): BotMetadata.BotPromotionMessageMetadata;
        static encode(m: BotMetadata.BotPromotionMessageMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotPromotionMessageMetadata & BotMetadata.BotPromotionMessageMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotPromotionMessageMetadata;
        static toObject(m: BotMetadata.BotPromotionMessageMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPromotionMessageMetadata {
        interface $Properties {
            promotionType?: (BotMetadata.BotPromotionMessageMetadata.BotPromotionType|null);
            buttonTitle?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotPromotionMessageMetadata.$Properties;

        enum BotPromotionType {
            UNKNOWN_TYPE = 0,
            C50 = 1,
            SURVEY_PLATFORM = 2
        }
    }

    interface IBotSignatureVerificationUseCaseProof extends BotMetadata.BotSignatureVerificationUseCaseProof.$Properties {
    }

    class BotSignatureVerificationUseCaseProof {
        constructor(p?: BotMetadata.BotSignatureVerificationUseCaseProof.$Properties);
        $unknowns?: Uint8Array[];
        version?: (number|null);
        useCase?: (BotMetadata.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);
        signature?: (Uint8Array|null);
        certificateChain?: (Uint8Array|null);
        static create(properties: BotMetadata.BotSignatureVerificationUseCaseProof.$Shape): BotMetadata.BotSignatureVerificationUseCaseProof & BotMetadata.BotSignatureVerificationUseCaseProof.$Shape;
        static create(properties?: BotMetadata.BotSignatureVerificationUseCaseProof.$Properties): BotMetadata.BotSignatureVerificationUseCaseProof;
        static encode(m: BotMetadata.BotSignatureVerificationUseCaseProof.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotSignatureVerificationUseCaseProof & BotMetadata.BotSignatureVerificationUseCaseProof.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotSignatureVerificationUseCaseProof;
        static toObject(m: BotMetadata.BotSignatureVerificationUseCaseProof, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSignatureVerificationUseCaseProof {
        interface $Properties {
            version?: (number|null);
            useCase?: (BotMetadata.BotSignatureVerificationUseCaseProof.BotSignatureUseCase|null);
            signature?: (Uint8Array|null);
            certificateChain?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotSignatureVerificationUseCaseProof.$Properties;

        enum BotSignatureUseCase {
            WA_BOT_MSG = 0
        }
    }

    interface IBotSignatureVerificationMetadata extends BotMetadata.BotSignatureVerificationMetadata.$Properties {
    }

    class BotSignatureVerificationMetadata {
        constructor(p?: BotMetadata.BotSignatureVerificationMetadata.$Properties);
        $unknowns?: Uint8Array[];
        proofs: BotMetadata.BotSignatureVerificationUseCaseProof.$Properties[];
        static create(properties: BotMetadata.BotSignatureVerificationMetadata.$Shape): BotMetadata.BotSignatureVerificationMetadata & BotMetadata.BotSignatureVerificationMetadata.$Shape;
        static create(properties?: BotMetadata.BotSignatureVerificationMetadata.$Properties): BotMetadata.BotSignatureVerificationMetadata;
        static encode(m: BotMetadata.BotSignatureVerificationMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotSignatureVerificationMetadata & BotMetadata.BotSignatureVerificationMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotSignatureVerificationMetadata;
        static toObject(m: BotMetadata.BotSignatureVerificationMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSignatureVerificationMetadata {
        interface $Properties {
            proofs?: (BotMetadata.BotSignatureVerificationUseCaseProof.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotSignatureVerificationMetadata.$Properties;
    }

    interface IBotMemoryFact extends BotMetadata.BotMemoryFact.$Properties {
    }

    class BotMemoryFact {
        constructor(p?: BotMetadata.BotMemoryFact.$Properties);
        $unknowns?: Uint8Array[];
        fact?: (string|null);
        factId?: (string|null);
        static create(properties: BotMetadata.BotMemoryFact.$Shape): BotMetadata.BotMemoryFact & BotMetadata.BotMemoryFact.$Shape;
        static create(properties?: BotMetadata.BotMemoryFact.$Properties): BotMetadata.BotMemoryFact;
        static encode(m: BotMetadata.BotMemoryFact.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMemoryFact & BotMetadata.BotMemoryFact.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMemoryFact;
        static toObject(m: BotMetadata.BotMemoryFact, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMemoryFact {
        interface $Properties {
            fact?: (string|null);
            factId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMemoryFact.$Properties;
    }

    interface IBotMemoryMetadata extends BotMetadata.BotMemoryMetadata.$Properties {
    }

    class BotMemoryMetadata {
        constructor(p?: BotMetadata.BotMemoryMetadata.$Properties);
        $unknowns?: Uint8Array[];
        addedFacts: BotMetadata.BotMemoryFact.$Properties[];
        removedFacts: BotMetadata.BotMemoryFact.$Properties[];
        disclaimer?: (string|null);
        static create(properties: BotMetadata.BotMemoryMetadata.$Shape): BotMetadata.BotMemoryMetadata & BotMetadata.BotMemoryMetadata.$Shape;
        static create(properties?: BotMetadata.BotMemoryMetadata.$Properties): BotMetadata.BotMemoryMetadata;
        static encode(m: BotMetadata.BotMemoryMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotMemoryMetadata & BotMetadata.BotMemoryMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotMemoryMetadata;
        static toObject(m: BotMetadata.BotMemoryMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotMemoryMetadata {
        interface $Properties {
            addedFacts?: (BotMetadata.BotMemoryFact.$Properties[]|null);
            removedFacts?: (BotMetadata.BotMemoryFact.$Properties[]|null);
            disclaimer?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotMemoryMetadata.$Properties;
    }

    interface IBotLinkedAccount extends BotMetadata.BotLinkedAccount.$Properties {
    }

    class BotLinkedAccount {
        constructor(p?: BotMetadata.BotLinkedAccount.$Properties);
        $unknowns?: Uint8Array[];
        type?: (BotMetadata.BotLinkedAccount.BotLinkedAccountType|null);
        static create(properties: BotMetadata.BotLinkedAccount.$Shape): BotMetadata.BotLinkedAccount & BotMetadata.BotLinkedAccount.$Shape;
        static create(properties?: BotMetadata.BotLinkedAccount.$Properties): BotMetadata.BotLinkedAccount;
        static encode(m: BotMetadata.BotLinkedAccount.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotLinkedAccount & BotMetadata.BotLinkedAccount.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotLinkedAccount;
        static toObject(m: BotMetadata.BotLinkedAccount, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotLinkedAccount {
        interface $Properties {
            type?: (BotMetadata.BotLinkedAccount.BotLinkedAccountType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotLinkedAccount.$Properties;

        enum BotLinkedAccountType {
            BOT_LINKED_ACCOUNT_TYPE_1P = 0
        }
    }

    interface IBotLinkedAccountsMetadata extends BotMetadata.BotLinkedAccountsMetadata.$Properties {
    }

    class BotLinkedAccountsMetadata {
        constructor(p?: BotMetadata.BotLinkedAccountsMetadata.$Properties);
        $unknowns?: Uint8Array[];
        accounts: BotMetadata.BotLinkedAccount.$Properties[];
        acAuthTokens?: (Uint8Array|null);
        acErrorCode?: (number|null);
        static create(properties: BotMetadata.BotLinkedAccountsMetadata.$Shape): BotMetadata.BotLinkedAccountsMetadata & BotMetadata.BotLinkedAccountsMetadata.$Shape;
        static create(properties?: BotMetadata.BotLinkedAccountsMetadata.$Properties): BotMetadata.BotLinkedAccountsMetadata;
        static encode(m: BotMetadata.BotLinkedAccountsMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotLinkedAccountsMetadata & BotMetadata.BotLinkedAccountsMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotLinkedAccountsMetadata;
        static toObject(m: BotMetadata.BotLinkedAccountsMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotLinkedAccountsMetadata {
        interface $Properties {
            accounts?: (BotMetadata.BotLinkedAccount.$Properties[]|null);
            acAuthTokens?: (Uint8Array|null);
            acErrorCode?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotLinkedAccountsMetadata.$Properties;
    }

    interface IBotPromptSuggestion extends BotMetadata.BotPromptSuggestion.$Properties {
    }

    class BotPromptSuggestion {
        constructor(p?: BotMetadata.BotPromptSuggestion.$Properties);
        $unknowns?: Uint8Array[];
        prompt?: (string|null);
        promptId?: (string|null);
        static create(properties: BotMetadata.BotPromptSuggestion.$Shape): BotMetadata.BotPromptSuggestion & BotMetadata.BotPromptSuggestion.$Shape;
        static create(properties?: BotMetadata.BotPromptSuggestion.$Properties): BotMetadata.BotPromptSuggestion;
        static encode(m: BotMetadata.BotPromptSuggestion.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotPromptSuggestion & BotMetadata.BotPromptSuggestion.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotPromptSuggestion;
        static toObject(m: BotMetadata.BotPromptSuggestion, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPromptSuggestion {
        interface $Properties {
            prompt?: (string|null);
            promptId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotPromptSuggestion.$Properties;
    }

    interface IBotPromptSuggestions extends BotMetadata.BotPromptSuggestions.$Properties {
    }

    class BotPromptSuggestions {
        constructor(p?: BotMetadata.BotPromptSuggestions.$Properties);
        $unknowns?: Uint8Array[];
        suggestions: BotMetadata.BotPromptSuggestion.$Properties[];
        static create(properties: BotMetadata.BotPromptSuggestions.$Shape): BotMetadata.BotPromptSuggestions & BotMetadata.BotPromptSuggestions.$Shape;
        static create(properties?: BotMetadata.BotPromptSuggestions.$Properties): BotMetadata.BotPromptSuggestions;
        static encode(m: BotMetadata.BotPromptSuggestions.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotPromptSuggestions & BotMetadata.BotPromptSuggestions.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotPromptSuggestions;
        static toObject(m: BotMetadata.BotPromptSuggestions, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPromptSuggestions {
        interface $Properties {
            suggestions?: (BotMetadata.BotPromptSuggestion.$Properties[]|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotPromptSuggestions.$Properties;
    }

    interface IBotSuggestedPromptMetadata extends BotMetadata.BotSuggestedPromptMetadata.$Properties {
    }

    class BotSuggestedPromptMetadata {
        constructor(p?: BotMetadata.BotSuggestedPromptMetadata.$Properties);
        $unknowns?: Uint8Array[];
        suggestedPrompts: string[];
        selectedPromptIndex?: (number|null);
        promptSuggestions?: (BotMetadata.BotPromptSuggestions.$Properties|null);
        selectedPromptId?: (string|null);
        static create(properties: BotMetadata.BotSuggestedPromptMetadata.$Shape): BotMetadata.BotSuggestedPromptMetadata & BotMetadata.BotSuggestedPromptMetadata.$Shape;
        static create(properties?: BotMetadata.BotSuggestedPromptMetadata.$Properties): BotMetadata.BotSuggestedPromptMetadata;
        static encode(m: BotMetadata.BotSuggestedPromptMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotSuggestedPromptMetadata & BotMetadata.BotSuggestedPromptMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotSuggestedPromptMetadata;
        static toObject(m: BotMetadata.BotSuggestedPromptMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotSuggestedPromptMetadata {
        interface $Properties {
            suggestedPrompts?: (string[]|null);
            selectedPromptIndex?: (number|null);
            promptSuggestions?: (BotMetadata.BotPromptSuggestions.$Properties|null);
            selectedPromptId?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotSuggestedPromptMetadata.$Properties;
    }

    interface IBotPluginMetadata extends BotMetadata.BotPluginMetadata.$Properties {
    }

    class BotPluginMetadata {
        constructor(p?: BotMetadata.BotPluginMetadata.$Properties);
        $unknowns?: Uint8Array[];
        provider?: (BotMetadata.BotPluginMetadata.SearchProvider|null);
        pluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);
        thumbnailCdnUrl?: (string|null);
        profilePhotoCdnUrl?: (string|null);
        searchProviderUrl?: (string|null);
        referenceIndex?: (number|null);
        expectedLinksCount?: (number|null);
        searchQuery?: (string|null);
        parentPluginMessageKey?: (Protocol.MessageKey.$Properties|null);
        deprecatedField?: (BotMetadata.BotPluginMetadata.PluginType|null);
        parentPluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);
        faviconCdnUrl?: (string|null);
        static create(properties: BotMetadata.BotPluginMetadata.$Shape): BotMetadata.BotPluginMetadata & BotMetadata.BotPluginMetadata.$Shape;
        static create(properties?: BotMetadata.BotPluginMetadata.$Properties): BotMetadata.BotPluginMetadata;
        static encode(m: BotMetadata.BotPluginMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotPluginMetadata & BotMetadata.BotPluginMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotPluginMetadata;
        static toObject(m: BotMetadata.BotPluginMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotPluginMetadata {
        interface $Properties {
            provider?: (BotMetadata.BotPluginMetadata.SearchProvider|null);
            pluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);
            thumbnailCdnUrl?: (string|null);
            profilePhotoCdnUrl?: (string|null);
            searchProviderUrl?: (string|null);
            referenceIndex?: (number|null);
            expectedLinksCount?: (number|null);
            searchQuery?: (string|null);
            parentPluginMessageKey?: (Protocol.MessageKey.$Properties|null);
            deprecatedField?: (BotMetadata.BotPluginMetadata.PluginType|null);
            parentPluginType?: (BotMetadata.BotPluginMetadata.PluginType|null);
            faviconCdnUrl?: (string|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotPluginMetadata.$Properties;

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

    interface IBotAvatarMetadata extends BotMetadata.BotAvatarMetadata.$Properties {
    }

    class BotAvatarMetadata {
        constructor(p?: BotMetadata.BotAvatarMetadata.$Properties);
        $unknowns?: Uint8Array[];
        sentiment?: (number|null);
        behaviorGraph?: (string|null);
        action?: (number|null);
        intensity?: (number|null);
        wordCount?: (number|null);
        static create(properties: BotMetadata.BotAvatarMetadata.$Shape): BotMetadata.BotAvatarMetadata & BotMetadata.BotAvatarMetadata.$Shape;
        static create(properties?: BotMetadata.BotAvatarMetadata.$Properties): BotMetadata.BotAvatarMetadata;
        static encode(m: BotMetadata.BotAvatarMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): BotMetadata.BotAvatarMetadata & BotMetadata.BotAvatarMetadata.$Shape;
        static fromObject(d: { [k: string]: any }): BotMetadata.BotAvatarMetadata;
        static toObject(m: BotMetadata.BotAvatarMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace BotAvatarMetadata {
        interface $Properties {
            sentiment?: (number|null);
            behaviorGraph?: (string|null);
            action?: (number|null);
            intensity?: (number|null);
            wordCount?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = BotMetadata.BotAvatarMetadata.$Properties;
    }

    enum BotSessionSource {
        NONE = 0,
        NULL_STATE = 1,
        TYPEAHEAD = 2,
        USER_INPUT = 3,
        EMU_FLASH = 4,
        EMU_FLASH_FOLLOWUP = 5,
        VOICE = 6
    }

    enum BotMetricsThreadEntryPoint {
        AI_TAB_THREAD = 1,
        AI_HOME_THREAD = 2,
        AI_DEEPLINK_IMMERSIVE_THREAD = 3,
        AI_DEEPLINK_THREAD = 4,
        ASK_META_AI_CONTEXT_MENU_THREAD = 5
    }

    enum BotMetricsEntryPoint {
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
        META_AI_FORWARD = 31
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
