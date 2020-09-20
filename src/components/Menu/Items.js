import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronRight } from '../../assets/icons/essential';
import Controls from './Controls';

/**
 * @typedef {{
 *   disabled: boolean;
 *   icon: JSX.Element;
 *   isSubMenu: boolean;
 *   items: MenuItem[];
 *   name: string;
 *   onClick: () => void;
 * }} MenuItem
 */

/**
 * @param {{
 *   items: MenuItem[];
 *   onSubActive: (items: MenuItem[]) => void;
 * }}
 */
const Items = ({ items, onSubActive }) => {
  /** @param {MenuItem} item */
  const clickHandler = item => {
    if (!item.disabled) {
      if (item.isSubMenu && onSubActive) onSubActive(item.items);
      else if (item.onClick) item.onClick();
    }
  };

  const _items = items.map((item, index) => (
    <ScItem
      key={item.name + index}
      onClick={() => clickHandler(item)}
      $disabled={item.disabled}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'tween',
        duration: ((items.length - index) * 1) / items.length,
        ease: 'easeInOut',
        // delay: 0.05 * index,
      }}
    >
      <ScIcon $disabled={item.disabled}>{item.icon}</ScIcon>
      <ScName $disabled={item.disabled}>{item.name}</ScName>
      {item.isSubMenu && (
        <ScMore $disabled={item.disabled}>
          <ChevronRight />
        </ScMore>
      )}
    </ScItem>
  ));

  return (
    <ScContainer>
      {_items}
      <Controls />
    </ScContainer>
  );
};

const ScContainer = styled(motion.div)``;

const ScItem = styled(motion.div)`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.col1};
  fill: ${props => props.theme.col2};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
`;

const ScIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  opacity: ${props => (props.$disabled ? 0.2 : 1)};
  flex-shrink: 0;
`;

const ScName = styled.div`
  flex-grow: 1;
  opacity: ${props => (props.$disabled ? 0.2 : 1)};
`;

const ScMore = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 12px;
  opacity: ${props => (props.$disabled ? 0.2 : 1)};
  flex-shrink: 0;
`;

export default Items;
