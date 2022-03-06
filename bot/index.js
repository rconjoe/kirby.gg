import ComfyJS from 'comfy.js'
import { firestore } from './firebase.js'
import { collection, doc, onSnapshot } from 'firebase/firestore'


// Define and populate configuration
let cfg = {
  power: false,
  devsOnly: false,
  devs: []
}

onSnapshot(doc(firestore, 'cfg', 'core'), (doc) => {
  cfg.power = doc.data().power
  cfg.devsOnly = doc.data().devsOnly
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

// Define command handler
ComfyJS.onCommand = (user, command, message, flags, extra) => {

  // Power switch
  if (cfg.power === false) return
  // Dev mode
  if (cfg.devsOnly && !cfg.devs.some((dev) => dev === user)) return

}

ComfyJS.Init('rcon_joe')
