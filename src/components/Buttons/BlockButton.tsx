import styled from 'styled-components';
import clsx from 'clsx';
import styles from './blockbuttons.module.scss';

export const blockButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface BlockButtonBareProps {
  icon?: JSX.Element;
  name: string;
  title?: string;
  disabled?: boolean;
  badge?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
  classNames?: {
    container?: string;
    focus?: string;
    icon?: string;
    name?: string;
  };
}

export interface BlockButtonProps extends Omit<BlockButtonBareProps, 'classNames'> {
  className?: string;
}

export const BlockButtonBare: React.FC<BlockButtonBareProps> = ({
  icon,
  name,
  title,
  disabled = false,
  classNames,
  onClick,
  badge,
  forwardRef,
}) => {
  return (
    <button
      className={classNames?.container}
      title={title ?? name}
      disabled={disabled}
      onClick={onClick}
      ref={forwardRef}>
      <ScFocus $badge={Boolean(badge)} tabIndex={-1} className={classNames?.focus}>
        <div className={classNames?.icon}>{icon}</div>
        <div className={classNames?.name}>{name}</div>
        {badge && <div className={classNames?.icon}>{badge}</div>}
      </ScFocus>
    </button>
  );
};

export const BlockButton: React.FC<BlockButtonProps> = ({ className, ...rest }) => {
  return (
    <BlockButtonBare
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

const ScFocus = styled.div<{ $badge: boolean }>`
  grid-template-columns: ${p => (p.$badge ? `auto 1fr auto` : `auto 1fr`)};
`;
