import React from 'react';
import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { darken } from 'polished';

/**
 * @param {{
 *   controls: {
 *     id: string;
 *     icon: JSX.Element;
 *     disabled: boolean;
 *     onClick: () => void;
 *   }[];
 * }}
 */
const Controls = ({ controls = [] }) => {
  const _controls = controls.map((item, index) => (
    <ScControlItem 
      key={item.id}
      onClick={() => !item.disabled && item.onClick && item.onClick()}
      disabled={item.disabled}
      $duration={index * 100 + 500}
    >
      <ScIcon>{item.icon}</ScIcon>
    </ScControlItem>
  ));

  return <ScContainer layout>{_controls}</ScContainer>;
};

const ScContainer = styled(motion.div)`
  background-color: ${props => darken(0.01, props.theme.col5)};
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
`;

const slidein = keyframes`
  0% { 
    transform: translateX(20px); }
  100% { 
    transform: none; }
`;

const ScControlItem = styled.button`
  display: flex;
  flex-grow: 1;
  justify-content: center;      
  font: inherit;
  border: none;
  padding: 12px;
  background-color: transparent;
  fill: ${p => p.theme.col2};
  cursor: pointer;
  transition: background-color 300ms ease-in-out;
  transform: translateY(20px);
  animation-duration: ${p => p.$duration}ms;
  animation-fill-mode: forwards;
  animation-name: ${slidein};
  animation-timing-function: ease-in-out;

  &:hover:not(:disabled),
  &:focus,
  &:active {
    outline: none;
    background-color: ${props => rgba(props.theme.col2, 0.2)};
    transition: background-color 300ms ease-in-out;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }
`;

const ScIcon = styled.div`
  width: 20px;
  height: 20px;
`;

export default Controls;
