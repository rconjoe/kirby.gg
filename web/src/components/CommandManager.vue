<script setup>
import { ref, onMounted, computed } from 'vue'
import { firestore } from '../firebase.js'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { TrashIcon } from '@heroicons/vue/solid'

const props = defineProps({
  command: {
    name: String,
    response: String,
    on: Boolean
  }
})

const responseEdit = ref(props.command.response)
const loading = ref(false)
const trashLoading = ref(false)

onMounted(() => {
  responseEdit.value = props.command.response
})
const buttonClass = "col-span-1 py-2 px-4 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl"
const trashClass = "max-h-10 max-w-10 col-span-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300"
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

</script>

<template>
  <div class="grid grid-rows-1 grid-cols-9 gap-2 my-2 bg-pink-200 rounded-lg p-2 flex flex-row justify-items-stretch items-center text-center w-full">
    <h2 class="text-2xl col-span-1 pt-2">!{{ props.command.name }}</h2>
    <input type="text" v-model="responseEdit" class="bg-gray-200 col-span-5 border-2 w-full p-2 rounded-lg text-lg xl:row-span-2" />
    <button :class="[ buttonClass, loadingClass ]" @click="updateCommand" >Save</button>
    <TrashIcon :class="[ trashClass, trashLoadingClass ]" @click="deleteCommand" /><div class="flex justify-center">
    <div class="form-check form-switch col-span-1">
      <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" checked>
    </div>
</div>
  </div>
</template>
