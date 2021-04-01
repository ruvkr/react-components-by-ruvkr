import { motion, MotionValue, useTransform } from 'framer-motion';
import clsx from 'clsx';
import styles from './container.module.scss';

export interface ContainerProps {
  position: 'left' | 'right' | 'bottom' | 'top';
  className?: string;
  zIndex: number;
  progress: MotionValue<number>;
  motionValue: MotionValue<number>;
  toggle?: () => void;
  forwardContainerRef?: React.MutableRefObject<HTMLDivElement | null>;
  forwardSdRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export const Container: React.FC<ContainerProps> = ({
  position,
  className,
  children,
  zIndex,
  progress,
  motionValue,
  toggle,
  forwardContainerRef,
  forwardSdRef,
}) => {
  const opacity = useTransform(progress, [0.1, 0.9], [0, 1]);
  const pointerEvents = useTransform(progress, pointerTransformer);
  const style = position === 'top' || position === 'bottom' ? { y: motionValue } : { x: motionValue };
  const _className = clsx(styles.container, styles[position], className);

  return (
    <div data-id='sd-container' ref={forwardContainerRef}>
      <motion.div className={styles.backdrop} style={{ opacity, pointerEvents, zIndex: zIndex - 1 }} onClick={toggle} />
      <motion.div className={_className} children={children} style={{ ...style, zIndex }} ref={forwardSdRef} />
    </div>
  );
};

const pointerTransformer = (value: number) => {
  if (value < 0.9) return 'none';
  else return 'all';
};
