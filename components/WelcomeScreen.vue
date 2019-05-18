<template>
  <section class="container">
    <div class="logoWrapper">
      <app-postit class="postit" text="Frontend Engineer" />
      <img class="logo" src="~/assets/icon.svg" alt="TinyKitten" />
    </div>
    <h1 class="name">TinyKitten</h1>
    <a v-smooth-scroll="{ duration: 1000 }" class="arrowLink" href="#aboutme">
      <img src="~/assets/arrow.svg" alt="下へ" />
    </a>
  </section>
</template>

<script>
import AppPostit from '~/components/AppPostit.vue'

export default {
  components: {
    AppPostit
  }
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logoWrapper {
  position: relative;
}

.logo {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
}

.postit {
  position: absolute;
  transform: rotate(-5deg);
  left: -44px;
  top: -24px;
  z-index: 1;
  animation: headingPostitAnimation 1s ease forwards;
}

.name {
  margin-top: 24px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: #707070;
}

.arrowLink {
  position: absolute;
  width: 64px;
  height: auto;
  bottom: 32px;
  animation: 1s arrow forwards;
}

@keyframes headingPostitAnimation {
  from {
    opacity: 0;
    transform: translateY(-64px) rotate(0deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(5deg);
  }
}

@keyframes arrow {
  from {
    opacity: 0;
    transform: translate3d(0, -32px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
