import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TogglerButton } from './TogglerButton';
import { Backdrop } from './Backdrop';
import { SDContent } from './content/SDContent';
import { useSideDrawer } from './useSideDrawer';

interface Props {
  containerRef: React.MutableRefObject<HTMLElement | null>;
}

export const SideDrawer: React.FC<Props> = ({ containerRef }) => {
  const { opened, motionX, progress, toggle } = useSideDrawer(containerRef);

  return (
    <ScContainer>
      <Backdrop progress={progress} onClick={toggle} />
      <TogglerButton progress={progress} onClick={toggle} />
      <ScSideDrawer style={{ x: motionX }}>
        <SDContent opened={opened} progress={progress} />
      </ScSideDrawer>
    </ScContainer>
  );
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
  background-color: ${p => p.theme.col5};
  z-index: 100;
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -99%;
    background-color: ${p => p.theme.col5};
  }

  @media (min-width: 480px) {
    width: 320px;
    transform: translateX(-320px);
  }
`;
