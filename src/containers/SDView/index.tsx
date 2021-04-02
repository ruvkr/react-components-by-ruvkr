import { useState } from 'react';
import clsx from 'clsx';
import { SideDrawer, Position } from '../../components/SlideDrawer';
import { TogglerButton } from '../../components/Buttons';
import styles from './styles.module.scss';
import { PositionSwitch } from './PositionSwitch';

export interface SDViewProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export const SDView: React.FC<SDViewProps> = ({ targetRef }) => {
  const [position, setPosition] = useState<Position>('left');
  const orientation = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';

  return (
    <SideDrawer
      position={position}
      zIndex={900}
      targetRef={targetRef}
      className={styles.container}
      toggler={({ opened, ...rest }) => <TogglerButton {...rest} zIndex={901} position={position} />}>
      {() => (
        <div className={clsx(styles.body, styles[orientation])}>
          <div></div>
          <PositionSwitch position={position} onChange={setPosition} />
        </div>
      )}
    </SideDrawer>
  );
};
