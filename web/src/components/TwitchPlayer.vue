<script setup>
import { useScriptTag } from '@vueuse/core'

useScriptTag(
  'https://player.twitch.tv/js/embed/v1.js',
  (el) => {
    new window.Twitch.Player("twitch-embed", {
      channel: 'kcckirby',
      height: 400,
      width: 680,
      theme: "dark"
    })
  }
)
</script>

<template>
  <div id="twitch-embed"></div>
</template>
