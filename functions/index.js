const functions = require("firebase-functions");
const axios = require('axios')
const ComfyJS = require('comfy.js')

exports.getSchedule = functions.https.onCall(async (data, context) => {
  const schedule = []
  const sched = await axios.get('https://api.twitch.tv/helix/schedule?broadcaster_id=18846157', {
    headers: {
      'Authorization': `Bearer ${process.env.TWITCH_TOKEN}`,
      'Client-Id': `${process.env.TWITCH_ID}`
    }
  })
  for (let i = 0; i < 5; i++) {
    schedule.push(sched.data.data.segments[i])
  }
  return schedule;
});

exports.sayAsBot = functions.https.onCall(async (data, context) => {
  ComfyJS.Init('rcon_joe', process.env.OAUTH)
  ComfyJS.Say(data.message)
  return
})
