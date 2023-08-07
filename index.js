// Note For User
// Set all settings in the file config.js including the list menu 
// for others pay to me. jas kiding
// jangan diperjualbelikan dalam keadaan masih ori hisoka. minimal tambah 5-8 command dulu

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
import { spawn } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import { platform } from "os"
import { watchFile, unwatchFile } from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

var isRunning = false
function start(file) {
   if (isRunning) return
   isRunning = true
   console.log("Starting . . .")
   let args = [path.join(__dirname, file), ...process.argv.slice(2)]
   let p = spawn(process.argv[0], args, { stdio: ["inherit", "inherit", "inherit", "ipc"] })
   .on("message", (data) => {
      console.log("[RECEIVED]", data)
      switch (data) {
         case "reset":
            platform() === "win32" ? p.kill("SIGINT") : p.kill()
            isRunning = false
            start.apply(this, arguments)
            break
         case "uptime":
            p.send(process.uptime())
            break
      }
   })
   .on("exit", (code) => {
      isRunning = false
      console.error("Exited with code:", code)
      if (code === 0) return
      watchFile(args[0], () => {
         unwatchFile(args[0])
         start(file)
      })
   })
}

start("hisoka.js")