import { useRef } from 'react';
import clsx from 'clsx';
import { SideDrawer, Position } from '../../components/SlideDrawer';
import { TogglerButton } from '../../components/Buttons';
import styles from './styles.module.scss';
import { SideBar } from './SideBar';
import { Content } from './Content';

interface SDContentProps {
  position: Position;
  peek: boolean;
}

export const SDContent: React.FC<SDContentProps> = ({ position, peek }) => {
  const targetRef = useRef(document.getElementById('root'));

  return (
    <SideDrawer
      zIndex={900}
      position={position}
      peek={peek ? 64 : 0}
      targetRef={peek ? 'self' : targetRef}
      damping={peek ? 20 : undefined}
      className={styles.container}
      toggler={togglerProps => <TogglerButton {...togglerProps} zIndex={901} position={position} />}>
      {chldProps => (
        <div className={clsx(styles.content, styles[position])}>
          <div className={styles.bar} children={<SideBar {...chldProps} position={position} />} />
          <main className={styles.main} children={<Content {...chldProps} position={position} />} />
        </div>
      )}
    </SideDrawer>
  );
};
