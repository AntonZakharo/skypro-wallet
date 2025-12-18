<template>
  <div class="expenses-table">
    <h2 class="expenses-table__title">{{ total - 1 }}₽</h2>
    <p class="expenses-table__text">
      Расходы за
      <span v-if="isDate" class="expenses-table__text_bold"
        >{{ startDate.day }} {{ monthNames[startDate.month - 1] }} {{ startDate.year }}</span
      >
      <span v-if="endDate" class="expenses-table__text_bold">
        — {{ endDate.day }} {{ monthNames[endDate.month - 1] }} {{ endDate.year }}</span
      >
    </p>
    <BaseDiagram :expenses="filteredExps"></BaseDiagram>
  </div>
</template>
<script setup>
import { computed, inject, provide, ref, watch } from 'vue'
import BaseDiagram from './BaseDiagram.vue'
import { getExpenses } from '@/services/api'

const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

const total = ref(0)
provide('total', total)

const currentDates = inject('date')
const startDate = computed(() => currentDates.value[0])
const endDate = computed(() => {
  return currentDates.value.length > 1 ? currentDates.value[currentDates.value.length - 1] : false
})
const isDate = computed(() => startDate.value !== undefined)

const expenses = ref([])
const filteredExps = ref([])
getExpenses(expenses)
watch(
  () => currentDates.value,
  async () => {
    filteredExps.value = []
    currentDates.value.forEach((selectedDate) => {
      expenses.value.forEach((exp) => {
        const d = new Date(exp.date)
        if (
          d.getFullYear() === selectedDate.year &&
          d.getMonth() + 1 === selectedDate.month &&
          d.getDate() === selectedDate.day
        ) {
          filteredExps.value.push(exp)
        }
      })
    })
  },
  { immediate: true }, // запустит фильтрацию при загрузке компонента
)
</script>
<style scoped lang="scss">
.expenses-table {
  background-color: #fff;
  border-radius: 30px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    margin-bottom: 12px;
  }
  &__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    color: #999999;
    margin-bottom: 21px;
    &_bold {
      font-weight: 600;
    }
  }
}
.table {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px;
  height: 100%;
  &__column {
    display: flex;
    gap: 12px;
    flex-direction: column;
    align-self: end;
    &-name {
      font-weight: 400;
      font-size: 12px;
      line-height: 100%;
      text-align: center;
    }
    &-price {
      font-weight: 600;
      font-size: 16px;
      line-height: 100%;
      text-align: center;
    }
    &-progress {
      border-radius: 12px;
    }
  }
}
._purple {
  background-color: #d9b6ff;
  height: 328px;
}
._orange {
  background-color: #ffb53d;
  height: 169px;
}
._blue {
  background-color: #6ee4fe;
  height: 4px;
}
._violet {
  background-color: #b0aeff;
  height: 109px;
}
._green {
  background-color: #bcec30;
  height: 65px;
}
._pink {
  background-color: #ffb9b8;
  height: 212px;
}
</style>
