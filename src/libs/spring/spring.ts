import { SpringConfigs, SpringInterface } from './types';

export function Spring(configs: SpringConfigs = {}): SpringInterface {
  let {
    from = 0,
    to = 0,
    stiffness = 100,
    damping = 10,
    initialVelocity = 0,
    mass = 1,
    restDisplacement = 0.1,
    restVelocity = 0.1,
    onUpdate,
    onComplete,
  } = configs;

  let totalDisplacement = to - from;
  let zeta = damping / (2 * Math.sqrt(stiffness * mass));
  let omega = Math.sqrt(stiffness / mass) / 1000;
  let omega_d = omega * Math.sqrt(1.0 - zeta * zeta);

  let currentTime = 0;
  let prevTime = 0;
  let currentPosition = from;
  let prevPosition = 0;
  let currentVelocity = 0;

  let isAnimating = false;
  let animationFrame = 0;

  function tickSpring(timeDelta: number) {
    currentTime += timeDelta;
    prevPosition = currentPosition;

    if (zeta < 1) {
      const decay = Math.exp(-zeta * omega * currentTime);
      const motion =
        ((-initialVelocity + zeta * omega * totalDisplacement) / omega_d) *
          Math.sin(omega_d * currentTime) +
        totalDisplacement * Math.cos(omega_d * currentTime);
      currentPosition = to - decay * motion;
    } else {
      const decay = Math.exp(-omega * currentTime);
      const motion =
        totalDisplacement +
        (-initialVelocity + omega * totalDisplacement) * currentTime;
      currentPosition = to - decay * motion;
    }

    currentVelocity = (currentPosition - prevPosition) / timeDelta;

    if (
      Math.abs(currentVelocity) <= restVelocity &&
      Math.abs(to - currentPosition) <= restDisplacement
    ) {
      currentPosition = to;
      complete();
      onUpdate && onUpdate(currentPosition);
      onComplete && onComplete();
    } else onUpdate && onUpdate(currentPosition);
  }

  function complete() {
    isAnimating = false;
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    currentTime = 0;
    prevTime = 0;
    prevPosition = 0;
    currentVelocity = 0;
  }

  function step(timestamp: number) {
    tickSpring(timestamp - prevTime);
    prevTime = timestamp;
    if (isAnimating) animationFrame = requestAnimationFrame(step);
  }

  function prep(timestamp: number) {
    tickSpring(100 / 6);
    prevTime = timestamp;
    if (isAnimating) animationFrame = requestAnimationFrame(step);
  }

  const springInterface: SpringInterface = {
    isAnimating: () => isAnimating,
    tick: tickSpring,
    start(): SpringInterface {
      if (totalDisplacement === 0) {
        onComplete && onComplete();
        return springInterface;
      }
      if (isAnimating) return springInterface;
      isAnimating = true;
      animationFrame = requestAnimationFrame(prep);
      return springInterface;
    },

    stop(): void {
      if (isAnimating) complete();
    },

    update: function (configs): SpringInterface {
      ({
        from = currentPosition,
        to = to,
        stiffness = stiffness,
        damping = damping,
        initialVelocity = currentVelocity,
        mass = mass,
        restDisplacement = restDisplacement,
        restVelocity = restVelocity,
        onUpdate = onUpdate,
        onComplete = onComplete,
      } = configs);

      if (configs.from != null) currentPosition = from;
      if (configs.initialVelocity != null) currentVelocity = 0;
      totalDisplacement = to - from;
      zeta = damping / (2 * Math.sqrt(stiffness * mass));
      omega = Math.sqrt(stiffness / mass) / 1000;
      omega_d = omega * Math.sqrt(1.0 - zeta * zeta);
      currentTime = 0;
      return springInterface;
    },

    set: function (configs): SpringInterface {
      ({
        from = currentPosition,
        to = to,
        initialVelocity = currentVelocity,
      } = configs);

      if (configs.from != null) currentPosition = from;
      if (configs.initialVelocity != null) currentVelocity = 0;
      totalDisplacement = to - from;
      currentTime = 0;
      return springInterface;
    },
  };

  return springInterface;
}
