import axios from "axios";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "os";
import moment from "moment-timezone";
import cheerio from "cheerio";
import { format } from "util";
import FormData from "form-data"
import mimes from "mime-types"
import Jimp from "jimp"
import baileys from "@whiskeysockets/baileys";


export default new (class Function {
   constructor() {
      this.axios = axios;
      this.cheerio = cheerio;
      this.fs = fs;
      this.path = path;
      this.baileys = baileys;
      this.FormData = FormData;;
   }

   // source code https://github.com/BochilGaming/games-wabot/blob/e4151d33cded4cfa6f1ceabc8558e1678f2a0f53/lib/helper.js#L14
   __filename(pathURL = import.meta, rmPrefix = platform() !== "win32") {
      const path = pathURL?.url || pathURL;
      return rmPrefix
         ? /file:\/\/\//.test(path)
            ? fileURLToPath(path)
            : path
         : /file:\/\/\//.test(path)
            ? path
            : pathToFileURL(path).href;
   }

   // source code https://github.com/BochilGaming/games-wabot/blob/e4151d33cded4cfa6f1ceabc8558e1678f2a0f53/lib/helper.js#L14
   __dirname(pathURL) {
      const dir = this.__filename(pathURL, true);
      const regex = /\/$/;
      return regex.test(dir)
         ? dir
         : fs.existsSync(dir) && fs.statSync(dir).isDirectory
            ? dir.replace(regex, "")
            : path.dirname(dir);
   }

   async dirSize(directory) {
      const files = await fs.readdirSync(directory);
      const stats = files.map((file) =>
         fs.statSync(path.join(directory, file))
      );

      return (await Promise.all(stats)).reduce(
         (accumulator, { size }) => accumulator + size,
         0
      );
   }

   sleep(ms) {
      return new Promise((a) => setTimeout(a, ms));
   }

   format(str) {
      return format(str)
   }

   Format(str) {
      return JSON.stringify(str, null, 2);
   }

   jam(numer, options = {}) {
      let format = options.format ? options.format : "HH:mm";
      let jam = options?.timeZone
         ? moment(numer).tz(options.timeZone).format(format)
         : moment(numer).format(format);

      return `${jam}`;
   }

   tanggal(numer, timeZone = "") {
      const myMonths = [
         "Januari",
         "Februari",
         "Maret",
         "April",
         "Mei",
         "Juni",
         "Juli",
         "Agustus",
         "September",
         "Oktober",
         "November",
         "Desember",
      ];
      const myDays = [
         "Minggu",
         "Senin",
         "Selasa",
         "Rabu",
         "Kamis",
         "Jum’at",
         "Sabtu",
      ];
      var tgl = new Date(numer);
      timeZone ? tgl.toLocaleString("en", { timeZone }) : "";
      var day = tgl.getDate();
      var bulan = tgl.getMonth();
      var thisDay = tgl.getDay(),
         thisDay = myDays[thisDay];
      var yy = tgl.getYear();
      var year = yy < 1000 ? yy + 1900 : yy;
      let gmt = new Date(0).getTime() - new Date("1 January 1970").getTime();
      let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
         Math.floor((tgl * 1 + gmt) / 84600000) % 5
      ];

      return `${thisDay}, ${day} ${myMonths[bulan]} ${year}`;
   }

   async getFile(PATH, save) {
      try {
         let filename = null;
         let data = (await this.fetchBuffer(PATH))

         if (data?.data && save) {
            filename = path.join(process.cwd(), "temp", Date.now() + "." + data.ext)
            fs.promises.writeFile(filename, data?.data);
         }
         return {
            filename: data?.name ? data.name : filename,
            ...data
         };
      } catch (e) {
         throw e
      }
   }

   async fetchJson(url, options = {}) {
      try {
         let data = await axios.get(url, {
            headers: {
               ...(!!options.headers ? options.headers : {})
            },
            responseType: "json",
            ...options
         })

         return await data?.data;
      } catch (e) {
         throw e;
      }
   }

   async fetchText(url, options = {}) {
      try {
         let data = await axios.get(url, {
            headers: {
               ...(!!options.headers ? options.headers : {})
            },
            responseType: "text",
            ...options
         })

         return await data?.data;
      } catch (e) {
         throw e;
      }
   }

   fetchBuffer(string, options = {}) {
      return new Promise(async (resolve, reject) => {
         try {
            if (/^https?:\/\//i.test(string)) {
               let data = await axios.get(string, {
                  headers: {
                     ...(!!options.headers ? options.headers : {}),
                  },
                  responseType: "arraybuffer",
                  ...options,
               })
               let buffer = await data?.data
               let name = /filename/i.test(data.headers?.get("content-disposition")) ? data.headers?.get("content-disposition")?.match(/filename=(.*)/)?.[1]?.replace(/["';]/g, '') : ''
               let mime = mimes.lookup(name) || data.headers.get("content-type") || (await fileTypeFromBuffer(buffer))?.mime
               resolve({
                  data: buffer,
                  size: Buffer.byteLength(buffer),
                  sizeH: this.formatSize(Buffer.byteLength(buffer)),
                  name,
                  mime,
                  ext: mimes.extension(mime)
               });
            } else if (/^data:.*?\/.*?;base64,/i.test(string)) {
               let data = Buffer.from(string.split`,`[1], "base64")
               let size = Buffer.byteLength(data)
               resolve({ data, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(data)) || { mime: "application/octet-stream", ext: ".bin" }) });
            } else if (fs.existsSync(string) && fs.statSync(string).isFile()) {
               let data = fs.readFileSync(string)
               let size = Buffer.byteLength(data)
               resolve({ data, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(data)) || { mime: "application/octet-stream", ext: ".bin" }) });
            } else if (Buffer.isBuffer(string)) {
               let size = Buffer?.byteLength(string) || 0
               resolve({ data: string, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(string)) || { mime: "application/octet-stream", ext: ".bin" }) });
            } else if (/^[a-zA-Z0-9+/]={0,2}$/i.test(string)) {
               let data = Buffer.from(string, "base64")
               let size = Buffer.byteLength(data)
               resolve({ data, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(data)) || { mime: "application/octet-stream", ext: ".bin" }) });
            } else {
               let buffer = Buffer.alloc(20)
               let size = Buffer.byteLength(buffer)
               resolve({ data: buffer, size, sizeH: this.formatSize(size), ...((await fileTypeFromBuffer(buffer)) || { mime: "application/octet-stream", ext: ".bin" }) });
            }
         } catch (e) {
            reject(new Error(e?.message || e))
         }
      });
   }

   mime(name) {
      let mimetype = mimes.lookup(name)
      if (!mimetype) return mimes.extension(name)
      return { mime: mimetype, ext: mimes.extension(mimetype) }
   }

   isUrl(url) {
      let regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gi")
      if (!regex.test(url)) return false
      return url.match(regex)
   }

   escapeRegExp(string) {
      return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&')
   }

   toUpper(query) {
      const arr = query.split(" ")
      for (var i = 0; i < arr.length; i++) {
         arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
      }

      return arr.join(" ")
      //return query.replace(/^\w/, c => c.toUpperCase())
   }

   getRandom(ext = "", length = "10") {
      var result = "";
      var character =
         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
      var characterLength = character.length;
      for (var i = 0; i < length; i++) {
         result += character.charAt(
            Math.floor(Math.random() * characterLength)
         );
      }

      return `${result}${ext ? `.${ext}` : ""}`;
   }

   formatSize(bytes, si = true, dp = 2) {
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

   async resizeImage(buffer, height) {
      buffer = (await this.getFile(buffer)).data

      return new Promise((resolve, reject) => {
         Jimp.read(buffer, (err, image) => {
            if (err) {
               reject(err)
               return
            }

            image.resize(Jimp.AUTO, height)
               .getBuffer(Jimp.MIME_PNG, (err, resizedBuffer) => {
                  if (err) {
                     reject(err)
                     return
                  }
                  resolve(resizedBuffer)
               })
         })
      })
   }

   runtime(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);
      var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
   }

   async correct(mainString, targetStrings) {
      function compareTwoStrings(first, second) {
         first = first.replace(/\s+/g, "");
         second = second.replace(/\s+/g, "");

         if (first === second) return 1; // identical or empty
         if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

         let firstBigrams = new Map();
         for (let i = 0; i < first.length - 1; i++) {
            const bigram = first.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
               ? firstBigrams.get(bigram) + 1
               : 1;

            firstBigrams.set(bigram, count);
         }

         let intersectionSize = 0;
         for (let i = 0; i < second.length - 1; i++) {
            const bigram = second.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
               ? firstBigrams.get(bigram)
               : 0;

            if (count > 0) {
               firstBigrams.set(bigram, count - 1);
               intersectionSize++;
            }
         }

         return (
            (2.0 * intersectionSize) / (first.length + second.length - 2)
         );
      }

      targetStrings = Array.isArray(targetStrings) ? targetStrings : [];

      const ratings = [];
      let bestMatchIndex = 0;

      for (let i = 0; i < targetStrings.length; i++) {
         const currentTargetString = targetStrings[i];
         const currentRating = compareTwoStrings(
            mainString,
            currentTargetString
         );
         ratings.push({
            target: currentTargetString,
            rating: currentRating,
         });
         if (currentRating > ratings[bestMatchIndex].rating) {
            bestMatchIndex = i;
         }
      }

      const bestMatch = ratings[bestMatchIndex];

      return {
         all: ratings,
         indexAll: bestMatchIndex,
         result: bestMatch.target,
         rating: bestMatch.rating,
      };
   }
})()