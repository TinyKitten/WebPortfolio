<template>
  <div>
    <section class="container">
      <article class="content">
        <app-postit class="postit" text="Dev/FullStack" />
        <img class="logo" src="~/assets/works/teamkitten.png" alt="Snovel" />
        <h2 class="name">TeamKitten</h2>
        <p class="bio">
          TeamKittenというネットサークルの<br />
          メンバー管理API設計・実装、<br />
          ウェブサイトの開発を担当しました。<br />
          バックエンドはGo、<br />
          フロントエンドは現在Reactを使用しています。
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
          在籍していることを<br />
          誇れるシステムに
        </h2>
        <p class="conceptDescription">
          TeamKittenというネットサークルを<br />
          自分が運営しています。<br />
          メンバーが自分でサイトに映る<br />
          自己紹介やアバターを変更していただく為に<br />
          バックエンドの開発を決意しました。<br />
          APIはGoで実装し、フロントは<br />
          今はReact.jsを用いています。（昔はVue）<br />
          ポータルというメンバーのみが使える内部システムで<br />
          簡単に自己紹介・アバター・カバー画像を<br />
          即座に変更できます。
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
        />
        <h2 class="galleryConcept">
          掲載されることに喜びを覚える<br />
          シンプルながら美しいデザイン
        </h2>
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
          href="https://github.com/TeamKitten/API"
          target="_blank"
          class="link"
          rel="noopener noreferrer"
        >
          <app-button text="APIリポジトリ" />
        </a>
        <a
          href="https://github.com/TeamKitten/OfficialWeb"
          target="_blank"
          class="link"
          rel="noopener noreferrer"
        >
          <app-button text="フロントリポジトリ" />
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
