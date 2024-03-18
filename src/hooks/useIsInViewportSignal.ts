import { Signal, useSignal } from '@preact/signals-react';
import { MutableRefObject, useEffect, useMemo } from 'react';

export function useIsInViewportSignal({
  ref,
  options,
}: {
  ref: MutableRefObject<
    HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null
  >;
  options?: IntersectionObserverInit;
}): { visible: Signal<boolean>; kill: () => void } {
  const visible = useSignal<boolean>(false);

  const observer = useMemo(() => {
    if (typeof window !== 'undefined')
      return new IntersectionObserver(
        ([entry]) => {
          visible.value = entry.isIntersecting;
        },
        {
          ...{ threshold: 0, rootMargin: '0px 0px 0px 0px' },
          ...options,
        },
      );

    return null;
  }, [options]);

  useEffect(() => {
    if (!ref?.current) return;
    observer?.observe(ref.current);
    return () => {
      observer?.disconnect();
    };
  }, [observer, ref]);

  const kill = (): void => {
    ref?.current && observer?.unobserve(ref.current);
    observer?.disconnect();
  };

  return { visible, kill };
}
