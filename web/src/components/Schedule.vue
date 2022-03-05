<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { ref, onMounted } from 'vue'

dayjs.extend(utc)
dayjs.extend(timezone)

const schedule = ref([])

onMounted(async () => {
  const resp = await axios.get('https://api.twitch.tv/helix/schedule?broadcaster_id=18846157', {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
      'Client-Id': `${import.meta.env.VITE_ID}`
    }
  })
  for (let i = 0; i < 5; i++) {
    schedule.value.push(resp.data.data.segments[i])
  }
})

</script>

<template>
  <div v-for="stream in schedule" :key="id" class="bg-pink-200 text-pink-900 p-2 my-4 justify-items-center items-center rounded-lg shadow-lg">
    <p><strong>{{ stream.title }}</strong></p>
    <p>{{ dayjs(stream.start_time).tz('America/New_York').format('ddd M/D h:mma') }}</p>
    </div>
</template>
