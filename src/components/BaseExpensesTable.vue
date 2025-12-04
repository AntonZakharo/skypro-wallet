<template>
  <div class="expenses-table">
    <h2 class="expenses-table__title">9 581 ₽</h2>
    <p class="expenses-table__text">
      Расходы за
      <span v-if="isDate" class="expenses-table__text_bold"
        >{{ startDate.day }} {{ monthNames[startDate.month] }} {{ startDate.year }}</span
      >
      <span v-if="endDate" class="expenses-table__text_bold">
        — {{ endDate.day }} {{ monthNames[endDate.month] }} {{ endDate.year }}</span
      >
    </p>
    <div class="table">
      <div v-for="(column, index) in columns" :key="index" class="table__column">
        <div class="table__column-price">{{ column['price'] }} ₽</div>
        <div class="table__column-progress" :class="`_${column['color']}`"></div>
        <div class="table__column-name">{{ column['name'] }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue'

const columns = [
  {
    name: 'Еда',
    price: 3590,
    color: 'purple',
  },
  {
    name: 'Транспорт',
    price: 1835,
    color: 'orange',
  },
  {
    name: 'Жилье',
    price: 0,
    color: 'blue',
  },
  {
    name: 'Развлечения',
    price: 1250,
    color: 'violet',
  },
  {
    name: 'Образование',
    price: 600,
    color: 'green',
  },
  {
    name: 'Другое',
    price: 2306,
    color: 'pink',
  },
]

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

const currentDate = inject('date')
const startDate = computed(() => currentDate.value[0])
const endDate = computed(() => {
  return currentDate.value.length > 1 ? currentDate.value[currentDate.value.length - 1] : false
})
const isDate = computed(() => startDate.value !== undefined)
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
