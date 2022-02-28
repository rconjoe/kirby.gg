<script setup>
import { ref } from 'vue'

const props = defineProps({
  signInModal: Boolean
})

const email = ref("")
const password = ref("")

function signIn() {
  console.log(email.value, password.value)
}

</script>


<template>
  <div v-if="signInModal" class="fixed inset-0 w-200 h-400 flex items-center justify-center bg-gray-900 opacity-75">
    <div class="p-6 bg-gray-200 mx-24 my-4 rounded-lg border-lg text-black">
      <div class="mb-4"><h1>Sign In</h1></div>
      <input type="text" v-model="email" placeholder="Email please :3" class="bg-gray-100 border-2 w-full p-4 rounded-lg">
      <input type="password" v-model="password" placeholder="Password...I won't tell!" class="bg-gray-100 border-2 w-full p-4 rounded-lg">
      <button @click="signIn">Submit</button>
      <button @click="$emit('toggleModal')">Close</button>
    </div>
  </div>
</template>

