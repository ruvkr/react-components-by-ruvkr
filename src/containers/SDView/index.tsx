import { useState } from 'react';
import { SideDrawer, Position } from '../../components/SlideDrawer';
import { TogglerButton } from '../../components/Buttons';
import styles from './styles.module.scss';
import { Content } from './Content';

export interface SDViewProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export const SDView: React.FC<SDViewProps> = ({ targetRef }) => {
  const [position, setPosition] = useState<Position>('left');

  return (
    <SideDrawer
      position={position}
      zIndex={900}
      targetRef={targetRef}
      className={styles.container}
      toggler={togglerProps => <TogglerButton {...togglerProps} zIndex={901} position={position} />}>
      {childrenProps => <Content {...childrenProps} position={position} onPositionChange={setPosition} />}
    </SideDrawer>
  );
};