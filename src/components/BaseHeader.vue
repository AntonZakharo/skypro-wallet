<template>
  <header class="header centre">
    <RouterLink to="/" class="header__logo">
      <picture class="header__logo_img main-logo" v-if="currentPage === 'home'">
        <source media="(max-width: 670px)" srcset="../assets/icons/skypro-logo-mobile.svg" />
        <img src="../assets/icons/skypro-logo.svg" alt="" />
      </picture>
      <picture class="header__logo_img auth-logo" v-else>
        <source media="(max-width: 670px)" srcset="../assets/icons/skypro-logo-mobile.svg" />
        <img src="../assets/icons/skypro-logo.svg" alt="" />
      </picture>
    </RouterLink>
    <nav v-if="!isAuth" class="header__nav" @click="changePopUp">
      <RouterLink
        to="/"
        class="header__nav-text"
        title="Мои расходы"
        :class="{
          _active: currentPage === 'home',
          '_mobile-show': currentPage === 'home',
        }"
        >Мои расходы</RouterLink
      >
      <RouterLink
        to="/analytics"
        class="header__nav-text"
        title="Анализ расходов"
        :class="{
          _active: currentPage === 'analytics',
          '_mobile-show': currentPage === 'analytics',
        }"
        >Анализ расходов</RouterLink
      >
      <RouterLink
        to="/new-expense"
        class="header__nav-text header__nav-text_new-expense"
        title="Новый расход"
        :class="{
          _active: currentPage === 'new-expense',
          '_mobile-show': currentPage === 'new-expense',
        }"
        >Новый расход</RouterLink
      >
      <div class="header__nav-pop-up" v-if="isShowPopUp">
        <RouterLink
          to="/"
          class="header__nav-pop-up-text"
          title="Мои расходы"
          :class="{
            '_active_pop-up': currentPage === 'home',
          }"
          >Мои расходы</RouterLink
        >
        <RouterLink
          to="/new-expense"
          class="header__nav-pop-up-text"
          title="Мои расходы"
          :class="{
            '_active_pop-up': currentPage === 'new-expense',
          }"
          >Новый расход</RouterLink
        >
        <RouterLink
          to="/analytics"
          class="header__nav-pop-up-text"
          title="Анализ расходов"
          :class="{
            '_active_pop-up': currentPage === 'analytics',
          }"
          >Анализ расходов</RouterLink
        >
      </div>
    </nav>

    <RouterLink v-if="!isAuth" to="/auth" @click="logout" class="header__logout">Выйти</RouterLink>
  </header>
</template>
<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  isAuth: Boolean,
})
const currentPage = inject('currentPage')
const router = useRouter()
function logout() {
  localStorage.removeItem('token')
  router.push('/auth')
}
const isShowPopUp = ref(false)
function changePopUp() {
  isShowPopUp.value = !isShowPopUp.value
}
</script>
<style scoped lang="scss">
.header {
  background-color: #ffffff;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__nav {
    display: flex;
    gap: 48px;
    &-pop-up {
      display: none;
    }
    &-text {
      font-weight: 400;
      font-size: 14px;
      line-height: 170%;
      letter-spacing: 0px;
      text-align: center;
      transition: 0.3s;
      position: relative;
      &_new-expense {
        display: none;
      }
      &::before {
        display: block;
        content: attr(title);
        font-weight: 600;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
      &::after {
        content: '';
        display: block;
        width: 100%;
        border-bottom: 1px solid #7334ea;
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.3s;
        position: absolute;
      }
      &:hover::after {
        transform: scaleX(1);
      }
      &:hover {
        color: #7334ea;
        font-weight: 600;
      }
    }
  }
  &__logout {
    font-weight: 600;
    font-size: 14px;
    line-height: 170%;
    letter-spacing: 0px;
    text-align: center;
    transition: 0.3s;
    &:hover {
      color: #7334ea;
    }
  }
}
.centre {
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
}
._active {
  border-bottom: 1px solid #7334ea;
  color: #7334ea;
  font-weight: 600;
}
._active_pop-up {
  color: #7334ea;
  background-color: #f1ebfd;
  border-radius: 24px;
}
@media (max-width: 1300px) {
  .centre {
    padding-left: calc(50% - 500px);
    padding-right: calc(50% - 500px);
  }
}
@media (max-width: 1050px) {
  .centre {
    padding-left: calc(50% - 400px);
    padding-right: calc(50% - 400px);
  }
}
@media (max-width: 850px) {
  .centre {
    padding-left: calc(50% - 325px);
    padding-right: calc(50% - 325px);
  }
}
@media (max-width: 670px) {
  .header {
    justify-content: start;
    background-color: rgba(244, 245, 246, 1);

    &__logo {
      margin-right: 71px;
      margin-left: 16px;
      .main-logo {
        width: 109px;
        height: 14px;
      }
    }
    &__nav {
      margin-right: 20px;
      gap: 8px;
      position: absolute;
      right: 55px;
      cursor: pointer;
      &::after {
        content: url(../assets/icons/arrow-down.svg);
      }
      &-text {
        font-size: 12px;
        display: none;
        width: fit-content;
      }
      &-pop-up {
        padding: 10px;
        display: flex;
        flex-direction: column;
        border: 0.5px solid #999999;
        border-radius: 6px;
        gap: 6px;
        position: absolute;
        top: 30px;
        left: -40px;
        z-index: 4;
        background-color: #fff;
        &-text {
          font-size: 10px;
          padding: 7px 14px;
          text-wrap: nowrap;
        }
      }
    }

    &__logout {
      font-size: 12px;
      position: absolute;
      right: 15px;
    }
    ._mobile-show {
      display: block;
    }
  }
}
</style>
