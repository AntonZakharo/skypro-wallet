<template>
  <BaseHeader />
  <div class="title-new-expense">
    <h1 class="title center">Мои расходы</h1>
    <RouterLink to="/new-expense"
      ><div class="mobile-new-expense-btn">
        <img
          src="../assets/icons/add-circle.svg"
          class="mobile-new-expense-btn__btn"
          alt="add-btn"
        />
        <p class="mobile-new-expense-btn__text">Новый расход</p>
      </div>
    </RouterLink>
  </div>

  <div class="table-new-expense center">
    <BaseTable />
    <div class="new-expense">
      <NewExpense />
    </div>
  </div>
</template>
<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTable from '@/components/BaseTable.vue'
import NewExpense from '@/components/NewExpense.vue'
import { inject } from 'vue'
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
</script>
<style scoped lang="scss">
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
.table-new-expense {
  display: grid;
  grid-template-columns: 8fr 4fr;
  margin-bottom: 40px;
}
.mobile-new-expense-btn {
  display: none;
  &__text {
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    letter-spacing: 0px;
  }
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
  .title {
    margin: 0;
  }
  .new-expense {
    display: none;
  }
  .table-new-expense {
    display: block;
  }
  .mobile-new-expense-btn {
    display: flex;
    gap: 6px;
    cursor: pointer;
  }
  .title-new-expense {
    display: flex;
    align-items: last baseline;
    justify-content: space-between;
    margin: 23px 16px;
  }
}
</style>
