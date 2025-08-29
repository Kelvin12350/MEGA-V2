const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "uptime",
  alias: ["up"],
  desc: "Check how long the bot has been online.",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => {
  const runtime = () => {
    let seconds = process.uptime();
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "heatless | MEGA V2",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:MEGA| MEGA V2\nORG:MEGA V2;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  const uptimeText = `*🤖 MEGA V2 Bot Uptime:*\n🕒 ${runtime()}\n\n💡 The bot has been running without interruption.`;

  await Void.sendMessage(m.chat, {
    text: uptimeText,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363400223711119@newsletter",
        newsletterName: "MEGA V2 Official"
      },
      externalAdReply: {
        title: "MEGA V2",
        body: "Uptime Monitor by PKDRILLER",
        thumbnailUrl: "https://files.catbox.moe/khk52l.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://github.com/Kelvin12350/MEGA v2"
      }
    }
  }, { quoted: fakeContact });
});
