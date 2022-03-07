<script setup>
import { ref, computed } from 'vue'

const loading = ref(false)

function doTheThing() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 5000)
}

const resetButtonClass = "py-4 px-8 m-1 rounded-lg border-2 border-gray-700 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300 "
const disable = computed (() => loading.value ? "disabled bg-red-400 animate-bounce" : "bg-red-700" )
</script>

<template>
  <button :class="[ resetButtonClass, disable ]" @click="doTheThing">{{ loading ? "One sec!" : "Reset" }}</button>
</template>
