<script setup>
import { ref, reactive } from 'vue'
import Home from './components/Home.vue'
import SignIn from './components/SignIn.vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import PowerButton from './components/PowerButton.vue'
import TwitchPlayer from './components/TwitchPlayer.vue'
import Chat from './components/Chat.vue'
import ButtonPanel from './components/ButtonPanel.vue'
import Commands from './components/Commands.vue'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

onAuthStateChanged(auth, (userCred) => {
  if (userCred) {
    console.log(userCred)
  }
})
const signInModal = ref(false)
const user = reactive({
  username: "",
  twitch_username: "",
  uid: "",
  email: "",
  flags: []
})

const currentWindow = ref(0)

function setWindow(i) {
  console.log(i)
  return currentWindow.value = i
}

function toggleModal() { 
  signInModal.value = !signInModal.value
}

</script>

<template>

  <!-- Header Bar -->
  <NavBar :uid="user.uid" @setWindow="setWindow" @modal="toggleModal" />

  <SignIn :signInModal="signInModal" @toggleModal="toggleModal" />

  <div class="grid grid-flow-row-dense row-span-3 flex justify-center align-items-center">
    <div class="flex flex-col justify-center items-center">
      <!-- <div class="mb-8"> -->
        <TwitchPlayer />
      <ButtonPanel />
      <!-- </div> -->
    </div>
    <Home v-if="currentWindow === 0"/>
    <Commands v-if="currentWindow === 1"/>
  </div>

</template>

<style>
</style>
