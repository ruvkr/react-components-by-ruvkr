import {
  Directions,
  Touch,
  Velocity,
  MoveData,
  EndData,
  PanConfig,
} from './types';

export type PanInterface = ReturnType<typeof Pan>;

export function Pan(target?: HTMLElement | Window | null) {
  let added = false;
  const targetElement = target ? target : window;

  // configs
  let panDirection: Directions = Directions.Horizontal;
  let callback: (data: MoveData | EndData) => void = () => {};
  let test: (data: Touch) => boolean = () => true;

  // states
  let touchOrigin: Touch;
  let touchPrev: Touch;
  let touches: Touch[] = [];
  let velocity: Velocity = { vx: 0, vy: 0 };
  let panning = false;

  function startfunc(event: Event | TouchEvent | MouseEvent): void {
    const touch = getOrigin(event as TouchEvent | MouseEvent);

    if (test(touch)) {
      // set properties for calculations
      touchOrigin = touch;
      touchPrev = touch;
      touches.push(touch);

      // add listeners
      // adding them to window object because mouse can getout of the target
      // component while moving fast
      window.addEventListener('mousemove', movefunc);
      window.addEventListener('mouseup', endfunc);
      window.addEventListener('touchmove', movefunc, { passive: false });
      window.addEventListener('touchend', endfunc);
      // mouseleave fires on document
      document.addEventListener('mouseleave', endfunc);
    }
  }

  function movefunc(event: TouchEvent | MouseEvent): void {
    const touch = getOrigin(event);

    if (panning || testDirection(panDirection, touchPrev, touch)) {
      if (event.cancelable) event.preventDefault();

      panning = true;
      touches.push(touch);
      velocity = getVelocity(touchPrev, touch, velocity);
      touchPrev = touch;

      callback({
        ox: touchOrigin.x,
        oy: touchOrigin.y,
        x: touch.x,
        y: touch.y,
        final: false,
      });
    } else {
      // remove move listeners if test fail
      window.removeEventListener('mousemove', movefunc);
      window.removeEventListener('touchmove', movefunc);
    }
  }

  function endfunc(event: TouchEvent | MouseEvent): void {
    if (panning) {
      const touch = getOrigin(event);
      const lastTouch = touches[touches.length - 5] || touches[0];
      const { direction, angle } = getDirection(lastTouch, touch);

      callback({
        ox: touchOrigin.x,
        oy: touchOrigin.y,
        x: touch.x,
        y: touch.y,
        vx: velocity.vx,
        vy: velocity.vy,
        direction: direction,
        angle: angle,
        time: touch.time - touchOrigin.time,
        final: true,
      });
    }

    window.removeEventListener('mousemove', movefunc);
    window.removeEventListener('mouseup', endfunc);
    window.removeEventListener('touchmove', movefunc);
    window.removeEventListener('touchend', endfunc);
    document.removeEventListener('mouseleave', endfunc);

    panning = false;
    touches = [];
    velocity = { vx: 0, vy: 0 };
  }

  function add(panConfig: PanConfig = {} as PanConfig) {
    if (!added) {
      added = true;

      // configs
      if (panConfig.panDirection != null) panDirection = panConfig.panDirection;
      if (panConfig.callback) callback = panConfig.callback;
      if (panConfig.test) test = panConfig.test;

      // listeners
      targetElement.addEventListener('mousedown', startfunc);
      targetElement.addEventListener('touchstart', startfunc);
    }

    return pan;
  }

  function remove() {
    if (added) {
      added = false;

      // listeners
      targetElement.removeEventListener('mousedown', startfunc);
      targetElement.removeEventListener('touchstart', startfunc);
      window.removeEventListener('mousemove', movefunc);
      window.removeEventListener('mouseup', endfunc);
      document.removeEventListener('mouseleave', endfunc);
      window.removeEventListener('touchmove', movefunc);
      window.removeEventListener('touchend', endfunc);
    }

    return pan;
  }

  function update(panConfig: Partial<PanConfig>) {
    if (panConfig.panDirection != null) panDirection = panConfig.panDirection;
    if (panConfig.callback) callback = panConfig.callback;
    if (panConfig.test) test = panConfig.test;
    return pan;
  }

  const pan = { add, remove, update };

  return pan;
}

function getOrigin(event: TouchEvent | MouseEvent): Touch {
  if ('touches' in event) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
      time: event.timeStamp,
    };
  } else {
    return {
      x: event.pageX,
      y: event.pageY,
      time: event.timeStamp,
    };
  }
}

function getDirection(
  { x: sx = 0, y: sy = 0 }: Touch = {} as Touch,
  { x: ex = 0, y: ey = 0 }: Touch = {} as Touch
): { direction: Directions; angle: number } {
  const angle = Math.atan2(ey - sy, ex - sx);
  let direction: Directions = Directions.Left;

  if (angle > -0.75 * Math.PI) direction = Directions.Top;
  if (angle > -0.25 * Math.PI) direction = Directions.Right;
  if (angle > 0.25 * Math.PI) direction = Directions.Bottom;
  if (angle > 0.75 * Math.PI) direction = Directions.Left;

  return { direction, angle };
}

function getVelocity(
  { x: sx = 0, y: sy = 0, time: st = 0 }: Touch = {} as Touch,
  { x: ex = 0, y: ey = 0, time: et = 1 }: Touch = {} as Touch,
  { vx = 0, vy = 0 }: Velocity = {} as Velocity
): Velocity {
  const dt = et - st;
  const alpha = 1 - Math.exp(-dt / 0.1);
  const dvx = (ex - sx) / dt;
  const dvy = (ey - sy) / dt;
  const new_vx = alpha * dvx + (1 - alpha) * vx;
  const new_vy = alpha * dvy + (1 - alpha) * vy;

  return { vx: new_vx, vy: new_vy };
}

function testDirection(
  panDirection: Directions,
  start: Touch,
  end: Touch
): boolean {
  const { direction } = getDirection(start, end);

  return (
    panDirection === direction ||
    (panDirection === Directions.Horizontal &&
      (direction === Directions.Right || direction === Directions.Left)) ||
    (panDirection === Directions.Vertical &&
      (direction === Directions.Top || direction === Directions.Bottom))
  );
}
