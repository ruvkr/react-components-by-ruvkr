import { useRef, useReducer } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { MenuItem, ControlItem } from './types';
import { EllipsisHorizontal, ChevronForward, ChevronBack, Close } from '../../assets/icons/essentials';
import { Container } from './Container';
import { Items } from './Items';
import { Button } from '../Buttons';
import styles from './menu.module.scss';

export interface MenuProps {
  name?: string;
  title?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  togglerIcon?: JSX.Element;
  items?: MenuItem[];
  hideOnClick?: boolean;
}

interface State {
  activeItems: MenuItem[];
  prevItems: MenuItem[][];
  forwardItems: MenuItem[][];
  show: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  name,
  title,
  icon,
  disabled = false,
  togglerIcon = <EllipsisHorizontal />,
  items = [],
  hideOnClick = true,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    activeItems: items,
    prevItems: [],
    forwardItems: [],
    show: false,
  });

  const { activeItems, prevItems, forwardItems, show } = state;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const delayDirection = useRef<1 | -1>(1);

  const togglerShow = () => {
    if (disabled || items.length === 0) return;
    if (show) dispatch({ show: false, activeItems: items, prevItems: [], forwardItems: [] });
    else dispatch({ show: true });
  };

  const subActiveHandler = (items: MenuItem[]) => {
    dispatch({
      activeItems: items,
      prevItems: [...prevItems, activeItems],
      forwardItems: [],
    });
  };

  const prevHandler = () => {
    const active = prevItems.pop();
    dispatch({
      activeItems: active,
      prevItems,
      forwardItems: [...forwardItems, activeItems],
    });
  };

  const forwardHandler = () => {
    const active = forwardItems.pop();
    dispatch({
      activeItems: active,
      forwardItems,
      prevItems: [...prevItems, activeItems],
    });
  };

  const control_items: ControlItem[] = [
    {
      id: 'back',
      title: 'Go back',
      icon: <ChevronBack />,
      disabled: prevItems.length === 0,
      onClick: prevHandler,
    },
    {
      id: 'forward',
      title: 'Go forward',
      icon: <ChevronForward />,
      disabled: forwardItems.length === 0,
      onClick: forwardHandler,
    },
    {
      id: 'exit',
      title: 'Close',
      icon: <Close />,
      onClick: togglerShow,
    },
  ];

  return (
    <div className={styles.container}>
      <Button
        disabled={disabled}
        onClick={togglerShow}
        name={name}
        title={title}
        icon={icon}
        forwardRef={buttonRef}
        badge={
          <motion.div animate={{ rotate: show ? 90 : 0 }} className={styles.badge}>
            {togglerIcon}
          </motion.div>
        }
      />

      <AnimateSharedLayout>
        <AnimatePresence>
          {show && (
            <Container
              items={activeItems}
              buttonRef={buttonRef}
              setDelayDirection={delayDirection}
              onOutsideClick={() => show && togglerShow()}
              children={
                <Items
                  items={activeItems}
                  controlItems={control_items}
                  onSubActive={subActiveHandler}
                  getDelayDirection={delayDirection}
                  onClick={() => hideOnClick && togglerShow()}
                />
              }
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

const reducer = (state: State, payload: Partial<State>): State => ({
  ...state,
  ...payload,
});
