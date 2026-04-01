import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook.
 * Returns a [ref, isInView] tuple.
 * Falls back to always-true when IntersectionObserver is unavailable
 * (e.g. SSR or older browsers) so content is never hidden by default.
 *
 * @param threshold - Fraction of the element that must be visible (default 0.1)
 */
export function useInView(
  threshold = 0.1
): [React.RefObject<Element>, boolean] {
  const ref = useRef<Element>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Graceful fallback: treat everything as visible
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isInView];
}
