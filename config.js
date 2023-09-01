// Note For User
// Set all settings in the file config.js including the list menu 
// for others pay to me. jas kiding
// jangan diperjualbelikan dalam keadaan masih ori hisoka. minimal tambah 5-8 command dulu

// setting your list menu on here
const menu = {
   main: ["help", "speed", "owner", "sc", "ping", "quoted"],
   owner: ["eval", "exec", "mute", "public", "setprofile", "setname"],
   convert: ["sticker", "toimage"],
   group: ["hidetag", "add", "welcome", "leaving", "setprofile", "setname", "linkgroup"],
   tool: ["fetch", "ssweb", "rvo", "blackbox", "ai", "diffusion", "animediffusion"],
   download: ["tiktok", "instagram", "facebook", "drive", "imgur", "mediafire", "pinterest", "twitter", "ytv", "yta", "apk", "spotify"],
   search: ["pinterest", "lirik", "chord"],
   education: ["wikipedia"],
   islami: ["quran", "nabi"],
   textpro: ["1977", "abstrgold", "advancedglow", "americanflag", "arcanetvseries", "artpapercut", "bagel", "beach", "berry", "biscuit", "blackandwhitebearmascot", "blackpink", "blackpink", "blackpinkdecoratedwithroses", "bloodfrostedglass", "bluecircuit", "bluefoilballoon", "blueglass", "bluesparklingjewelry", "bokeh", "box", "bread", "breakwall", "brokenglass", "businesssign", "captainamerica", "carvedstone", "chocolatecake", "chrismastgift", "christmasbyname", "christmascandycane", "christmasholidaysnow", "christmastree", "cloud", "cloudsky", "colorfullluxurymetal", "colorleddisplayscreen", "countryflaggenerator", "creatglossymetalic", "creativegolden", "cyanfoilballoon", "cyanglass", "cyanjewelry", "cyansparklingjewelry", "decorategreen", "decoratepurple", "decorativeglass", "deepsemetal", "deluxegold", "deluxesilver", "denim", "doubleexposureblackwhite", "dropwater", "elegantwhitegold", "embossedoncrackedsurface", "fabric", "fireworksparkle", "foilballoonbirthday", "fruitjuice", "fullcolorballoon", "futuristictechnologyneonlight", "giraffe", "glass", "glossybluemetal", "glossycarbon", "glossymetal", "glowingneonlight", "glue", "goldenancient", "goldenonredsparkles", "goldfoilballoon", "goldsparklingjewelry", "gradient", "gradientgenerator", "gradientneonlight", "graffitiwall", "greenfoilballoon", "greenglass", "greenhorror", "greenjewelry", "greenneon", "greensparklingjewelry", "halloweenfire", "halloweenskeleton", "happnewyearcardfireworkgif", "happynewyeargreetingcard", "harrypotter", "holographic", "honey", "horrorblood", "horrorgift", "icecold", "impressiveglitch", "joker", "koifish", "lava", "lightglowsliced", "luxurygold", "luxurymetallic", "magmhot", "makebatman", "marble", "marbleslabs", "matrix", "metaldarkgold", "metaldarkgold", "metallic", "metalpurpledual", "metalrainbow", "minion", "multicolorpapercut", "naturalleaves", "neon", "neon", "neondevilwings", "neonlight", "neonlight", "neonlightblackpink", "neonlightglitchgenerator", "neonlightonbrickwall", "neonlightwithgalaxy", "newyearcardsbyname", "orangeglass", "orangejewelry", "orangejuice", "peridotstone", "pinkfoilballoon", "pinksparklingjewelry", "plasticbagdrug", "pottery", "purplefoilballoon", "purplegem", "purpleglass", "purpleglass", "purplejewelry", "purpleshinyglass", "purplesparklingjewelry", "quicksparklingdiamonds", "rainbowcolorcalligraphy", "rainbowequalizer", "redfoilballoon", "redglass", "redjewelry", "redsparklingjewelry", "roadwarning", "robotr2d2", "rock", "rustedmetal", "rustymetal", "sandengraved", "sandwriting", "sciencefiction", "scifi", "scifi", "shinymetal", "silverjewelry", "skeleton", "sketch", "snowwinterholidays", "space", "sparklesmerrychristmas", "steel", "stone", "stonecracked", "strawberry", "summerneonlight", "summerwithpalmtree", "summerysandwriting", "thunder", "thundergenerator", "toxic", "transmer", "typography", "ultragloss", "underwatergenerator", "watercolor", "waterpipe", "wicker", "wonderfulgraffitiart", "wood", "writeinsandsummerbeach", "writeonfoggywindow", "xmascards", "yellowglass", "yellowjewelry", "avengers", "captainameric", "cinematichorror", "glitch", "glitchtiktok", "layered", "lionmascot", "marvelstudios", "marvelstudiosvermetal", "metal", "metalgalaxy", "metalgold", "metalrosegold", "metalsilver", "ninja", "pornhubgenerator", "retro", "space", "spookyhalloween", "steel", "stone", "thor", "videogameclassicbit", "vintagelightbulb", "wallgraffiti", "wolfblackwhite", "wolfgalaxy"],
   ephoto: ["1917", "3dhologram", "3dtexteffect", "3dtextstyle", "3dcrack", "3dcubictext", "3dgradient", "3dgradient2", "3dsand", "3dshinymetallic", "3dwoodenlogo", "3dwoodentext", "3dchristmas", "3dbeach", "3dpapercut", "3dunderwater", "aovwallpaper2", "aovwallpaper3", "aovwallpaper4", "aovwallpapers", "advancedglow", "americanflag", "amongus", "angelwing", "announcementofwinning", "aovarena", "aovbanner", "avatar3q360", "avatardota", "avatarlol", "avatarlol2", "blackpink", "balloontext", "bannerlol", "battlefield", "beautifulgold", "birthdaycake", "birthdaycake2", "birthdaycake3", "birthdaycake3", "birthdaycake4", "blackpinklogo", "blackpinkneon", "bloodtext", "bloodwritingtext", "bokehtext", "borderproject", "csgo", "csgocover", "caketext2", "caketext", "candytext", "capercut", "cardshalloween", "chocolate", "christmasball", "christmasnewyear2", "christmaseffect", "christmasnewyear", "christmasseason", "christmassnow", "christmasvideo", "chrometext", "cloudtext", "coffee", "colortext", "colorfulglowing", "colorfultext", "covergraffiti", "createwater", "createtext", "crossfire", "crossfirecover", "cyberhunter", "dance", "darkgreentypography", "diamondtext", "dota2cover", "doubleexposure", "dragonball", "dragonsteel", "embroider", "fabrictext", "firetext", "firework", "firework", "flamelettering", "foggyrainy", "freefire", "freefireavatar", "freefirefb", "funnyminion", "galaxy", "galaxytext", "gemstone", "generalexamcrank", "glittergold", "glossychrome", "goldbutton", "goldpurple", "goldtext", "goldtext2", "goldtextgenerators", "goldtext3", "graffititext", "graffititext5", "graffiticolor", "graffitilettering", "greenbrush", "greenneon", "halloween", "halloweenbatstext", "halloweenfire", "halloweenvideo", "heart", "heartcup", "hollywoodwalk", "horrorcemeterygate", "icetext", "joker", "jeanfabric", "jewel", "lok(aov)", "lolpentakill", "leagueofangels", "leagueofking", "leagueofkings", "ligaturesfromleaves", "lighteffects", "lol", "logoastronaut", "lolavatar", "lolbanner", "lolcover", "lolfb", "lolwp", "lolwp2", "lovecard", "luxurylogo", "magictext", "matrixtext", "merrychristmas", "metal", "metalavatar", "metalmascots", "metalblue", "metallogo", "metalstartext", "metaltext", "metallic", "milkcaketext", "minimallogo", "mobilelegendswallpaper", "moderngold", "moderngoldred", "moderngoldsilver", "moderngold3", "moderngold4", "moderngold5", "musicequalizer", "nationalflag", "neonlight", "neontext", "neontext3", "neontextlight", "neondevilwings", "newyear", "nigeriaflag", "noel", "onepiece", "overwatchcover", "overwatchwallpaper", "overwatchhero", "pubgbirthday", "pubglogo2", "pubglogo3", "pubgchar", "pubgcover", "pubgfb", "pubgglitch", "pubglogo", "pubgteam", "paintsplatter", "party", "plasmatexteffects", "purpletext", "retrotext", "roadpaint", "royaltext", "santaclaus", "shadowtext", "snake", "snowontext", "starwars", "starsnight", "starsnight2", "summerbeach2", "sunlightshadow", "teamlogo", "teamfighttactics", "textgalaxy", "textgraffiti3d", "texthalloween", "texthalloween2", "textheartflashlight", "textlight", "textcake", "textchristmas", "textmetal", "textoncloth", "thundertext", "typography", "underwatertext", "valentinesday", "warface", "water3dtext", "watertext", "wingsgalaxy", "wingstext", "wooden3d", "writegalaxy", "writegalaxy2", "writegoldletters", "writingblackboard", "yasuologo", "zodiac", "zombie3d", "angelwings", "animationsbear", "anonymoushacker", "avataraov", "avatarrov", "avatargold", "balloon", "bear", "birthdaycake3", "birthdaycards", "birthdayfoilballoon", "brokenglass", "cakes", "cartoongraffiti", "chalkontheblackboard", "chocolate2", "cloudsinthesky", "colorfulangel", "covercf", "coverlol", "deleting", "digitalglitch", "digitaltiger", "facebook", "foggyglass", "football", "galaxylogo", "gaminglogo", "gaminglogofps", "girlgamer", "glass", "glowingtext", "goldletters", "graffitiletters", "happywomensday", "horrorletters", "horrortext", "impressiveleaves", "inthesky", "incandescentbulbs", "leafautumn", "lettersontheleaves", "lightgalaxy", "lightsignatures", "logointro", "logoteam", "lolavatar2", "luxurygold", "mascotlogo", "maskotteamlogo", "mechanical", "metalborder", "metalliceffect", "namesonthesand", "nature", "neonglitch", "neonblue", "neonlogo", "newyearvideo", "papercut", "pavement", "personalizedqueen", "pig", "pixelglitch", "puppycute", "realisticcloud", "realisticembroidery", "rotationlogo", "ruby​​stone", "signatureattachment", "silvertext", "snow3d", "summerbeach", "summerysand", "sweetlove", "tattoosignature", "tattoos", "technology", "texteffectsnight", "tmaker", "vibrantfireworks", "vintagetelevision", "wallpapermobile", "warningsign", "watercolor", "womensday", "wordgreenflares", "wordgreenlight", "zodiacwallpaper", "3dstone", "3dlightbulb", "3dwood", "amongusbanner", "apexlegend", "barcashirt", "callofduty", "captainamerica", "companylogo", "companylogo2", "floralluxury", "footballlogo", "glitter", "juventusshirt", "latestspace3d", "letters", "logo3dmetal", "lolytbanner", "lovelyfloral", "marvels", "metalliccover", "neontext2", "overwatchavatar", "overwatchytbanner", "pubglogo", "pubgytbanner", "polygonlogo", "pornhub", "premierleaguecup", "quotesimages", "shirtrealmadrid", "steeltext", "tiktok", "writestatus", "balloonslove", "banneraov", "blackandwhite", "classlogo", "footballshirtmessi", "girlgraffiti", "gradientlogo", "graffitithewall", "impressiveanime", "letterlogos", "logoavengers", "logowolf", "logoaccording", "logogaming", "logomascot", "loveballoons", "metallicglass", "pencilsketch", "shirtfootball", "steellettering"],
   photooxy: ["3dglowing", "3dnature", "3drainbow", "3dsummer", "3dwoodblack", "between", "birthdaycake", "blackpink", "burnpaper", "butterfly", "candy", "carvedwood", "coffeecup", "coffeecup2", "crisp", "crossfire", "csgo", "cup", "cupsmile", "fabric", "flaming", "flowerheart", "flowertypography", "fur", "glowrainbow", "gradient", "graffiti", "greenleaves", "harrypotter", "hellokitty", "leaves", "lovepicture", "lovetext", "luxury", "metallicglow", "modernmetal", "multimaterial", "naruto", "naturetypography", "neondarkmetal", "neonglow", "neonmetallic", "nightsky", "partyneon", "poly", "raindrops", "rainbowshine", "romanticlove", "scary", "shadowtext", "silk", "skriking3d", "smoke", "smoketypography", "sweetcandy", "underfall", "underflower", "undergrass", "undermatrix", "underwhite", "underwater", "vintage", "warface", "watermelon", "whitestone", "wolfmetal", "woodheart", "woodenboards", "yellowroses", "arcade8-bit", "battlefield4rising", "glitchtiktok", "pubg", "google"]
}

const limit = {
   free: 15,
   premium: 150,
   VIP: "Infinity",
   download: {
      free: 50000000, // use byte
      premium: 350000000, // use byte
      VIP: 1130000000, // use byte
   }
}

export default {
   limit,
   menu,

   // Set your URL and API key here
   APIs: {
      xfarr: {
         baseURL: 'https://api.xfarr.com',
         Key: "buy on https://api.xfarr.com/pricing"
      }
   },

   // Set Prefix, Session Name, Database Name and other options here
   options: {
      public: true,
      antiCall: true, // reject call
      database: "database.json", // End .json when using JSON database or use Mongo URI
      owner: ["6288292024190"], // set owner number on here
      sessionName: "session", // for name session
      prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i,
      pairingNumber: "" // Example Input : 62xxx
   },

   // Set pack name sticker on here
   Exif: {
      packId: "https://dikaardnt.my.id",
      packName: `Sticker Ini Dibuat Oleh :`,
      packPublish: "Dika Ardnt.",
      packEmail: "okeae2410@gmail.com",
      packWebsite: "https://dikaardnt.my.id",
      androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
      iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
      emojis: [],
      isAvatar: 0,
   },

   // message  response awikwok there
   msg: {
      owner: "Features can only be accessed owner!",
      group: "Features only accessible in group!",
      private: "Features only accessible private chat!",
      admin: "Features can only be accessed by group admin!",
      botAdmin: "Bot is not admin, can't use the features!",
      bot: "Features only accessible by me",
      media: "Reply media...",
      query: "No Query?",
      error: "Seems to have encountered an unexpected error, please repeat your command for a while again",
      quoted: "Reply message...",
      wait: "Wait a minute...",
      urlInvalid: "Url Invalid",
      notFound: "Result Not Found!",
      premium: "Premium Only Features!",
      vip: "VIP Only Features!",
      dlFree: `File over ${formatSize(limit.download.free)} can only be accessed by premium users`,
      dlPremium: `WhatsApp cannot send files larger than ${formatSize(limit.download.premium)}`,
      dlVIP: `WhatsApp cannot send files larger than ${formatSize(limit.download.VIP)}`
   }
}


function formatSize(bytes, si = true, dp = 2) {
   const thresh = si ? 1000 : 1024;

   if (Math.abs(bytes) < thresh) {
      return `${bytes} B`;
   }

   const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
   let u = -1;
   const r = 10 ** dp;

   do {
      bytes /= thresh;
      ++u;
   } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
   );

   return `${bytes.toFixed(dp)} ${units[u]}`;
}