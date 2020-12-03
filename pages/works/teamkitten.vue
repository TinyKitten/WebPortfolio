<template>
  <div>
    <section class="container">
      <article class="content">
        <app-postit class="postit" text="Dev/FullStack" />
        <img
          class="logo"
          src="~/assets/works/teamkitten.png"
          alt="TeamKitten"
        >
        <h2 class="name">
          TeamKitten
        </h2>
        <p class="bio">
          TeamKittenというネットサークルの<br>
          メンバー管理API設計・実装、<br>
          ウェブサイトの開発を担当しました。<br>
          現在はNuxt.jsを用いており、<br>
          コンテンツを完全に静的に配信することにより<br>
          高速な表示とより良いUXを実現しました。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit
        v-if="visible"
        title="TeamKitten"
        subtitle="コンセプト"
      />
      <article class="content">
        <h2 class="concept">
          シンプルを追求した<br>
          設計とUX
        </h2>
        <p class="conceptDescription">
          TeamKittenというネットサークルを僕が運営しています。<br>
          過去にはGoやNode.jsでAPIを自作して動的なコンテンツ配信を行っていましたが、<br>
          現在はNuxt.jsを用いて完全に静的に配信しています。(JAMStack)<br>
          ウェブサイトのデザインはシンプルを追求し、どこか暖かさを感じるデザインにしました。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="TeamKitten" subtitle="デザイン" />
      <article class="content">
        <img
          class="galleryImg"
          src="~/assets/works/teamkitten.png"
          alt="TeamKitten"
        >
        <h2 class="galleryConcept">
          掲載されることに喜びを覚える<br>
          シンプルながら美しいデザイン
        </h2>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="TeamKitten" subtitle="使用技術" />
      <article class="content techs">
        <app-skill-circle
          :image-path="require('~/assets/marks/js.svg')"
          skill-name="JavaScript"
        />
        <app-skill-circle
          :image-path="require('~/assets/marks/nuxtjs.svg')"
          skill-name="NuxtJS"
        />
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="TeamKitten" subtitle="リンク" />
      <article class="content">
        <a
          href="https://teamkitten.tk"
          target="_blank"
          class="link"
          rel="noopener noreferrer"
        >
          <app-button text="公式サイト" />
        </a>
        <a
          href="https://github.com/TeamKitten/StaticOfficialWeb"
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
    title: 'TeamKitten ',
    description:
      'TeamKittenというネットサークルのメンバー管理API設計・実装、ウェブサイトの開発を担当しました。',
    meta: [
      { hid: 'og:site_name', property: 'og:site_name', content: 'TinyKitten' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://tinykitten.me/works/teamkitten/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'TeamKitten'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'TeamKittenというネットサークルのメンバー管理API設計・実装、ウェブサイトの開発を担当しました。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `https://tinykitten.me${require('~/assets/works/teamkitten_ogp.png')}`
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
  width: 320px;
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
  .logo,
  .galleryImg {
    width: 480px;
  }
}
</style>
