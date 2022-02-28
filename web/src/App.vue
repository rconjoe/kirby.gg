<script setup>
import { ref } from 'vue'
import PowerButton from './components/PowerButton.vue'
import SignIn from './components/SignIn.vue'

const signInModal = ref(false)

</script>

<template>

  <!-- Header Bar -->
  <nav class="p-6 bg-pink-900 flex justify-between m-6 rounded-lg text-white">
    <span class="p-1">Kassandra.js</span>
    <p @click="signInModal = !signInModal" class="p-1 hover:text-blue-300">Sign In</p>
  </nav>


    <SignIn :signInModal="signInModal" />

    <!-- Button Row -->
  <div class="flex justify-center">
    <PowerButton />
  </div>

</template>

<style>
</style>
