import React, { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { usePosition } from 'hooks-by-ruvkr';

const Container = ({ children, show, togglerRef, onAnimationComplete }) => {
  const containerRef = useRef(null);
  const position = useRef(null);

  usePosition(togglerRef, containerRef, data => (position.current = data));

  useLayoutEffect(() => {
    if (position.current) {
      const { x, y, relativeX, relativeY } = position.current;
      containerRef.current.style.left = x + 'px';
      containerRef.current.style.top = y + 'px';
      containerRef.current.style.transformOrigin = relativeX + ' ' + relativeY;
    }
  }, []);

  return createPortal(
    <ScContainer
      ref={containerRef}
      variants={variants}
      initial='hide'
      animate={show ? 'show' : 'hide'}
      onAnimationComplete={onAnimationComplete}
    >
      <ScBackground layout />
      <ScItems>{children}</ScItems>
    </ScContainer>,
    document.body
  );
};

const variants = {
  hide: {
    opacity: 0.5,
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

const ScContainer = styled(motion.div)`
  position: fixed;
  z-index: 900;
`;

const ScBackground = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.col5};
  border-radius: 8px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  box-shadow: 0 0 8px ${rgba('#000', 0.2)};
`;

const ScItems = styled.div``;

export default Container;
