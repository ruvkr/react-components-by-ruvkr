import { useRef, useEffect } from 'react';
import { useWindowResize } from './useWindowResize';
import { Slide, SlideInitConfig, SlideInterface } from '../libs/slide';

type Configs = Omit<SlideInitConfig, 'target'> & {
  target: React.MutableRefObject<HTMLElement | null>;
};

export function useSlide({
  target,
  configFunction,
  onOpen,
  onClose,
  onUpdate,
  opened,
}: Configs) {
  const slide = useRef<SlideInterface | null>(null);

  useEffect(() => {
    if (!target.current) return;
    slide.current = Slide({ target: target.current, configFunction });
    slide.current.initialize();
    return slide.current.destroy;
  }, [target, configFunction]);

  useEffect(() => {
    if (!slide.current) return;
    slide.current.update({ onOpen, onClose, onUpdate });
  }, [onOpen, onClose, onUpdate]);

  useEffect(() => {
    if (!slide.current) return;
    slide.current.isOpened() !== opened && slide.current.toggle();
  }, [opened]);

  useWindowResize(slide.current?.refresh, 100);

  return { toggle: () => slide.current?.toggle() };
}
