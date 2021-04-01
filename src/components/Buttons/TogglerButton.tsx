import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './togglebutton.module.scss';

const d_middle = 'M 3,13 23,13';
const d_top = ['M 13,5 23,5', 'M 13,13 20.07106,5.92894'];

export interface TogglerButtonProps {
  onClick?: () => void;
  progress: MotionValue<number>;
  position?: 'left' | 'right' | 'bottom' | 'top';
  zIndex?: number;
}

export const TogglerButton: React.FC<TogglerButtonProps> = ({ onClick, progress, position = 'left', zIndex = 100 }) => {
  const d = useTransform(progress, [0, 1], d_top);
  const middleRotate = useTransform(progress, [0, 1], [0, 45]);
  const rotate = useTransform(progress, v => v * 90);

  return createPortal(
    <div data-id='toggler-button-container' className={clsx(styles.container, styles[position])} style={{ zIndex }}>
      <div className={styles.inner}>
        <motion.div className={styles.background} style={{ opacity: progress }} />
        <button className={styles.toggler} onClick={onClick}>
          <div className={styles.focus} tabIndex={-1}>
            <svg width='100%' height='100%' viewBox='0 0 26 26'>
              <motion.g fill='none' style={{ rotate }}>
                <motion.path className={styles.path} d={d} />
                <motion.path className={styles.path} d={d_middle} style={{ rotate: middleRotate }} />
                <motion.path className={clsx(styles.path, styles.pathbottom)} d={d} />
              </motion.g>
            </svg>
          </div>
        </button>
      </div>
    </div>,
    document.body
  );
};
