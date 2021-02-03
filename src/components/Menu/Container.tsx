import { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { usePosition, PositionData } from '../../hooks/usePosition';

interface Props {
  togglerRef: React.MutableRefObject<HTMLElement | null>;
  setDelayDirection: React.MutableRefObject<1 | -1>;
  className?: string;
  onOutsideClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export const Container: React.FC<Props> = ({
  children,
  togglerRef,
  setDelayDirection,
  onOutsideClick,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const position = useRef<PositionData | null>(null);

  usePosition(togglerRef, containerRef, data => (position.current = data));

  useLayoutEffect(() => {
    if (!position.current || !containerRef.current) return;
    const {
      left,
      right,
      top,
      bottom,
      transformOriginX,
      transformOriginY,
    } = position.current;
    const container = containerRef.current;

    // set transform origin
    container.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;

    // set left or right
    if (left != null) container.style.left = left + 'px';
    else container.style.right = right + 'px';

    // set top or bottom
    if (top != null) {
      container.style.top = top + 'px';
      setDelayDirection.current = 1;
    } else {
      container.style.bottom = bottom + 'px';
      setDelayDirection.current = -1;
    }
  }, [setDelayDirection]);

  return createPortal(
    <>
      <ScBackdrop key='menu-backdrop' onClick={onOutsideClick} />
      <ScContainer
        key='menu-container'
        ref={containerRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        className={className}
      >
        <ScBackground layout />
        <ScItems>{children}</ScItems>
      </ScContainer>
    </>,
    document.body
  );
};

const ScContainer = styled(motion.div)`
  position: fixed;
  z-index: 900;
`;

const ScBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: none;
  z-index: 899;
  overflow: hidden;
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
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const ScItems = styled.div``;
