import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import React from 'react';
import Header from '../components/Header';
import './global.css';
import { Provider } from './provider';
import 'swiper/css';

const raleway = Raleway({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TinyKitten',
  description: 'フロントエンドエンジニア TinyKittenのポートフォリオです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={raleway.className}>
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
