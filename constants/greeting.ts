const GREETING_MESSAGES = [
  // TODO: ハロウィン終わったらコメントアウト解除してハロウィン文言を消す
  // 'デザインもできます',
  // '猫が大好き',
  // 'アプリ開発もOK',
  // 'TrainLCD開発中',
  // '犬も大好き',
  'お菓子ちょうだい',
  '羽目外さないでね',
  'ランタンじゃないよ',
  '非売品だよ',
  '食べられないよ',
] as const;

export const getRandomGreeting = (): string => {
  const index = Math.floor(Math.random() * GREETING_MESSAGES.length);
  return GREETING_MESSAGES[index];
};
