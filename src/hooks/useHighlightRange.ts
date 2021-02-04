import { useEffect, useRef } from 'react';
import { HighlightRange } from '../libs/highlight-range';
import { convertStyle } from './utils';
import * as CSS from 'csstype';

const hr = HighlightRange();

export interface HighlightRangeConfigs {
  readerRef: React.MutableRefObject<HTMLElement | null>;
  tagName?: string;
  attributes?: { [key: string]: string };
  styles?: CSS.Properties<string>;
  stateChangeCallback: (info: {
    selecting?: boolean;
    selectedId?: string | null;
    selectedStyles?: CSS.Properties<string> | null;
  }) => void;
}

export const useHighlightRange = ({
  readerRef,
  tagName = 'span',
  attributes = {},
  styles = {},
  stateChangeCallback,
}: HighlightRangeConfigs) => {
  const selectingRef = useRef(false);
  const selectedIdRef = useRef<string | null>(null);

  const cancel = () => {
    stateChangeCallback({
      selecting: (selectingRef.current = false),
      selectedId: (selectedIdRef.current = null),
      selectedStyles: null,
    });
  };

  const updateStyle = (newStyles: CSS.Properties<string>) => {
    if (!readerRef.current || !selectedIdRef.current) return;
    const selector = `[highlightid="${selectedIdRef.current}"]`;
    const nodes = readerRef.current.querySelectorAll(selector);
    const cssText = convertStyle('toCss', newStyles);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as HTMLElement;
      node.style.cssText = cssText;
    }
  };

  const highlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const attrs = { ...attributes, style: convertStyle('toCss', styles) };
    const highlightId = hr.makeHighlight(range, tagName, attrs);
    if (!highlightId) return;
    stateChangeCallback({
      selecting: (selectingRef.current = false),
      selectedId: (selectedIdRef.current = highlightId),
    });
    selection.removeAllRanges();
  };

  const removeHighlight = () => {
    if (!selectedIdRef.current) return;
    hr.removeHighlight(selectedIdRef.current);
    stateChangeCallback({
      selecting: (selectingRef.current = false),
      selectedId: (selectedIdRef.current = null),
      selectedStyles: null,
    });
  };

  useEffect(() => {
    if (!readerRef.current) return;
    const element = readerRef.current;

    const selectionHandler = () => {
      const selection = window.getSelection();
      if (selectingRef.current || !selection || selection.isCollapsed) return;
      stateChangeCallback({ selecting: (selectingRef.current = true) });
    };

    const clickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.hasAttribute('highlighted')) {
        const highlightId = target.getAttribute('highlightid');
        if (!highlightId || selectedIdRef.current === highlightId) return;
        const css = target.getAttribute('style');
        const styleObject = css ? convertStyle('toObject', css) : null;
        stateChangeCallback({
          selectedId: (selectedIdRef.current = highlightId),
          selectedStyles: styleObject,
        });
      } else {
        const selection = window.getSelection();
        selection &&
          selection.isCollapsed &&
          (selectingRef.current || selectedIdRef.current) &&
          stateChangeCallback({
            selecting: (selectingRef.current = false),
            selectedId: (selectedIdRef.current = null),
            selectedStyles: null,
          });
      }
    };

    document.addEventListener('selectionchange', selectionHandler);
    element.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('selectionchange', selectionHandler);
      element.removeEventListener('click', clickHandler);
    };
  }, [readerRef, stateChangeCallback]);

  return {
    cancel,
    highlight,
    removeHighlight,
    updateStyle,
  };
};
