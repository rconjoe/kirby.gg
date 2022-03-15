<script setup>
import { ref, onMounted, computed } from 'vue'
import { firestore } from '../firebase.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { TrashIcon } from '@heroicons/vue/solid'

const props = defineProps({
  command: {
    name: String,
    response: String,
    on: Boolean,
    devMode: Boolean,
    subs: Boolean,
    followers: Boolean
  }
})

const responseEdit = ref(props.command.response)
const devMode = ref(props.command.devMode)
const on = ref(props.command.on)
const subs = ref(props.command.subs)
const followers = ref(props.command.followers)
const loading = ref(false)
const trashLoading = ref(false)

onMounted(() => {
  responseEdit.value = props.command.response

})
const buttonClass = "py-2 px-4 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl"
const trashClass = "max-h-8 max-w-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300"
const trashLoadingClass = computed(() => trashLoading.value ? "animate-bounce" : "")
const loadingClass = computed (() => loading.value ? "disabled bg-pink-200 animate-bounce" : "bg-pink-800" )

async function updateCommand() {
  loading.value = true
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    response: responseEdit.value
  }) 
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

async function toggleFollow() {
  await updateDoc(doc(firestore, 'commands', props.command.name), {
    followers: !props.command.followers
  })
}
</script>

<template>
  <div class="my-2 bg-pink-200 rounded-lg p-2 flex flex-row justify-evenly items-center text-center w-full">
    <div class="bg-blue-200 rounded-2xl px-4 py-2">
    <h2 class="text-xl">!{{ props.command.name }}</h2>
      </div>
    <input type="text" v-model="responseEdit" class="basis-3/5 bg-gray-200 border-2 p-2 rounded-lg text-lg xl:row-span-2" />
    <div class="flex flex-col align-center">
      <input id="onoff" v-model="on" @click="toggleCommandPower" class="ml-3 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="onoff" class="text-sm">On/Off</label>
    </div>
    <div class="flex flex-col align-center justify-center">
      <input id="devMode" v-model="devMode" @click="toggleDevMode" class="form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="devMode" class="text-sm">Devs</label>
    </div>
    <div class="flex flex-col align-center justify-center">
      <input id="subs" v-model="subs" @click="toggleSubs" class="ml-1 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="subs" class="text-sm">Subs</label>
    </div>
    <div class="flex flex-col align-center justify-center">
      <input id="follow" v-model="toggleFollow" @click="toggleFollow" class="ml-3 form-check-input w-6 h-6 rounded-lg bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
      <label for="follow" class="text-sm">Followers</label>
    </div>
    <button :class="[ buttonClass, loadingClass ]" @click="updateCommand" >Save</button>
    <TrashIcon :class="[ trashClass, trashLoadingClass ]" @click="deleteCommand" />
  </div>
</template>
