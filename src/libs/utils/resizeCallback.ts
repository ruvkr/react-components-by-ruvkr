export function resizeCallbak(callback: () => void, interval: number = 100): () => void {
  // timeout to reduce frequent callback
  let resizeTimeout: number | null = null;

  // handler
  const resizeHandler = () => {
    if (resizeTimeout != null) window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      resizeTimeout = null;
      callback();
    }, interval);
  };

  // add listener
  window.addEventListener('resize', resizeHandler);

  // return a cleanup function
  return () => {
    if (resizeTimeout != null) window.clearTimeout(resizeTimeout);
    window.removeEventListener('resize', resizeHandler);
  };
}
