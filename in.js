
const fs = require('fs');
const axios = require('axios');
const fileType = require("file-type");
const { fromBuffer } = require("file-type");

const pickRandom = (list) => {
  return list[Math.floor(list.length * Math.random())];
};

const sendsong = async (conn, pika, link) => {
    let url = "https://github.com/Teamolduser"
    let murl = "https://github.com/PikaBotz/Anya_v2-MD"
    let hash = "OLDUSER"
    let img = "https://i.ibb.co/TTpdRX5/Profile.jpg"
    let num = "918602239106"
    let num2 = "918811074852"
    var imgg = "https://ibb.co/9vzS2Xj"
    let docu = {
        audio: {
          url: link
        },
        seconds: '999999999999999.999',
        // seconds: '9886544796.4',
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [99,99,0,99,99,99,99],
        fileName: "olduser.mp3",
        contextInfo: {
          mentionedJid: [pika.sender],
          externalAdReply: {
          title: "↺ |◁   II   ▷|   ♡",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: murl,
          mediaType: 2,
          mediaUrl: url,
          renderLargerThumbnail: true,
          showAdAttribution: true
          }}
      };
      
      return await conn.sendMessage(pika.chat, docu, { quoted: pika });
      };
      
const rndm_song = async (conn, pika) => {
let rest
try {
const resp = await axios.get("https://gist.githubusercontent.com/Teamolduser/38f9ff5370e76ee4c1a2d94661c16125/raw");
let aud = await pickRandom (resp.data);
 rest = await axios.get(`https://olduser.us.kg/youtube/botserver?ytlink=${aud}&type=audio&quality=128k`);
return await sendsong(conn, pika, rest.data.result.dl_link);
} catch(error) {
 return await pika.reply(error.message || error || 'An internal error occurred.');
}
};

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

const changeprofile = async(img) => {
	const {
		read,
		MIME_JPEG
	} = require("jimp")
	const jimp = await read(img)
	const min = Math.min(jimp.getWidth(), jimp.getHeight())
	const cropped = jimp.crop(0, 0, jimp.getWidth(), jimp.getHeight())
	let width = jimp.getWidth(),
		hight = jimp.getHeight(),
		ratio;
	if (width > hight) {
		ratio = jimp.getWidth() / 720
	} else {
		ratio = jimp.getWidth() / 324
	};
	width = width / ratio;
	hight = hight / ratio;
	img = cropped.quality(100).resize(width, hight).getBufferAsync(MIME_JPEG);
	return {
		img: await img
	}
};

const SendInvite = async (jid, client, chat, participant, inviteCode, inviteExpiration, groupName, caption, jpegThumbnail, options = {})  => {
	const msg = proto.Message.fromObject({
		groupInviteMessage: proto.Message.GroupInviteMessage.fromObject({
			inviteCode,
			inviteExpiration: parseInt(inviteExpiration) || +new Date(new Date + (3 * 86400000)),
			groupJid: jid,
			groupName,
			jpegThumbnail,
			caption
		})
	})
	const message = generateWAMessageFromContent(participant, msg, options)
	await client.relayMessage(participant, message.message, {
		messageId: message.key.id
	})
	return message
};

const SendInviteCstm = async (jid, client, chat, participant, inviteCode, inviteExpiration, groupName, caption, jpegThumbnail, options = {})  => {
	const msg = proto.Message.fromObject({
		groupInviteMessage: proto.Message.GroupInviteMessage.fromObject({
			inviteCode,
			inviteExpiration: parseInt(inviteExpiration) || +new Date(new Date + (3 * 86400000)),
			groupJid: jid,
			groupName,
			jpegThumbnail,
			caption
		})
	})
	const message = generateWAMessageFromContent(participant, msg, options)
	await client.relayMessage(participant, message.message, {
		messageId: message.key.id
	})
	return message
};

const SendGroupInviteMessageToUser = async(NoNnumber, client, chat) => {
		//const number = NoNnumber.replace(/[^0-9]/g,'');
		const response = await groupAddQuery(chat, NoNnumber);
		//const jpegThumbnaill = await getBuffer(await client.profilePictureUrl(chat, 'image'));
		//const jpegThumbnail = await getBuffer(await client.profilePictureUrl(chat));
		const add = getBinaryNodeChild(response, 'add');
		const participant = getBinaryNodeChildren(response, 'add');
		// let anu = participant[0].content.filter(v => v);
		for (const user of participant[0].content.filter(item => item.attrs.error == 403)) {
			const jid = user.attrs.jid
			const content = getBinaryNodeChild(user, 'add_request')
			const invite_code = content.attrs.code
			const invite_code_exp = content.attrs.expiration
			const {
				subject,
				desc
			} = await groupMetadata(chat);
			const metadata = await client.groupMetadata(chat);
			const caption = 'Invitation To Join My WhatsApp Group';
			return await SendInvite(chat, client, chat, jid, invite_code, invite_code_exp, subject, caption, jpegThumbnail)
		}
	};
	
	const SendGroupInviteMessageToUserCstm = async(NoNnumber, client, chat, gcname, gcimg) => {
		const number = NoNnumber.replace(/[^0-9]/g,'');
		const groupMetadata = await client.groupMetadata(chat).catch(e => {})
		const participants = await groupMetadata.participants
		let NumToArr = [number.toString()];
		let _participants = participants.map(user => user.id)
		let users = (await Promise.all(NumToArr.map(v => v.replace(/[^0-9]/g, '')).filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net')).map(async v => [
			v,
			await client.onWhatsApp(v + '@s.whatsapp.net')
		]))).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
		const response = await client.query({
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
		// const jpegThumbnaill = await getBuffer(await client.profilePictureUrl(chat, 'image'));
		const jpegThumbnail = await getBuffer(gcimg);
		const add = getBinaryNodeChild(response, 'add');
		const participant = getBinaryNodeChildren(response, 'add');
		let anu = participant[0].content.filter(v => v);
		if (anu[0].attrs.error == 408) return await client.sendMessage(chat, { text : `Unable to add @${anu[0].attrs.jid.split('@')[0]}!\nThe news is that @${anu[0].attrs.jid.split('@')[0]} just left this group` } );
		for (const user of participant[0].content.filter(item => item.attrs.error == 403)) {
			const jid = user.attrs.jid
			const content = getBinaryNodeChild(user, 'add_request')
			const invite_code = content.attrs.code
			const invite_code_exp = content.attrs.expiration
			const {
				subject,
				desc
			} = await client.groupMetadata(chat);
			const metadata = await client.groupMetadata(chat);
			const caption = 'Invitation To Join My WhatsApp Group';
			const gcnme = gcname || subject
			return await SendInviteCstm(chat, client, chat, jid, invite_code, invite_code_exp, gcnme, caption, jpegThumbnail)
		}
	};
	
const updateProfilePicture = async(client, jid, image) => {
		content: WAMediaUpload;
		const {
			img
		} = await changeprofile(image);
		await client.query({
			tag: 'iq',
			attrs: {
				to: jidNormalizedUser(jid),
				type: 'set',
				xmlns: 'w:profile:picture'
			},
			content: [{
				tag: 'picture',
				attrs: {
					type: 'image'
				},
				content: img
			}]
		})
	};
	
	const mentiondev = async(client, chat, num, prefix) => {
    let url = "https://github.com/Teamolduser"
    let murl = "https://github.com/PikaBotz/Anya_v2-MD"
    let hash = "OLDUSER"
    let img = "https://i.ibb.co/TTpdRX5/Profile.jpg"
    let numm = "918602239106"
    let numm2 = "918811074852"
    var imgg = "https://ibb.co/9vzS2Xj"
    var aud = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0369.m4a"
    var musc = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0367.m4a"
    var vn = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0366.m4a"
    var song = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0365.m4a"
    const music = await pickRandom ([aud, musc, vn, song])
    let doc = {
        audio: {
          url: music
        },
        seconds: '999999999999999.999',
        // seconds: '9886544796.4',
        mimetype: 'audio/mpeg',
        ptt: true,
        waveform: [99,99,0,99,99,99,99],
        fileName: "olduser.mp3",
        contextInfo: {
          mentionedJid: [chat.sender],
          externalAdReply: {
          title: "↺ |◁   II   ▷|   ♡",
          body: hash,
          thumbnailUrl: img,
          sourceUrl: murl,
          mediaType: 2,
          mediaUrl: url,
          renderLargerThumbnail: true,
          showAdAttribution: true
          }}
      };
    let phoneNumber = '';
    if (chat.mentionedJid && chat.mentionedJid[0]) {
        phoneNumber = chat.mentionedJid[0].replace(/[^0-9]/g, '');
        if (phoneNumber === num) {
          return await client.sendMessage(chat.chat, doc, { quoted: chat });
        }
      } else {
        return
      }
};

const mention = async (client, chat, malik, malkin, mod, prefix) => {
    let url = "https://github.com/Teamolduser"
    let murl = "https://github.com/PikaBotz/Anya_v2-MD"
    let hash = "OLDUSER"
    let img = "https://i.ibb.co/TTpdRX5/Profile.jpg"
    let num = "918602239106"
    let num2 = "918811074852"
    var imgg = "https://ibb.co/9vzS2Xj"
    
        const phoneNumber = chat.mentionedJid?.[0]?.replace(/[^0-9]/g, '') || '';
        const malik2 = malik.replace(/[^0-9]/g, '');
        const malkin2 = malkin.replace(/[^0-9]/g, '');

        const { data } = await axios.get("https://gist.githubusercontent.com/Teamolduser/04f1cec3589216043dd1142e6772e9f9/raw");
        const owners = await data.owners.split(',');

        if (phoneNumber === num && phoneNumber === num2) {
            return await rndm_song(client, chat);
        } else if (owners.includes(phoneNumber) || phoneNumber === malik2 || phoneNumber === malkin2 || (mod && mod.includes(phoneNumber))) {
            return await rndm_song(client, chat);
        }
};

const mentiono = async (client, chat, malik, malkin, mod, prefix) => {
      return await mention(client, chat, malik, malkin, mod, prefix);
      };

const sticker_saver = async(jid, chat, quoted) => {
return await chat.copyNForward2(jid, { qouted : chat });
  };
  
const downloadMediaMessageBaileys = async() => {
    const buff = await m.quoted.download();
    const type = await fileType.fromBuffer(buff);
    await fs.promises.writeFile("./media" + type.ext, buff);
    return "./media" + type.ext;
  };
  
const getFile = async (PATH, pikad, returnAsFilename) => {
      let res, filename;
      let data = Buffer.isBuffer(PATH)
        ? PATH
        : /^data:.*?\/.*?;base64,/i.test(PATH)
        ? Buffer.from(PATH.split`,`[1], "base64")
        : /^https?:\/\//.test(PATH)
        ? await (res = await fetch(PATH)).buffer()
        : fs.existsSync(PATH)
        ? ((filename = PATH), fs.readFileSync(PATH))
        : typeof PATH === "string"
        ? PATH
        : Buffer.alloc(0);
      if (!Buffer.isBuffer(data)) throw new TypeError("Result is not a buffer");
      let type = (await fromBuffer(data)) || {
        mime: "application/octet-stream",
        ext: ".bin",
      };
      if (data && returnAsFilename && !filename)
        (filename = path.join(
          __dirname,
          "../" + new Date() * 1 + "." + type.ext
        )),
          await fs.promises.writeFile(filename, data);
      return {
        res,
        filename,
        ...type,
        data,
      };
    };
    
    const sendFile= async (content, client, chat, pikad, options = {}) => {
    let { data } = await getFile(content, pikad);
    let type = await fileType.fromBuffer(data);
    return client.sendMessage(
      chat.chat,
      { [type.mime.split("/")[0]]: data, ...options },
      { ...options }
    );
  };
  
  const viewonce = async (client, chat, pikad) => {
  let buff = await pikad();
    return await sendFile(buff, client, chat, pikad);
    };
  
const spam = async(jid, client, chat, mod, prefix) => {
var aud = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0369.m4a"
    var musc = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0367.m4a"
    var vn = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0366.m4a"
    var song = "https://github.com/Teamolduser/database/raw/master/music/PTT-20240328-WA0365.m4a"
    const music = await pickRandom ([aud, musc, vn, song])
    let doc = {
        audio: {
          url: music
        }
        }
        if (chat.sender.startsWith('212')) {
        await client.sendMessage(chat.chat, doc, { quoted: chat });
        await delay(1000);
        return client.updateBlockStatus(chat.sender, 'block')
      } else {
        return
      }
};


module.exports = {
  rndm_song,
  getBuffer,
  changeprofile,
  SendInvite,
  SendInviteCstm,
  SendGroupInviteMessageToUser,
  SendGroupInviteMessageToUserCstm,
  updateProfilePicture,
  mentiondev,
  mention,
  mentiono,
  sticker_saver,
  downloadMediaMessageBaileys,
  getFile,
  sendFile,
  viewonce,
  spam
};