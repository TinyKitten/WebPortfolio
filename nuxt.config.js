const meta = {
  title: 'TinyKitten',
  description: 'フロントエンドエンジニア TinyKittenのポートフォリオです。',
  themeColor: '#008ffe',
  url: 'https://tinykitten.me/',
  twitter: '@tinykitten8',
  fbAppId: '316017925842401'
}

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: meta.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: meta.description },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'theme-color', content: meta.themeColor },
      { property: 'fb:app_id', content: meta.fbAppId },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: meta.twitter },
      // Add to home screen
      // for Safari on iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: meta.title },
      // for Windows
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png'
      },
      { name: 'msapplication-TileColor', content: meta.themeColor },
      // for Mac
      {
        rel: 'mask-icon',
        content: '/icons/safari-pinned-tab.svg',
        color: meta.themeColor
      },
      // OGP
      { hid: 'og:site_name', property: 'og:site_name', content: meta.title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: meta.url },
      { hid: 'og:title', property: 'og:title', content: meta.title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: meta.description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${meta.url}ogp.png`
      }
    ],
    noscript: [
      {
        innerHTML:
          '当サイトを閲覧するためには、JavaScriptを有効にしていただく必要があります。',
        body: true
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:400,700'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png'
      },
      // Safari icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: meta.themeColor },

  /*
   ** Global CSS
   */
  css: ['~assets/reset.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/ga.js', ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [['@nuxtjs/pwa', { icon: false }]],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  manifest: {
    name: meta.title,
    short_name: meta.title,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    description: meta.description,
    lang: 'ja'
  }
}
