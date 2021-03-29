import { motion } from 'framer-motion';
import { ControlItem } from './types';
import styles from './controls.module.scss';

interface Props {
  controls: ControlItem[];
}

export const Controls: React.FC<Props> = ({ controls }) => {
  const _controls = controls.map(item => (
    <button
      key={item.id}
      title={item.title}
      onClick={() => !item.disabled && item.onClick && item.onClick()}
      disabled={item.disabled}
      className={styles.controlitem}>
      <motion.div tabIndex={-1} layout='position' className={styles.focus}>
        <div className={styles.icon}>{item.icon}</div>
      </motion.div>
    </button>
  ));

  return (
    <div className={styles.container}>
      <motion.div className={styles.background} layout />
      {_controls}
    </div>
  );
};
