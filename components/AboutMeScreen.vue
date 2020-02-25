<template>
  <section id="aboutme" class="container">
    <app-title-postit
      v-if="visible"
      class="titilePostit"
      title="TinyKitten"
      subtitle="って誰？"
    />
    <div class="content">
      <div class="logoWrapper">
        <app-postit v-if="visible" class="postit" text="デザインもできます" />
        <img class="logo" src="~/assets/icon.svg" alt="TinyKitten" />
      </div>
      <h2 class="name">TinyKitten</h2>
      <p class="bio">
        東京都豊島区在住のフリーの<br />
        フロントエンドエンジニア。<br />
        タイニーキトゥンと読みます。<br />
        でも、「きったん」と呼ばれることが多いです。
      </p>
    </div>
  </section>
</template>

<script>
import AppTitlePostit from '~/components/AppTitlePostit.vue'
import AppPostit from '~/components/AppPostit.vue'
import { scrollMixin } from '~/mixins/scroll'

export default {
  components: {
    AppTitlePostit,
    AppPostit
  },
  mixins: [scrollMixin]
}
</script>

<style scoped>
.container {
  position: relative;
  min-height: calc(100vh - 48px);
  background: #fafafa;
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
  position: absolute;
  transform: rotate(-5deg);
  left: -44px;
  top: -24px;
  z-index: 1;
  animation: headingPostitAnimation 1s ease forwards;
}

.bio {
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 12px;
  color: #555;
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
</style>
