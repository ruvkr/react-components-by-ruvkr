import clsx from 'clsx';
import styles from './styles.module.scss';
import { ComponentList } from '../ComponentList';
import { Settings } from '../Settings';
import { ChildrenProps, Position } from '../../../components/SlideDrawer';

export interface ContentProps extends ChildrenProps {
  position: Position;
}

export const Content: React.FC<ContentProps> = ({ position }) => {
  return (
    <div className={clsx(styles.container, styles[position])}>
      <div className={styles.components} children={<ComponentList />} />
      <div className={styles.settings} children={<Settings />} />
    </div>
  );
};
