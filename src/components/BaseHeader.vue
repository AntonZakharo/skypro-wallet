<template>
  <header class="header center">
    <RouterLink to="/">
      <img src="../assets/icons/Vector.svg" alt="" />
    </RouterLink>
    <nav class="header__nav">
      <h3 class="header__nav-text" title="Мои расходы">Мои расходы</h3>
      <h3 class="header__nav-text" title="Анализ расходов">Анализ расходов</h3>
    </nav>
    <p class="header__logout">Выйти</p>
  </header>
</template>
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

    &-text {
      font-weight: 400;
      font-size: 14px;
      line-height: 170%;
      letter-spacing: 0px;
      text-align: center;
      transition: 0.3s;
      &::before {
        display: block;
        content: attr(title);
        font-weight: 600;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }
      &:hover {
        border-bottom: 1px solid #7334ea;
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
.center {
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
}
</style>
