# Elaina-derived names and the `V2` aliases

This page explains how the names of the Elaina-derived API (`@rexxhayanasi/elaina-baileys`) map to this package.

## The rule

- Every Elaina-derived helper, builder, section maker and constant has an explicit **`V2` alias**: the original name with `V2` appended
  (`TaskStatus` -> `TaskStatusV2`, `dividerSection` -> `dividerSectionV2`, ...). The aliases are exported from `src/Extras/v2.ts` and re-exported by
  `src/Extras/index.ts`, so they are available from the package root. They point to the very same function / class / object as the original name
  - they are a naming layer, not a second implementation.
- The original names keep working too. Nothing was removed or renamed.

## Names that differ from Elaina

| Elaina name | Name in this package | Why |
| --- | --- | --- |
| `Carousel` (AIRich carousel builder) | **`CarouselV2`** (same class as `AIRichCarousel`; also `MB.Carousel` and `AIRichCarouselV2`) | `Carousel` is already a message type here, so the bare name is not exported |
| `Button` (general builder) | `Button`, or `ElainaButtonV2` / `NativeFlowButtonV2` | the V2 names make the origin explicit |
| `MB` / `MessageBuilder` | `MB` / `MessageBuilder`, or `MBV2` / `MessageBuilderV2` | same object |
| `VERSION` (MessageBuilder version) | `MESSAGE_BUILDER_VERSION_V2` | `VERSION` alone is too generic for a package root |
| `ActiveCall`, `VoipClient`, `AudioFeeder`, `VideoFeeder`, `VIDEO_FORMAT_I420` | **same names** | exported from the package root; see the VoIP notes below |

## VoIP names

VoIP is published through the unified API in `src/Voip` (`makeVoipClient(sock)` / `sock.makeVoipClient()` -> `MergedVoipClient`). The Elaina class names are
exported as well, with these meanings:

| Name | What it is |
| --- | --- |
| `ActiveCall` | the call object of the unified client (an `EventEmitter`), same role as Elaina's `ActiveCall` |
| `VoipClient` | the **separate-session** client (creates and owns its own connection from `authDir`); prefer `sock.makeVoipClient()` when you already have a socket |
| `AudioFeeder` / `VideoFeeder` | ffmpeg based PCM / I420 feeders used by the call engines |
| `VIDEO_FORMAT_I420` | numeric constant (`0`) for the I420 video frame format |

The older `createVoipClient({ authDir })` factory is still **not** exported. Both signaling engines own the WhatsApp call state, so do not run two clients on one socket.

## All V2 aliases

Generated from `src/Extras/v2.ts` (222 aliases). Format: original name -> `V2` alias.

### from ./native-flow

| Original | V2 alias |
| --- | --- |
| `NATIVE_FLOW_NAMES` | `NATIVE_FLOW_NAMESV2` |
| `WEB_SUPPORTED_INTERACTIVE_FLOWS` | `WEB_SUPPORTED_INTERACTIVE_FLOWSV2` |
| `NATIVE_FLOW_BUTTON_LIMIT` | `NATIVE_FLOW_BUTTON_LIMITV2` |
| `getNativeFlowNameByButtonName` | `getNativeFlowNameByButtonNameV2` |
| `isWebSupportedButtonName` | `isWebSupportedButtonNameV2` |
| `checkNativeFlowButtons` | `checkNativeFlowButtonsV2` |

### from ./MessageBuilder/extras

| Original | V2 alias |
| --- | --- |
| `AI_RICH_LAYOUTS` | `AI_RICH_LAYOUTSV2` |
| `AI_RICH_PRIMITIVES` | `AI_RICH_PRIMITIVESV2` |
| `AI_RICH_PRIMITIVE_INTERFACE` | `AI_RICH_PRIMITIVE_INTERFACEV2` |
| `AI_RICH_PRIMITIVES_WITHOUT_SCHEMA` | `AI_RICH_PRIMITIVES_WITHOUT_SCHEMAV2` |
| `AI_RICH_ITEMS` | `AI_RICH_ITEMSV2` |
| `AI_RICH_HTML_PRIMITIVE` | `AI_RICH_HTML_PRIMITIVEV2` |
| `AI_RICH_HTML_PRIMITIVE_CLASS` | `AI_RICH_HTML_PRIMITIVE_CLASSV2` |
| `AI_RICH_INLINE_ENTITIES` | `AI_RICH_INLINE_ENTITIESV2` |
| `AI_RICH_PRIMITIVES_WEB_RENDERED` | `AI_RICH_PRIMITIVES_WEB_RENDEREDV2` |
| `DividerType` | `DividerTypeV2` |
| `ImagineType` | `ImagineTypeV2` |
| `ImagineStatus` | `ImagineStatusV2` |
| `ThinkingIcon` | `ThinkingIconV2` |
| `TaskStatus` | `TaskStatusV2` |
| `FooterActionType` | `FooterActionTypeV2` |
| `AddonActionType` | `AddonActionTypeV2` |
| `dividerSection` | `dividerSectionV2` |
| `spacerSection` | `spacerSectionV2` |
| `imageSection` | `imageSectionV2` |
| `taskSection` | `taskSectionV2` |
| `latexSection` | `latexSectionV2` |
| `thinkingSection` | `thinkingSectionV2` |
| `progressSection` | `progressSectionV2` |
| `lockHeight` | `lockHeightV2` |
| `HTML_APP_BRIDGE` | `HTML_APP_BRIDGEV2` |
| `dataUri` | `dataUriV2` |
| `htmlMedia` | `htmlMediaV2` |
| `scrollControls` | `scrollControlsV2` |
| `autoHeight` | `autoHeightV2` |
| `htmlSection` | `htmlSectionV2` |
| `sendHtmlApp` | `sendHtmlAppV2` |
| `HTML_MIME_TYPE` | `HTML_MIME_TYPEV2` |
| `sendHtmlDocument` | `sendHtmlDocumentV2` |
| `fileSection` | `fileSectionV2` |
| `fileLinkSection` | `fileLinkSectionV2` |
| `botMediaMetadata` | `botMediaMetadataV2` |
| `prepareFileArtifact` | `prepareFileArtifactV2` |
| `sendHtmlArtifact` | `sendHtmlArtifactV2` |
| `SourceProvider` | `SourceProviderV2` |
| `botSourcesMetadata` | `botSourcesMetadataV2` |
| `EMBEDDED_SCREEN_PRESENTATION` | `EMBEDDED_SCREEN_PRESENTATIONV2` |
| `EMBEDDED_SCREEN_TYPENAME` | `EMBEDDED_SCREEN_TYPENAMEV2` |
| `EMBEDDED_SCREEN_TABBED_TYPENAME` | `EMBEDDED_SCREEN_TABBED_TYPENAMEV2` |
| `EMBEDDED_SCREEN_SINGLE_TYPENAME` | `EMBEDDED_SCREEN_SINGLE_TYPENAMEV2` |
| `EMBEDDED_SCREEN_CONTEXTUAL_TYPENAME` | `EMBEDDED_SCREEN_CONTEXTUAL_TYPENAMEV2` |
| `EMBEDDED_SCREEN_TAB_TYPENAME` | `EMBEDDED_SCREEN_TAB_TYPENAMEV2` |
| `AI_RICH_SECTION_TYPENAME` | `AI_RICH_SECTION_TYPENAMEV2` |
| `AI_RICH_UNIFIED_RESPONSE_TYPENAME` | `AI_RICH_UNIFIED_RESPONSE_TYPENAMEV2` |
| `AI_RICH_UNIFIED_RESPONSE_TYPENAME_APP` | `AI_RICH_UNIFIED_RESPONSE_TYPENAME_APPV2` |
| `AI_RICH_NESTED_UNIFIED_RESPONSE_TYPENAME` | `AI_RICH_NESTED_UNIFIED_RESPONSE_TYPENAMEV2` |
| `AI_RICH_NODES` | `AI_RICH_NODESV2` |
| `embeddedTab` | `embeddedTabV2` |
| `embeddedTabbedContent` | `embeddedTabbedContentV2` |
| `AI_RICH_RESPONSE_KEYS` | `AI_RICH_RESPONSE_KEYSV2` |
| `embeddedScreen` | `embeddedScreenV2` |
| `readEmbeddedTabs` | `readEmbeddedTabsV2` |
| `readEmbeddedSections` | `readEmbeddedSectionsV2` |
| `footerActionSection` | `footerActionSectionV2` |
| `BLOKS_A2UI_TYPE` | `BLOKS_A2UI_TYPEV2` |
| `BLOKS_A2UI_REPLY_ACTION` | `BLOKS_A2UI_REPLY_ACTIONV2` |
| `BLOKS_A2UI_SUPPORTED_ELEMENTS` | `BLOKS_A2UI_SUPPORTED_ELEMENTSV2` |
| `bloksSection` | `bloksSectionV2` |
| `bloksWidget` | `bloksWidgetV2` |
| `A2UI_VERSION` | `A2UI_VERSIONV2` |
| `A2UI_BASIC_CATALOG` | `A2UI_BASIC_CATALOGV2` |
| `A2UI_ROOT_ID` | `A2UI_ROOT_IDV2` |
| `a2uiText` | `a2uiTextV2` |
| `a2uiImage` | `a2uiImageV2` |
| `a2uiColumn` | `a2uiColumnV2` |
| `a2uiRow` | `a2uiRowV2` |
| `a2uiCard` | `a2uiCardV2` |
| `a2uiInfoCard` | `a2uiInfoCardV2` |
| `a2uiListCard` | `a2uiListCardV2` |
| `a2uiFallback` | `a2uiFallbackV2` |
| `a2uiSurface` | `a2uiSurfaceV2` |
| `a2uiWidget` | `a2uiWidgetV2` |
| `sendA2UI` | `sendA2UIV2` |
| `buildA2UISection` | `buildA2UISectionV2` |
| `sendA2UIBloks` | `sendA2UIBloksV2` |
| `AI_RICH_SUBMESSAGE_TEXT` | `AI_RICH_SUBMESSAGE_TEXTV2` |
| `AI_RICH_SUBMESSAGE_INLINE_IMAGE` | `AI_RICH_SUBMESSAGE_INLINE_IMAGEV2` |
| `AI_RICH_SUBMESSAGE_TABLE` | `AI_RICH_SUBMESSAGE_TABLEV2` |
| `AI_RICH_SUBMESSAGE_CONTENT_ITEMS` | `AI_RICH_SUBMESSAGE_CONTENT_ITEMSV2` |
| `AI_RICH_SUBMESSAGE_KINDS` | `AI_RICH_SUBMESSAGE_KINDSV2` |
| `aiRichSubmessage` | `aiRichSubmessageV2` |
| `aiRichText` | `aiRichTextV2` |
| `aiRichInlineImage` | `aiRichInlineImageV2` |
| `aiRichTable` | `aiRichTableV2` |
| `aiRichContentItems` | `aiRichContentItemsV2` |
| `AIRichMessage` | `AIRichMessageV2` |
| `sendAIRichMessage` | `sendAIRichMessageV2` |
| `sendBloksWidget` | `sendBloksWidgetV2` |
| `decodeBloksWidget` | `decodeBloksWidgetV2` |
| `collectTypenames` | `collectTypenamesV2` |
| `decodeAIRich` | `decodeAIRichV2` |
| `readRichMessage` | `readRichMessageV2` |

### from ./MessageBuilder/metaai

| Original | V2 alias |
| --- | --- |
| `MapQueryStatus` | `MapQueryStatusV2` |
| `MapItemMarkerType` | `MapItemMarkerTypeV2` |
| `PlaceDetailsItemType` | `PlaceDetailsItemTypeV2` |
| `PlaceOpeningStatus` | `PlaceOpeningStatusV2` |
| `PlacePriceLevel` | `PlacePriceLevelV2` |
| `ClippyArtifactType` | `ClippyArtifactTypeV2` |
| `SportsLeague` | `SportsLeagueV2` |
| `SportsGameStatus` | `SportsGameStatusV2` |
| `SportsSeasonType` | `SportsSeasonTypeV2` |
| `CompactEntityType` | `CompactEntityTypeV2` |
| `CompactEntityActionType` | `CompactEntityActionTypeV2` |
| `ActionListRowType` | `ActionListRowTypeV2` |
| `SocialEntityItemType` | `SocialEntityItemTypeV2` |
| `SourceApp` | `SourceAppV2` |
| `PostType` | `PostTypeV2` |
| `PostOrientation` | `PostOrientationV2` |
| `ProductSourceType` | `ProductSourceTypeV2` |
| `SearchPlannerStepStatus` | `SearchPlannerStepStatusV2` |
| `OrchestratorSearchEngine` | `OrchestratorSearchEngineV2` |
| `ProfessionalConsentStatus` | `ProfessionalConsentStatusV2` |
| `AccountLinkingIntegration` | `AccountLinkingIntegrationV2` |
| `AccountLinkingStatus` | `AccountLinkingStatusV2` |
| `CalendarEventOperation` | `CalendarEventOperationV2` |
| `CalendarEventState` | `CalendarEventStateV2` |
| `WidgetCtaKind` | `WidgetCtaKindV2` |
| `WidgetCtaState` | `WidgetCtaStateV2` |
| `MultipleResponseLayoutType` | `MultipleResponseLayoutTypeV2` |
| `ThreadSurfingEntityType` | `ThreadSurfingEntityTypeV2` |
| `ThreadSurfingActionType` | `ThreadSurfingActionTypeV2` |
| `MediaShape` | `MediaShapeV2` |
| `MediaHorizontalAlignment` | `MediaHorizontalAlignmentV2` |
| `MediaVerticalAlignment` | `MediaVerticalAlignmentV2` |
| `AddonActionAlignment` | `AddonActionAlignmentV2` |
| `ImageAssetQueryStatus` | `ImageAssetQueryStatusV2` |
| `CodeBlockType` | `CodeBlockTypeV2` |
| `FollowUpSuggestionCategory` | `FollowUpSuggestionCategoryV2` |
| `InformTreatmentRenderingType` | `InformTreatmentRenderingTypeV2` |
| `UnifiedResponseSectionType` | `UnifiedResponseSectionTypeV2` |
| `UnifiedResponseMessageGroupKind` | `UnifiedResponseMessageGroupKindV2` |
| `customSection` | `customSectionV2` |
| `placeItem` | `placeItemV2` |
| `mapSection` | `mapSectionV2` |
| `locationPermissionSection` | `locationPermissionSectionV2` |
| `timestampPlaceholderSection` | `timestampPlaceholderSectionV2` |
| `sportsSection` | `sportsSectionV2` |
| `videoSection` | `videoSectionV2` |
| `reminderSection` | `reminderSectionV2` |
| `commentSection` | `commentSectionV2` |
| `compactEntitySection` | `compactEntitySectionV2` |
| `actionListRow` | `actionListRowV2` |
| `actionListSection` | `actionListSectionV2` |
| `plannerStep` | `plannerStepV2` |
| `searchPlannerSection` | `searchPlannerSectionV2` |
| `searchResultV2Section` | `searchResultV2SectionV2` |
| `plannerSnippetSection` | `plannerSnippetSectionV2` |
| `chainOfThoughtSection` | `chainOfThoughtSectionV2` |
| `searchAdSection` | `searchAdSectionV2` |
| `transparencySignal` | `transparencySignalV2` |
| `transparencySection` | `transparencySectionV2` |
| `professionalConsentSection` | `professionalConsentSectionV2` |
| `accountLinkingApp` | `accountLinkingAppV2` |
| `accountLinkingSection` | `accountLinkingSectionV2` |
| `calendarEvent` | `calendarEventV2` |
| `calendarWidgetSection` | `calendarWidgetSectionV2` |
| `chainingSuggestionSection` | `chainingSuggestionSectionV2` |
| `mediaItem` | `mediaItemV2` |
| `mediaGridSection` | `mediaGridSectionV2` |
| `contextualSourcesSection` | `contextualSourcesSectionV2` |
| `threadSurfingItem` | `threadSurfingItemV2` |
| `socialEntityItem` | `socialEntityItemV2` |
| `placeEntityItem` | `placeEntityItemV2` |
| `productEntityItem` | `productEntityItemV2` |
| `sideBySideSurveyItem` | `sideBySideSurveyItemV2` |
| `multipleResponseSection` | `multipleResponseSectionV2` |
| `bloomCardSection` | `bloomCardSectionV2` |
| `addonActionSection` | `addonActionSectionV2` |
| `QuotaUpsellMeterUsageType` | `QuotaUpsellMeterUsageTypeV2` |
| `quotaUpsellButton` | `quotaUpsellButtonV2` |
| `quotaUpsellSection` | `quotaUpsellSectionV2` |
| `quizQuestion` | `quizQuestionV2` |
| `quizSection` | `quizSectionV2` |
| `actionGroupButton` | `actionGroupButtonV2` |
| `actionGroupSection` | `actionGroupSectionV2` |
| `fusedComparisonCta` | `fusedComparisonCtaV2` |
| `fusedComparisonColumn` | `fusedComparisonColumnV2` |
| `fusedComparisonRow` | `fusedComparisonRowV2` |
| `fusedComparisonSection` | `fusedComparisonSectionV2` |
| `readSignedRichResponse` | `readSignedRichResponseV2` |
| `verifyRichResponseSignature` | `verifyRichResponseSignatureV2` |
| `forwardRichResponse` | `forwardRichResponseV2` |

### from ./MessageBuilder/bot-signature

| Original | V2 alias |
| --- | --- |
| `BOT_SIGNATURE_VERSION` | `BOT_SIGNATURE_VERSIONV2` |
| `BOT_SIGNATURE_USE_CASE_WA_BOT_MSG` | `BOT_SIGNATURE_USE_CASE_WA_BOT_MSGV2` |
| `BOT_SIGNATURE_ROOT_VERSION` | `BOT_SIGNATURE_ROOT_VERSIONV2` |
| `BOT_SIGNATURE_ROOT_CERTIFICATE` | `BOT_SIGNATURE_ROOT_CERTIFICATEV2` |
| `loadBotSignatureRoot` | `loadBotSignatureRootV2` |
| `constructSignaturePayload` | `constructSignaturePayloadV2` |
| `isParsableCertificateChain` | `isParsableCertificateChainV2` |
| `verifyBotSignature` | `verifyBotSignatureV2` |

### from ./messages-helpers

| Original | V2 alias |
| --- | --- |
| `trimEmptyValues` | `trimEmptyValuesV2` |
| `songThumbnail` | `songThumbnailV2` |
| `prepareLinkThumbnail` | `prepareLinkThumbnailV2` |
| `prepareProductMessage` | `prepareProductMessageV2` |
| `buttonLimitFor` | `buttonLimitForV2` |
| `nativeFlowButtonsViolateConstraints` | `nativeFlowButtonsViolateConstraintsV2` |
| `warnOnNativeFlowConstraints` | `warnOnNativeFlowConstraintsV2` |
| `FUTURE_PROOF_MESSAGE_KEYS` | `FUTURE_PROOF_MESSAGE_KEYSV2` |
| `Button` | `NativeFlowButtonV2` |
| `Button` | `ElainaButtonV2` |
| `AIRichCarousel` | `CarouselV2` |
| `AIRichCarousel` | `AIRichCarouselV2` |
| `AIRich` | `AIRichV2` |
| `Toolkit` | `ToolkitV2` |
| `AIRichError` | `AIRichErrorV2` |
| `ItemNotFoundError` | `ItemNotFoundErrorV2` |
| `DuplicateIdError` | `DuplicateIdErrorV2` |
| `InvalidTargetError` | `InvalidTargetErrorV2` |
| `ContentValidationError` | `ContentValidationErrorV2` |
| `VERSION` | `MESSAGE_BUILDER_VERSION_V2` |
| `MessageBuilder` | `MessageBuilderV2` |
| `MB` | `MBV2` |
