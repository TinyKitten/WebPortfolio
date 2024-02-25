import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import React from 'react';
import './global.css';
import { Provider } from './provider';

const raleway = Raleway({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TinyKitten',
  description: 'フロントエンドエンジニア TinyKittenのポートフォリオです。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? ''),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={raleway.className}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
