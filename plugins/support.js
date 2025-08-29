const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "support",
  alias: ["supportgroup", "help", "channel"],
  desc: "Get MEGA V2 support, channel & developer contact",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => {

  const jtime = moment.tz('Africa/Nairobi').format("HH:mm:ss");
  const jdate = moment.tz('Africa/Nairobi').format("DD/MM/YY");

  // 🧾 Fake Verified Contact
  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "heatless | MEGA V2",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: heatless | MEGA V2\nORG:Heatless;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  const contextInfo = {
    externalAdReply: {
      title: "📞 PK-XMD • Support & Channel",
      body: `🕒 ${jtime} | 📅 ${jdate}`,
      thumbnailUrl: 'https://files.catbox.moe/vbnd15.jpg',
      sourceUrl: 'https://whatsapp.com/channel/0029Vb6QmBO3LdQSbKC7F145',
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    },
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "PK-XMD Official"
    }
  };

  const supportText = `*🛠️ MEGA V2 Support Center*\n\n╭─❍ *Support Links*\n│👥 Group: https://chat.whatsapp.com/CbY7YiuobJ1AlMJ8PviKpm?\n│📡 Channel: https://whatsapp.com/channel/0029Vb6QmBO3LdQSbKC7F145\n│📞 Dev: wa.me/2349039409985 (MEGA V2)\n╰───────────────╮\n\n📌 Feel free to ask for help, request features or report bugs.\n\n⏰ *Time:* ${jtime}\n📅 *Date:* ${jdate}\n\n*Powered by MEGA V2*`;

  await Void.sendMessage(m.chat, {
    text: supportText,
    contextInfo
  }, { quoted: fakeContact });
});
