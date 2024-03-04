'use client';
import { useEffect, useState } from 'react';

const WAIT_DURATION = 3000;

export const useActionable = (active: boolean) => {
  const [actionable, setActionable] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (active) {
      timer = setTimeout(() => {
        setActionable(true);
      }, WAIT_DURATION);
    }
    return () => {
      setActionable(false);
      clearTimeout(timer);
    };
  }, [active]);

  return actionable;
};
