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
const require = createRequire(import.meta.url)

export default async function Message(hisoka, m, chatUpdate) {
    try {
        if (!m) return
        if (!config.options.public && !m.isOwner) return
        if (m.from && db.groups[m.from]?.mute && !m.isOwner) return
        if (m.isBaileys) return

        (await import("../lib/loadDatabase.js")).default(m)

        const prefix = m.prefix
        const isCmd = m.body.startsWith(prefix)
        const command = isCmd ? m.command.toLowerCase() : ""
        const quoted = m.isQuoted ? m.quoted : m

        // LOG Chat
        if (m.message && !m.isBaileys) {
            console.log(chalk.black(chalk.bgWhite("- FROM")), chalk.black(chalk.bgGreen(m.pushName)), chalk.black(chalk.yellow(m.sender)) + "\n" + chalk.black(chalk.bgWhite("- IN")), chalk.black(chalk.bgGreen(m.isGroup ? m.metadata.subject : "Private Chat", m.from)) + "\n" + chalk.black(chalk.bgWhite("- MESSAGE")), chalk.black(chalk.bgGreen(m.body || m.type)))
        }

        switch (command) {
            
/* Umm, maybe for main menu  */
            case "menu": case "help": {
                let text = `Hi @${m.sender.split`@`[0]}, This is a list of available commands\n\n*Total Command :* ${Object.values(config.menu).map(a => a.length).reduce((total, num) => total + num, 0)}`

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
            case "toimg": case "toimage": {
                if (!/webp/i.test(quoted.mime)) return m.reply(`Reply Sticker with command ${prefix + command}`)
                if (quoted.isAnimated) return
                let media = await quoted.download()
                await m.reply(media, { mimetype: "image/png" })
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
            case "welcome": {
                if (!m.isAdmin) return m.reply("admin")
                let db = global.db.groups[m.from]
                if (db.welcome) {
                    db.welcome = false
                    m.reply("Succes Deactive Welcome on This Group")
                } else if (!db.welcome) {
                    db.welcome = true
                    m.reply("Succes Activated Welcome on This Group")
                }
            }
            break
            case "leaving": {
                if (!m.isAdmin) return m.reply("admin")
                let db = global.db.groups[m.from]
                if (db.leave) {
                    db.leave = false
                    m.reply("Succes Deactive Leaving on This Group")
                } else if (!db.leave) {
                    db.leave = true
                    m.reply("Succes Activated Leaving on This Group")
                }
            }
            break

/* Umm, maybe for tool menu  */
            case "fetch": case "get": {
                if (!/^https:\/\//i.test(m.text)) return m.reply(`No Query?\n\nExample : ${prefix + command} https://api.xfarr.com`)
                m.reply("wait")
                let mime = (await import("mime-types"))
                let url = new URL(m.text)
                const res = await axios.get(url.href, { responseType: "arraybuffer" })
                if (!/utf-8|json/.test(res?.headers?.get("content-type"))) {
                    let fileName = /filename/i.test(res.headers?.get("content-disposition")) ? res.headers?.get("content-disposition")?.match(/filename=(.*)/)?.[1]?.replace(/["';]/g, '') : ''
                    return m.reply(res.data, { fileName, mimetype: mime.lookup(fileName) })
                }
                let text = res?.data?.toString() || res?.data
                text = format(text)
                try {
                    m.reply(text.slice(0, 65536) + '')
                } catch (e) {
                    m.reply(format(e))
                }
            }
            break
            case "ss": case "ssweb": {
                if (!Func.isUrl(m.text)) return m.reply(`Example : ${prefix + command} https://github.com/DikaArdnt`)
                await m.reply("wait")
                if (/phone/i.test(m.text)) {
                    let req = await (await api("xfarr")).get("/api/tools/ssphone", { url: Func.isUrl(m.text)[0] }, "apikey", { responseType: "arraybuffer" })
                    if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                    await m.reply(req)
                } else if (/tablet/i.test(m.text)) {
                    let req = await (await api("xfarr")).get("/api/tools/sstablet", { url: Func.isUrl(m.text)[0] }, "apikey", { responseType: "arraybuffer" })
                    if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                    await m.reply(req)
                } else {
                    let req = await (await api("xfarr")).get("/api/tools/ssdesktop", { url: Func.isUrl(m.text)[0] }, "apikey", { responseType: "arraybuffer" })
                    if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                    await m.reply(req)
                }
            }
            break
            // view once so easy bro 🤣
            case "rvo": {
                if (!quoted.msg.viewOnce) return m.reply(`Reply view once with command ${prefix + command}`)
                quoted.msg.viewOnce = false
                await hisoka.sendMessage(m.from, { forward: quoted }, { quoted: m })
            }
            break
            case "blackbox": case "aicode": {
                if (!m.text) return m.reply(`Example : ${m.prefix + m.command} create code html & css for hack NASA`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/ai/blackbox", { chat: m.text }, "apikey")
                if (req.status !== 200) return m.reply(req.message)
                await m.reply(req.result)
            }
            break
            case "ai": case "chatgpt": case "openai": {
                if (!m.text) return m.reply(`Example : ${m.prefix + m.command} create code html & css for hack NASA`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/ai/chatgpt", { chat: m.text }, "apikey")
                if (req.status !== 200) return m.reply(req.message)
                await m.reply(req.result)
            }
            break

/* Umm, maybe for download menu  */
            // buy key api.xfarr.com on https://api.xfarr.com/pricing
            
            case "tiktok": case "tt": {
                if (!/https?:\/\/(www\.|v(t|m|vt)\.|t\.)?tiktok\.com/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/tiktoknowm", { url: Func.isUrl(m.text)[0] }, "apikey")
                if (req.status !== 200) return m.reply(req.message)
                if (/music/g.test(req.result.url)) {
                    req = await (await api("xfarr")).get("/api/download/tiktokslide", { url: Func.isUrl(m.text)[0] }, "apikey")
                    if (req.status !== 200) return m.reply(req?.message || "error")
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
                let req = await (await api("xfarr")).get("/api/download/instagram", { url: Func.isUrl(m.text)[0] }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                for (let url of req.result.media) {
                    m.reply(url, { caption: req?.result?.caption })
                }
            }
            break
            case "facebook": case "fb": case "fbdl": {
                if (!/https?:\/\/(fb\.watch|(www\.|web\.|m\.)?facebook\.com)/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://www.facebook.com/watch/?v=2018727118289093`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/facebook", { url: Func.isUrl(m.text)[0] }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req?.result?.url?.hd || req?.result?.url?.sd, { caption: req?.result?.title })
            }
            break
            case "drive": case "gdrive": {
                if (!/https:\/\/drive\.google\.com\/file\/d\/(.*?)\//i.test(m.text)) return m.reply(`Example : ${prefix + command} https://drive.google.com/file/d/0B_WlBmfJ3KOfdlNyVWwzVzQ1QTQ/view?resourcekey=0-P3IayYTmxJ5d8vSlf-CpUA`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/gdrive", { url: Func.isUrl(m.text)[0] }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req?.result?.url, { fileName: req?.result?.name, mimetype: req?.result?.mimetype })
            }
            break
            case "imgur": {
                if (!/https:\/\/imgur\.com\/gallery\//i.test(m.text)) return m.reply(`Example : ${prefix + command} https://imgur.com/gallery/ksnRO`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/imgur", { url: Func.isUrl(m.text)[0] }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req?.result?.video || req?.result?.image)
            }
            break
            case "mediafire": {
                if (!/https?:\/\/(www\.)?mediafire\.com\/(file|download)/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://www.mediafire.com/file/96mscj81p92na3r/images+(35).jpeg/file`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/mediafire", { url: Func.isUrl(m.text)[0] }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req?.result?.link, { fileName: a?.result?.name, mimetype: a?.result?.mime })
            }
            break
            case "pinterest": {
                if (!m.text) return m.reply(`Example :\n\n1. ${prefix + command} Hisoka\n2. ${prefix + command} https://id.pinterest.com/pin/936748791217202640`)
                await m.reply("wait")
                if (/(?:https?:\/\/)?(?:id\.)?(?:pinterest\.com|pin\.it)\/\W*/i.test(m.text)) {
                    let req = await (await api("xfarr")).get("/api/download/pinterest", { url: Func.isUrl(m.text)[0] }, "apikey")
                    if (req.status !== 200) return m.reply(req?.message || "error")
                    await m.reply(req?.result?.[0]?.url)
                } else {
                    let req = await (await api("xfarr")).get("/api/search/pinterest", { query: m.text }, "apikey")
                    if (req.status !== 200) return m.reply(req?.message || "error")
                    let res = req.result[Math.floor(Math.random() * req.result.length)]
                    await m.reply(res.image, { caption: res.caption })
                }
            }
            break
            case "twitter": {
                if (!/https?:\/\/(www\.)?(twitter|X)\.com\/.*\/status/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://twitter.com/CJDLuffy/status/1683219386595721216?t=EN1LZTURgFYexHISfC3keg&s=19`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/twittervideo", { url: Func.isUrl(m.text)[0] }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req?.result?.url[0], { caption: req.result.caption })
            }
            break
            case "ytv": {
                if (!/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?(?:music\.)?youtube\.com\/(?:watch|v|embed|shorts))/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://youtu.be/_EYbfKMTpRs`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/ytvideo", { url: Func.isUrl(m.text) }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req.result.result[0].download, { fileName: req.result.title + ".mp4", mimetype: "video/mp4" })
            }
            break
            case "yta": {
                if (!/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?(?:music\.)?youtube\.com\/(?:watch|v|embed|shorts))/i.test(m.text)) return m.reply(`Example : ${prefix + command} https://youtu.be/_EYbfKMTpRs`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/download/ytaudio", { url: Func.isUrl(m.text) }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req.result.result[0].download, { fileName: req.result.title + ".mp3", mimetype: "audio/mpeg" })
            }
            break

/* Umm, maybe for education menu */
            case "wiki": case "wikipedia": {
                if (!m.text) return m.reply(`Example : ${prefix + command} Jokowi`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/education/wikipedia", { query: m.text }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req.result?.[0]?.thumb, { caption: req.result?.[0]?.wiki })
            }
            break

/* Umm, maybe for search menu */
            case "chord": {
                if (!m.text) return m.reply(`Example : ${prefix + command} black rover`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/search/chord", { query: m.text }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(`${req.result.title}\n\n${req.result.chord}`)
            }
            break
            case "lirik": case "lyric": {
                if (!m.text) return m.reply(`Example : ${prefix + command} black rover`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/search/lirik", { query: m.text }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(`${req.result.song}\n\n${req.result.lirik}`)
            }
            break

/* Umm, maybe for islami menu */
            case "quran": {
                if (!Number(m.text)) {
                    let text = `Example : ${prefix + command} 1\n\n#note\n1 = Al-Fatihah\n\n`
                    let a = await (await api("xfarr")).get("/api/islami/listsurah", {}, "apikey")
                    if (a.status == 200) text += a.result.map((r) => `*${r.nomor}.* ${r.nama} (${r.nama_latin}))`).join("------\n\n")
                    return m.reply(text)
                }
                await m.reply("wait")
                let a = await (await api("xfarr")).get("/api/islami/surah", { nomor: Number(m.text) }, "apikey")
                let b = await (await api("xfarr")).get("/api/islami/ayat", { nomor: Number(m.text) }, "apikey")
                if (a.status !== 200) return m.reply("error")
                let text = `
${a.result.nama} (${a.result.arti})

*Ayat :* ${a.result.jumlah_ayat}
*Turun :* ${a.result.tempat_turun}

${a.result.deskripsi}

${b.result.map((r) => `*${r.nomor}.*\n${r.arab}\n\n${r.latin}\n${r.indonesia}`).join("-------\n\n")}
                `
                let msg = await m.reply(text)
                await hisoka.sendMedia(m.from, `${config.APIs.xfarr.baseURL}/api/islami/surahaudio?apikey=${config.APIs.xfarr.Key}&nomor=${Number(m.text)}`, msg, { mimetype: "audio/mpeg" })
            }
            break
            case "nabi": case "kisahnabi": {
                if (!m.text) return m.reply(`Example : ${prefix + command} muhammad`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get("/api/islami/kisahnabi", { nabi: m.text.toLowerCase() }, "apikey")
                if (req.status !== 200) return m.reply(req?.message || "error")
                if (req.result.length == 0) return m.reply("notFound")
                req = req.result[Math.floor(Math.random() * req.result.length)]
                await m.reply(req?.image_url, { caption: `${req.nabi} (${req.thn_kelahiran})\n\n${req.description}` })
            }
            break

/* Umm, maybe for textpro command */
            case "1977": case "abstrgold": case "advancedglow": case "americanflag": case "arcanetvseries": case "artpapercut": case "bagel": case "beach": case "berry": case "biscuit": case "blackandwhitebearmascot": case "blackpink": case "blackpink": case "blackpinkdecoratedwithroses": case "bloodfrostedglass": case "bluecircuit": case "bluefoilballoon": case "blueglass": case "bluesparklingjewelry": case "bokeh": case "box": case "bread": case "breakwall": case "brokenglass": case "businesssign": case "captainamerica": case "carvedstone": case "chocolatecake": case "chrismastgift": case "christmasbyname": case "christmascandycane": case "christmasholidaysnow": case "christmastree": case "cloud": case "cloudsky": case "colorfullluxurymetal": case "colorleddisplayscreen": case "countryflaggenerator": case "creatglossymetalic": case "creativegolden": case "cyanfoilballoon": case "cyanglass": case "cyanjewelry": case "cyansparklingjewelry": case "decorategreen": case "decoratepurple": case "decorativeglass": case "deepsemetal": case "deluxegold": case "deluxesilver": case "denim": case "doubleexposureblackwhite": case "dropwater": case "elegantwhitegold": case "embossedoncrackedsurface": case "fabric": case "fireworksparkle": case "foilballoonbirthday": case "fruitjuice": case "fullcolorballoon": case "futuristictechnologyneonlight": case "giraffe": case "glass": case "glossybluemetal": case "glossycarbon": case "glossymetal": case "glowingneonlight": case "glue": case "goldenancient": case "goldenonredsparkles": case "goldfoilballoon": case "goldsparklingjewelry": case "gradient": case "gradientgenerator": case "gradientneonlight": case "graffitiwall": case "greenfoilballoon": case "greenglass": case "greenhorror": case "greenjewelry": case "greenneon": case "greensparklingjewelry": case "halloweenfire": case "halloweenskeleton": case "happnewyearcardfireworkgif": case "happynewyeargreetingcard": case "harrypotter": case "holographic": case "honey": case "horrorblood": case "horrorgift": case "icecold": case "impressiveglitch": case "joker": case "koifish": case "lava": case "lightglowsliced": case "luxurygold": case "luxurymetallic": case "magmhot": case "makebatman": case "marble": case "marbleslabs": case "matrix": case "metaldarkgold": case "metaldarkgold": case "metallic": case "metalpurpledual": case "metalrainbow": case "minion": case "multicolorpapercut": case "naturalleaves": case "neon": case "neon": case "neondevilwings": case "neonlight": case "neonlight": case "neonlightblackpink": case "neonlightglitchgenerator": case "neonlightonbrickwall": case "neonlightwithgalaxy": case "newyearcardsbyname": case "orangeglass": case "orangejewelry": case "orangejuice": case "peridotstone": case "pinkfoilballoon": case "pinksparklingjewelry": case "plasticbagdrug": case "pottery": case "purplefoilballoon": case "purplegem": case "purpleglass": case "purpleglass": case "purplejewelry": case "purpleshinyglass": case "purplesparklingjewelry": case "quicksparklingdiamonds": case "rainbowcolorcalligraphy": case "rainbowequalizer": case "redfoilballoon": case "redglass": case "redjewelry": case "redsparklingjewelry": case "roadwarning": case "robotr2d2": case "rock": case "rustedmetal": case "rustymetal": case "sandengraved": case "sandwriting": case "sciencefiction": case "scifi": case "scifi": case "shinymetal": case "silverjewelry": case "skeleton": case "sketch": case "snowwinterholidays": case "space": case "sparklesmerrychristmas": case "steel": case "stone": case "stonecracked": case "strawberry": case "summerneonlight": case "summerwithpalmtree": case "summerysandwriting": case "thunder": case "thundergenerator": case "toxic": case "transmer": case "typography": case "ultragloss": case "underwatergenerator": case "watercolor": case "waterpipe": case "wicker": case "wonderfulgraffitiart": case "wood": case "writeinsandsummerbeach": case "writeonfoggywindow": case "xmascards": case "yellowglass": case "yellowjewelry": {
                if (!m.text) return m.reply(`Example : ${prefix + command} Dika Ardnt.`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get(`/api/textpro/${command}`, { text: m.text }, "apikey", { responseType: "arraybuffer" })
                if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req)
            }
            break
            case "avengers": case "captainameric": case "cinematichorror": case "glitch": case "glitchtiktok": case "layered": case "lionmascot": case "marvelstudios": case "marvelstudiosvermetal": case "metal": case "metalgalaxy": case "metalgold": case "metalrosegold": case "metalsilver": case "ninja": case "pornhubgenerator": case "retro": case "space": case "spookyhalloween": case "steel": case "stone": case "thor": case "videogameclassicbit": case "vintagelightbulb": case "wallgraffiti": case "wolfblackwhite": case "wolfgalaxy": {
                let [text1, text2] = m.text.split("|")
                if (!text2) return m.reply(`Example ${prefix + command} Dika|Ardnt.`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get(`/api/textpro/${command}`, { text1, text2 }, "apikey", { responseType: "arraybuffer" })
                if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req)
            }
            break

/* Umm, maybe for ephoto command */
            case "1917": case "3dhologram": case "3dtexteffect": case "3dtextstyle": case "3dcrack": case "3dcubictext": case "3dgradient": case "3dgradient2": case "3dsand": case "3dshinymetallic": case "3dwoodenlogo": case "3dwoodentext": case "3dchristmas": case "3dbeach": case "3dpapercut": case "3dunderwater": case "aovwallpaper2": case "aovwallpaper3": case "aovwallpaper4": case "aovwallpapers": case "advancedglow": case "americanflag": case "amongus": case "angelwing": case "announcementofwinning": case "aovarena": case "aovbanner": case "avatar3q360": case "avatardota": case "avatarlol": case "avatarlol2": case "blackpink": case "balloontext": case "bannerlol": case "battlefield": case "beautifulgold": case "birthdaycake": case "birthdaycake2": case "birthdaycake3": case "birthdaycake3": case "birthdaycake4": case "blackpinklogo": case "blackpinkneon": case "bloodtext": case "bloodwritingtext": case "bokehtext": case "borderproject": case "csgo": case "csgocover": case "caketext2": case "caketext": case "candytext": case "capercut": case "cardshalloween": case "chocolate": case "christmasball": case "christmasnewyear2": case "christmaseffect": case "christmasnewyear": case "christmasseason": case "christmassnow": case "christmasvideo": case "chrometext": case "cloudtext": case "coffee": case "colortext": case "colorfulglowing": case "colorfultext": case "covergraffiti": case "createwater": case "createtext": case "crossfire": case "crossfirecover": case "cyberhunter": case "dance": case "darkgreentypography": case "diamondtext": case "dota2cover": case "doubleexposure": case "dragonball": case "dragonsteel": case "embroider": case "fabrictext": case "firetext": case "firework": case "firework": case "flamelettering": case "foggyrainy": case "freefire": case "freefireavatar": case "freefirefb": case "funnyminion": case "galaxy": case "galaxytext": case "gemstone": case "generalexamcrank": case "glittergold": case "glossychrome": case "goldbutton": case "goldpurple": case "goldtext": case "goldtext2": case "goldtextgenerators": case "goldtext3": case "graffititext": case "graffititext5": case "graffiticolor": case "graffitilettering": case "greenbrush": case "greenneon": case "halloween": case "halloweenbatstext": case "halloweenfire": case "halloweenvideo": case "heart": case "heartcup": case "hollywoodwalk": case "horrorcemeterygate": case "icetext": case "joker": case "jeanfabric": case "jewel": case "lok(aov)": case "lolpentakill": case "leagueofangels": case "leagueofking": case "leagueofkings": case "ligaturesfromleaves": case "lighteffects": case "lol": case "logoastronaut": case "lolavatar": case "lolbanner": case "lolcover": case "lolfb": case "lolwp": case "lolwp2": case "lovecard": case "luxurylogo": case "magictext": case "matrixtext": case "merrychristmas": case "metal": case "metalavatar": case "metalmascots": case "metalblue": case "metallogo": case "metalstartext": case "metaltext": case "metallic": case "milkcaketext": case "minimallogo": case "mobilelegendswallpaper": case "moderngold": case "moderngoldred": case "moderngoldsilver": case "moderngold3": case "moderngold4": case "moderngold5": case "musicequalizer": case "nationalflag": case "neonlight": case "neontext": case "neontext3": case "neontextlight": case "neondevilwings": case "newyear": case "nigeriaflag": case "noel": case "onepiece": case "overwatchcover": case "overwatchwallpaper": case "overwatchhero": case "pubgbirthday": case "pubglogo2": case "pubglogo3": case "pubgchar": case "pubgcover": case "pubgfb": case "pubgglitch": case "pubglogo": case "pubgteam": case "paintsplatter": case "party": case "plasmatexteffects": case "purpletext": case "retrotext": case "roadpaint": case "royaltext": case "santaclaus": case "shadowtext": case "snake": case "snowontext": case "starwars": case "starsnight": case "starsnight2": case "summerbeach2": case "sunlightshadow": case "teamlogo": case "teamfighttactics": case "textgalaxy": case "textgraffiti3d": case "texthalloween": case "texthalloween2": case "textheartflashlight": case "textlight": case "textcake": case "textchristmas": case "textmetal": case "textoncloth": case "thundertext": case "typography": case "underwatertext": case "valentinesday": case "warface": case "water3dtext": case "watertext": case "wingsgalaxy": case "wingstext": case "wooden3d": case "writegalaxy": case "writegalaxy2": case "writegoldletters": case "writingblackboard": case "yasuologo": case "zodiac": case "zombie3d": case "angelwings": case "animationsbear": case "anonymoushacker": case "avataraov": case "avatarrov": case "avatargold": case "balloon": case "bear": case "birthdaycake3": case "birthdaycards": case "birthdayfoilballoon": case "brokenglass": case "cakes": case "cartoongraffiti": case "chalkontheblackboard": case "chocolate2": case "cloudsinthesky": case "colorfulangel": case "covercf": case "coverlol": case "deleting": case "digitalglitch": case "digitaltiger": case "facebook": case "foggyglass": case "football": case "galaxylogo": case "gaminglogo": case "gaminglogofps": case "girlgamer": case "glass": case "glowingtext": case "goldletters": case "graffitiletters": case "happywomensday": case "horrorletters": case "horrortext": case "impressiveleaves": case "inthesky": case "incandescentbulbs": case "leafautumn": case "lettersontheleaves": case "lightgalaxy": case "lightsignatures": case "logointro": case "logoteam": case "lolavatar2": case "luxurygold": case "mascotlogo": case "maskotteamlogo": case "mechanical": case "metalborder": case "metalliceffect": case "namesonthesand": case "nature": case "neonglitch": case "neonblue": case "neonlogo": case "newyearvideo": case "papercut": case "pavement": case "personalizedqueen": case "pig": case "pixelglitch": case "puppycute": case "realisticcloud": case "realisticembroidery": case "rotationlogo": case "ruby​​stone": case "signatureattachment": case "silvertext": case "snow3d": case "summerbeach": case "summerysand": case "sweetlove": case "tattoosignature": case "tattoos": case "technology": case "texteffectsnight": case "tmaker": case "vibrantfireworks": case "vintagetelevision": case "wallpapermobile": case "warningsign": case "watercolor": case "womensday": case "wordgreenflares": case "wordgreenlight": case "zodiacwallpaper": {
                if (!m.text) return m.reply(`Example : ${prefix + command} Dika Ardnt.`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get(`/api/ephoto360/${command}`, { text: m.text }, "apikey", { responseType: "arraybuffer" })
                if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req)
            }
            break
            case "3dstone": case "3dlightbulb": case "3dwood": case "amongusbanner": case "apexlegend": case "barcashirt": case "callofduty": case "captainamerica": case "companylogo": case "companylogo2": case "floralluxury": case "footballlogo": case "glitter": case "juventusshirt": case "latestspace3d": case "letters": case "logo3dmetal": case "lolytbanner": case "lovelyfloral": case "marvels": case "metalliccover": case "neontext2": case "overwatchavatar": case "overwatchytbanner": case "pubglogo": case "pubgytbanner": case "polygonlogo": case "pornhub": case "premierleaguecup": case "quotesimages": case "shirtrealmadrid": case "steeltext": case "tiktok": case "writestatus": case "balloonslove": case "banneraov": case "blackandwhite": case "classlogo": case "footballshirtmessi": case "girlgraffiti": case "gradientlogo": case "graffitithewall": case "impressiveanime": case "letterlogos": case "logoavengers": case "logowolf": case "logoaccording": case "logogaming": case "logomascot": case "loveballoons": case "metallicglass": case "pencilsketch": case "shirtfootball": case "steellettering": {
                let [text1, text2] = m.text.split("|")
                if (!text2) return m.reply(`Example ${prefix + command} Dika|Ardnt.`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get(`/api/textpro/${command}`, { text1, text2 }, "apikey", { responseType: "arraybuffer" })
                if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req)
            }
            break

/* Umm, maybe for photooxy command */
            case "3dglowing": case "3dnature": case "3drainbow": case "3dsummer": case "3dwoodblack": case "between": case "birthdaycake": case "blackpink": case "burnpaper": case "butterfly": case "candy": case "carvedwood": case "coffeecup": case "coffeecup2": case "crisp": case "crossfire": case "csgo": case "cup": case "cupsmile": case "fabric": case "flaming": case "flowerheart": case "flowertypography": case "fur": case "glowrainbow": case "gradient": case "graffiti": case "greenleaves": case "harrypotter": case "hellokitty": case "leaves": case "lovepicture": case "lovetext": case "luxury": case "metallicglow": case "modernmetal": case "multimaterial": case "naruto": case "naturetypography": case "neondarkmetal": case "neonglow": case "neonmetallic": case "nightsky": case "partyneon": case "poly": case "raindrops": case "rainbowshine": case "romanticlove": case "scary": case "shadowtext": case "silk": case "skriking3d": case "smoke": case "smoketypography": case "sweetcandy": case "underfall": case "underflower": case "undergrass": case "undermatrix": case "underwhite": case "underwater": case "vintage": case "warface": case "watermelon": case "whitestone": case "wolfmetal": case "woodheart": case "woodenboards": case "yellowroses": {
                if (!m.text) return m.reply(`Example : ${prefix + command} Dika Ardnt.`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get(`/api/photooxy/${command}`, { text: m.text }, "apikey", { responseType: "arraybuffer" })
                if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req)
            }
            break
            case "arcade8-bit": case "battlefield4rising": case "glitchtiktok": case "pubg": case "google": {
                let [text1, text2] = m.text.split("|")
                if (!text2) return m.reply(`Example ${prefix + command} Dika|Ardnt.`)
                await m.reply("wait")
                let req = await (await api("xfarr")).get(`/api/photooxy/${command}`, { text1, text2 }, "apikey", { responseType: "arraybuffer" })
                if (req?.status && req.status !== 200) return m.reply(req?.message || "error")
                await m.reply(req)
            }
            break

/* Umm, maybe for non command */
            default:
                // ini eval ya dek
                if ([">", "eval", "=>"].some(a => m.body?.toLowerCase()?.startsWith(a))) {
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
                if (["$", "exec"].some(a => m.body?.toLowerCase()?.startsWith(a))) {
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

                // cek bot active or no
                if (/^bot/i.test(m.body)) {
                    m.reply(`Bot Activated "${m.pushName}"`)
                }
        }
    } catch (e) {
        m.reply(format(e))
    }
}
