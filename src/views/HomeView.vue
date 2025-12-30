<template>
  <BaseHeader />
  <h1 class="title center">Мои расходы</h1>
  <div class="expenses center">
    <BaseTable />
    <NewExpense />
  </div>
</template>
<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTable from '@/components/BaseTable.vue'
import NewExpense from '@/components/NewExpense.vue'
import { inject, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
const currentPage = inject('currentPage')
const token = localStorage.getItem('token')
const router = useRouter()

currentPage.value = 'home'

if (!token || token === null) {
  router.push('/auth')
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !token) {
    next('/auth')
  } else {
    next()
  }
})
const editObj = ref({
  isEditing: false,
  currentExpense: {},
})
provide('editObj', editObj)
</script>
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
  margin-bottom: 40px;
}
@media (max-width: 1300px) {
  .center {
    padding-left: calc(50% - 500px);
    padding-right: calc(50% - 500px);
  }
  .title {
    font-size: 28px;
  }
}
@media (max-width: 1050px) {
  .center {
    padding-left: calc(50% - 400px);
    padding-right: calc(50% - 400px);
  }
  .title {
    font-size: 24px;
  }
}
@media (max-width: 850px) {
 .center {
    padding-left: calc(50% - 350px);
    padding-right: calc(50% - 350px);
  }
}

</style>
