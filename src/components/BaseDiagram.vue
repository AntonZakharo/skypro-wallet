<template>
  <div class="chart">
    <div class="bar" v-for="item in chartData" :key="item.key">
      <div class="value">{{ item.value }} ₽</div>

      <div
        class="bar-line"
        :style="{
          height: (item.value / total) * 346 + 4 + 'px',
          backgroundColor: item.color,
        }"
      ></div>

      <div class="label">{{ item.label }}</div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  expenses: Array,
})

const total = inject('total')

const categories = {
  food: { label: 'Еда', color: '#D6B5FF' },
  transport: { label: 'Транспорт', color: '#FFB74D' },
  housing: { label: 'Жилье', color: '#00BCD4' },
  joy: { label: 'Развлечения', color: '#B2B8FF' },
  education: { label: 'Образование', color: '#D4FF57' },
  others: { label: 'Другое', color: '#FFB2B2' },
}

const grouped = computed(() => {
  const result = {}
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  total.value = 1
  Object.keys(categories).forEach((k) => (result[k] = 0))

  props.expenses.forEach((exp) => {
    result[exp.category] += exp.sum
    total.value += exp.sum
  })

  return result
})

const chartData = computed(() => {
  return Object.keys(categories).map((key) => ({
    key,
    label: categories[key].label,
    color: categories[key].color,
    value: grouped.value[key],
  }))
})
</script>
<style scoped>
.chart {
  display: flex;
  gap: 30px;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
}

.bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  margin-bottom: 10px;
  font-weight: bold;
}

.bar-line {
  width: 70px;
  border-radius: 20px;
  transition: 0.3s;
}

.label {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}
</style>
