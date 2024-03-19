'use client';

import useWindowResize from '@hooks/useWindowResize';
// import { useLenis } from '@studio-freight/react-lenis';
import { MathMap } from '@utils/mathUtils';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

interface IuseBoxParallax {
  refContent: MutableRefObject<HTMLDivElement | HTMLVideoElement | HTMLImageElement | null>;
  refWrap: MutableRefObject<HTMLDivElement | HTMLVideoElement | HTMLImageElement | null>;
  offset?: number;
  max?: number;
  min?: number;
}

export default function useBoxParallax({
                                         refContent,
                                         refWrap,
                                         offset = 1,
                                         max,
                                         min,
                                       }: IuseBoxParallax): void {
  const { isMobile } = useWindowResize();
  const refOptions = useRef({
    isFirstRender: false,
  });

  const runParallax = useCallback((): void => {
    if (isMobile.peek()) return;
    const rectWrap = refWrap.current?.getBoundingClientRect();
    if (!rectWrap) return;

    const { innerHeight: height } = window;

    const rageTrigger = MathMap(height + rectWrap.height / 2, height, 0, -height / 2, height / 2);
    const centerWrap = rectWrap.top + rectWrap.height / 2;

    let dis = MathMap(centerWrap, height, 0, -height / 2, height / 2);
    if (Math.abs(dis) >= Math.abs(rageTrigger)) {
      if (!refOptions.current.isFirstRender && refContent.current) {
        refContent.current.style.transform = `translate3d(0px, ${rageTrigger * offset}px, 0px)`;
        refOptions.current.isFirstRender = true;
      }
      return;
    }

    if (min !== undefined) {
      dis = Math.min(dis, min);
    }
    if (max !== undefined) {
      dis = Math.max(dis, max);
    }

    if (refContent.current) {
      refContent.current.style.transform = `translate3d(0px, ${dis * offset}px, 0px)`;
      refContent.current.style.backfaceVisibility = `hidden`;
      refContent.current.style.willChange = `transform`;
      refContent.current.style.inset = `0px`;
    }
  }, [max, min, offset, refContent, refWrap]);

  useEffect(() => {
    window.addEventListener('scroll', runParallax);

    return () => {
      window.removeEventListener('scroll', runParallax);
    };
  }, []);
}
