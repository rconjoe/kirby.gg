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
  const isDev = cfg.devs.some((dev) => dev === user)

  // Global power switch
  if (!cfg.power) return
  // Global dev mode
  // if (cfg.devsOnly && !isDev) return

  const data = {
    ComfyJS,
    user,
    command,
    message,
    flags,
    extra
  }

  // Find the command in the list of commands that comes from firestore
  const cmd = commands.find(({ name }) => name === command.toLowerCase())

  // Array.find() returns undefined if it can't find our command in the list, so handle that
  if (cmd === undefined) return

  function runIfDev(data, cmd, isDev) {
    if (cmd.devMode) {
      // execute the command if you are a dev, otherwise check subs
      return (isDev ? execute(data) : null)
    }
    return
  }

  function runIfSub(data, cmd) {
    if (cmd.subs) {
      return (flags.subscriber ? execute(data) : null)
    }
    return
  }

  // Each command has power and permission toggles
  if (!cmd.on) return

  // TODO: pass a db class to the command with simplified CRUD methods for dynamic modeling.
  // e.g. db.model('modelName').write({...data})
  // This would enable the bot admin to build commands that use database functionality from the panel code editor.
  function execute({ ComfyJS, user, command, message, flags, extra }) {
    if (cmd.functional === true) {
      const ev = new Function('bot, user, command, message, flags, extra', cmd.code)
      return (ev(ComfyJS, user, command, message, flags, extra))
    }

    // Say the response, replacing vars
    ComfyJS.Say(cmd.response.replace('$user', user))
  }

  // if the command is not public
  if (!cmd.public) {
    runIfDev(data, cmd, isDev)
    runIfSub(data, cmd)
  } else {
    execute(data)
  }


}

ComfyJS.Init('kcckirby', process.env.OAUTH)
