<template>
  <div class="content">
    <div v-if="visible" class="logoWrapper">
      <app-postit class="postit" text="Snovel" />
      <img class="image" src="~/assets/works/snovel.png" alt="Snovel" />
    </div>
    <p v-if="visible" class="description">
      Snovelは、駅ノートでつながるSNS<br />
      訪れた駅、思い出の駅。<br />
      いろんな駅でチェックインして<br />
      ノートに書き残そう。<br />
      早期テスター募集中です。
    </p>
    <nuxt-link to="/works/snovel">
      <app-button v-if="visible" class="learnMoreBtn" text="さらに詳しく" />
    </nuxt-link>
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
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fafafa;
}
.logoWrapper {
  position: relative;
}
.image {
  width: 180px;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  animation: imageAnimation 1s ease forwards;
}
.postit {
  position: absolute;
  left: -24px;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  animation: headingPostitAnimation 1s ease 0.25s forwards;
}
.description {
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 32px;
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
