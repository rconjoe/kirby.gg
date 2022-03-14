<script setup>
import Schedule from './Schedule.vue'
</script>

<template>    
    <div class="flex flex-col-auto items-center justify-evenly bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 rounded-xl p-12">
      <img src="../assets/kassandra.png" class="max-w-xs xl:max-w-sm"/>
      <div class="mx-24 text-center">
        <p class="text-lg xl:text-xl">Hi! <br />I'm <strong>Kassandra!</strong></p>
        <p class="text-lg xl:text-xl">I'm the official bot for <a class="text-blue-700 hover:text-pink-900" href="https://twitch.tv/KCCKirby">Gaming With Kirby</a>.</p>
        <p class="pt-4 pb-2 text-lg xl:text-xl">Here's what Kirby told me about the schedule...</p>
      <Schedule />
      </div>
    </div>
</template>
