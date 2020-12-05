import { useEffect, useRef } from 'react';
import { pubsub } from '../libs/pubsub';

interface Configs {
  preventDefault: boolean;
}

const ps = pubsub();

const caller = () => {
  ps.publishToLast();
};

// this will prevent firing of touchstart and mousedown at same time
// preventDefault will cause scroll stop. so adding it only when any
// subscriber is present.
const outHandler = (event: Event) => {
  if (ps.hasSubscribers()) {
    const last = ps.getLast();
    const config: Configs | null = last && last.config ? last.config : null;
    if (config && config.preventDefault) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
};

// listeners to use preventDefault
window.addEventListener('touchstart', outHandler, { passive: false });
// window.addEventListener('touchmove', outHandler, { passive: false });

/**
 * Callers should be attached to the outermost component like `App`
 *
 * @example
 *   import { callers } from './useOutsideClick';
 *   return (
 *     <div {...callers}>
 *       <Home />
 *     </div>
 *   );
 */
export const callers = {
  onMouseDown: caller,
  onTouchStart: caller,
};

/**
 * Will return `listeners`. These `listeners` should be attached to the target
 * component
 *
 * @example
 *   const listeners = useOutsideClick(true, () => {});
 *   return <div {...listeners}></div>;
 */
export const useOutsideClick = (
  subscribe: boolean = false,
  callback: () => void = () => {},
  preventDefault: boolean = true
) => {
  const id = useRef<number | null>(null);
  const callbackRef = useRef(callback);
  const preventDefaultRef = useRef(preventDefault);

  // stopPropagation otherwise it will cause callback when clicked inside.
  // Doing it only when subscribed.
  const defaultHandler = (
    event: React.MouseEvent<any, MouseEvent> | React.TouchEvent<any>
  ) => {
    if (subscribe && id.current !== null && ps.isLastSubscribed(id.current)) {
      event.stopPropagation();
      // event.preventDefault();
    }
  };

  useEffect(() => {
    if (subscribe && id.current === null) {
      const config: Configs = { preventDefault: preventDefaultRef.current };
      id.current = ps.subscribe(callbackRef.current, config);
    } else if (!subscribe && id.current !== null) {
      ps.unsubscribe(id.current);
      id.current = null;
    }
  }, [subscribe]);

  useEffect(() => {
    if (id.current !== null) {
      const config: Configs = { preventDefault };
      ps.update(id.current, callback, config);
    }
  }, [callback, preventDefault]);

  useEffect(() => {
    return () => {
      if (id.current !== null) {
        ps.unsubscribe(id.current);
      }
    };
  }, []);

  return {
    onMouseDown: defaultHandler,
    onTouchStart: defaultHandler,
  };
};
