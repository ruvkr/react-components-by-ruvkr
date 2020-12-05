import { useEffect, useRef, useCallback } from 'react';

export const useWindowResize = (
  callback: () => void = () => {},
  interval: number = 100
) => {
  const resizeTimeout = useRef<number | null>(null);

  const resizeHandler = useCallback(() => {
    if (resizeTimeout.current != null) clearTimeout(resizeTimeout.current);
    resizeTimeout.current = setTimeout(() => {
      resizeTimeout.current = null;
      callback();
    }, interval);
  }, [interval, callback]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      if (resizeTimeout.current != null) clearTimeout(resizeTimeout.current);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);
};
