import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { rgba } from 'polished';

import {
  CloseBig,
  ChevronLeft,
  ChevronRight,
} from '../../assets/icons/essential';

const initial = {
  x: 20,
};

const animate = {
  x: 0,
};

const Controls = () => {
  return (
    <ScContainer layout>
      <ScControlItem
        initial={initial}
        animate={animate}
        transition={{
          type: 'tween',
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <ChevronLeft />
      </ScControlItem>
      <ScControlItem
        initial={initial}
        animate={animate}
        transition={{
          type: 'tween',
          duration: 0.6,
          ease: 'easeInOut',
        }}
      >
        <ChevronRight />
      </ScControlItem>
      <ScControlItem
        initial={initial}
        animate={animate}
        transition={{
          type: 'tween',
          duration: 0.7,
          ease: 'easeInOut',
        }}
      >
        <CloseBig />
      </ScControlItem>
    </ScContainer>
  );
};

const ScContainer = styled(motion.div)`
  padding: 8px;
  background-color: ${rgba('#000', 0.2)};
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const ScControlItem = styled(motion.div)`
  fill: ${props => props.theme.col2};
  width: 20px;
  height: 20px;
`;

export default Controls;
