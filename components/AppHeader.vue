<template>
  <header>
    <nuxt-link to="/" class="title">
      <img class="logo" src="~assets/icon.svg" alt="logo" />
    </nuxt-link>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  height: 48px;
  background: #fff;
  z-index: 9999;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
}
.title {
  text-decoration: none;
}
.logo {
  width: 32px;
  height: 32px;
}
</style>
