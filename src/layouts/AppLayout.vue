<template>
  <RouterView></RouterView>
</template>
<script setup>
import { provide, ref } from 'vue'

const currentPage = ref('')
provide('currentPage', currentPage)
const expenses = ref([])
provide('expenses', expenses)
</script>
