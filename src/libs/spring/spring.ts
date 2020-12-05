import { SpringConfig } from './types';

export type SpringInterface = ReturnType<typeof Spring>;

export function Spring(
  {
    from = 0,
    to = 0,
    stiffness = 100,
    damping = 10,
    mass = 1,
    initialVelocity = 0,
    restVelocity = 0.01,
    restDisplacement = 0.01,
    onUpdate = () => {},
    onComplete = () => {},
  }: SpringConfig = {} as SpringConfig
) {
  let localFrom = from;
  let localTo = to;
  let k = stiffness;
  let b = damping;
  let m = mass;
  let v0 = -initialVelocity;
  let dv = restVelocity;
  let dx = restDisplacement;
  let x0 = localTo - localFrom;
  let z = damping / (2 * Math.sqrt(stiffness * mass));
  let w = Math.sqrt(stiffness / mass) / 1000;
  let wd = w * Math.sqrt(1.0 - z * z);
  let x = localFrom; // current position
  let st = 0; // spring time
  let pt = 0; // previous time
  let v = 0; // current velocity
  let px = 0; // previous position
  let isAnimating = false;
  let animationFrame = 0;
  let localOnUpdate = onUpdate;
  let localOnComplete = onComplete;

  function tickSpring(timeDelta: number) {
    st += timeDelta;
    px = x;

    if (z < 1) {
      const e = Math.exp(-z * w * st);
      const mo =
        ((v0 + z * w * x0) / wd) * Math.sin(wd * st) + x0 * Math.cos(wd * st);
      x = localTo - e * mo;
    } else {
      const e = Math.exp(-w * st);
      x = localTo - e * (x0 + (v0 + w * x0) * st);
    }

    v = (x - px) / timeDelta;

    if (Math.abs(v) <= dv && Math.abs(localTo - x) <= dx) {
      x = localTo;
      complete();
      localOnUpdate(x);
      localOnComplete();
    } else localOnUpdate(x);
  }

  function complete() {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    isAnimating = false;
    st = 0;
    pt = 0;
    px = 0;
    v = 0;
  }

  function step(timestamp: number) {
    tickSpring(timestamp - pt);
    pt = timestamp;
    if (isAnimating) animationFrame = requestAnimationFrame(step);
  }

  // handle first frame
  function prep(timestamp: number) {
    // there is no prev time so setting timeDelta to 16.66667ms
    tickSpring(100 / 6);
    // update prev time
    pt = timestamp;
    if (isAnimating) animationFrame = requestAnimationFrame(step);
  }

  function start() {
    if (!isAnimating) {
      isAnimating = true;
      animationFrame = requestAnimationFrame(prep);
    }
    return spring;
  }

  function stop() {
    if (isAnimating) complete();
    return spring;
  }

  function update(
    {
      from = x,
      to = localTo,
      stiffness = k,
      damping = b,
      mass = m,
      initialVelocity = v,
      restVelocity = dv,
      restDisplacement = dx,
      onUpdate = localOnUpdate,
      onComplete = localOnComplete,
    }: Partial<SpringConfig> = {} as SpringConfig
  ) {
    localFrom = from;
    localTo = to;
    v0 = -initialVelocity;
    x0 = localTo - localFrom;
    z = damping / (2 * Math.sqrt(stiffness * mass));
    w = Math.sqrt(stiffness / mass) / 1000;
    wd = w * Math.sqrt(1.0 - z * z);
    dv = restVelocity;
    dx = restDisplacement;
    st = 0;

    localOnUpdate = onUpdate;
    localOnComplete = onComplete;

    // return spring to be able to chain methods
    return spring;
  }

  function set({
    from = x,
    to = localTo,
    initialVelocity = v,
  }: {
    from?: number;
    to?: number;
    initialVelocity?: number;
  }) {
    localFrom = from;
    localTo = to;
    v0 = -initialVelocity;
    x0 = localTo - localFrom;
    st = 0;
    return spring;
  }

  const spring = { start, stop, set, update };
  return spring;
}
