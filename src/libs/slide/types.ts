import { Directions } from '../pan';

export interface SlideConfig {
  direction: Directions;
  translate: number;
  startBoundary?: [number, number];
  constraint?: [number, number];
  stiffness?: number;
  damping?: number;
  finalizeTest?: (data: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    direction: Directions;
  }) => boolean;
}

export interface SlideInitConfig {
  target: HTMLElement;
  configFunction: ConfigFunction;
  onClose?: () => void;
  onOpen?: () => void;
  onUpdate?: (data: { value: number; progress: number }) => void;
  opened?: boolean;
}

export type ConfigFunction = () => { open: SlideConfig; close: SlideConfig };
