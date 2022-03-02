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

const currentWindow = ref(0)

function toggleModal() { 
  signInModal.value = !signInModal.value
}

</script>

<template>

  <!-- Header Bar -->
  <nav class="bg-pink-800 m-6 rounded-lg shadow-xl text-xl text-pink-100">
    <!-- <span class="py-12">Kassandra.js</span> -->
    <div class="grid grid-cols-5 place-items-center pt-6">
      <div class="grid grid-rows-3 place-items-center">
        <div class="row-span-2">
          <img src="./assets/k9.jpg" @click="currentWindow = 0" class="h-24 w-28 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1 text-center">
          <span @click="currentWindow = 0">Home</span>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="./assets/k2.jpg" @click="currentWindow = 1" class="h-24 w-28 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <span @click="currentWindow = 1">Commands</span>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="./assets/k3.jpg" @click="currentWindow = 2" class="h-24 w-28 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <span @click="currentWindow = 2">Mod</span>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="./assets/k7.jpg" @click="currentWindow = 3" class="h-24 w-28 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <span @click="currentWindow = 3">???</span>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="./assets/k5.jpg" @click="signInModal = true" class="h-24 w-28 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <p v-if="user.username === ''" @click="signInModal = !signInModal" class="hover:text-blue-300">Sign In</p>
          <p v-else class="p-1 hover:text-blue-300">Sign Out</p>
        </div>
      </div>
    </div>
  </nav>


  <SignIn :signInModal="signInModal" @toggleModal="toggleModal" />

  <div v-if="user.email === ''" class="grid grid-cols-2 gap-4 bg-pink-300 mx-16 mt-12 pl-4 rounded-lg border-lg shadow-xl text-purple-900 text-center">
    <div class="relative bottom-20 left-12">
      <img src="./assets/kassandra.png" class="scale-75" />
    </div>
      <div>
    <div class="py-12 px-6 bg-pink-200 rounded-xl mt-24 mr-24">
      <span class="italic text-xl">Hey there!</span>
      <br />
      <br />
        <p class="text-lg">
        I'm <strong>Kassandra</strong>. 
        <br />
        Nice to meet you! I'm the official Twitch channel bot at
        <a href="https://twitch.tv/kcckirby" class="text-pink-900 hover:text-blue-900">Gaming With Kirby.</a>
        <br />
        If you'd like, you can check out my
        <button class="px-2 rounded-xl bg-pink-400">commands</button>,
        and be sure to tune in to the next stream!
        </p>
      </div>
        </div>
    </div>
  <div v-else>
    <PowerButton />
  </div>

</template>

<style>
</style>
