<script setup>
import { ref, computed } from 'vue'

const loading = ref(false)
const loadingClass = computed (() => loading.value ? "disabled bg-orange-200 animate-bounce" : "bg-orange-400" )
const buttonClass = 'py-4 px-8 m-1 rounded-lg border-2 border-gray-700 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300'

function doTheThing() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 5000)
}
</script>

<template>
  <button :class="[ loadingClass, buttonClass ]" @click="doTheThing">Greet</button>
</template>
