'use client';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const useScreenVisibility = (): {
  visible: boolean;
  ref: MutableRefObject<HTMLDivElement | null>;
} => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const top = ref.current?.getBoundingClientRect().top;
    if (top) {
      setVisible(top < window.innerHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { visible, ref };
};
