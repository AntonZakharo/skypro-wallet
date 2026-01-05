<script setup>
import AuthForm from '@/components/AuthForm.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { inject } from 'vue'
const currentPage = inject('currentPage')
currentPage.value = 'auth'
</script>

<template>
  <BaseHeader :isAuth="true"></BaseHeader>
  <div class="main">
    <AuthForm />
  </div>
</template>
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: calc(100vh - 64px);
}
@media (max-width: 670px) {
  .main {
    background-color: #fff;
  }
}
</style>
