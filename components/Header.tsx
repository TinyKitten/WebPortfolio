'use client';
import Link from 'next/link';
import TinyKittenIcon from './TinyKittenIcon';

const Header = () => (
  <header className="sticky left-0 top-0 z-[9999] flex h-12 w-full items-center justify-center shadow-[0_0_2px_rgba(0,0,0,0.25)] backdrop-blur-[10px]">
    <div>
      <Link href="/" aria-label="For top page">
        <TinyKittenIcon width={32} height={32} />
      </Link>
    </div>
  </header>
);

export default Header;
