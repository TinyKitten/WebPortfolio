<template>
  <div>
    <section class="container">
      <article class="content">
        <app-postit class="postit" text="Dev/MobileApp" />
        <img class="logo" src="~/assets/works/snovel.png" alt="Snovel" />
        <h2 class="name">Snovel</h2>
        <p class="bio">
          Snovelは、駅ノートでつながるSNS<br />
          訪れた駅、思い出の駅。<br />
          いろんな駅でチェックインして<br />
          ノートに書き残そう。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="Snovel" subtitle="コンセプト" />
      <article class="content">
        <h2 class="concept">
          駅ノートでつながるSNS
        </h2>
        <p class="conceptDescription">
          もともと<a
            href="https://github.com/TinyKitten/StationAPI"
            target="_blank"
            rel="noopener noreferrer"
            >StationAPI</a
          >というAPIを作っていて、<br />
          それの応用例として<br />
          <a
            href="https://near.tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
            >NearStation</a
          >というものがあります。<br />
          それを拡張してSNSにしたら面白いんじゃないだろうか。<br />
          そう考えて開発を開始しました。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="Snovel" subtitle="デザイン" />
      <article class="content">
        <img class="galleryImg" src="~/assets/works/snovel.png" alt="Snovel" />
        <h2 class="galleryConcept">
          鉄道ファン以外も<br />
          親しみを持てるように
        </h2>
      </article>
      <article class="content">
        <app-postit
          v-if="visible"
          class="postit galleryPostit"
          text="Snovelのロゴです"
        />
        <img
          class="galleryImg nofilter"
          src="~/assets/works/snovel_logo.svg"
          alt="Snovel"
        />
        <h2 class="galleryConcept">
          2つの点は、起点と終点。<br />
          健全で、駅利用者をつなぐ<br />
          コミュニティでありたい。
        </h2>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="Snovel" subtitle="リンク" />
      <article class="content">
        <a
          href="https://snovel.app"
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
  mixins: [scrollMixin],
  head: {
    title: 'Snovel',
    description:
      'Snovelは、駅ノートでつながるSNS 訪れた駅、思い出の駅。いろんな駅でチェックインしてノートに書き残そう。',
    meta: [
      { hid: 'og:site_name', property: 'og:site_name', content: 'TinyKitten' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://tinykitten.me/works/snovel/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Snovel'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Snovelは、駅ノートでつながるSNS 訪れた駅、思い出の駅。いろんな駅でチェックインしてノートに書き残そう。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `https://tinykitten.me${require('~/assets/works/snovel_ogp.png')}`
      }
    ]
  }
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
.galleryPostit {
  margin-bottom: -84px;
  margin-left: -120px;
  animation: galleryPostitAnimation 1s ease forwards;
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
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
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
@keyframes galleryPostitAnimation {
  from {
    opacity: 0;
    transform: translateY(-64px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(-5deg);
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
.nofilter {
  filter: none;
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
