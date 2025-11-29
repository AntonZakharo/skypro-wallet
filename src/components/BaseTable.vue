<template>
  <div class="main">
    <h2 class="title">Таблица расходов</h2>
    <div class="expenses">
      <div class="expenses__titles">
        <p class="expenses__title">Описание</p>
        <p class="expenses__title">Категория</p>
        <p class="expenses__title">Дата</p>
        <p class="expenses__title">Сумма</p>
      </div>
      <div class="expenses__block">
        <div v-for="e in expenses" :key="e._id" class="expense">
          <p class="expense__text">{{ e.description }}</p>
          <p class="expense__text">{{ categories[e.category] }}</p>
          <p class="expense__text">{{ formatDate(e.date) }}</p>
          <p class="expense__text">
            {{ e.sum }}₽
            <img src="../assets/icons/delete.svg" alt="" class="expense__img" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getExpenses } from '@/serivces/api'
import { inject } from 'vue'
const categories = {
  food: 'Еда',
  transport: 'Транспорт',
  housing: 'Жилье',
  joy: 'Развлечения',
  education: 'Образование',
  others: 'Другое',
}
const expenses = inject('expenses')
getExpenses(expenses)

function formatDate(date) {
  date = new Date(date)
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }

  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }

  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
</script>
<style scoped lang="scss">
.main {
  background-color: white;
  border-radius: 30px;
  margin-right: 34px;
  padding-bottom: 0;
}
.title {
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  margin-bottom: 32px;
  margin-top: 32px;
  margin-left: 32px;
}
.expenses {
  &__titles {
    display: grid;
    padding-bottom: 6px;
    grid-template-columns: repeat(4, 1fr);
    position: relative;
    margin-left: 32px;
    margin-right: 32px;
    max-width: 702px;

    &::after {
      content: '';
      border-bottom: 0.5px solid #999;
      left: -32px;
      right: -32px;
      bottom: 0;
      position: absolute;
    }
  }
  &__title {
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    color: #999999;
  }
  &__block {
    overflow-y: auto;
    height: 479px;
    padding: 18px 32px;
    max-width: 702px;
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
}
.expense {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 14px;
  min-width: 702px;

  &__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    display: flex;
    position: relative;
  }
  &__img {
    margin-left: 145px;
    position: absolute;
  }
}
</style>
