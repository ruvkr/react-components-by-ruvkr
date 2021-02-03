import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { darken } from 'polished';
import { ControlItem } from './types';

interface Props {
  controls: ControlItem[];
  className?: string;
}

export const Controls: React.FC<Props> = ({ controls, className }) => {
  const _controls = controls.map((item, index) => (
    <ScControlItem
      key={item.id}
      onClick={() => !item.disabled && item.onClick && item.onClick()}
      disabled={item.disabled}
      $duration={index * 100 + 500}
    >
      <ScIcon tabIndex={-1} layout>
        {item.icon}
      </ScIcon>
    </ScControlItem>
  ));

  return (
    <ScContainer className={className}>
      <ScBg layout />
      {_controls}
    </ScContainer>
  );
};

const ScContainer = styled.div`
  display: flex;
  position: relative;
`;

const ScBg = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${p => darken(0.01, p.theme.col5)};
  z-index: -1;
`;

const slidein = keyframes`
  0% { 
    transform: translateX(20px); }
  100% { 
    transform: none; }
`;

const ScControlItem = styled.button<{ $duration: number }>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  font: inherit;
  border: none;
  padding: 4px;
  background-color: transparent;
  cursor: pointer;
  transform: translateY(20px);
  animation-duration: ${p => p.$duration}ms;
  animation-fill-mode: forwards;
  animation-name: ${slidein};
  animation-timing-function: ease-in-out;
  transition: opacity 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
    & > div {
      background-color: ${p => rgba(p.theme.col2, 0.2)};
      transition: background-color 300ms ease-in-out;
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
    transition: opacity 300ms ease-in-out;
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      & > div {
        background-color: ${p => rgba(p.theme.col2, 0.2)};
        transition: background-color 300ms ease-in-out;
      }
    }
  }
`;

const ScIcon = styled(motion.div)`
  width: 36px;
  height: 36px;
  padding: 8px;
  color: ${p => p.theme.col2};
  fill: ${p => p.theme.col2};
  stroke: ${p => p.theme.col2};
  background-color: transparent;
  transition: background-color 300ms ease-in-out;
  border-radius: 50%;

  &:focus,
  &:active {
    outline: none;
  }
`;
