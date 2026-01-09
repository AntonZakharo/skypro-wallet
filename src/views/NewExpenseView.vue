<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import NewExpense from '@/components/NewExpense.vue'
import { inject } from 'vue'
const currentPage = inject('currentPage')
currentPage.value = 'new-expense'
</script>

<template>
  <BaseHeader></BaseHeader>
  <NewExpense></NewExpense>
</template>
