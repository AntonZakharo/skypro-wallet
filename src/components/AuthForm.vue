<template>
  <div
    :style="{
      marginTop: (isReg ? 143 : 169) + 'px',
    }"
    class="form"
  >
    <div v-if="!isReg" class="form__title">Вход</div>
    <div v-if="isReg" class="form__title">Регистрация</div>
    <div class="form__inputs">
      <input
        type="text"
        :class="{
          form__input_error: isError,
        }"
        @input="isError = false"
        class="form__input"
        placeholder="Логин"
        v-model="login"
      />

      <input
        v-if="isReg"
        :class="{
          form__input_error: isError,
        }"
        type="text"
        class="form__input"
        placeholder="Эл. почта"
        v-model="email"
      />

      <input
        type="password"
        class="form__input"
        :class="{
          form__input_error: isError,
        }"
        placeholder="Пароль"
        v-model="password"
      />
    </div>
    <div v-if="isError" class="error">{{ error }}</div>
    <button v-if="!isReg" class="form__button" @click="log">Войти</button>
    <button v-if="isReg" class="form__button" @click="reg">Регистрация</button>
    <p v-if="!isReg" class="form__text">
      Нужно зарегистрироваться?<br /><span class="form__link" @click="changeMode"
        >Регистрируйтесь здесь</span
      >
    </p>
    <p v-if="isReg" class="form__text">
      Уже есть аккаунт?<br /><span class="form__link" @click="changeMode">Войдите здесь</span>
    </p>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { signIn, signUp } from '@/services/auth'

const isReg = ref(false)
const router = useRouter()

const login = ref()
const password = ref()
const email = ref()
const error = ref()
const isError = ref(false)

function changeMode() {
  isReg.value = !isReg.value
  login.value = ''
  password.value = ''
  email.value = ''
  isError.value = false
}
function handleError(err) {
  error.value = String(err).slice(6)
  isError.value = true
}
async function log() {
  try {
    if (login.value && password.value) {
      await signIn({
        login: login.value,
        password: password.value,
      }).then((user) => {
        localStorage.setItem('token', user.token)
        router.push('/')
      })
    } else {
      error.value = 'Не все поля заполнены'
      isError.value = true
    }
  } catch (err) {
    handleError(err)
  }
}
async function reg() {
  try {
    if (login.value && password.value && email.value) {
      await signUp({
        login: login.value,
        password: password.value,
        name: email.value,
      }).then((user) => {
        localStorage.setItem('token', user.token)
        router.push('/')
      })
      router.push('/')
    } else {
      error.value = 'Не все поля заполнены'
      isError.value = true
    }
  } catch (err) {
    handleError(err)
  }
}
</script>
<style scoped lang="scss">
.form {
  background-color: #fff;
  border-radius: 30px;
  padding: 32px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  &__title {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    margin-bottom: 24px;
  }
  &__input {
    border: 0.5px solid #999999;
    padding: 12px;
    border-radius: 6px;
    width: 287px;
    &::placeholder {
      font-family: Montserrat;
      font-weight: 400;
      font-size: 12px;
      line-height: 100%;
    }
    &:focus {
      outline: 0;
    }
    &_error {
      background-color: rgba(255, 235, 235, 1);
      box-shadow: inset 20px 20px 0px 20px rgba(255, 235, 235, 1) !important;
      border-color: rgba(248, 77, 77, 1) !important;
      transition: background-color 0.5s;
    }
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 12px;
  }
  &__button {
    width: 100%;
    background-color: #7334ea;
    color: white;
    border-radius: 6px;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    text-align: center;
    vertical-align: middle;
    padding: 12px;
    margin-top: 24px;
    margin-bottom: 24px;
    cursor: pointer;
    outline: none;
    border: none;
  }
  &__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    text-align: center;
    color: #999;
  }
  &__link {
    border-bottom: 1px solid #999999;
    cursor: pointer;
  }
}
.error {
  font-size: 14px;
  color: rgba(248, 77, 77, 1);
  text-align: center;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: inset 20px 20px 0px 20px #f1ebfd;
  border-color: #7334ea;
  transition: background-color 0.5s ease-in-out 0s;
}

@media (max-width: 670px) {
  .form {
    &__title {
      font-size: 24px;
    }
  }
}
</style>
