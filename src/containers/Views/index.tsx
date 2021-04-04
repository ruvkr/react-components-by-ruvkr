import { useRef, memo } from 'react';
import styles from './styles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { match } from 'path-to-regexp';
import { useLocation } from '../../hooks';
import { views } from './views';
import { ViewItem } from './types';

export const Views: React.FC = () => {
  const { pathname } = useLocation();
  const matched = views.find(view => match(view.path, { decode: decodeURIComponent })(pathname));
  const validMatched = useRef<ViewItem>(matched ?? views[0]);
  matched && (validMatched.current = matched);

  return (
    <div className={styles.container}>
      <AnimatePresence exitBeforeEnter>
        <Content item={validMatched.current} />
      </AnimatePresence>
    </div>
  );
};

const Content: React.FC<{ item: ViewItem }> = memo(
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
