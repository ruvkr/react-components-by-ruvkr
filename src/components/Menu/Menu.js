import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from 'hooks-by-ruvkr';
import { rgba } from 'polished';

import { DotsHorizontal } from '../../assets/icons/essential';
import { MenuItemsContainer } from './MenuItem';

/**
 * @param {{
 *   name: string;
 *   disabled: boolean;
 *   icon: JSX.Element;
 *   togglerIcon: JSX.Element;
 *   isSubMenu: boolean;;
 * }} props
 */

export const Menu = ({
  name,
  disabled = false,
  icon,
  togglerIcon = <DotsHorizontal />,
  isSubMenu = false,
  children,
}) => {
  const togglerRef = useRef(null);
  const [show, setShow] = useState(false);

  const toggleHandler = useCallback(s => {
    if (typeof s === 'boolean') setShow(s);
    else setShow(p => !p);
  }, []);

  const listeners = useOutsideClick(show, () => toggleHandler(false));

  return (
    <ScContainer {...listeners} $isSubMenu={isSubMenu}>
      <ScToggler
        onClick={() => !disabled && toggleHandler()}
        ref={togglerRef}
        $isSubMenu={isSubMenu}
        $disabled={disabled}
      >
        {(isSubMenu || icon) && <ScMenuIcon>{icon}</ScMenuIcon>}
        {name && <ScMenuText $isSubMenu={isSubMenu}>{name}</ScMenuText>}
        <ScTogglerIcon
          $isSubMenu={isSubMenu}
          initial={{ rotate: 0 }}
          animate={{ rotate: show ? 90 : 0 }}
        >
          {togglerIcon}
        </ScTogglerIcon>
      </ScToggler>
      <AnimatePresence>
        {show && (
          <MenuItemsContainer togglerRef={togglerRef}>
            {children}
          </MenuItemsContainer>
        )}
      </AnimatePresence>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  display: inline-block;
  width: ${props => (props.$isSubMenu ? '100%' : 'auto')};
`;

const ScToggler = styled.button`
  font: inherit;
  color: inherit;
  fill: inherit;
  border: none;
  background-color: transparent;
  padding: 8px;
  display: flex;
  align-items: center;
  width: ${props => (props.$isSubMenu ? '100%' : 'auto')};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  color: ${props => rgba(props.theme.col2, props.$disabled ? 0.2 : 1)};
  fill: ${props => rgba(props.theme.col2, props.$disabled ? 0.2 : 1)};

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScTogglerIcon = styled(motion.div)`
  width: ${props => (props.$isSubMenu ? 16 : 20)}px;
  height: ${props => (props.$isSubMenu ? 16 : 20)}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const ScMenuText = styled.div`
  text-align: left;
  padding: 0 8px;
  flex-grow: ${props => (props.$isSubMenu ? 1 : 0)};
`;

const ScMenuIcon = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export default Menu;

export { MenuItem } from './MenuItem';
