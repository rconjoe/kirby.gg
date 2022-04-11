<script setup>
import { ref } from 'vue'
import { firestore } from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-clouds'
import workerJsonUrl from 'ace-builds/src-noconflict/worker-javascript?url'
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJsonUrl)

const responseEdit = ref("")
const functional = ref(false)
const code = ref("")
const commandName = ref("")
const showDirections = ref(false)

function toggleFunctional() {
  return functional.value = !functional.value
}

function addCommand() {
  if (!functional.value) {
    const newCommand = commandName.value.replace('!', '')
    setDoc(doc(firestore, 'commands', newCommand), {
      name: newCommand,
      functional: false,
      response: responseEdit.value,
      code: "",
      on: true,
      devMode: true,
      subs: false,
      followers: false,
      public: false,
    })
    .then(() => {
        alert('Command saved!')
      })
    .catch((err) => {
        functionalEditor.value = false
        alert('There was an error saving your command.')
      })
    commandName.value = ""
    responseEdit.value = ""
  } else {
    const newCommand = commandName.value.replace('!', '')
    setDoc(doc(firestore, 'commands', newCommand), {
      name: newCommand,
      functional: true,
      response: "",
      code: code.value,
      on: true,
      devMode: true,
      subs: false,
      followers: false,
      public: false,
    })
    .then(() => {
        functionalEditor.value = false
        alert('Command saved!')
      })
    .catch((err) => {
        functionalEditor.value = false
        alert('There was an error saving your command.')
      })
    commandName.value = ""
    code.value = ""
  }
  loading.value = false
}

</script>

<template>

  <!-- standard edit -->
  <div v-if="!functional" class="flex flex-row my-2 bg-pink-200 rounded-lg p-2 justify-items-center items-center w-full">
    <input type="text" v-model="commandName" placeholder="!command" class="bg-gray-200 border-2 p-2 mr-2 rounded-lg text-lg flex flex-basis-1/5" />
    <input type="text" v-if="functional === false" v-model="responseEdit" placeholder="Response...use $user to substitute invoker's Twitch name" class="bg-gray-200 border-2 w-full p-2 rounded-lg flex flex-basis-1/2 focus:outline" />
    <div class='flex flex-col'>
      <input id="functional" v-model="functional" @click="toggleFunctional" class="ml-8 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="functional" class="text-sm mx-4">Functional</label>
    </div>
    <button @click="addCommand" class="py-2 px-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Save</button>
  </div>

  <!-- if functional is checked -->
  <div v-if="functional" class="my-2 bg-pink-200 rounded-lg p-2 justify-items-center items-center w-full">
    <div class="flex flex-row mb-4">
      <input type="text" v-model="commandName" placeholder="!command" class="bg-gray-200 border-2 w-full p-2 rounded-lg col-span-2 text-lg xl:row-span-2" />
      <div class='flex flex-col'>
        <input id="functional" v-model="functional" @click="toggleFunctional" class="ml-8 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
        <label for="functional" class="text-sm mx-4">Functional</label>
      </div>
      <button @click="addCommand" class="py-2 px-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Save</button>
    </div>
    <v-ace-editor
      v-model:value="code"
      @init="editorInit"
      lang="javascript"
      theme="clouds"
      style="height: 400px"
      :options="{useWorker: true}"
      class="rounded-lg text-lg mx-2"
    />
    <button v-if="!showDirections" class="rounded-full w-full bg-blue-300 mt-4 mb-2 px-4 py-2" @click="showDirections = !showDirections">Show Instructions</button>
    <button v-if="showDirections" class="rounded-full w-full bg-blue-300 mt-4 mb-2 px-4 py-2" @click="showDirections = !showDirections">Hide Instructions</button>
    <div v-if="showDirections" class="text-lg bg-gray-200 rounded-lg mt-4 mx-2 pt-6 pl-8 pb-6 text-gray-600">
      <i>The JavaScript you write here will be injected into the body of a function that runs every time this command is invoked.
      <br />
        You MUST use semicolons for this code to work properly.
      <br />
      The following parameters are available:</i>
      <br /> 
      <br /> 
      <strong>bot</strong>: This is Kassandra. Use the <span class="font-mono bg-gray-300 py-1 px-2">Say</span> method to send your response. Example:
      <div class="border mt-2 bg-gray-500 text-white p-4 mr-24 font-mono mb-8">
      bot.Say("uwu");
      </div>
      <strong>user</strong>: This is the username of the user who sent the message. You could use it like this:
      <div class="border mt-2 bg-gray-500 text-white p-4 mr-24 font-mono mb-8">
      bot.Say(`Hello ${user}! Welcome to the stream.`);
      </div>
      <strong>command</strong>: This is the command that was invoked. Example:
      <br /> 
      <div class="border mt-2 bg-gray-500 text-white p-4 mr-24 font-mono mb-8">
      bot.Say(`${user} invoked the ${command} command! Wow!`);
      </div>
      <strong>message</strong>: This contains any message added after the command when sent, like <span class="font-mono bg-gray-300 py-1 px-2">!command message</span> Example:
      <br /> 
      <div class="border mt-2 bg-gray-500 text-white p-4 mr-24 font-mono mb-8">
      // User on Twitch invokes "!mapcheck dust2"<br /><br />
      if (message === "de_dust2") {<br />
        <p class="indent-4">bot.Say('dust2 is NOT in the current map rotation!')</p>
        }<br />
        else if (message === "vertigo") {<br />
        <p class="indent-4">bot.Say('vertigo IS in the current map rotation!')</p>
        }<br />
      </div>
      <strong>flags</strong>: An object containing true/false flags with extra info about the user or command:
      <br /> 
      <div class="border mt-2 bg-gray-500 text-white p-4 mr-24 font-mono mb-8">
        flags.broadcaster<br />
        flags.mod<br />
        flags.founder<br />
        flags.subscriber<br />
        flags.vip<br />
        flags.highlighted<br />
      </div>
      <strong>extra</strong>: An object containing a bunch of extra info.
      <br /> 
      <div class="border bg-gray-500 text-white p-4 mr-24 font-mono">
        extra.id (the message message)<br />
        extra.channel<br />
        extra.roomId<br />
        extra.messageType<br />
        extra.messageEmotes<br />
        extra.isEmoteOnly<br />
        extra.userId<br />
        extra.username<br />
        extra.displayName<br />
        extra.userColor<br />
        extra.userBadges<br />
        extra.flags<br />
        extra.timestamp<br />
        extra.customRewardId (only works with custom channel rewards with required-text)
      </div>
      <br /> 
      Check the existing commands for more examples.
    </div>
  </div>
</template>
