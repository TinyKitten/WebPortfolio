'use client';
import {
  type MutableRefObject,
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
    if (top != null) {
      setVisible(top < window.innerHeight);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { visible, ref };
};
