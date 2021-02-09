import {
  PanDirections,
  Directions,
  StartPosition,
  CurrentPosition,
  Offset,
  Delta,
  Velocity,
  PanConfigs,
  PanInterface,
} from './types';

export function Pan(target?: HTMLElement | Document | null): PanInterface {
  const targetElement = target ?? document;

  // configs
  let { panDirection, onPanStart, onPanMove, onPanEnd }: PanConfigs = {};

  // states
  let added = false;
  let panning = false;
  let offset: Offset = { ox: 0, oy: 0 };
  let startPosition: StartPosition = { sx: 0, sy: 0 };
  let prevPosition: CurrentPosition = { x: 0, y: 0, time: 0 };
  let positions: CurrentPosition[] = [];
  let velocity: Velocity = { vx: 0, vy: 0 };

  function startfunc(event: Event | TouchEvent | MouseEvent): void {
    if (event.type === 'mousedown' && (event as MouseEvent).button !== 0)
      return;
    offset = getTargetOffset(targetElement);
    const position = getCurrentPosition(event as TouchEvent | MouseEvent);

    if (
      onPanStart &&
      onPanStart({
        start: { sx: position.x, sy: position.y },
        offset,
      }) === false
    )
      return;

    startPosition = { sx: position.x, sy: position.y };
    prevPosition = position;
    positions.push(position);

    document.addEventListener('mousemove', movefunc);
    document.addEventListener('mouseup', endfunc);
    document.addEventListener('touchmove', movefunc, { passive: false });
    document.addEventListener('touchend', endfunc);
    document.addEventListener('mouseleave', endfunc);
  }

  function movefunc(event: TouchEvent | MouseEvent): void {
    const position = getCurrentPosition(event);
    const delta = getDelta(prevPosition, position);

    if (panning || testDirection(delta, panDirection)) {
      event.cancelable && event.preventDefault();
      panning = true;
      positions.push(position);
      velocity = getVelocity(delta);
      prevPosition = position;

      onPanMove &&
        onPanMove({
          start: startPosition,
          current: position,
          offset,
          delta,
          velocity,
        });
      //
    } else {
      document.removeEventListener('mousemove', movefunc);
      document.removeEventListener('touchmove', movefunc);
    }
  }

  function endfunc(): void {
    if (panning) {
      const lastPostion = positions[positions.length - 5] ?? positions[0];
      const delta = getDelta(lastPostion, prevPosition);
      const { direction, angle } = getDirection(delta);

      onPanEnd &&
        onPanEnd({
          start: startPosition,
          current: prevPosition,
          offset,
          velocity,
          angle,
          direction,
        });
      //
    }

    document.removeEventListener('mousemove', movefunc);
    document.removeEventListener('mouseup', endfunc);
    document.removeEventListener('touchmove', movefunc);
    document.removeEventListener('touchend', endfunc);
    document.removeEventListener('mouseleave', endfunc);

    panning = false;
    offset = { ox: 0, oy: 0 };
    startPosition = { sx: 0, sy: 0 };
    prevPosition = { x: 0, y: 0, time: 0 };
    velocity = { vx: 0, vy: 0 };
    positions = [];
  }

  const pan: PanInterface = {
    add: function (configs: PanConfigs = {} as PanConfigs): PanInterface {
      if (added) return pan;
      added = true;
      ({ panDirection, onPanStart, onPanEnd, onPanMove } = configs);
      targetElement.addEventListener('mousedown', startfunc);
      targetElement.addEventListener('touchstart', startfunc);
      return pan;
    },

    update: function (newConfigs: Partial<PanConfigs>): PanInterface {
      if (!added) return pan;
      ({
        panDirection = panDirection,
        onPanStart = onPanStart,
        onPanEnd = onPanEnd,
        onPanMove = onPanMove,
      } = newConfigs);

      return pan;
    },

    remove: function (): void {
      if (!added) return;
      added = false;
      ({ panDirection, onPanStart, onPanEnd, onPanMove } = {} as PanConfigs);
      targetElement.removeEventListener('mousedown', startfunc);
      targetElement.removeEventListener('touchstart', startfunc);
      document.removeEventListener('mousemove', movefunc);
      document.removeEventListener('mouseup', endfunc);
      document.removeEventListener('mouseleave', endfunc);
      document.removeEventListener('touchmove', movefunc);
      document.removeEventListener('touchend', endfunc);
    },
  };

  return pan;
}

function getTargetOffset(target: HTMLElement | Document): Offset {
  const targetPosition =
    'getBoundingClientRect' in target
      ? target.getBoundingClientRect()
      : { x: 0, y: 0 };
  return { ox: targetPosition.x, oy: targetPosition.y };
}

function getCurrentPosition(event: TouchEvent | MouseEvent): CurrentPosition {
  if ('changedTouches' in event) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
      time: event.timeStamp,
    };
  } else {
    return {
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
    };
  }
}

function getDirection(delta: Delta): { direction: Directions; angle: number } {
  const angle = Math.atan2(delta.dy, delta.dx);

  let direction: PanDirections = PanDirections.left;
  if (angle > -0.75 * Math.PI) direction = PanDirections.top;
  if (angle > -0.25 * Math.PI) direction = PanDirections.right;
  if (angle > 0.25 * Math.PI) direction = PanDirections.bottom;
  if (angle > 0.75 * Math.PI) direction = PanDirections.left;

  return { direction, angle };
}

function getDelta(
  startPosition: CurrentPosition,
  endPosition: CurrentPosition
): Delta {
  return {
    dx: endPosition.x - startPosition.x,
    dy: endPosition.y - startPosition.y,
    dt: endPosition.time - startPosition.time,
  };
}

function getVelocity(delta: Delta): Velocity {
  if (delta.dt === 0) return { vx: 0, vy: 0 };
  else return { vx: delta.dx / delta.dt, vy: delta.dy / delta.dt };
}

function testDirection(
  delta: Delta,
  panDirection: PanDirections = PanDirections.any
): boolean {
  if (panDirection === PanDirections.any) return true;
  const { direction } = getDirection(delta);

  return (
    panDirection === direction ||
    (panDirection === PanDirections.horizontal &&
      (direction === PanDirections.right ||
        direction === PanDirections.left)) ||
    (panDirection === PanDirections.vertical &&
      (direction === PanDirections.top || direction === PanDirections.bottom))
  );
}
