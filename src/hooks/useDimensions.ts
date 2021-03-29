import { useLayoutEffect } from 'react';

export interface DimensionInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useDimensions(
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: (data: DimensionInfo | null) => void
) {
  useLayoutEffect(() => {
    if (ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      const { x, y } = ref.current.getBoundingClientRect();
      callback({ x, y, width, height });
    } else callback(null);
  }, [ref, callback]);
}
