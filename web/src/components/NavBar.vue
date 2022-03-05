<script setup>
  defineProps({
    uid: String
  })

</script>

<template>
  <nav class="bg-pink-800 mx-6 my-8 rounded-lg shadow-xl text-xl text-pink-100">
    <!-- <span class="py-12">Kassandra.js</span> -->
    <div class="grid grid-cols-6 place-items-center pt-6">
      <div class="grid grid-rows-3 place-items-center">
        <div class="row-span-2">
          <img src="../assets/k9.jpg" @click="$emit('setWindow', 0)" class="h-20 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1 text-center">
          <a class="hover:text-blue-300" @click="$emit('setWindow', 0)">Home</a>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="../assets/k2.jpg" @click="$emit('setWindow', 1)" class="h-20 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <a class="hover:text-blue-300" @click="$emit('setWindow', 1)">Commands</a>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="../assets/k3.jpg" @click="$emit('setWindow', 2)" class="h-20 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <a class="hover:text-blue-300" @click="$emit('setWindow', 2)">Mod</a>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="../assets/k7.jpg" @click="$emit('setWindow', 3)" class="h-20 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <a class="hover:text-blue-300" @click="$emit('setWindow', 3)">???</a>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="../assets/k8.jpg" @click="$emit('setWindow', 3)" class="h-20 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <a class="hover:text-blue-300" @click="$emit('setWindow', 3)">???</a>
        </div>
      </div>
      <div class="grid grid-rows-3 text-center">
        <div class="row-span-2">
          <img src="../assets/k5.jpg" @click="$emit('modal')" class="h-20 w-24 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300" />
        </div>
        <div class="row-span-1">
          <a v-if="uid === ''" @click="$emit('modal')" class="hover:text-blue-300">Sign In</a>
          <a v-else class="p-1 hover:text-blue-300" @click="$emit('modal')">Sign Out</a>
        </div>
      </div>
    </div>
  </nav>
</template>
