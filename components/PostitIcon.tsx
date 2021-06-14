import { SVGProps, useContext } from 'react';
import { ThemeContext } from 'styled-components';

type Props = SVGProps<SVGSVGElement>;

const PostitIcon: React.FC<Props> = (props: Props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <svg width="210" height="48" viewBox="0 0 210 48" {...props}>
      <g transform="translate(-63 -439)">
        <rect
          width="210"
          height="48"
          transform="translate(63 439)"
          fill={themeContext.boxBg}
        />
        <rect
          width="21"
          height="48"
          transform="translate(63 439)"
          fill="#008ffe"
        />
      </g>
    </svg>
  );
};

export default PostitIcon;
