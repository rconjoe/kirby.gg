<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import SignIn from './components/SignIn.vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import PowerButton from './components/PowerButton.vue'
import TwitchPlayer from './components/TwitchPlayer.vue'
import Chat from './components/Chat.vue'
import Commands from './components/Commands.vue' 
import Unauthorized from './components/Unauthorized.vue'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthState } from './store/useAuthState.js'

const authState = useAuthState()

onAuthStateChanged(auth, (userCred) => {
  if (userCred) {
    authState.setUser(userCred)
  }
  else {
    authState.$reset()
  }
})

const signInModal = ref(false)

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
  <NavBar :uid="authState.user.uid" @setWindow="setWindow" @modal="toggleModal" />

  <SignIn :signInModal="signInModal" @toggleModal="toggleModal" />

  <div class="grid grid-flow-row-dense row-span-3 flex justify-center align-items-center">
    <div class="flex flex-col justify-center items-center">
      <!-- <div class="mb-8"> -->
        <TwitchPlayer />
      <!-- </div> -->
    </div>
    <Home v-if="currentWindow === 0"/>
    <Commands v-if="currentWindow === 1 && authState.uid !== ''"/>

    <Unauthorized v-if="[1,2,3,4].some((window) => currentWindow === window) && authState.uid === ''" />

  </div>

</template>

<style>
</style>
