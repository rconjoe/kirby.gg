<script setup>
import Schedule from './Schedule.vue'
</script>

<template>    
    <div class="mr-8 bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 rounded-xl p-12 flex flex-row">
      <img src="../assets/kassandra.png" class="max-w-xs"/>
      <div class="ml-10 text-center">
        <p class="py-4">Hi! <br />I'm <strong>Kassandra!</strong></p>
        <p>I'm the official bot for <a class="text-blue-700 hover:text-pink-900" href="https://twitch.tv/KCCKirby">Gaming With Kirby</a>.</p>
        <p class="pt-4">Here's what Kirby told me about the schedule...</p>
        <p class="pb-4">All times are in EST!</p>
      <Schedule />
      </div>
    </div>
</template>
