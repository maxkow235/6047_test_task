import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

const SCROLL_STEP = 280;

export const useHorizontalScroll = (
  ref: RefObject<HTMLDivElement | null>,
  watchValues: Array<string | number | boolean> = []
) => {
  // Track whether the scroller is sitting at the extreme left/right edge.
  const [bounds, setBounds] = useState({ atStart: true, atEnd: false });
  // Serialise watched values so a change triggers a fresh bounds calculation.
  const watchKey = useMemo(
    () => watchValues.map((value) => value.toString()).join('|'),
    [watchValues]
  );

  const evaluateBounds = useCallback(() => {
    const el = ref.current;
    if (!el) {
      setBounds({ atStart: true, atEnd: false });
      return;
    }
    // Compare scrollLeft against the total scrollable distance.
    const maxScrollLeft = Math.max(el.scrollWidth - el.clientWidth - 1, 0);
    setBounds({
      atStart: el.scrollLeft <= 0,
      atEnd: el.scrollLeft >= maxScrollLeft,
    });
  }, [ref]);

  const scrollBy = useCallback(
    (direction: 'left' | 'right') => {
      const el = ref.current;
      if (!el) return;
      // Move the container by a fixed step, then re-evaluate the edges.
      const delta = direction === 'left' ? -SCROLL_STEP : SCROLL_STEP;
      el.scrollBy({ left: delta, behavior: 'smooth' });
      evaluateBounds();
    },
    [ref, evaluateBounds]
  );

  useEffect(() => {
    const el = ref.current;
    // Run once on mount to ensure the correct disabled state.
    const frame = window.requestAnimationFrame(evaluateBounds);
    if (!el)
      return () => {
        window.cancelAnimationFrame(frame);
      };

    const handleScroll = () => evaluateBounds();
    el.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', evaluateBounds);

    return () => {
      window.cancelAnimationFrame(frame);
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', evaluateBounds);
    };
  }, [ref, evaluateBounds]);

  useEffect(() => {
    // When watched values change (e.g. slot count), re-evaluate next frame.
    const frame = window.requestAnimationFrame(evaluateBounds);
    return () => window.cancelAnimationFrame(frame);
  }, [evaluateBounds, watchKey]);

  return {
    scrollLeft: () => scrollBy('left'),
    scrollRight: () => scrollBy('right'),
    canScrollLeft: !bounds.atStart,
    canScrollRight: !bounds.atEnd,
  };
};
