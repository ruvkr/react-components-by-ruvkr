import clsx from 'clsx';
import styles from './iconbutton.module.scss';
import { UnstyledButton } from './Button';

export const iconButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
};

export interface IconButtonProps {
  size?: number;
  icon: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const IconButton: React.FC<IconButtonProps> = ({ className, size = 36, ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      style={{ '--size': size + 'px' } as React.CSSProperties}
      classNames={{
        container: clsx(styles.container, className),
        focus: styles.focus,
        icon: styles.icon,
      }}
    />
  );
};
