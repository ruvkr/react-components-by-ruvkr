import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';

const OptionsContainer = ({ children }) => {
  return createPortal(
    <ScContainer variants={variants} initial='hide' animate='show' exit='hide'>
      <ScBackground layout />
      {children}
    </ScContainer>,
    document.body
  );
};

const variants = {
  hide: {
    opacity: 0,
    // scale: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  show: {
    opacity: 1,
    // scale: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const ScContainer = styled(motion.div)`
  position: fixed;
  z-index: 900;
`;

const ScBackground = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.col5};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  box-shadow: 0 0 8px ${rgba('#000', 0.2)};
  border-radius: 8px;
`;

export default OptionsContainer;
