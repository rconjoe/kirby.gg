<script setup>

</script>

<template>
  <div class="flex flex-row m-1 col-span-4 justify-center lg:ml-4">
    <input type="text" placeholder="Say something (as Kassandra)!" class="bg-gray-200 border-2 w-full p-2 text-lg rounded-lg xl:row-span-2" />
    <button @click="sayAsKassandra" class="px-4 ml-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Send</button>
  </div>
</template>

