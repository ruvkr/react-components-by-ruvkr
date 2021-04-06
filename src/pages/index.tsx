import { useRef, memo } from 'react';
import styles from './styles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { match } from 'path-to-regexp';
import { useLocation } from '../hooks';
import { pages } from './pages';
import { PageItem } from './types';

export const Pages: React.FC = () => {
  const { pathname } = useLocation();
  const matched = pages.find(view => match(view.path, { decode: decodeURIComponent })(pathname));
  const validMatched = useRef<PageItem>(matched ?? pages[0]);
  matched && (validMatched.current = matched);

  return (
    <div className={styles.container}>
      <AnimatePresence exitBeforeEnter>
        <Content item={validMatched.current} />
      </AnimatePresence>
    </div>
  );
};

const Content: React.FC<{ item: PageItem }> = memo(
  ({ item }) => {
    return (
      <motion.div
        className={styles.body}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'tween', duration: 0.15 }}
        key={item.id}>
        <item.component />
      </motion.div>
    );
  },

  // match ids
  (prev, next) => prev.item.id === next.item.id
);
