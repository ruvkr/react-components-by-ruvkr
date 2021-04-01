export enum PanDirections {
  top,
  right,
  bottom,
  left,
  horizontal,
  vertical,
  any,
}

export type Directions = Exclude<PanDirections, PanDirections.horizontal | PanDirections.vertical | PanDirections.any>;

export type StartPosition = { sx: number; sy: number };
export type CurrentPosition = { x: number; y: number; time: number };
export type Offset = { ox: number; oy: number };
export type Delta = { dx: number; dy: number; dt: number };
export type Velocity = { vx: number; vy: number };

export type PanStartInfo = {
  start: StartPosition;
  offset: Offset;
  event: MouseEvent | TouchEvent;
};

export type PanMoveInfo = {
  start: StartPosition;
  current: CurrentPosition;
  offset: Offset;
  delta: Delta;
  velocity: Velocity;
  event: MouseEvent | TouchEvent;
};

export type PanEndInfo = {
  start: StartPosition;
  current: CurrentPosition;
  offset: Offset;
  velocity: Velocity;
  direction: Directions;
  angle: number;
  event: MouseEvent | TouchEvent;
};

export interface PanConfigs {
  target?: HTMLElement | Document;
  panDirection?: PanDirections;
  onPanStart?: (info: PanStartInfo) => boolean | void;
  onPanMove?: (info: PanMoveInfo) => void;
  onPanEnd?: (info: PanEndInfo) => void;
}

export type PanInterface = {
  add(configs?: PanConfigs): PanInterface;
  update(configs: Partial<PanConfigs>): PanInterface;
  remove(): void;
};
