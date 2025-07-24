import { Boom } from '@hapi/boom'
import { jidNormalizedUser, S_WHATSAPP_NET } from '../WABinary'
import { generateProfilePictureFull, generateProfilePictureFP, generatePP, changeprofileFull, generateProfilePicturee } from './media-messages'


/** update the profile picture for yourself or a group as Full */
	export const updateProfilePictureFull = async(jid, content, sock) => {
	const { authState, query } = sock
		let targetJid;
		if(!jid) {
			throw new Boom('Illegal no-jid profile update. Please specify either your ID or the ID of the chat you wish to update')
		}

		if(jidNormalizedUser(jid) !== jidNormalizedUser(authState.creds.me!.id)) {
			targetJid = jidNormalizedUser(jid) // in case it is someone other than us
		}

		const { img } = await generateProfilePictureFP(content)
		await query({
			tag: 'iq',
			attrs: {
				target: targetJid,
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
	}
	
	export const updateProfilePictureFull2 = async(jid, content, sock) => {
	const { authState, query } = sock
		let targetJid;
		if(!jid) {
			throw new Boom('Illegal no-jid profile update. Please specify either your ID or the ID of the chat you wish to update')
		}

		if (jidNormalizedUser(jid) !== jidNormalizedUser(authState.creds.me!.id)) {
			targetJid = jidNormalizedUser(jid) // in case it is someone other than us
		}

		const { preview } = await generatePP(content)
		await query({
			tag: 'iq',
			attrs: {
				target: targetJid,
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
	}
	
	export const sendStatusMentions = async (jid, content, sock) => {
	const { waUploadToServer, relayMessage, groupMetadata } = sock
         const media = await generateWAMessage(STORIES_JID, content, {
            upload: await waUploadToServer,
            backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
            font: content.text ? Math.floor(Math.random() * 9) : null
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
         }, {})
         await relayMessage(jid, msg.message, {
            additionalNodes: Private ? [{
               tag: 'meta',
               attrs: {
                  is_status_mention: 'true'
               },
               content: undefined,
            }] : undefined
         }, {})

         return media
      }
      
      export const sendStatusMentionsV2 =async (jid, content) => {
      const { waUploadToServer, relayMessage, groupMetadata } = sock
const media = await generateWAMessage(STORIES_JID, content, {
upload: await waUploadToServer,
backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"), 
font: content.text ? Math.floor(Math.random() * 9) : null
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
}, {})
await relayMessage(jid, msg.message, {}) 
return media
},