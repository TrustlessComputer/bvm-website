import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import type { RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
): void => {
  useIsomorphicLayoutEffect(() => {
    const listener = (event: Event): void => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document?.addEventListener('mousedown', listener);
    document?.addEventListener('touchstart', listener);

    return () => {
      document?.removeEventListener('mousedown', listener);
      document?.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};
