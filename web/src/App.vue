<script setup>
import { ref, reactive } from 'vue'
import PowerButton from './components/PowerButton.vue'
import SignIn from './components/SignIn.vue'

const signInModal = ref(false)
const user = reactive({
  username: "",
  twitch_username: "",
  uid: "",
  email: "",
  flags: []
})

function toggleModal() { 
  signInModal.value = !signInModal.value
}

</script>

<template>

  <!-- Header Bar -->
  <nav class="p-6 bg-pink-900 flex justify-between m-6 rounded-lg text-white">
    <span class="p-1">Kassandra.js</span>
    <p v-if="user.username === ''" @click="signInModal = !signInModal" class="p-1 hover:text-blue-300">Sign In</p>
    <p v-else class="p-1 hover:text-blue-300">Sign Out</p>
  </nav>


    <SignIn :signInModal="signInModal" @toggleModal="toggleModal" />

    <!-- Button Row -->
  <div class="flex justify-center">
    <PowerButton />
  </div>

</template>

<style>
</style>
