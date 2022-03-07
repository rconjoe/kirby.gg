<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  command: {
    name: String,
    response: String,
    on: Boolean
  }
})

const commandEdit = ref(props.command.name)
const responseEdit = ref(props.command.response)

onMounted(() => {
  commandEdit.value = props.command.name
  responseEdit.value = props.command.response
})

</script>

<template>
  <div class="grid grid-rows-1 grid-cols-8 gap-2 my-2">
    <input type="text" v-model="commandEdit" placeholder="!command" class="col-span-2 bg-gray-200 border-2 w-full p-4 rounded-lg xl:row-span-2" />
    <input type="text" v-model="responseEdit" placeholder="Response...use $user to substitute invoker's Twitch name" class="bg-gray-200 col-span-5 border-2 w-full p-4 rounded-lg xl:row-span-2" />
    <button @click="" class="col-span-1 px-4 ml-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Save</button>
  </div>
</template>
