<template>
  <div
    class="main"
    :style="{
      outline: editObj.isEditing ? '1px solid black' : 'none',
    }"
  >
    <RouterLink to="/" @click="turnEditModeOff" class="back-btn">
      <img src="../assets/icons/back.svg" alt="back" />
      <p class="back-btn__text">Мои расходы</p>
    </RouterLink>
    <div class="block">
      <h2 class="title" v-if="currentPage !== 'home' && editObj.isEditing">Изменить расход</h2>
      <h2 class="title" v-if="currentPage !== 'home' && !editObj.isEditing">Новый расход</h2>
      <img
        v-if="editObj.isEditing && currentPage === 'home'"
        @click="turnEditModeOff"
        src="../assets/icons/reject.png"
        alt="img"
        class="exit-btn"
      />
    </div>

    <div class="form">
      <label class="form__text" for="description">Описание</label>
      <input
        class="form__input"
        type="text"
        name="description"
        v-model="description"
        placeholder="Введите описание"
        :class="{
          _error: isError,
        }"
      />
      <p class="form__text">Категория</p>
      <div class="form__categories">
        <div
          @click="chooseCategory('food')"
          class="form__category"
          :class="{
            active: category === 'food',
          }"
        >
          <img src="../assets/icons/bag.svg" alt="img" />
          <p class="form__category-text">Еда</p>
        </div>
        <div
          @click="chooseCategory('transport')"
          class="form__category"
          :class="{
            active: category === 'transport',
          }"
        >
          <img src="../assets/icons/car.svg" alt="img" />
          <p class="form__category-text">Транспорт</p>
        </div>
        <div
          @click="chooseCategory('housing')"
          class="form__category"
          :class="{
            active: category === 'housing',
          }"
        >
          <img src="../assets/icons/house.svg" alt="img" />
          <p class="form__category-text">Жилье</p>
        </div>
        <div
          @click="chooseCategory('joy')"
          class="form__category"
          :class="{
            active: category === 'joy',
          }"
        >
          <img src="../assets/icons/gameboy.svg" alt="img" />
          <p class="form__category-text">Развлечение</p>
        </div>
        <div
          @click="chooseCategory('education')"
          class="form__category"
          :class="{
            active: category === 'education',
          }"
        >
          <img src="../assets/icons/teacher.svg" alt="img" />
          <p class="form__category-text">Образование</p>
        </div>
        <div
          @click="chooseCategory('others')"
          class="form__category"
          :class="{
            active: category === 'others',
          }"
        >
          <img src="../assets/icons/message-text.svg" alt="img" />
          <p class="form__category-text">Другое</p>
        </div>
      </div>
      <p class="form__text">Дата</p>
      <input
        class="form__input"
        type="date"
        v-model="date"
        placeholder="Введите дату"
        :class="{
          _error: isError,
        }"
      />
      <p class="form__text">Сумма</p>
      <input
        class="form__input"
        type="number"
        v-model="sum"
        placeholder="Введите сумму"
        @input="onlyDigits"
        :style="{
          marginBottom: isError ? '12px' : '24px',
        }"
        :class="{
          _error: isError,
        }"
      />
      <p class="form__error" v-if="isError">{{ error }}</p>
      <button
        @click="edit({ description, category, date, sum }, editObj.currentExpense._id)"
        v-if="editObj.isEditing"
        class="form__button"
      >
        Изменить расход
      </button>
      <button @click="createExpense" v-else class="form__button">Добавить новый расход</button>
    </div>
  </div>
  <BaseButton
    @click="edit({ description, category, date, sum }, editObj.currentExpense._id)"
    v-if="currentPage !== 'home' && editObj.isEditing"
    class="form__button-mobile"
    >Изменить расход</BaseButton
  >
  <BaseButton
    @click="createExpense"
    v-if="currentPage !== 'home' && !editObj.isEditing"
    class="form__button-mobile"
    >Добавить новый расход</BaseButton
  >
</template>
<script setup>
import { editExpense, postExpense } from '@/services/api'
import { inject, ref, watch } from 'vue'
import BaseButton from './BaseButton.vue'
import { useRouter } from 'vue-router'

const expenses = inject('expenses')
const editObj = inject('editObj', ref({}))
const currentPage = inject('currentPage')

const router = useRouter()

const isError = ref(false)
const error = ref('')
const description = ref()
const category = ref()
const date = ref()
const sum = ref()

function createExpense() {
  if (description.value && category.value && date.value && sum.value) {
    if (description.value.length < 4) {
      isError.value = true
      error.value = 'Длина описания должна быть минимум 4 символа'
      return
    }
    postExpense({
      description: description.value,
      sum: Number(sum.value),
      category: category.value,
      date: date.value,
    }).then((exp) => {
      expenses.value = exp
      router.push('/')
    })
    description.value = ''
    category.value = ''
    date.value = ''
    sum.value = ''
    isError.value = false
  } else {
    isError.value = true
    error.value = 'Не все поля заполнены'
  }
}

function chooseCategory(cat) {
  category.value = cat
}
function onlyDigits(e) {
  e.target.value = e.target.value.replace(/\D/g, '')
}
function edit(expense, id) {
  try {
    editExpense(expense, id).then((exps) => {
      expenses.value = exps
      turnEditModeOff()
    })
  } catch (err) {
    console.log(err)
  }
}
function turnEditModeOff() {
  description.value = ''
  date.value = ''
  sum.value = ''
  category.value = ''
  editObj.value.isEditing = false
  editObj.value.currentExpense = {}
  router.push('/')
}

watch(
  editObj.value,
  (newEditObj) => {
    if (Object.keys(newEditObj.currentExpense).length == 0) return
    description.value = newEditObj.currentExpense.description
    category.value = newEditObj.currentExpense.category
    date.value = new Date(newEditObj.currentExpense.date).toISOString().slice(0, 10)
    sum.value = newEditObj.currentExpense.sum
  },
  { immediate: true, deep: true },
)
</script>
<style scoped lang="scss">
.main {
  background-color: white;
  border-radius: 30px;
  padding: 32px;
}
.block {
  display: flex;
  position: relative;
}
.back-btn {
  display: none;
}
.exit-btn {
  position: absolute;
  right: 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
.title {
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  margin-bottom: 24px;
}
.form {
  &__text {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    margin-bottom: 16px;
    display: block;
  }
  &__input {
    border: 0.5px solid #999;
    border-radius: 6px;
    margin-bottom: 24px;
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
    transition: transform 0.3s;
    &::placeholder {
      font-weight: 400;
      font-size: 12px;
      line-height: 100%;
    }
    &:focus {
      border-color: #000000;
      outline: none;
    }
  }
  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 24px;
  }
  &__category {
    border-radius: 30px;
    background-color: #f4f5f6;
    padding: 8px 20px;
    display: flex;
    transition: 0.3s;
    cursor: pointer;

    &-text {
      font-weight: 400;
      font-size: 12px;
      line-height: 100%;
      margin-left: 12px;
    }
    &:hover {
      background-color: #dfdfdf;
      transform: scale(1.05);
    }
  }
  &__button {
    background-color: #7334ea;
    border-radius: 6px;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    color: white;
    width: 100%;
    padding: 12px 0;
    border: none;
    cursor: pointer;
  }
  &__error {
    font-size: 14px;
    color: #cc0000;
    text-align: center;
    margin-bottom: 12px;
  }
}

.active {
  background-color: #dfdfdf;
}
._error {
  background: #ffebeb;
  border: 0.5px solid #f25050;
  transition: 0.3s;
}
input[type='number'] {
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

@media (max-width: 670px) {
  .main {
    padding: 24px 16px;
    outline: none !important;
  }
  .form {
    &__button {
      display: none;
    }
  }
  .back-btn {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
    &__text {
      font-weight: 600;
      font-size: 12px;
      line-height: 150%;
      letter-spacing: 0px;
      color: #999999;
    }
  }
}
@media (max-height: 700px) {
  .form__button-mobile {
    position: static;
  }
}
</style>
