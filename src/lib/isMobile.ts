/**
 * Returns true if the current device is a mobile/touch device.
 * Uses `pointer: coarse` media query as the primary signal, with a
 * screen-width fallback. Returns false in SSR environments where
 * `window` is undefined.
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth <= 768
  );
};
