import { useRef, useCallback } from 'react';

const options = { passive: false, once: true };

interface Configs {
  delay: number;
}

export const useLongPress = (
  onLongPress: () => void = () => {},
  { delay = 300 }: Configs = {} as Configs
) => {
  const longPressTriggered = useRef<boolean>(false);
  const timeout = useRef<number | null>(null);
  const passClick = useRef<boolean>(true);
  const target = useRef<HTMLElement | null>(null);

  const touchEndHandler = useCallback((event: TouchEvent) => {
    if (!passClick.current) {
      'touches' in event &&
        event.touches.length < 2 &&
        event.cancelable &&
        event.preventDefault();
      passClick.current = true;
    }
  }, []);

  const clickHandler = useCallback((event: Event) => {
    if (!passClick.current) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      passClick.current = true;
    }
  }, []);

  // Add new click listener when target changes. But not when target changes to
  // any clild element.

  const mouseMoveHandler = (event: MouseEvent) => {
    if (
      event.target &&
      target.current &&
      target.current !== event.target &&
      !target.current.contains(event.target as HTMLElement)
    ) {
      target.current.removeEventListener('click', clickHandler);
      event.target.addEventListener('click', clickHandler, options);
      target.current = event.target as HTMLElement;
    }
  };

  // In mousedown adding `click` listener to block click. And adding `mousemove`
  // listeners to detect target change. So that old `click` listener can be
  // removed and new listener can be added.
  // In touchstart added touchend listener to block click event.

  const start = (event: MouseEvent | TouchEvent) => {
    if (event.type === 'mousedown' && event.target) {
      event.target.addEventListener('click', clickHandler, options);
      window.addEventListener('mousemove', mouseMoveHandler);
      target.current = event.target as HTMLElement;
    } else {
      window.addEventListener('touchend', touchEndHandler, options);
    }

    // add timeout if none
    if (timeout.current === null) {
      timeout.current = setTimeout(() => {
        onLongPress();
        longPressTriggered.current = true;
      }, delay);
    }

    passClick.current = true;
    longPressTriggered.current = false;
  };

  const reset = () => {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    
    longPressTriggered.current = false;
  };

  const clear = (event: MouseEvent | TouchEvent) => {
    if (event.type === 'mouseup')
      window.removeEventListener('mousemove', mouseMoveHandler);
    if (longPressTriggered.current) passClick.current = false;

    reset();
  };

  const mouseLeaveClear = () => {
    target.current && target.current.removeEventListener('click', clickHandler);
    window.removeEventListener('mousemove', mouseMoveHandler);
    reset();
  };

  return {
    onMouseDown: start,
    onTouchStart: start,
    onTouchMove: clear,
    onMouseUp: clear,
    onMouseLeave: mouseLeaveClear,
    onTouchEnd: clear,
  };
};
