import VerticalPostitIcon from './VerticalPostitIcon';

type Props = {
  title: string;
  subtitle: string;
  className?: string;
};

const TitlePostit = ({ className, title, subtitle }: Props) => (
  <div
    className={`absolute top-0 left-8 drop-shadow-[0_3px_3px_rgba(0,0,0,0.16)] animate-title-postit ${className ?? ''}`}
  >
    <VerticalPostitIcon className="relative" />
    <div className="absolute bottom-[calc(50%-10.5px)] w-full text-center">
      <p className="text-[1.25rem] font-bold whitespace-pre-wrap text-primary">
        {title}
      </p>
      <p className="text-base font-bold leading-6 text-theme-text">{subtitle}</p>
    </div>
  </div>
);

export default TitlePostit;
