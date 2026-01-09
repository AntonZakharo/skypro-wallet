<script setup>
import BaseCalendar from '@/components/BaseCalendar.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const currentPage = inject('currentPage')
currentPage.value = 'analytics'
const router = useRouter()
if (window.innerWidth > 670) {
  router.push('/')
}
</script>

<template>
  <div class="calendar-page">
    <BaseHeader />
    <BaseCalendar />
  </div>
</template>
<style scoped>
.calendar-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
