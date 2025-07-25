import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { jidNormalizedUser, S_WHATSAPP_NET, isJidUser, STORIES_JID } from '../WABinary'
import { 
	generateWAMessage,
	generateWAMessageFromContent
} from '../Utils'
import { generateProfilePictureFull, generateProfilePictureFP, generatePP, changeprofileFull, generateProfilePicturee } from './media-messages'


/** update the profile picture for yourself or a group as Full */
	export const updateProfilePictureFull = async(jid, content, sock) => {
	const { query } = sock
		const { img } = await generateProfilePictureFP(content)
		await query({
			tag: 'iq',
			attrs: {
				target: jid,
				to: S_WHATSAPP_NET,
				type: 'set',
				xmlns: 'w:profile:picture'
			},
			content: [
				{
					tag: 'picture',
					attrs: { type: 'image' },
					content: img
				}
			]
		})
	};
	
	export const updateProfilePictureFull2 = async(jid, content, sock) => {
	const { query } = sock
		const { preview } = await generatePP(content)
		await query({
			tag: 'iq',
			attrs: {
				target: jid,
				to: S_WHATSAPP_NET,
				type: 'set',
				xmlns: 'w:profile:picture'
			},
			content: [
				{
					tag: 'picture',
					attrs: { type: 'image' },
					content: preview
				}
			]
		})
	};
	
	export const sendStatusMentions = async (jid, content, sock) => {
	const { waUploadToServer, relayMessage, groupMetadata } = sock
         const media = await generateWAMessage(STORIES_JID, content, {
            upload: await waUploadToServer,
            backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
            font: content.text ? Math.floor(Math.random() * 9) : undefined,
            userJid: jid
         })
         const additionalNodes = [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid
                  },
                  content: undefined,
               }],
            }],
         }]
         let Private = isJidUser(jid)
         let statusJid = Private ? [jid] : (await groupMetadata(jid)).participants.map((num) => num.id)
         await relayMessage(STORIES_JID, media.message, {
            messageId: media.key.id,
            statusJidList: statusJid,
            additionalNodes,
         })
         let type = Private ? 'statusMentionMessage' : 'groupStatusMentionMessage'
         let msg = await generateWAMessageFromContent(jid, {
            [type]: {
               message: {
                  protocolMessage: {
                     key: media.key,
                     type: 25,
                  }
               }
            },
            messageContextInfo: {
               messageSecret: randomBytes(32)
            }
         }, { userJid: jid })
         await relayMessage(jid, msg.message, {
            additionalNodes: Private ? [{
               tag: 'meta',
               attrs: {
                  is_status_mention: 'true'
               },
               content: undefined,
            }] : undefined
         })
         return media
      };
      
      export const sendStatusMentionsV2 =async (jid, content, sock) => {
      const { waUploadToServer, relayMessage, groupMetadata } = sock
const media = await generateWAMessage(STORIES_JID, content, {
upload: await waUploadToServer,
backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"), 
font: content.text ? Math.floor(Math.random() * 9) : undefined,
userJid: jid
})
const additionalNodes = [{
tag: 'meta',
attrs: {},
content: [{
tag: 'mentioned_users',
attrs: {},
content: [{
tag: 'to',
attrs: { jid },
content: undefined
}]
}]
}]
let Private = isJidUser(jid)
let statusJid = Private ? [jid] : (await groupMetadata(jid)).participants.map((num) => num.id)
await relayMessage(STORIES_JID, media.message, {
messageId: media.key.id,
statusJidList: statusJid, 
additionalNodes 
})
let type = Private ? 'statusMentionMessage' : 'groupStatusMentionMessage'   
let msg = await generateWAMessageFromContent(jid, {
[type]: {
message: {
protocolMessage: {
key: media.key,
type: 25
}
}
}
}, { userJid: jid })
await relayMessage(jid, msg.message, {}) 
return media
};