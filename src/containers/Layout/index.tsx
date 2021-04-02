import { useRef } from 'react';
import styles from './styles.module.scss';
import { MenuView } from '../MenuView';
import { SDView } from '../SDView';
import { motion } from 'framer-motion';

export const Layout: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div ref={targetRef} className={styles.container}>
      <SDView targetRef={targetRef} />
      <MenuView />
    </motion.div>
  );
};
