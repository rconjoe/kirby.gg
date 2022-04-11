<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { firestore } from '../firebase.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { TrashIcon } from '@heroicons/vue/solid'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-clouds'
import workerJsonUrl from 'ace-builds/src-noconflict/worker-javascript?url'
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJsonUrl)

const props = defineProps({
  command: {
    name: String,
    response: String,
    on: Boolean,
    devMode: Boolean,
    subs: Boolean,
    public: Boolean,
    functional: Boolean,
    code: String
  }
})

const responseEdit = ref(props.command.response)
const devMode = ref(props.command.devMode)
const on = ref(props.command.on)
const subs = ref(props.command.subs)
const _public = ref(props.command.public)
const functionalEditor = ref(false)
const codeEdit = ref(props.command.code)
const loading = ref(false)
const trashLoading = ref(false)
const showDirections = ref(false)

const buttonClass = "text-md py-2 px-3 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl"
const trashClass = "max-h-7 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300"
const trashLoadingClass = computed(() => trashLoading.value ? "animate-bounce" : "")
const loadingClass = computed (() => loading.value ? "disabled bg-pink-200 animate-bounce" : "bg-pink-800" )

function updateCommand() {
  loading.value = true
  if (functionalEditor.value === true) {
    updateDoc(doc(firestore, 'commands', props.command.name), {
      code: codeEdit.value,
    })
    .then(() => {
        functionalEditor.value = false
        alert('Command saved!')
      })
    .catch((err) => {
        functionalEditor.value = false
        alert('There was an error saving your command.')
      })
  }
  else {
    updateDoc(doc(firestore, 'commands', props.command.name), {
      response: responseEdit.value
    })     
    .then(() => {
        alert('Command saved!')
      })
    .catch((err) => {
        alert('There was an error saving your command.')
      })
  }
  loading.value = false
}

async function deleteCommand() {
  // TODO: make a proper cute popup modal for this
  trashLoading.value = true
  if (window.confirm(`Are you sure you want to delete the command ${props.command.name}?`) === true) {
    await deleteDoc(doc(firestore, 'commands', props.command.name))
  }
  return trashLoading.value = false
}

async function toggleCommandPower() {
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    on: !props.command.on
  })
}

async function toggleDevMode() {
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    devMode: !props.command.devMode
  })
}

async function toggleSubs() {
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    subs: !props.command.subs
  })
}

async function togglePublic() {
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    public: !props.command.public
  })
}

function editFunctionalCommand() {
  functionalEditor.value = !functionalEditor.value
}

function saveCodeEdit() {
}

watch(_public, async (curr, old) => {
  if (old === false && subs.value === false) {
        await toggleSubs()
      }
    })
</script>

<template>
  <div class="flex flex-col w-full">
  <div class="my-2 bg-pink-200 rounded-lg p-2 flex flex-row justify-evenly items-center text-center w-full">
    <div class="bg-blue-200 shadow rounded-2xl px-4 py-2">
    !{{ props.command.name }}
      </div>
    <input v-if="!props.command.functional" type="text" v-model="responseEdit" class="basis-7/12 bg-gray-200 border-2 p-2 rounded-lg text-lg xl:row-span-2" />
    <button v-if="props.command.functional && !functionalEditor" class="basis-7/12 rounded-lg shadow-lg px-4 py-2 bg-pink-300" @click="editFunctionalCommand">Functional command - click to edit</button>
    <button v-if="props.command.functional && functionalEditor" class="basis-7/12 rounded-lg shadow-lg px-4 py-2 bg-pink-300" @click="editFunctionalCommand">Edit your command below. Click here to close without saving.</button>
    <div class="flex flex-col align-center">
      <input id="onoff" v-model="on" @click="toggleCommandPower" class="ml-3 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="onoff" class="text-sm">On/Off</label>
    </div>
    <div class="flex flex-col align-center justify-center">
      <input id="devMode" v-model="devMode" :disabled="!on" @click="toggleDevMode" class="form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="devMode" class="text-sm">Devs</label>
    </div>
    <div class="flex flex-col align-center justify-center">
      <input id="subs" v-model="subs" :disabled="!on" @click="toggleSubs" class="ml-1 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="subs" class="text-sm">Subs</label>
    </div>
    <div class="flex flex-col align-center justify-center">
      <input id="public" v-model="_public" :disabled="!on" @click="togglePublic" class="ml-1 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="public" class="text-sm">Public</label>
    </div>
    <button :class="[ buttonClass, loadingClass ]" @click="updateCommand" >Save</button>
    <TrashIcon :class="[ trashClass, trashLoadingClass ]" @click="deleteCommand" />
  </div>
    <v-ace-editor
      v-if="props.command.functional && functionalEditor"
      v-model:value="codeEdit"
      @init="editorInit"
      lang="javascript"
      theme="clouds"
      style="height: 400px"
      :options="{useWorker: true}"
      class="rounded-lg text-lg"
    />
    <button v-if="props.command.functional && functionalEditor && !showDirections" class="rounded-full w-full bg-blue-300 mt-4 mb-2 px-4 py-2" @click="showDirections = !showDirections">Show Instructions</button>
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
