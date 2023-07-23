import config from "../config.js"

export default async function GroupParticipants(hisoka, { id, participants, action }) {
   try {
      const metadata = await hisoka.groupMetadata(id)

      // participants
      for (const jid of participants) {
         // get profile picture user
         let profile
         try {
            profile = await hisoka.profilePictureUrl(jid, "image")
         } catch {
            profile = "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu"
         }

         // action
         if (action == "add") {
            if (!db.groups[id]?.welcome) return
            hisoka.sendMessage(id, {
               text: `Welcome @${jid.split("@")[0]} to "${metadata.subject}"`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Welcome`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: config.Exif.packWebsite
                  }
               }
            })
         } else if (action == "remove") {
            if (!db.groups[id]?.leave) return
            hisoka.sendMessage(id, {
               text: `@${jid.split("@")[0]} Leaving From "${metadata.subject}"`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Leave`,
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