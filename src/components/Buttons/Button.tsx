import styled from 'styled-components';
import clsx from 'clsx';
import styles from './button.module.scss';
export const buttonClasses = {
  button: styles.button,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface ButtonProps {
  disabled?: boolean;
  icon?: JSX.Element;
  name?: string;
  title?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  badge?: JSX.Element;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  icon,
  name,
  title,
  className,
  onClick,
  badge,
  forwardRef,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={title ?? name}
      className={clsx(styles.button, className)}
      ref={forwardRef}>
      <div tabIndex={-1} className={styles.focus}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {name && <ScName className={styles.name} $pleft={icon ? 0 : 8} $pright={badge ? 0 : 8} children={name} />}
        {badge && <div className={styles.icon}>{badge}</div>}
      </div>
    </button>
  );
};

const ScName = styled.div<{ $pleft: number; $pright: number }>`
  padding-left: ${p => p.$pleft}px;
  padding-right: ${p => p.$pright}px;
`;
