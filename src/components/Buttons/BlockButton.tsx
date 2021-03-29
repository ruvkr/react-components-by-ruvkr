import styled from 'styled-components';
import clsx from 'clsx';
import styles from './blockbuttons.module.scss';
export const blockButtonClasses = {
  blockbutton: styles.blockbutton,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface BlockButtonProps {
  icon?: JSX.Element;
  name: string;
  title?: string;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  badge?: JSX.Element;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const BlockButton: React.FC<BlockButtonProps> = ({
  icon,
  name,
  title,
  disabled = false,
  className,
  onClick,
  badge,
  forwardRef,
}) => {
  return (
    <button
      className={clsx(styles.blockbutton, className)}
      title={title ?? name}
      disabled={disabled}
      onClick={onClick}
      ref={forwardRef}>
      <ScFocus $badge={Boolean(badge)} tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.name}>{name}</div>
        {badge && <div className={styles.icon}>{badge}</div>}
      </ScFocus>
    </button>
  );
};

const ScFocus = styled.div<{ $badge: boolean }>`
  grid-template-columns: ${p => (p.$badge ? `auto 1fr auto` : `auto 1fr`)};
`;
