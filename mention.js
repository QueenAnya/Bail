import axios from 'axios';

const CONSTANTS = {
  GITHUB_URL: "https://github.com/Teamolduser",
  PROJECT_URL: "https://github.com/PikaBotz/Anya_v2-MD",
  HASH: "OLDUSER",
  IMG: "https://i.ibb.co/TTpdRX5/Profile.jpg",
  OWNER_NUM: ["919203336859"],
  OWNER_NUMS: ["919203336859", "918811074852"],
  GIST_OWNERS_URL: "https://gist.githubusercontent.com/Teamolduser/04f1cec3589216043dd1142e6772e9f9/raw",
  AUDIO_LIST_URL: "https://gist.githubusercontent.com/Teamolduser/38f9ff5370e76ee4c1a2d94661c16125/raw",
  AUDIO_LIST_URLL: "https://gist.githubusercontent.com/Teamolduser/ac41c93187949a2178f8dfce63da23d5/raw",
  BOT_SERVER_URL: "https://esm.api.olduser.tech/youtube/yta",
};

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

const sendsong = async (conn, pika, link) => {
  const docu = {
    audio: { url: link },
    seconds: '999999999999999.999',
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [99, 99, 0, 99, 99, 99, 99],
    fileName: "olduser.mp3",
    contextInfo: {
      mentionedJid: [pika.sender],
      externalAdReply: {
        title: "↺ |◁   II   ▷|   ♡",
        body: CONSTANTS.HASH,
        thumbnailUrl: CONSTANTS.IMG,
        sourceUrl: CONSTANTS.PROJECT_URL,
        mediaType: 2,
        mediaUrl: CONSTANTS.GITHUB_URL,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  };
  return await conn.sendMessage(pika.chat, docu, { quoted: pika });
};

const rndm_song = async (conn, pika) => {
  try {
    const { data: audioList } = await axios.get(CONSTANTS.AUDIO_LIST_URL);
    const randomAudio = pickRandom(audioList);
    const { data: songData } = await axios.get(`${CONSTANTS.BOT_SERVER_URL}?url=${randomAudio}&type=mp3&quality=128k`);
    return await sendsong(conn, pika, songData.result.dwonload_url);
  } catch (error) {
    return await pika.reply(error?.message || 'An internal error occurred.');
  }
};

const rndm_songg = async (conn, pika) => {
  try {
    const { data: audioList } = await axios.get(CONSTANTS.AUDIO_LIST_URLL);
    const category = pickRandom(["items", "bollywood"]);
    const randomAudio = pickRandom(audioList[category]);
    const { data: songData } = await axios.get(
      `${CONSTANTS.BOT_SERVER_URL}?url=${randomAudio}&type=mp3&quality=128k`
    );
    return await sendsong(conn, pika, songData.result.dwonload_url);
  } catch (error) {
    console.error("rndm_songg error:", error);
    return await pika.reply(error?.message || "An internal error occurred.");
  }
};


const getBuffer = async (url, options = {}) => {
  try {
    const { data } = await axios.get(url, {
      ...options,
      responseType: 'arraybuffer',
      headers: {
        DNT: 1,
        'Upgrade-Insecure-Request': 1,
        ...options?.headers
      }
    });
    return data;
  } catch (err) {
    return err;
  }
};

const mentiono = async (client, chat, malik, malkin) => {
  try {
    const phoneNumber = chat.mentionedJid?.[0]?.replace(/\D/g, '') || '';
    const malikNum = malik.replace(/\D/g, '');
    const malkinNum = malkin.replace(/\D/g, '');

    const { data } = await axios.get(CONSTANTS.GIST_OWNERS_URL);
    const owners = data.owners.split(',');

    const isOwner = CONSTANTS.OWNER_NUM.includes(phoneNumber) || 
                    phoneNumber === malikNum ||
                    phoneNumber === malkinNum;

    if (isOwner) return await rndm_song(client, chat);
  } catch (error) {
    console.error("Mention error:", error.message);
  }
};

const mention = async (client, chat, malik, malkin, mod) => {
  try {
    const phoneNumber = chat.mentionedJid?.[0]?.replace(/\D/g, '') || '';
    const malikNum = malik.replace(/\D/g, '');
    const malkinNum = malkin.replace(/\D/g, '');

    const { data } = await axios.get(CONSTANTS.GIST_OWNERS_URL);
    const owners = data.owners.split(',');

    const isOwner = CONSTANTS.OWNER_NUMS.includes(phoneNumber) || 
                    owners.includes(phoneNumber) ||
                    phoneNumber === malikNum ||
                    phoneNumber === malkinNum ||
                    (mod && mod.includes(phoneNumber));

    if (isOwner) return await rndm_songg(client, chat);
  } catch (error) {
    console.error("Mention error:", error.message);
  }
};

const sticker_saver = async (jid, chat) => {
  return chat.copyNForward2(jid, { quoted: chat });
};

export {
  pickRandom,
  sendsong,
  rndm_song,
  getBuffer,
  mention,
  mentiono,
  sticker_saver
};
