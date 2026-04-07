const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState("auth")

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0]
        if (!m.message) return

        const text = m.message.conversation || m.message.extendedTextMessage?.text

        if (text === ".ping") {
            await sock.sendMessage(m.key.remoteJid, { text: "pong 🏓" })
        }
    })
}

start()
