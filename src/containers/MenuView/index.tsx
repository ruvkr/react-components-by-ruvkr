import { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import { Menu } from '../../components/Menu';
import { menuItems } from './sample_items';
import { InformationCircle, ArrowForward } from '../../assets/icons/essentials';

export const MenuView: React.FC = () => {
  const [draging, setDraging] = useState(false);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.dragable}
        drag
        dragMomentum={false}
        title='Drag me'
        onDragStart={() => setDraging(true)}
        onDragEnd={() => setDraging(false)}>
        <Menu items={menuItems} title='Menu' zIndex={910} />
        <div className={clsx(styles.overlay, draging && styles.disable)} />
        <div className={clsx(styles.info, draging && styles.hide)}>
          <InformationCircle className={styles.icon} />
          <span>Drag this circle</span>
          <ArrowForward className={styles.icon} />
        </div>
      </motion.div>
    </div>
  );
};
