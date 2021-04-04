import { MotionValue } from 'framer-motion';
import { getDimensions } from '../../libs/utils';

export function getPosition(info: {
  dragableRef: React.MutableRefObject<HTMLDivElement | null>;
  infoRef: React.MutableRefObject<HTMLDivElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}): 'left' | 'right' | 'top' | 'bottom' {
  const { dragableRef, infoRef, x, y } = info;
  const dragableDimensions = getDimensions(dragableRef);
  const infoDimensions = getDimensions(infoRef);

  if (!dragableDimensions || !infoDimensions) return 'left';
  const { x: _dx, y: _dy, width: dw, height: dh } = dragableDimensions;
  const { width: iw, height: ih } = infoDimensions;
  const { innerWidth: ww, innerHeight: wh } = window;
  const dx = _dx + x.get();
  const dy = _dy + y.get();
  const leftSpace = dx;
  const rightSpace = ww - dx - dw;
  const heightPadding = (dh - ih) / 2;
  const heightCrisis = dy <= -heightPadding || dy >= wh - heightPadding - ih;
  const widthCrisis = leftSpace < iw && rightSpace < iw;

  if (heightCrisis || widthCrisis) {
    const topSpace = dy;
    const bottomSpace = wh - dy - dh;
    if (topSpace > bottomSpace && ih > bottomSpace) return 'top';
    else return 'bottom';
  }

  if (rightSpace > leftSpace && iw > leftSpace) return 'right';
  else return 'left';
}
