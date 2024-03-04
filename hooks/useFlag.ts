'use client';
import { useState } from 'react';

export const useFlag = (): {
  value: boolean;
  toTrue: () => void;
  toFalse: () => void;
} => {
  const [value, setValue] = useState(false);
  const toTrue = () => setValue(true);
  const toFalse = () => setValue(false);
  return { value, toTrue, toFalse };
};
