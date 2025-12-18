<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
import BaseHeader from '@/components/BaseHeader.vue'
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
  align-items: center;
  justify-content: center;
}
</style>
