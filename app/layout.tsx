import { Metadata } from 'next';
import React from 'react';
import './global.css';
import { Provider } from './provider';

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
    <html lang="ja">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
