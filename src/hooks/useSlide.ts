import { useRef, useEffect, useCallback } from 'react';
import { useWindowResize } from './useWindowResize';
import { Slide, SlideInitConfig, SlideInterface } from '../libs/slide';

export function useSlide(slideConfig: SlideInitConfig) {
  const opened = slideConfig.opened;
  const slidefunc = useRef(() => Slide(slideConfig));
  const slide = useRef<SlideInterface | null>(null);

  useEffect(() => {
    slide.current = slidefunc.current();
    slide.current.initialize();
    return slide.current.destroy;
  }, [slidefunc]);

  useEffect(() => {
    if (slide.current) slide.current.update(slideConfig);
  }, [slideConfig]);

  useEffect(() => {
    if (slide.current && slide.current.isOpened() && !opened) {
      slide.current.toggle();
    } else if (slide.current && !slide.current.isOpened() && opened) {
      slide.current.toggle();
    }
  }, [opened]);

  const resizeHandler = useCallback(() => {
    slide.current && slide.current.refresh();
  }, []);

  useWindowResize(resizeHandler, 100);

  return { toggle: () => slide.current && slide.current.toggle() };
}
