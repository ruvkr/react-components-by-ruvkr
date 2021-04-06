import { useState, useRef, useLayoutEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { motion, useMotionValue } from 'framer-motion';
import { Menu } from '../../components/Menu';
import { menuItems } from './sample_items';
import { ArrowForward } from '../../assets/icons/essentials';
import { getPosition } from './utils';

export const MenuPage: React.FC = () => {
  const [draging, setDraging] = useState(false);
  const dragableRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useLayoutEffect(() => {
    if (draging || !dragableRef.current) return;
    const position = getPosition({ dragableRef, infoRef, x, y });
    dragableRef.current.className = clsx(styles.dragable, styles[position]);
  }, [draging, x, y]);

  return (
    <div className={styles.container}>
      <motion.div
        drag
        style={{ x, y }}
        title='Drag me'
        ref={dragableRef}
        dragMomentum={false}
        className={styles.dragable}
        onDragStart={() => setDraging(true)}
        onDragEnd={() => setDraging(false)}>
        <Menu items={menuItems} name='Menu' title='Menu' zIndex={910} />
        <div className={clsx(styles.overlay, draging && styles.disable)} />
        <div className={clsx(styles.info, draging && styles.hide)} ref={infoRef}>
          <span>Can be dragged</span>
          <ArrowForward className={styles.icon} />
        </div>
      </motion.div>
    </div>
  );
};
