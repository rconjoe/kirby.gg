<script setup>
import { ref, computed } from 'vue'

const devMode = ref(false)

const devModeClass = computed(() => devMode.value ? 'bg-green-700' : 'bg-red-700' )
const buttonClass = 'py-4 px-8 m-1 rounded-lg border-2 border-gray-700 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300'
</script>

<template>
  <button :class="[ devModeClass, buttonClass ]" @click="devMode = !devMode">DevMode</button>
</template>
