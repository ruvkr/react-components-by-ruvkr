import { UnstyledButton, UnstyledButtonProps } from '../../../components/Buttons';
import styles from './componentitem.module.scss';

export interface ComponentItemProps extends Omit<UnstyledButtonProps, 'classNames'> {
  icon: JSX.Element;
}

export const ComponentItem: React.FC<ComponentItemProps> = porps => {
  return (
    <UnstyledButton
      {...porps}
      classNames={{
        container: styles.container,
        focus: styles.focus,
        icon: styles.icon,
        name: styles.name,
      }}
    />
  );
};
