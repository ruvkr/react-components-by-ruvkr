export enum Directions {
  Top,
  Right,
  Bottom,
  Left,
  Horizontal,
  Vertical,
}

export interface Touch {
  x: number;
  y: number;
  time: number;
}

export interface Velocity {
  vx: number;
  vy: number;
}

export interface MoveData {
  ox: number;
  oy: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  final: false;
}

export interface EndData {
  ox: number;
  oy: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  direction: Directions;
  angle: number;
  time: number;
  final: true;
}

export interface PanConfig {
  panDirection?: Directions;
  callback?: (data: MoveData | EndData) => void;
  startTest?: (data: Touch) => boolean;
}
