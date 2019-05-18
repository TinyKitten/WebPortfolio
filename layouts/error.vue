<template>
  <div class="container">
    <app-postit
      :text="error.statusCode === 404 ? 'Not Found' : 'Server Error'"
    />
    <p class="message">
      {{
        error.statusCode === 404
          ? 'お探しのページは見つかりませんでした。'
          : 'エラーが発生しました。'
      }}
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
      type: Error,
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
