import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { MotionValue } from 'framer-motion';
import { useSideDrawer } from './useSideDrawer';
import { Container } from './Container';
export type { Position } from './useSideDrawer';

export interface TogglerProps {
  opened: boolean;
  progress: MotionValue<number>;
  onClick: () => void;
}

export interface ChildrenProps {
  opened: boolean;
  progress: MotionValue<number>;
}

export type SideDrawerProps = {
  className?: string;
  zIndex?: number;
  position: 'left' | 'right' | 'bottom' | 'top';
  targetRef?: React.MutableRefObject<HTMLElement | null>;
  stiffness?: number | { open: number; close: number };
  damping?: number | { open: number; close: number };
  toggler?: (props: TogglerProps) => React.ReactElement | null;
  children?: (props: ChildrenProps) => React.ReactElement | null;
};

export const SideDrawer: React.FC<SideDrawerProps> = ({
  targetRef,
  zIndex = 100,
  toggler,
  children,
  className,
  position = 'left',
  stiffness = 400,
  damping = { open: 20, close: 33 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sdRef = useRef<HTMLDivElement>(null);
  const { opened, motionValue, progress, toggle } = useSideDrawer({
    position,
    containerRef,
    sdRef,
    targetRef,
    stiffness,
    damping,
  });

  return createPortal(
    <>
      <Container
        forwardContainerRef={containerRef}
        forwardSdRef={sdRef}
        toggle={toggle}
        position={position}
        zIndex={zIndex}
        className={className}
        motionValue={motionValue}
        progress={progress}
        children={children && children({ opened, progress })}
      />

      {toggler && toggler({ opened, progress, onClick: toggle })}
    </>,
    document.body
  );
};
