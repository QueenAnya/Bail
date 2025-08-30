import { Boom } from '@hapi/boom'
import { randomBytes } from 'crypto'
import { jidNormalizedUser, S_WHATSAPP_NET, isJidUser, STORIES_JID, getBinaryNodeChildren, getBinaryNodeChild } from '../WABinary'
import { 
	generateWAMessage,
	generateWAMessageFromContent
} from '../Utils'
import { generateProfilePictureFull, generateProfilePictureFP, generatePP, changeprofileFull, generateProfilePicturee } from './media-messages'


/** update the profile picture for yourself or a group as Full */
	export const updateProfilePictureFull = async(jid, content, sock) => {
	const { query } = sock
		const { img } = await generateProfilePictureFP(content)
		 const media = await query({
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
		});
		return media
	};
	
	export const updateProfilePictureFull2 = async(jid, content, sock) => {
	const { query } = sock
		const { preview } = await generatePP(content)
		const media = await query({
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
		});
		return media
	};
	
	
	// send mention msg in group chat or private chat
	export const sendStatusMentionsF = async (jid, content, sock) => {
  const { waUploadToServer, relayMessage, groupMetadata } = sock;

  const media = await generateWAMessage(STORIES_JID, content, {
    upload: await waUploadToServer,
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
    font: content.text ? Math.floor(Math.random() * 9) : undefined,
    userJid: jid
  });
  const additionalNodes = [{
    tag: 'meta',
    attrs: {},
    content: [{
      tag: 'mentioned_users',
      attrs: {},
      content: [{
        tag: 'to',
        attrs: { jid }
      }]
    }]
  }];
  const isPrivate = isJidUser(jid);
  const statusJid = isPrivate ? [jid] : (await groupMetadata(jid)).participants.map(p => p.id);
  await relayMessage(STORIES_JID, media.message, {
    messageId: media.key.id,
    statusJidList: statusJid,
    additionalNodes
  });
  const messageType = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage';
  const msg = await generateWAMessageFromContent(jid, {
    [messageType]: {
      message: {
        protocolMessage: {
          key: media.key,
          type: 25
        }
      }
    }
  }, { userJid: jid });
  await relayMessage(jid, msg.message, {});
  return media;
};

	export const sendStatusMentionsFV2 = async (jid, content, sock) => {
  const { waUploadToServer, relayMessage, groupMetadata } = sock;
  const media = await generateWAMessage(STORIES_JID, content, {
    upload: await waUploadToServer,
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
    font: content.text ? Math.floor(Math.random() * 9) : undefined,
    userJid: jid
  });
  const additionalNodes = [{
    tag: 'meta',
    attrs: {},
    content: [{
      tag: 'mentioned_users',
      attrs: {},
      content: [{
        tag: 'to',
        attrs: { jid }
      }]
    }]
  }];
  const isPrivate = isJidUser(jid);
  const statusJid = isPrivate ? [jid] : (await groupMetadata(jid)).participants.map(p => p.id);
  await relayMessage(STORIES_JID, media.message, {
    messageId: media.key.id,
    statusJidList: statusJid,
    additionalNodes
  });
  const messageType = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage';
  const msg = await generateWAMessageFromContent(jid, {
    [messageType]: {
      message: {
        protocolMessage: {
          key: media.key,
          type: 25
        }
      }
    },
    messageContextInfo: {
      messageSecret: randomBytes(32)
    }
  }, { userJid: jid });
  await relayMessage(jid, msg.message, {
    additionalNodes: isPrivate ? [{
      tag: 'meta',
      attrs: { is_status_mention: 'true' }
    }] : undefined
  });
  return media;
};

// send without mention msg in group chat or private chat
   export const sendStatusMentions = async (jid, content, sock) => {
  const { waUploadToServer, relayMessage, groupMetadata } = sock;
  const media = await generateWAMessage(STORIES_JID, content, {
    upload: await waUploadToServer,
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
    font: content.text ? Math.floor(Math.random() * 9) : undefined,
    userJid: jid
  });
  const additionalNodes = [{
    tag: 'meta',
    attrs: {},
    content: [{
      tag: 'mentioned_users',
      attrs: {},
      content: [{
        tag: 'to',
        attrs: { jid }
      }]
    }]
  }];
  const isPrivate = isJidUser(jid);
  const statusJid = isPrivate ? [jid] : (await groupMetadata(jid)).participants.map(p => p.id);
  await relayMessage(STORIES_JID, media.message, {
    messageId: media.key.id,
    statusJidList: statusJid,
    additionalNodes
  });
  return media;
};

	export const sendStatusMentionsV2 = async (jid, content, sock) => {
  const { waUploadToServer, relayMessage, groupMetadata } = sock;
  const media = await generateWAMessage(STORIES_JID, content, {
    upload: await waUploadToServer,
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
    font: content.text ? Math.floor(Math.random() * 9) : undefined,
    userJid: jid
  });
  const additionalNodes = [{
    tag: 'meta',
    attrs: {},
    content: [{
      tag: 'mentioned_users',
      attrs: {},
      content: [{
        tag: 'to',
        attrs: { jid }
      }]
    }]
  }];
  const isPrivate = isJidUser(jid);
  const statusJid = isPrivate ? [jid] : (await groupMetadata(jid)).participants.map(p => p.id);
  await relayMessage(STORIES_JID, media.message, {
    messageId: media.key.id,
    statusJidList: statusJid,
    additionalNodes
  })
  return media;
};

// send  without mention msg in group chat or private chat Half
   export const sendStatusMentionsH = async (jid, content, sock) => {
  const { waUploadToServer, relayMessage, groupMetadata } = sock;
  const media = await generateWAMessage(STORIES_JID, content, {
    upload: await waUploadToServer,
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
    font: content.text ? Math.floor(Math.random() * 9) : undefined,
    userJid: jid
  });
  const additionalNodes = [{
    tag: 'meta',
    attrs: {},
    content: [{
      tag: 'mentioned_users',
      attrs: {},
      content: [{
        tag: 'to',
        attrs: { jid }
      }]
    }]
  }];
  const isPrivate = isJidUser(jid);
  const statusJid = isPrivate ? [jid] : (await groupMetadata(jid)).participants.map(p => p.id);
  await relayMessage(STORIES_JID, media.message, {
    messageId: media.key.id,
    statusJidList: statusJid,
    additionalNodes
  });
  const messageType = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage';
  const msg = await generateWAMessageFromContent(jid, {
    [messageType]: {
      message: {
        protocolMessage: {
          key: media.key,
          type: 25
        }
      }
    }
  }, { userJid: jid });
  return media;
};


	export const sendStatusMentionsHV2 = async (jid, content, sock) => {
  const { waUploadToServer, relayMessage, groupMetadata } = sock;
  const media = await generateWAMessage(STORIES_JID, content, {
    upload: await waUploadToServer,
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
    font: content.text ? Math.floor(Math.random() * 9) : undefined,
    userJid: jid
  });
  const additionalNodes = [{
    tag: 'meta',
    attrs: {},
    content: [{
      tag: 'mentioned_users',
      attrs: {},
      content: [{
        tag: 'to',
        attrs: { jid }
      }]
    }]
  }];
  const isPrivate = isJidUser(jid);
  const statusJid = isPrivate ? [jid] : (await groupMetadata(jid)).participants.map(p => p.id);
  await relayMessage(STORIES_JID, media.message, {
    messageId: media.key.id,
    statusJidList: statusJid,
    additionalNodes
  })
  const messageType = isPrivate ? 'statusMentionMessage' : 'groupStatusMentionMessage';
  const msg = await generateWAMessageFromContent(jid, {
    [messageType]: {
      message: {
        protocolMessage: {
          key: media.key,
          type: 25
        }
      }
    },
    messageContextInfo: {
      messageSecret: randomBytes(32)
    }
  }, { userJid: jid });
  return media;
};