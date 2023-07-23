// Note For User
// Set all settings in the file config.js including the list menu 
// for others pay to me. jas kiding
// jangan diperjualbelikan dalam keadaan masih ori hisoka. minimal tambah 5-8 command dulu

import config from "../config.js"
import Func from "../lib/function.js"

import fs from "fs"
import chalk from "chalk"
import axios from "axios"
import path from "path"
import { exec } from "child_process"
import { format } from "util"
import { fileURLToPath } from "url"
import { createRequire } from "module"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __filename = Func.__filename(import.meta.url)
const require = createRequire(import.meta.ur)

export default async function Message(hisoka, m, chatUpdate) {
    try {
        if (!m) return
        if (!config.options.public && !m.isOwner) return
        if (m.from && db.groups[m.from]?.mute && !m.isOwner) return
        if (m.isBaileys) return

        (await import("../lib/loadDatabase.js")).default(m)

        const prefix = m.prefix
        const isCmd = m.body.startsWith(prefix)
        const command = isCmd ? m.command : ""
        const quoted = m.isQuoted ? m.quoted : m

        // LOG Chat
        if (m.message && !m.isBaileys) {
            console.log(chalk.black(chalk.bgWhite("- FROM")), chalk.black(chalk.bgGreen(m.pushName)), chalk.black(chalk.yellow(m.sender)) + "\n" + chalk.black(chalk.bgWhite("- IN")), chalk.black(chalk.bgGreen(m.isGroup ? m.metadata.subject : "Private Chat", m.from)) + "\n" + chalk.black(chalk.bgWhite("- MESSAGE")), chalk.black(chalk.bgGreen(m.body || m.type)))
        }

        switch (command) {
            
/* Umm, maybe for main menu  */
            case "menu": case "help": {
                let text = `Hi @${m.sender.split`@`[0]}, This is a list of available commands\n\n`

                Object.entries(config.menu).map(([type, command]) => {
                    text += `┌──⭓ *${Func.toUpper(type)} Menu*\n`
                    text += `│\n`
                    text += `│⎚ ${command.map(a => `${prefix + a}`).join("\n│⎚ ")}\n`
                    text += `│\n`
                    text += `└───────⭓\n\n`
                }).join('\n\n')

                return hisoka.sendMessage(m.from, {
                    text, contextInfo: {
                        mentionedJid: hisoka.parseMention(text),
                        externalAdReply: {
                            title: hisoka?.user?.name,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnail: fs.readFileSync("./temp/hisoka.jpg"),
                            sourceUrl: config.Exif.packWebsite
                        }
                    }
                }, { quoted: m })
            }
            break
            case "speed": {
                const { promisify } = (await import("util"))
                const cp = (await import("child_process")).default
                let execute = promisify(exec).bind(cp)
                m.reply("Testing Speed...")
                let o
                try {
                    o = exec(`speedtest --accept-license`) // install speedtest-cli
                } catch (e) {
                    o = e
                } finally {
                    let { stdout, stderr } = o
                    if (stdout) return m.reply(stdout)
                    if (stderr) return m.reply(stderr)
                }
            }
            break
            case "owner": {
                hisoka.sendContact(m.from, config.options.owner, m)
            }
            break
            case "sc": {
                m.reply("https://github.com/DikaArdnt/Hisoka-Morou")
            }
            break
            case "ping": {
                const moment = (await import("moment-timezone")).default
                const calculatePing = function (timestamp, now) {
                    return moment.duration(now - moment(timestamp * 1000)).asSeconds();
                }
                m.reply(`*Ping :* *_${calculatePing(m.timestamp, Date.now())} second(s)_*`)
            }
            break
            case "quoted": case "q": {
                const { Serialize } = (await import("../lib/serialize.js"))
                if (!m.isQuoted) m.reply("quoted")
                try {
                    const message = await Serialize(hisoka, (await hisoka.loadMessage(m.from, m.quoted.id)))
                    if (!message.isQuoted) return m.reply("Quoted Not Found 🙄")
                    hisoka.sendMessage(m.from, { forward: message })
                } catch {
                    m.reply("Quoted Not Found 🙄")
                }
            }
            break

/* Umm, maybe for owner menu  */
            case "public": {
                if (!m.isOwner) return m.reply("owner")
                if (config.options.public) {
                    config.options.public = false
                    m.reply('Switch Bot To Self Mode')
                } else {
                    config.options.public = true
                    m.reply('Switch Bot To Public Mode')
                }
            }
            break
            case "mute": {
                if (!m.isOwner) return m.reply("owner")
                let db = global.db.groups[m.from]
                if (db.mute) {
                    db.mute = false
                    m.reply("Succes Unmute This Group")
                } else if (!db.mute) {
                    db.mute = true
                    m.reply("Succes Mute This Group")
                }
            }
            break

/* Umm, maybe for convert menu  */
            case "sticker": case "s": case "stiker": {
                if (/image|video|webp/i.test(quoted.mime)) {
                    m.reply("wait")
                    const buffer = await quoted.download()
                    if (quoted?.msg?.seconds > 10) return m.reply(`Max video 9 second`)
                    let exif
                    if (m.text) {
                        let [packname, author] = m.text.split("|")
                        exif = { packName: packname ? packname : "", packPublish: author ? author : "" }
                    } else {
                        exif = { ...config.Exif }
                    }
                    m.reply(buffer, { asSticker: true, ...exif })
                } else if (m.mentions[0]) {
                    m.reply("wait")
                    let url = await hisoka.profilePictureUrl(m.mentions[0], "image");
                    m.reply(url, { asSticker: true, ...config.Exif })
                } else if (/(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm|gif))/i.test(m.text)) {
                    m.reply("wait")
                    m.reply(Func.isUrl(m.text)[0], { asSticker: true, ...config.Exif })
                } else {
                    m.reply(`Method Not Support`)
                }
            }
            break

/* Umm, maybe for group menu  */
            case "hidetag": case "ht": {
                if (!m.isGroup) return m.reply("group")
                if (!m.isAdmin) return m.reply("admin")
                let mentions = m.metadata.participants.map(a => a.id)
                let mod = await hisoka.cMod(m.from, quoted, /hidetag|tag|ht|h|totag/i.test(quoted.body.toLowerCase()) ? quoted.body.toLowerCase().replace(prefix + command, "") : quoted.body)
                hisoka.sendMessage(m.from, { forward: mod, mentions })
            }
            break
            case "add": case "+": {
                if (!m.isGroup) return m.reply("group")
                if (!m.isAdmin) return m.reply("admin")
                if (!m.isBotAdmin) return m.reply("botAdmin")
                let users = m.mentions.length !== 0 ? m.mentions.slice(0, 2) : m.isQuoted ? [m.quoted.sender] : m.text.split(",").map(v => v.replace(/[^0-9]/g, '') + "@s.whatsapp.net").slice(0, 2)
                if (users.length == 0) return m.reply('Fuck You 🖕')
                await hisoka.groupParticipantsUpdate(m.from, users, "add")
                .then((res) => {
                    for (let i of res) {
                        if (i.status == 403) return m.reply(`Unable to add @${i.jid.split`@`[0]}, may be privacy`)
                        else if (i.status == 409) return m.reply(`@${i.jid?.split('@')[0]} already in this group`)
                        else m.reply(Func.format(i))
                    }
                })
            }
            break

/* Umm, maybe for tool menu  */
            case "fetch": case "get": {
                if (!/https:\/\//i.test(m.text)) return m.reply(`No Query?\n\nExample : ${prefix + command} https://api.xfarr.com`)
                m.reply("wait")
                const res = await axios.get(Func.isUrl(m.text)[0])
                if (!/text|json/.test(res?.headers?.get("content-type"))) {
                    let a = await Func.fetchBuffer(Func.isUrl(m.text)[0])
                    return m.reply(a.data, { fileName: a.name, mimetype: a.mime })
                }
                let text = res?.data
                try {
                    m.reply(format(text))
                } catch (e) {
                    m.reply(format(e))
                }
            }
            break

/* Umm, maybe for download menu  */
            // buy key api.xfarr.com on https://api.xfarr.com/pricing
            
            case "tiktok": case "tt": {
                if (!/https?:\/\/(www\.|v(t|m|vt)\.|t\.)?tiktok\.com/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/tiktoknowm", { url: Func.isUrl(m.text)[0] }, "Key")
                if (req.status !== 200) return m.reply("error")
                if (/music/g.test(req.result.url)) {
                    req = await (await api("xfarr")).get("/api/download/tiktokslide", { url: Func.isUrl(m.text)[0] }, "Key")
                    if (req.status !== 200) return m.reply("error")
                    for (let url of req.result.url) {
                        m.reply(url)
                        await Func.sleep(5000) // delay 5 seconds
                    }
                } else m.reply(req.result.url, { caption: `${req.result.author}\n\n${req.result.description}` })
            }
            break
            case "instagram": case "ig": case "igdl": {
                if (!/https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://www.instagram.com/p/CITVsRYnE9h/`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/instagram", { url: Func.isUrl(m.text)[0] }, "Key")
                if (req.status !== 200) return m.reply("error")
                for (let url of req.result.media) {
                    m.reply(url, { caption: req?.result?.caption })
                }
            }
            break

/* Umm, maybe for non command */
            default:
                // ini eval ya dek
                if ([">", "eval"].some(a => m.body?.toLowerCase()?.startsWith(a))) {
                    if (!m.isOwner) return m.reply("owner")
                    let evalCmd = ""
                    try {
                        evalCmd = /await/i.test(m.text) ? eval("(async() => { " + m.text + " })()") : eval(m.text)
                    } catch (e) {
                        evalCmd = e
                    }
                    new Promise(async (resolve, reject) => {
                        try {
                            resolve(evalCmd);
                        } catch (err) {
                            reject(err)
                        }
                    })
                        ?.then((res) => m.reply(format(res)))
                        ?.catch((err) => m.reply(format(err)))
                }

                // nah ini baru exec dek
                if (["$"].some(a => m.body?.toLowerCase()?.startsWith(a))) {
                    if (!m.isOwner) return m.reply("owner")
                    try {
                        exec(m.text, async (err, stdout) => {
                            if (err) return m.reply(Func.format(err))
                            if (stdout) return m.reply(Func.format(stdout))
                        })
                    } catch (e) {
                        m.reply(Func.format(e))
                    }
                }
        }
    } catch (e) {
        m.reply(format(e))
    }
}