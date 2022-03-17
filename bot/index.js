import ComfyJS from 'comfy.js'
import { firestore } from './firebase.js'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import dotenv from 'dotenv'
dotenv.config()


// Define and populate configuration
let cfg = {
  power: false,
  devsOnly: false,
  devs: []
}

onSnapshot(doc(firestore, 'cfg', 'core'), (doc) => {
  const data = doc.data()
  cfg.power = data.power
  cfg.devsOnly = data.devsOnly
  cfg.devs = []
  doc.data().devs.forEach(dev => cfg.devs.push(dev))
  console.log("cfg/core updated: " + JSON.stringify(cfg))
})


// Define and populate commands
let commands = []

onSnapshot(collection(firestore, 'commands'), (snapshot) => {
  commands = []
  snapshot.forEach(doc => {
    commands.push(doc.data())
  })
  console.log(JSON.stringify(commands))
})


// comfy.js lets us define command handlers which are passed a predefined set of parameters:
ComfyJS.onCommand = (user, command, message, flags, extra) => {

  // Global power switch
  if (!cfg.power) return
  // Dev mode
  if (cfg.devsOnly && !cfg.devs.some((dev) => dev === user)) return

  // Find the command in the list of commands that comes from firestore
  const cmd = commands.find(({ name }) => name === command)

  // Array.find() returns undefined if it can't find our command in the list, so handle that
  if (cmd === undefined) return

  // Each command has power and permission toggles
  if (!cmd.on) return
  if (cmd.on && !cmd.devs && !cmd.subs && !cmd.public) return
  if (cmd.devMode && !cfg.devs.some((dev) => dev === user)) return
  if (cmd.subs && !flags.subscriber) return
  // follower flag??????? wtf instafluff.
  // if (!cmd.public && !cfg.devs.some((dev) => dev === user) && !flags.subscriber) return


  // Say the response, replacing vars
  ComfyJS.Say(cmd.response.replace('$user', user))

}


ComfyJS.Init('rcon_joe', process.env.OAUTH)
