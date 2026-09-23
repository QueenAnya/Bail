/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $RangeError = $util.global.RangeError, $TypeError = $util.global.TypeError, $String = $util.global.String, $Array = $util.global.Array, $Boolean = $util.global.Boolean, $parseInt = $util.global.parseInt, $BigInt = $util.global.BigInt, $Number = $util.global.Number;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const BotMetadata = $root.BotMetadata = (() => {

    const BotMetadata = {};

    BotMetadata.BotMetadata = (function() {

        const BotMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMetadata.prototype.avatarMetadata = null;
        BotMetadata.prototype.personaId = null;
        BotMetadata.prototype.pluginMetadata = null;
        BotMetadata.prototype.suggestedPromptMetadata = null;
        BotMetadata.prototype.invokerJid = null;
        BotMetadata.prototype.sessionMetadata = null;
        BotMetadata.prototype.memuMetadata = null;
        BotMetadata.prototype.timezone = null;
        BotMetadata.prototype.reminderMetadata = null;
        BotMetadata.prototype.modelMetadata = null;
        BotMetadata.prototype.messageDisclaimerText = null;
        BotMetadata.prototype.progressIndicatorMetadata = null;
        BotMetadata.prototype.capabilityMetadata = null;
        BotMetadata.prototype.imagineMetadata = null;
        BotMetadata.prototype.memoryMetadata = null;
        BotMetadata.prototype.renderingMetadata = null;
        BotMetadata.prototype.botMetricsMetadata = null;
        BotMetadata.prototype.botLinkedAccountsMetadata = null;
        BotMetadata.prototype.richResponseSourcesMetadata = null;
        BotMetadata.prototype.aiConversationContext = null;
        BotMetadata.prototype.botPromotionMessageMetadata = null;
        BotMetadata.prototype.botModeSelectionMetadata = null;
        BotMetadata.prototype.botQuotaMetadata = null;
        BotMetadata.prototype.botAgeCollectionMetadata = null;
        BotMetadata.prototype.conversationStarterPromptId = null;
        BotMetadata.prototype.botResponseId = null;
        BotMetadata.prototype.verificationMetadata = null;
        BotMetadata.prototype.unifiedResponseMutation = null;
        BotMetadata.prototype.botMessageOriginMetadata = null;
        BotMetadata.prototype.inThreadSurveyMetadata = null;
        BotMetadata.prototype.botThreadInfo = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_avatarMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["avatarMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_personaId", {
            get: $util.oneOfGetter($oneOfFields = ["personaId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_pluginMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["pluginMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_suggestedPromptMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["suggestedPromptMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_invokerJid", {
            get: $util.oneOfGetter($oneOfFields = ["invokerJid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_sessionMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["sessionMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_memuMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["memuMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_timezone", {
            get: $util.oneOfGetter($oneOfFields = ["timezone"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_reminderMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["reminderMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_modelMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["modelMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_messageDisclaimerText", {
            get: $util.oneOfGetter($oneOfFields = ["messageDisclaimerText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_progressIndicatorMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["progressIndicatorMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_capabilityMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["capabilityMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_imagineMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["imagineMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_memoryMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["memoryMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_renderingMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["renderingMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botMetricsMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botMetricsMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botLinkedAccountsMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botLinkedAccountsMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_richResponseSourcesMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["richResponseSourcesMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_aiConversationContext", {
            get: $util.oneOfGetter($oneOfFields = ["aiConversationContext"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botPromotionMessageMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botPromotionMessageMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botModeSelectionMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botModeSelectionMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botQuotaMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botQuotaMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botAgeCollectionMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botAgeCollectionMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_conversationStarterPromptId", {
            get: $util.oneOfGetter($oneOfFields = ["conversationStarterPromptId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botResponseId", {
            get: $util.oneOfGetter($oneOfFields = ["botResponseId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_verificationMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["verificationMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_unifiedResponseMutation", {
            get: $util.oneOfGetter($oneOfFields = ["unifiedResponseMutation"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botMessageOriginMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botMessageOriginMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_inThreadSurveyMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["inThreadSurveyMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botThreadInfo", {
            get: $util.oneOfGetter($oneOfFields = ["botThreadInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMetadata.create = function(properties) {
            return new BotMetadata(properties);
        };

        BotMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.avatarMetadata != null && $Object.hasOwnProperty.call(m, "avatarMetadata"))
                $root.BotMetadata.BotAvatarMetadata.encode(m.avatarMetadata, w.uint32(10).fork(), q + 1).ldelim();
            if (m.personaId != null && $Object.hasOwnProperty.call(m, "personaId"))
                w.uint32(18).string(m.personaId);
            if (m.pluginMetadata != null && $Object.hasOwnProperty.call(m, "pluginMetadata"))
                $root.BotMetadata.BotPluginMetadata.encode(m.pluginMetadata, w.uint32(26).fork(), q + 1).ldelim();
            if (m.suggestedPromptMetadata != null && $Object.hasOwnProperty.call(m, "suggestedPromptMetadata"))
                $root.BotMetadata.BotSuggestedPromptMetadata.encode(m.suggestedPromptMetadata, w.uint32(34).fork(), q + 1).ldelim();
            if (m.invokerJid != null && $Object.hasOwnProperty.call(m, "invokerJid"))
                w.uint32(42).string(m.invokerJid);
            if (m.sessionMetadata != null && $Object.hasOwnProperty.call(m, "sessionMetadata"))
                $root.BotMetadata.BotSessionMetadata.encode(m.sessionMetadata, w.uint32(50).fork(), q + 1).ldelim();
            if (m.memuMetadata != null && $Object.hasOwnProperty.call(m, "memuMetadata"))
                $root.BotMetadata.BotMemuMetadata.encode(m.memuMetadata, w.uint32(58).fork(), q + 1).ldelim();
            if (m.timezone != null && $Object.hasOwnProperty.call(m, "timezone"))
                w.uint32(66).string(m.timezone);
            if (m.reminderMetadata != null && $Object.hasOwnProperty.call(m, "reminderMetadata"))
                $root.BotMetadata.BotReminderMetadata.encode(m.reminderMetadata, w.uint32(74).fork(), q + 1).ldelim();
            if (m.modelMetadata != null && $Object.hasOwnProperty.call(m, "modelMetadata"))
                $root.BotMetadata.BotModelMetadata.encode(m.modelMetadata, w.uint32(82).fork(), q + 1).ldelim();
            if (m.messageDisclaimerText != null && $Object.hasOwnProperty.call(m, "messageDisclaimerText"))
                w.uint32(90).string(m.messageDisclaimerText);
            if (m.progressIndicatorMetadata != null && $Object.hasOwnProperty.call(m, "progressIndicatorMetadata"))
                $root.BotMetadata.BotProgressIndicatorMetadata.encode(m.progressIndicatorMetadata, w.uint32(98).fork(), q + 1).ldelim();
            if (m.capabilityMetadata != null && $Object.hasOwnProperty.call(m, "capabilityMetadata"))
                $root.BotMetadata.BotCapabilityMetadata.encode(m.capabilityMetadata, w.uint32(106).fork(), q + 1).ldelim();
            if (m.imagineMetadata != null && $Object.hasOwnProperty.call(m, "imagineMetadata"))
                $root.BotMetadata.BotImagineMetadata.encode(m.imagineMetadata, w.uint32(114).fork(), q + 1).ldelim();
            if (m.memoryMetadata != null && $Object.hasOwnProperty.call(m, "memoryMetadata"))
                $root.BotMetadata.BotMemoryMetadata.encode(m.memoryMetadata, w.uint32(122).fork(), q + 1).ldelim();
            if (m.renderingMetadata != null && $Object.hasOwnProperty.call(m, "renderingMetadata"))
                $root.BotMetadata.BotRenderingMetadata.encode(m.renderingMetadata, w.uint32(130).fork(), q + 1).ldelim();
            if (m.botMetricsMetadata != null && $Object.hasOwnProperty.call(m, "botMetricsMetadata"))
                $root.BotMetadata.BotMetricsMetadata.encode(m.botMetricsMetadata, w.uint32(138).fork(), q + 1).ldelim();
            if (m.botLinkedAccountsMetadata != null && $Object.hasOwnProperty.call(m, "botLinkedAccountsMetadata"))
                $root.BotMetadata.BotLinkedAccountsMetadata.encode(m.botLinkedAccountsMetadata, w.uint32(146).fork(), q + 1).ldelim();
            if (m.richResponseSourcesMetadata != null && $Object.hasOwnProperty.call(m, "richResponseSourcesMetadata"))
                $root.BotMetadata.BotSourcesMetadata.encode(m.richResponseSourcesMetadata, w.uint32(154).fork(), q + 1).ldelim();
            if (m.aiConversationContext != null && $Object.hasOwnProperty.call(m, "aiConversationContext"))
                w.uint32(162).bytes(m.aiConversationContext);
            if (m.botPromotionMessageMetadata != null && $Object.hasOwnProperty.call(m, "botPromotionMessageMetadata"))
                $root.BotMetadata.BotPromotionMessageMetadata.encode(m.botPromotionMessageMetadata, w.uint32(170).fork(), q + 1).ldelim();
            if (m.botModeSelectionMetadata != null && $Object.hasOwnProperty.call(m, "botModeSelectionMetadata"))
                $root.BotMetadata.BotModeSelectionMetadata.encode(m.botModeSelectionMetadata, w.uint32(178).fork(), q + 1).ldelim();
            if (m.botQuotaMetadata != null && $Object.hasOwnProperty.call(m, "botQuotaMetadata"))
                $root.BotMetadata.BotQuotaMetadata.encode(m.botQuotaMetadata, w.uint32(186).fork(), q + 1).ldelim();
            if (m.botAgeCollectionMetadata != null && $Object.hasOwnProperty.call(m, "botAgeCollectionMetadata"))
                $root.BotMetadata.BotAgeCollectionMetadata.encode(m.botAgeCollectionMetadata, w.uint32(194).fork(), q + 1).ldelim();
            if (m.conversationStarterPromptId != null && $Object.hasOwnProperty.call(m, "conversationStarterPromptId"))
                w.uint32(202).string(m.conversationStarterPromptId);
            if (m.botResponseId != null && $Object.hasOwnProperty.call(m, "botResponseId"))
                w.uint32(210).string(m.botResponseId);
            if (m.verificationMetadata != null && $Object.hasOwnProperty.call(m, "verificationMetadata"))
                $root.BotMetadata.BotSignatureVerificationMetadata.encode(m.verificationMetadata, w.uint32(218).fork(), q + 1).ldelim();
            if (m.unifiedResponseMutation != null && $Object.hasOwnProperty.call(m, "unifiedResponseMutation"))
                $root.BotMetadata.BotUnifiedResponseMutation.encode(m.unifiedResponseMutation, w.uint32(226).fork(), q + 1).ldelim();
            if (m.botMessageOriginMetadata != null && $Object.hasOwnProperty.call(m, "botMessageOriginMetadata"))
                $root.BotMetadata.BotMessageOriginMetadata.encode(m.botMessageOriginMetadata, w.uint32(234).fork(), q + 1).ldelim();
            if (m.inThreadSurveyMetadata != null && $Object.hasOwnProperty.call(m, "inThreadSurveyMetadata"))
                $root.BotMetadata.InThreadSurveyMetadata.encode(m.inThreadSurveyMetadata, w.uint32(242).fork(), q + 1).ldelim();
            if (m.botThreadInfo != null && $Object.hasOwnProperty.call(m, "botThreadInfo"))
                $root.BotMetadata.AIThreadInfo.encode(m.botThreadInfo, w.uint32(250).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.avatarMetadata = $root.BotMetadata.BotAvatarMetadata.decode(r, r.uint32(), $undefined, q + 1, m.avatarMetadata);
                        m._avatarMetadata = "avatarMetadata";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.personaId = r.stringVerify();
                        m._personaId = "personaId";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.pluginMetadata = $root.BotMetadata.BotPluginMetadata.decode(r, r.uint32(), $undefined, q + 1, m.pluginMetadata);
                        m._pluginMetadata = "pluginMetadata";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.suggestedPromptMetadata = $root.BotMetadata.BotSuggestedPromptMetadata.decode(r, r.uint32(), $undefined, q + 1, m.suggestedPromptMetadata);
                        m._suggestedPromptMetadata = "suggestedPromptMetadata";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.invokerJid = r.stringVerify();
                        m._invokerJid = "invokerJid";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.sessionMetadata = $root.BotMetadata.BotSessionMetadata.decode(r, r.uint32(), $undefined, q + 1, m.sessionMetadata);
                        m._sessionMetadata = "sessionMetadata";
                        continue;
                    }
                case 7: {
                        if (u !== 2)
                            break;
                        m.memuMetadata = $root.BotMetadata.BotMemuMetadata.decode(r, r.uint32(), $undefined, q + 1, m.memuMetadata);
                        m._memuMetadata = "memuMetadata";
                        continue;
                    }
                case 8: {
                        if (u !== 2)
                            break;
                        m.timezone = r.stringVerify();
                        m._timezone = "timezone";
                        continue;
                    }
                case 9: {
                        if (u !== 2)
                            break;
                        m.reminderMetadata = $root.BotMetadata.BotReminderMetadata.decode(r, r.uint32(), $undefined, q + 1, m.reminderMetadata);
                        m._reminderMetadata = "reminderMetadata";
                        continue;
                    }
                case 10: {
                        if (u !== 2)
                            break;
                        m.modelMetadata = $root.BotMetadata.BotModelMetadata.decode(r, r.uint32(), $undefined, q + 1, m.modelMetadata);
                        m._modelMetadata = "modelMetadata";
                        continue;
                    }
                case 11: {
                        if (u !== 2)
                            break;
                        m.messageDisclaimerText = r.stringVerify();
                        m._messageDisclaimerText = "messageDisclaimerText";
                        continue;
                    }
                case 12: {
                        if (u !== 2)
                            break;
                        m.progressIndicatorMetadata = $root.BotMetadata.BotProgressIndicatorMetadata.decode(r, r.uint32(), $undefined, q + 1, m.progressIndicatorMetadata);
                        m._progressIndicatorMetadata = "progressIndicatorMetadata";
                        continue;
                    }
                case 13: {
                        if (u !== 2)
                            break;
                        m.capabilityMetadata = $root.BotMetadata.BotCapabilityMetadata.decode(r, r.uint32(), $undefined, q + 1, m.capabilityMetadata);
                        m._capabilityMetadata = "capabilityMetadata";
                        continue;
                    }
                case 14: {
                        if (u !== 2)
                            break;
                        m.imagineMetadata = $root.BotMetadata.BotImagineMetadata.decode(r, r.uint32(), $undefined, q + 1, m.imagineMetadata);
                        m._imagineMetadata = "imagineMetadata";
                        continue;
                    }
                case 15: {
                        if (u !== 2)
                            break;
                        m.memoryMetadata = $root.BotMetadata.BotMemoryMetadata.decode(r, r.uint32(), $undefined, q + 1, m.memoryMetadata);
                        m._memoryMetadata = "memoryMetadata";
                        continue;
                    }
                case 16: {
                        if (u !== 2)
                            break;
                        m.renderingMetadata = $root.BotMetadata.BotRenderingMetadata.decode(r, r.uint32(), $undefined, q + 1, m.renderingMetadata);
                        m._renderingMetadata = "renderingMetadata";
                        continue;
                    }
                case 17: {
                        if (u !== 2)
                            break;
                        m.botMetricsMetadata = $root.BotMetadata.BotMetricsMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botMetricsMetadata);
                        m._botMetricsMetadata = "botMetricsMetadata";
                        continue;
                    }
                case 18: {
                        if (u !== 2)
                            break;
                        m.botLinkedAccountsMetadata = $root.BotMetadata.BotLinkedAccountsMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botLinkedAccountsMetadata);
                        m._botLinkedAccountsMetadata = "botLinkedAccountsMetadata";
                        continue;
                    }
                case 19: {
                        if (u !== 2)
                            break;
                        m.richResponseSourcesMetadata = $root.BotMetadata.BotSourcesMetadata.decode(r, r.uint32(), $undefined, q + 1, m.richResponseSourcesMetadata);
                        m._richResponseSourcesMetadata = "richResponseSourcesMetadata";
                        continue;
                    }
                case 20: {
                        if (u !== 2)
                            break;
                        m.aiConversationContext = r.bytes();
                        m._aiConversationContext = "aiConversationContext";
                        continue;
                    }
                case 21: {
                        if (u !== 2)
                            break;
                        m.botPromotionMessageMetadata = $root.BotMetadata.BotPromotionMessageMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botPromotionMessageMetadata);
                        m._botPromotionMessageMetadata = "botPromotionMessageMetadata";
                        continue;
                    }
                case 22: {
                        if (u !== 2)
                            break;
                        m.botModeSelectionMetadata = $root.BotMetadata.BotModeSelectionMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botModeSelectionMetadata);
                        m._botModeSelectionMetadata = "botModeSelectionMetadata";
                        continue;
                    }
                case 23: {
                        if (u !== 2)
                            break;
                        m.botQuotaMetadata = $root.BotMetadata.BotQuotaMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botQuotaMetadata);
                        m._botQuotaMetadata = "botQuotaMetadata";
                        continue;
                    }
                case 24: {
                        if (u !== 2)
                            break;
                        m.botAgeCollectionMetadata = $root.BotMetadata.BotAgeCollectionMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botAgeCollectionMetadata);
                        m._botAgeCollectionMetadata = "botAgeCollectionMetadata";
                        continue;
                    }
                case 25: {
                        if (u !== 2)
                            break;
                        m.conversationStarterPromptId = r.stringVerify();
                        m._conversationStarterPromptId = "conversationStarterPromptId";
                        continue;
                    }
                case 26: {
                        if (u !== 2)
                            break;
                        m.botResponseId = r.stringVerify();
                        m._botResponseId = "botResponseId";
                        continue;
                    }
                case 27: {
                        if (u !== 2)
                            break;
                        m.verificationMetadata = $root.BotMetadata.BotSignatureVerificationMetadata.decode(r, r.uint32(), $undefined, q + 1, m.verificationMetadata);
                        m._verificationMetadata = "verificationMetadata";
                        continue;
                    }
                case 28: {
                        if (u !== 2)
                            break;
                        m.unifiedResponseMutation = $root.BotMetadata.BotUnifiedResponseMutation.decode(r, r.uint32(), $undefined, q + 1, m.unifiedResponseMutation);
                        m._unifiedResponseMutation = "unifiedResponseMutation";
                        continue;
                    }
                case 29: {
                        if (u !== 2)
                            break;
                        m.botMessageOriginMetadata = $root.BotMetadata.BotMessageOriginMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botMessageOriginMetadata);
                        m._botMessageOriginMetadata = "botMessageOriginMetadata";
                        continue;
                    }
                case 30: {
                        if (u !== 2)
                            break;
                        m.inThreadSurveyMetadata = $root.BotMetadata.InThreadSurveyMetadata.decode(r, r.uint32(), $undefined, q + 1, m.inThreadSurveyMetadata);
                        m._inThreadSurveyMetadata = "inThreadSurveyMetadata";
                        continue;
                    }
                case 31: {
                        if (u !== 2)
                            break;
                        m.botThreadInfo = $root.BotMetadata.AIThreadInfo.decode(r, r.uint32(), $undefined, q + 1, m.botThreadInfo);
                        m._botThreadInfo = "botThreadInfo";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMetadata();
            if (d.avatarMetadata != null) {
                if (!$util.isObject(d.avatarMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.avatarMetadata: object expected");
                m.avatarMetadata = $root.BotMetadata.BotAvatarMetadata.fromObject(d.avatarMetadata, q + 1);
            }
            if (d.personaId != null) {
                m.personaId = $String(d.personaId);
            }
            if (d.pluginMetadata != null) {
                if (!$util.isObject(d.pluginMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.pluginMetadata: object expected");
                m.pluginMetadata = $root.BotMetadata.BotPluginMetadata.fromObject(d.pluginMetadata, q + 1);
            }
            if (d.suggestedPromptMetadata != null) {
                if (!$util.isObject(d.suggestedPromptMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.suggestedPromptMetadata: object expected");
                m.suggestedPromptMetadata = $root.BotMetadata.BotSuggestedPromptMetadata.fromObject(d.suggestedPromptMetadata, q + 1);
            }
            if (d.invokerJid != null) {
                m.invokerJid = $String(d.invokerJid);
            }
            if (d.sessionMetadata != null) {
                if (!$util.isObject(d.sessionMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.sessionMetadata: object expected");
                m.sessionMetadata = $root.BotMetadata.BotSessionMetadata.fromObject(d.sessionMetadata, q + 1);
            }
            if (d.memuMetadata != null) {
                if (!$util.isObject(d.memuMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.memuMetadata: object expected");
                m.memuMetadata = $root.BotMetadata.BotMemuMetadata.fromObject(d.memuMetadata, q + 1);
            }
            if (d.timezone != null) {
                m.timezone = $String(d.timezone);
            }
            if (d.reminderMetadata != null) {
                if (!$util.isObject(d.reminderMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.reminderMetadata: object expected");
                m.reminderMetadata = $root.BotMetadata.BotReminderMetadata.fromObject(d.reminderMetadata, q + 1);
            }
            if (d.modelMetadata != null) {
                if (!$util.isObject(d.modelMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.modelMetadata: object expected");
                m.modelMetadata = $root.BotMetadata.BotModelMetadata.fromObject(d.modelMetadata, q + 1);
            }
            if (d.messageDisclaimerText != null) {
                m.messageDisclaimerText = $String(d.messageDisclaimerText);
            }
            if (d.progressIndicatorMetadata != null) {
                if (!$util.isObject(d.progressIndicatorMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.progressIndicatorMetadata: object expected");
                m.progressIndicatorMetadata = $root.BotMetadata.BotProgressIndicatorMetadata.fromObject(d.progressIndicatorMetadata, q + 1);
            }
            if (d.capabilityMetadata != null) {
                if (!$util.isObject(d.capabilityMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.capabilityMetadata: object expected");
                m.capabilityMetadata = $root.BotMetadata.BotCapabilityMetadata.fromObject(d.capabilityMetadata, q + 1);
            }
            if (d.imagineMetadata != null) {
                if (!$util.isObject(d.imagineMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.imagineMetadata: object expected");
                m.imagineMetadata = $root.BotMetadata.BotImagineMetadata.fromObject(d.imagineMetadata, q + 1);
            }
            if (d.memoryMetadata != null) {
                if (!$util.isObject(d.memoryMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.memoryMetadata: object expected");
                m.memoryMetadata = $root.BotMetadata.BotMemoryMetadata.fromObject(d.memoryMetadata, q + 1);
            }
            if (d.renderingMetadata != null) {
                if (!$util.isObject(d.renderingMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.renderingMetadata: object expected");
                m.renderingMetadata = $root.BotMetadata.BotRenderingMetadata.fromObject(d.renderingMetadata, q + 1);
            }
            if (d.botMetricsMetadata != null) {
                if (!$util.isObject(d.botMetricsMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.botMetricsMetadata: object expected");
                m.botMetricsMetadata = $root.BotMetadata.BotMetricsMetadata.fromObject(d.botMetricsMetadata, q + 1);
            }
            if (d.botLinkedAccountsMetadata != null) {
                if (!$util.isObject(d.botLinkedAccountsMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.botLinkedAccountsMetadata: object expected");
                m.botLinkedAccountsMetadata = $root.BotMetadata.BotLinkedAccountsMetadata.fromObject(d.botLinkedAccountsMetadata, q + 1);
            }
            if (d.richResponseSourcesMetadata != null) {
                if (!$util.isObject(d.richResponseSourcesMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.richResponseSourcesMetadata: object expected");
                m.richResponseSourcesMetadata = $root.BotMetadata.BotSourcesMetadata.fromObject(d.richResponseSourcesMetadata, q + 1);
            }
            if (d.aiConversationContext != null) {
                if (typeof d.aiConversationContext === "string")
                    $util.base64.decode(d.aiConversationContext, m.aiConversationContext = $util.newBuffer($util.base64.length(d.aiConversationContext)), 0);
                else if (d.aiConversationContext.length >= 0)
                    m.aiConversationContext = d.aiConversationContext;
            }
            if (d.botPromotionMessageMetadata != null) {
                if (!$util.isObject(d.botPromotionMessageMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.botPromotionMessageMetadata: object expected");
                m.botPromotionMessageMetadata = $root.BotMetadata.BotPromotionMessageMetadata.fromObject(d.botPromotionMessageMetadata, q + 1);
            }
            if (d.botModeSelectionMetadata != null) {
                if (!$util.isObject(d.botModeSelectionMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.botModeSelectionMetadata: object expected");
                m.botModeSelectionMetadata = $root.BotMetadata.BotModeSelectionMetadata.fromObject(d.botModeSelectionMetadata, q + 1);
            }
            if (d.botQuotaMetadata != null) {
                if (!$util.isObject(d.botQuotaMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.botQuotaMetadata: object expected");
                m.botQuotaMetadata = $root.BotMetadata.BotQuotaMetadata.fromObject(d.botQuotaMetadata, q + 1);
            }
            if (d.botAgeCollectionMetadata != null) {
                if (!$util.isObject(d.botAgeCollectionMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.botAgeCollectionMetadata: object expected");
                m.botAgeCollectionMetadata = $root.BotMetadata.BotAgeCollectionMetadata.fromObject(d.botAgeCollectionMetadata, q + 1);
            }
            if (d.conversationStarterPromptId != null) {
                m.conversationStarterPromptId = $String(d.conversationStarterPromptId);
            }
            if (d.botResponseId != null) {
                m.botResponseId = $String(d.botResponseId);
            }
            if (d.verificationMetadata != null) {
                if (!$util.isObject(d.verificationMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.verificationMetadata: object expected");
                m.verificationMetadata = $root.BotMetadata.BotSignatureVerificationMetadata.fromObject(d.verificationMetadata, q + 1);
            }
            if (d.unifiedResponseMutation != null) {
                if (!$util.isObject(d.unifiedResponseMutation))
                    throw $TypeError(".BotMetadata.BotMetadata.unifiedResponseMutation: object expected");
                m.unifiedResponseMutation = $root.BotMetadata.BotUnifiedResponseMutation.fromObject(d.unifiedResponseMutation, q + 1);
            }
            if (d.botMessageOriginMetadata != null) {
                if (!$util.isObject(d.botMessageOriginMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.botMessageOriginMetadata: object expected");
                m.botMessageOriginMetadata = $root.BotMetadata.BotMessageOriginMetadata.fromObject(d.botMessageOriginMetadata, q + 1);
            }
            if (d.inThreadSurveyMetadata != null) {
                if (!$util.isObject(d.inThreadSurveyMetadata))
                    throw $TypeError(".BotMetadata.BotMetadata.inThreadSurveyMetadata: object expected");
                m.inThreadSurveyMetadata = $root.BotMetadata.InThreadSurveyMetadata.fromObject(d.inThreadSurveyMetadata, q + 1);
            }
            if (d.botThreadInfo != null) {
                if (!$util.isObject(d.botThreadInfo))
                    throw $TypeError(".BotMetadata.BotMetadata.botThreadInfo: object expected");
                m.botThreadInfo = $root.BotMetadata.AIThreadInfo.fromObject(d.botThreadInfo, q + 1);
            }
            return m;
        };

        BotMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.avatarMetadata != null && $Object.hasOwnProperty.call(m, "avatarMetadata")) {
                d.avatarMetadata = $root.BotMetadata.BotAvatarMetadata.toObject(m.avatarMetadata, o, q + 1);
            }
            if (m.personaId != null && $Object.hasOwnProperty.call(m, "personaId")) {
                d.personaId = m.personaId;
            }
            if (m.pluginMetadata != null && $Object.hasOwnProperty.call(m, "pluginMetadata")) {
                d.pluginMetadata = $root.BotMetadata.BotPluginMetadata.toObject(m.pluginMetadata, o, q + 1);
            }
            if (m.suggestedPromptMetadata != null && $Object.hasOwnProperty.call(m, "suggestedPromptMetadata")) {
                d.suggestedPromptMetadata = $root.BotMetadata.BotSuggestedPromptMetadata.toObject(m.suggestedPromptMetadata, o, q + 1);
            }
            if (m.invokerJid != null && $Object.hasOwnProperty.call(m, "invokerJid")) {
                d.invokerJid = m.invokerJid;
            }
            if (m.sessionMetadata != null && $Object.hasOwnProperty.call(m, "sessionMetadata")) {
                d.sessionMetadata = $root.BotMetadata.BotSessionMetadata.toObject(m.sessionMetadata, o, q + 1);
            }
            if (m.memuMetadata != null && $Object.hasOwnProperty.call(m, "memuMetadata")) {
                d.memuMetadata = $root.BotMetadata.BotMemuMetadata.toObject(m.memuMetadata, o, q + 1);
            }
            if (m.timezone != null && $Object.hasOwnProperty.call(m, "timezone")) {
                d.timezone = m.timezone;
            }
            if (m.reminderMetadata != null && $Object.hasOwnProperty.call(m, "reminderMetadata")) {
                d.reminderMetadata = $root.BotMetadata.BotReminderMetadata.toObject(m.reminderMetadata, o, q + 1);
            }
            if (m.modelMetadata != null && $Object.hasOwnProperty.call(m, "modelMetadata")) {
                d.modelMetadata = $root.BotMetadata.BotModelMetadata.toObject(m.modelMetadata, o, q + 1);
            }
            if (m.messageDisclaimerText != null && $Object.hasOwnProperty.call(m, "messageDisclaimerText")) {
                d.messageDisclaimerText = m.messageDisclaimerText;
            }
            if (m.progressIndicatorMetadata != null && $Object.hasOwnProperty.call(m, "progressIndicatorMetadata")) {
                d.progressIndicatorMetadata = $root.BotMetadata.BotProgressIndicatorMetadata.toObject(m.progressIndicatorMetadata, o, q + 1);
            }
            if (m.capabilityMetadata != null && $Object.hasOwnProperty.call(m, "capabilityMetadata")) {
                d.capabilityMetadata = $root.BotMetadata.BotCapabilityMetadata.toObject(m.capabilityMetadata, o, q + 1);
            }
            if (m.imagineMetadata != null && $Object.hasOwnProperty.call(m, "imagineMetadata")) {
                d.imagineMetadata = $root.BotMetadata.BotImagineMetadata.toObject(m.imagineMetadata, o, q + 1);
            }
            if (m.memoryMetadata != null && $Object.hasOwnProperty.call(m, "memoryMetadata")) {
                d.memoryMetadata = $root.BotMetadata.BotMemoryMetadata.toObject(m.memoryMetadata, o, q + 1);
            }
            if (m.renderingMetadata != null && $Object.hasOwnProperty.call(m, "renderingMetadata")) {
                d.renderingMetadata = $root.BotMetadata.BotRenderingMetadata.toObject(m.renderingMetadata, o, q + 1);
            }
            if (m.botMetricsMetadata != null && $Object.hasOwnProperty.call(m, "botMetricsMetadata")) {
                d.botMetricsMetadata = $root.BotMetadata.BotMetricsMetadata.toObject(m.botMetricsMetadata, o, q + 1);
            }
            if (m.botLinkedAccountsMetadata != null && $Object.hasOwnProperty.call(m, "botLinkedAccountsMetadata")) {
                d.botLinkedAccountsMetadata = $root.BotMetadata.BotLinkedAccountsMetadata.toObject(m.botLinkedAccountsMetadata, o, q + 1);
            }
            if (m.richResponseSourcesMetadata != null && $Object.hasOwnProperty.call(m, "richResponseSourcesMetadata")) {
                d.richResponseSourcesMetadata = $root.BotMetadata.BotSourcesMetadata.toObject(m.richResponseSourcesMetadata, o, q + 1);
            }
            if (m.aiConversationContext != null && $Object.hasOwnProperty.call(m, "aiConversationContext")) {
                d.aiConversationContext = o.bytes === $String ? $util.base64.encode(m.aiConversationContext, 0, m.aiConversationContext.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.aiConversationContext) : m.aiConversationContext;
            }
            if (m.botPromotionMessageMetadata != null && $Object.hasOwnProperty.call(m, "botPromotionMessageMetadata")) {
                d.botPromotionMessageMetadata = $root.BotMetadata.BotPromotionMessageMetadata.toObject(m.botPromotionMessageMetadata, o, q + 1);
            }
            if (m.botModeSelectionMetadata != null && $Object.hasOwnProperty.call(m, "botModeSelectionMetadata")) {
                d.botModeSelectionMetadata = $root.BotMetadata.BotModeSelectionMetadata.toObject(m.botModeSelectionMetadata, o, q + 1);
            }
            if (m.botQuotaMetadata != null && $Object.hasOwnProperty.call(m, "botQuotaMetadata")) {
                d.botQuotaMetadata = $root.BotMetadata.BotQuotaMetadata.toObject(m.botQuotaMetadata, o, q + 1);
            }
            if (m.botAgeCollectionMetadata != null && $Object.hasOwnProperty.call(m, "botAgeCollectionMetadata")) {
                d.botAgeCollectionMetadata = $root.BotMetadata.BotAgeCollectionMetadata.toObject(m.botAgeCollectionMetadata, o, q + 1);
            }
            if (m.conversationStarterPromptId != null && $Object.hasOwnProperty.call(m, "conversationStarterPromptId")) {
                d.conversationStarterPromptId = m.conversationStarterPromptId;
            }
            if (m.botResponseId != null && $Object.hasOwnProperty.call(m, "botResponseId")) {
                d.botResponseId = m.botResponseId;
            }
            if (m.verificationMetadata != null && $Object.hasOwnProperty.call(m, "verificationMetadata")) {
                d.verificationMetadata = $root.BotMetadata.BotSignatureVerificationMetadata.toObject(m.verificationMetadata, o, q + 1);
            }
            if (m.unifiedResponseMutation != null && $Object.hasOwnProperty.call(m, "unifiedResponseMutation")) {
                d.unifiedResponseMutation = $root.BotMetadata.BotUnifiedResponseMutation.toObject(m.unifiedResponseMutation, o, q + 1);
            }
            if (m.botMessageOriginMetadata != null && $Object.hasOwnProperty.call(m, "botMessageOriginMetadata")) {
                d.botMessageOriginMetadata = $root.BotMetadata.BotMessageOriginMetadata.toObject(m.botMessageOriginMetadata, o, q + 1);
            }
            if (m.inThreadSurveyMetadata != null && $Object.hasOwnProperty.call(m, "inThreadSurveyMetadata")) {
                d.inThreadSurveyMetadata = $root.BotMetadata.InThreadSurveyMetadata.toObject(m.inThreadSurveyMetadata, o, q + 1);
            }
            if (m.botThreadInfo != null && $Object.hasOwnProperty.call(m, "botThreadInfo")) {
                d.botThreadInfo = $root.BotMetadata.AIThreadInfo.toObject(m.botThreadInfo, o, q + 1);
            }
            return d;
        };

        BotMetadata.prototype.toJSON = function() {
            return BotMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMetadata";
        };

        return BotMetadata;
    })();

    BotMetadata.AIThreadInfo = (function() {

        const AIThreadInfo = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIThreadInfo.prototype.serverInfo = null;
        AIThreadInfo.prototype.clientInfo = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIThreadInfo.prototype, "_serverInfo", {
            get: $util.oneOfGetter($oneOfFields = ["serverInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIThreadInfo.prototype, "_clientInfo", {
            get: $util.oneOfGetter($oneOfFields = ["clientInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIThreadInfo.create = function(properties) {
            return new AIThreadInfo(properties);
        };

        AIThreadInfo.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.serverInfo != null && $Object.hasOwnProperty.call(m, "serverInfo"))
                $root.BotMetadata.AIThreadInfo.AIThreadServerInfo.encode(m.serverInfo, w.uint32(10).fork(), q + 1).ldelim();
            if (m.clientInfo != null && $Object.hasOwnProperty.call(m, "clientInfo"))
                $root.BotMetadata.AIThreadInfo.AIThreadClientInfo.encode(m.clientInfo, w.uint32(18).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIThreadInfo.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.AIThreadInfo();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.serverInfo = $root.BotMetadata.AIThreadInfo.AIThreadServerInfo.decode(r, r.uint32(), $undefined, q + 1, m.serverInfo);
                        m._serverInfo = "serverInfo";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.clientInfo = $root.BotMetadata.AIThreadInfo.AIThreadClientInfo.decode(r, r.uint32(), $undefined, q + 1, m.clientInfo);
                        m._clientInfo = "clientInfo";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        AIThreadInfo.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.AIThreadInfo)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.AIThreadInfo: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.AIThreadInfo();
            if (d.serverInfo != null) {
                if (!$util.isObject(d.serverInfo))
                    throw $TypeError(".BotMetadata.AIThreadInfo.serverInfo: object expected");
                m.serverInfo = $root.BotMetadata.AIThreadInfo.AIThreadServerInfo.fromObject(d.serverInfo, q + 1);
            }
            if (d.clientInfo != null) {
                if (!$util.isObject(d.clientInfo))
                    throw $TypeError(".BotMetadata.AIThreadInfo.clientInfo: object expected");
                m.clientInfo = $root.BotMetadata.AIThreadInfo.AIThreadClientInfo.fromObject(d.clientInfo, q + 1);
            }
            return m;
        };

        AIThreadInfo.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.serverInfo != null && $Object.hasOwnProperty.call(m, "serverInfo")) {
                d.serverInfo = $root.BotMetadata.AIThreadInfo.AIThreadServerInfo.toObject(m.serverInfo, o, q + 1);
            }
            if (m.clientInfo != null && $Object.hasOwnProperty.call(m, "clientInfo")) {
                d.clientInfo = $root.BotMetadata.AIThreadInfo.AIThreadClientInfo.toObject(m.clientInfo, o, q + 1);
            }
            return d;
        };

        AIThreadInfo.prototype.toJSON = function() {
            return AIThreadInfo.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIThreadInfo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.AIThreadInfo";
        };

        AIThreadInfo.AIThreadClientInfo = (function() {

            const AIThreadClientInfo = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIThreadClientInfo.prototype.type = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIThreadClientInfo.prototype, "_type", {
                get: $util.oneOfGetter($oneOfFields = ["type"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIThreadClientInfo.create = function(properties) {
                return new AIThreadClientInfo(properties);
            };

            AIThreadClientInfo.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                    w.uint32(8).int32(m.type);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIThreadClientInfo.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m, v;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.AIThreadInfo.AIThreadClientInfo();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 0)
                                break;
                            m.type = r.int32();
                            m._type = "type";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            AIThreadClientInfo.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.AIThreadInfo.AIThreadClientInfo)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.AIThreadInfo.AIThreadClientInfo: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.AIThreadInfo.AIThreadClientInfo();
                switch (d.type) {
                case "UNKNOWN":
                case 0:
                    m.type = 0;
                    break;
                case "DEFAULT":
                case 1:
                    m.type = 1;
                    break;
                case "INCOGNITO":
                case 2:
                    m.type = 2;
                    break;
                default:
                    if (typeof d.type === "number" && (d.type | 0) === d.type)
                        m.type = d.type;
                }
                return m;
            };

            AIThreadClientInfo.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                    d.type = o.enums === $String ? $root.BotMetadata.AIThreadInfo.AIThreadClientInfo.AIThreadType[m.type] === $undefined ? m.type : $root.BotMetadata.AIThreadInfo.AIThreadClientInfo.AIThreadType[m.type] : m.type;
                }
                return d;
            };

            AIThreadClientInfo.prototype.toJSON = function() {
                return AIThreadClientInfo.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIThreadClientInfo.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.AIThreadInfo.AIThreadClientInfo";
            };

            AIThreadClientInfo.AIThreadType = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "DEFAULT"] = 1;
                values[valuesById[2] = "INCOGNITO"] = 2;
                return values;
            })();

            return AIThreadClientInfo;
        })();

        AIThreadInfo.AIThreadServerInfo = (function() {

            const AIThreadServerInfo = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIThreadServerInfo.prototype.title = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIThreadServerInfo.prototype, "_title", {
                get: $util.oneOfGetter($oneOfFields = ["title"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIThreadServerInfo.create = function(properties) {
                return new AIThreadServerInfo(properties);
            };

            AIThreadServerInfo.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                    w.uint32(10).string(m.title);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIThreadServerInfo.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.AIThreadInfo.AIThreadServerInfo();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 2)
                                break;
                            m.title = r.stringVerify();
                            m._title = "title";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            AIThreadServerInfo.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.AIThreadInfo.AIThreadServerInfo)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.AIThreadInfo.AIThreadServerInfo: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.AIThreadInfo.AIThreadServerInfo();
                if (d.title != null) {
                    m.title = $String(d.title);
                }
                return m;
            };

            AIThreadServerInfo.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                    d.title = m.title;
                }
                return d;
            };

            AIThreadServerInfo.prototype.toJSON = function() {
                return AIThreadServerInfo.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIThreadServerInfo.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.AIThreadInfo.AIThreadServerInfo";
            };

            return AIThreadServerInfo;
        })();

        return AIThreadInfo;
    })();

    BotMetadata.BotUnifiedResponseMutation = (function() {

        const BotUnifiedResponseMutation = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotUnifiedResponseMutation.prototype.sbsMetadata = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotUnifiedResponseMutation.prototype, "_sbsMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["sbsMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotUnifiedResponseMutation.create = function(properties) {
            return new BotUnifiedResponseMutation(properties);
        };

        BotUnifiedResponseMutation.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sbsMetadata != null && $Object.hasOwnProperty.call(m, "sbsMetadata"))
                $root.BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.encode(m.sbsMetadata, w.uint32(10).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotUnifiedResponseMutation.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotUnifiedResponseMutation();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.sbsMetadata = $root.BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.decode(r, r.uint32(), $undefined, q + 1, m.sbsMetadata);
                        m._sbsMetadata = "sbsMetadata";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotUnifiedResponseMutation.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotUnifiedResponseMutation)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotUnifiedResponseMutation: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotUnifiedResponseMutation();
            if (d.sbsMetadata != null) {
                if (!$util.isObject(d.sbsMetadata))
                    throw $TypeError(".BotMetadata.BotUnifiedResponseMutation.sbsMetadata: object expected");
                m.sbsMetadata = $root.BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.fromObject(d.sbsMetadata, q + 1);
            }
            return m;
        };

        BotUnifiedResponseMutation.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.sbsMetadata != null && $Object.hasOwnProperty.call(m, "sbsMetadata")) {
                d.sbsMetadata = $root.BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata.toObject(m.sbsMetadata, o, q + 1);
            }
            return d;
        };

        BotUnifiedResponseMutation.prototype.toJSON = function() {
            return BotUnifiedResponseMutation.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotUnifiedResponseMutation.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotUnifiedResponseMutation";
        };

        BotUnifiedResponseMutation.SideBySideMetadata = (function() {

            const SideBySideMetadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            SideBySideMetadata.prototype.primaryResponseId = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideMetadata.prototype, "_primaryResponseId", {
                get: $util.oneOfGetter($oneOfFields = ["primaryResponseId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            SideBySideMetadata.create = function(properties) {
                return new SideBySideMetadata(properties);
            };

            SideBySideMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.primaryResponseId != null && $Object.hasOwnProperty.call(m, "primaryResponseId"))
                    w.uint32(10).string(m.primaryResponseId);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            SideBySideMetadata.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 2)
                                break;
                            m.primaryResponseId = r.stringVerify();
                            m._primaryResponseId = "primaryResponseId";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            SideBySideMetadata.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata();
                if (d.primaryResponseId != null) {
                    m.primaryResponseId = $String(d.primaryResponseId);
                }
                return m;
            };

            SideBySideMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.primaryResponseId != null && $Object.hasOwnProperty.call(m, "primaryResponseId")) {
                    d.primaryResponseId = m.primaryResponseId;
                }
                return d;
            };

            SideBySideMetadata.prototype.toJSON = function() {
                return SideBySideMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            SideBySideMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.BotUnifiedResponseMutation.SideBySideMetadata";
            };

            return SideBySideMetadata;
        })();

        return BotUnifiedResponseMutation;
    })();

    BotMetadata.BotMessageOrigin = (function() {

        const BotMessageOrigin = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMessageOrigin.prototype.type = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMessageOrigin.prototype, "_type", {
            get: $util.oneOfGetter($oneOfFields = ["type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMessageOrigin.create = function(properties) {
            return new BotMessageOrigin(properties);
        };

        BotMessageOrigin.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                w.uint32(8).int32(m.type);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMessageOrigin.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMessageOrigin();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.type = r.int32();
                        m._type = "type";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMessageOrigin.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMessageOrigin)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMessageOrigin: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMessageOrigin();
            switch (d.type) {
            case "BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED":
            case 0:
                m.type = 0;
                break;
            default:
                if (typeof d.type === "number" && (d.type | 0) === d.type)
                    m.type = d.type;
            }
            return m;
        };

        BotMessageOrigin.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                d.type = o.enums === $String ? $root.BotMetadata.BotMessageOrigin.BotMessageOriginType[m.type] === $undefined ? m.type : $root.BotMetadata.BotMessageOrigin.BotMessageOriginType[m.type] : m.type;
            }
            return d;
        };

        BotMessageOrigin.prototype.toJSON = function() {
            return BotMessageOrigin.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMessageOrigin.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMessageOrigin";
        };

        BotMessageOrigin.BotMessageOriginType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED"] = 0;
            return values;
        })();

        return BotMessageOrigin;
    })();

    BotMetadata.BotMessageOriginMetadata = (function() {

        const BotMessageOriginMetadata = function (p) {
            this.origins = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMessageOriginMetadata.prototype.origins = $util.emptyArray;

        BotMessageOriginMetadata.create = function(properties) {
            return new BotMessageOriginMetadata(properties);
        };

        BotMessageOriginMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.origins != null && m.origins.length) {
                for (var i = 0; i < m.origins.length; ++i)
                    $root.BotMetadata.BotMessageOrigin.encode(m.origins[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMessageOriginMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMessageOriginMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.origins && m.origins.length))
                            m.origins = [];
                        m.origins.push($root.BotMetadata.BotMessageOrigin.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMessageOriginMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMessageOriginMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMessageOriginMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMessageOriginMetadata();
            if (d.origins) {
                if (!$Array.isArray(d.origins))
                    throw $TypeError(".BotMetadata.BotMessageOriginMetadata.origins: array expected");
                m.origins = $Array(d.origins.length);
                for (var i = 0; i < d.origins.length; ++i) {
                    if (!$util.isObject(d.origins[i]))
                        throw $TypeError(".BotMetadata.BotMessageOriginMetadata.origins: object expected");
                    m.origins[i] = $root.BotMetadata.BotMessageOrigin.fromObject(d.origins[i], q + 1);
                }
            }
            return m;
        };

        BotMessageOriginMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.origins = [];
            }
            if (m.origins && m.origins.length) {
                d.origins = $Array(m.origins.length);
                for (var j = 0; j < m.origins.length; ++j) {
                    d.origins[j] = $root.BotMetadata.BotMessageOrigin.toObject(m.origins[j], o, q + 1);
                }
            }
            return d;
        };

        BotMessageOriginMetadata.prototype.toJSON = function() {
            return BotMessageOriginMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMessageOriginMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMessageOriginMetadata";
        };

        return BotMessageOriginMetadata;
    })();

    BotMetadata.InThreadSurveyMetadata = (function() {

        const InThreadSurveyMetadata = function (p) {
            this.questions = [];
            this.privacyStatementParts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        InThreadSurveyMetadata.prototype.tessaSessionId = null;
        InThreadSurveyMetadata.prototype.simonSessionId = null;
        InThreadSurveyMetadata.prototype.simonSurveyId = null;
        InThreadSurveyMetadata.prototype.tessaRootId = null;
        InThreadSurveyMetadata.prototype.requestId = null;
        InThreadSurveyMetadata.prototype.tessaEvent = null;
        InThreadSurveyMetadata.prototype.invitationHeaderText = null;
        InThreadSurveyMetadata.prototype.invitationBodyText = null;
        InThreadSurveyMetadata.prototype.invitationCtaText = null;
        InThreadSurveyMetadata.prototype.invitationCtaUrl = null;
        InThreadSurveyMetadata.prototype.surveyTitle = null;
        InThreadSurveyMetadata.prototype.questions = $util.emptyArray;
        InThreadSurveyMetadata.prototype.surveyContinueButtonText = null;
        InThreadSurveyMetadata.prototype.surveySubmitButtonText = null;
        InThreadSurveyMetadata.prototype.privacyStatementFull = null;
        InThreadSurveyMetadata.prototype.privacyStatementParts = $util.emptyArray;
        InThreadSurveyMetadata.prototype.feedbackToastText = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaSessionId", {
            get: $util.oneOfGetter($oneOfFields = ["tessaSessionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_simonSessionId", {
            get: $util.oneOfGetter($oneOfFields = ["simonSessionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_simonSurveyId", {
            get: $util.oneOfGetter($oneOfFields = ["simonSurveyId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaRootId", {
            get: $util.oneOfGetter($oneOfFields = ["tessaRootId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_requestId", {
            get: $util.oneOfGetter($oneOfFields = ["requestId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaEvent", {
            get: $util.oneOfGetter($oneOfFields = ["tessaEvent"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationHeaderText", {
            get: $util.oneOfGetter($oneOfFields = ["invitationHeaderText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationBodyText", {
            get: $util.oneOfGetter($oneOfFields = ["invitationBodyText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationCtaText", {
            get: $util.oneOfGetter($oneOfFields = ["invitationCtaText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationCtaUrl", {
            get: $util.oneOfGetter($oneOfFields = ["invitationCtaUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveyTitle", {
            get: $util.oneOfGetter($oneOfFields = ["surveyTitle"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveyContinueButtonText", {
            get: $util.oneOfGetter($oneOfFields = ["surveyContinueButtonText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveySubmitButtonText", {
            get: $util.oneOfGetter($oneOfFields = ["surveySubmitButtonText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_privacyStatementFull", {
            get: $util.oneOfGetter($oneOfFields = ["privacyStatementFull"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_feedbackToastText", {
            get: $util.oneOfGetter($oneOfFields = ["feedbackToastText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        InThreadSurveyMetadata.create = function(properties) {
            return new InThreadSurveyMetadata(properties);
        };

        InThreadSurveyMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.tessaSessionId != null && $Object.hasOwnProperty.call(m, "tessaSessionId"))
                w.uint32(10).string(m.tessaSessionId);
            if (m.simonSessionId != null && $Object.hasOwnProperty.call(m, "simonSessionId"))
                w.uint32(18).string(m.simonSessionId);
            if (m.simonSurveyId != null && $Object.hasOwnProperty.call(m, "simonSurveyId"))
                w.uint32(26).string(m.simonSurveyId);
            if (m.tessaRootId != null && $Object.hasOwnProperty.call(m, "tessaRootId"))
                w.uint32(34).string(m.tessaRootId);
            if (m.requestId != null && $Object.hasOwnProperty.call(m, "requestId"))
                w.uint32(42).string(m.requestId);
            if (m.tessaEvent != null && $Object.hasOwnProperty.call(m, "tessaEvent"))
                w.uint32(50).string(m.tessaEvent);
            if (m.invitationHeaderText != null && $Object.hasOwnProperty.call(m, "invitationHeaderText"))
                w.uint32(58).string(m.invitationHeaderText);
            if (m.invitationBodyText != null && $Object.hasOwnProperty.call(m, "invitationBodyText"))
                w.uint32(66).string(m.invitationBodyText);
            if (m.invitationCtaText != null && $Object.hasOwnProperty.call(m, "invitationCtaText"))
                w.uint32(74).string(m.invitationCtaText);
            if (m.invitationCtaUrl != null && $Object.hasOwnProperty.call(m, "invitationCtaUrl"))
                w.uint32(82).string(m.invitationCtaUrl);
            if (m.surveyTitle != null && $Object.hasOwnProperty.call(m, "surveyTitle"))
                w.uint32(90).string(m.surveyTitle);
            if (m.questions != null && m.questions.length) {
                for (var i = 0; i < m.questions.length; ++i)
                    $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.encode(m.questions[i], w.uint32(98).fork(), q + 1).ldelim();
            }
            if (m.surveyContinueButtonText != null && $Object.hasOwnProperty.call(m, "surveyContinueButtonText"))
                w.uint32(106).string(m.surveyContinueButtonText);
            if (m.surveySubmitButtonText != null && $Object.hasOwnProperty.call(m, "surveySubmitButtonText"))
                w.uint32(114).string(m.surveySubmitButtonText);
            if (m.privacyStatementFull != null && $Object.hasOwnProperty.call(m, "privacyStatementFull"))
                w.uint32(122).string(m.privacyStatementFull);
            if (m.privacyStatementParts != null && m.privacyStatementParts.length) {
                for (var i = 0; i < m.privacyStatementParts.length; ++i)
                    $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.encode(m.privacyStatementParts[i], w.uint32(130).fork(), q + 1).ldelim();
            }
            if (m.feedbackToastText != null && $Object.hasOwnProperty.call(m, "feedbackToastText"))
                w.uint32(138).string(m.feedbackToastText);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        InThreadSurveyMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.InThreadSurveyMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.tessaSessionId = r.stringVerify();
                        m._tessaSessionId = "tessaSessionId";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.simonSessionId = r.stringVerify();
                        m._simonSessionId = "simonSessionId";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.simonSurveyId = r.stringVerify();
                        m._simonSurveyId = "simonSurveyId";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.tessaRootId = r.stringVerify();
                        m._tessaRootId = "tessaRootId";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.requestId = r.stringVerify();
                        m._requestId = "requestId";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.tessaEvent = r.stringVerify();
                        m._tessaEvent = "tessaEvent";
                        continue;
                    }
                case 7: {
                        if (u !== 2)
                            break;
                        m.invitationHeaderText = r.stringVerify();
                        m._invitationHeaderText = "invitationHeaderText";
                        continue;
                    }
                case 8: {
                        if (u !== 2)
                            break;
                        m.invitationBodyText = r.stringVerify();
                        m._invitationBodyText = "invitationBodyText";
                        continue;
                    }
                case 9: {
                        if (u !== 2)
                            break;
                        m.invitationCtaText = r.stringVerify();
                        m._invitationCtaText = "invitationCtaText";
                        continue;
                    }
                case 10: {
                        if (u !== 2)
                            break;
                        m.invitationCtaUrl = r.stringVerify();
                        m._invitationCtaUrl = "invitationCtaUrl";
                        continue;
                    }
                case 11: {
                        if (u !== 2)
                            break;
                        m.surveyTitle = r.stringVerify();
                        m._surveyTitle = "surveyTitle";
                        continue;
                    }
                case 12: {
                        if (u !== 2)
                            break;
                        if (!(m.questions && m.questions.length))
                            m.questions = [];
                        m.questions.push($root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 13: {
                        if (u !== 2)
                            break;
                        m.surveyContinueButtonText = r.stringVerify();
                        m._surveyContinueButtonText = "surveyContinueButtonText";
                        continue;
                    }
                case 14: {
                        if (u !== 2)
                            break;
                        m.surveySubmitButtonText = r.stringVerify();
                        m._surveySubmitButtonText = "surveySubmitButtonText";
                        continue;
                    }
                case 15: {
                        if (u !== 2)
                            break;
                        m.privacyStatementFull = r.stringVerify();
                        m._privacyStatementFull = "privacyStatementFull";
                        continue;
                    }
                case 16: {
                        if (u !== 2)
                            break;
                        if (!(m.privacyStatementParts && m.privacyStatementParts.length))
                            m.privacyStatementParts = [];
                        m.privacyStatementParts.push($root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 17: {
                        if (u !== 2)
                            break;
                        m.feedbackToastText = r.stringVerify();
                        m._feedbackToastText = "feedbackToastText";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        InThreadSurveyMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.InThreadSurveyMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.InThreadSurveyMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.InThreadSurveyMetadata();
            if (d.tessaSessionId != null) {
                m.tessaSessionId = $String(d.tessaSessionId);
            }
            if (d.simonSessionId != null) {
                m.simonSessionId = $String(d.simonSessionId);
            }
            if (d.simonSurveyId != null) {
                m.simonSurveyId = $String(d.simonSurveyId);
            }
            if (d.tessaRootId != null) {
                m.tessaRootId = $String(d.tessaRootId);
            }
            if (d.requestId != null) {
                m.requestId = $String(d.requestId);
            }
            if (d.tessaEvent != null) {
                m.tessaEvent = $String(d.tessaEvent);
            }
            if (d.invitationHeaderText != null) {
                m.invitationHeaderText = $String(d.invitationHeaderText);
            }
            if (d.invitationBodyText != null) {
                m.invitationBodyText = $String(d.invitationBodyText);
            }
            if (d.invitationCtaText != null) {
                m.invitationCtaText = $String(d.invitationCtaText);
            }
            if (d.invitationCtaUrl != null) {
                m.invitationCtaUrl = $String(d.invitationCtaUrl);
            }
            if (d.surveyTitle != null) {
                m.surveyTitle = $String(d.surveyTitle);
            }
            if (d.questions) {
                if (!$Array.isArray(d.questions))
                    throw $TypeError(".BotMetadata.InThreadSurveyMetadata.questions: array expected");
                m.questions = $Array(d.questions.length);
                for (var i = 0; i < d.questions.length; ++i) {
                    if (!$util.isObject(d.questions[i]))
                        throw $TypeError(".BotMetadata.InThreadSurveyMetadata.questions: object expected");
                    m.questions[i] = $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.fromObject(d.questions[i], q + 1);
                }
            }
            if (d.surveyContinueButtonText != null) {
                m.surveyContinueButtonText = $String(d.surveyContinueButtonText);
            }
            if (d.surveySubmitButtonText != null) {
                m.surveySubmitButtonText = $String(d.surveySubmitButtonText);
            }
            if (d.privacyStatementFull != null) {
                m.privacyStatementFull = $String(d.privacyStatementFull);
            }
            if (d.privacyStatementParts) {
                if (!$Array.isArray(d.privacyStatementParts))
                    throw $TypeError(".BotMetadata.InThreadSurveyMetadata.privacyStatementParts: array expected");
                m.privacyStatementParts = $Array(d.privacyStatementParts.length);
                for (var i = 0; i < d.privacyStatementParts.length; ++i) {
                    if (!$util.isObject(d.privacyStatementParts[i]))
                        throw $TypeError(".BotMetadata.InThreadSurveyMetadata.privacyStatementParts: object expected");
                    m.privacyStatementParts[i] = $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.fromObject(d.privacyStatementParts[i], q + 1);
                }
            }
            if (d.feedbackToastText != null) {
                m.feedbackToastText = $String(d.feedbackToastText);
            }
            return m;
        };

        InThreadSurveyMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.questions = [];
                d.privacyStatementParts = [];
            }
            if (m.tessaSessionId != null && $Object.hasOwnProperty.call(m, "tessaSessionId")) {
                d.tessaSessionId = m.tessaSessionId;
            }
            if (m.simonSessionId != null && $Object.hasOwnProperty.call(m, "simonSessionId")) {
                d.simonSessionId = m.simonSessionId;
            }
            if (m.simonSurveyId != null && $Object.hasOwnProperty.call(m, "simonSurveyId")) {
                d.simonSurveyId = m.simonSurveyId;
            }
            if (m.tessaRootId != null && $Object.hasOwnProperty.call(m, "tessaRootId")) {
                d.tessaRootId = m.tessaRootId;
            }
            if (m.requestId != null && $Object.hasOwnProperty.call(m, "requestId")) {
                d.requestId = m.requestId;
            }
            if (m.tessaEvent != null && $Object.hasOwnProperty.call(m, "tessaEvent")) {
                d.tessaEvent = m.tessaEvent;
            }
            if (m.invitationHeaderText != null && $Object.hasOwnProperty.call(m, "invitationHeaderText")) {
                d.invitationHeaderText = m.invitationHeaderText;
            }
            if (m.invitationBodyText != null && $Object.hasOwnProperty.call(m, "invitationBodyText")) {
                d.invitationBodyText = m.invitationBodyText;
            }
            if (m.invitationCtaText != null && $Object.hasOwnProperty.call(m, "invitationCtaText")) {
                d.invitationCtaText = m.invitationCtaText;
            }
            if (m.invitationCtaUrl != null && $Object.hasOwnProperty.call(m, "invitationCtaUrl")) {
                d.invitationCtaUrl = m.invitationCtaUrl;
            }
            if (m.surveyTitle != null && $Object.hasOwnProperty.call(m, "surveyTitle")) {
                d.surveyTitle = m.surveyTitle;
            }
            if (m.questions && m.questions.length) {
                d.questions = $Array(m.questions.length);
                for (var j = 0; j < m.questions.length; ++j) {
                    d.questions[j] = $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.toObject(m.questions[j], o, q + 1);
                }
            }
            if (m.surveyContinueButtonText != null && $Object.hasOwnProperty.call(m, "surveyContinueButtonText")) {
                d.surveyContinueButtonText = m.surveyContinueButtonText;
            }
            if (m.surveySubmitButtonText != null && $Object.hasOwnProperty.call(m, "surveySubmitButtonText")) {
                d.surveySubmitButtonText = m.surveySubmitButtonText;
            }
            if (m.privacyStatementFull != null && $Object.hasOwnProperty.call(m, "privacyStatementFull")) {
                d.privacyStatementFull = m.privacyStatementFull;
            }
            if (m.privacyStatementParts && m.privacyStatementParts.length) {
                d.privacyStatementParts = $Array(m.privacyStatementParts.length);
                for (var j = 0; j < m.privacyStatementParts.length; ++j) {
                    d.privacyStatementParts[j] = $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.toObject(m.privacyStatementParts[j], o, q + 1);
                }
            }
            if (m.feedbackToastText != null && $Object.hasOwnProperty.call(m, "feedbackToastText")) {
                d.feedbackToastText = m.feedbackToastText;
            }
            return d;
        };

        InThreadSurveyMetadata.prototype.toJSON = function() {
            return InThreadSurveyMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        InThreadSurveyMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.InThreadSurveyMetadata";
        };

        InThreadSurveyMetadata.InThreadSurveyOption = (function() {

            const InThreadSurveyOption = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            InThreadSurveyOption.prototype.stringValue = null;
            InThreadSurveyOption.prototype.numericValue = null;
            InThreadSurveyOption.prototype.textTranslated = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyOption.prototype, "_stringValue", {
                get: $util.oneOfGetter($oneOfFields = ["stringValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyOption.prototype, "_numericValue", {
                get: $util.oneOfGetter($oneOfFields = ["numericValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyOption.prototype, "_textTranslated", {
                get: $util.oneOfGetter($oneOfFields = ["textTranslated"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            InThreadSurveyOption.create = function(properties) {
                return new InThreadSurveyOption(properties);
            };

            InThreadSurveyOption.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.stringValue != null && $Object.hasOwnProperty.call(m, "stringValue"))
                    w.uint32(10).string(m.stringValue);
                if (m.numericValue != null && $Object.hasOwnProperty.call(m, "numericValue"))
                    w.uint32(16).uint32(m.numericValue);
                if (m.textTranslated != null && $Object.hasOwnProperty.call(m, "textTranslated"))
                    w.uint32(26).string(m.textTranslated);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            InThreadSurveyOption.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 2)
                                break;
                            m.stringValue = r.stringVerify();
                            m._stringValue = "stringValue";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.numericValue = r.uint32();
                            m._numericValue = "numericValue";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.textTranslated = r.stringVerify();
                            m._textTranslated = "textTranslated";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            InThreadSurveyOption.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption();
                if (d.stringValue != null) {
                    m.stringValue = $String(d.stringValue);
                }
                if (d.numericValue != null) {
                    m.numericValue = d.numericValue >>> 0;
                }
                if (d.textTranslated != null) {
                    m.textTranslated = $String(d.textTranslated);
                }
                return m;
            };

            InThreadSurveyOption.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.stringValue != null && $Object.hasOwnProperty.call(m, "stringValue")) {
                    d.stringValue = m.stringValue;
                }
                if (m.numericValue != null && $Object.hasOwnProperty.call(m, "numericValue")) {
                    d.numericValue = m.numericValue;
                }
                if (m.textTranslated != null && $Object.hasOwnProperty.call(m, "textTranslated")) {
                    d.textTranslated = m.textTranslated;
                }
                return d;
            };

            InThreadSurveyOption.prototype.toJSON = function() {
                return InThreadSurveyOption.toObject(this, $protobuf.util.toJSONOptions);
            };

            InThreadSurveyOption.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption";
            };

            return InThreadSurveyOption;
        })();

        InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart = (function() {

            const InThreadSurveyPrivacyStatementPart = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            InThreadSurveyPrivacyStatementPart.prototype.text = null;
            InThreadSurveyPrivacyStatementPart.prototype.url = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyPrivacyStatementPart.prototype, "_text", {
                get: $util.oneOfGetter($oneOfFields = ["text"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyPrivacyStatementPart.prototype, "_url", {
                get: $util.oneOfGetter($oneOfFields = ["url"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            InThreadSurveyPrivacyStatementPart.create = function(properties) {
                return new InThreadSurveyPrivacyStatementPart(properties);
            };

            InThreadSurveyPrivacyStatementPart.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.text != null && $Object.hasOwnProperty.call(m, "text"))
                    w.uint32(10).string(m.text);
                if (m.url != null && $Object.hasOwnProperty.call(m, "url"))
                    w.uint32(18).string(m.url);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            InThreadSurveyPrivacyStatementPart.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 2)
                                break;
                            m.text = r.stringVerify();
                            m._text = "text";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.url = r.stringVerify();
                            m._url = "url";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            InThreadSurveyPrivacyStatementPart.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart();
                if (d.text != null) {
                    m.text = $String(d.text);
                }
                if (d.url != null) {
                    m.url = $String(d.url);
                }
                return m;
            };

            InThreadSurveyPrivacyStatementPart.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.text != null && $Object.hasOwnProperty.call(m, "text")) {
                    d.text = m.text;
                }
                if (m.url != null && $Object.hasOwnProperty.call(m, "url")) {
                    d.url = m.url;
                }
                return d;
            };

            InThreadSurveyPrivacyStatementPart.prototype.toJSON = function() {
                return InThreadSurveyPrivacyStatementPart.toObject(this, $protobuf.util.toJSONOptions);
            };

            InThreadSurveyPrivacyStatementPart.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart";
            };

            return InThreadSurveyPrivacyStatementPart;
        })();

        InThreadSurveyMetadata.InThreadSurveyQuestion = (function() {

            const InThreadSurveyQuestion = function (p) {
                this.questionOptions = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            InThreadSurveyQuestion.prototype.questionText = null;
            InThreadSurveyQuestion.prototype.questionId = null;
            InThreadSurveyQuestion.prototype.questionOptions = $util.emptyArray;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyQuestion.prototype, "_questionText", {
                get: $util.oneOfGetter($oneOfFields = ["questionText"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyQuestion.prototype, "_questionId", {
                get: $util.oneOfGetter($oneOfFields = ["questionId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            InThreadSurveyQuestion.create = function(properties) {
                return new InThreadSurveyQuestion(properties);
            };

            InThreadSurveyQuestion.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.questionText != null && $Object.hasOwnProperty.call(m, "questionText"))
                    w.uint32(10).string(m.questionText);
                if (m.questionId != null && $Object.hasOwnProperty.call(m, "questionId"))
                    w.uint32(18).string(m.questionId);
                if (m.questionOptions != null && m.questionOptions.length) {
                    for (var i = 0; i < m.questionOptions.length; ++i)
                        $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.encode(m.questionOptions[i], w.uint32(26).fork(), q + 1).ldelim();
                }
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            InThreadSurveyQuestion.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 2)
                                break;
                            m.questionText = r.stringVerify();
                            m._questionText = "questionText";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.questionId = r.stringVerify();
                            m._questionId = "questionId";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            if (!(m.questionOptions && m.questionOptions.length))
                                m.questionOptions = [];
                            m.questionOptions.push($root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.decode(r, r.uint32(), $undefined, q + 1));
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            InThreadSurveyQuestion.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion();
                if (d.questionText != null) {
                    m.questionText = $String(d.questionText);
                }
                if (d.questionId != null) {
                    m.questionId = $String(d.questionId);
                }
                if (d.questionOptions) {
                    if (!$Array.isArray(d.questionOptions))
                        throw $TypeError(".BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.questionOptions: array expected");
                    m.questionOptions = $Array(d.questionOptions.length);
                    for (var i = 0; i < d.questionOptions.length; ++i) {
                        if (!$util.isObject(d.questionOptions[i]))
                            throw $TypeError(".BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion.questionOptions: object expected");
                        m.questionOptions[i] = $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.fromObject(d.questionOptions[i], q + 1);
                    }
                }
                return m;
            };

            InThreadSurveyQuestion.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.questionOptions = [];
                }
                if (m.questionText != null && $Object.hasOwnProperty.call(m, "questionText")) {
                    d.questionText = m.questionText;
                }
                if (m.questionId != null && $Object.hasOwnProperty.call(m, "questionId")) {
                    d.questionId = m.questionId;
                }
                if (m.questionOptions && m.questionOptions.length) {
                    d.questionOptions = $Array(m.questionOptions.length);
                    for (var j = 0; j < m.questionOptions.length; ++j) {
                        d.questionOptions[j] = $root.BotMetadata.InThreadSurveyMetadata.InThreadSurveyOption.toObject(m.questionOptions[j], o, q + 1);
                    }
                }
                return d;
            };

            InThreadSurveyQuestion.prototype.toJSON = function() {
                return InThreadSurveyQuestion.toObject(this, $protobuf.util.toJSONOptions);
            };

            InThreadSurveyQuestion.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.InThreadSurveyMetadata.InThreadSurveyQuestion";
            };

            return InThreadSurveyQuestion;
        })();

        return InThreadSurveyMetadata;
    })();

    BotMetadata.BotSourcesMetadata = (function() {

        const BotSourcesMetadata = function (p) {
            this.sources = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSourcesMetadata.prototype.sources = $util.emptyArray;

        BotSourcesMetadata.create = function(properties) {
            return new BotSourcesMetadata(properties);
        };

        BotSourcesMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sources != null && m.sources.length) {
                for (var i = 0; i < m.sources.length; ++i)
                    $root.BotMetadata.BotSourcesMetadata.BotSourceItem.encode(m.sources[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSourcesMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotSourcesMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.sources && m.sources.length))
                            m.sources = [];
                        m.sources.push($root.BotMetadata.BotSourcesMetadata.BotSourceItem.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotSourcesMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotSourcesMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotSourcesMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotSourcesMetadata();
            if (d.sources) {
                if (!$Array.isArray(d.sources))
                    throw $TypeError(".BotMetadata.BotSourcesMetadata.sources: array expected");
                m.sources = $Array(d.sources.length);
                for (var i = 0; i < d.sources.length; ++i) {
                    if (!$util.isObject(d.sources[i]))
                        throw $TypeError(".BotMetadata.BotSourcesMetadata.sources: object expected");
                    m.sources[i] = $root.BotMetadata.BotSourcesMetadata.BotSourceItem.fromObject(d.sources[i], q + 1);
                }
            }
            return m;
        };

        BotSourcesMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.sources = [];
            }
            if (m.sources && m.sources.length) {
                d.sources = $Array(m.sources.length);
                for (var j = 0; j < m.sources.length; ++j) {
                    d.sources[j] = $root.BotMetadata.BotSourcesMetadata.BotSourceItem.toObject(m.sources[j], o, q + 1);
                }
            }
            return d;
        };

        BotSourcesMetadata.prototype.toJSON = function() {
            return BotSourcesMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSourcesMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotSourcesMetadata";
        };

        BotSourcesMetadata.BotSourceItem = (function() {

            const BotSourceItem = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            BotSourceItem.prototype.provider = null;
            BotSourceItem.prototype.thumbnailCdnUrl = null;
            BotSourceItem.prototype.sourceProviderUrl = null;
            BotSourceItem.prototype.sourceQuery = null;
            BotSourceItem.prototype.faviconCdnUrl = null;
            BotSourceItem.prototype.citationNumber = null;
            BotSourceItem.prototype.sourceTitle = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_provider", {
                get: $util.oneOfGetter($oneOfFields = ["provider"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_thumbnailCdnUrl", {
                get: $util.oneOfGetter($oneOfFields = ["thumbnailCdnUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_sourceProviderUrl", {
                get: $util.oneOfGetter($oneOfFields = ["sourceProviderUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_sourceQuery", {
                get: $util.oneOfGetter($oneOfFields = ["sourceQuery"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_faviconCdnUrl", {
                get: $util.oneOfGetter($oneOfFields = ["faviconCdnUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_citationNumber", {
                get: $util.oneOfGetter($oneOfFields = ["citationNumber"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_sourceTitle", {
                get: $util.oneOfGetter($oneOfFields = ["sourceTitle"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            BotSourceItem.create = function(properties) {
                return new BotSourceItem(properties);
            };

            BotSourceItem.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                    w.uint32(8).int32(m.provider);
                if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl"))
                    w.uint32(18).string(m.thumbnailCdnUrl);
                if (m.sourceProviderUrl != null && $Object.hasOwnProperty.call(m, "sourceProviderUrl"))
                    w.uint32(26).string(m.sourceProviderUrl);
                if (m.sourceQuery != null && $Object.hasOwnProperty.call(m, "sourceQuery"))
                    w.uint32(34).string(m.sourceQuery);
                if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl"))
                    w.uint32(42).string(m.faviconCdnUrl);
                if (m.citationNumber != null && $Object.hasOwnProperty.call(m, "citationNumber"))
                    w.uint32(48).uint32(m.citationNumber);
                if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle"))
                    w.uint32(58).string(m.sourceTitle);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            BotSourceItem.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m, v;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.BotSourcesMetadata.BotSourceItem();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 0)
                                break;
                            m.provider = r.int32();
                            m._provider = "provider";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.thumbnailCdnUrl = r.stringVerify();
                            m._thumbnailCdnUrl = "thumbnailCdnUrl";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.sourceProviderUrl = r.stringVerify();
                            m._sourceProviderUrl = "sourceProviderUrl";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.sourceQuery = r.stringVerify();
                            m._sourceQuery = "sourceQuery";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.faviconCdnUrl = r.stringVerify();
                            m._faviconCdnUrl = "faviconCdnUrl";
                            continue;
                        }
                    case 6: {
                            if (u !== 0)
                                break;
                            m.citationNumber = r.uint32();
                            m._citationNumber = "citationNumber";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            m.sourceTitle = r.stringVerify();
                            m._sourceTitle = "sourceTitle";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            BotSourceItem.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.BotSourcesMetadata.BotSourceItem)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.BotSourcesMetadata.BotSourceItem: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.BotSourcesMetadata.BotSourceItem();
                switch (d.provider) {
                case "UNKNOWN":
                case 0:
                    m.provider = 0;
                    break;
                case "BING":
                case 1:
                    m.provider = 1;
                    break;
                case "GOOGLE":
                case 2:
                    m.provider = 2;
                    break;
                case "SUPPORT":
                case 3:
                    m.provider = 3;
                    break;
                case "OTHER":
                case 4:
                    m.provider = 4;
                    break;
                default:
                    if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                        m.provider = d.provider;
                }
                if (d.thumbnailCdnUrl != null) {
                    m.thumbnailCdnUrl = $String(d.thumbnailCdnUrl);
                }
                if (d.sourceProviderUrl != null) {
                    m.sourceProviderUrl = $String(d.sourceProviderUrl);
                }
                if (d.sourceQuery != null) {
                    m.sourceQuery = $String(d.sourceQuery);
                }
                if (d.faviconCdnUrl != null) {
                    m.faviconCdnUrl = $String(d.faviconCdnUrl);
                }
                if (d.citationNumber != null) {
                    m.citationNumber = d.citationNumber >>> 0;
                }
                if (d.sourceTitle != null) {
                    m.sourceTitle = $String(d.sourceTitle);
                }
                return m;
            };

            BotSourceItem.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                    d.provider = o.enums === $String ? $root.BotMetadata.BotSourcesMetadata.BotSourceItem.SourceProvider[m.provider] === $undefined ? m.provider : $root.BotMetadata.BotSourcesMetadata.BotSourceItem.SourceProvider[m.provider] : m.provider;
                }
                if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl")) {
                    d.thumbnailCdnUrl = m.thumbnailCdnUrl;
                }
                if (m.sourceProviderUrl != null && $Object.hasOwnProperty.call(m, "sourceProviderUrl")) {
                    d.sourceProviderUrl = m.sourceProviderUrl;
                }
                if (m.sourceQuery != null && $Object.hasOwnProperty.call(m, "sourceQuery")) {
                    d.sourceQuery = m.sourceQuery;
                }
                if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl")) {
                    d.faviconCdnUrl = m.faviconCdnUrl;
                }
                if (m.citationNumber != null && $Object.hasOwnProperty.call(m, "citationNumber")) {
                    d.citationNumber = m.citationNumber;
                }
                if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle")) {
                    d.sourceTitle = m.sourceTitle;
                }
                return d;
            };

            BotSourceItem.prototype.toJSON = function() {
                return BotSourceItem.toObject(this, $protobuf.util.toJSONOptions);
            };

            BotSourceItem.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.BotSourcesMetadata.BotSourceItem";
            };

            BotSourceItem.SourceProvider = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "BING"] = 1;
                values[valuesById[2] = "GOOGLE"] = 2;
                values[valuesById[3] = "SUPPORT"] = 3;
                values[valuesById[4] = "OTHER"] = 4;
                return values;
            })();

            return BotSourceItem;
        })();

        return BotSourcesMetadata;
    })();

    BotMetadata.BotAgeCollectionMetadata = (function() {

        const BotAgeCollectionMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotAgeCollectionMetadata.prototype.ageCollectionEligible = null;
        BotAgeCollectionMetadata.prototype.shouldTriggerAgeCollectionOnClient = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgeCollectionMetadata.prototype, "_ageCollectionEligible", {
            get: $util.oneOfGetter($oneOfFields = ["ageCollectionEligible"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgeCollectionMetadata.prototype, "_shouldTriggerAgeCollectionOnClient", {
            get: $util.oneOfGetter($oneOfFields = ["shouldTriggerAgeCollectionOnClient"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotAgeCollectionMetadata.create = function(properties) {
            return new BotAgeCollectionMetadata(properties);
        };

        BotAgeCollectionMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.ageCollectionEligible != null && $Object.hasOwnProperty.call(m, "ageCollectionEligible"))
                w.uint32(8).bool(m.ageCollectionEligible);
            if (m.shouldTriggerAgeCollectionOnClient != null && $Object.hasOwnProperty.call(m, "shouldTriggerAgeCollectionOnClient"))
                w.uint32(16).bool(m.shouldTriggerAgeCollectionOnClient);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotAgeCollectionMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotAgeCollectionMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.ageCollectionEligible = r.bool();
                        m._ageCollectionEligible = "ageCollectionEligible";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.shouldTriggerAgeCollectionOnClient = r.bool();
                        m._shouldTriggerAgeCollectionOnClient = "shouldTriggerAgeCollectionOnClient";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotAgeCollectionMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotAgeCollectionMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotAgeCollectionMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotAgeCollectionMetadata();
            if (d.ageCollectionEligible != null) {
                m.ageCollectionEligible = $Boolean(d.ageCollectionEligible);
            }
            if (d.shouldTriggerAgeCollectionOnClient != null) {
                m.shouldTriggerAgeCollectionOnClient = $Boolean(d.shouldTriggerAgeCollectionOnClient);
            }
            return m;
        };

        BotAgeCollectionMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.ageCollectionEligible != null && $Object.hasOwnProperty.call(m, "ageCollectionEligible")) {
                d.ageCollectionEligible = m.ageCollectionEligible;
            }
            if (m.shouldTriggerAgeCollectionOnClient != null && $Object.hasOwnProperty.call(m, "shouldTriggerAgeCollectionOnClient")) {
                d.shouldTriggerAgeCollectionOnClient = m.shouldTriggerAgeCollectionOnClient;
            }
            return d;
        };

        BotAgeCollectionMetadata.prototype.toJSON = function() {
            return BotAgeCollectionMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotAgeCollectionMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotAgeCollectionMetadata";
        };

        return BotAgeCollectionMetadata;
    })();

    BotMetadata.BotImagineMetadata = (function() {

        const BotImagineMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotImagineMetadata.prototype.imagineType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotImagineMetadata.prototype, "_imagineType", {
            get: $util.oneOfGetter($oneOfFields = ["imagineType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotImagineMetadata.create = function(properties) {
            return new BotImagineMetadata(properties);
        };

        BotImagineMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.imagineType != null && $Object.hasOwnProperty.call(m, "imagineType"))
                w.uint32(8).int32(m.imagineType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotImagineMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotImagineMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.imagineType = r.int32();
                        m._imagineType = "imagineType";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotImagineMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotImagineMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotImagineMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotImagineMetadata();
            switch (d.imagineType) {
            case "UNKNOWN":
            case 0:
                m.imagineType = 0;
                break;
            case "IMAGINE":
            case 1:
                m.imagineType = 1;
                break;
            case "MEMU":
            case 2:
                m.imagineType = 2;
                break;
            case "FLASH":
            case 3:
                m.imagineType = 3;
                break;
            case "EDIT":
            case 4:
                m.imagineType = 4;
                break;
            default:
                if (typeof d.imagineType === "number" && (d.imagineType | 0) === d.imagineType)
                    m.imagineType = d.imagineType;
            }
            return m;
        };

        BotImagineMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.imagineType != null && $Object.hasOwnProperty.call(m, "imagineType")) {
                d.imagineType = o.enums === $String ? $root.BotMetadata.BotImagineMetadata.ImagineType[m.imagineType] === $undefined ? m.imagineType : $root.BotMetadata.BotImagineMetadata.ImagineType[m.imagineType] : m.imagineType;
            }
            return d;
        };

        BotImagineMetadata.prototype.toJSON = function() {
            return BotImagineMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotImagineMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotImagineMetadata";
        };

        BotImagineMetadata.ImagineType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "IMAGINE"] = 1;
            values[valuesById[2] = "MEMU"] = 2;
            values[valuesById[3] = "FLASH"] = 3;
            values[valuesById[4] = "EDIT"] = 4;
            return values;
        })();

        return BotImagineMetadata;
    })();

    BotMetadata.BotQuotaMetadata = (function() {

        const BotQuotaMetadata = function (p) {
            this.botFeatureQuotaMetadata = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotQuotaMetadata.prototype.botFeatureQuotaMetadata = $util.emptyArray;

        BotQuotaMetadata.create = function(properties) {
            return new BotQuotaMetadata(properties);
        };

        BotQuotaMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.botFeatureQuotaMetadata != null && m.botFeatureQuotaMetadata.length) {
                for (var i = 0; i < m.botFeatureQuotaMetadata.length; ++i)
                    $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.encode(m.botFeatureQuotaMetadata[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotQuotaMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotQuotaMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.botFeatureQuotaMetadata && m.botFeatureQuotaMetadata.length))
                            m.botFeatureQuotaMetadata = [];
                        m.botFeatureQuotaMetadata.push($root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotQuotaMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotQuotaMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotQuotaMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotQuotaMetadata();
            if (d.botFeatureQuotaMetadata) {
                if (!$Array.isArray(d.botFeatureQuotaMetadata))
                    throw $TypeError(".BotMetadata.BotQuotaMetadata.botFeatureQuotaMetadata: array expected");
                m.botFeatureQuotaMetadata = $Array(d.botFeatureQuotaMetadata.length);
                for (var i = 0; i < d.botFeatureQuotaMetadata.length; ++i) {
                    if (!$util.isObject(d.botFeatureQuotaMetadata[i]))
                        throw $TypeError(".BotMetadata.BotQuotaMetadata.botFeatureQuotaMetadata: object expected");
                    m.botFeatureQuotaMetadata[i] = $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.fromObject(d.botFeatureQuotaMetadata[i], q + 1);
                }
            }
            return m;
        };

        BotQuotaMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.botFeatureQuotaMetadata = [];
            }
            if (m.botFeatureQuotaMetadata && m.botFeatureQuotaMetadata.length) {
                d.botFeatureQuotaMetadata = $Array(m.botFeatureQuotaMetadata.length);
                for (var j = 0; j < m.botFeatureQuotaMetadata.length; ++j) {
                    d.botFeatureQuotaMetadata[j] = $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.toObject(m.botFeatureQuotaMetadata[j], o, q + 1);
                }
            }
            return d;
        };

        BotQuotaMetadata.prototype.toJSON = function() {
            return BotQuotaMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotQuotaMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotQuotaMetadata";
        };

        BotQuotaMetadata.BotFeatureQuotaMetadata = (function() {

            const BotFeatureQuotaMetadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            BotFeatureQuotaMetadata.prototype.featureType = null;
            BotFeatureQuotaMetadata.prototype.remainingQuota = null;
            BotFeatureQuotaMetadata.prototype.expirationTimestamp = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_featureType", {
                get: $util.oneOfGetter($oneOfFields = ["featureType"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_remainingQuota", {
                get: $util.oneOfGetter($oneOfFields = ["remainingQuota"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_expirationTimestamp", {
                get: $util.oneOfGetter($oneOfFields = ["expirationTimestamp"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            BotFeatureQuotaMetadata.create = function(properties) {
                return new BotFeatureQuotaMetadata(properties);
            };

            BotFeatureQuotaMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.featureType != null && $Object.hasOwnProperty.call(m, "featureType"))
                    w.uint32(8).int32(m.featureType);
                if (m.remainingQuota != null && $Object.hasOwnProperty.call(m, "remainingQuota"))
                    w.uint32(16).uint32(m.remainingQuota);
                if (m.expirationTimestamp != null && $Object.hasOwnProperty.call(m, "expirationTimestamp"))
                    w.uint32(24).uint64(m.expirationTimestamp);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            BotFeatureQuotaMetadata.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m, v;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 0)
                                break;
                            m.featureType = r.int32();
                            m._featureType = "featureType";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.remainingQuota = r.uint32();
                            m._remainingQuota = "remainingQuota";
                            continue;
                        }
                    case 3: {
                            if (u !== 0)
                                break;
                            m.expirationTimestamp = r.uint64();
                            m._expirationTimestamp = "expirationTimestamp";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            BotFeatureQuotaMetadata.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata();
                switch (d.featureType) {
                case "UNKNOWN_FEATURE":
                case 0:
                    m.featureType = 0;
                    break;
                case "REASONING_FEATURE":
                case 1:
                    m.featureType = 1;
                    break;
                default:
                    if (typeof d.featureType === "number" && (d.featureType | 0) === d.featureType)
                        m.featureType = d.featureType;
                }
                if (d.remainingQuota != null) {
                    m.remainingQuota = d.remainingQuota >>> 0;
                }
                if (d.expirationTimestamp != null) {
                    if ($util.Long)
                        m.expirationTimestamp = $util.Long.fromValue(d.expirationTimestamp, true);
                    else if (typeof d.expirationTimestamp === "string")
                        m.expirationTimestamp = $parseInt(d.expirationTimestamp, 10);
                    else if (typeof d.expirationTimestamp === "number")
                        m.expirationTimestamp = d.expirationTimestamp;
                    else if (typeof d.expirationTimestamp === "object")
                        m.expirationTimestamp = new $util.LongBits(d.expirationTimestamp.low >>> 0, d.expirationTimestamp.high >>> 0).toNumber(true);
                }
                return m;
            };

            BotFeatureQuotaMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.featureType != null && $Object.hasOwnProperty.call(m, "featureType")) {
                    d.featureType = o.enums === $String ? $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType[m.featureType] === $undefined ? m.featureType : $root.BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType[m.featureType] : m.featureType;
                }
                if (m.remainingQuota != null && $Object.hasOwnProperty.call(m, "remainingQuota")) {
                    d.remainingQuota = m.remainingQuota;
                }
                if (m.expirationTimestamp != null && $Object.hasOwnProperty.call(m, "expirationTimestamp")) {
                    if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                        d.expirationTimestamp = typeof m.expirationTimestamp === "number" ? $BigInt(m.expirationTimestamp) : $util.Long.fromBits(m.expirationTimestamp.low >>> 0, m.expirationTimestamp.high >>> 0, true).toBigInt();
                    else if (typeof m.expirationTimestamp === "number")
                        d.expirationTimestamp = o.longs === $String ? $String(m.expirationTimestamp) : m.expirationTimestamp;
                    else
                        d.expirationTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.expirationTimestamp) : o.longs === $Number ? new $util.LongBits(m.expirationTimestamp.low >>> 0, m.expirationTimestamp.high >>> 0).toNumber(true) : m.expirationTimestamp;
                }
                return d;
            };

            BotFeatureQuotaMetadata.prototype.toJSON = function() {
                return BotFeatureQuotaMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            BotFeatureQuotaMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.BotQuotaMetadata.BotFeatureQuotaMetadata";
            };

            BotFeatureQuotaMetadata.BotFeatureType = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_FEATURE"] = 0;
                values[valuesById[1] = "REASONING_FEATURE"] = 1;
                return values;
            })();

            return BotFeatureQuotaMetadata;
        })();

        return BotQuotaMetadata;
    })();

    BotMetadata.BotModeSelectionMetadata = (function() {

        const BotModeSelectionMetadata = function (p) {
            this.mode = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotModeSelectionMetadata.prototype.mode = $util.emptyArray;

        BotModeSelectionMetadata.create = function(properties) {
            return new BotModeSelectionMetadata(properties);
        };

        BotModeSelectionMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.mode != null && m.mode.length) {
                w.uint32(10).int32s(m.mode);
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotModeSelectionMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotModeSelectionMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u === 2) {
                            if (!(m.mode && m.mode.length))
                                m.mode = [];
                            r.int32s(m.mode);
                            continue;
                        }
                        if (u !== 0)
                            break;
                        if (!(m.mode && m.mode.length))
                            m.mode = [];
                        m.mode.push(r.int32());
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotModeSelectionMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotModeSelectionMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotModeSelectionMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotModeSelectionMetadata();
            if (d.mode) {
                if (!$Array.isArray(d.mode))
                    throw $TypeError(".BotMetadata.BotModeSelectionMetadata.mode: array expected");
                m.mode = [];
                for (var i = 0; i < d.mode.length; ++i) {
                    switch (d.mode[i]) {
                    case "UNKNOWN_MODE":
                    case 0:
                        m.mode[m.mode.length] = 0;
                        break;
                    case "REASONING_MODE":
                    case 1:
                        m.mode[m.mode.length] = 1;
                        break;
                    default:
                        if (typeof d.mode[i] === "number" && (d.mode[i] | 0) === d.mode[i])
                            m.mode[m.mode.length] = d.mode[i];
                    }
                }
            }
            return m;
        };

        BotModeSelectionMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.mode = [];
            }
            if (m.mode && m.mode.length) {
                d.mode = $Array(m.mode.length);
                for (var j = 0; j < m.mode.length; ++j) {
                    d.mode[j] = o.enums === $String ? $root.BotMetadata.BotModeSelectionMetadata.BotUserSelectionMode[m.mode[j]] === $undefined ? m.mode[j] : $root.BotMetadata.BotModeSelectionMetadata.BotUserSelectionMode[m.mode[j]] : m.mode[j];
                }
            }
            return d;
        };

        BotModeSelectionMetadata.prototype.toJSON = function() {
            return BotModeSelectionMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotModeSelectionMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotModeSelectionMetadata";
        };

        BotModeSelectionMetadata.BotUserSelectionMode = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_MODE"] = 0;
            values[valuesById[1] = "REASONING_MODE"] = 1;
            return values;
        })();

        return BotModeSelectionMetadata;
    })();

    BotMetadata.BotCapabilityMetadata = (function() {

        const BotCapabilityMetadata = function (p) {
            this.capabilities = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotCapabilityMetadata.prototype.capabilities = $util.emptyArray;

        BotCapabilityMetadata.create = function(properties) {
            return new BotCapabilityMetadata(properties);
        };

        BotCapabilityMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.capabilities != null && m.capabilities.length) {
                w.uint32(10).int32s(m.capabilities);
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotCapabilityMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotCapabilityMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u === 2) {
                            if (!(m.capabilities && m.capabilities.length))
                                m.capabilities = [];
                            r.int32s(m.capabilities);
                            continue;
                        }
                        if (u !== 0)
                            break;
                        if (!(m.capabilities && m.capabilities.length))
                            m.capabilities = [];
                        m.capabilities.push(r.int32());
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotCapabilityMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotCapabilityMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotCapabilityMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotCapabilityMetadata();
            if (d.capabilities) {
                if (!$Array.isArray(d.capabilities))
                    throw $TypeError(".BotMetadata.BotCapabilityMetadata.capabilities: array expected");
                m.capabilities = [];
                for (var i = 0; i < d.capabilities.length; ++i) {
                    switch (d.capabilities[i]) {
                    case "UNKNOWN":
                    case 0:
                        m.capabilities[m.capabilities.length] = 0;
                        break;
                    case "PROGRESS_INDICATOR":
                    case 1:
                        m.capabilities[m.capabilities.length] = 1;
                        break;
                    case "RICH_RESPONSE_HEADING":
                    case 2:
                        m.capabilities[m.capabilities.length] = 2;
                        break;
                    case "RICH_RESPONSE_NESTED_LIST":
                    case 3:
                        m.capabilities[m.capabilities.length] = 3;
                        break;
                    case "AI_MEMORY":
                    case 4:
                        m.capabilities[m.capabilities.length] = 4;
                        break;
                    case "RICH_RESPONSE_THREAD_SURFING":
                    case 5:
                        m.capabilities[m.capabilities.length] = 5;
                        break;
                    case "RICH_RESPONSE_TABLE":
                    case 6:
                        m.capabilities[m.capabilities.length] = 6;
                        break;
                    case "RICH_RESPONSE_CODE":
                    case 7:
                        m.capabilities[m.capabilities.length] = 7;
                        break;
                    case "RICH_RESPONSE_STRUCTURED_RESPONSE":
                    case 8:
                        m.capabilities[m.capabilities.length] = 8;
                        break;
                    case "RICH_RESPONSE_INLINE_IMAGE":
                    case 9:
                        m.capabilities[m.capabilities.length] = 9;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_CONTROL":
                    case 10:
                        m.capabilities[m.capabilities.length] = 10;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_1":
                    case 11:
                        m.capabilities[m.capabilities.length] = 11;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_2":
                    case 12:
                        m.capabilities[m.capabilities.length] = 12;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_3":
                    case 13:
                        m.capabilities[m.capabilities.length] = 13;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_4":
                    case 14:
                        m.capabilities[m.capabilities.length] = 14;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_5":
                    case 15:
                        m.capabilities[m.capabilities.length] = 15;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_6":
                    case 16:
                        m.capabilities[m.capabilities.length] = 16;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_7":
                    case 17:
                        m.capabilities[m.capabilities.length] = 17;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_8":
                    case 18:
                        m.capabilities[m.capabilities.length] = 18;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_9":
                    case 19:
                        m.capabilities[m.capabilities.length] = 19;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_10":
                    case 20:
                        m.capabilities[m.capabilities.length] = 20;
                        break;
                    case "RICH_RESPONSE_SUB_HEADING":
                    case 21:
                        m.capabilities[m.capabilities.length] = 21;
                        break;
                    case "RICH_RESPONSE_GRID_IMAGE":
                    case 22:
                        m.capabilities[m.capabilities.length] = 22;
                        break;
                    case "AI_STUDIO_UGC_MEMORY":
                    case 23:
                        m.capabilities[m.capabilities.length] = 23;
                        break;
                    case "RICH_RESPONSE_LATEX":
                    case 24:
                        m.capabilities[m.capabilities.length] = 24;
                        break;
                    case "RICH_RESPONSE_MAPS":
                    case 25:
                        m.capabilities[m.capabilities.length] = 25;
                        break;
                    case "RICH_RESPONSE_INLINE_REELS":
                    case 26:
                        m.capabilities[m.capabilities.length] = 26;
                        break;
                    case "AGENTIC_PLANNING":
                    case 27:
                        m.capabilities[m.capabilities.length] = 27;
                        break;
                    case "ACCOUNT_LINKING":
                    case 28:
                        m.capabilities[m.capabilities.length] = 28;
                        break;
                    case "STREAMING_DISAGGREGATION":
                    case 29:
                        m.capabilities[m.capabilities.length] = 29;
                        break;
                    case "RICH_RESPONSE_GRID_IMAGE_3P":
                    case 30:
                        m.capabilities[m.capabilities.length] = 30;
                        break;
                    case "RICH_RESPONSE_LATEX_INLINE":
                    case 31:
                        m.capabilities[m.capabilities.length] = 31;
                        break;
                    case "QUERY_PLAN":
                    case 32:
                        m.capabilities[m.capabilities.length] = 32;
                        break;
                    case "PROACTIVE_MESSAGE":
                    case 33:
                        m.capabilities[m.capabilities.length] = 33;
                        break;
                    case "RICH_RESPONSE_UNIFIED_RESPONSE":
                    case 34:
                        m.capabilities[m.capabilities.length] = 34;
                        break;
                    case "PROMOTION_MESSAGE":
                    case 35:
                        m.capabilities[m.capabilities.length] = 35;
                        break;
                    case "SIMPLIFIED_PROFILE_PAGE":
                    case 36:
                        m.capabilities[m.capabilities.length] = 36;
                        break;
                    case "RICH_RESPONSE_SOURCES_IN_MESSAGE":
                    case 37:
                        m.capabilities[m.capabilities.length] = 37;
                        break;
                    case "RICH_RESPONSE_SIDE_BY_SIDE_SURVEY":
                    case 38:
                        m.capabilities[m.capabilities.length] = 38;
                        break;
                    case "RICH_RESPONSE_UNIFIED_TEXT_COMPONENT":
                    case 39:
                        m.capabilities[m.capabilities.length] = 39;
                        break;
                    case "AI_SHARED_MEMORY":
                    case 40:
                        m.capabilities[m.capabilities.length] = 40;
                        break;
                    case "RICH_RESPONSE_UNIFIED_SOURCES":
                    case 41:
                        m.capabilities[m.capabilities.length] = 41;
                        break;
                    case "RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS":
                    case 42:
                        m.capabilities[m.capabilities.length] = 42;
                        break;
                    default:
                        if (typeof d.capabilities[i] === "number" && (d.capabilities[i] | 0) === d.capabilities[i])
                            m.capabilities[m.capabilities.length] = d.capabilities[i];
                    }
                }
            }
            return m;
        };

        BotCapabilityMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.capabilities = [];
            }
            if (m.capabilities && m.capabilities.length) {
                d.capabilities = $Array(m.capabilities.length);
                for (var j = 0; j < m.capabilities.length; ++j) {
                    d.capabilities[j] = o.enums === $String ? $root.BotMetadata.BotCapabilityMetadata.BotCapabilityType[m.capabilities[j]] === $undefined ? m.capabilities[j] : $root.BotMetadata.BotCapabilityMetadata.BotCapabilityType[m.capabilities[j]] : m.capabilities[j];
                }
            }
            return d;
        };

        BotCapabilityMetadata.prototype.toJSON = function() {
            return BotCapabilityMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotCapabilityMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotCapabilityMetadata";
        };

        BotCapabilityMetadata.BotCapabilityType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "PROGRESS_INDICATOR"] = 1;
            values[valuesById[2] = "RICH_RESPONSE_HEADING"] = 2;
            values[valuesById[3] = "RICH_RESPONSE_NESTED_LIST"] = 3;
            values[valuesById[4] = "AI_MEMORY"] = 4;
            values[valuesById[5] = "RICH_RESPONSE_THREAD_SURFING"] = 5;
            values[valuesById[6] = "RICH_RESPONSE_TABLE"] = 6;
            values[valuesById[7] = "RICH_RESPONSE_CODE"] = 7;
            values[valuesById[8] = "RICH_RESPONSE_STRUCTURED_RESPONSE"] = 8;
            values[valuesById[9] = "RICH_RESPONSE_INLINE_IMAGE"] = 9;
            values[valuesById[10] = "WA_IG_1P_PLUGIN_RANKING_CONTROL"] = 10;
            values[valuesById[11] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_1"] = 11;
            values[valuesById[12] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_2"] = 12;
            values[valuesById[13] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_3"] = 13;
            values[valuesById[14] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_4"] = 14;
            values[valuesById[15] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_5"] = 15;
            values[valuesById[16] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_6"] = 16;
            values[valuesById[17] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_7"] = 17;
            values[valuesById[18] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_8"] = 18;
            values[valuesById[19] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_9"] = 19;
            values[valuesById[20] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_10"] = 20;
            values[valuesById[21] = "RICH_RESPONSE_SUB_HEADING"] = 21;
            values[valuesById[22] = "RICH_RESPONSE_GRID_IMAGE"] = 22;
            values[valuesById[23] = "AI_STUDIO_UGC_MEMORY"] = 23;
            values[valuesById[24] = "RICH_RESPONSE_LATEX"] = 24;
            values[valuesById[25] = "RICH_RESPONSE_MAPS"] = 25;
            values[valuesById[26] = "RICH_RESPONSE_INLINE_REELS"] = 26;
            values[valuesById[27] = "AGENTIC_PLANNING"] = 27;
            values[valuesById[28] = "ACCOUNT_LINKING"] = 28;
            values[valuesById[29] = "STREAMING_DISAGGREGATION"] = 29;
            values[valuesById[30] = "RICH_RESPONSE_GRID_IMAGE_3P"] = 30;
            values[valuesById[31] = "RICH_RESPONSE_LATEX_INLINE"] = 31;
            values[valuesById[32] = "QUERY_PLAN"] = 32;
            values[valuesById[33] = "PROACTIVE_MESSAGE"] = 33;
            values[valuesById[34] = "RICH_RESPONSE_UNIFIED_RESPONSE"] = 34;
            values[valuesById[35] = "PROMOTION_MESSAGE"] = 35;
            values[valuesById[36] = "SIMPLIFIED_PROFILE_PAGE"] = 36;
            values[valuesById[37] = "RICH_RESPONSE_SOURCES_IN_MESSAGE"] = 37;
            values[valuesById[38] = "RICH_RESPONSE_SIDE_BY_SIDE_SURVEY"] = 38;
            values[valuesById[39] = "RICH_RESPONSE_UNIFIED_TEXT_COMPONENT"] = 39;
            values[valuesById[40] = "AI_SHARED_MEMORY"] = 40;
            values[valuesById[41] = "RICH_RESPONSE_UNIFIED_SOURCES"] = 41;
            values[valuesById[42] = "RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS"] = 42;
            return values;
        })();

        return BotCapabilityMetadata;
    })();

    BotMetadata.BotProgressIndicatorMetadata = (function() {

        const BotProgressIndicatorMetadata = function (p) {
            this.stepsMetadata = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotProgressIndicatorMetadata.prototype.progressDescription = null;
        BotProgressIndicatorMetadata.prototype.stepsMetadata = $util.emptyArray;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotProgressIndicatorMetadata.prototype, "_progressDescription", {
            get: $util.oneOfGetter($oneOfFields = ["progressDescription"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotProgressIndicatorMetadata.create = function(properties) {
            return new BotProgressIndicatorMetadata(properties);
        };

        BotProgressIndicatorMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.progressDescription != null && $Object.hasOwnProperty.call(m, "progressDescription"))
                w.uint32(10).string(m.progressDescription);
            if (m.stepsMetadata != null && m.stepsMetadata.length) {
                for (var i = 0; i < m.stepsMetadata.length; ++i)
                    $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.encode(m.stepsMetadata[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotProgressIndicatorMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotProgressIndicatorMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.progressDescription = r.stringVerify();
                        m._progressDescription = "progressDescription";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.stepsMetadata && m.stepsMetadata.length))
                            m.stepsMetadata = [];
                        m.stepsMetadata.push($root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotProgressIndicatorMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotProgressIndicatorMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotProgressIndicatorMetadata();
            if (d.progressDescription != null) {
                m.progressDescription = $String(d.progressDescription);
            }
            if (d.stepsMetadata) {
                if (!$Array.isArray(d.stepsMetadata))
                    throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.stepsMetadata: array expected");
                m.stepsMetadata = $Array(d.stepsMetadata.length);
                for (var i = 0; i < d.stepsMetadata.length; ++i) {
                    if (!$util.isObject(d.stepsMetadata[i]))
                        throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.stepsMetadata: object expected");
                    m.stepsMetadata[i] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.fromObject(d.stepsMetadata[i], q + 1);
                }
            }
            return m;
        };

        BotProgressIndicatorMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.stepsMetadata = [];
            }
            if (m.progressDescription != null && $Object.hasOwnProperty.call(m, "progressDescription")) {
                d.progressDescription = m.progressDescription;
            }
            if (m.stepsMetadata && m.stepsMetadata.length) {
                d.stepsMetadata = $Array(m.stepsMetadata.length);
                for (var j = 0; j < m.stepsMetadata.length; ++j) {
                    d.stepsMetadata[j] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.toObject(m.stepsMetadata[j], o, q + 1);
                }
            }
            return d;
        };

        BotProgressIndicatorMetadata.prototype.toJSON = function() {
            return BotProgressIndicatorMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotProgressIndicatorMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotProgressIndicatorMetadata";
        };

        BotProgressIndicatorMetadata.BotPlanningStepMetadata = (function() {

            const BotPlanningStepMetadata = function (p) {
                this.sourcesMetadata = [];
                this.sections = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            BotPlanningStepMetadata.prototype.statusTitle = null;
            BotPlanningStepMetadata.prototype.statusBody = null;
            BotPlanningStepMetadata.prototype.sourcesMetadata = $util.emptyArray;
            BotPlanningStepMetadata.prototype.status = null;
            BotPlanningStepMetadata.prototype.isReasoning = null;
            BotPlanningStepMetadata.prototype.isEnhancedSearch = null;
            BotPlanningStepMetadata.prototype.sections = $util.emptyArray;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_statusTitle", {
                get: $util.oneOfGetter($oneOfFields = ["statusTitle"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_statusBody", {
                get: $util.oneOfGetter($oneOfFields = ["statusBody"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_status", {
                get: $util.oneOfGetter($oneOfFields = ["status"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_isReasoning", {
                get: $util.oneOfGetter($oneOfFields = ["isReasoning"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_isEnhancedSearch", {
                get: $util.oneOfGetter($oneOfFields = ["isEnhancedSearch"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            BotPlanningStepMetadata.create = function(properties) {
                return new BotPlanningStepMetadata(properties);
            };

            BotPlanningStepMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.statusTitle != null && $Object.hasOwnProperty.call(m, "statusTitle"))
                    w.uint32(10).string(m.statusTitle);
                if (m.statusBody != null && $Object.hasOwnProperty.call(m, "statusBody"))
                    w.uint32(18).string(m.statusBody);
                if (m.sourcesMetadata != null && m.sourcesMetadata.length) {
                    for (var i = 0; i < m.sourcesMetadata.length; ++i)
                        $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.encode(m.sourcesMetadata[i], w.uint32(26).fork(), q + 1).ldelim();
                }
                if (m.status != null && $Object.hasOwnProperty.call(m, "status"))
                    w.uint32(32).int32(m.status);
                if (m.isReasoning != null && $Object.hasOwnProperty.call(m, "isReasoning"))
                    w.uint32(40).bool(m.isReasoning);
                if (m.isEnhancedSearch != null && $Object.hasOwnProperty.call(m, "isEnhancedSearch"))
                    w.uint32(48).bool(m.isEnhancedSearch);
                if (m.sections != null && m.sections.length) {
                    for (var i = 0; i < m.sections.length; ++i)
                        $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.encode(m.sections[i], w.uint32(58).fork(), q + 1).ldelim();
                }
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            BotPlanningStepMetadata.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m, v;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 2)
                                break;
                            m.statusTitle = r.stringVerify();
                            m._statusTitle = "statusTitle";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.statusBody = r.stringVerify();
                            m._statusBody = "statusBody";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            if (!(m.sourcesMetadata && m.sourcesMetadata.length))
                                m.sourcesMetadata = [];
                            m.sourcesMetadata.push($root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.decode(r, r.uint32(), $undefined, q + 1));
                            continue;
                        }
                    case 4: {
                            if (u !== 0)
                                break;
                            m.status = r.int32();
                            m._status = "status";
                            continue;
                        }
                    case 5: {
                            if (u !== 0)
                                break;
                            m.isReasoning = r.bool();
                            m._isReasoning = "isReasoning";
                            continue;
                        }
                    case 6: {
                            if (u !== 0)
                                break;
                            m.isEnhancedSearch = r.bool();
                            m._isEnhancedSearch = "isEnhancedSearch";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            if (!(m.sections && m.sections.length))
                                m.sections = [];
                            m.sections.push($root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.decode(r, r.uint32(), $undefined, q + 1));
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            BotPlanningStepMetadata.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata();
                if (d.statusTitle != null) {
                    m.statusTitle = $String(d.statusTitle);
                }
                if (d.statusBody != null) {
                    m.statusBody = $String(d.statusBody);
                }
                if (d.sourcesMetadata) {
                    if (!$Array.isArray(d.sourcesMetadata))
                        throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sourcesMetadata: array expected");
                    m.sourcesMetadata = $Array(d.sourcesMetadata.length);
                    for (var i = 0; i < d.sourcesMetadata.length; ++i) {
                        if (!$util.isObject(d.sourcesMetadata[i]))
                            throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sourcesMetadata: object expected");
                        m.sourcesMetadata[i] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.fromObject(d.sourcesMetadata[i], q + 1);
                    }
                }
                switch (d.status) {
                case "UNKNOWN":
                case 0:
                    m.status = 0;
                    break;
                case "PLANNED":
                case 1:
                    m.status = 1;
                    break;
                case "EXECUTING":
                case 2:
                    m.status = 2;
                    break;
                case "FINISHED":
                case 3:
                    m.status = 3;
                    break;
                default:
                    if (typeof d.status === "number" && (d.status | 0) === d.status)
                        m.status = d.status;
                }
                if (d.isReasoning != null) {
                    m.isReasoning = $Boolean(d.isReasoning);
                }
                if (d.isEnhancedSearch != null) {
                    m.isEnhancedSearch = $Boolean(d.isEnhancedSearch);
                }
                if (d.sections) {
                    if (!$Array.isArray(d.sections))
                        throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sections: array expected");
                    m.sections = $Array(d.sections.length);
                    for (var i = 0; i < d.sections.length; ++i) {
                        if (!$util.isObject(d.sections[i]))
                            throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sections: object expected");
                        m.sections[i] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.fromObject(d.sections[i], q + 1);
                    }
                }
                return m;
            };

            BotPlanningStepMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.sourcesMetadata = [];
                    d.sections = [];
                }
                if (m.statusTitle != null && $Object.hasOwnProperty.call(m, "statusTitle")) {
                    d.statusTitle = m.statusTitle;
                }
                if (m.statusBody != null && $Object.hasOwnProperty.call(m, "statusBody")) {
                    d.statusBody = m.statusBody;
                }
                if (m.sourcesMetadata && m.sourcesMetadata.length) {
                    d.sourcesMetadata = $Array(m.sourcesMetadata.length);
                    for (var j = 0; j < m.sourcesMetadata.length; ++j) {
                        d.sourcesMetadata[j] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.toObject(m.sourcesMetadata[j], o, q + 1);
                    }
                }
                if (m.status != null && $Object.hasOwnProperty.call(m, "status")) {
                    d.status = o.enums === $String ? $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus[m.status] === $undefined ? m.status : $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus[m.status] : m.status;
                }
                if (m.isReasoning != null && $Object.hasOwnProperty.call(m, "isReasoning")) {
                    d.isReasoning = m.isReasoning;
                }
                if (m.isEnhancedSearch != null && $Object.hasOwnProperty.call(m, "isEnhancedSearch")) {
                    d.isEnhancedSearch = m.isEnhancedSearch;
                }
                if (m.sections && m.sections.length) {
                    d.sections = $Array(m.sections.length);
                    for (var j = 0; j < m.sections.length; ++j) {
                        d.sections[j] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.toObject(m.sections[j], o, q + 1);
                    }
                }
                return d;
            };

            BotPlanningStepMetadata.prototype.toJSON = function() {
                return BotPlanningStepMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            BotPlanningStepMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata";
            };

            BotPlanningStepMetadata.BotPlanningSearchSourceMetadata = (function() {

                const BotPlanningSearchSourceMetadata = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                BotPlanningSearchSourceMetadata.prototype.title = null;
                BotPlanningSearchSourceMetadata.prototype.provider = null;
                BotPlanningSearchSourceMetadata.prototype.sourceUrl = null;
                BotPlanningSearchSourceMetadata.prototype.favIconUrl = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_title", {
                    get: $util.oneOfGetter($oneOfFields = ["title"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_provider", {
                    get: $util.oneOfGetter($oneOfFields = ["provider"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_sourceUrl", {
                    get: $util.oneOfGetter($oneOfFields = ["sourceUrl"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_favIconUrl", {
                    get: $util.oneOfGetter($oneOfFields = ["favIconUrl"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                BotPlanningSearchSourceMetadata.create = function(properties) {
                    return new BotPlanningSearchSourceMetadata(properties);
                };

                BotPlanningSearchSourceMetadata.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                        w.uint32(10).string(m.title);
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                        w.uint32(16).int32(m.provider);
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl"))
                        w.uint32(26).string(m.sourceUrl);
                    if (m.favIconUrl != null && $Object.hasOwnProperty.call(m, "favIconUrl"))
                        w.uint32(34).string(m.favIconUrl);
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                BotPlanningSearchSourceMetadata.decode = function (r, l, z, q, g) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    if (q === $undefined)
                        q = 0;
                    if (q > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    var c, m, v;
                    if (l === $undefined)
                        c = r.len;
                    else {
                        c = r.pos + l;
                        if (c > r.len)
                            throw $RangeError("index out of range");
                        l = r.len;
                        r.len = c;
                    }
                    m = g || new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata();
                    while (r.pos < c) {
                        var s = r.pos;
                        var t = r.tag();
                        if (t === z) {
                            z = $undefined;
                            break;
                        }
                        var u = t & 7;
                        switch (t >>>= 3) {
                        case 1: {
                                if (u !== 2)
                                    break;
                                m.title = r.stringVerify();
                                m._title = "title";
                                continue;
                            }
                        case 2: {
                                if (u !== 0)
                                    break;
                                m.provider = r.int32();
                                m._provider = "provider";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                m.sourceUrl = r.stringVerify();
                                m._sourceUrl = "sourceUrl";
                                continue;
                            }
                        case 4: {
                                if (u !== 2)
                                    break;
                                m.favIconUrl = r.stringVerify();
                                m._favIconUrl = "favIconUrl";
                                continue;
                            }
                        }
                        r.skipType(u, q, t);
                        if (!r.discardUnknown) {
                            $util.makeProp(m, "$unknowns", false);
                            (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                        }
                    }
                    if (l !== $undefined) {
                        if (r.pos !== c)
                            throw $RangeError("index out of range");
                        r.len = l;
                    }
                    if (z !== $undefined)
                        throw $Error("missing end group");
                    return m;
                };

                BotPlanningSearchSourceMetadata.fromObject = function (d, q) {
                    if (d instanceof $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata();
                    if (d.title != null) {
                        m.title = $String(d.title);
                    }
                    switch (d.provider) {
                    case "UNKNOWN_PROVIDER":
                    case 0:
                        m.provider = 0;
                        break;
                    case "OTHER":
                    case 1:
                        m.provider = 1;
                        break;
                    case "GOOGLE":
                    case 2:
                        m.provider = 2;
                        break;
                    case "BING":
                    case 3:
                        m.provider = 3;
                        break;
                    default:
                        if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                            m.provider = d.provider;
                    }
                    if (d.sourceUrl != null) {
                        m.sourceUrl = $String(d.sourceUrl);
                    }
                    if (d.favIconUrl != null) {
                        m.favIconUrl = $String(d.favIconUrl);
                    }
                    return m;
                };

                BotPlanningSearchSourceMetadata.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                        d.title = m.title;
                    }
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                        d.provider = o.enums === $String ? $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider[m.provider] === $undefined ? m.provider : $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider[m.provider] : m.provider;
                    }
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl")) {
                        d.sourceUrl = m.sourceUrl;
                    }
                    if (m.favIconUrl != null && $Object.hasOwnProperty.call(m, "favIconUrl")) {
                        d.favIconUrl = m.favIconUrl;
                    }
                    return d;
                };

                BotPlanningSearchSourceMetadata.prototype.toJSON = function() {
                    return BotPlanningSearchSourceMetadata.toObject(this, $protobuf.util.toJSONOptions);
                };

                BotPlanningSearchSourceMetadata.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata";
                };

                return BotPlanningSearchSourceMetadata;
            })();

            BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata = (function() {

                const BotPlanningSearchSourcesMetadata = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                BotPlanningSearchSourcesMetadata.prototype.sourceTitle = null;
                BotPlanningSearchSourcesMetadata.prototype.provider = null;
                BotPlanningSearchSourcesMetadata.prototype.sourceUrl = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_sourceTitle", {
                    get: $util.oneOfGetter($oneOfFields = ["sourceTitle"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_provider", {
                    get: $util.oneOfGetter($oneOfFields = ["provider"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_sourceUrl", {
                    get: $util.oneOfGetter($oneOfFields = ["sourceUrl"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                BotPlanningSearchSourcesMetadata.create = function(properties) {
                    return new BotPlanningSearchSourcesMetadata(properties);
                };

                BotPlanningSearchSourcesMetadata.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle"))
                        w.uint32(10).string(m.sourceTitle);
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                        w.uint32(16).int32(m.provider);
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl"))
                        w.uint32(26).string(m.sourceUrl);
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                BotPlanningSearchSourcesMetadata.decode = function (r, l, z, q, g) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    if (q === $undefined)
                        q = 0;
                    if (q > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    var c, m, v;
                    if (l === $undefined)
                        c = r.len;
                    else {
                        c = r.pos + l;
                        if (c > r.len)
                            throw $RangeError("index out of range");
                        l = r.len;
                        r.len = c;
                    }
                    m = g || new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata();
                    while (r.pos < c) {
                        var s = r.pos;
                        var t = r.tag();
                        if (t === z) {
                            z = $undefined;
                            break;
                        }
                        var u = t & 7;
                        switch (t >>>= 3) {
                        case 1: {
                                if (u !== 2)
                                    break;
                                m.sourceTitle = r.stringVerify();
                                m._sourceTitle = "sourceTitle";
                                continue;
                            }
                        case 2: {
                                if (u !== 0)
                                    break;
                                m.provider = r.int32();
                                m._provider = "provider";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                m.sourceUrl = r.stringVerify();
                                m._sourceUrl = "sourceUrl";
                                continue;
                            }
                        }
                        r.skipType(u, q, t);
                        if (!r.discardUnknown) {
                            $util.makeProp(m, "$unknowns", false);
                            (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                        }
                    }
                    if (l !== $undefined) {
                        if (r.pos !== c)
                            throw $RangeError("index out of range");
                        r.len = l;
                    }
                    if (z !== $undefined)
                        throw $Error("missing end group");
                    return m;
                };

                BotPlanningSearchSourcesMetadata.fromObject = function (d, q) {
                    if (d instanceof $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata();
                    if (d.sourceTitle != null) {
                        m.sourceTitle = $String(d.sourceTitle);
                    }
                    switch (d.provider) {
                    case "UNKNOWN":
                    case 0:
                        m.provider = 0;
                        break;
                    case "OTHER":
                    case 1:
                        m.provider = 1;
                        break;
                    case "GOOGLE":
                    case 2:
                        m.provider = 2;
                        break;
                    case "BING":
                    case 3:
                        m.provider = 3;
                        break;
                    default:
                        if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                            m.provider = d.provider;
                    }
                    if (d.sourceUrl != null) {
                        m.sourceUrl = $String(d.sourceUrl);
                    }
                    return m;
                };

                BotPlanningSearchSourcesMetadata.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle")) {
                        d.sourceTitle = m.sourceTitle;
                    }
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                        d.provider = o.enums === $String ? $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider[m.provider] === $undefined ? m.provider : $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider[m.provider] : m.provider;
                    }
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl")) {
                        d.sourceUrl = m.sourceUrl;
                    }
                    return d;
                };

                BotPlanningSearchSourcesMetadata.prototype.toJSON = function() {
                    return BotPlanningSearchSourcesMetadata.toObject(this, $protobuf.util.toJSONOptions);
                };

                BotPlanningSearchSourcesMetadata.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata";
                };

                BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[0] = "UNKNOWN"] = 0;
                    values[valuesById[1] = "OTHER"] = 1;
                    values[valuesById[2] = "GOOGLE"] = 2;
                    values[valuesById[3] = "BING"] = 3;
                    return values;
                })();

                return BotPlanningSearchSourcesMetadata;
            })();

            BotPlanningStepMetadata.BotPlanningStepSectionMetadata = (function() {

                const BotPlanningStepSectionMetadata = function (p) {
                    this.sourcesMetadata = [];
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                BotPlanningStepSectionMetadata.prototype.sectionTitle = null;
                BotPlanningStepSectionMetadata.prototype.sectionBody = null;
                BotPlanningStepSectionMetadata.prototype.sourcesMetadata = $util.emptyArray;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningStepSectionMetadata.prototype, "_sectionTitle", {
                    get: $util.oneOfGetter($oneOfFields = ["sectionTitle"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningStepSectionMetadata.prototype, "_sectionBody", {
                    get: $util.oneOfGetter($oneOfFields = ["sectionBody"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                BotPlanningStepSectionMetadata.create = function(properties) {
                    return new BotPlanningStepSectionMetadata(properties);
                };

                BotPlanningStepSectionMetadata.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.sectionTitle != null && $Object.hasOwnProperty.call(m, "sectionTitle"))
                        w.uint32(10).string(m.sectionTitle);
                    if (m.sectionBody != null && $Object.hasOwnProperty.call(m, "sectionBody"))
                        w.uint32(18).string(m.sectionBody);
                    if (m.sourcesMetadata != null && m.sourcesMetadata.length) {
                        for (var i = 0; i < m.sourcesMetadata.length; ++i)
                            $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.encode(m.sourcesMetadata[i], w.uint32(26).fork(), q + 1).ldelim();
                    }
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                BotPlanningStepSectionMetadata.decode = function (r, l, z, q, g) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    if (q === $undefined)
                        q = 0;
                    if (q > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    var c, m;
                    if (l === $undefined)
                        c = r.len;
                    else {
                        c = r.pos + l;
                        if (c > r.len)
                            throw $RangeError("index out of range");
                        l = r.len;
                        r.len = c;
                    }
                    m = g || new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata();
                    while (r.pos < c) {
                        var s = r.pos;
                        var t = r.tag();
                        if (t === z) {
                            z = $undefined;
                            break;
                        }
                        var u = t & 7;
                        switch (t >>>= 3) {
                        case 1: {
                                if (u !== 2)
                                    break;
                                m.sectionTitle = r.stringVerify();
                                m._sectionTitle = "sectionTitle";
                                continue;
                            }
                        case 2: {
                                if (u !== 2)
                                    break;
                                m.sectionBody = r.stringVerify();
                                m._sectionBody = "sectionBody";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                if (!(m.sourcesMetadata && m.sourcesMetadata.length))
                                    m.sourcesMetadata = [];
                                m.sourcesMetadata.push($root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.decode(r, r.uint32(), $undefined, q + 1));
                                continue;
                            }
                        }
                        r.skipType(u, q, t);
                        if (!r.discardUnknown) {
                            $util.makeProp(m, "$unknowns", false);
                            (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                        }
                    }
                    if (l !== $undefined) {
                        if (r.pos !== c)
                            throw $RangeError("index out of range");
                        r.len = l;
                    }
                    if (z !== $undefined)
                        throw $Error("missing end group");
                    return m;
                };

                BotPlanningStepSectionMetadata.fromObject = function (d, q) {
                    if (d instanceof $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata();
                    if (d.sectionTitle != null) {
                        m.sectionTitle = $String(d.sectionTitle);
                    }
                    if (d.sectionBody != null) {
                        m.sectionBody = $String(d.sectionBody);
                    }
                    if (d.sourcesMetadata) {
                        if (!$Array.isArray(d.sourcesMetadata))
                            throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.sourcesMetadata: array expected");
                        m.sourcesMetadata = $Array(d.sourcesMetadata.length);
                        for (var i = 0; i < d.sourcesMetadata.length; ++i) {
                            if (!$util.isObject(d.sourcesMetadata[i]))
                                throw $TypeError(".BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.sourcesMetadata: object expected");
                            m.sourcesMetadata[i] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.fromObject(d.sourcesMetadata[i], q + 1);
                        }
                    }
                    return m;
                };

                BotPlanningStepSectionMetadata.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (o.arrays || o.defaults) {
                        d.sourcesMetadata = [];
                    }
                    if (m.sectionTitle != null && $Object.hasOwnProperty.call(m, "sectionTitle")) {
                        d.sectionTitle = m.sectionTitle;
                    }
                    if (m.sectionBody != null && $Object.hasOwnProperty.call(m, "sectionBody")) {
                        d.sectionBody = m.sectionBody;
                    }
                    if (m.sourcesMetadata && m.sourcesMetadata.length) {
                        d.sourcesMetadata = $Array(m.sourcesMetadata.length);
                        for (var j = 0; j < m.sourcesMetadata.length; ++j) {
                            d.sourcesMetadata[j] = $root.BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.toObject(m.sourcesMetadata[j], o, q + 1);
                        }
                    }
                    return d;
                };

                BotPlanningStepSectionMetadata.prototype.toJSON = function() {
                    return BotPlanningStepSectionMetadata.toObject(this, $protobuf.util.toJSONOptions);
                };

                BotPlanningStepSectionMetadata.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/BotMetadata.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata";
                };

                return BotPlanningStepSectionMetadata;
            })();

            BotPlanningStepMetadata.BotSearchSourceProvider = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_PROVIDER"] = 0;
                values[valuesById[1] = "OTHER"] = 1;
                values[valuesById[2] = "GOOGLE"] = 2;
                values[valuesById[3] = "BING"] = 3;
                return values;
            })();

            BotPlanningStepMetadata.PlanningStepStatus = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "PLANNED"] = 1;
                values[valuesById[2] = "EXECUTING"] = 2;
                values[valuesById[3] = "FINISHED"] = 3;
                return values;
            })();

            return BotPlanningStepMetadata;
        })();

        return BotProgressIndicatorMetadata;
    })();

    BotMetadata.BotModelMetadata = (function() {

        const BotModelMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotModelMetadata.prototype.modelType = null;
        BotModelMetadata.prototype.premiumModelStatus = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotModelMetadata.prototype, "_modelType", {
            get: $util.oneOfGetter($oneOfFields = ["modelType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotModelMetadata.prototype, "_premiumModelStatus", {
            get: $util.oneOfGetter($oneOfFields = ["premiumModelStatus"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotModelMetadata.create = function(properties) {
            return new BotModelMetadata(properties);
        };

        BotModelMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.modelType != null && $Object.hasOwnProperty.call(m, "modelType"))
                w.uint32(8).int32(m.modelType);
            if (m.premiumModelStatus != null && $Object.hasOwnProperty.call(m, "premiumModelStatus"))
                w.uint32(16).int32(m.premiumModelStatus);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotModelMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotModelMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.modelType = r.int32();
                        m._modelType = "modelType";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.premiumModelStatus = r.int32();
                        m._premiumModelStatus = "premiumModelStatus";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotModelMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotModelMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotModelMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotModelMetadata();
            switch (d.modelType) {
            case "UNKNOWN_TYPE":
            case 0:
                m.modelType = 0;
                break;
            case "LLAMA_PROD":
            case 1:
                m.modelType = 1;
                break;
            case "LLAMA_PROD_PREMIUM":
            case 2:
                m.modelType = 2;
                break;
            default:
                if (typeof d.modelType === "number" && (d.modelType | 0) === d.modelType)
                    m.modelType = d.modelType;
            }
            switch (d.premiumModelStatus) {
            case "UNKNOWN_STATUS":
            case 0:
                m.premiumModelStatus = 0;
                break;
            case "AVAILABLE":
            case 1:
                m.premiumModelStatus = 1;
                break;
            case "QUOTA_EXCEED_LIMIT":
            case 2:
                m.premiumModelStatus = 2;
                break;
            default:
                if (typeof d.premiumModelStatus === "number" && (d.premiumModelStatus | 0) === d.premiumModelStatus)
                    m.premiumModelStatus = d.premiumModelStatus;
            }
            return m;
        };

        BotModelMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.modelType != null && $Object.hasOwnProperty.call(m, "modelType")) {
                d.modelType = o.enums === $String ? $root.BotMetadata.BotModelMetadata.ModelType[m.modelType] === $undefined ? m.modelType : $root.BotMetadata.BotModelMetadata.ModelType[m.modelType] : m.modelType;
            }
            if (m.premiumModelStatus != null && $Object.hasOwnProperty.call(m, "premiumModelStatus")) {
                d.premiumModelStatus = o.enums === $String ? $root.BotMetadata.BotModelMetadata.PremiumModelStatus[m.premiumModelStatus] === $undefined ? m.premiumModelStatus : $root.BotMetadata.BotModelMetadata.PremiumModelStatus[m.premiumModelStatus] : m.premiumModelStatus;
            }
            return d;
        };

        BotModelMetadata.prototype.toJSON = function() {
            return BotModelMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotModelMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotModelMetadata";
        };

        BotModelMetadata.ModelType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_TYPE"] = 0;
            values[valuesById[1] = "LLAMA_PROD"] = 1;
            values[valuesById[2] = "LLAMA_PROD_PREMIUM"] = 2;
            return values;
        })();

        BotModelMetadata.PremiumModelStatus = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_STATUS"] = 0;
            values[valuesById[1] = "AVAILABLE"] = 1;
            values[valuesById[2] = "QUOTA_EXCEED_LIMIT"] = 2;
            return values;
        })();

        return BotModelMetadata;
    })();

    BotMetadata.BotReminderMetadata = (function() {

        const BotReminderMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotReminderMetadata.prototype.requestMessageKey = null;
        BotReminderMetadata.prototype.action = null;
        BotReminderMetadata.prototype.name = null;
        BotReminderMetadata.prototype.nextTriggerTimestamp = null;
        BotReminderMetadata.prototype.frequency = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_requestMessageKey", {
            get: $util.oneOfGetter($oneOfFields = ["requestMessageKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_action", {
            get: $util.oneOfGetter($oneOfFields = ["action"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_name", {
            get: $util.oneOfGetter($oneOfFields = ["name"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_nextTriggerTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["nextTriggerTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_frequency", {
            get: $util.oneOfGetter($oneOfFields = ["frequency"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotReminderMetadata.create = function(properties) {
            return new BotReminderMetadata(properties);
        };

        BotReminderMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.requestMessageKey != null && $Object.hasOwnProperty.call(m, "requestMessageKey"))
                $root.Protocol.MessageKey.encode(m.requestMessageKey, w.uint32(10).fork(), q + 1).ldelim();
            if (m.action != null && $Object.hasOwnProperty.call(m, "action"))
                w.uint32(16).int32(m.action);
            if (m.name != null && $Object.hasOwnProperty.call(m, "name"))
                w.uint32(26).string(m.name);
            if (m.nextTriggerTimestamp != null && $Object.hasOwnProperty.call(m, "nextTriggerTimestamp"))
                w.uint32(32).uint64(m.nextTriggerTimestamp);
            if (m.frequency != null && $Object.hasOwnProperty.call(m, "frequency"))
                w.uint32(40).int32(m.frequency);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotReminderMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotReminderMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.requestMessageKey = $root.Protocol.MessageKey.decode(r, r.uint32(), $undefined, q + 1, m.requestMessageKey);
                        m._requestMessageKey = "requestMessageKey";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.action = r.int32();
                        m._action = "action";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.name = r.stringVerify();
                        m._name = "name";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.nextTriggerTimestamp = r.uint64();
                        m._nextTriggerTimestamp = "nextTriggerTimestamp";
                        continue;
                    }
                case 5: {
                        if (u !== 0)
                            break;
                        m.frequency = r.int32();
                        m._frequency = "frequency";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotReminderMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotReminderMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotReminderMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotReminderMetadata();
            if (d.requestMessageKey != null) {
                if (!$util.isObject(d.requestMessageKey))
                    throw $TypeError(".BotMetadata.BotReminderMetadata.requestMessageKey: object expected");
                m.requestMessageKey = $root.Protocol.MessageKey.fromObject(d.requestMessageKey, q + 1);
            }
            switch (d.action) {
            case "NOTIFY":
            case 1:
                m.action = 1;
                break;
            case "CREATE":
            case 2:
                m.action = 2;
                break;
            case "DELETE":
            case 3:
                m.action = 3;
                break;
            case "UPDATE":
            case 4:
                m.action = 4;
                break;
            default:
                if (typeof d.action === "number" && (d.action | 0) === d.action)
                    m.action = d.action;
            }
            if (d.name != null) {
                m.name = $String(d.name);
            }
            if (d.nextTriggerTimestamp != null) {
                if ($util.Long)
                    m.nextTriggerTimestamp = $util.Long.fromValue(d.nextTriggerTimestamp, true);
                else if (typeof d.nextTriggerTimestamp === "string")
                    m.nextTriggerTimestamp = $parseInt(d.nextTriggerTimestamp, 10);
                else if (typeof d.nextTriggerTimestamp === "number")
                    m.nextTriggerTimestamp = d.nextTriggerTimestamp;
                else if (typeof d.nextTriggerTimestamp === "object")
                    m.nextTriggerTimestamp = new $util.LongBits(d.nextTriggerTimestamp.low >>> 0, d.nextTriggerTimestamp.high >>> 0).toNumber(true);
            }
            switch (d.frequency) {
            case "ONCE":
            case 1:
                m.frequency = 1;
                break;
            case "DAILY":
            case 2:
                m.frequency = 2;
                break;
            case "WEEKLY":
            case 3:
                m.frequency = 3;
                break;
            case "BIWEEKLY":
            case 4:
                m.frequency = 4;
                break;
            case "MONTHLY":
            case 5:
                m.frequency = 5;
                break;
            default:
                if (typeof d.frequency === "number" && (d.frequency | 0) === d.frequency)
                    m.frequency = d.frequency;
            }
            return m;
        };

        BotReminderMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.requestMessageKey != null && $Object.hasOwnProperty.call(m, "requestMessageKey")) {
                d.requestMessageKey = $root.Protocol.MessageKey.toObject(m.requestMessageKey, o, q + 1);
            }
            if (m.action != null && $Object.hasOwnProperty.call(m, "action")) {
                d.action = o.enums === $String ? $root.BotMetadata.BotReminderMetadata.ReminderAction[m.action] === $undefined ? m.action : $root.BotMetadata.BotReminderMetadata.ReminderAction[m.action] : m.action;
            }
            if (m.name != null && $Object.hasOwnProperty.call(m, "name")) {
                d.name = m.name;
            }
            if (m.nextTriggerTimestamp != null && $Object.hasOwnProperty.call(m, "nextTriggerTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.nextTriggerTimestamp = typeof m.nextTriggerTimestamp === "number" ? $BigInt(m.nextTriggerTimestamp) : $util.Long.fromBits(m.nextTriggerTimestamp.low >>> 0, m.nextTriggerTimestamp.high >>> 0, true).toBigInt();
                else if (typeof m.nextTriggerTimestamp === "number")
                    d.nextTriggerTimestamp = o.longs === $String ? $String(m.nextTriggerTimestamp) : m.nextTriggerTimestamp;
                else
                    d.nextTriggerTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.nextTriggerTimestamp) : o.longs === $Number ? new $util.LongBits(m.nextTriggerTimestamp.low >>> 0, m.nextTriggerTimestamp.high >>> 0).toNumber(true) : m.nextTriggerTimestamp;
            }
            if (m.frequency != null && $Object.hasOwnProperty.call(m, "frequency")) {
                d.frequency = o.enums === $String ? $root.BotMetadata.BotReminderMetadata.ReminderFrequency[m.frequency] === $undefined ? m.frequency : $root.BotMetadata.BotReminderMetadata.ReminderFrequency[m.frequency] : m.frequency;
            }
            return d;
        };

        BotReminderMetadata.prototype.toJSON = function() {
            return BotReminderMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotReminderMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotReminderMetadata";
        };

        BotReminderMetadata.ReminderAction = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "NOTIFY"] = 1;
            values[valuesById[2] = "CREATE"] = 2;
            values[valuesById[3] = "DELETE"] = 3;
            values[valuesById[4] = "UPDATE"] = 4;
            return values;
        })();

        BotReminderMetadata.ReminderFrequency = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "ONCE"] = 1;
            values[valuesById[2] = "DAILY"] = 2;
            values[valuesById[3] = "WEEKLY"] = 3;
            values[valuesById[4] = "BIWEEKLY"] = 4;
            values[valuesById[5] = "MONTHLY"] = 5;
            return values;
        })();

        return BotReminderMetadata;
    })();

    BotMetadata.BotMemuMetadata = (function() {

        const BotMemuMetadata = function (p) {
            this.faceImages = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMemuMetadata.prototype.faceImages = $util.emptyArray;

        BotMemuMetadata.create = function(properties) {
            return new BotMemuMetadata(properties);
        };

        BotMemuMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.faceImages != null && m.faceImages.length) {
                for (var i = 0; i < m.faceImages.length; ++i)
                    $root.BotMetadata.BotMediaMetadata.encode(m.faceImages[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMemuMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMemuMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.faceImages && m.faceImages.length))
                            m.faceImages = [];
                        m.faceImages.push($root.BotMetadata.BotMediaMetadata.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMemuMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMemuMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMemuMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMemuMetadata();
            if (d.faceImages) {
                if (!$Array.isArray(d.faceImages))
                    throw $TypeError(".BotMetadata.BotMemuMetadata.faceImages: array expected");
                m.faceImages = $Array(d.faceImages.length);
                for (var i = 0; i < d.faceImages.length; ++i) {
                    if (!$util.isObject(d.faceImages[i]))
                        throw $TypeError(".BotMetadata.BotMemuMetadata.faceImages: object expected");
                    m.faceImages[i] = $root.BotMetadata.BotMediaMetadata.fromObject(d.faceImages[i], q + 1);
                }
            }
            return m;
        };

        BotMemuMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.faceImages = [];
            }
            if (m.faceImages && m.faceImages.length) {
                d.faceImages = $Array(m.faceImages.length);
                for (var j = 0; j < m.faceImages.length; ++j) {
                    d.faceImages[j] = $root.BotMetadata.BotMediaMetadata.toObject(m.faceImages[j], o, q + 1);
                }
            }
            return d;
        };

        BotMemuMetadata.prototype.toJSON = function() {
            return BotMemuMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMemuMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMemuMetadata";
        };

        return BotMemuMetadata;
    })();

    BotMetadata.BotMediaMetadata = (function() {

        const BotMediaMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMediaMetadata.prototype.fileSha256 = null;
        BotMediaMetadata.prototype.mediaKey = null;
        BotMediaMetadata.prototype.fileEncSha256 = null;
        BotMediaMetadata.prototype.directPath = null;
        BotMediaMetadata.prototype.mediaKeyTimestamp = null;
        BotMediaMetadata.prototype.mimetype = null;
        BotMediaMetadata.prototype.orientationType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_fileSha256", {
            get: $util.oneOfGetter($oneOfFields = ["fileSha256"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_mediaKey", {
            get: $util.oneOfGetter($oneOfFields = ["mediaKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_fileEncSha256", {
            get: $util.oneOfGetter($oneOfFields = ["fileEncSha256"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_directPath", {
            get: $util.oneOfGetter($oneOfFields = ["directPath"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_mediaKeyTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["mediaKeyTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_mimetype", {
            get: $util.oneOfGetter($oneOfFields = ["mimetype"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_orientationType", {
            get: $util.oneOfGetter($oneOfFields = ["orientationType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMediaMetadata.create = function(properties) {
            return new BotMediaMetadata(properties);
        };

        BotMediaMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.fileSha256 != null && $Object.hasOwnProperty.call(m, "fileSha256"))
                w.uint32(10).string(m.fileSha256);
            if (m.mediaKey != null && $Object.hasOwnProperty.call(m, "mediaKey"))
                w.uint32(18).string(m.mediaKey);
            if (m.fileEncSha256 != null && $Object.hasOwnProperty.call(m, "fileEncSha256"))
                w.uint32(26).string(m.fileEncSha256);
            if (m.directPath != null && $Object.hasOwnProperty.call(m, "directPath"))
                w.uint32(34).string(m.directPath);
            if (m.mediaKeyTimestamp != null && $Object.hasOwnProperty.call(m, "mediaKeyTimestamp"))
                w.uint32(40).int64(m.mediaKeyTimestamp);
            if (m.mimetype != null && $Object.hasOwnProperty.call(m, "mimetype"))
                w.uint32(50).string(m.mimetype);
            if (m.orientationType != null && $Object.hasOwnProperty.call(m, "orientationType"))
                w.uint32(56).int32(m.orientationType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMediaMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMediaMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.fileSha256 = r.stringVerify();
                        m._fileSha256 = "fileSha256";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.mediaKey = r.stringVerify();
                        m._mediaKey = "mediaKey";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.fileEncSha256 = r.stringVerify();
                        m._fileEncSha256 = "fileEncSha256";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.directPath = r.stringVerify();
                        m._directPath = "directPath";
                        continue;
                    }
                case 5: {
                        if (u !== 0)
                            break;
                        m.mediaKeyTimestamp = r.int64();
                        m._mediaKeyTimestamp = "mediaKeyTimestamp";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.mimetype = r.stringVerify();
                        m._mimetype = "mimetype";
                        continue;
                    }
                case 7: {
                        if (u !== 0)
                            break;
                        m.orientationType = r.int32();
                        m._orientationType = "orientationType";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMediaMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMediaMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMediaMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMediaMetadata();
            if (d.fileSha256 != null) {
                m.fileSha256 = $String(d.fileSha256);
            }
            if (d.mediaKey != null) {
                m.mediaKey = $String(d.mediaKey);
            }
            if (d.fileEncSha256 != null) {
                m.fileEncSha256 = $String(d.fileEncSha256);
            }
            if (d.directPath != null) {
                m.directPath = $String(d.directPath);
            }
            if (d.mediaKeyTimestamp != null) {
                if ($util.Long)
                    m.mediaKeyTimestamp = $util.Long.fromValue(d.mediaKeyTimestamp, false);
                else if (typeof d.mediaKeyTimestamp === "string")
                    m.mediaKeyTimestamp = $parseInt(d.mediaKeyTimestamp, 10);
                else if (typeof d.mediaKeyTimestamp === "number")
                    m.mediaKeyTimestamp = d.mediaKeyTimestamp;
                else if (typeof d.mediaKeyTimestamp === "object")
                    m.mediaKeyTimestamp = new $util.LongBits(d.mediaKeyTimestamp.low >>> 0, d.mediaKeyTimestamp.high >>> 0).toNumber();
            }
            if (d.mimetype != null) {
                m.mimetype = $String(d.mimetype);
            }
            switch (d.orientationType) {
            case "CENTER":
            case 1:
                m.orientationType = 1;
                break;
            case "LEFT":
            case 2:
                m.orientationType = 2;
                break;
            case "RIGHT":
            case 3:
                m.orientationType = 3;
                break;
            default:
                if (typeof d.orientationType === "number" && (d.orientationType | 0) === d.orientationType)
                    m.orientationType = d.orientationType;
            }
            return m;
        };

        BotMediaMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.fileSha256 != null && $Object.hasOwnProperty.call(m, "fileSha256")) {
                d.fileSha256 = m.fileSha256;
            }
            if (m.mediaKey != null && $Object.hasOwnProperty.call(m, "mediaKey")) {
                d.mediaKey = m.mediaKey;
            }
            if (m.fileEncSha256 != null && $Object.hasOwnProperty.call(m, "fileEncSha256")) {
                d.fileEncSha256 = m.fileEncSha256;
            }
            if (m.directPath != null && $Object.hasOwnProperty.call(m, "directPath")) {
                d.directPath = m.directPath;
            }
            if (m.mediaKeyTimestamp != null && $Object.hasOwnProperty.call(m, "mediaKeyTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.mediaKeyTimestamp = typeof m.mediaKeyTimestamp === "number" ? $BigInt(m.mediaKeyTimestamp) : $util.Long.fromBits(m.mediaKeyTimestamp.low >>> 0, m.mediaKeyTimestamp.high >>> 0, false).toBigInt();
                else if (typeof m.mediaKeyTimestamp === "number")
                    d.mediaKeyTimestamp = o.longs === $String ? $String(m.mediaKeyTimestamp) : m.mediaKeyTimestamp;
                else
                    d.mediaKeyTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.mediaKeyTimestamp) : o.longs === $Number ? new $util.LongBits(m.mediaKeyTimestamp.low >>> 0, m.mediaKeyTimestamp.high >>> 0).toNumber() : m.mediaKeyTimestamp;
            }
            if (m.mimetype != null && $Object.hasOwnProperty.call(m, "mimetype")) {
                d.mimetype = m.mimetype;
            }
            if (m.orientationType != null && $Object.hasOwnProperty.call(m, "orientationType")) {
                d.orientationType = o.enums === $String ? $root.BotMetadata.BotMediaMetadata.OrientationType[m.orientationType] === $undefined ? m.orientationType : $root.BotMetadata.BotMediaMetadata.OrientationType[m.orientationType] : m.orientationType;
            }
            return d;
        };

        BotMediaMetadata.prototype.toJSON = function() {
            return BotMediaMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMediaMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMediaMetadata";
        };

        BotMediaMetadata.OrientationType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "CENTER"] = 1;
            values[valuesById[2] = "LEFT"] = 2;
            values[valuesById[3] = "RIGHT"] = 3;
            return values;
        })();

        return BotMediaMetadata;
    })();

    BotMetadata.BotSessionMetadata = (function() {

        const BotSessionMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSessionMetadata.prototype.sessionId = null;
        BotSessionMetadata.prototype.sessionSource = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSessionMetadata.prototype, "_sessionId", {
            get: $util.oneOfGetter($oneOfFields = ["sessionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSessionMetadata.prototype, "_sessionSource", {
            get: $util.oneOfGetter($oneOfFields = ["sessionSource"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotSessionMetadata.create = function(properties) {
            return new BotSessionMetadata(properties);
        };

        BotSessionMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId"))
                w.uint32(10).string(m.sessionId);
            if (m.sessionSource != null && $Object.hasOwnProperty.call(m, "sessionSource"))
                w.uint32(16).int32(m.sessionSource);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSessionMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotSessionMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.sessionId = r.stringVerify();
                        m._sessionId = "sessionId";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.sessionSource = r.int32();
                        m._sessionSource = "sessionSource";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotSessionMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotSessionMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotSessionMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotSessionMetadata();
            if (d.sessionId != null) {
                m.sessionId = $String(d.sessionId);
            }
            switch (d.sessionSource) {
            case "NONE":
            case 0:
                m.sessionSource = 0;
                break;
            case "NULL_STATE":
            case 1:
                m.sessionSource = 1;
                break;
            case "TYPEAHEAD":
            case 2:
                m.sessionSource = 2;
                break;
            case "USER_INPUT":
            case 3:
                m.sessionSource = 3;
                break;
            case "EMU_FLASH":
            case 4:
                m.sessionSource = 4;
                break;
            case "EMU_FLASH_FOLLOWUP":
            case 5:
                m.sessionSource = 5;
                break;
            case "VOICE":
            case 6:
                m.sessionSource = 6;
                break;
            default:
                if (typeof d.sessionSource === "number" && (d.sessionSource | 0) === d.sessionSource)
                    m.sessionSource = d.sessionSource;
            }
            return m;
        };

        BotSessionMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId")) {
                d.sessionId = m.sessionId;
            }
            if (m.sessionSource != null && $Object.hasOwnProperty.call(m, "sessionSource")) {
                d.sessionSource = o.enums === $String ? $root.BotMetadata.BotSessionSource[m.sessionSource] === $undefined ? m.sessionSource : $root.BotMetadata.BotSessionSource[m.sessionSource] : m.sessionSource;
            }
            return d;
        };

        BotSessionMetadata.prototype.toJSON = function() {
            return BotSessionMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSessionMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotSessionMetadata";
        };

        return BotSessionMetadata;
    })();

    BotMetadata.BotMetricsMetadata = (function() {

        const BotMetricsMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMetricsMetadata.prototype.destinationId = null;
        BotMetricsMetadata.prototype.destinationEntryPoint = null;
        BotMetricsMetadata.prototype.threadOrigin = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetricsMetadata.prototype, "_destinationId", {
            get: $util.oneOfGetter($oneOfFields = ["destinationId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetricsMetadata.prototype, "_destinationEntryPoint", {
            get: $util.oneOfGetter($oneOfFields = ["destinationEntryPoint"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetricsMetadata.prototype, "_threadOrigin", {
            get: $util.oneOfGetter($oneOfFields = ["threadOrigin"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMetricsMetadata.create = function(properties) {
            return new BotMetricsMetadata(properties);
        };

        BotMetricsMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.destinationId != null && $Object.hasOwnProperty.call(m, "destinationId"))
                w.uint32(10).string(m.destinationId);
            if (m.destinationEntryPoint != null && $Object.hasOwnProperty.call(m, "destinationEntryPoint"))
                w.uint32(16).int32(m.destinationEntryPoint);
            if (m.threadOrigin != null && $Object.hasOwnProperty.call(m, "threadOrigin"))
                w.uint32(24).int32(m.threadOrigin);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMetricsMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMetricsMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.destinationId = r.stringVerify();
                        m._destinationId = "destinationId";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.destinationEntryPoint = r.int32();
                        m._destinationEntryPoint = "destinationEntryPoint";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.threadOrigin = r.int32();
                        m._threadOrigin = "threadOrigin";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMetricsMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMetricsMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMetricsMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMetricsMetadata();
            if (d.destinationId != null) {
                m.destinationId = $String(d.destinationId);
            }
            switch (d.destinationEntryPoint) {
            case "FAVICON":
            case 1:
                m.destinationEntryPoint = 1;
                break;
            case "CHATLIST":
            case 2:
                m.destinationEntryPoint = 2;
                break;
            case "AISEARCH_NULL_STATE_PAPER_PLANE":
            case 3:
                m.destinationEntryPoint = 3;
                break;
            case "AISEARCH_NULL_STATE_SUGGESTION":
            case 4:
                m.destinationEntryPoint = 4;
                break;
            case "AISEARCH_TYPE_AHEAD_SUGGESTION":
            case 5:
                m.destinationEntryPoint = 5;
                break;
            case "AISEARCH_TYPE_AHEAD_PAPER_PLANE":
            case 6:
                m.destinationEntryPoint = 6;
                break;
            case "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST":
            case 7:
                m.destinationEntryPoint = 7;
                break;
            case "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES":
            case 8:
                m.destinationEntryPoint = 8;
                break;
            case "AIVOICE_SEARCH_BAR":
            case 9:
                m.destinationEntryPoint = 9;
                break;
            case "AIVOICE_FAVICON":
            case 10:
                m.destinationEntryPoint = 10;
                break;
            case "AISTUDIO":
            case 11:
                m.destinationEntryPoint = 11;
                break;
            case "DEEPLINK":
            case 12:
                m.destinationEntryPoint = 12;
                break;
            case "NOTIFICATION":
            case 13:
                m.destinationEntryPoint = 13;
                break;
            case "PROFILE_MESSAGE_BUTTON":
            case 14:
                m.destinationEntryPoint = 14;
                break;
            case "FORWARD":
            case 15:
                m.destinationEntryPoint = 15;
                break;
            case "APP_SHORTCUT":
            case 16:
                m.destinationEntryPoint = 16;
                break;
            case "FF_FAMILY":
            case 17:
                m.destinationEntryPoint = 17;
                break;
            case "AI_TAB":
            case 18:
                m.destinationEntryPoint = 18;
                break;
            case "AI_HOME":
            case 19:
                m.destinationEntryPoint = 19;
                break;
            case "AI_DEEPLINK_IMMERSIVE":
            case 20:
                m.destinationEntryPoint = 20;
                break;
            case "AI_DEEPLINK":
            case 21:
                m.destinationEntryPoint = 21;
                break;
            case "META_AI_CHAT_SHORTCUT_AI_STUDIO":
            case 22:
                m.destinationEntryPoint = 22;
                break;
            case "UGC_CHAT_SHORTCUT_AI_STUDIO":
            case 23:
                m.destinationEntryPoint = 23;
                break;
            case "NEW_CHAT_AI_STUDIO":
            case 24:
                m.destinationEntryPoint = 24;
                break;
            case "AIVOICE_FAVICON_CALL_HISTORY":
            case 25:
                m.destinationEntryPoint = 25;
                break;
            case "ASK_META_AI_CONTEXT_MENU":
            case 26:
                m.destinationEntryPoint = 26;
                break;
            case "ASK_META_AI_CONTEXT_MENU_1ON1":
            case 27:
                m.destinationEntryPoint = 27;
                break;
            case "ASK_META_AI_CONTEXT_MENU_GROUP":
            case 28:
                m.destinationEntryPoint = 28;
                break;
            case "INVOKE_META_AI_1ON1":
            case 29:
                m.destinationEntryPoint = 29;
                break;
            case "INVOKE_META_AI_GROUP":
            case 30:
                m.destinationEntryPoint = 30;
                break;
            case "META_AI_FORWARD":
            case 31:
                m.destinationEntryPoint = 31;
                break;
            default:
                if (typeof d.destinationEntryPoint === "number" && (d.destinationEntryPoint | 0) === d.destinationEntryPoint)
                    m.destinationEntryPoint = d.destinationEntryPoint;
            }
            switch (d.threadOrigin) {
            case "AI_TAB_THREAD":
            case 1:
                m.threadOrigin = 1;
                break;
            case "AI_HOME_THREAD":
            case 2:
                m.threadOrigin = 2;
                break;
            case "AI_DEEPLINK_IMMERSIVE_THREAD":
            case 3:
                m.threadOrigin = 3;
                break;
            case "AI_DEEPLINK_THREAD":
            case 4:
                m.threadOrigin = 4;
                break;
            case "ASK_META_AI_CONTEXT_MENU_THREAD":
            case 5:
                m.threadOrigin = 5;
                break;
            default:
                if (typeof d.threadOrigin === "number" && (d.threadOrigin | 0) === d.threadOrigin)
                    m.threadOrigin = d.threadOrigin;
            }
            return m;
        };

        BotMetricsMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.destinationId != null && $Object.hasOwnProperty.call(m, "destinationId")) {
                d.destinationId = m.destinationId;
            }
            if (m.destinationEntryPoint != null && $Object.hasOwnProperty.call(m, "destinationEntryPoint")) {
                d.destinationEntryPoint = o.enums === $String ? $root.BotMetadata.BotMetricsEntryPoint[m.destinationEntryPoint] === $undefined ? m.destinationEntryPoint : $root.BotMetadata.BotMetricsEntryPoint[m.destinationEntryPoint] : m.destinationEntryPoint;
            }
            if (m.threadOrigin != null && $Object.hasOwnProperty.call(m, "threadOrigin")) {
                d.threadOrigin = o.enums === $String ? $root.BotMetadata.BotMetricsThreadEntryPoint[m.threadOrigin] === $undefined ? m.threadOrigin : $root.BotMetadata.BotMetricsThreadEntryPoint[m.threadOrigin] : m.threadOrigin;
            }
            return d;
        };

        BotMetricsMetadata.prototype.toJSON = function() {
            return BotMetricsMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMetricsMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMetricsMetadata";
        };

        return BotMetricsMetadata;
    })();

    BotMetadata.BotRenderingMetadata = (function() {

        const BotRenderingMetadata = function (p) {
            this.keywords = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotRenderingMetadata.prototype.keywords = $util.emptyArray;

        BotRenderingMetadata.create = function(properties) {
            return new BotRenderingMetadata(properties);
        };

        BotRenderingMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.keywords != null && m.keywords.length) {
                for (var i = 0; i < m.keywords.length; ++i)
                    $root.BotMetadata.BotRenderingMetadata.Keyword.encode(m.keywords[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotRenderingMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotRenderingMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.keywords && m.keywords.length))
                            m.keywords = [];
                        m.keywords.push($root.BotMetadata.BotRenderingMetadata.Keyword.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotRenderingMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotRenderingMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotRenderingMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotRenderingMetadata();
            if (d.keywords) {
                if (!$Array.isArray(d.keywords))
                    throw $TypeError(".BotMetadata.BotRenderingMetadata.keywords: array expected");
                m.keywords = $Array(d.keywords.length);
                for (var i = 0; i < d.keywords.length; ++i) {
                    if (!$util.isObject(d.keywords[i]))
                        throw $TypeError(".BotMetadata.BotRenderingMetadata.keywords: object expected");
                    m.keywords[i] = $root.BotMetadata.BotRenderingMetadata.Keyword.fromObject(d.keywords[i], q + 1);
                }
            }
            return m;
        };

        BotRenderingMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.keywords = [];
            }
            if (m.keywords && m.keywords.length) {
                d.keywords = $Array(m.keywords.length);
                for (var j = 0; j < m.keywords.length; ++j) {
                    d.keywords[j] = $root.BotMetadata.BotRenderingMetadata.Keyword.toObject(m.keywords[j], o, q + 1);
                }
            }
            return d;
        };

        BotRenderingMetadata.prototype.toJSON = function() {
            return BotRenderingMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotRenderingMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotRenderingMetadata";
        };

        BotRenderingMetadata.Keyword = (function() {

            const Keyword = function (p) {
                this.associatedPrompts = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            Keyword.prototype.value = null;
            Keyword.prototype.associatedPrompts = $util.emptyArray;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(Keyword.prototype, "_value", {
                get: $util.oneOfGetter($oneOfFields = ["value"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            Keyword.create = function(properties) {
                return new Keyword(properties);
            };

            Keyword.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.value != null && $Object.hasOwnProperty.call(m, "value"))
                    w.uint32(10).string(m.value);
                if (m.associatedPrompts != null && m.associatedPrompts.length) {
                    for (var i = 0; i < m.associatedPrompts.length; ++i)
                        w.uint32(18).string(m.associatedPrompts[i]);
                }
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            Keyword.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.BotMetadata.BotRenderingMetadata.Keyword();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 2)
                                break;
                            m.value = r.stringVerify();
                            m._value = "value";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            if (!(m.associatedPrompts && m.associatedPrompts.length))
                                m.associatedPrompts = [];
                            m.associatedPrompts.push(r.stringVerify());
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            Keyword.fromObject = function (d, q) {
                if (d instanceof $root.BotMetadata.BotRenderingMetadata.Keyword)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".BotMetadata.BotRenderingMetadata.Keyword: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.BotMetadata.BotRenderingMetadata.Keyword();
                if (d.value != null) {
                    m.value = $String(d.value);
                }
                if (d.associatedPrompts) {
                    if (!$Array.isArray(d.associatedPrompts))
                        throw $TypeError(".BotMetadata.BotRenderingMetadata.Keyword.associatedPrompts: array expected");
                    m.associatedPrompts = $Array(d.associatedPrompts.length);
                    for (var i = 0; i < d.associatedPrompts.length; ++i) {
                        m.associatedPrompts[i] = $String(d.associatedPrompts[i]);
                    }
                }
                return m;
            };

            Keyword.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.associatedPrompts = [];
                }
                if (m.value != null && $Object.hasOwnProperty.call(m, "value")) {
                    d.value = m.value;
                }
                if (m.associatedPrompts && m.associatedPrompts.length) {
                    d.associatedPrompts = $Array(m.associatedPrompts.length);
                    for (var j = 0; j < m.associatedPrompts.length; ++j) {
                        d.associatedPrompts[j] = m.associatedPrompts[j];
                    }
                }
                return d;
            };

            Keyword.prototype.toJSON = function() {
                return Keyword.toObject(this, $protobuf.util.toJSONOptions);
            };

            Keyword.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/BotMetadata.BotRenderingMetadata.Keyword";
            };

            return Keyword;
        })();

        return BotRenderingMetadata;
    })();

    BotMetadata.BotPromotionMessageMetadata = (function() {

        const BotPromotionMessageMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPromotionMessageMetadata.prototype.promotionType = null;
        BotPromotionMessageMetadata.prototype.buttonTitle = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromotionMessageMetadata.prototype, "_promotionType", {
            get: $util.oneOfGetter($oneOfFields = ["promotionType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromotionMessageMetadata.prototype, "_buttonTitle", {
            get: $util.oneOfGetter($oneOfFields = ["buttonTitle"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotPromotionMessageMetadata.create = function(properties) {
            return new BotPromotionMessageMetadata(properties);
        };

        BotPromotionMessageMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.promotionType != null && $Object.hasOwnProperty.call(m, "promotionType"))
                w.uint32(8).int32(m.promotionType);
            if (m.buttonTitle != null && $Object.hasOwnProperty.call(m, "buttonTitle"))
                w.uint32(18).string(m.buttonTitle);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPromotionMessageMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotPromotionMessageMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.promotionType = r.int32();
                        m._promotionType = "promotionType";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.buttonTitle = r.stringVerify();
                        m._buttonTitle = "buttonTitle";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotPromotionMessageMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotPromotionMessageMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotPromotionMessageMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotPromotionMessageMetadata();
            switch (d.promotionType) {
            case "UNKNOWN_TYPE":
            case 0:
                m.promotionType = 0;
                break;
            case "C50":
            case 1:
                m.promotionType = 1;
                break;
            case "SURVEY_PLATFORM":
            case 2:
                m.promotionType = 2;
                break;
            default:
                if (typeof d.promotionType === "number" && (d.promotionType | 0) === d.promotionType)
                    m.promotionType = d.promotionType;
            }
            if (d.buttonTitle != null) {
                m.buttonTitle = $String(d.buttonTitle);
            }
            return m;
        };

        BotPromotionMessageMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.promotionType != null && $Object.hasOwnProperty.call(m, "promotionType")) {
                d.promotionType = o.enums === $String ? $root.BotMetadata.BotPromotionMessageMetadata.BotPromotionType[m.promotionType] === $undefined ? m.promotionType : $root.BotMetadata.BotPromotionMessageMetadata.BotPromotionType[m.promotionType] : m.promotionType;
            }
            if (m.buttonTitle != null && $Object.hasOwnProperty.call(m, "buttonTitle")) {
                d.buttonTitle = m.buttonTitle;
            }
            return d;
        };

        BotPromotionMessageMetadata.prototype.toJSON = function() {
            return BotPromotionMessageMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPromotionMessageMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotPromotionMessageMetadata";
        };

        BotPromotionMessageMetadata.BotPromotionType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_TYPE"] = 0;
            values[valuesById[1] = "C50"] = 1;
            values[valuesById[2] = "SURVEY_PLATFORM"] = 2;
            return values;
        })();

        return BotPromotionMessageMetadata;
    })();

    BotMetadata.BotSignatureVerificationUseCaseProof = (function() {

        const BotSignatureVerificationUseCaseProof = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSignatureVerificationUseCaseProof.prototype.version = null;
        BotSignatureVerificationUseCaseProof.prototype.useCase = null;
        BotSignatureVerificationUseCaseProof.prototype.signature = null;
        BotSignatureVerificationUseCaseProof.prototype.certificateChain = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_version", {
            get: $util.oneOfGetter($oneOfFields = ["version"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_useCase", {
            get: $util.oneOfGetter($oneOfFields = ["useCase"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_signature", {
            get: $util.oneOfGetter($oneOfFields = ["signature"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_certificateChain", {
            get: $util.oneOfGetter($oneOfFields = ["certificateChain"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotSignatureVerificationUseCaseProof.create = function(properties) {
            return new BotSignatureVerificationUseCaseProof(properties);
        };

        BotSignatureVerificationUseCaseProof.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.version != null && $Object.hasOwnProperty.call(m, "version"))
                w.uint32(8).int32(m.version);
            if (m.useCase != null && $Object.hasOwnProperty.call(m, "useCase"))
                w.uint32(16).int32(m.useCase);
            if (m.signature != null && $Object.hasOwnProperty.call(m, "signature"))
                w.uint32(26).bytes(m.signature);
            if (m.certificateChain != null && $Object.hasOwnProperty.call(m, "certificateChain"))
                w.uint32(34).bytes(m.certificateChain);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSignatureVerificationUseCaseProof.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotSignatureVerificationUseCaseProof();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.version = r.int32();
                        m._version = "version";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.useCase = r.int32();
                        m._useCase = "useCase";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.signature = r.bytes();
                        m._signature = "signature";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.certificateChain = r.bytes();
                        m._certificateChain = "certificateChain";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotSignatureVerificationUseCaseProof.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotSignatureVerificationUseCaseProof)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotSignatureVerificationUseCaseProof: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotSignatureVerificationUseCaseProof();
            if (d.version != null) {
                m.version = d.version | 0;
            }
            switch (d.useCase) {
            case "WA_BOT_MSG":
            case 0:
                m.useCase = 0;
                break;
            default:
                if (typeof d.useCase === "number" && (d.useCase | 0) === d.useCase)
                    m.useCase = d.useCase;
            }
            if (d.signature != null) {
                if (typeof d.signature === "string")
                    $util.base64.decode(d.signature, m.signature = $util.newBuffer($util.base64.length(d.signature)), 0);
                else if (d.signature.length >= 0)
                    m.signature = d.signature;
            }
            if (d.certificateChain != null) {
                if (typeof d.certificateChain === "string")
                    $util.base64.decode(d.certificateChain, m.certificateChain = $util.newBuffer($util.base64.length(d.certificateChain)), 0);
                else if (d.certificateChain.length >= 0)
                    m.certificateChain = d.certificateChain;
            }
            return m;
        };

        BotSignatureVerificationUseCaseProof.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.version != null && $Object.hasOwnProperty.call(m, "version")) {
                d.version = m.version;
            }
            if (m.useCase != null && $Object.hasOwnProperty.call(m, "useCase")) {
                d.useCase = o.enums === $String ? $root.BotMetadata.BotSignatureVerificationUseCaseProof.BotSignatureUseCase[m.useCase] === $undefined ? m.useCase : $root.BotMetadata.BotSignatureVerificationUseCaseProof.BotSignatureUseCase[m.useCase] : m.useCase;
            }
            if (m.signature != null && $Object.hasOwnProperty.call(m, "signature")) {
                d.signature = o.bytes === $String ? $util.base64.encode(m.signature, 0, m.signature.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.signature) : m.signature;
            }
            if (m.certificateChain != null && $Object.hasOwnProperty.call(m, "certificateChain")) {
                d.certificateChain = o.bytes === $String ? $util.base64.encode(m.certificateChain, 0, m.certificateChain.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.certificateChain) : m.certificateChain;
            }
            return d;
        };

        BotSignatureVerificationUseCaseProof.prototype.toJSON = function() {
            return BotSignatureVerificationUseCaseProof.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSignatureVerificationUseCaseProof.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotSignatureVerificationUseCaseProof";
        };

        BotSignatureVerificationUseCaseProof.BotSignatureUseCase = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "WA_BOT_MSG"] = 0;
            return values;
        })();

        return BotSignatureVerificationUseCaseProof;
    })();

    BotMetadata.BotSignatureVerificationMetadata = (function() {

        const BotSignatureVerificationMetadata = function (p) {
            this.proofs = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSignatureVerificationMetadata.prototype.proofs = $util.emptyArray;

        BotSignatureVerificationMetadata.create = function(properties) {
            return new BotSignatureVerificationMetadata(properties);
        };

        BotSignatureVerificationMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.proofs != null && m.proofs.length) {
                for (var i = 0; i < m.proofs.length; ++i)
                    $root.BotMetadata.BotSignatureVerificationUseCaseProof.encode(m.proofs[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSignatureVerificationMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotSignatureVerificationMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.proofs && m.proofs.length))
                            m.proofs = [];
                        m.proofs.push($root.BotMetadata.BotSignatureVerificationUseCaseProof.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotSignatureVerificationMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotSignatureVerificationMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotSignatureVerificationMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotSignatureVerificationMetadata();
            if (d.proofs) {
                if (!$Array.isArray(d.proofs))
                    throw $TypeError(".BotMetadata.BotSignatureVerificationMetadata.proofs: array expected");
                m.proofs = $Array(d.proofs.length);
                for (var i = 0; i < d.proofs.length; ++i) {
                    if (!$util.isObject(d.proofs[i]))
                        throw $TypeError(".BotMetadata.BotSignatureVerificationMetadata.proofs: object expected");
                    m.proofs[i] = $root.BotMetadata.BotSignatureVerificationUseCaseProof.fromObject(d.proofs[i], q + 1);
                }
            }
            return m;
        };

        BotSignatureVerificationMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.proofs = [];
            }
            if (m.proofs && m.proofs.length) {
                d.proofs = $Array(m.proofs.length);
                for (var j = 0; j < m.proofs.length; ++j) {
                    d.proofs[j] = $root.BotMetadata.BotSignatureVerificationUseCaseProof.toObject(m.proofs[j], o, q + 1);
                }
            }
            return d;
        };

        BotSignatureVerificationMetadata.prototype.toJSON = function() {
            return BotSignatureVerificationMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSignatureVerificationMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotSignatureVerificationMetadata";
        };

        return BotSignatureVerificationMetadata;
    })();

    BotMetadata.BotMemoryFact = (function() {

        const BotMemoryFact = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMemoryFact.prototype.fact = null;
        BotMemoryFact.prototype.factId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMemoryFact.prototype, "_fact", {
            get: $util.oneOfGetter($oneOfFields = ["fact"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMemoryFact.prototype, "_factId", {
            get: $util.oneOfGetter($oneOfFields = ["factId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMemoryFact.create = function(properties) {
            return new BotMemoryFact(properties);
        };

        BotMemoryFact.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.fact != null && $Object.hasOwnProperty.call(m, "fact"))
                w.uint32(10).string(m.fact);
            if (m.factId != null && $Object.hasOwnProperty.call(m, "factId"))
                w.uint32(18).string(m.factId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMemoryFact.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMemoryFact();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.fact = r.stringVerify();
                        m._fact = "fact";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.factId = r.stringVerify();
                        m._factId = "factId";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMemoryFact.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMemoryFact)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMemoryFact: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMemoryFact();
            if (d.fact != null) {
                m.fact = $String(d.fact);
            }
            if (d.factId != null) {
                m.factId = $String(d.factId);
            }
            return m;
        };

        BotMemoryFact.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.fact != null && $Object.hasOwnProperty.call(m, "fact")) {
                d.fact = m.fact;
            }
            if (m.factId != null && $Object.hasOwnProperty.call(m, "factId")) {
                d.factId = m.factId;
            }
            return d;
        };

        BotMemoryFact.prototype.toJSON = function() {
            return BotMemoryFact.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMemoryFact.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMemoryFact";
        };

        return BotMemoryFact;
    })();

    BotMetadata.BotMemoryMetadata = (function() {

        const BotMemoryMetadata = function (p) {
            this.addedFacts = [];
            this.removedFacts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMemoryMetadata.prototype.addedFacts = $util.emptyArray;
        BotMemoryMetadata.prototype.removedFacts = $util.emptyArray;
        BotMemoryMetadata.prototype.disclaimer = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMemoryMetadata.prototype, "_disclaimer", {
            get: $util.oneOfGetter($oneOfFields = ["disclaimer"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMemoryMetadata.create = function(properties) {
            return new BotMemoryMetadata(properties);
        };

        BotMemoryMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.addedFacts != null && m.addedFacts.length) {
                for (var i = 0; i < m.addedFacts.length; ++i)
                    $root.BotMetadata.BotMemoryFact.encode(m.addedFacts[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.removedFacts != null && m.removedFacts.length) {
                for (var i = 0; i < m.removedFacts.length; ++i)
                    $root.BotMetadata.BotMemoryFact.encode(m.removedFacts[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.disclaimer != null && $Object.hasOwnProperty.call(m, "disclaimer"))
                w.uint32(26).string(m.disclaimer);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMemoryMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotMemoryMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.addedFacts && m.addedFacts.length))
                            m.addedFacts = [];
                        m.addedFacts.push($root.BotMetadata.BotMemoryFact.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.removedFacts && m.removedFacts.length))
                            m.removedFacts = [];
                        m.removedFacts.push($root.BotMetadata.BotMemoryFact.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.disclaimer = r.stringVerify();
                        m._disclaimer = "disclaimer";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotMemoryMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotMemoryMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotMemoryMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotMemoryMetadata();
            if (d.addedFacts) {
                if (!$Array.isArray(d.addedFacts))
                    throw $TypeError(".BotMetadata.BotMemoryMetadata.addedFacts: array expected");
                m.addedFacts = $Array(d.addedFacts.length);
                for (var i = 0; i < d.addedFacts.length; ++i) {
                    if (!$util.isObject(d.addedFacts[i]))
                        throw $TypeError(".BotMetadata.BotMemoryMetadata.addedFacts: object expected");
                    m.addedFacts[i] = $root.BotMetadata.BotMemoryFact.fromObject(d.addedFacts[i], q + 1);
                }
            }
            if (d.removedFacts) {
                if (!$Array.isArray(d.removedFacts))
                    throw $TypeError(".BotMetadata.BotMemoryMetadata.removedFacts: array expected");
                m.removedFacts = $Array(d.removedFacts.length);
                for (var i = 0; i < d.removedFacts.length; ++i) {
                    if (!$util.isObject(d.removedFacts[i]))
                        throw $TypeError(".BotMetadata.BotMemoryMetadata.removedFacts: object expected");
                    m.removedFacts[i] = $root.BotMetadata.BotMemoryFact.fromObject(d.removedFacts[i], q + 1);
                }
            }
            if (d.disclaimer != null) {
                m.disclaimer = $String(d.disclaimer);
            }
            return m;
        };

        BotMemoryMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.addedFacts = [];
                d.removedFacts = [];
            }
            if (m.addedFacts && m.addedFacts.length) {
                d.addedFacts = $Array(m.addedFacts.length);
                for (var j = 0; j < m.addedFacts.length; ++j) {
                    d.addedFacts[j] = $root.BotMetadata.BotMemoryFact.toObject(m.addedFacts[j], o, q + 1);
                }
            }
            if (m.removedFacts && m.removedFacts.length) {
                d.removedFacts = $Array(m.removedFacts.length);
                for (var j = 0; j < m.removedFacts.length; ++j) {
                    d.removedFacts[j] = $root.BotMetadata.BotMemoryFact.toObject(m.removedFacts[j], o, q + 1);
                }
            }
            if (m.disclaimer != null && $Object.hasOwnProperty.call(m, "disclaimer")) {
                d.disclaimer = m.disclaimer;
            }
            return d;
        };

        BotMemoryMetadata.prototype.toJSON = function() {
            return BotMemoryMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMemoryMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotMemoryMetadata";
        };

        return BotMemoryMetadata;
    })();

    BotMetadata.BotLinkedAccount = (function() {

        const BotLinkedAccount = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotLinkedAccount.prototype.type = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotLinkedAccount.prototype, "_type", {
            get: $util.oneOfGetter($oneOfFields = ["type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotLinkedAccount.create = function(properties) {
            return new BotLinkedAccount(properties);
        };

        BotLinkedAccount.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                w.uint32(8).int32(m.type);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotLinkedAccount.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotLinkedAccount();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.type = r.int32();
                        m._type = "type";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotLinkedAccount.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotLinkedAccount)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotLinkedAccount: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotLinkedAccount();
            switch (d.type) {
            case "BOT_LINKED_ACCOUNT_TYPE_1P":
            case 0:
                m.type = 0;
                break;
            default:
                if (typeof d.type === "number" && (d.type | 0) === d.type)
                    m.type = d.type;
            }
            return m;
        };

        BotLinkedAccount.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                d.type = o.enums === $String ? $root.BotMetadata.BotLinkedAccount.BotLinkedAccountType[m.type] === $undefined ? m.type : $root.BotMetadata.BotLinkedAccount.BotLinkedAccountType[m.type] : m.type;
            }
            return d;
        };

        BotLinkedAccount.prototype.toJSON = function() {
            return BotLinkedAccount.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotLinkedAccount.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotLinkedAccount";
        };

        BotLinkedAccount.BotLinkedAccountType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "BOT_LINKED_ACCOUNT_TYPE_1P"] = 0;
            return values;
        })();

        return BotLinkedAccount;
    })();

    BotMetadata.BotLinkedAccountsMetadata = (function() {

        const BotLinkedAccountsMetadata = function (p) {
            this.accounts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotLinkedAccountsMetadata.prototype.accounts = $util.emptyArray;
        BotLinkedAccountsMetadata.prototype.acAuthTokens = null;
        BotLinkedAccountsMetadata.prototype.acErrorCode = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotLinkedAccountsMetadata.prototype, "_acAuthTokens", {
            get: $util.oneOfGetter($oneOfFields = ["acAuthTokens"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotLinkedAccountsMetadata.prototype, "_acErrorCode", {
            get: $util.oneOfGetter($oneOfFields = ["acErrorCode"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotLinkedAccountsMetadata.create = function(properties) {
            return new BotLinkedAccountsMetadata(properties);
        };

        BotLinkedAccountsMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.accounts != null && m.accounts.length) {
                for (var i = 0; i < m.accounts.length; ++i)
                    $root.BotMetadata.BotLinkedAccount.encode(m.accounts[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.acAuthTokens != null && $Object.hasOwnProperty.call(m, "acAuthTokens"))
                w.uint32(18).bytes(m.acAuthTokens);
            if (m.acErrorCode != null && $Object.hasOwnProperty.call(m, "acErrorCode"))
                w.uint32(24).int32(m.acErrorCode);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotLinkedAccountsMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotLinkedAccountsMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.accounts && m.accounts.length))
                            m.accounts = [];
                        m.accounts.push($root.BotMetadata.BotLinkedAccount.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.acAuthTokens = r.bytes();
                        m._acAuthTokens = "acAuthTokens";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.acErrorCode = r.int32();
                        m._acErrorCode = "acErrorCode";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotLinkedAccountsMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotLinkedAccountsMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotLinkedAccountsMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotLinkedAccountsMetadata();
            if (d.accounts) {
                if (!$Array.isArray(d.accounts))
                    throw $TypeError(".BotMetadata.BotLinkedAccountsMetadata.accounts: array expected");
                m.accounts = $Array(d.accounts.length);
                for (var i = 0; i < d.accounts.length; ++i) {
                    if (!$util.isObject(d.accounts[i]))
                        throw $TypeError(".BotMetadata.BotLinkedAccountsMetadata.accounts: object expected");
                    m.accounts[i] = $root.BotMetadata.BotLinkedAccount.fromObject(d.accounts[i], q + 1);
                }
            }
            if (d.acAuthTokens != null) {
                if (typeof d.acAuthTokens === "string")
                    $util.base64.decode(d.acAuthTokens, m.acAuthTokens = $util.newBuffer($util.base64.length(d.acAuthTokens)), 0);
                else if (d.acAuthTokens.length >= 0)
                    m.acAuthTokens = d.acAuthTokens;
            }
            if (d.acErrorCode != null) {
                m.acErrorCode = d.acErrorCode | 0;
            }
            return m;
        };

        BotLinkedAccountsMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.accounts = [];
            }
            if (m.accounts && m.accounts.length) {
                d.accounts = $Array(m.accounts.length);
                for (var j = 0; j < m.accounts.length; ++j) {
                    d.accounts[j] = $root.BotMetadata.BotLinkedAccount.toObject(m.accounts[j], o, q + 1);
                }
            }
            if (m.acAuthTokens != null && $Object.hasOwnProperty.call(m, "acAuthTokens")) {
                d.acAuthTokens = o.bytes === $String ? $util.base64.encode(m.acAuthTokens, 0, m.acAuthTokens.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.acAuthTokens) : m.acAuthTokens;
            }
            if (m.acErrorCode != null && $Object.hasOwnProperty.call(m, "acErrorCode")) {
                d.acErrorCode = m.acErrorCode;
            }
            return d;
        };

        BotLinkedAccountsMetadata.prototype.toJSON = function() {
            return BotLinkedAccountsMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotLinkedAccountsMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotLinkedAccountsMetadata";
        };

        return BotLinkedAccountsMetadata;
    })();

    BotMetadata.BotPromptSuggestion = (function() {

        const BotPromptSuggestion = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPromptSuggestion.prototype.prompt = null;
        BotPromptSuggestion.prototype.promptId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromptSuggestion.prototype, "_prompt", {
            get: $util.oneOfGetter($oneOfFields = ["prompt"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromptSuggestion.prototype, "_promptId", {
            get: $util.oneOfGetter($oneOfFields = ["promptId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotPromptSuggestion.create = function(properties) {
            return new BotPromptSuggestion(properties);
        };

        BotPromptSuggestion.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.prompt != null && $Object.hasOwnProperty.call(m, "prompt"))
                w.uint32(10).string(m.prompt);
            if (m.promptId != null && $Object.hasOwnProperty.call(m, "promptId"))
                w.uint32(18).string(m.promptId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPromptSuggestion.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotPromptSuggestion();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.prompt = r.stringVerify();
                        m._prompt = "prompt";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.promptId = r.stringVerify();
                        m._promptId = "promptId";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotPromptSuggestion.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotPromptSuggestion)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotPromptSuggestion: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotPromptSuggestion();
            if (d.prompt != null) {
                m.prompt = $String(d.prompt);
            }
            if (d.promptId != null) {
                m.promptId = $String(d.promptId);
            }
            return m;
        };

        BotPromptSuggestion.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.prompt != null && $Object.hasOwnProperty.call(m, "prompt")) {
                d.prompt = m.prompt;
            }
            if (m.promptId != null && $Object.hasOwnProperty.call(m, "promptId")) {
                d.promptId = m.promptId;
            }
            return d;
        };

        BotPromptSuggestion.prototype.toJSON = function() {
            return BotPromptSuggestion.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPromptSuggestion.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotPromptSuggestion";
        };

        return BotPromptSuggestion;
    })();

    BotMetadata.BotPromptSuggestions = (function() {

        const BotPromptSuggestions = function (p) {
            this.suggestions = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPromptSuggestions.prototype.suggestions = $util.emptyArray;

        BotPromptSuggestions.create = function(properties) {
            return new BotPromptSuggestions(properties);
        };

        BotPromptSuggestions.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.suggestions != null && m.suggestions.length) {
                for (var i = 0; i < m.suggestions.length; ++i)
                    $root.BotMetadata.BotPromptSuggestion.encode(m.suggestions[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPromptSuggestions.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotPromptSuggestions();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.suggestions && m.suggestions.length))
                            m.suggestions = [];
                        m.suggestions.push($root.BotMetadata.BotPromptSuggestion.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotPromptSuggestions.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotPromptSuggestions)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotPromptSuggestions: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotPromptSuggestions();
            if (d.suggestions) {
                if (!$Array.isArray(d.suggestions))
                    throw $TypeError(".BotMetadata.BotPromptSuggestions.suggestions: array expected");
                m.suggestions = $Array(d.suggestions.length);
                for (var i = 0; i < d.suggestions.length; ++i) {
                    if (!$util.isObject(d.suggestions[i]))
                        throw $TypeError(".BotMetadata.BotPromptSuggestions.suggestions: object expected");
                    m.suggestions[i] = $root.BotMetadata.BotPromptSuggestion.fromObject(d.suggestions[i], q + 1);
                }
            }
            return m;
        };

        BotPromptSuggestions.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.suggestions = [];
            }
            if (m.suggestions && m.suggestions.length) {
                d.suggestions = $Array(m.suggestions.length);
                for (var j = 0; j < m.suggestions.length; ++j) {
                    d.suggestions[j] = $root.BotMetadata.BotPromptSuggestion.toObject(m.suggestions[j], o, q + 1);
                }
            }
            return d;
        };

        BotPromptSuggestions.prototype.toJSON = function() {
            return BotPromptSuggestions.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPromptSuggestions.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotPromptSuggestions";
        };

        return BotPromptSuggestions;
    })();

    BotMetadata.BotSuggestedPromptMetadata = (function() {

        const BotSuggestedPromptMetadata = function (p) {
            this.suggestedPrompts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSuggestedPromptMetadata.prototype.suggestedPrompts = $util.emptyArray;
        BotSuggestedPromptMetadata.prototype.selectedPromptIndex = null;
        BotSuggestedPromptMetadata.prototype.promptSuggestions = null;
        BotSuggestedPromptMetadata.prototype.selectedPromptId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_selectedPromptIndex", {
            get: $util.oneOfGetter($oneOfFields = ["selectedPromptIndex"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_promptSuggestions", {
            get: $util.oneOfGetter($oneOfFields = ["promptSuggestions"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_selectedPromptId", {
            get: $util.oneOfGetter($oneOfFields = ["selectedPromptId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotSuggestedPromptMetadata.create = function(properties) {
            return new BotSuggestedPromptMetadata(properties);
        };

        BotSuggestedPromptMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.suggestedPrompts != null && m.suggestedPrompts.length) {
                for (var i = 0; i < m.suggestedPrompts.length; ++i)
                    w.uint32(10).string(m.suggestedPrompts[i]);
            }
            if (m.selectedPromptIndex != null && $Object.hasOwnProperty.call(m, "selectedPromptIndex"))
                w.uint32(16).uint32(m.selectedPromptIndex);
            if (m.promptSuggestions != null && $Object.hasOwnProperty.call(m, "promptSuggestions"))
                $root.BotMetadata.BotPromptSuggestions.encode(m.promptSuggestions, w.uint32(26).fork(), q + 1).ldelim();
            if (m.selectedPromptId != null && $Object.hasOwnProperty.call(m, "selectedPromptId"))
                w.uint32(34).string(m.selectedPromptId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSuggestedPromptMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotSuggestedPromptMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        if (!(m.suggestedPrompts && m.suggestedPrompts.length))
                            m.suggestedPrompts = [];
                        m.suggestedPrompts.push(r.stringVerify());
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.selectedPromptIndex = r.uint32();
                        m._selectedPromptIndex = "selectedPromptIndex";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.promptSuggestions = $root.BotMetadata.BotPromptSuggestions.decode(r, r.uint32(), $undefined, q + 1, m.promptSuggestions);
                        m._promptSuggestions = "promptSuggestions";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.selectedPromptId = r.stringVerify();
                        m._selectedPromptId = "selectedPromptId";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotSuggestedPromptMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotSuggestedPromptMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotSuggestedPromptMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotSuggestedPromptMetadata();
            if (d.suggestedPrompts) {
                if (!$Array.isArray(d.suggestedPrompts))
                    throw $TypeError(".BotMetadata.BotSuggestedPromptMetadata.suggestedPrompts: array expected");
                m.suggestedPrompts = $Array(d.suggestedPrompts.length);
                for (var i = 0; i < d.suggestedPrompts.length; ++i) {
                    m.suggestedPrompts[i] = $String(d.suggestedPrompts[i]);
                }
            }
            if (d.selectedPromptIndex != null) {
                m.selectedPromptIndex = d.selectedPromptIndex >>> 0;
            }
            if (d.promptSuggestions != null) {
                if (!$util.isObject(d.promptSuggestions))
                    throw $TypeError(".BotMetadata.BotSuggestedPromptMetadata.promptSuggestions: object expected");
                m.promptSuggestions = $root.BotMetadata.BotPromptSuggestions.fromObject(d.promptSuggestions, q + 1);
            }
            if (d.selectedPromptId != null) {
                m.selectedPromptId = $String(d.selectedPromptId);
            }
            return m;
        };

        BotSuggestedPromptMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.suggestedPrompts = [];
            }
            if (m.suggestedPrompts && m.suggestedPrompts.length) {
                d.suggestedPrompts = $Array(m.suggestedPrompts.length);
                for (var j = 0; j < m.suggestedPrompts.length; ++j) {
                    d.suggestedPrompts[j] = m.suggestedPrompts[j];
                }
            }
            if (m.selectedPromptIndex != null && $Object.hasOwnProperty.call(m, "selectedPromptIndex")) {
                d.selectedPromptIndex = m.selectedPromptIndex;
            }
            if (m.promptSuggestions != null && $Object.hasOwnProperty.call(m, "promptSuggestions")) {
                d.promptSuggestions = $root.BotMetadata.BotPromptSuggestions.toObject(m.promptSuggestions, o, q + 1);
            }
            if (m.selectedPromptId != null && $Object.hasOwnProperty.call(m, "selectedPromptId")) {
                d.selectedPromptId = m.selectedPromptId;
            }
            return d;
        };

        BotSuggestedPromptMetadata.prototype.toJSON = function() {
            return BotSuggestedPromptMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSuggestedPromptMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotSuggestedPromptMetadata";
        };

        return BotSuggestedPromptMetadata;
    })();

    BotMetadata.BotPluginMetadata = (function() {

        const BotPluginMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPluginMetadata.prototype.provider = null;
        BotPluginMetadata.prototype.pluginType = null;
        BotPluginMetadata.prototype.thumbnailCdnUrl = null;
        BotPluginMetadata.prototype.profilePhotoCdnUrl = null;
        BotPluginMetadata.prototype.searchProviderUrl = null;
        BotPluginMetadata.prototype.referenceIndex = null;
        BotPluginMetadata.prototype.expectedLinksCount = null;
        BotPluginMetadata.prototype.searchQuery = null;
        BotPluginMetadata.prototype.parentPluginMessageKey = null;
        BotPluginMetadata.prototype.deprecatedField = null;
        BotPluginMetadata.prototype.parentPluginType = null;
        BotPluginMetadata.prototype.faviconCdnUrl = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_provider", {
            get: $util.oneOfGetter($oneOfFields = ["provider"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_pluginType", {
            get: $util.oneOfGetter($oneOfFields = ["pluginType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_thumbnailCdnUrl", {
            get: $util.oneOfGetter($oneOfFields = ["thumbnailCdnUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_profilePhotoCdnUrl", {
            get: $util.oneOfGetter($oneOfFields = ["profilePhotoCdnUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_searchProviderUrl", {
            get: $util.oneOfGetter($oneOfFields = ["searchProviderUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_referenceIndex", {
            get: $util.oneOfGetter($oneOfFields = ["referenceIndex"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_expectedLinksCount", {
            get: $util.oneOfGetter($oneOfFields = ["expectedLinksCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_searchQuery", {
            get: $util.oneOfGetter($oneOfFields = ["searchQuery"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_parentPluginMessageKey", {
            get: $util.oneOfGetter($oneOfFields = ["parentPluginMessageKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_deprecatedField", {
            get: $util.oneOfGetter($oneOfFields = ["deprecatedField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_parentPluginType", {
            get: $util.oneOfGetter($oneOfFields = ["parentPluginType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_faviconCdnUrl", {
            get: $util.oneOfGetter($oneOfFields = ["faviconCdnUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotPluginMetadata.create = function(properties) {
            return new BotPluginMetadata(properties);
        };

        BotPluginMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                w.uint32(8).int32(m.provider);
            if (m.pluginType != null && $Object.hasOwnProperty.call(m, "pluginType"))
                w.uint32(16).int32(m.pluginType);
            if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl"))
                w.uint32(26).string(m.thumbnailCdnUrl);
            if (m.profilePhotoCdnUrl != null && $Object.hasOwnProperty.call(m, "profilePhotoCdnUrl"))
                w.uint32(34).string(m.profilePhotoCdnUrl);
            if (m.searchProviderUrl != null && $Object.hasOwnProperty.call(m, "searchProviderUrl"))
                w.uint32(42).string(m.searchProviderUrl);
            if (m.referenceIndex != null && $Object.hasOwnProperty.call(m, "referenceIndex"))
                w.uint32(48).uint32(m.referenceIndex);
            if (m.expectedLinksCount != null && $Object.hasOwnProperty.call(m, "expectedLinksCount"))
                w.uint32(56).uint32(m.expectedLinksCount);
            if (m.searchQuery != null && $Object.hasOwnProperty.call(m, "searchQuery"))
                w.uint32(74).string(m.searchQuery);
            if (m.parentPluginMessageKey != null && $Object.hasOwnProperty.call(m, "parentPluginMessageKey"))
                $root.Protocol.MessageKey.encode(m.parentPluginMessageKey, w.uint32(82).fork(), q + 1).ldelim();
            if (m.deprecatedField != null && $Object.hasOwnProperty.call(m, "deprecatedField"))
                w.uint32(88).int32(m.deprecatedField);
            if (m.parentPluginType != null && $Object.hasOwnProperty.call(m, "parentPluginType"))
                w.uint32(96).int32(m.parentPluginType);
            if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl"))
                w.uint32(106).string(m.faviconCdnUrl);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPluginMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotPluginMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.provider = r.int32();
                        m._provider = "provider";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.pluginType = r.int32();
                        m._pluginType = "pluginType";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.thumbnailCdnUrl = r.stringVerify();
                        m._thumbnailCdnUrl = "thumbnailCdnUrl";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.profilePhotoCdnUrl = r.stringVerify();
                        m._profilePhotoCdnUrl = "profilePhotoCdnUrl";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.searchProviderUrl = r.stringVerify();
                        m._searchProviderUrl = "searchProviderUrl";
                        continue;
                    }
                case 6: {
                        if (u !== 0)
                            break;
                        m.referenceIndex = r.uint32();
                        m._referenceIndex = "referenceIndex";
                        continue;
                    }
                case 7: {
                        if (u !== 0)
                            break;
                        m.expectedLinksCount = r.uint32();
                        m._expectedLinksCount = "expectedLinksCount";
                        continue;
                    }
                case 9: {
                        if (u !== 2)
                            break;
                        m.searchQuery = r.stringVerify();
                        m._searchQuery = "searchQuery";
                        continue;
                    }
                case 10: {
                        if (u !== 2)
                            break;
                        m.parentPluginMessageKey = $root.Protocol.MessageKey.decode(r, r.uint32(), $undefined, q + 1, m.parentPluginMessageKey);
                        m._parentPluginMessageKey = "parentPluginMessageKey";
                        continue;
                    }
                case 11: {
                        if (u !== 0)
                            break;
                        m.deprecatedField = r.int32();
                        m._deprecatedField = "deprecatedField";
                        continue;
                    }
                case 12: {
                        if (u !== 0)
                            break;
                        m.parentPluginType = r.int32();
                        m._parentPluginType = "parentPluginType";
                        continue;
                    }
                case 13: {
                        if (u !== 2)
                            break;
                        m.faviconCdnUrl = r.stringVerify();
                        m._faviconCdnUrl = "faviconCdnUrl";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotPluginMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotPluginMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotPluginMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotPluginMetadata();
            switch (d.provider) {
            case "UNKNOWN":
            case 0:
                m.provider = 0;
                break;
            case "BING":
            case 1:
                m.provider = 1;
                break;
            case "GOOGLE":
            case 2:
                m.provider = 2;
                break;
            case "SUPPORT":
            case 3:
                m.provider = 3;
                break;
            default:
                if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                    m.provider = d.provider;
            }
            switch (d.pluginType) {
            case "UNKNOWN_PLUGIN":
            case 0:
                m.pluginType = 0;
                break;
            case "REELS":
            case 1:
                m.pluginType = 1;
                break;
            case "SEARCH":
            case 2:
                m.pluginType = 2;
                break;
            default:
                if (typeof d.pluginType === "number" && (d.pluginType | 0) === d.pluginType)
                    m.pluginType = d.pluginType;
            }
            if (d.thumbnailCdnUrl != null) {
                m.thumbnailCdnUrl = $String(d.thumbnailCdnUrl);
            }
            if (d.profilePhotoCdnUrl != null) {
                m.profilePhotoCdnUrl = $String(d.profilePhotoCdnUrl);
            }
            if (d.searchProviderUrl != null) {
                m.searchProviderUrl = $String(d.searchProviderUrl);
            }
            if (d.referenceIndex != null) {
                m.referenceIndex = d.referenceIndex >>> 0;
            }
            if (d.expectedLinksCount != null) {
                m.expectedLinksCount = d.expectedLinksCount >>> 0;
            }
            if (d.searchQuery != null) {
                m.searchQuery = $String(d.searchQuery);
            }
            if (d.parentPluginMessageKey != null) {
                if (!$util.isObject(d.parentPluginMessageKey))
                    throw $TypeError(".BotMetadata.BotPluginMetadata.parentPluginMessageKey: object expected");
                m.parentPluginMessageKey = $root.Protocol.MessageKey.fromObject(d.parentPluginMessageKey, q + 1);
            }
            switch (d.deprecatedField) {
            case "UNKNOWN_PLUGIN":
            case 0:
                m.deprecatedField = 0;
                break;
            case "REELS":
            case 1:
                m.deprecatedField = 1;
                break;
            case "SEARCH":
            case 2:
                m.deprecatedField = 2;
                break;
            default:
                if (typeof d.deprecatedField === "number" && (d.deprecatedField | 0) === d.deprecatedField)
                    m.deprecatedField = d.deprecatedField;
            }
            switch (d.parentPluginType) {
            case "UNKNOWN_PLUGIN":
            case 0:
                m.parentPluginType = 0;
                break;
            case "REELS":
            case 1:
                m.parentPluginType = 1;
                break;
            case "SEARCH":
            case 2:
                m.parentPluginType = 2;
                break;
            default:
                if (typeof d.parentPluginType === "number" && (d.parentPluginType | 0) === d.parentPluginType)
                    m.parentPluginType = d.parentPluginType;
            }
            if (d.faviconCdnUrl != null) {
                m.faviconCdnUrl = $String(d.faviconCdnUrl);
            }
            return m;
        };

        BotPluginMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                d.provider = o.enums === $String ? $root.BotMetadata.BotPluginMetadata.SearchProvider[m.provider] === $undefined ? m.provider : $root.BotMetadata.BotPluginMetadata.SearchProvider[m.provider] : m.provider;
            }
            if (m.pluginType != null && $Object.hasOwnProperty.call(m, "pluginType")) {
                d.pluginType = o.enums === $String ? $root.BotMetadata.BotPluginMetadata.PluginType[m.pluginType] === $undefined ? m.pluginType : $root.BotMetadata.BotPluginMetadata.PluginType[m.pluginType] : m.pluginType;
            }
            if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl")) {
                d.thumbnailCdnUrl = m.thumbnailCdnUrl;
            }
            if (m.profilePhotoCdnUrl != null && $Object.hasOwnProperty.call(m, "profilePhotoCdnUrl")) {
                d.profilePhotoCdnUrl = m.profilePhotoCdnUrl;
            }
            if (m.searchProviderUrl != null && $Object.hasOwnProperty.call(m, "searchProviderUrl")) {
                d.searchProviderUrl = m.searchProviderUrl;
            }
            if (m.referenceIndex != null && $Object.hasOwnProperty.call(m, "referenceIndex")) {
                d.referenceIndex = m.referenceIndex;
            }
            if (m.expectedLinksCount != null && $Object.hasOwnProperty.call(m, "expectedLinksCount")) {
                d.expectedLinksCount = m.expectedLinksCount;
            }
            if (m.searchQuery != null && $Object.hasOwnProperty.call(m, "searchQuery")) {
                d.searchQuery = m.searchQuery;
            }
            if (m.parentPluginMessageKey != null && $Object.hasOwnProperty.call(m, "parentPluginMessageKey")) {
                d.parentPluginMessageKey = $root.Protocol.MessageKey.toObject(m.parentPluginMessageKey, o, q + 1);
            }
            if (m.deprecatedField != null && $Object.hasOwnProperty.call(m, "deprecatedField")) {
                d.deprecatedField = o.enums === $String ? $root.BotMetadata.BotPluginMetadata.PluginType[m.deprecatedField] === $undefined ? m.deprecatedField : $root.BotMetadata.BotPluginMetadata.PluginType[m.deprecatedField] : m.deprecatedField;
            }
            if (m.parentPluginType != null && $Object.hasOwnProperty.call(m, "parentPluginType")) {
                d.parentPluginType = o.enums === $String ? $root.BotMetadata.BotPluginMetadata.PluginType[m.parentPluginType] === $undefined ? m.parentPluginType : $root.BotMetadata.BotPluginMetadata.PluginType[m.parentPluginType] : m.parentPluginType;
            }
            if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl")) {
                d.faviconCdnUrl = m.faviconCdnUrl;
            }
            return d;
        };

        BotPluginMetadata.prototype.toJSON = function() {
            return BotPluginMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPluginMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotPluginMetadata";
        };

        BotPluginMetadata.PluginType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_PLUGIN"] = 0;
            values[valuesById[1] = "REELS"] = 1;
            values[valuesById[2] = "SEARCH"] = 2;
            return values;
        })();

        BotPluginMetadata.SearchProvider = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "BING"] = 1;
            values[valuesById[2] = "GOOGLE"] = 2;
            values[valuesById[3] = "SUPPORT"] = 3;
            return values;
        })();

        return BotPluginMetadata;
    })();

    BotMetadata.BotAvatarMetadata = (function() {

        const BotAvatarMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotAvatarMetadata.prototype.sentiment = null;
        BotAvatarMetadata.prototype.behaviorGraph = null;
        BotAvatarMetadata.prototype.action = null;
        BotAvatarMetadata.prototype.intensity = null;
        BotAvatarMetadata.prototype.wordCount = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAvatarMetadata.prototype, "_sentiment", {
            get: $util.oneOfGetter($oneOfFields = ["sentiment"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAvatarMetadata.prototype, "_behaviorGraph", {
            get: $util.oneOfGetter($oneOfFields = ["behaviorGraph"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAvatarMetadata.prototype, "_action", {
            get: $util.oneOfGetter($oneOfFields = ["action"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAvatarMetadata.prototype, "_intensity", {
            get: $util.oneOfGetter($oneOfFields = ["intensity"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAvatarMetadata.prototype, "_wordCount", {
            get: $util.oneOfGetter($oneOfFields = ["wordCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotAvatarMetadata.create = function(properties) {
            return new BotAvatarMetadata(properties);
        };

        BotAvatarMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sentiment != null && $Object.hasOwnProperty.call(m, "sentiment"))
                w.uint32(8).uint32(m.sentiment);
            if (m.behaviorGraph != null && $Object.hasOwnProperty.call(m, "behaviorGraph"))
                w.uint32(18).string(m.behaviorGraph);
            if (m.action != null && $Object.hasOwnProperty.call(m, "action"))
                w.uint32(24).uint32(m.action);
            if (m.intensity != null && $Object.hasOwnProperty.call(m, "intensity"))
                w.uint32(32).uint32(m.intensity);
            if (m.wordCount != null && $Object.hasOwnProperty.call(m, "wordCount"))
                w.uint32(40).uint32(m.wordCount);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotAvatarMetadata.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.BotMetadata.BotAvatarMetadata();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.sentiment = r.uint32();
                        m._sentiment = "sentiment";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.behaviorGraph = r.stringVerify();
                        m._behaviorGraph = "behaviorGraph";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.action = r.uint32();
                        m._action = "action";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.intensity = r.uint32();
                        m._intensity = "intensity";
                        continue;
                    }
                case 5: {
                        if (u !== 0)
                            break;
                        m.wordCount = r.uint32();
                        m._wordCount = "wordCount";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        BotAvatarMetadata.fromObject = function (d, q) {
            if (d instanceof $root.BotMetadata.BotAvatarMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".BotMetadata.BotAvatarMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.BotMetadata.BotAvatarMetadata();
            if (d.sentiment != null) {
                m.sentiment = d.sentiment >>> 0;
            }
            if (d.behaviorGraph != null) {
                m.behaviorGraph = $String(d.behaviorGraph);
            }
            if (d.action != null) {
                m.action = d.action >>> 0;
            }
            if (d.intensity != null) {
                m.intensity = d.intensity >>> 0;
            }
            if (d.wordCount != null) {
                m.wordCount = d.wordCount >>> 0;
            }
            return m;
        };

        BotAvatarMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.sentiment != null && $Object.hasOwnProperty.call(m, "sentiment")) {
                d.sentiment = m.sentiment;
            }
            if (m.behaviorGraph != null && $Object.hasOwnProperty.call(m, "behaviorGraph")) {
                d.behaviorGraph = m.behaviorGraph;
            }
            if (m.action != null && $Object.hasOwnProperty.call(m, "action")) {
                d.action = m.action;
            }
            if (m.intensity != null && $Object.hasOwnProperty.call(m, "intensity")) {
                d.intensity = m.intensity;
            }
            if (m.wordCount != null && $Object.hasOwnProperty.call(m, "wordCount")) {
                d.wordCount = m.wordCount;
            }
            return d;
        };

        BotAvatarMetadata.prototype.toJSON = function() {
            return BotAvatarMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotAvatarMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/BotMetadata.BotAvatarMetadata";
        };

        return BotAvatarMetadata;
    })();

    BotMetadata.BotSessionSource = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "NULL_STATE"] = 1;
        values[valuesById[2] = "TYPEAHEAD"] = 2;
        values[valuesById[3] = "USER_INPUT"] = 3;
        values[valuesById[4] = "EMU_FLASH"] = 4;
        values[valuesById[5] = "EMU_FLASH_FOLLOWUP"] = 5;
        values[valuesById[6] = "VOICE"] = 6;
        return values;
    })();

    BotMetadata.BotMetricsThreadEntryPoint = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[1] = "AI_TAB_THREAD"] = 1;
        values[valuesById[2] = "AI_HOME_THREAD"] = 2;
        values[valuesById[3] = "AI_DEEPLINK_IMMERSIVE_THREAD"] = 3;
        values[valuesById[4] = "AI_DEEPLINK_THREAD"] = 4;
        values[valuesById[5] = "ASK_META_AI_CONTEXT_MENU_THREAD"] = 5;
        return values;
    })();

    BotMetadata.BotMetricsEntryPoint = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[1] = "FAVICON"] = 1;
        values[valuesById[2] = "CHATLIST"] = 2;
        values[valuesById[3] = "AISEARCH_NULL_STATE_PAPER_PLANE"] = 3;
        values[valuesById[4] = "AISEARCH_NULL_STATE_SUGGESTION"] = 4;
        values[valuesById[5] = "AISEARCH_TYPE_AHEAD_SUGGESTION"] = 5;
        values[valuesById[6] = "AISEARCH_TYPE_AHEAD_PAPER_PLANE"] = 6;
        values[valuesById[7] = "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST"] = 7;
        values[valuesById[8] = "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES"] = 8;
        values[valuesById[9] = "AIVOICE_SEARCH_BAR"] = 9;
        values[valuesById[10] = "AIVOICE_FAVICON"] = 10;
        values[valuesById[11] = "AISTUDIO"] = 11;
        values[valuesById[12] = "DEEPLINK"] = 12;
        values[valuesById[13] = "NOTIFICATION"] = 13;
        values[valuesById[14] = "PROFILE_MESSAGE_BUTTON"] = 14;
        values[valuesById[15] = "FORWARD"] = 15;
        values[valuesById[16] = "APP_SHORTCUT"] = 16;
        values[valuesById[17] = "FF_FAMILY"] = 17;
        values[valuesById[18] = "AI_TAB"] = 18;
        values[valuesById[19] = "AI_HOME"] = 19;
        values[valuesById[20] = "AI_DEEPLINK_IMMERSIVE"] = 20;
        values[valuesById[21] = "AI_DEEPLINK"] = 21;
        values[valuesById[22] = "META_AI_CHAT_SHORTCUT_AI_STUDIO"] = 22;
        values[valuesById[23] = "UGC_CHAT_SHORTCUT_AI_STUDIO"] = 23;
        values[valuesById[24] = "NEW_CHAT_AI_STUDIO"] = 24;
        values[valuesById[25] = "AIVOICE_FAVICON_CALL_HISTORY"] = 25;
        values[valuesById[26] = "ASK_META_AI_CONTEXT_MENU"] = 26;
        values[valuesById[27] = "ASK_META_AI_CONTEXT_MENU_1ON1"] = 27;
        values[valuesById[28] = "ASK_META_AI_CONTEXT_MENU_GROUP"] = 28;
        values[valuesById[29] = "INVOKE_META_AI_1ON1"] = 29;
        values[valuesById[30] = "INVOKE_META_AI_GROUP"] = 30;
        values[valuesById[31] = "META_AI_FORWARD"] = 31;
        return values;
    })();

    return BotMetadata;
})();

export const Protocol = $root.Protocol = (() => {

    const Protocol = {};

    Protocol.ACP2Setting = (function() {

        const ACP2Setting = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        ACP2Setting.prototype.enabled = null;
        ACP2Setting.prototype.trigger = null;
        ACP2Setting.prototype.settingTimestamp = null;
        ACP2Setting.prototype.initiatedByMe = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_enabled", {
            get: $util.oneOfGetter($oneOfFields = ["enabled"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_trigger", {
            get: $util.oneOfGetter($oneOfFields = ["trigger"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_settingTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["settingTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_initiatedByMe", {
            get: $util.oneOfGetter($oneOfFields = ["initiatedByMe"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        ACP2Setting.create = function(properties) {
            return new ACP2Setting(properties);
        };

        ACP2Setting.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.enabled != null && $Object.hasOwnProperty.call(m, "enabled"))
                w.uint32(8).bool(m.enabled);
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger"))
                w.uint32(16).int32(m.trigger);
            if (m.settingTimestamp != null && $Object.hasOwnProperty.call(m, "settingTimestamp"))
                w.uint32(24).int64(m.settingTimestamp);
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe"))
                w.uint32(32).bool(m.initiatedByMe);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        ACP2Setting.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.Protocol.ACP2Setting();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.enabled = r.bool();
                        m._enabled = "enabled";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.trigger = r.int32();
                        m._trigger = "trigger";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.settingTimestamp = r.int64();
                        m._settingTimestamp = "settingTimestamp";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.initiatedByMe = r.bool();
                        m._initiatedByMe = "initiatedByMe";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        ACP2Setting.fromObject = function (d, q) {
            if (d instanceof $root.Protocol.ACP2Setting)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Protocol.ACP2Setting: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Protocol.ACP2Setting();
            if (d.enabled != null) {
                m.enabled = $Boolean(d.enabled);
            }
            switch (d.trigger) {
            case "UNKNOWN":
            case 0:
                m.trigger = 0;
                break;
            case "CHAT_SETTING":
            case 1:
                m.trigger = 1;
                break;
            case "BIZ_SUPPORTS_FB_HOSTING":
            case 2:
                m.trigger = 2;
                break;
            case "UNKNOWN_GROUP":
            case 3:
                m.trigger = 3;
                break;
            default:
                if (typeof d.trigger === "number" && (d.trigger | 0) === d.trigger)
                    m.trigger = d.trigger;
            }
            if (d.settingTimestamp != null) {
                if ($util.Long)
                    m.settingTimestamp = $util.Long.fromValue(d.settingTimestamp, false);
                else if (typeof d.settingTimestamp === "string")
                    m.settingTimestamp = $parseInt(d.settingTimestamp, 10);
                else if (typeof d.settingTimestamp === "number")
                    m.settingTimestamp = d.settingTimestamp;
                else if (typeof d.settingTimestamp === "object")
                    m.settingTimestamp = new $util.LongBits(d.settingTimestamp.low >>> 0, d.settingTimestamp.high >>> 0).toNumber();
            }
            if (d.initiatedByMe != null) {
                m.initiatedByMe = $Boolean(d.initiatedByMe);
            }
            return m;
        };

        ACP2Setting.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.enabled != null && $Object.hasOwnProperty.call(m, "enabled")) {
                d.enabled = m.enabled;
            }
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger")) {
                d.trigger = o.enums === $String ? $root.Protocol.LimitSharing.TriggerType[m.trigger] === $undefined ? m.trigger : $root.Protocol.LimitSharing.TriggerType[m.trigger] : m.trigger;
            }
            if (m.settingTimestamp != null && $Object.hasOwnProperty.call(m, "settingTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.settingTimestamp = typeof m.settingTimestamp === "number" ? $BigInt(m.settingTimestamp) : $util.Long.fromBits(m.settingTimestamp.low >>> 0, m.settingTimestamp.high >>> 0, false).toBigInt();
                else if (typeof m.settingTimestamp === "number")
                    d.settingTimestamp = o.longs === $String ? $String(m.settingTimestamp) : m.settingTimestamp;
                else
                    d.settingTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.settingTimestamp) : o.longs === $Number ? new $util.LongBits(m.settingTimestamp.low >>> 0, m.settingTimestamp.high >>> 0).toNumber() : m.settingTimestamp;
            }
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe")) {
                d.initiatedByMe = m.initiatedByMe;
            }
            return d;
        };

        ACP2Setting.prototype.toJSON = function() {
            return ACP2Setting.toObject(this, $protobuf.util.toJSONOptions);
        };

        ACP2Setting.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Protocol.ACP2Setting";
        };

        return ACP2Setting;
    })();

    Protocol.LimitSharing = (function() {

        const LimitSharing = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        LimitSharing.prototype.sharingLimited = null;
        LimitSharing.prototype.trigger = null;
        LimitSharing.prototype.limitSharingSettingTimestamp = null;
        LimitSharing.prototype.initiatedByMe = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_sharingLimited", {
            get: $util.oneOfGetter($oneOfFields = ["sharingLimited"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_trigger", {
            get: $util.oneOfGetter($oneOfFields = ["trigger"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_limitSharingSettingTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["limitSharingSettingTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_initiatedByMe", {
            get: $util.oneOfGetter($oneOfFields = ["initiatedByMe"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        LimitSharing.create = function(properties) {
            return new LimitSharing(properties);
        };

        LimitSharing.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sharingLimited != null && $Object.hasOwnProperty.call(m, "sharingLimited"))
                w.uint32(8).bool(m.sharingLimited);
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger"))
                w.uint32(16).int32(m.trigger);
            if (m.limitSharingSettingTimestamp != null && $Object.hasOwnProperty.call(m, "limitSharingSettingTimestamp"))
                w.uint32(24).int64(m.limitSharingSettingTimestamp);
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe"))
                w.uint32(32).bool(m.initiatedByMe);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        LimitSharing.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.Protocol.LimitSharing();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.sharingLimited = r.bool();
                        m._sharingLimited = "sharingLimited";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.trigger = r.int32();
                        m._trigger = "trigger";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.limitSharingSettingTimestamp = r.int64();
                        m._limitSharingSettingTimestamp = "limitSharingSettingTimestamp";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.initiatedByMe = r.bool();
                        m._initiatedByMe = "initiatedByMe";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        LimitSharing.fromObject = function (d, q) {
            if (d instanceof $root.Protocol.LimitSharing)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Protocol.LimitSharing: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Protocol.LimitSharing();
            if (d.sharingLimited != null) {
                m.sharingLimited = $Boolean(d.sharingLimited);
            }
            switch (d.trigger) {
            case "UNKNOWN":
            case 0:
                m.trigger = 0;
                break;
            case "CHAT_SETTING":
            case 1:
                m.trigger = 1;
                break;
            case "BIZ_SUPPORTS_FB_HOSTING":
            case 2:
                m.trigger = 2;
                break;
            case "UNKNOWN_GROUP":
            case 3:
                m.trigger = 3;
                break;
            default:
                if (typeof d.trigger === "number" && (d.trigger | 0) === d.trigger)
                    m.trigger = d.trigger;
            }
            if (d.limitSharingSettingTimestamp != null) {
                if ($util.Long)
                    m.limitSharingSettingTimestamp = $util.Long.fromValue(d.limitSharingSettingTimestamp, false);
                else if (typeof d.limitSharingSettingTimestamp === "string")
                    m.limitSharingSettingTimestamp = $parseInt(d.limitSharingSettingTimestamp, 10);
                else if (typeof d.limitSharingSettingTimestamp === "number")
                    m.limitSharingSettingTimestamp = d.limitSharingSettingTimestamp;
                else if (typeof d.limitSharingSettingTimestamp === "object")
                    m.limitSharingSettingTimestamp = new $util.LongBits(d.limitSharingSettingTimestamp.low >>> 0, d.limitSharingSettingTimestamp.high >>> 0).toNumber();
            }
            if (d.initiatedByMe != null) {
                m.initiatedByMe = $Boolean(d.initiatedByMe);
            }
            return m;
        };

        LimitSharing.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.sharingLimited != null && $Object.hasOwnProperty.call(m, "sharingLimited")) {
                d.sharingLimited = m.sharingLimited;
            }
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger")) {
                d.trigger = o.enums === $String ? $root.Protocol.LimitSharing.TriggerType[m.trigger] === $undefined ? m.trigger : $root.Protocol.LimitSharing.TriggerType[m.trigger] : m.trigger;
            }
            if (m.limitSharingSettingTimestamp != null && $Object.hasOwnProperty.call(m, "limitSharingSettingTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.limitSharingSettingTimestamp = typeof m.limitSharingSettingTimestamp === "number" ? $BigInt(m.limitSharingSettingTimestamp) : $util.Long.fromBits(m.limitSharingSettingTimestamp.low >>> 0, m.limitSharingSettingTimestamp.high >>> 0, false).toBigInt();
                else if (typeof m.limitSharingSettingTimestamp === "number")
                    d.limitSharingSettingTimestamp = o.longs === $String ? $String(m.limitSharingSettingTimestamp) : m.limitSharingSettingTimestamp;
                else
                    d.limitSharingSettingTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.limitSharingSettingTimestamp) : o.longs === $Number ? new $util.LongBits(m.limitSharingSettingTimestamp.low >>> 0, m.limitSharingSettingTimestamp.high >>> 0).toNumber() : m.limitSharingSettingTimestamp;
            }
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe")) {
                d.initiatedByMe = m.initiatedByMe;
            }
            return d;
        };

        LimitSharing.prototype.toJSON = function() {
            return LimitSharing.toObject(this, $protobuf.util.toJSONOptions);
        };

        LimitSharing.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Protocol.LimitSharing";
        };

        LimitSharing.TriggerType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "CHAT_SETTING"] = 1;
            values[valuesById[2] = "BIZ_SUPPORTS_FB_HOSTING"] = 2;
            values[valuesById[3] = "UNKNOWN_GROUP"] = 3;
            return values;
        })();

        return LimitSharing;
    })();

    Protocol.MessageKey = (function() {

        const MessageKey = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        MessageKey.prototype.remoteJid = null;
        MessageKey.prototype.fromMe = null;
        MessageKey.prototype.id = null;
        MessageKey.prototype.participant = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_remoteJid", {
            get: $util.oneOfGetter($oneOfFields = ["remoteJid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_fromMe", {
            get: $util.oneOfGetter($oneOfFields = ["fromMe"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_id", {
            get: $util.oneOfGetter($oneOfFields = ["id"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_participant", {
            get: $util.oneOfGetter($oneOfFields = ["participant"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        MessageKey.create = function(properties) {
            return new MessageKey(properties);
        };

        MessageKey.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.remoteJid != null && $Object.hasOwnProperty.call(m, "remoteJid"))
                w.uint32(10).string(m.remoteJid);
            if (m.fromMe != null && $Object.hasOwnProperty.call(m, "fromMe"))
                w.uint32(16).bool(m.fromMe);
            if (m.id != null && $Object.hasOwnProperty.call(m, "id"))
                w.uint32(26).string(m.id);
            if (m.participant != null && $Object.hasOwnProperty.call(m, "participant"))
                w.uint32(34).string(m.participant);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        MessageKey.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.Protocol.MessageKey();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.remoteJid = r.stringVerify();
                        m._remoteJid = "remoteJid";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.fromMe = r.bool();
                        m._fromMe = "fromMe";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.id = r.stringVerify();
                        m._id = "id";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.participant = r.stringVerify();
                        m._participant = "participant";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        MessageKey.fromObject = function (d, q) {
            if (d instanceof $root.Protocol.MessageKey)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Protocol.MessageKey: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Protocol.MessageKey();
            if (d.remoteJid != null) {
                m.remoteJid = $String(d.remoteJid);
            }
            if (d.fromMe != null) {
                m.fromMe = $Boolean(d.fromMe);
            }
            if (d.id != null) {
                m.id = $String(d.id);
            }
            if (d.participant != null) {
                m.participant = $String(d.participant);
            }
            return m;
        };

        MessageKey.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.remoteJid != null && $Object.hasOwnProperty.call(m, "remoteJid")) {
                d.remoteJid = m.remoteJid;
            }
            if (m.fromMe != null && $Object.hasOwnProperty.call(m, "fromMe")) {
                d.fromMe = m.fromMe;
            }
            if (m.id != null && $Object.hasOwnProperty.call(m, "id")) {
                d.id = m.id;
            }
            if (m.participant != null && $Object.hasOwnProperty.call(m, "participant")) {
                d.participant = m.participant;
            }
            return d;
        };

        MessageKey.prototype.toJSON = function() {
            return MessageKey.toObject(this, $protobuf.util.toJSONOptions);
        };

        MessageKey.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Protocol.MessageKey";
        };

        return MessageKey;
    })();

    return Protocol;
})();

export {
  $root as default
};
