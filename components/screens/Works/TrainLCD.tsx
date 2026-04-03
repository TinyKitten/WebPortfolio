"use client";
import Image from "next/image";
import Link from "next/link";
import TrainLCDImage from "../../../assets/works/trainlcd.png";
import { useScreenVisibility } from "../../../hooks/useScreenVisibility";
import Button from "../../Button";
import Postit from "../../Postit";
import { TriviaSlider } from "../../TriviaSlider";

const WorksTrainLCD = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <div
      ref={ref}
      className="flex min-h-screen flex-col items-center justify-center py-16 bp800:py-32"
    >
      {visible && (
        <div className="relative flex items-center justify-center">
          <Postit className="absolute -bottom-6 z-[1] opacity-0 animate-heading-postit-delayed">
            TrainLCD
          </Postit>
          <div className="relative h-auto w-[480px] max-w-[75%] animate-image-slide drop-shadow-[0_3px_6px_rgba(0,0,0,0.16)]">
            <Image
              sizes="480px"
              src={TrainLCDImage}
              alt="TrainLCD"
              className="object-contain"
              style={{ position: "relative" }}
            />
          </div>
        </div>
      )}

      {visible && (
        <div className="w-full">
          <p className="mt-12 text-center leading-[1.75] text-heading-text animate-image-slide">
            電車のあの画面、持ち歩けます。
            <br />
            2019年から個人開発を続け、現在も進化中。
          </p>

          <div className="mt-8">
            <TriviaSlider
              title="TrainLCD"
              items={[
                {
                  id: 1,
                  subject: "累計6万DL超🔥",
                  description:
                    "iOSを中心に利用されています。\n初回リリースから全国の鉄道路線を網羅し6年以上愛され続け、\n累計500件以上のレビューで平均評価⭐️4以上！\n日々の通勤・旅行で多くのユーザーに活用されています。",
                  tags: ["人気アプリ", "スワイプできます"],
                },
                {
                  id: 2,
                  subject: "フルスタックな開発🧑‍💻",
                  description:
                    "React Nativeでモバイルアプリを実装し、Rust製バックエンドやgRPCと連携🛠️\nFirebaseを活用し、安定した運用基盤を実現。フロントからサーバーまで幅広く自ら設計・実装し、個人開発ながらチーム開発水準のアーキテクチャを構築しています。",
                  tags: ["個人開発", "フルスタック"],
                },
                {
                  id: 3,
                  subject: "6年以上継続運営🛠️",
                  description:
                    "レビューや要望をアプリ内から直接受け付け、GitHub Issueと自動連携👀\nOSの仕様変更や新路線データにも随時対応。\n毎年複数回のアップデートを継続し、長期的に安定した開発・運営体制を維持しています！",
                  tags: ["継続改善", "ユーザー志向"],
                },
              ]}
            />
          </div>
        </div>
      )}
      {visible && (
        <Link href="/works/trainlcd" aria-label="TrainLCD">
          <Button className="my-8 animate-image-slide">さらに詳しく</Button>
        </Link>
      )}
    </div>
  );
};

export default WorksTrainLCD;
