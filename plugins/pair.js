const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for MEGA V2 bot",
    category: "download",
    use: ".pair 2349039409985",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, args, q, senderNumber, reply }) => {
    try {
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 254700123456`");
        }

        const res = await axios.get(`https://pk-v33i.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);
        if (!res.data || !res.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = res.data.code;

        const codeMessage = `
╭─〔 *MEGA V2 PAIRING SUCCESSFUL* 〕
│
├─ *📱 Number:* ${phoneNumber}
├─ *🔗 Pairing Code:* ${pairingCode}
│
╰─ *🚀 Powered by heatless*
`.trim();

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/hbf48k.jpg` },
            caption: codeMessage,
            footer: 'Tap below to get code again for copying:',
            templateButtons: [
                {
                    index: 1,
                    quickReplyButton: {
                        displayText: "📋 Copy Code",
                        id: `.copy ${pairingCode}`
                    }
                }
            ],
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400223711119@newsletter',
                    newsletterName: 'MEGA V2 UPDATES',
                    serverMessageId: 119
                },
                externalAdReply: {
                    title: "MEGA V2 BOT",
                    body: "Auto pairing code system",
                    thumbnailUrl: `https://files.catbox.moe/3nm5ov.jpg`,
                    sourceUrl: "https://github.com/Kelvin12350/MEGA-MD v2"
                }
            }
        }, {
            quoted: {
                key: {
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast"
                },
                message: {
                    contactMessage: {
                        displayName: "MEGA V2 VERIFIED",
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:BOT;MEGA V2;;;\nFN:MEGA V2\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Bot\nEND:VCARD`
                    }
                }
            }
        });

    } catch (error) {
        console.error("❌ Pair command error:", error);
        await reply("❌ Error retrieving pairing code. Try again later.");
    }
});
                    
