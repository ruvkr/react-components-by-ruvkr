import { useLayoutEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { rgba } from 'polished';
import { MenuItem, ControlItem } from './types';
import { ChevronForward } from '../../assets/icons/essentials';
import { Controls } from './Controls';

interface Props {
  items: MenuItem[];
  onSubActive: (items: MenuItem[]) => void;
  controlItems: ControlItem[];
  getDelayDirection: React.MutableRefObject<1 | -1>;
  onClick: () => void;
}

export const Items: React.FC<Props> = ({
  items,
  onSubActive,
  controlItems,
  getDelayDirection,
  onClick,
}) => {
  const [play, setPlay] = useState(false);
  const fromTop = getDelayDirection.current === 1;
  useLayoutEffect(() => setPlay(true), []);

  const clickHandler = ({
    disabled,
    items,
    isSubMenu,
    onClick: itemOnClick,
  }: MenuItem) => {
    if (disabled) return;
    isSubMenu && items && items.length > 0 && onSubActive(items);
    !isSubMenu && itemOnClick && itemOnClick();
    !isSubMenu && onClick();
  };

  const _items = items.map((item, index) => (
    <ScItem
      key={item.id}
      onClick={() => clickHandler(item)}
      disabled={item.disabled}
      $delay={fromTop ? index * 50 + 100 : (items.length - index) * 50 + 100}
      $fromTop={fromTop}
      $play={play}
    >
      <ScFocus tabIndex={-1}>
        <ScIcon $disabled={item.disabled}>{item.icon}</ScIcon>
        <ScName $disabled={item.disabled}>{item.name}</ScName>
        {item.isSubMenu && (
          <ScMore $disabled={item.disabled}>
            <ChevronForward />
          </ScMore>
        )}
      </ScFocus>
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

const ScItem = styled.button<{
  $delay: number;
  $play: boolean;
  $fromTop: boolean;
}>(
  ({ $delay, $play, $fromTop, theme }) => css`
    width: 100%;
    font: inherit;
    border: none;
    background-color: transparent;
    padding: 0;
    display: flex;
    text-align: left;
    color: ${theme.col1};
    cursor: pointer;
    opacity: 0;
    transform: translateY(-10px);
    animation-delay: ${$delay}ms;
    animation-direction: normal;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-name: ${$fromTop ? slidetop : slidebottom};
    animation-play-state: ${$play ? 'running' : 'paused'};
    animation-timing-function: ease-in-out;

    &:focus,
    &:active {
      outline: none;
      & > div {
        background-color: ${rgba(theme.col2, 0.2)};
        transition: background-color 300ms ease-in-out;
      }
    }
    &:disabled {
      cursor: not-allowed;
    }
    &:first-of-type {
      & > div {
        border-radius: 8px 8px 0 0;
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        & > div {
          background-color: ${rgba(theme.col2, 0.2)};
          transition: background-color 300ms ease-in-out;
        }
      }
    }
  `
);

const ScFocus = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: transparent;
  transition: background-color 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScIcon = styled.div<{ $disabled?: boolean }>(
  ({ $disabled, theme }) => css`
    width: 20px;
    height: 20px;
    margin-right: 12px;
    color: ${theme.col2};
    fill: ${theme.col2};
    stroke: ${theme.col2};
    opacity: ${$disabled ? 0.2 : 1};
    flex-shrink: 0;
  `
);

const ScName = styled.div<{ $disabled?: boolean }>`
  flex-grow: 1;
  opacity: ${p => (p.$disabled ? 0.2 : 1)};
`;

const ScMore = styled.div<{ $disabled?: boolean }>(
  ({ $disabled, theme }) => css`
    width: 20px;
    height: 20px;
    margin-left: 12px;
    color: ${theme.col2};
    fill: ${theme.col2};
    stroke: ${theme.col2};
    opacity: ${$disabled ? 0.2 : 1};
    flex-shrink: 0;
  `
);
