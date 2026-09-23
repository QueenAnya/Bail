import * as $protobuf from "protobufjs";
import Long = require("long");

export namespace SyncAction {

    interface IPatchDebugData extends SyncAction.PatchDebugData.$Properties {
    }

    class PatchDebugData {
        constructor(p?: SyncAction.PatchDebugData.$Properties);
        $unknowns?: Uint8Array[];
        currentLthash?: (Uint8Array|null);
        newLthash?: (Uint8Array|null);
        patchVersion?: (Uint8Array|null);
        collectionName?: (Uint8Array|null);
        firstFourBytesFromAHashOfSnapshotMacKey?: (Uint8Array|null);
        newLthashSubtract?: (Uint8Array|null);
        numberAdd?: (number|null);
        numberRemove?: (number|null);
        numberOverride?: (number|null);
        senderPlatform?: (SyncAction.PatchDebugData.Platform|null);
        isSenderPrimary?: (boolean|null);
        static create(properties: SyncAction.PatchDebugData.$Shape): SyncAction.PatchDebugData & SyncAction.PatchDebugData.$Shape;
        static create(properties?: SyncAction.PatchDebugData.$Properties): SyncAction.PatchDebugData;
        static encode(m: SyncAction.PatchDebugData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.PatchDebugData & SyncAction.PatchDebugData.$Shape;
        static fromObject(d: { [k: string]: any }): SyncAction.PatchDebugData;
        static toObject(m: SyncAction.PatchDebugData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace PatchDebugData {
        interface $Properties {
            currentLthash?: (Uint8Array|null);
            newLthash?: (Uint8Array|null);
            patchVersion?: (Uint8Array|null);
            collectionName?: (Uint8Array|null);
            firstFourBytesFromAHashOfSnapshotMacKey?: (Uint8Array|null);
            newLthashSubtract?: (Uint8Array|null);
            numberAdd?: (number|null);
            numberRemove?: (number|null);
            numberOverride?: (number|null);
            senderPlatform?: (SyncAction.PatchDebugData.Platform|null);
            isSenderPrimary?: (boolean|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = SyncAction.PatchDebugData.$Properties;

        enum Platform {
            ANDROID = 0,
            SMBA = 1,
            IPHONE = 2,
            SMBI = 3,
            WEB = 4,
            UWP = 5,
            DARWIN = 6,
            IPAD = 7,
            WEAROS = 8,
            WASG = 9,
            WEARM = 10,
            CAPI = 11
        }
    }

    interface ISyncActionData extends SyncAction.SyncActionData.$Properties {
    }

    class SyncActionData {
        constructor(p?: SyncAction.SyncActionData.$Properties);
        $unknowns?: Uint8Array[];
        index?: (Uint8Array|null);
        value?: (SyncAction.SyncActionValue.$Properties|null);
        padding?: (Uint8Array|null);
        version?: (number|null);
        static create(properties: SyncAction.SyncActionData.$Shape): SyncAction.SyncActionData & SyncAction.SyncActionData.$Shape;
        static create(properties?: SyncAction.SyncActionData.$Properties): SyncAction.SyncActionData;
        static encode(m: SyncAction.SyncActionData.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionData & SyncAction.SyncActionData.$Shape;
        static fromObject(d: { [k: string]: any }): SyncAction.SyncActionData;
        static toObject(m: SyncAction.SyncActionData, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncActionData {
        interface $Properties {
            index?: (Uint8Array|null);
            value?: (SyncAction.SyncActionValue.$Properties|null);
            padding?: (Uint8Array|null);
            version?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          index?: Uint8Array|null;
          value?: SyncAction.SyncActionValue.$Shape|null;
          padding?: Uint8Array|null;
          version?: number|null;
          $unknowns?: Uint8Array[];
        };
    }

    interface ISyncActionValue extends SyncAction.SyncActionValue.$Properties {
    }

    class SyncActionValue {
        constructor(p?: SyncAction.SyncActionValue.$Properties);
        $unknowns?: Uint8Array[];
        timestamp?: (number|Long|null);
        starAction?: (SyncAction.SyncActionValue.StarAction.$Properties|null);
        contactAction?: (SyncAction.SyncActionValue.ContactAction.$Properties|null);
        muteAction?: (SyncAction.SyncActionValue.MuteAction.$Properties|null);
        pinAction?: (SyncAction.SyncActionValue.PinAction.$Properties|null);
        pushNameSetting?: (SyncAction.SyncActionValue.PushNameSetting.$Properties|null);
        quickReplyAction?: (SyncAction.SyncActionValue.QuickReplyAction.$Properties|null);
        recentEmojiWeightsAction?: (SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Properties|null);
        labelEditAction?: (SyncAction.SyncActionValue.LabelEditAction.$Properties|null);
        labelAssociationAction?: (SyncAction.SyncActionValue.LabelAssociationAction.$Properties|null);
        localeSetting?: (SyncAction.SyncActionValue.LocaleSetting.$Properties|null);
        archiveChatAction?: (SyncAction.SyncActionValue.ArchiveChatAction.$Properties|null);
        deleteMessageForMeAction?: (SyncAction.SyncActionValue.DeleteMessageForMeAction.$Properties|null);
        keyExpiration?: (SyncAction.SyncActionValue.KeyExpiration.$Properties|null);
        markChatAsReadAction?: (SyncAction.SyncActionValue.MarkChatAsReadAction.$Properties|null);
        clearChatAction?: (SyncAction.SyncActionValue.ClearChatAction.$Properties|null);
        deleteChatAction?: (SyncAction.SyncActionValue.DeleteChatAction.$Properties|null);
        unarchiveChatsSetting?: (SyncAction.SyncActionValue.UnarchiveChatsSetting.$Properties|null);
        primaryFeature?: (SyncAction.SyncActionValue.PrimaryFeature.$Properties|null);
        androidUnsupportedActions?: (SyncAction.SyncActionValue.AndroidUnsupportedActions.$Properties|null);
        agentAction?: (SyncAction.SyncActionValue.AgentAction.$Properties|null);
        subscriptionAction?: (SyncAction.SyncActionValue.SubscriptionAction.$Properties|null);
        userStatusMuteAction?: (SyncAction.SyncActionValue.UserStatusMuteAction.$Properties|null);
        timeFormatAction?: (SyncAction.SyncActionValue.TimeFormatAction.$Properties|null);
        nuxAction?: (SyncAction.SyncActionValue.NuxAction.$Properties|null);
        primaryVersionAction?: (SyncAction.SyncActionValue.PrimaryVersionAction.$Properties|null);
        stickerAction?: (SyncAction.SyncActionValue.StickerAction.$Properties|null);
        removeRecentStickerAction?: (SyncAction.SyncActionValue.RemoveRecentStickerAction.$Properties|null);
        chatAssignment?: (SyncAction.SyncActionValue.ChatAssignmentAction.$Properties|null);
        chatAssignmentOpenedStatus?: (SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Properties|null);
        pnForLidChatAction?: (SyncAction.SyncActionValue.PnForLidChatAction.$Properties|null);
        marketingMessageAction?: (SyncAction.SyncActionValue.MarketingMessageAction.$Properties|null);
        marketingMessageBroadcastAction?: (SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Properties|null);
        externalWebBetaAction?: (SyncAction.SyncActionValue.ExternalWebBetaAction.$Properties|null);
        privacySettingRelayAllCalls?: (SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Properties|null);
        callLogAction?: (SyncAction.SyncActionValue.CallLogAction.$Properties|null);
        ugcBot?: (SyncAction.SyncActionValue.UGCBot.$Properties|null);
        statusPrivacy?: (SyncAction.SyncActionValue.StatusPrivacyAction.$Properties|null);
        botWelcomeRequestAction?: (SyncAction.SyncActionValue.BotWelcomeRequestAction.$Properties|null);
        deleteIndividualCallLog?: (SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Properties|null);
        labelReorderingAction?: (SyncAction.SyncActionValue.LabelReorderingAction.$Properties|null);
        paymentInfoAction?: (SyncAction.SyncActionValue.PaymentInfoAction.$Properties|null);
        customPaymentMethodsAction?: (SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Properties|null);
        lockChatAction?: (SyncAction.SyncActionValue.LockChatAction.$Properties|null);
        chatLockSettings?: (ChatLockSettings.ChatLockSettings.$Properties|null);
        wamoUserIdentifierAction?: (SyncAction.SyncActionValue.WamoUserIdentifierAction.$Properties|null);
        privacySettingDisableLinkPreviewsAction?: (SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Properties|null);
        deviceCapabilities?: (DeviceCapabilities.DeviceCapabilities.$Properties|null);
        noteEditAction?: (SyncAction.SyncActionValue.NoteEditAction.$Properties|null);
        favoritesAction?: (SyncAction.SyncActionValue.FavoritesAction.$Properties|null);
        merchantPaymentPartnerAction?: (SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Properties|null);
        waffleAccountLinkStateAction?: (SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Properties|null);
        usernameChatStartMode?: (SyncAction.SyncActionValue.UsernameChatStartModeAction.$Properties|null);
        notificationActivitySettingAction?: (SyncAction.SyncActionValue.NotificationActivitySettingAction.$Properties|null);
        lidContactAction?: (SyncAction.SyncActionValue.LidContactAction.$Properties|null);
        ctwaPerCustomerDataSharingAction?: (SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Properties|null);
        paymentTosAction?: (SyncAction.SyncActionValue.PaymentTosAction.$Properties|null);
        privacySettingChannelsPersonalisedRecommendationAction?: (SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Properties|null);
        detectedOutcomesStatusAction?: (SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Properties|null);
        maibaAiFeaturesControlAction?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Properties|null);
        businessBroadcastListAction?: (SyncAction.SyncActionValue.BusinessBroadcastListAction.$Properties|null);
        musicUserIdAction?: (SyncAction.SyncActionValue.MusicUserIdAction.$Properties|null);
        statusPostOptInNotificationPreferencesAction?: (SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Properties|null);
        avatarUpdatedAction?: (SyncAction.SyncActionValue.AvatarUpdatedAction.$Properties|null);
        privateProcessingSettingAction?: (SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Properties|null);
        newsletterSavedInterestsAction?: (SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Properties|null);
        aiThreadRenameAction?: (SyncAction.SyncActionValue.AiThreadRenameAction.$Properties|null);
        interactiveMessageAction?: (SyncAction.SyncActionValue.InteractiveMessageAction.$Properties|null);
        settingsSyncAction?: (SyncAction.SyncActionValue.SettingsSyncAction.$Properties|null);
        outContactAction?: (SyncAction.SyncActionValue.OutContactAction.$Properties|null);
        nctSaltSyncAction?: (SyncAction.SyncActionValue.NctSaltSyncAction.$Properties|null);
        businessBroadcastCampaignAction?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Properties|null);
        businessBroadcastInsightsAction?: (SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Properties|null);
        customerDataAction?: (SyncAction.SyncActionValue.CustomerDataAction.$Properties|null);
        subscriptionsSyncV2Action?: (SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Properties|null);
        threadPinAction?: (SyncAction.SyncActionValue.ThreadPinAction.$Properties|null);
        autoOrganizeBusinessChatSetting?: (SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Properties|null);
        bizAiSettingsNudgeAction?: (SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Properties|null);
        coexV2VersionAction?: (SyncAction.SyncActionValue.CoexV2VersionAction.$Properties|null);
        wasaRootSecretAction?: (SyncAction.SyncActionValue.WASARootSecretAction.$Properties|null);
        bubbleLockMessageAction?: (SyncAction.SyncActionValue.BubbleLockMessageAction.$Properties|null);
        labelSublistAction?: (SyncAction.SyncActionValue.LabelSublistAction.$Properties|null);
        deviceCapabilitiesV2?: (DeviceCapabilities.DeviceCapabilities.$Properties|null);
        ctwaMessageReceivedAction?: (SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Properties|null);
        sharedDeviceAllowlistAction?: (SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Properties|null);
        contactManagerMetadataAction?: (SyncAction.SyncActionValue.ContactManagerMetadataAction.$Properties|null);
        businessFolderActivationAction?: (SyncAction.SyncActionValue.BusinessFolderActivationAction.$Properties|null);
        static create(properties: SyncAction.SyncActionValue.$Shape): SyncAction.SyncActionValue & SyncAction.SyncActionValue.$Shape;
        static create(properties?: SyncAction.SyncActionValue.$Properties): SyncAction.SyncActionValue;
        static encode(m: SyncAction.SyncActionValue.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue & SyncAction.SyncActionValue.$Shape;
        static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue;
        static toObject(m: SyncAction.SyncActionValue, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace SyncActionValue {
        interface $Properties {
            timestamp?: (number|Long|null);
            starAction?: (SyncAction.SyncActionValue.StarAction.$Properties|null);
            contactAction?: (SyncAction.SyncActionValue.ContactAction.$Properties|null);
            muteAction?: (SyncAction.SyncActionValue.MuteAction.$Properties|null);
            pinAction?: (SyncAction.SyncActionValue.PinAction.$Properties|null);
            pushNameSetting?: (SyncAction.SyncActionValue.PushNameSetting.$Properties|null);
            quickReplyAction?: (SyncAction.SyncActionValue.QuickReplyAction.$Properties|null);
            recentEmojiWeightsAction?: (SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Properties|null);
            labelEditAction?: (SyncAction.SyncActionValue.LabelEditAction.$Properties|null);
            labelAssociationAction?: (SyncAction.SyncActionValue.LabelAssociationAction.$Properties|null);
            localeSetting?: (SyncAction.SyncActionValue.LocaleSetting.$Properties|null);
            archiveChatAction?: (SyncAction.SyncActionValue.ArchiveChatAction.$Properties|null);
            deleteMessageForMeAction?: (SyncAction.SyncActionValue.DeleteMessageForMeAction.$Properties|null);
            keyExpiration?: (SyncAction.SyncActionValue.KeyExpiration.$Properties|null);
            markChatAsReadAction?: (SyncAction.SyncActionValue.MarkChatAsReadAction.$Properties|null);
            clearChatAction?: (SyncAction.SyncActionValue.ClearChatAction.$Properties|null);
            deleteChatAction?: (SyncAction.SyncActionValue.DeleteChatAction.$Properties|null);
            unarchiveChatsSetting?: (SyncAction.SyncActionValue.UnarchiveChatsSetting.$Properties|null);
            primaryFeature?: (SyncAction.SyncActionValue.PrimaryFeature.$Properties|null);
            androidUnsupportedActions?: (SyncAction.SyncActionValue.AndroidUnsupportedActions.$Properties|null);
            agentAction?: (SyncAction.SyncActionValue.AgentAction.$Properties|null);
            subscriptionAction?: (SyncAction.SyncActionValue.SubscriptionAction.$Properties|null);
            userStatusMuteAction?: (SyncAction.SyncActionValue.UserStatusMuteAction.$Properties|null);
            timeFormatAction?: (SyncAction.SyncActionValue.TimeFormatAction.$Properties|null);
            nuxAction?: (SyncAction.SyncActionValue.NuxAction.$Properties|null);
            primaryVersionAction?: (SyncAction.SyncActionValue.PrimaryVersionAction.$Properties|null);
            stickerAction?: (SyncAction.SyncActionValue.StickerAction.$Properties|null);
            removeRecentStickerAction?: (SyncAction.SyncActionValue.RemoveRecentStickerAction.$Properties|null);
            chatAssignment?: (SyncAction.SyncActionValue.ChatAssignmentAction.$Properties|null);
            chatAssignmentOpenedStatus?: (SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Properties|null);
            pnForLidChatAction?: (SyncAction.SyncActionValue.PnForLidChatAction.$Properties|null);
            marketingMessageAction?: (SyncAction.SyncActionValue.MarketingMessageAction.$Properties|null);
            marketingMessageBroadcastAction?: (SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Properties|null);
            externalWebBetaAction?: (SyncAction.SyncActionValue.ExternalWebBetaAction.$Properties|null);
            privacySettingRelayAllCalls?: (SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Properties|null);
            callLogAction?: (SyncAction.SyncActionValue.CallLogAction.$Properties|null);
            ugcBot?: (SyncAction.SyncActionValue.UGCBot.$Properties|null);
            statusPrivacy?: (SyncAction.SyncActionValue.StatusPrivacyAction.$Properties|null);
            botWelcomeRequestAction?: (SyncAction.SyncActionValue.BotWelcomeRequestAction.$Properties|null);
            deleteIndividualCallLog?: (SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Properties|null);
            labelReorderingAction?: (SyncAction.SyncActionValue.LabelReorderingAction.$Properties|null);
            paymentInfoAction?: (SyncAction.SyncActionValue.PaymentInfoAction.$Properties|null);
            customPaymentMethodsAction?: (SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Properties|null);
            lockChatAction?: (SyncAction.SyncActionValue.LockChatAction.$Properties|null);
            chatLockSettings?: (ChatLockSettings.ChatLockSettings.$Properties|null);
            wamoUserIdentifierAction?: (SyncAction.SyncActionValue.WamoUserIdentifierAction.$Properties|null);
            privacySettingDisableLinkPreviewsAction?: (SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Properties|null);
            deviceCapabilities?: (DeviceCapabilities.DeviceCapabilities.$Properties|null);
            noteEditAction?: (SyncAction.SyncActionValue.NoteEditAction.$Properties|null);
            favoritesAction?: (SyncAction.SyncActionValue.FavoritesAction.$Properties|null);
            merchantPaymentPartnerAction?: (SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Properties|null);
            waffleAccountLinkStateAction?: (SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Properties|null);
            usernameChatStartMode?: (SyncAction.SyncActionValue.UsernameChatStartModeAction.$Properties|null);
            notificationActivitySettingAction?: (SyncAction.SyncActionValue.NotificationActivitySettingAction.$Properties|null);
            lidContactAction?: (SyncAction.SyncActionValue.LidContactAction.$Properties|null);
            ctwaPerCustomerDataSharingAction?: (SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Properties|null);
            paymentTosAction?: (SyncAction.SyncActionValue.PaymentTosAction.$Properties|null);
            privacySettingChannelsPersonalisedRecommendationAction?: (SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Properties|null);
            detectedOutcomesStatusAction?: (SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Properties|null);
            maibaAiFeaturesControlAction?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Properties|null);
            businessBroadcastListAction?: (SyncAction.SyncActionValue.BusinessBroadcastListAction.$Properties|null);
            musicUserIdAction?: (SyncAction.SyncActionValue.MusicUserIdAction.$Properties|null);
            statusPostOptInNotificationPreferencesAction?: (SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Properties|null);
            avatarUpdatedAction?: (SyncAction.SyncActionValue.AvatarUpdatedAction.$Properties|null);
            privateProcessingSettingAction?: (SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Properties|null);
            newsletterSavedInterestsAction?: (SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Properties|null);
            aiThreadRenameAction?: (SyncAction.SyncActionValue.AiThreadRenameAction.$Properties|null);
            interactiveMessageAction?: (SyncAction.SyncActionValue.InteractiveMessageAction.$Properties|null);
            settingsSyncAction?: (SyncAction.SyncActionValue.SettingsSyncAction.$Properties|null);
            outContactAction?: (SyncAction.SyncActionValue.OutContactAction.$Properties|null);
            nctSaltSyncAction?: (SyncAction.SyncActionValue.NctSaltSyncAction.$Properties|null);
            businessBroadcastCampaignAction?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Properties|null);
            businessBroadcastInsightsAction?: (SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Properties|null);
            customerDataAction?: (SyncAction.SyncActionValue.CustomerDataAction.$Properties|null);
            subscriptionsSyncV2Action?: (SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Properties|null);
            threadPinAction?: (SyncAction.SyncActionValue.ThreadPinAction.$Properties|null);
            autoOrganizeBusinessChatSetting?: (SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Properties|null);
            bizAiSettingsNudgeAction?: (SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Properties|null);
            coexV2VersionAction?: (SyncAction.SyncActionValue.CoexV2VersionAction.$Properties|null);
            wasaRootSecretAction?: (SyncAction.SyncActionValue.WASARootSecretAction.$Properties|null);
            bubbleLockMessageAction?: (SyncAction.SyncActionValue.BubbleLockMessageAction.$Properties|null);
            labelSublistAction?: (SyncAction.SyncActionValue.LabelSublistAction.$Properties|null);
            deviceCapabilitiesV2?: (DeviceCapabilities.DeviceCapabilities.$Properties|null);
            ctwaMessageReceivedAction?: (SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Properties|null);
            sharedDeviceAllowlistAction?: (SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Properties|null);
            contactManagerMetadataAction?: (SyncAction.SyncActionValue.ContactManagerMetadataAction.$Properties|null);
            businessFolderActivationAction?: (SyncAction.SyncActionValue.BusinessFolderActivationAction.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          timestamp?: number|Long|null;
          starAction?: SyncAction.SyncActionValue.StarAction.$Shape|null;
          contactAction?: SyncAction.SyncActionValue.ContactAction.$Shape|null;
          muteAction?: SyncAction.SyncActionValue.MuteAction.$Shape|null;
          pinAction?: SyncAction.SyncActionValue.PinAction.$Shape|null;
          pushNameSetting?: SyncAction.SyncActionValue.PushNameSetting.$Shape|null;
          quickReplyAction?: SyncAction.SyncActionValue.QuickReplyAction.$Shape|null;
          recentEmojiWeightsAction?: SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Shape|null;
          labelEditAction?: SyncAction.SyncActionValue.LabelEditAction.$Shape|null;
          labelAssociationAction?: SyncAction.SyncActionValue.LabelAssociationAction.$Shape|null;
          localeSetting?: SyncAction.SyncActionValue.LocaleSetting.$Shape|null;
          archiveChatAction?: SyncAction.SyncActionValue.ArchiveChatAction.$Shape|null;
          deleteMessageForMeAction?: SyncAction.SyncActionValue.DeleteMessageForMeAction.$Shape|null;
          keyExpiration?: SyncAction.SyncActionValue.KeyExpiration.$Shape|null;
          markChatAsReadAction?: SyncAction.SyncActionValue.MarkChatAsReadAction.$Shape|null;
          clearChatAction?: SyncAction.SyncActionValue.ClearChatAction.$Shape|null;
          deleteChatAction?: SyncAction.SyncActionValue.DeleteChatAction.$Shape|null;
          unarchiveChatsSetting?: SyncAction.SyncActionValue.UnarchiveChatsSetting.$Shape|null;
          primaryFeature?: SyncAction.SyncActionValue.PrimaryFeature.$Shape|null;
          androidUnsupportedActions?: SyncAction.SyncActionValue.AndroidUnsupportedActions.$Shape|null;
          agentAction?: SyncAction.SyncActionValue.AgentAction.$Shape|null;
          subscriptionAction?: SyncAction.SyncActionValue.SubscriptionAction.$Shape|null;
          userStatusMuteAction?: SyncAction.SyncActionValue.UserStatusMuteAction.$Shape|null;
          timeFormatAction?: SyncAction.SyncActionValue.TimeFormatAction.$Shape|null;
          nuxAction?: SyncAction.SyncActionValue.NuxAction.$Shape|null;
          primaryVersionAction?: SyncAction.SyncActionValue.PrimaryVersionAction.$Shape|null;
          stickerAction?: SyncAction.SyncActionValue.StickerAction.$Shape|null;
          removeRecentStickerAction?: SyncAction.SyncActionValue.RemoveRecentStickerAction.$Shape|null;
          chatAssignment?: SyncAction.SyncActionValue.ChatAssignmentAction.$Shape|null;
          chatAssignmentOpenedStatus?: SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Shape|null;
          pnForLidChatAction?: SyncAction.SyncActionValue.PnForLidChatAction.$Shape|null;
          marketingMessageAction?: SyncAction.SyncActionValue.MarketingMessageAction.$Shape|null;
          marketingMessageBroadcastAction?: SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Shape|null;
          externalWebBetaAction?: SyncAction.SyncActionValue.ExternalWebBetaAction.$Shape|null;
          privacySettingRelayAllCalls?: SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Shape|null;
          callLogAction?: SyncAction.SyncActionValue.CallLogAction.$Shape|null;
          ugcBot?: SyncAction.SyncActionValue.UGCBot.$Shape|null;
          statusPrivacy?: SyncAction.SyncActionValue.StatusPrivacyAction.$Shape|null;
          botWelcomeRequestAction?: SyncAction.SyncActionValue.BotWelcomeRequestAction.$Shape|null;
          deleteIndividualCallLog?: SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Shape|null;
          labelReorderingAction?: SyncAction.SyncActionValue.LabelReorderingAction.$Shape|null;
          paymentInfoAction?: SyncAction.SyncActionValue.PaymentInfoAction.$Shape|null;
          customPaymentMethodsAction?: SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Shape|null;
          lockChatAction?: SyncAction.SyncActionValue.LockChatAction.$Shape|null;
          chatLockSettings?: ChatLockSettings.ChatLockSettings.$Shape|null;
          wamoUserIdentifierAction?: SyncAction.SyncActionValue.WamoUserIdentifierAction.$Shape|null;
          privacySettingDisableLinkPreviewsAction?: SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Shape|null;
          deviceCapabilities?: DeviceCapabilities.DeviceCapabilities.$Shape|null;
          noteEditAction?: SyncAction.SyncActionValue.NoteEditAction.$Shape|null;
          favoritesAction?: SyncAction.SyncActionValue.FavoritesAction.$Shape|null;
          merchantPaymentPartnerAction?: SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Shape|null;
          waffleAccountLinkStateAction?: SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Shape|null;
          usernameChatStartMode?: SyncAction.SyncActionValue.UsernameChatStartModeAction.$Shape|null;
          notificationActivitySettingAction?: SyncAction.SyncActionValue.NotificationActivitySettingAction.$Shape|null;
          lidContactAction?: SyncAction.SyncActionValue.LidContactAction.$Shape|null;
          ctwaPerCustomerDataSharingAction?: SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Shape|null;
          paymentTosAction?: SyncAction.SyncActionValue.PaymentTosAction.$Shape|null;
          privacySettingChannelsPersonalisedRecommendationAction?: SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Shape|null;
          detectedOutcomesStatusAction?: SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Shape|null;
          maibaAiFeaturesControlAction?: SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Shape|null;
          businessBroadcastListAction?: SyncAction.SyncActionValue.BusinessBroadcastListAction.$Shape|null;
          musicUserIdAction?: SyncAction.SyncActionValue.MusicUserIdAction.$Shape|null;
          statusPostOptInNotificationPreferencesAction?: SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Shape|null;
          avatarUpdatedAction?: SyncAction.SyncActionValue.AvatarUpdatedAction.$Shape|null;
          privateProcessingSettingAction?: SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Shape|null;
          newsletterSavedInterestsAction?: SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Shape|null;
          aiThreadRenameAction?: SyncAction.SyncActionValue.AiThreadRenameAction.$Shape|null;
          interactiveMessageAction?: SyncAction.SyncActionValue.InteractiveMessageAction.$Shape|null;
          settingsSyncAction?: SyncAction.SyncActionValue.SettingsSyncAction.$Shape|null;
          outContactAction?: SyncAction.SyncActionValue.OutContactAction.$Shape|null;
          nctSaltSyncAction?: SyncAction.SyncActionValue.NctSaltSyncAction.$Shape|null;
          businessBroadcastCampaignAction?: SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Shape|null;
          businessBroadcastInsightsAction?: SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Shape|null;
          customerDataAction?: SyncAction.SyncActionValue.CustomerDataAction.$Shape|null;
          subscriptionsSyncV2Action?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Shape|null;
          threadPinAction?: SyncAction.SyncActionValue.ThreadPinAction.$Shape|null;
          autoOrganizeBusinessChatSetting?: SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Shape|null;
          bizAiSettingsNudgeAction?: SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Shape|null;
          coexV2VersionAction?: SyncAction.SyncActionValue.CoexV2VersionAction.$Shape|null;
          wasaRootSecretAction?: SyncAction.SyncActionValue.WASARootSecretAction.$Shape|null;
          bubbleLockMessageAction?: SyncAction.SyncActionValue.BubbleLockMessageAction.$Shape|null;
          labelSublistAction?: SyncAction.SyncActionValue.LabelSublistAction.$Shape|null;
          deviceCapabilitiesV2?: DeviceCapabilities.DeviceCapabilities.$Shape|null;
          ctwaMessageReceivedAction?: SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Shape|null;
          sharedDeviceAllowlistAction?: SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Shape|null;
          contactManagerMetadataAction?: SyncAction.SyncActionValue.ContactManagerMetadataAction.$Shape|null;
          businessFolderActivationAction?: SyncAction.SyncActionValue.BusinessFolderActivationAction.$Shape|null;
          $unknowns?: Uint8Array[];
        };

        interface IAgentAction extends SyncAction.SyncActionValue.AgentAction.$Properties {
        }

        class AgentAction {
            constructor(p?: SyncAction.SyncActionValue.AgentAction.$Properties);
            $unknowns?: Uint8Array[];
            name?: (string|null);
            deviceId?: (number|null);
            isDeleted?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.AgentAction.$Shape): SyncAction.SyncActionValue.AgentAction & SyncAction.SyncActionValue.AgentAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.AgentAction.$Properties): SyncAction.SyncActionValue.AgentAction;
            static encode(m: SyncAction.SyncActionValue.AgentAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.AgentAction & SyncAction.SyncActionValue.AgentAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.AgentAction;
            static toObject(m: SyncAction.SyncActionValue.AgentAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AgentAction {
            interface $Properties {
                name?: (string|null);
                deviceId?: (number|null);
                isDeleted?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.AgentAction.$Properties;
        }

        interface IAiThreadRenameAction extends SyncAction.SyncActionValue.AiThreadRenameAction.$Properties {
        }

        class AiThreadRenameAction {
            constructor(p?: SyncAction.SyncActionValue.AiThreadRenameAction.$Properties);
            $unknowns?: Uint8Array[];
            newTitle?: (string|null);
            static create(properties: SyncAction.SyncActionValue.AiThreadRenameAction.$Shape): SyncAction.SyncActionValue.AiThreadRenameAction & SyncAction.SyncActionValue.AiThreadRenameAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.AiThreadRenameAction.$Properties): SyncAction.SyncActionValue.AiThreadRenameAction;
            static encode(m: SyncAction.SyncActionValue.AiThreadRenameAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.AiThreadRenameAction & SyncAction.SyncActionValue.AiThreadRenameAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.AiThreadRenameAction;
            static toObject(m: SyncAction.SyncActionValue.AiThreadRenameAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AiThreadRenameAction {
            interface $Properties {
                newTitle?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.AiThreadRenameAction.$Properties;
        }

        interface IAndroidUnsupportedActions extends SyncAction.SyncActionValue.AndroidUnsupportedActions.$Properties {
        }

        class AndroidUnsupportedActions {
            constructor(p?: SyncAction.SyncActionValue.AndroidUnsupportedActions.$Properties);
            $unknowns?: Uint8Array[];
            allowed?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.AndroidUnsupportedActions.$Shape): SyncAction.SyncActionValue.AndroidUnsupportedActions & SyncAction.SyncActionValue.AndroidUnsupportedActions.$Shape;
            static create(properties?: SyncAction.SyncActionValue.AndroidUnsupportedActions.$Properties): SyncAction.SyncActionValue.AndroidUnsupportedActions;
            static encode(m: SyncAction.SyncActionValue.AndroidUnsupportedActions.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.AndroidUnsupportedActions & SyncAction.SyncActionValue.AndroidUnsupportedActions.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.AndroidUnsupportedActions;
            static toObject(m: SyncAction.SyncActionValue.AndroidUnsupportedActions, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AndroidUnsupportedActions {
            interface $Properties {
                allowed?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.AndroidUnsupportedActions.$Properties;
        }

        interface IArchiveChatAction extends SyncAction.SyncActionValue.ArchiveChatAction.$Properties {
        }

        class ArchiveChatAction {
            constructor(p?: SyncAction.SyncActionValue.ArchiveChatAction.$Properties);
            $unknowns?: Uint8Array[];
            archived?: (boolean|null);
            messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
            static create(properties: SyncAction.SyncActionValue.ArchiveChatAction.$Shape): SyncAction.SyncActionValue.ArchiveChatAction & SyncAction.SyncActionValue.ArchiveChatAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ArchiveChatAction.$Properties): SyncAction.SyncActionValue.ArchiveChatAction;
            static encode(m: SyncAction.SyncActionValue.ArchiveChatAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ArchiveChatAction & SyncAction.SyncActionValue.ArchiveChatAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ArchiveChatAction;
            static toObject(m: SyncAction.SyncActionValue.ArchiveChatAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ArchiveChatAction {
            interface $Properties {
                archived?: (boolean|null);
                messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ArchiveChatAction.$Properties;
        }

        interface IAutoOrganizeBusinessChatSetting extends SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Properties {
        }

        class AutoOrganizeBusinessChatSetting {
            constructor(p?: SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Properties);
            $unknowns?: Uint8Array[];
            autoOrganize?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Shape): SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting & SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Shape;
            static create(properties?: SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Properties): SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting;
            static encode(m: SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting & SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting;
            static toObject(m: SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AutoOrganizeBusinessChatSetting {
            interface $Properties {
                autoOrganize?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.AutoOrganizeBusinessChatSetting.$Properties;
        }

        interface IAvatarUpdatedAction extends SyncAction.SyncActionValue.AvatarUpdatedAction.$Properties {
        }

        class AvatarUpdatedAction {
            constructor(p?: SyncAction.SyncActionValue.AvatarUpdatedAction.$Properties);
            $unknowns?: Uint8Array[];
            eventType?: (SyncAction.SyncActionValue.AvatarUpdatedAction.AvatarEventType|null);
            recentAvatarStickers: SyncAction.SyncActionValue.StickerAction.$Properties[];
            static create(properties: SyncAction.SyncActionValue.AvatarUpdatedAction.$Shape): SyncAction.SyncActionValue.AvatarUpdatedAction & SyncAction.SyncActionValue.AvatarUpdatedAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.AvatarUpdatedAction.$Properties): SyncAction.SyncActionValue.AvatarUpdatedAction;
            static encode(m: SyncAction.SyncActionValue.AvatarUpdatedAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.AvatarUpdatedAction & SyncAction.SyncActionValue.AvatarUpdatedAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.AvatarUpdatedAction;
            static toObject(m: SyncAction.SyncActionValue.AvatarUpdatedAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AvatarUpdatedAction {
            interface $Properties {
                eventType?: (SyncAction.SyncActionValue.AvatarUpdatedAction.AvatarEventType|null);
                recentAvatarStickers?: (SyncAction.SyncActionValue.StickerAction.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.AvatarUpdatedAction.$Properties;

            enum AvatarEventType {
                UPDATED = 0,
                CREATED = 1,
                DELETED = 2
            }
        }

        interface IBizAISettingsNudgeAction extends SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Properties {
        }

        class BizAISettingsNudgeAction {
            constructor(p?: SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Properties);
            $unknowns?: Uint8Array[];
            category?: (SyncAction.SyncActionValue.BizAISettingsNudgeAction.BizAISettingsCategory|null);
            version?: (number|Long|null);
            updatedAtMs?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Shape): SyncAction.SyncActionValue.BizAISettingsNudgeAction & SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Properties): SyncAction.SyncActionValue.BizAISettingsNudgeAction;
            static encode(m: SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BizAISettingsNudgeAction & SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BizAISettingsNudgeAction;
            static toObject(m: SyncAction.SyncActionValue.BizAISettingsNudgeAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BizAISettingsNudgeAction {
            interface $Properties {
                category?: (SyncAction.SyncActionValue.BizAISettingsNudgeAction.BizAISettingsCategory|null);
                version?: (number|Long|null);
                updatedAtMs?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BizAISettingsNudgeAction.$Properties;

            enum BizAISettingsCategory {
                UNKNOWN = 0,
                INSTRUCTIONS = 1,
                RESPONSE_SETTINGS = 2,
                EXAMPLE_RESPONSES = 3,
                KNOWLEDGE = 4,
                LEAD_GEN = 5,
                HANDOFF_REMOVAL_TIMING = 6
            }
        }

        interface IBotWelcomeRequestAction extends SyncAction.SyncActionValue.BotWelcomeRequestAction.$Properties {
        }

        class BotWelcomeRequestAction {
            constructor(p?: SyncAction.SyncActionValue.BotWelcomeRequestAction.$Properties);
            $unknowns?: Uint8Array[];
            isSent?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.BotWelcomeRequestAction.$Shape): SyncAction.SyncActionValue.BotWelcomeRequestAction & SyncAction.SyncActionValue.BotWelcomeRequestAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BotWelcomeRequestAction.$Properties): SyncAction.SyncActionValue.BotWelcomeRequestAction;
            static encode(m: SyncAction.SyncActionValue.BotWelcomeRequestAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BotWelcomeRequestAction & SyncAction.SyncActionValue.BotWelcomeRequestAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BotWelcomeRequestAction;
            static toObject(m: SyncAction.SyncActionValue.BotWelcomeRequestAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BotWelcomeRequestAction {
            interface $Properties {
                isSent?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BotWelcomeRequestAction.$Properties;
        }

        interface IBroadcastListParticipant extends SyncAction.SyncActionValue.BroadcastListParticipant.$Properties {
        }

        class BroadcastListParticipant {
            constructor(p?: SyncAction.SyncActionValue.BroadcastListParticipant.$Properties);
            $unknowns?: Uint8Array[];
            lidJid?: (string|null);
            pnJid?: (string|null);
            static create(properties: SyncAction.SyncActionValue.BroadcastListParticipant.$Shape): SyncAction.SyncActionValue.BroadcastListParticipant & SyncAction.SyncActionValue.BroadcastListParticipant.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BroadcastListParticipant.$Properties): SyncAction.SyncActionValue.BroadcastListParticipant;
            static encode(m: SyncAction.SyncActionValue.BroadcastListParticipant.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BroadcastListParticipant & SyncAction.SyncActionValue.BroadcastListParticipant.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BroadcastListParticipant;
            static toObject(m: SyncAction.SyncActionValue.BroadcastListParticipant, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BroadcastListParticipant {
            interface $Properties {
                lidJid?: (string|null);
                pnJid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BroadcastListParticipant.$Properties;
        }

        interface IBubbleLockMessageAction extends SyncAction.SyncActionValue.BubbleLockMessageAction.$Properties {
        }

        class BubbleLockMessageAction {
            constructor(p?: SyncAction.SyncActionValue.BubbleLockMessageAction.$Properties);
            $unknowns?: Uint8Array[];
            locked?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.BubbleLockMessageAction.$Shape): SyncAction.SyncActionValue.BubbleLockMessageAction & SyncAction.SyncActionValue.BubbleLockMessageAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BubbleLockMessageAction.$Properties): SyncAction.SyncActionValue.BubbleLockMessageAction;
            static encode(m: SyncAction.SyncActionValue.BubbleLockMessageAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BubbleLockMessageAction & SyncAction.SyncActionValue.BubbleLockMessageAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BubbleLockMessageAction;
            static toObject(m: SyncAction.SyncActionValue.BubbleLockMessageAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BubbleLockMessageAction {
            interface $Properties {
                locked?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BubbleLockMessageAction.$Properties;
        }

        interface IBusinessBroadcastAssociationAction extends SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Properties {
        }

        class BusinessBroadcastAssociationAction {
            constructor(p?: SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Properties);
            $unknowns?: Uint8Array[];
            deleted?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Shape): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction & SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Properties): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction;
            static encode(m: SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction & SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastAssociationAction;
            static toObject(m: SyncAction.SyncActionValue.BusinessBroadcastAssociationAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessBroadcastAssociationAction {
            interface $Properties {
                deleted?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BusinessBroadcastAssociationAction.$Properties;
        }

        interface IBusinessBroadcastCampaignAction extends SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Properties {
        }

        class BusinessBroadcastCampaignAction {
            constructor(p?: SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Properties);
            $unknowns?: Uint8Array[];
            deviceId?: (number|null);
            adId?: (string|null);
            name?: (string|null);
            msgId?: (string|null);
            broadcastJid?: (string|null);
            reservedQuota?: (number|null);
            scheduledTimestamp?: (number|Long|null);
            createTimestamp?: (number|Long|null);
            status?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignStatus|null);
            bbProStatus?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignBBProStatus|null);
            customAudienceFbid?: (string|null);
            static create(properties: SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Shape): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction & SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Properties): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction;
            static encode(m: SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction & SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastCampaignAction;
            static toObject(m: SyncAction.SyncActionValue.BusinessBroadcastCampaignAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessBroadcastCampaignAction {
            interface $Properties {
                deviceId?: (number|null);
                adId?: (string|null);
                name?: (string|null);
                msgId?: (string|null);
                broadcastJid?: (string|null);
                reservedQuota?: (number|null);
                scheduledTimestamp?: (number|Long|null);
                createTimestamp?: (number|Long|null);
                status?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignStatus|null);
                bbProStatus?: (SyncAction.SyncActionValue.BusinessBroadcastCampaignBBProStatus|null);
                customAudienceFbid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BusinessBroadcastCampaignAction.$Properties;
        }

        enum BusinessBroadcastCampaignBBProStatus {
            BB_PRO_ACTIVE = 1,
            BB_PRO_COMPLETED = 2,
            BB_PRO_IN_DRAFT = 3,
            BB_PRO_IN_REVIEW = 4,
            BB_PRO_NOT_SENDING = 5,
            BB_PRO_OFF = 6,
            BB_PRO_REJECTED = 7,
            BB_PRO_SCHEDULED = 8,
            BB_PRO_SENDING_LIMITED = 9,
            BB_PRO_PROCESSING = 10
        }

        enum BusinessBroadcastCampaignStatus {
            DRAFT = 1,
            SCHEDULED = 2,
            PROCESSING = 3,
            FAILED = 4,
            SENT = 5
        }

        interface IBusinessBroadcastInsightsAction extends SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Properties {
        }

        class BusinessBroadcastInsightsAction {
            constructor(p?: SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Properties);
            $unknowns?: Uint8Array[];
            recipientCount?: (number|null);
            deliveredCount?: (number|null);
            readCount?: (number|null);
            repliedCount?: (number|null);
            quickReplyCount?: (number|null);
            static create(properties: SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Shape): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction & SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Properties): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction;
            static encode(m: SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction & SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastInsightsAction;
            static toObject(m: SyncAction.SyncActionValue.BusinessBroadcastInsightsAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessBroadcastInsightsAction {
            interface $Properties {
                recipientCount?: (number|null);
                deliveredCount?: (number|null);
                readCount?: (number|null);
                repliedCount?: (number|null);
                quickReplyCount?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BusinessBroadcastInsightsAction.$Properties;
        }

        interface IBusinessBroadcastListAction extends SyncAction.SyncActionValue.BusinessBroadcastListAction.$Properties {
        }

        class BusinessBroadcastListAction {
            constructor(p?: SyncAction.SyncActionValue.BusinessBroadcastListAction.$Properties);
            $unknowns?: Uint8Array[];
            deleted?: (boolean|null);
            participants: SyncAction.SyncActionValue.BroadcastListParticipant.$Properties[];
            listName?: (string|null);
            labelIds: string[];
            audienceExpression?: (string|null);
            customAudienceFbid?: (string|null);
            static create(properties: SyncAction.SyncActionValue.BusinessBroadcastListAction.$Shape): SyncAction.SyncActionValue.BusinessBroadcastListAction & SyncAction.SyncActionValue.BusinessBroadcastListAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BusinessBroadcastListAction.$Properties): SyncAction.SyncActionValue.BusinessBroadcastListAction;
            static encode(m: SyncAction.SyncActionValue.BusinessBroadcastListAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BusinessBroadcastListAction & SyncAction.SyncActionValue.BusinessBroadcastListAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BusinessBroadcastListAction;
            static toObject(m: SyncAction.SyncActionValue.BusinessBroadcastListAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessBroadcastListAction {
            interface $Properties {
                deleted?: (boolean|null);
                participants?: (SyncAction.SyncActionValue.BroadcastListParticipant.$Properties[]|null);
                listName?: (string|null);
                labelIds?: (string[]|null);
                audienceExpression?: (string|null);
                customAudienceFbid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BusinessBroadcastListAction.$Properties;
        }

        interface IBusinessFolderActivationAction extends SyncAction.SyncActionValue.BusinessFolderActivationAction.$Properties {
        }

        class BusinessFolderActivationAction {
            constructor(p?: SyncAction.SyncActionValue.BusinessFolderActivationAction.$Properties);
            $unknowns?: Uint8Array[];
            activated?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.BusinessFolderActivationAction.$Shape): SyncAction.SyncActionValue.BusinessFolderActivationAction & SyncAction.SyncActionValue.BusinessFolderActivationAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.BusinessFolderActivationAction.$Properties): SyncAction.SyncActionValue.BusinessFolderActivationAction;
            static encode(m: SyncAction.SyncActionValue.BusinessFolderActivationAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.BusinessFolderActivationAction & SyncAction.SyncActionValue.BusinessFolderActivationAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.BusinessFolderActivationAction;
            static toObject(m: SyncAction.SyncActionValue.BusinessFolderActivationAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessFolderActivationAction {
            interface $Properties {
                activated?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.BusinessFolderActivationAction.$Properties;
        }

        interface ICallLogAction extends SyncAction.SyncActionValue.CallLogAction.$Properties {
        }

        class CallLogAction {
            constructor(p?: SyncAction.SyncActionValue.CallLogAction.$Properties);
            $unknowns?: Uint8Array[];
            callLogRecord?: (SyncAction.CallLogRecord.$Properties|null);
            static create(properties: SyncAction.SyncActionValue.CallLogAction.$Shape): SyncAction.SyncActionValue.CallLogAction & SyncAction.SyncActionValue.CallLogAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CallLogAction.$Properties): SyncAction.SyncActionValue.CallLogAction;
            static encode(m: SyncAction.SyncActionValue.CallLogAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CallLogAction & SyncAction.SyncActionValue.CallLogAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CallLogAction;
            static toObject(m: SyncAction.SyncActionValue.CallLogAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CallLogAction {
            interface $Properties {
                callLogRecord?: (SyncAction.CallLogRecord.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CallLogAction.$Properties;
        }

        interface IChatAssignmentAction extends SyncAction.SyncActionValue.ChatAssignmentAction.$Properties {
        }

        class ChatAssignmentAction {
            constructor(p?: SyncAction.SyncActionValue.ChatAssignmentAction.$Properties);
            $unknowns?: Uint8Array[];
            deviceAgentId?: (string|null);
            static create(properties: SyncAction.SyncActionValue.ChatAssignmentAction.$Shape): SyncAction.SyncActionValue.ChatAssignmentAction & SyncAction.SyncActionValue.ChatAssignmentAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ChatAssignmentAction.$Properties): SyncAction.SyncActionValue.ChatAssignmentAction;
            static encode(m: SyncAction.SyncActionValue.ChatAssignmentAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ChatAssignmentAction & SyncAction.SyncActionValue.ChatAssignmentAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ChatAssignmentAction;
            static toObject(m: SyncAction.SyncActionValue.ChatAssignmentAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatAssignmentAction {
            interface $Properties {
                deviceAgentId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ChatAssignmentAction.$Properties;
        }

        interface IChatAssignmentOpenedStatusAction extends SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Properties {
        }

        class ChatAssignmentOpenedStatusAction {
            constructor(p?: SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Properties);
            $unknowns?: Uint8Array[];
            chatOpened?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Shape): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction & SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Properties): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction;
            static encode(m: SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction & SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction;
            static toObject(m: SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ChatAssignmentOpenedStatusAction {
            interface $Properties {
                chatOpened?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ChatAssignmentOpenedStatusAction.$Properties;
        }

        interface IClearChatAction extends SyncAction.SyncActionValue.ClearChatAction.$Properties {
        }

        class ClearChatAction {
            constructor(p?: SyncAction.SyncActionValue.ClearChatAction.$Properties);
            $unknowns?: Uint8Array[];
            messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
            static create(properties: SyncAction.SyncActionValue.ClearChatAction.$Shape): SyncAction.SyncActionValue.ClearChatAction & SyncAction.SyncActionValue.ClearChatAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ClearChatAction.$Properties): SyncAction.SyncActionValue.ClearChatAction;
            static encode(m: SyncAction.SyncActionValue.ClearChatAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ClearChatAction & SyncAction.SyncActionValue.ClearChatAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ClearChatAction;
            static toObject(m: SyncAction.SyncActionValue.ClearChatAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ClearChatAction {
            interface $Properties {
                messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ClearChatAction.$Properties;
        }

        interface ICoexV2VersionAction extends SyncAction.SyncActionValue.CoexV2VersionAction.$Properties {
        }

        class CoexV2VersionAction {
            constructor(p?: SyncAction.SyncActionValue.CoexV2VersionAction.$Properties);
            $unknowns?: Uint8Array[];
            version?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.CoexV2VersionAction.$Shape): SyncAction.SyncActionValue.CoexV2VersionAction & SyncAction.SyncActionValue.CoexV2VersionAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CoexV2VersionAction.$Properties): SyncAction.SyncActionValue.CoexV2VersionAction;
            static encode(m: SyncAction.SyncActionValue.CoexV2VersionAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CoexV2VersionAction & SyncAction.SyncActionValue.CoexV2VersionAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CoexV2VersionAction;
            static toObject(m: SyncAction.SyncActionValue.CoexV2VersionAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CoexV2VersionAction {
            interface $Properties {
                version?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CoexV2VersionAction.$Properties;
        }

        interface IContactAction extends SyncAction.SyncActionValue.ContactAction.$Properties {
        }

        class ContactAction {
            constructor(p?: SyncAction.SyncActionValue.ContactAction.$Properties);
            $unknowns?: Uint8Array[];
            fullName?: (string|null);
            firstName?: (string|null);
            lidJid?: (string|null);
            saveOnPrimaryAddressbook?: (boolean|null);
            pnJid?: (string|null);
            username?: (string|null);
            static create(properties: SyncAction.SyncActionValue.ContactAction.$Shape): SyncAction.SyncActionValue.ContactAction & SyncAction.SyncActionValue.ContactAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ContactAction.$Properties): SyncAction.SyncActionValue.ContactAction;
            static encode(m: SyncAction.SyncActionValue.ContactAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ContactAction & SyncAction.SyncActionValue.ContactAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ContactAction;
            static toObject(m: SyncAction.SyncActionValue.ContactAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ContactAction {
            interface $Properties {
                fullName?: (string|null);
                firstName?: (string|null);
                lidJid?: (string|null);
                saveOnPrimaryAddressbook?: (boolean|null);
                pnJid?: (string|null);
                username?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ContactAction.$Properties;
        }

        interface IContactManagerMetadataAction extends SyncAction.SyncActionValue.ContactManagerMetadataAction.$Properties {
        }

        class ContactManagerMetadataAction {
            constructor(p?: SyncAction.SyncActionValue.ContactManagerMetadataAction.$Properties);
            $unknowns?: Uint8Array[];
            isHidden?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.ContactManagerMetadataAction.$Shape): SyncAction.SyncActionValue.ContactManagerMetadataAction & SyncAction.SyncActionValue.ContactManagerMetadataAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ContactManagerMetadataAction.$Properties): SyncAction.SyncActionValue.ContactManagerMetadataAction;
            static encode(m: SyncAction.SyncActionValue.ContactManagerMetadataAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ContactManagerMetadataAction & SyncAction.SyncActionValue.ContactManagerMetadataAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ContactManagerMetadataAction;
            static toObject(m: SyncAction.SyncActionValue.ContactManagerMetadataAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ContactManagerMetadataAction {
            interface $Properties {
                isHidden?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ContactManagerMetadataAction.$Properties;
        }

        interface ICtwaMessageReceivedAction extends SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Properties {
        }

        class CtwaMessageReceivedAction {
            constructor(p?: SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Properties);
            $unknowns?: Uint8Array[];
            isCtwaMessageReceived?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Shape): SyncAction.SyncActionValue.CtwaMessageReceivedAction & SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Properties): SyncAction.SyncActionValue.CtwaMessageReceivedAction;
            static encode(m: SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CtwaMessageReceivedAction & SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CtwaMessageReceivedAction;
            static toObject(m: SyncAction.SyncActionValue.CtwaMessageReceivedAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CtwaMessageReceivedAction {
            interface $Properties {
                isCtwaMessageReceived?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CtwaMessageReceivedAction.$Properties;
        }

        interface ICtwaPerCustomerDataSharingAction extends SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Properties {
        }

        class CtwaPerCustomerDataSharingAction {
            constructor(p?: SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Properties);
            $unknowns?: Uint8Array[];
            isCtwaPerCustomerDataSharingEnabled?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Shape): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction & SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Properties): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction;
            static encode(m: SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction & SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction;
            static toObject(m: SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CtwaPerCustomerDataSharingAction {
            interface $Properties {
                isCtwaPerCustomerDataSharingEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CtwaPerCustomerDataSharingAction.$Properties;
        }

        interface ICustomPaymentMethod extends SyncAction.SyncActionValue.CustomPaymentMethod.$Properties {
        }

        class CustomPaymentMethod {
            constructor(p?: SyncAction.SyncActionValue.CustomPaymentMethod.$Properties);
            $unknowns?: Uint8Array[];
            credentialId?: (string|null);
            country?: (string|null);
            type?: (string|null);
            metadata: SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Properties[];
            static create(properties: SyncAction.SyncActionValue.CustomPaymentMethod.$Shape): SyncAction.SyncActionValue.CustomPaymentMethod & SyncAction.SyncActionValue.CustomPaymentMethod.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CustomPaymentMethod.$Properties): SyncAction.SyncActionValue.CustomPaymentMethod;
            static encode(m: SyncAction.SyncActionValue.CustomPaymentMethod.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CustomPaymentMethod & SyncAction.SyncActionValue.CustomPaymentMethod.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CustomPaymentMethod;
            static toObject(m: SyncAction.SyncActionValue.CustomPaymentMethod, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CustomPaymentMethod {
            interface $Properties {
                credentialId?: (string|null);
                country?: (string|null);
                type?: (string|null);
                metadata?: (SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CustomPaymentMethod.$Properties;
        }

        interface ICustomPaymentMethodMetadata extends SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Properties {
        }

        class CustomPaymentMethodMetadata {
            constructor(p?: SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Properties);
            $unknowns?: Uint8Array[];
            key?: (string|null);
            value?: (string|null);
            static create(properties: SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Shape): SyncAction.SyncActionValue.CustomPaymentMethodMetadata & SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Properties): SyncAction.SyncActionValue.CustomPaymentMethodMetadata;
            static encode(m: SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CustomPaymentMethodMetadata & SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CustomPaymentMethodMetadata;
            static toObject(m: SyncAction.SyncActionValue.CustomPaymentMethodMetadata, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CustomPaymentMethodMetadata {
            interface $Properties {
                key?: (string|null);
                value?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CustomPaymentMethodMetadata.$Properties;
        }

        interface ICustomPaymentMethodsAction extends SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Properties {
        }

        class CustomPaymentMethodsAction {
            constructor(p?: SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Properties);
            $unknowns?: Uint8Array[];
            customPaymentMethods: SyncAction.SyncActionValue.CustomPaymentMethod.$Properties[];
            static create(properties: SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Shape): SyncAction.SyncActionValue.CustomPaymentMethodsAction & SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Properties): SyncAction.SyncActionValue.CustomPaymentMethodsAction;
            static encode(m: SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CustomPaymentMethodsAction & SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CustomPaymentMethodsAction;
            static toObject(m: SyncAction.SyncActionValue.CustomPaymentMethodsAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CustomPaymentMethodsAction {
            interface $Properties {
                customPaymentMethods?: (SyncAction.SyncActionValue.CustomPaymentMethod.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CustomPaymentMethodsAction.$Properties;
        }

        interface ICustomerDataAction extends SyncAction.SyncActionValue.CustomerDataAction.$Properties {
        }

        class CustomerDataAction {
            constructor(p?: SyncAction.SyncActionValue.CustomerDataAction.$Properties);
            $unknowns?: Uint8Array[];
            chatJid?: (string|null);
            contactType?: (number|null);
            email?: (string|null);
            altPhoneNumbers?: (string|null);
            birthday?: (number|Long|null);
            address?: (string|null);
            acquisitionSource?: (number|null);
            leadStage?: (number|null);
            lastOrder?: (number|Long|null);
            createdAt?: (number|Long|null);
            modifiedAt?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.CustomerDataAction.$Shape): SyncAction.SyncActionValue.CustomerDataAction & SyncAction.SyncActionValue.CustomerDataAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.CustomerDataAction.$Properties): SyncAction.SyncActionValue.CustomerDataAction;
            static encode(m: SyncAction.SyncActionValue.CustomerDataAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.CustomerDataAction & SyncAction.SyncActionValue.CustomerDataAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.CustomerDataAction;
            static toObject(m: SyncAction.SyncActionValue.CustomerDataAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace CustomerDataAction {
            interface $Properties {
                chatJid?: (string|null);
                contactType?: (number|null);
                email?: (string|null);
                altPhoneNumbers?: (string|null);
                birthday?: (number|Long|null);
                address?: (string|null);
                acquisitionSource?: (number|null);
                leadStage?: (number|null);
                lastOrder?: (number|Long|null);
                createdAt?: (number|Long|null);
                modifiedAt?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.CustomerDataAction.$Properties;
        }

        interface IDeleteChatAction extends SyncAction.SyncActionValue.DeleteChatAction.$Properties {
        }

        class DeleteChatAction {
            constructor(p?: SyncAction.SyncActionValue.DeleteChatAction.$Properties);
            $unknowns?: Uint8Array[];
            messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
            static create(properties: SyncAction.SyncActionValue.DeleteChatAction.$Shape): SyncAction.SyncActionValue.DeleteChatAction & SyncAction.SyncActionValue.DeleteChatAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.DeleteChatAction.$Properties): SyncAction.SyncActionValue.DeleteChatAction;
            static encode(m: SyncAction.SyncActionValue.DeleteChatAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.DeleteChatAction & SyncAction.SyncActionValue.DeleteChatAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.DeleteChatAction;
            static toObject(m: SyncAction.SyncActionValue.DeleteChatAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DeleteChatAction {
            interface $Properties {
                messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.DeleteChatAction.$Properties;
        }

        interface IDeleteIndividualCallLogAction extends SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Properties {
        }

        class DeleteIndividualCallLogAction {
            constructor(p?: SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Properties);
            $unknowns?: Uint8Array[];
            peerJid?: (string|null);
            isIncoming?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Shape): SyncAction.SyncActionValue.DeleteIndividualCallLogAction & SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Properties): SyncAction.SyncActionValue.DeleteIndividualCallLogAction;
            static encode(m: SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.DeleteIndividualCallLogAction & SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.DeleteIndividualCallLogAction;
            static toObject(m: SyncAction.SyncActionValue.DeleteIndividualCallLogAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DeleteIndividualCallLogAction {
            interface $Properties {
                peerJid?: (string|null);
                isIncoming?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.DeleteIndividualCallLogAction.$Properties;
        }

        interface IDeleteMessageForMeAction extends SyncAction.SyncActionValue.DeleteMessageForMeAction.$Properties {
        }

        class DeleteMessageForMeAction {
            constructor(p?: SyncAction.SyncActionValue.DeleteMessageForMeAction.$Properties);
            $unknowns?: Uint8Array[];
            deleteMedia?: (boolean|null);
            messageTimestamp?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.DeleteMessageForMeAction.$Shape): SyncAction.SyncActionValue.DeleteMessageForMeAction & SyncAction.SyncActionValue.DeleteMessageForMeAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.DeleteMessageForMeAction.$Properties): SyncAction.SyncActionValue.DeleteMessageForMeAction;
            static encode(m: SyncAction.SyncActionValue.DeleteMessageForMeAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.DeleteMessageForMeAction & SyncAction.SyncActionValue.DeleteMessageForMeAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.DeleteMessageForMeAction;
            static toObject(m: SyncAction.SyncActionValue.DeleteMessageForMeAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DeleteMessageForMeAction {
            interface $Properties {
                deleteMedia?: (boolean|null);
                messageTimestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.DeleteMessageForMeAction.$Properties;
        }

        interface IDetectedOutcomesStatusAction extends SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Properties {
        }

        class DetectedOutcomesStatusAction {
            constructor(p?: SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Properties);
            $unknowns?: Uint8Array[];
            isEnabled?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Shape): SyncAction.SyncActionValue.DetectedOutcomesStatusAction & SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Properties): SyncAction.SyncActionValue.DetectedOutcomesStatusAction;
            static encode(m: SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.DetectedOutcomesStatusAction & SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.DetectedOutcomesStatusAction;
            static toObject(m: SyncAction.SyncActionValue.DetectedOutcomesStatusAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace DetectedOutcomesStatusAction {
            interface $Properties {
                isEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.DetectedOutcomesStatusAction.$Properties;
        }

        interface IExternalWebBetaAction extends SyncAction.SyncActionValue.ExternalWebBetaAction.$Properties {
        }

        class ExternalWebBetaAction {
            constructor(p?: SyncAction.SyncActionValue.ExternalWebBetaAction.$Properties);
            $unknowns?: Uint8Array[];
            isOptIn?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.ExternalWebBetaAction.$Shape): SyncAction.SyncActionValue.ExternalWebBetaAction & SyncAction.SyncActionValue.ExternalWebBetaAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ExternalWebBetaAction.$Properties): SyncAction.SyncActionValue.ExternalWebBetaAction;
            static encode(m: SyncAction.SyncActionValue.ExternalWebBetaAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ExternalWebBetaAction & SyncAction.SyncActionValue.ExternalWebBetaAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ExternalWebBetaAction;
            static toObject(m: SyncAction.SyncActionValue.ExternalWebBetaAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ExternalWebBetaAction {
            interface $Properties {
                isOptIn?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ExternalWebBetaAction.$Properties;
        }

        interface IFavoritesAction extends SyncAction.SyncActionValue.FavoritesAction.$Properties {
        }

        class FavoritesAction {
            constructor(p?: SyncAction.SyncActionValue.FavoritesAction.$Properties);
            $unknowns?: Uint8Array[];
            favorites: SyncAction.SyncActionValue.FavoritesAction.Favorite.$Properties[];
            static create(properties: SyncAction.SyncActionValue.FavoritesAction.$Shape): SyncAction.SyncActionValue.FavoritesAction & SyncAction.SyncActionValue.FavoritesAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.FavoritesAction.$Properties): SyncAction.SyncActionValue.FavoritesAction;
            static encode(m: SyncAction.SyncActionValue.FavoritesAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.FavoritesAction & SyncAction.SyncActionValue.FavoritesAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.FavoritesAction;
            static toObject(m: SyncAction.SyncActionValue.FavoritesAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace FavoritesAction {
            interface $Properties {
                favorites?: (SyncAction.SyncActionValue.FavoritesAction.Favorite.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.FavoritesAction.$Properties;

            interface IFavorite extends SyncAction.SyncActionValue.FavoritesAction.Favorite.$Properties {
            }

            class Favorite {
                constructor(p?: SyncAction.SyncActionValue.FavoritesAction.Favorite.$Properties);
                $unknowns?: Uint8Array[];
                id?: (string|null);
                static create(properties: SyncAction.SyncActionValue.FavoritesAction.Favorite.$Shape): SyncAction.SyncActionValue.FavoritesAction.Favorite & SyncAction.SyncActionValue.FavoritesAction.Favorite.$Shape;
                static create(properties?: SyncAction.SyncActionValue.FavoritesAction.Favorite.$Properties): SyncAction.SyncActionValue.FavoritesAction.Favorite;
                static encode(m: SyncAction.SyncActionValue.FavoritesAction.Favorite.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.FavoritesAction.Favorite & SyncAction.SyncActionValue.FavoritesAction.Favorite.$Shape;
                static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.FavoritesAction.Favorite;
                static toObject(m: SyncAction.SyncActionValue.FavoritesAction.Favorite, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Favorite {
                interface $Properties {
                    id?: (string|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = SyncAction.SyncActionValue.FavoritesAction.Favorite.$Properties;
            }
        }

        interface IInteractiveMessageAction extends SyncAction.SyncActionValue.InteractiveMessageAction.$Properties {
        }

        class InteractiveMessageAction {
            constructor(p?: SyncAction.SyncActionValue.InteractiveMessageAction.$Properties);
            $unknowns?: Uint8Array[];
            type?: (SyncAction.SyncActionValue.InteractiveMessageAction.InteractiveMessageActionMode|null);
            agmId?: (string|null);
            static create(properties: SyncAction.SyncActionValue.InteractiveMessageAction.$Shape): SyncAction.SyncActionValue.InteractiveMessageAction & SyncAction.SyncActionValue.InteractiveMessageAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.InteractiveMessageAction.$Properties): SyncAction.SyncActionValue.InteractiveMessageAction;
            static encode(m: SyncAction.SyncActionValue.InteractiveMessageAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.InteractiveMessageAction & SyncAction.SyncActionValue.InteractiveMessageAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.InteractiveMessageAction;
            static toObject(m: SyncAction.SyncActionValue.InteractiveMessageAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace InteractiveMessageAction {
            interface $Properties {
                type?: (SyncAction.SyncActionValue.InteractiveMessageAction.InteractiveMessageActionMode|null);
                agmId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.InteractiveMessageAction.$Properties;

            enum InteractiveMessageActionMode {
                DISABLE_CTA = 1
            }
        }

        interface IKeyExpiration extends SyncAction.SyncActionValue.KeyExpiration.$Properties {
        }

        class KeyExpiration {
            constructor(p?: SyncAction.SyncActionValue.KeyExpiration.$Properties);
            $unknowns?: Uint8Array[];
            expiredKeyEpoch?: (number|null);
            static create(properties: SyncAction.SyncActionValue.KeyExpiration.$Shape): SyncAction.SyncActionValue.KeyExpiration & SyncAction.SyncActionValue.KeyExpiration.$Shape;
            static create(properties?: SyncAction.SyncActionValue.KeyExpiration.$Properties): SyncAction.SyncActionValue.KeyExpiration;
            static encode(m: SyncAction.SyncActionValue.KeyExpiration.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.KeyExpiration & SyncAction.SyncActionValue.KeyExpiration.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.KeyExpiration;
            static toObject(m: SyncAction.SyncActionValue.KeyExpiration, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace KeyExpiration {
            interface $Properties {
                expiredKeyEpoch?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.KeyExpiration.$Properties;
        }

        interface ILabelAssociationAction extends SyncAction.SyncActionValue.LabelAssociationAction.$Properties {
        }

        class LabelAssociationAction {
            constructor(p?: SyncAction.SyncActionValue.LabelAssociationAction.$Properties);
            $unknowns?: Uint8Array[];
            labeled?: (boolean|null);
            modelMetaData?: (string|null);
            static create(properties: SyncAction.SyncActionValue.LabelAssociationAction.$Shape): SyncAction.SyncActionValue.LabelAssociationAction & SyncAction.SyncActionValue.LabelAssociationAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.LabelAssociationAction.$Properties): SyncAction.SyncActionValue.LabelAssociationAction;
            static encode(m: SyncAction.SyncActionValue.LabelAssociationAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.LabelAssociationAction & SyncAction.SyncActionValue.LabelAssociationAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.LabelAssociationAction;
            static toObject(m: SyncAction.SyncActionValue.LabelAssociationAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LabelAssociationAction {
            interface $Properties {
                labeled?: (boolean|null);
                modelMetaData?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.LabelAssociationAction.$Properties;
        }

        interface ILabelEditAction extends SyncAction.SyncActionValue.LabelEditAction.$Properties {
        }

        class LabelEditAction {
            constructor(p?: SyncAction.SyncActionValue.LabelEditAction.$Properties);
            $unknowns?: Uint8Array[];
            name?: (string|null);
            color?: (number|null);
            predefinedId?: (number|null);
            deleted?: (boolean|null);
            orderIndex?: (number|null);
            isActive?: (boolean|null);
            type?: (SyncAction.SyncActionValue.LabelEditAction.ListType|null);
            isImmutable?: (boolean|null);
            muteEndTimeMs?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.LabelEditAction.$Shape): SyncAction.SyncActionValue.LabelEditAction & SyncAction.SyncActionValue.LabelEditAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.LabelEditAction.$Properties): SyncAction.SyncActionValue.LabelEditAction;
            static encode(m: SyncAction.SyncActionValue.LabelEditAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.LabelEditAction & SyncAction.SyncActionValue.LabelEditAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.LabelEditAction;
            static toObject(m: SyncAction.SyncActionValue.LabelEditAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LabelEditAction {
            interface $Properties {
                name?: (string|null);
                color?: (number|null);
                predefinedId?: (number|null);
                deleted?: (boolean|null);
                orderIndex?: (number|null);
                isActive?: (boolean|null);
                type?: (SyncAction.SyncActionValue.LabelEditAction.ListType|null);
                isImmutable?: (boolean|null);
                muteEndTimeMs?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.LabelEditAction.$Properties;

            enum ListType {
                NONE = 0,
                UNREAD = 1,
                GROUPS = 2,
                FAVORITES = 3,
                PREDEFINED = 4,
                CUSTOM = 5,
                COMMUNITY = 6,
                SERVER_ASSIGNED = 7,
                DRAFTED = 8,
                AI_HANDOFF = 9,
                CHANNELS = 10,
                AI_RESPONDING = 11,
                ARCHIVED = 12,
                LOCKED = 13,
                INVITES = 14,
                THIRD_PARTY = 15,
                LEAD = 16,
                MENTIONS_AND_REPLIES = 17,
                REQUESTS = 18
            }
        }

        interface ILabelReorderingAction extends SyncAction.SyncActionValue.LabelReorderingAction.$Properties {
        }

        class LabelReorderingAction {
            constructor(p?: SyncAction.SyncActionValue.LabelReorderingAction.$Properties);
            $unknowns?: Uint8Array[];
            sortedLabelIds: number[];
            static create(properties: SyncAction.SyncActionValue.LabelReorderingAction.$Shape): SyncAction.SyncActionValue.LabelReorderingAction & SyncAction.SyncActionValue.LabelReorderingAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.LabelReorderingAction.$Properties): SyncAction.SyncActionValue.LabelReorderingAction;
            static encode(m: SyncAction.SyncActionValue.LabelReorderingAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.LabelReorderingAction & SyncAction.SyncActionValue.LabelReorderingAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.LabelReorderingAction;
            static toObject(m: SyncAction.SyncActionValue.LabelReorderingAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LabelReorderingAction {
            interface $Properties {
                sortedLabelIds?: (number[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.LabelReorderingAction.$Properties;
        }

        interface ILabelSublistAction extends SyncAction.SyncActionValue.LabelSublistAction.$Properties {
        }

        class LabelSublistAction {
            constructor(p?: SyncAction.SyncActionValue.LabelSublistAction.$Properties);
            $unknowns?: Uint8Array[];
            subListId?: (number|null);
            static create(properties: SyncAction.SyncActionValue.LabelSublistAction.$Shape): SyncAction.SyncActionValue.LabelSublistAction & SyncAction.SyncActionValue.LabelSublistAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.LabelSublistAction.$Properties): SyncAction.SyncActionValue.LabelSublistAction;
            static encode(m: SyncAction.SyncActionValue.LabelSublistAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.LabelSublistAction & SyncAction.SyncActionValue.LabelSublistAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.LabelSublistAction;
            static toObject(m: SyncAction.SyncActionValue.LabelSublistAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LabelSublistAction {
            interface $Properties {
                subListId?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.LabelSublistAction.$Properties;
        }

        interface ILidContactAction extends SyncAction.SyncActionValue.LidContactAction.$Properties {
        }

        class LidContactAction {
            constructor(p?: SyncAction.SyncActionValue.LidContactAction.$Properties);
            $unknowns?: Uint8Array[];
            fullName?: (string|null);
            firstName?: (string|null);
            username?: (string|null);
            static create(properties: SyncAction.SyncActionValue.LidContactAction.$Shape): SyncAction.SyncActionValue.LidContactAction & SyncAction.SyncActionValue.LidContactAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.LidContactAction.$Properties): SyncAction.SyncActionValue.LidContactAction;
            static encode(m: SyncAction.SyncActionValue.LidContactAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.LidContactAction & SyncAction.SyncActionValue.LidContactAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.LidContactAction;
            static toObject(m: SyncAction.SyncActionValue.LidContactAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LidContactAction {
            interface $Properties {
                fullName?: (string|null);
                firstName?: (string|null);
                username?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.LidContactAction.$Properties;
        }

        interface ILocaleSetting extends SyncAction.SyncActionValue.LocaleSetting.$Properties {
        }

        class LocaleSetting {
            constructor(p?: SyncAction.SyncActionValue.LocaleSetting.$Properties);
            $unknowns?: Uint8Array[];
            locale?: (string|null);
            static create(properties: SyncAction.SyncActionValue.LocaleSetting.$Shape): SyncAction.SyncActionValue.LocaleSetting & SyncAction.SyncActionValue.LocaleSetting.$Shape;
            static create(properties?: SyncAction.SyncActionValue.LocaleSetting.$Properties): SyncAction.SyncActionValue.LocaleSetting;
            static encode(m: SyncAction.SyncActionValue.LocaleSetting.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.LocaleSetting & SyncAction.SyncActionValue.LocaleSetting.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.LocaleSetting;
            static toObject(m: SyncAction.SyncActionValue.LocaleSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LocaleSetting {
            interface $Properties {
                locale?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.LocaleSetting.$Properties;
        }

        interface ILockChatAction extends SyncAction.SyncActionValue.LockChatAction.$Properties {
        }

        class LockChatAction {
            constructor(p?: SyncAction.SyncActionValue.LockChatAction.$Properties);
            $unknowns?: Uint8Array[];
            locked?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.LockChatAction.$Shape): SyncAction.SyncActionValue.LockChatAction & SyncAction.SyncActionValue.LockChatAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.LockChatAction.$Properties): SyncAction.SyncActionValue.LockChatAction;
            static encode(m: SyncAction.SyncActionValue.LockChatAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.LockChatAction & SyncAction.SyncActionValue.LockChatAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.LockChatAction;
            static toObject(m: SyncAction.SyncActionValue.LockChatAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LockChatAction {
            interface $Properties {
                locked?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.LockChatAction.$Properties;
        }

        interface IMaibaAIFeaturesControlAction extends SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Properties {
        }

        class MaibaAIFeaturesControlAction {
            constructor(p?: SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Properties);
            $unknowns?: Uint8Array[];
            aiFeatureStatus?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.MaibaAIFeatureStatus|null);
            aiReplyMode?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.MaibaAIReplyMode|null);
            static create(properties: SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Shape): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction & SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Properties): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction;
            static encode(m: SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction & SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.MaibaAIFeaturesControlAction;
            static toObject(m: SyncAction.SyncActionValue.MaibaAIFeaturesControlAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MaibaAIFeaturesControlAction {
            interface $Properties {
                aiFeatureStatus?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.MaibaAIFeatureStatus|null);
                aiReplyMode?: (SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.MaibaAIReplyMode|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.MaibaAIFeaturesControlAction.$Properties;

            enum MaibaAIFeatureStatus {
                ENABLED = 0,
                ENABLED_HAS_LEARNING = 1,
                DISABLED = 2
            }

            enum MaibaAIReplyMode {
                MUTED = 0,
                AI_AGENT = 1,
                SUGGESTIONS = 2
            }
        }

        interface IMarkChatAsReadAction extends SyncAction.SyncActionValue.MarkChatAsReadAction.$Properties {
        }

        class MarkChatAsReadAction {
            constructor(p?: SyncAction.SyncActionValue.MarkChatAsReadAction.$Properties);
            $unknowns?: Uint8Array[];
            read?: (boolean|null);
            messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
            static create(properties: SyncAction.SyncActionValue.MarkChatAsReadAction.$Shape): SyncAction.SyncActionValue.MarkChatAsReadAction & SyncAction.SyncActionValue.MarkChatAsReadAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.MarkChatAsReadAction.$Properties): SyncAction.SyncActionValue.MarkChatAsReadAction;
            static encode(m: SyncAction.SyncActionValue.MarkChatAsReadAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.MarkChatAsReadAction & SyncAction.SyncActionValue.MarkChatAsReadAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.MarkChatAsReadAction;
            static toObject(m: SyncAction.SyncActionValue.MarkChatAsReadAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MarkChatAsReadAction {
            interface $Properties {
                read?: (boolean|null);
                messageRange?: (SyncAction.SyncActionValue.SyncActionMessageRange.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.MarkChatAsReadAction.$Properties;
        }

        interface IMarketingMessageAction extends SyncAction.SyncActionValue.MarketingMessageAction.$Properties {
        }

        class MarketingMessageAction {
            constructor(p?: SyncAction.SyncActionValue.MarketingMessageAction.$Properties);
            $unknowns?: Uint8Array[];
            name?: (string|null);
            message?: (string|null);
            type?: (SyncAction.SyncActionValue.MarketingMessageAction.MarketingMessagePrototypeType|null);
            createdAt?: (number|Long|null);
            lastSentAt?: (number|Long|null);
            isDeleted?: (boolean|null);
            mediaId?: (string|null);
            static create(properties: SyncAction.SyncActionValue.MarketingMessageAction.$Shape): SyncAction.SyncActionValue.MarketingMessageAction & SyncAction.SyncActionValue.MarketingMessageAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.MarketingMessageAction.$Properties): SyncAction.SyncActionValue.MarketingMessageAction;
            static encode(m: SyncAction.SyncActionValue.MarketingMessageAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.MarketingMessageAction & SyncAction.SyncActionValue.MarketingMessageAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.MarketingMessageAction;
            static toObject(m: SyncAction.SyncActionValue.MarketingMessageAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MarketingMessageAction {
            interface $Properties {
                name?: (string|null);
                message?: (string|null);
                type?: (SyncAction.SyncActionValue.MarketingMessageAction.MarketingMessagePrototypeType|null);
                createdAt?: (number|Long|null);
                lastSentAt?: (number|Long|null);
                isDeleted?: (boolean|null);
                mediaId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.MarketingMessageAction.$Properties;

            enum MarketingMessagePrototypeType {
                PERSONALIZED = 0
            }
        }

        interface IMarketingMessageBroadcastAction extends SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Properties {
        }

        class MarketingMessageBroadcastAction {
            constructor(p?: SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Properties);
            $unknowns?: Uint8Array[];
            repliedCount?: (number|null);
            static create(properties: SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Shape): SyncAction.SyncActionValue.MarketingMessageBroadcastAction & SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Properties): SyncAction.SyncActionValue.MarketingMessageBroadcastAction;
            static encode(m: SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.MarketingMessageBroadcastAction & SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.MarketingMessageBroadcastAction;
            static toObject(m: SyncAction.SyncActionValue.MarketingMessageBroadcastAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MarketingMessageBroadcastAction {
            interface $Properties {
                repliedCount?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.MarketingMessageBroadcastAction.$Properties;
        }

        interface IMerchantPaymentPartnerAction extends SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Properties {
        }

        class MerchantPaymentPartnerAction {
            constructor(p?: SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Properties);
            $unknowns?: Uint8Array[];
            status?: (SyncAction.SyncActionValue.MerchantPaymentPartnerAction.Status|null);
            country?: (string|null);
            gatewayName?: (string|null);
            credentialId?: (string|null);
            static create(properties: SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Shape): SyncAction.SyncActionValue.MerchantPaymentPartnerAction & SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Properties): SyncAction.SyncActionValue.MerchantPaymentPartnerAction;
            static encode(m: SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.MerchantPaymentPartnerAction & SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.MerchantPaymentPartnerAction;
            static toObject(m: SyncAction.SyncActionValue.MerchantPaymentPartnerAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MerchantPaymentPartnerAction {
            interface $Properties {
                status?: (SyncAction.SyncActionValue.MerchantPaymentPartnerAction.Status|null);
                country?: (string|null);
                gatewayName?: (string|null);
                credentialId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.MerchantPaymentPartnerAction.$Properties;

            enum Status {
                ACTIVE = 0,
                INACTIVE = 1
            }
        }

        interface IMusicUserIdAction extends SyncAction.SyncActionValue.MusicUserIdAction.$Properties {
        }

        class MusicUserIdAction {
            constructor(p?: SyncAction.SyncActionValue.MusicUserIdAction.$Properties);
            $unknowns?: Uint8Array[];
            musicUserId?: (string|null);
            musicUserIdMap: { [k: string]: string };
            static create(properties: SyncAction.SyncActionValue.MusicUserIdAction.$Shape): SyncAction.SyncActionValue.MusicUserIdAction & SyncAction.SyncActionValue.MusicUserIdAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.MusicUserIdAction.$Properties): SyncAction.SyncActionValue.MusicUserIdAction;
            static encode(m: SyncAction.SyncActionValue.MusicUserIdAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.MusicUserIdAction & SyncAction.SyncActionValue.MusicUserIdAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.MusicUserIdAction;
            static toObject(m: SyncAction.SyncActionValue.MusicUserIdAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MusicUserIdAction {
            interface $Properties {
                musicUserId?: (string|null);
                musicUserIdMap?: ({ [k: string]: string }|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.MusicUserIdAction.$Properties;
        }

        interface IMuteAction extends SyncAction.SyncActionValue.MuteAction.$Properties {
        }

        class MuteAction {
            constructor(p?: SyncAction.SyncActionValue.MuteAction.$Properties);
            $unknowns?: Uint8Array[];
            muted?: (boolean|null);
            muteEndTimestamp?: (number|Long|null);
            autoMuted?: (boolean|null);
            muteEveryoneMentionEndTimestamp?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.MuteAction.$Shape): SyncAction.SyncActionValue.MuteAction & SyncAction.SyncActionValue.MuteAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.MuteAction.$Properties): SyncAction.SyncActionValue.MuteAction;
            static encode(m: SyncAction.SyncActionValue.MuteAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.MuteAction & SyncAction.SyncActionValue.MuteAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.MuteAction;
            static toObject(m: SyncAction.SyncActionValue.MuteAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace MuteAction {
            interface $Properties {
                muted?: (boolean|null);
                muteEndTimestamp?: (number|Long|null);
                autoMuted?: (boolean|null);
                muteEveryoneMentionEndTimestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.MuteAction.$Properties;
        }

        interface INctSaltSyncAction extends SyncAction.SyncActionValue.NctSaltSyncAction.$Properties {
        }

        class NctSaltSyncAction {
            constructor(p?: SyncAction.SyncActionValue.NctSaltSyncAction.$Properties);
            $unknowns?: Uint8Array[];
            salt?: (Uint8Array|null);
            static create(properties: SyncAction.SyncActionValue.NctSaltSyncAction.$Shape): SyncAction.SyncActionValue.NctSaltSyncAction & SyncAction.SyncActionValue.NctSaltSyncAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.NctSaltSyncAction.$Properties): SyncAction.SyncActionValue.NctSaltSyncAction;
            static encode(m: SyncAction.SyncActionValue.NctSaltSyncAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.NctSaltSyncAction & SyncAction.SyncActionValue.NctSaltSyncAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.NctSaltSyncAction;
            static toObject(m: SyncAction.SyncActionValue.NctSaltSyncAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace NctSaltSyncAction {
            interface $Properties {
                salt?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.NctSaltSyncAction.$Properties;
        }

        interface INewsletterSavedInterestsAction extends SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Properties {
        }

        class NewsletterSavedInterestsAction {
            constructor(p?: SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Properties);
            $unknowns?: Uint8Array[];
            newsletterSavedInterests?: (string|null);
            static create(properties: SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Shape): SyncAction.SyncActionValue.NewsletterSavedInterestsAction & SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Properties): SyncAction.SyncActionValue.NewsletterSavedInterestsAction;
            static encode(m: SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.NewsletterSavedInterestsAction & SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.NewsletterSavedInterestsAction;
            static toObject(m: SyncAction.SyncActionValue.NewsletterSavedInterestsAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace NewsletterSavedInterestsAction {
            interface $Properties {
                newsletterSavedInterests?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.NewsletterSavedInterestsAction.$Properties;
        }

        interface INoteEditAction extends SyncAction.SyncActionValue.NoteEditAction.$Properties {
        }

        class NoteEditAction {
            constructor(p?: SyncAction.SyncActionValue.NoteEditAction.$Properties);
            $unknowns?: Uint8Array[];
            type?: (SyncAction.SyncActionValue.NoteEditAction.NoteType|null);
            chatJid?: (string|null);
            createdAt?: (number|Long|null);
            deleted?: (boolean|null);
            unstructuredContent?: (string|null);
            static create(properties: SyncAction.SyncActionValue.NoteEditAction.$Shape): SyncAction.SyncActionValue.NoteEditAction & SyncAction.SyncActionValue.NoteEditAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.NoteEditAction.$Properties): SyncAction.SyncActionValue.NoteEditAction;
            static encode(m: SyncAction.SyncActionValue.NoteEditAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.NoteEditAction & SyncAction.SyncActionValue.NoteEditAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.NoteEditAction;
            static toObject(m: SyncAction.SyncActionValue.NoteEditAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace NoteEditAction {
            interface $Properties {
                type?: (SyncAction.SyncActionValue.NoteEditAction.NoteType|null);
                chatJid?: (string|null);
                createdAt?: (number|Long|null);
                deleted?: (boolean|null);
                unstructuredContent?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.NoteEditAction.$Properties;

            enum NoteType {
                UNSTRUCTURED = 1,
                STRUCTURED = 2
            }
        }

        interface INotificationActivitySettingAction extends SyncAction.SyncActionValue.NotificationActivitySettingAction.$Properties {
        }

        class NotificationActivitySettingAction {
            constructor(p?: SyncAction.SyncActionValue.NotificationActivitySettingAction.$Properties);
            $unknowns?: Uint8Array[];
            notificationActivitySetting?: (SyncAction.SyncActionValue.NotificationActivitySettingAction.NotificationActivitySetting|null);
            static create(properties: SyncAction.SyncActionValue.NotificationActivitySettingAction.$Shape): SyncAction.SyncActionValue.NotificationActivitySettingAction & SyncAction.SyncActionValue.NotificationActivitySettingAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.NotificationActivitySettingAction.$Properties): SyncAction.SyncActionValue.NotificationActivitySettingAction;
            static encode(m: SyncAction.SyncActionValue.NotificationActivitySettingAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.NotificationActivitySettingAction & SyncAction.SyncActionValue.NotificationActivitySettingAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.NotificationActivitySettingAction;
            static toObject(m: SyncAction.SyncActionValue.NotificationActivitySettingAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace NotificationActivitySettingAction {
            interface $Properties {
                notificationActivitySetting?: (SyncAction.SyncActionValue.NotificationActivitySettingAction.NotificationActivitySetting|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.NotificationActivitySettingAction.$Properties;

            enum NotificationActivitySetting {
                DEFAULT_ALL_MESSAGES = 0,
                ALL_MESSAGES = 1,
                HIGHLIGHTS = 2,
                DEFAULT_HIGHLIGHTS = 3
            }
        }

        interface INuxAction extends SyncAction.SyncActionValue.NuxAction.$Properties {
        }

        class NuxAction {
            constructor(p?: SyncAction.SyncActionValue.NuxAction.$Properties);
            $unknowns?: Uint8Array[];
            acknowledged?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.NuxAction.$Shape): SyncAction.SyncActionValue.NuxAction & SyncAction.SyncActionValue.NuxAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.NuxAction.$Properties): SyncAction.SyncActionValue.NuxAction;
            static encode(m: SyncAction.SyncActionValue.NuxAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.NuxAction & SyncAction.SyncActionValue.NuxAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.NuxAction;
            static toObject(m: SyncAction.SyncActionValue.NuxAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace NuxAction {
            interface $Properties {
                acknowledged?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.NuxAction.$Properties;
        }

        interface IOutContactAction extends SyncAction.SyncActionValue.OutContactAction.$Properties {
        }

        class OutContactAction {
            constructor(p?: SyncAction.SyncActionValue.OutContactAction.$Properties);
            $unknowns?: Uint8Array[];
            fullName?: (string|null);
            firstName?: (string|null);
            static create(properties: SyncAction.SyncActionValue.OutContactAction.$Shape): SyncAction.SyncActionValue.OutContactAction & SyncAction.SyncActionValue.OutContactAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.OutContactAction.$Properties): SyncAction.SyncActionValue.OutContactAction;
            static encode(m: SyncAction.SyncActionValue.OutContactAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.OutContactAction & SyncAction.SyncActionValue.OutContactAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.OutContactAction;
            static toObject(m: SyncAction.SyncActionValue.OutContactAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace OutContactAction {
            interface $Properties {
                fullName?: (string|null);
                firstName?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.OutContactAction.$Properties;
        }

        interface IPaymentInfoAction extends SyncAction.SyncActionValue.PaymentInfoAction.$Properties {
        }

        class PaymentInfoAction {
            constructor(p?: SyncAction.SyncActionValue.PaymentInfoAction.$Properties);
            $unknowns?: Uint8Array[];
            cpi?: (string|null);
            static create(properties: SyncAction.SyncActionValue.PaymentInfoAction.$Shape): SyncAction.SyncActionValue.PaymentInfoAction & SyncAction.SyncActionValue.PaymentInfoAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PaymentInfoAction.$Properties): SyncAction.SyncActionValue.PaymentInfoAction;
            static encode(m: SyncAction.SyncActionValue.PaymentInfoAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PaymentInfoAction & SyncAction.SyncActionValue.PaymentInfoAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PaymentInfoAction;
            static toObject(m: SyncAction.SyncActionValue.PaymentInfoAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PaymentInfoAction {
            interface $Properties {
                cpi?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PaymentInfoAction.$Properties;
        }

        interface IPaymentTosAction extends SyncAction.SyncActionValue.PaymentTosAction.$Properties {
        }

        class PaymentTosAction {
            constructor(p?: SyncAction.SyncActionValue.PaymentTosAction.$Properties);
            $unknowns?: Uint8Array[];
            paymentNotice?: (SyncAction.SyncActionValue.PaymentTosAction.PaymentNotice|null);
            accepted?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.PaymentTosAction.$Shape): SyncAction.SyncActionValue.PaymentTosAction & SyncAction.SyncActionValue.PaymentTosAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PaymentTosAction.$Properties): SyncAction.SyncActionValue.PaymentTosAction;
            static encode(m: SyncAction.SyncActionValue.PaymentTosAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PaymentTosAction & SyncAction.SyncActionValue.PaymentTosAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PaymentTosAction;
            static toObject(m: SyncAction.SyncActionValue.PaymentTosAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PaymentTosAction {
            interface $Properties {
                paymentNotice?: (SyncAction.SyncActionValue.PaymentTosAction.PaymentNotice|null);
                accepted?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PaymentTosAction.$Properties;

            enum PaymentNotice {
                BR_PAY_PRIVACY_POLICY = 0
            }
        }

        interface IPinAction extends SyncAction.SyncActionValue.PinAction.$Properties {
        }

        class PinAction {
            constructor(p?: SyncAction.SyncActionValue.PinAction.$Properties);
            $unknowns?: Uint8Array[];
            pinned?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.PinAction.$Shape): SyncAction.SyncActionValue.PinAction & SyncAction.SyncActionValue.PinAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PinAction.$Properties): SyncAction.SyncActionValue.PinAction;
            static encode(m: SyncAction.SyncActionValue.PinAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PinAction & SyncAction.SyncActionValue.PinAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PinAction;
            static toObject(m: SyncAction.SyncActionValue.PinAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PinAction {
            interface $Properties {
                pinned?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PinAction.$Properties;
        }

        interface IPnForLidChatAction extends SyncAction.SyncActionValue.PnForLidChatAction.$Properties {
        }

        class PnForLidChatAction {
            constructor(p?: SyncAction.SyncActionValue.PnForLidChatAction.$Properties);
            $unknowns?: Uint8Array[];
            pnJid?: (string|null);
            static create(properties: SyncAction.SyncActionValue.PnForLidChatAction.$Shape): SyncAction.SyncActionValue.PnForLidChatAction & SyncAction.SyncActionValue.PnForLidChatAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PnForLidChatAction.$Properties): SyncAction.SyncActionValue.PnForLidChatAction;
            static encode(m: SyncAction.SyncActionValue.PnForLidChatAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PnForLidChatAction & SyncAction.SyncActionValue.PnForLidChatAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PnForLidChatAction;
            static toObject(m: SyncAction.SyncActionValue.PnForLidChatAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PnForLidChatAction {
            interface $Properties {
                pnJid?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PnForLidChatAction.$Properties;
        }

        interface IPrimaryFeature extends SyncAction.SyncActionValue.PrimaryFeature.$Properties {
        }

        class PrimaryFeature {
            constructor(p?: SyncAction.SyncActionValue.PrimaryFeature.$Properties);
            $unknowns?: Uint8Array[];
            flags: string[];
            static create(properties: SyncAction.SyncActionValue.PrimaryFeature.$Shape): SyncAction.SyncActionValue.PrimaryFeature & SyncAction.SyncActionValue.PrimaryFeature.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PrimaryFeature.$Properties): SyncAction.SyncActionValue.PrimaryFeature;
            static encode(m: SyncAction.SyncActionValue.PrimaryFeature.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PrimaryFeature & SyncAction.SyncActionValue.PrimaryFeature.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PrimaryFeature;
            static toObject(m: SyncAction.SyncActionValue.PrimaryFeature, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PrimaryFeature {
            interface $Properties {
                flags?: (string[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PrimaryFeature.$Properties;
        }

        interface IPrimaryVersionAction extends SyncAction.SyncActionValue.PrimaryVersionAction.$Properties {
        }

        class PrimaryVersionAction {
            constructor(p?: SyncAction.SyncActionValue.PrimaryVersionAction.$Properties);
            $unknowns?: Uint8Array[];
            version?: (string|null);
            static create(properties: SyncAction.SyncActionValue.PrimaryVersionAction.$Shape): SyncAction.SyncActionValue.PrimaryVersionAction & SyncAction.SyncActionValue.PrimaryVersionAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PrimaryVersionAction.$Properties): SyncAction.SyncActionValue.PrimaryVersionAction;
            static encode(m: SyncAction.SyncActionValue.PrimaryVersionAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PrimaryVersionAction & SyncAction.SyncActionValue.PrimaryVersionAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PrimaryVersionAction;
            static toObject(m: SyncAction.SyncActionValue.PrimaryVersionAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PrimaryVersionAction {
            interface $Properties {
                version?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PrimaryVersionAction.$Properties;
        }

        interface IPrivacySettingChannelsPersonalisedRecommendationAction extends SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Properties {
        }

        class PrivacySettingChannelsPersonalisedRecommendationAction {
            constructor(p?: SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Properties);
            $unknowns?: Uint8Array[];
            isUserOptedOut?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Shape): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction & SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Properties): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction;
            static encode(m: SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction & SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction;
            static toObject(m: SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PrivacySettingChannelsPersonalisedRecommendationAction {
            interface $Properties {
                isUserOptedOut?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PrivacySettingChannelsPersonalisedRecommendationAction.$Properties;
        }

        interface IPrivacySettingDisableLinkPreviewsAction extends SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Properties {
        }

        class PrivacySettingDisableLinkPreviewsAction {
            constructor(p?: SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Properties);
            $unknowns?: Uint8Array[];
            isPreviewsDisabled?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Shape): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction & SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Properties): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction;
            static encode(m: SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction & SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction;
            static toObject(m: SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PrivacySettingDisableLinkPreviewsAction {
            interface $Properties {
                isPreviewsDisabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PrivacySettingDisableLinkPreviewsAction.$Properties;
        }

        interface IPrivacySettingRelayAllCalls extends SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Properties {
        }

        class PrivacySettingRelayAllCalls {
            constructor(p?: SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Properties);
            $unknowns?: Uint8Array[];
            isEnabled?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Shape): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls & SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Properties): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls;
            static encode(m: SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls & SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PrivacySettingRelayAllCalls;
            static toObject(m: SyncAction.SyncActionValue.PrivacySettingRelayAllCalls, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PrivacySettingRelayAllCalls {
            interface $Properties {
                isEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PrivacySettingRelayAllCalls.$Properties;
        }

        interface IPrivateProcessingSettingAction extends SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Properties {
        }

        class PrivateProcessingSettingAction {
            constructor(p?: SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Properties);
            $unknowns?: Uint8Array[];
            privateProcessingStatus?: (SyncAction.SyncActionValue.PrivateProcessingSettingAction.PrivateProcessingStatus|null);
            static create(properties: SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Shape): SyncAction.SyncActionValue.PrivateProcessingSettingAction & SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Properties): SyncAction.SyncActionValue.PrivateProcessingSettingAction;
            static encode(m: SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PrivateProcessingSettingAction & SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PrivateProcessingSettingAction;
            static toObject(m: SyncAction.SyncActionValue.PrivateProcessingSettingAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PrivateProcessingSettingAction {
            interface $Properties {
                privateProcessingStatus?: (SyncAction.SyncActionValue.PrivateProcessingSettingAction.PrivateProcessingStatus|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PrivateProcessingSettingAction.$Properties;

            enum PrivateProcessingStatus {
                UNDEFINED = 0,
                ENABLED = 1,
                DISABLED = 2
            }
        }

        interface IPushNameSetting extends SyncAction.SyncActionValue.PushNameSetting.$Properties {
        }

        class PushNameSetting {
            constructor(p?: SyncAction.SyncActionValue.PushNameSetting.$Properties);
            $unknowns?: Uint8Array[];
            name?: (string|null);
            static create(properties: SyncAction.SyncActionValue.PushNameSetting.$Shape): SyncAction.SyncActionValue.PushNameSetting & SyncAction.SyncActionValue.PushNameSetting.$Shape;
            static create(properties?: SyncAction.SyncActionValue.PushNameSetting.$Properties): SyncAction.SyncActionValue.PushNameSetting;
            static encode(m: SyncAction.SyncActionValue.PushNameSetting.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.PushNameSetting & SyncAction.SyncActionValue.PushNameSetting.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.PushNameSetting;
            static toObject(m: SyncAction.SyncActionValue.PushNameSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace PushNameSetting {
            interface $Properties {
                name?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.PushNameSetting.$Properties;
        }

        interface IQuickReplyAction extends SyncAction.SyncActionValue.QuickReplyAction.$Properties {
        }

        class QuickReplyAction {
            constructor(p?: SyncAction.SyncActionValue.QuickReplyAction.$Properties);
            $unknowns?: Uint8Array[];
            shortcut?: (string|null);
            message?: (string|null);
            keywords: string[];
            count?: (number|null);
            deleted?: (boolean|null);
            associatedLabelIds: string[];
            static create(properties: SyncAction.SyncActionValue.QuickReplyAction.$Shape): SyncAction.SyncActionValue.QuickReplyAction & SyncAction.SyncActionValue.QuickReplyAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.QuickReplyAction.$Properties): SyncAction.SyncActionValue.QuickReplyAction;
            static encode(m: SyncAction.SyncActionValue.QuickReplyAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.QuickReplyAction & SyncAction.SyncActionValue.QuickReplyAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.QuickReplyAction;
            static toObject(m: SyncAction.SyncActionValue.QuickReplyAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace QuickReplyAction {
            interface $Properties {
                shortcut?: (string|null);
                message?: (string|null);
                keywords?: (string[]|null);
                count?: (number|null);
                deleted?: (boolean|null);
                associatedLabelIds?: (string[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.QuickReplyAction.$Properties;
        }

        interface IRecentEmojiWeightsAction extends SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Properties {
        }

        class RecentEmojiWeightsAction {
            constructor(p?: SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Properties);
            $unknowns?: Uint8Array[];
            weights: SyncAction.RecentEmojiWeight.$Properties[];
            static create(properties: SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Shape): SyncAction.SyncActionValue.RecentEmojiWeightsAction & SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Properties): SyncAction.SyncActionValue.RecentEmojiWeightsAction;
            static encode(m: SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.RecentEmojiWeightsAction & SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.RecentEmojiWeightsAction;
            static toObject(m: SyncAction.SyncActionValue.RecentEmojiWeightsAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace RecentEmojiWeightsAction {
            interface $Properties {
                weights?: (SyncAction.RecentEmojiWeight.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.RecentEmojiWeightsAction.$Properties;
        }

        interface IRemoveRecentStickerAction extends SyncAction.SyncActionValue.RemoveRecentStickerAction.$Properties {
        }

        class RemoveRecentStickerAction {
            constructor(p?: SyncAction.SyncActionValue.RemoveRecentStickerAction.$Properties);
            $unknowns?: Uint8Array[];
            lastStickerSentTs?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.RemoveRecentStickerAction.$Shape): SyncAction.SyncActionValue.RemoveRecentStickerAction & SyncAction.SyncActionValue.RemoveRecentStickerAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.RemoveRecentStickerAction.$Properties): SyncAction.SyncActionValue.RemoveRecentStickerAction;
            static encode(m: SyncAction.SyncActionValue.RemoveRecentStickerAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.RemoveRecentStickerAction & SyncAction.SyncActionValue.RemoveRecentStickerAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.RemoveRecentStickerAction;
            static toObject(m: SyncAction.SyncActionValue.RemoveRecentStickerAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace RemoveRecentStickerAction {
            interface $Properties {
                lastStickerSentTs?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.RemoveRecentStickerAction.$Properties;
        }

        interface ISettingsSyncAction extends SyncAction.SyncActionValue.SettingsSyncAction.$Properties {
        }

        class SettingsSyncAction {
            constructor(p?: SyncAction.SyncActionValue.SettingsSyncAction.$Properties);
            $unknowns?: Uint8Array[];
            startAtLogin?: (boolean|null);
            minimizeToTray?: (boolean|null);
            language?: (string|null);
            replaceTextWithEmoji?: (boolean|null);
            bannerNotificationDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);
            unreadCounterBadgeDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);
            isMessagesNotificationEnabled?: (boolean|null);
            isCallsNotificationEnabled?: (boolean|null);
            isReactionsNotificationEnabled?: (boolean|null);
            isStatusReactionsNotificationEnabled?: (boolean|null);
            isTextPreviewForNotificationEnabled?: (boolean|null);
            defaultNotificationToneId?: (number|null);
            groupDefaultNotificationToneId?: (number|null);
            appTheme?: (number|null);
            wallpaperId?: (number|null);
            isDoodleWallpaperEnabled?: (boolean|null);
            fontSize?: (number|null);
            isPhotosAutodownloadEnabled?: (boolean|null);
            isAudiosAutodownloadEnabled?: (boolean|null);
            isVideosAutodownloadEnabled?: (boolean|null);
            isDocumentsAutodownloadEnabled?: (boolean|null);
            disableLinkPreviews?: (boolean|null);
            notificationToneId?: (number|null);
            mediaUploadQuality?: (SyncAction.SyncActionValue.SettingsSyncAction.MediaQualitySetting|null);
            isSpellCheckEnabled?: (boolean|null);
            isEnterToSendEnabled?: (boolean|null);
            isGroupMessageNotificationEnabled?: (boolean|null);
            isGroupReactionsNotificationEnabled?: (boolean|null);
            isStatusNotificationEnabled?: (boolean|null);
            statusNotificationToneId?: (number|null);
            shouldPlaySoundForCallNotification?: (boolean|null);
            chatThemeId?: (string|null);
            colorSchemeId?: (string|null);
            stockWallpaperImageId?: (string|null);
            static create(properties: SyncAction.SyncActionValue.SettingsSyncAction.$Shape): SyncAction.SyncActionValue.SettingsSyncAction & SyncAction.SyncActionValue.SettingsSyncAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.SettingsSyncAction.$Properties): SyncAction.SyncActionValue.SettingsSyncAction;
            static encode(m: SyncAction.SyncActionValue.SettingsSyncAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SettingsSyncAction & SyncAction.SyncActionValue.SettingsSyncAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SettingsSyncAction;
            static toObject(m: SyncAction.SyncActionValue.SettingsSyncAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SettingsSyncAction {
            interface $Properties {
                startAtLogin?: (boolean|null);
                minimizeToTray?: (boolean|null);
                language?: (string|null);
                replaceTextWithEmoji?: (boolean|null);
                bannerNotificationDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);
                unreadCounterBadgeDisplayMode?: (SyncAction.SyncActionValue.SettingsSyncAction.DisplayMode|null);
                isMessagesNotificationEnabled?: (boolean|null);
                isCallsNotificationEnabled?: (boolean|null);
                isReactionsNotificationEnabled?: (boolean|null);
                isStatusReactionsNotificationEnabled?: (boolean|null);
                isTextPreviewForNotificationEnabled?: (boolean|null);
                defaultNotificationToneId?: (number|null);
                groupDefaultNotificationToneId?: (number|null);
                appTheme?: (number|null);
                wallpaperId?: (number|null);
                isDoodleWallpaperEnabled?: (boolean|null);
                fontSize?: (number|null);
                isPhotosAutodownloadEnabled?: (boolean|null);
                isAudiosAutodownloadEnabled?: (boolean|null);
                isVideosAutodownloadEnabled?: (boolean|null);
                isDocumentsAutodownloadEnabled?: (boolean|null);
                disableLinkPreviews?: (boolean|null);
                notificationToneId?: (number|null);
                mediaUploadQuality?: (SyncAction.SyncActionValue.SettingsSyncAction.MediaQualitySetting|null);
                isSpellCheckEnabled?: (boolean|null);
                isEnterToSendEnabled?: (boolean|null);
                isGroupMessageNotificationEnabled?: (boolean|null);
                isGroupReactionsNotificationEnabled?: (boolean|null);
                isStatusNotificationEnabled?: (boolean|null);
                statusNotificationToneId?: (number|null);
                shouldPlaySoundForCallNotification?: (boolean|null);
                chatThemeId?: (string|null);
                colorSchemeId?: (string|null);
                stockWallpaperImageId?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.SettingsSyncAction.$Properties;

            enum DisplayMode {
                DISPLAY_MODE_UNKNOWN = 0,
                ALWAYS = 1,
                NEVER = 2,
                ONLY_WHEN_APP_IS_OPEN = 3
            }

            enum MediaQualitySetting {
                MEDIA_QUALITY_UNKNOWN = 0,
                STANDARD = 1,
                HD = 2
            }

            enum SettingKey {
                SETTING_KEY_UNKNOWN = 0,
                START_AT_LOGIN = 1,
                MINIMIZE_TO_TRAY = 2,
                LANGUAGE = 3,
                REPLACE_TEXT_WITH_EMOJI = 4,
                BANNER_NOTIFICATION_DISPLAY_MODE = 5,
                UNREAD_COUNTER_BADGE_DISPLAY_MODE = 6,
                IS_MESSAGES_NOTIFICATION_ENABLED = 7,
                IS_CALLS_NOTIFICATION_ENABLED = 8,
                IS_REACTIONS_NOTIFICATION_ENABLED = 9,
                IS_STATUS_REACTIONS_NOTIFICATION_ENABLED = 10,
                IS_TEXT_PREVIEW_FOR_NOTIFICATION_ENABLED = 11,
                DEFAULT_NOTIFICATION_TONE_ID = 12,
                GROUP_DEFAULT_NOTIFICATION_TONE_ID = 13,
                APP_THEME = 14,
                WALLPAPER_ID = 15,
                IS_DOODLE_WALLPAPER_ENABLED = 16,
                FONT_SIZE = 17,
                IS_PHOTOS_AUTODOWNLOAD_ENABLED = 18,
                IS_AUDIOS_AUTODOWNLOAD_ENABLED = 19,
                IS_VIDEOS_AUTODOWNLOAD_ENABLED = 20,
                IS_DOCUMENTS_AUTODOWNLOAD_ENABLED = 21,
                DISABLE_LINK_PREVIEWS = 22,
                NOTIFICATION_TONE_ID = 23,
                MEDIA_UPLOAD_QUALITY = 24,
                IS_SPELL_CHECK_ENABLED = 25,
                IS_ENTER_TO_SEND_ENABLED = 26,
                IS_GROUP_MESSAGE_NOTIFICATION_ENABLED = 27,
                IS_GROUP_REACTIONS_NOTIFICATION_ENABLED = 28,
                IS_STATUS_NOTIFICATION_ENABLED = 29,
                STATUS_NOTIFICATION_TONE_ID = 30,
                SHOULD_PLAY_SOUND_FOR_CALL_NOTIFICATION = 31,
                CHAT_THEME_ID = 32,
                COLOR_SCHEME_ID = 33,
                STOCK_WALLPAPER_IMAGE_ID = 34
            }

            enum SettingPlatform {
                PLATFORM_UNKNOWN = 0,
                WEB = 1,
                HYBRID = 2,
                WINDOWS = 3,
                MAC = 4
            }
        }

        interface ISharedDeviceAllowlistAction extends SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Properties {
        }

        class SharedDeviceAllowlistAction {
            constructor(p?: SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Properties);
            $unknowns?: Uint8Array[];
            allowed?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Shape): SyncAction.SyncActionValue.SharedDeviceAllowlistAction & SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Properties): SyncAction.SyncActionValue.SharedDeviceAllowlistAction;
            static encode(m: SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SharedDeviceAllowlistAction & SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SharedDeviceAllowlistAction;
            static toObject(m: SyncAction.SyncActionValue.SharedDeviceAllowlistAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SharedDeviceAllowlistAction {
            interface $Properties {
                allowed?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.SharedDeviceAllowlistAction.$Properties;
        }

        interface IStarAction extends SyncAction.SyncActionValue.StarAction.$Properties {
        }

        class StarAction {
            constructor(p?: SyncAction.SyncActionValue.StarAction.$Properties);
            $unknowns?: Uint8Array[];
            starred?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.StarAction.$Shape): SyncAction.SyncActionValue.StarAction & SyncAction.SyncActionValue.StarAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.StarAction.$Properties): SyncAction.SyncActionValue.StarAction;
            static encode(m: SyncAction.SyncActionValue.StarAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.StarAction & SyncAction.SyncActionValue.StarAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.StarAction;
            static toObject(m: SyncAction.SyncActionValue.StarAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StarAction {
            interface $Properties {
                starred?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.StarAction.$Properties;
        }

        interface IStatusPostOptInNotificationPreferencesAction extends SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Properties {
        }

        class StatusPostOptInNotificationPreferencesAction {
            constructor(p?: SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Properties);
            $unknowns?: Uint8Array[];
            enabled?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Shape): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction & SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Properties): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction;
            static encode(m: SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction & SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction;
            static toObject(m: SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusPostOptInNotificationPreferencesAction {
            interface $Properties {
                enabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.StatusPostOptInNotificationPreferencesAction.$Properties;
        }

        interface IStatusPrivacyAction extends SyncAction.SyncActionValue.StatusPrivacyAction.$Properties {
        }

        class StatusPrivacyAction {
            constructor(p?: SyncAction.SyncActionValue.StatusPrivacyAction.$Properties);
            $unknowns?: Uint8Array[];
            mode?: (SyncAction.SyncActionValue.StatusPrivacyAction.StatusDistributionMode|null);
            userJid: string[];
            shareToFb?: (boolean|null);
            shareToIg?: (boolean|null);
            customLists: SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Properties[];
            modes: SyncAction.SyncActionValue.StatusPrivacyAction.StatusDistributionMode[];
            static create(properties: SyncAction.SyncActionValue.StatusPrivacyAction.$Shape): SyncAction.SyncActionValue.StatusPrivacyAction & SyncAction.SyncActionValue.StatusPrivacyAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.StatusPrivacyAction.$Properties): SyncAction.SyncActionValue.StatusPrivacyAction;
            static encode(m: SyncAction.SyncActionValue.StatusPrivacyAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.StatusPrivacyAction & SyncAction.SyncActionValue.StatusPrivacyAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.StatusPrivacyAction;
            static toObject(m: SyncAction.SyncActionValue.StatusPrivacyAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StatusPrivacyAction {
            interface $Properties {
                mode?: (SyncAction.SyncActionValue.StatusPrivacyAction.StatusDistributionMode|null);
                userJid?: (string[]|null);
                shareToFb?: (boolean|null);
                shareToIg?: (boolean|null);
                customLists?: (SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Properties[]|null);
                modes?: (SyncAction.SyncActionValue.StatusPrivacyAction.StatusDistributionMode[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.StatusPrivacyAction.$Properties;

            interface ICustomList extends SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Properties {
            }

            class CustomList {
                constructor(p?: SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Properties);
                $unknowns?: Uint8Array[];
                listId?: (string|null);
                name?: (string|null);
                emoji?: (string|null);
                isSelected?: (boolean|null);
                userJid: string[];
                static create(properties: SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Shape): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList & SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Shape;
                static create(properties?: SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Properties): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList;
                static encode(m: SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList & SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Shape;
                static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.StatusPrivacyAction.CustomList;
                static toObject(m: SyncAction.SyncActionValue.StatusPrivacyAction.CustomList, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace CustomList {
                interface $Properties {
                    listId?: (string|null);
                    name?: (string|null);
                    emoji?: (string|null);
                    isSelected?: (boolean|null);
                    userJid?: (string[]|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = SyncAction.SyncActionValue.StatusPrivacyAction.CustomList.$Properties;
            }

            enum StatusDistributionMode {
                ALLOW_LIST = 0,
                DENY_LIST = 1,
                CONTACTS = 2,
                CLOSE_FRIENDS = 3,
                CUSTOM_LIST = 4
            }
        }

        interface IStickerAction extends SyncAction.SyncActionValue.StickerAction.$Properties {
        }

        class StickerAction {
            constructor(p?: SyncAction.SyncActionValue.StickerAction.$Properties);
            $unknowns?: Uint8Array[];
            url?: (string|null);
            fileEncSha256?: (Uint8Array|null);
            mediaKey?: (Uint8Array|null);
            mimetype?: (string|null);
            height?: (number|null);
            width?: (number|null);
            directPath?: (string|null);
            fileLength?: (number|Long|null);
            isFavorite?: (boolean|null);
            deviceIdHint?: (number|null);
            isLottie?: (boolean|null);
            imageHash?: (string|null);
            isAvatarSticker?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.StickerAction.$Shape): SyncAction.SyncActionValue.StickerAction & SyncAction.SyncActionValue.StickerAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.StickerAction.$Properties): SyncAction.SyncActionValue.StickerAction;
            static encode(m: SyncAction.SyncActionValue.StickerAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.StickerAction & SyncAction.SyncActionValue.StickerAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.StickerAction;
            static toObject(m: SyncAction.SyncActionValue.StickerAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace StickerAction {
            interface $Properties {
                url?: (string|null);
                fileEncSha256?: (Uint8Array|null);
                mediaKey?: (Uint8Array|null);
                mimetype?: (string|null);
                height?: (number|null);
                width?: (number|null);
                directPath?: (string|null);
                fileLength?: (number|Long|null);
                isFavorite?: (boolean|null);
                deviceIdHint?: (number|null);
                isLottie?: (boolean|null);
                imageHash?: (string|null);
                isAvatarSticker?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.StickerAction.$Properties;
        }

        interface ISubscriptionAction extends SyncAction.SyncActionValue.SubscriptionAction.$Properties {
        }

        class SubscriptionAction {
            constructor(p?: SyncAction.SyncActionValue.SubscriptionAction.$Properties);
            $unknowns?: Uint8Array[];
            isDeactivated?: (boolean|null);
            isAutoRenewing?: (boolean|null);
            expirationDate?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.SubscriptionAction.$Shape): SyncAction.SyncActionValue.SubscriptionAction & SyncAction.SyncActionValue.SubscriptionAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.SubscriptionAction.$Properties): SyncAction.SyncActionValue.SubscriptionAction;
            static encode(m: SyncAction.SyncActionValue.SubscriptionAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SubscriptionAction & SyncAction.SyncActionValue.SubscriptionAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionAction;
            static toObject(m: SyncAction.SyncActionValue.SubscriptionAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SubscriptionAction {
            interface $Properties {
                isDeactivated?: (boolean|null);
                isAutoRenewing?: (boolean|null);
                expirationDate?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.SubscriptionAction.$Properties;
        }

        interface ISubscriptionsSyncV2Action extends SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Properties {
        }

        class SubscriptionsSyncV2Action {
            constructor(p?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Properties);
            $unknowns?: Uint8Array[];
            subscriptions: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Properties[];
            paidFeature: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Properties[];
            static create(properties: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Shape): SyncAction.SyncActionValue.SubscriptionsSyncV2Action & SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Shape;
            static create(properties?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Properties): SyncAction.SyncActionValue.SubscriptionsSyncV2Action;
            static encode(m: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SubscriptionsSyncV2Action & SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionsSyncV2Action;
            static toObject(m: SyncAction.SyncActionValue.SubscriptionsSyncV2Action, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SubscriptionsSyncV2Action {
            interface $Properties {
                subscriptions?: (SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Properties[]|null);
                paidFeature?: (SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.SubscriptionsSyncV2Action.$Properties;

            interface IPaidFeature extends SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Properties {
            }

            class PaidFeature {
                constructor(p?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Properties);
                $unknowns?: Uint8Array[];
                name?: (string|null);
                enabled?: (boolean|null);
                limit?: (number|null);
                expirationTime?: (number|Long|null);
                static create(properties: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Shape): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature & SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Shape;
                static create(properties?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Properties): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature;
                static encode(m: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature & SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Shape;
                static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature;
                static toObject(m: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace PaidFeature {
                interface $Properties {
                    name?: (string|null);
                    enabled?: (boolean|null);
                    limit?: (number|null);
                    expirationTime?: (number|Long|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = SyncAction.SyncActionValue.SubscriptionsSyncV2Action.PaidFeature.$Properties;
            }

            interface ISubscriptionInfo extends SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Properties {
            }

            class SubscriptionInfo {
                constructor(p?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Properties);
                $unknowns?: Uint8Array[];
                id?: (string|null);
                tier?: (number|null);
                status?: (string|null);
                startTime?: (number|Long|null);
                endTime?: (number|Long|null);
                isPlatformChanged?: (boolean|null);
                source?: (string|null);
                creationTime?: (number|Long|null);
                static create(properties: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Shape): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo & SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Shape;
                static create(properties?: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Properties): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo;
                static encode(m: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo & SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Shape;
                static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo;
                static toObject(m: SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace SubscriptionInfo {
                interface $Properties {
                    id?: (string|null);
                    tier?: (number|null);
                    status?: (string|null);
                    startTime?: (number|Long|null);
                    endTime?: (number|Long|null);
                    isPlatformChanged?: (boolean|null);
                    source?: (string|null);
                    creationTime?: (number|Long|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = SyncAction.SyncActionValue.SubscriptionsSyncV2Action.SubscriptionInfo.$Properties;
            }
        }

        interface ISyncActionMessage extends SyncAction.SyncActionValue.SyncActionMessage.$Properties {
        }

        class SyncActionMessage {
            constructor(p?: SyncAction.SyncActionValue.SyncActionMessage.$Properties);
            $unknowns?: Uint8Array[];
            key?: (Protocol.MessageKey.$Properties|null);
            timestamp?: (number|Long|null);
            static create(properties: SyncAction.SyncActionValue.SyncActionMessage.$Shape): SyncAction.SyncActionValue.SyncActionMessage & SyncAction.SyncActionValue.SyncActionMessage.$Shape;
            static create(properties?: SyncAction.SyncActionValue.SyncActionMessage.$Properties): SyncAction.SyncActionValue.SyncActionMessage;
            static encode(m: SyncAction.SyncActionValue.SyncActionMessage.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SyncActionMessage & SyncAction.SyncActionValue.SyncActionMessage.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SyncActionMessage;
            static toObject(m: SyncAction.SyncActionValue.SyncActionMessage, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SyncActionMessage {
            interface $Properties {
                key?: (Protocol.MessageKey.$Properties|null);
                timestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.SyncActionMessage.$Properties;
        }

        interface ISyncActionMessageRange extends SyncAction.SyncActionValue.SyncActionMessageRange.$Properties {
        }

        class SyncActionMessageRange {
            constructor(p?: SyncAction.SyncActionValue.SyncActionMessageRange.$Properties);
            $unknowns?: Uint8Array[];
            lastMessageTimestamp?: (number|Long|null);
            lastSystemMessageTimestamp?: (number|Long|null);
            messages: SyncAction.SyncActionValue.SyncActionMessage.$Properties[];
            static create(properties: SyncAction.SyncActionValue.SyncActionMessageRange.$Shape): SyncAction.SyncActionValue.SyncActionMessageRange & SyncAction.SyncActionValue.SyncActionMessageRange.$Shape;
            static create(properties?: SyncAction.SyncActionValue.SyncActionMessageRange.$Properties): SyncAction.SyncActionValue.SyncActionMessageRange;
            static encode(m: SyncAction.SyncActionValue.SyncActionMessageRange.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.SyncActionMessageRange & SyncAction.SyncActionValue.SyncActionMessageRange.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.SyncActionMessageRange;
            static toObject(m: SyncAction.SyncActionValue.SyncActionMessageRange, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace SyncActionMessageRange {
            interface $Properties {
                lastMessageTimestamp?: (number|Long|null);
                lastSystemMessageTimestamp?: (number|Long|null);
                messages?: (SyncAction.SyncActionValue.SyncActionMessage.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.SyncActionMessageRange.$Properties;
        }

        interface IThreadPinAction extends SyncAction.SyncActionValue.ThreadPinAction.$Properties {
        }

        class ThreadPinAction {
            constructor(p?: SyncAction.SyncActionValue.ThreadPinAction.$Properties);
            $unknowns?: Uint8Array[];
            pinned?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.ThreadPinAction.$Shape): SyncAction.SyncActionValue.ThreadPinAction & SyncAction.SyncActionValue.ThreadPinAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.ThreadPinAction.$Properties): SyncAction.SyncActionValue.ThreadPinAction;
            static encode(m: SyncAction.SyncActionValue.ThreadPinAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.ThreadPinAction & SyncAction.SyncActionValue.ThreadPinAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.ThreadPinAction;
            static toObject(m: SyncAction.SyncActionValue.ThreadPinAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ThreadPinAction {
            interface $Properties {
                pinned?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.ThreadPinAction.$Properties;
        }

        interface ITimeFormatAction extends SyncAction.SyncActionValue.TimeFormatAction.$Properties {
        }

        class TimeFormatAction {
            constructor(p?: SyncAction.SyncActionValue.TimeFormatAction.$Properties);
            $unknowns?: Uint8Array[];
            isTwentyFourHourFormatEnabled?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.TimeFormatAction.$Shape): SyncAction.SyncActionValue.TimeFormatAction & SyncAction.SyncActionValue.TimeFormatAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.TimeFormatAction.$Properties): SyncAction.SyncActionValue.TimeFormatAction;
            static encode(m: SyncAction.SyncActionValue.TimeFormatAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.TimeFormatAction & SyncAction.SyncActionValue.TimeFormatAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.TimeFormatAction;
            static toObject(m: SyncAction.SyncActionValue.TimeFormatAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TimeFormatAction {
            interface $Properties {
                isTwentyFourHourFormatEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.TimeFormatAction.$Properties;
        }

        interface IUGCBot extends SyncAction.SyncActionValue.UGCBot.$Properties {
        }

        class UGCBot {
            constructor(p?: SyncAction.SyncActionValue.UGCBot.$Properties);
            $unknowns?: Uint8Array[];
            definition?: (Uint8Array|null);
            static create(properties: SyncAction.SyncActionValue.UGCBot.$Shape): SyncAction.SyncActionValue.UGCBot & SyncAction.SyncActionValue.UGCBot.$Shape;
            static create(properties?: SyncAction.SyncActionValue.UGCBot.$Properties): SyncAction.SyncActionValue.UGCBot;
            static encode(m: SyncAction.SyncActionValue.UGCBot.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.UGCBot & SyncAction.SyncActionValue.UGCBot.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.UGCBot;
            static toObject(m: SyncAction.SyncActionValue.UGCBot, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UGCBot {
            interface $Properties {
                definition?: (Uint8Array|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.UGCBot.$Properties;
        }

        interface IUnarchiveChatsSetting extends SyncAction.SyncActionValue.UnarchiveChatsSetting.$Properties {
        }

        class UnarchiveChatsSetting {
            constructor(p?: SyncAction.SyncActionValue.UnarchiveChatsSetting.$Properties);
            $unknowns?: Uint8Array[];
            unarchiveChats?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.UnarchiveChatsSetting.$Shape): SyncAction.SyncActionValue.UnarchiveChatsSetting & SyncAction.SyncActionValue.UnarchiveChatsSetting.$Shape;
            static create(properties?: SyncAction.SyncActionValue.UnarchiveChatsSetting.$Properties): SyncAction.SyncActionValue.UnarchiveChatsSetting;
            static encode(m: SyncAction.SyncActionValue.UnarchiveChatsSetting.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.UnarchiveChatsSetting & SyncAction.SyncActionValue.UnarchiveChatsSetting.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.UnarchiveChatsSetting;
            static toObject(m: SyncAction.SyncActionValue.UnarchiveChatsSetting, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UnarchiveChatsSetting {
            interface $Properties {
                unarchiveChats?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.UnarchiveChatsSetting.$Properties;
        }

        interface IUserStatusMuteAction extends SyncAction.SyncActionValue.UserStatusMuteAction.$Properties {
        }

        class UserStatusMuteAction {
            constructor(p?: SyncAction.SyncActionValue.UserStatusMuteAction.$Properties);
            $unknowns?: Uint8Array[];
            muted?: (boolean|null);
            static create(properties: SyncAction.SyncActionValue.UserStatusMuteAction.$Shape): SyncAction.SyncActionValue.UserStatusMuteAction & SyncAction.SyncActionValue.UserStatusMuteAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.UserStatusMuteAction.$Properties): SyncAction.SyncActionValue.UserStatusMuteAction;
            static encode(m: SyncAction.SyncActionValue.UserStatusMuteAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.UserStatusMuteAction & SyncAction.SyncActionValue.UserStatusMuteAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.UserStatusMuteAction;
            static toObject(m: SyncAction.SyncActionValue.UserStatusMuteAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UserStatusMuteAction {
            interface $Properties {
                muted?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.UserStatusMuteAction.$Properties;
        }

        interface IUsernameChatStartModeAction extends SyncAction.SyncActionValue.UsernameChatStartModeAction.$Properties {
        }

        class UsernameChatStartModeAction {
            constructor(p?: SyncAction.SyncActionValue.UsernameChatStartModeAction.$Properties);
            $unknowns?: Uint8Array[];
            chatStartMode?: (SyncAction.SyncActionValue.UsernameChatStartModeAction.ChatStartMode|null);
            static create(properties: SyncAction.SyncActionValue.UsernameChatStartModeAction.$Shape): SyncAction.SyncActionValue.UsernameChatStartModeAction & SyncAction.SyncActionValue.UsernameChatStartModeAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.UsernameChatStartModeAction.$Properties): SyncAction.SyncActionValue.UsernameChatStartModeAction;
            static encode(m: SyncAction.SyncActionValue.UsernameChatStartModeAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.UsernameChatStartModeAction & SyncAction.SyncActionValue.UsernameChatStartModeAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.UsernameChatStartModeAction;
            static toObject(m: SyncAction.SyncActionValue.UsernameChatStartModeAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UsernameChatStartModeAction {
            interface $Properties {
                chatStartMode?: (SyncAction.SyncActionValue.UsernameChatStartModeAction.ChatStartMode|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.UsernameChatStartModeAction.$Properties;

            enum ChatStartMode {
                LID = 1,
                PN = 2
            }
        }

        interface IWASARootSecretAction extends SyncAction.SyncActionValue.WASARootSecretAction.$Properties {
        }

        class WASARootSecretAction {
            constructor(p?: SyncAction.SyncActionValue.WASARootSecretAction.$Properties);
            $unknowns?: Uint8Array[];
            secrets: SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Properties[];
            static create(properties: SyncAction.SyncActionValue.WASARootSecretAction.$Shape): SyncAction.SyncActionValue.WASARootSecretAction & SyncAction.SyncActionValue.WASARootSecretAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.WASARootSecretAction.$Properties): SyncAction.SyncActionValue.WASARootSecretAction;
            static encode(m: SyncAction.SyncActionValue.WASARootSecretAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.WASARootSecretAction & SyncAction.SyncActionValue.WASARootSecretAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.WASARootSecretAction;
            static toObject(m: SyncAction.SyncActionValue.WASARootSecretAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace WASARootSecretAction {
            interface $Properties {
                secrets?: (SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Properties[]|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.WASARootSecretAction.$Properties;

            interface IRootSecretEntry extends SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Properties {
            }

            class RootSecretEntry {
                constructor(p?: SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Properties);
                $unknowns?: Uint8Array[];
                id?: (string|null);
                rootSecret?: (Uint8Array|null);
                epoch?: (number|Long|null);
                status?: (SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.Status|null);
                static create(properties: SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Shape): SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry & SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Shape;
                static create(properties?: SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Properties): SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry;
                static encode(m: SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry & SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Shape;
                static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry;
                static toObject(m: SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace RootSecretEntry {
                interface $Properties {
                    id?: (string|null);
                    rootSecret?: (Uint8Array|null);
                    epoch?: (number|Long|null);
                    status?: (SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.Status|null);
                    $unknowns?: Uint8Array[];
                }
                type $Shape = SyncAction.SyncActionValue.WASARootSecretAction.RootSecretEntry.$Properties;

                enum Status {
                    INACTIVE = 0,
                    ACTIVE = 1
                }
            }
        }

        interface IWaffleAccountLinkStateAction extends SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Properties {
        }

        class WaffleAccountLinkStateAction {
            constructor(p?: SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Properties);
            $unknowns?: Uint8Array[];
            linkState?: (SyncAction.SyncActionValue.WaffleAccountLinkStateAction.AccountLinkState|null);
            static create(properties: SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Shape): SyncAction.SyncActionValue.WaffleAccountLinkStateAction & SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Properties): SyncAction.SyncActionValue.WaffleAccountLinkStateAction;
            static encode(m: SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.WaffleAccountLinkStateAction & SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.WaffleAccountLinkStateAction;
            static toObject(m: SyncAction.SyncActionValue.WaffleAccountLinkStateAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace WaffleAccountLinkStateAction {
            interface $Properties {
                linkState?: (SyncAction.SyncActionValue.WaffleAccountLinkStateAction.AccountLinkState|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.WaffleAccountLinkStateAction.$Properties;

            enum AccountLinkState {
                ACTIVE = 0,
                PAUSED = 1,
                UNLINKED = 2
            }
        }

        interface IWamoUserIdentifierAction extends SyncAction.SyncActionValue.WamoUserIdentifierAction.$Properties {
        }

        class WamoUserIdentifierAction {
            constructor(p?: SyncAction.SyncActionValue.WamoUserIdentifierAction.$Properties);
            $unknowns?: Uint8Array[];
            identifier?: (string|null);
            static create(properties: SyncAction.SyncActionValue.WamoUserIdentifierAction.$Shape): SyncAction.SyncActionValue.WamoUserIdentifierAction & SyncAction.SyncActionValue.WamoUserIdentifierAction.$Shape;
            static create(properties?: SyncAction.SyncActionValue.WamoUserIdentifierAction.$Properties): SyncAction.SyncActionValue.WamoUserIdentifierAction;
            static encode(m: SyncAction.SyncActionValue.WamoUserIdentifierAction.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.SyncActionValue.WamoUserIdentifierAction & SyncAction.SyncActionValue.WamoUserIdentifierAction.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.SyncActionValue.WamoUserIdentifierAction;
            static toObject(m: SyncAction.SyncActionValue.WamoUserIdentifierAction, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace WamoUserIdentifierAction {
            interface $Properties {
                identifier?: (string|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.SyncActionValue.WamoUserIdentifierAction.$Properties;
        }
    }

    interface ICallLogRecord extends SyncAction.CallLogRecord.$Properties {
    }

    class CallLogRecord {
        constructor(p?: SyncAction.CallLogRecord.$Properties);
        $unknowns?: Uint8Array[];
        callResult?: (SyncAction.CallLogRecord.CallResult|null);
        isDndMode?: (boolean|null);
        silenceReason?: (SyncAction.CallLogRecord.SilenceReason|null);
        duration?: (number|Long|null);
        startTime?: (number|Long|null);
        isIncoming?: (boolean|null);
        isVideo?: (boolean|null);
        isCallLink?: (boolean|null);
        callLinkToken?: (string|null);
        scheduledCallId?: (string|null);
        callId?: (string|null);
        callCreatorJid?: (string|null);
        groupJid?: (string|null);
        participants: SyncAction.CallLogRecord.ParticipantInfo.$Properties[];
        callType?: (SyncAction.CallLogRecord.CallType|null);
        static create(properties: SyncAction.CallLogRecord.$Shape): SyncAction.CallLogRecord & SyncAction.CallLogRecord.$Shape;
        static create(properties?: SyncAction.CallLogRecord.$Properties): SyncAction.CallLogRecord;
        static encode(m: SyncAction.CallLogRecord.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.CallLogRecord & SyncAction.CallLogRecord.$Shape;
        static fromObject(d: { [k: string]: any }): SyncAction.CallLogRecord;
        static toObject(m: SyncAction.CallLogRecord, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace CallLogRecord {
        interface $Properties {
            callResult?: (SyncAction.CallLogRecord.CallResult|null);
            isDndMode?: (boolean|null);
            silenceReason?: (SyncAction.CallLogRecord.SilenceReason|null);
            duration?: (number|Long|null);
            startTime?: (number|Long|null);
            isIncoming?: (boolean|null);
            isVideo?: (boolean|null);
            isCallLink?: (boolean|null);
            callLinkToken?: (string|null);
            scheduledCallId?: (string|null);
            callId?: (string|null);
            callCreatorJid?: (string|null);
            groupJid?: (string|null);
            participants?: (SyncAction.CallLogRecord.ParticipantInfo.$Properties[]|null);
            callType?: (SyncAction.CallLogRecord.CallType|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = SyncAction.CallLogRecord.$Properties;

        enum CallResult {
            CONNECTED = 0,
            REJECTED = 1,
            CANCELLED = 2,
            ACCEPTEDELSEWHERE = 3,
            MISSED = 4,
            INVALID = 5,
            UNAVAILABLE = 6,
            UPCOMING = 7,
            FAILED = 8,
            ABANDONED = 9,
            ONGOING = 10
        }

        enum CallType {
            REGULAR = 0,
            SCHEDULED_CALL = 1,
            VOICE_CHAT = 2
        }

        interface IParticipantInfo extends SyncAction.CallLogRecord.ParticipantInfo.$Properties {
        }

        class ParticipantInfo {
            constructor(p?: SyncAction.CallLogRecord.ParticipantInfo.$Properties);
            $unknowns?: Uint8Array[];
            userJid?: (string|null);
            callResult?: (SyncAction.CallLogRecord.CallResult|null);
            static create(properties: SyncAction.CallLogRecord.ParticipantInfo.$Shape): SyncAction.CallLogRecord.ParticipantInfo & SyncAction.CallLogRecord.ParticipantInfo.$Shape;
            static create(properties?: SyncAction.CallLogRecord.ParticipantInfo.$Properties): SyncAction.CallLogRecord.ParticipantInfo;
            static encode(m: SyncAction.CallLogRecord.ParticipantInfo.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.CallLogRecord.ParticipantInfo & SyncAction.CallLogRecord.ParticipantInfo.$Shape;
            static fromObject(d: { [k: string]: any }): SyncAction.CallLogRecord.ParticipantInfo;
            static toObject(m: SyncAction.CallLogRecord.ParticipantInfo, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ParticipantInfo {
            interface $Properties {
                userJid?: (string|null);
                callResult?: (SyncAction.CallLogRecord.CallResult|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = SyncAction.CallLogRecord.ParticipantInfo.$Properties;
        }

        enum SilenceReason {
            NONE = 0,
            SCHEDULED = 1,
            PRIVACY = 2,
            LIGHTWEIGHT = 3
        }
    }

    interface IRecentEmojiWeight extends SyncAction.RecentEmojiWeight.$Properties {
    }

    class RecentEmojiWeight {
        constructor(p?: SyncAction.RecentEmojiWeight.$Properties);
        $unknowns?: Uint8Array[];
        emoji?: (string|null);
        weight?: (number|null);
        static create(properties: SyncAction.RecentEmojiWeight.$Shape): SyncAction.RecentEmojiWeight & SyncAction.RecentEmojiWeight.$Shape;
        static create(properties?: SyncAction.RecentEmojiWeight.$Properties): SyncAction.RecentEmojiWeight;
        static encode(m: SyncAction.RecentEmojiWeight.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): SyncAction.RecentEmojiWeight & SyncAction.RecentEmojiWeight.$Shape;
        static fromObject(d: { [k: string]: any }): SyncAction.RecentEmojiWeight;
        static toObject(m: SyncAction.RecentEmojiWeight, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace RecentEmojiWeight {
        interface $Properties {
            emoji?: (string|null);
            weight?: (number|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = SyncAction.RecentEmojiWeight.$Properties;
    }

    enum MutationProps {
        STAR_ACTION = 2,
        CONTACT_ACTION = 3,
        MUTE_ACTION = 4,
        PIN_ACTION = 5,
        SECURITY_NOTIFICATION_SETTING = 6,
        PUSH_NAME_SETTING = 7,
        QUICK_REPLY_ACTION = 8,
        RECENT_EMOJI_WEIGHTS_ACTION = 11,
        LABEL_MESSAGE_ACTION = 13,
        LABEL_EDIT_ACTION = 14,
        LABEL_ASSOCIATION_ACTION = 15,
        LOCALE_SETTING = 16,
        ARCHIVE_CHAT_ACTION = 17,
        DELETE_MESSAGE_FOR_ME_ACTION = 18,
        KEY_EXPIRATION = 19,
        MARK_CHAT_AS_READ_ACTION = 20,
        CLEAR_CHAT_ACTION = 21,
        DELETE_CHAT_ACTION = 22,
        UNARCHIVE_CHATS_SETTING = 23,
        PRIMARY_FEATURE = 24,
        ANDROID_UNSUPPORTED_ACTIONS = 26,
        AGENT_ACTION = 27,
        SUBSCRIPTION_ACTION = 28,
        USER_STATUS_MUTE_ACTION = 29,
        TIME_FORMAT_ACTION = 30,
        NUX_ACTION = 31,
        PRIMARY_VERSION_ACTION = 32,
        STICKER_ACTION = 33,
        REMOVE_RECENT_STICKER_ACTION = 34,
        CHAT_ASSIGNMENT = 35,
        CHAT_ASSIGNMENT_OPENED_STATUS = 36,
        PN_FOR_LID_CHAT_ACTION = 37,
        MARKETING_MESSAGE_ACTION = 38,
        MARKETING_MESSAGE_BROADCAST_ACTION = 39,
        EXTERNAL_WEB_BETA_ACTION = 40,
        PRIVACY_SETTING_RELAY_ALL_CALLS = 41,
        CALL_LOG_ACTION = 42,
        UGC_BOT = 43,
        STATUS_PRIVACY = 44,
        BOT_WELCOME_REQUEST_ACTION = 45,
        DELETE_INDIVIDUAL_CALL_LOG = 46,
        LABEL_REORDERING_ACTION = 47,
        PAYMENT_INFO_ACTION = 48,
        CUSTOM_PAYMENT_METHODS_ACTION = 49,
        LOCK_CHAT_ACTION = 50,
        CHAT_LOCK_SETTINGS = 51,
        WAMO_USER_IDENTIFIER_ACTION = 52,
        PRIVACY_SETTING_DISABLE_LINK_PREVIEWS_ACTION = 53,
        DEVICE_CAPABILITIES = 54,
        NOTE_EDIT_ACTION = 55,
        FAVORITES_ACTION = 56,
        MERCHANT_PAYMENT_PARTNER_ACTION = 57,
        WAFFLE_ACCOUNT_LINK_STATE_ACTION = 58,
        USERNAME_CHAT_START_MODE = 59,
        NOTIFICATION_ACTIVITY_SETTING_ACTION = 60,
        LID_CONTACT_ACTION = 61,
        CTWA_PER_CUSTOMER_DATA_SHARING_ACTION = 62,
        PAYMENT_TOS_ACTION = 63,
        PRIVACY_SETTING_CHANNELS_PERSONALISED_RECOMMENDATION_ACTION = 64,
        BUSINESS_BROADCAST_ASSOCIATION_ACTION = 65,
        DETECTED_OUTCOMES_STATUS_ACTION = 66,
        MAIBA_AI_FEATURES_CONTROL_ACTION = 68,
        BUSINESS_BROADCAST_LIST_ACTION = 69,
        MUSIC_USER_ID_ACTION = 70,
        STATUS_POST_OPT_IN_NOTIFICATION_PREFERENCES_ACTION = 71,
        AVATAR_UPDATED_ACTION = 72,
        GALAXY_FLOW_ACTION = 73,
        PRIVATE_PROCESSING_SETTING_ACTION = 74,
        NEWSLETTER_SAVED_INTERESTS_ACTION = 75,
        AI_THREAD_RENAME_ACTION = 76,
        INTERACTIVE_MESSAGE_ACTION = 77,
        SETTINGS_SYNC_ACTION = 78,
        OUT_CONTACT_ACTION = 79,
        NCT_SALT_SYNC_ACTION = 80,
        BUSINESS_BROADCAST_CAMPAIGN_ACTION = 81,
        BUSINESS_BROADCAST_INSIGHTS_ACTION = 82,
        CUSTOMER_DATA_ACTION = 83,
        SUBSCRIPTIONS_SYNC_V2_ACTION = 84,
        THREAD_PIN_ACTION = 85,
        AUTO_ORGANIZE_BUSINESS_CHAT_SETTING = 86,
        BIZ_AI_SETTINGS_NUDGE_ACTION = 87,
        COEX_V2_VERSION_ACTION = 88,
        WASA_ROOT_SECRET_ACTION = 89,
        BUBBLE_LOCK_MESSAGE_ACTION = 90,
        LABEL_SUBLIST_ACTION = 91,
        DEVICE_CAPABILITIES_V2 = 92,
        CTWA_MESSAGE_RECEIVED_ACTION = 93,
        SHARED_DEVICE_ALLOWLIST_ACTION = 94,
        CONTACT_MANAGER_METADATA_ACTION = 95,
        BUSINESS_FOLDER_ACTIVATION_ACTION = 96,
        SHARE_OWN_PN = 10001,
        BUSINESS_BROADCAST_ACTION = 10002,
        AI_THREAD_DELETE_ACTION = 10003
    }

    enum CollectionName {
        COLLECTION_NAME_UNKNOWN = 0,
        REGULAR = 1,
        REGULAR_LOW = 2,
        REGULAR_HIGH = 3,
        CRITICAL_BLOCK = 4,
        CRITICAL_UNBLOCK_LOW = 5
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

export namespace ChatLockSettings {

    interface IChatLockSettings extends ChatLockSettings.ChatLockSettings.$Properties {
    }

    class ChatLockSettings {
        constructor(p?: ChatLockSettings.ChatLockSettings.$Properties);
        $unknowns?: Uint8Array[];
        hideLockedChats?: (boolean|null);
        secretCode?: (UserPassword.UserPassword.$Properties|null);
        static create(properties: ChatLockSettings.ChatLockSettings.$Shape): ChatLockSettings.ChatLockSettings & ChatLockSettings.ChatLockSettings.$Shape;
        static create(properties?: ChatLockSettings.ChatLockSettings.$Properties): ChatLockSettings.ChatLockSettings;
        static encode(m: ChatLockSettings.ChatLockSettings.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ChatLockSettings.ChatLockSettings & ChatLockSettings.ChatLockSettings.$Shape;
        static fromObject(d: { [k: string]: any }): ChatLockSettings.ChatLockSettings;
        static toObject(m: ChatLockSettings.ChatLockSettings, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace ChatLockSettings {
        interface $Properties {
            hideLockedChats?: (boolean|null);
            secretCode?: (UserPassword.UserPassword.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          hideLockedChats?: boolean|null;
          secretCode?: UserPassword.UserPassword.$Shape|null;
          $unknowns?: Uint8Array[];
        };
    }
}

export namespace UserPassword {

    interface IUserPassword extends UserPassword.UserPassword.$Properties {
    }

    class UserPassword {
        constructor(p?: UserPassword.UserPassword.$Properties);
        $unknowns?: Uint8Array[];
        encoding?: (UserPassword.UserPassword.Encoding|null);
        transformer?: (UserPassword.UserPassword.Transformer|null);
        transformerArg: UserPassword.UserPassword.TransformerArg.$Properties[];
        transformedData?: (Uint8Array|null);
        static create(properties: UserPassword.UserPassword.$Shape): UserPassword.UserPassword & UserPassword.UserPassword.$Shape;
        static create(properties?: UserPassword.UserPassword.$Properties): UserPassword.UserPassword;
        static encode(m: UserPassword.UserPassword.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): UserPassword.UserPassword & UserPassword.UserPassword.$Shape;
        static fromObject(d: { [k: string]: any }): UserPassword.UserPassword;
        static toObject(m: UserPassword.UserPassword, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace UserPassword {
        interface $Properties {
            encoding?: (UserPassword.UserPassword.Encoding|null);
            transformer?: (UserPassword.UserPassword.Transformer|null);
            transformerArg?: (UserPassword.UserPassword.TransformerArg.$Properties[]|null);
            transformedData?: (Uint8Array|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = {
          encoding?: UserPassword.UserPassword.Encoding|null;
          transformer?: UserPassword.UserPassword.Transformer|null;
          transformerArg?: UserPassword.UserPassword.TransformerArg.$Shape[]|null;
          transformedData?: Uint8Array|null;
          $unknowns?: Uint8Array[];
        };

        enum Encoding {
            UTF8 = 0,
            UTF8_BROKEN = 1
        }

        enum Transformer {
            NONE = 0,
            PBKDF2_HMAC_SHA512 = 1,
            PBKDF2_HMAC_SHA384 = 2
        }

        interface ITransformerArg extends UserPassword.UserPassword.TransformerArg.$Properties {
        }

        class TransformerArg {
            constructor(p?: UserPassword.UserPassword.TransformerArg.$Properties);
            $unknowns?: Uint8Array[];
            key?: (string|null);
            value?: (UserPassword.UserPassword.TransformerArg.Value.$Properties|null);
            static create(properties: UserPassword.UserPassword.TransformerArg.$Shape): UserPassword.UserPassword.TransformerArg & UserPassword.UserPassword.TransformerArg.$Shape;
            static create(properties?: UserPassword.UserPassword.TransformerArg.$Properties): UserPassword.UserPassword.TransformerArg;
            static encode(m: UserPassword.UserPassword.TransformerArg.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): UserPassword.UserPassword.TransformerArg & UserPassword.UserPassword.TransformerArg.$Shape;
            static fromObject(d: { [k: string]: any }): UserPassword.UserPassword.TransformerArg;
            static toObject(m: UserPassword.UserPassword.TransformerArg, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace TransformerArg {
            interface $Properties {
                key?: (string|null);
                value?: (UserPassword.UserPassword.TransformerArg.Value.$Properties|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = {
              key?: string|null;
              value?: UserPassword.UserPassword.TransformerArg.Value.$Shape|null;
              $unknowns?: Uint8Array[];
            };

            interface IValue extends UserPassword.UserPassword.TransformerArg.Value.$Properties {
            }

            class Value {
                constructor(p?: UserPassword.UserPassword.TransformerArg.Value.$Properties);
                $unknowns?: Uint8Array[];
                asBlob?: (Uint8Array|null);
                asUnsignedInteger?: (number|null);
                value?: ("asBlob"|"asUnsignedInteger");
                static create(properties: UserPassword.UserPassword.TransformerArg.Value.$Shape): UserPassword.UserPassword.TransformerArg.Value & UserPassword.UserPassword.TransformerArg.Value.$Shape;
                static create(properties?: UserPassword.UserPassword.TransformerArg.Value.$Properties): UserPassword.UserPassword.TransformerArg.Value;
                static encode(m: UserPassword.UserPassword.TransformerArg.Value.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
                static decode(r: ($protobuf.Reader|Uint8Array), l?: number): UserPassword.UserPassword.TransformerArg.Value & UserPassword.UserPassword.TransformerArg.Value.$Shape;
                static fromObject(d: { [k: string]: any }): UserPassword.UserPassword.TransformerArg.Value;
                static toObject(m: UserPassword.UserPassword.TransformerArg.Value, o?: $protobuf.IConversionOptions): { [k: string]: any };
                toJSON(): { [k: string]: any };
                static getTypeUrl(prefix?: string): string;
            }

            namespace Value {
                interface $Properties {
                    asBlob?: (Uint8Array|null);
                    asUnsignedInteger?: (number|null);
                    value?: ("asBlob"|"asUnsignedInteger");
                    $unknowns?: Uint8Array[];
                }
                type $Shape = {
                  asBlob?: Uint8Array|null;
                  asUnsignedInteger?: number|null;
                  $unknowns?: Uint8Array[];
                } & (
                  ({ value?: undefined; asBlob?: null; asUnsignedInteger?: null }|{ value?: "asBlob"; asBlob: Uint8Array; asUnsignedInteger?: null }|{ value?: "asUnsignedInteger"; asBlob?: null; asUnsignedInteger: number })
                );
            }
        }
    }
}

export namespace DeviceCapabilities {

    interface IDeviceCapabilities extends DeviceCapabilities.DeviceCapabilities.$Properties {
    }

    class DeviceCapabilities {
        constructor(p?: DeviceCapabilities.DeviceCapabilities.$Properties);
        $unknowns?: Uint8Array[];
        chatLockSupportLevel?: (DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel|null);
        lidMigration?: (DeviceCapabilities.DeviceCapabilities.LIDMigration.$Properties|null);
        businessBroadcast?: (DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Properties|null);
        userHasAvatar?: (DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Properties|null);
        memberNameTagPrimarySupport?: (DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport|null);
        aiThread?: (DeviceCapabilities.DeviceCapabilities.AiThread.$Properties|null);
        aiFbidMigration?: (DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Properties|null);
        bizAiSettingsSync?: (DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Properties|null);
        contactRefresh?: (DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Properties|null);
        static create(properties: DeviceCapabilities.DeviceCapabilities.$Shape): DeviceCapabilities.DeviceCapabilities & DeviceCapabilities.DeviceCapabilities.$Shape;
        static create(properties?: DeviceCapabilities.DeviceCapabilities.$Properties): DeviceCapabilities.DeviceCapabilities;
        static encode(m: DeviceCapabilities.DeviceCapabilities.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
        static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities & DeviceCapabilities.DeviceCapabilities.$Shape;
        static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities;
        static toObject(m: DeviceCapabilities.DeviceCapabilities, o?: $protobuf.IConversionOptions): { [k: string]: any };
        toJSON(): { [k: string]: any };
        static getTypeUrl(prefix?: string): string;
    }

    namespace DeviceCapabilities {
        interface $Properties {
            chatLockSupportLevel?: (DeviceCapabilities.DeviceCapabilities.ChatLockSupportLevel|null);
            lidMigration?: (DeviceCapabilities.DeviceCapabilities.LIDMigration.$Properties|null);
            businessBroadcast?: (DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Properties|null);
            userHasAvatar?: (DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Properties|null);
            memberNameTagPrimarySupport?: (DeviceCapabilities.DeviceCapabilities.MemberNameTagPrimarySupport|null);
            aiThread?: (DeviceCapabilities.DeviceCapabilities.AiThread.$Properties|null);
            aiFbidMigration?: (DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Properties|null);
            bizAiSettingsSync?: (DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Properties|null);
            contactRefresh?: (DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Properties|null);
            $unknowns?: Uint8Array[];
        }
        type $Shape = DeviceCapabilities.DeviceCapabilities.$Properties;

        interface IAiFbidMigration extends DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Properties {
        }

        class AiFbidMigration {
            constructor(p?: DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Properties);
            $unknowns?: Uint8Array[];
            chatDbMigrationTimestamp?: (number|Long|null);
            supportVersion?: (number|null);
            static create(properties: DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Shape): DeviceCapabilities.DeviceCapabilities.AiFbidMigration & DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Shape;
            static create(properties?: DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Properties): DeviceCapabilities.DeviceCapabilities.AiFbidMigration;
            static encode(m: DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities.AiFbidMigration & DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Shape;
            static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.AiFbidMigration;
            static toObject(m: DeviceCapabilities.DeviceCapabilities.AiFbidMigration, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AiFbidMigration {
            interface $Properties {
                chatDbMigrationTimestamp?: (number|Long|null);
                supportVersion?: (number|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = DeviceCapabilities.DeviceCapabilities.AiFbidMigration.$Properties;
        }

        interface IAiThread extends DeviceCapabilities.DeviceCapabilities.AiThread.$Properties {
        }

        class AiThread {
            constructor(p?: DeviceCapabilities.DeviceCapabilities.AiThread.$Properties);
            $unknowns?: Uint8Array[];
            supportLevel?: (DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel|null);
            static create(properties: DeviceCapabilities.DeviceCapabilities.AiThread.$Shape): DeviceCapabilities.DeviceCapabilities.AiThread & DeviceCapabilities.DeviceCapabilities.AiThread.$Shape;
            static create(properties?: DeviceCapabilities.DeviceCapabilities.AiThread.$Properties): DeviceCapabilities.DeviceCapabilities.AiThread;
            static encode(m: DeviceCapabilities.DeviceCapabilities.AiThread.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities.AiThread & DeviceCapabilities.DeviceCapabilities.AiThread.$Shape;
            static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.AiThread;
            static toObject(m: DeviceCapabilities.DeviceCapabilities.AiThread, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace AiThread {
            interface $Properties {
                supportLevel?: (DeviceCapabilities.DeviceCapabilities.AiThread.SupportLevel|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = DeviceCapabilities.DeviceCapabilities.AiThread.$Properties;

            enum SupportLevel {
                NONE = 0,
                INFRA = 1,
                FULL = 2
            }
        }

        interface IBizAiSettingsSync extends DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Properties {
        }

        class BizAiSettingsSync {
            constructor(p?: DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Properties);
            $unknowns?: Uint8Array[];
            handoffRemovalTimingEnabled?: (boolean|null);
            static create(properties: DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Shape): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync & DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Shape;
            static create(properties?: DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Properties): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync;
            static encode(m: DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync & DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Shape;
            static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync;
            static toObject(m: DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BizAiSettingsSync {
            interface $Properties {
                handoffRemovalTimingEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = DeviceCapabilities.DeviceCapabilities.BizAiSettingsSync.$Properties;
        }

        interface IBusinessBroadcast extends DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Properties {
        }

        class BusinessBroadcast {
            constructor(p?: DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Properties);
            $unknowns?: Uint8Array[];
            importListEnabled?: (boolean|null);
            companionSupportEnabled?: (boolean|null);
            campaignSyncEnabled?: (boolean|null);
            insightsSyncEnabled?: (boolean|null);
            recipientLimit?: (number|null);
            proCompanionSupportEnabled?: (boolean|null);
            static create(properties: DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Shape): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast & DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Shape;
            static create(properties?: DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Properties): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast;
            static encode(m: DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast & DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Shape;
            static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.BusinessBroadcast;
            static toObject(m: DeviceCapabilities.DeviceCapabilities.BusinessBroadcast, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace BusinessBroadcast {
            interface $Properties {
                importListEnabled?: (boolean|null);
                companionSupportEnabled?: (boolean|null);
                campaignSyncEnabled?: (boolean|null);
                insightsSyncEnabled?: (boolean|null);
                recipientLimit?: (number|null);
                proCompanionSupportEnabled?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = DeviceCapabilities.DeviceCapabilities.BusinessBroadcast.$Properties;
        }

        enum ChatLockSupportLevel {
            NONE = 0,
            MINIMAL = 1,
            FULL = 2
        }

        interface IContactRefresh extends DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Properties {
        }

        class ContactRefresh {
            constructor(p?: DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Properties);
            $unknowns?: Uint8Array[];
            refreshSupported?: (boolean|null);
            static create(properties: DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Shape): DeviceCapabilities.DeviceCapabilities.ContactRefresh & DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Shape;
            static create(properties?: DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Properties): DeviceCapabilities.DeviceCapabilities.ContactRefresh;
            static encode(m: DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities.ContactRefresh & DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Shape;
            static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.ContactRefresh;
            static toObject(m: DeviceCapabilities.DeviceCapabilities.ContactRefresh, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace ContactRefresh {
            interface $Properties {
                refreshSupported?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = DeviceCapabilities.DeviceCapabilities.ContactRefresh.$Properties;
        }

        interface ILIDMigration extends DeviceCapabilities.DeviceCapabilities.LIDMigration.$Properties {
        }

        class LIDMigration {
            constructor(p?: DeviceCapabilities.DeviceCapabilities.LIDMigration.$Properties);
            $unknowns?: Uint8Array[];
            chatDbMigrationTimestamp?: (number|Long|null);
            static create(properties: DeviceCapabilities.DeviceCapabilities.LIDMigration.$Shape): DeviceCapabilities.DeviceCapabilities.LIDMigration & DeviceCapabilities.DeviceCapabilities.LIDMigration.$Shape;
            static create(properties?: DeviceCapabilities.DeviceCapabilities.LIDMigration.$Properties): DeviceCapabilities.DeviceCapabilities.LIDMigration;
            static encode(m: DeviceCapabilities.DeviceCapabilities.LIDMigration.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities.LIDMigration & DeviceCapabilities.DeviceCapabilities.LIDMigration.$Shape;
            static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.LIDMigration;
            static toObject(m: DeviceCapabilities.DeviceCapabilities.LIDMigration, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace LIDMigration {
            interface $Properties {
                chatDbMigrationTimestamp?: (number|Long|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = DeviceCapabilities.DeviceCapabilities.LIDMigration.$Properties;
        }

        enum MemberNameTagPrimarySupport {
            DISABLED = 0,
            RECEIVER_ENABLED = 1,
            SENDER_ENABLED = 2
        }

        interface IUserHasAvatar extends DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Properties {
        }

        class UserHasAvatar {
            constructor(p?: DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Properties);
            $unknowns?: Uint8Array[];
            userHasAvatar?: (boolean|null);
            static create(properties: DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Shape): DeviceCapabilities.DeviceCapabilities.UserHasAvatar & DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Shape;
            static create(properties?: DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Properties): DeviceCapabilities.DeviceCapabilities.UserHasAvatar;
            static encode(m: DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Properties, w?: $protobuf.Writer): $protobuf.Writer;
            static decode(r: ($protobuf.Reader|Uint8Array), l?: number): DeviceCapabilities.DeviceCapabilities.UserHasAvatar & DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Shape;
            static fromObject(d: { [k: string]: any }): DeviceCapabilities.DeviceCapabilities.UserHasAvatar;
            static toObject(m: DeviceCapabilities.DeviceCapabilities.UserHasAvatar, o?: $protobuf.IConversionOptions): { [k: string]: any };
            toJSON(): { [k: string]: any };
            static getTypeUrl(prefix?: string): string;
        }

        namespace UserHasAvatar {
            interface $Properties {
                userHasAvatar?: (boolean|null);
                $unknowns?: Uint8Array[];
            }
            type $Shape = DeviceCapabilities.DeviceCapabilities.UserHasAvatar.$Properties;
        }
    }
}
