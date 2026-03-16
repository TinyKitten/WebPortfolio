import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "../components/Header";
import "./globals.css";

const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "TinyKitten",
  description: "フルスタッククリエイター TinyKittenのポートフォリオです。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={raleway.variable}>
      <body className={raleway.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
