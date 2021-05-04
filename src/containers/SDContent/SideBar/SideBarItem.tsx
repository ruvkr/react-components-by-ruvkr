import { UnstyledButton, UnstyledButtonProps } from '../../../components/Buttons';
import styles from './sidebaritem.module.scss';

export interface SideBarItemProps extends Omit<UnstyledButtonProps, 'classNames'> {
  icon: JSX.Element;
}

export const SideBarItem: React.FC<SideBarItemProps> = props => {
  return (
    <UnstyledButton
      {...props}
      classNames={{
        container: styles.container,
        focus: styles.focus,
        icon: styles.icon,
      }}
    />
  );
};
