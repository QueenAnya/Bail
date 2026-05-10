Interactive / button messages  
Template messages  
List messages
Cards / Carousel messages
Album messages  
AI icon on messages  
Share / Request phone number  
Sticker pack messages  
Full MEX notification dispatcher | Partial  
Outgoing call API  
Rich response / Meta AI messages  
Username in contacts / groups  
Pairing race-condition fix  
iOS / Android / KaiOS browser support
chunkOrder`in history sync 
| tctoken prune on reconnect
| App state sync resilience             | Partial          | ✅`forceSnapshot`+`blockedCollections`|
| Message ID prefix                     |`3EB0`          |`4NY4W3B` |
| Addons layer | ❌ | ✅ 18 addon files

- [Buttons](#button-message)
  - [Template](#template-message)
  - [Interactive / List](#interactive--list-message)
  - [Album](#album-message)
  - [Sticker Pack](#sticker-pack-message)
  - [Share Phone Number](#share-phone-number-message)
  - [Request Phone Number](#request-phone-number-message)
  - [AI Icon Feature](#ai-icon-feature)
  - [Rich Response / Meta AI Messages](#rich-response-message)
    - [sendTable](#sendtable)
    - [sendList](#sendlist)
    - [sendCodeBlock](#sendcodeblock)
    - [sendLatex](#sendlatex)
    - [sendLatexImage](#sendlateximage)
    - [sendLatexInlineImage](#sendlatexinlineimage)
    - [sendRichMessage](#sendrichmessage)
    - [captureUnifiedResponse / sendUnifiedResponse](#captureunifiedresponse--sendunifiedresponse)
- [Calls](#calls)
- [Auth State](#auth-state)
- [MEX Notifications](#mex-notifications)
- [Addons](#addons)
- [Changelog](#changelog)
- [Album Message](#album-message)
  - [Sticker Pack Message](#sticker-pack-message)
  - [Event Message](#event-message)
  - [Call Message](#call-message)
  - [Payment Message](#payment-message)
  - [Payment Invite Message](#payment-invite-message)
  - [Admin Invite Message](#admin-invite-message)
  - [Group Invite Message](#group-invite-message)
  - [vCard / Contact Cards](#vcard--contact-cards)
  - [Share / Request Phone Number](#share--request-phone-number)
  - [Disappearing Messages](#disappearing-messages)
  - [Clear Messages](#clear-messages)
- [Button Messages](#button-messages)
  - [Classic Buttons (iOS + Android)](#classic-buttons-ios--android)
  - [Interactive Buttons (native flow)](#interactive-buttons-native-flow)
  - [Template Buttons](#template-buttons)
  - [List / Sections Message](#list--sections-message)
  - [Cards / Carousel Message](#cards--carousel-message)
  - [Shop Message](#shop-message)
  - [Collection Message](#collection-message)
  - [Buttons Interactive Message PAY](#buttons-interactive-message-pay)
  - [Buttons Interactive Message PIX](#buttons-interactive-message-pix)
  - [Buttons Reply Message](#buttons-reply-message)
- [Interactive Helpers](#interactive-helpers)
- [Media Status](#media-status)
  - [Status Mentions](#status-mentions)
  - [Initiate Voice Call](#initiate-voice-call)
  - [Reject Call](#reject-call)
- [AI Icon Feature](#ai-icon-feature)
- [addons Utils](#addons-utils)
  - [Anti-Delete System](#anti-delete-system)
  - [Message Scheduler](#message-scheduler)
  - [Auto-Reply System](#auto-reply-system)
  - [Message Templates](#message-templates)
  - [Message Search](#message-search)
  - [vCard Helpers](#vcard-helpers)
  - [Status Helpers](#status-helpers)
  - [JID Plotting & LID Support](#jid-plotting--lid-support)
- [Data Store (Implementing)](#data-store-implementing)
  [Auto-Reply System](#auto-reply-system) - [Example to Start](#example-to-start)
  - [Call Message](#call-message) - [Event Message](#event-message) - [Order Message](#order-message) - [Product Message](#product-message) - [Payment Message](#payment-message) - [Decrypt Event Response](#decrypt-event-response) - [Payment Invite Message](#payment-invite-message) - [Admin Invite Message](#invite-admin-message) - [Group Invite Message](#group-invite-message) - [Sticker Pack Message](#sticker-pack-message) - [Share Phone Number Message](#share-phone-number-message) - [Request Phone Number Message](#request-phone-number-message) - [Buttons Reply Message](#buttons-reply-message) - [Buttons Message](#buttons-message) - [Interactive Messages](#interactive-messages) - [Buttons List Message](#buttons-list-message) - [Buttons Product List Message](#buttons-product-list-message) - [Buttons Cards Message](#buttons-cards-message) - [Buttons Template Message](#buttons-template-message) - [Buttons Interactive Message](#buttons-interactive-message) - [Buttons Interactive Message PIX](#buttons-interactive-message-pix) - [Buttons Interactive Message PAY](#buttons-interactive-message-PAY) - [Status Mentions Message](#status-mentions-message) - [Shop Message](#shop-message) - [Collection Message](#collection-message) - [AI Icon Feature](#ai-icon-feature) - [Sending with Link Preview](#sending-messages-with-link-previews) - [Media Messages](#media-messages)
- [HD Image Message](#hd-image-message) - [HD Video Message](#hd-video-message) - [Album Message](#album-message) - [Ptv Video Message](#ptv-video-message) - [ViewOnce Message](#view-once-message)
- [Modify Messages](#modify-messages)
  group status v2
  Fixed an issue where media could not be sent to newsletters due to an upstream issue.
  📁 Reintroduced makeInMemoryStore with a minimal ESM adaptation and small adjustments for Baileys v7.
  📦 Switched FFmpeg execution from exec to spawn for safer process handling.
  🗃️ Added @napi-rs/image as a supported image processing backend in getImageProcessingLibrary(), offering a balance between performance and compatibility.
  📨 Messages Handling & Compatibility
  📩 Expanded messages support for:
  🖼️ Album Message
  👤 Group Status Message
  👉🏻 Interactive Message (buttons, lists, native flows, templates, carousels).
  🎞️ Status Mention Message
  📦 Sticker Pack Message
  ✨ Rich Response Message [NEW]
  🧾 Message with Code Blocks [NEW]
  🌏 Message with Inline Entities [NEW]
  📋 Message with Table [NEW]
  💳 Payment-related Message (payment requests, invites, orders, invoices).
  📰 Simplified sending messages with ad thumbnail using externalAdReply, without requiring manual contextInfo.
  💭 Added support for quoting messages inside channel (newsletter). [NEW]
  🎀 Added support for custom button icon. [NEW]
  🧩 Additional Message Options
  👁️ Added optional boolean flags for message handling:
  🤖 ai - AI icon on message
  📣 mentionAll - Mention all group participants without requiring their JIDs in mentions or mentionedJid [NEW]
  🔧 ephemeral, groupStatus, spoiler, viewOnce, viewOnceV2, viewOnceV2Extension, interactiveAsTemplate - Message wrappers
  🔒 secureMetaServiceLabel - Secure meta service label on message [NEW]
  📄 raw - Build your message manually (DO NOT USE FOR EXPLOITATION)
  🔔 Mention
  😁 Reaction
  📌 Pin Message
  ➡️ Forward Message
  👤 Contact
  📍 Location
  🗓️ Event
  👥 Group Invite
  🛍️ Product
  📊 Poll
  💭 Button Response
  ✨ Rich Response
  🧾 Message with Code Block
  🌏 Message with Inline Entities
  📋 Message with Table
  🎞️ Status Mention
  🖼️ Album (Image & Video)
  📦 Sticker Pack
  👉🏻 Sending Interactive Messages
  1️⃣ Buttons
  2️⃣ List
  3️⃣ Interactive
  4️⃣ Hydrated Template
  💳 Sending Payment Messages
  1️⃣ Invite Payment
  2️⃣ Invoice
  3️⃣ Order
  4️⃣ Request Payment
  👁️ Other Message Options
  1️⃣ AI Icon
  2️⃣ Ephemeral
  3️⃣ External Ad Reply
  4️⃣ Group Status
  5️⃣ Raw
  6️⃣ Secure Meta Service Label
  7️⃣ View Once
  8️⃣ View Once V2
  9️⃣ View Once V2 Extension
  🔟 Spoiler
  ♻️ Modify Messages
  🗑️ Delete Messages
  ✏️ Edit Messages
  🧰 Additional Contents
  🏷️ Find User ID (JID|PN/LID)
  🔑 Request Custom Pairing Code
  🖼️ Image Processing
  📣 Newsletter Management
  👥 Group Management
  👥 Community Management
  👤 Profile Management
  🛒 Business Management
  🔐 Privacy Management
  📡 Events
  useSingleFileAuthState
  📣 Credits
  - [Buttons](#button-message)
  - [Template](#template-message)
  - [Interactive / List](#interactive--list-message)
  - [Album](#album-message)
  - [Sticker Pack](#sticker-pack-message)
  - [Share Phone Number](#share-phone-number-message)
  - [Request Phone Number](#request-phone-number-message)
  - [AI Icon Feature](#ai-icon-feature)
  - [Rich Response / Meta AI Messages](#rich-response-message)
    - [sendTable](#sendtable)
    - [sendList](#sendlist)
    - [sendCodeBlock](#sendcodeblock)
    - [sendLatex](#sendlatex)
    - [sendLatexImage](#sendlateximage)
    - [sendLatexInlineImage](#sendlatexinlineimage)
    - [sendRichMessage](#sendrichmessage)
    - [captureUnifiedResponse / sendUnifiedResponse](#captureunifiedresponse--sendunifiedresponse)

- [Calls](#calls)
- [Auth State](#auth-state)
- [MEX Notifications](#mex-notifications)
- [Addons](#addons)
- [Changelog](#changelog)
- [HD Image / HD Video](#hd-image--hd-video)
  - [Album Message](#album-message)
  - [Sticker Pack Message](#sticker-pack-message)
  - [Event Message](#event-message)
  - [Call Message](#call-message)
  - [Payment Message](#payment-message)
  - [Payment Invite Message](#payment-invite-message)
  - [Admin Invite Message](#admin-invite-message)
  - [Group Invite Message](#group-invite-message)
  - [vCard / Contact Cards](#vcard--contact-cards)
  - [Share / Request Phone Number](#share--request-phone-number)
  - [Disappearing Messages](#disappearing-messages)
  - [Clear Messages](#clear-messages)
- [Button Messages](#button-messages)
  - [Classic Buttons (iOS + Android)](#classic-buttons-ios--android)
  - [Interactive Buttons (native flow)](#interactive-buttons-native-flow)
  - [Template Buttons](#template-buttons)
  - [List / Sections Message](#list--sections-message)
  - [Cards / Carousel Message](#cards--carousel-message)
  - [Shop Message](#shop-message)
  - [Collection Message](#collection-message)
  - [Buttons Interactive Message PAY](#buttons-interactive-message-pay)
  - [Buttons Interactive Message PIX](#buttons-interactive-message-pix)
  - [Buttons Reply Message](#buttons-reply-message)
- [Interactive Helpers](#interactive-helpers)
- [Media Status](#media-status)
  - [Status Mentions](#status-mentions)
  - [Initiate Voice Call](#initiate-voice-call)
  - [Reject Call](#reject-call)
- [AI Icon Feature](#ai-icon-feature)
- [addons Utils](#addons-utils)
  - [Anti-Delete System](#anti-delete-system)
  - [Message Scheduler](#message-scheduler)
  - [Auto-Reply System](#auto-reply-system)
  - [Message Templates](#message-templates)
  - [Message Search](#message-search)
  - [vCard Helpers](#vcard-helpers)
  - [Status Helpers](#status-helpers)
  - [JID Plotting & LID Support](#jid-plotting--lid-support)
- [Data Store (Implementing)](#data-store-implementing)
  [Auto-Reply System](#auto-reply-system) - [Example to Start](#example-to-start)
  - [Call Message](#call-message) - [Event Message](#event-message) - [Order Message](#order-message) - [Product Message](#product-message) - [Payment Message](#payment-message) - [Decrypt Event Response](#decrypt-event-response) - [Payment Invite Message](#payment-invite-message) - [Admin Invite Message](#invite-admin-message) - [Group Invite Message](#group-invite-message) - [Sticker Pack Message](#sticker-pack-message) - [Share Phone Number Message](#share-phone-number-message) - [Request Phone Number Message](#request-phone-number-message) - [Buttons Reply Message](#buttons-reply-message) - [Buttons Message](#buttons-message) - [Interactive Messages](#interactive-messages) - [Buttons List Message](#buttons-list-message) - [Buttons Product List Message](#buttons-product-list-message) - [Buttons Cards Message](#buttons-cards-message) - [Buttons Template Message](#buttons-template-message) - [Buttons Interactive Message](#buttons-interactive-message) - [Buttons Interactive Message PIX](#buttons-interactive-message-pix) - [Buttons Interactive Message PAY](#buttons-interactive-message-PAY) - [Status Mentions Message](#status-mentions-message) - [Shop Message](#shop-message) - [Collection Message](#collection-message) - [AI Icon Feature](#ai-icon-feature) - [Sending with Link Preview](#sending-messages-with-link-previews) - [Media Messages](#media-messages)
- [HD Image Message](#hd-image-message) - [HD Video Message](#hd-video-message) - [Album Message](#album-message) - [Ptv Video Message](#ptv-video-message) - [ViewOnce Message](#view-once-message)
- [Modify Messages](#modify-messages)
  group status v2
  Fixed an issue where media could not be sent to newsletters due to an upstream issue.
  📁 Reintroduced makeInMemoryStore with a minimal ESM adaptation and small adjustments for Baileys v7.
  📦 Switched FFmpeg execution from exec to spawn for safer process handling.
  🗃️ Added @napi-rs/image as a supported image processing backend in getImageProcessingLibrary(), offering a balance between performance and compatibility.
  📨 Messages Handling & Compatibility
  📩 Expanded messages support for:
  🖼️ Album Message
  👤 Group Status Message
  👉🏻 Interactive Message (buttons, lists, native flows, templates, carousels).
  🎞️ Status Mention Message
  📦 Sticker Pack Message
  ✨ Rich Response Message [NEW]
  🧾 Message with Code Blocks [NEW]
  🌏 Message with Inline Entities [NEW]
  📋 Message with Table [NEW]
  💳 Payment-related Message (payment requests, invites, orders, invoices).
  📰 Simplified sending messages with ad thumbnail using externalAdReply, without requiring manual contextInfo.
  💭 Added support for quoting messages inside channel (newsletter). [NEW]
  🎀 Added support for custom button icon. [NEW]
  🧩 Additional Message Options
  👁️ Added optional boolean flags for message handling:
  🤖 ai - AI icon on message
  📣 mentionAll - Mention all group participants without requiring their JIDs in mentions or mentionedJid [NEW]
  🔧 ephemeral, groupStatus, spoiler, viewOnce, viewOnceV2, viewOnceV2Extension, interactiveAsTemplate - Message wrappers
  🔒 secureMetaServiceLabel - Secure meta service label on message [NEW]
  📄 raw - Build your message manually (DO NOT USE FOR EXPLOITATION)
  🔔 Mention
  😁 Reaction
  📌 Pin Message
  ➡️ Forward Message
  👤 Contact
  📍 Location
  🗓️ Event
  👥 Group Invite
  🛍️ Product
  📊 Poll
  💭 Button Response
  ✨ Rich Response
  🧾 Message with Code Block
  🌏 Message with Inline Entities
  📋 Message with Table
  🎞️ Status Mention
  🖼️ Album (Image & Video)
  📦 Sticker Pack
  👉🏻 Sending Interactive Messages
  1️⃣ Buttons
  2️⃣ List
  3️⃣ Interactive
  4️⃣ Hydrated Template
  💳 Sending Payment Messages
  1️⃣ Invite Payment
  2️⃣ Invoice
  3️⃣ Order
  4️⃣ Request Payment
  👁️ Other Message Options
  1️⃣ AI Icon
  2️⃣ Ephemeral
  3️⃣ External Ad Reply
  4️⃣ Group Status
  5️⃣ Raw
  6️⃣ Secure Meta Service Label
  7️⃣ View Once
  8️⃣ View Once V2
  9️⃣ View Once V2 Extension
  🔟 Spoiler
  ♻️ Modify Messages
  🗑️ Delete Messages
  ✏️ Edit Messages
  🧰 Additional Contents
  🏷️ Find User ID (JID|PN/LID)
  🔑 Request Custom Pairing Code
  🖼️ Image Processing
  📣 Newsletter Management
  👥 Group Management
  👥 Community Management
  👤 Profile Management
  🛒 Business Management
  🔐 Privacy Management
  📡 Events
  useSingleFileAuthState
  📣 Credits
