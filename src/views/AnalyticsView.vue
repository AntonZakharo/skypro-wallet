<script setup>
import BaseCalendar from '@/components/BaseCalendar.vue'
import BaseExpensesTable from '@/components/BaseExpensesTable.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const currentPage = inject('currentPage')
const token = localStorage.getItem('token')
const router = useRouter()
currentPage.value = 'analytics'
if (!token || token === null) {
  router.push('/auth')
}
</script>

<template>
  <BaseHeader />
  <h1 class="title center">Анализ расходов</h1>
  <div class="main center">
    <BaseCalendar />
    <BaseExpensesTable />
  </div>
</template>
<style scoped>
.title {
  font-weight: 700;
  font-size: 32px;
  line-height: 150%;
  letter-spacing: 0px;
  margin-top: 36px;
  margin-bottom: 32px;
}
.center {
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
}
.main {
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: 32px;
}
</style>
