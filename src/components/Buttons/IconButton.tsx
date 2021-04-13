import clsx from 'clsx';
import styled from 'styled-components';
import styles from './iconbutton.module.scss';

export const iconButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
};

export interface IconButtonBareProps {
  size?: number;
  disabled?: boolean;
  icon: JSX.Element;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
  classNames?: {
    container?: string;
    focus?: string;
    icon?: string;
  };
}

export interface IconButtonProps extends Omit<IconButtonBareProps, 'classNames'> {
  className?: string;
}

export const IconButtonBare: React.FC<IconButtonBareProps> = ({
  size = 36,
  disabled = false,
  icon,
  title,
  classNames,
  onClick,
  forwardRef,
}) => {
  return (
    <ScButton
      $size={size}
      title={title}
      disabled={disabled}
      className={classNames?.container}
      onClick={onClick}
      ref={forwardRef}>
      <div tabIndex={-1} className={classNames?.focus}>
        <div className={classNames?.icon}>{icon}</div>
      </div>
    </ScButton>
  );
};

export const IconButton: React.FC<IconButtonProps> = ({ className, ...rest }) => {
  return (
    <IconButtonBare
      {...rest}
      classNames={{
        container: clsx(styles.container, className),
        focus: styles.focus,
        icon: styles.icon,
      }}
    />
  );
};

const ScButton = styled.button<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
