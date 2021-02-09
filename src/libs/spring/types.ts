export type SpringConfigs = {
  from?: number;
  to?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  initialVelocity?: number;
  restVelocity?: number;
  restDisplacement?: number;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
};

export interface SpringInterface {
  tick: (timeDelta: number) => void;
  start: () => SpringInterface;
  stop: () => void;
  update: (configs: Partial<SpringConfigs>) => SpringInterface;
  set: (
    configs: Partial<Pick<SpringConfigs, 'from' | 'to' | 'initialVelocity'>>
  ) => SpringInterface;
  isAnimating: () => boolean;
}

export const p = 12;
