import PostitIcon from './PostitIcon';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Postit = ({ className, children }: Props) => (
  <div className={`inline-block ${className ?? ''}`}>
    <div className="relative">
      <PostitIcon width={210} height={48} className="drop-shadow-[0_3px_3px_rgba(0,0,0,0.16)]" />
      <p className="absolute left-0 top-0 ml-[21px] block w-[189px] text-center text-[1.2rem] leading-[48px] text-theme-text">
        {children}
      </p>
    </div>
  </div>
);

export default Postit;
