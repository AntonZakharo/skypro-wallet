<template>
  <div class="calendar">
    <h2 class="calendar__text">Период</h2>
    <div class="calendar__titles">
      <p class="calendar__title">пн</p>
      <p class="calendar__title">вт</p>
      <p class="calendar__title">ср</p>
      <p class="calendar__title">чт</p>
      <p class="calendar__title">пт</p>
      <p class="calendar__title">сб</p>
      <p class="calendar__title">вс</p>
    </div>
    <div class="calendar__list">
      <div v-for="(dateObj, index) in calendarDates" :key="index" class="calendar__block">
        <h3 class="calendar__month">{{ monthNames[dateObj.month] }} {{ dateObj.year }}</h3>
        <div class="calendar__dates">
          <div
            v-for="(date, ind) in dateObj.days"
            :key="ind"
            class="calendar__date"
            :class="{
              '_other-month': date.otherMonth,
            }"
          >
            {{ date.day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function generateDaysForMonth(month, year) {
  const firstDayOfMonth = new Date(year, month, 1)

  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7
  const totalDays = getDaysInMonth(year, month)

  const days = []

  const prevMonthDays = getDaysInMonth(year, month - 1)
  for (let i = startDayIndex - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, otherMonth: true })
  }

  for (let d = 1; d <= totalDays; d++) {
    days.push({
      day: d,
      otherMonth: false,
    })
  }

  let remaining = 0
  if (days.length > 35) {
    remaining = 42 - days.length
  } else {
    remaining = 35 - days.length
  }
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: remaining - i,
      otherMonth: true,
    })
  }

  return days
}

const calendarDates = computed(() => {
  let dates = []
  for (let i = 12; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - i, 1)
    const month = date.getMonth()
    const year = date.getFullYear()

    dates.push({
      month: month,
      year: year,
      days: generateDaysForMonth(month, year),
    })
  }
  return dates
})
</script>
<style scoped lang="scss">
.calendar {
  background-color: white;
  border-radius: 30px;
  width: 379px;
  &__text {
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    margin-bottom: 24px;
    margin-top: 32px;
    margin-left: 32px;
  }
  &__titles {
    display: grid;
    padding-bottom: 6px;
    grid-template-columns: repeat(7, 1fr);
    position: relative;
    margin-left: 32px;
    margin-right: 32px;
    max-width: 702px;
    color: #999;
    gap: 6px;

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
    text-align: center;
    width: 40px;
  }
  &__month {
    margin-left: 32px;
    margin-top: 24px;
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
  }
  &__dates {
    margin-left: 32px;
    margin-right: 32px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }
  &__date {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(244, 245, 246, 1);
    text-align: center;
    line-height: 40px;
    font-weight: 400;
    font-size: 12px;
  }
  &__list {
    overflow-y: auto;
    height: 427px;
  }
}
._chosen {
  background-color: rgba(241, 235, 253, 1);
  color: rgba(115, 52, 234, 1);
}
._other-month {
  opacity: 0;
}
</style>
