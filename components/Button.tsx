import styles from '../styles/components/Button.module.css';

type Props = {
  color?: string;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<Props> = ({
  color = '#008ffe',
  children,
  className,
}: Props) => (
  <button
    style={{ backgroundColor: color }}
    className={[className, styles.button].join(' ')}
  >
    {children}
  </button>
);

export default Button;
