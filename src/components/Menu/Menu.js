///<reference path="./Items.js" />
/** @typedef {import('./Items').MenuItem} MenuItem */

import React, { useRef, useReducer, useCallback } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { useOutsideClick } from '../../hooks';
import {
  DotsHorizontal,
  ChevronLeft,
  ChevronRight,
  CloseBig,
} from '../../assets/icons/essential';
import Container from './Container';
import Items from './Items';

/**
 * @param {{
 *   name: string;
 *   disabled: boolean;
 *   icon: JSX.Element;
 *   togglerIcon: JSX.Element;
 *   items: MenuItem[];
 * }} props
 */

export const Menu = ({
  name,
  icon,
  disabled = false,
  togglerIcon = <DotsHorizontal />,
  items = [],
}) => {
  const [state, dispatch] = useReducer(reducer, {
    activeItems: items,
    prevItems: [],
    forwardItems: [],
    show: false,
    mount: false,
    delayDirection: 1,
  });
  /**
   * @type {{
   *   activeItems: MenuItem[];
   *   prevItems: MenuItem[][];
   *   forwardItems: MenuItem[][];
   *   show: boolean;
   *   mount: boolean;
   * }}
   */
  const {
    activeItems,
    prevItems,
    forwardItems,
    show,
    mount,
    delayDirection,
  } = state;
  const togglerShow = () => {
    if (!disabled && items.length > 0) {
      if (!show && !mount) dispatch({ mount: true });
      else if (show) dispatch({ show: false });
    }
  };

  const mountHandler = () => {
    if (!show) {
      dispatch({
        mount: false,
        activeItems: items,
        delayDirection: 1,
        prevItems: [],
        forwardItems: [],
      });
    }
  };

  const subActiveHandler = items => {
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

  const getDelayDirection = useCallback(direction => {
    dispatch({
      show: true,
      delayDirection: direction,
    });
  }, []);

  const togglerRef = useRef(null);
  const listeners = useOutsideClick(show, togglerShow);

  const control_items = [
    {
      id: 'back',
      icon: <ChevronLeft />,
      disabled: prevItems.length === 0,
      onClick: prevHandler,
    },
    {
      id: 'forward',
      icon: <ChevronRight />,
      disabled: forwardItems.length === 0,
      onClick: forwardHandler,
    },
    {
      id: 'exit',
      icon: <CloseBig />,
      onClick: togglerShow,
    },
  ];

  return (
    <ScContainer {...listeners}>
      <ScToggler
        ref={togglerRef}
        disabled={disabled}
        $show={show}
        onClick={togglerShow}
      >
        {icon && <ScMenuIcon>{icon}</ScMenuIcon>}
        {name && <ScMenuName>{name}</ScMenuName>}
        <ScTogglerIcon animate={{ rotate: show ? 90 : 0 }}>
          {togglerIcon}
        </ScTogglerIcon>
      </ScToggler>
      {mount && (
        <Container
          show={show}
          togglerRef={togglerRef}
          onAnimationComplete={mountHandler}
          getDelayDirection={getDelayDirection}
        >
          <Items
            show={show}
            items={activeItems}
            controlItems={control_items}
            onSubActive={subActiveHandler}
            delayDirection={delayDirection}
          />
        </Container>
      )}
    </ScContainer>
  );
};

const reducer = (state, payload) => ({ ...state, ...payload });

const ScContainer = styled.div`
  display: inline-flex;
`;

const ScToggler = styled.button`
  font: inherit;
  border: none;
  border-radius: 8px;
  background-color: ${p => (p.$show ? rgba(p.theme.col2, 0.2) : 'transparent')};
  padding: 8px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.col2};
  fill: ${props => props.theme.col2};
  cursor: pointer;
  transition: background-color 300ms ease-in-out;

  &:hover:not(:disabled),
  &:focus {
    outline: none;
    background-color: ${props => rgba(props.theme.col2, 0.2)};
    transition: background-color 300ms ease-in-out;
  }
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const ScTogglerIcon = styled(motion.div)`
  width: 20px;
  height: 20px;
`;

const ScMenuName = styled.div`
  text-align: left;
  margin-right: 8px;
`;

const ScMenuIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export default Menu;
