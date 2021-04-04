import clsx from 'clsx';
import styles from './content.module.scss';
import { PositionSwitch } from './PositionSwitch';
import { Position, ChildrenProps } from '../../components/SlideDrawer';

export interface ContentProps extends ChildrenProps {
  position: Position;
  onPositionChange: (position: Position) => void;
}

export const Content: React.FC<ContentProps> = ({ position, onPositionChange }) => {
  const orientation = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';

  return (
    <div className={clsx(styles.body, styles[orientation])}>
      <div></div>
      <PositionSwitch position={position} onChange={onPositionChange} />
    </div>
  );
};
