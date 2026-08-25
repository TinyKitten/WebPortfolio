import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import './globals.css';

// 全ページ共通で右下に出す。初期表示の邪魔をしないよう遅延読み込みする。
const KittanChatWidget = dynamic(() => import('../components/KittanChat'));

const raleway = Raleway({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'TinyKitten',
  description: 'フルスタッククリエイター TinyKittenのポートフォリオです。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={raleway.variable}>
      <body className={raleway.className}>
        <Header />
        <main>{children}</main>
        <KittanChatWidget />
      </body>
    </html>
  );
}
