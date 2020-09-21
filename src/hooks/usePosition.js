import { useLayoutEffect, useRef } from 'react';
import { useDimensions } from './';

/**
 * @param {React.MutableRefObject<HTMLElement>} ref_0
 * @param {React.MutableRefObject<HTMLElement>} ref_1
 * @param {(data: {
 *   top?: number;
 *   bottom?: number;
 *   left?: number;
 *   right?: number;
 *   transformOriginX: 'left' | 'right';
 *   transformOriginY: 'top' | 'bottom';
 * }) => void} callback
 * @param {number} margin
 */
const usePosition = (ref_0, ref_1, callback = () => {}, margin = 16) => {
  const dimension_0 = useRef(null);
  const dimension_1 = useRef(null);

  useDimensions(ref_0, data => (dimension_0.current = data));
  useDimensions(ref_1, data => (dimension_1.current = data));

  useLayoutEffect(() => {
    if (dimension_0.current && dimension_1.current) {
      const { width: tw, height: th, x: tx, y: ty } = dimension_0.current;
      const { width: iw, height: ih } = dimension_1.current;
      const { innerWidth: pw, innerHeight: ph } = window;

      const leftSpace = tx - margin;
      const rightSpace = pw - tx - tw - margin;
      const upSpace = ty - margin;
      const downSpace = ph - ty - th - margin;

      let transformOriginX = 'right';
      let transformOriginY = 'top';
      let top, bottom, left, right;

      // default placing position left bottom

      if (rightSpace > leftSpace && iw > leftSpace) {
        // plcing in right
        left = tx + tw < margin ? margin : tx + tw;
        if (left + iw > pw - margin) left = pw - iw - margin;
        transformOriginX = 'left';
      } else {
        // placing in left
        right = pw - tx < margin ? margin : pw - tx;
        if (pw - right - margin < iw) right = pw - iw - margin;
      }

      if (upSpace > downSpace && ih > downSpace) {
        // placing in top
        bottom = ph - ty < margin ? margin : ph - ty;
        if (ph - bottom - margin < ih) bottom = ph - ih - margin;
        transformOriginY = 'bottom';
      } else {
        // placing in bottom
        top = ty + th < margin ? margin : ty + th;
        if (top + ih > ph - margin) top = ph - ih - margin;
      }

      callback({
        transformOriginX,
        transformOriginY,
        left,
        right,
        top,
        bottom,
      });
    } else callback(null);
  }, [dimension_0, dimension_1, margin, callback]);
};

export { usePosition };
