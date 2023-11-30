const GREETING_MESSAGES = [
  'デザインもできます',
  '猫が大好き',
  'アプリ開発もOK',
  'TrainLCD開発中',
  '独立5周年',
  // NOTE: ハロウィン用
  // 'お菓子ちょうだい',
  // '羽目外さないでね',
  // 'ランタンじゃないよ',
  // '非売品だよ',
  // '食べられないよ',
] as const;

export const getRandomGreeting = (): string => {
  const index = Math.floor(Math.random() * GREETING_MESSAGES.length);
  return GREETING_MESSAGES[index];
};
