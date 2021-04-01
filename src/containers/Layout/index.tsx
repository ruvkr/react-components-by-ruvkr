import { useState } from 'react';
import { useRef } from 'react';
import { SideDrawer, Position } from '../../components/SlideDrawer';
import { TogglerButton } from '../../components/Buttons';
import styles from './styles.module.scss';
import { MenuView } from '../MenuView';

export const Layout: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [position] = useState<Position>('left');

  return (
    <div ref={targetRef} className={styles.container}>
      <SideDrawer
        position={position}
        zIndex={900}
        targetRef={targetRef}
        toggler={({ opened, ...rest }) => <TogglerButton {...rest} zIndex={901} position={position} />}>
        {() => <div></div>}
      </SideDrawer>

      <MenuView />
    </div>
  );
};
