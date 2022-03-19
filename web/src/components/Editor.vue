<script setup>
import { ref } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import { firestore } from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore'

const content = ref("")
const commandName = ref("")

async function saveCommand() {
  const newCommand = commandName.value.replace('!', '')
  await setDoc(doc(firestore, 'commands', newCommand), {
    name: newCommand,
    on: true,
    devMode: true,
    subs: false,
    followers: false,
    public: false,
    code: content.value
  })
  commandName.value = ""
  content.value = ""
}

</script>

<template>
  <input type="text" v-model="commandName" placeholder="!command" class="bg-gray-200 border-2 w-full p-2 rounded-lg col-span-2 text-lg xl:row-span-2" />
  <v-ace-editor
    v-model:value="content"
    @init="editorInit"
    lang="html"
    theme="chrome"
    style="height: 400px" 
  />
    <button @click="saveCommand" class="col-span-1 py-2 px-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Save</button>
</template>
