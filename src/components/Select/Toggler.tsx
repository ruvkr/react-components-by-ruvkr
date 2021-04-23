import styles from './toggler.module.scss';
import { UnstyledButton, UnstyledButtonProps } from '../Buttons';
export interface TogglerProps extends Omit<UnstyledButtonProps, 'classNames'> {}
export const Toggler: React.FC<TogglerProps> = props => {
  return (
    <UnstyledButton
      {...props}
      classNames={{
        container: styles.toggler,
        focus: styles.focus,
        icon: styles.icon,
        name: styles.name,
      }}
    />
  );
};
