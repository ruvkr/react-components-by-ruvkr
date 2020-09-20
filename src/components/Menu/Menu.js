///<reference path="./Items.js" />
/** @typedef {import('./Items').MenuItem} MenuItem */

import React, { useRef, useReducer } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useOutsideClick } from 'hooks-by-ruvkr';
import { DotsHorizontal } from '../../assets/icons/essential';

import Container from './Container';
import Items from './Items';

import { menuItems } from './sample_items';

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
  items = menuItems,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    activeItems: items,
    show: false,
    mount: false,
  });
  /**
   * @type {{
   *   activeItems: MenuItem[];
   *   show: boolean;
   *   mount: boolean;
   * }}
   */
  const { activeItems, show, mount } = state;
  const togglerShow = () => {
    if (!disabled) {
      if (!show) dispatch({ show: true, mount: true });
      else if (show) dispatch({ show: false });
    }
  };
  const mountHandler = () => {
    if (!show) dispatch({ mount: false, activeItems: items });
  };
  const subActiveHandler = items => {
    dispatch({ activeItems: items });
  };

  const togglerRef = useRef(null);
  const listeners = useOutsideClick(show, togglerShow);

  return (
    <ScContainer {...listeners}>
      <ScToggler ref={togglerRef} $disabled={disabled} onClick={togglerShow}>
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
        >
          <Items items={activeItems} onSubActive={subActiveHandler} />
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
  background-color: transparent;
  padding: 8px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.col2};
  fill: ${props => props.theme.col2};
  opacity: ${props => (props.$disabled ? 0.2 : 1)};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};

  &:focus,
  &:active {
    outline: none;
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
