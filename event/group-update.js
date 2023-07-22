import config from "../config.js"

export default async function GroupUpdate(hisoka, update) {
   try {
      for (const action of update) {
         // get profile picture group
         let profile
         try {
            profile = await hisoka.profilePictureUrl(action.id, "image")
         } catch {
            profile = "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu"
         }

         // action
         if (action.announce) {
            hisoka.sendMessage(action.id, {
               text: `Group has been Closed`, contextInfo: {
                  externalAdReply: {
                     title: `Closed`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: config.Exif.packWebsite
                  }
               }
            })
         } else if (!action.announce) {
            hisoka.sendMessage(action.id, {
               text: `Group is opened`, contextInfo: {
                  externalAdReply: {
                     title: `Open`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: config.Exif.packWebsite
                  }
               }
            })
         }
      }
   } catch (e) {
      throw e
   }
}