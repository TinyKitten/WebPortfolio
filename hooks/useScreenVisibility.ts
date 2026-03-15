'use client';
import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const useScreenVisibility = (
  options?: { resetOnLeave?: boolean }
): {
  visible: boolean;
  ref: MutableRefObject<HTMLDivElement | null>;
} => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const resetOnLeave = options?.resetOnLeave ?? true;

  const handleScroll = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (resetOnLeave) {
        setVisible(isInView);
      } else if (isInView) {
        setVisible(true);
      }
    }
  }, [resetOnLeave]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { visible, ref };
};
