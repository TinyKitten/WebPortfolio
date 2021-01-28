import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const VerticalPostitIcon: React.FC<Props> = (props: Props) => (
  <svg width="120" height="144" viewBox="0 0 120 144" {...props}>
    <g transform="translate(-32 -667)">
      <rect
        width="120"
        height="144"
        transform="translate(32 667)"
        fill="#fff"
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

export default VerticalPostitIcon;
