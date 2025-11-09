<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTable from '@/components/BaseTable.vue'
import NewExpense from '@/components/NewExpense.vue'
</script>

<template>
  <BaseHeader />
  <h1 class="title center">Мои расходы</h1>
  <div class="expenses center">
    <BaseTable />
    <NewExpense />
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
.expenses {
  display: grid;
  grid-template-columns: 8fr 4fr;
}
</style>
