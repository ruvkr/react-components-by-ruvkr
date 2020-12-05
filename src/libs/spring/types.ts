export interface SpringConfig {
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
}
