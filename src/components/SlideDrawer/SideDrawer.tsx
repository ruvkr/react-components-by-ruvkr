import { useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';
import { useSlide } from '../../hooks';
import { SlideInitConfig, ConfigFunction } from '../../libs/slide';
import { Directions } from '../../libs/pan';
import { TogglerButton } from './TogglerButton';
import { Backdrop } from './Backdrop';
import { SDContent } from './content/SDContent';

const initialX = window.innerWidth < 480 ? -window.innerWidth * 0.8 : -320;

interface Props {
  appRef: React.MutableRefObject<HTMLElement | null>;
}

export const SideDrawer: React.FC<Props> = ({ appRef }) => {
  const [opened, setOpened] = useState(false);
  const x = useMotionValue<number>(initialX);
  const progress = useMotionValue<number>(0);

  const openHandler = () => setOpened(true);
  const closeHandler = () => setOpened(false);
  const updateHandler: SlideInitConfig['onUpdate'] = data => {
    x.set(data.value);
    progress.set(data.progress);
  };

  const { toggle } = useSlide({
    target: appRef,
    configFunction,
    opened,
    onUpdate: updateHandler,
    onOpen: openHandler,
    onClose: closeHandler,
  });

  return (
    <ScContainer>
      <Backdrop progress={progress} onClick={toggle} />
      <TogglerButton progress={progress} onClick={toggle} />
      <ScSideDrawer style={{ x }}>
        <SDContent opened={opened} progress={progress} />
      </ScSideDrawer>
    </ScContainer>
  );
};

const configFunction: ConfigFunction = () => {
  const width = window.innerWidth;
  const mobile = width < 480;
  return {
    open: {
      direction: Directions.Right,
      translate: 0,
      startBoundary: mobile ? [0, 0.1 * width] : [0, 64],
      finalizeTest: ({ direction }) => direction === Directions.Right,
      constraint: mobile ? [-0.8 * width, 0.2 * width] : [-320, 128],
      stiffness: 400,
      damping: 20,
    },
    close: {
      direction: Directions.Horizontal,
      translate: mobile ? -0.8 * width : -320,
      startBoundary: mobile ? [0, 1 * width] : [0, 360],
      finalizeTest: ({ direction }) => direction === Directions.Left,
      constraint: mobile ? [-0.8 * width, 0.2 * width] : [-320, 128],
      stiffness: 400,
      damping: 40,
    },
  };
};

const ScContainer = styled.div``;

const ScSideDrawer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80%;
  height: 100%;
  transform: translateX(-100%);
  background-color: ${props => props.theme.col5};
  z-index: 100;
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -99%;
    background-color: ${props => props.theme.col5};
  }

  @media (min-width: 480px) {
    width: 320px;
    transform: translateX(-320px);
  }
`;
