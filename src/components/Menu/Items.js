import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronRight } from '../../assets/icons/essential';
import Controls from './Controls';

/**
 * @typedef {{
 *   id: string;
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
 *   controlItems: {
 *     id: string;
 *     icon: JSX.Element;
 *     disabled: boolean;
 *     onClick: () => void;
 *   }[];
 *   delayDirection: 1 | -1;
 * }}
 */
const Items = ({ show, items, onSubActive, controlItems, delayDirection }) => {
  /** @param {MenuItem} item */
  const clickHandler = item => {
    if (!item.disabled) {
      if (item.isSubMenu && onSubActive) onSubActive(item.items);
      else if (item.onClick) item.onClick();
    }
  };

  const _items = items.map((item, index) => (
    <ScItem
      key={item.id || index}
      onClick={() => clickHandler(item)}
      $disabled={item.disabled}
      $delay={
        delayDirection // if exist
          ? delayDirection === 1
            ? index * 50 + 100 // from top
            : (items.length - index) * 50 + 100 // from bottom
          : 100
      }
      $play={show}
      $fromBottom={delayDirection === -1}
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
      <Controls controls={controlItems} />
    </ScContainer>
  );
};

const ScContainer = styled.div`
  /* max-height: 80vh; */
  /* max-width: 80vw; */
  /* overflow: auto; */
`;

const slidetop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px); }
  100% {
    opacity: 1;
    transform: none; }
`;

const slidebottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px); }
  100% {
    opacity: 1;
    transform: none; }
`;

const ScItem = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  color: ${p => p.theme.col1};
  fill: ${p => p.theme.col2};
  cursor: ${p => (p.$disabled ? 'not-allowed' : 'pointer')};
  opacity: 0;
  transform: translateY(-10px);
  animation: ${p => (p.$fromBottom ? slidebottom : slidetop)} 300ms ease-in-out
    ${p => p.$delay}ms forwards;
  animation-play-state: ${p => (p.$play ? 'running' : 'paused')};
`;

const ScIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  opacity: ${p => (p.$disabled ? 0.2 : 1)};
  flex-shrink: 0;
`;

const ScName = styled.div`
  flex-grow: 1;
  opacity: ${p => (p.$disabled ? 0.2 : 1)};
`;

const ScMore = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 12px;
  opacity: ${p => (p.$disabled ? 0.2 : 1)};
  flex-shrink: 0;
`;

export default Items;
