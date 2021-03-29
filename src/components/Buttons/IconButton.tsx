import clsx from 'clsx';
import styled from 'styled-components';
import styles from './iconbutton.module.scss';
export const iconButtonClasses = {
  iconbutton: styles.iconbutton,
  focus: styles.focus,
  icon: styles.icon,
};

export interface IconButtonProps {
  size?: number;
  disabled?: boolean;
  icon: JSX.Element;
  title?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const IconButton: React.FC<IconButtonProps> = ({
  size = 36,
  disabled = false,
  icon,
  title,
  className,
  onClick,
  forwardRef, //
}) => {
  return (
    <ScButton
      $size={size}
      title={title}
      disabled={disabled}
      className={clsx(styles.iconbutton, className)}
      onClick={onClick}
      ref={forwardRef}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>{icon}</div>
      </div>
    </ScButton>
  );
};

const ScButton = styled.button<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
