import { useEffect, useState, useRef } from 'react';

interface Configs {
  onLocationChange?: () => void;
  reactPathChange?: boolean;
  reactHashChange?: boolean;
  reactSearchChange?: boolean;
  forceRerender?: boolean;
}

export function useLocation(configs: Configs = {}) {
  const {
    reactPathChange: p = true,
    reactHashChange: h = false,
    reactSearchChange: s = false,
    onLocationChange: olc,
    forceRerender: fr = true,
  } = configs;

  // just to trigger re-render
  const [, forceUpdate] = useState<{}>();

  // create callback-ref to eliminate useEffect trigger
  const olcRef = useRef(olc);

  const locRef = useRef({
    pathname: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search,
  });

  // update olc callback-ref
  useEffect(() => {
    olcRef.current = olc;
  }, [olc]);

  useEffect(() => {
    const locationChnageHandler = () => {
      const changed =
        (p && window.location.pathname !== locRef.current.pathname) ||
        (h && window.location.hash !== locRef.current.hash) ||
        (s && window.location.search !== locRef.current.search);
      if (!changed) return;

      locRef.current = {
        pathname: window.location.pathname,
        hash: window.location.hash,
        search: window.location.search,
      };

      // forceUpdate to trigger re-render
      if (fr) forceUpdate({});

      // locationchange callback
      if (olcRef.current) olcRef.current();
    };

    // 'locationchange' is custom event
    window.addEventListener('locationchange', locationChnageHandler);
    window.addEventListener('popstate', locationChnageHandler);

    return () => {
      window.removeEventListener('locationchange', locationChnageHandler);
      window.removeEventListener('popstate', locationChnageHandler);
    };
  }, [p, h, s, fr]);

  return window.location;
}
