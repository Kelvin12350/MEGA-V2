const { cmd } = require('../command');
const moment = require('moment-timezone');
const { runtime } = require('../lib/functions');

cmd({
  pattern: "alive",
  alias: ["status", "botstatus"],
  desc: "Show bot status information",
  category: "system",
  react: "⚡",
  filename: __filename
}, async (Void, mek, m) => {
  try {
    const time = moment.tz('Africa/Nairobi').format('HH:mm:ss');
    const date = moment.tz('Africa/Nairobi').format('DD/MM/YYYY');
    const uptime = runtime(process.uptime());

    // Simple and clean status message
    const message = `
⚡ *MEGA V2 BOT STATUS* ⚡

🌍 Server Time: ${time}
📅 Date: ${date}
⏱️ Uptime: ${uptime}

🔧 Powered by Pkdriller
`.trim();

    // Newsletter context info
    const contextInfo = {
      externalAdReply: {
        title: "MEGA V2 • BOT STATUS",
        body: `Online since ${uptime}`,
        thumbnailUrl: 'https://files.catbox.moe/hbf48k.jpg',
        sourceUrl: 'https://github.com/Kelvin12350/MEGA-v2',
        mediaType: 1,
        renderLargerThumbnail: true
      },
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363400223711119@newsletter",
        newsletterName: "MEGA V2 Official",
        serverMessageId: 789
      }
    };

    await Void.sendMessage(
      m.chat, 
      {
        text: message,
        contextInfo: contextInfo
      },
      { 
        quoted: mek 
      }
    );

  } catch (error) {
    console.error('Alive command error:', error);
    await Void.sendMessage(
      m.chat, 
      { 
        text: '⚠️ Error showing status. Bot is still running!' 
      },
      { 
        quoted: mek 
      }
    );
  }
});
