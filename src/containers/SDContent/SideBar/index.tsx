import styles from './styles.module.scss';
import { sidebaritems } from './sidebaritems';
import { SideBarItem } from './SideBarItem';
import { Position, ChildrenProps } from '../../../components/SlideDrawer';
import clsx from 'clsx';

interface SideBarProps extends ChildrenProps {
  position: Position;
}

export const SideBar: React.FC<SideBarProps> = ({ position }) => {
  const items = sidebaritems.map(i => <SideBarItem icon={i.icon} key={i.id} title={i.name} />);
  return <div className={clsx(styles.container, styles[position])}>{items}</div>;
};
