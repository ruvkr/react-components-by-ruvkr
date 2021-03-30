import { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { getDimensions, getTop, getLeft, getTransformOrigin } from './utils';
import styles from './container.module.scss';
import { MenuItem } from './types';

interface Props {
  items: MenuItem[];
  buttonRef: React.MutableRefObject<HTMLElement | null>;
  setDelayDirection: React.MutableRefObject<1 | -1>;
  onOutsideClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Container: React.FC<Props> = ({ children, buttonRef, setDelayDirection, onOutsideClick, items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    const targetDimensions = getDimensions(buttonRef);
    const elementDimensions = getDimensions(containerRef);
    if (!targetDimensions || !elementDimensions || !containerRef.current) return;
    const left = getLeft({ targetDimensions, elementDimensions });
    containerRef.current.style.left = left + 'px';

    if (!firstRun.current) return;
    firstRun.current = false;
    const { top, position } = getTop({ targetDimensions, elementDimensions });
    const transformOrigin = getTransformOrigin({ targetDimensions, elementDimensions, top, left });
    containerRef.current.style.transformOrigin = transformOrigin;

    if (position === 'onTop') {
      containerRef.current.style.bottom = window.innerHeight - top - elementDimensions.height + 'px';
      setDelayDirection.current = -1;
    } else {
      containerRef.current.style.top = top + 'px';
      setDelayDirection.current = 1;
    }
  }, [buttonRef, items, setDelayDirection]);

  return createPortal(
    <>
      <div key='menu-backdrop' onClick={onOutsideClick} className={styles.backdrop} />
      <motion.div
        key='menu-container'
        ref={containerRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        className={styles.container}>
        <motion.div layout className={styles.background} />
        {children}
      </motion.div>
    </>,

    // mount in id="others"
    document.getElementById('others') as HTMLElement
  );
};
