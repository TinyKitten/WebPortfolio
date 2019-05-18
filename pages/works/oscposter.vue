<template>
  <div>
    <section class="container">
      <article class="content">
        <app-postit class="postit" text="Design/Poster" />
        <img
          class="logo"
          src="~/assets/works/oscposter.png"
          alt="OSC 2016 Gunma Poster"
        />
        <h2 class="name">OSC 2016 Gunma</h2>
        <p class="bio">
          オープンソースカンファレンス2016群馬という<br />
          イベントのポスターデザインを<br />
          担当させていただきました。<br />
          美しい曲線を描く線は流れるデータをイメージしました。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit
        v-if="visible"
        title="OSCPoster"
        subtitle="コンセプト"
      />
      <article class="content">
        <h2 class="concept">
          先進的なイメージの<br />
          ポスターを作りたい
        </h2>
        <p class="conceptDescription">
          たしかこれは自分から名乗りあげて<br />
          作ったものだったと思います。<br />
          ただ作り始めてみると大変でした。<br />
          自分は当時デザイナーを目指していましたが、<br />
          デザインの知識は皆無でした（今もそうですが）<br />
          いろいろなデザインを参考にしながら、<br />
          このデザインを完成させました。<br />
          結果、このデザインのポスターは大好評でした。<br />
          私にとっては、<br />
          いろいろと思い出深いデザインのポスターです。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="OSCPoster" subtitle="デザイン" />
      <article class="content">
        <img
          class="galleryImg"
          src="~/assets/works/oscposter.png"
          alt="Snovel"
        />
        <h2 class="galleryConcept">
          先進的なイメージを持たせる<br />
          美しいデザイン
        </h2>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="OSCPoster" subtitle="リンク" />
      <article class="content">
        <a
          href="https://www.ospn.jp/osc2016-gunma/"
          target="_blank"
          class="link"
          rel="noopener noreferrer"
        >
          <app-button text="公式サイト" />
        </a>
        <nuxt-link to="/" class="link">
          <app-button color="#555" text="戻る" />
        </nuxt-link>
      </article>
    </section>
  </div>
</template>

<script>
import AppTitlePostit from '~/components/AppTitlePostit.vue'
import AppPostit from '~/components/AppPostit.vue'
import AppButton from '~/components/AppButton.vue'
import { scrollMixin } from '~/mixins/scroll'

export default {
  components: {
    AppPostit,
    AppTitlePostit,
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container:first-child {
  min-height: 100vh;
}

.content {
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 144px;
  padding-bottom: 32px;
}

.content:first-child {
  margin-top: 48px;
}

.container:nth-child(even) {
  background: #fafafa;
}

.logo {
  opacity: 0;
  width: 180px;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  animation: imageAnimation 1s ease 0.25s forwards;
}

.bio {
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 12px;
  color: #555;
}

.name {
  margin-top: 32px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: #707070;
}

.postit {
  display: block;
  margin-bottom: 32px;
  animation: headingPostitAnimation 1s ease forwards;
}

.titlePostit {
  animation: titlePostitAnimation 1s ease forwards;
}

.concept {
  text-align: center;
  line-height: 1.5;
  font-size: 2rem;
  color: #555555;
  font-weight: bold;
  max-width: 90%;
}

.galleryConcept {
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
  color: #555555;
  font-weight: bold;
  max-width: 90%;
}

.conceptDescription {
  text-align: center;
  max-width: 90%;
  margin-top: 32px;
  line-height: 2;
  color: #555;
}

.conceptDescription a {
  color: #555;
  font-weight: bold;
  text-decoration: none;
}

.galleryImg {
  margin: 64px 0 32px 0;
  width: 180px;
  height: auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}

.link {
  margin-bottom: 32px;
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
    transform: translateY(0);
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

@media (min-width: 800px) {
  .logo {
    width: 160px;
  }
  .galleryImg {
    width: 210px;
  }
  .content {
    padding-bottom: 64px;
  }
}
</style>
