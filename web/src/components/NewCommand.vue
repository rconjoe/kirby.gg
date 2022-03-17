<script setup>
import { ref } from 'vue'
import { firestore } from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore'

const commandEdit = ref("")
const responseEdit = ref("")

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
  <div class="grid grid-rows-1 grid-cols-8 gap-2 my-2 bg-pink-200 rounded-lg p-2 flex flex-row justify-items-center items-center w-full">
    <input type="text" v-model="commandEdit" placeholder="!command" class="bg-gray-200 border-2 w-full p-2 rounded-lg col-span-2 text-lg xl:row-span-2" />
    <input type="text" v-model="responseEdit" placeholder="Response...use $user to substitute invoker's Twitch name" class="bg-gray-200 col-span-5 border-2 w-full p-2 rounded-lg xl:row-span-2" />
    <button @click="addCommand" class="col-span-1 py-2 px-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Save</button>
  </div>
</template>
