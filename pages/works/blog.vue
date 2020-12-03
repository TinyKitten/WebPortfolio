<template>
  <div>
    <section class="container">
      <article class="content">
        <app-postit class="postit" text="Dev/WebApp" />
        <img class="logo" src="~/assets/works/blog.png" alt="Blog">
        <h2 class="name">
          ブログ
        </h2>
        <p class="bio">
          個人的なことを書くためのブログです。
          Nuxt.jsとMarkdownを用いており、<br>
          高速な表示とより良いUXを実現しました。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="ブログ" subtitle="コンセプト" />
      <article class="content">
        <h2 class="concept">
          省力化を考えた設計
        </h2>
        <p class="conceptDescription">
          ブログというものは書くことが重要です。基本的にシステムを構築することが目標ではありません。<br>
          どうすれば楽にシステムを構築し、かつ楽に書くことが出来るか。<br>
          そう考えたらNuxt.jsとMarkdownの組み合わせしかありませんでした。<br>
          普段自分はUIフレームワークを使わず、自力でCSSを書いていますが（このサイトもそうです）、<br>
          今回はBulmaというUIフレームワークを使用しました。
        </p>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="ブログ" subtitle="デザイン" />
      <article class="content">
        <img class="galleryImg" src="~/assets/works/blog.png" alt="Blog">
        <h2 class="galleryConcept">
          簡略化された読みやすいデザインを目指しました。
        </h2>
      </article>
    </section>
    <section class="container">
      <app-title-postit v-if="visible" title="ブログ" subtitle="リンク" />
      <article class="content">
        <a
          href="https://blog.tinykitten.me"
          target="_blank"
          class="link"
          rel="noopener noreferrer"
        >
          <app-button text="読んでみる" />
        </a>
        <a
          href="https://github.com/TinyKitten/Blog"
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
import { scrollMixin } from '~/mixins/scroll'

export default {
  components: {
    AppPostit,
    AppTitlePostit,
    AppButton
  },
  mixins: [scrollMixin],
  head: {
    title: 'ブログ',
    description:
      '個人的なことを書くためのブログです。Nuxt.jsとMarkdownを用いており、高速な表示とより良いUXを実現しました。',
    meta: [
      { hid: 'og:site_name', property: 'og:site_name', content: 'TinyKitten' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://tinykitten.me/works/blog/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ブログ'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '個人的なことを書くためのブログです。Nuxt.jsとMarkdownを用いており、高速な表示とより良いUXを実現しました。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `https://tinykitten.me${require('~/assets/works/blog_ogp.png')}`
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
    width: auto;
    max-height: 50vh;
  }
}
</style>
