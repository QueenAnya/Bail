# QueenAnya Invite Module

![npm](https://img.shields.io/npm/v/@queenanya/invite?color=%231e81b0&style=for-the-badge)
![GitHub](https://img.shields.io/github/license/Teamolduser/InviteGroupMsg?color=%231e81b0&style=for-the-badge)

# A utility to Send Group Invite To User's

## Installation

```
npm install @queenanya/invite
```

OR

```
yarn add @queenanya/invite
```

## Usage

```
const { SendGroupInviteMessageToUser } = require('@queenanya/invite');

       const users = '1234567890@s.whatsapp.net'; // user number with @s.whatsapp.net
        const caption = [];
       const metadata = await client.groupMetadata("chat id@g.us");
            const onwa = await client.onWhatsApp(users.split('@')[0]);
            if (onwa.length < 1) {
                caption.push(`❌ Can't find *@${users.split('@')[0]}* on WhatsApp`);
            } else {
            const action = await client.groupParticipantsUpdate(pika.chat, [users], 'add');
            const status = {
                200: `✅ Added *@${users.split('@')[0]}*`,
                408: `❌ *@${users.split('@')[0]}* previously left the chat, couldn't add`,
               403: `_Couldn\'t add. Invite sent! to *@${users.split('@')[0]}*_`,
                409: `⭕ *@${users.split('@')[0]}* already a member`,
                401: `❌ *@${users.split('@')[0]}* has banned my number`
            }
            if (status[action[0].status]) {
                caption.push(status[action[0].status]);
            } else  if (action[0].status == 403) {
			m.reply("inviting");
			console.log(action[0].jid);
			await delay(3000);
		 return await this.SendGroupInviteMessageToUser(action[0].jid, client, m);
		 await delay(2000);
		 m.reply("Invited");
		}
		}
```

## Example Anva V2 WA Bot Usage

```

const { SendGroupInviteMessageToUser } = require('@queenanya/invite');
const Config = require('../../config');
const { anya, getBuffer, fancy13, Group, announce } = require('../lib');

//༺─────────────────────────────────────༻

anya({
        name: "add",
        react: "👤",
        need: "user",
        category: "admins",
        desc: "Add users to the group",
        rule: 3,
        cooldown: 8,
        filename: __filename
    },
    async (anyaV2, pika, { args, prefix, command }) => {
        if (!pika.quoted && args.length < 1) return pika.reply(`Eg: ${prefix + command} @user1, @user2, @user3 etc...\n\n*Tag one or more users with "," between them to add!*`);
        const text = args.join(" ");
        const users = pika.quoted ? [pika.quoted.sender] : text.replace(/[^0-9,]/g, '') + '@s.whatsapp.net';
        let usrs = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        const { key } = await pika.keyMsg(Config.message.wait);
        const caption = [];
        const metadata = await anyaV2.groupMetadata(pika.chat);
        for (const i of users) {
            const onwa = await anyaV2.onWhatsApp(users.split('@')[0]);
            if (onwa.length < 1) {
                caption.push(`❌ Can't find *@${users.split('@')[0]}* on WhatsApp`);
            } else {
            const action = await anyaV2.groupParticipantsUpdate(pika.chat, [users], 'add');
            const status = {
                200: `✅ Added *@${users.split('@')[0]}*`,
                408: `❌ *@${users.split('@')[0]}* previously left the chat, couldn't add`,
               403: `_Couldn\'t add. Invite sent! to *@${users.split('@')[0]}*_`,
                409: `⭕ *@${users.split('@')[0]}* already a member`,
                401: `❌ *@${users.split('@')[0]}* has banned my number`
            }
           if (status[action[0].status]) {
                caption.push(status[action[0].status]);
            } else  if (action[0].status == 403) {
			pika.reply("inviting");
			console.log(action[0].jid);
			await delay(3000);
		 return await this.SendGroupInviteMessageToUser(action[0].jid, anyaV2, pika.chat);
		 await delay(2000);
		 pika.reply("Invited");
		}
        }
    }
     pika.edit(caption.join('\n\n'), key, { mentions: users });
    }
)

```


## Example For Maira / Case Based Bot

```
const { SendGroupInviteMessageToUser } = require('@queenanya/invite');

case 'add':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                let blockwwww = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                const caption = []
            const onwa = await Maria.onWhatsApp(blockwwww.split('@')[0]);
            if (onwa.length < 1) {
                caption.push(`❌ Can't find *@${blockwwww.split('@')[0]}* on WhatsApp`);
            } else {
                const result = await Maria.groupParticipantsUpdate(m.chat, [blockwwww], 'add')
                const status = {
                200: `✅ Added *@${blockwwww.split('@')[0]}*`,
                408: `❌ *@${blockwwww.split('@')[0]}* previously left the chat, couldn't add`,
               403: `_Couldn\'t add. Invite sent! to *@${blockwwww.split('@')[0]}*_`,
                409: `⭕ *@${blockwwww.split('@')[0]}* already a member`,
                401: `❌ *@${blockwwww.split('@')[0]}* has banned my number`
            }
            
            if (status[result[0].status]) {
                caption.push(status[result[0].status]);
            } else if (result[0].status == 403) {
			m.reply("inviting");
			console.log(action[0].jid);
			await delay(3000);
		 return await SendGroupInviteMessageToUser(action[0].jid, Maria, m.chat);
		 await delay(2000);
		 m.reply("Invited");
		}
		}
                break
                
                
```




# A utility to Update Full Profile of User's

## Installation

```
npm install @queenanya/invite
```

OR

```
yarn add @queenanya/invite
```

## Usage

```
const { updateProfilePicture } = require('@queenanya/invite');

       const quoted = m.quoted ? m.quoted : m;
            const mime = quoted.msg ? quoted.msg : quoted.mimetype ? quoted.mimetype : quoted.mediaType || '';
            if (/image/.test(mime)) {
                const media = await quoted.download();
                await updateProfilePicture(client, client.user.id, media);
```

## Example Anva V2 WA Bot Usage

```

const { updateProfilePicture } = require('@queenanya/invite');
const Config = require('../../config');
const { anya, getBuffer, fancy13, Group, announce } = require('../lib');

//༺─────────────────────────────────────༻

anya({
        name: "fullpp",
        alias: ['fullprofile', 'fullprofilepicture', 'fpp'],
        react: "🧿",
        need: "image",
        category: "owner",
        desc: "Set bot full profile picture",
        rule: 1,
        filename: __filename
     },
     async (anyaV2, pika, { prefix, command }) => {
            const quoted = pika.quoted ? pika.quoted : pika;
            const mime = quoted.msg ? quoted.msg : quoted.mimetype ? quoted.mimetype : quoted.mediaType || '';
            if (/image/.test(mime)) {
                const { key } = await pika.keyMsg(Config.message.wait);
                const media = await quoted.download();
                const botnumber = await anyaV2.decodeJid(anyaV2.user.id);
                await updateProfilePicture(anyaV2, anyaV2.user.id, media);
                pika.edit(Config.message.success, key);
            } else pika.reply(`Tag or reply an image with caption *${prefix + command}*`);
     }
)

```



## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

Feel free to contribute, open issues, and submit pull requests. If you find any bugs or have suggestions, please [create an issue](https://github.com/Teamolduser/InviteGroupMsg/issues).

For more information and updates, check out the [GitHub repository](https://github.com/Teamolduser/InviteGroupMsg) and [npm package](https://www.npmjs.com/package/@queenanya/invite).
 

 
