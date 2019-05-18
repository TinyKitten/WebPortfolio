<template>
  <section class="container">
    <app-title-postit
      v-if="visible"
      class="titlePostit"
      title="TinyKitten"
      subtitle="をシェア"
    />
    <div class="content">
      <app-postit v-if="visible" class="postit" text="シェアしよう！" />
      <p v-if="visible" class="links">
        <a
          href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKittenのポートフォリオ&via=tinykitten8&related=tinykitten8"
          target="_blank"
          rel="noreferrer noopener"
        >
          <app-button class="shareButton" color="#1DA1F2" text="Twitter" />
        </a>
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=https://tinykitten.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <app-button class="shareButton" color="#3E54A4" text="Facebook" />
        </a>
      </p>
    </div>
  </section>
</template>

<script>
import AppTitlePostit from '~/components/AppTitlePostit.vue'
import AppPostit from '~/components/AppPostit.vue'
import AppButton from '~/components/AppButton.vue'
import { scrollMixin } from '~/mixins/scroll'

export default {
  components: {
    AppTitlePostit,
    AppPostit,
    AppButton
  },
  mixins: [scrollMixin]
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
}

.content {
  padding-top: 210px;
  display: flex;
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

.name {
  margin-top: 32px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: #707070;
}

.postit {
  animation: headingPostitAnimation 1s ease forwards;
}

.links {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 32px;
  opacity: 0;
  animation: shareButtonAnimation 1s ease 0.25s forwards;
}

.shareButton {
  height: 64px;
}

.shareButton:first-child {
  margin: 16px 0;
}

.titlePostit {
  animation: titlePostitAnimation 1s ease forwards;
}

/* Animation */
@keyframes titlePostitAnimation {
  from {
    transform: translateY(-147px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes headingPostitAnimation {
  from {
    opacity: 0;
    transform: translateY(-64px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(-5deg);
  }
}

@keyframes shareButtonAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
