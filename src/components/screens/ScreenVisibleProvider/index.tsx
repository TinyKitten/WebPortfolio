import React, { MutableRefObject, useCallback, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  onVisibleChange: (visible: boolean) => void;
};

const ScreenVisibleProvider: React.FC<Props> = ({
  contentRef,
  children,
  onVisibleChange,
}: Props) => {
  const handleScroll = useCallback(() => {
    const top = contentRef.current?.getBoundingClientRect().top;
    if (top) {
      onVisibleChange(top < window.innerHeight / 1.5);
    }
  }, [contentRef, onVisibleChange]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <>{children}</>;
};

export default ScreenVisibleProvider;
