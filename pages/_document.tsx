import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(): React.ReactElement {
  const { NEXT_PUBLIC_URL } = process.env;

  return (
    <Html lang="ja">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${NEXT_PUBLIC_URL}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${NEXT_PUBLIC_URL}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${NEXT_PUBLIC_URL}/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${NEXT_PUBLIC_URL}/manifest.json`} />
        <link
          rel="mask-icon"
          href={`${NEXT_PUBLIC_URL}/safari-pinned-tab.svg`}
          color="#008ffe"
        />
        <meta name="msapplication-TileColor" content="#008ffe" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="フロントエンドエンジニア TinyKittenのポートフォリオです。"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${NEXT_PUBLIC_URL}`} />
        <meta property="og:title" content="TinyKitten" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content="フロントエンドエンジニア TinyKittenのポートフォリオです。"
        />
        <meta property="og:image" content={`${NEXT_PUBLIC_URL}/ogp.png`} />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
