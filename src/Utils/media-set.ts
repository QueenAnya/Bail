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