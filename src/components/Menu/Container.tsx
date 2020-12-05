import { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import { usePosition, PositionData } from '../../hooks/usePosition';

interface Props {
  show: boolean;
  togglerRef: React.MutableRefObject<HTMLElement | null>;
  onAnimationComplete: () => void;
  getDelayDirection: (direction: 1 | -1) => void;
}

export const Container: React.FC<Props> = ({
  children,
  show,
  togglerRef,
  onAnimationComplete,
  getDelayDirection,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const position = useRef<PositionData | null>(null);

  usePosition(togglerRef, containerRef, data => (position.current = data));

  useLayoutEffect(() => {
    if (position.current && containerRef.current) {
      const {
        left,
        right,
        top,
        bottom,
        transformOriginX,
        transformOriginY,
      } = position.current;

      if (left) containerRef.current.style.left = left + 'px';
      else containerRef.current.style.right = right + 'px';

      if (top) {
        containerRef.current.style.top = top + 'px';
        getDelayDirection(1);
      } else {
        containerRef.current.style.bottom = bottom + 'px';
        getDelayDirection(-1);
      }

      containerRef.current.style.transformOrigin =
        transformOriginX + ' ' + transformOriginY;
    }
  }, [getDelayDirection]);

  return createPortal(
    <ScContainer
      ref={containerRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      onAnimationComplete={onAnimationComplete}
    >
      <ScBackground layout />
      <ScItems>{children}</ScItems>
    </ScContainer>,
    document.body
  );
};

const ScContainer = styled(motion.div)`
  position: fixed;
  z-index: 900;
`;

const ScBackground = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.col5};
  border-radius: 8px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  box-shadow: 0 0 8px ${rgba('#000', 0.2)};
`;

const ScItems = styled.div``;
