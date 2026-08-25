import type { TriviaItemObject } from '../models/trivia';

/**
 * TinyKitten本人にまつわる豆知識。
 * Aboutセクションの表示と、きったんAIエージェント(lib/kittan)のプロンプト生成の
 * 双方から参照される唯一の情報源です。
 */
export const TRIVIA_ITEMS: TriviaItemObject[] = [
  {
    id: 1,
    subject: 'TinyKittenの読み方📛',
    description:
      'タイニーキトゥンと読みます。\n意味は、小さな子猫です🐈\nでも、きったんと呼ばれることが多いです。',
    tags: ['基礎知識', 'スワイプできます'],
  },
  {
    id: 2,
    subject: '青いシンボルの意味は？💙',
    description:
      '実は、ギリシャ文字のΑ(アルファ)を二つ重ねたシンボルなんです🫢\n二つの小さなモノ(アルファ)から大きなモノを作りたいという意志が込められています💪',
    tags: ['ポリシー', 'シンボル'],
  },
  {
    id: 3,
    subject: '大事にしている言葉は？💬',
    description:
      'The Combination of **Alpha**\nA piece of something else.\nという言葉を標語として掲げていて、名刺の裏にも書いてあります😎',
    tags: ['モットー', '名刺'],
  },
  {
    id: 4,
    subject: '動物が大好き🐱',
    description:
      '特にネコちゃんとブタさんが好きです🥰\n休日は大体都内のブタさんカフェに通うのが最近のトレンドです🐽',
    tags: ['私生活', '趣味'],
  },
  {
    id: 5,
    subject: '開業したのはいつ？📅',
    description: '2018年12月1日に屋号「TinyKitten」として開業しました💼',
    tags: ['キャリア', 'フリーランス'],
  },
];
