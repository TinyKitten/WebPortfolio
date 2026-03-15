import type { SVGProps } from 'react';

const PostitIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="210" height="48" viewBox="0 0 210 48" {...props}>
    <g transform="translate(-63 -439)">
      <rect width="210" height="48" transform="translate(63 439)" className="fill-box-bg" />
      <rect width="21" height="48" transform="translate(63 439)" className="fill-primary" />
    </g>
  </svg>
);

export default PostitIcon;
