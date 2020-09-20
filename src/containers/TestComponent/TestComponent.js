import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MenuItems } from './MenuItems';

import OptionsContainer from './OptionsContainer';

const TestComponent = () => {
  const [index, setIndex] = useState(null);
  return (
    <ScContainer>
      {index !== null && (
        <OptionsContainer>
          <MenuItems />
        </OptionsContainer>
      )}
      <ScSwitches>
        <ScSwitch
          onClick={() => {
            if (index == null) return;
            const _index = index - 1 < 0 ? 0 : index - 1;
            setIndex(_index);
          }}
        >
          {'<'}
        </ScSwitch>
        <ScSwitch
          onClick={() => {
            if (index === null) setIndex(0);
            else setIndex(null);
          }}
        >
          {'o'}
        </ScSwitch>
        <ScSwitch
          onClick={() => {
            if (index == null) return;
            const _index =
              index + 1 > items.length - 1 ? items.length - 1 : index + 1;
            setIndex(_index);
          }}
        >
          {'>'}
        </ScSwitch>
      </ScSwitches>
    </ScContainer>
  );
};

const variants = {
  hide: {
    opacity: 0,
    scale: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const containerVariants = {
  hide: {
    // x: '100%',
    opacity: 0,
    pointerEvents: 'none',
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  show: {
    // x: 0,
    opacity: 1,
    pointerEvents: 'all',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
      delayChildren: 0,
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  hide: {
    y: -10,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      opacity: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut',
      },
      y: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  },
};

export default TestComponent;

const ScItemsContainer = styled(motion.div)`
  position: fixed;
  top: 100px;
  /* left: 100px; */
  /* transition: height 300ms ease-in-out; */
  transform-origin: left top;
`;

const ScContainerBg = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.col5};
  z-index: -1;
`;

const ScContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScItem = styled(motion.div)`
  color: ${props => props.theme.col1};
  padding: 12px;
`;

const ScItems = styled(motion.div)`
  padding: 8px;
  /* outline: 1px solid green; */
  transform-origin: left top;
`;

const ScSwitches = styled.div`
  position: fixed;
  bottom: 50px;
  display: flex;
  flex-direction: row;
`;

const ScSwitch = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => props.theme.col5};
  color: ${props => props.theme.col1};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

const items = [10, 5, 4, 6, 5].map((item, i) => {
  const sub_items = Array.apply(null, Array(item)).map((_, _i) => (
    <ScItem variants={itemVariants} key={_i}>
      {i + 1 + ' Option ' + (_i + 1)}
    </ScItem>
  ));
  return (
    <ScItems key={i} variants={containerVariants}>
      {sub_items}
    </ScItems>
  );
});
