import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  Variants,
  Transition,
} from 'framer-motion';
import { TabItem } from './types';
export * from './types';

interface Props {
  show?: boolean;
  tabItems: TabItem[];
  className?: string;
  blockBackground?: boolean;
  resetOnHide?: boolean;
  resetOnButtonClick?: boolean;
}

export const Tabs: React.FC<Props> = ({
  show = true,
  tabItems,
  className,
  blockBackground = false,
  resetOnHide = false,
  resetOnButtonClick = false,
}) => {
  const [active, setActive] = useState<number>(-1);
  const prevActive = useRef(active);

  const clickHandler = (item: TabItem, index: number) => () => {
    prevActive.current = active;
    if (item.isButton) {
      resetOnButtonClick && index > -1 && setActive(-1);
      (!resetOnButtonClick || active === -1) && item.onClick && item.onClick();
    } else {
      if (index === active) index > -1 && setActive(-1);
      else setActive(index);
    }
  };

  const tabs = tabItems.map((item, index) => {
    const Icon = item.icon;
    return (
      <Icon
        key={item.id}
        onClick={clickHandler(item, index)}
        active={index === active}
      />
    );
  });

  useEffect(() => {
    if (!resetOnHide) return;
    if (!show) setActive(-1);
  }, [show, resetOnHide]);

  return (
    <>
      {blockBackground && (
        <AnimatePresence>
          {active > -1 && (
            <ScBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(-1)}
              transition={tweenfast}
            />
          )}
        </AnimatePresence>
      )}

      <ScContainer
        variants={containerVariants}
        className={className}
        initial={show ? 'show' : 'hide'}
        animate={show ? 'show' : 'hide'}
      >
        <AnimateSharedLayout>
          <ScBackground
            layoutId='tab-bg'
            layout='position'
            transition={tweenfast}
          />
          <AnimatePresence exitBeforeEnter>
            {active > -1 && (
              <ScContent
                key={active}
                variants={contentVariants}
                custom={prevActive.current}
                initial='hide'
                animate='show'
                exit='hide'
                children={tabItems[active].content}
              />
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
        <ScTabs className='tab-buttons'>{tabs}</ScTabs>
      </ScContainer>
    </>
  );
};

const tweenslow: Transition = { type: 'tween', duration: 0.5 };
const tweenfast: Transition = { type: 'tween', duration: 0.3 };

const containerVariants: Variants = {
  hide: { y: '100%', opacity: 0, transition: tweenfast },
  show: { y: '0%', opacity: 1, transition: tweenfast },
};

const contentVariants: Variants = {
  hide: { opacity: 0, transition: tweenslow },
  show: (prev: number) => ({
    opacity: 1,
    transition: { ...tweenslow, delay: prev > -1 ? 0 : 0.3 },
  }),
};

const ScContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
`;

const ScTabs = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  grid-gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  z-index: 1;
  position: relative;
`;

const ScContent = styled(motion.div)`
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ScBackground = styled(motion.div)`
  position: absolute;
  background-color: ${p => p.theme.col5};
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

const ScBackdrop = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 19;
`;
