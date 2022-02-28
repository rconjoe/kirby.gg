<script setup>
import { ref, computed } from 'vue'

const on = ref(true)

const powerClass = computed(() => on.value ? 'bg-green-700' : 'bg-red-700' )
const buttonClass = 'py-10 px-16 rounded-lg text-white hover:shadow-xl'

function togglePower() {
  on.value = !on.value
}
</script>

<template>
  <button :class="[ powerClass, buttonClass ]" @click="togglePower">{{ on ? 'On' : 'Off' }}</button>
</template>
