<script setup>
import { ref, reactive } from 'vue'
import Home from './components/Home.vue'
import SignIn from './components/SignIn.vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'

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

  <!-- <Hero v-if="user.email === ''" /> -->
  <Home />

</template>

<style>
</style>
