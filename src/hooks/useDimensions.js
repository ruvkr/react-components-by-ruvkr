import { useLayoutEffect } from 'react';

/**
 * @param {React.MutableRefObject<HTMLElement>} ref
 * @param {(data: {
 *   x: number;
 *   y: number;
 *   width: number;
 *   height: number;
 * }) => void} callback
 */
const useDimensions = (ref, callback = () => {}) => {
  useLayoutEffect(() => {
    if (ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      const { x, y } = ref.current.getBoundingClientRect();
      callback({ x, y, width, height });
    } else callback(null);
  }, [ref, callback]);
};

export { useDimensions };
