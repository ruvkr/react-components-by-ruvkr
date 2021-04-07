import { useRef, useEffect, useState, useCallback } from 'react';
import { MotionValue, useMotionValue } from 'framer-motion';
import { DimensionInfo, getDimensions } from '../../libs/utils';
import { Pan, PanDirections, PanInterface, PanStartInfo } from '../../libs/pan';
import { Spring, SpringInterface } from '../../libs/spring';
import { useWindowResize } from '../../hooks';

export type Position = 'left' | 'right' | 'bottom' | 'top';
export type Plane = 'vertical' | 'horizontal';

export function useSideDrawer(configs: {
  position: Position;
  sdRef: React.MutableRefObject<HTMLElement | null>;
  containerRef: React.MutableRefObject<HTMLElement | null>;
  targetRef?: React.MutableRefObject<HTMLElement | null>;
  stiffness: number | { open: number; close: number };
  damping: number | { open: number; close: number };
}): {
  opened: boolean;
  motionValue: MotionValue<number>;
  progress: MotionValue<number>;
  toggle: () => void;
} {
  const { position, sdRef, containerRef, targetRef, stiffness, damping } = configs;
  const [opened, setOpened] = useState(false);
  const [force, setForce] = useState({});
  const multiplier = position === 'left' || position === 'top' ? -1 : 1;
  const plane: Plane = position === 'top' || position === 'bottom' ? 'vertical' : 'horizontal';
  const dimensions = useRef<DimensionInfo>();
  const panRef = useRef<PanInterface>();
  const springRef = useRef<SpringInterface>();
  const openedRef = useRef(opened);
  const openedCurrent = useRef(opened);
  const motionValue = useMotionValue<number>(opened ? 0 : 10000 * multiplier);
  const progress = useMotionValue<number>(opened ? 1 : 0);
  const toggleRef = useRef<() => void>();
  const stiffnessRef = useRef(stiffness);
  const dampingRef = useRef(damping);

  // initialize pan and spring
  useEffect(() => {
    panRef.current = Pan().add();
    springRef.current = Spring();

    return () => {
      if (springRef.current) springRef.current.stop();
      if (panRef.current) panRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (stiffness) stiffnessRef.current = stiffness;
    if (damping) dampingRef.current = damping;
  }, [stiffness, damping]);

  // sliding
  useEffect(() => {
    dimensions.current = getDimensions(sdRef);
    if (!panRef.current || !springRef.current || !dimensions.current) return;

    const vars = getVariables(plane);
    const clamp = getClamp(multiplier);
    const oppositePosition = getOpposite(position);
    const spring = springRef.current;
    const pan = panRef.current;
    const maxValue = dimensions.current[vars.size] * multiplier;
    const extendedValue = maxValue * 0.2 * -1; // extend 20%

    let opened = openedCurrent.current;
    let currentValue = motionValue.get();
    let clamped = false;

    if (!spring.isAnimating()) {
      currentValue = opened ? 0 : maxValue;
      motionValue.set(currentValue);
      progress.set(opened ? 1 : 0);
    }

    pan.update({
      panDirection: getPanDirection(plane, oppositePosition, opened),
      target: opened ? containerRef.current || document : (targetRef && targetRef.current) || document,

      // check if pan should start
      onPanStart: info => {
        if (opened) return true;
        if (!opened && inStartRange(position, info)) return true;
        return false;
      },

      onPanMove: info => {
        spring.stop();
        const newValue = currentValue + info.delta[vars.delta];
        currentValue = clamp(maxValue, extendedValue, newValue);
        clamped = newValue !== currentValue;
        motionValue.set(currentValue);
        progress.set(1 - currentValue / maxValue);
      },

      onPanEnd: info => {
        currentValue = motionValue.get();
        const velocity = clamped ? 0 : info.velocity[vars.velocity];
        const changed =
          (opened && info.direction === PanDirections[position]) ||
          (!opened && info.direction === PanDirections[oppositePosition]);
        snap(changed, velocity);
        clamped = false;
      },
    });

    spring.update({
      from: currentValue,
      to: opened ? 0 : maxValue,
      stiffness: getValue(opened, stiffnessRef.current),
      damping: getValue(opened, dampingRef.current),

      onUpdate: value => {
        currentValue = value;
        motionValue.set(currentValue);
        progress.set(1 - currentValue / maxValue);
      },

      onComplete: () => {
        if (opened === openedRef.current) return;
        openedRef.current = opened;
        setOpened(opened);
      },
    });

    const snap = (changed: boolean = false, initialVelocity?: number) => {
      if (changed) {
        opened = !opened;
        openedCurrent.current = opened;
        pan.update({
          panDirection: getPanDirection(plane, oppositePosition, opened),
          target: opened ? containerRef.current || document : (targetRef && targetRef.current) || document,
        });
      }

      spring.update({
        from: currentValue,
        to: opened ? 0 : maxValue,
        initialVelocity,
        stiffness: getValue(opened, stiffnessRef.current),
        damping: getValue(opened, dampingRef.current),
      });

      // start spring
      spring.start();
    };

    toggleRef.current = () => snap(true);
  }, [
    motionValue,
    progress,
    multiplier,
    plane,
    position,
    containerRef,
    targetRef,
    sdRef,
    force, //
  ]);

  const toggle = useCallback(() => {
    if (toggleRef.current) toggleRef.current();
  }, []);

  // update dimensions when resize
  useWindowResize(() => setForce({}), 100);

  return {
    opened,
    motionValue,
    progress,
    toggle,
  };
}

function getClamp(multiplier: 1 | -1) {
  if (multiplier === 1) return (max: number, min: number, value: number) => Math.min(Math.max(value, min), max);
  else return (min: number, max: number, value: number) => Math.min(Math.max(value, min), max);
}

function getOpposite(position: Position): Position {
  // prettier-ignore
  switch (position) {
    case 'left':   return 'right';
    case 'right':  return 'left';
    case 'top':    return 'bottom';
    case 'bottom': return 'top';
    default:       return 'left';
  }
}

function getPanDirection(plane: Plane, oppositePosition: Position, opened: boolean): PanDirections {
  if (opened) return PanDirections[plane];
  else return PanDirections[oppositePosition];
}

function inStartRange(position: Position, info: PanStartInfo): boolean {
  const range = Math.min(window.innerWidth * 0.1, 64);
  // prettier-ignore
  switch (position) {
    case 'left':   return info.start.sx < range;
    case 'right':  return info.start.sx > window.innerWidth - range;
    case 'top':    return info.start.sy < range;
    case 'bottom': return info.start.sy > window.innerHeight - range;
    default:       return false;
  }
}

function getVariables(plane: Plane): { delta: 'dx' | 'dy'; velocity: 'vx' | 'vy'; size: 'width' | 'height' } {
  if (plane === 'vertical') return { delta: 'dy', velocity: 'vy', size: 'height' };
  else return { delta: 'dx', velocity: 'vx', size: 'width' };
}

function getValue(opened: boolean, info: number | { open: number; close: number }): number {
  return typeof info === 'number' ? info : opened ? info.open : info.close;
}
