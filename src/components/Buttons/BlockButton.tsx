import clsx from 'clsx';
import styles from './blockbuttons.module.scss';
import { UnstyledButton } from './Button';

export const blockButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface BlockButtonProps {
  icon?: JSX.Element;
  name: string;
  title?: string;
  disabled?: boolean;
  badge?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export const BlockButton: React.FC<BlockButtonProps> = ({ className, ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      classNames={{
        container: clsx(styles.container, className),
        focus: styles.focus,
        icon: styles.icon,
        name: styles.name,
      }}
    />
  );
};
