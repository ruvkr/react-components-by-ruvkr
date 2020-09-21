import React from 'react';
import styled, { keyframes } from 'styled-components';
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
      $disabled={item.disabled}
      $duration={index * 100 + 500}
    >
      {item.icon}
    </ScControlItem>
  ));

  return <ScContainer layout>{_controls}</ScContainer>;
};

const ScContainer = styled(motion.div)`
  padding: 12px 20px;
  background-color: ${props => darken(0.01, props.theme.col5)};
  border-radius: 0 0 8px 8px;
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

const ScControlItem = styled.div`
  fill: ${props => props.theme.col2};
  width: 20px;
  height: 20px;
  transform: translateX(20px);
  opacity: ${props => (props.$disabled ? 0.2 : 1)};
  transition: opacity 300ms ease-in-out;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  animation: ${slidein} ${p => p.$duration}ms ease-in-out forwards;
`;

export default Controls;
