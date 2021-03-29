export interface DimensionInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type PositionInfo = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  transformOrigin: string;
};

export function getLeft(info: {
  targetDimensions: DimensionInfo;
  elementDimensions: DimensionInfo;
  margin?: number;
}): number {
  const margin = info.margin ?? 16;
  const { width: tw, x: tx } = info.targetDimensions;
  const { width: ew } = info.elementDimensions;
  const { innerWidth: ww } = window;

  let left = tx + (tw - ew) / 2;
  if (left < margin) left = margin;
  if (left + ew > ww - margin) left = ww - ew - margin;
  return left;
}

export function getTop(info: {
  targetDimensions: DimensionInfo;
  elementDimensions: DimensionInfo;
  margin?: number;
  gap?: number;
}): { top: number; position: 'onTop' | 'onBottom' } {
  const margin = info.margin ?? 16;
  const gap = info.gap ?? 16;
  const { height: th, y: ty } = info.targetDimensions;
  const { height: eh } = info.elementDimensions;
  const { innerHeight: wh } = window;
  const upSpace = ty - margin;
  const downSpace = wh - ty - th - margin;
  const position: 'onTop' | 'onBottom' = upSpace > downSpace && eh > downSpace ? 'onTop' : 'onBottom';

  let top = position === 'onTop' ? ty - eh - gap : ty + th + gap;
  if (top < margin) top = margin;
  if (top + eh > wh - margin) top = wh - eh - margin;
  return { top, position };
}

export function getTransformOrigin(info: {
  targetDimensions: DimensionInfo;
  elementDimensions: DimensionInfo;
  left: number;
  top: number;
}): string {
  const { width: tw, height: th, x: tx, y: ty } = info.targetDimensions;
  const { width: ew, height: eh } = info.elementDimensions;
  const transformOriginX = ((tx + tw / 2 - info.left) * 100) / ew + '%';
  const transformOriginY = ((ty + th / 2 - info.top) * 100) / eh + '%';
  return transformOriginX + ' ' + transformOriginY;
}

export function getDimensions(ref: React.MutableRefObject<HTMLElement | null>): DimensionInfo | undefined {
  if (!ref.current) return;
  const { offsetWidth: width, offsetHeight: height } = ref.current;
  const { x, y } = ref.current.getBoundingClientRect();
  return { x, y, width, height };
}
