import { useEffect, useCallback, useRef } from 'react';
import { pubSub } from '../libs/pubSub';

const ps = pubSub();

const caller = () => ps.publishToLast();

// this will prevent firing of touchstart and mousedown at same time
// preventDefault will cause scroll stop. so adding it only when any
// subscriber is present.
const outHandler = event => {
  if (ps.hasSubscribers() && ps.getLast().config.preventDefault) {
    event.preventDefault();
    event.stopImmediatePropagation();
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
  subscribe = false,
  callback = () => {},
  preventDefault = true
) => {
  const id = useRef(null);

  // stopPropagation otherwise it will cause callback when clicked inside.
  // Doing it only when subscribed.
  const defaultHandler = useCallback(
    event => {
      if (subscribe && ps.isLastSubscribed(id.current)) {
        event.stopPropagation();
        // event.preventDefault();
      }
    },
    [subscribe]
  );

  useEffect(() => {
    // backup id for cleanup
    if (subscribe && id.current === null) {
      id.current = ps.subscribe(callback, { preventDefault });
    } else if (!subscribe && id.current !== null) {
      ps.unsubscribe(id.current);
      id.current = null; // reset id
    }
  }, [callback, subscribe, preventDefault]);

  // cleanup
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
