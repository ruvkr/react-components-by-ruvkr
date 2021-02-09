import { useRef, useEffect, useReducer } from 'react';
import { MotionValue, useMotionValue } from 'framer-motion';
import { Pan, PanDirections, PanInterface } from '../../libs/pan';
import { Spring, SpringInterface } from '../../libs/spring';
import { useWindowResize } from '../../hooks';

interface State {
  opened: boolean;
  width: number;
  mobile: boolean;
}

export function useSideDrawer(
  parentRef: React.MutableRefObject<HTMLElement | null>
): {
  opened: boolean;
  motionX: MotionValue<number>;
  progress: MotionValue<number>;
  toggle: () => void;
} {
  const [state, dispatch] = useReducer(reducer, {
    opened: false,
    width: getWidth(),
    mobile: isMobile(),
  });
  const { opened, width, mobile } = state;
  const openedRef = useRef(opened);
  const openedCurrent = useRef(opened);
  const panRef = useRef<PanInterface | null>(null);
  const springRef = useRef<SpringInterface | null>(null);
  const motionX = useMotionValue<number>(opened ? 0 : -width);
  const progress = useMotionValue<number>(opened ? 1 : 0);
  const toggleRef = useRef<null | (() => void)>(null);

  // initializations
  useEffect(() => {
    if (!parentRef.current) return;
    panRef.current = Pan(parentRef.current).add();
    springRef.current = Spring();

    return () => {
      if (!panRef.current || !springRef.current) return;
      springRef.current.stop();
      panRef.current.remove();
    };
  }, [parentRef]);

  // sliding
  useEffect(() => {
    if (!panRef.current || !springRef.current) return;
    const spring = springRef.current;
    const pan = panRef.current;
    let opened = openedCurrent.current;
    let currentValue = motionX.get();
    const maxValue = mobile ? window.innerWidth - width : width * 0.4;
    let panDirection = opened ? PanDirections.horizontal : PanDirections.right;
    let clamped = false;

    if (!spring.isAnimating()) {
      currentValue = opened ? 0 : -width;
      motionX.set(currentValue);
      progress.set(opened ? 1 : 0);
    }

    pan.update({
      panDirection,

      // check if pan should start
      onPanStart: info => {
        if (opened && (mobile || info.start.sx < width * 1.2)) return true;
        const startRange = mobile ? window.innerWidth * 0.1 : width * 0.2;
        if (!opened && info.start.sx < startRange) return true;
        return false;
      },

      onPanMove: info => {
        spring.stop();
        const newValue = currentValue + info.delta.dx;
        currentValue = clamp(-width, maxValue, newValue);
        clamped = newValue !== currentValue;
        motionX.set(currentValue);
        progress.set(1 + currentValue / width);
      },

      onPanEnd: info => {
        const velocity = clamped ? 0 : info.velocity.vx;
        let change = false;
        if (opened && info.direction === PanDirections.left) change = true;
        if (!opened && info.direction === PanDirections.right) change = true;
        snap(change, velocity);
        clamped = false;
      },
    });

    spring.update({
      from: currentValue,
      to: opened ? 0 : -width,
      stiffness: stiffness,
      damping: opened ? dampingOpen : dampingClose,

      onUpdate: value => {
        currentValue = value;
        motionX.set(currentValue);
        progress.set(1 + currentValue / width);
      },

      onComplete: () => {
        if (opened === openedRef.current) return;
        openedRef.current = opened;
        dispatch({ opened });
      },
    });

    const snap = (change: boolean = false, initialVelocity?: number) => {
      if (change) {
        opened = !opened;
        openedCurrent.current = opened;
        panDirection = opened ? PanDirections.horizontal : PanDirections.right;
        pan.update({ panDirection });
      }

      spring.update({
        from: currentValue,
        to: opened ? 0 : -width,
        initialVelocity,
        damping: opened ? dampingOpen : dampingClose,
      });

      spring.start();
    };

    toggleRef.current = () => snap(true);
  }, [width, mobile, motionX, progress]);

  useWindowResize(() => {
    dispatch({ width: getWidth(), mobile: isMobile() });
  }, 100);

  const toggle = () => {
    if (!toggleRef.current) return;
    toggleRef.current();
  };

  return { opened, motionX, progress, toggle };
}

const mobileBreakpoint = 480;
const dampingOpen = 20;
const dampingClose = 33;
const stiffness = 400;
const isMobile = () => window.innerWidth < mobileBreakpoint;
const getWidth = () => (isMobile() ? window.innerWidth * 0.8 : 320);

const reducer = (state: State, payload: Partial<State>): State => ({
  ...state,
  ...payload,
});

const clamp = (min: number, max: number, value: number): number => {
  return Math.min(Math.max(value, min), max);
};
