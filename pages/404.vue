<template>
  <div class="container">
    <app-postit text="Not Found" />
    <p class="message">
      お探しのページは見つかりませんでした。
    </p>
    <nuxt-link to="/">
      <app-button text="トップ" />
    </nuxt-link>
  </div>
</template>

<script>
import AppPostit from '~/components/AppPostit.vue'
import AppButton from '~/components/AppButton.vue'

export default {
  components: {
    AppPostit,
    AppButton
  },
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.container {
  height: calc(100vh - 48px);
  padding-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.postit {
  position: relative;
  animation: headingPostitAnimation 1s ease forwards;
}

.message {
  margin-top: 48px;
  color: #555;
  font-weight: bold;
  margin-bottom: 24px;
}

@keyframes headingPostitAnimation {
  from {
    opacity: 0;
    transform: translateY(-64px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(5deg);
  }
}
</style>
