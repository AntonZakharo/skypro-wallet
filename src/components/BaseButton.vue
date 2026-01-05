<template>
  <div class="button__block">
    <button
      class="button__btn"
      :class="{
        button__btn_short: currentPage === 'home',
      }"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script setup>
import { inject } from 'vue'

const currentPage = inject('currentPage')
</script>
<style scoped lang="scss">
.button {
  &__block {
    padding: 24px 16px;
    box-shadow: 0px -20px 67px -12px #00000021;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    gap: 10px;
  }
  &__btn {
    width: 100%;
    background-color: #7334ea;
    color: white;
    border-radius: 6px;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    text-align: center;
    vertical-align: middle;
    padding: 12px;
    outline: none;
    border: none;
    &_short {
      width: calc(100% - 46px);
    }
  }
}
</style>
