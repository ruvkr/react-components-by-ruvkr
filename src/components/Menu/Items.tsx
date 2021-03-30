import { useLayoutEffect, useState } from 'react';
import { motion, Transition, TargetAndTransition } from 'framer-motion';
import { MenuItem, ControlItem } from './types';
import { ChevronForward } from '../../assets/icons/essentials';
import { Controls } from './Controls';
import { BlockButton } from '../Buttons';
import styles from './items.module.scss';

interface Props {
  items: MenuItem[];
  onSubActive: (items: MenuItem[]) => void;
  controlItems: ControlItem[];
  getDelayDirection: React.MutableRefObject<1 | -1>;
  onClick: () => void;
}

export const Items: React.FC<Props> = ({ items, onSubActive, controlItems, getDelayDirection, onClick }) => {
  const [play, setPlay] = useState(false);
  const fromTop = getDelayDirection.current === 1;
  useLayoutEffect(() => setPlay(true), []);

  const clickHandler = (item: MenuItem) => () => {
    if (typeof item !== 'object') return;
    const { disabled, items, isSubMenu, onClick: itemOnClick } = item;
    if (disabled) return;
    isSubMenu && items && items.length > 0 && onSubActive(items);
    !isSubMenu && itemOnClick && itemOnClick();
    !isSubMenu && onClick();
  };

  const _items = items.map((item, index) => {
    const delay = fromTop ? index * 0.05 + 0.1 : (items.length - index) * 0.05 + 0.1;
    const transition: Transition = { type: 'tween', duration: 0.3, delay };
    const initial = { opacity: 0 };
    const animate = { opacity: play ? 1 : 0 };

    if (typeof item !== 'object') {
      return (
        <motion.div
          key={index}
          initial={initial}
          animate={animate}
          transition={transition}
          className={styles.devider}
        />
      );
    }

    return (
      <motion.div
        key={item.id}
        initial={initial}
        animate={animate}
        className={styles.item}
        transition={transition}
        children={
          <BlockButton
            icon={item.icon}
            badge={(item.isSubMenu && <ChevronForward />) || undefined}
            name={item.name}
            title={item.title}
            onClick={clickHandler(item)}
            disabled={item.disabled}
          />
        }
      />
    );
  });

  return (
    <div className={styles.container}>
      {_items}
      <Controls controls={controlItems} />
    </div>
  );
};
