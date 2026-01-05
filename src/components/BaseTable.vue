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
      <BaseLoader v-if="loading"></BaseLoader>
      <div v-else class="expenses__block">
        <div
          v-for="e in expenses"
          :key="e._id"
          class="expense"
          :class="{ _checked: checkedExpense === e }"
          @click="checkExpense(e)"
        >
          <p class="expense__text">{{ e.description }}</p>
          <p class="expense__text">{{ categories[e.category] }}</p>
          <p class="expense__text">{{ formatDate(e.date) }}</p>
          <div class="expense__text">
            {{ e.sum }} ₽
            <div class="expense__imgs">
              <img
                src="../assets/icons/delete.svg"
                alt=""
                @click="remove(e)"
                class="expense__img expense__img_delete"
              />
              <img
                src="../assets/icons/edit.png"
                alt=""
                @click="turnEditMode(e)"
                class="expense__img expense__img_edit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseButton
    v-if="JSON.stringify(checkedExpense) !== JSON.stringify({}) && windowSize < 671"
    class="delete-btn"
    @click="remove(checkedExpense)"
    >Удалить расход</BaseButton
  >
  <img
    @click="turnEditModeMobile(checkedExpense)"
    v-if="JSON.stringify(checkedExpense) !== JSON.stringify({}) && windowSize < 671"
    src="../assets/icons/edit.png"
    class="edit-img"
    alt="edit"
    title="Изменить расход"
  />
</template>
<script setup>
import { getExpenses, deleteExpense } from '@/services/api'
import { computed, inject, ref } from 'vue'
import BaseLoader from './BaseLoader.vue'
import BaseButton from './BaseButton.vue'
import { useRouter } from 'vue-router'
const categories = {
  food: 'Еда',
  transport: 'Транспорт',
  housing: 'Жилье',
  joy: 'Развлечения',
  education: 'Образование',
  others: 'Другое',
}
const router = useRouter()
const loading = ref(true)
const expenses = inject('expenses')
const editObj = inject('editObj')
getExpenses(expenses).then(() => {
  loading.value = false
})
const checkedExpense = ref({})
const windowSize = computed(() => window.innerWidth)
function checkExpense(expense) {
  if (expense == checkedExpense.value) {
    checkedExpense.value = {}
  } else {
    checkedExpense.value = expense
  }
}

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
function remove(expense) {
  try {
    console.log(expense)
    deleteExpense(expense._id).then((exps) => {
      expenses.value = exps
    })
    checkedExpense.value = {}
  } catch (err) {
    console.log(err)
  }
}

function turnEditMode(expense) {
  editObj.value.isEditing = true
  editObj.value.currentExpense = expense
}
function turnEditModeMobile(expense) {
  editObj.value.isEditing = true
  editObj.value.currentExpense = expense
  router.push('/new-expense')
  console.log(editObj.value)
}
</script>

<style scoped lang="scss">
.main {
  background-color: white;
  border-radius: 30px;
  margin-right: 34px;
}
.title {
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  padding: 32px 0;
  padding-left: 32px;
}
.expenses {
  &__titles {
    display: grid;
    padding: 0 32px;
    padding-bottom: 6px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    position: relative;

    max-width: 702px;
    &::after {
      content: '';
      border-bottom: 0.5px solid #999;
      left: 0;
      right: 0;
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
    padding: 18px 32px;
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
}
.expense {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 14px;

  &__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
  }
  &__img {
    cursor: pointer;
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 670px) {
  .title {
    display: none;
  }

  .main {
    margin-right: 0;
  }
  .expenses {
    &__block {
      padding: 0;
      padding-top: 14px;
    }
    &__titles {
      padding: 0 16px;
      padding-bottom: 6px;
    }
    &__title {
      display: flex;
      font-size: 10px;
      &:nth-child(3),
      &:nth-child(4) {
        justify-content: end;
      }
    }
  }
  .expense {
    padding: 6px 16px;
    margin-bottom: 4px;
    cursor: pointer;
    &__img {
      display: none;
    }
    &__text {
      font-size: 10px;
      &:nth-child(3),
      &:nth-child(4) {
        justify-content: end;
      }
    }
  }
  ._checked {
    background-color: #f1ebfd !important;
    color: #7334ea;
  }
  .edit-img {
    width: 36px;
    height: 36px;
    position: absolute;
    bottom: 24px;
    right: 16px;
  }
}
</style>
