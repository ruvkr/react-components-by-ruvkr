import { useRef, useState, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useWindowResize } from '../../../hooks';
import { Spring } from '../../../libs/spring';
import { ChevronBack, ChevronForward } from '../../../assets/icons/essentials';
import styles from './styles.module.scss';
export const scrollClasses = {
  arrow: styles.arrow,
  body: styles.body,
  maskleft: styles.maskleft,
  maskright: styles.maskright,
  overlay: styles.overlay,
  scroll: styles.scroll,
};

interface Props {
  className?: string;
}

export const Scroll: React.FC<Props> = ({ children, className }) => {
  const [left, setLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const pointerEvents = useMotionValue<'all' | 'none'>('none');
  const opacityLeft = useTransform(x, [0, -64], [0, 1]);
  const opacityRight = useTransform(x, [left + 64, left], [1, 0]);
  const arrows = useRef(
    [
      {
        id: 'arrowLeft',
        className: styles.maskleft,
        opacity: opacityLeft,
        icon: <ChevronBack />,
      },
      {
        id: 'arrowRight',
        className: styles.maskright,
        opacity: opacityRight,
        icon: <ChevronForward />,
      },
    ].map(arrow => (
      <motion.div
        key={arrow.id}
        style={{ opacity: arrow.opacity }}
        className={arrow.className}
        children={<div className={styles.arrow}>{arrow.icon}</div>}
      />
    ))
  );

  const updateLeft = () => {
    if (!containerRef.current) return;
    const { offsetWidth: ow, scrollWidth: sw } = containerRef.current;
    if (ow - sw !== left) setLeft(ow - sw);
  };

  useLayoutEffect(updateLeft);

  useWindowResize(() => {
    if (x.isAnimating()) x.stop();

    Spring({
      from: x.get(),
      to: 0,
      stiffness: 400,
      damping: 40,
      onUpdate: v => x.set(v),
      onComplete: updateLeft,
    }).start();
  }, 100);

  return (
    <div className={clsx(styles.scroll, className)}>
      <motion.div
        ref={containerRef}
        drag='x'
        dragConstraints={{ left, right: 0 }}
        dragElastic={1}
        dragTransition={{ bounceDamping: 30, bounceStiffness: 300 }}
        style={{ x }}
        onDrag={() => pointerEvents.set('all')}
        onDragEnd={() => pointerEvents.set('none')}
        children={children}
        className={styles.body}
      />

      <motion.div style={{ pointerEvents }} className={styles.overlay} />
      {arrows.current}
    </div>
  );
};
