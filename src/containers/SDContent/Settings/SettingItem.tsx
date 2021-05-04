import clsx from 'clsx';
import { UnstyledButton, UnstyledButtonProps } from '../../../components/Buttons';
import styles from './settingitem.module.scss';

export interface SettingItemProps extends Omit<UnstyledButtonProps, 'classNames'> {
  icon: JSX.Element;
  active: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({ active, ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      classNames={{
        container: clsx(styles.container, active && styles.active),
        focus: styles.focus,
        icon: styles.icon,
        name: styles.name,
      }}
    />
  );
};
