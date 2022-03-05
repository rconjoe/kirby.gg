<script setup>
import { ref } from 'vue'
import { XIcon } from '@heroicons/vue/solid'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth'

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

  <!-- This provides the gray overlay effect when active. -->
  <div v-if="signInModal" class="fixed inset-0 w-200 h-400 flex items-center justify-center bg-gray-900">
    <!-- The actual content for signin. -->
    <div class="relative p-6 bg-gray-300 ml-32 mr-20 my-4 rounded-lg border-lg text-black opacity-100">

      <!-- The form -->
      <div class="mb-4"><h1>Let's get you signed in!</h1></div>
      <input type="text" v-model="email" placeholder="Email please :3" class="my-2 bg-gray-100 border-2 w-full p-4 rounded-lg">
      <input type="password" v-model="password" placeholder="Password...I won't tell!" class="my-2 bg-gray-100 border-2 w-full p-4 rounded-lg">

      <div class="flex justify-end">
        <button @click="signIn" class="py-2 px-8 mt-4 bg-pink-800 rounded-lg text-white hover:shadow-xl">Submit</button>
      </div>
      <XIcon v-if="signInModal" @click="$emit('toggleModal')" class="h-8 w-8 absolute top-0 right-0 mt-2 mr-2" />
    </div>
  </div>
</template>

