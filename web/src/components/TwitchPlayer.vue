<script setup>
import { useScriptTag } from '@vueuse/core'
import Chat from './Chat.vue'

useScriptTag(
  'https://player.twitch.tv/js/embed/v1.js',
  (el) => {
    new window.Twitch.Player("twitch-embed", {
      channel: 'kcckirby',
      height: 400,
      width: 800,
      theme: "dark"
    })
  }
)
</script>

<template>
  <div class="flex flex-col xl:flex-row gap-2 justify-center items-center mb-6 bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 p-4 rounded-xl mx-8">
    <div id="twitch-embed" class="border-2 border-x-pink-600 border-y-pink-800"></div>
    <Chat />
  </div>
</template>
