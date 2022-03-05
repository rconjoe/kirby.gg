<script setup>
import { useScriptTag } from '@vueuse/core'

useScriptTag(
  'https://player.twitch.tv/js/embed/v1.js',
  (el) => {
    new window.Twitch.Player("twitch-embed", {
      channel: 'kcckirby',
      height: 380,
      width: 680,
      theme: "dark"
    })
  }
)
</script>

<template>
  <div class="ml-8 bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 p-6 rounded-xl">
    <div id="twitch-embed"></div>
  </div>
</template>
