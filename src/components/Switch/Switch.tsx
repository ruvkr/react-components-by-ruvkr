import { useState } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

interface Props {
  on?: boolean;
  size?: number;
  disabled?: boolean;
  focusable?: boolean;
}

export const Switch: React.FC<Props> = ({ on = false, size = 24, disabled = false, focusable = true }) => {
  const [toggled, setToggled] = useState(on);

  const toggler = () => setToggled(p => !p);

  return (
    <ScSwitch $size={size} disabled={disabled} onClick={toggler} tabIndex={focusable ? 0 : -1}>
      <ScFocus tabIndex={-1} variants={bgVariants} initial={toggled ? 'on' : 'off'} animate={toggled ? 'on' : 'off'}>
        <svg viewBox='0 0 44 24' width='100%' height='100%'>
          <ScPath variants={pathVariants} />
        </svg>
      </ScFocus>
    </ScSwitch>
  );
};

const offFrames = [
  'M42 12C42 17.5228 37.5228 22 32 22C26.4772 22 22 17.5228 22 12C22 6.47715 26.4772 2 32 2C37.5228 2 42 6.47715 42 12Z',
  'M42 12C42 17.5228 37.5228 22 32 22C26.4772 22 2 19 2 12C2 5 26.4772 2 32 2C37.5228 2 42 6.47715 42 12Z',
  'M16 12C16 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 16 6.47715 16 12Z',
  'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
];

const onFrames = [
  'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  'M42 12C42 19 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 42 5 42 12Z',
  'M42 12C42 17.5228 37.5229 22 32 22C26.4772 22 28 17.5228 28 12C28 6.47715 26.4772 2 32 2C37.5229 2 42 6.47715 42 12Z',
  'M42 12C42 17.5228 37.5228 22 32 22C26.4772 22 22 17.5228 22 12C22 6.47715 26.4772 2 32 2C37.5228 2 42 6.47715 42 12Z',
];

const pathVariants: Variants = {
  off: ({ col1 }) => ({
    fill: col1,
    d: offFrames,
    transition: { d: { duration: 0.5, times: [0, 0.25, 0.6, 1] } },
  }),
  on: ({ col2 }) => ({
    fill: col2,
    d: onFrames,
    transition: { d: { duration: 0.5, times: [0, 0.25, 0.6, 1] } },
  }),
};

const bgVariants: Variants = {
  off: ({ col1 }) => ({ backgroundColor: col1 }),
  on: ({ col2 }) => ({ backgroundColor: col2 }),
};

const ScSwitch = styled.button<{ $size: number }>`
  width: ${p => p.$size * (44 / 24)}px;
  height: ${p => p.$size}px;
  display: flex;
  font: inherit;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
    & > div {
      box-shadow: 0 0 0 2px ${p => p.theme.col2};
      transition: box-shadow 300ms ease-in-out;
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
        box-shadow: 0 0 0 2px ${p => p.theme.col2};
        transition: box-shadow 300ms ease-in-out;
      }
    }
  }
`;

const ScFocus = styled(motion.div).attrs(p => ({
  custom: {
    col1: p.theme.col3,
    col2: p.theme.col2,
  },
}))`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  transition: box-shadow 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScPath = styled(motion.path).attrs(p => ({
  custom: {
    col1: p.theme.col1,
    col2: p.theme.col1,
  },
}))``;
