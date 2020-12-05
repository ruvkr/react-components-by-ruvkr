import { SlideConfig, SlideInitConfig } from './types';
import { Pan, Directions, MoveData, EndData } from '../pan';
import { Spring } from '../spring';

interface HorizontalVariables {
  difference: 'dx';
  motion: 'x';
  origin: 'ox';
  velocity: 'vx';
}

interface VerticalVariables {
  difference: 'dy';
  motion: 'y';
  origin: 'oy';
  velocity: 'vy';
}

type Config = SlideConfig & (HorizontalVariables | VerticalVariables);

export type SlideInterface = ReturnType<typeof Slide>;

export function Slide({
  configFunction,
  onClose = () => {},
  onOpen = () => {},
  onUpdate = () => {},
  opened = false,
}: SlideInitConfig) {
  let localConfigFunc = configFunction;
  let localOnClose = onClose;
  let localOnOpen = onOpen;
  let localOnUpdate = onUpdate;
  let localOpened = opened;

  const pan = Pan();
  const spring = Spring({
    onUpdate: value => localOnUpdate({ value, progress: getProgress(value) }),
    onComplete: () => {
      if (localOpened) localOnOpen();
      else localOnClose();
    },
  });

  let openConfig: Config;
  let closeConfig: Config;
  let distance: number;

  function destroy() {
    pan.remove();
  }

  function initConfig() {
    const { open, close } = localConfigFunc();
    openConfig = { ...open, ...getVariables(open.direction) };
    closeConfig = { ...close, ...getVariables(close.direction) };
    distance = open.translate - close.translate;
  }

  function initDrag() {
    if (localOpened) addDrag(closeConfig, closeHandler);
    else addDrag(openConfig, openHandler);
  }

  function initMotion() {
    if (localOpened) {
      localOnUpdate({ value: openConfig.translate, progress: 1 });
      localOnOpen();
    } else {
      localOnUpdate({ value: closeConfig.translate, progress: 0 });
      localOnClose();
    }
  }

  function addDrag(
    config: Config,
    callback: (data: MoveData | EndData) => void
  ) {
    pan.remove().add({
      callback: callback,
      panDirection: config.direction,
      test: data =>
        config.startBoundary
          ? data[config.motion] >= config.startBoundary[0] &&
            data[config.motion] <= config.startBoundary[1]
          : true,
    });
  }

  function openHandler(data: MoveData | EndData) {
    const valueRaw =
      closeConfig.translate + data[openConfig.motion] - data[openConfig.origin];
    let value = valueRaw;
    let edge = false;

    if (openConfig.constrain) {
      const constrainVal = getConstrainValue(valueRaw, openConfig.constrain);
      value = constrainVal.value;
      edge = constrainVal.edge;
    }

    if (data.final) {
      if (openConfig.finalizeTest ? openConfig.finalizeTest(data) : true) {
        addDrag(closeConfig, closeHandler);
        finalize({
          config: openConfig,
          opened: true,
          from: value,
          initialVelocity: edge ? 0 : data[openConfig.velocity],
        });
      } else
        finalize({
          config: closeConfig,
          opened: false,
          from: value,
          initialVelocity: edge ? 0 : data[closeConfig.velocity],
        });
    } else {
      spring.stop();
      localOnUpdate({ value, progress: getProgress(value) });
    }
  }

  function closeHandler(data: MoveData | EndData) {
    const valueRaw =
      openConfig.translate +
      data[closeConfig.motion] -
      data[closeConfig.origin];
    let value = valueRaw;
    let edge = false;

    if (closeConfig.constrain) {
      const constrainVal = getConstrainValue(valueRaw, closeConfig.constrain);
      value = constrainVal.value;
      edge = constrainVal.edge;
    }

    if (data.final) {
      if (closeConfig.finalizeTest ? closeConfig.finalizeTest(data) : true) {
        addDrag(openConfig, openHandler);
        finalize({
          config: closeConfig,
          opened: false,
          from: value,
          initialVelocity: edge ? 0 : data[closeConfig.velocity],
        });
      } else
        finalize({
          config: openConfig,
          opened: true,
          from: value,
          initialVelocity: edge ? 0 : data[openConfig.velocity],
        });
    } else {
      spring.stop();
      localOnUpdate({ value, progress: getProgress(value) });
    }
  }

  function finalize({
    config,
    opened,
    from,
    initialVelocity,
  }: {
    config: Config;
    opened: boolean;
    from: number;
    initialVelocity?: number;
  }) {
    localOpened = opened;
    spring
      .update({
        damping: config.damping,
        from,
        initialVelocity,
        stiffness: config.stiffness,
        to: config.translate,
      })
      .start();
  }

  function getProgress(value: number): number {
    return (value - closeConfig.translate) / distance;
  }

  function initialize() {
    initConfig();
    initDrag();
    initMotion();
    return slide;
  }

  function toggle() {
    if (localOpened) {
      addDrag(openConfig, openHandler);
      finalize({
        config: closeConfig,
        opened: false,
        from: openConfig.translate,
      });
    } else {
      addDrag(closeConfig, closeHandler);
      finalize({
        config: openConfig,
        opened: true,
        from: closeConfig.translate,
      });
    }
    return slide;
  }

  function isOpened(): boolean {
    return localOpened;
  }

  function update({
    configFunction = localConfigFunc,
    onClose = localOnClose,
    onOpen = localOnOpen,
    onUpdate = localOnUpdate,
  }: Partial<SlideInitConfig>) {
    localConfigFunc = configFunction;
    localOnClose = onClose;
    localOnOpen = onOpen;
    localOnUpdate = onUpdate;
    return slide;
  }

  const slide = {
    destroy,
    initialize,
    isOpened,
    refresh: initialize,
    toggle,
    update,
  };

  return slide;
}

function getConstrainValue(
  value: number,
  [min, max]: [min: number, max: number]
): { value: number; edge: boolean } {
  if (value < min) return { value: min, edge: true };
  if (value > max) return { value: max, edge: true };
  return { value, edge: false };
}

function getVariables(
  direction: Directions
): HorizontalVariables | VerticalVariables {
  const HorizontalDirections = [
    Directions.Horizontal,
    Directions.Left,
    Directions.Right,
  ];
  const VerticalDirections = [
    Directions.Vertical,
    Directions.Top,
    Directions.Bottom,
  ];

  if (HorizontalDirections.includes(direction))
    return {
      difference: 'dx',
      motion: 'x',
      origin: 'ox',
      velocity: 'vx',
    };
  else if (VerticalDirections.includes(direction))
    return {
      difference: 'dy',
      motion: 'y',
      origin: 'oy',
      velocity: 'vy',
    };
  else throw new Error('Invalid direction');
}
