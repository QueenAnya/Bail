import {
	jidNormalizedUser,
	proto,
	getBinaryNodeChild,
	generateWAMessageFromContent,
	getBinaryNodeChildren,
	generateWAMessage,
	proto
} from "@queenanya/baileys";
import axios from "axios";

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
};

const groupAddQuery = async(
	     chat: string,
		 users: string[],
			) => {
	const response = await query({
			tag: 'iq',
			attrs: {
				type: 'set',
				xmlns: 'w:g2',
				to: chat,
			},
			content: users.map(jid => ({
				tag: 'add',
				attrs: {},
				content: [{
					tag: 'participant',
					attrs: {
						jid
					}
				}]
			}))
		})
		return response
		};
		
  const SendInvite = async (sock, chat, participant, inviteCode, inviteExpiration, groupName, caption, jpegThumbnaill)  => {
	const msg = proto.Message.fromObject({
		groupInviteMessage: proto.Message.GroupInviteMessage.fromObject({
			inviteCode,
			inviteExpiration: parseInt(inviteExpiration) || +new Date(new Date + (3 * 86400000)),
			groupJid: chat,
			groupName,
			jpegThumbnaill,
			caption
		})
	})
	const message = generateWAMessageFromContent(participant, msg, options)
	await sock.relayMessage(participant, message.message, {
		messageId: message.key.id
	})
	return message
};

 const groupParticipantsAddInvite = async(sock, chat, userrr) => {
		//const number = NoNnumber.replace(/[^0-9]/g,'');
		const response = await groupAddQuery(chat, userrr);
		const jpegThumbnaill = await getBuffer(await sock.profilePictureUrl(chat, 'image'));
		//const jpegThumbnail = await getBuffer(await sock.profilePictureUrl(chat));
		const add = getBinaryNodeChild(response, 'add');
		const participant = getBinaryNodeChildren(response, 'add');
		for (const user of participant[0].content.filter(item => item.attrs.error == 403)) {
			const jid = user.attrs.jid
			const content = getBinaryNodeChild(user, 'add_request')
			const invite_code = content.attrs.code
			const invite_code_exp = content.attrs.expiration
			const {
				subject,
				desc
			} = await sock.groupMetadata(chat);
			const caption = 'Invitation To Join My WhatsApp Group';
			return await SendInvite(sock, chat, jid, invite_code, invite_code_exp, subject, caption, jpegThumbnaill)
		}
	};
	
export { groupParticipantsAddInvite, getBuffer, groupParticipantsAddInvite as SendGroupInviteMessageToUser, groupParticipantsAddInvite as SGIMTU };