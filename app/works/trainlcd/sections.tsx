"use client";
import Image from "next/image";
import Link from "next/link";
import TrainLCDImage from "../../../assets/works/trainlcd.png";
import Button from "../../../components/Button";
import Postit from "../../../components/Postit";
import SkillsCircle from "../../../components/SkillsCircle";
import TitlePostit from "../../../components/TitlePostit";
import Tree from "../../../components/Tree";
import ReactIcon from "../../../components/marks/ReactIcon";
import RustIcon from "../../../components/marks/RustIcon";
import TSIcon from "../../../components/marks/TSIcon";
import TonicIcon from "../../../components/marks/TonicIcon";
import storiesArray from "../../../fixtures/stories/works/trainlcd.stories.json";
import { useScreenVisibility } from "../../../hooks/useScreenVisibility";
import PostgreSQLIcon from "../../../components/marks/PostgreSQLIcon";
import NodeJSIcon from "@/components/marks/NodeJSIcon";

const SectionWrapper = ({
  children,
  className,
  padTop,
  innerRef,
}: {
  children: React.ReactNode;
  className?: string;
  padTop?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}) => (
  <section
    ref={innerRef}
    className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-theme-bg even:bg-sub-bg first:min-h-screen first:-mt-12 ${padTop ? "pt-36" : ""} ${className ?? ""}`}
  >
    {children}
  </section>
);

export const FirstSection = () => (
  <SectionWrapper>
    <Postit className="mb-8 block animate-single-heading-postit">Dev/MobileApp</Postit>
    <div className="relative h-auto w-80 animate-image-slide-delayed opacity-0 drop-shadow-[0_3px_6px_rgba(0,0,0,0.16)] bp800:w-[480px]">
      <Image
        src={TrainLCDImage}
        sizes="320px"
        alt="TrainLCD"
        priority
        className="object-contain"
        style={{ position: "relative" }}
      />
    </div>
    <h2 className="mt-8 text-center text-[2rem] font-bold text-theme-text">TrainLCD</h2>
    <p className="mt-3 max-w-[calc(100%-64px)] text-center leading-[1.75] text-theme-text">
      電車のあの画面、持ち歩けます。
    </p>
  </SectionWrapper>
);

export const ConceptSection = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <SectionWrapper innerRef={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="コンセプト" />}
      <article className="mt-36 flex w-full min-h-full flex-col items-center justify-center bp800:mt-0">
        <h2 className="max-w-[90%] text-[2rem] font-bold leading-[1.5] text-theme-text">
          Webの技術で電車のLCDを再現したい
        </h2>
        <p className="mt-4 max-w-[90%] text-left leading-8 text-theme-text bp800:text-center">
          このアプリの開発を始める前に趣味で作っていた
          <a
            href="https://github.com/TinyKitten/StationAPI"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-theme-text no-underline"
          >
            StationAPI
          </a>
          の応用例の一つです。
          <br />
          以前より電車のLCDを再現したいと思っていて、
          <a
            href="https://github.com/TinyKitten/StationAPI"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-theme-text no-underline"
          >
            StationAPI
          </a>
          の大型アップデートで色々取れるようにした影響で作ろうと思いました。
          <br />
          満員電車、LCDのない路線など、現在どこにいるか、どの駅を通るのかひと目で分かります。
          <br />
          ぜひお試しください。
        </p>
        <small className="mt-0 max-w-[90%] w-full text-left text-[0.8rem] leading-8 text-theme-text bp800:text-center">
          ※地下区間は非対応です
        </small>
      </article>
    </SectionWrapper>
  );
};

export const TechnologySection = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <SectionWrapper padTop innerRef={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="使用技術" />}
      {visible && (
        <div className="mt-16 grid w-3/4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-8 animate-image-slide">
          <SkillsCircle icon={TSIcon} name="TypeScript" />
          <SkillsCircle icon={NodeJSIcon} name="Node.js" />
          <SkillsCircle icon={ReactIcon} name="React Native" />
          <SkillsCircle icon={RustIcon} name="Rust" />
          <SkillsCircle icon={TonicIcon} name="Tonic" />
          <SkillsCircle icon={PostgreSQLIcon} name="PostgreSQL" />
        </div>
      )}
    </SectionWrapper>
  );
};

export const StoriesSection = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <SectionWrapper padTop innerRef={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="ストーリー" />}
      {visible && (
        <div className="my-16">
          <Tree experienceType="worksStory" items={storiesArray} visible worksName="trainlcd" />
        </div>
      )}
    </SectionWrapper>
  );
};

export const AccessSection = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <SectionWrapper innerRef={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="リンク" />}
      <article className="mt-36 flex w-full min-h-full flex-col items-center justify-center bp800:mt-0">
        <a href="https://trainlcd.app" target="_blank" rel="noopener noreferrer" className="mb-8">
          <Button>公式サイト</Button>
        </a>
        <a
          href="https://github.com/TrainLCD/MobileApp"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8"
        >
          <Button>リポジトリ</Button>
        </a>
        <Link href="/">
          <Button color="#555">戻る</Button>
        </Link>
      </article>
    </SectionWrapper>
  );
};
