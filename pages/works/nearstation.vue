<template>
  <div>
    <section class="container">
      <article class="content">
        <app-postit class="postit" text="Dev/WebApp" />
        <img
          class="logo"
          src="~/assets/works/nearstation.png"
          alt="NearStation"
        >
        <h2 class="name">
          NearStation
        </h2>
        <p class="bio">
          最寄り駅とその路線がひと目で分かるWebアプリ
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit
        v-if="visible"
        title="NearStation"
        subtitle="コンセプト"
      />
      <article class="content">
        <h2 class="concept">
          今いる場所の最寄り駅と路線を知りたい
        </h2>
        <p class="conceptDescription">
          <a
            href="https://github.com/TinyKitten/StationAPI"
            target="_blank"
            rel="noopener noreferrer"
          >StationAPI</a>の応用例の一つです。<br>
          シンプルに今いる場所の最寄り駅の名前と<br>
          駅の路線の停車駅を知りたいときに役に立つと思い、開発しました。<br>
          今いる駅の路線がどこに行くのか知りたいときなどにお役に立つかと思います。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit
        v-if="visible"
        title="NearStartion"
        subtitle="デザイン"
      />
      <article class="content">
        <img
          class="galleryImg"
          src="~/assets/works/nearstation.png"
          alt="NearStation"
        >
        <h2 class="galleryConcept">
          すっきりと透き通るような繊細なデザイン
        </h2>
      </article>
    </section>
    <section class="container">
      <app-title-postit
        v-if="visible"
        title="NearStation"
        subtitle="使用技術"
      />
      <article class="content techs">
        <app-skill-circle
          :image-path="require('~/assets/marks/ts.svg')"
          skill-name="TypeScript(API/App)"
        />
        <app-skill-circle
          :image-path="require('~/assets/marks/react.svg')"
          skill-name="React.js"
        />
        <app-skill-circle
          :image-path="require('~/assets/marks/nestjs.svg')"
          skill-name="NestJS"
        />
        <app-skill-circle
          :image-path="require('~/assets/marks/mysql.svg')"
          skill-name="MySQL"
        />
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="NearStation" subtitle="リンク" />
      <article class="content">
        <a
          href="https://near.tinykitten.me"
          target="_blank"
          class="link"
          rel="noopener noreferrer"
        >
          <app-button text="使ってみる" />
        </a>
        <a
          href="https://github.com/TinyKitten/NearStation"
          target="_blank"
          class="link"
          rel="noopener noreferrer"
        >
          <app-button text="リポジトリ" />
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
import AppSkillCircle from '~/components/AppSkillCircle.vue'
import { scrollMixin } from '~/mixins/scroll'

export default {
  components: {
    AppPostit,
    AppTitlePostit,
    AppButton,
    AppSkillCircle
  },
  mixins: [scrollMixin],
  head: {
    title: 'NearStation',
    description: '最寄り駅とその路線がひと目で分かるWebアプリ',
    meta: [
      { hid: 'og:site_name', property: 'og:site_name', content: 'TinyKitten' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://tinykitten.me/works/nearstation/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'NearStation'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '最寄り駅とその路線がひと目で分かるWebアプリ'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `https://tinykitten.me${require('~/assets/works/nearstation.png')}`
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
  width: auto;
  max-height: 320px;
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
  width: 320px;
  height: auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}

.link {
  margin-bottom: 32px;
}

.appStoreButton {
  width: 210px;
  height: auto;
  overflow: hidden;
  margin-bottom: 12px;
}

.appStoreButton img {
  width: 100%;
  height: auto;
}

.appleAppStore {
  width: 180px;
  margin-bottom: 32px;
}

.smallCaption {
  font-size: 0.8rem;
  margin-top: 0;
}

.techs {
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 32px;
  animation: imageAnimation 1s ease forwards;
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
  .content {
    padding-bottom: 64px;
  }
}
</style>
