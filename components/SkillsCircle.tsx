import type { SVGProps } from 'react';

type Props = {
  name: string;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
};

const SkillsCircle = ({ name, icon: Icon }: Props) => (
  <div className="flex flex-col items-center">
    <div className="mb-[18px] flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-box-bg animate-skill-circle">
      <div className="[&>svg]:h-16 [&>svg]:max-w-16 [&>svg]:w-auto">
        <Icon />
      </div>
    </div>
    <p className="text-center text-2xl font-bold text-theme-text">{name}</p>
  </div>
);

export default SkillsCircle;
