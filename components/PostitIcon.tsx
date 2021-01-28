import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const PostitIcon: React.FC<Props> = (props: Props) => (
  <svg width="210" height="48" viewBox="0 0 210 48" {...props}>
    <g transform="translate(-63 -439)">
      <rect width="210" height="48" transform="translate(63 439)" fill="#fff" />
      <rect
        width="21"
        height="48"
        transform="translate(63 439)"
        fill="#008ffe"
      />
    </g>
  </svg>
);

export default PostitIcon;
