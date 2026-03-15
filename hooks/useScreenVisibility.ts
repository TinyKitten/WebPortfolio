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
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(isInView);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { visible, ref };
};
