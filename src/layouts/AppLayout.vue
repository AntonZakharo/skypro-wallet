<template>
  <RouterView></RouterView>
</template>
<script setup>
import { provide, ref } from 'vue'

const currentPage = ref('')
provide('currentPage', currentPage)
</script>
