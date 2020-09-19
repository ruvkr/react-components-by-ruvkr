import React, { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { usePosition } from 'hooks-by-ruvkr';

/** @param {{ togglerRef: React.MutableRefObject<HTMLElement> }} props */
export const MenuItemsContainer = ({ children, togglerRef }) => {
  const menuItemsRef = useRef(null);
  const position = useRef(null);

  usePosition(togglerRef, menuItemsRef, data => (position.current = data));

  useLayoutEffect(() => {
    if (position.current) {
      const { x, y, relativeX, relativeY } = position.current;
      menuItemsRef.current.style.left = x + 'px';
      menuItemsRef.current.style.top = y + 'px';
      menuItemsRef.current.style.transformOrigin = relativeX + ' ' + relativeY;
    }
  }, []);

  return createPortal(
    <ScContainer
      ref={menuItemsRef}
      variants={variants}
      initial='hide'
      animate='show'
      exit='hide'
    >
      {children}
    </ScContainer>,
    document.body
  );
};

const ScContainer = styled(motion.div)`
  position: fixed;
  max-width: 80%;
  max-height: 80%;
  z-index: 900;
  box-shadow: 0 0 8px ${rgba('#000', 0.2)};
  border-radius: 8px;
  overflow: auto;
`;

const variants = {
  hide: {
    opacity: 0,
    scale: 0,
    pointerEvents: 'none',
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  },
  show: {
    opacity: 1,
    scale: 1,
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

export const MenuItem = ({ children, disabled = false }) => {
  return (
    <ScItemContainer variants={itemVariants} $disabled={disabled}>
      {children}
    </ScItemContainer>
  );
};

const ScItemContainer = styled(motion.div)`
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
`;

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
