import styles from './toggler.module.scss';
import { ButtonBare, ButtonBareProps } from '../Buttons';
export interface TogglerProps extends Omit<ButtonBareProps, 'classNames'> {}
export const Toggler: React.FC<TogglerProps> = props => {
  return (
    <ButtonBare
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
