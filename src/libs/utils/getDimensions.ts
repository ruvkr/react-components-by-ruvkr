export interface DimensionInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getDimensions(ref: React.MutableRefObject<HTMLElement | null>): DimensionInfo | undefined {
  if (!ref.current) return;
  const { offsetWidth: width, offsetHeight: height } = ref.current;
  const { x, y } = ref.current.getBoundingClientRect();
  return { x, y, width, height };
}
