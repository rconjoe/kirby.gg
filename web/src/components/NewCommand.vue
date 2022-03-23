<script setup>
import { ref } from 'vue'
import { firestore } from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore'

const commandEdit = ref("")
const responseEdit = ref("")
const functional = ref(false)

function toggleFunctional() {
  return functional.value = !functional.value
}

async function addCommand() {
  const newCommand = commandEdit.value.replace('!', '')
  await setDoc(doc(firestore, 'commands', newCommand), {
    name: newCommand,
    response: responseEdit.value,
    on: true,
    devMode: true,
    subs: false,
    followers: false,
    public: false,
  })
  commandEdit.value = ""
  responseEdit.value = ""
}


</script>

<template>
  <div class="flex flex-row my-2 bg-pink-200 rounded-lg p-2 justify-items-center items-center w-full">
    <input type="text" v-model="commandEdit" placeholder="!command" class="bg-gray-200 border-2 p-2 mr-2 rounded-lg text-lg flex flex-basis-1/5" />
    <input type="text" v-if="functional === false" v-model="responseEdit" placeholder="Response...use $user to substitute invoker's Twitch name" class="bg-gray-200 border-2 w-full p-2 rounded-lg flex flex-basis-1/2 focus:outline" />
    <div class='flex flex-col'>
      <input id="functional" v-model="functional" @click="toggleFunctional" class="ml-8 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="functional" class="text-sm mx-4">Functional</label>
    </div>
    <button @click="addCommand" class="py-2 px-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Save</button>
  </div>
</template>
