'use client';

import ArrowIcon from './ArrowIcon';

export const ArrowButton = () => {
  const handleClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const top = aboutSection.getBoundingClientRect().top + window.scrollY - 48;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-8 w-16 cursor-pointer animate-arrow-small md:bottom-16 md:animate-arrow-large"
      aria-label="Scroll to about section"
    >
      <ArrowIcon />
    </button>
  );
};
