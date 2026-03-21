<h1 align='center'><img alt="Baileys logo" src="https://raw.githubusercontent.com/WhiskeySockets/Baileys/refs/heads/master/Media/logo.png" height="75"/></h1>

<div align='center'>Baileys is a WebSockets-based TypeScript library for interacting with the WhatsApp Web API.</div>


> [!CAUTION]
> NOTICE OF BREAKING CHANGE.
>
> As of 7.0.0, multiple breaking changes were introduced into the library.
>
> Please check out https://whiskey.so/migrate-latest for more information.

# Important Note
This is a temporary README.md, the new guide is in development and will this file will be replaced with .github/README.md (already a default on GitHub).

New guide link: https://baileys.wiki

# Get Support

If you'd like business to enterprise-level support from Rajeh, the current maintainer of Baileys, you can book a video chat. Book a 1 hour time slot by contacting him on Discord or pre-ordering [here](https://purpshell.dev/book). The earlier you pre-order the better, as his time slots usually fill up very quickly. He offers immense value per hour and will answer all your questions before the time runs out.

If you are a business, we encourage you to contribute back to the high development costs of the project and to feed the maintainers who dump tens of hours a week on this. You can do so by booking meetings or sponsoring below. All support, even in bona fide / contribution hours, is welcome by businesses of all sizes. This is not condoning or endorsing businesses to use the library. See the Disclaimer below.

# Sponsor
If you'd like to financially support this project, you can do so by supporting the current maintainer [here](https://purpshell.dev/sponsor).

# Disclaimer
This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates.
The official WhatsApp website can be found at whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.

The maintainers of Baileys do not in any way condone the use of this application in practices that violate the Terms of Service of WhatsApp. The maintainers of this application call upon the personal responsibility of its users to use this application in a fair way, as it is intended to be used.
Use at your own discretion. Do not spam people with this. We discourage any stalkerware, bulk or automated messaging usage.

##

- Baileys does not require Selenium or any other browser to be interface with WhatsApp Web, it does so directly using a **WebSocket**.
- Not running Selenium or Chromium saves you like **half a gig** of ram :/
- Baileys supports interacting with the multi-device & web versions of WhatsApp.
- Thank you to [@pokearaujo](https://github.com/pokearaujo/multidevice) for writing his observations on the workings of WhatsApp Multi-Device. Also, thank you to [@Sigalor](https://github.com/sigalor/whatsapp-web-reveng) for writing his observations on the workings of WhatsApp Web and thanks to [@Rhymen](https://github.com/Rhymen/go-whatsapp/) for the __go__ implementation.

> [!IMPORTANT]
> The original repository had to be removed by the original author - we now continue development in this repository here.
This is the only official repository and is maintained by the community.
> **Join the Discord [here](https://discord.gg/WeJM5FP9GG)**

## Example

Do check out & run [example.ts](Example/example.ts) to see an example usage of the library.
The script covers most common use cases.
To run the example script, download or clone the repo and then type the following in a terminal:
1. ``` cd path/to/Baileys ```
2. ``` yarn ```
3. ``` yarn example ```

## Install

Use the stable version:
```
yarn add @whiskeysockets/baileys
```

Use the edge version (no guarantee of stability, but latest fixes + features)
```
yarn add github:WhiskeySockets/Baileys
```

Then import your code using:
```ts
import makeWASocket from '@whiskeysockets/baileys'
```

# Links

- [Discord](https://discord.gg/WeJM5FP9GG)
- [Docs](https://guide.whiskeysockets.io/)

# Index

- [Connecting Account](#connecting-account)
    - [Connect with QR-CODE](#starting-socket-with-qr-code)
    - [Connect with Pairing Code](#starting-socket-with-pairing-code)
    - [Receive Full History](#receive-full-history)
- [Important Notes About Socket Config](#important-notes-about-socket-config)
    - [Caching Group Metadata (Recommended)](#caching-group-metadata-recommended)
    - [Improve Retry System & Decrypt Poll Votes](#improve-retry-system--decrypt-poll-votes)
    - [Receive Notifications in Whatsapp App](#receive-notifications-in-whatsapp-app)

- [Save Auth Info](#saving--restoring-sessions)
- [Handling Events](#handling-events)
    - [Example to Start](#example-to-start)
    - [Decrypt Poll Votes](#decrypt-poll-votes)
    - [Summary of Events on First Connection](#summary-of-events-on-first-connection)
- [Implementing a Data Store](#implementing-a-data-store)
- [Whatsapp IDs Explain](#whatsapp-ids-explain)
- [Utility Functions](#utility-functions)
- [Sending Messages](#sending-messages)
    - [Non-Media Messages](#non-media-messages)
        - [Text Message](#text-message)
        - [Quote Message](#quote-message-works-with-all-types)
        - [Mention User](#mention-user-works-with-most-types)
        - [Forward Messages](#forward-messages)
        - [Location Message](#location-message)
        - [Contact Message](#contact-message)
        - [Reaction Message](#reaction-message)
        - [Pin Message](#pin-message)
        - [Poll Message](#poll-message)
    - [Sending with Link Preview](#sending-messages-with-link-previews)
    - [Media Messages](#media-messages)
        - [Gif Message](#gif-message)
        - [Video Message](#video-message)
        - [Audio Message](#audio-message)
        - [Image Message](#image-message)
        - [ViewOnce Message](#view-once-message)
- [Modify Messages](#modify-messages)
    - [Delete Messages (for everyone)](#deleting-messages-for-everyone)
    - [Edit Messages](#editing-messages)
- [Manipulating Media Messages](#manipulating-media-messages)
    - [Thumbnail in Media Messages](#thumbnail-in-media-messages)
    - [Downloading Media Messages](#downloading-media-messages)
    - [Re-upload Media Message to Whatsapp](#re-upload-media-message-to-whatsapp)
- [Reject Call](#reject-call)
- [Send States in Chat](#send-states-in-chat)
    - [Reading Messages](#reading-messages)
    - [Update Presence](#update-presence)
- [Modifying Chats](#modifying-chats)
    - [Archive a Chat](#archive-a-chat)
    - [Mute/Unmute a Chat](#muteunmute-a-chat)
    - [Mark a Chat Read/Unread](#mark-a-chat-readunread)
    - [Delete a Message for Me](#delete-a-message-for-me)
    - [Delete a Chat](#delete-a-chat)
    - [Star/Unstar a Message](#starunstar-a-message)
    - [Disappearing Messages](#disappearing-messages)
- [User Querys](#user-querys)
    - [Check If ID Exists in Whatsapp](#check-if-id-exists-in-whatsapp)
    - [Query Chat History (groups too)](#query-chat-history-groups-too)
    - [Fetch Status](#fetch-status)
    - [Fetch Profile Picture (groups too)](#fetch-profile-picture-groups-too)
    - [Fetch Bussines Profile (such as description or category)](#fetch-bussines-profile-such-as-description-or-category)
    - [Fetch Someone's Presence (if they're typing or online)](#fetch-someones-presence-if-theyre-typing-or-online)
- [Change Profile](#change-profile)
    - [Change Profile Status](#change-profile-status)
    - [Change Profile Name](#change-profile-name)
    - [Change Display Picture (groups too)](#change-display-picture-groups-too)
    - [Remove display picture (groups too)](#remove-display-picture-groups-too)
- [Groups](#groups)
    - [Create a Group](#create-a-group)
    - [Add/Remove or Demote/Promote](#addremove-or-demotepromote)
    - [Change Subject (name)](#change-subject-name)
    - [Change Description](#change-description)
    - [Change Settings](#change-settings)
    - [Leave a Group](#leave-a-group)
    - [Get Invite Code](#get-invite-code)
    - [Revoke Invite Code](#revoke-invite-code)
    - [Join Using Invitation Code](#join-using-invitation-code)
    - [Get Group Info by Invite Code](#get-group-info-by-invite-code)
    - [Query Metadata (participants, name, description...)](#query-metadata-participants-name-description)
    - [Join using groupInviteMessage](#join-using-groupinvitemessage)
    - [Get Request Join List](#get-request-join-list)
    - [Approve/Reject Request Join](#approvereject-request-join)
    - [Get All Participating Groups Metadata](#get-all-participating-groups-metadata)
    - [Toggle Ephemeral](#toggle-ephemeral)
    - [Change Add Mode](#change-add-mode)
- [Privacy](#privacy)
    - [Block/Unblock User](#blockunblock-user)
    - [Get Privacy Settings](#get-privacy-settings)
    - [Get BlockList](#get-blocklist)
    - [Update LastSeen Privacy](#update-lastseen-privacy)
    - [Update Online Privacy](#update-online-privacy)
    - [Update Profile Picture Privacy](#update-profile-picture-privacy)
    - [Update Status Privacy](#update-status-privacy)
    - [Update Read Receipts Privacy](#update-read-receipts-privacy)
    - [Update Groups Add Privacy](#update-groups-add-privacy)
    - [Update Default Disappearing Mode](#update-default-disappearing-mode)
- [Broadcast Lists & Stories](#broadcast-lists--stories)
    - [Send Broadcast & Stories](#send-broadcast--stories)
    - [Query a Broadcast List's Recipients & Name](#query-a-broadcast-lists-recipients--name)
- [Writing Custom Functionality](#writing-custom-functionality)
    - [Enabling Debug Level in Baileys Logs](#enabling-debug-level-in-baileys-logs)
    - [How Whatsapp Communicate With Us](#how-whatsapp-communicate-with-us)
    - [Register a Callback for Websocket Events](#register-a-callback-for-websocket-events)

## Connecting Account

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code** with WhatsApp on your phone.

> [!NOTE]
> **[Here](#example-to-start) is a simple example of event handling**

> [!TIP]
> **You can see all supported socket configs [here](https://baileys.whiskeysockets.io/types/SocketConfig.html) (Recommended)**

### Starting socket with **QR-CODE**

> [!TIP]
> You can customize browser name if you connect with **QR-CODE**, with `Browser` constant, we have some browsers config, **see [here](https://baileys.whiskeysockets.io/types/BrowsersMap.html)**

```ts
import makeWASocket from '@whiskeysockets/baileys'

const sock = makeWASocket({
    // can provide additional config here
    browser: Browsers.ubuntu('My App'),
    printQRInTerminal: true
})
```

If the connection is successful, you will see a QR code printed on your terminal screen, scan it with WhatsApp on your phone and you'll be logged in!

### Starting socket with **Pairing Code**


> [!IMPORTANT]
> Pairing Code isn't Mobile API, it's a method to connect Whatsapp Web without QR-CODE, you can connect only with one device, see [here](https://faq.whatsapp.com/1324084875126592/?cms_platform=web)

The phone number can't have `+` or `()` or `-`, only numbers, you must provide country code

```ts
import makeWASocket from '@whiskeysockets/baileys'

const sock = makeWASocket({
    // can provide additional config here
    printQRInTerminal: false //need to be false
})

if (!sock.authState.creds.registered) {
    const number = 'XXXXXXXXXXX'
    const code = await sock.requestPairingCode(number)
    console.log(code)
}
```

### Receive Full History

1. Set `syncFullHistory` as `true`
2. Baileys, by default, use chrome browser config
    - If you'd like to emulate a desktop connection (and receive more message history), this browser setting to your Socket config:

```ts
const sock = makeWASocket({
    ...otherOpts,
    // can use Windows, Ubuntu here too
    browser: Browsers.macOS('Desktop'),
    syncFullHistory: true
})
```

## Important Notes About Socket Config

### Caching Group Metadata (Recommended)
- If you use baileys for groups, we recommend you to set `cachedGroupMetadata` in socket config, you need to implement a cache like this:

    ```ts
    const groupCache = new NodeCache({stdTTL: 5 * 60, useClones: false})

    const sock = makeWASocket({
        cachedGroupMetadata: async (jid) => groupCache.get(jid)
    })

    sock.ev.on('groups.update', async ([event]) => {
        const metadata = await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })

    sock.ev.on('group-participants.update', async (event) => {
        const metadata = await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })
    ```

### Improve Retry System & Decrypt Poll Votes
- If you want to improve sending message, retrying when error occurs and decrypt poll votes, you need to have a store and set `getMessage` config in socket like this:
    ```ts
    const sock = makeWASocket({
        getMessage: async (key) => await getMessageFromStore(key)
    })
    ```

### Receive Notifications in Whatsapp App
- If you want to receive notifications in whatsapp app, set `markOnlineOnConnect` to `false`
    ```ts
    const sock = makeWASocket({
        markOnlineOnConnect: false
    })
    ```
## Saving & Restoring Sessions

You obviously don't want to keep scanning the QR code every time you want to connect.

So, you can load the credentials to log back in:
```ts
import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

// will use the given state to connect
// so if valid credentials are available -- it'll connect without QR
const sock = makeWASocket({ auth: state })

// this will be called as soon as the credentials are updated
sock.ev.on('creds.update', saveCreds)
```

> [!IMPORTANT]
> `useMultiFileAuthState` is a utility function to help save the auth state in a single folder, this function serves as a good guide to help write auth & key states for SQL/no-SQL databases, which I would recommend in any production grade system.

> [!NOTE]
> When a message is received/sent, due to signal sessions needing updating, the auth keys (`authState.keys`) will update. Whenever that happens, you must save the updated keys (`authState.keys.set()` is called). Not doing so will prevent your messages from reaching the recipient & cause other unexpected consequences. The `useMultiFileAuthState` function automatically takes care of that, but for any other serious implementation -- you will need to be very careful with the key state management.

## Handling Events

- Baileys uses the EventEmitter syntax for events.
They're all nicely typed up, so you shouldn't have any issues with an Intellisense editor like VS Code.

> [!IMPORTANT]
> **The events are [these](https://baileys.whiskeysockets.io/types/BaileysEventMap.html)**, it's important you see all events

You can listen to these events like this:
```ts
const sock = makeWASocket()
sock.ev.on('messages.upsert', ({ messages }) => {
    console.log('got messages', messages)
})
```

### Example to Start

> [!NOTE]
> This example includes basic auth storage too

> [!NOTE]
> For reliable serialization of the authentication state, especially when storing as JSON, always use the BufferJSON utility.

```ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp () {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({
        // can provide additional config here
        auth: state,
        printQRInTerminal: true
    })
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    sock.ev.on('messages.upsert', event => {
        for (const m of event.messages) {
            console.log(JSON.stringify(m, undefined, 2))

            console.log('replying to', m.key.remoteJid)
            await sock.sendMessage(m.key.remoteJid!, { text: 'Hello Word' })
        }
    })

    // to storage creds (session info) when it updates
    sock.ev.on('creds.update', saveCreds)
}
// run in main file
connectToWhatsApp()
```

> [!IMPORTANT]
> In `messages.upsert` it's recommended to use a loop like `for (const message of event.messages)` to handle all messages in array

### Decrypt Poll Votes

- By default poll votes are encrypted and handled in `messages.update`
- That's a simple example
```ts
sock.ev.on('messages.update', event => {
    for(const { key, update } of event) {
        if(update.pollUpdates) {
            const pollCreation = await getMessage(key)
            if(pollCreation) {
                console.log(
                    'got poll update, aggregation: ',
                    getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                )
            }
        }
    }
})
```

- `getMessage` is a [store](#implementing-a-data-store) implementation (in your end)

### Summary of Events on First Connection

1. When you connect first time, `connection.update` will be fired requesting you to restart sock
2. Then, history messages will be received in `messaging.history-set`

## Implementing a Data Store

- Baileys does not come with a defacto storage for chats, contacts, or messages. However, a simple in-memory implementation has been provided. The store listens for chat updates, new messages, message updates, etc., to always have an up-to-date version of the data.

> [!IMPORTANT]
> I highly recommend building your own data store, as storing someone's entire chat history in memory is a terrible waste of RAM.

It can be used as follows:

```ts
import makeWASocket, { makeInMemoryStore } from '@whiskeysockets/baileys'
// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = makeInMemoryStore({ })
// can be read from a file
store.readFromFile('./baileys_store.json')
// saves the state to a file every 10s
setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10_000)

const sock = makeWASocket({ })
// will listen from this socket
// the store can listen from a new socket once the current socket outlives its lifetime
store.bind(sock.ev)

sock.ev.on('chats.upsert', () => {
    // can use 'store.chats' however you want, even after the socket dies out
    // 'chats' => a KeyedDB instance
    console.log('got chats', store.chats.all())
})

sock.ev.on('contacts.upsert', () => {
    console.log('got contacts', Object.values(store.contacts))
})

```

The store also provides some simple functions such as `loadMessages` that utilize the store to speed up data retrieval.

## Whatsapp IDs Explain

- `id` is the WhatsApp ID, called `jid` too, of the person or group you're sending the message to.
    - It must be in the format ```[country code][phone number]@s.whatsapp.net```
	    - Example for people: ```+19999999999@s.whatsapp.net```.
	    - For groups, it must be in the format ``` 123456789-123345@g.us ```.
    - For broadcast lists, it's `[timestamp of creation]@broadcast`.
    - For stories, the ID is `status@broadcast`.

## Utility Functions

- `getContentType`, returns the content type for any message
- `getDevice`, returns the device from message
- `makeCacheableSignalKeyStore`, make auth store more fast
- `downloadContentFromMessage`, download content from any message

## Sending Messages

- Send all types of messages with a single function
    - **[Here](https://baileys.whiskeysockets.io/types/AnyMessageContent.html) you can see all message contents supported, like text message**
    - **[Here](https://baileys.whiskeysockets.io/types/MiscMessageGenerationOptions.html) you can see all options supported, like quote message**

    ```ts
    const jid: string
    const content: AnyMessageContent
    const options: MiscMessageGenerationOptions

    sock.sendMessage(jid, content, options)
    ```

### Non-Media Messages

#### Text Message
```ts
await sock.sendMessage(jid, { text: 'hello word' })
```

#### Quote Message (works with all types)
```ts
await sock.sendMessage(jid, { text: 'hello word' }, { quoted: message })
```

#### Mention User (works with most types)
- @number is to mention in text, it's optional
```ts
await sock.sendMessage(
    jid,
    {
        text: '@12345678901',
        mentions: ['12345678901@s.whatsapp.net']
    }
)
```

#### Forward Messages
- You need to have message object, can be retrieved from [store](#implementing-a-data-store) or use a [message](https://baileys.whiskeysockets.io/types/WAMessage.html) object
```ts
const msg = getMessageFromStore() // implement this on your end
await sock.sendMessage(jid, { forward: msg }) // WA forward the message!
```

#### Location Message
```ts
await sock.sendMessage(
    jid,
    {
        location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221
        }
    }
)
```
#### Contact Message
```ts
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n'
            + 'FN:Jeff Singh\n' // full name
            + 'ORG:Ashoka Uni;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\n' // WhatsApp ID + phone number
            + 'END:VCARD'

await sock.sendMessage(
    id,
    {
        contacts: {
            displayName: 'Jeff',
            contacts: [{ vcard }]
        }
    }
)
```

#### Reaction Message
- You need to pass the key of message, you can retrieve from [store](#implementing-a-data-store) or use a [key](https://baileys.whiskeysockets.io/types/WAMessageKey.html) object
```ts
await sock.sendMessage(
    jid,
    {
        react: {
            text: '💖', // use an empty string to remove the reaction
            key: message.key
        }
    }
)
```

#### Pin Message
- You need to pass the key of message, you can retrieve from [store](#implementing-a-data-store) or use a [key](https://baileys.whiskeysockets.io/types/WAMessageKey.html) object

- Time can be:

| Time  | Seconds        |
|-------|----------------|
| 24h    | 86.400        |
| 7d     | 604.800       |
| 30d    | 2.592.000     |

```ts
await sock.sendMessage(
    jid,
    {
        pin: {
            type: 1, // 0 to remove
            time: 86400
            key: message.key
        }
    }
)
```

#### Poll Message
```ts
await sock.sendMessage(
    jid,
    {
        poll: {
            name: 'My Poll',
            values: ['Option 1', 'Option 2', ...],
            selectableCount: 1,
            toAnnouncementGroup: false // or true
        }
    }
)
```

### Sending Messages with Link Previews

1. By default, wa does not have link generation when sent from the web
2. Baileys has a function to generate the content for these link previews
3. To enable this function's usage, add `link-preview-js` as a dependency to your project with `yarn add link-preview-js`
4. Send a link:
```ts
await sock.sendMessage(
    jid,
    {
        text: 'Hi, this was sent using https://github.com/whiskeysockets/baileys'
    }
)
```

### Media Messages

Sending media (video, stickers, images) is easier & more efficient than ever.

> [!NOTE]
> In media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly, you can see more [here](https://baileys.whiskeysockets.io/types/WAMediaUpload.html)

- When specifying a media url, Baileys never loads the entire buffer into memory; it even encrypts the media as a readable stream.

> [!TIP]
> It's recommended to use Stream or Url to save memory

#### Gif Message
- Whatsapp doesn't support `.gif` files, that's why we send gifs as common `.mp4` video with `gifPlayback` flag
```ts
await sock.sendMessage(
    jid,
    {
        video: fs.readFileSync('Media/ma_gif.mp4'),
        caption: 'hello word',
        gifPlayback: true
    }
)
```

#### Video Message
```ts
await sock.sendMessage(
    id,
    {
        video: {
            url: './Media/ma_gif.mp4'
        },
        caption: 'hello word',
	    ptv: false // if set to true, will send as a `video note`
    }
)
```

#### Audio Message
- To audio message work in all devices you need to convert with some tool like `ffmpeg` with this flags:
    ```bash
        codec: libopus //ogg file
        ac: 1 //one channel
        avoid_negative_ts
        make_zero
    ```
    - Example:
    ```bash
    ffmpeg -i input.mp4 -avoid_negative_ts make_zero -ac 1 output.ogg
    ```
```ts
await sock.sendMessage(
    jid,
    {
        audio: {
            url: './Media/audio.mp3'
        },
        mimetype: 'audio/mp4'
    }
)
```

#### Image Message
```ts
await sock.sendMessage(
    id,
    {
        image: {
            url: './Media/ma_img.png'
        },
        caption: 'hello word'
    }
)
```

#### View Once Message

- You can send all messages above as `viewOnce`, you only need to pass `viewOnce: true` in content object

```ts
await sock.sendMessage(
    id,
    {
        image: {
            url: './Media/ma_img.png'
        },
        viewOnce: true, //works with video, audio too
        caption: 'hello word'
    }
)
```


### HD Image / HD Video

Send images or videos at full quality without WhatsApp compression.

```ts
// HD Image
await sock.sendMessage(jid, {
    image: { url: './photo.jpg' },
    caption: 'High quality photo',
    hd: true
})

// HD Video
await sock.sendMessage(jid, {
    video: { url: './video.mp4' },
    caption: 'HD video',
    hd: true
})
```

### Album Message

Send multiple images/videos as a grouped album.

```ts
await sock.sendMessage(jid, {
    album: [
        { image: { url: 'https://example.com/img1.jpg' }, caption: 'Photo 1' },
        { image: fs.readFileSync('./img2.jpg'), caption: 'Photo 2' },
        { video: { url: 'https://example.com/video.mp4' } }
    ]
})
```

### Buttons Message (iOS + Android)

```ts
// Text + buttons
await sock.sendMessage(jid, {
    text: 'Choose an option:',
    footer: 'Bot Footer',
    buttons: [
        { buttonId: 'btn1', buttonText: { displayText: '✅ Yes' } },
        { buttonId: 'btn2', buttonText: { displayText: '❌ No' } }
    ]
})

// Image + buttons
await sock.sendMessage(jid, {
    image: { url: 'https://example.com/img.jpg' },
    caption: 'What do you think?',
    footer: 'Select below',
    buttons: [
        { buttonId: 'like', buttonText: { displayText: '👍 Like' } },
        { buttonId: 'dislike', buttonText: { displayText: '👎 Dislike' } }
    ]
})
```

### Interactive Buttons (Native Flow)

```ts
await sock.sendMessage(jid, {
    text: 'Choose:',
    footer: 'Bot',
    interactiveButtons: [
        {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: '✅ Accept', id: 'accept' })
        },
        {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({ display_text: '🌐 Visit', url: 'https://example.com' })
        },
        {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({ display_text: '📋 Copy Code', copy_code: 'ABC123' })
        }
    ]
})

// With image
await sock.sendMessage(jid, {
    image: { url: 'https://example.com/img.jpg' },
    caption: 'Check this out',
    interactiveButtons: [
        {
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({ display_text: '❤️ Like', id: 'like' })
        }
    ],
    hasMediaAttachment: true
})
```

### List / Sections Message

```ts
await sock.sendMessage(jid, {
    text: 'Select from menu',
    footer: 'Bot Menu',
    title: 'Main Menu',
    buttonText: 'Open Menu',
    sections: [
        {
            title: '🎮 Entertainment',
            rows: [
                { rowId: 'games', title: 'Games', description: 'Play mini games' },
                { rowId: 'music', title: 'Music', description: 'Listen to music' }
            ]
        },
        {
            title: '🛠️ Tools',
            rows: [
                { rowId: 'translate', title: 'Translate', description: 'Language translate' }
            ]
        }
    ]
})

// List with image (via interactiveButtons)
await sock.sendMessage(jid, {
    image: { url: 'https://example.com/menu.jpg' },
    caption: 'Browse our menu',
    interactiveButtons: [
        {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
                title: 'View Menu',
                sections: [
                    {
                        title: 'Food',
                        rows: [
                            { title: 'Fried Rice', description: '$2.50', id: 'rice' },
                            { title: 'Noodles', description: '$2.00', id: 'noodles' }
                        ]
                    }
                ]
            })
        }
    ]
})
```

### Cards / Carousel Message

```ts
await sock.sendMessage(jid, {
    text: 'Check these out!',
    footer: 'Swipe right →',
    cards: [
        {
            image: { url: 'https://example.com/card1.jpg' },
            title: 'Card 1',
            body: 'Description for card 1',
            footer: 'Card Footer',
            buttons: [
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Select', id: 'card1' }) },
                { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Learn More', url: 'https://example.com' }) }
            ]
        },
        {
            video: { url: 'https://example.com/card2.mp4' },
            title: 'Card 2',
            body: 'Video card',
            buttons: [
                { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Watch', id: 'card2' }) }
            ]
        }
    ]
})
```

### Interactive Button Helpers

```ts
import {
    generateInteractiveButtonMessage,
    generateInteractiveListMessage,
    generateCombinedButtons,
    generateCopyCodeButton,
    generateUrlButtonMessage,
    generateQuickReplyButtons
} from '@whiskeysockets/baileys'

// Quick reply buttons
const qr = generateQuickReplyButtons('Choose:', [
    { id: 'btn1', displayText: '✅ Accept' },
    { id: 'btn2', displayText: '❌ Reject' }
], { footer: 'Bot' })
await sock.sendMessage(jid, qr.interactiveMessage)

// URL button
const url = generateUrlButtonMessage('Visit us', [
    { displayText: '🌐 Open', url: 'https://example.com' }
])
await sock.sendMessage(jid, url.interactiveMessage)

// Copy code button
const copy = generateCopyCodeButton('Your OTP:', '483920', '📋 Copy OTP')
await sock.sendMessage(jid, copy.interactiveMessage)

// Combined buttons
const combined = generateCombinedButtons('What would you like?', [
    { type: 'url', displayText: '🌐 Website', url: 'https://example.com' },
    { type: 'reply', displayText: '💬 Chat', id: 'start_chat' },
    { type: 'copy', displayText: '📋 Promo', copyCode: 'PROMO2025' }
], { footer: 'Choose any option' })
await sock.sendMessage(jid, combined.interactiveMessage)
```

### Buttons Interactive Message PAY / PIX

```ts
// PAY
await sock.sendMessage(jid, {
    text: 'Complete your payment',
    interactiveButtons: [
        {
            name: 'review_and_pay',
            buttonParamsJson: JSON.stringify({
                currency: 'IDR',
                total_amount: { value: '100000', offset: '100' },
                reference_id: 'REF123',
                type: 'physical-goods',
                order: {
                    status: 'completed',
                    order_type: 'PAYMENT_REQUEST',
                    items: [{ retailer_id: 'item_001', name: 'Product', amount: { value: '100000', offset: '100' }, quantity: '1' }]
                }
            })
        }
    ]
})

// PIX
await sock.sendMessage(jid, {
    text: '',
    interactiveButtons: [
        {
            name: 'payment_info',
            buttonParamsJson: JSON.stringify({
                payment_settings: [{ type: 'pix_static_code', pix_static_code: { merchant_name: 'Store', key: 'example@email.com', key_type: 'EMAIL' } }]
            })
        }
    ]
})
```

### Sticker Pack Message

```ts
await sock.sendMessage(jid, {
    stickerPack: {
        name: 'My Pack',
        publisher: 'Author Name',
        cover: fs.readFileSync('./cover.webp'),
        stickers: [
            { sticker: fs.readFileSync('./sticker1.webp'), emojis: ['😀'] },
            { sticker: fs.readFileSync('./sticker2.webp'), emojis: ['😂'], isAnimated: true }
        ]
    }
})
```

### Event Message

```ts
await sock.sendMessage(jid, {
    event: {
        name: 'Team Meeting',
        description: 'Weekly sync',
        startDate: new Date('2025-12-25T10:00:00'),
        endDate: new Date('2025-12-25T11:00:00'),
        location: { degreesLatitude: 0, degreesLongitude: 0, name: 'Office' }
    }
})
```

### Call Message (Scheduled)

```ts
await sock.sendMessage(jid, {
    call: {
        name: 'Team Call',
        time: Date.now() + 3600000,
        type: 1  // 1=audio, 2=video
    }
})
```

### vCard / Contact Cards

```ts
import { generateVCard, createContactCard, createContactCards, quickContact } from '@whiskeysockets/baileys'

// Single contact
await sock.sendMessage(jid, createContactCard({
    fullName: 'John Doe',
    phones: [{ number: '+1234567890', type: 'CELL' }],
    emails: [{ email: 'john@example.com', type: 'WORK' }]
}))

// Multiple contacts
await sock.sendMessage(jid, createContactCards([
    { fullName: 'Alice', phones: [{ number: '+111' }] },
    { fullName: 'Bob', phones: [{ number: '+222' }] }
]))

// Quick helper
const contact = quickContact('John Doe', '+1234567890')
await sock.sendMessage(jid, createContactCard(contact))
```

### Admin Invite Message

```ts
await sock.sendMessage(jid, {
    adminInvite: {
        jid: '120363xxxxxx@newsletter',
        name: 'My Channel',
        caption: 'Join my channel!',
        expiration: Date.now() + 604800000
    }
})
```

### Payment Invite Message

```ts
await sock.sendMessage(jid, {
    paymentInvite: {
        type: 2,
        expiry: Date.now() + 86400000
    }
})
```

### AI Icon Feature

```ts
// Add AI icon to message
await sock.sendMessage(jid, { text: 'AI powered response!' }, { ai: true })
```


## Modify Messages

### Deleting Messages (for everyone)

```ts
const msg = await sock.sendMessage(jid, { text: 'hello word' })
await sock.sendMessage(jid, { delete: msg.key })
```

**Note:** deleting for oneself is supported via `chatModify`, see in [this section](#modifying-chats)

### Editing Messages

- You can pass all editable contents here
```ts
await sock.sendMessage(jid, {
      text: 'updated text goes here',
      edit: response.key,
    });
```

## Manipulating Media Messages

### Thumbnail in Media Messages
- For media messages, the thumbnail can be generated automatically for images & stickers provided you add `jimp` or `sharp` as a dependency in your project using `yarn add jimp` or `yarn add sharp`.
- Thumbnails for videos can also be generated automatically, though, you need to have `ffmpeg` installed on your system.

### Downloading Media Messages

If you want to save the media you received
```ts
import { createWriteStream } from 'fs'
import { downloadMediaMessage, getContentType } from '@whiskeysockets/baileys'

sock.ev.on('messages.upsert', async ({ [m] }) => {
    if (!m.message) return // if there is no text or media message
    const messageType = getContentType(m) // get what type of message it is (text, image, video...)

    // if the message is an image
    if (messageType === 'imageMessage') {
        // download the message
        const stream = await downloadMediaMessage(
            m,
            'stream', // can be 'buffer' too
            { },
            {
                logger,
                // pass this so that baileys can request a reupload of media
                // that has been deleted
                reuploadRequest: sock.updateMediaMessage
            }
        )
        // save to file
        const writeStream = createWriteStream('./my-download.jpeg')
        stream.pipe(writeStream)
    }
}
```

### Re-upload Media Message to Whatsapp

- WhatsApp automatically removes old media from their servers. For the device to access said media -- a re-upload is required by another device that has it. This can be accomplished using:
```ts
await sock.updateMediaMessage(msg)
```


## Initiate Voice Call

```ts
// Voice call
const { callId } = await sock.initiateCall(jid)

// Video call  
const { callId } = await sock.initiateCall(jid, { isVideo: true })

// Cancel outgoing call
await sock.cancelCall(callId, jid)

// Accept incoming call
await sock.acceptCall(callId, callFrom, false) // false=audio, true=video
```

## Reject Call

- You can obtain `callId` and `callFrom` from `call` event

```ts
await sock.rejectCall(callId, callFrom)
```

## Send States in Chat

### Reading Messages
- A set of message [keys](https://baileys.whiskeysockets.io/types/WAMessageKey.html) must be explicitly marked read now.
- You cannot mark an entire 'chat' read as it were with Baileys Web.
This means you have to keep track of unread messages.

```ts
const key: WAMessageKey
// can pass multiple keys to read multiple messages as well
await sock.readMessages([key])
```

The message ID is the unique identifier of the message that you are marking as read.
On a `WAMessage`, the `messageID` can be accessed using ```messageID = message.key.id```.

### Update Presence

- ``` presence ``` can be one of [these](https://baileys.whiskeysockets.io/types/WAPresence.html)
- The presence expires after about 10 seconds.
- This lets the person/group with `jid` know whether you're online, offline, typing etc.

```ts
await sock.sendPresenceUpdate('available', jid)
```

> [!NOTE]
> If a desktop client is active, WA doesn't send push notifications to the device. If you would like to receive said notifications -- mark your Baileys client offline using `sock.sendPresenceUpdate('unavailable')`


### Status Mentions Message

```ts
// Mention specific users in status
await sock.sendStatusMentions(
    { text: 'Hello everyone! 👋', backgroundColor: '#25D366' },
    ['628xxx@s.whatsapp.net', '629yyy@s.whatsapp.net']
)

// With image
await sock.sendStatusMentions(
    { image: { url: 'https://example.com/img.jpg' }, caption: 'Tag friends!' },
    ['628xxx@s.whatsapp.net']
)
```

### Text Status

```ts
await sock.sendMessage('status@broadcast', {
    text: 'Hello Everyone! 👋',
    backgroundColor: '#25D366',
    font: 2
}, {
    statusJidList: ['628xxx@s.whatsapp.net']
})
```

### Media Status

```ts
// Image status
await sock.sendMessage('status@broadcast', {
    image: { url: 'https://example.com/img.jpg' },
    caption: 'Good morning! ☀️'
}, { statusJidList: ['628xxx@s.whatsapp.net'] })

// Video status
await sock.sendMessage('status@broadcast', {
    video: { url: 'https://example.com/video.mp4' }
}, { statusJidList: ['628xxx@s.whatsapp.net'] })
```

## Modifying Chats

WA uses an encrypted form of communication to send chat/app updates. This has been implemented mostly and you can send the following updates:

> [!IMPORTANT]
> If you mess up one of your updates, WA can log you out of all your devices and you'll have to log in again.

### Archive a Chat
```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify({ archive: true, lastMessages: [lastMsgInChat] }, jid)
```
### Mute/Unmute a Chat

- Supported times:

| Time  | Miliseconds     |
|-------|-----------------|
| Remove | null           |
| 8h     | 86.400.000     |
| 7d     | 604.800.000    |

```ts
// mute for 8 hours
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)
// unmute
await sock.chatModify({ mute: null }, jid)
```
### Mark a Chat Read/Unread
```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
// mark it unread
await sock.chatModify({ markRead: false, lastMessages: [lastMsgInChat] }, jid)
```

### Delete a Message for Me
```ts
await sock.chatModify(
    {
        clear: {
            messages: [
                {
                    id: 'ATWYHDNNWU81732J',
                    fromMe: true,
                    timestamp: '1654823909'
                }
            ]
        }
    },
    jid
)

```

### Clear Messages

```ts
// Clear/delete message for me
await sock.clearMessage(jid, messageKey, messageTimestamp)
```

### Delete a Chat
```ts
const lastMsgInChat = await getLastMessageInChat(jid) // implement this on your end
await sock.chatModify({
        delete: true,
        lastMessages: [
            {
                key: lastMsgInChat.key,
                messageTimestamp: lastMsgInChat.messageTimestamp
            }
        ]
    },
    jid
)
```
### Pin/Unpin a Chat
```ts
await sock.chatModify({
        pin: true // or `false` to unpin
    },
    jid
)
```
### Star/Unstar a Message
```ts
await sock.chatModify({
        star: {
            messages: [
                {
                    id: 'messageID',
                    fromMe: true // or `false`
                }
            ],
            star: true // - true: Star Message; false: Unstar Message
        }
    },
    jid
)
```

### Disappearing Messages

- Ephemeral can be:

| Time  | Seconds        |
|-------|----------------|
| Remove | 0          |
| 24h    | 86.400     |
| 7d     | 604.800    |
| 90d    | 7.776.000  |

- You need to pass in **Seconds**, default is 7 days

```ts
// turn on disappearing messages
await sock.sendMessage(
    jid,
    // this is 1 week in seconds -- how long you want messages to appear for
    { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }
)

// will send as a disappearing message
await sock.sendMessage(jid, { text: 'hello' }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })

// turn off disappearing messages
await sock.sendMessage(
    jid,
    { disappearingMessagesInChat: false }
)
```

## User Querys

### Check If ID Exists in Whatsapp
```ts
const [result] = await sock.onWhatsApp(jid)
if (result.exists) console.log (`${jid} exists on WhatsApp, as jid: ${result.jid}`)
```

### Query Chat History (groups too)

- You need to have oldest message in chat
```ts
const msg = await getOldestMessageInChat(jid) // implement this on your end
await sock.fetchMessageHistory(
    50, //quantity (max: 50 per query)
    msg.key,
    msg.messageTimestamp
)
```
- Messages will be received in `messaging.history-set` event

### Fetch Status
```ts
const status = await sock.fetchStatus(jid)
console.log('status: ' + status)
```

### Fetch Profile Picture (groups too)
- To get the display picture of some person/group
```ts
// for low res picture
const ppUrl = await sock.profilePictureUrl(jid)
console.log(ppUrl)

// for high res picture
const ppUrl = await sock.profilePictureUrl(jid, 'image')
```

### Fetch Bussines Profile (such as description or category)
```ts
const profile = await sock.getBusinessProfile(jid)
console.log('business description: ' + profile.description + ', category: ' + profile.category)
```

### Fetch Someone's Presence (if they're typing or online)
```ts
// the presence update is fetched and called here
sock.ev.on('presence.update', console.log)

// request updates for a chat
await sock.presenceSubscribe(jid)
```

## Change Profile

### Change Profile Status
```ts
await sock.updateProfileStatus('Hello World!')
```
### Change Profile Name
```ts
await sock.updateProfileName('My name')
```
### Change Display Picture (groups too)
- To change your display picture or a group's

> [!NOTE]
> Like media messages, you can pass `{ stream: Stream }` or `{ url: Url }` or `Buffer` directly, you can see more [here](https://baileys.whiskeysockets.io/types/WAMediaUpload.html)

```ts
await sock.updateProfilePicture(jid, { url: './new-profile-picture.jpeg' })
```
### Remove display picture (groups too)
```ts
await sock.removeProfilePicture(jid)
```

## Groups

- To change group properties you need to be admin

### Create a Group
```ts
// title & participants
const group = await sock.groupCreate('My Fab Group', ['1234@s.whatsapp.net', '4564@s.whatsapp.net'])
console.log('created group with id: ' + group.gid)
await sock.sendMessage(group.id, { text: 'hello there' }) // say hello to everyone on the group
```
### Add/Remove or Demote/Promote
```ts
// id & people to add to the group (will throw error if it fails)
await sock.groupParticipantsUpdate(
    jid,
    ['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'],
    'add' // replace this parameter with 'remove' or 'demote' or 'promote'
)
```
### Change Subject (name)
```ts
await sock.groupUpdateSubject(jid, 'New Subject!')
```
### Change Description
```ts
await sock.groupUpdateDescription(jid, 'New Description!')
```
### Change Settings
```ts
// only allow admins to send messages
await sock.groupSettingUpdate(jid, 'announcement')
// allow everyone to send messages
await sock.groupSettingUpdate(jid, 'not_announcement')
// allow everyone to modify the group's settings -- like display picture etc.
await sock.groupSettingUpdate(jid, 'unlocked')
// only allow admins to modify the group's settings
await sock.groupSettingUpdate(jid, 'locked')
```
### Leave a Group
```ts
// will throw error if it fails
await sock.groupLeave(jid)
```
### Get Invite Code
- To create link with code use `'https://chat.whatsapp.com/' + code`
```ts
const code = await sock.groupInviteCode(jid)
console.log('group code: ' + code)
```
### Revoke Invite Code
```ts
const code = await sock.groupRevokeInvite(jid)
console.log('New group code: ' + code)
```
### Join Using Invitation Code
- Code can't have `https://chat.whatsapp.com/`, only code
```ts
const response = await sock.groupAcceptInvite(code)
console.log('joined to: ' + response)
```
### Get Group Info by Invite Code
```ts
const response = await sock.groupGetInviteInfo(code)
console.log('group information: ' + response)
```
### Query Metadata (participants, name, description...)
```ts
const metadata = await sock.groupMetadata(jid)
console.log(metadata.id + ', title: ' + metadata.subject + ', description: ' + metadata.desc)
```
### Join using `groupInviteMessage`
```ts
const response = await sock.groupAcceptInviteV4(jid, groupInviteMessage)
console.log('joined to: ' + response)
```
### Get Request Join List
```ts
const response = await sock.groupRequestParticipantsList(jid)
console.log(response)
```
### Approve/Reject Request Join
```ts
const response = await sock.groupRequestParticipantsUpdate(
    jid, // group id
    ['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'],
    'approve' // or 'reject'
)
console.log(response)
```
### Get All Participating Groups Metadata
```ts
const response = await sock.groupFetchAllParticipating()
console.log(response)
```
### Toggle Ephemeral

- Ephemeral can be:

| Time  | Seconds        |
|-------|----------------|
| Remove | 0          |
| 24h    | 86.400     |
| 7d     | 604.800    |
| 90d    | 7.776.000  |

```ts
await sock.groupToggleEphemeral(jid, 86400)
```

### Change Add Mode
```ts
await sock.groupMemberAddMode(
    jid,
    'all_member_add' // or 'admin_add'
)
```

## Privacy

### Block/Unblock User
```ts
await sock.updateBlockStatus(jid, 'block') // Block user
await sock.updateBlockStatus(jid, 'unblock') // Unblock user
```
### Get Privacy Settings
```ts
const privacySettings = await sock.fetchPrivacySettings(true)
console.log('privacy settings: ' + privacySettings)
```
### Get BlockList
```ts
const response = await sock.fetchBlocklist()
console.log(response)
```
### Update LastSeen Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateLastSeenPrivacy(value)
```
### Update Online Privacy
```ts
const value = 'all' // 'match_last_seen'
await sock.updateOnlinePrivacy(value)
```
### Update Profile Picture Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateProfilePicturePrivacy(value)
```
### Update Status Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist' | 'none'
await sock.updateStatusPrivacy(value)
```
### Update Read Receipts Privacy
```ts
const value = 'all' // 'none'
await sock.updateReadReceiptsPrivacy(value)
```
### Update Groups Add Privacy
```ts
const value = 'all' // 'contacts' | 'contact_blacklist'
await sock.updateGroupsAddPrivacy(value)
```
### Update Default Disappearing Mode

- Like [this](#disappearing-messages), ephemeral can be:

| Time  | Seconds        |
|-------|----------------|
| Remove | 0          |
| 24h    | 86.400     |
| 7d     | 604.800    |
| 90d    | 7.776.000  |

```ts
const ephemeral = 86400
await sock.updateDefaultDisappearingMode(ephemeral)
```

## Broadcast Lists & Stories

### Send Broadcast & Stories
- Messages can be sent to broadcasts & stories. You need to add the following message options in sendMessage, like this:
```ts
await sock.sendMessage(
    jid,
    {
        image: {
            url: url
        },
        caption: caption
    },
    {
        backgroundColor: backgroundColor,
        font: font,
        statusJidList: statusJidList,
        broadcast: true
    }
)
```
- Message body can be a `extendedTextMessage` or `imageMessage` or `videoMessage` or `voiceMessage`, see [here](https://baileys.whiskeysockets.io/types/AnyRegularMessageContent.html)
- You can add `backgroundColor` and other options in the message options, see [here](https://baileys.whiskeysockets.io/types/MiscMessageGenerationOptions.html)
- `broadcast: true` enables broadcast mode
- `statusJidList`: a list of people that you can get which you need to provide, which are the people who will get this status message.

- You can send messages to broadcast lists the same way you send messages to groups & individual chats.
- Right now, WA Web does not support creating broadcast lists, but you can still delete them.
- Broadcast IDs are in the format `12345678@broadcast`
### Query a Broadcast List's Recipients & Name
```ts
const bList = await sock.getBroadcastListInfo('1234@broadcast')
console.log (`list name: ${bList.name}, recps: ${bList.recipients}`)
```

## Writing Custom Functionality
Baileys is written with custom functionality in mind. Instead of forking the project & re-writing the internals, you can simply write your own extensions.

### Enabling Debug Level in Baileys Logs
First, enable the logging of unhandled messages from WhatsApp by setting:
```ts
const sock = makeWASocket({
    logger: P({ level: 'debug' }),
})
```
This will enable you to see all sorts of messages WhatsApp sends in the console.

### How Whatsapp Communicate With Us

> [!TIP]
> If you want to learn whatsapp protocol, we recommend to study about Libsignal Protocol and Noise Protocol

- **Example:** Functionality to track the battery percentage of your phone. You enable logging and you'll see a message about your battery pop up in the console:
    ```
    {
        "level": 10,
        "fromMe": false,
        "frame": {
            "tag": "ib",
            "attrs": {
                "from": "@s.whatsapp.net"
            },
            "content": [
                {
                    "tag": "edge_routing",
                    "attrs": {},
                    "content": [
                        {
                            "tag": "routing_info",
                            "attrs": {},
                            "content": {
                                "type": "Buffer",
                                "data": [8,2,8,5]
                            }
                        }
                    ]
                }
            ]
        },
        "msg":"communication"
    }
    ```

The `'frame'` is what the message received is, it has three components:
- `tag` -- what this frame is about (eg. message will have 'message')
- `attrs` -- a string key-value pair with some metadata (contains ID of the message usually)
- `content` -- the actual data (eg. a message node will have the actual message content in it)
- read more about this format [here](/src/WABinary/readme.md)

### Register a Callback for Websocket Events

> [!TIP]
> Recommended to see `onMessageReceived` function in `socket.ts` file to understand how websockets events are fired

```ts
// for any message with tag 'edge_routing'
sock.ws.on('CB:edge_routing', (node: BinaryNode) => { })

// for any message with tag 'edge_routing' and id attribute = abcd
sock.ws.on('CB:edge_routing,id:abcd', (node: BinaryNode) => { })

// for any message with tag 'edge_routing', id attribute = abcd & first content node routing_info
sock.ws.on('CB:edge_routing,id:abcd,routing_info', (node: BinaryNode) => { })
```


---

## innovatorssoft Features

The following features are ported from [@innovatorssoft/baileys](https://github.com/innovatorssoft/baileys).

### Auto-Reply System

Keyword/pattern-based automatic response handler with built-in **typing simulation** — shows a "typing..." indicator before sending each reply to feel more human.

```ts
import { createAutoReply } from '@innovatorssoft/baileys'
```


### JID Plotting & LID Support
InnovatorsSoft Baileys has advanced JID plotting utilities to handle WhatsApp's Linked IDs (LID).

```ts
import { parseJid, plotJid, normalizePhoneToJid } from '@innovatorssoft/baileys'

// Parse JID info
const info = parseJid('1234567890@s.whatsapp.net')
console.log(info.isLid) // false
console.log(info.user) // '1234567890'

// Normalize various formats to JID
const jid = normalizePhoneToJid('62812345678') // '62812345678@s.whatsapp.net'

// Plot JID (Convert between PN and LID if mapping is available)
const plotted = plotJid('1234567890@s.whatsapp.net')
```


### Message Scheduler

Schedule WhatsApp messages to be automatically sent at a specific future time (or after a delay). The scheduler is exported directly from the package — no external dependencies required.

```ts
import { createMessageScheduler } from '@innovatorssoft/baileys'
```


## Anti-Delete System
The Anti-Delete system allows you to store messages and recover them if they are revoked (deleted for everyone) by the sender.

```ts
import { MessageStore, createMessageStoreHandler, createAntiDeleteHandler } from '@innovatorssoft/baileys'

// Initialize the store
const store = new MessageStore({
    maxMessagesPerChat: 1000,
    ttl: 24 * 60 * 60 * 1000 // Keep messages for 24 hours
})

// 1. Listen for new messages to store them
sock.ev.on('messages.upsert', createMessageStoreHandler(store))

// 2. Listen for message updates (revokes/deletions)
const antiDeleteHandler = createAntiDeleteHandler(store)
sock.ev.on('messages.update', (updates) => {
    const deletedMessages = antiDeleteHandler(updates)
    for (const info of deletedMessages) {
        console.log(`Message from ${info.key.remoteJid} was deleted!`)
        console.log('Original Content:', info.originalMessage.message)
        
        // You can now re-send the message or alert the user
        // await sock.copyNForward(info.key.remoteJid, info.originalMessage)
    }
})
```



#### Message Templates

Generate consistently formatted messages using native template string interpolation with curly brackets (e.g., `{{variable:defaultValue}}`).

```ts
import { 
    createTemplateManager, 
    renderTemplate, 
    PRESET_TEMPLATES 
} from '@innovatorssoft/baileys'

// Create a manager and load the presets (includePresets = true)
const templates = createTemplateManager(true)

// Or, quick render without loading the manager
const quick = renderTemplate(
    'Hi {{name}}, your order #{{orderId}} is {{status:processing}}',
    { name: 'Alice', orderId: '123' } // 'processing' acts a default value
)
```

### Rendering Preset Templates

The manager comes out of the box with beautifully designed, ready-to-use templates for common scenarios like Orders, Invoices, Greetings, and Support Tickets. 

```ts
// Renders the built-in 'invoice' template using the provided data
const invoiceText = templates.render('invoice', {
    invoiceNumber: 'INV-111',
    customerName: 'John Doe',
    invoiceDate: '2024-01-15',
    dueDate: '2024-01-30',
    items: '1x Web Design
1x Hosting',
    subtotal: '10,000',
    tax: '1,000',
    total: '11,000',
    // We omit paymentMethod and bankAccount to let them fall back to template default
})

await sock.sendMessage(jid, { text: invoiceText })
```

### Custom Templates

You can create entirely custom templates, and define strict parameter variables. 

```ts
// Registering a Custom Template
templates.create({
    name: 'Welcome Message',
    content: `Hello {{name}}! 👋
    
Welcome to {{company}}!

Here are our services:
{{services}}

Contact: {{phone:0812-3456-7890}}`,
    category: 'greeting'
})

// Using it elsewhere in your app
const welcome = templates.render('welcome_message', {
    name: 'Budi',
    company: 'PT Example',
    services: '- Support
- Inquiries'
})
```

You can iterate through your templates using functions like `templates.getAll()` and `templates.getByCategory('greeting')`, or backup and restore them using `.export()` and `.import(json)`.


#### Quote Message (works with all types)
```ts
await sock.sendMessage(jid, { text: 'hello word' }, { quoted: message })
```

#### Mention User (works with most types)
- @number is to mention in text, it's optional
```ts
await sock.sendMessage(
    jid,
    {
        text: '@12345678901',
        mentions: ['12345678901@s.whatsapp.net']
    }
)
```

#### Forward Messages
- You need to have message object, can be retrieved from [store](#implementing-a-data-store) or use a [message] object
```ts
const msg = getMessageFromStore() // implement this on your end
await sock.sendMessage(jid, { forward: msg, force: true or number }) // WA forward the message!
```

#### Location Message
```ts
await sock.sendMessage(
    jid, 
    {
        location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221
        }
    }
)
```

#### Live Location Message
```ts
await sock.sendMessage(
    jid, 
    {
        location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221
        }, 
        live: true
    }
)
```
#### Contact Message
```ts
const vcard = 'BEGIN:VCARD
' // metadata of the contact card
            + 'VERSION:3.0
' 
            + 'FN:Jeff Singh
' // full name

#### vCard / Contact Cards

Easily generate and send vCard (VCF) contact data.

```ts
import { 
    quickContact, 
    createContactCard, 
    createContactCards,
    generateVCard 
} from '@innovatorssoft/baileys'
```


### Keep Message
```ts
await sock.sendMessage(
    jid,
    {
        keep: {
            key: Key,
            type: 1 // or 2
        }
    }
)
```


### Order Message
```ts
await sock.sendMessage(
    jid,
    {
        order: {
            orderId: '574xxx',
            thumbnail: 'your_thumbnail', 
            itemCount: 'your_count',
            status: 'your_status', // INQUIRY || ACCEPTED || DECLINED
            surface: 'CATALOG',
            message: 'your_caption',
            orderTitle: "your_title",
            sellerJid: 'your_jid'',
            token: 'your_token',
            totalAmount1000: 'your_amount',
            totalCurrencyCode: 'IDR'
        }
    }
)
```


### Payment Message
```ts
await sock.sendMessage(
    jid,
    {
        payment: {
            note: 'Hi!',
            currency: 'IDR', // optional 
            offset: 0, // optional
            amount: '10000', // optional
            expiry: 0, // optional
            from: '628xxxx@s.whatsapp.net', // optional
            image: { // optional
               placeholderArgb: "your_background", // optional
               textArgb: "your_text",  // optional
               subtextArgb: "your_subtext" // optional
            }
        }
    }
)
```


#### Payment Invite Message
```ts
await sock.sendMessage(
    id, 
    { 
        paymentInvite: {
            type: number, // 1 || 2 || 3
            expiry: 0 
        }   
    }
)
```


### Admin Invite Message
```ts
await sock.sendMessage(
    jid,
    {
        adminInvite: {
            jid: '123xxx@newsletter',
            name: 'newsletter_name', 
            caption: 'Please be my channel admin',
            expiration: 86400,
            jpegThumbnail: Buffer // optional
        }
    }
)
```


### Group Invite Message
```ts
await sock.sendMessage(
    jid,
    {
        groupInvite: {
            jid: '123xxx@g.us',
            name: 'group_name', 
            caption: 'Please Join My Whatsapp Group',
            code: 'code_invite',
            expiration: 86400,
            jpegThumbnail: Buffer, // optional            
        }
    }
)
```


### Sticker Pack Message
```ts 
// I don't know why the sticker doesn't appear
await sock.sendMessage(
    jid,
    {
        stickerPack: {
            name: 'Hiii', 
            publisher: 'By innovatorssoftn', 
            description: 'Hello', 
            cover: Buffer, // Image buffer
            stickers: [{
                sticker: { url: 'https://example.com/1234kjd.webp' }, 
                emojis: ['❤'], // optional
                accessibilityLabel: '', // optional
                isLottie: Boolean, // optional
                isAnimated: Boolean // optional
            }, 
            {
                sticker: Buffer, 
                emojis: ['❤'], // optional
                accessibilityLabel: '', // optional
                isLottie: Boolean, // optional
                isAnimated: Boolean // optional
            }]
        }
    }
)
```


### Share Phone Number Message
```ts
await sock.sendMessage(
    jid,
    {
        sharePhoneNumber: {
        }
    }
)
```


### Request Phone Number Message
```ts
await sock.sendMessage(
    jid,
    {
        requestPhoneNumber: {
        }
    }
)
```


### Buttons List Message
```ts
// Just working in a private chat
await sock.sendMessage(
    jid,
    {
        text: 'This is a list!', 
        footer: 'Hello World!', 
        title: 'Amazing boldfaced list title', 
        buttonText: 'Required, text on the button to view the list', 
        sections: [
           {
         	title: 'Section 1',
         	rows: [{
                title: 'Option 1', 
                rowId: 'option1'
             },
 	        {
                title: 'Option 2', 
                rowId: 'option2', 
                description: 'This is a description'
           }]
       },
       {
       	title: 'Section 2',
       	rows: [{
               title: 'Option 3', 
               rowId: 'option3'
           },
	       {
               title: 'Option 4', 
               rowId: 'option4', 
               description: 'This is a description V2'
           }]
       }]
    }
)
```


### Buttons Product List Message
```ts
// Just working in a private chat
await sock.sendMessage(
    jid,
    {
        text: 'This is a list!', 
        footer: 'Hello World!', 
        title: 'Amazing boldfaced list title', 
        buttonText: 'Required, text on the button to view the list', 
        productList: [{
            title: 'This is a title', 
            products: [
               {
                  productId: '1234'
               }, 
               {
                  productId: '5678'
               }
            ]
        }], 
        businessOwnerJid: '628xxx@s.whatsapp.net', 
        thumbnail: 'https://example.com/jdbenkksjs.jpg' // or buffer
    }
)
```


### Buttons Cards Message
```ts
await sock.sendMessage(
    jid,
    {
        text: 'Body Message',
        title: 'Title Message', 
        subtile: 'Subtitle Message', 
        footer: 'Footer Message',
        cards: [
           {
              image: { url: 'https://example.com/jdbenkksjs.jpg' }, // URL object
              // image: Buffer, // or Buffer
              // image: './path/to/image.jpg', // or local file path string
              title: 'Title Cards',
              body: 'Body Cards',
              footer: 'Footer Cards',
              buttons: [
                  {
                      name: 'quick_reply',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         id: 'ID'
                      })
                  },
                  {
                      name: 'cta_url',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         url: 'https://www.example.com'
                      })
                  }
              ]
           },
           {
              video: { url: 'https://example.com/jdbenkksjs.mp4' }, // URL object
              // video: fs.readFileSync('./video.mp4'), // or Buffer
              // video: './path/to/video.mp4', // or local file path string
              title: 'Title Cards',
              body: 'Body Cards',
              footer: 'Footer Cards',
              buttons: [
                  {
                      name: 'quick_reply',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         id: 'ID'
                      })
                  },
                  {
                      name: 'cta_url',
                      buttonParamsJson: JSON.stringify({
                         display_text: 'Display Button',
                         url: 'https://www.example.com'
                      })
                  }
              ]
           }
        ]
    }
)
```

### Buttons Interactive Message
```ts
await sock.sendMessage(
    jid,
    {
        text: 'This is an Interactive message!',
        title: 'Hiii',
        subtitle: 'There is a subtitle', 
        footer: 'Hello World!',
        interactiveButtons: [
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    id: 'your_id'
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Follow Me',
                    url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y',
                    merchant_url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                })
            },
            {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Click Me!',
                    copy_code: '1234567890'
                })
            },
            {
                name: 'cta_call',
                buttonParamsJson: JSON.stringify({
                    display_text: 'Call Me!',
                    phone_number: '628xxx'
                })
            },
            {
                name: 'cta_catalog',
                buttonParamsJson: JSON.stringify({
                    business_phone_number: '628xxx'
                })
            },
            {
                name: 'cta_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'cta_cancel_reminder',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'address_message',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
                name: 'send_location',
                buttonParamsJson: JSON.stringify({
                    display_text: '...'
                })
            },
            {
               name: 'open_webview',
               buttonParamsJson: JSON.stringify({
                  title: 'Follow Me!',
                  link: {
                      in_app_webview: true, // or false
                      url: 'https://whatsapp.com/channel/0029Vag9VSI2ZjCocqa2lB1y'
                  }
               })
            },
            {
               name: 'mpm',
               buttonParamsJson: JSON.stringify({
                  product_id: '8816262248471474'
               })
            },
            {
               name: 'wa_payment_transaction_details',
               buttonParamsJson: JSON.stringify({
                  transaction_id: '12345848'
               })
            },
            {
               name: 'automated_greeting_message_view_catalog',
               buttonParamsJson: JSON.stringify({
                   business_phone_number: '628xxx', 
                   catalog_product_id: '12345'
               })
            },
            {
                name: 'galaxy_message', 
                buttonParamsJson: JSON.stringify({
                	mode: 'published', 
                    flow_message_version: '3', 
                    flow_token: '1:1307913409923914:293680f87029f5a13d1ec5e35e718af3',
                    flow_id: '1307913409923914',
                    flow_cta: 'innovatorssoftn kawaii >\<', 
                    flow_action: 'navigate', 
                    flow_action_payload: {
                    	screen: 'QUESTION_ONE',
                        params: {
                        	user_id: '123456789', 
                            referral: 'campaign_xyz'
                        }
                    }, 
                    flow_metadata: {
                    	flow_json_version: '201', 
                        data_api_protocol: 'v2', 
                        flow_name: 'Lead Qualification [en]',
                        data_api_version: 'v2', 
                        categories: ['Lead Generation', 'Sales']
                   }
                }) 
            }, 
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: 'Click Me!',
                    sections: [
                        {
                            title: 'Title 1',
                            highlight_label: 'Highlight label 1',
                            rows: [
                                {
                                    header: 'Header 1',
                                    title: 'Title 1',
                                    description: 'Description 1',
                                    id: 'Id 1'
                                },
                                {
                                    header: 'Header 2',
                                    title: 'Title 2',
                                    description: 'Description 2',
                                    id: 'Id 2'
                                }
                            ]
                        }
                    ]
                })
            }
        ]
    }
)

// If you want to use an image
await sock.sendMessage(
    jid, 
    {
       image: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       },
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true
    }
)

// If you want to use an video
await sock.sendMessage(
    jid, 
    {
        video: { 
          url: 'https://example.com/jdbenkksjs.mp4' 
       },
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true
    }
)

// If you want to use an document
await sock.sendMessage(
    jid, 
    {
        document: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       }, 
       mimetype: 'image/jpeg', 
       jpegThumbnail: await sock.resize('https://example.com/jdbenkksjs.jpg', 320, 320), 
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true, 
       viewOnce: true
    }
)

// If you want to use an location
await sock.sendMessage(
    jid, 
    { 
       location: {
         degressLatitude: -0, 
         degressLongitude: 0,
         name: 'Hi'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       interactiveButtons: [
           {
               name: 'quick_reply',
               buttonParamsJson: JSON.stringify({
                   display_text: 'DisplayText',
                   id: 'ID1'
               })
           }
       ], 
       hasMediaAttachment: false // or true
       viewOnce: true
    }
)

// if you want to use an product
await sock.sendMessage(
    jid,
    {
        product: {
            productImage: { 
               url: 'https://example.com/jdbenkksjs.jpg'
            },
            productId: '836xxx',
            title: 'Title',
            description: 'Description',
            currencyCode: 'IDR',
            priceAmount1000: '283xxx',
            retailerId: 'innovatorssoftn',
            url: 'https://example.com',
            productImageCount: 1
        },
        businessOwnerJid: '628xxx@s.whatsapp.net',
        caption: 'Body',
        title: 'Title', 
        subtitle: 'Subtitle', 
        footer: 'Footer',
        interactiveButtons: [
            {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                    display_text: 'DisplayText',
                    id: 'ID1'
                })
            }
        ], 
        hasMediaAttachment: false // or true
        viewOnce: true
    }
)
```


### Buttons Interactive Message PIX
```ts
await sock.sendMessage( 
    jid, 
    { 
       text: '', // This string is required. Even it's empty. 
       interactiveButtons: [ 
          { 
             name: 'payment_info', 
             buttonParamsJson: JSON.stringify({ 
                payment_settings: [{ 
                   type: "pix_static_code", 
                   pix_static_code:  { 
                      merchant_name: 'innovatorssoftn kawaii >\\\<', 
                      key: 'example@innovatorssoft.com', 
                      key_type: 'EMAIL' // PHONE || EMAIL || CPF || EVP 
                   } 
               }] 
            }) 
         } 
      ], 
   } 
)
 ```


### Buttons Interactive Message PAY
```ts
await sock.sendMessage( 
    jid, 
    { 
       text: '', // This string is required. Even it's empty. 
       interactiveButtons: [ 
          { 
             name: 'review_and_pay', 
             buttonParamsJson: JSON.stringify({ 
                currency: 'IDR', 
                payment_configuration: '', 
                payment_type: '', 
                total_amount: {
                    value: '999999999',
                    offset: '100'
                }, 
                reference_id: '45XXXXX',
                type: 'physical-goods',
                payment_method: 'confirm', 
                payment_status: 'captured', 
                payment_timestamp: Math.floor(Date.now() / 1000),
                order: {
                    status: 'completed', 
                    description: '', 
                    subtotal: {
                        value: '0', 
                        offset: '100'
                    }, 
                    order_type: 'PAYMENT_REQUEST', 
                    items: [{
                        retailer_id: 'your_retailer_id', 
                        name: 'innovatorssoftn Kawaii >\\<', 
                        amount: {
                            value: '999999999', 
                            offset: '100'
                        }, 
                        quantity: '1', 
                    }]
                }, 
                additional_note: 'innovatorssoftn Kawaii >\\<', 
                native_payment_methods: [], 
                share_payment_status: false
            }) 
         } 
      ], 
   } 
)
 ```


### Status Mentions Message
```ts
const jidat = [
    '123451679@g.us', 
    '124848899@g.us', 
    '111384848@g.us', 
    '62689xxxx@s.whatsapp.net', 
    '62xxxxxxx@s.whatsapp.net'
]
// Text
await sock.sendStatusMentions(
    {
      text: 'Hello Everyone :3', 
      font: 2, // optional
      textColor: 'FF0000', // optional
      backgroundColor: '#000000' // optional
    }, 
    jids // Limit to 5 mentions per status
)

// Image
await sock.sendStatusMentions(
    {
      Image: { url: 'https://example.com/ruriooe.jpg' }, or image buffer
      caption: 'Hello Everyone :3' // optional
    }, 
    jids // Limit to 5 mentions per status
)

// Video
await sock.sendStatusMentions(
    {
      video: { url: 'https://example.com/ruriooe.mp4' }, or video buffer
      caption: 'Hello Everyone :3' // optional
    }, 
    jids // Limit to 5 mentions per status
)

// Audio
await sock.sendStatusMentions(
    {
      audio: { url: 'https://example.com/ruriooe.mp3' }, or audio buffer
      backgroundColor: '#000000', // optional 
      mimetype: 'audio/mp4', 
      ppt: true
    }, 
    jids // Limit to 5 mentions per status
)
```


### Shop Message
```ts
await sock.sendMessage(
    jid, 
    {      
       text: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       viewOnce: true
    }
)

// Image
await sock.sendMessage(
    jid, 
    { 
       image: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Video
await sock.sendMessage(
    jid, 
    { 
       video: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Document
await sock.sendMessage(
    jid, 
    {
        document: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       }, 
       mimetype: 'image/jpeg', 
       jpegThumbnail: await sock.resize('https://example.com/jdbenkksjs.jpg', 320, 320), 
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true, 
       viewOnce: true
    }
)

// Location
await sock.sendMessage(
    jid, 
    { 
       location: {
         degressLatitude: -0, 
         degressLongitude: 0,
         name: 'Hi'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Product
await sock.sendMessage(
    jid,
    {
        product: {
            productImage: { 
               url: 'https://example.com/jdbenkksjs.jpg'
            },
            productId: '836xxx',
            title: 'Title',
            description: 'Description',
            currencyCode: 'IDR',
            priceAmount1000: '283xxx',
            retailerId: 'innovatorssoftn',
            url: 'https://example.com',
            productImageCount: 1
        },
        businessOwnerJid: '628xxx@s.whatsapp.net',
        caption: 'Body',
        title: 'Title', 
        subtitle: 'Subtitle', 
        footer: 'Footer',
        shop: {
          surface: 1, // 2 | 3 | 4
          id: 'https://example.com'
       }, 
        hasMediaAttachment: false, // or true
        viewOnce: true
    }
)
```

### Collection Message
```ts
await sock.sendMessage(
    jid, 
    {      
       text: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       viewOnce: true
    }
)

// Image
await sock.sendMessage(
    jid, 
    { 
       image: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Video
await sock.sendMessage(
    jid, 
    { 
       video: {
          url: 'https://example.com/jdbenkksjs.jpg'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Document
await sock.sendMessage(
    jid, 
    {
        document: { 
          url: 'https://example.com/jdbenkksjs.jpg' 
       }, 
       mimetype: 'image/jpeg', 
       jpegThumbnail: await sock.resize('https://example.com/jdbenkksjs.jpg', 320, 320), 
       caption: 'Body',
       title: 'Title',
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true, 
       viewOnce: true
    }
)

// Location
await sock.sendMessage(
    jid, 
    { 
       location: {
         degressLatitude: -0, 
         degressLongitude: 0,
         name: 'Hi'
       },    
       caption: 'Body',
       title: 'Title', 
       subtitle: 'Subtitle', 
       footer: 'Footer',
       collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
       hasMediaAttachment: false, // or true
       viewOnce: true
    }
)

// Product
await sock.sendMessage(
    jid,
    {
        product: {
            productImage: { 
               url: 'https://example.com/jdbenkksjs.jpg'
            },
            productId: '836xxx',
            title: 'Title',
            description: 'Description',
            currencyCode: 'IDR',
            priceAmount1000: '283xxx',
            retailerId: 'innovatorssoftn',
            url: 'https://example.com',
            productImageCount: 1
        },
        businessOwnerJid: '628xxx@s.whatsapp.net',
        caption: 'Body',
        title: 'Title', 
        subtitle: 'Subtitle', 
        footer: 'Footer',
        collection: {
          bizJid: 'jid', 
          id: 'https://example.com', 
          version: 1
       }, 
        hasMediaAttachment: false, // or true
        viewOnce: true
    }
)
```


### AI Icon Feature 
```ts
await sock.sendMessage(
    jid,
    {
        text: 'Hi'
    }, {
    ai: true // Add ai usage and change it to true
    }
)

// If using relay
await sock.relayMessage(
    jid,
    {
        extendedTextMessage: {
            text: 'Hi'
        }
    }, {
    AI: true // Use capital letters
    }
)
```


## Initiate Voice Call

- Initiates outgoing call signaling to a 1:1 or group jid
- Supports audio (default) and video calls
- Returns `{ callId, to, isVideo }` — use `callId` to cancel the call
- **Note: full WebRTC/SRTP media transport is not implemented; this covers the signaling layer only**

```ts
// Initiate a voice call
const { callId } = await sock.initiateCall(jid)

// Initiate a video call
const { callId } = await sock.initiateCall(jid, { isVideo: true })

// Cancel an outgoing call
await sock.cancelCall(callId, jid)
```


## Reject Call

- You can obtain `callId` and `callFrom` from `call` event

```ts
await sock.rejectCall(callId, callFrom)
```


### Typing Indicator

Use `createTypingIndicator` for manual or standalone typing/recording presence control — without needing the auto-reply system.

```ts
import { createTypingIndicator } from '@innovatorssoft/baileys'

const typing = createTypingIndicator(
    (jid, presence) => sock.sendPresenceUpdate(presence, jid)
)
```

```ts
// Show "typing..." for 2 s, then send the message — all in one call
const sent = await typing.simulateTyping(jid, 2000, () =>
    sock.sendMessage(jid, { text: 'Here is your answer! ✅' })
)

// Manual start (auto-pauses after 5 s)
await typing.startTyping(jid, { duration: 5000 })

// Manual stop
await typing.stopTyping(jid)

// Voice note recording indicator
await typing.startRecording(jid, { duration: 3000 })

// Stop all active indicators (e.g. on socket close)
await typing.stopAll()
```

> [!TIP]
> `simulateTyping(jid, duration, callback)` is the simplest way to fake a human delay before any action — just wrap your `sendMessage` call in the callback.


### Read Receipt Control

A centralized tracker for handling read receipts (blue ticks) programmatically. It allows you to configure automatic delays (simulating human reaction time), configure global enable/disable states, and completely block specific JIDs from receiving blue ticks.

```ts
import { createReadReceiptController } from '@innovatorssoft/baileys'

const readReceipts = createReadReceiptController(
    (jid, participant, messageIds) => sock.readMessages([{ remoteJid: jid, id: messageIds[0] }]),
    {
        enabled: true,
        readDelay: 1000, // 1 second artificial delay
        excludeJids: ['blocked@s.whatsapp.net']
    }
)

// Mark as read manually inside an event listener!
// This respects the disabled state, excluded JIDs, and the `readDelay`.
await readReceipts.markRead(jid, participant, ['messageId123'])

// Force read (bypasses all rules and config!)
await readReceipts.forceMarkRead(jid, participant, ['messageId123'])

// Global toggle 
readReceipts.disable() // Stop sending read receipts globally
readReceipts.enable()  

// Update config dynamically
readReceipts.setConfig({
    enabled: true,
    readDelay: 2000
})
```

---



### Clear Messages
```ts
await sock.clearMessage(jid, key, timestamps) 
```


### Message Search

Search and filter stored arrays of messages using a fast client-side indexing manager.

```ts
import { createMessageSearch, searchMessages } from '@innovatorssoft/baileys'

// Initialize the search manager
const search = createMessageSearch()

// Add bulk WAMessages to index
// Duplicate Message IDs are safely ignored.
search.addMessages(chatMessages)

// Search by text
const results = search.search('product price', {
    caseSensitive: false,
    limit: 20,
    messageTypes: ['text', 'image'], // Automatically searches inside image captions!
    fromDate: new Date('2024-01-01') // Filter by date securely
})

// Output is mapped and scored by Relevance
for (const result of results) {
    console.log(`Found snippet: "${result.matchedText}"`)
    console.log(`Relevance Score: ${result.relevanceScore}`)
    console.log(`Message Object:`, result.message)
}

// You can also search explicitly using Regex:
const regexResults = search.searchRegex(/order\s*#?\d+/i)

// Quick search via functional call, without keeping a manager:
const quickResults = searchMessages(
    rawMessagesArray, 
    'keyword', 
    { jid: '12345678@s.whatsapp.net', fromMe: false }
)
```

---



### Status / Story Posting

Post rich text, image, video, and audio statuses easily using `StatusHelper`.

> [!IMPORTANT]
> - **Multi-Device mode**: Statuses sent to `status@broadcast` are only visible to contacts included in the `statusJidList`.
> - **Groups**: You can now send statuses directly to group JIDs by including them in the `jidList`.
> `StatusHelper.send()` handles both cases automatically.

```ts
import { 
    StatusHelper, 
    STATUS_BACKGROUNDS,
    STATUS_FONTS
} from '@innovatorssoft/baileys'

// JIDs of contacts or groups who should see the status
const jidList = [
    '12345@s.whatsapp.net', // Individual contact
    '12036302@g.us'         // Group status! 🚀
]
```


### Text Status

You can use the built-in background colors and fonts.

```ts
// 1. A simple text status on a green background
const status = StatusHelper.text('Hello World! 🌍', STATUS_BACKGROUNDS.solid.purple)
await StatusHelper.send(sock, status, jidList)

// 2. A fully customized text status
import { createTextStatus } from '@innovatorssoft/baileys'

const customStatus = createTextStatus({
    text: 'Custom styled status!',
    backgroundColor: STATUS_BACKGROUNDS.gradient.sunset[0],
    font: STATUS_FONTS.DANCING,
    textColor: '#FFFFFF'
})
await StatusHelper.send(sock, customStatus, jidList)
```


### Media Status

Generate and send media statuses with captions.

```ts
// Image Status
const imageBuffer = fs.readFileSync('./my-photo.jpg')
await StatusHelper.send(sock, StatusHelper.image(imageBuffer, 'Beautiful day! ☀️'), jidList)

// Video Status
const videoBuffer = fs.readFileSync('./my-video.mp4')
await StatusHelper.send(sock, StatusHelper.video(videoBuffer, 'Check this out! 🎬'), jidList)

// GIF Status (Video played on loop without sound)
await StatusHelper.send(sock, StatusHelper.gif(gifBuffer, 'Animated! 🎭'), jidList)

// Voice Note / Audio Status
await StatusHelper.send(sock, StatusHelper.voiceNote(audioBuffer), jidList)
```

---




# License
Copyright (c) 2025 Rajeh Taher/WhiskeySockets

Licensed under the MIT License:
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Thus, the maintainers of the project can't be held liable for any potential misuse of this project.
