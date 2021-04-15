import { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { getTop, getLeft, getTransformOrigin } from './utils';
import { getDimensions } from '../../../libs/utils';
import styles from './container.module.scss';

export interface InputContainerProps {
  items: any;
  domContainerName?: string;
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  onOutsideClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  positionCallback?: (value: 1 | -1) => void;
  zIndex?: number;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  children,
  anchorRef,
  onOutsideClick,
  items,
  domContainerName = 'input-container',
  positionCallback,
  zIndex = 100,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    const targetDimensions = getDimensions(anchorRef);
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
      positionCallback && positionCallback(-1);
    } else {
      containerRef.current.style.top = top + 'px';
      positionCallback && positionCallback(1);
    }
  }, [anchorRef, items, positionCallback]);

  return createPortal(
    <div data-id={domContainerName}>
      <div
        key='backdrop'
        onClick={onOutsideClick}
        className={styles.backdrop}
        style={{ zIndex: zIndex - 1 }} //
      />
      <motion.div
        key='container'
        ref={containerRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        style={{ zIndex }}
        className={styles.container}>
        <motion.div layout className={styles.background} />
        {children}
      </motion.div>
    </div>,
    document.body
  );
};
