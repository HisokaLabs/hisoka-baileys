// Note For User
// Set all settings in the file config.js including the list menu 
// for others pay to me. jas kiding
// jangan diperjualbelikan dalam keadaan masih ori hisoka. minimal tambah 5-8 command dulu

// setting your list menu on here
const menu = {
   main: ["help", "speed", "owner", "sc", "ping", "quoted"],
   owner: ["eval", "exec", "mute", "public"],
   convert: ["sticker", "toimage"],
   group: ["hidetag", "add", "welcome", "leaving"],
   tool: ["fetch", "ssweb", "rvo", "blackbox"],
   download: ["tiktok", "instagram", "facebook", "drive", "imgur", "mediafire", "pinterest", "twitter", "ytv", "yta"],
   search: ["pinterest", "lirik"],
   education: ["wikipedia"],
   islami: ["quran", "nabi"],
   textpro: ["1977", "abstrgold", "advancedglow", "americanflag", "arcanetvseries", "artpapercut", "bagel", "beach", "berry", "biscuit", "blackandwhitebearmascot", "blackpink", "blackpink", "blackpinkdecoratedwithroses", "bloodfrostedglass", "bluecircuit", "bluefoilballoon", "blueglass", "bluesparklingjewelry", "bokeh", "box", "bread", "breakwall", "brokenglass", "businesssign", "captainamerica", "carvedstone", "chocolatecake", "chrismastgift", "christmasbyname", "christmascandycane", "christmasholidaysnow", "christmastree", "cloud", "cloudsky", "colorfullluxurymetal", "colorleddisplayscreen", "countryflaggenerator", "creatglossymetalic", "creativegolden", "cyanfoilballoon", "cyanglass", "cyanjewelry", "cyansparklingjewelry", "decorategreen", "decoratepurple", "decorativeglass", "deepsemetal", "deluxegold", "deluxesilver", "denim", "doubleexposureblackwhite", "dropwater", "elegantwhitegold", "embossedoncrackedsurface", "fabric", "fireworksparkle", "foilballoonbirthday", "fruitjuice", "fullcolorballoon", "futuristictechnologyneonlight", "giraffe", "glass", "glossybluemetal", "glossycarbon", "glossymetal", "glowingneonlight", "glue", "goldenancient", "goldenonredsparkles", "goldfoilballoon", "goldsparklingjewelry", "gradient", "gradientgenerator", "gradientneonlight", "graffitiwall", "greenfoilballoon", "greenglass", "greenhorror", "greenjewelry", "greenneon", "greensparklingjewelry", "halloweenfire", "halloweenskeleton", "happnewyearcardfireworkgif", "happynewyeargreetingcard", "harrypotter", "holographic", "honey", "horrorblood", "horrorgift", "icecold", "impressiveglitch", "joker", "koifish", "lava", "lightglowsliced", "luxurygold", "luxurymetallic", "magmhot", "makebatman", "marble", "marbleslabs", "matrix", "metaldarkgold", "metaldarkgold", "metallic", "metalpurpledual", "metalrainbow", "minion", "multicolorpapercut", "naturalleaves", "neon", "neon", "neondevilwings", "neonlight", "neonlight", "neonlightblackpink", "neonlightglitchgenerator", "neonlightonbrickwall", "neonlightwithgalaxy", "newyearcardsbyname", "orangeglass", "orangejewelry", "orangejuice", "peridotstone", "pinkfoilballoon", "pinksparklingjewelry", "plasticbagdrug", "pottery", "purplefoilballoon", "purplegem", "purpleglass", "purpleglass", "purplejewelry", "purpleshinyglass", "purplesparklingjewelry", "quicksparklingdiamonds", "rainbowcolorcalligraphy", "rainbowequalizer", "redfoilballoon", "redglass", "redjewelry", "redsparklingjewelry", "roadwarning", "robotr2d2", "rock", "rustedmetal", "rustymetal", "sandengraved", "sandwriting", "sciencefiction", "scifi", "scifi", "shinymetal", "silverjewelry", "skeleton", "sketch", "snowwinterholidays", "space", "sparklesmerrychristmas", "steel", "stone", "stonecracked", "strawberry", "summerneonlight", "summerwithpalmtree", "summerysandwriting", "thunder", "thundergenerator", "toxic", "transmer", "typography", "ultragloss", "underwatergenerator", "watercolor", "waterpipe", "wicker", "wonderfulgraffitiart", "wood", "writeinsandsummerbeach", "writeonfoggywindow", "xmascards", "yellowglass", "yellowjewelry", "avengers", "captainameric", "cinematichorror", "glitch", "glitchtiktok", "layered", "lionmascot", "marvelstudios", "marvelstudiosvermetal", "metal", "metalgalaxy", "metalgold", "metalrosegold", "metalsilver", "ninja", "pornhubgenerator", "retro", "space", "spookyhalloween", "steel", "stone", "thor", "videogameclassicbit", "vintagelightbulb", "wallgraffiti", "wolfblackwhite", "wolfgalaxy"]
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
         Key: "halahhisoka"
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