import { useLayoutEffect, useRef } from 'react';
import { useDimensions, DimensionData } from './useDimensions';

export interface PositionData {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  transformOriginX: 'left' | 'right';
  transformOriginY: 'top' | 'bottom';
}

const usePosition = (
  ref_0: React.MutableRefObject<HTMLElement | null>,
  ref_1: React.MutableRefObject<HTMLElement | null>,
  callback: (data: PositionData | null) => void = () => {},
  margin: number = 16
) => {
  const dimension_0 = useRef<DimensionData | null>(null);
  const dimension_1 = useRef<DimensionData | null>(null);

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

      let transformOriginX: 'left' | 'right' = 'right';
      let transformOriginY: 'top' | 'bottom' = 'top';
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
