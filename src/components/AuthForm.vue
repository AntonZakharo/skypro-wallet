<template>
  <div class="form">
    <div v-if="!isReg" class="form__title">Вход</div>
    <div v-if="isReg" class="form__title">Регистрация</div>
    <div class="form__inputs">
      <input type="text" class="form__input" placeholder="Логин" v-model="login" />
      <input v-if="isReg" type="text" class="form__input" placeholder="Эл. почта" v-model="email" />
      <input type="password" class="form__input" placeholder="Пароль" v-model="password" />
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
import { signIn, signUp } from '@/serivces/auth'

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
    error.value = String(err).slice(6)
    isError.value = true
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
    error.value = String(err).slice(6)
    isError.value = true
  }
}
</script>
<style scoped lang="scss">
.form {
  background-color: #fff;
  border-radius: 30px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__title {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    display: inline;
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
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    cursor: pointer;
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
  color: #cc0000;
  text-align: center;
}
</style>
