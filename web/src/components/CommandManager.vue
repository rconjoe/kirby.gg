<script setup>
import { ref, onMounted } from 'vue'
import { firestore } from '../firebase.js'
import { doc, updateDoc } from 'firebase/firestore'
import { TrashIcon } from '@heroicons/vue/solid'

const props = defineProps({
  command: {
    name: String,
    response: String,
    on: Boolean
  }
})

const responseEdit = ref(props.command.response)

onMounted(() => {
  responseEdit.value = props.command.response
})

async function updateCommand() {
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    response: responseEdit.value
  })  
}

async function toggleCommandPower() {
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    on: !props.command.on
  })
}

</script>

<template>
  <div class="grid grid-rows-1 grid-cols-8 gap-2 my-2 bg-pink-200 rounded-lg p-2 flex flex-row justify-items-center items-center">
    <h2 class="text-2xl col-span-1 pt-2">!{{ props.command.name }}</h2>
    <input type="text" v-model="responseEdit" placeholder="Response...use $user to substitute invoker's Twitch name" class="bg-gray-200 col-span-5 border-2 w-full p-2 rounded-lg text-lg xl:row-span-2" />
    <button @click="updateCommand" class="col-span-1 px-8 py-2 ml-6 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Save</button>
    <TrashIcon class="max-h-10 max-w-10 col-span-1" />
  </div>
</template>
