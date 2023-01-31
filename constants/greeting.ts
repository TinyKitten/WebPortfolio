const GREETING_MESSAGES = [
  'デザインもできます',
  '猫が大好き',
  'アプリ開発もOK',
  'TrainLCD開発中',
  '犬も大好き',
] as const;

export const getRandomGreeting = (): string => {
  const index = Math.floor(Math.random() * GREETING_MESSAGES.length);
  return GREETING_MESSAGES[index];
};
