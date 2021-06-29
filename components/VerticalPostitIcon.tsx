import { SVGProps, useContext } from 'react';
import { ThemeContext } from 'styled-components';

type Props = SVGProps<SVGSVGElement>;

const VerticalPostitIcon: React.FC<Props> = (props: Props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <svg width="120" height="144" viewBox="0 0 120 144" {...props}>
      <g transform="translate(-32 -667)">
        <rect
          width="120"
          height="144"
          transform="translate(32 667)"
          fill={themeContext.boxBg}
        />
        <rect
          width="120"
          height="21"
          transform="translate(32 790)"
          fill="#008ffe"
        />
      </g>
    </svg>
  );
};

export default VerticalPostitIcon;
