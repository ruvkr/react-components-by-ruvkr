import { useLayoutEffect } from 'react';

export interface DimensionData {
  x: number;
  y: number;
  width: number;
  height: number;
}

const useDimensions = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: (data: DimensionData | null) => void = () => {}
) => {
  useLayoutEffect(() => {
    if (ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      const { x, y } = ref.current.getBoundingClientRect();
      callback({ x, y, width, height });
    } else callback(null);
  }, [ref, callback]);
};

export { useDimensions };
