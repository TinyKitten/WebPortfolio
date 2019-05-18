<template>
  <div class="content">
    <div v-if="visible" class="logoWrapper">
      <app-postit class="postit" text="TeamKitten" />
      <img class="image" src="~/assets/works/teamkitten.png" alt="TeamKitten" />
    </div>
    <p v-if="visible" class="description">
      TeamKittenというネットサークルの<br />
      メンバー管理API設計・実装、<br />
      ウェブサイトの開発を担当しました。<br />
      バックエンドはGo、<br />
      フロントエンドは現在Reactを使用しています。
    </p>
    <app-button v-if="visible" class="learnMoreBtn" text="さらに詳しく" />
  </div>
</template>

<script>
import AppPostit from '~/components/AppPostit.vue'
import AppButton from '~/components/AppButton.vue'
import { scrollMixin } from '~/mixins/scroll'

export default {
  components: {
    AppPostit,
    AppButton
  },
  mixins: [scrollMixin]
}
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 48px);
  background: #fafafa;
}

.logoWrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 480px;
  max-width: 75%;
  height: auto;
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
  position: absolute;
  transform: rotate(5deg);
  left: auto;
  right: auto;
  bottom: -24px;
  z-index: 1;
  animation: headingPostitAnimation 1s ease 0.25s forwards;
  opacity: 0;
}

.description {
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 48px;
  color: #555;
  animation: imageAnimation 1s ease forwards;
}

.learnMoreBtn {
  margin: 32px 0;
  animation: imageAnimation 1s ease forwards;
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

@keyframes imageAnimation {
  from {
    opacity: 0;
    transform: translateY(-32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
